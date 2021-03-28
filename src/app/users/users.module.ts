import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { TabscomponentPageModule } from '../tabscomponent/tabscomponent.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsersPageRoutingModule,
    TabscomponentPageModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
