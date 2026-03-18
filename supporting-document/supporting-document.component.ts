import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UploadCardState {
  id: string;
  title: string;
  subtitle: string;
  status: 'idle' | 'uploading' | 'uploaded';
  fileName?: string;
  fileSize?: string;
  progress: number;
  error: string;
}

@Component({
  selector: 'app-supporting-document',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporting-document.component.html',
  styleUrl: './supporting-document.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SupportingDocumentComponent implements OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  readonly logoUrl = '/assets/calm 1.png';
  readonly illustrationUrl = '/assets/doc.png';

  readonly maxSize = 2 * 1024 * 1024;

  cards: UploadCardState[] = [
    {
      id: 'work-permit',
      title: 'Work permit',
      subtitle: 'Max size: 2MB (.pdf)',
      status: 'idle',
      progress: 0,
      error: '',
    },
    {
      id: 'nric',
      title: 'NRIC',
      subtitle: 'Max size: 2MB (.pdf)',
      status: 'idle',
      progress: 0,
      error: '',
    },
    {
      id: 'aadhaar',
      title: 'Aadhaar Card',
      subtitle: 'Max size: 2MB (.pdf)',
      status: 'idle',
      progress: 0,
      error: '',
    },
  ];

  private intervals = new Map<string, number>();

  triggerFile(input: HTMLInputElement): void {
    input.value = '';
    input.click();
  }

  handleFileUpload(event: Event, card: UploadCardState): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    card.error = '';

    if (file.type !== 'application/pdf') {
      card.error = 'Only PDF files allowed.';
      input.value = '';
      return;
    }

    if (file.size > this.maxSize) {
      card.error = 'File must be 2MB or smaller.';
      input.value = '';
      return;
    }

    card.status = 'uploading';
    card.fileName = file.name;
    card.fileSize = this.formatSize(file.size);
    card.progress = 0;
    this.cdr.markForCheck();

    this.animateProgress(card.id, () => {
      card.status = 'uploaded';
      this.cdr.markForCheck();
    });
  }

  resetCard(card: UploadCardState): void {
    card.status = 'idle';
    card.fileName = undefined;
    card.fileSize = undefined;
    card.progress = 0;
    card.error = '';
    this.cdr.markForCheck();
  }

  displayTitle(card: UploadCardState): string {
    if (card.status === 'uploaded' && card.fileName) {
      return card.fileName.replace(/\\.pdf$/i, '');
    }
    return card.title;
  }

  ngOnDestroy(): void {
    this.intervals.forEach((intervalId) => window.clearInterval(intervalId));
    this.intervals.clear();
  }

  private formatSize(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(0)}MB`;
  }

  private animateProgress(cardId: string, onComplete: () => void): void {
    const existing = this.intervals.get(cardId);
    if (existing) window.clearInterval(existing);

    let current = 0;
    const intervalId = window.setInterval(() => {
      current += Math.max(1, Math.floor(Math.random() * 6));
      if (current >= 100) {
        current = 100;
        window.clearInterval(intervalId);
        this.intervals.delete(cardId);
        onComplete();
      }
      const card = this.cards.find((item) => item.id === cardId);
      if (card) {
        card.progress = current;
        this.cdr.markForCheck();
      }
    }, 80);

    this.intervals.set(cardId, intervalId);
  }
}
