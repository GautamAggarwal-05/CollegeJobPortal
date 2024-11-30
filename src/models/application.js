import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    adminUserID : String,
    name : String,//candidate
    email : String,//candidate
    studentUserID : String,
    status : Array,
    jobID: String,
    jobAppliedDate : String
})

const Application = mongoose.models.Application || mongoose.model('Application',applicationSchema)

export default Application;