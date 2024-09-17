import mongoose from "mongoose"


export const connectDB = async () =>{
     await mongoose.connect('mongodb+srv://ranasinghe:12345@cluster0.apfqb.mongodb.net/my-resturant').then(()=>console.log("DB Connected"));
}
