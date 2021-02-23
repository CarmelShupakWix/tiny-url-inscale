import { Request, Response} from "express"   
import { User } from "../../../shared/models/user/index"
import { SignUpProducer } from '../produce.email.sqs/produce';
import { Database } from '../../../shared/modules/database/src/database' 

export class UserService {

    private database: Database;
    private signUpProducer: SignUpProducer;

    constructor(database: Database, signUpProducer: SignUpProducer) {
        this.signUpProducer = signUpProducer;
        this.database = database;
    }

 
    async create(userEmail: string, userName: string, userPassword: string): Promise<boolean> {
        const query: string = `INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPassword}')`; 
        
        // TODO: parse the data data from RowDataPacker to User object.
        const isCreate: boolean = await this.database.Execute<boolean>(query); 
        await this.signUpProducer.SqSProduceSignUp(userEmail);
        return isCreate;
    }

    async read(userEmail: string): Promise<User> {
        const query = `SELECT * FROM Tiny_URL.Users where Email = '${userEmail}'`
        return await this.database.Execute<User>(query) ;
    }
}  