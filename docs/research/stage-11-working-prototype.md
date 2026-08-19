# Stage 11 — Working Technical Prototype

## Why Stage 11 matters
Stage 11 is the bridge between the architecture defined in Stage 10 and the scientific vertical slice implemented in Stage 12. It proves that the chosen boundaries can run end-to-end before adding broader chemistry.

## Implemented prototype path

```text
Normalized Experiment
→ Engine-owned State
→ Worker-style Message Contract
→ User Action
→ Conservation-safe Transfer
→ Property Snapshot
→ Browser Renderer
```

## Repository prototype structure
The Stage 11 prototype introduced an executable repository skeleton with these roles:
- experiment schema package
- engine protocol package
- executable reference engine
- browser Worker adapter
- browser demo
- experiment fixture
- Rust core / WASM skeleton

## Reference experiment
Two 100 mL beakers were used.

Source state:
- liquid volume: 80 mL
- H2O(l)
- Na+(aq): 0.008 mol
- Cl-(aq): 0.008 mol

Requested action:
- transfer 25 mL from source beaker to target beaker

Because the mixture is homogeneous:

```text
fraction = 25 / 80 = 0.3125
```

Expected transferred spectator-ion amounts:

```text
Na+ transferred = 0.0025 mol
Cl- transferred = 0.0025 mol
```

Expected post-transfer volumes:

```text
source = 55 mL
target = 25 mL
```

## Scientific invariants proven
- Liquid volume is conserved for a closed transfer with no modeled loss.
- Every transferred species is moved by the same homogeneous aliquot fraction.
- Species amount is conserved across source + target.
- Target vessel capacity limits accepted transfer volume.
- Engine state is authoritative; UI does not directly mutate chemical contents.
- Property snapshots are derived from engine state.
- Simulation speed does not alter the scientific result at equal simulation-time/actions.

## Automated validation
The Stage 11 executable reference prototype used six automated tests covering:
1. normalized experiment loading
2. species and volume conservation during a 25 mL transfer
3. target capacity clamping
4. worker-style transfer command execution
5. selected property snapshot retrieval
6. independence of scientific state from speed multiplier at equal simulation delta

Observed result at the time of Stage 11 work:

```text
6 tests
6 passed
0 failed
```

## Runtime boundary established
Stage 11 made this architectural rule executable rather than merely conceptual:

```text
UI != Scientific State
```

Browser/UI responsibilities:
- emit actions
- display returned state
- render visual projection

Engine responsibilities:
- own part/content state
- validate transfer
- mutate scientific state
- enforce capacity/conservation
- generate snapshots

## Rust/WASM status in Stage 11
The intended production direction remained Rust compiled to WebAssembly, with native Rust builds for CLI/tests. A Rust/WASM source skeleton was created, but the generation environment did not have a working Rust toolchain, so it was not falsely reported as compiled.

The executable Stage 11 reference engine was JavaScript/Node so the architecture and invariants could be tested immediately.

## Relationship to Stage 12
Stage 12 extends this exact end-to-end path by adding real chemistry:

```text
Stage 11:
transfer + conservation + state + protocol

Stage 12:
Stage 11 foundation
+ ScientificDataPack
+ Species Registry
+ strong-electrolyte dissociation
+ H+/OH- neutralization
+ concentration
+ water autoionization
+ pH / pOH
+ reaction events
+ indicator visual state
```

Therefore Stage 12 must not bypass or replace the Stage 11 engine/worker/state boundaries.

## Compatibility requirements for future stages
1. Preserve engine-owned scientific state.
2. Preserve action/message boundary between UI and simulation.
3. Preserve conservation tests while adding reactions/equilibria.
4. Extend the scientific core rather than putting formulas into React.
5. Keep fixtures deterministic.
6. Add new state observables through snapshots/property bus instead of ad-hoc UI state.
7. A scientific failure must be surfaced, not hidden by renderer behavior.

## Stage 11 is not a legacy reverse-engineering stage
Stages 1–10 primarily analyze the legacy product and define the modern architecture. Stage 11 is the first executable implementation proof. For that reason it belongs in the project Knowledge Base even though it is not part of the legacy binary analysis.