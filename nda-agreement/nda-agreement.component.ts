import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-nda-agreement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nda-agreement.component.html',
  styleUrl: './nda-agreement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NdaAgreementComponent {
  private readonly fb = inject(FormBuilder);

  readonly logoUrl = '/assets/calm 1.png';
  readonly illustrationUrl = '/assets/sign.png';

  readonly form = this.fb.group({
    currentDate: ['', Validators.required],
    terms: [
      'The Receiving Party agrees that all confidential information shared by the Disclosing Party, including but not limited to business plans, project details, designs, technical data, source code, client information, financial data, and other proprietary materials, shall be kept strictly confidential and shall not be disclosed, copied, or shared with any third party without prior written consent. The Receiving Party shall use the confidential information only for the purpose of evaluating or performing the agreed project or business relationship. This obligation of confidentiality will remain in effect for a period of [2/3/5] years from the date of disclosure. Any misuse, unauthorized disclosure,',
      Validators.required,
    ],
  });

  showSignatureModal = false;

  @ViewChild('signatureCanvas', { static: false })
  signatureCanvas?: ElementRef<HTMLCanvasElement>;

  private drawing = false;

  openSignature(): void {
    this.showSignatureModal = true;
    setTimeout(() => this.resizeCanvas(), 0);
  }

  closeSignature(): void {
    this.showSignatureModal = false;
  }

  submitSignature(): void {
    this.closeSignature();
  }

  startDraw(event: MouseEvent | TouchEvent): void {
    const canvas = this.signatureCanvas?.nativeElement;
    if (!canvas) return;
    this.drawing = true;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#222222';
    const { x, y } = this.getPoint(canvas, event);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  draw(event: MouseEvent | TouchEvent): void {
    if (!this.drawing) return;
    const canvas = this.signatureCanvas?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { x, y } = this.getPoint(canvas, event);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  endDraw(): void {
    this.drawing = false;
  }

  private getPoint(canvas: HTMLCanvasElement, event: MouseEvent | TouchEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    const touch = event.touches[0] || event.changedTouches[0];
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }

  private resizeCanvas(): void {
    const canvas = this.signatureCanvas?.nativeElement;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
}
