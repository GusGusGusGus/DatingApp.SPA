import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';


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
    }));
}

register(model: any) {
    return this.http.post(this.baseUrl + 'register', model, this.requestOptions())
}

private requestOptions(){
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    return httpOptions;
}
}
