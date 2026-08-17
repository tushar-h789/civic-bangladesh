import type { DashboardServicesTranslations } from "@/locales/en/dashboard-services";

export const dashboardServices: DashboardServicesTranslations = {
  eyebrow: "আমার সেবা",
  title: "সেবা শেখার ট্র্যাকার",
  description:
    "সিভিক বাংলাদেশে যে সরকারি সেবা নিয়ে শিখছেন, তা রাখুন। এই পাতা প্রস্তুতি দেখায় — সরকারি আবেদন নয়।",
  sampleNote:
    "একজন শিক্ষার্থীর নমুনা ট্র্যাকার। সেভ, দেখা ও কোর্সের অগ্রগতি ডেমো — লাইভ অ্যাকাউন্ট নয়।",
  jump: {
    label: "এই পাতায়",
    saved: "সেভ করা সেবা",
    recent: "সম্প্রতি দেখা",
    enrolled: "ভর্তি কোর্স",
    preparation: "প্রস্তুতির অবস্থা",
    certificates: "সম্পর্কিত সনদ",
  },
  distinction: {
    learningTitle: "শেখার অবস্থা",
    learningBody:
      "সিভিক বাংলাদেশে আপনি কতদূর প্রস্তুত: সেভ, শিখছেন, আবেদনের জন্য প্রস্তুত, বা কোর্স শেষ। এটি আমাদের নমুনা শেখার রেকর্ড।",
    officialTitle: "অফিসিয়াল আবেদনের অবস্থা",
    officialBody:
      "সিভিক বাংলাদেশ সরকারি আবেদনের এপিআইয়ের সাথে যুক্ত নয়। আপনি আবেদন করেছেন কি না, ফি দিয়েছেন কি না, ফল পেয়েছেন কি না — তা আমরা দেখাতে পারি না। অফিসিয়াল পোর্টালে নিশ্চিত করুন।",
    officialLabel: "সংযুক্ত নয়",
    officialHint:
      "কোনো সরকারি এপিআই সংযুক্ত নেই। এটি আবেদন ট্র্যাকার নয়।",
  },
  status: {
    label: "শেখার অবস্থা",
    officialLabel: "অফিসিয়াল আবেদনের অবস্থা",
    saved: "সেভ",
    learning: "শিখছেন",
    readyToApply: "আবেদনের জন্য প্রস্তুত",
    completedCourse: "কোর্স শেষ",
    notConnected: "সংযুক্ত নয়",
  },
  stats: {
    saved: "{count}টি সেভ",
    learning: "{count}টি শিখছেন",
    ready: "{count}টি আবেদনের জন্য প্রস্তুত",
  },
  saved: {
    title: "সেভ করা সেবা",
    description:
      "পরে দেখার জন্য রাখা সেবা। এখানে সেভ করলে সরকারি আবেদন শুরু হয় না।",
    emptyTitle: "এই নমুনায় সেভ করা সেবা নেই",
    emptyDescription:
      "সেবা পাতা খুলে রাখলে এখানে দেখা যেতে পারে।",
    view: "সেবা দেখুন",
  },
  recent: {
    title: "সম্প্রতি দেখা",
    description: "এই নমুনা যাত্রায় খোলা সেবা। তারিখ ডেমো ফিল্ড।",
    viewedOn: "{date} দেখা (নমুনা)",
    emptyTitle: "সম্প্রতি দেখা সেবা নেই",
    emptyDescription: "যে সেবা খুলবেন, নমুনা ইতিহাসে এখানে আসতে পারে।",
  },
  enrolled: {
    title: "ভর্তি সেবা কোর্স",
    description:
      "সরকারি সেবার সাথে যুক্ত সিভিক বাংলাদেশ কোর্স। অগ্রগতি আমাদের — সরকারি ভর্তি নয়।",
    lessons: "{total}টির মধ্যে {completed}টি পাঠ",
    continue: "চালিয়ে যান",
    review: "আবার দেখুন",
    emptyTitle: "কোনো সেবা কোর্সে ভর্তি নেই",
    emptyDescription: "সেবা পাতা থেকে প্রস্তুতি কোর্স শুরু করুন।",
  },
  preparation: {
    title: "আবেদন প্রস্তুতির অবস্থা",
    description:
      "সিভিক বাংলাদেশের শেখার অবস্থা, পাশে অফিসিয়াল আবেদনের অবস্থা। এখানে শুধু শেখার কলাম বদলাতে পারে।",
    service: "সেবা",
    course: "সম্পর্কিত কোর্স",
    apply: "অফিসিয়াল পোর্টালে আবেদন করুন",
    learn: "শেখা চালিয়ে যান",
    emptyTitle: "এই ট্র্যাকারে সেবা নেই",
    emptyDescription: "সেবা সেভ করুন বা কোর্স শুরু করুন।",
  },
  certificates: {
    title: "সম্পর্কিত সনদ",
    description:
      "এই ট্র্যাকারের সেবার জন্য সিভিক বাংলাদেশের শেখার সনদ। সরকারি সনদ নয়।",
    civicCourse: "সিভিক শিক্ষার কোর্স",
    view: "সনদ দেখুন",
    viewAll: "সব সনদ",
    emptyTitle: "এই নমুনায় সম্পর্কিত সনদ নেই",
    emptyDescription:
      "শেখার সনদ আছে এমন সেবা কোর্স শেষ করুন।",
  },
  cta: {
    browse: "সেবা দেখুন",
  },
};
