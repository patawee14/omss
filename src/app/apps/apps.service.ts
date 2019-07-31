import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONSTANT } from '../shared/constant';

import { AppsModel } from './apps.model'
import { Router } from '@angular/router';

@Injectable()
export class AppsService {
    //URL for CRUD operations
    appsUrl = CONSTANT.SERVICE;
    //Create constructor to get Http instance
    constructor(private http: Http, private router: Router) {
    }
    //Fetch all apps
    getApp(): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + 'getApp', options)
            .map(response => response.json())
            //.map(this.extractData)
            .catch(this.handleError);

    }
    //Create apps
    createApp(apps: AppsModel): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.appsUrl + "createApp", apps, options)
            .map(response => response)
            .catch(this.handleError);
    }
    //Fetch apps by id
    getAppDetail(appsId: string): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + "getAppDetail?appId=" + appsId, options)
            .map(response => response.json())
            //.map(this.extractData)
            .catch(this.handleError);
    }
    //Update apps
    updateApp(apps: AppsModel): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.appsUrl + "updateApp", apps, options)
            .map(response => response)
            .catch(this.handleError);
    }
    //Delete apps	
    deleteApp(appsId: string): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + "deleteApp?appId=" + appsId, options)
            .map(response => response)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    handleError = (error: Response | any) => {
        //console.error(error.message || error);
        if (error.status == 401) {
            this.router.navigate(['login']);
        }

        return Observable.throw(error.status);
    }
} 