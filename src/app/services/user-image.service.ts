import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  constructor() { }

  private imageSource = new BehaviorSubject<string | null>(null);
  image$ = this.imageSource.asObservable();

  setImage(image: string) {
    this.imageSource.next(image);
  }
}
