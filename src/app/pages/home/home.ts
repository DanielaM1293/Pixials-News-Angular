import { Component, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticias } from '../../services/noticias';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  constructor(private noticiasService: Noticias) {}

  destacadas = computed(() =>
    this.noticiasService.noticias().filter(n => n.destacada)
  );

  recientes = computed(() =>
    [...this.noticiasService.noticias()]
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 3)
  );

  carIndex = signal(0);
  private timer: any;

  ngOnInit() {
    this.timer = setInterval(() => this.siguiente(), 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  siguiente() {
    const total = this.destacadas().length;
    this.carIndex.set((this.carIndex() + 1) % total);
  }

  anterior() {
    const total = this.destacadas().length;
    this.carIndex.set((this.carIndex() - 1 + total) % total);
  }

  irA(i: number) {
    this.carIndex.set(i);
  }

  esFavorito(id: number): boolean {
    return this.noticiasService.esFavorito(id);
  }

  toggleFavorito(id: number) {
    this.noticiasService.toggleFavorito(id);
  }
}