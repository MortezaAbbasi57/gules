# Google AI Studio — Project Context

Before changing this repository, read:
1. `docs/research/README.md`
2. `docs/research/ARCHITECTURE_DECISIONS.md`
3. `docs/research/EVIDENCE_AND_OPEN_QUESTIONS.md`
4. `docs/research/stage-10-modern-architecture.md`
5. `docs/research/stage-11-working-prototype.md`
6. the research stage relevant to your requested code change

## Project mission
Build a scientifically accurate, data-driven modern virtual chemistry laboratory. The system is a scientific simulation engine with a UI, not a set of scripted animations.

## Hard boundaries
- React/UI must not become the authoritative chemistry solver.
- Scientific state belongs to the engine.
- Renderer consumes visual state derived from science; it does not decide chemistry.
- Experiments are data-driven and use one generic runtime.
- Parts are schema/prototype-driven.
- Amount is stored canonically in moles; SI units are used internally.
- Computed scientific properties are read-only.
- Simulation time is independent of render frame rate.
- Existing tests must not be deleted or weakened to get a passing build.
- Gemini may help authoring/tutoring but never calculates authoritative pH, equilibrium, precipitation, thermodynamics or electrochemistry.

## Stage lineage
- Stages 1–9: legacy evidence, reverse-engineering and compatibility findings.
- Stage 10: modern architecture specification.
- Stage 11: executable architecture proof with a real reference engine, worker-style protocol, conservation-safe transfer, property snapshots and a browser demo.
- Stage 12: first real chemistry vertical slice built on Stage 11.

Stage 11 is not optional background. Preserve its runtime boundaries while extending Stage 12/13.

## Evidence discipline
Research files explicitly distinguish confirmed, strong, inferred and unknown behavior. Do not turn unknown legacy behavior into invented constants. If a model is incomplete, surface the limitation and add a test/issue instead of silently approximating it.

## Current code milestone
Stage 12 supports a narrow but real strong-acid/base vertical slice. Preserve both Stage 11 architecture behavior and Stage 12 scientific behavior while extending the engine.

## Next milestone
Implement Stage 13 as a focused scientific change:
- weak acid/base equilibrium
- Ka/Kb data
- mass balance
- charge balance
- numerically stable root solving
- buffer behavior
- weak-acid titration
- graph sampling from engine state

Required reference case:
0.1 M acetic acid at 25 °C with Ka ≈ 1.7539e-5 should produce pH around 2.88 within an explicit test tolerance.

## Change protocol
Before coding: inspect relevant implementation + research files.
After coding: run tests, run the build if possible, report changed files, report failing tests and scientific limitations. Never claim an unexecuted test passed.