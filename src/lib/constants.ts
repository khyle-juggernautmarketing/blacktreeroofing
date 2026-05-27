export const PHONE = '208-274-5706'
export const PHONE_HREF = 'tel:+12082745706'

export const NAV_LINKS = [
  { label: 'Why Us', href: '#comparison' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#gallery' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Get Quote', href: '#contact' },
] as const

export const VALUE_PROPS = [
  'Free Inspections & Estimates',
  'Premium Warranties Included',
  'Exceptional Local Craftsmanship',
] as const

/** Black Tree Roofing advantages (comparison left column) */
export const COMPARISON_US = [
  'Licensed, Bonded & Fully Insured',
  'Free Roof Inspections & Estimates',
  'Peace of Mind Warranties Included',
  'Communicative & Clear Timelines',
  'Exceptional Craftsmanship & Top-Tier Materials',
  'Cleans Up Every Mess Before Leaving',
  'Transparent, Upfront Pricing',
  'Local Treasure Valley Crew You Can Trust',
] as const

/** Typical competitor drawbacks (comparison right column) */
export const COMPARISON_THEM = [
  'Unlicensed or Underinsured Contractors',
  'Paid Inspections & Hidden Fees',
  'No Structural or Material Coverage',
  '"We\'ll Be Back Next Week" Nonsense',
  'Subpar Materials & Cut Corners',
  'Leaves Debris & Nails in Your Yard',
  'Surprise Charges After the Job Starts',
  'Fly-by-Night Out-of-Town Roofers',
] as const

export const COMPARISON_STATS = [
  { value: '4.9★', label: 'Average Rating' },
  { value: '100+', label: 'Projects Completed' },
  { value: '5+', label: 'Years in Business' },
  { value: '100%', label: 'Licensed & Insured' },
] as const

/** Four roof photography assets only (no UGC / mixed imagery). */
export const GALLERY_IMAGES = [
  {
    src: '/roof_1.jpg',
    alt: 'Aerial view of roof replacement in progress with professional crew',
    caption: 'Expert installation',
  },
  {
    src: '/roof_2.jpeg',
    alt: 'Crew installing architectural shingles on a residential roof',
    caption: 'Full roof replacement',
  },
  {
    src: '/roof_3.jpg',
    alt: 'Aerial view of complex residential roof with architectural shingles',
    caption: 'Quality craftsmanship',
  },
  {
    src: '/hero-bg.webp',
    alt: 'Completed home with new architectural shingle roof',
    caption: 'Finished roof project',
  },
] as const

export const SERVICE_ROWS = [
  {
    title: 'Inspections & Maintenance',
    description:
      'Comprehensive evaluations to spot hidden leaks and structural issues before they become costly emergencies. Perfect for real estate or insurance claims.',
    cta: 'Schedule Free Inspection',
    image: '/roof_3.jpg',
    alt: 'Aerial view of a completed residential roof with architectural shingles',
  },
  {
    title: 'Specialized Roof Repairs',
    description:
      'Fast, reliable repairs for leaks, missing shingles, wind damage, and flashing issues. We fix it right the first time to keep your home dry.',
    cta: 'Schedule Repair',
    image: '/roof_1.jpg',
    alt: 'Professional roof repair work on a residential home',
    reverse: true,
  },
  {
    title: 'Complete Roof Replacements',
    description:
      "Upgrade your property's protection and curb appeal. We use top-tier materials and expert installation tailored to your specific budget.",
    cta: 'Get Replacement Quote',
    image: '/roof_2.jpeg',
    alt: 'Roofing crew installing new architectural shingles on a residential roof',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'George B.',
    quote:
      "Let's get real for a moment, most of us don't get excited about a new roof, until there's an issue. Black Tree Roofing made the whole process manageable. No frustration, no mess, and no 'we'll be back next week' nonsense...",
  },
  {
    name: 'Tammi S.',
    quote:
      'The team at Black Tree Roofing demonstrated exceptional expertise, taking the time to explain every step of the project... They adhered to the timeline provided, maintained a clean work environment, and were always available for communication...',
  },
] as const

export const GEO_CITIES = [
  'Nampa',
  'Middleton',
  'Parma',
  'Payette',
  'Emmett',
  'New Plymouth',
  'Letha',
  'Black Canyon',
  'Horseshoe Bend',
  'Meridian',
  'Eagle',
  'Garden City',
  'Hidden Springs',
  'Boise',
  'Star',
  'Kuna',
] as const

export const FOOTER_SERVICES = [
  'Roof Inspections',
  'Roof Repairs',
  'Roof Replacement',
  'Roof Maintenance',
] as const
