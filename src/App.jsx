import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Architecture from "./components/Architecture";
import BounceCards from "./components/BounceCards";
import TextLoop from "./components/TextLoop";
import TechText from "./components/TechText";

const WA =
  "https://wa.me/5592992192321?text=Ol%C3%A1%2C%20Fernanda!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.";
const IG = "https://www.instagram.com/arq_fernandas/";
const MAP =
  "https://www.google.com/maps/search/?api=1&query=Av.%20Lions%20Internacional%2C%201366%2C%20Sapezal%20MT%2078366-018";
const projects = [
  {
    title: "Entre luz e natureza",
    category: "Residenciais",
    image: "casa-contemporanea",
    type: "Arquitetura residencial",
    text: "Volumes puros, transparência e integração entre os espaços internos e o jardim.",
  },
  {
    title: "A vida acontece aqui",
    category: "Interiores",
    image: "estar-integrado",
    type: "Interiores · estar e cozinha",
    text: "Texturas acolhedoras e ambientes conectados para os encontros do dia a dia.",
  },
  {
    title: "Aprender, criar, descobrir",
    category: "Comerciais",
    image: "espaco-educacional",
    type: "Arquitetura de espaços educacionais",
    text: "Cor, movimento e possibilidades em um espaço pensado para o aprendizado.",
  },
  {
    title: "Geometria que acolhe",
    category: "Residenciais",
    image: "fachada-geometrica",
    type: "Arquitetura residencial",
    text: "Uma composição de linhas, materiais e vegetação que dá identidade à fachada.",
  },
  {
    title: "O essencial, em equilíbrio",
    category: "Interiores",
    image: "cozinha-natural",
    type: "Interiores · cozinha e jantar",
    text: "Madeira, tons naturais e verde em uma composição que aproxima o morar da natureza.",
  },
  {
    title: "Um lugar para imaginar",
    category: "Interiores",
    image: "quarto-estudo",
    type: "Interiores · dormitório",
    text: "Descanso e concentração encontram lugar em um ambiente funcional e pessoal.",
  },
];
const imageSrc = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`;
const Arrow = ({ diagonal = false, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    aria-hidden="true"
    {...props}
  >
    {diagonal ? (
      <path d="M5 19 19 5M5 5h14v14" />
    ) : (
      <path d="M4 12h16m-6-6 6 6-6 6" />
    )}
  </svg>
);
function Mark() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <path d="M23 48V9h29M23 28h18M16 58 48 17v41H7" />
      <path d="M48 17H37a15 15 0 0 0 0 30h8a11 11 0 1 1-11 11" />
    </svg>
  );
}
function External({ href = WA, className = "", children, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
function ServiceDrawing({ kind }) {
  return (
    <svg
      viewBox="0 0 130 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      {kind === 0 && (
        <>
          <path d="m15 55 50-34 50 34M25 49v40h80V49M56 89V62h20v27M34 61h13v13H34Z" />
          <path d="M8 94h114M65 10v12M18 30h25" strokeDasharray="3 4" />
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M23 88V29h84v59M17 88h96M23 44h84M33 29V15h64v14M35 55h22v16H35ZM69 55h26v33M81 55v33" />
          <path d="M12 10v85M118 10v85M7 15h10M7 88h10" strokeDasharray="3 4" />
        </>
      )}
      {kind === 2 && (
        <>
          <path d="M21 88V15h88v73H21ZM21 15l22 19h66M43 34v54M57 74V54h36v20M52 74h46v9H52ZM60 83v5M91 83v5M82 34v10M73 44h18" />
          <path d="M9 94h112" strokeDasharray="3 4" />
        </>
      )}
      {kind === 3 && (
        <>
          <path d="M64 88V67M42 69C8 54 24 12 49 18c10-18 37-12 39 3 28 2 32 36 7 46M64 67c-22 0-32-30-10-34M64 67c22 0 31-29 10-34M49 18c-8 15 7 23 15 14M88 21c7 12-6 23-16 14M40 85h49" />
          <circle cx="64" cy="48" r="7" />
          <path d="M11 48h18M101 48h18M64 2v12" strokeDasharray="3 4" />
        </>
      )}
    </svg>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [privacy, setPrivacy] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  const motion = !reduced && !paused;
  const hero = useRef(null),
    portrait = useRef(null),
    name = useRef(null),
    plans = useRef(null),
    galleryDialog = useRef(null),
    privacyDialog = useRef(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    const element = hero.current;
    const targets = [portrait.current, name.current, plans.current];
    if (!motion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-arrive",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power3.out" },
      );
      gsap.to(".hero-orbit", {
        rotate: 8,
        scale: 1.03,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, element);
    const px = gsap.quickTo(portrait.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    const py = gsap.quickTo(portrait.current, "y", {
      duration: 1.5,
      ease: "power3.out",
    });
    const nx = gsap.quickTo(name.current, "x", {
      duration: 1.7,
      ease: "power3.out",
    });
    const sx = gsap.quickTo(plans.current, "x", {
      duration: 2,
      ease: "power3.out",
    });
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const r = element.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      px(x * 12);
      py(y * 8);
      nx(x * -13);
      sx(x * -25);
    };
    const leave = () => {
      px(0);
      py(0);
      nx(0);
      sx(0);
    };
    let frame;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        element.style.setProperty("--scroll", `${y * 0.1}px`);
        frame = null;
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      element.classList.toggle("offscreen", !entry.isIntersecting);
    });
    observer.observe(element);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      context.revert();
      [px, py, nx, sx].forEach((x) => x.tween.kill());
      gsap.set(targets, { clearProps: "transform" });
      element.style.removeProperty("--scroll");
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [motion]);
  useEffect(() => {
    if (!motion) return;
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    nodes.forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((el) => el.classList.remove("will-reveal"));
    };
  }, [motion, filter]);
  useEffect(() => {
    if (selected !== null) {
      galleryDialog.current.showModal();
      document.body.style.overflow = "hidden";
    } else galleryDialog.current.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  useEffect(() => {
    if (privacy) privacyDialog.current.showModal();
    else privacyDialog.current.close();
  }, [privacy]);
  const changeProject = (direction) =>
    setSelected((i) => (i + direction + projects.length) % projects.length);
  const current = projects[selected ?? 0];
  return (
    <div className={!motion ? "site motion-paused" : "site"}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header">
        <a
          className="brand"
          href="#inicio"
          aria-label="Fernanda Santos, início"
        >
          <Mark />
          <span>
            FERNANDA SANTOS<small>ARQUITETA & URBANISTA</small>
          </span>
        </a>
        <nav
          id="navigation"
          className={menu ? "navigation open" : "navigation"}
          aria-label="Navegação principal"
        >
          {[
            ["inicio", "Início"],
            ["projetos", "Projetos"],
            ["sobre", "Sobre mim"],
            ["servicos", "Serviços"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
          <External className="mobile-contact" onClick={() => setMenu(false)}>
            Vamos conversar <Arrow diagonal />
          </External>
        </nav>
        <External className="header-cta">
          Vamos conversar <Arrow diagonal />
        </External>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          aria-label={menu ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenu(!menu)}
        >
          <span />
          <span />
        </button>
      </header>
      <main id="conteudo">
        <section
          id="inicio"
          className="hero"
          ref={hero}
          aria-labelledby="hero-heading"
        >
          <div className="hero-topline hero-arrive">
            <span className="eyebrow">
              <i /> ARQUITETURA COM PROPÓSITO
            </span>
            <span className="hero-place">
              SAPEZAL, MT <span>—</span> BRASIL
            </span>
          </div>
          <div className="hero-blueprints" ref={plans}>
            <Architecture />
          </div>
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-wordmark hero-arrive" ref={name}>
            <span>FERNANDA</span>
            <span>SANTOS</span>
          </div>
          <div className="portrait-parallax" ref={portrait}>
            <div className="portrait-float">
              <img
                className="hero-portrait"
                src={imageSrc("fernanda")}
                alt="Fernanda Santos, arquiteta e urbanista"
                width="1000"
                height="1023"
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="hero-bottom-fade" />
          <div className="hero-intro hero-arrive">
            <span className="mini-label">
              O SEU JEITO DE VIVER, EM CADA TRAÇO.
            </span>
            <h1 id="hero-heading">
              Espaços para viver.
              <br />
              Projetos para <em>sentir.</em>
            </h1>
            <a className="button button-dark" href="#projetos">
              Explore os projetos <Arrow diagonal />
            </a>
          </div>
          <a className="hero-feature hero-arrive" href="#projetos">
            <div className="hero-feature-image">
              <img
                src={imageSrc("casa-contemporanea")}
                alt="Residência contemporânea integrada ao jardim"
                width="1000"
                height="1000"
              />
              <span>
                <Arrow diagonal />
              </span>
            </div>
            <span>
              DO TRAÇO À VIDA <small>Um olhar para o morar</small>
            </span>
          </a>
          <div className="hero-footer">
            <a href="#projetos" className="scroll-link">
              <span>↓</span> DESCUBRA UM NOVO OLHAR
            </a>
            <span className="hero-specialty">
              ARQUITETURA <i /> INTERIORES <i /> NEUROARQUITETURA
            </span>
            <button
              className="motion-toggle"
              onClick={() => setPaused(!paused)}
              aria-label={motion ? "Pausar animações" : "Ativar animações"}
              aria-pressed={!motion}
              disabled={reduced}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
                {motion ? (
                  <path d="M3 2h3v12H3zM10 2h3v12h-3z" />
                ) : (
                  <path d="m4 2 10 6-10 6Z" />
                )}
              </svg>
              <span>
                {motion
                  ? "Pausar movimento"
                  : reduced
                    ? "Movimento reduzido"
                    : "Ativar movimento"}
              </span>
            </button>
          </div>
        </section>
        <section
          id="projetos"
          className="projects section-space"
          aria-labelledby="projects-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow section-index">01 / PORTFÓLIO</span>
              <h2 id="projects-heading">
                Cada espaço,
                <br />
                uma nova <em>história.</em>
              </h2>
            </div>
            <div className="section-aside">
              <p>
                O encontro entre o que você sonha
                <br />e o que faz sentido para a sua vida.
              </p>
              <span className="little-rule" />
            </div>
          </div>
          <div className="portfolio-toolbar">
            <div className="filters" aria-label="Filtrar projetos">
              {["Todos", "Residenciais", "Interiores", "Comerciais"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <span className="project-count" aria-live="polite">
              {String(
                projects.filter(
                  (p) => filter === "Todos" || p.category === filter,
                ).length,
              ).padStart(2, "0")}{" "}
              PROJETOS
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) =>
              filter === "Todos" || project.category === filter ? (
                <button
                  key={project.image}
                  className="project-card"
                  onClick={() => setSelected(index)}
                  aria-label={`Ver projeto: ${project.title}`}
                  data-reveal
                >
                  <div className="project-image">
                    <img
                      src={imageSrc(project.image)}
                      alt={project.type}
                      loading="lazy"
                      width="1000"
                      height="900"
                    />
                    <span className="project-number">0{index + 1}</span>
                    <span className="project-open">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="project-caption">
                    <div>
                      <span>{project.type}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <Arrow diagonal />
                  </div>
                </button>
              ) : null,
            )}
          </div>
          <External href={IG} className="text-link portfolio-instagram">
            Mais do nosso olhar no Instagram <Arrow diagonal />
          </External>
        </section>
        <section className="philosophy" aria-label="Filosofia de projeto">
          <span className="eyebrow">ALÉM DA ESTÉTICA. MAIS PERTO DE VOCÊ.</span>
          <div className="loop-wrap">
            <TextLoop
              text="Arquitetura que acolhe"
              separator="/"
              shape="line"
              fontSize={100}
              fontWeight={400}
              letterSpacing={-2}
              uppercase={false}
              ribbon={false}
              speed={motion ? 28 : 0}
              pauseOnHover
              color="#414b3b"
            />
          </div>
          <span className="philosophy-bottom">
            PESSOAS. HISTÓRIAS. PERTENCIMENTO.
          </span>
        </section>
        <section
          id="sobre"
          className="about section-space"
          aria-labelledby="about-heading"
        >
          <div className="about-image" data-reveal>
            <img
              src={imageSrc("sobre-fernanda")}
              alt="Retrato de Fernanda Santos em preto e branco"
              width="750"
              height="940"
              loading="lazy"
            />
            <div className="about-seal">
              <Mark />
              <span>
                UM OLHAR
                <br />
                HUMANO
              </span>
            </div>
            <span className="photo-caption">
              FERNANDA SANTOS / ARQUITETA E URBANISTA
            </span>
          </div>
          <div className="about-content" data-reveal>
            <span className="eyebrow section-index">02 / QUEM DESENHA</span>
            <h2 id="about-heading">
              Antes dos espaços,
              <br />
              as <em>pessoas.</em>
            </h2>
            <p className="about-lead">
              Sou Fernanda. Mãe, professora, arquiteta e uma mulher que acredita
              na beleza dos recomeços.
            </p>
            <p>
              A arquitetura entrou na minha vida para transformar espaços — e
              acabou transformando a mim também. Hoje, projeto com um olhar
              atento às pessoas, às suas histórias e à vida que acontece em cada
              lar.
            </p>
            <p>
              Como especialista em neuroarquitetura, conecto estética,
              funcionalidade e bem-estar. Porque um bom projeto começa por
              entender como você quer se sentir.
            </p>
            <div className="about-details">
              <span>ARQUITETA & URBANISTA</span>
              <span>ESPECIALISTA EM NEUROARQUITETURA</span>
              <span>SAPEZAL — MATO GROSSO</span>
            </div>
            <External className="text-link">
              Vamos desenhar a sua história <Arrow diagonal />
            </External>
          </div>
        </section>
        <section
          id="servicos"
          className="services section-space"
          aria-labelledby="services-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow section-index">03 / POSSIBILIDADES</span>
              <h2 id="services-heading">
                Do primeiro traço
                <br />
                ao seu <em>lugar no mundo.</em>
              </h2>
            </div>
            <p className="section-aside">
              Sensibilidade para entender.
              <br />
              Arquitetura para transformar.
            </p>
          </div>
          <div className="service-grid">
            {[
              [
                "Arquitetura residencial",
                "Casas pensadas para a sua rotina, seus encontros e a sua forma de viver.",
              ],
              [
                "Arquitetura comercial",
                "Espaços que traduzem a identidade do seu negócio e acolhem pessoas.",
              ],
              [
                "Design de interiores",
                "Materiais, luz e detalhes em equilíbrio. Beleza que faz parte do cotidiano.",
              ],
              [
                "Neuroarquitetura",
                "Um olhar para como os ambientes influenciam as emoções e o bem-estar.",
              ],
            ].map(([title, text], i) => (
              <article className="service-card" key={title} data-reveal>
                <div className="service-top">
                  <span>0{i + 1}</span>
                  <ServiceDrawing kind={i} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <External
                  href={`https://wa.me/5592992192321?text=${encodeURIComponent(`Olá, Fernanda! Gostaria de saber mais sobre ${title.toLowerCase()}.`)}`}
                  aria-label={`Conversar sobre ${title.toLowerCase()}`}
                >
                  <span>Vamos conversar</span>
                  <Arrow diagonal />
                </External>
              </article>
            ))}
          </div>
        </section>
        <section
          className="process section-space"
          aria-labelledby="process-heading"
        >
          <div className="process-copy" data-reveal>
            <span className="eyebrow section-index">04 / O CAMINHO</span>
            <h2 id="process-heading">
              Seu sonho.
              <br />
              Nosso <em>ponto de partida.</em>
            </h2>
            <div className="steps">
              {[
                [
                  "Escutar",
                  "Uma conversa sobre você, seus desejos e suas necessidades.",
                ],
                [
                  "Imaginar",
                  "Conceitos, referências e soluções que dão forma às ideias.",
                ],
                [
                  "Projetar",
                  "Cada escolha conectada à sua rotina e à essência do espaço.",
                ],
              ].map(([title, text], i) => (
                <div key={title}>
                  <span>0{i + 1}</span>
                  <p>
                    <strong>{title}</strong>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="process-visual" data-reveal>
            <span className="process-cross">+</span>
            <BounceCards
              images={[0, 4, 1].map((i) => ({
                src: imageSrc(projects[i].image),
                alt: `Abrir projeto: ${projects[i].title}`,
              }))}
              containerWidth={520}
              containerHeight={460}
              cardSize={260}
              spread={95}
              rotation={9}
              arc={20}
              pushDistance={80}
              borderWidth={8}
              borderColor="#faf9f3"
              radius={2}
              onCardClick={(index) => setSelected([0, 4, 1][index])}
            />
            <span className="mini-label">
              REFERÊNCIAS QUE SE TORNAM POSSIBILIDADES
            </span>
          </div>
        </section>
        <section
          id="contato"
          className="contact"
          aria-labelledby="contact-heading"
        >
          <Architecture />
          <div className="contact-content" data-reveal>
            <span className="eyebrow">O PRÓXIMO PROJETO PODE SER O SEU.</span>
            <h2 id="contact-heading">
              Vamos dar vida
              <br />
              ao que você <em>imagina?</em>
            </h2>
            <External className="button button-light">
              Converse com a Fernanda <Arrow diagonal />
            </External>
            <span className="contact-note">
              Uma boa conversa é onde tudo começa.
            </span>
          </div>
          <div className="contact-signature" aria-hidden="true">
            <TechText
              text="SINTA-SE EM CASA."
              fontFamily="Cormorant Garamond"
              fontWeight={400}
              fontSize={130}
              color="#b8c2a5"
              accentColor="#c2aa7a"
              reveal="letter"
              selection={false}
              labels={false}
              draggable={false}
              clickKick={false}
              specks={0}
              sweep={motion}
              speed={0.4}
            />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <a
            className="footer-brand"
            href="#inicio"
            aria-label="Voltar ao início"
          >
            <img
              src={imageSrc("logo-original")}
              alt="Fernanda Santos — Arquiteta & Urbanista"
              width="600"
              height="600"
              loading="lazy"
            />
          </a>
          <div>
            <span className="eyebrow">ENCONTRE-NOS</span>
            <p>
              Av. Lions Internacional, 1366
              <br />
              Sapezal – MT · CEP 78366-018
            </p>
            <External href={MAP} className="text-link">
              Ver no mapa <Arrow diagonal />
            </External>
          </div>
          <div>
            <span className="eyebrow">VAMOS CONVERSAR</span>
            <External href={WA} className="footer-phone">
              (92) 99219-2321
            </External>
            <External href={IG} className="text-link">
              @arq_fernandas <Arrow diagonal />
            </External>
          </div>
          <a href="#inicio" className="back-top" aria-label="Voltar ao início">
            ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Fernanda Santos. Todos os direitos
            reservados.
          </span>
          <button onClick={() => setPrivacy(true)}>Privacidade</button>
          <span>ARQUITETURA FEITA PARA SENTIR.</span>
        </div>
      </footer>
      <dialog
        ref={galleryDialog}
        className="gallery-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") changeProject(1);
          if (e.key === "ArrowLeft") changeProject(-1);
        }}
      >
        <div className="gallery-inner">
          <button
            className="dialog-close"
            onClick={() => setSelected(null)}
            aria-label="Fechar projeto"
          >
            ×
          </button>
          <img src={imageSrc(current.image)} alt={current.type} />
          <div className="gallery-description">
            <div>
              <span className="eyebrow">{current.type}</span>
              <h2 id="project-dialog-title">{current.title}</h2>
              <p>{current.text}</p>
              <span className="gallery-note">
                Imagem de apresentação do projeto.
              </span>
            </div>
            <div className="gallery-actions">
              <button
                onClick={() => changeProject(-1)}
                aria-label="Projeto anterior"
              >
                ←
              </button>
              <span>{String((selected ?? 0) + 1).padStart(2, "0")} / 06</span>
              <button
                onClick={() => changeProject(1)}
                aria-label="Próximo projeto"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <dialog
        ref={privacyDialog}
        className="privacy-dialog"
        onCancel={() => setPrivacy(false)}
        onClose={() => setPrivacy(false)}
        aria-labelledby="privacy-title"
      >
        <button
          className="dialog-close"
          onClick={() => setPrivacy(false)}
          aria-label="Fechar privacidade"
        >
          ×
        </button>
        <span className="eyebrow">TRANSPARÊNCIA</span>
        <h2 id="privacy-title">Sua privacidade.</h2>
        <p>
          Este site não utiliza cookies de publicidade, ferramentas de
          rastreamento ou formulários de coleta de dados. As fontes e imagens
          são carregadas pela própria hospedagem.
        </p>
        <p>
          Ao seguir os links de WhatsApp, Instagram ou Google Maps, você acessa
          serviços externos sujeitos às respectivas políticas de privacidade. A
          hospedagem pode registrar dados técnicos de acesso para operação e
          segurança.
        </p>
        <p>
          As informações que você enviar pelo WhatsApp serão utilizadas para
          responder ao contato e conversar sobre seu projeto. Para dúvidas ou
          solicitações sobre seus dados, entre em contato pelo número (92)
          99219-2321.
        </p>
        <External className="text-link">
          Falar sobre privacidade <Arrow diagonal />
        </External>
      </dialog>
    </div>
  );
}
