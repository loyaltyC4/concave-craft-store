import type { Guide } from "./guides-data";

/** Batch 8: buying-intent guides for park gear, molds, wheels and completes. */
export const guidesBatch8: Guide[] = [
  {
    slug: "fingerboard-obstacles-and-ramps-what-to-buy-first",
    title: "Fingerboard Obstacles and Ramps: What to Buy First",
    metaTitle: "Fingerboard Obstacles & Ramps: What to Buy First (2026)",
    metaDescription:
      "Which fingerboard obstacles to buy first: kickers, stairs, rails and bowls compared by price, difficulty and what each teaches you. A sane first-park order.",
    category: "Buying",
    updated: "2026-10-11",
    readMinutes: 5,
    heroSummary:
      "Buy a kicker or a flat bank first, a rail second, and a stair set only once you can land ollies consistently. A first park needs pieces that reward the tricks you already have: one launch obstacle, one grind obstacle and one flat area between them. Everything else can wait until those get boring.",
    sections: [
      {
        heading: "The First Three Pieces Worth Owning",
        body: [
          "A kicker or flat bank is the best first purchase because a launch ramp makes every trick you already know more useful: ollies become gap tricks, shuvits become bank tricks, and kickflips get a landing that forgives imperfect pops. Look for alloy or hardwood pieces with a non-slip surface; plastic banks are fine but slide around on hard desks unless you tack them down.",
          "A rail comes second. Low round rails (2-3mm bar) teach grind balance without the commitment of taller square rails. Rail height matters more than length for beginners: if you cannot lock into a 50-50 on the ground, a rail will not fix it, so start low.",
          "A stair set or ledge comes last. Stairs demand speed and a clean pop, and they are the piece that punishes sloppy technique hardest. They are also the most satisfying obstacle once you can use them, which is why they are worth the wait rather than the impulse buy.",
        ],
      },
      {
        heading: "Materials: Alloy, Wood and Plastic Compared",
        body: [
          "Alloy pieces are the standard for good reason: they are rigid, they have a consistent surface texture that wheels grip, and they survive being knocked off a desk. Weight matters too — heavier pieces stay put mid-line.",
          "Wooden pieces feel more realistic and sound better, but wood reacts to humidity and the surface can go slick with wear unless it is griptaped. Wooden brick systems are the exception: they stack into custom layouts, which makes them the most flexible option once you own more than a few pieces.",
          "Plastic sets are the cheapest way to fill a desk and the lightest to travel with, but flex under hard landings is real. They are a fine way to test whether you will actually use a park before spending on alloy.",
        ],
      },
    ],
    table: {
      title: "A sane buying order",
      columns: ["Order", "Piece", "Why", "Typical price"],
      rows: [
        ["1", "Kicker or flat bank", "Makes tricks you already have more useful", "$10-25"],
        ["2", "Low round rail", "Teaches grind balance safely", "$8-20"],
        ["3", "Stair set or ledge", "Speed and precision, big payoff", "$20-50"],
        ["4", "Bowl or quarter pipe", "Transition skills", "$25-50"],
        ["5", "Brick/connector system", "Endless custom layouts", "$30-50"],
      ],
    },
    faqs: [
      {
        q: "How big should a first fingerboard park be?",
        a: "About 40-60cm of connected surface is plenty: one launch piece, one grind piece and a run-up between them. Bigger parks mostly collect dust if the pieces don't connect.",
      },
      {
        q: "Do obstacles work on a wooden desk?",
        a: "Yes, but light pieces slide. Alloy bases or a thin rubber mat underneath solve it without permanent tape.",
      },
      {
        q: "Should I buy one big set or several small pieces?",
        a: "One coherent set usually beats loose pieces at the start because the heights are designed to connect. Add singles later once you know which lines you skate most.",
      },
    ],
    related: [
      "fingerboard-concave-explained",
      "fingerboard-trick-glossary",
      "fingerboard-sizing-guide",
    ],
  },
  {
    slug: "fingerboard-molds-explained",
    title: "Fingerboard Molds Explained: Which Mold Presses Which Deck",
    metaTitle: "Fingerboard Molds Explained: Which Mold for Which Deck",
    metaDescription:
      "How fingerboard press molds work: concave depth, kick angle, metal vs printed molds, and which mold suits decks from 29mm to 36mm. Includes a sizing table.",
    category: "Building",
    updated: "2026-10-11",
    readMinutes: 6,
    heroSummary:
      "A fingerboard mold is the negative shape that a deck is pressed into, and it decides two things: the concave depth and the kick angle. Shallow-concave molds press decks that flip fast and suit technical riding; deep-concave and high-kick molds press decks that lock into grinds and suit park lines. Pick the mold for the ride you want, not the other way around.",
    sections: [
      {
        heading: "What a Mold Actually Controls",
        body: [
          "Every pressed deck is a memory of its mold. Concave depth (how much the deck curves across its width) sets how well the deck cups your fingers; kick angle sets how much pop the nose and tail want to give. Molds with metal alignment pins hold veneer layers from shifting under pressure, which is the difference between a symmetrical deck and a twisted one.",
          "Mold width matters as much as shape. A 32mm mold pressed with 34mm veneer overhang wastes material and presses uneven edges — match the mold to the veneer or trim before pressing.",
        ],
      },
      {
        heading: "Metal Molds vs 3D-Printed Molds",
        body: [
          "Metal molds (usually alloy) press evenly across the whole deck, survive hundreds of presses, and hold alignment pins without deforming. They cost more and are the only sensible choice if you plan to press more than a handful of decks.",
          "3D-printed and resin molds are cheaper and fine for a first deck, but layer lines can telegraph into the deck surface under pressure unless sanded. If your first press comes out with faint stripes, that is why — a sheet of smooth release film between mold and veneer hides most of it.",
        ],
      },
    ],
    table: {
      title: "Which mold for which deck",
      columns: ["Mold type", "Concave", "Best for", "Deck widths"],
      rows: [
        ["Shallow concave", "Low", "Flip tricks, technical street", "29-32mm"],
        ["Medium concave", "Medium", "All-round completes", "32-34mm"],
        ["Deep concave", "Deep", "Grind lock, park lines", "34-36mm"],
        ["High kick", "Medium-deep", "Big pop, transition", "34-36mm"],
        ["Big U / bowl press", "Low with wide tail", "Cruiser-style decks", "36mm"],
      ],
    },
    faqs: [
      {
        q: "How long does a deck need under pressure?",
        a: "Most veneer-and-glue presses want at least 12-24 hours. Rushing it is the most common cause of decks that slowly flatten over weeks.",
      },
      {
        q: "Can one mold press both 32mm and 34mm decks?",
        a: "Only if the mold is the wider of the two and you trim the overhang after pressing. A 32mm mold cannot make a 34mm deck at all.",
      },
      {
        q: "Do I need alignment pins?",
        a: "Strongly recommended. Without pins, veneer layers drift sideways under clamp pressure and the deck ends up with uneven concave left to right.",
      },
    ],
    related: [
      "how-to-press-a-fingerboard-deck",
      "fingerboard-concave-explained",
      "5-ply-vs-7-ply-fingerboard-decks",
    ],
  },
  {
    slug: "fingerboard-wheels-size-and-shape",
    title: "Fingerboard Wheels: Size, Shape and Which to Buy",
    metaTitle: "Fingerboard Wheels: Size, Shape & Bearing Guide",
    metaDescription:
      "Fingerboard wheels compared by size, profile and bearing type: why wheel height changes board feel, when to pick wheels with bearings, and what suits your setup.",
    category: "Tuning",
    updated: "2026-10-11",
    readMinutes: 5,
    heroSummary:
      "Fingerboard wheels are mostly a height and profile decision: taller wheels roll faster and sit the deck higher, smaller wheels lower the deck for flip tricks. Bearings inside the wheels are the biggest single feel upgrade over plain-bore wheels. Pick profile for the surface you ride — flat profiles for rails and ledges, rounded for park and transition.",
    sections: [
      {
        heading: "Height: The Spec That Changes Everything",
        body: [
          "Wheel height sets the gap between your deck and the ground. Taller wheels (around 6-7mm) give more clearance for flip tricks and roll over desk seams, but raise the truck axle, which slightly changes how your trucks turn. Shorter wheels (around 5mm) drop the deck, make the setup feel more stable at rest, and suit riders who live on flatground and ledges.",
          "Wheel diameter also changes speed, but less than people expect — bearing quality and surface finish matter more on fingerboard scale.",
        ],
      },
      {
        heading: "Profile and Bearings",
        body: [
          "Flat-profile wheels have a wide contact patch: they grip rails and ledges predictably and feel planted. Rounded profiles rotate into tricks more easily and look right on park setups. There is no wrong answer; most riders end up with rounded for park boards and flat for street boards.",
          "Wheels with built-in bearings (ABEC-5 to ABEC-7 typically) spin longer and quieter than plain-bore wheels and are the single most noticeable upgrade on a budget build. The catch: bearing wheels are wider, so check they clear your hangers and locknuts.",
        ],
      },
    ],
    table: {
      title: "Wheel quick-reference",
      columns: ["Type", "Height", "Best for", "Feel"],
      rows: [
        ["Plain bore, flat", "5-5.5mm", "Ledges, flatground", "Planted, quiet"],
        ["Plain bore, rounded", "5.5-6mm", "Park, transition", "Easier rotations"],
        ["Bearing wheels", "6-7mm", "All-round upgrade", "Fast, smooth, higher ride"],
        ["Soft/foam grip setups", "Any", "Beginners", "Forgiving, slower"],
      ],
    },
    faqs: [
      {
        q: "Are bearing wheels worth it over plain wheels?",
        a: "On any surface smoother than carpet, yes — they roll noticeably longer and quieter. On rough desk carpet the difference is mostly lost.",
      },
      {
        q: "Do wheel colours matter?",
        a: "Only for wear visibility: light-coloured urethane shows flat spots sooner, which helps you notice when a set is done.",
      },
      {
        q: "Can I mix wheel heights on one board?",
        a: "Not recommended. Mixed heights tilt the deck and make trucks turn unevenly.",
      },
    ],
    related: [
      "fingerboard-wheel-durometer-explained",
      "how-to-choose-fingerboard-trucks",
      "fingerboard-sizing-guide",
    ],
  },
  {
    slug: "complete-fingerboard-sets-by-size",
    title: "Complete Fingerboards by Size: Which Set for Which Rider",
    metaTitle: "Complete Fingerboards by Size: 29mm to 36mm Buyer's Guide",
    metaDescription:
      "Which complete fingerboard to buy: 29mm, 32mm, 34mm and 36mm sets compared by rider type, with truck, wheel and price notes for each size.",
    category: "Buying",
    updated: "2026-10-11",
    readMinutes: 5,
    heroSummary:
      "Buying a complete set beats assembling parts for a first or second board: it is cheaper, it works out of the box, and it teaches you what you actually want from parts later. 34mm all-round sets suit most riders, 32mm sets suit fast technical styles and smaller hands, and 36mm sets suit park riding and bigger hands. This guide maps each size to the right kind of set.",
    sections: [
      {
        heading: "Match the Set to the Rider",
        body: [
          "First board or gift: pick a 34mm maple complete with alloy trucks. It is the size the widest range of riders gets on with, and alloy trucks turn a toy into something that behaves like a board. Wooden-deck sets with single-axle trucks are cheaper and fine for younger riders, but they will not teach technique the same way.",
          "Second board for tricks: a 32mm complete pushes fast flip tricks and combos. Riders with smaller hands often prefer 32mm permanently; riders with bigger hands usually keep one for flatground sessions.",
          "Park and bowl riders: 36mm completes give the landing area and stability that transition lines reward. Pair with bearing wheels and the setup rolls through park lines without stalling.",
        ],
      },
      {
        heading: "What to Check Before Buying Any Complete",
        body: [
          "Truck axles: bearing or at least alloy axles turn the width from a number into feel. Single-axle trucks are the weakest link in cheap completes.",
          "Grip and deck finish: a deck with pre-cut foam or grip tape saves a step; raw decks need taping. Dyed veneer decks vary per press — if the exact colour matters, ask before ordering rather than after.",
          "Spares: sets that include a spare deck or spare wheels earn their price back. Decks wear, and a two-pack keeps a setup alive while one deck rests.",
        ],
      },
    ],
    table: {
      title: "Size to set, quickly",
      columns: ["Size", "Rider", "Set type", "Price band"],
      rows: [
        ["29mm", "Small hands, technical", "Wooden complete, single axle", "$10-20"],
        ["32mm", "Fast flip tricks", "Maple complete, alloy trucks", "$20-35"],
        ["34mm", "Most riders", "Pro maple complete, bearing wheels", "$25-45"],
        ["36mm", "Park and bowl", "Wide maple complete, bearing wheels", "$30-45"],
      ],
    },
    faqs: [
      {
        q: "Is a complete set cheaper than building parts?",
        a: "Almost always for the first board — parts bought individually carry packaging and shipping that a boxed set spreads across the whole setup.",
      },
      {
        q: "Can I upgrade a complete later?",
        a: "Yes, that is the point. Trucks and wheels swap with a screwdriver; decks swap with four nuts. Buy the complete for the deck and wheels, keep the trucks if they are alloy.",
      },
      {
        q: "What width do pro riders use?",
        a: "There is no single pro standard — street technicians often ride 32-34mm, park-focused riders 34-36mm. Ride what your hands like, not what a pro list says.",
      },
    ],
    related: [
      "fingerboard-sizing-guide",
      "fingerboard-concave-explained",
      "how-to-choose-fingerboard-trucks",
    ],
  },
];
