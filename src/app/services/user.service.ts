import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';

class User {
  nom : string
  prenom: string
  poste: string
  carteId: string
  authorised: string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  usersListRef: AngularFireList<any>;
  usersObjectRef: AngularFireObject<any>;
  constructor(public db: AngularFireDatabase)  { } 


  
  getUsersList() {
    this.usersListRef = this.db.list('/users');
    return this.usersListRef;
  }


  save(nom,prenom,poste,carteId,authorised){

    var userData : User
      userData.nom=nom;
      userData.prenom=prenom;
      userData.poste=poste;
      userData.carteId=carteId;
      userData.authorised=authorised;
  
      this.usersListRef = this.db.list(`/users/${carteId}`);
      this.usersListRef.push(userData);
      this.usersObjectRef = this.db.object(`/users/${carteId}`);
      this.usersObjectRef.set(userData);
    
  }
 
  
  getUser(ID)
  {
  this.usersListRef=this.db.list(`/users/${ID}`)
  return this.usersListRef;
  }



}
