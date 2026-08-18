import type { Guide } from "./guides-data";

/**
 * Guide content batch 4 — the P1 tier from the content roadmap.
 *
 * These 10 guides fill gaps that competitor sites either don't cover (truck
 * base angles, ply-count comparison, ledge wax) or cover badly (assembly
 * walkthroughs, first-trick tutorials). Each one cross-links back into
 * batches 1–3 so the topic graph stays tight rather than fanning out
 * into orphaned pages.
 */
export const guidesBatch4: Guide[] = [
  // ============================================================
  // 1. WHEEL TYPES — bearing vs urethane vs resin
  // ============================================================
  {
    slug: "fingerboard-wheels-types-explained",
    title: "Fingerboard Wheels Explained: Bearing, Urethane and Resin Compared",
    metaTitle: "Fingerboard Wheels: Bearing vs Urethane vs Resin Compared",
    metaDescription:
      "Fingerboard wheel types compared honestly. Bearing wheels, urethane wheels and resin wheels — what each is made of, how they feel, and which to buy first.",
    category: "Tuning",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Fingerboard wheels come in three families that behave completely differently. Bearing wheels are the mainstream choice — a urethane wheel with a steel bearing inside — and they are what most riders want. Urethane-only wheels sit softer and quieter but roll a shorter distance per push. Resin wheels are the budget-and-DIY tier: cheap, decent for a first setup, but they harden and crack over time. Match the wheel type to how you actually skate rather than to the price alone.",
    sections: [
      {
        heading: "The three wheel families in one sentence each",
        body: [
          "Bearing wheels have a urethane tyre bonded to a plastic or metal hub, with a small steel bearing pressed inside so the wheel can spin freely on the truck axle. This is what a modern complete ships with, and it is what the term 'bearing wheels' means when you see it on a product page.",
          "Urethane wheels are cast or CNC'd from a single piece of urethane with no bearing inside — they spin directly on the truck axle. Oak Wheels are the reference brand here. Riders who care about a specific soft, grippy, quiet feel prefer them. They roll shorter than bearing wheels of the same size.",
          "Resin wheels are cast from craft or hobby resin, often coloured or clear. They are the cheapest wheel style and what most novelty and toy-tier fingerboards ship with. They roll fine when new but harden and become brittle over months.",
        ],
      },
      {
        heading: "Why bearing wheels dominate",
        body: [
          "A bearing wheel converts more of your push into distance than any other wheel type at this scale. The steel bearing turns friction against the axle into rolling, and the difference over the length of a desk is dramatic — a good bearing wheel rolls for several seconds after a solid flick, where a plastic-hub or resin wheel stops within one.",
          "The trade-off is cost. Bearing wheels sit at $8–20 for a set of four from a real fingerboard brand; the same shape in solid urethane can be either cheaper (generic) or more expensive (Oak Wheels premium). If you are unsure, start with bearing wheels — every other choice is a specialisation, not a default.",
          "One clarification because it confuses beginners: 'bearing wheels' is a wheel style, not a wheel brand. Any manufacturer can make bearing wheels. The quality difference within the category is real, but it comes down to bearing seal, urethane compound and hub concentricity, not to the fact of having a bearing at all.",
        ],
      },
      {
        heading: "When solid urethane wins",
        body: [
          "Solid urethane wheels grip better than bearing wheels of the same shape. On a fingerboard park with lots of rail work and technical grinds, that extra grip is worth the shorter roll — the wheel stays put when you land on a ledge rather than skating away sideways.",
          "They are also quieter. A bearing wheel makes a small tick every time the bearing balls redistribute; a solid urethane wheel is silent. On a shared desk or a late-night session, this matters more than the spec sheet suggests.",
          "The reason not to lead with them: they roll shorter, they cost as much or more than good bearing wheels, and the grip advantage is only noticeable if you are already skating obstacles. For a beginner who wants to feel the board move under their fingers, bearing wheels are the more satisfying first purchase.",
        ],
      },
      {
        heading: "When resin wheels are the right choice",
        body: [
          "Resin wheels are legitimate on two occasions. First, if you are building a very cheap first setup — under $15 total — for a kid who may not stick with fingerboarding. The setup rolls, tricks work, and if the whole board ends up in a drawer after two weeks you have not lost much.",
          "Second, if you are casting your own wheels for a custom or novelty build. Resin is easy to pour into moulds at home, holds pigment well and takes clear inserts (glitter, coloured flakes, embedded objects). This is a maker's material, not a performance one.",
          "The failure mode: resin becomes brittle. Not immediately — the first month or two feel fine — but over six months in a dry environment the wheels harden and small cracks appear at stress points. Once cracked, they are done. Replace with bearing wheels rather than more resin.",
        ],
      },
      {
        heading: "Wheel diameter and width, and why they change everything",
        body: [
          "Standard fingerboard wheels sit in a narrow diameter range — roughly 7–8mm across — because that range fits the truck geometry. Going substantially smaller catches on obstacle edges; going larger raises the deck and makes ollies less responsive. Stick to standard sizes unless you know what you are trading.",
          "Width is where preference lives. Narrow wheels feel more agile and are easier to slide; wide wheels have more grip and roll more stably in a straight line. A common upgrade is swapping stock wheels for a wider set once a rider gets into tech tricks and needs the extra landing surface.",
          "Wide wheels of a soft compound are the most stable landings for beginners; narrow wheels of a hard compound are what technical riders often end up with. Neither is 'better'.",
        ],
      },
      {
        heading: "The upgrade order that saves money",
        body: [
          "If a complete you already own has plastic-hub wheels, swap to bearing wheels first. That single change transforms how the board feels for the price of a coffee.",
          "If you already have bearing wheels and want to try solid urethane, treat it as an experiment — buy one set from a real brand (Oak, or a reputable in-shop urethane), skate both on rotation for a week, and only commit to one style if the difference is genuinely worth it. Most riders end up back on bearing wheels.",
          "If you have resin wheels that have started cracking, do not try to seal or repair them. Replace. The cracks propagate under load and a wheel that fails mid-ride can damage your trucks.",
        ],
      },
    ],
    table: {
      title: "Wheel types side by side",
      columns: ["Type", "Cost / set of 4", "Roll", "Grip", "Best for"],
      rows: [
        ["Bearing wheels", "$8–20", "Longest", "Balanced", "Default choice for anyone. First upgrade if you have plastic hubs."],
        ["Solid urethane (Oak-style)", "$15–55", "Shorter", "High", "Rail and ledge riders who want landings to stay put."],
        ["Resin wheels", "$3–8", "Fine when new", "Fine when new", "Very cheap first setups, novelty builds, DIY casting."],
        ["Plastic-hub (toy)", "included with Tech Deck", "Shortest", "Low", "Nothing — this is what you upgrade away from."],
      ],
    },
    faqs: [
      {
        q: "What do 'bearing wheels' mean exactly?",
        a: "A urethane tyre with a steel ball bearing pressed into the hub, so the wheel spins on the bearing rather than directly on the axle. It is a construction style, not a brand — any manufacturer can make bearing wheels.",
      },
      {
        q: "Do I need to buy the most expensive bearing wheels?",
        a: "No. A $15 set of bearing wheels from a real fingerboard brand and a $40 set of premium bearing wheels feel much more similar than the price gap suggests. The biggest quality differences are between wheel families (bearing vs plastic), not within them.",
      },
      {
        q: "Can I put full-size skateboard bearings into fingerboard wheels?",
        a: "No. Full-size skateboard bearings have a 22mm outer diameter; fingerboard wheel bearings are around 6mm outer. The sizes are not interchangeable in either direction.",
      },
      {
        q: "Why do Oak Wheels get so much attention if they roll shorter?",
        a: "Because roll distance is not the only thing that matters. Oak's urethane compound grips better than most bearing wheels, and grip on rails and ledges is where trick landings live or die. If you skate a lot of obstacles, that trade-off makes sense.",
      },
      {
        q: "How long should a set of bearing wheels last?",
        a: "Years, if you skate on smooth surfaces and clean them occasionally. Bearing failure is more common than urethane failure at this scale — a wheel that has developed wobble or grinding sound has a dead bearing, not a dead tyre. Sometimes the bearing can be replaced; often the whole wheel is cheaper.",
      },
      {
        q: "Are ceramic bearings inside fingerboard wheels worth it?",
        a: "No. Ceramic bearings earn their price at very high rpm and in wet environments — neither applies to a fingerboard on a desk. Save the money for two or three sets of good shielded steel bearing wheels.",
      },
    ],
    related: [
      "which-fingerboard-bearings-to-buy",
      "fingerboard-wheel-durometer-explained",
      "how-to-clean-fingerboard-bearings-and-wheels",
    ],
  },

  // ============================================================
  // 2. RISER PADS
  // ============================================================
  {
    slug: "fingerboard-riser-pads-explained",
    title: "Fingerboard Riser Pads Explained: What They Do and When You Need Them",
    metaTitle: "Fingerboard Riser Pads: What They Do and When to Use Them",
    metaDescription:
      "Fingerboard riser pads explained. What risers do to your setup, when they help pop, when they hurt turning, and whether you actually need them.",
    category: "Tuning",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "Riser pads are small foam or plastic spacers that sit between your fingerboard trucks and the deck. They lift the deck slightly higher off the trucks, which changes the geometry of every trick you do. Higher pop, slower turning, more clearance for larger wheels. Most riders never need them. The ones who benefit are running wider wheels than stock or specifically want a taller deck feel. If you cannot articulate a reason to add risers, the honest answer is you do not need them.",
    sections: [
      {
        heading: "What a riser actually does",
        body: [
          "A riser pad is a spacer, typically 1–3mm thick, that goes between the deck and the truck baseplate. Your existing mounting screws get slightly longer to accommodate the pad, and the deck sits that much higher off the trucks.",
          "The height change is small in absolute terms but noticeable in feel. A 2mm riser on both trucks raises the whole deck 2mm, which is roughly 25% of the wheel diameter at fingerboard scale. Every trick starts and lands from a slightly higher point.",
        ],
      },
      {
        heading: "Where risers help",
        body: [
          "Ollies get slightly higher. A raised deck has more lever arm against the truck when you pop, so the tail-strike is measurably more powerful. If you specifically feel your ollies are stuck at a low height and everything else about your setup is right, risers are one way to lift them.",
          "Larger wheels clear the deck. If you have swapped stock wheels for wider or taller wheels and they now touch the deck when you turn hard, a small riser is what stops that contact. This is the honest reason most full-size skaters run risers, and it applies at fingerboard scale too.",
          "The deck feels more responsive to tail-pressure. Higher trucks mean your tail catches the ground earlier for the same amount of pop input, which some riders describe as a snappier feel.",
        ],
      },
      {
        heading: "Where risers hurt",
        body: [
          "Turning gets slower. A taller stack of parts means the trucks are further from the deck, and your finger has less mechanical advantage on the deck to lean into a turn. If your board already feels lazy through carves, risers will make it worse.",
          "Grinds sit differently. The trucks lock against the coping at a slightly higher deck position, which changes what feels like a clean lock and what feels sloppy. If you have muscle memory for a particular grind height, risers reset it.",
          "The setup weighs a fraction more and adds one more place for parts to loosen. Not a big deal, but not free either.",
        ],
      },
      {
        heading: "Materials — foam vs plastic vs rubber",
        body: [
          "Foam risers absorb tiny amounts of impact. On a full-size skateboard this softens rough pavement; at fingerboard scale on a smooth desk, the impact isolation is imperceptible. Foam is still fine — it just isn't gaining you anything a hard riser wouldn't.",
          "Hard plastic risers (polycarbonate, delrin, ABS) transmit every input directly. Most fingerboard risers are this style because they hold precise dimensions and don't compress over time.",
          "Rubber risers are the compromise — some give, but not so much that they lose height. A niche choice.",
          "For a first riser, hard plastic is the honest recommendation. It sets a known height and stays there.",
        ],
      },
      {
        heading: "How to fit them without stripping the mounting holes",
        body: [
          "Add risers only if your existing mounting screws are long enough — or if you can source longer ones. Trying to add a 2mm riser with stock screws leaves the screw threads engaging only the top plies of the deck, which is exactly where mounting holes strip.",
          "Fingerboard screws are tiny and cheap. Any real fingerboard shop sells sets in a couple of lengths. Match the length to (deck thickness + riser thickness + truck plate thickness) — err on the side of slightly short rather than piercing the top of the deck.",
          "Tighten evenly across all four screws per truck. A tight-loose-tight-loose pattern warps the truck plate and gives your board a subtle twist you cannot see but will feel.",
        ],
      },
      {
        heading: "The honest recommendation",
        body: [
          "If you are asking whether you need risers, you probably do not. Stock geometry is chosen for a reason. Riders who run risers usually do so because they have a specific complaint that risers solve — insufficient ollie height with everything else dialled, or wheel-to-deck contact from a wheel swap.",
          "If you want to experiment, buy the thinnest available (1mm) first. It is the smallest change to your setup that still tells you whether taller trucks help or hurt. If 1mm helps, try 2mm next. If 1mm does nothing, taller almost certainly won't help either.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need riser pads on my fingerboard?",
        a: "Probably not. Stock geometry is chosen intentionally. Add risers if you have a specific need — larger wheels touching the deck, or an ollie height problem you have ruled out other causes for. Otherwise, skip them.",
      },
      {
        q: "What thickness of riser should I start with?",
        a: "1mm. It is small enough to tell you whether taller trucks help without committing to a big change. If 1mm makes no difference, thicker probably won't either.",
      },
      {
        q: "Can I make my own riser out of cardboard or plastic?",
        a: "Yes, and plenty of home builders do — a punched-out square of hard plastic from a food container works fine for testing. The DIY solution loses precision (uneven thickness under the four mounting points) but is free.",
      },
      {
        q: "Will risers make my board slower to turn?",
        a: "Yes. A taller stack reduces the leverage your finger has on the deck, so turning input translates into less lean. For carving-focused setups this is a real cost; for pop-focused setups it is an acceptable trade.",
      },
      {
        q: "Do I need longer mounting screws when I add risers?",
        a: "Usually yes. If you add a 2mm riser, you need screws roughly 2mm longer than stock. Trying to force stock screws leaves the threads engaging only the top of the deck, which is where holes strip.",
      },
    ],
    related: [
      "how-to-choose-fingerboard-trucks",
      "how-to-tune-fingerboard-trucks",
      "how-to-assemble-a-fingerboard",
    ],
  },

  // ============================================================
  // 3. DECK SHAPES
  // ============================================================
  {
    slug: "fingerboard-deck-shapes-compared",
    title: "Fingerboard Deck Shapes Compared: Popsicle, Cruiser and Old-School",
    metaTitle: "Fingerboard Deck Shapes: Popsicle vs Cruiser vs Old-School",
    metaDescription:
      "Fingerboard deck shapes compared: popsicle, cruiser and old-school. What each feels like, which tricks each does best, and which suits your style.",
    category: "Buying",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Fingerboard decks come in three main outline shapes, and each one does different tricks better. The popsicle is the modern default — symmetrical nose and tail, works for everything, and is what almost every complete ships with. The cruiser is a wider, blunter shape suited to pushing, carving and ollies over gaps. The old-school shape is asymmetric with a squared tail, and it is the specialist choice for classic-style tricks. If you are new, buy popsicle first — every other shape is a preference that comes later.",
    sections: [
      {
        heading: "Popsicle — the modern default",
        body: [
          "A popsicle deck is symmetrical top-to-bottom, with a rounded nose and tail that look nearly identical. This shape is what a modern skateboard has, and it is what almost every fingerboard complete you buy will ship with — it does every category of trick without being noticeably worse at any of them.",
          "The symmetry matters more than it sounds. When you land a trick, the deck can be facing either direction and both ends work the same way. You do not have to think about which end is the nose. For a beginner this removes a whole category of failed tricks that come from misjudging orientation.",
          "If you are buying your first fingerboard or your fifth, unless you have a specific reason to want something else, buy popsicle.",
        ],
      },
      {
        heading: "Cruiser — wider, blunter, more forgiving",
        body: [
          "A cruiser shape is wider through the middle, blunter at the nose and tail, and often slightly longer than a popsicle. The wheels sit further apart, which makes the whole board more stable under pushing and cruising strokes.",
          "Cruisers do ollies well because the pop happens against a wider tail — more contact area, more control. They are less good at flip tricks, because the extra width means the deck has more inertia to overcome when you spin it under your fingers.",
          "Buy a cruiser if you specifically like a longer, more relaxed feel. Some riders keep one cruiser for the same reason full-size skaters keep a longboard — it is nice to just roll on something occasionally.",
        ],
      },
      {
        heading: "Old-school — asymmetric, specialist",
        body: [
          "The old-school shape has a squared or blunt tail and a rounded, narrower nose — it looks like a skateboard from the 1980s because it is a direct scale replica. The two ends of the deck are not the same, so you have a designated 'front' and 'back' every time you skate.",
          "This shape is specialist. It does classic-style tricks — pivots, wall rides, kick-turns — extremely well because those tricks were invented on decks shaped this way. Flip tricks and modern technical skating are harder, because the asymmetric shape means the deck wants to rotate off-centre when you flick it.",
          "Buy old-school if you skate specifically to recreate a classic style, or you like the aesthetics. It is a preference, not a beginner's shape.",
        ],
      },
      {
        heading: "Nose and tail length matter more than shape name",
        body: [
          "Two popsicle decks can behave completely differently based on how much of the deck is nose-and-tail (called 'kicks') versus how much is between the trucks (called 'wheelbase'). A short-wheelbase, long-kick popsicle pops much higher than a long-wheelbase, short-kick one.",
          "Manufacturers don't usually publish these numbers, so you feel them out by trying decks. If your current setup feels stuck-to-the-ground on ollies, your kicks may be too short for your riding style. If your board feels twitchy through carves, your wheelbase may be short.",
          "As a rough rule, ollie-focused riders like short wheelbase and long kicks; cruise-focused riders like the opposite.",
        ],
      },
      {
        heading: "Width interacts with shape",
        body: [
          "A 32mm popsicle and a 32mm cruiser look completely different laid flat, because the same width has to accommodate very different length-to-width ratios. When you swap shapes, keep width the same and let the shape do the work — jumping shape AND width at once will feel completely disorienting.",
          "The specific dimensions matter less than the total change from what you are used to. A rider going from a 34mm popsicle to a 34mm cruiser will adapt quickly; the same rider going from a 32mm popsicle to a 36mm cruiser will feel like they are learning to skate again.",
        ],
      },
    ],
    table: {
      title: "Deck shapes side by side",
      columns: ["Shape", "Symmetry", "Best at", "Worst at", "First-deck answer"],
      rows: [
        ["Popsicle", "Symmetric", "Everything — no strong weakness", "Nothing specific", "Yes"],
        ["Cruiser", "Symmetric but wider", "Cruising, ollies over gaps, stability", "Flip tricks (more inertia)", "Only if you prefer relaxed feel"],
        ["Old-school", "Asymmetric (blunt tail)", "Classic-style pivots, wall rides, kickturns", "Modern flip tricks", "No — specialist choice"],
      ],
    },
    faqs: [
      {
        q: "What shape fingerboard should I buy first?",
        a: "Popsicle. It has no significant weakness, works for every trick style, and lets you find out what you actually like before you specialise. Every complete-fingerboard package you buy will be popsicle unless it explicitly says otherwise.",
      },
      {
        q: "What's the difference between a popsicle and a cruiser?",
        a: "A cruiser is wider through the middle and blunter at the nose and tail, giving a more stable ride but making flip tricks harder. A popsicle is symmetrical with rounded ends, and it does every trick category acceptably. Popsicle is the default.",
      },
      {
        q: "Can I do flip tricks on an old-school shape?",
        a: "You can, but the asymmetric shape means the deck wants to rotate off-centre when you flick it. Riders who focus on old-school shapes usually skate them for pivots, kickturns and wall rides — the tricks the shape was designed around.",
      },
      {
        q: "Do the same trucks fit different shape decks?",
        a: "Yes, provided you match truck width to deck width. Shape does not change truck compatibility — only width does.",
      },
      {
        q: "Why don't manufacturers publish wheelbase and kick lengths?",
        a: "Because these numbers are commercially sensitive and shape-comparison-heavy, and the fingerboard scale means small variations feel like large ones. If two decks feel different despite similar width, wheelbase and kick length are usually the reason.",
      },
    ],
    related: [
      "fingerboard-sizing-guide",
      "fingerboard-concave-explained",
      "5-ply-vs-7-ply-fingerboard-decks",
    ],
  },

  // ============================================================
  // 4. TRUCK BASE ANGLES + KINGPIN
  // ============================================================
  {
    slug: "fingerboard-truck-base-angles-and-kingpins",
    title: "Fingerboard Truck Base Angles and Kingpins Explained",
    metaTitle: "Fingerboard Truck Base Angles & Kingpins Explained",
    metaDescription:
      "Fingerboard truck base angles and kingpins explained. How the hanger angle changes turning, and when to tune the kingpin vs swap the truck.",
    category: "Tuning",
    readMinutes: 7,
    updated: "2026-08-18",
    heroSummary:
      "The base angle of a fingerboard truck is the angle at which the hanger sits relative to the deck. It looks like a spec sheet detail, but it is the single biggest factor in how the board turns. Lower angles turn tighter and feel less stable; higher angles turn wider and feel more planted. The kingpin is the bolt that holds the whole assembly together and lets you adjust how easily the truck turns without changing the base angle itself. Most riders never touch base angle and get everything they need from the kingpin.",
    sections: [
      {
        heading: "What base angle actually is",
        body: [
          "Look at the side of a fingerboard truck: the hanger (the crossbar the wheels attach to) is not perpendicular to the baseplate. It sits at an angle. That angle — usually somewhere between 40 and 55 degrees at fingerboard scale — is the base angle.",
          "The angle exists because it decides how the hanger moves when you lean the deck. A hanger sitting at a low angle to the deck moves further sideways for the same lean input, which turns the wheels more. A hanger sitting at a higher angle moves less, which turns the wheels less.",
          "That is the whole mechanism. Everything else about how a truck turns follows from this angle.",
        ],
      },
      {
        heading: "Low angles vs high angles — which does what",
        body: [
          "Low base angles (about 40–45 degrees) give sharp, fast turns for a small amount of lean. They feel responsive under your finger — a tiny press to the side of the deck registers as a visible turn. The trade-off is stability: at speed, low-angle trucks feel wobbly and can develop speed wobbles that bounce the deck side to side.",
          "High base angles (about 50–55 degrees) give slower, wider turns for the same lean. You have to press harder to get the same rotation. In exchange the board feels planted, especially when you land a trick with the deck angled — it settles rather than swimming around under you.",
          "Between the two ends, most stock trucks sit around 48–50 degrees — a reasonable default that neither turns aggressively nor feels sluggish. Riders who specifically want one behaviour or the other buy trucks marketed as 'street' (lower angle, sharper) or 'transition' (higher angle, more planted).",
        ],
      },
      {
        heading: "Kingpin — what it does and doesn't do",
        body: [
          "The kingpin is the vertical bolt that runs through the hanger, the bushings (rubber cushions above and below the hanger) and the baseplate. Tightening or loosening the kingpin compresses the bushings more or less, which changes how hard the truck resists turning.",
          "Loose kingpin = easy to turn, less lean-input needed, but the deck can start turning when you didn't mean it to (during landings or grinds). Tight kingpin = harder to turn, but everything the deck does is deliberate.",
          "What the kingpin does not change: the base angle. Tightening the kingpin makes the truck resist turning more, but the geometry that determines how much turn you get per unit of lean remains fixed. If your board turns too sharply or too widely for your liking, kingpin tuning gets you closer but does not solve it — a different truck will.",
        ],
      },
      {
        heading: "The tuning order that works",
        body: [
          "Start by tightening or loosening the kingpin. This is free, takes ten seconds, and reveals whether the base angle is even the problem. If loosening solves your issue, you are done.",
          "If the kingpin at both extremes still does not give you what you want, look at the bushings themselves. Harder bushings act like a tighter kingpin at any given setting; softer bushings act like a looser one. Swapping bushings is cheap and often enough.",
          "Only after kingpin AND bushings fail to solve the problem should you consider a different truck with a different base angle. Buying a new truck is the expensive fix — bushing tuning is what solves 80% of turning complaints.",
        ],
      },
      {
        heading: "Kingpin styles — traditional vs hollow vs pivotless",
        body: [
          "Traditional kingpin: a nut on top of the bushings that you tighten with a small wrench. This is what most fingerboard trucks use. It works, it is easy to service, and it is what you have unless you specifically bought something exotic.",
          "Hollow kingpin: a kingpin manufactured with a bore through its centre to save weight. At fingerboard scale, the weight saving is negligible — this is a mostly cosmetic choice on high-end trucks.",
          "Pivotless kingpin: a kingpin design that eliminates a pivot cup that traditional trucks rely on. Rare at fingerboard scale, mentioned mainly because you'll see the term on premium trucks.",
          "None of these change your riding meaningfully at this scale. If a manufacturer is charging a premium for 'hollow kingpin', that is packaging.",
        ],
      },
    ],
    faqs: [
      {
        q: "What base angle should my fingerboard trucks have?",
        a: "For most riders, the stock ~48–50 degrees on the trucks that come with a decent complete is right. Only look at other angles if you specifically want sharper turns (lower angle) or a more planted feel (higher angle).",
      },
      {
        q: "How do I know my base angle without asking the manufacturer?",
        a: "You often can't. Most fingerboard manufacturers don't publish base angle. If you specifically care, look at side-profile photos of the truck — a hanger clearly tilted toward flat is low-angle, a hanger closer to vertical is high-angle.",
      },
      {
        q: "Will tightening my kingpin fix a truck that turns too sharply?",
        a: "It'll help. Tightening the kingpin makes the truck resist turning at any given lean input. But the geometry that determines turn-per-lean is fixed by base angle — kingpin tuning gets you close, not identical.",
      },
      {
        q: "Can I loosen the kingpin all the way?",
        a: "Physically yes, but the truck will develop play — the hanger will move side to side under load, not just when you lean. Leave enough tension that the hanger sits firmly against the pivot when you release your finger.",
      },
      {
        q: "Does a hollow kingpin actually help?",
        a: "At fingerboard scale, no. The weight saving is imperceptible. Choose trucks by base angle, bushing quality and construction — not by whether their kingpin has a hole in it.",
      },
    ],
    related: [
      "how-to-choose-fingerboard-trucks",
      "how-to-tune-fingerboard-trucks",
      "fingerboard-bushings-guide",
    ],
  },

  // ============================================================
  // 5. 5-PLY vs 7-PLY
  // ============================================================
  {
    slug: "5-ply-vs-7-ply-fingerboard-decks",
    title: "5-Ply vs 7-Ply Fingerboard Decks: Weight, Pop and Feel Compared",
    metaTitle: "5-Ply vs 7-Ply Fingerboard Decks Compared",
    metaDescription:
      "5-ply vs 7-ply fingerboard decks compared honestly. How ply count changes pop, weight and durability, and which suits how you actually skate.",
    category: "Building",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Ply count is the number of thin wood layers glued together to make a fingerboard deck. Almost every deck is either five plies or seven plies. Five-ply decks are lighter, snappier and feel faster under your fingers; seven-ply decks are stiffer, heavier and last longer. Neither is better in general — 5-ply is the default because most riders prefer the responsive feel. Choose 7-ply if you're rough on decks, skate mostly transition, or specifically like a solid, planted feel.",
    sections: [
      {
        heading: "Why decks are laminated in the first place",
        body: [
          "A fingerboard deck could theoretically be cut from a single piece of solid wood. Nobody makes them that way — a solid piece cracks along the grain the first time you pop a trick, because wood is strong across the grain but weak with it.",
          "Laminating multiple thin plies with the grain running in alternating directions makes the finished deck strong in every direction. That is why plywood exists at all scales — it turns wood's natural weakness into a strength through construction.",
          "Ply count is how many of those layers a manufacturer uses. Fewer plies means lighter and more flexible; more plies means heavier and stiffer. The exact number matters less than most spec sheets suggest, but the direction it points in is real.",
        ],
      },
      {
        heading: "5-ply — the modern default",
        body: [
          "A 5-ply deck is what most fingerboard completes and press-your-own kits produce. Five plies of hard maple total roughly 2–2.5mm of deck thickness, which is what modern truck holes and kicks are designed around.",
          "The feel: light, snappy, and responsive to small inputs. When you pop the tail, the deck kicks up quickly because there's less mass to accelerate. Flip tricks land more consistently because the deck's rotational inertia is lower.",
          "The trade-off: 5-ply decks flex more, and repeated hard landings on rails or gaps can eventually crack the outer plies at high-stress points (usually the front truck holes). This is not a fast failure — a well-treated 5-ply deck lasts months to years. But if your style is heavy landings and rough sessions, 7-ply lasts longer.",
        ],
      },
      {
        heading: "7-ply — the durability tier",
        body: [
          "A 7-ply deck adds two more plies to the stack, bringing the finished thickness to roughly 2.8–3.2mm. That extra material makes the deck noticeably heavier under your finger, stiffer through the middle, and more resistant to cracking at stress points.",
          "The feel: planted, solid, and slightly slower. Ollies take fractionally more effort because there's more mass to lift; flip tricks rotate slightly slower and land with a heavier thud rather than a snap.",
          "The trade-off: less lively response and higher weight. Some riders read this as 'more skateboard-like' and prefer it; others find the board feels sluggish. Neither reading is wrong.",
        ],
      },
      {
        heading: "The stress-point comparison",
        body: [
          "Fingerboard decks almost always crack in one of three places: the front truck holes, the tail during pop-heavy tricks, or the concave curve during aggressive flip tricks. Ply count changes how fast this happens.",
          "5-ply decks crack first at the front truck holes when the mounting screws are overtightened or too long, exactly the same place where 7-ply decks crack — but usually later. Ply count is not immunity; it is a delay.",
          "The tail is where the differences show most. A 5-ply deck ridden on rough transition (a homemade quarter-pipe, for example) starts fraying at the tail edge much earlier than a 7-ply deck in the same conditions. On a smooth desk with rare hard landings, both survive equally.",
        ],
      },
      {
        heading: "3-ply, 6-ply and unusual counts",
        body: [
          "You will occasionally see decks marketed as 3-ply (novelty and hobby, mostly toys) or 6-ply (uncommon boutique). Neither is worth seeking out.",
          "3-ply decks are structurally weaker than 5-ply in a way that shows up quickly — they crack easily and don't hold concave well. 6-ply is a mostly cosmetic choice that behaves like a stiff 5-ply.",
          "Stick to 5- or 7-ply from real fingerboard brands. The variance between two manufacturers of the same ply count is often larger than the variance between 5- and 7-ply within one manufacturer.",
        ],
      },
      {
        heading: "The honest recommendation",
        body: [
          "Buy 5-ply as your default. It is what most riders prefer, and the responsive feel is what makes fingerboards fun.",
          "Buy 7-ply if you specifically break decks often at the truck holes, if you skate a lot of transition where landings are heavier, or if you want a slower, more planted feel deliberately.",
          "Owning both is legitimate too. Many riders keep a 5-ply for technical days and a 7-ply for park sessions.",
        ],
      },
    ],
    table: {
      title: "5-ply vs 7-ply at a glance",
      columns: ["Aspect", "5-ply", "7-ply"],
      rows: [
        ["Thickness", "~2–2.5mm", "~2.8–3.2mm"],
        ["Weight under finger", "Light, snappy", "Heavy, planted"],
        ["Pop", "Higher, quicker", "Lower, more effort"],
        ["Flip trick speed", "Faster rotation", "Slower rotation"],
        ["Durability at stress points", "Cracks earlier under abuse", "Lasts longer under abuse"],
        ["Best for", "Most riders, technical skating", "Transition, hard landings, planted feel"],
      ],
    },
    faqs: [
      {
        q: "Which ply count should I buy first?",
        a: "5-ply. It's the default for a reason — most riders find the snappier, lighter feel more fun. You can always try a 7-ply later if you specifically want a heavier, more planted deck.",
      },
      {
        q: "Does 7-ply crack less than 5-ply?",
        a: "It cracks less easily under the same abuse, yes. But both crack in the same places (usually the front truck holes) if you overtighten mounting screws or use screws that are too long. Ply count buys you time, not immunity.",
      },
      {
        q: "Can I press a 7-ply deck at home with a standard mold?",
        a: "Yes, but the increased ply count requires more clamping pressure to hold the shape during curing, and the outer plies are more likely to lift at the kicks. Start with 5-ply for your first few home presses; move to 7-ply once your technique is dialled.",
      },
      {
        q: "Does ply count affect concave?",
        a: "Slightly. A 7-ply deck holds concave more permanently — it springs back less over time. A 5-ply deck may relax slightly through months of skating, especially if pressed at home with less clamping pressure than a factory setup.",
      },
      {
        q: "Is there a heavier ply count than 7?",
        a: "You'll occasionally see 8-ply or 9-ply in bespoke builds, but they are rare and specialist. At fingerboard scale, more than 7 plies mostly just adds weight without meaningful benefit.",
      },
    ],
    related: [
      "how-to-press-a-fingerboard-deck",
      "fingerboard-deck-materials-explained",
      "which-fingerboard-mold-to-buy",
    ],
  },

  // ============================================================
  // 6. LEDGE WAX
  // ============================================================
  {
    slug: "fingerboard-ledge-wax-guide",
    title: "Fingerboard Ledge Wax Guide: What to Use and How to Apply",
    metaTitle: "Fingerboard Ledge Wax Guide: What to Use and How to Apply",
    metaDescription:
      "Fingerboard ledge wax explained: which wax works, how much to apply, when a ledge is over-waxed, and how to strip it if you need to reset.",
    category: "Tuning",
    readMinutes: 4,
    updated: "2026-08-18",
    heroSummary:
      "Fingerboard ledge wax turns a dry, grabby ledge into a slick sliding surface. It is the difference between a ledge trick that catches and stops your deck and one that flows across the whole ledge into a landing. The right amount is thin and even, not thick or greasy. Skate wax made for full-size skateboards works fine; candle wax and beeswax also work; paraffin is the one to avoid because it melts too readily on warm days. If your ledge feels sticky, add more; if it flies off the far end, wipe some off.",
    sections: [
      {
        heading: "Why ledges need wax",
        body: [
          "Bare wood or plastic ledges have too much friction against fingerboard trucks and deck surfaces to slide cleanly. A trick that should slide across the ledge and land off the far end instead grabs partway across, stopping the deck and often flipping it sideways.",
          "Wax fills the tiny surface irregularities on the ledge, giving your deck a smooth, low-friction surface to slide on. The layer is thin — much thinner than most first-time waxers apply.",
          "Metal ledges and coping do not need wax in the same way, because metal is smoother than wood or plastic to start with. They benefit from a very light coat but the effect is smaller.",
        ],
      },
      {
        heading: "What wax to use",
        body: [
          "Skate wax made for full-size skateboarding is the honest first choice. It's engineered for this exact use case, comes in small blocks that last a long time at fingerboard scale, and every skate shop sells it for a few dollars.",
          "Candle wax works too. Any household candle — non-scented, ideally plain paraffin-free — rubbed onto the ledge does the job. It's cheaper than skate wax and just as effective.",
          "Beeswax is the softest option. It applies easily and glides well when new, but it wears off faster than candle or skate wax. Fine if you want a natural finish.",
          "Paraffin is the one to avoid. It melts at low temperatures — on a warm desk in summer, paraffin becomes greasy and gets on everything. Use it if it's the only wax you have; replace with something else when you can.",
        ],
      },
      {
        heading: "How to apply — the technique that works",
        body: [
          "Rub the wax block along the length of the ledge, pressing lightly. You want a visible dull sheen where the wax has laid down, not a thick white streak. If you can see individual wax marks or bumps, you have applied too much.",
          "Run your fingerboard along the ledge with no trick — just push it across. It should slide smoothly with modest pressure. If it drags, add more wax. If it accelerates uncontrollably, wipe some off with a dry cloth.",
          "Cover the whole ledge including the edges, not just the top. Slides that engage the edge (nose slides, tail slides) need the vertical surface waxed too.",
        ],
      },
      {
        heading: "When to re-wax",
        body: [
          "When the ledge stops sliding as cleanly as it did after your last waxing. Depending on how much you skate, this ranges from once a week to once a month.",
          "Signs it's time: your board starts catching partway across the ledge; a trick that landed consistently starts failing at the same spot; you can see visible wear grooves in the wax where the deck has passed over most often.",
          "Re-waxing does not require stripping the old wax first. Just add more on top of what's there. Wax layers build up over time and, past a certain thickness, need to be stripped — but that takes months of regular use.",
        ],
      },
      {
        heading: "When the ledge is over-waxed",
        body: [
          "Over-waxing is more common than most people realise. The board flies across the ledge and off the far end before you can react — this is not you skating faster, this is the ledge being too slick.",
          "Fix: wipe the ledge with a dry cloth or paper towel. Do not use a solvent unless the wax build-up is genuinely thick — a wipe removes the excess and leaves the correct thin coat behind.",
          "For a genuinely thick build-up (visible wax deposits, tacky when touched cold), remove with a plastic scraper first, then wipe. Do not use metal scrapers on wooden ledges — they scar the surface.",
        ],
      },
    ],
    faqs: [
      {
        q: "What kind of wax works best on a fingerboard ledge?",
        a: "Skate wax made for full-size skateboarding — it's engineered for this exact use, cheap, and long-lasting at fingerboard scale. Candle wax and beeswax work fine as substitutes. Avoid paraffin, which melts too easily on warm days.",
      },
      {
        q: "How often do I need to re-wax my ledge?",
        a: "When it stops sliding as cleanly as it did. That's usually every week or two if you skate daily, or once a month if you're more casual. Don't wax on a schedule — wax when the ledge tells you to.",
      },
      {
        q: "How do I know if I've applied too much wax?",
        a: "Your board flies across the ledge and off the far end before you can control it. Wipe some off with a dry cloth — you probably don't need to strip and reapply; just remove the excess.",
      },
      {
        q: "Can I use car wax or furniture polish?",
        a: "Not effectively. Both are designed for different surfaces and neither builds up the thin, durable layer you need for ledge sliding. Stick to actual wax blocks.",
      },
      {
        q: "How do I strip built-up wax off a ledge?",
        a: "Scrape gently with a plastic scraper (a credit card works), then wipe with a dry cloth. For very thick build-up, a tiny amount of mineral spirits on a cloth removes wax cleanly, but this is only necessary after months of heavy use.",
      },
    ],
    related: [
      "fingerboard-grind-rail-setup-and-wax",
      "wooden-fingerboard-ramps-diy-park-guide",
      "best-fingerboard-obstacles-compared",
    ],
  },

  // ============================================================
  // 7. ASSEMBLY WALKTHROUGH
  // ============================================================
  {
    slug: "how-to-assemble-a-fingerboard",
    title: "How to Assemble a Fingerboard: Trucks, Wheels and Grip Step by Step",
    metaTitle: "How to Assemble a Fingerboard: Step-by-Step Guide",
    metaDescription:
      "How to assemble a fingerboard from parts, step by step. Fitting trucks, wheels, bushings and grip tape — with the beginner mistakes to avoid.",
    category: "Building",
    readMinutes: 7,
    updated: "2026-08-18",
    heroSummary:
      "Assembling a fingerboard from parts takes about 15 minutes if you know the order. Trucks go on first with the correct screw length, wheels press onto the trucks, bushings sit above and below the hangers, and grip tape goes on last after everything is tightened. The two things that most first-time builders get wrong: over-tightening the truck screws (which strips the deck holes) and putting grip tape on before the trucks (which makes truck adjustment impossible without peeling it). This guide covers the right order and the small torque decisions that determine whether your board lasts.",
    sections: [
      {
        heading: "What you need on the desk",
        body: [
          "A deck (with or without grip tape depending on whether you're starting from a graphic-only deck), one pair of trucks, one set of four wheels, mounting screws sized for your deck thickness, a small screwdriver or the mini tool that came with the trucks. Optional but useful: a small dish for the tiny parts and a fresh sheet of grip tape if it isn't pre-applied.",
          "Do a parts count before you start. If your trucks arrived without kingpin nuts, or your wheels arrived without axle nuts, stop and message the supplier — assembling with missing hardware means half a build and a trip to find replacements.",
        ],
      },
      {
        heading: "Step 1 — attach the trucks to the deck",
        body: [
          "Look at the deck: one end is the nose, one is the tail. On a symmetric popsicle deck you cannot tell them apart yet — pick either end to be the front and stay consistent. Truck orientation matters: the kingpin (the vertical bolt on each truck) points inward, toward the middle of the deck, on both trucks.",
          "Line up the truck plate with the four mounting holes on the underside of the deck. Feed a mounting screw through each hole from the grip side (or where the grip will go) and thread it into the truck plate. Start all four screws finger-tight before you tighten any one down — starting one tight makes the others misalign.",
          "Tighten with the small screwdriver in a crisscross pattern: front-left, back-right, back-left, front-right. Do not torque any single screw down before the others are snug — this is what warps the truck plate and strips the deck holes. Tighten until the truck is firm against the deck, then stop. Overtightening from here does not make the truck 'more attached' — it just crushes the deck fibres.",
        ],
      },
      {
        heading: "Step 2 — fit the bushings and hangers",
        body: [
          "Some trucks ship pre-assembled with bushings and hangers in place. If yours did, skip to step 3. If you have to fit them yourself: on each truck, the sequence is bottom bushing, hanger, top bushing, then the kingpin nut.",
          "Bushings have a specific orientation. The wider face sits against the truck plate at the bottom and against the kingpin nut at the top. Getting this backwards makes the truck feel wrong in ways that are hard to diagnose later.",
          "Tighten the kingpin nut so the hanger is snug against the bushings but the truck can still turn when you press the deck sideways. Full tuning of the kingpin comes after you've ridden the board — use a middle setting to start.",
        ],
      },
      {
        heading: "Step 3 — press the wheels onto the axles",
        body: [
          "Slide a wheel onto each end of each truck's axle. On bearing wheels, the bearing should be inside the wheel already — you're just sliding the whole assembly onto the axle. On plastic-hub wheels, they slide on directly.",
          "Finger-tighten the axle nut over each wheel until the wheel spins freely but doesn't wobble side to side on the axle. If a wheel binds when the nut is finger-tight, back off half a turn; if the wheel wobbles at finger-tight, tighten a fraction more.",
          "Do all four wheels in one go. Wheels that spin at noticeably different speeds when flicked usually indicate uneven nut tightness, not bearing failure.",
        ],
      },
      {
        heading: "Step 4 — grip tape last",
        body: [
          "If your deck came with grip tape pre-applied, you're done — skip to the test roll. If not, apply grip tape now, after everything else is fitted.",
          "Peel a corner of the grip backing, place that corner at the deck's nose, and peel the rest of the backing away while pressing the tape down with a finger moving just behind the peel. Working steadily forces the air out ahead of you rather than trapping it. Rushing traps bubbles that never sit down.",
          "Trim the excess with a fresh blade held at a shallow angle to the deck edge — dull blades tear the tape and lift the edge, which is where every grip job starts peeling from.",
        ],
      },
      {
        heading: "The test roll — what to check before you start skating",
        body: [
          "Push the deck across a smooth surface with your finger. It should roll straight for at least a foot without pulling to one side.",
          "If it pulls, something is off. Common causes: uneven axle nut tightness (one wheel binding), truck plate warped by uneven mounting-screw torque, or trucks fitted with the kingpins pointing outward instead of inward.",
          "Press the deck side-to-side to test turning. Both trucks should give slightly under moderate pressure and return to centre when released. If one truck feels solid and the other feels loose, tighten the loose one's kingpin nut a quarter turn.",
          "Once the board rolls straight and turns evenly, you're done. Do not tighten anything further looking for a placebo effect — the setup is set.",
        ],
      },
      {
        heading: "The five mistakes first-time builders make",
        body: [
          "Overtightening the truck mounting screws. This is the number-one deck killer — the screws crush the deck fibres and the mounting holes strip. Tighten until snug, then stop.",
          "Fitting grip tape before the trucks. Adjusting trucks with grip tape already on means either working through the tape (which is awkward and often damages it) or peeling and reapplying.",
          "Wrong screw length. Screws that are too long punch through the top of the deck; screws that are too short don't engage enough deck to hold. Match to (deck thickness + truck plate + riser if any).",
          "Ignoring bushing orientation. Bushings have a wide end and a narrow end, and both trucks need them the same way round. Getting one right and one wrong gives you a board that turns one way but not the other.",
          "Kingpins pointing outward. Both trucks' kingpins should point toward each other, inward. Outward-pointing kingpins are geometrically wrong and turn the board oddly.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to assemble a fingerboard from parts?",
        a: "About 15 minutes if you have all the parts and the right screwdriver. Longer if you also need to grip tape a new deck.",
      },
      {
        q: "Do I need special tools?",
        a: "No. A small Phillips-head screwdriver or the mini tool that ships with most trucks is all you need. A dish for tiny parts helps but isn't strictly necessary.",
      },
      {
        q: "How tight should the truck mounting screws be?",
        a: "Snug — tight enough that the truck plate doesn't wobble against the deck, loose enough that you haven't crushed the deck fibres. If the screw head sits flush and the truck doesn't move, stop tightening. More force is where deck holes strip.",
      },
      {
        q: "Can I skate immediately after assembly?",
        a: "Yes. There's no break-in period — the setup is fully skateable once everything is on. Bushings may soften over the first hour of riding, at which point you might need a quarter-turn tighten on the kingpin nuts.",
      },
      {
        q: "What's the biggest first-time mistake?",
        a: "Overtightening the truck mounting screws. It feels more secure but it crushes the wood and permanently damages the deck. Snug is the target; anything more is wasted force.",
      },
    ],
    related: [
      "how-to-choose-fingerboard-trucks",
      "how-to-tune-fingerboard-trucks",
      "fingerboard-grip-tape-guide",
      "fingerboard-trucks-falling-off-fix",
    ],
  },

  // ============================================================
  // 8. FIXING LOOSE / STRIPPED TRUCKS
  // ============================================================
  {
    slug: "fingerboard-trucks-falling-off-fix",
    title: "Fingerboard Trucks Falling Off? Fix Stripped Holes and Loose Trucks",
    metaTitle: "Fingerboard Trucks Falling Off? Fix Stripped Deck Holes",
    metaDescription:
      "Fingerboard trucks falling off or wobbling loose? Diagnose stripped holes, wrong screw length and warped plates — and fix each without a new deck.",
    category: "Tuning",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "Trucks that fall off, wobble loose, or refuse to stay tight almost always have one of three causes: the deck's mounting holes are stripped, the screws are wrong for the deck thickness, or the truck plate itself has warped from uneven tightening. Each cause has a specific fix that saves the deck. This guide covers all three, plus how to prevent stripped holes in the first place. Buying a new deck is the last resort, not the first.",
    sections: [
      {
        heading: "Diagnose which of the three problems you have",
        body: [
          "First, look at the mounting holes on the underside of the deck. If the wood around the holes looks compressed, splintered or shiny, they are stripped — the screws no longer bite into fresh wood.",
          "If the holes look fine but the screws still don't hold, check the screw length. A screw that stops just short of engaging the deck's inner plies will feel tight briefly and loosen within a session. Compare the screw length to your deck thickness plus the truck plate — the screw should end inside the deck, not just under the plate.",
          "If holes and screws both look right, look at the truck plate itself while the truck is loose. Sight along the plate from the side — a warped plate will show visible curvature where it should be flat. Warping comes from uneven tightening; a warped plate never sits flat against the deck no matter how hard you tighten it.",
        ],
      },
      {
        heading: "Fix 1 — stripped mounting holes",
        body: [
          "The classic DIY fix works: fill the stripped hole with a slurry of wood glue and small wood shavings (or a matchstick trimmed to fit), let it cure for 24 hours, then re-drill and re-mount. This restores the hole's grip on the screw and buys the deck another life.",
          "The steps: with the truck removed, clean any old glue or debris out of the hole. Pack it lightly with a mixture of wood glue and finely shaved wood (a toothpick shredded with sandpaper works). Let cure fully — 24 hours minimum, longer for safety. When cured, drill a pilot hole with a bit slightly narrower than your mounting screw, then mount the truck with the correct screw and stop tightening as soon as it's snug.",
          "For a deck with multiple stripped holes, this fix works on each one independently. Beyond three of the four holes being stripped, the deck is probably done.",
        ],
      },
      {
        heading: "Fix 2 — wrong screw length",
        body: [
          "If the diagnosis is a length problem, order screws matched to your deck. Fingerboard screws come in ~5–10mm lengths and are cheap — a set of ten costs a couple of dollars. Match the length to (deck thickness + truck plate thickness), roughly 6–8mm for most standard setups.",
          "Longer is worse than shorter. A screw that punches through the top of the deck ruins the graphic and the grip tape; a screw that's slightly short still holds if the threads engage the deck's middle plies.",
          "If your current screws are the wrong length and holes are still intact, this is the cheapest fix on the list. Swap screws, tighten in the crisscross pattern until snug, done.",
        ],
      },
      {
        heading: "Fix 3 — warped truck plate",
        body: [
          "A warped plate cannot be restored by tightening harder — you're just pushing the deck up against a bent surface. The plate needs to be flat.",
          "Small warps can sometimes be corrected by placing the plate on a hard flat surface and pressing gently. Larger warps need a new truck; a warped baseplate is not a repairable part at fingerboard scale.",
          "Prevent this: always tighten screws in a crisscross pattern (front-left, back-right, back-left, front-right), a quarter turn per screw until snug. Tightening one screw all the way down before starting the next is what warps plates.",
        ],
      },
      {
        heading: "Prevention that costs nothing",
        body: [
          "Tighten screws in a crisscross pattern, snug and no more. The overtightening urge is where most damage comes from — the screw feels 'more attached' the harder you turn it, until suddenly the wood gives way and the hole is stripped.",
          "Use the right screw length from the start. If a screw feels like it's bottoming out before the head sits flush, it's too long; swap to shorter rather than forcing it.",
          "Check your screws every few sessions. Fingerboard screws are tiny and rely on friction — they walk loose over time even under normal skating. A quarter-turn tighten every couple of weeks prevents most 'sudden' truck-falling-off events.",
        ],
      },
      {
        heading: "When to replace the deck",
        body: [
          "Three of the four mounting holes stripped, and the fourth loose. At that point, glue-and-toothpick repair is a lot of work for one more session's use, and a new deck is a better investment.",
          "Visible cracking radiating from the mounting holes into the deck's centre. Cracks propagate — a deck with a crack this size will not survive many more sessions.",
          "The deck itself has developed a twist or curve. Trucks that were mounted straight but no longer sit level indicate the deck itself has warped, and no amount of screw or plate fixing solves that.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do my fingerboard trucks keep falling off?",
        a: "Almost always one of three things: stripped mounting holes in the deck, wrong screw length, or a warped truck baseplate. Diagnose which by inspecting the deck holes, comparing screw length to deck thickness, and sighting along the plate for curvature.",
      },
      {
        q: "Can I fix a stripped mounting hole?",
        a: "Yes. Fill the hole with a slurry of wood glue and shavings (or a trimmed matchstick and glue), cure 24 hours, then re-drill and re-mount. This restores enough grip for the deck to be usable again.",
      },
      {
        q: "How tight should mounting screws be?",
        a: "Snug — the plate should sit flush against the deck without gaps, and the screw head should be flush. Tightening past that point crushes the wood and strips the hole. If it feels tight and the plate doesn't wobble, stop.",
      },
      {
        q: "How do I know if my screws are the wrong length?",
        a: "Too long: they punch through the top of the deck and damage the grip. Too short: the threads don't engage the deck's middle plies, and the screw walks loose within a session. Match to deck thickness plus truck plate — usually 6–8mm for standard fingerboards.",
      },
      {
        q: "Is a warped truck fixable?",
        a: "Small warps sometimes flatten if you press the plate against a hard surface. Larger warps aren't repairable at this scale — a warped baseplate means a new truck.",
      },
    ],
    related: [
      "how-to-assemble-a-fingerboard",
      "how-to-choose-fingerboard-trucks",
      "how-to-tune-fingerboard-trucks",
    ],
  },

  // ============================================================
  // 9. OLLIE TUTORIAL
  // ============================================================
  {
    slug: "how-to-ollie-on-a-fingerboard",
    title: "How to Ollie on a Fingerboard: The First Trick, Step by Step",
    metaTitle: "How to Ollie on a Fingerboard: Beginner's Step-by-Step Guide",
    metaDescription:
      "How to ollie on a fingerboard, step by step. Finger placement, the pop-and-drag motion, common failures and drills to land your first clean ollie fast.",
    category: "Reference",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "The ollie is the first real trick in fingerboarding and the foundation for almost everything else. It's a two-finger motion where one finger pops the tail down and the other drags across the deck to level the board mid-air. The whole trick lasts less than a second. Learning it is 90% about finger placement and 10% about timing — most beginners get placement wrong and blame their timing. This guide walks through the exact finger positions, the drag motion, and the drills that build the muscle memory.",
    sections: [
      {
        heading: "What an ollie actually is",
        body: [
          "An ollie is the fingerboard equivalent of an ollie on a full-size skateboard — the deck pops off the surface without your fingers holding it up, using two coordinated inputs. One finger snaps the tail down against the surface, which sends the front of the deck rising into the air. The other finger drags forward across the top of the deck to level the deck as it flies up.",
          "When done correctly, the deck rises up, floats level for a split second, and comes back down flat. When done incorrectly, the deck either doesn't leave the ground (weak pop) or flies up nose-first and lands badly (weak drag).",
        ],
      },
      {
        heading: "Finger placement — the thing beginners get wrong",
        body: [
          "Two fingers. Almost always the index and middle fingers of your dominant hand. The index finger goes on the front of the deck (over the front truck bolts, roughly one-third from the nose). The middle finger goes on the tail — right on the raised kick.",
          "The specific placement of the middle finger on the tail is the single most common failure point. Too far forward and you don't hit the raised kick — the tail doesn't slam the ground properly. Too far back and the finger slips off the edge when you press down. It should sit exactly on the peak of the tail kick, where you can feel the wood curving up under your fingertip.",
          "Practise finding this position without popping. Put your finger on the tail, lift it, place it again, lift it. Do this until you can find the exact spot without looking.",
        ],
      },
      {
        heading: "The pop — first half of the trick",
        body: [
          "With fingers in position, press down sharply with the tail finger. The motion is a snap, not a push — a short, quick downward stab that hits the tail against the surface and immediately releases.",
          "As the tail hits the ground, the front of the deck rises up on its own — the tail acts as a pivot. Your front finger is not doing the lifting; the physics is. The front finger's job is to stay in light contact with the deck as it rises, ready for the drag motion.",
          "A common error: pushing down slowly on the tail instead of snapping. Slow presses don't generate the sudden force that makes the front of the deck rise. Sharp, quick, release.",
        ],
      },
      {
        heading: "The drag — second half of the trick",
        body: [
          "The moment the tail hits the ground and the front of the deck starts rising, your front finger drags forward toward the nose. The drag motion is what levels the deck — it presses down on the nose as the tail is bouncing up, which balances the deck out horizontally in the air.",
          "The drag is not a slap. It is a smooth forward slide across the top of the deck. If you drag too hard, the deck flips forward; if you don't drag enough, the deck stays angled tail-down and lands nose-first.",
          "Timing: the drag starts immediately after the pop — there is no pause between the two motions. It feels like a single continuous action, not two separate ones.",
        ],
      },
      {
        heading: "The landing",
        body: [
          "As the deck starts falling back to the surface, both fingers should stay in light contact with it, guiding it flat. When it lands, both wheels touch down at the same moment.",
          "If the deck lands nose-down, your drag was too gentle or too short — the front finger didn't level the deck out. If it lands tail-down, your drag was too aggressive — the front pushed too much.",
          "The final position of your fingers is roughly where they started but with the deck slightly further along the surface than it was.",
        ],
      },
      {
        heading: "Drills that build muscle memory faster",
        body: [
          "Drill 1: pop only. Practise the tail-pop motion alone, without the drag. Feel the front of the deck rise. Do it 20 times, aiming for the same height every time. This isolates the timing of the pop.",
          "Drill 2: pop and drag, in one motion. Add the front-finger drag. Don't worry about clearing the ground yet — just feel the two motions connect. Do 20 reps.",
          "Drill 3: obstacle-free ollies at moderate height. Aim for a specific height (say, 3–5mm off the surface) rather than 'as high as possible'. Consistency beats altitude at this stage.",
          "Drill 4: ollie over a small object. Place a coin or a small piece of wood in front of your fingerboard. Pop, drag, land on the other side. This trains you to time the lift with forward motion.",
          "If you can do Drill 4 five times in a row cleanly, you have the ollie. Everything else is variations.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to learn a fingerboard ollie?",
        a: "For most people, one to three focused sessions of 15–30 minutes each. The bottleneck is finger placement, not timing — once you're consistently finding the correct position on the tail, the motion clicks fast.",
      },
      {
        q: "Do I need special trucks or wheels to ollie?",
        a: "No. Any working fingerboard setup can ollie. If your trucks are so tight the deck can't lean, that's a tuning problem, but no special hardware is needed.",
      },
      {
        q: "Why does my board keep landing nose-first?",
        a: "Your drag isn't strong enough or isn't long enough. The front finger has to slide forward across the deck to level it — a gentle touch on the nose doesn't do it. Try a firmer, longer drag.",
      },
      {
        q: "Why does the board barely leave the ground?",
        a: "Your tail-pop is too slow. The pop is a snap — a quick downward stab that immediately releases. Slow presses don't generate the sudden force that lifts the deck. Try sharper, quicker.",
      },
      {
        q: "Which fingers should I use?",
        a: "Index and middle fingers of your dominant hand — index on the front (over the front truck bolts), middle on the tail. Some riders use index and ring, but index and middle is by far the most common and stable position.",
      },
    ],
    related: [
      "best-beginner-fingerboard-setup",
      "how-to-kickflip-on-a-fingerboard",
      "how-to-assemble-a-fingerboard",
    ],
  },

  // ============================================================
  // 10. KICKFLIP TUTORIAL
  // ============================================================
  {
    slug: "how-to-kickflip-on-a-fingerboard",
    title: "How to Kickflip on a Fingerboard: From Ollie to Flip Trick",
    metaTitle: "How to Kickflip on a Fingerboard: Beginner Flip Trick Guide",
    metaDescription:
      "How to kickflip on a fingerboard. The flick motion, finger placement, common failures, and the drills to your first kickflip after ollies.",
    category: "Reference",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "The kickflip is the ollie's next-door neighbour. It uses the same tail-pop and lift-off, but the front finger flicks off the deck's side rather than dragging across the top, causing the deck to rotate a full spin under your fingers in the air. It sounds harder than the ollie but for most people it takes only one to three sessions once the ollie is consistent. The whole trick lives in the flick — how the front finger moves off the deck. Get the flick right and the deck rotates. Get it wrong and nothing else you do matters.",
    sections: [
      {
        heading: "Prerequisite: your ollie has to be dialled",
        body: [
          "Do not start learning kickflips before you can consistently land clean ollies at a moderate height. The kickflip builds directly on the ollie's pop-and-lift motion — if your ollies are inconsistent, you'll be practising two things at once and both will suffer.",
          "The threshold: you can land ten ollies in a row cleanly, at the same modest height, with the board landing flat both wheels down. If you can do that, you're ready.",
        ],
      },
      {
        heading: "The one change from ollie to kickflip — the flick",
        body: [
          "The tail-pop is identical to the ollie. The middle finger snaps down on the tail exactly as before.",
          "The front finger is where the difference lives. Instead of dragging forward across the top of the deck, the front finger flicks off the side of the deck — angled outward and down, across the deck's edge nearer the nose. That flick applies rotational force to the deck as it leaves the ground, which spins it under your fingers.",
          "The flick happens at the same moment the drag would in an ollie. Same timing, different direction. Where an ollie drags forward, a kickflip flicks sideways-and-down.",
        ],
      },
      {
        heading: "Finger placement for the flick",
        body: [
          "The front finger sits in roughly the same place as an ollie — over the front truck bolts, one-third from the nose. But the angle of the finger matters more: instead of pressing flat against the top of the deck, the fingertip is angled slightly toward the far side of the deck, so it will flick outward when released.",
          "The middle finger on the tail sits exactly as it does for an ollie — on the peak of the kick.",
          "Test your placement without popping: press both fingers on the deck. Your front fingertip should be positioned so that a slight outward motion would carry it off the side of the deck. If it would slide straight forward, you're in ollie position, not kickflip position.",
        ],
      },
      {
        heading: "The trick, motion by motion",
        body: [
          "Pop the tail with the middle finger — same snap as an ollie. Simultaneously, the front finger flicks outward off the side of the deck. The two motions happen together, not sequentially.",
          "As the deck rises, it will start spinning under your fingers. Your fingers rise slightly to give it room to rotate — this feels counterintuitive, because your instinct is to reach for the deck to catch it, but reaching too early stops the rotation.",
          "Wait for the deck to complete one full rotation. You'll see the grip tape face upward again just before the deck starts falling.",
          "As the deck falls back toward you, both fingers come down to meet it, landing on the top. Both wheels should touch the surface at the same moment.",
        ],
      },
      {
        heading: "Why the flick often fails",
        body: [
          "The flick is too gentle. If your fingertip only barely brushes the deck's side, the rotation is weak and the deck either doesn't complete a full spin or wobbles instead of rotating cleanly. Flick harder.",
          "The flick is in the wrong direction. If your finger slides forward instead of sideways-and-down, you're doing an ollie, not a kickflip. The direction matters — outward off the deck's side, not forward across the top.",
          "You catch the deck too early. If your fingers come down while the deck is still rotating, you stop the spin and land on the trucks. Wait until you see the grip tape face upward again before reaching down.",
          "The pop is too weak. If the deck doesn't get enough air to complete a rotation, the flick has no room to work. Make sure your pop is at the same height as your best ollies before adding the flick.",
        ],
      },
      {
        heading: "Drills that isolate the parts",
        body: [
          "Drill 1: pop-and-flick with no attempt to land. Just pop the tail, flick the front finger, and let the deck spin off wherever it wants. Do this 20 times, focused only on the rotation. You'll feel when the flick is strong enough to complete a full spin.",
          "Drill 2: pop, flick, catch late. Once the rotation is consistent, wait until the deck is well into its spin before catching it. Land on the trucks if the timing is wrong — that's fine at this stage, you're just learning when to catch.",
          "Drill 3: kickflip and land flat. Combine the two — pop, flick, wait, catch. Aim for both wheels touching down at once. This is where hours are spent, and consistency comes with reps.",
          "Drill 4: kickflip in sequence with an ollie. Alternate: ollie, kickflip, ollie, kickflip. This trains you to switch between drag and flick without confusion — the two motions live in your fingers together.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to learn a kickflip after landing an ollie?",
        a: "One to three focused sessions for most people. The kickflip is much closer to the ollie than it feels — same pop, same lift-off, one different finger motion. Once your ollie is dialled, the kickflip comes fast.",
      },
      {
        q: "What's the difference between an ollie and a kickflip in fingers?",
        a: "The tail-pop is identical. The front finger changes: an ollie drags forward across the top of the deck, a kickflip flicks outward off the side. Same timing, different direction.",
      },
      {
        q: "Why won't my board rotate?",
        a: "Your flick is either too gentle or in the wrong direction. The flick has to be forceful enough to spin the deck, and it has to move sideways-and-down off the deck's edge — not forward across the top.",
      },
      {
        q: "Should I try a kickflip before I can ollie?",
        a: "No. Learning both at once means practising two things badly. Get to ten clean ollies in a row before adding the flick. It will take less total time than trying to skip the step.",
      },
      {
        q: "Can I do a kickflip on any deck?",
        a: "Yes. Kickflips work on any working fingerboard setup regardless of width or concave. If anything, a slightly deeper concave makes the flick easier because the finger has more edge to catch on.",
      },
    ],
    related: [
      "how-to-ollie-on-a-fingerboard",
      "fingerboard-concave-explained",
      "best-beginner-fingerboard-setup",
    ],
  },
];
