import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { SignupComponent } from '../signup/signup.component';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

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
  dialogConfig.width="425px";
  dialogConfig.height="auto";
  dialogConfig.autoFocus= true;
  dialogConfig.backdropClass="blurbackdrop";
  this.dialog.open(SignupComponent,dialogConfig);
}

}
