from flask import Flask, request, jsonify, make_response, send_from_directory
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__, static_folder='chat-app-react/build', static_url_path='')
password = os.environ.get('PASSWORD')

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{password}@localhost/chatapp"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'secret'

db = SQLAlchemy(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    messages = db.relationship('Messages', backref='users', lazy=True)

    def __init__(self, username):
        self.username = username
        
class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def __init__(self, message, user_id):
        self.message= message
        self.user_id = user_id
    

@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/messages', methods = ['POST', 'GET'])
def messages():

    if request.method == "POST":
        message_data = request.get_json()
        user_id_integer = int(message_data['username'])
        entry = Messages(message_data['message'], user_id_integer)
        db.session.add(entry)
        db.session.commit()
        
        resp = {'message': 'Done', 'code': 'SUCCESS'}
        return make_response(jsonify(resp), 200)
    else:
        return "message_list"








user_list = [{'id': 1,'username': 'Newtking'}]
@app.route('/api/users', methods = ['POST', 'GET'])
def users():
    if request.method == "POST":
        user_data = request.get_json()
        user_id = len(user_list) + 1
        user_list.append({'id': user_id, 'username': user_data['username']})
        data = {'message': 'Done', 'code': 'SUCCESS'}
        resp = make_response(jsonify(data), 201)
        resp.headers['url'] = f'/users/{user_id}'
        return resp
    else:
        return user_list


@app.route('/api/users/<int:id>')
def single_user(id):
    single_user = next((user for user in user_list if user['id'] == id), "none")
    return single_user



if __name__ == '__main__':
    db.create_all()
    app.run(debug = True)
    