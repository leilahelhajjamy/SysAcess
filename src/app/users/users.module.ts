import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsersPageRoutingModule } from './users-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsersPage } from './users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UsersPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
