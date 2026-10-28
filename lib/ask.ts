import { book, events, giving, ministry, radio } from "@/data/ministry";

/**
 * The Ask helper: a scripted decision tree, not a chatbot. Every answer comes
 * from data/ministry.ts. Anything personal (prayer, counsel, a gift question
 * about someone's own situation, booking Dee) routes to a person.
 */

export type AskAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "call"; label: string }
  | { kind: "next"; label: string; to: string };

export type AskNode = {
  id: string;
  question: string;
  answer?: string;
  human?: boolean;
  actions: AskAction[];
};

const call: AskAction = { kind: "call", label: `Call the office, ${ministry.phone.display}` };

export const askNodes: Record<string, AskNode> = {
  start: {
    id: "start",
    question: "How can we help?",
    actions: [
      { kind: "next", label: "I need prayer", to: "prayer" },
      { kind: "next", label: "When is the radio show?", to: "radio" },
      { kind: "next", label: "How do I give?", to: "give" },
      { kind: "next", label: "Is my gift tax-deductible?", to: "tax" },
      { kind: "next", label: "Upcoming events", to: "events" },
      { kind: "next", label: "Dee's book", to: "book" },
      { kind: "next", label: "I'm going through something hard", to: "hard" },
      { kind: "next", label: "Invite Dee to speak", to: "speak" },
    ],
  },
  prayer: {
    id: "prayer",
    question: "I need prayer",
    answer: "You don't have to carry it alone. Send your request and the ministry team will pray. If it's urgent, call the office.",
    human: true,
    actions: [{ kind: "link", label: "Send a prayer request", href: "/prayer" }, call],
  },
  radio: {
    id: "radio",
    question: "When is the radio show?",
    answer: `${radio.name} with ${radio.hosts}: ${radio.when} on ${radio.station.name} and wpsm.com. Listeners could also join live at ${radio.live.venue}, ${radio.live.address}. (Schedule from ${radio.asOf}; we're confirming it's current.)`,
    actions: [{ kind: "link", label: "Radio page", href: "/radio" }, { kind: "link", label: "Listen on WPSM", href: radio.station.url }],
  },
  give: {
    id: "give",
    question: "How do I give?",
    answer: `Mail a check payable to ${giving.payableTo}, ${giving.mailTo.oneLine}. Online giving is being set up; leave a pledge and the office will follow up.`,
    actions: [{ kind: "link", label: "Give", href: "/give" }],
  },
  tax: {
    id: "tax",
    question: "Is my gift tax-deductible?",
    answer: `${ministry.nonprofit} For questions about your own gift or receipt, the office will help you directly.`,
    human: true,
    actions: [call, { kind: "link", label: "Email the office", href: `mailto:${ministry.email}` }],
  },
  events: {
    id: "events",
    question: "Upcoming events",
    answer: events.map((e) => `${e.name}: ${e.nextDate}`).join(" · "),
    actions: events.map((e) => ({ kind: "link" as const, label: e.name, href: `/events/${e.slug}` })),
  },
  book: {
    id: "book",
    question: "Dee's book",
    answer: `${book.title}. ${book.pitch} ${book.reach}`,
    actions: [{ kind: "link", label: "Request a copy", href: "/book" }],
  },
  hard: {
    id: "hard",
    question: "I'm going through something hard",
    answer: "We'd love to pray with you, and a real person should hear your story. Call the office or send a prayer request. If you are in danger or thinking about harming yourself, call or text 988 now, or 911.",
    human: true,
    actions: [call, { kind: "link", label: "Send a prayer request", href: "/prayer" }, { kind: "link", label: "Call or text 988", href: "tel:988" }],
  },
  speak: {
    id: "speak",
    question: "Invite Dee to speak",
    answer: `Speaking and booking requests go through ${ministry.assistant.name}, Dee's ${ministry.assistant.role.toLowerCase()}.`,
    human: true,
    actions: [{ kind: "link", label: "Send a booking request", href: "/contact?topic=speaking" }, call],
  },
};
