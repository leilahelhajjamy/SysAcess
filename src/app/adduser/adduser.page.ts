import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['../app.component.scss'],
})
export class AdduserPage implements OnInit {
  formUserAdd : FormGroup;
  nom : string ;
  prenom : string ;
  poste : string ;
  carteId : string ;
  autorised : boolean ;
  public checkedState: boolean;
  constructor(public alertController: AlertController, public formBuilder : FormBuilder, public navCtrl: NavController,private authService : AuthService) 
  {

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
      carteId : new FormControl('', Validators.compose([
    Validators.required
      ])),
      autorised : new FormControl('', Validators.compose([
        Validators.required
   ]))
});
    
   }

  ngOnInit() {

  }



ajouter(){

  var userData = {
   uid:'',
   nom:this.nom,
   prenom:this.prenom,
   poste:this.poste,
   carteId:this.carteId,
   autorised:this.autorised
       
     
 };

  //  var newUserKey = firebase.database().ref().child('users').push().key;

  //  userData.uid = newUserKey;
  //   var updates={};

  //   updates['/users/' + newUserKey] = userData;
  //   firebase['database'].ref().update(updates);

  //   this.navCtrl.navigateForward('users');
  
}

}






