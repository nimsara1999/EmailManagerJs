import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const NgxUiLoaderConfig:NgxUiLoaderConfig={
  text:"Loading...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  pbColor:"red",
  bgsColor:"red",
  fgsType:SPINNER.ballSpinClockwise,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
