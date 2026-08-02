import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavebloodgroupComponent } from './bloodgroup/savebloodgroup/savebloodgroup.component';
import { ViewbloodgroupComponent } from './bloodgroup/viewbloodgroup/viewbloodgroup.component';
import { RegisterComponent } from './register/register.component';
import { SaveStudentComponent } from './student/save-student/save-student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';
import { SearchStudentComponent } from './student/search-student/search-student.component';
import { SaveClassComponent } from './classinfo/save-class/save-class.component';
import { ViewClassComponent } from './classinfo/view-class/view-class.component';
import { UpdateClassComponent } from './classinfo/update-class/update-class.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { RoleAddComponent } from './role/role-add/role-add.component';
import { RoleListComponent } from './role/role-list/role-list.component';


const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'saveStudent',
        component: SaveStudentComponent
      },
      {
        path: 'searchStudent',
        component: SearchStudentComponent
      },
      {
        path: 'viewStudent',
        component: ViewStudentComponent
      },

      {
        path: 'saveRole',
        component: RoleAddComponent
      },

      {
        path: 'viewRolesList',
        component: RoleListComponent
      },

      {
        path: 'saveClass',
        component: SaveClassComponent
      },

      {
        path: 'viewClass',
        component: ViewClassComponent
      },

     

      {
        path: 'updateClass',
        component: UpdateClassComponent
      },

      { 
        path: 'savebloodgroup', 
      component: SavebloodgroupComponent 
     },

      { 
        path: 'viewbloodgroup', 
        component: ViewbloodgroupComponent 
      },

    ]
  },








  { path: '', redirectTo: '/login ', pathMatch: 'full' },

  //{ path: '**', component: PagenotfoundComponent },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
