import mongoose from "mongoose";
// database connection 
const connectToDB = async()=>{
    const connectionURL = `${process.env.MONGODB_URL}`
    mongoose.connect(connectionURL)
        .then(()=>console.log("Connect is successful"))
        .catch((error)=>console.log(error));
}
export default connectToDB;
