import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-pass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-pass.component.html',
  styleUrl: './success-pass.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessPassComponent {
  readonly registrationId = 'VIS-AH1ZRMM5I';
  readonly visitorName = 'John Doe';
  readonly meetingWith = 'Sarah Johnson';
  readonly visitDate = 'January 19, 2026';
  readonly time = '10:30 AM';
  readonly branch = 'Headquarters - New York';
  readonly status = 'Active';

  readonly successIconUrl = '/assets/success-check.png';
  readonly qrUrl = '/assets/qr.png';

  downloadPdf(): void {
    console.log('Download PDF');
  }

  shareWhatsApp(): void {
    console.log('Share WhatsApp');
  }

  newRegistration(): void {
    console.log('New Registration');
  }
}
