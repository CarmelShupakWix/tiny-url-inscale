export const parseGetUrlPropertiesQuery = (url: string): string => {
    return `SELECT * FROM Tiny_URL.Links where LongURL = '${url}'`
}

export const cheackIfShortUrlExsist = (shortUrl: string): string => {
    return `SELECT * FROM Tiny_URL.Links where ShortURL = '${shortUrl}'`
}

export const parseCreateUrlQuery = (url: string, email: string, isPrivate: boolean): string => {
    return `INSERT INTO Tiny_URL.Links (LongURL, Email, IsPrivate) VALUES ('${url}', '${email}', ${isPrivate});`
}


export const parseGetLongUrlQuery = (url: string): string => {
    return `SELECT LongURL FROM Tiny_URL.Links WHERE ShortURL = '${url}'`
}

export const parseGetShortUrlQuery = (url: string): string => {
    return `SELECT ShortURL FROM Tiny_URL.Links WHERE LongURL = '${url}'`
}

export const parseGetShortUrlByUrlAndEmailQuery = (url: string, email: string): string => {
    return `SELECT ShortURL FROM Tiny_URL.Links where (LongURL = '${url}') && (Email = '${email}')`
}

