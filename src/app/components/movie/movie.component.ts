import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/movie';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[];
  id: any;

  constructor(public movieService: MovieService,
  private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.movieService.queryTester(this.id).subscribe(movies => {
      console.log(movies);
      this.movies = movies;
    });
  }
}
