import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Noticias } from '../../services/noticias';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle {
  private route = inject(ActivatedRoute);
  private noticiasService = inject(Noticias);

  // Se lee el parámetro de la ruta como un signal que se actualiza solo.
  // Así, al hacer clic en una noticia relacionada (misma ruta, otro :id),
  // la vista cambia aunque Angular reutilice el componente.
  private id = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')) || 0)),
    { initialValue: 0 }
  );

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

