import { Injectable, signal } from '@angular/core';

export interface DialogState {
  tipo: 'confirm' | 'alert';
  mensaje: string;
  resolver: (valor: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class Dialog {
  estado = signal<DialogState | null>(null);

  confirmar(mensaje: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.estado.set({
        tipo: 'confirm',
        mensaje,
        resolver: resolve
      });
    });
  }

  avisar(mensaje: string): Promise<void> {
    return new Promise((resolve) => {
      this.estado.set({
        tipo: 'alert',
        mensaje,
        resolver: () => resolve()
      });
    });
  }

  responder(valor: boolean) {
    const actual = this.estado();
    if (actual) {
      actual.resolver(valor);
      this.estado.set(null);
    }
  }
}
