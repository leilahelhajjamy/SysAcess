import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FCMNG } from 'fcm-ng';
const firebaseConfig = {
  apiKey: 'AIzaSyBgN5HXli1TiiCZney2RV25spifnhLbac0',
  authDomain: 'sysaccess-ecf6b.firebaseapp.com',
  databaseURL: 'https://sysaccess-ecf6b-default-rtdb.firebaseio.com',
  projectId: 'sysaccess-ecf6b',
  storageBucket: 'sysaccess-ecf6b.appspot.com',
  messagingSenderId: '879760335132',
  appId: '1:879760335132:web:22808658174a344135dad9',
  measurementId: 'G-982KE3TNTJ',
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage,
  ],
  providers: [
    FCMNG,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
