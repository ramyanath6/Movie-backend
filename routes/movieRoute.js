import { AddMovie } from "../controller/moviecontroller.js";
import multer from 'multer';
import express from 'express'

const app=express()

const movieRouter=express.Router();

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})
movieRouter.post('/add', AddMovie);
console.log('added');

export default movieRouter