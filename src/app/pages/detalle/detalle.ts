import { Component, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticias } from '../../services/noticias';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {
  constructor(
    private route: ActivatedRoute,
    private noticiasService: Noticias
  ) {}

  private id = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    return idParam ? Number(idParam) : 0;
  });

  noticia = computed(() => this.noticiasService.obtenerPorId(this.id()));

  relacionadas = computed(() => {
    const actual = this.noticia();
    if (!actual) return [];
    return this.noticiasService.noticias()
      .filter(n => n.categoria === actual.categoria && n.id !== actual.id)
      .slice(0, 3);
  });

  esFavorito(): boolean {
    const actual = this.noticia();
    return actual ? this.noticiasService.esFavorito(actual.id) : false;
  }

  toggleFavorito(): void {
    const actual = this.noticia();
    if (actual) this.noticiasService.toggleFavorito(actual.id);
  }
}