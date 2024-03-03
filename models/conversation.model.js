import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        }
    ],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    },]
    //CreateAt, UpdateAt : mongoose.CreateAt => 15:30AM
},{timestamps: true});
const Conversation = mongoose.model("Conversation",conversationSchema);
export default Conversation;