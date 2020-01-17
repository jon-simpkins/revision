import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarMovieListComponent } from './similar-movie-list.component';

describe('SimilarMovieListComponent', () => {
  let component: SimilarMovieListComponent;
  let fixture: ComponentFixture<SimilarMovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarMovieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
