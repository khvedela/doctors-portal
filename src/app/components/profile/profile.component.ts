import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {doc, getDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  image: any = localStorage.getItem('photo') ? localStorage.getItem('photo') : 'helo'
  data: any;

  constructor(private auth: AuthService, private router: Router) { }

  getData() {
    this.data = this.auth.getData('test@gmail.com')
    console.log(this.data)
  }

  ngOnInit(): void {
    this.getData()
  }

  navigate() {
    this.router.navigate(['user'])
  }

}
