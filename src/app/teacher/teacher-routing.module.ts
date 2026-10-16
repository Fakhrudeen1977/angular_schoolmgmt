import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { TeacherModule } from '../teacher/teacher.module';


const routes: Routes = [

  {
    path: 'teacher',
    loadChildren: () =>
      import('../teacher/teacher.module').then(m => m.TeacherModule)
  },

  
  {
        path: 'add',
        component: AddTeacherComponent
      },

  {
    path: '',
    redirectTo: 'teacher',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'teacher'
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
