export function generateSessionId(): string {
	return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}