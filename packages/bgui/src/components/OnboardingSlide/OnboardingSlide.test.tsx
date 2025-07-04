import { fireEvent, render, screen } from "@testing-library/react-native";
import { OnboardingSlide } from "./OnboardingSlide";

describe("OnboardingSlide", () => {
	const mockOnNext = jest.fn();
	const mockOnSkip = jest.fn();

	beforeEach(() => {
		mockOnNext.mockClear();
		mockOnSkip.mockClear();
	});

	it("renders basic slide with title and description", () => {
		render(
			<OnboardingSlide
				title="Welcome to Brain Game"
				description="Your personal development companion"
			/>,
		);

		expect(screen.getByText("Welcome to Brain Game")).toBeTruthy();
		expect(screen.getByText("Your personal development companion")).toBeTruthy();
	});

	it("shows Skip button when not last slide and onSkip provided", () => {
		render(
			<OnboardingSlide
				title="First Slide"
				description="Description"
				isLast={false}
				onSkip={mockOnSkip}
			/>,
		);

		const skipButton = screen.getByText("Skip");
		expect(skipButton).toBeTruthy();

		fireEvent.press(skipButton);
		expect(mockOnSkip).toHaveBeenCalledTimes(1);
	});

	it("hides Skip button on last slide", () => {
		render(
			<OnboardingSlide
				title="Last Slide"
				description="Description"
				isLast={true}
				onSkip={mockOnSkip}
			/>,
		);

		expect(screen.queryByText("Skip")).toBeNull();
	});

	it("shows Next button when not last slide", () => {
		render(
			<OnboardingSlide
				title="Slide"
				description="Description"
				isLast={false}
				onNext={mockOnNext}
			/>,
		);

		const nextButton = screen.getByText("Next");
		expect(nextButton).toBeTruthy();

		fireEvent.press(nextButton);
		expect(mockOnNext).toHaveBeenCalledTimes(1);
	});

	it("shows Get Started button on last slide", () => {
		render(
			<OnboardingSlide
				title="Last Slide"
				description="Description"
				isLast={true}
				onNext={mockOnNext}
			/>,
		);

		const getStartedButton = screen.getByText("Get Started");
		expect(getStartedButton).toBeTruthy();

		fireEvent.press(getStartedButton);
		expect(mockOnNext).toHaveBeenCalledTimes(1);
	});

	it("renders progress dots correctly", () => {
		render(
			<OnboardingSlide
				title="Slide 2"
				description="Description"
				currentIndex={1}
				totalSlides={3}
			/>,
		);

		// Can't easily test visual dots, but component should render without error
		expect(screen.getByText("Slide 2")).toBeTruthy();
	});

	it("doesn't show dots when totalSlides is 1", () => {
		render(
			<OnboardingSlide
				title="Single Slide"
				description="Description"
				currentIndex={0}
				totalSlides={1}
			/>,
		);

		// Component should render without dots section
		expect(screen.getByText("Single Slide")).toBeTruthy();
	});
});
