// Edit content here, then run `npm run build`. Both languages are generated together.
export const profile = {
  name: { zh: '王亿宽', en: 'Yikuan Wang' },
  email: 'wyk_wide@whu.edu.cn',
  github: 'https://github.com/OneWide',
  university: { zh: '武汉大学', en: 'Wuhan University' },
  school: { zh: '国家网络安全学院', en: 'School of Cyber Science and Engineering' },
  role: { zh: '网络空间安全 · 硕士研究生', en: 'M.Sc. Student · Cyberspace Security' },
  advisor: { zh: '陈晶', en: 'Jing Chen' },
  intro: {
    zh: '我目前在武汉大学国家网络安全学院攻读硕士学位，师从陈晶教授。我的研究聚焦大语言模型与智能体安全，关注多智能体协作中的鲁棒推理、模型对齐与奖励机制，以及开放环境下的安全攻防。',
    en: 'I am a master’s student at the School of Cyber Science and Engineering, Wuhan University, advised by Prof. Jing Chen. My research focuses on the security of large language models and agents, with interests in robust multi-agent reasoning, model alignment, reward mechanisms, and security in open environments.'
  },
  interests: [
    { id: '01', icon: 'network', name: { zh: '多智能体安全', en: 'Multi-Agent Security' }, english: 'MULTI-AGENT SECURITY', description: { zh: '研究智能体间的信息交互与风险传播，探索更鲁棒的协作推理与自适应防御。', en: 'Studying information exchange and risk propagation between agents to improve collaborative reasoning and adaptive defenses.' }, tags: ['LLM Agents', 'Robust Reasoning'] },
    { id: '02', icon: 'shield', name: { zh: '大模型对齐与安全', en: 'LLM Alignment & Safety' }, english: 'ALIGNMENT & SAFETY', description: { zh: '从攻防双视角理解模型脆弱性，关注奖励黑客、提示注入与奖励机制的可靠性。', en: 'Understanding model vulnerabilities through attack and defense, with a focus on reward hacking, prompt injection, and reliable reward mechanisms.' }, tags: ['RLHF', 'Reward Hacking'] },
    { id: '03', icon: 'layers', name: { zh: '多模态感知', en: 'Multimodal Perception' }, english: 'MULTIMODAL PERCEPTION', description: { zh: '结合音频、视觉与时空信息，探索跨模态表征学习及算法在边缘设备上的部署。', en: 'Combining audio, vision, and spatiotemporal information for cross-modal representation learning and edge deployment.' }, tags: ['Cross-modal Learning', 'Edge AI'] }
  ],
  education: [
    { period: { zh: '2026.09 — 至今', en: 'Sep 2026 — Present' }, degree: { zh: '硕士 · 网络空间安全', en: 'M.Sc. in Cyberspace Security' }, detail: { zh: '导师：陈晶教授', en: 'Advisor: Prof. Jing Chen' }, current: true },
    { period: { zh: '2022.09 — 2026.06', en: 'Sep 2022 — Jun 2026' }, degree: { zh: '本科 · 网络空间安全', en: 'B.Eng. in Cyberspace Security' }, detail: { zh: '加权均分 91.62 / 100 · 专业排名 28 / 143', en: 'Weighted average: 91.62 / 100 · Rank: 28 / 143' } }
  ],
  service: {
    title: { zh: '国家网络安全学院学生会主席', en: 'Student Union President' },
    organization: { zh: '武汉大学国家网络安全学院', en: 'School of Cyber Science and Engineering, Wuhan University' },
    period: '2023.07 — 2024.07',
    description: { zh: '统筹学生会日常事务，协调部门工作安排；规划与组织各类学生活动，提升活动影响力与参与度。', en: 'Coordinated the student union’s daily operations and departmental work, and planned student activities to strengthen engagement and participation.' },
    certificate: 'student-union.webp'
  }
};

// Only `accepted` and `published` entries are rendered. Do not add submissions here.
// Required fields: id, title, authors (array of strings), venue, year, status.
// Optional: equalContribution, summary {zh,en}, doi, paper, code, bibtex.
// Each link must be a real https URL. No placeholder paper is published.
export const publications = [];

export const awards = [
  { year: 2025, level: 'national', prize: 1, name: { zh: '中国机器人及人工智能大赛', en: 'China Robot and Artificial Intelligence Competition' }, track: { zh: '智能文化创新赛 · 全国总决赛', en: 'Intelligent Cultural Innovation · National Final' }, certificate: 'craic-national-first.webp' },
  { year: 2024, level: 'national', prize: 1, name: { zh: '全国大学生数学竞赛', en: 'Chinese Mathematics Competitions' }, track: { zh: '非数学 A 类', en: 'Non-Mathematics Category A' }, certificate: 'mathematics-national.webp' },
  { year: 2025, level: 'national', prize: 3, name: { zh: '中国机器人及人工智能大赛', en: 'China Robot and Artificial Intelligence Competition' }, track: { zh: '人工智能创新赛 · 全国总决赛', en: 'AI Innovation · National Final' }, certificate: 'craic-national-third.webp' },
  { year: 2025, level: 'regional', prize: 1, name: { zh: '蓝桥杯大赛', en: 'Lanqiao Cup' }, track: { zh: '软件赛 · Web 应用开发 · 湖北赛区', en: 'Software · Web Development · Hubei' }, certificate: 'lanqiao-web.webp' },
  { year: 2025, level: 'regional', prize: 1, name: { zh: '中国机器人及人工智能大赛', en: 'China Robot and Artificial Intelligence Competition' }, track: { zh: '智能文化创新赛 · 湖北赛区', en: 'Intelligent Cultural Innovation · Hubei' }, certificate: 'craic-regional-first.webp' },
  { year: 2024, level: 'regional', prize: 1, name: { zh: '全国大学生物联网设计竞赛', en: 'National Undergraduate IoT Design Contest' }, track: { zh: '华中及西南赛区 · 团队队长', en: 'Central & Southwestern China · Team Leader' }, certificate: 'iot-regional.webp' },
  { year: 2024, level: 'regional', prize: 1, name: { zh: '全国大学生数学竞赛', en: 'Chinese Mathematics Competitions' }, track: { zh: '非数学 A 类 · 湖北赛区', en: 'Non-Mathematics Category A · Hubei' }, certificate: 'mathematics-regional.webp' },
  { year: 2025, level: 'regional', prize: 2, name: { zh: '中国机器人及人工智能大赛', en: 'China Robot and Artificial Intelligence Competition' }, track: { zh: '人工智能创新赛 · 湖北赛区', en: 'AI Innovation · Hubei' }, certificate: 'craic-regional-second.webp' },
  { year: 2025, level: 'regional', prize: 2, name: { zh: '蓝桥杯大赛', en: 'Lanqiao Cup' }, track: { zh: '人工智能编程赛 · 全国选拔赛', en: 'AI Programming · National Qualifier' }, certificate: 'lanqiao-ai.webp' },
  { year: 2025, level: 'regional', prize: 2, name: { zh: '中国大学生计算机设计大赛', en: 'Chinese Collegiate Computing Competition' }, track: { zh: '中南地区赛', en: 'Central-South Regional Competition' }, certificate: 'computing-regional.webp' }
];

export const honors = [
  { year: '2025 / 2024', title: { zh: '国家励志奖学金', en: 'National Encouragement Scholarship' }, description: { zh: '2023–2024、2024–2025 学年度', en: 'Academic years 2023–2024 and 2024–2025' }, certificates: [ { file: 'scholarship-2025.webp', label: '2025' }, { file: 'scholarship-2024.webp', label: '2024' } ] },
  { year: '2024', title: { zh: '雷军计算机创新与发展资助基金', en: 'Lei Jun Computer Innovation and Development Fund' }, description: { zh: '武汉大学', en: 'Wuhan University' } },
  { year: '2023–2024', title: { zh: '三好学生', en: 'Merit Student' }, description: { zh: '武汉大学校级荣誉', en: 'University-level honor · Wuhan University' }, certificates: [ { file: 'merit-student.webp' } ] },
  { year: '2023–2024', title: { zh: '优秀学生干部', en: 'Outstanding Student Leader' }, description: { zh: '武汉大学校级荣誉', en: 'University-level honor · Wuhan University' }, certificates: [ { file: 'student-leader.webp' } ] },
  { year: '2022–2023', title: { zh: '优秀共青团干部', en: 'Outstanding Youth League Cadre' }, description: { zh: '武汉大学校级荣誉', en: 'University-level honor · Wuhan University' }, certificates: [ { file: 'youth-league.webp' } ] }
];
