/* ===================================================================
   Estação Calçados — catálogo, filtros por categoria e WhatsApp
   =================================================================== */

/* ---- CONFIG ----
   IMPORTANTE: troque o número abaixo pelo WhatsApp real da loja.
   Formato: 55 (país) + DDD + número, só dígitos. Ex.: 5517999990000
--------------------------------------------------------------------- */
const WHATSAPP = "5517999990000"; // (17) 9 9999-0000 — número ILUSTRATIVO
const DEFAULT_MSG = "Olá! Vim pelo site da Estação Calçados e gostaria de atendimento.";

/* ---- Produtos (dados de demonstração) ---- */
const PRODUCTS = [
  { id: 1, cat: "tenis", catLabel: "Tênis", name: "Tênis Urban Branco", price: 259.90, badge: "novo", sizes: "34 – 43",
    desc: "Couro ecológico com solado leve e confortável para o dia a dia.", img: "photo-1608231387042-66d1773070a5" },
  { id: 2, cat: "tenis", catLabel: "Tênis", name: "Tênis Runner Vermelho", price: 329.90, sizes: "37 – 44",
    desc: "Amortecimento esportivo, ideal para caminhada e corrida.", img: "photo-1542291026-7eec264c27ff" },
  { id: 3, cat: "tenis", catLabel: "Tênis", name: "Tênis Retrô Classic", price: 289.90, sizes: "35 – 43",
    desc: "Cano baixo atemporal em lona premium. Combina com tudo.", img: "photo-1525966222134-fcfa99b8ae77" },
  { id: 4, cat: "botas", catLabel: "Botas", name: "Bota Coturno Couro", price: 349.90, badge: "ultimas", sizes: "34 – 39",
    desc: "Coturno feminino em couro legítimo com zíper lateral.", img: "photo-1605812860427-4024433a70fd" },
  { id: 5, cat: "casual", catLabel: "Casual", name: "Bota Social Comfort", price: 399.90, sizes: "38 – 44",
    desc: "Bota social masculina em couro, perfeita para o trabalho.", img: "photo-1449505278894-297fdb3edbc1" },
  { id: 6, cat: "salto", catLabel: "Salto", name: "Scarpin Nobuck", price: 279.90, sizes: "34 – 39",
    desc: "Salto de 7 cm em nobuck macio — elegante e confortável.", img: "photo-1533867617858-e7b97e060509" },
  { id: 7, cat: "sandalias", catLabel: "Sandálias", name: "Sandália Bloco", price: 219.90, badge: "novo", sizes: "34 – 39",
    desc: "Salto bloco estável, ideal para festas e eventos.", img: "photo-1520256862855-398228c41684" },
  { id: 8, cat: "casual", catLabel: "Casual", name: "Mocassim Camel", price: 189.90, sizes: "34 – 40",
    desc: "Mocassim macio para um visual casual e sofisticado.", img: "photo-1543163521-1bf539c55dd2" },
  { id: 9, cat: "tenis", catLabel: "Tênis", name: "Tênis Feminino Leve", price: 239.90, sizes: "34 – 39",
    desc: "Ultraleve e respirável para quem fica o dia todo em pé.", img: "photo-1595950653106-6c9ebd614d3a" },
  { id: 10, cat: "salto", catLabel: "Salto", name: "Mule Salto Fino", price: 249.90, sizes: "34 – 39",
    desc: "Um clássico de salto fino que valoriza qualquer produção.", img: "photo-1596703263926-eb0762ee17e4" },
];

/* ---- Helpers ---- */
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const img = (id, w = 640) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const ICON = {
  ruler: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 8.5 3 21 15.5 15.5 21z"/><path d="m8 8 1.5 1.5M11 11l1.5 1.5M14 8l1.5 1.5"/></svg>`,
  wa: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.4L4 29l7-1.8c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9C29 8.3 22.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6C5.4 9.6 10.1 5 16 5s10.6 4.6 10.6 9.9S21.9 24.7 16 24.7z"/><path d="M22 18.3c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-2.6-1.6 9.6 9.6 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.7.7.3 1.3.5 1.8.7.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`,
};

const BADGE_LABEL = { novo: "Novo", ultimas: "Últimas peças" };

/* ---- Render de produto ---- */
function productHTML(p) {
  const price = BRL.format(p.price);
  const inst = `ou 3x de ${BRL.format(p.price / 3)}`;
  const badge = p.badge ? `<span class="product-badge ${p.badge}">${BADGE_LABEL[p.badge]}</span>` : "";
  const msg = `Olá! Vi no catálogo da Estação Calçados e quero garantir este modelo:\n\n*${p.name}*\nValor: ${price}\nNumeração: ${p.sizes}\n\nAinda tem disponível?`;

  return `
    <article class="product reveal">
      <div class="product-media">
        ${badge}
        <img src="${img(p.img, 560)}" alt="${p.name}" loading="lazy"
             onerror="this.style.display='none';this.closest('.product-media').classList.add('no-img')" />
      </div>
      <div class="product-body">
        <span class="product-cat">${p.catLabel}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <p class="product-sizes">${ICON.ruler} Numeração ${p.sizes}</p>
        <div class="product-foot">
          <div class="product-price">
            <span class="val">${price}</span>
            <span class="inst">${inst}</span>
          </div>
          <a class="btn btn-buy" href="${waLink(msg)}" target="_blank" rel="noopener" aria-label="Comprar ${p.name} pelo WhatsApp">
            ${ICON.wa} Comprar
          </a>
        </div>
      </div>
    </article>`;
}

/* ---- Filtro por categoria ---- */
const grid = document.getElementById("grid");
const resultsCount = document.getElementById("results-count");
const pills = [...document.querySelectorAll(".filter-bar .pill")];
let currentCat = "todos";

function render() {
  const list = currentCat === "todos" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === currentCat);
  grid.innerHTML = list.map(productHTML).join("");
  resultsCount.innerHTML = `Mostrando <strong>${list.length}</strong> de ${PRODUCTS.length} modelos`;
  grid.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 6) * 55}ms`;
    revealObserver.observe(el);
  });
}

pills.forEach((pill) =>
  pill.addEventListener("click", () => {
    currentCat = pill.dataset.cat;
    pills.forEach((p) => {
      const active = p === pill;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-selected", active ? "true" : "false");
    });
    render();
  })
);

/* ---- Links de WhatsApp padrão ---- */
["wa-header", "wa-mobile", "wa-hero", "wa-loja", "wa-footer", "wa-fab"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = waLink(DEFAULT_MSG);
});

/* ---- Header ao rolar ---- */
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
mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

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

/* ---- Init ---- */
render();
