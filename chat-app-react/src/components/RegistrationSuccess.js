import { Link, useNavigate } from 'react-router-dom';
import './RegistrationSuccess.css'

function RegistrationSuccess() {
    return (
        <div className='registration-success-page'>
            <div className='registration-success-container'>
                <p className='reg-success-text'>Congratulations! Your account was successfully created.</p>
                <div className='reg-success-link-container'><Link className='reg-success-link' to='/'>Return to Login Page</Link></div>
            </div>
        </div>
    );
}

export default RegistrationSuccess;