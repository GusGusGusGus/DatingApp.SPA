import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;

constructor(private http: HttpClient) { }

login(model: any) {
    return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).pipe(
        map( (response: Response) => {
        const user: any = response;

        console.log(user);
        if (user) {
            localStorage.setItem('token', user.tokenString);
            this.userToken = user.tokenString;
        }
        }),
        catchError(this.handleError)
    );
}

register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).pipe(catchError(this.handleError));
}

private requestOptions(){
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return httpOptions;
}

private handleError(errorResponse: any) {
    const applicationError = errorResponse.headers.get('Application-Error');
    if (applicationError) {
        return Observable.throw(applicationError);
    }
    const serverError = errorResponse.error;
    let modelStateErrors = '';

    if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
    }
    return Observable.throw(
        modelStateErrors || 'Server error'
    );
}

}
