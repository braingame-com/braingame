import React from 'react';
import { View, Animated } from 'react-native';
import { Text } from '@braingame/bgui';
import { useAnimation } from '../../contexts/AnimationContext';
import { animatedHeaderStyles } from './styles';

interface AnimatedHeaderProps {
	title: string;
	subtitle?: string;
	showBackButton?: boolean;
	onBackPress?: () => void;
}

/**
 * Animated Header Component
 * Sophisticated scroll-based header with opacity and scale animations
 * Implements dual-opacity system from bg1 with enhancements
 */
export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
	title,
	subtitle,
	showBackButton = false,
	onBackPress,
}) => {
	const { headerOpacity, contentOpacity, titleScale } = useAnimation();

	return (
		<View style={animatedHeaderStyles.container}>
			{/* Background Header (appears on scroll) */}
			<Animated.View
				style={[
					animatedHeaderStyles.backgroundHeader,
					{
						opacity: headerOpacity,
					},
				]}
			>
				<View style={animatedHeaderStyles.backgroundContent}>
					{showBackButton && (
						<Animated.View style={animatedHeaderStyles.backButton}>
							<Text
								style={animatedHeaderStyles.backButtonText}
								onPress={onBackPress}
							>
								←
							</Text>
						</Animated.View>
					)}
					<Text style={animatedHeaderStyles.backgroundTitle} numberOfLines={1}>
						{title}
					</Text>
				</View>
			</Animated.View>

			{/* Main Content Header (fades on scroll) */}
			<Animated.View
				style={[
					animatedHeaderStyles.contentHeader,
					{
						opacity: contentOpacity,
						transform: [{ scale: titleScale }],
					},
				]}
			>
				<View style={animatedHeaderStyles.titleContainer}>
					<Text style={animatedHeaderStyles.mainTitle}>
						{title}
					</Text>
					{subtitle && (
						<Text style={animatedHeaderStyles.subtitle}>
							{subtitle}
						</Text>
					)}
				</View>
			</Animated.View>
		</View>
	);
};

/**
 * Animated Page Title Component
 * Simple animated title for pages without complex headers
 */
interface AnimatedPageTitleProps {
	title: string;
	icon?: string;
}

export const AnimatedPageTitle: React.FC<AnimatedPageTitleProps> = ({
	title,
	icon,
}) => {
	const { contentOpacity, titleScale } = useAnimation();

	return (
		<Animated.View
			style={[
				animatedHeaderStyles.pageTitleContainer,
				{
					opacity: contentOpacity,
					transform: [{ scale: titleScale }],
				},
			]}
		>
			<Text style={animatedHeaderStyles.pageTitle}>
				{icon && `${icon} `}{title}
			</Text>
		</Animated.View>
	);
};

/**
 * Animated Subtitle Component
 * Animated subtitle that appears/disappears with scroll
 */
interface AnimatedSubtitleProps {
	text: string;
	delay?: number;
}

export const AnimatedSubtitle: React.FC<AnimatedSubtitleProps> = ({
	text,
	delay = 0,
}) => {
	const { contentOpacity } = useAnimation();

	// Create delayed opacity for staggered animations
	const delayedOpacity = React.useMemo(() => {
		return contentOpacity.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});
	}, [contentOpacity]);

	return (
		<Animated.View
			style={[
				animatedHeaderStyles.subtitleContainer,
				{
					opacity: delayedOpacity,
				},
			]}
		>
			<Text style={animatedHeaderStyles.animatedSubtitle}>
				{text}
			</Text>
		</Animated.View>
	);
};