import './Chat.css'
import { useState, useEffect, useRef } from 'react';

function Chat() {

    const [textBoxInput, setTextBoxInput] = useState('');
    const [messages, setMessages] = useState ([]);
    const bottomRef = useRef(null);

    function sendMessageOnEnter(keyPress) {
        
        if (keyPress === 'Enter') {
            sendMessage();
        }

    }

    function sendMessage() {
        if (textBoxInput === '') {
            return;
        }

        const messageList = messages;
        messageList.push(textBoxInput);
        setMessages(messageList);
        setTextBoxInput('')
    } 

    function displayMessages() {
        const jsxMessages = []
        messages.forEach((message, i) => {
            jsxMessages.push(
                <div key={i} className='message-container'><p>{message}</p></div>
            )
        });

        return jsxMessages;
    }

    useEffect(() => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'});
      }, [textBoxInput]);

    return(
        <div className='chat-container'>
            <div className='chat-box'>
                <div className='filler'></div>
                {displayMessages()}
                <div ref={bottomRef}></div>
            </div>
            <div className='text-box-container'>
                <input className='text-box' type='text' placeholder='Message...' onKeyDown={(e) => sendMessageOnEnter(e.key)} onChange={(e) => setTextBoxInput(e.target.value)} value={textBoxInput} ></input>
                <button className='send-button' onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    );
}

export default Chat;