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
    slug: 'network-foundations', title: 'নেটওয়ার্কের ভিত্তি: নিজের ল্যাবকে বুঝুন', category: 'ভিত্তি', phase: 'reconnaissance', level: 'শুরু', time: '৮ মিনিট',
    summary: 'IP, port, DNS ও HTTP—স্ক্যান শুরুর আগে নিজের পরিবেশের মানচিত্র আঁকুন।', tags: ['Networking', 'HTTP', 'Lab setup'],
    keywords: 'নেটওয়ার্ক বেসিক আইপি পোর্ট ডিএনএস নেটওয়ার্ক অ্যানালাইসিস', image: '/assets/image-1.webp', imageAlt: 'ল্যাব নেটওয়ার্কের বিমূর্ত মানচিত্র', imageLabel: 'FOUNDATION / LOCAL NETWORK',
    refs: [],
    sections: [
      { heading: 'টার্গেট নয়, আগে পরিবেশ', paragraphs: ['নেটওয়ার্ক পরীক্ষা শুরু হয় নিজের মেশিনে কী চলছে তা বোঝা থেকে। IP ঠিকানা হলো নেটওয়ার্কে যন্ত্রের পরিচয়; port হলো সেই যন্ত্রের কোনো সার্ভিসে পৌঁছানোর দরজা। DNS নামকে IP-তে মিলিয়ে দেয়, আর HTTP হলো ওয়েব ব্রাউজার ও সার্ভারের কথোপকথনের নিয়ম।'], bullets: ['শুধু নিজের যন্ত্র বা আলাদা ভার্চুয়াল ল্যাব নির্বাচন করুন।', 'ল্যাবের ঠিকানা, খোলা সার্ভিস এবং পরীক্ষার সময় লিখে রাখুন।', 'Production বা অফিসের নেটওয়ার্ককে অনুমতি ছাড়া ল্যাব ধরে নেবেন না.'] },
      { heading: 'লোকাল মেশিনের সার্ভিস দেখুন', paragraphs: ['পরের কমান্ডগুলো আপনার নিজের Linux ল্যাবের নেটওয়ার্ক ইন্টারফেস ও listening port দেখায়। অন্যের নেটওয়ার্কে কোনো প্যাকেট পাঠায় না।'], code: 'ip -br addr\nss -tulpn', output: 'নমুনা (যন্ত্রভেদে আলাদা হবে):\nlo      UNKNOWN  127.0.0.1/8 ::1/128\nLISTEN  0  128  127.0.0.1:3000', note: 'নিজের lab VM-এ চালান। `ss`-এর ফলাফলে সার্ভিসের নাম বা PID দেখাতে root অনুমতি লাগতে পারে।' },
      { heading: 'HTTP অনুরোধ পড়ুন', paragraphs: ['লোকাল প্রশিক্ষণ অ্যাপ চালু থাকলে তার উত্তর হেডার দেখুন। `127.0.0.1` সবসময় আপনার নিজের কম্পিউটারের loopback ঠিকানা।'], code: 'curl -i http://127.0.0.1:3000/', output: 'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\n\n<!doctype html>…', note: 'Port 3000-এ Juice Shop বা নিজের test app চালু থাকলেই নমুনা output পাওয়া যাবে।' },
    ],
  },
  {
    slug: 'scope-and-safety', title: 'স্কোপ ও অনুমতি: পরীক্ষার সীমানা নির্ধারণ', category: 'ভিত্তি', phase: 'reconnaissance', level: 'শুরু', time: '৬ মিনিট',
    summary: 'কাজ শুরুর আগে লিখিত অনুমতি, লক্ষ্য, সময়সীমা ও থামার নিয়ম ঠিক করুন।', tags: ['Scope', 'Authorization', 'Ethics'],
    keywords: 'অনুমতি আইন নীতি scope স্কোপ data safety বৈধতা', image: '/assets/image-4.webp', imageAlt: 'সুরক্ষিত পরীক্ষার পরিধি ও যাচাইয়ের ইলাস্ট্রেশন', imageLabel: 'SCOPE / WRITTEN AUTHORIZATION',
    refs: ['wstg'],
    sections: [
      { heading: 'স্কোপ মানে লিখিত সীমানা', paragraphs: ['পেনটেস্টে “আমাকে পরীক্ষা করতে বলেছে” যথেষ্ট নয়। লিখিত অনুমতিতে কোন domain, IP, application, account, সময় এবং পদ্ধতি অন্তর্ভুক্ত তা স্পষ্ট থাকতে হবে। তৃতীয় পক্ষের hosting, payment বা identity provider আলাদা অনুমতি ছাড়া স্কোপে ঢোকে না।'], bullets: ['অনুমোদিত asset ও বাদ দেওয়া asset-এর তালিকা রাখুন।', 'পরীক্ষার সময়, source IP, rate limit এবং জরুরি যোগাযোগ লিখুন।', 'পরীক্ষায় বাস্তব ব্যবহারকারীর ডেটা এলে সঙ্গে সঙ্গে থামা ও জানানোর নিয়ম আগে স্থির করুন।'] },
      { heading: 'নিরাপদ ল্যাবের scope-card', paragraphs: ['অনুশীলনের আগে এই নমুনা পূরণ করুন। বাস্তব engagement-এ দায়িত্বপ্রাপ্ত ব্যক্তির স্বাক্ষরিত অনুমতি ছাড়া কোনো পরীক্ষা শুরু করবেন না।'], code: 'ল্যাবের নাম: Juice Shop — নিজের কম্পিউটারে\nঅনুমোদিত লক্ষ্য: http://127.0.0.1:3000\nপরীক্ষার সময়: ৩০ মিনিট\nঅনুমোদিত কৌশল: ম্যানুয়াল browse, সীমিত local scan\nনিষিদ্ধ: বাইরের IP, বাস্তব account, denial-of-service\nথামার শর্ত: অপ্রত্যাশিত data বা lab-এর বাইরের redirect', note: 'লোকাল `127.0.0.1` উদাহরণটিও তখনই প্রযোজ্য, যখন ল্যাবটি আপনার নিজের যন্ত্রে চালু আছে।' },
      { heading: 'ডেটা ও প্রমাণের যত্ন', paragraphs: ['প্রমাণ সংগ্রহে প্রয়োজনের চেয়ে বেশি তথ্য নেবেন না। ব্যক্তিগত তথ্য, cookie, token ও password report-এ ঢাকুন। পরীক্ষা শেষ হলে অনুমোদিত সংরক্ষণ-সময় অনুযায়ী lab data মুছুন এবং কোনো credential পুনরায় ব্যবহার করবেন না।'],
      },
    ],
  },
  {
    slug: 'reconnaissance', title: 'Reconnaissance: অনুমোদিত তথ্য দিয়ে মানচিত্র', category: 'Recon ও Scan', phase: 'reconnaissance', level: 'শুরু', time: '৯ মিনিট',
    summary: 'Scope-এর ভিতরে asset inventory বানান; passive discovery ও active test আলাদা রাখুন।', tags: ['Recon', 'Asset inventory', 'Scope'],
    keywords: 'reconnaissance recon passive active subdomain information gathering তথ্য সংগ্রহ', image: '/assets/image-3.webp', imageAlt: 'ওয়েব অ্যাপ্লিকেশনের রুট ও endpoint বিশ্লেষণ', imageLabel: 'RECON / LAB INVENTORY',
    refs: ['wstg'],
    sections: [
      { heading: 'প্রথমে asset inventory', paragraphs: ['Reconnaissance হলো স্ক্যানের আগে অনুমোদিত target সম্পর্কে তথ্য গুছিয়ে নেওয়া। বাস্তব engagement-এ scope document-ই একমাত্র কর্তৃত্বপূর্ণ asset তালিকা। Passive তথ্যও privacy ও contract-এর নিয়ম মানতে হবে।'], bullets: ['Lab hostname, URL, IP, app version ও owner লিখুন।', 'In-scope ও out-of-scope asset আলাদা করুন।', 'প্রতিটি তথ্যের উৎস ও সংগ্রহের সময় লিখুন।'] },
      { heading: 'নিজের লোকাল host যাচাই', paragraphs: ['নিচের উদাহরণে `.test` নামটি reserved test namespace হিসেবে ব্যবহার করা হয়েছে। নিজের lab-এ নামটি loopback-এ resolve করে তারপর উত্তর যাচাই করুন।'], code: 'printf "127.0.0.1 app.lab.test\\n" | sudo tee -a /etc/hosts\ngetent hosts app.lab.test\ncurl --resolve app.lab.test:3000:127.0.0.1 http://app.lab.test:3000/', output: '127.0.0.1  app.lab.test\nHTTP/1.1 200 OK  (lab app চললে)', note: 'শুধু নিজের মেশিনে `/etc/hosts` বদলান। বাস্তব public domain বা অন্যের asset এই উদাহরণের target নয়।' },
      { heading: 'যা পর্যবেক্ষণ করবেন', paragraphs: ['Lab app-এ দেখা route, response header ও publicly available test documentation নোট করুন। Login বা sensitive data সংগ্রহ, social engineering এবং third-party service পরীক্ষা করতে আলাদা লিখিত অনুমতি লাগে।'],
      },
    ],
  },
  {
    slug: 'nmap-local-scan', title: 'Nmap', category: 'Recon ও Scan', phase: 'scanning', level: 'মাঝারি', time: '৩০ মিনিট',
    summary: 'Target, host discovery, TCP/UDP scan, port state, service detection, NSE, timing ও রিপোর্ট—শুধু নিজের বা অনুমোদিত lab-এ।', tags: ['Nmap', 'Host discovery', 'Port scanning'],
    keywords: 'nmap এনম্যাপ target specification scope host discovery sL sn Pn port TCP UDP SYN ACK open closed filtered version detection sV OS -O NSE scripts timing T3 firewall IPv6 report output oN oX oA', image: '/assets/image-3.webp', imageAlt: 'লোকাল ওয়েব অ্যাপের নিরাপদ মূল্যায়নের ইলাস্ট্রেশন', imageLabel: 'NMAP / LOOPBACK ONLY',
    refs: ['nmap', 'nmap-port', 'nmap-nse'],
    sections: [
      { heading: 'লক্ষ্য আর স্কোপ আগে স্থির করুন', paragraphs: ['আপনার দেওয়া Nmap Reference Guide-এ target specification, host discovery, port scanning, service/version detection ও output আলাদা করে ব্যাখ্যা করা হয়েছে। Nmap-এর target হলো command-এর শেষের host/IP/network; তাই ভুল target দিলে ঠিক কমান্ডও ভুল জায়গায় যাবে। এই পাঠে একমাত্র target নিজের কম্পিউটারের loopback `127.0.0.1`।', 'লিখিত scope, সঠিক asset এবং পরীক্ষার অনুমতি নিশ্চিত না হলে কোনো scan চালাবেন না। CIDR যেমন `/24` একাধিক address অন্তর্ভুক্ত করতে পারে; এটি এই পাঠের target নয়। আপনার দেওয়া guide অনুযায়ী Nmap সাধারণত সবচেয়ে পরিচিত ১,০০০ TCP port scan করে; তাই উদাহরণে `-p 3000` দিয়ে একটি নির্দিষ্ট local port বেছে নেওয়া হয়েছে।'], bullets: ['শুধু নিজের যন্ত্রে চালু করা test app ব্যবহার করুন।', 'কোনো public host, shared office network, অন্যের device বা অনুমতিহীন IP-তে এই কমান্ড পরিবর্তন করে চালাবেন না।', 'অপ্রত্যাশিত host, redirect বা sensitive data দেখলে থামুন এবং scope owner-কে জানান।'] },
      { heading: 'প্রথমে target তালিকা মিলিয়ে নিন: `-sL`', paragraphs: ['List scan (`-sL`) target-গুলো তালিকাভুক্ত করে, port scan করে না। `-n` reverse-DNS lookup বন্ধ করে; IP literal ব্যবহার করায় hostname resolution-ও দরকার নেই। Scope-এ target-টি ঠিক লেখা হয়েছে কি না যাচাই করার জন্য এটি ব্যবহার করুন।'], code: 'nmap -sL -n 127.0.0.1', output: 'ধারণাগত ফল:\nTarget তালিকায়: 127.0.0.1\nPort পরীক্ষা: হয়নি', note: 'ডকুমেন্ট অনুযায়ী `-sL` নিজে target host-এ probe পাঠায় না; `-n` DNS lookup এড়ায়। তারপরও target-টি নিজের loopback—এটাই আগে যাচাই করুন।' },
      { heading: 'Host discovery আর port scan এক জিনিস নয়', paragraphs: ['`-sn` host discovery চালায় কিন্তু port scan বন্ধ রাখে। এটি `-sL`-এর মতো কেবল তালিকা নয়—নেটওয়ার্কে discovery probe পাঠাতে পারে। অন্যদিকে `-Pn` host discovery বাদ দিয়ে নির্দিষ্ট target-কে up ধরে বাকি অনুরোধ করা scan চালায়; এটি “আরও নিরাপদ” বা “কোনো পরীক্ষা নয়” এমন flag নয়। এই অনুশীলনে শুধু নিজের loopback-এ `-sn` দিয়ে পার্থক্য দেখুন।'], code: 'nmap -sn 127.0.0.1', output: 'নমুনা:\nHost is up (latency যন্ত্রভেদে আলাদা)\nPort table: নেই', note: 'এই command discovery probe পাঠায়। `-Pn` ব্যবহার করে scope বড় করবেন না; এটি দেওয়া প্রতিটি target-এ পরের scan চালাতে পারে।' },
      { heading: 'একটি নির্দিষ্ট TCP port পরীক্ষা করুন: `-sT` ও `-p`', paragraphs: ['আগে নিজের training app-টি `127.0.0.1:3000`-এ চালু করুন। `-sT` TCP connect scan বেছে নেয়; OS-এর connect() ব্যবহারে open port-এ সম্পূর্ণ connection স্থাপিত হতে পারে এবং service log-এ দেখা যেতে পারে। `-p 3000` scan-কে একটি নির্দিষ্ট port-এ সীমাবদ্ধ করে।'], code: 'nmap -sT -p 3000 127.0.0.1', output: 'নমুনা (app চললে):\nPORT     STATE SERVICE\n3000/tcp open  http', note: 'আপনার app বা firewall ভেদে ফল ভিন্ন হতে পারে। Port 3000 বন্ধ থাকলে অন্য network-এ খুঁজবেন না—নিজের lab service ও port configuration যাচাই করুন।' },
      { heading: 'Port state কী বলে—আর কী বলে না', paragraphs: ['Nmap-এর state হলো নির্দিষ্ট scan type, scanner-এর অবস্থান ও network response অনুযায়ী Nmap যা নির্ণয় করতে পেরেছে; এটি port-এর চিরস্থায়ী বা সব জায়গার সত্য নয়।'], bullets: ['`open`: কোনো application ওই port-এ connection/packet গ্রহণ করছে।', '`closed`: target সাড়া দিয়েছে, কিন্তু সেখানে listener পাওয়া যায়নি।', '`filtered`: filter বা network বাধায় open না closed—Nmap নিশ্চিত হতে পারেনি।', '`unfiltered`: probe পৌঁছেছে, কিন্তু open/closed নির্ধারিত হয়নি; ডকুমেন্টে এটি ACK scan-এর state।', '`open|filtered`: উত্তর না পাওয়ায় open আর filtered আলাদা করা যায়নি; UDP ও কিছু scan type-এ দেখা যায়।', '`closed|filtered`: দুটির মধ্যে আলাদা করা যায়নি; ডকুমেন্টে এটি idle scan-এর state।', 'কোনো state-ই নিজে vulnerability, exploitability বা ভুল configuration প্রমাণ করে না।'] },
      { heading: 'Service ও version hint নিন: `-sV`', paragraphs: ['Port number-এর পাশে service name দেখানো কখনো Nmap-এর service database-ভিত্তিক অনুমান হতে পারে। `-sV` service-এ probe পাঠিয়ে application/version শনাক্ত করার চেষ্টা করে। `--version-light` কম-intensity probe বেছে নিয়ে সময় কমায়, তবে শনাক্তকরণ অসম্পূর্ণ থাকতে পারে।'], code: 'nmap -sT -sV --version-light -p 3000 127.0.0.1', output: 'নমুনা (version hint থাকলে):\nPORT     STATE SERVICE VERSION\n3000/tcp open  http    (hint; lab অনুযায়ী আলাদা)', note: 'Banner/version string ভুল, অসম্পূর্ণ বা পরিবর্তিত হতে পারে। Version hint vulnerability finding নয়—পরবর্তী পাঠে অনুমোদিত lab evidence দিয়ে আলাদাভাবে যাচাই করতে হয়।' },
      { heading: 'ফলাফল স্থানীয় report-এ সংরক্ষণ করুন', paragraphs: ['Interactive output terminal-এ দেখা যায়। `-oN` normal text, `-oX` XML, আর `-oA` একই basename-এ normal, XML ও grepable—তিন format-ই লেখে। Report-এ target, command, Nmap version, scan সময় এবং state/hint একসঙ্গে রাখলে finding পরে পুনরায় বোঝা যায়।'], code: 'mkdir -p reports\nnmap -sT -sV --version-light -p 3000 -oA reports/nmap-local 127.0.0.1\nnmap --version', output: 'তৈরি হবে:\nreports/nmap-local.nmap\nreports/nmap-local.xml\nreports/nmap-local.gnmap', note: 'ফাইলগুলো নিজের lab workspace-এ রাখুন। কাউকে পাঠানোর আগে host name, IP, banner বা অন্য সংবেদনশীল তথ্য আছে কি না যাচাই ও redact করুন।' },
      { heading: 'Advanced flag আছে—এই প্রথম পাঠে সেগুলো চালাবেন না', paragraphs: ['ডকুমেন্টে `-A`-কে OS detection, version detection, script scan ও traceroute একসঙ্গে চালানো option হিসেবে দেখানো হয়েছে—এটি একটি নির্দিষ্ট port-এর হালকা check-এর সমতুল্য নয়। `-sC` default NSE scripts চালায়; Nmap guide সতর্ক করে যে কিছু script intrusive হতে পারে এবং scripts sandbox-এ চলে না। `-sU` UDP scan ধীর হতে পারে ও `open|filtered` ফল দ্ব্যর্থক হতে পারে।'], bullets: ['এই beginner exercise-এ `-A`, `-sC`, `--script`, `-Pn`, UDP/বিস্তৃত port ranges বা random target নির্বাচন ব্যবহার করবেন না।', 'Firewall এড়ানো বা পরিচয় গোপনের উদ্দেশ্যে decoy, source spoofing, packet fragmentation বা proxy option ব্যবহার করার নির্দেশনা এখানে নেই।', 'অন্য NSE script চালানোর আগে script, প্রভাব ও target scope আলাদাভাবে পর্যালোচনা এবং লিখিত অনুমতি নিশ্চিত করা জরুরি।'] },
      { heading: 'ফল অনুযায়ী পরের ধাপ', paragraphs: ['Report-এর state-কে পরের সিদ্ধান্তের শুরু হিসেবে নিন—vulnerability verdict হিসেবে নয়। একই অনুমোদিত target ও একই সীমিত command দিয়ে ফল পুনরাবৃত্তি হয় কি না যাচাই করে নোট রাখুন।'], bullets: ['প্রত্যাশিত service open হলে: service response নথিবদ্ধ করে Scanning & Enumeration পাঠে এগোন।', 'Port closed বা service না থাকলে: নিজের app ও listener যাচাই করুন; নতুন host বা port range যোগ করবেন না।', 'Filtered/ambiguous ফল বা অনুমতির বাইরে কোনো target দেখলে: scan থামান, ফলকে অনিশ্চিত লিখুন এবং scope owner-এর সঙ্গে কথা বলুন।'] },
      {"heading":"Target specification: স্ক্যানের সীমানা বেঁধে দিন","paragraphs":["Nmap কমান্ডের শেষে target/IP, hostname, range, CIDR বা target-file দেওয়া যায়। CIDR যেমন `/24` একটি address নয়—এটি বহু address অন্তর্ভুক্ত করতে পারে। Hostname একাধিক IP-তে resolve হতে পারে; বাস্তব কাজের authoritative scope list-ই অনুসরণ করুন।","Target-list ও exclude অপশন বড় engagement-এ inventory সাজাতে সহায়তা করে। `-iL` ফাইল থেকে target পড়ে, `--exclude` নির্দিষ্ট target বাদ দেয়, আর `-iR` random target বেছে নিতে পারে। এগুলো public বা অজানা host খোঁজার অনুমতি নয়; এই পাঠে শুধু নিজের `127.0.0.1` loopback ব্যবহার করুন।"],"table":{"headers":["রূপ/অপশন","অর্থ","ব্যবহারের আগে যাচাই"],"rows":[["একটি IP/hostname","একটি নির্দিষ্ট host নির্বাচন","Hostname-এর resolved IP-ও scope-এ আছে কি না দেখুন।"],["CIDR বা range","একাধিক host একসঙ্গে নির্বাচন","প্রতিটি অন্তর্ভুক্ত address অনুমোদিত কি না যাচাই করুন।"],["-iL targets.txt","ফাইল থেকে target তালিকা পড়া","ফাইলের প্রতিটি target অনুমোদিত হওয়া চাই।"],["--exclude","স্ক্যান থেকে নির্দিষ্ট target বাদ","এটি বাকি target-গুলোর অনুমতির বিকল্প নয়।"],["-iR N","random target নির্বাচন","এই শিক্ষাপাঠে ব্যবহার নয়; random public target স্ক্যান করবেন না।"]]},"note":"স্ক্যান চালানোর আগে target list, owner, সময়সীমা, অনুমোদিত পদ্ধতি এবং stop condition লিখে রাখুন।"},
      {"heading":"Host discovery: অনলাইন host খোঁজা","paragraphs":["Host discovery হলো target উত্তর দিচ্ছে কি না যাচাইয়ের ধাপ; এটি port scan থেকে আলাদা। `-sL` target তালিকাভুক্ত করে, `-sn` discovery করে কিন্তু port scan বাদ দেয়, আর `-Pn` discovery বাদ দিয়ে দেওয়া host-কে online ধরে পরবর্তী scan চালায়। তাই `-Pn`-কে harmless shortcut ভাবা যাবে না।","`-n` reverse-DNS lookup বন্ধ করে এবং `-R` DNS lookup-ийг বাধ্যতামূলক করার চেষ্টা করে। `-PE`, `-PS`, `-PA`, `-PU`-এর মতো flag ভিন্ন ধরনের probe ব্যবহার করতে পারে। কোন probe কাজ করবে তা OS, network ও firewall-এর ওপর নির্ভর করে।"],"table":{"headers":["অপশন","কাজ","মনে রাখুন"],"rows":[["-sL","শুধু target list দেখায়","সাধারণত host-এ port probe করে না।"],["-sn","Host discovery; port scan বন্ধ","নেটওয়ার্কে discovery probe পাঠায়।"],["-Pn","Discovery বাদ দিয়ে host-কে up ধরে","পরবর্তী scan চলতে পারে; scope অপরিবর্তিত রাখুন।"],["-n / -R","DNS lookup বন্ধ / জোর করে চালানোর চেষ্টা","Hostname resolution-ও target scope-কে প্রভাবিত করতে পারে।"],["-PE / -PS / -PA / -PU","ICMP, TCP SYN/ACK, UDP discovery probe","Probe firewall-এ দেখা যেতে পারে এবং response অসম্পূর্ণ হতে পারে।"]]},"code":"nmap -sn 127.0.0.1","output":"নিজের loopback-এর host discovery\nPort list: তৈরি হয় না","note":"এই উদাহরণও active probe পাঠায়। নিজের মেশিন বা স্পষ্ট অনুমোদিত lab ছাড়া চালাবেন না।"},
      {"heading":"Port selection: কোন port এবং protocol পরীক্ষা করবেন","paragraphs":["Port selection সীমিত রাখলে ফল বোঝা সহজ হয় এবং অপ্রয়োজনীয় traffic কমে। `-p` নির্দিষ্ট port বা range নেয়, `-F` কম সংখ্যক প্রচলিত port বেছে নেয়, আর `--top-ports N` জনপ্রিয়তার ভিত্তিতে Nটি port নির্বাচন করে। `-p-` সব TCP port (1–65535) বেছে নেয়—এটি বিস্তৃত পরীক্ষা, তাই beginner exercise-এ দরকার নেই।","Protocol prefix দিয়ে TCP ও UDP আলাদা করা যায়; একই port number-এর TCP ও UDP service আলাদা হতে পারে। UDP scan প্রায়ই ধীর এবং `open|filtered` ফল অনির্দিষ্ট হতে পারে।"],"table":{"headers":["অপশন","কাজ","পরিসর-সংক্রান্ত নোট"],"rows":[["-p 3000","একটি port","নির্দিষ্ট local training service-এর জন্য উপযোগী।"],["-p 3000,8080","একাধিক নির্দিষ্ট port","প্রতিটি port scope-এ কেন আছে তা জানুন।"],["-p 3000-3005","একটি port range","range যত ছোট ও দরকারি, তত ভালো।"],["-p-","সব TCP port","বেশি বিস্তৃত ও দীর্ঘ হতে পারে; প্রয়োজন ও অনুমতি যাচাই করুন।"],["-F / --top-ports N","কম/জনপ্রিয় port নির্বাচন","Fast মানে সম্পূর্ণ বা সর্বদা নির্ভুল নয়।"],["-p T:3000,U:53","TCP/UDP port আলাদা করে নির্বাচন","Protocol অনুযায়ী ফল আলাদা করে পড়ুন।"]]},"code":"nmap -sT -p 3000,8080 127.0.0.1","output":"শুধু localhost-এর TCP port 3000 ও 8080 পরীক্ষা হবে","note":"এই উদাহরণে target `127.0.0.1`; range বাড়ানোর আগে নিজের lab-এর listener ও অনুমোদন যাচাই করুন।"},
      {"heading":"Scan technique: TCP, UDP এবং বিশেষ probe","paragraphs":["Nmap বিভিন্ন protocol ও response pattern অনুযায়ী scan technique বেছে নেয়। একই ধরনের probe সব network-এ একই ফল দেয় না। নিচের তালিকা ধারণা বোঝার জন্য—এটি বাইরের host-এ চালানোর command recipe নয়।"],"table":{"headers":["Flag","ধরন","ব্যাখ্যা ও সীমাবদ্ধতা"],"rows":[["-sT","TCP connect","OS-এর পূর্ণ connect() ব্যবহার করে; open service-এ connection তৈরি হতে পারে।"],["-sS","TCP SYN","Raw packet সুবিধা ও প্রায়ই elevated privilege লাগে; অনুমোদন ও network policy মানতে হয়।"],["-sU","UDP","ধীর হতে পারে; উত্তর না পেলে open আর filtered আলাদা করা কঠিন।"],["-sA","TCP ACK","Filtering behavior বোঝাতে পারে; open port খুঁজে পাওয়ার বিকল্প নয়।"],["-sN / -sF / -sX","NULL / FIN / Xmas","Response-ভিত্তিক বিশেষ probe; OS-ভেদে ফল বদলে যায়, evade করার নির্দেশনা নয়।"],["-sI","Idle scan","বিশেষ শর্তের third-party host ব্যবহার করে; এই পাঠে ব্যবহার বা অনুশীলন নয়।"],["-sO, -sY, -sZ","IP protocol / SCTP scan","TCP port scan-এর বদলে ভিন্ন protocol পরীক্ষা করে; কেবল নির্দিষ্ট অনুমোদিত lab-এ।"]]},"note":"এই পাঠের হাতে-কলমে অনুশীলন `-sT` এবং নিজের loopback-এ সীমিত। Spoofing, decoy, fragmentation বা stealth উদ্দেশ্যে ব্যবহার এখানে শেখানো হচ্ছে না।"},
      {"heading":"Port state পড়ুন: ফলাফল মানেই vulnerability নয়","paragraphs":["Nmap port state হলো scan type, scanner-এর অবস্থান ও network response অনুযায়ী একটি পর্যবেক্ষণ। Firewall, packet loss, rate limit বা service পরিবর্তনে ফল বদলাতে পারে। State দেখে vulnerability বা exploitability নিশ্চিত বলা যায় না।"],"table":{"headers":["State","Nmap কী বুঝেছে","পরবর্তী ব্যাখ্যা"],"rows":[["open","কোনো application connection/packet গ্রহণ করছে","Service inventory করুন; এটি নিজে দুর্বলতার প্রমাণ নয়।"],["closed","Host উত্তর দিয়েছে, তবে listener পাওয়া যায়নি","সময় বা configuration বদলালে অবস্থা বদলাতে পারে।"],["filtered","Filter/বাধার কারণে open না closed নির্ধারণ করা যায়নি","প্রমাণের অভাবকে closed ধরে নেবেন না।"],["unfiltered","Probe-এ response এসেছে, কিন্তু open/closed নির্ণয় হয়নি","বিশেষ করে ACK scan-এর প্রেক্ষাপট মনে রাখুন।"],["open|filtered","Open ও filtered আলাদা করা যায়নি","UDP-তে প্রায়ই দেখা যায়; অনিশ্চয়তা লিখুন।"],["closed|filtered","Closed ও filtered আলাদা করা যায়নি","কিছু scan ধরনের ক্ষেত্রে দেখা যায়।"]]}},
      {"heading":"Service, version ও OS detection","paragraphs":["`-sV` port-এ service probe পাঠিয়ে application ও সম্ভাব্য version শনাক্তের চেষ্টা করে। `--version-light` কম probe ব্যবহার করতে পারে; দ্রুত হলেও তথ্য অসম্পূর্ণ হতে পারে। Banner বা version string ভুল/পরিবর্তিত হতে পারে, তাই version hint-কে vulnerability verdict বলা যাবে না।","`-O` TCP/IP response থেকে OS অনুমান করে এবং কিছু পরিবেশে elevated privilege বা উপযুক্ত response দরকার হয়। `-A` একাধিক ফিচার—OS detection, version detection, default NSE script ও traceroute—একসঙ্গে চালায়; এটি হালকা বা নীরব scan নয়।"],"table":{"headers":["অপশন","কাজ","ফল কীভাবে পড়বেন"],"rows":[["-sV","Service/version detection","শুধু hint; আলাদা evidence দিয়ে যাচাই করুন।"],["--version-light","কম intensity-তে version probe","দ্রুত হতে পারে, কিন্তু detection অসম্পূর্ণ থাকতে পারে।"],["-O","OS fingerprinting","অনুমান; সব host-এ নির্ভরযোগ্য নয়।"],["-A","কয়েকটি advanced feature একত্রে","প্রভাব ও traffic বাড়ে; beginner lab-এ বাদ দিন।"]]},"code":"nmap -sT -sV --version-light -p 3000 127.0.0.1","output":"3000/tcp open  http  (service/version hint; app অনুযায়ী আলাদা)","note":"Service probe চালানোর আগে local app-এর owner এবং অনুমোদিত test window নিশ্চিত করুন।"},
      {"heading":"NSE: script বাছাইয়ের আগে প্রভাব জানুন","paragraphs":["Nmap Scripting Engine (NSE) service ও network check-কে script দিয়ে বাড়ায়। `-sC` default script চালায়; `--script` নির্দিষ্ট script বা category বেছে নিতে পারে। প্রতিটি script কী করে আগে `--script-help` ও অফিসিয়াল বিবরণে পড়ুন।","Nmap-এর NSE script sandbox-এ চলে না। Script ভুল বা ক্ষতিকরভাবে target-কে প্রভাবিত করতে পারে; তাই third-party script চালাবেন না, এবং নামের মধ্যে `safe` থাকলেই ঝুঁকি শূন্য ধরে নেবেন না।"],"table":{"headers":["Category","সাধারণ উদ্দেশ্য","ব্যবহারনীতি"],"rows":[["default / safe","সাধারণ তথ্য বা তুলনামূলক কম-ঝুঁকির check","তবু script-এর আচরণ ও target অনুমতি যাচাই করুন।"],["discovery / version","তথ্য সংগ্রহ ও service detection","Scope এবং privacy সীমা মানুন।"],["auth","Authentication-সম্পর্কিত check","লিখিত অনুমতি ও test credential ছাড়া নয়।"],["vuln","কিছু পরিচিত vulnerability check","ফলাফল নিশ্চিত vulnerability নয়; যাচাই দরকার।"],["brute / dos / exploit / intrusive","বিঘ্ন, authentication attempt বা exploit-সম্পর্কিত কাজ","এই পাঠে চালাবেন না; স্পষ্ট অনুমতি ও নিয়ন্ত্রিত lab ছাড়া নয়।"],["external / broadcast / fuzzer","বাইরের service, broadcast বা input test","তৃতীয় পক্ষ/অতিরিক্ত host জড়াতে পারে; আলাদা review দরকার।"]]},"code":"nmap --script-help \"default,safe\"","output":"মেলে এমন script-এর বিবরণ ও category দেখায়; target scan করে না","note":"এখানে NSE script চালানোর উদাহরণ ইচ্ছাকৃতভাবে রাখা হয়নি; help পড়াই প্রথম ধাপ।"},
      {"heading":"Timing ও performance: network-কে বিবেচনা করুন","paragraphs":["Timing option scan duration ও probe pattern-কে လবণীয়ভাবে প্রভাবিত করে। `-T3` default template; `-T0` থেকে `-T5` পর্যন্ত ধীর থেকে দ্রুততর profile আছে। দ্রুততর মানেই ভালো নয়—packet loss, load, rate limit ও অসম্পূর্ণ ফল বিবেচনা করুন।","`--scan-delay`, `--max-rate`, `--host-timeout` ও retry-সংক্রান্ত option scan-এর গতি বা অপেক্ষার সময় বদলায়। এগুলো owner-নির্ধারিত rate limit মানার জন্য ব্যবহার করুন; monitoring বা throttling এড়ানোর উদ্দেশ্যে নয়।"],"table":{"headers":["অপশন","কাজ","সতর্কতা"],"rows":[["-T0 … -T5","Timing template","Default `-T3`; দ্রুত template বেশি traffic দিতে পারে।"],["--scan-delay","Probe-র মধ্যে বিরতি","Network owner-এর অনুমোদিত সীমা অনুসরণ করুন।"],["--max-rate","Probe পাঠানোর সর্বোচ্চ লক্ষ্য হার","বাস্তব network capacity ও অনুমতি বিবেচনা করুন।"],["--host-timeout","একটি target-এর scan-এর সর্বোচ্চ সময়","Timeout মানে ফল অসম্পূর্ণ হতে পারে।"],["--stats-every","নিয়মিত progress দেখানো","এটি report quality বাড়ায় না; শুধু অগ্রগতি দেখায়।"]]},"code":"nmap -sT -T3 -p 3000 127.0.0.1","note":"Timing option কখনো scope বা অনুমতির বিকল্প নয়। Shared/production network-এ owner-এর rate limit মানুন।"},
      {"heading":"Firewall ও advanced packet option: ধারণা মাত্র","paragraphs":["`-sA`-এর মতো scan firewall/filter response সম্পর্কে সীমিত ধারণা দিতে পারে, তবে কোন port application-এ open তা সরাসরি নির্ধারণ করে না। ফল network-এর অবস্থান ও firewall rule অনুযায়ী ভিন্ন হতে পারে।","Nmap-এ source address, source port, decoy, packet fragmentation, custom flag বা idle scan-সংক্রান্ত advanced option আছে। এগুলো attribution আড়াল, filter এড়ানো বা তৃতীয় পক্ষকে জড়ানোর কাজে ব্যবহার হতে পারে। এই পাঠে কেবল তাদের অস্তিত্ব ও ঝুঁকির কথা বলা হলো—ব্যবহার নির্দেশনা বা command দেওয়া হচ্ছে না।"],"bullets":["লিখিত অনুমতি ছাড়া firewall/IDS-এ বিশেষ probe বা packet manipulation করবেন না।","Decoy, spoofed source, idle-scan intermediary বা fragmentation ব্যবহার করে attribution গোপন করার চেষ্টা করবেন না।","Filtering-এর ফল report করলে scanner কোথা থেকে চালানো হয়েছে এবং অনিশ্চয়তা স্পষ্ট লিখুন।"],"note":"নিরাপত্তা নিয়ন্ত্রণ পরীক্ষা করতে চাইলে test window, source host, expected traffic, monitoring ও stop condition আগে owner-এর সঙ্গে স্থির করুন।"},
      {"heading":"IPv6, output format ও report","paragraphs":["Nmap `-6` দিয়ে IPv6 scan করতে পারে। IPv6 loopback হলো `::1`; এটি নিজের local machine-এ সীমাবদ্ধ। IPv4 ও IPv6-এ firewall/configuration আলাদা হতে পারে, তাই একটির ফল অন্যটির প্রমাণ নয়।","`-oN` পাঠযোগ্য normal text, `-oX` XML, এবং `-oA` এক basename-এ একাধিক format সংরক্ষণ করে। `--reason` কোনো state শ্রেণিবদ্ধ করার কারণ দেখাতে পারে; XML automation-এ সুবিধাজনক হলেও সংবেদনশীল host ও service তথ্য থাকে।"],"table":{"headers":["Option","Output","কখন কাজে লাগে"],"rows":[["-oN file.nmap","Normal text","মানুষের পড়া ও case note।"],["-oX file.xml","XML","অন্যান্য অনুমোদিত tool বা script-এ parse করা।"],["-oA basename","একাধিক প্রধান format","একই scan-এর ফল আলাদা format-এ রাখা।"],["--reason","State-এর কারণ","Nmap কোন response দেখে state দিয়েছে তা বোঝা।"],["-6","IPv6 mode","শুধু scope-এ থাকা IPv6 address; local exercise-এ `::1`।"]]},"code":"mkdir -p reports\nnmap -6 -sT -p 3000 ::1 -oN reports/nmap-ipv6.txt\nnmap -sT -sV --version-light -p 3000 127.0.0.1 --reason -oA reports/nmap-local","output":"reports/nmap-ipv6.txt\nreports/nmap-local.nmap\nreports/nmap-local.xml\nreports/nmap-local.gnmap","note":"রিপোর্টে IP, hostname, banner ও সম্ভাব্য সংবেদনশীল তথ্য থাকতে পারে। সংরক্ষণ ও share করার আগে redact করুন।"},
      {"heading":"নিরাপদ শেখার ক্রম ও ফল যাচাই","paragraphs":["Nmap শেখার সময় আগে scope ও target syntax বুঝুন, তারপর host discovery এবং একক port scan করুন। Service/version hint, report এবং uncertainty নথিবদ্ধ করুন। এরপরই অনুমোদিত lab-এ আরও advanced option সম্পর্কে পড়ুন।","Nmap পুরো vulnerability scanner নয়। Port open বা পুরোনো version দেখা গেলে সেটি নিজে exploitability প্রমাণ করে না; সংশ্লিষ্ট asset, configuration, vendor advisory ও নিয়ন্ত্রিত manual verification দরকার। Web application-এর SQL injection, XSS, authentication বা business-logic flaw Nmap দিয়ে নির্ভরযোগ্যভাবে মূল্যায়ন করা যায় না।"],"bullets":["কমান্ড, Nmap version, তারিখ/সময়, অনুমোদিত target, source location ও option লিখুন।","Observed result এবং inference আলাদা করুন; ambiguous state-কে uncertain বলুন।","Unexpected host, service, personal data, slowdown বা scope mismatch দেখলে scan থামান এবং owner-কে জানান।","Report-এ minimum evidence রাখুন; credential, token ও personal data redact করুন।"]},
      ],
  },
  {
    slug: 'enumeration', title: 'Scanning & Enumeration: সার্ভিস থেকে প্রাসঙ্গিকতা', category: 'Recon ও Scan', phase: 'scanning', level: 'মাঝারি', time: '১০ মিনিট',
    summary: 'কম সংখ্যক অনুমোদিত endpoint-এ service ও web response মেপে inventory সমৃদ্ধ করুন।', tags: ['Enumeration', 'HTTP', 'Service'],
    keywords: 'enumeration এনুমারেশন service banner header robots endpoint', image: '/assets/image-3.webp', imageAlt: 'ওয়েব অ্যাপের endpoint map', imageLabel: 'ENUMERATION / ONE SERVICE AT A TIME',
    refs: ['nmap', 'wstg'],
    sections: [
      { heading: 'Enumeration কী যোগ করে?', paragraphs: ['Scanning-এ service বা port দেখা যায়। Enumeration-এ সেই অনুমোদিত service-এর response, version hint এবং প্রকাশ্য configuration আরও বিস্তারিতভাবে নথিবদ্ধ হয়। তথ্য সংগ্রহের সময়ও request rate ও scope সীমা মানা জরুরি।'],
      },
      { heading: 'নিজের lab-এর HTTP response দেখুন', paragraphs: ['লোকাল Juice Shop বা আপনার test app-এ একটি সাধারণ HTTP request পাঠান। অতিরিক্ত path guessing বা brute discovery না করে পরিচিত endpoint দিয়ে শুরু করুন।'], code: 'curl -i http://127.0.0.1:3000/\ncurl -i http://127.0.0.1:3000/robots.txt', output: 'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nX-Content-Type-Options: nosniff', note: 'নমুনা header শিক্ষামূলক; আপনার application ভিন্ন response দিতে পারে। `robots.txt`-এ থাকা path-ও আলাদাভাবে অনুমোদিত target হতে হবে।' },
      { heading: 'প্রমাণ আলাদা রাখুন', paragraphs: ['প্রতিটি observation-এর সঙ্গে source URL, status code, তারিখ ও response header-এর প্রয়োজনীয় অংশ রাখুন। Banner বা header একা exploitability প্রমাণ করে না; পরে vulnerability assessment-এ তা যাচাই হবে।'],
      },
    ],
  },
  {
    slug: 'packet-analysis', title: 'Packet capture: নিজের loopback traffic পড়ুন', category: 'বিশ্লেষণ', phase: 'scanning', level: 'মাঝারি', time: '১১ মিনিট',
    summary: 'Wireshark বা tshark দিয়ে কেবল নিজস্ব lab traffic capture ও filter করুন।', tags: ['Wireshark', 'Packet capture', 'Network analysis'],
    keywords: 'packet capture প্যাকেট ক্যাপচার network analysis wireshark tshark display filter', image: '/assets/image-2.webp', imageAlt: 'ল্যাব নেটওয়ার্ক প্যাকেট বিশ্লেষণের চিত্র', imageLabel: 'PACKET LAB / LOOPBACK',
    refs: ['wireshark'],
    sections: [
      { heading: 'Capture-এর আগে interface বাছুন', paragraphs: ['Packet capture-এ network traffic ফাইলে জমা হতে পারে। তাই loopback interface (`lo`) এবং নিজের lab app-এ সীমাবদ্ধ থাকুন। Wireshark-এর capture filter আর display filter আলাদা উদ্দেশ্যে ব্যবহৃত হয়; UI-তে প্রয়োগের আগে অফিসিয়াল গাইড দেখুন.'] },
      { heading: 'দশ সেকেন্ডের loopback capture', paragraphs: ['Terminal-এ capture শুরু করে অন্য terminal থেকে lab app-এ একটি request দিন। Capture ফাইলটি ব্যক্তিগত data রাখতে পারে—এটি শেয়ার করার আগে পরীক্ষা ও redaction করুন।'], code: 'sudo tshark -i lo -a duration:10 -w lab.pcapng', output: 'Capturing on lo\nFile: lab.pcapng\n(১০ সেকেন্ড পরে capture বন্ধ হবে)', note: 'দ্বিতীয় terminal-এ কেবল নিজের app-এ `curl -I http://127.0.0.1:3000/` চালান। Shared Wi-Fi বা অন্যের interface capture করবেন না।' },
      { heading: 'Wireshark display filter', paragraphs: ['Capture খোলার পর Display Filter-এ নিজের loopback IP দিয়ে traffic সীমিত করুন। HTTP traffic-এ session cookie বা form data স্পষ্ট থাকতে পারে; capture-টি গোপনীয় ধরে নিন।'], code: 'ip.addr == 127.0.0.1', bullets: ['Source, destination, protocol, সময় ও response মিলিয়ে দেখুন।', 'TLS encryption থাকলে payload-কে plain text ধরে নেবেন না।', 'শেখার পর অপ্রয়োজনীয় capture নিরাপদে মুছুন।'] },
    ],
  },
  {
    slug: 'vulnerability-assessment', title: 'Vulnerability Assessment: finding যাচাই', category: 'বিশ্লেষণ', phase: 'assessment', level: 'মাঝারি', time: '১০ মিনিট',
    summary: 'Scanner alert-কে সত্য ধরে না নিয়ে ছোট, নিরাপদ, পুনরাবৃত্তিযোগ্য যাচাই করুন।', tags: ['Assessment', 'False positive', 'OWASP'],
    keywords: 'vulnerability assessment দুর্বলতা যাচাই scan false positive risk', image: '/assets/image-3.webp', imageAlt: 'ওয়েব অ্যাপের test point যাচাই', imageLabel: 'ASSESSMENT / EVIDENCE FIRST',
    refs: ['wstg'],
    sections: [
      { heading: 'Alert আর confirmed finding এক নয়', paragraphs: ['Automated scanner সম্ভাব্য ঝুঁকি চিহ্নিত করে। একজন tester-কে তা scope-এর ভিতরে manual evidence দিয়ে যাচাই করতে হয়। OWASP WSTG web app পরীক্ষাকে পরিকল্পিত test category হিসেবে সাজায়; প্রতিটি test-এ অনুমতি ও data safety বজায় রাখুন।'],
      },
      { heading: 'Finding যাচাইয়ের ক্ষুদ্র workflow', paragraphs: ['Lab-only finding হলে নিরাপদে পুনরাবৃত্তিযোগ্য request, expected result এবং actual result লিখুন। কোনো live customer data পড়বেন না।'], bullets: ['Asset ও endpoint scope-এ আছে কি না নিশ্চিত করুন।', 'একটি মাত্র non-destructive test দিয়ে claim যাচাই করুন।', 'Version banner বা scanner score-কে একমাত্র প্রমাণ ধরবেন না।', 'প্রমাণ যথেষ্ট না হলে “Needs further validation” লিখুন।'] },
      { heading: 'Risk ও প্রভাব আলাদা করে লিখুন', paragraphs: ['Severity নির্ভর করে exploitability, impact, affected asset ও control-এর ওপর। সম্ভাব্য ক্ষতিকে observed impact বলে উপস্থাপন করবেন না। তথ্য অসম্পূর্ণ হলে uncertainty লিখুন।'], note: 'এই পাঠের অনুশীলন কেবল বিচ্ছিন্ন Juice Shop বা নিজের test app-এ। Production scanner চালানোও scope ও change window ছাড়া গ্রহণযোগ্য নয়।' },
    ],
  },
  {
    slug: 'password-hashes', title: 'Hash ও password recovery: “decode” নয়, অনুমোদিত audit', category: 'পরিচয় ও পাসওয়ার্ড', phase: 'assessment', level: 'মাঝারি', time: '৯ মিনিট',
    summary: 'Hash একমুখী digest; একটি কৃত্রিম demo hash offline যাচাই করে password storage শিখুন।', tags: ['Hash', 'Password storage', 'Offline'],
    keywords: 'password decoding hash cracking recovery sha256 john পাসওয়ার্ড', image: null, imageAlt: '', imageLabel: 'HASH / SYNTHETIC DEMO', visual: 'hash',
    refs: [],
    sections: [
      { heading: 'Hash-কে সাধারণত decode করা যায় না', paragraphs: ['Hash function input থেকে নির্দিষ্ট দৈর্ঘ্যের digest তৈরি করে; encryption-এর মতো একই চাবি দিয়ে আগের plaintext ফেরত পাওয়ার ব্যবস্থা এটি নয়। “Password decoding” বলে যা বলা হয় তা সাধারণত নিজের synthetic hash-এর offline recovery test—অনুমতি ছাড়া কোনো credential file ব্যবহার করা যাবে না।'],
      },
      { heading: 'নিজে বানানো test string-এর SHA-256', paragraphs: ['এই command একটি পরিচিত, কৃত্রিম lab string-এর digest তৈরি করে। বাস্তব user password বা production hash এখানে ব্যবহার করবেন না।'], code: "printf '%s\\n' 'lab-pass-123' | sha256sum", output: 'নমুনা SHA-256 digest:\n(আপনার terminal-এ ৬৪টি hexadecimal অক্ষর দেখাবে)', note: 'SHA-256 সাধারণ file checksum-এর জন্য; password storage-এ একে একা ব্যবহার করা উচিত নয়। Password storage-এর জন্য Argon2id, scrypt, bcrypt বা PBKDF2-এর মতো purpose-built, salted, costed scheme বিবেচনা করুন।' },
      { heading: 'নিজের hash-এ সীমিত offline recovery demo', paragraphs: ['John the Ripper আগে থেকেই lab machine-এ থাকলে, միայն just-generated toy digest-কে tiny wordlist দিয়ে যাচাই করুন। Wordlist-এ test string নিজেই রাখা হয়েছে, তাই expected match-টি জানা।'], code: "printf '%s\\n' 'lab-pass-123' | sha256sum | cut -d' ' -f1 > demo.hash\nprintf '%s\\n' 'not-it' 'lab-pass-123' > tiny-wordlist.txt\njohn --format=raw-sha256 --wordlist=tiny-wordlist.txt demo.hash\njohn --show --format=raw-sha256 demo.hash", output: 'নমুনা: ১টি নিজস্ব demo hash match', note: 'এই পাঠ কেবল নিজে তৈরি করা hash ও দুই লাইনের local wordlist-এর জন্য। কোনো online login-এ guessing, অন্যের hash dump, stolen credential বা leaked password list পরীক্ষা করবেন না।' },
    ],
  },
  {
    slug: 'controlled-bruteforce', title: 'Brute-force ধারণা: online নয়, tiny offline demo', category: 'পরিচয় ও পাসওয়ার্ড', phase: 'assessment', level: 'অগ্রসর', time: '৮ মিনিট',
    summary: 'অনুমোদিত toy hash-এ search-space, rate limit ও প্রতিরক্ষার প্রভাব নিরাপদে বুঝুন।', tags: ['Brute force', 'Rate limit', 'Offline lab'],
    keywords: 'brute force ব্রুট ফোর্স guessing password online login offline rate limit', image: null, imageAlt: '', imageLabel: 'CONTROLLED / OFFLINE ONLY', visual: 'bruteforce',
    refs: [],
    sections: [
      { heading: 'কেন online brute-force নয়', paragraphs: ['Online password guessing বাস্তব account lockout, service disruption ও ব্যক্তিগত অ্যাকাউন্টে অননুমোদিত প্রবেশ ঘটাতে পারে। এই পাঠে কোনো login endpoint পরীক্ষা করা হবে না। আমরা আগের পাঠের মতো নিজের toy hash-এ ক্ষুদ্র offline wordlist ব্যবহার করে ধারণাটি বুঝব।'],
      },
      { heading: 'খুব ছোট search-space-এর প্রভাব', paragraphs: ['একটি offline hash candidate-এর digest-এর সঙ্গে তুলনা করে। Secret ছোট হলে candidate দ্রুত শেষ হয়; প্রতিটি অতিরিক্ত character ও সম্ভাব্য character set কাজ বাড়ায়। Lab-এ মাত্র দুই candidate রাখুন।'], code: "printf '%s\\n' 'demo-42' | sha256sum | cut -d' ' -f1 > owned.hash\nprintf '%s\\n' 'demo-41' 'demo-42' > two-entries.txt\njohn --format=raw-sha256 --wordlist=two-entries.txt owned.hash", output: 'নমুনা: ক্ষুদ্র local wordlist-এ কৃত্রিম hash যাচাই', note: 'এই কমান্ড online service-এ request পাঠায় না। এটি অন্যের hash বা password file-এ চালানো, wordlist বাড়ানো, অথবা shared system-এ benchmark করা এই অনুশীলনের অংশ নয়।' },
      { heading: 'প্রতিরক্ষায় কী বদলায়?', paragraphs: ['Online service-এ MFA, per-account ও per-network rate limit, breached-password screening, monitoring এবং নিরাপদ recovery workflow সাহায্য করে। Server-side password hashing-এ unique salt এবং যথেষ্ট work factor দরকার। Lockout policy এমনভাবে নকশা করতে হয় যাতে তা নিজেই denial-of-service ঝুঁকি না বাড়ায়।'],
      },
    ],
  },
  {
    slug: 'web-exploitation-lab', title: 'Exploitation: বিচ্ছিন্ন Juice Shop lab-এ যাচাই', category: 'ওয়েব ল্যাব', phase: 'exploitation', level: 'মাঝারি', time: '১২ মিনিট',
    summary: 'ইচ্ছাকৃতভাবে দুর্বল প্রশিক্ষণ অ্যাপে, সীমিত proof দিয়ে vulnerability আচরণ বুঝুন।', tags: ['Exploitation', 'Juice Shop', 'Isolated lab'],
    keywords: 'exploitation exploit web lab juice shop owasp ঝুঁকি', image: '/assets/image-3.webp', imageAlt: 'ওয়েব অ্যাপ পরীক্ষার একটি বিচ্ছিন্ন lab চিত্র', imageLabel: 'EXPLOITATION / LOCAL CONTAINER',
    refs: ['wstg', 'juice'],
    sections: [
      { heading: 'প্রথমে ইচ্ছাকৃত vulnerable app চালু করুন', paragraphs: ['OWASP Juice Shop প্রশিক্ষণ ও security tool testing-এর জন্য তৈরি ইচ্ছাকৃতভাবে দুর্বল ওয়েব অ্যাপ। Docker থাকলে bind address `127.0.0.1`-এ সীমাবদ্ধ রেখে নিজের মেশিনে চালান।'], code: 'docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop', output: 'Starting OWASP Juice Shop\nOpen http://localhost:3000', note: 'Docker foreground-এ চলবে। থামাতে `Ctrl+C` চাপুন। Local bind না বদলে `0.0.0.0` করবেন না; তাহলে আপনার lab অন্য network থেকে reachable হতে পারে।' },
      { heading: 'একটি finding নিরাপদে validate করুন', paragraphs: ['ব্রাউজারে `http://127.0.0.1:3000` খুলে app-এর নিজস্ব training challenges ও companion guide অনুসরণ করুন। একটি challenge বেছে আগে hypothesis লিখুন, তারপর ন্যূনতম request দিয়ে আচরণ দেখুন।'], bullets: ['প্রতি পরীক্ষার আগে নিশ্চিত করুন browser-এ local lab-ই খোলা।', 'কোনো বাস্তব login, production URL বা third-party integration-এ পরীক্ষা নয়।', 'Exploit প্রমাণে শুধু প্রয়োজনীয় harmless evidence নিন।', 'Unexpected host, personal data বা lab escape দেখলে সঙ্গে সঙ্গে থামুন।'] },
      { heading: 'সফল প্রমাণের পর থামুন', paragraphs: ['Finding বোঝার জন্য shell, persistence, data export বা অন্য account-এ এগোনোর দরকার নেই। Impact যাচাইও আলাদা অনুমতিতে, ক্ষুদ্রতম non-destructive proof দিয়ে করতে হয়। Lab-টি বন্ধ করে পরে root cause ও remediation-এ যান।'],
      },
    ],
  },
  {
    slug: 'post-exploitation-impact', title: 'Post-exploitation: impact বিশ্লেষণ, data নয়', category: 'ওয়েব ল্যাব', phase: 'impact', level: 'অগ্রসর', time: '৯ মিনিট',
    summary: 'ঝুঁকির সম্ভাব্য প্রভাব দেখান, কিন্তু বাস্তব ডেটা দেখা বা persistence ছাড়াই।', tags: ['Impact analysis', 'Evidence', 'Data safety'],
    keywords: 'post exploitation impact analysis প্রভাব ডেটা persistence exfiltration', image: '/assets/image-3.webp', imageAlt: 'প্রভাব বিশ্লেষণের সীমিত ও পরীক্ষিত নেটওয়ার্ক পথ', imageLabel: 'IMPACT / MINIMUM PROOF',
    refs: ['wstg'],
    sections: [
      { heading: 'Post-exploitation মানে সীমাহীন প্রবেশ নয়', paragraphs: ['অবস্থাপনার প্রভাব বোঝাতে কোনো real user record, secret বা অন্য system সংগ্রহ করবেন না। Authorized lab-এ challenge state বা synthetic account দিয়ে সর্বনিম্ন প্রমাণ সংগ্রহ করুন। বাস্তব engagement-এ প্রতিটি অতিরিক্ত ধাপের জন্য scope ও client-এর অনুমতি যাচাই করুন।'], bullets: ['Synthetic account এবং dummy data ব্যবহার করুন।', 'প্রয়োজনীয় ন্যূনতম screenshot বা response snippet রাখুন।', 'Cookie, token, password ও personal data report-এ redact করুন।', 'Persistence, lateral movement, data exfiltration বা service disruption এই শিক্ষামূলক lab-এর বাইরে।'] },
      { heading: 'Impact matrix লিখুন', paragraphs: ['Finding, affected role, lab-এ দেখা আচরণ, সম্ভাব্য business consequence এবং certainty আলাদা করে লিখুন। Lab-এ দেখা ফলকে production-এ ঘটেছে বলে দাবি করবেন না।'], code: 'Observed: test account-এর profile route অনুমোদিত scope-এ দেখা গেছে\nData used: synthetic lab profile only\nPotential impact: অনুমোদন-নিয়ন্ত্রণ দুর্বল হলে অন্য user-এর তথ্য ঝুঁকিতে পড়তে পারে\nConfidence: lab-এ confirmed; production impact not tested', note: '“Potential impact” শব্দটি ব্যবহার করুন যখন বাস্তব business data বা live environment যাচাই করা হয়নি।' },
      { heading: 'পরীক্ষা নিরাপদে বন্ধ করুন', paragraphs: ['প্রমাণ নেওয়া শেষ হলে lab state reset করুন, temporary account বন্ধ করুন এবং capture-এ credential থাকলে নিরাপদে মুছুন। Scope-এর বাইরে কিছু দেখা গেলে আরও অনুসন্ধান নয়—থামুন ও engagement contact-কে জানান।'],
      },
    ],
  },
  {
    slug: 'pentest-reporting', title: 'Reporting: finding-কে কার্যকর প্রতিবেদনে রূপ দিন', category: 'রিপোর্ট ও প্রতিকার', phase: 'reporting', level: 'মাঝারি', time: '১০ মিনিট',
    summary: 'Risk, impact, evidence ও remediation-কে পরিষ্কার, পুনরুৎপাদনযোগ্য ভাষায় লিখুন।', tags: ['Reporting', 'Risk', 'Evidence'],
    keywords: 'reporting penetration test report finding risk impact documentation template প্রতিবেদন', image: '/assets/image-4.webp', imageAlt: 'নিরাপত্তা প্রতিবেদন ও retest-এর ইলাস্ট্রেশন', imageLabel: 'REPORT / EVIDENCE TO ACTION',
    refs: ['wstg'],
    sections: [
      { heading: 'পাঠককে সিদ্ধান্ত নিতে সাহায্য করুন', paragraphs: ['ভালো report-এ technical evidence থাকবে, কিন্তু সিদ্ধান্তের জন্য দরকারি ভাষায় লেখা হবে। প্রতিটি finding-এ asset, scope, শর্ত, observed result, impact, severity rationale ও fix থাকবে। অনুমান আর পর্যবেক্ষণ আলাদা করে লিখুন।'],
      },
      { heading: 'একটি finding template', paragraphs: ['নিচের template-টি lab-এ কৃত্রিম উদাহরণ দিয়ে পূরণ করুন। বাস্তব প্রতিবেদন পাঠানোর আগে client-এর approved format ও handling rule অনুসরণ করুন।'], code: 'Finding ID: WEB-01\nশিরোনাম: অনিরাপদ cookie attribute (উদাহরণ)\nAsset / scope: http://127.0.0.1:3000 — local lab\nSeverity: Medium — rationale: session exposure শর্তসাপেক্ষ\nEvidence: sanitized response header; test time recorded\nImpact: shared browser context-এ session ঝুঁকিতে পড়তে পারে\nRecommendation: Secure, HttpOnly ও উপযুক্ত SameSite; HTTPS enforce\nRetest: সংশোধনের পর header ও session behavior পুনরায় যাচাই', note: 'উদাহরণটি কৃত্রিম। আপনার application-এ ওই finding আছে—এমন দাবি নয়। Cookie attribute সবসময় app-এর deployment ও threat model অনুযায়ী যাচাই করুন।' },
      { heading: 'Evidence-কে পরিষ্কার রাখুন', paragraphs: ['Screenshot-এ URL, test account ও time থাকলে তা স্পষ্ট করুন। Sensitive values ঢাকুন। CVSS বা অন্য risk rubric ব্যবহার করলে version, assumptions এবং environmental context নোট করুন; score-কে impact-এর বিকল্প বানাবেন না।'],
      },
    ],
  },
  {
    slug: 'remediation-retesting', title: 'Remediation & Retesting: fix সত্যিই কাজ করল?', category: 'রিপোর্ট ও প্রতিকার', phase: 'remediation', level: 'মাঝারি', time: '৮ মিনিট',
    summary: 'Root cause অনুযায়ী fix দিন; একই scope ও শর্তে অনুমোদিত retest-এ যাচাই করুন।', tags: ['Remediation', 'Retesting', 'Verification'],
    keywords: 'remediation retesting retest প্রতিকার fix পুনঃপরীক্ষা', image: '/assets/image-4.webp', imageAlt: 'প্রতিকার ও retest যাচাইয়ের চিত্র', imageLabel: 'REMEDIATION / RETEST',
    refs: ['wstg'],
    sections: [
      { heading: 'Fix-টি root cause-এ দিন', paragraphs: ['শুধু scanner finding লুকানো বা response text বদলানো remediation নয়। Developer ও owner-এর সঙ্গে root cause, affected path, control owner এবং regression test মিলিয়ে fix পরিকল্পনা করুন।'], bullets: ['Affected component ও code path চিহ্নিত করুন।', 'Secure default ও server-side authorization enforce করুন।', 'Fix-এর পাশাপাশি regression test লিখুন।', 'Production change-এর আগে change-management প্রক্রিয়া অনুসরণ করুন।'] },
      { heading: 'Retest-এ একই শর্ত পুনরায় যাচাই', paragraphs: ['Retest কেবল অনুমোদিত scope-এ চালান। আগের মতো একই request, role, environment ও observation পুনরায় করে দেখুন। Fix প্রমাণ করতে গিয়ে নতুন exploit chain খুলবেন না।'], code: 'Retest note:\nScope: অনুমোদিত local staging URL\nOriginal finding: WEB-01\nBefore: Secure attribute অনুপস্থিত (কৃত্রিম demo)\nAfter: Secure attribute উপস্থিত; HTTPS response যাচাই\nResult: Fixed in tested condition\nResidual risk: proxy / deployment config-এ আলাদা যাচাই প্রয়োজন', note: '“Fixed” বলতে কেবল যে environment ও শর্ত retest হয়েছে সেটুকুই বোঝান। Production retest-এর জন্য আলাদা অনুমতি ও change window লাগতে পারে।' },
      { heading: 'কাজ বন্ধ করুন ও শিখন নথিবদ্ধ করুন', paragraphs: ['Retest result, evidence location, remaining uncertainty ও owner acknowledgment নথিভুক্ত করুন। প্যাকেট capture, temporary credential ও test account retention rule অনুযায়ী বন্ধ বা মুছুন।'],
      },
    ],
  },
];

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
}

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

function buildPracticalFlow(article) {
  const guide = PRACTICAL_GUIDES[article.slug];
  const map = createElement('section', 'workflow-map');
  map.setAttribute('aria-labelledby', 'workflow-map-title');
  const heading = createElement('div', 'workflow-heading');
  heading.append(createElement('p', 'eyebrow', 'THE PRACTICAL ROUTE / 03 STEPS'), createElement('h2', '', 'এই ব্লগের তিন ধাপ'));
  map.append(heading);

  const grid = createElement('div', 'workflow-grid');
  const findCard = createElement('section', 'workflow-card workflow-find');
  findCard.append(createElement('span', 'workflow-number', '০১ / দেখুন'), createElement('h3', '', 'কী খুঁজব, কেন খুঁজব?'));
  findCard.append(createElement('strong', 'workflow-label', 'যা খুঁজবেন'), createElement('p', '', guide.focus));
  findCard.append(createElement('strong', 'workflow-label', 'কেন'), createElement('p', 'workflow-why', guide.why));

  const checkCard = createElement('section', 'workflow-card workflow-check');
  checkCard.append(createElement('span', 'workflow-number', '০২ / পরীক্ষা করুন'), createElement('h3', '', 'কমান্ড বা কোথায় যাব?'));
  checkCard.append(createElement('p', 'workflow-intro', 'নিচের প্রতিটি ধাপ খুললে সংশ্লিষ্ট কমান্ড, UI/পর্যবেক্ষণ, নমুনা ফল ও নিরাপদ নোটে সরাসরি যাবেন।'));
  const checks = createElement('div', 'workflow-checks');
  article.sections.forEach((section, index) => {
    const sectionId = `part-${index + 1}`;
    const kind = section.code ? 'কমান্ড ও নমুনা ফল' : section.bullets ? 'চেকলিস্ট / পরীক্ষা' : 'ব্যাখ্যা / পর্যবেক্ষণ';
    const jump = createElement('button', 'workflow-jump');
    jump.type = 'button';
    jump.append(createElement('strong', '', section.heading), createElement('small', '', `${kind} ↓`));
    if (section.code) jump.append(createElement('code', 'workflow-command-preview', section.code.split('\n')[0]));
    jump.addEventListener('click', () => {
      const destination = document.getElementById(sectionId);
      if (!destination) return;
      destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
      destination.focus({ preventScroll: true });
    });
    checks.append(jump);
  });
  checkCard.append(checks);

  const nextCard = createElement('section', 'workflow-card workflow-next-card');
  nextCard.append(createElement('span', 'workflow-number', '০৩ / ফল অনুযায়ী'), createElement('h3', '', 'এরপর কোথায় যাব?'));
  const outcomes = createElement('div', 'workflow-outcomes');
  guide.next.forEach((outcome) => {
    const row = createElement('div', 'workflow-outcome');
    row.append(createElement('strong', '', outcome.when), createElement('p', '', outcome.action));
    if (outcome.slug) {
      const nextArticle = articles.find((item) => item.slug === outcome.slug);
      if (nextArticle) {
        const link = createElement('a', 'workflow-next-link', `পরের পাঠ: ${nextArticle.title} ↗`);
        link.href = `#/article/${nextArticle.slug}`;
        row.append(link);
      }
    }
    outcomes.append(row);
  });
  nextCard.append(outcomes);
  grid.append(findCard, checkCard, nextCard);
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
  articleContent.append(buildPracticalFlow(article));

  const layout = createElement('div', 'article-layout');
  const body = createElement('div', 'article-body');
  const tocList = createElement('ol', 'toc-list');
  article.sections.forEach((section, index) => {
    const sectionId = `part-${index + 1}`;
    const li = createElement('li');
    const link = createElement('a', '', section.heading);
    link.href = `#${sectionId}`;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
    li.append(link);
    tocList.append(li);

    const sectionNode = createElement('section', 'article-section');
    sectionNode.id = sectionId;
    sectionNode.tabIndex = -1;
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
  layout.append(body, sidebar);
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
