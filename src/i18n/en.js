// English copy. Keep the same keys in every language file (src/i18n/*.js).
export default {
  lang: 'en',
  locale: 'en_GB',
  path: '/',
  label: 'English',
  meta: {
    title: 'Impoluto: House Cleaning & Chores, shared fairly',
    description:
      'Impoluto turns your home into a 3D map with every cleaning task in its place, and shares the chores fairly among everyone who lives there.',
    ogAlt: 'Impoluto: your home as a 3D map with the chores that are due',
  },
  skip: 'Skip to content',
  nav: { how: 'How it works', features: 'Features', faq: 'FAQ', cta: 'Open the app', menu: 'Menu' },
  langSuggest: { text: '¿Prefieres leer esta página en español?', link: 'Ver en español', close: 'Close' },
  hero: {
    eyebrow: 'House cleaning & chores',
    title: 'A spotless home,<br>without the arguments.',
    lead:
      'Impoluto turns your home into a 3D map with every cleaning task in its place, and shares the chores fairly among everyone who lives there.',
    cta: 'Create your home',
    ctaNote: 'Free while in early access',
    secondary: 'See how it works',
    platforms: 'Web app today. Android and iPhone apps coming soon.',
    shotDesktop: 'The 3D map of a home in Impoluto, with a dot on each thing that needs cleaning',
    shotPhone: 'The Today screen: the chores that are yours, with the room and the minutes each one takes',
  },
  facts: [
    { n: '45', t: 'pieces of furniture, each with its own chores' },
    { n: '75', t: 'tasks set up for you in a typical three-bedroom flat' },
    { n: '4 weeks', t: 'of history behind every fair assignment' },
  ],
  how: {
    kicker: 'How it works',
    title: 'From floor plan to fair rota in four steps',
    steps: [
      {
        t: 'Draw your home',
        d: 'Upload the floor plan from the estate agent’s listing and Impoluto reads the rooms, walls, doors and windows. No plan? Pick a layout by size, bedrooms and bathrooms, or draw it from scratch.',
      },
      {
        t: 'Add what you have',
        d: 'Choose from a catalogue of furniture and appliances, with colours and finishes. Or tap “Furnish automatically” and adjust from there.',
      },
      {
        t: 'The chores appear on their own',
        d: 'Each item brings its tasks: the fridge, the oven, the extractor hood, the windows. Every room adds its own, scaled to its size.',
      },
      {
        t: 'Invite your household',
        d: 'Send invitations by email. Impoluto shares out what is due, rotating the tasks so nobody gets stuck with the same ones.',
      },
    ],
  },
  features: {
    kicker: 'Features',
    title: 'Everything in its place, including the chores',
    rows: [
      {
        t: 'See what’s left at a glance',
        d: 'Your home in 3D with a dot on every thing that needs doing: red if it’s overdue, orange if it’s for today, blue if it’s coming up. Tap a dot and mark it done.',
        points: ['Show only what’s yours', 'Works on a phone or a big screen'],
        img: 'map-phone',
        alt: 'The 3D map on a phone, with coloured dots for overdue, today and upcoming tasks',
        kind: 'phone',
      },
      {
        t: 'Every item brings its own chores',
        d: 'Put a fridge in the kitchen and “clean the inside, every month” appears. Add a window and the glass gets cleaned. You decide what you actually do, how often and how long it takes.',
        points: ['Switch off what you don’t do', 'Change how often and how many minutes', 'Add chores of your own'],
        img: 'furniture-3d',
        alt: 'The furniture editor in 3D next to a catalogue showing how many tasks each item brings',
        kind: 'desktop',
      },
      {
        t: 'Fair by the minute, not by turns',
        d: 'Taking out the bin is not the same as cleaning the oven. Each chore that comes up goes to whoever has done the fewest minutes in the last four weeks, and never to the same person twice in a row.',
        points: ['Someone does half? Set their share to 50%', 'A bedroom’s chores can go to whoever sleeps there', 'Everyone sees how the work is shared'],
        img: 'fair-phone',
        alt: 'The share of the last four weeks: three people with almost the same minutes',
        kind: 'phone',
      },
      {
        t: 'Your floor plan, in 3D in minutes',
        d: 'Impoluto reads the plan in the app, without AI, and works out the scale from the floor area. Then you fix anything in the 2D editor: move corners, split rooms, add doors and windows, choose floors and wall colours.',
        points: ['Upload a plan, start from a template or draw it', 'Switch between 2D and 3D at any time'],
        img: 'plan-editor',
        alt: 'The floor plan editor with the rooms of a flat and their size in square metres',
        kind: 'desktop',
      },
    ],
  },
  more: {
    title: 'And for everything else',
    items: [
      { icon: 'megaphone', t: 'One-off jobs', d: 'A spill, a bulb, a blocked sink: report it and it goes to whoever has the least on their plate.' },
      { icon: 'list', t: 'Cleaner’s visit', d: 'Tell it how long the cleaner stays and get the list of what’s most overdue, ready to hand over.' },
      { icon: 'mail', t: 'Invitations by email', d: 'Whoever sets up the home invites the others and decides who else can manage it.' },
      { icon: 'device', t: 'Try it without an account', d: 'Your home is saved on your device. Create an account when you want to share it.' },
    ],
  },
  roadmap: {
    kicker: 'Coming next',
    title: 'What we’re working on',
    items: [
      { icon: 'phone', t: 'Android and iPhone apps', d: 'The same app, in the stores.' },
      { icon: 'bell', t: 'Reminders', d: 'A nudge on your phone when something is yours.' },
      { icon: 'layers', t: 'Homes with several floors', d: 'Duplexes and houses, floor by floor.' },
      { icon: 'camera', t: 'Furnish from photos', d: 'Take a few photos of each room and get it furnished for you. Part of a future paid plan.' },
    ],
  },
  faq: {
    kicker: 'FAQ',
    title: 'Questions',
    items: [
      { q: 'How much does it cost?', a: 'Impoluto is free while in early access. Some extras, like furnishing your home from photos, will be part of a paid plan later on.' },
      { q: 'Do I need a floor plan?', a: 'No. You can pick a layout by size, bedrooms and bathrooms, or draw your home from scratch. If you do have a plan, an image from the estate agent’s listing is enough.' },
      { q: 'Do I have to place every piece of furniture?', a: 'No. “Furnish automatically” puts the usual things in each room according to its type and size. Then you move, rotate or remove whatever you like.' },
      { q: 'How does Impoluto decide who does what?', a: 'It counts the minutes each person has done in the last four weeks, plus what they already have assigned, divided by their share of the work. The next chore goes to whoever has the fewest, and never to the same person twice in a row.' },
      { q: 'Who is it for?', a: 'Anyone who shares a home: couples, families and flatmates. One person sets up the home and invites the others.' },
      { q: 'Which devices does it work on?', a: 'It works in the browser on any computer or phone today. The Android and iPhone apps are on their way.' },
    ],
  },
  final: {
    title: 'Give every chore its place.',
    lead: 'Set up your home in a few minutes and let Impoluto share out the rest.',
    cta: 'Create your home',
  },
  footer: {
    tagline: 'House cleaning & chores, shared fairly.',
    language: 'Language',
    rights: 'Impoluto',
  },
};
