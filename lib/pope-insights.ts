export type PopeInsight = {
  summary: string;
  watch: string[];
  next?: {
    label: string;
    href: string;
  };
};

export const POPE_INSIGHTS: Record<string, PopeInsight> = {
  "pope-peter": {
    summary:
      "Peter is the beginning of the Roman succession as the site presents it. The dates are necessarily cautious, but his place gives the whole timeline its starting claim: the Bishop of Rome is not only an office in the city, but a remembered line from the apostolic age.",
    watch: [
      "The timeline uses c. 30 because the Holy See table leaves the beginning blank and gives the ending as 64 or 67.",
      "Early succession is marked with greater caution because the ancient lists are official and early, but not all date details are equally firm.",
    ],
    next: { label: "Read the method", href: "/about" },
  },
  "pope-damasus-i": {
    summary:
      "Damasus stands where Roman memory, Latin Christian culture, and public authority begin to look recognizably papal. His era shows the church no longer surviving at the edge of empire, but organizing doctrine, Scripture, and commemoration in a Christian imperial world.",
    watch: [
      "Notice the shift from persecuted minority memory to public Christian patronage.",
      "This is a good bridge from the early lists into the Latin West.",
    ],
  },
  "pope-leo-i": {
    summary:
      "Leo I matters because the papal office becomes clearer in language and public action. He is one of the first popes whose profile feels large enough to read as both theologian and Roman pastor in a world under political strain.",
    watch: [
      "His pontificate sits at the turn from late Roman stability into western imperial collapse.",
      "Major pope pages are places where richer essays can be added without changing the core sequence.",
    ],
  },
  "pope-gregory-i": {
    summary:
      "Gregory I is a hinge between antiquity and the medieval papacy. He shows Rome as a pastoral, administrative, liturgical, and missionary center after the older imperial structures in the West had weakened.",
    watch: [
      "The succession line becomes easier to date, but the surrounding world is less stable.",
      "His page is a natural starting point for medieval papal history.",
    ],
  },
  "pope-gregory-vii": {
    summary:
      "Gregory VII marks the reform papacy at full intensity. The office is no longer only guarding a received sequence; it is asserting claims about spiritual authority, appointment, discipline, and the relation between church and empire.",
    watch: [
      "This is where a single-line succession needs political context.",
      "The investiture struggle belongs beside the timeline as an era note, not as a new succession branch.",
    ],
  },
  "pope-innocent-iii": {
    summary:
      "Innocent III is one of the high points of medieval papal power. His pontificate makes sense only when read as institution, law, council, diplomacy, and spiritual authority all acting through the Roman see.",
    watch: [
      "The main line remains simple, but the papal office around it has become institutionally dense.",
      "This is a strong candidate for a future long-form explainer page.",
    ],
  },
  "pope-pius-v": {
    summary:
      "Pius V belongs to the post-Reformation Catholic response. His importance is not just that he appears in sequence, but that his pontificate sits inside reform, liturgy, discipline, and confessional boundary-making after Trent.",
    watch: [
      "The Reformation era is better explained through context than by adding visual branches to the pope line.",
      "A future layer could connect councils and major reforms around these pontificates.",
    ],
  },
  "pope-pius-ix": {
    summary:
      "Pius IX bridges the older temporal papacy and the modern papacy. His long pontificate includes Vatican I, the loss of the Papal States, and the sharper modern definition of papal office.",
    watch: [
      "A long bar on the timeline here is historically meaningful, not just visually large.",
      "Modern papal history starts to become global, political, and media-visible in new ways.",
    ],
  },
  "pope-leo-xiii": {
    summary:
      "Leo XIII shows the papacy speaking into the modern social order after the collapse of the old political frame. He is a natural bridge from nineteenth-century crisis to modern Catholic social teaching.",
    watch: [
      "This page deserves future links to major documents once the site adds a documents layer.",
      "The timeline helps show how close Leo XIII is to the contemporary popes compared with the long sweep before him.",
    ],
  },
  "pope-john-xxiii": {
    summary:
      "John XXIII matters because his pontificate opens the Vatican II era. The timeline makes the brevity of the pontificate visible, while the historical consequence is far larger than the bar length.",
    watch: [
      "Short pontificates can be disproportionately important.",
      "This is one of the clearest places where a council layer would strengthen the site.",
    ],
  },
  "pope-john-paul-ii": {
    summary:
      "John Paul II gives the modern section a global scale. His long pontificate belongs to late Cold War politics, mass travel, media visibility, catechesis, and a changing relationship between Rome and local churches.",
    watch: [
      "The modern timeline compresses many familiar names into a short historical distance.",
      "Future biographies should stay sourced, charitable, and explanatory.",
    ],
  },
  "pope-benedict-xvi": {
    summary:
      "Benedict XVI is historically important for theology, liturgy, and resignation. The official sequence continues cleanly, but the end of his pontificate needs special context because resignation is rare in papal history.",
    watch: [
      "The timeline shows a clean succession; the historical note explains why the end date matters.",
      "This is a useful bridge into the modern question of office, retirement, and continuity.",
    ],
  },
  "pope-francis": {
    summary:
      "Francis sits in the visible present of global Catholic life: reform language, pastoral emphasis, synodality, and intense public interpretation. The page should stay factual and source-led because living-memory assessments change quickly.",
    watch: [
      "Recent pontificates need a lighter editorial hand than medieval ones.",
      "The site should separate official dates from interpretation, especially for living-memory history.",
    ],
  },
  "pope-leo-xiv": {
    summary:
      "Leo XIV is the current endpoint of the dataset. His page should stay deliberately simple until the pontificate has enough history to interpret with care.",
    watch: [
      "Current-pope copy should age gracefully and avoid premature verdicts.",
      "The site can update automatically from the Holy See table when the source changes.",
    ],
    next: { label: "Open the full directory", href: "/directory" },
  },
};

export function getPopeInsight(id: string): PopeInsight | undefined {
  return POPE_INSIGHTS[id];
}
