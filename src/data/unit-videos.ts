/**
 * YouTube video IDs for each unit - Arabic educational videos.
 * Mapped by courseId-unitId key.
 * Only high-quality, beginner-friendly Arabic videos are included.
 */
export const unitVideos: Record<string, string> = {
  // InfoSec 1272
  'infosec-1272-1': '4m0F8iHcdJNw-mVj', // Kali Linux introduction Arabic
  'infosec-1272-2': 'qh8GPr12lVD6uaJ0', // Installing Kali Linux Arabic
  'infosec-1272-3': 'FdgRrC7ZTLb-mce6', // Nmap tutorial Arabic
  'infosec-1272-4': 'pgKMoC8MpGo', // Web app pentesting Arabic
  'infosec-1272-5': 'gBe1Gfn-AzQ', // Burp Suite Arabic tutorial
  'infosec-1272-6': 'X5ySsGkfkdQ', // Metasploit Arabic
  'infosec-1272-7': 'sOUVk2CkFa4', // Social engineering Arabic
  // Wireless 1376
  'wireless-1376-1': 'iYHZ1UZRSbg', // Wireless security fundamentals Arabic
  'wireless-1376-2': '6Rl9KuHeaY4', // Packet sniffing Arabic
  'wireless-1376-3': 'pCzqIvM6mMc', // MAC spoofing Arabic
  'wireless-1376-4': '7bpcMXaGPi4', // Deauth attack Arabic
  'wireless-1376-5': 'WIfCKl0igx8', // WiFi password cracking Arabic
  'wireless-1376-6': 'E7IBZkj0mXs', // Advanced wireless attacks Arabic
};

/** Lesson objectives in Arabic for each unit */
export const unitObjectives: Record<string, string> = {
  'infosec-1272-1': 'التعرف على نظام Kali Linux وفهم دوره في اختبار الاختراق وتقييم الأمان',
  'infosec-1272-2': 'تعلم كيفية تنزيل وتنصيب نظام Kali Linux على بيئة افتراضية أو كنظام مستقل',
  'infosec-1272-3': 'إتقان استخدام أدوات المسح مثل Nmap و DNS tools و OpenVAS لتجميع المعلومات',
  'infosec-1272-4': 'فهم اختبار اختراق تطبيقات الويب باستخدام WebScarab و sqlninja و Websploit',
  'infosec-1272-5': 'تعلم استخدام Burp Suite لاختبار أمان تطبيقات الويب بشكل شامل',
  'infosec-1272-6': 'فهم مفاهيم الاستغلال واستخدام أدوات مثل Metasploit لاختبار الاختراق',
  'infosec-1272-7': 'التعرف على أداة الهندسة الاجتماعية SET وأنماط الهجوم المختلفة',
  'wireless-1376-1': 'فهم الركائز الأمنية الأساسية للشبكات اللاسلكية: المصادقة والسرية والتكاملية',
  'wireless-1376-2': 'تعلم كيفية مراقبة حزم البيانات والتقاطها وتنفيذ هجوم الإغراق',
  'wireless-1376-3': 'إتقان تقنيات انتحال عنوان MAC لتجاوز فلترة العناوين الفيزيائية',
  'wireless-1376-4': 'فهم كيفية اكتشاف الشبكات المخفية باستخدام هجوم إلغاء المصادقة',
  'wireless-1376-5': 'تعلم التقاط حزم المصافحة وتنفيذ هجوم القاموس لكسر كلمات المرور',
  'wireless-1376-6': 'دراسة هجمات لاسلكية متقدمة وأفضل ممارسات تأمين الشبكات',
};

/** Quick summaries in Arabic for each unit */
export const unitSummaries: Record<string, string> = {
  'infosec-1272-1': 'Kali Linux هو نظام تشغيل مبني على Linux مخصص لاختبار الاختراق. يحتوي على مئات الأدوات الأمنية ويتبع نفس بنية المسارات الموجودة في Ubuntu.',
  'infosec-1272-2': 'يمكن تثبيت Kali Linux كنظام مستقل أو كبيئة افتراضية. يحتاج إلى 12GB مساحة و 2GB RAM كحد أدنى. متوفر بصيغ ISO و Vmware و ARM.',
  'infosec-1272-3': 'Nmap هي الأداة الأساسية لمسح الشبكات واكتشاف المنافذ المفتوحة. DNSmap تكتشف النطاقات الفرعية. OpenVAS يبحث عن نقاط الضعف بشكل عميق.',
  'infosec-1272-4': 'اختبار اختراق تطبيقات الويب يشمل استخدام WebScarab كـ proxy وsqlninja لهجمات SQL Injection وWebsploit لتحليل نقاط الضعف.',
  'infosec-1272-5': 'Burp Suite أداة شاملة لاختبار أمان الويب. تحتوي على Proxy لمقاطعة الطلبات و Intruder لأتمتة الهجمات وSpider لاكتشاف محتوى التطبيق.',
  'infosec-1272-6': 'مرحلة الاستغلال تتضمن استخدام Metasploit Framework لاستغلال الثغرات المكتشفة وتوليد الحمولات والتحكم في الأنظمة المستهدفة.',
  'infosec-1272-7': 'SET أداة تعتمد على العنصر البشري وتوفر أنماط هجوم متعددة مثل التصيد الاحتيالي وهجمات المواقع المزيفة وتوليد الحمولات.',
  'wireless-1376-1': 'أمن الشبكات اللاسلكية يرتكز على ثلاث ركائز: المصادقة والسرية والتكاملية. يمكن تعزيز الأمان بإخفاء SSID وفلترة MAC وتفعيل التشفير.',
  'wireless-1376-2': 'للتنصت على الشبكات يجب تحويل كرت الشبكة إلى Monitor Mode. باستخدام airodump-ng يمكن عرض الشبكات والأجهزة المتصلة وتنفيذ هجوم الإغراق.',
  'wireless-1376-3': 'انتحال عنوان MAC يتم بتغيير العنوان الفيزيائي لبطاقة الشبكة إلى عنوان جهاز مسموح له بالاتصال لتجاوز فلترة العناوين.',
  'wireless-1376-4': 'الشبكات المخفية يمكن اكتشافها عبر هجوم Deauthentication الذي يفصل جهاز متصل ويجبره على إعادة الاتصال مكشفاً اسم ESSID.',
  'wireless-1376-5': 'كسر كلمات مرور WiFi يتم بالتقاط حزمة Handshake ثم تنفيذ Dictionary Attack باستخدام Aircrack-ng مع قائمة كلمات مرور.',
  'wireless-1376-6': 'هجوم Evil Twin ينشئ نقطة وصول مزيفة. WPA3 يوفر حماية أقوى. يجب تطبيق أفضل الممارسات مثل التشفير القوي وتحديث firmware.',
};
