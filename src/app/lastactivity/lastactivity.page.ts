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

  activities 
  activitiesAjourdhui 
  timeline
  now = -1 * new Date().getTime();
  nowYear = new Date().getFullYear()
  nowMonth = new Date().getMonth() +1
  nowForMonth

  constructor(private activityService : ActivityService,private authService: AuthService,public navCtrl: NavController)
  {
 
    console.log(this.now)
    if(this.nowMonth<10){
      this.nowForMonth = this.nowYear.toString() +"-0"+this.nowMonth.toString()+"-01"
    }else{
      this.nowForMonth = this.nowYear.toString() +"-"+this.nowMonth.toString()+"-01"
    }
    

  }

  ngOnInit() {
    this.timeline="globe" 
    this.getAllActivitiesAujourdhui()
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
    this.activities = this.activityService.getAllActivities()
  
}

getAllActivitiesAujourdhui(){
  var before = this.now + (8.64*10000000)
  this.activitiesAjourdhui = this.activityService.getAllActivitiesAujourdhui(this.now,before)

}


doRefresh(event) {
  this.getActivitiesCurrentMonth()

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}




segmentChanged(timeline){

  if(timeline=="globe"){
  
  console.log("segment changed globe")
   setTimeout(() => {
    this.getAllActivitiesAujourdhui()
    }, 4000);
  
  }
  else if (timeline ="moi"){
    setTimeout(() => {
      
      this.getActivitiesCurrentMonth()
       }, 4000);
  
  }
  
  }



  getActivitiesCurrentMonth(){
     
    var month = (-1)*Date.parse(this.nowForMonth)
    var monthString = month.toString()
    this.activities = this.activityService.getActivitiesCurrentMonth(monthString)

   }


}
