import { Component, input, model, output } from '@angular/core';
import { WidgetConfig } from '../interfaces/widget.interface';

@Component({
  template: '',
})
export abstract class BaseWidget {
  id = input.required<string>();
  type = input.required<string>();
  title = input.required<string>();
  isPinned = model<boolean>(false);
  settings = input<unknown>();

  remove = output<string>();
  configChange = output<WidgetConfig>();

  togglePin = () => {
    this.isPinned.set(!this.isPinned());
    this.emitConfigUpdate();
  };

  protected emitConfigUpdate() {
    this.configChange.emit({
      id: this.id(),
      type: this.type(),
      title: this.title(),
      isPinned: this.isPinned(),
      column: 0, // These will be managed by the dashboard component
      row: 0,
      settings: this.settings,
    });
  }

  onRemove = () => {
    this.remove.emit(this.id());
  };
}
