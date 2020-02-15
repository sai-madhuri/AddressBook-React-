export class Contact{
    id : number;
    email : string;
    name : string;
    mobile : string;
    landLine?: string;
    website?: string;
    address?: string
    
    constructor(id : number,email : string ,name : string ,mobile : string,landLine?:string,website?:string,address?:string)
    {
        this.id = id;
        this.email = email;
        this.name = name;
        this.mobile = mobile;
        this.landLine = landLine;
        this.website = website;
        this.address = address;
    }
}