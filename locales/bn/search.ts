import type { SearchTranslations } from "@/locales/en/search";

export const search: SearchTranslations = {
  placeholder: "সেবা, কোর্স ও বিষয় খুঁজুন...",
  description: "সরকারি সেবা, বিভাগ, কোর্স ও সিভিক বিষয় খুঁজুন।",
  idle: {
    title: "সিভিক বাংলাদেশে খুঁজুন",
    description: "সরকারি সেবা, বিভাগ, কোর্স বা সিভিক বিষয় খুঁজুন।",
    hint: "এসএসসি, সত্যায়ন, বা সড়ক নিরাপত্তা লিখে দেখুন।",
  },
  noResults: {
    title: "কোনো মিল পাওয়া যায়নি",
    description: "অন্য শব্দ দিয়ে খুঁজুন, অথবা নমুনা সেবা ও কোর্স দেখুন।",
    browseServices: "সেবা দেখুন",
    browseCourses: "কোর্স দেখুন",
  },
  groups: {
    services: "সরকারি সেবা",
    categories: "বিভাগ",
    courses: "কোর্স",
    topics: "সিভিক বিষয়",
  },
  service: {
    course: "কোর্স",
    noCourse: "এই নমুনায় এখনো কোর্স নেই",
    price: "৳{amount}",
    free: "ফ্রি",
    certificate: "সনদ",
    noCertificate: "সনদ নেই",
    official: "অফিসিয়াল সেবা দেখুন",
    officialNote:
      "জাতীয় পোর্টাল খুলবে। সিভিক বাংলাদেশ আবেদন নিষ্পত্তি করে না।",
  },
  category: {
    guides: "{count}টি নমুনা গাইড",
  },
};
