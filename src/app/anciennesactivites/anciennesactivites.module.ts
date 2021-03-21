import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabscomponentPageModule } from '../tabscomponent/tabscomponent.module';
import { IonicModule } from '@ionic/angular';

import { AnciennesactivitesPageRoutingModule } from './anciennesactivites-routing.module';

import { AnciennesactivitesPage } from './anciennesactivites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnciennesactivitesPageRoutingModule,
    TabscomponentPageModule,
    ReactiveFormsModule 
  ],
  declarations: [AnciennesactivitesPage]
})
export class AnciennesactivitesPageModule {}
