import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/common/models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUserInfo(){
        return this.http.get(`/hrms/loggedin-user`);
    }
    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

    signup(body: {
        userName: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        companyName: string,
        companyRole: string
    }) {
        return this.http.post('/hrms/signUp', body);
    }
}