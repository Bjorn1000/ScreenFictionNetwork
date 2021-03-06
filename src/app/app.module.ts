import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {Sanitzier} from '../pipes/sanitizer';

import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import {MovieService} from './services/movie.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { HomeComponent } from './components/home/home.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { MovieComponent } from './components/movie/movie.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ValidateService } from './services/validate.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieComponent},
  {path: 'add-movie', component: AddMovieComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    NavbarComponent,
    AddMovieComponent,
    HomeComponent,
    MovieComponent,
    Sanitzier,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MovieService, AngularFireAuth, FlashMessagesService, ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
