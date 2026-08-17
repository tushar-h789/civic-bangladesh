import type { TranslationShape } from "@/locales/types";

export const serviceGuides = {
  sscAttestation: {
    whoCanApply:
      "Students and others going abroad who need an SSC certificate attested. Confirm eligibility on the official portal. (sample)",
    about:
      "Attestation means an office checks that your SSC certificate is genuine, so another country or institution can trust it. Civic Bangladesh helps you prepare papers and avoid common mistakes. The attestation itself happens at the official office or portal — not here.",
    documents: {
      originalSsc: {
        name: "Original SSC certificate",
        format: "Original + colour scan (PDF)",
        notes: "Name must match your passport and NID. (sample)",
      },
      photocopySsc: {
        name: "Photocopy of SSC certificate",
        format: "A4 photocopy, both sides if printed",
        notes: "Keep a spare copy. (sample)",
      },
      nidOrBirth: {
        name: "NID or birth certificate",
        format: "Original + colour scan (PDF or JPG)",
        notes: "Use the document that matches the name on the SSC. (sample)",
      },
      passportCopy: {
        name: "Passport copy",
        format: "Colour scan of the photo page (PDF or JPG)",
        notes:
          "Often asked when you are going abroad. Confirm on the portal. (sample)",
      },
      photo: {
        name: "Recent photograph",
        format: "Passport size, colour (JPG)",
        notes: "Plain background. (sample)",
      },
      applicationForm: {
        name: "Filled request form",
        format: "Printed or portal form (PDF)",
        notes:
          "Only if the official portal or office still uses a paper form. (sample)",
      },
    },
    mistakes: [
      {
        title: "Names do not match",
        body: "SSC, passport, and NID spellings differ by one letter. Offices often stop the file for this.",
      },
      {
        title: "Blurry scans",
        body: "A dark phone photo is rejected. Use a flat, well-lit colour scan.",
      },
      {
        title: "Paying the wrong place",
        body: "A course fee on Civic Bangladesh is not the government attestation fee. Pay official fees only where the portal says.",
      },
    ],
    course: {
      title: "SSC certificate attestation — step by step",
      description:
        "A short prep course: which papers to gather, how names should match, and what to check before the official portal.",
      imageAlt:
        "A young woman arranging certificate papers and a passport into a folder",
    },
  },
  transcriptAttestation: {
    whoCanApply:
      "Students and graduates who need an academic transcript attested for study or work abroad. Confirm on the official portal. (sample)",
    about:
      "Transcript attestation is a check that your mark sheet or transcript is genuine. This page is a preparation guide. You still apply through the official office or portal. Civic Bangladesh does not stamp or send your transcript.",
    documents: {
      originalTranscript: {
        name: "Original academic transcript",
        format: "Original + colour scan (PDF)",
        notes: "Issued by the board or university. (sample)",
      },
      photocopyTranscript: {
        name: "Photocopy of transcript",
        format: "A4 photocopy",
        notes: "All pages, including the back if there are stamps. (sample)",
      },
      nid: {
        name: "National ID",
        format: "Original + colour scan (PDF or JPG)",
        notes: "Name should match the transcript. (sample)",
      },
      photo: {
        name: "Recent photograph",
        format: "Passport size, colour (JPG)",
        notes: "Plain background. (sample)",
      },
      universityLetter: {
        name: "University or board covering letter",
        format: "Original letter or PDF",
        notes:
          "Only if your office still asks for one. Confirm first. (sample)",
      },
    },
    mistakes: [
      {
        title: "Missing pages",
        body: "Transcripts often have a back page with seals. Leaving it out delays the file.",
      },
      {
        title: "Old photocopies",
        body: "Faded copies are hard to read. Make a fresh photocopy the day before.",
      },
      {
        title: "Wrong office first",
        body: "Some files need the board or university before attestation. Check the official order of steps.",
      },
    ],
    course: {
      title: "Academic transcript attestation — step by step",
      description:
        "Learn what to gather and in which order before you seek transcript attestation on the official portal.",
      imageAlt:
        "A student reviewing academic transcript pages in a university library",
    },
  },
  characterCertificate: {
    whoCanApply:
      "Citizens who need a local character certificate for study, work, or other applications. Confirm with the issuing office. (sample)",
    about:
      "A character certificate is a local statement about you. This page shows a simple preparation list. The union, pourasava, or other local office issues it — Civic Bangladesh does not.",
    documents: {
      nid: {
        name: "National ID",
        format: "Original + photocopy",
        notes: "Bring the original to the office. (sample)",
      },
      photo: {
        name: "Recent photograph",
        format: "Passport size, colour (JPG or print)",
        notes: "Offices often keep one copy. (sample)",
      },
      applicationForm: {
        name: "Local application form",
        format: "Office form or printed PDF",
        notes: "Fill it in the same spelling as your NID. (sample)",
      },
      localRecommendation: {
        name: "Local recommendation",
        format: "Signed paper",
        notes:
          "Only if your office still asks a local representative. Confirm first. (sample)",
      },
    },
    mistakes: [
      {
        title: "Going without the original NID",
        body: "A photocopy alone is often not enough at the counter.",
      },
      {
        title: "Different signature",
        body: "Sign the form the way you sign on your NID and bank papers.",
      },
      {
        title: "Wrong local office",
        body: "The certificate is usually from your current address office. Ask before you travel.",
      },
    ],
    course: {
      title: "Character certificate — what to prepare",
      description:
        "A short prep course for a local character-certificate visit. Civic Bangladesh teaches preparation, not issuance.",
      imageAlt: "A citizen waiting in a local office with an application form",
    },
  },
  tradeLicence: {
    whoCanApply:
      "Business owners who need a new trade licence or a renewal. Confirm with the local city or pourasava office. (sample)",
    about:
      "A trade licence is a local permission to run a business from an address. Civic Bangladesh helps you list papers and common mistakes. The licence is issued by the local government office, not by this website.",
    documents: {
      nid: {
        name: "Owner’s national ID",
        format: "Original + photocopy",
        notes: "For every owner named on the licence. (sample)",
      },
      holdingTax: {
        name: "Holding tax or municipal receipt",
        format: "Recent original + photocopy",
        notes: "Should match the business address. (sample)",
      },
      rentDeed: {
        name: "Rent deed or ownership paper",
        format: "Original + photocopy",
        notes: "Shows you may use the shop or office. (sample)",
      },
      photo: {
        name: "Owner photograph",
        format: "Passport size, colour",
        notes: "Recent, plain background. (sample)",
      },
      tradeName: {
        name: "Proposed trade name",
        format: "Written on the form, Bangla and English if asked",
        notes: "Use one spelling everywhere. (sample)",
      },
      previousLicence: {
        name: "Previous trade licence",
        format: "Original + photocopy",
        notes: "For renewal only. (sample)",
      },
      tin: {
        name: "TIN certificate",
        format: "Photocopy or PDF",
        notes: "Only if your office asks. Confirm first. (sample)",
      },
    },
    mistakes: [
      {
        title: "Address mismatch",
        body: "The rent deed, tax receipt, and form show three different spellings of the same road.",
      },
      {
        title: "Expired tax receipt",
        body: "Offices often want the latest holding-tax payment, not last year’s.",
      },
      {
        title: "Treating this course as the licence",
        body: "Finishing a Civic Bangladesh course does not issue a trade licence. Apply at the local office or official portal.",
      },
    ],
    course: {
      title: "Trade licence — preparation course",
      description:
        "Papers, address checks, and common mistakes before a trade-licence visit. Affordable prep — not a government fee.",
      imageAlt: "A shopkeeper reviewing papers at a neighborhood shop counter",
    },
  },
  boardCertificate: {
    whoCanApply:
      "Students who need a duplicate or certified copy of a board certificate. Confirm with the education board. (sample)",
    about:
      "Boards sometimes issue a copy when the original is lost or damaged. This page is a preparation list. The board office or its portal handles the request. Civic Bangladesh does not print board certificates.",
    documents: {
      nid: {
        name: "National ID or birth certificate",
        format: "Original + colour scan",
        notes: "Must match the name on the board record. (sample)",
      },
      originalOrCopy: {
        name: "Damaged original or remaining copy",
        format: "Original if you still have it",
        notes: "If lost, follow the board’s lost-certificate steps. (sample)",
      },
      photo: {
        name: "Recent photograph",
        format: "Passport size, colour (JPG)",
        notes: "Same as used in other board papers if possible. (sample)",
      },
      policeGd: {
        name: "Police GD for a lost certificate",
        format: "GD copy",
        notes:
          "Only if the certificate is lost and the board asks for it. (sample)",
      },
    },
    mistakes: [
      {
        title: "Skipping the lost-paper step",
        body: "If the original is lost, the board may ask for a GD first. Going without it wastes a visit.",
      },
      {
        title: "Wrong board",
        body: "SSC and HSC copies go to the board that issued them, not a local school office.",
      },
      {
        title: "Unclear photos of the damaged certificate",
        body: "If you still have pieces of the original, photograph every side clearly.",
      },
    ],
    course: {
      title: "Board certificate copy — what to bring",
      description:
        "A short course on papers and order of steps before you request a board certificate copy.",
      imageAlt: "A student collecting photocopies of a school certificate",
    },
  },
  landMutation: {
    whoCanApply:
      "Landowners who need mutation (namjari) after buying, inheriting, or otherwise changing ownership. Confirm at the land office. (sample)",
    about:
      "Mutation updates whose name is on the land record. It is a land-office process with several papers. This page explains the idea in simple language and lists a sample checklist. Civic Bangladesh does not mutate land or take land fees.",
    documents: {
      nid: {
        name: "Applicant’s national ID",
        format: "Original + photocopy",
        notes: "Names should match the deed. (sample)",
      },
      deed: {
        name: "Registered deed",
        format: "Original + certified copy if asked",
        notes: "Keep the original safe; carry copies. (sample)",
      },
      khatian: {
        name: "Current khatian / porcha",
        format: "Certified copy",
        notes:
          "From the record that still shows the previous owner if you just bought. (sample)",
      },
      taxReceipt: {
        name: "Land development tax receipt",
        format: "Recent original + photocopy",
        notes: "Often the latest year’s payment. (sample)",
      },
      photo: {
        name: "Applicant photograph",
        format: "Passport size, colour",
        notes: "Recent. (sample)",
      },
      mapCopy: {
        name: "Mouza map or plot copy",
        format: "Certified copy if the office asks",
        notes: "Confirm whether your office wants it for this plot. (sample)",
      },
      inheritance: {
        name: "Inheritance papers",
        format: "As the land office lists",
        notes: "Only for inheritance cases. (sample)",
      },
      warish: {
        name: "Warish or heir certificate",
        format: "Office copy",
        notes: "Only if heirs must be named. Confirm first. (sample)",
      },
    },
    mistakes: [
      {
        title: "Deed name vs NID name",
        body: "A missing ‘Md.’ or a nickname on the deed can stall mutation.",
      },
      {
        title: "Old tax receipt only",
        body: "Offices often want the latest land-tax payment, not a receipt from years ago.",
      },
      {
        title: "Paying a middle person as if they were the office",
        body: "Land fees belong at the land office or official portal. Civic Bangladesh never collects them.",
      },
    ],
    course: {
      title: "Land mutation — step by step",
      description:
        "A citizen-friendly outline of papers often needed for mutation, and mistakes that delay a file.",
      imageAlt: "A landowner studying land papers beside a green field",
    },
  },
  bankSolvency: {
    whoCanApply:
      "Account holders who need a solvency letter from their bank for visa, study, or other uses. Confirm with your own bank. (sample)",
    about:
      "A solvency letter is a bank paper about your account, not a government certificate. Banks set their own list. This page is a general preparation note. Ask your branch. Civic Bangladesh does not issue bank letters.",
    documents: {
      nid: {
        name: "National ID",
        format: "Original + photocopy",
        notes: "Must match the account name. (sample)",
      },
      accountStatement: {
        name: "Recent account statement",
        format: "Bank printout or PDF",
        notes: "Period the bank asks for — often 3 or 6 months. (sample)",
      },
      photo: {
        name: "Photograph",
        format: "Passport size if the branch asks",
        notes: "Not every branch wants this. (sample)",
      },
      applicationForm: {
        name: "Bank request form",
        format: "Branch form",
        notes: "Write the purpose clearly (visa, study, and so on). (sample)",
      },
      tin: {
        name: "TIN or tax paper",
        format: "Photocopy",
        notes: "Only if your bank asks. (sample)",
      },
    },
    mistakes: [
      {
        title: "Wrong account name",
        body: "Joint accounts and old names need extra papers. Ask the branch first.",
      },
      {
        title: "Statement too short",
        body: "A one-week printout is often not enough. Ask how many months they need.",
      },
      {
        title: "Treating this as a government stamp",
        body: "The letter comes from your bank. Civic Bangladesh cannot write it.",
      },
    ],
    course: {
      title: "Bank solvency letter — what banks often ask",
      description:
        "How to prepare a solvency-letter request. Confirm every item with your own bank.",
      imageAlt: "A man reviewing a passbook and papers at a quiet desk",
    },
  },
  fertilizerSupport: {
    whoCanApply:
      "Farmers who need fertilizer support or related papers. Confirm with the local agriculture office. (sample)",
    about:
      "Fertilizer support is handled by agriculture offices, not by Civic Bangladesh. This page lists papers farmers are often asked to keep ready. Amounts, cards, and dates change — confirm locally.",
    documents: {
      nid: {
        name: "Farmer’s national ID",
        format: "Original + photocopy",
        notes: "Should match local records. (sample)",
      },
      landProof: {
        name: "Land or cultivation proof",
        format: "Khatian copy or other office-accepted paper",
        notes: "What counts can differ by upazila. (sample)",
      },
      farmerCard: {
        name: "Farmer card or dealer card",
        format: "Original card",
        notes: "Only if you already have one. (sample)",
      },
    },
    mistakes: [
      {
        title: "Leaving the original card at home",
        body: "If you have a farmer card, take it. A photo on your phone may not be enough.",
      },
      {
        title: "Assuming the catalog is the quota",
        body: "This page does not say how much fertilizer you will get. That is an official decision.",
      },
      {
        title: "Paying Civic Bangladesh for a government card",
        body: "We do not sell or issue farmer cards. Use the agriculture office.",
      },
    ],
    course: {
      title: "Fertilizer support — papers to prepare",
      description:
        "A free short guide to papers farmers are often asked to keep ready. Confirm locally.",
      imageAlt: "A farmer holding a paper folder at the edge of a paddy field",
    },
  },
  birthCertificate: {
    whoCanApply:
      "Parents or guardians registering a birth, or citizens requesting a copy. Confirm with the local registrar. (sample)",
    about:
      "A birth certificate is a civil registration paper. Local offices and the national portal handle it. This page helps a family list what is often asked. Civic Bangladesh does not register births.",
    documents: {
      hospitalNote: {
        name: "Hospital or birth attendant note",
        format: "Original discharge or attendant slip",
        notes:
          "If the birth was at home, ask the registrar what they accept. (sample)",
      },
      parentNid: {
        name: "Parents’ national IDs",
        format: "Original + photocopy",
        notes: "Both parents if the office asks. (sample)",
      },
      witness: {
        name: "Witness information",
        format: "As the registrar lists",
        notes: "Some offices still ask for a witness. Confirm first. (sample)",
      },
      photo: {
        name: "Child or applicant photograph",
        format: "As the portal asks",
        notes: "Not always required for a newborn. (sample)",
      },
    },
    mistakes: [
      {
        title: "Waiting too long to register",
        body: "Late registration can need extra papers. Ask the registrar early.",
      },
      {
        title: "Nickname on the form",
        body: "Write the name you want on the certificate, then use that spelling everywhere.",
      },
      {
        title: "Parents’ names not matching NID",
        body: "The child’s form should use the same parent names as on the NID.",
      },
    ],
    course: {
      title: "Birth certificate — preparation",
      description:
        "What families often need to have ready, in simple steps, before a birth-certificate request.",
      imageAlt: "Parents with an infant reviewing hospital papers at home",
    },
  },
  generalSupport: {
    whoCanApply:
      "Any citizen preparing for a government-office visit when the exact service is still unclear. (sample)",
    about:
      "Start here if you are not sure which counter to use. Bring identification, write your request in one sentence, and ask the information desk. Civic Bangladesh can help you prepare. It cannot take a number or submit a file for you.",
    documents: {
      nid: {
        name: "National ID",
        format: "Original + photocopy",
        notes: "The most useful paper at almost every counter. (sample)",
      },
      requestLetter: {
        name: "Short written request",
        format: "One page, signed",
        notes:
          "Say what you need in simple sentences. Optional, but it helps. (sample)",
      },
    },
    mistakes: [
      {
        title: "Going with no written request",
        body: "A one-line paper with your name and what you need saves time at a busy counter.",
      },
      {
        title: "Leaving originals at home",
        body: "Many desks will not start without the original NID.",
      },
      {
        title: "Thinking this website is the office",
        body: "Civic Bangladesh is a learning site. Apply on the official portal or at the office.",
      },
    ],
  },
} as const;

export type ServiceGuidesTranslations = TranslationShape<typeof serviceGuides>;
