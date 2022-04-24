import { Injectable } from '@angular/core';
import {collection, Firestore, getDocs, getFirestore,} from "@angular/fire/firestore";
import {Auth, signInWithEmailAndPassword, getAuth, signOut} from '@angular/fire/auth';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  db = getFirestore();

  constructor(private authFire: Auth,
              private firestore: Firestore,
              private route: Router) {
  }

  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(this.authFire, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        console.log(userCredential.user);
        this.route.navigate(['']);
        localStorage.setItem('state', 'true')
      })
  }


  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('state');
      this.route.navigate(['login']);
    })
  }
  getData(path: string) {
    const data = collection(this.db, path)
    let dataObject: any = []
    getDocs(data)
      .then((res: any) => {
        res.docs.forEach((user: any) => {
          dataObject.push({...user.data(), id: user.id})
        })
      })

    return dataObject
  }
}
