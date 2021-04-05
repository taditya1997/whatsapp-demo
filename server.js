import express from 'express';
import mongoose from 'mongoose';
import Messages from './message.js';
import Pusher from 'pusher';
import cors from 'cors';
import 'path';


const app=express();






//Initiializing ports
const port= process.env.PORT||9000;

app.use(express.json());

/*if(process.env.Node.ENV==="production")
{
    app.use(express.static(path.join(__dirname, '../whatsapp/build')));
}*/


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});

app.use(cors())



//DataBase Configuration
const url=`mongodb+srv://taditya1997whatsapp:Wh9mARzTSLf48BuZ@cluster0.ro61h.mongodb.net/WhatsappDataBase?retryWrites=true&w=majority`
mongoose.connect(url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db=mongoose.connection;

db.once("open",()=>{
    console.log("DB Connected");

    const msgCollection=db.collection("messagecontents");
    const changeStream=msgCollection.watch();

    changeStream.on("change",(change)=>{
        console.log(change);

        if(change.operationType==="insert")
        {
            const messageDetails=change.fullDocument;
            pusher.trigger("messages","inserted",{
                name: messageDetails.user,
                message: messageDetails.message,
                timestamp:messageDetails.timestamp
            })
        }
        else
        {
            console.log("Error Trigering Pusher");
        }
    })
})

//Adding Pusher to the Pusher

const pusher = new Pusher({
    appId: "1182804",
    key: "71db67e75501ff301660",
    secret: "aa5b936105f29f806d22",
    cluster: "ap2",
    useTLS: true
  });

//Middle Ware



//routing
app.get('/',(req,res)=>res.status(200).send("hello world"));



app.get('/messages/sync',(req,res)=>
{
    Messages.find((err,data)=>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})


//posting the req made by the user to the database
app.post('/messages/new',(req,res)=>{
    const dbMessage= req.body;
    
    Messages.create(dbMessage,(err,data)=>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send(data);
        }

    })


})


//Listening to port

app.listen(port, ()=>console.log(`Listening on the port${port}`));