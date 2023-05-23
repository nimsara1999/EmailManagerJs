import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'; 
import { SignupComponent } from '../signup/signup.component';

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
  dialogConfig.width="550px";
  dialogConfig.height="150px";
  this.dialog.open(SignupComponent,dialogConfig);
}

}
