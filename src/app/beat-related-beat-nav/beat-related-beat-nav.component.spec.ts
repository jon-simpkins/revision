import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatRelatedBeatNavComponent } from './beat-related-beat-nav.component';

describe('BeatRelatedBeatNavComponent', () => {
  let component: BeatRelatedBeatNavComponent;
  let fixture: ComponentFixture<BeatRelatedBeatNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatRelatedBeatNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatRelatedBeatNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
