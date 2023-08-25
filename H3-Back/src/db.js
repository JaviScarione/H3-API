import mongoose from 'mongoose'

export const connectDB = async () => { 
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/h3");   
        console.log('>>> DB is connnected');     
    } catch (error) {
        console.log(error);
    }
};