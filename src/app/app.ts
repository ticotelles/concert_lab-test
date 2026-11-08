import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageGallery } from './features/dataset/components/image-gallery/image-gallery';
import { DatasetService } from './core/services/dataset.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageGallery],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Concert-Test');
  readonly datasetService = inject(DatasetService);
}
