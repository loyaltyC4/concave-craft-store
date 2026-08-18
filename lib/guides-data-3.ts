import type { Guide } from "./guides-data";

/**
 * Guide content batch 3.
 *
 * The mold-decision guide added earlier this session was designed not to
 * overlap /search/deck-building — it covers choosing between the 12 real
 * molds we stock and diagnosing failed presses.
 *
 * The 8 P0 guides that follow it come out of the Aug 2026 GSC analysis:
 * each targets a specific query where fingerboardlab.com already earns
 * impressions but has no matching landing page. Priority order backs into
 * observed demand, not competitor keyword tools.
 */
export const guidesBatch3: Guide[] = [
  // ============================================================
  // 1. MOLD DECISION GUIDE (from earlier this session)
  // ============================================================
  {
    slug: "which-fingerboard-mold-to-buy",
    title: "Which Fingerboard Mold Should You Buy? Concave, Kick and Piece Count Compared",
    metaTitle: "Which Fingerboard Mold Should You Buy? Full Comparison",
    metaDescription:
      "Compare fingerboard molds by concave depth, kick height, piece count and material. A decision guide to picking the right press mold for how you actually skate.",
    category: "Buying",
    readMinutes: 9,
    updated: "2026-08-18",
    heroSummary:
      "Pick your mold by concave depth first, because that is the one property you cannot change afterwards. Shallow concave suits pushing, cruising and beginners who are still finding the board with their fingers. Medium concave is the safe default and what most riders should buy first. Deep concave locks your fingers in for flip tricks but punishes sloppy technique. Kick height, piece count and mold material all matter, but they are secondary decisions you make after concave.",
    sections: [
      {
        heading: "Start with concave depth — it is the only irreversible choice",
        body: [
          "A mold sets the curve across the width of the deck, and that curve is permanent once the glue cures. You can re-grip a deck, swap its trucks, sand its edges and reshape its outline. You cannot make a shallow deck deeper. So concave is the decision to get right, and every other spec is negotiable afterwards.",
          "Shallow concave gives a flatter platform. Your fingers sit on top of the board rather than inside it, which makes pushing and cruising comfortable and makes the board forgiving when your placement is imprecise. It is the honest recommendation for a first press, because a shallow deck that you pressed slightly wrong is still rideable.",
          "Medium concave is where most riders end up, and it is what we would tell you to buy if you are only buying one mold. There is enough curve to locate your fingers by feel without looking, but not so much that a small placement error kills the trick. If you are undecided after reading this whole guide, buy medium.",
          "Deep concave is a specialist choice. The curve grips your fingertips and makes flip tricks noticeably easier to catch, which is why technical riders prefer it. The trade-off is real: deep concave is less comfortable for long cruising sessions, and it exposes technique problems rather than hiding them. It also asks more of your pressing — deep curves put more stress on the outer plies and are the most likely to spring back or delaminate on a first attempt.",
        ],
      },
      {
        heading: "What kick height actually changes",
        body: [
          "Kick is the upward bend at the nose and tail. Higher kicks give you more leverage for popping the board off the surface, so ollies and anything that starts with a pop come more easily. Lower kicks keep the board closer to flat, which makes manuals and grinds more stable and makes the deck feel longer underfoot.",
          "The thing nobody mentions: high kicks are harder to press cleanly. The tighter the bend, the more the outer plies want to lift away from the stack while the glue is curing, and the kick is where almost every delamination starts. If this is your first press, a lower kick is a genuinely easier build.",
          "Kick and concave are independent, which is why our range carries combinations of both — shallow concave with a high kick, deep concave with a high kick, and so on. Decide concave first, then pick your kick within that group.",
        ],
      },
      {
        heading: "Two, three or four pieces — what the extra parts buy you",
        body: [
          "A two-piece mold is a matched positive and negative that closes on the veneer stack in one action. It is the simplest thing to use and the hardest to get wrong, because there is only one way for the two halves to meet.",
          "A three-piece set separates the kick forming from the concave forming, so the plies are bent in stages rather than all at once. That reduces the stress on the outer plies at the kicks, which is exactly where first-time presses fail. Several of ours ship with a scribe, which is the marking jig for cutting a consistent outline afterwards.",
          "A four-piece set gives you the most control — separate blocks let you form kicks and concave independently and adjust how much of each you apply. It is the right tool if you intend to press a run of decks to a repeatable spec. It is the wrong tool for your first attempt, because more parts means more ways for the stack to shift while you are clamping.",
          "Honest summary: buy two- or three-piece for your first mold. Buy four-piece when you already know what you are correcting for.",
        ],
      },
      {
        heading: "Wood or metal",
        body: [
          "Wood and resin molds are cheaper, entirely capable of producing good decks, and what most home builders use. Their limitation is wear — wood compresses slightly every time you clamp it, so a mold that has pressed many decks will not hold quite the same shape it did when new. For occasional building, that drift will not bother you.",
          "Metal molds hold their tolerance effectively indefinitely, transfer clamping pressure more evenly, and are the right choice if you are pressing decks in quantity or selling what you press. They cost several times more, and the honest reason to buy one is repeatability, not deck quality — a well-used wood mold and a metal mold in the same shape will both produce a good single deck.",
          "If you are choosing between a metal mold and a wood mold plus a stack of veneer, buy the wood mold and the veneer. Presses fail from lack of practice far more often than from mold material.",
        ],
      },
      {
        heading: "Alignment pins, and the one failure you cannot sand out",
        body: [
          "Alignment pins are steel dowels that register the halves of the mold to each other so they can only close in one position. Molds without pins rely on you holding the halves in place while you apply pressure.",
          "This matters more than it sounds. If the halves shift sideways during clamping, the deck cures with a twist along its length — one truck sits at a slightly different angle to the other. A twisted deck does not roll straight, and unlike a rough edge or a thin patch of glue, you cannot fix it afterwards. The shape is set. You press it again from new veneer or you ride something that pulls to one side.",
          "If you are choosing between two otherwise similar molds, take the one with pins.",
        ],
      },
      {
        heading: "What you actually need besides the mold",
        body: [
          "A mold on its own presses nothing. A complete first setup is the mold, maple veneer or pre-cut blanks, wood glue, and a way to apply steady pressure — clamps are fine and most builders start there.",
          "Pre-cut blanks are worth the small premium on a first build. They come sized for deck production, so you skip the cutting step and the outline comes out consistent, which removes one of the several things that can go wrong on a first attempt.",
          "A scribe or marking jig is optional but makes a visible difference to the finished outline, because it lets you mark the same shape every time rather than eyeballing it. Some of our mold sets include one; there is also a standalone scribe if your mold does not.",
          "Budget for spoiling the first two or three decks. Everyone does, the veneer is the cheapest part of the setup, and the failures are how you learn what your clamping pressure actually does.",
        ],
      },
      {
        heading: "Four presses that go wrong, and what caused them",
        body: [
          "Springback — the deck relaxes after you take it out and the concave is shallower than the mold. Usually the glue had not fully cured before you released the pressure. Leave it clamped longer; the cure time on the glue bottle is a minimum, not a target.",
          "Delamination at the kicks — an outer ply lifts away at the nose or tail. The bend was too tight for the ply to follow, or there was not enough glue where it mattered most. A staged three-piece press or a lower kick both reduce this.",
          "Twist along the length — the deck is not flat between the trucks. The mold halves moved during clamping. This is the alignment-pin failure above, and it is the one you cannot recover.",
          "Glue starvation — dry patches between plies, often visible as a pale line at the edge. Too little glue, or clamping pressure so high that it squeezed the glue out of the joint. More pressure is not better; even pressure is better.",
        ],
      },
    ],
    table: {
      title: "Our mold range, by what it is for",
      columns: ["Mold", "Concave", "Kick", "Best for"],
      rows: [
        ["Q27", "Shallow", "High", "First press, but you want pop. Forgiving curve, easy to ride."],
        ["B27", "Shallow", "High", "Cruising and pushing with ollie leverage. Comfortable for long sessions."],
        ["S27", "Medium", "Standard", "The default recommendation. Buy this if you are buying one mold."],
        ["BH25", "Medium", "Standard", "As above; pick on availability and price."],
        ["BH25 Pro Metal", "Medium", "Standard", "Same shape in metal — for pressing runs, or selling what you press."],
        ["D27", "Deep", "Standard", "Technical riding. Locks the fingers in for flip tricks."],
        ["BD26", "Deep", "High", "Most aggressive combination we stock. Experienced builders only."],
        ["Style A — 3-piece + scribe", "Set", "Set", "Staged pressing plus a marking jig. Strong first-mold set."],
        ["Style D — 4-piece", "Set", "Set", "Maximum control over kick and concave separately. Repeatable runs."],
        ["Style G / Style K", "Set", "Set", "Alternative set geometries; Style K ships with a scribe."],
        ["Press mold with metal alignment pins", "—", "—", "Pinned registration. The anti-twist option."],
        ["Deck scribe — jig only", "—", "—", "Add a marking jig to a mold you already own."],
      ],
    },
    faqs: [
      {
        q: "How deep should the concave on my first deck be?",
        a: "Medium. It is comfortable enough to cruise on, curved enough to locate by feel, and forgiving enough that a slightly imperfect press is still a deck you will ride. Shallow is the safer choice if you mostly push and cruise; leave deep concave until you have pressed a few and know what your clamping does.",
      },
      {
        q: "Can one mold press more than one deck width?",
        a: "Only within the width the mold was cut for. A mold shaped for a 32mm deck will not correctly form a 34mm blank — the concave will not reach the edges and the outer plies will sit flat. Match the mold width to the blanks you plan to press, and check the stated size before ordering.",
      },
      {
        q: "How many decks will a wooden mold press before it wears out?",
        a: "There is no fixed number, and anyone quoting one is guessing. Wood compresses gradually with each clamp cycle, so the change is slow and continuous rather than a sudden failure. Occasional builders will not notice it. If you press often enough to care, that is the signal to move to a metal mold.",
      },
      {
        q: "Do I need a scribe, or can I cut the outline by hand?",
        a: "You can cut by hand, and plenty of people do. A scribe marks the same outline every time, which matters once you are pressing more than one deck and want them to match. If your mold set does not include one, it can be added separately later — it is not a first-purchase requirement.",
      },
      {
        q: "My deck lost its concave after I took it out of the mold. What went wrong?",
        a: "That is springback, and it almost always means the glue had not fully cured when you released the pressure. Leave the next one clamped considerably longer than the minimum on the glue bottle. Deep-concave shapes spring back more than shallow ones, which is another reason not to start with the deepest mold you can buy.",
      },
      {
        q: "Is a metal mold worth it for a beginner?",
        a: "No. A metal mold buys repeatability across many presses, not a better single deck. A beginner gets more from a wood or resin mold plus enough veneer to press five or six decks, because the skill you are missing is clamping technique, not tooling precision.",
      },
    ],
    related: [
      "how-to-press-a-fingerboard-deck",
      "fingerboard-concave-explained",
      "fingerboard-deck-materials-explained",
      "fingerboard-sizing-guide",
    ],
  },

  // ============================================================
  // 2. FINGERBOARD BEARINGS — targets "bearing wheels" (8 impr) et al
  // ============================================================
  {
    slug: "which-fingerboard-bearings-to-buy",
    title: "Fingerboard Bearings Guide: What Matters (and What Is Marketing)",
    metaTitle: "Fingerboard Bearings Guide: What Actually Matters",
    metaDescription:
      "Fingerboard bearings compared honestly: ABEC ratings are largely marketing at this scale. Learn what matters — fit, seals and cleanliness — and how to pick.",
    category: "Buying",
    readMinutes: 7,
    updated: "2026-08-18",
    heroSummary:
      "Bearing wheels roll noticeably faster and longer than plain plastic-hub wheels, which is why almost everyone upgrades to them within their first few weeks. The three things that actually matter when choosing bearings for a fingerboard are the fit against your specific truck axle, whether the seals are open or shielded, and how you keep them clean. ABEC ratings, ball counts and steel grades matter for real skateboards; at fingerboard scale, they are almost entirely marketing.",
    sections: [
      {
        heading: "Why bearing wheels roll better than plastic-hub wheels",
        body: [
          "A plastic-hub wheel spins directly on the truck axle — plastic against metal, with only a little grease between them. There is measurable friction from the moment the wheel starts moving, and that friction converts your push into heat rather than distance.",
          "A bearing wheel places tiny steel balls between the wheel and the axle. The balls roll rather than slide, so friction drops sharply, the wheel spins for longer after each push, and the whole board feels livelier under your fingers. That is the entire mechanical reason a $19 complete with bearing wheels feels dramatically different from a $5 toy complete.",
          "The upgrade is worth doing. What is not worth doing is paying a premium for specific bearing grades that were designed for full-size skateboards.",
        ],
      },
      {
        heading: "What ABEC ratings actually mean, and why they don't matter here",
        body: [
          "ABEC 3, ABEC 5, ABEC 7, ABEC 9 — you will see these numbers on nearly every fingerboard bearing listing. The ABEC scale is a real engineering standard, and it defines dimensional tolerance for bearings running at industrial rpm — think spindles, motors, precision machinery.",
          "A fingerboard bearing turns a few hundred revolutions per minute at absolute maximum. At that speed, the difference between ABEC 3 and ABEC 9 tolerance is completely invisible to your finger. You cannot feel it. It doesn't affect roll distance. It doesn't affect trick response. What matters at fingerboard scale is that the bearing is a clean, sealed unit that fits your axle without slop.",
          "Higher ABEC ratings do cost more, and manufacturers keep printing them on the box because they let brands sell the same physical bearing at different price tiers. If you buy a $6 bearing wheel and a $18 bearing wheel from reputable makers, the perceptible difference will not be the ABEC number — it will be the fit, the seal and the wheel material.",
        ],
      },
      {
        heading: "What actually matters — three checks in order",
        body: [
          "First: fit. Fingerboard trucks come in slightly different axle diameters. A bearing sold for one truck brand can be a fraction of a millimetre too loose or too tight on another, and the effect on spin is much larger than any ABEC step. If you already own trucks, buy bearings matched to that brand where possible, or check the listed axle diameter before ordering. Slop between axle and inner race is felt as looseness and audible rattle.",
          "Second: seals. Open bearings spin very slightly freer when new but pick up dust and hair within days, and grit is what actually kills spin. Shielded bearings (a thin metal cover over the balls) have a barely detectable amount more resistance new, but keep spinning for months rather than days. For fingerboards on desks — where hair and lint dominate — shielded wins.",
          "Third: cleanliness at unpacking. Fingerboard bearings ship packed with a fair amount of grease. Spin a new wheel by hand; if it feels sluggish rather than free, some of that packing grease is inside where it does not need to be. A brief soak in isopropyl alcohol and a light re-lube is fine — the specific procedure lives in the cleaning guide below.",
        ],
      },
      {
        heading: "Bearing wheels vs bearings you install yourself",
        body: [
          "Two shapes of product exist at this scale. Bearing wheels come as complete wheels with the bearings pre-fitted — you swap the whole wheel. Loose bearings are the pressed steel units on their own, which you fit into wheels that have bearing seats.",
          "For beginners, bearing wheels are the right choice. There is no fitting step, no risk of pressing a bearing in crooked, and you get consistent results out of the box. The wheels our starter setups ship with are this style.",
          "Loose bearings become useful once you start pressing your own decks or building custom setups, because you can put the same bearing into a wheel of a specific durometer or width. That is a builder concern, not a first-fingerboard concern.",
        ],
      },
      {
        heading: "The three signs your bearings are done",
        body: [
          "Grinding sound when spinning. That is grit inside the race, and it will get worse. Clean them; if the sound persists after a clean and re-lube, they are done.",
          "Spin decay measured in a second or two. A healthy bearing wheel, given a good flick, spins visibly for several seconds. If a wheel stops almost as soon as you let go, either something is pressing on the race or the grease has thickened up.",
          "Wobble under load. If a wheel visibly rocks side to side when you push down on it, the inner or outer race is worn. Bearings are consumable — even good ones eventually go. Bearing wheels are cheap enough that replacement is almost always the right answer.",
        ],
      },
    ],
    table: {
      title: "Bearing choices at a glance",
      columns: ["What you want", "What to look for", "What to ignore"],
      rows: [
        ["Consistent, fast roll", "Shielded bearings, snug axle fit", "ABEC number on the packaging"],
        ["Long life on a dusty desk", "Shielded (not open) bearings", "Steel grade claims"],
        ["Cheapest working setup", "Any bearing wheel from a real fingerboard brand", "$3 unbranded bearings from marketplace listings"],
        ["Builder flexibility", "Loose bearings + wheels with bearing seats", "Complete wheels if you plan to swap parts"],
        ["Quiet running", "Well-lubed shielded bearings", "Ceramic or 'silent' marketing terms"],
      ],
    },
    faqs: [
      {
        q: "Do I need ABEC 9 bearings on my fingerboard?",
        a: "No. ABEC ratings are a tolerance standard designed for industrial rpm; at fingerboard speeds the ABEC step is undetectable. Buy for fit and seal, not for the number on the box.",
      },
      {
        q: "Are ceramic bearings worth it for a fingerboard?",
        a: "Not for the vast majority of riders. Ceramic bearings genuinely help at very high rpm and in wet environments — neither applies to a fingerboard on a desk. Save the money for two or three sets of decent shielded steel bearings.",
      },
      {
        q: "Should I get open or shielded bearings?",
        a: "Shielded. On any surface that has dust, hair or carpet fibre — which is most desks — open bearings foul quickly and lose spin within days. Shielded bearings keep going for months.",
      },
      {
        q: "How often should I clean fingerboard bearings?",
        a: "When you notice spin decay or a grinding sound, not on a schedule. A shielded bearing on a clean desk can go months without a clean. One that lives on carpet or a dusty windowsill may need attention every few weeks.",
      },
      {
        q: "Can I use skateboard bearings on a fingerboard?",
        a: "The inner and outer diameters are wrong — full-size skateboard bearings are 22mm outer, and fingerboard axles are much narrower. You would need bearings sized for fingerboards specifically, sometimes sold as '3x6x2.5mm' or 'micro bearings' in maker communities.",
      },
      {
        q: "Why does one of my new bearing wheels spin slower than the others?",
        a: "Most commonly, packing grease has settled unevenly during shipping. Spin the slow wheel a few dozen times to redistribute the grease, or clean it lightly with isopropyl alcohol and re-lube. If the slow spin persists, that specific bearing is probably faulty — reputable brands replace them.",
      },
    ],
    related: [
      "how-to-clean-fingerboard-bearings-and-wheels",
      "how-to-choose-fingerboard-trucks",
      "best-beginner-fingerboard-setup",
    ],
  },

  // ============================================================
  // 3. WHEEL DUROMETER — targets "which wheel durometer" + wheel queries
  // ============================================================
  {
    slug: "fingerboard-wheel-durometer-explained",
    title: "Fingerboard Wheel Durometer Explained: Soft, Medium and Hard Wheels Compared",
    metaTitle: "Fingerboard Wheel Durometer Explained (Soft vs Hard)",
    metaDescription:
      "Fingerboard wheel durometer decoded. The A-scale numbers (78A–101A), what soft, medium and hard wheels do differently, and which durometer suits how you skate.",
    category: "Tuning",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Wheel durometer is how hard the urethane is. It is measured on the A scale — 78A is soft, 101A is very hard — and it changes how your fingerboard behaves more than most people expect. Soft wheels grip and cushion but slow the board down. Hard wheels slide and roll fast but transmit every desk vibration to your fingers. For most riders, mid-range hardness around 95A is the honest default: fast enough to be lively, soft enough to grip when you land.",
    sections: [
      {
        heading: "The A scale, in plain language",
        body: [
          "Durometer is a standard measurement of how much a material resists indentation. The A scale runs from 0 (softest) to 100+ (hardest). For urethane skateboard-family wheels, the useful range sits between about 78A and 101A. Below 78A the wheel feels almost like rubber and does not roll cleanly; above 101A you are in the territory of race-grade urethane that behaves closer to plastic.",
          "The number is printed on the wheel or on the packaging. Two wheels of the same size and shape can behave dramatically differently based on their durometer alone.",
        ],
      },
      {
        heading: "What soft wheels do (78A–87A)",
        body: [
          "Soft wheels deform slightly under load, which gives them mechanical grip against the surface. On a fingerboard, this translates to trucks that don't skid unexpectedly, wheels that stay on rails longer, and a smoother ride over textured desks.",
          "The trade-off is speed. Every push loses a small amount of energy to that deformation, so the board rolls a shorter distance and feels heavier under your fingers. Soft wheels also wear faster on rough surfaces — the same grip that holds them on the rail also drags off small amounts of urethane.",
          "Buy soft if you want a forgiving, quiet ride on a smooth desk, or if you skate a lot of grippy obstacles where a hard wheel would slip.",
        ],
      },
      {
        heading: "What medium wheels do (88A–95A)",
        body: [
          "Medium is the standard hardness that most fingerboards ship with, and it is where the honest default sits for one-set-of-wheels riders. The board rolls freely enough to feel alive, but the wheels still grip enough for consistent landings.",
          "If you are new, this is what you already have. Do not swap them until you know what you are trying to change.",
        ],
      },
      {
        heading: "What hard wheels do (96A–101A)",
        body: [
          "Hard wheels barely deform under load. That means less rolling resistance, longer roll distances per push, and a lively feel that experienced riders learn to prefer. They also slide more readily, which makes powerslides, ledge slides and other slip-based tricks noticeably easier.",
          "The costs are real. Hard wheels transmit every surface texture directly to your fingers, so a rough or uneven desk becomes fatiguing. They also lose grip on cambered obstacles and can skate away from you on rails when you're expecting bite. Newer riders often find hard wheels harder to control, then wonder if they should have paid less.",
          "Buy hard if you specifically want more slide, or if you skate on a very smooth surface and want maximum roll.",
        ],
      },
      {
        heading: "How durometer interacts with wheel size",
        body: [
          "A wider wheel spreads load over more urethane, so a wide soft wheel does not feel as soft as a narrow one at the same durometer. Big wheels also carry more inertia — once they are moving, they keep going longer. If you swap to a bigger wheel and it feels sluggish, do not blame the durometer alone; the extra mass is part of the effect.",
          "Wheel diameter also matters to obstacles. Very small wheels catch on obstacle edges more readily; larger wheels roll over minor deck defects and tape seams. Standard fingerboard wheels sit in a narrow diameter range for exactly this reason.",
        ],
      },
      {
        heading: "One practical trap: cheap generic urethane",
        body: [
          "The number on the wheel is a description, not a guarantee. Cheap generic wheels sometimes ship with a printed durometer that bears no honest relationship to the actual hardness of the urethane inside — the marking has been copied from what a real brand uses. The wheel then feels either much softer or much harder than the label suggests, and it wears in unusual ways.",
          "The fix is boringly simple. Buy wheels from a fingerboard brand whose product you can look up — Oak Wheels, brand-name bearing wheels from a real shop, or anything a fingerboard community actively recommends. The number matters much less than the brand honoring it.",
        ],
      },
    ],
    table: {
      title: "Durometer at a glance",
      columns: ["Hardness", "Range", "Feel", "Best for", "Watch out for"],
      rows: [
        ["Soft", "78A–87A", "Grippy, quiet, cushioned", "Rough surfaces, grippy obstacles, beginners", "Slower roll, faster wear"],
        ["Medium", "88A–95A", "Balanced, lively but forgiving", "Most riders, most desks", "Nothing — this is the safe default"],
        ["Hard", "96A–99A", "Fast, slippery, transmits texture", "Smooth surfaces, slide tricks, experienced riders", "Loose feel, less grip"],
        ["Very hard", "100A–101A+", "Race-grade slide, minimal grip", "Race-grade wheels, specialised setups", "Wrong choice for beginners"],
      ],
    },
    faqs: [
      {
        q: "What durometer wheels come on a standard fingerboard complete?",
        a: "Most completes ship with medium-hard wheels in the 92A–95A range. That is intentional — it is the widest usability band. If your complete surprises you either way (much grippier or much slidier than expected), the wheels are outside that band.",
      },
      {
        q: "Which durometer is best for beginners?",
        a: "Medium (88A–95A). A softer wheel is more forgiving but tricks feel slower to learn on; a harder wheel rolls fast but slides at bad moments. Medium is where trick response and stability line up.",
      },
      {
        q: "Are 101A wheels bad?",
        a: "Not bad — specialised. 101A urethane rolls faster and slides earlier than anything else. Skilled riders who want a slick, race-fast feel love them. First-time riders often mistake the lack of grip for something being wrong with the board.",
      },
      {
        q: "Do soft wheels really slow the board down?",
        a: "Measurably, yes. The energy that goes into deforming a soft wheel under load has to come from somewhere, and it comes from your push. You will feel it as a shorter roll per push. Whether that matters depends on what you are doing.",
      },
      {
        q: "Can I mix durometers on the same board?",
        a: "You can, and some riders deliberately do — softer wheels at one end for grip on landings, harder at the other for slides. It is not a beginner move, but it is a real tuning trick for people who know what they are chasing.",
      },
    ],
    related: [
      "how-to-choose-fingerboard-trucks",
      "how-to-clean-fingerboard-bearings-and-wheels",
      "which-fingerboard-bearings-to-buy",
    ],
  },

  // ============================================================
  // 4. FOAM TAPE — targets "fbs fingerboard tape" (2 impr) + foam grip queries
  // ============================================================
  {
    slug: "fingerboard-foam-tape-guide",
    title: "Fingerboard Foam Tape Explained: Foam Grip vs Standard Grip Tape",
    metaTitle: "Fingerboard Foam Tape vs Standard Grip Tape",
    metaDescription:
      "Foam-style fingerboard tape (FBS-style pads) versus standard sandpaper-grip tape: what each does, when to use which, and how to apply either without air bubbles.",
    category: "Tuning",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "Foam tape is a thicker, softer grip surface that lives between traditional sandpaper-style grip tape and an unfinished deck. It grips through friction rather than abrasion, so it doesn't shred your fingertips and it stays quieter on landings, but it also wears faster and can move under the pressure of tricks. Standard grip tape is the honest default. Foam pads are the right pick if you fingerboard for long sessions, dislike raw-fingertip feel, or want a quieter setup.",
    sections: [
      {
        heading: "Two grip surfaces that solve two different problems",
        body: [
          "Standard fingerboard grip tape is a thin sheet of coarse abrasive — miniature sandpaper, essentially — that gives your fingertips something to bite against. It transfers force efficiently to the deck, which is why it is the default choice on most completes.",
          "Foam tape (sometimes sold as FBS-style pads or foam grip) uses a soft, closed-cell foam surface instead. Rather than gripping through abrasion, it grips through friction and compression — your fingertip presses slightly into the foam and the two surfaces lock together for the duration of the trick. Foam pads are noticeably thicker than standard tape, and they change how the deck feels under your fingers.",
        ],
      },
      {
        heading: "What foam tape does well",
        body: [
          "Comfort over long sessions. Standard grip tape gradually wears the fingertips of anyone who skates for hours a day, and can leave the skin raw or shiny. Foam pads are much easier on the fingers, so people who fingerboard for extended sessions often prefer them.",
          "Quieter landings. The compressible surface absorbs some of the impact of a landing rather than transmitting the full click to the deck. Boards with foam tape sound softer, which matters more than it sounds when you are skating late at a shared desk.",
          "A slightly forgiving feel. Because the foam compresses under your finger, small placement errors register less than they do on standard tape. Some riders find this makes learning tricks feel more natural; others find it dulls the direct connection they want from a fingerboard.",
        ],
      },
      {
        heading: "What foam tape does less well",
        body: [
          "Faster wear. The foam surface compresses and eventually crushes flat, especially at the nose and tail where your fingers pop the board. You may replace foam pads once or twice a month if you skate daily, versus grip tape that lasts for many months.",
          "Movement under high-force tricks. Foam is thicker and slightly softer than standard tape, so the adhesive layer works harder to hold it in place. Pop-heavy tricks can cause foam pads to shift over weeks in ways that grip tape rarely does.",
          "Different flip trick feel. If you learned flip tricks on standard grip, foam will initially feel wrong — your fingers will find the board slightly higher and slightly less locked-in. Give it a session before deciding. Most people adjust in an hour of skating.",
        ],
      },
      {
        heading: "How to apply either without regretting it",
        body: [
          "Start with a clean deck. Any dust or old glue between the tape and the deck becomes an air bubble later. If you're re-gripping, remove the old tape and any residue with mild adhesive remover or isopropyl alcohol before you start.",
          "Peel a small corner of the backing, place that corner exactly where you want the nose to sit, then peel the backing away in one steady motion while pressing the tape down with a finger travelling just behind the peel line. This chases the air out ahead of you rather than trapping it. Working slowly does not help; working steadily does.",
          "Trim with a fresh blade held at a shallow angle to the deck edge. A dull blade tears the tape and lifts the edge, which is where every piece of grip starts peeling.",
          "For foam pads that ship in pre-cut sizes, dry-fit first without peeling the backing. Most complete boards want two pads — a nose pad and a tail pad — with a small gap in the middle where your finger sits. Get the placement right before you commit to the adhesive.",
        ],
      },
      {
        heading: "The one honest rule",
        body: [
          "Do not put standard grip and foam on the same deck at once. It is tempting to think you can get the best of both, but the height difference alone breaks flip tricks — your finger constantly encounters an edge where the surface changes. Pick one system per deck and commit to it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is foam tape better than standard grip tape?",
        a: "Neither is universally better. Foam is more comfortable and quieter; standard grip is more responsive, longer-lasting and cheaper. If you skate long sessions or dislike raw-finger feel, try foam. If you want the most direct connection to the deck, standard grip wins.",
      },
      {
        q: "How long does foam grip tape last?",
        a: "Weeks to months, depending on how much you skate. The pads compress permanently over time, and the nose and tail wear first. A visibly flattened pad is the signal to replace it — flattened foam grips much less than fresh foam.",
      },
      {
        q: "Does foam tape work on tricks like kickflips?",
        a: "Yes, once you adjust. The slightly higher deck surface and softer feel can throw off timing for a session or two. After that, most riders land flip tricks just as consistently on foam as on standard grip.",
      },
      {
        q: "Can I put foam tape over standard grip tape?",
        a: "You can, and some riders do to add cushion without removing existing grip. It works, but adhesion is weaker (foam sticking to a grippy surface holds less well than foam sticking to raw deck), and the deck feels much thicker. Removing the standard grip first is cleaner.",
      },
      {
        q: "How do I remove old foam tape without damaging the deck?",
        a: "Warm it with a hairdryer for thirty seconds, which softens the adhesive. Lift a corner with a fingernail and peel slowly at a shallow angle to the deck. Any residue that stays behind comes off with isopropyl alcohol on a cloth.",
      },
      {
        q: "Why does my grip tape keep peeling at the edges?",
        a: "Two usual causes. Either it wasn't cut cleanly at the edge (dull blade tears leave a lifted lip that catches on things), or the deck wasn't clean when you applied it. Retrim with a fresh blade at a shallow angle, and next time wipe the deck with alcohol before applying.",
      },
    ],
    related: [
      "fingerboard-grip-tape-guide",
      "best-beginner-fingerboard-setup",
      "fingerboard-deck-materials-explained",
    ],
  },

  // ============================================================
  // 5. FINGERBOARD BOWL BUILD — targets "fingerboard bowl" (5 impr)
  // ============================================================
  {
    slug: "how-to-build-a-fingerboard-bowl",
    title: "How to Build a Fingerboard Bowl: DIY Guide with Materials and Templates",
    metaTitle: "How to Build a DIY Fingerboard Bowl (Templates Inside)",
    metaDescription:
      "Build your own fingerboard bowl at home. Materials, tools, dimensions and step-by-step for a plywood or MDF mini-bowl, plus finish and coping options.",
    category: "Building",
    readMinutes: 8,
    updated: "2026-08-18",
    heroSummary:
      "A fingerboard bowl is a smooth concave basin you can carve inside on your desk, and it's one of the most satisfying obstacles to build because the payoff is immediate — the moment you flow around it, you understand why real skaters build them. You can make a solid bowl in an afternoon from plywood or MDF, a jigsaw, sandpaper, and patience. The two decisions that matter are how deep to make it (2–3cm is right for a first bowl) and whether to add coping (yes — the trick edge is the whole point).",
    sections: [
      {
        heading: "The two-piece bowl — the honest DIY starting point",
        body: [
          "A skateable bowl is a curved dish smooth enough for fingerboard wheels to roll around inside. On full-size scale, that's built from precisely shaped concrete. At fingerboard scale, the achievable version is a two-piece plywood or MDF construction: a base with the outline cut out, and a top with a smaller outline cut out, glued together to create a stepped bowl that you then sand into a smooth curve.",
          "The step-and-sand approach is genuinely the right way. Trying to route or carve a curved bowl from a single block is possible but requires router jigs and skill most beginners don't have; the step-and-sand method needs a jigsaw and sandpaper and produces a bowl that skates well.",
        ],
      },
      {
        heading: "What you need",
        body: [
          "Two pieces of 12mm plywood or MDF, each about 150mm × 150mm. MDF sands smoother and is cheaper; plywood is stronger and takes coping better. Both work.",
          "A jigsaw with a fine-toothed blade for interior cutouts. If you don't own one, a coping saw and a lot of patience will get you there — you're only cutting two curves.",
          "Wood glue, medium-grit and fine-grit sandpaper (80, 120, 220), a drill for starting interior cuts, and something to clamp the pieces together while the glue cures.",
          "For coping (the raised edge at the rim that adds trick response), a length of 3mm metal rod or a piece of thin wire — see the coping section below.",
          "Finish: a can of clear polyurethane or spray lacquer, and a small brush.",
        ],
      },
      {
        heading: "Dimensions that actually work",
        body: [
          "Bowl overall footprint: 100–140mm across. Smaller than 100mm and your fingerboard has nowhere to carve; larger and you'll want to build a full park section instead.",
          "Bowl depth: 20–30mm. This is where beginners get it wrong — a very deep bowl looks dramatic but is unskateable at fingerboard scale because the wheels can't hold the wall. Two centimetres is the friend of your first build.",
          "Top ring width: 10–15mm around the perimeter. This is the coping ring — narrower and it looks wispy, wider and you lose skateable area inside.",
          "For a first build, cut the top ring as a simple circular donut and the base as a matching outer circle without the interior cutout. The two glued together give you a walled circle; the sanding step turns the walls into curves.",
        ],
      },
      {
        heading: "Step by step",
        body: [
          "Cut the base. Trace a circle 130mm across on your first sheet. Cut around the outside only — you're making a solid disc.",
          "Cut the top. On the second sheet, trace the same 130mm outer circle. Inside it, trace a smaller circle 100mm across. Drill a starter hole inside the inner circle, then use the jigsaw to cut the smaller circle out. You now have a donut. Also cut the outer edge.",
          "Glue the donut onto the disc so their outer edges align exactly. Clamp and leave for the full cure time on the glue bottle, which is longer than you think.",
          "Sand aggressively. This is the step that turns a stepped hole into a bowl. Start with 80-grit and work the inside walls at an angle, blending the vertical wall of the donut into the flat floor of the disc. You are turning the 90-degree step into a continuous curve. Keep sanding until the transition is smooth to touch and skateable — a fingerboard wheel dragged around the perimeter should not catch anywhere.",
          "Refine with 120-grit and finish with 220-grit for a slick surface. Vacuum the dust — MDF dust in particular is unpleasant and gets everywhere.",
          "Finish with two thin coats of polyurethane or clear lacquer, letting each dry fully before the next. The finish protects the wood and makes the surface skate faster.",
        ],
      },
      {
        heading: "Adding coping",
        body: [
          "Coping is the raised metal edge at the rim of a real skateboard bowl. It's what you grind, and its presence transforms a decorative bowl into a real obstacle. Skip it and you have a smooth curve; add it and you have somewhere to lock in tricks.",
          "The DIY answer is a length of 3mm steel rod bent into a circle to match the top edge, or a stiff wire ring. Cut a shallow groove around the top rim of your bowl with a small file, press the rod into the groove so it protrudes about 1mm proud of the surface, and secure with cyanoacrylate or a two-part epoxy.",
          "Test after curing by rolling a wheel over the coping — it should click over the edge, not catch on it. If the coping catches, it's too proud; file it down slightly. If you can't feel it, it's too flush; press it out a touch more.",
        ],
      },
      {
        heading: "Common first-build mistakes",
        body: [
          "Making it too deep. A 40mm-deep bowl looks like a real bowl in a photo, but a fingerboard wheel will never make it around the wall. Stay at 20–30mm.",
          "Not sanding the transition enough. The vertical wall of the donut against the flat floor of the disc must become one continuous curve, or your wheels catch at the join. If you can see a horizontal seam from above, keep sanding.",
          "Skipping the finish. Bare MDF is porous and slow. Bare plywood picks up scuffs. Even one thin coat of lacquer dramatically changes how the bowl skates.",
          "Gluing without clamps. Wood glue needs pressure to cure at full strength. A stack of books works if you don't own clamps — dead weight is fine, but leave it overnight.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I skip the coping?",
        a: "You can, and the bowl still works as a smooth-curve obstacle. But grind tricks — the reason to have a bowl in the first place — need something to lock on. Adding coping is a 20-minute step that changes the obstacle entirely.",
      },
      {
        q: "How long does the whole build take?",
        a: "Active work is three to four hours. Real elapsed time is a day or two, because the glue-cure step wants overnight and the finish coats each need drying time.",
      },
      {
        q: "MDF or plywood?",
        a: "MDF sands smoother and gives a nicer finished surface, but it's fragile — drop your bowl on a hard floor and MDF chips. Plywood is more resilient and stronger for holding coping. If this is your first build, MDF is easier to work with; if you plan to actually skate it hard, plywood.",
      },
      {
        q: "What size fingerboard does this fit?",
        a: "Any standard 32–36mm fingerboard. Bowl scale is set by the fingerboard, not the other way around — a 130mm bowl footprint suits any deck in that range.",
      },
      {
        q: "Can I make it out of one solid block instead?",
        a: "Yes, if you have a router with a bowl-cutting bit and a jig. That's the professional method and gives you a truly seamless curve. The step-and-sand method exists because most home builders don't have that setup, and the result is skateable.",
      },
    ],
    related: [
      "wooden-fingerboard-ramps-diy-park-guide",
      "how-to-press-a-fingerboard-deck",
      "best-beginner-fingerboard-setup",
    ],
  },

  // ============================================================
  // 6. GRIND RAIL SETUP — targets "fingerboard grind rail" (3 impr)
  // ============================================================
  {
    slug: "fingerboard-grind-rail-setup-and-wax",
    title: "Fingerboard Grind Rail Setup: Positioning, Wax and Approach",
    metaTitle: "Fingerboard Grind Rail: Setup, Wax and Positioning Guide",
    metaDescription:
      "How to set up a fingerboard grind rail so tricks actually work — height, wax, spacing from ramps and the two mistakes that make every rail feel wrong.",
    category: "Building",
    readMinutes: 5,
    updated: "2026-08-18",
    heroSummary:
      "A fingerboard grind rail only works if three things are right: it's the correct height for the deck, it's waxed enough to slide but not so much that the deck flies off, and it's spaced far enough from the takeoff obstacle that you can land the trick. Most people get the height right on the first try and get the other two wrong. This guide is about the other two.",
    sections: [
      {
        heading: "Rail height — the one thing you get for free",
        body: [
          "Fingerboard grind rails are made to a standard rideable height. A 20mm rail hits a 34mm deck at roughly the right point to lock the trucks against the metal — high enough that the deck clears the surface, low enough that a landed trick doesn't fly off the top.",
          "If you're buying a rail, height rarely needs a decision from you. If you're making one, a metal or plastic bar 15–22mm above the surface is right for a standard fingerboard.",
        ],
      },
      {
        heading: "Wax — how much is enough, and how much is too much",
        body: [
          "A dry rail catches. A well-waxed rail slides cleanly. An over-waxed rail slides too fast for you to control the landing.",
          "You want a thin, even coat, not a thick smear. The test: run your fingerboard along the rail with no trick — just push it. It should slide smoothly with steady pressure, not shoot away or drag to a stop. If it drags, add wax; if it shoots off, wipe some down.",
          "Skate wax works, candle wax works, and beeswax works. Paraffin melts too much on warm days. Rubbing wax along the length of the rail and then running the deck along it a few times distributes the coat evenly.",
        ],
      },
      {
        heading: "Positioning — the mistake that ruins otherwise-good tricks",
        body: [
          "The gap between the takeoff obstacle (a ramp, a manual pad, the edge of your setup) and the start of the rail is where most rail tricks go wrong. Too close and the deck lands on the rail without traveling; too far and the deck runs out of momentum in the air.",
          "The rule that works in practice: place the near end of the rail one full deck-length away from the takeoff obstacle. For a 34mm deck, that's 34mm of clear surface between the two obstacles. This gives you room to pop the board, put it in the air, and land it on the rail rather than into it.",
          "Adjust from there. Longer rails need slightly more takeoff distance; shorter rails need less. Never place a rail flush against a ramp — you eliminate the trick entirely.",
        ],
      },
      {
        heading: "Approach — how to actually land the trick",
        body: [
          "Approach the rail at an angle, not straight on. A 15–30 degree approach angle lets you rotate the deck onto the rail with the trucks locking against the metal. Straight-on approaches force you to land a nose-slide or tail-slide, which are harder tricks than a truck-lock.",
          "Push firmly enough to get the deck onto the rail with some remaining forward momentum, then let go — the momentum carries the deck along. Pushing while the deck is on the rail almost always kicks it off sideways.",
        ],
      },
      {
        heading: "Two rail failures and their causes",
        body: [
          "The deck lands on the rail then falls off sideways. Almost always a wax issue — either too little (the deck grabs and tips off) or too much (the deck slides off the far end before you can react). Adjust the wax, don't blame your technique.",
          "The deck approaches the rail then flies over it without engaging. The pop is too high or the approach angle is too straight. Try popping the deck less and approaching at a wider angle — the deck should travel across the rail, not leap over it.",
        ],
      },
    ],
    faqs: [
      {
        q: "What wax should I use on a fingerboard rail?",
        a: "Skate wax made for full-size skateboarding works well and lasts. Candle wax and beeswax are fine substitutes. Avoid paraffin, which melts too much and leaves the rail slippery beyond usefulness.",
      },
      {
        q: "How often do I need to re-wax?",
        a: "When the rail stops sliding as cleanly as it used to. Depending on how much you skate, that might be once a week or once a month. A quick re-wax takes ten seconds — it's not something to overthink.",
      },
      {
        q: "Is a metal rail better than a plastic one?",
        a: "Metal rails slide more consistently, especially with wax, and last longer. Plastic rails work for beginners and are quieter, but they wear at the wax-contact point over time. Both skate.",
      },
      {
        q: "Do I need a rail with a stand, or can I lay it flat on the desk?",
        a: "It needs to sit at the right height above the surface — around 15–22mm for a standard fingerboard. That usually means an integrated stand or a set of feet. A rail lying flat on the desk is a ledge, not a rail, and the trick works differently.",
      },
      {
        q: "Why does my deck spin off the rail every time?",
        a: "Approach angle is almost always the cause. If you're hitting the rail dead straight, the deck has nothing to lock against; it lands and immediately pivots. Approach at 15–30 degrees and the truck axles engage the rail properly.",
      },
    ],
    related: [
      "wooden-fingerboard-ramps-diy-park-guide",
      "how-to-build-a-fingerboard-bowl",
      "how-to-choose-fingerboard-trucks",
    ],
  },

  // ============================================================
  // 7. BEST OBSTACLES COMPARED — targets "best fingerboard obstacles" (44) + "fingerboard obstacles" (36)
  // ============================================================
  {
    slug: "best-fingerboard-obstacles-compared",
    title: "Best Fingerboard Obstacles Compared: What to Buy, in What Order",
    metaTitle: "Best Fingerboard Obstacles Compared (What to Buy First)",
    metaDescription:
      "A honest comparison of the main fingerboard obstacle types — ramps, rails, ledges, boxes, stairs and bowls — with what each one teaches and the order to buy them in.",
    category: "Buying",
    readMinutes: 7,
    updated: "2026-08-18",
    heroSummary:
      "The first three obstacles you buy will do 80% of the tricks you'll ever learn on a fingerboard. Get them right and everything after is expansion. Get them wrong and you'll spend more on a set that doesn't teach you anything new. This is a comparison of the six main obstacle types by what they teach, what they cost and where they belong in a park build — with the honest first-three list at the end.",
    sections: [
      {
        heading: "The six obstacle types, and what each one actually teaches",
        body: [
          "A quarter-pipe is a curved ramp with a coping edge. It teaches airs, drop-ins, and the whole vocabulary of vertical tricks. It's the most physically substantial obstacle to own — quarter-pipes take up desk space — but it's also the one that transforms your fingerboard from a rolling deck into a skateable one. Buy first.",
          "A grind rail is a raised metal or plastic bar you slide the trucks along. It teaches truck-locks, board slides, and the entire family of grind tricks that are the visual signature of fingerboarding. It's small, cheap and forgiving — a good second buy.",
          "A ledge (or manual pad) is a flat-topped block, sometimes with an edge for grinding. It teaches manuals, slides, and the pop-on/pop-off vocabulary that translates from full-size street skating. Third-priority for a general park.",
          "A stair set is a small stepped structure — three to seven steps in fingerboard scale — with or without a rail down the side. It teaches gap tricks and forces commitment on the pop. Fun to own but narrow in what it teaches.",
          "A box is a low, wide flat-topped obstacle you can ollie onto and grind along the top edges. It's essentially a wider ledge with more usable surface. Great for combination tricks, but overlaps with what a ledge already teaches.",
          "A bowl is a shallow concave basin, either bought or built. It teaches carving, transitions and vert-style flow. It's the most specialised obstacle in the list and it's the one to buy last, not first — if you don't already own a quarter-pipe, a bowl won't teach you the fundamentals it depends on.",
        ],
      },
      {
        heading: "What each obstacle costs",
        body: [
          "Quarter-pipes vary widely — small plywood ramps around $15, well-made metal ones $30–50, larger park-quality pieces above that. Even the cheapest wooden quarter-pipe teaches the same tricks; you're paying for finish and durability.",
          "Grind rails are the cheapest obstacle to buy or make: $8–20 for a decent standalone rail. Sold in singles or bundled with other pieces.",
          "Ledges and boxes run $10–30 depending on size and material. Modular sets that combine a ledge with a small ramp or rail exist and are good value if you don't own either.",
          "Stair sets are $15–35. The material matters here — wooden stairs stay quieter, metal ones last longer.",
          "Bowls, if bought pre-made, are $30–60 for a small skateable bowl. Building your own from MDF and glue costs under $10 in materials.",
        ],
      },
      {
        heading: "Why bundle sets sometimes make sense — and sometimes don't",
        body: [
          "Park bundles combining three or four obstacles for a fixed price look cheaper than buying each piece separately, and often are. The catch is that you're locked into the set's specific mix — a bundle heavy on rails and stairs but light on transition (no quarter-pipe) will leave you unable to learn a whole category of tricks.",
          "Read the bundle's contents before you buy on price alone. A three-piece set with a quarter-pipe, a rail and a ledge covers the fundamental trick vocabulary. A three-piece set without a quarter-pipe covers a narrower one.",
        ],
      },
      {
        heading: "The 20cm rule",
        body: [
          "Everything you place on a desk has to sit within reach of your two skating fingers. A park that's spread across 60cm of surface can't be skated as a line — you'd need to reposition your fingerboard between obstacles rather than flowing through them.",
          "As a first-park guideline, keep the whole layout within roughly 20cm of continuous space. That means small obstacles placed close together, with enough gap between each for a landing but no wasted desk. Larger obstacles like a quarter-pipe get a spot at one end; rails and ledges cluster in the middle.",
        ],
      },
    ],
    table: {
      title: "Obstacles ranked by first-park value",
      columns: ["#", "Obstacle", "Teaches", "Rough cost", "Skip if…"],
      rows: [
        ["1", "Quarter-pipe (ramp)", "Airs, drop-ins, transitions", "$15–50", "You only skate street lines"],
        ["2", "Grind rail", "Truck-locks, board slides, grinds", "$8–20", "Never — this is the cheap win"],
        ["3", "Ledge / manual pad", "Manuals, ledge slides, combos", "$10–30", "You already own a box"],
        ["4", "Stair set", "Gaps, commitment tricks", "$15–35", "Desk is too small (they eat space)"],
        ["5", "Box", "Ollies on and off, top-edge grinds", "$10–30", "You already own a ledge"],
        ["6", "Bowl", "Carving, vert flow", "$0 (DIY) – $60", "You don't own a quarter-pipe yet"],
      ],
    },
    faqs: [
      {
        q: "What's the first obstacle I should buy?",
        a: "A quarter-pipe. It teaches more tricks than any other single obstacle and it's the foundation for the rest — a bowl or a ledge won't teach you the transition and pop tricks that make everything else make sense.",
      },
      {
        q: "Are wooden or metal obstacles better?",
        a: "Wooden obstacles are quieter, feel more like skateboarding, and are usually cheaper. Metal obstacles are more durable and give a more consistent slide on rails specifically. For most riders, wooden is the default; metal is worth it for rails and coping.",
      },
      {
        q: "Should I buy a bundle or individual obstacles?",
        a: "Bundles are usually good value if they include a quarter-pipe, a rail and a ledge. Bundles that skip the quarter-pipe are worse value than they look, because they leave the biggest category of tricks unreachable.",
      },
      {
        q: "How big should my fingerboard park be?",
        a: "Around 20cm of desk length, laid out so you can skate from one end to the other in a single line. Anything larger requires repositioning your fingerboard between obstacles instead of flowing through them, which changes how skating feels.",
      },
      {
        q: "Can I build these obstacles myself?",
        a: "Yes — the DIY ramp guide in our library covers a wooden quarter-pipe and a modular park. Rails, ledges and small bowls are also within reach of a first-time builder. Prefabricated obstacles cost more but skip the learning curve on wood-cutting.",
      },
      {
        q: "How many obstacles is enough for a home setup?",
        a: "Four is the honest answer for most home setups: a quarter-pipe, a rail, a ledge and a box or stair set. That mix covers every fundamental trick category. Anything beyond that is depth, not breadth.",
      },
    ],
    related: [
      "wooden-fingerboard-ramps-diy-park-guide",
      "how-to-build-a-fingerboard-bowl",
      "fingerboard-grind-rail-setup-and-wax",
      "best-beginner-fingerboard-setup",
    ],
  },

  // ============================================================
  // 8. TECH DECK UPGRADE — targets "tech deck grip tape" (2) etc. bridge audience
  // ============================================================
  {
    slug: "how-to-upgrade-your-tech-deck",
    title: "How to Upgrade Your Tech Deck: What to Swap, and When to Buy a Real Fingerboard",
    metaTitle: "How to Upgrade a Tech Deck (or When to Just Buy Real)",
    metaDescription:
      "A Tech Deck upgrade path: which parts to swap first for the biggest improvement, which upgrades aren't worth it, and when to stop upgrading and buy a real fingerboard.",
    category: "Buying",
    readMinutes: 6,
    updated: "2026-08-18",
    heroSummary:
      "A Tech Deck is a plastic toy fingerboard. It works, but not as well as a wooden one. The three parts that matter most to swap are the wheels (biggest single upgrade for the money), the grip tape (second biggest), and finally the trucks. Do all three and you've spent roughly what a real complete would cost — which is the honest answer: past a certain point, upgrading a Tech Deck stops making financial sense, and buying a proper fingerboard becomes the better move.",
    sections: [
      {
        heading: "Why Tech Decks feel different from real fingerboards",
        body: [
          "Tech Decks are made to sell at pocket-money prices. That means plastic wheels on plastic axles, plastic-hub trucks, printed graphics, and a cast plastic deck with grip tape that's more sticker than sandpaper. All of it works. None of it works as well as the wooden-and-metal equivalent.",
          "A Tech Deck rolls with visibly more resistance, pops with less snap, and lands tricks less consistently than a wooden complete. That's not a defect — it's what a $6 toy costs. The upgrade path exists because the parts are cheap and the improvement per swap is dramatic.",
        ],
      },
      {
        heading: "Upgrade 1 — wheels (biggest single win)",
        body: [
          "The Tech Deck wheels have plastic hubs and plastic axles, so friction is high and roll distance is short. Swapping to bearing wheels — real urethane with steel bearings — changes the feel of the board more than any other single upgrade.",
          "Bearing wheels are cheap ($8–15 for a set of four) and drop into most Tech Deck trucks without much fuss. You may need to widen the truck axle holes very slightly with a fine drill bit; the axle standard isn't identical to real fingerboards, but the tolerance is usually forgiving.",
          "Do this upgrade first. It's the one that makes the biggest audible difference to anyone else in the room — the board sounds like a real fingerboard, and it rolls twice as far per push.",
        ],
      },
      {
        heading: "Upgrade 2 — grip tape (biggest tactile win)",
        body: [
          "Tech Deck 'grip tape' is a printed graphic, essentially a sticker with texture. It's slippery in a way that becomes obvious the moment you try to land a trick with any lateral force. Your fingertip slides off, the trick fails, and you can't tell if it was your technique or the board.",
          "Peeling off the factory graphic and applying real fingerboard grip tape — the coarse sandpaper-style kind — solves this instantly. Cost is a few dollars for a sheet that covers multiple decks. It's a five-minute job.",
          "Do this second. It doesn't change the board's roll or pop, but it changes whether tricks work at all.",
        ],
      },
      {
        heading: "Upgrade 3 — trucks",
        body: [
          "The Tech Deck's trucks are plastic-hub, plastic-kingpin assemblies. They turn, but not smoothly, and their bushings are non-standard so you can't tune them.",
          "A set of metal trucks with real bushings costs $10–20 and transforms how the board carves. Turns feel deliberate rather than sloppy, and you can adjust the bushings for tighter or looser response.",
          "This is where the upgrade math gets interesting. You've now spent maybe $25 on wheels + tape + trucks — before touching the deck itself. A well-made wooden complete with all three good parts already fitted starts around $20–35. Consider carefully whether one more purchase gets you further, or whether stopping here and buying a real complete for your next board is smarter.",
        ],
      },
      {
        heading: "The upgrades that don't matter",
        body: [
          "The deck itself. Tech Deck plastic is fine — you can pop tricks on it, and swapping the plastic deck for a wooden one at that scale isn't a like-for-like operation because the truck spacing and mounting differ. If you want a wooden deck, you're really buying a whole new fingerboard.",
          "Bushings alone. Tech Deck trucks use non-standard bushings, so tuning them is a fool's errand — you're limited to what the manufacturer put in. Swap the whole trucks or leave them alone.",
          "Fancy graphics. Yes, you can peel off the sticker and apply a custom design. It doesn't change how the board skates.",
        ],
      },
      {
        heading: "When to stop upgrading",
        body: [
          "The honest calculation: if you've done wheels ($10) and grip tape ($5), you've spent $15 on a $6 Tech Deck and you have a board that skates like a $25 board. That's a good deal.",
          "If you're considering also swapping the trucks (another $15), you're up to $36 on a Tech Deck. A wooden complete with better wheels, better tape, and better trucks — all as a matched set — starts around $20–35. You've reached the point where the upgrade path costs more than starting over.",
          "This is where most upgraders stop. Keep the upgraded Tech Deck as a beater or a spare; buy a wooden complete for your main board. The wooden complete will pop harder, roll longer and last longer, and you'll appreciate the difference immediately.",
        ],
      },
    ],
    table: {
      title: "Tech Deck upgrade path",
      columns: ["Order", "Upgrade", "Cost", "Difference"],
      rows: [
        ["1", "Bearing wheels", "$8–15", "Board rolls further, sounds real, feels lively"],
        ["2", "Real grip tape", "$3–8", "Tricks land — the biggest tactile change"],
        ["3", "Metal trucks", "$10–20", "Carves properly, tunable bushings"],
        ["Stop", "Everything else", "—", "Diminishing returns; buy a wooden complete instead"],
      ],
    },
    faqs: [
      {
        q: "Is it worth upgrading a Tech Deck?",
        a: "The first two upgrades — bearing wheels and real grip tape — are yes-for-anyone. They cost maybe $15 total and transform how the board skates. Past that, you're within a few dollars of what a real fingerboard costs; the honest move is to buy one instead.",
      },
      {
        q: "Can I put real fingerboard wheels on a Tech Deck?",
        a: "Yes, in most cases. The axle diameter isn't a perfect match, but the tolerance is usually enough that real bearing wheels fit onto Tech Deck axles. Occasionally the truck axle needs a very light widening with a fine drill bit; more often it just works.",
      },
      {
        q: "Do real fingerboards trick differently than upgraded Tech Decks?",
        a: "Yes. The main difference is pop — wooden decks have real snap that comes from the ply construction, and no amount of upgrading changes the plastic Tech Deck body. That's why the upgrade path stops at trucks: the deck itself is the ceiling.",
      },
      {
        q: "How much would a fully upgraded Tech Deck cost me?",
        a: "$25–40 depending on which parts you buy. That's within $5–10 of what a decent wooden complete costs new, which is why the calculation tips toward starting over.",
      },
      {
        q: "Can I use the original Tech Deck as a spare after upgrading?",
        a: "Very much so. Upgraded Tech Decks make excellent second boards — they take abuse, live in bags without complaint, and stay usable for years. Many riders keep a beater Tech Deck for meetups where they don't want to risk a nicer board.",
      },
    ],
    related: [
      "best-beginner-fingerboard-setup",
      "fingerboard-vs-tech-deck",
      "which-fingerboard-bearings-to-buy",
      "fingerboard-grip-tape-guide",
    ],
  },

  // ============================================================
  // 9. BLANK DECKS — targets "blank fingerboard decks" (3 impr, POS 8!)
  // ============================================================
  {
    slug: "blank-fingerboard-decks-choosing-and-painting",
    title: "Blank Fingerboard Decks: Choosing, Painting and Sealing",
    metaTitle: "Blank Fingerboard Decks: How to Choose, Paint and Seal",
    metaDescription:
      "A guide to blank fingerboard decks — why builders choose them over graphic decks, what to look for when buying, and how to paint and seal one that lasts.",
    category: "Building",
    readMinutes: 7,
    updated: "2026-08-18",
    heroSummary:
      "A blank fingerboard deck is a finished, shaped deck sold without a printed graphic — ready for you to paint, screen-print, or leave bare. Buying blank costs about the same as a graphic deck, and gives you the freedom to design something that isn't in the catalogue. The two things that matter when choosing one are the ply construction (5-ply and 7-ply skate differently) and the width. The two things that matter when finishing one are sealing the underside properly and letting each paint coat dry longer than you think.",
    sections: [
      {
        heading: "Why buy blank rather than graphic",
        body: [
          "A blank deck is the same manufactured product as a graphic deck without the printed underside. Same wood, same shape, same concave, same trucks fit. What you're paying for when you buy graphic is the print itself and, sometimes, the licensing. Blanks cost slightly less to the same slightly more depending on the brand, but the material is the same.",
          "The reason to buy blank isn't price — it's that you want a deck that looks like you rather than looks like a catalogue. Custom paint, screen prints, hand-drawn designs, stickers, dip-dyed edges — all of these need a blank underside to start from. It's the only honest way to get a truly one-of-one fingerboard.",
        ],
      },
      {
        heading: "What to look for when buying",
        body: [
          "Ply count. Five-ply decks are lighter and pop with a sharper feel; seven-ply decks are stiffer, heavier and hold their shape longer. Both are legitimate — the choice is personal preference. Most riders default to 5-ply because it feels quicker.",
          "Width. Fingerboards run 29mm–36mm wide. The vast majority of the market is 32–34mm. If you have trucks already, match the width to what fits them; if you're buying a blank as a first deck, 34mm is the honest default recommendation.",
          "Concave depth. Blanks come in shallow, medium and deep concave the same way pressed decks do. If you're painting on the underside, concave matters less to the paint job than to how the deck rides — pick concave for how you skate, not for how easy it is to paint.",
          "Wood species. Almost all fingerboard blanks are Canadian or Northeastern hard maple. Some premium blanks use pau ferro, bamboo or other species. Maple is the standard for a reason — it's dimensionally stable and holds concave. Exotic woods are a preference thing, not a performance thing.",
          "Pre-drilled truck holes. Some blanks ship drilled, others don't. Pre-drilled is easier for a first deck; drilling your own gives you the option to place trucks slightly wider or narrower than standard. If you're not already comfortable with a small drill press or hand drill, get pre-drilled.",
        ],
      },
      {
        heading: "Preparing the deck for paint",
        body: [
          "Even a factory-finished blank benefits from a very light sanding before paint. 400-grit sandpaper for a few passes over the top and bottom removes any factory finish that might resist adhesion. Wipe with isopropyl alcohol and let dry — this removes the sanding dust and any residual oil from the wood.",
          "If the blank has a shiny factory finish, sand a little more aggressively (320-grit) until the surface is uniformly matte. Paint will not stick to a glossy factory topcoat.",
          "Mask the top of the deck if you don't want paint on the grip surface. Painter's tape works, but apply it carefully to avoid pulling up wood fibres when you remove it.",
        ],
      },
      {
        heading: "Paint that lasts",
        body: [
          "Acrylic paint is the honest default. It sticks well to bare or lightly sanded wood, dries fast, comes in every colour you could want, and cleans up with water. Craft-store acrylics are fine; artist-grade acrylics have slightly better pigment density if the design has fine detail.",
          "Two thin coats always beat one thick one. Thick paint pools in the concave, dries with visible ridges, and chips off in flakes when you drop the deck. Two thin coats give an even finish that flexes with the wood.",
          "Let each coat dry longer than the label says. Acrylic feels dry to the touch within ten minutes but cures fully over hours. Applying a second coat too early lifts the first coat and produces a streaky finish. Overnight between coats is the safe upper bound.",
          "Details, letters or small graphics go on with a fine brush or a pen designed for use on wood. Paint pens work well for outlines and can be layered over acrylic once the base coat is fully cured.",
        ],
      },
      {
        heading: "Sealing — the step that decides how long the paint lasts",
        body: [
          "A painted deck without a topcoat looks great for one session, then starts wearing through at every point of contact. The trucks scrape the paint off the bolt area. Landings chip it from the tail. Grinds shred the underside where it touches the rail.",
          "A clear topcoat — polyurethane, spray lacquer, or a fingerboard-specific clear seal — protects the paint from all three. Two thin coats is standard, sprayed or brushed on, with time between coats to fully cure.",
          "Matte finishes are more forgiving of imperfect painting than gloss, because gloss shows every brush stroke and dust particle. If you're new, use matte or satin.",
          "One warning: cheap spray lacquers sometimes react with acrylic paint and cause it to wrinkle or bubble. Test the specific lacquer you're using on a scrap of painted wood before you commit it to the deck. If the paint wrinkles, switch to a water-based polyurethane instead.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are blank fingerboard decks the same quality as graphic ones?",
        a: "In almost every case, yes — they're the same physical product without the print. Some brands sell 'blank' decks that are actually seconds (minor cosmetic defects) at a lower price; if the price is dramatically lower than the graphic version, check whether they're seconds or true blanks.",
      },
      {
        q: "Can I use any paint on a fingerboard deck?",
        a: "Acrylic is the easiest and most forgiving. Oil-based paints work but need much longer to cure. Nail polish works for small details. Avoid enamels and spray paints that stay soft after 'drying' — they'll transfer onto your fingers.",
      },
      {
        q: "Do I need to sand a blank deck before painting?",
        a: "A light sanding with 400-grit almost always improves paint adhesion, even on decks that look ready to paint out of the packaging. It takes a minute and saves the finish later.",
      },
      {
        q: "How do I seal a painted deck without ruining the paint?",
        a: "Use a topcoat compatible with your paint. Water-based polyurethane is the safest match for acrylic paint. Spray lacquers work but occasionally react — always test on a scrap first. Two thin coats with full drying time between them is the pattern that works.",
      },
      {
        q: "Can I press my own blank deck instead of buying one?",
        a: "Yes, and that's covered in the how-to-press guide. If you're painting anyway, pressing your own gives you total control over shape, concave and outline before the paint stage. Blank decks exist for people who want the custom finish without the pressing step.",
      },
      {
        q: "Do blank decks come with grip tape?",
        a: "Usually not — the point of a blank is that you finish it yourself. Some retailers bundle blank decks with a sheet of grip tape as a starter kit; if a listing doesn't say grip is included, assume it isn't.",
      },
    ],
    related: [
      "how-to-press-a-fingerboard-deck",
      "which-fingerboard-mold-to-buy",
      "fingerboard-deck-materials-explained",
      "fingerboard-grip-tape-guide",
    ],
  },
];
