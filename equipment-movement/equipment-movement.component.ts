import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface EquipmentItem {
  name: string;
  serial: string;
  direction: 'IN' | 'OUT';
}

@Component({
  selector: 'app-equipment-movement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './equipment-movement.component.html',
  styleUrl: './equipment-movement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentMovementComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    itemDescription: ['', Validators.required],
    serialNumber: ['', Validators.required],
    direction: ['', Validators.required],
  });

  items: EquipmentItem[] = [];
  directionOpen = false;

  constructor() {}

  addItem(): void {
    if (this.form.invalid) return;

    const value = this.form.value;
    this.items.push({
      name: value.itemDescription ?? '',
      serial: value.serialNumber ?? '',
      direction: (value.direction as 'IN' | 'OUT') ?? 'IN',
    });

    this.form.reset({
      itemDescription: '',
      serialNumber: '',
      direction: '',
    });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  toggleDirection(): void {
    this.directionOpen = !this.directionOpen;
  }

  selectDirection(value: 'IN' | 'OUT'): void {
    this.form.patchValue({ direction: value });
    this.directionOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.direction-wrap')) {
      this.directionOpen = false;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
