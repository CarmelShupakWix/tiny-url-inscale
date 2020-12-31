import  {connection} from "../database.mysql.connection/connection"

export const addNewUrlToMysql = (url: String, tinyUrl:String, userEmail:String):void =>{
    connection.query(`INSERT INTO Tiny_URL.Links VALUES ('${url}', '${tinyUrl}', '${userEmail}')`
    ,(err:Error, rows: String) => {
      if(err) throw err;
    
      console.log('Data received from Db:');
      console.log('New short url insert to the DB')
      console.log(rows);
    });
  }

export const addNewUserToMysql = (userEmail: String, userName:String, userPasswor:String):void =>{
    connection.query(`INSERT INTO Tiny_URL.Users VALUES ( '${userEmail}', '${userName}', '${userPasswor}')`
    ,(err:Error, rows: String) => {
      if(err) throw err;
    
      console.log('Data received from Db:');
      console.log('New user insert to the DB');
      console.log(rows);
    });
  }


  export const getUserInfo  = (email: string):void =>{
    connection.query(`SELECT * FROM Tiny_URL.Users where Email = '${email}' `
    ,(err:Error, rows: String) => {
      if(err) throw err;
    
      console.log('Data received from Db:');
      console.log('Getting the user info');
      console.log(rows);
    });
  }

  export const getUrlInfo  = (shortUrl: String):void =>{
    console.log(shortUrl);
    connection.query(`SELECT LongUrl FROM Tiny_URL.Links where ShortUrl = '${shortUrl}' `
    ,(err:Error, rows: String) => {
      if(err) throw err;
    
      console.log('Data received from Db:');
      console.log('Getting the LongUrl from ShortUrl');
      console.log(rows);
    });
  }

















