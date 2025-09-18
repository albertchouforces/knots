import { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: "sheet-bend",
    knot: "sheet-bend",
    use: "Joining two ropes, especially of unequal diameter.",
    scenario: "While conducting replenishment-at-sea preparations aboard a Halifax-class frigate, you are tasked with securing a lightweight heaving line to a heavier nylon messenger line. The goal is to pass the messenger line across to the replenishment ship using a line-throwing device.",
    why: "The reef knot is ideal when tying together two ropes of equal size under light load. It lies flat, is easy to tie and untie, and is sufficient for short-term tasks where there’s no heavy pulling or dynamic tension.",
    image: "images/scenarios/KnotsGraphic.png"
  },
  {
    id: "reef-knot",
    knot: "reef-knot",
    use: "Tying two ropes of equal diameter together.",
    scenario: "During post-damage cleanup on the flight deck, you're tasked with securing together two equal-length heaving lines to extend their reach for recovering a flight deck safety net. Minimal strain is expected, and the lines will be manually handled.",
    why: "The reef knot is ideal when tying together two ropes of equal size under light load. It lies flat, is easy to tie and untie, and is sufficient for short-term tasks where there’s no heavy pulling or dynamic tension.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "figure-eight",
    knot: "figure-eight",
    use: "Preventing a rope from passing through a block or fairlead.",
    scenario: "While rigging signal halyards on the signal yard, you’re directed to tie stopper knots at the ends of the lines to prevent them from slipping back through fairleads during high winds.",
    why: "The figure of eight knot forms a bulky, non-jamming stopper that won’t pass through fairleads or blocks under load. It’s simple, effective, and preserves the integrity of the line.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "clove-hitch",
    knot: "clove-hitch",
    use: "Temporarily securing a rope to a spar, rail, or similar fitting.",
    scenario: "During man-overboard drills, you need to quickly secure a fender to a guardrail to prevent it from banging against the hull. The knot must hold temporarily and allow fast repositioning.",
    why: "The clove hitch can be tied rapidly and adjusted with ease, making it suitable for temporary fastening. However, it may slip under side load, so it’s best used when the pull is mostly vertical or for short-term use.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "rolling-hitch",
    knot: "rolling-hitch",
    use: "Securing a rope to a spar or another rope under directional strain.",
    scenario: "While recovering a fouled RHIB davit line, you're ordered to use a secondary rope to take the strain from the winch cable without disturbing the tension. You need the new line to grip securely under directional pull.",
    why: "The rolling hitch is designed to grip another line or object under directional tension. It resists slipping when load is applied in one direction, making it ideal for transferring or sharing load between ropes.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "round-turn-two-half-hitches",
    knot: "round-turn-two-half-hitches",
    use: "Securing a line to a spar, ring, or shackle.",
    scenario: "During rough weather, you’re ordered to secure a portable fuel tank to a ring bolt on the deck. The tie-down must hold firm through vibration and movement but also release quickly in case of emergency.",
    why: "This knot is secure under constant strain and won’t jam. It’s ideal for tying down gear or making fast to fixed points like bollards or padeyes, especially when reliability and quick release are important.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
  {
    id: "bowline",
    knot: "bowline",
    use: "Creating a secure, non-tightening loop at the end of a rope.",
    scenario: "During a man-overboard recovery drill, you’re instructed to tie a loop around a sailor’s torso for hoisting with a rescue davit. The loop must stay secure without tightening around the person.",
    why: "The bowline forms a fixed loop that won’t constrict under tension. It’s secure yet easy to untie, even after being loaded, making it a go-to knot for rescue and lifeline scenarios.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/HMCS_Regina_in_2025.jpg"
  },
];
