import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSessionHistoryComponent } from './show-session-history.component';

describe('ShowSessionHistoryComponent', () => {
  let component: ShowSessionHistoryComponent;
  let fixture: ComponentFixture<ShowSessionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSessionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSessionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
