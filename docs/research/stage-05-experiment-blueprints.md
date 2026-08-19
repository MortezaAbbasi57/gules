# Stage 05 — 143 Experiment Blueprints

## Corpus
- 143 chemistry lesson-kit files.
- 269 lesson scenes.
- 1524 top-level part instances.
- 194 unique part classes used across lesson kits.
- 400 links/connections.
- 20 graph instances.
- 79 guide engines with 477 steps.

## Blueprint model
Each experiment blueprint should be data, not a custom React page.

Recommended fields:
- metadata/title/category/source
- learning content blocks
- explicit equations
- inventory
- scene list
- part instances
- transforms and z-order
- property overrides
- initial scientific contents
- links/pads/routes
- candidate reactions
- property bindings
- graphs
- part trays
- guides
- assessment extensions

## Evidence rule
Explicit equations/text in lesson content are strong evidence of intended educational outcome. Candidate reactions inferred from starting contents are not proof that the legacy runtime will fire them under every condition.

## Key architectural implication
The modern product should implement one generic Experiment Loader:

Experiment JSON → Scene/Part Registry → Scientific Runtime → Learning Runtime → Renderer.

There must be no `switch(experimentTitle)` or one-page-per-experiment architecture.

## Migration goal
All 143 lessons should become normalized experiment records that run on the same generic engine.

## Validation
Each normalized blueprint should validate:
- unique IDs within scope
- known part class IDs
- valid initial species IDs
- valid link endpoints
- valid property references
- valid graph selectors
- valid guide highlights
- scientific data-pack version

## Authoring implication
Teacher-created experiments should serialize into the same normalized format as imported legacy lessons. Imported and native experiments must not require separate runtimes.