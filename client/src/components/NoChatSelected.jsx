import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <>
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-slate-800">
        <div className="max-w-md text-center space-y-6">
          {/* ICON DISPLAY */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-300 flex items-center justify-center animate-bounce">
                <MessageSquare className="w-8 h-8 text-slate-900" />
              </div>
            </div>
          </div>
          {/* WELCOME COMMENT */}
          <h2 className="text-transparent text-3xl font-bold bg-clip-text bg-gradient-to-r from-red-300 to-gray-300">Welcome to Chatting</h2>
          <p className="text-slate-300">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>

    </>
  );
};

export default NoChatSelected;