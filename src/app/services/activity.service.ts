import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';


class Activity {
  timestamp: Date
  type:string
  
}

class ActivityT {
  timestamp:number
  type:string
  
}

class ActivityData{
  timestamp:number
  type:string
  carteId : string
  
} 


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  NumberOfHoursCurrentMonth
  NumberOfHours
  NumberOfHoursCurrentYear
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



saveTimeStamp(carteId,timestamp,type){

  var activityData : ActivityT = {timestamp:timestamp,type:type}
  var lastactivityData: ActivityData = {timestamp:timestamp,type:type,carteId : carteId}
  var TimeStamp = lastactivityData.timestamp.toString()
  this.activityObjectRef = this.db.object(`/activities/${carteId}/${TimeStamp}`);
  this.activityObjectRef.set(activityData);
  this.activityObjectRef = this.db.object(`/lastactivities/${TimeStamp}`);
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




getStatisticsByMonth(carteId,monthStart,monthEnd){
  var  activities =[{
     timestamp : null,
     type : ''
   }]
   var activitiesDif
 
   var sigmaIn = 0
   var sigmaOut = 0

   
    this.db.object(`/activities/${carteId}/`).query.orderByKey().startAfter(monthStart).endBefore(monthEnd).on('value',snapshot=>{
   
     snapshot.forEach(snap=>{ 
       activities.push({ timestamp : snap.val().timestamp,
       type:snap.val().type,
       
     })
     })

     if (activities[0].type == 'IN'){
       activities.shift()
       if(activities[activities.length].type=='OUT')
       {
         activities.pop()
       }
     
       activities.forEach(element => {
         if(element.type=='IN'){
           sigmaIn += element.timestamp
          
         } 
         else {
           sigmaOut += element.timestamp
           
         } 
       });
     
     activitiesDif = sigmaIn - sigmaOut
     

     this.NumberOfHours = Math.floor(activitiesDif / (3.6 * 1000000))
     console.log(this.NumberOfHours)
     return this.NumberOfHours
     
     }     
    else  {
       
       activities.forEach(element => {
         if(element.type=='IN'){
           sigmaIn += element.timestamp
        
         } 
         else if(element.type=='OUT'){
           sigmaOut += element.timestamp
       
         } 
       });
     
     activitiesDif = sigmaIn - sigmaOut 
    this.NumberOfHours = Math.floor(activitiesDif / (3.6 * 1000000))

     }
 
   }) 
   console.log("numberOfHours",this.NumberOfHours) 
   return this.NumberOfHours
}






getStatisticsCurrentYear(carteId,yearStart){
  var  activities =[{
    timestamp : null,
    type : ''
  }]
  var activitiesDif
  var sigmaIn = 0
  var sigmaOut = 0

  console.log('start fetching')
   this.db.object(`/activities/${carteId}/`).query.orderByKey().startAfter(yearStart).on('value',snapshot=>{
  
    snapshot.forEach(snap=>{
    
      activities.push({ timestamp : snap.val().timestamp,
      type:snap.val().type,
      
    })
    })

    if (activities[0].type == 'IN'){
      activities.shift()
      if(activities[activities.length].type=='OUT')
      {
        activities.pop()
      }
    
      activities.forEach(element => {
        if(element.type=='IN'){
          sigmaIn += element.timestamp
        
        } 
        else {
          sigmaOut += element.timestamp
     
        } 
      });
    
    activitiesDif = sigmaIn - sigmaOut
    
   
    this.NumberOfHoursCurrentYear = Math.floor(activitiesDif / (3.6 * 1000000))
  
    return this.NumberOfHoursCurrentYear
    
    }     
   else  {
      
      activities.forEach(element => {
        if(element.type=='IN'){
          sigmaIn += element.timestamp
        
        } 
        else if(element.type=='OUT'){
          sigmaOut += element.timestamp
        
        } 
      });
    
    activitiesDif = sigmaIn - sigmaOut  

   this.NumberOfHoursCurrentYear = Math.floor(activitiesDif / (3.6 * 1000000))
 
    return this.NumberOfHoursCurrentYear
    
    }

  })    
  return this.NumberOfHoursCurrentYear

}




getStatisticsCurrentMonth(carteId,month){
  
  var  activities =[{
    timestamp : null,
    type : ''
  }]
  var activitiesDif

  var sigmaIn = 0
  var sigmaOut = 0

  console.log('start fetching')
   this.db.object(`/activities/${carteId}/`).query.orderByKey().startAfter(month).on('value',snapshot=>{
  
    snapshot.forEach(snap=>{
    
      activities.push({ timestamp : snap.val().timestamp,
      type:snap.val().type,
      
    })
    })

    if (activities[0].type == 'IN'){
      activities.shift()
      if(activities[activities.length].type=='OUT')
      {
        activities.pop()
      }
    
      activities.forEach(element => {
        if(element.type=='IN'){
          sigmaIn += element.timestamp
         
        } 
        else {
          sigmaOut += element.timestamp
         
        } 
      });
    
    activitiesDif = sigmaIn - sigmaOut
    
 
    this.NumberOfHoursCurrentMonth = Math.floor(activitiesDif / (3.6 * 1000000))
   
    return this.NumberOfHoursCurrentMonth
    
    }     
   else  {
      
      activities.forEach(element => {
        if(element.type=='IN'){
          sigmaIn += element.timestamp
         
        } 
        else if(element.type=='OUT'){
          sigmaOut += element.timestamp
         
        } 
      });
    
    activitiesDif = sigmaIn - sigmaOut
    
    
   this.NumberOfHoursCurrentMonth = Math.floor(activitiesDif / (3.6 * 1000000))
  
    return this.NumberOfHoursCurrentMonth
    
    }

  }) 
  
  return this.NumberOfHoursCurrentMonth
}







 
}