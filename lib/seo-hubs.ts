import type { Product } from "lib/shopify/types";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const collectionMap: Record<string, string[]> = require("../data/collection-map.json");

/**
 * SEO HUB PAGES (2026-11-27 sprint).
 *
 * Why these exist: Search Console (90 days to 25 Nov) showed searchers asking
 * for exactly these things ("fingerboard rails", "wooden fingerboard ramps",
 * "fingerboard mold", "29mm fingerboard", "fingerboard park for sale"...) while
 * the pages answering them were either buried under /search/<collection>
 * (average position 17-45) or were the homepage / an informational guide.
 * Each hub is a clean root URL with a live product grid for that exact need,
 * written copy that is specific to it, an FAQ, and links to the guides and to
 * sibling hubs. Nothing here replaces or redirects an existing page.
 *
 * Rules for this file: no store-size claims, no invented prices, no "tested"
 * or "best" claims we cannot back, and every hub must still match at least
 * MIN_PRODUCTS live products or it is not generated (see seoHubs()).
 */

export const MIN_PRODUCTS = 3;

export type HubFaq = { q: string; a: string };
export type Hub = {
  slug: string;
  h1: string;
  /** <title>, hand-written, front-loaded with the query. */
  title: string;
  metaDescription: string;
  eyebrow: string;
  intro: string[];
  tips: { heading: string; body: string }[];
  faqs: HubFaq[];
  /** Guide slugs shown as "read next" (and used to link guide -> hub). */
  guides: string[];
  /** Sibling hub slugs. */
  related: string[];
  match: (p: Product, inCollection: (cols: string[]) => boolean) => boolean;
  /** "price" sorts cheapest first; default keeps catalogue order. */
  sort?: "price" | "catalogue";
};

const inCol = (handle: string) => (cols: string[]) =>
  cols.some((c) => (collectionMap[c] ?? []).includes(handle));

const text = (p: Product) =>
  `${p.title} ${p.tags.join(" ")} ${p.description ?? ""}`.toLowerCase();
const titleTags = (p: Product) => `${p.title} ${p.tags.join(" ")}`.toLowerCase();

export const HUBS: Hub[] = [
  {
    slug: "fingerboard-rails",
    h1: "Fingerboard Rails and Ledges",
    title: "Fingerboard Rails, Ledges & Grind Obstacles",
    metaDescription:
      "Fingerboard rails, ledges and grind obstacles for a desk park: wood and metal, single pieces and sets. Free shipping over $45, 30-day returns.",
    eyebrow: "Grind obstacles",
    intro: [
      "A fingerboard rail is the obstacle people add second, right after a first ramp: it turns flat ollies into grinds and slides. Rails come as thin metal tubes on stands, as wooden rails with a coping edge, and as combined rail-and-ledge or rail-and-stairs pieces that give you two or three lines in one footprint.",
      "Pick by what you want to grind. A round metal rail rewards clean 50-50s and smith grinds, a flat ledge is easier for boardslides and for learning, and a rail that ends in stairs or a kicker gives you a full line to ride top to bottom. Everything below ships with tracking and comes with 30-day returns.",
    ],
    tips: [
      {
        heading: "Round rail or flat ledge?",
        body: "Rails reward precise trucks and a steady hand; ledges forgive a wobble. If you are new to grinds, start with a ledge or a rail-and-ledge combo and add a pure rail once your 50-50s are landing.",
      },
      {
        heading: "Think in lines, not pieces",
        body: "One rail beside a kicker or a short set of stairs gives you a line to ride from one end to the other. Buy a second piece that connects to the first instead of a second copy of the same obstacle.",
      },
      {
        heading: "Wood or metal",
        body: "Wood is quiet, light and easy to rearrange on a desk. Metal rails and alloy pieces are heavier, stay put and give a faster, louder grind. Both work with any fingerboard width from 29mm to 36mm.",
      },
    ],
    faqs: [
      {
        q: "What is the best first fingerboard rail?",
        a: "A rail-and-ledge piece or a short rail set into a small stairs or kicker piece. It gives you both grind styles and a built-in line without needing a second purchase straight away.",
      },
      {
        q: "Will a rail work with a 34mm fingerboard?",
        a: "Yes. Fingerboard rails and ledges are built for the usual 29mm to 36mm range. Very wide 36mm decks grind more stably on flat ledges than on thin round rails.",
      },
      {
        q: "How do I stop a rail sliding on a desk?",
        a: "Put the piece on a mat or a piece of grip tape under the base, or build the rail into a set that locks together. Heavier alloy pieces move less than light wooden ones.",
      },
    ],
    guides: ["finger-board-rails-guide", "best-beginner-fingerboard-setup"],
    related: ["wooden-fingerboard-ramps", "fingerboard-parks", "fingerboard-mini-ramps"],
    match: (p, c) =>
      c(["ramps-obstacles", "park-kits"]) && /\brail|ledge|grind/.test(titleTags(p)),
  },
  {
    slug: "fingerboard-obstacles",
    h1: "Fingerboard Obstacles",
    title: "Fingerboard Obstacles — Ramps, Rails & Parks",
    metaDescription:
      "Fingerboard obstacles for a desk skatepark: ramps, kickers, rails, ledges, stairs, benches and park sets in wood and alloy. Free shipping over $45.",
    eyebrow: "Everything to build a park",
    intro: [
      "Fingerboard obstacles are what you skate: ramps and kickers to launch off, rails and ledges to grind, stairs and boxes to jump, and benches and arcs that copy real street spots. A few well-chosen obstacles turn a desk into a park and give every trick somewhere to happen.",
      "This page lists every obstacle we sell in one grid. If you know what you want, the pages for rails, wooden ramps, mini ramps and park kits narrow it down. If you are starting out, a ramp or kicker plus one rail is a strong first park.",
    ],
    tips: [
      {
        heading: "Start with one launch and one grind",
        body: "A kicker or ramp plus a rail or ledge gives you air and grinds, which covers the two main things to do on obstacles. Add stairs or a box next to give yourself a line.",
      },
      {
        heading: "Mix materials on purpose",
        body: "Wooden obstacles are light and quiet; alloy and metal pieces are heavy and fast. Mixing them is fine, but keep the heights close so the lines flow.",
      },
      {
        heading: "Think about space",
        body: "Most pieces fit on a desk, but obstacles need run-up room. Leave at least a board length of flat space before each piece.",
      },
    ],
    faqs: [
      {
        q: "What obstacles should a beginner buy first?",
        a: "A kicker ramp and a rail or ledge. They teach ollies off a launch and your first grinds, and they work as part of a bigger park later.",
      },
      {
        q: "Do fingerboard obstacles fit all fingerboards?",
        a: "Yes. They are built for the standard 29mm to 36mm width range.",
      },
      {
        q: "Are sets better value than single pieces?",
        a: "Usually, yes. A set costs less per piece and the sizes are made to match, so you can build lines straight away.",
      },
    ],
    guides: ["fingerboard-obstacles-guide", "best-beginner-fingerboard-setup", "finger-board-rails-guide"],
    related: ["fingerboard-rails", "wooden-fingerboard-ramps", "fingerboard-parks"],
    match: (p, c) => c(["ramps-obstacles", "park-kits"]),
  },
  {
    slug: "fingerboard-ramps",
    h1: "Fingerboard Ramps",
    title: "Fingerboard Ramps — Kickers, Quarter Pipes & More",
    metaDescription:
      "Fingerboard ramps for sale: kickers, launch ramps, quarter pipes, half-U ramps and ramp sets in wood and alloy. Ships worldwide with tracking.",
    eyebrow: "Ramps",
    intro: [
      "A fingerboard ramp is the first obstacle most riders buy. A kicker or launch ramp lets you ollie into the air, a quarter pipe lets you roll up a wall, and a half-U gives you a curved face either side. Ramps come in wood, alloy and plastic and as single pieces or sets.",
      "Choose by the kind of skating you want. For air and gaps pick a kicker; for transition pick a quarter pipe or half-U; for a bit of everything pick a ramp set with stairs and a rail.",
    ],
    tips: [
      {
        heading: "Kicker first",
        body: "A simple kicker is the most useful first ramp: it launches ollies, flips and gap tricks and is easy to set up on any desk.",
      },
      {
        heading: "Add transition later",
        body: "Quarter pipes and half-U ramps are harder to ride but add the most variety. Buy one when you are ready to learn to pump and turn.",
      },
      {
        heading: "Check height and length",
        body: "A taller ramp gives more air but needs more run-up. Each listing shows the dimensions so you can match the ramp to your board and desk.",
      },
    ],
    faqs: [
      {
        q: "What is the best fingerboard ramp for beginners?",
        a: "A kicker or small launch ramp. It is easy to ride and lets you start landing tricks straight away.",
      },
      {
        q: "Do I need a ramp to practise tricks?",
        a: "No, but a ramp gives you a reason to roll, jump and land. It also makes flip tricks easier to land.",
      },
      {
        q: "Are wooden ramps better than metal?",
        a: "They feel different. Wood is light and quiet; alloy is heavy, stays put and rides fast.",
      },
    ],
    guides: ["best-beginner-fingerboard-setup", "how-to-build-a-fingerboard-bowl"],
    related: ["wooden-fingerboard-ramps", "fingerboard-mini-ramps", "fingerboard-rails"],
    match: (p, c) =>
      c(["ramps-obstacles", "park-kits"]) &&
      /ramp|kicker|quarter|half|bowl|launch|pipe|u pool/.test(titleTags(p)),
  },
  {
    slug: "wooden-fingerboard-ramps",
    h1: "Wooden Fingerboard Ramps",
    title: "Wooden Fingerboard Ramps & Kickers",
    metaDescription:
      "Wooden fingerboard ramps, kickers, quarter pipes and half-U ramps for desk parks. Solid wood builds in single pieces and sets. Ships worldwide.",
    eyebrow: "Wood obstacles",
    intro: [
      "Wooden fingerboard ramps are the classic desk-park build: a kicker to launch off, a quarter pipe to carve, a half-U to pump, each cut from wood so it feels like a real skate obstacle. Wood is light enough to rearrange between sessions and quiet enough to use at a desk.",
      "Choose by the trick you want to practise. A launch ramp or kicker is for ollies, flips and gaps; a quarter pipe or half-U is for transition tricks; a ramp with stairs gives you a drop to land. Many of the pieces here are sold as sets so the sizes match.",
    ],
    tips: [
      {
        heading: "Kicker, quarter pipe or half-U",
        body: "A kicker gives air and is the easiest first ramp. A quarter pipe lets you ride up and turn. A half-U gives two faces and room to pump. Start with a kicker, then add a transition piece.",
      },
      {
        heading: "Match the size to your board",
        body: "Wooden ramps are built for 29mm to 36mm decks, but a very small 29mm board feels more at home on a lower ramp and a 36mm board on a longer one. Check the dimensions shown on each listing.",
      },
      {
        heading: "Sets save money and match sizes",
        body: "A set of three or more pieces costs less per piece than buying each alone and the pieces are made to line up, so you can build a flow of ramps and rails on day one.",
      },
    ],
    faqs: [
      {
        q: "Are wooden fingerboard ramps better than plastic?",
        a: "Wood is quieter, usually smoother under the wheels and easier to repair or sand. Plastic is cheap and light; solid wood or plywood ramps last longer under regular use.",
      },
      {
        q: "What size ramp do I need for a 34mm fingerboard?",
        a: "Most desk ramps in this range fit a 34mm deck. A simple kicker is a comfortable first size; go larger for bigger gaps or transition runs. Each listing shows the piece dimensions.",
      },
      {
        q: "Can I build a whole park from wooden pieces?",
        a: "Yes. Start with one kicker or quarter pipe, add a rail or ledge, then a stairs or half-U piece. Park sets bundle several pieces that fit together.",
      },
    ],
    guides: ["best-beginner-fingerboard-setup", "how-to-build-a-fingerboard-bowl"],
    related: ["fingerboard-rails", "fingerboard-mini-ramps", "fingerboard-parks"],
    match: (p, c) =>
      c(["ramps-obstacles", "park-kits"]) &&
      /wood/.test(titleTags(p)) &&
      /ramp|kicker|quarter|half|bowl|launch|pipe|u pool/.test(titleTags(p)),
  },
  {
    slug: "fingerboard-mini-ramps",
    h1: "Fingerboard Mini Ramps, Quarter Pipes and Bowls",
    title: "Fingerboard Mini Ramps, Quarter Pipes & Bowls",
    metaDescription:
      "Transition obstacles for fingerboards: mini ramps, quarter pipes, half-U and bowls in wood and alloy. Pick your size, ride the curve. Free shipping over $45.",
    eyebrow: "Transition obstacles",
    intro: [
      "Transition obstacles are what make a fingerboard feel like skating a real park. A quarter pipe lets you roll up and turn on the lip, a half-U or mini ramp gives you two faces to pump back and forth, and a bowl or full-U pool lets you carve around a corner.",
      "They ride very differently to a kicker: speed comes from your fingers pumping the curve, not from a launch. If you already have a kicker and a rail, a transition piece is the obstacle that adds a new kind of skating.",
    ],
    tips: [
      {
        heading: "Quarter pipe for first-time transition",
        body: "A single quarter pipe is the simplest way to learn riding up a wall: roll in, turn at the top, come back down. It is also a good surface for tricks off the lip.",
      },
      {
        heading: "Half-U and full-U for flow",
        body: "Two faces let you pump back and forth for speed. A full-U pool or bowl adds corners, which is the hardest and most rewarding thing to ride on a fingerboard.",
      },
      {
        heading: "Check the radius and height",
        body: "A taller, steeper face gives more air but needs more speed; a low gentle radius is easier for a 29mm or 32mm board. The listing shows the dimensions.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a quarter pipe and a half pipe?",
        a: "A quarter pipe is a single curved wall. A half pipe, also called a half-U or mini ramp, has two curved walls facing each other with a flat bottom between them.",
      },
      {
        q: "Are transition ramps harder to ride than kickers?",
        a: "Yes. You build speed by pumping the curve rather than launching, so they take longer to learn, but they add the most variety to a park.",
      },
      {
        q: "Do bowls and U pools work with any fingerboard?",
        a: "They are made for standard 29mm to 36mm decks. Wider 34mm and 36mm boards sit more stably on the flat bottom.",
      },
    ],
    guides: ["how-to-build-a-fingerboard-bowl", "best-beginner-fingerboard-setup"],
    related: ["wooden-fingerboard-ramps", "fingerboard-rails", "fingerboard-parks"],
    match: (p, c) =>
      c(["ramps-obstacles", "park-kits"]) &&
      /mini ramp|mini-ramp|quarter|half-?u|halfpipe|half pipe|u pool|u-pool|bowl|transition/.test(
        titleTags(p),
      ),
  },
  {
    slug: "fingerboard-parks",
    h1: "Fingerboard Parks and Park Kits",
    title: "Fingerboard Parks & Park Kits for Your Desk",
    metaDescription:
      "Fingerboard park kits and obstacle sets: ramps, rails, stairs and ledges that fit together so you can build a desk skatepark in one order.",
    eyebrow: "Build a desk skatepark",
    intro: [
      "A fingerboard park kit gives you several obstacles in one order, sized to work together: usually a kicker or ramp, a rail or ledge, stairs or a box, and sometimes a half-U or bowl. It is the fastest way from a single board to a real skate park on your desk.",
      "Sets suit three kinds of buyer: beginners who want a first park without choosing piece by piece, riders who want matching pieces to build lines, and anyone buying a gift. If you already own a ramp, single obstacles in the ramps and rails pages are the better way to expand.",
    ],
    tips: [
      {
        heading: "How many pieces do you need?",
        body: "Three to five pieces is enough for a good first park: one launch, one grind, one gap or stairs, plus a transition piece if you want to carve. More pieces mainly add ways to rearrange the same lines.",
      },
      {
        heading: "Alloy or wood",
        body: "Alloy sets are heavy, stay in place and give a fast, metallic ride. Wooden kits are lighter, quieter and easy to rearrange. Pick on feel; both work with any standard deck.",
      },
      {
        heading: "Leave room to grow",
        body: "Buy a set that includes the obstacle types you ride most, then add single pieces later. Matching styles make a park look and ride better.",
      },
    ],
    faqs: [
      {
        q: "What comes in a fingerboard park kit?",
        a: "Most kits include a ramp or kicker, a rail or ledge, and stairs, a box or a bench. Larger sets add a half-U, a quarter pipe or a bowl. Each listing shows exactly which pieces are in it.",
      },
      {
        q: "How big is a fingerboard park?",
        a: "Most sets fit on a desk or table. Pieces can sit close together for a compact park or be spread out for longer lines.",
      },
      {
        q: "Are park kits good gifts?",
        a: "Yes. A set that already includes several obstacles is a complete present; add a complete fingerboard if the person does not yet own one.",
      },
    ],
    guides: ["fingerboard-obstacles-guide", "best-beginner-fingerboard-setup", "complete-beginner-fingerboard-kit"],
    related: ["wooden-fingerboard-ramps", "fingerboard-rails", "fingerboard-mini-ramps"],
    match: (p, c) =>
      c(["park-kits"]) ||
      /park (set|kit)|mini park|venue set|scene set|terrain combo|obstacle set|ramp set/.test(
        titleTags(p),
      ),
  },
  {
    slug: "fingerboard-molds",
    h1: "Fingerboard Molds and Press Kits",
    title: "Fingerboard Molds & Deck Press Kits",
    metaDescription:
      "Fingerboard press molds in shallow, medium and deep concave, with metal pins and scribes. Press your own maple decks at home. Ships worldwide.",
    eyebrow: "Press your own decks",
    intro: [
      "A fingerboard mold is a press that squeezes thin veneer layers and glue into the curved shape of a deck. With a mold, maple veneer, glue and a few hours, you can make decks in the exact concave and shape you want instead of buying whatever is in stock.",
      "Molds come in different concave depths, different deck lengths and widths, and in plastic, metal-bumped and full metal builds. Pick the concave you ride, then check that the mold's outline matches the width you need. The listings show the profile, the included pins and scribes, and which veneer width to cut.",
    ],
    tips: [
      {
        heading: "Choose your concave",
        body: "Shallow concave feels flatter and slides easier, medium suits most riders, and deep concave locks the fingers in for flip tricks. If you are unsure, medium is the safe starting point.",
      },
      {
        heading: "Pins and scribes matter",
        body: "Alignment pins keep the veneer from shifting under pressure, and a scribe marks the deck outline so shapes stay consistent from deck to deck. A set that includes them saves a trip to the workshop.",
      },
      {
        heading: "Plastic, metal-bumped or full metal",
        body: "Plastic and metal-bumped molds are the economical way to start. A full metal mold holds tighter tolerances and lasts longer if you press often.",
      },
    ],
    faqs: [
      {
        q: "What do I need to press a fingerboard deck?",
        a: "A mold, maple veneer sheets, wood glue, a clamp or press for pressure, and a scribe or template to mark the outline. Our molds list what is included.",
      },
      {
        q: "How many veneer layers does a deck use?",
        a: "Most fingerboard decks use five to seven thin layers. Five-ply decks are lighter and more flexible, while seven-ply is stiffer and lasts longer.",
      },
      {
        q: "Can a beginner make decks with a mold?",
        a: "Yes. Start with a medium concave mold, practise the glue and clamp steps on a spare set of veneer, and follow the pressing guide before cutting your first outline.",
      },
    ],
    guides: [
      "how-to-press-a-fingerboard-deck",
      "which-fingerboard-mold-to-buy",
      "fingerboard-molds-explained",
    ],
    related: ["fingerboard-veneer-blanks", "34mm-fingerboards", "maple-fingerboard-decks"],
    match: (p) => /\b(mold|mould|press)\b/.test(p.title.toLowerCase()),
  },
  {
    slug: "fingerboard-veneer-blanks",
    h1: "Fingerboard Veneer and Deck Blanks",
    title: "Fingerboard Veneer Sheets & Deck Blanks",
    metaDescription:
      "Maple veneer sheets and pre-cut deck blanks for fingerboard builders. Dyed and natural colours, ready to glue, press and cut.",
    eyebrow: "Raw materials",
    intro: [
      "Veneer and blanks are what you build a fingerboard from. Thin maple veneer sheets are glued in layers and pressed in a mold; pre-cut blanks skip the first steps so you can shape, sand, grip and assemble.",
      "Natural maple suits classic wood decks, while dyed veneer gives coloured layers you can reveal along the edge when you shape the deck. Match the veneer to your mold: the listings show the thickness and sheet size.",
    ],
    tips: [
      {
        heading: "Blanks or raw veneer?",
        body: "If you own a mold, raw veneer gives the most control over layers and colours. If you do not, pre-cut blanks are the easier way to start shaping and finishing decks.",
      },
      {
        heading: "Mind the thickness",
        body: "Veneer thickness decides how many layers you need for a firm deck. Thin sheets need more layers; check the listing before you buy.",
      },
      {
        heading: "Colour on the edge",
        body: "Dyed layers show on the side of the finished deck. Alternate colours for a stripe you can see when the deck is cut.",
      },
    ],
    faqs: [
      {
        q: "What veneer is best for fingerboard decks?",
        a: "Maple is the standard: strong, tight-grained and easy to press. Dyed maple veneer gives the same strength with coloured edges.",
      },
      {
        q: "Do I need a mold to use veneer?",
        a: "To make a curved deck you need a mold or a press. Flat blanks can be shaped and used without one.",
      },
      {
        q: "How do I cut a deck from pressed veneer?",
        a: "Mark the outline with a scribe or template, cut slightly outside the line, then sand to the final shape.",
      },
    ],
    guides: ["how-to-press-a-fingerboard-deck", "maple-fingerboard-decks-foundation"],
    related: ["fingerboard-molds", "maple-fingerboard-decks", "34mm-fingerboards"],
    match: (p) => /veneer|deck blank|blanks/.test(titleTags(p)),
  },
  {
    slug: "fingerboard-foam-grip-tape",
    h1: "Fingerboard Foam Grip Tape",
    title: "Fingerboard Foam Grip Tape & Grip Pads",
    metaDescription:
      "Foam grip tape and grip pads for fingerboards: uncut sheets, thick foam and anti-slip mats. Cut to your deck, press on, and ride.",
    eyebrow: "Grip",
    intro: [
      "Foam grip tape is the cheapest upgrade for control. Instead of sandpaper-style grit, a layer of soft foam grips your fingertips, so ollies, flips and grinds feel steadier and your fingers do not get sore.",
      "Foam grip comes as uncut sheets you trim to your deck, in different thicknesses, and as anti-slip mats and pads for the surface your board rides on. Replace it when it wears, goes smooth or peels at the edge.",
    ],
    tips: [
      {
        heading: "Cut it clean",
        body: "Press the sheet onto the deck, trim around the edge with a craft knife or a file made for the job, and smooth any air bubbles with a fingernail. A sharp blade makes a clean edge.",
      },
      {
        heading: "Thickness changes the feel",
        body: "Thicker foam is softer and quieter; thin foam feels closer to the deck. Pick by feel and swap when you want to change it.",
      },
      {
        heading: "Replace worn tape early",
        body: "Smooth, dirty or peeling tape is the usual reason a flip suddenly feels off. A fresh sheet is quicker and cheaper than a new deck.",
      },
    ],
    faqs: [
      {
        q: "How do I put foam grip tape on a fingerboard?",
        a: "Peel the backing, press the sheet onto the clean deck from one end to the other, trim around the edge with a knife and smooth it down. A flat tool helps remove air bubbles.",
      },
      {
        q: "How long does foam grip tape last?",
        a: "With regular riding, weeks to a few months. Replace it when it feels smooth, lifts at the edges or collects dirt that will not brush off.",
      },
      {
        q: "Do I need a separate sheet for each deck?",
        a: "One uncut sheet usually covers more than one deck. The sheets here are sized to cut a standard 34mm deck with room to spare.",
      },
    ],
    guides: ["fingerboard-foam-tape-guide", "fingerboard-grip-tape-guide"],
    related: ["fingerboard-trucks", "fingerboard-bearing-wheels", "maple-fingerboard-decks"],
    match: (p, c) => c(["grip-tape"]),
  },
  {
    slug: "fingerboard-bearing-wheels",
    h1: "Fingerboard Wheels and Bearings",
    title: "Fingerboard Wheels & Bearing Wheels",
    metaDescription:
      "Fingerboard wheels in urethane and CNC, with and without bearings, plus bearings and bushings. Spin longer, grip better, ship worldwide.",
    eyebrow: "Wheels",
    intro: [
      "Wheels change how a fingerboard rolls more than almost any other part. Urethane wheels grip and run quietly, CNC wheels are machined to tight sizes and run fast, and bearing wheels spin longer because each wheel rides on small bearings.",
      "Pick wheels by the surface you ride and the style you like: harder wheels slide and are fast on smooth desks, softer wheels grip and absorb noise. Check the wheel width and the axle size against your trucks before you buy.",
    ],
    tips: [
      {
        heading: "Urethane or CNC",
        body: "Urethane is the softer, grippier choice and runs quietly. CNC wheels are machined hard and run fast and true. Many riders switch between them depending on the surface.",
      },
      {
        heading: "Bearings spin longer",
        body: "A wheel on bearings spins freely for a long time, which suits rolling tricks and transition. Wheels without bearings are simpler and cheaper.",
      },
      {
        heading: "Match the trucks",
        body: "Wheels, trucks and axle widths need to match. If you are replacing wheels on a complete, check that the new set fits the existing axle.",
      },
    ],
    faqs: [
      {
        q: "What wheels are best for fingerboards?",
        a: "It depends on the surface. Urethane wheels grip and are quiet on wood or desks; CNC wheels are fast and true on smooth tops. Bearing wheels spin longer than plain wheels.",
      },
      {
        q: "Do fingerboard wheels need bearings?",
        a: "No, but bearings make wheels spin longer and smoother. Many riders prefer them for rolling and transition.",
      },
      {
        q: "How do I know which wheels fit?",
        a: "Check the wheel width and the axle or hole size against your trucks. A mismatch is the most common reason new wheels wobble.",
      },
    ],
    guides: [
      "fingerboard-wheels-types-explained",
      "which-fingerboard-bearings-to-buy",
      "how-to-clean-fingerboard-bearings-and-wheels",
    ],
    related: ["fingerboard-trucks", "fingerboard-foam-grip-tape", "maple-fingerboard-decks"],
    match: (p, c) => c(["wheels"]),
  },
  {
    slug: "fingerboard-trucks",
    h1: "Fingerboard Trucks and Bushings",
    title: "Fingerboard Trucks, Bushings & Hardware",
    metaDescription:
      "Fingerboard trucks in single and double-axle styles, plus bushings and locknuts. Pick your width, tune your turn, upgrade your setup.",
    eyebrow: "Trucks",
    intro: [
      "Trucks decide how a fingerboard turns. Single-axle trucks are light and simple, double-axle trucks are stable and carve smoothly, and the bushings inside set how loose or tight the board feels when you lean.",
      "Trucks come in widths that match deck widths: 29mm, 32mm, 34mm and 36mm are the common ones. Match the truck width to the deck, then tune with bushings and locknuts until the turn feels right for how you ride.",
    ],
    tips: [
      {
        heading: "Single or double axle",
        body: "Single-axle trucks are lighter and feel more connected for tech and flip tricks. Double-axle trucks sit stable and carve smoothly, which many riders prefer for parks and transition.",
      },
      {
        heading: "Match deck width",
        body: "Choose trucks the same width as your deck. A truck that is too narrow or wide throws off the balance and the way wheels clear the deck.",
      },
      {
        heading: "Tune with bushings",
        body: "Softer bushings turn easily and feel loose; harder bushings feel stable and snappy. Locknuts keep the setting from drifting during a session.",
      },
    ],
    faqs: [
      {
        q: "What size fingerboard trucks do I need?",
        a: "Match the truck width to your deck: a 34mm deck uses 34mm trucks, a 32mm deck uses 32mm trucks. Many trucks are listed in several widths.",
      },
      {
        q: "Are double-axle or single-axle trucks better?",
        a: "Neither is better overall. Double-axle trucks are more stable for carving and parks, single-axle trucks are lighter and favoured for tech tricks.",
      },
      {
        q: "How do I change fingerboard bushings?",
        a: "Unscrew the locknut, slide the old bushing off, fit the new one, then tighten the locknut until the board turns the way you like.",
      },
    ],
    guides: ["fingerboard-bushings-guide", "which-fingerboard-bearings-to-buy"],
    related: ["fingerboard-bearing-wheels", "34mm-fingerboards", "fingerboard-foam-grip-tape"],
    match: (p, c) => c(["trucks"]) || /bushing|locknut/.test(titleTags(p)),
  },
  {
    slug: "maple-fingerboard-decks",
    h1: "Maple Fingerboard Decks",
    title: "Maple Fingerboard Decks — Shapes & Widths",
    metaDescription:
      "Wooden fingerboard decks in maple: graphic and plain, shallow to deep concave, in the common widths. Build your own setup deck by deck.",
    eyebrow: "Decks",
    intro: [
      "A maple deck is the heart of a fingerboard. Most wooden decks are layers of thin maple pressed into a curved shape, and the differences you will feel are the width, the concave depth, the number of layers and the shape of the nose and tail.",
      "If you are building your own setup, start by choosing the width you ride, then the concave, then the graphic. If you would rather have everything assembled, a complete from the completes page includes trucks and wheels matched to the deck.",
    ],
    tips: [
      {
        heading: "Width first",
        body: "Decks run from small 29mm sizes to wide 36mm. 34mm is the usual all-rounder; go narrower for quick flip tricks and wider for stability on obstacles.",
      },
      {
        heading: "Concave depth",
        body: "Deeper concave locks your fingers in and helps flips; shallow concave feels flatter and slides more easily. Medium is a safe start.",
      },
      {
        heading: "Plies and strength",
        body: "More layers make a stiffer deck that lasts longer; fewer layers give more flex. Most riders use five to seven layers.",
      },
    ],
    faqs: [
      {
        q: "What is the best fingerboard deck width?",
        a: "34mm suits most riders. Choose 32mm or narrower for tight flip tricks and 36mm for a wider, more stable platform.",
      },
      {
        q: "What does concave do on a fingerboard deck?",
        a: "Concave is the curve across the deck. It sets how much the fingertips lock in and how the board flips.",
      },
      {
        q: "Do I need trucks and wheels as well?",
        a: "A bare deck needs trucks, wheels and grip to ride. A complete bundles all of them together.",
      },
    ],
    guides: [
      "fingerboard-deck-shapes-compared",
      "5-ply-vs-7-ply-fingerboard-decks",
      "fingerboard-concave-explained",
    ],
    related: ["34mm-fingerboards", "fingerboard-trucks", "fingerboard-molds"],
    match: (p, c) => c(["decks"]),
  },
  {
    slug: "29mm-fingerboards",
    h1: "29mm Fingerboards",
    title: "29mm Fingerboards, Decks & Trucks",
    metaDescription:
      "29mm fingerboard completes, decks and trucks for small hands and tight spaces. See what a 29mm board is, and what works with it.",
    eyebrow: "29mm",
    intro: [
      "A 29mm fingerboard is a narrower deck for riders who prefer a smaller board or who have smaller hands. The tighter width makes flip tricks quick and the board easy to rotate, at the cost of some stability on wide obstacles.",
      "If you ride a 29mm deck, match it with 29mm trucks and wheels sized for it. The listings below include 29mm completes and parts, and the sizing guide explains how 29mm compares with 32mm, 34mm and 36mm.",
    ],
    tips: [
      {
        heading: "Who rides 29mm",
        body: "Riders with smaller hands, kids learning the first tricks, and anyone who wants a quicker, lighter board for flatland and desk tricks.",
      },
      {
        heading: "Match trucks and wheels",
        body: "A narrow deck needs narrow trucks. Mixing widths changes the balance and wheel clearance, so choose parts listed for 29mm.",
      },
      {
        heading: "Obstacles still work",
        body: "29mm boards fit all standard obstacles; wider ledges and rails are easier to land on than thin round rails.",
      },
    ],
    faqs: [
      {
        q: "What size is a 29mm fingerboard?",
        a: "29mm is the width of the deck. The board is narrower than 32mm, 34mm and 36mm decks, so it feels small and quick under the fingers.",
      },
      {
        q: "Is 29mm or 32mm better for beginners?",
        a: "32mm and 34mm are easier for most beginners because they are more stable; 29mm suits riders with small hands or who want a quicker board.",
      },
      {
        q: "Can I use 32mm trucks on a 29mm deck?",
        a: "It is not recommended. Wheels and axle spacing will not line up with the deck. Use trucks listed as 29mm.",
      },
    ],
    guides: ["29mm-fingerboard-guide", "fingerboard-sizing-guide", "32mm-vs-34mm-fingerboard-width-guide"],
    related: ["32mm-fingerboards", "34mm-fingerboards", "36mm-fingerboards"],
    match: (p) => /29 ?mm/.test(titleTags(p)),
  },
  {
    slug: "32mm-fingerboards",
    h1: "32mm Fingerboards",
    title: "32mm Fingerboards, Completes & Decks",
    metaDescription:
      "32mm fingerboard completes, decks and trucks: the classic width for quick flip tricks. Compare options and ride a board that fits.",
    eyebrow: "32mm",
    intro: [
      "32mm is the classic fingerboard width: narrow enough to flip and rotate quickly, wide enough to stay stable on most obstacles. Many riders learn on 32mm and some never move away from it.",
      "Below you will find 32mm completes, decks and trucks. If you are choosing between 32mm and 34mm, the guides explain how width changes the feel and which kind of hand and style each suits.",
    ],
    tips: [
      {
        heading: "Quick flip, tight feel",
        body: "A 32mm deck is light and rotates fast, which suits technical flatland and flip tricks.",
      },
      {
        heading: "Choose a complete to start",
        body: "A complete already has trucks and wheels matched to the width, which avoids the biggest beginner mistake: mixing sizes.",
      },
      {
        heading: "Step up if you want stability",
        body: "If obstacles feel twitchy, try 34mm. The difference is small but you will notice the extra platform.",
      },
    ],
    faqs: [
      {
        q: "Is 32mm or 34mm better?",
        a: "34mm is more stable for most riders; 32mm is quicker and lighter. Try the one that matches your hand size and favourite tricks.",
      },
      {
        q: "What trucks fit a 32mm deck?",
        a: "Choose trucks listed as 32mm so the axle width and wheel clearance match the deck.",
      },
      {
        q: "Are 32mm fingerboards good for beginners?",
        a: "Yes, particularly for smaller hands. Many beginners start on 32mm or 34mm completes.",
      },
    ],
    guides: ["32mm-vs-34mm-fingerboard-width-guide", "fingerboard-sizing-guide", "best-beginner-fingerboard-setup"],
    related: ["29mm-fingerboards", "34mm-fingerboards", "36mm-fingerboards"],
    match: (p, c) => /32 ?mm/.test(titleTags(p)) && c(["completes", "decks", "trucks"]),
  },
  {
    slug: "34mm-fingerboards",
    h1: "34mm Fingerboards",
    title: "34mm Fingerboards, Completes & Decks",
    metaDescription:
      "34mm fingerboard completes, decks and trucks: the all-round width for most riders. Compare graphics and builds, ready to ride.",
    eyebrow: "34mm",
    intro: [
      "34mm is the most common fingerboard width and the safest starting point if you are unsure. It is wide enough to feel stable on ramps and rails and narrow enough for quick flip tricks, so it suits most hands and most styles.",
      "This page lists 34mm completes, decks and trucks. A complete arrives assembled and ready to ride; decks and trucks let you build your own. For a wider platform see 36mm, for quicker flips see 32mm.",
    ],
    tips: [
      {
        heading: "The all-rounder",
        body: "If you only buy one size, make it 34mm. It works on every obstacle and with the widest range of trucks and wheels.",
      },
      {
        heading: "Complete or build your own",
        body: "A complete is the easy start. Building from a deck and trucks lets you choose concave, graphics and trucks separately.",
      },
      {
        heading: "Match the trucks",
        body: "34mm decks need 34mm trucks. Using a narrower truck changes the way the board balances.",
      },
    ],
    faqs: [
      {
        q: "Is 34mm a good size for beginners?",
        a: "Yes. It is the most popular width and the easiest to find parts for.",
      },
      {
        q: "What is the difference between 34mm and 36mm?",
        a: "36mm is wider and more stable on obstacles; 34mm flips a little quicker and fits more hands.",
      },
      {
        q: "Do all obstacles fit a 34mm board?",
        a: "Yes. Fingerboard ramps, rails and ledges are built for the standard width range.",
      },
    ],
    guides: ["best-fingerboards-guide", "fingerboard-sizing-guide", "32mm-vs-34mm-fingerboard-width-guide", "best-beginner-fingerboard-setup"],
    related: ["32mm-fingerboards", "36mm-fingerboards", "maple-fingerboard-decks"],
    match: (p, c) => /34 ?mm/.test(titleTags(p)) && c(["completes", "decks", "trucks"]),
  },
  {
    slug: "36mm-fingerboards",
    h1: "36mm Fingerboards",
    title: "36mm Fingerboards, Completes & Trucks",
    metaDescription:
      "36mm fingerboard completes, decks and trucks: the wide, stable width for obstacles and bigger hands. Compare builds and graphics.",
    eyebrow: "36mm",
    intro: [
      "36mm is the wide fingerboard size. The extra platform makes the board easy to land on, steady on rails and ledges, and comfortable for larger hands. Flips take a little more effort than on 32mm or 34mm, which is why many riders keep a wide board for parks.",
      "The 36mm completes, decks and trucks below are matched for width. If you are moving up from 34mm, expect a slower, more planted feel.",
    ],
    tips: [
      {
        heading: "Stable on obstacles",
        body: "The wider deck sits more stably on thin rails and ledges, which helps with grinds and slides.",
      },
      {
        heading: "Bigger hands",
        body: "If a smaller deck feels cramped under your fingers, 36mm gives more room.",
      },
      {
        heading: "Use matching trucks",
        body: "Choose trucks listed as 36mm so the wheels line up with the wider deck.",
      },
    ],
    faqs: [
      {
        q: "Is 36mm too big?",
        a: "Not for obstacles and larger hands; it is a popular choice for park riders. For fast flat tricks many riders prefer 32mm or 34mm.",
      },
      {
        q: "Will a 36mm board fit on ramps and rails?",
        a: "Yes. The only difference is it is easier to land on a wider ledge than on a thin rail.",
      },
      {
        q: "Can I put 34mm trucks on a 36mm deck?",
        a: "It is not recommended; use trucks listed for 36mm for correct balance.",
      },
    ],
    guides: ["36mm-fingerboard-guide", "fingerboard-sizing-guide"],
    related: ["34mm-fingerboards", "32mm-fingerboards", "fingerboard-rails"],
    match: (p, c) => /36 ?mm/.test(titleTags(p)) && c(["completes", "decks", "trucks"]),
  },
  {
    slug: "hailey-fingerboards",
    h1: "HAILEY Fingerboards",
    title: "HAILEY Fingerboards — PORK, Graffiti & Completes",
    metaDescription:
      "HAILEY fingerboards: PORK series completes, pink graffiti maple decks, CNC wheels and more. See each board and pick your setup.",
    eyebrow: "Brand",
    intro: [
      "HAILEY makes graphic fingerboard decks and completes with a distinctive hand-drawn look, from the black PORK series to pink graffiti on Canadian maple. This page collects the HAILEY boards and parts we stock in one place.",
      "If you are searching for PORK fingerboards, start with the PORK series complete; for a decks-only build, look at the single decks and CNC wheels that match them.",
    ],
    tips: [
      {
        heading: "Complete or deck only",
        body: "A complete includes trucks and wheels. A deck only gives you the graphic to build on your own setup.",
      },
      {
        heading: "PORK series",
        body: "The PORK graphics are a bold black-and-white look; each listing shows the exact variant and photo.",
      },
      {
        heading: "Add matching parts",
        body: "HAILEY CNC wheels and parts match the decks for a clean setup.",
      },
    ],
    faqs: [
      {
        q: "What are PORK fingerboards?",
        a: "PORK is a graphic series from HAILEY, available here as a complete with a black PORK deck and 34mm dual-axle trucks.",
      },
      {
        q: "Are HAILEY fingerboards maple?",
        a: "HAILEY decks are pressed from maple; each listing states the material and width.",
      },
      {
        q: "Do you ship HAILEY fingerboards worldwide?",
        a: "Yes, we ship to 42 countries with tracking.",
      },
    ],
    guides: ["fingerboard-deck-shapes-compared", "best-beginner-fingerboard-setup"],
    related: ["34mm-fingerboards", "maple-fingerboard-decks", "fingerboard-bearing-wheels"],
    match: (p) => /hailey/.test(titleTags(p)),
  },
  {
    slug: "anti-once-fingerboards",
    h1: "Anti Once Fingerboards",
    title: "Anti Once Fingerboards — Graphic Maple Completes",
    metaDescription:
      "Anti Once fingerboards: graphic maple completes in 30mm, 32mm and 34mm with poly bag, clear box, wooden box or skate bag packs.",
    eyebrow: "Brand",
    intro: [
      "Anti Once graphic fingerboards are known for bold cartoon decks. Each complete here comes in 30mm, 32mm or 34mm widths and in four packaging options, from a simple poly bag to a clip-on skate bag or a wooden storage box.",
      "Pick the graphic, pick the width, then pick the pack. Every variant has its own photo so you see what arrives.",
    ],
    tips: [
      {
        heading: "Pick your width",
        body: "30mm for small hands and quick tricks, 32mm as the classic all-rounder, 34mm for a stable feel on obstacles.",
      },
      {
        heading: "Choose the pack",
        body: "The poly bag is the cheapest; the clear box keeps parts tidy; the wooden box and skate bag are good for gifts and carrying.",
      },
      {
        heading: "Collect the series",
        body: "The graphics are part of a series; buy one, then add others for a matching set.",
      },
    ],
    faqs: [
      {
        q: "What is included in an Anti Once complete?",
        a: "The deck, trucks, wheels, foam grip tape, screws and a tool.",
      },
      {
        q: "What widths are available?",
        a: "30mm, 32mm and 34mm. Pick your width from the options on each listing.",
      },
      {
        q: "Which packaging is best as a gift?",
        a: "The wooden box or the skate bag are the most gift-ready.",
      },
    ],
    guides: ["fingerboard-sizing-guide", "best-beginner-fingerboard-setup"],
    related: ["32mm-fingerboards", "34mm-fingerboards", "hailey-fingerboards"],
    match: (p) => /anti once|antionce/.test(titleTags(p)),
  },
  {
    slug: "dtzero-fingerboard-ramps",
    h1: "DTzero Fingerboard Ramps and Obstacles",
    title: "DTzero Fingerboard Ramps & Park Obstacles",
    metaDescription:
      "DTzero fingerboard obstacles: half-U ramps, benches, fence rails, brick boxes and arcs for realistic desk parks.",
    eyebrow: "Brand",
    intro: [
      "DTzero builds realistic street-style fingerboard obstacles: brick-finish ramps, benches, fence rails and arc benches that look like the real thing. The pieces here are sold individually so you can add them to your park one at a time.",
      "Mix a half-U with a bench and a fence rail for a street line, or add an arc bench for a curved obstacle. The textured finishes give the same spins and grinds as outdoor spots.",
    ],
    tips: [
      {
        heading: "Street-style building",
        body: "Combine a ramp with a bench and a rail to make a line that feels like a street spot.",
      },
      {
        heading: "Metal versus wood",
        body: "Metal pieces such as the park bench and fence rail are heavier and stay put; wooden ramps are lighter.",
      },
      {
        heading: "Pair with a complete",
        body: "A complete from our range gives you a board matched to these obstacles.",
      },
    ],
    faqs: [
      {
        q: "Are DTzero pieces compatible with other brands?",
        a: "Yes. Fingerboard obstacles are built for the standard width range, so you can mix them with any ramp or rail.",
      },
      {
        q: "What is the half-U ramp used for?",
        a: "It gives you a curved transition to carve and pump on, finished in a brick pattern.",
      },
      {
        q: "Do you ship DTzero obstacles worldwide?",
        a: "Yes, with tracking to 42 countries.",
      },
    ],
    guides: ["best-beginner-fingerboard-setup", "finger-board-rails-guide"],
    related: ["fingerboard-rails", "fingerboard-mini-ramps", "fingerboard-parks"],
    match: (p) => /dtzero/.test(titleTags(p)),
  },
];

/** Hubs that still have enough live products. */
export function seoHubs(products: Product[]): { hub: Hub; products: Product[] }[] {
  const out: { hub: Hub; products: Product[] }[] = [];
  for (const hub of HUBS) {
    const matched = products.filter((p) => hub.match(p, inCol(p.handle)));
    if (matched.length >= MIN_PRODUCTS) out.push({ hub, products: matched });
  }
  return out;
}

export function hubSlugs(): string[] {
  return HUBS.map((h) => h.slug);
}

export function getHub(slug: string): Hub | undefined {
  return HUBS.find((h) => h.slug === slug);
}

/** Hubs that list a guide as "read next" (used to link guide -> hub). */
export function hubsForGuide(guideSlug: string): Hub[] {
  return HUBS.filter((h) => h.guides.includes(guideSlug));
}
