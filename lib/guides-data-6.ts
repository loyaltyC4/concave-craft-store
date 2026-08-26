import type { Guide } from "./guides-data";

export const guidesBatch6: Guide[] = [
  {
    slug: "custom-fingerboard-design-guide",
    title: "Custom Fingerboard Design Guide: File Types, Sizes & Tips",
    metaTitle: "Custom Fingerboard Design Guide: File Formats, Resolution & Artwork Tips",
    metaDescription:
      "How to prepare your artwork for a custom fingerboard deck — accepted file formats, recommended resolution, what makes a great graphic, and turnaround expectations.",
    category: "Reference",
    updated: "2026-08-26",
    readMinutes: 7,
    heroSummary:
      "For a custom fingerboard graphic, a vector file (SVG, AI, or EPS) gives the sharpest print with no pixellation, but a high-resolution raster image (PNG or JPG at 300 dpi or higher, sized to at least 1200 x 3200 px) works equally well. The most important factors are contrast, a simple composition with no fine detail smaller than 1 mm at deck scale, and avoiding colours that merge into the natural maple grain. This guide covers everything you need to export the right file the first time.",
    sections: [
      {
        heading: "Accepted File Formats",
        body: [
          "We accept SVG, AI, EPS, PDF, PNG, JPG, HEIC, and WebP. Files must be 15 MB or under per upload.",
          "Vector formats (SVG, AI, EPS, PDF with vector content): These are resolution-independent. The design can be scaled to any size without any loss in quality. If your artwork was created in Adobe Illustrator, Inkscape, Affinity Designer, or Figma (as an SVG export), use a vector file. Logos, wordmarks, geometric graphics, and clean illustrations are natural fits for vector export.",
          "Raster formats (PNG, JPG, HEIC, WebP): Resolution-dependent — quality is determined by the pixel dimensions and DPI you export at. PNG is the preferred raster format because it supports transparency, which matters if your design has a non-rectangular shape or you want the maple grain to show through in places. JPG is fine for full-bleed photographic images where transparency is not needed.",
        ],
      },
      {
        heading: "When to Use Vector vs Raster",
        body: [
          "Choose vector when: your design is a logo, wordmark, monogram, geometric shape, or clean illustration. Vector files scale perfectly, so there is no decision to make about resolution. They are also smaller file sizes for the same quality level.",
          "Choose raster when: your design is a photograph, a painting, a collage, or any image that was created in pixels from the start. There is no meaningful quality gain from exporting a pixel-based image through a vector format — it just wraps the pixels in a PDF or SVG container without actually vectorising them. Export at 300 dpi or higher instead.",
          "Note on auto-tracing: Some tools (Adobe Illustrator, Inkscape) can auto-trace a raster image into a vector. The results vary. For photographs, auto-trace rarely produces a result worth using. For simple logos and line art with two or three colours, a manual trace in Illustrator or a clean SVG rebuild from scratch is worth the effort and will print sharper than the original raster.",
        ],
      },
      {
        heading: "Recommended Resolution and Canvas Size",
        body: [
          "A fingerboard deck is approximately 100 mm long and 32–36 mm wide, depending on the size you choose. The print area is slightly smaller due to the kick tails and edges — plan for a usable print area of roughly 90 x 30 mm.",
          "For raster files: export at a minimum of 300 dpi. At that resolution, a 90 x 30 mm print area requires at least 1063 x 354 px. We recommend working at 600 dpi (2126 x 708 px) for extra headroom, especially if your design includes fine lines or small text. Working in pixels: a 1200 x 400 px canvas at 300 dpi or a 2400 x 800 px canvas at 600 dpi covers the full deck including bleed.",
          "For vector files: canvas size is irrelevant because the file is resolution-independent. Just make sure your artwork fills the canvas and leave a small bleed zone (2–3 mm) around the edges to account for die-cut tolerance.",
          "File size limit per upload is 15 MB. A high-resolution PNG rarely exceeds this limit. A multi-layer PSD converted to PNG at 600 dpi could approach it — flatten layers before exporting.",
        ],
      },
      {
        heading: "What Makes a Good Custom Fingerboard Graphic",
        body: [
          "Contrast is the single most important quality. A design that reads clearly in thumbnail form will read clearly at deck scale. If your graphic has elements that require zooming in to distinguish, those elements will be lost on a 30 mm wide deck. Increase contrast between your foreground and background, and simplify any detail that is smaller than 2 mm at final print size.",
          "Simple shapes over fine detail. Bold, graphic compositions — large blocks of colour, strong silhouettes, clear typography — survive the scale reduction better than intricate patterns. This is not a limitation of the printing process; it reflects how the eye works at close-to-fingertip distance. Skate graphics have always leaned bold for the same reason.",
          "Colour and the maple grain. If you are printing on natural maple, the wood colour (a warm off-white to light honey) shows through semi-transparent areas. Solid opaque fills print cleanly. Gradients and heavily transparent layers can interact with the wood tone in unpredictable ways depending on the print pass. For maximum colour accuracy, use fully opaque fills. If you want the grain to show through intentionally, that works — just design with it, not against it.",
          "Typography at deck scale. A fingerboard deck is small. Text under 8 pt at print resolution (roughly 3 mm tall) is hard to read. If your design includes a name, phrase, or brand name, set it in a bold or semi-bold weight and confirm it is legible in a scaled-down mockup before submitting.",
          "Bleed and safe zone. Keep essential elements at least 2 mm from the deck edge. The die-cut process has a small tolerance and anything too close to the edge may be partially trimmed. Decorative elements can extend to the edge or slightly beyond (as bleed), but logos, faces, and text should stay within the safe zone.",
        ],
      },
      {
        heading: "Turnaround Expectations",
        body: [
          "Standard builds are completed and shipped within 5–7 business days from order confirmation. This includes artwork review, any small corrections needed for printability, physical deck construction, and printing.",
          "Rush builds (available at checkout for an additional fee) are prioritised and typically complete within 2–3 business days before shipping. Rush is useful for time-sensitive gifts or event deadlines.",
          "We review every file before printing and will contact you if we spot an issue — low resolution, clipping, or a technical problem with the file — before proceeding. We do not charge or build until the artwork is confirmed. This review step is typically same-day for orders placed before noon.",
          "Large bulk orders (10+ boards) may require additional lead time. Contact us directly before placing a large order to confirm current production capacity.",
        ],
      },
      {
        heading: "Common Mistakes to Avoid",
        body: [
          "Submitting a screenshot or low-resolution web export. Social media profile pictures and website images are typically 72 dpi and 200–500 px wide — far too small for a print. Always export from the original source file, not a screen grab.",
          "Embedding fonts without outlining (for vector files). If your AI or EPS file uses a font that is not embedded or converted to outlines, text may render in a substitute font or not at all. Convert all text to paths or outlines before saving.",
          "Submitting a PDF that wraps a low-resolution raster image. A PDF wrapper does not upgrade the resolution of the image inside it. If the embedded image is 72 dpi, the PDF is effectively 72 dpi. Export from the original editable file at the correct resolution.",
          "Forgetting bleed on full-bleed designs. If your design is meant to go edge-to-edge, add 2–3 mm of bleed on all sides so colour does not show a white border after die-cutting.",
        ],
      },
    ],
    table: {
      title: "Quick reference: file format comparison",
      columns: ["Format", "Type", "Best for", "Min recommended spec"],
      rows: [
        ["SVG", "Vector", "Logos, icons, geometric art", "N/A (scale-independent)"],
        ["AI / EPS", "Vector", "Professional brand assets, Illustrator work", "N/A (scale-independent)"],
        ["PDF", "Vector or raster", "Multi-page layouts, print-ready exports", "Vector content preferred; raster at 300 dpi+"],
        ["PNG", "Raster", "Artwork with transparency, digital illustrations", "300 dpi min; 1200 x 400 px+"],
        ["JPG", "Raster", "Full-bleed photographs", "300 dpi min; 1200 x 400 px+"],
        ["HEIC / WebP", "Raster", "Phone photos, modern exports", "300 dpi min; 1200 x 400 px+"],
      ],
    },
    faqs: [
      {
        q: "Can I submit my design as a Canva export?",
        a: "Yes. Export as PNG at the highest quality Canva offers, or as PDF (print quality). Canva's PNG exports are typically 96 dpi at screen resolution — to get a print-quality file, set your Canva canvas to 1200 x 400 px or larger before exporting, which gives you sufficient pixel dimensions even at 96 dpi.",
      },
      {
        q: "What if my file is too low resolution?",
        a: "We review every file before building and will contact you if the resolution is too low to print cleanly. We do not proceed until the artwork is confirmed. You will have the option to resubmit a higher-resolution version or approve a lower-quality print.",
      },
      {
        q: "Do you accept Photoshop PSD files?",
        a: "We accept PNG and JPG exports from Photoshop, but not raw PSD files. Flatten your layers and export as PNG (for transparency support) or JPG (for full-bleed photos) before uploading.",
      },
      {
        q: "Can I submit multiple design options and choose after seeing a proof?",
        a: "Yes — use the Notes field to tell us you want to see a proof before we print. We will send a digital mockup of your design on the deck shape. This may add one business day to the turnaround.",
      },
      {
        q: "Do you colour-match to a specific Pantone or CMYK value?",
        a: "Our process is optimised for RGB artwork (what you see on screen). We do not currently guarantee Pantone or exact CMYK colour matching. For brand-critical colours, submit an RGB hex value with your order and we will do our best to match it in print — but a small colour shift between screen and print is normal in digital printing.",
      },
    ],
    related: [
      "blank-fingerboard-decks-choosing-and-painting",
      "fingerboard-deck-materials-explained",
      "5-ply-vs-7-ply-fingerboard-decks",
    ],
  },
];
