import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLinkBtnComponent } from './smart-link-btn.component';

describe('SmartLinkBtnComponent', () => {
  let component: SmartLinkBtnComponent;
  let fixture: ComponentFixture<SmartLinkBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartLinkBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartLinkBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
