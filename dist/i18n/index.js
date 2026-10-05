// src/i18n/en.json
var en_default = {
  common: {
    continue: "Continue",
    back: "Back",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    done: "Done",
    remove: "Remove",
    view: "View",
    loading: "Loading\u2026",
    retry: "Try again",
    optional: "Optional",
    perDay: "/day",
    perMonth: "/month",
    estimated: "Estimated",
    help: "Help",
    yes: "Yes",
    no: "No"
  },
  language: {
    label: "Language",
    en: "English",
    hi: "\u0939\u093F\u0902\u0926\u0940",
    switchTo: "Switch language"
  },
  campaignStatus: {
    DRAFT: {
      label: "Draft",
      description: "You haven't finished this campaign yet."
    },
    PAYMENT_PENDING: {
      label: "Payment pending",
      description: "Your campaign is ready. Complete the payment to launch it."
    },
    PAYMENT_RECEIVED: {
      label: "Payment received",
      description: "We've received your payment. Upload your ad if you haven't yet."
    },
    UNDER_REVIEW: {
      label: "Under review",
      description: "Our team is checking your ad. This usually takes a few hours."
    },
    APPROVED: {
      label: "Approved",
      description: "Your ad is approved."
    },
    SCHEDULED: {
      label: "Scheduled",
      description: "Your ad will start playing on the start date."
    },
    LIVE: {
      label: "Live",
      description: "Your ad is playing on screens right now."
    },
    PAUSED: {
      label: "Paused",
      description: "Your campaign is stopped for now."
    },
    COMPLETED: {
      label: "Completed",
      description: "Your campaign has finished. Your report is ready."
    },
    REJECTED: {
      label: "Rejected",
      description: "Your ad needs changes. Please upload a new one."
    },
    CANCELLED: {
      label: "Cancelled",
      description: "This campaign was cancelled."
    }
  },
  glossary: {
    ad: "Ad",
    yourAd: "Your ad",
    screens: "Screens",
    estimatedViews: "Estimated views",
    plays: "Plays",
    playsPerDay: "Plays per day",
    campaignId: "Campaign ID",
    proofOfPlay: "Proof of Play"
  },
  objective: {
    BRAND_AWARENESS: "Brand Awareness",
    PRODUCT_LAUNCH: "Product Launch",
    OFFER_PROMOTION: "Offer / Promotion",
    STORE_TRAFFIC: "Store Traffic",
    EVENT_PROMOTION: "Event",
    NEW_BUSINESS_LAUNCH: "New Business Launch",
    LEAD_GENERATION: "Lead Generation",
    OTHER: "Other",
    STORE_PROMOTION: "Store Promotion",
    POLITICAL_CAMPAIGN: "Political Campaign",
    PUBLIC_AWARENESS: "Public Awareness",
    RECRUITMENT: "Recruitment",
    GOVERNMENT_ANNOUNCEMENT: "Government Announcement",
    FESTIVAL_CAMPAIGN: "Festival Campaign",
    SEASONAL_PROMOTION: "Seasonal Promotion"
  },
  builder: {
    title: "Create a campaign",
    subtitle: "Five simple steps. Your work is saved as you go.",
    steps: {
      "1": "Details",
      "2": "Your ad",
      "3": "Screens",
      "4": "Schedule",
      "5": "Review & pay",
      aria: "Campaign steps",
      progress: "Step {current} of {total}",
      next: "Next: {step}"
    },
    summary: {
      screens: "Screens",
      plays: "Plays",
      views: "Est. views",
      total: "Total"
    },
    details: {
      name: "Campaign name",
      nameHint: "Only you see this. Example: Diwali Campaign 2026",
      namePlaceholder: "e.g. Diwali Campaign 2026",
      brand: "Brand or business name",
      brandHint: "The name people know you by.",
      brandPlaceholder: "e.g. Tajbari",
      objective: "What is this campaign for?",
      objectiveHint: "Pick the one that fits best.",
      description: "Anything else we should know?",
      descriptionHint: "A short note about your offer or event.",
      descriptionPlaceholder: "e.g. 20% off on all sweets this Diwali",
      saveFailed: "Couldn't save. Please try again.",
      errors: {
        nameRequired: "Please give your campaign a name.",
        nameTooLong: "That name is too long.",
        brandTooLong: "That brand name is too long.",
        objectiveRequired: "Please pick what this campaign is for.",
        descriptionTooLong: "Please keep this under 1,000 characters.",
        targetAudienceOtherTooLong: "Please keep this under 160 characters.",
        preferredCitiesTooMany: "You can add up to 10 cities.",
        preferredScreenTypesTooMany: "You can pick up to 10 screen types.",
        totalBudgetInvalid: "Please enter a valid amount.",
        targetAgeRangeIncomplete: "Enter both a minimum and a maximum age.",
        targetAgeRangeInvalid: "The maximum age must be at or above the minimum."
      },
      targetAudience: "Who is this for?",
      targetAudienceHint: "Pick as many as apply \u2014 helps you plan, doesn't limit who sees your ad.",
      targetAudienceOtherPlaceholder: "Describe who you're targeting",
      ageMin: "Min age",
      ageMax: "Max age",
      preferredCities: "Preferred cities",
      preferredCitiesHint: "Cities you'd like to focus on, for your own planning.",
      preferredCitiesPlaceholder: "Type a city and press Enter",
      preferredScreenTypes: "Preferred screen types",
      preferredScreenTypesHint: "The kinds of screens you'd like to focus on.",
      budget: "Budget",
      budgetHint: "Just for your own reference \u2014 what you actually pay is set at checkout."
    },
    upload: {
      dropTitle: "Tap to upload your ad",
      dropHint: "Or drag a picture or video here.",
      formats: "{formats} \xB7 up to {mb} MB \xB7 videos up to {seconds} seconds",
      uploading: "Uploading\u2026",
      uploaded: "Your ad is uploaded.",
      uploadFailed: "Upload failed. Please try again.",
      wrongFormat: "This file type isn't supported. Use {formats}.",
      tooBig: "This file is bigger than {mb} MB.",
      tooLong: "Videos can be at most {seconds} seconds long.",
      allGood: "Your ad looks good",
      allGoodHint: "It's ready to go on screens.",
      needsAttention: "Your ad can run, but check this",
      needsAttentionHint: "It may not look its best on screen.",
      checks: {
        format: {
          ok: "Format: {format}",
          warn: "Format: {format}"
        },
        size: {
          ok: "File size: {mb} MB",
          warn: "File size: {mb} MB \u2014 too big"
        },
        resolution: {
          ok: "Picture quality: {width} \xD7 {height}",
          warn: "Picture quality is low ({width} \xD7 {height}) \u2014 it may look blurry"
        },
        orientation: {
          ok: "Shape: {shape}",
          warn: "Shape: {shape}"
        },
        length: {
          ok: "Length: {seconds} seconds",
          warn: "Length: {seconds} seconds \u2014 too long"
        }
      },
      shapes: {
        landscape: "Wide (landscape)",
        portrait: "Tall (portrait)",
        square: "Square"
      },
      reviewNote: "Our team checks every ad before it goes live, usually within a few hours.",
      replace: "Replace ad",
      addAnother: "Add another ad",
      count: "{count}/{max} ads added",
      atCap: "You've reached the {max}-ad limit for this campaign.",
      mixedLength: "This video is {seconds}s, but your other video is {expected}s. Videos on the same campaign must all be the same length."
    },
    screens: {
      pickOne: "Select at least one screen",
      fit: {
        fits: "Your ad fits this screen",
        bars: "Your ad fits, with thin empty edges",
        rotated: "Action required: your ad's shape doesn't match this screen",
        rotatedSummary: "{count, plural, one {# screen doesn't match your ad's shape} other {# screens don't match your ad's shape}}"
      },
      match: {
        allRun: "{count, plural, one {Your ad will run on this screen} other {Your ad will run on all # screens}}",
        capacity: "Up to {count, plural, one {# ad} other {# ads}} at a time",
        bestMatch: "Best match",
        scoreOf: "{score}/100",
        emptyHint: "Pick screens from the list to preview your ad on them and compare their stats.",
        compare: "Compare screens",
        comparisonTitle: "Compare your screens",
        comparisonHint: "{count, plural, one {# screen} other {# screens}}, best match first",
        checkAvailability: "Check availability",
        availabilityTitle: "Screen availability",
        availabilityHint: "{count, plural, one {# screen} other {# screens}} \u2014 pick dates above to check for conflicts.",
        datesTitle: "Check Availability",
        datesHint: "Pick tentative dates now \u2014 we'll check every screen you've picked against them, and you can fine-tune this in the next step.",
        availabilityBlocked: "Fix the availability conflict above, or adjust your dates, to continue.",
        perDay: "{value}/day",
        colScreen: "Screen",
        colMatch: "Match",
        colFit: "Ad fit",
        colReach: "Reach",
        colPrice: "Price",
        colHours: "Hours",
        colShape: "Shape",
        reason: {
          fillsScreen: "Your ad fills the screen",
          highReach: "High footfall",
          bestValue: "Best value for money",
          shapeMismatch: "Plays with bars (different shape)"
        }
      }
    },
    schedule: {
      datesTitle: "Check Availability",
      datesHint: "Pick a start and end date.",
      days: "{count, plural, one {# day} other {# days}}",
      datesInvalid: "Please pick dates from today onwards.",
      lengthTitle: "Ad Duration",
      lengthVideo: "Your video is {seconds} seconds long.",
      lengthHint: "How many seconds should your picture show each time?",
      seconds: "{seconds} sec",
      frequencyTitle: "How often should it play?",
      frequencyHint: "We turn this into plays on every screen for you.",
      less: "Less often",
      more: "More often",
      capNote: "Some of your screens show one ad at a time, so your ad already plays all day there \u2014 you're not charged extra for them.",
      saveFailed: "Couldn't save. Please try again.",
      levels: {
        popular: "Popular",
        plays: "At least {count} plays a day",
        priceMultiplier: "{times}\xD7 the price of Standard",
        STANDARD: {
          title: "Standard",
          description: "Your ad plays regularly through the day."
        },
        HIGH: {
          title: "High visibility",
          description: "Twice as often \u2014 more people see it."
        },
        CUSTOM: {
          title: "Custom",
          description: "Choose exactly how often."
        }
      },
      availabilityTitle: "Check Availability",
      availabilityHint: "We check every screen you picked against these exact dates before you pay.",
      availabilityToggle: "{count, plural, one {View calendar} other {View calendars}}",
      availabilityBlocked: "Fix the availability conflict above to continue.",
      capacityConflict: '"{screenName}" is full for these dates',
      capacityDetail: "This screen can show {max} ads at a time. {occupied} slots are already taken by other campaigns, and your campaign needs {yours}.",
      capacityBadge: "{occupied} / {max} filled",
      removeScreen: "Remove this screen"
    },
    review: {
      campaign: "Campaign",
      ad: "Your ad",
      adLength: "{seconds} seconds on screen each time",
      screens: "{count, plural, one {# screen} other {# screens}}",
      locations: "In: {places}",
      schedule: "Dates & frequency",
      delivery: "What you get",
      plays: "Plays (at least)",
      views: "Estimated views",
      estimateNote: "Views are an estimate based on how many people pass each screen. You'll see the real number of plays after your campaign runs.",
      cost: "Price",
      mediaCost: "Screen cost",
      platformFee: "CASTADI platform fee",
      gst: "GST",
      gstNone: "Not applicable",
      total: "Total to Pay",
      noHiddenCharges: "No hidden charges.",
      payWith: "Pay with",
      payOnline: "UPI, card or net banking",
      payOnlineHint: "Secure payment by Razorpay",
      payWallet: "CASTADI wallet",
      walletBalance: "Balance: {amount}",
      walletShort: "Balance {amount} \u2014 not enough",
      confirm: "I confirm that the campaign details and my ad are correct.",
      editCampaign: "Edit campaign",
      processing: "Please wait\u2026",
      submitForApproval: "Submit campaign",
      payAndLaunch: "Pay {amount} & launch",
      verifyFailed: "We received your payment but couldn't confirm it. Please contact support \u2014 don't pay again.",
      paymentCancelled: "Payment not completed. Your campaign is saved \u2014 you can pay any time.",
      payFailed: "Couldn't start the payment. Please try again.",
      documents: {
        title: "Documents",
        quotationTitle: "Client quotation",
        quotationHint: "Campaigns over {amount} need the client quotation attached before they go for approval.",
        quotationRequired: "Attach the quotation to continue.",
        receiptTitle: "Payment receipt",
        receiptHint: "Attach proof of what you paid \u2014 our team verifies it before this campaign goes live.",
        add: "Attach a file",
        replace: "Replace",
        remove: "Remove",
        uploading: "Uploading\u2026",
        formats: "PDF, JPG or PNG \xB7 up to 10 MB",
        uploadFailed: "Couldn't upload. Please try again.",
        approvalNote: "Because this is a large campaign, our team will check the quotation before it goes live.",
        optionalHint: "Optional \u2014 attach a client quotation if you have one.",
        verificationNote: "Because you've already paid, our team will verify your receipt before this campaign goes live."
      },
      adsTitle: "{count, plural, one {Your ad} other {Your ads (#)}}",
      bookingDates: "Booking dates: {range}",
      slotHours: "{start}\u2013{end}",
      alreadyPaid: "I've already paid",
      alreadyPaidHint: "Paid the team directly \u2014 attach your receipt",
      submitForVerification: "Submit for verification",
      listTotal: "List Price",
      revisedQuotation: "Revised Quotation Amount",
      viewMore: "{count, plural, one {View # more} other {View # more}}"
    },
    launched: {
      paid: {
        title: "Your campaign is booked!",
        subtitle: "Payment received. We'll check your ad and put it on screens."
      },
      requested: {
        title: "Your campaign is submitted",
        subtitle: "Our team will confirm the payment and check your ad."
      },
      campaignId: "Campaign ID",
      nextSteps: "What happens next",
      steps: {
        paymentReceived: "Payment received",
        submitted: "Campaign submitted",
        paymentApproval: "Payment confirmation",
        adApproval: "Ad check by our team",
        scheduling: "Scheduled on your screens",
        live: "Your ad goes live"
      },
      notifyNote: "We'll send you a notification at every step.",
      viewCampaign: "View campaign",
      backToDashboard: "Go to dashboard",
      approvalEta: "Approval usually takes up to 2 hours."
    },
    continueSetup: {
      title: "This campaign isn't live yet",
      needsAd: "Upload your ad to continue.",
      needsScreens: "Choose your screens and dates to continue.",
      needsPayment: "Everything is ready \u2014 just review and pay.",
      cta: "Continue"
    }
  },
  listing: {
    locationCategory: {
      PREMIUM_COMMERCIAL: "Premium commercial",
      HIGH_STREET: "High street",
      BUSINESS_DISTRICT: "Business district",
      RESIDENTIAL: "Residential",
      TRANSIT: "Transit",
      RETAIL: "Retail",
      TOURIST: "Tourist",
      INSTITUTIONAL: "Institutional"
    },
    audience: {
      STUDENTS: "Students",
      PROFESSIONALS: "Professionals",
      FAMILIES: "Families",
      SHOPPERS: "Shoppers",
      COMMUTERS: "Commuters",
      TOURISTS: "Tourists"
    },
    traffic: {
      PEDESTRIAN: "Mostly people walking",
      VEHICLE: "Mostly vehicles",
      BOTH: "People and vehicles"
    },
    displayType: {
      LCD: "LCD",
      LED: "LED",
      DIGITAL_BILLBOARD: "Digital billboard"
    },
    facing: {
      ROAD_FACING: "Faces the road",
      INDOOR_FACING: "Faces inside"
    }
  },
  marketplace: {
    title: "Explore screens",
    subtitle: "Find screens by area, landmark or city, then pick the ones you want.",
    advertisersOnly: "Screens are only available to advertiser accounts.",
    save: "Save this screen",
    unsave: "Remove from saved",
    results: "{count, plural, one {# screen} other {# screens}}",
    listView: "List",
    mapView: "Map",
    noResults: "No screens found here",
    noResultsHint: "Try another area, a bigger distance, or fewer filters.",
    showMore: "Show more screens",
    card: {
      digitalDisplay: "Digital display",
      available: "Available",
      unavailable: "Busy",
      km: "{km} km away",
      footfall: "Daily footfall",
      perDayValue: "{value}/day",
      peak: "Peak hours",
      hours: "On",
      plays: "Est. plays",
      view: "View screen",
      select: "Select",
      selected: "Selected"
    },
    filters: {
      button: "Filters",
      title: "Filters",
      subtitle: "Pick what matters to you. Results update as you tap.",
      location: "Type of location",
      venue: "Venue",
      audience: "Who's there",
      traffic: "Traffic",
      pedestrian: "Lots of people walking",
      vehicle: "Lots of vehicles",
      screen: "Screen",
      indoor: "Indoor",
      outdoor: "Outdoor",
      size: "Screen size",
      sizeLabel: "{range} inch",
      budget: "Budget per day",
      anyPrice: "Any price",
      upTo: "Up to {amount} a day",
      dates: "Availability",
      datesHint: "Only show screens with room for your dates.",
      clear: "Clear filters",
      clearAll: "Clear search and filters",
      show: "Show screens",
      showCount: "{count, plural, one {Show # screen} other {Show # screens}}"
    },
    search: {
      placeholder: "Area, landmark, city or PIN code",
      nearMe: "Near me",
      nearMeLabel: "your location",
      locating: "Finding you\u2026",
      around: "Around {place}",
      clearPlace: "Clear place",
      within: "Within",
      km: "{km} km"
    },
    selection: {
      count: "{count, plural, one {# screen selected} other {# screens selected}}",
      empty: "No screens selected yet",
      useGroup: "Use a saved group",
      yourGroups: "Your screen groups",
      groupAdded: "Added {count} screens from {name}",
      groupLoadFailed: "Couldn't load that group.",
      addSaved: "Add my saved screens ({count})",
      saveGroup: "Save as a group",
      saveGroupTitle: "Save these screens as a group",
      saveGroupHint: "Give your {count} screens a name, then pick them all in one tap next time.",
      groupPlaceholder: "e.g. Patna premium locations",
      groupSaved: 'Saved "{name}"',
      groupSaveFailed: "Couldn't save the group.",
      remove: "Remove {name}"
    },
    cart: {
      selected: "{count, plural, one {# screen selected} other {# screens selected}}",
      perDay: "{amount} a day in total",
      clear: "Clear",
      continue: "Create campaign"
    }
  },
  screenDetail: {
    back: "Back to screens",
    advertisersOnly: "Screen details are only available to advertiser accounts.",
    loadFailed: "Couldn't load this screen.",
    digitalDisplay: "Digital display",
    price: "Price",
    plays: "Estimated plays",
    playsNote: "for a 15-second ad",
    priceNote: "You'll see the full price for your dates, with fees and GST, before you pay.",
    select: "Select this screen",
    selected: "Selected",
    viewLive: "View live screen",
    perDay: "{value}/day",
    seconds: "{count} seconds",
    meters: "{count} m",
    indoor: "Indoor",
    outdoor: "Outdoor",
    tabs: {
      details: "Details",
      liveAds: "Live ads"
    },
    sections: {
      overview: "Screen",
      location: "Location",
      audience: "Audience & traffic",
      visibility: "Visibility",
      delivery: "Bookings on this screen"
    },
    estimatesNote: "Footfall and audience are the screen owner's estimates.",
    deliveryHint: "Busy days are marked. You choose your dates when you create the campaign.",
    browseMore: "Browse more screens",
    fields: {
      size: "Size",
      resolution: "Resolution",
      shape: "Shape",
      type: "Type",
      environment: "Placed",
      brightness: "Brightness",
      hours: "On",
      venue: "Venue",
      landmark: "Landmark",
      area: "Area",
      city: "City",
      pincode: "PIN code",
      locationCategory: "Type of location",
      footfall: "Daily footfall",
      weekendFootfall: "Weekend footfall",
      traffic: "Traffic",
      peak: "Peak hours",
      dwell: "People stay about",
      audience: "Who's there",
      facing: "Facing",
      viewingDistance: "Seen from up to",
      angle: "Visible across",
      obstructions: "Anything blocking it",
      night: "Visible at night"
    }
  },
  savedScreens: {
    title: "Saved screens",
    subtitle: "Your favourite screens and screen groups, ready for your next campaign.",
    groups: "Screen groups",
    noGroups: 'No groups yet. While choosing screens for a campaign, tap "Save as a group" to reuse them later.',
    saved: "Saved screens",
    noSaved: "Tap the heart on any screen to save it here.",
    explore: "Explore screens",
    screenCount: "{count, plural, one {# screen} other {# screens}}",
    useInCampaign: "Use in a new campaign",
    rename: "Rename",
    save: "Save",
    delete: "Delete",
    deleteTitle: 'Delete "{name}"?',
    deleteHint: "The screens themselves aren't affected \u2014 only this group is removed.",
    loadFailed: "Couldn't load that group.",
    renameFailed: "Couldn't rename the group."
  },
  listingEditor: {
    title: "Listing details",
    hint: "Advertisers see these on your screen's card. Screens with more details are shown first. Changes go live right away.",
    where: "Where exactly",
    landmark: "Nearest landmark",
    landmarkPlaceholder: "e.g. Near Boring Road crossing",
    area: "Area / locality",
    areaPlaceholder: "e.g. Boring Road",
    pincode: "PIN code",
    locationCategory: "Type of location",
    audience: "Who passes by",
    traffic: "Traffic",
    peakFrom: "Busiest from",
    peakTo: "Busiest until",
    weekendFootfall: "Weekend footfall / day",
    dwell: "People stay (seconds)",
    displayType: "Screen type",
    sizeInches: "Size (inches, H \xD7 W)",
    brightness: "Brightness (nits)",
    viewingDistance: "Seen from (metres)",
    angle: "Visible across (degrees)",
    facing: "Facing",
    visibleAtNight: "Visible at night",
    obstructions: "Anything blocking the view?",
    obstructionsPlaceholder: "e.g. A tree partly covers it from the left",
    save: "Save details",
    saving: "Saving\u2026",
    saved: "Listing details saved.",
    saveFailed: "Couldn't save. Please try again."
  },
  commandCenter: {
    liveTitle: "Live performance",
    completedTitle: "Campaign completed",
    dayOf: "Day {day} of {total}",
    tiles: {
      screens: "Screens",
      online: "Online now",
      plays: "Ad plays",
      views: "Estimated views",
      spend: "Spent so far",
      remaining: "Remaining",
      delivery: "Delivery",
      paid: "Amount paid"
    },
    downloadReport: "Download campaign report",
    downloading: "Downloading\u2026",
    downloadFailed: "Couldn't download. Please try again.",
    estimateNote: "Plays are counted by the screens themselves. Views are an estimate from each screen's footfall.",
    byScreen: "Screen by screen",
    table: {
      screen: "Screen",
      status: "Status",
      plays: "Plays",
      views: "Est. views"
    },
    screenStatus: {
      ONLINE: "Online",
      OFFLINE: "Offline",
      NOT_CONNECTED: "Not connected yet"
    },
    offline: {
      title: "{screen} is offline",
      body: "It has been offline for {minutes} minutes. CASTADI is monitoring the issue.",
      impact: "About {plays} plays may be affected so far \u2014 we'll make good on them under our policy."
    },
    progress: {
      title: "What's happening with your campaign",
      steps: {
        paid: "Payment received",
        adCheck: "Ad check",
        scheduled: "Scheduled",
        live: "Live"
      },
      rejected: "Your ad needs changes before it can run. Please upload a new one \u2014 your payment and screens are kept.",
      replaceAd: "Upload a new ad",
      hint: {
        PAYMENT_RECEIVED: "Upload your ad so our team can check it.",
        UNDER_REVIEW: "Our team is checking your ad. This usually takes a few hours.",
        APPROVED: "Your ad is approved. We're putting it on your screens.",
        SCHEDULED: "All set. Your ad starts playing on your start date.",
        LIVE: "Your ad is playing now."
      }
    }
  },
  proofOfPlay: {
    title: "Proof of Play",
    subtitle: "Every day, on every screen, how many times your ad played in full.",
    pdf: "Download PDF",
    csv: "CSV",
    downloading: "Downloading\u2026",
    downloadFailed: "Couldn't download. Please try again.",
    empty: "Nothing has played yet. Plays show up here as soon as your ad starts running.",
    totals: "{plays} verified plays on {screens, plural, one {# screen} other {# screens}} over {days, plural, one {# day} other {# days}}",
    date: "Date",
    screen: "Screen",
    plays: "Plays",
    status: "Status",
    verified: "Verified",
    notVerified: "Not verified",
    showMore: "Show more ({count} left)",
    pageSubtitle: "Download proof that your ads played, for every campaign that has run.",
    noneYet: "None of your campaigns has played yet. Proof of Play appears here once one goes live.",
    createCampaign: "Create a campaign"
  },
  nav: {
    dashboard: "Dashboard",
    create: "Create Campaign",
    screens: "Explore Screens",
    campaigns: "My Campaigns",
    analytics: "Analytics",
    proofOfPlay: "Proof of Play",
    billing: "Wallet & Billing",
    saved: "Saved Screens",
    company: "Company Profile",
    notifications: "Notifications",
    quotations: "Quotations"
  },
  dashboard: {
    create: "Create a campaign",
    createHint: "Pick screens, upload your ad and pay \u2014 in 5 simple steps.",
    intro: {
      title: "How CASTADI works",
      subtitle: "Put your ad on digital screens near your customers in three steps.",
      close: "Close",
      choose: {
        title: "Choose screens",
        body: "Find screens by area or landmark and see who passes by."
      },
      upload: {
        title: "Upload your ad and pay",
        body: "A picture or video, your dates, how often it plays \u2014 one clear price."
      },
      track: {
        title: "See it run",
        body: "Track plays live and download proof that your ad played."
      }
    },
    tiles: {
      active: "Live campaigns",
      scheduled: "Coming up",
      completed: "Completed",
      spend: "Total spend",
      plays: "Total ad plays",
      views: "Estimated views",
      screensNow: "Screens online / scheduled today"
    },
    pending: {
      title: "Waiting for you",
      DRAFT: {
        what: "You haven't finished setting this up.",
        cta: "Continue"
      },
      PAYMENT_PENDING: {
        what: "Ready to go \u2014 just pay to launch it.",
        cta: "Pay now"
      },
      PAYMENT_RECEIVED: {
        what: "Paid \u2014 upload your ad so it can run.",
        cta: "Upload ad"
      },
      REJECTED: {
        what: "Your ad needs changes before it can run.",
        cta: "Upload new ad"
      }
    },
    recent: {
      title: "Your campaigns",
      all: "See all",
      empty: "No campaigns yet. Create your first one above."
    }
  },
  company: {
    title: "Company profile",
    subtitle: "Your business details, team, account and help.",
    tabs: {
      business: "Business & KYC",
      team: "Team",
      account: "My account",
      help: "Help & support"
    }
  },
  quotations: {
    status: {
      SUBMITTED: "Awaiting Review",
      COUNTERED: "Counter-Offer",
      APPROVED: "Approved",
      REJECTED: "Rejected",
      PAYMENT_SUBMITTED: "Payment Submitted",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled"
    },
    action: {
      SUBMITTED: "Quotation Requested",
      COUNTERED: "Counter-Offer Sent",
      ACCEPTED: "Counter-Offer Accepted",
      APPROVED: "Quotation Approved",
      REJECTED: "Quotation Rejected",
      REOPENED: "Reopened for Revision",
      RECEIPT_SUBMITTED: "Payment Receipt Submitted",
      PAYMENT_REJECTED: "Payment Sent Back",
      COMPLETED: "Payment Verified \u2014 Completed",
      CANCELLED: "Cancelled",
      REVISION_OPENED: "Opened for Revision",
      REVISION_CLOSED: "Closed for Revision"
    },
    role: {
      ADVERTISER: "Advertiser",
      ADMIN: "CASTADI",
      SYSTEM: "System"
    },
    revision: "Revision {n}",
    updated: "Updated {date}",
    history: "Negotiation history ({count})",
    table: {
      mediaCost: "Screen Cost",
      platformFee: "CASTADI Platform Fee",
      gst: "GST",
      listTotal: "Order Total (List Price)",
      yourProposal: "Your Proposal",
      advertiserProposal: "Advertiser's Proposal",
      counterOffer: "CASTADI Counter-Offer",
      yourCounter: "Your Counter-Offer",
      totalPayment: "Total Payment Amount",
      revisedBadge: "Revised Quotation Amount",
      saving: "{amount} ({percent}) off the list price",
      above: "{amount} above the list price"
    },
    panel: {
      title: "Quotation",
      introRequired: "Orders of {amount} and above are paid through a quotation. Request one below \u2014 our team will review it, and you can negotiate until you agree on a price.",
      introOptional: "Need a custom price or want to pay offline? Request a quotation and negotiate with our team.",
      request: "Request Quotation",
      sendRevision: "Send Revision",
      cancel: "Cancel",
      reopen: "Reopen for Revision",
      proposeAnother: "Propose Another Amount",
      accept: "Accept {amount}",
      proposedLabel: "Your Proposed Amount (Optional)",
      proposedPlaceholder: "e.g. less than {amount}",
      proposedHint: "Prefilled with the order total \u2014 lower it to propose a custom price.",
      noteLabel: "Note for Our Team (Optional)",
      invalidAmount: "Enter a valid amount.",
      amountTooHigh: "Your proposal can't be more than the order total ({amount}).",
      stale: "Your order changed after this quotation was made. Reopen it to get the new order quoted.",
      receiptTitle: "Payment Receipt",
      receiptHint: "Pay CASTADI by bank transfer or UPI, then attach the receipt (PDF, JPG or PNG).",
      submitPayment: "Submit Payment of {amount}",
      submitting: "Submitting\u2026",
      viewCampaign: "View Campaign",
      failed: "Something went wrong. Please try again.",
      sentToast: "Quotation sent \u2014 we'll get back to you soon.",
      reopenedToast: "Revision sent to our team.",
      acceptedToast: "Counter-offer accepted.",
      paidToast: "Payment submitted for verification.",
      message: {
        SUBMITTED: "Our team is reviewing your quotation for {amount}. We'll email you when it's updated.",
        COUNTERED: "We've sent you a counter-offer of {amount}. Accept it or propose another amount.",
        APPROVED: "Approved at {amount}. Pay CASTADI this amount, upload the receipt and submit.",
        REJECTED: "This quotation was rejected. See the note in the history, then reopen it with a revised proposal.",
        PAYMENT_SUBMITTED: "Payment of {amount} submitted. We'll verify your receipt and confirm your campaign \u2014 your screens are held meanwhile.",
        COMPLETED: "Payment of {amount} verified. Your campaign is confirmed.",
        CANCELLED: "This quotation was cancelled."
      },
      offList: "That's {percent} off the list price of {list}.",
      revisionClosed: "Need changes? Ask CASTADI to open this quotation for revision.",
      revisionOpen: "This quotation is open for revision \u2014 you can propose a new amount.",
      exportPdf: "Download PDF",
      exportTxt: "Download .txt",
      paymentTitle: "Payment",
      viewPayment: "View Payment",
      viewInvoice: "View Invoice"
    },
    page: {
      title: "Quotations",
      description: "Every price you've negotiated with CASTADI, and where each one stands.",
      empty: "No quotations yet",
      emptyHint: "Request one from the Review & Payment step when creating a campaign.",
      campaign: "Campaign",
      listPrice: "List Price",
      current: "Quoted Amount",
      status: "Status",
      updated: "Last Updated",
      open: "Open",
      all: "All",
      active: "Open",
      closed: "Closed",
      previous: "Previous",
      next: "Next",
      pageOf: "Page {page} of {total}",
      receipt: "Receipt",
      quotation: "Quotation",
      printPdf: "Print / PDF",
      downloadTxt: "Download .txt",
      number: "Quotation No.",
      view: "View",
      viewInCampaign: "View in Campaign",
      search: "Search campaign or code"
    }
  },
  proofRequests: {
    status: {
      PENDING: "Requested",
      SUBMITTED: "Photo sent",
      VERIFIED: "Verified",
      OVERDUE: "Overdue",
      WAIVED: "Waived"
    },
    source: {
      AUTO_GO_LIVE: "Automatic request",
      ADVERTISER: "Requested by advertiser",
      PARTNER: "Sent by screen partner"
    },
    due: {
      overdue: "Overdue",
      hours: "Due in {count}h",
      days: "Due in {count}d"
    },
    matched: "Matches a logged playback",
    screen: {
      empty: "No ad is playing on this screen today, so there is nothing to photograph.",
      noRequest: "No request",
      answer: "Upload photo",
      volunteer: "Send a photo anyway",
      advertiserNote: "Advertiser note"
    },
    upload: {
      choose: "Take or choose photo",
      caption: "Optional note (e.g. 3pm slot, MG Road stop)",
      submit: "Send photo",
      uploading: "Sending\u2026",
      cancel: "Cancel",
      done: "Photo sent",
      failed: "Could not send the photo. Please try again.",
      badType: "Use a JPG or PNG photo.",
      tooLarge: "Photo is too large (max {mb}MB).",
      lockedHint: "Once sent, a photo cannot be edited or deleted."
    },
    campaign: {
      title: "Proof of play: photos",
      subtitle: "Photos of your ad running on each screen, sent by the screen partner. Ask for a fresh one any time.",
      empty: "Your ad is not live on a screen yet. Photo proof appears here once it is.",
      noneYet: "No photo yet. It is requested automatically once your ad starts playing.",
      request: "Ask for a photo",
      alreadyRequested: "Photo requested",
      notePlaceholder: "Optional note (e.g. evening slot)",
      send: "Send request",
      sending: "Sending\u2026",
      requested: "Request sent to the screen partner",
      requestFailed: "Could not send the request."
    },
    dashboard: {
      partnerTitle: "Photos to send",
      advertiserTitle: "Photo proof of your ads",
      adminTitle: "Overdue photo proof",
      counts: "{open} open, {overdue} overdue",
      waive: "Waive",
      waiveReason: "Reason for waiving",
      waiveConfirm: "Waive request",
      cancel: "Cancel",
      waived: "Request waived",
      waiveFailed: "Could not waive the request."
    }
  }
};

// src/i18n/hi.json
var hi_default = {
  common: {
    continue: "\u0906\u0917\u0947 \u092C\u0922\u093C\u0947\u0902",
    back: "\u092A\u0940\u091B\u0947",
    edit: "\u092C\u0926\u0932\u0947\u0902",
    save: "\u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
    close: "\u092C\u0902\u0926 \u0915\u0930\u0947\u0902",
    done: "\u0939\u094B \u0917\u092F\u093E",
    remove: "\u0939\u091F\u093E\u090F\u0901",
    view: "\u0926\u0947\u0916\u0947\u0902",
    loading: "\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
    retry: "\u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902",
    optional: "\u091C\u093C\u0930\u0942\u0930\u0940 \u0928\u0939\u0940\u0902",
    perDay: "/\u0926\u093F\u0928",
    perMonth: "/\u092E\u0939\u0940\u0928\u093E",
    estimated: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924",
    help: "\u092E\u0926\u0926",
    yes: "\u0939\u093E\u0901",
    no: "\u0928\u0939\u0940\u0902"
  },
  language: {
    label: "\u092D\u093E\u0937\u093E",
    en: "English",
    hi: "\u0939\u093F\u0902\u0926\u0940",
    switchTo: "\u092D\u093E\u0937\u093E \u092C\u0926\u0932\u0947\u0902"
  },
  campaignStatus: {
    DRAFT: {
      label: "\u0921\u094D\u0930\u093E\u092B\u093C\u094D\u091F",
      description: "\u0906\u092A\u0928\u0947 \u092F\u0939 \u0915\u0948\u0902\u092A\u0947\u0928 \u0905\u092D\u0940 \u092A\u0942\u0930\u093E \u0928\u0939\u0940\u0902 \u0915\u093F\u092F\u093E \u0939\u0948\u0964"
    },
    PAYMENT_PENDING: {
      label: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092C\u093E\u0915\u0940",
      description: "\u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0964 \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092D\u0941\u0917\u0924\u093E\u0928 \u092A\u0942\u0930\u093E \u0915\u0930\u0947\u0902\u0964"
    },
    PAYMENT_RECEIVED: {
      label: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u093F\u0932 \u0917\u092F\u093E",
      description: "\u0939\u092E\u0947\u0902 \u0906\u092A\u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u093F\u0932 \u0917\u092F\u093E \u0939\u0948\u0964 \u0905\u0917\u0930 \u0905\u092D\u0940 \u0924\u0915 \u0928\u0939\u0940\u0902 \u0915\u093F\u092F\u093E \u0939\u0948, \u0924\u094B \u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902\u0964"
    },
    UNDER_REVIEW: {
      label: "\u091C\u093E\u0901\u091A \u091A\u0932 \u0930\u0939\u0940 \u0939\u0948",
      description: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091C\u093E\u0901\u091A \u0930\u0939\u0940 \u0939\u0948\u0964 \u0907\u0938\u092E\u0947\u0902 \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0915\u0941\u091B \u0918\u0902\u091F\u0947 \u0932\u0917\u0924\u0947 \u0939\u0948\u0902\u0964"
    },
    APPROVED: {
      label: "\u092E\u0902\u091C\u093C\u0942\u0930",
      description: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092E\u0902\u091C\u093C\u0942\u0930 \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964"
    },
    SCHEDULED: {
      label: "\u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0939\u094B \u0917\u092F\u093E",
      description: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0936\u0941\u0930\u0942 \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0938\u0947 \u091A\u0932\u0928\u093E \u0936\u0941\u0930\u0942 \u0939\u094B\u0917\u093E\u0964"
    },
    LIVE: {
      label: "\u091A\u0932 \u0930\u0939\u093E \u0939\u0948",
      description: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092D\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u091A\u0932 \u0930\u0939\u093E \u0939\u0948\u0964"
    },
    PAUSED: {
      label: "\u0930\u0941\u0915\u093E \u0939\u0941\u0906",
      description: "\u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u0905\u092D\u0940 \u0915\u0947 \u0932\u093F\u090F \u0930\u0941\u0915\u093E \u0939\u0941\u0906 \u0939\u0948\u0964"
    },
    COMPLETED: {
      label: "\u092A\u0942\u0930\u093E \u0939\u0941\u0906",
      description: "\u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u092A\u0942\u0930\u093E \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964 \u0906\u092A\u0915\u0940 \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0964"
    },
    REJECTED: {
      label: "\u0905\u0938\u094D\u0935\u0940\u0915\u093E\u0930",
      description: "\u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092E\u0947\u0902 \u092C\u0926\u0932\u093E\u0935 \u091C\u093C\u0930\u0942\u0930\u0940 \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0928\u092F\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902\u0964"
    },
    CANCELLED: {
      label: "\u0930\u0926\u094D\u0926",
      description: "\u092F\u0939 \u0915\u0948\u0902\u092A\u0947\u0928 \u0930\u0926\u094D\u0926 \u0915\u0930 \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948\u0964"
    }
  },
  glossary: {
    ad: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928",
    yourAd: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928",
    screens: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
    estimatedViews: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u094D\u092F\u0942\u091C\u093C",
    plays: "\u092C\u093E\u0930 \u091A\u0932\u093E",
    playsPerDay: "\u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928 \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u0947\u0917\u093E",
    campaignId: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0906\u0908\u0921\u0940",
    proofOfPlay: "\u092A\u094D\u0930\u0942\u092B\u093C \u0911\u092B\u093C \u092A\u094D\u0932\u0947"
  },
  objective: {
    BRAND_AWARENESS: "\u092C\u094D\u0930\u093E\u0902\u0921 \u0915\u0940 \u092A\u0939\u091A\u093E\u0928 \u092C\u0922\u093C\u093E\u0928\u093E",
    PRODUCT_LAUNCH: "\u0928\u092F\u093E \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u091F \u0932\u0949\u0928\u094D\u091A",
    OFFER_PROMOTION: "\u0911\u092B\u093C\u0930 / \u091B\u0942\u091F",
    STORE_TRAFFIC: "\u0926\u0941\u0915\u093E\u0928 \u092A\u0930 \u0917\u094D\u0930\u093E\u0939\u0915 \u0932\u093E\u0928\u093E",
    EVENT_PROMOTION: "\u0907\u0935\u0947\u0902\u091F",
    NEW_BUSINESS_LAUNCH: "\u0928\u092F\u093E \u092C\u093F\u091C\u093C\u0928\u0947\u0938 \u0936\u0941\u0930\u0942",
    LEAD_GENERATION: "\u0928\u090F \u0917\u094D\u0930\u093E\u0939\u0915 (\u0932\u0940\u0921) \u092A\u093E\u0928\u093E",
    OTHER: "\u0905\u0928\u094D\u092F",
    STORE_PROMOTION: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u092A\u094D\u0930\u091A\u093E\u0930",
    POLITICAL_CAMPAIGN: "\u0930\u093E\u091C\u0928\u0940\u0924\u093F\u0915 \u092A\u094D\u0930\u091A\u093E\u0930",
    PUBLIC_AWARENESS: "\u091C\u0928 \u091C\u093E\u0917\u0930\u0942\u0915\u0924\u093E",
    RECRUITMENT: "\u092D\u0930\u094D\u0924\u0940",
    GOVERNMENT_ANNOUNCEMENT: "\u0938\u0930\u0915\u093E\u0930\u0940 \u0938\u0942\u091A\u0928\u093E",
    FESTIVAL_CAMPAIGN: "\u0924\u094D\u092F\u094B\u0939\u093E\u0930 \u0915\u0948\u0902\u092A\u0947\u0928",
    SEASONAL_PROMOTION: "\u092E\u094C\u0938\u092E\u0940 \u092A\u094D\u0930\u091A\u093E\u0930"
  },
  builder: {
    title: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u090F\u0901",
    subtitle: "\u092A\u093E\u0901\u091A \u0906\u0938\u093E\u0928 \u0915\u0926\u092E\u0964 \u0906\u092A\u0915\u093E \u0915\u093E\u092E \u0938\u093E\u0925-\u0938\u093E\u0925 \u0938\u0947\u0935 \u0939\u094B\u0924\u093E \u0930\u0939\u0924\u093E \u0939\u0948\u0964",
    steps: {
      "1": "\u091C\u093E\u0928\u0915\u093E\u0930\u0940",
      "2": "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928",
      "3": "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      "4": "\u0938\u092E\u092F",
      "5": "\u091C\u093E\u0901\u091A\u0947\u0902 \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928",
      aria: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0915\u0926\u092E",
      progress: "\u091A\u0930\u0923 {current} / {total}",
      next: "\u0906\u0917\u0947: {step}"
    },
    summary: {
      screens: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      plays: "\u092C\u093E\u0930 \u091A\u0932\u0947\u0917\u093E",
      views: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u094D\u092F\u0942\u091C\u093C",
      total: "\u0915\u0941\u0932"
    },
    details: {
      name: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u093E \u0928\u093E\u092E",
      nameHint: "\u092F\u0939 \u0938\u093F\u0930\u094D\u092B\u093C \u0906\u092A\u0915\u094B \u0926\u093F\u0916\u0947\u0917\u093E\u0964 \u0909\u0926\u093E\u0939\u0930\u0923: \u0926\u093F\u0935\u093E\u0932\u0940 \u0915\u0948\u0902\u092A\u0947\u0928 2026",
      namePlaceholder: "\u091C\u0948\u0938\u0947 \u0926\u093F\u0935\u093E\u0932\u0940 \u0915\u0948\u0902\u092A\u0947\u0928 2026",
      brand: "\u092C\u094D\u0930\u093E\u0902\u0921 \u092F\u093E \u092C\u093F\u091C\u093C\u0928\u0947\u0938 \u0915\u093E \u0928\u093E\u092E",
      brandHint: "\u0935\u0939 \u0928\u093E\u092E \u091C\u093F\u0938\u0938\u0947 \u0932\u094B\u0917 \u0906\u092A\u0915\u094B \u091C\u093E\u0928\u0924\u0947 \u0939\u0948\u0902\u0964",
      brandPlaceholder: "\u091C\u0948\u0938\u0947 \u0924\u093E\u091C\u092C\u093E\u0930\u0940",
      objective: "\u092F\u0939 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u093F\u0938\u0932\u093F\u090F \u0939\u0948?",
      objectiveHint: "\u091C\u094B \u0938\u092C\u0938\u0947 \u0938\u0939\u0940 \u0932\u0917\u0947, \u0935\u0939 \u091A\u0941\u0928\u0947\u0902\u0964",
      description: "\u0915\u0941\u091B \u0914\u0930 \u092C\u0924\u093E\u0928\u093E \u0939\u0948?",
      descriptionHint: "\u0905\u092A\u0928\u0947 \u0911\u092B\u093C\u0930 \u092F\u093E \u0907\u0935\u0947\u0902\u091F \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u091B\u094B\u091F\u0940-\u0938\u0940 \u092C\u093E\u0924\u0964",
      descriptionPlaceholder: "\u091C\u0948\u0938\u0947 \u0907\u0938 \u0926\u093F\u0935\u093E\u0932\u0940 \u0938\u092D\u0940 \u092E\u093F\u0920\u093E\u0907\u092F\u094B\u0902 \u092A\u0930 20% \u091B\u0942\u091F",
      saveFailed: "\u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
      errors: {
        nameRequired: "\u0915\u0943\u092A\u092F\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u093E \u0928\u093E\u092E \u0932\u093F\u0916\u0947\u0902\u0964",
        nameTooLong: "\u092F\u0939 \u0928\u093E\u092E \u092C\u0939\u0941\u0924 \u0932\u0902\u092C\u093E \u0939\u0948\u0964",
        brandTooLong: "\u092F\u0939 \u092C\u094D\u0930\u093E\u0902\u0921 \u0928\u093E\u092E \u092C\u0939\u0941\u0924 \u0932\u0902\u092C\u093E \u0939\u0948\u0964",
        objectiveRequired: "\u0915\u0943\u092A\u092F\u093E \u091A\u0941\u0928\u0947\u0902 \u0915\u093F \u092F\u0939 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u093F\u0938\u0932\u093F\u090F \u0939\u0948\u0964",
        descriptionTooLong: "\u0915\u0943\u092A\u092F\u093E 1,000 \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0938\u0947 \u0915\u092E \u0932\u093F\u0916\u0947\u0902\u0964",
        targetAudienceOtherTooLong: "\u0915\u0943\u092A\u092F\u093E 160 \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0938\u0947 \u0915\u092E \u0932\u093F\u0916\u0947\u0902\u0964",
        preferredCitiesTooMany: "\u0906\u092A \u0905\u0927\u093F\u0915\u0924\u092E 10 \u0936\u0939\u0930 \u091C\u094B\u0921\u093C \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
        preferredScreenTypesTooMany: "\u0906\u092A \u0905\u0927\u093F\u0915\u0924\u092E 10 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u094D\u0930\u0915\u093E\u0930 \u091A\u0941\u0928 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
        totalBudgetInvalid: "\u0915\u0943\u092A\u092F\u093E \u0938\u0939\u0940 \u0930\u093E\u0936\u093F \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964",
        targetAgeRangeIncomplete: "\u0915\u092E \u0938\u0947 \u0915\u092E \u0914\u0930 \u0905\u0927\u093F\u0915\u0924\u092E, \u0926\u094B\u0928\u094B\u0902 \u0909\u092E\u094D\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964",
        targetAgeRangeInvalid: "\u0905\u0927\u093F\u0915\u0924\u092E \u0909\u092E\u094D\u0930 \u0915\u092E \u0938\u0947 \u0915\u092E \u0909\u092E\u094D\u0930 \u0915\u0947 \u092C\u0930\u093E\u092C\u0930 \u092F\u093E \u0909\u0938\u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0939\u094B\u0928\u0940 \u091A\u093E\u0939\u093F\u090F\u0964"
      },
      targetAudience: "\u092F\u0939 \u0915\u093F\u0928\u0915\u0947 \u0932\u093F\u090F \u0939\u0948?",
      targetAudienceHint: "\u091C\u093F\u0924\u0928\u0947 \u0932\u093E\u0917\u0942 \u0939\u094B\u0902 \u091A\u0941\u0928\u0947\u0902 \u2014 \u092F\u0939 \u0938\u093F\u0930\u094D\u092B\u093C \u0906\u092A\u0915\u0940 \u092F\u094B\u091C\u0928\u093E \u0915\u0947 \u0932\u093F\u090F \u0939\u0948, \u0907\u0938\u0938\u0947 \u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u094B \u0926\u0947\u0916\u0928\u0947 \u0935\u093E\u0932\u0947 \u0938\u0940\u092E\u093F\u0924 \u0928\u0939\u0940\u0902 \u0939\u094B\u0924\u0947\u0964",
      targetAudienceOtherPlaceholder: "\u092C\u0924\u093E\u090F\u0902 \u0906\u092A \u0915\u093F\u0938\u0947 \u0932\u0915\u094D\u0937\u093F\u0924 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902",
      ageMin: "\u0915\u092E \u0938\u0947 \u0915\u092E \u0909\u092E\u094D\u0930",
      ageMax: "\u0905\u0927\u093F\u0915\u0924\u092E \u0909\u092E\u094D\u0930",
      preferredCities: "\u092A\u0938\u0902\u0926\u0940\u0926\u093E \u0936\u0939\u0930",
      preferredCitiesHint: "\u091C\u093F\u0928 \u0936\u0939\u0930\u094B\u0902 \u092A\u0930 \u0906\u092A \u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902, \u0938\u093F\u0930\u094D\u092B\u093C \u0906\u092A\u0915\u0940 \u092F\u094B\u091C\u0928\u093E \u0915\u0947 \u0932\u093F\u090F\u0964",
      preferredCitiesPlaceholder: "\u0936\u0939\u0930 \u091F\u093E\u0907\u092A \u0915\u0930\u0947\u0902 \u0914\u0930 Enter \u0926\u092C\u093E\u090F\u0901",
      preferredScreenTypes: "\u092A\u0938\u0902\u0926\u0940\u0926\u093E \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u094D\u0930\u0915\u093E\u0930",
      preferredScreenTypesHint: "\u091C\u093F\u0928 \u0924\u0930\u0939 \u0915\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u094B\u0902 \u092A\u0930 \u0906\u092A \u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902\u0964",
      budget: "\u092C\u091C\u091F",
      budgetHint: "\u0938\u093F\u0930\u094D\u092B\u093C \u0906\u092A\u0915\u0947 \u0938\u0902\u0926\u0930\u094D\u092D \u0915\u0947 \u0932\u093F\u090F \u2014 \u0906\u092A \u0935\u093E\u0938\u094D\u0924\u0935 \u092E\u0947\u0902 \u091C\u094B \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902\u0917\u0947 \u0935\u0939 \u091A\u0947\u0915\u0906\u0909\u091F \u092A\u0930 \u0924\u092F \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
    },
    upload: {
      dropTitle: "\u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092F\u0939\u093E\u0901 \u0926\u092C\u093E\u090F\u0901",
      dropHint: "\u092F\u093E \u0915\u094B\u0908 \u092B\u093C\u094B\u091F\u094B \u092F\u093E \u0935\u0940\u0921\u093F\u092F\u094B \u092F\u0939\u093E\u0901 \u0916\u0940\u0902\u091A\u0915\u0930 \u091B\u094B\u0921\u093C\u0947\u0902\u0964",
      formats: "{formats} \xB7 {mb} MB \u0924\u0915 \xB7 \u0935\u0940\u0921\u093F\u092F\u094B {seconds} \u0938\u0947\u0915\u0902\u0921 \u0924\u0915",
      uploading: "\u0905\u092A\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
      uploaded: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0939\u094B \u0917\u092F\u093E\u0964",
      uploadFailed: "\u0905\u092A\u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u0941\u0906\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
      wrongFormat: "\u092F\u0939 \u092B\u093C\u093E\u0907\u0932 \u0928\u0939\u0940\u0902 \u091A\u0932\u0947\u0917\u0940\u0964 {formats} \u0907\u0938\u094D\u0924\u0947\u092E\u093E\u0932 \u0915\u0930\u0947\u0902\u0964",
      tooBig: "\u092F\u0939 \u092B\u093C\u093E\u0907\u0932 {mb} MB \u0938\u0947 \u092C\u0921\u093C\u0940 \u0939\u0948\u0964",
      tooLong: "\u0935\u0940\u0921\u093F\u092F\u094B \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E {seconds} \u0938\u0947\u0915\u0902\u0921 \u0915\u093E \u0939\u094B \u0938\u0915\u0924\u093E \u0939\u0948\u0964",
      allGood: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0920\u0940\u0915 \u0939\u0948",
      allGoodHint: "\u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u091A\u0932\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0964",
      needsAttention: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932 \u0938\u0915\u0924\u093E \u0939\u0948, \u092A\u0930 \u0907\u0938\u0947 \u0926\u0947\u0916 \u0932\u0947\u0902",
      needsAttentionHint: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u092F\u0939 \u0936\u093E\u092F\u0926 \u0909\u0924\u0928\u093E \u0905\u091A\u094D\u091B\u093E \u0928 \u0926\u093F\u0916\u0947\u0964",
      checks: {
        format: {
          ok: "\u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F: {format}",
          warn: "\u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F: {format}"
        },
        size: {
          ok: "\u092B\u093C\u093E\u0907\u0932 \u0938\u093E\u0907\u091C\u093C: {mb} MB",
          warn: "\u092B\u093C\u093E\u0907\u0932 \u0938\u093E\u0907\u091C\u093C: {mb} MB \u2014 \u092C\u0939\u0941\u0924 \u092C\u0921\u093C\u0940"
        },
        resolution: {
          ok: "\u0924\u0938\u094D\u0935\u0940\u0930 \u0915\u0940 \u0915\u094D\u0935\u093E\u0932\u093F\u091F\u0940: {width} \xD7 {height}",
          warn: "\u0924\u0938\u094D\u0935\u0940\u0930 \u0915\u0940 \u0915\u094D\u0935\u093E\u0932\u093F\u091F\u0940 \u0915\u092E \u0939\u0948 ({width} \xD7 {height}) \u2014 \u0927\u0941\u0902\u0927\u0932\u0940 \u0926\u093F\u0916 \u0938\u0915\u0924\u0940 \u0939\u0948"
        },
        orientation: {
          ok: "\u0906\u0915\u093E\u0930: {shape}",
          warn: "\u0906\u0915\u093E\u0930: {shape}"
        },
        length: {
          ok: "\u0932\u0902\u092C\u093E\u0908: {seconds} \u0938\u0947\u0915\u0902\u0921",
          warn: "\u0932\u0902\u092C\u093E\u0908: {seconds} \u0938\u0947\u0915\u0902\u0921 \u2014 \u092C\u0939\u0941\u0924 \u0932\u0902\u092C\u093E"
        }
      },
      shapes: {
        landscape: "\u091A\u094C\u0921\u093C\u093E (\u0932\u0948\u0902\u0921\u0938\u094D\u0915\u0947\u092A)",
        portrait: "\u0932\u0902\u092C\u093E (\u092A\u094B\u0930\u094D\u091F\u094D\u0930\u0947\u091F)",
        square: "\u091A\u094C\u0915\u094B\u0930"
      },
      reviewNote: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0939\u0930 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u094B \u0932\u093E\u0907\u0935 \u0939\u094B\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u091C\u093E\u0901\u091A\u0924\u0940 \u0939\u0948, \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0915\u0941\u091B \u0918\u0902\u091F\u094B\u0902 \u092E\u0947\u0902\u0964",
      replace: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092C\u0926\u0932\u0947\u0902",
      addAnother: "\u090F\u0915 \u0914\u0930 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091C\u094B\u0921\u093C\u0947\u0902",
      count: "{count}/{max} \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091C\u094B\u0921\u093C\u0947 \u0917\u090F",
      atCap: "\u0907\u0938 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0932\u093F\u090F {max}-\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u0940 \u0938\u0940\u092E\u093E \u092A\u0942\u0930\u0940 \u0939\u094B \u0917\u0908 \u0939\u0948\u0964",
      mixedLength: "\u092F\u0939 \u0935\u0940\u0921\u093F\u092F\u094B {seconds} \u0938\u0947\u0915\u0902\u0921 \u0915\u093E \u0939\u0948, \u092A\u0930 \u0906\u092A\u0915\u093E \u0926\u0942\u0938\u0930\u093E \u0935\u0940\u0921\u093F\u092F\u094B {expected} \u0938\u0947\u0915\u0902\u0921 \u0915\u093E \u0939\u0948\u0964 \u090F\u0915 \u0939\u0940 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0938\u092D\u0940 \u0935\u0940\u0921\u093F\u092F\u094B \u090F\u0915 \u091C\u0948\u0938\u0940 \u0932\u0902\u092C\u093E\u0908 \u0915\u0947 \u0939\u094B\u0928\u0947 \u091A\u093E\u0939\u093F\u090F\u0964"
    },
    screens: {
      pickOne: "\u0915\u092E \u0938\u0947 \u0915\u092E \u090F\u0915 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0947\u0902",
      fit: {
        fits: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0907\u0938 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0920\u0940\u0915 \u092C\u0948\u0920\u0924\u093E \u0939\u0948",
        bars: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0920\u0940\u0915 \u092C\u0948\u0920\u0924\u093E \u0939\u0948, \u0915\u093F\u0928\u093E\u0930\u094B\u0902 \u092A\u0930 \u0925\u094B\u0921\u093C\u0940 \u0916\u093E\u0932\u0940 \u091C\u0917\u0939 \u0930\u0939\u0947\u0917\u0940",
        rotated: "\u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0902: \u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u093E \u0906\u0915\u093E\u0930 \u0907\u0938 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0938\u0947 \u092E\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093E\u0924\u093E",
        rotatedSummary: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u0947 \u0906\u0915\u093E\u0930 \u0938\u0947 \u092E\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093E\u0924\u0940} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u0947 \u0906\u0915\u093E\u0930 \u0938\u0947 \u092E\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093E\u0924\u0940\u0902}}"
      },
      match: {
        allRun: "{count, plural, one {\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0907\u0938 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u091A\u0932\u0947\u0917\u093E} other {\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0938\u092D\u0940 # \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u091A\u0932\u0947\u0917\u093E}}",
        capacity: "\u090F\u0915 \u0938\u092E\u092F \u092E\u0947\u0902 {count} \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0924\u0915",
        bestMatch: "\u0938\u092C\u0938\u0947 \u0909\u092A\u092F\u0941\u0915\u094D\u0924",
        scoreOf: "{score}/100",
        emptyHint: "\u0938\u0942\u091A\u0940 \u0938\u0947 \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u0947\u0902 \u091A\u0941\u0928\u0947\u0902 \u0924\u093E\u0915\u093F \u0909\u0928 \u092A\u0930 \u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0926\u0947\u0916 \u0938\u0915\u0947\u0902 \u0914\u0930 \u0909\u0928\u0915\u0947 \u0906\u0901\u0915\u0921\u093C\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930 \u0938\u0915\u0947\u0902\u0964",
        compare: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0947\u0902",
        comparisonTitle: "\u0905\u092A\u0928\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u094B\u0902 \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0947\u0902",
        comparisonHint: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u0947\u0902}}, \u0938\u092C\u0938\u0947 \u0909\u092A\u092F\u0941\u0915\u094D\u0924 \u092A\u0939\u0932\u0947",
        checkAvailability: "\u0909\u092A\u0932\u092C\u094D\u0927\u0924\u093E \u0926\u0947\u0916\u0947\u0902",
        availabilityTitle: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0940 \u0909\u092A\u0932\u092C\u094D\u0927\u0924\u093E",
        availabilityHint: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u0947\u0902}} \u2014 \u091F\u0915\u0930\u093E\u0935 \u091C\u093E\u0901\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090A\u092A\u0930 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u091A\u0941\u0928\u0947\u0902\u0964",
        datesTitle: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u092C \u091A\u0932\u0947?",
        datesHint: "\u0905\u092D\u0940 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u091A\u0941\u0928\u0947\u0902 \u2014 \u0939\u092E \u0906\u092A\u0915\u0940 \u091A\u0941\u0928\u0940 \u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u094B \u0907\u0928\u0915\u0947 \u0939\u093F\u0938\u093E\u092C \u0938\u0947 \u091C\u093E\u0901\u091A\u0947\u0902\u0917\u0947, \u0905\u0917\u0932\u0947 \u0915\u0926\u092E \u092E\u0947\u0902 \u0906\u092A \u0907\u0928\u094D\u0939\u0947\u0902 \u0920\u0940\u0915 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
        availabilityBlocked: "\u091C\u093E\u0930\u0940 \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090A\u092A\u0930 \u0926\u0940 \u0917\u0908 \u0909\u092A\u0932\u092C\u094D\u0927\u0924\u093E \u0915\u0940 \u0938\u092E\u0938\u094D\u092F\u093E \u0920\u0940\u0915 \u0915\u0930\u0947\u0902, \u092F\u093E \u0905\u092A\u0928\u0940 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964",
        perDay: "{value}/\u0926\u093F\u0928",
        colScreen: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
        colMatch: "\u092E\u0948\u091A",
        colFit: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092B\u093C\u093F\u091F",
        colReach: "\u092A\u0939\u0941\u0901\u091A",
        colPrice: "\u0915\u093C\u0940\u092E\u0924",
        colHours: "\u0938\u092E\u092F",
        colShape: "\u0906\u0915\u093E\u0930",
        reason: {
          fillsScreen: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092A\u0942\u0930\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092D\u0930\u0924\u093E \u0939\u0948",
          highReach: "\u0905\u0927\u093F\u0915 \u0906\u0935\u093E\u091C\u093E\u0939\u0940",
          bestValue: "\u0915\u093C\u0940\u092E\u0924 \u0915\u0947 \u0939\u093F\u0938\u093E\u092C \u0938\u0947 \u092C\u0947\u0939\u0924\u0930\u0940\u0928",
          shapeMismatch: "\u0915\u093F\u0928\u093E\u0930\u094B\u0902 \u092A\u0930 \u092A\u091F\u094D\u091F\u093F\u092F\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u091A\u0932\u0947\u0917\u093E (\u0905\u0932\u0917 \u0906\u0915\u093E\u0930)"
        }
      }
    },
    schedule: {
      datesTitle: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u092C \u091A\u0932\u0947?",
      datesHint: "\u0936\u0941\u0930\u0942 \u0914\u0930 \u0916\u093C\u0924\u094D\u092E \u0939\u094B\u0928\u0947 \u0915\u0940 \u0924\u093E\u0930\u0940\u0916\u093C \u091A\u0941\u0928\u0947\u0902\u0964",
      days: "{count, plural, one {# \u0926\u093F\u0928} other {# \u0926\u093F\u0928}}",
      datesInvalid: "\u0915\u0943\u092A\u092F\u093E \u0906\u091C \u092F\u093E \u0909\u0938\u0915\u0947 \u092C\u093E\u0926 \u0915\u0940 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u091A\u0941\u0928\u0947\u0902\u0964",
      lengthTitle: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0915\u093F\u0924\u0928\u0940 \u0926\u0947\u0930 \u0926\u093F\u0916\u0947?",
      lengthVideo: "\u0906\u092A\u0915\u093E \u0935\u0940\u0921\u093F\u092F\u094B {seconds} \u0938\u0947\u0915\u0902\u0921 \u0915\u093E \u0939\u0948\u0964",
      lengthHint: "\u0906\u092A\u0915\u0940 \u092B\u093C\u094B\u091F\u094B \u0939\u0930 \u092C\u093E\u0930 \u0915\u093F\u0924\u0928\u0947 \u0938\u0947\u0915\u0902\u0921 \u0926\u093F\u0916\u0947?",
      seconds: "{seconds} \u0938\u0947\u0915\u0902\u0921",
      frequencyTitle: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u0947?",
      frequencyHint: "\u0939\u092E \u0907\u0938\u0947 \u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u091A\u0932\u0928\u0947 \u0915\u0940 \u0917\u093F\u0928\u0924\u0940 \u092E\u0947\u0902 \u092C\u0926\u0932 \u0926\u0947\u0924\u0947 \u0939\u0948\u0902\u0964",
      less: "\u0915\u092E \u092C\u093E\u0930",
      more: "\u091C\u093C\u094D\u092F\u093E\u0926\u093E \u092C\u093E\u0930",
      capNote: "\u0906\u092A\u0915\u0940 \u0915\u0941\u091B \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u090F\u0915 \u0938\u092E\u092F \u092E\u0947\u0902 \u090F\u0915 \u0939\u0940 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0926\u093F\u0916\u093E\u0924\u0940 \u0939\u0948\u0902, \u0907\u0938\u0932\u093F\u090F \u0935\u0939\u093E\u0901 \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092A\u0939\u0932\u0947 \u0938\u0947 \u092A\u0942\u0930\u0947 \u0926\u093F\u0928 \u091A\u0932\u0924\u093E \u0939\u0948 \u2014 \u0909\u0928\u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u092A\u0948\u0938\u093E \u0928\u0939\u0940\u0902 \u0932\u0917\u0947\u0917\u093E\u0964",
      saveFailed: "\u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
      levels: {
        popular: "\u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F",
        plays: "\u0930\u094B\u091C\u093C \u0915\u092E \u0938\u0947 \u0915\u092E {count} \u092C\u093E\u0930",
        priceMultiplier: "\u0938\u094D\u091F\u0948\u0902\u0921\u0930\u094D\u0921 \u0938\u0947 {times} \u0917\u0941\u0928\u093E \u0915\u0940\u092E\u0924",
        STANDARD: {
          title: "\u0938\u094D\u091F\u0948\u0902\u0921\u0930\u094D\u0921",
          description: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092A\u0942\u0930\u0947 \u0926\u093F\u0928 \u0928\u093F\u092F\u092E\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u091A\u0932\u0947\u0917\u093E\u0964"
        },
        HIGH: {
          title: "\u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0926\u093F\u0916\u0947",
          description: "\u0926\u094B\u0917\u0941\u0928\u0940 \u092C\u093E\u0930 \u2014 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0932\u094B\u0917 \u0926\u0947\u0916\u0947\u0902\u0917\u0947\u0964"
        },
        CUSTOM: {
          title: "\u0905\u092A\u0928\u0940 \u092A\u0938\u0902\u0926 \u0938\u0947",
          description: "\u0916\u093C\u0941\u0926 \u091A\u0941\u0928\u0947\u0902 \u0915\u093F \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u0947\u0964"
        }
      },
      availabilityTitle: "\u0915\u094D\u092F\u093E \u0906\u092A\u0915\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u0947\u0902 \u0907\u0928 \u0924\u093E\u0930\u0940\u0916\u093C\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0916\u093E\u0932\u0940 \u0939\u0948\u0902?",
      availabilityHint: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0939\u092E \u0906\u092A\u0915\u0940 \u091A\u0941\u0928\u0940 \u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u094B \u0907\u0928\u094D\u0939\u0940\u0902 \u0924\u093E\u0930\u0940\u0916\u093C\u094B\u0902 \u092A\u0930 \u091C\u093E\u0901\u091A\u0924\u0947 \u0939\u0948\u0902\u0964",
      availabilityToggle: "{count, plural, one {\u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u0947\u0916\u0947\u0902} other {\u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u0947\u0916\u0947\u0902}}",
      availabilityBlocked: "\u091C\u093E\u0930\u0940 \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090A\u092A\u0930 \u0926\u0940 \u0917\u0908 \u0909\u092A\u0932\u092C\u094D\u0927\u0924\u093E \u0915\u0940 \u0938\u092E\u0938\u094D\u092F\u093E \u0920\u0940\u0915 \u0915\u0930\u0947\u0902\u0964",
      capacityConflict: '"{screenName}" \u0907\u0928 \u0924\u093E\u0930\u0940\u0916\u093C\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092D\u0930\u0940 \u0939\u0941\u0908 \u0939\u0948',
      capacityDetail: "\u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u090F\u0915 \u0938\u092E\u092F \u092E\u0947\u0902 {max} \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0926\u093F\u0916\u093E \u0938\u0915\u0924\u0940 \u0939\u0948\u0964 {occupied} \u0938\u094D\u0932\u0949\u091F \u092A\u0939\u0932\u0947 \u0938\u0947 \u0905\u0928\u094D\u092F \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0932\u093F\u090F \u092C\u0941\u0915 \u0939\u0948\u0902, \u0914\u0930 \u0906\u092A\u0915\u0947 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u094B {yours} \u091A\u093E\u0939\u093F\u090F\u0964",
      capacityBadge: "{occupied} / {max} \u092D\u0930\u0947",
      removeScreen: "\u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0939\u091F\u093E\u090F\u0901"
    },
    review: {
      campaign: "\u0915\u0948\u0902\u092A\u0947\u0928",
      ad: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928",
      adLength: "\u0939\u0930 \u092C\u093E\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 {seconds} \u0938\u0947\u0915\u0902\u0921",
      screens: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928}}",
      locations: "\u091C\u0917\u0939\u0947\u0902: {places}",
      schedule: "\u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u0914\u0930 \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930",
      delivery: "\u0906\u092A\u0915\u094B \u0915\u094D\u092F\u093E \u092E\u093F\u0932\u0947\u0917\u093E",
      plays: "\u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u0947\u0917\u093E (\u0915\u092E \u0938\u0947 \u0915\u092E)",
      views: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u094D\u092F\u0942\u091C\u093C",
      estimateNote: "\u0935\u094D\u092F\u0942\u091C\u093C \u090F\u0915 \u0905\u0928\u0941\u092E\u093E\u0928 \u0939\u0948, \u091C\u094B \u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0947 \u092A\u093E\u0938 \u0938\u0947 \u0917\u0941\u091C\u093C\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0932\u094B\u0917\u094B\u0902 \u092A\u0930 \u0906\u0927\u093E\u0930\u093F\u0924 \u0939\u0948\u0964 \u0915\u0948\u0902\u092A\u0947\u0928 \u091A\u0932\u0928\u0947 \u0915\u0947 \u092C\u093E\u0926 \u0906\u092A\u0915\u094B \u0905\u0938\u0932\u0940 \u0917\u093F\u0928\u0924\u0940 \u0926\u093F\u0916\u0947\u0917\u0940\u0964",
      cost: "\u0915\u0940\u092E\u0924",
      mediaCost: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u093E \u0916\u093C\u0930\u094D\u091A",
      platformFee: "CASTADI \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u092B\u093C\u0940\u0938",
      gst: "GST",
      gstNone: "\u0932\u093E\u0917\u0942 \u0928\u0939\u0940\u0902",
      total: "\u0915\u0941\u0932 \u092D\u0941\u0917\u0924\u093E\u0928",
      noHiddenCharges: "\u0915\u094B\u0908 \u091B\u093F\u092A\u093E \u0939\u0941\u0906 \u091A\u093E\u0930\u094D\u091C \u0928\u0939\u0940\u0902\u0964",
      payWith: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093E \u0924\u0930\u0940\u0915\u093E",
      payOnline: "UPI, \u0915\u093E\u0930\u094D\u0921 \u092F\u093E \u0928\u0947\u091F \u092C\u0948\u0902\u0915\u093F\u0902\u0917",
      payOnlineHint: "Razorpay \u0938\u0947 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092D\u0941\u0917\u0924\u093E\u0928",
      payWallet: "CASTADI \u0935\u0949\u0932\u0947\u091F",
      walletBalance: "\u092C\u0948\u0932\u0947\u0902\u0938: {amount}",
      walletShort: "\u092C\u0948\u0932\u0947\u0902\u0938 {amount} \u2014 \u0915\u093E\u092B\u093C\u0940 \u0928\u0939\u0940\u0902",
      confirm: "\u092E\u0947\u0930\u0947 \u0926\u094D\u0935\u093E\u0930\u093E \u0926\u0940 \u0917\u0908 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0914\u0930 \u092E\u0947\u0930\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0938\u0939\u0940 \u0939\u0948\u0902\u0964",
      editCampaign: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0926\u0932\u0947\u0902",
      processing: "\u0915\u0943\u092A\u092F\u093E \u0930\u0941\u0915\u0947\u0902\u2026",
      submitForApproval: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092D\u0947\u091C\u0947\u0902",
      payAndLaunch: "{amount} \u092D\u0930\u0947\u0902 \u0914\u0930 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
      verifyFailed: "\u0939\u092E\u0947\u0902 \u0906\u092A\u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u093F\u0932 \u0917\u092F\u093E, \u092A\u0930 \u0939\u092E \u0909\u0938\u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0928\u0939\u0940\u0902 \u0915\u0930 \u092A\u093E\u090F\u0964 \u0915\u0943\u092A\u092F\u093E \u0938\u092A\u094B\u0930\u094D\u091F \u0938\u0947 \u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902 \u2014 \u0926\u094B\u092C\u093E\u0930\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0928 \u0915\u0930\u0947\u0902\u0964",
      paymentCancelled: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092A\u0942\u0930\u093E \u0928\u0939\u0940\u0902 \u0939\u0941\u0906\u0964 \u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u0938\u0947\u0935 \u0939\u0948 \u2014 \u0906\u092A \u0915\u092D\u0940 \u092D\u0940 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      payFailed: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0936\u0941\u0930\u0942 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
      documents: {
        title: "\u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C",
        quotationTitle: "\u0915\u094D\u0932\u093E\u0907\u0902\u091F \u0915\u093E \u0915\u094B\u091F\u0947\u0936\u0928",
        quotationHint: "{amount} \u0938\u0947 \u092C\u0921\u093C\u0947 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0932\u093F\u090F \u092E\u0902\u091C\u093C\u0942\u0930\u0940 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0915\u094D\u0932\u093E\u0907\u0902\u091F \u0915\u093E \u0915\u094B\u091F\u0947\u0936\u0928 \u091C\u094B\u0921\u093C\u0928\u093E \u091C\u093C\u0930\u0942\u0930\u0940 \u0939\u0948\u0964",
        quotationRequired: "\u0906\u0917\u0947 \u092C\u0922\u093C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u091F\u0947\u0936\u0928 \u091C\u094B\u0921\u093C\u0947\u0902\u0964",
        receiptTitle: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0930\u0938\u0940\u0926",
        receiptHint: "\u0906\u092A\u0928\u0947 \u091C\u094B \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093F\u092F\u093E \u0909\u0938\u0915\u093E \u092A\u094D\u0930\u092E\u093E\u0923 \u091C\u094B\u0921\u093C\u0947\u0902 \u2014 \u0932\u093E\u0907\u0935 \u0939\u094B\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0907\u0938\u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0917\u0940\u0964",
        add: "\u092B\u093C\u093E\u0907\u0932 \u091C\u094B\u0921\u093C\u0947\u0902",
        replace: "\u092C\u0926\u0932\u0947\u0902",
        remove: "\u0939\u091F\u093E\u090F\u0901",
        uploading: "\u0905\u092A\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
        formats: "PDF, JPG \u092F\u093E PNG \xB7 10 MB \u0924\u0915",
        uploadFailed: "\u0905\u092A\u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u093E\u0964 \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
        approvalNote: "\u092F\u0939 \u092C\u0921\u093C\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0932\u093E\u0907\u0935 \u0939\u094B\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0915\u094B\u091F\u0947\u0936\u0928 \u091C\u093E\u0901\u091A\u0947\u0917\u0940\u0964",
        optionalHint: "\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u2014 \u0905\u0917\u0930 \u0906\u092A\u0915\u0947 \u092A\u093E\u0938 \u0915\u094D\u0932\u093E\u0907\u0902\u091F \u0915\u093E \u0915\u094B\u091F\u0947\u0936\u0928 \u0939\u0948 \u0924\u094B \u091C\u094B\u0921\u093C\u0947\u0902\u0964",
        verificationNote: "\u0906\u092A\u0928\u0947 \u092A\u0939\u0932\u0947 \u0939\u0940 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930 \u0926\u093F\u092F\u093E \u0939\u0948, \u0907\u0938\u0932\u093F\u090F \u0932\u093E\u0907\u0935 \u0939\u094B\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0906\u092A\u0915\u0940 \u0930\u0938\u0940\u0926 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0917\u0940\u0964"
      },
      adsTitle: "{count, plural, one {\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928} other {\u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 (#)}}",
      bookingDates: "\u092C\u0941\u0915\u093F\u0902\u0917 \u0915\u0940 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902: {range}",
      slotHours: "{start}\u2013{end}",
      alreadyPaid: "\u092E\u0948\u0902 \u092A\u0939\u0932\u0947 \u0939\u0940 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930 \u091A\u0941\u0915\u093E \u0939\u0942\u0901",
      alreadyPaidHint: "\u091F\u0940\u092E \u0915\u094B \u0938\u0940\u0927\u0947 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093F\u092F\u093E \u2014 \u0905\u092A\u0928\u0940 \u0930\u0938\u0940\u0926 \u091C\u094B\u0921\u093C\u0947\u0902",
      submitForVerification: "\u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0947 \u0932\u093F\u090F \u092D\u0947\u091C\u0947\u0902",
      listTotal: "\u0938\u0942\u091A\u0940 \u092E\u0942\u0932\u094D\u092F",
      revisedQuotation: "\u0938\u0902\u0936\u094B\u0927\u093F\u0924 \u0915\u094B\u091F\u0947\u0936\u0928 \u0930\u093E\u0936\u093F",
      viewMore: "{count, plural, one {# \u0914\u0930 \u0926\u0947\u0916\u0947\u0902} other {# \u0914\u0930 \u0926\u0947\u0916\u0947\u0902}}"
    },
    launched: {
      paid: {
        title: "\u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0941\u0915 \u0939\u094B \u0917\u092F\u093E!",
        subtitle: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u093F\u0932 \u0917\u092F\u093E\u0964 \u0939\u092E \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091C\u093E\u0901\u091A\u0915\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u091A\u0932\u093E\u090F\u0901\u0917\u0947\u0964"
      },
      requested: {
        title: "\u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u092D\u0947\u091C \u0926\u093F\u092F\u093E \u0917\u092F\u093E",
        subtitle: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0917\u0940 \u0914\u0930 \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091C\u093E\u0901\u091A\u0947\u0917\u0940\u0964"
      },
      campaignId: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0906\u0908\u0921\u0940",
      nextSteps: "\u0906\u0917\u0947 \u0915\u094D\u092F\u093E \u0939\u094B\u0917\u093E",
      steps: {
        paymentReceived: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u093F\u0932 \u0917\u092F\u093E",
        submitted: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092D\u0947\u091C \u0926\u093F\u092F\u093E \u0917\u092F\u093E",
        paymentApproval: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F",
        adApproval: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0926\u094D\u0935\u093E\u0930\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u0940 \u091C\u093E\u0901\u091A",
        scheduling: "\u0906\u092A\u0915\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0936\u0947\u0921\u094D\u092F\u0942\u0932",
        live: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u093E\u0932\u0942"
      },
      notifyNote: "\u0939\u0930 \u0915\u0926\u092E \u092A\u0930 \u0939\u092E \u0906\u092A\u0915\u094B \u0938\u0942\u091A\u0928\u093E \u092D\u0947\u091C\u0947\u0902\u0917\u0947\u0964",
      viewCampaign: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0926\u0947\u0916\u0947\u0902",
      backToDashboard: "\u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921 \u092A\u0930 \u091C\u093E\u090F\u0901",
      approvalEta: "\u092E\u0902\u091C\u093C\u0942\u0930\u0940 \u092E\u0947\u0902 \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 2 \u0918\u0902\u091F\u0947 \u0924\u0915 \u0932\u0917\u0924\u0947 \u0939\u0948\u0902\u0964"
    },
    continueSetup: {
      title: "\u092F\u0939 \u0915\u0948\u0902\u092A\u0947\u0928 \u0905\u092D\u0940 \u091A\u093E\u0932\u0942 \u0928\u0939\u0940\u0902 \u0939\u0948",
      needsAd: "\u0906\u0917\u0947 \u092C\u0922\u093C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902\u0964",
      needsScreens: "\u0906\u0917\u0947 \u092C\u0922\u093C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0914\u0930 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u091A\u0941\u0928\u0947\u0902\u0964",
      needsPayment: "\u0938\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u0948 \u2014 \u092C\u0938 \u091C\u093E\u0901\u091A\u0947\u0902 \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902\u0964",
      cta: "\u0906\u0917\u0947 \u092C\u0922\u093C\u0947\u0902"
    }
  },
  listing: {
    locationCategory: {
      PREMIUM_COMMERCIAL: "\u092A\u094D\u0930\u0940\u092E\u093F\u092F\u092E \u0915\u092E\u0930\u094D\u0936\u093F\u092F\u0932",
      HIGH_STREET: "\u092E\u0941\u0916\u094D\u092F \u092C\u093E\u091C\u093C\u093E\u0930",
      BUSINESS_DISTRICT: "\u092C\u093F\u091C\u093C\u0928\u0947\u0938 \u0907\u0932\u093E\u0915\u093E",
      RESIDENTIAL: "\u0930\u093F\u0939\u093E\u092F\u0936\u0940",
      TRANSIT: "\u091F\u094D\u0930\u093E\u0902\u091C\u093C\u093F\u091F (\u0938\u094D\u091F\u0947\u0936\u0928/\u092C\u0938 \u0905\u0921\u094D\u0921\u093E)",
      RETAIL: "\u0930\u093F\u091F\u0947\u0932",
      TOURIST: "\u092A\u0930\u094D\u092F\u091F\u0928 \u0938\u094D\u0925\u0932",
      INSTITUTIONAL: "\u0938\u0902\u0938\u094D\u0925\u093E\u0928"
    },
    audience: {
      STUDENTS: "\u091B\u093E\u0924\u094D\u0930",
      PROFESSIONALS: "\u0928\u094C\u0915\u0930\u0940\u092A\u0947\u0936\u093E",
      FAMILIES: "\u092A\u0930\u093F\u0935\u093E\u0930",
      SHOPPERS: "\u0916\u093C\u0930\u0940\u0926\u093E\u0930",
      COMMUTERS: "\u0906\u0928\u0947-\u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947",
      TOURISTS: "\u092A\u0930\u094D\u092F\u091F\u0915"
    },
    traffic: {
      PEDESTRIAN: "\u091C\u093C\u094D\u092F\u093E\u0926\u093E\u0924\u0930 \u092A\u0948\u0926\u0932 \u0932\u094B\u0917",
      VEHICLE: "\u091C\u093C\u094D\u092F\u093E\u0926\u093E\u0924\u0930 \u0917\u093E\u0921\u093C\u093F\u092F\u093E\u0901",
      BOTH: "\u0932\u094B\u0917 \u0914\u0930 \u0917\u093E\u0921\u093C\u093F\u092F\u093E\u0901 \u0926\u094B\u0928\u094B\u0902"
    },
    displayType: {
      LCD: "LCD",
      LED: "LED",
      DIGITAL_BILLBOARD: "\u0921\u093F\u091C\u093F\u091F\u0932 \u092C\u093F\u0932\u092C\u094B\u0930\u094D\u0921"
    },
    facing: {
      ROAD_FACING: "\u0938\u0921\u093C\u0915 \u0915\u0940 \u0913\u0930",
      INDOOR_FACING: "\u0905\u0902\u0926\u0930 \u0915\u0940 \u0913\u0930"
    }
  },
  marketplace: {
    title: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0916\u094B\u091C\u0947\u0902",
    subtitle: "\u0907\u0932\u093E\u0915\u0947, \u0932\u0948\u0902\u0921\u092E\u093E\u0930\u094D\u0915 \u092F\u093E \u0936\u0939\u0930 \u0938\u0947 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0922\u0942\u0901\u0922\u0947\u0902, \u092B\u093F\u0930 \u0905\u092A\u0928\u0940 \u092A\u0938\u0902\u0926 \u0915\u0940 \u091A\u0941\u0928\u0947\u0902\u0964",
    advertisersOnly: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0938\u093F\u0930\u094D\u092B\u093C \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E \u0916\u093E\u0924\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0902\u0964",
    save: "\u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    unsave: "\u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0938\u0942\u091A\u0940 \u0938\u0947 \u0939\u091F\u093E\u090F\u0901",
    results: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928}}",
    listView: "\u0938\u0942\u091A\u0940",
    mapView: "\u0928\u0915\u094D\u0936\u093E",
    noResults: "\u092F\u0939\u093E\u0901 \u0915\u094B\u0908 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u0940",
    noResultsHint: "\u0915\u094B\u0908 \u0926\u0942\u0938\u0930\u093E \u0907\u0932\u093E\u0915\u093E, \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0926\u0942\u0930\u0940 \u092F\u093E \u0915\u092E \u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u0906\u091C\u093C\u092E\u093E\u090F\u0901\u0964",
    showMore: "\u0914\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u093F\u0916\u093E\u090F\u0901",
    card: {
      digitalDisplay: "\u0921\u093F\u091C\u093F\u091F\u0932 \u0921\u093F\u0938\u094D\u092A\u094D\u0932\u0947",
      available: "\u0909\u092A\u0932\u092C\u094D\u0927",
      unavailable: "\u0935\u094D\u092F\u0938\u094D\u0924",
      km: "{km} \u0915\u093F\u092E\u0940 \u0926\u0942\u0930",
      footfall: "\u0930\u094B\u091C\u093C\u093E\u0928\u093E \u092D\u0940\u0921\u093C",
      perDayValue: "{value}/\u0926\u093F\u0928",
      peak: "\u0938\u092C\u0938\u0947 \u0935\u094D\u092F\u0938\u094D\u0924 \u0938\u092E\u092F",
      hours: "\u091A\u093E\u0932\u0942",
      plays: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u092C\u093E\u0930",
      view: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u0947\u0916\u0947\u0902",
      select: "\u091A\u0941\u0928\u0947\u0902",
      selected: "\u091A\u0941\u0928\u0940 \u0917\u0908"
    },
    filters: {
      button: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930",
      title: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930",
      subtitle: "\u091C\u094B \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u091C\u093C\u0930\u0942\u0930\u0940 \u0939\u0948 \u0935\u0939 \u091A\u0941\u0928\u0947\u0902\u0964 \u0928\u0924\u0940\u091C\u0947 \u0924\u0941\u0930\u0902\u0924 \u092C\u0926\u0932\u0947\u0902\u0917\u0947\u0964",
      location: "\u091C\u0917\u0939 \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
      venue: "\u0938\u094D\u0925\u093E\u0928",
      audience: "\u0935\u0939\u093E\u0901 \u0915\u094C\u0928 \u0906\u0924\u093E \u0939\u0948",
      traffic: "\u092D\u0940\u0921\u093C",
      pedestrian: "\u091C\u093C\u094D\u092F\u093E\u0926\u093E \u092A\u0948\u0926\u0932 \u0932\u094B\u0917",
      vehicle: "\u091C\u093C\u094D\u092F\u093E\u0926\u093E \u0917\u093E\u0921\u093C\u093F\u092F\u093E\u0901",
      screen: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      indoor: "\u0905\u0902\u0926\u0930",
      outdoor: "\u092C\u093E\u0939\u0930",
      size: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u093E \u0938\u093E\u0907\u091C\u093C",
      sizeLabel: "{range} \u0907\u0902\u091A",
      budget: "\u0930\u094B\u091C\u093C \u0915\u093E \u092C\u091C\u091F",
      anyPrice: "\u0915\u094B\u0908 \u092D\u0940 \u0915\u0940\u092E\u0924",
      upTo: "\u0930\u094B\u091C\u093C {amount} \u0924\u0915",
      dates: "\u0907\u0928 \u0924\u093E\u0930\u0940\u0916\u093C\u094B\u0902 \u092A\u0930 \u0916\u093C\u093E\u0932\u0940",
      datesHint: "\u0938\u093F\u0930\u094D\u092B\u093C \u0935\u0939\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u093F\u0916\u093E\u090F\u0901 \u091C\u093F\u0928\u092E\u0947\u0902 \u0906\u092A\u0915\u0940 \u0924\u093E\u0930\u0940\u0916\u093C\u094B\u0902 \u092A\u0930 \u091C\u0917\u0939 \u0939\u0948\u0964",
      clear: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u0939\u091F\u093E\u090F\u0901",
      clearAll: "\u0916\u094B\u091C \u0914\u0930 \u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u0939\u091F\u093E\u090F\u0901",
      show: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u093F\u0916\u093E\u090F\u0901",
      showCount: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u093F\u0916\u093E\u090F\u0901} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u093F\u0916\u093E\u090F\u0901}}"
    },
    search: {
      placeholder: "\u0907\u0932\u093E\u0915\u093E, \u0932\u0948\u0902\u0921\u092E\u093E\u0930\u094D\u0915, \u0936\u0939\u0930 \u092F\u093E \u092A\u093F\u0928 \u0915\u094B\u0921",
      nearMe: "\u092E\u0947\u0930\u0947 \u092A\u093E\u0938",
      nearMeLabel: "\u0906\u092A\u0915\u0940 \u091C\u0917\u0939",
      locating: "\u0906\u092A\u0915\u0940 \u091C\u0917\u0939 \u0922\u0942\u0901\u0922 \u0930\u0939\u0947 \u0939\u0948\u0902\u2026",
      around: "{place} \u0915\u0947 \u0906\u0938\u092A\u093E\u0938",
      clearPlace: "\u091C\u0917\u0939 \u0939\u091F\u093E\u090F\u0901",
      within: "\u0926\u0942\u0930\u0940",
      km: "{km} \u0915\u093F\u092E\u0940"
    },
    selection: {
      count: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0940 \u0917\u0908} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0940 \u0917\u0908\u0902}}",
      empty: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0928\u0939\u0940\u0902 \u091A\u0941\u0928\u0940 \u0917\u0908",
      useGroup: "\u0938\u0947\u0935 \u0915\u093F\u092F\u093E \u0917\u094D\u0930\u0941\u092A \u0907\u0938\u094D\u0924\u0947\u092E\u093E\u0932 \u0915\u0930\u0947\u0902",
      yourGroups: "\u0906\u092A\u0915\u0947 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0917\u094D\u0930\u0941\u092A",
      groupAdded: "{name} \u0938\u0947 {count} \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091C\u094B\u0921\u093C\u0940 \u0917\u0908\u0902",
      groupLoadFailed: "\u0935\u0939 \u0917\u094D\u0930\u0941\u092A \u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964",
      addSaved: "\u092E\u0947\u0930\u0940 \u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091C\u094B\u0921\u093C\u0947\u0902 ({count})",
      saveGroup: "\u0917\u094D\u0930\u0941\u092A \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
      saveGroupTitle: "\u0907\u0928 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u094B \u0917\u094D\u0930\u0941\u092A \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
      saveGroupHint: "\u0905\u092A\u0928\u0940 {count} \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u094B \u090F\u0915 \u0928\u093E\u092E \u0926\u0947\u0902, \u0924\u093E\u0915\u093F \u0905\u0917\u0932\u0940 \u092C\u093E\u0930 \u090F\u0915 \u092C\u093E\u0930 \u092E\u0947\u0902 \u0938\u092C \u091A\u0941\u0928 \u0938\u0915\u0947\u0902\u0964",
      groupPlaceholder: "\u091C\u0948\u0938\u0947 \u092A\u091F\u0928\u093E \u0915\u0940 \u092A\u094D\u0930\u0940\u092E\u093F\u092F\u092E \u091C\u0917\u0939\u0947\u0902",
      groupSaved: '"{name}" \u0938\u0947\u0935 \u0939\u094B \u0917\u092F\u093E',
      groupSaveFailed: "\u0917\u094D\u0930\u0941\u092A \u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964",
      remove: "{name} \u0939\u091F\u093E\u090F\u0901"
    },
    cart: {
      selected: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0940 \u0917\u0908} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0940 \u0917\u0908\u0902}}",
      perDay: "\u0915\u0941\u0932 {amount} \u092A\u094D\u0930\u0924\u093F\u0926\u093F\u0928",
      clear: "\u0939\u091F\u093E\u090F\u0901",
      continue: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u090F\u0901"
    }
  },
  screenDetail: {
    back: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0938\u0942\u091A\u0940 \u092A\u0930 \u0935\u093E\u092A\u0938",
    advertisersOnly: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0938\u093F\u0930\u094D\u092B\u093C \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E \u0916\u093E\u0924\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0964",
    loadFailed: "\u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u0908\u0964",
    digitalDisplay: "\u0921\u093F\u091C\u093F\u091F\u0932 \u0921\u093F\u0938\u094D\u092A\u094D\u0932\u0947",
    price: "\u0915\u0940\u092E\u0924",
    plays: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u092C\u093E\u0930",
    playsNote: "15 \u0938\u0947\u0915\u0902\u0921 \u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u0947 \u0932\u093F\u090F",
    priceNote: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0906\u092A\u0915\u094B \u0905\u092A\u0928\u0940 \u0924\u093E\u0930\u0940\u0916\u093C\u094B\u0902 \u0915\u0940 \u092A\u0942\u0930\u0940 \u0915\u0940\u092E\u0924, \u092B\u093C\u0940\u0938 \u0914\u0930 GST \u0938\u0939\u093F\u0924, \u0926\u093F\u0916\u0947\u0917\u0940\u0964",
    select: "\u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0947\u0902",
    selected: "\u091A\u0941\u0928\u0940 \u0917\u0908",
    viewLive: "\u0932\u093E\u0907\u0935 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u0947\u0916\u0947\u0902",
    perDay: "{value}/\u0926\u093F\u0928",
    seconds: "{count} \u0938\u0947\u0915\u0902\u0921",
    meters: "{count} \u092E\u0940\u091F\u0930",
    indoor: "\u0905\u0902\u0926\u0930",
    outdoor: "\u092C\u093E\u0939\u0930",
    tabs: {
      details: "\u091C\u093E\u0928\u0915\u093E\u0930\u0940",
      liveAds: "\u091A\u0932 \u0930\u0939\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928"
    },
    sections: {
      overview: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      location: "\u091C\u0917\u0939",
      audience: "\u0932\u094B\u0917 \u0914\u0930 \u092D\u0940\u0921\u093C",
      visibility: "\u0915\u093F\u0924\u0928\u0940 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948",
      delivery: "\u0907\u0938 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0940 \u092C\u0941\u0915\u093F\u0902\u0917"
    },
    estimatesNote: "\u092D\u0940\u0921\u093C \u0914\u0930 \u0932\u094B\u0917\u094B\u0902 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092E\u093E\u0932\u093F\u0915 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0939\u0948\u0964",
    deliveryHint: "\u0935\u094D\u092F\u0938\u094D\u0924 \u0926\u093F\u0928 \u091A\u093F\u0939\u094D\u0928\u093F\u0924 \u0939\u0948\u0902\u0964 \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902 \u0906\u092A \u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u0924\u0947 \u0938\u092E\u092F \u091A\u0941\u0928\u0947\u0902\u0917\u0947\u0964",
    browseMore: "\u0914\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0926\u0947\u0916\u0947\u0902",
    fields: {
      size: "\u0938\u093E\u0907\u091C\u093C",
      resolution: "\u0930\u0947\u091C\u093C\u094B\u0932\u094D\u092F\u0942\u0936\u0928",
      shape: "\u0906\u0915\u093E\u0930",
      type: "\u092A\u094D\u0930\u0915\u093E\u0930",
      environment: "\u0915\u0939\u093E\u0901 \u0932\u0917\u0940 \u0939\u0948",
      brightness: "\u0930\u094B\u0936\u0928\u0940",
      hours: "\u091A\u093E\u0932\u0942",
      venue: "\u0938\u094D\u0925\u093E\u0928",
      landmark: "\u0932\u0948\u0902\u0921\u092E\u093E\u0930\u094D\u0915",
      area: "\u0907\u0932\u093E\u0915\u093E",
      city: "\u0936\u0939\u0930",
      pincode: "\u092A\u093F\u0928 \u0915\u094B\u0921",
      locationCategory: "\u091C\u0917\u0939 \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
      footfall: "\u0930\u094B\u091C\u093C\u093E\u0928\u093E \u092D\u0940\u0921\u093C",
      weekendFootfall: "\u091B\u0941\u091F\u094D\u091F\u0940 \u0915\u0947 \u0926\u093F\u0928 \u092D\u0940\u0921\u093C",
      traffic: "\u092D\u0940\u0921\u093C \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
      peak: "\u0938\u092C\u0938\u0947 \u0935\u094D\u092F\u0938\u094D\u0924 \u0938\u092E\u092F",
      dwell: "\u0932\u094B\u0917 \u0932\u0917\u092D\u0917 \u0930\u0941\u0915\u0924\u0947 \u0939\u0948\u0902",
      audience: "\u0935\u0939\u093E\u0901 \u0915\u094C\u0928 \u0906\u0924\u093E \u0939\u0948",
      facing: "\u0926\u093F\u0936\u093E",
      viewingDistance: "\u0915\u093F\u0924\u0928\u0940 \u0926\u0942\u0930 \u0938\u0947 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948",
      angle: "\u0915\u093F\u0924\u0928\u0947 \u0915\u094B\u0923 \u0924\u0915 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948",
      obstructions: "\u0915\u094B\u0908 \u0930\u0941\u0915\u093E\u0935\u091F",
      night: "\u0930\u093E\u0924 \u092E\u0947\u0902 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948"
    }
  },
  savedScreens: {
    title: "\u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0938\u094D\u0915\u094D\u0930\u0940\u0928",
    subtitle: "\u0906\u092A\u0915\u0940 \u092A\u0938\u0902\u0926\u0940\u0926\u093E \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0914\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0917\u094D\u0930\u0941\u092A, \u0905\u0917\u0932\u0947 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0932\u093F\u090F \u0924\u0948\u092F\u093E\u0930\u0964",
    groups: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0917\u094D\u0930\u0941\u092A",
    noGroups: '\u0905\u092D\u0940 \u0915\u094B\u0908 \u0917\u094D\u0930\u0941\u092A \u0928\u0939\u0940\u0902\u0964 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0924\u0947 \u0938\u092E\u092F "\u0917\u094D\u0930\u0941\u092A \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902" \u0926\u092C\u093E\u090F\u0901, \u0924\u093E\u0915\u093F \u092C\u093E\u0926 \u092E\u0947\u0902 \u0926\u094B\u092C\u093E\u0930\u093E \u0907\u0938\u094D\u0924\u0947\u092E\u093E\u0932 \u0915\u0930 \u0938\u0915\u0947\u0902\u0964',
    saved: "\u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0938\u094D\u0915\u094D\u0930\u0940\u0928",
    noSaved: "\u0915\u093F\u0938\u0940 \u092D\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0926\u093F\u0932 \u0915\u093E \u0928\u093F\u0936\u093E\u0928 \u0926\u092C\u093E\u0915\u0930 \u0909\u0938\u0947 \u092F\u0939\u093E\u0901 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902\u0964",
    explore: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0916\u094B\u091C\u0947\u0902",
    screenCount: "{count, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928}}",
    useInCampaign: "\u0928\u090F \u0915\u0948\u0902\u092A\u0947\u0928 \u092E\u0947\u0902 \u0907\u0938\u094D\u0924\u0947\u092E\u093E\u0932 \u0915\u0930\u0947\u0902",
    rename: "\u0928\u093E\u092E \u092C\u0926\u0932\u0947\u0902",
    save: "\u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    delete: "\u0939\u091F\u093E\u090F\u0901",
    deleteTitle: '"{name}" \u0939\u091F\u093E\u090F\u0901?',
    deleteHint: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0915\u094B\u0908 \u0905\u0938\u0930 \u0928\u0939\u0940\u0902 \u0939\u094B\u0917\u093E \u2014 \u0938\u093F\u0930\u094D\u092B\u093C \u092F\u0939 \u0917\u094D\u0930\u0941\u092A \u0939\u091F\u0947\u0917\u093E\u0964",
    loadFailed: "\u0935\u0939 \u0917\u094D\u0930\u0941\u092A \u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964",
    renameFailed: "\u0917\u094D\u0930\u0941\u092A \u0915\u093E \u0928\u093E\u092E \u0928\u0939\u0940\u0902 \u092C\u0926\u0932\u093E \u091C\u093E \u0938\u0915\u093E\u0964"
  },
  listingEditor: {
    title: "\u0932\u093F\u0938\u094D\u091F\u093F\u0902\u0917 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940",
    hint: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E \u092F\u0939 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0906\u092A\u0915\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0947 \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u0926\u0947\u0916\u0924\u0947 \u0939\u0948\u0902\u0964 \u091C\u093C\u094D\u092F\u093E\u0926\u093E \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0935\u093E\u0932\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0939\u0932\u0947 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948\u0902\u0964 \u092C\u0926\u0932\u093E\u0935 \u0924\u0941\u0930\u0902\u0924 \u0932\u093E\u0917\u0942 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902\u0964",
    where: "\u0920\u0940\u0915 \u0915\u0939\u093E\u0901 \u0939\u0948",
    landmark: "\u0938\u092C\u0938\u0947 \u092A\u093E\u0938 \u0915\u093E \u0932\u0948\u0902\u0921\u092E\u093E\u0930\u094D\u0915",
    landmarkPlaceholder: "\u091C\u0948\u0938\u0947 \u092C\u094B\u0930\u093F\u0902\u0917 \u0930\u094B\u0921 \u091A\u094C\u0930\u093E\u0939\u0947 \u0915\u0947 \u092A\u093E\u0938",
    area: "\u0907\u0932\u093E\u0915\u093E / \u092E\u094B\u0939\u0932\u094D\u0932\u093E",
    areaPlaceholder: "\u091C\u0948\u0938\u0947 \u092C\u094B\u0930\u093F\u0902\u0917 \u0930\u094B\u0921",
    pincode: "\u092A\u093F\u0928 \u0915\u094B\u0921",
    locationCategory: "\u091C\u0917\u0939 \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
    audience: "\u0915\u094C\u0928 \u0917\u0941\u091C\u093C\u0930\u0924\u093E \u0939\u0948",
    traffic: "\u092D\u0940\u0921\u093C \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
    peakFrom: "\u0938\u092C\u0938\u0947 \u0935\u094D\u092F\u0938\u094D\u0924 \u2014 \u0915\u092C \u0938\u0947",
    peakTo: "\u0938\u092C\u0938\u0947 \u0935\u094D\u092F\u0938\u094D\u0924 \u2014 \u0915\u092C \u0924\u0915",
    weekendFootfall: "\u091B\u0941\u091F\u094D\u091F\u0940 \u0915\u0947 \u0926\u093F\u0928 \u092D\u0940\u0921\u093C / \u0926\u093F\u0928",
    dwell: "\u0932\u094B\u0917 \u0930\u0941\u0915\u0924\u0947 \u0939\u0948\u0902 (\u0938\u0947\u0915\u0902\u0921)",
    displayType: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u093E \u092A\u094D\u0930\u0915\u093E\u0930",
    sizeInches: "\u0938\u093E\u0907\u091C\u093C (\u0907\u0902\u091A, \u090A\u0901\u091A\u093E\u0908 \xD7 \u091A\u094C\u0921\u093C\u093E\u0908)",
    brightness: "\u0930\u094B\u0936\u0928\u0940 (\u0928\u093F\u091F\u094D\u0938)",
    viewingDistance: "\u0915\u093F\u0924\u0928\u0940 \u0926\u0942\u0930 \u0938\u0947 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948 (\u092E\u0940\u091F\u0930)",
    angle: "\u0915\u093F\u0924\u0928\u0947 \u0915\u094B\u0923 \u0924\u0915 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948 (\u0921\u093F\u0917\u094D\u0930\u0940)",
    facing: "\u0926\u093F\u0936\u093E",
    visibleAtNight: "\u0930\u093E\u0924 \u092E\u0947\u0902 \u0926\u093F\u0916\u0924\u0940 \u0939\u0948",
    obstructions: "\u0915\u094B\u0908 \u091A\u0940\u091C\u093C \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u094B \u0922\u0915\u0924\u0940 \u0939\u0948?",
    obstructionsPlaceholder: "\u091C\u0948\u0938\u0947 \u092C\u093E\u0908\u0902 \u0913\u0930 \u0938\u0947 \u090F\u0915 \u092A\u0947\u0921\u093C \u0925\u094B\u0921\u093C\u093E \u0922\u0915\u0924\u093E \u0939\u0948",
    save: "\u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
    saving: "\u0938\u0947\u0935 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
    saved: "\u0932\u093F\u0938\u094D\u091F\u093F\u0902\u0917 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0938\u0947\u0935 \u0939\u094B \u0917\u0908\u0964",
    saveFailed: "\u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964"
  },
  commandCenter: {
    liveTitle: "\u0932\u093E\u0907\u0935 \u092A\u094D\u0930\u0926\u0930\u094D\u0936\u0928",
    completedTitle: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092A\u0942\u0930\u093E \u0939\u0941\u0906",
    dayOf: "{total} \u092E\u0947\u0902 \u0938\u0947 \u0926\u093F\u0928 {day}",
    tiles: {
      screens: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      online: "\u0905\u092D\u0940 \u091A\u093E\u0932\u0942",
      plays: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u093E",
      views: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u094D\u092F\u0942\u091C\u093C",
      spend: "\u0905\u092C \u0924\u0915 \u0916\u093C\u0930\u094D\u091A",
      remaining: "\u092C\u093E\u0915\u0940",
      delivery: "\u0921\u093F\u0932\u0940\u0935\u0930\u0940",
      paid: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u0917\u0908 \u0930\u0915\u092E"
    },
    downloadReport: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
    downloading: "\u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
    downloadFailed: "\u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
    estimateNote: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u093E, \u092F\u0939 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0916\u093C\u0941\u0926 \u0917\u093F\u0928\u0924\u0940 \u0939\u0948\u0902\u0964 \u0935\u094D\u092F\u0942\u091C\u093C \u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0940 \u092D\u0940\u0921\u093C \u0938\u0947 \u0932\u0917\u093E\u092F\u093E \u0917\u092F\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0939\u0948\u0964",
    byScreen: "\u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u093E \u0939\u093E\u0932",
    table: {
      screen: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
      status: "\u0938\u094D\u0925\u093F\u0924\u093F",
      plays: "\u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930",
      views: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u094D\u092F\u0942\u091C\u093C"
    },
    screenStatus: {
      ONLINE: "\u091A\u093E\u0932\u0942",
      OFFLINE: "\u092C\u0902\u0926",
      NOT_CONNECTED: "\u0905\u092D\u0940 \u091C\u0941\u0921\u093C\u0940 \u0928\u0939\u0940\u0902"
    },
    offline: {
      title: "{screen} \u092C\u0902\u0926 \u0939\u0948",
      body: "\u092F\u0939 {minutes} \u092E\u093F\u0928\u091F \u0938\u0947 \u092C\u0902\u0926 \u0939\u0948\u0964 CASTADI \u0907\u0938 \u092A\u0930 \u0928\u091C\u093C\u0930 \u0930\u0916 \u0930\u0939\u093E \u0939\u0948\u0964",
      impact: "\u0905\u092C \u0924\u0915 \u0932\u0917\u092D\u0917 {plays} \u092C\u093E\u0930 \u0915\u093E \u091A\u0932\u0928\u093E \u092A\u094D\u0930\u092D\u093E\u0935\u093F\u0924 \u0939\u0941\u0906 \u0939\u0948 \u2014 \u0939\u092E \u0905\u092A\u0928\u0940 \u0928\u0940\u0924\u093F \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0907\u0938\u0915\u0940 \u092D\u0930\u092A\u093E\u0908 \u0915\u0930\u0947\u0902\u0917\u0947\u0964"
    },
    progress: {
      title: "\u0906\u092A\u0915\u0947 \u0915\u0948\u0902\u092A\u0947\u0928 \u092E\u0947\u0902 \u0915\u094D\u092F\u093E \u0939\u094B \u0930\u0939\u093E \u0939\u0948",
      steps: {
        paid: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092E\u093F\u0932 \u0917\u092F\u093E",
        adCheck: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0915\u0940 \u091C\u093E\u0901\u091A",
        scheduled: "\u0936\u0947\u0921\u094D\u092F\u0942\u0932 \u0939\u094B \u0917\u092F\u093E",
        live: "\u091A\u093E\u0932\u0942"
      },
      rejected: "\u091A\u0932\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092E\u0947\u0902 \u092C\u0926\u0932\u093E\u0935 \u091C\u093C\u0930\u0942\u0930\u0940 \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0928\u092F\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 \u2014 \u0906\u092A\u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0914\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948\u0902\u0964",
      replaceAd: "\u0928\u092F\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
      hint: {
        PAYMENT_RECEIVED: "\u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 \u0924\u093E\u0915\u093F \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0909\u0938\u0915\u0940 \u091C\u093E\u0901\u091A \u0915\u0930 \u0938\u0915\u0947\u0964",
        UNDER_REVIEW: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091C\u093E\u0901\u091A \u0930\u0939\u0940 \u0939\u0948\u0964 \u0907\u0938\u092E\u0947\u0902 \u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0915\u0941\u091B \u0918\u0902\u091F\u0947 \u0932\u0917\u0924\u0947 \u0939\u0948\u0902\u0964",
        APPROVED: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092E\u0902\u091C\u093C\u0942\u0930 \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964 \u0939\u092E \u0907\u0938\u0947 \u0906\u092A\u0915\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0932\u0917\u093E \u0930\u0939\u0947 \u0939\u0948\u0902\u0964",
        SCHEDULED: "\u0938\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0964 \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0936\u0941\u0930\u0942 \u0915\u0940 \u0924\u093E\u0930\u0940\u0916 \u0938\u0947 \u091A\u0932\u0947\u0917\u093E\u0964",
        LIVE: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092D\u0940 \u091A\u0932 \u0930\u0939\u093E \u0939\u0948\u0964"
      }
    }
  },
  proofOfPlay: {
    title: "\u092A\u094D\u0930\u0942\u092B\u093C \u0911\u092B\u093C \u092A\u094D\u0932\u0947",
    subtitle: "\u0939\u0930 \u0926\u093F\u0928, \u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092A\u0942\u0930\u093E \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u093E\u0964",
    pdf: "PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
    csv: "CSV",
    downloading: "\u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
    downloadFailed: "\u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
    empty: "\u0905\u092D\u0940 \u0924\u0915 \u0915\u0941\u091B \u0928\u0939\u0940\u0902 \u091A\u0932\u093E\u0964 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932\u0928\u093E \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u0947 \u0939\u0940 \u092F\u0939\u093E\u0901 \u0917\u093F\u0928\u0924\u0940 \u0926\u093F\u0916\u0947\u0917\u0940\u0964",
    totals: "{screens, plural, one {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928} other {# \u0938\u094D\u0915\u094D\u0930\u0940\u0928}} \u092A\u0930 {days, plural, one {# \u0926\u093F\u0928} other {# \u0926\u093F\u0928\u094B\u0902}} \u092E\u0947\u0902 {plays} \u092C\u093E\u0930 \u092A\u0915\u094D\u0915\u093E \u091A\u0932\u093E",
    date: "\u0924\u093E\u0930\u0940\u0916\u093C",
    screen: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928",
    plays: "\u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930",
    status: "\u0938\u094D\u0925\u093F\u0924\u093F",
    verified: "\u092A\u0915\u094D\u0915\u093E",
    notVerified: "\u092A\u0915\u094D\u0915\u093E \u0928\u0939\u0940\u0902",
    showMore: "\u0914\u0930 \u0926\u093F\u0916\u093E\u090F\u0901 ({count} \u092C\u093E\u0915\u0940)",
    pageSubtitle: "\u0939\u0930 \u0909\u0938 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0947 \u0932\u093F\u090F, \u091C\u094B \u091A\u0932 \u091A\u0941\u0915\u093E \u0939\u0948, \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932\u0928\u0947 \u0915\u093E \u0938\u092C\u0942\u0924 \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902\u0964",
    noneYet: "\u0906\u092A\u0915\u093E \u0915\u094B\u0908 \u0915\u0948\u0902\u092A\u0947\u0928 \u0905\u092D\u0940 \u0924\u0915 \u0928\u0939\u0940\u0902 \u091A\u0932\u093E\u0964 \u0915\u0948\u0902\u092A\u0947\u0928 \u091A\u093E\u0932\u0942 \u0939\u094B\u0924\u0947 \u0939\u0940 \u092A\u094D\u0930\u0942\u092B\u093C \u0911\u092B\u093C \u092A\u094D\u0932\u0947 \u092F\u0939\u093E\u0901 \u0926\u093F\u0916\u0947\u0917\u093E\u0964",
    createCampaign: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u090F\u0901"
  },
  nav: {
    dashboard: "\u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921",
    create: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u090F\u0901",
    screens: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0916\u094B\u091C\u0947\u0902",
    campaigns: "\u092E\u0947\u0930\u0947 \u0915\u0948\u0902\u092A\u0947\u0928",
    analytics: "\u090F\u0928\u093E\u0932\u093F\u091F\u093F\u0915\u094D\u0938",
    proofOfPlay: "\u092A\u094D\u0930\u0942\u092B\u093C \u0911\u092B\u093C \u092A\u094D\u0932\u0947",
    billing: "\u0935\u0949\u0932\u0947\u091F \u0914\u0930 \u092C\u093F\u0932",
    saved: "\u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0938\u094D\u0915\u094D\u0930\u0940\u0928",
    company: "\u0915\u0902\u092A\u0928\u0940 \u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932",
    notifications: "\u0938\u0942\u091A\u0928\u093E\u090F\u0901",
    quotations: "\u0915\u094B\u091F\u0947\u0936\u0928"
  },
  dashboard: {
    create: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u090F\u0901",
    createHint: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0947\u0902, \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902 \u2014 5 \u0906\u0938\u093E\u0928 \u0915\u0926\u092E\u094B\u0902 \u092E\u0947\u0902\u0964",
    intro: {
      title: "CASTADI \u0915\u0948\u0938\u0947 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948",
      subtitle: "\u0924\u0940\u0928 \u0915\u0926\u092E\u094B\u0902 \u092E\u0947\u0902 \u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0928\u0947 \u0917\u094D\u0930\u093E\u0939\u0915\u094B\u0902 \u0915\u0947 \u092A\u093E\u0938 \u0915\u0940 \u0921\u093F\u091C\u093F\u091F\u0932 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0932\u0917\u093E\u090F\u0901\u0964",
      close: "\u092C\u0902\u0926 \u0915\u0930\u0947\u0902",
      choose: {
        title: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u091A\u0941\u0928\u0947\u0902",
        body: "\u0907\u0932\u093E\u0915\u0947 \u092F\u093E \u0932\u0948\u0902\u0921\u092E\u093E\u0930\u094D\u0915 \u0938\u0947 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0922\u0942\u0901\u0922\u0947\u0902 \u0914\u0930 \u0926\u0947\u0916\u0947\u0902 \u0915\u093F \u0935\u0939\u093E\u0901 \u0938\u0947 \u0915\u094C\u0928 \u0917\u0941\u091C\u093C\u0930\u0924\u093E \u0939\u0948\u0964"
      },
      upload: {
        title: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902",
        body: "\u092B\u093C\u094B\u091F\u094B \u092F\u093E \u0935\u0940\u0921\u093F\u092F\u094B, \u0924\u093E\u0930\u0940\u0916\u093C\u0947\u0902, \u0915\u093F\u0924\u0928\u0940 \u092C\u093E\u0930 \u091A\u0932\u0947 \u2014 \u090F\u0915 \u0938\u093E\u092B\u093C \u0915\u0940\u092E\u0924\u0964"
      },
      track: {
        title: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932\u0924\u093E \u0926\u0947\u0916\u0947\u0902",
        body: "\u0932\u093E\u0907\u0935 \u0917\u093F\u0928\u0924\u0940 \u0926\u0947\u0916\u0947\u0902 \u0914\u0930 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932\u0928\u0947 \u0915\u093E \u0938\u092C\u0942\u0924 \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902\u0964"
      }
    },
    tiles: {
      active: "\u091A\u0932 \u0930\u0939\u0947 \u0915\u0948\u0902\u092A\u0947\u0928",
      scheduled: "\u091C\u0932\u094D\u0926 \u0936\u0941\u0930\u0942",
      completed: "\u092A\u0942\u0930\u0947 \u0939\u0941\u090F",
      spend: "\u0915\u0941\u0932 \u0916\u093C\u0930\u094D\u091A",
      plays: "\u0915\u0941\u0932 \u092C\u093E\u0930 \u091A\u0932\u093E",
      views: "\u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0935\u094D\u092F\u0942\u091C\u093C",
      screensNow: "\u0911\u0928\u0932\u093E\u0907\u0928 / \u0906\u091C \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u093F\u0924 \u0938\u094D\u0915\u094D\u0930\u0940\u0928"
    },
    pending: {
      title: "\u0906\u092A\u0915\u093E \u0907\u0902\u0924\u091C\u093C\u093E\u0930 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902",
      DRAFT: {
        what: "\u0906\u092A\u0928\u0947 \u0907\u0938\u0947 \u0905\u092D\u0940 \u092A\u0942\u0930\u093E \u0928\u0939\u0940\u0902 \u0915\u093F\u092F\u093E \u0939\u0948\u0964",
        cta: "\u0906\u0917\u0947 \u092C\u0922\u093C\u0947\u0902"
      },
      PAYMENT_PENDING: {
        what: "\u0938\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u0948 \u2014 \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092C\u0938 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902\u0964",
        cta: "\u0905\u092D\u0940 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902"
      },
      PAYMENT_RECEIVED: {
        what: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0939\u094B \u0917\u092F\u093E \u2014 \u091A\u0932\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u092A\u0928\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902\u0964",
        cta: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902"
      },
      REJECTED: {
        what: "\u091A\u0932\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u092E\u0947\u0902 \u092C\u0926\u0932\u093E\u0935 \u091C\u093C\u0930\u0942\u0930\u0940 \u0939\u0948\u0964",
        cta: "\u0928\u092F\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902"
      }
    },
    recent: {
      title: "\u0906\u092A\u0915\u0947 \u0915\u0948\u0902\u092A\u0947\u0928",
      all: "\u0938\u092D\u0940 \u0926\u0947\u0916\u0947\u0902",
      empty: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0915\u0948\u0902\u092A\u0947\u0928 \u0928\u0939\u0940\u0902\u0964 \u090A\u092A\u0930 \u0938\u0947 \u0905\u092A\u0928\u093E \u092A\u0939\u0932\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u090F\u0901\u0964"
    }
  },
  company: {
    title: "\u0915\u0902\u092A\u0928\u0940 \u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932",
    subtitle: "\u0906\u092A\u0915\u0947 \u092C\u093F\u091C\u093C\u0928\u0947\u0938 \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940, \u091F\u0940\u092E, \u0916\u093E\u0924\u093E \u0914\u0930 \u092E\u0926\u0926\u0964",
    tabs: {
      business: "\u092C\u093F\u091C\u093C\u0928\u0947\u0938 \u0914\u0930 KYC",
      team: "\u091F\u0940\u092E",
      account: "\u092E\u0947\u0930\u093E \u0916\u093E\u0924\u093E",
      help: "\u092E\u0926\u0926 \u0914\u0930 \u0938\u0939\u093E\u092F\u0924\u093E"
    }
  },
  quotations: {
    status: {
      SUBMITTED: "\u0938\u092E\u0940\u0915\u094D\u0937\u093E \u092C\u093E\u0915\u0940",
      COUNTERED: "\u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930",
      APPROVED: "\u0938\u094D\u0935\u0940\u0915\u0943\u0924",
      REJECTED: "\u0905\u0938\u094D\u0935\u0940\u0915\u0943\u0924",
      PAYMENT_SUBMITTED: "\u092D\u0941\u0917\u0924\u093E\u0928 \u091C\u092E\u093E",
      COMPLETED: "\u092A\u0942\u0930\u094D\u0923",
      CANCELLED: "\u0930\u0926\u094D\u0926"
    },
    action: {
      SUBMITTED: "\u0915\u094B\u091F\u0947\u0936\u0928 \u092E\u093E\u0901\u0917\u093E \u0917\u092F\u093E",
      COUNTERED: "\u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930 \u092D\u0947\u091C\u093E \u0917\u092F\u093E",
      ACCEPTED: "\u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930 \u0938\u094D\u0935\u0940\u0915\u093E\u0930 \u0915\u093F\u092F\u093E",
      APPROVED: "\u0915\u094B\u091F\u0947\u0936\u0928 \u0938\u094D\u0935\u0940\u0915\u0943\u0924",
      REJECTED: "\u0915\u094B\u091F\u0947\u0936\u0928 \u0905\u0938\u094D\u0935\u0940\u0915\u0943\u0924",
      REOPENED: "\u0938\u0902\u0936\u094B\u0927\u0928 \u0915\u0947 \u0932\u093F\u090F \u092B\u093F\u0930 \u0916\u094B\u0932\u093E",
      RECEIPT_SUBMITTED: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0930\u0938\u0940\u0926 \u091C\u092E\u093E \u0915\u0940",
      PAYMENT_REJECTED: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0935\u093E\u092A\u0938 \u092D\u0947\u091C\u093E \u0917\u092F\u093E",
      COMPLETED: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u2014 \u092A\u0942\u0930\u094D\u0923",
      CANCELLED: "\u0930\u0926\u094D\u0926",
      REVISION_OPENED: "\u0938\u0902\u0936\u094B\u0927\u0928 \u0915\u0947 \u0932\u093F\u090F \u0916\u094B\u0932\u093E \u0917\u092F\u093E",
      REVISION_CLOSED: "\u0938\u0902\u0936\u094B\u0927\u0928 \u092C\u0902\u0926 \u0915\u093F\u092F\u093E \u0917\u092F\u093E"
    },
    role: {
      ADVERTISER: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E",
      ADMIN: "CASTADI",
      SYSTEM: "\u0938\u093F\u0938\u094D\u091F\u092E"
    },
    revision: "\u0938\u0902\u0936\u094B\u0927\u0928 {n}",
    updated: "\u0905\u092A\u0921\u0947\u091F {date}",
    history: "\u092C\u093E\u0924\u091A\u0940\u0924 \u0915\u093E \u0907\u0924\u093F\u0939\u093E\u0938 ({count})",
    table: {
      mediaCost: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0932\u093E\u0917\u0924",
      platformFee: "CASTADI \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u0936\u0941\u0932\u094D\u0915",
      gst: "GST",
      listTotal: "\u0911\u0930\u094D\u0921\u0930 \u0915\u0941\u0932 (\u0938\u0942\u091A\u0940 \u092E\u0942\u0932\u094D\u092F)",
      yourProposal: "\u0906\u092A\u0915\u093E \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935",
      advertiserProposal: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E \u0915\u093E \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935",
      counterOffer: "CASTADI \u0915\u093E \u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930",
      yourCounter: "\u0906\u092A\u0915\u093E \u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930",
      totalPayment: "\u0915\u0941\u0932 \u092D\u0941\u0917\u0924\u093E\u0928 \u0930\u093E\u0936\u093F",
      revisedBadge: "\u0938\u0902\u0936\u094B\u0927\u093F\u0924 \u0915\u094B\u091F\u0947\u0936\u0928 \u0930\u093E\u0936\u093F",
      saving: "\u0938\u0942\u091A\u0940 \u092E\u0942\u0932\u094D\u092F \u0938\u0947 {amount} ({percent}) \u0915\u092E",
      above: "\u0938\u0942\u091A\u0940 \u092E\u0942\u0932\u094D\u092F \u0938\u0947 {amount} \u0905\u0927\u093F\u0915"
    },
    panel: {
      title: "\u0915\u094B\u091F\u0947\u0936\u0928",
      introRequired: "{amount} \u0914\u0930 \u0909\u0938\u0938\u0947 \u0905\u0927\u093F\u0915 \u0915\u0947 \u0911\u0930\u094D\u0921\u0930 \u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u094B\u091F\u0947\u0936\u0928 \u0938\u0947 \u0939\u094B\u0924\u093E \u0939\u0948\u0964 \u0928\u0940\u091A\u0947 \u0915\u094B\u091F\u0947\u0936\u0928 \u092E\u093E\u0901\u0917\u0947\u0902 \u2014 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0907\u0938\u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0917\u0940, \u0914\u0930 \u0915\u0940\u092E\u0924 \u0924\u092F \u0939\u094B\u0928\u0947 \u0924\u0915 \u0906\u092A \u092C\u093E\u0924\u091A\u0940\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      introOptional: "\u0905\u0932\u0917 \u0915\u0940\u092E\u0924 \u091A\u093E\u0939\u093F\u090F \u092F\u093E \u0911\u092B\u093C\u0932\u093E\u0907\u0928 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0928\u093E \u0939\u0948? \u0915\u094B\u091F\u0947\u0936\u0928 \u092E\u093E\u0901\u0917\u0947\u0902 \u0914\u0930 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0938\u0947 \u092C\u093E\u0924 \u0915\u0930\u0947\u0902\u0964",
      request: "\u0915\u094B\u091F\u0947\u0936\u0928 \u092E\u093E\u0901\u0917\u0947\u0902",
      sendRevision: "\u0938\u0902\u0936\u094B\u0927\u0928 \u092D\u0947\u091C\u0947\u0902",
      cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
      reopen: "\u0938\u0902\u0936\u094B\u0927\u0928 \u0915\u0947 \u0932\u093F\u090F \u092B\u093F\u0930 \u0916\u094B\u0932\u0947\u0902",
      proposeAnother: "\u0926\u0942\u0938\u0930\u0940 \u0930\u093E\u0936\u093F \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935\u093F\u0924 \u0915\u0930\u0947\u0902",
      accept: "{amount} \u0938\u094D\u0935\u0940\u0915\u093E\u0930 \u0915\u0930\u0947\u0902",
      proposedLabel: "\u0906\u092A\u0915\u0940 \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935\u093F\u0924 \u0930\u093E\u0936\u093F (\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915)",
      proposedPlaceholder: "\u091C\u0948\u0938\u0947 {amount} \u0938\u0947 \u0915\u092E",
      proposedHint: "\u0911\u0930\u094D\u0921\u0930 \u0915\u0940 \u0915\u0941\u0932 \u0930\u093E\u0936\u093F \u092A\u0939\u0932\u0947 \u0938\u0947 \u092D\u0930\u0940 \u0939\u0948 \u2014 \u0905\u0932\u0917 \u0915\u0940\u092E\u0924 \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0947 \u0915\u092E \u0915\u0930\u0947\u0902\u0964",
      noteLabel: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0915\u0947 \u0932\u093F\u090F \u0928\u094B\u091F (\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915)",
      invalidAmount: "\u0938\u0939\u0940 \u0930\u093E\u0936\u093F \u0921\u093E\u0932\u0947\u0902\u0964",
      amountTooHigh: "\u0906\u092A\u0915\u093E \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935 \u0911\u0930\u094D\u0921\u0930 \u0915\u0940 \u0915\u0941\u0932 \u0930\u093E\u0936\u093F ({amount}) \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E\u0964",
      stale: "\u092F\u0939 \u0915\u094B\u091F\u0947\u0936\u0928 \u092C\u0928\u0928\u0947 \u0915\u0947 \u092C\u093E\u0926 \u0906\u092A\u0915\u093E \u0911\u0930\u094D\u0921\u0930 \u092C\u0926\u0932 \u0917\u092F\u093E \u0939\u0948\u0964 \u0928\u090F \u0911\u0930\u094D\u0921\u0930 \u0915\u093E \u0915\u094B\u091F\u0947\u0936\u0928 \u092A\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0938\u0947 \u092B\u093F\u0930 \u0916\u094B\u0932\u0947\u0902\u0964",
      receiptTitle: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0930\u0938\u0940\u0926",
      receiptHint: "CASTADI \u0915\u094B \u092C\u0948\u0902\u0915 \u091F\u094D\u0930\u093E\u0902\u0938\u092B\u093C\u0930 \u092F\u093E UPI \u0938\u0947 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902, \u092B\u093F\u0930 \u0930\u0938\u0940\u0926 \u091C\u094B\u0921\u093C\u0947\u0902 (PDF, JPG \u092F\u093E PNG)\u0964",
      submitPayment: "{amount} \u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u091C\u092E\u093E \u0915\u0930\u0947\u0902",
      submitting: "\u091C\u092E\u093E \u0939\u094B \u0930\u0939\u093E \u0939\u0948\u2026",
      viewCampaign: "\u0915\u0948\u0902\u092A\u0947\u0928 \u0926\u0947\u0916\u0947\u0902",
      failed: "\u0915\u0941\u091B \u0917\u0932\u0924 \u0939\u094B \u0917\u092F\u093E\u0964 \u092B\u093F\u0930 \u0938\u0947 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
      sentToast: "\u0915\u094B\u091F\u0947\u0936\u0928 \u092D\u0947\u091C\u093E \u0917\u092F\u093E \u2014 \u0939\u092E \u091C\u0932\u094D\u0926 \u091C\u0935\u093E\u092C \u0926\u0947\u0902\u0917\u0947\u0964",
      reopenedToast: "\u0938\u0902\u0936\u094B\u0927\u0928 \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0915\u094B \u092D\u0947\u091C\u093E \u0917\u092F\u093E\u0964",
      acceptedToast: "\u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930 \u0938\u094D\u0935\u0940\u0915\u093E\u0930 \u0915\u093F\u092F\u093E\u0964",
      paidToast: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0915\u0947 \u0932\u093F\u090F \u091C\u092E\u093E \u0915\u093F\u092F\u093E \u0917\u092F\u093E\u0964",
      message: {
        SUBMITTED: "\u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E {amount} \u0915\u0947 \u0906\u092A\u0915\u0947 \u0915\u094B\u091F\u0947\u0936\u0928 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930 \u0930\u0939\u0940 \u0939\u0948\u0964 \u0905\u092A\u0921\u0947\u091F \u0939\u094B\u0928\u0947 \u092A\u0930 \u0939\u092E \u0906\u092A\u0915\u094B \u0908\u092E\u0947\u0932 \u0915\u0930\u0947\u0902\u0917\u0947\u0964",
        COUNTERED: "\u0939\u092E\u0928\u0947 {amount} \u0915\u093E \u0915\u093E\u0909\u0902\u091F\u0930-\u0911\u092B\u093C\u0930 \u092D\u0947\u091C\u093E \u0939\u0948\u0964 \u0907\u0938\u0947 \u0938\u094D\u0935\u0940\u0915\u093E\u0930 \u0915\u0930\u0947\u0902 \u092F\u093E \u0926\u0942\u0938\u0930\u0940 \u0930\u093E\u0936\u093F \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935\u093F\u0924 \u0915\u0930\u0947\u0902\u0964",
        APPROVED: "{amount} \u092A\u0930 \u0938\u094D\u0935\u0940\u0915\u0943\u0924\u0964 CASTADI \u0915\u094B \u092F\u0939 \u0930\u093E\u0936\u093F \u091A\u0941\u0915\u093E\u090F\u0901, \u0930\u0938\u0940\u0926 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 \u0914\u0930 \u091C\u092E\u093E \u0915\u0930\u0947\u0902\u0964",
        REJECTED: "\u092F\u0939 \u0915\u094B\u091F\u0947\u0936\u0928 \u0905\u0938\u094D\u0935\u0940\u0915\u093E\u0930 \u0939\u0941\u0906\u0964 \u0907\u0924\u093F\u0939\u093E\u0938 \u092E\u0947\u0902 \u0928\u094B\u091F \u0926\u0947\u0916\u0947\u0902, \u092B\u093F\u0930 \u0938\u0902\u0936\u094B\u0927\u093F\u0924 \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935 \u0915\u0947 \u0938\u093E\u0925 \u0907\u0938\u0947 \u092B\u093F\u0930 \u0916\u094B\u0932\u0947\u0902\u0964",
        PAYMENT_SUBMITTED: "{amount} \u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u091C\u092E\u093E \u0939\u0941\u0906\u0964 \u0939\u092E \u0906\u092A\u0915\u0940 \u0930\u0938\u0940\u0926 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u0915\u0930\u0915\u0947 \u0915\u0948\u0902\u092A\u0947\u0928 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902\u0917\u0947 \u2014 \u0924\u092C \u0924\u0915 \u0906\u092A\u0915\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0930\u0941\u0915\u0940 \u0930\u0939\u0947\u0902\u0917\u0940\u0964",
        COMPLETED: "{amount} \u0915\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924\u0964 \u0906\u092A\u0915\u093E \u0915\u0948\u0902\u092A\u0947\u0928 \u092A\u0915\u094D\u0915\u093E \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964",
        CANCELLED: "\u092F\u0939 \u0915\u094B\u091F\u0947\u0936\u0928 \u0930\u0926\u094D\u0926 \u0915\u0930 \u0926\u093F\u092F\u093E \u0917\u092F\u093E\u0964"
      },
      offList: "\u092F\u0939 {list} \u0915\u0947 \u0938\u0942\u091A\u0940 \u092E\u0942\u0932\u094D\u092F \u0938\u0947 {percent} \u0915\u092E \u0939\u0948\u0964",
      revisionClosed: "\u092C\u0926\u0932\u093E\u0935 \u091A\u093E\u0939\u093F\u090F? CASTADI \u0938\u0947 \u0907\u0938 \u0915\u094B\u091F\u0947\u0936\u0928 \u0915\u094B \u0938\u0902\u0936\u094B\u0927\u0928 \u0915\u0947 \u0932\u093F\u090F \u0916\u094B\u0932\u0928\u0947 \u0915\u094B \u0915\u0939\u0947\u0902\u0964",
      revisionOpen: "\u092F\u0939 \u0915\u094B\u091F\u0947\u0936\u0928 \u0938\u0902\u0936\u094B\u0927\u0928 \u0915\u0947 \u0932\u093F\u090F \u0916\u0941\u0932\u093E \u0939\u0948 \u2014 \u0906\u092A \u0928\u0908 \u0930\u093E\u0936\u093F \u092A\u094D\u0930\u0938\u094D\u0924\u093E\u0935\u093F\u0924 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      exportPdf: "PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
      exportTxt: ".txt \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
      paymentTitle: "\u092D\u0941\u0917\u0924\u093E\u0928",
      viewPayment: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0926\u0947\u0916\u0947\u0902",
      viewInvoice: "\u0907\u0928\u0935\u0949\u0907\u0938 \u0926\u0947\u0916\u0947\u0902"
    },
    page: {
      title: "\u0915\u094B\u091F\u0947\u0936\u0928",
      description: "CASTADI \u0915\u0947 \u0938\u093E\u0925 \u0924\u092F \u0915\u0940 \u0917\u0908 \u0939\u0930 \u0915\u0940\u092E\u0924, \u0914\u0930 \u0909\u0938\u0915\u0940 \u0938\u094D\u0925\u093F\u0924\u093F\u0964",
      empty: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0915\u094B\u091F\u0947\u0936\u0928 \u0928\u0939\u0940\u0902",
      emptyHint: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092C\u0928\u093E\u0924\u0947 \u0938\u092E\u092F \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0914\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u091A\u0930\u0923 \u0938\u0947 \u0915\u094B\u091F\u0947\u0936\u0928 \u092E\u093E\u0901\u0917\u0947\u0902\u0964",
      campaign: "\u0915\u0948\u0902\u092A\u0947\u0928",
      listPrice: "\u0938\u0942\u091A\u0940 \u092E\u0942\u0932\u094D\u092F",
      current: "\u0915\u094B\u091F\u0947\u0936\u0928 \u0930\u093E\u0936\u093F",
      status: "\u0938\u094D\u0925\u093F\u0924\u093F",
      updated: "\u0905\u0902\u0924\u093F\u092E \u0905\u092A\u0921\u0947\u091F",
      open: "\u0916\u094B\u0932\u0947\u0902",
      all: "\u0938\u092D\u0940",
      active: "\u091A\u093E\u0932\u0942",
      closed: "\u092C\u0902\u0926",
      previous: "\u092A\u093F\u091B\u0932\u093E",
      next: "\u0905\u0917\u0932\u093E",
      pageOf: "\u092A\u0947\u091C {page} / {total}",
      receipt: "\u0930\u0938\u0940\u0926",
      quotation: "\u0915\u094B\u091F\u0947\u0936\u0928",
      printPdf: "\u092A\u094D\u0930\u093F\u0902\u091F / PDF",
      downloadTxt: ".txt \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
      number: "\u0915\u094B\u091F\u0947\u0936\u0928 \u0928\u0902.",
      view: "\u0926\u0947\u0916\u0947\u0902",
      viewInCampaign: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092E\u0947\u0902 \u0926\u0947\u0916\u0947\u0902",
      search: "\u0915\u0948\u0902\u092A\u0947\u0928 \u092F\u093E \u0915\u094B\u0921 \u0916\u094B\u091C\u0947\u0902"
    }
  },
  proofRequests: {
    status: {
      PENDING: "\u0905\u0928\u0941\u0930\u094B\u0927 \u0915\u093F\u092F\u093E \u0917\u092F\u093E",
      SUBMITTED: "\u092B\u094B\u091F\u094B \u092D\u0947\u091C\u0940 \u0917\u0908",
      VERIFIED: "\u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924",
      OVERDUE: "\u0926\u0947\u0930\u0940 \u0939\u0941\u0908",
      WAIVED: "\u092E\u093E\u092B\u093C \u0915\u093F\u092F\u093E \u0917\u092F\u093E"
    },
    source: {
      AUTO_GO_LIVE: "\u0905\u092A\u0928\u0947-\u0906\u092A \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u0905\u0928\u0941\u0930\u094B\u0927",
      ADVERTISER: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E \u0915\u093E \u0905\u0928\u0941\u0930\u094B\u0927",
      PARTNER: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u093E\u0930\u094D\u091F\u0928\u0930 \u0928\u0947 \u092D\u0947\u091C\u0940"
    },
    due: {
      overdue: "\u0926\u0947\u0930\u0940 \u0939\u0941\u0908",
      hours: "{count} \u0918\u0902\u091F\u0947 \u092E\u0947\u0902 \u0926\u0947\u092F",
      days: "{count} \u0926\u093F\u0928 \u092E\u0947\u0902 \u0926\u0947\u092F"
    },
    matched: "\u0926\u0930\u094D\u091C \u092A\u094D\u0932\u0947\u092C\u0948\u0915 \u0938\u0947 \u092E\u0947\u0932 \u0916\u093E\u0924\u0940 \u0939\u0948",
    screen: {
      empty: "\u0906\u091C \u0907\u0938 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0915\u094B\u0908 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0928\u0939\u0940\u0902 \u091A\u0932 \u0930\u0939\u093E, \u0907\u0938\u0932\u093F\u090F \u092B\u094B\u091F\u094B \u0932\u0947\u0928\u0947 \u0915\u0940 \u091C\u093C\u0930\u0942\u0930\u0924 \u0928\u0939\u0940\u0902\u0964",
      noRequest: "\u0915\u094B\u0908 \u0905\u0928\u0941\u0930\u094B\u0927 \u0928\u0939\u0940\u0902",
      answer: "\u092B\u094B\u091F\u094B \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
      volunteer: "\u092B\u093F\u0930 \u092D\u0940 \u092B\u094B\u091F\u094B \u092D\u0947\u091C\u0947\u0902",
      advertiserNote: "\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0926\u093E\u0924\u093E \u0915\u093E \u0938\u0902\u0926\u0947\u0936"
    },
    upload: {
      choose: "\u092B\u094B\u091F\u094B \u0932\u0947\u0902 \u092F\u093E \u091A\u0941\u0928\u0947\u0902",
      caption: "\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0928\u094B\u091F (\u091C\u0948\u0938\u0947 \u0926\u094B\u092A\u0939\u0930 3 \u092C\u091C\u0947 \u0915\u093E \u0938\u094D\u0932\u0949\u091F)",
      submit: "\u092B\u094B\u091F\u094B \u092D\u0947\u091C\u0947\u0902",
      uploading: "\u092D\u0947\u091C \u0930\u0939\u0947 \u0939\u0948\u0902\u2026",
      cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
      done: "\u092B\u094B\u091F\u094B \u092D\u0947\u091C \u0926\u0940 \u0917\u0908",
      failed: "\u092B\u094B\u091F\u094B \u0928\u0939\u0940\u0902 \u092D\u0947\u091C \u0938\u0915\u0947\u0964 \u0915\u0943\u092A\u092F\u093E \u092B\u093F\u0930 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902\u0964",
      badType: "JPG \u092F\u093E PNG \u092B\u094B\u091F\u094B \u0907\u0938\u094D\u0924\u0947\u092E\u093E\u0932 \u0915\u0930\u0947\u0902\u0964",
      tooLarge: "\u092B\u094B\u091F\u094B \u092C\u0939\u0941\u0924 \u092C\u0921\u093C\u0940 \u0939\u0948 (\u0905\u0927\u093F\u0915\u0924\u092E {mb}MB)\u0964",
      lockedHint: "\u092D\u0947\u091C\u0928\u0947 \u0915\u0947 \u092C\u093E\u0926 \u092B\u094B\u091F\u094B \u092C\u0926\u0932\u0940 \u092F\u093E \u0939\u091F\u093E\u0908 \u0928\u0939\u0940\u0902 \u091C\u093E \u0938\u0915\u0924\u0940\u0964"
    },
    campaign: {
      title: "\u092A\u094D\u0930\u0942\u092B\u093C \u0911\u092B\u093C \u092A\u094D\u0932\u0947: \u092B\u094B\u091F\u094B",
      subtitle: "\u0939\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932\u0924\u0947 \u0939\u0941\u090F, \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u093E\u0930\u094D\u091F\u0928\u0930 \u0915\u0940 \u092D\u0947\u091C\u0940 \u092B\u094B\u091F\u094B\u0964 \u091C\u092C \u091A\u093E\u0939\u0947\u0902 \u0928\u0908 \u092B\u094B\u091F\u094B \u092E\u093E\u0902\u0917\u0947\u0902\u0964",
      empty: "\u0906\u092A\u0915\u093E \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u0905\u092D\u0940 \u0915\u093F\u0938\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0932\u093E\u0907\u0935 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0932\u093E\u0907\u0935 \u0939\u094B\u0928\u0947 \u092A\u0930 \u092B\u094B\u091F\u094B \u092A\u094D\u0930\u0942\u092B\u093C \u092F\u0939\u093E\u0901 \u0926\u093F\u0916\u0947\u0917\u093E\u0964",
      noneYet: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u092B\u094B\u091F\u094B \u0928\u0939\u0940\u0902\u0964 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928 \u091A\u0932\u0928\u093E \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u0947 \u0939\u0940 \u0905\u092A\u0928\u0947-\u0906\u092A \u092E\u093E\u0902\u0917\u0940 \u091C\u093E\u090F\u0917\u0940\u0964",
      request: "\u092B\u094B\u091F\u094B \u092E\u093E\u0902\u0917\u0947\u0902",
      alreadyRequested: "\u092B\u094B\u091F\u094B \u092E\u093E\u0902\u0917\u0940 \u091C\u093E \u091A\u0941\u0915\u0940 \u0939\u0948",
      notePlaceholder: "\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0928\u094B\u091F (\u091C\u0948\u0938\u0947 \u0936\u093E\u092E \u0915\u093E \u0938\u094D\u0932\u0949\u091F)",
      send: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092D\u0947\u091C\u0947\u0902",
      sending: "\u092D\u0947\u091C \u0930\u0939\u0947 \u0939\u0948\u0902\u2026",
      requested: "\u0905\u0928\u0941\u0930\u094B\u0927 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u093E\u0930\u094D\u091F\u0928\u0930 \u0915\u094B \u092D\u0947\u091C \u0926\u093F\u092F\u093E \u0917\u092F\u093E",
      requestFailed: "\u0905\u0928\u0941\u0930\u094B\u0927 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C \u0938\u0915\u0947\u0964"
    },
    dashboard: {
      partnerTitle: "\u092D\u0947\u091C\u0928\u0947 \u0935\u093E\u0932\u0940 \u092B\u094B\u091F\u094B",
      advertiserTitle: "\u0906\u092A\u0915\u0947 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u094B\u0902 \u0915\u093E \u092B\u094B\u091F\u094B \u092A\u094D\u0930\u0942\u092B\u093C",
      adminTitle: "\u0926\u0947\u0930\u0940 \u0935\u093E\u0932\u0947 \u092B\u094B\u091F\u094B \u092A\u094D\u0930\u0942\u092B\u093C",
      counts: "{open} \u0916\u0941\u0932\u0947, {overdue} \u0926\u0947\u0930\u0940 \u0938\u0947",
      waive: "\u092E\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
      waiveReason: "\u092E\u093E\u092B\u093C \u0915\u0930\u0928\u0947 \u0915\u093E \u0915\u093E\u0930\u0923",
      waiveConfirm: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092E\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
      cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
      waived: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092E\u093E\u092B\u093C \u0915\u093F\u092F\u093E \u0917\u092F\u093E",
      waiveFailed: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092E\u093E\u092B\u093C \u0928\u0939\u0940\u0902 \u0915\u0930 \u0938\u0915\u0947\u0964"
    }
  }
};

// src/i18n/index.ts
var LOCALES = ["en", "hi"];
var DEFAULT_LOCALE = "en";
var messages = { en: en_default, hi: hi_default };
function coerceLocale(value) {
  return typeof value === "string" && LOCALES.includes(value) ? value : null;
}

export { DEFAULT_LOCALE, LOCALES, coerceLocale, messages };
