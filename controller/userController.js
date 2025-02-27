import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import userRouter from "../routes/userrouter.js";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    const{email,password}=req.body;
    try{
        const user=await userModel.find({email});
        console.log("user:",user)
        if(user.length==0){
            res.json({success:false,message:"user doesnot exists, please register first"})
        }

        const isMatch=await bcrypt.compare(password,user[0].password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})

        }
        const token=createToken(user[0]._id);
        res.json({success:true,message:"Login successfull",token})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    // const createToken=(id)=>{
    //     return jwt.sign({id}),process.env.JWT_SECRET
    //     // console.log("JWT_SECRET:", process.env.JWT_SECRET);
    // }
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })

        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter Valid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter Strong Password" })

        }

        const salt= await bcrypt.genSalt(10);
       let hashedpassword=await bcrypt.hash(password,salt)
        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedpassword
    });
        const user=await newUser.save();
        let token=createToken(user._id)
        // jwt.sign({id},process.env.JWT_SECRET);
        res.json({success:true,message:"successfully registered",token})


    }

    catch (error) {

        console.log(error);
        res.json({success:false, message:error})
    }

}



export { loginUser, registerUser }


