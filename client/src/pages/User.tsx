const User = () => {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="gap-5 p-4 flex flex-col items-center justify-center ">
      <div className="max-w-md flex flex-col bg-gray-100 rounded-lg p-3 shadow-md">
        <h1 className="text-lg font-semibold mb-4">User Profile</h1>
        <div className="text-start m-10  ">
          <div className="flex gap-4">
            <h1>User Name: </h1>
            <h2>{userName}</h2>
          </div>
          <div className="flex gap-5">
            <h1>User Email: </h1>
            <h2>{userEmail}</h2>
          </div>
        </div>
      </div>
      <div className="max-w-md flex flex-col bg-gray-200 rounded-lg p-6 shadow-md ">
        <h1 className="text-lg font-semibold mb-4">User Performance</h1>
        <div>
          <p className="text-justify">
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;