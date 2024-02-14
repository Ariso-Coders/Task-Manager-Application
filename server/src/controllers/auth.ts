import { Request, Response, NextFunction } from 'express';


export const login  = async(req:Request,res:Response,next:NextFunction) =>{

    try{

        res.status(200).json({
            message:"login controller succefull with TS",
            details:"nothing"
        })

        const err = new Error("tedt");
        // err.statusCode = 900;

    }catch(err:any){
        if(err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}