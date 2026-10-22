/* ============================================================
   CONFIGURACIÓN EDITABLE
   Todo lo que está entre [corchetes] es un marcador de posición:
   reemplázalo con tu información real. Una URL vacía ("") se
   muestra como "enlace pendiente" hasta que la completes.
   ============================================================ */
const SITE = {
  name: "[Alexand3r M.]",
  monogram: "TN",
  role: "[Ing. de Software]",
  location: "[Lima, Perú]",
  headline: "Ingeniero de Software proximamente Diseñador Grafico.",
  intro: "[Hay pasión, falta talento.]",
  photo: "",                     // URL o data URI de tu fotografía (proporción 4:5)
  photoAlt: "[Me]",
  availability: { open: true, label: "Disponible para nuevos proyectos", since: "[08 06]" },
  email: "crismcoficial@gmail.com",
  socials: [
    { label: "LinkedIn", url: "" },
    { label: "GitHub", url: "https://github.com/Crsth18" },
    { label: "Tiktok", url: "@alxzn.fr" },
    { label: "Instagram", url: "https://www.instagram.com/alxzn.fr?srtk=MmFtcm9neWMybzVl" }
  ],
  about: {
    lead: "[Soy un desarrollador frontend apasionado por el diseño gráfico, impulsado por el reto de crear productos digitales atractivos y de alto impacto que aporten un gran valor al mercado y me permitan crecer profesionalmente a gran escala.]",
    story: [
      "[Ver el mundo web como una posibilidad de transmitir ideas y conceptos de diseño.]",
      "[Hoy en día me apasiona el movimiento y el diseño simple, sin tanto resalte.]"
    ],
    interests: ["[Ing. de Software ]", "[Diseño Grafico Digital]", "[Docente de Natación]", "[Deportista Voleyball]"],
    goals: ["[Tener un trabajo de Front-end y estudiarlo más]", "[Llegar a trabajar indenpendiente]"],
    philosophy: [   // Ejemplo: sustituye por tus propios principios
      { title: "Claridad antes que ornamento", text: "Cada elemento de la interfaz debe tener una razón para estar ahí." },
      { title: "Rendimiento como diseño", text: "Una página rápida es parte de la experiencia, no un detalle técnico." },
      { title: "Accesible desde el boceto", text: "Contraste, foco y teclado se resuelven al empezar, no al final." }
    ]
  },
  experience: [
    { period: "[2026 — Actualidad]", role: "[Ing de Software]", org: "[Senati]", description: "[Responsabilidades y logros principales, en una o dos frases.]" },
    { period: "[2024 Abril — 2024 Julio]", role: "[Mesero]", org: "[Polleria León]", description: "[Responsabilidades y logros principales, en una o dos frases.]" },
    { period: "[2025 — 2025]", role: "[Docente de Natación]", org: "[Serpar]", description: "[Responsabilidades y logros principales, en una o dos frases.]" }
  ],
  education: [
    { period: "[Año — Año]", title: "[Titulación o programa]", org: "[Institución]" },
    { period: "[Año]", title: "[Curso o certificación]", org: "[Institución o plataforma]" }
  ],
  skills: [       // Ejemplo: sustituye por tus herramientas reales
    { group: "Diseño", items: ["Figma", "Prototipado", "Sistemas de diseño", "Tipografía"] },
    { group: "Desarrollo", items: ["React", "TypeScript", "Tailwind CSS", "Node.js"] },
    { group: "Flujo de trabajo", items: ["Git", "Pruebas de usabilidad", "Documentación"] }
  ],
  competencies: ["Pensamiento sistémico", "Comunicación clara", "Atención al detalle", "Trabajo en equipo"],
  projects: [
    { title: "[Nombre del proyecto A]", category: "Diseño de producto", year: "[Año]", role: "[Tu rol en el proyecto]",
      description: "[Describe el problema, tu enfoque y el resultado en dos o tres frases.]",
      tags: ["[Herramienta]", "[Herramienta]"], art: "a",
      links: [{ label: "Ver caso de estudio", url: "" }, { label: "Prototipo", url: "" }] },
    { title: "[Nombre del proyecto B]", category: "Desarrollo web", year: "[Año]", role: "[Tu rol en el proyecto]",
      description: "[Describe qué construiste, con qué tecnologías y qué impacto tuvo.]",
      tags: ["[Tecnología]", "[Tecnología]"], art: "b",
      links: [{ label: "Sitio en vivo", url: "" }, { label: "Código", url: "" }] },
    { title: "[Nombre del proyecto C]", category: "Identidad visual", year: "[Año]", role: "[Tu rol en el proyecto]",
      description: "[Describe el cliente o la idea, el concepto visual y los entregables.]",
      tags: ["[Herramienta]", "[Herramienta]"], art: "c",
      links: [{ label: "Ver caso de estudio", url: "" }] }
  ]
};

/* ============================================================
   APLICACIÓN
   ============================================================ */
const { useState, useEffect, useRef } = React;
const html = htm.bind(React.createElement);
document.documentElement.lang = "es";

try { const t = localStorage.getItem("theme"); if (t === "dark" || t === "light") document.documentElement.dataset.theme = t; } catch (e) {}

// Resalta los marcadores [entre corchetes] para que sean fáciles de localizar
const ph = (s) => String(s).split(/(\[[^\]]+\])/).map((p, i) => /^\[.*\]$/.test(p) ? html`<span className="ph" key=${i}>${p}</span>` : p);

const NAV = [
  { label: "Inicio", id: "inicio", ids: ["inicio"] },
  { label: "Sobre mí", id: "sobre-mi", ids: ["sobre-mi", "experiencia"] },
  { label: "Proyectos", id: "proyectos", ids: ["proyectos"] },
  { label: "Contacto", id: "contacto", ids: ["contacto"] }
];

function Arrow({ down }) {
  return html`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    ${down ? html`<path d="M9 2v14M3 10l6 6 6-6"/>` : html`<path d="M2 9h14M10 3l6 6-6 6"/>`}</svg>`;
}

function ExtLink({ link }) {
  if (link.url) return html`<a className="ulink" href=${link.url} target="_blank" rel="noopener noreferrer">${link.label} ↗</a>`;
  return html`<span className="pending" title="Añade la URL en la configuración SITE">${link.label} <span className="mono" style=${{ fontSize: ".7rem" }}>(enlace pendiente)</span></span>`;
}

function useActiveSection() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("main section[id]"));
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function ThemeToggle() {
  const eff = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [dark, setDark] = useState(eff);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => setDark(eff());
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    setDark(!dark);
  };
  return html`<button type="button" className="icon-btn" onClick=${toggle} aria-label=${dark ? "Activar tema claro" : "Activar tema oscuro"}>
    ${dark
      ? html`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="9" cy="9" r="3.5"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4"/></svg>`
      : html`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M15.5 10.6A6.5 6.5 0 0 1 7.4 2.5a6.5 6.5 0 1 0 8.1 8.1z"/></svg>`}
  </button>`;
}

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const btn = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); btn.current && btn.current.focus(); } };
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, []);
  const isActive = (n) => n.ids.includes(active);
  return html`<header className="site-header">
    <div className="wrap flex h-16 items-center justify-between gap-4">
      <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio">
        <span className="mono flex h-9 w-9 items-center justify-center border border-fg text-[.75rem] font-medium tracking-wider">${SITE.monogram}</span>
        <span className="hidden text-[.95rem] font-medium sm:block">${ph(SITE.name)}</span>
      </a>
      <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
        ${NAV.map((n) => html`<a key=${n.id} href=${"#" + n.id} className="ulink text-[.92rem]" aria-current=${isActive(n) ? "true" : undefined}>${n.label}</a>`)}
      </nav>
      <div className="flex items-center gap-2">
        <${ThemeToggle} />
        <button ref=${btn} type="button" className="icon-btn md:hidden" aria-expanded=${open} aria-controls="menu-movil" aria-label=${open ? "Cerrar menú" : "Abrir menú"} onClick=${() => setOpen(!open)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            ${open ? html`<path d="M3 3l12 12M15 3L3 15"/>` : html`<path d="M2 5h14M2 13h14"/>`}
          </svg>
        </button>
      </div>
    </div>
    <div id="menu-movil" className="border-t border-line md:hidden" hidden=${!open}>
      <nav aria-label="Menú móvil" className="wrap pb-6 pt-2" style=${{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}>
        ${NAV.map((n) => html`<a key=${n.id} href=${"#" + n.id} className="menu-link" onClick=${() => setOpen(false)} aria-current=${isActive(n) ? "true" : undefined}>${n.label}</a>`)}
      </nav>
    </div>
  </header>`;
}

function Hero() {
  const a = SITE.availability;
  return html`<section id="inicio" aria-labelledby="titulo-inicio">
    <div className="wrap pb-20 pt-8 md:pb-28 md:pt-12">
      <div className="label rise flex flex-wrap items-center justify-between gap-x-6 gap-y-2" style=${{ "--d": 0 }}>
        <span>Portafolio ${new Date().getFullYear()}</span>
        <span>${ph(SITE.location)}</span>
      </div>
      <h1 id="titulo-inicio" className="hero-name rise mt-10 md:mt-14" style=${{ "--d": 1 }}>${ph(SITE.name)}</h1>
      <div className="mt-10 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="label rise" style=${{ "--d": 2 }}>${ph(SITE.role)}</p>
          <p className="headline rise mt-5" style=${{ "--d": 3 }}>${SITE.headline}</p>
          <p className="rise mt-6 max-w-[52ch] text-[1.05rem] text-muted" style=${{ "--d": 4 }}>${ph(SITE.intro)}</p>
          ${a.open && html`<p className="pill rise mt-8" style=${{ "--d": 5 }}><span className="dot" aria-hidden="true"></span><span>${a.label} · ${ph(a.since)}</span></p>`}
          <div className="rise mt-8 flex flex-wrap gap-3" style=${{ "--d": 6 }}>
            <a href="#proyectos" className="btn btn-solid">Ver proyectos <${Arrow} /></a>
            <a href="#contacto" className="btn btn-line">Contactar <${Arrow} /></a>
          </div>
        </div>
        <figure className="rise lg:col-span-5" style=${{ "--d": 4 }}>
          <div className=${"photo mx-auto w-full max-w-md lg:max-w-none " + (SITE.photo ? "" : "photo-empty")}>
            ${SITE.photo
              ? html`<img src=${SITE.photo} alt=${SITE.photoAlt} width="800" height="1000" decoding="async" style=${{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />`
              : html`<span className="label" role="img" aria-label="Espacio reservado para tu fotografía">[Tu fotografía]<br />4 : 5</span>`}
          </div>
        </figure>
      </div>
    </div>
  </section>`;
}

function Section({ id, label, children }) {
  return html`<section id=${id} className="row" aria-labelledby=${id + "-t"}>
    <div className="wrap py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <h2 id=${id + "-t"} className="label md:col-span-3">${label}</h2>
        <div className="min-w-0 md:col-span-9">${children}</div>
      </div>
    </div>
  </section>`;
}

function About() {
  const A = SITE.about;
  return html`<${Section} id="sobre-mi" label="Sobre mí">
    <p className="lead">${ph(A.lead)}</p>
    <div className="mt-12 grid gap-6 text-muted md:grid-cols-2 md:gap-10">
      ${A.story.map((p, i) => html`<p key=${i} className="max-w-[60ch]">${ph(p)}</p>`)}
    </div>
    <div className="mt-16 grid gap-12 md:grid-cols-2">
      <div>
        <h3 className="label">Intereses</h3>
        <ul className="mt-4">${A.interests.map((t, i) => html`<li key=${i} className="row py-3">${ph(t)}</li>`)}</ul>
      </div>
      <div>
        <h3 className="label">Objetivos profesionales</h3>
        <ul className="mt-4">${A.goals.map((t, i) => html`<li key=${i} className="row py-3">${ph(t)}</li>`)}</ul>
      </div>
    </div>
    <div className="mt-16">
      <h3 className="label">Filosofía de trabajo</h3>
      <div className="mt-4 grid gap-x-10 md:grid-cols-3">
        ${A.philosophy.map((p, i) => html`<div key=${i} className="row py-6">
          <p className="display text-[1.35rem] font-normal leading-tight">${p.title}</p>
          <p className="mt-3 text-[.95rem] text-muted">${p.text}</p>
        </div>`)}
      </div>
    </div>
  </${Section}>`;
}

function Experience() {
  return html`<${Section} id="experiencia" label="Experiencia y habilidades">
    <h3 className="label">Trayectoria</h3>
    <ul className="mt-4">
      ${SITE.experience.map((e, i) => html`<li key=${i} className="row grid gap-2 py-7 md:grid-cols-[11rem_1fr] md:gap-8">
        <p className="mono text-[.8rem] text-muted">${ph(e.period)}</p>
        <div>
          <p className="display text-[1.5rem] leading-tight">${ph(e.role)}</p>
          <p className="mt-1 text-[.95rem]">${ph(e.org)}</p>
          <p className="mt-3 max-w-[58ch] text-muted">${ph(e.description)}</p>
        </div>
      </li>`)}
    </ul>

    <h3 className="label mt-16">Formación</h3>
    <ul className="mt-4">
      ${SITE.education.map((e, i) => html`<li key=${i} className="row grid gap-2 py-6 md:grid-cols-[11rem_1fr] md:gap-8">
        <p className="mono text-[.8rem] text-muted">${ph(e.period)}</p>
        <p><span className="display text-[1.25rem]">${ph(e.title)}</span><span className="text-muted"> — ${ph(e.org)}</span></p>
      </li>`)}
    </ul>

    <h3 className="label mt-16">Herramientas</h3>
    <div className="mt-4 grid gap-x-10 md:grid-cols-3">
      ${SITE.skills.map((g, i) => html`<div key=${i} className="row py-6">
        <p className="display text-[1.25rem]">${g.group}</p>
        <ul className="mt-3 space-y-1 text-[.95rem] text-muted">${g.items.map((t, j) => html`<li key=${j}>${t}</li>`)}</ul>
      </div>`)}
    </div>

    <h3 className="label mt-16">Competencias</h3>
    <ul className="row mt-4 flex flex-wrap gap-x-8 gap-y-2 pt-6">
      ${SITE.competencies.map((c, i) => html`<li key=${i} className="display text-[1.4rem]">${c}</li>`)}
    </ul>
  </${Section}>`;
}

function ProjectArt({ kind }) {
  const grid = [];
  if (kind === "a") {
    for (let i = 1; i < 8; i++) grid.push(html`<line key=${"v" + i} x1=${i * 100} y1="0" x2=${i * 100} y2="600" className="s-line" />`);
    for (let i = 1; i < 6; i++) grid.push(html`<line key=${"h" + i} x1="0" y1=${i * 100} x2="800" y2=${i * 100} className="s-line" />`);
    return html`<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Composición geométrica de ejemplo">
      <rect width="800" height="600" className="f-surface" />${grid}
      <rect x="100" y="100" width="200" height="200" className="f-fg" />
      <circle cx="520" cy="300" r="190" className="s-fg" strokeWidth="1.5" />
      <circle cx="520" cy="300" r="115" className="f-accent" />
      <line x1="100" y1="500" x2="300" y2="500" className="s-fg" strokeWidth="1.5" />
      <text x="24" y="580" className="svg-label">IMAGEN DE EJEMPLO</text></svg>`;
  }
  if (kind === "b") {
    return html`<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Maqueta de interfaz de ejemplo">
      <rect width="800" height="600" className="f-surface" />
      <rect x="90" y="80" width="620" height="440" className="f-bg s-line" strokeWidth="1.5" />
      <line x1="90" y1="130" x2="710" y2="130" className="s-line" strokeWidth="1.5" />
      <circle cx="116" cy="105" r="6" className="f-fg" /><circle cx="140" cy="105" r="6" className="s-line" /><circle cx="164" cy="105" r="6" className="s-line" />
      <line x1="230" y1="130" x2="230" y2="520" className="s-line" strokeWidth="1.5" />
      <rect x="116" y="160" width="86" height="10" className="f-fg" /><rect x="116" y="190" width="64" height="10" className="f-surface" /><rect x="116" y="220" width="76" height="10" className="f-surface" />
      <rect x="262" y="160" width="250" height="34" className="f-fg" />
      <rect x="262" y="220" width="420" height="10" className="f-surface" /><rect x="262" y="244" width="360" height="10" className="f-surface" />
      <rect x="262" y="290" width="190" height="190" className="f-accent" />
      <rect x="480" y="290" width="202" height="88" className="f-surface" /><rect x="480" y="392" width="202" height="88" className="s-fg" strokeWidth="1.5" />
      <text x="24" y="580" className="svg-label">IMAGEN DE EJEMPLO</text></svg>`;
  }
  const arcs = [];
  for (let i = 1; i <= 6; i++) arcs.push(html`<circle key=${i} cx="400" cy="640" r=${i * 85} className=${i === 3 ? "s-accent" : "s-fg"} strokeWidth=${i === 3 ? 3 : 1.2} />`);
  return html`<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Composición de arcos de ejemplo">
    <rect width="800" height="600" className="f-surface" />${arcs}
    <circle cx="400" cy="385" r="26" className="f-accent" />
    <rect x="60" y="60" width="90" height="90" className="f-fg" />
    <text x="24" y="580" className="svg-label">IMAGEN DE EJEMPLO</text></svg>`;
}

function Projects() {
  return html`<${Section} id="proyectos" label="Proyectos">
    <p className="lead max-w-[22ch]">Trabajo seleccionado.</p>
    <ul className="mt-14 md:mt-20">
      ${SITE.projects.map((p, i) => html`<li key=${i} className="row proj grid gap-8 py-12 lg:grid-cols-12 lg:gap-10 md:py-16">
        <div className=${"lg:col-span-7 " + (i % 2 ? "lg:order-2" : "")}>
          <div className="proj-img"><${ProjectArt} kind=${p.art} /></div>
        </div>
        <div className=${"flex min-w-0 flex-col justify-between gap-8 lg:col-span-5 " + (i % 2 ? "lg:order-1" : "")}>
          <div>
            <p className="label flex flex-wrap justify-between gap-2"><span>${p.category}</span><span>${ph(p.year)}</span></p>
            <h3 className="display mt-5 text-[clamp(1.8rem,3vw,2.6rem)] font-normal leading-[1.05]">${ph(p.title)}</h3>
            <p className="mono mt-3 text-[.78rem] text-muted">${ph(p.role)}</p>
            <p className="mt-5 text-muted">${ph(p.description)}</p>
            <ul className="mt-5 flex flex-wrap gap-2">${p.tags.map((t, j) => html`<li key=${j} className="tag">${ph(t)}</li>`)}</ul>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[.92rem]">${p.links.map((l, j) => html`<li key=${j}><${ExtLink} link=${l} /></li>`)}</ul>
        </div>
      </li>`)}
    </ul>
  </${Section}>`;
}

function Contact() {
  const [msg, setMsg] = useState("");
  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.email); setMsg("Correo copiado."); }
    catch (e) { setMsg("Selecciona el correo y cópialo manualmente."); }
    setTimeout(() => setMsg(""), 3000);
  };
  return html`<${Section} id="contacto" label="Contacto">
    <p className="lead max-w-[18ch]">¿Hablamos de tu próximo proyecto?</p>
    <p className="display mt-10 text-[clamp(1.7rem,5.6vw,4.4rem)] font-light leading-none" style=${{ overflowWrap: "anywhere", userSelect: "all" }}>${SITE.email}</p>
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a href=${"mailto:" + SITE.email} className="btn btn-solid">Escribir un correo <${Arrow} /></a>
      <button type="button" className="btn btn-line" onClick=${copy}>Copiar correo</button>
      <span className="mono text-[.8rem] text-muted" role="status" aria-live="polite">${msg}</span>
    </div>
    <div className="mt-16">
      <h3 className="label">Redes profesionales</h3>
      <ul className="mt-4">
        ${SITE.socials.map((s, i) => html`<li key=${i} className="row flex items-center justify-between gap-4 py-4">
          <span className="display text-[1.35rem]">${s.label}</span>
          ${s.url ? html`<a className="ulink mono text-[.8rem]" href=${s.url} target="_blank" rel="noopener noreferrer">Abrir ↗</a>`
                  : html`<span className="pending mono text-[.75rem]" title="Añade la URL en la configuración SITE">enlace pendiente</span>`}
        </li>`)}
      </ul>
    </div>
  </${Section}>`;
}

function Footer() {
  return html`<footer className="row">
    <div className="wrap flex flex-wrap items-center justify-between gap-4 py-8">
      <p className="mono text-[.78rem] text-muted">© ${new Date().getFullYear()} ${ph(SITE.name)}</p>
      <a href="#inicio" className="ulink mono text-[.78rem]">Volver arriba ↑</a>
    </div>
  </footer>`;
}

function App() {
  const active = useActiveSection();
  return html`<${React.Fragment}>
    <${Header} active=${active} />
    <main id="contenido">
      <${Hero} /><${About} /><${Experience} /><${Projects} /><${Contact} />
    </main>
    <${Footer} />
  </${React.Fragment}>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);