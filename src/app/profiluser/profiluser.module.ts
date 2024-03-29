import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabscomponentPageModule } from '../tabscomponent/tabscomponent.module';
import { IonicModule } from '@ionic/angular';
import { ProfiluserPageRoutingModule } from './profiluser-routing.module';
import { ProfiluserPage } from './profiluser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfiluserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabscomponentPageModule,
  
   

  ],
  declarations: [ProfiluserPage]
})
export class ProfiluserPageModule {}
