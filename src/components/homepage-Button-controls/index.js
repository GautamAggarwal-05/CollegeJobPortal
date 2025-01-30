'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

function HomePageButtonControls({user,profileInfo}) {
    const router = useRouter();
    useEffect(()=>{
        router.refresh(); 
    },[])

    console.log(profileInfo?.role);
    return (
        <div className="flex space-x-4 mt-24">
            <Button onClick={()=>router.push(user?'/jobs':'/sign-up')} className=" flex h-11 items-center justify-center px-5">
                {
                    user?profileInfo?.role === 'student' ? 'Browse Jobs' : 'Post New Job' : 'Sign Up'
                }
            </Button>
            <Button onClick={()=>router.push(user?profileInfo?.role === 'student'?'/feed':'/feed':'/sign-in')} className=" flex h-11 items-center justify-center px-5">
                {
                     user?profileInfo?.role === 'student' ? ' Your Feed' : 'Your Feed' : 'Sign In'
                }
            </Button>
        </div>  
    )
}

export default HomePageButtonControls;