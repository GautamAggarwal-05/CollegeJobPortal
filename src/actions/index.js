"use server"

import  connectToDB  from "../database/index";
import Profile from "../models/profile"
import Job from "../models/job";
import Feed from "../models/feed";
import Application from "../models/application";
import {revalidatePath} from "next/cache";
//create profile action
export async function createProfile(formData,pathToRevalidate){
    await connectToDB();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate)
}

export async function fetchProfileAction(id){
    await connectToDB();
    const result = await Profile.findOne({userId:id})
    return JSON.parse(JSON.stringify(result))
}

//create a job action
export async function PostNewJobAction(formData,pathToRevalidate){
    await connectToDB();
    await Job.create(formData);
    revalidatePath(pathToRevalidate)
}

export async function deleteJobAction(jobId,adminId,pathToRevalidate) {
    await connectToDB();
    const job = await Job.findById(jobId);
    if(!job){
        throw new Error("Job Not Found");
    }
    if(job.adminId !== adminId){
        throw new Error("You are not authorized to delete this job.");
    }
    await Job.findByIdAndDelete(jobId);
    revalidatePath(pathToRevalidate);

    return { message: "Job deleted successfully" };
}

//fetch a job action
//admin
export async function fetchJobforAdminAction(id){
    await connectToDB();
    const result = await Job.find({adminId:id});

    return JSON.parse(JSON.stringify(result))
}
// to show jobs to students
export async function fetchJobforstudentsAction(filterParams = {}){
    await connectToDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterkey)=>{
        const filterValue = filterParams[filterkey];
        if (filterValue && typeof filterValue === "string" && filterValue.trim()) {
            // Only process non-empty strings
            updatedParams[filterkey] = { $in: filterValue.split(",") };
        }
    })

    console.log(updatedParams, "updatedParams")
    const result = await Job.find(filterParams && Object.keys(filterParams).length > 0 ?updatedParams: {}
    );

    return JSON.parse(JSON.stringify(result));
}

//create Job Application
export async function createJobApplication(data,pathToRevalidate){
    await connectToDB();
    await Application.create(data)
    revalidatePath(pathToRevalidate);
}
//fetch job Application-student
export async function fetchJobApplicationForStudent(studentID){
    await connectToDB();
    const result = await Application.find({studentUserID:studentID});
    return JSON.parse(JSON.stringify(result));
}

//fetch job Application-admin
export async function fetchJobApplicationForAdmin(adminID){
    await connectToDB();
    const result = await Application.find({adminUserID:adminID});
    return JSON.parse(JSON.stringify(result));
}

//update job applications


//get candidate details by candidate Id
export async function getCandidateDetailsByIDAction(currentCandidateID){
    await connectToDB();
    const result = await Profile.findOne({userId:currentCandidateID});
    return JSON.parse(JSON.stringify(result));
}

//create filter category
export async function createFilterCategoryAction(){
    await connectToDB();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
}

//update profile action from account page
export async function updateProfileAction(data,pathToRevalidate){
    await connectToDB();
    const {
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipEndDate,
        adminInfo,
        studentInfo,
        _id,
    } = data;
    
    await Profile.findOneAndUpdate({
        _id:_id
    },{
        userId,email,role,isPremiumUser,memberShipType,memberShipStartDate,memberShipEndDate,adminInfo,studentInfo
    },{new:true});
    revalidatePath(pathToRevalidate)
}

//create Post Action
export async function createFeedPostAction(data,pathToRevalidate){
   await connectToDB();
   await Feed.create(data);
   revalidatePath(pathToRevalidate) 
}
//fetch all posts Action
export async function fetchAllFeedPostAction(){
    await connectToDB();
    const result = await Feed.find({});
    return JSON.parse(JSON.stringify(result));
}
//update post Action- to update likes
export async function updateFeedPostAction(data,pathToRevalidate){
    await connectToDB();
    const{userId,userName,message,image,likes,_id}=data;
    await Feed.findOneAndUpdate({
        _id:_id
    },{
        userId,userName,message,image,likes
    },{new:true});

    revalidatePath(pathToRevalidate)
}

//delete post Action
export async function deleteFeedAction(feedId,userId,pathToRevalidate) {
    await connectToDB();
    const feed = await Feed.findById(feedId);
    if(!feed){
        throw new Error("Feed Not Found");
    }
    if(feed.userId !== userId){
        throw new Error("You are not authorized to delete this Feed.");
    }
    await Feed.findByIdAndDelete(feedId);
    revalidatePath(pathToRevalidate);

    return { message: "Job deleted successfully" };
}
