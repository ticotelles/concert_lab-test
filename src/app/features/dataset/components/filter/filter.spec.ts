import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFilter } from './filter';

describe('ImageFilter', () => {
  let component: ImageFilter;
  let fixture: ComponentFixture<ImageFilter>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
