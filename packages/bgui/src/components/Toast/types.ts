export interface ToastProps {
  /** Message to announce inside the toast */
  message: string;
  /** Visual style of the toast */
  type?: 'success' | 'warning' | 'error' | 'info';
  /** Auto dismiss duration in milliseconds */
  duration?: number;
  /** Optional action button label */
  actionLabel?: string;
  /** Callback when action button is pressed */
  onActionPress?: () => void;
  /** Toast variant */
  variant?: 'simple' | 'with-action';
}
