import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat.js';
const Sidebar = () => {
    return (
        
        <div className="Sidebar">
          <div className="Sidebar_header">
          <Avatar src="https://ca.slack-edge.com/TN7HY14KE-U01C7JW266S-94f96dbf243f-512"/>
             <div className="Sidebar_header_right">
                 <IconButton>
                     <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                     <ChatIcon/>
                </IconButton>
                <IconButton>
                     <MoreVertIcon/>
                </IconButton>

             </div>
          </div>
          <div className="sidebar_Search">
          <div className="sidebar-SearchContainer">
          <SearchOutlined />
          <input placeholder="Search to start a new chat" type="text"/>
          </div>
          </div>
          <div className="sidebar_chats">
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
          </div>
        </div>
    );
}

export default Sidebar;