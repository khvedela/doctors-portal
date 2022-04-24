import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }

  login() {
    this.auth.login(this.signInForm.value.email, this.signInForm.value.password)
  }

}
