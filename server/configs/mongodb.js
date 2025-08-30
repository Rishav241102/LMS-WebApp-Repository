import mongoose from "mongoose"

// Coonect to the MongoDB database

const connectDB = async()=>{
    mongoose.connection.on('connected',()=> console.log('Databse Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/LMS`)
}
export default connectDB