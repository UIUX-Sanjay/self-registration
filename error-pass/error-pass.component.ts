import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-pass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-pass.component.html',
  styleUrl: './error-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPassComponent {
  readonly registrationId = 'VIS-AH1ZRMM5I';
  readonly visitorName = 'John Doe';
  readonly meetingWith = 'Sarah Johnson';
  readonly visitDate = 'January 19, 2026';
  readonly time = '10:30 AM';
  readonly branch = 'Headquarters - New York';
  readonly status = 'Error';

  submitAgain(): void {
    console.log('Submit again');
  }
}
