import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { EnrichedImage } from '../../../../core/interfaces/coco.interface';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGallery {
  readonly images = input.required<EnrichedImage[]>();
}
