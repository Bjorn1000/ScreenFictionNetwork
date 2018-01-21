import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie: Movie = {
    title: '',
    description: '',
    link: '',
    author: ''

  };
  substr: string;
  afterEqual: string;

  constructor(private movieService: MovieService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  onSubmit() {
    // This converts normal youtube links to embedded youtube links before they go to firebase
    this.substr = this.movie.link;
    this.afterEqual = this.substr.substr(this.substr.indexOf('=') + 1);
    this.movie.link = 'https://www.youtube.com/embed/' + this.afterEqual;
    // this adds the user's id to the movie's author field
    this.movie.author = this.afAuth.auth.currentUser.uid;

    if (this.movie.title !== '' && this.movie.description !== '' && this.movie.link !== '') {
      this.movieService.addMovie(this.movie);
      this.movie.title = '';
      this.movie.description = '';
      this.movie.link = '';
      this.movie.author = '';
    }
  }

}
