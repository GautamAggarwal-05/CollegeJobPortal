//server component 
import { redirect } from 'next/navigation';
import OnBoard from '../../components/on-board';
import { currentUser } from '@clerk/nextjs/server';
import { fetchProfileAction } from '../../actions';
async function OnBoardPage(){
    // get auth user form clerk 
    const user  = await currentUser();
    //fetch the profile info->either user is student or admin 
    const profileInfo = await fetchProfileAction(user?.id);
    if(profileInfo?._id){
       if( profileInfo?.role === 'admin'&&!profileInfo.isPremiumUser)
            redirect('/membership');
        else
            redirect('/')
    }
    else{
        return <OnBoard/>
    }
}

export default OnBoardPage;