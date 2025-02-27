import userModel from "../models/userModel.js";

const addToCart=async (req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userID});
        let cartData=await userData.cartData;
        // let product=await movieModel.findOne({_id:req.body.itemId});

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;

        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userID,{cartData});
        res.json({success:true,message:"Added to cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }


}

const removeFromCart=async (req,res)=>{

    try{
        let userData=await userModel.findById(req.body.userID);
        let cartData= await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userID,{cartData});
        res.json({success:true,message:"Removed From Cart"});
    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"Error"})

    }



}

const getCart=async (req,res)=>{
    
    try{
        let userData=await userModel.findById(req.body.userID);
        let cartData=await userData.cartData;
        res.json({success:true,cartData});

    }
    catch(e){
        console.log(e);
        res.json({success:false,message:"Error"})

    }

}

export {addToCart,removeFromCart,getCart}
