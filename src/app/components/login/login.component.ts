import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
    if (this.afAuth.auth.currentUser == null) {
      console.log('no session');
    } else {
      // sets up session item
      sessionStorage.setItem('userId', this.afAuth.auth.currentUser.uid);
    }
    this.router.navigate(['/']);
  }
}
