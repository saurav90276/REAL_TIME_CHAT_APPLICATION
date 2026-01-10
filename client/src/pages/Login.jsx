import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import AuthImagePattern from "../components/AuthImagePattern"
import {login} from "../store/slices/authSlice";
import loginimg from "../assets/login.png";

const Login = () => {
  const[showPassword, setShowPassword] = useState(false);
  const[formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {isLoggingIn} = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(login(formData));
  }

  return <>
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-800">
    {/* LEFT SIDE FORM  */}
    <div className="flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* LOGO & HEADING */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-300 p-3 rounded-lg">
            <MessageSquare className="text-slate-800 w-6 h-6"/>
          </div>
          <h1 className="text-2xl font-bold mt-4 text-cyan-300">Welcome Back</h1>
          <p className="text-slate-200 text-sm mt-2">Sign in to your account</p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div>
            
            <label className="block text-sm font-medium text-slate-50 mb-1">
              Email
            </label>
            {/* <h2 className="bg-slate-600 text-red-500">Rolex</h2> */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100">
                <Mail className="w-5 h-5"/>
              </span>
              <input 
              type="email" className="w-full border border-slate-100 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2
               focus:ring-slate-500 text-slate-100"
               placeholder="you@gmail.com" value={formData.email}
               onChange={(e)=>{
                setFormData({...formData, email: e.target.value});
               }}
              />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-slate-50 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100">
                <Lock className="w-5 h-5"/>
              </span>
              <input 
              type={showPassword? "text" : "password"} className="w-full border border-slate-100 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2
               focus:ring-slate-500 text-slate-100"
               placeholder="********" value={formData.password}
               onChange={(e)=>{
                setFormData({...formData, password: e.target.value});
               }}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-200"
                onClick={()=> setShowPassword(!showPassword)}
              >
               {
                showPassword ? (
                  <EyeOff className="w-5 h-5"/>
                ) : (
                  <Eye className="w-5 h-5"/>
                )
               }
               
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoggingIn} className="w-full bg-cyan-500 hover:bg-slate-900 text-white font-medium py-2 rounded-md transition 
          duration-200 flex justify-center items-center gap-2">
            {
              isLoggingIn ? (
                <>
                <Loader2 className="w-5 h-5 animate-spin"/> Loading...
                </>
              ) : (
                "Sign In"
              )
            }
          </button>
        </form>
        {/* FOOTER */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE - PATTERN */}
    <AuthImagePattern title={"Connect Anytime! Anywhere!"} subtitle={"Sign into continue your conversation and catch up with your messages."} img={loginimg}/>
            
  </div>
  </>;
};

export default Login;