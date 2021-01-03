import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatNavComponent } from './beat-nav.component';

describe('BeatNavComponent', () => {
  let component: BeatNavComponent;
  let fixture: ComponentFixture<BeatNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
