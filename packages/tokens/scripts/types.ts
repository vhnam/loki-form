/**
 * Type definitions for design tokens
 */

export type TokenType = "color" | "dimension" | "shadow";

export type Mode = {
  dark: string;
  light: string;
};

export type Extensions = {
  mode?: Mode;
};

export type Token = {
  $type: TokenType;
  $value: string;
  $description: string;
  $extensions: Extensions;
};

export type Shadow = {
  inset: boolean;
  color: string;
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
};

export type DesignTokens = {
  color?: {
    primitives?: Record<string, Token>;
    semantic?: Record<string, Token>;
  };
  foundations?: {
    radius?: Record<string, Token>;
    zIndex?: Record<string, Token>;
    breakpoint?: Record<string, Token>;
    spacing?: Record<string, Token>;
  };
  typography?: {
    primitives?: {
      "font-sizes": Record<string, Token>;
      "line-heights": Record<string, Token>;
      "font-weights": Record<string, Token>;
      "letter-spacings": Record<string, Token>;
      "font-families": Record<string, Token>;
    };
    semantic?: Record<string, Record<string, Token>>;
  };
  shadow?: Record<string, { $type: "shadow"; $value: Shadow[] }>;
};
