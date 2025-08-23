"use client";

import {
	Alert,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	Chip,
	CircularProgress,
	Container,
	Divider,
	IconButton,
	Input,
	LinearProgress,
	Link,
	List,
	ListItem,
	Modal,
	Option,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Stack,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Textarea,
	Tooltip,
	Typography,
} from "@braingame/bgui";
import { useState } from "react";

export default function ShowcasePage() {
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const [switchChecked, setSwitchChecked] = useState(false);
	const [radioValue, setRadioValue] = useState("option1");
	const [selectValue, setSelectValue] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [textareaValue, setTextareaValue] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [tabValue, setTabValue] = useState(0);

	return (
		<Container style={{ padding: 20 }}>
			<Typography level="h1" style={{ marginBottom: 40 }}>
				BGUI Component Showcase
			</Typography>

			{/* Simple hello world Typography */}
			<Typography level="h1" style={{ marginBottom: 20 }}>
				hello world
			</Typography>

			<Stack spacing={4}>
				{/* Typography Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Typography Examples
					</Typography>
					<Stack spacing={1}>
						<Typography level="h1">Heading 1</Typography>
						<Typography level="h2">Heading 2</Typography>
						<Typography level="h3">Heading 3</Typography>
						<Typography level="body-lg">Body Large</Typography>
						<Typography level="body-md">Body Medium</Typography>
						<Typography level="body-sm">Body Small</Typography>
					</Stack>
				</section>

				<Divider />

				{/* Buttons Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Button Examples
					</Typography>
					<Stack direction="row" spacing={2} style={{ flexWrap: "wrap" }}>
						<Button variant="solid" color="primary">
							Solid Primary
						</Button>
						<Button variant="outlined" color="primary">
							Outlined
						</Button>
						<Button variant="soft" color="primary">
							Soft
						</Button>
						<Button variant="plain" color="primary">
							Plain
						</Button>
						<IconButton aria-label="Settings">⚙️</IconButton>
					</Stack>
				</section>

				<Divider />

				{/* Form Controls Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Input Examples
					</Typography>
					<Stack spacing={3}>
						<Box>
							<Input
								placeholder="Enter text..."
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						</Box>
						<Box>
							<Textarea
								placeholder="Enter multiline text..."
								value={textareaValue}
								onChange={(e) => setTextareaValue(e.target.value)}
								style={{ minHeight: "80px" }}
							/>
						</Box>
						<Box>
							<Select
								placeholder="Choose an option"
								value={selectValue}
								onChange={(_, value) => setSelectValue(value || "")}
							>
								<Option value="option1">Option 1</Option>
								<Option value="option2">Option 2</Option>
								<Option value="option3">Option 3</Option>
							</Select>
						</Box>
						<Box>
							<Checkbox
								checked={checkboxChecked}
								onChange={(e) => setCheckboxChecked(e.target.checked)}
								label="Checkbox option"
							/>
						</Box>
						<Box>
							<Switch
								checked={switchChecked}
								onChange={(e) => setSwitchChecked(e.target.checked)}
							/>
						</Box>
						<Box>
							<RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
								<Radio value="option1" label="Radio Option 1" />
								<Radio value="option2" label="Radio Option 2" />
								<Radio value="option3" label="Radio Option 3" />
							</RadioGroup>
						</Box>
					</Stack>
				</section>

				<Divider />

				{/* Display Components Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Display Components
					</Typography>
					<Stack spacing={3}>
						<Stack direction="row" spacing={2}>
							<Avatar>JD</Avatar>
							<Avatar src="https://via.placeholder.com/40" alt="User avatar" />
						</Stack>
						<Stack direction="row" spacing={2}>
							<Badge badgeContent={4} color="primary">
								<Box style={{ padding: 8, background: "#f0f0f0" }}>Badge</Box>
							</Badge>
							<Chip label="Chip Default" />
							<Chip label="Chip Primary" color="primary" />
						</Stack>
						<Alert color="info">This is an info alert</Alert>
						<Alert color="success">This is a success alert</Alert>
						<Alert color="warning">This is a warning alert</Alert>
						<Alert color="danger">This is a danger alert</Alert>
					</Stack>
				</section>

				<Divider />

				{/* Progress Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Progress Indicators
					</Typography>
					<Stack spacing={3}>
						<CircularProgress />
						<LinearProgress />
						<Skeleton variant="text" width="100%" height={20} />
						<Skeleton variant="rectangular" width="100%" height={100} />
					</Stack>
				</section>

				<Divider />

				{/* Layout Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Card Examples
					</Typography>
					<Stack spacing={3}>
						<Card>
							<Typography level="h3">Card Title</Typography>
							<Typography level="body-md">
								This is a card component that can contain any content.
							</Typography>
						</Card>
						<Stack direction="row" spacing={2} style={{ flexWrap: "wrap" }}>
							<Box style={{ background: "#f0f0f0", padding: 16, minWidth: 150 }}>Grid Item 1</Box>
							<Box style={{ background: "#f0f0f0", padding: 16, minWidth: 150 }}>Grid Item 2</Box>
							<Box style={{ background: "#f0f0f0", padding: 16, minWidth: 150 }}>Grid Item 3</Box>
						</Stack>
					</Stack>
				</section>

				<Divider />

				{/* Navigation Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Navigation
					</Typography>
					<Stack spacing={3}>
						<Box>
							<Link href="#">This is a link</Link>
						</Box>
						<List>
							<ListItem>List Item 1</ListItem>
							<ListItem>List Item 2</ListItem>
							<ListItem>List Item 3</ListItem>
						</List>
						<Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
							<TabList>
								<Tab>Tab 1</Tab>
								<Tab>Tab 2</Tab>
								<Tab>Tab 3</Tab>
							</TabList>
							<TabPanel value={0}>
								<Typography>Content for Tab 1</Typography>
							</TabPanel>
							<TabPanel value={1}>
								<Typography>Content for Tab 2</Typography>
							</TabPanel>
							<TabPanel value={2}>
								<Typography>Content for Tab 3</Typography>
							</TabPanel>
						</Tabs>
					</Stack>
				</section>

				<Divider />

				{/* Interactive Section */}
				<section>
					<Typography level="h2" style={{ marginBottom: 20 }}>
						Interactive Components
					</Typography>
					<Stack spacing={3}>
						<Box>
							<Tooltip title="This is a tooltip">
								<Button variant="outlined">Hover for tooltip</Button>
							</Tooltip>
						</Box>
						<Box>
							<Button variant="solid" onClick={() => setModalOpen(true)}>
								Open Modal
							</Button>
							<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
								<Box
									style={{
										background: "white",
										padding: 24,
										borderRadius: 8,
										minWidth: 300,
									}}
								>
									<Typography level="h3" style={{ marginBottom: 16 }}>
										Modal Title
									</Typography>
									<Typography level="body-md" style={{ marginBottom: 16 }}>
										This is modal content.
									</Typography>
									<Button onClick={() => setModalOpen(false)}>Close</Button>
								</Box>
							</Modal>
						</Box>
					</Stack>
				</section>
			</Stack>
		</Container>
	);
}
