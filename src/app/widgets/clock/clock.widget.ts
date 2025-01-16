import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../../shared/components/base-widget.component';
import { interval } from 'rxjs';
import { WidgetLayoutComponent } from '../../shared/components/widget-layout.component';

@Component({
  selector: 'app-clock-widget',
  imports: [CommonModule, WidgetLayoutComponent],
  template: `
    <app-widget-layout
      [title]="title()"
      [isPinned]="isPinned()"
      (pinClick)="togglePin()"
      (removeClick)="onRemove()"
    >
      <div class="text-4xl font-medium text-gray-900">
        {{ currentTime() }}
      </div>
    </app-widget-layout>
  `,
})
export class ClockWidget extends BaseWidget implements OnInit, OnDestroy {
  currentTime = signal('');

  private timeSubscription = interval(1000).subscribe(() => {
    this.updateTime();
  });

  ngOnInit() {
    // initialize the time
    this.updateTime();
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  private updateTime() {
    const now = new Date();
    this.currentTime.set(now.toLocaleTimeString());
  }
}
