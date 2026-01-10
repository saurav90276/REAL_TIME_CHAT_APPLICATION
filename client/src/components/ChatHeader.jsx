import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from "../store/slices/chatSlice";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const{ onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
    <div className="p-3 border-b bg-slate-800 ring-1 ring-gray-300">
      <div className="flex items-center justify-between">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="relative w-10 h-10">
            <img src={selectedUser?.avatar?.url || "avatar-holder.avif"} alt="/avatar-holder.avif" 
            className="w-full h-full object-cover rounded-full"/>
            {
              onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-white border-2 rounded-full"/>
              )
            }
          </div>

          {/* NAME & STATUS */}
          <div>
            <h3 className="font-medium text-base text-slate-50">{selectedUser?.fullName}</h3>
            <p className="text-sm text-slate-50">
              {
                onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"
              }
            </p>
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <button onClick={()=> dispatch(setSelectedUser(null))} className="text-slate-400 hover:text-slate-100 transition">
          <X className="w-5 h-5"/>
        </button>
      </div>
    </div>
    </>
  )
};

export default ChatHeader;