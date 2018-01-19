import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[];
  constructor(
    public movieService: MovieService,
    // declared in constructor for the login method so that the picture does more than look pretty
    public afAuth: AngularFireAuth,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });
  }
  // login method for google picture
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
