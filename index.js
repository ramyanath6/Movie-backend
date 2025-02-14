import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import movieRouter from './routes/movieroute.js';

const app=express();
const port=4000;

app.use(express.json())

app.use(cors());

connectDB();

app.use('/api',movieRouter)

// app.use('/images',express.static('uploads'))

app.get('/',(req,res)=>{
    res.send('api working')
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})

