import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';
import { OnDestroy, OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';
import {Subscription} from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: Movie[];
  editState: boolean;
  movieToEdit: Movie;
  subscription: Subscription;
  user: string;
  author: string;
  substr: string;
  afterEqual: string;

  constructor(public movieService: MovieService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.subscription = this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
    console.log(sessionStorage.getItem('userId'));
    if (this.afAuth.auth.currentUser == null) {
      this.user = 'no user';
      this.user = sessionStorage.getItem('userId');
    } else {
      this.user = this.afAuth.auth.currentUser.uid;
      sessionStorage.setItem('userId', this.afAuth.auth.currentUser.uid);
    }



  }
  deleteMovie(event, movie) {
    this.clearState();
    this.movieService.deleteMovie(movie);
  }

  editMovie(event, movie) {
    /*
    this.substr = movie.link;
    this.afterEqual = this.substr.substr(this.substr.indexOf('=') + 1);
    console.log(this.afterEqual);
    if (this.afterEqual.includes('&')) {
      this.afterEqual =  this.afterEqual.substr(0, this.afterEqual.indexOf('&'));
    }
    movie.link = 'https://www.youtube.com/embed/' + this.afterEqual;
    movie.thumbnail = 'https://img.youtube.com/vi/' + this.afterEqual + '/default.jpg';
    */
    this.editState = true;
    this.movieToEdit = movie;
  }

  updateMovie(movie: Movie) {
    this.movieService.updateMovie(movie);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.movieToEdit = null;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
