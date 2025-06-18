import { ErrorBoundary } from "@braingame/bgui";
import { Text } from "@braingame/bgui";

export const ErrorBoundaryUsage = () => (
        <ErrorBoundary>
                <Text>Safe content</Text>
        </ErrorBoundary>
);
