import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
function CommonCard({icon,title,description,footerContent}){
    return (
        <Card className="flex bg-gray-100  justify-between rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer mb-3">
            <CardHeader className="p-0">
                {
                    icon ? icon :null
                }
                {
                    title ? (<CardTitle className="text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950">
                        {title}
                        </CardTitle>) 
                        : null
                 }
                 {
                    description? 
                    <CardDescription className="mt-3 text-gray-300">{description}</CardDescription>:null
                 }       
            </CardHeader>
            <CardFooter className=" p-0">{footerContent}</CardFooter>
        </Card>
    )

}

export default CommonCard;