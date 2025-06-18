import { render } from "@testing-library/react-native";
import React from "react";
import { Breadcrumb, BreadcrumbItem } from "./";

describe("Breadcrumb", () => {
	it("renders children with default separator", () => {
		const { getByText, getByA11yRole } = render(
			<Breadcrumb>
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Dashboard</BreadcrumbItem>
			</Breadcrumb>,
		);

		expect(getByA11yRole("navigation")).toBeTruthy();
		expect(getByText("Home")).toBeTruthy();
		expect(getByText("Dashboard")).toBeTruthy();
		expect(getByText("/")).toBeTruthy();
	});

	it("supports custom separator", () => {
		const { getByText } = render(
			<Breadcrumb separator=">">
				<BreadcrumbItem>One</BreadcrumbItem>
				<BreadcrumbItem>Two</BreadcrumbItem>
			</Breadcrumb>,
		);

		expect(getByText(">")).toBeTruthy();
	});
});
