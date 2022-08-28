import './UserList.css'

function UserList() {

    return(
        <div className='users-list-container'>
            <div className='user-container'><p>Newt King</p></div>
            <div className='user-container'><p>Rock Knight</p></div>
            <div className='user-container'><p>EZ Lee</p></div>
            <div className='user-container'><p>Grundtal</p></div>
        </div>
    );
}

export default UserList;