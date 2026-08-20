# Stage 03 — Electrochemistry Engine

## Confirmed architecture
Chemical electrodes bridge chemistry state to an electrical circuit model. Legacy electrodes contain hidden electrical elements such as EMF source, resistance, switch state and terminals.

## Half-reaction database
- 116 half-reactions identified.
- 29 were identified as cell-eligible in the extracted dataset.
- Melt-specific branches exist for electrolysis.

## Verified scientific behavior
Nernst behavior was verified against a saved Zn/Cu lesson state.

Reference case:
- Zn2+ = 0.1 M
- Cu2+ = 1.38 M
- T ≈ 298.15 K
- expected cell voltage ≈ 1.1347 V

Observed legacy and calculated values agreed to roughly 1e-4 V scale.

## Faraday coupling
The legacy engine contains Faraday constant approximately 96485 and uses current × time / (F × electron count) style extent logic for electrolysis/deposition.

## Galvanic pipeline
1. detect immersed electrodes
2. gather compatible half-reactions
3. calculate electrode potentials
4. select oxidation/reduction directions
5. derive polarity
6. expose EMF/resistance to circuit solver
7. solve current
8. feed current back to chemistry
9. update species/electrode mass

## Electrolytic pipeline
1. external voltage establishes polarity
2. candidate half-reactions are filtered by solution/melt and conditions
3. competition selects electrode processes
4. circuit determines current
5. Faraday extent updates products, plating and dissolution

## Salt bridge
Salt bridge has logical direction, ion species and optional ion-transfer visualization. It should be modeled as ionic path state, not a decorative graphic.

## Legacy guard
The engine reports unsupported electrochemistry when too many electrodes participate in one system; extracted evidence clearly supports one- or two-electrode handling.

## Production tests
- Nernst Zn/Cu within declared voltage tolerance.
- Faraday deposition mass conservation.
- Half-reaction charge consistency.
- Molten-salt branch.
- Salt-bridge path gating.
- Electrode-material-dependent competition.

## Unresolved
- Exact competition weighting between multiple candidate half-reactions.
- Exact geometry/conductivity mapping to effective resistance.
- Whether overpotential/polarization is modeled beyond observed rules.

Production code must keep these uncertainties explicit.