import ChatView from './ChatView.js';
import UserList from './UserList.js';
import './ChatApp.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function ChatPage () {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {
        
        isLoggedIn();

    }, []);

    async function isLoggedIn() {
        try {
            const response = await axios.get('/is-logged-in')
            console.log(response.data);
            setUser(response.data.username);
        } catch (error) {
            console.log(error)
            console.log(user)
            navigate('/login', {replace: true})
        }

    }



    return(
        <div className='chat-app'>
            <UserList current_user={user}></UserList>
            <ChatView current_user={user}></ChatView>
        </div>
    );
}

export default ChatPage;