import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
    console.log(123);
  }

}
