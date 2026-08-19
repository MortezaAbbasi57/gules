# Modern Virtual Chemistry Laboratory — Stage 12

A scientific vertical slice for a modern virtual chemistry laboratory.

## Current scientific path

```text
Scientific Data Pack
→ Species Registry
→ Strong Electrolyte Dissociation
→ Homogeneous Transfer
→ H+/OH− Neutralization
→ Concentration
→ Water Autoionization
→ pH / pOH
→ Reaction Events
→ Indicator Visual State
→ Worker Protocol
```

## Reference experiment

- 50 mL HCl 0.1 M
- 50 mL NaOH 0.1 M
- first 25 mL acid transfer: pH ≈ 12.5228787 in target
- second 25 mL acid transfer: equivalence point, pH = 7.0 at 25 °C

## Run

```bash
npm test
npm run demo:cli
npm run serve
```

Then open `http://localhost:8080`.

## Architecture rules

- UI is not the scientific engine.
- React/browser code must not be the source of scientific truth.
- Experiments and parts are data-driven.
- Chemical amount is stored in moles.
- Internal scientific units are SI.
- Simulation time is independent of rendering frame rate.
- Scientific features require automated tests.
- Gemini/AI must never replace the deterministic chemistry solver.

## Scope

Stage 12 intentionally supports only strong acid/base chemistry at 25 °C. Weak acid/base equilibria, Ksp, thermal, gas, kinetics and electrochemistry are later milestones.
