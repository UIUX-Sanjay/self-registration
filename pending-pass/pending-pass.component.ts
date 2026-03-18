import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-pass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-pass.component.html',
  styleUrl: './pending-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingPassComponent {
  readonly registrationId = 'VIS-AH1ZRMM5I';
  readonly visitorName = 'John Doe';
  readonly meetingWith = 'Sarah Johnson';
  readonly visitDate = 'January 19, 2026';
  readonly time = '10:30 AM';
  readonly branch = 'Headquarters - New York';
  readonly status = 'Pending';

  newRegistration(): void {
    console.log('New Registration');
  }
}
