'use client'

import { useEffect, useState } from "react";
import { adminOnboardFormControls, initialadminFormData, initialstudentAccountFormData, studentOnboardFormControls } from "../../utils";
import CommonForm from "../common-form";
import { updateProfileAction } from "../../actions";

function AccountInfo({profileInfo}){
    const [studentFormData,setStudentFormData] = useState(initialstudentAccountFormData);
    const [adminFormData,setadminFormData] = useState(initialadminFormData);

    useEffect(()=>{
        if(profileInfo?.role == 'admin')
                setadminFormData(profileInfo?.adminInfo)
        if(profileInfo?.role == 'student')
                setStudentFormData(profileInfo?.studentInfo)
    },[profileInfo])
    
    console.log(profileInfo)

    async function handleUpdateAccountInfo(){
        await updateProfileAction(profileInfo?.role==='student'?{
            _id:profileInfo?._id,
            userId : profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            studentInfo:{
                ...studentFormData,
                resume: profileInfo?.studentInfo.resume
            }   
        }:{
            _id:profileInfo?._id,
            userId : profileInfo?.userId,
            role: profileInfo?.role,
            email: profileInfo?.email,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            adminInfo:{
                ...adminFormData
            }   
        }
        ,'/account')
    }

    return (
        <div className="mx-auto max-w-7xl ">
            <div className="flex items-baseline justify-between pb-6 border-b pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">Account Details</h1>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                {/*  */}
                    <CommonForm
                    action={handleUpdateAccountInfo}
                    formControls={
                        profileInfo?.role == 'student'
                        ? studentOnboardFormControls.filter(formControl => formControl.name !== 'resume')
                        : adminOnboardFormControls 
                    }
                    formData={profileInfo?.role === 'student'
                        ?studentFormData
                        :adminFormData
                    }
                    setFormData={profileInfo?.role === 'student'
                        ?setStudentFormData
                        :setadminFormData}
                    buttonText='Update Profile'
                    /> 
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;