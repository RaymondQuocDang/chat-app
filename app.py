from datetime import datetime
from flask import Flask, request, jsonify, make_response, send_from_directory, session, redirect, url_for
from flask_bcrypt import Bcrypt
import os
from models import db, Users, Messages
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_folder='chat-app-react/build', static_url_path='')
password = os.environ.get('PASSWORD')
cors = CORS(app,resources={r"/*":{"origins":"*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace("://", "ql://", 1)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
socketio = SocketIO(app, cors_allowed_origins="*")

bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/login', methods=['GET', 'POST'])
@cross_origin()
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
        return jsonify({'id': user.id, 'username': user.username}), 200


@app.route('/api/register', methods=['GET', 'POST'])
@cross_origin()
def register():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        user_exists = Users.query.filter_by(username=username).first()
        
        if user_exists:
            return {"id": user_exists.id}, 401
        
        new_user = Users(username, hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'id': new_user.id, 'username': new_user.username}), 201


@app.route('/api/logout')
@cross_origin()
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Log out was successful'}), 200


@app.route('/api/is-logged-in')
@cross_origin()
def is_logged_in():
    
    user_id =session.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = Users.query.filter_by(id=user_id).first()
    return user.serialize()


@app.route('/api/users')
@cross_origin()
def users():
    users = Users.query.all()
    return jsonify({"user_list": [user.serialize() for user in users]})


@app.route('/api/all-messages')
@cross_origin()
def all_messages():

    query_messages = Messages.query.all()
    return jsonify({"message_list": [query_message.serialize() for query_message in query_messages]})


@socketio.on('message')
def messages(message):

        user_id = Users.query.filter_by(username=message['username']).first().id
        timestamp = datetime.now()
        
        entry = Messages(message['message'], user_id, timestamp)
        db.session.add(entry)
        db.session.commit()
        
        emit('message', entry.serialize(), broadcast=True)


@socketio.on("connect")
def connected():
    emit("connect", {"data": "Connected Successfully"})


@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')


if __name__ == '__main__':
    socketio.run(app, debug=True)
