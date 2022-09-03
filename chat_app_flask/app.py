from flask import Flask, request, jsonify, make_response, send_from_directory, session, redirect, url_for
from flask_bcrypt import Bcrypt
import os
from models import db, Users, Messages

app = Flask(__name__, static_folder='chat-app-react/build', static_url_path='')
password = os.environ.get('PASSWORD')

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{password}@localhost/chatapp"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = 'secret_key'

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        
        user = Users.query.filter_by(username=username).first()
        
        if user is None:
            return jsonify({'error': 'Unauthorized'}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error': 'Unauthorized'}), 401
        
        session['user_id'] = user.id    
        return jsonify({'id': user.id, 'username': user.username})


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        user_exists = Users.query.filter_by(username=username).first() is not None
        
        if user_exists:
            return jsonify({'error:': 'A user already exist'}), 409   
        
        new_user = Users(username, hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'id': new_user.id, 'username': new_user.username}), 201


@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == "POST":
        user_data = request.get_json()
        username = user_data['username']
        password = user_data['password']
        hashed_password = bcrypt.generate_password_hash(password)
        
        new_user = Users(username, hashed_password)
        db.session.add(new_user)
        db.session.commit()

        user_id = Users.query.filter_by(username=new_user.username).first().id
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



if __name__ == '__main__':
    app.run(debug=True)
