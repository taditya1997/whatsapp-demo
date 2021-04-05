import React, { useState } from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {SearchOutlined, AttachFile, MoreVert,InsertEmoticon,Mic } from '@material-ui/icons';
import axios from './axios';
import './Chat.css';

const Chat = ({messages}) => {

    const [input,SetInput]=useState('');
 
    const sendMessage= async (event)=>
    {
        event.preventDefault();

        await axios.post('/messages/new',{
            message:input,
            name:"Aditya",
            timestamp: "JustNow",
            received:false
        })
        SetInput('');
    }


    return (
        <div className="Chat">
          <div className="Chat-header">
             <Avatar/>
             <div className="Chat-header_Info">
                 <h3>Room Name</h3>
                 <p>Last seen </p>
                 </div>
             <div className='Chat-header_Right'>
             <IconButton>
                  <SearchOutlined />
             </IconButton>
             <IconButton>
                  <AttachFile/>
             </IconButton>
             <IconButton>
                  <MoreVert/>
             </IconButton>

             </div>
            </div>
        <div className="chat-body">
         {messages.map(message=>(
            <p className={`chat-message ${message.received && 'chat-receiver'}`}>
            <span className="chat-name">{message.name}</span>
             {message.message}
             <span className="chat-time">{message.timestamp}</span>

           </p>
         ))}
             
         </div>
         <div className="chat-footer">
              <InsertEmoticon/>
               <form>
                  <input value={input} placeholder="Type a Message" type="text" onChange={event=>SetInput(event.target.value)}/>
                   <button onClick={sendMessage}type="submit">Send</button>
               </form>
              <Mic/>
         </div>

        </div>
    );
};

export default Chat;