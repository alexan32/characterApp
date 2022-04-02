import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivedStatComponent } from './derived-stat.component';

describe('DerivedStatComponent', () => {
  let component: DerivedStatComponent;
  let fixture: ComponentFixture<DerivedStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerivedStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DerivedStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
