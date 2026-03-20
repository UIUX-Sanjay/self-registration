import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Outlet {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  readonly heroImages = ['/assets/hero.jpg', '/assets/hero 1.png', '/assets/secur.jpg'];

  readonly outlets: Outlet[] = [
    {
      id: 'Outlet 1',
      name: 'Outlet 1 – 28A Maju Ave',
      subtitle: '28A Maju Ave, Singapore 218421.',
      description: "",
      image: '/assets/hero.jpg',
      badge: 'OUTLET 1',
    },
    {
      id: 'Outlet 2',
      name: 'Outlet 2 – 221 Rangoon Rd',
      subtitle: '221 Rangoon Rd, Singapore 218421.',
      description: '',
      image: '/assets/hero 1.png',
      badge: 'OUTLET 2',
    },
  ];

  selectedLocation: string | null = null;
  selectedDate: Date | null = null;

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();

  get monthLabel(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  }

  get calendarDays(): Array<{ date: Date | null; label: number | '' }> {
    const days: Array<{ date: Date | null; label: number | '' }> = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i += 1) {
      days.push({ date: null, label: '' });
    }

    for (let d = 1; d <= daysInMonth; d += 1) {
      days.push({ date: new Date(this.currentYear, this.currentMonth, d), label: d });
    }

    return days;
  }

  selectOutlet(outlet: Outlet): void {
    this.selectedLocation = outlet.id;
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isSelectedOutlet(outlet: Outlet): boolean {
    return this.selectedLocation === outlet.id;
  }

  selectDate(date: Date | null): void {
    if (!date) return;
    const today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    if (date < today) return;
    this.selectedDate = date;
  }

  isDisabled(date: Date | null): boolean {
    if (!date) return true;
    const today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    return date < today;
  }

  isSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  prevMonth(): void {
    this.currentMonth -= 1;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    }
  }

  nextMonth(): void {
    this.currentMonth += 1;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    }
  }

  scrollToBooking(): void {
    if (this.selectedLocation) {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  confirmNow(): void {
    if (!this.selectedLocation || !this.selectedDate) return;
    alert(`Booking Confirmed!\n\nOutlet: ${this.selectedLocation}\nDate: ${this.selectedDate.toDateString()}`);
  }
}
