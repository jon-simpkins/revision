import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrainstormTemplatePageComponent } from './brainstorm-template-page.component';

describe('BrainstormTemplatePageComponent', () => {
  let component: BrainstormTemplatePageComponent;
  let fixture: ComponentFixture<BrainstormTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrainstormTemplatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrainstormTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
