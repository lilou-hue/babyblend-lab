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
const FUTURE_PATHS = [
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
  // Conflict-tagged entries (Round 2): contradictions, not aphorisms. Systems
  // uses tags like OC-tension, EN-tension, CO-rigidity, AN-pleaser to surface
  // these when the matching pressure pattern is present in the baby.
  { text: 'Starts three projects to prove they\'re done with the last one; calls it "following the energy."', tag: 'OC-tension' },
  { text: 'Reorganizes the kitchen at midnight, then forgets where they put the cumin for a year.',  tag: 'OC-tension' },
  { text: 'Throws the dinner everyone loved, then avoids the thank-you texts for weeks; tells themselves they\'re "recharging."', tag: 'EN-tension' },
  { text: 'Becomes the friend who pulls people together, then disappears for two weeks to recover.',  tag: 'EN-tension' },
  { text: 'Plans meticulously to feel less anxious, then resents the plan for being too rigid; calls it "just being thorough."', tag: 'CO-rigidity' },
  { text: 'Keeps the same morning routine for a decade and resents the one week it has to change.',  tag: 'CO-rigidity' },
  { text: 'Says yes to favors they can\'t afford; tells themselves it\'s just this once, for a year.', tag: 'AN-pleaser' },
  { text: 'Covers for a coworker on one bad week, then for two years; insists they don\'t mind.',    tag: 'AN-pleaser' },
  // Resolution-trajectory beats (Round 4): how the contradiction lands over
  // time. Three modes per Psychology Reviewer — Integration (the two sides
  // learn to share the day), Acceptance (the oscillation stays, the
  // pretending stops), Damage (the mismatch takes something with it).
  // At least one per tag; range across modes so timelines don't always
  // resolve neatly.
  { text: 'Eventually keeps two notebooks: one for the projects they\'ll finish, one for the ones that are really moods.', tag: 'OC-tension' },                                  // Integration
  { text: 'By forty, runs the household on a system only they can read; partner has stopped asking for the logic and started budgeting one extra hour to find anything.', tag: 'OC-tension' },                                // Acceptance
  { text: 'Hosts the dinner, then the next one, then the next one; somewhere along the way learns that the thank-you texts are part of the meal, not the bill.', tag: 'EN-tension' }, // Integration
  { text: 'After the second burnout, stops hosting; keeps the long table in the garage for nine years before posting it to a neighbor for free.', tag: 'EN-tension' },                       // Damage
  { text: 'Learns to alternate: tight planning for the work that needs it, improvisation for the parts they want to enjoy; calls the second part "rest" without flinching.', tag: 'CO-rigidity' }, // Integration
  { text: 'At fifty, builds the calendar in tight blocks and the weekends in deliberate blanks; the blanks still cost an apology to whoever wanted to fill them.', tag: 'CO-rigidity' },          // Acceptance
  { text: 'After one bad year of saying yes to everything, learns to say "let me think about it" — and means it; the friendships that survive are the patient ones.', tag: 'AN-pleaser' }, // Integration
  { text: 'Spends a decade covering for everyone; in their forties wakes up tired in a way sleep doesn\'t fix, and slowly, quietly, starts to disappoint people on purpose.', tag: 'AN-pleaser' }, // Damage
  // Round 4 revision: additional damage/maturation beats. One per tag, lived specificity.
  { text: 'At thirty-seven, finishes a project nobody asked for and nobody wants; keeps the binder anyway, on the high shelf, and refers to it twice a year.', tag: 'OC-tension' }, // Maturation
  { text: 'In their fifties hosts one Sunday a month, eight people, same start time; on the other Sundays does not answer the phone, and the eight people learn the rule.', tag: 'EN-tension' }, // Maturation
  { text: 'Changes the morning routine for a partner who needs the kitchen by 7; resents it for a year, then stops noticing, then forgets the old routine existed.', tag: 'CO-rigidity' }, // Maturation
  { text: 'Says yes to one favor too many in their late twenties; carries the cost for years, and only afterwards learns that the friend never expected the yes in the first place.', tag: 'AN-pleaser' } // Damage
];

// Specific small life-events. Grounded register — these read like things a
// real person carries forward, not internet jokes.
const RANDOM_EVENTS = [
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
];

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
    "The most interesting version of this child is probably the one you didn't plan for.",
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
    '这孩子最有意思的那个版本,多半是你没规划过的那一个。',
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
    'この子のいちばん面白いバージョンは、おそらくあなたが計画しなかったほうです。',
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
    '이 아이의 가장 흥미로운 판본은, 아마도 당신이 계획하지 않은 쪽일 겁니다.',
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
    'Bu çocuğun en ilginç versiyonu, muhtemelen planlamadığın versiyondur.',
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
  { key: 'work',    label: 'At work',                       icon: '⌬', pool: [
    'Slightly more composed than they really are.',
    'Carries a notebook they only sometimes use.',
    'Arrives a few minutes early to most things.',
    'Closer to one colleague than the others, without naming it.',
    'Holds a low-key opinion they have never voiced in a meeting.',
    'Eats lunch the same way for years.',
    'Says "no problem" more than they intend to.',
    'Quiet when the room is loud; thoughtful when it isn\'t.'
  ]},
  { key: 'family',  label: 'With their family of origin',   icon: '⎈', pool: [
    'Becomes younger again, gradually, every time they visit.',
    'Speaks a private sibling language only the family follows.',
    'Loses an argument they could have won.',
    'Eats food they would not order in a restaurant.',
    'Defers in ways their friends would not recognize.',
    'Smiles at a joke they have heard fifty times.',
    'Sleeps in a room that has not changed in twenty years.',
    'Notices their parent has gotten older only in passing.'
  ]},
  { key: 'late',    label: 'Alone at 2am',                  icon: '☾', pool: [
    'Re-reads the same paragraph in a book.',
    'Replays a 2008 song from a memory they thought they had lost.',
    'Opens the fridge without intending to eat.',
    'Composes a text they will not send.',
    'Decides something quietly that will reshape next year.',
    'Lets a single thought spiral and then forgives themselves for it.',
    'Notices the wallpaper.',
    'Hears a sound and decides it is nothing.'
  ]},
  { key: 'beloved', label: 'With someone they love',        icon: '☉', pool: [
    'Becomes someone slightly luminous.',
    'Forgives faster than they would for anyone else.',
    'Confuses their own preferences with the other person\'s.',
    'Says things they would not write down.',
    'Laughs at something only the two of them find funny.',
    'Is more tired and less guarded.',
    'Carries the other person\'s small habits home with them.',
    'Hears their own voice get a little softer.'
  ]}
];

/* ---------- Reflection: Lifetime Drift ("Same person, different decades") ----------
 * Adult's Historical Drift says: the targets shift across eras. Lifetime
 * Drift says: the person shifts across their own life. Same person, four
 * snapshots, four different people. Picked deterministically per codename. */
const LIFETIME_DRIFT = {
  ages: [
    { label: 'At 7',  pool: [
      'Collects something specific that nobody understands.',
      'Has a recurring dream they do not mention.',
      'Treats one stuffed animal as a person.',
      'Defends a friend who is being teased.',
      'Will lie about something small for years.',
      'Has a favorite word they say aloud just to hear it.',
      'Is convinced of one thing that is not true.'
    ]},
    { label: 'At 17', pool: [
      'Argues with a parent about something neither will remember in a decade.',
      'Has a friendship that feels too intense to last — and will not.',
      'Writes things down they would die if anyone read.',
      'Disappoints a teacher they admire.',
      'Falls in love with an idea before a person.',
      'Believes their own future is already obvious.',
      'Stays up late for something that will feel small at 27.'
    ]},
    { label: 'At 35', pool: [
      'Has not given up on a project that is mostly finished.',
      'Lives within driving distance of one parent.',
      'Sleeps better some weeks than others.',
      'Has stopped trying to like a certain food.',
      'Quietly maintains a friendship through monthly texts.',
      'Knows what they are afraid of and works around it.',
      'Owns one piece of furniture they bought too young.'
    ]},
    { label: 'At 70', pool: [
      'Tells a story about being 11 that may be partly invented.',
      'Has outlived at least one person they expected to grow old with.',
      'Notices birds.',
      'Holds a small grudge that no longer matters.',
      'Surprises themselves with what they remember.',
      'Has changed their mind about something they were certain of at 30.',
      'Speaks to a grandchild about something nobody else knows.'
    ]}
  ]
};

const HUMANITY_REMINDERS = [
  'Humans are more than predicted traits.',
  'A person cannot be fully reduced to data.',
  'Perfection is culturally defined.',
  'Unexpected traits often become strengths.',
  'Personality traits show roughly 40-50% heritability; most variation traces to lived experience.',
  'Diversity isn\'t a glitch — it\'s the feature.',
  'A trait\'s value depends on who, when, and where.',
  'Strengths and weaknesses are the same thing in different rooms.',
  'Whoever this child becomes, they get the last word — not us.',
  'A simulator cannot anticipate a single real Tuesday afternoon.'
];

const NATURAL_VARIATION_MESSAGES = [
  'Human diversity preserved.',
  'Unpredictability is part of humanity.',
  'Not every trait needs improvement.',
  'Difference is information, not error.',
  'Nature did not consult the optimization handbook.'
];

/* ---------- News Headlines ---------- */

// Local-news flavor — quiet civic things. Less viral-internet, more "the
// kind of paragraph you find on page 6 of a small-town paper".
const NEWS_HEADLINES = [
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
];

/* ---------- Trait Conflicts (framed as tradeoffs, not flaws) ---------- */

const TRAIT_CONFLICTS = [
  {
    when: b => b.openness >= 8 && b.conscientiousness <= 4,
    tag: 'Chaotic experimentation likely',
    note: 'Big imagination, light scaffolding — many starts, fewer finishes. Sometimes the start was the point.'
  },
  {
    when: b => b.conscientiousness >= 8 && b.neuroticism >= 7,
    tag: 'Care that runs hot',
    note: 'Detail-oriented and easily worried. May need rest rituals more than most.'
  },
  {
    when: b => b.openness >= 8 && b.extraversion <= 3,
    tag: 'Rich inner world, narrow social orbit',
    note: 'Vivid private universe. Possibly few people who fully see it; that\'s okay.'
  },
  {
    when: b => b.agreeableness >= 8 && b.extraversion <= 3,
    tag: 'Gentle introvert',
    note: 'Cares deeply, in small circles. Often overlooked by louder rooms — and underestimated.'
  },
  {
    when: b => b.extraversion >= 8 && b.neuroticism >= 7,
    tag: 'Outwardly bright, inwardly stormy',
    note: 'Energy that performs may exhaust the performer. The crowd doesn\'t see the comedown.'
  },
  {
    when: b => b.athletic >= 8 && b.conscientiousness <= 3,
    tag: 'High energy, low rails',
    note: 'Will outrun structure. Needs an outlet, not a leash.'
  },
  {
    when: b => b.openness >= 8 && b.agreeableness <= 3,
    tag: 'Iconoclast tendencies',
    note: 'Will question loudly. Builds new rooms; sometimes upsets the old ones.'
  },
  {
    when: b => b.conscientiousness <= 3 && b.neuroticism <= 3,
    tag: 'Cheerfully disorganized',
    note: 'Not worried, also not planning. Lives are also lived this way; not less, just differently.'
  },
  {
    when: b => b.agreeableness >= 8 && b.neuroticism <= 3,
    tag: 'Steady kindness',
    note: 'Calm under pressure, kind by default. The kind of person other people want to be near.'
  },
  {
    when: b => b.extraversion <= 3 && b.openness >= 8 && b.conscientiousness >= 7,
    tag: 'Quiet builder',
    note: 'Will make something interesting alone. Will not advertise it. World finds out later, or never.'
  }
];

/* ---------- Adult Futures (one fictional life per card) ---------- */

const ADULT_FUTURES = [
  { headline: 'Marine biologist who names every octopus.',                            details: ['Has a complicated relationship with one specific anglerfish.', 'Wears the same hoodie to every conference for 11 years.', 'Holds a personal record: longest time spent at one tide pool.'], tags: ['education'] },
  { headline: 'Exhausted but beloved startup founder.',                              details: ['Pitched a productivity app while half-asleep on a flight.', 'Has strong opinions about chairs.', 'Will eventually pivot to artisan pickles.'], tags: ['economy'] },
  { headline: 'Art teacher who somehow knows every kid in town.',                    details: ['Carries glitter in their pocket "for emergencies."', 'Once made a 20-foot papier-mâché whale during summer break.', 'Has 14 framed crayon portraits.'], tags: ['family'] },
  { headline: 'Conspiracy podcaster — but the wholesome kind.',                       details: ['Sincerely believes the moon is fine, actually.', 'Has guests on to debunk their own hosts.', 'Discovered, on episode 87, they are the conspiracy.'], tags: ['internet'] },
  { headline: 'Astronaut who keeps a tiny indoor garden in orbit.',                   details: ['Has cried over a successful sprout. Twice.', 'Brings one (1) absurd snack on every mission.', 'Now answers questions in 3 languages.'], tags: ['education', 'multilingual'] },
  { headline: 'Indie musician with one cult-favorite song.',                          details: ['Plays venues with exactly 47 people in them.', 'Their song is on a movie\'s closing credits no one watched.', 'Refuses to explain the lyrics. Lyrics are about pasta.'], tags: ['internet'] },
  { headline: 'Chaotic internet celebrity (mostly accidental).',                      details: ['Went viral for explaining tax code while baking bread.', 'Owns four cameras and one ring light.', 'Has a calendar app that just says "vibes only."'], tags: ['internet'] },
  { headline: 'High-school physics teacher of legend.',                                details: ['Has demonstrated centripetal force using a frozen turkey.', 'Refers to gravity as "her old friend."', 'Several students will go on to thank them by name.'], tags: ['education'] },
  { headline: 'Animal shelter director who knows every dog\'s name.',                 details: ['Sleeps with at least one (1) cat per night.', 'Once convinced a city council to adopt a goose.', 'Cries at every adoption — staff has stopped asking.'], tags: ['family'] },
  { headline: 'Mid-list novelist who finally finishes the trilogy.',                  details: ['Argued with their editor about commas for 4 years.', 'Has 11 unfinished drafts in a desk drawer.', 'One reader writes them every Christmas.'], tags: ['education'] },
  { headline: 'Civic-organizer who fixes one impossible street.',                     details: ['Knows every neighbor by their grocery routine.', 'Has a binder. Several binders. Color-coded.', 'Will become a low-key local legend.'], tags: ['family'] },
  { headline: 'Bartender / amateur philosopher / good listener.',                     details: ['Remembers every regular\'s order and their mother\'s birthday.', 'Has a side hustle reading tarot at brunch.', 'Once accidentally married two strangers via toast.'], tags: ['social'] },
  { headline: 'Software engineer who maintains one cursed open-source tool.',         details: ['Tool is depended on by 600 companies.', 'Lives on hobby farm. Has chickens named after data structures.', 'Reviews pull requests in dry one-liners.'], tags: ['economy'] },
  { headline: 'Roving sourdough evangelist.',                                          details: ['Travels with a starter named after a 19th-century philosopher.', 'Has converted three former rivals.', 'Bakes are 80% delicious, 20% lessons.'], tags: ['urbanRural'] },
  { headline: 'Volunteer firefighter and small-town historian.',                      details: ['Has rescued one (1) cat. The cat owes them.', 'Writes the town\'s newsletter. It is unexpectedly funny.', 'Knows where every cornerstone is buried.'], tags: ['urbanRural', 'family'] },
  { headline: 'Translator-by-day, sci-fi-writer-by-night.',                           details: ['Has translated 5 languages, invented 2 more.', 'Their pseudonym has its own fans.', 'Tea consumption: industrial.'], tags: ['multilingual'] },
  { headline: 'Pediatrician who lets every kid name a fictional dinosaur.',           details: ['Office wallpaper is the resulting list.', 'Has been on a sticker shortage watchlist twice.', 'Knows when to refer out and when to wait.'], tags: ['healthcare'] },
  { headline: 'Park ranger fluent in stars.',                                          details: ['Runs once-a-month "look up" nights for the town.', 'Speaks softly to bears. Has reasons.', 'Carries a beat-up copy of Annie Dillard everywhere.'], tags: ['urbanRural', 'education'] },
  { headline: 'Logistics savant at a mid-sized warehouse.',                            details: ['Reorganized the loading bay; saved 40 minutes a day.', 'Knows the entire crew\'s coffee orders.', 'Plays the harmonica on lunch breaks.'], tags: ['economy'] },
  { headline: 'Therapist who keeps a "patience plant" by the window.',                details: ['Refuses to keep a clock visible.', 'Has cried, professionally, only twice.', 'Reads three novels at once.'], tags: ['healthcare', 'family'] },
  { headline: 'Mediocre-but-cherished community-theater director.',                   details: ['Cast a chicken once. The chicken got a callback.', 'Has saved every program from every show.', 'Friends with the lighting tech for life.'], tags: ['social'] },
  { headline: 'Cooperative-board member of a tiny grocery.',                          details: ['Argues for the bulk-grains section in every meeting.', 'Knows which two members are secretly dating.', 'Bakes for every neighbor on their birthday.'], tags: ['urbanRural'] },
  { headline: 'Aerospace technician with a side career in jazz piano.',               details: ['Plays a smoky lounge twice a month.', 'Has solved one truly puzzling shuttle malfunction.', 'Wears the same lucky watch to both jobs.'], tags: ['education'] },
  { headline: 'Local linguist who documents an endangered dialect.',                   details: ['Records elders over kitchen tables; their files are precious.', 'Has been adopted, informally, by three families.', 'Is writing a dictionary by hand.'], tags: ['multilingual', 'family'] },
  { headline: 'Bookstore owner running a wildly specific genre section.',             details: ['Genre section: "novels with one (1) lighthouse."', 'Hosts an unbearably charming monthly reading.', 'Has a cat named after a literary theorist.'], tags: ['urbanRural'] },
  { headline: 'Climate-policy wonk who actually changes one law.',                    details: ['Spent 11 years on the same comma.', 'Reads regulatory PDFs for pleasure.', 'Hosts excellent dinner parties for very tired colleagues.'], tags: ['education', 'social'] }
];

/* ---------- Adult-mode pools (clinical, grounded) ---------- */

const ADULT_FUTURES_CLINICAL = [
  { headline: 'Physician with chronic burnout.',                                   details: ['Works in a competitive teaching hospital.', 'Has not taken a full vacation in six years.', 'Considering a career pivot to research.'], tags: ['healthcare','education'] },
  { headline: 'Startup founder, unstable work-life balance.',                       details: ['Series B raised; sleep schedule largely theoretical.', 'Lost two close friendships during product launches.', 'Now invests quietly in mental-health platforms.'], tags: ['economy','education'] },
  { headline: 'Former competitive athlete; identity recalibration.',                 details: ['Retired at 31 after a knee injury.', 'Coaches a youth program in their hometown.', 'Adjusting to a smaller public profile.'], tags: ['urbanRural','social'] },
  { headline: 'Multilingual diplomat.',                                              details: ['Posted to two regions over the last decade.', 'Lives out of suitcases six months a year.', 'Maintains correspondence with former colleagues across four time zones.'], tags: ['multilingual','education'] },
  { headline: 'Independent artist with financial instability.',                      details: ['Sells consistently; rarely at sustainable prices.', 'Maintains a teaching side income.', 'Reports being content with the trade.'], tags: ['social','urbanRural'] },
  { headline: 'Research scientist; social isolation tendencies.',                    details: ['Lead author on three significant papers.', 'Most active social ties are online.', 'Maintains a small, close in-person circle.'], tags: ['education'] },
  { headline: 'Public-defender attorney.',                                           details: ['Above-average caseload.', 'Strong reputation with clients; modest compensation.', 'Has begun mentoring junior attorneys.'], tags: ['family','social'] },
  { headline: 'Veterinarian, small-animal practice.',                                details: ['Practice partners with a wildlife rescue.', 'Actively manages compassion fatigue.', 'Three cats and one unexpected hen.'], tags: ['family','healthcare'] },
  { headline: 'Senior software engineer, mid-career plateau.',                       details: ['Senior IC at a stable mid-size firm.', 'Has declined three management offers.', 'Maintains an open-source library used in global production.'], tags: ['economy'] },
  { headline: 'Architect, adaptive-reuse projects.',                                 details: ['Portfolio is mostly former industrial sites.', 'Lectures occasionally at a public university.', 'Avoids social media; reachable by email.'], tags: ['urbanRural','education'] },
  { headline: 'Nurse practitioner, rural clinic.',                                   details: ['Covers two adjacent counties.', 'Has trained four community-health workers.', 'Considering a federal grant application.'], tags: ['healthcare','urbanRural'] },
  { headline: 'Civil engineer, transit infrastructure.',                              details: ['Working on a multi-decade light-rail project.', 'Pragmatic politically; rigorous technically.', 'Has not enjoyed a public hearing yet.'], tags: ['urbanRural','economy'] },
  { headline: 'Career changer: finance to teaching.',                                details: ['Took a 60% pay cut at 38.', 'Teaches high-school economics.', 'Reports the trade was correct.'], tags: ['education','economy'] },
  { headline: 'Wildlife biologist, coastal monitoring.',                              details: ['Two seasons a year on remote stations.', 'Maintains a long-distance relationship.', 'Publishes annually; reads constantly.'], tags: ['education','urbanRural'] },
  { headline: 'Therapist, private practice.',                                        details: ['Specializes in early-career professionals.', 'Practices in a major metropolitan area.', 'Deliberately limits weekly caseload.'], tags: ['healthcare','urbanRural'] },
  { headline: 'Process engineer, second-generation.',                                 details: ['Works at the same plant their parent did.', 'Leads a small continuous-improvement team.', 'Has helped avert plant closure twice.'], tags: ['family','economy'] },
  { headline: 'Charge nurse, neonatal ICU.',                                         details: ['Sixteen years on the unit.', 'Quietly central to staff retention.', 'Knows when to push policy and when to wait.'], tags: ['healthcare'] },
  { headline: 'Mid-list author with steady readership.',                              details: ['Two books a year; no breakout.', 'Co-owns a small bookstore.', 'Has declined two adaptation offers.'], tags: ['education'] },
  { headline: 'Civic technology lead.',                                              details: ['Builds software for state agencies.', 'Frustrated weekly; effective monthly.', 'Has shipped services used by hundreds of thousands.'], tags: ['economy','social'] },
  { headline: 'Restaurateur, single location.',                                      details: ['Eight years stable; never expanded.', 'Suppliers are personal relationships.', 'Closes for two weeks in August without public explanation.'], tags: ['urbanRural','family'] }
];

// Behavioral trace notes — small, specific human details that read as
// "leakage" inside the clinical Adult system. Expanded from the previous
// 20-item ADULT_MICRODETAILS to ~40 entries spanning relationships,
// routines, regrets, quiet attachments.
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
    'Late in life, becomes a person their younger self would have liked.'
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
    '晚年终于活成了年轻时的自己会喜欢的那种人。'
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
    '晩年になって、若いころの自分が好きになるような人物に、ようやくなる。'
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
    '말년이 되어서야, 어린 시절의 자신이 좋아했을 만한 사람이 된다.'
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
    'Yaşlanınca, genç hâlinin sevebileceği türden bir insana dönüşüyor.'
  ]
};

// Reflection mode: poetic and observational. Read more like fragments of
// a profile than data points.
const REFLECTION_TRACES = {
  en: [
    "Calls their parents during grocery shopping, when there's nothing in particular to say.",
    "Keeps old receipts inside the books they've read.",
    'Remembers one embarrassing middle-school moment forever.',
    'Has a song they only listen to alone in cars.',
    'Texts their best friend the same one-liner every birthday.',
    'Wears one piece of clothing they wore at 16 deep into their thirties.',
    "Walks the same route home, even when there's a shorter one.",
    "Cries reliably at one specific kind of film they wouldn't name in public.",
    'Has a name for the colour of a particular afternoon sky.',
    'Keeps the last birthday card their grandmother sent.',
    'Becomes friends with the corner-shop owner without quite meaning to.',
    'Holds two contradictory beliefs about themselves at all times.',
    "Knows the date their first pet died, but not the date they got a driver's licence.",
    "Hums a song their mother hummed; doesn't know it's her song.",
    "Has a recurring dream about a hallway they've never seen awake.",
    'Apologises to inanimate objects when they bump into them.',
    "Keeps a folded paper in their wallet with handwriting that isn't theirs.",
    "Avoids one specific street in their hometown for reasons they don't articulate.",
    "Owns a photograph of someone they're no longer in touch with, framed.",
    'Saves the last voicemail from a parent for years before listening again.',
    'Cooks the same Sunday meal as their grandmother, without realising.',
    'Keeps a note app full of sentences they overheard on trains.',
    'Has a small kind of bravery no one in their family sees.',
    'Carries the smell of their childhood home in one particular sweater.',
    "Returns to the same beach every five years; doesn't plan it.",
    "Keeps a friend's number even after the friendship quietly ends.",
    'Will tell their child a story they were told once, almost word for word.',
    'Has one piece of music that means something different every decade.',
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
    '总会对着某一类电影准时落泪,却羞于在外人面前说起。',
    '心里给某一种下午天空的颜色起过名字。',
    '保留着祖母寄来的最后一张生日卡。',
    '不知不觉地,和街角小店老板成了朋友。',
    '关于自己,始终怀着两种自相矛盾的看法。',
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
    '有一支音乐,每过十年含义就不一样。',
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
    'ある特定の種類の映画で必ず泣くが、人前では話さない。',
    'ある午後の空の色に、自分だけの名前をつけている。',
    '祖母から最後に届いた誕生日カードを取っておく。',
    'いつのまにか、角の店の主人と友達になっている。',
    '自分について、矛盾する二つの考えを同時に抱いている。',
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
    '十年ごとに違う意味になる、一つの音楽を持っている。',
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
    '어떤 종류의 영화 앞에선 어김없이 운다. 다만 그 사실을 남에게 말하지 않는다.',
    '어느 오후 하늘의 빛깔에, 자기만의 이름을 붙여 두었다.',
    '할머니가 보낸 마지막 생일 카드를 간직하고 있다.',
    '딱히 그럴 생각도 없이, 동네 가게 주인과 친구가 되어 있다.',
    '자신에 대해 늘 모순되는 두 가지 믿음을 동시에 품고 있다.',
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
    '한 곡의 음악이 있어, 십 년마다 의미가 달라진다.',
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
    'Belli bir tür filmde mutlaka ağlar; ama bunu yabancıların yanında söylemez.',
    'Belirli bir öğleden sonra gökyüzü rengine kendi adını koymuştur.',
    'Büyükannesinin yolladığı son doğum günü kartını saklamaktadır.',
    'Pek de istemeden, köşedeki dükkân sahibiyle arkadaş olur.',
    'Kendi hakkında her zaman iki çelişkili inancı birden taşır.',
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
    'Her on yılda bir başka anlama gelen tek bir müzik parçası vardır.',
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
const KIDS_HOBBIES = [
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
];

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
    'A garden, kept badly, loved deeply.',
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
    '照料得不算好,却深爱着的一座花园。',
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
    'うまくは育てられなかったが、深く愛していた庭。',
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
    '잘 가꾸지는 못했지만 깊이 사랑했던 정원.',
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
    'Pek de iyi bakılamamış ama derinden sevilen bir bahçe.',
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
      'Enters formal schooling; academic strengths and challenges emerging.',
      'Peer-group identification forming; friendships gain weight against family.',
      'Three or four candidate identities tried on before adolescence settles.',
      'High school identity solidifying; adult interests beginning to clarify.',
      'First experiences of independent decision-making and its consequences.',
      'Romantic and social self gaining definition through trial and feedback.',
      'Early career signals appearing through chosen courses and side pursuits.'
    ],
    zh: [
      '进入正规学校教育;学业上的强项与挑战开始显现。',
      '同伴群体认同正在形成;友谊在家庭之外逐渐获得分量。',
      '青春期稳定下来之前,会尝试三到四种候选的身份。',
      '高中阶段身份逐步固化;成年期的兴趣开始变得清晰。',
      '第一次体会到独立做决定及其后果。',
      '通过尝试与反馈,恋爱与社交自我逐渐成型。',
      '通过所选课程与副业,早期职业信号开始出现。'
    ],
    ja: [
      '正規教育に入る。学業上の強みと課題が現れ始める。',
      '仲間集団への帰属意識が形成され、友情の比重が家庭に対して相対的に増す。',
      '思春期が落ち着くまでに、三つか四つの候補となる自己像を試す。',
      '高校期にかけて自己像が固まり、大人としての関心が見え始める。',
      '独立した意思決定と、その結果を初めて体験する。',
      '試行とフィードバックを通じて、恋愛・社会的自己像が定義されていく。',
      '選択する科目や副次的活動から、初期のキャリア信号が現れる。'
    ],
    ko: [
      '정규 교육 과정에 진입; 학업적 강점과 어려움이 드러나기 시작함.',
      '또래 집단에 대한 정체감이 형성되며, 가족 대비 우정의 비중이 커짐.',
      '청소년기가 안정되기 전, 세 가지에서 네 가지의 후보 정체성을 시도해 봄.',
      '고등학교 시기 자아 정체성이 굳어지고, 성인기의 관심사가 명료해지기 시작.',
      '독립적인 의사 결정과 그 결과를 처음 경험함.',
      '시도와 피드백을 통해 연애 및 사회적 자아가 윤곽을 잡아 감.',
      '선택한 교과와 부수적 활동을 통해 초기 진로 신호가 나타남.'
    ],
    tr: [
      'Örgün eğitime başlıyor; akademik güçlü yanlar ve zorluklar belirginleşiyor.',
      'Akran grubuyla özdeşim oluşuyor; arkadaşlıklar aileye karşı ağırlık kazanıyor.',
      'Ergenlik yerine oturmadan önce üç veya dört aday kimlik denenir.',
      'Lise dönemi kimliği netleşiyor; yetişkin ilgi alanları belirginleşmeye başlıyor.',
      'Bağımsız karar verme ve sonuçlarının ilk deneyimleri yaşanıyor.',
      'Deneme ve geri bildirim yoluyla romantik ve sosyal benlik biçimleniyor.',
      'Seçilen derslerden ve yan uğraşlardan erken kariyer sinyalleri görünüyor.'
    ]
  },
  later: {
    en: [
      'Adult personality largely stable; growth continues at slower pace.',
      'A working life takes shape — whether as a settled career, a string of held-together jobs, or a path that had to be rebuilt mid-stride.',
      'Long-term relationships and chosen family settle into recognizable shape.',
      'Health and energy patterns shifting; routines accommodate the change.',
      'Affective range often narrows somewhat with age, alongside more equanimity.',
      'Reflection on choices made and not made becomes more frequent.',
      'Whether or not children arrive, the next generation enters their orbit.',
      'Caregiving for an aging parent, a sibling, or a partner interrupts the projected arc; identity reorganizes around who needs them.',
      'A late bloom: the thing they are known for, by themselves and others, arrives after most peers assumed the shape was set.',
      'Economic precarity persists into this decade for a non-trivial share of cohorts; stability is not evenly distributed.'
    ],
    // LOOP_REQUEST(translator): zh/ja/ko/tr `later` pools still universalize
    // mid-career stability. Carry the EN additions (precarity, caregiving
    // interruption, late bloom, the softened opening line) into the other
    // four languages with the same matter-of-fact register.
    zh: [
      '成年人格大体稳定;成长仍在继续,但节奏放缓。',
      '职业生涯中段已经成型;自己的优势与极限,自己都已熟知。',
      '长期关系与所选择的家庭,呈现出可识别的稳定形态。',
      '健康与精力的模式正在改变;日常生活习惯随之做出调整。',
      '随着年龄增长,情绪幅度往往会收窄一些,与之同时,心境也更平稳。',
      '对那些做过与未做的选择,反思变得更频繁。',
      '无论是否有自己的孩子,下一代都已进入他/她的生活轨道。'
    ],
    ja: [
      '成人後のパーソナリティはおおむね安定。成長は続くが、ペースは緩やかになる。',
      'キャリアの中盤の軌道が定まり、自分の強みと限界をともによく分かっている。',
      '長期の人間関係と「選んだ家族」が、見分けのつく形に落ち着く。',
      '健康とエネルギーのパターンが変化し、日々の習慣もそれに合わせて変わる。',
      '感情の幅は年齢とともにやや狭まる一方で、心の落ち着きは増す。',
      'した選択、しなかった選択について振り返ることが多くなる。',
      '自分の子の有無にかかわらず、次の世代が生活圏に入ってくる。'
    ],
    ko: [
      '성인기 인격은 대체로 안정되어 있고, 성장은 더 느린 속도로 이어진다.',
      '경력의 중반이 자리를 잡고, 자신의 강점과 한계 모두 스스로에게 충분히 익숙해진다.',
      '장기 관계와 스스로 택한 가족의 형태가, 알아볼 수 있는 모습으로 자리 잡는다.',
      '건강과 활력의 양상이 변하고, 일상 습관이 그 변화에 맞춰 조정된다.',
      '감정의 폭은 나이와 함께 다소 좁아지고, 동시에 평정심은 더 커진다.',
      '한 선택과 하지 않은 선택에 대한 성찰이 점점 더 자주 일어난다.',
      '자녀의 유무와 상관없이, 다음 세대가 생활권 안으로 들어온다.'
    ],
    tr: [
      'Yetişkin kişilik büyük ölçüde sabit; gelişim daha yavaş bir hızda sürer.',
      'Kariyer ortası ekseni yerine oturmuştur; güçlü yanlar da sınırlar da kişi tarafından iyi bilinir.',
      'Uzun süreli ilişkiler ve seçilmiş aile, tanınır bir biçime kavuşur.',
      'Sağlık ve enerji örüntüleri değişiyor; rutinler bu değişime uyum sağlıyor.',
      'Duygusal yelpaze yaşla birlikte sıklıkla biraz daralırken, dinginlik artar.',
      'Yapılmış ve yapılmamış seçimler üzerinde düşünmek giderek sıklaşır.',
      'Çocuklar olsun ya da olmasın, sonraki kuşak onun yörüngesine girer.'
    ]
  }
};

function ageBucket(age) {
  if (age < 13) return 'early';
  if (age < 30) return 'mid';
  return 'later';
}

const CLINICAL_REMINDERS = [
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
];

const TRAIT_CONFLICTS_CLINICAL = [
  { when: b => b.openness >= 8 && b.conscientiousness <= 4,
    tag: 'Initiation-completion gap likely',
    note: 'High exploratory drive paired with low structural tendency. Project completion rates statistically lower.' },
  { when: b => b.conscientiousness >= 8 && b.neuroticism >= 7,
    tag: 'Burnout risk: elevated',
    note: 'High conscientiousness with elevated neuroticism. Stress accumulation likely without active recovery practices.' },
  { when: b => b.openness >= 8 && b.extraversion <= 3,
    tag: 'High internal cognition, low social signaling',
    note: 'Significant private creative output; visibility-dependent careers underperform expectations.' },
  { when: b => b.agreeableness >= 8 && b.extraversion <= 3,
    tag: 'Low advocacy for self-interest',
    note: 'Cooperation prioritized over visibility. Career compensation tends to lag peer benchmarks.' },
  { when: b => b.extraversion >= 8 && b.neuroticism >= 7,
    tag: 'Sociability with elevated reactivity',
    note: 'High external engagement combined with stress sensitivity. Recovery time post-event statistically higher.' },
  { when: b => b.athletic >= 8 && b.conscientiousness <= 3,
    tag: 'High activation, low structure',
    note: 'Physical capacity exceeds organizational tendency. Outcomes depend heavily on external scaffolding.' },
  { when: b => b.openness >= 8 && b.agreeableness <= 3,
    tag: 'Disruptive cognition profile',
    note: 'High novelty-seeking with low affiliative tendency. Conflict frequency above baseline.' },
  { when: b => b.conscientiousness <= 3 && b.neuroticism <= 3,
    tag: 'Low concern, low structure',
    note: 'Outcomes show high variance. Stable in mood; unpredictable in trajectory.' },
  { when: b => b.agreeableness >= 8 && b.neuroticism <= 3,
    tag: 'Stable affiliative profile',
    note: 'Below-baseline interpersonal friction. Caregiving roles correlate.' },
  { when: b => b.extraversion <= 3 && b.openness >= 8 && b.conscientiousness >= 7,
    tag: 'Independent execution profile',
    note: 'High self-directed output; low public signal. Discovery by external observers tends to be delayed.' }
];

const REGULATORY_CARDS = [
  { title: 'Regulatory landscape.',             body: 'Genome editing oversight varies by jurisdiction. The EU, UK, US, and several Asian regulators hold non-aligned positions on heritable modifications.' },
  { title: 'Historical precedent.',             body: 'Early-20th-century state programs grounded in claimed scientific authority resulted in significant documented harm. The underlying scientific basis was later widely rejected.' },
  { title: 'Access and equity modeling.',       body: 'Distribution modeling consistently projects uneven access across socioeconomic lines.' },
  { title: 'Phenotype vs. behavior confidence.', body: 'Confidence in physical-trait prediction substantially exceeds confidence in behavioral or cognitive outcome prediction.' },
  { title: 'Cultural variability of targets.',  body: 'Trait desirability shows significant variation across regions and historical periods. Optimization targets are not culturally stable.' },
  { title: 'Long-horizon outcome data.',         body: 'Multi-decade follow-up studies on early-modified cohorts do not yet exist at scale.' },
  {
    title: 'Burden ≠ heritability.',
    body: 'The Inheritance Burden Index measures how widely an allocation\'s effects propagate into descendants — not how heritable a trait is, and not whether the allocation is "less wrong". Every heritable choice removes consent equally. Low-weighted classes (like health) shift with environment; high-weighted classes (identity, affect) lock in across generations.',
    i18n: {
      zh: {
        title: '负担 ≠ 遗传率。',
        body: '遗传负担指数衡量的是一个分配在后代中影响传播的广度——而不是某个性状的遗传率有多高，也不是该分配是否"罪轻一些"。任何可遗传的选择都同等地剥夺了同意权。低权重的类别（如健康）会随环境而变化；高权重的类别（身份、情感）则会在世代间锁定。'
      },
      ja: {
        title: '負担 ≠ 遺伝率。',
        body: '遺伝負担指数が測るのは、ある選択の影響が子孫にどれだけ広く波及するかであって、形質の遺伝率の高さでも、その選択が「まだましかどうか」でもありません。遺伝に関わる選択は、どれも等しく同意を奪います。低重み付けの領域（健康など）は環境とともに揺らぎますが、高重み付けの領域（アイデンティティ、情動）は世代を越えて固定されます。'
      },
      ko: {
        title: '부담 ≠ 유전율.',
        body: '유전 부담 지수가 측정하는 것은 어떤 선택의 영향이 후손에게 얼마나 널리 전파되는가이지, 형질의 유전율이 얼마나 높은지도, 그 선택이 "덜 잘못된" 것인지도 아닙니다. 유전 가능한 선택은 모두 동등하게 동의를 박탈합니다. 가중치가 낮은 영역(건강 등)은 환경에 따라 달라지지만, 가중치가 높은 영역(정체성, 정동)은 세대에 걸쳐 고착됩니다.'
      },
      tr: {
        title: 'Yük ≠ kalıtsallık.',
        body: 'Kalıtsal Yük Endeksi, bir seçimin etkilerinin torunlara ne kadar geniş biçimde yayıldığını ölçer — bir özelliğin ne kadar kalıtsal olduğunu ya da seçimin "daha az yanlış" olup olmadığını değil. Kalıtsal olan her seçim rızayı eşit ölçüde elinden alır. Düşük ağırlıklı sınıflar (sağlık gibi) çevreyle birlikte değişir; yüksek ağırlıklı sınıflar (kimlik, duygulanım) kuşaklar boyunca yerleşir.'
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
  { key: 'health',       label: 'Health',               cost: 4, tier: 'Standard',     bias: { neuroticism: -0.3 },                          tradeoff: 'Disease-risk reduction (limited heritability for many conditions).' },
  { key: 'cognition',    label: 'Cognition',            cost: 8, tier: 'Premium',      bias: { openness: 0.6, conscientiousness: 0.4 },      tradeoff: 'Higher academic-load expectations. Burnout risk elevated.' },
  { key: 'emotional',    label: 'Emotional Stability',  cost: 7, tier: 'Experimental', bias: { neuroticism: -0.7 },                          tradeoff: 'Reduced emotional sensitivity may follow.' },
  { key: 'creativity',   label: 'Creativity',           cost: 5, tier: 'Standard',     bias: { openness: 0.5 },                              tradeoff: 'Increased novelty-seeking; structural follow-through variable.' },
  { key: 'athleticism',  label: 'Athleticism',          cost: 4, tier: 'Standard',     bias: { athletic: 0.7 },                              tradeoff: 'Identity attachment to performance later in life.' },
  { key: 'appearance',   label: 'Appearance',           cost: 3, tier: 'Entry',        bias: {},                                              tradeoff: 'Appearance-based social attention above baseline.' },
  { key: 'sociability',  label: 'Sociability',          cost: 5, tier: 'Standard',     bias: { extraversion: 0.6 },                          tradeoff: 'Elevated overstimulation risk in dense social contexts.' },
  { key: 'resilience',   label: 'Resilience',           cost: 6, tier: 'Premium',      bias: { neuroticism: -0.5, conscientiousness: 0.2 },  tradeoff: 'Tolerance for adversity may delay help-seeking.' },
  { key: 'empathy',      label: 'Empathy',              cost: 5, tier: 'Standard',     bias: { agreeableness: 0.6 },                         tradeoff: 'Empathic load may exceed individual capacity.' }
];
const BUDGET_TOTAL = 200;

// Regulatory Context rules — each fires when its predicate matches the
// current budget state. Surfaced in Adult mode as small clinical notes
// inside the Enhancement Allocation panel. Phrased in the register of
// a near-future regulatory disclosure UI.
const REGULATORY_NOTE_RULES = [
  {
    // Fires on the first non-zero enhancement allocation. Reconciles the
    // institutional voice with `renderRegionalAccess` by citing a real
    // instrument (Oviedo Art. 13, Recital 6) instead of narrating the
    // structural-disadvantage externality. Stays single-line and dry.
    id: 'first-allocation',
    when: (b, total) => total > 0,
    severity: 'amber',
    text: 'Per Oviedo Convention Art. 13 (Recital 6): heritable allocation creates a non-reversible advantage in the descendant line; unallocated cohorts retain no equivalent remedy.'
  },
  {
    id: 'GE-3-cognition',
    when: b => (b.cognition || 0) >= 5,
    severity: 'amber',
    text: 'HFEA 2008 Schedule 2: cognitive enhancement outside standard licensed purposes. Annual reporting to the licensing authority and disclosure to admissions authorities required in transposing jurisdictions.'
  },
  {
    id: 'GE-3-cognition-high',
    when: b => (b.cognition || 0) >= 9,
    severity: 'red',
    text: 'HFEA 1990/2008 s.3(2) prohibits placing a non-permitted embryo in a woman; allocation at this band falls outside any Schedule 2 licensed activity. Enrolment in a long-term outcome registry would be a condition of any exceptional authorization.'
  },
  {
    id: 'EM-stability',
    when: b => (b.emotional || 0) >= 6,
    severity: 'amber',
    text: 'HFEA 2008 Schedule 2 para. 3 (treatment licences): affective-band intervention outside standard licensed purposes. Periodic reporting to the licensing authority would be a condition of any special-direction grant.'
  },
  {
    id: 'RES-resilience-elevated',
    when: b => (b.resilience || 0) >= 7,
    severity: 'amber',
    text: 'Resilience profile above population norm. Insurer notification required at enrolment; some carriers exclude this profile from depression-care coverage.'
  },
  {
    id: 'APP-appearance',
    when: b => (b.appearance || 0) >= 6,
    severity: 'amber',
    text: 'Appearance-package allocation in upper quartile. Cosmetic-modification disclosure required on identity documents in 7 jurisdictions.'
  },
  {
    id: 'ATH-athleticism',
    when: b => (b.athleticism || 0) >= 7,
    severity: 'amber',
    text: 'Athletic-enhancement profile would be ineligible for sanctioned youth competition in the IOC Aligned Federation framework.'
  },
  {
    id: 'multi-category',
    when: b => Object.values(b).filter(v => v >= 4).length >= 3,
    severity: 'red',
    text: 'Multi-category package spanning three or more domains. Subject auto-enrolled in long-term outcome follow-up as a condition of HFEA-equivalent licensing. Opt-out window: 30 days from authorization.'
  },
  {
    id: 'total-spend-high',
    when: (b, total) => total >= BUDGET_TOTAL * 0.7,
    severity: 'red',
    text: 'Aggregate allocation ≥ 70% of platform budget. Cosmetic-modification disclosure required on identity documents in all Oviedo signatory jurisdictions (Art. 13, transposed instruments).'
  },
  {
    id: 'empathy-low',
    when: b => (b.empathy || 0) >= 6 && (b.cognition || 0) >= 6,
    severity: 'amber',
    text: 'High empathy + high cognition allocation: documented elevated burnout risk in adolescent and early-adult cohorts. Carer mental-health monitoring advised.'
  }
];

/* ---------- Consent framing (Adult mode, near Enhancement Allocation) ---------- */

// Lead paragraph (Education + World Design): the canonical "why this is a consent
// question" copy, front-loaded with the future person rather than the institution.
const CONSENT_EXPLAINER = 'The person these allocations are for does not yet exist. Heritable modifications are decided before they are born — so they cannot consent, and they cannot opt out later. Parents make many decisions for children; heritable edits differ in one respect: they are written into the biology and passed forward. Medical-ethics frameworks and the Council of Europe Oviedo Convention (Article 13) treat heritable choices as a distinct consent class from somatic or environmental ones.';

// Structured rows (World Design + Narrative): grounded prose, fixed cite, Access row.
const CONSENT_IMPLICATIONS = [
  { label: 'Subject', body: 'The modified individual is, by definition, absent from this interface. Every allocation is a decision made on behalf of someone who does not yet exist and cannot be consulted.' },
  { label: 'Heritability', body: 'Anyone born from a heritable edit inherits the choice. Their children inherit it too, and so on. The decision made in this session reaches forward into people who are not here to weigh in.' },
  { label: 'Reversibility', body: 'Heritable edits cannot be taken back. A future person who would not have agreed has no way to undo or escape what was chosen for them.' },
  { label: 'Standard of care', body: 'Institutional ethics frameworks (Oviedo Convention, Article 13 on heritable modifications; UNESCO International Bioethics Committee 2015 Report on the Human Genome) require informed consent of the affected party. That standard is structurally unmet here.' },
  { label: 'Access', body: 'These modifications arrive unevenly. Wealth predicts access; future populations inherit that distributional imbalance alongside the edits themselves.' }
];

/* ---------- History of Human Enhancement (educational cards) ---------- */

const HISTORY_CARDS = [
  { title: 'Eugenics, briefly.',                  body: 'Early-20th-century movements claimed scientific authority over which humans were "fit." It justified forced sterilizations and worse. The science was wrong. The harm was real.' },
  { title: 'Cosmetic surgery culture.',           body: 'Modern cosmetic surgery normalizes the idea that bodies can be edited to match shifting beauty standards. The standards change every decade or two; the bodies that chased them often don\'t change back.' },
  { title: 'Gene editing today.',                 body: 'CRISPR can edit DNA in a Petri dish or a person. Where the line falls — diseases? height? mood? — is something we\'re answering as a species, mostly without asking it out loud.' },
  { title: 'Access is the harder question.',     body: 'Even if "designer babies" worked, they\'d almost certainly arrive unevenly. The wealthy modify; everyone else inherits. A new axis of inequality stacked on the old ones.' },
  { title: 'Inheritance compounds.',              body: 'Enhancements available only to wealthy families become inherited advantages. The next generation inherits both the edit and the access to make further edits — so inequality compounds through who can choose, generation after generation, not through anything biology requires.' },
  { title: 'Who measures "improvement"?',        body: 'Traits cast as flaws in one era (sensitivity, atypical minds, certain bodies) are cast as strengths in another. The measurer changes; the trait doesn\'t.' },
  { title: 'Genes ≠ destiny.',                    body: 'Twin studies put Big Five personality traits at roughly 40–50% heritable (Polderman et al., 2015, meta-analyzed ~17,800 traits). Most of the rest tracks non-shared environment — the unique experiences, peer groups, and accidents that even identical twins don\'t share. Shared family environment explains less of adult personality than people expect.' },
  { title: 'Heritability is not "fixed in you".', body: 'A heritability of 50% means about half the variation between people in a population traces to genetic differences. It does not mean half of any one person\'s trait is genetic, and it does not mean the trait is unchangeable. Heritability estimates also shift with context: height is ~80% heritable when everyone is well-fed, much less in populations where childhood nutrition varies. This simulator applies a simplified additive-polygenic model — real personality genetics involve gene-by-environment interactions this can\'t show.' },
  { title: 'Heritable vs. somatic edits.',        body: 'A somatic edit changes one body. A heritable (germline) edit changes an egg or embryo — so it carries into every cell of the resulting person, and into their children. The Oviedo Convention restricts genome edits to preventive, diagnostic, or therapeutic purposes (Article 13); that purpose-test is where the legal line falls.' },
  { title: 'There is no "gene for" a trait.',     body: 'Common-language genetics talks about "the gene for height" or "the gene for happiness". Almost no complex human trait works that way. Height alone is shaped by thousands of variants of tiny effect (Yengo et al., 2022 — ~12,000 independent variants identified). Personality, intelligence, and most disease risks are polygenic in the same way: many small contributions, not one switch. That is why this simulator shows a single slider per trait — but a slider in real biology would not map to a gene a clinic could "set". Polygenic scores predict population-level distributions, not individual outcomes.' }
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
  curiosity:  'Two quiet parents can still have a wildly curious kid. People surprise us!',
  kindness:   'Kindness can be taught and grow over time — it\'s a habit, not just a trait.',
  energy:     'Some kids are loud at home and shy at school, or the other way around.',
  focus:      'Focus grows with age, sleep, practice, and finding something that feels exciting.',
  confidence: 'Confidence changes a LOT as people grow up. Bumpy days are normal.'
};

// Soft framing for the Kids-mode futures block — injected once per generation
// above the future-tree by the render path (see #future-block handling).
const KIDS_FUTURES_PREAMBLE = "These are just stories of *possible* lives. Your real one might be completely different — and that's what makes it exciting.";

// One-line, dry framing appended to the popover on the 5 OCEAN-mapped Kids
// sliders (curiosity/kindness/energy/focus/confidence). Explains WHY their
// confidence bands are wider than the physical sliders': gene-environment
// interaction means heritability for personality is roughly 0.4–0.5.
// Surfaced through buildExplainerHTML for any kidsKey in KIDS_TRAIT_VIEW.
const KIDS_OCEAN_TOOLTIP = "Personality is shaped more by life experience, friendships, and luck than by genes alone. Genes matter, but they're roughly half the story.";

const KIDS_FUTURE_PATHS = [
  { text: 'Might love building things.',                            tag: 'O' },
  { text: 'Could become really good at storytelling.',              tag: 'O' },
  { text: 'May enjoy helping other people.',                        tag: 'A' },
  { text: 'Probably asks a LOT of questions.',                      tag: 'O' },
  { text: 'Could change interests many times — and that\'s okay.',  tag: 'O' },
  { text: 'Might love drawing, painting, or making things up.',     tag: 'O' },
  { text: 'May enjoy solving puzzles or codes.',                    tag: 'C' },
  { text: 'Could be great at organizing — even their own snacks.',  tag: 'C' },
  { text: 'Might love making detailed plans for tiny adventures.',  tag: 'C' },
  { text: 'Probably remembers tiny details no one else notices.',   tag: 'C' },
  { text: 'May light up around new people and new places.',         tag: 'E' },
  { text: 'Could be the kid who knows everyone\'s name.',           tag: 'E' },
  { text: 'Might lead games on the playground.',                    tag: 'E' },
  { text: 'May love performing — songs, plays, magic tricks.',      tag: 'E' },
  { text: 'Probably gives the best hugs.',                          tag: 'A' },
  { text: 'May befriend every animal they meet.',                   tag: 'A' },
  { text: 'Could be the family peacemaker.',                        tag: 'A' },
  { text: 'Might give surprisingly wise advice for their age.',     tag: 'A' },
  { text: 'May have a big imagination world full of characters.',   tag: 'N' },
  { text: 'Could love writing stories or making up songs.',         tag: 'N' },
  { text: 'Probably feels things deeply — that\'s a strength.',     tag: 'N' },
  { text: 'May love sports, running, or jumping off things.',       tag: 'athletic' },
  { text: 'Could be unbeatable at hide-and-seek.',                  tag: 'athletic' },
  { text: 'Might be the kid who climbs everything.',                tag: 'athletic' },
  { text: 'May love dancing or moving to music.',                   tag: 'athletic' },
  { text: 'Could become a great teacher one day.',                  tag: 'A' },
  { text: 'Might be obsessed with one specific topic for years.',   tag: 'O' },
  { text: 'Probably collects something unusual — rocks, leaves, stickers.', tag: 'O' },
  { text: 'May invent games no one else understands.',              tag: 'O' },
  { text: 'Could be the family\'s designated joke-teller.',         tag: 'E' }
];

const KIDS_RANDOM_EVENTS = [
  'Future rock collector. Watch the pockets.',
  'Will probably adopt too many pets.',
  'Keeps random objects \"just in case.\"',
  'Might learn to whistle before they learn to tie shoes.',
  'May have a favorite blanket for years (and that\'s okay).',
  'Could speak a secret language with a sibling or friend.',
  'Probably names every stuffed animal they own.',
  'Will go through a dinosaur phase. It is destiny.',
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
  'Will photograph clouds and name every one.',
  'May write secret notes in invisible ink (lemon juice).',
  'Could host the world\'s smallest tea party (for stuffed animals).',
  'Probably loves a particular cozy hoodie until it falls apart.'
];

const KIDS_NEWS_HEADLINES = [
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
];

const KIDS_TRAIT_CONFLICTS = [
  {
    when: b => b.openness >= 8 && b.conscientiousness <= 4,
    tag: 'Lots of ideas, sometimes scattered',
    note: 'Loves starting new things. Finishing can be harder. That\'s okay — many small starts are also wins.'
  },
  {
    when: b => b.conscientiousness >= 8 && b.neuroticism >= 7,
    tag: 'A careful, sometimes worried kid',
    note: 'Pays attention to details, and sometimes worries about getting things right. Lots of calm time helps.'
  },
  {
    when: b => b.openness >= 8 && b.extraversion <= 3,
    tag: 'A big imagination, in a quieter space',
    note: 'Has a rich world inside their head. They might share it with one or two close friends.'
  },
  {
    when: b => b.agreeableness >= 8 && b.extraversion <= 3,
    tag: 'A gentle, thoughtful friend',
    note: 'Kind in small groups. People who get to know them feel lucky.'
  },
  {
    when: b => b.extraversion >= 8 && b.neuroticism >= 7,
    tag: 'Sparkles in public, recharges in private',
    note: 'Loves being around people. Also needs quiet time afterwards to refill.'
  },
  {
    when: b => b.athletic >= 8 && b.conscientiousness <= 3,
    tag: 'Lots of energy, lots of motion',
    note: 'Needs space to run, jump, climb. Structure helps channel all that joy.'
  },
  {
    when: b => b.openness >= 8 && b.agreeableness <= 3,
    tag: 'A questioner who likes to challenge ideas',
    note: 'Will ask \"why?\" a lot. May respectfully disagree with grown-ups.'
  },
  {
    when: b => b.conscientiousness <= 3 && b.neuroticism <= 3,
    tag: 'Sunny and a little wiggly',
    note: 'Cheerful and easygoing. Routines help — and that\'s okay to need.'
  },
  {
    when: b => b.agreeableness >= 8 && b.neuroticism <= 3,
    tag: 'Steady kindness',
    note: 'Calm and warm. The kind of kid friends naturally gather around.'
  },
  {
    when: b => b.extraversion <= 3 && b.openness >= 8 && b.conscientiousness >= 7,
    tag: 'A quiet maker',
    note: 'Likes making things on their own. Often happiest with their own little project.'
  }
];

const KIDS_ADULT_FUTURES = [
  { headline: 'Maybe a teacher who really listens.',          details: ['Knows every student\'s name on day one.', 'Keeps a treasure box of student art.', 'Always has chalk dust on at least one sleeve.'], tags: ['family','education'] },
  { headline: 'Maybe a veterinarian for tiny animals.',        details: ['Has rescued at least two birds.', 'Talks to dogs in a special soothing voice.', 'Owns one very dramatic cat.'], tags: ['family','healthcare'] },
  { headline: 'Maybe a builder of cool things.',               details: ['Carries a small notebook for ideas everywhere.', 'Has rebuilt their own bookshelf three times.', 'Loves the smell of fresh wood.'], tags: ['education'] },
  { headline: 'Maybe an artist who makes happy work.',          details: ['Paints something almost every day.', 'Friends always have art on their walls.', 'Tea consumption: cozy.'], tags: ['social','urbanRural'] },
  { headline: 'Maybe a scientist asking giant questions.',      details: ['Reads about space before bed.', 'Has a notebook full of \"why?\" questions.', 'Owns three kinds of magnifying glass.'], tags: ['education'] },
  { headline: 'Maybe a gardener with the greenest yard around.', details: ['Knows every plant in the neighborhood.', 'Trades tomato seeds with friends.', 'Hums while watering.'], tags: ['urbanRural','family'] },
  { headline: 'Maybe a chef who feeds the whole street.',       details: ['Sundays smell like fresh bread.', 'Has a notebook full of family recipes.', 'Friends drop by hoping for leftovers.'], tags: ['family'] },
  { headline: 'Maybe a doctor who is great with kids.',         details: ['Has a sticker for every check-up.', 'Tells gentle jokes during scary moments.', 'Office is decorated with crayon drawings.'], tags: ['healthcare','family'] },
  { headline: 'Maybe an inventor of small clever gadgets.',     details: ['Has built three useful tools that don\'t exist anywhere else.', 'Tinkers in a sunny corner.', 'Friends bring them tricky problems.'], tags: ['education','economy'] },
  { headline: 'Maybe a librarian who knows every story.',       details: ['Reads to little kids every Saturday.', 'Has a list of \"underrated\" books.', 'Smells faintly of old paper, in the best way.'], tags: ['education','urbanRural'] },
  { headline: 'Maybe an animal trainer at a sanctuary.',        details: ['Speaks softly to bigger animals.', 'Knows every dog at the local park by name.', 'Has at least one rescue story to tell.'], tags: ['family','urbanRural'] },
  { headline: 'Maybe a writer of charming little books.',       details: ['Writes by hand in tiny journals.', 'Posts gentle stories online.', 'Friends quote their books on birthdays.'], tags: ['education','social'] },
  { headline: 'Maybe an athlete who also coaches younger kids.', details: ['Wakes up early for practice, smiles anyway.', 'Buys orange slices for the team.', 'Cheers loudest from the sidelines.'], tags: ['urbanRural','family'] },
  { headline: 'Maybe a musician who makes everyone want to dance.', details: ['Plays at neighborhood parties.', 'Writes one song a month.', 'Has at least two instruments hanging on a wall.'], tags: ['social'] },
  { headline: 'Maybe an explorer of wild places.',              details: ['Goes camping in every season.', 'Photographs every interesting bird.', 'Writes postcards from each trip.'], tags: ['urbanRural','education'] },
  { headline: 'Maybe a designer of fun new games.',             details: ['Has invented a card game with 12 rules.', 'Playtests on a circle of patient friends.', 'Always carries a deck of cards.'], tags: ['education','social'] },
  { headline: 'Maybe a translator helping people understand each other.', details: ['Speaks two languages by college.', 'Has pen pals on three continents.', 'Owns a shelf of dictionaries.'], tags: ['multilingual','education'] },
  { headline: 'Maybe a maker of beautiful clothes.',            details: ['Sews most of what they wear.', 'Sells small batches at local markets.', 'Has saved every fabric scrap since age 10.'], tags: ['social','urbanRural'] },
  { headline: 'Maybe a counselor who helps people feel okay.',  details: ['Listens really well.', 'Keeps fresh flowers in the office.', 'Knows when to say something — and when to wait.'], tags: ['healthcare','family'] },
  { headline: 'Maybe a baker famous for one specific cookie.',  details: ['The recipe is a kind of secret.', 'Donates extras to the local school.', 'Apron is older than them.'], tags: ['family','urbanRural'] },
  { headline: 'Maybe an astronomer who throws stargazing nights.', details: ['Owns the friendliest telescope in town.', 'Knows the names of dozens of stars.', 'Brings hot cocoa to every event.'], tags: ['education','urbanRural'] },
  { headline: 'Maybe an architect designing tree-friendly schools.', details: ['Sketches buildings on napkins.', 'Loves natural light.', 'Has a treehouse phase that lasts decades.'], tags: ['education','urbanRural'] },
  { headline: 'Maybe an organizer who brings the neighborhood together.', details: ['Plans block parties.', 'Knows everyone\'s grocery routine.', 'Has a binder of community ideas.'], tags: ['family','social'] }
];

const KIDS_REFLECTION_PROMPTS = [
  'Should parents choose everything about a child?',
  'What makes people unique?',
  'Would the world be boring if everyone were the same?',
  'What\'s something special about YOU that surprised your family?',
  'If you could give every kid in the world one thing, what would it be?',
  'Can two best friends be very different from each other? Why?'
];

const KIDS_HUMANITY_REMINDERS = [
  'People grow and change in ways no one can predict.',
  'Everyone has something amazing inside them.',
  'Diversity makes the world more interesting.',
  'You are more than your traits — you are a whole story.'
];

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
  d.open = state.appMode !== 'adult';
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
  // Budget panel: always visible in Adult mode; locked until first generation.
  if (panel) {
    panel.hidden = !isAdult;
    const interactionReady = isAdult && gen >= 1;
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
      notice.textContent = 'Baseline projection required before optimization packages unlock.';
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
        <button type="button" class="parent-randomize-btn" data-parent="${letter}" aria-label="Randomize Parent ${letter}" title="Randomize Parent ${letter}">↻</button>
      </div>`;
    // Advanced-traits disclosure: OCEAN sliders fold into a per-parent
    // <details> so the default view shows appearance-only inputs.
    // Label "Temperament dials" — speculative-lab register: warm enough for
    // Kids/Reflection, dry enough for Adult, no clinical jargon.
    const advanced = document.createElement('details');
    advanced.className = 'parent-advanced';
    advanced.dataset.parent = letter;
    advanced.innerHTML = `<summary class="parent-advanced-summary">Temperament dials</summary>`;
    const advancedBody = document.createElement('div');
    advancedBody.className = 'parent-advanced-body';
    advanced.appendChild(advancedBody);
    const appearance = document.createElement('details');
    appearance.className = 'parent-appearance';
    appearance.dataset.parent = letter;
    appearance.open = !window.matchMedia('(max-width: 720px)').matches;
    appearance.innerHTML = `<summary class="parent-appearance-summary">Visible traits</summary>`;
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
          const lbl = (f.optionLabels && f.optionLabels[o]) || titleCase(o);
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
      // Polygenic-flavored: child ≈ midparent + Gaussian(σ_eff), ~50% heritability.
      // Slider range ≈ midparent ± 2σ_eff (~95% interval).
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
      // 0.06 keeps the effect modest: at max disparity sigma widens ~60%.
      // For OCEAN, disparityFrac is forced to 0 so σ_eff = σ_base.
      const sigmaEff = Math.sqrt(def.sigma * def.sigma + 0.06 * disparityFrac * disparityFrac * span * span);
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
  const text = KIDS_EXPLAINERS[key];
  if (!text || !isKids()) return '';
  // For the 5 OCEAN-mapped Kids sliders, append the gene-environment
  // one-liner so users see WHY personality bands are speculative.
  const isOceanKidsKey = KIDS_TRAIT_VIEW.some(v => v.kidsKey === key);
  const body = isOceanKidsKey
    ? `${text} <span class="slider-popover-aside">${KIDS_OCEAN_TOOLTIP}</span>`
    : text;
  return `
    <button type="button" class="slider-explain" aria-expanded="false"
            data-target="exp_${key}" title="How does this work?">?</button>
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
  input.addEventListener('input', () => {
    const v = Number(input.value);
    state.baby[view.oceanKey] = view.invert ? (11 - v) : v;
    updateBandMarker(view.kidsKey, v, displayR);
    updateBabyPreview();
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
      preamble.textContent = KIDS_FUTURES_PREAMBLE;
    } else if (preamble) {
      preamble.remove();
    }
  }

  // Societal Outcomes Brief + divergence + history + sibling cohort (Adult)
  renderSocialResponse();
  renderDivergence();
  renderTraitHistory();
  renderSiblingCohort();

  // Reflection-mode arc: same person, different rooms / decades.
  renderInnerCohort();
  renderLifetimeDrift();

  // Trait conflicts (tradeoff chips). In Adult mode after Gen 1, prepend a
  // one-line consent-awareness note — the early beat of the two-beat
  // consent rhythm. Round 3 (narrative): chosen line lands as a quiet
  // spatial note rather than an ethical claim. The note cross-fades OUT
  // once consentAck flips true so the same screen-space hands off to the
  // micro-ack / progress hint.
  //   alt-A: 'These allocations will be carried by someone not yet present to weigh in on them.'
  //   alt-B: 'Whatever balance you choose here will be lived in by someone with no vote in the matter.'
  const conflictsEl = $('#trait-conflicts');
  if (conflictsEl) {
    const showAwareness = (state.appMode === 'adult' && (state.generateCount || 0) >= 1 && !state.consentAck);
    const awarenessHtml = showAwareness
      ? `<p class="consent-awareness-note">The person this concerns is not in the room — and will inherit whichever balance you settle on.</p>`
      : '';
    if (state.conflicts && state.conflicts.length) {
      conflictsEl.hidden = false;
      conflictsEl.innerHTML = `
        ${awarenessHtml}
        <h3>Trait tradeoffs</h3>
        <div class="conflict-chips">
          ${state.conflicts.map(c => `
            <div class="conflict-chip" title="${c.note}">
              <span class="conflict-tag">${c.tag}</span>
              <span class="conflict-note">${c.note}</span>
            </div>`).join('')}
        </div>`;
    } else if (awarenessHtml) {
      conflictsEl.hidden = false;
      conflictsEl.innerHTML = awarenessHtml;
    } else {
      conflictsEl.hidden = true;
      conflictsEl.innerHTML = '';
    }
  }

  // Small italic reflection prompt — used only in Kids mode now (gentle).
  // Reflection mode gets the richer Pause panel instead.
  const reflEl = $('#reflection-prompt');
  if (reflEl) {
    if (isKids() && state.codename) {
      reflEl.hidden = false;
      reflEl.innerHTML = `<span class="reflection-mark">?</span> ${state.reflection || pickReflectionPrompt(state.codename)}`;
    } else {
      reflEl.hidden = true;
    }
  }

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
    <div class="case-row"><span class="case-label">Simulation Codename</span><span class="case-value">${state.codename}</span></div>
    <div class="case-row"><span class="case-label">Cohort</span><span class="case-value">ENH-2042</span></div>
    <div class="case-row"><span class="case-label">Profile</span><span class="case-value">v${profileV}</span></div>
    <div class="case-row"><span class="case-label">Generated</span><span class="case-value">${tsStr}</span></div>
    <div class="case-row"><span class="case-label">Optimization Intensity</span><span class="case-value case-tier">${tier}</span></div>
    <div class="case-row"><span class="case-label">Disclosure</span><span class="case-value">${disclosure}</span></div>
  `;
}

function renderPausePanel() {
  const panel = $('#pause-panel');
  if (!panel) return;
  if (state.appMode !== 'reflection' || !state.codename) {
    panel.hidden = true;
    return;
  }
  panel.hidden = false;

  const rng = seededRand(state.codename + '|pause');
  const obs = pickN(localList(REFLECTION_OBSERVATIONS), 2, rng);
  const cant = pickN(localList(CANNOT_MEASURE), 4, rng);
  const question = state.reflection || pickReflectionPrompt(state.codename);

  $('#pause-observations').innerHTML = obs.map(o => `<li>${o}</li>`).join('');
  $('#pause-cant-see').innerHTML     = cant.map(c => `<li>${c}</li>`).join('');
  $('#pause-question').innerHTML     = `<span class="pause-q-mark">?</span> ${question}`;
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
  const scored = KIDS_HOBBIES.map(h => ({
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

  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="hobby-constellation-svg" role="img" aria-label="Predicted hobbies">
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
  host.innerHTML = `
    <h3 class="memory-heading">Memory snapshots</h3>
    <div class="memory-strip">
      <article class="memory-card" data-stage="7">
        <span class="memory-age">At 7</span>
        <p class="memory-text">${m7}</p>
      </article>
      <article class="memory-card" data-stage="17">
        <span class="memory-age">At 17</span>
        <p class="memory-text">${m17}</p>
      </article>
      <article class="memory-card" data-stage="47">
        <span class="memory-age">At 47</span>
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
  { age: 7,  label: 'At 7'  },
  { age: 17, label: 'At 17' },
  { age: 47, label: 'At 47' }
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
    heading.textContent =
      state.appMode === 'adult' ? 'Trajectory Snapshots'
      : state.appMode === 'kids' ? 'Future portraits'
      : 'Across the years';
  }
  strip.innerHTML = LIFE_STAGES.map(s => {
    const svg = buildAvatarSvg(b, state.style, state.gender, state.codename + '|age' + s.age);
    return `<figure class="life-stage" data-age="${s.age}">
      <div class="life-stage-avatar">${svg}</div>
      <figcaption class="life-stage-label">${s.label}</figcaption>
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
    <svg viewBox="0 0 ${W} ${H}" class="lineage-svg" role="img" aria-label="Three-generation lineage">
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

  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="future-tree-svg" role="img" aria-label="Branching future paths">${svg}</svg>`;
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

  host.innerHTML = `<svg viewBox="0 0 240 240" class="constellation-svg" role="img" aria-label="Personality trait constellation"><g class="bg-stars">${bg}</g><g class="links">${links}</g><g class="nodes">${nodes}</g></svg>`;
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
    return '<div class="avatar-error">Avatar failed to load</div>';
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
  grid.innerHTML = state.futures.map(f => `
    <article class="future-card">
      <h3 class="future-headline">${f.headline}</h3>
      <ul class="future-details">
        ${f.details.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </article>`).join('');
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
const TRAIT_CONFLICT_RULES = [
  { key: 'OC-tension',  when: b => (b.openness        || 0) >= 8 && (b.conscientiousness || 0) <= 4, tag: 'OC-tension'  },
  { key: 'EN-tension',  when: b => (b.extraversion    || 0) >= 8 && (b.neuroticism       || 0) >= 7, tag: 'EN-tension'  },
  { key: 'CO-rigidity', when: b => (b.conscientiousness || 0) >= 8 && (b.openness        || 0) <= 4, tag: 'CO-rigidity' },
  { key: 'AN-pleaser',  when: b => (b.agreeableness   || 0) >= 8 && (b.neuroticism       || 0) >= 7, tag: 'AN-pleaser'  }
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
    const details = reserved.concat(remaining);
    return { vibe: '', paths: details, events: [], headlines: [] };
  }

  // FUNNY_TITLES entries may be plain strings or tagged objects ({text, tag}).
  // Paradox entries (last 6 in each language) carry conflict tags. When any
  // conflict is active, AVOID conflict-tagged vibes that name the same
  // contradiction — the conflict FUTURE_PATHS already carry the friction, so a
  // matching vibe reads as coping-as-coherence (quirk instead of tension).
  // When no conflict is active, sample uniformly over the whole list.
  const vibes = localList(FUNNY_TITLES);
  const vibePool = conflictTags.length
    ? vibes.filter(v => !(v && typeof v === 'object' && v.tag && conflictTags.includes(v.tag)))
    : vibes;
  const pickFrom = vibePool.length ? vibePool : vibes;
  const vibePick = pickFrom[Math.floor(rng() * pickFrom.length)];
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

  // Reserve ~25-40% of future picks (1 of 3) for conflict-tagged entries
  // when any conflict is active and matching content exists. Otherwise
  // fall back to the existing topTag-weighted selection.
  const TOTAL_PATHS = 3;
  const reservedPaths = [];
  if (conflictTags.length) {
    const matches = pathsPool.filter(p => p.tag && conflictTags.includes(p.tag));
    if (matches.length) {
      const reserveCount = Math.max(1, Math.round(TOTAL_PATHS * 0.33));
      const shuffled = matches.map(p => ({ p, w: rng() })).sort((a, b) => b.w - a.w);
      for (const x of shuffled.slice(0, reserveCount)) reservedPaths.push(x.p);
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
  return pool.filter(c => c.when(b)).map(c => ({ tag: c.tag, note: c.note }));
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
const DIVERGENCE_EVENTS = [
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
];

/* ---------- Trait Popularity Through History (Adult mode) ----------
 * Five eras showing what each decade idealized as a 'desirable' trait.
 * Makes the cultural-stability question visible: the present is not
 * universal, it's just recent. */
const TRAIT_HISTORY = [
  { era: '1950s', label: 'Mid-century',  traits: ['Obedience', 'Deference', 'Conformity'],            note: 'Idealized in employment, schooling, family roles.' },
  { era: '1980s', label: 'Late-century', traits: ['Competitiveness', 'Ambition', 'Self-reliance'],     note: 'Optimization read as economic value.' },
  { era: '2000s', label: 'Early-2000s',  traits: ['Confidence', 'Charisma', 'Multitasking'],           note: 'Network-economy demands.' },
  { era: '2020s', label: 'Present',      traits: ['Resilience', 'Attractiveness', 'Productivity'],     note: 'Algorithm-mediated visibility.', isPresent: true },
  { era: '2040s', label: 'Speculative',  traits: ['Emotional regulation', 'Cognitive endurance', 'Network sensitivity'], note: 'Modeled extension; subject to drift.', isSpeculative: true }
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
      { when: c => c.budget.cognition   >= 7 && (c.env.education || 5) <= 3, line: 'Capability/access mismatch: under-placement risk despite high projection.' }
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
      { when: c => c.totalAlloc         >= 10 && (c.env.economy || 5) <= 4, line: 'Visibility of enhancement profile may stratify against non-modified peers.' }
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
      { when: c => c.budget.empathy     >= 8 && c.budget.resilience <= 4, line: 'Empathic overload without buffer: identity-fatigue risk.' }
    ]
  },
  stress: {
    title: 'Stress & burnout',
    rules: [
      { when: c => (c.baby.conscientiousness || 0) >= 7 && (c.baby.neuroticism || 0) >= 6, line: 'Burnout risk elevated: care-runs-hot profile.' },
      { when: c => c.budget.cognition   >= 7 && c.budget.resilience >= 6, line: 'Achievement-driven stress accumulation; symptom-masking probable.' },
      { when: c => c.budget.emotional   >= 7, line: 'Grief integration may be slow or incomplete; clinical follow-up indicated.' },
      { when: c => (c.baby.extraversion || 0) >= 8 && (c.baby.neuroticism || 0) >= 6, line: 'Performance-recovery cycles; post-event depletion above baseline.' },
      { when: c => (c.env.social || 5)  >= 7 && c.totalAlloc >= 15, line: 'High-social-pressure environment + heavy allocation: compounding stress load.' }
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
      { when: c => c.budget.appearance  >= 7, line: 'Appearance-correlated compensation premiums modeled in customer-facing roles.' }
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
      <h2>Societal Outcomes Brief <span class="beta-tag">Beta</span></h2>
      <p class="subtle">Modeled societal response to this projection. Each line fires from a specific allocation, trait, or environment combination — not a generic readout.</p>
    </header>
    <div class="societal-grid">${sections}</div>`;
  panel.hidden = false;
}

// Back-compat shim — older call sites still expect renderSocialResponse.
const renderSocialResponse = renderSocietalBrief;

/* ---------- Divergence rendering ---------- */
function rollDivergence() {
  const rng = seededRand((state.codename || 'baby') + '|divergence|' + Date.now());
  state.divergence = DIVERGENCE_EVENTS[Math.floor(rng() * DIVERGENCE_EVENTS.length)];
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
    <p class="divergence-note">Outcome trajectory no longer matches the modeled projection. Reprojection recommended.</p>`;
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
  const cards = INNER_COHORT_CONTEXTS.map(ctx => {
    const picks = pickN(ctx.pool, 2, rng);
    return `
      <article class="inner-context" data-ctx="${ctx.key}">
        <header class="inner-context-head">
          <span class="inner-context-icon" aria-hidden="true">${ctx.icon}</span>
          <span class="inner-context-label">${ctx.label}</span>
        </header>
        <ul class="inner-context-lines">${picks.map(p => `<li>${p}</li>`).join('')}</ul>
      </article>`;
  }).join('');
  panel.innerHTML = `
    <header class="inner-cohort-head">
      <h2>Same person, different rooms</h2>
      <p class="subtle">Four contexts. One person each. The identity sliders did not model any of them.</p>
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
  const cards = LIFETIME_DRIFT.ages.map((age, i) => {
    const idx  = Math.floor(rng() * age.pool.length);
    const line = age.pool[idx];
    return `
      <article class="drift-stage" data-stage="${i}">
        <header class="drift-stage-head">
          <span class="drift-age">${age.label}</span>
        </header>
        <p class="drift-line">${line}</p>
      </article>`;
  }).join('');
  panel.innerHTML = `
    <header class="lifetime-drift-head">
      <h2>One life, different decades</h2>
      <p class="subtle">The same person at four ages. The optimization targets you chose will look like different things at each.</p>
    </header>
    <div class="lifetime-drift-row">${cards}</div>`;
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
      <h2>Sibling Cohort · Variance Distribution <span class="beta-tag">Beta</span></h2>
      <p class="subtle">Five equally-probable outcomes from identical parental inputs and allocation. The variance IS the projection's confidence interval, rendered as people.</p>
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
  if      (usd < 50000)  lines = ['EU (Oviedo Convention Art. 13): heritable modification prohibited; indication-restricted somatic procedures only.', 'UK (HFEA 2008, Schedule 2): licensed in-vitro use only; clinics must hold a current HFEA treatment licence.', 'US: payer coverage discretionary; out-of-network rates apply outside HFEA-equivalent accredited centers.'];
  else if (usd < 100000) lines = ['EU (draft IVD-Germ Lines Directive Art. 4): elective provision pending national transposition; self-pay only.', 'UK (HFEA 2008 §3ZA): pre-treatment counselling and licensed-clinic registration required; waiting period 9–14 months.', 'Non-aligned regions: no reimbursement pathway; cross-border referral on case basis under channel code RA-2.'];
  else if (usd < 150000) lines = ['EU (draft IVD-Germ Lines Directive Art. 7): post-market review required; provision restricted to designated reference centres.', 'UK (HFEA 2008 §3ZA, special-direction): eligibility conditional on documented clinical indication; channel code RA-3 review window 6 months.', 'Asia-Pacific: jurisdiction-dependent; cross-border referral subject to receiving-state HFEA-equivalent licensing.'];
  else if (usd < 200000) lines = ['EU + UK (draft IVD-Germ Lines Directive Art. 9; HFEA 2008 §4A): restricted approval; pre-authorization by the national competent authority required.', 'Eligibility conditional on clinical-indication documentation and counselling completion; waiting list 14–22 months at HFEA-licensed reference centres.', 'Non-aligned regions: not provisioned under current channel-code RA-4 listing.'];
  else                   lines = ['Multi-jurisdictional (Oviedo Convention Art. 13): heritable provisions outside current treaty scope; authorization pending or withheld.', 'UK + EU: not provisioned under HFEA 2008 or the draft IVD-Germ Lines Directive; eligibility unresolved.', 'De facto pathway: extraterritorial facilities outside Oviedo signatory jurisdiction.'];
  if ((budget.cognition || 0) >= 6) lines.push('Cognitive optimization (CMP-2): EU partial restriction under the draft IVD-Germ Lines Directive Art. 6; UK HFEA review ongoing.');
  if ((budget.emotional || 0) >= 6) lines.push('Affective-band editing (CMP-4): experimental authorization required; subject to HFEA-equivalent cohort follow-up.');
  host.hidden = false;
  host.innerHTML = `
    <h4>Regional Access &middot; channel code RA-${Math.min(5, Math.max(1, Math.floor(usd / 50000) + 1))}</h4>
    <ul class="regional-list">${lines.slice(0, 4).map(l => `<li>${l}</li>`).join('')}</ul>
    <p class="regional-foot">Issued for indicative purposes. Authorizations and waiting-list intervals are revised quarterly; current values supersede prior disclosures.</p>`;
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
  const cards = TRAIT_HISTORY.map(era => {
    const cls = [
      'history-era',
      era.isPresent ? 'is-present' : '',
      era.isSpeculative ? 'is-speculative' : ''
    ].filter(Boolean).join(' ');
    return `
      <article class="${cls}">
        <header class="era-head">
          <span class="era-year">${era.era}</span>
          <span class="era-label">${era.label}</span>
        </header>
        <ul class="era-traits">${era.traits.map(t => `<li>${t}</li>`).join('')}</ul>
        <p class="era-note">${era.note}</p>
      </article>`;
  }).join('');
  panel.innerHTML = `
    <header class="trait-history-head">
      <h2>Trait Popularity · Historical Drift <span class="beta-tag">Beta</span></h2>
      <p class="subtle">What gets called a 'desirable' trait drifts across eras. Optimization targets are not culturally stable.</p>
    </header>
    <div class="trait-history-timeline">${cards}</div>`;
  panel.hidden = false;
}

function pickReflectionPrompt(seed) {
  const rng = seededRand(seed + '|reflection');
  const pool = pickPool(REFLECTION_PROMPTS, REFLECTION_PROMPTS, KIDS_REFLECTION_PROMPTS);
  return pool[Math.floor(rng() * pool.length)];
}

function showHumanityReminder(line) {
  const banner = $('#reminder-banner');
  if (!banner) return;
  const pool = pickPool(HUMANITY_REMINDERS, CLINICAL_REMINDERS, KIDS_HUMANITY_REMINDERS);
  banner.textContent = line || pool[Math.floor(Math.random() * pool.length)];
  banner.hidden = false;
  banner.classList.add('is-visible');
  clearTimeout(showHumanityReminder._t);
  showHumanityReminder._t = setTimeout(() => {
    banner.classList.remove('is-visible');
    setTimeout(() => { banner.hidden = true; }, 700);
  }, 5500);
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
    try { document.execCommand('copy'); status.textContent = 'Copied to clipboard ✓'; }
    catch { status.textContent = 'Couldn’t copy automatically — please copy from the alert.'; alert(text); }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => { status.textContent = 'Copied to clipboard ✓'; })
      .catch(fallback);
  } else { fallback(); }
  setTimeout(() => { if (status.textContent.startsWith('Copied')) status.textContent = ''; }, 2200);
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

  // Quietly remind users this is a person, not a profile, every few generations.
  if (state.generateCount % 3 === 0 || state.appMode === 'reflection') {
    showHumanityReminder();
  }

  const results = $('#results');
  results.hidden = false;
  // smooth scroll on first reveal
  requestAnimationFrame(() => {
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
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
  showHumanityReminder(
    NATURAL_VARIATION_MESSAGES[Math.floor(Math.random() * NATURAL_VARIATION_MESSAGES.length)]
  );
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
    status.textContent = 'Saved ✓';
    setTimeout(() => { if (status.textContent === 'Saved ✓') status.textContent = ''; }, 1800);
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
  PRIORITIES.forEach(p => {
    if (!(p.key in state.budget)) state.budget[p.key] = 0;
    const id = 'pr_' + p.key;
    const row = document.createElement('div');
    row.className = 'priority-row';
    row.dataset.tier = p.tier.toLowerCase();
    row.innerHTML = `
      <div class="priority-head">
        <label for="${id}">${p.label} <span class="priority-tier">${p.tier}</span></label>
        <span class="priority-cost">${p.cost} cr · pt</span>
      </div>
      <div class="field-range">
        <input type="range" id="${id}" min="0" max="10" step="1" value="${state.budget[p.key]}" />
        <span class="val" id="${id}_val">${state.budget[p.key]}</span>
      </div>
      <p class="priority-tradeoff">${p.tradeoff}</p>`;
    grid.appendChild(row);
    const input = row.querySelector('input');
    const valEl = row.querySelector('.val');
    input.addEventListener('input', () => {
      const requested = Number(input.value);
      // Two-beat consent rhythm: the first non-zero allocation quietly moves
      // the session from baseline play into optimization, then the progress
      // hint leads toward the fuller consent panel at 50 credits.
      if (requested > 0 && !state.consentAck) {
        state.consentAck = true;
        ensureConsentProgressHint();
      }
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
      <p class="consent-ack-copy">I understand this is a heritable decision.</p>
      <button type="button" class="btn btn-small consent-ack-btn">Acknowledge & continue</button>`;
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
      // (the micro-ack) just fired, so the early beat retires.
      const note = document.querySelector('.consent-awareness-note');
      if (note) {
        note.classList.add('is-leaving');
        note.addEventListener('transitionend', () => note.remove(), { once: true });
        setTimeout(() => note.remove(), 500);
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
      <p class="consent-progress-copy">Consent context expands at 50 credits.</p>
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
  if (!host || host.dataset.rendered === '1') return;
  const lead = typeof CONSENT_EXPLAINER === 'string' ? CONSENT_EXPLAINER : '';
  const rows = Array.isArray(CONSENT_IMPLICATIONS) ? CONSENT_IMPLICATIONS : [];
  if (!lead && !rows.length) return;
  const leadHtml = lead ? `<p class="consent-line">${lead}</p>` : '';
  const rowsHtml = rows.map(it => {
    const label = (it && it.label) ? it.label : '';
    const body  = (it && it.body)  ? it.body  : '';
    return `<div class="consent-row"><span class="consent-label">${label}</span><span class="consent-body">${body}</span></div>`;
  }).join('');
  host.innerHTML = `
    ${leadHtml}
    <details class="consent-detail">
      <summary>Institutional consent record</summary>
      <div class="consent-detail-body">${rowsHtml}</div>
    </details>`;
  host.dataset.rendered = '1';
}

/* ---------- Adult budget projections ----------
 * Two derived indicators that respond to enhancement allocation. The
 * Cohort Placement reads as a percentile claim ("Projected: top 8% of
 * birth cohort by composite score"); the Inheritance Burden Index weights
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
    if      (usd >= 200000) tier = 'Outside current treaty scope · authorization pending';
    else if (usd >= 150000) tier = 'Restricted · pre-authorization required · 14–22mo waitlist';
    else if (usd >= 100000) tier = 'Reference-centre only · 6mo review window · channel code RA-3';
    else if (usd >=  50000) tier = 'Licensed-clinic only · 9–14mo waitlist · self-pay';
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
    // forward. Tier 0 keeps ethical weight (the choice is still made for
    // them); tier 3 drops doom-speak and reports the statistical reality.
    let note = 'Minimal · few traits are pre-decided — but the choice is still made for them';
    if (pressure > 0.15) note = 'Modest · a handful of traits will travel with the line';
    if (pressure > 0.45) note = 'Substantial · a defined trait profile is locked in across the family tree';
    if (pressure > 0.75) note = 'Saturated · heritable traits dominate the profile; later course-correction becomes statistically unlikely';
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
        accessFoot.textContent = 'Footnote: inheritance compounds via access — cohorts able to allocate carry advantages forward; cohorts that cannot do not catch up by genetics alone.';
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
      <h3 class="reg-heading">Regulatory Context</h3>
      <p class="reg-empty">No disclosure thresholds crossed yet.</p>`;
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
  // card's default (English) fields. LOOP_REQUEST(narrative-or-systems): only
  // the "Burden ≠ heritability" REGULATORY_CARDS entry is currently translated
  // to zh/ja/ko/tr — the remaining cards still need translations.
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
