import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    companyName: String,
    role: String,
    batchEligible: String,
    expectedStipend: String,
    location: String,
    applyLink: String,
    adminId: String,
    applicants :[
        {
            name: String,
            email: String,
            userId:String,
            status: String,
        }
    ]

})

const Job = mongoose.models.Job || mongoose.model("Job",JobSchema);
export default Job;