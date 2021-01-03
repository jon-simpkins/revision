import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatProseEditComponent } from './beat-prose-edit.component';

describe('BeatProseEditComponent', () => {
  let component: BeatProseEditComponent;
  let fixture: ComponentFixture<BeatProseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatProseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatProseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
