# Standard: Writing Style

Applies to English copy across the product: UI strings (`src/messages/en.json`), in-app page content (`src/app/**`), `README.md`, and `docs/`. Translated strings (`src/messages/ja.json`) follow natural Japanese conventions, not a literal translation of the English-specific rules below.

## Voice and Tone

- Plain and direct — describe what's happening (donations, routes, totals) rather than dressing it up
- Never promotional
  - Show impact through numbers and what actually happened, not adjectives
- Warm but not sentimental — this funds a charity ride, not a sales page
  - No urgency tactics, no guilt framing, no manufactured excitement
- Respectful of donors, guests, and the cause
  - No sensationalism around amounts, rankings, or comments
- Functional micro-copy (nav items, table headers, button labels) stays short and plain — it's too brief to carry tone and shouldn't try to

## Language

- Contractions where they read naturally in longer copy (descriptions, about pages: "it's", "doesn't"); short labels and headers stay contraction-free since they aren't full sentences
- No em dashes — repo-wide rule (see `AGENTS.md`); use a comma, full stop, or restructure
- No hyphens in compound modifiers where avoidable; rephrase if removing one creates ambiguity
- Numerals for all numbers ("15 days", not "fifteen days") — matches existing copy conventions (donation counts, day counts, dollar amounts)
- Australian/UK English: `-ise` not `-ize`, `-our` not `-or`, `-re` not `-er`, `artefact` not `artifact` — matches existing usage in `docs/` ("colour mode")

## Banned Patterns

Not a grammar check: a test of whether a person wrote this line, or a template did. A flagged word or pattern isn't an automatic fail; it's banned by default and has to earn its way back in by doing real, specific work in context. Read the line aloud. If it doesn't sound like something said to a person across a table, revise it.

Source: [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), plus patterns worth watching for in donation/charity copy specifically.

### Vocabulary tells

Avoid reflexively reaching for: delve, tapestry, pivotal, underscore, landscape, foster, testament, enhance, elevate, unlock, empower, seamless, robust, journey (as metaphor, not the literal cycling route), leverage, unparalleled, cutting-edge, state-of-the-art, next-level, game-changing, revolutionize, supercharge, holistic, synergy, realm, ever-evolving, world-class, best-in-class, incredible, amazing.

Any of these can survive if it names something concrete and true. "Robust" describing an actual property (tested against X, survives Y) is fine; "robust" as unearned seasoning is not.

### Structural tells

- Enthusiasm adjectives: "incredibly", "amazing", "powerful"
- Rule-of-three padding
  - Reflexive triplets ("fast, reliable, and scalable") standing in for one real claim
- Negative parallelism
  - "It's not just a tracker, it's a movement"
- Summary/closer phrases
  - "In summary," "Overall," "At the end of the day"
- No filler transitions ("furthermore", "in addition", "in conclusion", "as mentioned above")
- Vague hedged attribution
  - "Many believe," "it's often said," with no one actually saying it
- Generic section/CTA labels
  - "Why donate," "What we do," "Join the journey" where a specific label would say more
- Explanatory asides in parentheses
  - Work context into the sentence or cut it
- Paragraphs that restate the previous sentence

### Formatting tells

- Bold-word overuse mid-sentence standing in for real emphasis
- Title Case Headers where sentence case reads more natural
- Decorative emoji in headers, labels, or bullets
- Bullet lists for content that is actually one plain sentence

### Rhythm tells

- Every sentence the same length and cadence
  - Uniform short bursts, or uniform compound sentences
- Filler intensifiers doing no work: "truly," "genuinely," "really," stacked for emphasis instead of a specific detail
- Adjective stacking with no concrete referent: "innovative, dynamic, forward-thinking"

## Rationale

The primary reader is someone deciding whether to donate, or checking in on a friend's progress mid-ride. Copy needs to earn trust fast: concrete facts over enthusiasm, plain language over marketing voice. The cause speaks for itself; the writing doesn't need to inflate it.

## Reference

- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) — source for the Banned Patterns list
- Annotated before/after examples for this project's UI copy — not yet written; add once a first rewrite pass on existing strings is done
