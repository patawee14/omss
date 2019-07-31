
export class AppsModel {

    //packageName : string = "TEST";
    // public id: number = 0;
    // public companyName: string = "";
    // public appVer: string = "";
    // public type: string = "";
    // public status: string = "";
    // public description: string = "";

    public appId : number = 0;
    public appName :string = "";
    public createDate : Date = new Date();
    public description : string = "";
    public packageName :  string = "";
    public statusId : number = 0;
    public statusName : string = "";
    public typeId : number = 0;
    public typeName : string = "";
    public updateDate : Date = new Date();
    public version : string = "";
    public img : string = "";
}


export class AppsModelSearch {

    //packageName : string = "TEST";
    public companyName: string = "";
    public appVer: string = "";
    public type: string = "";
    public status: string = "";
    public description: string = "";
}


