export const siteContent = {
  brandName: "Lattice",
  logo: {
    href: "/",
    ariaLabel: "Lattice home",
    mark: "L",
  },
  navItems: [
    { id: "about", label: "About", href: "/about" },
  ],
  socialLinks: [
    { label: "Email", href: "mailto:hq@latticepq.com" },
    { label: "Valar Group", href: "https://github.com/valargroup" },
    { label: "Osmosis", href: "https://github.com/osmosis-labs" },
  ],
  footer: {
    wordmark: "lattice",
    copyright: "© Lattice LLC 2026",
    resourceLinks: [],
  },
};

export const pages = {
  home: {
    id: "home",
    path: "/",
    documentTitle: "Lattice",
    title: "Lattice",
    layout: {
      showFourthStem: false,
      showTitleStem: false,
      bodyWidth: "standard",
      skipIntro: true,
      hideFooter: true,
      hideBackdrop: true,
    },
    // Hero composition for the landing: a single-viewport frontispiece —
    // positioning sentence at display scale, colophon below. No backdrop
    // plate or margin cards (unlike the Valar landing this derives from).
    hero: {
      // Kept to ~11em (like the Valar headline before it): the desktop
      // CSS renders .home-hero-positioning on one nowrap line tuned to
      // that width; a materially longer string overflows the column.
      positioning: "Blockchains, built to scale.",
      colophonLead: "Lattice LLC",
      colophon:
        " is the protocol engineering practice of Roman Akhtariev - building core infrastructure across Zcash and Cosmos.",
    },
  },
  about: {
    id: "about",
    path: "/about",
    documentTitle: "About | Lattice",
    title: "Core infrastructure for production blockchain networks",
    intro:
      "Lattice is a protocol engineering practice led by Roman Akhtariev, working across the Cosmos and Zcash ecosystems. In collaboration with Valar Group, Lattice engineers build and scale core blockchain infrastructure — consensus, storage, wallets, and governance.",
    layout: {
      showFourthStem: true,
      bodyWidth: "standard",
    },
    // Roster — equal structural treatment for each member (numeral, name,
    // title, bio, X + GitHub links). Roman leads the list: the practice is
    // built around his engineering record.
    members: [
      {
        numeral: "01",
        name: "Roman Akhtariev",
        title: "Principal Blockchain Engineer",
        handle: "@akhtariev",
        x: "https://x.com/akhtariev",
        github: "https://github.com/p0mvn",
        bio: "Former Principal Engineer at Osmosis, the Cosmos DEX that has processed tens of billions of dollars in volume. He fixed core scaling bottlenecks for all of Cosmos — starting in his first week with the merkelized database quietly choking every chain built on the Cosmos SDK. With Valar Group he built Zcash Token Holder Voting, demonstrated how fast wallets can sync, and removed the CPU bottleneck of Zakura sync. Roman finds the problem everyone else is living with and eliminates it.",
      },
      {
        numeral: "02",
        name: "Adam Tucker",
        title: "Manager",
        handle: "@czarcas7ic",
        x: "https://x.com/czarcas7ic",
        github: "https://github.com/czarcas7ic",
        bio: "West Point graduate. Former US Army Infantry and Armor Officer, Executive Officer of a Tank Company responsible for 65 soldiers and $50M in equipment. Then Senior Engineer at Osmosis, shipping production code across the protocol. At Lattice he manages operations and delivery.",
      },
    ],
    contact: {
      label: "Contact",
      email: "hq@latticepq.com",
    },
  },
};
