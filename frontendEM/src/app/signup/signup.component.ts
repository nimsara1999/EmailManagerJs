import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  responseMessage:any;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService
    ){}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      user_password:[null,[Validators.required,Validators.pattern(GlobalConstant.passwordRegex)]],
      recip_name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      nick_name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      post_id:[null,[Validators.required,Validators.pattern(GlobalConstant.numberRegex)]],
      birthday:[null,[Validators.required,Validators.pattern(GlobalConstant.dateRegex)]],
    })
  }
  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      email:formData.email,
      user_password:formData.user_password,
      recip_name:formData.recip_name,
      nick_name:formData.nick_name,
      post_id:formData.post_id,
      birthday:formData.birthday
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstant.error)
    })
  }
}
