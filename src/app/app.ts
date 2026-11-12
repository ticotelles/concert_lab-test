import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { ImageGallery } from './features/dataset/components/image-gallery/image-gallery';
import { DatasetService } from './core/services/dataset.service';
import { AnnotationModal } from './features/dataset/components/annotation-modal/annotation-modal';



@Component({
  selector: 'app-root',
  imports: [ImageGallery, AnnotationModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Concert-Test');
  readonly datasetService = inject(DatasetService);
}
