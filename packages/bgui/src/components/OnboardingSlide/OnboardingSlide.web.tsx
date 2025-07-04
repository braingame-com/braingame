import { Colors, Tokens } from "@braingame/utils";
import type React from "react";
import { Button } from "../Button";
import { Image } from "../Image";
import { PageWrapper } from "../PageWrapper";
import { Text } from "../Text";
import type { OnboardingSlideProps } from "./types";

export function OnboardingSlide({
	title,
	description,
	image,
	isLast = false,
	currentIndex = 0,
	totalSlides = 1,
	onSkip,
	onNext,
	style,
}: OnboardingSlideProps) {
	const containerStyle: React.CSSProperties = {
		flex: 1,
		backgroundColor: Colors.universal.background,
		position: "relative",
		display: "flex",
		flexDirection: "column",
		...(style as React.CSSProperties),
	};

	const skipContainerStyle: React.CSSProperties = {
		position: "absolute",
		top: Tokens.m,
		right: Tokens.m,
		zIndex: 1,
	};

	const contentStyle: React.CSSProperties = {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: Tokens.xl,
		paddingRight: Tokens.xl,
	};

	const imageContainerStyle: React.CSSProperties = {
		width: "80%",
		maxWidth: 400,
		height: "40vh",
		maxHeight: 400,
		marginBottom: Tokens.xl,
	};

	const imageStyle: React.CSSProperties = {
		width: "100%",
		height: "100%",
		objectFit: "contain",
	};

	const textContainerStyle: React.CSSProperties = {
		alignItems: "center",
		maxWidth: "90%",
	};

	const titleStyle: React.CSSProperties = {
		marginBottom: Tokens.m,
	};

	const descriptionStyle: React.CSSProperties = {
		lineHeight: "24px",
	};

	const bottomSectionStyle: React.CSSProperties = {
		paddingLeft: Tokens.xl,
		paddingRight: Tokens.xl,
		paddingBottom: Tokens.xl,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	const dotsContainerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		marginBottom: Tokens.xl,
	};

	const dotStyle: React.CSSProperties = {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.universal.neutral[300],
		marginLeft: 4,
		marginRight: 4,
		transition: "all 0.3s ease",
	};

	const activeDotStyle: React.CSSProperties = {
		...dotStyle,
		backgroundColor: Colors.universal.primary,
		width: 24,
	};

	const buttonStyle: React.CSSProperties = {
		minWidth: 200,
	};

	return (
		<PageWrapper style={containerStyle}>
			{/* Skip button in top right */}
			{!isLast && onSkip && (
				<div style={skipContainerStyle}>
					<Button variant="ghost" size="small" onPress={onSkip}>
						Skip
					</Button>
				</div>
			)}

			{/* Content */}
			<div style={contentStyle}>
				{/* Image */}
				{image && (
					<div style={imageContainerStyle}>
						<Image source={image} style={imageStyle} resizeMode="contain" />
					</div>
				)}

				{/* Text content */}
				<div style={textContainerStyle}>
					<Text variant="displayTitle" align="center" style={titleStyle}>
						{title}
					</Text>
					<Text variant="body" align="center" color="secondary" style={descriptionStyle}>
						{description}
					</Text>
				</div>
			</div>

			{/* Bottom section with dots and button */}
			<div style={bottomSectionStyle}>
				{/* Progress dots */}
				{totalSlides > 1 && (
					<div style={dotsContainerStyle}>
						{Array.from({ length: totalSlides }).map((_, index) => (
							<div
								key={`dot-${index}`}
								style={index === currentIndex ? activeDotStyle : dotStyle}
							/>
						))}
					</div>
				)}

				{/* Action button */}
				{onNext && (
					<Button
						variant="primary"
						size="large"
						onPress={onNext}
						style={buttonStyle}
						icon={!isLast ? "arrow-right" : undefined}
						iconPosition="right"
					>
						{isLast ? "Get Started" : "Next"}
					</Button>
				)}
			</div>
		</PageWrapper>
	);
}
