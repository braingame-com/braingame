import { Component } from "react";
import { StyleSheet, View } from "react-native";
import { type Theme, ThemeContext } from "../../../theme";
import { Button } from "../../primitives/Button";
import { Typography } from "../../primitives/Typography";
import type {
	ContextErrorBoundaryFallback,
	ContextErrorBoundaryFallbackArgs,
	ContextErrorBoundaryProps,
} from "./ContextErrorBoundary.types";

interface ContextErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ContextErrorBoundary extends Component<
	ContextErrorBoundaryProps,
	ContextErrorBoundaryState
> {
	static contextType = ThemeContext;

	public state: ContextErrorBoundaryState = {
		hasError: false,
		error: null,
	};

	static getDerivedStateFromError(error: Error): ContextErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		if (this.props.onError) {
			this.props.onError(error, info);
		}
	}

	private handleReset = () => {
		this.setState({ hasError: false, error: null });
		this.props.onReset?.();
	};

	renderFallback(fallback: ContextErrorBoundaryFallback, args: ContextErrorBoundaryFallbackArgs) {
		if (typeof fallback === "function") {
			return fallback(args);
		}
		return fallback;
	}

	render() {
		const { children, fallback, contextName } = this.props;
		const { hasError, error } = this.state;
		const theme = (this.context ?? {}) as Theme;
		const styles = getStyles(theme);

		if (!hasError || !error) {
			return children;
		}

		if (fallback) {
			return this.renderFallback(fallback, {
				error,
				contextName,
				reset: this.handleReset,
			});
		}

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Typography level="title-sm" style={styles.title}>
						{contextName} unavailable
					</Typography>
					<Typography level="body-sm" style={styles.message}>
						We ran into a problem while loading {contextName}. Try again to recover.
					</Typography>
					<Button variant="solid" onClick={this.handleReset} fullWidth>
						Retry
					</Button>
				</View>
			</View>
		);
	}
}

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			padding: theme.spacing?.lg ?? 16,
			backgroundColor: theme.colors?.background ?? "#fff",
		},
		card: {
			width: "100%",
			maxWidth: 420,
			padding: theme.spacing?.lg ?? 16,
			borderRadius: theme.radii?.lg ?? 12,
			gap: theme.spacing?.md ?? 12,
			backgroundColor: theme.colors?.surface ?? "#fff",
			borderColor: theme.colors?.outlineVariant ?? "#d0d5dd",
			borderWidth: StyleSheet.hairlineWidth,
		},
		title: {
			color: theme.colors?.onSurface ?? "#0f172a",
		},
		message: {
			color: theme.colors?.onSurfaceVariant ?? "#475467",
		},
	});

export type { ContextErrorBoundaryProps } from "./ContextErrorBoundary.types";
