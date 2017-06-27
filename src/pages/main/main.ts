import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Friend } from '../../models/Friend';

import { LoginPage } from '../../pages/login/login';

import { FriendService } from '../../providers/friend-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [FriendService]
})
export class MainPage {

  friends: Array<Friend>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alert: AlertController, private _friend: FriendService,
              private storage:Storage) {
    this.updateList(null);
    
  }   

  updateList(refresher){
    console.log(refresher);
    this.storage.get('user').then((value) => {
      this._friend.getFriends(value)
      .subscribe(res => {
        this.friends = res.results;
        console.log(this.friends);  
        if (refresher != null){
          refresher.complete();
        }                     
      });
    }); 
       
  }

  showAddDialog(){
    this.alert.create({
      title: "Add Friend",
      subTitle: "Enter Information",
      inputs: [{name:"name", placeholder:"Friend Name"},
        {name:"email", placeholder:"E-Mail"},
        {name: "number", placeholder: "Number"}
      ],
      buttons: [{text:"Cancel"}, 
        {text:"Save", handler: data => {
          
          this._friend.addFriend(data)
            .subscribe(res => {
              this.updateList(null);            
            });         

          }
        }]
    }).present();
  }

  deleteFriend(id){
    this._friend.delFriend(id)
      .subscribe(res => {
        this.alert.create({
          title: "Done!",
          subTitle: "Friend deleted successfuly!",
          buttons: ['OK']
        }).present();
        this.updateList(null);
      });
  }

  editFriend(obj){
    this.alert.create({
      title: "Edit Friend",
      subTitle: "Enter Information",
      inputs: [{name:"name", placeholder:"Friend Name",  value: obj.name},
        {name:"email", placeholder:"E-Mail", value: obj.email},
        {name: "number", placeholder: "Number",  value: obj.number}
      ],
      buttons: [{text:"Cancel"}, 
        {text:"Save", handler: data => {
          data.objectId = obj.objectId;
          this._friend.updFriend(data)
            .subscribe(res => {
              this.updateList(null);            
            });         

          }
        }]
    }).present();
  }

  logout(){
    this.storage.clear().then(() =>{
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
