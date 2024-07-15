import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingExercisesComponent } from './typing-exercises.component';

describe('TypingExercisesComponent', () => {
  let component: TypingExercisesComponent;
  let fixture: ComponentFixture<TypingExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingExercisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
