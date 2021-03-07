import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddactivityPageRoutingModule } from './addactivity-routing.module';

import { AddactivityPage } from './addactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddactivityPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddactivityPage]
})
export class AddactivityPageModule {}
