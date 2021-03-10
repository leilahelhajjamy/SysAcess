import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['../app.component.scss'],
})
export class HomePage {
  formLogin : FormGroup;
  email : string ;
  password : string ;

  constructor( public alertController: AlertController, public formBuilder : FormBuilder,private fireAuth : AngularFireAuth, public navCtrl: NavController,private authService : AuthService) {

    this.formLogin = this.formBuilder.group({
      password : new FormControl('', Validators.compose([
          Validators.required
      ])),
              email : new FormControl('', Validators.compose([
           Validators.required
      ]))
});
  }



login(){

  this.authService.login(this.email,this.password)
  this.navCtrl.navigateForward('lastactivity');

}

async forgotPassword(){
this.authService.forgotPassword(this.email);
if(this.email!=null){
  const alert = await this.alertController.create({
    cssClass: 'my-alert-class',
    message: '<div class="alert-wrapper">Un message de réinitialisation est envoyé, rendez-vous sur votre boîte </div>',
    buttons: [{
      cssClass: 'my-button-alert',
      text: 'Ok',
      handler : () =>{
        console.log('ok clicked')
      }
    
    }]
    });
    await alert.present();

}else{

  const alert = await this.alertController.create({
    cssClass: 'my-alert-class',
    message: '<div class="alert-wrapper"> Veuillez saisir votre adresse email </div>',
    buttons: [{
      cssClass: 'my-button-alert',
      text: 'Ok',
      handler : () =>{
        console.log('ok clicked')
      }
    }]
    });
    await alert.present();

}


}


}

