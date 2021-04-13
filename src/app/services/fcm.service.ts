import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FCMNG } from 'fcm-ng';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  devicesObjectRef: any;

  constructor(private FCMPluginNG: FCMNG, public db: AngularFireDatabase) {}

  async getToken() {
    const fcmToken: string = await this.FCMPluginNG.getToken();
    this.saveTokenToDatabase(fcmToken);
  }

  saveTokenToDatabase(token) {
    if (!token) {
      return;
    }
    this.devicesObjectRef = this.db.object(`/devices/`);
    var deviceData = {
      token,
    };
    this.devicesObjectRef.set(deviceData);
  }

  listinToNOtifications() {
    return this.FCMPluginNG.onNotification();
  }
}
