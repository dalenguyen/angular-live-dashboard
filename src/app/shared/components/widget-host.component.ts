import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit,
  output,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig } from '../interfaces/widget.interface';
import { WidgetRegistryService } from '../services/widget-registry.service';

@Component({
  selector: 'app-widget-host',
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm overflow-hidden h-full">
      <ng-container #widgetContainer></ng-container>
    </div>
  `,
})
export class WidgetHostComponent implements OnInit, OnDestroy {
  #widgetRegistry = inject(WidgetRegistryService);

  config = input.required<WidgetConfig>();
  remove = output<string>();
  configChange = output<WidgetConfig>();

  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngOnInit() {
    this.loadWidget();
  }

  ngOnDestroy() {
    this.container.clear();
  }

  private loadWidget() {
    const componentType = this.#widgetRegistry.getWidgetComponent(
      this.config().type
    );

    if (!componentType) {
      console.error(`Widget type ${this.config().type} not found in registry`);
      return;
    }

    this.container.clear();
    const componentRef = this.container.createComponent(componentType);

    componentRef.setInput('id', this.config().id);
    componentRef.setInput('type', this.config().type);
    componentRef.setInput('title', this.config().title);
    componentRef.setInput('isPinned', this.config().isPinned);

    const instance = componentRef.instance;
    instance.remove?.subscribe((id: string) => this.remove.emit(id));
    instance.configChange?.subscribe((config: WidgetConfig) =>
      this.configChange.emit(config)
    );
  }
}
