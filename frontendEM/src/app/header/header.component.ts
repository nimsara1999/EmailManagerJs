import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog:MatDialog){}
ngOnInit(): void {
  throw new Error('Method not implemented.');
}
  
signupAction() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus=false;
  dialogConfig.backdropClass="blurBackdrop";
  dialogConfig.panelClass="dialogPanel";
  this.dialog.open(SignupComponent,dialogConfig);
}

forgotPasswordAction(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus=false;
  dialogConfig.backdropClass="blurBackdrop";
  dialogConfig.panelClass="dialogPanel";
  this.dialog.open(ForgotPasswordComponent,dialogConfig);
}
}