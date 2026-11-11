import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocoDataset, CocoAnnotation, ImagemDetalhada } from '../interfaces/coco.interface';

const CATEGORY_COLORS: Record<string, string> = {
  pessoa: '#2563eb',       
  capacete: '#16a34a',     
  colete: '#d97706',       
  sem_capacete: '#dc2626' 
};

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  private readonly http = inject(HttpClient);

  readonly dataset = signal<CocoDataset | null>(null);
  
  // Guarda o ID da imagem clicada (null = modal fechado)
  readonly selectedImageId = signal<number | null>(null);

  readonly images = computed<ImagemDetalhada[]>(() => {
    const data = this.dataset();
    if (!data) return [];

    const anotacaoImages = new Map<number, CocoAnnotation[]>();
    for (const ann of data.annotations) {
      const list = anotacaoImages.get(ann.image_id) ?? [];
      list.push(ann);
      anotacaoImages.set(ann.image_id, list);
    }

    return data.images.map((img) => {
      const annotations = anotacaoImages.get(img.id) ?? [];
      return {
        ...img,
        annotations,
        annotationCount: annotations.length,
        categoryIds: Array.from(new Set(annotations.map((a) => a.category_id)))
      };
    });
  });

  // Devolve os dados completos da imagem clicada
  readonly activeModalImage = computed<ImagemDetalhada | null>(() => {
    const id = this.selectedImageId();
    if (id === null) return null;
    return this.images().find((img) => img.id === id) ?? null;
  });

  constructor() {
    this.loadDefaultDataset();
  }

  loadDefaultDataset(): void {
    this.http.get<CocoDataset>('dataset/annotations_coco.json').subscribe((data) => {
      this.dataset.set(data);
    });
  }

  getCategoryName(categoryId: number): string {
    return this.dataset()?.categories.find((c) => c.id === categoryId)?.name ?? 'Desconhecido';
  }

  getCategoryColor(categoryName: string): string {
    return CATEGORY_COLORS[categoryName] ?? '#64748b';
  }
}