export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  heading: string;
  body: string[];
  includes: string[];
  prepare: string;
  local: string;
  faqs: [string, string][];
  related: string[];
  published: boolean;
};
const catalogue: Service[] = [
  {
    slug: "general-repairs",
    name: "General Repairs",
    short: "Thoughtful fixes for the things that need attention.",
    intro:
      "Practical home repairs in North Vancouver, with careful attention to the small details that make a space work better.",
    heading: "Get the everyday problems sorted.",
    body: [
      "A sticking door, damaged trim or a loose cabinet hinge can turn into a daily frustration. Saeed Contracting helps you work through those repairs with a clear plan, appropriate materials and a defined scope.",
      "Start with a single repair or send us a list. We assess the condition of the existing parts before recommending an adjustment, repair or replacement. If a problem points to a larger issue, we discuss it before extending the work.",
    ],
    includes: [
      "Interior door adjustments and hardware replacement",
      "Cabinet hinges, handles and minor cabinet repairs",
      "Small drywall patches and surface touch-ups",
      "Baseboard, casing and interior trim repairs",
      "Shelving adjustments and minor fixture repairs",
    ],
    prepare:
      "A close-up photo and a wider view help us see both the damage and the surrounding surface. Include any replacement parts you already have.",
    local:
      "From a condo in Lower Lonsdale to a family home in Lynn Valley, repair planning starts with the property, access and finish you want to retain.",
    faqs: [
      [
        "Can several repairs be handled in one visit?",
        "Often, yes. Send the complete list in advance so materials and time can be planned. We will confirm which items can be grouped together.",
      ],
      [
        "Should I buy replacement parts first?",
        "Please check with us before purchasing parts. Measurements, fit and the condition of the existing surface can affect the choice.",
      ],
    ],
    related: ["home-maintenance", "painting-finishing"],
    published: true,
  },
  {
    slug: "home-maintenance",
    name: "Home Maintenance",
    short: "Keep your home working well, season after season.",
    intro:
      "Home maintenance for North Vancouver homeowners who want a practical plan for everyday upkeep and seasonal jobs.",
    heading: "A little attention goes a long way.",
    body: [
      "Maintenance works best when it is planned around the way you use your home. We help identify and complete manageable upkeep tasks, from worn seals and loose hardware to the small adjustments that tend to get postponed.",
      "Tell us about your priorities and any issues you have noticed. We can agree on a one-time list or discuss repeat visits, with tasks and timing confirmed before scheduling.",
    ],
    includes: [
      "Seasonal household maintenance lists",
      "Door seals and weatherstripping replacement",
      "Accessible caulking and sealant touch-ups",
      "Hardware tightening and minor adjustments",
      "Move-in and pre-listing maintenance tasks",
    ],
    prepare:
      "Make a room-by-room list, note any recurring issues and tell us about access restrictions. Photos are useful for worn seals, gaps and damaged finishes.",
    local:
      "North Shore homes face wet seasons and changing outdoor conditions. We plan suitable exterior tasks around weather and surface condition rather than rushing a finish.",
    faqs: [
      [
        "Do you offer recurring maintenance?",
        "We can discuss a repeat schedule based on the property and the agreed tasks. Frequency and availability are confirmed directly.",
      ],
      [
        "Is this a home inspection?",
        "No. Maintenance visits address the agreed work list. They do not replace a professional home inspection or specialist assessment.",
      ],
    ],
    related: ["general-repairs", "yard-exterior-work"],
    published: true,
  },
  {
    slug: "furniture-assembly",
    name: "Furniture Assembly",
    short: "From flat-pack boxes to a room ready to use.",
    intro:
      "Furniture assembly in North Vancouver and Greater Vancouver for homes, offices and rental properties.",
    heading: "Put it together. Settle in.",
    body: [
      "New furniture should make your space easier to use. We assemble flat-pack items according to the manufacturer’s instructions, check alignment and fittings, and position the finished piece where access allows.",
      "Share the product link or model number before booking. Large wardrobes, multiple desks and wall-anchored furniture need extra planning for room size, wall construction and safe access.",
    ],
    includes: [
      "Beds, bedside tables and dressers",
      "Desks, office chairs and workstations",
      "Bookcases and freestanding storage",
      "Dining tables and seating",
      "Manufacturer-specified anti-tip anchoring where suitable",
    ],
    prepare:
      "Send product links, quantities and delivery status. Keep assembly instructions and hardware together, and clear enough floor space to work.",
    local:
      "For Vancouver and North Shore apartments, let us know about elevator bookings, loading access and packaging rules so the appointment fits the building.",
    faqs: [
      [
        "Can you assemble furniture I have already started?",
        "Yes, subject to the condition of the parts and available hardware. Send photos and tell us which steps have been completed.",
      ],
      [
        "Is packaging removal included?",
        "Packaging handling and disposal are confirmed in the quote. Let us know whether you want boxes broken down or removed.",
      ],
    ],
    related: ["tv-mounting-installations", "general-repairs"],
    published: true,
  },
  {
    slug: "tv-mounting-installations",
    name: "TV Mounting & Installations",
    short: "Secure placement. Clean lines. A considered finish.",
    intro:
      "TV mounting, shelves and wall-mounted accessories for North Vancouver homes and workplaces.",
    heading: "The right position makes the difference.",
    body: [
      "A well-placed television starts with the wall, not just the screen size. We review the wall construction, bracket compatibility and viewing position before confirming a mounting plan.",
      "We also install shelves, mirrors, curtain rods and other suitable wall-mounted items. Fixings and weight limits are assessed for the actual surface; some walls or locations may need a different approach.",
    ],
    includes: [
      "TV mounting with a compatible customer-supplied bracket",
      "Viewing-height and bracket-position planning",
      "Surface cable organisation",
      "Shelves, curtain rods and wall accessories",
      "Mirrors and artwork with suitable fixings",
    ],
    prepare:
      "Send the TV model, bracket details, approximate weight and a photo of the wall. Note whether the wall is drywall, concrete, brick or another material.",
    local:
      "Condo and strata installations may require approval before drilling. Please check your building’s rules and let us know about any restrictions before scheduling.",
    faqs: [
      [
        "Can you hide the TV cables?",
        "We can discuss surface cable covers and tidy routing. The current service does not include new outlets, power wiring or routing power cords inside walls.",
      ],
      [
        "Do you supply the TV bracket?",
        "A compatible customer-supplied bracket is the usual starting point. Share the model before purchasing so fit and mounting requirements can be reviewed.",
      ],
    ],
    related: ["furniture-assembly", "general-repairs"],
    published: true,
  },
  {
    slug: "painting-finishing",
    name: "Painting & Finishing",
    short: "Careful preparation. Crisp edges. A fresh finish.",
    intro:
      "Painting and finishing for rooms, trim and smaller refresh projects across North Vancouver and Greater Vancouver.",
    heading: "Good finishes begin beneath the surface.",
    body: [
      "The quality of a painted surface depends on preparation. We discuss the existing finish, repairs, protection and paint choice before starting, so the scope covers more than the final coat.",
      "Whether you are refreshing a room, touching up trim or preparing a rental between occupants, we plan the work around access, drying time and how the space needs to be used.",
    ],
    includes: [
      "Interior wall and ceiling painting by agreed scope",
      "Baseboard, door and trim painting",
      "Small surface repairs and preparation",
      "Touch-ups and room refreshes",
      "Suitable exterior finish touch-ups, weather permitting",
    ],
    prepare:
      "Tell us which rooms and surfaces are included, approximate dimensions, ceiling height and your colour preferences. Flag peeling paint, staining or previous moisture damage.",
    local:
      "In occupied North Shore homes and strata units, clear access and agreed work hours help limit disruption. Exterior finishing is scheduled only when conditions suit the product.",
    faqs: [
      [
        "Can you match existing paint?",
        "An original paint label or sample helps. Age and sheen can make isolated touch-ups visible, so repainting a complete surface may give a more consistent result.",
      ],
      [
        "Do I need to move the furniture?",
        "We will agree on preparation and protection before the visit. Let us know about heavy pieces or rooms that cannot be cleared.",
      ],
    ],
    related: ["general-repairs", "property-maintenance"],
    published: true,
  },
  {
    slug: "deck-fence-repairs",
    name: "Deck & Fence Repairs",
    short: "Practical repairs for the spaces outside your door.",
    intro:
      "Deck and fence repair enquiries for North Vancouver and Greater Vancouver, from worn boards to gates that no longer close properly.",
    heading: "Give outdoor details the attention they need.",
    body: [
      "Weathered timber, loose boards and misaligned gates need a closer look before choosing a repair. We assess the affected area and discuss whether a local repair is appropriate or more extensive work should be considered.",
      "Our focus is clearly scoped repair work. Conditions beneath a damaged surface can change the plan, so hidden deterioration is discussed before additional work proceeds.",
    ],
    includes: [
      "Replacement of individual deck or fence boards",
      "Minor fence panel repairs",
      "Gate alignment and latch replacement",
      "Accessible fastening and hardware repairs",
      "Preparation and suitable protective finish touch-ups",
    ],
    prepare:
      "Include photos of both sides of the damaged area, approximate dimensions and any movement or softness you have noticed. Keep unsafe areas out of use until assessed.",
    local:
      "Rain and shade can affect exposed timber on the North Shore. We consider material condition, drainage around the work and suitable weather when planning repairs.",
    faqs: [
      [
        "Can a damaged section be repaired without replacing everything?",
        "Sometimes. The condition of surrounding boards, posts and supports determines whether a local repair makes sense. Photos help, but an on-site assessment may be needed.",
      ],
      [
        "Can you quote from photographs?",
        "Photos can support an initial discussion. Final scope may require a site visit, especially where deterioration or concealed supports are involved.",
      ],
    ],
    related: ["yard-exterior-work", "painting-finishing"],
    published: true,
  },
  {
    slug: "yard-exterior-work",
    name: "Yard & Exterior Work",
    short: "A tidier exterior, ready for everyday living.",
    intro:
      "Manageable yard and exterior jobs for homes and properties in North Vancouver and the surrounding communities.",
    heading: "Make the outside easier to enjoy.",
    body: [
      "Outdoor upkeep can accumulate quickly. We help with clearly defined yard cleanups, small outdoor assembly tasks and exterior maintenance jobs that keep everyday spaces usable.",
      "Share your priorities, access details and photos of the area. We confirm the materials, equipment and disposal requirements before agreeing on the work.",
    ],
    includes: [
      "Seasonal yard tidying and light cleanup",
      "Planter and garden furniture assembly",
      "Small exterior hardware and accessory installations",
      "Leaf and loose debris collection in accessible areas",
      "Outdoor maintenance lists and minor repairs",
    ],
    prepare:
      "Let us know about steps, side gates, parking, pets and green-waste arrangements. Include measurements for any items you want assembled or installed.",
    local:
      "Sloped lots and narrow side access are important planning details for North Vancouver properties. We confirm what can be reached safely with the equipment suited to the job.",
    faqs: [
      [
        "Is green-waste disposal included?",
        "Collection and disposal arrangements are agreed in the quote. Tell us whether suitable bins or a collection area are available on site.",
      ],
      [
        "Do you undertake major landscaping or tree removal?",
        "The current scope is smaller yard and exterior maintenance work. Send the details and we will confirm suitability before arranging a visit.",
      ],
    ],
    related: ["deck-fence-repairs", "home-maintenance"],
    published: true,
  },
  {
    slug: "property-maintenance",
    name: "Property Maintenance",
    short: "Practical support for the properties you look after.",
    intro:
      "Property maintenance for homeowners, strata councils, landlords and businesses in North Vancouver and Greater Vancouver.",
    heading: "One clear list. A coordinated visit.",
    body: [
      "Looking after a property often means coordinating several smaller jobs. We help consolidate repair and maintenance lists into an agreed scope, with access, work hours and priorities established in advance.",
      "From rental turnover touch-ups to common-area repairs, we work from the tasks authorised by the owner or property representative. Additional findings are raised for review before expanding the scope.",
    ],
    includes: [
      "Rental turnover repair and touch-up lists",
      "Strata common-area maintenance by approval",
      "Small commercial repair and upkeep tasks",
      "Door, trim and hardware maintenance",
      "Coordinated visits for multiple agreed tasks",
    ],
    prepare:
      "Send the work list, property type and authorised contact. Note tenant access, elevator bookings, permitted working hours and any documentation needed before work begins.",
    local:
      "Shared buildings across Greater Vancouver have different access and approval processes. We plan around your strata or property-management requirements rather than assuming access.",
    faqs: [
      [
        "Can you work directly with a property manager?",
        "Yes. Please identify who can approve the scope, arrange access and receive updates, so instructions remain clear.",
      ],
      [
        "Can you provide a maintenance schedule?",
        "We can discuss repeat visits for an agreed list of tasks. The schedule, reporting needs and availability are confirmed for each property.",
      ],
    ],
    related: ["general-repairs", "painting-finishing"],
    published: true,
  },
];
export const services = catalogue.filter((service) => service.published);
export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
// Future regulated services live outside the public catalogue until approved and fully authored.
export const futureServiceFlags = { electricalServices: false } as const;
