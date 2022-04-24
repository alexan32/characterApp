import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollEditorComponent } from './roll-editor.component';

describe('RollEditorComponent', () => {
  let component: RollEditorComponent;
  let fixture: ComponentFixture<RollEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
