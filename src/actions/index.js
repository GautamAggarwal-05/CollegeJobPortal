"use server"

import  connectToDB  from "../database/index";
import Profile from "../models/profile"
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