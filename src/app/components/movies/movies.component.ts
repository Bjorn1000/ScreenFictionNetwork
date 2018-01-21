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

  constructor(public movieService: MovieService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.subscription = this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
    if (this.afAuth.auth.currentUser == null) {
      this.user = 'no user';
      console.log(this.user);
    } else {
      this.user = this.afAuth.auth.currentUser.uid;
      console.log(this.user);
    }

  }
  deleteMovie(event, movie) {
    this.clearState();
    this.movieService.deleteMovie(movie);
  }

  editMovie(event, movie) {
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
