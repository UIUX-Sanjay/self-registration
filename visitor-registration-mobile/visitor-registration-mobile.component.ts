import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visitor-registration-mobile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './visitor-registration-mobile.component.html',
  styleUrl: './visitor-registration-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitorRegistrationMobileComponent {
  readonly logoUrl = '/assets/calm 1.png';

  readonly form = new FormGroup({
    branch: new FormControl<string | null>(null),
    visitType: new FormControl<string | null>(null),
    termsAccepted: new FormControl<boolean>(false, { nonNullable: true }),
  });

  readonly branches = ['Chennai', 'Bangalore', 'Mumbai'];
  readonly visitTypes = ['Meeting', 'Interview', 'Delivery'];

  branchOpen = false;
  visitOpen = false;

  toggleBranch(): void {
    this.branchOpen = !this.branchOpen;
    if (this.branchOpen) this.visitOpen = false;
  }

  toggleVisit(): void {
    this.visitOpen = !this.visitOpen;
    if (this.visitOpen) this.branchOpen = false;
  }

  selectBranch(value: string): void {
    this.form.get('branch')?.setValue(value);
    this.branchOpen = false;
  }

  selectVisitType(value: string): void {
    this.form.get('visitType')?.setValue(value);
    this.visitOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.select-wrap.branch')) this.branchOpen = false;
    if (!target.closest('.select-wrap.visit')) this.visitOpen = false;
  }
}
