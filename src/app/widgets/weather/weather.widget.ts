import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../../shared/components/base-widget.component';
import { WidgetLayoutComponent } from '../../shared/components/widget-layout.component';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
}

@Component({
  selector: 'app-weather-widget',
  imports: [CommonModule, WidgetLayoutComponent],
  template: `
    <app-widget-layout
      [title]="title()"
      [isPinned]="isPinned()"
      (pinClick)="togglePin()"
      (removeClick)="onRemove()"
    >
      <div class="text-center">
        <div class="flex flex-col gap-2 mb-4">
          <span class="text-5xl font-semibold text-gray-800">
            {{ weather().temperature }}°C
          </span>
          <span class="text-lg text-gray-600">
            {{ weather().condition }}
          </span>
        </div>
        <div class="text-6xl">
          {{ weather().icon }}
        </div>
      </div>
    </app-widget-layout>
  `,
})
export class WeatherWidget extends BaseWidget implements OnInit {
  weather = signal<WeatherData>({
    temperature: 23,
    condition: 'Partly Cloudy',
    icon: '⛅',
  });

  ngOnInit() {
    // In a real app, we would fetch real weather data here
    this.simulateWeatherUpdate();
  }

  private simulateWeatherUpdate() {
    const conditions = [
      { temp: 23, cond: 'Sunny', icon: '☀️' },
      { temp: 18, cond: 'Partly Cloudy', icon: '⛅' },
      { temp: 15, cond: 'Rainy', icon: '🌧️' },
      { temp: 20, cond: 'Cloudy', icon: '☁️' },
    ];

    setInterval(() => {
      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];
      this.weather.set({
        temperature: randomCondition.temp,
        condition: randomCondition.cond,
        icon: randomCondition.icon,
      });
    }, 5000);
  }
}
