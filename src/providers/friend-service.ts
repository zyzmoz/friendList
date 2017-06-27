import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class FriendService {

  headers = new Headers();
  apiUrl: string = 'http://localhost:3000/app/';
  userId : string;
  

  constructor(public http: Http, private storage : Storage) {
    this.headers.append("X-Parse-Application-Id", "AppId1");
    this.headers.append("X-Parse-REST-API-Key", 'restAPIKey');
    this.storage.get('user').then((value)=>{
      this.userId = value;
    })
    
    
    
  }

  addFriend(obj){
    obj.owner = this.userId;
    return this.http.post(this.apiUrl + 'classes/Friend', JSON.stringify(obj), {headers: this.headers})
      .map(res => res.json());
  }
  
  updFriend(obj){
    return this.http.put(this.apiUrl + 'classes/Friend/' + obj.objectId , JSON.stringify(obj), {headers: this.headers})
      .map(res => res.json());

  }

  delFriend(id){
    return this.http.delete(this.apiUrl + 'classes/Friend/' + id , {headers: this.headers})
      .map(res => res.json());

  }

  getFriends(userId){   
    
    return this.http.get(this.apiUrl + 'classes/Friend?where={"owner":"'+userId+'"}', {headers: this.headers})
      .map(res => res.json());

  }

}
