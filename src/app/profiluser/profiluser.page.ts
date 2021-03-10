import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivityService } from '../services/activity.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.page.html',
  styleUrls: ['../app.component.scss'],
})
export class ProfiluserPage implements OnInit {
  carteId : string;
  carteID
  nom
  prenom
  poste
  authorised
  User 
  activities = []
  activitiesdata = []
  timeline

  formNomModify: FormGroup;
  formPrenomModify: FormGroup;
  formPosteModify: FormGroup;
  formCarteIdModify: FormGroup;
  formAuthorisedModify: FormGroup;




  editNomClicked :boolean = false
  editPrenomClicked :boolean = false
  editPosteClicked : boolean =false
  editCarteIdClicked : boolean =false
  editAuthorisedClicked : boolean =false

  
  messagePoste = 'le champs <strong>Poste</strong> doit contenir seulement des lettres'
  messageCarteId = 'le champs <strong>Carte ID </strong> est invalide'
  messageNom = 'le champs <strong>Nom</strong> doit contenir seulement des lettres'
  messagePrenom ='le champs <strong>Prénom</strong> doit contenir seulement des lettres'



  constructor(public alertController: AlertController, public navCtrl: NavController,public toastController: ToastController,public formBuilder : FormBuilder,public activityService : ActivityService,private userService : UserService ,private activatedRoute: ActivatedRoute) {

    
 
    this.formNomModify = this.formBuilder.group({
      nom : new FormControl('', Validators.compose([
          Validators.required
      ]))
    });

    this.formPrenomModify = this.formBuilder.group({
  
    prenom : new FormControl('', Validators.compose([
       Validators.required
    ]))
 
    });
    this.formPosteModify = this.formBuilder.group({
  
    poste : new FormControl('', Validators.compose([
         Validators.required
    ]))
   
    });

    this.formCarteIdModify = this.formBuilder.group({
  
    carteID : new FormControl('', Validators.compose([
         Validators.required
    ]))
   
    });
    
    this.formAuthorisedModify = this.formBuilder.group({
  
      authorised : new FormControl('', Validators.compose([
           Validators.required
      ]))
     
      });


   }

  ngOnInit() {
    this.User = {
      nom : '',
      prenom: '',
      poste: '',
      carteId: '',
      authorised:false
    };
    this.carteId = this.activatedRoute.snapshot.paramMap.get('carteId');
    this.userService.getUser(this.carteId).valueChanges().subscribe(res=>{
     this.User.nom=res['2']
     this.User.prenom=res['4']
     this.User.carteId=res['1']
     this.User.poste=res['3']
     this.User.authorised=res['0']
     this.authorised=res['0']
     console.log(this.User.authorised)
    })

    this.getActivityByUser()
    this.timeline="create";

  }


getActivityByUser(){

  this.activities=this.activityService.getActivityByUser(this.carteId)
  

}






EditNomClicked(){
  this.editNomClicked = true;
}
EditPrenomClicked(){
  this.editPrenomClicked = true;
} 
EditPosteClicked (){
  this.editPosteClicked = true;
}
EditCarteIdClicked() {
  this.editCarteIdClicked = true;
}
EditAuthorisedClicked (){
  this.editAuthorisedClicked = true;
}





AnnulerEditNomClicked(){
  this.editNomClicked = false;
}
AnnulerEditPrenomClicked(){
  this.editPrenomClicked = false;
} 
AnnulerEditPosteClicked (){
  this.editPosteClicked = false;
}
AnnulerEditCarteIdClicked() {
  this.editCarteIdClicked = false;
}
AnnulerEditAuthorisedClicked (){
  this.editAuthorisedClicked = false;
}



async toast(message){
  const toast = await this.toastController.create({
    message: message,
    position: 'top',
    color:'warning',
    duration: 2000
  });
  toast.present();

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



async supprimerUser(){


  const alert = await this.alertController.create({
    cssClass: 'my-alert-class',
    message: '<div class="alert-wrapper"> Etes-vous sûrs de vouloir supprimer cet utilisateur </div>',
    buttons: [{
      cssClass: 'my-button-alert',
      text: 'Ok',
      handler : () =>{
        console.log('ok clicked')
        this.userService.supprimerUser(this.carteId)
        this.navCtrl.navigateForward([`/users/`]);

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






async modifierCarteId(){

if(this.carteID!=null){

  var carteIdSplit=this.carteID.split(" ");
  if(carteIdSplit.length==4){

    if(carteIdSplit[0].length!=2 || carteIdSplit[1].length!=2 || carteIdSplit[2].length!=2 || carteIdSplit[3].length!=2){
      this.toast(this.messageCarteId);         
    }
    else{
      if (/^([A-Z]+)$/.test(carteIdSplit[0])==false || /^([0-9]+)$/.test(carteIdSplit[1])==false || /^([0-9]+)$/.test(carteIdSplit[2])==false || /^([0-9][A-Z]+)$/.test(carteIdSplit[3])==false ){
                        
                  
        this.toast(this.messageCarteId);                            
      }
      else{
       this.User.carteId = this.carteID
       this.userService.modifierCarteId(this.User,this.carteId)
       this.toastSuccess()
       this.navCtrl.navigateForward([`/profiluser/${this.carteID}`]);
       this.AnnulerEditCarteIdClicked()
      }

    }
  }
  else{
    this.toast(this.messageCarteId);  

  }

} 
else{
  this.toast('Veuillez saisir un ID de carte'); 

}

}




async modifierPoste(){
  if(this.poste!=null ){

    if(/^[a-zA-Z ]*$/.test(this.poste)==false){
     this.toast(this.messagePoste)
    }
    else{

      this.userService.modifierPoste(this.carteId,this.poste)
      this.toastSuccess()
      this.AnnulerEditPosteClicked()
    }
  }
  else{
    
    this.toast('Veuillez saisir un poste')

  }

}
async modifierPrenom(){
  if(this.prenom!=null ){

    if(/^[a-zA-Z ]*$/.test(this.prenom)==false){
     this.toast(this.messagePrenom)
    }
    else{
      this.userService.modifierPrenom(this.carteId,this.prenom)
      this.toastSuccess()
      this.AnnulerEditPrenomClicked()
    }
  }

  else{

    this.toast('Veuillez saisir un prénom')

  }

}
async modifierNom(){

  
  if(this.nom! ){

    if(/^[a-zA-Z ]*$/.test(this.nom)==false){
     this.toast(this.messageNom)
    }
    else{
      this.userService.modifierNom(this.carteId,this.nom)
      this.toastSuccess()
      this.AnnulerEditNomClicked()
    }
  }

  else{
    
    this.toast('Veuillez saisir un nom ')

  }
}


async modifierAuthorised(){
  this.userService.modifierAuthorised(this.carteId,this.authorised)
  this.AnnulerEditAuthorisedClicked()
  this.toastSuccess()

}


segmentChanged($timeline){

this.getActivityByUser()

}


doRefresh(event) {
  this.getActivityByUser()

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}




usersPage(){
  this.navCtrl.navigateForward('users');
}

lastActivityPage(){
  this.navCtrl.navigateForward('lastactivity');
}

}
