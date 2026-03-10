/**
 * Terminal command simulator responses.
 * Supports commands from both courses with educational explanations.
 */

export const terminalCommands: Record<string, { output: string; explanation: string }> = {
  "nmap example.com": {
    output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-03-10 14:30 UTC
Nmap scan report for example.com (93.184.216.34)
Host is up (0.012s latency).
Not shown: 997 filtered ports
PORT    STATE SERVICE
80/tcp  open  http
443/tcp open  https
8080/tcp open  http-proxy

Nmap done: 1 IP address (1 host up) scanned in 4.52 seconds`,
    explanation: "📖 nmap يمسح الهدف للبحث عن المنافذ المفتوحة والخدمات. المنافذ المفتوحة تشير إلى خدمات تعمل يمكن أن تكون نقاط هجوم محتملة.",
  },
  "nmap -sv example.com": {
    output: `Starting Nmap 7.94 ( https://nmap.org )
PORT    STATE SERVICE VERSION
80/tcp  open  http    Apache httpd 2.4.41
443/tcp open  ssl     OpenSSL 1.1.1
8080/tcp open  http    nginx 1.18.0

Service detection performed.`,
    explanation: "📖 علم -sV يفعل اكتشاف نسخ الخدمات، مما يكشف عن إصدارات البرمجيات التي يمكن فحصها للبحث عن ثغرات معروفة (CVEs).",
  },
  "nmap -ss 192.168.56.1": {
    output: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.56.1
PORT     STATE SERVICE
135/tcp  open  msrpc
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
902/tcp  open  iss-realsecure

Nmap done: 1 IP address (1 host up) scanned in 3.21 seconds`,
    explanation: "📖 مسح TCP SYN (الخفي) - أسرع أنواع المسح وأكثرها شيوعاً. لا يكمل اتصال TCP الكامل مما يجعله أقل وضوحاً.",
  },
  "nmap -a 192.168.56.1": {
    output: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.56.1
OS: Windows 10 Build 19041
PORT     STATE SERVICE  VERSION
135/tcp  open  msrpc    Microsoft Windows RPC
445/tcp  open  microsoft-ds Windows 10 Pro
3389/tcp open  ms-wbt-server Microsoft Terminal Services

Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds`,
    explanation: "📖 المسح العدواني (-A) يجمع معلومات عن نظام التشغيل ونسخ الخدمات ويشغل سكريبتات المسح.",
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
    explanation: "📖 WHOIS يكشف تفاصيل تسجيل النطاق بما في ذلك المسجل وتاريخ الإنشاء وخوادم الأسماء - مفيد للاستطلاع.",
  },
  "ping example.com": {
    output: `PING example.com (93.184.216.34) 56(84) bytes of data.
64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=11.2 ms
64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=10.8 ms
64 bytes from 93.184.216.34: icmp_seq=3 ttl=56 time=11.5 ms

--- example.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms`,
    explanation: "📖 ping يتحقق مما إذا كان المضيف قابلاً للوصول ويقيس وقت الرحلة ذهاباً وإياباً.",
  },
  "traceroute example.com": {
    output: `traceroute to example.com (93.184.216.34), 30 hops max
 1  gateway (192.168.1.1)  1.234 ms
 2  isp-router (10.0.0.1)  5.678 ms
 3  core-router (172.16.0.1)  12.345 ms
 4  cdn-edge (93.184.216.1)  15.678 ms
 5  example.com (93.184.216.34)  18.901 ms`,
    explanation: "📖 traceroute يعرض مسار الشبكة الذي تسلكه الحزم للوصول إلى الهدف. يكشف عن طوبولوجيا الشبكة.",
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
    explanation: "📖 dirb يكتشف المجلدات المخفية على خوادم الويب. العثور على /admin أو /backup يمكن أن يكشف معلومات حساسة.",
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
    explanation: "📖 nikto يمسح خوادم الويب بحثاً عن أخطاء التكوين والبرمجيات القديمة والثغرات المعروفة.",
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
    explanation: "📖 sqlmap يختبر حقن SQL تلقائياً. اكتشف أن البارامتر 'id' قابل للحقن بأسلوب error-based على MySQL.",
  },
  "netstat -tlnp": {
    output: `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address     Foreign Address  State   PID/Program
tcp        0      0 0.0.0.0:22        0.0.0.0:*        LISTEN  1234/sshd
tcp        0      0 0.0.0.0:80        0.0.0.0:*        LISTEN  5678/apache2
tcp        0      0 0.0.0.0:443       0.0.0.0:*        LISTEN  5678/apache2
tcp        0      0 127.0.0.1:3306    0.0.0.0:*        LISTEN  9012/mysqld`,
    explanation: "📖 netstat يعرض الاتصالات النشطة والمنافذ المفتوحة. يساعد في تحديد الخدمات العاملة.",
  },
  ifconfig: {
    output: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>
    inet 192.168.1.100  netmask 255.255.255.0
    inet6 fe80::1  prefixlen 64
    ether 00:0c:29:ab:cd:ef
    RX packets 12345  TX packets 6789

lo: flags=73<UP,LOOPBACK,RUNNING>
    inet 127.0.0.1  netmask 255.0.0.0`,
    explanation: "📖 ifconfig يعرض تكوين واجهات الشبكة. يظهر عناوين IP و MAC والإحصائيات.",
  },
  "nslookup example.com": {
    output: `Server:		8.8.8.8
Address:	8.8.8.8#53

Non-authoritative answer:
Name:	example.com
Address: 93.184.216.34
Name:	example.com
Address: 2606:2800:220:1:248:1893:25c8:1946`,
    explanation: "📖 nslookup يستعلم خوادم DNS لترجمة أسماء النطاقات إلى عناوين IP.",
  },
  "curl -I http://example.com": {
    output: `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
Connection: keep-alive
Server: ECS (dcb/7F84)
X-Cache: HIT
Age: 324897`,
    explanation: "📖 curl -I يعرض رؤوس HTTP فقط. يكشف عن نوع الخادم والتخزين المؤقت وإعدادات الأمان.",
  },
  "iwconfig": {
    output: `eth0      no wireless extensions.

wlan0     IEEE 802.11  ESSID:off/any
          Mode:Managed  Access Point: Not-Associated
          Tx-Power=20 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Encryption key:off
          Power Management:off

lo        no wireless extensions.`,
    explanation: "📖 iwconfig يعرض تكوين واجهات الشبكة اللاسلكية. يظهر الوضع (Managed/Monitor) وتفاصيل الاتصال.",
  },
  "airmon-ng start wlan0": {
    output: `PHY     Interface   Driver      Chipset
phy0    wlan0       ath9k_htc   Qualcomm Atheros AR9271

(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)
(mac80211 station mode vif disabled for [phy0]wlan0)`,
    explanation: "📖 airmon-ng يحول كرت الشبكة اللاسلكي إلى وضع Monitor للتنصت على جميع الحزم في الهواء.",
  },
  "airodump-ng wlan0mon": {
    output: ` CH  1 ][ Elapsed: 12 s

 BSSID              PWR  Beacons  #Data  CH  MB   ENC    CIPHER  AUTH  ESSID
 64:70:02:DD:43:33  -45  12       0      2   135  WPA    CCMP    PSK   TestNetwork
 D8:07:B6:37:B5:CF  -55  7        0      1   130  WPA2   CCMP    PSK   HomeWiFi
 8C:7A:15:D3:88:00  -69  6        0      1   65   WPA2   CCMP    PSK   Office_5G
 00:C0:CA:67:4C:7E  -79  2        0      6   130  WPA2   CCMP    PSK   GuestNet

 BSSID              STATION            PWR   Rate  Lost  Frames  Probe
 64:70:02:DD:43:33  34:F3:9A:01:09:1E  -22   0-6e  0     35`,
    explanation: "📖 airodump-ng يعرض جميع الشبكات اللاسلكية المحيطة مع تفاصيلها (MAC, قناة, تشفير) والأجهزة المتصلة.",
  },
  help: {
    output: `Available commands:
  nmap <target>           - Network scanner / ماسح الشبكة
  nmap -sV <target>       - Version detection / اكتشاف النسخ
  nmap -sS <target>       - TCP SYN scan / مسح TCP SYN
  nmap -A <target>        - Aggressive scan / مسح عدواني
  whois <domain>          - Domain lookup / بحث النطاق
  ping <host>             - Test connectivity / اختبار الاتصال
  traceroute <host>       - Trace network path / تتبع مسار الشبكة
  dirb <url>              - Directory brute-force / تعداد المجلدات
  nikto -h <url>          - Web vulnerability scanner / ماسح ثغرات الويب
  sqlmap -u <url>         - SQL injection tester / اختبار حقن SQL
  netstat -tlnp           - Show connections / عرض الاتصالات
  ifconfig                - Network config / تكوين الشبكة
  iwconfig                - Wireless config / تكوين اللاسلكي
  nslookup <domain>       - DNS lookup / استعلام DNS
  curl -I <url>           - HTTP headers / رؤوس HTTP
  airmon-ng start wlan0   - Enable monitor mode / تفعيل وضع المراقبة
  airodump-ng wlan0mon    - Scan wireless / مسح الشبكات اللاسلكية
  clear                   - Clear terminal / مسح الشاشة
  help                    - Show this help / عرض المساعدة`,
    explanation: "",
  },
};
