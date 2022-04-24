import {Component, OnInit} from '@angular/core';
import {Firestore} from "@angular/fire/firestore";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public data: any = []
  public loading: any = true

  visible: boolean = true;

  constructor(private firestore: Firestore, private auth: AuthService) {
    this.getData();
  }

  getData() {
    // this.auth.getData('Diseases')
    //   .then((response: any) => {
    //   this.data = [...response.docs.map((item: any) => {
    //     this.loading = false
    //     return {...item.data(), id: item.id}
    //   })]
    // });
  }

  ngOnInit(): void {

  }

}
