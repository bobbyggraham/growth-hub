/* ============================================================
   WHAT FSG DOES — the five.
   One source for the five tiles. Used by:
     story/products.html      (the front door above the matrix)
     story/what-fsg-does.html (the Who We Are page)
   Edit the words here and both pages update.

   line   = the exact line name in the Products matrix (LINES in
            story/products.html). Keep these two in step.
   key    = the deep link: story/products.html?line=<key>
   ask    = the discovery question that opens the line. Ask first.
   say    = the line you say once they've answered. Their problem first.
   proof  = names: clients already shown on the Products matrix.
            stat:  ONE number, and only from a LIVE, approved proof
                   record in assets/proofs.js. No record, no number.
   next   = the expand move: they bought this line, ask about that one.
   ============================================================ */
window.FSG_FIVE = {
  answer: "You shouldn't need five vendors to run a building. FSG is one accountable partner for electrical, lighting, signs, technology, and energy, self-performed coast to coast.",
  short: "Electrical. Lighting. Signs. Technology. Energy.",
  pdf: "assets/fsg/FSG_What_FSG_Does.pdf",
  pptx: "assets/fsg/FSG_What_FSG_Does.pptx",
  tiles: [
    { key: "electrical", n: "01", name: "Electrical", line: "Electrical",
      sub: "Electrical construction and service",
      bullets: ["Preventative maintenance", "Infrared scanning", "New construction and renovations"],
      ask: "When did a site last lose power, and what did that day cost you?",
      say: "Your power can't go down and your build can't run late. We build it, wire it, and keep it on, 24/7.",
      proof: { names: ["Boeing", "Walmart"] },
      next: { key: "energy", why: "We're already in the gear. Ask what the building costs to run." } },
    { key: "lighting", n: "02", name: "Lighting", line: "Lighting",
      sub: "National lighting programs",
      bullets: ["LED retrofits and upgrades", "Lighting design and controls", "Online ordering and tracking"],
      ask: "How many of your sites are still on old lamps, and who handles it when one goes dark?",
      say: "A dark site costs you sales and safety. We design it, retrofit it, and keep every location lit, and we find the parts nobody else can.",
      proof: { names: ["Crash Champions", "U.S. Bank", "Starbucks"], stat: "Crash Champions: 660 locations in 38 states" },
      next: { key: "signs", why: "Same lift, same crew, same site. Ask who keeps the sign lit." } },
    { key: "signs", n: "03", name: "Signs", line: "Signs",
      sub: "Commercial signs",
      bullets: ["Interior and exterior signage", "ADA and wayfinding", "Repair and LED conversions"],
      ask: "If I drove past your locations tonight, how many signs would be out?",
      say: "Your sign is your brand at every location. We survey, permit, build, and install it, then keep it lit.",
      proof: { names: ["HEB", "Wesco", "Valero"] },
      next: { key: "lighting", why: "A rebrand touches every site. Ask about the lot and the interior while the crew is there." } },
    { key: "technology", n: "04", name: "Technology", line: "Technology Infrastructure",
      sub: "Smart buildings and technology infrastructure",
      bullets: ["Cabling and network infrastructure", "Audio/visual and security", "Building automation and controls"],
      ask: "When you open or remodel a site, how many vendors touch the cabling, cameras, and controls?",
      say: "Your building runs on its network. We build the backbone, cabling, AV, security, and controls, then keep it connected and current.",
      proof: { names: [] },
      next: { key: "electrical", why: "Every device needs power. Ask who's pulling the circuits." } },
    { key: "energy", n: "05", name: "Energy", line: "Energy Performance", hi: true,
      sub: "Energy efficiency across every product line",
      bullets: ["Utility rebates and financing", "Solar and EV charging", "Energy audits and monitoring"],
      ask: "Do you know which of your sites costs the most to run, and why?",
      say: "You're paying for energy you don't need. Everything we touch is built to cut that spend, verified at the meter. That's why energy runs through the other four.",
      proof: { names: ["Circle K", "Tesla", "IKEA"] },
      next: { key: "lighting", why: "Lighting is usually the quickest savings to prove. Start there." } }
  ]
};
