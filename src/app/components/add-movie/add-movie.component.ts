import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {ValidateService} from '../../services/validate.service';


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

  constructor(private movieService: MovieService, private validateService: ValidateService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  onSubmit() {
    // This converts normal youtube links to embedded youtube links before they go to firebase
    // also converts normal youtube links to thumbnail urls as well
    this.substr = this.movie.link;
    this.validateService.validateLink(this.substr);
    this.afterEqual = this.substr.substr(this.substr.indexOf('=') + 1);
    console.log(this.afterEqual);
    if (this.afterEqual.includes('&')) {
      this.afterEqual =  this.afterEqual.substr(0, this.afterEqual.indexOf('&'));
    }
    this.movie.link = 'https://www.youtube.com/embed/' + this.afterEqual;
    this.movie.thumbnail = 'https://img.youtube.com/vi/' + this.afterEqual + '/default.jpg';
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
