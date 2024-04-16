import express from 'express';
import {createServer} from 'node:http';
import { dirname,join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const app=express();
const server=createServer(app);
const io=new Server(server);


app.use(express.static('public'));
const __dirname=dirname(fileURLToPath(import.meta.url));

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,"index.html"))
    
})

//waiting for connection
io.on('connection',(socket)=>{
   console.log("user is connected");
    console.log(socket.id);


   //waiting for data to send to another client
   socket.on('send_message',(msg)=>{
    io.emit('send_message',msg);
   })

   //listen on socket to disconnect
   socket.on('disconnect',(reason)=>{
    console.log(reason);
    console.log('user is disconnected');
   })
})

const PORT=5000;
server.listen(PORT,()=>{
    console.log("Server is running at 5000")
})
