import mongoose from 'mongoose';

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://movieticket:movieticket@cluster0.ig8l6.mongodb.net/ticketDB?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        // console.log("MongoDB URI:", process.env.MONGO_URI);

        console.log('Database Connected')
    })
}