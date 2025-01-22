# Angular Dashboard App

A modern, customizable dashboard application built with Angular 19, featuring a widget-based architecture and real-time updates.

## Features

- 📊 Customizable widget-based dashboard
- 🔄 Real-time updates with Angular Signals
- 📱 Responsive design with Tailwind CSS
- 💾 Persistent layout with localStorage
- 🎯 Modern Angular practices (Signals, Dependency Injection)

## Available Widgets

- ⏰ Clock Widget: Displays current time with automatic updates
- 🌤️ Weather Widget: Shows simulated weather conditions (can be connected to a real weather API)

## Project Structure

```
src/
├── app/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── base-widget.component.ts    # Base class for all widgets
│   │   │   └── widget-host.component.ts    # Dynamic widget container
│   │   ├── services/
│   │   │   ├── dashboard-state.service.ts  # Dashboard state management
│   │   │   └── widget-registry.service.ts  # Widget registration and management
│   │   └── interfaces/
│   │       └── widget.interface.ts         # Widget configuration interface
│   ├── widgets/
│   │   ├── clock/
│   │   │   └── clock.widget.ts            # Clock widget implementation
│   │   └── weather/
│   │       └── weather.widget.ts          # Weather widget implementation
│   └── dashboard/
│       ├── dashboard.component.ts         # Main dashboard layout
│       └── widget-dialog.component.ts     # Widget selection dialog
```

## Getting Started

### Prerequisites

- Node.js 18.13.0 or higher
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/angular-live-dashboard.git
cd angular-live-dashboard
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run start
# or
pnpm start
```

4. Open your browser and navigate to `http://localhost:5173`

## Adding New Widgets

1. Create a new widget component that extends `BaseWidget`:
```typescript
@Component({
  selector: 'app-my-widget',
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col bg-white">
      <!-- Widget content -->
    </div>
  `
})
export class MyWidget extends BaseWidget {
  // Widget implementation
}
```

2. Register the widget in `widget-registry.service.ts`:
```typescript
import { MyWidget } from './widgets/my-widget/my.widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetRegistryService {
  private readonly widgets = new Map<string, Type<BaseWidget>>([
    ['Clock', ClockWidget],
    ['Weather', WeatherWidget],
    ['MyWidget', MyWidget], // Add your new widget here
  ]);
}
```

3. Add widget to the available options in `widget-dialog.component.ts`:
```typescript
availableWidgets = signal<WidgetOption[]>([
  {
    type: 'MyWidget',
    title: 'My Widget',
    description: 'Description of my widget',
    icon: '🔧'
  },
  // ... other widgets
]);
```

## Features in Development

- [ ] Drag and drop widget positioning
- [ ] Widget resizing
- [ ] More widget types
- [ ] Widget settings/configuration
- [ ] Data persistence with backend integration
- [ ] User authentication and personalized dashboards

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.