import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacterSummaryPageComponent } from './edit-character-summary-page.component';

describe('EditCharacterSummaryPageComponent', () => {
  let component: EditCharacterSummaryPageComponent;
  let fixture: ComponentFixture<EditCharacterSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCharacterSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCharacterSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
