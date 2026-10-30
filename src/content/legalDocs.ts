export type LegalSection = { h: string; p?: string[]; list?: string[] };
export type LegalDoc = { title: string; updated: string; intro?: string; sections: LegalSection[] };
export type LegalDocId = "impressum" | "datenschutz" | "agb";

export const legalDocs: Record<LegalDocId, LegalDoc> = {
  impressum: {
    title: "Impressum",
    updated: "Stand: Juli 2026",
    intro: "Angaben gemäß § 5 ECG, § 25 MedienG und § 63 GewO.",
    sections: [
      {
        h: "Medieninhaber & Diensteanbieter",
        p: [
          "120 Ventures GmbH",
          "Baumgasse 129, 1030 Wien, Österreich",
          "Nutriful ist ein Projekt der 120 Ventures GmbH.",
        ],
      },
      {
        h: "Kontakt",
        p: ["E-Mail: office@120.ventures", "Web: 120.ventures"],
      },
      {
        h: "Vertretungsberechtigt",
        p: ["Geschäftsführung: Sebastian Hermans"],
      },
      {
        h: "Unternehmensdaten",
        p: [
          "Firmenbuchnummer: FN 617650",
          "Firmenbuchgericht: Handelsgericht Wien",
          "UID-Nummer: ATU80155458",
          "Unternehmensgegenstand: Eigen- und Auftragsforschung sowie Entwicklung innovativer digitaler Geschäftsmodelle",
        ],
      },
      {
        h: "Kammerzugehörigkeit & Rechtsvorschriften",
        p: [
          "Mitglied der Wirtschaftskammer Wien.",
          "Anwendbare Rechtsvorschrift: Gewerbeordnung (GewO), abrufbar unter ris.bka.gv.at.",
        ],
      },
      {
        h: "Online-Streitbeilegung",
        p: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ec.europa.eu/consumers/odr. Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
      {
        h: "Gesundheitlicher Hinweis",
        p: [
          "Nutriful ist ein digitales Werkzeug zur Begleitung von Ernährungsberatung und kein Medizinprodukt im Sinne der Verordnung (EU) 2017/745 (MDR). Nutriful stellt keine medizinische Diagnose und ersetzt keine fachliche oder ärztliche Beratung, Untersuchung oder Behandlung.",
        ],
      },
      {
        h: "Haftung für Inhalte & Links",
        p: [
          "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir jedoch keine Gewähr. Für Inhalte externer, verlinkter Websites sind ausschließlich deren Betreiber verantwortlich.",
        ],
      },
      {
        h: "Urheberrecht",
        p: [
          "Sämtliche Inhalte dieser Website (Texte, Grafiken, Logo) sind urheberrechtlich geschützt.",
          "Fotografie: iStock.com/djiledesign (Stock-Foto-ID 1465949774), iStock.com/Dimensions (Stock-Foto-ID 2206546844) und iStock.com/Sofiia Shunkina (Stock-Foto-ID 2154220284), lizenziert.",
        ],
      },
    ],
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    updated: "Stand: Juli 2026",
    intro:
      "Der Schutz deiner personenbezogenen Daten ist uns wichtig. Wir verarbeiten deine Daten ausschließlich im Rahmen der gesetzlichen Bestimmungen (DSGVO, österreichisches DSG). Diese Erklärung informiert dich über Art, Umfang und Zweck der Verarbeitung.",
    sections: [
      {
        h: "1. Verantwortlicher",
        p: [
          "120 Ventures GmbH, Baumgasse 129, 1030 Wien, Österreich.",
          "E-Mail: office@120.ventures",
        ],
      },
      {
        h: "2. Welche Daten wir verarbeiten",
        list: [
          "Kontaktdaten: dein Name und deine E-Mail-Adresse, wenn du über das Formular ein Erstgespräch zum Pilotprogramm anfragst.",
          "Technische Daten: beim Aufruf der Website anfallende Daten wie IP-Adresse, Zeitpunkt und Browsertyp (User-Agent).",
        ],
      },
      {
        h: "3. Zwecke & Rechtsgrundlagen",
        list: [
          "Kontaktaufnahme zum Pilotprogramm und Vereinbarung eines Erstgesprächs, auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), jederzeit widerrufbar.",
          "Betrieb, Sicherheit und Verbesserung der Website, berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).",
        ],
      },
      {
        h: "4. Eingesetzte Dienste (Auftragsverarbeiter)",
        list: [
          "Supabase (Supabase Inc.), Datenbank und Backend zur Speicherung deiner Kontaktanfrage.",
          "Netlify, Hosting der Website.",
          "PostHog (PostHog Inc., EU-Hosting in Frankfurt am Main), anonyme Produkt- und Nutzungsanalyse (Reichweite, Klickverhalten), um die Website zu verbessern. Wird nur nach deiner ausdrücklichen Einwilligung geladen; ohne Einwilligung werden keine Analyse-Cookies gesetzt. Die Daten werden innerhalb der EU verarbeitet.",
          "Cookiebot (Usercentrics A/S, Dänemark), Einwilligungsverwaltung. Cookiebot zeigt den Cookie-Hinweis, dokumentiert deine Entscheidung und speichert dazu eine anonyme Kennung sowie deine gekürzte IP-Adresse. Diese Verarbeitung ist zur Erfüllung unserer Nachweispflicht erforderlich und findet innerhalb der EU statt.",
        ],
        p: [
          "Mit allen Dienstleistern bestehen bzw. werden Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO geschlossen. Bei Übermittlung in Drittländer werden geeignete Garantien (z. B. EU-Standardvertragsklauseln) eingesetzt.",
        ],
      },
      {
        h: "5. Cookies & Einwilligung",
        p: [
          "Technisch notwendige Speicherung (z. B. deine Cookie-Entscheidung) nutzen wir immer. Analyse-Cookies von PostHog setzen wir ausschließlich mit deiner ausdrücklichen Einwilligung. Den Cookie-Hinweis stellt Cookiebot bereit; deine Entscheidung kannst du dort jederzeit über „Cookie-Einstellungen“ im Seitenfuß ändern oder widerrufen. Marketing-Cookies setzen wir keine.",
        ],
      },
      {
        h: "6. Speicherdauer",
        p: [
          "Wir speichern deine Daten so lange, wie es für die genannten Zwecke erforderlich ist bzw. bis zu deinem Widerruf. Danach werden die Daten gelöscht, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.",
        ],
      },
      {
        h: "7. Deine Rechte",
        p: [
          "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Erteilte Einwilligungen kannst du jederzeit mit Wirkung für die Zukunft widerrufen, wende dich dazu an office@120.ventures.",
          "Du hast außerdem das Recht auf Beschwerde bei der Österreichischen Datenschutzbehörde (dsb.gv.at).",
        ],
      },
      {
        h: "8. Datensicherheit",
        p: [
          "Die Übertragung erfolgt verschlüsselt (TLS/HTTPS). Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz deiner Daten.",
        ],
      },
    ],
  },
  agb: {
    title: "Allgemeine Geschäfts- & Nutzungsbedingungen",
    updated: "Stand: Juli 2026",
    intro:
      "Diese Bedingungen regeln die Nutzung der Website nutriful.at während der aktuellen Testphase.",
    sections: [
      {
        h: "1. Geltungsbereich & Anbieter",
        p: [
          "Anbieter und Betreiber der Website nutriful.at ist die 120 Ventures GmbH, Baumgasse 129, 1030 Wien. Diese Bedingungen gelten für alle Besucher:innen der Website.",
        ],
      },
      {
        h: "2. Aktuelle Testphase, kein Verkauf",
        p: [
          "Nutriful befindet sich in einer frühen Testphase. Über die Website kannst du unverbindlich ein Erstgespräch zum Pilotprogramm für Diätolog:innen und Ernährungsberater:innen anfragen.",
          "Es findet derzeit kein Verkauf statt: Es werden keine kostenpflichtigen Produkte angeboten und es kommt kein Kaufvertrag zustande. Angezeigte Preise dienen ausschließlich der Information über ein geplantes künftiges Angebot.",
        ],
      },
      {
        h: "3. Unverbindlichkeit",
        p: [
          "Die Anfrage eines Erstgesprächs ist kostenlos und unverbindlich. Aus ihr entsteht kein Anspruch auf Teilnahme am Pilotprogramm oder auf ein späteres Angebot.",
        ],
      },
      {
        h: "4. Gesundheitlicher Hinweis",
        p: [
          "Nutriful ist ein digitales Werkzeug zur Begleitung von Ernährungsberatung, kein Medizinprodukt. Es stellt keine medizinische Diagnose und ersetzt keine fachliche Beratung oder ärztliche Behandlung. Die fachliche Verantwortung für die Beratung liegt bei den betreuenden Berater:innen.",
        ],
      },
      {
        h: "5. Haftung",
        p: [
          "Für Schäden aus der Nutzung der Website haften wir nur bei Vorsatz oder grober Fahrlässigkeit.",
        ],
      },
      {
        h: "6. Anwendbares Recht",
        p: [
          "Es gilt österreichisches Recht unter Ausschluss der Verweisungsnormen. Zwingende Verbraucherschutzbestimmungen bleiben unberührt.",
        ],
      },
    ],
  },
};

