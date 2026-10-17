const SOURCES = {
  wstg: { name: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/projects/web-security-testing-guide' },
  nmap: { name: 'Nmap Reference Guide', url: 'https://nmap.org/book/man.html' },
  'nmap-port': { name: 'Nmap Port Scanning Techniques', url: 'https://nmap.org/book/man-port-scanning-techniques.html' },
  'nmap-nse': { name: 'Nmap NSE Usage and Examples', url: 'https://nmap.org/book/nse-usage.html' },
  wireshark: { name: 'Wireshark User’s Guide', url: 'https://www.wireshark.org/docs/wsug_html_chunked/' },
  juice: { name: 'OWASP Juice Shop', url: 'https://owasp.org/projects/juice-shop' },
};

const articles = [
  {
    slug: 'planning-scoping', title: 'Planing & Scoping', category: 'ভিত্তি', phase: 'reconnaissance', level: 'শুরু', time: '১২ মিনিট',
    summary: 'ইথিক্যালি পেনটেস্টিং এর ক্ষেত্রে টার্গেট ওয়েব সাইট এর কোন কোন বিষয়গুলো আপনি টেস্ট করতে পারবেন এবং কোনগুলো পারবেন না তা সম্পর্কে জানা এবং প্ল্যান করা ই এই ধাপের কাজ। সহজ ভাষায়, কোনো ওয়েবসাইটের নিরাপত্তা পরীক্ষা শুরু করার আগে কী পরীক্ষা করবেন, কেন করবেন, কোথায় করবেন এবং টেস্টিং এ আপনার সীমা কতটুকু — এসব ঠিক করাই Planning & Scoping।', tags: [],
    keywords: 'planning planing scoping scope target identification authorization in-scope out-of-scope testing objectives testing window rules of engagement reporting communication NDA emergency contact পরিকল্পনা স্কোপ অনুমতি লক্ষ্য পরীক্ষার সীমা',
    image: '/assets/image-4.webp', imageAlt: 'নিরাপদ পেনটেস্টের পরিকল্পনা ও স্কোপ নির্ধারণ', imageLabel: 'Planing & Scoping',
    refs: [],
    sections: [
      { heading: 'Planing & Scoping', paragraphs: ['ইথিক্যালি পেনটেস্টিং এর ক্ষেত্রে টার্গেট ওয়েব সাইট এর কোন কোন বিষয়গুলো আপনি টেস্ট করতে পারবেন এবং কোনগুলো পারবেন না তা সম্পর্কে জানা এবং প্ল্যান করা ই এই ধাপের কাজ। সহজ ভাষায়, কোনো ওয়েবসাইটের নিরাপত্তা পরীক্ষা শুরু করার আগে কী পরীক্ষা করবেন, কেন করবেন, কোথায় করবেন এবং টেস্টিং এ আপনার সীমা কতটুকু — এসব ঠিক করাই Planning & Scoping।', 'মনে করুন, একটি কোম্পানি আপনাকে তাদের ওয়েবসাইট পরীক্ষা করার অনুমতি দিয়েছে। পরীক্ষা শুরুর আগে আপনাকে জানতে হবে:', 'কোন ওয়েবসাইট/ সাব ওয়েবসাইট পরীক্ষা করতে পারবেন?', 'কোন কোন নিরাপত্তা দুর্বলতা খুঁজবেন?', 'কোন এটাকগুলো করা অনুমোদিত?', 'কখন পরীক্ষা করবে?', 'কোনো সমস্যা হলে কাকে জানাবেন?', 'এই বিষয়গুলো পরিষ্কার না করে পরীক্ষা শুরু করা ইথিক্যাল নয়।', 'Planning — পরিকল্পনাঃ', 'কীভাবে পরীক্ষা পরিচালনা করবেন, কোন টুল ব্যবহার করবেন, কখন পরীক্ষা করবেন এবং ফলাফল কীভাবে রিপোর্ট করবেন সেগুলো নির্ধারণ করাই Planing।', 'Scoping — পরীক্ষার সীমা নির্ধারণঃ', 'কোন ডোমেইন, সাবডোমেইন, API বা ফিচার পরীক্ষা করা যাবে এবং কোনগুলো পরীক্ষা করা যাবে না—সেটি নির্ধারণ করা Scoping বা পরীক্ষার সীমা নির্ধারণ।Scoping-এর ৭টি গুরুত্বপূর্ণ বিষয় আছে।'] },
      { heading: 'Scoping-এর ৭টি গুরুত্বপূর্ণ বিষয়সমূহ', paragraphs: ['১. Target Identification:\nকোন ডোমেইন বা সাবডোমেইন এ আপনি টেস্ট বা এটাক করতে পারবেন এটা নিশ্চিত করতে হবে, যেমনঃ https://example.com,https://admin.example.com।', '২. Authorization:', 'যেকোনো ওয়েবসাইট টেস্ট বা অ্যাটাক এর জন্য ওয়েবসাইটের মালিক বা অথরিটির স্পষ্ট অনুমতি নিতে হবে। কোনো বাগ বাউন্টি প্লার্টফরমে যেকোনো ওয়েবসাইট দেখা যায় বলেই সেটি বা তার সবগুলো ডোমেইন বা সাবডোমেইন পরীক্ষা করার অনুমতি আছে এমন নয়।', '৩. In-Scope ও Out-of-Scope:', 'In-Scope হলো অনুমোদিত ডোমেইন বা সাবডোমেইন। Out-of-Scope হলো যেগুলো পরীক্ষা করা নিষিদ্ধ বা অনুমোদন নেই।', '৪. Testing Objectives:', 'কী কী দূর্বলতা খুঁজবেন তা ঠিক করা। যেমনঃ authentication সমস্যা, access control দুর্বলতা, SQL injection বা XSS ইত্যাদি।', '৫. Testing Window:', 'কখন পরীক্ষা করা যাবে তা ওয়েবসাইট অথরিটি থেকে নিশ্চিত করে নিবেন। ওয়েবসাইটে ব্যস্ত সময় অর্থাৎ যখন ওয়েবসাইটে ব্যবহারকারির ট্রাফিক বেশি থাকে ওই সময়টি বাদ দিয়ে পরীক্ষা করতে হবে, যাতে সার্ভার ধীর হওয়া বা ব্যবহারকারীদের সমস্যা না হয়। যেমনঃ রাত ১২টার পর  https://example.com ওয়েবসাইটের ব্যবহারকারী কমে যায় তারপর টেস্ট করাই ভালো।', '৬. Rules of Engagement:', 'কোন টুল বা পদ্ধতি ব্যবহার করা যাবে, কতটা পরীক্ষা করা যাবে এবং কোন কাজগুলো নিষিদ্ধ তা নিশ্চিত হওয়া।যেমনঃ Nmap ব্যবহার করা যাবে কিন্তু DoS অ্যাটাক বা ডেটা মুছে ফেলা যাবে না।', '৭. Reporting & Communication:', 'দুর্বলতা পেলে প্রমাণসমূহের একটি রিপোর্ট তৈরী করতে হবে। রিপোর্টটি কাকে জানাবেন এবং কীভাবে চূড়ান্ত রিপোর্ট তৈরি করে জমা দিবেন দিবেন তা নিশ্চিত করতে হবে।', 'অতিরিক্তঃ Planing & Scoping', '১. NDA (Non-Disclosure Agreement): ৭টি পয়েন্টের পাশাপাশি ক্লায়েন্টের গোপনীয়তা রক্ষায় একটি চুক্তি সই করতে হয়, যাকে NDA বলে।', '২. Emergency Contact Point: টেস্টিং করার সময় ভুলবশত যদি সাইট ডাউন বা ক্র্যাশ করে, তবে তাৎক্ষণিকভাবে কাকে কল করতে হবে (Emergency Contact Number) তা পূর্বে থেকেই নির্ধারণ করে নিতে হবে।'] },
    ],
  }
];;

const ARTICLE_EDITS_KEY = 'cyberpath-article-edits-v1';
const EDIT_MODE_KEY = 'cyberpath-edit-mode-v1';
const originalArticles = new Map(articles.map((article) => [article.slug, JSON.parse(JSON.stringify(article))]));
let articleEdits = {};
let editMode = false;

try {
  const storedEdits = JSON.parse(localStorage.getItem(ARTICLE_EDITS_KEY) || '{}');
  if (storedEdits && typeof storedEdits === 'object' && !Array.isArray(storedEdits)) articleEdits = storedEdits;
  editMode = localStorage.getItem(EDIT_MODE_KEY) === 'on';
} catch (error) {
  articleEdits = {};
  editMode = false;
}

function applyArticleEdit(article, edit) {
  if (!edit || typeof edit !== 'object') return;
  ['title', 'summary', 'imageAlt', 'imageLabel'].forEach((key) => {
    if (typeof edit[key] === 'string') article[key] = edit[key];
  });
  if (typeof edit.image === 'string' && (/^\/assets\/[\w./-]+$/.test(edit.image) || /^data:image\/(?:webp|png|jpeg|gif);base64,/.test(edit.image))) {
    article.image = edit.image;
  }
  if (Array.isArray(edit.sections) && edit.sections.length === article.sections.length) {
    article.sections = article.sections.map((section, index) => {
      const saved = edit.sections[index];
      if (!saved || typeof saved !== 'object') return section;
      const updated = { ...section };
      if (typeof saved.heading === 'string') updated.heading = saved.heading;
      if (Array.isArray(saved.paragraphs) && saved.paragraphs.every((value) => typeof value === 'string')) updated.paragraphs = saved.paragraphs;
      if (Array.isArray(saved.bullets) && saved.bullets.every((value) => typeof value === 'string')) updated.bullets = saved.bullets;
      ['code', 'output', 'note'].forEach((key) => {
        if (typeof saved[key] === 'string') updated[key] = saved[key];
      });
      return updated;
    });
  }
}

articles.forEach((article) => applyArticleEdit(article, articleEdits[article.slug]));

const articleGrid = document.getElementById('article-grid');
const searchInput = document.getElementById('site-search');
const levelFilter = document.getElementById('level-filter');
const categoryFilters = document.getElementById('category-filters');
const emptyState = document.getElementById('empty-state');
const homeView = document.getElementById('home-view');
const articleView = document.getElementById('article-view');
const articleContent = document.getElementById('article-content');
const toast = document.getElementById('toast');
const editorModeToggle = document.getElementById('editor-mode-toggle');
const editorTools = document.getElementById('editor-tools');
const editorDialog = document.getElementById('article-editor-dialog');
const editorForm = document.getElementById('article-editor-form');
const editorFields = document.getElementById('article-editor-fields');
let activeCategory = 'all';
let activePhase = null;
let toastTimer;
let editingSlug = null;
let pendingEditorImage = null;

let completed = new Set();
try {
  completed = new Set(JSON.parse(localStorage.getItem('cyberpath-completed') || '[]'));
} catch (error) {
  completed = new Set();
}

const bnNumber = (number) => new Intl.NumberFormat('bn-BD').format(number);
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const STAGES = [
  { id: 'reconnaissance', number: '০১', title: 'Reconnaissance', short: '০১ · Recon' },
  { id: 'scanning', number: '০২', title: 'Scanning & Enumeration', short: '০২ · Scan / Enum' },
  { id: 'assessment', number: '০৩', title: 'Vulnerability Assessment', short: '০৩ · Assessment' },
  { id: 'exploitation', number: '০৪', title: 'Exploitation', short: '০৪ · Exploit' },
  { id: 'impact', number: '০৫', title: 'Impact Analysis', short: '০৫ · Impact' },
  { id: 'reporting', number: '০৬', title: 'Reporting', short: '০৬ · Report' },
  { id: 'remediation', number: '০৭', title: 'Remediation & Retesting', short: '০৭ · Retest' },
];

const PRACTICAL_GUIDES = {
  'network-foundations': {
    focus: 'নিজের মেশিনের interface, loopback IP, listening port এবং localhost-এর HTTP response খুঁজুন।',
    why: 'এগুলো baseline দেয়—scan-এর ফল নিজের lab-এ ব্যাখ্যা করা যায় এবং ভুল target ধরে ফেলার ঝুঁকি কমে।',
    next: [
      { when: 'লোকাল interface ও service তালিকা পেয়েছেন', action: 'এখন লিখিত অনুমতি, নির্দিষ্ট asset ও পরীক্ষার সীমা ঠিক করুন।', slug: 'scope-and-safety' },
      { when: 'নিজের training app-এ response পাচ্ছেন', action: 'scope নিশ্চিত করে অনুমোদিত asset inventory তৈরি করুন।', slug: 'reconnaissance' },
    ],
  },
  'scope-and-safety': {
    focus: 'লিখিত অনুমতি, in-scope ও out-of-scope asset, সময়সীমা, অনুমোদিত কৌশল এবং stop condition খুঁজে নিন।',
    why: 'এই সীমাগুলো না জানলে অনিচ্ছায় তৃতীয় পক্ষের service, বাস্তব account বা সংবেদনশীল data পরীক্ষা হয়ে যেতে পারে।',
    next: [
      { when: 'অনুমতি ও scope লিখিতভাবে নিশ্চিত', action: 'শুধু তালিকাভুক্ত asset নিয়ে Reconnaissance শুরু করুন।', slug: 'reconnaissance' },
      { when: 'scope বা অনুমতি অসম্পূর্ণ', action: 'কোনো test চালাবেন না; দায়িত্বপ্রাপ্ত owner-এর কাছে লিখিতভাবে নিশ্চিত করুন।' },
    ],
  },
  reconnaissance: {
    focus: 'অনুমোদিত hostname, URL, IP, app/version hint, route এবং প্রতিটি তথ্যের উৎস নথিবদ্ধ করুন।',
    why: 'সঠিক asset inventory থাকলে পরের scan নির্দিষ্ট scope-এ থাকে; ভুল বা অজানা asset বাদ দেওয়া যায়।',
    next: [
      { when: 'asset ownership ও scope নিশ্চিত', action: 'নিজের lab-এ Nmap দিয়ে সীমিত port check, তারপর service enumeration করুন।', slug: 'nmap-local-scan' },
      { when: 'কোনো asset-এর অনুমতি বা মালিকানা অস্পষ্ট', action: 'তাকে target করবেন না; scope owner-এর কাছ থেকে অনুমতি নিশ্চিত করুন।', slug: 'scope-and-safety' },
    ],
  },
  'nmap-local-scan': {
    focus: 'নিজের `127.0.0.1` lab-এ target ঠিক আছে কি না, একটি নির্বাচিত TCP port-এর state, service/version hint এবং local report output খুঁজুন।',
    why: 'Nmap-এর target syntax, `-sL`/`-sn`/`-Pn` পার্থক্য, port state ও `-sV`-এর probing অর্থ বুঝলে scan scope নিয়ন্ত্রণে থাকে; open port বা version hint একা vulnerability প্রমাণ করে না।',
    next: [
      { when: '`open` এবং প্রত্যাশিত local service সাড়া দেয়', action: 'Command, Nmap version ও local report নথিবদ্ধ করে অনুমোদিত service/HTTP response inventory করুন।', slug: 'enumeration' },
      { when: '`closed` বা service নেই', action: 'শুধু নিজের যন্ত্রে app/listener ও নির্ধারিত port মিলিয়ে দেখুন; target range বাড়াবেন না।', slug: 'network-foundations' },
      { when: 'Service/version hint সম্ভাব্য concern দেখায়', action: 'Banner-কে প্রমাণ ধরে নেবেন না; অনুমোদিত lab-এ non-destructive evidence দিয়ে hypothesis যাচাই করুন।', slug: 'vulnerability-assessment' },
      { when: '`filtered`, `open|filtered` বা অপ্রত্যাশিত host', action: 'ফলকে অনিশ্চিত হিসেবে লিখুন; evasion বা bypass নয়—scope/lab configuration যাচাই করুন এবং প্রয়োজনে থামুন।', slug: 'scope-and-safety' },
    ],
  },
  enumeration: {
    focus: 'অনুমোদিত service-এর status code, response header, version hint ও আগে থেকে জানা route দেখুন।',
    why: 'যাচাইকৃত response ও route থেকে কোন security control assessment করা দরকার তা বাছা যায়।',
    next: [
      { when: 'কোনো response বা route security concern দেখায়', action: 'একটি non-destructive check দিয়ে vulnerability hypothesis যাচাই করুন।', slug: 'vulnerability-assessment' },
      { when: 'route scope-এর বাইরে বা অপ্রত্যাশিত host-এ যায়', action: 'সঙ্গে সঙ্গে থামুন এবং scope owner-কে জানান।', slug: 'scope-and-safety' },
    ],
  },
  'packet-analysis': {
    focus: 'নিজের loopback capture-এ source/destination, protocol, সময় এবং test app-এর request/response দেখুন।',
    why: 'Packet evidence connection-এর আচরণ বুঝতে সাহায্য করে; capture-এ cookie বা ব্যক্তিগত data থাকতে পারে, তাই সীমা জরুরি।',
    next: [
      { when: 'নিজের test request-এর স্বাভাবিক trace পেয়েছেন', action: 'সংশ্লিষ্ট web control-টি অনুমোদিত lab-এ assess করুন।', slug: 'vulnerability-assessment' },
      { when: 'capture-এ secret বা personal data দেখা গেছে', action: 'আর বিশ্লেষণ নয়—থামুন, evidence redact করুন এবং retention rule মেনে capture মুছুন।', slug: 'pentest-reporting' },
    ],
  },
  'vulnerability-assessment': {
    focus: 'Scanner alert বা security hypothesis-কে scope-এর মধ্যে ছোট, পুনরাবৃত্তিযোগ্য evidence দিয়ে যাচাই করুন।',
    why: 'এই যাচাই false positive কমায় এবং অনুমানকে confirmed finding হিসেবে report করা ঠেকায়।',
    next: [
      { when: 'finding lab-এ নিশ্চিত এবং scope-এ পরের validation অনুমোদিত', action: 'শুধু বিচ্ছিন্ন training lab-এ সীমিত proof দিন; অন্য ক্ষেত্রে exploit ছাড়াই report করুন।', slug: 'web-exploitation-lab' },
      { when: 'finding পুনরাবৃত্তি হয়নি', action: 'confirmed দাবি করবেন না; scope-এর মধ্যে আরও evidence নিন বা ফলকে inconclusive লিখুন।', slug: 'enumeration' },
    ],
  },
  'password-hashes': {
    focus: 'নিজের তৈরি synthetic hash, hash format এবং password-storage-এ salt/work-factor ব্যবহারের প্রমাণ দেখুন।',
    why: 'Hash সাধারণত decode হয় না; অনুমোদিত offline audit password-storage ঝুঁকি বোঝায়, credential চুরি বা online login test নয়।',
    next: [
      { when: 'নিজের toy hash প্রস্তুত', action: 'শুধু tiny local wordlist-এ offline recovery ধারণা যাচাই করুন।', slug: 'controlled-bruteforce' },
      { when: 'storage design-এ দুর্বলতা বা অনিশ্চয়তা', action: 'secure password hashing ও regression retest-এর প্রস্তাব লিখুন।', slug: 'remediation-retesting' },
    ],
  },
  'controlled-bruteforce': {
    focus: 'নিজের বানানো hash-এর সঙ্গে কেবল ক্ষুদ্র local candidate list-এর match দেখুন—কোনো online account নয়।',
    why: 'ছোট search-space দুর্বল secret-এর ঝুঁকি দেখায়; match না পাওয়া শক্ত password-এর প্রমাণ নয়।',
    next: [
      { when: 'toy candidate match হয়েছে', action: 'নিরাপদ storage, MFA ও online rate-limit প্রতিরক্ষা নিয়ে remediation লিখুন।', slug: 'remediation-retesting' },
      { when: 'match হয়নি', action: 'এটিকে strength proof বলবেন না; password-storage control ও policy review করুন।', slug: 'remediation-retesting' },
    ],
  },
  'web-exploitation-lab': {
    focus: 'নিজের `127.0.0.1` Juice Shop lab-এ challenge-এর প্রত্যাশিত harmless behavior ও minimal proof দেখুন।',
    why: 'বিচ্ছিন্ন lab-এ সীমিত validation শেখায়; বাস্তব account/data বা অন্য host-এ এগোনোর দরকার হয় না।',
    next: [
      { when: 'শুধু training challenge-এর প্রমাণ মিলেছে', action: 'synthetic data দিয়ে সম্ভাব্য impact ও observed fact আলাদা করে লিখুন।', slug: 'post-exploitation-impact' },
      { when: 'অপ্রত্যাশিত host বা personal data দেখা গেছে', action: 'তাৎক্ষণিকভাবে থামুন; data আর খুলবেন/কপি করবেন না এবং owner-কে জানান।', slug: 'pentest-reporting' },
    ],
  },
  'post-exploitation-impact': {
    focus: 'Synthetic account, affected role, observed result, potential business impact ও confidence level আলাদা করুন।',
    why: 'এতে ঝুঁকি বোঝানো যায়, কিন্তু বাস্তব data exfiltration বা production-এ প্রভাব ঘটেছে—এমন ভুল দাবি হয় না।',
    next: [
      { when: 'ন্যূনতম প্রমাণে impact matrix পূর্ণ', action: 'observed ও potential impact আলাদা রেখে finding report করুন।', slug: 'pentest-reporting' },
      { when: 'scope-এর বাইরে কিছু দেখা গেছে', action: 'আর কোনো post-exploitation নয়—থামুন এবং contact-কে জানান।', slug: 'scope-and-safety' },
    ],
  },
  'pentest-reporting': {
    focus: 'Asset/scope, reproduction steps, evidence, severity rationale, observed বনাম potential impact ও recommendation খুঁজে নিন।',
    why: 'পরিষ্কার evidence ও uncertainty developer-কে সঠিক fix বেছে নিতে এবং reader-কে risk বুঝতে সাহায্য করে।',
    next: [
      { when: 'finding, evidence ও owner recommendation প্রস্তুত', action: 'root cause fix এবং একই scope-এ অনুমোদিত retest পরিকল্পনা করুন।', slug: 'remediation-retesting' },
      { when: 'evidence-এ secret বা personal data আছে', action: 'report শেয়ারের আগে redact করুন এবং অনুমোদিত retention rule মানুন।', slug: 'remediation-retesting' },
    ],
  },
  'remediation-retesting': {
    focus: 'Fix-এর root cause, একই request/role/environment-এ before/after behavior এবং residual risk যাচাই করুন।',
    why: 'একই শর্তে retest না করলে fix সত্যিই হয়েছে কি না বা ফল কতখানি scope-এ প্রযোজ্য তা জানা যায় না।',
    next: [
      { when: 'নির্ধারিত condition-এ fix verified', action: 'report update করে finding close করুন এবং evidence retention policy মানুন।', slug: 'pentest-reporting' },
      { when: 'finding এখনও reproduce হয়', action: 'scope-এর মধ্যে finding পুনরায় assess করুন; unresolved status স্পষ্টভাবে report করুন।', slug: 'vulnerability-assessment' },
    ],
  },
};

function renderCards() {
  categoryFilters.querySelectorAll('.filter-chip[data-category]:not([data-category="all"])').forEach((button) => {
    button.hidden = !articles.some((article) => article.phase === button.dataset.category);
  });
  levelFilter.querySelectorAll('option:not([value="all"])').forEach((option) => {
    option.hidden = !articles.some((article) => article.level === option.value);
  });
  const query = searchInput.value.trim().toLocaleLowerCase('bn-BD');
  const level = levelFilter.value;
  const filtered = articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.phase === activeCategory;
    const matchesPhase = !activePhase || article.phase === activePhase;
    const matchesLevel = level === 'all' || article.level === level;
    const stage = STAGES.find((item) => item.id === article.phase);
    const haystack = [article.title, stage?.title, article.category, article.summary, article.level, article.tags.join(' '), article.keywords].join(' ').toLocaleLowerCase('bn-BD');
    return matchesCategory && matchesPhase && matchesLevel && (!query || haystack.includes(query));
  });

  document.getElementById('result-count').textContent = `${bnNumber(filtered.length)} / ${bnNumber(articles.length)} পাঠ`;
  document.getElementById('lesson-count').textContent = bnNumber(articles.length);
  document.querySelector('.metric:nth-child(2) strong').textContent = bnNumber(STAGES.length);
  document.querySelector('.filter-chip[data-category="all"] span').textContent = bnNumber(articles.length);
  emptyState.hidden = filtered.length > 0;
  articleGrid.hidden = filtered.length === 0;
  document.getElementById('active-filters').hidden = !(query || level !== 'all' || activeCategory !== 'all' || activePhase);
  const activeLabel = [];
  if (query) activeLabel.push(`খোঁজ: “${query}”`);
  if (level !== 'all') activeLabel.push(`স্তর: ${level}`);
  if (activeCategory !== 'all' || activePhase) activeLabel.push('নির্বাচিত বিষয়');
  document.getElementById('active-filter-label').textContent = activeLabel.join(' · ');

  articleGrid.innerHTML = filtered.map((article, index) => {
    const isDone = completed.has(article.slug);
    const stage = STAGES.find((item) => item.id === article.phase);
    const visual = article.image
      ? `<img src="${article.image}" alt="${esc(article.imageAlt)}" loading="lazy"><span class="card-image-label">${esc(article.imageLabel)}</span>`
      : `<div class="cover-drawing drawing-${esc(article.visual)}" aria-hidden="true"><span class="drawing-label">${esc(article.imageLabel)}</span><i></i><i></i><i></i><b></b></div>`;
    return `<article class="article-card${isDone ? ' is-complete' : ''}" style="animation-delay:${Math.min(index * 35, 250)}ms">
      <div class="card-image">${visual}<span class="card-index">${String(index + 1).padStart(2, '0')}</span><span class="card-read-state" aria-label="${isDone ? 'পাঠ সম্পন্ন' : 'এখনো সম্পন্ন নয়'}">${isDone ? '✓' : '·'}</span></div>
      <div class="card-body"><div class="card-meta"><span class="card-category">${esc(stage?.short || article.category)}</span><span class="meta-separator"></span><span>${esc(article.level)}</span><span class="meta-separator"></span><span>${esc(article.time)}</span></div>
        <h3 class="card-title"><a class="card-title-link" href="#/article/${esc(article.slug)}">${esc(article.title)}</a></h3><p class="card-summary">${esc(article.summary)}</p>
        <div class="card-tags">${article.tags.slice(0, 3).map((tag) => `<span>${esc(tag)}</span>`).join('')}</div>
        <div class="card-footer">${editMode ? `<button class="edit-article-button" type="button" data-edit-article="${esc(article.slug)}">সম্পাদনা</button>` : ''}<button class="mark-done" data-toggle-done="${esc(article.slug)}">${isDone ? 'আবার পড়ুন' : 'পড়া হয়েছে ✓'}</button></div>
      </div></article>`;
  }).join('');
  requestAnimationFrame(refreshCardSummaryEllipses);
}

function refreshCardSummaryEllipses() {
  articleGrid.querySelectorAll('.card-summary').forEach((summary) => {
    const fullText = summary.dataset.fullText ?? summary.textContent;
    summary.dataset.fullText = fullText;
    summary.classList.remove('is-truncated');
    summary.removeAttribute('aria-label');
    summary.textContent = fullText;
    const maxHeight = Number.parseFloat(getComputedStyle(summary).maxHeight);
    if (!Number.isFinite(maxHeight) || summary.scrollHeight <= maxHeight + 1) return;

    let low = 0;
    let high = fullText.length;
    let bestPrefix = '';
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      let prefix = fullText.slice(0, middle).trimEnd();
      if (middle < fullText.length && middle > 0 && !/\s/.test(fullText[middle - 1])) {
        const lastWordStart = prefix.search(/\s+\S*$/);
        if (lastWordStart >= 0) prefix = prefix.slice(0, lastWordStart).trimEnd();
      }
      if (!prefix) { low = middle + 1; continue; }
      summary.textContent = `${prefix}...`;
      if (summary.scrollHeight <= maxHeight + 1) {
        bestPrefix = prefix;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }
    if (bestPrefix) {
      summary.textContent = `${bestPrefix}...`;
      summary.classList.add('is-truncated');
      summary.setAttribute('aria-label', fullText);
    }
  });
}
window.addEventListener('resize', () => requestAnimationFrame(refreshCardSummaryEllipses), { passive: true });
if (document.fonts?.ready) document.fonts.ready.then(() => requestAnimationFrame(refreshCardSummaryEllipses));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}

function setCompleted(slug) {
  if (completed.has(slug)) {
    completed.delete(slug);
    showToast('পাঠটি আবার পড়ার তালিকায় রাখা হয়েছে।');
  } else {
    completed.add(slug);
    showToast('পাঠ সম্পন্ন—অগ্রগতি এই ব্রাউজারেই রাখা হয়েছে।');
  }
  localStorage.setItem('cyberpath-completed', JSON.stringify([...completed]));
  renderCards();
  const button = document.querySelector(`[data-complete-article="${CSS.escape(slug)}"]`);
  if (button) updateCompleteButton(button, slug);
}

function updateCompleteButton(button, slug) {
  const done = completed.has(slug);
  button.classList.toggle('done', done);
  button.setAttribute('aria-pressed', String(done));
  button.textContent = done ? '✓ পাঠ সম্পন্ন' : 'পাঠটি সম্পন্ন করুন';
}

function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function addEditorField(parent, labelText, value, options = {}) {
  const label = createElement('label', 'editor-field');
  label.append(createElement('span', '', labelText));
  const control = document.createElement(options.multiline ? 'textarea' : 'input');
  if (!options.multiline) control.type = options.type || 'text';
  if (options.multiline) control.rows = options.rows || 3;
  if (options.maxLength) control.maxLength = options.maxLength;
  if (options.required) control.required = true;
  control.value = value ?? '';
  label.append(control);
  parent.append(label);
  return control;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('ছবিটি পড়া যায়নি।'));
    reader.readAsDataURL(file);
  });
}

async function compressEditorImage(file) {
  if (!file || !file.type.startsWith('image/')) throw new Error('একটি image file বেছে নিন।');
  if (file.size > 12 * 1024 * 1024) throw new Error('ছবিটি ১২ MB-এর নিচে রাখুন।');
  const source = await readFileAsDataUrl(file);
  const image = new Image();
  image.src = source;
  await image.decode();
  const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  for (const quality of [0.84, 0.72, 0.60]) {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
    if (blob && blob.size <= 850 * 1024) return readFileAsDataUrl(blob);
  }
  throw new Error('ছবিটি compress করার পরও বড়। ছোট ছবি বেছে নিন।');
}

function addSectionEditor(container, section, index) {
  const fieldset = createElement('fieldset', 'editor-section');
  fieldset.dataset.sectionIndex = String(index);
  const legend = createElement('legend', '', `অংশ ${index + 1}`);
  fieldset.append(legend);
  const heading = addEditorField(fieldset, 'অংশের শিরোনাম', section.heading, { maxLength: 180, required: true });
  heading.dataset.sectionField = 'heading';
  const paragraphs = addEditorField(fieldset, 'লেখা (paragraph আলাদা করতে একটি খালি লাইন দিন)', (section.paragraphs || []).join('\n\n'), { multiline: true, rows: 4 });
  paragraphs.dataset.sectionField = 'paragraphs';
  const bullets = addEditorField(fieldset, 'তালিকা (প্রতি লাইনে একটি বিষয়)', (section.bullets || []).join('\n'), { multiline: true, rows: 3 });
  bullets.dataset.sectionField = 'bullets';
  ['code', 'output', 'note'].forEach((key) => {
    if (typeof section[key] !== 'string') return;
    const labels = { code: 'কমান্ড', output: 'নমুনা ফল', note: 'নোট' };
    const field = addEditorField(fieldset, labels[key], section[key], { multiline: true, rows: key === 'code' || key === 'output' ? 4 : 3 });
    field.dataset.sectionField = key;
  });
  container.append(fieldset);
}

function openArticleEditor(slug) {
  if (!editMode) return;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return;
  editingSlug = slug;
  pendingEditorImage = article.image;
  editorForm.querySelector('.editor-save-button').disabled = false;
  document.getElementById('article-editor-title').textContent = `সম্পাদনা: ${article.title}`;
  editorFields.replaceChildren();

  const basics = createElement('div', 'editor-grid');
  addEditorField(basics, 'পাঠের নাম', article.title, { maxLength: 180, required: true });
  addEditorField(basics, 'কার্ডের সংক্ষিপ্ত লেখা', article.summary, { multiline: true, rows: 3, maxLength: 600 });
  addEditorField(basics, 'ছবির alt text', article.imageAlt || '', { maxLength: 220 });
  addEditorField(basics, 'ছবির উপর ছোট label', article.imageLabel || '', { maxLength: 90 });
  editorFields.append(basics);

  const imagePanel = createElement('section', 'editor-image-panel');
  imagePanel.append(createElement('h3', '', 'কার্ড ও পাঠের ছবি'));
  const preview = document.createElement('img');
  preview.className = 'editor-image-preview';
  preview.alt = article.imageAlt || 'বর্তমান ছবির preview';
  if (article.image) preview.src = article.image;
  imagePanel.append(preview);
  const imageLabel = createElement('label', 'editor-field editor-file-field');
  imageLabel.append(createElement('span', '', 'নতুন ছবি বেছে নিন'));
  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.accept = 'image/*';
  imageLabel.append(imageInput);
  imagePanel.append(imageLabel);
  imageInput.addEventListener('change', async () => {
    const file = imageInput.files?.[0];
    if (!file) return;
    const saveButton = editorForm.querySelector('.editor-save-button');
    saveButton.disabled = true;
    try {
      pendingEditorImage = await compressEditorImage(file);
      preview.src = pendingEditorImage;
      showToast('ছবিটি প্রস্তুত—সেভ করলে এই browser-এ থাকবে।');
    } catch (error) {
      imageInput.value = '';
      showToast(error.message || 'ছবি যোগ করা যায়নি।');
    } finally {
      saveButton.disabled = false;
    }
  });
  imagePanel.append(createElement('small', 'editor-help', 'ছবি browser-এ compress হবে; সর্বোচ্চ ৮৫০ KB করে সেভ হবে।'));
  editorFields.append(imagePanel);

  editorFields.append(createElement('h3', 'editor-subheading', 'পাঠের লেখা'));
  article.sections.forEach((section, index) => addSectionEditor(editorFields, section, index));
  editorDialog.showModal();
}

function collectArticleEdit(article) {
  const sections = [...editorFields.querySelectorAll('.editor-section')].map((fieldset, index) => {
    const section = { ...article.sections[index] };
    const getValue = (key) => fieldset.querySelector(`[data-section-field="${key}"]`)?.value ?? '';
    section.heading = getValue('heading').trim();
    section.paragraphs = getValue('paragraphs').split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
    section.bullets = getValue('bullets').split('\n').map((value) => value.trim()).filter(Boolean);
    ['code', 'output', 'note'].forEach((key) => {
      if (fieldset.querySelector(`[data-section-field="${key}"]`)) section[key] = getValue(key);
    });
    return section;
  });
  return {
    title: editorFields.querySelector('.editor-grid input')?.value.trim() || article.title,
    summary: editorFields.querySelector('.editor-grid textarea')?.value.trim() || '',
    image: pendingEditorImage || article.image,
    imageAlt: editorFields.querySelectorAll('.editor-grid input')[1]?.value.trim() || '',
    imageLabel: editorFields.querySelectorAll('.editor-grid input')[2]?.value.trim() || '',
    sections,
  };
}

function saveArticleEdits() {
  const article = articles.find((item) => item.slug === editingSlug);
  if (!article) return;
  const edit = collectArticleEdit(article);
  if (!edit.title) {
    showToast('পাঠের নাম খালি রাখা যাবে না।');
    return;
  }
  const nextEdits = { ...articleEdits, [article.slug]: edit };
  const serialized = JSON.stringify(nextEdits);
  if (serialized.length > 2_200_000) {
    showToast('Browser storage ভরে গেছে—কিছু বড় ছবি সরিয়ে আবার চেষ্টা করুন।');
    return;
  }
  try {
    localStorage.setItem(ARTICLE_EDITS_KEY, serialized);
  } catch (error) {
    showToast('সেভ করা যায়নি—browser storage পূর্ণ হতে পারে।');
    return;
  }
  articleEdits = nextEdits;
  applyArticleEdit(article, edit);
  editorDialog.close();
  renderCards();
  showToast('পরিবর্তন এই browser-এ সেভ হয়েছে।');
}

function restoreArticle(slug) {
  const article = articles.find((item) => item.slug === slug);
  const original = originalArticles.get(slug);
  if (!article || !original) return;
  Object.keys(article).forEach((key) => delete article[key]);
  Object.assign(article, JSON.parse(JSON.stringify(original)));
}

function downloadArticleEdits() {
  const blob = new Blob([JSON.stringify({ format: 'cyberpath-local-edits-v1', edits: articleEdits }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hacking-shikhi-edits-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('পরিবর্তনের backup ডাউনলোড হয়েছে।');
}

function syncEditorMode() {
  editorModeToggle.textContent = editMode ? 'এডিট মোড বন্ধ করুন' : 'এডিট মোড চালু করুন';
  editorModeToggle.setAttribute('aria-pressed', String(editMode));
  editorModeToggle.classList.toggle('active', editMode);
  editorTools.hidden = !editMode;
}

function buildTopicsOverview(article) {
  const map = createElement('section', 'topics-overview');
  const heading = createElement('div', 'topics-heading');
  const title = createElement('h2', '', 'যা যা শিখবো');
  title.id = 'topics-overview-title';
  map.setAttribute('aria-labelledby', title.id);
  heading.append(createElement('p', 'eyebrow', 'এই পাঠের বিষয়'), title);
  map.append(heading);

  const grid = createElement('div', 'topic-grid');
  const bengaliDigits = '০১২৩৪৫৬৭৮৯';
  article.sections.forEach((section, index) => {
    const sectionId = `part-${index + 1}`;
    const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
    const bullets = Array.isArray(section.bullets) ? section.bullets : [];
    const detail = paragraphs.find((paragraph) => typeof paragraph === 'string' && paragraph.trim())
      || bullets.find((bullet) => typeof bullet === 'string' && bullet.trim())
      || section.note
      || (section.code ? `উদাহরণ: ${section.code.split('\n')[0]}` : '')
      || (section.output ? section.output.split('\n')[0] : '')
      || (section.table ? section.table.headers.join(' · ') : '')
      || 'এই বিষয়ে বিস্তারিত পড়ুন।';
    const card = createElement('button', 'topic-card');
    card.type = 'button';
    card.setAttribute('aria-controls', sectionId);
    const number = String(index + 1).padStart(2, '0').replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
    card.append(
      createElement('span', 'topic-card-number', number),
      createElement('h3', 'topic-card-title', section.heading),
      createElement('p', 'topic-card-detail', detail),
      createElement('span', 'topic-card-action', 'বিস্তারিত দেখুন ↓'),
    );
    grid.append(card);
  });
  map.append(grid);
  return map;
}

function buildArticle(slug) {
  const article = articles.find((item) => item.slug === slug);
  if (!article) return false;
  document.title = `${article.title} — হ্যাকিং শিখি`;
  document.getElementById('article-serial').textContent = `FIELD NOTE / ${String(articles.indexOf(article) + 1).padStart(2, '0')}`;
  articleContent.replaceChildren();

  const hero = createElement('header', 'article-hero');
  const headingWrap = createElement('div', 'article-heading');
  const kicker = createElement('div', 'article-kicker');
  const stage = STAGES.find((item) => item.id === article.phase);
  const stageLabel = stage ? `${stage.number} / ${stage.title.toUpperCase()}` : article.category.toUpperCase();
  kicker.append(createElement('span', 'dot'), document.createTextNode(stageLabel));
  headingWrap.append(kicker, createElement('h1', '', article.title), createElement('p', 'article-deck', article.summary));
  const byline = createElement('div', 'article-byline');
  byline.append(createElement('span', '', `স্তর: ${article.level}`), createElement('span', '', `পড়তে ${article.time}`), createElement('span', '', 'বাংলা ফিল্ড-নোট'));
  headingWrap.append(byline);
  if (article.image) {
    const figure = createElement('figure', 'article-cover');
    const image = document.createElement('img');
    image.src = article.image;
    image.alt = article.imageAlt;
    image.loading = 'eager';
    figure.append(image, createElement('figcaption', '', article.imageLabel));
    hero.append(headingWrap, figure);
  } else {
    const figure = createElement('div', `article-cover cover-drawing drawing-${article.visual}`);
    figure.setAttribute('aria-hidden', 'true');
    ['i', 'i', 'i', 'b'].forEach((tag) => figure.append(document.createElement(tag)));
    figure.append(createElement('span', 'drawing-label', article.imageLabel));
    hero.append(headingWrap, figure);
  }
  articleContent.append(hero);

  const safety = createElement('aside', 'safety-callout');
  safety.append(createElement('span', 'safety-icon', '◎'));
  const safetyText = createElement('div');
  safetyText.append(createElement('strong', '', 'অনুমতি, scope ও data safety আগে।'));
  safetyText.append(createElement('p', '', 'এই পাঠের অনুশীলন কেবল নিজের সিস্টেম, লিখিতভাবে অনুমোদিত লক্ষ্য বা বিচ্ছিন্ন বৈধ ল্যাবে করুন। অপ্রত্যাশিত data বা scope-এর বাইরের asset দেখলে থামুন।'));
  safety.append(safetyText);
  articleContent.append(safety);
  const topicsOverview = buildTopicsOverview(article);
  articleContent.append(topicsOverview);
  let activeTopicCard = null;

  const layout = createElement('div', 'article-layout');
  layout.classList.toggle('is-planning-scoping', article.slug === 'planning-scoping');
  layout.hidden = true;
  const body = createElement('div', 'article-body');
  const tocList = createElement('ol', 'toc-list');
  let openTopic = null;
  let activeSectionIndex = -1;
  const detailToolbar = createElement('div', 'topic-detail-toolbar');
  const backToTopics = createElement('button', 'topic-detail-back', '← বিষয়ের তালিকায় ফিরুন');
  backToTopics.type = 'button';
  detailToolbar.append(backToTopics);
  body.append(detailToolbar);
  backToTopics.addEventListener('click', () => {
    layout.hidden = true;
    topicsOverview.hidden = false;
    activeSectionIndex = -1;
    topicsOverview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeTopicCard?.focus({ preventScroll: true });
  });
  article.sections.forEach((section, index) => {
    const sectionId = `part-${index + 1}`;
    const li = createElement('li');
    const link = createElement('a', '', section.heading);
    link.href = `#${sectionId}`;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openTopic?.(sectionId);
    });
    li.append(link);
    tocList.append(li);

    const sectionNode = createElement('section', 'article-section');
    sectionNode.id = sectionId;
    sectionNode.tabIndex = -1;
    sectionNode.hidden = true;
    sectionNode.append(createElement('h2', '', section.heading));
    (section.paragraphs || []).forEach((paragraph) => sectionNode.append(createElement('p', '', paragraph)));
    if (section.bullets) {
      const list = createElement('ul');
      section.bullets.forEach((bullet) => list.append(createElement('li', '', bullet)));
      sectionNode.append(list);
    }
    if (section.table) {
      const wrap = createElement('div', 'reference-table-wrap');
      const table = createElement('table', 'reference-table');
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      section.table.headers.forEach((label) => headerRow.append(createElement('th', '', label)));
      thead.append(headerRow);
      const tbody = document.createElement('tbody');
      section.table.rows.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell, index) => tr.append(createElement(index === 0 ? 'th' : 'td', '', cell)));
        tbody.append(tr);
      });
      table.append(thead, tbody);
      wrap.append(table);
      sectionNode.append(wrap);
    }
    if (section.code) {
      const codeBlock = createElement('div', 'code-block');
      const head = createElement('div', 'code-head');
      head.append(createElement('span', '', 'LAB COMMAND / EXAMPLE'));
      const copy = createElement('button', 'copy-code', 'কপি');
      copy.type = 'button';
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(section.code);
          showToast('কমান্ড কপি হয়েছে। কেবল অনুমোদিত ল্যাবে চালান।');
        } catch (error) {
          showToast('কপি করা যায়নি—কোড নির্বাচন করে কপি করুন।');
        }
      });
      head.append(copy);
      const pre = createElement('pre');
      pre.append(createElement('code', '', section.code));
      codeBlock.append(head, pre);
      sectionNode.append(codeBlock);
    }
    if (section.output) {
      const output = createElement('div', 'output-block');
      output.append(createElement('div', 'output-label', 'SAMPLE OUTPUT / নমুনা ফল'));
      const pre = createElement('pre', '', section.output);
      output.append(pre);
      sectionNode.append(output);
    }
    if (section.note) {
      const note = createElement('aside', 'article-note');
      const label = createElement('strong', '', 'নিরাপদ অনুশীলন: ');
      note.append(label, document.createTextNode(section.note));
      sectionNode.append(note);
    }
    body.append(sectionNode);
  });

  const nextTopicRow = createElement('div', 'topic-next-row');
  const previousTopicButton = createElement('button', 'topic-previous-button');
  previousTopicButton.type = 'button';
  const previousTopicCopy = createElement('span', 'topic-previous-copy');
  const previousTopicTitle = createElement('strong', 'topic-previous-title');
  previousTopicCopy.append(createElement('span', 'topic-previous-label', 'পূর্বের বিষয়'), previousTopicTitle);
  previousTopicButton.append(createElement('span', 'topic-previous-arrow', '←'), previousTopicCopy);
  previousTopicButton.hidden = true;
  const nextTopicButton = createElement('button', 'topic-next-button');
  nextTopicButton.type = 'button';
  const nextTopicCopy = createElement('span', 'topic-next-copy');
  const nextTopicTitle = createElement('strong', 'topic-next-title');
  nextTopicCopy.append(createElement('span', 'topic-next-label', 'পরবর্তী বিষয়'), nextTopicTitle);
  nextTopicButton.append(nextTopicCopy, createElement('span', 'topic-next-arrow', '→'));
  nextTopicRow.append(previousTopicButton, nextTopicButton);
  nextTopicRow.hidden = true;
  body.append(nextTopicRow);
  nextTopicButton.addEventListener('click', () => {
    const nextIndex = activeSectionIndex + 1;
    if (nextIndex < 0 || nextIndex >= article.sections.length) return;
    const nextSectionId = `part-${nextIndex + 1}`;
    const nextCard = topicsOverview.querySelector(`.topic-card[aria-controls="${nextSectionId}"]`);
    openTopic?.(nextSectionId, nextCard);
  });
  previousTopicButton.addEventListener('click', () => {
    const previousIndex = activeSectionIndex - 1;
    if (previousIndex < 0) return;
    const previousSectionId = `part-${previousIndex + 1}`;
    const previousCard = topicsOverview.querySelector(`.topic-card[aria-controls="${previousSectionId}"]`);
    openTopic?.(previousSectionId, previousCard);
  });

  const tagList = createElement('div', 'article-tags');
  article.tags.forEach((tag) => tagList.append(createElement('span', '', tag)));
  body.append(tagList);
  const endCard = createElement('div', 'article-end-card');
  endCard.append(createElement('strong', '', 'পরের ধাপ: প্রমাণ নথিবদ্ধ করুন।'), createElement('p', '', 'কোনো ফলকে vulnerability বলার আগে scope, পুনরাবৃত্তিযোগ্য evidence, সম্ভাব্য impact এবং remediation আলাদা করে লিখুন।'));
  const nextAnchor = createElement('a', '', 'পাঠাগারে ফিরে অন্য বিষয় বাছুন ↗');
  nextAnchor.href = '#library';
  endCard.append(nextAnchor);
  body.append(endCard);

  const sidebar = createElement('aside', 'article-sidebar');
  sidebar.hidden = true;
  const sticky = createElement('div', 'sidebar-sticky');
  sticky.append(createElement('h3', '', 'এই পাঠে / ON THIS PAGE'), tocList);
  const progress = createElement('div', 'progress-box');
  progress.append(createElement('small', '', 'YOUR LOCAL PROGRESS'), createElement('p', '', 'পড়ার অগ্রগতি এই ব্রাউজারের local storage-এ থাকে; কোনো অ্যাকাউন্ট বা সার্ভারে পাঠানো হয় না।'));
  const completeButton = createElement('button', 'complete-button');
  completeButton.type = 'button';
  completeButton.dataset.completeArticle = article.slug;
  completeButton.addEventListener('click', () => setCompleted(article.slug));
  updateCompleteButton(completeButton, article.slug);
  progress.append(completeButton);
  sticky.append(progress);

  if (article.refs.length) {
    const refBox = createElement('div', 'article-refbox');
    refBox.append(createElement('h3', '', 'OFFICIAL REFERENCES'));
    article.refs.forEach((key) => {
      const source = SOURCES[key];
      if (!source) return;
      const link = createElement('a', '', `${source.name} ↗`);
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noreferrer';
      refBox.append(link);
    });
    sticky.append(refBox);
  }
  sidebar.append(sticky);
  tagList.hidden = true;
  endCard.hidden = true;
  layout.append(body, sidebar);
  openTopic = (sectionId, sourceCard = null) => {
    const destination = body.querySelector(`#${sectionId}`);
    if (!destination) return;
    activeTopicCard = sourceCard || topicsOverview.querySelector(`.topic-card[aria-controls="${sectionId}"]`);
    activeSectionIndex = article.sections.findIndex((section, index) => `part-${index + 1}` === sectionId);
    topicsOverview.hidden = true;
    body.querySelectorAll('.article-section').forEach((section) => {
      section.hidden = section !== destination;
    });
    const previousSection = article.sections[activeSectionIndex - 1];
    const nextSection = article.sections[activeSectionIndex + 1];
    previousTopicButton.hidden = !previousSection;
    nextTopicButton.hidden = !nextSection;
    nextTopicRow.hidden = !previousSection && !nextSection;
    if (previousSection) {
      previousTopicTitle.textContent = previousSection.heading;
      previousTopicButton.setAttribute('aria-label', `পূর্বের বিষয়: ${previousSection.heading}`);
    }
    if (nextSection) {
      nextTopicTitle.textContent = nextSection.heading;
      nextTopicButton.setAttribute('aria-label', `পরবর্তী বিষয়: ${nextSection.heading}`);
    }
    layout.hidden = false;
    sidebar.hidden = false;
    destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
    destination.focus({ preventScroll: true });
  };
  topicsOverview.querySelectorAll('.topic-card').forEach((card) => {
    card.addEventListener('click', () => openTopic?.(card.getAttribute('aria-controls'), card));
  });
  articleContent.append(layout);
  return true;
}

function renderRoute() {
  const match = window.location.hash.match(/^#\/article\/([a-z0-9-]+)$/);
  if (match && buildArticle(decodeURIComponent(match[1]))) {
    homeView.hidden = true;
    articleView.hidden = false;
    window.scrollTo({ top: 0, behavior: 'auto' });
  } else {
    homeView.hidden = false;
    articleView.hidden = true;
    document.title = 'হ্যাকিং শিখি — নিরাপদ হাতে-কলমে সাইবারশিক্ষা';
  }
  if (!homeView.hidden) requestAnimationFrame(refreshCardSummaryEllipses);
}

function clearFilters() {
  searchInput.value = '';
  levelFilter.value = 'all';
  activeCategory = 'all';
  activePhase = null;
  categoryFilters.querySelectorAll('.filter-chip').forEach((button) => {
    const active = button.dataset.category === 'all';
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderCards();
}

categoryFilters.addEventListener('click', (event) => {
  const button = event.target.closest('.filter-chip');
  if (!button) return;
  activeCategory = button.dataset.category;
  activePhase = null;
  categoryFilters.querySelectorAll('.filter-chip').forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderCards();
});

searchInput.addEventListener('input', renderCards);
levelFilter.addEventListener('change', renderCards);
document.getElementById('search-form').addEventListener('submit', (event) => event.preventDefault());
document.getElementById('clear-filters').addEventListener('click', clearFilters);
document.getElementById('reset-search').addEventListener('click', clearFilters);

document.querySelector('.roadmap-track').addEventListener('click', (event) => {
  const step = event.target.closest('.route-step');
  if (!step) return;
  activePhase = step.dataset.phase;
  activeCategory = 'all';
  categoryFilters.querySelectorAll('.filter-chip').forEach((button) => {
    const active = button.dataset.category === 'all';
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderCards();
  document.getElementById('library').scrollIntoView({ behavior: 'smooth' });
});

articleGrid.addEventListener('click', (event) => {
  const editButton = event.target.closest('[data-edit-article]');
  if (editButton) {
    event.preventDefault();
    openArticleEditor(editButton.dataset.editArticle);
    return;
  }
  const done = event.target.closest('[data-toggle-done]');
  if (done) setCompleted(done.dataset.toggleDone);
});

editorModeToggle.addEventListener('click', () => {
  editMode = !editMode;
  try {
    localStorage.setItem(EDIT_MODE_KEY, editMode ? 'on' : 'off');
  } catch (error) {
    showToast('Mode এই session-এ বদলেছে, তবে browser-এ মনে রাখা যায়নি।');
  }
  syncEditorMode();
  renderCards();
  showToast(editMode ? 'এডিট মোড চালু—পরিবর্তন এই browser-এ সেভ হবে।' : 'এডিট মোড বন্ধ—সেভ করা পরিবর্তন থাকবে।');
});

document.getElementById('download-edits').addEventListener('click', downloadArticleEdits);
const importEditsFile = document.getElementById('import-edits-file');
document.getElementById('import-edits-button').addEventListener('click', () => importEditsFile.click());
importEditsFile.addEventListener('change', async () => {
  const file = importEditsFile.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const incoming = parsed?.format === 'cyberpath-local-edits-v1' ? parsed.edits : parsed?.edits;
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) throw new Error('backup format ঠিক নেই।');
    const validSlugs = new Set(articles.map((article) => article.slug));
    const restored = Object.fromEntries(Object.entries(incoming).filter(([slug, edit]) => validSlugs.has(slug) && edit && typeof edit === 'object'));
    if (!Object.keys(restored).length) throw new Error('backup-এ কোনো পরিচিত পাঠের পরিবর্তন নেই।');
    const serialized = JSON.stringify(restored);
    if (serialized.length > 2_200_000) throw new Error('backup এই browser-এর storage সীমার চেয়ে বড়।');
    localStorage.setItem(ARTICLE_EDITS_KEY, serialized);
    articleEdits = restored;
    articles.forEach((article) => {
      restoreArticle(article.slug);
      applyArticleEdit(article, articleEdits[article.slug]);
    });
    renderCards();
    showToast('Backup-এর পরিবর্তন এই browser-এ ফিরিয়ে আনা হয়েছে।');
  } catch (error) {
    showToast(error.message || 'Backup import করা যায়নি।');
  } finally {
    importEditsFile.value = '';
  }
});
document.getElementById('reset-edits').addEventListener('click', () => {
  if (!Object.keys(articleEdits).length) {
    showToast('এখনো কোনো পরিবর্তন সেভ করা হয়নি।');
    return;
  }
  if (!window.confirm('এই browser-এ সেভ করা সব লেখা ও ছবির পরিবর্তন মুছে মূল অবস্থায় ফিরবেন?')) return;
  try {
    localStorage.removeItem(ARTICLE_EDITS_KEY);
  } catch (error) {
    showToast('Browser storage থেকে পরিবর্তন মুছতে পারিনি।');
    return;
  }
  articleEdits = {};
  articles.forEach((article) => restoreArticle(article.slug));
  renderCards();
  showToast('সব পাঠ মূল অবস্থায় ফিরেছে।');
});

editorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  saveArticleEdits();
});
document.getElementById('close-article-editor').addEventListener('click', () => editorDialog.close());
document.getElementById('cancel-article-editor').addEventListener('click', () => editorDialog.close());
document.getElementById('reset-current-edit').addEventListener('click', () => {
  if (!editingSlug || !window.confirm('এই পাঠের পরিবর্তন মুছে মূল লেখা ও ছবি ফেরাবেন?')) return;
  const nextEdits = { ...articleEdits };
  delete nextEdits[editingSlug];
  try {
    if (Object.keys(nextEdits).length) localStorage.setItem(ARTICLE_EDITS_KEY, JSON.stringify(nextEdits));
    else localStorage.removeItem(ARTICLE_EDITS_KEY);
  } catch (error) {
    showToast('পরিবর্তন মুছে ফেলা যায়নি।');
    return;
  }
  articleEdits = nextEdits;
  restoreArticle(editingSlug);
  editorDialog.close();
  renderCards();
  showToast('এই পাঠের মূল লেখা ও ছবি ফেরানো হয়েছে।');
});
editorDialog.addEventListener('close', () => {
  editingSlug = null;
  pendingEditorImage = null;
});
editorDialog.addEventListener('click', (event) => {
  if (event.target === editorDialog) editorDialog.close();
});

document.getElementById('back-to-library').addEventListener('click', () => {
  window.location.hash = 'library';
});

document.getElementById('menu-toggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const nav = document.getElementById('main-nav');
  const isOpen = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
  button.setAttribute('aria-label', isOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  document.getElementById('main-nav').classList.remove('open');
  document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
}));

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('click', () => {
  if (window.matchMedia('(max-width: 760px)').matches) {
    searchForm.classList.add('expanded');
    searchInput.focus();
  }
});
searchInput.addEventListener('blur', () => {
  if (!searchInput.value) searchForm.classList.remove('expanded');
});
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchForm.classList.add('expanded');
    searchInput.focus();
  }
  if (event.key === 'Escape') {
    searchInput.blur();
    searchForm.classList.remove('expanded');
    document.getElementById('main-nav').classList.remove('open');
  }
});

window.addEventListener('hashchange', renderRoute);
window.addEventListener('popstate', renderRoute);
syncEditorMode();
renderCards();
renderRoute();
