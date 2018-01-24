import { Injectable } from '@angular/core';
import { youtubeValidator } from 'youtube-validator';

@Injectable()
export class ValidateService {

  constructor() { }
  validateRegister(user) {
    if  (user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    return pattern.test(email.toLowerCase());
  }

  validateLink(link) {
    console.log('help');
  }

}
