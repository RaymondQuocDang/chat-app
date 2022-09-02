from flask import Flask, request, jsonify, make_response, send_from_directory, session, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime


app = Flask(__name__, static_folder='chat-app-react/build', static_url_path='')
password = os.environ.get('PASSWORD')

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{password}@localhost/chatapp"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'secret_key'

db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    messages = db.relationship('Messages', backref='user', lazy=True)

    def __init__(self, username):
        self.username = username

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username
        }


class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime,nullable=False, default=datetime.utcnow)

    def __init__(self, message, user_id):
        self.message = message
        self.user_id = user_id
        
    def serialize(self):
        return {
            'id': self.id,
            'username': self.user.username,
            'message': self.message,
            'timestamp': self.timestamp
        }

@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session.pop('user_id', None)
        
        username = request.form['username']
        user = Users.query.filter_by(username=username).first()
        
        if username == user.username:
            session['user_id'] = user.id
            return send_from_directory(app.static_folder, 'index.html')
        
        return redirect(url_for('login'))
            
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def register():

    return render_template('register.html')

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == "POST":
        user_data = request.get_json()
        entry = Users(user_data['username'])
        db.session.add(entry)
        db.session.commit()

        user_id = Users.query.filter_by(username=user_data['username']).first().id
        data = {'message': 'Done', 'code': 'SUCCESS'}
        resp = make_response(jsonify(data), 201)
        resp.headers['url'] = f'/users/{user_id}'
        return resp
    else:
        query_users = Users.query.all()
        return jsonify({"user_list": [query_user.serialize() for query_user in query_users]})


@app.route('/api/users/<int:id>')
def single_user(id):
    single_user = Users.query.filter_by(id=id).first()
    return single_user.serialize()


@app.route('/api/messages', methods=['POST', 'GET'])
def messages():

    if request.method == "POST":
        message_data = request.get_json()
        username = message_data['username']
        user_id = Users.query.filter_by(username=username).first().id
        
        entry = Messages(message_data['message'], user_id)
        db.session.add(entry)
        db.session.commit()

        resp = {'message': 'Done', 'code': 'SUCCESS'}
        return make_response(jsonify(resp), 200)
    else:
        query_messages = Messages.query.all()
        return jsonify({"message_list": [query_message.serialize() for query_message in query_messages]})



db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
