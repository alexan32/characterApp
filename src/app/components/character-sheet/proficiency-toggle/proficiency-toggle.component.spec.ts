import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyToggleComponent } from './proficiency-toggle.component';

describe('ProficiencyToggleComponent', () => {
  let component: ProficiencyToggleComponent;
  let fixture: ComponentFixture<ProficiencyToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProficiencyToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProficiencyToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
