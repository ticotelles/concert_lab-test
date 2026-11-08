import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocoDataset, CocoAnnotation, EnrichedImage } from '../interfaces/coco.interface';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  private readonly http = inject(HttpClient);

  // Guarda o JSON carregado
  readonly dataset = signal<CocoDataset | null>(null);

  // Prepara a lista de imagens já com a contagem de anotações de cada uma
  readonly images = computed<EnrichedImage[]>(() => {
    const data = this.dataset();
    if (!data) return [];

    // Agrupa anotações por image_id
    const annsByImage = new Map<number, CocoAnnotation[]>();
    for (const ann of data.annotations) {
      const list = annsByImage.get(ann.image_id) ?? [];
      list.push(ann);
      annsByImage.set(ann.image_id, list);
    }

    // Retorna cada imagem com sua lista e contagem de anotações
    return data.images.map((img) => {
      const annotations = annsByImage.get(img.id) ?? [];
      return {
        ...img,
        annotations,
        annotationCount: annotations.length,
        categoryIds: Array.from(new Set(annotations.map((a) => a.category_id)))
      };
    });
  });

  constructor() {
    this.loadDefaultDataset();
  }

  loadDefaultDataset(): void {
    this.http.get<CocoDataset>('dataset/annotations_coco.json').subscribe((data) => {
      this.dataset.set(data);
    });
  }
}