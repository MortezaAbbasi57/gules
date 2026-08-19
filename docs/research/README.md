# Crocodile Chemistry Reverse-Engineering Knowledge Base

This directory captures implementation-relevant findings from Stages 1–11 of the Crocodile Chemistry 605 reverse-engineering and modernization work.

## Purpose
The goal is not to reproduce legacy files blindly. The goal is to preserve proven architectural/scientific findings that guide the modern virtual chemistry laboratory and give Google AI Studio a reliable project context.

## Evidence labels
- **CONFIRMED** — directly observed in XML, binaries, lesson files, properties, or executable data.
- **STRONG** — multiple independent observations support the conclusion.
- **INFERRED** — plausible implementation model, but not fully proven.
- **UNKNOWN** — must be resolved by black-box testing or further analysis.

## Recommended read order for developers and AI agents
1. `ARCHITECTURE_DECISIONS.md`
2. `EVIDENCE_AND_OPEN_QUESTIONS.md`
3. `stage-10-modern-architecture.md`
4. `stage-11-working-prototype.md`
5. the earlier research stage relevant to the module being changed
6. matching files under `/research-data/`

## Stage documents
1. `stage-01-interaction-transfer.md` — selection, transforms, attachment, vessel transfer, tubes, stoppers, probes, burette/pipette behavior.
2. `stage-02-chemistry-solver.md` — 425 species, 592 reactions, acid/base, solubility, thermal, conductivity, equilibrium and reaction controls.
3. `stage-03-electrochemistry.md` — 116 half-reactions, Nernst behavior, Faraday constant and circuit coupling.
4. `stage-04-learning-runtime.md` — property binding, graphs, instructional guides and flowchart events/actions.
5. `stage-05-experiment-blueprints.md` — architecture for the 143 lesson kits and their 269 lesson scenes.
6. `stage-06-visual-engine.md` — procedural contents, precipitates, bubbles, flames and Atom Viewer.
7. `stage-07-authoring-editor.md` — commands, undo/redo, locks, scenes, custom parts and property editor.
8. `stage-08-cxc-format.md` — XML serialization, prototype+override loading, versioning, references and resources.
9. `stage-09-validation-tests.md` — static validation, scientific defects, security and compatibility gates.
10. `stage-10-modern-architecture.md` — normalized model, worker boundary, scientific modules and development order.
11. `stage-11-working-prototype.md` — executable proof of normalized experiment → engine state → worker protocol → conservation-safe transfer → property snapshot → browser renderer.

## Machine-readable research summaries
- `/research-data/species-summary.json`
- `/research-data/reactions-summary.json`
- `/research-data/half-reactions-summary.json`
- `/research-data/experiment-corpus-summary.json`
- `/research-data/compatibility-baseline.json`

These are research summaries/oracles, not production runtime databases.

## Non-negotiable implementation rules
1. UI is not the scientific engine.
2. Scientific state is authoritative and engine-owned.
3. Experiments are data-driven, not hard-coded React pages.
4. Parts are prototype/schema-driven with instance overrides.
5. Canonical chemical quantity is amount in moles.
6. SI units are used internally.
7. Simulation time is independent of render frame rate.
8. Links have logical connectivity independent of visual routing.
9. Computed scientific properties are read-only.
10. Legacy defects are documented but not copied when scientifically wrong.
11. Gemini/AI may assist authoring and tutoring, but must never replace the chemistry solver.
12. Every scientific feature requires automated tests and an explicit oracle.
13. The Stage 11 worker/action/snapshot boundary must remain intact as scientific modules grow.

## Implementation progression

```text
Stages 1–9: legacy evidence and compatibility findings
Stage 10: modern target architecture
Stage 11: executable architecture proof
Stage 12: first real chemistry vertical slice
Stage 13+: scientific expansion
```

## Current implementation baseline
Stage 12 code builds on Stage 11 and implements the first real scientific vertical slice:
- ScientificDataPack
- Species Registry
- strong electrolyte dissociation
- homogeneous liquid transfer
- H+/OH- neutralization
- concentration observables
- water autoionization
- pH / pOH at 25 °C
- reaction events
- indicator-derived visual state
- worker-style protocol

The next scientific milestone is weak acid/base equilibrium and titration. UI expansion should not outrun the scientific engine.

## Repository hygiene
Do not commit the original `Crocodile Chemistry 605.zip`, installed binaries, or bulk legacy copyrighted assets into this repository. Keep extracted implementation facts and normalized independently-created data/specifications only.