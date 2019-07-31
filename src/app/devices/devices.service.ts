import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CONSTANT } from '../shared/constant';

import { DevicesModel } from './devices.model'
import { Router } from '@angular/router';

@Injectable()
export class DevicesService {
    //URL for CRUD operations
    appsUrl = CONSTANT.SERVICE;
    //Create constructor to get Http instance
    constructor(private http: Http,
        private router: Router, ) {
    }
    //Fetch all device
    getDevice(): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + 'getDevice', options)
            .map(response => response.json())
            //.map(this.extractData)
            .catch(this.handleError);

    }
    //Fetch Device by id
    getDeviceDetail(deviceId: number): Observable<any> {
        console.log(this.appsUrl + "getDeviceDetail?deviceId=" + deviceId);
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + "getDeviceDetail?deviceId=" + deviceId, options)
            .map(response => response.json())
            //.map(this.extractData)
            .catch(this.handleError);
    }
    //Update device
    updateDevice(device: DevicesModel): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.appsUrl + "updateDevice", device, options)
            .map(response => response)
            .catch(this.handleError);
    }
    //Delete device	
    deleteDevice(deviceId: string): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token'), 'username': localStorage.getItem('username') });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.get(this.appsUrl + "deleteDevice?deviceId=" + deviceId, options)
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