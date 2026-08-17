import type { ServicesTranslations } from "@/locales/en/services";

export const services: ServicesTranslations = {
  eyebrow: "সরকারি সেবা",
  title: "সরকারি সেবা খুঁজুন",
  description:
    "আপনার প্রয়োজনীয় সরকারি সেবা খুঁজুন, প্রয়োজনীয় কাগজপত্র জানুন এবং ধাপে ধাপে প্রস্তুতি নিন।",
  sampleNote:
    "এটা শেখা ও প্রস্তুতির নমুনা তালিকা—সরকারি তালিকা নয়। কাগজের সংখ্যা ও সময় নমুনা, সরকারি হিসাব নয়।",
  hero: {
    imageAlt:
      "একজন তরুণ নাগরিক বয়স্ক পরিবারের সদস্যকে ফোনে সরকারি সেবার প্রস্তুতি দেখাচ্ছেন",
    prepareFirst: "এখানে প্রস্তুতি নিন। আবেদন করুন সরকারি পোর্টালে।",
    stats: {
      services: "{count}টি নমুনা সেবা",
      categories: "{count}টি ধরন",
    },
  },
  search: {
    placeholder: "সেবা খুঁজুন...",
    label: "সরকারি সেবা খুঁজুন",
    clear: "খোঁজ মুছুন",
  },
  filters: {
    category: "সেবার ধরন",
    citizenType: "নাগরিকের ধরন",
    organization: "মন্ত্রণালয় / প্রতিষ্ঠান",
    fee: "ফ্রি / পেইড সেবা",
    course: "কোর্স আছে",
    all: "সব",
    clear: "ফিল্টার মুছুন",
    open: "ফিল্টার",
    drawerTitle: "সেবা ফিল্টার",
    drawerDescription: "ধরন বেছে নিন, নমুনা তালিকা ছোট করুন।",
    apply: "ফলাফল দেখুন",
  },
  fee: {
    free: "ফ্রি সেবা",
    paid: "পেইড সেবা",
  },
  courseFilter: {
    yes: "কোর্স আছে",
    no: "কোর্স নেই",
  },
  categories: {
    title: "সেবার ধরন",
    description: "ঘোরার জন্য ক্যাটালগ গ্রুপ—সরকারি অংশীদারিত্ব নয়।",
    all: "সব সেবা",
    count: "{count}",
  },
  groups: {
    documents: "সনদ ও সত্যায়ন",
    licensing: "নিবন্ধন",
    education: "শিক্ষা",
    landEconomy: "ভূমি, কৃষি ও অর্থ",
    personal: "ব্যক্তিগত ও অন্যান্য",
  },
  sort: {
    label: "সাজান",
    featured: "ক্যাটালগের ক্রম",
    title: "শিরোনাম আ–য়",
    courseFirst: "কোর্স আগে",
    documents: "কম কাগজ আগে",
  },
  view: {
    grid: "কার্ড দেখুন",
    list: "তালিকা দেখুন",
  },
  results: {
    title: "নমুনা সেবা",
    count: "এই ক্যাটালগে {count}টি",
    showing: "{total}টির মধ্যে {shown}টি দেখাচ্ছে",
    emptyTitle: "কোনো সেবা মেলেনি",
    emptyDescription: "অন্য খোঁজ দিন, অথবা ফিল্টার মুছে দিন।",
    loadMore: "আরও দেখুন",
    remaining: "এই ক্যাটালগে আরও {count}টি",
  },
  card: {
    documents: "{count}টি কাগজ (নমুনা)",
    documentsLabel: "প্রয়োজনীয় কাগজ",
    processingLabel: "প্রক্রিয়ার সময়",
    feeLabel: "সরকারি ফি",
    feePaid:
      "সাধারণত সরকারি ফি লাগে। পরিমাণ সরকারি পোর্টালে নিশ্চিত করুন। (নমুনা)",
    feeFree:
      "এখানে সরকারি ফি নেই বলে দেওয়া আছে। সরকারি পোর্টালে নিশ্চিত করুন। (নমুনা)",
    courseIndicator: "প্রস্তুতি কোর্স",
    coursePrice: "সিভিক বাংলাদেশ কোর্স ৳{amount}",
    courseFree: "ফ্রি সিভিক বাংলাদেশ কোর্স",
    viewCourse: "কোর্স দেখুন",
    noCourse: "এই নমুনায় প্রস্তুতি কোর্স নেই",
    courseAvailable: "প্রস্তুতি কোর্স",
    cta: "সেবা দেখুন",
    applyOfficial: "অফিসিয়াল পোর্টালে আবেদন করুন",
  },
  categoryItems: {
    outboundAttestation: {
      title: "বিদেশগামী নাগরিকদের সার্টিফিকেট সত্যায়ন",
      shortTitle: "বিদেশগামী সত্যায়ন",
      description: "শিক্ষা ও ব্যক্তিগত সনদ সত্যায়নের কাগজ প্রস্তুত করুন।",
    },
    certificatesPermits: {
      title: "সনদ, প্রত্যয়ন, অনাপত্তি ও অনুমতি",
      shortTitle: "সনদ ও অনুমতি",
      description: "সাধারণ সনদ ও অনুমতির জন্য যা লাগে, তা জানুন।",
    },
    registrationLicence: {
      title: "নিবন্ধন ও লাইসেন্স",
      shortTitle: "নিবন্ধন ও লাইসেন্স",
      description: "ট্রেড ও অন্যান্য নিবন্ধনের আগে প্রস্তুতি নিন।",
    },
    education: {
      title: "শিক্ষা",
      shortTitle: "শিক্ষা",
      description: "বোর্ড, স্কুল ও শিক্ষার্থীর কাগজ প্রস্তুতি।",
    },
    landLease: {
      title: "ভূমি ও ইজারা",
      shortTitle: "ভূমি ও ইজারা",
      description: "নামজারি ও ভূমি অফিসের আগে যা জানা দরকার।",
    },
    financeBank: {
      title: "অর্থ ও ব্যাংক",
      shortTitle: "অর্থ ও ব্যাংক",
      description: "ব্যাংক ও অর্থ অফিসে যা চাইতে পারে।",
    },
    agricultureFertilizer: {
      title: "কৃষি ও সার",
      shortTitle: "কৃষি ও সার",
      description: "কৃষকদের কাছে যা চাওয়া হয়, তার ছোট তালিকা।",
    },
    personalApplications: {
      title: "ব্যক্তিগত আবেদন ও অনুমতি",
      shortTitle: "ব্যক্তিগত আবেদন",
      description: "জন্ম, পরিচয় ও অন্যান্য ব্যক্তিগত আবেদন।",
    },
    other: {
      title: "অন্যান্য",
      shortTitle: "অন্যান্য",
      description: "উপরের গ্রুপে না পড়লে এখান থেকে শুরু করুন।",
    },
  },
  citizenTypes: {
    general: "যেকোনো নাগরিক",
    student: "শিক্ষার্থী",
    outbound: "বিদেশগামী",
    landowner: "জমির মালিক",
    farmer: "কৃষক",
    business: "ব্যবসায়ী",
  },
  organizations: {
    attestationOffices: "সত্যায়ন অফিস (নমুনা)",
    educationOffices: "শিক্ষা অফিস (নমুনা)",
    landOffices: "ভূমি অফিস (নমুনা)",
    financeOffices: "অর্থ অফিস (নমুনা)",
    agricultureOffices: "কৃষি অফিস (নমুনা)",
    localGovOffices: "স্থানীয় সরকার অফিস (নমুনা)",
  },
  items: {
    sscAttestation: {
      title: "বিদেশগামী শিক্ষার্থীদের SSC সার্টিফিকেট সত্যায়ন — Step-by-Step",
      description:
        "বিদেশ যাওয়ার আগে এসএসসি সনদ সত্যায়নের ছোট প্রস্তুতি। এটা সরকারি আবেদন নয়।",
      processingTime: "৭–১৫ কর্মদিবস (নমুনা)",
    },
    transcriptAttestation: {
      title: "একাডেমিক ট্রান্সক্রিপ্ট সত্যায়ন — ধাপে ধাপে",
      description:
        "ট্রান্সক্রিপ্ট সত্যায়নের আগে কী জমাতে হয়। কাজটা অফিসে; এখানে প্রস্তুতি।",
      processingTime: "১০–২০ কর্মদিবস (নমুনা)",
    },
    characterCertificate: {
      title: "চারিত্রিক সনদ — কী প্রস্তুত করবেন",
      description: "স্থানীয় চারিত্রিক সনদের সাধারণ চেকলিস্ট।",
      processingTime: "৩–৭ কর্মদিবস (নমুনা)",
    },
    tradeLicence: {
      title: "ট্রেড লাইসেন্স — প্রস্তুতি কোর্স",
      description:
        "ট্রেড লাইসেন্সের আগে কাগজ ও সাধারণ ভুল। কোর্সের দাম সরকারি ফি নয়।",
      processingTime: "৭–১৪ কর্মদিবস (নমুনা)",
    },
    boardCertificate: {
      title: "বোর্ড সনদের কপি — কী নিয়ে যাবেন",
      description: "বোর্ড সনদের কপির আবেদনের আগে একটি ছোট তালিকা।",
      processingTime: "৫–১২ কর্মদিবস (নমুনা)",
    },
    landMutation: {
      title: "নামজারি — ধাপে ধাপে",
      description: "নামজারিতে যা লাগে, সহজ ভাষায়। সময়টা নমুনা।",
      processingTime: "১৫–৩০ কর্মদিবস (নমুনা)",
    },
    bankSolvency: {
      title: "ব্যাংক সলভেন্সি লেটার — যা চাইতে পারে",
      description: "সলভেন্সি লেটারের প্রস্তুতি। নিজের ব্যাংকে নিশ্চিত করুন।",
      processingTime: "৩–১০ কর্মদিবস (নমুনা)",
    },
    fertilizerSupport: {
      title: "সার সহায়তা — কী কাগজ রাখবেন",
      description: "কৃষকদের কাছে যা চাওয়া হয়, তার ছোট গাইড।",
      processingTime: "২–৫ কর্মদিবস (নমুনা)",
    },
    birthCertificate: {
      title: "জন্ম নিবন্ধন — প্রস্তুতি",
      description: "জন্ম সনদের আবেদনের আগে পরিবার কী রাখবে।",
      processingTime: "৫–১০ কর্মদিবস (নমুনা)",
    },
    generalSupport: {
      title: "সাধারণ সেবা ভিজিট — কীভাবে প্রস্তুত হবেন",
      description: "কোন কাউন্টারে যাবেন বুঝতে না পারলে এই ছোট তালিকা।",
      processingTime: "ভেদে ভিন্ন (নমুনা)",
    },
  },
};
