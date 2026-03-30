import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User} from "lucide-react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { signup } from "../store/slices/authSlice";
import signupimg from "../assets/signup.png";

const Register = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const dispatch = useDispatch();

  const { isSigninUp } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  }

  return <>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-800">
      <div className="flex flex-col justify-center items-center mt-12 px-6 py-12">
        <div className="w-full max-w-md">
          {/* LOGO & HEADING */}
          <div className="flex flex-col items-center mb-10">
            <div className=" bg-gradient-to-r from-red-300 to-gray-300 p-3 rounded-lg">
              <MessageSquare className="text-slate-900 w-6 h-6" />
            </div>
            <h1 className="text-transparent text-4xl font-bold mt-4 bg-clip-text bg-gradient-to-r from-red-300 to-gray-300">Create Account</h1>
            <p className="text-slate-200 text-sm mt-2">Get started with your free account</p>
          </div>

          {/* REGISTER FORM */}
          <form onSubmit={handleSubmit} className="space-y-6 ">

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-1">
                Full Name
              </label>
              {/* <h2 className="bg-slate-600 text-red-500">Rolex</h2> */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text" className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2
               focus:ring-blue-500 text-slate-900"
                  placeholder="Your Name" value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-50 mb-1">
                Email
              </label>
              {/* <h2 className="bg-slate-600 text-red-500">Rolex</h2> */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email" className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2
               focus:ring-blue-500 text-slate-900"
                  placeholder="you@gmail.com" value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-slate-50 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"} className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2
               focus:ring-blue-500 text-slate-900"
                  placeholder="********" value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {
                    showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )
                  }

                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSigninUp} className="w-full bg-cyan-500 hover:bg-slate-900 text-slate-50 font-medium py-2 rounded-md transition 
            duration-200 flex justify-center items-center gap-2">
              {
                isSigninUp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Loading...
                  </>
                ) : (
                  "Create Account"
                )
              }
            </button>
          </form>

          {/* FOOTER LINK */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-200">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-300 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>

      <AuthImagePattern title={"Join our community!"} 
      subtitle={"Connect with friends, share your thoughts, and stay in touch with your loved ones."} img={signupimg}/>
    </div>

  </>;
};

export default Register;