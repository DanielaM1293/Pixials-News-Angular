import { Component } from '@angular/core';
import { Dialog } from '../../services/dialog';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class DialogComponent {
  constructor(public dialogService: Dialog) {}

  responder(valor: boolean) {
    this.dialogService.responder(valor);
  }
}
