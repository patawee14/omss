import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { LoginModel } from 'app/login/login.model';
import { LoginService } from 'app/login/login.service';

@Injectable()
export class AuthenticationService {
    constructor(private router: Router,
        private http: HttpClient,
        private LoginService: LoginService, ) { }

    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['login']);
    }
}