// Product catalog. Replace with real products, prices and photos as needed.
// `metal` and `gem` drive the generated SVG artwork until real photos exist.
const CATEGORIES = [
  { id: "rings", name: "Rings", blurb: "Stackable bands & solitaires" },
  { id: "necklaces", name: "Necklaces", blurb: "Pendants & fine chains" },
  { id: "earrings", name: "Earrings", blurb: "Studs, hoops & drops" },
  { id: "bracelets", name: "Bracelets", blurb: "Chains, cuffs & bangles" },
];

const PRODUCTS = [
  { id: "luna-ring", name: "Luna Solitaire Ring", category: "rings", price: 245, metal: "gold", gem: "#f4f1ea", badge: "Bestseller",
    description: "A single round moissanite in a low, four-prong setting on a slim 14k recycled gold band.", material: "14k recycled gold, 4mm moissanite" },
  { id: "halo-band", name: "Halo Stacking Band", category: "rings", price: 98, metal: "silver",
    description: "A 1.5mm polished band designed to be worn alone or stacked in threes.", material: "925 sterling silver" },
  { id: "rose-signet", name: "Rosa Signet Ring", category: "rings", price: 165, metal: "rose", gem: "#e8a0a8",
    description: "A softened oval signet with a tiny rose quartz cabochon set into the face.", material: "Rose gold vermeil, rose quartz" },
  { id: "aria-pendant", name: "Aria Drop Pendant", category: "necklaces", price: 189, metal: "gold", gem: "#7aa6c2", badge: "New",
    description: "A pear-cut blue topaz suspended from a 16–18\" adjustable cable chain.", material: "14k gold vermeil, blue topaz" },
  { id: "pearl-chain", name: "Isla Pearl Necklace", category: "necklaces", price: 145, metal: "silver", gem: "#f7f3ec",
    description: "A single freshwater pearl floating on a fine sterling silver chain.", material: "925 sterling silver, freshwater pearl" },
  { id: "sol-medallion", name: "Sol Medallion", category: "necklaces", price: 210, metal: "gold",
    description: "A hand-textured coin pendant inspired by late afternoon light.", material: "14k gold vermeil" },
  { id: "dew-studs", name: "Dew Drop Studs", category: "earrings", price: 85, metal: "gold", gem: "#f4f1ea", badge: "Bestseller",
    description: "Tiny bezel-set white sapphires for an everyday glint.", material: "14k gold vermeil, white sapphire" },
  { id: "petal-hoops", name: "Petal Huggie Hoops", category: "earrings", price: 120, metal: "rose",
    description: "Small 12mm huggies with a softly faceted edge.", material: "Rose gold vermeil" },
  { id: "tide-drops", name: "Tide Drop Earrings", category: "earrings", price: 135, metal: "silver", gem: "#6fae9a",
    description: "Green tourmaline drops on fine sterling silver hooks.", material: "925 sterling silver, green tourmaline" },
  { id: "thread-bracelet", name: "Thread Chain Bracelet", category: "bracelets", price: 110, metal: "gold",
    description: "A fine paperclip chain with an adjustable 6–7.5\" length.", material: "14k gold vermeil" },
  { id: "mira-tennis", name: "Mira Tennis Bracelet", category: "bracelets", price: 320, metal: "silver", gem: "#f4f1ea", badge: "Limited",
    description: "A continuous line of prong-set white topaz with a secure box clasp.", material: "925 sterling silver, white topaz" },
  { id: "cove-bangle", name: "Cove Open Bangle", category: "bracelets", price: 155, metal: "rose",
    description: "A smooth open cuff that slips on easily and gently hugs the wrist.", material: "Rose gold vermeil" },
];
