import Chat from './Chat.js'
import UserList from './UserList.js'
import './ChatApp.css'

function ChatApp () {

    return(
        <div className='chat-app'>
            <UserList></UserList>
            <Chat></Chat>
        </div>
    );
}

export default ChatApp;