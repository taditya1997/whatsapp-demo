import Sidebar from './Sidebar.js'
import './App.css';
import Chat from './Chat.js'
import { useEffect,useState} from "react";
import Pusher from 'pusher-js';
import axios from './axios';

function App() 
{
 const [messages,setMessages]=useState([]);
  useEffect(()=>{
    axios.get('/messages/sync')
    .then(Response=>{
      setMessages(Response.data);
    })
  },[])



useEffect(()=>{
  
  const pusher = new Pusher('71db67e75501ff301660', {
    cluster: 'ap2'
  });
  const channel = pusher.subscribe('messages');
  channel.bind('inserted', function(data) {
    alert(JSON.stringify(data));
    setMessages([...messages,data])
  });

  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  }

},[messages])

console.log(messages);

  return (
    <div className="app">
    <div className="app_body">
    <Sidebar/>
      <Chat messages={messages}/>
      </div>
      
    </div>
  );
}

export default App;
