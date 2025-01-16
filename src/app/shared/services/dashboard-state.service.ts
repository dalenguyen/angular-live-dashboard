import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WidgetConfig } from '../interfaces/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  private readonly STORAGE_KEY = 'dashboard_state';
  private platformId = inject(PLATFORM_ID);

  widgets = signal<WidgetConfig[]>([]);

  constructor() {
    this.loadState();
  }

  private sortWidgets(widgets: WidgetConfig[]): WidgetConfig[] {
    return [...widgets].sort((a, b) => {
      // Sort by pinned status first (pinned widgets come first)
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }

  saveState(widgets: WidgetConfig[]) {
    const sortedWidgets = this.sortWidgets(widgets);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sortedWidgets));
    }
    this.widgets.set(sortedWidgets);
  }

  loadState() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const widgets = saved ? JSON.parse(saved) : [];
      const sortedWidgets = this.sortWidgets(widgets);
      this.widgets.set(sortedWidgets);
      return sortedWidgets;
    }
    return [];
  }

  addWidget(widget: WidgetConfig) {
    const currentWidgets = this.widgets();
    this.saveState([...currentWidgets, widget]);
  }

  updateWidget(updated: WidgetConfig) {
    const currentWidgets = this.widgets();
    const index = currentWidgets.findIndex((w) => w.id === updated.id);
    if (index !== -1) {
      const newWidgets = [...currentWidgets];
      newWidgets[index] = updated;
      this.saveState(newWidgets);
    }
  }

  removeWidget(widgetId: string) {
    const currentWidgets = this.widgets();
    this.saveState(currentWidgets.filter((w) => w.id !== widgetId));
  }
}
