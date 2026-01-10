const AuthImagePattern = ({ title, subtitle, img}) => {
  return <>
  <div className="hidden lg:flex items-center justify-center p-12">
    <div className="max-w-md text-center">
    {/* GRID PATTERN */}
      <div>
        <img src={img} alt="login" />
      </div>
      {/* <div className="grid grid-cols-3 gap-3 mb-8">
        {
          [...Array(9)].map((_, i) =>{
            return(
              <div key={i} className={`aspect-square rounded-2xl bg-slate-400 ${i % 2 ===0 ? "animate-pulse" : ""}`}>

              </div>
            )
          })
        }
      </div> */}
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">{title}</h2>
      <p className="text-slate-200 ">{subtitle}</p>
    </div>
  </div>
  </>;
};

export default AuthImagePattern;