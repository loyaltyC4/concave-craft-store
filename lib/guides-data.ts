export type GuideSection = { heading: string; body: string[] };
export type GuideTable = {
  title?: string;
  columns: string[];
  rows: string[][];
};
export type GuideFaq = { q: string; a: string };
export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "Sizing" | "Building" | "Tuning" | "Buying" | "Reference";
  updated: string;
  readMinutes: number;
  heroSummary: string;
  sections: GuideSection[];
  table?: GuideTable;
  faqs: GuideFaq[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "fingerboard-sizing-guide",
    title: "Fingerboard Sizing Guide: 32mm vs 34mm vs 36mm Decks Compared",
    metaTitle: "Fingerboard Sizes Explained: 32mm vs 34mm vs 36mm Chart",
    metaDescription:
      "Fingerboard sizes 29mm to 36mm compared side-by-side, with a quick chart, hand-fit tips and which width to pick for the tricks you actually skate.",
    category: "Sizing",
    updated: "2026-07-20",
    readMinutes: 6,
    heroSummary:
      "The best fingerboard width depends on your hand size and riding style, but 34mm is the most popular and most versatile choice for the majority of riders. Narrower 29-32mm decks flip faster and suit technical, precise tricks, while wider 36mm decks trade flip speed for stability and a larger landing area. If you only own one deck, 34mm balances both extremes better than any other width.",
    sections: [
      {
        heading: "Why Deck Width Is the First Spec That Matters",
        body: [
          "Fingerboard decks are sized by width in millimeters, measured across the widest point of the deck, not by length. Width is the single spec that most changes how a board feels under your fingers, because it determines how much surface area you have to press, flick, and land on.",
          "Length matters far less. Most fingerboards fall in a narrow 94-100mm length range regardless of width, so length is not a meaningful sizing decision the way it is for full-size skateboards. Width is where the real differences live.",
        ],
      },
      {
        heading: "Narrow Decks: 29-30mm and 32mm",
        body: [
          "29-30mm decks are the narrowest widths still in common production. They favor fast, precise flip tricks and reward riders who already have some control, but the small surface area makes catching flips and locking in grinds noticeably harder, especially for beginners.",
          "32mm is the workhorse narrow width. It is easy to control, flips quickly, and is often recommended as a starting size alongside 34mm. Riders who lean toward technical street tricks and fast flip combos tend to prefer 32mm because the shorter distance between rails means less travel for a flip to complete before you catch it.",
        ],
      },
      {
        heading: "34mm: The Most Popular, Most Versatile Width",
        body: [
          "34mm is the default recommendation for most riders and the width most pro-style completes are built around. It splits the difference between the nimbleness of 32mm and the stability of 36mm, so it holds up equally well for technical flip tricks, grinds, manuals, and park-style lines.",
          "If you are unsure which width to buy, 34mm is the safest choice. It is compatible with the widest range of trucks and wheels on the market, which matters if you plan to mix and match parts later instead of sticking with a single complete setup.",
        ],
      },
      {
        heading: "36mm: Maximum Stability and Landing Area",
        body: [
          "36mm decks are the widest common option and are built for stability over speed. The extra surface area gives you a bigger landing zone for catching flips and a more locked-in feel for manuals, grinds, and transition riding, which is why many park-focused and bowl riders prefer it.",
          "The tradeoff is flip speed. A wider deck takes marginally longer to rotate through a kickflip or heelflip, so technical combo riders sometimes find 36mm feels slower to catch than 32-34mm, even though it is easier to land once caught.",
        ],
      },
      {
        heading: "How to Actually Choose Your Width",
        body: [
          "Match width to what you already do most: if you mostly session technical flip tricks on flat ground, size down toward 32mm; if you ride park-style setups, grinds, and manuals, size up toward 36mm; if you want one deck that does all of it reasonably well, buy 34mm.",
          "Hand size plays a secondary role. Riders with larger fingers sometimes prefer the extra surface of 34-36mm simply because it is more comfortable to balance on, while smaller hands can find 29-32mm easier to wrap around for flick tricks.",
        ],
      },
    ],
    table: {
      title: "Fingerboard Deck Width Comparison",
      columns: ["Width", "Feel", "Best For", "Recommended Rider"],
      rows: [
        [
          "29-30mm",
          "Narrow, nimble, fast rotation",
          "Fast flip combos, tight technical lines",
          "Experienced technical riders",
        ],
        [
          "32mm",
          "Quick, easy to control",
          "Technical street tricks, flip speed",
          "Beginners and technical riders",
        ],
        [
          "33-34mm",
          "Balanced, most versatile",
          "All-around street, park, and flow",
          "Most riders (default recommendation)",
        ],
        [
          "36mm",
          "Wide, stable, large landing area",
          "Park, bowls, transitions, manuals",
          "Stability-focused and park riders",
        ],
      ],
    },
    faqs: [
      {
        q: "What is the best fingerboard deck width for beginners?",
        a: "32mm and 34mm are both considered beginner-friendly because they are easy to control and land tricks on. 34mm is the more common recommendation since it also works well as you progress, so you are less likely to outgrow it.",
      },
      {
        q: "Is a wider or narrower fingerboard better?",
        a: "Neither is universally better; it depends on your priorities. Narrower decks (29-32mm) flip faster and suit technical tricks, while wider decks (36mm) are more stable and easier to land on, especially for grinds, manuals, and park riding.",
      },
      {
        q: "What is the most popular fingerboard size?",
        a: "34mm is the most popular and most widely produced width. It is the default choice for most pro-style completes and offers the best balance between flip speed and stability.",
      },
      {
        q: "Do fingerboard trucks need to match the deck width?",
        a: "Yes, trucks should be sized as close to the deck width as possible for the best performance, though being off by 1-2mm is generally fine. See our truck-to-deck width chart for exact recommendations.",
      },
      {
        q: "Does fingerboard length matter as much as width?",
        a: "No. Most fingerboards fall within a narrow 94-100mm length range regardless of width, so width is the far more meaningful sizing decision.",
      },
      {
        q: "Can I switch fingerboard sizes as I improve?",
        a: "Yes, many riders start on 32mm or 34mm and experiment with 36mm once they want more stability for park-style riding, or size down if they chase faster, more technical flip tricks.",
      },
    ],
    related: [
      "truck-to-deck-width-chart",
      "how-to-choose-fingerboard-trucks",
      "best-beginner-fingerboard-setup",
    ],
  },
  {
    slug: "how-to-press-a-fingerboard-deck",
    title: "How to Press a Fingerboard Deck With a Mold",
    metaTitle: "How to Press a Fingerboard Deck: Step-by-Step Mold Guide",
    metaDescription:
      "Press your first fingerboard deck at home. Plies, glue, mold clamping, cure time and finishing - the beginner-friendly guide with the mistakes to avoid.",
    category: "Building",
    updated: "2026-07-20",
    readMinutes: 7,
    heroSummary:
      "Pressing a fingerboard deck means gluing thin wood veneer plies together and clamping them in a shaped mold so they cure into a curved, ready-to-shape blank. Most decks use 5 plies of veneer, wood glue, and a 12-24 hour cure time under even clamp pressure before the blank is cut, sanded, and sealed. Skipping cure time or clamping unevenly is the most common cause of a warped or weak-popping deck.",
    sections: [
      {
        heading: "What You Need Before You Start",
        body: [
          "A pressed fingerboard deck starts as a flat stack of thin wood veneer, not a pre-shaped blank. You will need veneer sheets (maple is the standard choice for durability and pop), wood glue, a fingerboard mold with clamps or bolts, wax or baking paper to stop the blank sticking to the mold, sandpaper in a few grits, a fine saw or rotary tool, a small drill bit for truck holes, and a sealant or clear coat.",
          "The mold is what gives the deck its concave and kick, so its quality directly affects the finished shape. A mold that flexes or does not clamp evenly will transfer that unevenness into every blank you press.",
        ],
      },
      {
        heading: "Step 1-2: Cut and Stack the Plies",
        body: [
          "Cut your veneer sheets slightly oversized compared to your final deck outline; extra material around the edges is easier to trim away later than to add back. Most fingerboard decks use 5 plies, which gives a strong, poppy blank without excessive thickness or weight.",
          "Alternate the grain direction of each ply against the one below it, the same cross-grain lamination principle used in plywood and full-size skateboards. This is what keeps a thin deck from splitting or twisting once it is under the stress of flips and grinds.",
        ],
      },
      {
        heading: "Step 3-4: Glue and Clamp in the Mold",
        body: [
          "Apply a thin, even coat of wood glue between each ply. Too much glue slows curing and can push plies apart under clamp pressure; too little leaves dry spots that never bond. A thin, uniform, slightly glossy film across the surface is the sign you have the amount right.",
          "Sandwich the glued stack between wax or baking paper, then seat it in the mold. Tighten the clamps or bolts gradually and evenly, alternating sides as you go, rather than cranking one side down fully first. Even pressure across the whole blank is what produces a symmetrical concave; uneven pressure produces a twisted or flat-sided deck.",
        ],
      },
      {
        heading: "Step 5: Cure Time",
        body: [
          "Leave the blank clamped in the mold for 12-24 hours. Twelve hours is a workable minimum, but a full 24-hour cure gives the glue more time to fully set and produces a stiffer, more consistent blank with better pop.",
          "Cold rooms, thicker plies, or a heavier glue application can all extend the time needed. If a deck feels soft, spongy, or the concave relaxes noticeably after you unclamp it, the most likely cause is pulling it out of the mold too early.",
        ],
      },
      {
        heading: "Step 6-8: Cut, Sand, and Seal",
        body: [
          "Once cured, remove the blank and trace your outline using the mold impression or a template as a guide, marking a center line first so the nose and tail stay symmetrical. Rough-cut outside the line with a fine saw or rotary tool, then sand down to the final shape in stages, starting with a medium grit and finishing with a fine grit around 400-600.",
          "Drill and countersink the truck holes so the mounting screws sit flush, then seal the deck with a clear coat or oil finish to protect the wood and give it a smooth, finished feel. Apply grip tape last, once the finish has fully dried, so the adhesive bonds to a clean surface.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many plies does a fingerboard deck need?",
        a: "Most fingerboard decks use 5 plies of veneer, which balances strength, weight, and pop. Some decks use additional plies for extra stiffness, but 5 remains the standard construction.",
      },
      {
        q: "How long does a fingerboard deck need to cure in the mold?",
        a: "Plan for 12-24 hours of clamped cure time. Twelve hours is a practical minimum, but a full 24 hours produces a stiffer blank with more consistent pop.",
      },
      {
        q: "What glue should I use to press a fingerboard deck?",
        a: "Wood glue is the standard adhesive for laminating veneer plies. Apply it in a thin, even coat; a light, glossy film across the surface is the visual sign you have used the right amount.",
      },
      {
        q: "Why did my pressed fingerboard deck come out warped?",
        a: "Warping almost always comes from uneven clamp pressure or removing the blank from the mold before it has fully cured. Clamp evenly on both sides and let the glue set for the full recommended time.",
      },
      {
        q: "What wood is best for a fingerboard deck?",
        a: "Maple veneer is the standard choice because it is strong, holds its shape well, and gives the deck a lively, poppy feel similar to a full-size skateboard.",
      },
      {
        q: "Do I need a mold to press a fingerboard deck?",
        a: "You can clamp plies without a dedicated mold, but the concave and kick will be far harder to make consistent. A mold holds the correct curve and shape while the glue cures, which is what gives pressed decks their repeatable feel.",
      },
    ],
    related: [
      "fingerboard-concave-explained",
      "fingerboard-sizing-guide",
      "fingerboard-vs-tech-deck",
    ],
  },
  {
    slug: "fingerboard-concave-explained",
    title: "Fingerboard Concave Explained: Low vs Medium vs High Concave",
    metaTitle: "Fingerboard Concave Explained: Low, Medium & High Guide",
    metaDescription:
      "What is fingerboard concave? Low, medium and high concave compared - the feel of each under your fingers and how to pick your first deck's curve.",
    category: "Building",
    updated: "2026-07-20",
    readMinutes: 6,
    heroSummary:
      "Fingerboard concave is the upward curve running across the width of the deck, from one rail to the other, and it controls how locked-in your fingers feel during flips and grinds. Low concave feels flatter and faster for technical flip tricks, medium concave is the balanced default most riders prefer, and high concave gives the deepest, most secure grip for control-focused riding. The right concave is a feel preference, not a skill requirement, though beginners often benefit from a bit more depth to hold onto.",
    sections: [
      {
        heading: "What Concave Actually Is",
        body: [
          "Concave refers to the curve pressed into a deck across its width, from rail to rail, rather than along its length. Picture the deck as a shallow trough: the center sits slightly lower than the two edges, which gives your fingers a physical edge to catch during flip tricks and a groove to sit in during grinds and manuals.",
          "Concave is separate from kick, which is the upward curve at the nose and tail along the deck's length. A deck's concave and kick are shaped together in the mold, but they solve different problems: kick helps you pop and flip, concave helps you control and catch.",
        ],
      },
      {
        heading: "Low Concave: Flat and Fast",
        body: [
          "Low concave decks have a shallow, subtle curve that feels closer to a flat board. Because there is less curve to work against, low concave decks tend to feel faster and more direct for flip tricks, which is why many technical riders who prioritize speed and precision over lock-in gravitate toward it.",
          "The tradeoff is control. With less of a physical edge to catch, low concave rewards riders who already have consistent finger placement, and it can feel slippery or hard to hold onto for anyone still building that consistency.",
        ],
      },
      {
        heading: "Medium Concave: The Balanced Default",
        body: [
          "Medium concave sits between the two extremes and is the most common concave level on production decks for good reason. It gives you enough of a groove to catch flips confidently and hold a line through grinds and manuals, without slowing down flip speed the way a deep concave can.",
          "Most riders, regardless of skill level, are well served by medium concave. It is the safest choice if you are buying a single deck and are not yet sure which direction your riding style will lean.",
        ],
      },
      {
        heading: "High Concave: Maximum Lock-In",
        body: [
          "High concave decks have a deep, pronounced curve that gives your fingers a strong, secure edge to hold onto. This makes catching flips and holding tricky grinds or manuals noticeably easier, which is why high concave is often recommended to beginners who are still developing consistent finger control.",
          "The deeper curve does add a bit more resistance to how quickly a deck rotates during flips, so some advanced technical riders find it feels slower than a low or medium concave deck once their control is already dialed in.",
        ],
      },
      {
        heading: "How to Choose Your Concave",
        body: [
          "If you are new to fingerboarding, start with medium or high concave; the extra grip makes early tricks like ollies and kickflips easier to catch consistently. If you already ride and want faster, more technical flip combos, try stepping down to low or medium concave and see if the reduced resistance suits your style.",
          "Concave preference is highly personal and often changes as your control improves, so treat your first deck's concave as a starting point rather than a permanent choice.",
        ],
      },
    ],
    table: {
      title: "Fingerboard Concave Levels",
      columns: ["Concave Level", "Feel", "Best For"],
      rows: [
        [
          "Low",
          "Flat, fast, less resistance",
          "Technical riders chasing flip speed",
        ],
        [
          "Medium",
          "Balanced grip and speed",
          "Most riders; the safe default choice",
        ],
        [
          "High",
          "Deep, secure, locked-in grip",
          "Beginners and control-focused riders",
        ],
      ],
    },
    faqs: [
      {
        q: "What is fingerboard concave?",
        a: "Concave is the curve pressed across the width of a deck, from rail to rail, giving your fingers an edge to catch during flips and a groove to hold during grinds and manuals.",
      },
      {
        q: "Is high or low concave better for beginners?",
        a: "High or medium concave is generally easier for beginners because the deeper curve gives your fingers more to hold onto while you are still building consistent control.",
      },
      {
        q: "Does concave affect flip speed?",
        a: "Yes. Lower concave decks generally feel faster to flip because there is less curve to rotate through, while higher concave adds a bit more resistance in exchange for a more secure catch.",
      },
      {
        q: "What concave do most pro-style fingerboard decks use?",
        a: "Medium concave is the most common choice on production decks because it balances catchability with flip speed, making it suitable for the widest range of riders.",
      },
      {
        q: "Is concave the same as kick?",
        a: "No. Concave is the curve across the deck's width, while kick is the upward curve at the nose and tail along the deck's length. They work together but affect different parts of your riding.",
      },
      {
        q: "Can I feel the difference between concave levels?",
        a: "Yes, concave is one of the most noticeable feel differences between decks, often more noticeable than deck width once you have ridden a few different boards.",
      },
    ],
    related: [
      "how-to-press-a-fingerboard-deck",
      "fingerboard-sizing-guide",
      "best-beginner-fingerboard-setup",
    ],
  },
  {
    slug: "how-to-choose-fingerboard-trucks",
    title: "How to Choose Fingerboard Trucks: Width, Bushings & Sizing",
    metaTitle: "How to Choose Fingerboard Trucks: Single vs Double Axle",
    metaDescription:
      "Single axle or double axle fingerboard trucks? A plain-English comparison of truck styles, widths, bushings and kingpins - how to pick right first time.",
    category: "Buying",
    updated: "2026-07-20",
    readMinutes: 6,
    heroSummary:
      "The right fingerboard trucks are the ones whose width closely matches your deck width, since mismatched trucks make a board feel unstable or sluggish no matter how good the individual parts are. Beyond width, the two other decisions that matter most are the baseplate and kingpin design, which affect how realistically the trucks turn and grind, and the bushings, which control turning resistance. Get width right first, then choose bushings and baseplate style based on how tight or loose you want the ride to feel.",
    sections: [
      {
        heading: "Start With Width, Not Brand or Looks",
        body: [
          "Truck width should be matched as closely as possible to your deck width, since this single spec has the biggest effect on how balanced a setup feels. Trucks that are noticeably narrower than the deck make the board feel tippy and unstable; trucks that are noticeably wider make flips feel sluggish and reduce control.",
          "Being off by 1-2mm in either direction is generally fine and often unavoidable since deck and truck widths do not always land on identical numbers. See our truck-to-deck width chart for exact recommended pairings across common deck sizes.",
        ],
      },
      {
        heading: "Single vs Double Kingpin Baseplates",
        body: [
          "Most performance-oriented fingerboard trucks use a single kingpin baseplate, the same design used on full-size skateboard trucks, where one bolt runs through the bushings and pivot to control turning resistance. This design gives the most realistic, tunable turning and grinding feel.",
          "Lower-end truck sets sometimes use simpler baseplate designs built around o-rings instead of a true kingpin-and-bushing setup. These are functional and inexpensive, but they generally cannot be tuned the way a true kingpin design can, and they tend to feel less precise during grinds.",
        ],
      },
      {
        heading: "Why Bushings Matter",
        body: [
          "Bushings are the small urethane pieces that sit around the kingpin and control how much resistance the truck has when you turn or lean it. Softer bushings turn more easily and feel looser; harder bushings resist turning and feel tighter and more stable, especially useful for grinds and manuals where you do not want the trucks wandering.",
          "Because bushings are a separate, swappable part on true kingpin trucks, they are also the easiest way to fine-tune how a setup feels without buying entirely new trucks. See our full bushings guide for durometer ranges and shapes.",
        ],
      },
      {
        heading: "Matching Trucks to Your Riding Style",
        body: [
          "If you ride technical, fast flip tricks, slightly narrower trucks relative to your deck and softer bushings tend to feel more responsive. If you focus on grinds, manuals, and park-style lines, trucks matched closely to deck width with firmer bushings give you the stability to hold a line without the trucks turning unexpectedly underneath you.",
          "There is no universally correct combination; the width match matters most, and everything else is a tuning decision you can revisit as your style develops.",
        ],
      },
    ],
    table: {
      title: "Truck Width to Deck Width Matching",
      columns: ["Deck Width", "Recommended Truck Width", "Notes"],
      rows: [
        [
          "29-30mm",
          "29mm",
          "Narrow trucks keep the setup proportional for smaller decks",
        ],
        ["32mm", "32mm", "The most common narrow-to-mid pairing"],
        [
          "33-34mm",
          "34mm",
          "Matches the most popular and widely stocked deck width",
        ],
        [
          "36mm",
          "36mm",
          "Wider trucks add the stability wide decks are chosen for",
        ],
      ],
    },
    faqs: [
      {
        q: "Do fingerboard trucks need to match the deck width exactly?",
        a: "Not exactly, but as closely as possible. Being off by 1-2mm is generally fine; the goal is avoiding trucks that are noticeably narrower or wider than the deck.",
      },
      {
        q: "What happens if my trucks are too wide for my deck?",
        a: "Trucks that are wider than the deck make flips feel slower and reduce overall control, since the wheels and turning radius no longer match the board's proportions.",
      },
      {
        q: "What happens if my trucks are too narrow for my deck?",
        a: "Trucks that are noticeably narrower than the deck make the setup feel unstable and tippy, since there is less of a base supporting the wider deck.",
      },
      {
        q: "What is the difference between single and double kingpin fingerboard trucks?",
        a: "Single kingpin trucks use one bolt through the bushings and pivot, the same design as full-size skateboard trucks, and offer the most realistic, tunable turning feel. Some budget trucks use simpler o-ring designs instead, which are less tunable.",
      },
      {
        q: "How do bushings affect fingerboard trucks?",
        a: "Bushings control how much resistance a truck has when turning. Softer bushings turn more easily and feel looser, while harder bushings feel tighter and more stable, which matters most for grinds and manuals.",
      },
      {
        q: "Should beginners buy soft or hard bushings?",
        a: "Medium bushings are the safest starting point for beginners, since they turn easily enough to feel responsive without being so loose that the trucks wander unpredictably during grinds.",
      },
    ],
    related: [
      "truck-to-deck-width-chart",
      "fingerboard-bushings-guide",
      "fingerboard-sizing-guide",
    ],
  },
  {
    slug: "fingerboard-bushings-guide",
    title: "Fingerboard Bushings Guide: Durometer, Shape & Tuning",
    metaTitle: "Fingerboard Bushings Guide: Durometer & Tuning",
    metaDescription:
      "Understand fingerboard bushing durometer (Shore A), cone vs barrel shapes, and how to tune truck tightness for the exact turning feel you want.",
    category: "Tuning",
    updated: "2026-07-20",
    readMinutes: 7,
    heroSummary:
      "Fingerboard bushings are rated on the Shore A durometer scale, and the number tells you how much resistance they offer: roughly 60A is very soft and loose, while 80A and above is hard and stiff. Softer bushings turn more easily and suit fast, flowy riding, while harder bushings resist turning and give you a more stable, locked-in feel for grinds and manuals. Shape matters too: cone bushings turn more progressively, while barrel bushings resist turning longer before giving way, adding extra stability at the cost of some responsiveness.",
    sections: [
      {
        heading: "What Durometer Actually Measures",
        body: [
          "Durometer is a hardness rating measured on the Shore A scale, and for fingerboard bushings it describes how much the urethane resists compressing and turning under pressure. A lower number means softer, more compressible urethane; a higher number means harder, stiffer urethane that resists turning more.",
          "The scale is relative, not absolute performance: a 60A bushing is not simply worse than an 80A bushing, it is tuned for a different feel. Riders choose durometer based on how loose or locked-in they want their trucks to turn, not based on which number is objectively better.",
        ],
      },
      {
        heading: "Soft Bushings: Looser, More Responsive Turning",
        body: [
          "Bushings around 60A sit at the soft end of the range. They compress easily, so the truck turns with very little resistance, which can feel fast and responsive for technical, flowy riding but can also feel unstable or wandery if you rely on the trucks holding a straight line during grinds and manuals.",
          "Soft bushings are a good fit for riders who prioritize quick, easy turning over rock-solid stability, particularly on setups used mostly for flip tricks rather than long grinds.",
        ],
      },
      {
        heading: "Medium and Firm Bushings: The Balanced Middle",
        body: [
          "70A and 75A bushings occupy the middle of the range and are the most common default choice on complete setups. They offer enough give to turn naturally without feeling stiff, while still resisting enough to keep the trucks stable through grinds and manuals.",
          "If you are unsure what durometer to choose, medium bushings in the 70-75A range are the safest starting point, since they do not lean hard toward either the loose or the locked-in extreme.",
        ],
      },
      {
        heading: "Hard Bushings: Maximum Stability",
        body: [
          "Bushings at 80A and above resist turning the most, giving the trucks a stiff, locked-in feel. This is useful for riders who want maximum stability during grinds, manuals, and technical lines where an unexpected turn would throw off the trick.",
          "The tradeoff is responsiveness. Hard bushings take noticeably more finger pressure to turn, which some riders find less natural for fast, flowing lines, even though they reward precision and control once you are used to the feel.",
        ],
      },
      {
        heading: "Cone vs Barrel Shape",
        body: [
          "Cone-shaped bushings are narrower at one end, which lets them compress and turn more progressively; they tend to feel responsive at first touch and are a common default shape. Barrel-shaped bushings are cylindrical throughout, which means they resist turning more evenly across their full range and generally feel more stable and less prone to sudden give.",
          "Many trucks pair a cone bushing on top with a barrel bushing on the bottom, combining the responsive initial turn of a cone with the added stability of a barrel underneath.",
        ],
      },
      {
        heading: "How to Tune Tightness",
        body: [
          "Beyond swapping durometer or shape, you can also tune feel by adjusting how tightly the kingpin nut is threaded down onto the bushings. Tightening the kingpin compresses the bushings further, adding stability but reducing turn; loosening it lets the bushings sit more freely, increasing turn but reducing stability.",
          "Small adjustments make a noticeable difference on a fingerboard given the scale involved, so make incremental changes and test after each one rather than making a large adjustment all at once.",
        ],
      },
    ],
    table: {
      title: "Bushing Durometer Reference",
      columns: ["Durometer (Shore A)", "Feel", "Best For"],
      rows: [
        [
          "60A",
          "Very soft, loose, easy to turn",
          "Fast, flowy riding and flip-focused setups",
        ],
        [
          "70A",
          "Soft-medium, natural turn with some hold",
          "Riders wanting responsiveness with a bit more control",
        ],
        [
          "75A",
          "Balanced, the common default",
          "Most riders and most complete setups",
        ],
        [
          "80A+",
          "Hard, stiff, maximum stability",
          "Grinds, manuals, and control-focused riding",
        ],
      ],
    },
    faqs: [
      {
        q: "What durometer bushings should I use for my fingerboard?",
        a: "75A is a common balanced default. Choose softer bushings around 60-70A if you want easier, more responsive turning, or harder bushings at 80A and above if you want maximum stability for grinds and manuals.",
      },
      {
        q: "What does Shore A mean for fingerboard bushings?",
        a: "Shore A is the durometer scale used to rate how hard or soft the urethane is. Lower numbers are softer and turn more easily; higher numbers are harder and resist turning more.",
      },
      {
        q: "What is the difference between cone and barrel bushings?",
        a: "Cone bushings compress and turn more progressively, giving a responsive feel from the first touch. Barrel bushings resist turning more evenly throughout their range, giving a more stable, less sudden feel.",
      },
      {
        q: "How do I make my fingerboard trucks tighter?",
        a: "Thread the kingpin nut down further to compress the bushings more. This adds stability and resistance to turning, at the cost of some responsiveness.",
      },
      {
        q: "Can I mix different durometer bushings on the same truck?",
        a: "Yes. Many riders pair a softer bushing with a harder one, or a cone on top with a barrel underneath, to blend responsiveness with stability rather than choosing one extreme.",
      },
      {
        q: "Do harder bushings wear out slower than soft ones?",
        a: "Durometer is about hardness and feel, not durability. All urethane bushings will eventually compress and lose some response over time regardless of durometer, though how hard you ride affects the timeline more than the hardness rating itself.",
      },
    ],
    related: [
      "how-to-choose-fingerboard-trucks",
      "truck-to-deck-width-chart",
      "fingerboard-concave-explained",
    ],
  },
  {
    slug: "fingerboard-vs-tech-deck",
    title: "Fingerboard vs Tech Deck: What's Actually Different (2026)",
    metaTitle: "Fingerboard vs Tech Deck: What's Different",
    metaDescription:
      "Fingerboards and Tech Decks look similar but perform very differently. Compare deck material, trucks, wheels, and feel to see what sets them apart.",
    category: "Buying",
    updated: "2026-07-20",
    readMinutes: 6,
    heroSummary:
      "A Tech Deck is a mass-market plastic toy built for casual play, while a performance fingerboard is a real, tunable miniature skateboard built from wood, metal, and urethane. The core difference is that fingerboards replicate the mechanics of full-size skateboarding, including grip tape, bushings, and rolling wheels, while Tech Decks approximate the look with fixed plastic parts and no real tuning. If you want to actually learn tricks with realistic feel, a wooden fingerboard performs meaningfully better than a Tech Deck; if you want an affordable, durable toy to collect or casually flick around, a Tech Deck does that job well.",
    sections: [
      {
        heading: "Deck Material: Wood vs Plastic",
        body: [
          "Performance fingerboard decks are built from pressed wood veneer, typically 5 plies of maple, laminated and molded into a concave shape the same way a full-size skateboard deck is made, just at a fraction of the scale. This gives the deck genuine pop and flex.",
          "Tech Deck decks are molded plastic. Plastic is cheap to mass-produce and extremely durable against drops and mishandling, but it cannot replicate the flex and responsive pop of a laminated wood deck, which is the main reason plastic decks feel noticeably different under the fingers.",
        ],
      },
      {
        heading: "Trucks and Bushings",
        body: [
          "Fingerboard trucks built for performance are metal, use a real kingpin-and-bushing setup, and are designed to be tuned for tightness the same way full-size skateboard trucks are. This is what allows realistic-feeling grinds and controllable turning.",
          "Tech Deck trucks are plastic and fixed. There is no meaningful tuning available, and the turning feel is a simplified approximation rather than a functional mechanical system, which is fine for casual play but limits how precisely you can control the board.",
        ],
      },
      {
        heading: "Wheels: Urethane vs Hard Plastic",
        body: [
          "Performance fingerboard wheels are urethane and mounted on small bearings, which lets them roll smoothly and grip the riding surface, closely mirroring how full-size skateboard wheels behave. This matters for manuals, rolling tricks, and consistent grinds.",
          "Tech Deck wheels are hard plastic without bearings. They roll less smoothly and are more prone to skidding, which is a noticeable difference if you try manuals or rolling transitions between tricks.",
        ],
      },
      {
        heading: "Grip and Feel",
        body: [
          "Performance fingerboards use real grip tape, most often foam-based tape rather than a sandpaper-style texture, which grips fingers securely without being abrasive over long riding sessions. This is a deliberate tuning choice separate from the deck itself.",
          "Tech Decks use a printed or molded texture on the deck surface rather than applied grip tape. It looks similar from a distance but does not function the same way, and it cannot be swapped or replaced the way real grip tape can.",
        ],
      },
      {
        heading: "Price and Purpose",
        body: [
          "Tech Decks are priced as toys: inexpensive, widely available, and designed for casual, low-commitment play or collecting. Performance fingerboards cost more because each component, deck, trucks, bushings, and wheels, is built and tuned as a functional part of a real setup.",
          "Neither product is objectively wrong to buy; they are built for different goals. A Tech Deck is a toy that resembles a skateboard, while a performance fingerboard is a genuinely rideable miniature skateboard.",
        ],
      },
    ],
    table: {
      title: "Fingerboard vs Tech Deck Comparison",
      columns: ["Feature", "Performance Fingerboard", "Tech Deck"],
      rows: [
        [
          "Deck material",
          "Pressed wood veneer, usually 5-ply maple",
          "Molded plastic",
        ],
        [
          "Trucks",
          "Metal, tunable kingpin and bushings",
          "Plastic, fixed, not tunable",
        ],
        ["Wheels", "Urethane on small bearings", "Hard plastic, no bearings"],
        [
          "Grip",
          "Real grip tape, often foam-based",
          "Printed or molded texture",
        ],
        [
          "Tuning",
          "Fully adjustable turning and tightness",
          "None; fixed feel out of the package",
        ],
        [
          "Price",
          "Higher, reflects real functional parts",
          "Low, priced as a mass-market toy",
        ],
        [
          "Feel",
          "Realistic pop, roll, and grind",
          "Simplified approximation of skating",
        ],
      ],
    },
    faqs: [
      {
        q: "Is a fingerboard the same as a Tech Deck?",
        a: "No. Tech Deck is a mass-market plastic toy, while a performance fingerboard is built from real wood, metal, and urethane components designed to be tuned and ridden like a genuine miniature skateboard.",
      },
      {
        q: "Can you do real tricks on a Tech Deck?",
        a: "You can approximate basic tricks, but the plastic construction and fixed trucks limit precision compared to a tuned wooden fingerboard, especially for grinds, manuals, and technical flip combos.",
      },
      {
        q: "Why are fingerboards more expensive than Tech Decks?",
        a: "Fingerboards use functional components, pressed wood decks, metal trucks with real bushings, and urethane wheels on bearings, that cost more to produce than the molded plastic parts used in a Tech Deck.",
      },
      {
        q: "Do Tech Decks and fingerboards use the same size decks?",
        a: "Not necessarily. Tech Decks and performance fingerboards can overlap in width, but performance decks are typically sold in more precise, tunable size ranges like 32mm and 34mm.",
      },
      {
        q: "Which is better for beginners, a Tech Deck or a fingerboard?",
        a: "If you want to seriously learn fingerboarding technique, a wooden fingerboard is the better investment since it behaves like a real skateboard. A Tech Deck is a fine casual toy but will not teach the same skills.",
      },
      {
        q: "Can I upgrade a Tech Deck with real fingerboard parts?",
        a: "Generally no, since Tech Deck trucks and mounting hardware are not designed to be compatible with performance fingerboard parts. Building a real setup means starting with a wooden deck designed for it.",
      },
    ],
    related: [
      "best-beginner-fingerboard-setup",
      "fingerboard-sizing-guide",
      "how-to-press-a-fingerboard-deck",
    ],
  },
  {
    slug: "best-beginner-fingerboard-setup",
    title: "Best Fingerboard Setup for Beginners: Complete Buying Guide",
    metaTitle: "Best Beginner Fingerboard Setup: Buying Guide",
    metaDescription:
      "Not sure what to buy first? Here is the ideal beginner fingerboard setup: deck width, concave, bushings, and grip tape, plus complete vs build-it.",
    category: "Buying",
    updated: "2026-07-20",
    readMinutes: 7,
    heroSummary:
      "The best beginner fingerboard setup is a 32-34mm wooden complete with medium concave, medium bushings, and foam grip tape, since this combination is forgiving to learn on without limiting how far you can progress. A complete setup is the simplest way to start because every part is already matched and ready to ride, rather than requiring you to research compatibility yourself. Buy a real wooden complete over a plastic toy if your goal is to actually learn tricks, since the wood, metal, and urethane components behave far more like a genuine skateboard.",
    sections: [
      {
        heading: "Why a Complete Setup Makes Sense to Start",
        body: [
          "A complete setup pairs a deck, trucks, wheels, and grip tape that are already sized to work together, which removes the biggest risk for a first purchase: buying mismatched parts. Building your own setup piece by piece gives you more control over the exact feel, but it requires already knowing how truck width should match deck width and what bushing durometer you want.",
          "Start with a complete, ride it enough to understand what you like and do not like about it, then move to a build-your-own approach once you have opinions about specific components worth changing.",
        ],
      },
      {
        heading: "Deck: 32-34mm Wood",
        body: [
          "A wooden deck in the 32-34mm range is the standard beginner recommendation. It is wide enough to catch and land flip tricks confidently while still being narrow enough to flip quickly, and 34mm specifically is the most versatile width if you plan to keep riding the same deck as you improve.",
          "Avoid plastic toy-style decks if your goal is to actually learn technique. Wood gives you real pop and flex, which is the foundation every other part of the setup depends on.",
        ],
      },
      {
        heading: "Concave: Medium",
        body: [
          "Medium concave is the safest starting point because it gives your fingers enough of an edge to catch flips consistently without being so deep that it feels slow. Some beginners do well with a bit more concave for extra grip while they are still building consistent finger placement, but medium remains the most broadly recommended default.",
          "You do not need to overthink this choice on a first setup. Concave preference tends to sharpen only after you have ridden a few boards and can feel the difference for yourself.",
        ],
      },
      {
        heading: "Bushings: Medium",
        body: [
          "Medium bushings, generally in the 70-75A durometer range, are the right starting point because they turn naturally without feeling loose or unpredictable. Very soft bushings can feel unstable before you have built control, and very hard bushings can feel stiff and unresponsive while you are still learning basic tricks.",
          "As you progress and develop preferences, swapping bushings is one of the cheapest and easiest ways to change how a setup feels without replacing the whole truck.",
        ],
      },
      {
        heading: "Grip Tape: Foam Over Sandpaper Texture",
        body: [
          "Foam grip tape, sometimes called prohibition-style tape, is preferred by most riders over a sandpaper-style texture because it grips fingers securely and comfortably without being abrasive during longer sessions. Many complete setups now ship with foam tape by default for this reason.",
          "If your complete comes with a rougher, sandpaper-style grip, switching to foam tape is a simple, inexpensive upgrade that noticeably changes how comfortable long sessions feel.",
        ],
      },
      {
        heading: "Where to Actually Ride It",
        body: [
          "Fingerboarding is designed around desk-scale riding: a flat, hard, obstacle-free surface like a desk or tabletop, with the edge of a book, phone case, or dedicated fingerboard obstacle acting as a ledge to grind or manual on. You do not need a park or ramps to practice the fundamentals.",
          "A clean, flat surface is genuinely one of the most important pieces of your setup beyond the board itself, since inconsistent surfaces make flip tricks and rolling far harder to learn than they need to be.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the best fingerboard setup for a beginner?",
        a: "A 32-34mm wooden complete with medium concave, medium bushings around 70-75A durometer, and foam grip tape is the best all-around beginner setup, since it is forgiving to learn on without limiting your progress later.",
      },
      {
        q: "Should a beginner buy a complete or build their own fingerboard?",
        a: "Start with a complete setup. It guarantees the parts are already matched and ready to ride, which removes the risk of buying incompatible components before you know what you are looking for.",
      },
      {
        q: "What deck width should a beginner start with?",
        a: "32-34mm is the standard beginner recommendation. 34mm in particular is worth considering first since it remains useful and versatile well past the beginner stage.",
      },
      {
        q: "Is foam grip tape better than sandpaper-style grip tape?",
        a: "Most riders prefer foam grip tape because it grips securely without being abrasive to the fingers over long sessions, and many complete setups now include foam tape by default.",
      },
      {
        q: "Do I need a fingerboard ramp or park to practice?",
        a: "No. A flat, hard, obstacle-free surface like a desk or table is enough to practice the fundamentals, with everyday objects like a book edge serving as a simple ledge.",
      },
      {
        q: "How much should a beginner spend on their first fingerboard?",
        a: "Spend enough to get a real wooden complete with metal trucks and urethane wheels rather than a plastic toy, since the material quality is what determines whether you can actually learn technique on it.",
      },
    ],
    related: [
      "fingerboard-sizing-guide",
      "fingerboard-vs-tech-deck",
      "fingerboard-bushings-guide",
    ],
  },
  {
    slug: "truck-to-deck-width-chart",
    title: "Fingerboard Truck-to-Deck Width Compatibility Chart",
    metaTitle: "Fingerboard Truck-to-Deck Width Chart",
    metaDescription:
      "Quick reference chart matching fingerboard truck width to deck width across 29-36mm, so your setup turns, flips, and grinds the way it should.",
    category: "Reference",
    updated: "2026-07-20",
    readMinutes: 4,
    heroSummary:
      "The ideal fingerboard truck width matches your deck width as closely as possible: 29-30mm decks pair with 29mm trucks, 32mm decks with 32mm trucks, 33-34mm decks with 34mm trucks, and 36mm decks with 36mm trucks. Being off by 1-2mm in either direction is generally acceptable, but a bigger mismatch makes the setup feel unstable if the trucks are too narrow or sluggish if they are too wide. Use the chart below as the definitive quick reference when pairing new trucks to an existing deck, or a new deck to trucks you already own.",
    sections: [
      {
        heading: "Why Width Matching Matters",
        body: [
          "Truck width and deck width work together to determine how balanced a setup feels. Trucks that are too narrow leave the deck without enough of a supporting base underneath, which makes the board feel tippy. Trucks that are too wide extend the wheelbase and turning radius beyond what the deck is shaped for, which slows down flips and reduces overall control.",
          "Because deck and truck widths are not always manufactured to identical millimeter values, a small mismatch of 1-2mm is common and generally not worth worrying about. The chart below reflects the closest practical pairing for each common deck width.",
        ],
      },
      {
        heading: "How to Read the Chart",
        body: [
          "Find your deck width in the left column, then use the matched truck width in the middle column as your buying target for new trucks. If your deck falls between two listed widths, round to the nearest value rather than the farther one, since a small gap is far less noticeable than a large one.",
          "The notes column calls out anything specific to that pairing, so you can see at a glance whether a given width is more forgiving or more sensitive to getting exactly right.",
        ],
      },
      {
        heading: "When It Is Okay to Deviate From the Chart",
        body: [
          "This chart reflects the standard, balanced pairing for each deck width, but deliberate deviation is a legitimate tuning choice once you know what you are chasing. Riders who want extra stability for park-style riding sometimes size trucks slightly wider than the deck on purpose, accepting slower flips in exchange for a more locked-in feel.",
          "Riders chasing faster, more technical flip combos sometimes go slightly narrower instead, accepting a bit less stability for quicker rotation. Treat the chart as the default starting point, not a rule that overrides your own riding goals once you understand the tradeoffs.",
        ],
      },
    ],
    table: {
      title: "Truck-to-Deck Width Compatibility Chart",
      columns: ["Deck Width", "Ideal Truck Width", "Notes"],
      rows: [
        [
          "29-30mm",
          "29mm",
          "Keeps narrower decks proportionally stable; avoid sizing up here",
        ],
        [
          "32mm",
          "32mm",
          "The most common narrow-to-mid pairing for technical riders",
        ],
        [
          "33-34mm",
          "34mm",
          "Matches the most popular and widely available deck width",
        ],
        [
          "36mm",
          "36mm",
          "Wider trucks reinforce the stability wide decks are chosen for",
        ],
      ],
    },
    faqs: [
      {
        q: "What size trucks do I need for a 34mm fingerboard deck?",
        a: "34mm trucks are the ideal match for a 33-34mm deck, since 34mm is the most common and most widely stocked deck width.",
      },
      {
        q: "What size trucks fit a 32mm fingerboard deck?",
        a: "32mm trucks are the ideal match for a 32mm deck. This is one of the most common width pairings for technical, flip-focused riding.",
      },
      {
        q: "How far off can truck width be from deck width?",
        a: "A mismatch of 1-2mm in either direction is generally fine and often unavoidable. Bigger mismatches start to noticeably affect stability and flip speed.",
      },
      {
        q: "What happens if I put 36mm trucks on a 32mm deck?",
        a: "The setup will feel sluggish and less controlled, since the wider trucks extend the turning radius and wheelbase well beyond what the narrower deck is shaped for.",
      },
      {
        q: "Do all fingerboard decks list an exact width in millimeters?",
        a: "Most do, but manufacturing tolerances mean actual widths can vary slightly from the advertised number. Use the advertised width to find the closest chart match rather than expecting an exact millimeter match.",
      },
      {
        q: "Is there one truck width that works for every deck?",
        a: "No. Truck width is deck-dependent by design; the whole point of matching width is to keep the setup's proportions balanced for the specific deck you are riding.",
      },
    ],
    related: [
      "how-to-choose-fingerboard-trucks",
      "fingerboard-sizing-guide",
      "fingerboard-bushings-guide",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
