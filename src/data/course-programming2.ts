/**
 * Course 3: Programming 2 (1295) — Object-Oriented Programming using Java
 * البرمجة الكينونية بلغة جافا
 *
 * Source material: Al-Quds Open University course 1295 (Ch1–Ch8 slides + virtual
 * meeting PDFs on Exceptions, Multithreading, and Java I/O). Original Arabic
 * textbook content is preserved verbatim where quoted; explanations have been
 * restructured for university-level clarity and AI retrieval (Definition →
 * Explanation → Example → Key Points → Tips → Common Mistakes).
 */
import type { Course, LabChallenge } from './courses';

export const programming2Course: Course = {
  id: 'programming2-1295',
  code: '1295',
  title: 'Programming 2 — Java OOP',
  titleAr: 'البرمجة الكينونية بلغة جافا — برمجة 2',
  description:
    'Object-oriented programming with Java: classes, inheritance, polymorphism, interfaces, exceptions, multithreading, and I/O streams.',
  descriptionAr:
    'تعلّم البرمجة الكينونية بلغة جافا: الأصناف، التوارث، تعدد الأوجه، الواجهات، معالجة الاستثناءات، القنوات المتعددة، وعمليات الإدخال والإخراج.',
  icon: '☕',
  color: 'primary',
  totalUnits: 8,
  units: [
    // ============================================================
    // UNIT 1 — Introduction to Java
    // ============================================================
    {
      id: 1,
      courseId: 'programming2-1295',
      title: 'Introduction to Java',
      titleAr: 'مقدمة في لغة جافا',
      description: 'History, features, JDK, and the Java Virtual Machine (JVM).',
      descriptionAr: 'تاريخ لغة جافا، مزاياها، عدة التطوير JDK، وآلة جافا التخيلية JVM.',
      icon: '☕',
      topics: ['Java History', 'JDK', 'JVM', 'Bytecode', 'Platform Independence'],
      objectiveAr:
        'التعرف على لغة جافا، تاريخها، ميزاتها الرئيسية، ومكونات بيئة التطوير (JDK + JVM)، وفهم لماذا تُعتبر جافا لغة محمولة (Portable).',
      summaryAr:
        'جافا لغة كائنية المنحى (OOP) ابتُكرت عام 1991 في شركة Sun Microsystems. تتميّز بأنها بسيطة، آمنة، قابلة للنقل (Write Once, Run Anywhere) عبر آلة جافا التخيلية JVM التي تنفّذ الـ Bytecode بدلاً من الكود الآلي للمعالج.',
      content: [
        {
          heading: 'What is Java?',
          headingAr: 'ما هي لغة جافا؟',
          body: `جافا (Java) هي لغة برمجة كائنية المنحى (Object-Oriented) ابتكرها المهندس جيمس جوزلينج في شركة Sun Microsystems مطلع التسعينيات، واعتمدت لغة C++ كأساس لها.

أُطلق عليها في البداية اسم OAK (شجرة البلوط)، وكانت موجّهة للتحكّم بالتلفاز التفاعلي، ثم أُعيدت تسميتها إلى Java وانتشرت بقوة مع ظهور تطبيقات الويب (Applets).

تتميز جافا بأنها لغة محمولة (Portable): يُكتب البرنامج مرة واحدة وينفَّذ على أي جهاز ونظام تشغيل دون تعديل، بفضل آلة جافا التخيلية (JVM).`,
          type: 'text',
        },
        {
          heading: 'Key Features',
          headingAr: 'مزايا لغة جافا',
          body: `1- السهولة (Simple): صُمّمت للتخلّص من تعقيدات C++ مثل المؤشرات والوراثة المتعددة.
2- موجّهة للكائنات (Object-Oriented): كل شيء في جافا تقريباً عبارة عن كائن.
3- قابلة للتوزيع (Distributable): مناسبة لتطبيقات الشبكات (java.net) وواجهات Swing.
4- قوية (Robust): إدارة ذاكرة تلقائية (Garbage Collector) ومعالجة استثناءات قوية.
5- آمنة (Secure): تنفّذ الكود داخل بيئة معزولة (Sandbox) داخل JVM.
6- قابلة للنقل (Portable): الـ Bytecode يعمل على أي JVM.
7- ذات أداء عالٍ (High Performance): بفضل مترجم JIT.`,
          type: 'text',
        },
        {
          heading: 'JDK vs JRE vs JVM',
          headingAr: 'الفرق بين JDK و JRE و JVM',
          body: `• JVM (Java Virtual Machine): آلة جافا التخيلية — هي البرنامج الذي يُنفّذ الـ Bytecode على جهازك.
• JRE (Java Runtime Environment): يحوي JVM + المكتبات اللازمة لتشغيل برامج جافا (لكنه لا يُترجم).
• JDK (Java Development Kit): الحزمة الكاملة للمطوّر = JRE + المترجم javac + الأدوات (debugger، javadoc...).

دورة الحياة:
ملف .java  →  (javac)  →  ملف .class (Bytecode)  →  (JVM)  →  تنفيذ على أي نظام تشغيل.`,
          type: 'diagram',
        },
        {
          heading: 'Your First Java Program',
          headingAr: 'أول برنامج بلغة جافا',
          body: `كل برنامج جافا يبدأ بصنف (class) ودالة main التي تُعتبر نقطة البداية للتنفيذ:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

اشرح السطور:
• public class HelloWorld: تعريف صنف عام باسم HelloWorld (يجب أن يطابق اسم الملف).
• public static void main: نقطة دخول البرنامج، static تعني يمكن استدعاؤها بدون إنشاء كائن.
• System.out.println: يطبع نصاً ثم ينتقل لسطر جديد.`,
          type: 'text',
          commands: [
            { cmd: 'javac HelloWorld.java', explanation: 'ترجمة الملف وإنتاج HelloWorld.class' },
            { cmd: 'java HelloWorld', explanation: 'تشغيل البرنامج عبر JVM' },
          ],
        },
      ],
      concepts: [
        {
          name: 'JVM',
          nameAr: 'آلة جافا التخيلية',
          simple: 'البرنامج الذي يُنفّذ الـ Bytecode على أي نظام تشغيل.',
          detailed:
            'JVM يفصل بين الكود المترجم وبيئة التشغيل، فيُمكّن جافا من العمل على Windows و Linux و macOS بنفس الـ .class.',
          example: 'java MyApp يستدعي JVM لتنفيذ MyApp.class',
        },
        {
          name: 'Bytecode',
          nameAr: 'الكود الوسيط',
          simple: 'كود وسيط ينتجه javac ويُنفّذه JVM.',
          detailed: 'ليس كود آلة خاص بمعالج معين، بل تعليمات قياسية تفهمها كل JVM، وهو سرّ مبدأ Write Once Run Anywhere.',
          example: 'ملف .class الناتج عن javac',
        },
      ],
      quiz: [
        {
          question: 'What does "Write Once, Run Anywhere" rely on?',
          questionAr: 'على ماذا يعتمد مبدأ "اكتب مرة، شغّل في كل مكان"؟',
          options: ['JDK', 'JVM and Bytecode', 'C++ compiler', 'HTML'],
          correct: 1,
          explanation: 'JVM ينفّذ Bytecode متعدّد المنصات.',
        },
        {
          question: 'Which tool compiles Java source code?',
          options: ['java', 'javac', 'jvm', 'jre'],
          correct: 1,
          explanation: 'javac هو المترجم. java هو المنفذ.',
        },
        {
          question: 'A .class file contains:',
          options: ['Source code', 'Machine code', 'Bytecode', 'HTML'],
          correct: 2,
          explanation: 'Bytecode هو الناتج من javac.',
        },
      ],
    },

    // ============================================================
    // UNIT 2 — OOP Concepts
    // ============================================================
    {
      id: 2,
      courseId: 'programming2-1295',
      title: 'Object-Oriented Programming Concepts',
      titleAr: 'المفاهيم الأساسية للبرمجة الكينونية',
      description: 'Objects, classes, messages, encapsulation, inheritance, polymorphism, interfaces.',
      descriptionAr: 'الكائنات، الأصناف، الرسائل، التغليف، التوارث، تعدد الأوجه، الواجهات.',
      icon: '🧩',
      topics: ['Object', 'Class', 'Message', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Interface'],
      objectiveAr:
        'فهم المفاهيم السبعة الأساسية للبرمجة كائنية المنحى وكيف تطبّقها لغة جافا، والتمييز بين البرمجة الإجرائية والبرمجة الكينونية.',
      summaryAr:
        'البرمجة الكينونية تدمج البيانات والمناهج التي تعمل عليها داخل وحدة واحدة (Object). الصنف Class هو القالب الذي تُنشأ منه الكائنات. الكائنات تتواصل عبر الرسائل (استدعاء المناهج)، وتدعم التوارث وتعدد الأوجه والتغليف.',
      content: [
        {
          heading: 'OOP vs Procedural Programming',
          headingAr: 'الفرق بين البرمجة الكينونية والإجرائية',
          body: `البرمجة الإجرائية (Procedural): يُكتب البرنامج كسلسلة من الإجراءات/الدوال التي تعمل على بيانات منفصلة.

البرمجة الكينونية (OOP): تَدمج البيانات (المتغيرات) والعمليات (المناهج) في وحدة واحدة تُسمى الكائن (Object). هذا الدمج يُعرف بمفهوم التغليف (Encapsulation).

الفكرة الأساسية: محاكاة كائنات العالم الحقيقي. مثلاً، التلفاز ككائن: له حالة (channel، volume) وله سلوك (turnOn، changeChannel).`,
          type: 'text',
        },
        {
          heading: 'Object',
          headingAr: 'الكائن (Object)',
          body: `الكائن هو الوحدة الأساسية في برنامج جافا. يتكوّن من:
• الحالة (State): متغيرات مثيلية (Instance Variables) تصف خصائصه.
• السلوك (Behavior): مناهج مثيلية (Instance Methods) تصف ما يستطيع فعله.

مثال: كائن "سيارة" له حالة (color، speed، fuel) وسلوك (start، stop، accelerate).`,
          type: 'text',
        },
        {
          heading: 'Class',
          headingAr: 'الصنف (Class)',
          body: `الصنف هو القالب أو النموذج (Blueprint) الذي تُنشأ بحسبه الكائنات. الصنف ليس شيئاً محسوساً، بينما الكائن هو التمثيل المحسوس له.

الأصناف تصف الكائنات، والكائنات هي مثيلات (Instances) عن أصنافها.`,
          type: 'text',
          commands: [
            { cmd: 'class Car { String color; void drive() {} }', explanation: 'تعريف صنف Car' },
            { cmd: 'Car myCar = new Car();', explanation: 'إنشاء كائن (مثيل) من الصنف' },
          ],
        },
        {
          heading: 'Encapsulation',
          headingAr: 'التغليف (Encapsulation)',
          body: `التغليف يعني عدم السماح بالوصول إلى متغيرات الكائن إلا عن طريق مناهجه. يتحقّق في جافا بجعل المتغيرات private وتوفير دوال getter / setter للوصول إليها.

فوائد التغليف:
• حماية البيانات من التعديل العشوائي.
• تسهيل التعديل لاحقاً دون كسر الكود الذي يستخدم الصنف.
• تحديد دقيق لمدخلات ومخرجات الكائن.
• إعادة الاستخدام.`,
          type: 'text',
        },
        {
          heading: 'Inheritance & Polymorphism',
          headingAr: 'التوارث وتعدد الأوجه',
          body: `التوارث (Inheritance): تعريف صنف فرعي (Subclass) بناءً على صنف أساس (Superclass) للاستفادة من خصائصه. في جافا تُستخدم الكلمة المفتاحية extends.

تعدد الأوجه (Polymorphism): قدرة المنهج نفسه على التصرّف بشكل مختلف حسب الكائن المستدعي. مثال: drawShape() قد ترسم دائرة أو مربع حسب الكائن.

إعادة التحميل (Overloading): عدة مناهج بنفس الاسم لكن بمعاملات مختلفة (يحدّد الفرق وقت الترجمة).
الهيمنة (Overriding): إعادة تعريف منهج موروث في الصنف الفرعي (يحدّد الفرق وقت التشغيل).`,
          type: 'text',
        },
        {
          heading: 'Interface',
          headingAr: 'الواجهة (Interface)',
          body: `الواجهة هي قالب يحوي مناهج تجريدية (بدون تنفيذ). الصنف الذي ينفّذ الواجهة (implements) يجب عليه توفير جسم لكل مناهجها.

تختلف عن الصنف:
• لا تحوي تنفيذاً للمناهج (في الإصدارات القديمة).
• الصنف يستطيع تنفيذ عدة واجهات لكن يرث صنفاً واحداً فقط — وبهذا تحلّ مشكلة الوراثة المتعددة.`,
          type: 'text',
        },
      ],
      concepts: [
        {
          name: 'Encapsulation',
          nameAr: 'التغليف',
          simple: 'إخفاء البيانات وحمايتها داخل الكائن.',
          detailed: 'جعل المتغيرات private والوصول إليها عبر getter/setter يحمي حالة الكائن من التعديل غير المنضبط.',
          example: 'private int age; public int getAge() { return age; }',
        },
        {
          name: 'Polymorphism',
          nameAr: 'تعدد الأوجه',
          simple: 'منهج واحد يتصرّف بأشكال مختلفة.',
          detailed: 'يتحقّق عبر الـ Overriding أو الـ Overloading. مثلاً، Animal a = new Dog(); a.speak(); تستدعي نسخة Dog.',
          example: 'Shape s = new Circle(); s.draw();',
        },
        {
          name: 'Message',
          nameAr: 'الرسالة',
          simple: 'استدعاء منهج على كائن لتنفيذ مهمة.',
          detailed: 'الرسالة تتكوّن من: اسم الكائن المستقبل، اسم المنهج، والمعاملات. مثل obj.method(args).',
          example: 'myCar.drive(60);',
        },
      ],
      quiz: [
        {
          question: 'Which keyword is used for inheritance in Java?',
          options: ['inherits', 'extends', 'implements', 'super'],
          correct: 1,
          explanation: 'extends للوراثة من صنف، و implements لتطبيق واجهة.',
        },
        {
          question: 'Encapsulation is best achieved by:',
          options: ['Public fields', 'Private fields with getters/setters', 'Static methods', 'Inheritance'],
          correct: 1,
          explanation: 'التغليف الحقيقي يخفي الحقول ويوفّر وصولاً منضبطاً.',
        },
        {
          question: 'Method overloading differs from overriding because overloading:',
          options: [
            'Happens at runtime',
            'Requires inheritance',
            'Uses same name with different parameters in same class',
            'Returns void only',
          ],
          correct: 2,
          explanation: 'Overloading = نفس الاسم بمعاملات مختلفة في نفس الصنف.',
        },
      ],
    },

    // ============================================================
    // UNIT 3 — Variables, Operators & Control Flow
    // ============================================================
    {
      id: 3,
      courseId: 'programming2-1295',
      title: 'Variables, Operators & Control Flow',
      titleAr: 'المتغيرات والمشغلات والتحكّم بالدفق',
      description: 'Data types, operators, expressions, conditionals, loops, and strings in Java.',
      descriptionAr: 'أنواع البيانات، المشغلات، التعابير، الجمل الشرطية والتكرار، والسلاسل النصية.',
      icon: '🔢',
      topics: ['Primitive Types', 'Operators', 'if/switch', 'Loops', 'Strings', 'Arrays'],
      objectiveAr:
        'إتقان لبنات لغة جافا الأساسية: تعريف المتغيرات، استخدام المشغلات، كتابة الجمل الشرطية وحلقات التكرار، والتعامل مع النصوص والمصفوفات.',
      summaryAr:
        'جافا تميّز بين أنواع بدائية (int, double, char, boolean…) وأنواع مرجعية (String, arrays, objects). تستخدم if/else و switch للتحكّم الشرطي، و for/while/do-while للتكرار. السلاسل النصية ثابتة (Immutable) ويُفضَّل تعديلها بـ StringBuilder.',
      content: [
        {
          heading: 'Variables and Data Types',
          headingAr: 'المتغيرات وأنواع البيانات',
          body: `المتغير عنصر بيانات له اسم متميّز ونوع محدّد، يُعرَّف بالشكل: Type name;

الأنواع البدائية (Primitive) في جافا:
• الأعداد الصحيحة: byte (1B)، short (2B)، int (4B)، long (8B).
• الأعداد العشرية: float (4B)، double (8B).
• الرمز: char (2B — Unicode).
• المنطقي: boolean (true/false).

الأنواع المرجعية (Reference): String، المصفوفات، وأي صنف.

\`\`\`java
int x = 10;
double price = 19.99;
char letter = 'A';
boolean active = true;
String name = "Ali";
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Operators',
          headingAr: 'المشغلات (Operators)',
          body: `• حسابية (Arithmetic): + - * / %
• علاقية (Relational): == != > < >= <=
• منطقية (Logical): && || !
• تعيينية (Assignment): = += -= *= /=
• زيادة/نقصان (Unary): ++ --

مثال على الأولوية:
a = x + y / z;     // القسمة أولاً ثم الجمع
a = (x + y) / z;   // الأقواس تغيّر الترتيب`,
          type: 'text',
        },
        {
          heading: 'Conditional Statements',
          headingAr: 'الجمل الشرطية',
          body: `\`\`\`java
// if / else if / else
if (score >= 90)       grade = "A";
else if (score >= 80)  grade = "B";
else                   grade = "F";

// switch (مفيد عند المقارنة بقيم محدّدة)
switch (day) {
    case 1: System.out.println("Sunday"); break;
    case 2: System.out.println("Monday"); break;
    default: System.out.println("Other");
}
\`\`\`

⚠ لا تنسَ break داخل كل case، وإلا سيستمر التنفيذ في الحالات التالية (Fall-through).`,
          type: 'text',
        },
        {
          heading: 'Loops',
          headingAr: 'حلقات التكرار',
          body: `\`\`\`java
// for: عندما تعرف عدد التكرارات
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// while: عندما يعتمد التكرار على شرط
int n = 0;
while (n < 5) { n++; }

// do-while: ينفّذ مرة على الأقل قبل فحص الشرط
do { n--; } while (n > 0);

// for-each: للمرور على المصفوفات والمجموعات
int[] nums = {1, 2, 3};
for (int v : nums) System.out.println(v);
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Strings',
          headingAr: 'السلاسل النصية (Strings)',
          body: `String في جافا كائن من الصنف java.lang.String وهي ثابتة (Immutable) — أي عملية تعديل تُنشئ كائناً جديداً.

\`\`\`java
String s = "Hello";
int len = s.length();              // 5
String upper = s.toUpperCase();    // HELLO
boolean eq = s.equals("Hello");    // true (لا تستخدم == للمقارنة!)

// للتعديل المتكرّر استخدم StringBuilder (أسرع):
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");
String result = sb.toString();
\`\`\``,
          type: 'tip',
        },
      ],
      concepts: [
        {
          name: 'Primitive vs Reference',
          nameAr: 'أنواع بدائية مقابل مرجعية',
          simple: 'البدائية تخزّن القيمة، المرجعية تخزّن عنوان الكائن.',
          detailed: 'int x = 5 يحجز 4 بايت تحوي 5. أما String s = "Hi" فـ s يحوي مرجعاً (عنواناً) لكائن في الذاكرة.',
          example: 'int a = 5; String b = "Hi";',
        },
        {
          name: 'Immutable String',
          nameAr: 'String ثابتة',
          simple: 'لا يمكن تعديل محتوى String بعد إنشائها.',
          detailed: 'كل عملية مثل s.toUpperCase() تُنشئ سلسلة جديدة. لذلك للتعديلات المتكرّرة استخدم StringBuilder.',
          example: 'String x = "a"; x = x + "b"; // كائن جديد',
        },
      ],
      quiz: [
        {
          question: 'Which loop guarantees at least one execution?',
          options: ['for', 'while', 'do-while', 'foreach'],
          correct: 2,
          explanation: 'do-while يفحص الشرط بعد التنفيذ.',
        },
        {
          question: 'How do you compare two strings for equality in Java?',
          options: ['==', '.equals()', '.compare()', 'is'],
          correct: 1,
          explanation: 'استخدم equals(); == يقارن المراجع وليس المحتوى.',
        },
        {
          question: 'What is the size of int in Java?',
          options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on OS'],
          correct: 1,
          explanation: 'int = 4 bytes دائماً في جافا.',
        },
      ],
    },

    // ============================================================
    // UNIT 4 — Classes, Objects & Methods
    // ============================================================
    {
      id: 4,
      courseId: 'programming2-1295',
      title: 'Classes, Objects & Methods',
      titleAr: 'الأصناف والكائنات والمناهج',
      description: 'Defining classes, constructors, access modifiers, static, this and method overloading.',
      descriptionAr: 'تعريف الأصناف، البنائات، محددات الوصول، static، this، وإعادة التحميل.',
      icon: '🏗️',
      topics: ['Class Definition', 'Constructor', 'Access Modifiers', 'static', 'this', 'Overloading'],
      objectiveAr:
        'القدرة على تصميم وكتابة الأصناف باحترافية: تعريف الحقول والمناهج، البناء (Constructor)، استخدام محددات الوصول والكلمات المفتاحية static و this.',
      summaryAr:
        'الصنف يُعرَّف بـ class Name {...}. البنّاء (Constructor) له اسم الصنف ولا يُعيد قيمة. محدّدات الوصول (public/private/protected/default) تتحكّم بالرؤية. static يجعل العضو ينتمي للصنف لا للكائن. this يشير للكائن الحالي.',
      content: [
        {
          heading: 'Defining a Class',
          headingAr: 'تعريف الصنف',
          body: `الصيغة العامة:
\`\`\`
[modifier] class ClassName [extends SuperClass] [implements Interface] {
    // fields (متغيرات)
    // constructors (بنّائات)
    // methods (مناهج)
}
\`\`\`

مثال:
\`\`\`java
public class Student {
    private String name;     // field
    private int id;

    public Student(String n, int i) {  // constructor
        this.name = n;
        this.id = i;
    }

    public String getName() {  // method
        return name;
    }
}
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Constructors',
          headingAr: 'البنّاء (Constructor)',
          body: `البنّاء دالة خاصة تُستدعى تلقائياً عند إنشاء الكائن باستخدام new، مهمتها تهيئة حقول الكائن.

قواعد:
• اسم البنّاء يجب أن يطابق اسم الصنف تماماً.
• لا يُعيد أي قيمة (ولا حتى void).
• يمكن إعادة تحميله (Overloading) بعدة بنّائات.
• إذا لم تُعرّف أي بنّاء، يُضيف المترجم بنّاءً افتراضياً فارغاً.

\`\`\`java
public class Book {
    String title;
    double price;

    public Book() { this.price = 0; }                  // افتراضي
    public Book(String t) { this.title = t; }          // معامل واحد
    public Book(String t, double p) {                   // اثنين
        this.title = t;
        this.price = p;
    }
}
Book b = new Book("Java", 29.99);
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Access Modifiers',
          headingAr: 'محدّدات الوصول',
          body: `• public: متاح من أي مكان.
• private: متاح داخل الصنف نفسه فقط (أعلى درجة حماية).
• protected: متاح داخل الحزمة وللأصناف الفرعية.
• default (بدون كلمة): متاح داخل الحزمة فقط (Package-private).

قاعدة ذهبية: اجعل الحقول private، والمناهج التي تريد كشفها public.`,
          type: 'text',
        },
        {
          heading: 'static vs instance',
          headingAr: 'الفرق بين static و instance',
          body: `• عضو instance: ينتمي للكائن — لكل كائن نسخته.
• عضو static: ينتمي للصنف — نسخة واحدة مشتركة بين كل الكائنات، وتُستدعى عبر اسم الصنف.

\`\`\`java
public class Counter {
    static int total = 0;  // مشترك
    int id;                // خاص بكل كائن

    Counter() { id = ++total; }
}
Counter a = new Counter(); // a.id = 1, total = 1
Counter b = new Counter(); // b.id = 2, total = 2
System.out.println(Counter.total); // 2
\`\`\`

⚠ المنهج static لا يستطيع الوصول مباشرة إلى المتغيرات غير static (لأنه لا يوجد كائن).`,
          type: 'warning',
        },
        {
          heading: 'this Keyword',
          headingAr: 'الكلمة المفتاحية this',
          body: `this مرجع للكائن الحالي. تُستخدم:
1- لتمييز حقول الصنف عن المعاملات حين يتطابق الاسم.
2- لاستدعاء بنّاء آخر داخل نفس الصنف: this(args).
3- لتمرير الكائن الحالي كمعامل لمنهج آخر.

\`\`\`java
public Student(String name) {
    this.name = name; // this.name = حقل الصنف، name = المعامل
}
\`\`\``,
          type: 'tip',
        },
      ],
      concepts: [
        {
          name: 'Constructor',
          nameAr: 'البنّاء',
          simple: 'دالة تُهيّئ الكائن عند إنشائه.',
          detailed: 'تُستدعى تلقائياً مع new، اسمها يطابق اسم الصنف، ولا تُعيد قيمة.',
          example: 'new Student("Ali", 1); // يستدعي Student(String, int)',
        },
        {
          name: 'static',
          nameAr: 'العضو الساكن',
          simple: 'عضو مشترك بين كل كائنات الصنف.',
          detailed: 'يُحجَز مرة واحدة في الذاكرة وتُمكن الوصول إليه عبر اسم الصنف بدون إنشاء كائن.',
          example: 'Math.PI، Integer.parseInt("5")',
        },
      ],
      quiz: [
        {
          question: 'A constructor must:',
          options: ['Return void', 'Return the class type', 'Have no return type', 'Be static'],
          correct: 2,
          explanation: 'البنّاء لا يحدّد نوع إرجاع إطلاقاً.',
        },
        {
          question: 'Which modifier hides a field from other classes?',
          options: ['public', 'private', 'protected', 'static'],
          correct: 1,
          explanation: 'private يقصر الوصول على الصنف نفسه.',
        },
        {
          question: 'A static method cannot directly access:',
          options: ['Static fields', 'Instance fields', 'Other static methods', 'Constants'],
          correct: 1,
          explanation: 'لا يوجد كائن "this" داخل المنهج static.',
        },
      ],
    },

    // ============================================================
    // UNIT 5 — Inheritance & Polymorphism
    // ============================================================
    {
      id: 5,
      courseId: 'programming2-1295',
      title: 'Inheritance & Polymorphism',
      titleAr: 'التوارث وتعدد الأوجه',
      description: 'extends, super, method overriding, abstract classes, and dynamic dispatch.',
      descriptionAr: 'التوارث بين الأصناف، super، الهيمنة، الأصناف المجرّدة، وتعدد الأوجه الديناميكي.',
      icon: '🌳',
      topics: ['extends', 'super', 'Overriding', 'abstract', 'final', 'Object class'],
      objectiveAr:
        'تطبيق التوارث لإعادة استخدام الكود وتنظيم الأصناف هرمياً، وفهم كيف يعمل تعدد الأوجه (Polymorphism) في وقت التشغيل.',
      summaryAr:
        'extends تُنشئ علاقة "is-a" بين صنفين. super تستدعي بنّاء أو منهج الصنف الأب. Overriding يعيد تعريف منهج موروث ليُختار الإصدار الصحيح وقت التشغيل بناءً على نوع الكائن الفعلي. abstract يمنع إنشاء كائنات ويُجبر الأبناء على تنفيذ المناهج. final يمنع التوارث/التعديل.',
      content: [
        {
          heading: 'extends and super',
          headingAr: 'التوارث وكلمة super',
          body: `\`\`\`java
public class Animal {
    String name;
    Animal(String n) { this.name = n; }
    void eat() { System.out.println(name + " is eating"); }
}

public class Dog extends Animal {
    Dog(String n) {
        super(n); // استدعاء بنّاء الصنف الأب
    }
    void bark() { System.out.println(name + " says Woof!"); }
}

Dog d = new Dog("Rex");
d.eat();   // موروثة من Animal
d.bark();  // خاصة بـ Dog
\`\`\`

ملاحظات:
• super(args) يجب أن تكون أول جملة في بنّاء الصنف الفرعي.
• super.method() تستدعي نسخة الصنف الأب من المنهج.`,
          type: 'text',
        },
        {
          heading: 'Method Overriding',
          headingAr: 'الهيمنة على المناهج (Overriding)',
          body: `الهيمنة = إعادة تعريف منهج موروث بنفس التوقيع في الصنف الفرعي. الجافا تختار الإصدار المناسب وقت التشغيل (Dynamic Dispatch) بناءً على النوع الفعلي للكائن — وهذا جوهر تعدد الأوجه.

\`\`\`java
class Shape {
    void draw() { System.out.println("Drawing a shape"); }
}
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a circle"); }
}

Shape s = new Circle();
s.draw(); // "Drawing a circle"  ← يُختار وقت التشغيل
\`\`\`

استخدم @Override دائماً — يساعد المترجم على كشف الأخطاء.`,
          type: 'text',
        },
        {
          heading: 'abstract Classes',
          headingAr: 'الأصناف المجرّدة (abstract)',
          body: `الصنف المجرّد لا يمكن إنشاء كائن منه مباشرة، يصلح كقالب يجب أن يُكمّله أبناؤه.

\`\`\`java
abstract class Animal {
    abstract void speak();          // بدون تنفيذ
    void breathe() { System.out.println("breathing"); } // عادي
}

class Cat extends Animal {
    @Override
    void speak() { System.out.println("Meow"); }
}

// Animal a = new Animal(); ❌ خطأ ترجمة
Animal a = new Cat();    // ✓ مسموح عبر صنف فرعي
a.speak();               // Meow
\`\`\`

أي صنف يحوي منهجاً واحداً abstract يجب أن يكون abstract نفسه.`,
          type: 'text',
        },
        {
          heading: 'final Keyword',
          headingAr: 'الكلمة المفتاحية final',
          body: `• final على متغير: ثابت لا يمكن تغيير قيمته.
• final على منهج: لا يمكن للأصناف الفرعية الهيمنة عليه.
• final على صنف: لا يمكن وراثته (مثل String).

\`\`\`java
final double PI = 3.14159;
final class Utility { /* لا يُورَث */ }
\`\`\``,
          type: 'tip',
        },
        {
          heading: 'The Object Class',
          headingAr: 'الصنف الجذري Object',
          body: `كل صنف في جافا يَرث ضمنياً من java.lang.Object، الذي يوفّر مناهج عامة:
• toString(): تمثيل نصي للكائن — يُفضّل الهيمنة عليه.
• equals(Object o): مقارنة منطقية — هيمن عليه إذا كنت ستقارن كائناتك بـ equals.
• hashCode(): مطلوب الهيمنة عليه مع equals.
• getClass(): يُعيد معلومات الصنف.

\`\`\`java
class Point {
    int x, y;
    @Override
    public String toString() { return "(" + x + "," + y + ")"; }
}
\`\`\``,
          type: 'text',
        },
      ],
      concepts: [
        {
          name: 'Dynamic Dispatch',
          nameAr: 'الإرسال الديناميكي',
          simple: 'JVM يختار نسخة المنهج وقت التشغيل بناءً على نوع الكائن الفعلي.',
          detailed: 'يحدث في الـ Overriding ويُمكّن تعدد الأوجه: يمكنك التعامل مع كائنات Dog و Cat كأنها Animal واستدعاء speak() على أيٍّ منها.',
          example: 'Animal a = new Dog(); a.speak(); // ينفّذ Dog.speak',
        },
        {
          name: 'abstract vs interface',
          nameAr: 'مجرّد مقابل واجهة',
          simple: 'abstract قد يحوي تنفيذاً وحقولاً، interface (تقليدياً) لا.',
          detailed: 'صنف يستطيع أن يَرث صنفاً مجرّداً واحداً فقط، لكنه يستطيع تنفيذ عدة واجهات.',
        },
      ],
      quiz: [
        {
          question: 'super(args) must be:',
          options: ['Anywhere in subclass', 'Last line of constructor', 'First line of constructor', 'Outside any method'],
          correct: 2,
          explanation: 'استدعاء البنّاء الأب يجب أن يكون أول سطر.',
        },
        {
          question: 'Which prevents a class from being inherited?',
          options: ['static', 'abstract', 'final', 'private'],
          correct: 2,
          explanation: 'final على الصنف يمنع الوراثة.',
        },
        {
          question: 'You cannot instantiate which type of class?',
          options: ['public', 'final', 'abstract', 'static nested'],
          correct: 2,
          explanation: 'الأصناف المجرّدة لا تُنشأ كائنات منها مباشرة.',
        },
      ],
    },

    // ============================================================
    // UNIT 6 — Exception Handling (from PDF)
    // ============================================================
    {
      id: 6,
      courseId: 'programming2-1295',
      title: 'Exception Handling',
      titleAr: 'معالجة الاستثناءات',
      description: 'try, catch, finally, throw, throws and the exception hierarchy.',
      descriptionAr: 'الجمل try و catch و finally، قذف الاستثناءات throw/throws، والشجرة الهرمية للاستثناءات.',
      icon: '⚠️',
      topics: ['Exception', 'Error', 'try-catch', 'finally', 'throw', 'throws', 'Checked vs Unchecked'],
      objectiveAr:
        'فهم آلية معالجة الاستثناءات في جافا، التمييز بين الأخطاء (Errors) والاستثناءات (Exceptions)، والقدرة على كتابة كود قوي يلتقط الأخطاء ويتعامل معها بطريقة مناسبة.',
      summaryAr:
        'الاستثناء حدث غير عادي يقطع تدفّق البرنامج. تنقسم لـ Checked (يجب التعامل معها) و Unchecked (Runtime). تُلتقط بـ try/catch، وتُضمن finally التنفيذ دائماً. throw يُطلق استثناءً، throws يُعلِن أن المنهج قد يقذفه.',
      content: [
        {
          heading: 'What is an Exception?',
          headingAr: 'ما هو الاستثناء؟',
          body: `الاستثناء (Exception) هو حدوث أمر غير عادي وغير مألوف يقطع تدفّق البرنامج. تحدث الاستثناءات نتيجة أمور مؤقتة عند التنفيذ مثل: نقصان الذاكرة، خطأ في اسم ملف، أو القسمة على صفر.

معالجة الاستثناءات (Exception Handling) هي اكتشاف هذه الحالات والتعامل معها بطريقة منضبطة بدلاً من السماح للبرنامج بالتوقّف.

📌 ملاحظة: لغة جافا تفرّق بين الأخطاء (Errors) والاستثناءات (Exceptions). الأخطاء أشد خطورة ولا يمكن التعامل معها برمجياً.`,
          type: 'text',
        },
        {
          heading: 'Exception Hierarchy',
          headingAr: 'الشجرة الهرمية للاستثناءات',
          body: `جذر الشجرة هو java.lang.Throwable، ومنه ينقسم إلى:

Throwable
├─ Error              → خارج عن السيطرة (OutOfMemory, StackOverflow)
└─ Exception
    ├─ Checked Exceptions  → يجب التعامل معها (IOException, FileNotFoundException)
    └─ RuntimeException    → Unchecked (NullPointer, ArithmeticException, ArrayIndexOutOfBounds)

الفرق بين Checked و Unchecked:
• Checked: يفرض المترجم التعامل معها (try/catch أو throws).
• Unchecked: لا يجبر المترجم، تحدث في وقت التشغيل.`,
          type: 'diagram',
        },
        {
          heading: 'try, catch, finally',
          headingAr: 'الجمل try و catch و finally',
          body: `\`\`\`java
public class ExcepTest {
    public static void main(String[] args) {
        int[] a = new int[2];
        try {
            System.out.println("Access: " + a[3]);     // ❌ تجاوز الحدود
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Exception: " + e);
        } finally {
            System.out.println("finally always executes");
        }
    }
}
\`\`\`

المخرَجات:
\`\`\`
Exception: java.lang.ArrayIndexOutOfBoundsException: 3
finally always executes
\`\`\`

قواعد مهمة:
• try لا تأتي وحدها — يجب أن تتبعها catch أو finally أو كلاهما.
• يمكن تعدّد كتل catch، رتّبها من الأخص إلى الأعم. وضع Exception أولاً سيمنع وصول التنفيذ لما بعدها (خطأ ترجمة).
• finally تُنفَّذ دائماً (حتى مع return) — مثالية لإغلاق الموارد.`,
          type: 'text',
        },
        {
          heading: 'throw vs throws',
          headingAr: 'الفرق بين throw و throws',
          body: `• throw: داخل جسم المنهج، يُطلق استثناءً فعلياً.
• throws: في توقيع المنهج، يُعلِن أن المنهج قد يقذف نوعاً (أو أنواعاً) من الاستثناءات.

\`\`\`java
void myMethod() throws ArithmeticException, NullPointerException {
    throw new ArithmeticException("ERROR: divided by zero!");
}
\`\`\`

عند تنفيذ throw يتوقّف المنهج فوراً ويبحث JVM عن أقرب catch قادر على التقاطه.`,
          type: 'text',
        },
        {
          heading: 'Practical Example',
          headingAr: 'مثال عملي كامل',
          body: `\`\`\`java
public class Example1 {
    void checkAge(int age) {
        if (age < 18)
            throw new ArithmeticException("Not Eligible for voting");
        else
            System.out.println("Welcome to vote");
    }

    public static void main(String[] args) {
        Example1 obj = new Example1();
        try {
            obj.checkAge(13);
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
        } finally {
            System.out.println("Finally always Executed!");
        }
        System.out.println("End Of Program");
    }
}
\`\`\`

المخرَجات:
\`\`\`
Caught: Not Eligible for voting
Finally always Executed!
End Of Program
\`\`\`

⚡ بدون try/catch لكان البرنامج توقّف فوراً عند checkAge(13) ولم تُطبع "End Of Program".`,
          type: 'text',
        },
      ],
      concepts: [
        {
          name: 'Checked Exception',
          nameAr: 'استثناء مفحوص',
          simple: 'يفرض المترجم التعامل معه قبل الترجمة.',
          detailed: 'مثل IOException، إذا لم تلتقطه أو تُعلن عنه بـ throws، لن يترجم الكود.',
          example: 'FileReader f = new FileReader("a.txt"); // يحتاج throws IOException',
        },
        {
          name: 'finally',
          nameAr: 'كتلة finally',
          simple: 'كود يُنفَّذ دائماً، حتى لو حدث استثناء أو return.',
          detailed: 'تُستخدم لتحرير الموارد (إغلاق ملفات، اتصالات قواعد بيانات).',
          example: 'finally { file.close(); }',
        },
      ],
      quiz: [
        {
          question: 'Which block is guaranteed to execute?',
          options: ['try', 'catch', 'finally', 'throws'],
          correct: 2,
          explanation: 'finally تُنفَّذ في كل الحالات.',
        },
        {
          question: 'Which is an Unchecked (Runtime) exception?',
          options: ['IOException', 'FileNotFoundException', 'NullPointerException', 'SQLException'],
          correct: 2,
          explanation: 'NullPointerException ترث من RuntimeException.',
        },
        {
          question: 'throws keyword is used:',
          options: ['Inside method body to raise exception', 'In method signature to declare exceptions', 'To catch exceptions', 'To exit a loop'],
          correct: 1,
          explanation: 'throws تُعلَن في توقيع المنهج. throw داخل الجسم.',
        },
        {
          question: 'Catching Exception before IOException causes:',
          options: ['Runtime error', 'Compile error', 'Works fine', 'Warning only'],
          correct: 1,
          explanation: 'الترتيب من الأخص إلى الأعم؛ وضع الأعم أولاً يجعل catch اللاحق غير قابل للوصول.',
        },
      ],
    },

    // ============================================================
    // UNIT 7 — Multithreading (from PDF)
    // ============================================================
    {
      id: 7,
      courseId: 'programming2-1295',
      title: 'Multithreading',
      titleAr: 'القنوات المتعددة (Multithreading)',
      description: 'Threads, Runnable, lifecycle, synchronization, sleep/yield/join, wait/notify.',
      descriptionAr: 'القنوات وواجهة Runnable، دورة حياة القناة، التزامن، ودوال التحكّم في القنوات.',
      icon: '🧵',
      topics: ['Thread', 'Runnable', 'Lifecycle', 'synchronized', 'sleep', 'join', 'wait/notify'],
      objectiveAr:
        'فهم مفهوم البرمجة متعدّدة القنوات في جافا، طريقتي إنشاء القناة، دورة حياتها، وكيفية تنسيق التنفيذ بين عدة قنوات بأمان.',
      summaryAr:
        'القناة (Thread) مسار تنفيذي مستقل داخل البرنامج. يمكن إنشاؤها بـ extends Thread أو implements Runnable. تمر بحالات (Newborn → Runnable → Running → Blocked → Dead). synchronized يمنع تعارض الوصول للموارد المشتركة. sleep يُوقفها مؤقتاً، join ينتظر انتهاءها، wait/notify ينسّقان بينها.',
      content: [
        {
          heading: 'Why Threads?',
          headingAr: 'لماذا نستخدم القنوات؟',
          body: `قبل القنوات، تعرّف على المفاهيم:
• Multiprocessing: عدة معالجات تعمل معاً.
• Multitasking: عدة مهام تعمل بالتناوب على معالج واحد (يديرها نظام التشغيل).
• Multithreading: عدة أجزاء من البرنامج نفسه تعمل بشكل متزامن.

القناة (Thread) مسار تنفيذي مستقل داخل العملية. كل برنامج جافا يبدأ بقناة واحدة على الأقل (main thread) ويمكنه إنشاء قنوات إضافية لأداء عدة مهام في وقت واحد، مثل الطباعة في الخلفية مع استمرار التفاعل مع المستخدم.

القدرة على تنفيذ عدة قنوات تُسمّى Concurrency.`,
          type: 'text',
        },
        {
          heading: 'Method 1: Implementing Runnable',
          headingAr: 'الطريقة الأولى: تطبيق Runnable',
          body: `الطريقة المفضّلة (لأنها تترك لك صلاحية الوراثة من صنف آخر):

\`\`\`java
public class MyTask implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Task: " + i);
        }
    }

    public static void main(String[] args) {
        MyTask task = new MyTask();
        Thread t = new Thread(task);
        t.start();   // يستدعي run() في قناة جديدة
    }
}
\`\`\`

⚠ لا تستدعِ run() مباشرة — استخدم start() لتُنشأ قناة فعلية.`,
          type: 'text',
        },
        {
          heading: 'Method 2: Extending Thread',
          headingAr: 'الطريقة الثانية: وراثة Thread',
          body: `\`\`\`java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(getName() + " → " + i);
        }
    }

    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();
        // الناتج يختلف في كل تشغيل لأن الجدولة عشوائية
    }
}
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Thread Lifecycle',
          headingAr: 'دورة حياة القناة',
          body: `New (Newborn)  →  start()  →  Runnable  →  (Scheduler)  →  Running
                                       ↑              ↓
                                       └── yield() ──┘
                                                      ↓ sleep / wait / blocked I/O
                                                    Blocked  →  notify / timeout  →  Runnable
                                                      ↓ run() ينتهي
                                                    Dead

• Newborn: بعد new، لم تُشغَّل بعد.
• Runnable: جاهزة وتنتظر دورها من المجدول.
• Running: المجدول اختارها وتُنفَّذ حالياً.
• Blocked: متوقفة (نائمة، تنتظر، أو تنتظر I/O).
• Dead: انتهى تنفيذ run().`,
          type: 'diagram',
        },
        {
          heading: 'Key Methods',
          headingAr: 'دوال التحكّم المهمة',
          body: `• sleep(ms): تُنوّم القناة الحالية لفترة ثم تعود Runnable. ترمي InterruptedException.
• yield(): تتنازل طوعاً للمجدول لإعطاء قنوات أخرى فرصة. لا ضمان بأن قناة أخرى ستعمل.
• join(): تجعل القناة الحالية تنتظر حتى تنتهي قناة أخرى.
• isAlive(): فحص هل القناة لا تزال تعمل.

\`\`\`java
Thread t = new Thread(task);
t.start();
t.join();     // الـ main ينتظر حتى ينتهي t
System.out.println("t finished, continuing main");
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Synchronization',
          headingAr: 'التزامن (Synchronization)',
          body: `عند مشاركة عدة قنوات لمورد واحد (متغير، ملف...) قد يحدث تعارض (Race Condition). الحل: استخدام synchronized لضمان أن قناة واحدة فقط تدخل الكود الحرج في كل لحظة.

\`\`\`java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;       // الآن آمن من تعارض القنوات
    }

    public int get() { return count; }
}
\`\`\`

أو على بلوك محدّد:
\`\`\`java
synchronized (sharedObject) {
    // كود حرج
}
\`\`\``,
          type: 'warning',
        },
        {
          heading: 'wait, notify, notifyAll',
          headingAr: 'wait و notify و notifyAll',
          body: `تُستخدم للتنسيق بين القنوات على كائن مشترك:
• wait(): تجعل القناة تنتظر داخل بلوك synchronized حتى تنبّهها قناة أخرى.
• notify(): توقظ قناة واحدة منتظرة.
• notifyAll(): توقظ جميع القنوات المنتظرة.

🆚 الفرق بين wait و sleep:
• sleep: تُنوّم القناة فترة محدّدة، ولا تحرّر القفل (lock).
• wait: تنتظر بلا حد إلى أن توقظها notify، وتُحرّر القفل أثناء الانتظار.`,
          type: 'tip',
        },
      ],
      concepts: [
        {
          name: 'Race Condition',
          nameAr: 'حالة تعارض',
          simple: 'عدة قنوات تعدّل نفس البيانات في وقت واحد فتفسدها.',
          detailed: 'يحدث عندما يعتمد الناتج على ترتيب تنفيذ القنوات. الحل: synchronized أو أدوات java.util.concurrent.',
          example: 'قناتان تزيدان counter بنفس اللحظة، تفقد إحدى الزيادات.',
        },
        {
          name: 'Daemon Thread',
          nameAr: 'قناة خادمة',
          simple: 'قناة تعمل في الخلفية وتُنهى تلقائياً عند انتهاء قنوات المستخدم.',
          detailed: 'تُستخدم لمهام مساعدة مثل garbage collection. تُحدَّد بـ t.setDaemon(true) قبل start().',
        },
      ],
      quiz: [
        {
          question: 'Which method actually starts a new thread of execution?',
          options: ['run()', 'start()', 'init()', 'execute()'],
          correct: 1,
          explanation: 'start() يُنشئ القناة ويستدعي run() داخلها.',
        },
        {
          question: 'sleep() vs wait():',
          options: ['Both release locks', 'sleep releases lock, wait does not', 'wait releases lock, sleep does not', 'Both keep locks'],
          correct: 2,
          explanation: 'wait يحرّر القفل لتسمح لقنوات أخرى بالعمل، sleep لا يحرّره.',
        },
        {
          question: 'Which keyword prevents race conditions?',
          options: ['volatile', 'transient', 'synchronized', 'final'],
          correct: 2,
          explanation: 'synchronized يضمن وصولاً متبادل الإقصاء.',
        },
      ],
    },

    // ============================================================
    // UNIT 8 — Java I/O (from PDF)
    // ============================================================
    {
      id: 8,
      courseId: 'programming2-1295',
      title: 'Java Input / Output',
      titleAr: 'الإدخال والإخراج Java I/O',
      description: 'Streams, Reader/Writer, InputStream/OutputStream, files and standard I/O.',
      descriptionAr: 'الدفوق Streams، أصناف Reader/Writer، الإدخال والإخراج الثنائي والرمزي، والتعامل مع الملفات.',
      icon: '📂',
      topics: ['Stream', 'Byte Stream', 'Character Stream', 'BufferedReader', 'FileReader', 'System.in/out'],
      objectiveAr:
        'إتقان حزمة java.io: التمييز بين الدفوق الثنائية والرمزية، استخدام BufferedReader للقراءة من المستخدم، والتعامل مع ملفات النصوص.',
      summaryAr:
        'الدفق (Stream) قناة لنقل البيانات بين البرنامج ومصدرها/وجهتها. جافا توفر نوعين: Byte Streams (ترث من InputStream/OutputStream) للبيانات الثنائية، و Character Streams (ترث من Reader/Writer) للنصوص. BufferedReader مع InputStreamReader هو النمط القياسي لقراءة المدخلات.',
      content: [
        {
          heading: 'What is a Stream?',
          headingAr: 'ما هو الدفق؟',
          body: `الدفق (Stream) تصوّر منطقي يمثّل آلية الاتصال بين مصدر/مستقبل البيانات وبرنامج جافا. أي عملية إدخال أو إخراج في جافا تتم عبر دفق.

أنواع الدفوق حسب الاتجاه:
• دفق إدخال (Input Stream): من المصدر إلى البرنامج (قراءة).
• دفق إخراج (Output Stream): من البرنامج إلى المستقبل (كتابة).

أنواع الدفوق حسب البيانات:
• دفق ثنائي (Byte Stream): سلسلة بايتات. يصلح لأي بيانات (صور، فيديو، ملفات ثنائية). ينحدر من InputStream / OutputStream.
• دفق رمزي (Character Stream): سلسلة رموز Unicode. يصلح للنصوص. ينحدر من Reader / Writer.

📍 كل أصناف الإدخال والإخراج موجودة في حزمة java.io.`,
          type: 'text',
        },
        {
          heading: 'Standard I/O Objects',
          headingAr: 'كائنات الإدخال/الإخراج القياسية',
          body: `جافا توفّر ثلاثة كائنات قياسية في الصنف System:

| الكائن        | النوع        | الاستخدام                          |
| ------------- | ----------- | ---------------------------------- |
| System.in     | InputStream | إدخال قياسي (لوحة المفاتيح عادة)   |
| System.out    | PrintStream | إخراج قياسي (الشاشة)               |
| System.err    | PrintStream | إخراج الأخطاء (الشاشة عادة)        |

\`\`\`java
System.out.println("Hello");
System.err.println("This is an error");
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Reading from the Keyboard with BufferedReader',
          headingAr: 'القراءة من لوحة المفاتيح',
          body: `النمط القياسي لقراءة سطر من المستخدم:

\`\`\`java
import java.io.*;
public class ReadLineExample {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(
            new InputStreamReader(System.in)
        );
        System.out.print("Enter your name: ");
        String name = br.readLine();
        System.out.println("Hello, " + name);
    }
}
\`\`\`

تفسير السلسلة:
• System.in: دفق ثنائي خام (بايتات).
• InputStreamReader: يحوّله إلى دفق رمزي.
• BufferedReader: يضيف تخزيناً مؤقتاً ويوفّر readLine().

💡 بديل أبسط منذ Java 5: استخدام Scanner.
\`\`\`java
import java.util.Scanner;
Scanner sc = new Scanner(System.in);
String name = sc.nextLine();
int age = sc.nextInt();
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Reading Multiple Lines into an Array',
          headingAr: 'قراءة عدة أسطر إلى مصفوفة',
          body: `\`\`\`java
import java.io.*;
public class ReadFiveLines {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(
            new InputStreamReader(System.in)
        );
        String[] lines = new String[5];
        for (int i = 0; i < 5; i++) {
            System.out.print("Line " + (i + 1) + ": ");
            lines[i] = br.readLine();
        }
        for (String s : lines) {
            System.out.println(s);
        }
    }
}
\`\`\``,
          type: 'text',
        },
        {
          heading: 'Reading and Writing Files',
          headingAr: 'القراءة من والكتابة إلى الملفات',
          body: `قراءة ملف نصي:
\`\`\`java
import java.io.*;
public class ReadFile {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader("input.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
        br.close();   // مهم!
    }
}
\`\`\`

كتابة ملف نصي:
\`\`\`java
PrintWriter pw = new PrintWriter(new FileWriter("output.txt"));
pw.println("Hello, file!");
pw.close();
\`\`\`

💡 منذ Java 7 يُفضّل استخدام try-with-resources لإغلاق الموارد تلقائياً:
\`\`\`java
try (BufferedReader br = new BufferedReader(new FileReader("a.txt"))) {
    System.out.println(br.readLine());
}   // يُغلق br تلقائياً حتى لو حدث استثناء
\`\`\``,
          type: 'tip',
        },
        {
          heading: 'Key InputStream Methods',
          headingAr: 'أهم مناهج الصنف InputStream',
          body: `الصنف InputStream تجريدي ويوفّر مناهج مهمة:

• int read() — يقرأ بايتاً واحداً ويُعيده كعدد صحيح (-1 عند نهاية الدفق).
• int read(byte[] b) — يقرأ بايتات إلى مصفوفة.
• int read(byte[] b, int off, int len) — يقرأ len بايتاً إلى مصفوفة بدءاً من off.
• long skip(long n) — تجاوز n بايتاً.
• int available() — عدد البايتات الجاهزة للقراءة دون تجميع.
• void close() — إغلاق الدفق وتحرير الموارد.
• void mark(int limit) / void reset() — للعلامة والعودة إليها.`,
          type: 'text',
        },
      ],
      concepts: [
        {
          name: 'Byte vs Character Stream',
          nameAr: 'ثنائي مقابل رمزي',
          simple: 'Byte للبايتات الخام، Character للنصوص (Unicode).',
          detailed: 'استخدم InputStream/OutputStream للصور والملفات الثنائية، و Reader/Writer للنصوص لمعالجة الترميز بشكل صحيح.',
        },
        {
          name: 'Buffered Stream',
          nameAr: 'الدفق المخزَّن مؤقتاً',
          simple: 'يقرأ/يكتب على دفعات لتحسين الأداء.',
          detailed: 'BufferedReader و BufferedWriter يقللان عمليات الـ I/O الفعلية بتجميع البايتات في ذاكرة مؤقتة.',
          example: 'new BufferedReader(new FileReader("a.txt"))',
        },
        {
          name: 'try-with-resources',
          nameAr: 'إدارة الموارد التلقائية',
          simple: 'يغلق الموارد تلقائياً بعد انتهاء الكتلة.',
          detailed: 'أي صنف يطبّق AutoCloseable يمكن استخدامه. يبسّط الكود ويمنع تسرّب الموارد.',
        },
      ],
      quiz: [
        {
          question: 'Which class is best for reading lines of text?',
          options: ['FileInputStream', 'BufferedReader', 'DataInputStream', 'PrintStream'],
          correct: 1,
          explanation: 'BufferedReader يوفّر readLine().',
        },
        {
          question: 'System.in is of type:',
          options: ['Reader', 'InputStream', 'Scanner', 'BufferedReader'],
          correct: 1,
          explanation: 'System.in هو InputStream خام.',
        },
        {
          question: 'For binary files (images), use:',
          options: ['Reader/Writer', 'InputStream/OutputStream', 'PrintWriter', 'Scanner'],
          correct: 1,
          explanation: 'الدفوق الثنائية مناسبة للصور والملفات الثنائية.',
        },
        {
          question: 'try-with-resources requires the resource to implement:',
          options: ['Runnable', 'Serializable', 'AutoCloseable', 'Comparable'],
          correct: 2,
          explanation: 'AutoCloseable هي العقد المطلوب.',
        },
      ],
    },
  ],
};

// ============================================================
// Lab challenges for Programming 2
// ============================================================
export const programming2LabChallenges: LabChallenge[] = [
  {
    id: 301,
    courseId: 'programming2-1295',
    title: 'Compile and Run Hello World',
    titleAr: 'ترجمة وتشغيل Hello World',
    difficulty: 'beginner',
    description: 'Compile a Java source file and run it on the JVM.',
    instructions: [
      'Write HelloWorld.java with a public class HelloWorld and a main method',
      'Use javac to compile it into HelloWorld.class',
      'Use java to execute it',
    ],
    hints: ['javac compiles source → bytecode', 'java runs bytecode on the JVM', 'Class name must match file name'],
    expectedCommand: 'javac HelloWorld.java && java HelloWorld',
    explanation: 'javac يحوّل .java إلى .class، ثم java يُحمّل الـ Bytecode في JVM ويستدعي main.',
  },
  {
    id: 302,
    courseId: 'programming2-1295',
    title: 'Catch a Division by Zero',
    titleAr: 'التقاط القسمة على صفر',
    difficulty: 'intermediate',
    description: 'Write a try/catch that handles ArithmeticException when dividing by zero.',
    instructions: [
      'Read two integers from the user',
      'Try to divide them inside a try block',
      'Catch ArithmeticException and print a friendly message',
      'Use finally to print "Done"',
    ],
    hints: ['ArithmeticException is unchecked', 'finally runs even when exception is thrown', 'Use BufferedReader or Scanner for input'],
    expectedCommand: 'try { int r = a / b; } catch (ArithmeticException e) { ... } finally { ... }',
    explanation: 'القسمة على صفر تطلق ArithmeticException؛ التقاطها يمنع توقّف البرنامج.',
  },
  {
    id: 303,
    courseId: 'programming2-1295',
    title: 'Run Two Threads in Parallel',
    titleAr: 'تشغيل قناتين بالتوازي',
    difficulty: 'advanced',
    description: 'Create two threads that print numbers 1–5 concurrently.',
    instructions: [
      'Create class Worker implements Runnable',
      'In run(), loop 1..5 printing thread name and number',
      'In main, instantiate two Thread objects with the Runnable',
      'Call start() on both, then join() to wait for completion',
    ],
    hints: ['Use Thread.currentThread().getName()', 'start() creates a new thread; run() does not', 'join() makes main wait'],
    expectedCommand: 't1.start(); t2.start(); t1.join(); t2.join();',
    explanation: 'start() يُنشئ قناة تنفيذ جديدة؛ join() يجبر main على الانتظار حتى تنتهي القنوات.',
  },
];
