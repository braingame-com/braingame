import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { AudioPlayer } from "./AudioPlayer";

describe("AudioPlayer", () => {
	it("renders metadata and source", () => {
		const { getByText } = renderWithTheme(
			<AudioPlayer
				source="https://cdn.example.com/audio.mp3"
				metadata={{ title: "Focus Mix", subtitle: "DJ Calm" }}
			/>,
		);

		expect(getByText("Focus Mix")).toBeTruthy();
		expect(getByText("DJ Calm")).toBeTruthy();
		expect(getByText("https://cdn.example.com/audio.mp3")).toBeTruthy();
	});

	it("invokes play/pause and rate callbacks", () => {
		const onPlayPause = jest.fn();
		const onRateChange = jest.fn();
		const { getByLabelText } = renderWithTheme(
			<AudioPlayer
				source="track"
				onPlayPause={onPlayPause}
				onRateChange={onRateChange}
				availableRates={[1, 1.5]}
			/>,
		);

		fireEvent.press(getByLabelText("Play"));
		expect(onPlayPause).toHaveBeenCalledTimes(1);

		fireEvent.press(getByLabelText("Change playback rate"));
		expect(onRateChange).toHaveBeenCalledWith(1.5);
	});
});
