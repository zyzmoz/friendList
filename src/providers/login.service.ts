import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginService {
  headers = new Headers();
  apiUrl : string = 'http://localhost:3000/app/';
  constructor(public http: Http) {
    this.headers.append("X-Parse-Application-Id", "AppId1");
    this.headers.append("X-Parse-REST-API-Key", 'restAPIKey');    
  }

  signUp(obj){
    return this.http.post(this.apiUrl + 'users', JSON.stringify(obj), {headers: this.headers})
      .map(res => res.json());
  }

  login(obj){
    return this.http.get(this.apiUrl + 'login?username=' + obj.user + '&password=' + obj.password, {headers: this.headers})
      .map(res => res.json());
  }

}
