import{createClient as d}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const l="https://mvzvgupvohptybfuxbww.supabase.co",u="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12enZndXB2b2hwdHliZnV4Ynd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Njg3NzEsImV4cCI6MjA4ODQ0NDc3MX0.hWDttnIga5z-DGaBb28wdY55NjOgiXCA1vz2eBvg5Ro",f=d(l,u);let c=[];document.addEventListener("DOMContentLoaded",()=>{p(),g(),m()});async function p(){const{data:r,error:e}=await f.from("products").select("*");if(e){console.error("Error loading products:",e);return}c=r||[],a(c)}function a(r){const e=document.getElementById("product-list");e&&(e.innerHTML="",r.forEach(n=>{const s=n.image||"https://via.placeholder.com/300",t=n.rating||4,o=`
      <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">

        <img src="${s}" 
        class="w-full h-40 object-cover rounded">

        <h3 class="text-lg font-bold mt-2">
        ${n.name}
        </h3>

        <p class="text-green-700 font-semibold">
        ₹${n.price}
        </p>

        <p class="text-yellow-500">
        ⭐ ${t}
        </p>

        <a href="product.html?id=${n.id}"
        class="text-blue-600 block mt-2">
        View Details
        </a>

        <button
        onclick='addToCart(${JSON.stringify(n)})'
        class="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700">
        Add to Cart
        </button>

      </div>
    `;e.insertAdjacentHTML("beforeend",o)}))}function g(){const r=document.getElementById("searchInput");r&&r.addEventListener("input",()=>{const e=r.value.toLowerCase(),n=c.filter(s=>s.name.toLowerCase().includes(e));a(n)})}function m(){const r=document.getElementById("categoryFilter");r&&r.addEventListener("change",()=>{const e=r.value,n=e?c.filter(s=>s.category===e):c;a(n)})}function h(r){let e=JSON.parse(localStorage.getItem("cart"))||[];e.push(r),localStorage.setItem("cart",JSON.stringify(e)),alert("Product added to cart")}window.addToCart=h;
