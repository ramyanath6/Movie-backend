import movieModel from "../models/ticketModel.js";

export const AddMovie = async (req, res) => {
    let image_filename = `${req.file.filename}`;

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
   


    // name:req.body.name,
    // description:req.body.description,
    // price:req.body.price,
    // category:req.body.category,
    // image:image_filename

}


