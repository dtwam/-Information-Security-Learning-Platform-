/**
 * Course 1: Software and Information Security Applications (1272)
 * برمجيات وتطبيقات أمن المعلومات
 * Content extracted from the official course book - Arabic content preserved.
 */
import type { Course, LabChallenge } from './courses';

export const infoSecCourse: Course = {
  id: 'infosec-1272',
  code: '1272',
  title: 'Software & Information Security Applications',
  titleAr: 'برمجيات وتطبيقات أمن المعلومات',
  description: 'Learn penetration testing tools, web application security, and exploitation techniques using Kali Linux.',
  descriptionAr: 'تعلم أدوات اختبار الاختراق وأمن تطبيقات الويب وتقنيات الاستغلال باستخدام نظام Kali Linux',
  icon: '🛡️',
  color: 'primary',
  totalUnits: 7,
  units: [
    {
      id: 1,
      courseId: 'infosec-1272',
      title: 'Introduction to Kali Linux',
      titleAr: 'التعرف على نظام Kali Linux',
      description: 'Understanding what Kali Linux is and its role in penetration testing.',
      descriptionAr: 'فهم نظام Kali Linux ودوره في اختبار الاختراق',
      icon: '🐉',
      topics: ['Kali Linux Overview', 'Penetration Testing', 'Security Assessment', 'Linux Basics'],
      content: [
        {
          heading: 'What is Kali Linux?',
          headingAr: 'ما هو نظام Kali Linux؟',
          body: `قبل الدخول في النظام kali Linux، يجب أن نعرف ما هو اختبار الاختراق. اختبار الاختراق هو طريقة من أجل تقييم النظام الأمني. الفكرة وراء اختبار الاختراق هي استهداف الحواسيب عبر مجموعة من الهجمات لرؤية فيما إذا كان الحاسوب قادر على التعامل مع هذه الهجمات بدون أي تأثير على أدائه.

يعتبر Kali Linux أفضل نظام تشغيل للمحترفين. حيث أن Kali هو نظام تشغيل مبني على أساس نظام Linux مع مجموعة من البرمجيات مفتوحة المصدر التي تستخدم لتنفيذ العديد من المهام في اختبار الاختراق وعلوم الحواسيب والمجال الأمني.`,
          type: 'text',
        },
        {
          heading: 'Key Features',
          headingAr: 'بعض ميزاته',
          body: `1- يحوي الكثير من أدوات الاختراق والتقديرات الأمنية
2- يدعم العديد من التجهيزات الخارجية مثل مستقبلات اللاسلكية وتجهيزات PCI
3- يؤمن بيئة متكاملة للتطوير بعدة لغات برمجة مثل C، Python، Ruby
4- نظام مفتوح المصدر وقابل للتطوير
5- يمكن تنزيله على شكل ISO والتي يمكن استخدامها إما كـ live أو كنظام مستقل`,
          type: 'text',
        },
        {
          heading: 'Important Paths',
          headingAr: 'المسارات المهمة في النظام',
          body: `يتبع نظام Kali نفس المسار الأساسي الموجود في Ubuntu Linux. وفيما يلي بعض المسارات المهمة التي يجب معرفتها:

/etc/ : يحوي ملفات الإعدادات للأدوات المنصبة في النظام
/opt/ : يحوي metasploit وموديولاتها
/sys/ : يحوي ملفات الإعدادات للأجهزة الخارجية الموصولة والمنافذ
/root/ : مسار أو مجلد المستخدم الأساسي للنظام
/lib/ : تحوي المكتبات المستقلة عن النظام`,
          type: 'text',
          commands: [
            { cmd: 'ls /etc/', explanation: 'عرض ملفات الإعدادات' },
            { cmd: 'ls /opt/', explanation: 'عرض أدوات الاختراق المثبتة' },
            { cmd: 'whoami', explanation: 'معرفة المستخدم الحالي' },
          ],
        },
      ],
      quiz: [
        { question: 'What is the primary purpose of Kali Linux?', options: ['Web development', 'Penetration testing', 'Video editing', 'Database management'], correct: 1, explanation: 'Kali Linux is specifically designed for penetration testing and security auditing.' },
        { question: 'What is the default root password for Kali Linux?', options: ['admin', 'password', 'toor', 'root'], correct: 2, explanation: 'The default password is "toor" (root spelled backwards).' },
        { question: 'Which directory contains Metasploit in Kali?', options: ['/etc/', '/opt/', '/var/', '/home/'], correct: 1, explanation: '/opt/ contains Metasploit and its modules.' },
      ],
      concepts: [
        { name: 'Penetration Testing', nameAr: 'اختبار الاختراق', simple: 'طريقة لتقييم أمان النظام عبر محاكاة الهجمات', detailed: 'اختبار الاختراق هو عملية منهجية لتقييم أمان نظام حاسوبي أو شبكة عبر استهداف الحواسيب بمجموعة من الهجمات لرؤية فيما إذا كان النظام قادر على التعامل معها', example: 'استخدام Nmap لمسح المنافذ المفتوحة ثم محاولة استغلالها' },
        { name: 'Kali Linux', nameAr: 'كالي لينكس', simple: 'نظام تشغيل مبني على Linux مخصص لاختبار الاختراق', detailed: 'نظام تشغيل مبني على أساس نظام Linux مع مجموعة من البرمجيات مفتوحة المصدر التي تستخدم لتنفيذ العديد من المهام في اختبار الاختراق وعلوم الحواسيب والمجال الأمني', example: 'تنزيل Kali كـ ISO وتثبيته على VirtualBox' },
      ],
    },
    {
      id: 2,
      courseId: 'infosec-1272',
      title: 'Installing Kali Linux',
      titleAr: 'تنزيل وتنصيب Kali Linux',
      description: 'Download, install, and configure Kali Linux on physical machines and virtual environments.',
      descriptionAr: 'تنزيل وتنصيب وإعداد نظام Kali Linux على الأجهزة الحقيقية والبيئات الافتراضية',
      icon: '💿',
      topics: ['ISO Download', 'Virtual Machine Setup', 'Dual Boot', 'System Update'],
      content: [
        {
          heading: 'Download Options',
          headingAr: 'خيارات التنزيل',
          body: `للبدء في عملية التنصيب، نحتاج أولا تنزيل النظام وهو متوفر بالأشكال التالية:
1- ISO
2- Vmware images
3- ARM images

يمكن تنصيب نظام Kali كنظام ثاني على الحاسوب أو كبيئة افتراضية.`,
          type: 'text',
        },
        {
          heading: 'System Requirements',
          headingAr: 'متطلبات التنصيب',
          body: `قبل تنصيب Kali سوف نحتاج إلى المواصفات التالية:
1- مساحة فارغة على القرص الصلب 12 GB
2- 2 GB من RAM على الأقل
3- أداة للإقلاع مثل قرص ليزري أو فلاشة USB
4- برنامج لحرق الأقراص الليزرية أو برنامج لجعل الفلاشات إقلاعية`,
          type: 'text',
        },
        {
          heading: 'Virtual Machine Setup',
          headingAr: 'إعداد البيئة الافتراضية',
          body: `يمكن تنزيل النظام على شكل Vmware Image، حيث أن هذا النظام متوفر جداً ضمن برامج البيئة الافتراضية. يمكن تنزيله مباشرة من الموقع الرسمي www.kali.org/download.

سوف نستخدم ISO التي قمنا بتنزيلها سابقاً لتشغيل Kali Linux على برنامج Virtual Box.`,
          type: 'text',
          commands: [
            { cmd: 'apt-get update', explanation: 'تحديث نظام التشغيل والحصول على آخر التحديثات' },
            { cmd: 'cp /media/cd-rom/VboxLinuxAdditions.run /root/', explanation: 'نسخ ملف إضافات VirtualBox' },
            { cmd: 'chmod 755 /root/VboxLinuxAdditions.run', explanation: 'ضبط صلاحيات الملف' },
          ],
        },
      ],
      quiz: [
        { question: 'What is the minimum disk space for Kali Linux?', options: ['4 GB', '8 GB', '12 GB', '20 GB'], correct: 2 },
        { question: 'Which is NOT a Kali download format?', options: ['ISO', 'Vmware Image', 'ARM Image', 'APK'], correct: 3 },
        { question: 'What command updates Kali Linux?', options: ['apt-get update', 'yum update', 'npm update', 'pip update'], correct: 0 },
      ],
      concepts: [
        { name: 'Virtual Machine', nameAr: 'البيئة الافتراضية', simple: 'حاسوب وهمي يعمل داخل حاسوبك الحقيقي', detailed: 'برنامج يحاكي عمل حاسوب كامل، يمكنك تثبيت نظام تشغيل مختلف عليه دون التأثير على نظامك الأساسي', example: 'تثبيت Kali Linux على VirtualBox' },
        { name: 'Dual Boot', nameAr: 'التمهيد المزدوج', simple: 'تثبيت نظامي تشغيل على نفس الحاسوب', detailed: 'إعداد الحاسوب ليحتوي على نظامي تشغيل مثل Windows و Kali Linux مع إمكانية الاختيار بينهما عند الإقلاع', example: 'تثبيت Kali بجانب Windows على القرص الصلب' },
      ],
    },
    {
      id: 3,
      courseId: 'infosec-1272',
      title: 'Essential Security Tools',
      titleAr: 'التعرف على بعض الوظائف الأساسية من أشهر الأدوات',
      description: 'Learn Nmap, DNS tools, network scanning, and vulnerability analysis with OpenVAS.',
      descriptionAr: 'تعلم Nmap وأدوات DNS ومسح الشبكات وتحليل الثغرات باستخدام OpenVAS',
      icon: '🔧',
      topics: ['Nmap', 'DNS Tools', 'Network Scanning', 'OpenVAS', 'Vulnerability Analysis'],
      content: [
        {
          heading: 'Information Gathering with Nmap',
          headingAr: 'تجميع المعلومات باستخدام Nmap',
          body: `تجميع المعلومات يعتبر أول خطوة باتجاه اختبار اختراق. في هذه المرحلة سوف نحاول ونجمع أكبر قدر ممكن من المعلومات عن الهدف أو الضحية. Nmap هي الأداة المفضلة للقيام بالمسح وتجميع المعلومات.

لتشغيلها نفتح console ونمرر الأمر التالي:
nmap 192.168.56.1`,
          type: 'text',
          commands: [
            { cmd: 'nmap 192.168.56.1', explanation: 'مسح أساسي للهدف' },
            { cmd: 'nmap 192.168.56.1-255', explanation: 'مسح مجال من عناوين IP ضمن شبكة' },
            { cmd: 'nmap 192.168.56.1 -p 80', explanation: 'مسح منفذ محدد عند الهدف' },
            { cmd: 'nmap 192.168.56.0/24 -p 1-1000', explanation: 'مسح مجال من المنافذ في الشبكة كاملة' },
            { cmd: 'nmap -F 192.168.56.1', explanation: 'مسح سريع' },
            { cmd: 'nmap -A 192.168.56.1', explanation: 'مسح معلومات عن نظام التشغيل ونسخته' },
            { cmd: 'nmap -sV 192.168.56.1', explanation: 'اكتشاف الخدمات المختلفة التي تعمل على الهدف' },
            { cmd: 'nmap -sS 192.168.56.1', explanation: 'مسح TCP SYN (سريع وآمن)' },
            { cmd: 'nmap -sT 192.168.56.1', explanation: 'مسح TCP اتصال' },
            { cmd: 'nmap -sU 192.168.56.1', explanation: 'مسح UDP' },
            { cmd: 'nmap -sA 192.168.1.254', explanation: 'معرفة إذا كان الجدار الناري موجود' },
            { cmd: 'nmap -PN 192.168.1.1', explanation: 'مسح الهدف في حال وجود جدار ناري' },
          ],
        },
        {
          heading: 'DNS Analysis Tools',
          headingAr: 'أدوات تحليل DNS',
          body: `DNSmap هي أداة تستخدم لاكتشاف subdomains لخدمة الدخول عبر الإنترنت، حيث يمكن استخدامها مع اسم domain معين.`,
          type: 'text',
          commands: [
            { cmd: 'dnsmap rediff.com', explanation: 'البحث عن نطاقات فرعية لموقع محدد' },
            { cmd: 'fping google.com', explanation: 'أداة لاستكشاف live hosts في الشبكة' },
          ],
        },
        {
          heading: 'Vulnerability Analysis with OpenVAS',
          headingAr: 'تحليل الثغرات باستخدام OpenVAS',
          body: `OpenVAS أداة بحث عن نقاط الضعف مفتوحة المصدر مصممة خصيصاً للبحث العميق عن نقاط الضعف ضمن العديد من الحالات وأخطاء النظام.

يمكن البحث عن نقاط الضعف على العديد من الخدمات والبرمجيات اعتماداً على المتطلبات.`,
          type: 'text',
          commands: [
            { cmd: 'openvas-setup', explanation: 'إعداد وتحديث البرنامج عند تشغيله لأول مرة' },
            { cmd: 'openvas-adduser', explanation: 'إضافة مستخدم جديد لـ OpenVAS' },
            { cmd: 'openvas-nvt-sync', explanation: 'تحديث الأداة بشكل دائم' },
          ],
        },
      ],
      quiz: [
        { question: 'What does the -sV flag do in Nmap?', options: ['Verbose output', 'Service version detection', 'SYN scan', 'UDP scan'], correct: 1 },
        { question: 'What tool discovers subdomains?', options: ['Nmap', 'DNSmap', 'Nikto', 'Burp Suite'], correct: 1 },
        { question: 'What is OpenVAS used for?', options: ['Web browsing', 'Vulnerability scanning', 'Video editing', 'Email'], correct: 1 },
      ],
      concepts: [
        { name: 'Nmap', nameAr: 'أداة Nmap', simple: 'أداة لمسح الشبكات واكتشاف الأجهزة والخدمات والمنافذ المفتوحة', detailed: 'Network Mapper - أداة مفتوحة المصدر لاستكشاف الشبكات وتدقيق الأمان. تحدد المنافذ المفتوحة والخدمات العاملة على الأجهزة المستهدفة', example: 'nmap -sV 192.168.1.1 لاكتشاف نسخ الخدمات' },
        { name: 'Port Scanning', nameAr: 'مسح المنافذ', simple: 'فحص الأجهزة لمعرفة المنافذ المفتوحة والخدمات المتاحة', detailed: 'عملية إرسال حزم بيانات إلى منافذ مختلفة على جهاز مستهدف لتحديد أيها مفتوح ويقبل الاتصالات', example: 'nmap -p 1-1000 192.168.1.1' },
        { name: 'OpenVAS', nameAr: 'نظام تقييم الثغرات المفتوح', simple: 'أداة للبحث عن نقاط الضعف في الأنظمة والشبكات', detailed: 'أداة مفتوحة المصدر مصممة للبحث العميق عن نقاط الضعف ضمن العديد من الحالات والأنظمة والبرمجيات', example: 'openvas-setup ثم openvas-gsd' },
      ],
    },
    {
      id: 4,
      courseId: 'infosec-1272',
      title: 'Web Application Penetration Testing',
      titleAr: 'اختبار اختراق تطبيقات الويب',
      description: 'Web application security testing using WebScarab, sqlninja, and Websploit.',
      descriptionAr: 'اختبار أمان تطبيقات الويب باستخدام WebScarab و sqlninja و Websploit',
      icon: '🕸️',
      topics: ['WebScarab Proxy', 'SQL Injection', 'sqlninja', 'Websploit Framework'],
      content: [
        {
          heading: 'Web Application Security Testing',
          headingAr: 'اختبار اختراق تطبيقات الويب في نظام Kali',
          body: `تطبيقات الويب جزء رئيسي من الأنترنت العالمي هذه الأيام. بناء تطبيق ويب يمكن أن يكون صعب ويمكن أن تظهر أخطاء صغيرة ضمن التعليمات تؤدي إلى حدوث فجوات أمنية.

وهنا يأتي دور تطبيقات الويب للمساعدة في حماية التطبيقات الأخرى. تطبيقات اختبار اختراق الويب يمكن تطبيقها في العديد من الأماكن مثل الواجهات وقواعد البيانات وخوادم الويب.`,
          type: 'text',
        },
        {
          heading: 'WebScarab Proxy',
          headingAr: 'أداة WebScarab',
          body: `WebScarab هي أداة من أجل مقاطعة طلبات HTTP و HTTPS المرسلة من المتصفح قبل أن يتم إرسالها إلى الخادم. بشكل مشابه يتم وقف الإجابة من الخادم قبل أن تذهب إلى المتصفح.

خطوات العمل مع WebScarab:
1. نبدأ Webcarab عبر الذهاب إلى المسار المحدد
2. بعد بدء التطبيق يجب علينا تغيير إعدادات المتصفح. نضبط إعدادات الـ 127.0.0.1 على المنفذ رقم 8008`,
          type: 'text',
        },
        {
          heading: 'SQL Injection with sqlninja',
          headingAr: 'هجمات قواعد البيانات باستخدام sqlninja',
          body: `Sqlninja أداة مشهورة تستخدم لفحص نقاط الضعف لـ SQL injection في خوادم Microsoft SQL. قواعد البيانات جزء مهم من تطبيقات الويب. حتى تطبيق صغير يمكن أن يؤدي إلى خطأ في استغلال المعلومات.`,
          type: 'text',
          commands: [
            { cmd: 'sqlninja -m test', explanation: 'اختبار الاتصال بقاعدة البيانات المستهدفة' },
          ],
        },
        {
          heading: 'Websploit Framework',
          headingAr: 'إطار عمل Websploit',
          body: `Websploit أداة مفتوحة المصدر صممت لتحليل نقاط الضعف واختبار الاختراق لتطبيقات الويب. وهي مشابهة جداً لـ Metasploit والتعامل مع العديد من البرمجيات لإضافة وظائف إليها.`,
          type: 'text',
          commands: [
            { cmd: 'wsf>update', explanation: 'تحديث إطار عمل Websploit' },
            { cmd: 'wsf>show modules', explanation: 'رؤية الموديولات المتوفرة' },
            { cmd: 'wsf>use web/dir_scanner', explanation: 'استخدام ماسح المجلدات' },
          ],
        },
      ],
      quiz: [
        { question: 'What is SQL Injection?', options: ['A database backup method', 'Code injection via SQL queries', 'A type of firewall', 'A programming language'], correct: 1 },
        { question: 'What does WebScarab intercept?', options: ['DNS queries', 'HTTP/HTTPS requests', 'FTP transfers', 'Email messages'], correct: 1 },
        { question: 'What framework is Websploit similar to?', options: ['Django', 'React', 'Metasploit', 'Express'], correct: 2 },
      ],
      concepts: [
        { name: 'SQL Injection', nameAr: 'حقن SQL', simple: 'إدخال أوامر SQL خبيثة في حقول إدخال البيانات لاختراق قواعد البيانات', detailed: 'تقنية هجوم تستغل ثغرات في طبقة قواعد البيانات للتطبيق عبر إدراج شفرة SQL خبيثة في حقول الإدخال مما يؤدي إلى سرقة البيانات أو تعديلها أو حذفها', example: "' OR 1=1 -- يتجاوز عملية تسجيل الدخول" },
        { name: 'Proxy', nameAr: 'الوكيل', simple: 'برنامج وسيط يقاطع الطلبات بين المتصفح والخادم', detailed: 'خادم وسيط يقع بين المتصفح والخادم المستهدف يتيح فحص وتعديل الطلبات والاستجابات لأغراض اختبار الأمان', example: 'WebScarab يعمل على المنفذ 8008 كـ proxy' },
      ],
    },
    {
      id: 5,
      courseId: 'infosec-1272',
      title: 'Burp Suite for Web Testing',
      titleAr: 'اختبار اختراق تطبيقات الويب باستخدام Burp Suite',
      description: 'Using Burp Suite for comprehensive web application penetration testing.',
      descriptionAr: 'استخدام Burp Suite لاختبار اختراق تطبيقات الويب بشكل شامل',
      icon: '🔓',
      topics: ['Burp Proxy', 'Burp Intruder', 'Request Interception', 'Attack Automation'],
      content: [
        {
          heading: 'Introduction to Burp Suite',
          headingAr: 'مقدمة عن Burp Suite',
          body: `Burp Suite هي أداة معروفة والتي تستخدم بشكل واسع لاختبار تطبيقات الويب. منها توجد نسخة مجانية ونسخة تجارية تحوي ميزات إضافية. Kali يحوي بشكل مسبق على النسخة المجانية.

بعض خصائص Burp Suite:
- Proxy مقاطعة: يمكن أن يحلل الطلبات والإجابة عبر المتصفح
- تطبيق من أجل فحص محتوى التطبيقات
- ماسح تطبيقات ويب من أجل تحديد الضعف ونقاط الضعف
- إنشاء وحفظ خطوات العمل
- توسيع الأدوات وتطويرها وفق إدخالات المستخدم`,
          type: 'text',
        },
        {
          heading: 'Burp Proxy',
          headingAr: 'Burp Proxy',
          body: `وهو proxy يقوم بقراءة جميع الطلبات والاستجابات التي تمر خلال المتصفح وتقوم بتنفيذ هجوم man-in-the-middle.

للعمل مع هذه الأداة سوف نغير إعدادات الشبكة للمتصفح لتمرير البيانات عبر proxy. نفتح إعدادات الشبكة للمتصفح ونضبط عنوان proxy على localhost ورقم المنفذ على 8000.`,
          type: 'text',
        },
        {
          heading: 'Burp Intruder',
          headingAr: 'Burp Intruder',
          body: `أداة قوية لتنفيذ هجمات وفق الذي نريده على تطبيقات الويب. تسمح للمستخدم ببناء نموذج هجوم وتنفيذ العملية بشكل تلقائي.

Burp Intruder تحوي 4 قوائم مهمة:
- Target: تسمح لنا باختيار عنوان التطبيق الهدف
- Positions: تستخدم لاختيار مواقع تنفيذ الهجوم عليها
- Payloads: تستخدم لضبط الهجوم الذي نحتاجه
- Options: تستخدم لتطبيق إعدادات إضافية`,
          type: 'text',
        },
      ],
      quiz: [
        { question: 'What is Burp Suite primarily used for?', options: ['Network monitoring', 'Web application testing', 'Operating system analysis', 'Email security'], correct: 1 },
        { question: 'What port does Burp Proxy use by default?', options: ['80', '443', '8080', '8000'], correct: 2 },
        { question: 'What Burp tool automates attacks?', options: ['Proxy', 'Spider', 'Intruder', 'Decoder'], correct: 2 },
      ],
      concepts: [
        { name: 'Burp Suite', nameAr: 'بيرب سويت', simple: 'مجموعة أدوات متكاملة لاختبار أمان تطبيقات الويب', detailed: 'منصة اختبار أمان شاملة تحتوي على أدوات متعددة مثل الوكيل والماسح والمتطفل لاكتشاف واستغلال ثغرات تطبيقات الويب', example: 'استخدام Burp Proxy لمقاطعة طلبات HTTP' },
        { name: 'Man-in-the-Middle', nameAr: 'هجوم الوسيط', simple: 'هجوم يضع المهاجم بين طرفي الاتصال لمراقبة أو تعديل البيانات', detailed: 'نوع من الهجمات يقوم فيه المهاجم بوضع نفسه بين المرسل والمستقبل لاعتراض وربما تعديل الاتصالات دون علم الطرفين', example: 'Burp Proxy يعمل كوسيط بين المتصفح والخادم' },
      ],
    },
    {
      id: 6,
      courseId: 'infosec-1272',
      title: 'Exploitation Tools & Techniques',
      titleAr: 'طرق وأدوات Exploitation',
      description: 'Advanced exploitation methods and tools for penetration testing.',
      descriptionAr: 'طرق وأدوات الاستغلال المتقدمة لاختبار الاختراق',
      icon: '⚔️',
      topics: ['Metasploit', 'Exploitation Framework', 'Payload Generation', 'Post-Exploitation'],
      content: [
        {
          heading: 'Exploitation Concepts',
          headingAr: 'مفاهيم الاستغلال',
          body: `الاستغلال (Exploitation) هو المرحلة التي يتم فيها استغلال نقاط الضعف المكتشفة في مراحل المسح والاستطلاع. تتضمن هذه المرحلة استخدام أدوات وتقنيات متقدمة لاختراق الأنظمة المستهدفة.

أهم الأدوات المستخدمة في هذه المرحلة:
- Metasploit Framework
- أدوات توليد الحمولات (Payloads)
- أدوات ما بعد الاختراق (Post-Exploitation)`,
          type: 'text',
        },
      ],
      quiz: [
        { question: 'What is a payload in penetration testing?', options: ['A type of malware', 'Code delivered to exploit a vulnerability', 'A firewall rule', 'A network protocol'], correct: 1 },
        { question: 'What framework is commonly used for exploitation?', options: ['Django', 'Metasploit', 'Express', 'Flask'], correct: 1 },
      ],
      concepts: [
        { name: 'Exploitation', nameAr: 'الاستغلال', simple: 'استخدام الثغرات المكتشفة للوصول إلى النظام المستهدف', detailed: 'المرحلة في اختبار الاختراق التي يتم فيها استغلال نقاط الضعف المكتشفة باستخدام أدوات مثل Metasploit للحصول على وصول غير مصرح به إلى النظام', example: 'استخدام Metasploit لاستغلال ثغرة في خدمة SMB' },
        { name: 'Payload', nameAr: 'الحمولة', simple: 'الشفرة التي يتم تسليمها إلى النظام المستهدف بعد استغلال الثغرة', detailed: 'البرنامج أو الشفرة التي يتم تنفيذها على الجهاز المستهدف بعد نجاح عملية الاستغلال، وقد تتضمن فتح اتصال عكسي أو تنفيذ أوامر', example: 'reverse shell payload يفتح اتصال من الهدف إلى المهاجم' },
      ],
    },
    {
      id: 7,
      courseId: 'infosec-1272',
      title: 'Social Engineering Toolkit',
      titleAr: 'أداة الهندسة الاجتماعية',
      description: 'Social engineering attacks, phishing, and human-factor exploitation.',
      descriptionAr: 'هجمات الهندسة الاجتماعية والتصيد واستغلال العنصر البشري',
      icon: '🎭',
      topics: ['SET Toolkit', 'Phishing', 'Social Engineering', 'Attack Vectors'],
      content: [
        {
          heading: 'Social Engineer Toolkit (SET)',
          headingAr: 'أداة الهندسة الاجتماعية SET',
          body: `Social Engineer Toolkit (SET) أداة سطر أوامر مشهورة تستطيع القيام بهجوم على مستخدمين محددين. هذه الأداة تعتمد تماماً على العنصر البشري. نجاح الهجوم يعتمد على سلسلة بناء هذه الأداة باستخدام خيارات متنوعة موجودة ضمن الأداة.

القائمة الرئيسية لـ SET:
1. Social-Engineering Attacks
2. Fast-Track Penetration Testing
3. Third Party Modules
4. Update the Metasploit Framework
5. Update SET configuration`,
          type: 'text',
        },
        {
          heading: 'Attack Vectors',
          headingAr: 'أنماط الهجوم',
          body: `SET تزودنا بالعديد من الخيارات لأجل اختبار الاختراق:
1. Spear-Phishing Attack Vectors
2. Website Attack Vectors
3. Infectious Media Generator
4. Create a Payload and Listener
5. Mass Mailer Attack
6. Arduino-Based Attack Vector
7. SMS Spoofing Attack Vector
8. Wireless Access Point Attack Vector
9. QRCode Generator Attack Vector
10. Powershell Attack Vectors

SET تمكننا أيضاً من استغلال قوة Metasploit framework لبناء payload و meterpreter connections و shells وغيرها.`,
          type: 'text',
        },
      ],
      quiz: [
        { question: 'What does SET stand for?', options: ['Security Enhancement Tool', 'Social Engineer Toolkit', 'System Exploit Tester', 'Secure Email Transfer'], correct: 1 },
        { question: 'SET primarily exploits which factor?', options: ['Software bugs', 'Network protocols', 'Human behavior', 'Hardware flaws'], correct: 2 },
        { question: 'Which is a SET attack vector?', options: ['Buffer overflow', 'Spear-Phishing', 'SQL Injection', 'Port scanning'], correct: 1 },
      ],
      concepts: [
        { name: 'Social Engineering', nameAr: 'الهندسة الاجتماعية', simple: 'خداع الأشخاص للحصول على معلومات سرية أو الوصول غير المصرح به', detailed: 'مجموعة من التقنيات النفسية والاجتماعية التي تستغل العنصر البشري للحصول على معلومات حساسة أو تنفيذ إجراءات غير مصرح بها', example: 'إرسال بريد إلكتروني مزيف يطلب من الضحية إدخال كلمة المرور' },
        { name: 'Phishing', nameAr: 'التصيد الاحتيالي', simple: 'إرسال رسائل مزيفة تبدو شرعية لسرقة المعلومات', detailed: 'نوع من هجمات الهندسة الاجتماعية يتم فيه إرسال رسائل بريد إلكتروني أو إنشاء مواقع ويب مزيفة تحاكي جهات موثوقة لخداع الضحايا', example: 'SET يمكنه إنشاء صفحة تسجيل دخول مزيفة لـ Facebook' },
      ],
    },
  ],
};

export const infoSecLabChallenges: LabChallenge[] = [
  {
    id: 1,
    courseId: 'infosec-1272',
    title: 'Network Reconnaissance with Nmap',
    titleAr: 'استطلاع الشبكة باستخدام Nmap',
    difficulty: 'beginner',
    description: 'Use nmap to scan a target and identify open ports.',
    instructions: ['Open the Kali terminal', 'Use nmap to scan the target: example.com', 'Identify all open ports and services'],
    hints: ['Try: nmap example.com', 'Use -sV flag for version detection'],
    expectedCommand: 'nmap example.com',
    explanation: 'Nmap identifies open ports and running services on target hosts, which is the first step in penetration testing.',
  },
  {
    id: 2,
    courseId: 'infosec-1272',
    title: 'Service Version Detection',
    titleAr: 'اكتشاف نسخ الخدمات',
    difficulty: 'beginner',
    description: 'Analyze discovered ports and identify potential vulnerabilities.',
    instructions: ['Use nmap with service version detection', 'Analyze which services are running', 'Determine which ports might be vulnerable'],
    hints: ['Try: nmap -sV example.com', 'Look for outdated service versions'],
    expectedCommand: 'nmap -sV example.com',
    explanation: 'Service version detection helps identify outdated software that may have known vulnerabilities (CVEs).',
  },
  {
    id: 3,
    courseId: 'infosec-1272',
    title: 'WHOIS Domain Lookup',
    titleAr: 'بحث WHOIS عن النطاق',
    difficulty: 'beginner',
    description: 'Perform WHOIS lookup to gather domain registration information.',
    instructions: ['Use the whois command on a target domain', 'Identify the registrar, nameservers, and contact info'],
    hints: ['Try: whois example.com'],
    expectedCommand: 'whois example.com',
    explanation: 'WHOIS provides registration details about a domain, useful for reconnaissance.',
  },
  {
    id: 4,
    courseId: 'infosec-1272',
    title: 'Directory Enumeration',
    titleAr: 'تعداد المجلدات',
    difficulty: 'intermediate',
    description: 'Use dirb to discover hidden directories on a web server.',
    instructions: ['Run dirb against the target URL', 'Identify hidden or sensitive directories'],
    hints: ['Try: dirb http://example.com'],
    expectedCommand: 'dirb http://example.com',
    explanation: 'Directory brute-forcing discovers hidden files and directories that may expose sensitive information.',
  },
  {
    id: 5,
    courseId: 'infosec-1272',
    title: 'Web Vulnerability Scanning',
    titleAr: 'مسح ثغرات الويب',
    difficulty: 'intermediate',
    description: 'Use nikto to scan for web server vulnerabilities.',
    instructions: ['Run nikto against the target', 'Review the vulnerability report', 'Prioritize findings by severity'],
    hints: ['Try: nikto -h http://example.com'],
    expectedCommand: 'nikto -h http://example.com',
    explanation: 'Nikto tests for dangerous files, outdated versions, and configuration issues.',
  },
  {
    id: 6,
    courseId: 'infosec-1272',
    title: 'SQL Injection Testing',
    titleAr: 'اختبار حقن SQL',
    difficulty: 'advanced',
    description: 'Use sqlmap to test for SQL injection vulnerabilities.',
    instructions: ['Identify a vulnerable parameter', 'Run sqlmap against the target URL', 'Analyze the results'],
    hints: ["Try: sqlmap -u 'http://example.com/page?id=1'"],
    expectedCommand: 'sqlmap -u http://example.com/page?id=1',
    explanation: 'SQLMap automates SQL injection detection and exploitation.',
  },
];
