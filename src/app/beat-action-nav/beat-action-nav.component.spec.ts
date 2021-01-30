import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatActionNavComponent } from './beat-action-nav.component';

describe('BeatActionNavComponent', () => {
  let component: BeatActionNavComponent;
  let fixture: ComponentFixture<BeatActionNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatActionNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatActionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
