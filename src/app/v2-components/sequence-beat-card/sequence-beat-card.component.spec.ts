import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceBeatCardComponent } from './sequence-beat-card.component';

describe('SequenceBeatCardComponent', () => {
  let component: SequenceBeatCardComponent;
  let fixture: ComponentFixture<SequenceBeatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceBeatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceBeatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
