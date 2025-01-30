import { redirect } from "next/navigation";
import { fetchAllFeedPostAction, fetchProfileAction } from "../../actions";
import Feed from "../../components/feed";
import { currentUser } from '@clerk/nextjs/server';

async function FeedPage(){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    if(!profileInfo) redirect('/onboard');

    const allFeedPost = await  fetchAllFeedPostAction();

    return (
            <Feed 
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
            allFeedPost={allFeedPost} />
    );
}
export default FeedPage;