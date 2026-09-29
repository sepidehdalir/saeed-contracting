export const projectTemplates = [
  {
    slug: "home-repair",
    title: "Home repair story template",
    serviceSlugs: ["general-repairs", "home-maintenance"],
    summary:
      "Document a small repair or a combined handyman work list without overstating what was completed.",
    sections: [
      {
        heading: "Starting condition",
        prompt:
          "Record each door, trim, cabinet or wall issue and where it appeared. Describe only visible conditions; separate any suspected cause from an established finding.",
      },
      {
        heading: "Agreed repair",
        prompt:
          "List adjustments, parts replaced and preparation actually approved. Identify any items excluded or referred for further assessment.",
      },
      {
        heading: "Completion check",
        prompt:
          "Record the operation or finish checked with the client, the date and any remaining item. Do not describe a problem as permanently solved without evidence.",
      },
    ],
    evidence: [
      "Before and after photos of the same repair",
      "Approved task list and part details",
      "A factual completion note",
    ],
  },
  {
    slug: "property-maintenance",
    title: "Property maintenance story template",
    serviceSlugs: ["property-maintenance"],
    summary:
      "Record an approved strata, rental or small-business maintenance visit and the work actually authorized.",
    sections: [
      {
        heading: "Property and authority",
        prompt:
          "Use a broad property type and neighbourhood only with permission. Record the authorized representative privately; do not publish tenant names, unit numbers or access details.",
      },
      {
        heading: "Work list and access",
        prompt:
          "Summarize the approved tasks, working-hour constraints and how occupied areas were managed. Distinguish planned work from changes approved during the visit.",
      },
      {
        heading: "Handover",
        prompt:
          "List completed, deferred and excluded items. Describe the actual handover or report without claiming reduced costs or disruption unless that outcome was documented.",
      },
    ],
    evidence: [
      "Approved maintenance scope",
      "Permission for common-area photography",
      "Completed and deferred task record",
    ],
  },
  {
    slug: "tv-mounting",
    title: "TV mounting story template",
    serviceSlugs: ["tv-mounting-installations"],
    summary:
      "Describe an actual mounting installation using verified wall, bracket and positioning details.",
    sections: [
      {
        heading: "Installation brief",
        prompt:
          "Record the TV and bracket model, wall material if confirmed, and the agreed viewing position. Remove serial numbers and private room details from public photos.",
      },
      {
        heading: "Mounting approach",
        prompt:
          "Describe the actual fixing and bracket work completed within the agreed scope. State any surface cable organization separately; do not imply changes to power wiring.",
      },
      {
        heading: "Final review",
        prompt:
          "Document the checks performed and the final position approved. Use a real finished photo, not a stock installation presented as client work.",
      },
    ],
    evidence: [
      "TV and bracket specifications",
      "Approved wall and fixing information",
      "Before and after placement photos",
    ],
  },
  {
    slug: "furniture-assembly",
    title: "Furniture assembly story template",
    serviceSlugs: ["furniture-assembly"],
    summary:
      "Capture the products assembled, manufacturer requirements and the finished arrangement.",
    sections: [
      {
        heading: "Items and preparation",
        prompt:
          "List the manufacturer, model and quantity of items actually assembled. Describe access and workspace constraints without disclosing a home address.",
      },
      {
        heading: "Assembly scope",
        prompt:
          "Record assembly, alignment and any manufacturer-required anchoring actually completed. Identify missing parts or limitations honestly.",
      },
      {
        heading: "Ready-for-use review",
        prompt:
          "Document the checks performed and any unresolved item. Mention packaging handling only if it was included and completed.",
      },
    ],
    evidence: [
      "Product links or model details",
      "Actual assembly and anchoring notes",
      "Finished-item photographs with permission",
    ],
  },
  {
    slug: "painting",
    title: "Painting and finishing story template",
    serviceSlugs: ["painting-finishing"],
    summary:
      "Document the surfaces, preparation and finish from an actual painting project.",
    sections: [
      {
        heading: "Surface and objective",
        prompt:
          "Identify the rooms or surfaces included, their starting condition and the client’s stated objective. Do not label an entire property renovated after a partial repaint.",
      },
      {
        heading: "Preparation and materials",
        prompt:
          "Record repairs, protection, paint product, colour, sheen and coats only where documented. Explain exclusions or unresolved surface issues.",
      },
      {
        heading: "Finish and handover",
        prompt:
          "Use comparable photographs in honest lighting. Describe the completed scope and review, without inventing improved property value or customer satisfaction.",
      },
    ],
    evidence: [
      "Surface list and product details",
      "Comparable before and after images",
      "Verified finish and completion notes",
    ],
  },
  {
    slug: "deck-fence-repair",
    title: "Deck and fence repair story template",
    serviceSlugs: ["deck-fence-repairs", "yard-exterior-work"],
    summary:
      "Separate visible damage, the approved local repair and any condition outside its scope.",
    sections: [
      {
        heading: "Existing condition",
        prompt:
          "Record whether the job involved deck boards, a fence section or a gate. Describe visible damage and any confirmed findings; do not infer the condition of concealed supports.",
      },
      {
        heading: "Repair boundary",
        prompt:
          "List boards, hardware or other components actually repaired or replaced. Document additional issues and approvals separately from the original work.",
      },
      {
        heading: "Outcome and next steps",
        prompt:
          "Describe the observed result and any limitations at handover. Do not claim structural certification, a new lifespan or a warranty that was not provided.",
      },
    ],
    evidence: [
      "Photos of the affected section before work",
      "Material and hardware records",
      "Completed repair and unresolved-condition notes",
    ],
  },
] as const;

export function projectTemplateText(
  template: (typeof projectTemplates)[number],
) {
  return `# ${template.title}\n\nTEMPLATE ONLY — not a completed project. Replace prompts with verified facts before publication.\n\nProject title: [Actual work + approved neighbourhood]\nDate: [Verified completion date]\nProperty type: [Home / strata / small business]\n\n${template.sections.map((section) => `## ${section.heading}\n${section.prompt}\n\n[Verified details]`).join("\n\n")}\n\n## Evidence checklist\n${template.evidence.map((item) => `- [ ] ${item}`).join("\n")}\n- [ ] Client permission for text and photos\n- [ ] No names, precise addresses, access codes or identifying documents\n- [ ] No invented results, reviews, costs or credentials\n`;
}
