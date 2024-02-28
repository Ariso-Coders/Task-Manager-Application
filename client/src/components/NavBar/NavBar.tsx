

export const NavBar = () => {
  const userName = localStorage.getItem('userName')
  return (

    <header className="bg-slate-200 shadow-md w-full px-5 h-vh10  flex items-center justify-center">
      <div className="flex justify-between items-center w-full p-3 ">

        <div className=" text-sm sm:text-xl flex gap-5 ">
          <h1 >About Us</h1>
          <h1 >Contact</h1>
        </div>
        <div className="font-semibold text-sm sm:text-xl ">
          <h1 className="flex gap-2"> Welcome Back ! <span className="capitalize">{userName}</span></h1>
        </div>

      </div>
    </header>


  );
};
