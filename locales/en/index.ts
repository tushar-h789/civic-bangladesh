import type { TranslationShape } from "@/locales/types";

import { about } from "./about";
import { accessibility } from "./accessibility";
import { common } from "./common";
import { challenge } from "./challenge";
import { challengeTypes } from "./challenge-types";
import { footer } from "./footer";
import { campaigns } from "./campaigns";
import { community } from "./community";
import { courses } from "./courses";
import { courseCheckout } from "./course-checkout";
import { courseDetail } from "./course-detail";
import { courseLearn } from "./course-learn";
import { certificates } from "./certificates";
import { dashboard } from "./dashboard";
import { dashboardServices } from "./dashboard-services";
import { faq } from "./faq";
import { help } from "./help";
import { home } from "./home";
import { civicLearning } from "./civic-learning";
import { learning } from "./learning";
import { courseTypes } from "./course-types";
import { nav } from "./nav";
import { pricing } from "./pricing";
import { privacy } from "./privacy";
import { programs } from "./programs";
import { promise } from "./promise";
import { score } from "./score";
import { scenarios } from "./scenarios";
import { search } from "./search";
import { services } from "./services";
import { serviceCategory } from "./service-category";
import { serviceDetail } from "./service-detail";
import { serviceGuides } from "./service-guides";
import { serviceLearning } from "./service-learning";
import { serviceSource } from "./service-source";
import { stories } from "./stories";
import { terms } from "./terms";
import { videos } from "./videos";

export const en = {
  common,
  about,
  accessibility,
  nav,
  footer,
  home,
  scenarios,
  search,
  challenge,
  challengeTypes,
  score,
  learning,
  courseTypes,
  courses,
  courseCheckout,
  courseDetail,
  courseLearn,
  certificates,
  dashboard,
  dashboardServices,
  faq,
  help,
  civicLearning,
  campaigns,
  community,
  stories,
  promise,
  pricing,
  privacy,
  programs,
  services,
  serviceCategory,
  serviceDetail,
  serviceGuides,
  serviceLearning,
  serviceSource,
  terms,
  videos,
};

export type Dictionary = TranslationShape<typeof en>;
