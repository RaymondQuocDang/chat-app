
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

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