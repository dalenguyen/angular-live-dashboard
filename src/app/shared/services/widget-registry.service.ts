import { Injectable, Type } from '@angular/core';
import { BaseWidget } from '../components/base-widget.component';
import { ClockWidget } from '../../widgets/clock/clock.widget';
import { WeatherWidget } from '../../widgets/weather/weather.widget';

@Injectable({
  providedIn: 'root',
})
export class WidgetRegistryService {
  private readonly widgets = new Map<string, Type<BaseWidget>>([
    ['Clock', ClockWidget],
    ['Weather', WeatherWidget],
  ]);

  getWidgetComponent(type: string): Type<BaseWidget> | undefined {
    return this.widgets.get(type);
  }

  getAvailableWidgetTypes(): string[] {
    return Array.from(this.widgets.keys());
  }
}
