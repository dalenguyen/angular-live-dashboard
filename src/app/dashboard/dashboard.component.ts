import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig } from '../shared/interfaces/widget.interface';
import { DashboardStateService } from '../shared/services/dashboard-state.service';
import { WidgetHostComponent } from '../shared/components/widget-host.component';
import { WidgetDialogComponent } from './widget-dialog.component';
import {
  CdkDragDrop,
  CdkDragMove,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, WidgetHostComponent, DragDropModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="p-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            (click)="openAddWidgetDialog()"
            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Widget
          </button>
        </div>

        <div
          cdkDropList
          cdkDropListOrientation="mixed"
          class="flex gap-6 flex-wrap justify-center"
          (cdkDropListDropped)="onDrop($event)"
        >
          @for (widget of dashboardState.widgets(); track widget.id) {
          <app-widget-host
            (cdkDragStarted)="onDragStarted()"
            class="w-[30%] aspect-[3/3] box-border rounded-lg shadow-2xl"
            cdkDrag
            [config]="widget"
            (remove)="removeWidget($event)"
            (configChange)="updateWidget($event)"
            [class.opacity-50]="isDragging && !widget.isPinned"
          >
          </app-widget-host>
          }
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  private viewContainerRef = inject(ViewContainerRef);
  dashboardState = inject(DashboardStateService);
  isDragging = false;

  removeWidget(widgetId: string) {
    this.dashboardState.removeWidget(widgetId);
  }

  updateWidget(updated: WidgetConfig) {
    this.dashboardState.updateWidget(updated);
  }

  openAddWidgetDialog() {
    const dialogComponentRef = this.viewContainerRef.createComponent(
      WidgetDialogComponent
    );
    const dialogInstance = dialogComponentRef.instance;

    dialogInstance.setDialogRef({
      close: () => {
        dialogComponentRef.destroy();
      },
    });
  }

  onDragStarted() {
    this.isDragging = true;
  }

  onDrop(event: CdkDragDrop<WidgetConfig[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const widgets = this.dashboardState.widgets();
      const newWidgets = [...widgets];
      moveItemInArray(newWidgets, event.previousIndex, event.currentIndex);
      this.dashboardState.saveState(newWidgets);
    }
    this.isDragging = false;
  }
}
