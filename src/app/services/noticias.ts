import { Injectable, signal } from '@angular/core';

export interface Noticia {
  id: number;
  titulo: string;
  categoria: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  autor: string;
  destacada: boolean;
}

const NOTICIAS_SEED: Noticia[] = [
  {
    id: 1,
    titulo: 'Neurointerfaces: la primera prótesis que traduce pensamiento a código',
    categoria: 'Hardware',
    resumen: 'Un equipo de Kioto conectó un implante cortical a un editor de código y logró que un desarrollador escribiera funciones simples solo con la mente.',
    contenido: 'Un equipo de investigadores de la Universidad de Kioto presentó un implante cortical de bajo consumo capaz de traducir patrones de intención motora en instrucciones de programación básicas.',
    imagen: 'https://picsum.photos/seed/pixials-neuro/900/600',
    fecha: '2026-09-02',
    autor: 'Lucía Wren',
    destacada: true
  },
  {
    id: 2,
    titulo: 'Baterías de estado sólido llegan a smartphones en 2027',
    categoria: 'Movilidad',
    resumen: 'Un fabricante surcoreano confirmó producción en serie de baterías de estado sólido que duplican la autonomía sin aumentar el grosor del teléfono.',
    contenido: 'Tras cinco años de desarrollo, un fabricante surcoreano confirmó que iniciará la producción en serie de baterías de estado sólido para smartphones.',
    imagen: 'https://picsum.photos/seed/pixials-battery/900/600',
    fecha: '2026-08-28',
    autor: 'Marco Trejo',
    destacada: true
  },
  {
    id: 3,
    titulo: 'Un modelo de IA predice fallas industriales 72 horas antes',
    categoria: 'Inteligencia Artificial',
    resumen: 'La plataforma analiza vibraciones y temperatura en tiempo real para anticipar fallas mecánicas con 94% de precisión.',
    contenido: 'Una startup europea lanzó una plataforma de mantenimiento predictivo que combina sensores de vibración, temperatura y consumo eléctrico.',
    imagen: 'https://picsum.photos/seed/pixials-ai-factory/900/600',
    fecha: '2026-08-20',
    autor: 'Renata Osorio',
    destacada: true
  },
  {
    id: 4,
    titulo: 'WebGPU llega a todos los navegadores principales',
    categoria: 'Desarrollo Web',
    resumen: 'Con el soporte oficial en el último navegador pendiente, los desarrolladores ya pueden usar WebGPU sin polyfills en producción.',
    contenido: 'La adopción de WebGPU se completó este mes con el soporte oficial en el último de los navegadores principales que faltaba.',
    imagen: 'https://picsum.photos/seed/pixials-webgpu/900/600',
    fecha: '2026-08-14',
    autor: 'Iván Corzo',
    destacada: false
  },
  {
    id: 5,
    titulo: 'Drones autónomos reforestan zonas de difícil acceso en la Amazonía',
    categoria: 'Sostenibilidad',
    resumen: 'Una flota de drones sembró más de 300.000 cápsulas de semillas en laderas donde la reforestación manual era casi imposible.',
    contenido: 'Una organización ambiental en alianza con una empresa de robótica desplegó una flota de veinte drones autónomos.',
    imagen: 'https://picsum.photos/seed/pixials-drones/900/600',
    fecha: '2026-08-05',
    autor: 'Camila Andrade',
    destacada: false
  },
  {
    id: 6,
    titulo: 'Chips fotónicos: la computación con luz sale del laboratorio',
    categoria: 'Hardware',
    resumen: 'Un consorcio de universidades presentó el primer chip fotónico comercial capaz de ejecutar redes neuronales con una fracción del consumo eléctrico actual.',
    contenido: 'Un consorcio de universidades europeas y asiáticas presentó el primer chip fotónico de propósito comercial.',
    imagen: 'https://picsum.photos/seed/pixials-photonic/900/600',
    fecha: '2026-07-30',
    autor: 'Diego Falla',
    destacada: false
  },
  {
    id: 7,
    titulo: 'Un videojuego indie usa IA generativa para crear diálogos únicos por partida',
    categoria: 'Gaming',
    resumen: 'Cada personaje no jugable responde con un modelo de lenguaje ligero entrenado localmente, sin conexión a internet.',
    contenido: 'Un estudio independiente lanzó un juego de rol donde cada personaje no jugable genera sus diálogos en tiempo real.',
    imagen: 'https://picsum.photos/seed/pixials-game-ai/900/600',
    fecha: '2026-07-22',
    autor: 'Sofía Nieto',
    destacada: false
  },
  {
    id: 8,
    titulo: 'Ciudades inteligentes: semáforos que aprenden del tráfico en vivo',
    categoria: 'Ciudades Inteligentes',
    resumen: 'Una red de semáforos adaptativos redujo en 27% los tiempos de espera promedio en una de las avenidas más congestionadas de Bogotá.',
    contenido: 'Un piloto de movilidad urbana instaló semáforos con sensores de flujo vehicular y un algoritmo de coordinación.',
    imagen: 'https://picsum.photos/seed/pixials-smartcity/900/600',
    fecha: '2026-07-10',
    autor: 'Andrés Puyana',
    destacada: false
  }
];

const LS_NOTICIAS = 'pixials_noticias';
const LS_FAVORITOS = 'pixials_favoritos';

@Injectable({
  providedIn: 'root'
})
export class Noticias {
  noticias = signal<Noticia[]>(this.cargarNoticias());
  favoritos = signal<number[]>(this.cargarFavoritos());

  private cargarNoticias(): Noticia[] {
    const guardado = localStorage.getItem(LS_NOTICIAS);
    if (guardado) return JSON.parse(guardado);
    localStorage.setItem(LS_NOTICIAS, JSON.stringify(NOTICIAS_SEED));
    return NOTICIAS_SEED;
  }

  private cargarFavoritos(): number[] {
    const guardado = localStorage.getItem(LS_FAVORITOS);
    return guardado ? JSON.parse(guardado) : [];
  }

  obtenerPorId(id: number): Noticia | undefined {
    return this.noticias().find(n => n.id === id);
  }

  esFavorito(id: number): boolean {
    return this.favoritos().includes(id);
  }

  toggleFavorito(id: number): void {
    const actuales = this.favoritos();
    const nuevos = actuales.includes(id)
      ? actuales.filter(f => f !== id)
      : [...actuales, id];
    this.favoritos.set(nuevos);
    localStorage.setItem(LS_FAVORITOS, JSON.stringify(nuevos));
  }

  agregarNoticia(nueva: Omit<Noticia, 'id' | 'fecha' | 'autor' | 'destacada'>): void {
    const actuales = this.noticias();
    const nuevoId = actuales.length ? Math.max(...actuales.map(n => n.id)) + 1 : 1;
    const noticiaCompleta: Noticia = {
      ...nueva,
      id: nuevoId,
      fecha: new Date().toISOString().slice(0, 10),
      autor: 'Redacción Pixials',
      destacada: false
    };
    const actualizadas = [...actuales, noticiaCompleta];
    this.noticias.set(actualizadas);
    localStorage.setItem(LS_NOTICIAS, JSON.stringify(actualizadas));
  }

  eliminarNoticia(id: number): void {
    const actualizadas = this.noticias().filter(n => n.id !== id);
    this.noticias.set(actualizadas);
    localStorage.setItem(LS_NOTICIAS, JSON.stringify(actualizadas));
  }
}