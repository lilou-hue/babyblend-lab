/* ====================================================================
 * BabyBlend Lab — fictional genetics-inspired simulator
 * Vanilla HTML/CSS/JS + DiceBear (illustrated avatars).
 * ==================================================================== */

import { createAvatar }    from 'https://esm.sh/@dicebear/core@9';
import * as loreleiStyle   from 'https://esm.sh/@dicebear/lorelei@9';
import * as bigSmileStyle  from 'https://esm.sh/@dicebear/big-smile@9';

const DICEBEAR_STYLES = {
  lorelei:  { module: loreleiStyle,  label: 'Lorelei',   supportsFreckles: true  },
  bigSmile: { module: bigSmileStyle, label: 'Big Smile', supportsFreckles: false }
};

/* ====================================================================
 * i18n
 *
 * Translates the UI chrome (header, mode labels, section headings,
 * action button labels, panel intros, landing copy). Content pools
 * (memories, traces, future paths, headlines, etc.) intentionally
 * stay in English in this pass — they're carefully-tuned poetic /
 * clinical strings that deserve a native-speaker translation pass.
 * ==================================================================== */

const LANGUAGES  = ['en', 'zh', 'ja', 'ko', 'tr'];
const LANG_NAMES = { en: 'English', zh: '中文', ja: '日本語', ko: '한국어', tr: 'Türkçe' };

const STRINGS = {
  en: {
    'intro.skip': 'Skip intro →',
    'intro.hero.title': 'Some futures are inherited.<br><em>Others are selected.</em>',
    'intro.hero.sub': 'A speculative simulation, grounded in real research.',
    'intro.scroll': 'Scroll to continue',
    'intro.history.eyebrow': '01 · Historical record',
    'intro.history.title': 'The first accepted edits.',
    'intro.history.lede': 'Modifying human inheritance is no longer hypothetical. The timeline is shorter than most people remember.',
    'intro.history.1978': 'First successful birth from in vitro fertilization (Louise Brown, UK).',
    'intro.history.1990': 'First clinical use of preimplantation genetic diagnosis to avoid X-linked disease.',
    'intro.history.2012': 'CRISPR-Cas9 demonstrated as a programmable genome editor.',
    'intro.history.2018': 'Twin girls born in China from CRISPR-edited embryos. Widely condemned by the scientific community.',
    'intro.history.2019': 'The lead scientist, He Jiankui, is sentenced to three years in prison in China.',
    'intro.history.2020': 'Emmanuelle Charpentier and Jennifer Doudna awarded the Nobel Prize in Chemistry for CRISPR.',
    'intro.history.2023': 'The United Kingdom approves the first CRISPR-based therapy (Casgevy / exa-cel) for sickle cell disease.',
    'intro.source': 'Source',
    'intro.culture.eyebrow': '02 · Cultural baseline',
    'intro.culture.title': 'Optimization is already routine.',
    'intro.culture.lede': 'Genetic editing is the new edge. Cosmetic editing has been mainstream for decades. The social logic carries forward.',
    'intro.culture.stat1': 'Cosmetic procedures performed globally each year.',
    'intro.culture.stat2': 'A term coined by dermatologists in 2018 to describe patients seeking surgery to resemble filtered self-portraits.',
    'intro.culture.stat3': 'Estimated population prevalence of body dysmorphic disorder in adults.',
    'intro.culture.stat4': 'Restrict heritable human genome editing through legislation, treaty, or policy.',
    'intro.culture.stat4_value': '75+ countries',
    'intro.questions.eyebrow': '03 · Unresolved',
    'intro.questions.q1': 'Who decides what counts as improvement?',
    'intro.questions.q2': 'Would unenhanced children face discrimination?',
    'intro.questions.q3': 'Should personality be editable?',
    'intro.questions.q4': 'What happens when beauty becomes measurable?',
    'intro.questions.q5': 'Can diversity survive optimization culture?',
    'intro.enter.eyebrow': '04 · The simulation',
    'intro.enter.title': 'Enter the lab.',
    'intro.enter.lede': 'What follows is a fictional consumer-product mock-up. The mechanics are speculative. The pressures are real.',
    'intro.notice.system_tag': '[ SYSTEM NOTICE ]',
    'intro.notice.system': 'Behavioral projections remain low-confidence.',
    'intro.notice.ethics_tag': '[ ETHICS NOTICE ]',
    'intro.notice.ethics': 'Optimization targets vary across cultures and eras.',
    'intro.notice.regulatory_tag': '[ REGULATORY NOTICE ]',
    'intro.notice.regulatory': 'Heritable genome editing remains restricted in many regions.',
    'intro.enter.btn': 'Enter BabyBlend Lab',
    'intro.enter.disclaimer': 'Educational speculative simulation. Not medical advice.',
    'badge.beta': 'Beta',
    'badge.adjacent': 'Adjacent',
    'badge.consent_heritable': 'Consent affected: heritable',
    'budget.compliance': 'Compliance reference: Oviedo Convention Art. 13 (heritable-germline restriction); medical-ethics principle of non-maleficence.',
    'budget.ethics.reversibility': 'Reversibility: <strong>No</strong>',
    'budget.ethics.subject_absent': 'Subject absent: <strong>Yes</strong>',
    'budget.proj.cohort': 'Projected Cohort Placement',
    'budget.proj.cohort.baseline': 'Untouched · baseline cohort',
    'budget.proj.cost': 'Estimated Cost',
    'budget.proj.cost.baseline': '— (baseline cohort)',
    'budget.proj.access': 'Projected Access Tier',
    'budget.proj.access.baseline': 'Universal · baseline',
    'budget.burden.disclaimer': 'All allocations remove the future subject\'s choice equally; the weight measures how widely the loss propagates, not whether it occurs.',
    'budget.proj.burden': 'Identity Lock-In Index',
    'budget.proj.burden.minimal': 'Minimal',
    'consent.heading': 'Consent Implications',
    'consent.subtle': 'The subject of every allocation above cannot consent to it. The notes below state, in institutional terms, what that means.',
    'surprise.note': 'How likely the baby strays from a simple average of the parents.',
    'kids.stars.creativity': 'Creativity',
    'kids.stars.teamwork': 'Teamwork',
    'scrubber.label': 'See them at',
    'details.show_more': 'Show more',
    'news.heading': 'In the local news, decades later…',
    'pause.heading': 'A pause to consider',
    'pause.cant_see': 'Things this simulator cannot see',
    'futures.title.playful': 'Possible Adult Futures',
    'futures.title.adult': 'Projected Adult Trajectories',
    'futures.subtle.playful': 'Different lives this child might end up living. Same kid, many roads — life is unpredictable on purpose.',
    'futures.subtle.adult': 'Speculative adult-life trajectories under varying environmental conditions. Outcomes are illustrative, not predictive.',
    'alts.title.playful': 'Alternate Timelines',
    'alts.title.adult': 'Alternate Projections',
    'alts.subtle.playful': 'Different babies the same two parents might have. Click <em>Make this the main baby</em> on any card to load it.',
    'alts.subtle.adult': 'Sibling-distribution sampling from the same parental inputs. Select <em>Promote to main</em> to load any projection.',
    'history.toggle.playful': '📜 History of Human Enhancement',
    'history.toggle.adult': 'Regulatory & Historical Context',
    'ethics.title.playful': 'A gentle reminder',
    'ethics.title.adult': 'Disclosure',
    'ethics.body.playful': 'This simulator is fictional. Real traits are shaped by many genes, environment, chance, culture, health, and life experience. Babies are not customizable products.',
    'ethics.body.adult': 'Fictional simulation for illustrative purposes. Current ethical regulations vary globally. Behavioral outcomes remain difficult to model reliably.',
    'footer.tagline': 'BabyBlend Lab · A speculative simulation · No data leaves your device',
    'footer.about': 'About & sources',
    'style.lorelei': 'Lorelei',
    'style.bigSmile': 'Big Smile',
    'codename.placeholder': 'Tiny Prototype A-01',
    'archetype.placeholder': 'Tiny Prototype',
    'life_stage.heading': 'Across the years',
    'intro.history.cite.1978': 'Steptoe & Edwards, <em>The Lancet</em>, 1978.',
    'intro.history.cite.1990': 'Handyside et al., <em>Nature</em>, 1990.',
    'intro.history.cite.2012': 'Jinek, Chylinski, Fonfara, Hauer, Doudna & Charpentier, <em>Science</em>, 2012.',
    'intro.history.cite.2018': 'Cyranoski & Ledford, <em>Nature</em> news, November 2018.',
    'intro.history.cite.2019': 'Xinhua / Reuters, December 2019.',
    'intro.history.cite.2020': 'Royal Swedish Academy of Sciences, 2020.',
    'intro.history.cite.2023': 'Medicines and Healthcare products Regulatory Agency, November 2023.',
    'intro.culture.cite1': 'International Society of Aesthetic Plastic Surgery, Global Survey, 2022.',
    'intro.culture.cite2': 'Rajanala, Maymone & Vashi, <em>JAMA Facial Plastic Surgery</em>, 2018.',
    'intro.culture.cite3': 'Veale et al., systematic review, <em>Body Image</em>, 2016.',
    'intro.culture.cite4': 'Baylis, Darnovsky, Hasson & Krahn, <em>The CRISPR Journal</em>, 2020.',
    'app.tagline': 'A fictional genetics-inspired simulator',
    'app.disclaimer': 'Educational speculation. Not medical, genetic, or clinical advice.',
    'mode.reflection': 'Reflection',
    'mode.kids': 'Kids',
    'mode.adult': 'Adult',
    'landing.desc1': 'Build two parents. Adjust their environment.',
    'landing.desc2': 'See what a possible child might look like, think, and become.',
    'landing.feature1': 'Polygenic-flavored inheritance',
    'landing.feature2': 'Big Five behavioral projection',
    'landing.feature3': 'Speculative adult trajectories',
    'landing.begin': 'Enter the lab',
    'landing.disclaimer': 'Fictional simulation. Not real medical or genetic advice.',
    'section.parents': 'Parent Profiles',
    'section.parents.defaults_note': 'Defaults shown represent one ancestry baseline. Use Ancestry on a parent card, ↻ to reroll, 🎲 Randomize Parents, or 🌍 Reset to global phenotype range to explore others.',
    'section.env.playful': 'Environmental Influences',
    'section.env.adult': 'Environmental Modifiers',
    'section.env.intro.playful': "Genes aren't destiny. Tweak the nurture side too.",
    'section.env.intro.adult': 'Adjust developmental modifiers to inform downstream projections.',
    'section.env.hint.adult': 'optional · tweak to refine projection',
    'section.budget.heading': 'Enhancement Allocation',
    'section.budget.intro': 'Distribute credits across optimization categories. Allocations bias projected outcomes; tradeoffs are listed per package.',
    'section.sliders.playful': 'Baby Trait Sliders',
    'section.sliders.adult': 'Projected Outcomes',
    'section.sliders.intro.playful': 'Ranges are inspired by both parents. Slide to explore possibilities. Personality sliders use the Big Five (OCEAN) model — inspired by, not predictive of, real psychology.',
    'section.sliders.intro.adult': 'Ranges derived from midparent inheritance and allocation bias. Behavioral projections have lower confidence than phenotypic.',
    'section.baby.playful': 'Baby Preview',
    'section.baby.reflection': 'A profile, imagined',
    'section.baby.adult': 'Behavioral Projection',
    'section.future.playful': 'Future paths',
    'section.future.reflection': 'Future glimpses',
    'section.future.adult': 'Behavioral Trace Notes',
    'section.lineage.playful': 'Family lineage',
    'section.lineage.reflection': 'Across the generations',
    'section.lineage.adult': 'Generational Cascade',
    'section.lineage.intro.playful': 'Three generations. The choices made here ripple forward.',
    'section.lineage.intro.reflection': 'Three lives, briefly: the people who came before, the person imagined here, the people who might come after.',
    'section.lineage.intro.adult': 'Three-generation cascade. Trait inheritance shown across vertical axis; downstream projections are speculative.',
    'surprise.playful': 'Genetic surprise factor',
    'surprise.adult': 'Outcome variance index',
    'btn.randomize_parents.playful': '🎲 Randomize Parents',
    'btn.randomize_parents.reflection': 'Imagine new parents',
    'btn.randomize_parents.adult': 'Randomize Inputs',
    'btn.preserve.playful': '🌱 Preserve Natural Variation',
    'btn.preserve.reflection': 'Honor natural variation',
    'btn.preserve.adult': 'Reset to Natural Variation',
    'btn.diversify_defaults.playful': '🌍 Reset to global phenotype range',
    'btn.diversify_defaults.reflection': 'Step outside the default range',
    'btn.diversify_defaults.adult': 'Reset to global phenotype range',
    'btn.generate.playful': 'Generate Baby Possibilities',
    'btn.generate.reflection': 'Imagine a possible life',
    'btn.generate.adult': 'Generate Projection',
    'btn.randomize.playful': '🎲 Randomize Within Parent Range',
    'btn.randomize.reflection': 'Try a different version',
    'btn.randomize.adult': 'Re-sample Within Range',
    'btn.reset.playful': '↺ Reset to Parent Average',
    'btn.reset.reflection': 'Return to the middle',
    'btn.reset.adult': 'Reset to Midparent',
    'btn.copy.playful': '⧉ Copy Baby Profile',
    'btn.copy.reflection': 'Copy this profile',
    'btn.copy.adult': 'Export Projection',
    'btn.save.playful': '💾 Save Timeline',
    'btn.save.reflection': 'Hold this life',
    'btn.save.adult': 'Save Projection',
    'btn.futures.playful': '🪐 Show Possible Adult Futures',
    'btn.futures.reflection': 'Glimpse the later years',
    'btn.futures.adult': 'Generate Trajectory Set',
    'btn.alternates.playful': '🌌 Generate Alternate Timelines',
    'btn.alternates.reflection': 'Imagine other lives from the same beginnings',
    'btn.alternates.adult': 'Generate Alternate Projections',
    // Stat panel
    'stat.sex': 'Sex', 'stat.height': 'Height', 'stat.athletic': 'Athletic',
    'stat.eyeColor': 'Eye color', 'stat.hairColor': 'Hair color', 'stat.hairTexture': 'Hair texture',
    'stat.skinTone': 'Skin tone', 'stat.faceShape': 'Face shape', 'stat.freckles': 'Freckles',
    'stat.dimples': 'Dimples',
    'stat.openness': 'Openness', 'stat.conscientiousness': 'Conscientiousness',
    'stat.extraversion': 'Extraversion', 'stat.agreeableness': 'Agreeableness',
    'stat.neuroticism': 'Neuroticism',
    'stat.curiosity': 'Curiosity', 'stat.kindness': 'Kindness', 'stat.energy': 'Energy',
    'stat.focus': 'Focus', 'stat.confidence': 'Confidence',
    'stat.section.bigFive': 'Big Five', 'stat.section.personality': 'Personality',
    'stat.section.behavioralProjection': 'Behavioral Projection',
    // Slider labels (trait sliders panel)
    'slider.height': 'Height potential', 'slider.athletic': 'Athletic tendency',
    'slider.eyeColor': 'Eye color blend', 'slider.hairColor': 'Hair color blend',
    'slider.hairType': 'Hair texture blend', 'slider.skinTone': 'Skin tone blend',
    'slider.faceShape': 'Face shape blend', 'slider.freckles': 'Freckles likelihood',
    'slider.dimples': 'Dimples likelihood',
    // Parent fields
    'parent.A': 'Parent A', 'parent.B': 'Parent B',
    'parent.name': 'Name', 'parent.ancestry': 'Ancestry', 'parent.height': 'Height (cm)',
    'parent.athletic': 'Athletic', 'parent.eyeColor': 'Eye color', 'parent.hairColor': 'Hair color',
    'parent.hairType': 'Hair type', 'parent.skinTone': 'Skin tone', 'parent.faceShape': 'Face shape',
    'parent.freckles': 'Freckles', 'parent.dimples': 'Dimples',
    // Env fields
    'env.family': 'Supportive family', 'env.education': 'Educational access',
    'env.economy': 'Economic stability', 'env.healthcare': 'Healthcare access',
    'env.social': 'Social pressure', 'env.internet': 'Internet exposure',
    'env.multilingual': 'Multilingual upbringing', 'env.urbanRural': 'Urban (1) ↔ Rural (10)',
    'language.label': 'Language'
  },

  zh: {
    'intro.skip': '跳过简介 →',
    'intro.hero.title': '有些未来是被继承的。<br><em>另一些,是被选出来的。</em>',
    'intro.hero.sub': '一项以真实研究为依托的思辨性模拟。',
    'intro.scroll': '继续往下滚动',
    'intro.history.eyebrow': '01 · 历史档案',
    'intro.history.title': '最早被接受的那些编辑。',
    'intro.history.lede': '改写人类遗传,已不再是假设。其时间线,比大多数人所记得的要更短。',
    'intro.history.1978': '第一例试管婴儿降生(英国,Louise Brown)。',
    'intro.history.1990': '首次临床应用胚胎植入前遗传学诊断,以规避 X 连锁疾病。',
    'intro.history.2012': 'CRISPR-Cas9 被演示为可编程的基因组编辑工具。',
    'intro.history.2018': '中国诞生由 CRISPR 编辑胚胎发育而来的双胞胎女婴,科学界广泛谴责。',
    'intro.history.2019': '主导研究者贺建奎在中国被判处三年有期徒刑。',
    'intro.history.2020': 'Emmanuelle Charpentier 与 Jennifer Doudna 因 CRISPR 获诺贝尔化学奖。',
    'intro.history.2023': '英国批准首个基于 CRISPR 的疗法 Casgevy / exa-cel 用于治疗镰状细胞病。',
    'intro.source': '来源',
    'intro.culture.eyebrow': '02 · 文化基线',
    'intro.culture.title': '"优化"早已是日常。',
    'intro.culture.lede': '基因编辑是新的前沿。整容编辑早在几十年前就已成为主流。其背后的社会逻辑,正在继续延伸。',
    'intro.culture.stat1': '全球每年实施的整形美容手术数量。',
    'intro.culture.stat2': '2018 年皮肤科医师提出的一个术语,用以描述那些希望整形,以更像自己被滤镜修饰过的自拍的求诊者。',
    'intro.culture.stat3': '成年人群中身体畸形恐惧症(BDD)的估计患病率。',
    'intro.culture.stat4': '通过立法、条约或政策,限制可遗传的人类基因组编辑。',
    'intro.culture.stat4_value': '75 个以上国家',
    'intro.questions.eyebrow': '03 · 尚无答案',
    'intro.questions.q1': '由谁来决定怎样算是"更好"?',
    'intro.questions.q2': '未经增强的孩子,会不会因此被歧视?',
    'intro.questions.q3': '性格,应该被编辑吗?',
    'intro.questions.q4': '当美变得可以被量度时,会发生什么?',
    'intro.questions.q5': '在"优化文化"中,多样性能否幸存?',
    'intro.enter.eyebrow': '04 · 本次模拟',
    'intro.enter.title': '进入实验室。',
    'intro.enter.lede': '接下来的是一个虚构的消费级产品模型。它的机制是推演,但其中的社会压力是真实的。',
    'intro.notice.system_tag': '[ 系统提示 ]',
    'intro.notice.system': '行为方面的投影仍属于低置信度。',
    'intro.notice.ethics_tag': '[ 伦理提示 ]',
    'intro.notice.ethics': '"优化目标"会随文化与时代而变化。',
    'intro.notice.regulatory_tag': '[ 监管提示 ]',
    'intro.notice.regulatory': '在许多地区,可遗传的基因组编辑仍受到限制。',
    'intro.enter.btn': '进入 BabyBlend Lab',
    'intro.enter.disclaimer': '教育性的、推演式的模拟。并非医疗建议。',
    'badge.beta': '测试版',
    'badge.adjacent': '相邻',
    'badge.consent_heritable': '同意已受影响:可遗传',
    'budget.compliance': '合规参考:《奥维耶多公约》第 13 条(对可遗传种系编辑的限制);医学伦理中的"不伤害"原则。',
    'budget.ethics.reversibility': '可逆性:<strong>无</strong>',
    'budget.ethics.subject_absent': '主体不在场:<strong>是</strong>',
    'budget.proj.cohort': '预测的群组定位',
    'budget.proj.cohort.baseline': '未介入 · 基线群组',
    'budget.proj.cost': '预估成本',
    'budget.proj.cost.baseline': '— (基线群组)',
    'budget.proj.access': '预测的可及性层级',
    'budget.proj.access.baseline': '通用 · 基线',
    'budget.burden.disclaimer': '所有分配都同等地剥夺了未来主体的选择权;权重衡量的,是这种损失向后代扩散的广度,而不是它"是否发生"。',
    'budget.proj.burden': '身份锁定指数',
    'budget.proj.burden.minimal': '极低',
    'consent.heading': '同意层面的影响',
    'consent.subtle': '上述每一项分配的对象,都无法对此表达同意。下方的说明,以机构性的措辞写出这意味着什么。',
    'surprise.note': '宝宝偏离父母简单平均值的可能性。',
    'kids.stars.creativity': '创造力',
    'kids.stars.teamwork': '团队协作',
    'scrubber.label': '看看他/她在……',
    'details.show_more': '展开更多',
    'news.heading': '几十年后,本地新闻里……',
    'pause.heading': '停下来想一想',
    'pause.cant_see': '这台模拟器看不到的事',
    'futures.title.playful': '可能的成年生活',
    'futures.title.adult': '成年期轨迹投影',
    'futures.subtle.playful': '这个孩子日后可能会过的几种不同人生。同一个孩子,不同的路——人生本来就是不可预测的。',
    'futures.subtle.adult': '在不同环境条件下,对成年生活的推演性投影。结果具有示意性,并不具备预测性。',
    'alts.title.playful': '其他时间线',
    'alts.title.adult': '替代投影',
    'alts.subtle.playful': '同一对父母可能生下的不同宝宝。在任意卡片上点击 <em>Make this the main baby</em>(把这一个设为主宝宝)即可加载它。',
    'alts.subtle.adult': '基于相同父母输入的兄弟姐妹分布抽样。选择 <em>Promote to main</em>(提升为主投影)以加载任意投影。',
    'history.toggle.playful': '📜 人类增强的历史',
    'history.toggle.adult': '监管与历史背景',
    'ethics.title.playful': '温柔的小提醒',
    'ethics.title.adult': '披露',
    'ethics.body.playful': '本模拟器是虚构的。真实的特征受到许多基因、环境、机遇、文化、健康与人生经历的共同塑造。婴儿不是可以定制的产品。',
    'ethics.body.adult': '为示例之用的虚构模拟。当前各地的伦理监管标准不一。行为层面的结果仍难以建立可靠的模型。',
    'footer.tagline': 'BabyBlend Lab · 一项思辨性的模拟 · 数据不会离开你的设备',
    'footer.about': '关于与资料来源',
    'style.lorelei': 'Lorelei 风格',
    'style.bigSmile': 'Big Smile 风格',
    'codename.placeholder': '小小原型 A-01',
    'archetype.placeholder': '小小原型',
    'life_stage.heading': '岁月之间',
    'intro.history.cite.1978': 'Steptoe 与 Edwards,《柳叶刀》(<em>The Lancet</em>),1978 年。',
    'intro.history.cite.1990': 'Handyside 等,《自然》(<em>Nature</em>),1990 年。',
    'intro.history.cite.2012': 'Jinek、Chylinski、Fonfara、Hauer、Doudna 与 Charpentier,《科学》(<em>Science</em>),2012 年。',
    'intro.history.cite.2018': 'Cyranoski 与 Ledford,《自然》(<em>Nature</em>)新闻,2018 年 11 月。',
    'intro.history.cite.2019': '新华社 / 路透社,2019 年 12 月。',
    'intro.history.cite.2020': '瑞典皇家科学院,2020 年。',
    'intro.history.cite.2023': '英国药品与保健品管理局(MHRA),2023 年 11 月。',
    'intro.culture.cite1': '国际美容整形外科学会(ISAPS),《全球调查》,2022 年。',
    'intro.culture.cite2': 'Rajanala、Maymone 与 Vashi,《JAMA Facial Plastic Surgery》,2018 年。',
    'intro.culture.cite3': 'Veale 等,系统综述,《Body Image》,2016 年。',
    'intro.culture.cite4': 'Baylis、Darnovsky、Hasson 与 Krahn,《CRISPR Journal》,2020 年。',
    'app.tagline': '一款受遗传学启发的虚构模拟器',
    'app.disclaimer': '教育性的推演。并非医疗、遗传或临床建议。',
    'mode.reflection': '沉思',
    'mode.kids': '儿童',
    'mode.adult': '成人',
    'landing.desc1': '构建两位父母。调整他们的环境。',
    'landing.desc2': '看看一个可能的孩子会是什么样子,会如何思考,又会成为怎样的人。',
    'landing.feature1': '多基因风格的遗传机制',
    'landing.feature2': '大五人格行为投射',
    'landing.feature3': '推测性成人轨迹',
    'landing.begin': '进入实验室',
    'landing.disclaimer': '虚构模拟。并非真实的医疗或遗传建议。',
    'section.parents': '父母资料',
    'section.parents.defaults_note': '此处显示的默认值仅代表一种祖源基线。可在父母卡片上使用「祖源」选项,点击 ↻ 重新抽取,使用 🎲 随机父母,或点击 🌍 重置为全球表型范围来探索其他可能。',
    'section.env.playful': '环境影响',
    'section.env.adult': '发展调节因子',
    'section.env.intro.playful': '基因并非命运。也调整一下后天的因素吧。',
    'section.env.intro.adult': '调整发展调节因子,为下游预测提供依据。',
    'section.budget.heading': '增强分配',
    'section.budget.intro': '在各优化类别之间分配积分。分配会影响预测结果;每项的权衡列于相应说明中。',
    'section.sliders.playful': '宝宝特征滑块',
    'section.sliders.adult': '预测结果',
    'section.sliders.intro.playful': '范围参考了双亲。拖动滑块以探索可能性。人格滑块基于大五人格(OCEAN)模型——受其启发,而非真实心理学的预测。',
    'section.sliders.intro.adult': '范围来源于双亲中值遗传与分配偏差。行为投射的可信度低于表型预测。',
    'section.baby.playful': '宝宝预览',
    'section.baby.reflection': '一份被想象的画像',
    'section.baby.adult': '行为投射',
    'section.future.playful': '未来路径',
    'section.future.reflection': '未来一瞥',
    'section.future.adult': '行为追踪笔记',
    'section.lineage.playful': '家族传承',
    'section.lineage.reflection': '穿越世代',
    'section.lineage.adult': '世代级联',
    'section.lineage.intro.playful': '三代人。此刻所做的选择会向前波及。',
    'section.lineage.intro.reflection': '简而言之,三段生命:走在前面的人、此处所想象的人、可能走在后面的人。',
    'section.lineage.intro.adult': '三代级联。纵轴显示特征遗传;下游预测仅为推测。',
    'surprise.playful': '基因惊喜因子',
    'surprise.adult': '结果方差指数',
    'btn.randomize_parents.playful': '🎲 随机父母',
    'btn.randomize_parents.reflection': '想象新的父母',
    'btn.randomize_parents.adult': '随机化输入',
    'btn.preserve.playful': '🌱 保留自然变异',
    'btn.preserve.reflection': '尊重自然变异',
    'btn.preserve.adult': '重置为自然变异',
    'btn.diversify_defaults.playful': '🌍 重置为全球表型范围',
    'btn.diversify_defaults.reflection': '走出默认的范围',
    'btn.diversify_defaults.adult': '重置为全球表型范围',
    'btn.generate.playful': '生成宝宝可能性',
    'btn.generate.reflection': '想象一段可能的人生',
    'btn.generate.adult': '生成投射',
    'btn.randomize.playful': '🎲 在父母范围内随机',
    'btn.randomize.reflection': '换一种版本试试',
    'btn.randomize.adult': '在范围内重新取样',
    'btn.reset.playful': '↺ 重置为父母平均',
    'btn.reset.reflection': '回到中间',
    'btn.reset.adult': '重置为双亲中值',
    'btn.copy.playful': '⧉ 复制宝宝档案',
    'btn.copy.reflection': '复制这份画像',
    'btn.copy.adult': '导出投射',
    'btn.save.playful': '💾 保存时间线',
    'btn.save.reflection': '留住这段人生',
    'btn.save.adult': '保存投射',
    'btn.futures.playful': '🪐 展示可能的成人未来',
    'btn.futures.reflection': '一瞥往后的岁月',
    'btn.futures.adult': '生成轨迹组',
    'btn.alternates.playful': '🌌 生成平行时间线',
    'btn.alternates.reflection': '从同一开端想象其他人生',
    'btn.alternates.adult': '生成替代投射',
    'language.label': '语言'
  },

  ja: {
    'intro.skip': 'イントロをスキップ →',
    'intro.hero.title': '受け継がれる未来がある。<br><em>選ばれる未来もある。</em>',
    'intro.hero.sub': '実在の研究に裏打ちされた、推測的なシミュレーション。',
    'intro.scroll': 'スクロールして続ける',
    'intro.history.eyebrow': '01 · 歴史的記録',
    'intro.history.title': '最初に受け入れられた編集たち。',
    'intro.history.lede': '人間の遺伝を書き換えることは、もはや仮定の話ではない。そしてその年表は、多くの人が記憶しているよりも短い。',
    'intro.history.1978': '世界初の体外受精児が誕生(イギリス、Louise Brown)。',
    'intro.history.1990': 'X連鎖遺伝病を回避するため、着床前遺伝子診断が初めて臨床応用された。',
    'intro.history.2012': 'CRISPR-Cas9 が、プログラム可能なゲノム編集ツールとして実証された。',
    'intro.history.2018': '中国で CRISPR 編集胚から双子の女児が誕生。科学界から広く非難された。',
    'intro.history.2019': '主任研究者の賀建奎(He Jiankui)が中国で三年の実刑判決を受ける。',
    'intro.history.2020': 'Emmanuelle Charpentier と Jennifer Doudna が CRISPR でノーベル化学賞を受賞。',
    'intro.history.2023': '英国が、鎌状赤血球症を対象とする初の CRISPR ベースの治療(Casgevy / exa-cel)を承認した。',
    'intro.source': '出典',
    'intro.culture.eyebrow': '02 · 文化的ベースライン',
    'intro.culture.title': '「最適化」はすでに日常になっている。',
    'intro.culture.lede': '遺伝子編集は新しい最先端だ。だが美容的な「編集」は、もう何十年も主流であり続けている。社会的なロジックは、そのまま地続きに伸びていく。',
    'intro.culture.stat1': '世界で毎年行われている美容医療処置の件数。',
    'intro.culture.stat2': '2018 年に皮膚科医たちが名付けた用語。フィルター加工された自撮りに似せたいと希望して整形を求める患者を指す。',
    'intro.culture.stat3': '成人における身体醜形症(BDD)の推定有病率。',
    'intro.culture.stat4': '法令、条約、または政策によって、遺伝に関わるヒトゲノム編集を制限している。',
    'intro.culture.stat4_value': '75を超える国・地域',
    'intro.questions.eyebrow': '03 · 未解決の問い',
    'intro.questions.q1': '何を「改善」と呼ぶかを、誰が決めるのか?',
    'intro.questions.q2': '「強化されていない」子どもたちは、差別を受けるのか?',
    'intro.questions.q3': '人格は、編集してよいのか?',
    'intro.questions.q4': '美しさが「測れるもの」になったとき、何が起きるか?',
    'intro.questions.q5': '最適化の文化のなかで、多様性は生き残れるか?',
    'intro.enter.eyebrow': '04 · 本シミュレーション',
    'intro.enter.title': 'ラボに入る。',
    'intro.enter.lede': 'ここから先に広がるのは、架空の消費者向けプロダクトのモックアップである。機構は思考実験だが、そこにかかる圧力は現実のものだ。',
    'intro.notice.system_tag': '[ システム通知 ]',
    'intro.notice.system': '行動面の投影は依然として低信頼度である。',
    'intro.notice.ethics_tag': '[ 倫理通知 ]',
    'intro.notice.ethics': '最適化の目標は、文化や時代によって変わる。',
    'intro.notice.regulatory_tag': '[ 規制通知 ]',
    'intro.notice.regulatory': '遺伝に関わるゲノム編集は、依然として多くの地域で制限されている。',
    'intro.enter.btn': 'BabyBlend Lab に入る',
    'intro.enter.disclaimer': '教育目的の推測的シミュレーションです。医療上の助言ではありません。',
    'badge.beta': 'ベータ',
    'badge.adjacent': '関連',
    'badge.consent_heritable': '同意に影響:遺伝に関わる',
    'budget.compliance': 'コンプライアンス参照:オビエド条約 第13条(遺伝に関わる生殖細胞系列の編集制限)、および医療倫理における「無危害(non-maleficence)」原則。',
    'budget.ethics.reversibility': '可逆性:<strong>なし</strong>',
    'budget.ethics.subject_absent': '当事者は不在:<strong>はい</strong>',
    'budget.proj.cohort': '予測されるコホート上の位置',
    'budget.proj.cohort.baseline': '未介入 · 基準コホート',
    'budget.proj.cost': '推定コスト',
    'budget.proj.cost.baseline': '— (基準コホート)',
    'budget.proj.access': '予測されるアクセス階層',
    'budget.proj.access.baseline': 'ユニバーサル · 基準',
    'budget.burden.disclaimer': 'いずれの割り当ても、未来の当事者から選択肢を等しく奪う。重み付けが測るのは、その喪失が世代へどれだけ広く波及するかであって、喪失そのものが起きるかどうかではない。',
    'budget.proj.burden': 'アイデンティティ・ロックイン指数',
    'budget.proj.burden.minimal': '最小',
    'consent.heading': '同意上の含意',
    'consent.subtle': '上記の割り当ての対象となる当事者は、それに同意することができない。下の各項目は、その意味を機構的な言葉で記すものである。',
    'surprise.note': '赤ちゃんが、両親の単純平均からどれくらい離れる可能性があるか。',
    'kids.stars.creativity': '創造性',
    'kids.stars.teamwork': 'チームワーク',
    'scrubber.label': 'この子の……の姿を見る',
    'details.show_more': 'もっと表示',
    'news.heading': '何十年か後、地元のニュースで……',
    'pause.heading': '少し立ち止まる',
    'pause.cant_see': 'このシミュレーターには見えないこと',
    'futures.title.playful': 'ありうる大人の未来',
    'futures.title.adult': '成人期の軌跡の投影',
    'futures.subtle.playful': 'この子がいつか歩むかもしれない、いろんな人生。同じ子でも、道は何本もある——人生はもともと、予想できないようにできている。',
    'futures.subtle.adult': '環境条件のさまざまな組み合わせのもとで、成人期の軌跡を推測的に投影したもの。例示であり、予測ではない。',
    'alts.title.playful': 'もう一つの時間線',
    'alts.title.adult': '代替投影',
    'alts.subtle.playful': '同じ両親から生まれうる、ちがう赤ちゃんたち。いずれかのカードで <em>Make this the main baby</em>(これをメインの子にする)を選ぶと読み込めます。',
    'alts.subtle.adult': '同じ親入力からの、きょうだい分布のサンプリング。<em>Promote to main</em>(メイン投影に昇格)を選ぶと、その投影に読み込まれる。',
    'history.toggle.playful': '📜 人類強化(エンハンスメント)の歴史',
    'history.toggle.adult': '規制と歴史的背景',
    'ethics.title.playful': 'やさしい注意書き',
    'ethics.title.adult': '開示',
    'ethics.body.playful': 'このシミュレーターは架空のものです。実際の特性は、たくさんの遺伝子、環境、偶然、文化、健康、そして人生経験によってかたちづくられています。赤ちゃんは「カスタマイズできる製品」ではありません。',
    'ethics.body.adult': '例示を目的とした、架空のシミュレーション。現行の倫理規制は地域によって異なる。行動上の帰結を信頼性高くモデル化することは、依然として困難である。',
    'footer.tagline': 'BabyBlend Lab · 思考実験的シミュレーション · データは端末から外に出ません',
    'footer.about': '本サイトと出典について',
    'style.lorelei': 'Lorelei スタイル',
    'style.bigSmile': 'Big Smile スタイル',
    'codename.placeholder': '小さな試作 A-01',
    'archetype.placeholder': '小さな試作',
    'life_stage.heading': '歳月を越えて',
    'intro.history.cite.1978': 'Steptoe と Edwards、<em>The Lancet</em>、1978年。',
    'intro.history.cite.1990': 'Handyside ほか、<em>Nature</em>、1990年。',
    'intro.history.cite.2012': 'Jinek、Chylinski、Fonfara、Hauer、Doudna、Charpentier、<em>Science</em>、2012年。',
    'intro.history.cite.2018': 'Cyranoski と Ledford、<em>Nature</em> ニュース、2018年11月。',
    'intro.history.cite.2019': '新華社 / ロイター、2019年12月。',
    'intro.history.cite.2020': 'スウェーデン王立科学アカデミー、2020年。',
    'intro.history.cite.2023': '英国 医薬品・医療製品規制庁(MHRA)、2023年11月。',
    'intro.culture.cite1': '国際美容外科学会(ISAPS)、グローバルサーベイ、2022年。',
    'intro.culture.cite2': 'Rajanala、Maymone、Vashi、<em>JAMA Facial Plastic Surgery</em>、2018年。',
    'intro.culture.cite3': 'Veale ほか、系統的レビュー、<em>Body Image</em>、2016年。',
    'intro.culture.cite4': 'Baylis、Darnovsky、Hasson、Krahn、<em>The CRISPR Journal</em>、2020年。',
    'app.tagline': '遺伝学にインスパイアされた架空のシミュレーター',
    'app.disclaimer': '教育目的の推測的シミュレーション。医療・遺伝・臨床上の助言ではありません。',
    'mode.reflection': '内省',
    'mode.kids': 'キッズ',
    'mode.adult': 'アダルト',
    'landing.desc1': '2人の親を作成し、環境を調整します。',
    'landing.desc2': '生まれてくるかもしれない子どもの姿、思考、未来を覗いてみてください。',
    'landing.feature1': 'ポリジーン的な遺伝表現',
    'landing.feature2': 'ビッグファイブの行動投射',
    'landing.feature3': '推測的な成人後の軌跡',
    'landing.begin': 'ラボに入る',
    'landing.disclaimer': '架空のシミュレーション。実際の医療や遺伝のアドバイスではありません。',
    'section.parents': '親プロフィール',
    'section.parents.defaults_note': 'ここに表示される初期値は、ひとつの祖先系統を基準にした見え方にすぎません。親カードの「祖先」を切り替える、↻ で振り直す、🎲 で親をランダム化する、または 🌍 で世界全体の表現型レンジに戻して、別の可能性を試してみてください。',
    'section.env.playful': '環境の影響',
    'section.env.adult': '発達調整因子',
    'section.env.intro.playful': '遺伝は運命ではありません。育つ環境も少しいじってみましょう。',
    'section.env.intro.adult': '発達調整因子を変えて、下流の予測に反映させます。',
    'section.budget.heading': '強化アロケーション',
    'section.budget.intro': '最適化カテゴリーにクレジットを配分してください。配分は予測結果に偏りを与えます。トレードオフは各パッケージに記載されています。',
    'section.sliders.playful': '赤ちゃんの特性スライダー',
    'section.sliders.adult': '予測アウトカム',
    'section.sliders.intro.playful': '両親をもとにした範囲です。スライドして可能性を探ってください。性格スライダーはビッグファイブ(OCEAN)モデルに着想を得ています ― 現実の心理学的予測ではありません。',
    'section.sliders.intro.adult': '範囲は中央親値の遺伝とアロケーション偏差から導出されます。行動投射は表現型より信頼度が低めです。',
    'section.baby.playful': '赤ちゃんプレビュー',
    'section.baby.reflection': '想像された一人の肖像',
    'section.baby.adult': '行動投射',
    'section.future.playful': '未来の道筋',
    'section.future.reflection': '未来のかいま見',
    'section.future.adult': '行動トレースノート',
    'section.lineage.playful': '家族の系譜',
    'section.lineage.reflection': '世代を越えて',
    'section.lineage.adult': '世代カスケード',
    'section.lineage.intro.playful': '三世代。ここでの選択は先へと波及していきます。',
    'section.lineage.intro.reflection': '三つの人生を、ごく短く――先に生きた人々、ここに想像される人、そして後を生きるかもしれない人々。',
    'section.lineage.intro.adult': '三世代のカスケード。縦軸に特性遺伝を表示。下流の投射は推測値です。',
    'surprise.playful': '遺伝サプライズ係数',
    'surprise.adult': 'アウトカム分散指数',
    'btn.randomize_parents.playful': '🎲 親をランダムに',
    'btn.randomize_parents.reflection': '新しい親を思い描く',
    'btn.randomize_parents.adult': '入力をランダム化',
    'btn.preserve.playful': '🌱 自然なばらつきを残す',
    'btn.preserve.reflection': '自然なばらつきを尊ぶ',
    'btn.preserve.adult': '自然変動にリセット',
    'btn.diversify_defaults.playful': '🌍 世界全体の表現型レンジにリセット',
    'btn.diversify_defaults.reflection': '既定のレンジの外に出てみる',
    'btn.diversify_defaults.adult': '世界全体の表現型レンジにリセット',
    'btn.generate.playful': '赤ちゃんの可能性を生成',
    'btn.generate.reflection': 'ありうる人生を想像する',
    'btn.generate.adult': '投射を生成',
    'btn.randomize.playful': '🎲 親の範囲内でランダム',
    'btn.randomize.reflection': '別のバージョンを試す',
    'btn.randomize.adult': '範囲内で再サンプリング',
    'btn.reset.playful': '↺ 親の平均にリセット',
    'btn.reset.reflection': '真ん中に戻る',
    'btn.reset.adult': '中央親値にリセット',
    'btn.copy.playful': '⧉ 赤ちゃんプロファイルをコピー',
    'btn.copy.reflection': 'この肖像をコピー',
    'btn.copy.adult': '投射をエクスポート',
    'btn.save.playful': '💾 タイムラインを保存',
    'btn.save.reflection': 'この人生を残す',
    'btn.save.adult': '投射を保存',
    'btn.futures.playful': '🪐 ありうる成人の未来を表示',
    'btn.futures.reflection': '後の年月をかいま見る',
    'btn.futures.adult': '軌跡セットを生成',
    'btn.alternates.playful': '🌌 別のタイムラインを生成',
    'btn.alternates.reflection': '同じ始まりから、別の人生を想像する',
    'btn.alternates.adult': '代替投射を生成',
    'language.label': '言語'
  },

  ko: {
    'intro.skip': '인트로 건너뛰기 →',
    'intro.hero.title': '어떤 미래는 물려받는다.<br><em>다른 미래는, 선택된다.</em>',
    'intro.hero.sub': '실재 연구에 토대를 둔, 사변적 시뮬레이션.',
    'intro.scroll': '계속 스크롤하기',
    'intro.history.eyebrow': '01 · 역사 기록',
    'intro.history.title': '최초로 받아들여진 편집들.',
    'intro.history.lede': '인간의 유전을 손대는 일은 더 이상 가정이 아니다. 그 연표는, 사람들이 기억하는 것보다 훨씬 짧다.',
    'intro.history.1978': '체외수정으로 태어난 최초의 아기(영국, Louise Brown).',
    'intro.history.1990': 'X 연관 질환을 회피하기 위한 착상 전 유전 진단이 처음으로 임상에 사용됨.',
    'intro.history.2012': 'CRISPR-Cas9이 프로그램 가능한 유전체 편집 도구로 시연됨.',
    'intro.history.2018': '중국에서 CRISPR로 편집된 배아로부터 쌍둥이 여아가 태어남. 과학계는 광범위하게 비판함.',
    'intro.history.2019': '주도 연구자 허젠쿠이(He Jiankui)가 중국에서 3년 실형 선고를 받음.',
    'intro.history.2020': 'Emmanuelle Charpentier와 Jennifer Doudna가 CRISPR로 노벨 화학상을 수상함.',
    'intro.history.2023': '영국이 겸상 적혈구 질환을 대상으로 한 최초의 CRISPR 기반 치료제(Casgevy / exa-cel)를 승인함.',
    'intro.source': '출처',
    'intro.culture.eyebrow': '02 · 문화적 기준선',
    'intro.culture.title': '"최적화"는 이미 일상이 되었다.',
    'intro.culture.lede': '유전자 편집은 새로운 첨단이다. 그러나 미용을 위한 "편집"은 이미 수십 년째 주류였다. 그 사회적 논리는 그대로 이어진다.',
    'intro.culture.stat1': '전 세계에서 한 해 동안 이루어진 미용 시술 건수.',
    'intro.culture.stat2': '2018년 피부과 의사들이 만들어낸 용어. 필터로 보정된 자기 사진과 닮고 싶어 성형을 원하는 환자를 가리킨다.',
    'intro.culture.stat3': '성인에서 신체이형장애(BDD)의 추정 유병률.',
    'intro.culture.stat4': '법률·조약·정책을 통해 유전 가능한 인간 유전체 편집을 제한하고 있다.',
    'intro.culture.stat4_value': '75개 이상의 국가',
    'intro.questions.eyebrow': '03 · 풀리지 않은 물음',
    'intro.questions.q1': '무엇을 "개선"으로 부를지, 누가 정하는가?',
    'intro.questions.q2': '"강화"되지 않은 아이들은, 차별을 받게 될까?',
    'intro.questions.q3': '성격은 편집해도 되는가?',
    'intro.questions.q4': '아름다움이 "측정 가능한 것"이 되었을 때, 무엇이 일어날까?',
    'intro.questions.q5': '최적화의 문화 속에서, 다양성은 살아남을 수 있을까?',
    'intro.enter.eyebrow': '04 · 본 시뮬레이션',
    'intro.enter.title': '실험실로 들어가기.',
    'intro.enter.lede': '여기부터는 가상의 소비자용 제품 목업이다. 작동 원리는 사변적이지만, 그 위에 얹힌 사회적 압력은 실재한다.',
    'intro.notice.system_tag': '[ 시스템 안내 ]',
    'intro.notice.system': '행동에 대한 투영은 여전히 낮은 신뢰도를 갖는다.',
    'intro.notice.ethics_tag': '[ 윤리 안내 ]',
    'intro.notice.ethics': '최적화 목표는 문화와 시대에 따라 달라진다.',
    'intro.notice.regulatory_tag': '[ 규제 안내 ]',
    'intro.notice.regulatory': '유전 가능한 유전체 편집은 여전히 많은 지역에서 제한되어 있다.',
    'intro.enter.btn': 'BabyBlend Lab에 들어가기',
    'intro.enter.disclaimer': '교육 목적의 사변적 시뮬레이션입니다. 의료 조언이 아닙니다.',
    'badge.beta': '베타',
    'badge.adjacent': '인접',
    'badge.consent_heritable': '동의가 영향을 받음: 유전 가능',
    'budget.compliance': '컴플라이언스 참조: 오비에도 협약 제13조(유전 가능한 생식세포 편집 제한), 의학윤리상의 무해(non-maleficence) 원칙.',
    'budget.ethics.reversibility': '되돌릴 수 있음: <strong>없음</strong>',
    'budget.ethics.subject_absent': '당사자 부재: <strong>예</strong>',
    'budget.proj.cohort': '예측된 코호트 위치',
    'budget.proj.cohort.baseline': '개입 없음 · 기준 코호트',
    'budget.proj.cost': '추정 비용',
    'budget.proj.cost.baseline': '— (기준 코호트)',
    'budget.proj.access': '예측된 접근 등급',
    'budget.proj.access.baseline': '보편 · 기준',
    'budget.burden.disclaimer': '모든 할당은 미래 당사자의 선택을 똑같이 빼앗는다. 가중치는 그 상실이 후대에 얼마나 널리 전파되는지를 측정할 뿐, 상실 자체가 일어나는가를 측정하지 않는다.',
    'budget.proj.burden': '정체성 고착 지수',
    'budget.proj.burden.minimal': '최소',
    'consent.heading': '동의 측면의 함의',
    'consent.subtle': '위의 할당이 향하는 당사자는, 그것에 동의할 수 없다. 아래 각 항목은 그것이 무엇을 의미하는지를 제도적 언어로 적어둔다.',
    'surprise.note': '아기가 두 부모의 단순 평균에서 얼마나 벗어날 가능성이 있는지.',
    'kids.stars.creativity': '창의성',
    'kids.stars.teamwork': '팀워크',
    'scrubber.label': '이 아이의 어느 시점을 볼까',
    'details.show_more': '더 보기',
    'news.heading': '수십 년 뒤, 동네 뉴스에서는…',
    'pause.heading': '잠시 멈추어 생각해 보기',
    'pause.cant_see': '이 시뮬레이터가 보지 못하는 것들',
    'futures.title.playful': '가능한 어른의 미래들',
    'futures.title.adult': '성인기 궤적 투영',
    'futures.subtle.playful': '이 아이가 살아갈 수 있는 여러 다른 인생들. 같은 아이, 수많은 길 — 삶은 본디 예측 불가능하도록 짜여 있다.',
    'futures.subtle.adult': '다양한 환경 조건 아래에서, 성인기 궤적에 대한 사변적 투영. 결과는 예시이며 예측이 아니다.',
    'alts.title.playful': '또 다른 시간선들',
    'alts.title.adult': '대체 투영',
    'alts.subtle.playful': '같은 부모가 가질 수 있는, 또 다른 아기들. 어느 카드에서든 <em>Make this the main baby</em>(이걸 메인 아기로 만들기)를 누르면 불러올 수 있어요.',
    'alts.subtle.adult': '동일한 부모 입력으로부터의 형제자매 분포 표본. <em>Promote to main</em>(메인 투영으로 격상)을 선택하면 해당 투영으로 불러온다.',
    'history.toggle.playful': '📜 인간 강화의 역사',
    'history.toggle.adult': '규제 및 역사적 맥락',
    'ethics.title.playful': '부드러운 알림',
    'ethics.title.adult': '고지',
    'ethics.body.playful': '이 시뮬레이터는 가상입니다. 실제 특성은 수많은 유전자, 환경, 우연, 문화, 건강, 그리고 살아온 경험이 함께 빚어냅니다. 아기는 맞춤 제작되는 상품이 아닙니다.',
    'ethics.body.adult': '예시를 위한 가상의 시뮬레이션. 현재의 윤리 규제는 국가별로 다르다. 행동적 결과는 여전히 안정적으로 모형화하기 어렵다.',
    'footer.tagline': 'BabyBlend Lab · 사변적 시뮬레이션 · 어떤 데이터도 기기를 떠나지 않는다',
    'footer.about': '소개 및 출처',
    'style.lorelei': 'Lorelei 스타일',
    'style.bigSmile': 'Big Smile 스타일',
    'codename.placeholder': '작은 프로토타입 A-01',
    'archetype.placeholder': '작은 프로토타입',
    'life_stage.heading': '세월 너머',
    'intro.history.cite.1978': 'Steptoe와 Edwards, <em>The Lancet</em>, 1978년.',
    'intro.history.cite.1990': 'Handyside 외, <em>Nature</em>, 1990년.',
    'intro.history.cite.2012': 'Jinek, Chylinski, Fonfara, Hauer, Doudna와 Charpentier, <em>Science</em>, 2012년.',
    'intro.history.cite.2018': 'Cyranoski와 Ledford, <em>Nature</em> 뉴스, 2018년 11월.',
    'intro.history.cite.2019': '신화통신 / 로이터, 2019년 12월.',
    'intro.history.cite.2020': '스웨덴 왕립과학원, 2020년.',
    'intro.history.cite.2023': '영국 의약품·의료제품 규제청(MHRA), 2023년 11월.',
    'intro.culture.cite1': '국제미용성형외과학회(ISAPS), 글로벌 서베이, 2022년.',
    'intro.culture.cite2': 'Rajanala, Maymone와 Vashi, <em>JAMA Facial Plastic Surgery</em>, 2018년.',
    'intro.culture.cite3': 'Veale 외, 체계적 고찰, <em>Body Image</em>, 2016년.',
    'intro.culture.cite4': 'Baylis, Darnovsky, Hasson와 Krahn, <em>The CRISPR Journal</em>, 2020년.',
    'app.tagline': '유전학에서 영감을 받은 가상의 시뮬레이터',
    'app.disclaimer': '교육 목적의 사고 실험. 의료·유전·임상 자문이 아닙니다.',
    'mode.reflection': '성찰',
    'mode.kids': '키즈',
    'mode.adult': '어덜트',
    'landing.desc1': '두 명의 부모를 만들고, 환경을 조정해 보세요.',
    'landing.desc2': '태어날 수 있는 아이가 어떻게 생기고, 무엇을 생각하며, 누가 될지를 들여다보세요.',
    'landing.feature1': '다유전자적 색채의 유전',
    'landing.feature2': '빅 파이브 행동 투영',
    'landing.feature3': '추측적인 성인기 경로',
    'landing.begin': '실험실에 들어가기',
    'landing.disclaimer': '가상의 시뮬레이션입니다. 실제 의료나 유전 자문이 아닙니다.',
    'section.parents': '부모 프로필',
    'section.parents.defaults_note': '여기 표시된 기본값은 하나의 혈통을 기준으로 한 모습일 뿐입니다. 부모 카드의 「혈통」을 바꾸거나, ↻ 로 다시 뽑거나, 🎲 부모 무작위, 또는 🌍 전 세계 표현형 범위로 리셋을 사용해 다른 가능성을 탐색해 보세요.',
    'section.env.playful': '환경 영향',
    'section.env.adult': '발달 조절 변수',
    'section.env.intro.playful': '유전자가 운명은 아닙니다. 양육 측면도 함께 조정해 보세요.',
    'section.env.intro.adult': '발달 조절 변수를 조정하여 후속 예측에 반영합니다.',
    'section.budget.heading': '강화 할당',
    'section.budget.intro': '최적화 범주 사이에 크레딧을 배분하세요. 할당은 예측 결과에 편향을 줍니다. 패키지별 트레이드오프가 함께 표시됩니다.',
    'section.sliders.playful': '아기 특성 슬라이더',
    'section.sliders.adult': '예측 결과',
    'section.sliders.intro.playful': '범위는 양친에서 영감을 받았습니다. 슬라이더를 움직여 가능성을 탐색해 보세요. 성격 슬라이더는 빅 파이브(OCEAN) 모델에서 영감을 얻었으며, 실제 심리학적 예측이 아닙니다.',
    'section.sliders.intro.adult': '범위는 중간 친 값 유전과 할당 편향에서 도출됩니다. 행동 투영은 표현형보다 신뢰도가 낮습니다.',
    'section.baby.playful': '아기 미리보기',
    'section.baby.reflection': '상상된 한 사람의 초상',
    'section.baby.adult': '행동 투영',
    'section.future.playful': '미래의 길',
    'section.future.reflection': '미래의 한 자락',
    'section.future.adult': '행동 추적 노트',
    'section.lineage.playful': '가족 계보',
    'section.lineage.reflection': '세대를 가로질러',
    'section.lineage.adult': '세대 캐스케이드',
    'section.lineage.intro.playful': '세 세대. 지금의 선택은 앞으로도 파문을 일으킵니다.',
    'section.lineage.intro.reflection': '간단히 말해, 세 개의 삶 ― 먼저 살았던 사람들, 여기서 상상된 사람, 그리고 뒤에 올 수도 있는 사람들.',
    'section.lineage.intro.adult': '3세대 캐스케이드. 수직축에 특성 유전 표시. 하류 예측은 추정치입니다.',
    'surprise.playful': '유전적 서프라이즈 지수',
    'surprise.adult': '결과 분산 지수',
    'btn.randomize_parents.playful': '🎲 부모 무작위',
    'btn.randomize_parents.reflection': '새로운 부모를 상상하기',
    'btn.randomize_parents.adult': '입력 무작위화',
    'btn.preserve.playful': '🌱 자연 변이 보존',
    'btn.preserve.reflection': '자연 변이를 존중하기',
    'btn.preserve.adult': '자연 변이로 리셋',
    'btn.diversify_defaults.playful': '🌍 전 세계 표현형 범위로 리셋',
    'btn.diversify_defaults.reflection': '기본 범위 밖으로 한 걸음',
    'btn.diversify_defaults.adult': '전 세계 표현형 범위로 리셋',
    'btn.generate.playful': '아기 가능성 생성',
    'btn.generate.reflection': '가능한 한 삶을 상상하기',
    'btn.generate.adult': '투영 생성',
    'btn.randomize.playful': '🎲 부모 범위 내 무작위',
    'btn.randomize.reflection': '다른 버전 시도',
    'btn.randomize.adult': '범위 내 재샘플링',
    'btn.reset.playful': '↺ 부모 평균으로 리셋',
    'btn.reset.reflection': '가운데로 돌아가기',
    'btn.reset.adult': '중간 친 값으로 리셋',
    'btn.copy.playful': '⧉ 아기 프로필 복사',
    'btn.copy.reflection': '이 초상 복사',
    'btn.copy.adult': '투영 내보내기',
    'btn.save.playful': '💾 타임라인 저장',
    'btn.save.reflection': '이 삶을 간직하기',
    'btn.save.adult': '투영 저장',
    'btn.futures.playful': '🪐 가능한 성인기 보기',
    'btn.futures.reflection': '훗날의 세월 들여다보기',
    'btn.futures.adult': '궤적 세트 생성',
    'btn.alternates.playful': '🌌 대체 타임라인 생성',
    'btn.alternates.reflection': '같은 출발에서 다른 삶을 상상하기',
    'btn.alternates.adult': '대체 투영 생성',
    'language.label': '언어'
  },

  tr: {
    'intro.skip': 'Tanıtımı atla →',
    'intro.hero.title': 'Bazı gelecekler miras kalır.<br><em>Diğerleri seçilir.</em>',
    'intro.hero.sub': 'Gerçek araştırmalara dayanan, spekülatif bir simülasyon.',
    'intro.scroll': 'Devam etmek için kaydır',
    'intro.history.eyebrow': '01 · Tarihsel kayıt',
    'intro.history.title': 'Kabul gören ilk düzenlemeler.',
    'intro.history.lede': 'İnsan kalıtımını değiştirmek artık varsayım değil. Bunun zaman çizelgesi, çoğu kişinin hatırladığından çok daha kısa.',
    'intro.history.1978': 'İlk başarılı tüp bebek doğumu (Birleşik Krallık, Louise Brown).',
    'intro.history.1990': 'X bağlantılı hastalıkları önlemek amacıyla, implantasyon öncesi genetik tanının ilk klinik kullanımı.',
    'intro.history.2012': 'CRISPR-Cas9, programlanabilir bir genom düzenleyici olarak gösterildi.',
    'intro.history.2018': 'Çin\'de CRISPR ile düzenlenmiş embriyolardan ikiz kız bebekler doğdu; bilim camiası tarafından geniş çapta kınandı.',
    'intro.history.2019': 'Çalışmayı yürüten He Jiankui, Çin\'de üç yıl hapis cezasına çarptırıldı.',
    'intro.history.2020': 'Emmanuelle Charpentier ve Jennifer Doudna, CRISPR çalışmaları nedeniyle Nobel Kimya Ödülü’nü kazandı.',
    'intro.history.2023': 'Birleşik Krallık, orak hücreli anemiye yönelik CRISPR tabanlı ilk terapiyi (Casgevy / exa-cel) onayladı.',
    'intro.source': 'Kaynak',
    'intro.culture.eyebrow': '02 · Kültürel taban çizgisi',
    'intro.culture.title': 'Optimizasyon artık sıradan.',
    'intro.culture.lede': 'Gen düzenlemesi yeni sınırdır. Estetik "düzenleme" ise on yıllardır anaakım. Toplumsal mantık olduğu gibi taşınıyor.',
    'intro.culture.stat1': 'Dünya genelinde her yıl yapılan estetik işlem sayısı.',
    'intro.culture.stat2': 'Dermatologların 2018’de türettiği bir terim: filtreli özçekimlerine benzemek için ameliyat isteyen hastaları tanımlar.',
    'intro.culture.stat3': 'Yetişkinlerde beden algı bozukluğunun (BDD) tahmini yaygınlığı.',
    'intro.culture.stat4': 'Yasa, antlaşma veya politika yoluyla kalıtsal insan genom düzenlemesini sınırlandırıyor.',
    'intro.culture.stat4_value': '75’in üzerinde ülke',
    'intro.questions.eyebrow': '03 · Hâlâ açık sorular',
    'intro.questions.q1': '"İyileştirme" sayılacak şeye kim karar verir?',
    'intro.questions.q2': '"Geliştirilmemiş" çocuklar ayrımcılığa uğrar mı?',
    'intro.questions.q3': 'Kişilik düzenlenmeli mi?',
    'intro.questions.q4': 'Güzellik ölçülebilir hâle geldiğinde ne olur?',
    'intro.questions.q5': 'Optimizasyon kültürü içinde çeşitlilik ayakta kalabilir mi?',
    'intro.enter.eyebrow': '04 · Bu simülasyon',
    'intro.enter.title': 'Laboratuvara gir.',
    'intro.enter.lede': 'Buradan sonrası kurgusal bir tüketici ürünü maketi. Mekanikler spekülatif; baskılar gerçek.',
    'intro.notice.system_tag': '[ SİSTEM UYARISI ]',
    'intro.notice.system': 'Davranışsal projeksiyonlar düşük güvenilirlikte olmaya devam ediyor.',
    'intro.notice.ethics_tag': '[ ETİK UYARISI ]',
    'intro.notice.ethics': 'Optimizasyon hedefleri kültürlere ve çağlara göre değişir.',
    'intro.notice.regulatory_tag': '[ DÜZENLEYİCİ UYARI ]',
    'intro.notice.regulatory': 'Kalıtsal genom düzenlemesi pek çok bölgede hâlâ kısıtlı.',
    'intro.enter.btn': 'BabyBlend Lab’a gir',
    'intro.enter.disclaimer': 'Eğitim amaçlı spekülatif bir simülasyondur. Tıbbi tavsiye değildir.',
    'badge.beta': 'Beta',
    'badge.adjacent': 'İlgili',
    'badge.consent_heritable': 'Onay etkilendi: kalıtsal',
    'budget.compliance': 'Uyum atıfı: Oviedo Sözleşmesi Madde 13 (kalıtsal germ hattı kısıtlaması); tıbbi etikte zarar vermeme (non-maleficence) ilkesi.',
    'budget.ethics.reversibility': 'Geri alınabilirlik: <strong>Hayır</strong>',
    'budget.ethics.subject_absent': 'Özne yok: <strong>Evet</strong>',
    'budget.proj.cohort': 'Öngörülen Kohort Konumu',
    'budget.proj.cohort.baseline': 'Müdahale yok · temel kohort',
    'budget.proj.cost': 'Tahmini Maliyet',
    'budget.proj.cost.baseline': '— (temel kohort)',
    'budget.proj.access': 'Öngörülen Erişim Katmanı',
    'budget.proj.access.baseline': 'Evrensel · temel',
    'budget.burden.disclaimer': 'Tüm tahsisler gelecek öznenin seçimini eşit ölçüde elinden alır; ağırlık, bu kaybın ne kadar geniş yayıldığını ölçer, kaybın yaşanıp yaşanmayacağını değil.',
    'budget.proj.burden': 'Kimlik Sabitlenme Endeksi',
    'budget.proj.burden.minimal': 'Asgari',
    'consent.heading': 'Onay açısından sonuçlar',
    'consent.subtle': 'Yukarıdaki her tahsisin öznesi, bu kararlara rıza gösteremez. Aşağıdaki notlar, bunun ne anlama geldiğini kurumsal terimlerle ifade eder.',
    'surprise.note': 'Bebeğin, anne-babanın basit ortalamasından ne kadar sapma olasılığı taşıdığı.',
    'kids.stars.creativity': 'Yaratıcılık',
    'kids.stars.teamwork': 'Takım çalışması',
    'scrubber.label': 'Onu şu yaşta gör:',
    'details.show_more': 'Daha fazla göster',
    'news.heading': 'On yıllar sonra, yerel haberlerde…',
    'pause.heading': 'Bir an durup düşünelim',
    'pause.cant_see': 'Bu simülatörün göremediği şeyler',
    'futures.title.playful': 'Olası Yetişkin Gelecekler',
    'futures.title.adult': 'Öngörülen Yetişkin Yörüngeleri',
    'futures.subtle.playful': 'Bu çocuğun yaşayabileceği farklı hayatlar. Aynı çocuk, birçok yol — hayat bilinçli olarak öngörülemez.',
    'futures.subtle.adult': 'Farklı çevresel koşullar altında, yetişkin hayatına dair spekülatif yörüngeler. Sonuçlar örnek niteliğindedir; öngörü değildir.',
    'alts.title.playful': 'Alternatif Zaman Çizgileri',
    'alts.title.adult': 'Alternatif Projeksiyonlar',
    'alts.subtle.playful': 'Aynı iki ebeveynin sahip olabileceği farklı bebekler. Herhangi bir karttaki <em>Make this the main baby</em> (bunu ana bebek yap) düğmesine tıklayarak yükleyebilirsin.',
    'alts.subtle.adult': 'Aynı ebeveyn girdilerinden alınan kardeş-dağılımı örneklemesi. Herhangi bir projeksiyonu yüklemek için <em>Promote to main</em> (ana projeksiyona yükselt) seçeneğini kullan.',
    'history.toggle.playful': '📜 İnsan İyileştirmenin Tarihi',
    'history.toggle.adult': 'Düzenleyici ve Tarihsel Bağlam',
    'ethics.title.playful': 'Nazik bir hatırlatma',
    'ethics.title.adult': 'Bilgilendirme',
    'ethics.body.playful': 'Bu simülatör kurgusaldır. Gerçek özellikler birçok gen, çevre, şans, kültür, sağlık ve yaşam deneyimi tarafından şekillendirilir. Bebekler özelleştirilebilir ürünler değildir.',
    'ethics.body.adult': 'Açıklayıcı amaçlı kurgusal bir simülasyon. Mevcut etik düzenlemeler ülkeden ülkeye değişiklik gösterir. Davranışsal çıktıları güvenilir biçimde modellemek hâlâ zordur.',
    'footer.tagline': 'BabyBlend Lab · Spekülatif bir simülasyon · Hiçbir veri cihazınızdan ayrılmaz',
    'footer.about': 'Hakkında ve kaynaklar',
    'style.lorelei': 'Lorelei stili',
    'style.bigSmile': 'Big Smile stili',
    'codename.placeholder': 'Küçük Prototip A-01',
    'archetype.placeholder': 'Küçük Prototip',
    'life_stage.heading': 'Yıllar boyunca',
    'intro.history.cite.1978': 'Steptoe ve Edwards, <em>The Lancet</em>, 1978.',
    'intro.history.cite.1990': 'Handyside ve diğ., <em>Nature</em>, 1990.',
    'intro.history.cite.2012': 'Jinek, Chylinski, Fonfara, Hauer, Doudna ve Charpentier, <em>Science</em>, 2012.',
    'intro.history.cite.2018': 'Cyranoski ve Ledford, <em>Nature</em> haber, Kasım 2018.',
    'intro.history.cite.2019': 'Xinhua / Reuters, Aralık 2019.',
    'intro.history.cite.2020': 'İsveç Kraliyet Bilimler Akademisi, 2020.',
    'intro.history.cite.2023': 'Birleşik Krallık İlaç ve Sağlık Ürünleri Düzenleme Kurumu (MHRA), Kasım 2023.',
    'intro.culture.cite1': 'Uluslararası Estetik Plastik Cerrahi Derneği (ISAPS), Küresel Araştırma, 2022.',
    'intro.culture.cite2': 'Rajanala, Maymone ve Vashi, <em>JAMA Facial Plastic Surgery</em>, 2018.',
    'intro.culture.cite3': 'Veale ve diğ., sistematik derleme, <em>Body Image</em>, 2016.',
    'intro.culture.cite4': 'Baylis, Darnovsky, Hasson ve Krahn, <em>The CRISPR Journal</em>, 2020.',
    'app.tagline': 'Genetikten esinlenmiş kurgusal bir simülatör',
    'app.disclaimer': 'Eğitim amaçlı spekülasyon. Tıbbi, genetik veya klinik tavsiye değildir.',
    'mode.reflection': 'Düşünüm',
    'mode.kids': 'Çocuk',
    'mode.adult': 'Yetişkin',
    'landing.desc1': 'İki ebeveyn oluştur. Çevrelerini ayarla.',
    'landing.desc2': 'Olası bir çocuğun nasıl görünebileceğini, ne düşünebileceğini ve kim olabileceğini gör.',
    'landing.feature1': 'Çok genli karakter kalıtımı',
    'landing.feature2': 'Beş Büyük davranış izdüşümü',
    'landing.feature3': 'Spekülatif yetişkin yörüngeleri',
    'landing.begin': 'Laboratuvara gir',
    'landing.disclaimer': 'Kurgusal bir simülasyondur. Gerçek tıbbi ya da genetik tavsiye değildir.',
    'section.parents': 'Ebeveyn Profilleri',
    'section.parents.defaults_note': 'Burada görünen varsayılanlar tek bir soy çizgisinin başlangıç görünümünü temsil eder. Başka olasılıkları keşfetmek için ebeveyn kartındaki Soy seçeneğini, yeniden çekmek için ↻ düğmesini, 🎲 Ebeveynleri Rastgele Yap veya 🌍 Küresel fenotip aralığına sıfırla seçeneklerini kullanabilirsin.',
    'section.env.playful': 'Çevresel Etkiler',
    'section.env.adult': 'Gelişimsel Düzenleyiciler',
    'section.env.intro.playful': 'Genler kader değildir. Yetiştirme tarafını da ayarlayabilirsin.',
    'section.env.intro.adult': 'Gelişimsel düzenleyicileri ayarlayarak alt akış projeksiyonlarını besleyin.',
    'section.budget.heading': 'Geliştirme Tahsisi',
    'section.budget.intro': 'Optimizasyon kategorileri arasında kredileri dağıt. Tahsisler beklenen sonuçları etkiler; ödünleşimler her paket altında listelenir.',
    'section.sliders.playful': 'Bebek Karakter Sürgüleri',
    'section.sliders.adult': 'Beklenen Sonuçlar',
    'section.sliders.intro.playful': 'Aralıklar her iki ebeveyne dayanır. Olasılıkları keşfetmek için sürgüleri kaydır. Kişilik sürgüleri Beş Büyük (OCEAN) modelinden esinlenmiştir — bilimsel öngörü değildir.',
    'section.sliders.intro.adult': 'Aralıklar ebeveyn ortalaması mirasından ve tahsis sapmasından türetilir. Davranışsal projeksiyonların güveni fenotipikten daha düşüktür.',
    'section.baby.playful': 'Bebek Önizleme',
    'section.baby.reflection': 'Hayal edilmiş bir portre',
    'section.baby.adult': 'Davranış Projeksiyonu',
    'section.future.playful': 'Gelecek yolları',
    'section.future.reflection': 'Geleceğin bir parçası',
    'section.future.adult': 'Davranış İzlem Notları',
    'section.lineage.playful': 'Aile soyu',
    'section.lineage.reflection': 'Kuşakların ötesinde',
    'section.lineage.adult': 'Kuşaklar Arası Yayılım',
    'section.lineage.intro.playful': 'Üç kuşak. Burada verilen seçimler ileri doğru dalgalanır.',
    'section.lineage.intro.reflection': 'Kısaca üç yaşam: önce gelenler, burada hayal edilen kişi ve sonra gelebilecek olanlar.',
    'section.lineage.intro.adult': 'Üç kuşak yayılımı. Dikey eksende karakter kalıtımı. Alt akış projeksiyonları spekülatiftir.',
    'surprise.playful': 'Genetik sürpriz katsayısı',
    'surprise.adult': 'Sonuç varyans indeksi',
    'btn.randomize_parents.playful': '🎲 Ebeveynleri Rastgele Yap',
    'btn.randomize_parents.reflection': 'Yeni ebeveynler hayal et',
    'btn.randomize_parents.adult': 'Girdileri Rastgele Yap',
    'btn.preserve.playful': '🌱 Doğal Çeşitliliği Koru',
    'btn.preserve.reflection': 'Doğal çeşitliliğe saygı göster',
    'btn.preserve.adult': 'Doğal Varyasyona Sıfırla',
    'btn.diversify_defaults.playful': '🌍 Küresel fenotip aralığına sıfırla',
    'btn.diversify_defaults.reflection': 'Varsayılan aralığın dışına bir adım',
    'btn.diversify_defaults.adult': 'Küresel fenotip aralığına sıfırla',
    'btn.generate.playful': 'Bebek Olasılıklarını Üret',
    'btn.generate.reflection': 'Olası bir yaşam hayal et',
    'btn.generate.adult': 'Projeksiyon Üret',
    'btn.randomize.playful': '🎲 Ebeveyn Aralığı İçinde Rastgele',
    'btn.randomize.reflection': 'Farklı bir sürüm dene',
    'btn.randomize.adult': 'Aralık İçinde Yeniden Örnekle',
    'btn.reset.playful': '↺ Ebeveyn Ortalamasına Dön',
    'btn.reset.reflection': 'Ortaya geri dön',
    'btn.reset.adult': 'Ebeveyn Ortalamasına Sıfırla',
    'btn.copy.playful': '⧉ Bebek Profilini Kopyala',
    'btn.copy.reflection': 'Bu portreyi kopyala',
    'btn.copy.adult': 'Projeksiyonu Dışa Aktar',
    'btn.save.playful': '💾 Zaman Çizgisini Kaydet',
    'btn.save.reflection': 'Bu yaşamı sakla',
    'btn.save.adult': 'Projeksiyonu Kaydet',
    'btn.futures.playful': '🪐 Olası Yetişkin Gelecekleri',
    'btn.futures.reflection': 'İleriki yıllara bir bakış',
    'btn.futures.adult': 'Yörünge Seti Üret',
    'btn.alternates.playful': '🌌 Alternatif Zaman Çizgileri Üret',
    'btn.alternates.reflection': 'Aynı başlangıçtan başka yaşamlar hayal et',
    'btn.alternates.adult': 'Alternatif Projeksiyonlar Üret',
    'language.label': 'Dil'
  }
};

const LANG_KEY = 'babyblend.language.v1';

function loadLanguage() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return LANGUAGES.includes(v) ? v : 'en';
  } catch { return 'en'; }
}
function persistLanguage(l) {
  try { localStorage.setItem(LANG_KEY, l); } catch {}
}

function t(key) {
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  const bundle = STRINGS[lang] || STRINGS.en;
  return bundle[key] || STRINGS.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  // data-i18n-html allows translations with inline HTML (e.g. <br>, <em>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
}

// Returns the active-language slice of a translated content pool. Each
// pool below is either a plain array (English-only) or an object with
// per-language arrays of identical length — equal lengths matter so that
// seeded picks stay stable across language switches.
function localList(pool) {
  if (!pool) return [];
  if (Array.isArray(pool)) return pool;
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  return pool[lang] || pool.en || [];
}

/* ---------- Trait ladders & color maps ---------- */

const EYE_LADDER  = ['blue', 'green', 'hazel', 'brown', 'dark brown'];
const HAIR_LADDER = ['platinum', 'blonde', 'strawberry', 'light brown', 'auburn', 'brown', 'dark brown', 'black', 'jet black', 'red', 'gray'];
const TEX_LADDER  = ['straight', 'wavy', 'curly', 'coily'];
const SKIN_LADDER = ['porcelain', 'very fair', 'fair', 'light tan', 'medium', 'olive', 'tan', 'brown', 'deep brown', 'dark brown'];
const FACE_LADDER = ['round', 'oval', 'heart', 'square', 'long'];
const FRECK_LADDER = ['none', 'light', 'lots'];
const DIMPLE_LADDER = ['no', 'yes'];

const HAIR_HEX = {
  'platinum':    '#e8dcc0',
  'blonde':      '#d8b96b',
  'strawberry':  '#c98a5a',
  'light brown': '#8e6238',
  'auburn':      '#7a3a1f',
  'brown':       '#5a3825',
  'dark brown':  '#3a2210',
  'black':       '#1a120a',
  'jet black':   '#0a0604',
  'red':         '#a44222',
  'gray':        '#a8a39b'
};
const SKIN_HEX = {
  'porcelain':   '#fdeede',
  'very fair':   '#fde7d4',
  'fair':        '#f3d2ad',
  'light tan':   '#e6bc94',
  'medium':      '#dbac82',
  'olive':       '#c89972',
  'tan':         '#b3835a',
  'brown':       '#9a6a44',
  'deep brown':  '#74502f',
  'dark brown':  '#5d3a22'
};
const EYE_HEX = {
  'blue':       '#3870b8',
  'green':      '#2e7a52',
  'hazel':      '#a07043',
  'brown':      '#4f2a14',
  'dark brown': '#2a1606'
};

/* ---------- DiceBear trait mappings ---------- */

// Group each style's hair variants into our 4 textures.
const HAIR_BUCKETS = {
  lorelei: {
    straight: ['variant01','variant02','variant03','variant04','variant05','variant06','variant07','variant08','variant09','variant10','variant11','variant12'],
    wavy:     ['variant13','variant14','variant15','variant16','variant17','variant18','variant19','variant20','variant21','variant22','variant23','variant24'],
    curly:    ['variant25','variant26','variant27','variant28','variant29','variant30','variant31','variant32','variant33','variant34','variant35','variant36'],
    coily:    ['variant37','variant38','variant39','variant40','variant41','variant42','variant43','variant44','variant45','variant46','variant47','variant48']
  },
  bigSmile: {
    straight: ['shortHair','straightHair','bowlCutHair','halfShavedHead','shavedHead'],
    wavy:     ['wavyBob','bangs'],
    curly:    ['curlyBob','curlyShortHair'],
    coily:    ['froBun','braids','bunHair','mohawk']
  }
};

// Lorelei has 4 head shapes — our 5 face shapes map approximately.
const LORELEI_HEAD = {
  'round':  'variant01',
  'oval':   'variant02',
  'heart':  'variant03',
  'square': 'variant04',
  'long':   'variant02'
};

// Social slider (1–10) → mouth expression.
const LORELEI_MOUTH = [
  'happy09', 'sad01', 'sad05', 'happy01', 'happy04',
  'happy07', 'happy10', 'happy12', 'happy14', 'happy16', 'happy18'
];
const BIGSMILE_MOUTH = [
  'gapSmile', 'openSad', 'unimpressed', 'awkwardSmile', 'awkwardSmile',
  'gapSmile', 'kawaii', 'openedSmile', 'openedSmile', 'teethSmile', 'teethSmile'
];

// Big Smile has no eyesColor — vary eye expression by eye-color slider instead.
const BIGSMILE_EYES = ['normal','cheery','winking','starstruck','sleepy'];

// Lorelei hair: variants curated by length within each texture bucket.
// Female lists exclude any variant that renders bald/buzz/cropped — the
// bounding-box heuristic that originally produced these lists treated some
// hairline-only sprites as "long" and put them on the female list, so the
// lists below are hand-checked against the DiceBear preview PNGs instead.
const LORELEI_HAIR_BY_GENDER = {
  female: {
    straight: ['variant05','variant06','variant10','variant11','variant12'],
    wavy:     ['variant13','variant14','variant15','variant16','variant17','variant18','variant19','variant21','variant23','variant24'],
    curly:    ['variant29','variant30','variant31','variant32','variant33','variant35'],
    coily:    ['variant37','variant38','variant40','variant41','variant42','variant45','variant48']
  },
  male: {
    straight: ['variant04','variant02','variant12','variant06','variant08'],
    wavy:     ['variant24','variant20','variant21','variant19','variant14'],
    curly:    ['variant27','variant34','variant26','variant33','variant36'],
    coily:    ['variant39','variant43','variant46','variant38','variant41']
  }
};

// Big Smile hair subsets by gender (within each texture bucket).
const BIGSMILE_HAIR_BY_GENDER = {
  female: {
    straight: ['straightHair'],
    wavy:     ['wavyBob'],
    curly:    ['curlyBob'],
    coily:    ['braids','bunHair','froBun']
  },
  male: {
    straight: ['shortHair','bowlCutHair','shavedHead','halfShavedHead'],
    wavy:     ['bangs'],
    curly:    ['curlyShortHair'],
    coily:    ['mohawk']
  }
};

const GENDER_LABEL = { female: 'Female', male: 'Male', surprise: 'Surprise' };

/* ---------- Ladder + gender translations ----------
 * Localized labels for the visible trait values (eye/hair/skin/face/
 * freckles/dimples) and for the gender display. Each language array
 * must match the English ladder length 1:1 because the same index
 * stored in state.baby maps to the localized string at that index. */
const LADDER_I18N = {
  EYE: {
    zh: ['蓝色', '绿色', '榛色', '棕色', '深棕色'],
    ja: ['ブルー', 'グリーン', 'ヘーゼル', 'ブラウン', 'ダークブラウン'],
    ko: ['파란색', '초록색', '헤이즐', '갈색', '진갈색'],
    tr: ['Mavi', 'Yeşil', 'Ela', 'Kahverengi', 'Koyu Kahverengi']
  },
  HAIR: {
    zh: ['白金色', '金色', '草莓金', '浅棕色', '红褐色', '棕色', '深棕色', '黑色', '乌黑色', '红色', '灰色'],
    ja: ['プラチナ', 'ブロンド', 'ストロベリー', 'ライトブラウン', 'オーバーン', 'ブラウン', 'ダークブラウン', 'ブラック', '漆黒', 'レッド', 'グレー'],
    ko: ['플래티넘', '금발', '딸기금발', '연갈색', '적갈색', '갈색', '진갈색', '검정', '칠흑', '빨강', '회색'],
    tr: ['Platin', 'Sarı', 'Çilek Sarısı', 'Açık Kahverengi', 'Kızıl-Kahve', 'Kahverengi', 'Koyu Kahverengi', 'Siyah', 'Karasiyah', 'Kızıl', 'Gri']
  },
  TEX: {
    zh: ['直发', '波浪卷', '卷发', '紧致卷'],
    ja: ['ストレート', 'ウェーブ', 'カール', 'コイリー'],
    ko: ['직모', '웨이브', '곱슬', '꼬불꼬불'],
    tr: ['Düz', 'Dalgalı', 'Kıvırcık', 'Sıkı Kıvırcık']
  },
  SKIN: {
    zh: ['瓷白', '极浅', '浅色', '浅麦色', '中等', '橄榄色', '小麦色', '棕色', '深棕色', '深褐色'],
    ja: ['ポーセリン', '非常に明るい', '明るめ', 'ライトタン', 'ミディアム', 'オリーブ', 'タン', 'ブラウン', 'ディープブラウン', 'ダークブラウン'],
    ko: ['포셀린', '매우 밝은', '밝은', '연한 갈색조', '중간', '올리브', '갈색조', '갈색', '진갈색', '아주 진한 갈색'],
    tr: ['Porselen', 'Çok Açık', 'Açık', 'Açık Buğday', 'Orta', 'Zeytin', 'Bronz', 'Kahverengi', 'Koyu Kahverengi', 'Çok Koyu']
  },
  FACE: {
    zh: ['圆形', '椭圆形', '心形', '方形', '长形'],
    ja: ['丸顔', '卵型', 'ハート型', '四角形', '面長'],
    ko: ['둥근형', '계란형', '하트형', '사각형', '긴형'],
    tr: ['Yuvarlak', 'Oval', 'Kalp', 'Kare', 'Uzun']
  },
  FRECK: {
    zh: ['无', '少量', '很多'],
    ja: ['なし', '少なめ', '多め'],
    ko: ['없음', '적음', '많음'],
    tr: ['Yok', 'Az', 'Çok']
  },
  DIMPLE: {
    zh: ['无', '有'],
    ja: ['なし', 'あり'],
    ko: ['없음', '있음'],
    tr: ['Yok', 'Var']
  }
};
const LADDER_REF = {
  EYE: EYE_LADDER, HAIR: HAIR_LADDER, TEX: TEX_LADDER,
  SKIN: SKIN_LADDER, FACE: FACE_LADDER, FRECK: FRECK_LADDER, DIMPLE: DIMPLE_LADDER
};
// Returns the localized label for ladder `name` at index `idx`. Falls
// back to the English ladder when the language slice is missing.
function localLadder(name, idx) {
  const enArr = LADDER_REF[name] || [];
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  if (lang === 'en') return titleCase(enArr[idx] || '');
  const trArr = LADDER_I18N[name] && LADDER_I18N[name][lang];
  if (!trArr) return titleCase(enArr[idx] || '');
  return trArr[idx] || titleCase(enArr[idx] || '');
}
function localGender(g) {
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  const map = {
    en: { female: 'Female', male: 'Male', surprise: 'Surprise' },
    zh: { female: '女', male: '男', surprise: '随机' },
    ja: { female: '女の子', male: '男の子', surprise: 'おまかせ' },
    ko: { female: '여아', male: '남아', surprise: '랜덤' },
    tr: { female: 'Kız', male: 'Erkek', surprise: 'Sürpriz' }
  };
  return (map[lang] && map[lang][g]) || map.en[g] || g;
}

/* ---------- Label translations ----------
 * Lookup-by-English-string for the profile/stat/slider/parent/env
 * labels that updateBabyPreview, renderStandardSlider, buildParentForms
 * and buildEnvPanel emit. Co-located with LADDER_I18N so it sits in a
 * section that's safe from concurrent edits. */
const LABEL_I18N = {
  // Misc tooltip
  'How does this work?': { zh: '这是怎么计算的?', ja: 'これはどう計算されているの?', ko: '이건 어떻게 작동하나요?', tr: 'Bu nasıl çalışıyor?' },
  // SVG ARIA labels
  'Avatar failed to load': { zh: '头像加载失败', ja: 'アバターの読み込みに失敗しました', ko: '아바타를 불러오지 못했습니다', tr: 'Avatar yüklenemedi' },
  'Predicted hobbies': { zh: '预测的爱好', ja: '予測される趣味', ko: '예측된 취미', tr: 'Öngörülen hobiler' },
  'Three-generation lineage': { zh: '三代血脉', ja: '三世代の系譜', ko: '삼대 가계도', tr: 'Üç kuşaklık soy ağacı' },
  'Branching future paths': { zh: '分支的未来路径', ja: '分岐する未来の道筋', ko: '분기하는 미래의 길', tr: 'Dallanan gelecek yolları' },
  'Personality trait constellation': { zh: '性格特征星座图', ja: '性格特性のコンステレーション', ko: '성격 특성 별자리', tr: 'Kişilik özellikleri takımyıldızı' },
  // Parent panel ARIA labels
  'Randomize Parent A': { zh: '随机化 父母 A', ja: '親 A をランダム化', ko: '부모 A 무작위화', tr: 'Ebeveyn A’yı rastgele yap' },
  'Randomize Parent B': { zh: '随机化 父母 B', ja: '親 B をランダム化', ko: '부모 B 무작위화', tr: 'Ebeveyn B’yi rastgele yap' },
  // Adult case-file labels
  'Simulation Codename': { zh: '模拟代号', ja: 'シミュレーション・コードネーム', ko: '시뮬레이션 코드네임', tr: 'Simülasyon Kod Adı' },
  'Cohort': { zh: '群组', ja: 'コホート', ko: '코호트', tr: 'Kohort' },
  'Profile': { zh: '档案', ja: 'プロファイル', ko: '프로파일', tr: 'Profil' },
  'Generated': { zh: '生成时间', ja: '生成日時', ko: '생성 시각', tr: 'Oluşturuldu' },
  'Optimization Intensity': { zh: '优化强度', ja: '最適化の強度', ko: '최적화 강도', tr: 'Optimizasyon Yoğunluğu' },
  'Disclosure': { zh: '披露', ja: '開示区分', ko: '공시', tr: 'Açıklama' },
  'I understand this is a heritable decision.': { zh: '我明白这是一个可遗传的决定。', ja: 'これは遺伝に関わる決定であることを、私は理解しています。', ko: '이것이 유전 가능한 결정임을 이해합니다.', tr: 'Bunun kalıtsal bir karar olduğunu anlıyorum.' },
  'Acknowledge & continue': { zh: '已知悉,继续', ja: '了承して進む', ko: '이해하고 계속하기', tr: 'Onayla ve devam et' },
  // Adult panel mini-strings
  'Outcome trajectory no longer matches the modeled projection. Reprojection recommended.': { zh: '实际轨迹已不再与所建模的投影一致。建议重新投影。', ja: 'アウトカムの軌跡は、モデル化された投影に一致しなくなっている。再投影を推奨する。', ko: '실제 궤적이 모델링된 투영과 더 이상 일치하지 않습니다. 재투영을 권장합니다.', tr: 'Sonuç yörüngesi artık modellenen projeksiyonla örtüşmüyor. Yeniden projeksiyon önerilir.' },
  'Issued for indicative purposes. Authorizations and waiting-list intervals are revised quarterly; current values supersede prior disclosures.': { zh: '仅为指示性参考。授权与等候期每季度修订;现行数值替代此前披露。', ja: '本表示は参考目的に限る。認可および待機期間は四半期ごとに見直されており、現在の値が従前の開示に優先する。', ko: '본 정보는 참고용이다. 인가와 대기 기간은 분기마다 갱신되며, 현재 값이 이전 공시에 우선한다.', tr: 'Bilgi amaçlıdır. Yetkilendirmeler ve bekleme süreleri üç ayda bir güncellenir; mevcut değerler önceki açıklamaların yerini alır.' },
  'Consent context expands at 50 credits.': { zh: '当积分达到 50 时,同意上下文会展开。', ja: '50クレジットに達すると、同意に関する文脈が展開される。', ko: '50 크레딧에 이르면 동의 관련 맥락이 펼쳐진다.', tr: '50 krediye ulaşıldığında onay bağlamı genişler.' },
  'No disclosure thresholds crossed yet.': { zh: '尚未跨越任何披露阈值。', ja: '開示の閾値はまだいずれも越えていない。', ko: '아직 어떤 공시 임계값도 넘지 않았습니다.', tr: 'Henüz hiçbir açıklama eşiği aşılmadı.' },
  // Adult panel headings
  'Societal Outcomes Brief': { zh: '社会反应概述', ja: '社会的アウトカム ブリーフ', ko: '사회적 결과 개요', tr: 'Toplumsal Sonuçlar Özeti' },
  'Modeled societal response to this projection. Each line fires from a specific allocation, trait, or environment combination — not a generic readout. These outcomes are modeled within the simulation using speculative social-psychological frameworks, not empirical findings.': { zh: '对本投影的社会反应建模。每一条都由特定的分配、性状或环境组合触发,而非通用文本。这些结果是在模拟器内,用思辨性的社会—心理框架建模出来的,并非实证研究结论。', ja: 'この投影に対する社会的反応のモデル。各行は、特定の割り当て・特性・環境の組み合わせから発火しており、定型の読み上げではない。これらの結果は、本シミュレーション内で思考実験的な社会心理学フレームを用いて構築されたものであり、実証研究の知見ではない。', ko: '이 투영에 대한 사회적 반응의 모형. 각 줄은 일반적인 출력값이 아니라 특정 할당·특성·환경의 조합에 의해 점화된다. 이 결과들은 시뮬레이션 내부에서 사변적 사회심리학 틀로 만들어진 것이며, 실증적 발견이 아니다.', tr: 'Bu projeksiyona yönelik modellenen toplumsal yanıt. Her satır belirli bir tahsis, özellik veya çevre kombinasyonundan tetiklenir; genel bir okumadan değil. Bu çıktılar simülasyon içinde sosyo-psikolojik kurgusal çerçevelerle modellenmiştir; ampirik bulgular değildir.' },
  'Sibling Cohort · Variance Distribution': { zh: '兄弟姐妹同期组 · 方差分布', ja: 'きょうだいコホート · 分散分布', ko: '형제자매 코호트 · 분산 분포', tr: 'Kardeş Kohortu · Varyans Dağılımı' },
  'Five plausible outcomes from identical parental inputs and allocation. The variance shows the uncertainty range of inheritance estimates — not behavioral probability.': { zh: '在完全相同的父母输入与分配下,五种合理的可能结果。方差展示的是遗传估计的不确定性范围,而非行为发生的概率。', ja: 'まったく同じ親の入力と割り当てから生まれうる五通りのアウトカム。ばらつきは、遺伝推定の不確実性レンジを示すものであり、行動が起こる確率ではない。', ko: '동일한 부모 입력과 동일한 할당에서 가능한 다섯 가지 결과. 분산은 유전 추정의 불확실성 범위를 보여줄 뿐, 행동이 일어날 확률을 의미하지 않는다.', tr: 'Aynı ebeveyn girdileri ve tahsisten ortaya çıkabilecek beş olası sonuç. Varyans, kalıtım tahminlerinin belirsizlik aralığını gösterir; davranış olasılığını değil.' },
  // Kids-arc panel headings & sublines
  'Things they might love': { zh: '他们也许会喜爱的东西', ja: 'その子が好きになるかもしれないもの', ko: '그 아이가 좋아할 만한 것들', tr: 'Sevebilecekleri şeyler' },
  'Specific, particular, and theirs.': { zh: '具体、特别,而且只属于他们。', ja: '具体的で、ささやかで、そしてその子だけのもの。', ko: '구체적이고, 특별하고, 오롯이 그들의 것.', tr: 'Özel, belirli ve sadece onlara ait.' },
  'Questions you could ask them': { zh: '你可以问他们的问题', ja: 'その子に聞いてみたい問い', ko: '그 아이에게 물어볼 수 있는 질문들', tr: 'Onlara sorabileceğin sorular' },
  'The kind you might not think to ask a grown-up.': { zh: '那种你不会去问大人的问题。', ja: '大人になら聞かないような問いたち。', ko: '어른에게는 굳이 물어보지 않을 법한 종류의 질문.', tr: 'Bir yetişkine sormayı düşünmeyeceğin türden.' },
  'What might make them them': { zh: '是什么让他们成为他们', ja: 'その子をその子たらしめるかもしれないこと', ko: '그 아이를 그 아이로 만드는 것들', tr: 'Onları onlar yapan şeyler' },
  'Trait tradeoffs': { zh: '性格的取舍', ja: '特性のトレードオフ', ko: '특성의 트레이드오프', tr: 'Özellik ödünleşmeleri' },
  // Misc UI status / footnote strings
  'Baseline projection required before optimization packages unlock.': { zh: '需要先生成基线投影,优化套餐才会解锁。', ja: '最適化パッケージは、ベースライン投影を生成してから利用できるようになる。', ko: '최적화 패키지는 기준 투영을 먼저 생성해야 잠금이 풀린다.', tr: 'İyileştirme paketleri açılmadan önce temel projeksiyonun oluşturulması gerekir.' },
  'Copied to clipboard ✓': { zh: '已复制到剪贴板 ✓', ja: 'クリップボードにコピーしました ✓', ko: '클립보드로 복사됨 ✓', tr: 'Panoya kopyalandı ✓' },
  'Couldn’t copy automatically — please copy from the alert.': { zh: '无法自动复制——请从弹窗中手动复制。', ja: '自動コピーに失敗しました——アラートからコピーしてください。', ko: '자동 복사에 실패했어요 — 알림창에서 직접 복사해 주세요.', tr: 'Otomatik kopyalanamadı — lütfen uyarıdan elle kopyalayın.' },
  'Saved ✓': { zh: '已保存 ✓', ja: '保存しました ✓', ko: '저장됨 ✓', tr: 'Kaydedildi ✓' },
  'Footnote: inheritance compounds via access — cohorts able to allocate carry advantages forward; cohorts that cannot do not catch up by genetics alone.': { zh: '脚注:不平等通过"可及性"在世代间累积——能够进行分配的群组,把优势带向后代;无法分配的群组,仅靠遗传无法追上。', ja: '脚注:不平等は「アクセス」を介して世代を超えて累積する——割り当てができる集団は優位を引き継ぎ、できない集団は遺伝だけでは追いつかない。', ko: '각주: 불평등은 "접근성"을 매개로 세대를 거치며 누적된다 — 할당이 가능한 집단은 이점을 다음 세대로 전하고, 그렇지 못한 집단은 유전만으로는 따라잡지 못한다.', tr: 'Dipnot: eşitsizlik erişim üzerinden kuşaklara yayılır — tahsis yapabilen kohortlar avantajları öne taşır; yapamayanlar yalnızca genetikle bu farkı kapatamaz.' },
  // Parent panel collapsibles
  'Temperament dials': { zh: '气质刻度', ja: '気質ダイヤル', ko: '기질 다이얼', tr: 'Mizaç kadranları' },
  'Visible traits':    { zh: '可见特征', ja: '見た目の特性', ko: '눈에 보이는 특성', tr: 'Görünür özellikler' },
  "Ethically: the child this affects isn't here yet — and they'll live with the choices you make.": {
    zh: '从伦理上说:这个被影响的孩子还不在这里——而他/她将和你做出的选择一起生活。',
    ja: '倫理的に言って——この影響を受ける子はまだここにいない。だがその子は、あなたの選んだ結果とともに生きていくことになる。',
    ko: '윤리적으로 말하면, 영향을 받게 될 그 아이는 아직 여기에 없다 — 그러나 당신이 내리는 선택의 결과 속에서 살아가게 된다.',
    tr: 'Etik açıdan: bu kararın etkilediği çocuk henüz burada değil — ama senin yaptığın seçimlerle birlikte yaşayacak.'
  },
  // Ancestry dropdown values
  'Unspecified':    { zh: '未指定',     ja: '指定なし',     ko: '지정 안 함',   tr: 'Belirtilmemiş' },
  'European':       { zh: '欧裔',       ja: 'ヨーロッパ系', ko: '유럽계',       tr: 'Avrupa kökenli' },
  'East Asian':     { zh: '东亚裔',     ja: '東アジア系',   ko: '동아시아계',   tr: 'Doğu Asya kökenli' },
  'South Asian':    { zh: '南亚裔',     ja: '南アジア系',   ko: '남아시아계',   tr: 'Güney Asya kökenli' },
  'African':        { zh: '非洲裔',     ja: 'アフリカ系',   ko: '아프리카계',   tr: 'Afrika kökenli' },
  'Latin American': { zh: '拉丁美洲裔', ja: 'ラテンアメリカ系', ko: '라틴 아메리카계', tr: 'Latin Amerika kökenli' },
  'Middle Eastern': { zh: '中东裔',     ja: '中東系',       ko: '중동계',       tr: 'Orta Doğu kökenli' },
  'Mixed':          { zh: '混合',       ja: 'ミックス',     ko: '혼합',         tr: 'Karışık' },
  'Trait Popularity · Historical Drift': { zh: '理想性状的流变 · 历史漂移', ja: '理想とされる特性の歴史的ドリフト', ko: '바람직한 특성의 역사적 표류', tr: 'İstenen Özellik · Tarihsel Kayma' },
  'Beta': { zh: '测试版', ja: 'ベータ', ko: '베타', tr: 'Beta' },
  "What gets called a 'desirable' trait drifts across eras. Optimization targets are not culturally stable.": { zh: '何为"理想性状",在不同时代不断漂移。优化目标在文化上并不稳定。', ja: '「望ましい特性」と呼ばれるものは、時代ごとに漂流する。最適化の目標は文化的に安定しない。', ko: "'바람직한 특성'이라 불리는 것은 시대를 따라 표류한다. 최적화 목표는 문화적으로 안정적이지 않다.", tr: "'İstenir' sayılan özellik çağdan çağa kayar. Optimizasyon hedefleri kültürel olarak istikrarlı değildir." },
  'Memory snapshots': { zh: '记忆快照', ja: '記憶のスナップショット', ko: '기억의 스냅숏', tr: 'Anı kareleri' },
  'At 7':  { zh: '7 岁时',  ja: '7歳のとき',  ko: '7살 때',  tr: '7 yaşında' },
  'At 17': { zh: '17 岁时', ja: '17歳のとき', ko: '17살 때', tr: '17 yaşında' },
  'At 47': { zh: '47 岁时', ja: '47歳のとき', ko: '47살 때', tr: '47 yaşında' },
  'Trajectory Snapshots': { zh: '轨迹快照', ja: '軌跡のスナップショット', ko: '궤적 스냅숏', tr: 'Yörünge Kareleri' },
  'Future portraits': { zh: '未来肖像', ja: '未来のポートレート', ko: '미래의 초상', tr: 'Gelecek portreleri' },
  'Across the years': { zh: '岁月之间', ja: '歳月を越えて', ko: '세월 너머', tr: 'Yıllar boyunca' },
  'One life, different decades': { zh: '同一段人生,不同的十年', ja: 'ひとつの人生、ちがう十年', ko: '한 사람의 생, 서로 다른 십 년', tr: 'Tek bir yaşam, farklı on yıllar' },
  'The same person at four ages. The optimization targets you chose will look like different things at each.': { zh: '同一个人,在四个不同年龄上的样子。你所选择的优化目标,在每一个年龄上看上去都不一样。', ja: '同じひとりの人物の、四つの年齢。あなたが選んだ最適化の目標は、その年齢ごとに違うかたちで現れる。', ko: '같은 한 사람의 네 가지 나이. 당신이 고른 최적화 목표는, 각 나이마다 서로 다른 모습으로 드러난다.', tr: 'Aynı kişinin dört farklı yaşı. Seçtiğin iyileştirme hedefleri her birinde farklı bir şey gibi görünecek.' },
  // Reflection / Adult section headings
  'Same person, different rooms': { zh: '同一个人,不同的房间', ja: '同じ人、ちがう部屋', ko: '같은 사람, 다른 방들', tr: 'Aynı insan, farklı odalar' },
  'Four contexts. One person each. The identity sliders did not model any of them.': { zh: '四种情境,各对应同一个人。身份滑块从未模拟过其中任何一种。', ja: '四つの場面、それぞれに同じ一人の人物。アイデンティティのスライダーは、そのどれもモデル化していない。', ko: '네 가지 상황. 각각 같은 한 사람. 정체성 슬라이더는 그 어느 것도 모델링하지 않았다.', tr: 'Dört bağlam. Her birinde aynı kişi. Kimlik kaydırıcıları bunların hiçbirini modellemedi.' },
  'Institutional consent record': { zh: '机构同意记录', ja: '機関同意記録', ko: '기관 동의 기록', tr: 'Kurumsal onay kaydı' },
  'Regulatory Context': { zh: '监管背景', ja: '規制コンテクスト', ko: '규제 컨텍스트', tr: 'Düzenleyici Bağlam' },
  // Stat-panel labels
  'Sex':                 { zh: '性别', ja: '性別', ko: '성별', tr: 'Cinsiyet' },
  'Height':              { zh: '身高', ja: '身長', ko: '신장', tr: 'Boy' },
  'Athletic':            { zh: '运动能力', ja: '運動能力', ko: '운동성', tr: 'Atletik' },
  'Eye color':           { zh: '眼睛颜色', ja: '目の色', ko: '눈 색', tr: 'Göz rengi' },
  'Hair color':          { zh: '发色', ja: '髪の色', ko: '머리 색', tr: 'Saç rengi' },
  'Hair texture':        { zh: '发质', ja: '髪質', ko: '머릿결', tr: 'Saç dokusu' },
  'Hair type':           { zh: '发质', ja: '髪質', ko: '머릿결', tr: 'Saç tipi' },
  'Skin tone':           { zh: '肤色', ja: '肌の色', ko: '피부 톤', tr: 'Ten rengi' },
  'Face shape':          { zh: '脸型', ja: '顔の形', ko: '얼굴형', tr: 'Yüz şekli' },
  'Freckles':            { zh: '雀斑', ja: 'そばかす', ko: '주근깨', tr: 'Çiller' },
  'Dimples':             { zh: '酒窝', ja: 'えくぼ', ko: '보조개', tr: 'Gamzeler' },
  // OCEAN + Kids personality
  'Openness':            { zh: '开放性', ja: '開放性', ko: '개방성', tr: 'Açıklık' },
  'Conscientiousness':   { zh: '尽责性', ja: '誠実性', ko: '성실성', tr: 'Sorumluluk' },
  'Extraversion':        { zh: '外向性', ja: '外向性', ko: '외향성', tr: 'Dışadönüklük' },
  'Agreeableness':       { zh: '宜人性', ja: '協調性', ko: '친화성', tr: 'Uyumluluk' },
  'Neuroticism':         { zh: '神经质', ja: '神経症傾向', ko: '신경성', tr: 'Nevrotiklik' },
  'Curiosity':           { zh: '好奇心', ja: '好奇心', ko: '호기심', tr: 'Merak' },
  'Kindness':            { zh: '善良', ja: 'やさしさ', ko: '다정함', tr: 'İyilik' },
  'Energy':              { zh: '活力', ja: 'エネルギー', ko: '활력', tr: 'Enerji' },
  'Focus':               { zh: '专注力', ja: '集中力', ko: '집중력', tr: 'Odak' },
  'Confidence':          { zh: '自信心', ja: '自信', ko: '자신감', tr: 'Özgüven' },
  'Creativity':          { zh: '创造力', ja: '創造性', ko: '창의력', tr: 'Yaratıcılık' },
  'Teamwork':            { zh: '团队合作', ja: 'チームワーク', ko: '협동심', tr: 'Takım çalışması' },
  // Parent slider subtitles
  'physical tendency':       { zh: '生理倾向', ja: '身体的傾向', ko: '신체적 성향', tr: 'fiziksel eğilim' },
  'curiosity & imagination': { zh: '好奇心与想象力', ja: '好奇心と想像力', ko: '호기심과 상상력', tr: 'merak ve hayal gücü' },
  'discipline & organization': { zh: '自律与条理', ja: '規律と整理', ko: '규율과 정리', tr: 'disiplin ve düzen' },
  'sociability & energy':    { zh: '社交性与活力', ja: '社交性と活力', ko: '사교성과 활력', tr: 'sosyallik ve enerji' },
  'kindness & cooperation':  { zh: '善良与合作', ja: 'やさしさと協力', ko: '다정함과 협력', tr: 'iyilik ve işbirliği' },
  'emotional reactivity':    { zh: '情绪反应', ja: '情緒的反応', ko: '정서적 반응성', tr: 'duygusal tepkisellik' },
  // Confidence pill labels
  'high':     { zh: '高', ja: '高', ko: '높음', tr: 'yüksek' },
  'moderate': { zh: '中', ja: '中', ko: '중간', tr: 'orta' },
  'low':      { zh: '低', ja: '低', ko: '낮음', tr: 'düşük' },
  // Stat section dividers
  'Big Five':            { zh: '大五人格', ja: 'ビッグファイブ', ko: '빅 파이브', tr: 'Beş Büyük' },
  'Personality':         { zh: '性格', ja: '性格', ko: '성격', tr: 'Kişilik' },
  'Behavioral Projection': { zh: '行为投射', ja: '行動投射', ko: '행동 투영', tr: 'Davranış Projeksiyonu' },
  // Slider labels (trait sliders panel)
  'Height potential':    { zh: '潜在身高', ja: '身長の可能性', ko: '신장 잠재력', tr: 'Boy potansiyeli' },
  'Athletic tendency':   { zh: '运动倾向', ja: '運動傾向', ko: '운동 성향', tr: 'Atletik eğilim' },
  'Eye color blend':     { zh: '眼睛颜色融合', ja: '目の色のブレンド', ko: '눈 색 혼합', tr: 'Göz rengi karışımı' },
  'Hair color blend':    { zh: '发色融合', ja: '髪の色のブレンド', ko: '머리 색 혼합', tr: 'Saç rengi karışımı' },
  'Hair texture blend':  { zh: '发质融合', ja: '髪質のブレンド', ko: '머릿결 혼합', tr: 'Saç dokusu karışımı' },
  'Skin tone blend':     { zh: '肤色融合', ja: '肌の色のブレンド', ko: '피부 톤 혼합', tr: 'Ten rengi karışımı' },
  'Face shape blend':    { zh: '脸型融合', ja: '顔の形のブレンド', ko: '얼굴형 혼합', tr: 'Yüz şekli karışımı' },
  'Freckles likelihood': { zh: '雀斑概率', ja: 'そばかすの確率', ko: '주근깨 확률', tr: 'Çil olasılığı' },
  'Dimples likelihood':  { zh: '酒窝概率', ja: 'えくぼの確率', ko: '보조개 확률', tr: 'Gamze olasılığı' },
  // Parent panel
  'Parent A':            { zh: '父母 A', ja: '親 A', ko: '부모 A', tr: 'Ebeveyn A' },
  'Parent B':            { zh: '父母 B', ja: '親 B', ko: '부모 B', tr: 'Ebeveyn B' },
  'Name':                { zh: '姓名', ja: '名前', ko: '이름', tr: 'İsim' },
  'Ancestry':            { zh: '祖籍', ja: '祖先', ko: '혈통', tr: 'Soy' },
  'Height (cm)':         { zh: '身高(厘米)', ja: '身長 (cm)', ko: '신장 (cm)', tr: 'Boy (cm)' },
  // Env panel (use full English labels)
  'Supportive family':       { zh: '家庭支持度', ja: '支えてくれる家族', ko: '지지적인 가족', tr: 'Destekleyici aile' },
  'Educational access':      { zh: '教育机会', ja: '教育へのアクセス', ko: '교육 기회', tr: 'Eğitime erişim' },
  'Economic stability':      { zh: '经济稳定度', ja: '経済的安定', ko: '경제적 안정', tr: 'Ekonomik istikrar' },
  'Healthcare access':       { zh: '医疗资源', ja: '医療へのアクセス', ko: '의료 접근성', tr: 'Sağlık hizmetlerine erişim' },
  'Social pressure':         { zh: '社会压力', ja: '社会的プレッシャー', ko: '사회적 압력', tr: 'Sosyal baskı' },
  'Internet exposure':       { zh: '上网接触度', ja: 'インターネット接触', ko: '인터넷 노출', tr: 'İnternet maruziyeti' },
  'Multilingual upbringing': { zh: '多语言成长环境', ja: '多言語環境での養育', ko: '다중언어 양육', tr: 'Çokdilli yetişme' },
  'Urban (1) ↔ Rural (10)':  { zh: '城市(1) ↔ 乡村(10)', ja: '都市 (1) ↔ 田舎 (10)', ko: '도시 (1) ↔ 시골 (10)', tr: 'Kentsel (1) ↔ Kırsal (10)' }
};
function localLabel(en) {
  if (!en) return en;
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  if (lang === 'en') return en;
  const entry = LABEL_I18N[en];
  if (!entry) return en;
  return entry[lang] || en;
}

/* ---------- Ancestry presets ----------
 * Each preset describes the typical *range* of trait values seen in that
 * ancestry — not a fixed look. Picking an ancestry rolls one trait out of
 * each list, so two babies of the same ancestry still vary. "Mixed" leaves
 * the existing fields alone. None of this is biology — it's just a starting
 * point so combinations don't all collapse to one phenotype.
 */
const ANCESTRY_LADDER = [
  'unspecified', 'european', 'east asian', 'south asian',
  'african', 'latin american', 'middle eastern', 'mixed'
];
const ANCESTRY_LABEL = {
  'unspecified':    'Unspecified',
  'european':       'European',
  'east asian':     'East Asian',
  'south asian':    'South Asian',
  'african':        'African',
  'latin american': 'Latin American',
  'middle eastern': 'Middle Eastern',
  'mixed':          'Mixed'
};
const ANCESTRY_PRESETS = {
  european: {
    skinTone:  ['porcelain', 'very fair', 'fair', 'light tan'],
    hairColor: ['platinum', 'blonde', 'strawberry', 'light brown', 'auburn', 'brown', 'dark brown', 'red'],
    hairType:  ['straight', 'wavy', 'curly'],
    eyeColor:  ['blue', 'green', 'hazel', 'brown']
  },
  'east asian': {
    skinTone:  ['very fair', 'fair', 'light tan'],
    hairColor: ['black', 'jet black', 'dark brown'],
    hairType:  ['straight', 'wavy'],
    eyeColor:  ['brown', 'dark brown']
  },
  'south asian': {
    skinTone:  ['light tan', 'medium', 'olive', 'tan', 'brown'],
    hairColor: ['dark brown', 'black', 'jet black'],
    hairType:  ['straight', 'wavy', 'curly'],
    eyeColor:  ['brown', 'dark brown', 'hazel']
  },
  african: {
    skinTone:  ['brown', 'deep brown', 'dark brown', 'tan'],
    hairColor: ['black', 'jet black', 'dark brown'],
    hairType:  ['coily', 'curly'],
    eyeColor:  ['brown', 'dark brown']
  },
  'latin american': {
    skinTone:  ['fair', 'light tan', 'medium', 'olive', 'tan', 'brown'],
    hairColor: ['brown', 'dark brown', 'black', 'auburn'],
    hairType:  ['straight', 'wavy', 'curly'],
    eyeColor:  ['hazel', 'brown', 'dark brown', 'green']
  },
  'middle eastern': {
    skinTone:  ['fair', 'light tan', 'medium', 'olive', 'tan'],
    hairColor: ['dark brown', 'black', 'brown'],
    hairType:  ['straight', 'wavy', 'curly'],
    eyeColor:  ['brown', 'dark brown', 'hazel', 'green']
  },
  mixed: null
};

/* ---------- Flavor pools ---------- */

// Behavioral tone — a single grounded descriptor per baby. Replaces the
// older meme-titled "funny vibe" pool with calmer, more specific lines.
// Localized in all 5 languages; arrays MUST stay the same length so the
// seeded vibe-pick stays stable across language switches.
// Translator note: EN entries here were rewritten in Round 1 away from aphoristic
// "X loosely; Y firmly" patterns toward concrete, embodied details. The leading
// 16 zh/ja/ko/tr entries still mirror the OLD aphorisms by index and remain a
// future pass. The trailing 6 paradox/contradiction entries were translated in
// Round 2 to preserve psychological texture over literal wording.
const FUNNY_TITLES = {
  en: [
    'Quietly observant',
    'Steady and warm',
    'The one who fixes things without being asked',
    'Thoughtful, slightly self-conscious',
    'Remembers everyone\'s coffee order',
    'Restless in a precise way',
    'Takes the long way home on purpose',
    'Asks where the bathroom is in three languages',
    'Forwards articles their friends will actually read',
    'Will reroute the whole evening for a dog',
    'Capable but rarely in a hurry',
    'Owns one good knife and uses it for everything',
    'Knows the bus driver\'s name',
    'Re-reads the same five books every winter',
    'Stops to look at other people\'s gardens',
    'Texts back the next morning, with a real answer',
    { text: 'Worries constantly about things they can\'t change', tag: 'AN-pleaser' },
    { text: 'Stays late at parties they didn\'t want to attend', tag: 'EN-tension' },
    { text: 'Argues passionately for restraint', tag: 'CO-rigidity' },
    { text: 'Gives advice they cannot take themselves', tag: 'OC-tension' },
    { text: 'Plans meticulously, then improvises in the moment', tag: 'CO-rigidity' },
    { text: 'Defends in public the friend they criticize in private', tag: 'AN-pleaser' }
  ],
  zh: [
    '静静观察',
    '沉稳而温暖',
    '机敏,却慢于表露',
    '细致,略带自省',
    '心思开放却不外露',
    '有种精确的不安分',
    '相处轻松,深交不易',
    '问题比大多数人更准',
    '观点放得松,情谊握得紧',
    '笑得快,原谅得慢',
    '能干,却少有匆忙',
    '好奇,但不张扬',
    '在专注上慷慨,在言语上谨慎',
    '读人胜于读书',
    '默默承担小小的善意',
    '看得久,说得少',
    { text: '为自己改变不了的事反复纠结', tag: 'AN-pleaser' },
    { text: '不想去的聚会,偏偏待到最后', tag: 'EN-tension' },
    { text: '为「克制」据理力争', tag: 'CO-rigidity' },
    { text: '把自己做不到的道理讲给别人听', tag: 'OC-tension' },
    { text: '计划写得密密麻麻,临场又全凭直觉', tag: 'CO-rigidity' },
    { text: '私下吐槽的朋友,当众第一个出来维护', tag: 'AN-pleaser' }
  ],
  ja: [
    '静かに気づく人',
    '穏やかで、あたたかい',
    '頭が回るが、口は重い',
    '思慮深く、少し自意識的',
    '心は開いているが、口にはしない',
    '正確なやり方で、落ち着かない',
    '付き合いやすく、深く知るのは難しい',
    '他の誰より、よい問いを立てる',
    '意見はゆるく、情はしっかり',
    'よく笑い、許すのには時間がかかる',
    '有能だが、ほとんど急がない',
    '誇張せずに、好奇心がある',
    '注意は気前よく、言葉は慎重に',
    '本を読むより、人を読む',
    '名づけずに、小さな親切を運ぶ',
    '話すよりも、長く見つめる',
    { text: '自分ではどうにもならないことを、いつまでも気に病む', tag: 'AN-pleaser' },
    { text: '気が進まなかった飲み会に、結局いちばん最後まで残る', tag: 'EN-tension' },
    { text: '「ほどほどに」と、誰よりも熱く語る', tag: 'CO-rigidity' },
    { text: '自分には守れない助言を、ひとには真顔で渡す', tag: 'OC-tension' },
    { text: '綿密に計画を立ててから、当日にそれを全部ひっくり返す', tag: 'CO-rigidity' },
    { text: '陰では文句を言う相手を、表ではいちばんに庇う', tag: 'AN-pleaser' }
  ],
  ko: [
    '조용히 살피는 사람',
    '꾸준하고 따뜻한 사람',
    '재치 있지만, 천천히 드러내는',
    '사려 깊고, 약간 자의식적인',
    '마음은 열려 있으나 드러내지 않는',
    '정확한 방식으로 안절부절못하는',
    '함께 있긴 쉬워도, 알기는 어려운',
    '대부분의 사람보다 좋은 질문을 하는',
    '의견은 느슨하게, 정은 단단하게 쥐는',
    '잘 웃고, 용서는 더디게 하는',
    '능숙하지만 좀처럼 서두르지 않는',
    '드러내지 않으면서도 호기심 많은',
    '주의는 후하게, 말은 신중하게',
    '책을 읽기보다 사람을 더 잘 읽는',
    '이름 붙이지 않은 작은 친절을 안고 다니는',
    '말하기보다 더 오래 바라보는',
    { text: '어쩔 수 없는 일을 두고두고 곱씹는', tag: 'AN-pleaser' },
    { text: '가기 싫었던 자리에 끝까지 남아 있는', tag: 'EN-tension' },
    { text: '「적당히」를 누구보다 뜨겁게 주장하는', tag: 'CO-rigidity' },
    { text: '본인은 못 지킬 조언을 정색하고 건네는', tag: 'OC-tension' },
    { text: '꼼꼼히 계획해두고 막상 그 자리에서 다 바꾸는', tag: 'CO-rigidity' },
    { text: '뒤에서는 흉보던 친구를 앞에서는 제일 먼저 편드는', tag: 'AN-pleaser' }
  ],
  tr: [
    'Sessizce gözlemleyen',
    'İstikrarlı ve sıcak',
    'Keskin zekâlı, ama paylaşmakta yavaş',
    'Düşünceli, biraz kendinden çekingen',
    'Açık yürekli ama mahrem',
    'Belirgin bir biçimde huzursuz',
    'Birlikteyken kolay, tanımakta zor',
    'Çoğundan daha iyi sorular soran',
    'Görüşleri gevşek tutan, sevgileri sıkı',
    'Çabuk gülen, geç bağışlayan',
    'Yetenekli, ama nadiren acelesi olan',
    'Gösterişsiz biçimde meraklı',
    'Dikkatte cömert, sözde dikkatli',
    'Kitap okumaktan çok insan okuyan',
    'Adlandırmadan küçük iyilikleri taşıyan',
    'Konuşmaktan çok izleyen',
    { text: 'Elinden hiçbir şey gelmeyen meseleleri içinde günlerce evirip çeviren', tag: 'AN-pleaser' },
    { text: 'Gitmek istemediği davette en son ayrılan', tag: 'EN-tension' },
    { text: '«Ölçülü olalım» derken kimseden ölçülü olmayan', tag: 'CO-rigidity' },
    { text: 'Kendi tutamadığı öğüdü başkasına ciddi ciddi veren', tag: 'OC-tension' },
    { text: 'Her şeyi planlayıp son anda hepsini içgüdüyle değiştiren', tag: 'CO-rigidity' },
    { text: 'Arkasından şikâyet ettiği arkadaşı, ortamda ilk savunan', tag: 'AN-pleaser' }
  ]
};

// Future-path predictions, tagged with personality bias keys (O/C/E/A/N/athletic).
// Tagging is loose — at runtime we pick from the full pool with the bias as a soft weight.
// Grounded register: specific, plausible, emotionally textured. No memes.
// Language-keyed: each language array carries the same {text, tag} shape so
// pickPool → localList returns the active-language slice; conflict-tag
// reservation logic in generateBabyFlavor consumes p.tag and p.text unchanged.
const FUTURE_PATHS = {
  en: [
    { text: 'Starts three projects before finishing the first; learns to live with that.',   tag: 'O' },
    { text: 'Develops a long, quiet obsession with one specific era of music.',                tag: 'O' },
    { text: 'Keeps a notebook of overheard sentences.',                                        tag: 'O' },
    { text: 'Reads slowly, finishes most of what they start, remembers little phrases for years.', tag: 'O' },
    { text: 'Has a phase of writing letters to people they will never send them to.',          tag: 'O' },
    { text: 'Builds something with their hands that the family keeps for decades.',            tag: 'O' },
    { text: 'Returns to one childhood interest in adulthood, more seriously than before.',     tag: 'O' },
    { text: 'Plans everything quietly, then carries it out without telling anyone.',           tag: 'C' },
    { text: 'Keeps a desk drawer organized to a degree that startles their roommates.',        tag: 'C' },
    { text: 'Finishes the long thing.',                                                        tag: 'C' },
    { text: 'Tracks tiny inconsistencies and remembers them years later.',                     tag: 'C' },
    { text: 'Becomes the friend everyone trusts with logistics.',                              tag: 'C' },
    { text: 'Says less than they think; says it carefully when they do.',                      tag: 'C' },
    { text: 'Knows everyone in their building, on every floor, by their grocery routine.',     tag: 'E' },
    { text: 'Throws small, deliberate gatherings rather than big parties.',                    tag: 'E' },
    { text: 'Brings strangers into existing friend groups, gently.',                           tag: 'E' },
    { text: 'Talks to the same regulars at the corner shop for decades.',                      tag: 'E' },
    { text: 'Becomes the one who organizes reunions years after they should have died out.',   tag: 'E' },
    { text: 'Stays in touch with friends across continents through small, specific messages.', tag: 'A' },
    { text: 'Sends a handwritten note after every funeral and every wedding.',                 tag: 'A' },
    { text: 'Looks after a parent without making it a story.',                                 tag: 'A' },
    { text: 'Becomes the family\'s designated emotional translator.',                          tag: 'A' },
    { text: 'Says yes too often, slowly learns to say no, mostly succeeds.',                   tag: 'A' },
    { text: 'Worries about people more than they admit.',                                      tag: 'N' },
    { text: 'Replays small interactions in their head for days afterward.',                    tag: 'N' },
    { text: 'Carries one fear they\'ve had since age 7 quietly into adulthood.',               tag: 'N' },
    { text: 'Develops a private vocabulary for moods they don\'t share with others.',          tag: 'N' },
    { text: 'Becomes drawn to one particular kind of repair work — bicycles, sentences, relationships.', tag: 'O' },
    { text: 'Picks up a sport in their thirties they never thought they\'d like.',             tag: 'athletic' },
    { text: 'Walks long distances alone and considers it a personality trait.',                tag: 'athletic' },
    { text: 'Cooks the same five dishes well, for years, for the same circle of people.',     tag: 'C' },
    { text: 'Has a specific spot in one specific park they consider theirs.',                  tag: 'O' },
    { text: 'Learns one instrument badly and another well; never tells anyone which is which.', tag: 'O' },
    { text: 'Saves voicemails from people who have died.',                                     tag: 'A' },
    { text: 'Knows their grandparents\' handwriting at a glance.',                             tag: 'A' },
    { text: 'Starts three projects to prove they\'re done with the last one; calls it "following the energy."', tag: 'OC-tension' },
    { text: 'Reorganizes the kitchen at midnight, then forgets where they put the cumin for a year.',  tag: 'OC-tension' },
    { text: 'Throws the dinner everyone loved, then avoids the thank-you texts for weeks; tells themselves they\'re "recharging."', tag: 'EN-tension' },
    { text: 'Becomes the friend who pulls people together, then disappears for two weeks to recover.',  tag: 'EN-tension' },
    { text: 'Plans meticulously to feel less anxious, then resents the plan for being too rigid; calls it "just being thorough."', tag: 'CO-rigidity' },
    { text: 'Keeps the same morning routine for a decade and resents the one week it has to change.',  tag: 'CO-rigidity' },
    { text: 'Says yes to favors they can\'t afford; tells themselves it\'s just this once, for a year.', tag: 'AN-pleaser' },
    { text: 'Covers for a coworker on one bad week, then for two years; insists they don\'t mind.',    tag: 'AN-pleaser' },
    { text: 'Eventually keeps two notebooks: one for the projects they\'ll finish, one for the ones that are really moods.', tag: 'OC-tension' },
    { text: 'By forty, runs the household on a system only they can read; partner has stopped asking for the logic and started budgeting one extra hour to find anything.', tag: 'OC-tension' },
    { text: 'Hosts the dinner, then the next one, then the next one; somewhere along the way learns that the thank-you texts are part of the meal, not the bill.', tag: 'EN-tension' },
    { text: 'After the second burnout, stops hosting; keeps the long table in the garage for nine years before posting it to a neighbor for free.', tag: 'EN-tension' },
    { text: 'Learns to alternate: tight planning for the work that needs it, improvisation for the parts they want to enjoy; calls the second part "rest" without flinching.', tag: 'CO-rigidity' },
    { text: 'At fifty, builds the calendar in tight blocks and the weekends in deliberate blanks; the blanks still cost an apology to whoever wanted to fill them.', tag: 'CO-rigidity' },
    { text: 'After one bad year of saying yes to everything, learns to say "let me think about it" — and means it; the friendships that survive are the patient ones.', tag: 'AN-pleaser' },
    { text: 'Spends a decade covering for everyone; in their forties wakes up tired in a way sleep doesn\'t fix, and slowly, quietly, starts to disappoint people on purpose.', tag: 'AN-pleaser' },
    { text: 'At thirty-seven, finishes a project nobody asked for and nobody wants; keeps the binder anyway, on the high shelf, and refers to it twice a year.', tag: 'OC-tension' },
    { text: 'In their fifties hosts one Sunday a month, eight people, same start time; on the other Sundays does not answer the phone, and the eight people learn the rule.', tag: 'EN-tension' },
    { text: 'Changes the morning routine for a partner who needs the kitchen by 7; resents it for a year, then stops noticing, then forgets the old routine existed.', tag: 'CO-rigidity' },
    { text: 'Says yes to one favor too many in their late twenties; carries the cost for years, and only afterwards learns that the friend never expected the yes in the first place.', tag: 'AN-pleaser' },
    // Tier-2 mild bands. Softer than the tier-1 entries above: same friction,
    // quieter expression. Present-state observation, not outcome-determinism.
    // R15: zh/ja/ko/tr translations added below — last R9 carryover closed.
    { text: 'Keeps a running list of side projects; finishes most of the small ones, lets two larger ones drift.', tag: 'OC-mild' },
    { text: 'Renovates one room of the apartment carefully, then leaves the trim unfinished for a year.', tag: 'OC-mild' },
    { text: 'Hosts dinner once a month and is quiet for two days afterward.', tag: 'EN-mild' },
    { text: 'Likes a full Saturday with friends, then keeps Sunday entirely to themselves.', tag: 'EN-mild' },
    { text: 'Keeps the same coffee order at the same cafe for years; notices when the barista changes.', tag: 'CO-mild' },
    { text: 'Reroutes around one small change to the schedule and tells themselves it didn\'t bother them.', tag: 'CO-mild' },
    { text: 'Picks the restaurant everyone else seems to want; mentions afterward, lightly, what they\'d have preferred.', tag: 'AN-mild' },
    { text: 'Carries one small unspoken resentment for about a week; then lets it go, mostly.', tag: 'AN-mild' }
  ],
  zh: [
    { text: '在做完第一个之前就开始了三个项目;慢慢学会与此共处。', tag: 'O' },
    { text: '对某个特定年代的音乐怀有长久而安静的痴迷。', tag: 'O' },
    { text: '随身带一本本子,记下偶尔听来的句子。', tag: 'O' },
    { text: '读书很慢,读完的居多,记得一些小句子很多年。', tag: 'O' },
    { text: '有一段时期,给永远不会寄出的对象写信。', tag: 'O' },
    { text: '用双手做出一件家人珍藏几十年的东西。', tag: 'O' },
    { text: '成年后重拾一个童年的兴趣,比当时认真得多。', tag: 'O' },
    { text: '默默地把一切计划好,然后悄无声息地执行。', tag: 'C' },
    { text: '书桌抽屉整理得让室友惊讶。', tag: 'C' },
    { text: '把长长的那件事做完了。', tag: 'C' },
    { text: '留意微小的矛盾,并在多年后仍然记得。', tag: 'C' },
    { text: '成了朋友圈里负责安排一切的那个人。', tag: 'C' },
    { text: '想得多说得少;要说时也十分谨慎。', tag: 'C' },
    { text: '通过每个人买菜的习惯,认识了整栋楼每层的住户。', tag: 'E' },
    { text: '不办大型派对,宁愿办精心安排的小聚会。', tag: 'E' },
    { text: '温柔地把陌生人引入已有的朋友圈。', tag: 'E' },
    { text: '在街角小店里和同一群熟客聊了几十年。', tag: 'E' },
    { text: '在大家本该散去多年后,仍是组织重聚的那个人。', tag: 'E' },
    { text: '通过简短而具体的消息,与不同大陆的朋友保持联系。', tag: 'A' },
    { text: '每场葬礼、每场婚礼之后都会寄一张手写卡片。', tag: 'A' },
    { text: '照顾父母时,从不张扬。', tag: 'A' },
    { text: '成了家里专门负责翻译情绪的人。', tag: 'A' },
    { text: '起初太常说"好",慢慢学会说"不",大致做到了。', tag: 'A' },
    { text: '比自己承认的更担心别人。', tag: 'N' },
    { text: '在脑海里反复重播一次又一次微小的交谈,连续好几天。', tag: 'N' },
    { text: '把七岁起就有的一种恐惧,悄悄带进了成年。', tag: 'N' },
    { text: '为自己各种情绪发展出一套不与人分享的私人词汇。', tag: 'N' },
    { text: '渐渐被某一种修补吸引——自行车、句子,或人际关系。', tag: 'O' },
    { text: '三十多岁时迷上了一项自己原以为绝不会喜欢的运动。', tag: 'athletic' },
    { text: '独自走很远的路,把它视为自己的一种性格特征。', tag: 'athletic' },
    { text: '多年来给同一群人,做得很好的那五道菜,反复做着。', tag: 'C' },
    { text: '在某座公园里有一个属于自己的小角落。', tag: 'O' },
    { text: '一种乐器学得很差,另一种学得很好;从不告诉别人哪种是哪种。', tag: 'O' },
    { text: '把已故亲友的语音留言留着。', tag: 'A' },
    { text: '一眼就能认出祖父母的笔迹。', tag: 'A' },
    { text: '同时启动三个项目以证明自己已经放下了上一个;嘴上说着"在跟着能量走"。', tag: 'OC-tension' },
    { text: '半夜重新整理整个厨房,结果接下来一年都找不到孜然放哪了。', tag: 'OC-tension' },
    { text: '办了一场大家都赞不绝口的晚餐,然后好几周回避答谢的短信;告诉自己这是在"充电"。', tag: 'EN-tension' },
    { text: '是那种把大家聚到一起的朋友,然后又消失两周来恢复。', tag: 'EN-tension' },
    { text: '把一切计划得无懈可击以减轻焦虑,又因为计划过于死板而怨怼;嘴上说"只是周全罢了"。', tag: 'CO-rigidity' },
    { text: '十年间一直保持同样的晨间习惯,却因有一周不得不改变而满心怨气。', tag: 'CO-rigidity' },
    { text: '答应了自己其实承担不起的请求;告诉自己"就这一次",结果说了一整年。', tag: 'AN-pleaser' },
    { text: '在一位同事难熬的一周替他顶班,然后顶了整整两年;坚持说自己并不介意。', tag: 'AN-pleaser' },
    { text: '最后准备了两本本子:一本写真的会完成的项目,一本写其实只是心情的项目。', tag: 'OC-tension' },
    { text: '四十岁时,家里靠一套只有自己看得懂的体系运行;伴侣早已不再追问其中的逻辑,而是为找任何东西预留出多出来的一小时。', tag: 'OC-tension' },
    { text: '一场晚餐之后又是一场,再是一场;不知不觉间学到:感谢的短信是这顿饭的一部分,不是账单。', tag: 'EN-tension' },
    { text: '第二次精疲力竭后,不再办聚会;那张长桌在车库里放了九年,最后免费送给了邻居。', tag: 'EN-tension' },
    { text: '学会了切换:需要的部分严密计划,想享受的部分尽情即兴;说起后者时不再扭捏,直接称之为"休息"。', tag: 'CO-rigidity' },
    { text: '五十岁时,把日程排得密不透风,又有意把周末留白;那段空白,仍要向想填补它的人致以一句歉意。', tag: 'CO-rigidity' },
    { text: '经过一年事事都说"好"的糟糕日子后,学会说"让我想想"——并真的会去想;留下的友谊,都是有耐心的那一种。', tag: 'AN-pleaser' },
    { text: '帮所有人遮风挡雨度过整整十年;四十多岁时醒来发现一种睡眠也无法消除的疲惫,于是悄悄地、慢慢地,开始有意让别人失望。', tag: 'AN-pleaser' },
    { text: '三十七岁那年完成了一个没人要求、也没人想要的项目;却把活页夹放上高高的书架,每年仍翻看两次。', tag: 'OC-tension' },
    { text: '五十多岁起,每月只接待一个周日,八位客人,固定时间;其余的周日不接电话,那八个人渐渐摸清了规矩。', tag: 'EN-tension' },
    { text: '为一个早晨七点要用厨房的伴侣改变了自己的晨间习惯;怨了一整年,后来不再在意,再后来连自己原来的习惯都忘了。', tag: 'CO-rigidity' },
    { text: '二十多岁末尾的某天,多答应了一个其实不该接的人情;为此付出多年代价,事后才发现那位朋友其实从未指望自己点头。', tag: 'AN-pleaser' },
    { text: '手头总有一份副业清单;小的多半会做完,两件大的就让它们漂着。', tag: 'OC-mild' },
    { text: '把公寓里一个房间认真翻新,门窗收边的活儿却一年都没收尾。', tag: 'OC-mild' },
    { text: '每月办一次晚餐;之后两天都安安静静的。', tag: 'EN-mild' },
    { text: '喜欢和朋友过一整天的周六,然后把周日完全留给自己。', tag: 'EN-mild' },
    { text: '几年来在同一家咖啡馆点同一杯咖啡;店员换了人会留意到。', tag: 'CO-mild' },
    { text: '日程有一点小变动就绕开走,然后告诉自己没怎么放在心上。', tag: 'CO-mild' },
    { text: '选了大家似乎都想去的那家餐馆;事后又轻描淡写地提一句,自己原本更想去哪儿。', tag: 'AN-mild' },
    { text: '把一桩没说出口的小小不满揣上一星期左右;之后大致就放下了。', tag: 'AN-mild' }
  ],
  ja: [
    { text: '最初の一つを終える前に三つの計画に手をつけ、そのことと折り合いをつけていく。', tag: 'O' },
    { text: 'ある特定の時代の音楽に、長く静かな執着を抱くようになる。', tag: 'O' },
    { text: '偶然耳にした言葉をメモする手帳をいつも持ち歩いている。', tag: 'O' },
    { text: 'ゆっくり読んで、たいてい最後まで読み切り、短いフレーズを何年も覚えている。', tag: 'O' },
    { text: '出すつもりのない相手へ手紙を書く時期を過ごす。', tag: 'O' },
    { text: '自分の手で何かを作り、それを家族が何十年も大切に保管する。', tag: 'O' },
    { text: '大人になってから、子どもの頃の関心ごとに以前よりも本気で戻ってくる。', tag: 'O' },
    { text: 'すべてを静かに計画し、誰にも告げずにそれをやり遂げる。', tag: 'C' },
    { text: '同居人が驚くほど整然と片付いた机の引き出しを保つ。', tag: 'C' },
    { text: '長く続けてきたあの仕事を、ちゃんと最後までやり終える。', tag: 'C' },
    { text: '細かな食い違いに気づき、それを何年も覚えている。', tag: 'C' },
    { text: '何かを段取りしてほしいとき、みんなが頼る友人になる。', tag: 'C' },
    { text: '思っているよりは言葉数が少なく、口を開くときは慎重に話す。', tag: 'C' },
    { text: '同じ建物の階ごとの住人を、買い物の習慣から覚えてしまっている。', tag: 'E' },
    { text: '大きなパーティーではなく、丁寧に組まれた小さな集まりを開く。', tag: 'E' },
    { text: '既にある友人グループへ、見知らぬ人をそっと連れてくる。', tag: 'E' },
    { text: '街角の店で同じ常連客たちと何十年も言葉を交わし続ける。', tag: 'E' },
    { text: '本来なら絶えてしまうはずだった集まりを、何年経っても呼び戻す張本人になる。', tag: 'E' },
    { text: '大陸を越えた友人たちと、短く具体的なメッセージで連絡を取り続ける。', tag: 'A' },
    { text: '葬式のあとも、結婚式のあとも、必ず手書きの便りを送る。', tag: 'A' },
    { text: '親の世話をするが、それを物語にしようとはしない。', tag: 'A' },
    { text: '家族の感情を読み解き、誰かに伝える役回りを引き受けるようになる。', tag: 'A' },
    { text: 'あまりに頻繁に「はい」と言ってしまうが、徐々に「いいえ」を学び、概ねできるようになる。', tag: 'A' },
    { text: '自分で認める以上に、人のことを心配している。', tag: 'N' },
    { text: 'ちょっとしたやり取りを、何日も頭の中で再生し続ける。', tag: 'N' },
    { text: '七歳から抱えているひとつの恐れを、静かに大人になっても連れていく。', tag: 'N' },
    { text: '自分の気分を表す、誰にも見せない私的な言葉づかいを編み出していく。', tag: 'N' },
    { text: '自転車、文章、人間関係——どれかひとつの「直す仕事」にだんだん惹かれていく。', tag: 'O' },
    { text: '三十代になって、自分では好きになるはずがないと思っていたスポーツに手を出す。', tag: 'athletic' },
    { text: '一人で長距離を歩くことを、自分の性格の一部だと思っている。', tag: 'athletic' },
    { text: '同じ五品を、同じ顔ぶれに、何年も上手に作り続ける。', tag: 'C' },
    { text: 'ある公園のあるベンチを、自分の場所だと思っている。', tag: 'O' },
    { text: '一つの楽器は下手なまま、もう一つは上達するが、どちらがどちらかは誰にも言わない。', tag: 'O' },
    { text: 'もう亡くなった人たちのボイスメールを消さずに残しておく。', tag: 'A' },
    { text: '祖父母の筆跡を、ひと目で見分けられる。', tag: 'A' },
    { text: '前の計画から離れたことを示そうと三つの新しい計画を始め、それを「流れに乗っている」と呼ぶ。', tag: 'OC-tension' },
    { text: '真夜中に台所を一から整理し直し、それから一年間、クミンをどこに置いたか思い出せない。', tag: 'OC-tension' },
    { text: 'みんなが大喜びした晩餐会を開いた後、お礼のメッセージを数週間避ける——自分には「充電中」と言い聞かせる。', tag: 'EN-tension' },
    { text: 'みんなを引き寄せる役を担うが、その後で二週間ほど姿を消して回復する友人になる。', tag: 'EN-tension' },
    { text: '不安を減らすために綿密に計画を立て、その計画が窮屈すぎると不満を抱きながら、「ただ慎重なだけ」と言う。', tag: 'CO-rigidity' },
    { text: '十年同じ朝のルーティンを守り、それを変えなくてはならなかった一週間に強い不満を抱く。', tag: 'CO-rigidity' },
    { text: '自分には荷の重い頼みごとに「はい」と言い、「今回だけ」と自分に言い聞かせ、それを一年続ける。', tag: 'AN-pleaser' },
    { text: '一週間だけのつもりで同僚を肩代わりし、気づけば二年続けている——本人は「気にしていない」と言い張る。', tag: 'AN-pleaser' },
    { text: '結局、ノートを二冊使い分けるようになる——本当に仕上げる計画用と、ただの気分でしかない計画用。', tag: 'OC-tension' },
    { text: '四十になる頃には、本人にしか読み解けない仕組みで家事を回している——連れ合いは理屈を尋ねるのをやめ、何かを探すたびに余分に一時間を確保するようになる。', tag: 'OC-tension' },
    { text: '一度の晩餐がやがて次へ、また次へとつながっていく中で、感謝のメッセージは食事の一部であって、請求ではないと気づくようになる。', tag: 'EN-tension' },
    { text: '二度目の燃え尽きを経て、もてなしをやめる——あの長いテーブルは九年間ガレージに置かれた後、近所の人に無償で譲られる。', tag: 'EN-tension' },
    { text: '使い分けを身につける——必要な仕事には緻密な計画を、楽しみたい時間には即興を。後者を「休み」と呼ぶことに、もうためらわない。', tag: 'CO-rigidity' },
    { text: '五十になって、平日は隙のないブロックで埋め、週末はわざと空白にする——その空白を埋めたかった誰かには、今でも一度詫びを入れなければならない。', tag: 'CO-rigidity' },
    { text: 'あらゆることに「はい」と答えていたつらい一年を経て、「少し考えさせて」と言えるようになり、しかも本当に考えるようになる——残る友情は、辛抱強いものだけだ。', tag: 'AN-pleaser' },
    { text: '十年間、誰の代わりにもなって尽くしてきた末に、四十代で眠っても癒えない疲れを抱えて目覚め、静かに、ゆっくりと、わざと人を失望させるようになる。', tag: 'AN-pleaser' },
    { text: '三十七のとき、誰にも頼まれていない、誰も望まなかった計画を仕上げる——それでもファイルを高い棚に置き、年に二度はそれを開く。', tag: 'OC-tension' },
    { text: '五十代になると、月に一度だけ、八人、同じ時間に客を迎える——他の日曜には電話に出ない。八人もやがてその約束を覚える。', tag: 'EN-tension' },
    { text: '朝七時に台所を使いたい連れ合いのために、朝のルーティンを変える——一年は不満を抱き、やがて気にならなくなり、もとの習慣があったことすら忘れていく。', tag: 'CO-rigidity' },
    { text: '二十代の終わり頃、引き受けすぎたひとつの頼みごとが何年もの代償となる——あとになって、頼んだ友人の方は最初から「はい」を期待していなかったと知る。', tag: 'AN-pleaser' },
    { text: '副業のリストをいつも手元に置いている。小さなものはたいてい仕上げ、大きなもの二つは流れるに任せている。', tag: 'OC-mild' },
    { text: '部屋を一つだけ丁寧に直し、その縁の仕上げを一年ほど放っておく。', tag: 'OC-mild' },
    { text: '月に一度ディナーを開き、そのあと二日ほど静かに過ごす。', tag: 'EN-mild' },
    { text: '友人と過ごす土曜を満喫し、日曜はまるごと自分のために空けておく。', tag: 'EN-mild' },
    { text: '同じ店で同じコーヒーを何年も注文し、店員が代わると気づく。', tag: 'CO-mild' },
    { text: '予定のちょっとした変更を避けて回り道し、別に気にしていないと自分に言い聞かせる。', tag: 'CO-mild' },
    { text: 'みんなが行きたがっていそうな店を選び、後から軽く、本当はどこに行きたかったかを口にする。', tag: 'AN-mild' },
    { text: '口にしない小さな不満を一週間ほど抱え、それからおおむね手放す。', tag: 'AN-mild' }
  ],
  ko: [
    { text: '첫 번째를 끝내기 전에 세 가지 일을 벌이고, 그 사실과 함께 살아가는 법을 배운다.', tag: 'O' },
    { text: '어느 한 시대의 음악에 길고 조용한 집착을 키워간다.', tag: 'O' },
    { text: '우연히 들은 문장을 적어두는 수첩을 늘 들고 다닌다.', tag: 'O' },
    { text: '천천히 읽고, 시작한 책은 대개 끝까지 보며, 짧은 구절을 몇 년이나 기억한다.', tag: 'O' },
    { text: '결코 부치지 않을 사람들에게 편지를 쓰는 시기를 한 번 거친다.', tag: 'O' },
    { text: '손으로 무언가를 만들어 가족이 수십 년 동안 간직한다.', tag: 'O' },
    { text: '어른이 되어 어린 시절의 관심사 하나로 더 진지하게 돌아간다.', tag: 'O' },
    { text: '모든 일을 조용히 계획한 뒤, 누구에게도 알리지 않고 실행한다.', tag: 'C' },
    { text: '룸메이트가 깜짝 놀랄 만큼 가지런히 정리된 책상 서랍을 유지한다.', tag: 'C' },
    { text: '오래 끌어온 그 일을 끝까지 마친다.', tag: 'C' },
    { text: '사소한 모순을 알아채고 몇 년 뒤에도 기억한다.', tag: 'C' },
    { text: '일정과 준비를 맡으면 모두가 신뢰하는 친구가 된다.', tag: 'C' },
    { text: '생각하는 것보다 말은 적게 하고, 입을 열 때는 신중하다.', tag: 'C' },
    { text: '같은 건물 모든 층의 이웃을 그들의 장보기 습관으로 알아본다.', tag: 'E' },
    { text: '큰 파티 대신 정성껏 꾸린 작은 모임을 연다.', tag: 'E' },
    { text: '낯선 사람을 기존 친구 모임에 부드럽게 데려온다.', tag: 'E' },
    { text: '모퉁이 가게의 단골들과 수십 년 동안 같은 이야기를 이어간다.', tag: 'E' },
    { text: '모임이 사라졌어야 할 시점이 한참 지난 뒤에도, 다시 불러 모으는 사람이 된다.', tag: 'E' },
    { text: '짧고 구체적인 메시지로 대륙을 가로지른 친구들과 연락을 이어간다.', tag: 'A' },
    { text: '장례식과 결혼식이 끝날 때마다 손글씨로 쓴 카드를 보낸다.', tag: 'A' },
    { text: '부모를 돌보지만 그것을 이야기로 만들지 않는다.', tag: 'A' },
    { text: '가족 안에서 감정을 풀어 옮기는 역할을 맡게 된다.', tag: 'A' },
    { text: '너무 자주 "그래"라고 했지만, 천천히 "아니"를 배워 대체로 해낸다.', tag: 'A' },
    { text: '스스로 인정하는 것보다 더 많이 사람들을 걱정한다.', tag: 'N' },
    { text: '작은 대화 한 번을 머릿속에서 며칠씩 되감아 본다.', tag: 'N' },
    { text: '일곱 살부터 지녀온 두려움 하나를 조용히 어른의 삶까지 데려간다.', tag: 'N' },
    { text: '누구에게도 알리지 않는, 자기 기분만을 위한 사적인 단어들을 만들어 간다.', tag: 'N' },
    { text: '자전거든 문장이든 관계든, 어느 한 가지 고치는 일에 점점 끌리게 된다.', tag: 'O' },
    { text: '서른이 넘어, 자신은 결코 좋아하지 않을 거라 여겼던 운동에 빠진다.', tag: 'athletic' },
    { text: '혼자서 먼 길을 걷는 일을 자기 성격의 일부라 여긴다.', tag: 'athletic' },
    { text: '같은 사람들에게 같은 다섯 가지 음식을, 여러 해 동안 잘 만들어 내놓는다.', tag: 'C' },
    { text: '어느 공원 한구석에 자기 자리라 여기는 곳이 있다.', tag: 'O' },
    { text: '한 악기는 서툴게, 다른 하나는 능숙하게 배우고, 어느 쪽이 어느 쪽인지 누구에게도 말하지 않는다.', tag: 'O' },
    { text: '세상을 떠난 사람들이 남긴 음성 메시지를 지우지 않고 간직한다.', tag: 'A' },
    { text: '조부모의 필체를 한눈에 알아본다.', tag: 'A' },
    { text: '지난 일에서 손을 뗐다는 걸 증명하려고 세 가지를 새로 시작하고, 그것을 "흐름을 따르는 것"이라 부른다.', tag: 'OC-tension' },
    { text: '한밤중에 부엌을 새로 정리해 놓고는, 그 뒤로 일 년 동안 커민을 어디에 뒀는지 잊어버린다.', tag: 'OC-tension' },
    { text: '모두가 좋아한 저녁식사를 차려놓고, 몇 주 동안 감사 인사 메시지에 답하지 않는다 — 스스로에게는 "충전 중"이라 말한다.', tag: 'EN-tension' },
    { text: '사람들을 한자리에 모으는 친구가 되지만, 그 뒤 이 주 동안은 사라져 회복한다.', tag: 'EN-tension' },
    { text: '불안을 줄이려 빈틈없이 계획을 세우고는, 그 계획이 너무 빡빡하다고 원망하며 "그저 꼼꼼한 것뿐"이라 말한다.', tag: 'CO-rigidity' },
    { text: '십 년 동안 같은 아침 루틴을 지키다가, 그것을 바꿔야 했던 일주일에 깊이 못마땅해한다.', tag: 'CO-rigidity' },
    { text: '감당할 수 없는 부탁에 "그래"라고 답하면서, 일 년 내내 "이번 한 번뿐"이라 자기에게 말한다.', tag: 'AN-pleaser' },
    { text: '동료가 힘든 한 주를 대신 메워주다가 그 일이 이 년이 되고, 본인은 괜찮다고 우긴다.', tag: 'AN-pleaser' },
    { text: '결국 두 권의 노트를 갖게 된다 — 실제로 마칠 계획을 적는 것 하나, 사실은 기분일 뿐인 계획을 적는 것 하나.', tag: 'OC-tension' },
    { text: '마흔이 되면 자기만 해독할 수 있는 체계로 집안을 굴린다 — 배우자는 그 논리를 묻기를 그만두고, 무언가를 찾는 데 매번 한 시간을 더 잡아둔다.', tag: 'OC-tension' },
    { text: '한 번의 저녁이 다음 저녁으로, 또 다음 저녁으로 이어지는 사이, 감사 메시지는 식사의 일부이지 청구서가 아니라는 사실을 배우게 된다.', tag: 'EN-tension' },
    { text: '두 번째 번아웃 이후 손님을 부르길 그만둔다 — 그 긴 식탁은 차고에 구 년 동안 놓여 있다가 이웃에게 공짜로 넘어간다.', tag: 'EN-tension' },
    { text: '둘을 번갈아 쓰는 법을 익힌다 — 필요한 일에는 빈틈없는 계획을, 즐기고 싶은 시간에는 즉흥을. 후자를 "쉼"이라 부르는 데 더는 머뭇거리지 않는다.', tag: 'CO-rigidity' },
    { text: '쉰이 되면 평일은 빈틈없는 블록으로 채우고, 주말은 일부러 비워둔다 — 그 빈자리를 메우고 싶어 한 누군가에게는 여전히 한마디 미안하다고 해야 한다.', tag: 'CO-rigidity' },
    { text: '모든 일에 "그래"라고 답하던 힘든 한 해를 보낸 뒤, "조금 생각해 볼게"라고 말하는 법을 익히고 — 정말로 생각하게 된다. 남는 우정은 인내심 있는 것들뿐이다.', tag: 'AN-pleaser' },
    { text: '십 년 동안 모두를 대신 떠받치며 살아간 끝에, 사십 대 어느 날 잠으로도 풀리지 않는 피로 속에서 일어나, 천천히 조용히 일부러 사람들을 실망시키기 시작한다.', tag: 'AN-pleaser' },
    { text: '서른일곱에 아무도 부탁하지 않았고 아무도 원하지 않는 일을 끝낸다 — 그래도 그 바인더를 높은 선반에 올려두고, 일 년에 두 번씩 꺼내 본다.', tag: 'OC-tension' },
    { text: '쉰이 넘으면 한 달에 일요일 한 번, 여덟 명, 같은 시각에 손님을 맞는다 — 다른 일요일에는 전화를 받지 않고, 그 여덟 사람도 그 규칙을 익히게 된다.', tag: 'EN-tension' },
    { text: '아침 일곱 시에 부엌이 필요한 배우자를 위해 아침 루틴을 바꾼다 — 일 년은 못마땅해하고, 나중엔 신경 쓰지 않게 되고, 마침내 예전 습관이 있었다는 사실조차 잊는다.', tag: 'CO-rigidity' },
    { text: '이십 대 후반, 한 번 너무 많이 도와주겠다고 답한 그 일이 몇 년 동안 부담으로 남는다 — 시간이 지나서야 정작 그 친구는 처음부터 "그래"를 기대조차 하지 않았음을 알게 된다.', tag: 'AN-pleaser' },
    { text: '곁다리 작업 목록을 늘 갖고 있다. 작은 것은 대체로 마무리하고, 큰 둘은 그냥 흘러가게 둔다.', tag: 'OC-mild' },
    { text: '집의 방 하나를 공들여 손보고, 마감재 작업은 일 년 동안 손대지 않고 둔다.', tag: 'OC-mild' },
    { text: '한 달에 한 번 손님을 초대해 저녁을 차리고, 그 뒤 이틀은 조용히 보낸다.', tag: 'EN-mild' },
    { text: '친구들과 보내는 토요일을 좋아하고, 일요일은 통째로 자기 자신을 위해 비워둔다.', tag: 'EN-mild' },
    { text: '같은 카페에서 같은 커피를 몇 년이고 주문하고, 바리스타가 바뀌면 알아본다.', tag: 'CO-mild' },
    { text: '일정의 사소한 변동을 피해 돌아가면서, 별로 신경 쓰이지 않았다고 자기에게 말한다.', tag: 'CO-mild' },
    { text: '모두가 가고 싶어 하는 듯한 식당을 고르고, 끝난 뒤에야 가볍게 자기는 어디가 더 좋았는지 말한다.', tag: 'AN-mild' },
    { text: '입 밖에 내지 않은 작은 서운함을 한 주쯤 품다가, 대체로 흘려보낸다.', tag: 'AN-mild' }
  ],
  tr: [
    { text: 'Birinciyi bitirmeden üç işe birden başlar; bununla yaşamayı öğrenir.', tag: 'O' },
    { text: 'Müziğin belirli bir döneminin sessiz, uzun süreli takipçisi olur.', tag: 'O' },
    { text: 'Kulağına çalınan cümleleri yazdığı bir defter taşır.', tag: 'O' },
    { text: 'Yavaş okur, başladığının çoğunu bitirir, küçük cümleleri yıllarca aklında tutar.', tag: 'O' },
    { text: 'Hiç göndermeyeceği insanlara mektup yazdığı bir dönem yaşar.', tag: 'O' },
    { text: 'Eliyle bir şey yapar; aile onu on yıllar boyunca saklar.', tag: 'O' },
    { text: 'Yetişkinlikte çocukluk hevesine eskisinden çok daha ciddi biçimde döner.', tag: 'O' },
    { text: 'Her şeyi sessizce planlar, sonra kimseye söylemeden yapar.', tag: 'C' },
    { text: 'Masa çekmecesini, ev arkadaşlarını şaşırtacak kadar düzenli tutar.', tag: 'C' },
    { text: 'O uzun işi sonuna kadar bitirir.', tag: 'C' },
    { text: 'Ufak tutarsızlıkları fark eder, yıllar sonra bile hatırlar.', tag: 'C' },
    { text: 'Herkesin lojistik konusunda güvendiği arkadaş olur.', tag: 'C' },
    { text: 'Düşündüğünden azını söyler; söylediğinde de dikkatle söyler.', tag: 'C' },
    { text: 'Apartmanda her kattaki herkesi, market alışkanlıklarından tanır.', tag: 'E' },
    { text: 'Büyük partiler yerine küçük, özenle hazırlanmış buluşmalar düzenler.', tag: 'E' },
    { text: 'Tanımadığı insanları, mevcut arkadaş grubuna nazikçe katar.', tag: 'E' },
    { text: 'Köşedeki dükkanın aynı müdavimleriyle onlarca yıl konuşur.', tag: 'E' },
    { text: 'Dağılmış olması gereken buluşmaları yıllar sonra bile yeniden toplayan kişi olur.', tag: 'E' },
    { text: 'Kıtaların ötesindeki arkadaşlarıyla kısa, somut mesajlarla bağını korur.', tag: 'A' },
    { text: 'Her cenaze ve her düğünden sonra elle yazılmış bir kart gönderir.', tag: 'A' },
    { text: 'Bir ebeveynine bakar, ama bunu hikâyeye dönüştürmez.', tag: 'A' },
    { text: 'Ailenin duygusal tercümanı olarak konumlanır.', tag: 'A' },
    { text: 'Çok sık "evet" der; yavaş yavaş "hayır"ı öğrenir, çoğunlukla başarır.', tag: 'A' },
    { text: 'Etrafındaki insanlar için, kabul ettiğinden çok daha fazla endişelenir.', tag: 'N' },
    { text: 'Küçük bir konuşmayı günlerce kafasında tekrarlar.', tag: 'N' },
    { text: 'Yedi yaşında edindiği bir korkuyu sessizce yetişkinliğine taşır.', tag: 'N' },
    { text: 'Kimseyle paylaşmadığı ruh halleri için kendine özel bir sözlük geliştirir.', tag: 'N' },
    { text: 'Bisikletler, cümleler, ilişkiler — onarım işlerinden birine giderek tutkuyla bağlanır.', tag: 'O' },
    { text: 'Otuzlarında, sevmeyeceğini sandığı bir sporun peşine düşer.', tag: 'athletic' },
    { text: 'Yalnız uzun yürüyüşler yapar ve bunu bir karakter özelliği sayar.', tag: 'athletic' },
    { text: 'Aynı beş yemeği, aynı çevreye, yıllarca özenle pişirir.', tag: 'C' },
    { text: 'Belirli bir parkta, kendisininki saydığı bir köşesi vardır.', tag: 'O' },
    { text: 'Bir enstrümanı kötü, başka birini iyi öğrenir; hangisinin hangisi olduğunu kimseye söylemez.', tag: 'O' },
    { text: 'Hayatını kaybetmiş insanların sesli mesajlarını silmeden saklar.', tag: 'A' },
    { text: 'Büyükanne ve büyükbabasının el yazısını ilk bakışta tanır.', tag: 'A' },
    { text: 'Öncekiyle işinin bittiğini kanıtlamak için üç yeni işe başlar ve buna "enerjinin peşinden gitmek" der.', tag: 'OC-tension' },
    { text: 'Gecenin bir vakti mutfağı baştan düzenler, sonra kimyonu nereye koyduğunu bir yıl boyunca bulamaz.', tag: 'OC-tension' },
    { text: 'Herkesin sevdiği bir yemeği verir, sonra haftalarca teşekkür mesajlarından kaçar; kendine "şarj oluyorum" der.', tag: 'EN-tension' },
    { text: 'İnsanları bir araya getiren arkadaş olur, sonra iki hafta ortadan kaybolup toparlanır.', tag: 'EN-tension' },
    { text: 'Daha az kaygı duymak için her şeyi titizlikle planlar, sonra planın fazla katı olmasına içerlenir; buna "sadece dikkatli olmak" der.', tag: 'CO-rigidity' },
    { text: 'On yıl boyunca aynı sabah rutinini sürdürür, onu değiştirmek zorunda kaldığı tek bir haftaya içerlenir.', tag: 'CO-rigidity' },
    { text: 'Karşılayamayacağı iyilikleri kabul eder; kendine "sadece bu seferlik" der, bir yıl boyunca.', tag: 'AN-pleaser' },
    { text: 'Bir iş arkadaşının kötü bir haftasını üstlenir, sonra iki yıl boyunca onun yerine durur; "Hiç umurumda değil" der durur.', tag: 'AN-pleaser' },
    { text: 'Sonunda iki defter taşır olur: bitireceği işler için biri, aslında sadece bir ruh hali olanlar için diğeri.', tag: 'OC-tension' },
    { text: 'Kırklarına geldiğinde ev hayatını yalnızca kendi okuyabildiği bir sistemle yönetir; partneri mantığını sormayı bırakmış, bir şey aramak için bir saat fazladan ayırmaya başlamıştır.', tag: 'OC-tension' },
    { text: 'Bir akşam yemeği bir başkasına, sonra bir başkasına dönüşür; bu yolda öğrenir ki teşekkür mesajları yemeğin bir parçasıdır, faturası değil.', tag: 'EN-tension' },
    { text: 'İkinci tükenmenin ardından evde toplantıları bırakır; uzun masayı garajda dokuz yıl tutar, sonra komşusuna bedavaya verir.', tag: 'EN-tension' },
    { text: 'Geçiş yapmayı öğrenir: gereken işler için sıkı plan, keyif almak istediği şeyler için doğaçlama; ikincisine çekinmeden "dinlenme" der.', tag: 'CO-rigidity' },
    { text: 'Ellisinde takvimi sıkı bloklarla, hafta sonlarını ise kasıtlı boşluklarla kurar; o boşluklar, doldurmak isteyen birine hâlâ bir özür borçludur.', tag: 'CO-rigidity' },
    { text: 'Her şeye "evet" dediği zorlu bir yılın ardından "düşüneyim" demeyi öğrenir — ve gerçekten düşünür; geride kalan dostluklar, sabırlı olanlardır.', tag: 'AN-pleaser' },
    { text: 'On yıl herkesin yerine durur; kırklarında uykunun gideremediği bir yorgunlukla uyanır ve yavaş yavaş, sessizce, bilerek insanları hayal kırıklığına uğratmaya başlar.', tag: 'AN-pleaser' },
    { text: 'Otuz yedisinde kimsenin istemediği, kimsenin sormadığı bir projeyi tamamlar; klasörü yine de en üst rafa kaldırır ve yılda iki kere bakar.', tag: 'OC-tension' },
    { text: 'Ellilerinde ayda bir pazar, sekiz kişi, hep aynı saatte misafir kabul eder; diğer pazarlar telefonu açmaz ve o sekiz kişi bu kuralı zamanla öğrenir.', tag: 'EN-tension' },
    { text: 'Sabah yedide mutfağa ihtiyaç duyan bir partner için sabah rutinini değiştirir; bir yıl içerlenir, sonra fark etmez olur, sonunda eski rutinin var olduğunu bile unutur.', tag: 'CO-rigidity' },
    { text: 'Yirmilerinin sonunda kabul etmemesi gereken bir iyiliğe "evet" der; bedelini yıllarca taşır, çok sonra anlar ki o arkadaş aslında en başından "evet" beklemiyordu.', tag: 'AN-pleaser' },
    { text: 'Sürekli güncel tuttuğu bir yan iş listesi vardır; küçüklerin çoğunu bitirir, büyük olan ikisinin akıp gitmesine izin verir.', tag: 'OC-mild' },
    { text: 'Evin bir odasını özenle yeniler, ardından süpürgelik ve pervaz işini bir yıl boyunca bitmemiş halde bırakır.', tag: 'OC-mild' },
    { text: 'Ayda bir akşam yemeği verir; sonrasında iki gün sessiz kalır.', tag: 'EN-mild' },
    { text: 'Cumartesinin tamamını arkadaşlarıyla geçirmeyi sever, ardından pazarı bütünüyle kendine ayırır.', tag: 'EN-mild' },
    { text: 'Yıllarca aynı kafede aynı kahveyi söyler; baristanın değiştiğini fark eder.', tag: 'CO-mild' },
    { text: 'Programdaki küçük bir değişikliği dolanıp geçer, sonra kendine bunun canını sıkmadığını söyler.', tag: 'CO-mild' },
    { text: 'Herkesin gitmek ister gibi göründüğü restoranı seçer; sonrasında, hafifçe, aslında nereyi tercih ettiğini söyler.', tag: 'AN-mild' },
    { text: 'Dile getirilmemiş küçük bir kırgınlığı bir hafta kadar taşır; ardından çoğunlukla bırakır.', tag: 'AN-mild' }
  ]
};

// Specific small life-events. Grounded register — these read like things a
// real person carries forward, not internet jokes.
const RANDOM_EVENTS = {
  en: [
    'Inherits a habit from a grandparent they never met.',
    'Laughs the same way a great-aunt did, without ever having heard her.',
    'Goes through a phase of writing in a notebook every night, age 11.',
    'Becomes a careful left-hander in a family of careful right-handers.',
    'Develops one strong preference about food they will never explain.',
    'Forms an unusually close attachment to a particular old sweater.',
    'Carries a memory from age 4 that the family doesn\'t remember.',
    'Picks up the rhythm of a parent\'s walk without noticing.',
    'Learns a song from a great-grandparent\'s funeral and hums it for years.',
    'Develops a quiet ritual around bedtime that they keep into adulthood.',
    'Has a recurring dream they don\'t mention to anyone.',
    'Becomes the keeper of a family object no one else wanted.',
    'Has an early friendship that re-emerges, unexpectedly, at 32.',
    'Saves something small from every place they live.',
    'Carries one phrase from a teacher for the rest of their life.',
    'Repeats one word strangely between ages 3 and 5, then stops.',
    'Develops a small, specific fear that never fully resolves.',
    'Holds onto a particular smell as the texture of home.'
  ],
  zh: [
    '继承了一位素未谋面的祖辈的习惯。',
    '笑起来和某位姑婆一模一样,却从未听过她的笑声。',
    '十一岁那年,有一段每晚都写日记的时期。',
    '在一群细心的右撇子之间,成了一位细心的左撇子。',
    '对某种食物有一种自己永远不会解释的强烈偏好。',
    '与某件旧毛衣建立了一种异乎寻常的亲近感。',
    '把四岁的一段记忆带在身边,而家人都已经忘了。',
    '不知不觉间走路的节奏与父母一致。',
    '在曾祖父母的葬礼上学会了一首歌,此后哼唱了许多年。',
    '形成一种安静的就寝小仪式,一直保持到成年。',
    '有一个反复出现的梦,从不向任何人提起。',
    '成了一件没人想要的家族物件的守护者。',
    '童年的一段友情,在三十二岁时出乎意料地重新出现。',
    '每个住过的地方,都留下一件小小的纪念物。',
    '一辈子都记着老师说过的一句话。',
    '三到五岁之间总是奇怪地重复一个词,然后突然不再说了。',
    '形成一种细小而具体的恐惧,从未真正消失。',
    '把某种特定的气味,当作"家"的质地。'
  ],
  ja: [
    '会ったことのない祖父母から、ある癖を受け継ぐ。',
    '大叔母と同じ笑い方をする——その笑い声を聞いたこともないのに。',
    '十一歳の頃、毎晩ノートに何か書く時期がある。',
    '几帳面な右利きの家族のなかで、几帳面な左利きとして育つ。',
    '食べ物に関するある強い好みを持つようになるが、その理由を誰にも説明しない。',
    'ある古いセーター一着と、不思議なほど深い愛着を結ぶ。',
    '家族の誰も覚えていない、四歳のときのある記憶を持ち続けている。',
    '気づかないうちに、親の歩き方のリズムを真似ている。',
    '曾祖父母の葬式で覚えた歌を、何年も口ずさみ続ける。',
    '寝る前にする静かな小さな儀式を、大人になっても守り続ける。',
    '誰にも話さない、繰り返し見る夢がある。',
    '誰も欲しがらなかった家族の品の、守り手になる。',
    '幼いころの友情が、三十二歳のときに思いがけず再び現れる。',
    '暮らした場所ごとに、小さな何かを残しておく。',
    'ある先生の言葉ひとつを、生涯にわたって心に留めている。',
    '三歳から五歳のあいだ、ある一つの言葉を奇妙に繰り返し、ある日ふと言わなくなる。',
    'ある小さく、はっきりとした恐れを抱き、それが完全に消えることはない。',
    'ある特定のにおいを「家の手触り」として、ずっと胸に抱え続ける。'
  ],
  ko: [
    '한 번도 만난 적 없는 조부모에게서 습관 하나를 물려받는다.',
    '한 번도 들어본 적 없는 큰이모와 똑같은 방식으로 웃는다.',
    '열한 살 무렵, 매일 밤 공책에 무언가를 적던 시기가 있었다.',
    '꼼꼼한 오른손잡이들 사이에서 꼼꼼한 왼손잡이가 된다.',
    '음식에 대한 강한 취향 하나를 갖게 되지만, 결코 이유를 설명하지 않는다.',
    '어느 낡은 스웨터 한 벌에 유난히 깊은 애착을 갖게 된다.',
    '가족 누구도 기억하지 못하는 네 살 적의 한 기억을 간직한다.',
    '자기도 모르게 부모의 걸음 리듬을 따라가게 된다.',
    '증조부모의 장례식에서 들은 노래 하나를 몇 년 동안 흥얼거린다.',
    '잠들기 전에 행하는 조용한 의식 하나를 어른이 되어서도 지킨다.',
    '누구에게도 말하지 않는 되풀이되는 꿈이 있다.',
    '아무도 원하지 않았던 가족의 물건을 지키는 사람이 된다.',
    '어린 시절의 우정이 서른두 살에 뜻밖에 되살아난다.',
    '살았던 모든 장소에서 작은 무언가를 한 가지씩 간직한다.',
    '어느 선생님의 한 마디를 평생 가슴에 새긴다.',
    '세 살부터 다섯 살 사이, 한 단어를 이상하게 반복하다가 어느 날 그만둔다.',
    '작고 구체적인 두려움 하나가 끝내 완전히 사라지지 않는다.',
    "어느 특정한 냄새를 '집의 결'로 간직한다."
  ],
  tr: [
    'Hiç tanışmadığı bir büyük ebeveynden bir alışkanlık devralır.',
    'Hiç sesini duymadığı bir büyük teyzesi gibi güler.',
    'On bir yaşında, her gece bir deftere yazdığı bir dönem yaşar.',
    'Titiz sağ ellilerden oluşan bir ailede, titiz bir sol elli olur.',
    'Asla açıklamayacağı, yiyeceğe dair güçlü bir tercihi olur.',
    'Belirli bir eski kazağa olağandışı bir bağlılık geliştirir.',
    'Ailesinin hatırlamadığı, dört yaşındaki bir anıyı yıllarca taşır.',
    'Farkına varmadan ebeveyninin yürüyüş ritmini benimser.',
    'Büyük büyükanne ya da büyükbabasının cenazesinde duyduğu bir şarkıyı yıllarca mırıldanır.',
    'Yatmadan önce kendine sessiz bir ritüel oluşturur ve yetişkinliğe taşır.',
    'Kimseye anlatmadığı, tekrar eden bir rüyası vardır.',
    'Kimsenin istemediği bir aile eşyasının bekçisi olur.',
    'Erken çocukluk arkadaşlığı, otuz iki yaşında beklenmedik biçimde geri döner.',
    'Yaşadığı her yerden küçük bir hatıra alır.',
    'Bir öğretmeninden duyduğu bir cümleyi ömür boyu taşır.',
    'Üç ile beş yaş arasında bir kelimeyi tuhaf biçimde tekrarlar, sonra bırakır.',
    'Küçük, belirli bir korku geliştirir; bu korku asla tam olarak geçmez.',
    'Belirli bir kokuyu evin dokusu olarak hep yanında taşır.'
  ]
};

const FUN_NAMES = [
  'Avery','Bea','Cyrus','Dax','Echo','Fern','Gus','Hazel','Iris','Juno',
  'Kai','Lior','Mika','Nia','Onyx','Paz','Quill','Rune','Sage','Tabor',
  'Una','Vesper','Wren','Xander','Yuki','Zane','Cleo','Soren','Mae','Pax',
  'Theo','Ada','Indigo','Marlow','Lior','Rio','Saskia','Beck','Tova','Lev'
];

/* ---------- Environmental factors ----------
 * Nurture sliders that visibly nudge fictional outcomes. The whole point of
 * having this panel is to make the "genes aren't destiny" message visible:
 * the same baby grows up differently depending on these knobs.
 */
const ENV_FIELDS = [
  { key: 'family',       label: 'Supportive family',         min: 1, max: 10, def: 7 },
  { key: 'education',    label: 'Educational access',        min: 1, max: 10, def: 7 },
  { key: 'economy',      label: 'Economic stability',        min: 1, max: 10, def: 6 },
  { key: 'healthcare',   label: 'Healthcare access',         min: 1, max: 10, def: 7 },
  { key: 'social',       label: 'Social pressure',           min: 1, max: 10, def: 5 },
  { key: 'internet',     label: 'Internet exposure',         min: 1, max: 10, def: 6 },
  { key: 'multilingual', label: 'Multilingual upbringing',   min: 1, max: 10, def: 4 },
  { key: 'urbanRural',   label: 'Urban (1) ↔ Rural (10)',    min: 1, max: 10, def: 5 }
];

/* ---------- Ethics Mode pools ---------- */

const REFLECTION_PROMPTS = {
  en: [
    'Why did you prioritize this particular trait?',
    'Who decides which traits are "desirable"?',
    'Would society pressure parents into enhancement?',
    'What might be lost if everyone optimized the same traits?',
    'Are the trade-offs you accepted worth it?',
    'What if this child grows up wanting different traits than you chose?',
    'How would access to choices like these affect inequality?',
    'Whose definition of "better" did you use?',
    "What can't these sliders measure?",
    'Does choosing imply rejecting?',
    'Would the same baby in a different country be seen the same way?',
    'Is "average" a thing to design away from — or back toward?',
    'If this child later asked, "why did you make me this way?" — what would you say?',
    'Whose ideas of a "good life" are you smuggling in with each slider?',
    "Would you be okay being someone else's design?",
    'What kind of imperfection are you quietly editing out?',
    "Who gets to opt out — and who doesn't?",
    'Are you choosing for the child, or for the parent you want to be?',
    'Which traits are you assuming will stay good across their whole life?',
    'Whose grandparents shaped what you call "normal" today?'
  ],
  zh: [
    '你为何把这一项特征放在第一位?',
    '谁来决定哪些特征是"值得拥有的"?',
    '社会会不会把父母推向增强这条路?',
    '如果所有人都优化同样的特征,什么会被悄悄丢掉?',
    '你接受的那些取舍,真的值得吗?',
    '如果这孩子长大后想要的,与你选的不一样,怎么办?',
    '当这种选择只对部分人开放时,它会如何加剧不平等?',
    '你用的是谁定义的"更好"?',
    '这些滑块测不到的,是什么?',
    '做出选择,是否就意味着放弃了别的?',
    '同一个孩子在另一个国家,会被同样看待吗?',
    '"普通"是要被设计走开的东西,还是要回归的东西?',
    '若这孩子日后问"你为什么把我造成这样",你会怎么回答?',
    '每一个滑块里,你都偷偷夹带了谁眼中的"好生活"?',
    '你愿意自己是别人设计出来的吗?',
    '你正在悄悄删去的是哪一种不完美?',
    '谁有权说"我退出",而谁没有?',
    '你是在为孩子选择,还是在为你想成为的那种父母选择?',
    '你默认哪些特征,会一辈子都是优点?',
    '今天你所谓的"正常",是被谁的祖辈塑造出来的?'
  ],
  ja: [
    'なぜその特性を、ほかではなくその特性を優先したのですか。',
    '何が「望ましい」特性なのか、誰が決めるのでしょう。',
    '社会は親に、強化を促す圧をかけるでしょうか。',
    'みなが同じ特性を最適化したら、何が失われるでしょう。',
    'あなたが受け入れたその取り引きは、本当に見合ったものですか。',
    'この子が、あなたの選んだのとは違う特性を望んで育ったら。',
    'こうした選択へのアクセスは、不平等をどう形作るでしょう。',
    '誰の定義する「より良い」を、あなたは使いましたか。',
    'これらのスライダーが測れないものは、何でしょう。',
    '選ぶことは、何かを退けることになりますか。',
    '同じ子を別の国で見たら、同じように見られるでしょうか。',
    '「平均」は遠ざけるべきもの? それとも、戻るべきもの?',
    'もしこの子が後に「なぜ私をこう作ったの」と尋ねたら、何と答えますか。',
    'スライダーごとに、誰の考える「よい人生」を、こっそり混ぜていますか。',
    'あなた自身が、誰かの設計物であったら受け入れられますか。',
    'あなたが静かに編集して消そうとしているのは、どんな不完全さですか。',
    '抜け出せる人は誰で、抜け出せない人は誰ですか。',
    '子のために選んでいますか、それともなりたい親のために選んでいますか。',
    'どの特性は一生「よいまま」だと、暗黙のうちに見なしていますか。',
    'いま「普通」と呼んでいるものを形作ったのは、誰の祖父母たちでしょう。'
  ],
  ko: [
    '왜 하필 그 특성을 우선했나요?',
    '어떤 특성이 "바람직"한지는 누가 결정하나요?',
    '사회는 부모를 강화 쪽으로 떠밀까요?',
    '모두가 같은 특성을 최적화한다면 무엇이 사라질까요?',
    '받아들인 그 거래는 정말 가치 있는 것이었나요?',
    '이 아이가 자라서 당신이 고른 것과 다른 특성을 원하게 된다면요?',
    '이런 선택지에 대한 접근은 불평등을 어떻게 빚을까요?',
    '"더 낫다"는 누구의 정의를 따른 것인가요?',
    '이 슬라이더들이 측정하지 못하는 것은 무엇인가요?',
    '선택한다는 것은 무언가를 거부한다는 뜻이기도 한가요?',
    '같은 아이가 다른 나라에서도 같은 시선으로 보일까요?',
    '"평균"이란 멀어져야 할 무엇인가요, 아니면 다시 돌아가야 할 무엇인가요?',
    '훗날 이 아이가 "왜 나를 이렇게 만들었어요"라고 묻는다면 뭐라 답할 건가요?',
    '슬라이더마다 누구의 "좋은 삶"이 슬며시 들어가 있나요?',
    '당신은 누군가의 설계물로 살 수 있겠습니까?',
    '당신이 조용히 지워내고 있는 불완전함은 어떤 종류인가요?',
    '누구는 빠질 수 있고, 누구는 빠질 수 없게 될까요?',
    '아이를 위해 고르는 건가요, 되고 싶은 부모를 위해 고르는 건가요?',
    '평생 "좋은 것"으로 남아 있을 거라고 전제하는 특성은 어떤 것인가요?',
    '오늘 당신이 "정상"이라 부르는 것은 누구의 조부모들이 빚어 놓은 것일까요?'
  ],
  tr: [
    'Neden başka değil de bu özelliği önceliklendirdin?',
    'Hangi özelliklerin "arzu edilir" olduğuna kim karar veriyor?',
    'Toplum ebeveynleri geliştirmeye doğru iter mi?',
    'Herkes aynı özellikleri optimize ederse ne kaybolur?',
    'Kabul ettiğin ödünleşimler buna değer mi?',
    'Bu çocuk büyüyüp senin seçtiğinden başka özellikler isterse ne olur?',
    'Böyle seçeneklere erişim eşitsizliği nasıl şekillendirir?',
    '"Daha iyi" tanımı kime ait?',
    'Bu sürgüler neyi ölçmüyor?',
    'Seçmek, başka şeyleri reddetmek anlamına da gelir mi?',
    'Aynı çocuk başka bir ülkede aynı gözle görülür müydü?',
    '"Ortalama" uzaklaşılacak bir şey mi, yoksa geri dönülecek bir şey mi?',
    'Bu çocuk ileride "beni neden böyle yaptın" diye sorsa ne dersin?',
    'Her sürgüye, hangi "iyi yaşam" tasavvurunu sessizce sıkıştırıyorsun?',
    'Başkasının tasarımı olmaktan rahat eder miydin?',
    'Sessizce sildiğin, hangi tür kusur?',
    'Vazgeçme hakkı kime tanınacak, kime tanınmayacak?',
    'Çocuk için mi seçiyorsun, yoksa olmak istediğin ebeveyn için mi?',
    'Hangi özelliklerin bir ömür boyu iyi kalacağını varsayıyorsun?',
    'Bugün "normal" dediğin şeyi kimin büyükanne-büyükbabaları biçimlendirdi?'
  ]
};

/* Context-anchored Pause Panel prompts. Picked deterministically per codename
 * so the reflection question lands on ONE of the 4 contexts the user just
 * saw in the Inner Cohort grid (work / family / late / beloved). Keys match
 * INNER_COHORT_CONTEXTS[].key. Each prompt asks the user to reconcile this
 * baby's profile with the specific situated self they just read. */
const PAUSE_PROMPTS_BY_CONTEXT = {
  work: {
    en: ['The work self you just read — does this profile describe the person who actually shows up?', 'Which of these traits would the work self never claim out loud?', 'At work, which line of this profile do they spend the day quietly editing?'],
    zh: ['你刚才读到的那个"工作中的自己"——这份特征档案,真的描绘的是那个真正到场的人吗?', '哪一项特征,是工作中的自己永远不会大声承认的?', '在工作里,这份档案里的哪一行,他们一整天都在悄悄修改?'],
    ja: ['いま読んだ仕事中の自分——このプロフィールは、本当にその場に現れている人を描けていますか。', 'これらの特性のうち、仕事中の自分が決して声に出して認めないものは、どれでしょう。', '仕事のあいだ、このプロフィールのどの一行を、彼らは一日かけて静かに書き直していますか。'],
    ko: ['방금 읽은 일터에서의 자기 — 이 프로필은 실제로 그곳에 나타나는 사람을 묘사하고 있나요?', '이 특성들 가운데 일터의 자기가 결코 입 밖으로 인정하지 않을 것은 어느 것인가요?', '일터에서 이 프로필의 어느 한 줄을, 그들은 하루 종일 조용히 고쳐 쓰고 있나요?'],
    tr: ['Az önce okuduğun iş yerindeki hâli — bu profil, oraya gerçekten gelen kişiyi mi anlatıyor?', 'Bu özelliklerden hangisini, iş yerindeki hâli yüksek sesle asla sahiplenmez?', 'İşte, bu profilin hangi satırını gün boyu sessizce yeniden yazıyorlar?']
  },
  family: {
    en: ['Back in the family of origin, which of these traits loses the argument before it starts?', 'Who in their family would read this profile and not recognize the person in it?', 'Which of these traits did the family of origin spend years rounding down?'],
    zh: ['回到原生家庭里,这些特征中,哪一项还没开口就已经输掉了那场争论?', '家里有谁,会读着这份特征档案,却认不出里面写的那个人?', '哪一项特征,是原生家庭花了很多年,一点一点往下削的?'],
    ja: ['生まれた家族のもとに戻ったとき、これらの特性のうち、口を開く前から負けが決まっているのはどれですか。', '家族の中で、このプロフィールを読んでも、そこに描かれている人を見つけられない人は誰でしょう。', 'これらの特性のうち、生まれた家族が何年もかけて削り落としてきたのは、どれですか。'],
    ko: ['원래 가족에게 돌아갔을 때, 이 특성들 가운데 시작하기도 전에 말다툼에서 지는 것은 어느 것인가요?', '가족 중 누가 이 프로필을 읽고도, 그 안에 담긴 사람을 알아보지 못할까요?', '이 특성들 가운데 원래 가족이 오랜 세월 깎아 내려온 것은 어느 것인가요?'],
    tr: ['Aslen ait olduğu ailenin yanına döndüğünde, bu özelliklerden hangisi daha tartışma başlamadan kaybeder?', 'Ailesinden kim, bu profili okuyup içindeki kişiyi tanıyamazdı?', 'Bu özelliklerden hangisini, aslen ait olduğu aile yıllarca aşağı yontmaya çalıştı?']
  },
  late: {
    en: ['Alone at 2am, which line of this profile do they argue with the longest?', 'At 2am, what do they know about themselves that no column in this grid had room for?', 'The 2am self — would they have arranged this profile in this order?'],
    zh: ['凌晨两点,一个人时,他们和这份档案里的哪一行,争辩得最久?', '在凌晨两点,他们对自己的某些了解,是这张表里没有任何一栏装得下的——那是什么?', '凌晨两点的那个自己——会把这份档案里的特征,按这样的顺序排列吗?'],
    ja: ['深夜二時、ひとりでいるとき、このプロフィールのどの一行と、いちばん長く言い合っていますか。', '深夜二時に、自分について知っているあれこれのうち、この表のどの列にも収まらないものは、何でしょう。', '深夜二時の自分なら、このプロフィールの特性を、この順に並べたでしょうか。'],
    ko: ['새벽 두 시, 혼자일 때 이 프로필의 어느 한 줄과 가장 오래 말다툼을 벌이나요?', '새벽 두 시, 자기 자신에 대해 아는 것들 가운데 이 표의 어느 칸에도 들어가지 않는 것은 무엇인가요?', '새벽 두 시의 자기라면, 이 프로필 속 특성들을 이런 순서로 배열했을까요?'],
    tr: ['Gecenin ikisinde, yalnızken, bu profilin hangi satırıyla en uzun tartışıyorlar?', 'Gecenin ikisinde kendileri hakkında bildiklerinin hangisine, bu tablonun hiçbir sütununda yer kalmamış?', 'Gecenin ikisindeki hâli, bu profildeki özellikleri bu sırayla mı dizerdi?']
  },
  beloved: {
    en: ['With someone they love, which of these traits shows up larger than the sliders predicted?', 'Who gets to see the parts of them this profile had to round down to a number?', 'Loved closely, which of these traits gets sharper, not softer?'],
    zh: ['与所爱之人在一起时,这些特征中,哪一项呈现出来,比滑块所预测的要更大?', '他们身上有些部分,这份档案不得不把它压扁成一个数字——而谁,才看得到那些部分?', '被亲近地爱着的时候,这些特征里,哪一项不是变柔,而是变得更锋利?'],
    ja: ['大切な人と一緒のとき、これらの特性のうち、スライダーが予測したよりも大きく現れるものは、どれですか。', 'このプロフィールが一つの数字へと丸めるしかなかった彼らの一部を、見ることを許されているのは、誰でしょう。', '近くで愛されているとき、これらの特性のうち、やわらぐのではなく、むしろ鋭くなるのは、どれですか。'],
    ko: ['사랑하는 사람과 함께일 때, 이 특성들 가운데 슬라이더가 예측했던 것보다 더 크게 나타나는 것은 어느 것인가요?', '이 프로필이 하나의 숫자로 반올림해 버려야 했던 그들의 일부 — 그것을 볼 수 있는 사람은 누구인가요?', '가까이서 사랑받을 때, 이 특성들 가운데 부드러워지는 것이 아니라 오히려 더 또렷해지는 것은 어느 것인가요?'],
    tr: ['Sevdiği biriyle birlikteyken, bu özelliklerden hangisi sürgülerin öngördüğünden daha büyük çıkar ortaya?', 'Bu profilin tek bir sayıya yuvarlamak zorunda kaldığı yanlarını, kim görmeye yetkili?', 'Yakından sevildiğinde, bu özelliklerden hangisi yumuşamaz da daha keskinleşir?']
  }
};

// Short interpretive observations about this specific baby. Shown in
// Reflection mode alongside the prompt so the ethics aren't a single
// tucked-away question.
const REFLECTION_OBSERVATIONS = {
  en: [
    'This person will be both more and less than these numbers suggest.',
    'Whoever this child becomes, they will not have been consulted on these settings.',
    'These sliders measured what was easy to measure. The rest is most of the person.',
    'Two children with identical numbers can live very different lives.',
    "Half of what shapes them isn't on any of these sliders, and never will be.",
    'A trait that reads as a strength at age 8 may read as a wound at 28.',
    "Optimization assumes a destination. There isn't one.",
    "Most of who this child becomes will arrive from outside the plan.",
    'Every "ideal" you encoded here was, somewhere, an ordinary preference.',
    'This child will love things you would never have chosen for them.'
  ],
  zh: [
    '这个人会比这些数字所示既多一些,也少一些。',
    '无论这孩子将成为谁,这些设定都不曾征求过他/她的意见。',
    '这些滑块测的是容易测的部分。剩下的,才是这个人的大半。',
    '数字完全相同的两个孩子,可以过着截然不同的人生。',
    '塑造他们的一半,都不在任何一个滑块上,也永远不会在。',
    '八岁时是优点的特征,二十八岁时,也可能是伤口。',
    '"优化"预设了一个终点。可是并没有终点。',
    '这孩子日后成为的样子,大半会从你的计划之外走进来。',
    '你在这里写进的每一个"理想",在某处,其实只是某人寻常的偏好。',
    '这孩子会爱上一些你从来不会替他/她选的东西。'
  ],
  ja: [
    'この人は、これらの数字が示すよりも多くを持ち、また少なくも持つでしょう。',
    'この子が誰になるにせよ、これらの設定について本人の意見は聞かれていません。',
    'スライダーは測りやすいものを測っただけです。残りこそが、この人の大半です。',
    '同じ数字を持つ二人の子が、まるで違う人生を生きることがあります。',
    'この子を形作るものの半分は、どのスライダーにも乗っておらず、これからも乗りません。',
    '8歳で長所だった特性が、28歳には傷として読み返されるかもしれません。',
    '最適化は到達点を前提とします。けれど、到達点はありません。',
    'この子がやがてなる姿の大半は、あなたの計画の外側から訪れます。',
    'ここに書き込まれたあらゆる「理想」は、どこかでは誰かのありふれた好みでした。',
    'この子は、あなたなら決して選ばないようなものを愛するでしょう。'
  ],
  ko: [
    '이 사람은 이 숫자들이 가리키는 것보다 더 많기도 하고, 더 적기도 할 것입니다.',
    '이 아이가 누가 되든, 이 설정들에 대해서는 누구도 그에게 물은 적이 없습니다.',
    '이 슬라이더들은 측정하기 쉬운 것만 측정했습니다. 나머지가 사실 그 사람의 대부분입니다.',
    '숫자가 똑같은 두 아이가 전혀 다른 삶을 살 수 있습니다.',
    '그를 빚어가는 절반은 어느 슬라이더에도 들어 있지 않고, 앞으로도 그러할 것입니다.',
    '8살에 강점으로 읽히던 특성이 28살에는 상처로 읽힐 수도 있습니다.',
    '최적화는 도달점을 가정합니다. 그러나 도달점은 없습니다.',
    '이 아이가 자라 무엇이 되든, 그 대부분은 당신의 계획 바깥에서 찾아옵니다.',
    '여기에 새긴 모든 "이상"은, 어딘가에서는 누군가의 평범한 취향이었습니다.',
    '이 아이는 당신이 결코 골라주지 않았을 것들을 사랑하게 될 것입니다.'
  ],
  tr: [
    'Bu kişi, bu sayıların gösterdiğinden hem daha fazlası hem daha azı olacak.',
    'Bu çocuk kim olursa olsun, bu ayarlar hakkında ona hiç danışılmadı.',
    'Bu sürgüler kolayca ölçülebileni ölçtü. Geri kalan, asıl o insan.',
    'Aynı sayılara sahip iki çocuk, çok farklı hayatlar yaşayabilir.',
    'Onları biçimlendirenin yarısı bu sürgülerin hiçbirinde değildir ve hiç olmayacak.',
    'Sekiz yaşında bir güç olarak okunan özellik, yirmi sekizinde bir yara olarak okunabilir.',
    'Optimizasyon bir varış noktası varsayar. Yoktur.',
    'Bu çocuğun olacağı şeyin büyük kısmı, planın dışından gelir.',
    'Burada kaydettiğin her "ideal", bir yerlerde, sıradan birinin sıradan bir tercihiydi.',
    'Bu çocuk, asla onun için seçmeyeceğin şeyleri sevecek.'
  ]
};

// "Things this simulator cannot see." Concrete reminders of human texture
// the engine can't capture. Surface as a short list in the Pause panel.
const CANNOT_MEASURE = {
  en: [
    'their specific laugh',
    'who they will love, and how',
    'what they will fear at 3am',
    'the moment they decide who they are',
    'their relationship with their own body',
    'what makes them feel held',
    'the friendship that changes everything',
    'the loss that re-shapes them',
    "the day they discover something they're great at",
    'how they will mother, or father, or refuse to',
    'their politics, their faith, their doubts',
    'the smell that will mean home to them',
    'the songs they will sing alone in a car',
    'how they will treat someone with less power than them',
    "what they'll regret, and what they won't"
  ],
  zh: [
    '他/她独有的那种笑声',
    '将爱上谁,以及怎样去爱',
    '凌晨三点时所惧怕的',
    '决定自己是谁的那一刻',
    '与自己身体之间的关系',
    '让他/她觉得被托住的事物',
    '那段改变一切的友谊',
    '将他/她重塑的那场失去',
    '发现自己擅长某事的那一天',
    '将如何为人母、为人父,或选择不做',
    '他/她的政治、信仰与怀疑',
    '将代表"家"的那种气味',
    '一人在车里独自轻唱的歌',
    '将如何对待那些比自己更无权力的人',
    '将后悔什么,又不会后悔什么'
  ],
  ja: [
    'その人だけの笑い方',
    '誰を、どう愛するか',
    '夜中の3時に怖くなるもの',
    '自分が何者かを決めたその瞬間',
    '自分自身の身体との付き合い方',
    '抱きとめられていると感じさせるもの',
    'すべてを変えてしまう友情',
    'その人を作り直すような喪失',
    '自分の得意なものを見つけた日',
    'どう母になるか、父になるか、ならずに済ますか',
    'その人の政治、信仰、疑い',
    'いつかその人にとって「家」を意味する匂い',
    '一人車の中で口ずさむ歌',
    '自分より力のない人にどう接するか',
    '何を後悔し、何を後悔しないか'
  ],
  ko: [
    '그 사람만의 웃음소리',
    '누구를, 어떻게 사랑할지',
    '새벽 3시에 두려워하게 될 무엇',
    '내가 누구인지 정한 그 순간',
    '자기 몸과 맺는 관계',
    '안겨 있다고 느끼게 하는 것',
    '모든 것을 바꾸어 놓을 우정',
    '그를 다시 빚어낼 상실',
    '자기가 잘하는 무언가를 발견하는 그 날',
    '어떻게 어머니가 될지, 아버지가 될지, 혹은 되지 않기를 택할지',
    '그의 정치, 신앙, 의심',
    '언젠가 그에게 "집"을 의미하게 될 어떤 냄새',
    '차 안에서 혼자 부르게 될 노래들',
    '자기보다 힘이 약한 사람을 어떻게 대할지',
    '무엇을 후회하고, 무엇은 후회하지 않을지'
  ],
  tr: [
    'kendine özgü o gülüşü',
    'kimi, nasıl seveceği',
    'sabahın üçünde neyden korkacağı',
    'kim olduğuna karar verdiği o an',
    'kendi bedeniyle kuracağı ilişki',
    'kendini tutulmuş hissetmesine yol açan şey',
    'her şeyi değiştiren o arkadaşlık',
    'onu yeniden biçimlendiren o kayıp',
    'iyi olduğu bir şeyi keşfettiği o gün',
    'nasıl anne olacağı, baba olacağı ya da olmayı reddedeceği',
    'siyaseti, inancı, kuşkuları',
    'onun için "ev" anlamına gelecek koku',
    'arabanın içinde tek başına söyleyeceği şarkılar',
    'kendisinden daha güçsüz birine nasıl davranacağı',
    'neye pişman olacağı, neye olmayacağı'
  ]
};

// Reflection-mode epigraphs — short, literary openings rendered above
// the codename so each generated profile reads like the first line of
// a chapter rather than a product card.
const REFLECTION_EPIGRAPHS = {
  en: [
    'A possible life, imagined from these two.',
    'One of many people who could have started here.',
    'A profile of someone who might have been.',
    'A person sketched in the language of probabilities.',
    'A life that exists only in this small simulation, and only for now.',
    'A person held briefly in mind, then released.',
    'A possible child, glimpsed sideways.',
    'A face the world has not yet seen.',
    'A version of a person who, in some other corner of the world, may already be.',
    'A single line drawn through a cloud of possibilities.'
  ],
  zh: [
    '一段可能的人生,由这两人想象而生。',
    '可以从这里开始的众多人之中的一个。',
    '一份关于本可能存在之人的画像。',
    '一个以概率之语描绘的人。',
    '一段只存在于这小小模拟、也只在此刻的人生。',
    '一个被心中短暂留住、随即放下的人。',
    '一个从侧面望见的可能孩子。',
    '一张世界尚未见过的面孔。',
    '一个在世界另一角落或许已经存在的人的另一种样子。',
    '一条被画穿可能性云团的细线。'
  ],
  ja: [
    'この二人から想像された、一つの可能な人生。',
    'ここから始まりえた人々のうちの、一人。',
    'そうなったかもしれない人の肖像。',
    '確率の言葉で描かれた一人の人。',
    'この小さなシミュレーションの中だけ、いまだけ存在する人生。',
    '心にしばし留め、やがて放した一人。',
    '横目に垣間見えた、ありうる子。',
    'まだ世界が見たことのない、一つの顔。',
    '世界のどこかの片隅に、すでに存在しているかもしれない一人の別の姿。',
    '可能性の雲を貫いて引かれた、一本の線。'
  ],
  ko: [
    '두 사람으로부터 상상된, 가능한 한 삶.',
    '여기에서 시작될 수 있었던 사람들 가운데 한 사람.',
    '존재했을 수도 있는 누군가의 초상.',
    '확률의 언어로 그려진 한 사람.',
    '오직 이 작은 시뮬레이션 안에, 그리고 지금에만 존재하는 삶.',
    '잠시 마음에 품었다가 놓아 보낸 한 사람.',
    '곁눈으로 살짝 본 어떤 아이.',
    '세상이 아직 본 적 없는 한 얼굴.',
    '세상 어느 모퉁이엔가 이미 존재하고 있을지도 모를 한 사람의 다른 모습.',
    '가능성의 구름을 가로질러 그어진 한 줄.'
  ],
  tr: [
    'Bu ikisinden hayal edilen, olası bir yaşam.',
    'Buradan başlayabilecek pek çok kişiden biri.',
    'Olabilecek birinin bir portresi.',
    'Olasılıkların diliyle çizilmiş bir kişi.',
    'Yalnızca bu küçük simülasyonun içinde, yalnızca şimdilik var olan bir yaşam.',
    'Kısa bir an akılda tutulan, sonra bırakılan biri.',
    'Yanlamasına bir bakışla görülen olası bir çocuk.',
    'Dünyanın henüz görmediği bir yüz.',
    'Dünyanın bir köşesinde belki hâlihazırda var olan birinin bir hâli.',
    'Olasılıklar bulutu boyunca çekilmiş tek bir çizgi.'
  ]
};

/* ---------- Reflection: Inner Cohort ("Same person, different rooms") ----------
 * Adult's Sibling Cohort says: many people could have come from these inputs.
 * Inner Cohort says: the one person who does is already many people. Same
 * identity, different rooms, different versions. Deterministic per codename. */
const INNER_COHORT_CONTEXTS = [
  { key: 'work', label: 'At work', icon: '⌬',
    pool: [
      'Slightly more composed than they really are.',
      'Carries a notebook they only sometimes use.',
      'Arrives a few minutes early to most things.',
      'Closer to one colleague than the others, without naming it.',
      'Holds a low-key opinion they have never voiced in a meeting.',
      'Eats lunch the same way for years.',
      'Says "no problem" more than they intend to.',
      "Quiet when the room is loud; thoughtful when it isn't."
    ],
    i18n: {
      zh: { label: '在工作中', pool: ['比真实的自己,稍微镇定一点。', '随身带着一本只偶尔翻一翻的笔记本。', '大多数场合都会提前几分钟到。', '跟某位同事比其他人都更亲近,只是从不挑明。', '心里有一种从未在会议上说出来的、低调的看法。', '多年来午饭吃得方式都一样。', '"没问题"这三个字,说得比自己以为的还要多。', '房间嘈杂时变得安静;房间安静时变得沉思。'] },
      ja: { label: '仕事中の自分', pool: ['本当の自分より、ほんの少しだけ落ち着いて見える。', '時々しか開かないノートを、それでも持ち歩いている。', '多くの予定に、数分早く到着する。', '同僚の中の誰か一人と、特別に近い——口には出さないけれど。', '会議では一度も口にしたことのない、ひそやかな意見を持っている。', '何年も同じ食べ方で昼食をとっている。', '「だいじょうぶです」を、自分の予定よりずっと多く口にしてしまう。', '場がにぎやかなときには静かになり、静かなときには考えこむ。'] },
      ko: { label: '일터에서', pool: ['실제 자기보다 살짝 더 차분해 보인다.', '가끔만 펼치는 노트를 늘 가지고 다닌다.', '대부분의 약속에 몇 분 일찍 도착한다.', '동료들 중 누군가 한 명과 더 가깝다 — 입에 올리지 않을 뿐.', '회의에서 한 번도 말한 적 없는, 조용한 의견을 품고 있다.', '몇 년째 똑같은 방식으로 점심을 먹는다.', '본인이 의도한 것보다 더 자주 "괜찮아요"라고 말한다.', '방이 시끄러우면 조용해지고, 조용해지면 생각에 잠긴다.'] },
      tr: { label: 'İşte', pool: ['Aslında olduğundan biraz daha sakin görünür.', 'Ara sıra kullandığı bir defter taşır.', 'Çoğu randevuya birkaç dakika erken gelir.', 'Bir meslektaşına diğerlerinden daha yakındır, ama bunu söylemez.', 'Toplantıda hiç dile getirmediği, sakin bir görüşü vardır.', 'Yıllardır öğle yemeğini hep aynı şekilde yer.', '"Sorun değil" lafını niyetinden daha sık söyler.', 'Ortam gürültülüyken sessizleşir; sessizken düşünceli olur.'] }
    }
  },
  { key: 'family', label: 'With their family of origin', icon: '⎈',
    pool: [
      'Becomes younger again, gradually, every time they visit.',
      'Speaks a private sibling language only the family follows.',
      'Loses an argument they could have won.',
      'Eats food they would not order in a restaurant.',
      'Defers in ways their friends would not recognize.',
      'Smiles at a joke they have heard fifty times.',
      'Sleeps in a room that has not changed in twenty years.',
      'Notices their parent has gotten older only in passing.'
    ],
    i18n: {
      zh: { label: '与原生家庭在一起时', pool: ['每次回家,都会一点一点地变回更年少的自己。', '用一种只有家人才听得懂的"兄弟姐妹之间的私语"。', '在一场原本可以赢的争论里,选择输掉。', '吃下一些自己在餐厅里绝不会点的菜。', '以朋友们认不出来的方式,主动让步。', '听到一个已经听过五十次的笑话,还是会笑出来。', '睡在一间二十年都没怎么变过的房间里。', '只是路过时,恍惚地察觉父母又老了一些。'] },
      ja: { label: '生まれた家族といるとき', pool: ['帰省するたびに、少しずつ昔の年齢に戻っていく。', '家族にしか通じない、きょうだいだけの言葉づかいで話す。', '本来なら勝てた口論で、わざと負ける。', '自分なら店では絶対頼まない料理を食べる。', '友人たちが見たらわからないようなかたちで、譲ってしまう。', 'もう五十回は聞いた冗談に、それでも微笑む。', '二十年ほとんど変わっていない部屋で眠る。', '親が年をとっていることに、ふと、すれ違いざまに気づく。'] },
      ko: { label: '원래 가족과 함께일 때', pool: ['본가에 갈 때마다 조금씩 더 어린 자기로 돌아간다.', '가족만 알아듣는, 형제자매끼리의 사적인 말투를 쓴다.', '충분히 이길 수 있었던 말다툼에서 굳이 진다.', '식당이라면 절대 시키지 않을 음식을 먹는다.', '친구들이 보면 못 알아볼 만큼 양보한다.', '이미 쉰 번은 들은 농담에도 미소를 짓는다.', '이십 년이 지나도 거의 그대로인 방에서 잠을 잔다.', '부모가 나이 들었다는 사실을 스치듯 알아챈다.'] },
      tr: { label: 'Aslen ait olduğu aileyleyken', pool: ['Her ziyaretinde yavaş yavaş yine küçük bir hâline döner.', 'Yalnızca ailenin anladığı, kardeşlere özgü bir dilde konuşur.', 'Kazanabileceği bir tartışmayı kaybeder.', 'Lokantada asla sipariş etmeyeceği bir yemeği yer.', 'Arkadaşlarının tanıyamayacağı şekillerde geri çekilir.', 'Elli kez duyduğu bir şakaya yine de gülümser.', 'Yirmi yıldır neredeyse hiç değişmeyen bir odada uyur.', 'Anne-babasının yaşlandığını ancak geçerken fark eder.'] }
    }
  },
  { key: 'late', label: 'Alone at 2am', icon: '☾',
    pool: [
      'Re-reads the same paragraph in a book.',
      'Replays a 2008 song from a memory they thought they had lost.',
      'Opens the fridge without intending to eat.',
      'Composes a text they will not send.',
      'Decides something quietly that will reshape next year.',
      'Lets a single thought spiral and then forgives themselves for it.',
      'Notices the wallpaper.',
      'Hears a sound and decides it is nothing.'
    ],
    i18n: {
      zh: { label: '凌晨两点,独自一人', pool: ['同一段话,在书里反复读了好几遍。', '把以为早已遗忘的、一首 2008 年的歌循环播放。', '不打算吃东西,却还是把冰箱打开了。', '写了一条不会发送出去的短信。', '默默作出某个决定,而这个决定会改变接下来的一整年。', '任由一个念头不停地打转,然后又原谅了这样的自己。', '突然注意到了墙纸的样子。', '听到一个声响,自己告诉自己:"应该没什么。"'] },
      ja: { label: '深夜二時、ひとり', pool: ['同じ一段落を、本のなかで何度も読み返している。', 'もう忘れたと思っていた2008年のある曲を、繰り返し再生する。', '食べるつもりがないのに、冷蔵庫を開けている。', '送らないと決めているメッセージを、文字に起こす。', '来年の自分を作り変えるような決断を、静かに下す。', '一つの考えがぐるぐると渦を巻くのを許し、そんな自分も最後には許す。', 'ふと、壁紙の柄に目がいく。', 'ある音が聞こえて、「きっと何でもない」と自分を納得させる。'] },
      ko: { label: '새벽 두 시, 혼자', pool: ['책 속의 같은 단락을 몇 번이고 다시 읽는다.', '잊었다고 생각했던 2008년의 노래 한 곡을 반복해서 듣는다.', '먹을 생각도 없으면서 냉장고 문을 연다.', '보낼 생각이 없는 메시지를 한 줄 한 줄 적어 본다.', '다가올 한 해를 바꿔놓을 결정을 조용히 내린다.', '한 가지 생각이 빙빙 돌게 두었다가, 그런 자기 자신도 결국 용서한다.', '문득 벽지가 눈에 들어온다.', '어떤 소리를 듣고, "아무것도 아니야"라고 스스로를 다독인다.'] },
      tr: { label: 'Gecenin ikisinde, yalnız', pool: ['Bir kitaptaki aynı paragrafı tekrar tekrar okur.', 'Unuttuğunu sandığı bir 2008 şarkısını tekrar tekrar dinler.', 'Bir şey yemeye niyeti yokken buzdolabını açar.', 'Asla göndermeyeceği bir mesajı kelime kelime kurar.', 'Önümüzdeki yılı yeniden şekillendirecek bir karar verir, sessizce.', 'Tek bir düşüncenin etrafında dönmesine izin verir, sonra kendini bu yüzden affeder.', 'Birden duvar kâğıdını fark eder.', 'Bir ses duyar; "Hiçbir şey değil" diye geçer içinden.'] }
    }
  },
  { key: 'beloved', label: 'With someone they love', icon: '☉',
    pool: [
      'Becomes someone slightly luminous.',
      'Forgives faster than they would for anyone else.',
      "Confuses their own preferences with the other person's.",
      'Says things they would not write down.',
      'Laughs at something only the two of them find funny.',
      'Is more tired and less guarded.',
      "Carries the other person's small habits home with them.",
      'Hears their own voice get a little softer.'
    ],
    i18n: {
      zh: { label: '与所爱之人在一起时', pool: ['变成一种微微发光的自己。', '比对任何人都更快地原谅。', '把自己的喜好和对方的喜好混在了一起。', '说出一些自己永远不会写下来的话。', '为了只有他们俩才觉得好笑的事而笑出声。', '比平时更累,也比平时更不设防。', '把对方那些小小的习惯,带回到了自己家里。', '听见自己的声音变得稍微柔软了一些。'] },
      ja: { label: '大切な人と一緒のとき', pool: ['ほんの少しだけ、光をまとった人になる。', '他の誰に対するより、ずっと早く許してしまう。', '自分の好みと、相手の好みの境界が曖昧になっていく。', '自分では書き残さないような言葉を、口に出してしまう。', '二人にしか面白くないことに、心の底から笑う。', 'いつもより疲れていて、いつもより無防備。', '相手の小さな癖を、いつの間にか家まで連れて帰っている。', '自分の声が、いつもより少しやさしくなっているのに気づく。'] },
      ko: { label: '사랑하는 사람과 함께일 때', pool: ['어딘가 살짝 빛을 띤 사람이 된다.', '다른 누구보다도 빨리 용서한다.', '자기 취향과 상대의 취향이 점점 헷갈리기 시작한다.', '글로는 결코 적지 않을 말을 입 밖으로 내놓는다.', '두 사람만 재미있어하는 무언가에 진심으로 웃는다.', '평소보다 지쳐 있고, 평소보다 무방비하다.', '상대의 사소한 습관 몇 가지를, 자기도 모르게 집까지 가져온다.', '자기 목소리가 조금 더 부드러워졌음을 알아챈다.'] },
      tr: { label: 'Sevdiği biriyle birlikteyken', pool: ['Hafifçe ışıldayan bir hâline bürünür.', 'Başka kimseyi affedeceğinden çok daha hızlı affeder.', 'Kendi tercihleriyle karşısındakininkini karıştırır.', 'Asla yazmayacağı şeyleri söyler.', 'Yalnızca ikisinin komik bulduğu bir şeye güler.', 'Her zamankinden daha yorgun ve daha az korunaklıdır.', 'Karşısındakinin küçük alışkanlıklarını yanında, evine kadar taşır.', 'Kendi sesinin biraz yumuşadığını duyar.'] }
    }
  }
];

/* ---------- Reflection: Lifetime Drift ("Same person, different decades") ----------
 * Adult's Historical Drift says: the targets shift across eras. Lifetime
 * Drift says: the person shifts across their own life. Same person, four
 * snapshots, four different people. Picked deterministically per codename. */
const LIFETIME_DRIFT = {
  ages: [
    { label: 'At 7',
      pool: [
        'Collects something specific that nobody understands.',
        'Has a recurring dream they do not mention.',
        'Treats one stuffed animal as a person.',
        'Defends a friend who is being teased.',
        'Will lie about something small for years.',
        'Has a favorite word they say aloud just to hear it.',
        'Is convinced of one thing that is not true.'
      ],
      i18n: {
        zh: { label: '7 岁时', pool: ['专门收集一种没人理解的小东西。', '反复做的一个梦,从不向人提起。', '把某只布偶当作一个人来对待。', '挺身替一个被取笑的朋友说话。', '会为了一件小事撒谎,撒上好几年。', '有一个特别喜欢的词,只为了听到自己念出来。', '深信不疑的一件事,其实并不是真的。'] },
        ja: { label: '7歳のとき', pool: ['誰にも理解できない、ある特定のものを集めている。', '誰にも話さない、繰り返し見る夢がある。', 'ぬいぐるみを一体、ひとりの人として扱っている。', 'からかわれている友だちを、自分から守る。', 'ちいさなことについて、何年も嘘をつき続ける。', 'お気に入りの言葉があって、ただ自分の声で聞きたいから口に出す。', '本当ではない一つのことを、固く信じ込んでいる。'] },
        ko: { label: '7살 때', pool: ['아무도 이해 못 할 특정한 것을 모은다.', '아무에게도 말하지 않는, 자주 꾸는 꿈이 있다.', '인형 한 마리를 진짜 사람처럼 대한다.', '놀림받는 친구를 대신해 나선다.', '아주 작은 일을 두고 몇 년이고 거짓말을 한다.', '소리 내어 듣고 싶어서 그저 입 밖으로 꺼내는, 좋아하는 단어가 있다.', '사실이 아닌 단 한 가지를 굳게 믿고 있다.'] },
        tr: { label: '7 yaşında', pool: ['Kimsenin anlamadığı belirli bir şey biriktirir.', 'Kimseye söylemediği, tekrar gördüğü bir rüyası var.', 'Bir oyuncak hayvanını gerçek bir insan gibi görür.', 'Alay edilen bir arkadaşını savunur.', 'Küçücük bir konuda yıllarca yalan söyler.', 'Sadece kendi kulağıyla duymak için yüksek sesle söylediği bir kelimesi var.', 'Doğru olmayan bir şeye gönülden inanır.'] }
      }
    },
    { label: 'At 17',
      pool: [
        'Argues with a parent about something neither will remember in a decade.',
        'Has a friendship that feels too intense to last — and will not.',
        'Writes things down they would die if anyone read.',
        'Disappoints a teacher they admire.',
        'Falls in love with an idea before a person.',
        'Believes their own future is already obvious.',
        'Stays up late for something that will feel small at 27.'
      ],
      i18n: {
        zh: { label: '17 岁时', pool: ['为某件 10 年后谁也记不得的事,跟父母吵了一架。', '有一段太炽烈、注定不会长久的友情——后来也确实没长久。', '在本子上写下一些"如果被人看见就想去死"的话。', '让一位自己很敬重的老师感到失望。', '先爱上一个想法,才爱上一个人。', '坚信自己未来的样子早已一清二楚。', '为某件等到 27 岁回头看会觉得"不过如此"的事彻夜未眠。'] },
        ja: { label: '17歳のとき', pool: ['親と口論した内容を、十年後にはどちらも覚えていない。', '長くは続かないだろうとわかっているのに、強すぎる友情に身を投じる。', '誰かに読まれたら死にたくなるようなことを、ノートに書きつける。', '尊敬していた先生をがっかりさせる。', '人より先に、ある「考え」に恋をする。', '自分の未来は、もう見えていると思い込んでいる。', '27歳になれば「たいしたことなかった」と思える何かのために、夜更かしする。'] },
        ko: { label: '17살 때', pool: ['10년 뒤엔 둘 다 잊을 일을 두고 부모와 다툰다.', '오래 가지 못할 만큼 강렬한 우정에 빠진다 — 실제로 오래 가지 못한다.', '누군가 읽으면 죽고 싶을 만한 말을 종이에 쓴다.', '존경하던 선생님을 실망시킨다.', '사람보다 먼저 어떤 생각과 사랑에 빠진다.', '자기 미래가 이미 뻔하다고 확신한다.', '스물일곱이 되면 사소하게 느껴질 일을 위해 밤을 새운다.'] },
        tr: { label: '17 yaşında', pool: ['On yıl sonra ikisinin de hatırlamayacağı bir şey için ebeveyniyle tartışır.', 'Sürmesi imkânsız ölçüde yoğun, sürmeyecek bir dostluk yaşar.', 'Biri okusa "ölürüm" diyeceği şeyleri yazıya döker.', 'Hayran olduğu bir öğretmeni hayal kırıklığına uğratır.', 'Bir insandan önce bir fikre âşık olur.', 'Kendi geleceğinin çoktan belli olduğuna inanır.', "Yirmi yedisinde küçük gelecek bir şey için gece geç saatlere kadar uyanık kalır."] }
      }
    },
    { label: 'At 35',
      pool: [
        'Has not given up on a project that is mostly finished.',
        'Lives within driving distance of one parent.',
        'Sleeps better some weeks than others.',
        'Has stopped trying to like a certain food.',
        'Quietly maintains a friendship through monthly texts.',
        'Knows what they are afraid of and works around it.',
        'Owns one piece of furniture they bought too young.'
      ],
      i18n: {
        zh: { label: '35 岁时', pool: ['有一个几乎做完的项目,始终没有放弃。', '住在开车就能见到的一位父母身边。', '有的星期睡得好,有的星期睡不好。', '已经不再勉强自己去喜欢某一种食物。', '通过每月一两条短信,默默维系着一段友谊。', '知道自己怕什么,并学会绕着它生活。', '家里有一件当年买得太早的家具。'] },
        ja: { label: '35歳のとき', pool: ['ほとんど仕上がっている、ある計画を、いまもあきらめずにいる。', 'どちらか一方の親と、車で行ける距離に暮らしている。', '週ごとに、よく眠れる週と眠れない週がある。', 'ある食べ物を好きになろうとするのを、もうやめた。', '月に一度のメッセージで、ある友情をひそかに保ち続けている。', '何を恐れているかを自覚し、それを避けて暮らしている。', '若すぎる時期に買った家具を、いまも一つ持っている。'] },
        ko: { label: '35살 때', pool: ['거의 끝나가는 어느 한 가지 일을 끝내 포기하지 않고 있다.', '운전해서 갈 수 있는 거리에 부모 한 분이 산다.', '잘 자는 주가 있고, 잘 못 자는 주가 있다.', '특정 음식을 굳이 좋아해 보려던 노력을 그만뒀다.', '한 달에 한 번씩 메시지를 주고받으며 어떤 우정을 조용히 이어간다.', '자기가 무엇을 두려워하는지 알고, 그것을 피하며 살아간다.', '너무 어린 시절에 산 가구 한 점을 아직 가지고 있다.'] },
        tr: { label: '35 yaşında', pool: ['Neredeyse bitmiş bir projeden hâlâ vazgeçmemiş.', 'Bir ebeveyninin araba ile gidilebilecek bir mesafesinde yaşıyor.', 'Bazı haftalar daha iyi uyur, bazıları daha kötü.', 'Belirli bir yiyeceği sevmeye çalışmayı bıraktı.', 'Ayda bir mesajla bir dostluğu sessizce ayakta tutuyor.', 'Korktuğu şeyi bilir; etrafından dolanmayı öğrenmiştir.', "Çok genç yaşta aldığı bir mobilya parçası hâlâ evinde."] }
      }
    },
    { label: 'At 70',
      pool: [
        'Tells a story about being 11 that may be partly invented.',
        'Has outlived at least one person they expected to grow old with.',
        'Notices birds.',
        'Holds a small grudge that no longer matters.',
        'Surprises themselves with what they remember.',
        'Has changed their mind about something they were certain of at 30.',
        'Speaks to a grandchild about something nobody else knows.'
      ],
      i18n: {
        zh: { label: '70 岁时', pool: ['讲一个关于自己 11 岁的故事——其中也许有一部分是后来编出来的。', '至少有一位本以为会和自己一起变老的人,已经先走了。', '会注意到鸟。', '心里揣着一桩早已无关紧要的小怨。', '常常被自己还能记起的事情吓一跳。', '对于一件 30 岁时确信无疑的事,如今已经改了主意。', '跟一个孙辈讲起一件没有别人知道的事。'] },
        ja: { label: '70歳のとき', pool: ['自分が11歳だった頃の物語を語る——どこか、あとから作り足された部分も混じっているかもしれない。', '一緒に年を取るはずだと思っていた誰かに、少なくとも一人は先立たれている。', '鳥に目がいくようになる。', 'もうどうでもいい、ちいさな恨みごとを、まだ少しだけ抱えている。', '自分が何を覚えているかに、自分でびっくりすることがある。', '30歳のときには確信していたことに、いまでは別の答えを出している。', '誰も知らない出来事について、孫の一人にだけ話す。'] },
        ko: { label: '70살 때', pool: ['열한 살의 자기에 대한 이야기를 들려준다 — 어느 부분쯤은 나중에 덧붙여졌을지도 모른다.', '함께 늙어갈 줄 알았던 사람을 적어도 한 명은 먼저 떠나보냈다.', '새가 눈에 들어오기 시작한다.', '이제는 아무런 의미도 없는 작은 원망 하나를 마음 한 구석에 두고 있다.', '자기가 무엇을 기억하고 있는지에 스스로 놀란다.', '서른에는 확신했던 일에 대해 지금은 다른 답을 갖고 있다.', '아무도 모르는 일에 대해, 손주 한 명에게만 들려준다.'] },
        tr: { label: '70 yaşında', pool: ['On bir yaşına dair bir hikâye anlatır — belki bir kısmı sonradan eklenmiştir.', 'Birlikte yaşlanacağını sandığı en az bir kişiden daha uzun yaşamıştır.', 'Kuşları fark eder.', 'Artık önemi kalmamış küçük bir kırgınlığı sürdürür.', 'Neyi hatırladığına kendi de şaşar.', "Otuzunda kesinkes inandığı bir konuda fikrini değiştirmiştir.", "Kimsenin bilmediği bir şeyi, bir torununa anlatır."] }
      }
    }
  ]
};

// LOOP_REQUEST(translator): EN[9] was rewritten in R6 to drop the "Tuesday afternoon" wisdom-template; zh/ja/ko/tr below still carry the old line.
const HUMANITY_REMINDERS = {
  en: [
    'Humans are more than predicted traits.',
    'A person cannot be fully reduced to data.',
    'Perfection is culturally defined.',
    'Unexpected traits often become strengths.',
    'Personality traits show roughly 40-50% heritability (Polderman 2015 twin studies; lower when confounds adjusted). Most variation traces to lived experience.',
    'Different traits create unexpected advantages.',
    'Stubbornness saves you under fire; costs you in meetings.',
    'The traits that get a child sent to the principal\'s office often build the adult their family leans on.',
    'Whoever this child becomes, they get the last word — not us.',
    'A simulator cannot see the friend who will move away at fifteen, the surgery at thirty, the parent who needs care at fifty.'
  ],
  zh: [
    '人远不止是被预测的那些特征。',
    '一个人无法被完全简化为数据。',
    '何谓"完美"由文化定义。',
    '出乎意料的特征往往成为优势。',
    '性格特征大约有 40–50% 的遗传性(Polderman 2015 双生子研究;校正混杂因素后更低)。大部分差异源于亲身经历。',
    '不同的特征带来意想不到的优势。',
    '同样的固执,在战火中救你,在会议室里害你。',
    '那些让孩子被叫到校长办公室的特质,日后常常长成被家人依靠的大人。',
    '不管这个孩子将来成为什么样的人,最后说话的应是他们,不是我们。',
    '模拟器看不见那位十五岁时将搬走的朋友、三十岁时的那场手术、五十岁时需要照顾的父母。'
  ],
  ja: [
    '人は、予測された特性以上の存在である。',
    '人をデータに還元しきることはできない。',
    '「完璧」は文化が定めるものである。',
    '思いがけない特性がしばしば強みになる。',
    '性格特性の遺伝率はおよそ40〜50%(Polderman 2015 双生児研究。交絡を補正するとさらに低い)。変動の大半は実際に生きた経験に由来する。',
    '異なる特性が、思いがけない強みを生む。',
    '頑固さは、銃火の下では命を救い、会議では仕事を壊す。',
    '子どもが校長室に呼び出される原因になった気質が、やがて家族が頼れる大人をかたちづくることがある。',
    'この子が誰になるにせよ、最後に決めるのは私たちではなく、その子自身である。',
    '模型には見えない——十五歳で去っていく友、三十歳での手術、五十歳に介護を必要とする親。'
  ],
  ko: [
    '사람은 예측된 특성 이상의 존재다.',
    '한 사람은 데이터로 환원될 수 없다.',
    "'완벽함'은 문화가 정한다.",
    '예상치 못한 특성이 종종 강점이 된다.',
    '성격 특성은 약 40~50%의 유전성을 보이며(Polderman 2015 쌍둥이 연구; 교란 변수를 보정하면 더 낮다), 대부분의 차이는 실제 경험에서 비롯된다.',
    '서로 다른 특성이 뜻밖의 강점을 만든다.',
    '고집은 총탄 아래에서는 당신을 살리고, 회의에서는 당신을 망친다.',
    '아이를 교무실로 불려가게 만든 그 기질이, 훗날 가족이 기댈 어른을 만들기도 한다.',
    '이 아이가 어떤 사람이 되든, 마지막 말은 우리가 아닌 그 아이의 몫이다.',
    '시뮬레이터는 보지 못한다 — 열다섯에 떠나갈 친구도, 서른의 수술도, 쉰에 돌봄이 필요해질 부모도.'
  ],
  tr: [
    'İnsanlar, öngörülen özelliklerinden çok daha fazlasıdır.',
    'Bir insan, veriye tam olarak indirgenemez.',
    'Mükemmellik kültürel olarak tanımlanır.',
    'Beklenmedik özellikler çoğu zaman güce dönüşür.',
    "Kişilik özelliklerinin kalıtsallığı kabaca %40-50'dir (Polderman 2015 ikiz çalışmaları; karıştırıcılar düzeltildiğinde daha düşük). Farklılığın çoğu yaşanmış deneyimden gelir.",
    'Farklı özellikler, beklenmedik avantajlar yaratır.',
    'İnatçılık, ateş altında seni kurtarır; toplantıda batırır.',
    'Çocuğu müdür odasına yollatan özellikler, çoğu zaman ailenin sırtını dayadığı yetişkini yetiştirir.',
    'Bu çocuk kim olursa olsun, son söz bizde değil onda olmalı.',
    'Bir simülatör göremez — on beşinde gidecek arkadaşı, otuzundaki ameliyatı, ellisinde bakıma muhtaç olacak ebeveyni.'
  ]
};

const NATURAL_VARIATION_MESSAGES = {
  en: [
    'Human diversity preserved.',
    'Unpredictability is part of humanity.',
    'Not every trait needs improvement.',
    'The traits a parent worries about at six often become the ones a partner falls in love with at twenty-six.',
    'Nature did not consult a design handbook.'
  ],
  zh: [
    '已保留人类多样性。',
    '不可预测性是人性的一部分。',
    '并非每一项特征都需要"改善"。',
    '父母在孩子六岁时担心的那些特质,常常是二十六岁时被爱人深深爱上的地方。',
    '自然从未翻过设计手册。'
  ],
  ja: [
    '人間の多様性を保持しました。',
    '予測不可能性こそ人間性の一部である。',
    'すべての特性に「改善」が必要というわけではない。',
    '六歳の親が心配したその気質を、二十六歳のパートナーは愛おしいと思うことがある。',
    '自然は設計マニュアルを参照しなかった。'
  ],
  ko: [
    '인간의 다양성이 보존됨.',
    '예측 불가능함은 인간성의 일부다.',
    '모든 특성에 개선이 필요한 것은 아니다.',
    '여섯 살 부모가 걱정했던 그 기질을, 스물여섯 살의 연인은 사랑스럽다고 여기곤 한다.',
    '자연은 설계 지침서를 들춰 보지 않았다.'
  ],
  tr: [
    'İnsan çeşitliliği korundu.',
    'Öngörülemezlik, insanlığın bir parçasıdır.',
    'Her özelliğin iyileştirilmesi gerekmez.',
    'Bir ebeveynin altı yaşında endişelendiği özellikler, çoğu zaman yirmi altı yaşında bir partnerin âşık olduğu özellikler hâline gelir.',
    'Doğa, bir tasarım el kitabına bakmadı.'
  ]
};

/* ---------- News Headlines ---------- */

// Local-news flavor — quiet civic things. Less viral-internet, more "the
// kind of paragraph you find on page 6 of a small-town paper".
const NEWS_HEADLINES = {
  en: [
    'Local librarian retires after 31 years; the children\'s section is renamed.',
    'Volunteer firefighter delivers a baby on the side of route 12.',
    'Anonymous donor pays off the elementary school\'s overdue lunch accounts.',
    'High-school marching band wins their first state title in a generation.',
    'Local resident maps every public bench in the city. Map goes mildly viral.',
    'Couple celebrates 60 years of marriage; their first date was at the same diner.',
    'Town\'s last family-owned hardware store finds a new owner.',
    'Local poet wins a small but meaningful national prize.',
    'Community garden produces enough vegetables for the food bank, all year.',
    'Long-time mail carrier knows every dog by name; the dogs reciprocate.',
    'Local engineer designs a free wheelchair ramp for a neighbor\'s porch.',
    'Two strangers who met at a bus stop are now business partners.',
    'High-school graduation speech, delivered in three languages, goes home with everyone.',
    'Retired teacher publishes a children\'s book at 78. Sells out at the local store.',
    'Small bookstore hosts a reading; line stretches around the block.',
    'Local choir performs for the residents of the hospice once a month, for years.',
    'A widow learns to drive at 71 and visits her sister three states away.',
    'Town crossing guard is honored for 25 years of remembering every child\'s name.',
    'High-school robotics team mentors the elementary school for a year.',
    'Local family adopts a refugee family\'s grocery list as their own.'
  ],
  zh: [
    '本地图书管理员任职 31 年后退休;儿童阅览区以她的名字重新命名。',
    '12 号公路边,一位志愿消防员协助接生了一名婴儿。',
    '一位匿名捐赠者付清了小学所有逾期未付的午餐费。',
    '高中行进乐队赢得了三十年来的第一座州冠军。',
    '当地居民绘制了市内所有公共长椅的地图。地图在网上小有传播。',
    '一对夫妇庆祝结婚 60 周年;他们的第一次约会就在同一家小餐馆。',
    '镇上最后一家家族经营的五金店,找到了新的接手人。',
    '当地诗人荣获一项小而珍贵的全国奖项。',
    '社区花园整整一年都为食物银行提供足够的蔬菜。',
    '老牌邮差认得每一只小狗的名字,而小狗们也记得他。',
    '当地一位工程师免费为邻居的门廊设计了一段轮椅斜坡。',
    '两位在公交车站相遇的陌生人,如今成了生意伙伴。',
    '高中毕业典礼上的演讲以三种语言进行,触动了在场每一个人。',
    '一位 78 岁的退休教师出版了一本童书,在本地书店一上架就售罄。',
    '小书店举办朗读会,队伍排到了街角。',
    '当地合唱团多年来每月一次,为临终关怀院的住客献唱。',
    '一位 71 岁的寡妇学会开车,然后开去探望住在三个州外的姐姐。',
    '镇上的过街引导员因 25 年间记得每个孩子的名字而受到表彰。',
    '高中机器人小组花了一年时间,辅导小学的同学们。',
    '一户当地家庭把一户难民家庭的购物清单也当成自家的来负担。'
  ],
  ja: [
    '三十一年勤めた地元の図書館員が退職、児童書コーナーがその名にちなんで改名される。',
    '国道12号線の路肩で、ボランティアの消防士が赤ん坊を取り上げる。',
    '匿名の寄付者が、小学校で滞っていた給食費をすべて清算する。',
    '高校のマーチングバンドが、一世代ぶりの州大会優勝を果たす。',
    '地元の住民が市内の公園ベンチを全部地図にし、それがちょっとした話題になる。',
    '結婚六十周年を迎えた夫婦——初めてのデートは、いまも通うあの食堂だった。',
    '町に残った最後の家族経営の金物屋に、新しい店主が現れる。',
    '地元の詩人が、小さいが意味深い全国賞を受ける。',
    '地域の市民農園が、一年を通してフードバンクに十分な野菜を届ける。',
    '何年も同じ区域を回る郵便配達員が、すべての犬の名前を覚えていて、犬たちも彼を覚えている。',
    '地元のエンジニアが、隣人の玄関ポーチに無償で車椅子用スロープを設計する。',
    'バス停で出会った見知らぬ二人が、いまや共同経営者となった。',
    '三か国語で語られた高校の卒業スピーチが、会場の全員の心に残る。',
    '七十八歳で退職した先生が児童書を出版し、地元の書店であっという間に売り切れる。',
    '小さな書店の朗読会に、ブロックを一周するほどの行列ができる。',
    '地元の合唱団が、ホスピスの入居者のために月に一度、何年も歌い続ける。',
    '七十一歳で運転免許を取った未亡人が、三州先に住む姉妹を訪ねる。',
    '二十五年にわたり、すべての児童の名前を覚えてきた横断歩道の見守りスタッフが表彰される。',
    '高校のロボティクスチームが、一年間にわたって小学校の指導役を務める。',
    '地元の家族が、難民家族の食料品リストを自分のものとして引き受ける。'
  ],
  ko: [
    '지역 사서가 31년 만에 은퇴하고, 어린이 코너의 이름이 바뀐다.',
    '12번 도로변에서 자원 소방관이 아기를 받아낸다.',
    '익명의 후원자가 초등학교의 밀린 급식비를 모두 갚는다.',
    '한 세대 만에 고등학교 행진 악대가 첫 주(州) 우승을 차지한다.',
    '한 주민이 도시의 공공 벤치를 모두 지도에 표시하고, 그 지도가 잔잔한 화제가 된다.',
    '결혼 60주년을 맞은 부부의 첫 데이트 장소가 지금도 다니는 그 식당이었다.',
    '마을에 마지막 남았던 가족 경영 철물점이 새로운 주인을 만난다.',
    '지역 시인이 작지만 의미 있는 전국상을 수상한다.',
    '공동체 텃밭이 한 해 내내 푸드뱅크에 충분한 채소를 공급한다.',
    '오래 일한 우체부가 모든 개의 이름을 알고 있고, 개들도 그를 알아본다.',
    '지역 엔지니어가 이웃집 현관에 무료로 휠체어 경사로를 설계해 준다.',
    '버스 정류장에서 만난 두 낯선 이가 이제는 사업 동료가 되었다.',
    '세 가지 언어로 전해진 고등학교 졸업 연설이 모두의 마음에 남는다.',
    '일흔여덟에 퇴직한 교사가 어린이책을 펴내고, 지역 서점에서 곧장 매진된다.',
    '작은 서점에서 열린 낭독회에 줄이 길게 늘어선다.',
    '지역 합창단이 호스피스 입소자들을 위해 매달 한 번씩, 여러 해 동안 노래한다.',
    '일흔한 살에 운전을 배운 미망인이 세 주(州) 떨어진 자매를 찾아간다.',
    '25년 동안 모든 아이의 이름을 기억해 온 횡단보도 도우미가 표창을 받는다.',
    '고등학교 로봇 동아리가 한 해 동안 초등학교 학생들을 멘토링한다.',
    '한 지역 가족이 어느 난민 가정의 식료품 목록을 자기들 것으로 받아 든다.'
  ],
  tr: [
    'Yerel kütüphaneci 31 yıl sonra emekli oluyor; çocuk bölümüne onun adı veriliyor.',
    'Gönüllü itfaiyeci, 12 numaralı yolun kenarında bir bebeği dünyaya getiriyor.',
    'İsimsiz bir bağışçı, ilkokulun birikmiş yemek borçlarını kapatıyor.',
    'Lise bando takımı, bir kuşaktır kazanılmayan eyalet şampiyonluğunu alıyor.',
    'Bir mahalle sakini şehirdeki tüm halka açık bankları haritaya döker; harita küçük çaplı viral oluyor.',
    'Çift, 60. evlilik yıldönümünü kutluyor; ilk randevuları da aynı lokantadaydı.',
    'Kasabanın aile şirketi olarak ayakta kalan son nalburu yeni bir sahibine kavuşuyor.',
    'Yerel bir şair, küçük ama anlamlı bir ulusal ödül kazanıyor.',
    'Mahalle bahçesi yıl boyu gıda bankasına yetecek kadar sebze yetiştiriyor.',
    'Yıllardır aynı bölgenin postacısı, her köpeğin adını biliyor; köpekler de onu tanıyor.',
    'Yerel bir mühendis, komşusunun verandası için ücretsiz bir tekerlekli sandalye rampası tasarlıyor.',
    'Otobüs durağında tanışan iki yabancı, artık iş ortağı.',
    'Lise mezuniyet konuşması üç dilde yapıldı ve dinleyen herkesin yanına bir parça olarak gitti.',
    'Yetmiş sekiz yaşındaki emekli öğretmen bir çocuk kitabı yayımlıyor; yerel kitapçıda tükeniyor.',
    'Küçük bir kitabevinin okuma etkinliği için kuyruk sokağı dolanıyor.',
    'Yerel koro, yıllardır ayda bir hospis sakinleri için konser veriyor.',
    'Yetmiş bir yaşındaki bir dul kadın araba sürmeyi öğrenip üç eyalet uzaktaki kız kardeşini ziyaret ediyor.',
    'Yirmi beş yıldır her çocuğun adını bilen geçit görevlisi onurlandırılıyor.',
    'Lise robotik takımı bir yıl boyunca ilkokula mentorluk yapıyor.',
    'Yerel bir aile, bir mülteci ailenin alışveriş listesini kendi listesi olarak üstleniyor.'
  ]
};

/* ---------- Trait Conflicts (framed as tradeoffs, not flaws) ---------- */

const TRAIT_CONFLICTS = [
  {
    when: b => b.openness >= 8 && b.conscientiousness <= 4,
    tag: 'Chaotic experimentation likely',
    note: 'Big imagination, light scaffolding — many starts, fewer finishes. Sometimes the start was the point.',
    i18n: {
      zh: { tag: '可能出现混乱式的尝试', note: '想象力丰盛、结构疏松——开头多,完成少。有时,"开头"本身就是意义。' },
      ja: { tag: '混沌とした試行が起こりやすい', note: '想像力豊かだが、骨組みは緩い——始まりは多く、終わりは少ない。ときに「始めたこと」自体が目的だ。' },
      ko: { tag: '어수선한 실험이 잦을 수 있음', note: '상상력은 풍부하지만 구조는 느슨하다 — 시작은 많고, 마무리는 드물다. 가끔은 시작 그 자체가 목적이다.' },
      tr: { tag: 'Dağınık deneme olasılığı', note: 'Hayal gücü geniş, çerçeve gevşek — çok başlar, az bitirir. Bazen başlamış olmak başlı başına amaçtır.' }
    }
  },
  {
    when: b => b.conscientiousness >= 8 && b.neuroticism >= 7,
    tag: 'Care that runs hot',
    note: 'Detail-oriented and easily worried. May need rest rituals more than most.',
    i18n: {
      zh: { tag: '用心过头的那种"在乎"', note: '注重细节,容易担心。比一般人更需要某种休息仪式。' },
      ja: { tag: '熱を帯びすぎる気遣い', note: '細部に目が届き、気をもみやすい。人より休息の儀式が必要かもしれない。' },
      ko: { tag: '마음 씀씀이가 뜨거워지는 편', note: '세세한 데까지 신경 쓰지만 쉽게 걱정한다. 누구보다 더 안정된 휴식의 의식이 필요할 수 있다.' },
      tr: { tag: 'Sıcakkanlı bir özen', note: 'Ayrıntıya dikkat eder, kolayca endişelenir. Çoğundan daha fazla dinlenme alışkanlığına ihtiyaç duyabilir.' }
    }
  },
  {
    when: b => b.openness >= 8 && b.extraversion <= 3,
    tag: 'Rich inner world, narrow social orbit',
    note: 'Vivid private universe. Possibly few people who fully see it; that\'s okay.',
    i18n: {
      zh: { tag: '内心世界丰盈,社交圈狭窄', note: '鲜活的私人宇宙。也许只有少数人能完全看见;这没关系。' },
      ja: { tag: '内側に豊かな世界、狭い社交範囲', note: '鮮やかな私的宇宙。完全に見える人は数えるほど——それでいい。' },
      ko: { tag: '풍요로운 내면, 좁은 사교 반경', note: '생생한 사적 우주가 있다. 온전히 그것을 보는 사람은 몇 안 될 수 있다 — 괜찮다.' },
      tr: { tag: 'Zengin bir iç dünya, dar bir sosyal yörünge', note: 'Canlı, özel bir evren. Onu tam görenler az olabilir; sorun değil.' }
    }
  },
  {
    when: b => b.agreeableness >= 8 && b.extraversion <= 3,
    tag: 'Gentle introvert',
    note: 'Cares deeply, in small circles. Often overlooked by louder rooms — and underestimated.',
    i18n: {
      zh: { tag: '温和的内向者', note: '在小圈子里深切地在乎。常被声音大的房间忽视——也常被低估。' },
      ja: { tag: 'やさしい内向型', note: '小さな輪のなかで深く心を寄せる。声の大きな場では見過ごされ、過小評価されがちだ。' },
      ko: { tag: '다정한 내향형', note: '작은 무리 안에서 깊이 마음을 쓴다. 시끄러운 방에서는 자주 묻히고, 늘 과소평가된다.' },
      tr: { tag: 'Yumuşak başlı bir içe dönük', note: 'Küçük çevrelerde derin bir özenle var olur. Sesi yüksek odalarda gözden kaçar — ve hep hafife alınır.' }
    }
  },
  {
    when: b => b.extraversion >= 8 && b.neuroticism >= 7,
    tag: 'Outwardly bright, inwardly stormy',
    note: 'Energy that performs may exhaust the performer. The crowd doesn\'t see the comedown.',
    i18n: {
      zh: { tag: '外表明亮,内心翻涌', note: '那份会"表演"的活力,可能正在耗尽表演者本人。人群看不到台下的低落。' },
      ja: { tag: '外は明るく、内は嵐', note: '人前で輝くエネルギーは、本人を消耗させているかもしれない。観客は、その後の沈み込みを見ない。' },
      ko: { tag: '겉은 환하고, 속은 요동치는', note: '무대 위 에너지는 정작 본인을 고갈시킨다. 관객은 그 뒤의 가라앉음을 보지 못한다.' },
      tr: { tag: 'Dışı parlak, içi fırtınalı', note: 'Sahnedeki enerji, sahnedeki kişiyi tüketebilir. Kalabalık, sonraki çöküşü görmez.' }
    }
  },
  {
    when: b => b.athletic >= 8 && b.conscientiousness <= 3,
    tag: 'High energy, low rails',
    note: 'Will outrun structure. Needs an outlet, not a leash.',
    i18n: {
      zh: { tag: '高能量,少边界', note: '会跑得比规矩还快。需要的是出口,而不是束缚。' },
      ja: { tag: 'エネルギーは高く、レールは少ない', note: '枠組みより先へ走り抜けてしまう。必要なのはリードではなく、出口だ。' },
      ko: { tag: '에너지는 높고, 레일은 적은', note: '틀보다 더 빨리 달려 나간다. 필요한 것은 줄이 아니라 발산할 곳이다.' },
      tr: { tag: 'Yüksek enerji, az ray', note: 'Düzeni geride bırakır. Tasmaya değil, bir çıkışa ihtiyacı vardır.' }
    }
  },
  {
    when: b => b.openness >= 8 && b.agreeableness <= 3,
    tag: 'Iconoclast tendencies',
    note: 'Will question loudly. Builds new rooms; sometimes upsets the old ones.',
    i18n: {
      zh: { tag: '偶像破坏者的倾向', note: '会大声质疑。会盖出新房间;有时也会让旧房间不安。' },
      ja: { tag: '偶像破壊の傾向', note: '声に出して問い直す。新しい部屋を建てる——ときに古い部屋を揺らしながら。' },
      ko: { tag: '우상 깨기 성향', note: '큰 소리로 묻는다. 새 방을 세우고, 때로는 옛 방을 흔든다.' },
      tr: { tag: 'Putları kıran bir eğilim', note: 'Yüksek sesle sorgular. Yeni odalar inşa eder; bazen eskilerini sarsar.' }
    }
  },
  {
    when: b => b.conscientiousness <= 3 && b.neuroticism <= 3,
    tag: 'Cheerfully disorganized',
    note: 'Not worried, also not planning. Lives are also lived this way; not less, just differently.',
    i18n: {
      zh: { tag: '散漫但开心', note: '不焦虑,也不计划。人生也可以这样过——并不更少,只是不同。' },
      ja: { tag: '朗らかに散らかっている', note: '心配しない、けれど計画もしない。そういう生き方もある——劣っているのではなく、ただ別のかたち。' },
      ko: { tag: '명랑하게 어수선한', note: '걱정도 없고 계획도 없다. 그런 식으로도 삶은 산다 — 부족한 것이 아니라, 다를 뿐.' },
      tr: { tag: 'Neşeyle dağınık', note: 'Kaygılanmaz, planlamaz da. Hayat böyle de yaşanır — eksik değil, farklı.' }
    }
  },
  {
    when: b => b.agreeableness >= 8 && b.neuroticism <= 3,
    tag: 'Steady kindness',
    note: 'Calm under pressure, kind by default. The kind of person other people want to be near.',
    i18n: {
      zh: { tag: '稳定的善意', note: '压力下保持平静,默认善良。是别人愿意靠近的那一种人。' },
      ja: { tag: '揺るぎないやさしさ', note: '圧の下でも穏やかで、基本がやさしい。人がそばにいたくなるタイプ。' },
      ko: { tag: '흔들리지 않는 다정함', note: '압박 속에서도 침착하고, 기본값이 친절하다. 사람들이 곁에 머물고 싶어 하는 종류의 사람.' },
      tr: { tag: 'Sarsılmaz bir nezaket', note: 'Baskı altında sakin, varsayılan olarak naziktir. İnsanların yakınında olmak istediği türden biri.' }
    }
  },
  {
    when: b => b.extraversion <= 3 && b.openness >= 8 && b.conscientiousness >= 7,
    tag: 'Quiet builder',
    note: 'Will make something interesting alone. Will not advertise it. World finds out later, or never.',
    i18n: {
      zh: { tag: '安静的建造者', note: '一个人也能做出有意思的东西。不会张扬。世界要么后来才知道,要么永远不知道。' },
      ja: { tag: '静かな作り手', note: '一人でも面白いものを作り上げる。宣伝はしない。世界は後から知るか、最後まで知らないかのどちらか。' },
      ko: { tag: '조용한 만드는 사람', note: '혼자서도 흥미로운 무언가를 만들어 낸다. 떠벌리지 않는다. 세상은 늦게 알거나, 끝내 모른다.' },
      tr: { tag: 'Sessiz bir kurucu', note: 'Tek başına ilginç bir şey yapar. Reklamını yapmaz. Dünya ya geç öğrenir ya da hiç öğrenmez.' }
    }
  }
];

/* ---------- Adult Futures (one fictional life per card) ---------- */

const ADULT_FUTURES = [
  { headline: 'Marine biologist who names every octopus.', details: ['Has a complicated relationship with one specific anglerfish.', 'Wears the same hoodie to every conference for 11 years.', 'Holds a personal record: longest time spent at one tide pool.'], tags: ['education'],
    i18n: {
      zh: { headline: '给每只章鱼取名字的海洋生物学家。', details: ['与一条特定的鮟鱇鱼有过一段复杂的感情。', '同一件连帽衫,穿去开了 11 年会议。', '个人纪录:在同一个潮汐池前停留时间最长。'] },
      ja: { headline: 'タコ一匹ずつに名前をつける海洋生物学者。', details: ['一匹のアンコウとは複雑な関係を抱えている。', '同じパーカーを11年間、すべての学会に着ていく。', '個人記録:ひとつのタイドプールに留まり続けた最長時間。'] },
      ko: { headline: '모든 문어에게 이름을 붙이는 해양생물학자.', details: ['어떤 한 마리 아귀와는 복잡한 관계를 맺고 있다.', '같은 후드티 한 벌을 11년 동안 모든 학회에 입고 다녔다.', '개인 기록: 한 조수 웅덩이에 가장 오래 머문 시간.'] },
      tr: { headline: 'Her ahtapota isim koyan deniz biyoloğu.', details: ['Belirli bir fener balığıyla karmaşık bir ilişkisi var.', 'On bir yıl boyunca her konferansa aynı kapüşonluyla gitti.', 'Kişisel rekor: tek bir gelgit havuzunda geçirilen en uzun süre.'] }
    } },
  { headline: 'Exhausted but beloved startup founder.', details: ['Pitched a productivity app while half-asleep on a flight.', 'Has strong opinions about chairs.', 'Will eventually pivot to artisan pickles.'], tags: ['economy'],
    i18n: {
      zh: { headline: '精疲力竭却深受爱戴的创始人。', details: ['在飞机上半睡半醒之间介绍过一款生产力 App。', '对椅子有很坚定的看法。', '最终会转去做手工腌菜。'] },
      ja: { headline: '疲れ果てているのに皆に愛される創業者。', details: ['飛行機の中で半分眠りながら、生産性アプリのピッチをした。', '椅子について強いこだわりがある。', 'いずれは手作りのピクルス事業に方向転換する。'] },
      ko: { headline: '지쳐 있지만 사랑받는 스타트업 창업자.', details: ['비행기에서 반쯤 졸면서 생산성 앱을 피칭한 적이 있다.', '의자에 대해 확고한 의견을 가지고 있다.', '결국은 수제 피클 쪽으로 방향을 트게 된다.'] },
      tr: { headline: 'Yorgun düşmüş ama herkesin sevdiği startup kurucusu.', details: ['Uçakta yarı uykulu, bir verimlilik uygulamasını sunmuş.', 'Sandalyeler konusunda kesin görüşleri var.', 'Sonunda el yapımı turşu işine dönecek.'] }
    } },
  { headline: 'Art teacher who somehow knows every kid in town.', details: ['Carries glitter in their pocket "for emergencies."', 'Once made a 20-foot papier-mâché whale during summer break.', 'Has 14 framed crayon portraits.'], tags: ['family'],
    i18n: {
      zh: { headline: '不知怎么就认识镇上每个孩子的美术老师。', details: ['口袋里随时带着金粉,"以防万一"。', '暑假期间做过一只六米长的纸塑鲸鱼。', '家里挂着 14 幅装裱过的蜡笔肖像。'] },
      ja: { headline: '町じゅうの子を、なぜか全員知っている図工の先生。', details: ['ポケットには「いざというとき」のためのラメ。', '夏休みに6メートルの紙粘土クジラを作ったことがある。', '額装したクレヨンの肖像画を14枚持っている。'] },
      ko: { headline: '어쩐 일인지 동네 아이들을 모두 아는 미술 선생님.', details: ['"비상용"이라며 주머니에 반짝이를 넣고 다닌다.', '여름방학에 6미터짜리 종이반죽 고래를 만든 적이 있다.', '액자에 든 크레용 초상화가 14점 있다.'] },
      tr: { headline: 'Nasıl olduysa kasabadaki her çocuğu tanıyan resim öğretmeni.', details: ['Cebinde "acil durumlar için" sim taşır.', 'Bir yaz tatilinde 6 metrelik kâğıt hamurundan balina yaptı.', 'On dört çerçeveli mum boya portresi var.'] }
    } },
  { headline: 'Conspiracy podcaster — but the wholesome kind.', details: ['Sincerely believes the moon is fine, actually.', 'Has guests on to debunk their own hosts.', 'Discovered, on episode 87, they are the conspiracy.'], tags: ['internet'],
    i18n: {
      zh: { headline: '阴谋论播客主——但是治愈系的那种。', details: ['真心觉得"月亮其实没问题"。', '经常请嘉宾来反驳自家主持人。', '在第 87 集发现:自己就是那个阴谋。'] },
      ja: { headline: '陰謀論ポッドキャスター——ただし、ほんわか系の。', details: ['「月、別に大丈夫」と本気で信じている。', '自分たち司会者の説を否定しに来るゲストを呼んでくる。', '第87回で気づく——陰謀は自分たちだった。'] },
      ko: { headline: '음모론 팟캐스터 — 다정한 쪽의.', details: ['"사실 달은 멀쩡하다"라고 진심으로 믿는다.', '본인 진행자의 주장을 반박하러 오는 게스트를 모신다.', '87회에서 알게 된다 — 음모는 본인이었다는 것을.'] },
      tr: { headline: 'Komplo podcastçisi — ama tatlı çeşidinden.', details: ['"Ayda hiçbir sorun yok aslında" diye içtenlikle inanır.', 'Kendi sunucularını çürütmeye gelen konukları davet eder.', '87. bölümde anlar: komplo aslında kendileridir.'] }
    } },
  { headline: 'Astronaut who keeps a tiny indoor garden in orbit.', details: ['Has cried over a successful sprout. Twice.', 'Brings one (1) absurd snack on every mission.', 'Now answers questions in 3 languages.'], tags: ['education', 'multilingual'],
    i18n: {
      zh: { headline: '在轨道上养着一座小小室内花园的宇航员。', details: ['因为一根成功发芽的小苗哭过——两次。', '每次任务都会带上一份(只一份)荒诞的小零食。', '现在用三种语言回答记者的问题。'] },
      ja: { headline: '軌道上で小さな室内菜園を世話する宇宙飛行士。', details: ['うまく発芽した一本に、二度、涙したことがある。', 'どのミッションにも、ばかげたスナックを「ひとつ」だけ持ち込む。', 'いまは三か国語で記者の質問に答える。'] },
      ko: { headline: '궤도 위에서 작은 실내 정원을 가꾸는 우주비행사.', details: ['잘 자라준 새싹 하나에 두 번 울어봤다.', '미션마다 어처구니없는 간식 한(1) 가지를 챙긴다.', '이제는 질문에 세 가지 언어로 답한다.'] },
      tr: { headline: 'Yörüngede minik bir kapalı bahçe yetiştiren astronot.', details: ['Çimlenen bir filiz için ağladı — iki kez.', 'Her görevde bir(1) saçma atıştırmalık götürür.', 'Artık sorulara üç dilde cevap veriyor.'] }
    } },
  { headline: 'Indie musician with one cult-favorite song.', details: ['Plays venues with exactly 47 people in them.', 'Their song is on a movie\'s closing credits no one watched.', 'Refuses to explain the lyrics. Lyrics are about pasta.'], tags: ['internet'],
    i18n: {
      zh: { headline: '有一首小众神曲的独立音乐人。', details: ['演出场地里总刚好坐着 47 个人。', '那首歌出现在一部没人看的电影的片尾字幕里。', '拒绝解释歌词——其实歌词写的是意大利面。'] },
      ja: { headline: '一曲だけがカルト的人気のインディーミュージシャン。', details: ['ライブ会場の客はいつもきっかり47人。', '例の曲は、誰も観なかった映画のエンドロールに流れている。', '歌詞の意味は決して語らない——内容はパスタについて。'] },
      ko: { headline: '컬트적 인기를 가진 한 곡의 인디 뮤지션.', details: ['정확히 47명이 들어찬 공연장에서만 무대에 선다.', '그 곡은 아무도 안 본 영화의 엔딩 크레딧에 들어가 있다.', '가사 의미는 절대 설명하지 않는다 — 사실은 파스타 이야기다.'] },
      tr: { headline: 'Tek bir kült favori şarkısı olan bağımsız müzisyen.', details: ['Tam tamına 47 kişinin olduğu mekânlarda çalar.', 'O şarkı, kimsenin izlemediği bir filmin jeneriğindedir.', 'Sözleri açıklamayı reddeder. Aslında konu makarna.'] }
    } },
  { headline: 'Chaotic internet celebrity (mostly accidental).', details: ['Went viral for explaining tax code while baking bread.', 'Owns four cameras and one ring light.', 'Has a calendar app that just says "vibes only."'], tags: ['internet'],
    i18n: {
      zh: { headline: '混乱型互联网名人(基本是不小心红的)。', details: ['因为一边烤面包一边讲税法而走红。', '拥有四台相机和一盏环形灯。', '日历 App 里只有一行字:"全凭感觉。"'] },
      ja: { headline: '偶然できあがった、ちょっと混沌系のネット有名人。', details: ['パンを焼きながら税法を解説する動画でバズる。', 'カメラ4台とリングライト1個を持つ。', 'カレンダーアプリの予定欄には「フィーリングで」とだけ書いてある。'] },
      ko: { headline: '어쩌다 보니 만들어진 카오스 인터넷 셀럽.', details: ['빵을 구우며 세법을 설명하다가 바이럴이 됐다.', '카메라 네 대와 링 라이트 하나가 있다.', '캘린더 앱에는 그저 "분위기 따라"라고만 적혀 있다.'] },
      tr: { headline: 'Çoğunlukla tesadüfen oluşmuş kaotik internet ünlüsü.', details: ['Ekmek yaparken vergi yasasını anlatarak viral oldu.', 'Dört kamerası ve bir ring ışığı var.', 'Takviminde sadece "moduna göre" yazıyor.'] }
    } },
  { headline: 'High-school physics teacher of legend.', details: ['Has demonstrated centripetal force using a frozen turkey.', 'Refers to gravity as "her old friend."', 'Several students will go on to thank them by name.'], tags: ['education'],
    i18n: {
      zh: { headline: '传说级别的高中物理老师。', details: ['用一只冷冻火鸡示范过向心力。', '把万有引力称作"自己的老朋友"。', '好几位学生日后会专门指名感谢她。'] },
      ja: { headline: '伝説の高校物理教師。', details: ['凍った七面鳥で求心力を実演したことがある。', '重力を「古い友人」と呼ぶ。', '何人もの教え子が、後年その人を名指しで感謝することになる。'] },
      ko: { headline: '전설로 통하는 고등학교 물리 선생님.', details: ['냉동 칠면조로 구심력을 시연한 적이 있다.', '중력을 "오랜 친구"라 부른다.', '훗날 여러 제자가 이름을 콕 집어 감사의 인사를 남기게 된다.'] },
      tr: { headline: 'Efsane lise fizik öğretmeni.', details: ['Donmuş bir hindiyle merkezcil kuvveti gösterdi.', 'Yerçekimini "eski dostum" diye anar.', 'Yıllar sonra birkaç öğrenci ona adıyla teşekkür edecek.'] }
    } },
  { headline: 'Animal shelter director who knows every dog\'s name.', details: ['Sleeps with at least one (1) cat per night.', 'Once convinced a city council to adopt a goose.', 'Cries at every adoption — staff has stopped asking.'], tags: ['family'],
    i18n: {
      zh: { headline: '记得每只狗名字的动物收容所所长。', details: ['每晚至少和一(1)只猫一起睡。', '曾经成功说服市议会"收养"一只大鹅。', '每次有动物被领养都会哭——员工早已不问了。'] },
      ja: { headline: 'すべての犬の名前を覚えている動物保護施設の施設長。', details: ['毎晩、必ず一(1)匹の猫と一緒に眠る。', '市議会を説き伏せて、ガチョウを一羽「採用」させたことがある。', '動物が引き取られるたびに泣く——スタッフはもう何も尋ねない。'] },
      ko: { headline: '모든 개의 이름을 기억하는 동물보호소 소장.', details: ['매일 밤 적어도 고양이 한(1) 마리와 함께 잔다.', '시의회를 설득해 거위 한 마리를 입양시킨 적이 있다.', '입양이 있을 때마다 운다 — 직원들은 이제 묻지도 않는다.'] },
      tr: { headline: 'Her köpeğin adını bilen hayvan barınağı müdürü.', details: ['Her gece en az bir(1) kediyle uyur.', 'Bir kez belediye meclisini ikna edip bir kazı sahiplendirmiş.', 'Her sahiplendirmede ağlar — ekip artık sormuyor.'] }
    } },
  { headline: 'Mid-list novelist who finally finishes the trilogy.', details: ['Argued with their editor about commas for 4 years.', 'Has 11 unfinished drafts in a desk drawer.', 'One reader writes them every Christmas.'], tags: ['education'],
    i18n: {
      zh: { headline: '终于写完三部曲的中等销量小说家。', details: ['跟编辑为标点逗号吵了整整四年。', '抽屉里塞着 11 份未完稿。', '每年圣诞节都有同一位读者写信给他/她。'] },
      ja: { headline: '三部作をようやく書き終えた、中堅の小説家。', details: ['編集者とコンマをめぐって四年争った。', '引き出しには未完成の原稿が11本眠っている。', 'クリスマスのたびに、同じ一人の読者から手紙が届く。'] },
      ko: { headline: '마침내 삼부작을 끝낸 중견 소설가.', details: ['편집자와 쉼표 문제로 4년을 다퉜다.', '책상 서랍에 완성되지 못한 원고 열한 편이 있다.', '매년 크리스마스마다 같은 독자 한 명이 편지를 보낸다.'] },
      tr: { headline: 'Üçlemesini sonunda bitiren orta düzeyde okunan romancı.', details: ['Editörüyle dört yıl boyunca virgüller üzerine tartıştı.', 'Çalışma masasının çekmecesinde on bir yarım taslak var.', "Her Noel'de aynı bir okuyucu ona mektup yazar."] }
    } },
  { headline: 'Civic-organizer who fixes one impossible street.', details: ['Knows every neighbor by their grocery routine.', 'Has a binder. Several binders. Color-coded.', 'Will become a low-key local legend.'], tags: ['family'],
    i18n: {
      zh: { headline: '把一条"不可能修好"的街道修复了的社区组织者。', details: ['通过买菜的习惯认识每一位邻居。', '拥有一本活页夹——准确说,好几本,全部彩色标签分类。', '会成为低调的当地传奇人物。'] },
      ja: { headline: '「直しようのない」一本の通りを、なんとかしてしまう地域コーディネーター。', details: ['近所の人を、買い物の習慣から覚えている。', 'バインダーを一冊——いや、何冊も、色分けして管理している。', 'いつしか、知る人ぞ知るその土地の伝説になる。'] },
      ko: { headline: '도저히 못 고친다던 한 거리를 결국 고친 동네 코디네이터.', details: ['이웃들을 그들의 장보기 습관으로 알아본다.', '바인더 한 권 — 사실 여러 권을, 색깔별로 정리해 둔다.', '어느새 동네에서 조용한 전설이 된다.'] },
      tr: { headline: '"Düzelmez" denen bir caddeyi onaran sivil organizatör.', details: ['Her komşuyu market alışkanlığından tanır.', 'Bir klasörü var. Birkaç klasörü; hepsi renk kodlu.', 'Zamanla mütevazı bir yerel efsaneye dönüşecek.'] }
    } },
  { headline: 'Bartender / amateur philosopher / good listener.', details: ['Remembers every regular\'s order and their mother\'s birthday.', 'Has a side hustle reading tarot at brunch.', 'Once accidentally married two strangers via toast.'], tags: ['social'],
    i18n: {
      zh: { headline: '调酒师 / 业余哲学家 / 很好的倾听者。', details: ['记得每位常客的点单,也记得他们母亲的生日。', '副业是在早午餐时段帮人塔罗占卜。', '曾因为一次祝酒,不小心给两位陌生人办了一场婚礼。'] },
      ja: { headline: 'バーテンダー 兼 アマチュア哲学者 兼 聞き上手。', details: ['すべての常連の注文と、その人の母親の誕生日を覚えている。', '副業として、ブランチ会場でタロット占いをやっている。', 'ある日の乾杯のセリフで、見知らぬ二人を「結婚」させてしまった。'] },
      ko: { headline: '바텐더 겸 아마추어 철학자 겸 잘 들어주는 사람.', details: ['단골 모두의 주문과 그들의 어머니 생일까지 기억한다.', '사이드 잡으로 브런치에서 타로 점을 본다.', '어느 날 건배사 한 번으로 낯선 두 사람을 결혼시킨 적이 있다.'] },
      tr: { headline: 'Barmen / amatör filozof / iyi bir dinleyici.', details: ['Her müdavimin siparişini ve annesinin doğum gününü hatırlar.', 'Brunchlerde tarot okumayı ek iş olarak yapar.', 'Bir keresinde kadeh kaldırırken iki yabancıyı kazara evlendirdi.'] }
    } },
  { headline: 'Software engineer who maintains one cursed open-source tool.', details: ['Tool is depended on by 600 companies.', 'Lives on hobby farm. Has chickens named after data structures.', 'Reviews pull requests in dry one-liners.'], tags: ['economy'],
    i18n: {
      zh: { headline: '维护着一款"被诅咒的"开源工具的软件工程师。', details: ['这工具被 600 家公司依赖。', '住在自家小农场,鸡的名字全是数据结构。', '审 Pull Request 时只用一句冷冰冰的注释。'] },
      ja: { headline: '「呪われた」オープンソースツールを一人で守るソフトウェアエンジニア。', details: ['そのツールに依存している企業は600社。', '趣味の小さな農場で暮らし、鶏には全部データ構造の名前をつけている。', 'プルリクのレビューは、たいてい一行のドライな指摘で済ます。'] },
      ko: { headline: "'저주받은' 오픈소스 도구 하나를 관리하는 소프트웨어 엔지니어.", details: ['그 도구에 의존하는 회사가 600곳에 이른다.', '취미로 운영하는 농장에 살며, 닭들 이름은 모두 자료 구조에서 따왔다.', '풀 리퀘스트 리뷰는 늘 건조한 한 줄로 끝낸다.'] },
      tr: { headline: 'Bir "lanetli" açık kaynak aracı tek başına sürdüren yazılım mühendisi.', details: ['O aracı 600 şirket kullanıyor.', 'Hobi olarak kurduğu çiftlikte yaşar; tavuklarına veri yapılarının adını verir.', 'Pull request incelemelerini kuru, tek satırlık yorumlarla kapatır.'] }
    } },
  { headline: 'Roving sourdough evangelist.', details: ['Travels with a starter named after a 19th-century philosopher.', 'Has converted three former rivals.', 'Bakes are 80% delicious, 20% lessons.'], tags: ['urbanRural'],
    i18n: {
      zh: { headline: '四处布道的酸面包传教士。', details: ['随身带着一份以 19 世纪哲学家命名的面种。', '已经把三位曾经的对手"皈依"了酸面包。', '烤出来的成品 80% 是美味,20% 是教训。'] },
      ja: { headline: '各地を巡るサワードウ伝道師。', details: ['19世紀の哲学者にちなんだ名前のスターターを連れて旅をしている。', 'かつてのライバル三人を「改宗」させた実績がある。', '焼くものは80%が美味、20%が教訓。'] },
      ko: { headline: '사방을 떠도는 사워도우 전도사.', details: ['19세기 철학자의 이름을 붙인 스타터를 늘 가지고 다닌다.', '한때 라이벌이었던 세 사람을 사워도우로 개종시켰다.', '구운 빵은 80%가 맛, 20%가 교훈.'] },
      tr: { headline: 'Diyar diyar gezen ekşi maya havarisi.', details: ['Yanında 19. yüzyıl filozofunun adını taşıyan bir başlatıcı taşır.', 'Eski rakiplerinden üçünü kendi tarafına çekti.', 'Ekmekleri %80 lezzet, %20 ders.'] }
    } },
  { headline: 'Volunteer firefighter and small-town historian.', details: ['Has rescued one (1) cat. The cat owes them.', 'Writes the town\'s newsletter. It is unexpectedly funny.', 'Knows where every cornerstone is buried.'], tags: ['urbanRural', 'family'],
    i18n: {
      zh: { headline: '既是志愿消防员又是小镇历史学家。', details: ['救过一(1)只猫。那只猫欠他/她一个人情。', '写小镇通讯。意想不到地有趣。', '知道每一块奠基石埋在哪里。'] },
      ja: { headline: 'ボランティアの消防士であり、町の歴史家でもある人。', details: ['救った猫は一(1)匹。その猫には貸しがある。', '町のニュースレターを書いている。想像以上に面白い。', 'どの礎石がどこに埋まっているかをすべて知っている。'] },
      ko: { headline: '자원 소방관이자 작은 마을의 역사학자.', details: ['구조한 고양이는 한(1) 마리. 그 고양이는 본인에게 빚을 졌다.', '마을 소식지를 쓴다. 의외로 무척 재미있다.', '모든 머릿돌이 어디에 묻혀 있는지 안다.'] },
      tr: { headline: 'Hem gönüllü itfaiyeci hem küçük kasaba tarihçisi.', details: ['Bir(1) kediyi kurtardı. O kedi ona borçlu.', 'Kasabanın bültenini yazar. Beklenmedik biçimde komiktir.', 'Her temel taşının nereye gömüldüğünü bilir.'] }
    } },
  { headline: 'Translator-by-day, sci-fi-writer-by-night.', details: ['Has translated 5 languages, invented 2 more.', 'Their pseudonym has its own fans.', 'Tea consumption: industrial.'], tags: ['multilingual'],
    i18n: {
      zh: { headline: '白天做翻译,晚上写科幻的人。', details: ['翻译过 5 种语言,自己又发明了 2 种。', '笔名也已经有自己的粉丝团。', '茶叶消耗量:工业级。'] },
      ja: { headline: '昼は翻訳者、夜はSF作家。', details: ['5つの言語を翻訳し、もう2つの言語を自分でつくった。', 'ペンネームには、その筆名だけのファンがいる。', 'お茶の消費量は産業規模。'] },
      ko: { headline: '낮에는 번역가, 밤에는 SF 작가.', details: ['다섯 가지 언어를 번역하고, 두 가지 언어를 새로 만들어냈다.', '필명에도 별도의 팬이 있다.', '차 소비량: 산업적 규모.'] },
      tr: { headline: 'Gündüz çevirmen, gece bilim kurgu yazarı.', details: ['Beş dilden çeviri yaptı, iki dili kendi icat etti.', 'Takma adının ayrı bir hayran kitlesi var.', 'Çay tüketimi: endüstriyel.'] }
    } },
  { headline: 'Pediatrician who lets every kid name a fictional dinosaur.', details: ['Office wallpaper is the resulting list.', 'Has been on a sticker shortage watchlist twice.', 'Knows when to refer out and when to wait.'], tags: ['healthcare'],
    i18n: {
      zh: { headline: '让每个小朋友给虚构恐龙取名字的儿科医生。', details: ['诊室墙纸上印满了这些名字。', '曾两次被列入"贴纸短缺关注名单"。', '知道什么时候要转诊,什么时候要再等等。'] },
      ja: { headline: 'どの子にも架空の恐竜の名前をつけさせる小児科医。', details: ['診察室の壁紙には、その名前のリストが印刷されている。', '「シール在庫不足注意リスト」に二度名前が載った。', '紹介状を書くべきとき、待つべきときをよく心得ている。'] },
      ko: { headline: '모든 아이에게 가상의 공룡 이름을 짓게 해주는 소아과 의사.', details: ['진료실 벽지에는 그 이름들이 가득 인쇄돼 있다.', '"스티커 부족 주의 명단"에 두 번 올랐다.', '의뢰서를 쓸 때와, 기다려야 할 때를 안다.'] },
      tr: { headline: 'Her çocuğa hayali bir dinozora ad koyduran çocuk doktoru.', details: ['Muayene odasının duvar kâğıdı bu isimlerden oluşan listedir.', 'İki kez "çıkartma sıkıntısı izleme listesi"ne girdi.', 'Ne zaman sevk yapılacağını, ne zaman bekleneceğini iyi bilir.'] }
    } },
  { headline: 'Park ranger fluent in stars.', details: ['Runs once-a-month "look up" nights for the town.', 'Speaks softly to bears. Has reasons.', 'Carries a beat-up copy of Annie Dillard everywhere.'], tags: ['urbanRural', 'education'],
    i18n: {
      zh: { headline: '对星空了如指掌的公园管理员。', details: ['每月一次,为镇上举办"抬头看"夜晚活动。', '对熊讲话很轻——理由很多。', '随身带着一本翻烂的 Annie Dillard。'] },
      ja: { headline: '星空に通じた公園レンジャー。', details: ['月に一度、町のために「空を見上げる夜」を主催する。', '熊にはやさしく話しかける——きちんと理由がある。', 'どこへ行くにも、よれよれのアニー・ディラードの本を携えている。'] },
      ko: { headline: '별자리에 정통한 공원 레인저.', details: ['매달 한 번, 마을 사람들과 함께 "고개를 들어 보는 밤"을 연다.', '곰에게도 부드럽게 말한다 — 그럴 만한 이유가 있다.', '어디에나 너덜너덜한 애니 딜라드 책을 들고 다닌다.'] },
      tr: { headline: 'Yıldızları akıcı konuşan park korucusu.', details: ['Ayda bir, kasaba için "yukarı bak" geceleri düzenler.', 'Ayılarla yumuşak bir sesle konuşur. Gerekçeleri var.', 'Yanından eski püskü bir Annie Dillard kitabı eksik olmaz.'] }
    } },
  { headline: 'Logistics savant at a mid-sized warehouse.', details: ['Reorganized the loading bay; saved 40 minutes a day.', 'Knows the entire crew\'s coffee orders.', 'Plays the harmonica on lunch breaks.'], tags: ['economy'],
    i18n: {
      zh: { headline: '在中等规模仓库里的物流奇才。', details: ['重新调整了装卸区,每天省下 40 分钟。', '记得全员的咖啡偏好。', '午休时吹口琴。'] },
      ja: { headline: '中規模倉庫の物流の達人。', details: ['荷捌き場を組み直し、毎日40分を浮かせた。', '同僚全員のコーヒーの好みを覚えている。', '昼休みにはハーモニカを吹く。'] },
      ko: { headline: '중간 규모 창고의 물류 천재.', details: ['적재 구역을 재구성해 매일 40분을 줄였다.', '동료 모두의 커피 취향을 알고 있다.', '점심시간에는 하모니카를 분다.'] },
      tr: { headline: 'Orta ölçekli bir depoda lojistik dahisi.', details: ['Yükleme alanını yeniden düzenleyip günde 40 dakika kazandırdı.', 'Tüm ekibin kahve siparişlerini bilir.', 'Öğle aralarında mızıka çalar.'] }
    } },
  { headline: 'Therapist who keeps a "patience plant" by the window.', details: ['Refuses to keep a clock visible.', 'Has cried, professionally, only twice.', 'Reads three novels at once.'], tags: ['healthcare', 'family'],
    i18n: {
      zh: { headline: '在窗边养着一盆"耐心植物"的心理师。', details: ['拒绝把钟挂在显眼的位置。', '工作期间总共只哭过两次。', '同时在读三本小说。'] },
      ja: { headline: '窓辺に「忍耐の植物」を置くセラピスト。', details: ['時計を見える場所には置かない、と決めている。', '仕事中に涙したのは、これまでにたった二度。', '小説を同時に三冊読んでいる。'] },
      ko: { headline: "창가에 '인내의 화분'을 두는 심리치료사.", details: ['시계가 보이는 곳에 걸리는 것을 단호히 거부한다.', '일하면서 운 적은 단 두 번뿐이다.', '소설 세 권을 동시에 읽는다.'] },
      tr: { headline: 'Pencere kenarında bir "sabır bitkisi" tutan terapist.', details: ['Görünür bir saat bulunmasına izin vermez.', 'Mesleği gereği yalnızca iki kez ağladı.', 'Aynı anda üç roman okur.'] }
    } },
  { headline: 'Mediocre-but-cherished community-theater director.', details: ['Cast a chicken once. The chicken got a callback.', 'Has saved every program from every show.', 'Friends with the lighting tech for life.'], tags: ['social'],
    i18n: {
      zh: { headline: '才华一般却深受爱戴的社区剧场导演。', details: ['给一只鸡选过角色。那只鸡还接到了二轮试镜。', '把每场演出的节目单都收着。', '与灯光技术员结下了一辈子的友谊。'] },
      ja: { headline: '才能はそこそこなのに、皆に大事にされる地域劇場の演出家。', details: ['一度、鶏をオーディションした。鶏は二次面接まで進んだ。', '上演したすべての公演のプログラムを取ってある。', '照明スタッフとは生涯の友人になった。'] },
      ko: { headline: '평범하지만 모두에게 사랑받는 지역 극단 연출가.', details: ['한 번은 닭에게 배역을 줬다. 그 닭은 콜백까지 받았다.', '모든 공연의 팸플릿을 빠짐없이 보관해 두었다.', '조명 담당 스태프와 평생의 친구가 됐다.'] },
      tr: { headline: 'Vasat ama herkesin baş tacı olan mahalle tiyatrosu yönetmeni.', details: ['Bir keresinde bir tavuğa rol verdi. Tavuk geri çağrıldı.', 'Her oyunun her programını sakladı.', 'Işık teknisyeniyle ömür boyu sürecek bir dostluğu var.'] }
    } },
  { headline: 'Cooperative-board member of a tiny grocery.', details: ['Argues for the bulk-grains section in every meeting.', 'Knows which two members are secretly dating.', 'Bakes for every neighbor on their birthday.'], tags: ['urbanRural'],
    i18n: {
      zh: { headline: '小型合作社杂货店的理事会成员。', details: ['每次开会都为"散装杂粮区"力争。', '知道哪两位成员在悄悄约会。', '邻居生日时给每个人烤一份点心。'] },
      ja: { headline: '小さな協同組合スーパーの理事の一人。', details: ['毎回の会議で「量り売り穀物コーナー」を擁護する。', 'メンバーのなかで誰と誰がこっそり付き合っているか知っている。', 'ご近所の誕生日には欠かさず焼き菓子を届ける。'] },
      ko: { headline: '작은 협동조합 마트의 이사회 멤버.', details: ["회의 때마다 '벌크 곡물 코너'를 옹호한다.", '회원 중 누가 몰래 사귀고 있는지 알고 있다.', '이웃의 생일마다 빵이나 과자를 굽는다.'] },
      tr: { headline: 'Küçük bir kooperatif marketin yönetim kurulu üyesi.', details: ['Her toplantıda "dökme tahıl reyonu" için savaşır.', 'Hangi iki üyenin gizlice flört ettiğini bilir.', 'Her komşunun doğum gününde fırından bir şeyler hazırlar.'] }
    } },
  { headline: 'Aerospace technician with a side career in jazz piano.', details: ['Plays a smoky lounge twice a month.', 'Has solved one truly puzzling shuttle malfunction.', 'Wears the same lucky watch to both jobs.'], tags: ['education'],
    i18n: {
      zh: { headline: '航天技师,副业是爵士钢琴。', details: ['每月有两次在烟雾缭绕的小酒馆里演奏。', '解决过一桩真正让人摸不着头脑的航天故障。', '两份工作都戴着同一只"幸运手表"。'] },
      ja: { headline: '航空宇宙の整備士で、副業はジャズピアニスト。', details: ['月に二度、煙のこもったラウンジで演奏する。', '本当に厄介だったシャトルの故障を一度だけ解いたことがある。', '二つの仕事のどちらにも、同じ「ラッキー時計」を着けていく。'] },
      ko: { headline: '항공우주 기술자이자 부업으로 재즈 피아노를 친다.', details: ['한 달에 두 번, 담배 연기 자욱한 라운지에서 연주한다.', '정말 골치 아팠던 셔틀 결함을 한 번 풀어낸 적이 있다.', "두 일터 모두에 같은 '행운의 시계'를 차고 간다."] },
      tr: { headline: 'Havacılık teknisyeni; yan kariyer olarak caz piyanisti.', details: ["Ayda iki kez, duman içindeki bir lounge'da çalar.", 'Gerçekten içinden çıkılmaz bir mekik arızasını çözmüştür.', 'İki işine de aynı "uğurlu saatini" takar.'] }
    } },
  { headline: 'Local linguist who documents an endangered dialect.', details: ['Records elders over kitchen tables; their files are precious.', 'Has been adopted, informally, by three families.', 'Is writing a dictionary by hand.'], tags: ['multilingual', 'family'],
    i18n: {
      zh: { headline: '在记录一种濒危方言的本地语言学家。', details: ['在厨房餐桌旁录下长辈们的话语;那些音频弥足珍贵。', '已经被三家家庭"非正式地"收作家人。', '正在用手书写一部词典。'] },
      ja: { headline: '消滅の危機にある方言を記録する地元の言語学者。', details: ['台所のテーブル越しに長老たちの語りを録音し続けている——その音源はかけがえのない宝物だ。', '三つの家族から、非公式に「家族の一員」として迎えられている。', '手書きで辞書を書いている。'] },
      ko: { headline: '사라져가는 방언을 기록하는 지역 언어학자.', details: ['부엌 식탁에서 어르신들의 말씀을 녹음한다. 그 파일들은 너무도 귀중하다.', '세 가족이 비공식적으로 그를 "가족"으로 받아들였다.', '손으로 사전 한 권을 쓰고 있다.'] },
      tr: { headline: 'Tehlikedeki bir lehçeyi kayıt altına alan yerel dilbilimci.', details: ['Mutfak masasında yaşlıları kaydeder; bu dosyalar paha biçilmezdir.', 'Üç aile tarafından gayriresmî biçimde "evlat" edinilmiştir.', 'Elle bir sözlük yazıyor.'] }
    } },
  { headline: 'Bookstore owner running a wildly specific genre section.', details: ['Genre section: "novels with one (1) lighthouse."', 'Hosts an unbearably charming monthly reading.', 'Has a cat named after a literary theorist.'], tags: ['urbanRural'],
    i18n: {
      zh: { headline: '经营一个极其细分小区的书店老板。', details: ['那个分区叫:"含一(1)座灯塔的小说"。', '每月办一次令人忍不住喜欢的朗读会。', '养着一只以文学理论家命名的猫。'] },
      ja: { headline: '異常にニッチなコーナーを擁する書店の店主。', details: ['そのコーナーの名は「灯台が一(1)基出てくる小説」。', '毎月ひらく朗読会は、ばかばかしいほど魅力的。', '文芸理論家にちなんだ名前の猫がいる。'] },
      ko: { headline: '유난히 좁고 분명한 코너를 운영하는 서점 주인.', details: ['그 코너의 이름은 "등대 한(1) 개가 등장하는 소설들".', '매달 여는 낭독회가 견딜 수 없을 만큼 사랑스럽다.', '문학 이론가의 이름을 딴 고양이를 키운다.'] },
      tr: { headline: 'Olağanüstü spesifik bir köşesi olan kitapçı sahibi.', details: ['Köşenin adı: "İçinde bir(1) deniz feneri olan romanlar."', 'Aylık okuma etkinlikleri dayanılmaz derecede çekicidir.', 'Bir edebiyat kuramcısının adını taşıyan bir kedisi var.'] }
    } },
  { headline: 'Climate-policy wonk who actually changes one law.', details: ['Spent 11 years on the same comma.', 'Reads regulatory PDFs for pleasure.', 'Hosts excellent dinner parties for very tired colleagues.'], tags: ['education', 'social'],
    i18n: {
      zh: { headline: '真的让一条法律得以修改的气候政策专家。', details: ['在同一个逗号上耗了 11 年。', '把读监管 PDF 当作消遣。', '给极度疲惫的同事们办很棒的晚宴。'] },
      ja: { headline: '一本の法律を本当に変えてしまった、気候政策のオタク。', details: ['同じコンマに11年を費やした。', '規制関連のPDFを娯楽として読む。', '疲れきった同僚たちのために、極上のディナーパーティーを開く。'] },
      ko: { headline: '정말로 법 한 줄을 바꾼 기후 정책 마니아.', details: ['같은 쉼표 하나에 11년을 썼다.', '규제 관련 PDF를 취미로 읽는다.', '지친 동료들을 위해 훌륭한 만찬을 연다.'] },
      tr: { headline: 'Gerçekten bir yasayı değiştirebilen iklim politikası uzmanı.', details: ['Aynı virgül üzerine 11 yıl harcadı.', "Hobi olarak regülasyon PDF'leri okur.", 'Çok yorgun meslektaşları için harika akşam yemekleri verir.'] }
    } }
];

/* ---------- Adult-mode pools (clinical, grounded) ---------- */

const ADULT_FUTURES_CLINICAL = [
  { headline: 'Physician with chronic burnout.', details: ['Works in a competitive teaching hospital.', 'Has not taken a full vacation in six years.', 'Considering a career pivot to research.'], tags: ['healthcare','education'],
    i18n: {
      zh: { headline: '长期处于慢性倦怠的临床医师。', details: ['任职于一家竞争激烈的教学医院。', '六年来未休过一次完整的假期。', '正在考虑转向研究方向。'] },
      ja: { headline: '慢性的なバーンアウトを抱える臨床医。', details: ['競争の激しい教育病院に勤務。', 'この六年間、まとまった休暇を取っていない。', '研究職への転身を検討中。'] },
      ko: { headline: '만성 번아웃을 겪고 있는 의사.', details: ['경쟁이 치열한 교육 병원에서 근무한다.', '6년 동안 제대로 된 휴가를 쓴 적이 없다.', '연구직 전환을 고려 중이다.'] },
      tr: { headline: 'Kronik tükenmişlik yaşayan hekim.', details: ['Rekabetçi bir eğitim hastanesinde çalışıyor.', 'Altı yıldır tam tatile çıkmadı.', 'Araştırmaya geçişi düşünüyor.'] }
    } },
  { headline: 'Startup founder, unstable work-life balance.', details: ['Series B raised; sleep schedule largely theoretical.', 'Lost two close friendships during product launches.', 'Now invests quietly in mental-health platforms.'], tags: ['economy','education'],
    i18n: {
      zh: { headline: '工作与生活严重失衡的创业者。', details: ['完成 B 轮融资;作息表基本只存在于理论中。', '产品发布期间失去了两段亲近的友谊。', '如今低调地在心理健康平台进行投资。'] },
      ja: { headline: 'ワークライフバランスが不安定なスタートアップ創業者。', details: ['シリーズB調達済み。睡眠スケジュールはほぼ理論上の概念。', '製品ローンチの過程で親しい友人を二人失った。', '今は静かにメンタルヘルス系プラットフォームへ投資している。'] },
      ko: { headline: '워라밸이 불안정한 스타트업 창업자.', details: ['시리즈 B 라운드 마감. 수면 일정은 사실상 이론적 개념.', '제품 출시 와중에 가까운 친구 두 명과 멀어졌다.', '지금은 조용히 멘탈헬스 플랫폼에 투자한다.'] },
      tr: { headline: 'İş-yaşam dengesi kararsız startup kurucusu.', details: ['B turu kapatıldı; uyku düzeni büyük ölçüde teorik.', 'Lansmanlar sırasında iki yakın dostunu kaybetti.', 'Şimdi sessizce ruh sağlığı platformlarına yatırım yapıyor.'] }
    } },
  { headline: 'Former competitive athlete; identity recalibration.', details: ['Retired at 31 after a knee injury.', 'Coaches a youth program in their hometown.', 'Adjusting to a smaller public profile.'], tags: ['urbanRural','social'],
    i18n: {
      zh: { headline: '退役的竞技运动员,正在重新校准自我认同。', details: ['31 岁因膝伤退役。', '在故乡指导一项青少年项目。', '正在适应一个不那么公开的身份。'] },
      ja: { headline: '元競技アスリート、アイデンティティの再調整中。', details: ['膝の怪我により31歳で引退。', '故郷のユースプログラムでコーチを務めている。', '以前より公的注目が少ない暮らしに慣れつつある。'] },
      ko: { headline: '은퇴한 운동선수, 정체성을 재조정 중.', details: ['무릎 부상으로 31세에 은퇴했다.', '고향에서 청소년 프로그램을 지도한다.', '대중적 노출이 줄어든 삶에 적응 중이다.'] },
      tr: { headline: 'Eski profesyonel sporcu; kimliğini yeniden ayarlıyor.', details: ['Diz sakatlığı nedeniyle 31 yaşında bıraktı.', 'Memleketinde bir gençlik programını çalıştırıyor.', 'Daha düşük profilli bir yaşama alışıyor.'] }
    } },
  { headline: 'Multilingual diplomat.', details: ['Posted to two regions over the last decade.', 'Lives out of suitcases six months a year.', 'Maintains correspondence with former colleagues across four time zones.'], tags: ['multilingual','education'],
    i18n: {
      zh: { headline: '掌握多语言的外交官。', details: ['过去十年间被派驻两个不同地区。', '一年中有六个月在行李箱里生活。', '与跨四个时区的前同事保持着书信往来。'] },
      ja: { headline: '複数言語を操る外交官。', details: ['過去10年間で2つの地域に赴任。', '一年の半年はスーツケース暮らし。', '四つの時間帯の元同僚たちと文通を続けている。'] },
      ko: { headline: '다국어 구사 외교관.', details: ['지난 십 년간 두 지역에 부임했다.', '한 해의 절반은 짐가방을 풀지 않고 산다.', '네 개의 시간대에 흩어진 옛 동료들과 서신을 이어간다.'] },
      tr: { headline: 'Çok dilli diplomat.', details: ['Son on yılda iki bölgeye atandı.', 'Yılın altı ayını valizlerle geçiriyor.', 'Dört farklı zaman dilimindeki eski meslektaşlarıyla yazışmaya devam ediyor.'] }
    } },
  { headline: 'Independent artist with financial instability.', details: ['Sells consistently; rarely at sustainable prices.', 'Maintains a teaching side income.', 'Reports being content with the trade.'], tags: ['social','urbanRural'],
    i18n: {
      zh: { headline: '收入不稳定的独立艺术家。', details: ['作品稳定卖出,但定价很少能持续维生。', '维持着一份兼职教学收入。', '本人表示对这种取舍是满意的。'] },
      ja: { headline: '収入が不安定な独立系アーティスト。', details: ['コンスタントに売れるが、生活に十分な値段で売れることは少ない。', '副収入として教える仕事を続けている。', '本人は、その取り引きに満足していると言う。'] },
      ko: { headline: '수입이 불안정한 독립 예술가.', details: ['꾸준히 작품을 판매하지만, 지속 가능한 가격을 받는 일은 드물다.', '강의로 부수입을 유지한다.', '본인은 이런 교환에 만족한다고 말한다.'] },
      tr: { headline: 'Mali açıdan istikrarsız bağımsız sanatçı.', details: ['Düzenli satıyor; ama nadiren sürdürülebilir fiyatlardan.', 'Yan gelir olarak öğretmenlik yapıyor.', 'Bu takasdan memnun olduğunu söylüyor.'] }
    } },
  { headline: 'Research scientist; social isolation tendencies.', details: ['Lead author on three significant papers.', 'Most active social ties are online.', 'Maintains a small, close in-person circle.'], tags: ['education'],
    i18n: {
      zh: { headline: '社交相对孤立的科研工作者。', details: ['是三篇重要论文的第一作者。', '最活跃的社交关系几乎都在线上。', '现实生活中保持一个小而亲密的圈子。'] },
      ja: { headline: '社会的孤立傾向のある研究者。', details: ['重要論文三本の筆頭著者。', '活発な対人関係のほとんどはオンライン上。', '対面の付き合いは少数の親しい輪に限定。'] },
      ko: { headline: '사회적 고립 경향이 있는 연구자.', details: ['중요한 논문 세 편의 제1저자.', '가장 활발한 사회적 관계는 온라인에 있다.', '오프라인에서는 작고 친밀한 무리만 유지한다.'] },
      tr: { headline: 'Sosyal izolasyon eğilimi olan araştırmacı.', details: ['Üç önemli makalede başyazar.', 'En aktif sosyal bağları çevrimiçi.', 'Yüz yüze sınırlı, yakın bir çevre tutuyor.'] }
    } },
  { headline: 'Public-defender attorney.', details: ['Above-average caseload.', 'Strong reputation with clients; modest compensation.', 'Has begun mentoring junior attorneys.'], tags: ['family','social'],
    i18n: {
      zh: { headline: '公设辩护人。', details: ['案件量高于平均水平。', '当事人评价极佳,薪酬却仅是中等。', '已开始指导新入行的律师。'] },
      ja: { headline: '公選弁護人。', details: ['案件量は平均を上回る。', '依頼人からの信頼は厚く、報酬は控えめ。', '若手弁護士の指導を始めている。'] },
      ko: { headline: '국선변호사.', details: ['사건 부담이 평균보다 많다.', '의뢰인 사이 평판은 좋지만 보수는 평범하다.', '신입 변호사 멘토링을 시작했다.'] },
      tr: { headline: 'Kamu savunucusu avukat.', details: ['Ortalamanın üzerinde dosya yükü.', 'Müvekkilleri arasında saygın; geliri mütevazı.', 'Genç avukatlara mentorluk yapmaya başladı.'] }
    } },
  { headline: 'Veterinarian, small-animal practice.', details: ['Practice partners with a wildlife rescue.', 'Actively manages compassion fatigue.', 'Three cats and one unexpected hen.'], tags: ['family','healthcare'],
    i18n: {
      zh: { headline: '从事小动物诊疗的兽医。', details: ['诊所与一家野生动物救助机构合作。', '会主动管理自己的"共情疲劳"。', '家里有三只猫和一只意外加入的母鸡。'] },
      ja: { headline: '小動物専門の獣医師。', details: ['野生動物救護団体と連携した診療所を運営。', '共感疲労を意識的にケアしている。', '猫三匹と、なぜか一羽の雌鶏が同居している。'] },
      ko: { headline: '소동물 진료를 보는 수의사.', details: ['병원이 야생동물 구조 단체와 협력한다.', '공감 피로를 적극적으로 관리한다.', '고양이 세 마리와 어쩌다 함께 살게 된 암탉 한 마리가 있다.'] },
      tr: { headline: 'Küçük hayvanlara bakan veteriner.', details: ['Klinik, yaban hayatı kurtarma derneğiyle ortak çalışıyor.', 'Şefkat yorgunluğunu aktif olarak yönetiyor.', 'Üç kedi ve beklenmedik bir tavuk var.'] }
    } },
  { headline: 'Senior software engineer, mid-career plateau.', details: ['Senior IC at a stable mid-size firm.', 'Has declined three management offers.', 'Maintains an open-source library used in global production.'], tags: ['economy'],
    i18n: {
      zh: { headline: '处于中期平台期的资深软件工程师。', details: ['在一家稳定的中型公司任高级独立工程师。', '已三次婉拒晋升管理岗的邀请。', '维护着一个被全球生产环境使用的开源库。'] },
      ja: { headline: 'キャリア中盤で停滞期にあるシニアソフトウェアエンジニア。', details: ['安定した中堅企業でシニアの個人貢献者(IC)。', '管理職への打診を三度断った。', '世界中の本番環境で使われているオープンソースライブラリを維持している。'] },
      ko: { headline: '경력 중반에 정체기를 맞은 시니어 소프트웨어 엔지니어.', details: ['안정적인 중견 회사의 시니어 개인 기여자(IC).', '관리직 제안을 세 번 거절했다.', '전 세계 프로덕션에서 쓰이는 오픈소스 라이브러리를 유지한다.'] },
      tr: { headline: 'Kariyerinin ortasında plato yaşayan kıdemli yazılım mühendisi.', details: ['Sağlam, orta büyüklükte bir firmada kıdemli IC.', 'Üç yönetim teklifini reddetti.', 'Küresel ölçekte kullanılan açık kaynak bir kütüphaneyi sürdürüyor.'] }
    } },
  { headline: 'Architect, adaptive-reuse projects.', details: ['Portfolio is mostly former industrial sites.', 'Lectures occasionally at a public university.', 'Avoids social media; reachable by email.'], tags: ['urbanRural','education'],
    i18n: {
      zh: { headline: '专攻"旧建筑再利用"项目的建筑师。', details: ['作品集大多是改造过的旧工业场地。', '在一所公立大学偶尔授课。', '不用社交媒体,可通过邮件联系。'] },
      ja: { headline: 'アダプティブリユース(再利用)設計を専門とする建築家。', details: ['ポートフォリオの大半は、旧工業跡地の改修。', '公立大学で時折講義を行う。', 'SNSは避け、連絡はメールで。'] },
      ko: { headline: '재생 건축(adaptive reuse)을 다루는 건축가.', details: ['포트폴리오의 대부분이 옛 공업 부지 리노베이션이다.', '공립 대학에서 가끔 강의한다.', 'SNS는 멀리하고, 이메일로만 닿을 수 있다.'] },
      tr: { headline: 'Yeniden kullanım projelerine odaklı mimar.', details: ['Portföyünün çoğu eski sanayi alanları.', 'Bir devlet üniversitesinde ara sıra ders verir.', 'Sosyal medyadan uzak durur; e-postayla ulaşılır.'] }
    } },
  { headline: 'Nurse practitioner, rural clinic.', details: ['Covers two adjacent counties.', 'Has trained four community-health workers.', 'Considering a federal grant application.'], tags: ['healthcare','urbanRural'],
    i18n: {
      zh: { headline: '在乡村诊所工作的执业护理师。', details: ['同时负责两个相邻县的医疗服务。', '已培养了四名社区卫生工作者。', '正在考虑申请一项联邦经费。'] },
      ja: { headline: '農村クリニック勤務のナースプラクティショナー。', details: ['隣接する二つの郡をカバーしている。', '地域保健ワーカーを四人育てた。', '連邦助成金の申請を検討中。'] },
      ko: { headline: '시골 진료소의 전문 간호사(NP).', details: ['이웃한 두 카운티를 함께 담당한다.', '지역사회 보건 인력 네 명을 양성했다.', '연방 보조금 신청을 검토 중이다.'] },
      tr: { headline: 'Kırsal kliniğin hemşire-pratisyeni.', details: ['Komşu iki ilçeye birden hizmet veriyor.', 'Dört toplum sağlığı çalışanı yetiştirdi.', 'Federal bir hibe başvurusunu değerlendiriyor.'] }
    } },
  { headline: 'Civil engineer, transit infrastructure.', details: ['Working on a multi-decade light-rail project.', 'Pragmatic politically; rigorous technically.', 'Has not enjoyed a public hearing yet.'], tags: ['urbanRural','economy'],
    i18n: {
      zh: { headline: '从事公共交通基础设施的土木工程师。', details: ['正在参与一个跨越数十年的轻轨项目。', '在政治上务实,在技术上严谨。', '至今没在任何一场公开听证会上感到愉快过。'] },
      ja: { headline: '公共交通インフラを担当する土木技術者。', details: ['数十年規模のライトレール計画に携わっている。', '政治的にはプラグマティック、技術面では厳密。', '公聴会を楽しいと思えたことは一度もない。'] },
      ko: { headline: '대중교통 인프라를 담당하는 토목 엔지니어.', details: ['수십 년에 걸친 경전철 프로젝트를 맡고 있다.', '정치적으로는 실용주의, 기술적으로는 엄격하다.', '단 한 번도 즐겁게 끝낸 공청회가 없다.'] },
      tr: { headline: 'Toplu taşıma altyapısında çalışan inşaat mühendisi.', details: ['On yılları kapsayan bir hafif raylı sistem projesinde çalışıyor.', 'Siyaseten pragmatik, teknik olarak titiz.', 'Henüz keyif aldığı bir halk toplantısı olmadı.'] }
    } },
  { headline: 'Career changer: finance to teaching.', details: ['Took a 60% pay cut at 38.', 'Teaches high-school economics.', 'Reports the trade was correct.'], tags: ['education','economy'],
    i18n: {
      zh: { headline: '从金融转行去教书的人。', details: ['38 岁那年接受了 60% 的减薪。', '现在教高中经济学。', '本人表示这个选择是对的。'] },
      ja: { headline: '金融から教育へキャリアを変えた人。', details: ['38歳で年収を6割減らす決断をした。', '高校で経済学を教えている。', '本人は、その判断は正しかったと語る。'] },
      ko: { headline: '금융에서 교직으로 옮긴 사람.', details: ['서른여덟에 연봉의 60% 삭감을 받아들였다.', '고등학교에서 경제학을 가르친다.', '본인은 옳은 선택이었다고 말한다.'] },
      tr: { headline: 'Finanstan eğitime geçen kariyer dönüştürücü.', details: ['Otuz sekizinde %60 maaş kesintisini kabul etti.', 'Lisede ekonomi dersi veriyor.', 'Tercihin doğru olduğunu söylüyor.'] }
    } },
  { headline: 'Wildlife biologist, coastal monitoring.', details: ['Two seasons a year on remote stations.', 'Maintains a long-distance relationship.', 'Publishes annually; reads constantly.'], tags: ['education','urbanRural'],
    i18n: {
      zh: { headline: '从事海岸监测的野生生物学家。', details: ['每年有两个季节驻守在偏远的观测站。', '与伴侣维持着远距离关系。', '每年发表一篇论文,常年保持阅读。'] },
      ja: { headline: '沿岸モニタリングを行う野生生物学者。', details: ['年に二季節は遠隔の観測ステーションで過ごす。', '遠距離恋愛を続けている。', '毎年論文を発表し、絶えず読書している。'] },
      ko: { headline: '해안 모니터링을 하는 야생생물학자.', details: ['일 년 중 두 시즌을 외딴 관측소에서 보낸다.', '장거리 연애를 이어가고 있다.', '매년 한 편씩 논문을 내고, 끊임없이 책을 읽는다.'] },
      tr: { headline: 'Kıyı izleme yapan yaban hayatı biyoloğu.', details: ['Yılın iki sezonunu uzak istasyonlarda geçirir.', 'Uzun mesafeli bir ilişki yürütüyor.', 'Her yıl yayımlar; sürekli okur.'] }
    } },
  { headline: 'Therapist, private practice.', details: ['Specializes in early-career professionals.', 'Practices in a major metropolitan area.', 'Deliberately limits weekly caseload.'], tags: ['healthcare','urbanRural'],
    i18n: {
      zh: { headline: '在私人诊所执业的心理治疗师。', details: ['专长是职业生涯早期的职场人。', '在一个主要的大都市区开业。', '会有意识地控制每周的接案量。'] },
      ja: { headline: '個人開業のセラピスト。', details: ['キャリア初期の専門職を専門にしている。', '大都市圏で開業している。', '週ごとの受け入れ件数を意識的に抑えている。'] },
      ko: { headline: '개업한 심리치료사.', details: ['커리어 초기의 직장인을 전문으로 한다.', '대도시 권역에서 활동한다.', '주간 사례 수를 일부러 제한한다.'] },
      tr: { headline: 'Özel muayenehanesi olan terapist.', details: ['Kariyerinin başındaki profesyonellere odaklanıyor.', 'Büyük bir metropolde çalışıyor.', 'Haftalık vaka sayısını bilinçli olarak sınırlıyor.'] }
    } },
  { headline: 'Process engineer, second-generation.', details: ['Works at the same plant their parent did.', 'Leads a small continuous-improvement team.', 'Has helped avert plant closure twice.'], tags: ['family','economy'],
    i18n: {
      zh: { headline: '与父辈在同一座工厂工作的二代流程工程师。', details: ['和父亲(或母亲)曾经一样,在同一座工厂上班。', '负责一支不大的"持续改进"小组。', '曾两次帮工厂避免被关停。'] },
      ja: { headline: '親と同じ工場で働く二代目プロセスエンジニア。', details: ['親が働いていた工場と同じ職場にいる。', '小規模な改善チームを率いている。', '工場閉鎖を二度回避するのに貢献した。'] },
      ko: { headline: '부모와 같은 공장에서 일하는 2세대 공정 엔지니어.', details: ['부모님이 일하던 그 공장에서 일한다.', '작은 지속적 개선(CI) 팀을 이끈다.', '공장 폐쇄를 두 번 막는 데 일조했다.'] },
      tr: { headline: 'İkinci kuşak süreç mühendisi.', details: ['Ebeveyniyle aynı fabrikada çalışıyor.', 'Küçük bir sürekli iyileştirme ekibini yönetiyor.', 'Fabrikanın kapanmasını iki kez önlemeye yardım etti.'] }
    } },
  { headline: 'Charge nurse, neonatal ICU.', details: ['Sixteen years on the unit.', 'Quietly central to staff retention.', 'Knows when to push policy and when to wait.'], tags: ['healthcare'],
    i18n: {
      zh: { headline: '新生儿重症监护室的护士长。', details: ['在同一个病区工作了十六年。', '在留住团队成员这件事上,是默默的主心骨。', '知道何时推动制度变革,何时按兵不动。'] },
      ja: { headline: 'NICU(新生児集中治療室)のチャージナース。', details: ['同じ病棟で十六年勤務。', 'スタッフの定着において、目立たないが要となる存在。', '制度に踏み込むべき時と、待つべき時を心得ている。'] },
      ko: { headline: '신생아 중환자실의 차지 간호사.', details: ['같은 병동에서 16년째 일한다.', '직원 유지에 있어 조용하지만 핵심적인 존재.', '제도를 밀어붙일 때와 기다려야 할 때를 안다.'] },
      tr: { headline: 'Yenidoğan yoğun bakım servisinde charge nurse.', details: ['Aynı serviste on altı yıldır görevde.', 'Ekip kalıcılığının sessiz merkezi.', 'Politika değişikliğini ne zaman zorlayacağını, ne zaman bekleyeceğini bilir.'] }
    } },
  { headline: 'Mid-list author with steady readership.', details: ['Two books a year; no breakout.', 'Co-owns a small bookstore.', 'Has declined two adaptation offers.'], tags: ['education'],
    i18n: {
      zh: { headline: '拥有稳定读者群的中等销量作者。', details: ['每年出两本书,从未有过爆款。', '与人合开一家小书店。', '已拒绝过两次影视改编邀约。'] },
      ja: { headline: '安定した読者を持つ中堅作家。', details: ['年に二冊刊行、ブレイクは未だになし。', '小さな書店を共同経営している。', '映像化のオファーを二件断った。'] },
      ko: { headline: '꾸준한 독자층을 가진 중견 작가.', details: ['일 년에 두 권을 내지만, 한 번도 크게 터진 적은 없다.', '작은 서점을 공동 운영한다.', '영상화 제안을 두 번 거절했다.'] },
      tr: { headline: 'İstikrarlı okur kitlesi olan orta düzey yazar.', details: ['Yılda iki kitap; büyük çıkış yok.', 'Küçük bir kitapçının ortağı.', 'İki uyarlama teklifini reddetti.'] }
    } },
  { headline: 'Civic technology lead.', details: ['Builds software for state agencies.', 'Frustrated weekly; effective monthly.', 'Has shipped services used by hundreds of thousands.'], tags: ['economy','social'],
    i18n: {
      zh: { headline: '公共部门技术负责人。', details: ['为州政府机构开发软件。', '每周都被气得不行,每月又能拿出成果。', '已交付的服务被几十万人使用。'] },
      ja: { headline: 'シビックテックのリード。', details: ['州政府機関向けのソフトウェアを作っている。', '週単位ではうんざりするが、月単位では結果を出している。', '何十万人もが利用するサービスをリリース済み。'] },
      ko: { headline: '시빅테크 리드.', details: ['주(州) 정부 기관용 소프트웨어를 만든다.', '주 단위로는 좌절하고, 월 단위로는 성과를 낸다.', '수십만 명이 사용하는 서비스를 출시했다.'] },
      tr: { headline: 'Sivil teknoloji lideri.', details: ['Eyalet kurumları için yazılım geliştiriyor.', 'Haftalık moralsiz; aylık etkili.', 'Yüz binlerce kişinin kullandığı hizmetler yayımladı.'] }
    } },
  { headline: 'Restaurateur, single location.', details: ['Eight years stable; never expanded.', 'Suppliers are personal relationships.', 'Closes for two weeks in August without public explanation.'], tags: ['urbanRural','family'],
    i18n: {
      zh: { headline: '只经营一家店面的餐厅老板。', details: ['稳定经营了八年,从未开过分店。', '与供应商之间是私人关系。', '每年八月不公开理由地停业两周。'] },
      ja: { headline: '一店舗だけのレストランオーナー。', details: ['八年間安定経営、店舗は増やさず。', '仕入れ先はすべて個人的なつながり。', '毎年八月、説明なしに二週間休業する。'] },
      ko: { headline: '한 곳만 운영하는 레스토랑 주인.', details: ['8년째 안정적, 확장은 한 적 없다.', '거래처와는 개인적인 관계로 일한다.', '매년 8월에 별도 공지 없이 2주간 문을 닫는다.'] },
      tr: { headline: 'Tek şubeli restoran sahibi.', details: ['Sekiz yıldır istikrarlı; hiç şube açmadı.', 'Tedarikçiler kişisel ilişkiler üzerinden.', 'Her ağustosta kamuya açıklama yapmadan iki hafta kapanır.'] }
    } }
];

// Behavioral trace notes — small, specific human details that read as
// "leakage" inside the clinical Adult system. Expanded from the previous
// 20-item ADULT_MICRODETAILS to ~40 entries spanning relationships,
// routines, regrets, quiet attachments.
//
// R14rev: These are trait-flavored common patterns, not predictions for
// any individual. A high-O adult does not necessarily read three books at
// once; the line evokes a recognizable human texture, not a forecast.
const ADULT_TRACES = {
  en: [
    'Notebooks from adolescence sit in a box that never quite gets unpacked.',
    'Switches career path twice before turning 30.',
    'Prefers a long letter to a phone call, and rarely apologizes for it.',
    'Tends to overprepare for social events.',
    'The same three close friends remain in steady orbit across two decades.',
    'Drinks coffee well past the point of effect.',
    'Reads three books at once; finishes two.',
    'Arrives five minutes early as a matter of principle.',
    'Lives comfortably with a long unread email backlog.',
    "Holds a quietly considered opinion they've never shared publicly.",
    'Subscribes to two newsletters from people they no longer know.',
    "Every neighbor's pet is filed away by name, often before the owners' are.",
    'A persistent food allergy quietly shapes every dinner reservation.',
    'Travels less than peers; more deliberately.',
    'Tried therapy twice. May return.',
    'Owns more books than shelf space.',
    'Becomes the first person friends call after a hard week.',
    'Speaks with a grandparent weekly until that grandparent dies.',
    'Sustains a low-key creative project across years.',
    'A childhood stuffed animal still waits on a closet shelf, slightly faded.',
    'Replays small interactions in their head for days afterward.',
    'Friend groups shift dramatically once they leave home for good.',
    'Learns one recipe extremely well; serves it for the rest of their life.',
    'One old conversation thread gets quietly reopened every few months.',
    'Discovers obscure interests unexpectedly in their thirties.',
    'Quietly becomes the family member who keeps everyone in touch.',
    'One particular song accompanies every difficult moment.',
    'Voicemails from people who have died stay archived, untouched, for decades.',
    'A desk drawer fills slowly with small objects no one else would want.',
    'When relatives visit, certain photographs come down without comment.',
    'Their laugh is the kind a family recognizes from across rooms.',
    'Walks alone at night, late, and counts this as a personality trait.',
    'Some unfinished projects, given enough years, eventually finish themselves.',
    'Handwritten notes get tucked into books, then lost with the books themselves.',
    'One specific city becomes theirs, even if they only ever visit.',
    'Care for a parent arrives, at some point, without being made into a story.',
    "A grandparent's handwriting stays recognizable at a glance for life.",
    "Keeps one private vocabulary for moods that never gets shared with anyone.",
    'Decades later, repeats a single phrase a teacher once said, to a stranger.',
    'Late in life, becomes a person their younger self would have liked.',
    // Tier-2 mild-conflict traces. Clinical register, present-state.
    // R14 closed: zh/ja/ko/tr mild entries now mirror the 8 EN below.
    { text: 'Maintains a list of unfinished projects; revisits about half of them once a year.', tag: 'OC-mild' },
    { text: 'Files documents by a system only partly visible to anyone else; locates most things on the second try.', tag: 'OC-mild' },
    { text: 'Accepts most invitations; reserves the following day for solitude.', tag: 'EN-mild' },
    { text: 'Hosts well, then declines social contact for two or three days afterward.', tag: 'EN-mild' },
    { text: 'Keeps a fixed weekday morning routine; tolerates weekend variation without enthusiasm.', tag: 'CO-mild' },
    { text: 'Reschedules a disrupted plan promptly; the underlying preference for the original is rarely named aloud.', tag: 'CO-mild' },
    { text: "Goes along with the group's pick more often than they'd choose to; mentions their own option briefly, after.", tag: 'AN-mild' },
    { text: 'Carries minor unspoken irritations for several days; resolves them privately, without comment.', tag: 'AN-mild' }
  ],
  zh: [
    '青春期留下的笔记本,至今还保留着。',
    '三十岁前换过两次职业方向。',
    '回避电话沟通,改写些深思熟虑的长信。',
    '面对社交场合,总是过度准备。',
    '二十年间,身边一直是同样的三位密友。',
    '咖啡早已不起作用,仍然照旧饮用。',
    '同时读三本书,通常只看完两本。',
    '总是习惯性地提前五分钟到。',
    '邮箱里堆着许多未读邮件,自己却毫不焦虑。',
    '心里有一个深思熟虑过、却从未在公开场合表达的看法。',
    '订阅着两位早已与之失联之人的通讯。',
    '记得每一位邻居家宠物的名字。',
    '一种不常见的食物过敏,影响着此后整整一生的晚餐选择。',
    '出行少于同辈,但每一次都有所考量。',
    '尝试过两次心理咨询。未来或许还会再去。',
    '书的数量,远远超过书架可以容纳的。',
    '朋友们经历艰难一周后,第一个想到要打电话的就是他/她。',
    '每周与一位祖辈通话,直到那位祖辈过世。',
    '多年来维持着一项低调的创作型小项目。',
    '童年的一只毛绒玩具,至今仍摆在衣柜的某层架子上。',
    '常常把一些小的对话,在脑中反复回放好几天。',
    '十九岁之后,朋友圈经历过一次彻底的更换。',
    '学得格外好的一道菜,会做一辈子地端给朋友们吃。',
    '有一段旧的对话记录,偶尔还会拿出来重读。',
    '三十多岁时,意外发展出某种冷门的兴趣。',
    '默默把自己定位成"维系亲友联系"的那个人。',
    '在每一个艰难的时刻,身边都跟着同一首歌。',
    '保存着已故之人留下的语音留言。',
    '抽屉里有一格小物件,别人都不会想要,他/她却舍不得扔。',
    '亲戚来访时,准确地知道哪些照片该先收起来。',
    '有一种特定的笑声,家人隔着几个房间也能认出。',
    '深夜独自出门散步,并把这当作自己的一种性格。',
    '未完成的项目一搁就是好几年,有些后来竟然自己完成了。',
    '在书里夹着手写的纸条,然后忘了夹在哪本书里。',
    '在某座特定的城市里,有一处自己视为"属于我"的地方。',
    '会在某一刻照顾起一位年迈的父母,而不把这件事讲成故事。',
    '一眼便认得出祖辈的字迹。',
    '关于心情,有一套不与任何人分享的私人语汇。',
    '几十年后,会把某位老师说过的某句话,对一位陌生人重复出来。',
    '晚年终于活成了年轻时的自己会喜欢的那种人。',
    { text: '手头留着一份未完成项目的清单;每年大约会重看其中一半。', tag: 'OC-mild' },
    { text: '用一套外人只看得懂一半的方式归档资料;大多数文件第二次才找到。', tag: 'OC-mild' },
    { text: '大部分邀约都会接受;把次日留给独处。', tag: 'EN-mild' },
    { text: '把聚会办得周到,之后两三天不愿与人来往。', tag: 'EN-mild' },
    { text: '工作日保持固定的早晨流程;能容忍周末的变动,只是谈不上喜欢。', tag: 'CO-mild' },
    { text: '计划被打乱时会迅速重新安排;对原方案的偏好,几乎不会说出口。', tag: 'CO-mild' },
    { text: '比自己真正想选的更常顺从群体;过后会短短地提一句自己原本想去的。', tag: 'AN-mild' },
    { text: '会把不大的小不满憋上几天;之后默不作声地放下,不再提起。', tag: 'AN-mild' }
  ],
  ja: [
    '思春期につけていたノートを、いまも保管している。',
    '三十歳までに、二度キャリアの方向を変える。',
    '電話を避け、代わりに丁寧な手紙を書く。',
    '社交の場には、いつも準備しすぎる傾向がある。',
    '二十年のあいだ、同じ三人の親しい友人を保ち続けている。',
    'もはや効かないと知りながらも、コーヒーをよく飲む。',
    '同時に三冊を読み、たいてい二冊を読み終える。',
    '習慣的に、五分前に到着する。',
    '長く未読のメールが溜まっていても、不安にはならない。',
    '一度も人に話したことのない、静かに考え抜いた意見を抱えている。',
    'もう連絡を取らない人のニュースレターを、二通だけ購読し続けている。',
    'ご近所のすべてのペットの名前を覚えている。',
    'めずらしい食物アレルギーがあり、生涯の食卓計画に影響している。',
    '同世代より旅は少ない。だが、より丁寧に行く。',
    '二度カウンセリングを受けた。また戻ることもありそうだ。',
    '本棚の容量より、持っている本のほうが多い。',
    'つらい一週間のあとに、友人がまず電話をするのは、この人だ。',
    '祖父母が亡くなるまで、毎週その祖父母と電話で話していた。',
    '何年にもわたって、目立たない創作の小さなプロジェクトを続けている。',
    '子どものころのぬいぐるみが、いまもクローゼットの棚にひとつ置かれている。',
    '小さなやり取りを、何日もあとまで頭のなかで再生し続ける。',
    '19歳を境に、友人の輪が大きく入れ替わる。',
    'たった一つの料理を見事にこなし、それを一生のあいだ、人にふるまう。',
    '昔のメッセージのスレッドを、いまでもときどき読み返す。',
    '三十代になってから、思いがけずマイナーな趣味を持ち始める。',
    '家族のなかで、みなを繋ぐ役を、ひそかに自任している。',
    'つらい場面のたびに、必ず連れて行く一曲がある。',
    '亡くなった人からの留守電を、消さずに残している。',
    '机の引き出しには、他人なら欲しがらない小物がしまわれている。',
    '親戚が訪ねてくるとき、どの写真を片付けるべきかを正確に知っている。',
    '家族なら部屋越しでも分かる、特有の笑い方がある。',
    '夜、一人で長く歩く。そしてそれを「自分の性格の一部」だと考えている。',
    '未完のプロジェクトを何年も抱え続ける。なかには、いつのまにか自分で終わってしまったものもある。',
    '本のなかに手書きのメモを挟み、どの本に挟んだかを忘れる。',
    'ある特定の街のなかに、「ここは自分のものだ」と感じる場所がある。',
    'いつかどこかで、年老いた親の世話をする。それを「物語」にはしない。',
    '祖父母の手書きの文字を、一目で見分けられる。',
    '気分について、誰にも共有しない、自分だけの語彙を持っている。',
    'かつて先生に言われたある一言を、何十年もあとに、見知らぬ誰かに繰り返している。',
    '晩年になって、若いころの自分が好きになるような人物に、ようやくなる。',
    { text: '未完了の計画リストを手元に置き、年に一度、そのうち半分ほどを見直す。', tag: 'OC-mild' },
    { text: '他人には半分しか見えない仕分けで書類をしまい、たいていは二度目で目当てを探し当てる。', tag: 'OC-mild' },
    { text: '誘いの大半を受け、その翌日は孤独な時間に充てる。', tag: 'EN-mild' },
    { text: 'もてなしは行き届いているが、その後の二、三日は人付き合いを断る。', tag: 'EN-mild' },
    { text: '平日の朝のルーティンは固定で、週末の変動は受け入れるが、楽しんではいない。', tag: 'CO-mild' },
    { text: '崩れた予定はすぐに組み直すが、元の案への思い入れを口に出すことはほとんどない。', tag: 'CO-mild' },
    { text: '自分が本当に選ぶよりも多く、集団の意向に合わせる。自分の希望には、あとから短く一度だけ触れる。', tag: 'AN-mild' },
    { text: '小さな不満を口にせず数日抱え、誰にも言わずに、ひっそりと収める。', tag: 'AN-mild' }
  ],
  ko: [
    '청소년기에 쓰던 공책을, 여전히 간직하고 있다.',
    '서른이 되기 전 두 번 진로를 바꾼다.',
    '전화 통화를 피하고, 대신 사려 깊은 편지를 쓴다.',
    '사교 모임 앞에서는 늘 과하게 준비하는 편이다.',
    '20년 동안 같은 세 사람의 가까운 친구를 유지한다.',
    '이미 효력이 없는 줄 알면서도 커피를 계속 마신다.',
    '동시에 세 권을 읽고, 보통 두 권을 끝낸다.',
    '습관처럼 오 분쯤 일찍 도착한다.',
    '오랫동안 읽지 않은 이메일이 쌓여 있어도 불안해하지 않는다.',
    '한 번도 입 밖에 낸 적 없는, 조용히 다듬어 온 의견을 품고 있다.',
    '더 이상 알지 못하는 사람들의 뉴스레터 두 개를 여전히 구독하고 있다.',
    '이웃집 반려동물들의 이름을 전부 알고 있다.',
    '드문 식품 알레르기가 있어, 평생의 저녁 식탁에 영향을 준다.',
    '또래보다 덜 여행하지만, 더 정성스럽게 다닌다.',
    '두 번 상담을 받았다. 언젠가 다시 갈지도 모른다.',
    '책장이 감당할 수 있는 것보다 더 많은 책을 가지고 있다.',
    '힘든 한 주가 지나면, 친구들이 가장 먼저 전화하는 사람이다.',
    '조부모가 세상을 떠나기 전까지, 매주 그 조부모와 통화했다.',
    '여러 해에 걸쳐, 조용한 창작 프로젝트 하나를 이어 간다.',
    '어릴 적 인형 하나가, 여전히 옷장 안 어느 칸에 놓여 있다.',
    '사소한 대화 한 토막을, 며칠 동안 머릿속에서 거듭 재생한다.',
    '열아홉 살을 지나면서, 친구 무리가 크게 바뀐다.',
    '딱 한 가지 요리를 아주 잘 익혀, 평생 사람들에게 그 음식을 내어 준다.',
    '오래된 대화 기록을, 가끔 다시 읽는다.',
    '서른 즈음, 예기치 않게 한 가지 좁은 분야의 관심사가 생긴다.',
    '가족 안에서 모두를 이어 주는 역할이라고, 조용히 스스로를 자리매김한다.',
    '힘든 순간마다 함께 가져가는 노래 한 곡이 있다.',
    '세상을 떠난 사람들이 남긴 음성 메시지를 지우지 않고 보관한다.',
    '책상 서랍 한 칸에는, 남이라면 원치 않을 작은 물건들이 들어 있다.',
    '친척이 방문할 때, 어떤 사진을 미리 치워야 할지 정확히 안다.',
    '가족이 방을 지나서도 알아보는, 특유의 웃음소리가 있다.',
    '밤늦은 시간에 혼자 오래 걷고, 그것을 자신의 성격이라고 여긴다.',
    '끝내지 못한 작업을 여러 해 가지고 다니다, 그중 일부는 결국 스스로 마무리되어 있다.',
    '책 사이에 손글씨 메모를 끼워 두었다가, 어느 책에 끼웠는지를 잊어버린다.',
    '어떤 도시 안에, "여기는 내 것"이라 여기는 한 자리를 가지고 있다.',
    '언젠가 한 부모를 돌보게 되지만, 그 일을 이야깃거리로 만들지 않는다.',
    '조부모의 손글씨를, 한눈에 알아본다.',
    '감정에 대해, 아무에게도 말하지 않는 자기만의 어휘를 가지고 있다.',
    '어느 선생님이 했던 한 마디를, 수십 년이 지난 뒤 낯선 사람에게 다시 꺼낸다.',
    '말년이 되어서야, 어린 시절의 자신이 좋아했을 만한 사람이 된다.',
    { text: '미완성 계획 목록을 손에 두고, 일 년에 한 번 그중 절반 정도를 다시 들여다본다.', tag: 'OC-mild' },
    { text: '남에게는 절반쯤만 보이는 방식으로 서류를 정리하고, 대부분은 두 번째 시도에서 찾아낸다.', tag: 'OC-mild' },
    { text: '대부분의 초대를 받아들이고, 다음 날은 혼자만의 시간으로 비워둔다.', tag: 'EN-mild' },
    { text: '손님 대접은 빈틈없이 해내지만, 그 뒤 이삼 일은 누구와도 만나지 않는다.', tag: 'EN-mild' },
    { text: '평일 아침 루틴은 고정되어 있고, 주말의 변동은 받아들이지만 즐기지는 않는다.', tag: 'CO-mild' },
    { text: '깨진 계획은 즉시 다시 짜되, 원래 안에 대한 선호는 거의 입 밖에 내지 않는다.', tag: 'CO-mild' },
    { text: '본인이 정말 고를 만한 것보다 더 자주 집단의 선택에 따르고, 자신이 원했던 안은 일이 끝난 뒤 짧게 한 번 언급한다.', tag: 'AN-mild' },
    { text: '입 밖에 내지 않는 작은 불만을 며칠씩 안고 있다가, 아무 말 없이 혼자 정리한다.', tag: 'AN-mild' }
  ],
  tr: [
    'Ergenlik dönemindeki defterleri hâlâ saklıyor.',
    'Otuz yaşından önce iki kez kariyer yönü değiştiriyor.',
    'Telefon görüşmelerinden kaçınıyor; bunun yerine düşünülmüş mektuplar yazıyor.',
    'Sosyal etkinliklere her zaman gereğinden fazla hazırlanıyor.',
    'Yirmi yıl boyunca aynı üç yakın arkadaşı koruyor.',
    'Artık etkisini yitirdiğini bildiği halde kahve içmeye devam ediyor.',
    'Aynı anda üç kitap okuyor; genellikle ikisini bitiriyor.',
    'Alışkanlık olarak beş dakika erken geliyor.',
    'Uzun süredir okunmamış e-postaları olsa da kaygı duymuyor.',
    'Kimseyle paylaşmadığı, sessizce olgunlaştırdığı bir görüşü var.',
    'Artık tanımadığı iki kişinin haber bültenine hâlâ abone.',
    'Komşulardaki tüm evcil hayvanların adını biliyor.',
    'Nadir görülen bir gıda alerjisi, ömür boyu akşam yemeği planlarını biçimlendiriyor.',
    'Akranlarından daha az seyahat ediyor; ama daha özenli.',
    'İki kez terapiye gitti. Belki yeniden gidecek.',
    'Rafa sığacak olandan daha fazla kitabı var.',
    'Zor bir haftanın ardından arkadaşların ilk aradığı kişi o.',
    'Bir büyük ebeveyni ölene dek her hafta onunla konuştu.',
    'Yıllara yayılan, gözden ırak küçük bir yaratıcı projeyi sürdürüyor.',
    'Çocukluğundan kalma bir oyuncak ayı, hâlâ dolabın bir rafında duruyor.',
    'Küçük diyalogları, günler boyu kafasının içinde yeniden oynatıyor.',
    '19 yaşından sonra arkadaş çevresi köklü biçimde değişiyor.',
    'Tek bir yemeği son derece iyi öğrenip, hayatı boyunca onu ikram ediyor.',
    'Eski bir konuşma penceresini hâlâ ara sıra yeniden okuyor.',
    'Otuzlu yaşlarında beklenmedik bir biçimde ilginç, az bilinen ilgi alanları geliştiriyor.',
    'Aile içinde herkesi bir arada tutan kişi rolünü, sessizce benimsiyor.',
    'Her zorlu ana eşlik eden tek bir şarkısı var.',
    'Hayatını kaybetmiş kişilerin sesli mesajlarını silmeden saklıyor.',
    'Bir çekmecesinde, başkalarının istemeyeceği küçük nesneler bulunuyor.',
    'Akrabalar ziyarete geldiğinde hangi fotoğrafları kaldırması gerektiğini tam olarak biliyor.',
    'Ailesinin, odalar ötesinden tanıdığı kendine özgü bir gülüşü var.',
    'Gece tek başına uzun yürüyüşler yapıyor; bunu bir kişilik özelliği sayıyor.',
    'Yarım kalmış projeleri yıllarca yanında taşıyor; bazıları zamanla kendiliğinden tamamlanıyor.',
    'Kitapların arasına el yazısı notlar bırakıyor, sonra hangi kitaba koyduğunu unutuyor.',
    'Belirli bir şehirde, "burası benim" dediği bir yeri var.',
    'Bir gün yaşlı bir ebeveynin bakımını üstleniyor ve bunu bir hikâyeye dönüştürmüyor.',
    'Büyükannelerinin el yazısını bir bakışta tanıyor.',
    'Ruh hâlleri için, kimseyle paylaşmadığı kendine özgü bir sözlüğü var.',
    'Bir öğretmenin bir gün söylediği tek bir cümleyi, onlarca yıl sonra bir yabancıya tekrarlıyor.',
    'Yaşlanınca, genç hâlinin sevebileceği türden bir insana dönüşüyor.',
    { text: 'Tamamlanmamış işlerden oluşan bir liste tutar; yılda bir kez, aşağı yukarı yarısını yeniden gözden geçirir.', tag: 'OC-mild' },
    { text: 'Belgeleri, başkalarına ancak yarı yarıya görünen bir düzenle saklar; çoğunu ikinci denemede bulur.', tag: 'OC-mild' },
    { text: 'Davetlerin çoğunu kabul eder; ertesi günü yalnızlığa ayırır.', tag: 'EN-mild' },
    { text: 'Konuk ağırlamayı iyi yapar, ardından iki üç gün sosyal teması reddeder.', tag: 'EN-mild' },
    { text: 'Hafta içi sabah rutinini sabit tutar; hafta sonu sapmalarına katlanır, ama hoşnut olmadan.', tag: 'CO-mild' },
    { text: 'Bozulan planı hemen yeniden kurar; aslında ilkini tercih ettiğini pek dile getirmez.', tag: 'CO-mild' },
    { text: 'Kendisinin seçeceğinden daha sık grubun tercihine uyar; kendi seçeneğini iş bittikten sonra kısaca, bir kez dile getirir.', tag: 'AN-mild' },
    { text: 'Söze dökmediği ufak rahatsızlıkları birkaç gün taşır; kimseye söylemeden, içinde halleder.', tag: 'AN-mild' }
  ]
};

// Reflection mode: poetic and observational. Read more like fragments of
// a profile than data points.
const REFLECTION_TRACES = {
  en: [
    "Calls their parents during grocery shopping, when there's nothing in particular to say.",
    "Keeps old receipts inside the books they've read.",
    'Remembers an embarrassing middle-school moment forever.',
    'Has a song they only listen to alone in cars.',
    'Texts their best friend the same one-liner every birthday.',
    'Wears one piece of clothing they wore at 16 deep into their thirties.',
    "Walks the same route home, even when there's a shorter one.",
    "Cries reliably at sentimental car adverts they wouldn't name in public.",
    'Has a name for the colour of a particular afternoon sky.',
    'Keeps the last birthday card their grandmother sent.',
    'Becomes friends with the corner-shop owner without quite meaning to.',
    'Confesses, sometimes, to strangers on planes — things their closest friends don\'t know.',
    "Knows the date their first pet died, but not the date they got a driver's licence.",
    "Hums a song their mother hummed; doesn't know it's her song.",
    "Has a recurring dream about a hallway they've never seen awake.",
    'Apologises to inanimate objects when they bump into them.',
    "Keeps a folded paper in their wallet with handwriting that isn't theirs.",
    "Avoids a certain street in their hometown for reasons they don't articulate.",
    "Owns a photograph of someone they're no longer in touch with, framed.",
    'Saves the last voicemail from a parent for years before listening again.',
    'Cooks the same Sunday meal as their grandmother, without realising.',
    'Keeps a note app full of sentences they overheard on trains.',
    'Has a small kind of bravery no one in their family sees.',
    'Carries the smell of their childhood home in one particular sweater.',
    "Returns to the same beach every five years; doesn't plan it.",
    "Keeps a friend's number even after the friendship quietly ends.",
    'Will tell their child a story they were told once, almost word for word.',
    'Has an album that means something different every decade.',
    'Saves screenshots of conversations that mattered.',
    "Recognises a stranger's walk and thinks of someone they used to love."
  ],
  zh: [
    '在超市采购时给父母打电话,其实并没有什么特别要说的事。',
    '把旧的收据夹在自己读过的书里。',
    '中学里一桩尴尬小事,一辈子忘不掉。',
    '有一首歌,只在独自开车时才听。',
    '每年生日,给挚友发一句一模一样的简讯。',
    '一件十六岁时穿过的衣服,一路穿到三十多岁。',
    '总走同一条回家的路,即使明明有更近的。',
    '总会被某种煽情的汽车广告弄哭,却羞于在外人面前说起。',
    '心里给某一种下午天空的颜色起过名字。',
    '保留着祖母寄来的最后一张生日卡。',
    '不知不觉地,和街角小店老板成了朋友。',
    '有时会向飞机上的陌生人吐露——一些连最亲近的朋友都不知道的事。',
    '记得第一只宠物离世的日期,却不记得拿到驾照的日期。',
    '会哼妈妈曾经哼过的歌,却不知那是她的歌。',
    '反复梦见一条从未在醒着时见过的走廊。',
    '撞到无生命的东西时,会下意识地说声"对不起"。',
    '钱包里夹着一张折叠的纸,上面是别人的笔迹。',
    '在自己长大的那座城市里,有一条街道总是避开,自己也说不出原因。',
    '镜框里摆着一个早已不再联系之人的照片。',
    '把父母最后一通语音留言保存许多年,才再次按下播放。',
    '不自觉地做着祖母周日做过的同一道菜。',
    '备忘录里存满了在火车上偶然听到的句子。',
    '有一种家人看不见的小小勇敢。',
    '某一件毛衣里,带着童年家的气味。',
    '每隔五年总会回到同一片海滩,从不刻意安排。',
    '即便那段友谊已悄悄结束,仍留着对方的电话号码。',
    '日后会把自己听过一次的故事,几乎逐字讲给自己的孩子。',
    '有一张专辑,每过十年含义就不一样。',
    '把那些"重要的对话"截图存起来。',
    '认出一个陌生人的走路姿态,便会想起一个曾经爱过的人。'
  ],
  ja: [
    'スーパーで買い物しているとき、特に話すこともないのに親に電話する。',
    '読み終えた本のあいだに、古いレシートを挟んでおく。',
    '中学のころのある一つの恥ずかしい出来事を、一生忘れない。',
    '車のなかで一人のときだけ聴く一曲がある。',
    '親友に、毎年誕生日に同じ一文だけを送る。',
    '16のときに着ていた一着を、三十代になっても着ている。',
    'もっと近道があるのに、いつもの帰り道を選ぶ。',
    'お涙頂戴の車のCMで必ず泣くが、人前では話さない。',
    'ある午後の空の色に、自分だけの名前をつけている。',
    '祖母から最後に届いた誕生日カードを取っておく。',
    'いつのまにか、角の店の主人と友達になっている。',
    '飛行機で隣り合った見知らぬ人に、ふと打ち明けてしまう——いちばん親しい友人にも話していないことを。',
    '初めて飼ったペットの死んだ日は覚えているが、免許を取った日は思い出せない。',
    '母が口ずさんでいた歌を、自分でも口ずさむ。それが母の歌だとは気づかずに。',
    '目覚めているときには見たことのない廊下を、繰り返し夢に見る。',
    '物にぶつかったとき、思わず「ごめん」と謝ってしまう。',
    '財布のなかに、自分の字ではない手書きの紙片を畳んで入れている。',
    '故郷のある一本の通りを、理由をうまく言えないまま避けている。',
    'もう連絡を取らない人の写真を額に入れて持っている。',
    '親からの最後の留守電を、何年もそのままにし、ある日また聴く。',
    '祖母が日曜に作っていた料理と同じものを、気づかずに作る。',
    'メモアプリには、電車のなかで耳にした文がたくさん入っている。',
    '家族には見えない、小さな種類の勇敢さを持っている。',
    '子どものころの家のにおいを、一着のセーターの中に運んでいる。',
    '計画もしないのに、五年おきに同じ浜辺に戻ってくる。',
    '友情が静かに終わったあとも、相手の電話番号は消さずに残している。',
    'いつか自分の子に、一度だけ聞いた話をほぼそのまま伝えるだろう。',
    '十年ごとに違う意味になるアルバムを一枚、持っている。',
    '大事だった会話のスクリーンショットを保存している。',
    '見知らぬ人の歩き方に、かつて愛した人を思い出す。'
  ],
  ko: [
    '장 보러 가는 길에, 딱히 할 말도 없는데 부모에게 전화를 건다.',
    '다 읽은 책 사이에 오래된 영수증을 끼워 둔다.',
    '중학교 때의 어떤 부끄러운 순간 하나를, 평생 잊지 못한다.',
    '혼자 차 안에서만 듣는 노래가 한 곡 있다.',
    '매년 친구의 생일마다, 똑같은 한 줄을 보낸다.',
    '열여섯 살에 입었던 옷 한 벌을, 서른이 한참 지나도록 입는다.',
    '더 가까운 길이 있는데도, 늘 같은 길로 집에 간다.',
    '감성적인 자동차 광고 앞에선 어김없이 운다. 다만 그 사실을 남에게 말하지 않는다.',
    '어느 오후 하늘의 빛깔에, 자기만의 이름을 붙여 두었다.',
    '할머니가 보낸 마지막 생일 카드를 간직하고 있다.',
    '딱히 그럴 생각도 없이, 동네 가게 주인과 친구가 되어 있다.',
    '가끔 비행기에서 만난 낯선 사람에게 털어놓는다 — 가장 가까운 친구도 모르는 이야기들을.',
    '처음 키운 반려동물이 죽은 날짜는 기억하지만, 운전면허를 딴 날짜는 기억하지 못한다.',
    '어머니가 흥얼거리던 노래를 따라 흥얼거리지만, 그게 어머니의 노래라는 걸 알지 못한다.',
    '깨어 있을 때 한 번도 본 적 없는 어떤 복도를, 자꾸 꿈에 본다.',
    '사물에 부딪히면, 저도 모르게 "미안"하다고 말한다.',
    '지갑 속에는, 자기 글씨가 아닌 손글씨가 적힌 종이 한 장이 접혀 있다.',
    '고향의 어떤 거리 하나를, 이유를 잘 설명하지 못하면서도 피해 다닌다.',
    '더 이상 연락하지 않는 누군가의 사진을 액자에 넣어 두고 있다.',
    '부모가 남긴 마지막 음성 메시지를, 몇 년 동안 그대로 두었다가 다시 듣는다.',
    '자기도 모르게, 할머니가 일요일마다 만들던 그 요리를 같은 방식으로 만든다.',
    '메모 앱은 기차에서 우연히 들은 문장들로 가득하다.',
    '가족에게는 보이지 않는, 작은 종류의 용기를 가지고 있다.',
    '특정한 스웨터 한 벌 안에, 어린 시절 집의 냄새가 배어 있다.',
    '의도하지 않은 채로, 5년에 한 번씩 같은 해변으로 돌아간다.',
    '우정이 조용히 끝난 뒤에도, 그 사람의 전화번호를 지우지 못한다.',
    '훗날 자기 아이에게, 한 번 들은 이야기를 거의 그대로 다시 들려주게 될 것이다.',
    '한 장의 앨범이 있어, 십 년마다 의미가 달라진다.',
    '중요했던 대화의 스크린샷을 잘 모아 둔다.',
    '낯선 사람의 걸음걸이에서, 한때 사랑했던 누군가를 떠올린다.'
  ],
  tr: [
    'Söyleyecek özel bir şey olmasa da, market alışverişi sırasında ebeveynlerini arar.',
    'Okuduğu kitapların arasına eski fişler bırakır.',
    'Ortaokulda yaşanmış bir utanç anını ömür boyu unutmaz.',
    'Yalnızca arabada tek başınayken dinlediği bir şarkı vardır.',
    'En yakın arkadaşına her doğum gününde aynı tek cümleyi gönderir.',
    'On altı yaşında giydiği bir parça giysiyi otuzlu yaşlarına kadar giyer.',
    'Daha kısa bir yol olduğunu bilse de, hep aynı eve dönüş yolunu seçer.',
    'Duygusal araba reklamlarında mutlaka ağlar; ama bunu yabancıların yanında söylemez.',
    'Belirli bir öğleden sonra gökyüzü rengine kendi adını koymuştur.',
    'Büyükannesinin yolladığı son doğum günü kartını saklamaktadır.',
    'Pek de istemeden, köşedeki dükkân sahibiyle arkadaş olur.',
    'Bazen uçakta yanına oturan yabancılara itiraf eder — en yakın arkadaşlarının bilmediği şeyleri.',
    'İlk evcil hayvanının öldüğü tarihi bilir; ama ehliyetini aldığı tarihi hatırlamaz.',
    'Annesinin mırıldandığı bir şarkıyı mırıldanır; bunun annesinin şarkısı olduğunu bilmez.',
    'Uyanıkken hiç görmediği bir koridorla ilgili tekrarlayan bir rüya görür.',
    'Cansız nesnelere çarptığında refleks olarak özür diler.',
    'Cüzdanında, kendi el yazısı olmayan katlanmış bir kâğıt parçası taşır.',
    'Memleketinde belirli bir sokağı, sebebini dile getiremeden uzakta tutar.',
    'Artık iletişiminin olmadığı birinin çerçeveli bir fotoğrafına sahiptir.',
    'Bir ebeveynden gelen son sesli mesajı, yıllarca dinlemeden saklar; sonra yeniden dinler.',
    'Farkına varmadan, büyükannesinin yaptığı pazar yemeğini aynı şekilde pişirir.',
    'Not uygulamasında, trenlerde kulağına çalınan cümleler birikmiştir.',
    'Ailesinin görmediği küçük bir cesareti vardır.',
    'Tek bir kazağın içinde çocukluk evinin kokusunu taşır.',
    'Plan yapmadan, beş yılda bir aynı kumsala döner.',
    'Arkadaşlık sessizce bittikten sonra bile o kişinin telefon numarasını silmez.',
    'İleride çocuğuna, bir kez duyduğu bir hikâyeyi neredeyse kelimesi kelimesine anlatacak.',
    'Her on yılda bir başka anlama gelen bir albümü vardır.',
    'Önem taşıyan konuşmaların ekran görüntülerini saklar.',
    'Bir yabancının yürüyüşünden, bir zamanlar sevdiği birini hatırlar.'
  ]
};

// Kids mode: believable kid-specific details. Hopeful, embodied, small.
const KIDS_TRACES = {
  en: [
    'Keeps interesting rocks in their pockets.',
    'Names every plant in the house.',
    'Replays one song until the family knows every word.',
    'Builds strange, careful inventions out of cardboard.',
    'Writes stories in notebooks no one else reads.',
    'Talks to the family pet in a special quiet voice.',
    'Counts steps when they walk to school.',
    'Saves drawings under their bed in a specific order.',
    'Asks the same favourite question every night.',
    'Practises handwriting on the back of receipts.',
    'Collects stickers and refuses to use any of them.',
    "Knows the name of every kid in their class's pets.",
    'Has a particular tree they always sit under.',
    'Watches the same film many times in one week.',
    'Reads books past their bedtime, by streetlight if they can.',
    'Asks grown-ups about their childhoods.',
    'Picks out a present for a friend long before the birthday.',
    'Carries a small notebook in case they need to remember something.',
    'Brings home small treasures from the playground.',
    'Has invented their own kind of secret code.',
    "Knows the way to a friend's house by heart, including shortcuts.",
    'Always sits in the same chair at the kitchen table.',
    'Holds onto one stuffed animal for years, even past liking it.',
    'Says hello to dogs they pass on the street, by name when they know it.',
    'Practises one tiny skill on their own — origami, juggling, drawing eyes.'
  ],
  zh: [
    '口袋里总装着捡来的有趣石头。',
    '给家里的每一株植物都起一个名字。',
    '一首歌循环播放,直到全家人都会唱。',
    '用纸板小心翼翼地拼出奇怪的小发明。',
    '在没人看的笔记本里偷偷写故事。',
    '对家里的宠物说话时,用一种只属于他/她的轻声调。',
    '走路上学时,会数着脚步走。',
    '把画好的画按特定顺序藏在床底。',
    '每天晚上,反复问同一个最喜欢的问题。',
    '在收据背面练字。',
    '收集贴纸,却舍不得用任何一张。',
    '能叫出班里每个同学家宠物的名字。',
    '总有一棵自己最爱坐在下面的树。',
    '一周之内把同一部电影看上好多遍。',
    '到了该睡的时间还偷偷读书,有路灯就借路灯的光。',
    '会去问大人:你小时候是什么样子的?',
    '生日还没到,就早早替朋友挑好礼物。',
    '随身带一本小本子,以备需要记下什么。',
    '从操场带回各种小宝贝。',
    '发明了一套自己的小密码。',
    '把通往朋友家的路记得一清二楚,连捷径都熟得很。',
    '在餐桌前总坐同一张椅子。',
    '一只毛绒玩具被珍藏好多年,甚至在已经不再喜欢之后。',
    '路上遇到的狗都要打招呼,认识的还会叫名字。',
    '一个人默默练一项小本领——折纸、抛球、画眼睛。'
  ],
  ja: [
    '気になる石をいつもポケットに入れている。',
    '家じゅうの植物に、一つひとつ名前をつけている。',
    '一曲を何度もくり返し聴き、家族みんなが歌詞を覚えてしまう。',
    '段ボールで、奇妙で丁寧な発明品を作る。',
    '誰にも読まれないノートに、物語を書いている。',
    '家のペットには、自分だけの静かな声で話しかける。',
    '学校までの道を歩きながら、歩数を数えている。',
    'ベッドの下に、決まった順番で絵をしまっている。',
    '毎晩、いちばん好きな同じ質問を何度もする。',
    'レシートの裏で、字の練習をしている。',
    'シールを集めるが、絶対に貼ろうとしない。',
    'クラスの子たちの飼っているペットの名前を、ぜんぶ言える。',
    'いつも下に座る、お気に入りの一本の木がある。',
    '同じ映画を、一週間のうちに何度も観る。',
    '寝る時間を過ぎても、街灯の明かりで本を読む。',
    '大人に「子どものころどうだった?」と聞きたがる。',
    '友達の誕生日のずっと前から、プレゼントを選び始めている。',
    '何か覚えておきたいときのために、小さなノートを持ち歩く。',
    '公園から、小さな宝物をたくさん持ち帰る。',
    '自分だけの暗号を、ちゃんと考えて作っている。',
    '友達の家までの道を、近道まで含めて完璧に覚えている。',
    '食卓では、いつも同じ椅子に座る。',
    '一つのぬいぐるみを、もう好きでなくなった後も大事に持ち続ける。',
    '通りで犬に出会うたびに挨拶する。知っている犬なら名前で呼ぶ。',
    '一人で小さな技を練習している――折り紙、お手玉、目を描くこと。'
  ],
  ko: [
    '주머니에는 늘 주워 온 흥미로운 돌들이 들어 있다.',
    '집 안에 있는 모든 식물에 이름을 붙여 둔다.',
    '한 노래를 가족 모두가 가사를 외울 때까지 반복해서 듣는다.',
    '판지로 이상하지만 정성스러운 발명품을 만든다.',
    '아무도 읽지 않는 공책에 이야기들을 적는다.',
    '가족의 반려동물에게는 자신만의 조용한 목소리로 말을 건다.',
    '학교 가는 길에 발걸음을 센다.',
    '침대 밑에, 정해진 순서대로 그림들을 모아 둔다.',
    '매일 밤, 가장 좋아하는 같은 질문을 한다.',
    '영수증 뒷면에 글씨 쓰는 연습을 한다.',
    '스티커를 모으지만, 어느 하나도 쓰지 않는다.',
    '반 친구들이 키우는 반려동물의 이름을 모두 안다.',
    '늘 그 아래에 앉는, 특별한 나무 한 그루가 있다.',
    '같은 영화를 한 주에 여러 번 본다.',
    '잠들 시간이 지나서도, 가능하면 가로등 불빛에 의지해 책을 읽는다.',
    '어른들에게 어릴 적 이야기를 물어본다.',
    '친구의 생일이 한참 남았는데도, 미리 선물을 골라 둔다.',
    '뭔가 기억해 두고 싶을 때를 대비해 작은 공책을 들고 다닌다.',
    '놀이터에서 작은 보물들을 집으로 가져온다.',
    '자기만의 작은 암호를 만들어 두었다.',
    '친구 집까지 가는 길을 지름길까지 모두 외우고 있다.',
    '식탁에서는 늘 같은 자리에 앉는다.',
    '인형 하나를, 더는 좋아하지 않게 된 뒤에도 오래도록 간직한다.',
    '길에서 마주치는 개에게 인사한다. 아는 개라면 이름까지 부른다.',
    '혼자 작은 기술 하나를 연습한다 — 종이접기, 저글링, 눈 그리기.'
  ],
  tr: [
    'Cebinde her zaman ilginç taşlar taşır.',
    'Evdeki her bitkiye bir isim verir.',
    'Bir şarkıyı, tüm ailenin sözlerini ezberlemesine kadar tekrar tekrar dinler.',
    'Kartondan tuhaf ama özenli icatlar yapar.',
    'Kimsenin okumadığı defterlere hikâyeler yazar.',
    'Evdeki hayvanla yalnızca kendisine özgü, sakin bir sesle konuşur.',
    'Okula giderken adımlarını sayar.',
    'Yatağının altında belirli bir sırayla çizimlerini saklar.',
    'Her gece en sevdiği aynı soruyu sorar.',
    'Fişlerin arkasında yazı çalışır.',
    'Çıkartma biriktirir ama hiçbirini kullanmaya kıyamaz.',
    'Sınıftaki herkesin evcil hayvanlarının adını bilir.',
    'Hep altında oturduğu özel bir ağacı vardır.',
    'Aynı filmi bir hafta içinde defalarca izler.',
    'Yatma saati geçtikten sonra, mümkünse sokak lambasının ışığıyla kitap okur.',
    'Büyüklere çocukluklarının nasıl olduğunu sorar.',
    'Bir arkadaşının doğum gününden çok önce ona hediye seçer.',
    'Bir şeyi unutmamak için yanında küçük bir defter taşır.',
    'Oyun alanından küçük hazineler getirir.',
    'Kendine ait bir gizli şifre icat etmiştir.',
    'Bir arkadaşının evine giden yolu, kestirmeleriyle birlikte ezbere bilir.',
    'Mutfak masasında hep aynı sandalyeye oturur.',
    'Bir oyuncak ayıya, artık onu sevmediği zamandan sonra bile yıllarca tutunur.',
    'Sokakta karşılaştığı köpeklere selam verir; tanıdığı varsa adıyla seslenir.',
    'Tek başına küçük bir beceriyi çalışır — origami, hokkabazlık, göz çizmek.'
  ]
};

// Kid-friendly hobbies, tagged by personality dimension so the
// constellation reads the baby's traits. Used in Kids mode only.
const KIDS_HOBBIES = {
  en: [
    { name: 'Reading',         tag: 'O' },
    { name: 'Drawing',         tag: 'O' },
    { name: 'Inventing games', tag: 'O' },
    { name: 'Astronomy',       tag: 'O' },
    { name: 'Building things', tag: 'O' },
    { name: 'Writing stories', tag: 'O' },
    { name: 'Puzzles',         tag: 'C' },
    { name: 'Chess',           tag: 'C' },
    { name: 'Origami',         tag: 'C' },
    { name: 'Gardening',       tag: 'C' },
    { name: 'Lego',            tag: 'C' },
    { name: 'Theatre',         tag: 'E' },
    { name: 'Choir',           tag: 'E' },
    { name: 'Performing',      tag: 'E' },
    { name: 'Hosting friends', tag: 'E' },
    { name: 'Storytelling',    tag: 'E' },
    { name: 'Caring for pets', tag: 'A' },
    { name: 'Helping neighbours', tag: 'A' },
    { name: 'Birthday-card making', tag: 'A' },
    { name: 'Babysitting little cousins', tag: 'A' },
    { name: 'Nature walks',    tag: 'A' },
    { name: 'Stargazing',      tag: 'N' },
    { name: 'Diary writing',   tag: 'N' },
    { name: 'Quiet music',     tag: 'N' },
    { name: 'Daydreaming',     tag: 'N' },
    { name: 'Soccer',          tag: 'athletic' },
    { name: 'Dancing',         tag: 'athletic' },
    { name: 'Climbing trees',  tag: 'athletic' },
    { name: 'Cycling',         tag: 'athletic' },
    { name: 'Swimming',        tag: 'athletic' },
    { name: 'Skateboarding',   tag: 'athletic' }
  ],
  zh: [
    { name: '读书',           tag: 'O' },
    { name: '画画',           tag: 'O' },
    { name: '自创游戏',       tag: 'O' },
    { name: '天文',           tag: 'O' },
    { name: '动手做东西',     tag: 'O' },
    { name: '写故事',         tag: 'O' },
    { name: '拼图',           tag: 'C' },
    { name: '象棋',           tag: 'C' },
    { name: '折纸',           tag: 'C' },
    { name: '园艺',           tag: 'C' },
    { name: '乐高',           tag: 'C' },
    { name: '戏剧',           tag: 'E' },
    { name: '合唱',           tag: 'E' },
    { name: '表演',           tag: 'E' },
    { name: '招待朋友',       tag: 'E' },
    { name: '讲故事',         tag: 'E' },
    { name: '照顾宠物',       tag: 'A' },
    { name: '帮助邻居',       tag: 'A' },
    { name: '制作生日卡片',   tag: 'A' },
    { name: '照看小表弟妹',   tag: 'A' },
    { name: '自然散步',       tag: 'A' },
    { name: '看星星',         tag: 'N' },
    { name: '写日记',         tag: 'N' },
    { name: '静谧的音乐',     tag: 'N' },
    { name: '发呆',           tag: 'N' },
    { name: '足球',           tag: 'athletic' },
    { name: '跳舞',           tag: 'athletic' },
    { name: '爬树',           tag: 'athletic' },
    { name: '骑车',           tag: 'athletic' },
    { name: '游泳',           tag: 'athletic' },
    { name: '滑板',           tag: 'athletic' }
  ],
  ja: [
    { name: '読書',                 tag: 'O' },
    { name: 'お絵かき',             tag: 'O' },
    { name: '遊びを考える',         tag: 'O' },
    { name: '天文',                 tag: 'O' },
    { name: 'ものづくり',           tag: 'O' },
    { name: '物語を書く',           tag: 'O' },
    { name: 'パズル',               tag: 'C' },
    { name: 'チェス',               tag: 'C' },
    { name: '折り紙',               tag: 'C' },
    { name: '園芸',                 tag: 'C' },
    { name: 'レゴ',                 tag: 'C' },
    { name: '演劇',                 tag: 'E' },
    { name: '合唱',                 tag: 'E' },
    { name: 'パフォーマンス',       tag: 'E' },
    { name: '友だちを招く',         tag: 'E' },
    { name: 'お話を語る',           tag: 'E' },
    { name: 'ペットの世話',         tag: 'A' },
    { name: 'ご近所さんの手伝い',   tag: 'A' },
    { name: 'バースデーカードづくり', tag: 'A' },
    { name: '小さないとこの子守り', tag: 'A' },
    { name: '自然散策',             tag: 'A' },
    { name: '星を見ること',         tag: 'N' },
    { name: '日記',                 tag: 'N' },
    { name: 'しずかな音楽',         tag: 'N' },
    { name: '空想',                 tag: 'N' },
    { name: 'サッカー',             tag: 'athletic' },
    { name: 'ダンス',               tag: 'athletic' },
    { name: '木登り',               tag: 'athletic' },
    { name: 'サイクリング',         tag: 'athletic' },
    { name: '水泳',                 tag: 'athletic' },
    { name: 'スケートボード',       tag: 'athletic' }
  ],
  ko: [
    { name: '책 읽기',         tag: 'O' },
    { name: '그림 그리기',     tag: 'O' },
    { name: '게임 만들기',     tag: 'O' },
    { name: '천문',            tag: 'O' },
    { name: '만들기',          tag: 'O' },
    { name: '이야기 쓰기',     tag: 'O' },
    { name: '퍼즐',            tag: 'C' },
    { name: '체스',            tag: 'C' },
    { name: '종이접기',        tag: 'C' },
    { name: '정원 가꾸기',     tag: 'C' },
    { name: '레고',            tag: 'C' },
    { name: '연극',            tag: 'E' },
    { name: '합창',            tag: 'E' },
    { name: '공연',            tag: 'E' },
    { name: '친구 초대',       tag: 'E' },
    { name: '이야기하기',      tag: 'E' },
    { name: '반려동물 돌보기', tag: 'A' },
    { name: '이웃 돕기',       tag: 'A' },
    { name: '생일 카드 만들기', tag: 'A' },
    { name: '어린 사촌 돌보기', tag: 'A' },
    { name: '자연 산책',       tag: 'A' },
    { name: '별 보기',         tag: 'N' },
    { name: '일기 쓰기',       tag: 'N' },
    { name: '잔잔한 음악',     tag: 'N' },
    { name: '공상',            tag: 'N' },
    { name: '축구',            tag: 'athletic' },
    { name: '춤',              tag: 'athletic' },
    { name: '나무 타기',       tag: 'athletic' },
    { name: '자전거',          tag: 'athletic' },
    { name: '수영',            tag: 'athletic' },
    { name: '스케이트보드',    tag: 'athletic' }
  ],
  tr: [
    { name: 'Okumak',                  tag: 'O' },
    { name: 'Resim',                   tag: 'O' },
    { name: 'Oyun uydurma',            tag: 'O' },
    { name: 'Astronomi',               tag: 'O' },
    { name: 'İnşa etmek',              tag: 'O' },
    { name: 'Hikaye yazmak',           tag: 'O' },
    { name: 'Bulmaca',                 tag: 'C' },
    { name: 'Satranç',                 tag: 'C' },
    { name: 'Origami',                 tag: 'C' },
    { name: 'Bahçecilik',              tag: 'C' },
    { name: 'Lego',                    tag: 'C' },
    { name: 'Tiyatro',                 tag: 'E' },
    { name: 'Koro',                    tag: 'E' },
    { name: 'Sahne sanatları',         tag: 'E' },
    { name: 'Arkadaş ağırlamak',       tag: 'E' },
    { name: 'Hikaye anlatmak',         tag: 'E' },
    { name: 'Evcil hayvan bakmak',     tag: 'A' },
    { name: 'Komşulara yardım',        tag: 'A' },
    { name: 'Doğum günü kartı yapmak', tag: 'A' },
    { name: 'Küçük kuzenlere bakmak',  tag: 'A' },
    { name: 'Doğa yürüyüşü',           tag: 'A' },
    { name: 'Yıldız izlemek',          tag: 'N' },
    { name: 'Günlük tutmak',           tag: 'N' },
    { name: 'Sakin müzik',             tag: 'N' },
    { name: 'Hayal kurmak',            tag: 'N' },
    { name: 'Futbol',                  tag: 'athletic' },
    { name: 'Dans',                    tag: 'athletic' },
    { name: 'Ağaca tırmanma',          tag: 'athletic' },
    { name: 'Bisiklet',                tag: 'athletic' },
    { name: 'Yüzme',                   tag: 'athletic' },
    { name: 'Kaykay',                  tag: 'athletic' }
  ]
};

// Reflection mode: memory-snapshot pools per life stage.
const CHILDHOOD_MEMORIES = {
  en: [
    "The smell of their grandmother's kitchen.",
    'A scraped knee that became a story.',
    'A blanket fort that lasted three days.',
    'A song their parent hummed without thinking.',
    "A stuffed animal whose name they'll keep their whole life.",
    'A puddle they jumped in, told off for, and remembered fondly.',
    'A cousin who taught them a card game.',
    'A library card kept in a small pocket.',
    "A drawing they're proud of, taped to the fridge for a year.",
    'A teacher who waited a beat longer than the others.',
    'A bedtime story they made the adult read fifty times.',
    "A particular kind of weather they'll always associate with feeling safe.",
    'A bird outside the window they thought of as theirs.',
    'A favourite chair in the house, claimed.',
    'A friend whose face they will recall, but not their name.'
  ],
  zh: [
    '祖母厨房里那种气味。',
    '一块擦破的膝盖,后来变成了一个故事。',
    '一座撑了整整三天的毯子堡垒。',
    '父母随口哼出的一支歌。',
    '一只名字会伴他/她一辈子的毛绒玩具。',
    '踩过的一个水洼,挨过的一顿骂,日后却被温柔地记着。',
    '教过一种纸牌游戏的表亲。',
    '一张被收在小口袋里的图书证。',
    '一幅自豪的画,在冰箱上贴了一整年。',
    '愿意比别人多等一拍的一位老师。',
    '让大人读了五十遍的睡前故事。',
    '一种永远会让他/她联想到"安心"的天气。',
    '窗外一只被他/她当成自己的鸟。',
    '家里被自己认领下来的最爱的椅子。',
    '一张能想起脸,却想不起名字的朋友。'
  ],
  ja: [
    '祖母の台所のにおい。',
    '物語に変わった、擦りむいた膝。',
    '三日続いた毛布の砦。',
    '親が考えずに口ずさんでいた歌。',
    '生涯名前を覚えていることになる、ぬいぐるみ。',
    '飛び込んで叱られ、のちに懐かしく思い出した水たまり。',
    'トランプのゲームを教えてくれたいとこ。',
    '小さなポケットにしまわれていた図書館カード。',
    '冷蔵庫に一年貼られていた、得意げな絵。',
    '他の人より一拍長く待ってくれた先生。',
    '大人に五十回も読ませた、寝る前の絵本。',
    '「安全」と必ず結びつく、特定の天気。',
    '窓の外の、自分のものだと思っていた鳥。',
    '家の中で、自分のものと決めた一脚の椅子。',
    '顔は思い出せるけれど、名前は思い出せない友達。'
  ],
  ko: [
    '할머니 부엌의 그 냄새.',
    '하나의 이야기가 된, 까진 무릎.',
    '사흘이나 버틴 담요 요새.',
    '부모가 무심코 흥얼거리던 노래.',
    '평생 그 이름을 기억하게 될 인형.',
    '뛰어들어 혼난 웅덩이, 훗날에는 다정하게 떠올리게 된.',
    '카드 게임 한 가지를 가르쳐 준 사촌.',
    '작은 주머니에 간직했던 도서관 카드.',
    '냉장고에 일 년 동안 붙어 있던, 자랑스러운 그림.',
    '다른 사람들보다 한 박자 더 기다려 준 선생님.',
    '어른에게 쉰 번도 더 읽어 달라 졸랐던 잠자리 동화.',
    '"안전"과 영원히 연결되는 특정한 날씨.',
    '창밖의, 자기 것이라 여겼던 새 한 마리.',
    '집 안에서 자기 것으로 정한, 가장 좋아하는 의자.',
    '얼굴은 떠오르지만 이름은 떠오르지 않는 친구.'
  ],
  tr: [
    'Büyükannelerinin mutfağının kokusu.',
    'Bir hikâyeye dönüşen sıyrılmış bir diz.',
    'Üç gün ayakta kalan bir battaniye kalesi.',
    'Ebeveynin farkında olmadan mırıldandığı bir şarkı.',
    'Adını ömür boyu hatırlayacakları bir oyuncak ayı.',
    'İçine atladıkları, azar yedikleri, sonra tatlılıkla hatırladıkları bir su birikintisi.',
    'Onlara bir kart oyunu öğreten bir kuzen.',
    'Küçük bir cepte saklı tutulan bir kütüphane kartı.',
    'Bir yıl boyunca buzdolabına yapıştırılmış, gurur duydukları bir resim.',
    'Diğerlerinden bir tık daha fazla bekleyen bir öğretmen.',
    'Büyüğüne elli kez okuttukları bir yatak öyküsü.',
    'Hep "güvende olmakla" eşleştirecekleri belirli bir hava.',
    'Pencerenin dışında, kendilerinin saydıkları bir kuş.',
    'Evdeki, kendilerine ait saydıkları en sevdikleri sandalye.',
    'Yüzünü hatırlayacakları ama adını hatırlamayacakları bir arkadaş.'
  ]
};
const ADOLESCENCE_MEMORIES = {
  en: [
    'A note passed in class that changed something.',
    'A song played on repeat for an entire summer.',
    'A teacher who said one thing they would carry forever.',
    'A friendship that mattered more than they let on.',
    'The first time they kept a secret well.',
    'A photograph they would later regret deleting.',
    'A small embarrassment they kept private for twenty years.',
    'A night that ended later than it should have.',
    'The first time they realised an adult was wrong.',
    'A book read alone in a car.',
    'The week they decided who they would be.',
    'A walk home they still take in their head.',
    'A grown-up who treated them like a grown-up first.',
    "A grief they didn't have the words for yet.",
    'A bedroom wall covered in things that no longer fit.'
  ],
  zh: [
    '一张在课上传递的字条,改变了某件事。',
    '一首整个夏天循环播放的歌。',
    '说过一句话、被一生带在身上的那位老师。',
    '远比表现出来更重要的一段友谊。',
    '第一次,把一个秘密好好保住。',
    '后来会后悔删掉的一张照片。',
    '保了二十年的一桩小小的难堪。',
    '一个结束得比应当更晚的夜晚。',
    '第一次意识到一个大人是错的。',
    '在车里独自读完的一本书。',
    '决定自己要成为什么样的人的那一周。',
    '至今仍在心中重走的回家路。',
    '第一个把自己当大人看待的大人。',
    '那时还没有词可以描述的悲伤。',
    '贴满了已经不再合身之物的卧室墙壁。'
  ],
  ja: [
    '何かを変えた、授業中に回されたメモ。',
    '夏のあいだじゅう、繰り返し聴いていた一曲。',
    '一生持ち歩くことになる一言を言ってくれた先生。',
    '見せないようにしていた、思っていた以上に大切だった友情。',
    '初めてうまく秘密を守った日。',
    'のちに削除を後悔することになる一枚の写真。',
    '二十年ほど黙っていた、小さな恥ずかしさ。',
    '本来よりも遅くまで続いた一夜。',
    'ある大人が間違っていると初めて気づいた瞬間。',
    '車のなかで一人で読み終えた一冊の本。',
    '自分が何者になるかを決めた一週間。',
    'いまでも頭のなかで歩いて帰る道。',
    '最初に「対等な大人」として扱ってくれた人。',
    'まだ言葉のなかった悲しみ。',
    '今となっては合わなくなったものでいっぱいの寝室の壁。'
  ],
  ko: [
    '수업 시간에 돌린 쪽지가 무언가를 바꿨던 날.',
    '여름 내내 반복 재생하던 노래.',
    '평생 안고 살아갈 한 마디를 해준 선생님.',
    '드러내는 것보다 훨씬 더 중요했던 우정.',
    '처음으로 비밀을 잘 지켜낸 날.',
    '훗날 지운 것을 후회하게 될 사진 한 장.',
    '이십 년 동안 혼자만 간직한 작은 부끄러움.',
    '본래보다 늦게 끝났던 어떤 밤.',
    '어떤 어른이 틀렸음을 처음 알아챈 순간.',
    '차 안에서 혼자 읽어낸 한 권의 책.',
    '자신이 누가 될지 정한 그 한 주.',
    '아직도 머릿속에서 걷는 그 귀갓길.',
    '처음으로 자신을 어른처럼 대해 준 어른.',
    '그땐 아직 말이 없었던 슬픔.',
    '이제 더는 맞지 않는 것들로 가득했던 방의 벽.'
  ],
  tr: [
    'Sınıfta el değiştiren ve bir şeyi değiştiren bir not.',
    'Bütün bir yaz boyunca tekrar tekrar dinlenen bir şarkı.',
    'Sonsuza dek taşıyacakları tek bir cümle söyleyen bir öğretmen.',
    'Gösterdiklerinden çok daha önemli olan bir arkadaşlık.',
    'İlk kez bir sırrı iyi saklamış oldukları zaman.',
    'Sonradan sildiklerine pişman olacakları bir fotoğraf.',
    'Yirmi yıl boyunca kimseye söylenmemiş küçük bir mahcubiyet.',
    'Gereğinden geç biten bir gece.',
    'Bir yetişkinin yanıldığını ilk kez fark ettikleri an.',
    'Bir arabanın içinde tek başına okunmuş bir kitap.',
    'Kim olacaklarına karar verdikleri o hafta.',
    'Hâlâ akıllarında yürüyerek eve dönmekte oldukları bir yol.',
    'Onlara ilk kez yetişkin gibi davranan bir yetişkin.',
    'Henüz kelimelerini bilmedikleri bir keder.',
    'Artık üzerlerine olmayan şeylerle kaplı bir yatak odası duvarı.'
  ]
};
const ADULTHOOD_MEMORIES = {
  en: [
    'A phone call they made even though it was late.',
    'The Sunday they learned to bake bread.',
    'A loss they thought they would not survive — they did.',
    'A small apartment that, in memory, will be the happiest one.',
    'A friendship they let lapse without meaning to.',
    'A walk through their old neighbourhood years later.',
    'A child whose hand fit perfectly in theirs.',
    "A parent's handwriting on an envelope, read again.",
    'A meeting at work that turned into something else.',
    'A garden they kept badly but loved anyway.',
    'A move to a city they once swore against.',
    'A reconciliation they did not initiate.',
    'A morning they understood their own parent for the first time.',
    'A song they sang to themselves through a hard year.',
    'A choice they made quietly that changed everything afterward.'
  ],
  zh: [
    '已经很晚,但还是拨出去的一通电话。',
    '学会烤面包的那个星期天。',
    '一度以为撑不过去的丧失——后来还是撑过来了。',
    '在回忆里会成为"最快乐的家"的一处小公寓。',
    '不是有意要疏远、却任其断了的一段友谊。',
    '多年之后,再次走过的那条老街。',
    '一只刚好可以握进自己手里的小手。',
    '信封上父母的字迹,被重新读过一次。',
    '一次原本只是工作的会面,后来成了别的什么。',
    '一座没怎么打理好、但还是一直深爱着的花园。',
    '搬去了一座曾经发誓不去的城市。',
    '不是由自己开口的那场和解。',
    '第一次真正理解自己父母的那个早晨。',
    '熬过艰难一年时,一直在心里哼的那首歌。',
    '安静做出的、却改变了往后一切的一个决定。'
  ],
  ja: [
    '夜遅くだったが、それでもかけた電話。',
    'パンを焼くことを覚えた、ある日曜日。',
    '生き延びられないと思った喪失――でも、生き延びた。',
    '思い出のなかで「いちばん幸せだった部屋」になる小さなアパート。',
    'そのつもりなく、ふと途絶えてしまった友情。',
    '何年もあとに、もう一度歩いた昔のあたり。',
    '自分の手にぴったり収まる、小さな手。',
    '封筒に書かれた親の文字を、もう一度読み返した日。',
    'もとは仕事の打ち合わせだったのに、別の何かになっていった出会い。',
    'うまくは手入れできなかったけれど、それでも愛し続けていた庭。',
    'かつて「絶対住まない」と言い切っていた街への引っ越し。',
    '自分からは始められなかった、ある和解。',
    'はじめて自分の親を理解したと感じた、ある朝。',
    'つらかった一年、ひとりで口ずさんでいた歌。',
    '静かに下した、それ以降のすべてを変えた一つの決断。'
  ],
  ko: [
    '늦은 시간이었지만 결국 걸었던 한 통의 전화.',
    '빵 굽는 법을 배운 어느 일요일.',
    '버텨내지 못할 줄 알았던 상실 — 그래도 살아남았다.',
    '훗날 기억 속에서 가장 행복했던 집으로 남을 작은 아파트.',
    '의도하지 않았는데도 흐려져 버린 우정.',
    '여러 해가 지나 다시 걸어 본 옛 동네 길.',
    '내 손에 꼭 맞게 들어왔던 한 아이의 손.',
    '봉투 위 부모의 글씨를 다시 읽은 날.',
    '본래 업무로 시작했지만 다른 무엇이 된 어떤 만남.',
    '잘 가꾸지는 못했지만 그래도 계속 아꼈던 정원.',
    '한때 절대 안 가겠다고 했던 도시로의 이사.',
    '내가 먼저 손 내밀지는 않은 어떤 화해.',
    '처음으로 자기 부모를 이해했다고 느낀 어느 아침.',
    '힘든 한 해 동안 혼자 흥얼거렸던 노래.',
    '조용히 내린, 이후의 모든 것을 바꾼 어떤 선택.'
  ],
  tr: [
    'Geç olmasına rağmen yine de yapılan bir telefon görüşmesi.',
    'Ekmek pişirmeyi öğrendikleri o pazar.',
    'Atlatamayacaklarını sandıkları bir kayıp — atlattılar.',
    'Hatıralarda "en mutlu ev" olarak kalacak küçük bir daire.',
    'İstemeden, kendiliğinden kopan bir arkadaşlık.',
    'Yıllar sonra yeniden yürüdükleri eski bir mahalle.',
    'Kendi elinin içine tam oturan küçük bir el.',
    'Bir zarfın üstünde, ebeveynlerinin el yazısını yeniden okudukları an.',
    'Aslında bir iş toplantısı olan, sonra başka bir şeye dönüşen bir buluşma.',
    'Pek de iyi bakamadıkları, ama yine de hep sevdikleri bir bahçe.',
    'Bir zamanlar asla taşınmayacaklarına yemin ettikleri bir şehre taşınma.',
    'Başlatan kendileri olmayan bir barışma.',
    'İlk kez kendi ebeveynlerini anladıklarını hissettikleri bir sabah.',
    'Zorlu bir yıl boyunca kendi kendilerine söyledikleri bir şarkı.',
    'Sessizce verilen ve sonraki her şeyi değiştiren bir karar.'
  ]
};

/* ---------- Aging scrubber ticker pools ----------
 * Stage-bucketed lines surfaced by the age slider. Three buckets:
 * early (0-12), mid (13-29), later (30+). Reflection reuses the
 * existing memory pools; Kids and Adult get their own. */
const KIDS_AGE_TICKERS = {
  early: {
    en: [
      'Building a fort out of every sofa cushion in the house.',
      'Naming a goldfish, then naming it again the next day.',
      'Insisting on wearing the same dinosaur t-shirt three days in a row.',
      'Practising writing their name on every available surface.',
      'Asking why the sky is blue. Then why the why is why.',
      'Memorising every word of one specific picture book.',
      'Inventing an imaginary friend who works at a bakery.'
    ],
    zh: [
      '用家里所有的沙发垫,搭起一座小堡垒。',
      '给一条金鱼起名,第二天又重新起一个。',
      '坚持要把同一件恐龙T恤连穿三天。',
      '在所有可以写的地方,练习写自己的名字。',
      '问"天为什么是蓝的"。然后问"为什么要问为什么"。',
      '把某一本绘本里的每一个字都背下来。',
      '发明了一位想象中的朋友,他在面包店上班。'
    ],
    ja: [
      'ソファのクッションを全部使って、お城を作っている。',
      '金魚に名前をつけ、翌日また別の名前をつけ直す。',
      '同じ恐竜のTシャツを、三日連続で着たがる。',
      '書ける場所を見つけては、自分の名前を練習している。',
      '「空はなんで青いの?」と聞く。次に、「その『なんで』はなんで?」と聞く。',
      'ある一冊の絵本の言葉を、一語残らず暗記している。',
      'パン屋で働いている、空想の友達を作っている。'
    ],
    ko: [
      '집안의 소파 쿠션을 다 끌어모아 작은 요새를 만들고 있다.',
      '금붕어에게 이름을 붙이고, 다음 날 또 다른 이름을 붙인다.',
      '같은 공룡 티셔츠를 3일 연속 입겠다고 고집한다.',
      '쓸 수 있는 모든 곳에 자기 이름 쓰는 연습을 한다.',
      '"하늘은 왜 파래?"라고 묻는다. 그다음에 "그 ‘왜’는 왜?"라고 묻는다.',
      '특정 그림책 한 권의 모든 단어를 통째로 외운다.',
      '빵집에서 일하는 상상 친구 한 명을 만들어 두었다.'
    ],
    tr: [
      'Evdeki tüm kanepe yastıklarıyla bir kale kuruyor.',
      'Bir akvaryum balığına isim koyuyor, ertesi gün ona yeni bir isim veriyor.',
      'Aynı dinozor tişörtünü üç gün üst üste giymekte ısrar ediyor.',
      'Yazabildiği her yüzeye adını yazma alıştırması yapıyor.',
      '"Gökyüzü neden mavi?" diye soruyor. Sonra "Bu ‘neden’ neden?" diye soruyor.',
      'Belirli bir resimli kitabın her kelimesini ezberlemiş.',
      'Bir fırında çalışan hayali bir arkadaş icat etmiş.'
    ]
  },
  mid: {
    en: [
      'Walking to school with a best friend, debating something important.',
      'Trying a new way of dressing — it lasts six months, mostly.',
      'Becoming briefly very serious about one specific band.',
      'Discovering they are unexpectedly good at something they did not try for.',
      'Falling in love for the first time, quietly.',
      'Spending a whole weekend on a project no one else understands yet.',
      "Becoming the friend who remembers everyone's birthday."
    ],
    zh: [
      '和最好的朋友一起走路上学,认真地辩论某件大事。',
      '尝试一种新的穿衣方式——大概持续六个月就过去了。',
      '在一段不长的时间里,认真到不行地迷上某一支乐队。',
      '发现自己在一件并没有刻意去练的事上,意外地擅长。',
      '第一次,悄悄地,喜欢上了一个人。',
      '整整一个周末,埋头做一项别人暂时还看不懂的项目。',
      '成为那个"记得大家每一个生日"的朋友。'
    ],
    ja: [
      '親友と歩いて学校に向かい、何か大事なことを真剣に議論している。',
      '新しい着こなしを試している――たいてい半年ほどで終わる。',
      '短いあいだだけ、ある一つのバンドにものすごく真剣になる。',
      '練習もしていないのに、自分はそれが得意らしいと気づく。',
      '初めて、誰にも言わずに恋をする。',
      '誰もまだ意味の分からないプロジェクトに、週末まるごとを費やす。',
      '「みんなの誕生日を覚えている」友達になる。'
    ],
    ko: [
      '가장 친한 친구와 함께 학교에 걸어가며, 무언가 중요한 일을 진지하게 토론한다.',
      '새로운 옷차림을 시도한다 — 보통 반 년쯤 이어진다.',
      '한동안, 특정 밴드에 매우 진지하게 빠진다.',
      '연습한 적도 없는 어떤 일에 자신이 의외로 능하다는 것을 발견한다.',
      '처음으로, 조용히 누군가를 사랑하게 된다.',
      '아직 아무도 이해하지 못하는 한 가지 프로젝트에 주말 내내 매달린다.',
      '"모두의 생일을 기억해 주는" 친구가 된다.'
    ],
    tr: [
      'En yakın arkadaşıyla okula yürüyerek gidiyor; önemli bir şeyi tartışıyorlar.',
      'Yeni bir giyim tarzı deniyor — genelde altı ay sürer.',
      'Belirli bir grubu kısa süreliğine çok ciddiye alıyor.',
      'Hiç çalışmadığı bir şeyde beklenmedik biçimde iyi olduğunu fark ediyor.',
      'İlk kez, sessizce, birine âşık oluyor.',
      'Henüz kimsenin anlamadığı bir projeye bütün bir hafta sonunu ayırıyor.',
      '"Herkesin doğum gününü hatırlayan" arkadaş oluyor.'
    ]
  },
  later: {
    en: [
      'Settling into a kitchen they cook in often. The same chair, mostly.',
      'Calling a parent on Sundays out of habit.',
      'Realising one of their childhood teachers shaped them more than they knew.',
      'Building something with their hands that lasts beyond them.',
      'Becoming the person their younger self would have wanted to find.',
      'Telling a story at a small dinner that everyone will repeat later.',
      'Looking at a photo of themselves at this age and recognising who they were.'
    ],
    zh: [
      '在一个常常下厨的厨房里安顿下来。多半总是坐同一张椅子。',
      '出于习惯,每个周日给父母打一个电话。',
      '意识到童年时的某位老师,对自己的影响远比当时知道的更大。',
      '亲手做出一件能在自己之后继续存在的东西。',
      '终于活成了年轻时的自己希望能遇到的那种人。',
      '在一场小型晚餐上讲了一个故事,后来大家都在重述它。',
      '看着自己这个年纪时的某张照片,认出了那时的自己是谁。'
    ],
    ja: [
      'よく料理する台所に落ち着いていく。たいてい、同じ椅子に座って。',
      '習慣で、日曜日になると親に電話をかけている。',
      '子どものころの先生のひとりが、思っていた以上に自分を形作っていたと気づく。',
      '自分の手で作ったものが、自分よりあとも残っていく。',
      '若いころの自分が出会いたかった人物に、ようやくなる。',
      '小さな夕食の席で語った話を、のちにみなが繰り返している。',
      'この年齢のころの自分の写真を見て、その自分が誰だったかを認める。'
    ],
    ko: [
      '자주 요리하는 부엌에 자리를 잡는다. 대체로 같은 의자에 앉아.',
      '습관처럼, 일요일마다 한 부모에게 전화를 건다.',
      '어릴 적 선생님 중 한 사람이, 자기 자신을 알았던 것보다 훨씬 더 많이 빚어 놓았다는 것을 깨닫는다.',
      '자기 손으로 만든 무언가가, 자기보다 더 오래 남는다.',
      '어렸을 때의 자신이 만나고 싶어 했을 그런 사람이 된다.',
      '작은 저녁 식사 자리에서 들려준 이야기가, 훗날 모두에게 다시 회자된다.',
      '이 나이의 자기 사진을 들여다보며, 그때의 자신을 알아본다.'
    ],
    tr: [
      'Sık yemek pişirdiği bir mutfağa yerleşiyor. Çoğunlukla aynı sandalye.',
      'Alışkanlıkla, pazar günleri bir ebeveynini arıyor.',
      'Çocukluğundaki öğretmenlerinden birinin, bildiğinden çok daha fazla onu biçimlendirdiğini fark ediyor.',
      'Kendi elleriyle, kendisinden sonra da kalacak bir şey inşa ediyor.',
      'Genç hâlinin bulmak isteyeceği kişiye dönüşüyor.',
      'Küçük bir akşam yemeğinde anlattığı bir hikâyeyi, sonradan herkes tekrarlıyor.',
      'Bu yaştaki kendi fotoğrafına bakıp, o sıralar kim olduğunu tanıyor.'
    ]
  }
};

const ADULT_TRAJECTORY_MILESTONES = {
  early: {
    en: [
      'Motor coordination on track; gross and fine skills consolidating as expected.',
      'Verbal acquisition within typical range; vocabulary expanding steadily.',
      'Temperament profile observable; sleep and feeding rhythms stabilizing.',
      'Attachment patterns forming with primary caregivers.',
      'Early curiosity emerging around objects, sound, and faces.',
      'Pre-literacy markers present; symbolic play beginning to appear.'
    ],
    zh: [
      '运动协调发展正常;粗大与精细动作按预期整合。',
      '语言获取处于典型区间;词汇量稳步扩大。',
      '气质特征可观察;睡眠与喂养节律趋于稳定。',
      '与主要照护者之间的依恋模式正在形成。',
      '对物体、声音与面孔的早期好奇逐渐显现。',
      '前读写指标已出现;象征性游戏开始出现。'
    ],
    ja: [
      '運動協調は順調。粗大運動と微細運動の発達は想定どおり統合されつつある。',
      '言語獲得は標準域内。語彙は安定して増加。',
      '気質プロファイルが観察可能。睡眠・哺乳のリズムが安定してきている。',
      '主要養育者との愛着パターンが形成されつつある。',
      '物・音・顔への初期の好奇心が現れ始めている。',
      '前読み書きのマーカーが存在し、象徴的遊びが現れ始めている。'
    ],
    ko: [
      '운동 협응 양호; 대근육 및 소근육 기능이 예상대로 통합되고 있음.',
      '언어 습득은 전형적 범위 안에 있으며 어휘가 꾸준히 확장되고 있음.',
      '기질 프로파일이 관찰 가능하며, 수면 및 수유 리듬이 안정되어 가는 중.',
      '주요 양육자와의 애착 패턴이 형성되고 있음.',
      '사물·소리·얼굴에 대한 초기 호기심이 나타나고 있음.',
      '전 문해 지표가 존재하며, 상징 놀이가 나타나기 시작함.'
    ],
    tr: [
      'Motor koordinasyon yolunda; kaba ve ince motor beceriler beklenildiği şekilde pekişiyor.',
      'Sözlü dil edinimi tipik aralıkta; söz dağarcığı istikrarlı biçimde genişliyor.',
      'Mizaç profili gözlemlenebilir; uyku ve beslenme ritimleri yerine oturuyor.',
      'Ana bakım veren kişilerle bağlanma örüntüleri oluşuyor.',
      'Nesnelere, seslere ve yüzlere karşı erken merak belirginleşiyor.',
      'Okuma öncesi belirteçler mevcut; sembolik oyun ortaya çıkmaya başlıyor.'
    ]
  },
  mid: {
    en: [
      'Enters formal schooling; strengths and challenges emerging in learning.',
      'Peer-group identification forming; friendships gain weight against family.',
      'Three or four candidate identities tried on before adolescence settles.',
      'High school identity solidifying; adult interests beginning to clarify.',
      'First experiences of independent decision-making and its consequences.',
      'Romantic and social self gaining definition through trial and feedback.',
      'Early career signals appearing through interests pursued and initial attempts.'
    ],
    zh: [
      '进入正规学校教育;在学习中,强项与挑战开始显现。',
      '同伴群体认同正在形成;友谊在家庭之外逐渐获得分量。',
      '青春期稳定下来之前,会尝试三到四种候选的身份。',
      '高中阶段身份逐步固化;成年期的兴趣开始变得清晰。',
      '第一次体会到独立做决定及其后果。',
      '通过尝试与反馈,恋爱与社交自我逐渐成型。',
      '通过所追求的兴趣与最初的尝试,早期职业信号开始出现。'
    ],
    ja: [
      '正規教育に入る。学びのなかで、強みと課題が現れ始める。',
      '仲間集団への帰属意識が形成され、友情の比重が家庭に対して相対的に増す。',
      '思春期が落ち着くまでに、三つか四つの候補となる自己像を試す。',
      '高校期にかけて自己像が固まり、大人としての関心が見え始める。',
      '独立した意思決定と、その結果を初めて体験する。',
      '試行とフィードバックを通じて、恋愛・社会的自己像が定義されていく。',
      '追いかける関心と最初の試みから、初期のキャリア信号が現れる。'
    ],
    ko: [
      '정규 교육 과정에 진입; 배움 속에서 강점과 어려움이 드러나기 시작함.',
      '또래 집단에 대한 정체감이 형성되며, 가족 대비 우정의 비중이 커짐.',
      '청소년기가 안정되기 전, 세 가지에서 네 가지의 후보 정체성을 시도해 봄.',
      '고등학교 시기 자아 정체성이 굳어지고, 성인기의 관심사가 명료해지기 시작.',
      '독립적인 의사 결정과 그 결과를 처음 경험함.',
      '시도와 피드백을 통해 연애 및 사회적 자아가 윤곽을 잡아 감.',
      '좇는 관심사와 처음의 시도를 통해 초기 진로 신호가 나타남.'
    ],
    tr: [
      'Örgün eğitime başlıyor; öğrenmede güçlü yanlar ve zorluklar belirginleşiyor.',
      'Akran grubuyla özdeşim oluşuyor; arkadaşlıklar aileye karşı ağırlık kazanıyor.',
      'Ergenlik yerine oturmadan önce üç veya dört aday kimlik denenir.',
      'Lise dönemi kimliği netleşiyor; yetişkin ilgi alanları belirginleşmeye başlıyor.',
      'Bağımsız karar verme ve sonuçlarının ilk deneyimleri yaşanıyor.',
      'Deneme ve geri bildirim yoluyla romantik ve sosyal benlik biçimleniyor.',
      'Peşinden gidilen ilgi alanlarından ve ilk denemelerden erken kariyer sinyalleri görünüyor.'
    ]
  },
  later: {
    en: [
      'Adult personality largely stable; growth continues at slower pace.',
      'A working life takes shape — whether as a path that had to be rebuilt mid-stride, a string of held-together jobs, or a settled career.',
      'Long-term relationships and chosen family settle into recognizable shape.',
      'Health and energy patterns shifting; routines accommodate the change.',
      'Affective range often narrows somewhat with age, alongside more equanimity.',
      'Reflection on choices made and not made becomes more frequent.',
      'Whether or not children arrive, the next generation enters their orbit.',
      'Caregiving for an aging parent, a sibling, or a partner interrupts the projected arc; identity reorganizes around who needs them.',
      'A late bloom: the thing they are known for, by themselves and others, arrives after most peers assumed the shape was set.',
      'Economic precarity persists into this decade for a non-trivial share of cohorts; stability is not evenly distributed.'
    ],
    zh: [
      '成年人格大体稳定;成长仍在继续,但节奏放缓。',
      '一段工作生涯逐渐成型——或是一条不得不在中途重新铺设的路,或是一连串勉力维持的工作,或是一份稳定的职业。',
      '长期关系与所选择的家庭,呈现出可识别的稳定形态。',
      '健康与精力的模式正在改变;日常生活习惯随之做出调整。',
      '随着年龄增长,情绪幅度往往会收窄一些,与之同时,心境也更平稳。',
      '对那些做过与未做的选择,反思变得更频繁。',
      '无论是否有自己的孩子,下一代都已进入他/她的生活轨道。',
      '照护年迈的父母、手足或伴侣,打断了原本预设的人生轨道;身份围绕着"谁需要他/她"重新组织。',
      '一次迟到的绽放:他/她为人所识的那件事——在自己和他人眼中——出现在大多数同龄人都已认定形状已定之后。',
      '在这十年间,经济上的不稳定仍持续困扰着相当一部分同代人;稳定并非平均分布。'
    ],
    ja: [
      '成人後のパーソナリティはおおむね安定。成長は続くが、ペースは緩やかになる。',
      '働く生活の形が定まる――途中で一から組み直さざるを得なかった道であれ、つなぎ合わせて維持してきた職の連なりであれ、落ち着いたキャリアであれ。',
      '長期の人間関係と「選んだ家族」が、見分けのつく形に落ち着く。',
      '健康とエネルギーのパターンが変化し、日々の習慣もそれに合わせて変わる。',
      '感情の幅は年齢とともにやや狭まる一方で、心の落ち着きは増す。',
      'した選択、しなかった選択について振り返ることが多くなる。',
      '自分の子の有無にかかわらず、次の世代が生活圏に入ってくる。',
      '老いた親、きょうだい、あるいは伴侶のケアが、想定されていた軌道を中断させる。アイデンティティは「誰が自分を必要としているか」を軸に再編される。',
      '遅咲き――本人にも周囲にも「この人といえばこれ」と認識されるものが、同世代の多くが「もう形は決まった」と見なした後に現れる。',
      'この十年に入っても、相当な割合のコホートでは経済的不安定さが続いている。安定は均等には分配されていない。'
    ],
    ko: [
      '성인기 인격은 대체로 안정되어 있고, 성장은 더 느린 속도로 이어진다.',
      '일하는 삶의 형태가 자리를 잡는다 — 중간에 처음부터 다시 깔아야 했던 길일 수도, 간신히 이어 붙여 온 일자리들의 연속일 수도, 안정된 경력일 수도 있다.',
      '장기 관계와 스스로 택한 가족의 형태가, 알아볼 수 있는 모습으로 자리 잡는다.',
      '건강과 활력의 양상이 변하고, 일상 습관이 그 변화에 맞춰 조정된다.',
      '감정의 폭은 나이와 함께 다소 좁아지고, 동시에 평정심은 더 커진다.',
      '한 선택과 하지 않은 선택에 대한 성찰이 점점 더 자주 일어난다.',
      '자녀의 유무와 상관없이, 다음 세대가 생활권 안으로 들어온다.',
      '나이 든 부모, 형제자매, 혹은 배우자에 대한 돌봄이 예정된 궤적을 끊는다. 정체성은 "누가 자신을 필요로 하는가"를 중심으로 재편된다.',
      '늦은 개화: 본인과 주위 모두에게 그 사람을 그 사람이게 하는 것이, 또래 대부분이 이미 형태가 정해졌다고 여긴 뒤에 도착한다.',
      '이 10년대에 들어서도 적지 않은 코호트에서 경제적 불안정이 지속된다. 안정은 고르게 분배되어 있지 않다.'
    ],
    tr: [
      'Yetişkin kişilik büyük ölçüde sabit; gelişim daha yavaş bir hızda sürer.',
      'Bir çalışma hayatı biçimini alır — yarı yolda yeniden kurulması gereken bir güzergâh, bir arada tutulmuş işlerden oluşan bir dizi ya da yerleşmiş bir kariyer olarak.',
      'Uzun süreli ilişkiler ve seçilmiş aile, tanınır bir biçime kavuşur.',
      'Sağlık ve enerji örüntüleri değişiyor; rutinler bu değişime uyum sağlıyor.',
      'Duygusal yelpaze yaşla birlikte sıklıkla biraz daralırken, dinginlik artar.',
      'Yapılmış ve yapılmamış seçimler üzerinde düşünmek giderek sıklaşır.',
      'Çocuklar olsun ya da olmasın, sonraki kuşak onun yörüngesine girer.',
      'Yaşlanan bir ebeveyne, bir kardeşe ya da bir eşe bakım vermek, öngörülen ekseni keser; kimlik, kime ihtiyaç duyulduğu etrafında yeniden düzenlenir.',
      'Geç açan bir çiçek: kişinin kendisi ve başkaları için onu tanıdığımız şey, akranların çoğunun biçimin artık oturduğunu varsaymasından sonra gelir.',
      'Bu on yılda da kohortların azımsanmayacak bir bölümü için ekonomik kırılganlık sürer; istikrar eşit biçimde dağılmamıştır.'
    ]
  }
};

function ageBucket(age) {
  if (age < 13) return 'early';
  if (age < 30) return 'mid';
  return 'later';
}

const CLINICAL_REMINDERS = {
  en: [
    'Behavioral outcomes remain difficult to model reliably.',
    'Strong environmental influence expected.',
    'Long-term personality outcomes show high developmental variance.',
    'Current ethical regulations vary globally.',
    'Phenotypic outcomes are more predictable than behavioral.',
    'Polygenic traits exhibit significant individual variation.',
    'Confidence levels decrease over developmental time.',
    'Cognitive optimization remains a regulatory grey area.',
    'Trait stability estimates degrade past adolescence.',
    'Cohort-level outcomes do not predict individual trajectories.'
  ],
  zh: [
    '行为结果仍难以建立可靠模型。',
    '预计环境因素影响显著。',
    '长期人格结果显示出较大的发育期变异。',
    '当前各地的伦理监管标准不一。',
    '表型结果较行为结果更易预测。',
    '多基因特征显示出显著的个体差异。',
    '置信度随发育时间下降。',
    '认知优化仍处于监管的灰色地带。',
    '青春期之后,特征稳定性的估计值会减弱。',
    '群组水平的结果不能预测个体轨迹。'
  ],
  ja: [
    '行動上の結果を信頼性高くモデル化することは依然として困難である。',
    '環境要因の強い影響が見込まれる。',
    '長期的な性格的帰結には、発達段階による大きな変動が見られる。',
    '現行の倫理規制は地域によって異なる。',
    '表現型は行動よりも予測しやすい。',
    '多遺伝子特性には個人差が大きい。',
    '信頼度は発達時間が進むにつれて低下する。',
    '認知的最適化は依然として規制上のグレーゾーンに位置する。',
    '特性の安定性に関する推定値は、思春期以降に劣化する。',
    '集団レベルの帰結は、個人の軌跡を予測しない。'
  ],
  ko: [
    '행동적 결과는 여전히 안정적으로 모형화하기 어렵다.',
    '환경 영향이 크게 작용할 것으로 예상됨.',
    '장기적 성격 결과는 발달 과정에서 큰 분산을 보인다.',
    '현재의 윤리 규제는 국가별로 상이하다.',
    '표현형 결과는 행동적 결과보다 예측 가능성이 높다.',
    '다인성(다유전자) 특성은 상당한 개인 간 변이를 보인다.',
    '신뢰 수준은 발달 시간이 지날수록 감소한다.',
    '인지적 최적화는 여전히 규제의 회색 지대에 있다.',
    '특성 안정성 추정값은 청소년기를 지나면서 약화된다.',
    '코호트 수준의 결과는 개인의 궤적을 예측하지 못한다.'
  ],
  tr: [
    'Davranışsal çıktıların güvenilir biçimde modellenmesi hâlâ zordur.',
    'Güçlü çevresel etki beklenmektedir.',
    'Uzun vadeli kişilik çıktıları, yüksek gelişimsel varyans gösterir.',
    'Mevcut etik düzenlemeler ülkeden ülkeye değişiklik göstermektedir.',
    'Fenotipik çıktılar, davranışsal olanlara göre daha öngörülebilirdir.',
    'Poligenik özellikler önemli bireysel farklılıklar gösterir.',
    'Güven düzeyleri, gelişim süresi içinde azalır.',
    'Bilişsel optimizasyon, hâlâ düzenleyici bir gri alandır.',
    'Özellik kararlılığı tahminleri, ergenliğin ötesinde bozulur.',
    'Kohort düzeyindeki çıktılar, bireysel yörüngeleri öngöremez.'
  ]
};

const TRAIT_CONFLICTS_CLINICAL = [
  { when: b => b.openness >= 8 && b.conscientiousness <= 4,
    tag: 'Initiation-completion gap likely',
    note: 'High exploratory drive paired with low structural tendency. Project completion rates statistically lower.',
    i18n: {
      zh: { tag: '可能存在"启动—完成"差距', note: '高探索倾向叠加低结构性。项目完成率统计上偏低。' },
      ja: { tag: '着手と完了の間にギャップが見込まれる', note: '高い探索傾向と低い構造化傾向の組み合わせ。プロジェクト完了率は統計的に低い。' },
      ko: { tag: '시작-완료 간 격차 가능성', note: '높은 탐색 욕구와 낮은 구조화 경향이 결합됨. 프로젝트 완료율이 통계적으로 낮음.' },
      tr: { tag: 'Başlatma-tamamlama farkı olası', note: 'Yüksek keşif eğilimi ile düşük yapı eğilimi birlikte. Proje tamamlanma oranı istatistiksel olarak düşüktür.' }
    } },
  { when: b => b.conscientiousness >= 8 && b.neuroticism >= 7,
    tag: 'Burnout risk: elevated',
    note: 'High conscientiousness with elevated neuroticism. Stress accumulation likely without active recovery practices.',
    i18n: {
      zh: { tag: '倦怠风险:升高', note: '高尽责性叠加偏高神经质。如缺乏积极的恢复策略,压力易累积。' },
      ja: { tag: 'バーンアウトのリスク:上昇', note: '高い誠実性と上昇した神経症傾向の併存。能動的な回復習慣がなければ、ストレス蓄積が見込まれる。' },
      ko: { tag: '번아웃 위험: 상승', note: '높은 성실성과 높아진 신경성이 결합됨. 능동적 회복이 없으면 스트레스 누적 가능성 높음.' },
      tr: { tag: 'Tükenme riski: yüksek', note: 'Yüksek sorumluluk duygusu ile artmış nevrotizmin birlikteliği. Aktif iyileşme uygulamaları olmadan stres birikmesi olası.' }
    } },
  { when: b => b.openness >= 8 && b.extraversion <= 3,
    tag: 'High internal cognition, low social signaling',
    note: 'Significant private creative output; visibility-dependent careers underperform expectations.',
    i18n: {
      zh: { tag: '内在认知活跃,外部社交信号弱', note: '私下创作产出可观;依赖可见度的职业表现常低于预期。' },
      ja: { tag: '高い内的認知、低い社会的シグナリング', note: '私的な創作産出は大きいが、可視性に依存する職業では期待を下回る。' },
      ko: { tag: '내적 인지 활발, 외적 사회 신호 약함', note: '사적 창작 산출은 크지만, 가시성 의존 직군에서는 기대 이하로 수행함.' },
      tr: { tag: 'Yüksek iç biliş, düşük sosyal sinyal', note: 'Önemli ölçüde özel yaratıcı üretim; görünürlüğe bağlı kariyerler beklentinin altında performans gösterir.' }
    } },
  { when: b => b.agreeableness >= 8 && b.extraversion <= 3,
    tag: 'Low advocacy for self-interest',
    note: 'Cooperation prioritized over visibility. Career compensation tends to lag peer benchmarks.',
    i18n: {
      zh: { tag: '自我利益的倡导能力较弱', note: '合作优先于可见度。职业薪酬常落后于同侪基线。' },
      ja: { tag: '自己利益への主張は弱い', note: '可視性よりも協力を優先する。報酬は同世代の水準を下回る傾向。' },
      ko: { tag: '자기 이익을 위한 발화가 적음', note: '가시성보다 협력을 우선함. 보수가 또래 기준치에 못 미치는 경향.' },
      tr: { tag: 'Kendi çıkarına savunuculuk düşük', note: 'Görünürlük yerine işbirliği öncelenir. Ücret, akran kıyaslamalarının gerisinde kalma eğilimindedir.' }
    } },
  { when: b => b.extraversion >= 8 && b.neuroticism >= 7,
    tag: 'Sociability with elevated reactivity',
    note: 'High external engagement combined with stress sensitivity. Recovery time post-event statistically higher.',
    i18n: {
      zh: { tag: '社交活跃但反应性偏高', note: '高度对外投入与高压力敏感性并存。事件后恢复时间统计上更长。' },
      ja: { tag: '高い社交性と高い反応性の併存', note: '外部への高い関与と、ストレス感受性。出来事後の回復時間は統計的に長くなる。' },
      ko: { tag: '사회성과 높은 반응성의 결합', note: '강한 외부 참여와 스트레스 민감성. 이벤트 이후 회복 시간이 통계적으로 더 김.' },
      tr: { tag: 'Sosyallikle birlikte yüksek tepkisellik', note: 'Güçlü dış katılım ve stres duyarlılığı bir arada. Olay sonrası toparlanma süresi istatistiksel olarak daha uzun.' }
    } },
  { when: b => b.athletic >= 8 && b.conscientiousness <= 3,
    tag: 'High activation, low structure',
    note: 'Physical capacity exceeds organizational tendency. Outcomes depend heavily on external scaffolding.',
    i18n: {
      zh: { tag: '活动度高、结构性弱', note: '体能超出组织能力。结果高度依赖外部支持架构。' },
      ja: { tag: '高い活性、低い構造化', note: '身体能力が組織化傾向を上回る。成果は外部の足場づくりに大きく依存する。' },
      ko: { tag: '활성도 높음, 구조화 약함', note: '신체 능력이 조직화 능력을 앞선다. 결과는 외부 지원 구조에 크게 의존함.' },
      tr: { tag: 'Yüksek hareket, düşük yapı', note: 'Fiziksel kapasite, organizasyon eğilimini aşar. Çıktılar dış destek yapılarına büyük ölçüde bağlıdır.' }
    } },
  { when: b => b.openness >= 8 && b.agreeableness <= 3,
    tag: 'Disruptive cognition profile',
    note: 'High novelty-seeking with low affiliative tendency. Conflict frequency above baseline.',
    i18n: {
      zh: { tag: '颠覆性的认知特征', note: '高新奇追求叠加低亲和倾向。冲突频次高于基线。' },
      ja: { tag: '破壊的な認知プロファイル', note: '強い新奇性追求と低い親和傾向。対立頻度はベースラインを上回る。' },
      ko: { tag: '파괴적 인지 프로필', note: '강한 신기성 추구와 낮은 친화 경향의 결합. 갈등 빈도가 기준선보다 높음.' },
      tr: { tag: 'Yıkıcı bir biliş profili', note: 'Yüksek yenilik arayışı ile düşük yakınlık eğilimi. Çatışma sıklığı temel düzeyin üzerindedir.' }
    } },
  { when: b => b.conscientiousness <= 3 && b.neuroticism <= 3,
    tag: 'Low concern, low structure',
    note: 'Outcomes show high variance. Stable in mood; unpredictable in trajectory.',
    i18n: {
      zh: { tag: '低焦虑、低结构', note: '结果方差大。情绪稳定,轨迹难测。' },
      ja: { tag: '低い不安、低い構造化', note: 'アウトカムの分散が大きい。気分は安定するが、軌跡は読みづらい。' },
      ko: { tag: '낮은 우려, 낮은 구조화', note: '결과의 분산이 크다. 기분은 안정적이나 궤적은 예측하기 어려움.' },
      tr: { tag: 'Düşük kaygı, düşük yapı', note: 'Çıktıların varyansı yüksektir. Duygu durumu istikrarlı, yörünge öngörülemez.' }
    } },
  { when: b => b.agreeableness >= 8 && b.neuroticism <= 3,
    tag: 'Stable affiliative profile',
    note: 'Below-baseline interpersonal friction. Caregiving roles correlate.',
    i18n: {
      zh: { tag: '稳定的亲和型剖面', note: '人际摩擦低于基线。与照护性角色相关。' },
      ja: { tag: '安定した親和プロファイル', note: '対人摩擦はベースラインを下回る。ケア的役割との相関がみられる。' },
      ko: { tag: '안정적 친화 프로필', note: '대인 마찰이 기준선보다 낮음. 돌봄 역할과 상관관계 있음.' },
      tr: { tag: 'Kararlı yakınlık profili', note: 'Kişiler arası sürtüşme temel düzeyin altındadır. Bakım rolleriyle ilişkilidir.' }
    } },
  { when: b => b.extraversion <= 3 && b.openness >= 8 && b.conscientiousness >= 7,
    tag: 'Independent execution profile',
    note: 'High self-directed output; low public signal. Discovery by external observers tends to be delayed.',
    i18n: {
      zh: { tag: '独立执行型剖面', note: '高度自驱产出;对外信号弱。外部观察者发现的时间通常较晚。' },
      ja: { tag: '自律的実行プロファイル', note: '高い自己駆動の産出と、弱い公的シグナル。外部観察者による発見は遅れがちである。' },
      ko: { tag: '자율 실행 프로필', note: '자기 주도적 산출은 높지만 외부 신호는 약함. 외부 관찰자의 발견은 늦어지는 경향.' },
      tr: { tag: 'Bağımsız yürütme profili', note: 'Kendi kendine yüksek üretim; düşük kamusal sinyal. Dış gözlemcilerin keşfi gecikme eğilimindedir.' }
    } }
];

const REGULATORY_CARDS = [
  { title: 'Regulatory landscape.', body: 'Genome editing oversight varies by jurisdiction. The EU, UK, US, and several Asian regulators hold non-aligned positions on heritable modifications.',
    i18n: {
      zh: { title: '监管格局。', body: '基因编辑的监管因地区而异。欧盟、英国、美国以及几个亚洲监管机构,在可遗传修改问题上立场并不一致。' },
      ja: { title: '規制状況。', body: 'ゲノム編集の監督は法域ごとに異なる。EU、英国、米国、および複数のアジア当局は、遺伝に関わる改変について一致した立場をとっていない。' },
      ko: { title: '규제 환경.', body: '유전체 편집에 대한 감독은 관할에 따라 다르다. EU, 영국, 미국, 그리고 일부 아시아 규제 기관은 유전 가능한 변경에 대해 서로 다른 입장을 취한다.' },
      tr: { title: 'Düzenleyici çerçeve.', body: 'Genom düzenleme denetimi yargı çevresine göre değişir. AB, Birleşik Krallık, ABD ve birkaç Asya düzenleyicisi, kalıtsal değişiklikler konusunda uyumsuz tutumlara sahiptir.' }
    } },
  { title: 'Historical precedent.', body: 'Early-20th-century state programs grounded in claimed scientific authority resulted in significant documented harm. The underlying scientific basis was later widely rejected.',
    i18n: {
      zh: { title: '历史先例。', body: '20 世纪初某些国家以所谓"科学权威"为依据推行的项目,造成了大量有据可查的伤害。其背后的科学基础后来被广泛否定。' },
      ja: { title: '歴史的前例。', body: '20世紀初頭、「科学的権威」を称した国家プログラムは、文献上、深刻な被害をもたらした。その科学的根拠は後年、広く否定されている。' },
      ko: { title: '역사적 선례.', body: '20세기 초 "과학적 권위"를 내세운 국가 차원의 프로그램은 상당하고 문서화된 피해를 남겼다. 그 과학적 근거는 이후 광범위하게 부정되었다.' },
      tr: { title: 'Tarihsel öncül.', body: '20. yüzyılın başında "bilimsel otorite" iddiasıyla yürütülen devlet programları belgelenmiş büyük zararlara yol açtı. Dayandığı bilimsel temel, sonradan büyük ölçüde reddedildi.' }
    } },
  { title: 'Access and equity modeling.', body: 'Distribution modeling consistently projects uneven access across socioeconomic lines.',
    i18n: {
      zh: { title: '可及性与公平性建模。', body: '分布建模一致地预测:沿社会经济线分布的可及性会是不均等的。' },
      ja: { title: 'アクセスと公平性のモデリング。', body: '分布モデルは、社会経済階層に沿った不均等なアクセスを一貫して予測している。' },
      ko: { title: '접근성과 형평성 모형화.', body: '분배 모형은 사회·경제적 계층을 따라 접근성이 불균등하게 나타날 것이라 일관되게 예측한다.' },
      tr: { title: 'Erişim ve adalet modellemesi.', body: 'Dağılım modellemesi, sosyoekonomik kategoriler boyunca düzenli olarak eşitsiz erişim öngörür.' }
    } },
  { title: 'Phenotype vs. behavior confidence.', body: 'Confidence in physical-trait prediction substantially exceeds confidence in behavioral or cognitive outcome prediction.',
    i18n: {
      zh: { title: '表型 vs. 行为的预测置信度。', body: '对物理性状的预测置信度,远高于对行为或认知结果的预测置信度。' },
      ja: { title: '表現型と行動の予測信頼度。', body: '身体的特性の予測に対する信頼度は、行動的・認知的アウトカムの予測に対する信頼度を大きく上回る。' },
      ko: { title: '표현형 대 행동 결과의 예측 신뢰도.', body: '신체적 특성에 대한 예측 신뢰도는 행동적·인지적 결과에 대한 예측 신뢰도를 상당히 상회한다.' },
      tr: { title: 'Fenotip vs. davranış öngörüsünde güven.', body: 'Fiziksel özelliklerin öngörüsündeki güven, davranışsal ya da bilişsel sonuçların öngörüsündeki güveni belirgin biçimde aşar.' }
    } },
  { title: 'Cultural variability of targets.', body: 'Trait desirability shows significant variation across regions and historical periods. Optimization targets are not culturally stable.',
    i18n: {
      zh: { title: '目标的文化变异性。', body: '哪些性状被视为"理想的",在不同地区和不同历史时期之间存在显著差异。优化目标在文化上并不稳定。' },
      ja: { title: '目標の文化的可変性。', body: '「望ましい」とされる特性は地域や時代によって大きく異なる。最適化の目標は文化的に安定したものではない。' },
      ko: { title: '목표의 문화적 가변성.', body: '바람직하다고 여겨지는 특성은 지역과 시대에 따라 크게 달라진다. 최적화 목표는 문화적으로 안정적이지 않다.' },
      tr: { title: 'Hedeflerin kültürel değişkenliği.', body: '"İstenir" sayılan özellikler bölgeler ve tarihsel dönemler arasında ciddi farklılık gösterir. Optimizasyon hedefleri kültürel olarak istikrarlı değildir.' }
    } },
  { title: 'Long-horizon outcome data.', body: 'Multi-decade follow-up studies on early-modified cohorts do not yet exist at scale.',
    i18n: {
      zh: { title: '长期结果数据。', body: '针对早期接受修改的群组,数十年尺度的随访研究,目前尚未在规模上建立。' },
      ja: { title: '長期アウトカム・データ。', body: '初期に改変を受けた集団に対する数十年規模の追跡研究は、現時点ではまだ大規模には存在しない。' },
      ko: { title: '장기 결과 데이터.', body: '초기에 변경된 코호트를 대상으로 한 수십 년 단위의 추적 연구는 아직 충분한 규모로 존재하지 않는다.' },
      tr: { title: 'Uzun ufuklu sonuç verileri.', body: 'Erken dönemde değiştirilmiş kohortlar üzerine on yılları kapsayan takip çalışmaları henüz büyük ölçekte mevcut değildir.' }
    } },
  { title: 'On the regulatory citations.', body: 'Oviedo Convention Article 13 and the UK HFEA 2008 cited throughout this interface are real instruments. The "EU IVD-Germ Lines Directive" is a near-future projection — not enacted law — used here to model how a Europe-wide heritable-editing framework would plausibly read once promulgated. Articles and provisions attributed to it are illustrative, not binding; the specific article numbers attached to it in this simulator (Art. 4, 6, 7, 9) are placeholders chosen for narrative texture, not citations of an enacted instrument.',
    i18n: {
      zh: { title: '关于本界面所引用的法规。', body: '本界面中提到的《奥维耶多公约》第 13 条和英国 HFEA 2008,都是真实存在的法律文书。"欧盟 IVD-Germ Lines 指令"则是一项近未来推演——并非已经生效的法律——在此用来模拟一项覆盖全欧的可遗传编辑监管框架在颁布后可能的写法。归于该指令的条款仅作示例,不具约束力;在本模拟器中附在该指令之上的具体条款编号(第 4、6、7、9 条)只是为叙事质感所选取的占位编号,并非对任何已生效法律文书的援引。' },
      ja: { title: '本インターフェイスにおける規制引用について。', body: '本インターフェイスで言及されるオビエド条約 第13条および英国 HFEA 2008 は実在する法的文書である。一方、「EU IVD-Germ Lines 指令」は近未来の想定であり、施行されている法律ではない。ヨーロッパ全域における遺伝に関わる編集の枠組みが制定されたとすればどう書かれるかを示すための、説明用のシミュレーションに用いられている。これに帰せられる条項は例示であって、拘束力はない。本シミュレーターでこの指令に付されている具体的な条文番号(第4条、第6条、第7条、第9条)は、語りの質感のために選ばれたプレースホルダーであり、施行されている法的文書への引用ではない。' },
      ko: { title: '본 인터페이스에서 인용된 규제에 관하여.', body: '본 인터페이스에서 언급되는 오비에도 협약 제13조와 영국 HFEA 2008은 실제 법적 문서이다. 반면 "EU IVD-Germ Lines 지침"은 시행되고 있는 법이 아니라 가까운 미래에 대한 가상의 투영으로, 유럽 전역의 유전 가능한 편집 규제 체계가 만들어졌을 때 어떻게 쓰일 수 있는지를 모형화하기 위해 사용된다. 여기에 부여된 조항들은 설명을 위한 예시이며, 구속력을 갖지 않는다. 본 시뮬레이터에서 이 지침에 붙은 구체적인 조문 번호(제4조, 제6조, 제7조, 제9조)는 서사적 질감을 위해 선택된 자리표시자이며, 시행 중인 법적 문서에 대한 인용이 아니다.' },
      tr: { title: 'Bu arayüzdeki düzenleyici atıflar hakkında.', body: 'Bu arayüzde değinilen Oviedo Sözleşmesi Madde 13 ve Birleşik Krallık HFEA 2008 gerçek hukuki belgelerdir. "AB IVD-Germ Lines Direktifi" ise yürürlüğe girmiş bir yasa değil, yakın geleceğe dair bir projeksiyondur; Avrupa genelinde kalıtsal düzenlemeleri kapsayan bir çerçevenin yürürlüğe girmesi durumunda nasıl okunabileceğini modellemek için kullanılır. Buraya atfedilen maddeler örnek niteliğindedir; bağlayıcı değildir. Bu simülatörde söz konusu direktife iliştirilen belirli madde numaraları (Madde 4, 6, 7, 9) anlatı dokusu için seçilmiş yer tutuculardır; yürürlüğe girmiş bir hukuki araca yapılmış atıflar değildir.' }
    } },
  { title: 'On the classification shorthand.', body: 'The Tier I–IV labels (Baseline / Moderate optimization / Elevated optimization / Boundary case) and the CMP-N classification codes (CMP-2 cognition, CMP-4 affective) are simulation framework designations — diegetic classification markers internal to this interface, not real regulatory classes. The RA-1 through RA-5 channel codes appearing in Regional Access strings and case-file metadata are similarly diegetic access-routing markers tied to budget tiers, not real regulatory notation. Rule-set prefixes visible in warning text (GE-, EM-, RES-, APP-, ATH-) are simulation-internal identifiers used to index allocation classes, not real regulatory citations. The "IOC Aligned Federation" named in the athletic-enhancement note is a diegetic sanctioning body constructed for this simulation, not a real Olympic-affiliated organization or framework. Insurance-context concepts referenced in the resilience note ("insurer notification," "carriers," "depression-care coverage") are likewise diegetic simulation framing, not citations of any specific real underwriting standard. The institutional vocabulary used in Regional Access copy — "licensed clinic," "reference centre," "designated reference centres" — is likewise diegetic provision-tier shorthand for this simulation, not the title of any specific real-world facility class. "HFEA-equivalent" as used here is a simulation-internal tier label meaning "an accreditation level held to be parity-equivalent to a UK HFEA treatment licence under the diegetic regulatory frame"; no real cross-jurisdictional equivalence determination is asserted. Compound forms like "HFEA-licensed reference centres" are similarly diegetic — they denote simulation-internal facility tiers within the projected regulatory frame, not actual UK HFEA regulatory designations or licensed-facility classes.',
    i18n: {
      zh: { title: '关于分类速记。', body: '本界面中的"Tier I–IV"标签(Baseline / Moderate optimization / Elevated optimization / Boundary case),以及 CMP-N 分类编码(CMP-2 cognition、CMP-4 affective),均为模拟框架内部使用的设定标签,而非现实存在的监管类别。出现在"区域可及性"字符串与档案元数据中的 RA-1 至 RA-5 通道编码,同样只是与预算等级相关联的虚构访问路径标记,并非真实的监管表述。警告文本中可见的规则集前缀(GE-、EM-、RES-、APP-、ATH-)也是用来索引分配类别的模拟内部标识符,并非真实的监管引用。运动增强提示中提到的"IOC 协同联合会"是为本模拟构造的虚构裁判机构,并非现实中任何与奥林匹克相关的组织或框架。韧性提示中出现的保险相关概念("向保险公司通报""保险公司""抑郁相关保障")同样属于模拟设定中的虚构表述,并非对任何具体的真实承保标准的援引。"区域可及性"文案中使用的机构词汇——"持牌诊所""参考中心""指定参考中心"——同样是本模拟内部对供给层级的设定简写,并非现实中任何特定机构类别的正式名称。本文所用的"HFEA 等效"是一个模拟内部的层级标签,意为"在本模拟的设定监管框架下,被视为与英国 HFEA 治疗许可在准入级别上对等的资质",并不主张任何真实的跨法域对等认定。"HFEA-licensed reference centres"("HFEA 持牌参考中心")等复合形式同样属于本模拟内部的设定层级——它们指代在推演监管框架下的虚构机构层级,而非英国 HFEA 真实的监管类别或持牌机构分类。' },
      ja: { title: '分類略号について。', body: '本インターフェイス内の「Tier I–IV」表記(Baseline / Moderate optimization / Elevated optimization / Boundary case)と「CMP-N」分類コード(CMP-2 cognition、CMP-4 affective)は、いずれもシミュレーション内部のディエジェティック(物語内的)な分類マーカーであって、現実の規制クラスではない。「Regional Access」関連の文字列やケースファイルのメタデータに現れる RA-1〜RA-5 のチャネルコードも同様で、予算ティアに紐づいた物語内的なアクセス経路マーカーであり、実在の規制表記ではない。警告文中に見える規則セット接頭辞(GE-、EM-、RES-、APP-、ATH-)もまた、割り当てクラスを索引するためのシミュレーション内識別子であり、実際の規制引用ではない。運動増強の注記に挙がる「IOCアラインド・フェデレーション」は本シミュレーションのために構成された物語内の認可団体であり、実在のオリンピック関連組織や枠組みではない。レジリエンス注記で言及される保険関連の概念(「保険会社への通知」「保険会社」「うつ病ケア保障」)もまたシミュレーション内の物語的枠組みであり、特定の実在する引受基準の引用ではない。「Regional Access」関連の文面で用いられる施設語彙——「licensed clinic(認可クリニック)」「reference centre(参照センター)」「designated reference centres(指定参照センター)」——も同様に、本シミュレーション内部での提供層を表す物語的な略記であり、実在する特定の施設区分の正式名称ではない。本文で用いる「HFEA-equivalent」は、「本シミュレーションのディエジェティックな規制枠組みのもとで、英国 HFEA の治療許可と同等の認定水準にあるとみなされるティア」を意味する内部的なティアラベルであり、現実の法域横断的な同等性判定を主張するものではない。「HFEA-licensed reference centres」(HFEA 認可の参照センター)のような複合形も同様にディエジェティック(物語内的)であり——投影された規制枠組み内のシミュレーション内施設ティアを指すものであって、英国 HFEA の現実の規制呼称や認可施設区分ではない。' },
      ko: { title: '분류 약어에 관하여.', body: '본 인터페이스의 "Tier I–IV" 표지(Baseline / Moderate optimization / Elevated optimization / Boundary case)와 CMP-N 분류 코드(CMP-2 cognition, CMP-4 affective)는 모두 시뮬레이션 내부에서 사용하는 가상의 분류 표지이며, 실제 규제 분류가 아니다. "지역 접근(Regional Access)" 문자열과 케이스 파일 메타데이터에 등장하는 RA-1~RA-5 채널 코드 역시 예산 등급과 연결된 가상의 접근 경로 표지이며, 실제 규제 표기가 아니다. 경고 문구에 보이는 규칙 세트 접두어(GE-, EM-, RES-, APP-, ATH-)도 할당 범주를 색인하기 위한 시뮬레이션 내부 식별자이며 실제 규제 인용이 아니다. 운동 강화 안내문에 언급되는 "IOC 정렬 연맹"은 본 시뮬레이션을 위해 구성된 가상의 인준 기구이며, 실재하는 올림픽 관련 조직이나 체계가 아니다. 회복탄력성 안내문에 등장하는 보험 관련 개념("보험사 통보", "보험사", "우울증 치료 보장") 역시 시뮬레이션 내 가상의 설정이며, 특정한 실제 인수 기준에 대한 인용이 아니다. "지역 접근" 문구에 쓰이는 기관 어휘——"licensed clinic(허가 클리닉)", "reference centre(참조 센터)", "designated reference centres(지정 참조 센터)"——도 마찬가지로 본 시뮬레이션 내부의 공급 계층을 가리키는 가상의 약어이며, 실재하는 특정 시설 유형의 정식 명칭이 아니다. 본문에서 사용하는 "HFEA-equivalent"는 "본 시뮬레이션의 가상 규제 체계 아래에서 영국 HFEA 치료 면허와 동등한 수준의 인가 등급을 가진 것으로 간주되는 계층"을 뜻하는 시뮬레이션 내부의 계층 표지이며, 어떠한 실제 관할권 간 동등성 판정을 주장하는 것이 아니다. "HFEA-licensed reference centres"(HFEA 허가 참조 센터)와 같은 복합 형태 역시 마찬가지로 가상의 것이며——투영된 규제 체계 안에서의 시뮬레이션 내부 시설 계층을 가리키는 것일 뿐, 영국 HFEA의 실제 규제 명칭이나 허가 시설 구분이 아니다.' },
      tr: { title: 'Sınıflandırma kısaltmaları hakkında.', body: 'Bu arayüzdeki "Tier I–IV" etiketleri (Baseline / Moderate optimization / Elevated optimization / Boundary case) ve CMP-N sınıflandırma kodları (CMP-2 cognition, CMP-4 affective), simülasyon çerçevesine ait kurgusal sınıflandırma işaretleridir; gerçek düzenleyici sınıflar değildir. Bölgesel Erişim metinlerinde ve dosya meta verisinde görünen RA-1’den RA-5’e kadarki kanal kodları da bütçe katmanlarına bağlanmış kurgusal erişim yönlendirme işaretleridir; gerçek düzenleyici notasyon değildir. Uyarı metinlerinde görünen kural seti önekleri (GE-, EM-, RES-, APP-, ATH-) ise tahsis sınıflarını dizinlemek için kullanılan simülasyon içi tanımlayıcılardır; gerçek düzenleyici atıflar değildir. Atletik güçlendirme notunda anılan "IOC Hizalanmış Federasyon", bu simülasyon için kurgulanmış kurmaca bir yaptırım organıdır; gerçek bir Olimpiyat bağlantılı kuruluş veya çerçeve değildir. Dayanıklılık notunda geçen sigorta bağlamlı kavramlar ("sigortacıya bildirim", "sigorta şirketleri", "depresyon bakım kapsamı") da simülasyon içi kurgusal çerçevelemedir; herhangi bir gerçek sigortacılık standardına atıf değildir. Bölgesel Erişim metinlerinde kullanılan kurumsal terimler — "licensed clinic" (lisanslı klinik), "reference centre" (referans merkez), "designated reference centres" (atanmış referans merkezleri) — aynı şekilde bu simülasyon içi sağlama katmanı için kullanılan kurgusal kısaltmalardır; gerçek bir tesis sınıfının resmî adı değildir. Burada kullanılan "HFEA-equivalent", "bu simülasyonun kurgusal düzenleyici çerçevesi altında, Birleşik Krallık HFEA tedavi lisansıyla eşdeğer kabul edilen bir akreditasyon katmanı" anlamına gelen simülasyon içi bir katman etiketidir; herhangi bir gerçek, yargı çevreleri arası eşdeğerlik tespiti iddia edilmemektedir. "HFEA-licensed reference centres" (HFEA lisanslı referans merkezleri) gibi bileşik formlar da benzer biçimde kurgusaldır — projeksiyondaki düzenleyici çerçeve içindeki simülasyon içi tesis katmanlarını gösterirler; Birleşik Krallık HFEA\'nın gerçek düzenleyici tanımları ya da lisanslı tesis sınıfları değildirler.' }
    } },
  { title: 'On the modeled outcome constructs.', body: 'Behavioral-outcome constructs that surface in the Societal Outcomes Brief — phrases such as "identity-fatigue risk," "care-runs-hot profile," and "appearance-based feedback amplified by algorithmic distribution" — are simulation-internal speculative frameworks, not empirical social-science categories. They are diegetic readouts assembled from allocation, trait, and environment slider combinations to give the projection narrative texture; they should not be read as findings from any real research literature. The Brief\'s rule-fired lines model how an in-simulation analyst would speculate about plausible trajectories, not how outcomes would actually unfold in the world.',
    i18n: {
      zh: { title: '关于建模出的结果性概念。', body: '出现在"社会结果摘要"中的行为结果性概念——例如"身份疲劳风险""关怀过载型(care-runs-hot)倾向""被算法分发放大的外貌反馈"等表述——均为模拟内部的推测性框架,而非来自实证社会科学的既有类别。它们是依据预算分配、性状与环境滑杆的组合在叙事中生成的虚构读出,用于赋予本次推演叙事质感;不应被理解为来自任何真实研究文献的结论。摘要中由规则触发的条目,模拟的是"假想的模拟内分析师"会如何推测可能的人生轨迹,而非现实世界中实际会发生的结果。' },
      ja: { title: 'モデル化されたアウトカム概念について。', body: '「Societal Outcomes Brief(社会的アウトカム概要)」に現れる行動アウトカム概念——「アイデンティティ疲弊リスク」「care-runs-hot プロファイル」「アルゴリズム配信によって増幅される外見ベースのフィードバック」といった言い回し——は、いずれも本シミュレーション内部の思弁的な枠組みであり、実証的な社会科学の既存カテゴリではない。これらは予算配分・形質・環境スライダーの組み合わせから組み立てられる物語上の読み出しであって、本投影に語りの質感を与えるためのものであり、実在の研究知見として読まれるべきものではない。本 Brief のルール起動行は、シミュレーション内のアナリストが「あり得る軌跡」をどう推測するかをモデル化したものであって、現実世界で実際に展開するアウトカムを示すものではない。' },
      ko: { title: '모델링된 결과 개념에 관하여.', body: '"Societal Outcomes Brief(사회적 결과 개요)"에 등장하는 행동 결과 개념——예컨대 "정체성-피로 위험", "care-runs-hot 프로필", "알고리즘 분배에 의해 증폭되는 외모 기반 피드백" 같은 표현——은 모두 본 시뮬레이션 내부의 사변적 틀이며, 실증적 사회과학의 기존 범주가 아니다. 이들은 예산 배분·성향·환경 슬라이더 조합에서 조립되어 본 투영에 서사적 질감을 부여하기 위한 가상의 판독값이며, 실제 연구 문헌의 결론으로 읽혀서는 안 된다. Brief의 규칙-점화 라인들은 시뮬레이션 내부 분석가가 그럴듯한 궤적을 어떻게 추정할지를 모델링한 것이며, 현실 세계에서 실제로 펼쳐질 결과가 아니다.' },
      tr: { title: 'Modellenen sonuç kavramları hakkında.', body: '"Societal Outcomes Brief"de görünen davranışsal sonuç kavramları — "identity-fatigue risk" (kimlik yorgunluğu riski), "care-runs-hot profile" (bakımı aşırı yüklenen profil) ve "algoritmik dağıtım yoluyla güçlendirilen görünüm temelli geri bildirim" gibi ifadeler — bu simülasyona ait kurgusal, spekülatif çerçevelerdir; ampirik sosyal bilim kategorileri değildir. Bunlar, tahsis, özellik ve çevre kaydıraçlarının kombinasyonlarından kurulan, bu projeksiyona anlatısal doku katmak için üretilmiş kurgusal okumalardır; gerçek bir araştırma literatürünün bulguları olarak okunmamalıdır. Brief\'in kurallarla tetiklenen satırları, simülasyon içi bir analistin olası gidişatları nasıl tahmin edebileceğini modeller; dünyada sonuçların gerçekte nasıl açılacağını değil.' }
    } },
  {
    title: 'Lock-in ≠ heritability.',
    body: 'The Identity Lock-In Index measures how widely an allocation\'s effects propagate into descendants — not how heritable a trait is, and not whether the allocation is "less wrong". Every heritable choice removes consent equally. Low-weighted classes (like health) shift with environment; high-weighted classes (identity, affect) lock in across generations.',
    i18n: {
      zh: {
        title: '锁定 ≠ 遗传率。',
        body: '身份锁定指数衡量的是一个分配在后代中影响传播的广度——而不是某个性状的遗传率有多高，也不是该分配是否"罪轻一些"。任何可遗传的选择都同等地剥夺了同意权。低权重的类别（如健康）会随环境而变化；高权重的类别（身份、情感）则会在世代间锁定。'
      },
      ja: {
        title: 'ロックイン ≠ 遺伝率。',
        body: 'アイデンティティ・ロックイン指数が測るのは、ある選択の影響が子孫にどれだけ広く波及するかであって、形質の遺伝率の高さでも、その選択が「まだましかどうか」でもありません。遺伝に関わる選択は、どれも等しく同意を奪います。低重み付けの領域（健康など）は環境とともに揺らぎますが、高重み付けの領域（アイデンティティ、情動）は世代を越えて固定されます。'
      },
      ko: {
        title: '고착 ≠ 유전율.',
        body: '정체성 고착 지수가 측정하는 것은 어떤 선택의 영향이 후손에게 얼마나 널리 전파되는가이지, 형질의 유전율이 얼마나 높은지도, 그 선택이 "덜 잘못된" 것인지도 아닙니다. 유전 가능한 선택은 모두 동등하게 동의를 박탈합니다. 가중치가 낮은 영역(건강 등)은 환경에 따라 달라지지만, 가중치가 높은 영역(정체성, 정동)은 세대에 걸쳐 고착됩니다.'
      },
      tr: {
        title: 'Sabitlenme ≠ kalıtsallık.',
        body: 'Kimlik Sabitlenme Endeksi, bir seçimin etkilerinin torunlara ne kadar geniş biçimde yayıldığını ölçer — bir özelliğin ne kadar kalıtsal olduğunu ya da seçimin "daha az yanlış" olup olmadığını değil. Kalıtsal olan her seçim rızayı eşit ölçüde elinden alır. Düşük ağırlıklı sınıflar (sağlık gibi) çevreyle birlikte değişir; yüksek ağırlıklı sınıflar (kimlik, duygulanım) kuşaklar boyunca yerleşir.'
      }
    }
  }
];

/* ---------- Enhancement Budget (Adult mode centerpiece) ---------- */

const CONFIDENCE = {
  height:            { label: 'high',     unc: '±5 cm' },
  athletic:          { label: 'moderate', unc: '±2 pts' },
  eyeColor:          { label: 'high',     unc: null },
  hairColor:         { label: 'high',     unc: null },
  hairType:          { label: 'moderate', unc: null },
  skinTone:          { label: 'high',     unc: null },
  faceShape:         { label: 'moderate', unc: null },
  freckles:          { label: 'moderate', unc: '±15%' },
  dimples:           { label: 'low',      unc: '±25%' },
  openness:          { label: 'low',      unc: '±2.5 pts' },
  conscientiousness: { label: 'low',      unc: '±2.5 pts' },
  extraversion:      { label: 'low',      unc: '±2.5 pts' },
  agreeableness:     { label: 'low',      unc: '±2.5 pts' },
  neuroticism:       { label: 'low',      unc: '±2.5 pts' }
};

const PRIORITIES = [
  { key: 'health', label: 'Health', cost: 4, tier: 'Standard', bias: { neuroticism: -0.3 }, tradeoff: 'Disease-risk reduction (limited heritability for many conditions).',
    i18n: { zh: { label: '健康', tier: '标准', tradeoff: '降低疾病风险(许多疾病的遗传率有限)。' }, ja: { label: '健康', tier: '標準', tradeoff: '疾患リスクの低減(多くの疾患では遺伝率は限定的)。' }, ko: { label: '건강', tier: '표준', tradeoff: '질병 위험 감소(많은 질환에서 유전율은 제한적).' }, tr: { label: 'Sağlık', tier: 'Standart', tradeoff: 'Hastalık riskinin azaltılması (birçok durumda sınırlı kalıtsallık).' } } },
  { key: 'cognition', label: 'Cognition', cost: 8, tier: 'Premium', bias: { openness: 0.6, conscientiousness: 0.4 }, tradeoff: 'Higher academic-load expectations. Burnout risk elevated.',
    i18n: { zh: { label: '认知', tier: '高级', tradeoff: '更高的学业负担预期。倦怠风险升高。' }, ja: { label: '認知', tier: 'プレミアム', tradeoff: '学業面の負荷期待が高くなる。バーンアウトのリスクは上昇する。' }, ko: { label: '인지', tier: '프리미엄', tradeoff: '더 높은 학업 부담 기대. 번아웃 위험 상승.' }, tr: { label: 'Biliş', tier: 'Premium', tradeoff: 'Yüksek akademik yük beklentisi. Tükenme riski artar.' } } },
  { key: 'emotional', label: 'Emotional Stability', cost: 7, tier: 'Experimental', bias: { neuroticism: -0.7 }, tradeoff: 'Reduced emotional sensitivity may follow.',
    i18n: { zh: { label: '情绪稳定性', tier: '实验性', tradeoff: '情感敏感度可能随之降低。' }, ja: { label: '情緒安定性', tier: '実験的', tradeoff: '情緒的な感受性の低下を伴う可能性がある。' }, ko: { label: '정서적 안정성', tier: '실험적', tradeoff: '정서적 민감성이 낮아질 수 있음.' }, tr: { label: 'Duygusal istikrar', tier: 'Deneysel', tradeoff: 'Duygusal duyarlılığın azalması ortaya çıkabilir.' } } },
  { key: 'creativity', label: 'Creativity', cost: 5, tier: 'Standard', bias: { openness: 0.5 }, tradeoff: 'Increased novelty-seeking; structural follow-through variable.',
    i18n: { zh: { label: '创造力', tier: '标准', tradeoff: '更强的新奇追求;有结构地坚持下去的能力则参差不齐。' }, ja: { label: '創造性', tier: '標準', tradeoff: '新奇性の追求が強まる一方で、体系的にやり遂げる力にはばらつきが出る。' }, ko: { label: '창의성', tier: '표준', tradeoff: '신기성 추구가 강해지며, 끝까지 체계적으로 밀고 나가는 힘은 들쭉날쭉해진다.' }, tr: { label: 'Yaratıcılık', tier: 'Standart', tradeoff: 'Yenilik arayışı artar; yapılandırılmış bir biçimde sonuna kadar götürme değişkendir.' } } },
  { key: 'athleticism', label: 'Athleticism', cost: 4, tier: 'Standard', bias: { athletic: 0.7 }, tradeoff: 'Identity attachment to performance later in life.',
    i18n: { zh: { label: '运动能力', tier: '标准', tradeoff: '在日后的人生里,身份认同可能与"表现"绑得很紧。' }, ja: { label: '運動能力', tier: '標準', tradeoff: '人生の後半で、自己同一性が「成績」と強く結びつきやすくなる。' }, ko: { label: '운동성', tier: '표준', tradeoff: '훗날 정체성이 "퍼포먼스"에 크게 결부될 수 있다.' }, tr: { label: 'Atletiklik', tier: 'Standart', tradeoff: 'İlerleyen yaşlarda kimliğin performansa bağlanma eğilimi artar.' } } },
  { key: 'appearance', label: 'Appearance', cost: 3, tier: 'Entry', bias: {}, tradeoff: 'Appearance-based social attention above baseline.',
    i18n: { zh: { label: '外貌', tier: '入门', tradeoff: '基于外貌而获得的社会关注会高于基线水平。' }, ja: { label: '外見', tier: 'エントリー', tradeoff: '見た目に基づく社会的注目が、基準値より高くなる。' }, ko: { label: '외모', tier: '엔트리', tradeoff: '외모를 근거로 한 사회적 주목이 기준선보다 높아진다.' }, tr: { label: 'Görünüm', tier: 'Giriş', tradeoff: 'Görünüme dayalı sosyal ilgi, temel düzeyin üzerinde olur.' } } },
  { key: 'sociability', label: 'Sociability', cost: 5, tier: 'Standard', bias: { extraversion: 0.6 }, tradeoff: 'Elevated overstimulation risk in dense social contexts.',
    i18n: { zh: { label: '社交性', tier: '标准', tradeoff: '在人群密集的社交场合,过度刺激的风险升高。' }, ja: { label: '社交性', tier: '標準', tradeoff: '人の多い社交場面で、過剰刺激のリスクが高まる。' }, ko: { label: '사교성', tier: '표준', tradeoff: '인파가 많은 사교 환경에서 과자극 위험이 높아진다.' }, tr: { label: 'Sosyallik', tier: 'Standart', tradeoff: 'Yoğun sosyal ortamlarda aşırı uyarılma riski artar.' } } },
  { key: 'resilience', label: 'Resilience', cost: 6, tier: 'Premium', bias: { neuroticism: -0.5, conscientiousness: 0.2 }, tradeoff: 'Tolerance for adversity may delay help-seeking.',
    i18n: { zh: { label: '韧性', tier: '高级', tradeoff: '对逆境的耐受度过高,可能让人迟迟不去寻求帮助。' }, ja: { label: 'レジリエンス', tier: 'プレミアム', tradeoff: '逆境への耐性が高すぎると、援助を求めるのが遅れがちになる。' }, ko: { label: '회복탄력성', tier: '프리미엄', tradeoff: '역경에 대한 인내가 높을수록 도움을 청하는 시점이 늦어질 수 있다.' }, tr: { label: 'Dayanıklılık', tier: 'Premium', tradeoff: 'Olumsuzluklara yüksek tolerans, yardım istemeyi geciktirebilir.' } } },
  { key: 'empathy', label: 'Empathy', cost: 5, tier: 'Standard', bias: { agreeableness: 0.6 }, tradeoff: 'Empathic load may exceed individual capacity.',
    i18n: { zh: { label: '共情', tier: '标准', tradeoff: '共情负担可能超出个人承受能力。' }, ja: { label: '共感', tier: '標準', tradeoff: '共感の負荷が個人の許容量を超える可能性がある。' }, ko: { label: '공감', tier: '표준', tradeoff: '공감 부하가 개인의 수용 한계를 넘어설 수 있다.' }, tr: { label: 'Empati', tier: 'Standart', tradeoff: 'Empati yükü, bireyin kapasitesini aşabilir.' } } }
];
const BUDGET_TOTAL = 200;

// USD spend thresholds (cumulative speculative credit pricing) that gate
// access-friction tiers in `updateBudgetProjections` and the user-visible
// Regional Access copy in `renderRegionalAccess`. The four breakpoints
// (50k / 100k / 150k / 200k) and the RA-channel divisor below are sourced
// from this single constant — keeping them aligned matters for the
// access-friction narrative. Copy strings in renderRegionalAccess remain
// EN-only literals (no i18n table), so no template-replaced numbers in
// localized prose are at risk.
const BUDGET_TIER_THRESHOLDS = {
  licensedClinic:   50000,  // 9–14mo waitlist · self-pay
  referenceCentre: 100000,  // 6mo review · RA-3
  restricted:      150000,  // 14–22mo waitlist · pre-authorization
  outsideTreaty:   200000   // authorization pending / withheld
};
// RA-channel codes (RA-1…RA-5) ladder up at each threshold; divisor equals
// the first threshold so `Math.floor(usd / RA_CHANNEL_DIVISOR) + 1` produces
// the right rung at each breakpoint.
const RA_CHANNEL_DIVISOR = BUDGET_TIER_THRESHOLDS.licensedClinic;

// Regulatory Context rules — each fires when its predicate matches the
// current budget state. Surfaced in Adult mode as small clinical notes
// inside the Enhancement Allocation panel. Phrased in the register of
// a near-future regulatory disclosure UI.
const REGULATORY_NOTE_RULES = [
  {
    id: 'first-allocation',
    when: (b, total) => total > 0,
    severity: 'amber',
    text: 'Per Oviedo Convention Art. 13: heritable allocation creates a non-reversible advantage in the descendant line; unallocated cohorts retain no equivalent remedy.',
    i18n: {
      zh: '依《奥维耶多公约》第 13 条:可遗传分配在后代谱系中产生不可逆的优势;未获得分配的群体没有对等的救济措施。',
      ja: 'オビエド条約 第13条より:遺伝に関わる割り当ては子孫の系統に不可逆的な優位を生む。割り当てを受けない集団には、これに見合う是正手段は存在しない。',
      ko: '오비에도 협약 제13조에 따라: 유전 가능한 할당은 자손 계통에 되돌릴 수 없는 이점을 만든다. 할당받지 못한 집단에는 이에 상응하는 구제책이 없다.',
      tr: 'Oviedo Sözleşmesi Madde 13: kalıtsal tahsis, soy hattında geri döndürülemez bir avantaj yaratır; tahsis almamış kohortların eşdeğer bir telafisi yoktur.'
    }
  },
  {
    id: 'GE-3-cognition',
    when: b => (b.cognition || 0) >= 5,
    severity: 'amber',
    text: 'HFEA 2008 Schedule 2: cognitive enhancement outside standard licensed purposes. Annual reporting to the licensing authority would be a condition of any special-direction grant.',
    i18n: {
      zh: 'HFEA 2008 附表 2:认知增强超出标准许可用途。任何特别指示授权,都会以每年向许可机构报告为前提条件。',
      ja: 'HFEA 2008 附則2:認知強化は標準的な許可目的の範囲を超える。例外的な指示認可を得る場合、許可機関への年次報告が条件となる。',
      ko: 'HFEA 2008 부칙 2: 인지 강화는 표준 허가 목적의 범위를 벗어난다. 특별 지침 승인을 받는다면 허가 기관에 대한 연 1회 보고가 조건이 될 것이다.',
      tr: 'HFEA 2008 Cetvel 2: bilişsel güçlendirme, standart lisanslı amaçların dışındadır. Herhangi bir özel yönlendirme izninde, lisanslama otoritesine yıllık raporlama koşul olur.'
    }
  },
  {
    id: 'GE-3-cognition-high',
    when: b => (b.cognition || 0) >= 9,
    severity: 'red',
    text: 'HFEA 1990/2008 s.3(2) prohibits placing a non-permitted embryo in a woman; allocation at this band falls outside any Schedule 2 licensed activity. Enrolment in a long-term outcome registry would be a condition of any exceptional authorization.',
    i18n: {
      zh: 'HFEA 1990/2008 第 3(2) 条禁止将非许可胚胎植入女性体内;此区段的分配不在附表 2 任何许可活动范围内。任何例外授权都将以加入长期结果登记册为条件。',
      ja: 'HFEA 1990/2008 第3条(2)は、許可されていない胚を女性に移植することを禁止しており、この帯域の割り当ては附則2のどの許可活動にも該当しない。例外的な認可がなされる場合、長期アウトカム登録への登録が条件となる。',
      ko: 'HFEA 1990/2008 제3조(2)는 비허가 배아의 여성 체내 이식을 금지하며, 이 구간의 할당은 부칙 2의 어떤 허가 활동에도 해당하지 않는다. 예외적 승인을 받는다면 장기 결과 등록부 등재가 조건이 될 것이다.',
      tr: 'HFEA 1990/2008 m.3(2), izin verilmeyen bir embriyonun bir kadına yerleştirilmesini yasaklar; bu bantta tahsis, Cetvel 2 lisanslı hiçbir faaliyete girmez. İstisnai bir yetkilendirmenin koşulu, uzun vadeli sonuç sicil kaydına dahil olmaktır.'
    }
  },
  {
    id: 'EM-stability',
    when: b => (b.emotional || 0) >= 6,
    severity: 'amber',
    text: 'HFEA 2008 Schedule 2 para. 3 (treatment licences): affective-band intervention outside standard licensed purposes. Periodic reporting to the licensing authority would be a condition of any special-direction grant.',
    i18n: {
      zh: 'HFEA 2008 附表 2 第 3 段(治疗许可):情感区段干预超出标准许可用途。任何特别指示授权都将以向许可机构定期报告为条件。',
      ja: 'HFEA 2008 附則2 第3項(治療ライセンス):情動領域への介入は標準的な許可目的の範囲外である。例外的な指示認可を得る場合、許可機関への定期報告が条件となる。',
      ko: 'HFEA 2008 부칙 2 제3항(치료 면허): 정동 영역 개입은 표준 허가 목적의 범위를 벗어난다. 특별 지침 승인을 받는다면 허가 기관에 대한 정기 보고가 조건이 될 것이다.',
      tr: 'HFEA 2008 Cetvel 2 paragraf 3 (tedavi lisansları): duygulanım bandında müdahale, standart lisanslı amaçların dışındadır. Herhangi bir özel yönlendirme izninin koşulu, lisanslama otoritesine düzenli raporlama olur.'
    }
  },
  {
    id: 'RES-resilience-elevated',
    when: b => (b.resilience || 0) >= 7,
    severity: 'amber',
    text: 'Resilience profile above population norm. Insurer notification required at enrolment; some carriers exclude this profile from depression-care coverage.',
    i18n: {
      zh: '韧性档案高于人群常态。入组时须向保险公司通报;部分保险公司将此类档案排除在抑郁相关保障之外。',
      ja: 'レジリエンス・プロファイルは集団平均を上回る。登録時に保険会社への通知が必要であり、一部の保険会社はこのプロファイルをうつ病ケア保障の対象外とする。',
      ko: '회복탄력성 프로필이 인구 평균을 상회한다. 등록 시 보험사에 통보해야 하며, 일부 보험사는 이 프로필을 우울증 치료 보장에서 제외한다.',
      tr: 'Dayanıklılık profili, nüfus normunun üzerindedir. Kayıt sırasında sigortacıya bildirim zorunludur; bazı şirketler bu profili depresyon bakım kapsamı dışında tutar.'
    }
  },
  {
    id: 'APP-appearance',
    when: b => (b.appearance || 0) >= 6,
    severity: 'amber',
    text: 'Appearance-package allocation in upper quartile. Cosmetic-modification disclosure required on identity documents in 7 jurisdictions.',
    i18n: {
      zh: '外观相关分配位于最上四分位。在 7 个司法辖区内,身份证件须披露美容性修改。',
      ja: '外見パッケージへの割り当ては上位四分位に位置する。7つの法域において、身分証明書類における美容的改変の開示が必要となる。',
      ko: '외형 패키지 할당이 상위 사분위에 속한다. 7개 관할 구역에서 신분증명서에 미용적 변경 사실의 공시가 요구된다.',
      tr: 'Görünüm paketi tahsisi üst çeyrektedir. Yedi yargı çevresinde kimlik belgelerinde kozmetik değişiklik beyanı zorunludur.'
    }
  },
  {
    id: 'ATH-athleticism',
    when: b => (b.athleticism || 0) >= 7,
    severity: 'amber',
    text: 'Athletic-enhancement profile would be ineligible for sanctioned youth competition in the IOC Aligned Federation framework.',
    i18n: {
      zh: '在 IOC 协同联合会框架下,运动增强档案不具备参加官方青少年比赛的资格。',
      ja: 'IOCアラインド・フェデレーション枠組みのもとでは、運動増強プロファイルは公認ユース競技の出場資格を持たない。',
      ko: 'IOC 정렬 연맹 체계에서, 운동 강화 프로필은 공인 청소년 경기 출전 자격을 갖지 못한다.',
      tr: 'IOC Hizalanmış Federasyon çerçevesinde atletik güçlendirme profili, resmi gençlik müsabakalarına uygun değildir.'
    }
  },
  {
    id: 'multi-category',
    when: b => Object.values(b).filter(v => v >= 4).length >= 3,
    severity: 'red',
    text: 'Multi-category package spanning three or more domains. Subject auto-enrolled in long-term outcome follow-up as a condition of HFEA-equivalent licensing. Opt-out window: 30 days from authorization.',
    i18n: {
      zh: '跨越三个或更多领域的多类别套餐。作为 HFEA 等效许可的条件,受试者会被自动纳入长期结果追踪。退出窗口:授权之日起 30 天内。',
      ja: '三領域以上にまたがる複合パッケージ。HFEA相当の許可の条件として、対象者は長期アウトカム追跡へ自動登録される。オプトアウト期間:認可から30日以内。',
      ko: '세 가지 이상 영역에 걸친 복합 패키지. HFEA 동등 면허의 조건으로 대상자는 장기 결과 추적에 자동 등록된다. 옵트아웃 가능 기간: 승인일로부터 30일.',
      tr: 'Üç veya daha fazla alanı kapsayan çok kategorili paket. HFEA eşdeğeri lisansın koşulu olarak özne, uzun vadeli sonuç takibine otomatik dahil edilir. Vazgeçme süresi: yetkilendirmeden itibaren 30 gün.'
    }
  },
  {
    id: 'total-spend-high',
    when: (b, total) => total >= BUDGET_TOTAL * 0.7,
    severity: 'red',
    text: 'Aggregate allocation ≥ 70% of platform budget. Cosmetic-modification disclosure required on identity documents in all Oviedo signatory jurisdictions (Art. 13, transposed instruments).',
    i18n: {
      zh: '总分配额 ≥ 平台预算的 70%。在所有《奥维耶多公约》签署国(第 13 条及其转化文书)司法辖区内,身份证件均须披露美容性修改。',
      ja: '総割り当ては、プラットフォーム予算の70%以上。オビエド条約の署名国すべての法域(第13条、およびその国内法化文書)において、身分証明書類への美容的改変の開示が必要となる。',
      ko: '총 할당이 플랫폼 예산의 70% 이상이다. 모든 오비에도 협약 서명 관할 구역(제13조 및 국내법 전환 문서)에서 신분증명서에 미용적 변경 사실의 공시가 요구된다.',
      tr: "Toplam tahsis, platform bütçesinin %70'i veya üzeridir. Tüm Oviedo Sözleşmesi taraf devletlerinin yargı çevrelerinde (Madde 13 ve uyumlaştırılmış araçlar) kimlik belgelerinde kozmetik değişiklik beyanı zorunludur."
    }
  },
  {
    id: 'empathy-low',
    when: b => (b.empathy || 0) >= 6 && (b.cognition || 0) >= 6,
    severity: 'amber',
    text: 'High empathy + high cognition allocation: documented elevated burnout risk in adolescent and early-adult cohorts. Carer mental-health monitoring advised.',
    i18n: {
      zh: '高共情 + 高认知分配:在青少年和成年早期群组中已有研究记录的高倦怠风险。建议对照护者进行心理健康监测。',
      ja: '高共感 × 高認知の割り当て:思春期および成人初期コホートにおいて、文献上、バーンアウト・リスクの上昇が記録されている。ケア提供者のメンタルヘルス・モニタリングを推奨。',
      ko: '높은 공감 + 높은 인지 할당: 청소년 및 성인 초기 코호트에서 번아웃 위험이 상승한다는 보고가 있다. 양육자 정신건강 모니터링을 권고함.',
      tr: 'Yüksek empati + yüksek bilişsel tahsis: ergen ve erken yetişkinlik kohortlarında belgelenmiş yüksek tükenme riski. Bakım verenin ruh sağlığı izlemi önerilir.'
    }
  }
];

/* ---------- Consent framing (Adult mode, near Enhancement Allocation) ---------- */

// Lead paragraph (Education + World Design): the canonical "why this is a consent
// question" copy, front-loaded with the future person rather than the institution.
const CONSENT_EXPLAINER = {
  en: 'The person these allocations are for does not yet exist. Heritable modifications are decided before they are born — so they cannot consent, and they cannot opt out later. Parents make many decisions for children; heritable edits differ in one respect: they are written into the biology and passed forward. Medical-ethics frameworks and the Council of Europe Oviedo Convention (Article 13) treat heritable choices as a distinct consent class from somatic or environmental ones.',
  zh: '这些分配所指向的那个人,此刻尚未存在。可遗传的修改是在他/她出生之前就被决定的——因此他/她无法表达同意,也无法在事后退出。父母会替孩子作出许多决定;可遗传编辑有一点不同:它们被写入生物层面,并继续向下传递。医学伦理框架和欧洲委员会《奥维耶多公约》(第 13 条)将可遗传的选择视为与体细胞或环境层面的选择不同的一个独立同意类别。',
  ja: 'この割り当ての対象となる人物は、まだ存在しない。遺伝に関わる改変は、その人が生まれる前に決められる——したがって本人は同意することもできず、後から降りることもできない。親は子どものために多くの決定を下すが、遺伝に関わる編集には一点ちがいがある。それは生物のレベルに書き込まれ、世代を超えて受け渡されるという点だ。医学倫理の枠組みや欧州評議会のオビエド条約(第13条)は、遺伝に関わる選択を、体細胞や環境に関わる選択とは別個の同意カテゴリとして扱っている。',
  ko: '이 할당이 향하는 그 사람은 아직 존재하지 않는다. 유전 가능한 변경은 그가 태어나기 전에 결정된다 — 따라서 그는 동의할 수도, 나중에 빠져나올 수도 없다. 부모는 아이를 위해 많은 결정을 내리지만, 유전 가능한 편집은 한 가지 점에서 다르다. 그것은 생물학적 층위에 새겨져 다음 세대로 전해진다. 의료윤리 프레임워크와 유럽평의회 오비에도 협약(제13조)은 유전 가능한 선택을 체세포적·환경적 선택과는 다른, 별개의 동의 범주로 다룬다.',
  tr: 'Bu tahsislerin yönelik olduğu kişi henüz mevcut değil. Kalıtsal değişiklikler, o doğmadan önce kararlaştırılır — bu yüzden onaylayamaz, sonradan da çekilemez. Ebeveynler çocukları adına pek çok karar verir; kalıtsal düzenlemelerin bir farkı vardır: biyolojik düzeye yazılır ve sonraki kuşaklara aktarılır. Tıbbi etik çerçeveleri ve Avrupa Konseyi Oviedo Sözleşmesi (European Convention on Human Rights and Biomedicine; Madde 13), kalıtsal seçimleri somatik ya da çevresel seçimlerden ayrı, başlı başına bir onay kategorisi olarak ele alır.'
};

// Structured rows (World Design + Narrative): grounded prose, fixed cite, Access row.
const CONSENT_IMPLICATIONS = [
  { label: 'Subject', body: 'The modified individual is, by definition, absent from this interface. Every allocation is a decision made on behalf of someone who does not yet exist and cannot be consulted.',
    i18n: {
      zh: { label: '主体', body: '从定义上讲,被修改的那个人并不在这个界面上。每一次分配,都是在替一个尚未存在、也无法被征询意见的人做决定。' },
      ja: { label: '対象', body: '改変される個人は、定義上、このインターフェイスに存在しない。すべての割り当ては、まだ存在せず、相談もできない誰かに代わってなされる決定である。' },
      ko: { label: '대상', body: '편집되는 그 사람은 정의상 이 인터페이스에 존재하지 않는다. 모든 할당은 아직 존재하지 않고, 의견을 구할 수도 없는 사람을 대신해 내리는 결정이다.' },
      tr: { label: 'Özne', body: 'Değiştirilen birey, tanım gereği bu arayüzde yoktur. Her tahsis, henüz var olmayan ve görüşü alınamayan biri adına verilen bir karardır.' }
    } },
  { label: 'Heritability', body: 'Anyone born from a heritable edit inherits the choice. Their children inherit it too, and so on. The decision made in this session reaches forward into people who are not here to weigh in.',
    i18n: {
      zh: { label: '可遗传性', body: '由可遗传编辑而诞生的人,都会一并继承这个选择。他们的孩子,以及之后的世代,也会继续承接下来。这次会话中作出的决定,会延伸到那些此刻无法发声的人身上。' },
      ja: { label: '遺伝性', body: '遺伝に関わる編集から生まれる人は、その選択を引き継ぐ。さらにその子もまた引き継ぎ、その先へと続く。このセッションで下した決定は、いまここで意見を述べられない人たちにまで及んでいく。' },
      ko: { label: '유전성', body: '유전 가능한 편집으로 태어난 사람은 그 선택을 함께 물려받는다. 그 자녀들도 마찬가지이며, 그 다음 세대도 그러하다. 이 세션에서 내린 결정은, 이 자리에 없는 사람들에게까지 닿는다.' },
      tr: { label: 'Kalıtsallık', body: 'Kalıtsal bir düzenlemeyle doğan herkes bu seçimi devralır. Çocukları da öyle, sonraki kuşaklar da. Bu oturumda alınan karar, burada görüş bildiremeyen insanlara uzanır.' }
    } },
  { label: 'Reversibility', body: 'Heritable edits cannot be taken back. A future person who would not have agreed has no way to undo or escape what was chosen for them.',
    i18n: {
      zh: { label: '可逆性', body: '可遗传的编辑无法收回。一个不会同意此选择的未来之人,没有任何办法可以撤回或脱离别人替他/她做出的决定。' },
      ja: { label: '可逆性', body: '遺伝に関わる編集は、撤回することができない。同意しなかったであろう未来の人は、自分のために決められたものを取り消すことも、そこから逃れることもできない。' },
      ko: { label: '되돌릴 수 있음(가역성)', body: '유전 가능한 편집은 되돌릴 수 없다. 동의하지 않았을 미래의 어떤 사람도, 자기를 대신해 정해진 것을 무를 수도, 거기서 벗어날 수도 없다.' },
      tr: { label: 'Geri alınabilirlik', body: 'Kalıtsal düzenlemeler geri alınamaz. Onaylamayacak gelecekteki bir insan, kendisi için seçileni geri çevirme ya da kaçınma yolunda hiçbir araca sahip değildir.' }
    } },
  { label: 'Standard of care', body: 'Institutional ethics frameworks (Oviedo Convention, Article 13 on heritable modifications; UNESCO International Bioethics Committee 2015 Report on the Human Genome) require informed consent of the affected party. That standard is structurally unmet here.',
    i18n: {
      zh: { label: '医疗与伦理标准', body: '机构性的伦理框架(《奥维耶多公约》第 13 条关于可遗传修改;教科文组织国际生物伦理委员会 2015 年关于人类基因组的报告)要求当事人的知情同意。这一标准在此种情形下,从结构上就无从满足。' },
      ja: { label: '医療・倫理基準', body: '機構による倫理枠組み(オビエド条約 第13条「遺伝に関わる改変」、UNESCO 国際バイオエシックス委員会 2015 年「ヒトゲノムに関する報告」)は、当事者本人の十分な情報に基づく同意を求めている。その基準は、ここでは構造的に満たされない。' },
      ko: { label: '의료·윤리적 기준', body: '제도적 윤리 프레임워크(오비에도 협약 제13조 유전 가능한 변경 조항, 유네스코 국제생명윤리위원회 2015년 인간 유전체 보고서)는 당사자의 충분한 정보에 기반한 동의를 요구한다. 이 기준은 여기서 구조적으로 충족될 수 없다.' },
      tr: { label: 'Bakım standardı', body: 'Kurumsal etik çerçeveler (Oviedo Sözleşmesi, kalıtsal değişikliklere ilişkin Madde 13; UNESCO Uluslararası Biyoetik Komitesi\'nin 2015 İnsan Genomu Raporu) etkilenen tarafın bilgilendirilmiş onayını gerektirir. Bu standart burada yapısal olarak karşılanmamaktadır.' }
    } },
  { label: 'Access', body: 'These modifications arrive unevenly. Wealth predicts access; future populations inherit that distributional imbalance alongside the edits themselves.',
    i18n: {
      zh: { label: '可及性', body: '这些修改的到达并不平均。财富决定能否接触到它们;未来的人群,在继承这些编辑的同时,也会一并继承这种分布上的不平等。' },
      ja: { label: 'アクセス', body: 'こうした改変が届く範囲は均一ではない。経済力がアクセスを左右し、未来の人々は編集そのものと同時に、その配分の歪みも受け継ぐことになる。' },
      ko: { label: '접근성', body: '이런 변경은 모든 사람에게 고르게 도달하지 않는다. 부(富)가 접근 가능 여부를 좌우하며, 미래 세대는 편집 자체와 함께 그 분배의 불균형도 물려받게 된다.' },
      tr: { label: 'Erişim', body: 'Bu değişiklikler eşit dağılmaz. Erişimi servet belirler; gelecek nesiller, düzenlemelerle birlikte bu dağılım dengesizliğini de devralır.' }
    } }
];

/* ---------- History of Human Enhancement (educational cards) ---------- */

const HISTORY_CARDS = [
  { title: 'Eugenics, briefly.', body: 'Early-20th-century movements claimed scientific authority over which humans were "fit." It justified forced sterilizations and worse. The science was wrong. The harm was real.',
    i18n: {
      zh: { title: '优生学简史。', body: '20 世纪初的某些运动以"科学权威"自居,试图判定哪些人"合格"。这一思路被用来为强制绝育和更严重的伤害提供正当性。它依据的科学是错的;它造成的伤害是真实的。' },
      ja: { title: '優生学、ごく簡単に。', body: '20世紀初頭、いくつかの運動は、どの人間が「適格」であるかを「科学的権威」を盾に決めようとした。その論理は強制不妊手術や、それ以上の暴力を正当化する根拠とされた。よりどころとなった科学は誤っていたが、引き起こされた被害は現実のものだった。' },
      ko: { title: '우생학, 간단히.', body: '20세기 초의 일부 운동은 어떤 사람이 "적격한가"를 두고 "과학적 권위"를 자처하며 판단하려 했다. 이 논리는 강제 불임 시술과 그 이상의 폭력을 정당화하는 데 동원되었다. 그 과학은 틀렸지만, 피해는 실재했다.' },
      tr: { title: 'Kısaca öjeni.', body: '20. yüzyılın başındaki bazı hareketler, hangi insanların "uygun" olduğuna karar verme yetkisini bilimsel otorite olarak kendinde gördü. Bu yaklaşım zorla kısırlaştırmaları ve daha ağırını meşrulaştırmak için kullanıldı. Dayanılan bilim yanlıştı; yaşanan zarar gerçek.' }
    } },
  { title: 'Cosmetic surgery culture.', body: 'Modern cosmetic surgery normalizes the idea that bodies can be edited to match shifting beauty standards. The standards change every decade or two; the bodies that chased them often don\'t change back.',
    i18n: {
      zh: { title: '整容文化。', body: '现代整容外科把这样一种观念变得"正常":身体可以被修改,以匹配不断变化的审美标准。审美标准每十几二十年就会改变一次;那些为之奔走的身体,却往往无法改回去。' },
      ja: { title: '美容整形の文化。', body: '現代の美容整形は、「移ろう美の基準に合わせて身体は編集できる」という考え方を当然のものにしてきた。基準は10年・20年ごとに変わるが、その基準を追って変えられた身体は、しばしば元には戻らない。' },
      ko: { title: '성형 문화.', body: '현대의 성형 의학은 "변화하는 미의 기준에 맞춰 몸은 편집될 수 있다"는 생각을 보통의 것으로 만들었다. 기준은 10년, 20년마다 바뀌지만, 그 기준을 좇아 바뀐 몸들은 흔히 되돌아가지 않는다.' },
      tr: { title: 'Estetik cerrahi kültürü.', body: 'Modern estetik cerrahi, "vücutların değişen güzellik standartlarına göre düzenlenebileceği" fikrini olağanlaştırdı. Standartlar her on-yirmi yılda bir değişir; o standartlara koşan bedenler ise çoğu zaman geri dönmez.' }
    } },
  { title: 'Gene editing today.', body: 'CRISPR can edit DNA in a Petri dish or a person. Where the line falls — diseases? height? mood? — is something we\'re answering as a species, mostly without asking it out loud.',
    i18n: {
      zh: { title: '当下的基因编辑。', body: 'CRISPR 既可以在培养皿里、也可以在人身上编辑 DNA。"边界在哪里"——疾病?身高?情绪?——是我们作为一个物种,正在(大多是悄无声息地)回答的问题。' },
      ja: { title: '今日の遺伝子編集。', body: 'CRISPR は、シャーレの中でも、人の体内でも DNA を編集できる。「線をどこに引くか」——病気? 身長? 気分?——を私たちは一つの種として、たいていは大声に出さないまま答えつつある。' },
      ko: { title: '오늘날의 유전자 편집.', body: 'CRISPR는 페트리 접시에서도, 사람의 몸 안에서도 DNA를 편집할 수 있다. "어디에 선을 그을 것인가" — 질병? 키? 감정? — 이 물음에 우리는 한 종(種)으로서, 대개는 소리 내어 묻지 않은 채로 답해 가고 있다.' },
      tr: { title: 'Bugünün gen düzenlemesi.', body: 'CRISPR, hem petri kabında hem de insanda DNA\'yı düzenleyebilir. Çizginin nereye düştüğü — hastalıklar mı? boy mu? ruh hali mi? — bir tür olarak, çoğu zaman bunu yüksek sesle sormadan cevapladığımız bir soru.' }
    } },
  { title: 'Inheritance compounds.', body: 'Enhancements available only to wealthy families become inherited advantages. The next generation inherits both the edit and the access to make further edits — so inequality compounds through who can choose, generation after generation, not through anything biology requires.',
    i18n: {
      zh: { title: '不平等会世代累积。', body: '只有富裕家庭才能负担的"增强",会逐渐变成可被继承的优势。下一代不仅继承了那些编辑,还继承了进行更多编辑的可及性——所以不平等是通过"谁能选择"在世代间不断累积的,而不是因为生物学要求如此。' },
      ja: { title: '不平等は世代を超えて積み重なる。', body: '富裕な家庭にだけ手の届く「強化」は、いずれ受け継がれる優位に変わる。次の世代は、その編集と、さらに編集を行えるアクセスの両方を引き継ぐ——だから不平等は、「誰が選べるか」を通して、世代ごとに上積みされていく。それは生物学が要求するからではない。' },
      ko: { title: '불평등은 세대를 거치며 누적된다.', body: '부유한 가정만 누릴 수 있는 "강화"는 점차 대물림되는 이점이 된다. 다음 세대는 그 편집과 함께 또 다른 편집을 가능케 하는 접근권을 모두 물려받는다 — 그래서 불평등은 "누가 선택할 수 있는가"를 통해 세대마다 누적된다. 생물학이 그것을 요구하기 때문이 아니다.' },
      tr: { title: 'Eşitsizlik kuşaklarla katlanır.', body: 'Yalnızca varlıklı ailelerin ulaşabildiği "iyileştirmeler", zamanla miras kalan avantajlara dönüşür. Sonraki kuşak hem düzenlemeyi hem de daha fazla düzenleme yapma imkânını birlikte devralır — yani eşitsizlik, "kim seçebiliyor" sorusu üzerinden, kuşaktan kuşağa katlanır. Bunu biyoloji dayatmıyor.' }
    } },
  { title: 'Who measures "improvement"?', body: 'Traits cast as flaws in one era (sensitivity, atypical minds, certain bodies) are cast as strengths in another. The measurer changes; the trait doesn\'t.',
    i18n: {
      zh: { title: '谁来定义"更好"?', body: '在某个时代被视为缺陷的特征(敏感、不典型的心智、某些身体),在另一个时代却被视为优势。改变的是衡量者,而不是特征本身。' },
      ja: { title: '「改善」は誰が測るのか。', body: 'ある時代には欠点とみなされた特性(感受性の強さ、典型外の認知、ある種の身体)が、別の時代には強みとされる。変わるのは測る側であって、特性そのものではない。' },
      ko: { title: '"개선"은 누가 측정하는가?', body: '어느 시대에는 결점으로 분류되던 특성(예민함, 비전형적 인지, 어떤 종류의 몸)이 다른 시대에는 강점으로 여겨진다. 변하는 것은 측정하는 쪽이지, 특성 자체가 아니다.' },
      tr: { title: '"Gelişimi" kim ölçüyor?', body: 'Bir çağda kusur sayılan özellikler (duyarlılık, sıradışı zihinler, belli bedenler) başka bir çağda güç olarak görülür. Değişen ölçendir, özelliğin kendisi değil.' }
    } },
  { title: 'Genes ≠ destiny.', body: 'Twin studies put Big Five personality traits at roughly 40–50% heritable (Polderman et al., 2015, meta-analyzed ~17,800 phenotypes across twin studies). Most of the rest tracks non-shared environment — the unique experiences, peer groups, and accidents that even identical twins don\'t share. Shared family environment explains less of adult personality than people expect.',
    i18n: {
      zh: { title: '基因 ≠ 命运。', body: '双生子研究估计五大人格特质的遗传率大约为 40–50%(Polderman 等,2015,荟萃分析约 17,800 个表型(基于双生子研究))。其余大部分变异来自非共享环境——独特的经历、同伴圈,以及连同卵双胞胎都不曾共享的种种偶然。共享家庭环境对成年人格的解释力,比一般人想象的要小。' },
      ja: { title: '遺伝子 ≠ 運命。', body: '双生児研究は、ビッグファイブ性格特性の遺伝率をおよそ40〜50%と推定している(Polderman ら 2015、双生児研究に基づく約17,800 表現型のメタ解析)。残りの大部分は非共有環境に由来する——一卵性双生児でさえ共有しない、独自の経験、仲間集団、偶然などである。家庭で共有される環境が成人期の性格に与える影響は、世間が想像するよりも小さい。' },
      ko: { title: '유전자 ≠ 운명.', body: '쌍둥이 연구는 빅 파이브 성격 특성의 유전율을 약 40~50%로 추정한다(Polderman 외, 2015 — 약 17,800개 표현형에 대한 쌍둥이 연구 메타분석). 나머지 대부분은 비공유 환경에서 기인한다 — 같은 부모 밑에서 자란 일란성 쌍둥이조차 공유하지 않는 고유한 경험과 또래, 그리고 우연들이다. 공유된 가정 환경이 성인기 성격을 설명하는 비중은 사람들이 짐작하는 것보다 작다.' },
      tr: { title: 'Genler ≠ kader.', body: 'İkiz çalışmaları, Beş Büyük kişilik özelliklerinin kalıtsallığını yaklaşık %40-50 olarak hesaplar (Polderman vd., 2015 — ikiz çalışmalarında yaklaşık 17.800 fenotipe ilişkin meta-analiz). Kalanın çoğu paylaşılmayan çevreden gelir — tek yumurta ikizlerinin bile paylaşmadığı kişisel deneyimler, akran grupları ve rastlantılar. Paylaşılan aile çevresi, yetişkin kişiliğini insanların sandığından daha az açıklar.' }
    } },
  { title: 'Heritability is not "fixed in you".', body: 'A heritability of 50% means about half the variation between people in a population traces to genetic differences. It does not mean half of any one person\'s trait is genetic, and it does not mean the trait is unchangeable. Heritability estimates also shift with context: height is ~80% heritable when everyone is well-fed, much less in populations where childhood nutrition varies. This simulator applies a simplified additive-polygenic model — real personality genetics involve gene-by-environment interactions this can\'t show.',
    i18n: {
      zh: { title: '遗传率不等于"已经定死"。', body: '50% 的遗传率,意味着在一个人群中,人与人之间差异的约一半可追溯到遗传差异。这不等于说"任何一个人身上有一半的特征是基因决定的",也不等于说"特征不可改变"。遗传率估计也会随环境而变:在所有人都营养充足的人群中,身高的遗传率约为 80%,而在儿童营养差异较大的人群中要低得多。本模拟器使用的是一种简化的加性多基因模型——现实中性格的遗传涉及基因—环境的相互作用,这是它无法呈现的。' },
      ja: { title: '遺伝率は「あなたの中で固定されたもの」ではない。', body: '遺伝率50%とは、ある集団における人と人との差異のおよそ半分が遺伝的差異に由来する、という意味である。「ある一人の中で形質の半分が遺伝で決まっている」という意味ではないし、「形質は変えられない」という意味でもない。遺伝率の推定値は文脈によっても変わる——皆が十分に食べられる集団では身長の遺伝率は約80%だが、幼少期の栄養状況にばらつきがある集団ではずっと低くなる。本シミュレーターは簡略化された加法的多遺伝子モデルを用いている——実際の性格遺伝学には、ここでは表現できない遺伝子×環境の相互作用が含まれる。' },
      ko: { title: '유전율은 "당신 안에 고정된 것"이 아니다.', body: '유전율 50%란 한 인구 집단에서 사람과 사람 사이의 차이 가운데 약 절반이 유전적 차이에서 비롯된다는 뜻이다. 그것은 "어느 한 사람의 특성 절반이 유전으로 정해졌다"는 의미도, "그 특성이 변하지 않는다"는 의미도 아니다. 유전율 추정값은 맥락에 따라서도 달라진다 — 모두가 잘 먹는 집단에서 키의 유전율은 약 80%이지만, 어린 시절 영양 상태가 다양한 집단에서는 훨씬 낮다. 본 시뮬레이터는 단순화된 가산적 다유전자 모형을 사용한다 — 실제 성격 유전학에는 여기서 보여줄 수 없는 유전자–환경 상호작용이 포함된다.' },
      tr: { title: 'Kalıtsallık "sende sabitlenmiş bir şey" değildir.', body: '%50 kalıtsallık, bir nüfusta insanlar arasındaki farkın yaklaşık yarısının genetik farklardan kaynaklandığı anlamına gelir. Bu, "bir kişinin özelliğinin yarısı genetik olarak belirlenmiştir" demek değildir; "özellik değişmez" demek de değildir. Kalıtsallık tahminleri bağlama göre de değişir: herkesin iyi beslendiği bir nüfusta boyun kalıtsallığı yaklaşık %80\'dir, çocukluk beslenmesinin değişken olduğu nüfuslarda ise çok daha düşüktür. Bu simülatör, basitleştirilmiş bir toplamsal poligenik model kullanır — gerçek kişilik genetiği, burada gösterilemeyen gen-çevre etkileşimlerini içerir.' }
    } },
  { title: 'Heritable vs. somatic edits.', body: 'A somatic edit changes one body. A heritable (germline) edit changes an egg or embryo — so it carries into every cell of the resulting person, and into their children. The Oviedo Convention (a 1997 Council of Europe biomedicine treaty, ratified by 29 states) restricts genome edits to preventive, diagnostic, or therapeutic purposes (Article 13); that purpose-test is where the legal line falls in much of Europe.',
    i18n: {
      zh: { title: '可遗传 vs. 体细胞编辑。', body: '体细胞编辑改变的是一个身体。可遗传(生殖系)编辑改变的是一个卵子或胚胎——因此会进入由此诞生的人的每一个细胞,并继续传给他们的孩子。1997 年欧洲委员会的《奥维耶多公约》(29 个国家批准的生物医学条约)将基因组编辑限制在预防、诊断或治疗目的(第 13 条);在欧洲许多地方,这一"目的检验"就是法律的分界线。' },
      ja: { title: '遺伝に関わる編集と体細胞編集。', body: '体細胞編集は一つの身体を変える。生殖細胞系列の編集(ヘリタブル編集)は卵子や胚を変えるため、生まれてくる人のすべての細胞、そしてその子へと引き継がれていく。1997 年に成立した欧州評議会のオビエド条約(29か国が批准した生命医学条約)は、ゲノム編集を予防・診断・治療の目的に限定している(第13条)。この「目的テスト」が、ヨーロッパの多くの地域での法的境界線となっている。' },
      ko: { title: '유전 가능한 편집 vs. 체세포 편집.', body: '체세포 편집은 하나의 몸을 바꾼다. 유전 가능한(생식세포계열) 편집은 난자나 배아를 바꾸기 때문에, 거기서 태어난 사람의 모든 세포와 그 자녀에게까지 이어진다. 1997년 유럽평의회의 오비에도 협약(29개국이 비준한 생명의학 조약)은 유전체 편집을 예방·진단·치료 목적으로 제한한다(제13조). 유럽의 많은 지역에서 법적 경계선은 바로 이 "목적 기준"이다.' },
      tr: { title: 'Kalıtsal düzenlemeler ile somatik düzenlemeler.', body: 'Somatik bir düzenleme tek bir bedeni değiştirir. Kalıtsal (germ hattı) düzenleme bir yumurta ya da embriyoyu değiştirir — bu yüzden ortaya çıkan kişinin her hücresine ve onun çocuklarına taşınır. 1997 tarihli Avrupa Konseyi Oviedo Sözleşmesi (European Convention on Human Rights and Biomedicine; 29 devletin onayladığı bir biyotıp anlaşması), genom düzenlemelerini önleyici, tanısal veya tedavi edici amaçlarla sınırlandırır (Madde 13); Avrupa\'nın büyük bölümünde hukuki sınır işte bu "amaç testidir".' }
    } },
  { title: 'There is no "gene for" a trait.', body: 'Common-language genetics talks about "the gene for height" or "the gene for happiness". Almost no complex human trait works that way. Height alone is shaped by thousands of variants of tiny effect (Yengo et al., 2022 — 12,111 independent SNPs clustered within ~7,200 genomic regions, together explaining ~40% of height variation in predominantly European-ancestry populations; portability to other ancestries is lower). Personality, intelligence, and most disease risks are polygenic in the same way: many small contributions, not one switch. That is why this simulator shows a single slider per trait — but a slider in real biology would not map to a gene a clinic could "set". Polygenic scores predict population-level distributions, not individual outcomes.',
    i18n: {
      zh: { title: '不存在某种性状"专属"的那一个基因。', body: '日常语言喜欢说"身高的基因"或者"快乐的基因"。几乎所有复杂的人类性状都不是这样工作的。仅仅是身高,就由成千上万个微小效应的变异共同决定(Yengo 等,2022——12,111 个独立 SNP 聚集在约 7,200 个基因组区域,合起来解释了以欧洲血统人群为主的样本中约 40% 的身高变异;在其他祖源人群中的可迁移性更低)。人格、智力、绝大多数疾病风险也都是这样:许多微小贡献叠加,而不是一个开关。这就是为什么本模拟器对每个性状只展示一个滑块——但现实生物学中的那个"滑块",并不会对应到任何一家诊所可以"设置"的基因。多基因评分预测的是人群层面的分布,而不是个体的结果。' },
      ja: { title: 'ある特性のための「遺伝子」は存在しない。', body: '日常の言葉づかいでは「身長の遺伝子」や「幸福の遺伝子」などとよく言うが、人間の複雑な形質はほとんどそうした仕組みでは説明できない。身長一つをとっても、微小な効果をもつ何千もの変異が関わっている(Yengo et al., 2022——12,111 個の独立 SNP が約 7,200 のゲノム領域にまとまり、ヨーロッパ系祖先が主体の集団における身長変動のおよそ40%を説明する。他の祖先集団への適用は限定的)。性格、知能、ほとんどの疾患リスクも同じく多遺伝子的である——一つのスイッチではなく、無数の小さな寄与の集まりだ。だからこそ本シミュレーターは特性ごとにスライダーを一本だけ表示している——しかし、現実の生物学におけるその「スライダー」は、診療所が「設定」できる単一の遺伝子に対応するわけではない。多遺伝子スコアが予測するのは集団レベルの分布であって、個人の帰結ではない。' },
      ko: { title: '어떤 특성을 위한 "그 유전자"는 없다.', body: '일상 언어에서는 "키의 유전자"나 "행복의 유전자"라는 말을 자주 쓰지만, 복잡한 인간 특성 가운데 그렇게 작동하는 것은 거의 없다. 키 하나만 해도 미세한 효과를 가진 수천 개의 변이가 함께 작용한다(Yengo et al., 2022 — 약 7,200개 유전체 영역에 모인 12,111개의 독립 SNP가 유럽계 조상을 주축으로 한 표본에서 키 변동의 약 40%를 설명한다. 다른 조상 집단으로의 이식 가능성은 더 낮다). 성격, 지능, 그리고 대부분의 질병 위험 역시 동일한 방식의 다유전자성을 갖는다 — 하나의 스위치가 아니라 수많은 작은 기여의 합이다. 그래서 본 시뮬레이터는 특성마다 단일 슬라이더만 보여준다 — 하지만 현실 생물학에서의 그 "슬라이더"는 어느 한 진료소가 "설정"할 수 있는 단일 유전자에 대응하지 않는다. 다유전자 점수가 예측하는 것은 인구 집단 차원의 분포이지, 개인의 결과가 아니다.' },
      tr: { title: 'Belirli bir özelliğin "geni" diye bir şey yoktur.', body: 'Gündelik dilde "boy geni" ya da "mutluluk geni" gibi ifadeler kullanılır; ama karmaşık insan özelliklerinin neredeyse hiçbiri böyle işlemez. Tek başına boy bile, küçük etkili binlerce varyantla şekillenir (Yengo vd., 2022 — yaklaşık 7.200 genomik bölgede kümelenmiş 12.111 bağımsız SNP, ağırlıklı olarak Avrupa kökenli popülasyonlarda boy varyasyonunun yaklaşık %40\'ını açıklar; diğer ataya taşınabilirlik daha düşüktür). Kişilik, zeka ve hastalık risklerinin çoğu da aynı şekilde poligeniktir: tek bir anahtar değil, çok sayıda küçük katkı. İşte bu yüzden simülatör her özellik için tek bir kaydırıcı gösterir — ama gerçek biyolojideki o "kaydırıcı", bir kliniğin "ayarlayabileceği" bir gene karşılık gelmez. Poligenik skorlar nüfus düzeyinde dağılımları öngörür; bireysel sonuçları değil.' }
    } }
];

/* ====================================================================
 * Kids Mode pools (warm, simple, age-appropriate)
 *
 * Same engine, friendlier surface. The OCEAN state under the hood is
 * untouched — these pools just swap the surfaces the user sees.
 * ==================================================================== */

// 5 friendly trait sliders mapped to the underlying OCEAN keys.
// `invert: true` means the slider value is mirrored on a 1..10 axis
// (e.g. confidence 10 ⇒ neuroticism 1).
const KIDS_TRAIT_VIEW = [
  { kidsKey: 'curiosity',  oceanKey: 'openness',          label: 'Curiosity',  hint: 'Loves asking questions, exploring, trying new things.', invert: false },
  { kidsKey: 'kindness',   oceanKey: 'agreeableness',     label: 'Kindness',   hint: 'Cares about others. Good at being a friend.',          invert: false },
  { kidsKey: 'energy',     oceanKey: 'extraversion',      label: 'Energy',     hint: 'How much they light up in a room full of people.',     invert: false },
  { kidsKey: 'focus',      oceanKey: 'conscientiousness', label: 'Focus',      hint: 'Finishing what they start. Sticking with things.',     invert: false },
  { kidsKey: 'confidence', oceanKey: 'neuroticism',       label: 'Confidence', hint: 'Feeling steady when things get bumpy.',               invert: true  }
];

// Friendlier explainers for the physical sliders too, used in Kids mode.
const KIDS_EXPLAINERS = {
  height:    'Height depends on family traits, food, sleep, health, and lots of tiny genes.',
  athletic:  'Some kids love running and jumping. It changes a lot as they grow.',
  eyeColor:  'Eye color is mostly inherited from family. Lots of beautiful colors are possible.',
  hairColor: 'Hair color usually comes from the family, but it can shift with age and sunlight.',
  hairType:  'Curly, wavy, straight — all come from family traits and can change over time.',
  skinTone:  'Skin tone is a mix of family genes. Every shade is healthy and beautiful.',
  faceShape: 'Face shape comes from family. It also changes as kids grow up.',
  freckles:  'Some kids get freckles when they spend time in the sun, especially if family does too.',
  dimples:   'Dimples are a fun little family trait. Some have them, some don\'t.',
  curiosity:  'Two quiet parents can still have a wildly curious kid. People surprise us! (Curiosity is a strength — though sometimes curious questions get more questions back than answers. Same trait, different room.)',
  kindness:   'Kindness shows up differently depending on the situation. Some kids are warm in big groups, others one-on-one. (And sometimes wanting others to feel okay costs them their own quiet — same trait, real tradeoff.)',
  energy:     'Some kids are loud at home and shy at school, or the other way around. (And sometimes all that bounce makes it hard to settle down when it\'s time to sleep — same trait, harder hour.)',
  focus:      'Focus grows with age, sleep, practice, and finding something that feels exciting. (Sometimes a kid gets so absorbed in one thing they lose track of time — that\'s focus working, not a cost.)',
  confidence: 'Confidence changes a LOT as people grow up. Bumpy days are normal. (Sometimes the belief slides into not seeing how it lands for others — same trait, different cost.)'
};

// Soft framing for the Kids-mode futures block — injected once per generation
// above the future-tree by the render path (see #future-block handling).
const KIDS_FUTURES_PREAMBLE = {
  en: "These are just stories of *possible* lives. Your real one might be completely different.",
  zh: "这些只是*可能*的人生故事。你真实的人生,也许完全不一样。",
  ja: "これは「ありうるかもしれない」人生の話。あなたの本当の人生は、ぜんぜん違うかもしれない。",
  ko: "이건 그저 *있을 수 있는* 삶의 이야기들이에요. 당신의 진짜 삶은 완전히 다를 수 있어요.",
  tr: "Bunlar yalnızca *olası* hayatların hikâyeleri. Senin gerçek hayatın bambaşka olabilir."
};

// One-line, dry framing appended to the popover on the 5 OCEAN-mapped Kids
// sliders (curiosity/kindness/energy/focus/confidence). Explains WHY their
// confidence bands are wider than the physical sliders': gene-environment
// interaction means heritability for personality is roughly 0.4–0.5.
// Surfaced through buildExplainerHTML for any kidsKey in KIDS_TRAIT_VIEW.
// Second sentence notes that researchers use different (OCEAN) terms for
// these same traits — surfacing the framework without preaching it.
const KIDS_OCEAN_TOOLTIP = {
  en: "Personality is shaped more by life experience, friendships, and luck than by genes alone. Genes matter, but they're roughly half the story (that's the population picture — not how much of any one kid). Researchers usually call these five traits openness, agreeableness, extraversion, conscientiousness, and emotional stability — the same ideas, with grown-up names.",
  zh: "性格更多是被生活经历、友谊和运气塑造的,而不仅仅是基因。基因当然重要,但大约只占一半。研究者通常把这五项特质称为开放性、宜人性、外向性、尽责性和情绪稳定性——同样的意思,只是用了成年人的称呼。",
  ja: "性格は遺伝子だけでなく、人生経験や友情、運によって形づくられる。遺伝子も大切だけれど、占めるのはだいたい半分ほど。研究者はこの五つの性質を「開放性」「協調性」「外向性」「誠実性」「情緒安定性」と呼ぶ——同じ概念に、おとな向けの名前をつけているだけだ。",
  ko: "성격은 유전자만이 아니라 삶의 경험과 우정, 그리고 운에 의해 더 많이 빚어진다. 유전자도 중요하지만, 대략 절반 정도다. 연구자들은 이 다섯 가지 특성을 개방성, 친화성, 외향성, 성실성, 정서적 안정성이라 부른다 — 같은 개념을, 어른의 언어로 부르는 것뿐이다.",
  tr: "Kişilik, yalnızca genlerle değil; yaşam deneyimleri, dostluklar ve şansla şekillenir. Genler önemlidir, ama olayın yaklaşık yarısıdır. Araştırmacılar bu beş özelliği açıklık, uyumluluk, dışadönüklük, sorumluluk ve duygusal istikrar olarak adlandırır — aynı kavramlar, yetişkin isimleriyle."
};

const KIDS_FUTURE_PATHS = {
  en: [
    { text: 'Might love building things.',                            tag: 'O' },
    { text: 'Loves telling stories — already.',                       tag: 'O' },
    { text: 'May enjoy helping other people.',                        tag: 'A' },
    { text: 'Probably asks a LOT of questions.',                      tag: 'O' },
    { text: 'Could change interests many times — and that\'s okay.',  tag: 'OC-tension' },
    { text: 'Sometimes brave and loud at home, quieter with strangers — both are them.', tag: 'EN-tension' },
    { text: 'Might want the same breakfast every day for a year.',    tag: 'CO-rigidity' },
    { text: 'Might love drawing, painting, or making things up.',     tag: 'O' },
    { text: 'May enjoy solving puzzles or codes.',                    tag: 'C' },
    { text: 'Could be great at organizing — even their own snacks.',  tag: 'C' },
    { text: 'Might love making detailed plans for tiny adventures.',  tag: 'CO-rigidity' },
    { text: 'Probably remembers tiny details no one else notices.',   tag: 'C' },
    { text: 'May light up around new people and new places.',         tag: 'E' },
    { text: 'Could be the kid who knows everyone\'s name.',           tag: 'E' },
    { text: 'Might lead games on the playground.',                    tag: 'E' },
    { text: 'May love performing — songs, plays, magic tricks.',      tag: 'E' },
    { text: 'Probably gives the best hugs.',                          tag: 'A' },
    { text: 'May befriend every animal they meet.',                   tag: 'A' },
    { text: 'May become the one who smooths family tensions — learning early that keeping the peace is their job.', tag: 'AN-pleaser' },
    { text: 'May have to be the emotional adult in the room earlier than they should.', tag: 'AN-pleaser' },
    { text: 'May have a big imagination world full of characters.',   tag: 'N' },
    { text: 'Could love writing stories or making up songs.',         tag: 'N' },
    { text: 'Probably feels things deeply — that\'s a strength.',     tag: 'N' },
    { text: 'May love sports, running, or jumping off things.',       tag: 'athletic' },
    { text: 'Could be unbeatable at hide-and-seek.',                  tag: 'athletic' },
    { text: 'Might be the kid who climbs everything.',                tag: 'athletic' },
    { text: 'May love dancing or moving to music.',                   tag: 'athletic' },
    { text: 'Likes showing other kids how things work.',              tag: 'A' },
    { text: 'Might be obsessed with one specific topic for years.',   tag: 'O' },
    { text: 'Probably collects something unusual — rocks, leaves, stickers.', tag: 'O' },
    { text: 'May invent games no one else understands.',              tag: 'O' },
    { text: 'Could be the family\'s designated joke-teller.',         tag: 'E' },
    // Tier-2 mild entries. Softer than the tier-1 lines above; kid-readable,
    // warm. R14 closed: zh/ja/ko/tr mild entries now mirror the 8 EN below.
    { text: 'Might love a brand-new project one week and quietly forget it the next — both are real.', tag: 'OC-mild' },
    { text: 'Could keep their room mostly tidy, then leave one drawer wonderfully chaotic.', tag: 'OC-mild' },
    { text: 'May be cheerful at the party and tired on the car ride home — both are okay.', tag: 'EN-mild' },
    { text: 'Might love a big group game, then want one quiet friend for the next hour.', tag: 'EN-mild' },
    { text: 'May love trying new things, but want their same favorite pajamas at the end of the day.', tag: 'CO-mild' },
    { text: 'Could like surprises, as long as someone tells them the surprise is coming.', tag: 'CO-mild' },
    { text: 'Might say "I don\'t mind" when they actually do mind. Sometimes the practice becomes the pattern.',  tag: 'AN-mild' },
    { text: 'May go along with what their friend wants today, and pick the game themselves tomorrow.', tag: 'AN-mild' }
  ],
  zh: [
    { text: '也许会喜欢动手做东西。', tag: 'O' },
    { text: '已经很喜欢讲故事了。', tag: 'O' },
    { text: '也许会乐于帮助别人。', tag: 'A' },
    { text: '大概会问很多很多问题。', tag: 'O' },
    { text: '兴趣可能会变很多次——这没关系。', tag: 'OC-tension' },
    { text: '在家时大胆又爱说话,遇到陌生人就安静下来——两面都是同一个孩子。', tag: 'EN-tension' },
    { text: '也许会连续一年想吃同一种早餐。', tag: 'CO-rigidity' },
    { text: '也许会喜欢画画、涂色,或编故事。', tag: 'O' },
    { text: '也许会喜欢解谜或破解密码。', tag: 'C' },
    { text: '也许很会整理,连自己的零食都摆得整整齐齐。', tag: 'C' },
    { text: '也许喜欢为小小冒险写下详细的计划。', tag: 'CO-rigidity' },
    { text: '大概会记得别人都没注意到的小细节。', tag: 'C' },
    { text: '也许在新朋友和新地方面前会眼睛发亮。', tag: 'E' },
    { text: '也许会是那个记得每个人名字的孩子。', tag: 'E' },
    { text: '也许会是操场上带头玩游戏的那个。', tag: 'E' },
    { text: '也许会爱表演——唱歌、演戏、变魔术。', tag: 'E' },
    { text: '大概拥抱起来最暖。', tag: 'A' },
    { text: '也许遇见的每只小动物都会变成朋友。', tag: 'A' },
    { text: '也许会成为给家里抚平矛盾的那个孩子——很小就学会:维持和气是自己的任务。', tag: 'AN-pleaser' },
    { text: '也许在该当孩子的年纪,就被迫先做了房间里那个懂事的大人。', tag: 'AN-pleaser' },
    { text: '也许内心有一个住着很多角色的想象世界。', tag: 'N' },
    { text: '也许会喜欢写故事或自己编歌。', tag: 'N' },
    { text: '大概感受得很深——这其实是一种力量。', tag: 'N' },
    { text: '也许会爱运动、跑步、或从高处往下跳。', tag: 'athletic' },
    { text: '也许是捉迷藏里没人能找到的那一个。', tag: 'athletic' },
    { text: '也许是那个见什么爬什么的孩子。', tag: 'athletic' },
    { text: '也许会喜欢跳舞或随着音乐摇摆。', tag: 'athletic' },
    { text: '喜欢教其他小朋友怎么做事情。', tag: 'A' },
    { text: '也许会对某个特定的话题着迷好几年。', tag: 'O' },
    { text: '大概会收集些不太一样的东西——石头、树叶、贴纸。', tag: 'O' },
    { text: '也许会发明只有自己懂规则的游戏。', tag: 'O' },
    { text: '也许会成为家里专门讲笑话的那个人。', tag: 'E' },
    { text: '这周可能特别迷上一个新计划,下周又悄悄忘掉——两种心情都很真实。', tag: 'OC-mild' },
    { text: '可能把房间大致收拾整齐,却让某一个抽屉乱得有点可爱。', tag: 'OC-mild' },
    { text: '在派对上很开心,回家的车上又困又累——两种感受都没问题。', tag: 'EN-mild' },
    { text: '可能先爱热闹的集体游戏,接下来一个小时又只想找一个安静的朋友。', tag: 'EN-mild' },
    { text: '可能喜欢尝试新东西,但到了晚上还是想穿那件最熟悉的睡衣。', tag: 'CO-mild' },
    { text: '可能喜欢惊喜,只要有人先告诉他们惊喜要来了。', tag: 'CO-mild' },
    { text: '可能嘴上说"我不介意",心里其实是介意的。说着说着,就成了习惯。', tag: 'AN-mild' },
    { text: '可能今天迁就朋友想玩的,明天再换自己想玩的来挑。', tag: 'AN-mild' }
  ],
  ja: [
    { text: '何かを作るのが大好きになるかも。', tag: 'O' },
    { text: 'すでにお話をするのが大好き。', tag: 'O' },
    { text: '人を助けるのが好きになるかも。', tag: 'A' },
    { text: 'たぶん、ものすごくたくさん質問するタイプ。', tag: 'O' },
    { text: '興味がころころ変わるかもしれない——それでいい。', tag: 'OC-tension' },
    { text: '家ではおおきな声で元気いっぱい、知らない人の前では静かになる——どちらも同じその子。', tag: 'EN-tension' },
    { text: '一年ずっと、同じ朝ごはんでいいタイプかも。', tag: 'CO-rigidity' },
    { text: '絵を描いたり、色をぬったり、お話を考えたりするのが好きになるかも。', tag: 'O' },
    { text: 'パズルや暗号を解くのを楽しいと思うかも。', tag: 'C' },
    { text: '整理整頓が得意で、おやつまできちんと並べる子になるかも。', tag: 'C' },
    { text: 'ちいさな冒険のために、こまかな計画を立てるのが好きになるかも。', tag: 'CO-rigidity' },
    { text: '誰も気づかない小さなことを、ちゃんと覚えている子かも。', tag: 'C' },
    { text: '知らない人や場所に出会うと、目を輝かせるかも。', tag: 'E' },
    { text: 'みんなの名前を覚えている子になるかもしれない。', tag: 'E' },
    { text: '校庭で遊びをリードする子になるかも。', tag: 'E' },
    { text: '歌や劇、手品など、人前で何かをするのが大好きになるかも。', tag: 'E' },
    { text: 'たぶん、世界一あたたかいハグをしてくれる。', tag: 'A' },
    { text: '出会う動物すべてと仲良くなりそう。', tag: 'A' },
    { text: '家族の不穏な空気をならす役になるかも——「場を保つのは自分の仕事」と、小さいうちから覚えてしまうかもしれない。', tag: 'AN-pleaser' },
    { text: '本当はまだ甘えたい年齢で、その部屋の「大人の役」を引き受けることになるかも。', tag: 'AN-pleaser' },
    { text: 'たくさんの登場人物が住む、自分だけの大きな想像の世界をもつかも。', tag: 'N' },
    { text: 'お話を書いたり、歌をつくったりするのが好きになるかも。', tag: 'N' },
    { text: 'たぶん、ものごとを深く感じる子——それはきっと強さ。', tag: 'N' },
    { text: 'スポーツや走ること、何かから跳びおりることが大好きになるかも。', tag: 'athletic' },
    { text: 'かくれんぼでだれにも見つからない子になるかも。', tag: 'athletic' },
    { text: '目につくものは何でも登ろうとする子かも。', tag: 'athletic' },
    { text: '音楽にあわせて踊ったり体を動かしたりするのが好きになるかも。', tag: 'athletic' },
    { text: '他の子に「やり方」を教えるのが好き。', tag: 'A' },
    { text: 'ある一つのテーマに、何年も夢中になるかも。', tag: 'O' },
    { text: '石やはっぱ、シールなど、ちょっと変わったものを集める子になりそう。', tag: 'O' },
    { text: '自分にしかルールがわからない遊びを考えだすかも。', tag: 'O' },
    { text: '家族のなかの「ジョーク担当」になるかも。', tag: 'E' },
    { text: '今週は新しいプロジェクトに夢中で、来週にはそっと忘れているかも——どちらの気持ちも本物。', tag: 'OC-mild' },
    { text: '部屋はだいたい整っているのに、ある一つの引き出しだけはにぎやかに散らかしておく子かも。', tag: 'OC-mild' },
    { text: 'パーティーでは元気で、帰りの車では眠くて静か——どちらでも大丈夫。', tag: 'EN-mild' },
    { text: 'にぎやかな集団あそびのあと、次の一時間は静かな友だち一人と過ごしたくなるかも。', tag: 'EN-mild' },
    { text: '新しいことを試すのは好きだけれど、一日の終わりにはいつものお気に入りのパジャマを着たい子かも。', tag: 'CO-mild' },
    { text: 'サプライズは好き——ただし、「サプライズがあるよ」と先に教えてもらえれば。', tag: 'CO-mild' },
    { text: '本当は気にしているのに、「気にしてないよ」と言ってしまうかも。続けているうちに、それがその子の癖になっていく。', tag: 'AN-mild' },
    { text: '今日は友だちのやりたい遊びに合わせ、明日は自分のやりたい遊びを選ぶ——そんなふうにできるかも。', tag: 'AN-mild' }
  ],
  ko: [
    { text: '만드는 걸 정말 좋아할지도 몰라요.', tag: 'O' },
    { text: '이미 이야기를 들려주는 걸 좋아해요.', tag: 'O' },
    { text: '다른 사람을 돕는 걸 좋아할 수 있어요.', tag: 'A' },
    { text: '아마 질문을 정말 많이 할 거예요.', tag: 'O' },
    { text: '관심사가 자주 바뀔 수 있는데, 그래도 괜찮아요.', tag: 'OC-tension' },
    { text: '집에서는 씩씩하고 큰 소리, 낯선 사람 앞에서는 조용해질 수 있어요 — 둘 다 같은 아이예요.', tag: 'EN-tension' },
    { text: '일 년 내내 같은 아침 메뉴만 먹고 싶어 할 수도 있어요.', tag: 'CO-rigidity' },
    { text: '그림 그리기나 색칠, 이야기 지어내기를 좋아할지도 몰라요.', tag: 'O' },
    { text: '퍼즐이나 암호 풀기를 즐길 수 있어요.', tag: 'C' },
    { text: '정리에 능해서 자기 간식까지 가지런히 두는 아이일 수 있어요.', tag: 'C' },
    { text: '작은 모험을 위해 세세한 계획을 세우는 걸 좋아할지 몰라요.', tag: 'CO-rigidity' },
    { text: '아무도 못 본 사소한 것까지 기억하는 아이일 수 있어요.', tag: 'C' },
    { text: '새로운 사람이나 장소를 만나면 눈이 반짝일 수 있어요.', tag: 'E' },
    { text: '모두의 이름을 기억하는 아이가 될 수 있어요.', tag: 'E' },
    { text: '놀이터에서 게임을 이끄는 아이가 될지도 몰라요.', tag: 'E' },
    { text: '노래든 연극이든 마술이든, 무대에 서는 걸 좋아할 수 있어요.', tag: 'E' },
    { text: '아마 세상에서 가장 따뜻한 포옹을 해 줄 거예요.', tag: 'A' },
    { text: '만나는 동물마다 친구로 만들 수 있어요.', tag: 'A' },
    { text: '가족의 긴장을 누그러뜨리는 아이가 될 수 있어요 — 평화를 지키는 게 자기 몫이라는 걸 어릴 때부터 배우면서요.', tag: 'AN-pleaser' },
    { text: '아직 어려도 되는 나이에, 방 안에서 먼저 어른 노릇을 떠맡게 될지도 몰라요.', tag: 'AN-pleaser' },
    { text: '수많은 인물들이 사는 자기만의 커다란 상상 세계를 가질 수 있어요.', tag: 'N' },
    { text: '이야기를 쓰거나 노래를 지어내는 걸 좋아할 수 있어요.', tag: 'N' },
    { text: '아마 마음 깊이 느끼는 아이일 거예요 — 그건 큰 힘이에요.', tag: 'N' },
    { text: '운동이나 달리기, 어딘가에서 뛰어내리는 걸 좋아할 수 있어요.', tag: 'athletic' },
    { text: '숨바꼭질에서 아무도 못 찾는 아이가 될 수 있어요.', tag: 'athletic' },
    { text: '눈에 보이는 건 다 올라가는 아이일지도 몰라요.', tag: 'athletic' },
    { text: '춤추거나 음악에 맞춰 움직이는 걸 좋아할 수 있어요.', tag: 'athletic' },
    { text: '다른 아이들에게 방법을 알려주는 걸 좋아해요.', tag: 'A' },
    { text: '한 가지 주제에 몇 년이고 푹 빠질 수 있어요.', tag: 'O' },
    { text: '돌이나 잎사귀, 스티커처럼 좀 특별한 것들을 모을 가능성이 커요.', tag: 'O' },
    { text: '자기만 규칙을 아는 놀이를 만들어낼지도 몰라요.', tag: 'O' },
    { text: '가족 안의 공식 농담 담당이 될 수 있어요.', tag: 'E' },
    { text: '이번 주에는 새 프로젝트에 푹 빠졌다가, 다음 주에는 조용히 잊어버릴 수도 있어요 — 둘 다 진짜 마음이에요.', tag: 'OC-mild' },
    { text: '방은 대체로 깔끔한데, 어떤 한 서랍만은 멋지게 어질러 두는 아이일 수 있어요.', tag: 'OC-mild' },
    { text: '파티에서는 신이 났다가, 돌아오는 차 안에서는 졸리고 지칠 수 있어요 — 둘 다 괜찮아요.', tag: 'EN-mild' },
    { text: '큰 단체 놀이를 신나게 한 뒤, 한 시간쯤은 조용한 친구 한 명과 있고 싶어 할 수도 있어요.', tag: 'EN-mild' },
    { text: '새로운 걸 시도하는 건 좋아하지만, 하루의 끝에는 늘 좋아하는 그 잠옷을 입고 싶어 할지도 몰라요.', tag: 'CO-mild' },
    { text: '깜짝 선물을 좋아할 수 있어요 — 누군가 깜짝 선물이 올 거라고 미리 알려주기만 한다면요.', tag: 'CO-mild' },
    { text: '사실은 신경 쓰이는데도 "나는 괜찮아"라고 말해 버릴 수 있어요. 그게 반복되면, 어느새 습관이 되기도 해요.', tag: 'AN-mild' },
    { text: '오늘은 친구가 하고 싶은 놀이를 따라 주고, 내일은 자기가 하고 싶은 놀이를 골라 볼 수 있어요.', tag: 'AN-mild' }
  ],
  tr: [
    { text: 'Bir şeyler yapmayı çok sevebilir.', tag: 'O' },
    { text: 'Şimdiden hikaye anlatmayı çok seviyor.', tag: 'O' },
    { text: 'Başkalarına yardım etmekten hoşlanabilir.', tag: 'A' },
    { text: 'Muhtemelen pek çok soru soracak.', tag: 'O' },
    { text: 'İlgisi defalarca değişebilir — bunda bir sorun yok.', tag: 'OC-tension' },
    { text: 'Evde gürültücü ve cesur, yabancıların yanında daha sessiz olabilir — ikisi de aynı çocuk.', tag: 'EN-tension' },
    { text: 'Bir yıl boyunca her sabah aynı kahvaltıyı isteyebilir.', tag: 'CO-rigidity' },
    { text: 'Çizmeyi, boyamayı ya da yeni şeyler uydurmayı sevebilir.', tag: 'O' },
    { text: 'Bulmaca ya da şifre çözmekten hoşlanabilir.', tag: 'C' },
    { text: 'Düzenlemekte çok iyi olabilir — kendi atıştırmalıklarını bile.', tag: 'C' },
    { text: 'Küçük maceralar için ince ince plan yapmaya bayılabilir.', tag: 'CO-rigidity' },
    { text: 'Kimsenin görmediği küçük ayrıntıları muhtemelen hatırlayacak.', tag: 'C' },
    { text: 'Yeni insanlar ve yeni yerlerde gözleri parlayabilir.', tag: 'E' },
    { text: 'Herkesin adını bilen çocuk olabilir.', tag: 'E' },
    { text: 'Oyun bahçesinde oyunlara öncülük edebilir.', tag: 'E' },
    { text: 'Sahneye çıkmayı sevebilir — şarkı, oyun ya da sihir gösterisi.', tag: 'E' },
    { text: 'Muhtemelen en güzel sarılan o olacak.', tag: 'A' },
    { text: 'Karşılaştığı her hayvanla dost olabilir.', tag: 'A' },
    { text: 'Ailedeki gerginlikleri yumuşatan çocuk olabilir — huzuru korumanın kendi işi olduğunu küçük yaşta öğrenerek.', tag: 'AN-pleaser' },
    { text: 'Çocuk olabileceği yaşta, odadaki «duygusal yetişkin» rolünü olması gerekenden erken üstlenmek zorunda kalabilir.', tag: 'AN-pleaser' },
    { text: 'Pek çok karakterle dolu büyük bir hayal dünyası kurabilir.', tag: 'N' },
    { text: 'Hikaye yazmayı ya da kendi şarkılarını uydurmayı sevebilir.', tag: 'N' },
    { text: 'Muhtemelen her şeyi derinden hisseder — bu bir güçtür.', tag: 'N' },
    { text: 'Sporu, koşmayı ya da bir yerlerden atlamayı sevebilir.', tag: 'athletic' },
    { text: 'Saklambaçta yenilmez olabilir.', tag: 'athletic' },
    { text: 'Önüne çıkan her şeye tırmanan çocuk olabilir.', tag: 'athletic' },
    { text: 'Dans etmeyi ya da müzikle hareket etmeyi sevebilir.', tag: 'athletic' },
    { text: 'Diğer çocuklara bir şeyin nasıl yapıldığını göstermeyi seviyor.', tag: 'A' },
    { text: 'Belirli bir konuya yıllarca takılıp kalabilir.', tag: 'O' },
    { text: 'Muhtemelen alışılmadık şeyler biriktirir — taşlar, yapraklar, çıkartmalar.', tag: 'O' },
    { text: 'Sadece kendisinin anladığı oyunlar uydurabilir.', tag: 'O' },
    { text: 'Ailenin resmi şakacısı olabilir.', tag: 'E' },
    { text: 'Bu hafta yepyeni bir projeye bayılıp gelecek hafta sessizce unutabilir — iki his de gerçek.', tag: 'OC-mild' },
    { text: 'Odası genelde düzenliyken bir çekmeceyi tatlı bir karmaşaya bırakan çocuk olabilir.', tag: 'OC-mild' },
    { text: 'Partide neşeli, eve dönüş yolundaki arabada yorgun olabilir — ikisi de sorun değil.', tag: 'EN-mild' },
    { text: 'Kalabalık bir grup oyununu sevdikten sonra, bir sonraki saatte tek bir sessiz arkadaş isteyebilir.', tag: 'EN-mild' },
    { text: 'Yeni şeyler denemeyi sevse de, günün sonunda yine en sevdiği aynı pijamayı isteyebilir.', tag: 'CO-mild' },
    { text: 'Sürprizleri sevebilir — yeter ki birisi sürprizin geleceğini önceden söylesin.', tag: 'CO-mild' },
    { text: 'Aslında rahatsızken bile «benim için fark etmez» diyebilir. Bunu yeterince söyleyince, alışkanlığa dönüşür.', tag: 'AN-mild' },
    { text: 'Bugün arkadaşının istediği oyuna uyabilir, yarın oyunu kendisi seçebilir.', tag: 'AN-mild' }
  ]
};

const KIDS_RANDOM_EVENTS = {
  en: [
    'Future rock collector. Watch the pockets.',
    'Will probably adopt too many pets.',
    'Keeps random objects \"just in case.\"',
    'Might learn to whistle before they learn to tie shoes.',
    'May have a favorite blanket for years (and that\'s okay).',
    'Could speak a secret language with a sibling or friend.',
    'Probably names every stuffed animal they own.',
    'Has a strong chance of going through a dinosaur phase.',
    'May fall in love with one specific song and replay it 400 times.',
    'Probably collects coloring pencils like they\'re treasure.',
    'Could become an expert on one weird topic (volcanoes, octopuses, trains).',
    'Will leave one shoe in unusual places forever.',
    'Might be the kid who reads under the covers with a flashlight.',
    'May invent a friendly imaginary pet.',
    'Could ask \"why?\" 500 times in a single afternoon.',
    'Probably has a favorite cup and will not switch.',
    'Will probably try to teach the family dog something complicated.',
    'May develop a strong opinion about pancake shapes.',
    'Could win a school award for kindness one day.',
    'Might photograph clouds and try to name them.',
    'May write secret notes in invisible ink (lemon juice).',
    'Could host the world\'s smallest tea party (for stuffed animals).',
    'Probably loves a particular cozy hoodie until it falls apart.'
  ],
  zh: [
    '未来的小小石头收藏家。注意检查口袋。',
    '大概会想养超多宠物。',
    '总会"以防万一"留着各种乱七八糟的小东西。',
    '也许会先学会吹口哨,再学会系鞋带。',
    '也许会有一条心爱的毯子陪伴好几年(这没关系)。',
    '也许会和兄弟姐妹或好朋友讲一种只有彼此懂的暗语。',
    '大概会给每一只布偶都取名字。',
    '很有可能会经历一段迷恐龙的时期。',
    '也许会爱上某一首歌,把它循环播放 400 遍。',
    '大概会把彩色铅笔当成宝贝一样收藏。',
    '也许会在某个奇特领域成为小专家(火山、章鱼、火车)。',
    '一辈子都会把一只鞋扔在奇怪的地方。',
    '也许就是那个躲在被子里打着手电筒看书的孩子。',
    '也许会发明一个友善的"想象中的宠物"。',
    '也许会在一个下午问 500 次"为什么"。',
    '大概会有一只最喜欢的杯子,雷打不动。',
    '大概会试着教家里的小狗一些复杂的把戏。',
    '也许会对煎饼的形状有非常坚定的看法。',
    '也许有一天会因为善良而获得学校颁的奖。',
    '可能会拍下许多朵云,试着给它们起名字。',
    '也许会用隐形墨水(柠檬汁)写小秘密。',
    '也许会举办世界上最小的茶会(为布偶们办的)。',
    '大概会爱穿某件舒服的帽衫,直到它彻底破掉。'
  ],
  ja: [
    '未来の石コレクター。ポケットに気をつけて。',
    'たぶん、ペットをたくさん飼いたがる。',
    '「念のため」と、いろんなものを取っておく。',
    '靴ひもを結ぶより先に、口笛を覚えるかも。',
    '何年もずっと同じお気に入りのブランケットを離さないかも(それでだいじょうぶ)。',
    'きょうだいや友だちと、ふたりだけの秘密の言葉で話すかも。',
    '持っているぬいぐるみ全部に、名前をつける子になりそう。',
    '恐竜にハマる時期が来る可能性は高い。',
    'ある一曲を大好きになって、四百回くらい繰り返し聴くかも。',
    '色えんぴつを宝物みたいに集めるタイプかも。',
    'ちょっと変わったテーマ(火山、タコ、電車など)の専門家になるかも。',
    '片方の靴を、いつまでも変な場所に置きっぱなしにする。',
    '布団の中で懐中電灯を点けて本を読む子かも。',
    '仲良しの想像上のペットを思いつくかも。',
    '一日の午後に「なんで?」を五百回くらい言う日があるかも。',
    'お気に入りのコップが決まっていて、ほかのは使わない。',
    '家の犬に、ちょっとむずかしい技を教えようとする。',
    'パンケーキの形について、強いこだわりを持つかも。',
    'いつか「親切な子」として学校から表彰されるかも。',
    '雲を写真に撮って、名前をつけてみるかも。',
    'あぶり出しのインク(レモン汁)で秘密の手紙を書くかも。',
    'ぬいぐるみのための、世界一ちいさなお茶会を開くかも。',
    'あるお気に入りのパーカーを、ぼろぼろになるまで着続けそう。'
  ],
  ko: [
    '미래의 돌 수집가예요. 주머니를 잘 살펴봐요.',
    '아마 너무 많은 동물을 키우려 들 거예요.',
    "'혹시 모르니까' 하면서 이것저것 모아둬요.",
    '신발 끈 매기 전에 휘파람부터 배울지도 몰라요.',
    '좋아하는 담요 하나를 몇 년 동안 갖고 있을 수 있어요(그래도 괜찮아요).',
    '형제자매나 친구와 자기들끼리만 통하는 비밀스러운 말을 쓸 수 있어요.',
    '가진 인형마다 이름을 다 붙여줄 거예요.',
    '공룡에 푹 빠지는 시기가 올 가능성이 커요.',
    '특정 노래 하나에 빠져서 400번쯤 반복해서 들을 수 있어요.',
    '색연필을 보물처럼 모을 가능성이 커요.',
    '화산이나 문어, 기차 같은 특이한 주제 하나의 전문가가 될 수 있어요.',
    '한쪽 신발을 늘 이상한 곳에 두는 버릇이 있어요.',
    '이불 속에서 손전등 켜고 책 읽는 아이일지도 몰라요.',
    '다정한 상상의 반려동물을 만들어낼지도 몰라요.',
    '한 오후에 "왜?" 라고 500번쯤 물을 수도 있어요.',
    '좋아하는 컵 하나가 있어서 절대 다른 걸로 바꾸지 않아요.',
    '집 강아지에게 꽤 복잡한 무언가를 가르치려 들 거예요.',
    '팬케이크 모양에 대해 확고한 의견을 가질 수 있어요.',
    '언젠가 학교에서 친절상을 받을 수 있어요.',
    '구름 사진을 찍고 이름을 붙여 볼지도 몰라요.',
    '보이지 않는 잉크(레몬즙)로 비밀 쪽지를 쓸 수 있어요.',
    '인형들을 위해 세상에서 가장 작은 다과회를 열 수 있어요.',
    '편한 후드티 하나를 너덜너덜해질 때까지 사랑할 거예요.'
  ],
  tr: [
    'Geleceğin taş koleksiyoncusu. Ceplerine dikkat.',
    'Muhtemelen pek çok hayvanı eve alacak.',
    '"Belki lazım olur" diye türlü ıvır zıvır saklar.',
    'Belki ayakkabı bağlamayı öğrenmeden ıslık çalmayı öğrenir.',
    'Yıllarca aynı battaniyeyi sevebilir (sorun değil).',
    'Bir kardeşi ya da arkadaşıyla gizli bir dilde konuşabilir.',
    'Sahip olduğu her oyuncak hayvana isim verecektir.',
    'Bir dinozor dönemi geçirme ihtimali yüksek.',
    'Belirli bir şarkıya tutulup onu 400 kez dinleyebilir.',
    'Boya kalemlerini hazine gibi biriktirebilir.',
    'Tuhaf bir konuda uzmanlaşabilir (yanardağlar, ahtapotlar, trenler).',
    'Bir tek ayakkabıyı hep tuhaf yerlere bırakacak.',
    'Yorganın altında el fenerle kitap okuyan çocuk olabilir.',
    'Arkadaş canlısı hayali bir evcil hayvan yaratabilir.',
    'Bir öğleden sonrada 500 kere "neden?" diye sorabilir.',
    'Muhtemelen favori bir bardağı olur ve onu değiştirmez.',
    'Aile köpeğine karmaşık bir şey öğretmeye çalışacak.',
    'Pankek şekilleri konusunda güçlü bir görüşü olabilir.',
    'Bir gün okulda nezaket ödülü kazanabilir.',
    'Bulutların fotoğrafını çekip onlara isim vermeyi deneyebilir.',
    'Görünmez mürekkeple (limon suyu) gizli notlar yazabilir.',
    'Oyuncak hayvanlar için dünyanın en küçük çay partisini düzenleyebilir.',
    'Rahat bir kapüşonluyu eskiyene kadar sevebilir.'
  ]
};

const KIDS_NEWS_HEADLINES = {
  en: [
    'Local kid plants a tree that becomes a neighborhood favorite.',
    'Teen invents a clever way to organize the school library.',
    'Birthday card art exhibit opens at the community center.',
    'Junior chess team wins their first regional ribbon.',
    'Local lemonade stand donates earnings to the animal shelter.',
    'School robotics club builds a friendly cardboard mascot.',
    'Spelling-bee runner-up gives a charming acceptance speech.',
    'Kid writes a tiny picture book that gets passed around the whole class.',
    'Community theater\'s youngest cast member steals the show.',
    'Local school garden grows a record-setting pumpkin.',
    'Junior musician plays a sweet song at the town concert.',
    'Student volunteers help paint a new mural at the playground.',
    'Local kid wins science fair with a project about backyard bugs.',
    'School newspaper interviews a long-time crossing guard.',
    'Soccer-team captain teaches younger kids how to pass.',
    'Library reading challenge sparks summer-long adventures.',
    'Local choir wins applause at the holiday performance.',
    'Kid bakes cookies for the neighbors. Neighbors return the plate refilled.',
    'Junior artist\'s painting hangs in the town hall lobby.',
    'Class pet escapes briefly; rescued by a future veterinarian.'
  ],
  zh: [
    '一个本地小朋友种下的树,成了整个社区最喜爱的那一棵。',
    '一位中学生想出了整理学校图书馆的巧妙办法。',
    '社区中心举办了一场用生日卡片做成的艺术展。',
    '少年象棋队赢得了他们的第一条地区比赛奖带。',
    '本地一家柠檬水小摊把所得全部捐给了动物收容所。',
    '学校机器人社团做了一只笑眯眯的纸板吉祥物。',
    '拼字比赛的亚军发表了一段动人的获奖感言。',
    '一个孩子写了一本小小的绘本,在全班传阅。',
    '社区剧团里最小的演员抢尽了风头。',
    '本地学校的花园种出了一只破纪录的大南瓜。',
    '一位小小音乐家在镇上的音乐会上演奏了一首温柔的曲子。',
    '学生志愿者们一起在游乐场画了一幅新壁画。',
    '一个本地小朋友凭借"后院虫子"项目赢得了科学展冠军。',
    '校报记者采访了一位多年在此值守的过街引导员。',
    '足球队队长教更小的孩子们怎么传球。',
    '图书馆的阅读挑战赛掀起了一整个夏天的小冒险。',
    '本地合唱团在节日演出中赢得了热烈掌声。',
    '一个小朋友给邻居们烤了一些饼干。邻居们把盘子装满后送了回来。',
    '一位小艺术家的画作挂在了市政厅大厅。',
    '班级宠物短暂"逃亡",最终被一位未来的兽医救了回来。'
  ],
  ja: [
    '地元の子が植えた木が、近所のお気に入りスポットになる。',
    'ある中学生が、学校の図書館を巧みに整理する方法を考えだす。',
    'コミュニティセンターで、バースデーカードを使ったアート展が始まる。',
    '少年チェスチームが、初の地区大会リボンを獲得する。',
    '地元のレモネードスタンドが、売上を動物保護施設に寄付する。',
    '学校のロボティクスクラブが、ダンボールでにこにこマスコットをつくる。',
    'スペリングコンテストの準優勝者が、心あたたまる受賞スピーチを披露する。',
    'ある子が描いたちいさな絵本が、クラス中で回し読みされる。',
    '地域劇団のいちばん年下のキャストが、舞台のすべてをさらってしまう。',
    '地元の学校の畑で、記録的な大きさのカボチャが育つ。',
    '町のコンサートで、年若い演奏者が優しい曲を奏でる。',
    '学生ボランティアたちが、公園の遊び場で新しい壁画を一緒に描く。',
    '地元の子が「裏庭の昆虫」研究で、科学博覧会に優勝する。',
    '学校新聞が、長年務める横断歩道の見守りスタッフにインタビューする。',
    'サッカーチームのキャプテンが、年下の子たちにパスのコツを教える。',
    '図書館の読書チャレンジが、夏じゅう続く小さな冒険のきっかけになる。',
    '地元の合唱団が、祝日のステージで大きな拍手を受ける。',
    'ある子が近所にクッキーを焼いて届けると、お皿に別の何かを乗せて返ってくる。',
    '若い画家の絵が、市役所のロビーに飾られる。',
    'クラスのペットがちょっと脱走するが、未来の獣医にあたる子が連れ戻す。'
  ],
  ko: [
    '한 동네 아이가 심은 나무가 이웃 모두의 사랑을 받는다.',
    '한 청소년이 학교 도서관을 똑똑하게 정리하는 방법을 고안해 낸다.',
    '커뮤니티 센터에서 생일 카드로 만든 미술 전시가 열린다.',
    '어린이 체스팀이 첫 지역 대회 리본을 거머쥐었다.',
    '동네 레모네이드 가게가 수익금을 동물 보호소에 기부한다.',
    '학교 로봇 동아리가 종이 상자로 친근한 마스코트를 만든다.',
    '받아쓰기 대회 준우승자가 사랑스러운 수상 소감을 전한다.',
    '한 아이가 만든 작은 그림책이 반 전체에 돌고 돈다.',
    '지역 극단의 가장 어린 배우가 무대의 주인공이 된다.',
    '지역 학교 텃밭에서 기록적인 크기의 호박이 자란다.',
    '마을 콘서트에서 어린 음악가가 다정한 곡을 연주한다.',
    '학생 자원봉사자들이 놀이터에 새 벽화를 그린다.',
    "동네 아이가 '뒤뜰 곤충' 프로젝트로 과학경진대회에서 우승한다.",
    '학교 신문이 오래 일해 온 횡단보도 도우미와 인터뷰한다.',
    '축구팀 주장이 어린 후배들에게 패스하는 법을 가르친다.',
    '도서관의 독서 챌린지가 여름 내내 이어지는 작은 모험을 시작하게 한다.',
    '지역 합창단이 명절 공연에서 큰 박수를 받는다.',
    '한 아이가 이웃에게 쿠키를 굽고, 이웃은 접시를 다른 음식으로 채워서 돌려준다.',
    '어린 화가의 그림이 시청 로비에 걸린다.',
    '학급 반려동물이 잠시 도망쳤다가, 미래의 수의사인 한 아이의 손에 무사히 돌아온다.'
  ],
  tr: [
    'Yerel bir çocuğun diktiği ağaç, mahallenin gözdesi oluyor.',
    'Bir genç, okul kütüphanesini düzenlemenin akıllıca bir yolunu icat ediyor.',
    'Toplum merkezinde doğum günü kartlarından oluşan bir sanat sergisi açılıyor.',
    'Çocuk satranç takımı, ilk bölge kurdelesini kazanıyor.',
    'Yerel limonata tezgahı, kazancını hayvan barınağına bağışlıyor.',
    'Okul robotik kulübü, karton bir maskot yapıyor.',
    'Yazım yarışmasının ikincisi, çok sevimli bir teşekkür konuşması yapıyor.',
    'Bir çocuk küçücük bir resimli kitap yazar; tüm sınıfta elden ele dolaşır.',
    'Mahalle tiyatrosunun en küçük oyuncusu, gösterinin yıldızı oluyor.',
    'Yerel okul bahçesinde rekor kıran bir balkabağı yetişiyor.',
    'Genç müzisyen, kasaba konserinde tatlı bir parça çalıyor.',
    'Öğrenci gönüllüler, oyun parkına yeni bir duvar resmi yapmaya yardım ediyor.',
    'Yerel bir çocuk, "arka bahçedeki böcekler" projesiyle bilim fuarını kazanıyor.',
    'Okul gazetesi, yıllardır görev başında olan geçit görevlisiyle röportaj yapıyor.',
    'Futbol takımı kaptanı, küçük çocuklara nasıl pas verileceğini öğretiyor.',
    'Kütüphanenin okuma yarışması, yaz boyu süren maceralara ilham veriyor.',
    'Yerel koro, bayram performansında alkış topluyor.',
    'Bir çocuk komşulara kurabiye pişirir; komşular tabağı doldurarak geri gönderir.',
    'Genç ressamın resmi, belediye binasının fuayesine asılıyor.',
    'Sınıf hayvanı kısa süreliğine kaçıyor; geleceğin bir veterineri tarafından kurtarılıyor.'
  ]
};

/* ---------- Kids-mode arc pools ----------
 * Three small panels that argue: every person is interesting in
 * surprising ways. Warm, specific, age-appropriate. Not babyish; not
 * preachy. The thesis is wonder, not measurement.
 */
const KIDS_LOVES = {
  en: [
    'A specific kind of rock they keep finding.',
    'The way the kitchen sounds in the morning.',
    'One imaginary friend whose name they will not change.',
    'A particular song from a movie they saw twice.',
    'Reading the same book seven times.',
    'Climbing things that are technically not for climbing.',
    'Drawing the same animal over and over.',
    'A secret hiding place behind the couch.',
    'The exact way their best friend laughs.',
    'A blanket that does not look special to anyone else.',
    'Spinning until they fall over.',
    'A specific knock-knock joke they invented.',
    'The way leaves crunch in autumn.',
    'A cousin or cousin-figure they admire.',
    'Stickers — categorically, all stickers.',
    'A bug they call by a name they made up.',
    'Falling asleep with a book on their chest.',
    'One specific dinosaur they have fully memorized.',
    'The smell of a certain pencil eraser.',
    'A treehouse, or wanting one very seriously.'
  ],
  zh: [
    '一种他们总是不停发现的特定石头。',
    '早晨厨房里那种声音。',
    '一个想象中的朋友,名字永远不肯改。',
    '一部他们只看过两遍的电影里的某一首歌。',
    '把同一本书读七遍。',
    '爬上那些"严格来说不是用来爬"的东西。',
    '一遍又一遍地画同一只动物。',
    '沙发后面一个秘密的藏身之处。',
    '最好的朋友笑起来,那种独特的样子。',
    '一条在别人眼里毫不特别的小毯子。',
    '一直转圈,转到自己摔倒。',
    '一个他们自己编出来的"叩叩门"小笑话。',
    '秋天踩在落叶上时,那种"咔嚓咔嚓"的感觉。',
    '一位他们仰慕的表亲、或类似表亲的人。',
    '贴纸——所有贴纸,统统都喜欢。',
    '一只他们用自创名字称呼的虫子。',
    '抱着一本书,睡着在自己胸口上。',
    '一种他们能完全背出来的恐龙。',
    '某种铅笔橡皮独有的味道。',
    '一座树屋——或者非常认真地"想要一座树屋"。'
  ],
  ja: [
    '何度も見つけてしまう、ある特定の種類の石。',
    '朝のだいどころから聞こえてくる、ある音の感じ。',
    '名前を決して変えないと決めている、空想の中の友だち。',
    '二度しか観ていない映画に出てくる、特別な一曲。',
    '同じ本を七回くりかえし読む。',
    '厳密には登るためのものでない場所に登ること。',
    '同じ動物を、何度も何度も描き続けること。',
    'ソファのうしろにある、ふたりだけのかくれ場所。',
    '親友のあの笑い方、そっくりそのまま。',
    '他の人にはなんでもないように見える、お気に入りの一枚のブランケット。',
    'ぐるぐる回って、転んでしまうまで回ること。',
    '自分で考えた、ある「ノックノック・ジョーク」。',
    '秋に落ち葉を踏んだときの、あのカサカサした音。',
    'あこがれている、いとこやいとこのような存在の人。',
    'シール——とにかく、シールというカテゴリ全部。',
    '自分でつけた名前で呼んでいる虫。',
    '胸の上に本を乗せたまま、眠ってしまうこと。',
    '完全に頭に入っている、ある一頭の恐竜。',
    'ある特定の鉛筆消しゴムの、あのにおい。',
    'ツリーハウス。あるいは、本気で「ほしい」と願う気持ちのほう。'
  ],
  ko: [
    '자꾸만 또 만나게 되는 특정한 종류의 돌멩이.',
    '아침마다 부엌에서 들리는 그 소리.',
    '절대 이름을 바꾸지 않을 상상 속 친구 한 명.',
    '단 두 번 본 영화 속의 그 특별한 노래.',
    '같은 책을 일곱 번 읽는 일.',
    '사실은 올라가면 안 되는 것들에 올라가기.',
    '같은 동물을 자꾸자꾸 그리는 일.',
    '소파 뒤에 있는 비밀스러운 숨을 곳.',
    '가장 친한 친구의 그 웃음, 그대로.',
    '다른 사람 눈에는 전혀 특별해 보이지 않는 담요 한 장.',
    '빙글빙글 돌다가 쓰러질 때까지.',
    '스스로 만들어낸 똑똑똑(knock-knock) 농담 하나.',
    '가을, 낙엽을 밟을 때 나는 그 바스락 소리.',
    '동경하는 사촌, 혹은 사촌 같은 누군가.',
    '스티커 — 종류 불문, 모든 스티커.',
    '자기 마음대로 붙인 이름으로 부르는 곤충 한 마리.',
    '책 한 권을 가슴에 올려두고 잠드는 일.',
    '완전히 외워버린 특정 공룡 한 마리.',
    '어떤 연필 지우개 특유의 그 냄새.',
    '트리하우스, 혹은 그것을 무척이나 진지하게 갖고 싶어 하는 마음.'
  ],
  tr: [
    'Sürekli buldukları belirli bir taş türü.',
    'Sabahları mutfağın çıkardığı o ses.',
    'Adını asla değiştirmeyecekleri bir hayali arkadaş.',
    'Yalnızca iki kere izledikleri bir filmdeki şu özel şarkı.',
    'Aynı kitabı yedi kez okumak.',
    'Aslında üstüne çıkılmamak gereken şeylere tırmanmak.',
    'Aynı hayvanı tekrar tekrar çizmek.',
    'Koltuğun arkasındaki gizli bir saklanma yeri.',
    'En iyi arkadaşlarının tam o gülüş şekli.',
    'Başka kimseye özel görünmeyen bir battaniye.',
    'Düşene kadar etrafında dönmek.',
    'Kendi uydurdukları belirli bir "tak tak" şakası.',
    'Sonbaharda yaprakların ayak altında çıtırdama sesi.',
    'Hayran oldukları bir kuzen ya da kuzen gibi biri.',
    'Çıkartmalar — kategorik olarak, her türden çıkartma.',
    'Kendi uydurdukları bir adla seslendikleri bir böcek.',
    'Göğsünde bir kitapla uykuya dalmak.',
    'Tüm ayrıntılarıyla ezberledikleri bir dinozor.',
    'Belirli bir kurşunkalem silgisinin kokusu.',
    'Bir ağaç ev — ya da bir ağaç evi çok ciddi biçimde istemek.'
  ]
};

const KIDS_QUESTIONS_FOR_THEM = {
  en: [
    'What is the best smell you can think of?',
    'Have you ever made up a word that you use a lot?',
    'If you could have any pet that does not exist, what would it be?',
    'What is the weirdest dream you remember?',
    'If your shadow had a name, what would it be?',
    'What is a song you know every word of?',
    'Have you ever made up a name for something you saw outside?',
    'What is something you used to believe was real?',
    'What sound makes you happy for no reason?',
    'What is the bravest thing you have done that nobody noticed?',
    'If you could trade places with someone for a day, who?',
    'What is a color you cannot describe to a grown-up?',
    'What does your laugh sound like to YOU?',
    'What is the best thing about being your age right now?',
    'What is a memory that feels like a movie?',
    'If you could keep one thing you have ever made or found, what would it be?',
    "What's something you'd want to know if you could ask anyone?",
    'Have you ever met a stranger you wanted to be friends with?'
  ],
  zh: [
    '你能想到的最好闻的气味是什么?',
    '你有没有自创过一个常常用的词?',
    '如果你能养一只世界上不存在的宠物,你会养什么?',
    '你记得的最奇怪的梦是什么样的?',
    '如果你的影子有名字,会叫什么?',
    '有没有一首你能完整唱出每一个字的歌?',
    '你有没有给外面看到的某样东西,自己起过一个名字?',
    '你以前曾经相信"是真的"的某件事是什么?',
    '有没有哪种声音,你听到就莫名其妙地开心?',
    '你做过的、却没人注意到的最勇敢的一件事是什么?',
    '如果可以和某个人交换一天身份,你会选谁?',
    '有没有一种颜色,是你跟大人怎么也说不清楚的?',
    '在你自己听来,自己的笑声是什么样的?',
    '处在你现在这个年龄,最棒的事情是什么?',
    '哪一段回忆,在你脑海里像一部小电影?',
    '如果只能留下一件你做过或捡到过的东西,你会留哪一件?',
    '如果可以向任何一个人提问,你最想知道什么?',
    '你有没有遇见过一个陌生人,让你很想和他/她成为朋友?'
  ],
  ja: [
    '思いつくかぎりで、いちばんいいにおいは何?',
    '自分でつくって、よく口にしている言葉ってある?',
    'この世にいないペットを一匹だけ飼えるとしたら、何にする?',
    '覚えているなかで、いちばん不思議な夢ってどんなだった?',
    'もし自分のかげに名前があったら、なんてつける?',
    '歌詞をぜんぶ歌える曲って、なにかある?',
    '外で見たものに、自分だけの名前をつけたことってある?',
    'かつて「本当だ」って信じていたことって、なに?',
    '理由なんてないのに、聞くと嬉しくなる音って、なに?',
    '誰にも気づかれなかったけど、いちばん勇気を出した出来事ってなに?',
    '一日だけ誰かと入れかわれるとしたら、誰にする?',
    '大人にうまく言葉で説明できない色って、なにかある?',
    '自分の耳で聞くと、自分の笑い声ってどんな感じ?',
    'いま、その歳でいることのいちばん楽しいことって、なに?',
    '映画みたいに残っている思い出って、どれ?',
    '自分で作ったり拾ったりしたなかで、ひとつだけ取っておけるなら、なに?',
    'だれにでも一つ質問できるとしたら、なにを聞いてみたい?',
    '友だちになりたいと思った、知らない人と出会ったことってある?'
  ],
  ko: [
    '떠올릴 수 있는 가장 좋은 냄새는 뭐예요?',
    '자기가 만들어서 자주 쓰는 단어가 있어요?',
    '세상에 없는 어떤 동물이든 키울 수 있다면, 어떤 동물을 키울래요?',
    '기억나는 꿈 중에서 가장 이상했던 건 어떤 거였어요?',
    '만약 그림자에게 이름이 있다면, 뭐라고 부를래요?',
    '가사를 한 줄도 빠짐없이 다 아는 노래가 있어요?',
    '밖에서 본 어떤 것에 자기만의 이름을 붙여 준 적 있어요?',
    '한때 진짜라고 굳게 믿었던 게 뭐였어요?',
    '별 이유 없이 들으면 그냥 기분이 좋아지는 소리는 뭐예요?',
    '아무도 알아봐 주지 않았지만, 가장 용감했던 일은 뭐였어요?',
    '하루만 누군가와 자리를 바꿀 수 있다면, 누구랑 바꿀래요?',
    '어른에게 말로는 설명이 잘 안 되는 색깔이 있어요?',
    '자기 귀에 자기 웃음소리는 어떻게 들려요?',
    '지금 이 나이에서 가장 좋은 점은 뭐예요?',
    '영화 한 편처럼 기억에 남는 추억은 뭐예요?',
    '자기가 만들었거나 주워온 것 중에 딱 하나만 간직할 수 있다면, 뭘 고를래요?',
    '누구에게든 한 가지를 물어볼 수 있다면, 뭘 알고 싶어요?',
    '한 번 보고도 친구가 되고 싶어진 낯선 사람이 있어요?'
  ],
  tr: [
    'Aklına gelen en güzel koku hangisi?',
    'Sık kullandığın, kendi uydurduğun bir kelime var mı?',
    'Var olmayan bir hayvanı evde besleyebilseydin hangisini seçerdin?',
    'Hatırladığın en tuhaf rüya hangisi?',
    'Gölgenin bir adı olsaydı ne olurdu?',
    'Tüm sözlerini ezbere bildiğin bir şarkı var mı?',
    'Dışarıda gördüğün bir şeye kendin bir ad uydurduğun oldu mu?',
    'Eskiden gerçek olduğuna inandığın bir şey ne?',
    'Sebepsiz yere mutlu eden bir ses var mı?',
    'Yaptığın ama kimsenin fark etmediği en cesur şey neydi?',
    'Bir günlüğüne biriyle yer değiştirebilseydin, kim olurdu?',
    'Bir yetişkine asla anlatamadığın bir renk var mı?',
    'Kendi gülüşün sana nasıl geliyor?',
    'Şu an bulunduğun yaşın en güzel yanı ne?',
    'Sanki bir film gibi hatırladığın bir anın var mı?',
    'Yaptığın ya da bulduğun şeylerden yalnızca birini saklayabilsen, hangisi olurdu?',
    'Herhangi birine bir soru sorabilseydin, neyi öğrenmek isterdin?',
    'Hiç tanışmadığın biriyle arkadaş olmayı istediğin oldu mu?'
  ]
};

const KIDS_DIFFERENCES = {
  en: [
    'Might be the only kid in their class who knows where the moon is right now.',
    'Might think about one specific topic for the rest of their life.',
    'Might be the first person in their family to live somewhere far away.',
    'Might keep a notebook nobody else ever reads.',
    'Might invent a game that becomes a family tradition.',
    'Might tell a joke that becomes their whole personality for a year.',
    "Might be the friend everybody's parents like.",
    'Might be the kid who knows the most about an animal nobody else cares about.',
    'Might fall in love with one sport and only that sport.',
    'Might have a recurring dream that becomes a song.',
    'Might write a story at 8 and finish it at 28.',
    'Might be the loudest kid in their family or the quietest.',
    'Might forgive someone faster than anyone expects.',
    'Might be famous in their neighborhood for one specific thing.',
    "Might know a grandparent's favorite song by heart.",
    'Might be braver than everyone around them in one specific moment.',
    "Might learn a second language at a friend's house.",
    'Might invent a snack their whole school copies for a week.'
  ],
  zh: [
    '也许是全班唯一一个知道月亮"现在在哪里"的孩子。',
    '也许会一辈子都在思考某一个特定的话题。',
    '也许会是家里第一个搬到很远的地方生活的人。',
    '也许会一直留着一本谁也没读过的笔记本。',
    '也许会发明一个变成"家庭传统"的小游戏。',
    '也许会讲一个笑话,接下来整整一年,他/她整个人就成了那个笑话。',
    '也许会是那种"所有朋友的家长都喜欢"的朋友。',
    '也许会成为对某种"没人在意"的动物了解最多的那个孩子。',
    '也许会爱上某一项运动,而且只爱那一项。',
    '也许会有一个反复出现的梦,后来变成了一首歌。',
    '也许会 8 岁开始写一个故事,直到 28 岁才把它写完。',
    '也许会是家里最吵闹的那个孩子,也可能是最安静的那个。',
    '也许会比任何人预想的都更快地原谅一个人。',
    '也许会因为某一件特定的事,在街坊邻里中"出名"。',
    '也许会把祖辈最喜欢的那首歌,完整地记在心里。',
    '也许会在某一个特定的瞬间,比身边所有人都更勇敢。',
    '也许会在朋友家学会第二种语言。',
    '也许会发明一种小零食,接下来一整周,全校都在跟着做。'
  ],
  ja: [
    'クラスでただ一人、いま月がどこにいるかを知っている子になるかも。',
    '一生のあいだ、ある一つのテーマについて考え続けるかも。',
    '家族のなかで初めて、遠く離れた場所に暮らす人になるかも。',
    '誰にも読まれることのないノートを、ずっとつけ続けるかも。',
    '家族の伝統になっていく遊びを、自分で考えだすかも。',
    '一年ぐらい、その人の「キャラ」そのものになっていくジョークを言うかも。',
    '友だち全員のお父さんお母さんから好かれる、そんな友人になるかも。',
    '誰も興味を示さない動物について、誰よりもくわしくなる子になるかも。',
    '一つのスポーツだけを、本当に好きになるかも。',
    '何度も見る夢が、いつしか歌になるかも。',
    '八歳のときに書き始めた物語を、二十八歳でやっと書き終えるかも。',
    '家族のなかでいちばんにぎやかな子になるかもしれないし、いちばん物静かな子になるかもしれない。',
    '周りの想像よりずっと早く、誰かを許してしまうかも。',
    'あるひとつのことで、ご近所のあいだでちょっと「有名な子」になるかも。',
    'おじいちゃんやおばあちゃんの大好きな一曲を、しっかりと心に覚えるかも。',
    'あるたった一つの場面で、周囲のだれよりも勇気を出すかも。',
    '友だちの家で、もう一つの言語を覚えるようになるかも。',
    '自分で考えたおやつを、一週間だけ学校じゅうがマネする、なんてことになるかも。'
  ],
  ko: [
    '반에서 유일하게, 지금 달이 어디에 있는지 아는 아이가 될지도 몰라요.',
    '평생 동안 어느 한 가지 주제만 끈질기게 생각하는 사람이 될 수도 있어요.',
    '가족 중에서 가장 먼저 먼 곳에서 살아가는 사람이 될 수도 있어요.',
    '누구도 읽지 않을 노트 한 권을 꾸준히 채워갈 수도 있어요.',
    '가족 전통이 되는 놀이를 직접 만들어낼 수도 있어요.',
    '일 년 내내 그 사람의 캐릭터가 되어버리는 농담을 던질 수도 있어요.',
    '친구들 부모님 모두에게 사랑받는 그런 친구가 될 수도 있어요.',
    '아무도 관심 없는 동물에 대해 누구보다 잘 아는 아이가 될 수 있어요.',
    '단 한 가지 운동에만 푹 빠질 수도 있어요.',
    '반복되는 꿈 하나가 훗날 노래로 태어날 수도 있어요.',
    '여덟 살에 쓰기 시작한 이야기를 스물여덟에야 끝맺을 수도 있어요.',
    '가족 안에서 가장 떠들썩한 아이가 될 수도, 가장 조용한 아이가 될 수도 있어요.',
    '누구의 예상보다도 빠르게 누군가를 용서해 줄지도 몰라요.',
    '동네에서 어떤 한 가지 일로 알아주는 아이가 될 수도 있어요.',
    '할머니나 할아버지가 가장 좋아하던 노래를 마음 깊이 외울 수도 있어요.',
    '어느 한 순간에는, 주위 누구보다도 용감해질 수 있어요.',
    '친구네 집에서 두 번째 언어를 배우게 될 수도 있어요.',
    '직접 만든 간식을 일주일 동안 학교 전체가 따라 만들지도 몰라요.'
  ],
  tr: [
    'Sınıfta şu anda ayın nerede olduğunu bilen tek çocuk olabilir.',
    'Hayatları boyunca tek bir konu üzerine düşünmeye devam edebilir.',
    'Ailesinden uzak bir yerde yaşayan ilk kişi olabilir.',
    'Hiç kimsenin okumadığı bir defter tutabilir.',
    'Aile geleneğine dönüşen bir oyunu icat edebilir.',
    'Bir yıl boyunca tüm karakterine dönüşen bir şaka anlatabilir.',
    'Tüm arkadaşlarının ailelerinin sevdiği o arkadaş olabilir.',
    'Kimsenin umursamadığı bir hayvan hakkında en çok şey bilen çocuk olabilir.',
    'Tek bir spora vurulup yalnızca onu seven biri olabilir.',
    'Tekrar tekrar gördükleri bir rüya, sonradan bir şarkıya dönüşebilir.',
    'Sekiz yaşında başladığı bir hikâyeyi yirmi sekizinde bitirebilir.',
    'Aileleri içinde en gürültücü çocuk da olabilir, en sessiz olan da.',
    'Birini kimsenin beklemediği kadar çabuk affedebilir.',
    'Mahallede tek bir şeyle tanınan kişi olabilir.',
    'Bir büyükanne ya da büyükbabasının en sevdiği şarkıyı ezbere bilebilir.',
    'Belirli bir anda etrafındaki herkesten daha cesur olabilir.',
    'İkinci bir dili bir arkadaşının evinde öğrenebilir.',
    'Bir hafta boyunca tüm okulun taklit ettiği bir atıştırmalık icat edebilir.'
  ]
};

const KIDS_TRAIT_CONFLICTS = [
  {
    when: b => b.openness >= 8 && b.conscientiousness <= 4,
    tag: 'Lots of ideas, sometimes scattered',
    note: 'Loves starting new things. Finishing can be harder. That\'s okay — many small starts are also wins.',
    i18n: {
      zh: { tag: '想法很多,有时跳来跳去', note: '喜欢开始新东西,做完会比较难。这没关系——很多小小的开始本身就是赢。' },
      ja: { tag: 'アイデアいっぱい、ちょっとあちこち', note: '新しいことを始めるのが大好き。最後までやり切るのは難しいこともある。それでだいじょうぶ——小さな「はじめ」もたくさんの勝ちです。' },
      ko: { tag: '아이디어는 많고, 가끔은 흩어지는', note: '새로 시작하는 걸 좋아해요. 끝까지 하는 건 어려울 수도 있어요. 그래도 괜찮아요 — 작은 시작도 많은 승리예요.' },
      tr: { tag: 'Bol fikir, biraz dağınık', note: 'Yeni şeylere başlamayı çok sever. Bitirmek zor olabilir. Sorun değil — küçük başlangıçlar da birer zafer.' }
    }
  },
  {
    when: b => b.conscientiousness >= 8 && b.neuroticism >= 7,
    tag: 'A careful, sometimes worried kid',
    note: 'Pays attention to details, and sometimes worries about getting things right. Lots of calm time helps.',
    i18n: {
      zh: { tag: '细心、有时也会担心的孩子', note: '注意细节,有时会担心做不好。多一些安静的时间会有帮助。' },
      ja: { tag: 'ていねいで、ときどき心配性な子', note: '細かいことに気がつき、上手にできるか心配することもある。落ち着く時間がたっぷりあるといい。' },
      ko: { tag: '꼼꼼하고, 가끔은 걱정도 많은 아이', note: '작은 것까지 살피지만, 잘 해내야 한다고 걱정할 때도 있어요. 마음을 가라앉히는 시간이 충분히 도움이 돼요.' },
      tr: { tag: 'Dikkatli, zaman zaman endişeli bir çocuk', note: 'Ayrıntılara dikkat eder, bazen "doğru yapamamak"tan endişelenir. Bol sakin zaman iyi gelir.' }
    }
  },
  {
    when: b => b.openness >= 8 && b.extraversion <= 3,
    tag: 'A big imagination, in a quieter space',
    note: 'Has a rich world inside their head. They might share it with one or two close friends.',
    i18n: {
      zh: { tag: '大大的想象,留在安静的小空间', note: '脑袋里有一个丰盛的世界。也许只会跟一两个亲近的朋友分享。' },
      ja: { tag: '大きな想像、しずかな場所で', note: '頭のなかにゆたかな世界をもつ。それを一人か二人の親しい友だちに見せるかも。' },
      ko: { tag: '큰 상상력, 더 조용한 자리에서', note: '머릿속에 풍성한 세계가 있어요. 그건 한두 명의 친한 친구에게만 나눌 수도 있어요.' },
      tr: { tag: 'Büyük bir hayal gücü, daha sessiz bir alanda', note: 'Kafasının içinde zengin bir dünya var. Bunu bir ya da iki yakın arkadaşıyla paylaşabilir.' }
    }
  },
  {
    when: b => b.agreeableness >= 8 && b.extraversion <= 3,
    tag: 'A gentle, thoughtful friend',
    note: 'Kind in small groups. People who get to know them feel lucky.',
    i18n: {
      zh: { tag: '温柔体贴的好朋友', note: '在小群体里很温暖。认识他们的人都觉得自己很幸运。' },
      ja: { tag: 'やさしくて、よく気がつく友だち', note: '少人数のなかでとてもやさしい。知り合えた人たちは「ラッキー」と感じる。' },
      ko: { tag: '다정하고 사려 깊은 친구', note: '작은 모임에서는 더없이 따뜻해요. 가깝게 지낸 사람들은 운이 좋다고 느껴요.' },
      tr: { tag: 'Yumuşak başlı, düşünceli bir arkadaş', note: 'Küçük gruplarda çok kibardır. Onu tanıyanlar kendilerini şanslı sayar.' }
    }
  },
  {
    when: b => b.extraversion >= 8 && b.neuroticism >= 7,
    tag: 'Sparkles in public, recharges in private',
    note: 'Loves being around people. Also needs quiet time afterwards to refill.',
    i18n: {
      zh: { tag: '在人前闪闪发光,在独处时充电', note: '喜欢和大家在一起。之后也需要安静的时间把自己再装满。' },
      ja: { tag: 'みんなのなかで輝いて、ひとりの時間で充電する', note: '人と一緒にいるのが大好き。そのあとに、ひとりで満たし直すしずかな時間も必要。' },
      ko: { tag: '사람들 앞에선 반짝, 혼자선 충전', note: '사람들과 어울리는 걸 좋아해요. 그러고 나면 다시 채울 조용한 시간도 필요해요.' },
      tr: { tag: 'Sahnede parlar, yalnızken doldurur', note: 'İnsanlarla olmayı çok sever. Sonrasında kendini yeniden doldurmak için sessiz zamana ihtiyacı vardır.' }
    }
  },
  {
    when: b => b.athletic >= 8 && b.conscientiousness <= 3,
    tag: 'Lots of energy, lots of motion',
    note: 'Needs space to run, jump, climb. Structure helps channel all that joy.',
    i18n: {
      zh: { tag: '满满的能量,满满的动力', note: '需要奔跑、跳跃、攀爬的空间。一点点结构会帮这份快乐找到方向。' },
      ja: { tag: 'あふれるエネルギー、たくさんの動き', note: '走ったり、跳んだり、登ったりする場所が必要。少しの「型」があると、そのよろこびが行き場を見つける。' },
      ko: { tag: '가득 찬 에너지, 끊임없는 움직임', note: '달리고 뛰고 오를 공간이 필요해요. 약간의 틀이 그 즐거움에 길을 내줘요.' },
      tr: { tag: 'Bol enerji, bol hareket', note: 'Koşmak, zıplamak, tırmanmak için alana ihtiyaç duyar. Birazcık yapı, bu coşkuya yön bulmasına yardım eder.' }
    }
  },
  {
    when: b => b.openness >= 8 && b.agreeableness <= 3,
    tag: 'A questioner who likes to challenge ideas',
    note: 'Will ask \"why?\" a lot. May respectfully disagree with grown-ups.',
    i18n: {
      zh: { tag: '喜欢追问、爱挑战想法的孩子', note: '会问很多次"为什么"。也可能很礼貌地不同意大人。' },
      ja: { tag: '「なんで?」と問いかけ、考えに挑む子', note: '「どうして?」をたくさん口にする。大人にも、ていねいに反対意見を言うかも。' },
      ko: { tag: '묻고 따지는 걸 좋아하는 아이', note: '"왜?" 라고 자주 물어요. 어른의 말에도 정중하게 다른 의견을 낼 수 있어요.' },
      tr: { tag: 'Sorgulayan, fikirlere meydan okumayı seven biri', note: 'Çokça "neden?" diye soracak. Büyüklerine kibarca itiraz edebilir.' }
    }
  },
  {
    when: b => b.conscientiousness <= 3 && b.neuroticism <= 3,
    tag: 'Sunny and a little wiggly',
    note: 'Cheerful and easygoing. Routines help — and that\'s okay to need.',
    i18n: {
      zh: { tag: '阳光,有点动来动去', note: '开朗、随和。一些固定的小习惯会有帮助——需要它们也完全没关系。' },
      ja: { tag: '明るくて、ちょっとそわそわ', note: '朗らかで、ゆったりしている。決まった習慣があると助けになる——それを「必要」とすることはまったく問題ない。' },
      ko: { tag: '밝고, 살짝 들썩이는', note: '명랑하고 느긋해요. 일정한 루틴이 도움이 돼요 — 그게 필요한 것도 괜찮아요.' },
      tr: { tag: 'Güneşli, biraz hareketli', note: 'Neşeli ve rahat. Rutinler işe yarar — ve buna ihtiyaç duyması son derece doğal.' }
    }
  },
  {
    when: b => b.agreeableness >= 8 && b.neuroticism <= 3,
    tag: 'Steady kindness',
    note: 'Calm and warm. The kind of kid friends naturally gather around.',
    i18n: {
      zh: { tag: '稳稳的善意', note: '平和又温暖。是朋友们自然而然就会围过来的那种孩子。' },
      ja: { tag: '揺るがないやさしさ', note: 'おだやかで、あたたかい。友だちが自然と集まってくる、そういう子。' },
      ko: { tag: '흔들리지 않는 다정함', note: '차분하고 따뜻해요. 친구들이 자연스레 곁으로 모이는 아이.' },
      tr: { tag: 'Sarsılmaz bir nezaket', note: 'Sakin ve sıcak. Arkadaşlarının doğal olarak etrafında toplandığı türden bir çocuk.' }
    }
  },
  {
    when: b => b.extraversion <= 3 && b.openness >= 8 && b.conscientiousness >= 7,
    tag: 'A quiet maker',
    note: 'Likes making things on their own. Often happiest with their own little project.',
    i18n: {
      zh: { tag: '安静的创造者', note: '喜欢一个人做东西。常常和自己的小项目在一起时最开心。' },
      ja: { tag: '静かな作り手', note: '自分ひとりで何かを作るのが好き。自分だけの小さな計画と一緒にいるときが、いちばん楽しそう。' },
      ko: { tag: '조용히 만드는 아이', note: '혼자서 무언가 만드는 걸 좋아해요. 자기만의 작은 프로젝트와 있을 때 가장 행복해해요.' },
      tr: { tag: 'Sessiz bir kurucu', note: 'Tek başına bir şeyler yapmaktan hoşlanır. Kendi küçük projesiyle baş başayken en mutludur.' }
    }
  }
];

const KIDS_ADULT_FUTURES = [
  { headline: 'Maybe a teacher who really listens.', details: ['Knows every student\'s name on day one.', 'Keeps a treasure box of student art.', 'Always has chalk dust on at least one sleeve.'], tags: ['family','education'],
    i18n: {
      zh: { headline: '也许会成为一位真心倾听的老师。', details: ['开学第一天就能叫出每个学生的名字。', '收藏着一个装满学生作品的"宝盒"。', '袖子上多少总沾着一些粉笔灰。'] },
      ja: { headline: 'もしかしたら、ちゃんと話を聞いてくれる先生に。', details: ['新学期初日に、全員の名前を覚えている。', '生徒の作品を入れた「たからばこ」を大切にしている。', '袖のどこかにいつもチョークの粉がついている。'] },
      ko: { headline: '진심으로 귀 기울이는 선생님이 될지도 몰라요.', details: ['새 학기 첫날부터 모든 학생의 이름을 외운다.', '학생들의 작품을 모아둔 보물 상자가 있다.', '어느 한쪽 소매에는 늘 분필 가루가 묻어 있다.'] },
      tr: { headline: 'Belki gerçekten dinleyen bir öğretmen olur.', details: ['İlk gün her öğrencisinin adını bilir.', 'Öğrenci eserlerinden oluşan bir "hazine kutusu" tutar.', 'Bir koluna her zaman tebeşir tozu sürülmüştür.'] }
    } },
  { headline: 'Maybe a veterinarian for tiny animals.', details: ['Has rescued at least two birds.', 'Talks to dogs in a special soothing voice.', 'Owns one very dramatic cat.'], tags: ['family','healthcare'],
    i18n: {
      zh: { headline: '也许会成为照顾小动物的兽医。', details: ['至少救助过两只小鸟。', '对狗狗说话时,声音特别温柔。', '家里有一只戏精级别的猫。'] },
      ja: { headline: 'もしかしたら、小さな動物を診る獣医さんに。', details: ['少なくとも二羽の小鳥を助けたことがある。', '犬には特別やさしい声で話しかける。', 'とてもドラマチックな猫を一匹飼っている。'] },
      ko: { headline: '작은 동물을 돌보는 수의사가 될지도 몰라요.', details: ['적어도 새 두 마리를 구조해 본 적이 있다.', '강아지에게 말할 때는 특별히 부드러운 목소리를 쓴다.', '몹시 드라마틱한 고양이 한 마리를 키운다.'] },
      tr: { headline: 'Belki küçük hayvanların veterineri olur.', details: ['En az iki kuş kurtarmıştır.', 'Köpeklerle özel, yumuşak bir sesle konuşur.', 'Çok dramatik bir kedisi vardır.'] }
    } },
  { headline: 'Maybe a builder of cool things.', details: ['Carries a small notebook for ideas everywhere.', 'Has rebuilt their own bookshelf three times.', 'Loves the smell of fresh wood.'], tags: ['education'],
    i18n: {
      zh: { headline: '也许会成为做"酷东西"的工匠。', details: ['口袋里随时带着一本小本子记灵感。', '把自己房间的书架重做过三次。', '喜欢新切木头的味道。'] },
      ja: { headline: 'もしかしたら、かっこいいものを作る人に。', details: ['アイデア用の小さなノートをいつも持ち歩いている。', '自分の本棚を三度作り直したことがある。', '削りたての木のにおいが大好き。'] },
      ko: { headline: '멋진 것들을 만드는 사람이 될지도 몰라요.', details: ['아이디어용 작은 수첩을 늘 가지고 다닌다.', '자기 책장을 세 번이나 다시 만든 적이 있다.', '갓 깎은 나무 냄새를 사랑한다.'] },
      tr: { headline: 'Belki havalı şeyler yapan biri olur.', details: ['Her yere küçük bir fikir defteri taşır.', 'Kendi kitaplığını üç kez yeniden yapmıştır.', 'Taze ağaç kokusuna bayılır.'] }
    } },
  { headline: 'Maybe an artist who makes happy work.', details: ['Paints something almost every day.', 'Friends always have art on their walls.', 'Tea consumption: cozy.'], tags: ['social','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为画快乐作品的艺术家。', details: ['几乎每天都画点什么。', '朋友家的墙上总能看到她/他的画。', '茶饮消耗量:暖暖的小日子级别。'] },
      ja: { headline: 'もしかしたら、人を笑顔にする作品を作るアーティストに。', details: ['ほぼ毎日、なにかしらを描いている。', '友人たちの部屋の壁には、いつもその人の絵がある。', 'お茶の消費量は「ほっこり」レベル。'] },
      ko: { headline: '행복한 그림을 그리는 작가가 될지도 몰라요.', details: ['거의 매일 무언가를 그린다.', '친구네 집 벽에는 늘 그/그녀의 작품이 걸려 있다.', '차 소비량: 포근함 그 자체.'] },
      tr: { headline: 'Belki insanı mutlu eden işler üreten bir sanatçı olur.', details: ['Neredeyse her gün bir şeyler boyar.', 'Arkadaşlarının duvarlarında hep onun bir resmi vardır.', 'Çay tüketimi: sıcacık.'] }
    } },
  { headline: 'Maybe a scientist asking giant questions.', details: ['Reads about space before bed.', 'Has a notebook full of \"why?\" questions.', 'Notices the small differences everyone else walks past.'], tags: ['education'],
    i18n: {
      zh: { headline: '也许会成为追问大问题的科学家。', details: ['睡前会读关于宇宙的书。', '本子里写满了一个又一个"为什么"。', '总能注意到别人匆匆走过、不曾留意的那些小差别。'] },
      ja: { headline: 'もしかしたら、大きな問いを追いかける科学者に。', details: ['寝る前に宇宙の本を読む。', '「どうして?」がぎっしり書きこまれたノートを持っている。', 'みんなが気づかずに通り過ぎる、小さなちがいに目をとめる。'] },
      ko: { headline: '커다란 질문을 던지는 과학자가 될지도 몰라요.', details: ['자기 전에 우주에 대한 책을 읽는다.', '"왜?"로 가득 찬 공책 한 권이 있다.', '다들 그냥 지나치는 작은 차이들을 놓치지 않고 알아챈다.'] },
      tr: { headline: 'Belki kocaman sorular soran bir bilim insanı olur.', details: ['Uyumadan önce uzayla ilgili kitap okur.', '"Neden?" sorularıyla dolu bir defteri vardır.', 'Herkesin yanından geçip gittiği küçük farkları o fark eder.'] }
    } },
  { headline: 'Maybe a gardener with the greenest yard around.', details: ['Knows every plant in the neighborhood.', 'Trades tomato seeds with friends.', 'Hums while watering.'], tags: ['urbanRural','family'],
    i18n: {
      zh: { headline: '也许会成为院子最绿的园丁。', details: ['认得社区里每一株植物。', '常和朋友交换番茄种子。', '浇水时会哼歌。'] },
      ja: { headline: 'もしかしたら、町でいちばん緑いっぱいの庭をもつ庭師に。', details: ['ご近所の植物すべてを覚えている。', '友だちとトマトの種を交換している。', '水やりをしながら鼻歌を歌う。'] },
      ko: { headline: '동네에서 가장 푸른 마당을 가진 정원사가 될지도 몰라요.', details: ['동네의 모든 식물을 안다.', '친구들과 토마토 씨앗을 주고받는다.', '물을 주며 흥얼흥얼 노래를 부른다.'] },
      tr: { headline: 'Belki mahallenin en yeşil bahçesine sahip bahçıvan olur.', details: ['Mahalledeki her bitkiyi tanır.', 'Arkadaşlarıyla domates tohumu takas eder.', 'Sulama yaparken mırıldanır.'] }
    } },
  { headline: 'Maybe a chef who feeds the whole street.', details: ['Sundays smell like fresh bread.', 'Has a notebook full of family recipes.', 'Friends drop by hoping for leftovers.'], tags: ['family'],
    i18n: {
      zh: { headline: '也许会成为给整条街做饭的厨师。', details: ['星期天总弥漫着新鲜面包的香味。', '本子里写满了家族传下来的食谱。', '朋友们会"顺路"过来,盼着能蹭点剩菜。'] },
      ja: { headline: 'もしかしたら、ご近所みんなに振る舞うシェフに。', details: ['日曜日は、いつも焼きたてパンの匂いがする。', '家のレシピがぎっしり書かれたノートを持っている。', '友だちが「残りものない?」と立ち寄ってくる。'] },
      ko: { headline: '온 동네를 먹이는 셰프가 될지도 몰라요.', details: ['일요일이면 갓 구운 빵 냄새가 난다.', '집안 레시피로 가득 찬 노트가 있다.', '친구들은 남은 음식이 있을까 기대하며 들른다.'] },
      tr: { headline: 'Belki tüm sokağı doyuran bir aşçı olur.', details: ['Pazarları taze ekmek kokar.', 'Aile tariflerinin yazıldığı dolu bir defteri vardır.', 'Arkadaşları "artakalan var mı?" umuduyla uğrar.'] }
    } },
  { headline: 'Maybe a doctor who is great with kids.', details: ['Has a sticker for every check-up.', 'Tells gentle jokes during scary moments.', 'Office is decorated with crayon drawings.'], tags: ['healthcare','family'],
    i18n: {
      zh: { headline: '也许会成为很会哄孩子的医生。', details: ['每次体检后都会送一枚贴纸。', '在害怕的时刻讲温柔的小笑话。', '诊室里挂满了蜡笔画。'] },
      ja: { headline: 'もしかしたら、子どもの扱いが上手なお医者さんに。', details: ['診察ごとに、ちいさなシールをプレゼントする。', '怖い場面で、やさしい冗談を言う。', '診察室はクレヨンの絵でいっぱい。'] },
      ko: { headline: '아이들을 잘 다루는 의사가 될지도 몰라요.', details: ['진료할 때마다 스티커를 하나 챙겨준다.', '무서운 순간에도 다정한 농담을 건넨다.', '진료실이 크레용 그림으로 가득하다.'] },
      tr: { headline: 'Belki çocuklarla arası harika olan bir doktor olur.', details: ['Her muayenede bir çıkartma verir.', 'Korkutucu anlarda yumuşacık şakalar yapar.', 'Muayenehanesi mum boya resimlerle süslüdür.'] }
    } },
  { headline: 'Maybe an inventor of small clever gadgets.', details: ['Has built three useful tools that don\'t exist anywhere else.', 'Builds tools that solve problems for people around them.', 'Friends bring them tricky problems.'], tags: ['education','economy'],
    i18n: {
      zh: { headline: '也许会成为发明小巧机灵小工具的人。', details: ['做出过三件别的地方找不到的实用小工具。', '制作能为身边的人解决问题的工具。', '朋友们一遇到棘手的小问题就来找她/他。'] },
      ja: { headline: 'もしかしたら、小さくて気の利いた道具を発明する人に。', details: ['他には存在しない、便利な道具を三つ作ったことがある。', 'まわりの人の困りごとを解く道具をつくる。', '友だちは困った時にその人を頼ってくる。'] },
      ko: { headline: '작고 영리한 도구를 만드는 발명가가 될지도 몰라요.', details: ['세상에 없던 실용적인 도구를 세 개 만든 적이 있다.', '주변 사람들의 문제를 풀어줄 도구를 만든다.', '친구들은 곤란한 일이 생기면 그 사람을 찾아온다.'] },
      tr: { headline: 'Belki küçük, akıllı aletlerin mucidi olur.', details: ['Başka hiçbir yerde olmayan üç işe yarar alet yaptı.', 'Çevresindeki insanların sorunlarını çözen aletler yapar.', 'Arkadaşları zor sorunları ona getirir.'] }
    } },
  { headline: 'Maybe a librarian who knows every story.', details: ['Reads to little kids every Saturday.', 'Has a list of \"underrated\" books.', 'Knows which shelves the kids hide behind on rainy days.'], tags: ['education','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为熟知每一个故事的图书管理员。', details: ['每周六给小朋友读绘本。', '随身带着一份"被低估的好书"清单。', '清楚下雨天孩子们会躲在哪几排书架后面。'] },
      ja: { headline: 'もしかしたら、すべての物語を知る図書館員さんに。', details: ['毎週土曜日に、小さな子たちに絵本を読み聞かせる。', '「過小評価されている本」のリストを持っている。', '雨の日に子どもたちがどの本棚の影に隠れるか、全部知っている。'] },
      ko: { headline: '모든 이야기를 아는 사서가 될지도 몰라요.', details: ['토요일마다 어린이들에게 책을 읽어준다.', '"숨겨진 명작" 목록을 늘 가지고 다닌다.', '비 오는 날 아이들이 어느 책장 뒤에 숨는지 안다.'] },
      tr: { headline: 'Belki her hikâyeyi bilen bir kütüphaneci olur.', details: ['Her cumartesi minik çocuklara kitap okur.', '"Hak ettiği değeri görmeyen" kitaplardan bir listesi vardır.', 'Yağmurlu günlerde çocukların hangi rafların arkasına saklandığını bilir.'] }
    } },
  { headline: 'Maybe an animal trainer at a sanctuary.', details: ['Speaks softly to bigger animals.', 'Knows every dog at the local park by name.', 'Has at least one rescue story to tell.'], tags: ['family','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为动物收容所里的训练员。', details: ['对体型大的动物总轻声细语。', '认得社区公园里每只狗的名字。', '至少有一个救援故事可以讲。'] },
      ja: { headline: 'もしかしたら、動物保護施設のトレーナーに。', details: ['大きな動物にはやさしく、しずかに話しかける。', '近所の公園にいる犬の名前を全部覚えている。', '救助のエピソードを少なくとも一つは話せる。'] },
      ko: { headline: '동물 보호소의 트레이너가 될지도 몰라요.', details: ['덩치 큰 동물에게도 부드럽게 말한다.', '동네 공원에 사는 모든 개의 이름을 안다.', '들려줄 수 있는 구조 이야기가 최소한 하나는 있다.'] },
      tr: { headline: 'Belki bir barınakta hayvan eğitmeni olur.', details: ['Daha büyük hayvanlarla yumuşak bir sesle konuşur.', 'Mahalle parkındaki her köpeği adıyla bilir.', 'Anlatacak en az bir kurtarma hikâyesi vardır.'] }
    } },
  { headline: 'Maybe a writer of charming little books.', details: ['Writes by hand in tiny journals.', 'Posts gentle stories online.', 'Friends quote their books on birthdays.'], tags: ['education','social'],
    i18n: {
      zh: { headline: '也许会成为写小巧迷人小书的作者。', details: ['用手在小小的本子上写字。', '在网上发布温柔的小故事。', '朋友们生日时会引用她/他书里的句子。'] },
      ja: { headline: 'もしかしたら、ちいさくて愛おしい本を書く作家に。', details: ['ちいさな手帳に、手書きで文章を綴っている。', 'やさしい物語をネットにそっと載せる。', '友だちは誕生日に、その本の一節を引用してくれる。'] },
      ko: { headline: '사랑스러운 작은 책의 작가가 될지도 몰라요.', details: ['작은 노트에 손글씨로 글을 쓴다.', '온라인에 부드러운 이야기를 올린다.', '친구들은 생일에 그 책의 문장을 인용해준다.'] },
      tr: { headline: 'Belki minicik, sevimli kitaplar yazan bir yazar olur.', details: ['Küçücük defterlere elle yazar.', 'Yumuşacık hikâyeler internete koyar.', 'Arkadaşları doğum günlerinde onun kitaplarından alıntı yapar.'] }
    } },
  { headline: 'Maybe an athlete who also coaches younger kids.', details: ['Wakes up early for practice, smiles anyway.', 'Buys orange slices for the team.', 'Cheers loudest from the sidelines.'], tags: ['urbanRural','family'],
    i18n: {
      zh: { headline: '也许会成为同时也教小朋友的运动员。', details: ['早起训练,还是笑得很灿烂。', '比赛日给队员买橙子。', '在场边喊得最大声。'] },
      ja: { headline: 'もしかしたら、年下の子のコーチも務める選手に。', details: ['早起きの練習も、にこにこ顔で乗りこえる。', '試合の日にはチームのためにオレンジを差し入れる。', 'サイドラインからいちばん大きな声で応援する。'] },
      ko: { headline: '어린 후배도 가르치는 운동선수가 될지도 몰라요.', details: ['새벽 훈련에도 웃으며 일어난다.', '경기 날 팀을 위해 오렌지를 사 온다.', '벤치 옆에서 가장 큰 목소리로 응원한다.'] },
      tr: { headline: 'Belki aynı zamanda küçük çocuklara koçluk yapan bir sporcu olur.', details: ['Antrenmana erken kalkar, yine de gülümser.', 'Takım için portakal dilimleri alır.', 'Kenardan en yüksek sesle tezahürat yapar.'] }
    } },
  { headline: 'Maybe a musician who makes everyone want to dance.', details: ['Plays at neighborhood parties.', 'Writes one song a month.', 'Borrows instruments from anyone who\'ll lend; plays whatever lands in their hands.'], tags: ['social'],
    i18n: {
      zh: { headline: '也许会成为让大家忍不住跳舞的音乐人。', details: ['在社区聚会上演奏。', '每月写一首新歌。', '愿意借出来的乐器,都借来弹一弹;到手什么就玩什么。'] },
      ja: { headline: 'もしかしたら、聴いた人を踊りたくさせる音楽家に。', details: ['ご近所のパーティーで演奏する。', '一か月にひとつ、新しい曲をつくる。', '貸してくれる人がいれば、どの楽器でも借りる。手元に来たものを、その場で奏でる。'] },
      ko: { headline: '모두를 춤추게 만드는 음악가가 될지도 몰라요.', details: ['동네 파티에서 연주한다.', '한 달에 한 곡씩 새 노래를 쓴다.', '빌려주는 사람만 있으면 어떤 악기든 빌린다. 손에 들어온 것을, 그 자리에서 연주한다.'] },
      tr: { headline: 'Belki herkesi dans ettiren bir müzisyen olur.', details: ['Mahalle partilerinde çalar.', 'Ayda bir şarkı yazar.', 'Veren olursa her enstrümanı ödünç alır; eline ne geçerse onu çalar.'] }
    } },
  { headline: 'Maybe an explorer of wild places.', details: ['Goes camping in every season.', 'Photographs every interesting bird.', 'Writes postcards from each trip.'], tags: ['urbanRural','education'],
    i18n: {
      zh: { headline: '也许会成为野外探险家。', details: ['一年四季都去露营。', '看到有趣的小鸟就拍下来。', '每趟旅行都会寄明信片回家。'] },
      ja: { headline: 'もしかしたら、自然のなかを歩く探検家に。', details: ['一年中、季節を問わずキャンプに行く。', '気になる鳥を見つけたら必ず写真に撮る。', '旅先からハガキを送ってくれる。'] },
      ko: { headline: '야생의 장소를 누비는 탐험가가 될지도 몰라요.', details: ['사계절 내내 캠핑을 다닌다.', '눈에 띄는 새가 있으면 다 사진에 담는다.', '여행지에서마다 엽서를 보낸다.'] },
      tr: { headline: 'Belki vahşi yerlerin kâşifi olur.', details: ['Her mevsim kampa gider.', 'Gördüğü her ilginç kuşu fotoğraflar.', 'Her seyahatten bir kartpostal yollar.'] }
    } },
  { headline: 'Maybe a designer of fun new games.', details: ['Has invented a card game with 12 rules.', 'Playtests on a circle of patient friends.', 'Always carries a deck of cards.'], tags: ['education','social'],
    i18n: {
      zh: { headline: '也许会成为发明好玩新游戏的设计师。', details: ['做出过一款有 12 条规则的卡牌游戏。', '在一群有耐心的朋友身上做"内测"。', '随身带一副扑克牌。'] },
      ja: { headline: 'もしかしたら、楽しい新作ゲームを作るデザイナーに。', details: ['12個のルールがあるカードゲームを発明した。', '辛抱強い友人たちにテストプレイしてもらう。', 'いつもカードを一組持ち歩いている。'] },
      ko: { headline: '재미있는 새 게임을 만드는 디자이너가 될지도 몰라요.', details: ['규칙 12개짜리 카드 게임을 만들어 본 적이 있다.', '인내심 있는 친구들에게 플레이테스트를 부탁한다.', '늘 카드 한 벌을 들고 다닌다.'] },
      tr: { headline: 'Belki eğlenceli yeni oyunlar tasarlayan biri olur.', details: ['On iki kurallı bir kart oyunu icat etti.', 'Sabırlı arkadaşlarının oluşturduğu bir çevrede oyununu test eder.', 'Cebinde hep bir deste kâğıt taşır.'] }
    } },
  { headline: 'Maybe a translator helping people understand each other.', details: ['Speaks two languages.', 'Has pen pals on three continents.', 'Owns a shelf of dictionaries.'], tags: ['multilingual','education'],
    i18n: {
      zh: { headline: '也许会成为帮人彼此理解的翻译。', details: ['会说两种语言。', '在三个大洲都有笔友。', '家里有一整排词典。'] },
      ja: { headline: 'もしかしたら、人と人をつなぐ翻訳者に。', details: ['二つの言語を話す。', '三つの大陸に文通相手がいる。', '辞書がずらりと並んだ本棚を持っている。'] },
      ko: { headline: '사람들이 서로를 이해하도록 돕는 번역가가 될지도 몰라요.', details: ['두 가지 언어를 한다.', '세 개 대륙에 펜팔 친구가 있다.', '사전이 한 줄 가득 꽂힌 책장이 있다.'] },
      tr: { headline: 'Belki insanların birbirini anlamasına yardım eden bir çevirmen olur.', details: ['İki dil konuşur.', 'Üç ayrı kıtada mektup arkadaşı vardır.', 'Sözlüklerle dolu bir rafı vardır.'] }
    } },
  { headline: 'Maybe a maker of beautiful clothes.', details: ['Sews most of what they wear.', 'Sells small batches at local markets.', 'Has saved every fabric scrap since age 10.'], tags: ['social','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为做漂亮衣服的人。', details: ['身上的衣服大多是自己缝的。', '在本地市集少量出售作品。', '从 10 岁起就保留着每一块碎布。'] },
      ja: { headline: 'もしかしたら、すてきな服を仕立てる人に。', details: ['着ている服のほとんどを自分で縫う。', '地元の市で少量だけ販売する。', '10歳の頃から、はぎれを一つ残らずとってある。'] },
      ko: { headline: '예쁜 옷을 만드는 사람이 될지도 몰라요.', details: ['입는 옷의 대부분을 직접 바느질해 만든다.', '동네 마켓에서 소량으로 판다.', '열 살 때부터 자투리 천을 하나도 빠짐없이 모아왔다.'] },
      tr: { headline: 'Belki güzel kıyafetler yapan biri olur.', details: ['Giydiği şeylerin çoğunu kendi diker.', 'Yerel pazarlarda küçük partiler hâlinde satar.', 'On yaşından beri her kumaş parçasını saklamıştır.'] }
    } },
  { headline: 'Maybe a counselor who helps people feel okay.', details: ['Listens really well.', 'Keeps fresh flowers in the office.', 'Knows when to say something — and when to wait.'], tags: ['healthcare','family'],
    i18n: {
      zh: { headline: '也许会成为帮人安顿心情的咨询师。', details: ['特别会听人讲话。', '办公室里总放着新鲜的花。', '知道什么时候要说话——也知道什么时候要等一等。'] },
      ja: { headline: 'もしかしたら、人の心を落ち着けるカウンセラーに。', details: ['本当によく話を聞く。', '相談室にはいつも新しい花が飾られている。', '言葉をかける時と、待つ時を心得ている。'] },
      ko: { headline: '사람들의 마음을 다독여주는 상담사가 될지도 몰라요.', details: ['정말로 잘 듣는다.', '상담실에는 늘 신선한 꽃이 놓여 있다.', '말을 건넬 때와 기다려야 할 때를 안다.'] },
      tr: { headline: 'Belki insanların iyi hissetmesine yardım eden bir danışman olur.', details: ['Gerçekten iyi dinler.', 'Ofisinde her zaman taze çiçek bulunur.', 'Ne zaman bir şey söylemesi gerektiğini — ve ne zaman beklemesi gerektiğini bilir.'] }
    } },
  { headline: 'Maybe a baker famous for one specific cookie.', details: ['The recipe is a kind of secret.', 'Donates extras to the local school.', 'Apron is older than them.'], tags: ['family','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为以一款饼干闻名的烘焙师。', details: ['配方有点像家族秘方。', '多出来的饼干会送给附近的学校。', '围裙的年纪比自己还大。'] },
      ja: { headline: 'もしかしたら、特定のひとつのクッキーで有名になるパン職人に。', details: ['そのレシピは、ちょっとした秘密。', '余りは地元の学校に寄付する。', '愛用のエプロンは、本人より年上。'] },
      ko: { headline: '단 한 가지 쿠키로 유명한 베이커가 될지도 몰라요.', details: ['그 레시피는 일종의 비밀이다.', '남은 쿠키는 동네 학교에 기부한다.', '앞치마가 자기보다 나이가 많다.'] },
      tr: { headline: 'Belki belirli bir kurabiyesiyle ünlü bir fırıncı olur.', details: ['Tarif biraz da sır gibidir.', 'Artanları yerel okula bağışlar.', 'Önlüğü kendisinden daha yaşlıdır.'] }
    } },
  { headline: 'Maybe an astronomer who throws stargazing nights.', details: ['Knows the night sky so well they teach others.', 'Knows the names of dozens of stars.', 'Brings hot cocoa to every event.'], tags: ['education','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为举办观星之夜的天文学家。', details: ['对夜空熟到能给别人讲星星。', '能叫出几十颗星星的名字。', '每次活动都带上热可可。'] },
      ja: { headline: 'もしかしたら、星見の夜を主催する天文学者に。', details: ['夜空をよく知っていて、人に教えられるほどになっている。', '何十もの星の名前を覚えている。', 'イベントには必ずホットココアを持っていく。'] },
      ko: { headline: '별 보는 밤을 여는 천문학자가 될지도 몰라요.', details: ['밤하늘을 너무 잘 알아서, 다른 사람들에게 알려줄 정도다.', '별 수십 개의 이름을 알고 있다.', '행사 때마다 핫코코아를 준비해 온다.'] },
      tr: { headline: 'Belki yıldız gözlem geceleri düzenleyen bir astronom olur.', details: ['Gece gökyüzünü o kadar iyi tanır ki başkalarına öğretebilir.', 'Onlarca yıldızın adını bilir.', 'Her etkinliğe sıcak kakao getirir.'] }
    } },
  { headline: 'Maybe an architect designing tree-friendly schools.', details: ['Sketches buildings on napkins.', 'Loves natural light.', 'Has a treehouse phase that lasts decades.'], tags: ['education','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为设计与树共处的学校的建筑师。', details: ['习惯在餐巾纸上画建筑草图。', '热爱自然光。', '迷恋树屋的时期会持续几十年。'] },
      ja: { headline: 'もしかしたら、木とともに在る学校を設計する建築家に。', details: ['ナプキンに建物の下書きを描く。', '自然光が大好き。', 'ツリーハウスへの愛情は、数十年単位で続く。'] },
      ko: { headline: '나무와 어울리는 학교를 설계하는 건축가가 될지도 몰라요.', details: ['냅킨에 건물 스케치를 한다.', '자연광을 무척 사랑한다.', '트리하우스에 대한 애정이 수십 년 이어진다.'] },
      tr: { headline: 'Belki ağaç dostu okullar tasarlayan bir mimar olur.', details: ['Peçetelere bina çizimleri yapar.', 'Doğal ışığa bayılır.', 'Onlarca yıl süren bir ağaç ev tutkusu vardır.'] }
    } },
  { headline: 'Maybe an organizer who brings the neighborhood together.', details: ['Plans block parties.', 'Knows everyone\'s grocery routine.', 'Has a binder of community ideas.'], tags: ['family','social'],
    i18n: {
      zh: { headline: '也许会成为把街区聚到一起的组织者。', details: ['筹划街区派对。', '知道每个人的买菜习惯。', '有一本写满社区点子的活页夹。'] },
      ja: { headline: 'もしかしたら、ご近所をひとつにつなぐオーガナイザーに。', details: ['ブロックごとのパーティーを企画する。', '近所の人の買い物習慣を覚えている。', 'コミュニティのアイデアがぎっしりのバインダーを持っている。'] },
      ko: { headline: '동네를 하나로 묶는 오거나이저가 될지도 몰라요.', details: ['블록 파티를 기획한다.', '동네 사람들 모두의 장보기 습관을 안다.', '동네 아이디어들로 채워진 바인더 한 권이 있다.'] },
      tr: { headline: 'Belki mahalleyi bir araya getiren bir organizatör olur.', details: ['Sokak partileri düzenler.', 'Herkesin market alışkanlığını bilir.', 'Mahalle fikirleriyle dolu bir klasörü vardır.'] }
    } },
  { headline: 'Maybe someone who pieces together three part-time jobs and one big dream.', details: ['Drives between two towns most weeks.', 'Keeps the dream in a notebook nobody else reads.', 'Has a regular at every job who asks how they\'re really doing.'], tags: ['economy','urbanRural'],
    i18n: {
      zh: { headline: '也许会成为靠三份兼职拼出一个大梦想的人。', details: ['大多数周都在两个小镇之间开车往返。', '把那个梦想写在没人会读的本子里。', '每份工作里都有一位会问她/他"你最近真的还好吗"的熟客。'] },
      ja: { headline: 'もしかしたら、三つのパートタイムと一つの大きな夢を抱えて歩く人に。', details: ['ほとんどの週、二つの町を行き来して運転している。', 'その夢は、誰にも見られないノートにしまってある。', 'どの職場にも「最近、本当に大丈夫?」と聞いてくれる常連がいる。'] },
      ko: { headline: '세 가지 알바와 하나의 큰 꿈으로 살아가는 사람이 될지도 몰라요.', details: ['대부분의 주에 두 동네를 오가며 운전한다.', '그 꿈은 아무도 읽지 않는 노트에 적어 둔다.', '직장마다 "요즘 진짜 괜찮아?" 하고 물어주는 단골이 있다.'] },
      tr: { headline: 'Belki üç yarı zamanlı işi ve büyük bir hayali bir arada taşıyan biri olur.', details: ['Çoğu hafta iki kasaba arasında araba kullanır.', 'Hayalini, başka kimsenin okumadığı bir defterde saklar.', 'Her işyerinde "gerçekten nasılsın?" diye soran bir müdavimi vardır.'] }
    } },
  { headline: 'Maybe someone whose first job didn\'t pay enough, so they tried again.', details: ['Moved back in with family for a year and didn\'t love it.', 'Learned a second skill at the library on Saturdays.', 'Found work that fit on the third try, not the first.'], tags: ['economy','family'],
    i18n: {
      zh: { headline: '也许会成为第一份工资不够、于是再来一次的人。', details: ['搬回家住了一年,日子不好过。', '每个周六去图书馆学第二门技能。', '到第三次尝试,才找到合适的工作。'] },
      ja: { headline: 'もしかしたら、最初の仕事の給料では足りず、もう一度やり直した人に。', details: ['一年実家に戻ったが、それは少し苦しい時期だった。', '土曜日は図書館で、もうひとつのスキルを学んだ。', '三度目の挑戦でようやく自分に合う仕事に出会った。'] },
      ko: { headline: '첫 직장 월급이 부족해 다시 도전한 사람이 될지도 몰라요.', details: ['일 년 동안 다시 집으로 들어가 살았는데, 그 시간은 쉽지 않았다.', '토요일마다 도서관에서 두 번째 기술을 배웠다.', '세 번째 시도 끝에 자기에게 맞는 일을 찾았다.'] },
      tr: { headline: 'Belki ilk işi yetmeyince yeniden deneyen biri olur.', details: ['Bir yıl aileyle yaşamak için geri taşındı, kolay olmadı.', 'Cumartesileri kütüphanede ikinci bir beceri öğrendi.', 'Üçüncü denemede kendine uyan işi buldu, ilkinde değil.'] }
    } },
  { headline: 'Maybe someone who took years off to care for a parent.', details: ['Learned how to read a hospital bill.', 'Kept one small hobby alive through the hardest months.', 'Came back to work slower, and steadier, than before.'], tags: ['family','healthcare'],
    i18n: {
      zh: { headline: '也许会成为为照顾父母而暂离工作好几年的人。', details: ['学会了看懂医院的账单。', '在最难熬的几个月里,留住了一项小小的兴趣。', '重新回到职场时,比从前更慢、也更稳。'] },
      ja: { headline: 'もしかしたら、親の介護で何年か仕事を離れる人に。', details: ['病院の請求書の読み方を覚えた。', '一番つらかった数か月のあいだも、一つだけ小さな趣味を続けた。', '仕事に戻ったとき、以前よりゆっくりで、確かなペースになっていた。'] },
      ko: { headline: '부모를 돌보느라 몇 년 동안 일을 쉬는 사람이 될지도 몰라요.', details: ['병원 청구서를 읽는 법을 배웠다.', '가장 힘들었던 몇 달 동안에도 작은 취미 하나는 끝까지 지켰다.', '다시 일자리로 돌아왔을 때, 전보다 느리고 단단해져 있었다.'] },
      tr: { headline: 'Belki bir ebeveynine bakmak için yıllarca iş hayatına ara veren biri olur.', details: ['Bir hastane faturasını okumayı öğrendi.', 'En zor aylarda da küçük bir hobiyi sürdürdü.', 'İşe dönerken eskisine göre daha yavaş ama daha sağlam adımlarla geldi.'] }
    } }
];

/* ---------- Dev-mode audit: ensure every future-pool `tag` matches an
   ENV_FIELDS key. Tags that don't match silently score as neutral in
   generateAdultFutures(), so a typo would hide forever. One-shot warn. */
(function auditFuturePoolTags() {
  try {
    const validTags = new Set(ENV_FIELDS.map(f => f.key));
    // Valid keys: family, education, economy, healthcare,
    //             social, internet, multilingual, urbanRural
    const pools = {
      ADULT_FUTURES, ADULT_FUTURES_CLINICAL, KIDS_ADULT_FUTURES
    };
    const unknown = [];
    for (const [name, pool] of Object.entries(pools)) {
      if (!Array.isArray(pool)) continue;
      pool.forEach((entry, idx) => {
        (entry.tags || []).forEach(tag => {
          if (!validTags.has(tag)) {
            unknown.push(`${name}[${idx}]:"${tag}"`);
          }
        });
      });
    }
    if (unknown.length) {
      console.warn('[BabyBlend] Unknown future-pool tags (will score neutral):', unknown);
    }
    // R11rev: warn if any `-mild` tagged entry in a language-keyed trace pool
    // (en/zh/ja/ko/tr) lacks parallel non-EN coverage. The `-mild` entries were
    // added in R9 to ADULT_TRACES / REFLECTION_TRACES / KIDS_TRACES.en only;
    // the LOOP_REQUEST(translator) markers above each block flag the work, but
    // a translator skipping one tag would go unnoticed. Single aggregated warn.
    const tracePools = { ADULT_TRACES, REFLECTION_TRACES, KIDS_TRACES };
    const missing = [];
    for (const [name, pool] of Object.entries(tracePools)) {
      if (!pool || typeof pool !== 'object' || !Array.isArray(pool.en)) continue;
      const mildTags = new Set();
      pool.en.forEach(e => {
        if (e && typeof e === 'object' && typeof e.tag === 'string' &&
            e.tag.endsWith('-mild')) mildTags.add(e.tag);
      });
      if (!mildTags.size) continue;
      ['zh','ja','ko','tr'].forEach(lang => {
        const arr = pool[lang];
        if (!Array.isArray(arr)) { missing.push(`${name}.${lang}:absent`); return; }
        const present = new Set(arr.map(e =>
          e && typeof e === 'object' ? e.tag : null).filter(Boolean));
        mildTags.forEach(t => {
          if (!present.has(t)) missing.push(`${name}.${lang}:"${t}"`);
        });
      });
    }
    if (missing.length) {
      console.warn('[BabyBlend] -mild trace entries missing non-EN translations:', missing);
    }
    // R13: validate that every .tag field on trace-pool entries (any lang)
    // is in the TRAIT_CONFLICT_RULES tag set. A typo like 'OC-mlid' would
    // never match conflictTags.includes(t.tag) at the reservation step in
    // generateBabyFlavor() and the entry would silently score as neutral.
    // TRAIT_CONFLICT_RULES is declared further down in the file (TDZ here),
    // so the valid set is duplicated as literals; if the rules change, this
    // audit will flag the new tag, which is the intended nudge to update it.
    const validConflictTags = new Set([
      'OC-tension','EN-tension','CO-rigidity','AN-pleaser',
      'OC-mild','EN-mild','CO-mild','AN-mild'
    ]);
    const drift = [];
    for (const [name, pool] of Object.entries(tracePools)) {
      if (!pool || typeof pool !== 'object') continue;
      ['en','zh','ja','ko','tr'].forEach(lang => {
        const arr = pool[lang];
        if (!Array.isArray(arr)) return;
        arr.forEach((entry, idx) => {
          if (entry && typeof entry === 'object' && typeof entry.tag === 'string' &&
              !validConflictTags.has(entry.tag)) {
            drift.push(`${name}.${lang}[${idx}]:"${entry.tag}"`);
          }
        });
      });
    }
    if (drift.length) {
      console.warn('[BabyBlend] Trace-pool tags not in TRAIT_CONFLICT_RULES (will score neutral):', drift);
    }
    // R13rev: mirror the trace-loop drift check across future pools so a
    // typo on a future entry can't silently score as neutral. Two shapes:
    // flat-array (ADULT_FUTURES*, KIDS_ADULT_FUTURES) and language-keyed
    // (KIDS_FUTURE_PATHS — singular `.tag` per entry, per lang).
    // FUTURE_PATHS / KIDS_FUTURE_PATHS mix single-letter topTag weights
    // ('O','C','E','A','N','athletic') with conflict tags ('OC-tension', etc.).
    // Only the latter need to match validConflictTags — plain letters are
    // legitimate sort weights, not drift. Conflict tags all contain '-', so
    // filter on that to avoid 100+ false-positive warnings per boot.
    const futureDrift = [];
    const checkEntry = (entry, where) => {
      if (entry && typeof entry === 'object' && typeof entry.tag === 'string' &&
          entry.tag.includes('-') && !validConflictTags.has(entry.tag)) {
        futureDrift.push(`${where}:"${entry.tag}"`);
      }
    };
    for (const [name, pool] of Object.entries({
      ADULT_FUTURES, ADULT_FUTURES_CLINICAL, KIDS_ADULT_FUTURES
    })) {
      if (Array.isArray(pool)) pool.forEach((e, i) => checkEntry(e, `${name}[${i}]`));
    }
    for (const [name, pool] of Object.entries({ FUTURE_PATHS, KIDS_FUTURE_PATHS })) {
      if (!pool || typeof pool !== 'object') continue;
      ['en','zh','ja','ko','tr'].forEach(lang => {
        const arr = pool[lang];
        if (Array.isArray(arr)) arr.forEach((e, i) => checkEntry(e, `${name}.${lang}[${i}]`));
      });
    }
    if (futureDrift.length) {
      console.warn('[BabyBlend] Future-pool tags not in TRAIT_CONFLICT_RULES (will score neutral):', futureDrift);
    }
  } catch (e) { /* never block boot for an audit */ }
})();

const KIDS_REFLECTION_PROMPTS = {
  en: [
    'Should parents choose everything about a child?',
    'What makes people unique?',
    'Would the world be boring if everyone were the same?',
    "What's something special about YOU that surprised your family?",
    'What do you think every kid needs?',
    'Can two best friends be very different from each other? Why?'
  ],
  zh: [
    '父母应该替孩子决定关于他/她的所有事情吗?',
    '是什么让每个人都独一无二?',
    '如果所有人都长得、想得一模一样,世界会变得无聊吗?',
    '你身上有什么很特别的地方,曾经让家人感到惊喜?',
    '你觉得每一个孩子,都需要什么?',
    '两个最好的朋友,可以完全不一样吗?为什么?'
  ],
  ja: [
    '親は、子どもについてのすべてを決めていいんだろう?',
    '人を、ほかの誰でもない自分にしているものって、なに?',
    'みんなが同じだったら、世界は退屈になるかな?',
    'あなたのなかにある、家族をびっくりさせたとくべつなところって、なに?',
    'どんな子にも、これだけはあったほうがいいって思うものって、なに?',
    'なかよしどうしの二人は、ぜんぜん違っていてもいい?それはなぜだろう?'
  ],
  ko: [
    '부모가 아이에 관한 모든 것을 정해도 괜찮은 걸까요?',
    '사람을 저마다 다른 존재로 만들어 주는 건 뭘까요?',
    '모두가 똑같다면, 세상은 지루해질까요?',
    '가족을 놀라게 한, 당신만의 특별한 면이 있나요?',
    '모든 아이에게 꼭 필요하다고 생각하는 것이 있나요?',
    '가장 친한 두 친구가 서로 아주 다를 수 있을까요? 왜 그럴까요?'
  ],
  tr: [
    'Anne-babalar bir çocuğa dair her şeye karar vermeli mi?',
    'İnsanları biricik kılan şey nedir?',
    'Herkes aynı olsaydı dünya sıkıcı olur muydu?',
    'Sende olan ve aileni şaşırtan özel bir şey ne?',
    'Sence her çocuğun ihtiyacı olan şey nedir?',
    'İki yakın arkadaş birbirinden çok farklı olabilir mi? Neden?'
  ]
};

const KIDS_HUMANITY_REMINDERS = {
  en: [
    'People grow and change in ways no one can predict.',
    'Every kid knows one thing nobody else in the room knows.',
    'Diversity makes the world more interesting.',
    'You are more than your traits — you are a whole story.'
  ],
  zh: [
    '人会以谁都无法预料的方式成长和改变。',
    '每个孩子都知道一件房间里其他人都不知道的事。',
    '多样性让世界更有意思。',
    '你不只是那些特征——你是一个完整的故事。'
  ],
  ja: [
    '人は、誰にも予測できないかたちで成長し、変わっていく。',
    'どの子も、その部屋にいる誰も知らないことを一つ知っている。',
    'ちがいがあるから、世界はおもしろい。',
    'あなたは特徴の寄せ集めではない——一つの物語そのものだ。'
  ],
  ko: [
    '사람은 누구도 예측할 수 없는 방식으로 자라고 변한다.',
    '모든 아이는 그 방의 다른 누구도 모르는 한 가지를 알고 있어요.',
    '다양성이 세상을 더 흥미롭게 만들어요.',
    '너는 특성들의 합이 아니에요 — 하나의 온전한 이야기예요.'
  ],
  tr: [
    'İnsanlar, kimsenin tahmin edemediği şekillerde büyür ve değişir.',
    'Her çocuk, odadaki başka kimsenin bilmediği bir şeyi bilir.',
    'Çeşitlilik, dünyayı daha ilginç kılar.',
    'Sen özelliklerinin toplamından çok daha fazlasısın — koca bir hikâyesin.'
  ]
};

/* Kids-arc panel sub-headers. Each entry is a single string, wrapped as a
 * 1-element array so we can reuse `localList` and its EN fallback. The
 * thesis under each header: these aren't predictions from genes.
 */
const KIDS_ARC_DISCLAIMERS = {
  loves: {
    en: ['Not predictions from genes — examples of what won\'t fit in a slider.'],
    zh: ['这些不是基因给出的预言——只是滑杆装不下的那种小事。'],
    ja: ['遺伝子からの予言ではなく——スライダーにはおさまらないもの、その例。'],
    ko: ['유전자가 내놓는 예언이 아니라 — 슬라이더에 담기지 않는 것들의 예시예요.'],
    tr: ['Genlerden gelen kehanetler değil — bir kaydıraca sığmayacak şeylere örnekler.']
  },
  questions: {
    en: ['Questions a slider can\'t answer for you.'],
    zh: ['滑杆答不了的那些问题。'],
    ja: ['スライダーが答えてはくれない問い。'],
    ko: ['슬라이더가 대신 답해 줄 수 없는 질문들.'],
    tr: ['Bir kaydıracın sizin yerinize cevaplayamayacağı sorular.']
  },
  differences: {
    en: ['Reminders of what no slider can capture.'],
    zh: ['提醒一下:有些东西,滑杆永远抓不住。'],
    ja: ['どんなスライダーにもとらえられないものについての、ささやかなリマインド。'],
    ko: ['어떤 슬라이더로도 담을 수 없는 것들에 대한 작은 알림.'],
    tr: ['Hiçbir kaydıracın yakalayamayacağı şeylere küçük bir hatırlatma.']
  }
};

/* R13 UX-FLOW: thematic closing affirmation rendered after the Differences
 * panel items. Frames the Loves → Questions → Differences arc as landing on
 * surprise-as-where-the-person-lives — observation, not aesthetic ranking.
 * Single line per language, wrapped as a 1-element array so `localList` + EN
 * fallback apply. R13 Narrative rev: replaced placeholder "Different is the
 * most interesting thing…" which read as eugenics-as-positivity and matched a
 * template ("X is the most Y about Z") flagged by Detection. */
const KIDS_ARC_CLOSING_AFFIRMATION = {
  en: ['They might surprise you, and the surprise is where the person lives.'],
  zh: ['他们也许会让你意外,而那个意外,正是这个人住的地方。'],
  ja: ['その子はあなたを驚かせるかもしれません。その驚きのなかに、その人は住んでいます。'],
  ko: ['이 아이는 당신을 놀라게 할지도 몰라요. 그 놀라움 안에, 한 사람이 살고 있어요.'],
  tr: ['Sizi şaşırtabilir; ve o şaşırtı, o insanın yaşadığı yerdir.']
};

/* ---------- Seeded randomness ---------- */
// Tiny deterministic hash → uint32. Same string in, same value out.
function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
// Returns a deterministic RNG (0..1) for a given seed.
function seededRand(seed) {
  let s = hashStr(String(seed)) || 1;
  return () => {
    // mulberry32
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickN(arr, n, rng) {
  const copy = arr.slice();
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(rng() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

// Where freckles land on each style's viewBox (as fractions).
const FACE_METRICS = {
  lorelei:  { cheekY: 0.54, dotR: 0.0085 },
  bigSmile: { cheekY: 0.55, dotR: 0.0125 }
};

// Deterministic freckle scatter — first N are picked as slider goes up.
const FRECKLE_SCATTER = [
  [-0.18, -0.02], [-0.12,  0.01], [-0.08, -0.03], [-0.05,  0.02], [-0.02, -0.01],
  [ 0.02, -0.01], [ 0.05,  0.02], [ 0.08, -0.03], [ 0.12,  0.01], [ 0.18, -0.02],
  [-0.14,  0.04], [-0.06,  0.05], [ 0.06,  0.05], [ 0.14,  0.04]
];

function addTraitOverlays(svg, b, styleName) {
  const m = FACE_METRICS[styleName] || FACE_METRICS.lorelei;
  const vb = /viewBox="(\d+)\s+(\d+)\s+(\d+)\s+(\d+)"/.exec(svg);
  if (!vb) return svg;
  const W = Number(vb[3]);
  const H = Number(vb[4]);

  let pieces = '';

  // Freckles — count + opacity both scale with slider value.
  if (b.freckles > 0) {
    const opacity = Math.min(1, b.freckles / 100);
    const visible = Math.max(3, Math.round((b.freckles / 100) * FRECKLE_SCATTER.length));
    const r = W * m.dotR;
    for (let i = 0; i < visible; i++) {
      const [dx, dy] = FRECKLE_SCATTER[i];
      const cx = (W * 0.5 + W * dx).toFixed(1);
      const cy = (H * m.cheekY + H * dy).toFixed(1);
      pieces += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(2)}" fill="rgba(70,38,18,${(0.85*opacity).toFixed(2)})"/>`;
    }
  }

  if (!pieces) return svg;
  return svg.replace(/<\/svg>\s*$/, pieces + '</svg>');
}

/* ---------- Parent form schema ---------- */

const PARENT_FIELDS = [
  { key: 'name',       label: 'Name',                type: 'text',   defA: 'Alex',  defB: 'Bea' },
  { key: 'ancestry',   label: 'Ancestry',            type: 'select', options: ANCESTRY_LADDER, optionLabels: ANCESTRY_LABEL, defA: 'unspecified', defB: 'unspecified', appliesPreset: true },
  { key: 'height',     label: 'Height (cm)',         type: 'number', min: 140, max: 210, defA: 170, defB: 175 },
  { key: 'athletic',   label: 'Athletic',            subtitle: 'physical tendency',           type: 'range', min: 1, max: 10, defA: 5, defB: 6 },
  { key: 'eyeColor',   label: 'Eye color',           type: 'select', options: EYE_LADDER,    defA: 'blue',     defB: 'brown' },
  { key: 'hairColor',  label: 'Hair color',          type: 'select', options: HAIR_LADDER,   defA: 'blonde',   defB: 'dark brown' },
  { key: 'hairType',   label: 'Hair type',           type: 'select', options: TEX_LADDER,    defA: 'straight', defB: 'curly' },
  { key: 'skinTone',   label: 'Skin tone',           type: 'select', options: SKIN_LADDER,   defA: 'fair',     defB: 'medium' },
  { key: 'faceShape',  label: 'Face shape',          type: 'select', options: FACE_LADDER,   defA: 'oval',     defB: 'round' },
  { key: 'freckles',   label: 'Freckles',            type: 'select', options: FRECK_LADDER,  defA: 'none',     defB: 'light' },
  { key: 'dimples',    label: 'Dimples',             type: 'select', options: DIMPLE_LADDER, defA: 'no',       defB: 'yes' },
  // Big Five (OCEAN)
  { key: 'openness',          label: 'Openness',          subtitle: 'curiosity & imagination',   type: 'range', min: 1, max: 10, defA: 7, defB: 6 },
  { key: 'conscientiousness', label: 'Conscientiousness', subtitle: 'discipline & organization', type: 'range', min: 1, max: 10, defA: 6, defB: 5 },
  { key: 'extraversion',      label: 'Extraversion',      subtitle: 'sociability & energy',      type: 'range', min: 1, max: 10, defA: 6, defB: 8 },
  { key: 'agreeableness',     label: 'Agreeableness',     subtitle: 'kindness & cooperation',    type: 'range', min: 1, max: 10, defA: 7, defB: 7 },
  { key: 'neuroticism',       label: 'Neuroticism',       subtitle: 'emotional reactivity',      type: 'range', min: 1, max: 10, defA: 4, defB: 5 }
];

/* ---------- Slider definitions ---------- */
/* Each baby slider is built dynamically with a min/max/default derived from parents. */

// Base σ for polygenic sliders on the 1–10 scale. Single source of truth so
// the OCEAN bell-width fallback (used when a parent pair is missing) can't
// silently drift from the SLIDER_DEFS entries that drive range computation.
const PERSONALITY_SIGMA = 1.75;

// Segregational-variance coefficient (Falconer-flavored) for parent-disparity
// widening of physical polygenic σ: σ_eff² = σ_base² + k · (|a−b|/span)² · span².
// k ≈ 0.06 → at maximum disparity σ widens ~60%. OCEAN traits zero out the
// disparity term (see range-builder), so this only applies to physical
// polygenic sliders (e.g. athletic tendency).
const DISPARITY_VARIANCE_K = 0.06;

const SLIDER_DEFS = [
  { key: 'height',     label: 'Height potential',  unit: 'cm',     kind: 'continuous', hardMin: 140, hardMax: 210, expand: 5  },
  { key: 'athletic',   label: 'Athletic tendency',    unit: '/10', kind: 'polygenic',  hardMin: 1,   hardMax: 10, sigma: PERSONALITY_SIGMA },
  { key: 'eyeColor',   label: 'Eye color blend',                   kind: 'ladder', ladder: EYE_LADDER  },
  { key: 'hairColor',  label: 'Hair color blend',                  kind: 'ladder', ladder: HAIR_LADDER },
  { key: 'hairType',   label: 'Hair texture blend',                kind: 'ladder', ladder: TEX_LADDER  },
  { key: 'skinTone',   label: 'Skin tone blend',                   kind: 'ladder', ladder: SKIN_LADDER },
  { key: 'faceShape',  label: 'Face shape blend',                  kind: 'ladder', ladder: FACE_LADDER },
  { key: 'freckles',   label: 'Freckles likelihood',  unit: '%',   kind: 'likelihood', parentKey: 'freckles', ladder: FRECK_LADDER },
  { key: 'dimples',    label: 'Dimples likelihood',   unit: '%',   kind: 'likelihood', parentKey: 'dimples',  ladder: DIMPLE_LADDER },
  // Big Five (OCEAN) — child ≈ midparent ± 2σ (~95% interval at ~50% heritability)
  { key: 'openness',          label: 'Openness',          unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: PERSONALITY_SIGMA },
  { key: 'conscientiousness', label: 'Conscientiousness', unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: PERSONALITY_SIGMA },
  { key: 'extraversion',      label: 'Extraversion',      unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: PERSONALITY_SIGMA },
  { key: 'agreeableness',     label: 'Agreeableness',     unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: PERSONALITY_SIGMA },
  { key: 'neuroticism',       label: 'Neuroticism',       unit: '/10', kind: 'polygenic', hardMin: 1, hardMax: 10, sigma: PERSONALITY_SIGMA }
];

/* ---------- Application state ---------- */

const state = {
  parents: { A: {}, B: {} },
  env: {},             // environmental factors (nurture)
  budget: {},          // priority allocations (Adult mode)
  socialResponse: [],  // projected social pressures (Adult mode)
  ranges: {},          // per-slider { min, max, def, step, kind, ... }
  baby: {},            // current baby slider values
  codename: '',
  vibe: '',            // funny "future vibe" title
  futurePaths: [],     // 3 future-path predictions
  events: [],          // 0–2 random events
  headlines: [],       // fictional news headlines
  conflicts: [],       // trait conflict tradeoff notes
  reflection: '',      // ethics-mode reflection prompt
  archetype: '',
  surprise: 0,
  style: 'lorelei',    // 'lorelei' | 'bigSmile'
  gender: 'surprise',  // 'female' | 'male' | 'surprise'
  genderExpression: 70, // 0–100; intensity of masculine/feminine styling cues. Ignored when gender = surprise.
  appMode: 'adult', // 'reflection' | 'kids' | 'adult' — the single mode dimension
  envDisclosureTouched: false, // R4: once user toggles env-modifiers <details>, mode-switch stops overriding their choice
  chaos: false,        // amplifies slider ranges + surprise
  generateCount: 0,    // how many times Generate has been clicked
  consentAck: false,   // session-level: heritable-decision micro-ack (gates first non-zero allocation)
  alternates: [],      // generated alternate-baby cards
  futures: [],         // generated adult-life future cards (for current baby)
  age: 17,             // current age on the aging-scrubber slider (0..80)
  language: 'en'       // 'en' | 'zh' | 'ja' | 'ko' | 'tr' — UI chrome only
};

/* ---------- Helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const titleCase = s => s.replace(/(^|\s)\S/g, c => c.toUpperCase());

function randInt(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
function randFloat(lo, hi) { return Math.random() * (hi - lo) + lo; }

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const x = c * (1 - Math.abs((h/60) % 2 - 1));
  const m = l - c/2;
  let r, g, b;
  if      (h <  60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return toHex(r) + toHex(g) + toHex(b);
}

/* ---------- Mode + copy helpers ----------
 * One mode dimension only:
 *   reflection — playful look + reflective prompt always on (default)
 *   kids       — warm Kids surface, friendly trait names + explainers
 *   adult      — clinical biotech sim with the Enhancement Allocation
 */
const VALID_MODES = ['reflection', 'kids', 'adult'];
function isKids()  { return state.appMode === 'kids'; }
function isAdult() { return state.appMode === 'adult'; }

function pickPool(defaultPool, adultPool, kidsPool) {
  let chosen;
  if (state.appMode === 'kids'  && kidsPool)  chosen = kidsPool;
  else if (state.appMode === 'adult' && adultPool) chosen = adultPool;
  else chosen = defaultPool;
  // localList passes plain arrays through unchanged; for language-keyed
  // pools (objects with {en, zh, ja, ko, tr}) it returns the active slice.
  return localList(chosen);
}

const APP_MODE_KEY = 'babyblend.appMode.v1';
function loadAppMode() {
  try {
    const v = localStorage.getItem(APP_MODE_KEY);
    return VALID_MODES.includes(v) ? v : 'reflection';
  } catch { return 'reflection'; }
}
function persistAppMode(m) {
  try { localStorage.setItem(APP_MODE_KEY, m); } catch {}
}

function applyAppModeClass() {
  const m = state.appMode;
  document.body.classList.toggle('app-kids',        m === 'kids');
  document.body.classList.toggle('mode-adult',      m === 'adult');
  document.body.classList.toggle('mode-reflection', m === 'reflection');
  applyBudgetPanelGate();
  applyEnvDisclosureMode();
}

// Env Modifiers triage (R4): Adult mode collapses env behind a <details>
// to reduce the pre-output input load (parents → env → OCEAN → allocation
// → consent → output is too many layers). Reflection / Kids keep it open
// since env framing is part of the narrative they're learning. If the
// user has manually toggled the disclosure this session, respect that
// choice (envDisclosureTouched) instead of clobbering on mode-switch.
function applyEnvDisclosureMode() {
  const d = $('#env-disclosure');
  if (!d) return;
  if (state.envDisclosureTouched) return;
  // R14 rev (Product POLISH): open env-disclosure by default in Adult
  // mode too. Closing it hid a load-bearing input from optimizers; the
  // 3-token summary helps but isn't a substitute for the sliders.
  d.open = true;
  renderEnvSummaryTokens();
}

// R5 (Product): when #env-disclosure is CLOSED in Adult mode, surface a
// compact 3-token summary (home / school / locale) near the burden bar
// so the env context driving the projection is visible at a glance —
// closes the R4 hidden-dependency gap. Reads live #env_* values; no new
// state fields. Hidden whenever the disclosure is open or mode != adult.
function renderEnvSummaryTokens() {
  const host = $('#env-summary-tokens');
  if (!host) return;
  const d = $('#env-disclosure');
  const isAdult = state.appMode === 'adult';
  if (!(isAdult && d && !d.open)) { host.hidden = true; host.innerHTML = ''; return; }
  const read = (key) => {
    const el = $('#env_' + key);
    if (el) return Number(el.value);
    const f = ENV_FIELDS.find(x => x.key === key);
    return f ? f.def : 5;
  };
  const family = read('family');
  const home = family >= 8 ? 'Stable home' : family >= 5 ? 'Mixed home' : 'Unstable home';
  const education = read('education');
  const school = education >= 8 ? 'Strong school' : education >= 5 ? 'Average school' : 'Under-resourced school';
  const ur = read('urbanRural');  // 1 = urban, 10 = rural
  const locale = ur <= 3 ? 'Urban' : ur <= 6 ? 'Suburban' : 'Rural';
  host.hidden = false;
  host.innerHTML =
    `<span class="env-token">${home}</span><span class="env-token-sep">·</span>` +
    `<span class="env-token">${school}</span><span class="env-token-sep">·</span>` +
    `<span class="env-token">${locale}</span>`;
}

// Enhancement Allocation is visible from first load in Adult mode as a
// compact locked preview; its dense controls are hidden/disabled until the
// first projection exists. Consent Implications reveals on allocation weight
// (>=50 credits), once the user has moved from playful baseline sampling into
// explicit optimization.
// Other analytical Adult panels (Societal Brief, Sibling Cohort, Trait
// Popularity) keep the gen requirement as their own reveal gate.
function applyBudgetPanelGate() {
  const panel = $('#budget-panel');
  const consent = $('#consent-panel');
  const isAdult = state.appMode === 'adult';
  const gen = state.generateCount || 0;
  const eligible = isAdult && gen >= 1;
  // Round 7 rev (UX): consent-awareness lead-in renders FIRST on this tick
  // so the ethical framing precedes Enhancement Allocation in DOM/paint
  // order, not just in source order. Previously the leadin's visibility
  // toggle ran AFTER the budget panel unhide; if leadin updates ever got
  // deferred (e.g. via a future microtask), the projection could paint
  // before the lead-in resolved. Co-locating them at the top of the gate
  // — and re-asserting hidden=false on every eligible tick — makes the
  // intent explicit: lead-in precedes projection, same render frame.
  // Cross-fade hand-off (showConsentAckPrompt) still works because we
  // never clobber an existing `.is-leaving` note: we only set innerHTML
  // when no note exists, and we leave the node alone once consentAck flips.
  const leadin = $('#consent-awareness-leadin');
  if (leadin) {
    const show = eligible && !state.consentAck;
    const existing = leadin.querySelector('.consent-awareness-note');
    if (show) {
      if (!existing) {
        // R7 (World Design): "Ethically:" prefix anchors the line as an
        // ethical framing rather than a description-of-fact, so an
        // out-of-context screenshot cannot read the sentence as endorsement
        // of "deciding for someone not in the room."
        leadin.innerHTML = `<p class="consent-awareness-note">${localLabel("Ethically: the child this affects isn't here yet — and they'll live with the choices you make.")}</p>`;
      }
      // Re-assert visibility on every eligible tick — defensive against
      // any path that might have left the node hidden.
      leadin.hidden = false;
    } else if (!eligible) {
      // Mode/gen no longer qualifies — hard clear, no fade needed.
      // R9 rev (UX POLISH): `leadin.remove()` was considered to fully drop
      // the wrapper, but the element is a static <div> in index.html that
      // this gate does not recreate on the way back to eligibility. Setting
      // `hidden = true` AND clearing innerHTML together is the documented
      // fallback — equivalent in practice (CSS `[hidden]` collapses chrome,
      // padding, border, margin) without the re-creation hazard.
      leadin.innerHTML = '';
      leadin.hidden = true;
    }
    // R8 rev: eligible-but-acked branch is intentionally a no-op. The fade
    // is now driven ONLY by the explicit micro-ack button (showConsentAckPrompt
    // handler crossfades the note directly), not by this gate — that decouples
    // the ethical-framing retirement from any slider tick and preserves the
    // three-beat rhythm called out by Ethics MAJOR + Narrative MAJOR.
  }
  // Budget panel: always visible in Adult mode; locked until first generation.
  // Unhidden AFTER the leadin so the ethical framing is committed to the DOM
  // before the projection panel reveals, even though both land in one paint.
  if (panel) {
    panel.hidden = !isAdult;
    const interactionReady = eligible;
    panel.classList.toggle('panel-locked', isAdult && !interactionReady);
    applyBudgetInteractionLock(!interactionReady);
    ensureBudgetLockNotice(isAdult && !interactionReady);
  }
  // Consent Implications: visible once ≥50 credits are allocated in Adult
  // mode. First reveal uses the same downward-settle motion as the OCEAN
  // /advanced disclosure (translateY 6px → 0, 0.45s) so the two read as
  // one system.
  // R5 (narrative): if the Gen-1 awareness note is currently fading out
  // (cross-fade fires from showConsentAckPrompt → 0.45s), defer the
  // consent panel reveal motion by ~200ms past the fade end so the
  // cascade reads sequentially instead of overlapping. The panel is
  // still UN-hidden immediately; only the animated settle is deferred.
  const allocated = computeBudgetUsed();
  const consentReady = isAdult && allocated >= 50;
  if (consent) {
    const wasHidden = consent.hidden;
    consent.hidden = !consentReady;
    if (consentReady && wasHidden) {
      consent.classList.remove('is-revealing');
      const leavingNote = document.querySelector('.consent-awareness-note.is-leaving');
      const applyReveal = () => {
        // Force reflow so the animation re-runs on first reveal.
        void consent.offsetWidth;
        consent.classList.add('is-revealing');
      };
      if (leavingNote) {
        // Awareness fade is 450ms; add a 200ms gap so the consent
        // motion starts after the note has fully resolved.
        setTimeout(applyReveal, 650);
      } else {
        applyReveal();
      }
    }
  }
  if (consentReady) renderConsentExplainer();
}

// Returns sum of cost*value across all current budget allocations.
function computeBudgetUsed() {
  return Object.entries(state.budget || {}).reduce((s, [k, v]) => {
    const pr = (typeof PRIORITIES !== 'undefined') ? PRIORITIES.find(x => x.key === k) : null;
    return s + (pr ? pr.cost * v : 0);
  }, 0);
}

// Disable every range input inside #budget-panel without hiding the panel.
function applyBudgetInteractionLock(locked) {
  const panel = $('#budget-panel');
  if (!panel) return;
  panel.querySelectorAll('input[type="range"]').forEach(r => {
    r.disabled = !!locked;
    if (locked) r.setAttribute('aria-disabled', 'true'); else r.removeAttribute('aria-disabled');
  });
}

// Lazy-inject a single lock-copy notice inside #budget-panel. Removed when unlocked.
function ensureBudgetLockNotice(showLock) {
  const panel = $('#budget-panel');
  if (!panel) return;
  let notice = panel.querySelector('.budget-lock-notice');
  if (showLock) {
    if (!notice) {
      notice = document.createElement('p');
      notice.className = 'budget-lock-notice';
      notice.textContent = localLabel('Baseline projection required before optimization packages unlock.');
      const intro = panel.querySelector('.subtle');
      if (intro && intro.nextSibling) panel.insertBefore(notice, intro.nextSibling);
      else panel.appendChild(notice);
    }
  } else if (notice) {
    notice.remove();
  }
}

/* ====================================================================
 * 1. Build parent forms
 * ==================================================================== */

// Keys collapsed behind the "Advanced traits" disclosure in each parent
// card. Keeping the list local rather than tagging PARENT_FIELDS keeps
// this UX-shaped concern out of the data shape.
const PARENT_ADVANCED_KEYS = new Set([
  'openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'
]);
const PARENT_APPEARANCE_KEYS = new Set([
  'eyeColor', 'hairColor', 'hairType', 'skinTone', 'faceShape', 'freckles', 'dimples'
]);

function buildParentForms() {
  const container = $('#parents');
  ['A', 'B'].forEach(letter => {
    const card = document.createElement('div');
    card.className = 'parent-card';
    card.dataset.parent = letter;
    card.innerHTML = `
      <div class="parent-card-head">
        <h3>${localLabel('Parent ' + letter)}</h3>
        <button type="button" class="parent-randomize-btn" data-parent="${letter}" aria-label="${localLabel('Randomize Parent ' + letter)}" title="${localLabel('Randomize Parent ' + letter)}">↻</button>
      </div>`;
    // Advanced-traits disclosure: OCEAN sliders fold into a per-parent
    // <details> so the default view shows appearance-only inputs.
    // Label "Temperament dials" — speculative-lab register: warm enough for
    // Kids/Reflection, dry enough for Adult, no clinical jargon.
    const advanced = document.createElement('details');
    advanced.className = 'parent-advanced';
    advanced.dataset.parent = letter;
    advanced.innerHTML = `<summary class="parent-advanced-summary">${localLabel('Temperament dials')}</summary>`;
    const advancedBody = document.createElement('div');
    advancedBody.className = 'parent-advanced-body';
    advanced.appendChild(advancedBody);
    const appearance = document.createElement('details');
    appearance.className = 'parent-appearance';
    appearance.dataset.parent = letter;
    appearance.open = !window.matchMedia('(max-width: 720px)').matches;
    appearance.innerHTML = `<summary class="parent-appearance-summary">${localLabel('Visible traits')}</summary>`;
    const appearanceBody = document.createElement('div');
    appearanceBody.className = 'parent-appearance-body';
    appearance.appendChild(appearanceBody);
    PARENT_FIELDS.forEach(f => {
      const id = `p${letter}_${f.key}`;
      const def = letter === 'A' ? f.defA : f.defB;
      const field = document.createElement('div');
      field.className = 'field' + (f.type === 'range' ? ' field-range-wrap' : '');
      if (f.type === 'text') {
        field.innerHTML = `
          <label for="${id}">${localLabel(f.label)}</label>
          <input id="${id}" name="${f.key}" type="text" value="${def}" maxlength="20" />`;
      } else if (f.type === 'number') {
        field.innerHTML = `
          <label for="${id}">${localLabel(f.label)}</label>
          <input id="${id}" name="${f.key}" type="number" min="${f.min}" max="${f.max}" value="${def}" />`;
      } else if (f.type === 'select') {
        const opts = f.options.map(o => {
          const baseLbl = (f.optionLabels && f.optionLabels[o]) || titleCase(o);
          const lbl = (typeof localLabel === 'function') ? localLabel(baseLbl) : baseLbl;
          return `<option value="${o}" ${o===def?'selected':''}>${lbl}</option>`;
        }).join('');
        field.innerHTML = `
          <label for="${id}">${localLabel(f.label)}</label>
          <select id="${id}" name="${f.key}">${opts}</select>`;
      } else if (f.type === 'range') {
        const sub = f.subtitle
          ? `<span class="field-subtitle">${localLabel(f.subtitle)}</span>`
          : `<span class="hint">(1–10)</span>`;
        field.innerHTML = `
          <label for="${id}">${localLabel(f.label)} ${sub}</label>
          <div class="field-range">
            <input id="${id}" name="${f.key}" type="range" min="${f.min}" max="${f.max}" value="${def}" step="1" />
            <span class="val" id="${id}_val">${def}</span>
          </div>`;
      }
      if (PARENT_ADVANCED_KEYS.has(f.key)) {
        advancedBody.appendChild(field);
      } else if (PARENT_APPEARANCE_KEYS.has(f.key)) {
        appearanceBody.appendChild(field);
      } else {
        card.appendChild(field);
      }
    });
    card.appendChild(appearance);
    card.appendChild(advanced);
    container.appendChild(card);
    const rb = card.querySelector('.parent-randomize-btn');
    if (rb) rb.addEventListener('click', () => {
      rb.classList.add('spinning');
      setTimeout(() => rb.classList.remove('spinning'), 500);
      randomizeOneParent(letter);
    });
  });

  // Live update of range value displays in the parent form
  $$('.parent-card input[type="range"]').forEach(r => {
    const valEl = $('#' + r.id + '_val');
    r.addEventListener('input', () => { valEl.textContent = r.value; });
  });

  // Ancestry change → roll plausible defaults for that parent's trait selects.
  ['A', 'B'].forEach(letter => {
    const sel = $('#p' + letter + '_ancestry');
    if (!sel) return;
    sel.addEventListener('change', () => applyAncestryPreset(letter, sel.value));
  });
}

function applyAncestryPreset(letter, ancestry) {
  const preset = ANCESTRY_PRESETS[ancestry];
  if (!preset) return; // 'unspecified' or 'mixed' — leave fields as-is
  const pickFrom = arr => arr[Math.floor(Math.random() * arr.length)];
  Object.entries(preset).forEach(([key, options]) => {
    const el = $('#p' + letter + '_' + key);
    if (!el) return;
    el.value = pickFrom(options);
    el.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

/* ====================================================================
 * 2. Collect parent data
 * ==================================================================== */

function collectParentData() {
  const out = { A: {}, B: {} };
  ['A', 'B'].forEach(letter => {
    PARENT_FIELDS.forEach(f => {
      const el = $('#p' + letter + '_' + f.key);
      let v = el.value;
      if (f.type === 'number' || f.type === 'range') v = Number(v);
      out[letter][f.key] = v;
    });
  });
  return out;
}

function buildEnvPanel() {
  const grid = $('#env-grid');
  if (!grid) return;
  grid.innerHTML = '';
  ENV_FIELDS.forEach(f => {
    const id = 'env_' + f.key;
    const wrap = document.createElement('div');
    wrap.className = 'env-field';
    wrap.innerHTML = `
      <label for="${id}">${localLabel(f.label)}</label>
      <div class="field-range">
        <input id="${id}" type="range" min="${f.min}" max="${f.max}" step="1" value="${f.def}" />
        <span class="val" id="${id}_val">${f.def}</span>
      </div>`;
    grid.appendChild(wrap);
  });
  $$('.env-field input[type="range"]').forEach(r => {
    const v = $('#' + r.id + '_val');
    r.addEventListener('input', () => { v.textContent = r.value; });
  });
  // Track user intent on the env disclosure (R4 triage): once the user
  // expands or collapses it themselves, mode-switches stop overriding
  // their choice. The 'toggle' event fires on open/close.
  const d = $('#env-disclosure');
  if (d && !d.dataset.touchBound) {
    d.dataset.touchBound = '1';
    d.addEventListener('toggle', () => {
      state.envDisclosureTouched = true;
      // R5: refresh the 3-token summary visibility when the user toggles
      // the disclosure — visible only while it's closed in Adult mode.
      renderEnvSummaryTokens();
    });
  }
  // R5: keep the compact env summary in sync with slider edits so a user
  // tweaking a value while the disclosure is open then re-collapsing it
  // sees the current tokens rather than stale ones.
  ENV_FIELDS.forEach(f => {
    const el = $('#env_' + f.key);
    if (el && !el.dataset.envSumBound) {
      el.dataset.envSumBound = '1';
      el.addEventListener('input', renderEnvSummaryTokens);
    }
  });
  renderEnvSummaryTokens();
}

function collectEnvData() {
  const out = {};
  ENV_FIELDS.forEach(f => {
    const el = $('#env_' + f.key);
    out[f.key] = el ? Number(el.value) : f.def;
  });
  return out;
}

/* ====================================================================
 * 3. Generate slider ranges from parents
 * ==================================================================== */

function applyBudgetBias(centerVal, traitKey) {
  if (state.appMode !== 'adult') return centerVal;
  let shift = 0;
  PRIORITIES.forEach(p => {
    const alloc = state.budget[p.key] || 0;
    if (alloc === 0) return;
    const factor = p.bias[traitKey];
    if (typeof factor === 'number') shift += alloc * factor;
  });
  return centerVal + shift;
}

function generateSliderRanges(parents) {
  const ranges = {};
  const chaos = state.chaos;

  SLIDER_DEFS.forEach(def => {
    if (def.kind === 'continuous') {
      const a = parents.A[def.key], b = parents.B[def.key];
      const expand = chaos ? def.expand * 8 : def.expand;
      const lo = clamp(Math.min(a, b) - expand, def.hardMin, def.hardMax);
      const hi = clamp(Math.max(a, b) + expand, def.hardMin, def.hardMax);
      const center = (a + b) / 2;
      ranges[def.key] = {
        kind: 'continuous',
        min: lo, max: hi,
        step: def.hardMax <= 10 ? 1 : 1,
        def: Math.round(center),
        unit: def.unit || ''
      };
    } else if (def.kind === 'polygenic') {
      // Polygenic-flavored: child ≈ midparent + Gaussian(σ_eff).
      // Slider range ≈ midparent ± 2σ_eff (~95% interval).
      // With PERSONALITY_SIGMA = 1.75 on a 1–10 scale, the 2σ band spans
      // ±3.5 — i.e. the model implies *low* narrow-sense heritability for
      // OCEAN: roughly h² ≈ 0.30–0.40 given a typical parental-population
      // SD of ~2 on this scale, since V_residual_around_midparent
      // ≈ V_pop · (1 − h²/2). This deliberately undershoots the high-end
      // twin-study estimates (~0.50, Polderman et al. 2015) and sits closer
      // to the non-twin family/adoption pooled range reported in the
      // Vukasović & Bratko 2015 meta-analysis (~0.36–0.40). The wider band
      // is the honest one: shared-environment confounds in twin designs
      // inflate h², and a baby-builder UI should not pretend to predict
      // personality more sharply than non-twin behavior-genetic data warrant.
      // Chaos mode widens to the full hardMin/hardMax range.
      // In Adult mode, Enhancement Allocation biases the center of the band.
      //
      // Segregational-variance (Falconer-flavored) disparity scaling:
      //   σ_eff² = σ_base² + k·(|a−b| / span)²·span²   (k ≈ 0.06)
      // is appropriate for additive-polygenic *physical* traits (e.g. athletic
      // tendency) but NOT for Big Five personality, where heritability is lower,
      // gene–environment interaction dominates, and treating parental disparity
      // as additive segregational variance overclaims what the model can say.
      // For OCEAN keys we therefore hold σ at the base value and let the band
      // read as a fixed uncertainty window rather than a parent-disparity signal.
      const a = parents.A[def.key], b = parents.B[def.key];
      const baseCenter = (a + b) / 2;
      const center = applyBudgetBias(baseCenter, def.key);
      const span = def.hardMax - def.hardMin;
      const isOcean = PERSONALITY_OCEAN_KEYS.has(def.key);
      const disparityFrac = (!isOcean && span > 0) ? Math.abs(a - b) / span : 0;
      // DISPARITY_VARIANCE_K is hoisted up top. For OCEAN, disparityFrac is
      // forced to 0 above so σ_eff = σ_base regardless of the coefficient.
      const sigmaEff = Math.sqrt(def.sigma * def.sigma + DISPARITY_VARIANCE_K * disparityFrac * disparityFrac * span * span);
      const half = chaos ? span : (2 * sigmaEff);
      const lo = clamp(Math.floor(center - half), def.hardMin, def.hardMax);
      const hi = clamp(Math.ceil (center + half), def.hardMin, def.hardMax);
      // Tag the uncertainty category so confidence-band rendering can vary
      // its visual treatment: OCEAN bands are 'speculative' (low-heritability,
      // gene–environment-dominated) while physical polygenic traits like
      // athletic tendency are 'phenotypic' (additive-polygenic).
      ranges[def.key] = {
        kind: 'polygenic',
        min: lo, max: hi,
        step: 1,
        def: clamp(Math.round(center), lo, hi),
        sigma: sigmaEff,
        unit: def.unit || '',
        uncertaintyClass: isOcean ? 'speculative' : 'phenotypic'
      };
    } else if (def.kind === 'ladder') {
      const ladder = def.ladder;
      const ai = ladder.indexOf(parents.A[def.key]);
      const bi = ladder.indexOf(parents.B[def.key]);
      let lo = Math.min(ai, bi);
      let hi = Math.max(ai, bi);
      if (chaos) {
        lo = 0; hi = ladder.length - 1;
      } else {
        // If both parents identical, allow ±1 of variation as "uncertainty"
        if (lo === hi) {
          lo = Math.max(0, lo - 1);
          hi = Math.min(ladder.length - 1, hi + 1);
        }
        lo = Math.max(0, lo);
        hi = Math.min(ladder.length - 1, hi);
      }
      const center = Math.round((ai + bi) / 2);
      ranges[def.key] = {
        kind: 'ladder',
        ladder,
        min: lo, max: hi,
        step: 1,
        def: clamp(center, lo, hi)
      };
    } else if (def.kind === 'likelihood') {
      const ladder = def.ladder;
      const ai = ladder.indexOf(parents.A[def.key]);
      const bi = ladder.indexOf(parents.B[def.key]);
      const norm = ((ai + bi) / 2) / (ladder.length - 1);
      const spread = chaos ? 100 : (25 + Math.abs(ai - bi) * 15);
      const center = Math.round(norm * 100);
      const lo = clamp(center - spread, 0, 100);
      const hi = clamp(center + spread, 0, 100);
      ranges[def.key] = {
        kind: 'likelihood',
        min: lo, max: hi,
        step: 1,
        def: center,
        unit: '%'
      };
    }
  });

  return ranges;
}

/* ====================================================================
 * 4. Compute genetic surprise (depends only on parents)
 * ==================================================================== */

function computeSurprise(parents) {
  const diffs = [];

  // continuous & range traits
  const contKeys = [
    { key: 'height',            span: 50 },
    { key: 'athletic',          span: 9 },
    { key: 'openness',          span: 9 },
    { key: 'conscientiousness', span: 9 },
    { key: 'extraversion',      span: 9 },
    { key: 'agreeableness',     span: 9 },
    { key: 'neuroticism',       span: 9 }
  ];
  contKeys.forEach(k => {
    const d = Math.abs(parents.A[k.key] - parents.B[k.key]) / k.span;
    diffs.push(clamp(d, 0, 1));
  });

  // ladder traits
  const ladderKeys = [
    { key: 'eyeColor',  ladder: EYE_LADDER  },
    { key: 'hairColor', ladder: HAIR_LADDER },
    { key: 'hairType',  ladder: TEX_LADDER  },
    { key: 'skinTone',  ladder: SKIN_LADDER },
    { key: 'faceShape', ladder: FACE_LADDER },
    { key: 'freckles',  ladder: FRECK_LADDER },
    { key: 'dimples',   ladder: DIMPLE_LADDER }
  ];
  ladderKeys.forEach(k => {
    const ai = k.ladder.indexOf(parents.A[k.key]);
    const bi = k.ladder.indexOf(parents.B[k.key]);
    const d = Math.abs(ai - bi) / (k.ladder.length - 1);
    diffs.push(clamp(d, 0, 1));
  });

  const avg = diffs.reduce((s, v) => s + v, 0) / diffs.length;
  // base 8% so it's never zero — life always has uncertainty. Chaos mode amplifies.
  const chaosBoost = state.chaos ? 30 : 0;
  return Math.round(clamp(avg * 90 + 8 + chaosBoost, 0, 100));
}

/* ====================================================================
 * 5. Render sliders
 * ==================================================================== */

// Identifies which SLIDER_DEFS entries are personality (OCEAN) vs physical.
const PERSONALITY_OCEAN_KEYS = new Set([
  'openness','conscientiousness','extraversion','agreeableness','neuroticism'
]);

// Maps an OCEAN key back to its Kids view (used by sync helpers).
function kidsViewForOcean(oceanKey) {
  return KIDS_TRAIT_VIEW.find(v => v.oceanKey === oceanKey);
}

// Pushes a baby-state value into whatever slider DOM is currently rendered
// (Standard uses #s_<oceanKey>; Kids uses #s_<kidsKey> with possible inversion).
function syncSliderDOMForOcean(oceanKey, oceanValue) {
  if (isKids() && PERSONALITY_OCEAN_KEYS.has(oceanKey)) {
    const view = kidsViewForOcean(oceanKey);
    if (!view) return;
    const slider = $('#s_' + view.kidsKey);
    if (slider) {
      const displayed = view.invert ? (11 - oceanValue) : oceanValue;
      slider.value = displayed;
      updateBandMarker(view.kidsKey, displayed, { min: Number(slider.min), max: Number(slider.max) });
    }
    return;
  }
  const slider = $('#s_' + oceanKey);
  if (slider) {
    slider.value = oceanValue;
    if (PERSONALITY_OCEAN_KEYS.has(oceanKey)) {
      updateBandMarker(oceanKey, oceanValue, { min: Number(slider.min), max: Number(slider.max) });
    }
  }
}

function buildExplainerHTML(key) {
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  const explainers = (KIDS_EXPLAINERS && KIDS_EXPLAINERS[lang]) || (KIDS_EXPLAINERS && KIDS_EXPLAINERS.en) || KIDS_EXPLAINERS;
  const text = explainers[key];
  if (!text || !isKids()) return '';
  const tooltip = (KIDS_OCEAN_TOOLTIP && KIDS_OCEAN_TOOLTIP[lang]) || (KIDS_OCEAN_TOOLTIP && KIDS_OCEAN_TOOLTIP.en) || KIDS_OCEAN_TOOLTIP;
  // For the 5 OCEAN-mapped Kids sliders, append the gene-environment
  // one-liner so users see WHY personality bands are speculative.
  const isOceanKidsKey = KIDS_TRAIT_VIEW.some(v => v.kidsKey === key);
  const body = isOceanKidsKey
    ? `${text} <span class="slider-popover-aside">${tooltip}</span>`
    : text;
  return `
    <button type="button" class="slider-explain" aria-expanded="false"
            data-target="exp_${key}" title="${localLabel('How does this work?')}">?</button>
    <div class="slider-popover" id="exp_${key}">${body}</div>`;
}

/* ---------- Confidence band SVG ----------
 * Visualizes the natural-variation distribution for a personality
 * slider as a Gaussian-ish bell centered on the midparent value.
 * A vertical marker tracks the user's current position so any push
 * away from the midpoint is visible against the underlying bell.
 */
function bellPath(width, height, midX, sigmaX) {
  const steps = 50;
  const peakH = height - 2;
  let d = `M 0 ${height}`;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const z = sigmaX > 0 ? (x - midX) / sigmaX : 0;
    const y = sigmaX > 0 ? Math.exp(-(z*z) / 2) : 0;
    d += ` L ${x.toFixed(2)} ${(height - y * peakH).toFixed(2)}`;
  }
  d += ` L ${width} ${height} Z`;
  return d;
}

function buildConfidenceBandHTML(rangeKey, displayMid, displaySigma, r, currentDisplayed) {
  if (!r || r.max <= r.min) return '';
  const W = 100, H = 28;
  const span = r.max - r.min;
  const midX = Math.max(0, Math.min(W, ((displayMid - r.min) / span) * W));
  const sigmaX = (displaySigma / span) * W;
  const d = bellPath(W, H, midX, sigmaX);
  const cur = Math.max(0, Math.min(W, ((currentDisplayed - r.min) / span) * W));
  // Surface the range's uncertainty category (speculative for OCEAN,
  // phenotypic for physical polygenic) so CSS can style the band fill
  // differently per category. No visual change wired here yet.
  // LOOP_REQUEST(frontend): style [data-uncertainty="speculative"] band
  // differently (e.g. dashed pattern) so OCEAN bands read as a different
  // inheritance category.
  const uncertainty = r.uncertaintyClass || 'phenotypic';
  return `<svg class="confidence-band-svg" data-uncertainty="${uncertainty}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
    <path d="${d}" class="band-fill" />
    <line class="midparent-marker" x1="${midX.toFixed(2)}" y1="2" x2="${midX.toFixed(2)}" y2="${H}" />
    <line class="current-marker"   x1="${cur.toFixed(2)}"  y1="0" x2="${cur.toFixed(2)}"  y2="${H}" data-band="${rangeKey}" />
  </svg>`;
}

// Move just the current-position marker; used on every slider input.
function updateBandMarker(rangeKey, currentDisplayed, r) {
  if (!r || r.max <= r.min) return;
  const marker = document.querySelector(`.current-marker[data-band="${rangeKey}"]`);
  if (!marker) return;
  const span = r.max - r.min;
  const x = Math.max(0, Math.min(100, ((currentDisplayed - r.min) / span) * 100));
  marker.setAttribute('x1', x.toFixed(2));
  marker.setAttribute('x2', x.toFixed(2));
}

function bindExplainer(row) {
  const btn = row.querySelector('.slider-explain');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const target = row.querySelector('#' + btn.dataset.target);
    if (!target) return;
    const open = target.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

function renderStandardSlider(def, ranges, container) {
  const r = ranges[def.key];
  const row = document.createElement('div');
  row.className = 'slider-row';
  row.dataset.key = def.key;

  const headValSpan = `<span class="slider-value" id="val_${def.key}"></span>`;
  let footLabels = '';
  if (r.kind === 'ladder') {
    footLabels = `<div class="slider-foot"><span>${titleCase(r.ladder[r.min])}</span><span>${titleCase(r.ladder[r.max])}</span></div>`;
  } else if (r.kind === 'continuous' || r.kind === 'polygenic') {
    footLabels = `<div class="slider-foot"><span>${r.min}${r.unit||''}</span><span>${r.max}${r.unit||''}</span></div>`;
  } else if (r.kind === 'likelihood') {
    footLabels = `<div class="slider-foot"><span>${r.min}%</span><span>${r.max}%</span></div>`;
  }

  // Confidence band only for personality (polygenic) sliders.
  let bandHTML = '';
  if (PERSONALITY_OCEAN_KEYS.has(def.key) && state.parents?.A && state.parents?.B) {
    const mid = (state.parents.A[def.key] + state.parents.B[def.key]) / 2;
    // Use the effective sigma the range was built from, so the bell width
    // reflects the actual ± window — not a constant baseline.
    bandHTML = buildConfidenceBandHTML(def.key, mid, r.sigma ?? PERSONALITY_SIGMA, r, r.def);
  }

  row.innerHTML = `
    <div class="slider-head">
      <span class="slider-label">${localLabel(def.label)}${buildExplainerHTML(def.key)}</span>
      ${headValSpan}
    </div>
    <input type="range" id="s_${def.key}" min="${r.min}" max="${r.max}" step="${r.step}" value="${r.def}" />
    ${bandHTML}
    ${footLabels}
  `;
  container.appendChild(row);
  bindExplainer(row);

  const input = $('#s_' + def.key, row);
  input.addEventListener('input', () => {
    state.baby[def.key] = Number(input.value);
    if (PERSONALITY_OCEAN_KEYS.has(def.key)) {
      updateBandMarker(def.key, Number(input.value), r);
    }
    updateBabyPreview();
  });
  state.baby[def.key] = r.def;
}

// In Kids mode, render the friendly personality slider (curiosity/kindness/…)
// over the underlying OCEAN range. `confidence` inverts neuroticism.
function renderKidsPersonalitySlider(view, ranges, container) {
  const r = ranges[view.oceanKey];
  const dispMin = view.invert ? (11 - r.max) : r.min;
  const dispMax = view.invert ? (11 - r.min) : r.max;
  const dispDef = view.invert ? (11 - r.def) : r.def;

  const row = document.createElement('div');
  row.className = 'slider-row';
  row.dataset.key = view.kidsKey;
  row.dataset.ocean = view.oceanKey;
  row.dataset.invert = view.invert ? '1' : '0';

  // Confidence band: midparent + sigma reflected through any invert.
  let bandHTML = '';
  if (state.parents?.A && state.parents?.B) {
    const midOcean = (state.parents.A[view.oceanKey] + state.parents.B[view.oceanKey]) / 2;
    const midDisplay = view.invert ? (11 - midOcean) : midOcean;
    const displayR = { min: dispMin, max: dispMax, def: dispDef, uncertaintyClass: r.uncertaintyClass };
    // Effective sigma is symmetric under the invert flip — reuse the value
    // generateSliderRanges computed for this trait.
    bandHTML = buildConfidenceBandHTML(view.kidsKey, midDisplay, r.sigma ?? PERSONALITY_SIGMA, displayR, dispDef);
  }

  row.innerHTML = `
    <div class="slider-head">
      <span class="slider-label">${localLabel(view.label)}${buildExplainerHTML(view.kidsKey)}</span>
      <span class="slider-value" id="val_${view.kidsKey}"></span>
    </div>
    <input type="range" id="s_${view.kidsKey}" min="${dispMin}" max="${dispMax}" step="1" value="${dispDef}" />
    ${bandHTML}
    <div class="slider-foot"><span>${dispMin}/10</span><span>${dispMax}/10</span></div>
  `;
  container.appendChild(row);
  bindExplainer(row);

  const displayR = { min: dispMin, max: dispMax };
  const input = $('#s_' + view.kidsKey, row);
  // Round 6 rev (UX, ETHICS): soft pure-text ack when a Kids-mode slider
  // is dragged >1.0 display-unit away from the midparent. No modal, no
  // animation, no gate — just a quiet line that appears in-place.
  const KIDS_SLIDER_EXTREME_ACK = {
    en: ["You're imagining possibilities — no actual choices are being made here."],
    zh: ['你只是在想象各种可能——这里没有人在做真正的选择。'],
    ja: ['いろんな可能性を想像しているだけ——ここで本当の選択をしているわけじゃないよ。'],
    ko: ['여러 가능성을 상상해 보는 거예요 — 여기서 실제로 선택이 이뤄지진 않아요.'],
    tr: ['Olasılıkları hayal ediyorsun — burada gerçek bir seçim yapılmıyor.']
  };
  const midOceanForAck = (state.parents?.A && state.parents?.B)
    ? (state.parents.A[view.oceanKey] + state.parents.B[view.oceanKey]) / 2
    : null;
  const midDisplayForAck = (midOceanForAck == null) ? null
    : (view.invert ? (11 - midOceanForAck) : midOceanForAck);
  input.addEventListener('input', () => {
    const v = Number(input.value);
    state.baby[view.oceanKey] = view.invert ? (11 - v) : v;
    updateBandMarker(view.kidsKey, v, displayR);
    updateBabyPreview();
    if (midDisplayForAck != null) {
      let ack = row.querySelector('.kids-slider-extreme-ack');
      if (Math.abs(v - midDisplayForAck) > 1.0) {
        if (!ack) {
          ack = document.createElement('p');
          ack.className = 'kids-slider-extreme-ack subtle';
          row.appendChild(ack);
        }
        ack.textContent = localList(KIDS_SLIDER_EXTREME_ACK)[0];
      } else if (ack) {
        ack.remove();
      }
    }
  });
  state.baby[view.oceanKey] = view.invert ? (11 - dispDef) : dispDef;
}

function renderSliders(ranges) {
  const container = $('#sliders');
  container.innerHTML = '';

  if (isKids()) {
    // Physical sliders unchanged, with friendlier copy via labels (re-used).
    SLIDER_DEFS.forEach(def => {
      if (PERSONALITY_OCEAN_KEYS.has(def.key)) return;
      renderStandardSlider(def, ranges, container);
    });
    // Personality sliders replaced with Kids view.
    KIDS_TRAIT_VIEW.forEach(view => {
      renderKidsPersonalitySlider(view, ranges, container);
    });
  } else {
    SLIDER_DEFS.forEach(def => renderStandardSlider(def, ranges, container));
  }
}

/* ====================================================================
 * 6. Update baby preview (stats, archetype, avatar)
 * ==================================================================== */

function updateBabyPreview() {
  const b = state.baby;

  // resolve display values (ladder values localized through LADDER_I18N)
  const display = {
    height:    `${Math.round(b.height)} cm`,
    athletic:  `${b.athletic}/10`,
    eyeColor:  localLadder('EYE',  b.eyeColor),
    hairColor: localLadder('HAIR', b.hairColor),
    hairType:  localLadder('TEX',  b.hairType),
    skinTone:  localLadder('SKIN', b.skinTone),
    faceShape: localLadder('FACE', b.faceShape),
    freckles:  `${b.freckles}%`,
    dimples:   `${b.dimples}%`,
    openness:          `${b.openness}/10`,
    conscientiousness: `${b.conscientiousness}/10`,
    extraversion:      `${b.extraversion}/10`,
    agreeableness:     `${b.agreeableness}/10`,
    neuroticism:       `${b.neuroticism}/10`
  };

  // update slider value labels
  if (isKids()) {
    // Physical sliders use OCEAN keys → display values directly.
    SLIDER_DEFS.forEach(def => {
      if (PERSONALITY_OCEAN_KEYS.has(def.key)) return;
      const el = $('#val_' + def.key);
      if (el) el.textContent = display[def.key];
    });
    // Personality sliders: kid-friendly axes (confidence inverts N).
    KIDS_TRAIT_VIEW.forEach(view => {
      const raw = b[view.oceanKey];
      const shown = view.invert ? (11 - raw) : raw;
      const el = $('#val_' + view.kidsKey);
      if (el) el.textContent = `${shown}/10`;
    });
  } else {
    SLIDER_DEFS.forEach(def => {
      const el = $('#val_' + def.key);
      if (el) el.textContent = display[def.key];
    });
  }

  // update stats panel
  const statsEl = $('#baby-stats');
  const inAdult = state.appMode === 'adult';
  const conf = (k) => {
    if (!inAdult) return '';
    const c = CONFIDENCE[k];
    if (!c) return '';
    return ` <span class="confidence ${c.label}">${localLabel(c.label)}${c.unc ? ` · ${c.unc}` : ''}</span>`;
  };
  // Stats panel: physical traits are always shown. Personality numbers
  // are hidden in Reflection / Kids (the constellation shows them
  // visually) and kept in Adult for the clinical-detail aesthetic.
  const physicalRows = `
      <dt>${localLabel('Sex')}</dt>           <dd>${localGender(state.gender) || localGender('surprise')}</dd>
      <dt>${localLabel('Height')}</dt>        <dd>~ ${display.height}${conf('height')}</dd>
      <dt>${localLabel('Athletic')}</dt>      <dd>${display.athletic}${conf('athletic')}</dd>
      <dt>${localLabel('Eye color')}</dt>     <dd>${display.eyeColor}${conf('eyeColor')}</dd>
      <dt>${localLabel('Hair color')}</dt>    <dd>${display.hairColor}${conf('hairColor')}</dd>
      <dt>${localLabel('Hair texture')}</dt>  <dd>${display.hairType}${conf('hairType')}</dd>
      <dt>${localLabel('Skin tone')}</dt>     <dd>${display.skinTone}${conf('skinTone')}</dd>
      <dt>${localLabel('Face shape')}</dt>    <dd>${display.faceShape}${conf('faceShape')}</dd>
      <dt>${localLabel('Freckles')}</dt>      <dd>${display.freckles}${conf('freckles')}</dd>
      <dt>${localLabel('Dimples')}</dt>       <dd>${display.dimples}${conf('dimples')}</dd>
  `;
  let personalityRows = '';
  if (inAdult) {
    personalityRows = `
      <dt class="ocean-sep">${localLabel('Behavioral Projection')}</dt> <dd></dd>
      <dt>${localLabel('Openness')}</dt>           <dd>${display.openness}${conf('openness')}</dd>
      <dt>${localLabel('Conscientiousness')}</dt>  <dd>${display.conscientiousness}${conf('conscientiousness')}</dd>
      <dt>${localLabel('Extraversion')}</dt>       <dd>${display.extraversion}${conf('extraversion')}</dd>
      <dt>${localLabel('Agreeableness')}</dt>      <dd>${display.agreeableness}${conf('agreeableness')}</dd>
      <dt>${localLabel('Neuroticism')}</dt>        <dd>${display.neuroticism}${conf('neuroticism')}</dd>`;
  }
  statsEl.innerHTML = physicalRows + personalityRows;

  // Derived-stat star row (Kids mode only — CSS hides in Standard).
  renderKidsDerivedStats(b);

  // archetype: key stays English (used for save/load); display is localized.
  const archetype = calculateArchetype(b);
  $('#archetype').textContent = localizeArchetype(archetype);
  state.archetype = archetype;

  // chaos badge visibility
  const cb = $('#chaos-badge');
  if (cb) cb.hidden = !state.chaos;

  // future vibe + paths + random events + news headlines
  const vibeEl = $('#vibe-title');
  if (vibeEl) {
    if (state.appMode === 'adult' || !state.vibe) {
      vibeEl.textContent = '';
      vibeEl.hidden = true;
    } else {
      vibeEl.textContent = state.vibe;
      vibeEl.hidden = false;
    }
  }
  const pathsEl = $('#future-paths');
  if (pathsEl) {
    pathsEl.innerHTML = (state.futurePaths || []).map(t => `<li>${t}</li>`).join('');
  }
  const eventsEl = $('#random-events');
  if (eventsEl) {
    eventsEl.innerHTML = (state.events || []).map(t => `<span class="event-chip">${t}</span>`).join('');
  }
  const headlinesEl = $('#future-headlines');
  if (headlinesEl) {
    headlinesEl.innerHTML = (state.headlines || []).map(t => `<li>“${t}”</li>`).join('');
  }
  const futureBlock = $('#future-block');
  if (futureBlock) {
    futureBlock.hidden = !(state.futurePaths && state.futurePaths.length);
    // Closes LOOP_REQUEST(ux-flow): soften the Kids-mode futures framing
    // with KIDS_FUTURES_PREAMBLE injected directly after the h3 heading.
    // One <p>, created lazily, removed in other modes so it never leaks copy.
    let preamble = futureBlock.querySelector('.kids-futures-preamble');
    if (isKids() && !futureBlock.hidden) {
      if (!preamble) {
        preamble = document.createElement('p');
        preamble.className = 'kids-futures-preamble';
        const heading = futureBlock.querySelector('#future-block-heading');
        if (heading && heading.nextSibling) {
          futureBlock.insertBefore(preamble, heading.nextSibling);
        } else if (heading) {
          futureBlock.appendChild(preamble);
        } else {
          futureBlock.insertBefore(preamble, futureBlock.firstChild);
        }
      }
      {
        const lang = (state && state.language) ? state.language : 'en';
        preamble.textContent = (KIDS_FUTURES_PREAMBLE && KIDS_FUTURES_PREAMBLE[lang]) || (KIDS_FUTURES_PREAMBLE && KIDS_FUTURES_PREAMBLE.en) || KIDS_FUTURES_PREAMBLE;
      }
    } else if (preamble) {
      preamble.remove();
    }
  }

  // Adult gen ≥ 2 panel order — R11 rev: trait-history → sibling-cohort →
  // (variance break) → societal brief. Prior order placed Societal Brief
  // and Trait History in an adjacent optimization-critique cluster; moving
  // the Sibling Cohort variance panel between the trait-lens and
  // societal-lens critiques separates the two evaluation frames so each
  // lands on its own beat instead of compounding.
  renderTraitHistory();
  renderSiblingCohort();
  renderDivergence();
  renderSocialResponse();

  // Reflection-mode arc: same person, different rooms / decades.
  renderInnerCohort();
  renderLifetimeDrift();

  // Kids-mode arc: wonder, curious questions, variance-as-gift.
  renderKidsLoves();
  renderKidsQuestions();
  renderKidsDifferences();

  // Trait conflicts (tradeoff chips). Round 6 rev (UX): in Kids mode the
  // diagnostic "tradeoff" framing clashes with the affirmation register of
  // the 3 Kids-arc panels, so suppress the whole block before any DOM is
  // generated.
  // Round 7 (UX): the consent-awareness one-liner used to be prepended
  // here at gen ≥ 1 in Adult mode. It now lives in #consent-awareness-leadin
  // above the Enhancement Allocation header so the ethical framing arrives
  // BEFORE the behavioral projection rather than buried at panel bottom.
  // See applyBudgetPanelGate() for the new render site.
  const conflictsEl = $('#trait-conflicts');
  if (conflictsEl && isKids()) {
    conflictsEl.hidden = true;
    conflictsEl.innerHTML = '';
  } else if (conflictsEl) {
    if (state.conflicts && state.conflicts.length) {
      conflictsEl.hidden = false;
      conflictsEl.innerHTML = `
        <h3>${localLabel('Trait tradeoffs')}</h3>
        <div class="conflict-chips">
          ${state.conflicts.map(c => `
            <div class="conflict-chip" title="${c.note}">
              <span class="conflict-tag">${c.tag}</span>
              <span class="conflict-note">${c.note}</span>
            </div>`).join('')}
        </div>`;
    } else {
      conflictsEl.hidden = true;
      conflictsEl.innerHTML = '';
    }
  }

  // Reflection prompt — Reflection mode uses the richer Pause panel.
  // Round 6 rev (UX): Kids-mode prompt removed; the 3-panel Kids arc
  // (Loves / Questions / Differences) carries the affirmation register
  // on its own without a competing italic prompt.
  const reflEl = $('#reflection-prompt');
  if (reflEl) { reflEl.hidden = true; }

  // Pause panel (Reflection mode only): observations + cannot-see + a prompt.
  renderPausePanel();

  // Behavioral trace cards (all modes, mode-aware copy).
  renderBehavioralTraces();

  // Trait constellation visualization (all modes, mode-aware styling).
  renderTraitConstellation(b);

  // Future branching tree (all modes, mode-aware styling).
  renderFutureTree();

  // Mode-specific deepenings:
  // - Kids: hobby constellation
  // - Reflection: memory snapshot cards (At 7 / 17 / 47)
  // - Adult: regulatory-context notes (handled in updateBudgetBar)
  renderHobbyConstellation(b);
  renderMemoryCards();

  // Life-stage avatar strip — three small avatars (At 7 / 17 / 47)
  // alongside the main one so the person reads across time.
  renderLifeStageStrip(b);

  // Aging scrubber — single slider you can drag through the person's
  // life. The main avatar re-seeds per age, ticker line updates.
  renderAgingScrubber();
  setupAgeScrubberListener();

  // Generational lineage cascade (parents → baby → hypothetical
  // grandchildren). Lives in its own panel below the baby panel.
  renderLineageTree(b);

  // Recompute the cool/warm UI evolution based on slider drift.
  updateOptIntensity();

  // Reflection epigraph + Adult case-file header sit above the codename.
  renderProfileEpigraph();
  renderCaseFile();

  // avatar
  updateAvatar(b);
}

/* ---------- Reflection: profile epigraph ----------
 * One literary opening line above the codename, seeded by codename so
 * it's stable per baby. Reflection mode only. */
function renderProfileEpigraph() {
  const host = $('#profile-epigraph');
  if (!host) return;
  if (state.appMode !== 'reflection' || !state.codename) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const rng = seededRand(state.codename + '|epigraph');
  const eps = localList(REFLECTION_EPIGRAPHS);
  const line = eps[Math.floor(rng() * eps.length)];
  host.hidden = false;
  host.innerHTML = `<p class="epigraph-text">${line}</p>`;
}

/* ---------- Adult: clinical case-file header ----------
 * Five-row monospace metadata strip rendered above the codename in
 * Adult mode. Reads as a dossier opener: subject ID, cohort, profile
 * version, generation timestamp, classification tier. The
 * classification tier shifts with optimization intensity, so the
 * header gets quietly more severe as the user pushes harder. */
function renderCaseFile() {
  const host = $('#case-file');
  if (!host) return;
  if (state.appMode !== 'adult' || !state.codename) {
    host.hidden = true;
    host.classList.remove('is-settling');
    host.innerHTML = '';
    // R5: clear the last-rendered tier/codename when leaving Adult mode
    // so the next entry re-runs the settle motion on a fresh opening.
    host.dataset.lastTier = '';
    host.dataset.lastCodename = '';
    return;
  }
  const ts = new Date();
  const tsStr =
    ts.getUTCFullYear() + '-' +
    String(ts.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(ts.getUTCDate()).padStart(2, '0') + ' · ' +
    String(ts.getUTCHours()).padStart(2, '0') + ':' +
    String(ts.getUTCMinutes()).padStart(2, '0') + 'Z';
  const intensity = state.optIntensity || 0;
  let tier = 'Tier I · Baseline';
  if (intensity > 0.30) tier = 'Tier II · Moderate optimization';
  if (intensity > 0.60) tier = 'Tier III · Elevated optimization';
  if (intensity > 0.85) tier = 'Tier IV · Boundary case — review required';
  const profileV = (state.generateCount || 0) + '.' + Math.floor((state.surprise || 0) / 10);
  const disclosure = intensity > 0.45 ? 'required' : 'not required';
  // R4 pacing micro-adjustment: faint downward settle on first reveal of
  // the dossier opener (the Adult fascination → unease beat).
  // R5 (UX polish): only re-fire the settle when the tier OR codename
  // actually changed — not on every render (slider drift, generation
  // count tick, timestamp refresh). Track the last applied tier+codename
  // via dataset attributes so the motion marks a meaningful step
  // change, not background re-renders. Reduced-motion users see a
  // static fade via CSS regardless.
  const wasHidden = host.hidden;
  host.hidden = false;
  const prevTier = host.dataset.lastTier || '';
  const prevCodename = host.dataset.lastCodename || '';
  const tierChanged = tier !== prevTier;
  const codenameChanged = state.codename !== prevCodename;
  const shouldSettle = wasHidden || tierChanged || codenameChanged;
  if (shouldSettle) {
    host.classList.remove('is-settling');
    void host.offsetWidth;
    host.classList.add('is-settling');
  }
  host.dataset.lastTier = tier;
  host.dataset.lastCodename = state.codename;
  host.innerHTML = `
    <div class="case-row"><span class="case-label">${localLabel('Simulation Codename')}</span><span class="case-value">${state.codename}</span></div>
    <div class="case-row"><span class="case-label">${localLabel('Cohort')}</span><span class="case-value">ENH-2042</span></div>
    <div class="case-row"><span class="case-label">${localLabel('Profile')}</span><span class="case-value">v${profileV}</span></div>
    <div class="case-row"><span class="case-label">${localLabel('Generated')}</span><span class="case-value">${tsStr}</span></div>
    <div class="case-row"><span class="case-label">${localLabel('Optimization Intensity')}</span><span class="case-value case-tier">${tier}</span></div>
    <div class="case-row"><span class="case-label">${localLabel('Disclosure')}</span><span class="case-value">${disclosure}</span></div>
  `;
}

function renderPausePanel() {
  const panel = $('#pause-panel');
  if (!panel) return;
  // R14 rev (Product MAJOR): also render in Adult mode wrapped in a
  // default-collapsed <details> so the ethical limits are always
  // discoverable next to the optimization output without intruding.
  const mode = state.appMode;
  const isRefl = mode === 'reflection';
  const isAdlt = mode === 'adult';
  if ((!isRefl && !isAdlt) || !state.codename) {
    panel.hidden = true;
    panel.style.display = '';
    panel.classList.remove('pause-as-details');
    return;
  }
  panel.hidden = false;
  // Inline display override defeats the body.mode-adult:not(.show-details)
  // CSS rule that would otherwise hide the panel in Adult mode.
  panel.style.display = isAdlt ? 'block' : '';
  panel.classList.toggle('pause-as-details', isAdlt);

  // R14rev (Narrative): decouple the obs pick from the cant-see pick so a
  // change to either pool can't shift the other. Each gets its own seed key
  // derived from the codename; same simulation still surfaces the same two
  // observations and the same four cannot-measure lines deterministically.
  const obsRng  = seededRand(state.codename + '|pause-obs');
  const cantRng = seededRand(state.codename + '|pause-cant');
  const obs  = pickN(localList(REFLECTION_OBSERVATIONS), 2, obsRng);
  const cant = pickN(localList(CANNOT_MEASURE), 4, cantRng);
  const question = state.reflection || pickReflectionPrompt(state.codename);

  const obsHtml  = obs.map(o => `<li>${o}</li>`).join('');
  const cantHtml = cant.map(c => `<li>${c}</li>`).join('');
  const qHtml    = `<span class="pause-q-mark">?</span> ${question}`;

  if (isAdlt) {
    // Render the same content inside a default-collapsed <details>.
    // Preserve user's open/closed choice across re-renders.
    const prev = $('#pause-details');
    const wasOpen = prev ? prev.open : false;
    const heading = $('#pause-heading');
    const headingText = heading ? heading.textContent : 'A pause to consider';
    const summary = localLabel('Limitations & ethics') || 'Limitations & ethics';
    panel.innerHTML =
      `<details id="pause-details"${wasOpen ? ' open' : ''}>` +
        `<summary>${summary}</summary>` +
        `<h3 id="pause-heading">${headingText}</h3>` +
        `<ul class="pause-observations" id="pause-observations">${obsHtml}</ul>` +
        `<h4 class="pause-cant-see-heading">Things this simulator cannot see</h4>` +
        `<ul class="pause-cant-see" id="pause-cant-see">${cantHtml}</ul>` +
        `<div class="pause-question" id="pause-question">${qHtml}</div>` +
      `</details>`;
    return;
  }

  // Reflection mode: ensure original (un-wrapped) structure is present.
  if (!$('#pause-observations') || $('#pause-details')) {
    panel.innerHTML =
      `<h3 id="pause-heading">A pause to consider</h3>` +
      `<ul class="pause-observations" id="pause-observations"></ul>` +
      `<h4 class="pause-cant-see-heading">Things this simulator cannot see</h4>` +
      `<ul class="pause-cant-see" id="pause-cant-see"></ul>` +
      `<div class="pause-question" id="pause-question"></div>`;
  }
  $('#pause-observations').innerHTML = obsHtml;
  $('#pause-cant-see').innerHTML     = cantHtml;
  $('#pause-question').innerHTML     = qHtml;
}

/* ---------- Kids-mode derived stats (creativity, teamwork) ---------- */
// Read-only star ratings displayed under the codename in Kids mode.
// Kept derivation simple: weighted blends of OCEAN + inverted N.
function computeKidsDerived(b) {
  const O = b.openness || 0;
  const A = b.agreeableness || 0;
  const E = b.extraversion || 0;
  const N = b.neuroticism || 0;
  const conf = 11 - N;
  const creativity = clamp(Math.round((O * 0.7 + conf * 0.3)), 1, 10);
  const teamwork   = clamp(Math.round((A * 0.6 + E * 0.4)), 1, 10);
  return { creativity, teamwork };
}

function starString(value10) {
  const stars = Math.round(value10 / 2); // 1..10 → 1..5 stars
  return '★'.repeat(stars) + '☆'.repeat(Math.max(0, 5 - stars));
}

function renderKidsDerivedStats(b) {
  const cEl = $('#kids-creativity-stars');
  const tEl = $('#kids-teamwork-stars');
  if (!cEl || !tEl) return;
  // Also re-write the preceding <dt> labels (Creativity / Teamwork) so
  // they swap when the user changes language.
  const cDt = cEl.previousElementSibling;
  const tDt = tEl.previousElementSibling;
  if (cDt && cDt.tagName === 'DT') cDt.textContent = localLabel('Creativity');
  if (tDt && tDt.tagName === 'DT') tDt.textContent = localLabel('Teamwork');
  if (!isKids()) {
    cEl.textContent = '☆☆☆☆☆';
    tEl.textContent = '☆☆☆☆☆';
    return;
  }
  const { creativity, teamwork } = computeKidsDerived(b);
  cEl.textContent = `${starString(creativity)}  (${creativity}/10)`;
  tEl.textContent = `${starString(teamwork)}  (${teamwork}/10)`;
}

/* ---------- Kids: Hobby Constellation ----------
 * Six hobbies sampled from KIDS_HOBBIES, weighted by the baby's top
 * personality dimensions. Arranged as a ring of nodes around a small
 * central "child" point. Same SVG idiom as the Trait Constellation. */
function pickHobbiesForBaby(b, codename, count = 6) {
  const tagFor = {
    openness: 'O', conscientiousness: 'C', extraversion: 'E',
    agreeableness: 'A', neuroticism: 'N', athletic: 'athletic'
  };
  const weights = Object.fromEntries(Object.keys(tagFor).map(k => [tagFor[k], (b[k] || 5) / 10]));
  const rng = seededRand(codename + '|hobbies');
  const scored = localList(KIDS_HOBBIES).map(h => ({
    h,
    w: rng() * 0.5 + (weights[h.tag] || 0.4)
  })).sort((a, b) => b.w - a.w);
  return scored.slice(0, count).map(s => s.h);
}

function renderHobbyConstellation(b) {
  const host = $('#hobby-constellation');
  if (!host) return;
  if (!isKids() || !state.codename) { host.innerHTML = ''; return; }

  const hobbies = pickHobbiesForBaby(b, state.codename, 6);
  const W = 280, H = 220;
  const cx = W / 2, cy = H / 2;
  const ringR = 78;
  const n = hobbies.length;

  let lines = '';
  let nodes = '';
  hobbies.forEach((h, i) => {
    const theta = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + ringR * Math.cos(theta);
    const y = cy + ringR * Math.sin(theta);
    // Line from center to each node.
    lines += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="hobby-link" />`;
    // Label sits a touch outward.
    const labelR = ringR + 22;
    const lx = cx + labelR * Math.cos(theta);
    const ly = cy + labelR * Math.sin(theta);
    nodes += `<g class="hobby-node">
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" />
      <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${h.name}</text>
    </g>`;
  });
  // Central child marker.
  const center = `<circle cx="${cx}" cy="${cy}" r="9" class="hobby-center" />`;

  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="hobby-constellation-svg" role="img" aria-label="${localLabel('Predicted hobbies')}">
    <g class="hobby-links">${lines}</g>
    ${center}
    <g class="hobby-nodes">${nodes}</g>
  </svg>`;
}

/* ---------- Reflection: Memory Snapshot cards ----------
 * Three small horizontal cards showing one memory each from
 * childhood / adolescence / adulthood. Seeded by codename so each
 * baby has stable memories. Reflection mode only. */
function pickStableFrom(pool, seed) {
  const arr = localList(pool);
  if (!arr || !arr.length) return '';
  const rng = seededRand(seed);
  return arr[Math.floor(rng() * arr.length)];
}

function renderMemoryCards() {
  const host = $('#memory-cards');
  if (!host) return;
  if (state.appMode !== 'reflection' || !state.codename) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const c = state.codename;
  const m7  = pickStableFrom(CHILDHOOD_MEMORIES,  c + '|m7');
  const m17 = pickStableFrom(ADOLESCENCE_MEMORIES, c + '|m17');
  const m47 = pickStableFrom(ADULTHOOD_MEMORIES,   c + '|m47');

  host.hidden = false;
  const L = (s) => (typeof localLabel === 'function') ? localLabel(s) : s;
  host.innerHTML = `
    <h3 class="memory-heading">${L('Memory snapshots')}</h3>
    <div class="memory-strip">
      <article class="memory-card" data-stage="7">
        <span class="memory-age">${L('At 7')}</span>
        <p class="memory-text">${m7}</p>
      </article>
      <article class="memory-card" data-stage="17">
        <span class="memory-age">${L('At 17')}</span>
        <p class="memory-text">${m17}</p>
      </article>
      <article class="memory-card" data-stage="47">
        <span class="memory-age">${L('At 47')}</span>
        <p class="memory-text">${m47}</p>
      </article>
    </div>`;
}

/* ---------- Life-stage avatar strip ----------
 * Three small avatars rendered alongside the main one: At 7 / At 17 /
 * At 47. Each uses the same trait state (so identity stays consistent)
 * but a per-age seed suffix so DiceBear picks different hair variants
 * within the seeded buckets — the illusion of aging.
 */
const LIFE_STAGES = [
  { age: 7,  label: 'At 7',  i18n: { zh: '7 岁时',  ja: '7歳のとき',  ko: '7살 때',  tr: '7 yaşında' } },
  { age: 17, label: 'At 17', i18n: { zh: '17 岁时', ja: '17歳のとき', ko: '17살 때', tr: '17 yaşında' } },
  { age: 47, label: 'At 47', i18n: { zh: '47 岁时', ja: '47歳のとき', ko: '47살 때', tr: '47 yaşında' } }
];

function renderLifeStageStrip(b) {
  const section = $('#life-stage-section');
  const strip   = $('#life-stage-strip');
  const heading = $('#life-stage-heading');
  if (!section || !strip) return;
  if (!state.codename || !b || typeof b.openness !== 'number') {
    section.hidden = true;
    strip.innerHTML = '';
    return;
  }
  section.hidden = false;
  if (heading) {
    const headingKey =
      state.appMode === 'adult' ? 'Trajectory Snapshots'
      : state.appMode === 'kids' ? 'Future portraits'
      : 'Across the years';
    heading.textContent = (typeof localLabel === 'function') ? localLabel(headingKey) : headingKey;
  }
  const lang = (state && state.language) ? state.language : 'en';
  strip.innerHTML = LIFE_STAGES.map(s => {
    const svg = buildAvatarSvg(b, state.style, state.gender, state.codename + '|age' + s.age);
    const label = (s.i18n && s.i18n[lang]) || s.label;
    return `<figure class="life-stage" data-age="${s.age}">
      <div class="life-stage-avatar">${svg}</div>
      <figcaption class="life-stage-label">${label}</figcaption>
    </figure>`;
  }).join('');
}

/* ---------- Generational lineage tree ----------
 * SVG showing 3 generations: parents at top, the baby in the middle
 * (highlighted), and 2 hypothetical grandchildren as faint silhouettes
 * with dashed connectors. The point is to make the "you are choosing
 * for a chain" angle visible. Each mode styles it distinctively. */
function renderLineageTree(b) {
  const panel = $('#lineage-panel');
  const host  = $('#lineage-tree');
  if (!panel || !host) return;
  if (!state.codename || !state.parents?.A || typeof state.parents.A.openness !== 'number') {
    panel.hidden = true;
    host.innerHTML = '';
    return;
  }
  panel.hidden = false;

  const pA = parentToBabyState(state.parents.A);
  const pB = parentToBabyState(state.parents.B);
  const style = state.style;
  const gender = state.gender;

  const seed = state.codename + '|lineage';
  const rngGrand = seededRand(seed + '|grand');
  const gc1 = synthGrandchild(b, rngGrand);
  const gc2 = synthGrandchild(b, rngGrand);

  const aSvg = buildAvatarSvg(pA, style, 'surprise', seed + '|pA');
  const bSvgA = buildAvatarSvg(pB, style, 'surprise', seed + '|pB');
  const babySvg = buildAvatarSvg(b, style, gender, seed + '|baby');
  const gc1Svg = buildAvatarSvg(gc1, style, 'surprise', seed + '|gc1');
  const gc2Svg = buildAvatarSvg(gc2, style, 'surprise', seed + '|gc2');

  const W = 420, H = 320;
  const pos = {
    pA:   { x: 60,  y: 25,  s: 64, cx: 92,  cy: 89  },
    pB:   { x: 296, y: 25,  s: 64, cx: 328, cy: 89  },
    baby: { x: 178, y: 130, s: 64, cx: 210, cy: 194 },
    gc1:  { x: 82,  y: 235, s: 54, cx: 109, cy: 289 },
    gc2:  { x: 284, y: 235, s: 54, cx: 311, cy: 289 }
  };

  const branches = `
    <path d="M ${pos.pA.cx} ${pos.pA.cy} C ${pos.pA.cx} ${pos.baby.y - 18}, ${pos.baby.cx} ${pos.baby.y - 18}, ${pos.baby.cx} ${pos.baby.y}" class="lineage-line parent-line" />
    <path d="M ${pos.pB.cx} ${pos.pB.cy} C ${pos.pB.cx} ${pos.baby.y - 18}, ${pos.baby.cx} ${pos.baby.y - 18}, ${pos.baby.cx} ${pos.baby.y}" class="lineage-line parent-line" />
    <path d="M ${pos.baby.cx} ${pos.baby.cy} C ${pos.baby.cx} ${pos.gc1.y - 18}, ${pos.gc1.cx} ${pos.gc1.y - 18}, ${pos.gc1.cx} ${pos.gc1.y}" class="lineage-line grandchild-line" />
    <path d="M ${pos.baby.cx} ${pos.baby.cy} C ${pos.baby.cx} ${pos.gc2.y - 18}, ${pos.gc2.cx} ${pos.gc2.y - 18}, ${pos.gc2.cx} ${pos.gc2.y}" class="lineage-line grandchild-line" />
  `;

  const labels = `
    <text class="lineage-label"            x="${pos.pA.cx}"   y="${pos.pA.y - 8}"   text-anchor="middle">Parent A</text>
    <text class="lineage-label"            x="${pos.pB.cx}"   y="${pos.pB.y - 8}"   text-anchor="middle">Parent B</text>
    <text class="lineage-label baby-label" x="${pos.baby.cx}" y="${pos.baby.y - 8}" text-anchor="middle">This baby</text>
    <text class="lineage-label grandchild" x="${pos.gc1.cx}"  y="${pos.gc1.y - 6}"  text-anchor="middle">Hypothetical</text>
    <text class="lineage-label grandchild" x="${pos.gc2.cx}"  y="${pos.gc2.y - 6}"  text-anchor="middle">Hypothetical</text>
  `;

  host.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" class="lineage-svg" role="img" aria-label="${localLabel('Three-generation lineage')}">
      <g class="lineage-lines">${branches}</g>
      <g class="lineage-nodes">
        <g class="node node-parent">${embedAvatarSvg(aSvg,    pos.pA.x,   pos.pA.y,   pos.pA.s,   pos.pA.s)}</g>
        <g class="node node-parent">${embedAvatarSvg(bSvgA,   pos.pB.x,   pos.pB.y,   pos.pB.s,   pos.pB.s)}</g>
        <g class="node node-baby">${embedAvatarSvg(babySvg,   pos.baby.x, pos.baby.y, pos.baby.s, pos.baby.s)}</g>
        <g class="node node-grandchild">${embedAvatarSvg(gc1Svg, pos.gc1.x, pos.gc1.y, pos.gc1.s, pos.gc1.s)}</g>
        <g class="node node-grandchild">${embedAvatarSvg(gc2Svg, pos.gc2.x, pos.gc2.y, pos.gc2.s, pos.gc2.s)}</g>
      </g>
      <g class="lineage-labels">${labels}</g>
    </svg>`;
}

/* ---------- Behavioral Trace Notes ----------
 * Small, specific human details rendered as a 2×2 card grid below the
 * avatar. Different pool per mode; same renderer, same DOM hook.
 */
function pickBehavioralTraces(seed, count = 4) {
  const pool = pickPool(REFLECTION_TRACES, ADULT_TRACES, KIDS_TRACES);
  if (!pool || !pool.length) return [];
  const rng = seededRand(seed + '|traces');
  return pickN(pool, Math.min(count, pool.length), rng);
}

function renderBehavioralTraces() {
  const host = $('#behavioral-traces');
  if (!host) return;
  if (!state.codename) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const traces = pickBehavioralTraces(state.codename, 4);
  if (!traces.length) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const heading = state.appMode === 'adult'
    ? 'Behavioral Trace Notes'
    : (state.appMode === 'kids' ? 'Small memories' : 'Small things they\'ll carry');
  host.hidden = false;
  host.innerHTML = `
    <h3 class="traces-heading">${heading}</h3>
    <div class="traces-grid">
      ${traces.map(t => `<div class="trace-card">${t}</div>`).join('')}
    </div>`;
}

/* ---------- Future Branching Tree ----------
 * Replaces the linear bulleted future-paths list with an SVG tree:
 * a central origin node + 3-4 branches fanning to leaves, each
 * labeled with one future-path text. Mode-aware styling.
 */
function renderFutureTree() {
  const host = $('#future-tree');
  if (!host) return;
  const paths = (state.futurePaths || []).slice(0, 4);
  if (!state.codename || !paths.length) {
    host.innerHTML = '';
    return;
  }

  const W = 380, H = 220;
  const rootX = 50, rootY = H / 2;
  const leafX = 200;                     // anchor x for leaf dot
  const textX = leafX + 14;              // text starts after dot
  const n = paths.length;
  const spread = Math.min(H - 30, 50 + n * 35); // vertical spread of leaves
  const startY = (H - spread) / 2;
  const step = n > 1 ? spread / (n - 1) : 0;

  let svg = '';
  // Branches first (so they sit behind leaves).
  paths.forEach((_, i) => {
    const y = startY + i * step;
    const c1x = rootX + (leafX - rootX) * 0.55;
    const c1y = rootY;
    const c2x = rootX + (leafX - rootX) * 0.55;
    const c2y = y;
    svg += `<path d="M ${rootX} ${rootY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${leafX} ${y}" class="branch" />`;
  });
  // Root node.
  svg += `<circle cx="${rootX}" cy="${rootY}" r="7" class="root" />`;
  // Leaves with text. Wrap long text with foreignObject for legible line-wrap.
  paths.forEach((text, i) => {
    const y = startY + i * step;
    const safe = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    svg += `<g class="leaf">
      <circle cx="${leafX}" cy="${y}" r="5" />
      <foreignObject x="${textX}" y="${y - 22}" width="${W - textX - 8}" height="44">
        <div xmlns="http://www.w3.org/1999/xhtml" class="leaf-text">${safe}</div>
      </foreignObject>
    </g>`;
  });

  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="future-tree-svg" role="img" aria-label="${localLabel('Branching future paths')}">${svg}</svg>`;
}

/* ---------- Trait Constellation ----------
 * SVG visualization of the baby's personality as five nodes on a circle,
 * connected by lines whose opacity scales with the product of endpoint
 * values. Replaces the text-heavy personality dl in Reflection / Kids;
 * supplements it in Adult (numbers remain in the stats block there).
 */
const CONSTELLATION_NODES = [
  { ocean: 'openness',          shortLabel: 'O', kidsLabel: 'Curiosity',  invertKids: false },
  { ocean: 'conscientiousness', shortLabel: 'C', kidsLabel: 'Focus',      invertKids: false },
  { ocean: 'extraversion',      shortLabel: 'E', kidsLabel: 'Energy',     invertKids: false },
  { ocean: 'agreeableness',     shortLabel: 'A', kidsLabel: 'Kindness',   invertKids: false },
  { ocean: 'neuroticism',       shortLabel: 'N', kidsLabel: 'Confidence', invertKids: true  }
];
// Irregular, hand-tuned positions so the 5 stars read as a real
// constellation rather than a regular pentagon. Same order as
// CONSTELLATION_NODES: O, C, E, A, N.
const CONSTELLATION_POS = [
  { x:  55, y:  78 },
  { x: 108, y:  38 },
  { x: 175, y:  68 },
  { x: 200, y: 148 },
  { x: 102, y: 192 }
];

function renderTraitConstellation(b) {
  const host = $('#trait-constellation');
  if (!host) return;
  if (!state.codename || !b || typeof b.openness !== 'number') {
    host.innerHTML = '';
    return;
  }

  const showLabel = isKids() ? 'kidsLabel' : 'shortLabel';
  const values = CONSTELLATION_NODES.map(n => {
    const raw = b[n.ocean] ?? 5;
    const displayed = (isKids() && n.invertKids) ? (11 - raw) : raw;
    return { ...n, raw, displayed };
  });

  // Background star field — deterministic from the codename so it doesn't
  // re-twinkle on every slider tweak.
  const bgRng = seededRand(state.codename + '|stars');
  let bg = '';
  for (let i = 0; i < 32; i++) {
    const x  = (bgRng() * 240).toFixed(1);
    const y  = (bgRng() * 240).toFixed(1);
    const r  = (0.3 + bgRng() * 0.8).toFixed(2);
    const op = (0.22 + bgRng() * 0.45).toFixed(2);
    bg += `<circle cx="${x}" cy="${y}" r="${r}" class="bg-star" style="opacity:${op}"/>`;
  }

  // Chain (4 lines) — connects stars in declared order so the constellation
  // reads as a *shape*. Line brightness scales with the product of the two
  // endpoint values: stronger profiles draw a brighter chart.
  let links = '';
  for (let i = 0; i < CONSTELLATION_POS.length - 1; i++) {
    const a = CONSTELLATION_POS[i], c = CONSTELLATION_POS[i + 1];
    const op = Math.max(0.22, (values[i].displayed * values[i + 1].displayed) / 100 * 0.85);
    links += `<line x1="${a.x}" y1="${a.y}" x2="${c.x}" y2="${c.y}" class="link" style="opacity:${op.toFixed(2)}"/>`;
  }

  // Stars: a small bright dot with a horizontal + vertical ray (cross-flare).
  // Size encodes value; rays scale with size.
  let nodes = '';
  values.forEach((v, i) => {
    const p = CONSTELLATION_POS[i];
    const r = 1.6 + (v.displayed / 10) * 3.4;   // 2..5
    const flare = r * 2.6;
    let confRing = '';
    if (state.appMode === 'adult') {
      const conf = CONFIDENCE[v.ocean];
      if (conf) {
        const ringR = r + 5;
        const ringW = conf.label === 'high' ? 0.6 : (conf.label === 'moderate' ? 1.1 : 1.8);
        confRing = `<circle cx="${p.x}" cy="${p.y}" r="${ringR.toFixed(1)}" class="confidence-ring conf-${conf.label}" fill="none" stroke-width="${ringW}"/>`;
      }
    }
    // Place label on the side facing away from the chart's mass so it
    // doesn't collide with the chain.
    const dx = p.x < 120 ? -1 : 1;
    const dy = p.y < 100 ? -1 : 1;
    const labelX = p.x + dx * (flare + 4);
    const labelY = p.y + dy * (flare + 7);
    const anchor = dx < 0 ? 'end' : 'start';
    nodes += `<g class="node node-${i}" data-trait="${v.ocean}">
      ${confRing}
      <line x1="${(p.x - flare).toFixed(1)}" y1="${p.y}" x2="${(p.x + flare).toFixed(1)}" y2="${p.y}" class="ray"/>
      <line x1="${p.x}" y1="${(p.y - flare).toFixed(1)}" x2="${p.x}" y2="${(p.y + flare).toFixed(1)}" class="ray"/>
      <circle cx="${p.x}" cy="${p.y}" r="${r.toFixed(2)}"/>
      <text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle">${v[showLabel]}</text>
    </g>`;
  });

  host.innerHTML = `<svg viewBox="0 0 240 240" class="constellation-svg" role="img" aria-label="${localLabel('Personality trait constellation')}"><g class="bg-stars">${bg}</g><g class="links">${links}</g><g class="nodes">${nodes}</g></svg>`;
}

/* ====================================================================
 * 7. Archetype scoring
 * ==================================================================== */

// Localized labels for each archetype. calculateArchetype returns the
// English key (which is also used as a save/load identifier); the UI
// resolves the localized label through ARCHETYPE_LABELS[lang][key].
const ARCHETYPE_LABELS = {
  en: {
    'The Methodical One': 'The Methodical One',
    'The Imagining One':  'The Imagining One',
    'The Observer':       'The Observer',
    'The Connector':      'The Connector',
    'The Planner':        'The Planner',
    'The Recombiner':     'The Recombiner',
    'The Quiet Maker':    'The Quiet Maker',
    'The Mover':          'The Mover'
  },
  zh: {
    'The Methodical One': '沉静的整理者',
    'The Imagining One':  '想象之人',
    'The Observer':       '观察之人',
    'The Connector':      '联结之人',
    'The Planner':        '规划之人',
    'The Recombiner':     '重组之人',
    'The Quiet Maker':    '沉默的创造者',
    'The Mover':          '行动之人'
  },
  ja: {
    'The Methodical One': '着実な人',
    'The Imagining One':  '想像する人',
    'The Observer':       '観察する人',
    'The Connector':      '結びつける人',
    'The Planner':        '計画する人',
    'The Recombiner':     '組みかえる人',
    'The Quiet Maker':    '静かに作る人',
    'The Mover':          '動く人'
  },
  ko: {
    'The Methodical One': '차분한 정리자',
    'The Imagining One':  '상상하는 사람',
    'The Observer':       '관찰자',
    'The Connector':      '연결하는 사람',
    'The Planner':        '계획자',
    'The Recombiner':     '재결합자',
    'The Quiet Maker':    '조용한 만드는 이',
    'The Mover':          '움직이는 사람'
  },
  tr: {
    'The Methodical One': 'Düzenli Olan',
    'The Imagining One':  'Hayalperest Olan',
    'The Observer':       'Gözlemci Olan',
    'The Connector':      'Bağlayıcı Olan',
    'The Planner':        'Planlayıcı Olan',
    'The Recombiner':     'Yeniden Birleştiren',
    'The Quiet Maker':    'Sessiz Yaratıcı',
    'The Mover':          'Hareketli Olan'
  }
};

function localizeArchetype(key) {
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  const bundle = ARCHETYPE_LABELS[lang] || ARCHETYPE_LABELS.en;
  return bundle[key] || ARCHETYPE_LABELS.en[key] || key;
}

function calculateArchetype(b) {
  // Scoring over Big Five (O/C/E/A/N) + athletic. The returned value is
  // the English key — UI render localizes via localizeArchetype().
  const O = b.openness, C = b.conscientiousness, E = b.extraversion,
        A = b.agreeableness, N = b.neuroticism, athletic = b.athletic;
  const scores = {
    'The Methodical One':  O * 0.9 + C * 1.3 - E * 0.4,
    'The Imagining One':   O * 1.5 - C * 0.7 + N * 0.2,
    'The Observer':        O * 1.2 - N * 0.9,
    'The Connector':       E * 1.4 + A * 0.6,
    'The Planner':         O * 0.7 + C * 1.1 - N * 0.3,
    'The Recombiner':      O * 1.3 - C * 0.6 + N * 0.5,
    'The Quiet Maker':     O * 1.0 + A * 1.0 - E * 0.4,
    'The Mover':           athletic * 1.3 + E * 0.7 - N * 0.3
  };
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ---------- Generational lineage helpers ----------
 * Convert parent form data into the baby-state shape that
 * buildAvatarSvg expects, synthesize a hypothetical grandchild from
 * the current baby + a random partner, and inject x/y/width/height
 * into a DiceBear SVG string so it can be nested inside a parent SVG.
 */
function parentToBabyState(p) {
  if (!p) return null;
  return {
    height:    p.height ?? 170,
    athletic:  p.athletic ?? 5,
    eyeColor:  Math.max(0, EYE_LADDER.indexOf(p.eyeColor || 'brown')),
    hairColor: Math.max(0, HAIR_LADDER.indexOf(p.hairColor || 'brown')),
    hairType:  Math.max(0, TEX_LADDER.indexOf(p.hairType || 'straight')),
    skinTone:  Math.max(0, SKIN_LADDER.indexOf(p.skinTone || 'medium')),
    faceShape: Math.max(0, FACE_LADDER.indexOf(p.faceShape || 'oval')),
    freckles:  p.freckles === 'lots' ? 80 : (p.freckles === 'light' ? 40 : 0),
    dimples:   p.dimples === 'yes' ? 100 : 0,
    openness:          p.openness          ?? 5,
    conscientiousness: p.conscientiousness ?? 5,
    extraversion:      p.extraversion      ?? 5,
    agreeableness:     p.agreeableness     ?? 5,
    neuroticism:       p.neuroticism       ?? 5
  };
}

function synthGrandchild(b, rng) {
  const oceanKeys = ['openness','conscientiousness','extraversion','agreeableness','neuroticism','athletic'];
  const out = {};
  oceanKeys.forEach(k => {
    const partner = 1 + Math.floor(rng() * 10);
    out[k] = Math.max(1, Math.min(10, Math.round(((b[k] || 5) + partner) / 2)));
  });
  out.height = Math.round(((b.height || 170) + 140 + rng() * 70) / 2);
  // Ladder mixes: random partner index averaged with baby's.
  out.eyeColor  = Math.max(0, Math.min(EYE_LADDER.length - 1,  Math.round(((b.eyeColor  || 0) + Math.floor(rng() * EYE_LADDER.length))  / 2)));
  out.hairColor = Math.max(0, Math.min(HAIR_LADDER.length - 1, Math.round(((b.hairColor || 0) + Math.floor(rng() * HAIR_LADDER.length)) / 2)));
  out.hairType  = Math.max(0, Math.min(TEX_LADDER.length - 1,  Math.round(((b.hairType  || 0) + Math.floor(rng() * TEX_LADDER.length))  / 2)));
  out.skinTone  = Math.max(0, Math.min(SKIN_LADDER.length - 1, Math.round(((b.skinTone  || 0) + Math.floor(rng() * SKIN_LADDER.length)) / 2)));
  out.faceShape = Math.max(0, Math.min(FACE_LADDER.length - 1, Math.round(((b.faceShape || 0) + Math.floor(rng() * FACE_LADDER.length)) / 2)));
  out.freckles  = Math.max(0, Math.min(100, Math.round(((b.freckles || 0) + Math.floor(rng() * 100)) / 2)));
  out.dimples   = Math.max(0, Math.min(100, Math.round(((b.dimples  || 0) + Math.floor(rng() * 100)) / 2)));
  return out;
}

// Nest a DiceBear-produced <svg ...> string inside a parent SVG by
// injecting x/y/width/height attributes onto the outer tag. The
// browser treats nested <svg> elements as sub-viewports.
function embedAvatarSvg(svgString, x, y, w, h) {
  if (!svgString) return '';
  return svgString.replace(/^<svg(\s)/, `<svg x="${x}" y="${y}" width="${w}" height="${h}"$1`);
}

/* ====================================================================
 * 8. Avatar updates (SVG)
 * ==================================================================== */

function buildAvatarSvg(b, styleName, g, seedHint) {
  const cfg = DICEBEAR_STYLES[styleName] || DICEBEAR_STYLES.lorelei;

  // Defensive ladder lookups — saved timelines stored before the ladders
  // were widened may carry indices outside the new ranges.
  const skinIdx = Math.max(0, Math.min(SKIN_LADDER.length - 1, b.skinTone  || 0));
  const hairIdx = Math.max(0, Math.min(HAIR_LADDER.length - 1, b.hairColor || 0));
  const eyeIdx  = Math.max(0, Math.min(EYE_LADDER.length - 1,  b.eyeColor  || 0));
  const skinHex = SKIN_HEX[SKIN_LADDER[skinIdx]].replace('#','');
  const hairHex = HAIR_HEX[HAIR_LADDER[hairIdx]].replace('#','');
  const eyeHex  = EYE_HEX[EYE_LADDER[eyeIdx]].replace('#','');
  const texName  = TEX_LADDER[b.hairType];
  const faceName = FACE_LADDER[b.faceShape];

  // Gender-expression intensity (0–1). Surprise → 0 (no biasing).
  const gExpr = (g === 'female' || g === 'male')
    ? Math.max(0, Math.min(1, (state.genderExpression ?? 0) / 100))
    : 0;

  // Universal — every numeric slider drives a visible avatar feature.
  const scaleVal  = Math.round(92 + ((b.height - 140) / 70) * 22);            // height → 92–114
  const rotateVal = Math.round(((b.openness - 1) / 9) * 12);                  // openness → 0–12° head tilt

  // Background channels personality:
  //   hue        ← neuroticism (low N = cool/blue/calm, high N = warm/intense)
  //   saturation ← agreeableness (low = muted, high = vivid)
  //   lightness  ← athletic (low = darker, high = brighter)
  //   type       ← openness (gradient if open/imaginative)
  const bgHue   = 30 + (10 - b.neuroticism) * (200/9);
  const bgSat   = 25 + b.agreeableness * 3;
  const bgLight = 60 + b.athletic * 2;
  const bgHex   = hslToHex(bgHue, Math.max(20, Math.min(70, bgSat)), Math.max(48, Math.min(86, bgLight)));
  const bgType  = b.openness >= 6 ? 'gradientLinear' : 'solid';

  const seed = `${seedHint || state.codename || 'baby'}|${b.hairType}|${b.faceShape}|${b.eyeColor}`;

  const options = {
    seed,
    skinColor: [skinHex],
    hairColor: [hairHex],
    backgroundColor: [bgHex],
    backgroundType: [bgType],
    scale: scaleVal,
    rotate: rotateVal
  };

  // Hair bucket + gender bias — both styles use curated subsets now.
  let bucket = HAIR_BUCKETS[styleName]?.[texName];
  if (bucket && (g === 'female' || g === 'male')) {
    if (styleName === 'lorelei') {
      bucket = LORELEI_HAIR_BY_GENDER[g][texName] || bucket;
    } else if (styleName === 'bigSmile') {
      bucket = BIGSMILE_HAIR_BY_GENDER[g][texName] || bucket;
    }
  }
  if (bucket) options.hair = bucket;

  if (styleName === 'lorelei') {
    options.eyesColor = [eyeHex];
    // Face shape: above 50% intensity, override toward the gendered
    // archetype (female → heart, male → square). Below that, respect the
    // baby's faceShape slider. The Lorelei pack only ships 4 head variants,
    // so this is the strongest face-shape lever available.
    let headVariant = LORELEI_HEAD[faceName] || 'variant02';
    if (gExpr > 0.5) {
      if (g === 'female') headVariant = LORELEI_HEAD['heart'];   // variant03
      else if (g === 'male') headVariant = LORELEI_HEAD['square']; // variant04
    }
    options.head  = [headVariant];
    options.mouth = [LORELEI_MOUTH[b.extraversion] || 'happy09'];
    // Native Lorelei freckles are binary (on/off by seed) — disable, we draw
    // our own continuous-density overlay instead.
    options.frecklesProbability = 0;
    options.beardProbability   = 0; // babies don't have beards
    options.glassesProbability = 0; // or glasses
    options.hairProbability    = 100; // ensure hair always renders — DiceBear can otherwise omit hair entirely

    // Eyebrows: conscientiousness picks within a 1–13 range, but gender +
    // intensity narrows that range. Male leans toward the lower-numbered
    // (heavier) variants; female toward the higher-numbered (softer) ones.
    // At gExpr=0 we use the full 1–13; at gExpr=1 we use the gendered half.
    let browLo = 1, browHi = 13;
    if (g === 'male') {
      browHi = Math.round(13 - gExpr * 7); // 13 → 6
    } else if (g === 'female') {
      browLo = Math.round(1 + gExpr * 7);  // 1 → 8
    }
    const browSpan = browHi - browLo;
    const browIdx = Math.max(browLo, Math.min(browHi,
      Math.round((b.conscientiousness - 1) / 9 * browSpan) + browLo));
    options.eyebrows = [`variant${String(browIdx).padStart(2, '0')}`];

    if (g === 'female') {
      options.hairAccessoriesProbability = Math.round(35 + gExpr * 65); // 35→100
      options.earringsProbability        = Math.round(20 + gExpr * 80); // 20→100
    } else if (g === 'male') {
      options.hairAccessoriesProbability = Math.round(35 - gExpr * 35); // 35→0
      options.earringsProbability        = Math.round(20 - gExpr * 20); // 20→0
    } else {
      options.hairAccessoriesProbability = 35;
      options.earringsProbability = 20;
    }
  } else if (styleName === 'bigSmile') {
    options.mouth = [BIGSMILE_MOUTH[b.extraversion] || 'gapSmile'];
    options.eyes  = [BIGSMILE_EYES[b.eyeColor] || 'normal'];
    if (g === 'female') {
      options.accessoriesProbability = Math.round(10 + gExpr * 80); // 10→90
      options.accessories = ['sailormoonCrown'];
    } else if (g === 'male') {
      options.accessoriesProbability = 0;
    } else {
      options.accessoriesProbability = 0;
    }
  }

  try {
    let svg = createAvatar(cfg.module, options).toString();
    return addTraitOverlays(svg, b, styleName);
  } catch (e) {
    console.error('DiceBear render failed:', e);
    return `<div class="avatar-error">${localLabel('Avatar failed to load')}</div>`;
  }
}

function updateAvatar(b) {
  const host = document.getElementById('avatar-host');
  if (!host) return;
  // Age-seeded suffix so the main avatar shifts as the user scrubs
  // through life on the aging slider. Identity stays locked by the
  // codename + locked palette options; only DiceBear's hair/mouth
  // variant picks vary with age.
  const ageSuffix = (typeof state.age === 'number') ? '|age' + state.age : '';
  host.innerHTML = buildAvatarSvg(b, state.style, state.gender, state.codename + ageSuffix);
}

/* ---------- Aging scrubber ----------
 * Single age slider (0..80) below the life-stage strip. Updates
 * the main avatar with an age-seeded variant and shows a mode-aware
 * ticker line describing this person at this age. */
function pickAgeTicker(age) {
  const bucket = ageBucket(age);
  const rng = seededRand((state.codename || 'baby') + '|tick|' + age);
  let pool = [];
  if (state.appMode === 'kids') {
    pool = localList(KIDS_AGE_TICKERS[bucket]);
  } else if (state.appMode === 'adult') {
    pool = localList(ADULT_TRAJECTORY_MILESTONES[bucket]);
  } else {
    // Reflection: reuse the existing memory pools (already stage-bucketed)
    // and localized into all 5 languages.
    let src;
    if (bucket === 'early') src = CHILDHOOD_MEMORIES;
    else if (bucket === 'mid') src = ADOLESCENCE_MEMORIES;
    else src = ADULTHOOD_MEMORIES;
    pool = localList(src);
  }
  if (!pool.length) return '';
  return pool[Math.floor(rng() * pool.length)];
}

function renderAgingScrubber() {
  const section = $('#aging-scrubber');
  const label   = $('#scrubber-label');
  const value   = $('#scrubber-value');
  const ticker  = $('#scrubber-ticker');
  if (!section) return;
  if (!state.codename) {
    section.hidden = true;
    return;
  }
  section.hidden = false;

  if (label) {
    label.textContent =
      state.appMode === 'adult' ? 'Trajectory point'
      : state.appMode === 'kids' ? 'Visit them at age'
      : 'See them at';
  }
  const age = state.age;
  if (value) {
    value.textContent =
      state.appMode === 'adult' ? `t = ${age} yrs`
      : (age === 0 ? 'newborn' : `${age} years old`);
  }
  if (ticker) ticker.textContent = pickAgeTicker(age);
}

// Throttled slider listener — only re-render avatar at ~animation
// frame cadence so dragging stays smooth even at full speed.
let _scrubberFrame = 0;
function setupAgeScrubberListener() {
  const slider = $('#age-slider');
  if (!slider || slider.dataset.bound === '1') return;
  slider.dataset.bound = '1';
  slider.addEventListener('input', () => {
    state.age = Number(slider.value);
    if (_scrubberFrame) return;
    _scrubberFrame = requestAnimationFrame(() => {
      _scrubberFrame = 0;
      renderAgingScrubber();
      updateAvatar(state.baby);
    });
  });
}

/* ---------- Multi-Future Panel (adult lives for current baby) ---------- */

function generateAdultFutures() {
  if (!state.codename) return;
  const count = state.chaos ? 6 : 4;
  const rng = seededRand(state.codename + '|adultFutures|' + Date.now());
  const pool = pickPool(ADULT_FUTURES, ADULT_FUTURES_CLINICAL, KIDS_ADULT_FUTURES);

  // Env-weighted picks: high env values bump futures tagged with that env key.
  // Low env values penalize matching futures. Middle env values are neutral.
  const weighted = pool.map(f => {
    let bonus = 0;
    (f.tags || []).forEach(tag => {
      const v = state.env?.[tag];
      if (typeof v === 'number') bonus += (v - 5) * 0.18;
    });
    return { f, w: rng() + bonus };
  }).sort((a, b) => b.w - a.w);

  state.futures = weighted.slice(0, count).map(x => x.f);
  renderFutures();
}

function renderFutures() {
  const grid  = $('#futures-grid');
  const panel = $('#futures-panel');
  if (!grid || !panel) return;
  if (!state.futures || state.futures.length === 0) {
    panel.hidden = true; return;
  }
  const lang = (state && state.language) ? state.language : 'en';
  grid.innerHTML = state.futures.map(f => {
    const tr = (f.i18n && f.i18n[lang]) || {};
    const headline = tr.headline || f.headline;
    const details = tr.details || f.details;
    return `
    <article class="future-card">
      <h3 class="future-headline">${headline}</h3>
      <ul class="future-details">
        ${details.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </article>`;
  }).join('');
  panel.hidden = false;
  requestAnimationFrame(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

/* ---------- Alternate Timelines ---------- */

function generateAlternateTimelines() {
  if (!state.codename) return;
  const count = state.chaos ? 6 : 4;
  const baseSeed = Date.now() + ':' + Math.random().toString(36).slice(2, 6);
  const alternates = [];

  for (let i = 0; i < count; i++) {
    const rng = seededRand('alt|' + baseSeed + '|' + i);

    // Pick a random value within each slider's current range.
    // Chaos mode opens it to the full hard range so things really diverge.
    const baby = {};
    SLIDER_DEFS.forEach(def => {
      const r = state.ranges[def.key];
      const lo = state.chaos && def.hardMin !== undefined ? def.hardMin : r.min;
      const hi = state.chaos && def.hardMax !== undefined ? def.hardMax : r.max;
      baby[def.key] = Math.floor(rng() * (hi - lo + 1)) + lo;
    });

    const aLet = ((state.parents.A.name || 'A')[0] || 'A').toUpperCase();
    const bLet = ((state.parents.B.name || 'B')[0] || 'B').toUpperCase();
    const num = String(Math.floor(rng() * 99) + 1).padStart(2, '0');
    const codename = `Tiny Prototype ${aLet}${bLet}-${num}`;

    const archetype = calculateArchetype(baby);
    const flavor = generateBabyFlavor(codename, baby);
    alternates.push({ baby, codename, archetype, ...flavor });
  }

  state.alternates = alternates;
  renderAlternates();
}

function renderAlternates() {
  const grid  = $('#alternates-grid');
  const panel = $('#alternates-panel');
  if (!grid || !panel) return;
  if (!state.alternates || state.alternates.length === 0) {
    panel.hidden = true; return;
  }

  grid.innerHTML = state.alternates.map((a, i) => {
    const svg = buildAvatarSvg(a.baby, state.style, state.gender, a.codename);
    return `
      <article class="alt-card" data-index="${i}">
        <div class="alt-avatar">${svg}</div>
        <div class="alt-codename">${a.codename}</div>
        <div class="alt-vibe">${a.vibe}</div>
        <div class="alt-archetype">${a.archetype}</div>
        <button type="button" class="btn btn-tiny alt-load" data-index="${i}">Make this the main baby</button>
      </article>`;
  }).join('');

  grid.querySelectorAll('.alt-load').forEach(b => {
    b.addEventListener('click', () => loadAlternateAsMain(Number(b.dataset.index)));
  });

  panel.hidden = false;
  requestAnimationFrame(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }));
}

function loadAlternateAsMain(idx) {
  const a = state.alternates[idx];
  if (!a) return;

  state.baby      = { ...a.baby };
  state.codename  = a.codename;
  state.vibe      = a.vibe;
  state.futurePaths = a.paths || [];
  state.events    = a.events || [];
  state.archetype = a.archetype;

  $('#codename').textContent = state.codename;
  SLIDER_DEFS.forEach(def => {
    syncSliderDOMForOcean(def.key, a.baby[def.key]);
  });
  updateBabyPreview();

  const babyPanel = document.querySelector('.baby-panel');
  if (babyPanel) babyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ====================================================================
 * 9. Codename
 * ==================================================================== */

function generateCodename(parents) {
  if (state.appMode === 'adult') {
    const num    = String(randInt(1000, 9999));
    const letter = String.fromCharCode(65 + randInt(0, 5));
    return `Projection-${num}-${letter}`;
  }
  const a = (parents.A.name || 'A').trim();
  const bp = (parents.B.name || 'B').trim();
  const aLet = (a[0] || 'A').toUpperCase();
  const bLet = (bp[0] || 'B').toUpperCase();
  const num = String(randInt(1, 99)).padStart(2, '0');
  return `Tiny Prototype ${aLet}${bLet}-${num}`;
}

/* Trait-conflict rules. Real people contradict themselves — high openness
 * paired with low conscientiousness shouldn't always pick exploratory
 * paths; sometimes the friction itself is the story. Each rule maps a
 * predicate over baby traits to a conflict tag that future-path content
 * can opt into.
 * LOOP_REQUEST(narrative): add FUTURE_PATHS entries with tag fields
 * including 'OC-tension', 'EN-tension', 'CO-rigidity', 'AN-pleaser'
 * (and KIDS_FUTURE_PATHS / adult-mode equivalents) so the conflict
 * branch below has content to surface. */
// Only .when and .tag are read; the prior `key` field was a dead duplicate
// of `tag` and has been dropped.
//
// Tier 1 ("-tension" / "-rigidity" / "-pleaser") fires for the sharp
// extremes — the "obviously contradictory" baby. Tier 2 ("-mild" suffix)
// catches the much larger middle band where the same friction is real
// but quieter: trait values are sub-extreme on one or both axes, yet
// still pointing in opposing directions. Sliders are integer-coded 1-10,
// so the mild bands are written as strict inequalities that don't
// overlap with the tension bands above — a baby never gets both tiers
// of the same axis pair.
//
// R9 mild tags now have content in FUTURE_PATHS / KIDS_FUTURE_PATHS / ADULT_TRACES
// (EN — see LOOP_REQUEST(translator) markers in each pool for zh/ja/ko/tr).
const TRAIT_CONFLICT_RULES = [
  { when: b => (b.openness        || 0) >= 8 && (b.conscientiousness || 0) <= 4, tag: 'OC-tension'  },
  { when: b => (b.extraversion    || 0) >= 8 && (b.neuroticism       || 0) >= 7, tag: 'EN-tension'  },
  { when: b => (b.conscientiousness || 0) >= 8 && (b.openness        || 0) <= 4, tag: 'CO-rigidity' },
  { when: b => (b.agreeableness   || 0) >= 8 && (b.neuroticism       || 0) >= 7, tag: 'AN-pleaser'  },
  // Tier-2 mild bands. Each is disjoint from its tier-1 sibling above
  // by construction: O>=6&&O<=7 cannot satisfy O>=8, C>=5&&C<=6 cannot
  // satisfy C<=4, etc.
  { when: b => { const o = b.openness        || 0, c = b.conscientiousness || 0;
                 return o >= 6 && o <= 7 && c >= 5 && c <= 6; }, tag: 'OC-mild'  },
  { when: b => { const e = b.extraversion    || 0, n = b.neuroticism       || 0;
                 return e >= 6 && e <= 7 && n >= 5 && n <= 6; }, tag: 'EN-mild'  },
  { when: b => { const c = b.conscientiousness || 0, o = b.openness        || 0;
                 return c >= 6 && c <= 7 && o >= 5 && o <= 6; }, tag: 'CO-mild'  },
  { when: b => { const a = b.agreeableness   || 0, n = b.neuroticism       || 0;
                 return a >= 6 && a <= 7 && n >= 5 && n <= 6; }, tag: 'AN-mild'  }
];

function activeConflictTags(b) {
  return TRAIT_CONFLICT_RULES.filter(r => r.when(b || {})).map(r => r.tag);
}

function generateBabyFlavor(codename, baby) {
  const inAdult = state.appMode === 'adult';
  const rng = seededRand(codename + '|flavor' + (state.chaos ? '|c' : '') + (inAdult ? '|adult' : ''));

  const conflictTags = activeConflictTags(baby);

  if (inAdult) {
    // Adult mode: no funny vibe / events / headlines. Show grounded
    // microdetails instead — they\'re also surfaced separately as
    // behavioral-trace cards below the avatar.
    // Reserve ~1 of 4 trace slots for conflict-tagged entries when
    // available; fall back silently otherwise.
    const tracePool = localList(ADULT_TRACES);
    const conflictTraces = conflictTags.length
      ? tracePool.filter(t => t && t.tag && conflictTags.includes(t.tag))
      : [];
    const reserved = conflictTraces.length ? pickN(conflictTraces, 1, rng) : [];
    const remaining = pickN(tracePool.filter(t => !reserved.includes(t)), 4 - reserved.length, rng);
    // ADULT_TRACES is a mixed pool: legacy strings + tagged {text, tag} objects
    // added for R9 mild-conflict content. Normalize to plain strings here so
    // downstream renderers don't have to know about the shape.
    const details = reserved.concat(remaining).map(t => (t && typeof t === 'object') ? t.text : t);
    return { vibe: '', paths: details, events: [], headlines: [] };
  }

  // FUNNY_TITLES entries may be plain strings or tagged objects ({text, tag}).
  // Paradox entries (last 6 in each language) carry conflict tags. Sample
  // uniformly across the whole list regardless of active conflicts: the
  // futures pool below already reserves ~33% of picks for conflict-tagged
  // paths when conflicts fire (see TOTAL_PATHS reservation), so letting the
  // vibe name the same tension keeps the archetype and the futures coherent
  // rather than at cross-purposes. Earlier rounds filtered conflict-tagged
  // vibes out here on the theory that a matching vibe + matching future
  // read as quirk-instead-of-tension; in Kids mode especially, the
  // variance-as-gift framing makes the contradiction an asset to name, not
  // hide. Reflection mode shares this list and benefits from the same
  // alignment.
  const vibes = localList(FUNNY_TITLES);
  const vibePick = vibes[Math.floor(rng() * vibes.length)];
  const vibe = (vibePick && typeof vibePick === 'object') ? vibePick.text : vibePick;

  const tagFor = {
    openness: 'O', conscientiousness: 'C', extraversion: 'E',
    agreeableness: 'A', neuroticism: 'N', athletic: 'athletic'
  };
  const top = Object.keys(tagFor)
    .map(k => ({ k, v: baby[k] || 0 }))
    .sort((a, b) => b.v - a.v)[0];
  const topTag = tagFor[top.k];

  const pathsPool = pickPool(FUTURE_PATHS, FUTURE_PATHS, KIDS_FUTURE_PATHS);

  // Reserve 1 of 3 future picks (~33%) for a conflict-tagged entry when
  // any conflict is active and matching content exists. Otherwise fall
  // back to the existing topTag-weighted selection.
  //
  // Tier-1 vs tier-2 mild weighting: identical, by design. Per axis-pair
  // the bands are disjoint (see TRAIT_CONFLICT_RULES), so a baby holds at
  // most one tag per pair — tier-1 and mild never compete for the same
  // slot. Content pools are tag-keyed (OC-tension entries are distinct
  // from OC-mild entries), so the reservation rate auto-matches register
  // to the baby without an explicit tone gate here.
  const TOTAL_PATHS = 3;
  const CONFLICT_RESERVED_PATHS = 1;
  const reservedPaths = [];
  if (conflictTags.length) {
    const matches = pathsPool.filter(p => p.tag && conflictTags.includes(p.tag));
    if (matches.length) {
      const shuffled = matches.map(p => ({ p, w: rng() })).sort((a, b) => b.w - a.w);
      for (const x of shuffled.slice(0, CONFLICT_RESERVED_PATHS)) reservedPaths.push(x.p);
    }
  }
  const remainingPool = pathsPool.filter(p => !reservedPaths.includes(p));
  const weighted = remainingPool.map(p => ({
    p, w: rng() + (p.tag === topTag ? 1.0 : 0)
  })).sort((a, b) => b.w - a.w);
  const filler = weighted.slice(0, TOTAL_PATHS - reservedPaths.length).map(x => x.p);
  const paths = reservedPaths.concat(filler).map(p => p.text);

  const eventCount = state.chaos ? 2 : (rng() > 0.4 ? 1 : (rng() > 0.6 ? 2 : 0));
  const events = pickN(pickPool(RANDOM_EVENTS, RANDOM_EVENTS, KIDS_RANDOM_EVENTS), eventCount, rng);

  const headlineRng = seededRand(codename + '|news');
  const headlines = pickN(pickPool(NEWS_HEADLINES, NEWS_HEADLINES, KIDS_NEWS_HEADLINES), 2, headlineRng);

  return { vibe, paths, events, headlines };
}

function computeTraitConflicts(b) {
  const pool = pickPool(TRAIT_CONFLICTS, TRAIT_CONFLICTS_CLINICAL, KIDS_TRAIT_CONFLICTS);
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  return pool.filter(c => c.when(b)).map(c => {
    const tr = (c.i18n && c.i18n[lang]) || {};
    return { tag: tr.tag || c.tag, note: tr.note || c.note };
  });
}

/* ---------- Societal Outcomes Brief (Adult mode, hero panel) ----------
 * Each category collects condition-driven lines describing how society
 * reacts to the modeled child. Fires from specific budget + trait + env
 * combinations so the brief feels causal, not generic. Replaces the
 * old flat "Projected Social Response" list. */
/* ---------- Divergence Events (Adult mode) ----------
 * Rare life events that override the modeled projection. The thesis is
 * 'humans cannot fully be engineered'; the divergence makes it concrete
 * by invalidating the brief with one ordinary biographical fact. */
const DIVERGENCE_EVENTS = {
  en: [
    "Grandparent's death at age 14 quietly reshapes their emotional architecture.",
    "Falls hard for a high-school teacher who teaches them Russian poetry. Career bends.",
    "Develops a chronic illness at 26. Identity reorganizes around it.",
    "A close friend dies young. They become unrecognizable for a decade.",
    "One book — encountered at 19 — recalibrates everything.",
    "A mentor takes unexpected interest. Trajectory accelerates in a direction nobody modeled.",
    "Loses their first job during a recession. Quietly chooses art.",
    "Has a child earlier than projected. Time pivots.",
    "Survives a near-fatal accident at 31. Reorganizes around the survival.",
    "Falls in love with a partner who lives six time zones away. Geography rewrites the projection.",
    "Develops an obsession with a single craft that compounds over twenty years.",
    "A sibling becomes seriously ill. Caregiving rewrites their twenties.",
    "Moves to a country they have never been to and stays.",
    "Joins a small movement at 22. The movement becomes their life.",
    "Reads an obituary that names them as second cousin. Family arrives.",
    "Is the only person present at a stranger's emergency. Career changes within a year.",
    "A teacher's offhand comment at age 9 quietly anchors their adult identity.",
    "Comes out at 34. Everything before reads differently afterward.",
    "Inherits a small piece of property from a relative they barely knew. It anchors them.",
    "Finds a single piece of art at 17 that determines what they want to do with their hands.",
    "Becomes briefly internet-famous for an accident at 22. Recovers slowly.",
    "Loses their faith. Or finds one. Either way, the projection bends.",
    "Adopts a child late in life. Resists every model that called this implausible."
  ],
  zh: [
    "祖辈在他/她 14 岁那年离世,悄悄重塑了他/她的情感架构。",
    "深深迷上了一位教自己俄罗斯诗歌的高中老师,职业方向就此弯折。",
    "26 岁开始患上一种慢性疾病。身份认同重新围绕它组织起来。",
    "一位密友英年早逝。接下来的十年里,他/她变得几乎认不出来。",
    "19 岁时遇到的一本书,把一切都重新校准了。",
    "一位导师出乎意料地对他/她产生了兴趣。轨迹朝着无人模拟过的方向加速。",
    "在一次经济衰退中失去了第一份工作。悄悄地选择了艺术。",
    "比预测中更早就有了孩子。时间被重新分配。",
    '31 岁时,在一场几乎致命的事故中活了下来。整个人围绕"幸存"重新组织。',
    "爱上了一位住在六个时区之外的伴侣。地理改写了原本的预测。",
    "对某一门手艺生出长达二十年、不断累积的执着。",
    "一位手足重病。整个二十多岁,被照护这件事改写了。",
    "搬去一个从未去过的国家,然后留了下来。",
    "22 岁那年加入一个小小的运动。这个运动后来成了他/她的全部生活。",
    "读到一则讣告,在里面看到自己被列为远房表亲。家族就此到来。",
    "在一位陌生人遇险时,自己是现场唯一的人。一年之内,职业改变。",
    "9 岁时一位老师不经意的一句话,默默地锚定了成年后的身份。",
    "34 岁出柜。在那之前的一切,事后都显出不同的意义。",
    "从一位几乎不认识的亲戚那里继承了一小块地产,它变成了他/她的锚点。",
    "17 岁时遇见的一件艺术品,决定了他/她想用双手去做什么。",
    '22 岁因为一场意外短暂地在互联网上"红"了一次。恢复得很慢。',
    "失去了自己的信仰。或者获得了一种。无论哪种,原本的预测都会弯折。",
    '在人生晚期收养了一个孩子。抵抗住了一切将这种可能称作"不切实际"的模型。'
  ],
  ja: [
    "14歳のときの祖父母の死が、その人の感情のかたちを、ひそかに変えていく。",
    "ロシア詩を教えてくれた高校の先生に、深く心を奪われる。職業の道筋が、そこから曲がる。",
    "26歳で慢性疾患を抱えるようになる。アイデンティティはそれを軸に組み直される。",
    "親しい友人が若くして亡くなる。その後の十年で、本人は別人のようになる。",
    "19歳で出会った一冊の本が、すべてを再調整する。",
    "あるメンターが思いがけず関心を寄せてくる。誰もモデル化していなかった方向へ、軌跡が一気に加速する。",
    "不況の中で初めての仕事を失う。静かに芸術の道を選ぶ。",
    "予測より早く子どもを授かる。時間の使い方そのものが変わる。",
    "31歳で、九死に一生の事故を生き延びる。「生き延びたこと」を中心に、人生が再構成される。",
    "六つの時間帯の向こうに住むパートナーと恋に落ちる。地理が、それまでの予測を書き換える。",
    "ある一つの手仕事への執着が、二十年かけて積み重なっていく。",
    "きょうだいが重い病にかかる。二十代の十年が、まるごと介護の時間に書き換えられる。",
    "行ったこともない国に移り住み、そのまま暮らし続ける。",
    "22歳で、ある小さな運動に加わる。その運動が、人生そのものになっていく。",
    "ある訃報を読み、その中で「またいとこ」として自分の名前を見つける。家族がそこから現れる。",
    "見知らぬ人の緊急時に、その場に居合わせたのが自分だけだった——それから一年以内に、職業が変わる。",
    "9歳のときに先生がふと口にしたひとことが、大人としての自分を静かに支えていく。",
    "34歳でカミングアウトする。それ以前のすべてが、ちがう意味で読み直される。",
    "ほとんど知らない親戚から、小さな土地を受け継ぐ。それがその後の人生の錨になる。",
    "17歳で出会った一つの作品が、その人が「自分の手で何をしたいか」を決めてしまう。",
    "22歳のときの事故をきっかけに、ほんの一時期だけネットで有名になる。立ち直るのに、時間がかかる。",
    "信仰を失う。あるいは、新しい信仰に出会う。どちらにしても、それまでの予測は曲がっていく。",
    "人生の後半で、子どもを養子に迎える。「それはありえない」と切り捨てたあらゆるモデルに、静かに抗う。"
  ],
  ko: [
    "열네 살에 맞은 조부모의 죽음이, 그 사람의 정서 구조를 조용히 바꾸어 놓는다.",
    "러시아 시를 가르치던 고등학교 선생님에게 깊이 빠진다. 진로가 그 자리에서 휘어진다.",
    "스물여섯에 만성 질환을 얻는다. 정체성이 그것을 중심으로 다시 짜인다.",
    "가까운 친구가 일찍 세상을 떠난다. 그 뒤로 십 년 동안, 본인은 알아보기 힘들 만큼 달라진다.",
    "열아홉에 만난 한 권의 책이 모든 것을 다시 맞춰 놓는다.",
    "한 멘토가 뜻밖에 그에게 관심을 기울인다. 어떤 모형도 그리지 못한 방향으로, 인생 궤적이 가속한다.",
    "경기 침체기에 첫 직장을 잃는다. 조용히, 예술을 택한다.",
    "예측보다 일찍 아이를 갖게 된다. 시간의 무게중심이 그 순간 옮겨간다.",
    "서른한 살에 거의 죽을 뻔한 사고를 살아남는다. 삶 전체가 '살아남았다는 사실' 위에 재편된다.",
    "여섯 시간대 너머에 사는 사람과 사랑에 빠진다. 지리가 본래의 예측을 다시 쓴다.",
    "한 가지 기술에 대한 집착이, 이십 년에 걸쳐 차곡차곡 쌓여간다.",
    "형제 가운데 한 명이 큰 병에 걸린다. 이십 대 전부가 돌봄의 시간으로 다시 쓰인다.",
    "한 번도 가본 적 없는 나라로 옮겨가 그대로 산다.",
    "스물둘에 작은 한 운동에 합류한다. 그 운동이 곧 평생이 된다.",
    "어느 부고에서 자신이 '재종'으로 호명된 것을 본다. 그 자리에서 가족이 도착한다.",
    "낯선 이의 위급 상황에 자기 혼자만 그 자리에 있었다 — 일 년 안에 직업이 바뀐다.",
    "아홉 살 때 선생님이 무심코 한 말이, 어른이 된 정체성을 조용히 붙들어 준다.",
    "서른넷에 커밍아웃한다. 그 이전의 모든 것이 이후엔 다르게 읽힌다.",
    "거의 알지 못하던 친척에게서 작은 토지를 물려받는다. 그것이 삶의 닻이 된다.",
    "열일곱에 만난 한 작품이, 자기 손으로 무엇을 하고 싶은가를 결정해 버린다.",
    "스물둘에 사고로 한때 인터넷에서 유명해진다. 회복은 더디게 온다.",
    "신앙을 잃는다. 또는 새로 갖게 된다. 어느 쪽이든, 본래의 예측은 휘어진다.",
    "인생 후반에 아이를 입양한다. '그건 비현실적'이라고 단정 짓던 모든 모형에 조용히 저항한다."
  ],
  tr: [
    "On dört yaşındayken büyük ebeveyninin ölümü, duygusal mimarilerini sessizce yeniden şekillendirir.",
    "Onlara Rus şiiri öğreten bir lise öğretmenine derinden tutulur. Kariyer hattı oradan kıvrılır.",
    "Yirmi altısında kronik bir hastalık edinir. Kimlik, bu hastalık ekseninde yeniden düzenlenir.",
    "Yakın bir arkadaş genç yaşta ölür. On yıl boyunca tanınmaz hale gelir.",
    "On dokuz yaşında karşılaştıkları bir kitap her şeyi yeniden ayarlar.",
    "Bir mentor beklenmedik bir ilgi gösterir. Yörünge, hiç kimsenin modellemediği bir yöne doğru hızlanır.",
    "İlk işini bir resesyon döneminde kaybeder. Sessizce sanatı seçer.",
    "Öngörülenden erken bir çocuk sahibi olur. Zaman bir anda eksenini değiştirir.",
    "Otuz birinde ölümcül olabilecek bir kazadan sağ çıkar. Hayat bu sağ kalış üzerine yeniden kurulur.",
    "Altı zaman dilimi ötede yaşayan biriyle âşık olur. Coğrafya, önceki tüm öngörüleri yeniden yazar.",
    "Tek bir zanaata duydukları tutkunun yirmi yıllık birikimi gerçekleşir.",
    "Bir kardeşi ağır bir hastalığa tutulur. Yirmili yaşlar, bakım yıllarına dönüşür.",
    "Hiç gitmedikleri bir ülkeye taşınır ve orada kalır.",
    "Yirmi ikisinde küçük bir harekete katılır. O hareket, hayatlarının kendisi olur.",
    "Bir ölüm ilanında kendilerini 'ikinci dereceden kuzen' olarak bulurlar. Aile, oradan ortaya çıkar.",
    "Bir yabancının acil durumunda olay yerindeki tek kişi olurlar — bir yıl içinde kariyer değişir.",
    "Bir öğretmenin dokuz yaşındayken söylediği gelişigüzel bir cümle, yetişkin kimliklerini sessizce yerleştirir.",
    "Otuz dört yaşında açılırlar. Öncesindeki her şey, ardından farklı okunur.",
    "Neredeyse hiç tanımadıkları bir akrabadan küçük bir mülk miras alırlar. Bu, hayatlarına demir atar.",
    "On yedisinde karşılaştıkları bir sanat eseri, elleriyle ne yapmak istediklerini belirler.",
    "Yirmi ikisinde yaşadıkları bir kazayla internette kısa süreliğine ünlenirler. Toparlanma yavaş gelir.",
    "İnançlarını kaybederler. Ya da yeni bir inanç bulurlar. Hangisi olursa olsun, öngörü kıvrılır.",
    "Hayatlarının ileri evresinde bir çocuk evlat edinirler. Bunu 'gerçekçi değil' diyen tüm modellere sessizce karşı dururlar."
  ]
};

/* ---------- Trait Popularity Through History (Adult mode) ----------
 * Five eras showing what each decade idealized as a 'desirable' trait.
 * Makes the cultural-stability question visible: the present is not
 * universal, it's just recent. */
const TRAIT_HISTORY = [
  { era: '1950s', label: 'Mid-century',  traits: ['Obedience', 'Deference', 'Conformity'], note: 'Idealized in employment, schooling, family roles.',
    i18n: {
      zh: { label: '世纪中叶', traits: ['服从', '顺从', '从众'], note: '在雇佣、教育与家庭角色中被理想化。' },
      ja: { label: '20世紀中盤', traits: ['服従', '従順', '同調'], note: '雇用、教育、家族の役割において理想化された。' },
      ko: { label: '20세기 중반', traits: ['복종', '순응', '동조'], note: '고용·교육·가족 역할에서 이상화됨.' },
      tr: { label: 'Yüzyıl ortası', traits: ['İtaat', 'Saygıyla geri çekilme', 'Uyumluluk'], note: 'İş, eğitim ve aile rollerinde ideal sayılırdı.' }
    } },
  { era: '1980s', label: 'Late-century', traits: ['Competitiveness', 'Ambition', 'Self-reliance'], note: 'Optimization read as economic value.',
    i18n: {
      zh: { label: '世纪末', traits: ['竞争心', '野心', '自立'], note: '"优化"被读作经济价值。' },
      ja: { label: '20世紀後半', traits: ['競争心', '野心', '自立'], note: '「最適化」は経済価値として読まれた。' },
      ko: { label: '20세기 후반', traits: ['경쟁심', '야망', '자립'], note: "'최적화'가 경제적 가치로 해석됨." },
      tr: { label: 'Yüzyıl sonu', traits: ['Rekabetçilik', 'Hırs', 'Kendine yetme'], note: "'Optimizasyon' ekonomik değer olarak okundu." }
    } },
  { era: '2000s', label: 'Early-2000s',  traits: ['Confidence', 'Charisma', 'Multitasking'], note: 'Network-economy demands.',
    i18n: {
      zh: { label: '21 世纪初', traits: ['自信', '魅力', '多任务能力'], note: '网络经济提出的需求。' },
      ja: { label: '2000年代前半', traits: ['自信', 'カリスマ性', 'マルチタスク能力'], note: 'ネットワーク経済が求めた条件。' },
      ko: { label: '2000년대 초', traits: ['자신감', '카리스마', '멀티태스킹'], note: '네트워크 경제가 요구한 조건.' },
      tr: { label: '2000’lerin başı', traits: ['Özgüven', 'Karizma', 'Çoklu görev'], note: 'Ağ ekonomisinin talepleri.' }
    } },
  { era: '2020s', label: 'Present',      traits: ['Resilience', 'Attractiveness', 'Productivity'], note: 'Algorithm-mediated visibility.', isPresent: true,
    i18n: {
      zh: { label: '现在', traits: ['韧性', '吸引力', '高产'], note: '由算法中介的可见度。' },
      ja: { label: '現在', traits: ['レジリエンス', '魅力', '生産性'], note: 'アルゴリズムが介在する可視性。' },
      ko: { label: '현재', traits: ['회복탄력성', '매력', '생산성'], note: '알고리즘이 매개하는 가시성.' },
      tr: { label: 'Bugün', traits: ['Dayanıklılık', 'Çekicilik', 'Üretkenlik'], note: 'Algoritmaların aracılık ettiği görünürlük.' }
    } },
  { era: '2040s', label: 'Speculative',  traits: ['Emotional regulation', 'Cognitive endurance', 'Network sensitivity'], note: 'Modeled extension; subject to drift.', isSpeculative: true,
    i18n: {
      zh: { label: '推演', traits: ['情绪调节', '认知耐力', '网络敏感性'], note: '模型化的延伸;仍会随时代漂移。' },
      ja: { label: '推測', traits: ['情動調整', '認知的持久力', 'ネットワーク感受性'], note: '想定上の延伸。今後も漂流しうる。' },
      ko: { label: '추정', traits: ['정서 조절', '인지 지구력', '네트워크 감수성'], note: '모형화된 연장. 표류 가능성 있음.' },
      tr: { label: 'Tahmini', traits: ['Duygu düzenleme', 'Bilişsel dayanıklılık', 'Ağ duyarlılığı'], note: 'Modellenmiş uzantı; yine kayma yaşayabilir.' }
    } }
];

const SOCIETAL_RULES = {
  academic: {
    title: 'Academic tracking',
    rules: [
      { when: c => c.budget.cognition   >= 5, line: 'Elevated parental academic expectations from early ages.' },
      { when: c => c.budget.cognition   >= 8, line: 'Acceleration-track placement probable in K–12 systems.' },
      { when: c => c.budget.cognition   >= 8 && (c.env.education || 5) >= 7, line: 'Gifted-program identification very likely; caregiver advocacy expected.' },
      { when: c => c.budget.cognition   >= 6 && c.budget.creativity >= 6, line: 'Cross-discipline placement common; standardized assessment may mis-classify.' },
      { when: c => c.baby.openness      >= 8 && c.baby.conscientiousness <= 4, line: 'Trait profile may be mis-read as attention disorder in structured settings.' },
      { when: c => c.budget.athleticism >= 7 && (c.env.education || 5) >= 6, line: 'Dual-track athletic + academic placement plausible.' },
      { when: c => c.budget.cognition   >= 7 && (c.env.education || 5) <= 3, line: 'Capability/access mismatch: under-placement risk despite high projection.' },
      { when: c => (c.env.multilingual || 5) >= 7 && c.budget.cognition >= 6, line: 'Multilingual upbringing correlates with executive-function gains; bilingual-program placement likely.' }
    ]
  },
  peer: {
    title: 'Peer dynamics',
    rules: [
      { when: c => c.budget.appearance  >= 5, line: 'Above-baseline social attention from age 5 onward.' },
      { when: c => c.budget.appearance  >= 8, line: 'Higher base rate of appearance-based feedback in early adolescence.' },
      { when: c => c.budget.sociability >= 6, line: 'Wide peer reach; reduced solitary-skill development possible.' },
      { when: c => c.budget.sociability <= 2 && (c.baby.extraversion || 5) <= 4, line: 'Smaller, deeper peer cohort. Compatibility-dependent.' },
      { when: c => c.budget.emotional   >= 7, line: 'May be perceived as "cool" or "cold" by emotionally expressive peers.' },
      { when: c => c.budget.empathy     >= 7, line: 'Frequent emotional-caregiver role in peer groups.' },
      { when: c => c.totalAlloc         >= 10 && (c.env.economy || 5) <= 4, line: 'Visibility of enhancement profile may stratify against non-modified peers.' },
      { when: c => (c.env.urbanRural || 5) >= 7, line: 'Smaller, less anonymous peer cohort. Reputation effects persist across years.' },
      { when: c => (c.env.urbanRural || 5) <= 3 && c.budget.appearance >= 5, line: 'Urban density amplifies appearance-based social attention.' },
      { when: c => (c.env.internet || 5) >= 8 && c.budget.appearance >= 5, line: 'Appearance-based feedback amplified by algorithmic distribution.' }
    ]
  },
  identity: {
    title: 'Identity risk',
    rules: [
      { when: c => c.budget.athleticism >= 8, line: 'Identity attachment to physical performance probable. Post-career risk elevated.' },
      { when: c => c.budget.cognition   >= 8, line: 'Intellectual-performance identity dependency likely.' },
      { when: c => c.budget.appearance  >= 7, line: 'Cosmetic-maintenance normalization through adolescence.' },
      { when: c => c.budget.emotional   >= 8, line: 'Reduced emotional reactivity may complicate grief processing and intimacy.' },
      { when: c => c.budget.resilience  >= 8, line: 'High pain-tolerance correlate may delay help-seeking.' },
      { when: c => c.budget.empathy     >= 8 && c.budget.resilience <= 4, line: 'Empathic overload without buffer: identity-fatigue risk.' },
      { when: c => (c.env.family || 5) <= 4, line: 'Lower family-support buffer; identity formation may be more peer-driven.' },
      { when: c => (c.env.family || 5) <= 3 && c.totalAlloc >= 10, line: 'Allocation/family-support mismatch: enhancement visibility may exceed safety net.' },
      { when: c => (c.env.internet || 5) >= 7, line: 'Identity formation increasingly mediated by algorithmic feedback from age 11+.' },
      { when: c => (c.env.multilingual || 5) >= 7, line: 'Code-switching capacity develops early; identity flexibility above baseline.' }
    ]
  },
  stress: {
    title: 'Stress & burnout',
    rules: [
      { when: c => (c.baby.conscientiousness || 0) >= 7 && (c.baby.neuroticism || 0) >= 6, line: 'Burnout risk elevated: care-runs-hot profile.' },
      { when: c => c.budget.cognition   >= 7 && c.budget.resilience >= 6, line: 'Achievement-driven stress accumulation; symptom-masking probable.' },
      { when: c => c.budget.emotional   >= 7, line: 'Grief integration may be slow or incomplete; clinical follow-up indicated.' },
      { when: c => (c.baby.extraversion || 0) >= 8 && (c.baby.neuroticism || 0) >= 6, line: 'Performance-recovery cycles; post-event depletion above baseline.' },
      { when: c => (c.env.social || 5)  >= 7 && c.totalAlloc >= 15, line: 'High-social-pressure environment + heavy allocation: compounding stress load.' },
      { when: c => (c.env.healthcare || 5) <= 4, line: 'Healthcare access limits long-term outcome certainty; recovery from adverse events less reliable.' },
      { when: c => (c.env.healthcare || 5) >= 8 && c.budget.emotional >= 6, line: 'Mental-health follow-up resources available, partially mitigating emotional-stability tradeoffs.' }
    ]
  },
  career: {
    title: 'Career & financial',
    rules: [
      { when: c => c.budget.cognition   >= 7 && (c.env.economy || 5) >= 6, line: 'Credentialed-career placement above 80th percentile projected by age 30.' },
      { when: c => c.budget.cognition   >= 7 && (c.env.economy || 5) <= 3, line: 'Access mismatch: capability above environment. Underemployment risk.' },
      { when: c => c.budget.creativity  >= 7, line: 'Non-stable income paths over-represented; multiple career changes plausible.' },
      { when: c => (c.baby.agreeableness || 0) >= 8, line: 'Compensation tends to lag peer benchmarks; negotiation reluctance modeled.' },
      { when: c => c.budget.athleticism >= 8 && (c.env.economy || 5) <= 4, line: 'Scholarship-dependent trajectory; injury-period collapse risk.' },
      { when: c => c.budget.appearance  >= 7, line: 'Appearance-correlated compensation premiums modeled in customer-facing roles.' },
      { when: c => (c.env.multilingual || 5) >= 7 && (c.env.economy || 5) >= 6, line: 'International career pathways more accessible; cross-border mobility above baseline.' },
      { when: c => (c.env.urbanRural || 5) >= 7 && c.budget.cognition >= 6, line: 'Niche-cognitive interests may require remote-community connection.' },
      { when: c => (c.env.family || 5) >= 8 && c.budget.cognition >= 6, line: 'Strong family support amplifies cognitive-track outcomes; capital and information access compound.' }
    ]
  }
};

function computeSocietalOutcomes(baby, budget, env) {
  const ctx = {
    baby:  baby   || {},
    budget: budget || {},
    env:   env    || {},
    totalAlloc: Object.values(budget || {}).reduce((s, v) => s + v, 0)
  };
  const out = {};
  for (const [key, def] of Object.entries(SOCIETAL_RULES)) {
    const fired = def.rules.filter(r => { try { return r.when(ctx); } catch { return false; } });
    out[key] = fired.length
      ? fired.slice(0, 3).map(r => r.line)
      : ['Within projected baseline range.'];
  }
  return out;
}

function renderSocietalBrief() {
  const panel = $('#societal-brief-panel');
  if (!panel) return;
  // Gate analytical machinery until the second Generate: the first
  // projection should feel like one imagined baby, not a cohort report.
  if (state.appMode !== 'adult' || !state.codename || (state.generateCount || 0) < 2) {
    panel.hidden = true;
    return;
  }
  const outcomes = computeSocietalOutcomes(state.baby, state.budget, state.env);
  state.socialResponse = outcomes;  // kept for save/restore compatibility

  const sections = Object.entries(SOCIETAL_RULES).map(([key, def]) => `
    <article class="societal-category" data-cat="${key}">
      <h3>${def.title}</h3>
      <ul>${outcomes[key].map(l => `<li>${l}</li>`).join('')}</ul>
    </article>`).join('');

  panel.innerHTML = `
    <header class="societal-brief-head">
      <h2>${localLabel('Societal Outcomes Brief')} <span class="beta-tag">${localLabel('Beta')}</span></h2>
      <p class="subtle">${localLabel('Modeled societal response to this projection. Each line fires from a specific allocation, trait, or environment combination — not a generic readout. These outcomes are modeled within the simulation using speculative social-psychological frameworks, not empirical findings.')}</p>
    </header>
    <div class="societal-grid">${sections}</div>`;
  panel.hidden = false;
}

// Back-compat shim — older call sites still expect renderSocialResponse.
const renderSocialResponse = renderSocietalBrief;

/* ---------- Divergence rendering ---------- */
function rollDivergence() {
  const rng = seededRand((state.codename || 'baby') + '|divergence|' + Date.now());
  {
    const divs = localList(DIVERGENCE_EVENTS);
    state.divergence = divs[Math.floor(rng() * divs.length)];
  }
  renderDivergence();
}

function renderDivergence() {
  const el = $('#divergence-banner');
  if (!el) return;
  // Same gating as the analytical Adult panels: a divergence beat needs a
  // baseline projection to push against, so wait until the second Generate
  // before letting the banner appear. Guard here so all callers (initial
  // render, dismiss, reroll, rollDivergence) respect it.
  if (state.appMode !== 'adult' || !state.divergence || (state.generateCount || 0) < 2) {
    el.hidden = true;
    el.innerHTML = '';
    return;
  }
  el.hidden = false;
  el.innerHTML = `
    <div class="divergence-head">
      <span class="divergence-label">⚠ Projection divergence detected</span>
      <div class="divergence-actions">
        <button type="button" class="divergence-reroll" data-act="reroll" aria-label="Roll a different divergence">↻</button>
        <button type="button" class="divergence-dismiss" data-act="dismiss" aria-label="Dismiss">×</button>
      </div>
    </div>
    <p class="divergence-body">${state.divergence}</p>
    <p class="divergence-note">${localLabel('Outcome trajectory no longer matches the modeled projection. Reprojection recommended.')}</p>`;
  el.querySelector('[data-act="dismiss"]').addEventListener('click', () => {
    state.divergence = null;
    renderDivergence();
  });
  el.querySelector('[data-act="reroll"]').addEventListener('click', () => rollDivergence());
}

/* ---------- Reflection: Inner Cohort renderer ---------- */
function renderInnerCohort() {
  const panel = $('#inner-cohort-panel');
  if (!panel) return;
  if (state.appMode !== 'reflection' || !state.codename) {
    panel.hidden = true;
    return;
  }
  const rng = seededRand(state.codename + '|inner-cohort');
  const lang = (state && state.language) ? state.language : 'en';
  const cards = INNER_COHORT_CONTEXTS.map(ctx => {
    const tr = (ctx.i18n && ctx.i18n[lang]) || {};
    const label = tr.label || ctx.label;
    const pool = tr.pool || ctx.pool;
    const picks = pickN(pool, 2, rng);
    return `
      <article class="inner-context" data-ctx="${ctx.key}">
        <header class="inner-context-head">
          <span class="inner-context-icon" aria-hidden="true">${ctx.icon}</span>
          <span class="inner-context-label">${label}</span>
        </header>
        <ul class="inner-context-lines">${picks.map(p => `<li>${p}</li>`).join('')}</ul>
      </article>`;
  }).join('');
  const heading = (typeof localLabel === 'function') ? localLabel('Same person, different rooms') : 'Same person, different rooms';
  const subline = (typeof localLabel === 'function') ? localLabel('Four contexts. One person each. The identity sliders did not model any of them.') : 'Four contexts. One person each. The identity sliders did not model any of them.';
  panel.innerHTML = `
    <header class="inner-cohort-head">
      <h2>${heading}</h2>
      <p class="subtle">${subline}</p>
    </header>
    <div class="inner-cohort-grid">${cards}</div>`;
  panel.hidden = false;
}

/* ---------- Reflection: Lifetime Drift renderer ---------- */
function renderLifetimeDrift() {
  const panel = $('#lifetime-drift-panel');
  if (!panel) return;
  if (state.appMode !== 'reflection' || !state.codename) {
    panel.hidden = true;
    return;
  }
  const rng = seededRand(state.codename + '|drift');
  const lang = (state && state.language) ? state.language : 'en';
  const cards = LIFETIME_DRIFT.ages.map((age, i) => {
    const tr = (age.i18n && age.i18n[lang]) || {};
    const label = tr.label || age.label;
    const pool = tr.pool || age.pool;
    const idx  = Math.floor(rng() * pool.length);
    const line = pool[idx];
    return `
      <article class="drift-stage" data-stage="${i}">
        <header class="drift-stage-head">
          <span class="drift-age">${label}</span>
        </header>
        <p class="drift-line">${line}</p>
      </article>`;
  }).join('');
  const heading = (typeof localLabel === 'function') ? localLabel('One life, different decades') : 'One life, different decades';
  const subline = (typeof localLabel === 'function') ? localLabel('The same person at four ages. The optimization targets you chose will look like different things at each.') : 'The same person at four ages. The optimization targets you chose will look like different things at each.';
  panel.innerHTML = `
    <header class="lifetime-drift-head">
      <h2>${heading}</h2>
      <p class="subtle">${subline}</p>
    </header>
    <div class="lifetime-drift-row">${cards}</div>`;
  panel.hidden = false;
}

/* ---------- Kids-mode arc renderers ----------
 * Three small panels — wonder, curiosity, variance-as-gift. Each picks
 * four lines deterministically from its pool, seeded by the codename.
 */
function renderKidsLoves() {
  const panel = $('#kids-loves-panel');
  if (!panel) return;
  if (state.appMode !== 'kids' || !state.codename) { panel.hidden = true; return; }
  const rng = seededRand(state.codename + '|kids-loves');
  const picks = pickN(localList(KIDS_LOVES), 4, rng);
  // R10 rev (UX MAJOR): set aria-labelledby + aria-describedby in JS so the
  // h2 + disclaimer ids land atomically with the section's accessible name —
  // previously static in HTML, but the targets only existed post-render,
  // leaving AT users with an unlabeled section on initial page traversal.
  // R9 rev (NARRATIVE MAJOR): `data-stage="1"` lets CSS stagger the
  // three-panel reveal as a sequenced wonder beat, not a simultaneous one.
  panel.dataset.stage = '1';
  panel.innerHTML = `
    <header class="kids-arc-head">
      <h2 id="kids-loves-title">${localLabel('Things they might love')}</h2>
      <p class="kids-arc-disclaimer" id="kids-loves-desc">${localList(KIDS_ARC_DISCLAIMERS.loves)[0]}</p>
      <p class="subtle">${localLabel('Specific, particular, and theirs.')}</p>
    </header>
    <ul class="kids-arc-list">${picks.map(p => `<li>${p}</li>`).join('')}</ul>`;
  panel.setAttribute('aria-labelledby', 'kids-loves-title');
  panel.setAttribute('aria-describedby', 'kids-loves-desc');
  panel.hidden = false;
}

function renderKidsQuestions() {
  const panel = $('#kids-questions-panel');
  if (!panel) return;
  if (state.appMode !== 'kids' || !state.codename) { panel.hidden = true; return; }
  const rng = seededRand(state.codename + '|kids-questions');
  const picks = pickN(localList(KIDS_QUESTIONS_FOR_THEM), 4, rng);
  // R10 rev: see renderKidsLoves — aria-labelledby/describedby set on the
  // panel right after innerHTML so the heading + disclaimer ids exist in the
  // same render frame as the reference. CSS reveal stagger via data-stage.
  panel.dataset.stage = '2';
  panel.innerHTML = `
    <header class="kids-arc-head">
      <h2 id="kids-questions-title">${localLabel('Questions you could ask them')}</h2>
      <p class="kids-arc-disclaimer" id="kids-questions-desc">${localList(KIDS_ARC_DISCLAIMERS.questions)[0]}</p>
      <p class="subtle">${localLabel('The kind you might not think to ask a grown-up.')}</p>
    </header>
    <ul class="kids-arc-list kids-arc-questions">${picks.map(p => `<li>${p}</li>`).join('')}</ul>`;
  panel.setAttribute('aria-labelledby', 'kids-questions-title');
  panel.setAttribute('aria-describedby', 'kids-questions-desc');
  panel.hidden = false;
}

function renderKidsDifferences() {
  const panel = $('#kids-differences-panel');
  if (!panel) return;
  if (state.appMode !== 'kids' || !state.codename) { panel.hidden = true; return; }
  const rng = seededRand(state.codename + '|kids-differences');
  const picks = pickN(localList(KIDS_DIFFERENCES), 4, rng);
  // R10 rev: see renderKidsLoves — aria-labelledby/describedby set on the
  // panel right after innerHTML so the heading + disclaimer ids exist in the
  // same render frame as the reference. CSS reveal stagger via data-stage.
  panel.dataset.stage = '3';
  panel.innerHTML = `
    <header class="kids-arc-head">
      <h2 id="kids-differences-title">${localLabel('What might make them them')}</h2>
      <p class="kids-arc-disclaimer" id="kids-differences-desc">${localList(KIDS_ARC_DISCLAIMERS.differences)[0]}</p>
    </header>
    <ul class="kids-arc-list">${picks.map(p => `<li>${p}</li>`).join('')}</ul>
    <p class="kids-arc-closing" role="doc-conclusion">${localList(KIDS_ARC_CLOSING_AFFIRMATION)[0]}</p>`;
  panel.setAttribute('aria-labelledby', 'kids-differences-title');
  panel.setAttribute('aria-describedby', 'kids-differences-desc');
  panel.hidden = false;
}

/* ---------- Sibling Cohort (Adult mode) ---------- */
function generateSiblingCohort() {
  if (!state.codename || !state.ranges) { state.siblings = []; return; }
  const COUNT = 5;
  const rng = seededRand(state.codename + '|siblings|' + state.generateCount);
  const sibs = [];
  for (let i = 0; i < COUNT; i++) {
    const baby = {};
    SLIDER_DEFS.forEach(def => {
      const r = state.ranges[def.key];
      if (!r) return;
      baby[def.key] = Math.floor(rng() * (r.max - r.min + 1)) + r.min;
    });
    let codename;
    if (state.appMode === 'adult') {
      const num    = Math.floor(rng() * 9000 + 1000);
      const letter = String.fromCharCode(65 + Math.floor(rng() * 6));
      codename = `Projection-${num}-${letter}`;
    } else {
      const aLet = ((state.parents.A?.name || 'A')[0] || 'A').toUpperCase();
      const bLet = ((state.parents.B?.name || 'B')[0] || 'B').toUpperCase();
      codename = `Tiny Prototype ${aLet}${bLet}-${String(Math.floor(rng() * 99) + 1).padStart(2, '0')}`;
    }
    const archetype = calculateArchetype(baby);
    const keys = ['openness','conscientiousness','extraversion','agreeableness','neuroticism','athletic'];
    const diffs = keys
      .map(k => ({ k, d: (baby[k] || 0) - (state.baby[k] || 0) }))
      .filter(x => Math.abs(x.d) >= 2)
      .sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
    let divergence = '';
    if (diffs.length) {
      const top = diffs[0];
      const sign = top.d > 0 ? '+' : '';
      divergence = `${sign}${top.d} ${top.k}`;
    }
    sibs.push({ baby, codename, archetype, divergence });
  }
  state.siblings = sibs;
}

function renderSiblingCohort() {
  const panel = $('#sibling-cohort-panel');
  if (!panel) return;
  // Same gating: variance-as-people lands harder once the user has
  // already met the one baby it's "varying" against.
  if (state.appMode !== 'adult' || !state.codename || !state.siblings || state.siblings.length === 0 || (state.generateCount || 0) < 2) {
    panel.hidden = true;
    return;
  }
  const cards = state.siblings.map((sib, i) => {
    const svg = buildAvatarSvg(sib.baby, state.style, state.gender, sib.codename);
    return `
      <article class="sibling-card" data-index="${i}">
        <div class="sibling-avatar">${svg}</div>
        <div class="sibling-id">${sib.codename}</div>
        <div class="sibling-archetype">${sib.archetype}</div>
        ${sib.divergence
          ? `<div class="sibling-divergence">Δ ${sib.divergence}</div>`
          : `<div class="sibling-divergence is-baseline">within projection band</div>`}
      </article>`;
  }).join('');
  panel.innerHTML = `
    <header class="sibling-head">
      <h2>${localLabel('Sibling Cohort · Variance Distribution')} <span class="beta-tag">${localLabel('Beta')}</span></h2>
      <p class="subtle">${localLabel('Five plausible outcomes from identical parental inputs and allocation. The variance shows the uncertainty range of inheritance estimates — not behavioral probability.')}</p>
    </header>
    <div class="sibling-strip">${cards}</div>`;
  panel.hidden = false;
}

/* ---------- Regional Access Context (Adult mode) ---------- */
function renderRegionalAccess(usedCredits) {
  const host = $('#regional-access');
  if (!host) return;
  if (state.appMode !== 'adult' || !usedCredits) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const budget = state.budget || {};
  const usd = usedCredits * 1000;
  let lines;
  // Real-world instruments cited: Oviedo Convention Art. 13 (prohibition
  // on heritable genome edits), UK HFEA 2008, and the (draft) EU IVD-Germ
  // Lines Directive. Channel codes RA-1…RA-5 remain diegetic and refer to
  // jurisdictional access pathways, not income cohorts. Access friction is
  // expressed in waiting periods and eligibility conditions, never percentiles.
  if      (usd < BUDGET_TIER_THRESHOLDS.licensedClinic)   lines = ['EU (Oviedo Convention Art. 13): heritable modification prohibited; indication-restricted somatic procedures only.', 'UK (HFEA 2008, Schedule 2): licensed in-vitro use only; clinics must hold a current HFEA treatment licence.', 'US: payer coverage discretionary; out-of-network rates apply outside HFEA-equivalent accredited centers.'];
  else if (usd < BUDGET_TIER_THRESHOLDS.referenceCentre)  lines = ['EU (draft IVD-Germ Lines Directive Art. 4): elective provision pending national transposition; self-pay only.', 'UK (HFEA 2008, Schedule 2): pre-treatment counselling and licensed-clinic registration required; waiting period 9–14 months.', 'Non-aligned regions: no reimbursement pathway; cross-border referral on case basis under channel code RA-2.'];
  else if (usd < BUDGET_TIER_THRESHOLDS.restricted)       lines = ['EU (draft IVD-Germ Lines Directive Art. 7): post-market review required; provision restricted to designated reference centres.', 'UK (HFEA 2008, Schedule 2, special-direction): eligibility conditional on documented clinical indication; channel code RA-3 review window 6 months.', 'Asia-Pacific: jurisdiction-dependent; cross-border referral subject to receiving-state HFEA-equivalent licensing.'];
  else if (usd < BUDGET_TIER_THRESHOLDS.outsideTreaty)    lines = ['EU + UK (draft IVD-Germ Lines Directive Art. 9; HFEA 2008, Schedule 2): restricted approval; pre-authorization by the national competent authority required.', 'Eligibility conditional on clinical-indication documentation and counselling completion; waiting list 14–22 months at HFEA-licensed reference centres.', 'Non-aligned regions: not provisioned under current channel-code RA-4 listing.'];
  else                                                    lines = ['Multi-jurisdictional (Oviedo Convention Art. 13): heritable provisions outside current treaty scope; authorization pending or withheld.', 'UK + EU: not provisioned under HFEA 2008 or the draft IVD-Germ Lines Directive; eligibility unresolved.', 'De facto pathway: extraterritorial facilities outside Oviedo signatory jurisdiction.'];
  // CMP-N codes (e.g. CMP-2 cognition, CMP-4 affective) are diegetic
  // category identifiers — not a real classification scheme. They sit
  // alongside the diegetic channel-code RA-N ladder above; the IVD-Germ
  // Lines Directive references are the projected-instrument variety
  // disclosed in the REGULATORY_CARDS "On the regulatory citations." entry.
  if ((budget.cognition || 0) >= 6) lines.push('Cognitive optimization (CMP-2): EU partial restriction under the draft IVD-Germ Lines Directive Art. 6; UK HFEA review ongoing.');
  if ((budget.emotional || 0) >= 6) lines.push('Affective-band editing (CMP-4): experimental authorization required; subject to HFEA-equivalent cohort follow-up.');
  host.hidden = false;
  host.innerHTML = `
    <h4>Regional Access &middot; channel code RA-${Math.min(5, Math.max(1, Math.floor(usd / RA_CHANNEL_DIVISOR) + 1))}</h4>
    <ul class="regional-list">${lines.slice(0, 4).map(l => `<li>${l}</li>`).join('')}</ul>
    <p class="regional-foot">${localLabel('Issued for indicative purposes. Authorizations and waiting-list intervals are revised quarterly; current values supersede prior disclosures.')}</p>`;
}

/* ---------- Trait Popularity Through History ---------- */
function renderTraitHistory() {
  const panel = $('#trait-history-panel');
  if (!panel) return;
  // Same gating: historical drift critique reads as a finger-wag if it
  // shows up before the user has even seen their first projection settle.
  if (state.appMode !== 'adult' || (state.generateCount || 0) < 2) {
    panel.hidden = true;
    return;
  }
  const lang = (state && state.language) ? state.language : 'en';
  const cards = TRAIT_HISTORY.map(era => {
    const tr = (era.i18n && era.i18n[lang]) || {};
    const label = tr.label || era.label;
    const traits = tr.traits || era.traits;
    const note = tr.note || era.note;
    const cls = [
      'history-era',
      era.isPresent ? 'is-present' : '',
      era.isSpeculative ? 'is-speculative' : ''
    ].filter(Boolean).join(' ');
    return `
      <article class="${cls}">
        <header class="era-head">
          <span class="era-year">${era.era}</span>
          <span class="era-label">${label}</span>
        </header>
        <ul class="era-traits">${traits.map(t => `<li>${t}</li>`).join('')}</ul>
        <p class="era-note">${note}</p>
      </article>`;
  }).join('');
  const L = (s) => (typeof localLabel === 'function') ? localLabel(s) : s;
  panel.innerHTML = `
    <header class="trait-history-head">
      <h2>${L('Trait Popularity · Historical Drift')} <span class="beta-tag">${L('Beta')}</span></h2>
      <p class="subtle">${L("What gets called a 'desirable' trait drifts across eras. Optimization targets are not culturally stable.")}</p>
    </header>
    <div class="trait-history-timeline">${cards}</div>`;
  panel.hidden = false;
}

function pickReflectionPrompt(seed) {
  const rng = seededRand(seed + '|reflection');
  // Reflection mode: anchor the question to ONE of the 4 Inner Cohort
  // contexts the user just saw (work / family / late / beloved). The
  // context is itself deterministic per codename, using a separate seed
  // tag so the pick survives prompt-pool edits.
  if (state.appMode === 'reflection') {
    const ctxRng = seededRand(seed + '|pause-ctx');
    const ctxKeys = INNER_COHORT_CONTEXTS.map(c => c.key);
    const ctxKey  = ctxKeys[Math.floor(ctxRng() * ctxKeys.length)];
    const ctxPool = localList(PAUSE_PROMPTS_BY_CONTEXT[ctxKey]);
    if (ctxPool && ctxPool.length) return ctxPool[Math.floor(rng() * ctxPool.length)];
  }
  const pool = pickPool(REFLECTION_PROMPTS, REFLECTION_PROMPTS, KIDS_REFLECTION_PROMPTS);
  return pool[Math.floor(rng() * pool.length)];
}

function showHumanityReminder(line) {
  const banner = $('#reminder-banner');
  if (!banner) return;
  const pool = pickPool(HUMANITY_REMINDERS, CLINICAL_REMINDERS, KIDS_HUMANITY_REMINDERS);
  // R13rev: seed off codename so the same simulation always surfaces the same
  // reminder line (reproducibility); fall back to Math.random() when no codename
  // is set yet (pre-generation), since there's nothing stable to seed against.
  const rng = state.codename ? seededRand(state.codename + '|reminder') : Math.random;
  banner.textContent = line || pool[Math.floor(rng() * pool.length)];
  banner.hidden = false;
  banner.classList.add('is-visible');
  clearTimeout(showHumanityReminder._t);
  showHumanityReminder._t = setTimeout(() => {
    banner.classList.remove('is-visible');
    setTimeout(() => { banner.hidden = true; }, 700);
  }, 8000);
}

/* ====================================================================
 * 10. Action buttons
 * ==================================================================== */

function randomizeBaby() {
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    const v = randInt(r.min, r.max);
    state.baby[def.key] = v;
    syncSliderDOMForOcean(def.key, v);
  });
  updateBabyPreview();
}

function resetBaby() {
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    state.baby[def.key] = r.def;
    syncSliderDOMForOcean(def.key, r.def);
  });
  updateBabyPreview();
}

function copyProfile() {
  const p = state.parents;
  const b = state.baby;
  const lines = [
    `BabyBlend Lab — ${state.codename}`,
    ``,
    `Parents: ${p.A.name || 'Parent A'} × ${p.B.name || 'Parent B'}`,
    `Sex: ${GENDER_LABEL[state.gender] || 'Surprise'}`,
    `Genetic surprise factor: ${state.surprise}%`,
    `Archetype: ${state.archetype}`,
    ``,
    `— Likely Traits —`,
    `Height (possible):       ~${Math.round(b.height)} cm`,
    `Eye color (likely):       ${titleCase(EYE_LADDER[b.eyeColor])}`,
    `Hair color (likely):      ${titleCase(HAIR_LADDER[b.hairColor])}`,
    `Hair texture (likely):    ${titleCase(TEX_LADDER[b.hairType])}`,
    `Skin tone (likely):       ${titleCase(SKIN_LADDER[b.skinTone])}`,
    `Face shape (likely):      ${titleCase(FACE_LADDER[b.faceShape])}`,
    `Freckles likelihood:      ${b.freckles}%`,
    `Dimples likelihood:       ${b.dimples}%`,
    ``,
    `— Big Five personality (inspired by, not predictive of, real psychology) —`,
    `Openness:          ${b.openness}/10`,
    `Conscientiousness: ${b.conscientiousness}/10`,
    `Extraversion:      ${b.extraversion}/10`,
    `Agreeableness:     ${b.agreeableness}/10`,
    `Neuroticism:       ${b.neuroticism}/10`,
    `Athletic:          ${b.athletic}/10`,
    ``,
    `(Fictional simulation — not a real genetic prediction. Real traits`,
    `are shaped by many genes, environment, chance, culture, health,`,
    `and life experience.)`
  ];
  const text = lines.join('\n');
  const status = $('#copy-status');
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); status.textContent = localLabel('Copied to clipboard ✓'); }
    catch { status.textContent = localLabel('Couldn’t copy automatically — please copy from the alert.'); alert(text); }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => { status.textContent = localLabel('Copied to clipboard ✓'); })
      .catch(fallback);
  } else { fallback(); }
  setTimeout(() => {
    const en = 'Copied to clipboard ✓';
    const copied = localLabel(en);
    if (status.textContent === copied || status.textContent === en || status.textContent.startsWith('Copied')) status.textContent = '';
  }, 2200);
}

/* ====================================================================
 * 11. Surprise UI
 * ==================================================================== */

function renderSurprise(pct) {
  $('#surprise-pct').textContent = pct + '%';
  $('#surprise-fill').style.width = pct + '%';
  const adult = state.appMode === 'adult';
  const note = adult
    ? (pct < 25
        ? 'Low variance: parental inputs converge across most loci.'
        : pct < 55
          ? 'Moderate variance: outcomes plausibly lean toward either parent.'
          : pct < 80
            ? 'High variance: substantial divergence from midparent baseline expected.'
            : 'Extreme variance: outcomes span the full plausible distribution.')
    : (pct < 25
        ? 'Parents are similar across most traits — fewer wild blends.'
        : pct < 55
          ? 'A balanced mix — expect some traits to lean toward either parent.'
          : pct < 80
            ? 'Parents are quite different — many possible blends.'
            : 'Wildly different parents — almost anything goes within this space.');
  $('#surprise-note').textContent = note;
}

/* ====================================================================
 * 12. Wire everything up
 * ==================================================================== */

function generate() {
  state.parents = collectParentData();
  state.env     = collectEnvData();
  state.ranges  = generateSliderRanges(state.parents);
  state.surprise = computeSurprise(state.parents);
  state.codename = generateCodename(state.parents);
  state.generateCount += 1;
  applyBudgetPanelGate();

  $('#codename').textContent = state.codename;
  renderSliders(state.ranges);
  resetBaby();             // sets to parent-average defaults + triggers preview

  // Funny vibe + future paths + random events + news headlines are derived
  // from the codename so they're stable for the lifetime of this baby.
  const flavor = generateBabyFlavor(state.codename, state.baby);
  state.vibe        = flavor.vibe;
  state.futurePaths = flavor.paths;
  state.events      = flavor.events;
  state.headlines   = flavor.headlines;
  state.conflicts   = computeTraitConflicts(state.baby);
  state.reflection  = pickReflectionPrompt(state.codename);

  renderSurprise(state.surprise);

  // Divergence: in Adult mode, ~25% of generations get overridden by an
  // ordinary biographical event the model couldn't predict. Cleared
  // otherwise so each generation starts from a clean projection.
  state.divergence = null;
  if (state.appMode === 'adult' && Math.random() < 0.25) {
    rollDivergence();
  }

  // Sibling cohort: five equally-probable variants from the same inputs.
  // Sampled at generation time; persists until next Generate.
  generateSiblingCohort();

  updateBabyPreview();      // refresh display with new flavor (also renders divergence + history)

  // Quietly remind users this is a person, not a profile. R12 rev: fire on
  // every 2nd generation (1, 3, 5…) — compromise between R8's every-3rd and
  // R11's every-1st. The 10-message EN pool repeats visibly within a typical
  // session when fired every gen; halving the cadence roughly doubles the
  // unique-message window while still keeping the humanity frame present.
  // Hold remains ~8s so each firing carries equal weight to the projection.
  if ((state.generateCount % 2) === 1) showHumanityReminder();

  const results = $('#results');
  const wasHidden = results.hidden;
  results.hidden = false;
  // Smooth-scroll to the projection ONLY on first reveal. R6 (UX flow):
  // subsequent Generates already happen while #results is in view, and the
  // newly-unlocked Gen-2 panels (societal brief, sibling cohort, trait
  // history, divergence) sit BELOW the user's current scroll position —
  // yanking them back up to the top of #results both back-tracks and
  // hides those reveals. preserveNaturalVariation() already follows this
  // pattern; mirror it here for parity.
  if (wasHidden) {
    requestAnimationFrame(() => {
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function setupPillToggle(btnSelector, stateKey, onChange) {
  $$(btnSelector).forEach(btn => {
    btn.addEventListener('click', () => {
      $$(btnSelector).forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      state[stateKey] = btn.dataset[stateKey];
      if (state.codename) {
        updateAvatar(state.baby);
        updateBabyPreview();   // refresh stats line that includes the new value
      }
      if (onChange) onChange(state[stateKey]);
    });
  });
}

function setupGenderExpression() {
  const slider = $('#gender-expression');
  const valEl  = $('#gender-expression-val');
  if (!slider) return;
  slider.value = state.genderExpression;
  if (valEl) valEl.textContent = state.genderExpression + '%';
  applyGenderExpressionState();
  slider.addEventListener('input', () => {
    state.genderExpression = Number(slider.value) || 0;
    if (valEl) valEl.textContent = state.genderExpression + '%';
    if (state.codename) updateAvatar(state.baby);
  });
}

function applyGenderExpressionState() {
  const row = $('#gender-expression-row');
  if (!row) return;
  // The slider has no effect when sex is "surprise" — fade it to signal that.
  row.classList.toggle('is-disabled', state.gender === 'surprise');
}

function preserveNaturalVariation() {
  // Force-widen ranges to the full hard bounds for this generation only.
  const wasChaos = state.chaos;
  state.chaos = true;

  state.parents = collectParentData();
  state.env     = collectEnvData();
  state.ranges  = generateSliderRanges(state.parents);
  state.surprise = computeSurprise(state.parents);
  state.codename = generateCodename(state.parents);
  state.generateCount += 1;
  applyBudgetPanelGate();

  $('#codename').textContent = state.codename;
  renderSliders(state.ranges);

  // Pick freely across each slider's range — no optimization.
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    const v = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
    state.baby[def.key] = v;
    syncSliderDOMForOcean(def.key, v);
  });

  // Restore chaos toggle to the user's setting (we only borrowed the range
  // widening). Note the slider ranges keep their widened bounds for now —
  // that's intentional: it makes the diversity visible.
  state.chaos = wasChaos;

  const flavor = generateBabyFlavor(state.codename, state.baby);
  state.vibe        = flavor.vibe;
  state.futurePaths = flavor.paths;
  state.events      = flavor.events;
  state.headlines   = flavor.headlines;
  state.conflicts   = computeTraitConflicts(state.baby);
  state.reflection  = pickReflectionPrompt(state.codename);

  renderSurprise(state.surprise);

  const results = $('#results');
  if (results.hidden) {
    results.hidden = false;
    requestAnimationFrame(() => results.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  updateBabyPreview();
  {
    const msgs = localList(NATURAL_VARIATION_MESSAGES);
    showHumanityReminder(msgs[Math.floor(Math.random() * msgs.length)]);
  }
  // Bloom the palette briefly — preserving variation is the warm move.
  flashWarming();
}

function randomizeOneParent(letter) {
  PARENT_FIELDS.forEach(f => {
    const el = $('#p' + letter + '_' + f.key);
    if (!el) return;
    let val;
    if (f.type === 'text') {
      val = FUN_NAMES[Math.floor(Math.random() * FUN_NAMES.length)];
    } else if (f.type === 'number') {
      val = Math.round(f.min + Math.random() * (f.max - f.min));
    } else if (f.type === 'range') {
      val = Math.floor(f.min + Math.random() * (f.max - f.min + 1));
    } else if (f.type === 'select') {
      val = f.options[Math.floor(Math.random() * f.options.length)];
    }
    el.value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  // After random fields are set, snap skin/hair/eye/texture into a plausible
  // bundle if the rolled ancestry has a preset. Without this, randomize
  // produces incoherent looks (e.g. European ancestry with deep brown skin).
  const ancestrySel = $('#p' + letter + '_ancestry');
  if (ancestrySel && ANCESTRY_PRESETS[ancestrySel.value]) {
    applyAncestryPreset(letter, ancestrySel.value);
  }
}

function randomizeParents() {
  randomizeOneParent('A');
  randomizeOneParent('B');
  // Also randomize the environmental factors so the whole context shifts.
  ENV_FIELDS.forEach(f => {
    const el = $('#env_' + f.key);
    if (!el) return;
    const v = Math.floor(f.min + Math.random() * (f.max - f.min + 1));
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

// Diversify only the appearance fields (skin / hair / eye / hair type) by
// drawing each parent from a randomly-picked phenotype preset in
// ANCESTRY_LADDER. Leaves the ancestry SELECT and every non-appearance
// field untouched — so this is a one-click escape from the Northern-
// European phenotype baseline encoded in PARENT_FIELDS' defA/defB without
// imposing any new default on the user. LOOP_REQUEST(narrative): refine
// "Diversify defaults" button copy + tooltip phrasing.
function diversifyParentDefaults() {
  const ladder = Object.keys(ANCESTRY_PRESETS).filter(k => ANCESTRY_PRESETS[k]);
  if (!ladder.length) return;
  ['A', 'B'].forEach(letter => {
    const preset = ANCESTRY_PRESETS[ladder[Math.floor(Math.random() * ladder.length)]];
    if (!preset) return;
    Object.entries(preset).forEach(([key, options]) => {
      const el = $('#p' + letter + '_' + key);
      if (!el) return;
      el.value = options[Math.floor(Math.random() * options.length)];
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
}

/* ---------- Saved Timelines (localStorage) ---------- */

const SAVED_KEY = 'babyblend.saved.v1';
const MAX_SAVED = 12;

function loadSavedFromStorage() {
  try { const raw = localStorage.getItem(SAVED_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}

function persistSaved(list) {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch {}
}

function saveCurrentTimeline() {
  if (!state.codename) return;
  const list = loadSavedFromStorage();
  // Don't double-save the exact same baby; refresh its timestamp if identical.
  const dupeIdx = list.findIndex(e => e.codename === state.codename &&
    JSON.stringify(e.baby) === JSON.stringify(state.baby));
  if (dupeIdx !== -1) list.splice(dupeIdx, 1);
  list.unshift({
    id: 'baby-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    savedAt: Date.now(),
    parents: state.parents,
    baby:    { ...state.baby },
    codename: state.codename,
    vibe:     state.vibe,
    futurePaths: state.futurePaths,
    events:   state.events,
    archetype: state.archetype,
    style:    state.style,
    gender:   state.gender,
    genderExpression: state.genderExpression,
    chaos:    state.chaos,
    surprise: state.surprise
  });
  while (list.length > MAX_SAVED) list.pop();
  persistSaved(list);
  renderSavedList();
  const status = $('#copy-status');
  if (status) {
    status.textContent = localLabel('Saved ✓');
    setTimeout(() => { if (status.textContent === localLabel('Saved ✓') || status.textContent === 'Saved ✓') status.textContent = ''; }, 1800);
  }
}

function deleteTimeline(id) {
  const list = loadSavedFromStorage().filter(x => x.id !== id);
  persistSaved(list);
  renderSavedList();
}

function loadTimeline(id) {
  const list = loadSavedFromStorage();
  const entry = list.find(x => x.id === id);
  if (!entry) return;

  state.parents = entry.parents;
  ['A', 'B'].forEach(letter => {
    PARENT_FIELDS.forEach(f => {
      const el = $('#p' + letter + '_' + f.key);
      const v = entry.parents?.[letter]?.[f.key];
      if (el && v !== undefined) {
        el.value = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  });

  state.style  = entry.style  || 'lorelei';
  state.gender = entry.gender || 'surprise';
  state.genderExpression = (typeof entry.genderExpression === 'number') ? entry.genderExpression : 70;
  state.chaos  = !!entry.chaos;
  const gxSlider = $('#gender-expression');
  if (gxSlider) {
    gxSlider.value = state.genderExpression;
    const v = $('#gender-expression-val');
    if (v) v.textContent = state.genderExpression + '%';
  }
  applyGenderExpressionState();
  $$('.style-btn').forEach(b => {
    const active = b.dataset.style === state.style;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  $$('.gender-btn').forEach(b => {
    const active = b.dataset.gender === state.gender;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  const chaosBtn = $('#chaos-btn');
  if (chaosBtn) {
    chaosBtn.setAttribute('aria-pressed', state.chaos ? 'true' : 'false');
    chaosBtn.classList.toggle('is-active', state.chaos);
  }

  state.ranges  = generateSliderRanges(state.parents);
  state.surprise = entry.surprise;
  state.codename = entry.codename;
  state.vibe = entry.vibe;
  state.futurePaths = entry.futurePaths || [];
  state.events = entry.events || [];
  state.archetype = entry.archetype;

  $('#codename').textContent = state.codename;
  renderSliders(state.ranges);
  SLIDER_DEFS.forEach(def => {
    const r = state.ranges[def.key];
    const v = entry.baby[def.key];
    if (typeof v === 'number') {
      const clamped = clamp(v, r.min, r.max);
      state.baby[def.key] = clamped;
      syncSliderDOMForOcean(def.key, clamped);
    }
  });
  renderSurprise(state.surprise);
  const results = $('#results');
  if (results.hidden) results.hidden = false;
  updateBabyPreview();
}

function renderSavedList() {
  const container = $('#saved-timelines');
  if (!container) return;
  const list = loadSavedFromStorage();
  if (list.length === 0) {
    container.hidden = true;
    container.innerHTML = '';
    return;
  }
  container.hidden = false;
  container.innerHTML = `
    <h3>Saved Timelines <span class="saved-count">${list.length}</span></h3>
    <div class="saved-list">
      ${list.map(e => `
        <div class="saved-entry" data-id="${e.id}">
          <div class="saved-text">
            <strong>${e.codename}</strong>
            <span class="saved-vibe">${e.vibe || ''}</span>
          </div>
          <div class="saved-actions">
            <button class="btn btn-tiny" data-action="load" data-id="${e.id}">Load</button>
            <button class="btn btn-tiny btn-danger" data-action="delete" data-id="${e.id}" aria-label="Delete">×</button>
          </div>
        </div>
      `).join('')}
    </div>`;
  container.querySelectorAll('[data-action="load"]').forEach(b => {
    b.addEventListener('click', () => loadTimeline(b.dataset.id));
  });
  container.querySelectorAll('[data-action="delete"]').forEach(b => {
    b.addEventListener('click', () => deleteTimeline(b.dataset.id));
  });
}

function setupLanding() {
  const landing = $('#landing');
  if (!landing) return;
  const begin   = $('#intro-enter-btn') || $('#landing-begin');
  const skip    = $('#intro-skip');
  const dismiss = (e) => {
    if (e) e.preventDefault();
    document.body.classList.add('has-entered');
    // Free the page scroll once we're out — the intro had its own scroll container.
    setTimeout(() => { landing.style.display = 'none'; }, 700);
  };
  if (begin) begin.addEventListener('click', dismiss);
  if (skip)  skip.addEventListener('click', dismiss);

  // Reveal animations are now CSS-driven (auto-playing keyframes), so
  // we just mark every section visible at init for any rule that still
  // keys off .is-visible. No observer — iOS Safari was unreliable with
  // a custom-root observer on a fixed scroll container and left later
  // sections invisible.
  landing.querySelectorAll('.intro-section').forEach(s => s.classList.add('is-visible'));
}

function setupDetailsToggle() {
  const btn = $('#details-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    document.body.classList.toggle('show-details', !expanded);
    btn.textContent = expanded ? 'Show more' : 'Show less';
  });
}

function setupChaosToggle() {
  const btn = $('#chaos-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.chaos = !state.chaos;
    btn.setAttribute('aria-pressed', state.chaos ? 'true' : 'false');
    btn.classList.toggle('is-active', state.chaos);
    // If a baby already exists, re-derive the slider ranges + surprise so the
    // chaos effect is felt immediately (clamping any current baby values into
    // the new range).
    if (state.codename) {
      state.ranges = generateSliderRanges(state.parents);
      state.surprise = computeSurprise(state.parents);
      const prev = { ...state.baby };
      renderSliders(state.ranges);
      SLIDER_DEFS.forEach(def => {
        const r = state.ranges[def.key];
        if (typeof prev[def.key] === 'number') {
          const v = clamp(prev[def.key], r.min, r.max);
          state.baby[def.key] = v;
          syncSliderDOMForOcean(def.key, v);
        }
      });
      renderSurprise(state.surprise);
      updateBabyPreview();
    }
  });
}

function buildEnhancementBudget() {
  const grid = $('#budget-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  PRIORITIES.forEach(p => {
    if (!(p.key in state.budget)) state.budget[p.key] = 0;
    const id = 'pr_' + p.key;
    const tr = (p.i18n && p.i18n[lang]) || {};
    const label = tr.label || p.label;
    const tier = tr.tier || p.tier;
    const tradeoff = tr.tradeoff || p.tradeoff;
    const row = document.createElement('div');
    row.className = 'priority-row';
    row.dataset.tier = p.tier.toLowerCase();
    row.innerHTML = `
      <div class="priority-head">
        <label for="${id}">${label} <span class="priority-tier">${tier}</span></label>
        <span class="priority-cost">${p.cost} cr · pt</span>
      </div>
      <div class="field-range">
        <input type="range" id="${id}" min="0" max="10" step="1" value="${state.budget[p.key]}" />
        <span class="val" id="${id}_val">${state.budget[p.key]}</span>
      </div>
      <p class="priority-tradeoff">${tradeoff}</p>`;
    grid.appendChild(row);
    const input = row.querySelector('input');
    const valEl = row.querySelector('.val');
    input.addEventListener('input', () => {
      const requested = Number(input.value);
      // R8 rev (Ethics MAJOR + Narrative MAJOR): surface the micro-ack on the
      // first non-zero allocation instead of silently flipping consentAck.
      // Pre-ack slider exploration must NOT retire the ethical leadin — that
      // collapsed three narrative beats (fade 450ms + 200ms gap + panel reveal
      // 450ms) into a single tick. The cross-fade now fires ONLY when the
      // user clicks the acknowledge button inside showConsentAckPrompt, so
      // the ethical context stays present while they're choosing.
      if (requested > 0 && !state.consentAck) showConsentAckPrompt();
      const otherCost = Object.entries(state.budget).reduce((sum, [k, v]) => {
        if (k === p.key) return sum;
        const pr = PRIORITIES.find(x => x.key === k);
        return sum + (pr ? pr.cost * v : 0);
      }, 0);
      const allowedMax = Math.max(0, Math.floor((BUDGET_TOTAL - otherCost) / p.cost));
      const allowed = Math.min(requested, allowedMax);
      if (allowed !== requested) {
        input.value = allowed;
        row.classList.add('over-budget');
        setTimeout(() => row.classList.remove('over-budget'), 360);
      }
      state.budget[p.key] = allowed;
      valEl.textContent = allowed;
      updateBudgetBar();
      // Total-allocated threshold may have crossed 50 → refresh consent gate.
      applyBudgetPanelGate();
      if (state.codename && state.appMode === 'adult') {
        renderSocialResponse();
        updateBabyPreview();
      }
    });
  });
  updateBudgetBar();
}

// One-time micro-acknowledgment for the first non-zero allocation. Lazily
// injects a small acknowledge button inside #budget-panel. Once clicked,
// state.consentAck flips true for the rest of the session and the prompt
// removes itself. Persists per session via state (not localStorage).
function showConsentAckPrompt() {
  const panel = $('#budget-panel');
  if (!panel || state.consentAck) return;
  let prompt = panel.querySelector('.consent-ack-prompt');
  if (!prompt) {
    prompt = document.createElement('div');
    prompt.className = 'consent-ack-prompt';
    prompt.innerHTML = `
      <p class="consent-ack-copy">${localLabel('I understand this is a heritable decision.')}</p>
      <button type="button" class="btn btn-small consent-ack-btn">${localLabel('Acknowledge & continue')}</button>`;
    const grid = panel.querySelector('#budget-grid');
    if (grid && grid.parentNode) grid.parentNode.insertBefore(prompt, grid);
    else panel.appendChild(prompt);
    const btn = prompt.querySelector('.consent-ack-btn');
    if (btn) btn.addEventListener('click', () => {
      state.consentAck = true;
      // Fade the prompt out, then remove it on transition end.
      prompt.classList.add('is-leaving');
      const cleanup = () => { prompt.remove(); ensureConsentProgressHint(); };
      prompt.addEventListener('transitionend', cleanup, { once: true });
      setTimeout(cleanup, 500); // fallback if transitionend doesn't fire
      // Cross-fade the Gen-1 consent-awareness note: its hand-off partner
      // (the micro-ack) just fired, so the early beat retires. The wrapper
      // (#consent-awareness-leadin) carries its own visual chrome (padding,
      // border, background) so it must collapse together with the inner
      // note — otherwise an empty bordered box lingers between the note's
      // fade-out and any future mode/gen change. Retire the wrapper on the
      // same transition-end as the note so the three-beat rhythm ends
      // cleanly instead of leaving a hollow container in the cascade.
      const note = document.querySelector('.consent-awareness-note');
      const leadin = document.getElementById('consent-awareness-leadin');
      // R9 rev (UX POLISH): wrapper is fully retired via `hidden=true` +
      // empty innerHTML. We do NOT call `leadin.remove()` because the
      // wrapper is a static element in index.html that applyBudgetPanelGate
      // queries (not creates); removing it would break any future return to
      // eligibility. The hidden-attribute path collapses chrome (padding,
      // border, margin) the same way without that recovery hazard.
      const clearLeadin = () => {
        if (!leadin) return;
        leadin.innerHTML = '';
        leadin.hidden = true;
      };
      if (note) {
        note.classList.add('is-leaving');
        const retire = () => { note.remove(); clearLeadin(); };
        note.addEventListener('transitionend', retire, { once: true });
        setTimeout(retire, 500);
      } else {
        clearLeadin();
      }
    });
  }
}

// Faint progress hint toward the next consent-intensity threshold (50 credits).
// Lives just under the budget bar; auto-removes once threshold reached.
function ensureConsentProgressHint() {
  const panel = $('#budget-panel');
  if (!panel) return;
  const used = computeBudgetUsed();
  let hint = panel.querySelector('.consent-progress-hint');
  if (used >= 50) { if (hint) hint.remove(); return; }
  if (!hint) {
    hint = document.createElement('div');
    hint.className = 'consent-progress-hint';
    hint.innerHTML = `
      <p class="consent-progress-copy">${localLabel('Consent context expands at 50 credits.')}</p>
      <div class="consent-progress-track"><div class="consent-progress-fill"></div></div>`;
    const grid = panel.querySelector('#budget-grid');
    if (grid && grid.parentNode) grid.parentNode.insertBefore(hint, grid);
    else panel.appendChild(hint);
  }
  const fill = hint.querySelector('.consent-progress-fill');
  if (fill) fill.style.width = Math.min(100, (used / 50) * 100) + '%';
}

function updateBudgetBar() {
  const used = Object.entries(state.budget).reduce((sum, [k, v]) => {
    const pr = PRIORITIES.find(x => x.key === k);
    return sum + (pr ? pr.cost * v : 0);
  }, 0);
  const bar = $('#budget-fill');
  const text = $('#budget-text');
  if (bar) bar.style.width = Math.min(100, (used / BUDGET_TOTAL) * 100) + '%';
  if (text) text.textContent = `${used} / ${BUDGET_TOTAL} credits`;
  // Heritable-consent badge: reveals on >=50 credits allocated, matching
  // the Consent Implications panel gate. Below that threshold the badge
  // stays hidden so the early experience isn't carrying the full
  // compliance frame.
  const badge = $('#consent-badge');
  if (badge) badge.hidden = !(used >= 50);
  // Inline ethics flags: visible at any allocation > 0, BEFORE the full
  // Consent Implications panel unlocks at 50 credits. Acts as a faint
  // ambient signal so the reversibility/absent-subject framing isn't
  // delayed until the heavy panel reveals.
  const flags = $('#budget-ethics-flags');
  if (flags) flags.hidden = !(used > 0);
  // If the micro-ack already fired, keep the progress hint in sync; it
  // auto-removes once threshold (50) is reached.
  if (state.consentAck) ensureConsentProgressHint();
  updateBudgetProjections(used);
  // Recompute the unified opt-intensity (drift + budget).
  updateOptIntensity();
}

/* ---------- Render Consent Implications panel ----------
 * Populates #consent-explainer from CONSENT_EXPLAINER. Static content;
 * does not react to budget state (the point is that the consent
 * structure is invariant under allocation choice). */
function renderConsentExplainer() {
  const host = $('#consent-explainer');
  if (!host) return;
  const lang = (typeof state !== 'undefined' && state.language) ? state.language : 'en';
  const lead = (CONSENT_EXPLAINER && typeof CONSENT_EXPLAINER === 'object' && (CONSENT_EXPLAINER[lang] || CONSENT_EXPLAINER.en))
    || (typeof CONSENT_EXPLAINER === 'string' ? CONSENT_EXPLAINER : '');
  const rows = Array.isArray(CONSENT_IMPLICATIONS) ? CONSENT_IMPLICATIONS : [];
  if (!lead && !rows.length) return;
  const leadHtml = lead ? `<p class="consent-line">${lead}</p>` : '';
  const rowsHtml = rows.map(it => {
    const tr = (it && it.i18n && it.i18n[lang]) || {};
    const label = tr.label || (it && it.label) || '';
    const body  = tr.body  || (it && it.body)  || '';
    return `<div class="consent-row"><span class="consent-label">${label}</span><span class="consent-body">${body}</span></div>`;
  }).join('');
  const summary = (typeof localLabel === 'function') ? localLabel('Institutional consent record') : 'Institutional consent record';
  host.innerHTML = `
    ${leadHtml}
    <details class="consent-detail">
      <summary>${summary}</summary>
      <div class="consent-detail-body">${rowsHtml}</div>
    </details>`;
  host.dataset.rendered = '1';
}

/* ---------- Adult budget projections ----------
 * Two derived indicators that respond to enhancement allocation. The
 * Cohort Placement reads as a percentile claim ("Projected: top 8% of
 * birth cohort by composite score"); the Identity Lock-In Index weights
 * spend by how much each priority package locks identity, appearance, or
 * affect into the descendant line vs. simply reducing disease risk —
 * what the future subject inherits without consent. Both update on every
 * budget change. The numbers are made up — the point is to make the
 * consumer-product feeling concrete. */
// Weights model NON-CONSENSUAL LOCK-IN (reversibility × identity-impact ×
// propagation), NOT heritability percentages. EVERY heritable allocation
// removes the descendant's choice — the weight measures HOW MUCH that loss
// of consent matters, not WHETHER it occurs. Health-class allocations weight
// low because their effects partially reverse across generations or respond
// to environmental buffering; identity / affect allocations weight high
// because they self-perpetuate in the line. Polderman et al. (2015) puts
// Big Five personality heritability at ~40-50%; these weights are narrative
// modeling, not science.
//
// NOT AN ETHICS RANKING. These weights are NOT a measure of ethical
// acceptability, and a low weight is NOT a permission slip. Every heritable
// allocation removes the future subject's choice; the weight only measures
// how widely the loss propagates into the line. A 0.1-weighted allocation
// is not "more justified" or "more acceptable" than a 1.0-weighted one —
// it is equally non-consensual. Read this scale as propagation breadth,
// never as moral approval. The y-axis is "how far the non-consent spreads",
// not "how okay the non-consent is".
const INHERITANCE_BURDEN_WEIGHTS = {
  health: 0.1, resilience: 0.2, creativity: 0.4, empathy: 0.4,
  cognition: 0.45, athleticism: 0.6, emotional: 1.0,
  appearance: 1.0, sociability: 1.0
};
function updateBudgetProjections(usedOverride) {
  const cohortEl   = $('#cohort-placement');
  const pressureEl = $('#pressure-fill');
  const pressureNote = $('#pressure-note');
  if (!cohortEl) return;

  const used = (typeof usedOverride === 'number')
    ? usedOverride
    : Object.entries(state.budget || {}).reduce((s, [k, v]) => {
        const pr = PRIORITIES.find(x => x.key === k);
        return s + (pr ? pr.cost * v : 0);
      }, 0);

  // Cohort percentile: 0 credits → 50th percentile baseline; full budget →
  // top 1%. Non-linear so the first few allocations move things fast.
  let cohortText = 'Untouched · baseline cohort';
  if (used > 0) {
    const ratio  = Math.min(1, used / BUDGET_TOTAL);
    const top    = Math.max(1, Math.round(50 * Math.pow(1 - ratio, 1.6)));
    cohortText = `Projected: top ${top}% of birth cohort`;
  }
  cohortEl.textContent = cohortText;

  // Cost + access tier. Credits are treated as fictional $1,000 each so the
  // dollar figure feels real ('≈ $96K') while staying obviously hypothetical.
  const costEl   = $('#cost-est');
  const tierEl   = $('#access-tier');
  const usd      = used * 1000;
  // Cost line carries an explicit "speculative" anchor. Current real-world
  // baseline (IVF + PGD): ~$15–25K/cycle. Adult-mode credit pricing is a
  // future-forward extrapolation, not a present quote.
  if (costEl) costEl.textContent = used === 0
    ? '— (baseline cohort · current IVF+PGD: ~$15–25K/cycle)'
    : `≈ $${(usd / 1000).toFixed(0)}K · speculative future pricing (current IVF+PGD: ~$15–25K/cycle baseline)`;
  if (tierEl) {
    // Access-friction framing: waiting periods and eligibility conditions,
    // not class-quantified percentiles.
    let tier = 'Universal · baseline';
    if      (usd >= BUDGET_TIER_THRESHOLDS.outsideTreaty)   tier = 'Outside current treaty scope · authorization pending';
    else if (usd >= BUDGET_TIER_THRESHOLDS.restricted)      tier = 'Restricted · pre-authorization required · 14–22mo waitlist';
    else if (usd >= BUDGET_TIER_THRESHOLDS.referenceCentre) tier = 'Reference-centre only · 6mo review window · channel code RA-3';
    else if (usd >= BUDGET_TIER_THRESHOLDS.licensedClinic)  tier = 'Licensed-clinic only · 9–14mo waitlist · self-pay';
    else if (usd >       0) tier = 'Indication-restricted · HFEA-equivalent licensed clinics';
    tierEl.textContent = tier;
  }

  // Inheritance burden: weighted sum of spend across all heritable
  // priorities. Each priority's credits are scaled by how much it locks
  // identity / phenotype / affect into descendants (see weights above).
  const burdenCost = Object.entries(state.budget || {}).reduce((s, [k, v]) => {
    const pr = PRIORITIES.find(p => p.key === k);
    const w  = INHERITANCE_BURDEN_WEIGHTS[k] ?? 0.5;
    return s + (pr ? pr.cost * v * w : 0);
  }, 0);
  // Normalizer chosen so a mid-heavy allocation across high-weight packages
  // saturates the bar; a comparable spend on health-class packages does not.
  const pressure = Math.min(1, burdenCost / 90);
  if (pressureEl) pressureEl.style.width = (pressure * 100).toFixed(0) + '%';
  if (pressureNote) {
    // Notes describe what passes forward (Narrative R3) under World Design
    // R3's weighted heritable-burden math — disease-risk packages weight low,
    // identity/affect packages weight high. Pattern: severity · what passes
    // forward. R8 rev: at idle (no allocations) the Index now reads as
    // unset rather than "minimal" — previously the tier-0 copy implied a
    // pre-decided weight existed before any choice was made, which read as
    // semantic confusion. Once any allocation lands, the ethical-weight
    // line returns. Tier 3 still drops doom-speak and reports statistics.
    let note;
    if (burdenCost === 0) note = 'No allocations yet · the Index updates once you commit credits';
    else if (pressure <= 0.15) note = 'Minimal · few traits are pre-decided — but the choice is still made for them';
    else if (pressure <= 0.45) note = 'Modest · the genetic basis for a handful of traits is likely heritable; individual expression remains contingent on environment and development';
    else if (pressure <= 0.75) note = 'Substantial · the genetic basis for a defined trait profile is likely heritable across descendants; individual expression remains contingent on environment and development';
    else note = 'Saturated · the genetic basis for the trait profile is likely heritable across descendants; reversing the institutional and social conditions it creates is harder than reversing any single allele';
    pressureNote.textContent = note;
  }

  // R3 revision: at higher burden tiers, append a single line of
  // institutional voice that names the limit of compliance remedy —
  // procedural language (post-market review, registry enrolment,
  // disclosure schedules) manages risk to the institution; it does not
  // give the future subject a way to have consented. Polish: once any
  // allocation exists, also surface a one-line access-compounding
  // footnote under the Access Tier row (mechanism = uneven access stacked
  // across generations, not biological determinism).
  const projHost = $('#budget-projections');
  if (projHost) {
    let gapNote = projHost.querySelector('.consent-gap-note');
    if (pressure > 0.45) {
      if (!gapNote) { gapNote = document.createElement('p'); gapNote.className = 'consent-gap-note'; projHost.appendChild(gapNote); }
      gapNote.textContent = pressure > 0.75
        ? 'Footnote: at this burden tier, compliance language (post-market review, registry enrolment, disclosure schedules) manages institutional risk; it does not restore the future subject’s consent. No instrument in this stack can.'
        : 'Footnote: compliance language manages institutional risk; it does not restore the future subject’s consent.';
    } else if (gapNote) { gapNote.remove(); }
    let accessFoot = projHost.querySelector('.access-compound-foot');
    if (used >= 50) {
      if (!accessFoot) {
        accessFoot = document.createElement('p');
        accessFoot.className = 'access-compound-foot';
        accessFoot.textContent = localLabel('Footnote: inheritance compounds via access — cohorts able to allocate carry advantages forward; cohorts that cannot do not catch up by genetics alone.');
        const tierRow = projHost.querySelector('#access-tier');
        const anchor = tierRow ? tierRow.closest('.projection-row') : null;
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(accessFoot, anchor.nextSibling);
        else projHost.appendChild(accessFoot);
      }
    } else if (accessFoot) { accessFoot.remove(); }
  }

  renderRegulatoryNotes();
  renderRegionalAccess(used);
}

/* ---------- Adult: Regulatory Context notes ----------
 * Clinical disclosure-language notes that surface when the user's
 * enhancement allocation crosses thresholds. Drives the "this is
 * unsettling" beat by treating optimization like a real consumer
 * product with paperwork. */
function renderRegulatoryNotes() {
  const host = $('#regulatory-notes');
  if (!host) return;
  if (state.appMode !== 'adult') {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  const b = state.budget || {};
  const total = Object.entries(b).reduce((s, [k, v]) => {
    const pr = PRIORITIES.find(p => p.key === k);
    return s + (pr ? pr.cost * v : 0);
  }, 0);
  const matched = REGULATORY_NOTE_RULES.filter(rule => {
    try { return rule.when(b, total); } catch { return false; }
  });
  if (!total) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }
  if (!matched.length) {
    host.hidden = false;
    host.innerHTML = `
      <h3 class="reg-heading">${localLabel('Regulatory Context')}</h3>
      <p class="reg-empty">${localLabel('No disclosure thresholds crossed yet.')}</p>`;
    return;
  }
  host.hidden = false;
  host.innerHTML = `
    <h3 class="reg-heading">Regulatory Context <span class="reg-count">${matched.length}</span></h3>
    <ul class="reg-list">
      ${matched.map(m => `
        <li class="reg-note reg-${m.severity}">
          <span class="reg-dot" aria-hidden="true"></span>
          <span class="reg-text">${m.text}</span>
        </li>`).join('')}
    </ul>`;
}

/* ---------- Dynamic UI evolution ----------
 * `--opt-intensity` (0..1) is the page's "how hard is the user
 * optimizing" signal. Adult mode already used this for the clinical
 * desaturation effect; we now compute it universally from how far the
 * baby's personality sliders have drifted from the parents' midpoint,
 * plus any Adult budget allocation, and let a small layer of universal
 * CSS react across all modes.
 */
function updateOptIntensity() {
  // While a "preserve" override is active, the UI rewards the act of
  // preservation: opt-intensity is forced to 0 regardless of how wide
  // the resulting baby ended up being.
  if (state.preserveActive) {
    state.optIntensity = 0;
    document.body.style.setProperty('--opt-intensity', '0');
    return;
  }
  let driftI = 0;
  const a = state.parents?.A, b2 = state.parents?.B;
  if (state.codename && a && typeof a.openness === 'number' && b2 && typeof b2.openness === 'number') {
    const keys = ['openness','conscientiousness','extraversion','agreeableness','neuroticism'];
    let sum = 0;
    keys.forEach(k => {
      const mid = (a[k] + b2[k]) / 2;
      // Normalize: ±4.5 from midpoint is full drift on that axis.
      sum += Math.min(1, Math.abs((state.baby[k] || mid) - mid) / 4.5);
    });
    driftI = sum / keys.length;
  }
  let budgetI = 0;
  if (state.appMode === 'adult') {
    const used = Object.entries(state.budget || {}).reduce((s, [k, v]) => {
      const pr = PRIORITIES.find(x => x.key === k);
      return s + (pr ? pr.cost * v : 0);
    }, 0);
    budgetI = Math.min(1, used / BUDGET_TOTAL);
  }
  const intensity = Math.max(driftI, budgetI);
  state.optIntensity = intensity;
  document.body.style.setProperty('--opt-intensity', intensity.toFixed(3));
}

function flashWarming(durationMs = 3600) {
  const body = document.body;
  body.classList.add('is-warming');
  state.preserveActive = true;
  updateOptIntensity();
  clearTimeout(flashWarming._t);
  flashWarming._t = setTimeout(() => {
    body.classList.remove('is-warming');
    state.preserveActive = false;
    updateOptIntensity();
  }, durationMs);
}

function renderEnhancementBudget() {
  updateBudgetBar();
}

function buildHistorySection() {
  const content = $('#history-content');
  if (!content) return;
  const cards = state.appMode === 'adult' ? REGULATORY_CARDS : HISTORY_CARDS;
  // Per-card i18n: if a card carries an `i18n` map keyed by lang code, use the
  // localized title/body for the active language; otherwise fall back to the
  // card's default (English) fields. All HISTORY_CARDS and REGULATORY_CARDS
  // entries currently carry zh/ja/ko/tr translations.
  const lang = (state && state.language) ? state.language : 'en';
  content.innerHTML = cards.map(c => {
    const loc = (c.i18n && c.i18n[lang]) || {};
    return `
    <div class="history-card">
      <h3>${loc.title || c.title}</h3>
      <p>${loc.body || c.body}</p>
    </div>
  `;
  }).join('');
}

function setupHistoryToggle() {
  const btn = $('#history-toggle');
  const content = $('#history-content');
  if (!btn || !content) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    content.hidden = expanded;
    btn.classList.toggle('is-open', !expanded);
  });
}

function applyChaosPillLabel() {
  const btn = $('#chaos-btn');
  if (!btn) return;
  if (state.appMode === 'kids')        btn.textContent = '🃏 Wild Card';
  else if (state.appMode === 'adult')  btn.textContent = '◇ Divergence Model';
  else                                  btn.textContent = '✦ Wildcard Projection';
}

function setupAppModeToggle() {
  $$('.app-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const m = btn.dataset.appMode;
      if (!VALID_MODES.includes(m)) return;
      $$('.app-mode-btn').forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      state.appMode = m;
      persistAppMode(m);
      applyAppModeClass();
      applyChaosPillLabel();

      // History section copy depends on mode (REGULATORY_CARDS vs HISTORY_CARDS).
      buildHistorySection();
      if (m === 'reflection') showHumanityReminder();

      // Re-render so labels, copy pools, sliders, and stats all refresh.
      if (state.codename) {
        renderSliders(state.ranges);
        SLIDER_DEFS.forEach(def => {
          if (typeof state.baby[def.key] === 'number') {
            syncSliderDOMForOcean(def.key, state.baby[def.key]);
          }
        });
        const flavor = generateBabyFlavor(state.codename, state.baby);
        state.vibe        = flavor.vibe;
        state.futurePaths = flavor.paths;
        state.events      = flavor.events;
        state.headlines   = flavor.headlines;
        state.conflicts   = computeTraitConflicts(state.baby);
        state.reflection  = pickReflectionPrompt(state.codename);
        updateBabyPreview();
        renderEnhancementBudget();
        renderSocialResponse();
        renderDecisionLog();
      }
    });
  });

  // Reflect persisted mode in the UI.
  $$('.app-mode-btn').forEach(b => {
    const active = b.dataset.appMode === state.appMode;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

function init() {
  state.appMode = loadAppMode();
  applyAppModeClass();

  // i18n: hydrate language from localStorage, reflect in selector,
  // apply translations to the DOM, and listen for language changes.
  state.language = loadLanguage();
  const langSelect = $('#lang-select');
  if (langSelect) {
    langSelect.value = state.language;
    langSelect.addEventListener('change', () => {
      state.language = langSelect.value;
      persistLanguage(state.language);
      applyTranslations();
      // History cards carry per-card i18n maps — re-render so the active
      // language's translated title/body appears immediately.
      buildHistorySection();
      // Static surfaces built at init (parent forms, env panel) need
      // to be rebuilt so localLabel() picks up the active language.
      // Preserve their current values across the rebuild.
      const parentVals = collectParentData();
      const envVals    = (typeof collectEnvData === 'function') ? collectEnvData() : null;
      const parentsEl  = $('#parents');
      const envEl      = $('#env-grid');
      if (parentsEl) parentsEl.innerHTML = '';
      if (envEl)     envEl.innerHTML     = '';
      buildParentForms();
      buildEnvPanel();
      // Restore values
      ['A','B'].forEach(letter => {
        Object.entries(parentVals[letter] || {}).forEach(([k, v]) => {
          const el = $('#p' + letter + '_' + k);
          if (el) {
            el.value = v;
            const valEl = $('#p' + letter + '_' + k + '_val');
            if (valEl) valEl.textContent = String(v);
          }
        });
      });
      if (envVals) Object.entries(envVals).forEach(([k, v]) => {
        const el = $('#env_' + k);
        if (el) {
          el.value = v;
          const valEl = $('#env_' + k + '_val');
          if (valEl) valEl.textContent = String(v);
        }
      });
      // If sliders are showing, rebuild them too so trait labels swap.
      if (state.codename && state.ranges) {
        renderSliders(state.ranges);
        // Restore current slider values from state.baby.
        SLIDER_DEFS.forEach(def => {
          if (typeof state.baby[def.key] === 'number') {
            syncSliderDOMForOcean(def.key, state.baby[def.key]);
          }
        });
      }
      // Re-derive content that was picked from now-translated pools at
      // generate-time, using the same seeded RNG so the same INDEX
      // resolves to a localized string of the same poetic register.
      if (state.codename) {
        const flavor = generateBabyFlavor(state.codename, state.baby);
        state.vibe        = flavor.vibe;
        state.futurePaths = flavor.paths;
        state.events      = flavor.events;
        state.headlines   = flavor.headlines;
        state.reflection  = pickReflectionPrompt(state.codename);
        updateBabyPreview();
      }
      // Rebuild Adult-mode panels with localized labels — these were
      // initially rendered at startup in EN and don't auto-re-render
      // when language changes, leaving stale text behind.
      if (typeof buildEnhancementBudget === 'function') buildEnhancementBudget();
      // Invalidate any "once-rendered" caches so dependent panels can
      // re-render with the active language on next tick.
      ['consent-explainer', 'history-content'].forEach(id => {
        const el = document.getElementById(id);
        if (el) delete el.dataset.rendered;
      });
      if (typeof renderConsentExplainer === 'function') renderConsentExplainer();
      if (typeof renderRegulatoryNotes  === 'function') renderRegulatoryNotes();
      if (typeof renderRegionalAccess   === 'function') renderRegionalAccess();
      if (typeof renderCaseFile         === 'function') renderCaseFile();
      if (typeof renderSocietalBrief    === 'function') renderSocietalBrief();
      if (typeof renderTraitHistory     === 'function') renderTraitHistory();
      if (typeof renderInnerCohort      === 'function') renderInnerCohort();
      if (typeof renderLifetimeDrift    === 'function') renderLifetimeDrift();
      if (typeof renderKidsLoves        === 'function') renderKidsLoves();
      if (typeof renderKidsQuestions    === 'function') renderKidsQuestions();
      if (typeof renderKidsDifferences  === 'function') renderKidsDifferences();
      if (typeof renderHobbyConstellation === 'function' && state.baby) renderHobbyConstellation(state.baby);
    });
  }
  applyTranslations();

  buildParentForms();
  buildEnvPanel();
  buildEnhancementBudget();
  buildHistorySection();
  setupHistoryToggle();
  setupAppModeToggle();
  applyChaosPillLabel();
  setupPillToggle('.style-btn', 'style');
  setupPillToggle('.gender-btn', 'gender', () => applyGenderExpressionState());
  setupGenderExpression();
  setupChaosToggle();
  setupDetailsToggle();
  setupLanding();
  $('#randomize-parents-btn').addEventListener('click', randomizeParents);
  const divBtn = $('#diversify-defaults-btn');
  if (divBtn) divBtn.addEventListener('click', diversifyParentDefaults);
  $('#natural-variation-btn').addEventListener('click', preserveNaturalVariation);
  $('#generate-btn').addEventListener('click', generate);
  $('#randomize-btn').addEventListener('click', randomizeBaby);
  $('#reset-btn').addEventListener('click', resetBaby);
  $('#copy-btn').addEventListener('click', copyProfile);
  $('#save-btn').addEventListener('click', saveCurrentTimeline);
  $('#futures-btn').addEventListener('click', generateAdultFutures);
  $('#alternates-btn').addEventListener('click', generateAlternateTimelines);
  renderSavedList();
}

document.addEventListener('DOMContentLoaded', init);
