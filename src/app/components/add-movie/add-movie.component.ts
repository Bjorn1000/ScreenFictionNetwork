import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie: Movie = {
    title: '',
    description: '',
    link: ''

  };
  substr: string;
  afterComma: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.substr = this.movie.link;
    this.afterComma = this.substr.substr(this.substr.indexOf('=') + 1);
    this.movie.link = 'https://www.youtube.com/embed/' + this.afterComma;
    if (this.movie.title !== '' && this.movie.description !== '' && this.movie.link !== '') {
      this.movieService.addMovie(this.movie);
      this.movie.title = '';
      this.movie.description = '';
      this.movie.link = '';
    }
  }

}
