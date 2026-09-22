import { Component, computed, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Noticias } from '../../services/noticias';
import { Dialog } from '../../services/dialog';

@Component({
  selector: 'app-listado',
  imports: [RouterLink, FormsModule],
  templateUrl: './listado.html',
  styleUrl: './listado.css'
})
export class Listado {
  constructor(
    private noticiasService: Noticias,
    private route: ActivatedRoute,
    private dialogService: Dialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.soloFavoritos.set(params['filtro'] === 'favoritos');
    });
  }

  soloFavoritos = signal(false);
  filtroCategoria = signal('todas');
  busqueda = signal('');
  mostrarCrud = signal(false);

  todasLasNoticias = computed(() => this.noticiasService.noticias());

  categorias = computed(() => {
    const todas = this.noticiasService.noticias().map(n => n.categoria);
    return ['todas', ...new Set(todas)];
  });

  noticiasFiltradas = computed(() => {
    let lista = this.noticiasService.noticias();

    if (this.soloFavoritos()) {
      const favs = this.noticiasService.favoritos();
      lista = lista.filter(n => favs.includes(n.id));
    }
    if (this.filtroCategoria() !== 'todas') {
      lista = lista.filter(n => n.categoria === this.filtroCategoria());
    }
    const termino = this.busqueda().trim().toLowerCase();
    if (termino) {
      lista = lista.filter(n =>
        n.titulo.toLowerCase().includes(termino) ||
        n.resumen.toLowerCase().includes(termino)
      );
    }
    return [...lista].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  });

  esFavorito(id: number): boolean {
    return this.noticiasService.esFavorito(id);
  }

  toggleFavorito(id: number) {
    this.noticiasService.toggleFavorito(id);
  }

  async eliminarNoticia(id: number) {
  const confirmado = await this.dialogService.confirmar(
    '¿Eliminar esta noticia del catálogo? Esta acción no se puede deshacer.'
  );
  if (confirmado) {
    this.noticiasService.eliminarNoticia(id);
  }
}

  form = {
    titulo: '',
    categoria: '',
    resumen: '',
    contenido: '',
    imagen: ''
  };

  async crearNoticia() {
  if (!this.form.titulo.trim() || !this.form.categoria || !this.form.resumen.trim() || !this.form.contenido.trim()) {
    await this.dialogService.avisar('Por favor completa todos los campos obligatorios.');
    return;
  }

  this.noticiasService.agregarNoticia({
    titulo: this.form.titulo.trim(),
    categoria: this.form.categoria,
    resumen: this.form.resumen.trim(),
    contenido: this.form.contenido.trim(),
    imagen: this.form.imagen.trim() || `https://picsum.photos/seed/pixials-${Date.now()}/900/600`
  });

  this.form = { titulo: '', categoria: '', resumen: '', contenido: '', imagen: '' };
}
}
