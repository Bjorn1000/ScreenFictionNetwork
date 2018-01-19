import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';
import { OnDestroy, OnChanges, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import {Subscription} from 'rxjs/Subscription';


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
  constructor(public movieService: MovieService) { }

  ngOnInit() {
    console.log('test');
    this.subscription = this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
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
    console.log('get out');
    this.subscription.unsubscribe();
  }

}
