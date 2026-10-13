import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  confirmDeletion() {
    this.confirmed.emit(true);
  }

  cancelDeletion() {
    this.confirmed.emit(false);
  }
}
