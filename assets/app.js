(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const money = (n) => `$${n.toLocaleString("en-US")}`;
  const CART_KEY = "hyss-cart";

  const state = { filter: "all", sort: "featured", cart: loadCart() };

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(saved) ? saved.filter((i) => PRODUCTS.some((p) => p.id === i.id)) : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch { /* storage unavailable */ }
  }

  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

  // ---- Static art ----
  $("[data-hero-art]").innerHTML = jewelryArt("necklaces", "gold", "#7aa6c2");
  $("[data-story-art]").innerHTML = jewelryArt("rings", "gold", "#f4f1ea");
  $("[data-year]").textContent = new Date().getFullYear();

  // ---- Categories ----
  const categoryArt = { rings: ["gold", "#f4f1ea"], necklaces: ["silver", "#f7f3ec"], earrings: ["rose"], bracelets: ["gold"] };
  $("[data-categories]").innerHTML = CATEGORIES.map((c) => `
    <a href="#shop" class="category" data-category="${c.id}">
      <div class="category__art">${jewelryArt(c.id, ...categoryArt[c.id])}</div>
      <h3>${c.name}</h3>
      <p>${c.blurb}</p>
    </a>`).join("");

  $("[data-categories]").addEventListener("click", (e) => {
    const link = e.target.closest("[data-category]");
    if (link) setFilter(link.dataset.category);
  });

  // ---- Filters & sorting ----
  const filterOptions = [{ id: "all", name: "All" }, ...CATEGORIES];
  $("[data-filters]").innerHTML = filterOptions.map((f) =>
    `<button class="chip" role="tab" data-filter="${f.id}">${f.name}</button>`).join("");

  $("[data-filters]").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (btn) setFilter(btn.dataset.filter);
  });

  $("[data-sort]").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderGrid();
  });

  function setFilter(id) {
    state.filter = id;
    renderGrid();
  }

  function visibleProducts() {
    const list = PRODUCTS.filter((p) => state.filter === "all" || p.category === state.filter);
    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return sorters[state.sort] ? [...list].sort(sorters[state.sort]) : list;
  }

  function renderGrid() {
    document.querySelectorAll("[data-filter]").forEach((b) => {
      const active = b.dataset.filter === state.filter;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active);
    });
    $("[data-grid]").innerHTML = visibleProducts().map((p) => `
      <article class="card">
        <button class="card__media" data-view="${p.id}" aria-label="Quick view ${p.name}">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          ${jewelryArt(p.category, p.metal, p.gem)}
        </button>
        <div class="card__body">
          <h3><button class="link" data-view="${p.id}">${p.name}</button></h3>
          <p class="card__meta">${p.material}</p>
          <div class="card__row">
            <span class="price">${money(p.price)}</span>
            <button class="btn btn--small" data-add="${p.id}">Add to bag</button>
          </div>
        </div>
      </article>`).join("");
  }

  $("[data-grid]").addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    const view = e.target.closest("[data-view]");
    if (add) addToCart(add.dataset.add);
    else if (view) openModal(view.dataset.view);
  });

  // ---- Quick view modal ----
  const modal = $("[data-modal]");

  function openModal(id) {
    const p = findProduct(id);
    const cat = CATEGORIES.find((c) => c.id === p.category);
    $("[data-modal-body]").innerHTML = `
      <div class="modal__art">${jewelryArt(p.category, p.metal, p.gem)}</div>
      <div class="modal__text">
        <p class="eyebrow">${cat.name}</p>
        <h2>${p.name}</h2>
        <p class="price price--lg">${money(p.price)}</p>
        <p>${p.description}</p>
        <p class="card__meta">${p.material}</p>
        <button class="btn btn--dark btn--block" data-modal-add="${p.id}">Add to bag</button>
      </div>`;
    modal.showModal();
  }

  modal.addEventListener("click", (e) => {
    const add = e.target.closest("[data-modal-add]");
    if (add) {
      addToCart(add.dataset.modalAdd);
      modal.close();
    } else if (e.target.closest("[data-modal-close]") || e.target === modal) {
      modal.close();
    }
  });

  // ---- Cart ----
  const drawer = $("[data-drawer]");
  const overlay = $("[data-overlay]");

  function addToCart(id) {
    const item = state.cart.find((i) => i.id === id);
    if (item) item.qty += 1;
    else state.cart.push({ id, qty: 1 });
    saveCart();
    renderCart();
    toast(`${findProduct(id).name} added to your bag`);
  }

  function updateQty(id, delta) {
    const item = state.cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) state.cart = state.cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const count = state.cart.reduce((n, i) => n + i.qty, 0);
    const subtotal = state.cart.reduce((n, i) => n + i.qty * findProduct(i.id).price, 0);
    $("[data-cart-count]").textContent = count;
    $("[data-cart-count]").classList.toggle("is-visible", count > 0);
    $("[data-cart-subtotal]").textContent = money(subtotal);
    $("[data-checkout]").disabled = count === 0;
    $("[data-cart-items]").innerHTML = count === 0
      ? `<p class="empty">Your bag is empty.</p>`
      : state.cart.map((i) => {
          const p = findProduct(i.id);
          return `
            <div class="line">
              <div class="line__art">${jewelryArt(p.category, p.metal, p.gem)}</div>
              <div class="line__info">
                <strong>${p.name}</strong>
                <span>${money(p.price)}</span>
                <div class="qty">
                  <button aria-label="Decrease quantity" data-qty="${p.id}" data-delta="-1">−</button>
                  <span>${i.qty}</span>
                  <button aria-label="Increase quantity" data-qty="${p.id}" data-delta="1">+</button>
                </div>
              </div>
              <button class="link line__remove" data-remove="${p.id}">Remove</button>
            </div>`;
        }).join("");
  }

  $("[data-cart-items]").addEventListener("click", (e) => {
    const qty = e.target.closest("[data-qty]");
    const remove = e.target.closest("[data-remove]");
    if (qty) updateQty(qty.dataset.qty, Number(qty.dataset.delta));
    if (remove) updateQty(remove.dataset.remove, -Infinity);
  });

  function setDrawer(open) {
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", !open);
    overlay.hidden = !open;
    document.body.classList.toggle("no-scroll", open);
  }

  $("[data-cart-open]").addEventListener("click", () => setDrawer(true));
  $("[data-cart-close]").addEventListener("click", () => setDrawer(false));
  overlay.addEventListener("click", () => setDrawer(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setDrawer(false); });

  $("[data-checkout]").addEventListener("click", () => {
    toast("Checkout isn't connected yet — hook up Shopify, Stripe or Square to take payments.");
  });

  // ---- Mobile menu ----
  const menuBtn = $("[data-menu-toggle]");
  const nav = $("[data-nav]");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", false);
    }
  });

  // ---- Newsletter ----
  $("[data-newsletter]").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#email");
    const msg = $("[data-newsletter-msg]");
    if (!input.checkValidity()) {
      msg.textContent = "Please enter a valid email address.";
      return;
    }
    msg.textContent = "Thank you — you're on the list.";
    input.value = "";
  });

  // ---- Toast ----
  let toastTimer;
  function toast(text) {
    const el = $("[data-toast]");
    el.textContent = text;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3000);
  }

  renderGrid();
  renderCart();
})();
