import './UserList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserList({ current_user }) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const response = await axios.get('/users')
        console.log(response.data.user_list)
        setUsers(response.data.user_list)
    }

    const navigate = useNavigate();

    async function LogOut() {
        const response = await axios.get('/logout')
        console.log(response.data)
        navigate('/login', { replace: true })
    }

    const userList = users.map((user) => {
        return (<div key={user.id} className='user-container'><p>{user.username}</p></div>)
    })



    return (
        <div>
            <div className='users-list-container'>
                <div className='user-list-title'><p>Users</p></div>
                {userList}
            </div>
            <div className='profile-container'>
                <div className='current-user'><p>Logged-in as {current_user}</p></div>
                <button className='logout-button' onClick={() => LogOut()} >Log Out</button>
            </div>
        </div>

    );
}

export default UserList;