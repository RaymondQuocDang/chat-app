# Chat App

A full stack application using React, Flask, PostgreSQL and websockets that allows you to seamlessly send and recieve messages. 

Access it [here](https://chat-app-rqd.herokuapp.com/)

![Screenshot of Chat App](./screenshots/chat-app-login-SC.PNG)

![Screenshot of Chat App](./screenshots/chat-app-chat-SC.PNG)


## Description

This chat application allows you to register an account, log in and then start chatting with the other users in the chat room. I used React for the front-end and flask for the back-end. With the help of React Routes, users can navigate through different pages on the front-end and then actions such as sending a message sends http request to the back-end server . I connected the Flask server to a PostgreSQL database which was a learning experience since prior to this project, I've only worked with SQLite. I've created a Users table and a Messages Table to store all the relevant data. I think the biggest learnings I got out of working on this project were how to connect a server to a database, how websockets work (I honestly have never heard of these before) and how to deploy a multifaceted application to Heroku.

My friends and I spend a lot of time on Discord so I definitely took some inspiration from that when building this chat app. There were some tough moments where I got stuck but overall the process was enjoyable and my friends were impressed by my improvement. I think when I come back to this project in the near future, I'm going to implement additional text channels so that the conversation  and messages can be seperated by different topics. 


## Installation Instructions

1. Run 'npm i --prefix 'chat-app-react' in the terminal (from the root directory)
2. Install Postgresql and set up a database called chatapp
3. Install 'poetry' command line tool for Python (https://python-poetry.org/docs/#installation)
4. Run 'poetry init' in the terminal (from the root directory)
5. Run 'poetry shell' in the terminal (from the root directory)
6. Run 'poetry install' in the terminal (from the root directory)
7. Create a file called '.env' and add the following properties: 'FLASK_APP=app.py', 'FLASK_DEBUG-true', 'SECRET_KEY='secret_key', DATABASE_URL="postgresql://postgres:password@localhost/chatapp"
8. Run 'poetry run flask run' in the terminal (from the root directory)
9. In a separate terminal run 'npm run start --prefix 'chat-app-react' (from the root directory)


## Author

Raymond Dang - Full-Stack Software Developer - [Website](https://raymondquocdang.com/) | [LinkedIn](https://www.linkedin.com/in/raymond-quoc-dang/)
