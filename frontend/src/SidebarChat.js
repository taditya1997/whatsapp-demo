import React from 'react';
import './SidebarChat.css'
import {Avatar} from '@material-ui/core';

const SidebarChat = () => {
    return (
        <div className="sidebarchat">
        <Avatar/>
        <div className="sidebarChat_Info">
        <h2>Room Name</h2>
        <p>This is the last message</p>
        </div>
        </div>
        
    );
};

export default SidebarChat;