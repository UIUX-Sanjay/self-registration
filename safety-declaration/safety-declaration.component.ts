import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface QuestionItem {
  text: string;
  answer: string | null;
}

@Component({
  selector: 'app-safety-declaration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './safety-declaration.component.html',
  styleUrl: './safety-declaration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyDeclarationComponent {
  private readonly fb = inject(FormBuilder);
  readonly logoUrl = '/assets/calm 1.png';
  readonly illustrationUrl = '/assets/safety-declaration.png';

  readonly options = ['YES', 'NO', 'N/A', 'UNKNOWN'] as const;

  questions: QuestionItem[] = [
    {
      text: 'CALMS: Have you been in close contact with anyone who has been confirmed with having the COVID 19 virus???',
      answer: null,
    },
    {
      text: 'CALMS: Do you have any of the following typical symptoms of COVID 19; FEVER High Temperature Persistent coughing or Breathing Difficulties/Shortness breath? If yes, please provide covid test report.',
      answer: null,
    },
    {
      text: 'CALMS: Do you have any of the following typical symptoms of COVID 19; FEVER High Temperature Persistent coughing or Breathing Difficulties/Shortness breath? If yes, please provide covid test report.',
      answer: null,
    },
    {
      text: 'CALMS: Have you traveled internationally in the last 14 days?',
      answer: null,
    },
  ];

  readonly form = this.fb.group({
    answers: this.fb.array(this.questions.map((q) => this.fb.control(q.answer))),
  });
  constructor() {}

  @ViewChild('questionsScroll', { static: false })
  questionsScroll?: ElementRef<HTMLDivElement>;

  modalType: 'required' | 'incorrect' | null = null;

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  selectOption(index: number, value: string): void {
    this.questions[index].answer = value;
    this.answers.at(index).setValue(value);
  }

  get hasAnyAnswer(): boolean {
    return this.questions.some((q) => q.answer !== null);
  }

  get allAnswered(): boolean {
    return this.questions.every((q) => q.answer !== null);
  }

  openModal(type: 'required' | 'incorrect'): void {
    this.modalType = type;
  }

  closeModal(): void {
    this.modalType = null;
  }

  handleContinue(): void {
    const hasIncorrect = this.questions.some(
      (q) => (q.answer ?? '').toUpperCase() === 'YES'
    );
    if (hasIncorrect) {
      this.openModal('incorrect');
      return;
    }

    if (!this.allAnswered) {
      this.openModal('required');
      return;
    }
  }

  reviewAnswers(): void {
    this.closeModal();
    this.questionsScroll?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  rewatchSafetyBrief(): void {
    this.closeModal();
  }
}
