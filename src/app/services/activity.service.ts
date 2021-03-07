import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';


class Activity {
  timestamp: Date
  type:string
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  
  activityListRef: AngularFireList<any>;
  activityObjectRef: AngularFireObject<any>;
  constructor(public db: AngularFireDatabase)  { } 


  
  getActivitiesList() {
    this.activityListRef = this.db.list('/activities');
    return this.activityListRef;
  }


  save(carteId,timestamp,type){

      var activityData : Activity = {timestamp:timestamp,type:type}
     
      this.activityObjectRef = this.db.object(`/activities/${carteId}/${activityData.timestamp}`);
      this.activityObjectRef.set(activityData);
      // this.activityObjectRef = this.db.object(`/activities/${carteId}`);
      // this.activityObjectRef.set(activityData);
    
  }


getActivityByUser(carteId){

  var activities 
  activities=[]
   this.db.object(`/activities/${carteId}/`).query.orderByChild('timestamp').on('value',snapshot=>{

    snapshot.forEach(snap=>{
      activities.push({ timestamp : new Date(-1*(snap.val().timestamp)).toString().replace( "GMT+0100" , "" ).replace( "(heure normale d\’Europe centrale)" , "" ).replace( "Z" , "" ).replace("GM +0200 (heure d'été d'Europe centrale)",""),
      type:snap.val().type
    })

    })
  })
  return activities
  
}

getAllActivities(){
  this.activityObjectRef = this.db.object(`/activities/`);
  this.activityObjectRef;
}

 
}