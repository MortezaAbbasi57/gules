# Crocodile Chemistry Reverse-Engineering Knowledge Base

This directory captures the implementation-relevant findings from Stages 1–10 of the Crocodile Chemistry 605 reverse-engineering study.

## Purpose

The goal is not to reproduce legacy files blindly. The goal is to preserve the proven architectural and scientific findings that should guide the modern virtual chemistry laboratory.

## Evidence labels

- **CONFIRMED** — directly observed in XML, binaries, lesson files, properties, or executable data.
- **STRONG** — multiple independent observations support the conclusion.
- **INFERRED** — plausible implementation model, but not fully proven.
- **UNKNOWN** — must be resolved by black-box testing or further analysis.

## Stage map

1. **Scene / Interaction / Transfer** — selection, transforms, attachment, vessel transfer, tubes, stoppers, probes, burette/pipette behavior.
2. **Chemistry Solver** — 425 species, 592 reactions, acid/base, solubility, thermal, conductivity, equilibrium, reaction controls.
3. **Electrochemistry** — 116 half-reactions, Nernst behavior, Faraday constant, galvanic/electrolytic coupling.
4. **Graph / Binding / Flowchart / Guide** — property bindings, graph traces, instructional steps, event/action flowcharts.
5. **143 Experiment Blueprints** — normalized inventory of all lesson kits and scene structure.
6. **Visual / Asset Engine** — procedural vessel contents, precipitates, bubbles, flames, atom viewer, palettes.
7. **Editor / Authoring Engine** — command model, undo/redo, locks, scene manager, custom parts, property editor.
8. **CXC Serialization** — XML format, prototype+override loading, versioning, references, embedded resources.
9. **Validation / Compatibility** — structural validators, scientific defects, negative fixtures, compatibility test matrix.
10. **Modern Architecture** — normalized experiment schema, worker boundary, module boundaries, implementation roadmap.

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
10. Legacy defects are documented but not copied when they are scientifically wrong.
11. Gemini/AI may assist authoring and tutoring, but must never replace the chemistry solver.
12. Every scientific feature requires automated tests and an explicit oracle.

## Current implementation baseline

Stage 12 code implements the first real scientific vertical slice:

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

The next scientific milestone should be weak acid/base equilibrium and titration, not UI expansion.
