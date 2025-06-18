export interface SliderProps {
  value: number | [number, number];
  onValueChange: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
