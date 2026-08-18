import type { Guide } from "./guides-data";

/**
 * Guide content batch 5 — the P2 community and authority tier.
 *
 * These 8 fill the community-and-tricks gap: three trick tutorials to sit
 * alongside the ollie and kickflip pieces from batch 4, a trick-name
 * glossary to be the reference the rest of the site links back to, a
 * measured history piece, a factual profile of the Fast Fingers World
 * Championship, and three lifestyle guides (winter/snow, clubs, filming)
 * that competitors either don't cover at all (winter, filming) or cover
 * as one-off blog posts (clubs).
 *
 * The trick tutorials, history, and Fast Fingers piece are the ones this
 * audience will read with the sharpest eye — where a wrong detail costs
 * more credibility than the page earns. Every specific date, name and
 * head count in the Fast Fingers section is either sourced from
 * blackriver-shop.com's own blog or explicitly hedged as approximate.
 */
export const guidesBatch5: Guide[] = [
  // ============================================================
  // 1. HOW TO GRIND
  // ============================================================
  {
    slug: "how-to-grind-on-a-fingerboard",
    title: "How to Grind on a Fingerboard: Board Slides and Truck Locks",
    metaTitle: "How to Grind on a Fingerboard: Board Slides & Truck Locks",
    metaDescription:
      "How to grind on a fingerboard. The three trick families - truck-locks, board slides and lipslides - with finger placement, wax and approach for each.",
    category: "Reference",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Grinding on a fingerboard means sliding some part of the deck or trucks along an obstacle edge, and it's the trick family that turns a rolling toy into a proper skate simulator. There are three fundamental grinds — truck-locks, board slides and lipslides — and they behave completely differently. Truck-locks are the easiest and land the most consistently. Board slides feel skate-like but demand well-waxed ledges. Lipslides look best in videos and are the hardest to lock in cleanly. This guide covers the finger placement and approach for each.",
    sections: [
      {
        heading: "What a grind actually is at fingerboard scale",
        body: [
          "A grind puts a specific part of the board — the trucks, the deck's underside, or the deck's edge — onto an obstacle so that the board slides along the length of the obstacle rather than rolling over it. The wheels are off the surface for the duration of the grind; the sliding surface is the trick.",
          "At full-size skateboard scale, grinds are what happens when the trucks or deck edge lock against a curb, ledge or rail. Fingerboards work exactly the same way — a well-set-up truck can lock onto a metal rail almost identically to how a real skateboard truck locks against a curb.",
          "Three things make grinds work: the ollie or pop that gets the board onto the obstacle, the alignment when it lands, and the surface preparation on the obstacle. Miss any one and the trick fails at that point rather than partway through.",
        ],
      },
      {
        heading: "Truck-locks — start here",
        body: [
          "A truck-lock is when one or both trucks land directly on top of an obstacle edge and the truck axles grip the edge on both sides. On a rail, the truck hangs across the metal; on a ledge, the truck sits with the axle against the edge and the wheel hanging off the far side.",
          "This is the easiest grind family to learn because the truck itself is doing the locking. Once the truck is on the obstacle, it grips almost automatically — your finger only has to keep the deck level and provide forward push.",
          "The two common truck-locks are the 50-50 (both trucks on the obstacle, deck parallel to it) and the 5-0 (only the back truck on, deck tilted up at the front). The 50-50 is the easiest first grind — approach the rail or ledge at a 20–30 degree angle, ollie onto it so both trucks land, hold forward momentum through the slide, and pop off the end.",
        ],
      },
      {
        heading: "Board slides — the ledge-only grind family",
        body: [
          "A board slide (or 'boardslide') puts the underside of the deck itself onto the obstacle — no truck contact. The deck slides across, with the trucks hanging off either side of the ledge or rail.",
          "Board slides only work on obstacles with a well-waxed sliding surface. A dry wooden ledge or rail will grab the deck's underside and stop it dead. If your board slides feel like they instantly stick when they should slide, the answer is not more practice — it's more wax.",
          "The setup: approach at a shallow angle (15–20 degrees). Ollie so the deck lands perpendicular to the obstacle, with the trucks hanging off both sides. Keep your finger centred on the deck and let momentum carry it. Pop off cleanly at the end by pressing down on the tail as you exit.",
        ],
      },
      {
        heading: "Lipslides — for videos, not for learning",
        body: [
          "A lipslide is a board slide that starts with the board rotating over the obstacle rather than under it — the deck approaches from the near side of the ledge, rotates over the top, and lands on it in board-slide position.",
          "Lipslides look better on camera than either previous grind because the rotation is visually dramatic. But they combine everything harder: a perfectly timed 180-degree pop, exact placement over the ledge, and the same wax-dependent slide as a board slide.",
          "Do not start here. Learn 50-50s first, then board slides, then lipslides. Attempting a lipslide as a first grind means practising three things at once and none of them well.",
        ],
      },
      {
        heading: "Wax matters more than technique on most grinds",
        body: [
          "The single most common cause of failing grinds is under-waxed obstacles. A grind that stops halfway across a ledge, or one where the deck lands correctly and then just doesn't slide, is almost always a wax problem — not a technique problem.",
          "Rubbing a small block of skate wax along the length of the obstacle takes ten seconds. Do this before every session. On rails, wax the top and both sides where truck axles will contact. On ledges, wax the top surface where the deck bottom slides.",
          "The reverse mistake: over-waxing. If your board flies off the far end of the ledge before you can control it, wipe the surface with a dry cloth. Thin, even coats are what you want.",
        ],
      },
      {
        heading: "Approach angle — the geometry that decides everything",
        body: [
          "The angle at which you approach an obstacle determines whether the grind is possible at all. Straight-on approaches (90 degrees to the obstacle) mean the deck has no place to slide — it just impacts and stops.",
          "The workable range is 15–30 degrees off perpendicular. Steeper than that and the deck hits the obstacle rather than rolling along it. Shallower and you don't have enough sideways travel to engage the trick.",
          "Practice by placing the obstacle on your desk and rolling the deck (no trick, just rolling) at different angles until you find the sweet spot where the trucks contact the obstacle cleanly. That angle is your grind approach angle, and it's the same for every truck-lock.",
        ],
      },
      {
        heading: "How to fail productively",
        body: [
          "Every rider fails hundreds of grinds while learning them. The failures cluster into a small number of patterns, and diagnosing which pattern you're in speeds up learning more than any tutorial trick can.",
          "If the board never gets onto the obstacle: your ollie is too weak. Practice ollies to the height of the obstacle before adding the grind attempt.",
          "If the board lands on the obstacle and immediately falls off: your approach angle is wrong (too straight or too shallow), or your landing weight is off-centre.",
          "If the board lands and sticks: wax the obstacle, or add wax if it's already there.",
          "If the board slides but you fall off the far end: you're not popping out. Grinds end when you press down on the tail at the end of the obstacle to lift the front trucks off — practice this as a separate motion.",
        ],
      },
    ],
    table: {
      title: "The three grind families in one glance",
      columns: ["Grind type", "What contacts the obstacle", "Difficulty", "Best for"],
      rows: [
        ["50-50", "Both trucks locked on top", "Easiest — start here", "Rails and ledges. Very consistent once dialled."],
        ["5-0", "Back truck only, front lifted", "Medium", "Ledges. Style points on video."],
        ["Board slide", "Underside of deck", "Medium-hard (needs wax)", "Waxed ledges only. Skate-like feel."],
        ["Nose/tail slide", "Nose or tail underside", "Hard", "Waxed ledges. Rewards precision."],
        ["Lipslide", "Deck bottom, from far side", "Hardest of these", "Video content, not learning."],
      ],
    },
    faqs: [
      {
        q: "What's the easiest grind to learn first?",
        a: "The 50-50 — both trucks locked onto the obstacle, deck parallel. The truck geometry does most of the locking work; your finger only has to keep the deck level and push it forward. Land ten of these before trying anything else.",
      },
      {
        q: "Why won't my board slide across the ledge?",
        a: "Almost always wax. A dry ledge grabs the deck's underside and stops it dead. Rub a small block of skate wax along the top of the ledge, run your board across it a few times to spread the wax, then try again.",
      },
      {
        q: "Do I need a metal rail for grinds?",
        a: "No. Wood or plastic rails work; metal rails give a more consistent slide with less wax. If you're just starting, whatever rail you already have is fine — the technique is more important than the material at this stage.",
      },
      {
        q: "What approach angle should I use for a grind?",
        a: "15–30 degrees off perpendicular to the obstacle. Straight-on approaches don't work — the deck has no room to slide along the length. Shallow approaches (5–10 degrees) miss the trick entirely.",
      },
      {
        q: "Do I need to know how to ollie before learning to grind?",
        a: "Yes. Every grind starts with getting the deck onto the obstacle, which is an ollie. Weak ollies mean the deck doesn't clear the top of the ledge or rail. Land clean ollies to obstacle height first.",
      },
    ],
    related: [
      "how-to-ollie-on-a-fingerboard",
      "how-to-kickflip-on-a-fingerboard",
      "fingerboard-grind-rail-setup-and-wax",
      "fingerboard-ledge-wax-guide",
    ],
  },

  // ============================================================
  // 2. HOW TO MANUAL
  // ============================================================
  {
    slug: "how-to-manual-on-a-fingerboard",
    title: "How to Manual on a Fingerboard: Nose, Tail and Balance Tricks",
    metaTitle: "How to Manual on a Fingerboard: Nose & Tail Balance Tricks",
    metaDescription:
      "How to manual on a fingerboard. Nose manuals, tail manuals, and the finger-pressure control that turns balance tricks from luck into consistency.",
    category: "Reference",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "A manual is a balance trick where the fingerboard rolls on only two wheels — either the back two (tail manual) or the front two (nose manual). The trick is easier to describe than to do: hold the board balanced on one truck's wheels while continuing to roll forward. It teaches finger pressure control better than any other trick, and it's a prerequisite for every combo trick where you land in a manual and pop out of it. If your finger control is imprecise, manuals expose it immediately.",
    sections: [
      {
        heading: "Two manuals, one skill",
        body: [
          "A tail manual (or 'wheelie') is rolling on the back two wheels with the nose lifted. A nose manual is the reverse — rolling on the front two wheels with the tail lifted. Both use the same skill: keeping one truck's wheels in contact with the surface while the other truck floats a specific distance above it.",
          "The reason it's a foundational trick isn't the trick itself. It's what it teaches. To manual, your finger has to control the deck's pitch (nose-up or nose-down angle) precisely and continuously. Every combo trick that lands in a manual — kickflip-into-manual, ollie-into-nose-manual, and dozens of variants — requires this exact skill.",
        ],
      },
      {
        heading: "The finger position",
        body: [
          "For a tail manual, the index finger sits on the front of the deck, right over the front truck bolts. The middle finger sits on the tail — same position as the ollie tail-pop, but for manuals, it stays lightly pressed rather than snapping down.",
          "For a nose manual, the fingers swap. Middle finger on the nose (over the front truck bolts, since 'nose' is where you're now balancing), index finger on the front truck bolts of the tail side. The exact fingering matters less than the fact that you have one finger on each end of the deck — you cannot manual with only one finger, because there's nothing to counterbalance.",
        ],
      },
      {
        heading: "The lift — how to get into a manual",
        body: [
          "Two ways in. The first, and easier for beginners: start with the deck rolling forward on all four wheels. Gradually apply pressure with the tail finger (for a tail manual) while easing pressure off the front finger. The nose lifts as the front loses weight. Stop the lift when the nose is about 3–5mm off the surface — high enough that the front wheels don't touch, low enough that a small over-tilt sends you back to all four wheels rather than flipping the board.",
          "The second way in: pop into the manual from a small ollie. Ollie, and as the deck comes down, absorb the landing with your tail finger only. The front comes down last and hovers if you time it right. This is harder but is what you'll use for combos.",
        ],
      },
      {
        heading: "The balance — the actual trick",
        body: [
          "Once the manual position is achieved, the trick becomes keeping it. The deck wants to fall either forward (back to four wheels) or backward (tail scrapes, front wheels shoot up).",
          "Correction is continuous and tiny. If the nose is falling, add a fraction more tail pressure and lighten the front. If the tail is scraping, do the opposite. The corrections happen faster than you'll consciously make them at first — the skill is largely your finger's own feedback loop, developed over practice reps rather than through conscious control.",
          "The deck should still be rolling forward during all of this. A manual with no forward motion is a stationary balance, which is a different trick and much easier. The forward roll adds gyroscopic stability to the wheels that are on the ground and makes the manual more sustainable.",
        ],
      },
      {
        heading: "How long is a good manual?",
        body: [
          "Length is measured in centimetres of forward travel with the manual held. Beginners land manuals that last 2–3cm before falling back to four wheels. Consistent riders hold 5–10cm. Skilled riders manual across half or more of a desk length — 15–25cm.",
          "Aim for 5cm as your first milestone. If you can consistently roll 5cm on the back two wheels only, you have the skill. Everything longer is repetition.",
        ],
      },
      {
        heading: "Why nose manuals feel harder than tail manuals",
        body: [
          "Because the fingerboard's geometry isn't symmetric under your fingers. The tail is at the back of your dominant hand's natural grip; the nose is at the far end and your finger has less leverage over it.",
          "Nose manuals feel unstable at first because pushing down on a distant nose feels less precise than pushing down on a nearby tail. This isn't fixed by better technique — it's fixed by more practice. Give nose manuals twice the reps you gave tail manuals before deciding they're impossible.",
          "Some riders eventually find nose manuals easier than tail manuals because the deck geometry rewards them. Others never do. Neither is right or wrong.",
        ],
      },
      {
        heading: "Combos — what manuals unlock",
        body: [
          "Once basic manuals are consistent, they become the building block for pop-out variations. Ollie-into-manual: pop, land on two wheels, roll, pop out with an ollie at the end. Kickflip-into-nose-manual: rotate the board mid-air, land on two wheels, hold.",
          "The pop-out at the end matters as much as the entry. A clean manual that ends with the deck slamming down on all four wheels isn't a completed trick — a completed manual pops the deck cleanly out with the same finger pressure that popped ollies in earlier tutorials.",
          "This is where fingerboarding stops being individual tricks and starts being combos. Manuals are the joint.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long should a manual last to count as landed?",
        a: "There's no rule, but practically: a manual under 2cm of forward travel is usually a lucky wobble rather than a landed trick. Aim for at least 5cm before calling it consistent. Longer with practice.",
      },
      {
        q: "Which fingers do I use for a manual?",
        a: "One finger on each end of the deck — usually index and middle. You cannot manual with one finger because there's nothing to counterbalance the pitch. For a tail manual, apply light pressure with the tail finger; for a nose manual, do the opposite.",
      },
      {
        q: "My board keeps falling nose-first out of manuals. What's wrong?",
        a: "Your correction is too slow or too gentle. When the nose starts falling, you have to add tail pressure immediately — waiting for the nose to reach the surface means you've fallen out already. This gets faster with practice; there's no shortcut.",
      },
      {
        q: "Are nose manuals really harder than tail manuals?",
        a: "For most riders, yes — the geometry is against you. The nose is at the far end of the deck and your finger has less leverage over it. Some riders eventually find nose manuals easier, but expect them to be the harder one at first.",
      },
      {
        q: "Do I need to do manuals from a rolling start or from a stop?",
        a: "Both work as drills. A stationary balance is easier — no motion to manage — and is a good place to feel the pressure balance. A rolling manual is the actual trick and what every combo requires. Start stationary, move to rolling.",
      },
    ],
    related: [
      "how-to-ollie-on-a-fingerboard",
      "how-to-kickflip-on-a-fingerboard",
      "how-to-grind-on-a-fingerboard",
      "fingerboard-concave-explained",
    ],
  },

  // ============================================================
  // 3. TRICK GLOSSARY
  // ============================================================
  {
    slug: "fingerboard-trick-glossary",
    title: "Fingerboard Trick Glossary: 30 Trick Names Explained",
    metaTitle: "Fingerboard Trick Glossary: 30 Trick Names Explained",
    metaDescription:
      "A plain-English fingerboard trick glossary. 30 trick names organised by family - ollies, flips, grinds, slides, manuals and rotations - with what each is.",
    category: "Reference",
    readMinutes: 8,
    updated: "2026-08-18",
    heroSummary:
      "Fingerboard trick names come from full-size skateboarding, and there are hundreds of them. Most videos and forum threads assume you already know what a nollie-heelflip is. This glossary organises the 30 most common trick names by family — ollies, flips, grinds, slides, manuals, rotations, and stalls — with a plain-English description of what each one actually is. It's the reference to keep open in a tab while you're watching skate videos or reading trick tips.",
    sections: [
      {
        heading: "How trick names are constructed",
        body: [
          "Almost every fingerboard trick name is either a base trick or a base trick with modifiers stacked in front. 'Nollie-heelflip-frontside-boardslide' looks impenetrable but breaks down into: nollie (a variant), heelflip (the base), frontside (direction), and boardslide (the second trick in the combo).",
          "The four common modifiers, in the order they usually appear, are: stance (nollie, switch, fakie), rotation (frontside, backside, 180, 360), base trick (ollie, kickflip, heelflip, boardslide), and combo trick (into another trick).",
          "Once you know the modifiers, most trick names decode themselves. The glossary below covers the bases; the modifiers stack on top.",
        ],
      },
      {
        heading: "Ollies and pop-based tricks",
        body: [
          "Ollie — pop the tail down while dragging the front finger forward across the deck, launching the board level into the air. The foundational trick.",
          "Nollie — a nollie is an ollie done from the nose instead of the tail. Pop the nose down, drag your back finger across the deck. The board still comes up level, just from the front.",
          "Fakie ollie — an ollie done while rolling backward. The board rolls in the opposite direction from your fingers' natural orientation.",
          "Switch ollie — an ollie done in your non-dominant stance. If you normally push with your left hand, a switch ollie uses your right, and vice versa. Fully learning switch stance is what separates casual fingerboarders from serious ones.",
          "Pop shove-it — pop the board like an ollie, but at the same time push the tail sideways so the board rotates 180 degrees flat under your fingers. Lands facing the opposite direction.",
        ],
      },
      {
        heading: "Flip tricks",
        body: [
          "Kickflip — pop the tail like an ollie, but flick the front finger off the side of the deck (rather than dragging forward) so the board rotates one full spin along its long axis. Grip tape faces down for a moment mid-air.",
          "Heelflip — the reverse of a kickflip. Flick with the heel side of the finger instead of the toe side, so the board spins the opposite way.",
          "Varial kickflip — a kickflip combined with a pop shove-it. The board flips and rotates 180 flat at the same time.",
          "Tre flip (360 flip) — a kickflip combined with a 360-degree flat rotation. Board flips once and spins a full turn on the ground plane.",
          "Impossible — a very rare fingerboard trick — the board wraps around the tail-popping finger through a full rotation. Hard to describe, harder to land.",
        ],
      },
      {
        heading: "Grinds and slides",
        body: [
          "50-50 — both trucks locked on top of a rail or ledge, deck parallel to it. The most fundamental grind.",
          "5-0 — only the back truck grinds; front trucks lifted. Deck angled tail-down.",
          "Nose grind — only the front truck grinds; back lifted. Deck angled nose-down.",
          "Board slide — the underside of the deck slides across a rail or ledge, with trucks hanging off either side.",
          "Nose slide — the deck's nose section slides across a ledge, tail up.",
          "Tail slide — the deck's tail section slides across a ledge, nose up.",
          "Lipslide — a board slide entered by rotating over the top of the obstacle rather than into it from the side.",
          "Bluntslide — the very tip of the tail (the 'blunt') sits on the ledge, rest of the deck angled vertically. A style trick, rewards precision.",
        ],
      },
      {
        heading: "Manuals",
        body: [
          "Manual (tail manual) — rolling on the back two wheels only, nose lifted.",
          "Nose manual — rolling on the front two wheels only, tail lifted.",
          "Manual combo — any trick that ends in a manual position. E.g. kickflip-into-manual: kickflip out of a manual, then hold the manual for a distance.",
        ],
      },
      {
        heading: "Rotations",
        body: [
          "180 — a 180-degree flat rotation of the whole deck, usually paired with an ollie. Frontside or backside describes the direction of spin.",
          "Frontside — a rotation direction where your finger travels clockwise around the deck (if you're right-hand dominant looking down). The 'front' of your hand faces the direction of spin first.",
          "Backside — the opposite direction to frontside. Back of the hand faces the direction of spin first.",
          "360 — a full 360-degree flat rotation. Harder than a 180 at fingerboard scale because there's more inertia to overcome.",
          "540 — one and a half rotations. Video content, mostly.",
        ],
      },
      {
        heading: "Vert and transition tricks",
        body: [
          "Grind stall — trucks placed on the top edge (coping) of a ramp or bowl, briefly held, then rolled back into the ramp.",
          "Rock 'n' roll — the deck balanced with the front trucks on top of a ramp's coping and the back wheels hanging over the ramp side, briefly stalled.",
          "Axle stall — trucks locked on coping with the deck parallel to it, both trucks on top.",
          "Fakie disaster — rolling forward, ollieing over the coping, and landing with the deck across the top edge (nose in, tail out).",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the difference between a kickflip and a heelflip?",
        a: "Both flip the board on its long axis, but in opposite directions. A kickflip is flicked off the toe side of the finger; a heelflip is flicked off the heel side. On a fingerboard the distinction is which way your fingertip angles when it leaves the deck.",
      },
      {
        q: "What does 'frontside' and 'backside' mean?",
        a: "Directions of rotation. Frontside is when your dominant-hand fingers travel clockwise around the deck (looking down); backside is counterclockwise. The 'front' of your hand leads on frontside spins.",
      },
      {
        q: "What's a nollie?",
        a: "An ollie done from the nose instead of the tail. Pop the nose down while dragging your back finger across the deck. The board still comes up level — just from the front instead of the back.",
      },
      {
        q: "Are all these tricks scaled from full-size skateboarding?",
        a: "Yes. Every trick name in this glossary comes from full-size skateboarding, adapted to fingers. That's why fingerboarding culture and full-size skate culture share vocabulary — the tricks are recognisably the same shapes, just at different scales.",
      },
      {
        q: "What's the hardest trick on this list?",
        a: "The tre flip (360 flip) and the impossible are the hardest of the base tricks to land consistently at fingerboard scale — both require kickflip-level control plus rotation. The bluntslide is the hardest of the slide family.",
      },
    ],
    related: [
      "how-to-ollie-on-a-fingerboard",
      "how-to-kickflip-on-a-fingerboard",
      "how-to-grind-on-a-fingerboard",
      "how-to-manual-on-a-fingerboard",
    ],
  },

  // ============================================================
  // 4. HISTORY OF FINGERBOARDING
  // ============================================================
  {
    slug: "fingerboarding-history",
    title: "A Short History of Fingerboarding: From Novelty to Global Scene",
    metaTitle: "Short History of Fingerboarding: Novelty to Global Scene",
    metaDescription:
      "How fingerboarding grew from a novelty in skate videos to a global scene with real brands, championships and a 43,000-member subreddit. The short history.",
    category: "Reference",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Fingerboarding started as a novelty — miniature skateboards, first as toys, then as fidget tools, then as a serious subculture with real wooden boards, precision hardware and world championships. This is the compact version of that story, focused on the moments and organisations that mattered. The scene today has one major world championship (Fast Fingers, running annually in Germany since 2000), several dominant brands, and a global online community that dwarfs the physical one.",
    sections: [
      {
        heading: "Origins as a novelty (1970s–1990s)",
        body: [
          "The earliest fingerboards were tiny plastic novelty items — small enough to slip inside a skateboard trick tape, mostly used as gags or table-top fidgets rather than serious skate simulators. Their appearance in skate media dates back to at least the 1980s, when they showed up as props in skate videos and magazines.",
          "The commercial breakthrough was Tech Deck, launched in 1998 by Spin Master (a Canadian toy company) as a licensed miniature skateboard toy. Tech Deck boards were plastic with printed graphics based on real skateboard companies, and they turned a niche novelty into a mass-market product available in every toy shop.",
          "Tech Decks are still what most people mean when they hear 'fingerboard' — the vast majority of people who have ever touched a fingerboard touched a Tech Deck. Their contribution to the hobby is difficult to overstate: they introduced hundreds of thousands of people to the idea, even though almost none of them stayed in the hobby beyond casual play.",
        ],
      },
      {
        heading: "The wooden-board era (1999 onward)",
        body: [
          "The turning point that made fingerboarding a serious hobby rather than a toy was the arrival of wooden fingerboards built as scaled-down real skateboards — five plies of maple, real trucks with tuneable bushings, urethane bearing wheels.",
          "Blackriver Ramps was founded in 1999 in Schwarzenbach an der Saale, a small town in Bavaria, Germany. Their combination of quality wooden decks, precision aluminium ramps and a serious approach to fingerboarding as a discipline created the template that every subsequent brand has followed.",
          "From this point, fingerboarding split into two parallel scenes: the mass-market plastic tier (Tech Deck and imitators, sold at toy stores) and the hobbyist wooden tier (Blackriver, Berlinwood, and later Teak Tuning, FlatFace, and dozens of smaller brands, sold direct or through specialty shops).",
        ],
      },
      {
        heading: "Community formation (2000s)",
        body: [
          "The wooden-board era created a small but dedicated community of hobbyists who took the craft seriously. Two things helped that community consolidate: the Fast Fingers World Championship (running annually in Schwarzenbach an der Saale since 2000, hosted by Blackriver), and the arrival of forums and later Reddit for online discussion.",
          "Fast Fingers is discussed separately in its own guide, but its importance to the history is that it gave the community a physical meeting point once a year. Riders who had only ever known each other through video clips and forum posts met in person, competed, and pushed the technical level of the sport forward. Every serious fingerboard rider knows what Fast Fingers is; it's the equivalent of the Olympics in a scene that would otherwise be entirely dispersed.",
        ],
      },
      {
        heading: "The YouTube and TikTok generation (2010s–2020s)",
        body: [
          "Video sharing changed fingerboarding twice. YouTube in the mid-2000s let riders share tricks and gain audiences that they could never have built through print magazines. Mike Schneider of FlatFace Fingerboards, along with a handful of other creators, built subscriber bases in the hundreds of thousands and made fingerboard content into a genuine media category.",
          "TikTok did the second wave in the late 2010s and 2020s, giving short-form satisfying clip fingerboarding a massive discovery boost. Hashtag #fingerboard has accumulated tens of millions of views across sampled content. Fingerboarding is now visible to audiences who would never have encountered it through traditional skate culture.",
          "This has grown the community and also changed what the community values. The scene is more welcoming to beginners than it was in 2005, and more content is oriented toward viral moments than toward technical progression.",
        ],
      },
      {
        heading: "The scene today",
        body: [
          "As of the mid-2020s, fingerboarding is a mature global subculture. The largest online gathering is the r/Fingerboards subreddit, which had approximately 43,000 members as of early 2025, growing by roughly 20% year-on-year. Discord servers, TikTok creator communities and Instagram accounts host most day-to-day interaction.",
          "Physically, the scene is centred in Germany (Blackriver, Berlinwood, and the Fast Fingers championship) but the largest number of individual riders is in the United States. Major US brands include Teak Tuning (New York), FlatFace Fingerboards (also US-based), and Dynamic Fingerboards. Japan, Brazil, Russia, France and Poland all have active domestic scenes with local brands.",
          "The commercial ecosystem now includes brands making molds, veneer for pressing decks, and specialty urethane wheels — a sign of a mature hobby where enthusiasts want to make their own equipment as well as buy it.",
        ],
      },
      {
        heading: "Where the scene is going",
        body: [
          "Two trends are worth watching. First, the rise of DIY deck pressing — the hobbyist tier is increasingly pressing its own decks from raw maple veneer using dedicated molds, rather than only buying finished decks. Brands like CreateYourSkate specialise in this and it changes what 'having a fingerboard' means.",
          "Second, the age curve. The Tech Deck generation who started as children in the late 1990s are now adults, and many of them stayed with fingerboarding into adulthood. The community's median age is older than most action-sport scenes, and its buying power reflects that — the highest-end wooden decks and precision molds sell to riders who are past the pocket-money era of their lives.",
          "Neither trend suggests the scene is going anywhere but forward. Fingerboarding is small compared to full-size skateboarding, but its retention is high and its infrastructure — brands, events, media, community — is more solid now than at any previous point in its history.",
        ],
      },
    ],
    faqs: [
      {
        q: "When was fingerboarding invented?",
        a: "There's no single invention moment. Miniature skateboards existed as novelties in the 1970s and 1980s. The commercial toy product Tech Deck launched in 1998, which introduced fingerboarding to mass audiences. The hobbyist wooden-board era began around 1999 with Blackriver in Germany.",
      },
      {
        q: "Where is fingerboarding most popular?",
        a: "Germany hosts the cultural capital of hobbyist fingerboarding — Blackriver, Berlinwood, and the Fast Fingers World Championship are all German. The United States has the largest number of active riders and the most brands aimed at the English-speaking market. Japan, Brazil, Russia, France and Poland all have active domestic scenes.",
      },
      {
        q: "What was the first serious fingerboard brand?",
        a: "Blackriver Ramps, founded in 1999 in Schwarzenbach an der Saale, Germany, is generally considered the founding brand of the hobbyist wooden-fingerboard era. Their template — real wooden decks, precision hardware, and treating fingerboarding as a discipline rather than a toy — set the pattern for every subsequent brand.",
      },
      {
        q: "How many people fingerboard today?",
        a: "There's no official census. Signals: the r/Fingerboards subreddit had approximately 43,000 members in early 2025 (growing about 20% per year); Fast Fingers championship regularly draws 120+ competitors from 30 countries; TikTok #fingerboard has tens of millions of views. The total active hobbyist community is likely tens of thousands globally, with a much larger population of Tech Deck-era casuals.",
      },
      {
        q: "Is fingerboarding growing or shrinking?",
        a: "Growing, based on the signals available. Reddit membership and TikTok engagement are both trending up. The scene is also aging — many riders who started with Tech Decks as children have stayed in the hobby into adulthood — which stabilises the community rather than eroding it.",
      },
    ],
    related: [
      "fast-fingers-world-championship",
      "fingerboard-vs-tech-deck",
      "best-beginner-fingerboard-setup",
    ],
  },

  // ============================================================
  // 5. FAST FINGERS
  // ============================================================
  {
    slug: "fast-fingers-world-championship",
    title: "Fast Fingers World Championship: What It Is and How It Runs",
    metaTitle: "Fast Fingers World Championship: What It Is & How It Runs",
    metaDescription:
      "The Fast Fingers World Championship explained. Where it's held, how it runs, recent winners, event format, and how to attend or compete as a rider.",
    category: "Reference",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "Fast Fingers is the annual world championship of hobbyist fingerboarding, held in the small Bavarian town of Schwarzenbach an der Saale since 2000. It's hosted by Blackriver, the German brand that effectively founded serious hobbyist fingerboarding. Recent editions have drawn around 120 competitors from 30 countries, with roughly 1,500 spectators. It's the single event that keeps the global scene connected — most riders will never attend, but every serious rider knows what it is and when it happens.",
    sections: [
      {
        heading: "The basics",
        body: [
          "Fast Fingers is a competitive tournament for wooden-fingerboard riders. It's held annually in Schwarzenbach an der Saale, a town in Bavaria, Germany, at the headquarters of Blackriver Ramps — the brand that hosts and organises the event.",
          "The competition has run since 2000 and is by far the longest-running fingerboarding championship in the world. It combines a formal contest with a broader festival: skate sessions on Blackriver's park equipment, brand booths, hands-on workshops, and general community meetup elements.",
          "Recent editions in 2024 and 2026 (Fast Fingers 21 and 22) each drew around 120 competitors from roughly 30 countries, with around 1,500 spectators across the event weekend. Those numbers have been broadly stable across the last several editions and are the scene's most reliable indicator of core-hobbyist scale.",
        ],
      },
      {
        heading: "The competition format",
        body: [
          "The contest itself runs as a series of runs and best-trick sessions across a fixed park of ramps, rails and ledges. Riders compete individually rather than in teams. Judging is by panel and combines technical difficulty, style, and successful completion of tricks.",
          "The specific format has varied across editions and is best confirmed from the current year's Blackriver blog post, which publishes details ahead of each event. The consistent elements: a qualifying round, a final for the top qualifiers, and a separate best-trick contest that runs in parallel and often produces the most memorable clips of the weekend.",
          "Winners have historically been disproportionately German — the local scene has both the density of practice and the infrastructure to develop technically strong riders. Championship winners across the years include Timo Kranz (2009), Dimitri Schlotthauer (2010), Valentin Leiber (2012), Jeldo Ulpts (2019), and more recently Ramon Angelow (2024) and Alex Christ (2026, Fast Fingers 22). Riders from outside Germany have won, but German dominance is a real pattern.",
        ],
      },
      {
        heading: "Who attends",
        body: [
          "Two audiences show up: competing riders (roughly 100–130 per edition) and spectators (roughly 1,000–1,500 per edition). Competitors range from teenagers to riders in their thirties and forties. The event is intergenerational in a way that most action-sport events are not.",
          "Beyond the formal competitors, most attendees are hobbyist fingerboarders who come to skate, meet other riders, and buy from the brands with booths at the event. Blackriver, Berlinwood, and a rotation of other manufacturers have physical presence at the event — some limited-edition products only go on sale during Fast Fingers weekend.",
          "The event is open to the public. You do not need to be a competitor to attend — you can show up, watch the contest, skate on the open sessions on Saturday, and leave having met more of the community in one weekend than a year of online forum time would give you.",
        ],
      },
      {
        heading: "Practical attendance",
        body: [
          "Schwarzenbach an der Saale is a small town in Bavaria, about halfway between Nuremberg and Leipzig. It's reachable by train from Hof (the nearest larger town) or by driving from any major German city. The town has limited accommodation — for the event weekend, book well in advance, or plan to stay in Hof and travel each day.",
          "The event is typically held in autumn (September to November has been common, though exact dates change year to year). Blackriver announces dates and details on their official blog several months ahead. If you're planning to attend, get on the Blackriver newsletter early in the year.",
          "For competing: registration typically opens some months before the event and closes when the competitor slots fill (~120 places, and they do fill). Registration details are also on the Blackriver blog for each edition — a serious rider planning to compete should start watching announcements as soon as the previous edition finishes.",
        ],
      },
      {
        heading: "Why the event matters",
        body: [
          "For a small global community, having one physical meeting point per year is transformative. It gives the scene a rhythm — a moment every year when the best riders push technical progression, when videos get made that circulate for the following twelve months, when brands launch limited products, and when relationships form that sustain the community for the rest of the year.",
          "Fast Fingers's importance is out of proportion to its raw attendance numbers. 1,500 spectators sounds small next to a mass-market sports event, but the event functions like a professional conference in a niche industry — small but consequential, and the primary venue where the professional-tier riders and brands align on where the discipline is heading.",
          "If you are serious about fingerboarding as a hobby beyond casual use, attending Fast Fingers once is worth planning for. It doesn't have to be as a competitor. Watching for two days from the sidelines gives you an accelerated view of the current state of the art.",
        ],
      },
    ],
    faqs: [
      {
        q: "Where is the Fast Fingers championship held?",
        a: "Schwarzenbach an der Saale, a small town in Bavaria, Germany. It's the headquarters of Blackriver Ramps, who host the event. The location has been consistent since the championship started in 2000.",
      },
      {
        q: "How many people compete in Fast Fingers?",
        a: "Recent editions have had around 120 competitors from roughly 30 countries. Numbers have been stable across the last several editions. Total attendance including spectators is around 1,500.",
      },
      {
        q: "How do I compete in Fast Fingers?",
        a: "Registration opens a few months before each year's event. Details are published on the Blackriver blog. Competitor slots (~120) fill relatively quickly, so watch announcements early in the year if you want to enter.",
      },
      {
        q: "Do I have to compete to attend?",
        a: "No. The event is open to the public. Spectators can watch the contest, participate in open skate sessions, visit brand booths, and meet the community. Most attendees are non-competitors.",
      },
      {
        q: "Who's the most decorated Fast Fingers champion?",
        a: "Historical winners have skewed strongly German. Riders like Timo Kranz (2009), Dimitri Schlotthauer (2010) and Valentin Leiber (2012) are foundational names from earlier editions; more recent winners include Ramon Angelow (2024) and Alex Christ (2026). No single rider has dominated across all editions — the technical level rises every year and the field turns over.",
      },
    ],
    related: [
      "fingerboarding-history",
      "how-to-start-a-fingerboard-club",
      "best-fingerboard-obstacles-compared",
    ],
  },

  // ============================================================
  // 6. WINTER / SNOW
  // ============================================================
  {
    slug: "fingerboarding-in-winter-and-snow",
    title: "Fingerboarding in Winter: Cold-Weather Setups and Snow Novelties",
    metaTitle: "Fingerboarding in Winter: Cold Setups and Snow Novelties",
    metaDescription:
      "Winter fingerboarding practicalities. What cold does to grip tape, bearings and wax, indoor session tips, and the snow fingerboard novelty.",
    category: "Reference",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "Fingerboarding is a year-round hobby, but winter changes the equipment more than most riders expect. Cold air stiffens the urethane in your wheels, condensation seizes bearings that live near a windowsill, and grip tape stops sticking to fingertips when the skin is dry. This guide covers the small adjustments that keep a setup running in cold months, the indoor session tips that matter, and — because you'll ask eventually — how the snow-fingerboarding novelty works.",
    sections: [
      {
        heading: "What cold does to your fingerboard",
        body: [
          "Urethane wheels stiffen when cold. A wheel that felt medium at room temperature feels noticeably harder at 10°C, and the difference is enough that you'll feel it during your first winter session with an unfamiliar deck. Rolling distance may increase (harder wheels roll further) but grip drops, especially on rails and ledges.",
          "Bearings pick up condensation. A fingerboard that spends the day near a cold window and gets played with in a warm room draws moisture into the bearing seals, and over weeks that moisture rusts the balls or seizes the bearing entirely. If your wheels start making a grinding sound in winter that they never had in summer, that's the cause.",
          "Grip tape does less. Cold, dry fingertips have less skin surface contact with grip tape than warm, slightly humid ones. You can feel this — tricks that landed cleanly all summer suddenly slip out at temperatures under 15°C. The grip tape hasn't changed; your fingers have.",
        ],
      },
      {
        heading: "Small adjustments that help",
        body: [
          "Warm the deck before skating. Ten seconds pressed between your palms restores the wheels to a temperature closer to where they perform predictably. Not a huge fix, but the physical warmup takes almost no time.",
          "Store the deck away from windows and cold external walls. A drawer in a heated interior room is fine; a windowsill or an outside wall isn't. This is mostly a bearing-preservation move rather than a session-quality move.",
          "Warm your fingers before skating. Skateboarders don't have this problem because the whole body warms up during a session; fingerboarders can be sitting still with a warm core but cold hands. Rub palms together, or hold something warm for a minute, before trying technical tricks.",
          "If grip tape is genuinely failing, apply a fresh coat of grip tape — not a repair, but a full re-grip. Grip tape wears out and cold sessions accelerate the wearing-out.",
        ],
      },
      {
        heading: "Indoor sessions — the space matters",
        body: [
          "Fingerboarding indoors in winter is what most riders do most of the year regardless of climate, so this is less about cold and more about setup: a smooth, stable surface (a desk, table, or dedicated fingerboard deck), good enough lighting to see the deck clearly, and enough space around the obstacles that you can approach at angle.",
          "For technical sessions, a matte surface reduces glare from overhead lights — glossy varnished tables reflect and disorient. If your session surface is glossy and you can't change it, angle the desk so the light source is behind you or off to one side.",
          "Temperature-controlled rooms give consistent trick outcomes. If your sessions vary wildly in how the board behaves, temperature swing is often the culprit. Same board, same tricks, different day, different results — that's usually not you, it's the room.",
        ],
      },
      {
        heading: "The snow fingerboard novelty",
        body: [
          "Fingerboarding in actual snow is a novelty rather than a real trick discipline, but it does work and it's genuinely fun for a session or two. Two approaches exist.",
          "First: use your existing fingerboard on packed, hard snow. The wheels don't roll well on snow surfaces (soft snow eats the deck; hard packed snow works briefly), so this is more about carving and jumping small snow obstacles than continuous skating. Bearings will get wet — do this only with a beater deck you're prepared to dry out afterward.",
          "Second: use a purpose-built fingerboard snowboard. These exist as a Teak Tuning novelty product and probably from other makers too. They're essentially a small maple deck without trucks or wheels, sold as a fingerboard-scale snowboard. They actually work on packed snow — the ride is limited but recognisable as snowboarding at a small scale.",
          "Neither approach is a real long-term practice. But if you have a fingerboard and it's snowed, spending 20 minutes making tracks in it is a real experience the summer scene doesn't get.",
        ],
      },
      {
        heading: "What to skip",
        body: [
          "Winter-specific 'cold-weather bushings' or 'cold-weather wheels' don't exist as a real product category. If you see them marketed, it's marketing. Regular bushings and wheels work in any temperature a person is comfortable enough to fingerboard in.",
          "Warming a fingerboard aggressively (against a radiator, in a microwave, near a heater) does more damage than cold does. Delamination and warping happen fast at higher temperatures. Room temperature is fine; direct heat is not.",
          "Trying to fingerboard outside in cold winds is genuinely uncomfortable enough that the community mostly doesn't. If you're finding yourself resisting sessions because of the cold, take that as a signal to move indoors, not to buy new equipment.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does cold weather actually affect a fingerboard?",
        a: "Yes, mildly. Urethane wheels stiffen (rolling faster but gripping less), grip tape becomes less tacky against dry fingertips, and bearings can pick up condensation over time if stored near cold windows. None of it stops you skating; all of it noticeably changes how tricks feel.",
      },
      {
        q: "Should I warm up my fingerboard before skating?",
        a: "For consistent trick performance, yes. Ten seconds between your palms brings the wheels close to their working temperature. It's a small effect but noticeable if you're chasing consistent landings.",
      },
      {
        q: "Can I fingerboard in the snow?",
        a: "Yes, briefly. Packed snow works for short novelty sessions with your regular deck, though the bearings will get wet. Purpose-built fingerboard snowboards (sold as a Teak Tuning novelty) actually work on packed snow.",
      },
      {
        q: "Where should I store my fingerboard in winter?",
        a: "Anywhere dry and away from cold windows or exterior walls. A drawer in a heated room is fine. The main risk is bearing corrosion from repeated condensation cycles — not the cold itself.",
      },
      {
        q: "Do I need special winter wheels?",
        a: "No. 'Cold-weather wheels' aren't a real product category. Regular wheels work fine in any comfortable indoor temperature. If your wheels feel dramatically different in winter, warm them (or the room) rather than replacing them.",
      },
    ],
    related: [
      "how-to-clean-fingerboard-bearings-and-wheels",
      "fingerboard-wheel-durometer-explained",
      "wooden-fingerboard-ramps-diy-park-guide",
    ],
  },

  // ============================================================
  // 7. START A CLUB
  // ============================================================
  {
    slug: "how-to-start-a-fingerboard-club",
    title: "How to Start a Fingerboard Club or Meetup: A Practical Guide",
    metaTitle: "How to Start a Fingerboard Club or Meetup",
    metaDescription:
      "How to start a fingerboard club or meetup. Finding riders, picking a venue, hosting first sessions, and keeping a small group active for the long run.",
    category: "Reference",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "A fingerboard club or meetup doesn't need a venue, a budget, or a formal structure. Three riders, one table, and a bag of shared obstacles is enough to sustain a monthly session for years. The point isn't logistics; it's giving your local scene a physical rhythm. This guide covers finding the first few people, picking a venue that actually works, running a first session that people want to return to, and keeping the group active past the initial enthusiasm.",
    sections: [
      {
        heading: "The unit is three people, not thirty",
        body: [
          "The best fingerboard meetups are small. Three to eight riders per session works: enough people that the vibe feels social rather than intense, few enough that everyone gets meaningful time on the shared obstacles.",
          "Attempts to launch a fingerboard 'club' with formal structure — membership, dues, elected officers — almost always fail because the scale of the local hobby doesn't support it. Attempts to start a monthly meetup with three enthusiastic riders almost always succeed.",
          "Start with the smaller ambition. Grow from there if the demand shows up.",
        ],
      },
      {
        heading: "Finding the first few riders",
        body: [
          "Online first, offline second. Post on the r/Fingerboards subreddit with your location, on Facebook groups for fingerboarding or skateboarding in your city, and on local subreddits for your city or region. Include your general area (not a specific address), your rough availability, and what obstacles you already own that people could share.",
          "Local skate shops sometimes let you leave a small flyer or notecard for a fingerboard meetup. This won't produce a flood of contacts, but it produces the kind of local, physical-world interest that online recruitment doesn't.",
          "If you know any full-size skateboarders who used to fingerboard as kids, ask them. There's a large hidden population of former Tech Deck-era fingerboarders who would return to the hobby if a session was offered — they just don't seek it out on their own.",
        ],
      },
      {
        heading: "Choosing a venue that works",
        body: [
          "The requirements are boring but non-negotiable: a stable, smooth surface at least the size of a coffee table, good enough lighting to see the deck clearly, a place where 3–8 people can gather comfortably, and hosts (or venue owners) who don't mind a small group taking up space for two to three hours.",
          "Working venues from most to least common: a rider's home (kitchen or dining table, coffee table, or a dedicated fingerboard desk if the host is serious enough to have built one), a coffee shop or coworking space with permission, a local skate shop or hobby shop after hours, a library meeting room (many public libraries let community groups book rooms free), or a park pavilion in summer weather.",
          "Do not try to fingerboard in loud, high-traffic public venues. The activity requires enough concentration that background noise and jostling break the experience. Quiet spaces are the target.",
        ],
      },
      {
        heading: "Running the first session",
        body: [
          "Keep the first session structurally simple. Everyone brings their own deck, host provides some obstacles (a ramp, a rail, a ledge — enough for two or three to be skated at once), and the session is 90–120 minutes.",
          "Don't over-plan. First sessions that try to run a formal contest or teach specific tricks feel awkward and low-energy. First sessions that are essentially 'a few people skating together, talking, occasionally showing each other something' feel high-energy and become a habit.",
          "Rotate obstacle time gently. If one rider has been skating the same rail for 15 minutes, someone will subtly want a turn. A host who notices this and suggests a swap keeps things smooth without making it feel scheduled.",
        ],
      },
      {
        heading: "Keeping the group alive past enthusiasm",
        body: [
          "Every meetup group hits an enthusiasm cliff a few months in. Two or three sessions in, attendance drops from six to three, and the group has to decide whether that's a problem.",
          "The honest answer: it usually isn't. A meetup that sustainably has three attendees per session, meeting monthly, will still be running a year later. A group that stretched to six by including casual attendees usually loses those attendees around this point, and that's fine.",
          "Two things extend group life. First: a regular rhythm — same day of the month, same venue, same rough time — so people don't have to decide to attend, they just show up. Second: a small shared purpose beyond skating, like a monthly best-trick photo one member posts on the group Instagram or Discord, that keeps engagement between sessions.",
          "Avoid escalating commitments. Trying to grow the meetup into a formal club, a for-profit business, or a competition event usually kills the informal energy that made it work.",
        ],
      },
      {
        heading: "When the group grows past comfortable",
        body: [
          "Occasionally a meetup will grow past eight and become logistically hard. If you're consistently hosting more than ten, split into two smaller sessions rather than trying to accommodate everyone in one — the small-group dynamic is the reason the meetup works.",
          "Alternatively, run different session types: one focused on tricks and progression, one focused on building park layouts, one focused on filming and content. Different subgroups will self-sort into the sessions they enjoy.",
          "The endgame for a truly large local scene is not 'one big meetup' but 'several small ones with overlapping membership'. Every city with a lively fingerboard scene has that shape, not a single monolith.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many people do I need to start a fingerboard club?",
        a: "Three. That's the minimum where the session has social energy but hasn't become a project to manage. Two is a hangout; ten is an event. Three to eight is the sweet spot for a sustainable meetup.",
      },
      {
        q: "Where should we meet?",
        a: "Wherever's quiet enough to concentrate and physically accommodates a small group. Homes work. Coffee shops with permission work. Public library meeting rooms work and are usually free. Skate shops after hours work. Loud, crowded venues don't.",
      },
      {
        q: "How do I find local fingerboarders?",
        a: "Post on r/Fingerboards with your location, in local city subreddits, and in fingerboard-specific Facebook groups. Leave a flyer at a local skate shop. Ask any full-size skateboarders you know who used to fingerboard as kids — many would return if invited.",
      },
      {
        q: "Do I need to own obstacles for a meetup?",
        a: "Ideally at least one ramp, one rail and one ledge, so there's something to skate collectively rather than everyone standing around with their own deck. Additional obstacles come from other members over time.",
      },
      {
        q: "What if attendance drops after a few months?",
        a: "It usually does — that's the enthusiasm cliff. If you settle at 3–4 attendees per session and it's holding steady, the group is healthy at that size. Don't try to grow past this by lowering the bar; keep the rhythm and let the group be what it is.",
      },
    ],
    related: [
      "best-beginner-fingerboard-setup",
      "best-fingerboard-obstacles-compared",
      "fingerboarding-history",
      "fast-fingers-world-championship",
    ],
  },

  // ============================================================
  // 8. FILMING YOUR TRICKS
  // ============================================================
  {
    slug: "how-to-film-fingerboard-tricks",
    title: "How to Film Your Fingerboard Tricks: Setup, Angles and Editing",
    metaTitle: "How to Film Fingerboard Tricks: Setup, Angles and Editing",
    metaDescription:
      "How to film fingerboard tricks that look sharp. Phone settings, angle placement, lighting, slow-motion frame rates, and editing basics for social clips.",
    category: "Reference",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Filming fingerboard tricks well is 80% about setup and 20% about what you shoot. The right camera angle, decent lighting, and 60 or 120 frame-per-second capture will make even a modest trick look impressive on social. Handheld phone footage shot at a low frame rate from across the room will make a great trick look boring. This guide covers the specific settings and camera placements that turn a fingerboard session into shareable content, and the editing basics that get the clip ready for TikTok, Instagram or YouTube.",
    sections: [
      {
        heading: "Camera settings that matter",
        body: [
          "Frame rate first. Fingerboard tricks happen fast — a kickflip is over in under a second. Recording at 60 frames per second gives you smooth motion; recording at 120 or 240 lets you slow the clip down to half or quarter speed while keeping it fluid. The difference between a fingerboard clip at 30fps and 120fps is dramatic and worth the storage cost.",
          "On an iPhone, this is in Settings → Camera → Record Slo-mo, set to 1080p at 240fps or 4K at 120fps. On Android phones, the equivalent live in the camera app's video mode, sometimes labelled 'slow motion' or 'high frame rate.'",
          "Resolution matters less than you'd think. 1080p at high frame rate looks better on social than 4K at 30fps. Prioritise frame rate over resolution.",
        ],
      },
      {
        heading: "Camera position — the angle that changes everything",
        body: [
          "Most first-time fingerboard filmers put the phone above the deck looking down, or place it across the desk looking straight-on. Both are less good than a lower, closer angle.",
          "The best general-purpose angle: phone lying on its side on the desk, at fingerboard level, positioned about 30cm from the trick, pointed slightly upward. This gives you a low-angle view that makes the fingerboard look larger than it is and makes tricks look dramatic even when they're technically simple.",
          "For grinds specifically, position the phone at obstacle-height, looking directly along the length of the obstacle. The board approaches from one side of the frame, grinds across, and exits on the other. This composition works consistently.",
          "For flip tricks, side-on at deck-level is best. The rotation of the board is easiest to see when the camera is level with the deck rather than above it.",
        ],
      },
      {
        heading: "Lighting — the boring detail that makes footage look pro",
        body: [
          "Overhead room lighting is what most footage is shot under, and it's the worst possible option. Flat, dull, shadowless clips are what result. If you can add one bright directional light source from the side (a desk lamp, a window during the day, a phone flashlight positioned carefully), the same trick looks twice as good.",
          "Direction matters more than brightness. Light from the side casts shadows that show the deck's motion. Light from directly overhead flattens everything. Try any lamp positioned at 45 degrees to the side of your setup and see the difference in a single test clip.",
          "Avoid backlighting — light behind the deck facing the camera silhouettes everything and makes the trick unreadable. If a window is behind your setup, close the blinds or move the setup.",
        ],
      },
      {
        heading: "Stabilisation — hold or mount",
        body: [
          "Handheld phone footage of fingerboard tricks is almost always shaky at fingerboard scale — the small camera movements that don't show in normal recording become huge at close range. If you hold the phone, brace it on the desk or against something.",
          "Better: mount the phone. A cheap phone tripod ($5–15 on any e-commerce site) transforms footage quality. Even a stack of books propping the phone against a mug works. The specific solution doesn't matter; the fact that the phone is completely still while the trick happens does.",
          "For moving shots (following the deck along an obstacle), a small phone gimbal is the professional answer, but at $60–150 it's overkill for casual clips. Static shots with an obstacle in frame that the deck enters and exits work fine for 95% of content.",
        ],
      },
      {
        heading: "Editing basics",
        body: [
          "For social posting, you need three things: a trimmed clip showing only the trick (not the setup or the fall-outs), music, and a caption or overlay text if the platform format calls for it.",
          "Trimming is the biggest quality upgrade most people don't do. A 15-second raw clip with the actual trick in seconds 8-9 is boring on any platform. Cut to just before the trick starts and just after it lands. If the trick lasts one second, the clip should be about three seconds long — one second of run-up, one for the trick, one for the landing.",
          "Music: use platform-native music libraries (TikTok's built-in library, Instagram Reels' music selector, YouTube Shorts' audio picker). Uploaded copyrighted music risks muting; platform-native music is free to use and boosts algorithmic reach on that platform.",
          "Editing apps: CapCut is free and does everything you need. iMovie on iPhone is simpler and also free. Neither has a learning curve for the basic cut-trim-add-music workflow. Save your final export at maximum quality; social platforms compress it hard enough already.",
        ],
      },
      {
        heading: "What kind of clips do well on social",
        body: [
          "Two shapes work. First: satisfying process clips — a mold closing, a wheel spinning, a deck sliding across a rail — with a clean beat and clear visual arc. These are TikTok's dominant style and get views regardless of whether the trick is technically impressive.",
          "Second: technical tricks with clean landings. These live on Instagram Reels and YouTube Shorts and are watched more by other fingerboarders than by casual viewers. Reach is smaller but engagement from the audience that matters is higher.",
          "Failure clips (bails, missed tricks, funny falls) also work but require a specific tone — they succeed when they're framed as self-aware humour, not as evidence you're bad at fingerboarding. Most riders should focus on landing clips at the start and add failure content only once the account has an audience.",
        ],
      },
    ],
    faqs: [
      {
        q: "What phone frame rate should I use for fingerboard clips?",
        a: "60 fps minimum, 120 or 240 for anything you want to slow down. Fingerboard tricks are fast — high frame rate lets you play them back at half or quarter speed while keeping motion smooth. On iPhone: Settings → Camera → Record Slo-mo → 1080p at 240fps.",
      },
      {
        q: "Where should I put the camera?",
        a: "Low, close, side-on. Phone lying on its side at fingerboard level, 30cm from the trick, tilted slightly up. This angle makes the board look larger and tricks look more dramatic than an overhead or across-the-room shot.",
      },
      {
        q: "Do I need a tripod for fingerboard filming?",
        a: "Some form of phone mount, yes. A $10 phone tripod transforms footage quality. A stack of books works as a free alternative. The specific device doesn't matter — a completely still camera does. Handheld footage is shaky at fingerboard scale.",
      },
      {
        q: "How long should a fingerboard clip be?",
        a: "For social: 3–8 seconds is ideal. A trick lasts about a second; the clip should be roughly one second of run-up, the trick itself, and one second of landing. Longer clips lose viewers on TikTok, Reels and Shorts.",
      },
      {
        q: "What editing app should I use?",
        a: "CapCut for anyone — free, cross-platform, does everything you need. iMovie on iPhone if you want simpler. Neither has a real learning curve for the basic trim-add-music workflow.",
      },
    ],
    related: [
      "how-to-ollie-on-a-fingerboard",
      "how-to-kickflip-on-a-fingerboard",
      "how-to-grind-on-a-fingerboard",
      "best-beginner-fingerboard-setup",
    ],
  },
];
