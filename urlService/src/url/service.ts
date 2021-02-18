import { Request, response, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase" 
import * as query from "../databaseUrlQuery/queries"
import * as mysql from 'mysql'
import { Database } from "../../../shared/modules/database/src/database"
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { UrlProducer } from "../produce.url.sqs/produce"
import { Url } from "aws-sdk/clients/cloudformation"


export class UrlService {
    private database: Database;
    private authHttpClient: AuthServiceHttpClient;
    private urlProducer: UrlProducer;

    constructor(database: Database, authHttpClient: AuthServiceHttpClient, urlProducer: UrlProducer){
        this.database = database;
        this.authHttpClient = authHttpClient;
        this.urlProducer = urlProducer;
    }
    

    async create(token: Token, longUrl: string, isPrivate: string): Promise<string> {     
        const email = await this.authHttpClient.getEmailFromTheToken(token);
        if (!email) { return new Promise((res, rej) => { rej("Token invalid") }); }

        const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(longUrl);
        if (!valid) { return new Promise((res, rej) => { rej("Token invalid") }); }
        
        const insertQuery: string = `INSERT INTO Tiny_URL.Links (LongURL, Email, IsPrivate) VALUES ('${longUrl}', '${email}', ${isPrivate});`
        const isInserted: boolean = await this.database.Execute<boolean>(insertQuery);
        if (!isInserted) { return new Promise((res, rej) => { rej("Error inserting url to database") }); }

        const selectQuery: string = `SELECT ShortURL FROM Tiny_URL.Links WHERE LongURL = '${longUrl}'`;
        const shortUrl: string = await this.database.Execute<string>(selectQuery);

        await this.urlProducer.ProduceShortUrl(email, shortUrl, longUrl);

        return shortUrl;
    }

    async read(){

    }         
}