import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  editState: boolean;
  movieToEdit: Movie;
  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe(movies => {
      console.log(movies);
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

}
