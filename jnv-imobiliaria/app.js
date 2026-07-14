/* ===================================================================
   JNV Imobiliária — lógica de catálogo, filtros e WhatsApp
   =================================================================== */

/* ---- CONFIG: altere aqui o número e a mensagem padrão ---- */
const WHATSAPP = "5517991082525"; // (17) 99108-2525
const DEFAULT_MSG = "Olá! Vim pelo site da JNV Imobiliária e gostaria de mais informações.";

/* ---- Imóveis (dados de demonstração) ---- */
const LISTINGS = [
  { id: 1, ref: "JNV-118", type: "casa", typeLabel: "Casa", operation: "venda",
    title: "Casa térrea com quintal amplo", neighborhood: "Centro", price: 485000,
    status: "disponivel", beds: 3, baths: 2, area: 180, parking: 2,
    desc: "Casa térrea bem localizada, com edícula, quintal amplo e a poucos minutos do comércio central.",
    img: "photo-1568605114967-8130f3a36994" },

  { id: 2, ref: "JNV-072", type: "apartamento", typeLabel: "Apartamento", operation: "locacao",
    title: "Apartamento novo com lazer", neighborhood: "Jardim Alvorada", price: 1450, per: "mês",
    status: "disponivel", beds: 2, baths: 1, area: 62, parking: 1,
    desc: "Unidade nova e bem ventilada, condomínio com área de lazer e portaria. Pronto para morar.",
    img: "photo-1493809842364-78817add7ffb" },

  { id: 3, ref: "JNV-205", type: "casa", typeLabel: "Sobrado", operation: "venda",
    title: "Sobrado com espaço gourmet e piscina", neighborhood: "Jardim Bela Vista", price: 720000,
    status: "negociacao", beds: 3, baths: 3, area: 240, parking: 3,
    desc: "Sobrado moderno de alto padrão, com suíte master, espaço gourmet completo e piscina.",
    img: "photo-1613490493576-7fde63acd811" },

  { id: 4, ref: "JNV-041", type: "terreno", typeLabel: "Terreno", operation: "venda",
    title: "Lote plano em condomínio", neighborhood: "Residencial dos Ipês", price: 150000,
    status: "disponivel", area: 250,
    desc: "Terreno plano em condomínio fechado, pronto para construir. Excelente topografia e infraestrutura.",
    img: "photo-1500382017468-9049fed747ef" },

  { id: 5, ref: "JNV-160", type: "casa", typeLabel: "Casa", operation: "venda",
    title: "Casa moderna com suíte", neighborhood: "Jardim São Judas", price: 610000,
    status: "disponivel", beds: 3, baths: 2, area: 200, parking: 2,
    desc: "Projeto contemporâneo, acabamento de primeira, suíte com closet e área de churrasco integrada.",
    img: "photo-1564013799919-ab600027ffc6" },

  { id: 6, ref: "JNV-089", type: "comercial", typeLabel: "Ponto comercial", operation: "locacao",
    title: "Salão comercial no centro", neighborhood: "Centro", price: 3200, per: "mês",
    status: "disponivel", area: 120, parking: 1,
    desc: "Ponto de esquina com grande fluxo, fachada ampla e banheiro adaptado. Ótimo para loja ou serviços.",
    img: "photo-1441986300917-64674bd600d8" },

  { id: 7, ref: "JNV-233", type: "chacara", typeLabel: "Chácara", operation: "venda",
    title: "Chácara com pomar e nascente", neighborhood: "Zona rural", price: 390000,
    status: "negociacao", beds: 2, baths: 1, area: 1000,
    desc: "Recanto tranquilo com casa sede, pomar formado, poço e área verde. Ideal para lazer ou moradia.",
    img: "photo-1416879595882-3373a0480b5b" },

  { id: 8, ref: "JNV-127", type: "casa", typeLabel: "Casa", operation: "troca",
    title: "Casa que aceita troca", neighborhood: "Jardim Primavera", price: 430000,
    status: "disponivel", beds: 3, baths: 2, area: 160, parking: 2, trade: true,
    desc: "Ótima casa familiar em rua tranquila. Proprietário aceita imóvel de menor valor como parte do pagamento.",
    img: "photo-1570129477492-45c003edd2be" },

  { id: 9, ref: "JNV-014", type: "apartamento", typeLabel: "Apartamento", operation: "venda",
    title: "Apartamento pronto no centro", neighborhood: "Centro", price: 335000,
    status: "disponivel", beds: 2, baths: 2, area: 70, parking: 1,
    desc: "Andar alto com boa vista, sol da manhã e duas vagas. Documentação em dia para financiamento.",
    img: "photo-1502672260266-1c1ef2d93688" },
];

const OP_LABELS = { venda: "Venda", locacao: "Locação", troca: "Troca" };

/* ---- Helpers ---- */
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const img = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ---- Ícones (linha fina) ---- */
const ICON = {
  bed:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5"/><path d="M3 18h18M3 14V7M7 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2m0 0V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/></svg>`,
  bath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V6a2 2 0 0 1 3.4-1.4L8 5"/><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 19l-1 2M18 19l1 2M7 6h2"/></svg>`,
  area: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M4 9h4M4 15h4M15 4v4M9 4v2"/></svg>`,
  car:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M4 13h16v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="15.5" r=".6"/><circle cx="16.5" cy="15.5" r=".6"/></svg>`,
  pin:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>`,
  wa:   `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.4L4 29l7-1.8c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9C29 8.3 22.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6C5.4 9.6 10.1 5 16 5s10.6 4.6 10.6 9.9S21.9 24.7 16 24.7z"/><path d="M22 18.3c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-2.6-1.6 9.6 9.6 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.7.7.3 1.3.5 1.8.7.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`,
};

/* ---- Estado do filtro ---- */
const state = { operation: "todos", type: "todos", query: "" };

/* ---- Render de um card ---- */
function cardHTML(item) {
  const priceValue = BRL.format(item.price);
  const per = item.per ? `<span class="per">/${item.per}</span>` : "";
  const statusLabel = item.status === "disponivel" ? "Disponível" : "Em negociação";

  const specs = [];
  if (item.beds)    specs.push(`<span class="spec">${ICON.bed}${item.beds} dorm.</span>`);
  if (item.baths)   specs.push(`<span class="spec">${ICON.bath}${item.baths} banh.</span>`);
  if (item.area)    specs.push(`<span class="spec">${ICON.area}${item.area.toLocaleString("pt-BR")} m²</span>`);
  if (item.parking) specs.push(`<span class="spec">${ICON.car}${item.parking} vaga${item.parking > 1 ? "s" : ""}</span>`);

  const tradeNote = item.trade ? `<span class="note">Aceita troca</span>` : "";

  const msg = `Olá! Tenho interesse neste imóvel da JNV Imobiliária:\n\n*${item.title}*\n${OP_LABELS[item.operation]} • ${item.neighborhood}\nValor: ${priceValue}${item.per ? "/" + item.per : ""}\nRef.: ${item.ref}\n\nEle ainda está disponível?`;

  return `
    <article class="card reveal">
      <div class="card-media">
        <div class="badges">
          <span class="status ${item.status}">${statusLabel}</span>
          <span class="op-tag">${OP_LABELS[item.operation]}</span>
        </div>
        <img src="${img(item.img, 720)}" alt="${item.typeLabel} — ${item.title}, ${item.neighborhood}" loading="lazy"
             onerror="this.style.display='none';this.closest('.card-media').classList.add('no-img')" />
      </div>
      <div class="card-body">
        <span class="card-type">${item.typeLabel}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-loc">${ICON.pin}${item.neighborhood} — Monte Aprazível/SP</p>
        <p class="card-desc">${item.desc}</p>
        ${specs.length ? `<div class="specs">${specs.join("")}</div>` : ""}
        <div class="card-foot">
          <div class="price">
            <span class="value">${priceValue}${per}</span>
            ${tradeNote || `<span class="per">Ref. ${item.ref}</span>`}
          </div>
          <a class="btn btn-interest" href="${waLink(msg)}" target="_blank" rel="noopener" aria-label="Tenho interesse em ${item.title}">
            ${ICON.wa} Tenho interesse
          </a>
        </div>
      </div>
    </article>`;
}

/* ---- Filtro + render da grade ---- */
const grid = document.getElementById("grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");

function applyFilters() {
  const q = state.query.trim().toLowerCase();
  const filtered = LISTINGS.filter((it) => {
    if (state.operation !== "todos" && it.operation !== state.operation) return false;
    if (state.type !== "todos" && it.type !== state.type) return false;
    if (q) {
      const hay = `${it.title} ${it.neighborhood} ${it.desc} ${it.typeLabel}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  grid.innerHTML = filtered.map(cardHTML).join("");
  emptyState.hidden = filtered.length !== 0;
  resultsCount.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${LISTINGS.length} imóveis`;

  // anima os novos cards
  grid.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
    revealObserver.observe(el);
  });
}

/* ---- Sincroniza controles visuais com o estado ---- */
const opChips = [...document.querySelectorAll("#op-chips .chip")];
const typeSelect = document.getElementById("type-select");
const heroOp = document.getElementById("hero-op");
const heroType = document.getElementById("hero-type");
const heroQ = document.getElementById("hero-q");

function syncControls() {
  opChips.forEach((c) => {
    const active = c.dataset.op === state.operation;
    c.classList.toggle("is-active", active);
    c.setAttribute("aria-selected", active ? "true" : "false");
  });
  typeSelect.value = state.type;
  heroOp.value = state.operation;
  heroType.value = state.type;
}

/* ---- Eventos de filtro ---- */
opChips.forEach((chip) =>
  chip.addEventListener("click", () => {
    state.operation = chip.dataset.op;
    syncControls();
    applyFilters();
  })
);

typeSelect.addEventListener("change", () => {
  state.type = typeSelect.value;
  syncControls();
  applyFilters();
});

document.getElementById("hero-search").addEventListener("submit", (e) => {
  e.preventDefault();
  state.operation = heroOp.value;
  state.type = heroType.value;
  state.query = heroQ.value;
  syncControls();
  applyFilters();
  document.getElementById("imoveis").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("clear-filters").addEventListener("click", () => {
  state.operation = "todos";
  state.type = "todos";
  state.query = "";
  heroQ.value = "";
  syncControls();
  applyFilters();
});

/* ---- Links de WhatsApp padrão ---- */
["wa-header", "wa-mobile", "wa-sobre", "wa-cta", "wa-footer", "wa-fab"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = waLink(DEFAULT_MSG);
});

/* ---- Header: estado ao rolar ---- */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---- Menu mobile ---- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
function toggleMenu(open) {
  const isOpen = open ?? !mobileMenu.classList.contains("open");
  mobileMenu.hidden = false;
  requestAnimationFrame(() => mobileMenu.classList.toggle("open", isOpen));
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  hamburger.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = isOpen ? "hidden" : "";
  if (!isOpen) setTimeout(() => { if (!mobileMenu.classList.contains("open")) mobileMenu.hidden = true; }, 450);
}
hamburger.addEventListener("click", () => toggleMenu());
mobileMenu.querySelectorAll("[data-close], a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

/* ---- Reveal on scroll ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---- Ano no rodapé ---- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Inicializa ---- */
syncControls();
applyFilters();
