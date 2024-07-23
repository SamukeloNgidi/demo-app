import {Users} from './user';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService{ /**mirorring all the methods in the back-end. these are used in the ui component*/
    private apiServerUrl = environment.apiBaseUrl; //call the environment with the url

    constructor(private http: HttpClient){ }

    public getUsers(): Observable<Users[]>{
        return this.http.get<any>(`${this.apiServerUrl}/user/all`);
    }

    public addUser(user: Users): Observable<Users>{
        return this.http.post<Users>(`${this.apiServerUrl}/user/add`, user);
    }

    public updateUser(user: Users): Observable<Users>{
        return this.http.put<Users>(`${this.apiServerUrl}/user/update`, user);
    }

    /*public aupdateUser(user: Users, email: string): Observable<Users>{
        return this.http.put<Users>(`${this.apiServerUrl}/user/update/${email}`, user);
    }*/

    public deleteUser(userId: Number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
    }
}