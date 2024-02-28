

export const NavBar = () => {
  const userName=localStorage.getItem('userName')
    return (
    <div className="flex">
        {/* this is for side bar component. Replace this with Ashani's side bar*/}
  <div  className="bg-slate-200 shadow-md w-vw20">
    side bar
  </div>
  {/* this is for navbar */}
        <header className="bg-slate-200 shadow-md w-vw80">
          <div className="flex justify-between items-center max-w-7xl p-3">
           
              <div className="font-bold text-sm sm:text-xl flex gap-5">
                <h1>About Us</h1>
                <h1>Contact</h1>
              </div>
              <div className="font-bold text-sm sm:text-xl">
               <h1> Welcome Back!{userName}</h1>
              </div>
           
          </div>
        </header>
        </div>

  );
};
