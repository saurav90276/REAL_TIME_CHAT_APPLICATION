import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { io, getReceiverSocketId } from "../utils/socket.js";


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const filteredUsers = await User.find({ _id: { $ne: user } }).select("-password");
    res.status(200).json({
        success: true,
        users: filteredUsers,
    })
});
export const getMessages = catchAsyncError(async (req, res, next) => {
    const recieverId = req.params.id;
    const myId = req.user._id;
    const reciever = await User.findById(recieverId);
    if (!reciever) {
        return res.status(400).json({
            success: false,
            message: "Receiver ID Invalid.",
        });
    }
    const messages = await Message.find({ 
        $or: [
            { senderId: myId, recieverId: recieverId },
            { senderId: recieverId, recieverId: myId },
        ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        messages
    });
});
export const sendMessage = catchAsyncError(async (req, res, next) => {
    const { text } = req.body;
    const media = req?.files?.media;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    const reciever = await User.findById(recieverId);
    if (!reciever) {
        return res.status(400).json({
            success: false,
            message: "Receiver ID Invalid.",
        });
    }
    const sanitizedText = text?.trim() || "";

    if (!sanitizedText && !media) {
        return res.status(400).json({
            success: false,
            message: "Cannot send empty message.",
        });
    }
    let mediaUrl = "";
    if (media) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(
                media.tempFilePath,
                {
                    resource_type: "auto",
                    folder: "CHAT_APP_MEDIA",
                    transformation: [
                        { width: 1080, height: 1080, crop: "limit" },
                        { quality: "auto" },
                        { fetch_formate: "auto" },
                    ],
                }
            );
            mediaUrl = uploadResponse?.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload media. Please try again later.",
            });
        }
    }

    const newMessage = await Message.create({
        senderId,
        recieverId,
        text: sanitizedText,
        media: mediaUrl,
    })
    const recieverSocketId = getReceiverSocketId(recieverId);
    if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage);
});