async function loadProducts() {
  const container = document.getElementById("products");
  const count = document.getElementById("product-count");
  try {
    const response = await fetch("./data/products.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Não foi possível carregar os produtos.");
    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];
    count.textContent = `${products.length} produto(s)`;
    if (!products.length) {
      container.innerHTML = '<p class="status">Ainda não há produtos cadastrados. Volte em breve!</p>';
      return;
    }
    container.innerHTML = "";
    products.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";
      const info = document.createElement("div");
      info.className = "product-info";
      if (product.image) {
        const img = document.createElement("img");
        img.className = "product-image";
        img.src = product.image;
        img.alt = product.name || "Produto";
        img.loading = "lazy";
        img.onerror = () => { img.replaceWith(makePlaceholder()); };
        card.appendChild(img);
      } else {
        card.appendChild(makePlaceholder());
      }
      const name = document.createElement("h3");
      name.className = "product-name";
      name.textContent = product.name || "Produto";
      info.appendChild(name);
      if (product.description) {
        const desc = document.createElement("p");
        desc.className = "product-description";
        desc.textContent = product.description;
        info.appendChild(desc);
      }
      const bottom = document.createElement("div");
      bottom.className = "product-bottom";
      const prices = document.createElement("div");
      const price = document.createElement("div");
      price.className = "price";
      price.textContent = product.price || "";
      prices.appendChild(price);
      if (product.old_price) {
        const old = document.createElement("div");
        old.className = "old-price";
        old.textContent = product.old_price;
        prices.appendChild(old);
      }
      bottom.appendChild(prices);
      info.appendChild(bottom);
      const link = document.createElement("a");
      link.className = "buy-button";
      link.textContent = "CONFERIR OFERTA";
      link.href = safeUrl(product.affiliate_url);
      link.target = "_blank";
      link.rel = "noopener noreferrer sponsored";
      if (link.href === window.location.href && !product.affiliate_url) {
        link.removeAttribute("href");
        link.textContent = "LINK EM BREVE";
        link.style.opacity = ".55";
      }
      info.appendChild(link);
      card.appendChild(info);
      container.appendChild(card);
    });
  } catch (error) {
    count.textContent = "";
    container.innerHTML = '<p class="status">Não foi possível carregar os produtos. Confira se o arquivo data/products.json foi enviado junto com o site.</p>';
    console.error(error);
  }
}
function makePlaceholder() {
  const el = document.createElement("div");
  el.className = "image-placeholder";
  el.textContent = "Imagem do produto";
  return el;
}
function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}
loadProducts();
