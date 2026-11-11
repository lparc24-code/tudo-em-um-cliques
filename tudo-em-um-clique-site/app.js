const dataUrl = "/data/products.json";
let allProducts = [];
let activeCategory = "Todos";
const money = value => {
  if (!value) return "";
  const n = Number(String(value).replace(",", "."));
  return Number.isFinite(n) ? n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}) : String(value);
};
function render() {
  const categories = ["Todos", ...new Set(allProducts.map(p=>p.category).filter(Boolean))];
  const filters = document.querySelector("#filters");
  filters.innerHTML = categories.map(c=>`<button class="filter ${c===activeCategory?"active":""}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
  filters.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;render()}));
  const shown = activeCategory==="Todos" ? allProducts : allProducts.filter(p=>p.category===activeCategory);
  document.querySelector("#count").textContent = `${shown.length} produto(s)`;
  const root = document.querySelector("#products");
  root.innerHTML = shown.map(p=>{
    const image = p.image ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name||"Produto")}" loading="lazy">` : `<div class="placeholder">🛍️</div>`;
    return `<article class="product">${image}<div class="product-info"><span class="category">${escapeHtml(p.category||"Achadinho")}</span><h3>${escapeHtml(p.name||"Produto")}</h3>${p.description?`<p class="description">${escapeHtml(p.description)}</p>`:""}<div class="price">${money(p.price)}</div><a class="buy" href="${escapeAttr(p.link||"#")}" target="_blank" rel="noopener noreferrer sponsored">Ver oferta</a></div></article>`;
  }).join("");
  document.querySelector("#empty").hidden = shown.length>0;
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function escapeAttr(v){return escapeHtml(v);}
fetch(dataUrl).then(r=>{if(!r.ok)throw Error("Não foi possível carregar os produtos");return r.json()})
.then(data=>{allProducts=Array.isArray(data.products)?data.products:[];render()})
.catch(()=>{document.querySelector("#products").innerHTML='<p class="empty">Não foi possível carregar a vitrine agora.</p>';});
document.querySelector("#year").textContent=new Date().getFullYear();