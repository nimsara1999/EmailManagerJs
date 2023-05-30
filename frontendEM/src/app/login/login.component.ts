import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/global-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService
    ){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      user_password:[null,[Validators.required,Validators.pattern(GlobalConstant.passwordRegex)]]
    });
}

handleSubmit(){
  this.ngxService.start();
  var formData = this.loginForm.value;
  var data ={
    email:formData.email,
    user_password:formData.user_password
  }
  this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token',response.token);
      this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error);
    })
}
}
