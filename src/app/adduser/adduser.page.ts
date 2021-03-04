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
  usersObjectRef: AngularFireObject<any>;
  users: Observable<any>;
  formUserAdd : FormGroup;
  nom : string ;
  prenom : string ;
  poste : string ;
  carteId : string ;
  public autorised : boolean;
  public checkedState: boolean;


  messagePoste = 'le champs <strong>Poste</strong> doit contenir seulement des lettres'
  messageChamps = 'Veuillez remplir <strong>tous</strong> les champs'
  messageCarteId = 'le champs <strong>Carte ID </strong> est invalide'
  messageNom = 'le champs <strong>Nom</strong> doit contenir seulement des lettres'
  messagePrenom ='le champs <strong>Prénom</strong> doit contenir seulement des lettres'
  
  validatedNom : boolean = true;
  validatedPrenom : boolean = true;
  validatedPoste : boolean = true;

  constructor(public toastController: ToastController,public db: AngularFireDatabase,public alertController: AlertController, public formBuilder : FormBuilder, public navCtrl: NavController,private authService : AuthService) 
  {


 
    // this.users = this.usersRef.valueChanges();
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



save(){

  var userData = {
   nom:this.nom,
   prenom:this.prenom,
   poste:this.poste,
   carteId:this.carteId,
   autorised:this.autorised
            
 };

    this.usersRef = this.db.list(`/users/${this.carteId}`);
    this.usersRef.push(userData);
    this.usersObjectRef = this.db.object(`/users/${this.carteId}`);
    this.usersObjectRef.set(userData);
  
}





async ajouter(){

  var carteIdSplit:string[]
  
    if(this.nom!=null && this.prenom!=null && this.carteId!=null && this.poste!=null ){

      if(/^[a-zA-Z ]*$/.test(this.nom)==false){
       this.toast(this.messageNom)
       this.validatedNom=false;
      }

      
      if(/^[a-zA-Z ]*$/.test(this.prenom)==false){
        this.toast(this.messagePrenom)
        this.validatedPrenom=false;
      }


      if(/^[a-zA-Z ]*$/.test(this.poste)==false){
        this.toast(this.messagePoste)
        this.validatedPoste=false;
      }

    
      carteIdSplit=this.carteId.split(" ");
      if(carteIdSplit.length==4)
      {
    
          if(carteIdSplit[0].length!=2 || carteIdSplit[1].length!=2 || carteIdSplit[2].length!=2 || carteIdSplit[3].length!=2){
            this.toast(this.messageCarteId);
           
            
          }
          else{
                if (/^([A-Z]+)$/.test(carteIdSplit[0])==false || /^([0-9]+)$/.test(carteIdSplit[1])==false || /^([0-9]+)$/.test(carteIdSplit[2])==false || /^([0-9][A-Z]+)$/.test(carteIdSplit[3])==false ){
                        
                  
                  this.toast(this.messageCarteId);                            
                }
    
                else{
                  if(this.validatedNom && this.validatedPrenom && this.validatedPoste){
                    this.save();
                    this.navCtrl.navigateRoot('users');
                    const toast = await this.toastController.create({
                      message: "Utilisateur créé avec succés",
                      position: 'top',
                      color:'success',
                      duration: 2000
                    });
                    toast.present();
                  }
                  
                 
                }   
              }   
    
      }else
          {
            this.toast(this.messageCarteId);
           
          }    
    }
  
   
    else{
  
      this.toast(this.messageChamps);
  
      }
  
  
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
  
  

  
  
  





}






