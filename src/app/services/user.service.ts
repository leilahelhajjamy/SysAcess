import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';

class User {
  nom : string
  prenom: string
  poste: string
  carteId: string
  authorised: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  
  UserData : User = {
    nom : '',
    prenom: '',
    poste:'',
    carteId:'',
    authorised: false,
  }
  usersListRef: AngularFireList<any>;
  usersObjectRef: AngularFireObject<any>;
  constructor(public db: AngularFireDatabase)  { } 


  
  getUsersList() {
    this.usersListRef = this.db.list('/users');
    return this.usersListRef;
  }


  save(nom,prenom,poste,carteId,authorised){

      this.UserData.nom =nom
      this.UserData.prenom =prenom
      this.UserData.carteId =carteId
      this.UserData.poste =poste
      this.UserData.authorised =authorised
      this.usersListRef = this.db.list(`/users/${carteId}`);
      this.usersListRef.push(this.UserData);
      this.usersObjectRef = this.db.object(`/users/${carteId}`);
      this.usersObjectRef.set(this.UserData);
    
  }
 
  
  getUser(ID)
  {
  this.usersListRef=this.db.list(`/users/${ID}`)
  return this.usersListRef;
  }


  modifierCarteId(UserData: User, carteId){

    this.db.list(`/users/${carteId}`).remove();
    this.usersObjectRef = this.db.object(`/users/${UserData.carteId}`);
    this.usersObjectRef.set(UserData);
    
  }


  modifierPoste(carteId,poste){
    this.db.object(`/users/${carteId}/poste`).set(poste)
  }
  modifierPrenom(carteId,prenom){
    this.db.object(`/users/${carteId}/prenom`).set(prenom)
  }
  modifierNom(carteId,nom){
    this.db.object(`/users/${carteId}/nom`).set(nom)
  }
  modifierAuthorised(carteId,authorised){
    this.db.object(`/users/${carteId}/authorised`).set(authorised)
  }




}
