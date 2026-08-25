import type { TranslationShape } from "@/locales/types";

export const courseDetail = {
  sampleBadge: "Sample catalog",
  catalogNote:
    "This is a Civic Bangladesh course for preparation. It is not a government class, and we do not process applications.",
  feeNote: "This is a Civic Bangladesh course fee — not a government fee.",
  relatedService: "Related government service",
  onThisPage: "On this page",
  jump: {
    learn: "What you will learn",
    curriculum: "Course outline",
    includes: "What’s included",
    service: "Related service",
    certificate: "Certificate",
  },
  cta: {
    enroll: "Start this course",
    viewService: "View Government Service",
    browseCourses: "Browse courses",
    pricing: "How we price courses",
  },
  meta: {
    duration: "Duration",
    lessons: "Lessons",
    certificate: "Certificate",
    instructor: "Tutor",
    price: "Course fee",
  },
  outcomes: {
    title: "What you will learn",
    description:
      "These are practical skills for getting ready. Finishing this course is not an official government result.",
    servicePrep: {
      understand: "Know what this service is, in simple words.",
      papers: "Know which papers people are often asked to keep ready.",
      names: "Keep names and spellings the same on every paper.",
      upload: "Make a clear scan if the official portal asks for one.",
      submit:
        "Submit only on the official portal, and save any tracking number.",
      mistakes: "Spot the mistakes that often delay a file.",
    },
    civic: {
      everydayCivic: {
        habits:
          "Practice small daily habits that keep streets and queues livable.",
        places: "Treat shared places as everyone’s, not only yours.",
        responsibility: "See how a small act can help the people next to you.",
        practice:
          "Take one habit from the course into real life the same week.",
      },
      roadSafety: {
        habits: "Cross and wait in a way that keeps you and others safer.",
        looking: "Look for people who need more time on the road.",
        patience: "Give space instead of rushing a crossing or a queue.",
        practice: "Use one safer road habit the next time you go out.",
      },
      communityFacilitation: {
        prepare: "Plan a short civic session that a group can follow.",
        run: "Run the session so people can speak and practice, not only listen.",
        include: "Make room for quieter people in the group.",
        follow: "Leave the group with one clear next step.",
      },
    },
  },
  curriculum: {
    title: "Course outline",
    description:
      "Open a module to see the lessons inside. This is a sample outline, not a live class timetable.",
    moduleLabel: "Module {number}",
    lessons: "{count} lessons",
    summary: "{modules} modules · {lessons} lessons",
    sampleNote:
      "Lesson titles are a sample outline. They are not recorded names from a government office.",
    servicePrep: {
      aboutService: {
        title: "Learn about this service",
        body: "What the service is, and who usually needs it.",
        lessons: {
          whatItIs: "What this service is, in plain language",
          whoItIsFor: "Who usually applies, and what to confirm",
        },
      },
      documents: {
        title: "Required documents",
        body: "Papers people are often asked to keep ready.",
        lessons: {
          checklist: "Make a simple paper checklist",
          formats: "Original, photocopy, and scan — when each is used",
        },
      },
      fillForm: {
        title: "Fill the application form",
        body: "Fill names and numbers so they match your papers.",
        lessons: {
          matchNames: "Match names with NID and certificates",
          readFields: "Read each field before you type",
        },
      },
      upload: {
        title: "Upload documents",
        body: "Upload only if the official portal asks.",
        lessons: {
          scanClear: "Make a clear, readable scan",
          fileSize: "Check file type and size before you upload",
        },
      },
      submitTrack: {
        title: "Submission and tracking",
        body: "Submit on the official portal. Keep a tracking number.",
        lessons: {
          submitOfficial: "Submit only where the official portal says",
          saveNumber: "Save the tracking number and follow it there",
        },
      },
      mistakes: {
        title: "Common mistakes",
        body: "Preparation mistakes that often delay a file.",
        lessons: {
          commonErrors: "The mistakes this course helps you avoid",
        },
      },
    },
    civic: {
      everydayCivic: {
        habits: {
          title: "Small daily habits",
          body: "The habits you use on streets and in queues.",
          lessons: {
            street: "Keep the street a little easier for the next person",
            queue: "Wait in line without pushing",
          },
        },
        places: {
          title: "Shared places",
          body: "Parks, stops, and other places we all use.",
          lessons: {
            park: "Leave a public place as you found it — or better",
            shared: "Do not treat shared space as private space",
          },
        },
        responsibility: {
          title: "Everyday responsibility",
          body: "Why small acts add up.",
          lessons: {
            smallActs: "One small act you can repeat this week",
          },
        },
        practice: {
          title: "Practice",
          body: "Take the habit off the page and into the day.",
          lessons: {
            daily: "Pick one habit and use it tomorrow",
          },
        },
      },
      roadSafety: {
        crossing: {
          title: "Crossing safely",
          body: "Look, wait, then cross.",
          lessons: {
            look: "Look both ways, even on a familiar road",
            useCrossing: "Use the crossing when there is one",
          },
        },
        waiting: {
          title: "Waiting",
          body: "Give time to the people around you.",
          lessons: {
            patience: "Do not rush a crossing or a stop",
          },
        },
        lookingOut: {
          title: "Looking out for others",
          body: "Children, older people, and anyone who needs more time.",
          lessons: {
            others: "Leave space for someone slower than you",
          },
        },
        practice: {
          title: "Practice",
          body: "Use one safer habit on your next trip.",
          lessons: {
            habit: "Choose one road habit to keep this week",
          },
        },
      },
      communityFacilitation: {
        prepare: {
          title: "Prepare a session",
          body: "Plan a short civic practice that a group can follow.",
          lessons: {
            plan: "Write a simple session plan",
            materials: "Prepare the papers and space you need",
          },
        },
        runSession: {
          title: "Run the session",
          body: "Keep the group moving without rushing people.",
          lessons: {
            welcome: "Start so everyone knows what will happen",
            pace: "Leave time to practice, not only to listen",
          },
        },
        includeAll: {
          title: "Include everyone",
          body: "Make room for quieter voices.",
          lessons: {
            voices: "Invite people who have not spoken yet",
          },
        },
        followUp: {
          title: "Follow up",
          body: "Leave one clear next step.",
          lessons: {
            nextStep: "End with one action the group can do",
          },
        },
      },
    },
  },
  includes: {
    title: "What this course includes",
    description:
      "This is what you can expect in this Civic Bangladesh course. It is a sample catalog, not a live classroom pack.",
    inCourse: "Included",
    items: {
      video: {
        title: "Video lessons",
        body: "Short videos you can follow step by step.",
      },
      guide: {
        title: "Step-by-step guide",
        body: "A simple path from papers to the official portal.",
      },
      examples: {
        title: "Practical examples",
        body: "Examples from everyday preparation, not official case files.",
      },
      assessment: {
        title: "Assessment",
        body: "A short check that you understood how to prepare.",
      },
      certificate: {
        title: "Certificate",
        body: "A Civic Bangladesh learning credential — not a government certificate.",
      },
    },
    notInCourse: "Not in this course",
  },
  related: {
    title: "The government service this course is for",
    description:
      "Prepare here, then apply on the official government portal — not on this website.",
    prepareFor: "This course is for",
    viewGuide: "Read the service guide",
    applyOfficial: "Go to the official portal",
  },
  certificate: {
    title: "What the certificate looks like",
    description:
      "This is a sample of the Civic Bangladesh learning certificate. It is not a government certificate.",
    sampleBadge: "Sample",
    meaningTitle: "What this means",
    meaningIs: "It shows you completed this Civic Bangladesh course.",
    meaningIsNot:
      "It is not a stamp, licence, attestation, or government certificate.",
    previewEyebrow: "Civic Bangladesh",
    heading: "Certificate of completion",
    awardedTo: "Awarded to",
    sampleName: "Amina Rahman",
    courseLabel: "Course",
    issuer: "Issued by Civic Bangladesh as a learning certificate (sample).",
    notGovernment:
      "This is not a government certificate. It does not replace an official stamp, licence, or attestation.",
    noCertificateTitle: "This course has no certificate",
    noCertificateBody:
      "You can still use the lessons to prepare. There is no completion certificate in this catalog course.",
  },
} as const;

export type CourseDetailTranslations = TranslationShape<typeof courseDetail>;
