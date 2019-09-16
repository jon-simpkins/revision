import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatCardListComponent } from './beat-card-list.component';

describe('BeatCardListComponent', () => {
  let component: BeatCardListComponent;
  let fixture: ComponentFixture<BeatCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
