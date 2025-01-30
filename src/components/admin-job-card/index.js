"use client";

import { deleteJobAction } from "../../actions";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { useState } from "react";
import JobApplicants from "../job-applicants";
import { useToast } from '@/hooks/use-toast';
    function AdminJobCard({jobItem,jobApplications,profileInfo}){
        console.log("jobApplication for admin ",jobItem)

        const[showApplicatnsDrawer,setShowApplicatnsDrawer] = useState(false);
        const[currentCandidateDetails,setCurrentCandidateDetails] = useState(null);
        const[showCurrentCandidateDetailsModal,setShowCurrentCandidateDetailsModal] = useState(false);
        const {toast} = useToast() 

        async function handleDeleteJob() {
            try {
                await deleteJobAction(jobItem._id,profileInfo?.userId, "/jobs");
                toast({
                    title: "Job Deleted Successfully",
                    description: `Job listing for ${jobFormData?.role} at ${jobFormData?.companyName} was deleted successfully`,
                  })
            } catch (error) {
                console.error(error);
                toast({
                    title: "Failed To deleted Job",
                    description: `Job listing for ${jobFormData?.role} at ${jobFormData?.companyName}`,
                  })
            }  
        }  
        return (
            <div className="w-full mt-3 ">
                <CommonCard
                icon = {<JobIcon/>}
                title = {jobItem.role}
                footerContent={
                    <div className="flex  items-center h-full gap-3">
                    <Button
                        className="disabled:opacity-55 flex h-11 items-center justify-center px-5 text-sm font-medium bg-gray-800 text-white hover:bg-gray-950 rounded-md shadow-md transition-all duration-300 "
                        onClick={()=> setShowApplicatnsDrawer(true)}
                        disabled={jobApplications.filter((item)=> item.jobID === jobItem?._id).length === 0}
                    >
                        {jobApplications.filter((item) => item.jobID === jobItem._id).length}{" "}
                        {jobApplications.filter((item) => item.jobID === jobItem._id).length === 1 
                            ? (<>Applicant <FaUserLarge /></>) 
                            : (<>Applicants <FaUserGroup /></>)
                        }
                    </Button>
                    <Button
                        className="flex items-center justify-center h-11 w-11 bg-red-500 text-white hover:bg-red-600 rounded-full shadow-md transition-all duration-300"
                        onClick={handleDeleteJob}
                    >
                        <RiDeleteBin4Fill />
                    </Button>
                </div>
                }
                />
                <JobApplicants
                showApplicatnsDrawer={showApplicatnsDrawer}
                setShowApplicatnsDrawer={setShowApplicatnsDrawer}
                showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                jobItem={jobItem}
                jobApplications={jobApplications.filter(jobApplicantItem =>jobApplicantItem.jobID === jobItem?._id)}   
                />
            </div>

        );
    }

export default AdminJobCard; 