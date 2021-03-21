import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabscomponentPageModule } from '../tabscomponent/tabscomponent.module';
import { IonicModule } from '@ionic/angular';

import { SignoutPageRoutingModule } from './signout-routing.module';

import { SignoutPage } from './signout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignoutPageRoutingModule,
    TabscomponentPageModule
  ],
  declarations: [SignoutPage]
})

export class SignoutPageModule {}
