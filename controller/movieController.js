import movieModel from "../models/ticketModel.js";
import fs from 'fs';

export const AddMovie = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    console.log(image_filename);

    const  { name, description, price, category } = req.body;
    const image=image_filename

    const movie = new movieModel({
        name,
        description,
        price,
        category,
        image
        
    })

    try{
        await movie.save();
        res.json({success:true,message:'movie added successfully'})
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:'error'})
    }
}
export const DelMovie=async(req,res)=>{
    try{
        // const movie=await movieModel.findById(req.body.id);
        // console.log(req.body.id);
        // fs.unlink('uploads/${movie.image}',()=>{})
   const movie= await movieModel.findByIdAndDelete(req.body.id);
   console.log(movie)
    res.json({success:true,message:'food removed'})
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"error"})
    }
}


export const listMovie=async(req,res)=>{
    try{
        const movies=await movieModel.find({});
        res.json({success:true,data:movies})
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:e})
    }
    // const movies=await movieModel.find({});
    // res.send(movies);
}