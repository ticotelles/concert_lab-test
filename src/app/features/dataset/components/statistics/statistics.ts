import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { ImagemDetalhada, CocoCategory } from '../../../../core/interfaces/coco.interface';

export interface CategoryCount {
  name: string;
  count: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Statistics {
  readonly images = input.required<ImagemDetalhada[]>();
  readonly categories = input<CocoCategory[]>([]);


  readonly stats = computed(() => {
    const imgList = this.images();
    const catList = this.categories();



    const totalImages = imgList.length;
    const totalAnnotations = imgList.reduce((acc, img) => acc + (img.annotationCount || 0), 0);
    const averagePerImage = totalImages > 0 ? (totalAnnotations / totalImages).toFixed(1) : '0';


    const totalPorClasses = new Map<number, number>();

    for(const img of imgList) {
      if(img.categoryIds) {
        for(const catId of img.categoryIds) {
          const currentCount = totalPorClasses.get(catId) || 0;
          totalPorClasses.set(catId, currentCount + 1);
        }
      }
    }




    const categoryCountsMap = new Map<number, number>();

    for (const img of imgList) {
      if (img.annotations) {
        for (const ann of img.annotations) {
          const currentCount = categoryCountsMap.get(ann.category_id) || 0;
          categoryCountsMap.set(ann.category_id, currentCount + 1);
        }
      }
    }


    const categoriesCount: CategoryCount[] = catList.map(cat => ({
      name: cat.name,
      count: categoryCountsMap.get(cat.id) || 0
    }));

    return {
      totalImages,
      totalAnnotations,
      averagePerImage,
      categoriesCount,
      totalPorClasses
    };
  });
}