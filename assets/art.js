// Generates simple SVG illustrations for products (stand-ins until real photography).
const METALS = {
  gold: ["#f3dc9b", "#c9a14a", "#8a6a24"],
  silver: ["#f2f2f2", "#b8bcc2", "#7d838b"],
  rose: ["#f5cdbf", "#d3907c", "#9a5a4a"],
};

let artSeq = 0;

function metalGradient(metal, id) {
  const [light, mid, dark] = METALS[metal] || METALS.gold;
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${light}"/><stop offset=".5" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/>
  </linearGradient>`;
}

function gem(cx, cy, r, color) {
  if (!color) return "";
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.5"/>
    <circle cx="${cx - r / 3}" cy="${cy - r / 3}" r="${r / 3.5}" fill="#fff" opacity=".8"/>`;
}

function jewelryArt(type, metal = "gold", gemColor) {
  const id = `m${++artSeq}`;
  const s = `url(#${id})`;
  let shape = "";
  switch (type) {
    case "rings":
      shape = `<ellipse cx="100" cy="112" rx="46" ry="40" fill="none" stroke="${s}" stroke-width="11"/>
        ${gemColor ? `<path d="M88 74 l12 -14 l12 14 z" fill="${s}"/>${gem(100, 62, 13, gemColor)}` : ""}`;
      break;
    case "necklaces":
      shape = `<path d="M38 40 Q100 150 162 40" fill="none" stroke="${s}" stroke-width="3" stroke-dasharray="5 3"/>
        ${gemColor
          ? `<path d="M100 120 q-14 18 0 34 q14 -16 0 -34z" fill="${gemColor}" stroke="${s}" stroke-width="3"/>`
          : `<circle cx="100" cy="132" r="20" fill="${s}"/><circle cx="100" cy="132" r="13" fill="none" stroke="#fff" stroke-opacity=".5"/>`}`;
      break;
    case "earrings":
      shape = [70, 130].map((x) => `
        ${gemColor
          ? `<circle cx="${x}" cy="70" r="7" fill="${s}"/><line x1="${x}" y1="77" x2="${x}" y2="104" stroke="${s}" stroke-width="3"/>${gem(x, 118, 15, gemColor)}`
          : `<circle cx="${x}" cy="100" r="24" fill="none" stroke="${s}" stroke-width="8"/>`}`).join("");
      break;
    case "bracelets":
      shape = gemColor
        ? `<ellipse cx="100" cy="100" rx="64" ry="34" fill="none" stroke="${s}" stroke-width="5"/>
           ${Array.from({ length: 9 }, (_, i) => {
             const a = Math.PI * (0.1 + (0.8 * i) / 8);
             return gem(100 - 64 * Math.cos(a), 100 + 34 * Math.sin(a), 6, gemColor);
           }).join("")}`
        : `<ellipse cx="100" cy="100" rx="64" ry="34" fill="none" stroke="${s}" stroke-width="10" stroke-dasharray="330 40" stroke-linecap="round"/>`;
      break;
  }
  return `<svg viewBox="0 0 200 200" role="img" aria-hidden="true"><defs>${metalGradient(metal, id)}</defs>${shape}</svg>`;
}
