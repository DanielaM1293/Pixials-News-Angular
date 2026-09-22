import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Noticias } from '../../services/noticias';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private noticiasService: Noticias) {}

  totalFavoritos = computed(() => this.noticiasService.favoritos().length);

  menuAbierto = signal(false);

  toggleMenu() {
    this.menuAbierto.set(!this.menuAbierto());
  }

  cerrarMenu() {
    this.menuAbierto.set(false);
  }
}
