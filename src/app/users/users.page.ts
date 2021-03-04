import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController,ToastController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['../app.component.scss'],
})
export class UsersPage implements OnInit {

  usersListRef: AngularFireList<any>;
  Users = [];
  constructor(public toastController: ToastController,public db: AngularFireDatabase,public alertController: AlertController, public formBuilder : FormBuilder, public navCtrl: NavController,private authService : AuthService) 
  {



  }

  ngOnInit() {
    this.fetchUsers();
    let usersRes = this.getUsersList();
    usersRes.snapshotChanges().subscribe(res => {
      this.Users = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Users.push(a);
      })
    })
  }



  getUsersList() {
    this.usersListRef = this.db.list('/users');
    return this.usersListRef;
  }


  fetchUsers() {
    this.getUsersList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }




  lastactivityPage(){
    this.navCtrl.navigateForward('lastactivity');
  }

  historyPage(){
    //this.navCtrl.navigateForward('');

  }


  adduserPage(){
    this.navCtrl.navigateForward('adduser');

  }





}
