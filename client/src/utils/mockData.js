export const mockClients = [
  {
    id: "c1",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    dob: "1988-11-23",
    tob: "08:45",
    pob: "Delhi, India",
    problemCategory: "Career",
    createdAt: "2026-01-15T10:30:00Z"
  },
  {
    id: "c2",
    name: "Priya Patel",
    phone: "+91 87654 32109",
    email: "priya.patel@example.com",
    dob: "1992-04-12",
    tob: "14:20",
    pob: "Mumbai, India",
    problemCategory: "Marriage",
    createdAt: "2026-02-10T11:15:00Z"
  },
  {
    id: "c3",
    name: "Amit Verma",
    phone: "+91 76543 21098",
    email: "amit.verma@example.com",
    dob: "1985-08-30",
    tob: "23:10",
    pob: "Lucknow, India",
    problemCategory: "Finance",
    createdAt: "2026-03-01T09:00:00Z"
  },
  {
    id: "c4",
    name: "Sneha Reddy",
    phone: "+91 95432 10987",
    email: "sneha.reddy@example.com",
    dob: "1995-12-05",
    tob: "18:05",
    pob: "Hyderabad, India",
    problemCategory: "Health",
    createdAt: "2026-04-18T16:45:00Z"
  },
  {
    id: "c5",
    name: "Vikram Singh",
    phone: "+91 84321 09876",
    email: "vikram.singh@example.com",
    dob: "1990-07-19",
    tob: "03:30",
    pob: "Jaipur, India",
    problemCategory: "Education",
    createdAt: "2026-05-12T14:20:00Z"
  }
];

export const mockConsultations = [
  {
    id: "con1",
    clientId: "c1",
    clientName: "Rahul Sharma",
    date: "2026-05-20T11:00:00Z",
    category: "Career",
    notes: "Client is facing continuous stagnation in corporate role. Boss conflicts are rising. Desires transition to independent consulting or new job. Current Dasha: Rahu-Saturn. Sade Sati Peak phase active.",
    aiSummary: "The client is experiencing career stagnation and workplace conflicts. The astrological planetary periods (Rahu-Saturn Dasha and Sade Sati Peak) indicate temporary obstacles. A job transition is advised after October 2026. Recommended remedial measures involve strengthening Saturn and calming Rahu.",
    status: "Completed",
    remedies: [
      {
        id: "r1",
        type: "Gemstone",
        name: "Blue Sapphire (Neelam)",
        description: "5.25 Carat Blue Sapphire set in a silver ring, worn on the middle finger of the right hand.",
        status: "Suggested"
      },
      {
        id: "r2",
        type: "Mantra",
        name: "Shani Beej Mantra",
        description: "Chant 'Om Pram Preem Prom Sah Shanaishcharaya Namah' 108 times daily after sunset.",
        status: "Follow-up Pending"
      }
    ]
  },
  {
    id: "con2",
    clientId: "c2",
    clientName: "Priya Patel",
    date: "2026-05-28T15:30:00Z",
    category: "Marriage",
    notes: "Parents looking for proposals. Delays in matches. Manglik check requested. Kundli shows partial Mangal Dosha from 4th house. Compatibility calculations show general delays due to Saturn aspecting 7th house.",
    aiSummary: "The client is facing delays in marriage proposals due to Saturn's aspect on the 7th house and partial Mangal Dosha. Compatibility prospects will improve after Venus transit in July. Remedial measures were recommended to alleviate Mangal Dosha effects.",
    status: "Completed",
    remedies: [
      {
        id: "r3",
        type: "Pooja",
        name: "Mangal Shanti Pooja",
        description: "Perform Manglik dosha nivaran pooja at a local Shiva temple on a Tuesday.",
        status: "Completed"
      }
    ]
  },
  {
    id: "con3",
    clientId: "c3",
    clientName: "Amit Verma",
    date: "2026-06-05T10:00:00Z",
    category: "Finance",
    notes: "Sudden losses in trading. Heavy debt accummulation. 8th house Mars sub-period active. Business partnerships are highly volatile. Advised to immediately halt speculative trading.",
    aiSummary: "The client suffered heavy financial trading losses caused by Mars sub-period in the 8th house. Urgent advice was given to cease speculative investments. Suggested remedies focus on balancing the 8th house energies.",
    status: "Completed",
    remedies: [
      {
        id: "r4",
        type: "Rudraksha",
        name: "7 Mukhi Rudraksha",
        description: "Wear a Nepalese 7 Mukhi Rudraksha around the neck in red thread for financial stability.",
        status: "Suggested"
      }
    ]
  }
];

export const mockFollowups = [
  {
    id: "f1",
    clientId: "c1",
    clientName: "Rahul Sharma",
    consultationId: "con1",
    dueDate: "2026-06-15",
    status: "Pending",
    aiMessage: "Namaste Rahul Ji, hope you are doing well. This is a gentle reminder regarding your career consultation follow-up. Kindly share if you have started chanting the Shani Beej Mantra as suggested.",
    emailSent: false
  },
  {
    id: "f2",
    clientId: "c2",
    clientName: "Priya Patel",
    consultationId: "con2",
    dueDate: "2026-06-12",
    status: "Pending",
    aiMessage: "Namaste Priya Ji, your follow-up check regarding the Mangal Shanti Pooja is due. Kindly let us know if the rituals were completed successfully.",
    emailSent: false
  },
  {
    id: "f3",
    clientId: "c3",
    clientName: "Amit Verma",
    consultationId: "con3",
    dueDate: "2026-06-25",
    status: "Pending",
    aiMessage: "Namaste Amit Ji, this is a follow-up regarding your financial remedy. Have you procured the 7 Mukhi Rudraksha? Please avoid speculative trading.",
    emailSent: false
  }
];

export const mockDashboardMetrics = {
  totalClients: 154,
  totalConsultations: 382,
  pendingFollowups: 18,
  todaysFollowups: 3,
  categoryStats: [
    { name: 'Career', value: 145 },
    { name: 'Marriage', value: 98 },
    { name: 'Finance', value: 64 },
    { name: 'Health', value: 42 },
    { name: 'Education', value: 23 },
    { name: 'Other', value: 10 }
  ],
  recentActivities: [
    { id: "a1", action: "Client Added", target: "Rahul Sharma", time: "2 hours ago" },
    { id: "a2", action: "Consultation Logged", target: "Priya Patel (Marriage)", time: "5 hours ago" },
    { id: "a3", action: "Remedy Marked Completed", target: "Mangal Shanti Pooja - Priya Patel", time: "1 day ago" },
    { id: "a4", action: "Follow-up Email Dispatched", target: "Amit Verma", time: "1 day ago" }
  ],
  aiInsights: [
    { id: "i1", title: "Career Category Spike", description: "There is a 24% increase in career-related consultations this month. Stagnation queries are high.", type: "trend" },
    { id: "i2", title: "Action Required", description: "3 clients with pending gemstone recommendations are due for follow-ups.", type: "action" },
    { id: "i3", title: "Remedy Engagement", description: "Pooja remedies show the highest completion rate (78%), followed by Mantra chants.", type: "remedy" }
  ]
};

export const mockClientInsights = {
  c1: [
    "Saturn Sade Sati peak phase requires consistent follow-up check-ins.",
    "Client is highly receptive to mantra chanting remedies.",
    "Recommend scheduling next full consultation around Saturn Transit in October."
  ],
  c2: [
    "Partial Mangal Dosha influences temporary delays, match prospects improve in late July.",
    "Remedy completion logged. Monitor match feedback.",
    "Family consultation involvement recommended."
  ],
  c3: [
    "Mars 8th house placement indicates severe vulnerability to financial speculation. Constant check on this is required.",
    "Financial recovery is expected to begin gradually from mid-2027."
  ]
};
