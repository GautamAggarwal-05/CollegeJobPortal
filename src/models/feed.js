import mongoose  from 'mongoose';

const FeedSchema = new mongoose.Schema({
    userId: String,
    userName:String,
    message:String,
    image: {
        type: String,
        default: "https://plchldr.co/i/500x500?&bg=ffffff&fc=000000&text=JOBSCO"
    },
    likes:[
        {
            reactorUserId: String,
            reactorUserName: String
        }
    ]
});

const Feed = mongoose.models.Feed || mongoose.model("Feed",FeedSchema);

export default Feed;
