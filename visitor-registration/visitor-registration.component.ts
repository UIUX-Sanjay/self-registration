import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visitor-registration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitor-registration.component.html',
  styleUrl: './visitor-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitorRegistrationComponent {
  readonly logoUrl = '/assets/calm 1.png';
  readonly illustrationUrl = '/assets/visit.png';
}
