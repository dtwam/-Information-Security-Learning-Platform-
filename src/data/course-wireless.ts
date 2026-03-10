/**
 * Course 2: Wireless Network Security (1376)
 * أمن الشبكات اللاسلكية
 * Content extracted from the official course book - Arabic content preserved.
 */
import type { Course, LabChallenge } from './courses';

export const wirelessCourse: Course = {
  id: 'wireless-1376',
  code: '1376',
  title: 'Wireless Network Security',
  titleAr: 'أمن الشبكات اللاسلكية',
  description: 'Learn wireless network security fundamentals, attacks, and defense mechanisms using Kali Linux.',
  descriptionAr: 'تعلم أساسيات أمن الشبكات اللاسلكية والهجمات وآليات الدفاع باستخدام Kali Linux',
  icon: '📡',
  color: 'accent',
  totalUnits: 6,
  units: [
    {
      id: 1,
      courseId: 'wireless-1376',
      title: 'Security Fundamentals',
      titleAr: 'الجلسة الأولى - أساسيات الأمن',
      description: 'Core security concepts for wireless networks: authentication, confidentiality, and integrity.',
      descriptionAr: 'المفاهيم الأمنية الأساسية للشبكات اللاسلكية: المصادقة والسرية والتكاملية',
      icon: '🔑',
      topics: ['Authentication', 'Confidentiality', 'Integrity', 'Router Security', 'MAC Filtering'],
      content: [
        {
          heading: 'Wireless Security Concepts',
          headingAr: 'المفاهيم الأمنية للشبكات اللاسلكية',
          body: `إن تحقيق الأمن يعتبر ضرورة ملحة في كل أنواع شبكات الحاسوب. إلا أن أهميته تزداد بشكل أكبر في شبكات الحاسوب اللاسلكية. يكمن السبب الرئيسي وراء ذلك هو أن الإشارات اللاسلكية لا تحمل عبر أسلاك ولا تنتقل مما يمكن أي جهاز داخل المجال الذي تغطيه تلك الإشارات من استقبالها بسهولة تمهيداً لإحداث الكوارث والاختراقات الأمنية للشبكة.

الركائز الأمنية الأساسية:
- التحقق من الهوية (Authentication): التأكد من هوية الجهاز المتصل
- السرية (Confidentiality): ضمان أن البيانات المتبادلة بين الجهاز المتصل ونقطة الوصول (AP) غير مقروءة للجميع
- التكاملية (Integrity): التأكد من أن الرسالة المرسلة من المرسل هي نفسها التي استقبلها المستقبل`,
          type: 'text',
        },
        {
          heading: 'Additional Security Measures',
          headingAr: 'إجراءات أمنية إضافية',
          body: `إجراءات يمكن تطبيقها لتأمين الشبكة اللاسلكية:

1. تغيير بيانات الهوية الافتراضية للدخول إلى AP (عادة admin/admin)
2. إخفاء اسم الشبكة اللاسلكية (SSID Broadcasting off)
3. فلترة العناوين الفيزيائية (MAC Address Filtering): تحديد الأجهزة المسموح لها بالاتصال
4. تفعيل الجدار الناري داخل AP
5. تفعيل تشفير WPA/WPA2 مع TKIP أو AES`,
          type: 'text',
          commands: [
            { cmd: 'ipconfig', explanation: 'معرفة عنوان IP الخاص بالراوتر (عادة 192.168.1.1)' },
          ],
        },
      ],
      quiz: [
        { question: 'What are the three pillars of wireless security?', options: ['Speed, Range, Cost', 'Authentication, Confidentiality, Integrity', 'WPA, WEP, WPA2', 'SSID, MAC, IP'], correct: 1 },
        { question: 'What is the default router login usually?', options: ['root/toor', 'admin/admin', 'user/password', 'guest/guest'], correct: 1 },
        { question: 'What does MAC filtering do?', options: ['Encrypts data', 'Filters by device physical address', 'Blocks websites', 'Speeds up connection'], correct: 1 },
      ],
      concepts: [
        { name: 'Authentication', nameAr: 'المصادقة', simple: 'التأكد من هوية الجهاز أو المستخدم المتصل بالشبكة', detailed: 'عملية التحقق من هوية الجهاز المتصل بنقطة الوصول للتأكد من أنه مخول بالاتصال بالشبكة اللاسلكية', example: 'إدخال كلمة مرور WiFi للاتصال بالشبكة' },
        { name: 'SSID', nameAr: 'معرف الشبكة', simple: 'اسم الشبكة اللاسلكية الذي يظهر عند البحث عن شبكات متاحة', detailed: 'Service Set Identifier - المعرف الفريد للشبكة اللاسلكية الذي يمكن إخفاؤه كإجراء أمني إضافي', example: 'إخفاء SSID يمنع ظهور اسم الشبكة في قائمة الشبكات المتاحة' },
      ],
    },
    {
      id: 2,
      courseId: 'wireless-1376',
      title: 'Packet Sniffing & Flooding',
      titleAr: 'الجلسة الثانية - التنصت على الحزم وهجوم الإغراق',
      description: 'Monitor wireless traffic, capture packets, and understand flooding attacks.',
      descriptionAr: 'مراقبة حركة البيانات اللاسلكية والتقاط الحزم وفهم هجمات الإغراق',
      icon: '📦',
      topics: ['Monitor Mode', 'Airodump-ng', 'Aireplay-ng', 'Packet Sniffing', 'Flooding Attack'],
      content: [
        {
          heading: 'Session Description',
          headingAr: 'وصف الجلسة',
          body: `أغلب الهجمات التي يتم تنفيذها ضد الشبكات اللاسلكية يحتاج فيها المهاجم إلى التنصت على حزم البيانات المنتقلة في الشبكة ومن ثم الاستفادة من البيانات المهمة التي تحتويها تلك الحزم.

في هذه الجلسة سيتم مراقبة حزم البيانات المتبادلة بين الأجهزة من جهة و AP من جهة أخرى ثم استنباط المحتوى لتنفيذ هجوم إغراق الجهاز المتصل بالحزم لتعطيل اتاحة الشبكة اللاسلكية.`,
          type: 'text',
        },
        {
          heading: 'Setting up Monitor Mode',
          headingAr: 'تفعيل وضع المراقبة',
          body: `للتنصت على الشبكات اللاسلكية نحتاج إلى تحويل كرت الشبكة اللاسلكي الخارجي من Managed Mode إلى Monitor Mode.

ملاحظة: أغلب البطاقات اللاسلكية الداخلية في أجهزة اللابتوب لا تدعم عملية التحول إلى Monitor Mode لذلك نحتاج إلى كرت شبكة لاسلكي خارجي USB.`,
          type: 'text',
          commands: [
            { cmd: 'iwconfig', explanation: 'التحقق من أن الجهاز تعرف على كرت الشبكة اللاسلكي الجديد' },
            { cmd: 'ifconfig wlan0 up', explanation: 'تفعيل كرت الشبكة اللاسلكي' },
            { cmd: 'airmon-ng start wlan0', explanation: 'تحويل كرت الشبكة إلى وضع Monitor' },
            { cmd: 'airmon-ng check kill', explanation: 'إيقاف العمليات التي تمنع التحويل إلى Monitor' },
            { cmd: 'airodump-ng wlan0mon', explanation: 'عرض كل نقاط الوصول التي يستطيع كرت الشبكة التقاطها' },
            { cmd: 'airodump-ng --bssid MAC --channel CH wlan0mon', explanation: 'تتبع نقطة وصول محددة' },
            { cmd: 'aireplay-ng -0 600 -a AP_MAC -c CLIENT_MAC wlan0mon', explanation: 'هجوم إغراق جهاز محدد بالحزم لفصله عن الشبكة' },
          ],
        },
      ],
      quiz: [
        { question: 'What mode must the wireless card be in to sniff packets?', options: ['Managed Mode', 'Monitor Mode', 'AP Mode', 'Ad-hoc Mode'], correct: 1 },
        { question: 'What tool is used to scan wireless networks?', options: ['nmap', 'airodump-ng', 'nikto', 'dirb'], correct: 1 },
        { question: 'What does a flooding attack do?', options: ['Steals passwords', 'Disconnects devices from network', 'Encrypts data', 'Creates backups'], correct: 1 },
      ],
      concepts: [
        { name: 'Monitor Mode', nameAr: 'وضع المراقبة', simple: 'وضع خاص لكرت الشبكة اللاسلكي يتيح التقاط جميع الحزم في الهواء', detailed: 'وضع تشغيل لبطاقة الشبكة اللاسلكية يسمح بالتقاط جميع حزم البيانات المنتقلة في الهواء دون الحاجة للاتصال بأي شبكة', example: 'airmon-ng start wlan0 لتحويل الكرت إلى Monitor Mode' },
        { name: 'Packet Sniffing', nameAr: 'التنصت على الحزم', simple: 'مراقبة والتقاط حزم البيانات المتنقلة في الشبكة', detailed: 'عملية اعتراض وتسجيل حزم البيانات المتبادلة بين الأجهزة في الشبكة اللاسلكية للحصول على معلومات مفيدة مثل كلمات المرور والبيانات الحساسة', example: 'airodump-ng wlan0mon لعرض الشبكات والأجهزة المتصلة' },
      ],
    },
    {
      id: 3,
      courseId: 'wireless-1376',
      title: 'MAC Address Spoofing',
      titleAr: 'الجلسة الثالثة - انتحال عنوان MAC',
      description: 'Learn MAC address spoofing techniques to bypass MAC filtering.',
      descriptionAr: 'تعلم تقنيات انتحال عنوان MAC لتجاوز فلترة العناوين الفيزيائية',
      icon: '🎭',
      topics: ['MAC Address', 'Spoofing', 'MAC Filtering Bypass', 'macchanger'],
      content: [
        {
          heading: 'Session Description',
          headingAr: 'وصف الجلسة',
          body: `من الاستراتيجيات الأمنية التي تطبق في الشبكات اللاسلكية لحمايتها من الدخلاء هي عمل فلترة لعناوين MAC للأجهزة التي يسمح لها بالاتصال بالشبكة.

في هذه الجلسة سيتم عمل تتبع لعناوين الأجهزة المتصلة بالشبكة ثم تغيير عنوان MAC لكرت الشبكة الخارجي إلى عنوان MAC لأحد الأجهزة المتصلة (انتحال عنوان MAC لجهاز متصل) ليتم قبول جهازنا والتمكن من الاتصال بالشبكة.`,
          type: 'text',
        },
        {
          heading: 'MAC Spoofing Steps',
          headingAr: 'خطوات انتحال عنوان MAC',
          body: `خطوات تغيير عنوان MAC:
1. إيقاف وضع Monitor وإرجاعه إلى Managed Mode
2. معرفة عنوان MAC الخاص ببطاقة الشبكة اللاسلكية
3. عرض الشبكات اللاسلكية والأجهزة المتصلة
4. إيقاف عمل بطاقة الشبكة مؤقتاً
5. تغيير عنوان MAC إلى العنوان المستهدف
6. إعادة تشغيل بطاقة الشبكة`,
          type: 'text',
          commands: [
            { cmd: 'airmon-ng stop wlan0mon', explanation: 'إيقاف وضع Monitor وإرجاعه إلى Managed Mode' },
            { cmd: 'ifconfig wlan0', explanation: 'معرفة عنوان MAC الحالي لبطاقة الشبكة' },
            { cmd: 'ifconfig wlan0 down', explanation: 'إيقاف عمل بطاقة الشبكة مؤقتاً' },
            { cmd: 'ifconfig wlan0 hw ether TARGET_MAC', explanation: 'تغيير عنوان MAC إلى العنوان المستهدف' },
            { cmd: 'ifconfig wlan0 up', explanation: 'إعادة تشغيل بطاقة الشبكة' },
            { cmd: 'macchanger -p wlan0', explanation: 'إعادة عنوان MAC إلى العنوان الأصلي' },
          ],
        },
      ],
      quiz: [
        { question: 'What is MAC address spoofing?', options: ['Changing your IP address', 'Changing your physical network address', 'Creating a fake network', 'Encrypting traffic'], correct: 1 },
        { question: 'Why would an attacker spoof a MAC address?', options: ['For faster internet', 'To bypass MAC filtering', 'To change DNS', 'To encrypt data'], correct: 1 },
        { question: 'What command restores the original MAC?', options: ['ifconfig wlan0 up', 'macchanger -p wlan0', 'airmon-ng start wlan0', 'iwconfig'], correct: 1 },
      ],
      concepts: [
        { name: 'MAC Address', nameAr: 'عنوان MAC', simple: 'العنوان الفيزيائي الفريد لكل جهاز شبكة', detailed: 'Media Access Control - عنوان فريد مكون من 6 أزواج من الأرقام السداسية عشرية يُعرّف كل بطاقة شبكة بشكل فريد', example: '64:70:02:DD:43:33' },
        { name: 'MAC Spoofing', nameAr: 'انتحال عنوان MAC', simple: 'تغيير عنوان MAC الخاص بجهازك ليبدو كجهاز آخر', detailed: 'تقنية يتم فيها تغيير عنوان MAC لبطاقة الشبكة إلى عنوان MAC لجهاز آخر مسموح له بالاتصال لتجاوز قيود فلترة العناوين', example: 'ifconfig wlan0 hw ether 34:F3:09:1E لتغيير العنوان' },
      ],
    },
    {
      id: 4,
      courseId: 'wireless-1376',
      title: 'Deauthentication Attack',
      titleAr: 'الجلسة الرابعة - هجوم المصادقة لاكتشاف الشبكات المخفية',
      description: 'Use deauthentication attacks to discover hidden wireless networks.',
      descriptionAr: 'استخدام هجوم إلغاء المصادقة لاكتشاف الشبكات اللاسلكية المخفية',
      icon: '👁️',
      topics: ['Hidden Networks', 'Deauthentication', 'ESSID Discovery', 'Network Probing'],
      content: [
        {
          heading: 'Session Description',
          headingAr: 'وصف الجلسة',
          body: `من الاستراتيجيات الأمنية التي تطبق في الشبكات اللاسلكية لحمايتها هي إخفاء بيانات الشبكة (ESSID Broadcasting off). فلا يظهر اسمها عند البحث عن الشبكات المحيطة.

في هذه الجلسة سيتم التعرف على إحدى الطرق التي يستخدمها المهاجم لاكتشاف الشبكات اللاسلكية المخفية من خلال استغلال هجوم يدعى (Deauthentication Attack) الذي يستخدم لفصل اتصال جهاز ما من الشبكة اللاسلكية وإعادة اتصاله مرة أخرى بعد أن يقدم بيانات المصادقة لـ AP والتي يستفيد منها المهاجم لاكتشاف ESSID الخاص بالشبكة.`,
          type: 'text',
        },
        {
          heading: 'Discovering Hidden Networks',
          headingAr: 'اكتشاف الشبكات المخفية',
          body: `خطوات اكتشاف الشبكة المخفية:
1. تحويل كرت الشبكة إلى وضع Monitor
2. عرض الشبكات المحيطة - ستظهر الشبكة المخفية بـ <length: 0>
3. التنصت على الشبكة المخفية وعرض الأجهزة المتصلة بها
4. تنفيذ هجوم Deauthentication لفصل جهاز متصل
5. عند إعادة اتصال الجهاز سيكشف عن اسم ESSID المخفي`,
          type: 'text',
          commands: [
            { cmd: 'airmon-ng start wlan0', explanation: 'تحويل الكرت إلى وضع Monitor' },
            { cmd: 'airodump-ng wlan0mon', explanation: 'عرض جميع الشبكات - المخفية ستظهر بـ <length: 0>' },
            { cmd: 'airodump-ng --bssid MAC --channel CH wlan0mon', explanation: 'التنصت على شبكة محددة' },
            { cmd: 'aireplay-ng -0 1 -a AP_MAC -c CLIENT_MAC wlan0mon', explanation: 'هجوم Deauthentication لفصل جهاز وإجباره على إعادة الاتصال' },
          ],
        },
      ],
      quiz: [
        { question: 'What does ESSID Broadcasting off do?', options: ['Encrypts the network', 'Hides the network name', 'Blocks all connections', 'Speeds up the network'], correct: 1 },
        { question: 'How does deauth attack reveal hidden networks?', options: ['By cracking the password', 'By forcing reconnection which reveals ESSID', 'By disabling encryption', 'By scanning all ports'], correct: 1 },
      ],
      concepts: [
        { name: 'Hidden Network', nameAr: 'الشبكة المخفية', simple: 'شبكة لاسلكية لا يظهر اسمها في قائمة الشبكات المتاحة', detailed: 'شبكة تم تعطيل خاصية بث ESSID فيها مما يجعلها غير مرئية عند البحث عن الشبكات، لكنها ليست آمنة تماماً حيث يمكن اكتشافها بأدوات متخصصة', example: 'تظهر في airodump-ng كـ <length: 0>' },
        { name: 'Deauthentication Attack', nameAr: 'هجوم إلغاء المصادقة', simple: 'هجوم يفصل جهاز متصل عن الشبكة اللاسلكية بالقوة', detailed: 'إرسال حزم إلغاء مصادقة مزيفة إلى جهاز متصل بالشبكة مما يجبره على قطع الاتصال ثم إعادة الاتصال، وخلال عملية إعادة الاتصال يمكن التقاط معلومات مهمة', example: 'aireplay-ng -0 1 -a AP_MAC -c CLIENT_MAC wlan0mon' },
      ],
    },
    {
      id: 5,
      courseId: 'wireless-1376',
      title: 'Password Cracking (Dictionary Attack)',
      titleAr: 'الجلسة الخامسة - اختبار اختراق كلمات المرور',
      description: 'Capture handshake packets and perform dictionary attacks on wireless passwords.',
      descriptionAr: 'التقاط حزم المصافحة وتنفيذ هجوم القاموس على كلمات مرور الشبكات اللاسلكية',
      icon: '🔐',
      topics: ['Handshake Capture', 'Dictionary Attack', 'Aircrack-ng', 'Wireshark', 'Crunch'],
      content: [
        {
          heading: 'Session Description',
          headingAr: 'وصف الجلسة',
          body: `من المفاهيم الأساسية المستخدمة لحماية الشبكات اللاسلكية هو حمايتها بكلمة مرور حتى تتمكن فقط الأجهزة المخولة التي تملك كلمة المرور هذه من الاتصال بالشبكة.

في هذه الجلسة سيتم التعرف على إحدى الطرق المستخدمة من قبل المهاجمين لاكتشاف كلمات مرور الشبكات اللاسلكية من خلال تتبع الحزم والاحتفاظ بها في ملف واستعراض محتوياتها من خلال برنامج Wireshark.`,
          type: 'text',
        },
        {
          heading: 'Attack Steps',
          headingAr: 'خطوات الهجوم',
          body: `الخطوات:
1. تحويل كرت الشبكة إلى Monitor Mode
2. عرض الشبكات وتحديد الشبكة المستهدفة
3. تتبع وتسجيل الحزم المتبادلة في ملف
4. تنفيذ Deauthentication لالتقاط حزمة المصافحة (Handshake)
5. إنشاء قائمة كلمات مرور باستخدام Crunch
6. تنفيذ Dictionary Attack باستخدام Aircrack-ng`,
          type: 'text',
          commands: [
            { cmd: 'airodump-ng --bssid MAC --channel CH --write filename wlan0mon', explanation: 'تتبع وحفظ الحزم في ملف' },
            { cmd: 'aireplay-ng -0 1 -a AP_MAC -c CLIENT_MAC wlan0mon', explanation: 'فصل جهاز لالتقاط Handshake' },
            { cmd: 'crunch 1 4 012ab -o Desktop/test.txt', explanation: 'إنشاء قائمة كلمات مرور محددة المواصفات' },
            { cmd: 'aircrack-ng -w wordlist.txt capture.cap', explanation: 'كسر كلمة المرور باستخدام قائمة الكلمات' },
          ],
        },
      ],
      quiz: [
        { question: 'What is a handshake packet?', options: ['A greeting message', 'Authentication data exchanged when connecting', 'A type of encryption', 'A routing protocol'], correct: 1 },
        { question: 'What tool creates password wordlists?', options: ['Nmap', 'Crunch', 'Nikto', 'Wireshark'], correct: 1 },
        { question: 'What tool cracks WiFi passwords?', options: ['airmon-ng', 'airodump-ng', 'aircrack-ng', 'aireplay-ng'], correct: 2 },
      ],
      concepts: [
        { name: 'Handshake', nameAr: 'المصافحة', simple: 'تبادل بيانات المصادقة بين الجهاز ونقطة الوصول عند الاتصال', detailed: 'عملية تبادل حزم البيانات التي تحتوي على بيانات المصادقة بين الجهاز المتصل و Access Point عند بداية الاتصال، التقاط هذه الحزمة ضروري لتنفيذ هجوم القاموس', example: 'التقاط حزمة 4-way handshake باستخدام airodump-ng --write' },
        { name: 'Dictionary Attack', nameAr: 'هجوم القاموس', simple: 'تجربة قائمة من كلمات المرور المحتملة حتى إيجاد الصحيحة', detailed: 'أسلوب لكسر كلمات المرور يعتمد على تجربة كل كلمة في قائمة معدة مسبقاً ومقارنتها مع البيانات الملتقطة حتى إيجاد التطابق', example: 'aircrack-ng -w wordlist.txt capture.cap' },
      ],
    },
    {
      id: 6,
      courseId: 'wireless-1376',
      title: 'Advanced Wireless Attacks',
      titleAr: 'الجلسة السادسة - هجمات لاسلكية متقدمة',
      description: 'Advanced wireless security topics including Evil Twin, WPA cracking, and wireless IDS.',
      descriptionAr: 'مواضيع أمن لاسلكي متقدمة تشمل Evil Twin وكسر WPA وأنظمة كشف التسلل اللاسلكية',
      icon: '💀',
      topics: ['Evil Twin Attack', 'WPA/WPA2 Security', 'Wireless IDS', 'Best Practices'],
      content: [
        {
          heading: 'Advanced Concepts',
          headingAr: 'مفاهيم متقدمة',
          body: `في هذه الجلسة نتناول مواضيع متقدمة في أمن الشبكات اللاسلكية:

1. هجوم Evil Twin: إنشاء نقطة وصول مزيفة بنفس اسم الشبكة المستهدفة لخداع المستخدمين
2. تحسينات أمان WPA3: البروتوكول الأحدث الذي يوفر حماية أقوى
3. أنظمة كشف التسلل اللاسلكية (WIDS): مراقبة الشبكة للكشف عن الهجمات
4. أفضل الممارسات لتأمين الشبكات اللاسلكية`,
          type: 'text',
        },
        {
          heading: 'Security Best Practices',
          headingAr: 'أفضل ممارسات الأمان',
          body: `لتأمين شبكتك اللاسلكية:
- استخدم تشفير WPA2 أو WPA3 مع كلمة مرور قوية
- غيّر بيانات الدخول الافتراضية للراوتر
- أخفِ اسم الشبكة (SSID)
- فعّل فلترة عناوين MAC
- فعّل الجدار الناري
- حدّث firmware الراوتر بانتظام
- استخدم شبكة ضيوف منفصلة
- راقب الأجهزة المتصلة بشكل دوري`,
          type: 'text',
        },
      ],
      quiz: [
        { question: 'What is an Evil Twin attack?', options: ['Creating a fake access point', 'Cloning a hard drive', 'Duplicating an IP address', 'Creating a backdoor'], correct: 0 },
        { question: 'Which is the most secure WiFi protocol?', options: ['WEP', 'WPA', 'WPA2', 'WPA3'], correct: 3 },
      ],
      concepts: [
        { name: 'Evil Twin', nameAr: 'التوأم الشرير', simple: 'نقطة وصول مزيفة تحمل نفس اسم شبكة حقيقية لخداع المستخدمين', detailed: 'هجوم يقوم فيه المهاجم بإنشاء نقطة وصول لاسلكية مزيفة بنفس اسم SSID وإعدادات الشبكة المستهدفة لاعتراض حركة البيانات', example: 'إنشاء نقطة وصول باسم "CoffeeShop_WiFi" بجانب مقهى' },
        { name: 'WPA3', nameAr: 'بروتوكول WPA3', simple: 'أحدث بروتوكول لتشفير الشبكات اللاسلكية يوفر حماية أقوى', detailed: 'الجيل الثالث من بروتوكول الوصول المحمي للشبكات اللاسلكية، يوفر تشفير أقوى ومقاومة أفضل لهجمات القاموس', example: 'WPA3 يستخدم SAE بدلاً من PSK للمصادقة' },
      ],
    },
  ],
};

export const wirelessLabChallenges: LabChallenge[] = [
  {
    id: 101,
    courseId: 'wireless-1376',
    title: 'Wireless Network Discovery',
    titleAr: 'اكتشاف الشبكات اللاسلكية',
    difficulty: 'beginner',
    description: 'Set up monitor mode and scan for wireless networks.',
    instructions: ['Enable monitor mode on your wireless adapter', 'Scan for available wireless networks', 'Identify network details (BSSID, Channel, Encryption)'],
    hints: ['Use airmon-ng to enable monitor mode', 'Use airodump-ng to scan networks'],
    expectedCommand: 'airodump-ng wlan0mon',
    explanation: 'Airodump-ng captures raw 802.11 frames to identify wireless networks and connected clients.',
  },
  {
    id: 102,
    courseId: 'wireless-1376',
    title: 'Client Tracking',
    titleAr: 'تتبع الأجهزة المتصلة',
    difficulty: 'intermediate',
    description: 'Track clients connected to a specific access point.',
    instructions: ['Identify a target access point', 'Filter by BSSID and channel', 'List all connected clients'],
    hints: ['Use airodump-ng with --bssid and --channel filters'],
    expectedCommand: 'airodump-ng --bssid 64:70:02:DD:43:33 --channel 2 wlan0mon',
    explanation: 'Filtering by BSSID and channel shows only clients connected to a specific access point.',
  },
  {
    id: 103,
    courseId: 'wireless-1376',
    title: 'MAC Address Change',
    titleAr: 'تغيير عنوان MAC',
    difficulty: 'intermediate',
    description: 'Change your wireless adapter MAC address to bypass filtering.',
    instructions: ['Disable the wireless interface', 'Change the MAC address', 'Re-enable the interface and verify'],
    hints: ['Use ifconfig wlan0 down, then ifconfig wlan0 hw ether NEW_MAC'],
    expectedCommand: 'ifconfig wlan0 hw ether 34:F3:09:1E',
    explanation: 'Changing the MAC address allows bypassing MAC address filtering on wireless networks.',
  },
];
