import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import movieRouter from './routes/movieroute.js';
import userRouter from './routes/userrouter.js';
// import 'dotenv/config'
import dotenv from 'dotenv';
import cartRouter from './routes/cartroute.js';
// import orderRouter from './routes/orderRouter.js';
dotenv.config();

const app=express();
const port=4000;

app.use(express.json())

app.use(cors());
app.use(cors({origin:'http://localhost:5174'}))

connectDB();

app.use('/api',movieRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
// app.use('/api/order',orderRouter);
// app.use('/success',(req,res)=>{
//     res.send('SuccessFull Payment')
// })
// app.get('/cancel',(req,res)=>{
//     res.send('Payment Failed')
// })

app.use('/images',express.static('uploads'))

app.get('/',(req,res)=>{
    res.send('api working')
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})

