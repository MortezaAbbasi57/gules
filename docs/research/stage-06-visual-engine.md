# Stage 06 — Visual and Asset Engine

## Asset corpus
Approximately 1400 image files were inventoried, but the core chemistry visuals are not simply bitmap-per-state. Glassware, contents and many effects are procedural/state-driven.

## Confirmed visual-state concepts
- vessel outline/geometry
- solid layers
- liquid layers
- gaseous layers
- dispersed/suspended layers
- burning layers
- bubble sources
- pop/explosion outcomes
- streams

Legacy output classes include concepts analogous to `SolidLayerOutput`, `LiquidLayerOutput`, `GasLayerOutput`, `BubbleLayerOutput` and `StreamOutput`.

## Species appearance data
The species database includes appearance fields such as solution colour, concentration thresholds, flame colour, molecular-viewer colour/size and lattice hints.

Example: Cu2+ solution colour changes with concentration rather than selecting one fixed bitmap.

## Precipitate rendering
Precipitation should come from scientific solid amount/state → precipitate/solid layer visual state → renderer. Never hard-code an AgCl animation into an experiment page.

## Bubble engine
Multiple bubble sprite sizes exist, but activation/location/rate are runtime states. Gas production should drive bubble source state.

## Flame engine
Bunsen flame is procedural/state-responsive. Reactions/species can provide flame colour and flame height/state hints.

## Atom Viewer
A separate 3D molecular-view layer exists with gas/liquid/precipitate layouts and lattice types such as CCP/HCP/SC. The modern Atom Viewer should remain separate from the main 2D simulation solver.

## Production architecture
Scientific State → Appearance Resolver → Visual State → Renderer.

Renderer must never decide chemistry.

## Visual regression policy
Scientific/state parity is more important than pixel-identical rendering. Snapshot tests should validate state mapping first; screenshot/pixel tolerances are secondary.