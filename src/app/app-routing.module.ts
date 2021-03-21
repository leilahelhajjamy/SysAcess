import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from "./services/authguard.service";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'lastactivity',
    loadChildren: () => import('./lastactivity/lastactivity.module').then( m => m.LastactivityPageModule),
    canActivate : [AuthguardService]
   
  },
  {
    path: 'adduser',
    loadChildren: () => import('./adduser/adduser.module').then( m => m.AdduserPageModule),
    canActivate : [AuthguardService]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
    canActivate : [AuthguardService]
    
  },
  {
    path: 'profiluser',
    loadChildren: () => import('./profiluser/profiluser.module').then( m => m.ProfiluserPageModule),
    canActivate : [AuthguardService]
  },
  {
  path: 'profiluser/:carteId',
  loadChildren: () => import('./profiluser/profiluser.module').then(m => m.ProfiluserPageModule),
  canActivate : [AuthguardService]
  },
  {
    path: 'addactivity',
    loadChildren: () => import('./addactivity/addactivity.module').then( m => m.AddactivityPageModule),
  
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule),
    canActivate : [AuthguardService]
  },
  {
    path: 'statistics/:carteId/:nom/:prenom',
    loadChildren: () => import('./statistics/statistics.module').then( m => m.StatisticsPageModule),
    canActivate : [AuthguardService]
  },
  {
    path: 'tabscomponent',
    loadChildren: () => import('./tabscomponent/tabscomponent.module').then( m => m.TabscomponentPageModule)
  },
  {
    path: 'signout',
    loadChildren: () => import('./signout/signout.module').then( m => m.SignoutPageModule),
    canActivate : [AuthguardService]
  },
  {
    path: 'anciennesactivites',
    loadChildren: () => import('./anciennesactivites/anciennesactivites.module').then( m => m.AnciennesactivitesPageModule),
    canActivate : [AuthguardService]
  },
  {
    path: 'anciennesactivites/:carteId/:nom/:prenom',
    loadChildren: () => import('./anciennesactivites/anciennesactivites.module').then( m => m.AnciennesactivitesPageModule),
    canActivate : [AuthguardService]
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
