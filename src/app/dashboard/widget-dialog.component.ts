import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStateService } from '../shared/services/dashboard-state.service';
import { WidgetConfig } from '../shared/interfaces/widget.interface';
import { v4 as uuidv4 } from 'uuid';

interface WidgetOption {
  type: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-widget-dialog',
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      (click)="close()"
    >
      <div
        class="bg-white rounded-xl p-6 min-w-[400px] max-w-[90vw] max-h-[90vh] overflow-y-auto shadow-xl"
        (click)="$event.stopPropagation()"
      >
        <div
          class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200"
        >
          <h2 class="text-2xl font-semibold text-gray-900">Add Widget</h2>
          <button
            class="text-xl opacity-50 hover:opacity-100 transition-all"
            (click)="close()"
          >
            ❌
          </button>
        </div>

        <div class="flex flex-col gap-3">
          @for (widget of availableWidgets(); track widget.type) {
          <button
            class="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer text-left transition-all hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md"
            (click)="addWidget(widget.type)"
          >
            <div class="text-3xl">
              {{ widget.icon }}
            </div>
            <div class="flex-1">
              <h3 class="text-base font-medium text-gray-900">
                {{ widget.title }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">{{ widget.description }}</p>
            </div>
          </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class WidgetDialogComponent {
  #dashboardState = inject(DashboardStateService);
  #dialogRef?: { close: () => void };

  availableWidgets = signal<WidgetOption[]>([
    {
      type: 'Clock',
      title: 'Clock Widget',
      description: 'Displays the current time with automatic updates',
      icon: '🕐',
    },
    {
      type: 'Weather',
      title: 'Weather Widget',
      description: 'Shows current weather conditions and temperature',
      icon: '🌤️',
    },
  ]);

  setDialogRef(dialogRef: { close: () => void }) {
    this.#dialogRef = dialogRef;
  }

  close() {
    this.#dialogRef?.close();
  }

  addWidget(type: string) {
    const widget: WidgetConfig = {
      id: uuidv4(),
      type,
      title:
        this.availableWidgets().find((w) => w.type === type)?.title || type,
      isPinned: false,
      column: 0,
      row: 0,
    };

    this.#dashboardState.addWidget(widget);
    this.close();
  }
}
