import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  formGroup: FormGroup;
  formGroupP: FormGroup;
  message = '';
  currentLanguage = "english";
  constructor(
    private userService: UserService,
    private _formBuilder: FormBuilder,
    public cf:CommonFunctionService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formGroupP = this._formBuilder.group({
      phone: ['', Validators.required],
      role: ['']
    });
    localStorage.setItem('language', 'english')
  }
  //LanguageChagePart
  changeLang(language: string) {
    this.currentLanguage = language;
    localStorage.setItem('language', language)
  }
  passwordReset() {
    this.formGroupP.value.role = this.formGroup.value.role;
    this.userService.postRequest("_api/resetPassword", this.formGroupP.value, false).subscribe(
      res => {
      },
      err => {
      }
    )
  }
  login() {
    if(!this.formGroup.valid) {
      this.message = "Username and Password must be valid."
      return
    }
    this.message = '';
    const loginData = this.formGroup.value;
    this.loading = true;
    this.userService.postRequest('api/Authentication/authenticate', loginData, false).subscribe(
      res => {
        
        console.log(res)

        this.loading = false;
        // if (res.status == 200) {
          this.userService.setToken(
            // {
            //   token: res['token'],
            //   userInfo: res['userInfo'],
            //   expiresAt: res['expiresAt'],
            // }
            {
              token: "token",
              userInfo: "userInfo",
              expiresAt: "expireAt",
            }
          );
          this.userService.gotoFirstPage()
        // }
      },
      err => {
        console.log(err)
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
}
