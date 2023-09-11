﻿import { DestroyRef, Injectable, destroyPlatform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(() => error);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(
                map(user => {
                    console.log(user)
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                }),
                catchError(this.handleError)
            )
    }

    logout() {
        console.log(this.user)
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null!);
        // console.log(this.userSubject)
        
        this.router.navigate(['/login']);
        window.location.reload()
    }

    register(username: string, password: string, firstName: string, lastName: string){
        return this.http.post<any>(`${environment.apiUrl}/users/register`, { firstName, lastName, username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
            }),
            catchError(this.handleError)
        );
    }
}