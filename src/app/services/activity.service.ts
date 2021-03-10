import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { NOMEM } from 'node:dns';


class Activity {
  timestamp: Date
  type:string
  
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  nom 
  prenom 
  activityListRef: AngularFireList<any>;
  activityObjectRef: AngularFireObject<any>;
  constructor(public db: AngularFireDatabase)  { } 


  
  getActivitiesList() {
    this.activityListRef = this.db.list('/activities');
    return this.activityListRef;
  }


  save(carteId,timestamp,type){

    var activityData : Activity = {timestamp:timestamp,type:type}
    var lastactivityData = {timestamp:timestamp,type:type,carteId : carteId}
    this.activityObjectRef = this.db.object(`/activities/${carteId}/${activityData.timestamp}`);
    this.activityObjectRef.set(activityData);
    this.activityObjectRef = this.db.object(`/lastactivities/${activityData.timestamp}`);
    this.activityObjectRef.set(lastactivityData);


  
}


getActivityByUser(carteId){

var activities 
activities=[]
 this.db.object(`/activities/${carteId}/`).query.orderByChild('timestamp').on('value',snapshot=>{

  snapshot.forEach(snap=>{
    activities.push({ timestamp : new Date(-1*(snap.val().timestamp)).toString().replace( "GMT+0100" , "" ).replace( "(heure normale d\’Europe centrale)" , "" ).replace( "Z" , "" ).replace("GM +0200 (heure d'été d'Europe centrale)",""),
    type:snap.val().type,
    
  })

  })
})
return activities

}

 getAllActivities(){

  var activities 
  activities=[]
 

   this.db.object(`/lastactivities/`).query.orderByChild('timestamp').on('value',snapshot=>{
  
    snapshot.forEach( snap=>{
      activities.push({ timestamp : new Date(-1*(snap.val().timestamp)).toString().replace( "GMT+0100" , "" ).replace( "(heure normale d\’Europe centrale)" , "" ).replace( "Z" , "" ).replace("GM +0200 (heure d'été d'Europe centrale)",""),
      type:snap.val().type,
      carteId : snap.val().carteId ,
      nom : this.nom,
      prenom : this.prenom ,
      poste : ''
      })
      activities.map(element =>{
        this.db.object(`/users/${element.carteId}`).snapshotChanges().subscribe(res=>{
          element.nom = res.payload.child('nom').val()
          element.prenom = res.payload.child('prenom').val() 
          element.poste = res.payload.child('poste').val() 
        })
      })
   
    })
  })
  return activities

  
}

 
}