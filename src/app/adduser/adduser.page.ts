import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['../app.component.scss'],
})
export class AdduserPage implements OnInit {
  usersRef:  AngularFireList<any>;
  users: Observable<any>;
  formUserAdd : FormGroup;
  nom : string ;
  prenom : string ;
  poste : string ;
  carteId : string ;
  public autorised : boolean ;
  public checkedState: boolean;
  constructor(public toastController: ToastController,public db: AngularFireDatabase,public alertController: AlertController, public formBuilder : FormBuilder, public navCtrl: NavController,private authService : AuthService) 
  {


    this.usersRef = db.list('users');
    this.users = this.usersRef.valueChanges();
    this.autorised= true;
    this.checkedState = true;

    this.formUserAdd = this.formBuilder.group({
      nom : new FormControl('', Validators.compose([
          Validators.required
      ])),
      prenom : new FormControl('', Validators.compose([
           Validators.required
      ])),
      poste : new FormControl('', Validators.compose([
        Validators.required
      ])),
      carteId : new FormControl('', Validators.required),
     autorised : new FormControl('', Validators.compose([
        Validators.required
   ]))
});
    
   }

  ngOnInit() {

  }



ajouter(){

  var userData = {
   nom:this.nom,
   prenom:this.prenom,
   poste:this.poste,
   carteId:this.carteId,
   autorised:this.autorised
            
 };
 this.usersRef.push(userData);
  
  
}

}






