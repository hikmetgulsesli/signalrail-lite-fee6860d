---
name: SignalRail Lite
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f25'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303036'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#fff9ef'
  on-secondary: '#3a3000'
  secondary-container: '#ffdb3c'
  on-secondary-container: '#725f00'
  tertiary: '#fff6f5'
  on-tertiary: '#680019'
  tertiary-container: '#ffd0d1'
  on-tertiary-container: '#c10037'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920027'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
typography:
  display-lg:
    fontFamily: Space Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Space Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  panel-padding: 20px
---

## Brand & Style
The design system is engineered for high-velocity, high-stakes rail timing. The brand personality is **Cyber-Industrial**: precise, urgent, and technically advanced. It evokes the feeling of operating a high-speed transit interface in a futuristic megalopolis.

The design style is a hybrid of **Minimalist Cyberpunk** and **Glassmorphism**. It utilizes a deep, obsidian backdrop to allow high-intensity neon accents to "pop" with maximum luminance. Visuals are intentionally sharp and structured, mimicking a heads-up display (HUD) rather than a traditional app. The emotional response is one of focused adrenaline and mechanical reliability.

## Colors
This design system operates exclusively in **Dark Mode** to preserve player night vision and emphasize the glow effects of critical game signals.

- **Primary (Electric Blue):** Used for active rails, safe zones, and player progress. It represents "Go" and system health.
- **Secondary (Signal Yellow):** Used for warnings, pending switches, and upcoming obstacles. It represents "Caution."
- **Tertiary (Emergency Red):** Reserved for danger, collisions, and remaining lives. It represents "Stop" or "Critical Failure."
- **Neutral (Obsidian/Navy):** The foundation of the UI. Backgrounds use a near-black navy to provide depth without being a flat hex-black.

## Typography
The typography strategy prioritizes "instrument cluster" aesthetics and rapid data processing.

- **Headlines:** Uses a bold, geometric monospaced font to mimic digital readouts. All headlines should be uppercase to reinforce the industrial, urgent tone.
- **Body:** A clean, contemporary sans-serif ensures that game instructions and lore are readable amidst the visual chaos of gameplay.
- **Labels/Data:** Monospaced fonts are used for all numerical data (timers, scores, coordinates) to prevent layout shifting during rapid value updates.

## Elevation & Depth
Depth in the design system is achieved through **Luminance and Translucency** rather than traditional shadows.

- **Glassmorphism:** All UI panels use a semi-transparent background (approx. 60% opacity) with a high-intensity backdrop blur (20px+). This keeps the game world visible behind the UI.
- **Glow Borders:** High-elevation elements (like active buttons or critical alerts) feature a 1px solid border in the primary or tertiary color with a subtle outer glow (4px - 8px spread) of the same hue.
- **Tonal Layers:** Secondary containers use a slightly lighter navy than the background to create a subtle "stepped" hierarchy without breaking the dark aesthetic.

## Shapes
The shape language is strictly **Sharp and Angular**. 

- **Corners:** 0px radius is the default for all buttons, panels, and indicators to maintain the aggressive, technical feel.
- **Bevels:** Occasionally, 45-degree clipped corners (chamfers) may be used on large panel headers to reinforce the "industrial plate" aesthetic.
- **Lines:** All dividers and borders must be crisp 1px or 2px lines. No soft gradients or rounded caps.

## Components
- **Glowing Buttons:** Rectangular, sharp-edged, with a 1px primary color border. On hover or active state, the border glow intensifies, and the text gains a slight chromatic aberration effect.
- **HUD Chips:** Small, monospaced data tags used for speed, distance, and score. They feature a semi-transparent background and a left-aligned vertical accent bar in the primary color.
- **Translucent Panels:** The main containers for menus. They use the obsidian-glass style with a thin light-blue "top-bar" to indicate the panel title.
- **Signal Indicators:** Circular or diamond-shaped icons that pulsate when active. They use the Signal Yellow or Emergency Red colors to demand immediate attention.
- **Health/Lives Bar:** A segmented progress bar. As segments are lost, they flicker and turn from Electric Blue to Emergency Red before disappearing.
- **Input Fields:** Minimalist underlines in Electric Blue. When focused, the entire field background gains a 10% opacity blue tint.