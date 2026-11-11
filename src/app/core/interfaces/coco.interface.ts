export interface CocoDataset {
  images: CocoImage[];
  annotations: CocoAnnotation[];
  categories: CocoCategory[];
}

export interface CocoImage {
  id: number;
  width: number;
  height: number;
  file_name: string;
}

export interface CocoAnnotation {
  id: number;
  image_id: number;
  category_id: number;
  bbox: [number, number, number, number];
  area: number;
  iscrowd: number;
}

export interface CocoCategory {
  id: number;
  name: 'pessoa' | 'capacete' | 'colete' | 'sem_capacete' | string;
}

// Adicione estas abaixo para a galeria e estatísticas:
// export interface EnrichedImage extends CocoImage {
//   annotations: CocoAnnotation[];
//   annotationCount: number;
//   categoryIds: number[];
// }

export interface ImagemDetalhada extends CocoImage {
  annotations: CocoAnnotation[];
  annotationCount: number;
  categoryIds: number[];
}

export interface CategoryStat {
  id: number;
  name: string;
  count: number;
  color: string;
}

export interface DatasetStats {
  totalImages: number;
  totalAnnotations: number;
  averagePerImage: number;
  categoriesCount: CategoryStat[];
}