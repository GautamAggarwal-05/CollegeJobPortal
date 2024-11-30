import { currentUser } from "@clerk/nextjs/server"
import Header from "../Header/header.js"
import { fetchProfileAction } from "@/actions/index.js";
async function CommonLayout ({children}){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-4">
            {/* Header component  */}
            <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))}/>
            {/* Header component  */}

            {/* main component  */}
                <main>{children}</main>
            {/* main component  */}
        </div>
    )
}

export default CommonLayout