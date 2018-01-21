import { Injectable, Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizer'
})
@Injectable()
export class Sanitzier implements PipeTransform {
    constructor(private dom: DomSanitizer) {

    }
    transform(value, args) {
        return this.dom.bypassSecurityTrustResourceUrl(value);
    }
}
