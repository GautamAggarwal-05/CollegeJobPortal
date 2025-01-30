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
                <Drawer open={showApplicatnsDrawer} onOpenChange={(isOpen) => setShowApplicatnsDrawer(isOpen)}>
                <DrawerContent className="max-h-[50vh] dark:text-black">
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