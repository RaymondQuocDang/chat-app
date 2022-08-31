from flask import Flask, request, jsonify, make_response, send_from_directory


app = Flask(__name__, static_folder='chat-app-react/build', static_url_path='')

@app.route("/")
def index():
    return send_from_directory(app.static_folder, 'index.html')

message_list = [{'id': 1, 'username': 'Newt King', 'message': "Why would I lie?"}]
user_list = [{'id': 1,'username': 'Newtking'}]
    
@app.route('/api/messages', methods = ['POST', 'GET'])
def messages():

    if request.method == "POST":
        message_data = request.get_json()
        message_id = len(message_list) + 1
        message_list.append({'id': message_id, 'username': message_data['username'], 'message': message_data['message']})
        data = {'message': 'Done', 'code': 'SUCCESS'}
        return make_response(jsonify(data), 200)
    else:
        return message_list


@app.route('/api/users', methods = ['POST', 'GET'])
def users():
    if request.method == "POST":
        user_data = request.get_json()
        user_id = len(user_list) + 1
        user_list.append({'id': user_id, 'username': user_data['username']})
        data = {'message': 'Done', 'code': 'SUCCESS'}
        response = make_response(jsonify(data), 201)
        response.headers['url'] = f'/users/{user_id}'
        return response
    else:
        return user_list


@app.route('/api/users/<int:id>')
def single_user(id):
    single_user = next((user for user in user_list if user['id'] == id), "none")
    return single_user

if __name__ == '__main__':
    app.run(debug = True)
    