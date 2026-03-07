// Course data for Information Security Applications 1272
// Al-Quds Open University

export interface Unit {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  topics: string[];
  icon: string;
}

export interface Challenge {
  id: number;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  instructions: string[];
  hints: string[];
  expectedCommand: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}

export const courseUnits: Unit[] = [
  {
    id: 1,
    title: "Introduction to Information Security",
    titleAr: "مقدمة في أمن المعلومات",
    description: "Fundamentals of information security, CIA triad, security policies, and threat landscape.",
    topics: ["CIA Triad", "Security Policies", "Threat Landscape", "Risk Management"],
    icon: "🛡️",
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    titleAr: "أساسيات أمن الشبكات",
    description: "Network protocols, firewalls, IDS/IPS, and network security architecture.",
    topics: ["TCP/IP Security", "Firewalls", "IDS/IPS", "VPN"],
    icon: "🌐",
  },
  {
    id: 3,
    title: "Cryptography & Encryption",
    titleAr: "التشفير والتعمية",
    description: "Symmetric and asymmetric encryption, hashing, digital signatures, and PKI.",
    topics: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "Digital Signatures"],
    icon: "🔐",
  },
  {
    id: 4,
    title: "Web Application Security",
    titleAr: "أمن تطبيقات الويب",
    description: "OWASP Top 10, SQL injection, XSS, CSRF, and secure coding practices.",
    topics: ["SQL Injection", "XSS", "CSRF", "OWASP Top 10"],
    icon: "🕸️",
  },
  {
    id: 5,
    title: "Penetration Testing",
    titleAr: "اختبار الاختراق",
    description: "Methodology, tools, reconnaissance, scanning, exploitation, and reporting.",
    topics: ["Reconnaissance", "Scanning", "Exploitation", "Reporting"],
    icon: "🎯",
  },
  {
    id: 6,
    title: "OSINT & Reconnaissance",
    titleAr: "الاستطلاع وجمع المعلومات",
    description: "Open source intelligence gathering, footprinting, and information enumeration.",
    topics: ["OSINT Tools", "Footprinting", "Social Engineering", "Google Dorking"],
    icon: "🔍",
  },
  {
    id: 7,
    title: "Malware Analysis",
    titleAr: "تحليل البرمجيات الخبيثة",
    description: "Types of malware, static and dynamic analysis, reverse engineering basics.",
    topics: ["Virus Types", "Static Analysis", "Dynamic Analysis", "Sandboxing"],
    icon: "🦠",
  },
  {
    id: 8,
    title: "Incident Response & Forensics",
    titleAr: "الاستجابة للحوادث والتحقيق الرقمي",
    description: "Incident handling, digital forensics, evidence collection, and analysis.",
    topics: ["Incident Handling", "Digital Forensics", "Evidence Collection", "Chain of Custody"],
    icon: "🔬",
  },
];

export const labChallenges: Challenge[] = [
  {
    id: 1,
    title: "Network Reconnaissance",
    difficulty: "beginner",
    description: "Use nmap to scan a target and identify open ports.",
    instructions: [
      "Open the Kali terminal below",
      "Use nmap to scan the target: example.com",
      "Identify all open ports and services",
    ],
    hints: ["Try: nmap example.com", "Use -sV flag for version detection"],
    expectedCommand: "nmap example.com",
    explanation: "Nmap (Network Mapper) is used for network discovery and security auditing. It identifies open ports and running services on target hosts.",
  },
  {
    id: 2,
    title: "Port Analysis",
    difficulty: "beginner",
    description: "Analyze discovered ports and identify potential vulnerabilities.",
    instructions: [
      "Use nmap with service version detection",
      "Analyze which services are running",
      "Determine which ports might be vulnerable",
    ],
    hints: ["Try: nmap -sV example.com", "Look for outdated service versions"],
    expectedCommand: "nmap -sV example.com",
    explanation: "Service version detection helps identify outdated software that may have known vulnerabilities.",
  },
  {
    id: 3,
    title: "WHOIS Lookup",
    difficulty: "beginner",
    description: "Perform WHOIS lookup to gather domain information.",
    instructions: [
      "Use the whois command on a target domain",
      "Identify the registrar, nameservers, and contact info",
      "Document the findings",
    ],
    hints: ["Try: whois example.com"],
    expectedCommand: "whois example.com",
    explanation: "WHOIS provides registration details about a domain, useful for reconnaissance during penetration testing.",
  },
  {
    id: 4,
    title: "Directory Enumeration",
    difficulty: "intermediate",
    description: "Use dirb to discover hidden directories on a web server.",
    instructions: [
      "Run dirb against the target URL",
      "Identify any hidden or sensitive directories",
      "Document potential attack vectors",
    ],
    hints: ["Try: dirb http://example.com"],
    expectedCommand: "dirb http://example.com",
    explanation: "Directory brute-forcing helps discover hidden files and directories that may expose sensitive information.",
  },
  {
    id: 5,
    title: "Vulnerability Scanning",
    difficulty: "intermediate",
    description: "Use nikto to scan for web server vulnerabilities.",
    instructions: [
      "Run nikto against the target",
      "Review the vulnerability report",
      "Prioritize findings by severity",
    ],
    hints: ["Try: nikto -h http://example.com"],
    expectedCommand: "nikto -h http://example.com",
    explanation: "Nikto is a web server scanner that tests for dangerous files, outdated versions, and configuration issues.",
  },
  {
    id: 6,
    title: "SQL Injection Testing",
    difficulty: "advanced",
    description: "Use sqlmap to test for SQL injection vulnerabilities.",
    instructions: [
      "Identify a potentially vulnerable parameter",
      "Run sqlmap against the target URL",
      "Analyze the results",
    ],
    hints: ["Try: sqlmap -u 'http://example.com/page?id=1'"],
    expectedCommand: "sqlmap -u http://example.com/page?id=1",
    explanation: "SQLMap automates SQL injection detection and exploitation. It can identify database types, dump data, and access the file system.",
  },
];

export const achievements: Achievement[] = [
  { id: "first-unit", title: "First Steps", description: "Complete your first unit", icon: "🏁", condition: "complete_1_unit" },
  { id: "recon-master", title: "Reconnaissance Master", description: "Complete the OSINT unit", icon: "🔍", condition: "complete_unit_6" },
  { id: "sql-expert", title: "SQL Injection Expert", description: "Complete the Web Security unit", icon: "💉", condition: "complete_unit_4" },
  { id: "pentester", title: "Penetration Tester", description: "Complete the Pen Testing unit", icon: "🎯", condition: "complete_unit_5" },
  { id: "lab-rat", title: "Lab Rat", description: "Complete 3 lab challenges", icon: "🧪", condition: "complete_3_challenges" },
  { id: "hacker", title: "Ethical Hacker", description: "Complete all units", icon: "🏆", condition: "complete_all_units" },
  { id: "streak-3", title: "On Fire", description: "3-day learning streak", icon: "🔥", condition: "streak_3" },
  { id: "quiz-ace", title: "Quiz Ace", description: "Score 90%+ on any quiz", icon: "⭐", condition: "quiz_90" },
];

// Terminal command simulator responses
export const terminalCommands: Record<string, { output: string; explanation: string }> = {
  "nmap example.com": {
    output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-03-07 14:30 UTC
Nmap scan report for example.com (93.184.216.34)
Host is up (0.012s latency).
Not shown: 997 filtered ports
PORT    STATE SERVICE
80/tcp  open  http
443/tcp open  https
8080/tcp open  http-proxy

Nmap done: 1 IP address (1 host up) scanned in 4.52 seconds`,
    explanation: "📖 nmap scans a target for open ports and services. Open ports indicate running services that could be potential attack vectors.",
  },
  "nmap -sv example.com": {
    output: `Starting Nmap 7.94 ( https://nmap.org )
PORT    STATE SERVICE VERSION
80/tcp  open  http    Apache httpd 2.4.41
443/tcp open  ssl     OpenSSL 1.1.1
8080/tcp open  http    nginx 1.18.0

Service detection performed.`,
    explanation: "📖 The -sV flag enables version detection, revealing specific software versions that can be checked for known CVEs.",
  },
  "whois example.com": {
    output: `Domain Name: EXAMPLE.COM
Registry Domain ID: 2336799_DOMAIN_COM-VRSN
Registrar: ICANN
Updated Date: 2024-08-14T07:01:44Z
Creation Date: 1995-08-14T04:00:00Z
Registrar Abuse Contact Email: abuse@icann.org
Name Server: A.IANA-SERVERS.NET
Name Server: B.IANA-SERVERS.NET
DNSSEC: signedDelegation`,
    explanation: "📖 WHOIS reveals domain registration details including registrar, creation date, and nameservers — useful for reconnaissance.",
  },
  "ping example.com": {
    output: `PING example.com (93.184.216.34) 56(84) bytes of data.
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.2 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=10.8 ms
64 bytes from 93.184.216.34: icmp_seq=3 ttl=56 time=11.5 ms

--- example.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`,
    explanation: "📖 ping checks if a host is reachable and measures round-trip time. Useful for initial connectivity testing.",
  },
  "traceroute example.com": {
    output: `traceroute to example.com (93.184.216.34), 30 hops max
 1  gateway (192.168.1.1)  1.234 ms
 2  isp-router (10.0.0.1)  5.678 ms
 3  core-router (172.16.0.1)  12.345 ms
 4  cdn-edge (93.184.216.1)  15.678 ms
 5  example.com (93.184.216.34)  18.901 ms`,
    explanation: "📖 traceroute shows the network path packets take to reach the target. Reveals network topology and potential bottlenecks.",
  },
  "dirb http://example.com": {
    output: `---- Scanning URL: http://example.com/ ----
+ http://example.com/admin (CODE:403|SIZE:287)
+ http://example.com/backup (CODE:200|SIZE:1024)
+ http://example.com/config (CODE:403|SIZE:287)
+ http://example.com/login (CODE:200|SIZE:3456)
+ http://example.com/uploads (CODE:301|SIZE:312)

---- Results ----
5 results found.`,
    explanation: "📖 dirb brute-forces directories on web servers. Finding /admin, /backup, or /config directories can reveal sensitive information.",
  },
  "nikto -h http://example.com": {
    output: `- Nikto v2.5.0
+ Target IP:   93.184.216.34
+ Target Port: 80
+ Server: Apache/2.4.41
+ /admin/: Directory indexing found
+ /backup/: Backup file found
+ Apache/2.4.41 appears to be outdated
+ OSVDB-3233: /icons/README: Apache default file found
+ 7 items checked: 4 findings`,
    explanation: "📖 nikto scans web servers for misconfigurations, outdated software, and known vulnerabilities.",
  },
  "sqlmap -u http://example.com/page?id=1": {
    output: `[*] testing connection to target URL
[*] testing if GET parameter 'id' is dynamic
[*] confirming that GET parameter 'id' is dynamic
[*] GET parameter 'id' appears to be 'MySQL' injectable
[*] testing 'MySQL >= 5.0 AND error-based'
Parameter: id (GET)
    Type: error-based
    Title: MySQL >= 5.0 AND error-based
    Payload: id=1 AND (SELECT 1 FROM(SELECT COUNT(*),
    CONCAT(VERSION(),FLOOR(RAND(0)*2))x FROM
    INFORMATION_SCHEMA.tables GROUP BY x)a)

[*] the back-end DBMS is MySQL
back-end DBMS: MySQL >= 5.0`,
    explanation: "📖 sqlmap automates SQL injection testing. It detected that the 'id' parameter is vulnerable to error-based SQL injection on a MySQL database.",
  },
  "netstat -tlnp": {
    output: `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address     Foreign Address  State   PID/Program
tcp        0      0 0.0.0.0:22        0.0.0.0:*        LISTEN  1234/sshd
tcp        0      0 0.0.0.0:80        0.0.0.0:*        LISTEN  5678/apache2
tcp        0      0 0.0.0.0:443       0.0.0.0:*        LISTEN  5678/apache2
tcp        0      0 127.0.0.1:3306    0.0.0.0:*        LISTEN  9012/mysqld`,
    explanation: "📖 netstat shows active network connections and listening ports. Helps identify running services and potential unauthorized listeners.",
  },
  ifconfig: {
    output: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>
    inet 192.168.1.100  netmask 255.255.255.0
    inet6 fe80::1  prefixlen 64
    ether 00:0c:29:ab:cd:ef
    RX packets 12345  TX packets 6789

lo: flags=73<UP,LOOPBACK,RUNNING>
    inet 127.0.0.1  netmask 255.0.0.0`,
    explanation: "📖 ifconfig displays network interface configuration. Shows IP addresses, MAC addresses, and network statistics.",
  },
  help: {
    output: `Available commands:
  nmap <target>       - Network scanner
  whois <domain>      - Domain lookup
  ping <host>         - Test connectivity
  traceroute <host>   - Trace network path
  dirb <url>          - Directory brute-force
  nikto -h <url>      - Web vulnerability scanner
  sqlmap -u <url>     - SQL injection tester
  netstat -tlnp       - Show network connections
  ifconfig            - Network interface config
  clear               - Clear terminal
  help                - Show this help message`,
    explanation: "",
  },
};
