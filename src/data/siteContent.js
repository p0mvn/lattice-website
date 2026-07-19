export const siteContent = {
  brandName: "Lattice",
  logo: {
    href: "/",
    ariaLabel: "Lattice home",
    mark: "L",
  },
  navItems: [
    { id: "about", label: "About", href: "/about" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "publications", label: "Publications", href: "/publications" },
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
      colophon: " is a specialized blockchain protocol engineering practice advancing core infrastructure across the Zcash and Cosmos ecosystems.",
    },
  },
  about: {
    id: "about",
    path: "/about",
    documentTitle: "About | Lattice",
    title: "Core infrastructure for production blockchain networks",
    intro:
      "Lattice is a protocol engineering practice led by Roman Akhtariev, working across the Cosmos and Zcash ecosystems. Key contributor to Valar Group, Lattice builds and scales core blockchain infrastructure — consensus, storage, wallets, and governance.",
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
  projects: {
    id: "projects",
    path: "/projects",
    documentTitle: "Projects | Lattice",
    title: "Selected projects",
    layout: {
      showFourthStem: true,
      bodyWidth: "standard",
    },
    // Each project renders like an About roster row: name + dates in the
    // left meta column, context + roles + evidence bullets on the right.
    // "(reference)" markers are placeholders for citation links.
    items: [
      {
        name: "Valar Group",
        dates: "2026 – Present",
        context: "Research and engineering lab developing the Zcash protocol.",
        links: [
          { text: "Zcash protocol", href: "https://valargroup.dev" },
        ],
        roles: [
          {
            bullets: [
              {
                lead: "Leading applied research on Private Information Retrieval (PIR)",
                body: " — replacing per-transaction trial decryption in wallet sync with targeted retrieval. Targets an order-of-magnitude faster sync, with no weakening of cryptographic guarantees.",
              },
              {
                lead: "Designed and implemented token-holder voting",
                body: " — private, verifiable on-chain governance for Zcash, combining distributed key generation, threshold encryption, and zero-knowledge circuits in a production system.",
              },
              {
                lead: "Implemented high-performance node software for encrypted blockchain systems",
                body: " — as Principal Engineer on the Zakura core team: removed the CPU bottleneck of Zakura sync (nearly 5× faster chain sync than other Zcash full nodes) and contributed to a redesigned peer-to-peer networking stack.",
                links: [
                  { text: "Principal Engineer", href: "https://zakura.com/about/" },
                  { text: "Zakura sync", href: "https://zakura.com/" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Osmosis",
        dates: "2022 – Present",
        context:
          "Osmosis is the largest DEX in the Cosmos ecosystem with $43B+ lifetime trading volume, $2B+ peak market cap, and connections to 100+ blockchains. Funded by a $21M token sale led by Paradigm.",
        roles: [
          {
            title: "Core Protocol Engineering",
            dates: "January 2022 – Present",
            bullets: [
              {
                lead: "The top code contributors",
                body: " by commits to the core protocol repository.",
              },
              {
                lead: "Invented and maintained SQS Router",
                leadHref: "https://github.com/osmosis-labs/sqs",
                body: " — swap routing infrastructure powering $5B+ in trading volume across Osmosis frontend, Mars Protocol liquidations, and Skip Protocol integrations (used by Keplr, MetaMask).",
                links: [
                  { text: "Osmosis frontend", href: "https://app.osmosis.zone" },
                  { text: "Mars Protocol liquidations", href: "https://osmosis.marsprotocol.io/" },
                ],
              },
              {
                lead: "Core developer of Concentrated Liquidity",
                leadHref: "https://github.com/osmosis-labs/osmosis/tree/main/x/concentrated-liquidity",
                body: " — first implementation in the Cosmos ecosystem, delivering 200-300x capital efficiency improvement; protected by a 2-year business license due to novelty.",
              },
              {
                lead: "IAVL Fast Storage optimization",
                body: " — achieved 5-30x query performance improvements and reduced daily network downtime from ~15 minutes to under 2 minutes; contribution merged into IAVL release adopted by 100+ Cosmos blockchains.",
                links: [
                  { text: "merged", href: "https://github.com/cosmos/iavl/pull/468" },
                  { text: "IAVL release", href: "https://github.com/cosmos/iavl/releases/tag/v0.19.0" },
                ],
              },
              {
                lead: "Security response team member for Dragonberry vulnerability",
                leadHref: "https://blog.asymmetric.re/cosmos-ibc-reentrancy-infinite-mint/",
                body: " — co-developed and distributed a patch within 24 hours for a critical IBC vulnerability that threatened billions in cross-chain assets, credited in Cosmos security advisory.",
                links: [
                  { text: "Cosmos security advisory", href: "https://forum.cosmos.network/t/cosmos-sdk-ibc-vulnerability-retrospective-security-advisories-dragonberry-and-elderflower-october-2022/8735" },
                ],
              },
              {
                lead: "Terra Luna emergency response",
                body: " — served as code reviewer and upgrade coordinator during emergency upgrade that unlocked user funds during the $40B+ collapse.",
              },
            ],
          },
          {
            title: "Cosmos SDK & IAVL Maintainers",
            dates: "January 2022 – December 2024",
            context:
                "Cosmos is a decentralized network of independent parallel blockchains, each powered by BFT consensus algorithms. Over 100 Cosmos blockchains have a combined market cap of US$108B, of which US$32B is interconnected by the IBC protocol (reference). Osmosis is built on top of Cosmos SDK, a toolkit maintained by a separate entity. Many other blockchains depend on Cosmos SDK. We contributed code to the Cosmos repositories.",
              lead: "Concurrent ecosystem contributions to core infrastructure powering 100+ blockchains with a combined market cap exceeding $100B:",
            bullets: [
              {
                lead: "Maintainers and code reviewers of IAVL repository",
                body: " — sole approvers on critical pull requests securing billions in value.",
              },
              {
                lead: "Cosmos SDK reviewer",
                body: " with maintainer permissions — identified and fixed economic incentives bug that closed a spam attack vector; contributed snapshot/pruning abstractions, reducing operational overhead for 5,000+ validators.",
              },
              {
                lead: "Architecture contributors",
                body: " — authored design proposals and shepherded implementation through to ecosystem-wide adoption.",
              },
            ],
          },
        ],
      },
      {
        name: "Polaris",
        dates: "2024–2026",
        context:
          "Cross-chain token portal enabling swaps across Ethereum, Solana, Cosmos, and Bitcoin ecosystems. Featured in CoinDesk.",
        links: [
          { text: "Cross-chain token portal", href: "https://beta.polaris.app" },
          { text: "Featured in CoinDesk", href: "https://cryptonews.net/news/market/29764696/" },
        ],
        roles: [
          {
            bullets: [
              {
                lead: "Architected novel Multi-Party Computation (MPC) wallet",
                body: " for privacy-focused cross-chain transactions; launch announcement gathered 25,000+ views. The design was highlighted by many prominent developers and entrepreneurs.",
                links: [
                  {
                    text: "prominent developers and entrepreneurs",
                    href: "https://x.com/davidlsneider/status/1947048473729384507?s=20",
                  },
                ],
              },
              {
                lead: "Built revenue architecture",
                body: " enabling swap fees — achieved volume nearing $1M monthly and stable 300-400 daily active users while in beta.",
              },
              {
                lead: "Designed and shipped Hyperliquid integration",
                body: ", enabling cross-chain fund flows.",
                links: [
                  { text: "Hyperliquid integration", href: "https://x.com/Polaris_App/status/1930597241305358503" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  publications: {
    id: "publications",
    path: "/publications",
    documentTitle: "Publications & Speaking | Lattice",
    title: "Publications and speaking",
    layout: {
      showFourthStem: true,
      bodyWidth: "standard",
    },
    // Entries: date (YYYY.MM.DD for sorting + rendering), venue, title,
    // description, optional href (row title link), optional extra links
    // [{ label, href }] rendered under the description.
    sections: [
      {
        eyebrow: "Publications",
        items: [
          {
            date: "2026.04.14",
            venue: "X",
            title: "Spend Now, Sync Never",
            description:
              "Demo of addressing wallet sync scalability with Private Information Retrieval (PIR).",
            href: "https://x.com/akhtariev/status/2044113751767691637",
          },
          {
            date: "2026.03.06",
            venue: "X",
            title: "Why encryption alone will not protect your vote",
            description:
              "Trade-offs in a privacy-preserving token holder voting system.",
            href: "https://x.com/akhtariev/status/2029990470177460237",
          },
          {
            date: "2026.01.20",
            venue: "akhtariev.ca",
            title: "The GPU Case in Private Information Retrieval (PIR)",
            description:
              "Exploring how GPUs can accelerate private information retrieval (PIR) by leveraging embarrassingly parallel matrix-vector multiplication, achieving 13-174x speedups over CPU implementations.",
            href: "https://www.akhtariev.ca/blog/pir-gpu-acceleration",
          },
          {
            date: "2024.01.16",
            venue: "Fault Tolerant",
            title: "The Cosmos Security Handbook",
            description:
              "Co-authored with Alpin Yukseloglu. Security guide for Cosmos chain developers, incorporated into the official Cosmos SDK documentation with named credit; 28,000+ views on announcement.",
            href: "https://www.faulttolerant.xyz/2024-01-16-cosmos-security-1/",
          },
        ],
      },
      {
        eyebrow: "Speaking",
        items: [
          {
            date: "2025.11.01",
            venue: "Sovereign Day · Buenos Aires",
            title: "Privacy and Confidentiality Fireside Chat",
            description: "Invited fireside on confidentiality in blockchain systems.",
            links: [
              { label: "Announcement", href: "https://x.com/cosmos/status/1989513708104819078" },
              { label: "Recording", href: "https://www.youtube.com/live/cjeb89EYhNQ?t=11049s" },
              { label: "Recap", href: "https://x.com/osmosis/status/1991169279341818109" },
            ],
          },
          {
            date: "2025.05.01",
            venue: "UCSB FifTech Blockchain Summit",
            title: "Liquidity Wars: From Battle to Peace",
            description: "Invited talk on liquidity dynamics across decentralized exchanges.",
            links: [
              { label: "Agenda", href: "https://ucsbblockchainsummit2025.com/" },
              { label: "Recording", href: "https://www.youtube.com/watch?v=mkGBKZ-74so" },
            ],
          },
          {
            date: "2024.11.01",
            venue: "X Spaces",
            title: "Live Engineering Retrospective",
            description: "Live engineering retrospective on the Polaris launch.",
            links: [
              { label: "Recording", href: "https://x.com/osmosis/status/1852331402928513053" },
            ],
          },
          {
            date: "2024.07.01",
            venue: "DevMos NYC",
            title: "Footguns in the Cosmos SDK",
            description: "Security presentation on common Cosmos SDK pitfalls.",
            links: [
              { label: "Announcement", href: "https://x.com/osmosis/status/1796527720580719050" },
              { label: "Recording", href: "https://www.youtube.com/watch?v=Zx64cWMSU4A" },
              { label: "Agenda", href: "https://luma.com/b3zkadey" },
            ],
          },
        ],
      },
    ],
  },
};
