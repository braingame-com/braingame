import React from "react";
import { render } from "../../test-utils";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";

describe("Breadcrumb", () => {
	it("renders items with separators", () => {
		const { getByText } = render(
			<Breadcrumb>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem>Library</BreadcrumbItem>
			</Breadcrumb>,
		);
		expect(getByText("Home")).toBeTruthy();
		expect(getByText("Library")).toBeTruthy();
	});

	it("collapses items when maxItems exceeded", () => {
		const { getByText } = render(
			<Breadcrumb maxItems={2}>
				<BreadcrumbItem href="/">Home</BreadcrumbItem>
				<BreadcrumbItem href="/cat">Cat</BreadcrumbItem>
				<BreadcrumbItem>Page</BreadcrumbItem>
			</Breadcrumb>,
		);
		expect(getByText("...")).toBeTruthy();
		expect(getByText("Page")).toBeTruthy();
	});
});
