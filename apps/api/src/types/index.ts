// Common API types

export interface ApiResponse<T = any> {
	data?: T;
	error?: {
		message: string;
		details?: any;
	};
	metadata?: {
		timestamp: string;
		version: string;
	};
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		page: number;
		pageSize: number;
		totalItems: number;
		totalPages: number;
	};
}

export interface User {
	id: string;
	email: string;
	displayName?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Session {
	id: string;
	userId: string;
	startedAt: Date;
	completedAt?: Date;
	duration?: number;
	type: "meditation" | "exercise" | "assessment";
}

export interface Analytics {
	userId: string;
	period: "day" | "week" | "month" | "year";
	metrics: {
		totalSessions: number;
		totalDuration: number;
		averageDuration: number;
		streakDays: number;
	};
}
