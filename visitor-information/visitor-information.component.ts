import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SavedVisitor {
  name: string;
  phone: string;
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

  formData = {
    name: '',
    phone: '',
    gender: '',
    visit: '',
    email: '',
    visitDate: '',
    visitTime: '',
    identity: '',
    singleAudf2: '',
    idType: '',
    multipleAudf3: '',
    freetextAudf1: '',
  };

  searchModalOpen = false;
  dateModalOpen = false;
  timeModalOpen = false;
  photoModalOpen = false;

  photoCaptured = false;

  viewDate = new Date();
  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  readonly weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  readonly timeSlots = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
  ];

  get anyFilled(): boolean {
    return Object.values(this.formData).some((value) => value.trim() !== '');
  }

  get dateTitle(): string {
    return this.viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get calendarDays(): Array<{ label: number | ''; date?: Date; isSelected?: boolean }>{
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: Array<{ label: number | ''; date?: Date; isSelected?: boolean }> = [];
    for (let i = 0; i < startDay; i += 1) {
      days.push({ label: '' });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(year, month, day);
      const isSelected = !!(
        this.selectedDate && date.toDateString() === this.selectedDate.toDateString()
      );
      days.push({ label: day, date, isSelected });
    }
    return days;
  }

  openModal(type: 'search' | 'date' | 'time' | 'photo'): void {
    this.searchModalOpen = type === 'search';
    this.dateModalOpen = type === 'date';
    this.timeModalOpen = type === 'time';
    this.photoModalOpen = type === 'photo';
  }

  closeModal(): void {
    this.searchModalOpen = false;
    this.dateModalOpen = false;
    this.timeModalOpen = false;
    this.photoModalOpen = false;
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  applyDate(): void {
    if (!this.selectedDate) return;
    this.formData.visitDate = this.formatDate(this.selectedDate);
    this.closeModal();
  }

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  applyTime(): void {
    if (!this.selectedTime) return;
    this.formData.visitTime = this.selectedTime;
    this.closeModal();
  }

  saveAdd(): void {
    if (!this.anyFilled) return;
    if (!this.validateRequired()) {
      this.showToast('Please fill all mandatory fields.', 'error');
      return;
    }
    this.visitors.unshift({ name: this.formData.name, phone: this.formData.phone });
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
    this.visitors.splice(index, 1);
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
      visitTime: '',
      identity: '',
      singleAudf2: '',
      idType: '',
      multipleAudf3: '',
      freetextAudf1: '',
    };
    this.selectedDate = null;
    this.selectedTime = null;
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
}
