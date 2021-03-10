import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-lastactivity',
  templateUrl: './lastactivity.page.html',
  styleUrls: ['../app.component.scss'],
})
export class LastactivityPage implements OnInit {

  activities =[]
  constructor(private activityService : ActivityService,private authService: AuthService,public navCtrl: NavController)
  {
    this.getAllActivities()
  }

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


getAllActivities(){

  
}

}
