type ButtonProps={
    buttonLabel:string
}
export const Button = (props:ButtonProps) => {
  return (
    <div>
      <button className="bg-main_color py-2 px-6 rounded-md mb-4 text-white">
        Log in
      </button>
    </div>
  );
};
