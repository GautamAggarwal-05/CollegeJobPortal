"use client"
import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area"
import CandidateList from "../candidate-list";

function JobApplicants({
    showApplicatnsDrawer,
    setShowApplicatnsDrawer,
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
    currentCandidateDetails,
    setCurrentCandidateDetails,
    jobApplications
}){
    return (
                <Drawer open={showApplicatnsDrawer} onOpenChange={setShowApplicatnsDrawer}>
                <DrawerContent className="max-h-[50vh] ">
                    <ScrollArea className="h-auto overflow-y-auto">
                        <CandidateList
                        currentCandidateDetails={currentCandidateDetails}
                        setCurrentCandidateDetails={setCurrentCandidateDetails}
                        jobApplications={jobApplications}
                        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
                        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
                        />
                    </ScrollArea>   
                </DrawerContent>
        </Drawer>
    )
}

export default JobApplicants;