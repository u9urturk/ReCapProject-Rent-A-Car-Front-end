

export interface DecodedToken{
    aud:string;
    email:string;
    exp:string;
    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]:string;
    ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]:string;
    ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]:string
    name:string;
    nameidentifier:string;
    iss:string;
    nbf:number;


}