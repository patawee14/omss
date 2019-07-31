import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONSTANT } from '../shared/constant';

import { ReportsModel } from './reports.model'
import { Router } from '@angular/router';

@Injectable()
export class ReportsService {
    //URL for CRUD operations
    appsUrl = CONSTANT.SERVICE;
    //Create constructor to get Http instance
    constructor(private http: Http,private router: Router) {
    }
    //Fetch all device
    getReport(): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json','token' : localStorage.getItem('token'),'username' : localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + 'getReport',options)
            .map(response => response.json())
            //.map(this.extractData)
            .catch(this.handleError);

    }

    exportLogReport(): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json','token' : localStorage.getItem('token'),'username' : localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders,responseType: 3 });
        return this.http.get(this.appsUrl + 'exportLogReport',options)
            .map(response => response)
            //.map(this.extractData)
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