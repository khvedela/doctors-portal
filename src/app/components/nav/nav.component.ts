import {Component, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  state!: boolean;
  user: any;
  image: any = localStorage.getItem('photo') ? localStorage.getItem('photo') : 'helo'

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    // if(localStorage.getItem('state')) this.state = true;
  }

  logout() {
    this.auth.logout();
  }

}
