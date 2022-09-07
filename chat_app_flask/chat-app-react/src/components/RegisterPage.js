import './RegisterPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayError, setdisplayError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    async function register() {

        if (password.length < 5 || username.length < 5) {
            setErrorMessage('Username and password must be atelast 5 characters.')
            setdisplayError(true);
            return;
        }

        try {
            const response = await axios.post('/api/register', {
                'username': username,
                'password': password
            })
            if (response.status === 201) {
                navigate('/register/success', { replace: true })
            }
        } catch (error) {
            setdisplayError(true);
            setErrorMessage("That username has already been taken.");
        }


    }

    function displayErrorMessage() {

        if (displayError === true) {
            return <p className='error-message'>{errorMessage}</p>
        }

    }


    return (
        <div className='register-page'>
            <div className='register-container'>
                <h1 className='title'>Chat App</h1>
                <div className='greeting-container'><p className='text'>Fill in the information to create an account.</p></div>
                <input type='text' placeholder='Username' className='input-box-username' onChange={(e) => setUsername(e.target.value)} />
                <input type='password' placeholder='Password' className='input-box-password' onChange={(e) => setPassword(e.target.value)} />
                <div className='error-message-container'>{displayErrorMessage()}</div>
                <button type='submit' className='button' onClick={() => register()}>Register</button>
                <div className='link-container'><p className='text'>Already have an account?</p><Link className='link' to='/login'>Log In</Link></div>
            </div>
        </div>
    );
}

export default RegisterPage;