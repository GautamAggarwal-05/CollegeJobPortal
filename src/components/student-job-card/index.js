"use client";
import { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { createJobApplication } from "../../actions";

function StudentJobCard({ jobItem,profileInfo,jobApplications}) {
    const [showJobDetailDrawer, setShowJobDetailDrawer] = useState(false);
    console.log("jobApplications for students",jobApplications)
    async function handleJobApply(){
        await createJobApplication({
            adminUserID : jobItem?.adminId,
            name : profileInfo?.studentInfo?.name,
            email : profileInfo?.email,
            studentUserID : profileInfo?.userId,
            status : ['Applied'],
            jobID: jobItem?._id,
            jobAppliedDate : new Date().toLocaleDateString(),
        },'/jobs');
        setShowJobDetailDrawer(false);
    }

    return (
        <Fragment>
            {/* Main Card */}
            <CommonCard
                icon={<JobIcon />}
                title={jobItem.role}
                description={`${jobItem.companyName} - ${jobItem.location}`}
                footerContent={
                    <Button
                        className="flex h-11 items-center justify-center px-5"
                        onClick={() => setShowJobDetailDrawer(true)}
                    >
                        View Details
                    </Button>
                }
            >
                {/* Adding additional details to the card */}
                <div className="mt-3 text-sm text-gray-600">
                    <p><strong>Batch Eligible:</strong> {jobItem.batchEligible}</p>
                    <p><strong>Stipend:</strong> ₹{jobItem.expectedStipend}</p>
                </div>
            </CommonCard>

            {/* Drawer for detailed view */}
            <Drawer
                open={showJobDetailDrawer}
                onOpenChange={(isOpen) => setShowJobDetailDrawer(isOpen)}
            >
                <DrawerContent className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
                    <DrawerHeader className="px-0 border-b pb-4">
                        <div className="flex justify-between items-center">
                            <DrawerTitle className="text-2xl font-bold text-gray-900">
                                {jobItem.role}
                            </DrawerTitle>
                            <div className="flex space-x-2">
                                    <Button
                                        className="disabled:opacity-65 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-md"
                                        disabled={jobApplications.findIndex(item=>item.jobID === jobItem?._id)>-1? true:false }//if candiadte applied for a job disable apply button 
                                        onClick={handleJobApply}
                                    >
                                       { <a
                                    href={jobItem.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                        {jobApplications.findIndex(item=>item.jobID === jobItem?._id)>-1? "Applied":"Apply" }
                                    </a>}
                                </Button>
                                <Button
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-md"
                                    onClick={() => setShowJobDetailDrawer(false)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>
                    <div className="mt-6 space-y-4">
                        <p className="text-lg">
                            <strong className="font-semibold text-gray-800">Company:</strong>{" "}
                            {jobItem.companyName}
                        </p>
                        <p className="text-lg">
                            <strong className="font-semibold text-gray-800">Location:</strong>{" "}
                            {jobItem.location}
                        </p>
                        <p className="text-lg">
                            <strong className="font-semibold text-gray-800">Batch Eligible:</strong>{" "}
                            {jobItem.batchEligible}
                        </p>
                        <p className="text-lg">
                            <strong className="font-semibold text-gray-800">Stipend:</strong>{" "}
                            ₹{jobItem.expectedStipend}
                        </p>
                    </div>
                </DrawerContent>
            </Drawer>


        </Fragment>
    );
}

export default StudentJobCard;
