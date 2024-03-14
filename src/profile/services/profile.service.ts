import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { pipe, throwError } from 'rxjs';

@Injectable()
export class ProfileService {
    public defaultHeader = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    constructor(private http: HttpClient) { }
   
    getUserInfo() {
        return this.http.get<any>('/hrms/employee/profile-details');
    }

    updatePersonalInfo(body: any) {
        const header = {
            "Accept": "application/merge-patch+json",
            "Content-Type": "application/merge-patch+json"
        }
        return this.http.patch('/hrms/employee/personal-info', body, { headers: header })
    }

    updateContactInfo(body: any) {
        return this.http.patch('/hrms/employee/contact-info', body)
    }

    updateWorkInfo(body: any) {
        return this.http.post('/hrms/employee/work-history', body, { headers: this.defaultHeader} )
    }

    updateEducationalInfo(body: any) {
        return this.http.post('/hrms/employee/education', body, { headers: this.defaultHeader })
    }

    get(url: string) {
        return this.http.get(url, { responseType: 'blob' })
    }

    post(body: any) {
        return this.http.get(JSON.stringify(body));
    }

    login(username: string, password: string) {
        return this.http.post(`/generateToken`, { userName: username, password: password }, { responseType: 'text' })
            .pipe(map(token => {
                // login successful if there's a jwt token in the response
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', token);
                }
                return token;
            }),
                catchError((err) => {
                    console.error(err);

                    //Handle the error here
                    return throwError(err);    //Rethrow it back to component
                }));
    }

    forgotPassword(username: string) {
        return this.http.post<any>(`http://users/signup`, { username: username })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify(user));
                }
                return user;
            }),
                catchError((err) => {
                    // console.log('error caught in service')
                    console.error(err);
                    // let user = "FakeToken";
                    // localStorage.setItem('token', JSON.stringify(user));

                    //Handle the error here
                    return throwError(err);    //Rethrow it back to component
                }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }
}