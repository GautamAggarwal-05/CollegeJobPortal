import { currentUser } from "@clerk/nextjs/server"
import Header from "../Header/header.js"
async function CommonLayout ({children}){
    const user = await currentUser();
    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-4">
            {/* Header component  */}
            <Header user={JSON.parse(JSON.stringify(user))}/>
            {/* Header component  */}

            {/* main component  */}
                <main>{children}</main>
            {/* main component  */}
        </div>
    )
}

export default CommonLayout