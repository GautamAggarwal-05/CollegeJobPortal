'use client';

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog,  DialogContent, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import { getCandidateDetailsByIDAction } from "../../actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient('https://kbtkqdwvvrrpktlcesxw.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidGtxZHd2dnJycGt0bGNlc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTQxMTQsImV4cCI6MjA0NzMzMDExNH0.mNhlvQTdGsCSNzIEv5TNroQcJszF71v6N_UXa4l4O1c')
function CandidateList({
    jobApplications,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
}) {
    async function handleFetchCandidateDetails(getCurrentCandidateId) {
        const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);
        if (data) {
            setCurrentCandidateDetails(data);
            setShowCurrentCandidateDetailsModal(true);
        }
    }

    function handlePreviewResume(){
        const {data} = supabaseClient.storage.from('job-board-public').getPublicUrl(currentCandidateDetails?.studentInfo?.resume)
        console.log(data,"resume")
        const a=document.createElement('a');
        a.href = data?.publicUrl;
        a.setAttribute('download','Resume.pdf');
        a.setAttribute('target','_blank');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <Fragment>
            {/* Job Applications Grid */}
            <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
                {jobApplications && jobApplications.length > 0 ? (
                    jobApplications.map((jobApplicantItem, index) => (
                        <div
                            className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
                            key={index}
                        >
                            <div className="px-4 my-6 flex justify-between items-center">
                                <h3 className="text-lg font-bold">{jobApplicantItem?.name}</h3>
                                <Button
                                    className="flex h-11 items-center justify-center px-5"
                                    onClick={() => handleFetchCandidateDetails(jobApplicantItem?.studentUserID)}
                                >
                                    View Profile
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No job applications available.</p>
                )}
            </div>

            {/* Dialog Box */}
            {showCurrentCandidateDetailsModal && (
                <Dialog open={showCurrentCandidateDetailsModal} onOpenChange={(isOpen) => setShowCurrentCandidateDetailsModal(isOpen)}>
                    <DialogContent
                        className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50 p-4"
                        style={{
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full   relative mb-[80vh]">
                            <DialogClose
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                                onClick={() => setShowCurrentCandidateDetailsModal(false)}
                            >
                                ✕
                            </DialogClose>
                            {currentCandidateDetails ? (
                                <div>
                                    <DialogTitle className="text-2xl font-bold mb-4">Candidate Details</DialogTitle>
                                    <div className="space-y-4">
                                        <p>
                                            <span className="font-semibold">Name:</span>{" "}
                                            {currentCandidateDetails?.studentInfo?.name}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Email:</span>{" "}
                                            {currentCandidateDetails?.email}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Current Year:</span>{" "}
                                            {currentCandidateDetails?.studentInfo?.currentYear}
                                        </p>
                                        <p>
                                            <span className="font-semibold">CGPA:</span>{" "}
                                            {currentCandidateDetails?.studentInfo?.currentCGPA}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Degree Program:</span>{" "}
                                            {currentCandidateDetails?.studentInfo?.degreeProgram}
                                        </p>
                                        <div className="flex gap-4 mt-6 flex-wrap">
                                        <span className="font-semibold"> Skills:</span> {currentCandidateDetails?.studentInfo?.skills.split(",").map((skillItem,index)=>(
                                                <div key={index} className="w-[6vw] flex justify-center items-center h-[5vh] bg-black rounded-sm">
                                                    <h2 className="text-[13px] font-medium text-white">
                                                      {skillItem}
                                                    </h2>
                                                </div>
                                            ))}
                                        </div>
                                        <Button onClick={handlePreviewResume} flex h-11 items-center justify-center px-5>Resume</Button>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading candidate details...</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </Fragment>
    );
}

export default CandidateList;
