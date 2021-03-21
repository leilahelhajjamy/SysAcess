import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabscomponentPageModule } from '../tabscomponent/tabscomponent.module';
import { IonicModule } from '@ionic/angular';

import { AdduserPageRoutingModule } from './adduser-routing.module';

import { AdduserPage } from './adduser.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AdduserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabscomponentPageModule
    
  ],
  declarations: [AdduserPage]
})
export class AdduserPageModule {}
