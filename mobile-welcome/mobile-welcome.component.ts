import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mobile-welcome.component.html',
  styleUrl: './mobile-welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileWelcomeComponent {
  readonly heroImageUrl = '/assets/welcome.png';
  readonly logoUrl = '/assets/calm.png';

  readonly branches = ['Chennai', 'Bangalore', 'Mumbai'];

  readonly form = new FormGroup({
    branch: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] }),
  });
}
