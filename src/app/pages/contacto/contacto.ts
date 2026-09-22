import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  form = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  errores = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviado = false;

  enviar() {
    this.errores = { nombre: '', correo: '', asunto: '', mensaje: '' };
    let valido = true;

    if (!this.form.nombre.trim()) {
      this.errores.nombre = 'Escribe tu nombre.';
      valido = false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.form.correo.trim()) {
      this.errores.correo = 'Escribe tu correo electrónico.';
      valido = false;
    } else if (!regexCorreo.test(this.form.correo.trim())) {
      this.errores.correo = 'Ingresa un correo válido (ej: nombre@dominio.com).';
      valido = false;
    }

    if (!this.form.asunto) {
      this.errores.asunto = 'Selecciona un asunto.';
      valido = false;
    }

    if (this.form.mensaje.trim().length < 10) {
      this.errores.mensaje = 'Escribe un mensaje de al menos 10 caracteres.';
      valido = false;
    }

    if (!valido) {
      this.enviado = false;
      return;
    }

    // Simulación de envío (no hay backend en esta entrega)
    this.enviado = true;
    this.form = { nombre: '', correo: '', asunto: '', mensaje: '' };
  }
}
