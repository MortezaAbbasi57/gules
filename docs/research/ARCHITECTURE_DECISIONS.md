# Architecture Decisions from Stages 1–10

## ADR-001 — Scientific engine separated from UI

**Status:** accepted

React/UI components may send commands and render returned state, but must not calculate authoritative pH, reaction extent, solubility, thermal state, electrochemistry, or other scientific truth.

## ADR-002 — Engine boundary

**Status:** accepted

The production scientific runtime should execute behind a worker/message boundary. Simulation time is authoritative. Rendering cadence is independent.

## ADR-003 — Scientific core target

**Status:** accepted

Production scientific core target: Rust compiled to WebAssembly, with native Rust builds for CLI/testing. The JavaScript engine in Stage 12 is a reference executable implementation, not the long-term authoritative solver.

## ADR-004 — Normalized experiment format

**Status:** accepted

CXC is a legacy import format, not the future internal authoring format.

Pipeline:

CXC → importer/migrator → normalized experiment → modern runtime.

Unknown legacy nodes/properties should be preserved for audit/round-trip compatibility rather than silently dropped.

## ADR-005 — Prototype + override parts

**Status:** accepted

Part definitions contain schema/defaults/actions/pads/visual rules. Part instances store identity, transform, contents and overrides. This preserves a proven Crocodile design strength without retaining its old XML architecture.

## ADR-006 — Canonical scientific units

**Status:** accepted

Internal units are SI. Chemical amount is canonicalized as mol. User-facing g, mL, °C and similar units are conversion/presentation concerns.

## ADR-007 — Interaction is an engine action

**Status:** accepted

Pointer gestures do not directly mutate chemistry. Pouring, drops, filling, stopper attachment, tube links, probe immersion and similar operations become validated engine actions.

## ADR-008 — Logical links separate from route geometry

**Status:** accepted

A tube/electrical connection is a logical graph edge between compatible endpoints. Visual path geometry is secondary and may reroute independently.

## ADR-009 — State-to-appearance renderer

**Status:** accepted

Scientific state is mapped to visual state: liquid/solid/gas layers, precipitate, bubbles, flame, phase and indicator appearance. The renderer does not determine chemistry.

## ADR-010 — Learning runtime observes scientific state

**Status:** accepted

Graph, guides, events and assessment consume engine properties/events. Assessment cannot alter scientific truth to force success.

## ADR-011 — AI role

**Status:** accepted

Gemini can be used for tutoring, hints, explanation, experiment authoring assistance and structured experiment-generation proposals. Generated content must pass schema and scientific validation. Gemini is not the solver.

## ADR-012 — Legacy correctness policy

**Status:** accepted

Scientific correctness outranks a demonstrated legacy numerical/data defect. Compatibility deviations must be documented and testable.
