import React from "react";


type ErrorDetails = {
    message: string;
    btn1: [boolean, string, string?];
    btn2: [boolean, string, string?];
};

type ErrorCardProps = {
    details: ErrorDetails;
    fn: (args: { btn1: boolean; btn2: boolean }) => void;
};

const ErrorCard: React.FC<ErrorCardProps> = (props) => {
    const btnHandler1 = () => {
        props.fn({ btn1: true, btn2: false });
    };

    const btnHandler2 = () => {
        props.fn({ btn1: false, btn2: true });
    };

    return (
        <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50  ">
            <div className=" py-5 px-10  flex flex-col justify-center items-center rounded-lg bg-white gap-10">
                <p className="text-lg mb-4 capitalize text-red"> {props.details.message}</p>
                <section className="mt-5vh flex gap-5">
                    {props.details.btn1[0] && (
                        <button id="ER_btn1" onClick={btnHandler1} className="text-base px-3 py-1 border-none bg-green-500 cursor-pointer rounded  hover:text-white hover:border-green-500"
                        >{props.details.btn1[1]} </button>
                    )}
                    {props.details.btn2[0] && (
                        <button id="ER_btn2" onClick={btnHandler2} className="text-base px-3 py-1 border-transparent bg-gray-600 cursor-pointer rounded  hover:text-white hover:border-gray" >{props.details.btn2[1]}</button>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ErrorCard;
