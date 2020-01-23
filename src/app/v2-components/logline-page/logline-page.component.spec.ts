import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoglinePageComponent } from './logline-page.component';

describe('LoglinePageComponent', () => {
  let component: LoglinePageComponent;
  let fixture: ComponentFixture<LoglinePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoglinePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoglinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
