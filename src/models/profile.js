// i am going to manage the student and admin both here beacuse either u can onboard as a student or admin
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: String,
    role:String,
    email:String,
    isPremiumUser : Boolean,
    memberShipType : String,
    memberShipStartDate : String,
    memberShipEndDate : String,
    adminInfo : {
        name:String,
        collegeName:String,
        collegeLocation:String,
        role:String,
        department:String 
    },
    studentInfo : {
    resume: String,
    name: String,
    collegeName: String,
    currentYear: String,
    currentLocation: String,
    homeAddress: String,
    currentCGPA: String,
    skills: String,
    degreeProgram: String,
    fieldStudy: String,
    extracurricularActivity: String,
    linkedinProfile: String,
    githubProfile: String
    }
});

const Profile = mongoose.models.Profile ||  mongoose.model("Profile", ProfileSchema);

export default Profile;