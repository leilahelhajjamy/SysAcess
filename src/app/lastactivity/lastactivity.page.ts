import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lastactivity',
  templateUrl: './lastactivity.page.html',
  styleUrls: ['../app.component.scss'],
})
export class LastactivityPage implements OnInit {

  constructor(private authService: AuthService,public navCtrl: NavController) { }

  ngOnInit() {
  }


  back(){
    this.navCtrl.navigateBack('');

  }
signOut(){
this.authService.signOut()
this.navCtrl.navigateRoot('home')
}

usersPage(){
  this.navCtrl.navigateForward('users');
}

historyPage(){
  //this.navCtrl.navigateForward('');

}

}
