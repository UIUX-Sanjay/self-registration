import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  trackByIndex(index: number): number {
    return index;
  }
}
