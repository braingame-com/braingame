import AspectRatio, { type AspectRatioOwnerState } from "@mui/joy/AspectRatio";
import { expectType } from "@mui/types";

<AspectRatio
	slots={{
		root: "div",
		content: "div",
	}}
/>;

<AspectRatio
	slotProps={{
		root: {
			component: "div",
			"data-testid": "test",
		},
		content: {
			component: "div",
			"data-testid": "test",
		},
	}}
/>;

<AspectRatio
	slotProps={{
		root: (ownerState) => {
			expectType<AspectRatioOwnerState, typeof ownerState>(ownerState);
			return {
				"data-testid": "test",
			};
		},
		content: (ownerState) => {
			expectType<AspectRatioOwnerState, typeof ownerState>(ownerState);
			return {
				"data-testid": "test",
			};
		},
	}}
/>;
