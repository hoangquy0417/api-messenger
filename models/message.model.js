import mongoose from "mongoose";
const messageSchema = mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    message: {
        type: String,
        required: true
    }
    //CreateAt, UpdateAt : mongoose.CreateAt => 15:30AM
},{timestamps:true});

const Message = mongoose.model("Message",messageSchema);

export default Message;