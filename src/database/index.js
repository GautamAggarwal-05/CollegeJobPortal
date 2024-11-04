import mongoose from "mongoose";
// database connection 
const connectToDB = async()=>{
    const connectionURL = "mongodb+srv://aggarwalgautam06:Gautam2003@gautam.rdttn.mongodb.net/";
    mongoose.connect(connectionURL)
        .then(()=>console.log("Connect is successful"))
        .catch((error)=>console.log(error));
}
export default connectToDB;