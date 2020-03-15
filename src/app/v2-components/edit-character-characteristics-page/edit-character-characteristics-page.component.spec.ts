import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacterCharacteristicsPageComponent } from './edit-character-characteristics-page.component';

describe('EditCharacterCharacteristicsPageComponent', () => {
  let component: EditCharacterCharacteristicsPageComponent;
  let fixture: ComponentFixture<EditCharacterCharacteristicsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCharacterCharacteristicsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCharacterCharacteristicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
