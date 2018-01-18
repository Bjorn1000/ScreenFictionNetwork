import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MovieService {
  moviesCollection: AngularFirestoreCollection<Movie>;
  movies: Observable<Movie[]>;
  movieDoc: AngularFirestoreDocument<Movie>;

  constructor(public afs: AngularFirestore) {
    // this.movies = this.afs.collection('movies').valueChanges();

    this.moviesCollection = this.afs.collection('movies', ref => ref.orderBy('title', 'asc'));

    this.movies = this.moviesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Movie;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
  queryTester(id) {
    console.log(id);
    this.moviesCollection = this.afs.collection('movies', ref => {
      return ref.where('id', '==', id);
    });
    return this.movies = this.moviesCollection.valueChanges();
  }

  getMovies() {
    return this.movies;
  }

  addMovie(movie: Movie) {
    this.moviesCollection.add(movie);
  }

  deleteMovie(movie: Movie) {
    this.movieDoc = this.afs.doc(`movies/${movie.id}`);
    this.movieDoc.delete();
  }

  updateMovie(movie: Movie) {
    this.movieDoc = this.afs.doc(`movies/${movie.id}`);
    this.movieDoc.update(movie);
  }

}

