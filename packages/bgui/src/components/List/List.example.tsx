import React from "react";
import { View, ScrollView } from "react-native";
import { List } from "./List";
import { ListItem } from "../ListItem";
import { Chip } from "../Chip";
import { IconButton } from "../IconButton";

/**
 * Example usage of List and ListItem components
 */
export const ListExamples = () => {
	return (
		<ScrollView>
			{/* Basic List */}
			<View style={{ marginBottom: 20 }}>
				<List aria-label="Basic list">
					<ListItem>Item 1</ListItem>
					<ListItem>Item 2</ListItem>
					<ListItem>Item 3</ListItem>
				</List>
			</View>

			{/* List with markers */}
			<View style={{ marginBottom: 20 }}>
				<List marker="disc" aria-label="List with disc markers">
					<ListItem>First item</ListItem>
					<ListItem>Second item</ListItem>
					<ListItem>Third item</ListItem>
				</List>
			</View>

			{/* Numbered list */}
			<View style={{ marginBottom: 20 }}>
				<List marker="decimal" aria-label="Numbered list">
					<ListItem>Step one</ListItem>
					<ListItem>Step two</ListItem>
					<ListItem>Step three</ListItem>
				</List>
			</View>

			{/* Interactive list items */}
			<View style={{ marginBottom: 20 }}>
				<List variant="outlined" color="primary" aria-label="Interactive list">
					<ListItem button onClick={() => console.log("Item 1 clicked")}>
						Clickable item 1
					</ListItem>
					<ListItem button onClick={() => console.log("Item 2 clicked")}>
						Clickable item 2
					</ListItem>
					<ListItem button disabled>
						Disabled item
					</ListItem>
				</List>
			</View>

			{/* List with decorators */}
			<View style={{ marginBottom: 20 }}>
				<List variant="soft" color="neutral" aria-label="List with decorators">
					<ListItem
						startAction={<Chip size="sm">New</Chip>}
						endAction={
							<IconButton size="sm" onClick={() => console.log("Edit")}>
								✏️
							</IconButton>
						}
					>
						Item with decorators
					</ListItem>
					<ListItem
						startAction={<Chip size="sm" color="success">Active</Chip>}
						endAction={
							<IconButton size="sm" onClick={() => console.log("Delete")}>
								🗑️
							</IconButton>
						}
					>
						Another decorated item
					</ListItem>
				</List>
			</View>

			{/* Nested list */}
			<View style={{ marginBottom: 20 }}>
				<List marker="circle" aria-label="Nested list">
					<ListItem>Parent item 1</ListItem>
					<ListItem nested>Nested item 1.1</ListItem>
					<ListItem nested>Nested item 1.2</ListItem>
					<ListItem>Parent item 2</ListItem>
					<ListItem nested>Nested item 2.1</ListItem>
				</List>
			</View>

			{/* Horizontal list */}
			<View style={{ marginBottom: 20 }}>
				<List orientation="horizontal" wrap variant="solid" color="primary" aria-label="Horizontal list">
					<ListItem>Tag 1</ListItem>
					<ListItem>Tag 2</ListItem>
					<ListItem>Tag 3</ListItem>
					<ListItem>Tag 4</ListItem>
				</List>
			</View>

			{/* Different sizes */}
			<View style={{ marginBottom: 20 }}>
				<List size="sm" variant="outlined" aria-label="Small list">
					<ListItem>Small item 1</ListItem>
					<ListItem>Small item 2</ListItem>
				</List>
			</View>

			<View style={{ marginBottom: 20 }}>
				<List size="lg" variant="outlined" aria-label="Large list">
					<ListItem>Large item 1</ListItem>
					<ListItem>Large item 2</ListItem>
				</List>
			</View>

			{/* Selected items */}
			<View style={{ marginBottom: 20 }}>
				<List aria-label="List with selection">
					<ListItem button>Regular item</ListItem>
					<ListItem button selected>
						Selected item
					</ListItem>
					<ListItem button>Another regular item</ListItem>
				</List>
			</View>
		</ScrollView>
	);
};