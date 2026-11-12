import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { CocoCategory, ImagemDetalhada } from '../../../../core/interfaces/coco.interface';
import { ImageFilter, CategoryFilter } from '../filter/filter';
import { Statistics } from '../statistics/statistics';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [ImageFilter, Statistics],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGallery {
  readonly images = input.required<ImagemDetalhada[]>();
  readonly selectImage = output<number>();
  readonly categories = input<CocoCategory[]>([]);
  readonly selectedCategoryId = signal<CategoryFilter>(null);

  // Filtra as imagens sem recriar referências desnecessárias
  readonly filteredImages = computed(() => {
    const categoryId = this.selectedCategoryId();
    const allImages = this.images();
    const classesImage = allImages.map(img => img.categoryIds)

 

    if (categoryId === null) {
      return allImages;
    }
  
    return allImages.filter(img => img.categoryIds?.includes(categoryId));


  });

  onCategoryChange(categoryId: CategoryFilter): void {
    this.selectedCategoryId.set(categoryId);
  }
}