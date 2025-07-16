import { createStyled } from "@mui/system";
import defaultTheme from "./defaultTheme";
import THEME_ID from "./identifier";
import type { Theme } from "./types";

const styled = createStyled<Theme>({ defaultTheme, themeId: THEME_ID });

export default styled;
