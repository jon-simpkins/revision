import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSimilarMoviesComponent } from './detail-similar-movies.component';

describe('DetailSimilarMoviesComponent', () => {
  let component: DetailSimilarMoviesComponent;
  let fixture: ComponentFixture<DetailSimilarMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSimilarMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSimilarMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
