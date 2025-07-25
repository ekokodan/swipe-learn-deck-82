import { LearningDeck } from '@/components/learning-deck/types';

export const sampleDeck: LearningDeck = {
  id: "passe-compose",
  title: "Passé Composé",
  level: 3,
  language: "FR",
  milestones: [
    { id: "def", type: "definition", text: "Le passé composé exprime..." },
    { id: "formula", type: "pattern-table" },
    { id: "prac1", type: "practice", prompt: "Conjugate: I spoke (parler)", answer: "j'ai parlé" }
  ],
  cards: [
    {
      id: "def-1",
      type: "definition",
      title: "What is Passé Composé?",
      content: {
        term: "Passé Composé",
        definition: "A French past tense used to express completed actions in the past. It's equivalent to both simple past and present perfect in English.",
        pronunciation: "pa-say kom-po-ZAY",
        examples: [
          "J'ai mangé une pomme. (I ate an apple.)",
          "Elle a fini ses devoirs. (She finished her homework.)",
          "Nous avons voyagé en France. (We traveled to France.)"
        ]
      }
    },
    {
      id: "pattern-1",
      type: "pattern-table",
      title: "Formation Pattern",
      content: {
        title: "Passé Composé with AVOIR",
        headers: ["Person", "Avoir", "Past Participle", "Example"],
        rows: [
          ["Je", "ai", "parlé", "J'ai parlé"],
          ["Tu", "as", "parlé", "Tu as parlé"],
          ["Il/Elle", "a", "parlé", "Il a parlé"],
          ["Nous", "avons", "parlé", "Nous avons parlé"],
          ["Vous", "avez", "parlé", "Vous avez parlé"],
          ["Ils/Elles", "ont", "parlé", "Ils ont parlé"]
        ],
        notes: [
          "Most verbs use AVOIR as auxiliary verb",
          "Past participle of -ER verbs: replace -ER with -É",
          "Past participle agrees with direct object when it comes before the verb"
        ]
      }
    },
    {
      id: "animated-1",
      type: "animated-example",
      title: "Building a Sentence",
      content: {
        title: "How to form: 'I ate the apple'",
        steps: [
          { text: "Start with the subject", highlight: "Je" },
          { text: "Add the auxiliary verb AVOIR", highlight: "J'ai" },
          { text: "Add the past participle", highlight: "J'ai mangé" },
          { text: "Complete with the object", highlight: "J'ai mangé la pomme" },
          { text: "✓ Perfect! You've formed passé composé!", highlight: "J'ai mangé la pomme." }
        ]
      }
    },
    {
      id: "misconception-1",
      type: "misconception",
      title: "Common Mistake",
      content: {
        misconception: "Using ÊTRE with all verbs like in English 'I have eaten'",
        correction: "Most verbs use AVOIR, only specific verbs (mainly movement/change of state) use ÊTRE",
        explanation: "Unlike English where 'have' is always used for perfect tenses, French distinguishes between AVOIR and ÊTRE based on the type of verb.",
        examples: [
          { wrong: "Je suis mangé", correct: "J'ai mangé" },
          { wrong: "Il est parlé", correct: "Il a parlé" },
          { wrong: "Nous sommes fini", correct: "Nous avons fini" }
        ]
      }
    },
    {
      id: "practice-1",
      type: "practice",
      title: "Practice Exercise",
      content: {
        prompt: "Conjugate 'parler' (to speak) in passé composé for 'tu':",
        answer: "tu as parlé",
        type: "text",
        hint: "Remember: TU + auxiliary verb + past participle (-é)",
        explanation: "Tu as parlé = You spoke/You have spoken. We use 'as' (from avoir) + 'parlé' (past participle of parler)."
      }
    },
    {
      id: "pattern-2",
      type: "pattern-table",
      title: "Verbs with ÊTRE",
      content: {
        title: "Special Verbs Using ÊTRE",
        headers: ["Infinitive", "Past Participle", "Example"],
        rows: [
          ["aller", "allé(e)", "Je suis allé(e)"],
          ["venir", "venu(e)", "Tu es venu(e)"],
          ["partir", "parti(e)", "Il est parti"],
          ["arriver", "arrivé(e)", "Elle est arrivée"],
          ["rester", "resté(e)", "Nous sommes resté(e)s"],
          ["devenir", "devenu(e)", "Vous êtes devenu(e)(s)"]
        ],
        notes: [
          "These verbs describe movement or change of state",
          "Past participle agrees with the subject in gender and number",
          "Remember DR MRS VANDERTRAMP for memorizing ÊTRE verbs"
        ]
      }
    },
    {
      id: "practice-2",
      type: "practice",
      title: "ÊTRE or AVOIR?",
      content: {
        prompt: "Choose the correct auxiliary verb: Elle ___ partie hier. (She left yesterday)",
        answer: "est",
        type: "multiple-choice",
        options: ["a", "est", "ai", "sont"],
        hint: "The verb 'partir' (to leave) indicates movement",
        explanation: "Partir uses ÊTRE as auxiliary. Since the subject is 'elle' (feminine singular), we use 'est' and the past participle agrees: 'partie'."
      }
    },
    {
      id: "animated-2",
      type: "animated-example",
      title: "Agreement Rules",
      content: {
        title: "Past Participle Agreement",
        steps: [
          { text: "With AVOIR: No agreement normally", highlight: "J'ai mangé la pomme" },
          { text: "Exception: Agreement with preceding direct object", highlight: "La pomme que j'ai mangée" },
          { text: "With ÊTRE: Always agrees with subject", highlight: "Elle est partie" },
          { text: "Feminine: add -e", highlight: "parti → partie" },
          { text: "Plural: add -s", highlight: "parti → partis, partie → parties" }
        ]
      }
    },
    {
      id: "practice-3",
      type: "practice",
      title: "Final Challenge",
      content: {
        prompt: "Translate: 'We (feminine) arrived yesterday'",
        answer: "nous sommes arrivées hier",
        type: "text",
        hint: "Remember: ÊTRE verb + feminine plural agreement",
        explanation: "Arriver uses ÊTRE. 'Nous' (feminine) requires 'arrivées' with feminine plural ending -ées."
      }
    }
  ]
};