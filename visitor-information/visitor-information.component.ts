import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface VisitorData {
  name: string;
  phone: string;
  gender: string;
  visit: string;
  email: string;
  visitDate: string;
  identity: string;
  singleAudf2: string;
  idType: string;
  multipleAudf3: string;
  freetextAudf1: string;
}

interface SavedVisitor {
  id: number;
  data: VisitorData;
}

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-visitor-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visitor-information.component.html',
  styleUrl: './visitor-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitorInformationComponent {
  readonly logoUrl = '/assets/calm 1.png';

  visitors: SavedVisitor[] = [];
  toasts: ToastItem[] = [];

  formData: VisitorData = {
    name: '',
    phone: '',
    gender: '',
    visit: '',
    email: '',
    visitDate: '',
    identity: '',
    singleAudf2: '',
    idType: '',
    multipleAudf3: '',
    freetextAudf1: '',
  };

  searchModalOpen = false;
  dateModalOpen = false;
  photoModalOpen = false;
  savedModalOpen = false;
  editingIndex: number | null = null;

  photoCaptured = false;

  viewDate = new Date();
  selectedDate: Date | null = null;
  endDate: Date | null = null;
  startTime = '09:00';
  endTime = '10:00';
  selectingEnd = false;
  enableAiNotes = false;

  readonly weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  get anyFilled(): boolean {
    return Object.values(this.formData).some((value) => value.trim() !== '');
  }

  get dateTitle(): string {
    return this.viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get startDateLabel(): string {
    return this.selectedDate ? this.formatDate(this.selectedDate) : 'Select date';
  }

  get endDateLabel(): string {
    return this.endDate ? this.formatDate(this.endDate) : 'Select date';
  }

  get calendarDays(): Array<{ label: number | ''; date?: Date; isSelected?: boolean; isRange?: boolean }>{
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{ label: number | ''; date?: Date; isSelected?: boolean; isRange?: boolean }> = [];
    for (let i = 0; i < startDay; i += 1) {
      days.push({ label: '' });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const isStart =
        this.selectedDate && date.toDateString() === this.selectedDate.toDateString();
      const isEnd = this.endDate && date.toDateString() === this.endDate.toDateString();
      const isRange =
        this.selectedDate &&
        this.endDate &&
        date >= this.stripTime(this.selectedDate) &&
        date <= this.stripTime(this.endDate);
      days.push({ label: day, date, isSelected: !!(isStart || isEnd), isRange: !!isRange });
    }
    return days;
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  openModal(type: 'search' | 'date' | 'photo'): void {
    this.searchModalOpen = type === 'search';
    this.dateModalOpen = type === 'date';
    this.photoModalOpen = type === 'photo';
  }

  closeModal(): void {
    this.searchModalOpen = false;
    this.dateModalOpen = false;
    this.photoModalOpen = false;
  }

  openSavedModal(): void {
    this.savedModalOpen = true;
  }

  closeSavedModal(): void {
    this.savedModalOpen = false;
  }

  selectDate(date: Date): void {
    if (this.selectingEnd) {
      this.endDate = date;
    } else {
      this.selectedDate = date;
      if (!this.endDate) this.endDate = date;
    }
  }

  setSelectingEnd(value: boolean): void {
    this.selectingEnd = value;
  }

  applyDate(): void {
    if (!this.selectedDate) return;
    const start = this.formatDate(this.selectedDate);
    const end = this.endDate ? this.formatDate(this.endDate) : start;
    const startTime = this.formatTimeInput(this.startTime);
    const endTime = this.formatTimeInput(this.endTime);
    this.formData.visitDate = `${start} - ${end}, ${startTime} - ${endTime}`;
    this.closeModal();
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  setEndDate(date: Date): void {
    this.endDate = date;
  }

  saveAdd(): void {
    if (!this.anyFilled) return;
    if (!this.validateRequired()) {
      this.showToast('Please fill all mandatory fields.', 'error');
      return;
    }
    if (this.editingIndex !== null) {
      this.visitors[this.editingIndex] = {
        ...this.visitors[this.editingIndex],
        data: { ...this.formData },
      };
      this.editingIndex = null;
    } else {
      this.visitors.unshift({ id: Date.now(), data: { ...this.formData } });
    }
    this.clearForm();
    this.showToast('Visitor saved successfully.', 'success');
  }

  saveContinue(): void {
    if (!this.anyFilled) return;
    if (!this.validateRequired()) {
      this.showToast('Please fill all mandatory fields.', 'error');
      return;
    }
    this.showToast('Saved successfully. Continue.', 'success');
    setTimeout(() => {
      this.photoCaptured = false;
      this.openModal('photo');
    }, 300);
  }

  deleteVisitor(index: number): void {
    const ok = window.confirm('Delete this visitor?');
    if (!ok) return;
    this.visitors.splice(index, 1);
  }

  editVisitor(index: number): void {
    const visitor = this.visitors[index];
    if (!visitor) return;
    this.formData = { ...visitor.data };
    this.editingIndex = index;
    this.closeSavedModal();
  }

  capturePhoto(): void {
    this.photoCaptured = true;
  }

  retakePhoto(): void {
    this.photoCaptured = false;
  }

  usePhoto(): void {
    this.closeModal();
  }

  closeToast(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  private clearForm(): void {
    this.formData = {
      name: '',
      phone: '',
      gender: '',
      visit: '',
      email: '',
      visitDate: '',
      identity: '',
      singleAudf2: '',
      idType: '',
      multipleAudf3: '',
      freetextAudf1: '',
    };
    this.selectedDate = null;
    this.endDate = null;
    this.startTime = '09:00';
    this.endTime = '10:00';
    this.selectingEnd = false;
    this.enableAiNotes = false;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  private validateRequired(): boolean {
    return Object.values(this.formData).every((value) => value.trim() !== '');
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    const id = Date.now() + Math.random();
    this.toasts = [...this.toasts, { id, message, type }];
    setTimeout(() => {
      this.closeToast(id);
    }, 2800);
  }

  formatTimeInput(value: string): string {
    const [h, m] = value.split(':').map((v) => Number(v));
    if (Number.isNaN(h) || Number.isNaN(m)) return value;
    const hours = h % 12 || 12;
    const suffix = h >= 12 ? 'PM' : 'AM';
    const min = String(m).padStart(2, '0');
    return `${hours}:${min} ${suffix}`;
  }
}
