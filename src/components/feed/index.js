'use client'
import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { TbCirclePlus } from "react-icons/tb";
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createFeedPostAction, deleteFeedAction, updateFeedPostAction } from "../../actions";
import { createClient } from "@supabase/supabase-js";
import{Heart} from "lucide-react"
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useToast } from '@/hooks/use-toast';

  
function Feed({user,profileInfo,allFeedPost}){
    const supabaseClient = createClient('https://kbtkqdwvvrrpktlcesxw.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidGtxZHd2dnJycGt0bGNlc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NTQxMTQsImV4cCI6MjA0NzMzMDExNH0.mNhlvQTdGsCSNzIEv5TNroQcJszF71v6N_UXa4l4O1c')
    console.log('FEED',allFeedPost);
    console.log('USER',user);
    //create a state to handle a dialog(post feed)
    const [showPostDialog,setShowPostDialog] = useState(false);
    const [formData,setFormData] = useState({
        message:'',
        imageURL:''
    });
    const[imageData,setImageData] = useState(null);
    const {toast} = useToast()

    function handleFileonChange(event){
        event.preventDefault();
        setImageData(event.target.files[0]);
    }

     function handleFetchImagePublicUrl(getData){
        const {data} =  supabaseClient.storage.from('job-board-public').getPublicUrl(getData.path);

        console.log(data);
        if(data)
            setFormData({...formData,imageURL:data.publicUrl});
    }

    async function handleUploadImageToSupabase(){
        const uniqueFileName = `${Date.now()}-${imageData?.name}`;
        const{data,error}=await supabaseClient.storage.from('job-board-public').upload(`/public/${uniqueFileName}`,imageData,{
            cacheControl:"3600",
            upsert: false,
        });
        console.log(data,error);
        if(data){
            handleFetchImagePublicUrl(data);
        }
    }

    async function handleSaveFeedPost(){
        await createFeedPostAction({
            userId: user?.id,
            userName:profileInfo?.studentInfo?.name || profileInfo?.adminInfo?.name,
            message:formData?.message,
            image: formData?.imageURL,
            likes:[],
        },'/feed')
        setFormData({
            message:'',
            imageURL:''
        })
        setShowPostDialog(false)
    }

    useEffect(()=>{
        if (imageData) {
            handleUploadImageToSupabase();
        } else if (!formData?.imageURL) {
            setFormData({
                message: formData?.message,
                imageURL: "",
            });
        }
    },[imageData])

    async function handleUpdateFeedPostLikes(getCurrentFeedPostItem){
        let cpyLikesFromCurrentFeedPostItem = [...getCurrentFeedPostItem.likes];
        const index = cpyLikesFromCurrentFeedPostItem.findIndex(likeItem=>likeItem.reactorUserId=== user?.id)
        if(index === -1) 
            cpyLikesFromCurrentFeedPostItem.push({
            reactorUserId: user?.id,
            reactorUserName:profileInfo?.studentInfo?.name || profileInfo?.adminInfo?.name,
        })
        else{
            cpyLikesFromCurrentFeedPostItem.splice(index,1);
        }
        getCurrentFeedPostItem.likes = cpyLikesFromCurrentFeedPostItem;
        await updateFeedPostAction(getCurrentFeedPostItem,"/feed");
    }

    async function handleDeleteFeedPost(feedPost){
        try {
            if (feedPost.image) {
                // Extract the file path from the image URL
                const url = new URL(feedPost.image);
                const imagePath = url.pathname.replace('/storage/v1/object/public/', '');
    
                // Delete the image from Supabase storage
                const { error } = await supabaseClient.storage
                    .from('job-board-public')
                    .remove([imagePath]);  // Use the file path you extracted
    
                if (error) {
                    console.error('Error deleting image:', error);
                    toast({
                        title: "Failed to delete image from storage.",
                        description: error.message,
                    });
                    return;
                }
            }
            await deleteFeedAction(feedPost._id,profileInfo?.userId, "/feed");
            toast({
                title: "Feed Deleted Successfully"
            })
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to delete the Feed."
            })
        }  
    }

    console.log(allFeedPost)

return (
    <Fragment>
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24 dark:border-white">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Explore Feed</h1>
                <div className="flex items-center">
                        <Button onClick={()=>setShowPostDialog(true)} className="flex h-11 items-center justify-center px-5">Add New Post</Button>
                </div>
            </div>
            <div className="py-12">
                <div className="conatiner m-auto p-0 flex flex-col gap-5 text-gray-700 ">
                    {
                        allFeedPost && allFeedPost.length > 0 ?
                        allFeedPost.map((feedPostItem)=><div key={feedPostItem._id} className="group relative -mx-4 p-6 rounded-3xl bg-gray-100 hover:bg-white hover:shadow-2xl cursor-auto shadow-2xl shadow-transparent gap-8 flex">
                            <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                                <img
                                    src={feedPostItem.image===""?"https://plchldr.co/i/500x500?&bg=ffffff&fc=000000&text=JOBSCO":feedPostItem.image}
                                    alt="JOBSCO"
                                    className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";
                                    }}
                                />
                            </div>
                            <div className="sm:p-2 sm:pl-0 sm:w-4/6">
                                    <div className="flex justify-between">
                                    <span className="mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0">{feedPostItem.userName}</span>
                                    {feedPostItem.userId === user?.id && (
                                        <Button
                                            className="flex items-center justify-center h-11 w-11 bg-red-500 text-white hover:bg-red-600 rounded-full shadow-md transition-all duration-300"
                                            onClick={() => handleDeleteFeedPost(feedPostItem)}
                                        >
                                            <RiDeleteBin4Fill />
                                        </Button>
                                    )}
                                    </div>
                                    <div className="overflow-hidden text-ellipsis whitespace-normal overflow-y-visible">
                                        <h3 className="mb-6 text-3xl font-bold text-gray-900">{feedPostItem.message}</h3>
                                    </div>

                                    <div className="flex gap-5">
                                            <Heart
                                            size={25}
                                            fill={feedPostItem?.likes?.length > 0?"	#x1F493":"#ffffff"}
                                            className="cursor-pointer"
                                            onClick={()=>handleUpdateFeedPostLikes(feedPostItem)}
                                            />
                                            <span className="font-semibold text-xl">{feedPostItem?.likes?.length}</span>
                                    </div>
                            </div>
                        </div>)
                         :
                          <h1>No posts available. Be the first to create one!</h1>
                    }
                </div>
            </div>
        </div>
        <Dialog open={showPostDialog} onOpenChange={()=>{
            setShowPostDialog(false)
            setFormData({
                message:'',
                imageURL:''
            })
        }}>
            <DialogContent className="h-[55vh]">
                <DialogTitle></DialogTitle>
                <Textarea
                name="message"
                value={formData?.message}
                onChange={(event)=>setFormData({
                    ...formData,
                    message:event.target.value,
                })}
                placeholder="What do you want to talk about?"
                className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[20vh] text-[30px]"
                />
                <div className="flex gap-5 items-center justify-between ">
                    <Label for="imageURL">
                    <TbCirclePlus  className="w-7 h-7 hover:cursor-pointer"/>
                        <Input
                        onChange={handleFileonChange}
                        className="hidden"
                        id="imageURL"
                        type="file"
                        />
                    </Label>
                    <Button
                    onClick={handleSaveFeedPost}
                     disabled={formData?.imageURL==='' && formData?.message===''}
                    className="flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65">Post</Button>
                </div>
            </DialogContent>
        </Dialog>
    </Fragment>
)
}

export default Feed;