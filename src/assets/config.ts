import {
  DEFAULT_COLOURS,
  DEFAULT_COMPONENTS,
  DEFAULT_OUTPUT_PATH,
} from "./vars";

export type TinchiConfig = {
  /** output path */
  outputPath: string;
  config: {
    /** Whether you want to include the Header with info about the tinchi version */
    head: boolean;
    /** Whether you want to minify the css */
    minify: boolean;
    /** Whether you want the css to support prefer-color-scheme */
    colorScheme: "both" | "dark" | "light";
  };

  /** config for the default colours */
  colors: Record<keyof typeof DEFAULT_COLOURS, string>;
  /** Whether you want to include or exclude certain components */
  components: Record<keyof typeof DEFAULT_COMPONENTS, boolean>;
};

export const DEFAULT_CONFIG: TinchiConfig = {
  outputPath: DEFAULT_OUTPUT_PATH,
  config: {
    head: true,
    minify: false,
    colorScheme: "both",
  },
  colors: DEFAULT_COLOURS,
  components: DEFAULT_COMPONENTS,
};
