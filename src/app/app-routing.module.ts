import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavebloodgroupComponent } from './bloodgroup/savebloodgroup/savebloodgroup.component';
import { ViewbloodgroupComponent } from './bloodgroup/viewbloodgroup/viewbloodgroup.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
   
   { path: 'login',  component: LoginComponent },
   { path: 'dashboard',  component: DashboardComponent },
   { path: 'practice',  component: PracticeComponent },
   { path: 'register',  component:RegisterComponent },

   { path: 'savebloodgroup',  component: SavebloodgroupComponent },
   { path: 'viewbloodgroup',  component: ViewbloodgroupComponent }, 

   { path: '', component: LoginComponent },   
   { path: '', redirectTo: '/login ', pathMatch: 'full' },
   //{ path: '**', component: PagenotfoundComponent },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
  
 }
