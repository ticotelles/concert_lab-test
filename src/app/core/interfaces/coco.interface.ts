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