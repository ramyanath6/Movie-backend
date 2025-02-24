import { AddMovie, DelMovie ,listMovie} from "../controller/movieController.js";
import multer from 'multer';
import express from 'express'



const app=express()
app.use(express.urlencoded({extended:false}));
app.use(express.json())

const movieRouter=express.Router();

const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})
movieRouter.post('/add',upload.single('image'), AddMovie);

movieRouter.get('/list',listMovie);

movieRouter.post('/del', DelMovie);

export default movieRouter