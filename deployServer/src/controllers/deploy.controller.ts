import {Request, Response} from "express"
import { exec } from 'child_process';

export const deploy = async (req:Request, res:Response): Promise<any> => {
    const cmd = `
        sudo su
        sh deploy-api.sh
        sh deploy-user-service.sh
        sh deploy-url-service.sh
    ` 

    console.log("running deploy script");

    await exec(cmd, (err, stdout, stderr) => {
        console.log(`stdout: ${JSON.stringify(stdout)}`);
        console.log(`stderr: ${JSON.stringify(stderr)}`);
      });


    return res.send("Running deploy script!").status(200);
};