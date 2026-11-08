import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { EnrichedImage } from '../../../../core/interfaces/coco.interface';
import { DatasetService } from '../../../../core/services/dataset.service';

@Component({
  selector: 'app-annotation-modal',
  imports: [],
  templateUrl: './annotation-modal.html',
  styleUrl: './annotation-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationModal {
  readonly datasetService = inject(DatasetService);
  readonly image = input.required<EnrichedImage>();
  readonly close = output<void>();
}
