import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-component',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  @Input() movie: any = {};
  @Output() onStarClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  onStarClickedEvent(event: any): void {
    this.onStarClicked.emit(event);
  }
}
