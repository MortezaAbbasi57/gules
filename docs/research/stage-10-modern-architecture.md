# Stage 10 — Modern Architecture Specification

## Core rule
The product must be a scientific simulation platform, not a collection of scripted experiment animations.

## Runtime topology
Main thread:
- React product shell
- teacher/student UI
- input handling
- accessibility/RTL
- renderer orchestration

Dedicated worker:
- normalized document/scene state
- scientific engine
- property bus
- interaction actions
- graph sampling
- learning runtime validation

Optional 3D layer:
- Atom Viewer only; it does not own scientific truth.

Backend:
- identity/permissions
- experiment/version storage
- class/student results
- assets/telemetry

## Scientific modules
- math-core
- scientific-data registry
- chemistry-core
- thermal-core
- gas-core
- electrochem-core
- circuit-core
- interaction-core
- runtime orchestrator

## Product modules
- property bus
- learning runtime
- visual-state resolver
- 2D renderer
- atom viewer
- teacher authoring studio
- expert/domain studio
- CXC importer
- validation suite

## Normalized experiment model
`Experiment → metadata + scientificDataPack + resources + scenes + lesson + assessment + legacy provenance`

Scene contains parts, links, bindings, graphs and flow.

Part instances contain classId, transform, property overrides, initial contents and locks. Definitions live in a registry and use prototype inheritance.

## Internal units
Canonical amount = mol. Internal scientific units = SI. User-facing units are converted only at the presentation boundary.

## Suggested tick order
1. consume queued actions
2. transfer/attachment mutations
3. fast aqueous/speciation state
4. electrical solve
5. Faradaic extent
6. kinetic reactions
7. energy balance
8. phase changes
9. dissolution/precipitation
10. gas pressure/partial pressures
11. re-equilibrate if needed
12. derive observables: pH/pOH/conductivity/mass/volume/readings
13. produce visual state
14. graph/event/guide/assessment evaluation

## Determinism
- simulation time authoritative
- render frame independent
- deterministic scientific state
- seeded random visuals if needed

## Technology direction
Production scientific core: Rust compiled to WebAssembly, with native Rust builds for CLI/tests. Browser engine runs in a dedicated worker. UI must use typed message contracts and must not duplicate scientific equations.

## Development sequence
Schema → Importer → Scene/Property Kernel → Interaction → Chemistry → Thermal/Gas → Electrochemistry → Worker Runtime → Renderer → Learning Runtime → Assessment → Authoring → Atom Viewer → Legacy black-box parity → Production hardening.

## MVP definition
A credible MVP is not a few attractive scenes. It must complete the vertical path:
`Import/Load → Part/Contents → Transfer → Reaction → pH/temp/mass state → Visual State → Graph → Guide validation → Save/Reload` with automated tests.