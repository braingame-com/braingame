import { View, StyleSheet } from 'react-native';
import { Text } from '../../../Text';
import { useThemeColor } from '@braingame/utils/hooks/useThemeColor';
import { Colors } from '@braingame/utils/constants/Colors';
import { Tokens } from '@braingame/utils/constants/Tokens';
import type { BadgeProps, ThemeColor, BadgeVariant } from './types';

export const Badge = ({
  count,
  text,
  dot,
  color = 'primary',
  variant = 'count',
  style,
}: BadgeProps) => {
  const neutral = useThemeColor('border');
  const backgroundColor = getBackgroundColor(variant, color, neutral);
  const content = dot ? undefined : text ?? (count != null ? String(count) : undefined);

  return (
    <View style={[styles.base, dot && styles.dot, { backgroundColor }, style]}>
      {content && <Text type="small" style={styles.text}>{content}</Text>}
    </View>
  );
};

const getBackgroundColor = (
  variant: BadgeVariant,
  color: ThemeColor,
  neutral: string,
) => {
  if (variant === 'notification') {
    return Colors.universal.negative;
  }

  if (variant === 'status' || variant === 'count') {
    return mapColor(color, neutral);
  }

  return mapColor(color, neutral);
};

const mapColor = (color: ThemeColor, neutral: string) => {
  switch (color) {
    case 'primary':
      return Colors.universal.primary;
    case 'secondary':
      return Colors.universal.primaryHalfFaded;
    case 'success':
      return Colors.universal.positive;
    case 'danger':
      return Colors.universal.negative;
    case 'warning':
      return Colors.universal.warn;
    case 'neutral':
    default:
      return neutral;
  }
};

const styles = StyleSheet.create({
  base: {
    minWidth: Tokens.m,
    minHeight: Tokens.m,
    paddingHorizontal: Tokens.xs,
    borderRadius: Tokens.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: Tokens.s,
    height: Tokens.s,
    paddingHorizontal: 0,
  },
  text: {
    color: '#fff',
    lineHeight: Tokens.m,
  },
});
