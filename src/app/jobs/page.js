
import JobListing from "../../job-listing";
import { currentUser } from '@clerk/nextjs/server';
import {fetchProfileAction,fetchJobforAdminAction, fetchJobforstudentsAction, fetchJobApplicationForStudent, fetchJobApplicationForAdmin, createFilterCategoryAction} from '../../actions'
async function JobsPage({searchParams}){
    console.log(await searchParams,'searchparams')
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    //fetch list of jobs
    const jobList = profileInfo?.role === 'student' ?
    await fetchJobforstudentsAction(searchParams)
    :  await fetchJobforAdminAction(user?.id);
    console.log("----------JobListing --------",jobList);

    const getJobApplicationList = profileInfo?.role === 'student'? await fetchJobApplicationForStudent(user?.id):
    await fetchJobApplicationForAdmin(user?.id)

    const fetchFilterCategories = await createFilterCategoryAction()
    return (
        <JobListing
        user= { JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
        jobList = {jobList}
        jobApplications = {getJobApplicationList}
        filterCategoties = {fetchFilterCategories}
        />
    )
}

export default JobsPage;