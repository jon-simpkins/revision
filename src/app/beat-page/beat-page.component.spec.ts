import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatPageComponent } from './beat-page.component';

describe('BeatPageComponent', () => {
  let component: BeatPageComponent;
  let fixture: ComponentFixture<BeatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
