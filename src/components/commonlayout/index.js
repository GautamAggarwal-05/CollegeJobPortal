import { currentUser } from "@clerk/nextjs/server"
import Header from "../Header/header.js"
import { fetchProfileAction } from "@/actions/index.js";
import * as React from "react";
import { ThemeProvider as NextThemesProvider} from "next-themes"
async function CommonLayout ({children,...props}){
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);
    return (
        <NextThemesProvider {...props}>
            <div className="mx-auto max-w-7xl p-6 lg:px-8">
            {/* Header component  */}
            <Header profileInfo={profileInfo} user={JSON.parse(JSON.stringify(user))}/>
            {/* Header component  */}

            {/* main component  */}
                <main>{children}</main>
            {/* main component  */}
        </div>
        </NextThemesProvider>
    )
}

export default CommonLayout