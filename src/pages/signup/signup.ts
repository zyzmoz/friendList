import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/User';
import { LoginService } from '../../providers/login.service';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [LoginService]
})
export class SignupPage {

  data: User = {
      name: "",
      email: "",
      username: "",
      password: ""
  }; 
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private _loginService : LoginService) {
  }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad Signup');
  }

  cancel(){
    this.navCtrl.pop();
  }

  signup(){

    if (this.data.password != this.password){
      this.alertCtrl.create({
        title: "Alert",
        subTitle: "The password confirmation doesn't match!",
        buttons: ['OK']
      }).present();
      
      return;      
    }

    this._loginService.signUp(this.data)
      .subscribe(res => {
        this.alertCtrl.create({
          title: "Congratulations",
          subTitle: "Your account has been created",
          buttons: [{text: 'OK', handler: () =>{
            this.navCtrl.pop();
          }}]
        }).present();        
      }, err => {
        var error = JSON.parse(err);
        this.alertCtrl.create({
          title: "Error",
          subTitle: error.error,
          buttons: ['OK']
        }).present();
      });

  }

}
