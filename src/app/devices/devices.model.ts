export class DevicesModel {

    //packageName : string = "TEST";
    public deviceId: number = 0;
    public uuid: string = "";
    public brand: string = "";
    public model: string = "";
    public updateDate: Date = new Date();
    public createDate: Date = new Date();
    public permission: permissionModel[] = [];
}

export class permissionModel {

    public permissionID: number = 0;
    public appId: number = 0;
    public deviceId: number = 0;
    public permissionStatusID: boolean = false;
    public appName: string = "";
    public updateDate: Date = new Date();
    public createDate: Date = new Date();
}
