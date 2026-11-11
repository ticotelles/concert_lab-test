import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { ImagemDetalhada } from '../../../../core/interfaces/coco.interface';
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
  readonly image = input.required<ImagemDetalhada>();
  readonly close = output<void>();
}
