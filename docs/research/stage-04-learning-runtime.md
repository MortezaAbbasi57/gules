# Stage 04 — Property Binding, Graph, Flowchart and Guide Runtime

## Property associations
Presentation controls bind to part properties through references to a selected node and property name. Numeric, boolean, enum and text controls exist.

## Graph engine
- 20 lesson graph instances were identified.
- Up to four traces are supported in the observed legacy model.
- X axis may use global time, local part time/property, or a specific part property.
- Titration lessons bind X to burette level/added volume and Y to beaker pH.
- Graph sampling must use simulation-time scientific values, not browser frame timing.

## Guides
- 79 lessons contain dedicated instruction engines.
- 477 guide steps were extracted.
- Steps may include content plus highlights targeting whole parts or sub-controls.
- Navigation state includes next/previous/current page and visibility rules.

## Assessment reality
Legacy assessment is mostly text/question presentation. Structured attempts, answer validation, mastery and scoring are not present as a complete engine. The modern product should add them as a separate observer/validator layer instead of pretending they existed in Crocodile.

## Flowcharts
The legacy flowchart domain contains triggers, comparisons, delays, events, variables, decisions, property reads/writes and actions. Only a few chemistry lessons use it heavily, especially reaction-rate demonstrations.

Observed concepts include:
- start / repeat triggers
- button/event/receive triggers
- comparisons and branching
- delays
- variables and increment
- random/decision nodes
- find/read/set part properties
- call action
- stop/return

## Production architecture
Scientific engine → observable property bus → binding/graph/event/guide/assessment.

Learning runtime may request valid actions, but must not bypass scientific engine invariants.

## Modern modes
- Free Lab
- Guided Lab
- Practice
- Assessment

## Test requirements
- Property target resolution.
- Graph trace X/Y correctness.
- Guide highlight target resolution.
- Event threshold behavior.
- Assessment tolerance/attempt logging without altering scientific truth.