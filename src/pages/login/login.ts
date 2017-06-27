import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginService } from '../../providers/login.service';
import { MainPage } from '../main/main';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  user = {user: "", password: ""};

  constructor(public navCtrl: NavController, private _loginService : LoginService, private toast: ToastController,
              private storage: Storage) {   
    
    

  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }

  login(){
    this._loginService.login(this.user)
      .subscribe(res => {
        console.log(res);   
        this.storage.set('session', res.sessionToken);
        this.storage.set('user', res.objectId).then(() =>{
          this.navCtrl.setRoot(MainPage);
        });     
        
      }, err => {
        var error = JSON.parse(err.text());
        this.toast.create({
          message: error.error,
          duration: 3000
        }).present();

      });
  }

}
