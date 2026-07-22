export type GlossaryTerm = {
  term: string;
  slug: string;
  definition: string;
  longDescription?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Baseplate",
    slug: "baseplate",
    definition:
      "The flat mounting plate of a fingerboard truck that bolts directly to the underside of the deck and houses the pivot cup and kingpin.",
    longDescription:
      "The baseplate angle (measured in degrees) influences how much turning movement a given amount of tilt produces — a higher degree baseplate turns more per degree of lean. Most fingerboard trucks use fixed baseplate angles of around 50–55 degrees.",
  },
  {
    term: "Bearing (ABEC Rating)",
    slug: "bearing-abec-rating",
    definition:
      "A small precision ring of steel balls enclosed in an inner and outer race that allows a fingerboard wheel to spin freely on its axle with minimal friction.",
    longDescription:
      "ABEC (Annular Bearing Engineers' Committee) ratings describe dimensional tolerance classes: higher ABEC numbers (5, 7, 9) indicate tighter manufacturing tolerances and potentially smoother spin, though the practical difference between ABEC 5 and ABEC 7 is minimal for fingerboarding speeds. Fingerboard bearings should be kept clean and lightly oiled to maintain optimal spin.",
  },
  {
    term: "Bushing",
    slug: "bushing",
    definition:
      "A small cylindrical or barrel-shaped polyurethane cushion that sits between the hanger and baseplate of a fingerboard truck, acting as a spring that controls turning resistance and rebound.",
    longDescription:
      "Bushing hardness is measured in durometer Shore A — softer bushings (lower Shore A) compress more easily for a looser, more responsive turn; firmer bushings (higher Shore A) provide more resistance and stability. Bushings wear out over time and can be replaced independently without replacing the entire truck.",
  },
  {
    term: "Camber",
    slug: "camber",
    definition:
      "The slight upward arch along the length of a fingerboard deck from nose to tail, which stores potential energy that is released as pop when the tail is pressed.",
    longDescription:
      "Unlike concave, which curves across the width of the deck, camber curves along the deck's length. Mellow camber gives a deck a livelier feel underfoot and contributes to pop response. Some decks are intentionally flat (no camber) or have very slight rocker (downward arch) as a stylistic choice.",
  },
  {
    term: "Complete",
    slug: "complete",
    definition:
      "A fully assembled fingerboard setup consisting of a deck, trucks, wheels, bearings, and grip tape — ready to ride without purchasing additional components.",
    longDescription:
      "Completes are available from toy-grade (plastic trucks and wheels) to professional-grade (aluminum trucks, urethane wheels, quality bearings). Most serious fingerboarders eventually build their own custom setup from individual parts rather than buying completes, as part compatibility and personal preference become more important.",
  },
  {
    term: "Concave",
    slug: "concave",
    definition:
      "The upward curve across the width of a fingerboard deck from rail to rail, which provides a channel for fingers to grip during tricks and influences how a deck feels to ride.",
    longDescription:
      "Concave depth and shape are pressed into the deck during manufacturing using a mold. Common profiles include low, medium, and high concave. Higher concave gives a more locked-in feel and sharper rail-to-rail transitions; lower concave feels mellower and is often preferred by riders focused on flat ground technical tricks.",
  },
  {
    term: "Deck",
    slug: "deck",
    definition:
      "The main board component of a fingerboard, typically constructed from layers of maple veneer pressed into a concave shape with raised nose and tail kicks.",
    longDescription:
      "Most quality fingerboard decks use five plies of maple veneer laminated with alternating grain directions for strength and consistency. Deck width, measured in millimeters, is the primary sizing spec and ranges from about 29 mm to 36 mm. Width significantly affects how the board feels for different trick styles.",
  },
  {
    term: "Durometer (Shore A)",
    slug: "durometer-shore-a",
    definition:
      "A numerical scale measuring the hardness of urethane components — lower Shore A numbers indicate softer material, higher numbers indicate firmer material.",
    longDescription:
      "In fingerboarding, durometer is most relevant for bushings and wheels. Softer bushings (around 85A) compress more easily for responsive, fluid turning; firmer bushings (95A+) provide more stability. Wheel durometer affects grip and rolling feel on different surfaces.",
  },
  {
    term: "Fingerboard",
    slug: "fingerboard",
    definition:
      "A miniature skateboard, typically 29–36 mm wide and 95–100 mm long, designed to be ridden by two fingers on a desk or other flat surface by simulating skateboard tricks at a small scale.",
    longDescription:
      "Fingerboarding originated as a hobby accessory in the 1970s and became a mainstream product with the rise of the Tech Deck brand in the late 1990s. The modern fingerboarding scene has grown far beyond toy-grade products, with professional-grade setups featuring precision-machined aluminum trucks, urethane wheels, high-quality maple decks, and a global competition circuit.",
  },
  {
    term: "Grind",
    slug: "grind",
    definition:
      "A trick category in which the axles or truck hangers of a fingerboard slide along the edge or surface of an obstacle such as a ledge, rail, or curb.",
    longDescription:
      "Common fingerboard grinds include the 50-50 (both axles on the obstacle), nosegrind (front axle only), tailslide (tail on the obstacle surface), boardslide (deck perpendicular across the obstacle), and bluntslide (tail angled onto the obstacle). Smooth truck hangers and properly finished obstacle surfaces are important for clean, consistent grinds.",
  },
  {
    term: "Grip Tape",
    slug: "grip-tape",
    definition:
      "A textured adhesive sheet applied to the top surface of a fingerboard deck to create friction between the board and the rider's fingers, enabling control during tricks.",
    longDescription:
      "Fingerboard grip comes in two main types: foam grip tape, which has a soft polyurethane foam surface preferred by serious riders for its realistic feel and comfort during long sessions, and sandpaper-style grip, which uses an abrasive grit surface for stronger mechanical friction at a lower cost. Foam grip has become the dominant choice among dedicated fingerboarders.",
  },
  {
    term: "Hanger",
    slug: "hanger",
    definition:
      "The T-shaped metal component of a fingerboard truck that spans the axle, serves as the grinding surface, and pivots on the baseplate through the pivot cup.",
    longDescription:
      "Hanger width is measured from axle end to axle end and should be matched to deck width — a hanger that is too narrow makes the board feel tippy, while one that is too wide creates excessive wheel clearance that can interfere with certain tricks. Hanger material is typically cast aluminum in quality fingerboard trucks.",
  },
  {
    term: "Kick (Nose and Tail)",
    slug: "kick-nose-tail",
    definition:
      "The angled upward curve at each end of a fingerboard deck — the tail kick is used to generate pop for most tricks, and the nose kick is used for nollie tricks and nose-first grinds.",
    longDescription:
      "Kick steepness is a key deck spec alongside concave. Steeper kicks (more angle off the flat of the deck) require a sharper, more deliberate press but can produce explosive pop when snapped correctly. Mellow kicks are more forgiving and easier for beginners to learn pop timing on.",
  },
  {
    term: "Kingpin",
    slug: "kingpin",
    definition:
      "The large bolt that passes through the center of a fingerboard truck's bushing stack and baseplate, securing the hanger assembly and controlling bushing compression via its nut.",
    longDescription:
      "Tightening the kingpin nut compresses the bushings and reduces turning response; loosening it allows more bushing deformation and more fluid turning. The kingpin nut is the primary and most accessible tuning control on a fingerboard truck. Kingpin bolts are replaceable if they strip or break.",
  },
  {
    term: "Manual",
    slug: "manual",
    definition:
      "A balance trick in which a fingerboard is rolled on only two wheels — the back two in a standard manual or the front two in a nose manual — without the other wheels touching the surface.",
    longDescription:
      "Manuals are a fundamental fingerboard trick that test balance and stability control. They can be combined with grinds, flips, and other tricks as entry and exit moves to create longer trick combinations. Truck tightness significantly affects manual stability — overly loose trucks make balance harder to maintain.",
  },
  {
    term: "Ollie",
    slug: "ollie",
    definition:
      "The foundational fingerboard trick in which the tail is pressed down to create pop while the front finger slides forward and levels the deck, lifting the board off the surface without a ramp.",
    longDescription:
      "The ollie is the basis for the majority of modern fingerboard tricks. Performing it well requires coordinated timing between the tail press (which pops the board upward) and the front finger slide (which levels the board in the air). Almost all flip tricks, grinds, and aerial maneuvers begin with or incorporate an ollie motion.",
  },
  {
    term: "Pivot Cup",
    slug: "pivot-cup",
    definition:
      "The small urethane or plastic insert inside the nose of a fingerboard truck's baseplate that receives the hanger's pivot pin and allows the hanger to pivot smoothly during turning.",
    longDescription:
      "Pivot cups wear down over time, particularly under hard use. A worn pivot cup allows the pivot pin to rattle and move unpredictably, creating looseness in turns that cannot be corrected by tightening the kingpin. Pivot cups are inexpensive replacement parts and are one of the first components to check when trucks feel unexpectedly sloppy.",
  },
  {
    term: "Wheelbase",
    slug: "wheelbase",
    definition:
      "The distance between the two sets of truck mounting holes on a fingerboard deck, measured center to center, which determines how much deck length falls between the trucks.",
    longDescription:
      "A longer wheelbase provides more stability for manual tricks and grinds because the support points are farther apart. A shorter wheelbase makes the board feel more responsive and nimble for quick direction changes and flip tricks. Some decks offer multiple mounting hole positions, allowing riders to adjust wheelbase without changing any other component.",
  },
];
