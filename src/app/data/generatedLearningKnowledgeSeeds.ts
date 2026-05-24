import type { GeneratedLearningKnowledgeEntry } from "./generatedLearningKnowledge";

export const generatedLearningKnowledgeSeedMeta = {
  "sourceRoot": "D:/AI课程/4-17会议文档/1.提取文本",
  "generatedAt": "2026-05-21T03:48:55.108Z",
  "fullEntryCount": 494,
  "seedEntryCount": 76,
  "summaryByRole": {
    "sales": 282,
    "community_ops": 76,
    "designer": 189,
    "ops_manager": 159
  },
  "summaryByCompetency": {
    "资源开拓": 141,
    "岗位边界": 89,
    "指标异常判断": 329,
    "社群SOP": 125,
    "高客单成交": 88,
    "小红书获客": 64,
    "需求挖掘": 315,
    "新人培养与考核": 391,
    "审单防错": 46,
    "转化复盘": 171,
    "客诉处理": 63,
    "客户接待闭环": 220,
    "报价推进": 241,
    "板材产品解释": 33,
    "非标下单底线": 87,
    "量尺出图": 74,
    "会审协同": 133,
    "设计方案讲解": 98,
    "五金场景讲解": 12
  }
} as const;

export const generatedLearningKnowledgeSeedEntries: GeneratedLearningKnowledgeEntry[] = [
  {
    "id": "lk-0035",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/店长访谈销售培训需求/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "会审协同",
      "需求挖掘",
      "转化复盘",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户追问价格",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:22:33.733Z",
    "charCount": 3432,
    "evidenceSnippets": [
      "本大纲基于《第二位店长》访谈内容,将高定品牌门店中店长对销售人员与设计师的管理、带教、协同经验转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "- **线上化功能描述**:系统提供小区信息管理、信息获取渠道培训、现场勘探任务、客户信息沉淀,帮助新人快速掌握小区业务知识。",
      "- **对应线下流程**:店长通过方案会审演练、现场带教、客户卡点预案、协同问题处理来带新人。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0038",
    "title": "产品知识快速查询模块-PRD",
    "sourceFile": "05-产品知识快速查询模块-PRD.md",
    "relativePath": "流程清单/店长访谈销售培训需求/05-产品知识快速查询模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "客户接待闭环",
      "客诉处理"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:25:02.920Z",
    "charCount": 2634,
    "evidenceSnippets": [
      "**多系统分散**:产品知识、报价、售后等信息分散在执行力系统、企业微信文档、云平系统等多个系统;",
      "作为一名在职销售,我希望一个APP整合产品知识、报价、售后等信息,不要在多个系统之间切换。",
      "- 分类快捷入口(产品知识/报价/售后/安装/特殊工艺)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识快速查询模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0040",
    "title": "销售设计师协同模块-PRD",
    "sourceFile": "07-销售设计师协同模块-PRD.md",
    "relativePath": "流程清单/店长访谈销售培训需求/07-销售设计师协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:26:31.925Z",
    "charCount": 2846,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售理解销售与设计师的协同模式,学会根据主导场景切换角色,掌握方案会审演练方法,提升协同配合能力。",
      "**协同流程**:方案前期会审演练 → 预判客户卡点 → 需求满足预案;",
      "`进入系统` → `学习协同模式` → `完成角色切换训练` → `方案会审演练` → `协同案例分析` → `实战考核` → `解锁后续模块`"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售设计师协同模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0044",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/店长客户接待技巧与新人培训经验/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "需求挖掘",
      "指标异常判断",
      "板材产品解释"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:24:20.542Z",
    "charCount": 4924,
    "evidenceSnippets": [
      "本大纲基于《2026-04-09 13_02 店长_原文》访谈内容，将线下门店中由店长、老销售协同完成的客户接待、需求判断、价值塑造、成交推进等经验传授过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "**对应线下流程**：店长通过口述、案例分享、带教演练向新人传递客户接待、需求判断、价值塑造等经验，但资料分散、依赖个人表达。",
      "*原因**：这 6 个模块直接覆盖新人从\"客户接待 → 需求判断 → 价值塑造 → 成交推进 → 能力考核\"的完整最小闭环。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0086",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "转化复盘",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T05:50:38.149Z",
    "charCount": 2566,
    "evidenceSnippets": [
      "原因：这 5 个模块直接覆盖新人从“认知建立 → 客户接待 → 成交推进 → 执行落地 → 能力考核”的完整最小闭环。",
      "本大纲基于《销售店长》访谈内容，将线下门店中由店长、老销售、设计师协同完成的经验传授过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：培训者或店长通过口述、案例分享、带教演练向新人传递经验，但资料分散、依赖个人表达。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0095",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客诉处理",
      "转化复盘",
      "客户接待闭环",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:33:55.467Z",
    "charCount": 3784,
    "evidenceSnippets": [
      "本大纲基于《4.9刘店长分享》访谈内容,将线下门店中由店长、带教老师协同完成的新人培养过程,转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "原因:这 6 个模块直接覆盖新人从\"认知建立 → 产品报价 → 客户接待 → 跟单成交 → 售后维护 → 能力考核\"的完整最小闭环,且符合店长\"一个月内必须有结果\"的要求。",
      "- **线上化功能描述**:系统基于真实场景设置闯关任务,包括产品知识考核、报价能力测试、接待场景演练、跟单流程考核、售后处理模拟等,并生成个人成长报告。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0100",
    "title": "跟单能力与过程管理模块-PRD",
    "sourceFile": "07-跟单能力与过程管理模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/07-跟单能力与过程管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "量尺出图",
      "客户接待闭环",
      "高客单成交",
      "小红书获客"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:38:30.776Z",
    "charCount": 2965,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售掌握跟单的完整流程(出报价、出图纸、邀约客户、方案对比、价格协商、成交推进),确保能够独立完成跟单并规避常见问题。",
      "跟单过程包括:出报价、出图纸、邀约客户、方案对比、价格协商、成交推进;",
      "- 跟单流程图(出报价→出图纸→邀约客户→方案对比→价格协商→成交推进)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：跟单能力与过程管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0103",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "小红书获客",
      "客诉处理",
      "社群SOP",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:41:05.596Z",
    "charCount": 3548,
    "evidenceSnippets": [
      "**线上维护型**:适合拉群、线上互动、邀约进店,门店接待能力弱",
      "跟单流程:出报价 → 出图纸 → 邀约客户 → 方案对比 → 价格协商 → 成交推进",
      "极端案例:网红拉的小区群连续出现售后问题,群主威胁要返点,需要全程录音、保留证据、必要时走法律程序。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0124",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "资源开拓",
      "需求挖掘",
      "客户接待闭环",
      "量尺出图"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:46:34.775Z",
    "charCount": 3417,
    "evidenceSnippets": [
      "- **对应线下流程**：老销售带新人观察客户类型（刚需/改善/高端/价格敏感/理智/感性/犹豫/强势），判断家庭结构、职业特征、预算心理、重点需求，再决定沟通方向。",
      "- **对应线下流程**：培训者或店长通过口述、案例分享、带教演练向新人传递经验，但资料分散、依赖个人表达。",
      "- **对应线下流程**：第一次接待填写需求表；设计师现场测量时销售陪同；需求变更时整理到在线文档让客户确认；老客户维护通过报修建立联系。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0129",
    "title": "客户类型识别训练模块-PRD",
    "sourceFile": "05-客户类型识别训练模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/05-客户类型识别训练模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "板材产品解释",
      "客户接待闭环",
      "指标异常判断",
      "需求挖掘",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:52:29.942Z",
    "charCount": 7483,
    "evidenceSnippets": [
      "通过系统化训练，让新人销售快速掌握客户类型识别能力，在客户进店后短时间内准确判断客户类型，采用对应策略，提升接待效率和成交率。",
      "1. **识别能力弱**：新人缺乏经验，难以快速判断客户类型",
      "先在板材区停留，拿起板材仔细看纹理，然后走到厨房展示区）"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户类型识别训练模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0132",
    "title": "方案准备与设计师协同模块-PRD",
    "sourceFile": "07-方案准备与设计师协同模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/07-方案准备与设计师协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "客户接待闭环",
      "报价推进",
      "需求挖掘",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户追问价格",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:50:26.899Z",
    "charCount": 3021,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握方案准备方法、设计师匹配技巧、方案会审流程、销售设计师协同方法。",
      "根据访谈，销售与设计师的协同是成交的重要环节。当前新人普遍存在以下问题：",
      "`进入模块` → `学习方案准备方法` → `学习设计师匹配` → `学习方案会审` → `学习协同技巧` → `场景模拟训练` → `模块测验`"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：方案准备与设计师协同模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0133",
    "title": "闯关考核与复盘模块-PRD",
    "sourceFile": "08-闯关考核与复盘模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/08-闯关考核与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "报价推进",
      "客户接待闭环",
      "指标异常判断",
      "审单防错"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户追问价格",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:51:11.275Z",
    "charCount": 3223,
    "evidenceSnippets": [
      "根据访谈，师徒带教的核心是\"前三单重点关注，首单必须成功\"。当前新人考核存在以下问题：",
      "**模块目标**：基于真实场景设置闯关任务，检验新人对前序模块的掌握程度，生成个人成长报告，支持持续复盘。",
      "作为一名店长，我希望看到新人的成长报告，知道如何针对性带教。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0159",
    "title": "客户需求对接与沟通技巧模块-PRD",
    "sourceFile": "05-客户需求对接与沟通技巧模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/05-客户需求对接与沟通技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "会审协同",
      "新人培养与考核",
      "设计方案讲解",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:00:15.032Z",
    "charCount": 3016,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望设计师掌握标准的需求记录与确认方法,提升协同效率。",
      "练习数据:需求记录表填写记录、沟通话术记录、AI评分、改进建议",
      "评估数据:需求对接模拟记录、评估维度得分、综合评分、能力雷达图"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求对接与沟通技巧模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0160",
    "title": "全案设计思维与空间规划模块-PRD",
    "sourceFile": "06-全案设计思维与空间规划模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/06-全案设计思维与空间规划模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "指标异常判断",
      "会审协同",
      "客户接待闭环",
      "审单防错"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:01:05.984Z",
    "charCount": 3083,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望设计师系统掌握空间规划方法,减少方案返工率。",
      "练习数据:空间规划练习记录、冲突识别记录、AI评分、改进建议",
      "评估数据:失误识别准确率、方案设计评分、评估维度得分、综合评分、能力雷达图"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：全案设计思维与空间规划模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0161",
    "title": "方案讲解模拟训练模块-PRD",
    "sourceFile": "07-方案讲解模拟训练模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/07-方案讲解模拟训练模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "会审协同",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:01:49.848Z",
    "charCount": 3301,
    "evidenceSnippets": [
      "训练数据:训练场景、训练时长、对话记录、AI评分、改进建议",
      "能力数据:表达能力评分、应变能力评分、专业性评分、情绪管理评分、逻辑性评分",
      "店长/培训师:查看本门店设计师的训练进度、能力评分、训练统计"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解模拟训练模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0193",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "量尺出图",
      "转化复盘",
      "会审协同",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户方案会审",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:27:27.967Z",
    "charCount": 3309,
    "evidenceSnippets": [
      "本大纲基于《设计师》访谈内容,将线下门店中由设计师、销售、店长协同完成的经验传授过程,转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "原因:这 5 个模块直接覆盖新人从\"认知建立 → 需求把握 → 沟通说服 → 协同配合 → 能力考核\"的完整最小闭环。",
      "- **对应线下流程**:设计师口头说明工作内容(出图、沟通、测量、安装、售后)、成长周期、能力要求、常见误区,帮助新人建立预期和心态。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0194",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "岗位边界",
      "需求挖掘",
      "新人培养与考核",
      "量尺出图",
      "客诉处理"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户方案会审",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:29:17.519Z",
    "charCount": 3833,
    "evidenceSnippets": [
      "- 内容项:设计师工作全流程(出图、沟通、测量、安装、售后)、成长周期、能力要求、常见误区",
      "- 来源依据:访谈中关于\"出图、跟客户线上沟通、跑现场测量、现场安装、售后处理\"的描述",
      "- 关联案例:客户质疑价格贵时,从用料、覆膜、工艺细节讲解,并带客户去展厅看落地效果"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0197",
    "title": "方案讲解与异议处理模块-PRD",
    "sourceFile": "06-方案讲解与异议处理模块-PRD.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/06-方案讲解与异议处理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "报价推进",
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户追问价格",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:32:09.174Z",
    "charCount": 4042,
    "evidenceSnippets": [
      "训练数据:效果图异议处理评分、价格异议应对评分、改稿管理评分、硬装问题应对评分",
      "**模块目标**:帮助新设计师掌握方案讲解技巧、效果图异议处理方法、价格异议应对策略、改稿管理技巧,提升成单能力。",
      "作为一名培训负责人,我希望新人学会如何应对客户的质疑和异议,避免因沟通不当失去客户。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解与异议处理模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0198",
    "title": "销售协同与改稿管理模块-PRD",
    "sourceFile": "07-销售协同与改稿管理模块-PRD.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/07-销售协同与改稿管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "岗位边界",
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "客诉处理"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:33:11.061Z",
    "charCount": 4367,
    "evidenceSnippets": [
      "训练数据:需求传递评分、方案审核评分、改稿管理评分、协同逼单评分、售后协同评分",
      "作为一名培训负责人,我希望新人学会如何与销售协同工作,避免因协同不畅导致客户流失。",
      "作为一名新设计师,我希望了解销售与设计师的协同机制,知道如何与销售配合提高成单率。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售协同与改稿管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0199",
    "title": "演练考核与成长复盘模块-PRD",
    "sourceFile": "08-演练考核与成长复盘模块-PRD.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/08-演练考核与成长复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "岗位边界",
      "指标异常判断",
      "客户接待闭环",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户首次进店",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:34:15.500Z",
    "charCount": 4356,
    "evidenceSnippets": [
      "作为一名店长/资深设计师,我希望通过系统化的演练考核,降低带教和点评成本。",
      "考核记录:设计师ID、关卡ID、评分、通过状态、考核时间",
      "成长数据:能力评分(专业能力、沟通能力、应变能力、协同能力)、成长曲线、优势与不足"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：演练考核与成长复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0211",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "岗位边界",
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "转化复盘",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:49:19.143Z",
    "charCount": 3393,
    "evidenceSnippets": [
      "本大纲基于《设计师与销售协同》访谈内容,将线下门店中由设计师、销售、设计总监协同完成的客户服务与方案讲解过程,转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "- **对应线下流程**:销售和设计师对客户需求理解不一致、预算控制分歧、客户判断分歧,导致协作冲突。",
      "原因:这 6 个模块直接覆盖设计师从\"需求深化 → 方案设计 → 方案讲解 → 销售协同 → 报价管理 → 案例沉淀 → 能力提升\"的完整最小闭环。"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0221",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "设计方案讲解",
      "需求挖掘",
      "转化复盘",
      "报价推进"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:32:16.268Z",
    "charCount": 2838,
    "evidenceSnippets": [
      "本大纲基于《设计师》访谈内容，将线下门店中由设计总监、老设计师、销售协同完成的经验传授过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：设计师与销售协同，通过线上会议或线下座谈，复核客户需求、判断风格偏好、明确预算区间。",
      "- **对应线下流程**：设计师与销售配合完成客户接待、需求沟通、方案讲解、异议处理与成交推进。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0223",
    "title": "设计师入职与职业认知模块-PRD",
    "sourceFile": "04-设计师入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/04-设计师入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "设计方案讲解",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:34:01.162Z",
    "charCount": 2641,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人先完成认知校准，再进入技能训练，以减少重复解释成本。",
      "作为一名设计总监，我希望系统提前告诉新人什么是正确心态、什么是错误心态，降低带教压力。",
      "测评信息：预期独立谈单周期、收入期望、沟通能力评分、抗压评分、学习主动性评分、协同意愿评分"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0224",
    "title": "客户需求深化与挖掘模块-PRD",
    "sourceFile": "05-客户需求深化与挖掘模块-PRD.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/05-客户需求深化与挖掘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "设计方案讲解",
      "会审协同",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:34:35.962Z",
    "charCount": 2428,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人设计师能通过模拟场景练习需求挖掘能力。",
      "- 问诊清单分类：基础信息、家庭结构、生活习惯、风格偏好、预算区间、户型痛点、空间重点",
      "设计师需要掌握\"需求问诊\"的方法，快速判断客户类型、预算区间、风格偏好与空间重点需求。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求深化与挖掘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0255",
    "title": "社群运营与活跃度管理模块-PRD",
    "sourceFile": "06-社群运营与活跃度管理模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/06-社群运营与活跃度管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "岗位边界",
      "资源开拓",
      "转化复盘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:37:29.336Z",
    "charCount": 2533,
    "evidenceSnippets": [
      "- 模拟群数据展示（群人数、链接率、转化率、最近运营内容）",
      "**模块目标**：帮助运营人员掌握群运营节奏、学会判断群活跃度、掌握不同阶段的运营策略，提升社群运营效率。",
      "**数据不足**：当群人数或链接数据不足时，提示\"数据不足，无法判断\"。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：社群运营与活跃度管理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0256",
    "title": "KOC招募与激励管理模块-PRD",
    "sourceFile": "07-KOC招募与激励管理模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/07-KOC招募与激励管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "资源开拓",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:38:14.860Z",
    "charCount": 3162,
    "evidenceSnippets": [
      "**模块目标**：帮助运营人员掌握KOC的识别标准、招募渠道、激励政策、协作方式，提升KOC管理效率，扩大社群覆盖。",
      "根据访谈，KOC（关键意见消费者）是群人数增长的**核心驱动力**，但当前存在以下问题：",
      "作为一名运营专员，我希望知道如何识别和招募KOC，快速扩大社群覆盖。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：KOC招募与激励管理模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0258",
    "title": "活动策划与执行模块-PRD",
    "sourceFile": "09-活动策划与执行模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/09-活动策划与执行模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "转化复盘",
      "指标异常判断",
      "岗位边界",
      "社群SOP",
      "客户接待闭环",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:39:46.708Z",
    "charCount": 3423,
    "evidenceSnippets": [
      "| 数据指标 | 链接率达50%-60% | 客户活跃度高，适合进行活动 |",
      "根据访谈，活动运营是社群运营的重要环节，但当前存在以下问题：",
      "**模块目标**：帮助运营人员掌握活动触发条件、策划流程、物料准备、执行步骤、复盘方法，提升活动运营能力。"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：活动策划与执行模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0261",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "12-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/12-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:42:05.770Z",
    "charCount": 3620,
    "evidenceSnippets": [
      "背景：你刚入职运营助理，负责阳光小区的社群运营。今天是周一，你需要完成上周的数据统计工作。",
      "3. 建议应更具体，如\"建议加大对销售的话术培训\"、\"建议组织样板间参观活动\"",
      "1. 链接率计算公式：添加客户数/群人数，本题应为53.6%"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与实战复盘模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0328",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "新人培养与考核",
      "指标异常判断",
      "小红书获客",
      "转化复盘",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "社群运营推进",
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:25:15.680Z",
    "charCount": 3215,
    "evidenceSnippets": [
      "- **线上化功能描述**:系统提供数据录入看板(加微信数、订单数、邀约数)、自动汇总统计、周报生成与分享功能,提升数据管理效率。",
      "本大纲基于《李云翠销售》访谈内容,将小区群运营销售的实际工作流程转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "- **对应线下流程**:销售通过手机记录加微信、订单、邀约数据,周会口头汇报,店长手工汇总,效率低且易遗漏。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0331",
    "title": "客户需求诊断与案例匹配模块-PRD",
    "sourceFile": "05-客户需求诊断与案例匹配模块-PRD.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/05-客户需求诊断与案例匹配模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "需求挖掘",
      "社群SOP",
      "指标异常判断",
      "报价推进",
      "新人培养与考核",
      "资源开拓"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户追问价格",
      "新人入门考核",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:28:33.146Z",
    "charCount": 4537,
    "evidenceSnippets": [
      "1. 销售输入客户信息(小区、户型、面积、改造需求、风格偏好、预算)",
      "解决销售在客户需求诊断时\"缺少系统方法、案例分散、不同设计师案例不共享、价格信息难获取\"的问题,帮助销售快速精准诊断客户需求、匹配同户型案例、获取价格参考,提升专业度与客户信任。",
      "1. 销售与客户沟通,了解户型、面积、改造需求、装修风格偏好、预算范围"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求诊断与案例匹配模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0343",
    "title": "群风控与危机处理模块-PRD",
    "sourceFile": "08-群风控与危机处理模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/08-群风控与危机处理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "客诉处理",
      "指标异常判断",
      "资源开拓",
      "客户接待闭环",
      "新人培养与考核"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T10:01:50.765Z",
    "charCount": 2483,
    "evidenceSnippets": [
      "**模块目标**：帮助小区运营人员识别群运营风险场景，掌握危机处理话术与流程，降低运营风险。",
      "其中客户投诉是最紧张的风控场景，处理不当可能引发群体负面情绪。因此，系统需要帮助学员建立\"识别-处理-预防\"的风控能力。",
      "**适用对象**：小区运营助理、门店销售、店长、新入职运营人员"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：群风控与危机处理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0345",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "转化复盘",
      "需求挖掘",
      "小红书获客"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户追问价格",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:17:59.739Z",
    "charCount": 7092,
    "evidenceSnippets": [
      "受访者指出,当前社群运营数据(链接率、转化率、进群基数)与销售跟进客户**没有直接关系**,因为:",
      "受访者强调,**50%至70%的签单来自交房前3个月至交房期间**,这是转化最密集的时间节点。",
      "受访者明确表示,如果企业微信开放功能,最想看到以下数据:"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：清洗后的知识库文档",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0353",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "转化复盘",
      "资源开拓",
      "新人培养与考核",
      "会审协同"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:24:04.599Z",
    "charCount": 2710,
    "evidenceSnippets": [
      "2. **功能模块大纲**:将线下小区社群运营流程转化为可线上化的培训与管理模块。",
      "| 核心角色 | 门店销售管理、客户接待、成交推进 | 小区社群运营、数据统计、活动策划 |",
      "与销售店长的角色不同,运营专员更侧重于**社群运营策略、数据管理、活动策划**等统筹性工作。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：README",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0446",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/AI培训系统项目推进会/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "社群SOP",
      "报价推进",
      "高客单成交",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:36:46.944Z",
    "charCount": 4716,
    "evidenceSnippets": [
      "本大纲基于《4.10下午四点半会议记录》访谈内容,将拉米公司线下培训、代练、设计师协同、社群运营等经验,转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "- **线上化功能描述**:系统提供群聊信息获取、用户新增数量统计、客服/员工加入人数统计、社群运营看板、客户持续跟进提醒、客户重新激活提醒等功能,可视化推进小区运营(从搞活动到成交长达半年甚至一年)。",
      "- **对应线下流程**:老用户在装修完成后社群不活跃,缺少激活机制;拉米门店空间可做中高端生活体验空间,推大单品、二次装修、面板更新等业务。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0484",
    "title": "小区运营流程与社群管理",
    "sourceFile": "小区运营流程与社群管理.txt",
    "relativePath": "小区运营流程与社群管理.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "报价推进",
      "小红书获客",
      "转化复盘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户追问价格",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.657Z",
    "charCount": 11164,
    "evidenceSnippets": [
      "来验证我们活跃度的话。说实在的社群的活跃度整体来说按照我们所想的肯定是活跃，越活越好，但是都不会那么高。对我们验证这个群的一个优势更多的是一新增客户数，二是添加通过的客户的微信数，来去验证这个群的一个有效性和运营的这种结果。因为你想要通过，因为现在的客户都很对他不可能天天守着这个板块跟你去互动。所以说互动数的话不是我们想象那么高。但是我们大部分是通过添加客户，有新的客户加入我们的群里面，这说明你的运营内容是吸引了部分客户的加入。第二个是",
      "这个会有点难，为什么呢？因为像客户加了过后是要去跟踪的那一个账号加了之后他会怎么去跟踪？对我们家的这个动作这个是可以做，但后续的推进就有点难了。对，因为我们是要邀约到店和转化的对，但是只不过是可能是打比方，我们运营的这种小区的社群会有一个主运营人，就是我们俗称的小区的网红。这个网红的基本上他添加客户数的通过数量总和是比其他的人要高。对，但是没办法说是也是他一个人家。",
      "我们这边的话是这样子的，曾经我们现在这个部门上面是有两组人。第一个是小区开拓，一个是小区运营。这小区开拓的这个人，他是先把资源开拓，就是建立我们新群，建好资源之后，由总这边的领导这边统一分配到各个门店，各个门店的人承接好对应的。他们的销售和店长就会入驻到这个群内。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：小区运营流程与社群管理",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0052",
    "title": "小区开发与客户管理模块-PRD",
    "sourceFile": "06-小区开发与客户管理模块-PRD.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/06-小区开发与客户管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "需求挖掘",
      "指标异常判断",
      "高客单成交",
      "转化复盘",
      "新人培养与考核"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户首次进店",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:16:22.616Z",
    "charCount": 4519,
    "evidenceSnippets": [
      "整合小区信息和客户管理功能,帮助销售快速掌握小区开发技巧,有效管理客户资源,提升客户转化率。",
      "1. **小区信息分散**: 小区信息分散在APP、小红书、客户聊天等多渠道,收集整理效率低",
      "3. **新人小区开发难**: 缺乏标准化的小区开发流程和指导"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区开发与客户管理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0254",
    "title": "社群数据统计与看板模块-PRD",
    "sourceFile": "05-社群数据统计与看板模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/05-社群数据统计与看板模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "转化复盘",
      "岗位边界",
      "客户接待闭环",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:36:54.992Z",
    "charCount": 2452,
    "evidenceSnippets": [
      "- 每周统计清单卡片（社群人数更新、签单数、QC数量、样板间数量）",
      "统计数据：日期、小区、群人数、新增人数、添加微信数、红包金额、直播观看数",
      "作为一名运营专员，我希望通过看板快速识别数据异常的小区或销售，及时干预。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：社群数据统计与看板模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0257",
    "title": "销售协同与数据赋能模块-PRD",
    "sourceFile": "08-销售协同与数据赋能模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/08-销售协同与数据赋能模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "会审协同",
      "岗位边界",
      "转化复盘",
      "客户接待闭环",
      "需求挖掘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "社群运营推进",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:38:57.875Z",
    "charCount": 3429,
    "evidenceSnippets": [
      "| 展厅参观 | 无活动时 | \"我们店刚换了新样板，很符合你们小区的户型风格，可以来看看\" |",
      "**模块目标**：帮助运营人员掌握客户分配流程、数据追踪方式、卡点识别方法、干预策略，提升运营与销售的协同效率。",
      "`进入模块` → `学习客户分配流程` → `学习数据追踪方法` → `学习卡点识别` → `学习干预策略` → `学习邀约话术` → `模拟协同案例` → `完成阶段测验`"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：销售协同与数据赋能模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0292",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "需求挖掘",
      "小红书获客",
      "转化复盘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:18:06.753Z",
    "charCount": 2874,
    "evidenceSnippets": [
      "- **对应线下流程**：销售通过小红书账号、小区群、自然进店等多种渠道获取客户，但各渠道客户信息分散，缺乏统一管理和跟进记录。",
      "- **线上化功能描述**：系统整合小区信息、户型方案、群运营数据、直播数据、客户行为数据，提供可视化看板，支持多维度筛选和分析。",
      "- **对应线下流程**：销售在直播或运营后，按名单均分群成员，逐一添加微信，未通过的换人换方式再次添加，需要统计添加率和转化率。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：功能模块大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0329",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "报价推进",
      "板材产品解释",
      "需求挖掘",
      "小红书获客",
      "指标异常判断"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户追问价格",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:26:17.867Z",
    "charCount": 4236,
    "evidenceSnippets": [
      "- 内容项:加微信数据记录方法、订单数据统计规范、邀约数据统计口径、周会汇报内容",
      "- 来源依据:原文07:29\"他们会找你比方说现在加微信的数据,订单的数据,邀约到店的数据,基本上就是这些数据了\"",
      "- 关联案例:销售发送小区进度、尺寸资料吸引客户添加微信,早期群通过率高于晚期群"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：知识库大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0333",
    "title": "AI话术辅助与知识检索模块-PRD",
    "sourceFile": "07-AI话术辅助与知识检索模块-PRD.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/07-AI话术辅助与知识检索模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "板材产品解释",
      "报价推进",
      "转化复盘",
      "审单防错"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户追问价格",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:30:47.040Z",
    "charCount": 4778,
    "evidenceSnippets": [
      "1. 客户通过企业微信或个人微信提问(产品问题、工艺问题、活动政策、案例价格等)",
      "解决销售在客户沟通中\"专业回复不足、产品知识分散、活动政策查找慢、案例价格信息难获取\"的问题,通过AI辅助快速生成专业回复、检索知识库内容,提升销售专业度与客户信任,减少\"客户不回信息\"痛点。",
      "2. AI分析问题类型并检索知识库(产品知识、工艺知识、活动政策、案例价格)"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：AI话术辅助与知识检索模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0335",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "转化复盘",
      "新人培养与考核",
      "需求挖掘",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "新人入门考核",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:32:45.725Z",
    "charCount": 3371,
    "evidenceSnippets": [
      "2. **功能模块大纲**:将小区群运营销售工作流程转化为可线上化的培训模块",
      "受访者为小区团购群运营销售,负责小区群的日常运营、客户挖掘、邀约到店与成交转化工作。",
      "| 重点能力 | 客户接待、需求诊断、异议处理、报价成交 | 群运营、客户挖掘、邀约话术、AI辅助 |"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0351",
    "title": "销售培训与案例库模块-PRD",
    "sourceFile": "07-销售培训与案例库模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/07-销售培训与案例库模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:22:43.148Z",
    "charCount": 2887,
    "evidenceSnippets": [
      "作为一名销售,我希望快速查到某个小区的户型特征、设计案例、样板间案例,不用每次都问运营专员。",
      "`进入系统` → `搜索小区/户型` → `查看案例库` → `学习培训课程` → `完成测评` → `查看学习记录` → `分享给客户`",
      "- 案例基础信息(案例名称、所属小区、户型、面积、预算)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售培训与案例库模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0477",
    "title": "销售客户跟进与社群运营实践访谈",
    "sourceFile": "销售客户跟进与社群运营实践访谈.txt",
    "relativePath": "销售客户跟进与社群运营实践访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "小红书获客",
      "转化复盘",
      "报价推进"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户首次进店",
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.059Z",
    "charCount": 7429,
    "evidenceSnippets": [
      "那我总结一下，相当于你的意思是说我如果开放一个功能，我最好是把那个云屏上，就比如说它的小区地图这个板块，我接入到企业微信，这样的话方便你们快速查找。并且我这个接口的话得及时更新接口的及时更新它的一些相关的一些对应的数据，这样的话有助于你跟进客户或者是签单之类的情况。那这种功能的话，就比如说我举个例子，就比如说我是客户，我现在的话不在你文件，或者说我是刚进来的，我想直接问你我要看这个小区的户型，你就可以直接拿手机给我转而不是到云屏上去找。",
      "像邀约的客户的话，就是一些小红书博客的，包括这种裙运营获客的那我会前期就在微信上已经跟他铺垫好。就比方说的一些我们是有哪些优势也好，或者是我们做的一些方案也会给他看得到。然后他有一定的筛选之后，他才会来跟我展厅面对面去沟通。那我也会继续结合前期的一些铺垫去给他这种规划。然后包括一些更细致的这种材质上的，包括价格上的，还有后期的一些服务上的这种讲解。",
      "行，就现在是我给我可以让给你整个这个样的一个数据，这样的话有助于你的一个签单或者是跟单之类的东西，对吧？那如果说有一个数据看板给到你，就是说针对于这个群里的，你想看到的一些数据是什么？"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：销售客户跟进与社群运营实践访谈",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0039",
    "title": "小区信息掌握与市场拓展模块-PRD",
    "sourceFile": "06-小区信息掌握与市场拓展模块-PRD.md",
    "relativePath": "流程清单/店长访谈销售培训需求/06-小区信息掌握与市场拓展模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "指标异常判断",
      "社群SOP"
    ],
    "sceneTags": [
      "社群运营推进",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:25:52.888Z",
    "charCount": 2889,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售快速掌握门店周边小区信息,学会通过线上线下多种渠道获取小区信息,提升小区业务服务能力(占门店业绩50%-60%)。",
      "**页面目标**:教导新人如何通过多种渠道获取小区信息。",
      "作为一名新人销售,我希望系统告诉我如何获取小区信息,从哪些APP、如何现场勘探、如何与客户沟通。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区信息掌握与市场拓展模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0251",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "新人培养与考核",
      "转化复盘",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:34:48.254Z",
    "charCount": 2724,
    "evidenceSnippets": [
      "- **线上化功能描述**：通过短课、图文卡片、岗位职责卡、工作日历展示，帮助新人理解运营角色、核心指标、工作节奏与协同关系。",
      "- **线上化功能描述**：系统提供数据采集看板、自动统计模板、异常预警、指标达标判断、多维度对比分析，帮助运营人员快速掌握数据统计方法与问题识别能力。",
      "- **对应线下流程**：运营专员根据小区阶段、交房周期、数据指标判断运营节奏，发布内容、组织活动、激活客户。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：功能模块大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0260",
    "title": "群异常处理与危机应对模块-PRD",
    "sourceFile": "11-群异常处理与危机应对模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/11-群异常处理与危机应对模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "客诉处理",
      "社群SOP",
      "岗位边界",
      "转化复盘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:41:11.328Z",
    "charCount": 3516,
    "evidenceSnippets": [
      "**模块目标**：帮助运营人员掌握群异常识别、处理流程、话术模板、升级路径，提升危机应对能力。",
      "`进入模块` → `学习异常类型` → `学习处理流程` → `学习话术模板` → `学习升级路径` → `学习数据异常处理` → `模拟危机应对` → `完成阶段测验`",
      "| 群活跃度低 | 无互动持续1周 | 发布话题、组织活动、KOC协助 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：群异常处理与危机应对模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0297",
    "title": "客户跟进与转化模块-PRD",
    "sourceFile": "07-客户跟进与转化模块-PRD.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/07-客户跟进与转化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "转化复盘",
      "社群SOP",
      "指标异常判断",
      "客户接待闭环",
      "高客单成交",
      "资源开拓"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:21:38.215Z",
    "charCount": 2723,
    "evidenceSnippets": [
      "- 转化漏斗图(新增→初步接触→有意向→高意向→谈判中→已成交)",
      "**模块目标**:帮助销售系统化跟进客户,提升客户转化率和成交效率。",
      "`进入客户跟进` → `查看跟进任务` → `选择客户` → `执行跟进` → `记录跟进结果` → `更新客户状态` → `查看转化漏斗`"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：客户跟进与转化模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0049",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "岗位边界",
      "资源开拓",
      "客诉处理",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:10:14.443Z",
    "charCount": 6381,
    "evidenceSnippets": [
      "| **售后与问题解决模块** | 培训类-实战案例、公司规范类-客诉处理流程 |",
      "2. **小区开发指南**: 小区信息获取渠道、开发流程",
      "| **小区开发与客户管理模块** | 培训类-小区开发、公司规范类-客户服务规范 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0050",
    "title": "人员选拔与入职模块-PRD",
    "sourceFile": "04-人员选拔与入职模块-PRD.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/04-人员选拔与入职模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "岗位边界",
      "客诉处理",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:12:39.003Z",
    "charCount": 6217,
    "evidenceSnippets": [
      "2. **培训周期长**: 小区信息分散,新人学习效率低",
      "辅助HR在面试环节筛选性格合适的销售人员,并帮助新人快速融入团队,缩短培训周期。",
      "│ ├─ 性格特质分析(如外向性、责任心、情绪稳定性等)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：人员选拔与入职模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0067",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "资源开拓",
      "社群SOP"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:58:07.000Z",
    "charCount": 3024,
    "evidenceSnippets": [
      "| 老板 | 核心成交、报价决策、折扣审批、渠道资源提供 |",
      "本次访谈围绕**加盟门店培训与直营店培训的差异**展开，受访者为培训负责人。核心议题包括培训周期、培训形式、内容差异、人员管理、报价体系、线上渠道等多个维度。",
      "*关键特点**：销售助理负责前期服务与需求挖掘，但最终报价、签单、折扣等核心环节仍需老板出面。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0076",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "资源开拓",
      "需求挖掘",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "订单下单前",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:40:34.003Z",
    "charCount": 3116,
    "evidenceSnippets": [
      "**销售人员**：承接老板渠道资源，负责前期客户服务与产品推荐；",
      "**老板/店长**：负责压单、报价、折扣谈判、核心成交推进；",
      "**[培训时长数据]**：原文中\"线下13年\"\"7+10\"等表述存在歧义，建议确认具体培训天数；"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0104",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "资源开拓",
      "小红书获客",
      "社群SOP",
      "岗位边界",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "社群运营推进",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:17:27.192Z",
    "charCount": 5650,
    "evidenceSnippets": [
      "2. **主动性**:是否愿意主动开拓客户,如通过小区渠道、异业关系等方式获取足够客源;",
      "**[小区运营细节]**:原文提到\"运营专员\"\"运营助理\"等角色,具体职责分工建议补充;",
      "5. **话术传授**:分享品牌优势话术、邀约客户进店话术、订单流程铺垫话术;"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0105",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "资源开拓",
      "社群SOP",
      "需求挖掘",
      "小红书获客",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "社群运营推进",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:18:32.187Z",
    "charCount": 4293,
    "evidenceSnippets": [
      "- **对应线下流程**:店长教如何开拓客户、如何邀约客户进店、如何通过小区渠道和异业关系获取客源,但主要靠口头传授和手机示范。",
      "- **线上化功能描述**:系统提供客户开拓方法库(小区、异业、老客户转介绍)、邀约话术模板、微信沟通脚本库、案例库检索工具,帮助新人掌握客源获取方法。",
      "- **线上化功能描述**:系统提供小区运营SOP、社群运营话术库、案例智能检索(解决微盘检索不准问题)、KOC培养方法、直播内容管理、运营效果评估工具。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0106",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "板材产品解释",
      "小红书获客",
      "高客单成交"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "社群运营推进",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:20:16.085Z",
    "charCount": 6806,
    "evidenceSnippets": [
      "- 来源依据:原文第4章\"用什么样的方式更容易邀约到客户进店\"",
      "- 来源依据:原文第2章\"他愿意出去比如说小区渠道也好,或者说是发动异业的关系也好\"",
      "- 关联案例:自然客流20%、小区渠道与老客户为主、网单不足10%"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0109",
    "title": "客户开拓与邀约模块-PRD",
    "sourceFile": "06-客户开拓与邀约模块-PRD.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/06-客户开拓与邀约模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "小红书获客",
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:22:43.077Z",
    "charCount": 2951,
    "evidenceSnippets": [
      "**模块目标**:让新人销售掌握客户开拓方法(小区渠道、异业关系、老客户转介绍)、邀约客户进店话术、微信沟通技巧,学会\"抛钩子\"吸引客户互动,解决客源问题。",
      "作为新人销售,我希望系统告诉我如何开拓客户、如何邀约客户进店,而不是等店长口头指导。",
      "`选择开拓渠道` → `学习开拓方法` → `学习邀约话术` → `模拟微信沟通` → `系统评估反馈` → `完成场景考核` → `获取改进建议`"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：客户开拓与邀约模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0112",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "资源开拓",
      "需求挖掘",
      "报价推进",
      "小红书获客",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户追问价格",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:24:48.025Z",
    "charCount": 2406,
    "evidenceSnippets": [
      "4. **邀约方法不清晰**:不知道如何开拓客户、如何邀约进店。",
      "原因:这6个模块直接覆盖新人从\"认知建立→客户接待→客户开发→产品掌握→报价能力→能力考核\"的完整最小闭环,且直接回应了李晨店长提到的新人核心痛点。",
      "2. **功能模块大纲**:将线下销售带教与训练流程转化为可线上化的培训模块。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0153",
    "title": "方案会审模拟与实战复盘模块-PRD",
    "sourceFile": "08-方案会审模拟与实战复盘模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/08-方案会审模拟与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "ops_manager"
    ],
    "competencyTags": [
      "会审协同",
      "转化复盘",
      "需求挖掘",
      "新人培养与考核",
      "设计方案讲解",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "运营复盘看板",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:29:45.074Z",
    "charCount": 2216,
    "evidenceSnippets": [
      "`选择方案案例` → `进入会审模拟` → `应对连续追问` → `获得评分与反馈` → `查看成长报告` → `解锁下一阶段`",
      "**模块目标**：帮助设计师通过模拟方案会审场景，提升方案讲解和应变能力，形成\"设计-讲解-应对\"的完整闭环。",
      "当前问题：会审依赖资深设计师时间，新人无法随时进行训练。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：方案会审模拟与实战复盘模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0239",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "11-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/11-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "报价推进",
      "指标异常判断",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户追问价格",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:41:14.967Z",
    "charCount": 3538,
    "evidenceSnippets": [
      "增加\"视频答题\"功能,让新人录制接待视频,由AI或店长评分",
      "帮助新入职销售人员通过闯关任务与实战复盘验证学习成果,系统化评估能力短板,并生成个性化提升建议,建立从\"学习→练习→考核→复盘→提升\"的完整闭环。",
      "**页面目标**: 让新人记录真实客户接待案例,形成个人经验库。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与实战复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0018",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/电商设计审单培训需求会/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "非标下单底线",
      "审单防错",
      "量尺出图",
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断"
    ],
    "sceneTags": [
      "订单下单前",
      "新人入门考核",
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:10:14.587Z",
    "charCount": 4661,
    "evidenceSnippets": [
      "2. **签字图纸审核**：导购填写签字 → 设计师按图纸下单 → 审单核对一致性",
      "3. **软件结构审核**：颜色 + 尺寸 + 工艺要求 + 非标判断 + 电器尺寸",
      "1. **测量底单审核**：尺寸 + 现场结构 + 障碍物"
    ],
    "generatedTask": {
      "courseTitle": "非标下单底线：清洗后的知识库文档",
      "practicePrompt": "围绕“订单下单前”，让学员用自己的话完成一次非标下单底线表达。",
      "assessmentFocus": "检查学员是否能说清非标下单底线的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0019",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/电商设计审单培训需求会/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "审单防错",
      "非标下单底线",
      "量尺出图",
      "指标异常判断",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "订单下单前",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:11:33.056Z",
    "charCount": 5336,
    "evidenceSnippets": [
      "*探讨点：** 是否需要开发移动端数据看板，方便销售人员随时查看个人业绩？",
      "*对应线下流程：** 新人通过商学院培训学习三维家基础操作，但产品库庞大、查找效率低，实际操作中容易出错。",
      "*对应线下流程：** 设计规范文档存在，但新人培训后容易遗忘，实际工作中频繁出现违规设计。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0024",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "非标下单底线",
      "审单防错",
      "客诉处理",
      "量尺出图",
      "新人培养与考核",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
      "订单下单前",
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:41:42.011Z",
    "charCount": 3747,
    "evidenceSnippets": [
      "3. 软件结构审核:颜色尺寸、工艺要求、非标识别、电器尺寸",
      "4. **设计师培训负责人:** 全案设计师培训由总部负责,门店设计师培训由门店设计总监负责,需确认是否有统一的培训标准和考核体系?",
      "门店销售个人小红书账号内容更丰富,包括小区勘探、客户落地实拍等"
    ],
    "generatedTask": {
      "courseTitle": "非标下单底线：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次非标下单底线表达。",
      "assessmentFocus": "检查学员是否能说清非标下单底线的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0025",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "非标下单底线",
      "客诉处理",
      "审单防错",
      "新人培养与考核",
      "量尺出图",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "订单下单前",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:42:56.561Z",
    "charCount": 5029,
    "evidenceSnippets": [
      "**数据看板训练:** 培训督导快速解读数据指标,识别异常值",
      "审单人员根据公司工艺规范和经验,逐一检查图纸尺寸、结构、颜色等,发现问题与设计师沟通。",
      "**常见测量错误案例库:** 收集尺寸偏差、遗漏障碍物等实际案例,分析错误原因"
    ],
    "generatedTask": {
      "courseTitle": "非标下单底线：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次非标下单底线表达。",
      "assessmentFocus": "检查学员是否能说清非标下单底线的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0026",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "客诉处理",
      "量尺出图",
      "非标下单底线",
      "审单防错",
      "新人培养与考核",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "订单下单前",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:44:55.840Z",
    "charCount": 8166,
    "evidenceSnippets": [
      "- 来源依据:原文\"像审单的话,其实主要审核它的颜色尺寸,还有工艺的具体结构,这些三个板块对于售后来说,其实造成的损失都是相对来说比较大的\"",
      "- 内容项:颜色尺寸、工艺要求、非标识别、电器尺寸等检查要点",
      "- 关联案例:颜色尺寸工艺结构对售后损失最大,是重点把控内容"
    ],
    "generatedTask": {
      "courseTitle": "客诉处理：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次客诉处理表达。",
      "assessmentFocus": "检查学员是否能说清客诉处理的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0029",
    "title": "设计师全流程培训模块-PRD",
    "sourceFile": "06-设计师全流程培训模块-PRD.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/06-设计师全流程培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客诉处理",
      "审单防错",
      "非标下单底线",
      "指标异常判断",
      "量尺出图"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户方案会审",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:50:09.770Z",
    "charCount": 9152,
    "evidenceSnippets": [
      "| 测量错误率 | 占售后1/3 | 降低50% | 月度 |",
      "通过视频教程、错误案例库、虚拟测量训练,提升设计师测量准确率。",
      "- 测量错误时提示(如\"测量位置不正确,请选择三点测量\")"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师全流程培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0030",
    "title": "审单效率提升模块-PRD",
    "sourceFile": "07-审单效率提升模块-PRD.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/07-审单效率提升模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "审单防错",
      "非标下单底线",
      "指标异常判断",
      "量尺出图",
      "客诉处理",
      "新人培养与考核"
    ],
    "sceneTags": [
      "订单下单前",
      "运营复盘看板",
      "客户追问价格",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:51:56.736Z",
    "charCount": 8230,
    "evidenceSnippets": [
      "- 问题类型分布(饼图):尺寸错误40%,颜色错误30%,结构错误30%",
      "| 审单人员培训周期 | 未知 | 缩短50% | 季度 |",
      "将审单标准、常见错误、典型案例转化为可检索的知识库,支持审单人员快速查询。"
    ],
    "generatedTask": {
      "courseTitle": "审单防错：审单效率提升模块-PRD",
      "practicePrompt": "围绕“订单下单前”，让学员用自己的话完成一次审单防错表达。",
      "assessmentFocus": "检查学员是否能说清审单防错的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0138",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "非标下单底线",
      "量尺出图",
      "需求挖掘",
      "审单防错"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:45:46.487Z",
    "charCount": 4251,
    "evidenceSnippets": [
      "**来源依据**：\"目前在做基础类设计规范，如板件使用规范尺寸、面板上下标准流控等\"",
      "**来源依据**：\"目前在做基础类设计规范，如板件使用规范尺寸\"",
      "**来源依据**：\"计划本月10号开始培训，并纳入商学院新人培训\""
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0142",
    "title": "客户沟通与需求诊断培训模块-PRD",
    "sourceFile": "07-客户沟通与需求诊断培训模块-PRD.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/07-客户沟通与需求诊断培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "报价推进",
      "设计方案讲解",
      "审单防错"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户追问价格",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:50:08.699Z",
    "charCount": 5791,
    "evidenceSnippets": [
      "解决设计师对客户氛围感等抽象需求理解不足、沟通缺乏技巧、设计方案反复修改的问题。通过系统化的沟通培训、案例库和场景模拟练习，提升设计师的客户需求诊断能力和沟通技巧，提高成单率。",
      "- 清单项列表（空间需求、风格偏好、预算范围、时间要求等）",
      "- 场景类型标签（初次沟通、需求确认、异议处理、方案讲解）"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户沟通与需求诊断培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0145",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师_原文名/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "报价推进",
      "需求挖掘",
      "新人培养与考核",
      "量尺出图",
      "客诉处理",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户方案会审",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:28:29.265Z",
    "charCount": 3833,
    "evidenceSnippets": [
      "- 内容项:设计师工作全流程(出图、沟通、测量、安装、售后)、成长周期、能力要求、常见误区",
      "- 来源依据:访谈中关于\"出图、跟客户线上沟通、跑现场测量、现场安装、售后处理\"的描述",
      "- 关联案例:客户质疑价格贵时,从用料、覆膜、工艺细节讲解,并带客户去展厅看落地效果"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0149",
    "title": "设计师入职与职业认知模块-PRD",
    "sourceFile": "04-设计师入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/04-设计师入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "会审协同",
      "设计方案讲解",
      "客户接待闭环",
      "岗位边界"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:27:50.640Z",
    "charCount": 2581,
    "evidenceSnippets": [
      "**模块目标**：帮助新人设计师在进入培训系统的第一阶段建立正确的行业认知、成长预期和协同意愿，减少只会画图不会谈单、不了解销售配合逻辑等问题。",
      "对与销售的协同关系理解不清，不知道需求交接和方案会审的重要性；",
      "作为一名培训负责人，我希望新人先理解与销售的协同关系，再进入技能训练。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0150",
    "title": "方案设计与讲解技巧模块-PRD",
    "sourceFile": "05-方案设计与讲解技巧模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/05-方案设计与讲解技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "设计方案讲解",
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:28:19.917Z",
    "charCount": 2214,
    "evidenceSnippets": [
      "`选择户型案例` → `学习需求诊断方法` → `完成方案设计训练` → `练习方案讲解` → `模拟客户质询` → `获得评分与反馈`",
      "**模块目标**：帮助新人设计师掌握从需求理解到方案设计再到方案讲解的完整流程，提升方案说服力和成交转化率。",
      "作为一名新人设计师，我希望学会如何从客户需求出发设计方案，并清晰讲解设计亮点。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：方案设计与讲解技巧模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0168",
    "title": "客户意向收集与分析模块-PRD",
    "sourceFile": "05-客户意向收集与分析模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/05-客户意向收集与分析模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "设计方案讲解",
      "报价推进",
      "客户接待闭环",
      "新人培养与考核",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户首次进店",
      "客户追问价格",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:36:56.884Z",
    "charCount": 2680,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师在出方案前系统化收集客户风格偏好、生活习惯、空间需求等信息，生成客户画像与设计方向建议，减少方案方向偏差与返工。",
      "作为一名培训负责人，我希望新人设计师能够快速掌握客户意向收集的方法。",
      "客户基础信息：姓名、联系方式、地址、户型、面积、房屋状态、预算"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户意向收集与分析模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0169",
    "title": "方案会审与多角色评审模块-PRD",
    "sourceFile": "06-方案会审与多角色评审模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/06-方案会审与多角色评审模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "会审协同",
      "设计方案讲解",
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:37:32.080Z",
    "charCount": 2656,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望沉淀优秀案例与评审标准，用于新人培训。",
      "**模块目标**：将线下方案会审流程线上化，支持设计总监、销售店长等多角色在线评审，提高评审效率，沉淀评审标准与优秀案例。",
      "**适用对象**：全屋定制设计师、设计总监、销售店长、培训负责人"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：方案会审与多角色评审模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0184",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "报价推进",
      "需求挖掘",
      "会审协同",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户追问价格",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:36:31.683Z",
    "charCount": 4928,
    "evidenceSnippets": [
      "**来源依据**: \"这个培训体系需要的东西...新人进来之后,他没有太多的试错内容,但是有很多学习的一个过程...他每一步的动作其实都是慢慢在往销冠的这个状态里面靠\"",
      "**来源依据**: \"很多东西我们压根就做不出来...像现在什么海派轻奢老前锋的那些很多圆弧类的那种木纹木皮的那些东西,我们也没有这种模块去满足客户需求的\"",
      "**关联案例**: 客户分别问销售和设计师价格问题,试图套话"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0187",
    "title": "智能方案讲解辅助模块-PRD",
    "sourceFile": "06-智能方案讲解辅助模块-PRD.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/06-智能方案讲解辅助模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:38:54.958Z",
    "charCount": 3171,
    "evidenceSnippets": [
      "**模块目标**: 帮助设计师高效讲解方案,确保客户理解设计思路,提升方案讲解转化率",
      "作为一名新人设计师,我希望实时获得话术提示,提升讲解专业度",
      "`选择方案` → `生成讲解大纲` → `关联客户需求` → `开始讲解` → `实时话术提示` → `记录客户反馈` → `讲解完成归档`"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：智能方案讲解辅助模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0188",
    "title": "异议智能响应模块-PRD",
    "sourceFile": "07-异议智能响应模块-PRD.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/07-异议智能响应模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:39:39.681Z",
    "charCount": 3001,
    "evidenceSnippets": [
      "能力边界: 需求ID、需求描述、无法实现原因、技术限制、替代建议",
      "**页面目标**: 明确告知客户哪些需求无法实现,避免过度承诺",
      "**能力边界查询失败**: 提示联系技术部门,记录待确认问题"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：异议智能响应模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  }
];
