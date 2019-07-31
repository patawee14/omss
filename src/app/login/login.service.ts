import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONSTANT } from '../shared/constant';

import { LoginModel } from './login.model'

@Injectable()
export class LoginService {
    appsUrl = CONSTANT.SERVICE;
    //Create constructor to get Http instance
    constructor(private http: Http) {
    }

    createReportMobile(model: LoginModel): Observable<any> {
        
        let cpHeaders = new Headers({ 'Content-Type': 'application/json','token': model.token, 'username': model.username });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.appsUrl + "createReportMobile", model, options)
            .map(response => response)
            .catch(this.handleError);
    }


    getTokenWebUser(model: LoginModel): Observable<any> {
        //let cpHeaders = new Headers({ 'Content-Type': 'application/json','username' : model.username});
        //let options = new RequestOptions({ headers: cpHeaders });
        //debugger
        return this.http.get(this.appsUrl + "getTokenWebUser?username=" + model.username)
            //return this.http.get(this.appsUrl + "getTokenWebUser",model, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    deleteApp(appsId: string): Observable<any> {
        return this.http.get(this.appsUrl + "deleteApp?appId=" + appsId)
            .map(response => response)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        //console.error(error.message || error);
        return Observable.throw(error.status);
    }
}