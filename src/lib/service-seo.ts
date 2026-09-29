export type ServiceSeo = {
  title: string;
  description: string;
  sections: { heading: string; text: string }[];
  faqs: [string, string][];
};
export const serviceSeo: Record<string, ServiceSeo> = {
  "general-repairs": {
    title: "Home Repairs & Handyman Help in North Vancouver",
    description:
      "Need home repairs in North Vancouver? Get help with doors, drywall patches, cabinet hardware and trim. Send your repair list to Saeed Contracting.",
    sections: [
      {
        heading: "A repair list that fits the property",
        text: "For a homeowner, the priority might be a door that catches on the frame or damaged trim in a busy hallway. For a strata representative, it may be several small common-area items that need approval together. A small business may need repairs planned around customer access. Separate the essential fixes from cosmetic improvements so the agreed visit addresses the right items first.",
      },
      {
        heading: "What affects the repair scope?",
        text: "The number of items is only part of the job. Matching existing hardware, finding a sound fixing point and preparing a damaged surface can affect the approach. Include the age or model of fittings when known, whether a previous repair has failed, and whether the problem changes with use. A photograph supports an initial discussion; it cannot establish the condition behind a wall.",
      },
    ],
    faqs: [
      [
        "Do you take on small handyman jobs in North Vancouver?",
        "Yes, enquiries for small repairs are welcome. Describe each item and its location; we will confirm suitability, access, materials and availability before agreeing on a visit.",
      ],
    ],
  },
  "home-maintenance": {
    title: "Home Maintenance in North Vancouver",
    description:
      "Plan home maintenance in North Vancouver: weatherstripping, caulking touch-ups, door hardware and seasonal upkeep. Request a clearly scoped visit.",
    sections: [
      {
        heading: "Build a seasonal list, not an open-ended visit",
        text: "Start with the places you use every day: entrances, interior doors, accessible seals and frequently used storage. Note what has changed, such as a new draught, a loose handle or a gap in a finish. We can discuss which items fit one maintenance visit and which need further assessment. A list helps homeowners choose priorities without treating every task as equally urgent.",
      },
      {
        heading: "Planning around occupants and shared spaces",
        text: "For a rented home, identify who authorizes the work and who arranges access. In a strata unit, distinguish the owner’s maintenance responsibilities from common property before scheduling. Small workplaces should flag rooms that must stay usable during the visit. We confirm the tasks rather than promising an inspection, a fixed maintenance package or an emergency response.",
      },
    ],
    faqs: [
      [
        "What should go on a home maintenance checklist?",
        "List the location, the symptom and your priority for each item. Add photos of worn weatherstripping, gaps or loose fittings, and identify any recurring moisture issue so the scope can be assessed before work is booked.",
      ],
    ],
  },
  "furniture-assembly": {
    title: "Furniture Assembly in North Vancouver",
    description:
      "Furniture assembly in North Vancouver for beds, desks, dressers and storage. Share product links and access details to request a quote.",
    sections: [
      {
        heading: "Prepare for assembly before delivery day",
        text: "Product details make a better starting point than a box count. Send a link or model number for each item, quantities and whether all packages have arrived. Note the room where each piece will be used and the route from the delivery point. A bed frame, wardrobe and small desk can require very different floor space, tools and handling arrangements.",
      },
      {
        heading: "Homes, rental units and small offices",
        text: "For an apartment move-in, confirm elevator and loading arrangements with the building. For an office, identify where assembled desks and storage should sit so access routes remain clear. Manufacturer-required anchoring needs a suitable wall and permission to fix into it. Missing hardware, damaged panels or an unsuitable anchoring location must be resolved before the item is considered ready for use.",
      },
    ],
    faqs: [
      [
        "Can you assemble several items during a move-in?",
        "Send the complete product list, quantities and delivery dates. We will review the assembly scope and building access together before confirming whether the work can be grouped into one appointment.",
      ],
    ],
  },
  "tv-mounting-installations": {
    title: "TV Mounting in North Vancouver",
    description:
      "TV mounting in North Vancouver with wall and bracket checks, viewing-height planning and surface cable organization. Request a mounting quote.",
    sections: [
      {
        heading: "Plan the screen position before drilling",
        text: "Include the TV model, bracket model, screen size and a straight-on photo of the wall. Think about seated viewing height, nearby furniture and how a moving bracket will be used. A preferred location still needs suitable support and fixings. We review the actual wall rather than assuming that every drywall, masonry or fireplace location can accept the same installation.",
      },
      {
        heading: "Permission and cable planning matter",
        text: "In a North Vancouver condo or strata building, check drilling rules and permissions before arranging work. A small workplace may also need the screen positioned around desks or customer seating. Our current scope includes surface cable organization, not changes to power outlets or concealed power wiring. Identify the existing outlet and equipment locations so a realistic mounting plan can be discussed.",
      },
    ],
    faqs: [
      [
        "Can you mount a TV in a condo or on a concrete wall?",
        "Suitability depends on the wall, TV and bracket, fixing requirements and building permissions. Share those details before booking. A site assessment may be needed, and some locations may not be suitable.",
      ],
    ],
  },
  "painting-finishing": {
    title: "Interior Painting & Finishing in North Vancouver",
    description:
      "Interior painting in North Vancouver for rooms, doors and trim. Discuss surface preparation, paint matching and rental refreshes with Saeed Contracting.",
    sections: [
      {
        heading: "Define surfaces, preparation and finish together",
        text: "A room refresh may include walls only, while another job also needs ceilings, doors, baseboards or repairs. List those surfaces separately and provide approximate dimensions and ceiling heights. Tell us about staining, flaking or earlier moisture damage before selecting paint. Painting over a visible symptom does not address an unresolved source of damage.",
      },
      {
        heading: "Work around the people using the space",
        text: "For homeowners, identify furniture that cannot be moved and rooms that must remain accessible. Rental turnover work depends on access between occupants and the agreed finish standard. Strata common areas and small businesses may have limited work windows or surfaces that need to remain in use. Preparation, protection, drying conditions and a review of the finished surfaces belong in the scope discussion.",
      },
    ],
    faqs: [
      [
        "What details help you quote interior painting?",
        "Send the rooms and surfaces to be painted, approximate sizes, ceiling heights, photographs of damage and any existing paint labels. Let us know about furniture, access and timing so preparation and painting can be considered together.",
      ],
    ],
  },
  "deck-fence-repairs": {
    title: "Deck & Fence Repair in North Vancouver",
    description:
      "Deck and fence repair in North Vancouver: damaged boards, small fence sections, gate alignment and hardware. Discuss condition, access and repair scope.",
    sections: [
      {
        heading: "Deck repairs: look beyond the top surface",
        text: "A split or soft board may be the visible part of a larger condition. Share photos of the affected boards and accessible surrounding areas, and report movement without testing an unsafe section. A small board repair is different from work involving supports, connections or a larger structure. We confirm what falls within the repair scope before proposing work.",
      },
      {
        heading: "Fence and gate repairs: identify the source of movement",
        text: "For a gate that drags or a loose fence section, photograph the hinges, latch, posts and surrounding ground where visible. Fixing a latch alone may not resolve movement elsewhere. Tell us whether the boundary is shared and who can authorize the work. For strata properties, confirm responsibility for the fence or deck before scheduling; weather and material condition also affect suitable repair timing.",
      },
    ],
    faqs: [
      [
        "Do you offer complete deck rebuilds or new fence installations?",
        "This page covers clearly scoped repairs to existing decks, fences and gates. Send the condition and extent of the problem so we can confirm whether a repair is appropriate; a larger replacement or structural project needs a separate assessment.",
      ],
    ],
  },
  "yard-exterior-work": {
    title: "Yard Cleanup & Exterior Work in North Vancouver",
    description:
      "Small yard cleanup and exterior maintenance jobs in North Vancouver. Share photos, access and disposal needs for a practical project quote.",
    sections: [
      {
        heading: "Make the cleanup boundary clear",
        text: "Photograph the areas you want included and distinguish loose leaves or debris from items that should stay. Describe the route to the yard, steps, gates and any limited working space. A small paved area with easy access is a different task from several areas on a sloped property. The quote should identify collection areas and what happens to the material afterward.",
      },
      {
        heading: "Exterior tasks for shared and occupied properties",
        text: "A homeowner may want patio furniture assembled alongside a light tidy-up; a strata representative may need an approved list for accessible common areas. Small businesses should identify customer routes that must stay open. Confirm site bins or disposal arrangements before work begins. Major landscaping, large tree work and tasks outside the agreed accessible area are not assumed to be included.",
      },
    ],
    faqs: [
      [
        "Can yard cleanup be combined with minor outdoor repairs?",
        "Include both lists and photos in your request. We can review access, materials and disposal together, then confirm which tasks fit the agreed visit and which need separate planning.",
      ],
    ],
  },
  "property-maintenance": {
    title: "Property Maintenance in North Vancouver",
    description:
      "Property maintenance in North Vancouver for strata, rentals and small businesses. Coordinate repairs, touch-ups and access in one approved work list.",
    sections: [
      {
        heading: "Turn a maintenance list into an approved scope",
        text: "For a strata council or property manager, clear authorization matters as much as the task list. Identify the person who approves work, the location of each item and any spending or documentation requirements to discuss before scheduling. Distinguish common-area repairs from work inside individual units. We confirm the agreed tasks instead of assuming a request covers an entire building.",
      },
      {
        heading: "Plan rental turnover and business access",
        text: "For a rental turnover, share the access window, repair priorities and surfaces that need touch-ups. For a small business, flag opening hours, customer access and work areas that cannot be interrupted. Photographs, product details and a contact on site help the scope discussion. Repeat visits can be discussed, but frequency, availability and reporting arrangements need agreement for the specific property.",
      },
    ],
    faqs: [
      [
        "What information should a strata council send with a maintenance request?",
        "Send an approved task list, photos, the authorized contact and the property’s access and working-hour rules. Identify common versus private areas and any documentation requirements before scheduling.",
      ],
    ],
  },
};
