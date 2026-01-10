import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../store/slices/authSlice";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => { 
    dispatch(logout());
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-slate-900 backdrop-blur-lg border border-gray-400 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* LEFT LOGO */}
          <div className="flex items-center gap-8">
            <Link to={"/"} className="flex items-center gap-2.5 hover:opacity-80 transition">
              <div className="w-9 h-9 rounded-lg bg-cyan-300 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-slate-950" />
              </div>
              <h1 className="text-lg font-bold text-slate-100">Chatting...</h1>
            </Link>
          </div>

          {/* RIGHT LOGO */}

          <div className="flex items-center gap-3">
            {
              authUser && (
                <>
                  <Link to={"/profile"} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-slate-100 hover:bg-slate-950 transition">
                    <User className="w-5 h-6" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-red-700 hover:bg-slate-300 transition">
                    <LogOut className="w-5 h-6" />
                    <span className="hidden sm:inline">Log out</span>
                  </button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

// import {LogOut, MessageSquare, Settings, User} from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// const Navbar = () =>{
//     const {authUser} = useSelector((state) => state.auth);

//     const dispatch = useDispatch();
//     const handleLogout = () => {

//     };

//     return <>
//     <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-lg border border-gray-200 shadow-sm">
//     <div className="max-w-7xl mx-auto px-4 h-16">
//         <div className="flex items-center justify-between h-full">

//             {/* LEFT LOGO */}
//             <div className="flex items-center gap-8">
//                 <Link to={"/"} className="flex items-center gap-2.5 hover:opacity-80 transition">
//                     <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
//                         <MessageSquare className="w-5 h-5 text-blue-600"></MessageSquare>
//                     </div>
//                     <h1 className="text-lg font-bold text-gray-800">Talkie</h1>
//                 </Link>
//             </div>

//         </div>
//     </div>
//     </header>
//     </>
// };

// export default Navbar;