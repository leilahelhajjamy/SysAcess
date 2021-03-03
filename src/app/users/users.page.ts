import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['../app.component.scss'],
})
export class UsersPage implements OnInit {

  constructor(private authService: AuthService,public navCtrl: NavController) { }

  ngOnInit() {
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
