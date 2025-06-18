import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Tokens } from '../../../../utils/constants/Tokens';
import { useThemeColor } from '../../../../utils/hooks/useThemeColor';
import type { SpinnerProps } from './types';

const SIZE_MAP = {
  sm: Tokens.s,
  md: Tokens.l,
  lg: Tokens.xl,
} as const;

export const Spinner = ({
  size = 'md',
  color,
  variant = 'inline',
  ariaLabel,
}: SpinnerProps) => {
  const spinnerColor = color ?? useThemeColor('icon');
  const indicatorSize = SIZE_MAP[size];

  const indicator = (
    <ActivityIndicator
      color={spinnerColor}
      size={indicatorSize}
      accessibilityLabel={ariaLabel}
      accessibilityLiveRegion="polite"
    />
  );

  if (variant === 'overlay') {
    return (
      <View
        style={[StyleSheet.absoluteFill, styles.overlay]}
        accessibilityViewIsModal
      >
        {indicator}
      </View>
    );
  }

  return indicator;
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
});
