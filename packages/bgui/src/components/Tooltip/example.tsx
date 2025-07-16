/**
 * Example usage of the Tooltip component
 */

import type React from "react";
import { Tooltip } from "./Tooltip.web";

export const TooltipExample: React.FC = () => {
	return (
		<div style={{ padding: "50px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
			<h2>Tooltip Examples</h2>

			{/* Basic tooltip */}
			<Tooltip title="This is a basic tooltip">
				<button>Hover me</button>
			</Tooltip>

			{/* Tooltip with arrow */}
			<Tooltip title="This tooltip has an arrow" arrow>
				<button>Hover me (with arrow)</button>
			</Tooltip>

			{/* Different placements */}
			<Tooltip title="Top placement" placement="top">
				<button>Top</button>
			</Tooltip>

			<Tooltip title="Right placement" placement="right">
				<button>Right</button>
			</Tooltip>

			<Tooltip title="Bottom placement" placement="bottom">
				<button>Bottom</button>
			</Tooltip>

			<Tooltip title="Left placement" placement="left">
				<button>Left</button>
			</Tooltip>

			{/* Different variants */}
			<Tooltip title="Primary solid tooltip" variant="solid" color="primary">
				<button>Primary</button>
			</Tooltip>

			<Tooltip title="Danger soft tooltip" variant="soft" color="danger">
				<button>Danger</button>
			</Tooltip>

			<Tooltip title="Success outlined tooltip" variant="outlined" color="success">
				<button>Success</button>
			</Tooltip>

			<Tooltip title="Warning plain tooltip" variant="plain" color="warning">
				<button>Warning</button>
			</Tooltip>

			{/* Different sizes */}
			<Tooltip title="Small tooltip" size="sm">
				<button>Small</button>
			</Tooltip>

			<Tooltip title="Medium tooltip" size="md">
				<button>Medium</button>
			</Tooltip>

			<Tooltip title="Large tooltip" size="lg">
				<button>Large</button>
			</Tooltip>

			{/* Controlled tooltip */}
			<Tooltip title="This is always visible" open>
				<button>Always visible</button>
			</Tooltip>

			{/* Tooltip with delay */}
			<Tooltip title="This appears after 1 second" enterDelay={1000}>
				<button>Delayed tooltip</button>
			</Tooltip>

			{/* Follow cursor */}
			<Tooltip title="This tooltip follows your cursor" followCursor>
				<button>Follow cursor</button>
			</Tooltip>

			{/* Interactive tooltip */}
			<Tooltip
				title={
					<div>
						This is an <strong>interactive</strong> tooltip with <a href="#">links</a>
					</div>
				}
				disableInteractive={false}
			>
				<button>Interactive tooltip</button>
			</Tooltip>
		</div>
	);
};

export default TooltipExample;
