import { FormEvent, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { localePath, stripLocale, useLang } from "@/i18n"
import { newDesignCopy } from "@/i18n/newDesignCopy"
import ConsentSettingsLink from "@/components/landing/ConsentSettingsLink"
import "@/styles/new-design.css"
import mascotPomegranate from "@/assets/new-design/7f884.svg"
import mascotApple from "@/assets/new-design/0b611.svg"
import mascotLeaves from "@/assets/new-design/08bdc.svg"
import mascotEggplant from "@/assets/new-design/bffeb.svg"
import mascotBean from "@/assets/new-design/3caea.svg"
import mascotStrawberry from "@/assets/new-design/f8997.svg"
import stickerPomegranate from "@/assets/new-design/pomegranate.png"
import stickerApple from "@/assets/new-design/apple.png"
import stickerLeaves from "@/assets/new-design/leaves.png"
import stickerEggplant from "@/assets/new-design/eggplant.png"
import stickerBean from "@/assets/new-design/bean.png"
import stickerStrawberry from "@/assets/new-design/strawberry.png"
import photoRaspberries from "@/assets/new-design/raspberries.jpg"
import photoOranges from "@/assets/new-design/oranges.jpg"
import giantFruit from "@/assets/new-design/a0cbc.svg"
import bowl from "@/assets/new-design/a22ac.svg"
import smilingFruit from "@/assets/new-design/54dc1.svg"
import problemPhoto from "@/assets/new-design/4adbe.png"
import iconKommunikation from "@/assets/new-design/4b16d.svg"
import iconDokumentation from "@/assets/new-design/75987.svg"
import iconErinnerungen from "@/assets/new-design/5b815.svg"
import iconAbrechnung from "@/assets/new-design/b39af.svg"
import iconZettel from "@/assets/new-design/3536c.svg"
import iconVorbereitung from "@/assets/new-design/1b988.svg"
import iconDokumentiert from "@/assets/new-design/2b855.svg"
import iconDaten from "@/assets/new-design/626b0.svg"
import iconUebersicht from "@/assets/new-design/5ee59.svg"
import iconKalender from "@/assets/new-design/bc371.svg"
import iconKlienten from "@/assets/new-design/3ef38.svg"
import iconNachrichten from "@/assets/new-design/f7f7d.svg"
import iconHonorar from "@/assets/new-design/1236c.svg"
import iconEinstellungen from "@/assets/new-design/f46f0.svg"

const JOURNEY_WAVE =
  "M 1.0 173.0 C 4.0 170.7, 13.2 159.0, 19.0 159.4 C 24.9 159.7, 31.0 167.3, 36.1 175.1 C 41.2 182.9, 44.2 196.2, 49.7 206.3 C 55.1 216.4, 61.2 227.4, 68.7 236.0 C 76.2 244.6, 85.2 253.3, 94.9 257.7 C 104.6 262.1, 116.7 264.0, 126.8 262.2 C 137.0 260.4, 149.0 254.4, 155.9 247.2 C 162.8 239.9, 167.6 228.8, 168.1 218.8 C 168.6 208.9, 163.6 197.8, 158.8 187.6 C 154.1 177.5, 145.6 168.1, 139.8 157.8 C 134.0 147.5, 127.6 136.9, 124.1 125.8 C 120.6 114.7, 118.2 102.6, 118.5 91.3 C 118.8 80.0, 121.3 68.2, 125.9 58.2 C 130.5 48.2, 137.7 38.8, 146.1 31.3 C 154.5 23.8, 165.4 17.6, 176.3 13.2 C 187.1 8.8, 199.4 5.7, 211.0 4.9 C 222.5 4.1, 234.7 5.2, 245.5 8.2 C 256.4 11.1, 266.9 16.2, 276.1 22.7 C 285.3 29.2, 294.1 37.7, 301.0 46.9 C 307.9 56.2, 313.8 67.2, 317.3 78.2 C 320.8 89.2, 322.0 101.3, 322.0 113.1 C 322.0 124.9, 319.7 137.0, 317.2 149.0 C 314.8 161.0, 310.3 173.0, 307.4 185.0 C 304.5 197.0, 300.4 209.3, 299.7 220.9 C 299.1 232.5, 299.6 245.4, 303.6 254.8 C 307.7 264.1, 316.0 273.7, 324.2 277.2 C 332.4 280.7, 344.6 279.9, 352.7 275.6 C 360.8 271.3, 367.2 260.7, 372.8 251.3 C 378.4 241.9, 380.7 228.9, 386.4 219.4 C 392.1 209.8, 398.5 199.5, 406.9 193.8 C 415.3 188.1, 426.8 184.5, 436.8 185.1 C 446.7 185.7, 457.9 191.0, 466.4 197.5 C 475.0 204.0, 481.5 214.6, 487.9 224.0 C 494.3 233.4, 498.7 246.7, 505.0 254.0 C 511.3 261.3, 518.9 268.3, 525.5 267.7 C 532.2 267.1, 539.5 258.8, 545.0 250.4 C 550.6 242.0, 554.4 228.4, 559.1 217.3 C 563.8 206.1, 567.6 194.1, 573.3 183.5 C 578.9 172.9, 585.1 162.3, 593.1 153.7 C 601.0 145.2, 610.6 137.5, 620.9 132.2 C 631.2 126.9, 643.6 123.1, 655.0 121.9 C 666.4 120.7, 678.9 121.6, 689.4 125.3 C 699.8 129.0, 710.0 136.1, 717.9 144.2 C 725.7 152.3, 731.5 163.4, 736.5 174.0 C 741.6 184.5, 744.0 196.5, 748.2 207.4 C 752.4 218.3, 755.7 230.6, 761.9 239.2 C 768.1 247.8, 777.0 256.5, 785.3 258.9 C 793.7 261.3, 804.3 258.8, 812.2 253.7 C 820.0 248.6, 825.3 236.6, 832.6 228.3 C 839.8 219.9, 846.5 209.6, 855.6 203.7 C 864.8 197.7, 876.3 194.8, 887.5 192.5 C 898.7 190.3, 911.4 191.6, 922.9 190.3 C 934.4 189.1, 946.6 188.6, 956.7 184.9 C 966.8 181.3, 986.0 168.0, 1004.0 162.0"

const mascots = [
  mascotPomegranate,
  mascotApple,
  mascotLeaves,
  mascotEggplant,
  mascotBean,
  mascotStrawberry,
]

const stickerMascots = [
  stickerPomegranate,
  stickerApple,
  stickerLeaves,
  stickerEggplant,
  stickerBean,
  stickerStrawberry,
]

const icons: Record<string, string> = {
  "4b16d.svg": iconKommunikation,
  "75987.svg": iconDokumentation,
  "5b815.svg": iconErinnerungen,
  "b39af.svg": iconAbrechnung,
  "3536c.svg": iconZettel,
  "1b988.svg": iconVorbereitung,
  "2b855.svg": iconDokumentiert,
  "626b0.svg": iconDaten,
  "5ee59.svg": iconUebersicht,
  "bc371.svg": iconKalender,
  "3ef38.svg": iconKlienten,
  "f7f7d.svg": iconNachrichten,
  "1236c.svg": iconHonorar,
  "f46f0.svg": iconEinstellungen,
}

const CALENDLY_URL = "https://calendly.com/andrea-buttinger-120/new-meeting-2"

const featureCards = [
  { icon: "4b16d.svg", color: "pink" },
  { icon: "75987.svg", color: "violet" },
  { icon: "5b815.svg", color: "lime" },
  { icon: "b39af.svg", color: "orange" },
]

function Logo({ light = false, href = "#top" }: { light?: boolean; href?: string }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href={href}
      aria-label="Nutriful Startseite"
    >
      Nutriful
    </a>
  )
}

function Mascot({
  index,
  className = "",
  sticker = false,
}: {
  index: number
  className?: string
  sticker?: boolean
}) {
  if (sticker) {
    return (
      <span className={`mascot mascot-sticker ${className}`} aria-hidden="true">
        <img className="mascot-image" src={stickerMascots[index]} alt="" />
        <i className="sticker-accent sticker-star" />
        <i className="sticker-accent sticker-seed" />
      </span>
    )
  }

  return (
    <img
      className={`mascot ${className}`}
      src={mascots[index]}
      alt=""
      aria-hidden="true"
    />
  )
}

const demoNavigation = [
  ["Übersicht", "5ee59.svg"],
  ["Kalender", "bc371.svg"],
  ["Klient:innen", "3ef38.svg"],
  ["Nachrichten", "f7f7d.svg"],
  ["Honorarnoten", "1236c.svg"],
  ["Einstellungen", "f46f0.svg"],
]

function DemoOverview() {
  return (
    <>
      <div className="demo-screen-heading">
        <h3>Übersicht</h3>
        <p>Heute · Donnerstag, 7. Jänner 2027</p>
      </div>
      <div className="demo-welcome">
        <span>Praxis eingerichtet</span>
        <h4>Willkommen bei Nutriful, Maria.</h4>
        <p>
          Ihre Praxis ist bereit. Laden Sie jetzt Ihre erste Klient:in ein: Ihre
          Klient:in bekommt einen Link und füllt Datenschutz-Einverständnis und
          Anamnese vor dem Erstgespräch selbst aus.
        </p>
        <button>Erste Klient:in einladen</button>
      </div>
      <div className="demo-metrics">
        {[
          ["0", "Termine heute"],
          ["0", "Aktive Klient:innen"],
          ["0", "Offene Fragen"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
          </div>
        ))}
      </div>
      <div className="demo-section-label">
        <span>Ihre ersten Schritte</span>
        <small>2 von 4 erledigt</small>
      </div>
      <div className="demo-checklist">
        {[
          ["Praxis-Konto erstellt", "maria@praxis-muster.at", "✓"],
          [
            "Auftragsverarbeitungsvertrag akzeptiert",
            "Version 0.2 · 07.01.2027, 09:14",
            "✓",
          ],
          [
            "Erste Klient:in einladen",
            "Name und E-Mail genügen, den Rest füllt Ihre Klient:in selbst aus.",
            "Einladen",
          ],
          [
            "Logo ergänzen",
            "Optional. Erscheint auf Einladungen und Honorarnoten.",
            "Hinzufügen",
          ],
        ].map(([title, text, action]) => (
          <div className="demo-check-row" key={title}>
            <i className={action === "✓" ? "done" : ""} />
            <div>
              <strong>{title}</strong>
              <small>{text}</small>
            </div>
            <span>{action}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function DemoInvoices() {
  const rows = [
    ["Entwurf", "Lisa M.", "Zwischentermin · 30 Min.", "60,00 EUR", ""],
    ["2027-003", "Markus T.", "Folgetermin · 50 Min.", "95,00 EUR", "offen"],
    ["2027-002", "Anna K.", "Erstgespräch · 60 Min.", "120,00 EUR", "offen"],
    ["2027-001", "Lisa M.", "Erstgespräch · 60 Min.", "120,00 EUR", "bezahlt"],
  ]
  return (
    <>
      <div className="demo-screen-heading">
        <h3>Honorarnoten</h3>
        <p>
          Jänner 2027 · beim Termin-Abschluss automatisch erstellt und an die
          Klient:in gesendet
        </p>
      </div>
      <div className="demo-metrics">
        {[
          ["2", "Offen"],
          ["1", "Bezahlt"],
          ["335,00", "EUR im Jänner"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <small>{label}</small>
          </div>
        ))}
      </div>
      <div className="demo-section-label">
        <span>Alle Honorarnoten</span>
      </div>
      <div className="demo-list">
        {rows.map(([number, name, service, amount, state], index) => (
          <div
            className={`demo-invoice-row ${index === 0 ? "draft" : ""}`}
            key={number}
          >
            <span>{number}</span>
            <div>
              <strong>{name}</strong>
              <small>{service}</small>
              <small>
                Leistungsdatum {index === 0 ? "28.01.2027" : "21.01.2027"} · PDF
                per E-Mail gestellt
              </small>
            </div>
            <b>{amount}</b>
            {state && <em className={state}>{state}</em>}
            <button aria-label="PDF herunterladen">↓</button>
          </div>
        ))}
      </div>
    </>
  )
}

function DemoCalendar() {
  return (
    <>
      <div className="demo-screen-heading calendar-heading">
        <div>
          <h3>Kalender</h3>
          <p>KW 2 · 11. bis 17. Jänner 2027</p>
        </div>
        <div className="calendar-controls">
          <button>‹</button>
          <button>Heute</button>
          <button>›</button>
          <span>Woche</span>
        </div>
      </div>
      <div className="demo-calendar">
        <div className="calendar-days">
          {[
            "Mo 11.",
            "Di 12.",
            "Mi 13.",
            "Do 14.",
            "Fr 15.",
            "Sa 16.",
            "So 17.",
          ].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {[
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
          ].map((time) => (
            <span key={time}>{time}</span>
          ))}
          <div className="calendar-event event-blue">09:00 Markus T.</div>
          <div className="calendar-event event-green">
            <b>10:00–11:00</b>
            <br />
            Lisa M.<small>Erstgespräch</small>
          </div>
        </div>
      </div>
      <div className="demo-section-label">
        <span>Nächste Termine</span>
      </div>
      <div className="demo-upcoming">
        <div>
          <strong>Do 14.01. · 10:00</strong>
          <span>
            Erstgespräch · Lisa M. · Anamnese besprechen, Ziele festlegen
          </span>
          <button>Öffnen</button>
        </div>
        <div>
          <strong>Do 21.01. · 10:00</strong>
          <span>
            Zwischentermin · Markus T. · Sporternährung, Trainingsplan abstimmen
          </span>
          <button>Öffnen</button>
        </div>
      </div>
    </>
  )
}

function DemoClients() {
  const rows = [
    [
      "LM",
      "Lisa M.",
      "Ernährungsumstellung",
      "Aktiv",
      "Zwischentermin 28.01.",
      "1 neue Nachricht · Befund hochgeladen",
    ],
    [
      "MT",
      "Markus T.",
      "Sporternährung",
      "Aktiv",
      "Folgetermin 21.01.",
      "Laborbefund noch nicht hochgeladen",
    ],
    [
      "SR",
      "Sophie R.",
      "Gewichtsmanagement",
      "Anamnese abgeschlossen",
      "Erstgespräch 19.01.",
      "Anamnese ausgefüllt · 1 Dokument",
    ],
    [
      "AK",
      "Anna K.",
      "Intoleranz-Abklärung",
      "Eingeladen",
      "Erstgespräch 22.01.",
      "Einladung noch nicht angenommen",
    ],
    [
      "TB",
      "Thomas B.",
      "Ernährungsumstellung",
      "Aktiv",
      "Folgetermin 26.01.",
      "–",
    ],
    [
      "JH",
      "Julia H.",
      "Sporternährung",
      "Aktiv",
      "kein Termin geplant",
      "Letzter Termin vor 6 Wochen",
    ],
  ]
  return (
    <>
      <div className="demo-screen-heading">
        <h3>Klient:innen</h3>
        <p>12 Klient:innen · 9 aktiv, 2 mit offener Anamnese, 1 eingeladen</p>
      </div>
      <div className="client-tools">
        <span>Name oder Schwerpunkt suchen …</span>
        <div>
          <button className="active">Alle</button>
          <button>Aktiv</button>
          <button>Anamnese offen</button>
          <button>Eingeladen</button>
        </div>
      </div>
      <div className="client-columns">
        <span>Name und Schwerpunkt</span>
        <span>Status</span>
        <span>Nächster Termin</span>
        <span>Neu seit Ihrem letzten Besuch</span>
      </div>
      <div className="client-list">
        {rows.map(([initials, name, focus, status, appointment, update]) => (
          <div className="client-row" key={name}>
            <b>{initials}</b>
            <div>
              <strong>{name}</strong>
              <small>{focus}</small>
            </div>
            <em>{status}</em>
            <span>{appointment}</span>
            <span>{update}</span>
            <button>Öffnen</button>
          </div>
        ))}
      </div>
      <p className="client-more">7 von 12 · Weitere laden</p>
    </>
  )
}

function DemoMessages() {
  const threads = [
    {
      name: "Lisa M.",
      badge: "1 neu",
      time: "Heute, 09:12",
      text: "Hier der neue Befund von meiner Hausärztin – passt das so als Foto?",
      unread: true,
    },
    {
      name: "Markus T.",
      time: "Mo 18.01., 17:40",
      text: "Danke, dann bis Donnerstag! Trainingsplan bringe ich mit.",
    },
    {
      name: "Anna K.",
      time: "Fr 15.01., 12:05",
      text: "Ich habe das Konto erstellt und starte morgen mit der Anamnese.",
    },
  ]
  return (
    <>
      <div className="demo-screen-heading">
        <h3>Nachrichten</h3>
        <p>Alle Nachrichten Ihrer Klient:innen · die neuesten zuerst</p>
      </div>
      <div className="message-list">
        {threads.map((thread) => (
          <article
            className={thread.unread ? "message-card unread" : "message-card"}
            key={thread.name}
          >
            <header>
              <strong>
                {thread.name}
                {thread.badge && <em>{thread.badge}</em>}
              </strong>
              <time>{thread.time}</time>
            </header>
            <p>{thread.text}</p>
          </article>
        ))}
      </div>
      <p className="message-note">
        Ein Verlauf pro Klient:in. Neue Nachrichten stehen oben; eine Antwort
        ist nicht an eine Frist gebunden.
      </p>
    </>
  )
}

function DemoSettings() {
  const [modules, setModules] = useState({
    chat: true,
    diary: true,
    plans: false,
  })
  const [sections, setSections] = useState({
    notes: true,
    findings: true,
    agreements: true,
  })

  function flipModule(key: keyof typeof modules) {
    setModules((current) => ({ ...current, [key]: !current[key] }))
  }

  function flipSection(key: keyof typeof sections) {
    setSections((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <>
      <div className="demo-screen-heading">
        <h3>Einstellungen</h3>
        <p>
          Praxis für Diätologie Muster · alles, was Sie hier festlegen, gilt für
          Ihre ganze Praxis
        </p>
      </div>

      <section className="settings-block">
        <h4>Praxisdaten</h4>
        <div className="settings-card settings-practice">
          <span className="settings-pin" aria-hidden="true" />
          <div>
            <strong>Praxis für Diätologie Muster · Diätologin</strong>
            <p>Musterstraße 12, 1010 Wien · UID ATU12345678 · maria@praxis.at</p>
            <p>
              Logo: praxis-muster-logo.org · erscheint auf Honorarnoten,
              Berichten und Einladungen
            </p>
          </div>
          <button type="button">Bearbeiten</button>
        </div>
      </section>

      <section className="settings-block">
        <h4>Antwortzeit</h4>
        <h4>Module</h4>
        <div className="settings-card">
          <div className="settings-row">
            <div>
              <strong>Chat</strong>
              <p>Fragen zwischen den Terminen, ein Verlauf pro Klient:in</p>
            </div>
            <Toggle on={modules.chat} onClick={() => flipModule("chat")} />
          </div>
          <div className="settings-row">
            <div>
              <strong>Ernährungstagebuch</strong>
              <p>
                Mahlzeiten, Fotos und Notizen Ihrer Klient:innen · Im Pilot
                dabei, standardmäßig an
              </p>
            </div>
            <Toggle on={modules.diary} onClick={() => flipModule("diary")} />
          </div>
          <div className="settings-row">
            <div>
              <strong>Ernährungspläne</strong>
              <p>Kommt nach dem Pilot als eigenes Modul</p>
            </div>
            <Toggle on={modules.plans} onClick={() => flipModule("plans")} />
          </div>
        </div>
        <p className="settings-note">
          Ausgeschaltete Module sind für Sie und Ihre Klient:innen unsichtbar.
          Im Pilot sind Chat und Ernährungstagebuch aktiv.
        </p>
      </section>

      <section className="settings-block">
        <h4>Protokoll-Abschnitte</h4>
        <div className="settings-card">
          <div className="settings-row">
            <div>
              <strong>Anlass</strong>
              <p>Immer dabei, aus der Anamnese vorbefüllt</p>
            </div>
            <span className="settings-fixed">immer an</span>
          </div>
          <div className="settings-row">
            <div>
              <strong>Beobachtungen und Notizen</strong>
              <p>Freitext während oder nach dem Termin</p>
            </div>
            <Toggle on={sections.notes} onClick={() => flipSection("notes")} />
          </div>
          <div className="settings-row">
            <div>
              <strong>Befunde und Messwerte</strong>
              <p>Gewicht, Laborwerte, eigene Messungen</p>
            </div>
            <Toggle
              on={sections.findings}
              onClick={() => flipSection("findings")}
            />
          </div>
          <div className="settings-row">
            <div>
              <strong>Vereinbarungen</strong>
              <p>Wird wörtlich zur Zusammenfassung für Ihre Klient:in</p>
            </div>
            <Toggle
              on={sections.agreements}
              onClick={() => flipSection("agreements")}
            />
          </div>
        </div>
        <p className="settings-note">
          Feste Nutriful-Struktur für alle Praxen. Sie können Abschnitte
          ausblenden, die Sie nie brauchen, aber keine eigenen Vorlagen bauen.
        </p>
      </section>

      <section className="settings-block">
        <h4>Leistungen und Preise</h4>
        <div className="settings-card">
          {[
            ["green", "Erstgespräch", "60 Minuten", "120,00 EUR"],
            ["blue", "Folgetermin", "50 Minuten", "95,00 EUR"],
            ["orange", "Zwischentermin", "30 Minuten", "60,00 EUR"],
          ].map(([tone, name, duration, price]) => (
            <div className="settings-price" key={name}>
              <i className={tone} />
              <strong>{name}</strong>
              <span>{duration}</span>
              <b>{price}</b>
              <button type="button">Ändern</button>
            </div>
          ))}
          <button className="settings-add" type="button">
            + Leistung hinzufügen
          </button>
        </div>
        <p className="settings-note">
          Diese Leistungen schlägt Nutriful beim Termin anlegen vor und
          übernimmt sie auf die Honorarnote. Preise so, wie sie auf der
          Honorarnote stehen sollen.
        </p>
      </section>

      <section className="settings-block">
        <h4>Honorarnoten</h4>
        <div className="settings-card">
          {[
            ["Nummernkreis", "2027-001, 2027-002 … fortlaufend, beginnt jedes Jahr neu"],
            ["Bankverbindung", "AT12 3456 7890 1234 5678 · Musterbank Wien"],
            ["Zahlungsziel", "14 Tage ohne Abzug"],
            ["Schlusstext", "„Vielen Dank für Ihr Vertrauen.“"],
            ["Versand", "E-Mail mit PDF in Ihrem Namen, Kopie an Sie, Ablage in der App"],
          ].map(([label, value]) => (
            <div className="settings-price" key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
              <button type="button">Ändern</button>
            </div>
          ))}
          <div className="settings-price">
            <strong>Vor dem Senden prüfen</strong>
            <span>Jede Honorarnote öffnet sich zuerst als Entwurf mit Vorschau</span>
            <em className="settings-fixed">immer an</em>
          </div>
          <button className="settings-preview" type="button">
            Vorschau einer Honorarnote ansehen
          </button>
        </div>
        <p className="settings-note">
          Kopf, Logo und UID kommen aus den Praxisdaten, die Preise aus
          „Leistungen und Preise“. Gesendet wird erst, wenn Sie in der Vorschau
          auf „Honorarnote stellen“ tippen.
        </p>
      </section>

      <section className="settings-block">
        <h4>Vertrag und Daten</h4>
        <div className="settings-card">
          {[
            ["Auftragsverarbeitungsvertrag", "Version 0.2 · akzeptiert am 07.01.2027, 09:14", "Ansehen"],
            ["Datenexport", "Alle Daten Ihrer Praxis als Datei, zum Beispiel wenn eine Klient:in eine Kopie verlangt", "Anfragen"],
            ["Zugriffsprotokoll", "Wer wann welche Klient:innen-Daten geöffnet hat · Pflicht bei Gesundheitsdaten", "Ansehen"],
          ].map(([label, value, action]) => (
            <div className="settings-price" key={label}>
              <strong>{label}</strong>
              <span>{value}</span>
              <button type="button">{action}</button>
            </div>
          ))}
        </div>
        <p className="settings-note">
          Ihre Daten liegen in der EU (Irland). Nutriful hat sinnvolle
          Standardwerte – Sie müssen hier nichts ändern, um zu starten.
        </p>
      </section>
    </>
  )
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={on ? "settings-toggle on" : "settings-toggle"}
      aria-pressed={on}
      onClick={onClick}
    />
  )
}

function DemoApplication({
  tab,
  onChange,
}: {
  tab: number
  onChange: (tab: number) => void
}) {
  const selectedNav = [0, 4, 1, 2, 3, 5][tab]
  const navTabs = [0, 2, 3, 4, 1, 5]
  return (
    <div className="app-window">
      <div className="app-top">
        <span />
        <span />
        <span />
        <b>nutriful für Praxen · Praxis für Diätologie Muster</b>
        <small>Maria Muster&nbsp;&nbsp; MM</small>
      </div>
      <div className="app-body">
        <aside>
          {demoNavigation.map(([item, icon], index) => {
            const targetTab = navTabs[index]
            return (
              <button
                className={selectedNav === index ? "selected" : ""}
                onClick={() => onChange(targetTab)}
                key={item}
              >
                <img src={icons[icon]} alt="" />
                {item}
                {item === "Nachrichten" && <small>1 neu</small>}
              </button>
            )
          })}
          <button className="invite">＋ Klient:in einladen</button>
        </aside>
        <div className="app-content">
          {tab === 0 && <DemoOverview />}
          {tab === 1 && <DemoInvoices />}
          {tab === 2 && <DemoCalendar />}
          {tab === 3 && <DemoClients />}
          {tab === 4 && <DemoMessages />}
          {tab === 5 && <DemoSettings />}
        </div>
      </div>
    </div>
  )
}

export function SiteHeader({
  lang,
  page = "home",
  path,
}: {
  lang: ReturnType<typeof useLang>
  page?: "home" | "demo" | "legal"
  path?: string
}) {
  const t = newDesignCopy(lang)
  const home = localePath("/design", lang)
  const here = path ?? (page === "demo" ? "/design/demo" : "/design")
  const onHome = page === "home"
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const howHref = onHome ? "#how" : `${home}#how`
  const whyHref = onHome ? "#why" : `${home}#why`
  const faqHref = onHome ? "#faq" : `${home}#faq`
  const signupHref = onHome ? "#pilot" : `${home}#pilot`

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  const close = () => setOpen(false)

  const pageLinks = (inPanel: boolean) => (
    <nav aria-label={t.navLabel}>
      <a href={whyHref} onClick={inPanel ? close : undefined}>
        {t.navWhy}
      </a>
      <a href={howHref} onClick={inPanel ? close : undefined}>
        {t.navHow}
      </a>
      <a href={faqHref} onClick={inPanel ? close : undefined}>
        {t.navFaq}
      </a>
    </nav>
  )

  const languages = (inPanel: boolean) => (
    <div className="lang-picker" role="group" aria-label={t.langLabel}>
      <Link
        to={localePath(here, "de")}
        hrefLang="de"
        lang="de"
        aria-current={lang === "de" ? "page" : undefined}
        onClick={inPanel ? close : undefined}
      >
        DE
      </Link>
      <Link
        to={localePath(here, "en")}
        hrefLang="en"
        lang="en"
        aria-current={lang === "en" ? "page" : undefined}
        onClick={inPanel ? close : undefined}
      >
        EN
      </Link>
    </div>
  )

  return (
    <header
      className={open ? "site-header menu-open" : "site-header"}
      ref={headerRef}
    >
      <Logo href={onHome ? "#top" : home} />
      {pageLinks(false)}
      <div className="header-actions">
        {languages(false)}
        <a className="header-login" href={signupHref}>
          {t.navSignup}
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="design-menu"
          aria-label={t.menu}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
      </div>
      <div className="nav-panel" id="design-menu">
        {pageLinks(true)}
        {languages(true)}
      </div>
    </header>
  )
}

export function DesignFooter() {
  const lang = useLang()
  const t = newDesignCopy(lang)
  const { pathname } = useLocation()
  const other = lang === "de" ? "en" : "de"

  return (
    <footer>
      <div>
        <Logo light />
        <p>{t.footerNote}</p>
      </div>
      <nav>
        <Link to={localePath("/design/impressum", lang)}>{t.imprint}</Link>
        <Link to={localePath("/design/datenschutz", lang)}>{t.privacy}</Link>
        <ConsentSettingsLink className="footer-cookies" />
        <Link to={localePath(stripLocale(pathname), other)}>
          {lang === "de" ? "English" : "Deutsch"}
        </Link>
      </nav>
      <Mascot index={3} sticker />
    </footer>
  )
}

export default function NewDesign() {
  const lang = useLang()
  const t = newDesignCopy(lang)
  const [submitted, setSubmitted] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const journeyMessyRef = useRef<HTMLDivElement>(null)
  const journeyStraightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const clamp = (value: number) => Math.min(1, Math.max(0, value))
    const ease = (value: number) => value * value * (3 - 2 * value)
    const easeOutBack = (value: number) => {
      const c1 = 1.35
      const c3 = c1 + 1
      return 1 + c3 * (value - 1) ** 3 + c1 * (value - 1) ** 2
    }

    const updateHero = (progress: number) => {
      const travel = easeOutBack(clamp(progress / 0.52))
      const faceSwap = ease(clamp((progress - 0.56) / 0.12))
      const bowl = easeOutBack(clamp((progress - 0.22) / 0.36))
      const reveal = ease(clamp((progress - 0.64) / 0.16))
      const reward = easeOutBack(clamp((progress - 0.58) / 0.18))
      const settled = ease(clamp((progress - 0.7) / 0.18))
      const rewardBob = Math.sin(clamp((progress - 0.4) / 0.4) * Math.PI * 2) * (1 - settled) * -16
      const compact = window.innerWidth <= 760
      const sticky = hero.querySelector<HTMLElement>(".hero-sticky")
      const slot = hero.querySelector<HTMLElement>(".apple-slot")
      let giantX = 0
      let giantY = 0
      let giantScale = 1
      if (sticky && slot && slot.offsetWidth > 0) {
        const slotBox = slot.getBoundingClientRect()
        const stage = sticky.getBoundingClientRect()
        const aspect = 2176 / 2102
        const giantWidth = compact
          ? Math.min(stage.width * 0.58, 260)
          : Math.min(stage.width * 0.32, 420)
        const giantHeight = giantWidth * aspect
        const endX = slotBox.left + slotBox.width / 2
        const endY = slotBox.top + slotBox.height / 2
        const startX = stage.left + stage.width / 2
        const startY = stage.bottom - giantHeight * 0.58
        giantScale = giantWidth / slotBox.width + (1 - giantWidth / slotBox.width) * travel
        giantX = (startX - endX) * (1 - travel)
        giantY = (startY - endY) * (1 - travel)
      }

      hero.style.setProperty("--giant-opacity", `${1 - faceSwap}`)
      hero.style.setProperty("--giant-scale", giantScale.toFixed(4))
      hero.style.setProperty("--giant-x", `${giantX.toFixed(2)}px`)
      hero.style.setProperty("--giant-y", `${giantY.toFixed(2)}px`)
      hero.style.setProperty("--giant-rotate", `${((1 - travel) * -10).toFixed(2)}deg`)
      hero.style.setProperty("--smile-opacity", faceSwap.toString())
      hero.style.setProperty("--bowl-opacity", bowl.toString())
      hero.style.setProperty(
        "--story-bowl-y",
        `${(1 - bowl) * (compact ? 36 : 42)}vh`,
      )
      hero.style.setProperty("--cta-opacity", reveal.toString())
      hero.style.setProperty("--cta-y", `${(1 - reveal) * 16}px`)
      hero.style.setProperty("--reward-opacity", reward.toString())
      hero.style.setProperty("--reward-scale", `${0.35 + reward * 0.65}`)
      hero.style.setProperty("--reward-bob", `${rewardBob.toFixed(2)}px`)
      const starScale = compact ? 0.42 : 1
      ;[
        [-210, -105],
        [-150, -175],
        [-82, -235],
        [-245, -225],
        [210, -105],
        [150, -175],
        [82, -235],
        [245, -225],
      ].forEach(([x, y], index) => {
        hero.style.setProperty(`--star-x-${index + 1}`, `${x * reward * starScale}px`)
        hero.style.setProperty(
          `--star-y-${index + 1}`,
          `${y * reward * starScale + (compact ? 70 : 0)}px`,
        )
      })
      hero.style.setProperty("--scroll-opacity", "1")
    }

    const duration = 5200
    let startedAt = 0
    const tick = (now: number) => {
      if (!startedAt) startedAt = now
      const progress = reduceMotion.matches
        ? 1
        : Math.min(1, (now - startedAt) / duration)
      updateHero(progress)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    const onResize = () => {
      const progress = reduceMotion.matches
        ? 1
        : startedAt
          ? Math.min(1, (performance.now() - startedAt) / duration)
          : 0
      updateHero(progress)
    }
    const onMotion = () => {
      if (reduceMotion.matches) updateHero(1)
    }

    updateHero(reduceMotion.matches ? 1 : 0)
    if (!reduceMotion.matches) frame = requestAnimationFrame(tick)
    window.addEventListener("resize", onResize)
    reduceMotion.addEventListener("change", onMotion)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
      reduceMotion.removeEventListener("change", onMotion)
    }
  }, [])

  useEffect(() => {
    const scrollers = Array.from(
      document.querySelectorAll<HTMLElement>(".mobile-card-scroller"),
    )

    const cleanups = scrollers.map((scroller) => {
      let dragging = false
      let startX = 0
      let startScroll = 0

      const pointerDown = (event: PointerEvent) => {
        if (scroller.scrollWidth <= scroller.clientWidth) return
        if (event.pointerType === "mouse" && event.button !== 0) return
        dragging = true
        startX = event.clientX
        startScroll = scroller.scrollLeft
        scroller.setPointerCapture(event.pointerId)
        scroller.classList.add("is-dragging")
      }

      const pointerMove = (event: PointerEvent) => {
        if (!dragging) return
        scroller.scrollLeft = startScroll - (event.clientX - startX)
        event.preventDefault()
      }

      const pointerEnd = (event: PointerEvent) => {
        if (!dragging) return
        dragging = false
        if (scroller.hasPointerCapture(event.pointerId)) {
          scroller.releasePointerCapture(event.pointerId)
        }
        scroller.classList.remove("is-dragging")
      }

      scroller.addEventListener("pointerdown", pointerDown)
      scroller.addEventListener("pointermove", pointerMove)
      scroller.addEventListener("pointerup", pointerEnd)
      scroller.addEventListener("pointercancel", pointerEnd)

      return () => {
        scroller.removeEventListener("pointerdown", pointerDown)
        scroller.removeEventListener("pointermove", pointerMove)
        scroller.removeEventListener("pointerup", pointerEnd)
        scroller.removeEventListener("pointercancel", pointerEnd)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  useEffect(() => {
    const messy = journeyMessyRef.current
    const straight = journeyStraightRef.current
    if (!messy || !straight) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const narrow = window.matchMedia("(max-width: 760px)")
    const marks: Record<string, number> = {
      "step-start": 0,
      "pill-whatsapp": 0.78 / 2.8,
      "pill-photo": 1.46 / 2.8,
      "pill-paper": 1.96 / 2.8,
      "pill-silence": 2.38 / 2.8,
      "step-finish": 2.68 / 2.8,
      "step-bar-start": 0,
      "pill-together": 0.86 / 1.8,
      "step-bar-finish": 1.69 / 1.8,
    }

    const clearScrub = (node: HTMLElement) => {
      node.style.removeProperty("--draw")
      node.querySelectorAll<HTMLElement>(".journey-step").forEach((step) => {
        step.classList.remove("is-lit")
        step.style.removeProperty("opacity")
      })
    }

    const scrub = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect()
      const travel = Math.max(node.offsetHeight * 0.72, window.innerHeight * 0.45)
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.82 - rect.top) / travel))
      node.style.setProperty("--draw", String((1 - progress) * 100))
      node.querySelectorAll<HTMLElement>(".journey-step").forEach((step) => {
        const mark = Object.entries(marks).find(([name]) => step.classList.contains(name))
        step.classList.toggle("is-lit", progress + 0.02 >= (mark?.[1] ?? 1))
      })
    }

    let observer: IntersectionObserver | null = null

    const playOnView = () => {
      clearScrub(messy)
      clearScrub(straight)
      if (reduceMotion.matches) {
        messy.classList.add("is-on")
        straight.classList.add("is-on")
        return
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("is-on")
            observer?.unobserve(entry.target)
          })
        },
        { threshold: 0.35 },
      )
      observer.observe(messy)
      observer.observe(straight)
    }

    const onScroll = () => {
      scrub(messy)
      scrub(straight)
    }

    const enable = () => {
      observer?.disconnect()
      observer = null
      if (narrow.matches && !reduceMotion.matches) {
        messy.classList.remove("is-on")
        straight.classList.remove("is-on")
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return
      }
      window.removeEventListener("scroll", onScroll)
      playOnView()
    }

    enable()
    narrow.addEventListener("change", enable)
    reduceMotion.addEventListener("change", enable)
    return () => {
      observer?.disconnect()
      window.removeEventListener("scroll", onScroll)
      narrow.removeEventListener("change", enable)
      reduceMotion.removeEventListener("change", enable)
    }
  }, [])

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="new-design">
    <main id="top">
      <SiteHeader lang={lang} />

      <section className="hero-story" ref={heroRef}>
        <div className="hero-sticky">
          <div className="hero-story-title">
            <h1>
              {t.heroLine1}
              <br />
              {t.heroLine2} <span>{t.heroAccent}</span>
            </h1>
            <p className="hero-story-subtitle">{t.heroText}</p>
            <a className="button button-dark hero-story-cta" href="#pilot">
              {t.heroCta}
            </a>
          </div>

          <div className="fruit-stage" aria-hidden="true">
            <div className="story-bowl-scene">
              <img className="story-bowl" src={bowl} alt="" />
              <div className="apple-slot">
                <img className="story-giant-fruit" src={giantFruit} alt="" />
                <img className="story-smiling-fruit" src={smilingFruit} alt="" />
              </div>
              <div className="reward-stars">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span>{t.scroll}</span>
            <i />
          </div>
        </div>
      </section>

      <aside className="pilot-strip">
        <span className="new-pill">{t.stripBadge}</span>
        <p>{t.stripText}</p>
        <a href="#pilot">
          {t.stripCta} <span>→</span>
        </a>
      </aside>

      <section className="section features" id="why">
        <div className="section-heading">
          <p className="eyebrow">{t.featuresEyebrow}</p>
          <h2>
            {t.featuresTitle1}
            <br />
            {t.featuresTitle2}
          </h2>
          <Mascot index={3} className="heading-mascot" sticker />
        </div>
        <div className="feature-grid mobile-card-scroller">
          {featureCards.map((feature, index) => (
            <article
              className={`feature-card ${feature.color}`}
              key={feature.icon}
            >
              <span className="card-number">0{index + 1}</span>
              <img src={icons[feature.icon]} alt="" />
              <h3>{t.features[index].title}</h3>
              <p>{t.features[index].text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="problem">
        <div className="problem-photo">
          <img
            src={problemPhoto}
            alt={t.photoAlt}
          />
          <p>{t.photoCaption}</p>
        </div>
        <div className="problem-copy">
          <p className="eyebrow">{t.problemEyebrow}</p>
          <h2>{t.problemTitle}</h2>
          <p>{t.problemText}</p>
          <div className="problem-points">
            {t.problemPoints.map((point, index) => (
              <article key={point.title}>
                <span>0{index + 1}</span>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey" aria-labelledby="journey-title">
        <div className="journey-intro">
          <h2 id="journey-title">{t.journeyTitle}</h2>
          <p>{t.journeyText}</p>
        </div>

        <div className="journey-messy" ref={journeyMessyRef}>
          <span className="journey-end journey-step step-start">{t.session} 1</span>
          <div className="journey-wave">
            <svg
              className="journey-squiggle"
              viewBox="-40 -28 1088 372"
              aria-hidden="true"
            >
              <path pathLength={100} d={JOURNEY_WAVE} />
            </svg>
            <span className="journey-pill journey-step pill-whatsapp">
              {t.journeyPills[0]}
            </span>
            <span className="journey-pill journey-step pill-photo">
              {t.journeyPills[1]}
            </span>
            <span className="journey-pill journey-step pill-paper">
              {t.journeyPills[2]}
            </span>
            <span className="journey-pill journey-step pill-silence">
              {t.journeyPills[3]}
            </span>
          </div>
          <span className="journey-end journey-step step-finish">{t.session} 2</span>
        </div>

        <div className="journey-optimal">
          <h2>{t.withNutriful}</h2>
          <div className="journey-straight" ref={journeyStraightRef}>
            <span className="journey-pill journey-step pill-together">
              {t.journeyPillTogether}
            </span>
            <div className="journey-bar">
              <span className="journey-end journey-step step-bar-start">
                {t.session} 1
              </span>
              <svg
                className="journey-line"
                viewBox="0 0 1024 40"
                aria-hidden="true"
              >
                <path pathLength={100} d="M20 20 H1004" />
              </svg>
              <span className="journey-end journey-step journey-end-last step-bar-finish">
                {t.session} 2
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section how" id="how">
        <div className="section-heading centered">
          <p className="eyebrow">{t.howEyebrow}</p>
          <h2>
            {t.howTitle1}
            <br />
            {t.howTitle2}
          </h2>
        </div>
        <div className="steps mobile-card-scroller">
          {t.steps.map((step, index) => (
            <article key={step.title}>
              <Mascot index={[2, 5, 0][index]} />
              <h3>
                <span className="step-number">{index + 1}</span>
                {step.title}
              </h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section benefits">
        <div className="section-heading">
          <p className="eyebrow">{t.benefitsEyebrow}</p>
          <h2>
            {t.benefitsTitle1}
            <br />
            {t.benefitsTitle2}
          </h2>
          <Mascot index={5} className="heading-mascot" sticker />
        </div>
        <div className="benefit-bento">
          <article className="bento-card bento-peach">
            <img className="bento-icon" src={icons["3536c.svg"]} alt="" />
            <h3>{t.benefits[0].title}</h3>
            <p>{t.benefits[0].text}</p>
          </article>
          <article className="bento-card bento-mint bento-mint-top">
            <img className="bento-icon" src={icons["1b988.svg"]} alt="" />
            <h3>{t.benefits[1].title}</h3>
            <p>{t.benefits[1].text}</p>
          </article>
          <article className="bento-card bento-mint bento-mint-lower">
            <img className="bento-icon" src={icons["2b855.svg"]} alt="" />
            <h3>{t.benefits[2].title}</h3>
            <p>{t.benefits[2].text}</p>
          </article>
          <figure className="bento-photo bento-photo-orange">
            <img src={photoOranges} alt={t.benefitPhotoOrange} />
          </figure>
          <figure className="bento-photo bento-photo-raspberry">
            <img src={photoRaspberries} alt={t.benefitPhotoRaspberry} />
          </figure>
          <article className="bento-card bento-sand">
            <img className="bento-icon" src={icons["626b0.svg"]} alt="" />
            <h3>{t.benefits[3].title}</h3>
            <p>{t.benefits[3].text}</p>
          </article>
        </div>
      </section>

      <section className="pilot" id="pilot">
        <Mascot index={2} className="pilot-mascot-left" sticker />
        <Mascot index={4} className="pilot-mascot-right" sticker />
        <div className="pilot-content">
          <h2>{t.pilotTitle}</h2>
          <p>{t.pilotText}</p>
          {submitted ? (
            <div className="success-message">{t.thanks}</div>
          ) : (
            <form className="pilot-signup-form" onSubmit={submitForm}>
              <label className="pilot-field">
                <span>{t.nameLabel}</span>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                />
              </label>
              <label className="pilot-field">
                <span>{t.emailLabel}</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={t.emailPlaceholder}
                  autoComplete="email"
                />
              </label>
              <button className="button button-dark pilot-submit" type="submit">
                {t.submit} <span>→</span>
              </button>
            </form>
          )}
          <a
            className="button pilot-book"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.book}
          </a>
          <small>{t.consent}</small>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-title">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
          <Mascot index={1} sticker />
        </div>
        <div className="faq-list">
          {t.faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>
                <span>0{index + 1}</span>
                {question}
                <i>+</i>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <DesignFooter />
    </main>
    </div>
  )
}

export function DesignDemo() {
  const lang = useLang()
  const [tab, setTab] = useState(0)

  return (
    <div className="new-design demo-screen">
      <SiteHeader lang={lang} page="demo" />
      <DemoApplication tab={tab} onChange={setTab} />
    </div>
  )
}
