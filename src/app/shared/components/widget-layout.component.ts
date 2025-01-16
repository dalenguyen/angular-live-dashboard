import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-layout',
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-white">
      <!-- Widget Header -->
      <div
        class="flex justify-between items-center p-4 border-b border-gray-200"
      >
        <h3 class="text-lg font-medium text-gray-900">{{ title() }}</h3>
        <div class="flex gap-2">
          <button
            (click)="pinClick.emit()"
            class="text-xl transition-all opacity-50 hover:opacity-100"
            [class.opacity-100]="isPinned()"
            [class.-rotate-45]="isPinned()"
          >
            📌
          </button>
          <button
            (click)="removeClick.emit()"
            class="text-xl transition-all opacity-50 hover:opacity-100"
          >
            ❌
          </button>
        </div>
      </div>

      <!-- Widget Content -->
      <div class="flex-1 flex items-center justify-center p-4 bg-white">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class WidgetLayoutComponent {
  title = input.required<string>();
  isPinned = input.required<boolean>();
  pinClick = output<void>();
  removeClick = output<void>();
}
