import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating-component',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input() totalStars: number = 0;
  @Output() onStarClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  rate(stars: number): void {
    this.onStarClicked.emit(stars);
  }
}
