import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';

export type CategoryFilter = number | null;

@Component({
  selector: 'app-image-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageFilter {
 
  readonly categoryChange = output<CategoryFilter>();


  readonly selectedCategoryId = signal<CategoryFilter>(null);
  
  readonly categories = [
    { id: null, label: 'Todas' },
    { id: 1, label: 'Pessoa' },
    { id: 2, label: 'Capacete' },
    { id: 3, label: 'Sem_capacete' },
    { id: 4, label: 'Colete' }
  ];

  selectCategory(id: CategoryFilter): void {
    if (this.selectedCategoryId() !== id) {
      this.selectedCategoryId.set(id);
      this.categoryChange.emit(id);
    }
  }
}