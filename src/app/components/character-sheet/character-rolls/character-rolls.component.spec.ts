import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRollsComponent } from './character-rolls.component';

describe('CharacterRollsComponent', () => {
  let component: CharacterRollsComponent;
  let fixture: ComponentFixture<CharacterRollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterRollsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterRollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
