import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-safety-briefing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './safety-briefing.component.html',
  styleUrl: './safety-briefing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyBriefingComponent {
  isPlaying = false;
  isVideoCompleted = false;

  readonly thumbnailUrl = '/assets/safety.png';
  readonly videoUrl = '/assets/safety.mp4';
  readonly logoUrl = '/assets/calm 1.png';

  playVideo(): void {
    this.isPlaying = true;
  }

  onVideoEnded(): void {
    this.isVideoCompleted = true;
  }
}
