import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from './services/tokenstorage.service';
import { DataService } from './services/data.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDividerModule } from '@angular/material/divider'; 
import { AuthService } from './services/auth.service';
import { MasterService } from './services/master.service';
import { SavebloodgroupComponent } from './bloodgroup/savebloodgroup/savebloodgroup.component';
import { ViewbloodgroupComponent } from './bloodgroup/viewbloodgroup/viewbloodgroup.component';
import {MatDialogModule} from '@angular/material/dialog';

import { MY_DATE_FORMATS } from './date-format/my-date-formats';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { JsonComponent } from './json/json.component';
import { EditbloodgroupComponent } from './bloodgroup/editbloodgroup/editbloodgroup.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SaveStudentComponent } from './student/save-student/Save-Student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SaveClassComponent } from './classinfo/save-class/save-class.component';
import { ViewClassComponent } from './classinfo/view-class/view-class.component';
import { UpdateClassComponent } from './classinfo/update-class/update-class.component';
import { SearchStudentComponent } from './student/search-student/search-student.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PracticeComponent,
    SidenavComponent,
    DashboardComponent,    
    SavebloodgroupComponent,
    ViewbloodgroupComponent,
    SaveStudentComponent,
    JsonComponent,
    EditbloodgroupComponent,
    ConfirmDialogComponent,
    SaveStudentComponent,
    ViewStudentComponent,
    UpdateStudentComponent,
    SaveClassComponent,
    ViewClassComponent,
    UpdateClassComponent,
    SearchStudentComponent,
   

  ],
  entryComponents: [EditbloodgroupComponent,ConfirmDialogComponent,UpdateStudentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,   
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule, 
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    //MatNativeDateModule,   


  ],
  providers: 
  [  {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
 
  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Optional: sets default locale

  {provide: DateAdapter,useClass:NativeDateAdapter},
  MatDatepickerModule,MatDialog,
  DatePipe,TokenStorageService,AuthService,MasterService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }


