import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivityService } from '../services/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lastactivity',
  templateUrl: './lastactivity.page.html',
  styleUrls: ['../app.component.scss'],
})

export class LastactivityPage implements OnInit {

  activities 
  activitiesAjourdhui 
  timeline
  now = -1 * new Date().getTime();
  nowYear = new Date().getFullYear()
  nowMonth = new Date().getMonth() +1
  nowForMonth

  constructor( public router : Router ,private activityService : ActivityService,private authService: AuthService,public navCtrl: NavController)
  {
 
    console.log(this.now)
    if(this.nowMonth<10){
      this.nowForMonth = this.nowYear.toString() +"-0"+this.nowMonth.toString()+"-01"
    }else{
      this.nowForMonth = this.nowYear.toString() +"-"+this.nowMonth.toString()+"-01"
    }
    
  }


  ngOnInit() {

   
  }

  

   profileUser(carteId){
    this.router.navigate(['/profiluser', carteId]);

   }

}
