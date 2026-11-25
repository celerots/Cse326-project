'use strict';
document.documentElement.classList.add('js');

/* ===== 1. Sample data (all fictional) ===== */
const photo = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;
const TINTS = ['#9c6b4e', '#7b7a58', '#5e1a28', '#b89a72'];

const CATEGORIES = {
  'Food & Drink': '1509440159596-0249088772ff',
  'Fashion & Accessories': '1523381210434-271e8be1f52b',
  'Beauty & Wellness': '1556228720-195a672e8a03',
  'Art & Handmade': '1513364776144-60967b0f800f',
  'Home & Living': '1586023492125-27b2c045efd7',
  'Services': '1556761175-b413da4baf72'
};

// n=name c=category l=city d=description k=keywords m=image f=founder s=story o=offers h=handle g=hidden gem
const BUSINESSES = [
  {n:'Kaveri Bakehouse',c:'Food & Drink',l:'Pune',d:'Slow-fermented sourdough and eggless celebration cakes, baked in a home kitchen.',k:'bakery bread cake birthday sourdough eggless dessert',m:'1578985545062-69928b1d9587',f:'Kaveri Joshi',s:'I started baking for neighbours during a career break. Now we ship weekend boxes across the city.',o:['Sourdough loaves','Custom birthday cakes','Festival hampers'],h:'kaveribakehouse'},
  {n:'Chai & Chhaas',c:'Food & Drink',l:'Jaipur',d:'A tiny courtyard café serving clay-cup chai, cold coffee and Rajasthani snacks.',k:'coffee chai cafe snacks food tea breakfast',m:'1495474472287-4d71bcdd2085',f:'Meera Rathore',s:'I turned my grandmother’s courtyard into a café staffed entirely by local women.',o:['Clay-cup chai','Cold coffee','Bajra khichdi bowls'],h:'chaiandchhaas',g:1},
  {n:'Malabar Pantry',c:'Food & Drink',l:'Kochi',d:'Small-batch spice blends, jaggery and homestyle pickles packed by hand.',k:'spices pickle jaggery food gift pantry kerala',m:'1596040033229-a9821ebd058d',f:'Anitha Nair',s:'I buy from farms near Wayanad and pack every single order myself.',o:['Spice sampler box','Mango pickle','Jaggery blocks'],h:'malabarpantry',g:1},
  {n:'Saanjh Jewels',c:'Fashion & Accessories',l:'Jaipur',d:'Hand-set silver jewellery, made to order with your initials or birthstone.',k:'jewellery jewelry silver custom gift earrings necklace accessories fashion',m:'1515562141207-7a88fb7ce338',f:'Ishita Soni',s:'I trained with a family of silversmiths and now design custom pieces for first-time gifters.',o:['Custom initial pendants','Silver jhumkas','Gift-ready packaging'],h:'saanjhjewels'},
  {n:'Phulkari & Thread',c:'Fashion & Accessories',l:'Jalandhar',d:'Hand-embroidered phulkari dupattas, kurtas and tote bags from village artisans.',k:'clothing clothes phulkari embroidery dupatta kurta fashion punjab',m:'1523381210434-271e8be1f52b',f:'Harleen Kaur',s:'Twelve embroiderers work with me, and each one is credited on the garment tag.',o:['Phulkari dupattas','Embroidered totes','Made-to-measure kurtas'],h:'phulkariandthread',g:1},
  {n:'Rootbare Skincare',c:'Beauty & Wellness',l:'Bengaluru',d:'Fragrance-free skincare for sensitive skin, formulated with a cosmetic chemist.',k:'skincare skin face serum moisturiser beauty sensitive',m:'1556228720-195a672e8a03',f:'Divya Menon',s:'I couldn’t find products my skin tolerated, so I made a short, honest range.',o:['Barrier cream','Vitamin C serum','Gentle cleanser'],h:'rootbare'},
  {n:'Ritu’s Ayurveda Studio',c:'Beauty & Wellness',l:'Dehradun',d:'Herbal hair oils and therapeutic massages from family Ayurvedic recipes.',k:'wellness ayurveda massage hair oil spa herbal beauty',m:'1544161515-4ab6ce6db874',f:'Ritu Sharma',s:'My mother’s oil recipes now reach customers who have never visited the hills.',o:['Bhringraj hair oil','Abhyanga massage','Herbal face packs'],h:'rituayurveda',g:1},
  {n:'Clay Mandala',c:'Art & Handmade',l:'Bhopal',d:'Wheel-thrown stoneware mugs and planters, glazed in small batches.',k:'pottery ceramic mug handmade gift custom clay',m:'1565193566173-7a0ee3dbe261',f:'Neha Verma',s:'Every mug is thrown, trimmed and glazed by me, so no two are the same.',o:['Stoneware mugs','Custom name planters','Pottery workshops'],h:'claymandala'},
  {n:'Madhubani Moments',c:'Art & Handmade',l:'Patna',d:'Custom Madhubani paintings and hand-painted gifts for weddings and birthdays.',k:'art painting custom madhubani gift handmade wedding birthday',m:'1513364776144-60967b0f800f',f:'Sunita Devi',s:'I learned this art from my aunts and now paint commissions for families abroad.',o:['Custom portraits','Hand-painted trays','Wedding gifts'],h:'madhubanimoments'},
  {n:'Giftwalli',c:'Art & Handmade',l:'Bengaluru',d:'Build-your-own handmade gift hampers with personal notes from local makers.',k:'gift hamper handmade birthday custom present',m:'1513885535751-8b9238bd345a',f:'Pooja Iyer',s:'I wanted gifting to feel personal, so every hamper includes a handwritten note.',o:['Birthday hampers','Corporate gifting','Custom note cards'],h:'giftwalli'},
  {n:'Kantha Home',c:'Home & Living',l:'Kolkata',d:'Reversible kantha quilts, cushion covers and throws stitched by a women’s cooperative.',k:'home decor quilt cushion textile bedding kantha',m:'1522771739844-6a9f6d5f14af',f:'Rupa Das',s:'The cooperative started with six women and now has forty members.',o:['Kantha quilts','Cushion covers','Table linen'],h:'kanthahome'},
  {n:'Tulsi & Terrazzo',c:'Home & Living',l:'Ahmedabad',d:'Handmade terrazzo planters, diyas and desk decor in small, limited runs.',k:'home decor planters plants diya terrazzo',m:'1485955900006-10f4d324d411',f:'Kinjal Shah',s:'I cast leftover marble chips into planters that are different every time.',o:['Terrazzo planters','Festive diyas','Desk organisers'],h:'tulsiterrazzo',g:1},
  {n:'Lekha Design Studio',c:'Services',l:'Delhi',d:'Logos, packaging and Instagram kits for first-time small business owners.',k:'design branding logo packaging service freelance marketing',m:'1556761175-b413da4baf72',f:'Aanya Kapoor',s:'I design for founders who have a great product and no brand yet.',o:['Logo and identity','Packaging design','Instagram starter kit'],h:'lekhadesign'},
  {n:'Pehchaan Books & Tax',c:'Services',l:'Chandigarh',d:'Simple bookkeeping, GST filing and registration help for home-based businesses.',k:'accounting tax gst bookkeeping service finance registration',m:'1554224155-6726b3ff858f',f:'Simran Gill',s:'I explain the paperwork in plain language so founders can stay focused on the work.',o:['Monthly bookkeeping','GST filing','Business registration'],h:'pehchaanbooks'},
  {n:'Surmandal Music Classes',c:'Services',l:'Jalandhar',d:'Beginner-friendly harmonium, vocal and tabla classes, online or at home.',k:'music classes lessons tutor singing harmonium teaching',m:'1511379938547-c1f69419868d',f:'Jasleen Arora',s:'I teach adults who always wanted to learn but never felt it was too late.',o:['Harmonium lessons','Vocal training','Tabla basics'],h:'surmandal'}
];
BUSINESSES.forEach((b, i) => { b.id = i; });

const CHIPS = [['Handmade gifts', 'handmade gift'], ['Coffee & food', 'coffee food'], ['Custom creations', 'custom'], ['Beauty & wellness', 'beauty wellness']];

/* ===== 2. Helpers ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const img = (id, alt = '') => `<img src="${photo(id)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">`;

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ===== 3. Favourites (saved in localStorage) ===== */
let favs = new Set();
try { favs = new Set(JSON.parse(localStorage.getItem('herfound-favs') || '[]')); } catch (e) { /* storage blocked: favourites last for this visit only */ }

function toggleFav(id) {
  favs.has(id) ? favs.delete(id) : favs.add(id);
  try { localStorage.setItem('herfound-favs', JSON.stringify([...favs])); } catch (e) { /* ignore */ }
  $$(`[data-fav="${id}"]`).forEach(b => {
    b.setAttribute('aria-pressed', favs.has(id));
    if (b.classList.contains('inline')) b.textContent = favs.has(id) ? '♥ Saved' : '♡ Save business';
  });
  toast(favs.has(id) ? 'Saved to your favourites' : 'Removed from favourites');
}
const favBtn = (id, cls = '') =>
  `<button type="button" class="fav ${cls}" data-fav="${id}" aria-pressed="${favs.has(id)}" aria-label="Save ${esc(BUSINESSES[id].n)}">${cls ? (favs.has(id) ? '♥ Saved' : '♡ Save business') : '♥'}</button>`;

/* ===== 4. Search (demo matching, no AI or backend) ===== */
const STOP = new Set('a an the for and or of in on to me my i want need looking find some near with is are get'.split(' '));
const SYNONYMS = {jewelry:'jewellery', clothes:'clothing', gifts:'gift', cafe:'coffee', decoration:'decor', cakes:'cake'};
const FIELDS = [['n', 4, 'the business name'], ['c', 3, 'its category'], ['k', 3, 'its keywords'], ['l', 3, 'its location'], ['d', 2, 'its description']];

function searchTerms(q) {
  return q.toLowerCase().split(/[^a-z]+/).filter(w => w && !STOP.has(w))
    .map(w => SYNONYMS[w] || w)
    .map(w => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w));
}

function scoreBusiness(b, terms) {
  let score = 0;
  const reasons = [];
  terms.forEach(t => {
    const hits = FIELDS.filter(([key]) => b[key].toLowerCase().includes(t));
    hits.forEach(([, weight]) => { score += weight; });
    if (hits.length) reasons.push(`“${t}” appears in ${hits[0][2]}`);
  });
  return {score, why: reasons.slice(0, 2).join('; ')};
}

const state = {q: '', cat: ''};

function getResults() {
  const terms = searchTerms(state.q);
  return BUSINESSES
    .map(b => ({b, ...(terms.length ? scoreBusiness(b, terms) : {score: 0, why: ''})}))
    .filter(r => (!state.cat || r.b.c === state.cat) && (!terms.length || r.score > 0))
    .sort((a, z) => z.score - a.score || a.b.id - z.b.id);
}

/* ===== 5. Rendering ===== */
function cardHTML({b, why}, pos) {
  return `<article class="card ${pos % 5 < 2 ? 'wide' : ''}">
    <div class="ph" style="--t:${TINTS[b.id % 4]}">${img(b.m, b.n)}<span class="badge">✓ Verified (demo)</span>${favBtn(b.id)}</div>
    <div class="card-body">
      <p class="meta">${b.l}, ${b.c}</p>
      <h3><button type="button" data-open="${b.id}">${esc(b.n)}</button></h3>
      <p>${esc(b.d)}</p>
      ${why ? `<p class="why">Why it matched: ${esc(why)}</p>` : ''}
    </div></article>`;
}

function renderDiscover() {
  const results = getResults();
  $('#grid').innerHTML = results.map(cardHTML).join('');
  $('#empty').hidden = results.length > 0;
  const filtered = state.q || state.cat;
  $('#resetTop').hidden = !filtered;
  let msg = `${results.length} sample businesses`;
  if (state.q) msg = `${results.length} result${results.length === 1 ? '' : 's'} for “${state.q}”`;
  if (state.cat) msg += ` in ${state.cat}`;
  $('#status').textContent = msg;
  $$('.cat').forEach(c => c.setAttribute('aria-pressed', c.dataset.cat === state.cat));
}

function renderStatic() {
  $('#chips').innerHTML = CHIPS.map(([label, q]) => `<button type="button" data-chip="${q}">${label}</button>`).join('');
  $('#cats').innerHTML = Object.entries(CATEGORIES).map(([name, id], i) =>
    `<button type="button" class="cat" style="--t:${TINTS[i % 4]}" data-cat="${esc(name)}" aria-pressed="false">${img(id)}<span>${name}</span></button>`).join('');
  $('#gemList').innerHTML = BUSINESSES.filter(b => b.g).map(b =>
    `<li><button type="button" class="gem" data-open="${b.id}"><span><strong>${esc(b.n)}</strong><em>${b.l}, ${b.c}</em><span>${esc(b.d)}</span></span><span class="ph">${img(b.m, '')}</span></button></li>`).join('');
  $('#rCat').innerHTML = '<option value="">Choose a category</option>' + Object.keys(CATEGORIES).map(c => `<option>${c}</option>`).join('');
}

/* ===== 6. Modals ===== */
let lastFocus = null;
function openModal(el) {
  lastFocus = document.activeElement;
  el.hidden = false;
  document.body.style.overflow = 'hidden';
  (el.querySelector('input,.close') || el).focus();
}
function closeModal(el) {
  el.hidden = true;
  if ($$('.modal').every(m => m.hidden)) document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

function openProfile(id) {
  const b = BUSINESSES[id];
  $('#pBody').innerHTML = `
    <div class="cover ph" style="--t:${TINTS[id % 4]}">${img(b.m, b.n)}</div>
    <div class="p-grid">
      <div>
        <p class="meta">${b.c}</p>
        <h2 id="pTitle">${esc(b.n)} <span class="badge">✓ Verified (demo)</span></h2>
        <p class="story">“${esc(b.s)}”<cite>${esc(b.f)}, founder</cite></p>
        <h3>Products and services</h3>
        <ul>${b.o.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      </div>
      <aside class="p-side">
        <dl>
          <dt>Location</dt><dd>${b.l}, India</dd>
          <dt>Contact</dt><dd id="contactBox">Tap the button below to see details.</dd>
          <dt>Online</dt><dd><a href="#" data-demo>@${b.h} on Instagram</a><br><a href="#" data-demo>${b.h}.example.com</a></dd>
        </dl>
        <div class="p-actions"><button type="button" class="btn" data-contact="${id}">Contact ${esc(b.f.split(' ')[0])}</button>${favBtn(id, 'inline')}</div>
      </aside>
    </div>`;
  openModal($('#profile'));
}

function showContact(id) {
  const b = BUSINESSES[id];
  const email = `hello@${b.h}.example.com`;
  $('#contactBox').innerHTML = `<div class="reveal-box">${email}<br>+91 90000 000${String(id).padStart(2, '0')}<button type="button" class="text-btn" data-copy="${email}">Copy email</button></div>`;
}

function copyText(text) {
  const done = () => toast('Email copied');
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => toast('Copy failed. Select the text instead.'));
  else toast('Copy is not available here. Select the text instead.');
}

/* ===== 7. Registration form ===== */
const RULES = {
  rName: v => v.trim().length >= 2 || 'Enter your business name.',
  rFounder: v => v.trim().length >= 2 || 'Enter the founder’s name.',
  rCat: v => !!v || 'Choose a category.',
  rLoc: v => v.trim().length >= 2 || 'Enter a city, for example “Pune, Maharashtra”.',
  rDesc: v => v.trim().length >= 20 || 'Write at least 20 characters about what you offer.',
  rLink: v => /^(@[\w.]{2,}|https?:\/\/\S+\.\S+)$/.test(v.trim()) || 'Use an @handle or a full link starting with http.'
};

function setError(id, msg) {
  $(`#${id}-err`).textContent = msg || '';
  $(`#${id}`).setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function openRegister() {
  $('#regForm').reset();
  Object.keys(RULES).forEach(id => setError(id, ''));
  $('#regForm').hidden = false;
  $('#regDone').hidden = true;
  openModal($('#register'));
}

function submitRegister(e) {
  e.preventDefault();
  let firstBad = null;
  Object.entries(RULES).forEach(([id, rule]) => {
    const res = rule($(`#${id}`).value);
    setError(id, res === true ? '' : res);
    if (res !== true && !firstBad) firstBad = id;
  });
  if (firstBad) { $(`#${firstBad}`).focus(); return; }
  $('#doneName').textContent = $('#rName').value.trim();
  $('#doneRef').textContent = 'HF-' + Math.floor(1000 + Math.random() * 9000);
  $('#regForm').hidden = true;
  $('#regDone').hidden = false;
}

/* ===== 8. Actions ===== */
function runSearch(q) {
  state.q = q.trim();
  $('#q').value = state.q;
  renderDiscover();
  $('#discover').scrollIntoView();
}

function resetFilters() {
  state.q = ''; state.cat = '';
  $('#q').value = '';
  renderDiscover();
}

document.addEventListener('click', e => {
  const modal = e.target.classList.contains('modal') ? e.target : null;
  if (modal) return closeModal(modal);
  const t = e.target.closest('[data-open],[data-fav],[data-cat],[data-chip],[data-contact],[data-copy],[data-demo],[data-register],[data-close],[data-reset]');
  if (!t) return;
  const d = t.dataset;
  if ('demo' in d) { e.preventDefault(); toast('Sample link. This business is fictional.'); }
  else if ('open' in d) openProfile(+d.open);
  else if ('fav' in d) toggleFav(+d.fav);
  else if ('cat' in d) { state.cat = state.cat === d.cat ? '' : d.cat; renderDiscover(); $('#discover').scrollIntoView(); }
  else if ('chip' in d) runSearch(d.chip);
  else if ('contact' in d) showContact(+d.contact);
  else if ('copy' in d) copyText(d.copy);
  else if ('register' in d) openRegister();
  else if ('close' in d) closeModal(t.closest('.modal'));
  else if ('reset' in d) resetFilters();
});

$('#searchForm').addEventListener('submit', e => { e.preventDefault(); runSearch($('#q').value); });
$('#q').addEventListener('input', e => { if (!e.target.value) { state.q = ''; renderDiscover(); } });
$('#regForm').addEventListener('submit', submitRegister);
$('#regForm').addEventListener('input', e => { if (RULES[e.target.id]) setError(e.target.id, ''); });

$('#navSearch').addEventListener('click', () => {
  closeMenu();
  window.scrollTo({top: 0});
  $('#q').focus({preventScroll: true});
});

const toggleBtn = $('.nav-toggle');
const menu = $('#menu');
function closeMenu() { menu.classList.remove('open'); toggleBtn.setAttribute('aria-expanded', 'false'); }
toggleBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggleBtn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const open = $$('.modal').find(m => !m.hidden);
  if (open) closeModal(open); else closeMenu();
});

/* ===== 9. Start ===== */
renderStatic();
renderDiscover();

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), {threshold: 0.12});
  $$('.reveal').forEach(el => io.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('in'));
}
