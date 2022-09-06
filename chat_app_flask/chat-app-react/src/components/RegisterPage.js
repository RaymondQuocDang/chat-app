import './RegisterPage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function register() {
        const response = await axios.post('/register', {
            'username': username,
            'password': password
        })

        console.log(response.data)
        console.log(response.status)

        if (response.status === 201) {
            navigate("/login", {replace: true})
        }
        
    }
    
    
    return(
        <div className='register-page'>
            <h1>Register Here</h1>
            <div><Link to='/' className='link'>Login</Link></div>
            <label>Username: </label>
            <input type='text' className='input-box' onChange={(e) => setUsername(e.target.value)}/>
            <label>Password: </label>
            <input type='text' className='input-box' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' className='button' onClick={() => register()}>Register</button>
        </div>
    );
}

export default RegisterPage;