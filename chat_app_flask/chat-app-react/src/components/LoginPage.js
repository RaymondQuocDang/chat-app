import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login() {
        const response = await axios.post('/login', {
            'username': username,
            'password': password
        })

        console.log(response.data)

        if (response.status === 200) {
            navigate("/", {replace: true})
        }
        
    }
    
    return (
        <div className='login-page'>
            <h1>Chat App</h1>
            <p>Login to start chatting!</p>
            <div><Link className='link' to='/register'>Register</Link></div>
            <input type='text' className='input-box' onChange={(e) => setUsername(e.target.value)}/>
            <input type='text' className='input-box' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' className='button' onClick={() => login()}>Login</button>
        </div>
    );
}

export default LoginPage;