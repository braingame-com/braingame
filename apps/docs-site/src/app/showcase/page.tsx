"use client";

import React, { useState } from "react";
import {
	Button,
	Input,
	Checkbox,
	Switch,
	Select,
	Option,
	Card,
	Alert,
	Typography,
	Box,
	Stack,
	Textarea,
	Radio,
	RadioGroup,
} from "@braingame/bgui";

export default function ShowcasePage() {
	// State for interactive elements
	const [inputValue, setInputValue] = useState("");
	const [textareaValue, setTextareaValue] = useState("");
	const [checked, setChecked] = useState(false);
	const [switchOn, setSwitchOn] = useState(false);
	const [selectedValue, setSelectedValue] = useState("");
	const [radioValue, setRadioValue] = useState("option1");
	const [clickCount, setClickCount] = useState(0);

	return (
		<Box padding={4}>
			<Typography level="h1" gutterBottom>
				BGUI Component Showcase
			</Typography>
			<Typography level="body-md" color="neutral" gutterBottom>
				Interactive examples of the BGUI component library
			</Typography>

			<Stack spacing={4} marginTop={4}>
				{/* Buttons Section */}
				<Card>
					<Typography level="h3" gutterBottom>
						Buttons
					</Typography>
					<Stack direction="row" spacing={2}>
						<Button 
							variant="solid" 
							color="primary" 
							onClick={() => setClickCount(clickCount + 1)}
						>
							Primary ({clickCount} clicks)
						</Button>
						<Button variant="soft" color="neutral">
							Soft Neutral
						</Button>
						<Button variant="outlined" color="danger">
							Outlined Danger
						</Button>
						<Button variant="plain" color="success">
							Plain Success
						</Button>
						<Button disabled>
							Disabled
						</Button>
					</Stack>
				</Card>

				{/* Text Inputs Section */}
				<Card>
					<Typography level="h3" gutterBottom>
						Text Inputs
					</Typography>
					<Stack spacing={2}>
						<Input
							placeholder="Type something..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							fullWidth
						/>
						<Typography level="body-sm">
							You typed: {inputValue || "(nothing yet)"}
						</Typography>
						
						<Textarea
							placeholder="Write a longer message..."
							value={textareaValue}
							onChange={(e) => setTextareaValue(e.target.value)}
							rows={3}
							fullWidth
						/>
						<Typography level="body-sm">
							Message length: {textareaValue.length} characters
						</Typography>
					</Stack>
				</Card>

				{/* Checkboxes and Switches */}
				<Card>
					<Typography level="h3" gutterBottom>
						Toggles
					</Typography>
					<Stack spacing={2}>
						<Box>
							<Checkbox
								checked={checked}
								onChange={(e) => setChecked(e.target.checked)}
								label="Check me!"
							/>
							<Typography level="body-sm" marginLeft={4}>
								Checkbox is: {checked ? "checked ✓" : "unchecked"}
							</Typography>
						</Box>
						
						<Box>
							<Switch
								checked={switchOn}
								onChange={(e) => setSwitchOn(e.target.checked)}
							/>
							<Typography level="body-sm" display="inline" marginLeft={2}>
								Switch is: {switchOn ? "ON" : "OFF"}
							</Typography>
						</Box>
					</Stack>
				</Card>

				{/* Select Dropdown */}
				<Card>
					<Typography level="h3" gutterBottom>
						Select Dropdown
					</Typography>
					<Stack spacing={2}>
						<Select
							value={selectedValue}
							onChange={(e, value) => setSelectedValue(value)}
							placeholder="Choose an option..."
							fullWidth
						>
							<Option value="option1">First Option</Option>
							<Option value="option2">Second Option</Option>
							<Option value="option3">Third Option</Option>
							<Option value="amazing">Amazing Choice!</Option>
						</Select>
						{selectedValue && (
							<Alert color="success" variant="soft">
								You selected: {selectedValue}
							</Alert>
						)}
					</Stack>
				</Card>

				{/* Radio Buttons */}
				<Card>
					<Typography level="h3" gutterBottom>
						Radio Buttons
					</Typography>
					<RadioGroup
						value={radioValue}
						onChange={(e) => setRadioValue(e.target.value)}
					>
						<Radio value="option1" label="Option 1" />
						<Radio value="option2" label="Option 2" />
						<Radio value="option3" label="Option 3" />
					</RadioGroup>
					<Typography level="body-sm" marginTop={2}>
						Selected: {radioValue}
					</Typography>
				</Card>

				{/* Alert Examples */}
				<Card>
					<Typography level="h3" gutterBottom>
						Alerts
					</Typography>
					<Stack spacing={2}>
						<Alert color="primary" variant="soft">
							This is an informational alert
						</Alert>
						<Alert color="success" variant="outlined">
							Success! Everything worked perfectly.
						</Alert>
						<Alert color="warning" variant="solid">
							Warning: Please review before continuing
						</Alert>
						<Alert color="danger" variant="soft">
							Error: Something went wrong
						</Alert>
					</Stack>
				</Card>
			</Stack>
		</Box>
	);
}