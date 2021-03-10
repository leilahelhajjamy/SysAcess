import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController,ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { ProfiluserPage } from '../profiluser/profiluser.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['../app.component.scss'],
})
export class UsersPage implements OnInit {

  Users = [];
  authorised
  carteId
  constructor( public router :Router , public userService:UserService,public toastController: ToastController,public alertController: AlertController, public formBuilder : FormBuilder, public navCtrl: NavController,private authService : AuthService) 
  {
    
  
    

  }

  ngOnInit() {
    this.fetchUsers();
    let usersRes = this.userService.getUsersList();
    usersRes.snapshotChanges().subscribe(res => {
      this.Users = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Users.push(a);
      })
    })
  }

  onCancel(){
   
    this.fetchUsers();
    let usersRes = this.userService.getUsersList();
    usersRes.snapshotChanges().subscribe(res => {
      this.Users = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Users.push(a);
      })
    })

  }

  onChange(event){
    this.filterList(event)

  }
  
  fetchUsers() {
    this.userService.getUsersList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }




  lastactivityPage(){
    this.navCtrl.navigateForward('lastactivity');
  }

  historyPage(){
    //this.navCtrl.navigateForward('');

  }


  adduserPage(){
    this.navCtrl.navigateForward('adduser');

  }



  async filterList(evt) {
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return ;
    }
    
    this.Users = this.Users.filter(currentUser => {
      if (currentUser.nom  && searchTerm  ) {
        return (currentUser.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
    
  }




 
async toastSuccess(){
  
    const toast = await this.toastController.create({
    message: "Modifié avec succés",
    position: 'top',
    color:'success',
    duration: 2000
  });
  toast.present();
  
  }
  


  async supprimerUser(carteId){


    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: '<div class="alert-wrapper"> Etes-vous sûrs de vouloir supprimer cet utilisateur </div>',
      buttons: [{
        cssClass: 'my-button-alert',
        text: 'Ok',
        handler : () =>{
          console.log('ok clicked')
          this.userService.supprimerUser(carteId)
          console.log(carteId)
  
        }
      },
      {
        cssClass: 'my-button-alert',
        text: 'Annuler',
        role: 'cancel'
      }
    
    ]
      });
      await alert.present();
  
  }



async modifierAuthorised(carteId,authorised){
    this.userService.modifierAuthorised(carteId,!authorised)
    this.toastSuccess()
  
}


}
