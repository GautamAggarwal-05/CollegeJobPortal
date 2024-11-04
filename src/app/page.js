import { currentUser } from "@clerk/nextjs/server";
import {redirect} from "next/navigation"
import { fetchProfileAction } from '../actions/index';
// authenticated --> profile info --> onboard as a student or college admin 
// if profile info is not there means new user then redirect this user to onboard  page
async function Home() {
  const user = await currentUser(); // this is a hook provided by the clerk to auntenticate the current user  returns the current user backend API
  // if(!user) redirect('/sign-up')
  const profileInfo = await fetchProfileAction(user?.id); // student or college admin
  // if user is available and profile info is not available 
  if(user && !profileInfo?._id) redirect('/onboard')
  return (
    <section>
      Main Content
    </section>

  );
}
export default Home;
