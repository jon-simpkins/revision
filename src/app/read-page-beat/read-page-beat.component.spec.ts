import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPageBeatComponent } from './read-page-beat.component';

describe('ReadPageBeatComponent', () => {
  let component: ReadPageBeatComponent;
  let fixture: ComponentFixture<ReadPageBeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadPageBeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPageBeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
