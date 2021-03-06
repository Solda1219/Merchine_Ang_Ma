import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CommonFunctionService } from '../../function/commonFunction.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
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
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repass: ['', Validators.required]
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
  register() {
    if(!this.formGroup.valid) {
      this.message = "Please fill all input fields."
      return
    }
    this.message = '';
    const regiterData = this.formGroup.value;
    this.loading = true;
    this.userService.postRequest('_api/user/register', regiterData, false).subscribe(
      res => {
        this.loading = false;
        this.userService.setToken(
          {
            token: res['token'],
            userInfo: res['userInfo'],
            expiresAt: res['expiresAt'],
          }
        );
        this.userService.gotoFirstPage()
      },
      err => {
        this.loading = false;
        this.userService.handleError(err)
      }
    )
  }
}
