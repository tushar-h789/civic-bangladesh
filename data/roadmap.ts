import { ROUTES } from "@/constants/routes";
import { coursesCatalogHref } from "@/data/course-catalog";
import {
  OFFICIAL_GOVERNMENT_PORTAL_HREF,
  serviceHref,
} from "@/data/government-services";
import { serviceCategoryHrefFromKey } from "@/data/service-categories";

export const ROADMAP_LEGEND_KEYS = [
  "learn",
  "services",
  "courses",
  "participate",
  "community",
  "personalProgress",
] as const;

export type RoadmapLegendKey = (typeof ROADMAP_LEGEND_KEYS)[number];

export const ROADMAP_BRANCH_KEYS = [
  "civicLearning",
  "governmentServices",
  "courses",
  "challenges",
  "campaigns",
  "storiesVideos",
  "community",
  "myJourney",
  "schoolsOrganizations",
  "adminAnalytics",
] as const;

export type RoadmapBranchKey = (typeof ROADMAP_BRANCH_KEYS)[number];

export const ROADMAP_VISITOR_JOURNEY_KEYS = [
  "visitor",
  "discover",
  "learn",
  "practice",
  "participate",
  "certified",
  "impact",
] as const;

export type RoadmapVisitorJourneyKey =
  (typeof ROADMAP_VISITOR_JOURNEY_KEYS)[number];

export const ROADMAP_WORKS_KEYS = [
  "discover",
  "understand",
  "learn",
  "practice",
  "certified",
  "action",
] as const;

export type RoadmapWorksKey = (typeof ROADMAP_WORKS_KEYS)[number];

export const ROADMAP_SERVICE_FLOW_KEYS = [
  "service",
  "information",
  "documents",
  "guide",
  "course",
  "assessment",
  "certificate",
  "officialPortal",
] as const;

export type RoadmapServiceFlowKey = (typeof ROADMAP_SERVICE_FLOW_KEYS)[number];

export const ROADMAP_COURSE_TYPE_KEYS = ["civic", "servicePrep"] as const;

export type RoadmapCourseTypeKey = (typeof ROADMAP_COURSE_TYPE_KEYS)[number];

export const ROADMAP_ACCESS_TIER_KEYS = ["free", "premium"] as const;

export type RoadmapAccessTierKey = (typeof ROADMAP_ACCESS_TIER_KEYS)[number];

export const ROADMAP_INSTITUTION_KEYS = [
  "citizen",
  "school",
  "organization",
  "community",
] as const;

export type RoadmapInstitutionKey = (typeof ROADMAP_INSTITUTION_KEYS)[number];

export const ROADMAP_IMPACT_KEYS = [
  "knowledge",
  "confidence",
  "action",
  "participation",
  "communityImpact",
  "betterBangladesh",
] as const;

export type RoadmapImpactKey = (typeof ROADMAP_IMPACT_KEYS)[number];

export const ROADMAP_EXAMPLE_SERVICE_SLUG = "ssc-certificate-attestation";

export const ROADMAP_BRANCH_CATEGORY: Record<
  RoadmapBranchKey,
  RoadmapLegendKey
> = {
  civicLearning: "learn",
  governmentServices: "services",
  courses: "courses",
  challenges: "participate",
  campaigns: "participate",
  storiesVideos: "community",
  community: "community",
  myJourney: "personalProgress",
  schoolsOrganizations: "learn",
  adminAnalytics: "services",
};

export const ROADMAP_BRANCH_HREF: Record<RoadmapBranchKey, string> = {
  civicLearning: ROUTES.learn,
  governmentServices: ROUTES.governmentServices,
  courses: ROUTES.courses,
  challenges: ROUTES.challenges,
  campaigns: ROUTES.campaigns,
  storiesVideos: ROUTES.stories,
  community: ROUTES.community,
  myJourney: ROUTES.profile,
  schoolsOrganizations: ROUTES.organizations,
  adminAnalytics: ROUTES.help,
};

export const ROADMAP_BRANCH_CHILDREN: Record<
  RoadmapBranchKey,
  readonly string[]
> = {
  civicLearning: [
    "civicTopics",
    "civicSense",
    "roadTraffic",
    "cleanliness",
    "environment",
    "publicSpaces",
    "digitalCitizenship",
    "socialResponsibility",
    "civicQuiz",
    "civicPromise",
  ],
  governmentServices: [
    "allServices",
    "serviceCategories",
    "popularServices",
    "serviceSearch",
    "serviceDetails",
    "requiredDocuments",
    "governmentFee",
    "processingTime",
    "applicationInstructions",
    "officialApplicationLink",
  ],
  courses: [
    "civicCourses",
    "serviceCourses",
    "videoLessons",
    "courseCurriculum",
    "assessments",
    "courseProgress",
    "certificates",
    "premiumCourses",
  ],
  challenges: [
    "dailyChallenges",
    "thirtyDayChallenge",
    "civicChallenges",
    "learningChallenges",
    "challengeProgress",
    "achievements",
    "badges",
    "civicScore",
  ],
  campaigns: [
    "featuredCampaigns",
    "campaignCategories",
    "campaignDetails",
    "participation",
    "campaignProgress",
    "communityCampaigns",
  ],
  storiesVideos: [
    "citizenStories",
    "studentStories",
    "communityStories",
    "educationalVideos",
    "shortVideos",
    "featuredContent",
  ],
  community: [
    "communityActivities",
    "volunteerOpportunities",
    "localCampaigns",
    "communityHighlights",
    "impactStories",
    "civicMap",
  ],
  myJourney: [
    "dashboard",
    "myCivicScore",
    "myCourses",
    "myServices",
    "myChallenges",
    "myAssessments",
    "myBadges",
    "myCertificates",
    "savedContent",
    "profile",
  ],
  schoolsOrganizations: [
    "schoolPrograms",
    "studentLearning",
    "teacherTools",
    "organizationPrograms",
    "csrPrograms",
    "campaignManagement",
    "institutionalLearning",
    "institutionalAnalytics",
  ],
  adminAnalytics: [
    "adminDashboard",
    "users",
    "adminCourses",
    "adminChallenges",
    "adminCampaigns",
    "content",
    "adminCertificates",
    "adminOrganizations",
    "analytics",
    "revenue",
  ],
};

const exampleServiceHref = serviceHref(ROADMAP_EXAMPLE_SERVICE_SLUG);
const exampleCourseHref = `${ROUTES.courses}/ssc-certificate-attestation-prep`;

export const ROADMAP_CHILD_HREF: Record<string, string> = {
  civicTopics: ROUTES.learn,
  civicSense: ROUTES.learn,
  roadTraffic: ROUTES.learn,
  cleanliness: ROUTES.learn,
  environment: ROUTES.learn,
  publicSpaces: ROUTES.learn,
  digitalCitizenship: ROUTES.learn,
  socialResponsibility: ROUTES.learn,
  civicQuiz: ROUTES.learn,
  civicPromise: ROUTES.civicPromise,
  allServices: ROUTES.governmentServices,
  serviceCategories: serviceCategoryHrefFromKey("outboundAttestation"),
  popularServices: `${ROUTES.governmentServices}#popular-services-heading`,
  serviceSearch: ROUTES.governmentServices,
  serviceDetails: exampleServiceHref,
  requiredDocuments: `${exampleServiceHref}#documents`,
  governmentFee: `${exampleServiceHref}#fee`,
  processingTime: `${exampleServiceHref}#processing`,
  applicationInstructions: `${exampleServiceHref}#process`,
  officialApplicationLink: OFFICIAL_GOVERNMENT_PORTAL_HREF,
  civicCourses: coursesCatalogHref("civic"),
  serviceCourses: coursesCatalogHref("servicePrep"),
  videoLessons: ROUTES.videos,
  courseCurriculum: exampleCourseHref,
  assessments: exampleCourseHref,
  courseProgress: ROUTES.profile,
  certificates: ROUTES.certificates,
  premiumCourses: ROUTES.pricing,
  dailyChallenges: ROUTES.challenges,
  thirtyDayChallenge: ROUTES.challenges,
  civicChallenges: ROUTES.challenges,
  learningChallenges: ROUTES.challenges,
  challengeProgress: ROUTES.profile,
  achievements: ROUTES.profile,
  badges: ROUTES.profile,
  civicScore: ROUTES.profile,
  featuredCampaigns: ROUTES.campaigns,
  campaignCategories: ROUTES.campaigns,
  campaignDetails: ROUTES.campaigns,
  participation: ROUTES.campaigns,
  campaignProgress: ROUTES.campaigns,
  communityCampaigns: ROUTES.community,
  citizenStories: ROUTES.stories,
  studentStories: ROUTES.stories,
  communityStories: ROUTES.stories,
  educationalVideos: ROUTES.videos,
  shortVideos: ROUTES.videos,
  featuredContent: ROUTES.stories,
  communityActivities: ROUTES.community,
  volunteerOpportunities: ROUTES.community,
  localCampaigns: ROUTES.campaigns,
  communityHighlights: ROUTES.community,
  impactStories: ROUTES.stories,
  civicMap: ROUTES.community,
  dashboard: ROUTES.profile,
  myCivicScore: ROUTES.profile,
  myCourses: ROUTES.profile,
  myServices: ROUTES.dashboardServices,
  myChallenges: ROUTES.challenges,
  myAssessments: ROUTES.profile,
  myBadges: ROUTES.profile,
  myCertificates: ROUTES.certificates,
  savedContent: ROUTES.dashboardServices,
  profile: ROUTES.profile,
  schoolPrograms: ROUTES.schools,
  studentLearning: ROUTES.courses,
  teacherTools: ROUTES.schools,
  organizationPrograms: ROUTES.organizations,
  csrPrograms: ROUTES.organizations,
  campaignManagement: ROUTES.campaigns,
  institutionalLearning: ROUTES.organizations,
  institutionalAnalytics: ROUTES.organizations,
};

export const ROADMAP_CHILD_EXTERNAL = new Set<string>([
  "officialApplicationLink",
]);

/** Desktop grid placement: column and row in a 3×4 map grid (1-based). */
export const ROADMAP_BRANCH_GRID: Record<
  RoadmapBranchKey,
  { col: number; row: number }
> = {
  civicLearning: { col: 1, row: 1 },
  governmentServices: { col: 2, row: 1 },
  courses: { col: 3, row: 1 },
  challenges: { col: 1, row: 2 },
  campaigns: { col: 3, row: 2 },
  storiesVideos: { col: 1, row: 3 },
  community: { col: 2, row: 3 },
  myJourney: { col: 3, row: 3 },
  schoolsOrganizations: { col: 1, row: 4 },
  adminAnalytics: { col: 2, row: 4 },
};

export const ROADMAP_FREE_ITEM_KEYS = [
  "civicAwareness",
  "basicLessons",
  "serviceInformation",
  "basicGuides",
  "selectedVideos",
  "basicQuizzes",
  "publicResources",
] as const;

export const ROADMAP_PREMIUM_ITEM_KEYS = [
  "structuredCourses",
  "advancedLearning",
  "assessments",
  "certificates",
  "institutionalPrograms",
  "specializedLearning",
] as const;

export const ROADMAP_CIVIC_EXAMPLE_KEYS = [
  "roadSafety",
  "cleanliness",
  "environment",
  "digitalCitizenship",
  "socialResponsibility",
] as const;

export const ROADMAP_SERVICE_EXAMPLE_KEYS = [
  "certificateAttestation",
  "licenseApplications",
  "registration",
  "servicePreparation",
  "outboundServices",
] as const;
