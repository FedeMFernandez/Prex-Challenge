import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-input-component',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent {

  @ViewChild('inputFile') inputFile: ElementRef<HTMLInputElement> | undefined;

  @Input() imageSource: string = '';
  @Output() onImageChanged: EventEmitter<File | null> = new EventEmitter();

  selectedFile: File | null = null;

  get showImage(): boolean {
    return !this.selectedFile && !!this.imageSource; 
  }

  constructor() { }

  openSearchDialogEventHandler(event: any) {
    this.inputFile?.nativeElement.click();
  }

  onFileChangeEventHandler(event: any): void {
    if (!event.target.files.length) { return; }

    this.selectedFile = event.target.files[0];
    this.onImageChanged.emit(this.selectedFile);
  }

  reset(): void {
    this.selectedFile = null;
  }
}
