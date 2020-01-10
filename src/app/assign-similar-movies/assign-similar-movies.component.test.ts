import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSimilarMoviesComponent } from './assign-similar-movies.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('AssignSimilarMoviesComponent', () => {
  let component: AssignSimilarMoviesComponent;
  let fixture: ComponentFixture<AssignSimilarMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSimilarMoviesComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSimilarMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
