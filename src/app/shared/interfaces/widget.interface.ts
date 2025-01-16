export interface WidgetConfig {
  id: string;
  type: string;
  title: string;
  isPinned: boolean;
  column: number;
  row: number;
  settings?: any;
}
