import { Credentials , UserMetadata} from '../../../shared/models/common'
import { UserServiceHttpClient } from '../../../shared/modules/userServiceHttpClient/src/client'
import { User } from '../../../shared/models/user'
import { Token } from "../../../shared/models/authenticate"
import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 

export class AuthService {

    userHttpClient: UserServiceHttpClient;
    constructor(userServiceHttpClient: UserServiceHttpClient){
        this.userHttpClient = userServiceHttpClient;
    }

    async signUp (credentials: Credentials, userMetadata: UserMetadata): Promise<boolean> {   

        const encryptedPass = await this.getEncryptPassword(credentials.Password);
        const encryptedCredentials: Credentials = {
            Email: credentials.Email,
            Password: encryptedPass 
        } 
        return await this.userHttpClient.create(encryptedCredentials, userMetadata);
    }

    async logIn (credentials: Credentials): Promise<Token> { 

        const user: User = await this.userHttpClient.get(credentials.Email);
        const { password: userEncryptedPassFromDb, email: email } = user;
        const isValidPassword = await this.comparePasswords(credentials.Password, userEncryptedPassFromDb);

        if (isValidPassword) { return await this.createToken(email); } 
        return new Promise((res, rej) => {
            rej("Password is not valid.");
        })
    }

    authenticate(token: Token): string {

        const authenticateEmail: string = this.getEmail(token);  
        if (authenticateEmail) {
            return authenticateEmail;
        } else {
            return '';
        }
    }

    private async comparePasswords(originalPassword: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(originalPassword, encryptedPassword);
    }
            
    private async getEncryptPassword(userPassword: string): Promise<string>{
        const salt = await bcrypt.genSalt(); 
        return await bcrypt.hash(userPassword, salt);
    }

    private createToken(email: string): Token{
        console.log("Authenticate-Module: generate new user Token");
        const value: string = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET );
        return new Token (value);        
    }

    private getEmail(token: Token): string {
        const decrypted = <any>jwt.verify(token.value, process.env.ACCESS_TOKEN_SECRET)
        if (decrypted){
            return String(decrypted['email'])
        } else return '';
    }
}    