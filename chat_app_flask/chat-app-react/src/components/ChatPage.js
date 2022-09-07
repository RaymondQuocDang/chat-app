import ChatView from './ChatView.js';
import UserList from './UserList.js';
import './ChatApp.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function ChatPage() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {

        isLoggedIn();

    }, []);

    async function isLoggedIn() {
        try {
            const response = await axios.get('/api/is-logged-in')
            setUser(response.data.username);
        } catch (error) {
            navigate('/login', { replace: true })
        }

    }



    return (
        <div className='chat-app'>
            <ChatView current_user={user}></ChatView>
            <UserList current_user={user}></UserList>
        </div>
    );
}

export default ChatPage;