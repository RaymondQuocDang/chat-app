import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setdisplayError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    async function login() {

        const response = await axios.post('/login', {
            'username': username,
            'password': password
        })

        console.log(response.data)

        if (response.status === 200) {
            navigate("/", { replace: true })
        }

    }

    function displayErrorMessage() {
        
        if (displayError === true) {
            return <p className='error-message'>{errorMessage}</p>
        }
        
    } 

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1 className='title'>Chat App</h1>
                <div className='greeting-container'><p className='text'>Log in to start chatting!</p></div>
                <input type='text' className='input-box-username' placeholder='Username' minLength={4} onChange={(e) => setUsername(e.target.value)} />
                <input type='password' className='input-box-password' placeholder='Password' minLength={4} onChange={(e) => setPassword(e.target.value)} />
                <div className='error-message-container'>{displayErrorMessage()}</div>
                <button type='submit' className='button' onClick={() => login()}>Login</button>
                <div className='link-container'><p className='text'>Don't have an account?</p><Link className='link' to='/register'>Register</Link></div>
            </div>
        </div>
    );
}

export default LoginPage;