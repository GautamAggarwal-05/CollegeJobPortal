import { redirect } from "next/navigation";
import { fetchJobforstudentsAction, fetchProfileAction } from "../../actions";
import Companies from "../../components/companies";
import { currentUser } from '@clerk/nextjs/server';

async function CompaniesPage(){
    const user= await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)

    if(!profileInfo)
         redirect('/onboard')

    const jobsList = await fetchJobforstudentsAction({});

    return (
        <Companies jobsList={jobsList}/>
    )
}

export default CompaniesPage;