import type { LearnerRole } from "../context/AppContext";

export type LearningKnowledgeUse = "qna" | "course" | "practice" | "assessment" | "retrain";
export type LearningKnowledgePriority = "high" | "medium" | "low";
export type LearningKnowledgeSourceKind = "raw_transcript" | "structured_markdown" | "process_document";

export interface GeneratedLearningTask {
  courseTitle: string;
  practicePrompt: string;
  assessmentFocus: string;
  targetRoles: LearnerRole[];
}

export interface GeneratedLearningKnowledgeEntry {
  id: string;
  title: string;
  sourceFile: string;
  relativePath: string;
  sourceKind: LearningKnowledgeSourceKind;
  learnerRoles: LearnerRole[];
  competencyTags: string[];
  sceneTags: string[];
  suggestedUses: LearningKnowledgeUse[];
  priority: LearningKnowledgePriority;
  sourceUpdatedAt: string;
  charCount: number;
  evidenceSnippets: string[];
  generatedTask: GeneratedLearningTask;
}

export const generatedLearningKnowledgeMeta = {
  "sourceRoot": "D:/AI课程/4-17会议文档/1.提取文本",
  "generatedAt": "2026-05-21T03:48:55.105Z",
  "entryCount": 494,
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

export const generatedLearningKnowledgeEntries: GeneratedLearningKnowledgeEntry[] = [
  {
    "id": "lk-0001",
    "title": "电商部门业务情况调研",
    "sourceFile": "电商部门业务情况调研.txt",
    "relativePath": "电商部门业务情况调研.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "资源开拓",
      "岗位边界",
      "指标异常判断",
      "社群SOP",
      "高客单成交",
      "小红书获客"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-14T09:17:40.055Z",
    "charCount": 2285,
    "evidenceSnippets": [
      "音频聚焦电商部门工作，围绕电商渠道业务、数据采集分析、客户跟进协作等方面展开讨论，明确了各环节工作内容、职责及后续计划，内容如下：",
      "多平台获客：电商通过天猫、大众点评、抖音、小红书等渠道获客，其中天猫流量最多。小红书获客成本主要是推广投流费用，目前导购个人小红书引流效果好，但相关数据统计方式待完善。",
      "团购群数据：企业微信外部群通过客服植入和会话归档采集信息。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：电商部门业务情况调研",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0002",
    "title": "电商设计审单培训需求会",
    "sourceFile": "电商设计审单培训需求会.txt",
    "relativePath": "电商设计审单培训需求会.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "审单防错",
      "资源开拓",
      "转化复盘",
      "指标异常判断"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-14T09:17:40.023Z",
    "charCount": 41421,
    "evidenceSnippets": [
      "因为我们我们全安的设计师，我们李老师那边大宅别墅的，他的一个沟通思路不一样的。然后小区比如说有小区活动，或者是个体的客户，或者是整个一个楼盘整个的一个操作，它的一个要求都不一样，他可能表现需求的一个方式也不一样。然后还有一个就是新人过度，他是性能过度，放在我们这其实是更快的融入我们的公司的一个运营模式，是这样。然后主要想强调的就是，其实我们这边的一个方式，不单单是一个赋能的一个工作，其实更多的是一个辅助和衔接的一个工作，也有一个有一定的",
      "我的岗位是网单督导的职责，相当于是总部电商跟我们前端销售中间的一个桥梁，去分配到门店的的这些订单由我这边去做每个月看做总的一个数据的一个复盘。根据复盘的一个问题，跟门店去做单店或门店网站销售单个人的一个对接去诊断，去看问题出现在哪。然后再从前端反的问题再到我这边。我看通过流程的一个优化，去促进我们整体网单分配下去到我们门店它的一个定签单率交定率有整体的转化率会有提高，就让促进转化率的一个提高，然后中间过程动作有我这边可能会去做干预，去做",
      "老师我补充一下，之前有讲过我们这我们部门也会有，比如说我们设计师入岗之前，会到我们部门进行一个过渡学习，这其实也是一个培训过程对吧？为什么会有新人过渡在我们这边？首先我们在我们这肯定是要学习我们的设计专业的一个知识，对吧？其次是因为我们的相关的一些业务板块跟前端，跟我们全案，还有跟我们小区的一些活动是其实进行一个捆绑的。我们从方案开始，就刚我们李老师讲的全案的一些设计内容，整体的一个表现细则还是在我们部门这边。所以说他那边整体的沟通的一"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：电商设计审单培训需求会",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0003",
    "title": "电商运营设计与售后审单流程",
    "sourceFile": "电商运营设计与售后审单流程.txt",
    "relativePath": "电商运营设计与售后审单流程.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "客诉处理",
      "审单防错",
      "资源开拓",
      "指标异常判断",
      "转化复盘",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-14T09:17:39.964Z",
    "charCount": 41751,
    "evidenceSnippets": [
      "我的岗位是网站督导的职责，相当于是总部电商跟我们前端销售中间的一个桥梁，去分配到门店的的这些订单，由我这边去做每个月看做总的一个数据的一个复盘。根据复盘的一个问题，跟门店去做单店或门店网站销售单个人的一个对接去诊断，去看问题出现在哪。然后再从前端反馈的问题再到我这边。我看通过流程的一个优化，去促进我们整体网单分配下去到我们门店它的一个定签单率交定率，就整体的转化率会有提高，就让他们促进转化率的一个提高。然后中间过程动作有我这边可能会去做",
      "明白，就是说我作为一个销售在中间的时候可能会接到你的电话会跟我说你最近怎么没有承担？对，如果我要对我这个月或者这个季度的综合销售做一个判断，是我得通过我的店长拿到了包括在线渠道、线下门店、平时拓客所有的数据合在一起才能给到我一些评价。",
      "因为我们我们全安的设计师，我们李老师那边大宅别墅的，他的一个沟通思路不一样的。然后小区比如说有小区活动，或者是个体的客户，或者是整个一个楼盘整个的一个操作，它的一个要求都不一样，它可能表现需求的一个方式也不一样。然后还有一个就是性能过度，它是性能不能放在我们这，其实是更快的融入我们的公司的一个运营模式。是这样的。然后主要想强调的就是，其实我们这边的一个方式，不单单是一个赋能的一个工作，其实更多的是一个辅助和衔接的一个工作，也有一个有一定"
    ],
    "generatedTask": {
      "courseTitle": "客诉处理：电商运营设计与售后审单流程",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次客诉处理表达。",
      "assessmentFocus": "检查学员是否能说清客诉处理的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0004",
    "title": "店长访谈销售培训需求",
    "sourceFile": "店长访谈销售培训需求.txt",
    "relativePath": "店长访谈销售培训需求.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "客户接待闭环",
      "客诉处理",
      "社群SOP"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.036Z",
    "charCount": 8546,
    "evidenceSnippets": [
      "就有很强的动力。是然后这些销售的其实现在工作其实也挺挺零碎的。有一部分是线下接待，有一部分是线上获客，然后包括社群的运营。目前有没有一些人员的能力出现差异化？比方说有些人专门就是负责线上语音跟和博客的，到店之后马上就有其他人员接待，有没有这种配合跟组合？",
      "拉业绩客户我们可以找那个APP，比如说小康看房，一房一万，对吧？这些红安家包括很多小红书的一个专门注册一个账号。对我们通过这种进行了解，它的房价、户型？有几个，然后还有通过客户，因为还有就是因为我们现在我们会发展PPC，然后会发展整个客户，我们也会跟客户进行聊，也会获取一些这样的信息。比如说我们在学习勘探的时候，对吧，或者我们去某个楼盘的时候，我们可以也跟那个，比如说打点那个物业人员，或者跟他聊一聊，当前这个楼盘的进度上，通过也是通过一",
      "对，目前就是我们的品牌以及我对门店人员的要求，我觉得他是可以接近全能在平台上，我觉得他应该具备这个不能只是单点的。因为万一比如说很简单，打比方如果他这个板块突然某一天，比如人员有什么变动或者有什么，那我其实我是顶不上来的，我觉得不应该这样子，就应该这个人从技术方面，这个品牌应该从第一到第十，全国社会。至于这个墩板块有没有精，要不要精一点，没关系，我可以带他。或者我品牌的一些一些培训也好，然后的一些文化也好，以及我的一些产品支持也好，我们"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：店长访谈销售培训需求",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0005",
    "title": "店长客户接待技巧与新人培训经验",
    "sourceFile": "店长客户接待技巧与新人培训经验.txt",
    "relativePath": "店长客户接待技巧与新人培训经验.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "需求挖掘",
      "板材产品解释",
      "客诉处理"
    ],
    "sceneTags": [
      "客户首次进店",
      "新人入门考核",
      "客户追问价格",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.642Z",
    "charCount": 12812,
    "evidenceSnippets": [
      "然后我们的板材的环保度也是优于国标的。然后这个点第二个我们就是我们工厂在上海，我们的安装团队都是自由的。然后我们能够在上海五十几家门店能够开起来，包括我们的落地安装有很多户。其实你买到了价格，像你一般性像在上海，基本上小泽差不多买我们的产品的客户群体是基本上四五百万，最低的房价到差不多几千万的那价格贵的话，这种小户型基本上按照他们的装修比例来，基本上我们是按照20%的一个装修比例，精装修就是硬装软装会跟他们分析这种价格你值不值。因为你每",
      "比如说这个东西设计素颜素是比如说仿意大利的，我是仿哪种的，然后包括我搭配这个软装，我是仿分体的还是仿一些比如说玻璃缝的那种感觉的，他们会更多的关注这些设计感。然后的话他们犹豫型的，犹豫型的话其实一个是就是对价格敏感，第二个他对就是环保，第三个他对那个就是我们的售后安装。一般是你看一下大客户不会跟你说我留不留钱，基本上只有小客小众客户他跟你们有没有回款，要全款清存下来，但万一你们跑了怎么办？都会问这种问题。对，所以就是这些客户的话，他前期",
      "第二个就是怎么样对方案是怎么样的一个形式邀约能够预付，成功率比较高。然后接待的刚刚说的接待的场景那个黄金30秒，30秒就是一定是要能坐下来，有户型图的，那么我们会基本上给他做一个预算报价，或者是说跟他聊聊你这个户型的话，哪些是你的痛。好，那你看一下我们是像你遇到这种痛点，其他客户是怎么做的，然后的话就是怎么样去跟高端客户建立平等对话。其实这个的话，其实高端客户的一个是语速平稳，就是一定你是要节奏是慢的，不急躁的。然后的话一定是对这个高端"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：店长客户接待技巧与新人培训经验",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0006",
    "title": "店长人员管理与门店运营需求",
    "sourceFile": "店长人员管理与门店运营需求.txt",
    "relativePath": "店长人员管理与门店运营需求.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "客诉处理",
      "资源开拓",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.632Z",
    "charCount": 5320,
    "evidenceSnippets": [
      "目前我们店是将来一个新人，暂时我们是九个。对，九个。然后目前我们是一个队长，然后人员的话就是可以查的。我们从季度来说，我第一季度的数据出来了，从季度查可以查的，但是他们也不如进入拉米这个时间长短的问题也有他们比如说能做久一点，能够对于。这个客户的一个，比如说我们客户的一些属性也比较清楚，所以可能还有一些老户。然后目前的我第一名的话，比如说我第一可能做两百多。那这个年我只做我们自己的仓库，正在一个厂，在他们平台上。",
      "这边有需要协调的一些动作的话，主要还是由哪方面去去出面去协调。比如说是店长还是销售本身，就是谁的店员谁来跟。是安装这边，如果比如说进小区，对，进小区的问题，可能是产客诉，验收的问题，主要是跟安全相关的怎么样一个处理。",
      "比如说您刚才说的，除了这个督导，其实店面这边销售也要对小区进行一个摸排对。的这个细节。就比如说现在我是一个新人，我从来就从来。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：店长人员管理与门店运营需求",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0007",
    "title": "华拓销售成长经历与培训需求",
    "sourceFile": "华拓销售成长经历与培训需求.txt",
    "relativePath": "华拓销售成长经历与培训需求.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "报价推进",
      "转化复盘",
      "客户接待闭环",
      "板材产品解释"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.007Z",
    "charCount": 14797,
    "evidenceSnippets": [
      "两个我觉得我也我我也会告诉，之前也是可能跟他说公益，然后我还会跟他们讲说，其实首先我们要看的是设计。在设计过程当中，如果说您觉得这样你喜欢这样子一个颜色，但这个颜色可能它不在套餐里面，或者它价格比较高，或者说你喜欢，那我们就尽可能第一找套餐出来来做平替。在不改善你原来套餐的情况之下，我们帮你找一些平替的东西，看你是不是是可以喜欢，或者说你觉得这个价格贵了，然后我用套餐色，用套餐色，如果你觉得我可以也买，也还行，可以喜欢的话，那也可以做，",
      "因为我是去年8月份入职的，当中有一段时间很长的一段时间，他都没有签单，就是隔了很长的一段时间。虽然说在样板间有值班，但是可能那个时候你培训的时候跟实际上去接客户还有一点区别。然后可能我觉得现在包括跟我们现在一些同事他们探讨，可能或多或少都有一个问题，就是对签单就是一滴，很想签单。但是在跟客户的沟通当中，始终就是有这样子一个，就像一个进入了一个死循环里面。其实我该介绍的东西也都介绍了，该逼单的那情况我们也大概逼了，但是就是不能够签单，就是",
      "还有就是我们公司的桔秆，我局改的价格相比这样而言，跟其他的客户比起来，就是其他公司比起来是高的。但是虽然说我们也很想尽力去推荐我们的局改，但你看我们可能去拆一个阳台门要17000左右。对，可能是贵，差不多15000到17000左右。但是别家的牌子只有7000或者6000。但是因为可能刚开始我还不是，虽然说我们也去跟客户去讲了一下我们的一些优势，一些特点。但是对于那些小的，像包括时代之城有一些小户型的一些业主，他就不想要去做这个东西，这是"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：华拓销售成长经历与培训需求",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0008",
    "title": "加盟商培训体系与区域差异化管理",
    "sourceFile": "加盟商培训体系与区域差异化管理.txt",
    "relativePath": "加盟商培训体系与区域差异化管理.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "社群SOP",
      "报价推进",
      "小红书获客",
      "资源开拓",
      "需求挖掘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-14T09:17:39.987Z",
    "charCount": 11707,
    "evidenceSnippets": [
      "我们大概会总结这几个维度的信息。一个就是公司内部所有流程的SOP，比方说获客流程就有三个以上的作品。一个是小红书获客，一个是小区社群博客，还有一个是线下线上自然流量顾客，这是一种获客类型的SOP。然后另外一种是成交的SOP博客，已经有意愿了邀约到店了。那接下来后续的每一个细节的SOP里面，需要根据大家聊的这个内容去总结出来如何签到意向单，这是第二。",
      "一个是销售概念系统，具体的软件如何呈现，里边哪些功能是针对新人训练，哪些功能是针对老人快速查询的工具。然后第二套是针对设计师的，他如何把客户需求导进去，然后如何给他做方案讲解的口述的提纲。这套的软件的呈现，还有一套是如何配合现在小区那个企业微群聊，每天看一些活跃度，去推进每个小区的执行情况。就刚才小区的这个负责人说的这一套的看板，我们就会把每一个功能系统分散到正好大家四个人就每人一套。",
      "然后刚才聊的主要是加盟商在销售环节的差异性。加盟商在日常的活动环节跟总部一样，也在做小区社群，还是也有。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：加盟商培训体系与区域差异化管理",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0009",
    "title": "加盟商培训与区域差异化管理",
    "sourceFile": "加盟商培训与区域差异化管理.txt",
    "relativePath": "加盟商培训与区域差异化管理.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "资源开拓",
      "非标下单底线",
      "高客单成交"
    ],
    "sceneTags": [
      "客户追问价格",
      "订单下单前",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:39.955Z",
    "charCount": 7911,
    "evidenceSnippets": [
      "对，他们可能就从老板的一些渠道资源给到他，然后他可能专门去做一些前期的服务。后面真的去谈到订单的时候，成交的时候，可能还是需要老板这边来出面。对。",
      "这就是我们培训老师那边，他自己有单独针对我们不然后的话并且的话不同产品它所搭配不同的一个门型，或者说如果有大概是十几万明细的这一类，就这种比较细的东西，那不可能出来的价格可能不一样。我们可能现在觉得他们的可能是统一的，都是按投影计算，有可能万可能投入更多一些。我们是有这样子的一个表格，互相的可能会更快。因为按照现在总部给的是通按给的是咱们预算的话，咱对于他们的角度来要换算的合影，那有时候可能会很麻烦，所以我们自己又做了一个版本。",
      "对，就到后面你真是要去签单了，然后报价了，然后你们折扣了这一块，然后的话这个还是要把他们搞定。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：加盟商培训与区域差异化管理",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0010",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/电商部门业务情况调研/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "岗位边界",
      "指标异常判断",
      "高客单成交",
      "小红书获客",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:44:09.707Z",
    "charCount": 2433,
    "evidenceSnippets": [
      "**团购群数据**：通过**企业微信外部群**的客服植入和会话归档采集信息。",
      "**[小区运营职责]**：原文提到\"小区运营由相关人员负责，具体情况待进一步了解\"，建议明确具体负责人员和职责边界。",
      "其中，小红书获客成本主要来源于**推广投流费用**。目前导购个人小红书引流效果较好，但相关数据统计方式**待完善**。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：清洗后的知识库文档",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0011",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/电商部门业务情况调研/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "高客单成交",
      "客诉处理",
      "转化复盘",
      "岗位边界"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:44:40.311Z",
    "charCount": 2356,
    "evidenceSnippets": [
      "- **线上化功能描述**：系统提供全渠道销售数据看板，支持均单值、成交率、客户转化周期等多维度分析，支持按门店、销售、时间段筛选。",
      "- **对应线下流程**：客服负责初步对接和电话回访，督导负责数据复盘和流程优化，销售通过数字门店查看数据，未成交客户由店长和督导定期盘点。",
      "- **线上化功能描述**：系统提供AI数据抓取工具、AI图片生成、AI内容创作与分发功能，支持群监控机器人，通过中央看板实时监控网单情况。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：功能模块大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0012",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/电商部门业务情况调研/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "转化复盘",
      "资源开拓",
      "新人培养与考核",
      "高客单成交",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:45:15.441Z",
    "charCount": 2665,
    "evidenceSnippets": [
      "- 来源依据：原文\"督导负责每月数据复盘，与门店和销售对接，诊断问题并优化流程，提高订单转化率\"",
      "- 来源依据：原文\"督导负责每月数据复盘，与门店和销售对接，诊断问题并优化流程，提高订单转化率\"",
      "- 内容项：客服职责（初步对接、电话回访）、督导职责（数据复盘、流程优化）、销售数据查看方式"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：知识库大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0013",
    "title": "客资获取与分配模块-PRD",
    "sourceFile": "04-客资获取与分配模块-PRD.md",
    "relativePath": "流程清单/电商部门业务情况调研/04-客资获取与分配模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "客户接待闭环",
      "小红书获客",
      "转化复盘",
      "需求挖掘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:45:59.951Z",
    "charCount": 2340,
    "evidenceSnippets": [
      "作为一名督导，我希望看到客资转化数据和分配效率，以便优化流程。",
      "**平台API故障**：提示\"数据采集异常，已自动重试\"，并记录错误日志。",
      "**模块目标**：实现多平台客资统一采集、智能匹配门店与销售团队、自动分配跟进任务，提升客资转化率与分配效率。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：客资获取与分配模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0014",
    "title": "数据采集与分析模块-PRD",
    "sourceFile": "05-数据采集与分析模块-PRD.md",
    "relativePath": "流程清单/电商部门业务情况调研/05-数据采集与分析模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "客户接待闭环",
      "客诉处理",
      "社群SOP",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:46:31.041Z",
    "charCount": 2346,
    "evidenceSnippets": [
      "预警触发：客诉数量超过阈值或竞品数据异常变化时自动预警。",
      "**模块目标**：实现多渠道数据自动采集、智能分析用户评价、竞品监控与分析，提升数据采集效率和分析质量。",
      "总部统一采集全渠道投放数据及用户评价，当前面临以下问题："
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数据采集与分析模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0015",
    "title": "客户跟进协作模块-PRD",
    "sourceFile": "06-客户跟进协作模块-PRD.md",
    "relativePath": "流程清单/电商部门业务情况调研/06-客户跟进协作模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "岗位边界",
      "指标异常判断",
      "转化复盘",
      "需求挖掘",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:47:05.150Z",
    "charCount": 2607,
    "evidenceSnippets": [
      "**模块目标**：建立客户跟进看板，支持客服、督导、销售多角色协同，自动记录跟进轨迹，提升订单转化率。",
      "`客户建档` → `分配跟进任务` → `销售跟进` → `记录沟通内容` → `更新客户状态` → `超时提醒` → `督导复盘` → `转化分析`",
      "作为一名销售，我希望看到客户完整沟通记录，了解客户需求。"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：客户跟进协作模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0016",
    "title": "AI辅助提效模块-PRD",
    "sourceFile": "07-AI辅助提效模块-PRD.md",
    "relativePath": "流程清单/电商部门业务情况调研/07-AI辅助提效模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager",
      "designer"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "客户接待闭环",
      "新人培养与考核"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:47:38.949Z",
    "charCount": 2579,
    "evidenceSnippets": [
      "监控数据：群ID、监控指标、预警次数、预警内容、处理状态",
      "**模块目标**：通过AI技术提升电商部门的数据抓取、图片制作、内容宣发效率，并实现对服务质量的监控。",
      "作为一名运营人员，我希望AI自动抓取数据，减少手动配置工作。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：AI辅助提效模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager",
        "designer"
      ]
    }
  },
  {
    "id": "lk-0017",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/电商部门业务情况调研/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager",
      "sales"
    ],
    "competencyTags": [
      "指标异常判断",
      "岗位边界"
    ],
    "sceneTags": [
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:43:39.136Z",
    "charCount": 772,
    "evidenceSnippets": [
      "**源文件**：`智能纪要：电商部门业务情况调研 2026年4月8日.txt`",
      "**输出目录**：`流程清单\\智能纪要：电商部门业务情况调研 2026年4月8日`"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager",
        "sales"
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
    "id": "lk-0020",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/电商设计审单培训需求会/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "非标下单底线",
      "量尺出图",
      "新人培养与考核",
      "审单防错",
      "客诉处理",
      "需求挖掘"
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:13:15.862Z",
    "charCount": 6854,
    "evidenceSnippets": [
      "- 关联案例：审单部门提到\"颜色、尺寸、工艺是审核三大板块\"",
      "- 内容项：板件尺寸错误、五金拉手尺寸错误、颜色选择错误等典型案例",
      "- 内容项：测量底单审核、签字图纸审核、软件结构审核、下单拆单"
    ],
    "generatedTask": {
      "courseTitle": "非标下单底线：知识库大纲",
      "practicePrompt": "围绕“订单下单前”，让学员用自己的话完成一次非标下单底线表达。",
      "assessmentFocus": "检查学员是否能说清非标下单底线的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0021",
    "title": "电商客资管理模块-PRD",
    "sourceFile": "04-电商客资管理模块-PRD.md",
    "relativePath": "流程清单/电商设计审单培训需求会/04-电商客资管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "指标异常判断",
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "转化复盘",
      "审单防错"
    ],
    "sceneTags": [
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T08:15:40.133Z",
    "charCount": 10208,
    "evidenceSnippets": [
      "提供数据解读培训课程，帮助销售人员理解转化率、均单值、客单价等指标含义，并学会通过数据发现问题。",
      "2. 选择渠道和效果指标（获客量、转化率、投入产出比等）",
      "**元素**：筛选器（渠道+效果指标）、案例卡片（标题+封面图+核心数据标签）、详情弹窗"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：电商客资管理模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0022",
    "title": "网单协同模块-PRD",
    "sourceFile": "05-网单协同模块-PRD.md",
    "relativePath": "流程清单/电商设计审单培训需求会/05-网单协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "需求挖掘",
      "指标异常判断",
      "审单防错",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:16:44.143Z",
    "charCount": 4299,
    "evidenceSnippets": [
      "**元素**:培训视频、图文内容区、模拟数据看板、考核测验",
      "**动效**:数据看板有渐进式展示效果;考核通过后显示认证动画",
      "培训字段:培训ID、培训内容、模拟数据配置、考核题目、通过分数"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：网单协同模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0023",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/电商设计审单培训需求会/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "审单防错",
      "非标下单底线",
      "新人培养与考核",
      "需求挖掘",
      "量尺出图",
      "客诉处理"
    ],
    "sceneTags": [
      "订单下单前",
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
    "sourceUpdatedAt": "2026-04-15T08:17:29.697Z",
    "charCount": 3397,
    "evidenceSnippets": [
      "下单 → 审单(尺寸/颜色/工艺) → 问题打回 → 调整后重审 → 生产 → 安装 → 售后服务",
      "| 软件操作问题 | 约1/3 | 板件尺寸错误、颜色选择错误 |",
      "本文档集基于2026年4月8日下午电商部门访谈内容整理生成,包含电商运营、网单协同、设计师赋能、审单风控、售后服务等核心业务流程的培训资料和功能规划。"
    ],
    "generatedTask": {
      "courseTitle": "审单防错：README",
      "practicePrompt": "围绕“订单下单前”，让学员用自己的话完成一次审单防错表达。",
      "assessmentFocus": "检查学员是否能说清审单防错的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0027",
    "title": "客资获取与分配培训模块-PRD",
    "sourceFile": "04-客资获取与分配培训模块-PRD.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/04-客资获取与分配培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客诉处理",
      "转化复盘",
      "资源开拓",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户追问价格",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:46:22.533Z",
    "charCount": 6163,
    "evidenceSnippets": [
      "基于客户位置、门店承接能力、历史转化率等数据,自动推荐分配方案。",
      "\"客户位于XX小区,XX门店正在做该小区团购,转化率高\"",
      "提供客服岗位的系统化培训课程,包含理论学习、模拟练习、实战考核。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客资获取与分配培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0028",
    "title": "网单销售能力提升模块-PRD",
    "sourceFile": "05-网单销售能力提升模块-PRD.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/05-网单销售能力提升模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "指标异常判断",
      "报价推进",
      "转化复盘",
      "客诉处理",
      "新人培养与考核",
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:48:09.753Z",
    "charCount": 8092,
    "evidenceSnippets": [
      "客户提出异议(如\"价格太贵\"),销售未在记录中体现解决方案",
      "- 包含各项指标(客资数、转化率、跟进频次、客户满意度)",
      "| 网单转化率(客资→成交) | 未知 | +25% | 月度 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：网单销售能力提升模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
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
    "id": "lk-0031",
    "title": "售后问题预防模块-PRD",
    "sourceFile": "08-售后问题预防模块-PRD.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/08-售后问题预防模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "客诉处理",
      "审单防错",
      "指标异常判断",
      "非标下单底线",
      "量尺出图",
      "会审协同"
    ],
    "sceneTags": [
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:53:43.354Z",
    "charCount": 8445,
    "evidenceSnippets": [
      "- 按问题类型筛选(测量错误、设计错误、生产错误、安装错误)",
      "| 售后问题发生率 | 未知 | 降低30% | 月度 |",
      "| 售后处理时效 | 未知 | 缩短50% | 月度 |"
    ],
    "generatedTask": {
      "courseTitle": "客诉处理：售后问题预防模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次客诉处理表达。",
      "assessmentFocus": "检查学员是否能说清客诉处理的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0032",
    "title": "数据分析与复盘模块-PRD",
    "sourceFile": "09-数据分析与复盘模块-PRD.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/09-数据分析与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "转化复盘",
      "客诉处理",
      "审单防错",
      "新人培养与考核",
      "资源开拓"
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:55:42.050Z",
    "charCount": 9226,
    "evidenceSnippets": [
      "汇总销售人员在各渠道(自拓、网单、自然进店)的客资、成交、转化率数据,提供统一视图。",
      "- 课程名称、参训人数、平均成绩、培训前指标、培训后指标、改善幅度",
      "| 数据查看活跃度 | 未知 | ≥80% | 月度 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数据分析与复盘模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0033",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/电商运营设计与售后审单流程/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "指标异常判断",
      "审单防错",
      "客诉处理",
      "新人培养与考核",
      "转化复盘",
      "非标下单底线"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T09:56:44.795Z",
    "charCount": 4423,
    "evidenceSnippets": [
      "第三优先级:培训管理制度、绩效考核标准、生产管理制度、数据安全规范",
      "AI赋能机会点(客资管理、数据监控、培训升级、流程优化)",
      "第一优先级:高频错误案例库、颜色搭配规范、测量标准流程、客户沟通话术库"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0034",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/店长访谈销售培训需求/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "会审协同",
      "客户接待闭环",
      "社群SOP"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:21:30.045Z",
    "charCount": 4416,
    "evidenceSnippets": [
      "店长会在**方案前期进行会审演练**,针对客户特点做预案,预判客户卡点与需求满足方式。",
      "小区业务:销售必须熟悉小区规则,通过线上线下多渠道获取信息",
      "**设计为主导的场景**:在设计环节,销售配合,以设计师为中心"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
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
    "id": "lk-0036",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/店长访谈销售培训需求/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "会审协同",
      "报价推进",
      "资源开拓",
      "客诉处理"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户方案会审",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:23:28.373Z",
    "charCount": 3904,
    "evidenceSnippets": [
      "- 关联案例:销售通过企业微信文档查询报价,处理客户价格异议",
      "- 关联案例:店长要求销售通过多种渠道了解小区信息,先从APP了解,再现场学习",
      "- 内容项:方案前期会审、客户特点预案、客户卡点预判、需求满足方式"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0037",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/店长访谈销售培训需求/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:24:28.119Z",
    "charCount": 2971,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售在进入培训系统的第一阶段建立正确的高定行业认知、三个月成长周期预期、服务意识要求和性格特质要求,识别不适合的佛系性格,减少人员筛选成本。",
      "作为一名店长,我希望系统提前告诉新人什么是高定行业的服务标准、什么是狼性特质,降低带教压力。",
      "根据第二位店长访谈,高定品牌门店对新人销售有以下特殊要求:"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
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
    "id": "lk-0041",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "08-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/店长访谈销售培训需求/08-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:27:23.401Z",
    "charCount": 3110,
    "evidenceSnippets": [
      "- 关卡地图:客户接待 → 需求诊断 → 产品查询 → 小区信息 → 协同配合 → 异议处理 → 成交推进",
      "- 能力雷达图:客户接待、需求诊断、专业知识、协同能力等维度",
      "**模块目标**:通过真实场景闯关任务考核新人能力,生成个人成长报告,帮助店长评估新人是否适合高定行业,支持与试用期转正、人员筛选挂钩。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与实战复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0042",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/店长访谈销售培训需求/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "会审协同",
      "转化复盘"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T08:27:45.602Z",
    "charCount": 1665,
    "evidenceSnippets": [
      "2. **功能模块大纲**:将高定门店管理、带教、协同流程转化为可线上化的培训模块。",
      "这 5 个模块直接覆盖新人从\"认知建立 → 专业查询能力 → 小区业务掌握 → 协同能力培养 → 能力考核\"的完整最小闭环,且解决了店长最关心的快速查询、小区业务、协同配合三大痛点。",
      "5. **闯关考核与实战复盘模块**(系统化评估新人能力)"
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
    "id": "lk-0043",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/店长客户接待技巧与新人培训经验/01-清洗后的知识库文档.md",
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
      "客诉处理",
      "岗位边界"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:22:58.759Z",
    "charCount": 5755,
    "evidenceSnippets": [
      "犹豫型客户对**价格敏感、环保担忧、售后安装顾虑**。常见问题：",
      "如客户对颜色有异议，让设计师带客户看展厅，销售同步做报价；",
      "4. **销售工具使用**：公司提供小红屋、执行力、云屏、AI助手等工具，新人要学会利用；"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
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
    "id": "lk-0045",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/店长客户接待技巧与新人培训经验/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "客户接待闭环",
      "板材产品解释",
      "高客单成交"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:26:31.489Z",
    "charCount": 8908,
    "evidenceSnippets": [
      "- \"太贵了\"应对：价值塑造六维度、价格分摊、报价拆解、降配建议。",
      "**培训类**：包含所有用于教学和赋能的材料（营销话术、销售技巧、系统使用流程、培训课件、新人引导材料、常见问题解答等）。",
      "- 来源依据：\"我们的板材的环保度也是优于国标的\"（原文第89行）。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0046",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/店长客户接待技巧与新人培训经验/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "报价推进",
      "需求挖掘",
      "高客单成交",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:27:07.861Z",
    "charCount": 1993,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将线下销售带教与客户接待流程转化为可线上化的培训模块。",
      "**培训周期**：原文提到\"新人培训从3-5天到7天再到半个月\"，建议确认当前正式培训周期。",
      "**客户需求记录工具**：原文提到使用企业微信群文档，建议确认是否需要独立建设客户需求管理模块。"
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
    "id": "lk-0047",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "资源开拓",
      "岗位边界",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:06:38.793Z",
    "charCount": 2858,
    "evidenceSnippets": [
      "2. **新人带教**: 告知周边小区 → 了解小区信息 → 客户沟通 → 现场学习",
      "2. **培训系统**: 帮助新人快速掌握小区信息、产品知识、服务流程",
      "2. **系统能力**: 线上运营与线下接待能力要求高,新人难以快速胜任"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0048",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "新人培养与考核",
      "资源开拓",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "客户追问价格",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:08:22.461Z",
    "charCount": 5301,
    "evidenceSnippets": [
      "新人通过系统快速了解周边小区信息、房价、户型、装修进度等",
      "| **新人培训** | 小区信息分散,需要人工多方收集整理 | 培训周期长,学习效率低 |",
      "**模块3: 小区开发与客户管理模块** - 解决新人培训和客户管理痛点"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：功能模块大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
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
    "id": "lk-0051",
    "title": "产品知识查询模块-PRD",
    "sourceFile": "05-产品知识查询模块-PRD.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/05-产品知识查询模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "非标下单底线",
      "量尺出图",
      "新人培养与考核"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T09:14:47.315Z",
    "charCount": 6906,
    "evidenceSnippets": [
      "产品详情包含:产品名称、分类、尺寸、材质、工艺、价格、核心卖点、产品图片",
      "支持输入尺寸、材质、工艺,计算定制产品价格【待确认:定价规则】",
      "定制产品:支持按尺寸、材质、工艺计算价格【待确认:定价公式】"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：产品知识查询模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
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
    "id": "lk-0053",
    "title": "订单协同与跟踪模块-PRD",
    "sourceFile": "07-订单协同与跟踪模块-PRD.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/07-订单协同与跟踪模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "会审协同",
      "需求挖掘",
      "客诉处理",
      "资源开拓",
      "设计方案讲解",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:17:24.445Z",
    "charCount": 2434,
    "evidenceSnippets": [
      "提供订单全流程跟踪和跨部门协同功能,帮助销售实时掌握订单状态,快速协调资源,提升交付效率。",
      "2. **协同效率低**: 协调各部门资源需要电话沟通,响应慢",
      "*So that** 遇到特殊需求时快速找到专业人员支持"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：订单协同与跟踪模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0054",
    "title": "售后与问题解决模块-PRD",
    "sourceFile": "08-售后与问题解决模块-PRD.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/08-售后与问题解决模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "客诉处理",
      "需求挖掘",
      "会审协同",
      "指标异常判断"
    ],
    "sceneTags": [],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:17:50.611Z",
    "charCount": 1829,
    "evidenceSnippets": [
      "提供售后问题查询和跨部门协同功能,帮助销售快速响应客户售后问题,提升客户满意度。",
      "1. **售后响应慢**: 售后问题处理流程长,客户等待时间长",
      "1. **销售**: 查询售后问题解决方案,提交售后工单"
    ],
    "generatedTask": {
      "courseTitle": "客诉处理：售后与问题解决模块-PRD",
      "practicePrompt": "围绕“真实业务场景”，让学员用自己的话完成一次客诉处理表达。",
      "assessmentFocus": "检查学员是否能说清客诉处理的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0055",
    "title": "数据分析与决策支持模块-PRD",
    "sourceFile": "09-数据分析与决策支持模块-PRD.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/09-数据分析与决策支持模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "转化复盘",
      "需求挖掘",
      "会审协同"
    ],
    "sceneTags": [
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:18:21.939Z",
    "charCount": 2249,
    "evidenceSnippets": [
      "提供业绩数据可视化和决策支持功能,帮助店长掌握团队业绩情况,优化激励机制,引导销售均匀分布业绩。",
      "1. **业绩数据不透明**: 业绩统计手工进行,实时性差",
      "3. **决策缺乏数据支撑**: 凭经验判断,缺乏数据依据"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数据分析与决策支持模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0056",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/店长人员管理与门店运营需求/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "指标异常判断",
      "会审协同",
      "客诉处理"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:19:38.421Z",
    "charCount": 3988,
    "evidenceSnippets": [
      "*模块目标**: 提供售后问题查询和跨部门协同,快速响应客户售后问题。",
      "4. **小区信息来源**: 小区信息从哪里来?对接第三方数据源还是人工录入?",
      "本文档库基于\"2026-04-09 10_28 店长_原文.txt\"访谈内容,为\"AI培训销售智能体\"产品设计提供完整的PRD文档支持。"
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
    "id": "lk-0057",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "需求挖掘",
      "新人培养与考核",
      "转化复盘",
      "资源开拓",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:40:31.444Z",
    "charCount": 5301,
    "evidenceSnippets": [
      "\"产品样板间你已经看过了,产品供应可以放心。我们非常熟悉时代之城、理想之地这些小区的具体户型。设计师也非常优秀,对拉米的落地效果和工艺可以放心。虽然您在对比,但能不能给我们一个机会,让我们帮您设计几版方案,出一套符合您心理预期的方案和报价。\"",
      "**前期状态**:前期很长一段时间没有签单,虽然样板间有值班,但培训与实际接客户有区别",
      "**客户来源**:网单、小区碰到的客户、样板间客户、小红书获客"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0058",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "报价推进",
      "资源开拓",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:41:11.144Z",
    "charCount": 2504,
    "evidenceSnippets": [
      "- **对应线下流程**:报价耗时,新人不熟练,对每个小区情况不了解,不知道从何看起",
      "- **线上化功能描述**:AI辅助报价,压缩时间,保证准确性,提供小区户型信息和方案库",
      "- **线上化功能描述**:提供样板间政策、优惠方案、不同户型报价区间、KOC运营指南"
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
    "id": "lk-0059",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "报价推进",
      "资源开拓",
      "板材产品解释",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:42:11.714Z",
    "charCount": 3725,
    "evidenceSnippets": [
      "- 内容项:新小区如何开拓、如何准备方案、如何做样板间、不同户型报价",
      "- 内容项:投影面积计算、套餐应用、不同客户不同报价、小区户型信息",
      "- 关联案例:新人报价不熟练,不知道每个小区情况,不知道从何看起"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0060",
    "title": "菜鸟级新手训练营模块-PRD",
    "sourceFile": "04-菜鸟级新手训练营模块-PRD.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/04-菜鸟级新手训练营模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "板材产品解释"
    ],
    "sceneTags": [
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:42:38.516Z",
    "charCount": 1539,
    "evidenceSnippets": [
      "提供系统化的板材知识、公司优势特点、产品优点、百问百答训练,解决培训与实际展厅脱节的问题,让新人快速掌握产品基础知识。",
      "As a 新入职销售,I want 系统学习板材知识、公司优势特点、产品优点,So that 我能专业介绍产品,不会培训与实际脱节",
      "As a 店长/师傅,I want 查看新人的产品知识学习进度和测评成绩,So that 我能判断是否可以独立接待客户"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：菜鸟级新手训练营模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0061",
    "title": "竞品对比与调研模块-PRD",
    "sourceFile": "05-竞品对比与调研模块-PRD.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/05-竞品对比与调研模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "板材产品解释",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:43:09.671Z",
    "charCount": 1658,
    "evidenceSnippets": [
      "提供主要竞品(兔宝宝、欧派、索菲亚、左上明舍等)的详细对比、价格信息、应对话术库,解决新人调研会紧张、说错话、整理有出入的问题。",
      "As a 新入职销售,I want 系统学习主要竞品(兔宝宝、欧派、索菲亚、左上明舍)的产品特点、价格、板材差异,So that 客户问竞品时我能专业对比",
      "As a 销售,I want 快速查询竞品价格和板材信息,So that 我能准确判断价格优势和产品差异"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：竞品对比与调研模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0062",
    "title": "工艺与安装知识模块-PRD",
    "sourceFile": "06-工艺与安装知识模块-PRD.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/06-工艺与安装知识模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:43:29.501Z",
    "charCount": 1515,
    "evidenceSnippets": [
      "提供安装工艺、固定方式、常见工艺问题的系统讲解和图文视频资料,解决客户问安装问题新人不知道只能猜的问题。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：工艺与安装知识模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0063",
    "title": "AI报价辅助模块-PRD",
    "sourceFile": "07-AI报价辅助模块-PRD.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/07-AI报价辅助模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "需求挖掘",
      "新人培养与考核",
      "资源开拓",
      "指标异常判断",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "社群运营推进",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:43:49.929Z",
    "charCount": 1470,
    "evidenceSnippets": [
      "AI辅助报价,压缩报价时间,保证准确性,提供小区户型信息和方案库,解决新人报价不熟练、对小区不了解、不知道从何看起的问题。",
      "As a 新入职销售,I want 查询小区户型信息和已有方案,So that 我不会不知道从何看起",
      "As a 销售,I want AI帮我根据客户预算调整方案,So that 我能快速提供客户能接受的报价"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：AI报价辅助模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0064",
    "title": "素材库与方案检索模块-PRD",
    "sourceFile": "08-素材库与方案检索模块-PRD.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/08-素材库与方案检索模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "资源开拓",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户方案会审",
      "社群运营推进",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:44:18.122Z",
    "charCount": 1511,
    "evidenceSnippets": [
      "As a 新入职销售,I want 快速找到小区素材(楼盘照片、户型图、小区环境),So that 我不会不知道去哪里找",
      "提供小区素材库、方案库、手绘图库,支持快速检索和参考,解决新人不知道去哪里找素材、方案的问题。",
      "As a 新入职销售,I want 快速找到已有方案(不同户型的设计方案),So that 我能参考前辈的方案"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：素材库与方案检索模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0065",
    "title": "销售与设计师协同模块-PRD",
    "sourceFile": "09-销售与设计师协同模块-PRD.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/09-销售与设计师协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "需求挖掘",
      "新人培养与考核",
      "转化复盘",
      "量尺出图",
      "社群SOP"
    ],
    "sceneTags": [
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T08:44:42.644Z",
    "charCount": 1764,
    "evidenceSnippets": [
      "**协同流程**:签单后必须建立协同群,记录需求重点,安排设计师与客户先沟通",
      "提供协同流程、沟通话术、图纸审核标准、设计师能力评估,避免因协同丢单(柜子拆不拆、图画得丑、沟通能力弱等问题)。",
      "**次要用户**:设计师(了解销售需求)、店长(监督协同)"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售与设计师协同模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0066",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/华拓销售成长经历与培训需求/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "报价推进",
      "资源开拓",
      "转化复盘",
      "会审协同"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:45:28.932Z",
    "charCount": 2964,
    "evidenceSnippets": [
      "2. **功能模块大纲**:从有实战经验的销售视角提炼培训需求,转化为可线上化的培训模块",
      "**需求具体**:明确提出菜鸟训练营、竞品对比、工艺知识、AI报价、素材库、协同模块等具体需求",
      "**更关注AI辅助**:明确提出AI报价辅助、AI识别户型图等需求"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：README",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
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
    "id": "lk-0068",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:58:55.807Z",
    "charCount": 2722,
    "evidenceSnippets": [
      "本大纲基于《加盟店培训需求》访谈内容，将加盟店培训中由总部培训师、老板、店长协同完成的培训流程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：总部提供简化报价表格，培训老师讲解不同门型、工艺对应的价格系数。",
      "- **线上化功能描述**：提供报价模拟训练、价格拆解演示、投影面积与展开面积换算工具、不同门型价格对比表，支持报价演练与自动评分。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0069",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "指标异常判断",
      "岗位边界",
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:59:51.000Z",
    "charCount": 2851,
    "evidenceSnippets": [
      "- 关联案例：培训老师讲解不同门型、工艺对应的价格系数和报价方式",
      "- 内容项：销售助理职责边界、老板压单规则、设计师职责、培训参与要求",
      "- 内容项：零售指导价、最低折扣底线、展开面积与投影面积换算、不同门型价格系数"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0070",
    "title": "产品知识与基础话术线上课程-PRD",
    "sourceFile": "04-产品知识与基础话术线上课程-PRD.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/04-产品知识与基础话术线上课程-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "岗位边界"
    ],
    "sceneTags": [
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T10:00:35.781Z",
    "charCount": 2537,
    "evidenceSnippets": [
      "`登录系统` → `选择岗位角色` → `查看学习计划` → `学习课程内容` → `完成课后测验` → `查看学习进度` → `获得线下培训资格`",
      "培训负责人：查看所有学员学习状态、发送培训邀请、导出数据",
      "**模块目标**：帮助加盟店人员在当地完成产品知识初步了解，掌握基础销售话术和云屏工具操作，为线下培训打下基础。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识与基础话术线上课程-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0071",
    "title": "城市等级适配话术推荐-PRD",
    "sourceFile": "05-城市等级适配话术推荐-PRD.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/05-城市等级适配话术推荐-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "报价推进"
    ],
    "sceneTags": [
      "客户首次进店",
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T10:01:07.758Z",
    "charCount": 2378,
    "evidenceSnippets": [
      "**县级城市**：价格敏感度高，客户直接问\"最低能卖多少\"，竞品差异化大。",
      "培训负责人明确提出需求：希望能识别不同城市的情况，生成适配当地的话术建议。",
      "作为一名县级城市的销售人员，我希望能快速获得应对价格敏感客户的话术。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：城市等级适配话术推荐-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0072",
    "title": "经销商话术上传与共享窗口-PRD",
    "sourceFile": "06-经销商话术上传与共享窗口-PRD.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/06-经销商话术上传与共享窗口-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T10:01:40.739Z",
    "charCount": 2505,
    "evidenceSnippets": [
      "**适用对象**：加盟店销售人员、经销商老板、培训负责人",
      "作为一名培训负责人，我希望能审核和优化经销商上传的内容，并纳入知识库。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：经销商话术上传与共享窗口-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0073",
    "title": "加盟店报价工具与价格策略训练-PRD",
    "sourceFile": "07-加盟店报价工具与价格策略训练-PRD.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/07-加盟店报价工具与价格策略训练-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "客户接待闭环",
      "指标异常判断",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T10:02:18.665Z",
    "charCount": 2411,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望能设置报价训练场景，考核学员报价能力。",
      "`进入报价训练` → `选择训练场景` → `输入报价参数` → `生成报价单` → `查看价格拆解` → `应对异议演练` → `提交答案评分`",
      "**模块目标**：帮助加盟店销售人员掌握报价技能，理解价格策略，学会应对价格异议和提供替代方案。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：加盟店报价工具与价格策略训练-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0074",
    "title": "一对一考核与通关认证-PRD",
    "sourceFile": "08-一对一考核与通关认证-PRD.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/08-一对一考核与通关认证-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T10:02:53.670Z",
    "charCount": 2609,
    "evidenceSnippets": [
      "**模块目标**：为加盟店培训提供在线考核和认证功能，替代或补充线下一对一考核，确保学员真正掌握培训内容。",
      "根据访谈，加盟店线下培训采用每天课程结束后进行一对一考核的模式：",
      "作为一名学员，我希望能在线完成考核，不必等培训老师一对一进行。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：一对一考核与通关认证-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0075",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/加盟商培训体系与区域差异化管理/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T10:03:24.915Z",
    "charCount": 1465,
    "evidenceSnippets": [
      "1. **清洗后的知识库文档**：沉淀访谈中的核心业务需求和培训差异，并标记待确认项。",
      "| 带教方式 | 新人可逐步独立接单 | 销售无法独立接单，需老板压单 |",
      "**培训周期数据**：线上7天+线下10天是否所有加盟店统一执行？"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
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
    "id": "lk-0077",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "客户接待闭环",
      "高客单成交",
      "会审协同"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:41:07.623Z",
    "charCount": 2657,
    "evidenceSnippets": [
      "**核心流程**：建议首批上线，直接影响经销商培训效率与成交能力。",
      "- **对应线下流程**：培训老师在展厅讲解产品细节、演示销售工具、演练话术。",
      "- **线上化功能描述**：提供展厅产品讲解视频库、销售工具操作指南、话术演练脚本，支持培训老师调用与经销商复习。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0078",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "小红书获客",
      "指标异常判断",
      "客户接待闭环",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "新人入门考核",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:41:43.763Z",
    "charCount": 2606,
    "evidenceSnippets": [
      "- 内容项：销售人员职责（前期服务、产品推荐）、老板职责（压单、报价、折扣）、设计师职责（效果图、下单）",
      "- 关联案例：不同产品搭配不同门型价格明细，培训老师为经销商准备专门换算表格",
      "- 内容项：线上7天自学流程、线下集训内容、驻点培训安排、培训考核标准"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0079",
    "title": "经销商画像与城市识别模块-PRD",
    "sourceFile": "04-经销商画像与城市识别模块-PRD.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/04-经销商画像与城市识别模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "资源开拓",
      "社群SOP",
      "报价推进"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:42:28.903Z",
    "charCount": 2167,
    "evidenceSnippets": [
      "**模块目标**：自动识别经销商所在城市等级、消费水平、竞品格局、线上渠道偏好，生成城市画像报告，为后续培训内容推荐和话术适配提供依据。",
      "因此，系统需要自动识别经销商城市特征，为后续培训内容本地化提供数据支撑。",
      "渠道偏好：小红书活跃度、抖音活跃度、快手活跃度、其他渠道"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：经销商画像与城市识别模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0080",
    "title": "经销商线上自学平台-PRD",
    "sourceFile": "05-经销商线上自学平台-PRD.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/05-经销商线上自学平台-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T09:42:59.780Z",
    "charCount": 2281,
    "evidenceSnippets": [
      "`登录企业微信` → `选择学习路径（销售/设计师）` → `学习产品课程` → `完成章节测试` → `累计学习进度` → `通过总考核` → `解锁线下培训报名`",
      "作为培训负责人，我希望系统自动记录学习进度，只有通过考核的才能参加线下培训。",
      "**模块目标**：为经销商提供线上前置培训平台，支持产品知识学习、视频课程、在线测试、学习进度追踪，确保经销商在参加线下培训前具备基础产品认知。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：经销商线上自学平台-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0081",
    "title": "城市话术与案例推荐模块-PRD",
    "sourceFile": "06-城市话术与案例推荐模块-PRD.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/06-城市话术与案例推荐模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "客户接待闭环",
      "小红书获客"
    ],
    "sceneTags": [
      "客户首次进店",
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:43:32.122Z",
    "charCount": 2326,
    "evidenceSnippets": [
      "**模块目标**：根据经销商城市画像，自动推荐当地化话术、竞品应对策略、价格沟通技巧，并关联当地小红书/抖音热点内容，帮助经销商快速定位当地客户需求。",
      "作为培训负责人，我希望系统能自动生成本地化话术，减少人工调整工作。",
      "**页面目标**：展示当地小红书/抖音热门内容与对应产品推荐。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：城市话术与案例推荐模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0082",
    "title": "经销商报价计算器模块-PRD",
    "sourceFile": "07-经销商报价计算器模块-PRD.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/07-经销商报价计算器模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "非标下单底线",
      "指标异常判断",
      "客户接待闭环",
      "量尺出图"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:44:03.677Z",
    "charCount": 2312,
    "evidenceSnippets": [
      "`选择计价方式` → `输入尺寸/配置` → `选择产品与门型` → `系统计算价格` → `生成报价单` → `导出/分享`",
      "**尺寸输入异常**：提示\"请输入有效尺寸\"，限制数值范围。",
      "**模块目标**：为经销商提供多计价方式的换算工具，支持展开面积、投影面积、按组计价等模式，一键生成当地化报价单，自动关联产品明细与门型搭配价格差异。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：经销商报价计算器模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0083",
    "title": "经销商话术与案例上传模块-PRD",
    "sourceFile": "08-经销商话术与案例上传模块-PRD.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/08-经销商话术与案例上传模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:44:34.876Z",
    "charCount": 2349,
    "evidenceSnippets": [
      "**模块目标**：支持经销商上传优秀话术、成交案例、客户应对经验，经审核后入库，形成\"总部+经销商\"双向知识贡献机制，让系统更匹配当地需求。",
      "**适用对象**：经销商销售人员、经销商老板、培训审核人员",
      "作为培训负责人，我希望收集经销商的优秀经验，丰富培训内容。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：经销商话术与案例上传模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0084",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/加盟商培训与区域差异化管理/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:44:56.310Z",
    "charCount": 1690,
    "evidenceSnippets": [
      "1. **城市差异化培训**：不同城市等级客户需求不同，需本地化话术与培训内容",
      "原文中的**培训时长数据**存在歧义（\"13年\"\"7+10\"等表述），建议确认具体天数；",
      "当前访谈主要集中在经销商培训差异与需求，以下内容建议另行补充："
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0085",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "资源开拓",
      "客诉处理",
      "会审协同",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T05:50:38.146Z",
    "charCount": 5389,
    "evidenceSnippets": [
      "当客户觉得价格贵时，不能只说“我们值这个价”，而应通过**同户型、同价位、已落地案例**进行解释，让客户明白：",
      "受访者提到，自己过去写过较多新人带教资料和接待话术，甚至从“进门怎么接待”开始都有演练内容。但目前这些资料并未系统沉淀，更多依赖个人口述与经验传授。这说明门店当前在培训侧存在一个重要问题：",
      "店长强调，新人不能只背话术，更重要的是理解客户需求与行业逻辑。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0087",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "会审协同",
      "客户接待闭环",
      "岗位边界"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T05:50:38.149Z",
    "charCount": 3301,
    "evidenceSnippets": [
      "- 内容项：销售、设计师、店长、师傅在订单推进中的职责边界与交接要求",
      "- 内容项：反应速度、需求拆解、专业度、心理判断、协同能力、行业敏感度、客户筛选能力",
      "- 内容项：家庭结构、夫妻职业、预算防线、品牌偏好、户型阶段、装修目标、同住关系"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0088",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T05:53:45.156Z",
    "charCount": 2534,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售在进入培训系统的第一阶段建立正确的行业认知、成长预期和学习心态，减少急于求成、低抗压、缺少长期主义等问题。",
      "作为一名培训负责人，我希望新人先完成认知校准，再进入技能训练，以减少重复解释成本。",
      "作为一名店长，我希望系统提前告诉新人什么是正确心态、什么是错误心态，降低带教压力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0089",
    "title": "客户接待与需求诊断模块-PRD",
    "sourceFile": "05-客户接待与需求诊断模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/05-客户接待与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "需求挖掘",
      "客户接待闭环",
      "报价推进",
      "新人培养与考核",
      "转化复盘",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-15T05:53:45.222Z",
    "charCount": 2448,
    "evidenceSnippets": [
      "**模块目标**：让新人销售掌握“先判断、再沟通”的接待逻辑，能够在客户进店或线上咨询的早期阶段快速识别客户类型、家庭结构、预算心理和核心需求。",
      "新人常见问题是不会问、不会判断、不会抓重点，导致后续报价和沟通方向都错位。",
      "作为培训负责人，我希望学员通过情景模拟训练需求诊断能力，而不是只看理论。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户接待与需求诊断模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0090",
    "title": "异议处理与报价成交模块-PRD",
    "sourceFile": "06-异议处理与报价成交模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/06-异议处理与报价成交模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "高客单成交",
      "新人培养与考核",
      "客户接待闭环",
      "转化复盘"
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
    "sourceUpdatedAt": "2026-04-15T05:53:45.219Z",
    "charCount": 2455,
    "evidenceSnippets": [
      "`选择异议场景` → `识别异议类型` → `查看客户背景` → `输出应对策略` → `进行报价拆解/替代方案选择` → `系统评分反馈` → `生成成交复盘`",
      "结果字段：诊断得分、报价拆解完整度、替代方案有效性、成交推进评分",
      "**模块目标**：训练销售识别客户真实异议来源，并通过竞品对比、报价拆解、方案替代与落地案例展示推动成交。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：异议处理与报价成交模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0091",
    "title": "订单协同与跟单风控模块-PRD",
    "sourceFile": "07-订单协同与跟单风控模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/07-订单协同与跟单风控模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "非标下单底线",
      "客诉处理"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "客户首次进店",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T05:53:45.289Z",
    "charCount": 2332,
    "evidenceSnippets": [
      "**模块目标**：让销售学员掌握下单后的关键节点、设计协同方式和风险升级机制，并通过流程看板避免新人订单被遗忘、拖延或失控。",
      "访谈中出现了典型风险案例：新人销售的订单因设计协同失误被拖延两个月。受访者明确指出，这不是某一个人单独的问题，而是流程责任、节点提醒、带教机制都不到位。",
      "作为新人销售，我希望知道下单后每一步应该盯什么、几天内没有反馈该怎么办。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：订单协同与跟单风控模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0092",
    "title": "闯关考核与复盘模块-PRD",
    "sourceFile": "08-闯关考核与复盘模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/08-闯关考核与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "客户接待闭环",
      "指标异常判断",
      "会审协同",
      "审单防错"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T05:53:45.288Z",
    "charCount": 2363,
    "evidenceSnippets": [
      "**模块目标**：通过场景闯关、综合评分、错题复盘和成长报告，验证学员是否具备上岗前的关键能力，并形成可持续复训机制。",
      "访谈显示，真正的销售能力来自大量真实场景磨炼，靠单一理论学习无法形成闭环。因此，系统需要把客户接待、需求诊断、异议处理、协同风控等能力整合为连续闯关任务，让学员在接近真实业务的路径中验证自己。",
      "作为培训负责人，我希望沉淀一套可复用的考核标准，并和培训内容联动。"
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
    "id": "lk-0093",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/门店管理与销售团队培养策略访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核"
    ],
    "sceneTags": [],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T05:50:38.025Z",
    "charCount": 779,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将线下销售带教与训练流程转化为可线上化的培训模块。",
      "3. **知识库大纲**：按照产品类、培训类、设计类、公司规范类整理知识项。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“真实业务场景”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0094",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "小红书获客",
      "报价推进",
      "新人培养与考核",
      "指标异常判断",
      "岗位边界",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "新人入门考核",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:32:48.653Z",
    "charCount": 7720,
    "evidenceSnippets": [
      "目前门店已形成惯例:**新订单一周周期,周六周天邀约客户进店**。",
      "**预算时客户预期三十多万,最终报价四十多万**,产生拉扯。",
      "**线上维护型**:适合拉群、线上互动、邀约进店,门店接待能力弱;"
    ],
    "generatedTask": {
      "courseTitle": "小红书获客：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次小红书获客表达。",
      "assessmentFocus": "检查学员是否能说清小红书获客的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0096",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "客诉处理",
      "小红书获客",
      "社群SOP"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:35:08.317Z",
    "charCount": 3513,
    "evidenceSnippets": [
      "- 内容项:出报价、出图纸、邀约客户、方案对比、价格协商、成交推进的完整流程",
      "- 关联案例:跟单过程中常见价格与方案不匹配、需求反复变更、报价与预期差异等问题",
      "- 内容项:KOC开发策略、小区群运营方法、小红书获客、扫楼加微信、线下地推"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0097",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:36:19.158Z",
    "charCount": 3009,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售在进入培训系统的第一阶段建立正确的行业认知、成长预期和销冠特质理解,减少急于求成、胆小害羞、缺少长期主义等问题。",
      "作为一名培训负责人,我希望新人先完成认知校准和特质理解,再进入技能训练,以减少重复解释成本。",
      "作为一名店长,我希望系统提前告诉新人什么是正确心态(胆大心细脸皮厚)、什么是错误心态(害羞胆小),降低带教压力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0098",
    "title": "产品知识与报价能力模块-PRD",
    "sourceFile": "05-产品知识与报价能力模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/05-产品知识与报价能力模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "客户接待闭环",
      "需求挖掘",
      "指标异常判断"
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
    "sourceUpdatedAt": "2026-04-15T08:36:56.888Z",
    "charCount": 2812,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售在两周内快速掌握产品知识(第一周)和报价能力(第二周),确保一个月内能够独立完成报价和接待客户。",
      "报价练习:练习次数、报价金额、合理性评分、价格方案匹配度",
      "成果数据:产品知识考核分数、报价能力考核分数、熟练度标签"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：产品知识与报价能力模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0099",
    "title": "客户接待与破冰技巧模块-PRD",
    "sourceFile": "06-客户接待与破冰技巧模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/06-客户接待与破冰技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "客户接待闭环",
      "新人培养与考核",
      "指标异常判断",
      "高客单成交"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:37:49.069Z",
    "charCount": 3013,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人通过模拟训练提升接待能力,而不是只看不练。",
      "成果数据:接待能力考核分数、接待能力标签(优秀/良好/需提升)",
      "店长/培训师:查看本门店学员的演练记录、考核成绩、接待能力标签"
    ],
    "generatedTask": {
      "courseTitle": "客户接待闭环：客户接待与破冰技巧模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次客户接待闭环表达。",
      "assessmentFocus": "检查学员是否能说清客户接待闭环的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0101",
    "title": "售后问题处理与客户维护模块-PRD",
    "sourceFile": "08-售后问题处理与客户维护模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/08-售后问题处理与客户维护模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "客诉处理",
      "新人培养与考核",
      "社群SOP",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:39:17.523Z",
    "charCount": 3027,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人掌握售后处理的原则和话术,提升客户满意度。",
      "`进入模块` → `学习售后问题分类` → `学习处理流程SOP` → `学习客户沟通话术` → `学习极端案例处理策略` → `模拟售后处理训练` → `售后能力考核` → `解锁下一模块`",
      "成果数据:售后能力考核分数、售后能力标签(优秀/良好/需提升)"
    ],
    "generatedTask": {
      "courseTitle": "客诉处理：售后问题处理与客户维护模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次客诉处理表达。",
      "assessmentFocus": "检查学员是否能说清客诉处理的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0102",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "09-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/门店管理与销售团队培养实践/09-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "客户接待闭环",
      "客诉处理"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:40:02.314Z",
    "charCount": 3291,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人通过实战复盘,形成持续学习的习惯。",
      "**模块目标**:通过闯关任务和实战复盘,验证新人是否具备独立工作能力,生成个人成长报告,确保一个月内达到成交结果。",
      "因此,系统需要提供闯关任务设计、能力考核、成长报告生成和复盘功能。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与实战复盘模块-PRD",
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
    "id": "lk-0107",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:21:19.515Z",
    "charCount": 2960,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人先完成认知校准,再进入技能训练,以减少重复解释成本。",
      "作为一名店长,我希望系统提前告诉新人什么是正确心态、什么是错误心态,降低带教压力,让新人明白\"成功主要靠自己\"。",
      "**模块目标**:帮助新人销售建立正确的行业认知、成长预期和学习心态,明确成长周期(有经验者1个月,无经验者2-3个月),理解核心能力要求(赚钱欲望、主动性、流程熟悉度),减少急于求成、抗压不足、缺少长期主义等问题。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0108",
    "title": "客户接待与需求诊断模块-PRD",
    "sourceFile": "05-客户接待与需求诊断模块-PRD.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/05-客户接待与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "小红书获客",
      "指标异常判断",
      "转化复盘"
    ],
    "sceneTags": [
      "客户首次进店",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:21:59.647Z",
    "charCount": 2688,
    "evidenceSnippets": [
      "**模块目标**:让新人销售掌握客户接待流程、产品介绍方法、节点把握技巧,学会\"先判断、再沟通\"的接待逻辑,能够在客户进店或线上咨询的早期阶段快速识别客户类型、核心需求。",
      "作为店长,我希望新人能在第一次接待时就按标准流程操作,减少我的带教压力。",
      "- 接待流程步骤卡片(进店→问候→了解需求→产品介绍→铺垫→送客/跟进)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户接待与需求诊断模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
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
    "id": "lk-0110",
    "title": "产品知识学习与考核模块-PRD",
    "sourceFile": "07-产品知识学习与考核模块-PRD.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/07-产品知识学习与考核模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "板材产品解释",
      "需求挖掘",
      "客户接待闭环",
      "指标异常判断",
      "转化复盘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:23:25.039Z",
    "charCount": 2942,
    "evidenceSnippets": [
      "**客户高频问题**:客户常问\"拉米与万利区别\"\"使用的板材\"\"环保等级\",新人需要快速回答。",
      "**模块目标**:让新人销售快速掌握产品线知识、产品单价、工艺说明,解决高端产品线熟悉度低、产品知识庞大难以记忆的问题,通过AI智能查询和定期考核增强记忆。",
      "**难以记忆**:云屏上已有产品单价和工艺说明,但新人难以记忆,客户一问就不知道;"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识学习与考核模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0111",
    "title": "报价制作与检查模块-PRD",
    "sourceFile": "08-报价制作与检查模块-PRD.md",
    "relativePath": "流程清单/门店管理与新人培养运营实践访谈/08-报价制作与检查模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "五金场景讲解",
      "客户接待闭环",
      "审单防错"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:24:08.339Z",
    "charCount": 3223,
    "evidenceSnippets": [
      "报价检查必须覆盖**10类常见问题**(漏项、数量错误、价格错误、五金遗漏等)。",
      "- 报价制作流程(客户需求→产品选择→数量计算→价格计算→检查→确认)",
      "报价信息:报价ID、报价类型、客户需求、产品清单、数量、价格、优惠"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：报价制作与检查模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
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
    "id": "lk-0113",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "需求挖掘",
      "资源开拓",
      "转化复盘",
      "会审协同"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:24:37.285Z",
    "charCount": 3092,
    "evidenceSnippets": [
      "3. **自动化数据统计**:抓取社群数据、自动生成看板、减少人工操作;",
      "**勘探阶段**:在群里发勘探需求接龙时,活跃群有20%-50%客户回应,不活跃群无人回应;",
      "**[社群数量]**:原文提到\"六个群\",需确认是否指运营中的小区群总数。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：清洗后的知识库文档",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0114",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "转化复盘",
      "需求挖掘",
      "资源开拓",
      "新人培养与考核"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:25:16.797Z",
    "charCount": 2638,
    "evidenceSnippets": [
      "本大纲基于《钱蕾店长》访谈内容,将门店小区运营、社群管理、数据统计等线下经验,转化为可线上化、可复用、可培训的功能模块。标注说明如下:",
      "原因:这5个模块直接覆盖门店\"小区开拓→社群运营→客户管理→数据分析→协同执行\"的完整最小闭环。",
      "- **线上化功能描述**:系统自动汇总每天接待数、加微数、签单数、收款数;生成转化率与成交率分析;以表格+柱状图形式展示;可点击查看每个销售的详细数据;提供异常预警(如多方案无收款)。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：功能模块大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0115",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "需求挖掘",
      "社群SOP",
      "资源开拓",
      "转化复盘",
      "会审协同"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:25:55.660Z",
    "charCount": 2555,
    "evidenceSnippets": [
      "- 内容项:关键指标定义、统计口径、数据看板设计、异常预警标准",
      "- 内容项:小区现场照片、户型图、进度信息、样板间案例、进入注意事项",
      "- 关联案例:每天统计接待数、加微数、签单数、收款数,通过数据判断转化率与预警"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：知识库大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0116",
    "title": "小区信息共享与实时更新平台-PRD",
    "sourceFile": "04-小区信息共享与实时更新平台-PRD.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/04-小区信息共享与实时更新平台-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:26:42.823Z",
    "charCount": 2706,
    "evidenceSnippets": [
      "**模块目标**:解决门店小区信息分散、更新不及时、重复劳动等问题,实现多门店实时共享小区进度、户型图、现场照片等信息,提升小区开拓效率,降低被抓风险。",
      "作为一名区域经理,我希望查看各门店的小区开拓进度与覆盖范围,统筹资源分配。",
      "作为一名销售,我希望快速查看目标小区的最新进度、户型图、进入注意事项,避免重复跑现场或信息过时。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区信息共享与实时更新平台-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0117",
    "title": "AI社群运营策划助手-PRD",
    "sourceFile": "05-AI社群运营策划助手-PRD.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/05-AI社群运营策划助手-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "高客单成交",
      "资源开拓"
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
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:27:20.043Z",
    "charCount": 2866,
    "evidenceSnippets": [
      "**输入参数**:小区房价区间、客户阶段、运营目标、群活跃度",
      "店长使用AI比运营助理更懂自己需求,但需AI了解群状态。",
      "**模块目标**:帮助店长和运营人员根据小区房价层级、客户阶段自动生成运营方案,减少每周手动规划时间,提升运营策划效率与效果。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：AI社群运营策划助手-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0118",
    "title": "客户添加与跟进管理模块-PRD",
    "sourceFile": "06-客户添加与跟进管理模块-PRD.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/06-客户添加与跟进管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:28:05.329Z",
    "charCount": 3002,
    "evidenceSnippets": [
      "店长提出需要系统统计加微通过率、签单数,并通过签单客户发展KOC与样板间。",
      "企业微信对接:通过企业微信API获取客户添加数据(需解决权限问题)",
      "作为一名销售,我希望系统自动统计我的客户添加数据,避免每天手动填写。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：客户添加与跟进管理模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0119",
    "title": "销售数据自动化看板-PRD",
    "sourceFile": "07-销售数据自动化看板-PRD.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/07-销售数据自动化看板-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "转化复盘",
      "需求挖掘",
      "小红书获客",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:28:42.532Z",
    "charCount": 2863,
    "evidenceSnippets": [
      "店长提出需要每天自动汇总数据,生成看板判断转化率与成交率,发现异常及时预警。",
      "`数据采集` → `自动汇总` → `生成看板` → `异常检测` → `预警通知` → `数据导出`",
      "**模块目标**:解决门店数据统计耗时、数据分散、分析困难等问题,实现销售数据自动汇总、可视化展示、异常预警,提升数据驱动决策能力。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：销售数据自动化看板-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0120",
    "title": "社群运营执行与监控模块-PRD",
    "sourceFile": "08-社群运营执行与监控模块-PRD.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/08-社群运营执行与监控模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:29:27.944Z",
    "charCount": 2828,
    "evidenceSnippets": [
      "**模块目标**:解决社群运营执行分散、活跃度判断困难、效果无法量化等问题,实现运营任务分配、执行进度跟踪、群活跃度监控、效果数据分析。",
      "作为一名店长,我希望看到各群的运营执行进度与活跃度数据,便于调整策略。",
      "店长提出需要系统监控群活跃度,预警不活跃群,记录运营动作与效果。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：社群运营执行与监控模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0121",
    "title": "销售与运营协同工作台-PRD",
    "sourceFile": "09-销售与运营协同工作台-PRD.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/09-销售与运营协同工作台-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "会审协同",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "社群SOP",
      "转化复盘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:30:06.570Z",
    "charCount": 2993,
    "evidenceSnippets": [
      "店长提出需要固化协同流程为标准SOP,记录运营效果用于复盘,降低人员更替成本。",
      "- 任务类型选择(运营策划/文案输出/活动执行/数据统计)",
      "**任务类型**:单选(运营策划/文案输出/活动执行/数据统计)"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售与运营协同工作台-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0122",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/门店运营管理与数据可视化需求访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "需求挖掘",
      "新人培养与考核",
      "资源开拓",
      "会审协同"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:30:39.949Z",
    "charCount": 2057,
    "evidenceSnippets": [
      "原因:这5个模块直接覆盖门店\"小区开拓→社群运营→客户管理→数据分析→协同执行\"的完整最小闭环。",
      "| 重点模块 | 客户接待、异议处理、订单协同 | 小区信息、社群运营、数据看板 |",
      "| 核心场景 | 销售培训、客户接待、成交推进 | 小区运营、社群管理、数据分析 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0123",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "高客单成交",
      "客诉处理",
      "资源开拓"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:45:38.861Z",
    "charCount": 5852,
    "evidenceSnippets": [
      "使用**云屏**展示实际案例，让客户看到柜子的样子和价格；",
      "销售把客户需求、户型图、性格特点、注意事项对接给设计师；",
      "**[价格相关片段]**：原文中\"10万基础款\"\"70万大单\"等价格表述，建议补充具体产品内容说明。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
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
    "id": "lk-0125",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "板材产品解释",
      "客诉处理",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:47:34.475Z",
    "charCount": 3542,
    "evidenceSnippets": [
      "- 关联案例：客户嫌贵时，逐项解释板材、工厂、安装、售后等价值点",
      "- 内容项：100平户型案例、实际成交价格、落地效果展示",
      "- 关联案例：新人销售做某小区六七十家，熟悉同户型平均水平"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0126",
    "title": "产品知识学习系统模块-PRD",
    "sourceFile": "04-产品知识学习系统模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/04-产品知识学习系统模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "板材产品解释",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T09:50:45.179Z",
    "charCount": 5622,
    "evidenceSnippets": [
      "解决新人对产品知识（板材、材质、工艺参数等）不够通透的问题，通过系统化学习让新人在短时间内掌握产品知识，提升与客户沟通的自信度和专业度。",
      "配套话术：\"您问到这个细节很专业，我们的板材在环保方面...\"",
      "1. **学习周期长**：总部培训15天，门店实战还需1-3个月"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识学习系统模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0127",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:48:26.420Z",
    "charCount": 2853,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售在进入培训系统的第一阶段建立正确的行业认知、成长预期和学习心态，区分有销售经验与跨行业新人的差异化学习路径。",
      "作为一名培训负责人，我希望新人先完成认知校准，再进入技能训练，以减少重复解释成本。",
      "作为一名店长，我希望系统提前告诉新人什么是正确心态、什么是错误心态，降低带教压力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0128",
    "title": "客户接待与需求诊断模块-PRD",
    "sourceFile": "05-客户接待与需求诊断模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/05-客户接待与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "客户接待闭环",
      "报价推进",
      "审单防错",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户首次进店",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:49:04.249Z",
    "charCount": 2809,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握黄金30秒接待原则、八大客户类型识别、破冰技巧和需求诊断方法，学会\"先判断、再沟通\"。",
      "作为一名新人销售，我希望快速识别客户类型，避免用错误方式接待。",
      "作为一名培训负责人，我希望新人掌握八大客户类型的接待策略。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户接待与需求诊断模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0130",
    "title": "异议处理与报价成交模块-PRD",
    "sourceFile": "06-异议处理与报价成交模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/06-异议处理与报价成交模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "高客单成交",
      "客户接待闭环",
      "客诉处理",
      "审单防错"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-16T01:49:47.218Z",
    "charCount": 3100,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握\"太贵了\"异议处理、交货期管理、安装保障说明、报价拆解、成交话术等核心技能。",
      "`进入模块` → `学习\"太贵了\"异议处理` → `学习交货期管理` → `学习安装保障话术` → `学习报价拆解` → `学习成交话术` → `场景模拟训练` → `模块测验`",
      "根据访谈，异议处理是成交的关键环节。当前新人普遍存在以下问题："
    ],
    "generatedTask": {
      "courseTitle": "报价推进：异议处理与报价成交模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0131",
    "title": "AI产品知识助手模块-PRD",
    "sourceFile": "06-AI产品知识助手模块-PRD.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/06-AI产品知识助手模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "板材产品解释",
      "报价推进",
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:53:55.065Z",
    "charCount": 5830,
    "evidenceSnippets": [
      "1. **专业问题卡壳**：客户问胶水含量、配比等细节，新人答不上来导致投诉"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：AI产品知识助手模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
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
    "id": "lk-0134",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/全屋定制销售技巧与新人培训/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:44:11.547Z",
    "charCount": 819,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将线下销售带教与训练流程转化为可线上化的培训模块。",
      "3. **知识库大纲**：按照产品类、培训类、设计类、公司规范类整理知识项。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0135",
    "title": "任务流程清单",
    "sourceFile": "任务流程清单.md",
    "relativePath": "流程清单/任务流程清单.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager",
      "designer"
    ],
    "competencyTags": [
      "指标异常判断",
      "新人培养与考核",
      "审单防错",
      "转化复盘"
    ],
    "sceneTags": [
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T05:33:14.824Z",
    "charCount": 3525,
    "evidenceSnippets": [
      "你是一位专业的数据清洗与知识管理专家。你擅长处理非结构化的访谈文本，能够精准识别并去除噪音数据（如口水词、无关闲聊），将口语化内容转化为逻辑严密、结构清晰的书面语，同时具备敏锐的“存疑”意识，能够准确识别需要人工复核的内容。",
      "请阅读下方的【原始访谈/文档内容】，梳理培训教师的完整培训流程，并将其转化为“AI培训销售智能体”的功能模块大纲。",
      "2. **线上化转化**：思考哪些步骤可以通过“线上/前置培训”的方式完成。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：任务流程清单",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager",
        "designer"
      ]
    }
  },
  {
    "id": "lk-0136",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "非标下单底线",
      "量尺出图",
      "审单防错",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-16T01:44:03.521Z",
    "charCount": 2509,
    "evidenceSnippets": [
      "**当前工作**：制作基础类设计规范，如板件使用规范尺寸、面板上下标准流控等",
      "**培训计划**：本月10号开始培训，后续纳入商学院新人培训",
      "[新人过渡学习]：提到\"入岗之前到相关部门进行过渡学习\"，但未明确过渡学习时长、考核标准等具体安排"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0137",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "岗位边界",
      "会审协同",
      "审单防错",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:44:53.734Z",
    "charCount": 3428,
    "evidenceSnippets": [
      "**探讨点**：设计规范培训是否需要与商学院新人培训系统打通？考核通过标准如何设定？",
      "2. **培训周期设定**：新人过渡学习的标准周期是多久？是否存在差异化管理需求？",
      "5. **审单协同优化**：当前审单效率问题的优先级是否高于培训体系建设？"
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
    "id": "lk-0139",
    "title": "设计规范培训管理模块-PRD",
    "sourceFile": "04-设计规范培训管理模块-PRD.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/04-设计规范培训管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:46:43.647Z",
    "charCount": 3951,
    "evidenceSnippets": [
      "1. **与商学院系统对接**：是否需要与现有商学院新人培训系统打通？数据是否互通？",
      "4. **讲师资源**：培训课程是否有现成的视频资源？是否需要重新录制？",
      "解决设计规范培训线下组织效率低、内容分散、效果难以追踪的问题。通过线上化方式，实现设计规范的标准化管理、自动推送培训、进度追踪与效果评估，提升设计师对设计规范的理解和应用能力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计规范培训管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0140",
    "title": "设计工具培训模块-PRD",
    "sourceFile": "05-设计工具培训模块-PRD.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/05-设计工具培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:47:40.679Z",
    "charCount": 4519,
    "evidenceSnippets": [
      "解决驻店设计师对三维家、CD等设计工具掌握程度参差不齐、培训资源分散、操作细节容易遗忘的问题。通过系统化的工具培训课程、技巧库和实操练习，提升设计师的软件操作能力，确保效果图制作质量和效率。",
      "2. **CD培训资源**：CD软件培训视频是否已有现成资源？是否需要重新录制？",
      "| 新人设计师 | ✓ | ✓ | ✓ | ✓ | ✓ |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计工具培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0141",
    "title": "审单协同与问题反馈模块-PRD",
    "sourceFile": "06-审单协同与问题反馈模块-PRD.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/06-审单协同与问题反馈模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "会审协同",
      "审单防错",
      "指标异常判断",
      "新人培养与考核",
      "量尺出图",
      "报价推进"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:48:46.707Z",
    "charCount": 5049,
    "evidenceSnippets": [
      "| 角色 | 查看订单 | 审单标注 | 提交问题 | 修改确认 | 查看标准 | 数据看板 |",
      "解决审单过程中与设计师沟通效率低、问题反馈不及时、订单拖延严重的问题（目前一个订单可能因审单问题拖延5-10天，单值大的订单可能拖延15天以上）。通过线上化协同工具，实现审单状态实时追踪、问题在线反馈与标注、响应时限预警，提升审单效率，确保订单一次安装成功。",
      "- 核心指标卡片（平均审单时长、超时订单数、一次通过率）"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：审单协同与问题反馈模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0143",
    "title": "新人入职过渡学习管理模块-PRD",
    "sourceFile": "08-新人入职过渡学习管理模块-PRD.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/08-新人入职过渡学习管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "小红书获客",
      "资源开拓",
      "岗位边界"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:51:32.982Z",
    "charCount": 6676,
    "evidenceSnippets": [
      "解决新人设计师入岗前过渡学习管理混乱、学习内容分散、学习效果难以评估的问题。通过系统化的学习计划制定、在线学习资源、进度追踪和成果验收，帮助新人设计师快速适应岗位要求，缩短成长周期。",
      "1. **过渡学习周期**：新人过渡学习的标准周期是多久？是否所有岗位统一？",
      "| 新人设计师 | ✓(自己的) | ✓ | ✓ | ✓ | ✓ | - | - |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职过渡学习管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0144",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计部门工作内容及培训讨论/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "资源开拓",
      "需求挖掘",
      "量尺出图",
      "会审协同",
      "审单防错"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:52:15.360Z",
    "charCount": 3114,
    "evidenceSnippets": [
      "讨论设计部门相关工作，包括设计经验、组织架构、与销售及产品部门的配合、效果图出图时长、设计师能力评判、培训体系、审单机制等内容",
      "1. **P0模块设计**：完成设计规范培训管理、设计工具培训、审单协同三个核心模块的详细设计",
      "本项目基于2026年4月8日的设计部门工作内容及培训讨论访谈记录，通过AI培训设计师智能体的需求分析与设计，形成了一套完整的培训体系方案。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
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
    "id": "lk-0146",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "报价推进",
      "设计方案讲解",
      "会审协同",
      "非标下单底线",
      "量尺出图"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:25:57.272Z",
    "charCount": 3490,
    "evidenceSnippets": [
      "**户型基本了解**：对户型结构、尺寸、空间关系有清晰认知",
      "**报价区间预判**：在出图前先给客户价格范围参考，减少无效方案",
      "*案例**：某女业主极度健忘，四次对单后仍说\"没有变化\"，但在尺寸阶段又开始逐项调整。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0147",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "设计方案讲解",
      "会审协同",
      "报价推进",
      "高客单成交"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:26:29.320Z",
    "charCount": 2365,
    "evidenceSnippets": [
      "- **线上化功能描述**：系统支持按户型、风格、价格、客户类型检索设计案例，并关联需求特征、设计方案、客户反馈与成交结果。",
      "- **线上化功能描述**：系统提供户型案例库、需求诊断清单、方案讲解脚本模板、设计亮点提炼训练，帮助新人学会\"从需求到方案再到讲解\"的完整流程。",
      "本大纲基于《万骊两年设计经验》访谈内容，将线下门店中由资深设计师、店长、销售协同完成的设计师培训过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下："
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：功能模块大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0148",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "报价推进",
      "设计方案讲解",
      "会审协同",
      "非标下单底线",
      "新人培养与考核"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:27:08.390Z",
    "charCount": 2627,
    "evidenceSnippets": [
      "- 内容项：需求交接节点、方案会审节点、报价同步节点、现场配合节点",
      "- 内容项：需求交接流程、信息同步机制、价格变动处理规则、现场配合职责",
      "- 内容项：需求收集字段、板材颜色记录、家具尺寸记录、风格偏好标注"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0151",
    "title": "销售设计师协同配合模块-PRD",
    "sourceFile": "06-销售设计师协同配合模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/06-销售设计师协同配合模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "需求挖掘",
      "报价推进",
      "设计方案讲解",
      "新人培养与考核",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:28:48.451Z",
    "charCount": 2211,
    "evidenceSnippets": [
      "优秀案例（球姐）表明：完整的需求交接、方案会审确认、预算把控配合是高效协同的关键。",
      "`学习协同重要性` → `掌握需求交接规范` → `练习方案会审` → `学习现场配合技巧` → `完成协同案例训练` → `获得评分与反馈`",
      "- 会审检查清单（需求理解是否一致、预算是否合适、细节是否确认）"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售设计师协同配合模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0152",
    "title": "客户质疑应对与沟通技巧模块-PRD",
    "sourceFile": "07-客户质疑应对与沟通技巧模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/07-客户质疑应对与沟通技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "设计方案讲解",
      "客户接待闭环",
      "指标异常判断"
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
    "sourceUpdatedAt": "2026-04-16T01:29:16.274Z",
    "charCount": 2160,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人掌握常见的客户质疑类型和应对方法。",
      "培训负责人：配置质疑案例、设置通过阈值、查看学员训练数据",
      "`学习质疑类型` → `掌握应对策略` → `练习沟通技巧` → `模拟质疑场景` → `完成阶段测验` → `获得评分与反馈`"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户质疑应对与沟通技巧模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
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
    "id": "lk-0154",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师方案讲解与客户需求把控访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "会审协同",
      "设计方案讲解",
      "新人培养与考核",
      "转化复盘"
    ],
    "sceneTags": [
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:30:02.862Z",
    "charCount": 1171,
    "evidenceSnippets": [
      "4. **销售设计师协同**：完整需求交接、方案会审确认、预算把控配合",
      "2. **功能模块大纲**：将设计师培训与销售协同流程转化为可线上化的培训模块。",
      "1. **方案讲解核心要素**：户型了解、需求把控、亮点呈现、痛点解决"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0155",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "会审协同",
      "新人培养与考核",
      "量尺出图",
      "非标下单底线",
      "审单防错"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:56:43.371Z",
    "charCount": 5323,
    "evidenceSnippets": [
      "**需求对接明确**：方案讲解前必须与销售、客户充分沟通，确保需求理解准确；",
      "**生活场景描绘**：通过方案讲解让客户想象未来居住场景，增强代入感。",
      "**方案精准匹配**：设计方案高度符合客户期望，一次性通过，无需太多修改。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0156",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "设计方案讲解",
      "需求挖掘",
      "板材产品解释",
      "转化复盘"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T08:57:40.192Z",
    "charCount": 3896,
    "evidenceSnippets": [
      "本大纲基于《19年入职设计师》访谈内容，将线下门店中由设计师、销售、店长协同完成的设计师成长过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：设计师与销售通过方案会审、需求对接、订单跟进等工作，建立协同配合默契。",
      "- **线上化功能描述**：系统提供标准协同流程指引、方案会审参与规范、需求记录表对接方法、客户疑问协同应对策略，帮助设计师理解协同工作标准与提升配合效率。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：功能模块大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0157",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "设计方案讲解",
      "非标下单底线",
      "客诉处理",
      "量尺出图",
      "新人培养与考核"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "客户追问价格",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:58:40.251Z",
    "charCount": 3884,
    "evidenceSnippets": [
      "- 关联案例：受访者描述设计师日常工作包括测量、画图、下单、售后跟单、方案会审等",
      "- 内容项：测量标准流程、设计方案制作规范、下单流程规范、售后跟单要求",
      "- 关联案例：设计师描述日常工作包括测量、画图、下单、售后跟单"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0158",
    "title": "方案设计与讲解能力模块-PRD",
    "sourceFile": "04-方案设计与讲解能力模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/04-方案设计与讲解能力模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "会审协同",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T08:59:36.131Z",
    "charCount": 2705,
    "evidenceSnippets": [
      "评估数据:方案讲解视频、评估维度得分、综合评分、能力雷达图",
      "作为一名新人设计师,我希望学习优秀的方案讲解案例与话术,避免在客户面前表达混乱。",
      "店长/培训师:查看本门店设计师的学习进度、练习数据、评估结果"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案设计与讲解能力模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
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
    "id": "lk-0162",
    "title": "设计师闯关考核与能力评估模块-PRD",
    "sourceFile": "08-设计师闯关考核与能力评估模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/08-设计师闯关考核与能力评估模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "会审协同",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:02:45.384Z",
    "charCount": 3545,
    "evidenceSnippets": [
      "能力数据:方案设计评分、需求对接评分、方案讲解评分、协同配合评分、问题应对评分、空间规划评分",
      "**模块目标**：通过闯关任务形式,系统性评估设计师的方案设计、需求对接、方案讲解、协同配合、问题应对等核心能力,生成个人能力雷达图与成长建议,形成完整的能力闭环。",
      "- 能力雷达图:方案设计、需求对接、方案讲解、协同配合、问题应对、空间规划"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师闯关考核与能力评估模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0163",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师方案讲解与销售配合经验/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "设计方案讲解",
      "新人培养与考核",
      "板材产品解释",
      "需求挖掘",
      "五金场景讲解"
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:03:31.303Z",
    "charCount": 2728,
    "evidenceSnippets": [
      "**制度流程文档**：方案会审制度全文、设计师考核制度、环保承诺书范本、需求记录表模板",
      "**培训资料**：设计师入职培训课件、方案讲解话术手册、客户沟通技巧手册、协同工作流程手册",
      "1. **清洗后的知识库文档**：沉淀访谈中的设计师专业经验与培训需求,并标记待确认项。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0164",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "需求挖掘",
      "非标下单底线",
      "量尺出图",
      "会审协同",
      "报价推进"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户首次进店",
      "新人入门考核",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:34:13.706Z",
    "charCount": 3918,
    "evidenceSnippets": [
      "套餐吸引来的客户往往对价格敏感，后期容易因预算差距产生矛盾；",
      "*理想案例**：销售提前算好预算（二十万、三十万、四十万不同档位），设计师测量时一起上门，给客户服务到位的感觉，客户第一次进店就预付。",
      "客户对自家尺寸很清楚时，如果设计师对过道宽度、桌子大小等回答含糊，会被质疑专业性；"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0165",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "会审协同",
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:34:43.950Z",
    "charCount": 2504,
    "evidenceSnippets": [
      "本大纲基于《设计师张震》访谈内容，将线下门店中设计师的方案讲解、客户沟通、销售协同等经验，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **线上化功能描述**：系统支持素材分类管理（风格、户型、空间）、快速检索、标签标注，并与方案讲解场景联动调用。",
      "- **对应线下流程**：设计师在出方案前通过腾讯会议与客户沟通，收集风格偏好、生活习惯、空间需求等信息。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：功能模块大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0166",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "会审协同",
      "非标下单底线",
      "量尺出图",
      "新人培养与考核",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:35:23.633Z",
    "charCount": 2875,
    "evidenceSnippets": [
      "- 内容项：未判断客户讲解偏好、尺寸把握不严谨、讲解过程专注度不足",
      "- 关联案例：设计师总结三个常犯错误，并提出手机静音、提前准备尺寸数据等解决方案",
      "- 内容项：生活习惯异议、尺寸异议、实用性异议、说服技巧、替代方案设计"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0167",
    "title": "设计方案素材库与案例平台-PRD",
    "sourceFile": "04-设计方案素材库与案例平台-PRD.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/04-设计方案素材库与案例平台-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "客户接待闭环",
      "需求挖掘",
      "新人培养与考核"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:36:21.360Z",
    "charCount": 2505,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师建立系统的素材积累与管理能力，支持方案讲解时的快速检索与调用，提升临场应对效率与客户体验。",
      "作为一名培训负责人，我希望新人设计师能够快速获取优秀案例素材，减少从零积累的时间成本。",
      "根据访谈，设计师强调方案讲解的核心要素之一是**素材积累**："
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：设计方案素材库与案例平台-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0170",
    "title": "方案讲解技巧与临场应对模块-PRD",
    "sourceFile": "07-方案讲解技巧与临场应对模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/07-方案讲解技巧与临场应对模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "客户接待闭环",
      "指标异常判断"
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
    "sourceUpdatedAt": "2026-04-16T01:38:07.365Z",
    "charCount": 2636,
    "evidenceSnippets": [
      "因此，系统需要提供方案讲解技巧培训与临场应对演练，帮助设计师提升讲解能力。",
      "考核记录：考核场景、录音/文字内容、各维度评分、综合评分",
      "**模块目标**：帮助设计师系统化学习方案讲解技巧，提升临场应对能力，能够在不同客户场景下灵活调整讲解策略，提高客户转化率。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解技巧与临场应对模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0171",
    "title": "设计师与销售协同配合模块-PRD",
    "sourceFile": "08-设计师与销售协同配合模块-PRD.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/08-设计师与销售协同配合模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "设计方案讲解",
      "转化复盘",
      "岗位边界",
      "指标异常判断",
      "新人培养与考核"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户方案会审",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:38:39.305Z",
    "charCount": 2509,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师与销售建立高效的协同配合机制，通过信息共享、角色分工、现场配合等方式提升客户转化效率。",
      "因此，系统需要提供设计师与销售协同配合的工具与培训，提升团队协作效率。",
      "协同转化率提升 **≥ 10%**（培训后实际业绩对比）。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：设计师与销售协同配合模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0172",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师方案讲解准备与临场发挥/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "会审协同",
      "新人培养与考核"
    ],
    "sceneTags": [
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:35:34.783Z",
    "charCount": 881,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将设计师方案讲解、客户沟通、销售协同等流程转化为可线上化的培训模块。",
      "访谈主要聚焦**设计师方案讲解与协同**，对设计规范、产品参数、正式制度等信息覆盖有限，后续建议补充正式资料。",
      "关于**智能体会审系统**的构想，建议与培训教师确认是否符合产品规划方向。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0173",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "岗位边界",
      "新人培养与考核",
      "需求挖掘",
      "设计方案讲解",
      "量尺出图",
      "审单防错"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:16:31.396Z",
    "charCount": 4010,
    "evidenceSnippets": [
      "*错误表现**：客户提出某个需求（即使技术上难以实现），设计师直接拒绝或否定。",
      "2. **\"方案\"岗位**：原文提到店内只有\"设计师\"和\"方案\"两个岗位，\"方案\"岗位的具体职责未明确说明，建议补充。",
      "1. **精准把握客户喜好点**：在首次沟通时，必须准确识别客户真正喜欢的风格和需求方向。"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0174",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "需求挖掘",
      "量尺出图",
      "设计方案讲解"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:17:15.991Z",
    "charCount": 3220,
    "evidenceSnippets": [
      "岗位职责说明文档：设计师日常工作内容清单（出图、客户沟通、现场测量、安装跟进、售后处理）",
      "> 基于\"华拓设计师2年工作经验\"访谈记录梳理，用于设计师岗位培训线上化。",
      "*探讨点**：是否需要区分\"销售转设计师\"和\"应届设计师\"两条入职路径的不同培训内容？"
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
    "id": "lk-0175",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "岗位边界",
      "新人培养与考核",
      "需求挖掘",
      "报价推进",
      "设计方案讲解",
      "量尺出图"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:18:05.847Z",
    "charCount": 3876,
    "evidenceSnippets": [
      "**来源依据**：\"他在旁边报价，然后我在旁边配合他一些我们说比如说这个东西为什么贵\"",
      "> 基于\"华拓设计师2年工作经验\"访谈记录构建，为设计师培训智能体提供知识支撑。",
      "**关联案例**：设计师与销售共同审核效果图是否符合客户需求"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0176",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "指标异常判断",
      "量尺出图"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:18:36.064Z",
    "charCount": 1940,
    "evidenceSnippets": [
      "解决设计师新人入职时对岗位职责、工作内容、考核标准认知不清晰的问题，通过线上化培训帮助新人快速建立职业认知，缩短适应期。",
      "| 日常工作清单 | 可展开的列表：出图、客户沟通、现场测量、安装跟进、售后处理 |",
      "| 内容完整性 | 岗位职责5项内容、工具教程≥3项 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0177",
    "title": "客户需求采集与方案设计模块-PRD",
    "sourceFile": "05-客户需求采集与方案设计模块-PRD.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/05-客户需求采集与方案设计模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "量尺出图",
      "报价推进"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:19:23.539Z",
    "charCount": 3808,
    "evidenceSnippets": [
      "> \"王女士，我理解您想做到完美。根据您家的户型和预算，这个方案已经是最优配置了。我们可以再调整一些细节，比如柜子的颜色或者把手的样式，您看哪些地方需要微调？\"",
      "帮助设计师建立标准化的客户需求采集流程，提升需求把握精准度，减少方案反复修改次数，提高一次通过率。",
      "| 客户画像表单 | 可填写/上传的表单：年龄、性格、风格偏好、户型信息 |"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求采集与方案设计模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0178",
    "title": "方案讲解与沟通技巧模块-PRD",
    "sourceFile": "06-方案讲解与沟通技巧模块-PRD.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/06-方案讲解与沟通技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "审单防错",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:20:22.682Z",
    "charCount": 5057,
    "evidenceSnippets": [
      "提升设计师的方案讲解能力和客户沟通技巧，通过标准化培训减少常见错误，提高客户满意度和方案一次通过率。",
      "*页面描述**：收集设计师在方案讲解中常犯的错误及正确应对方式。",
      "| 错误描述 | 客户提出某个需求（即使技术上难以实现），设计师直接拒绝或否定 |"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解与沟通技巧模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0179",
    "title": "销售协作与转化模块-PRD",
    "sourceFile": "07-销售协作与转化模块-PRD.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/07-销售协作与转化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "岗位边界",
      "转化复盘",
      "报价推进",
      "板材产品解释",
      "五金场景讲解",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:21:23.402Z",
    "charCount": 4744,
    "evidenceSnippets": [
      "> \"我来解释一下价格构成。首先是板材方面，我们使用的是XX品牌E0级环保板材，比普通板材贵了XX%，但耐用性和环保性更好。其次是五金配件，我们选用的是XX品牌的进口铰链，使用寿命是普通铰链的3倍。最后是工艺方面，您看这个封边工艺...\"",
      "建立设计师与销售的高效协作机制，明确各环节职责分工，提高客户转化率和订单成交效率。",
      "> \"我理解您的顾虑。其实每家的报价方式不同，有的只报柜体不报五金，有的用的是普通板材。我们可以帮您做一个详细对比，看看到底差在哪里。您方便把别家的报价单给我看看吗？我帮您分析一下。\""
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：销售协作与转化模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0180",
    "title": "闯关考核模块-PRD",
    "sourceFile": "08-闯关考核模块-PRD.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/08-闯关考核模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "岗位边界",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "运营复盘看板",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:22:23.665Z",
    "charCount": 5218,
    "evidenceSnippets": [
      "| 信息完整性 | 30% | 是否采集到所有必要信息（年龄、性格、风格、户型、预算） |",
      "*考核形式**：AI模拟客户观看效果图场景，设计师进行方案讲解。",
      "通过游戏化的闯关考核机制，系统化评估设计师的各项能力，根据考核结果提供个性化提升建议，形成\"学习-练习-考核-提升\"的闭环。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0181",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师工作方法与客户沟通技巧访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "需求挖掘",
      "设计方案讲解",
      "量尺出图"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:22:43.251Z",
    "charCount": 1679,
    "evidenceSnippets": [
      "| [04-新人入职与职业认知模块-PRD.md](./04-新人入职与职业认知模块-PRD.md) | 新人入职培训与职业认知建立 |",
      "**访谈主题**：设计师日常工作、方案讲解技巧、客户沟通、销售协作",
      "本文档集基于\"华拓设计师2年工作经验\"访谈记录整理，用于构建AI培训设计师智能体的功能模块和知识库。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0182",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "量尺出图",
      "会审协同",
      "非标下单底线",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:34:29.475Z",
    "charCount": 3121,
    "evidenceSnippets": [
      "1. **同质化风险**: 同户型需求相似情况下,AI建议可能导致方案相似度99%",
      "3. **职业危机**: AI发展最终趋势是设计师沦为下单员、测量员",
      "*核心理念**: 三分靠图,七分靠讲。重点在于让客户理解设计思路,解决客户痛点,满足客户需求。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0183",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "报价推进",
      "需求挖掘",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:35:17.031Z",
    "charCount": 3250,
    "evidenceSnippets": [
      "**需求采集表单**: 标准化录入客户基本信息、户型信息、风格偏好",
      "**实时反馈**: AI根据销冠思维模式对新人表现评分和建议",
      "**样板间VR展示**: 线上VR看房功能,客户可远程查看样板间细节"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0185",
    "title": "客户需求精准对接模块-PRD",
    "sourceFile": "04-客户需求精准对接模块-PRD.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/04-客户需求精准对接模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "非标下单底线",
      "新人培养与考核",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户首次进店",
      "客户追问价格",
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:37:31.357Z",
    "charCount": 2914,
    "evidenceSnippets": [
      "`客户进店` → `填写需求采集表` → `浏览样板间/参考图` → `收藏喜好元素` → `生成需求画像报告` → `设计师方案制作`",
      "行为数据: 浏览的样板间、收藏的元素、不喜欢的元素、搜索关键词",
      "**模块目标**: 帮助设计师和销售在方案制作前精准把握客户需求,减少反复修改,提升首次方案通过率"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求精准对接模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0186",
    "title": "方案协同会审模块-PRD",
    "sourceFile": "05-方案协同会审模块-PRD.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/05-方案协同会审模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:38:12.001Z",
    "charCount": 2992,
    "evidenceSnippets": [
      "核心价值:会审有存在意义,设计师非全知全能,可能遗漏细节;销售可及时指出客户需求;领导可建议添加特色元素提升客户认可度。",
      "作为一名销售,我希望在会审时补充客户真实需求,避免方案偏离",
      "**模块目标**: 提升方案会审效率,平衡多方意见,降低众口难调风险,提高方案质量"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：方案协同会审模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
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
  },
  {
    "id": "lk-0189",
    "title": "成交节点判断与推进模块-PRD",
    "sourceFile": "08-成交节点判断与推进模块-PRD.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/08-成交节点判断与推进模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "指标异常判断",
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-16T01:40:26.765Z",
    "charCount": 3438,
    "evidenceSnippets": [
      "作为一名店长,我希望看到团队的整体成交转化数据,优化推进策略",
      "**模块目标**: 智能判断客户成交意向,提供催单话术和推进策略,提升成交转化率",
      "成交数据: 成交ID、客户ID、成交时间、成交金额、跟进次数"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：成交节点判断与推进模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0190",
    "title": "设计师与销售协同工作台模块-PRD",
    "sourceFile": "09-设计师与销售协同工作台模块-PRD.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/09-设计师与销售协同工作台模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "岗位边界",
      "报价推进",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户首次进店",
      "客户追问价格",
      "运营复盘看板",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:41:16.175Z",
    "charCount": 3656,
    "evidenceSnippets": [
      "**角色边界模糊**: 价格问题设计师不能打包票,技术问题销售无法答复",
      "作为一名店长,我希望看到销售和设计师的协同效果,优化协作流程",
      "`客户进店` → `角色分配` → `协同服务` → `信息共享` → `角色边界提示` → `协同记录归档`"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：设计师与销售协同工作台模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0191",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师工作日常与AI培训系统讨论/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "岗位边界",
      "设计方案讲解",
      "需求挖掘",
      "高客单成交"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:41:57.651Z",
    "charCount": 2546,
    "evidenceSnippets": [
      "**培训类**: 方案讲解话术、异议应对话术、成交推进话术、协同规范等",
      "详细设计方案协同会审功能模块,提升会审效率,平衡多方意见,降低众口难调风险。",
      "**公司规范类**: 服务流程规范、角色职责边界、工作量标准、口碑服务准则"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0192",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "岗位边界",
      "量尺出图",
      "需求挖掘",
      "客诉处理"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:26:27.637Z",
    "charCount": 6340,
    "evidenceSnippets": [
      "*注意**:每个设计师出图水平不同,主要看是否符合客户需求。",
      "3. **承担责任**:如果是公司或安装售后问题,诚恳道歉",
      "3. **深入挖掘**:因为已经沟通过一遍需求,如果框架满意但颜色不满意,就知道问题点在哪"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0195",
    "title": "设计师入职与职业认知模块-PRD",
    "sourceFile": "04-设计师入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/04-设计师入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "岗位边界",
      "新人培养与考核",
      "量尺出图",
      "客户接待闭环",
      "客诉处理",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:30:16.419Z",
    "charCount": 3173,
    "evidenceSnippets": [
      "作为一名店长/资深设计师,我希望系统提前告诉新人设计师的工作职责、协同关系和能力要求,降低带教压力。",
      "根据访谈,设计师工作内容包括出图、客户沟通、现场测量、安装跟进、售后处理等多个环节,工作复杂度高。当前新设计师普遍存在以下问题:",
      "- 工作流程图解:出图(7-10天)→与销售审核→现场讲解方案→根据反馈改稿→配合逼单→现场测量→跟进安装→处理售后"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：设计师入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0196",
    "title": "客户需求诊断与意向采集模块-PRD",
    "sourceFile": "05-客户需求诊断与意向采集模块-PRD.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/05-客户需求诊断与意向采集模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "岗位边界",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:31:12.116Z",
    "charCount": 3874,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人学会如何与销售配合接收客户信息,如何与客户沟通收集意向。",
      "作为一名资深设计师,我希望系统能把我的需求诊断经验沉淀成标准化流程,降低带教成本。",
      "训练数据:客户画像识别正确率、意向图采集方法掌握度、精准提问技巧评分、客户心理判断准确率"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求诊断与意向采集模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0200",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师客户沟通与销售协作技巧访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "资源开拓",
      "会审协同",
      "社群SOP",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-16T01:34:52.057Z",
    "charCount": 2011,
    "evidenceSnippets": [
      "2. **功能模块大纲**:将线下设计师培训与协同流程转化为可线上化的培训模块。",
      "设计师的\"销售协同与改稿管理模块\"与销售的\"订单协同与跟单风控模块\"需要数据打通",
      "- 线上模拟演练的效果不如实战,如何平衡线上培训与线下带教的比例?"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0201",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "非标下单底线",
      "转化复盘",
      "会审协同"
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
    "sourceUpdatedAt": "2026-04-16T02:02:57.173Z",
    "charCount": 3637,
    "evidenceSnippets": [
      "**[数据口径]**：新人考核指标（接单12单、收款12万、下单2万）的统计周期与口径定义，建议补充说明。",
      "2. **数据未达标**：接单、收款、下单三项指标未达到新人标准。",
      "**云屏形式**：工艺、数据等具体内容，以企业微信云屏呈现。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0202",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "社群SOP",
      "设计方案讲解",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-16T02:03:34.123Z",
    "charCount": 2477,
    "evidenceSnippets": [
      "本大纲基于《设计师培训讲师》访谈内容，将线下由培训讲师、店长、设计总监协同完成的新人培训与跟进过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：培训讲师每周跟进新人数据，电话沟通了解问题，分析原因并提供解决方案。",
      "- **对应线下流程**：新人下店后按要求完成服务流程作业（发名片、方案会审等），讲师人工检查各群完成情况。"
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
    "id": "lk-0203",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "非标下单底线",
      "客户接待闭环",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T02:04:19.331Z",
    "charCount": 3082,
    "evidenceSnippets": [
      "- 关联案例：新人在培训期间需要快速建立产品体系整体认知，否则后期设计时不知道如何选择产品",
      "- 内容项：培训周期、课程安排、学习目标、考核标准、淘汰机制",
      "- 关联案例：新人需要了解三个月内必须达到接单12单、收款12万、下单2万的目标"
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
    "id": "lk-0204",
    "title": "产品知识与体系认知模块-PRD",
    "sourceFile": "04-产品知识与体系认知模块-PRD.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/04-产品知识与体系认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T02:04:59.540Z",
    "charCount": 2495,
    "evidenceSnippets": [
      "**模块目标**：帮助新人设计师在培训第一阶段快速建立产品体系整体认知，掌握拉姆元素、工艺知识、产品系列等核心内容，为后续软件操作与实战设计打下基础。",
      "作为一名培训讲师，我希望系统能帮助新人反复巩固产品知识，减少我在课堂上的重复讲解成本。",
      "作为一名设计总监，我希望新人下店前已掌握基础产品知识，降低带教压力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识与体系认知模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0205",
    "title": "软件操作与工艺落地模块-PRD",
    "sourceFile": "05-软件操作与工艺落地模块-PRD.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/05-软件操作与工艺落地模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T02:05:36.174Z",
    "charCount": 2827,
    "evidenceSnippets": [
      "培训讲师：查看本批次学员的作业完成情况、考核成绩、常见错误分布",
      "**模块目标**：帮助新人设计师掌握三维家软件操作技能，理解工艺落地规则，并通过AI辅助问答解决\"能否落地\"的疑问，减少向后端人员反复询问的时间。",
      "因此，系统需要提供\"软件操作培训 + 工艺落地问答 + 作业自动批改\"的综合解决方案。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：软件操作与工艺落地模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0206",
    "title": "阶段考核与淘汰预警模块-PRD",
    "sourceFile": "06-阶段考核与淘汰预警模块-PRD.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/06-阶段考核与淘汰预警模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T02:06:13.634Z",
    "charCount": 2790,
    "evidenceSnippets": [
      "**模块目标**：通过在线考核与数据分析，及时发现培训期间表现异常的学员，生成风险预警，辅助培训讲师做出筛选决策，提高培训质量与人才匹配度。",
      "培训讲师：查看本批次学员考核数据、发起谈话、调整风险等级、生成决策建议",
      "作为一名培训讲师，我希望系统能自动统计考试成绩并标记异常学员，减少人工筛选工作。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：阶段考核与淘汰预警模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0207",
    "title": "新人跟进与数据管控模块-PRD",
    "sourceFile": "07-新人跟进与数据管控模块-PRD.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/07-新人跟进与数据管控模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "非标下单底线",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "客户首次进店",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T02:06:55.900Z",
    "charCount": 2979,
    "evidenceSnippets": [
      "`进入模块` → `查看新人数据看板` → `系统识别数据异常` → `触发跟进提醒` → `查看原因诊断` → `记录沟通结果` → `生成复盘报告`",
      "作为一名培训讲师，我希望系统能提示数据异常的新人，让我及时跟进。",
      "**模块目标**：通过自动收集新人下店后的业绩数据，帮助培训讲师及时了解新人状态，发现问题并提供针对性帮助，提高新人留存率与业绩达标率。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人跟进与数据管控模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0208",
    "title": "服务流程与协同模块-PRD",
    "sourceFile": "08-服务流程与协同模块-PRD.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/08-服务流程与协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "会审协同",
      "指标异常判断",
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "新人入门考核",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T02:07:34.424Z",
    "charCount": 2933,
    "evidenceSnippets": [
      "作为一名培训讲师，我希望系统自动检测新人是否完成服务流程，减少人工翻看群消息的工作量。",
      "**模块目标**：通过自动检测与提醒功能，帮助培训讲师管理新人下店后的服务流程执行情况，减少人工检查工作量，确保服务规范落地。",
      "| 下店第2周 | 方案会审 | 完成方案会审并提交截图 | 下店后14天 | 群消息/作业检测 |"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：服务流程与协同模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0209",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师培训体系与AI辅助需求访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T02:07:55.770Z",
    "charCount": 1430,
    "evidenceSnippets": [
      "设计师培训讲师，负责新人产品体系讲解、培训考核、下店跟进等工作。",
      "**[考核指标口径]**：接单12单、收款12万、下单2万的统计周期与口径定义",
      "**[云屏]**：确认是企业微信功能还是独立系统，是否可对接"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0210",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "需求挖掘",
      "非标下单底线",
      "会审协同",
      "岗位边界",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:48:28.866Z",
    "charCount": 8907,
    "evidenceSnippets": [
      "本次访谈围绕**AI培训销售助手项目**展开,主要采集门店场景下设计师与销售协同工作的经验,以及探索AI工具如何优化销售流程与方案讲解表现。访谈涉及设计总监、设计师团队和销售人员,核心目标包括:",
      "**直接拿户型图出方案**:线上活动需求明确后,直接沟通户型图微改需求、收纳需求、风格偏好等;",
      "设计师在发效果图前会自己先导出价格看总价,避免方案与预算差距过大。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
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
    "id": "lk-0212",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "岗位边界",
      "新人培养与考核",
      "需求挖掘",
      "会审协同",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-15T09:50:16.005Z",
    "charCount": 3732,
    "evidenceSnippets": [
      "- 内容项:产品定价逻辑、空间报价拆分方法、预算预估工具、降配方案替代",
      "- 内容项:风格引导技巧、收纳需求挖掘、家庭结构分析、生活习惯提问清单",
      "- 内容项:预算铺垫技巧、未知需求开发、消费实力判断、高端产品推荐时机"
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
    "id": "lk-0213",
    "title": "客户需求深化与方案设计模块-PRD",
    "sourceFile": "04-客户需求深化与方案设计模块-PRD.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/04-客户需求深化与方案设计模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "报价推进",
      "岗位边界",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T09:51:07.714Z",
    "charCount": 2722,
    "evidenceSnippets": [
      "- 提问分类标签:风格偏好、收纳需求、家庭结构、生活习惯、预算范围",
      "因此,系统需要提供需求深化方法训练、预算预估工具和方案设计规范。",
      "作为一名设计总监,我希望设计师在方案设计前就充分考虑预算和需求,减少后期冲突。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户需求深化与方案设计模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0214",
    "title": "方案讲解与话术生成模块-PRD",
    "sourceFile": "05-方案讲解与话术生成模块-PRD.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/05-方案讲解与话术生成模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "岗位边界",
      "需求挖掘",
      "客户接待闭环",
      "新人培养与考核",
      "报价推进"
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:51:59.454Z",
    "charCount": 3310,
    "evidenceSnippets": [
      "**模块目标**:帮助设计师掌握方案讲解技巧,通过AI辅助生成优化话术,提升方案讲解表现力和客户信任度,提高成交转化率。",
      "**适用对象**:新入职设计师、表达能力需提升的设计师、方案讲解经验不足的设计师",
      "因此,系统需要提供方案讲解框架、AI话术生成和PPT辅助工具。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解与话术生成模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0215",
    "title": "销售设计师信息同步与协作模块-PRD",
    "sourceFile": "06-销售设计师信息同步与协作模块-PRD.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/06-销售设计师信息同步与协作模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "岗位边界",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "报价推进",
      "转化复盘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "客户追问价格",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:52:51.738Z",
    "charCount": 3362,
    "evidenceSnippets": [
      "**模块目标**:建立销售与设计师之间的信息同步机制,避免信息不对称、需求遗漏、重复沟通等问题,提升协作效率和客户体验。",
      "`客户建档` → `需求记录` → `分配设计师` → `实时同步` → `变更记录` → `协作提醒` → `冲突预警` → `协作复盘`",
      "作为一名设计师,我希望快速了解客户所有需求和历史沟通记录,避免重复询问客户。"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：销售设计师信息同步与协作模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0216",
    "title": "报价管理与预算控制模块-PRD",
    "sourceFile": "07-报价管理与预算控制模块-PRD.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/07-报价管理与预算控制模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "指标异常判断",
      "岗位边界",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:53:39.467Z",
    "charCount": 3050,
    "evidenceSnippets": [
      "**模块目标**:帮助设计师在方案设计时就考虑预算匹配,避免方案超预算导致的报价差异和客户流失,提升报价准确度和客户满意度。",
      "信息不同步,设计师单方面与客户沟通后需求变化,销售报价不准确。",
      "作为一名销售,我希望设计师的方案符合客户预算,避免客户因价格问题流失。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：报价管理与预算控制模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0217",
    "title": "效果图素材库与案例管理模块-PRD",
    "sourceFile": "08-效果图素材库与案例管理模块-PRD.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/08-效果图素材库与案例管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "岗位边界",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环",
      "资源开拓",
      "新人培养与考核"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:54:32.903Z",
    "charCount": 3475,
    "evidenceSnippets": [
      "**模块目标**:建立统一的效果图素材库,方便设计师上传案例、销售快速检索,提升案例复用效率和小区营销支持能力。",
      "作为一名销售,我希望快速找到与客户户型和风格相似的案例,提升客户信任度。",
      "作为一名店长,我希望建立门店统一案例库,提升小区营销效率。"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：效果图素材库与案例管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0218",
    "title": "方案讲解演练与复盘模块-PRD",
    "sourceFile": "09-方案讲解演练与复盘模块-PRD.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/09-方案讲解演练与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "转化复盘",
      "设计方案讲解",
      "指标异常判断",
      "新人培养与考核",
      "岗位边界",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户方案会审",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:55:37.363Z",
    "charCount": 4336,
    "evidenceSnippets": [
      "`选择演练场景` → `录制方案讲解` → `AI自动分析` → `生成评分报告` → `提取优秀话术` → `沉淀案例库` → `成长跟踪`",
      "**模块目标**:通过方案讲解录制、AI分析、优秀案例提取和成长报告,帮助设计师持续提升方案讲解能力,形成经验沉淀和复用机制。",
      "每周门店有小培训和优秀方案分享,但优秀经验没有系统沉淀;"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：方案讲解演练与复盘模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0219",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师团队管理与销售协作流程/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "岗位边界",
      "需求挖掘",
      "会审协同",
      "设计方案讲解",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:56:10.551Z",
    "charCount": 2139,
    "evidenceSnippets": [
      "这 6 个模块直接覆盖设计师从\"需求深化 → 方案设计 → 方案讲解 → 销售协同 → 报价管理 → 案例沉淀 → 能力提升\"的完整最小闭环。",
      "2. **功能模块大纲**:将线下设计师与销售协同流程转化为可线上化的培训模块。",
      "PPT呈现标准(品牌介绍、户型图、效果图、平面图、收纳方案)"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：README",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0220",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "报价推进",
      "设计方案讲解",
      "需求挖掘",
      "新人培养与考核",
      "客诉处理"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:31:21.990Z",
    "charCount": 5219,
    "evidenceSnippets": [
      "与销售人员协同完成客户接待、需求沟通、方案讲解与报价成交；",
      "**销售配合异议处理**：设计师讲专业内容，销售配合情绪承接与价格沟通。",
      "设计师表示，设计总监会审时主要关注**视觉呈现**，对客户需求洞察层面的建议有限。方案讲解的话术仍需设计师自行准备。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0222",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "需求挖掘",
      "新人培养与考核",
      "设计方案讲解",
      "报价推进"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:33:10.299Z",
    "charCount": 2957,
    "evidenceSnippets": [
      "- 内容项：家庭结构、夫妻职业、生活习惯、风格偏好、预算区间、户型痛点、空间重点需求",
      "- 内容项：方案设计能力、需求挖掘能力、方案讲解能力、客户沟通能力、升单推动能力、与销售协同能力",
      "- 内容项：新人常犯错误、方案讲解紧张、需求挖掘不深、升单意识不足、不会配合销售"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0225",
    "title": "方案讲解与价值传递模块-PRD",
    "sourceFile": "06-方案讲解与价值传递模块-PRD.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/06-方案讲解与价值传递模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "会审协同",
      "客户接待闭环",
      "报价推进",
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
    "sourceUpdatedAt": "2026-04-15T09:35:13.748Z",
    "charCount": 2726,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人设计师能通过模拟讲解训练提升能力。",
      "`进入模块` → `学习方案讲解理论` → `查看讲解话术模板` → `完成模拟讲解训练` → `通过能力考核` → `解锁下一模块`",
      "**模块目标**：帮助设计师掌握方案讲解的标准流程、话术技巧与价值传递方法，提升客户认可度与成交率。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解与价值传递模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0226",
    "title": "升单策略与配置推荐模块-PRD",
    "sourceFile": "07-升单策略与配置推荐模块-PRD.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/07-升单策略与配置推荐模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "设计方案讲解",
      "会审协同",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-15T09:35:58.230Z",
    "charCount": 2693,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人设计师能通过模拟场景练习升单能力。",
      "- 课程卡片：预算模糊客户先锚高价策略、生活习惯挖掘升单法、高端配置推荐技巧、价值传递升单法",
      "`进入模块` → `学习升单策略理论` → `查看升单话术模板` → `学习高端配置推荐方法` → `完成模拟升单训练` → `通过能力考核` → `解锁下一模块`"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：升单策略与配置推荐模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0227",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "08-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/08-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "设计方案讲解",
      "会审协同",
      "指标异常判断",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户方案会审",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:36:36.183Z",
    "charCount": 2719,
    "evidenceSnippets": [
      "- 关卡卡片：需求深化关、方案制作关、方案讲解关、升单推动关、异议处理关、协同配合关",
      "- 能力雷达图（需求挖掘能力、方案设计能力、方案讲解能力、升单推动能力、异议处理能力、协同配合能力）",
      "**模块目标**：通过场景化闯关任务与实战复盘，帮助设计师将理论知识转化为实战能力，形成完整的能力评估与成长档案。"
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
    "id": "lk-0228",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师销售配合与方案讲解经验/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "设计方案讲解",
      "需求挖掘",
      "转化复盘",
      "新人培养与考核"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-15T09:37:03.130Z",
    "charCount": 1297,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将线下设计师带教与训练流程转化为可线上化的培训模块。",
      "访谈主要聚焦**设计师与销售协同、方案讲解、升单推动**，对产品参数、设计规范、制度原文等信息覆盖有限，后续建议补充正式资料。",
      "3. **知识库大纲**：按照产品类、培训类、设计类、公司规范类整理知识项。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0229",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "客户接待闭环",
      "需求挖掘",
      "资源开拓",
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
    "sourceUpdatedAt": "2026-04-16T01:33:36.134Z",
    "charCount": 3030,
    "evidenceSnippets": [
      "当面对已交房小区的客户时,由于对小区现场情况、户型特点、交付状态等信息不熟悉,容易在与客户沟通中出现停顿,需要先研究小区情况再继续交流。",
      "虽然受访者对常规产品材质(如拉手的铝材、镀锌材质)有基本概念,也能判断大致价格区间,但对于特别昂贵的高端金属系统产品,仍存在价格认知盲区。",
      "**[产品知识范围]**: 受访者提到对\"高端金属系统产品\"价格不熟悉,建议明确该类产品是否为常规销售范围,以及是否需要专门培训。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0230",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "资源开拓",
      "转化复盘",
      "会审协同"
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
    "sourceUpdatedAt": "2026-04-16T01:34:15.858Z",
    "charCount": 2777,
    "evidenceSnippets": [
      "本大纲基于《新入职7天销售》访谈内容,将新人销售从设计师转型到销售岗位的成长路径与常见困惑,转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "- **线上化功能描述**: 系统提供报价准确度自查清单、方案预期沟通模板、销售-设计师交接标准、协同问题案例库,帮助新人理解\"前端把控的重要性\"。",
      "- **对应线下流程**: 通过真实接待、老销售旁听、问题复盘帮助新人积累经验;缺少系统化考核与针对性提升建议。"
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
    "id": "lk-0231",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "客户接待闭环",
      "量尺出图",
      "五金场景讲解"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:35:01.674Z",
    "charCount": 2890,
    "evidenceSnippets": [
      "- 关联案例: 新人知道产品大致价格区间,但对特别昂贵的产品存在认知盲区",
      "- 内容项: 先收钱再量尺流程、免费设计/免费出图/免费量尺政策、报价准确度要求",
      "- 关联案例: 新人在客户询问拉手材质时能够快速回答,但对高端金属系统产品价格区间不熟悉"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0232",
    "title": "新人职业认知与角色转换模块-PRD",
    "sourceFile": "04-新人职业认知与角色转换模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/04-新人职业认知与角色转换模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "社群SOP"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:35:46.866Z",
    "charCount": 2713,
    "evidenceSnippets": [
      "帮助新入职销售人员快速建立对销售岗位的正确认知,理解销售工作的特点、收入节奏、成长周期与常见挫败点;特别针对\"设计师转销售\"\"其他行业转销售\"等不同背景人群,提供差异化的角色转换指导,减少入职初期的迷茫与不适应。",
      "**成长路径不清**: 不知道从新人到成熟销售需要多长时间;",
      "**页面目标**: 引导新人完成职业认知测评,并展示模块学习路径。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人职业认知与角色转换模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0233",
    "title": "产品知识体系学习模块-PRD",
    "sourceFile": "05-产品知识体系学习模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/05-产品知识体系学习模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "小红书获客"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:36:20.089Z",
    "charCount": 2492,
    "evidenceSnippets": [
      "**价格区间模糊**: 对特别昂贵的产品(如高端金属系统)价格认知不清;",
      "帮助新入职销售人员系统化学习产品知识,从常规产品延伸至高端产品与别墅配套产品,建立完整的产品认知体系,解决\"高端产品认知盲区\"与\"价格区间不熟悉\"等实际痛点。",
      "**页面目标**: 展示产品知识学习路径,引导新人按阶段学习。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识体系学习模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0234",
    "title": "小区信息与现场知识库模块-PRD",
    "sourceFile": "06-小区信息与现场知识库模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/06-小区信息与现场知识库模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "资源开拓",
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘"
    ],
    "sceneTags": [
      "社群运营推进",
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:37:02.403Z",
    "charCount": 2967,
    "evidenceSnippets": [
      "帮助新入职销售人员快速掌握已交房小区的现场情况、户型特点、交付标准、常见改造方案等信息,解决\"接待已交房小区客户时因对现场不了解而卡壳\"的核心痛点,提升客户沟通的流畅性与专业度。",
      "**信息缺失**: 已交房小区的现场情况、户型特点等信息不熟悉;",
      "**页面目标**: 展示符合筛选条件的小区列表,帮助新人快速定位。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区信息与现场知识库模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0235",
    "title": "客户类型识别与应对策略模块-PRD",
    "sourceFile": "07-客户类型识别与应对策略模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/07-客户类型识别与应对策略模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:37:42.687Z",
    "charCount": 3111,
    "evidenceSnippets": [
      "帮助新入职销售人员掌握通过客户第一印象(穿着、展厅行为、沟通风格)快速判断客户类型的能力,并根据客户类型匹配相应的沟通策略,提升接待效率与成交概率。",
      "- 案例摘要: 通过客户穿着、展厅行为判断客户为别墅客户,调整接待策略。",
      "**页面目标**: 通过真实客户接待视频,训练新人的客户类型识别能力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户类型识别与应对策略模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0236",
    "title": "出单时机判断与逼单技巧模块-PRD",
    "sourceFile": "08-出单时机判断与逼单技巧模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/08-出单时机判断与逼单技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:38:36.864Z",
    "charCount": 3828,
    "evidenceSnippets": [
      "基于访谈内容,新人在出单时机判断与逼单方面面临以下痛点:",
      "**页面目标**: 展示核心内容入口,引导新人系统学习。",
      "**页面目标**: 帮助新人识别客户的购买信号,判断最佳逼单时机。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：出单时机判断与逼单技巧模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0237",
    "title": "价格异议与价值传递模块-PRD",
    "sourceFile": "09-价格异议与价值传递模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/09-价格异议与价值传递模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "指标异常判断",
      "板材产品解释",
      "五金场景讲解"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:39:28.731Z",
    "charCount": 3975,
    "evidenceSnippets": [
      "- \"这个价格里,板材占X%,五金占X%,安装占X%...\"",
      "帮助新入职销售人员系统掌握价格异议应对方法,学习品牌价值传递技巧、竞品对比话术与价格拆解策略,解决\"客户嫌贵时不知如何应对\"的核心痛点,提升成交转化率。",
      "**页面目标**: 帮助新人建立价格异议应对的思维框架。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：价格异议与价值传递模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0238",
    "title": "销售与设计师协同模块-PRD",
    "sourceFile": "10-销售与设计师协同模块-PRD.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/10-销售与设计师协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "报价推进",
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "岗位边界"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:40:27.734Z",
    "charCount": 4303,
    "evidenceSnippets": [
      "帮助新入职销售人员理解销售与设计师协同的重要性,掌握报价准确度把控、方案预期管理、协同交接标准等方法,解决\"前端报价不准导致后期设计师返工\"的核心痛点,提升协同效率与客户满意度。",
      "**页面目标**: 明确销售与设计师的分工边界与交接标准。",
      "**页面目标**: 帮助新人在报价前进行全面自查,提升报价准确度。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售与设计师协同模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
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
    "id": "lk-0240",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计师转销售新人痛点访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "资源开拓",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-16T01:41:43.593Z",
    "charCount": 2042,
    "evidenceSnippets": [
      "2. **功能模块大纲**: 将线下销售培训流程转化为可线上化的培训模块。",
      "1. **已交房小区的现场知识不足** - 缺少对小区现场情况、户型特点的系统化信息沉淀",
      "3. **小区信息与现场知识库模块** - 解决已交房小区接待卡壳问题"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0241",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "非标下单底线",
      "设计方案讲解",
      "量尺出图",
      "报价推进",
      "高客单成交"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "订单下单前",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:20:06.724Z",
    "charCount": 4944,
    "evidenceSnippets": [
      "- 先测量再沟通（标准流程）：拿到户型 → 工地测量 → 现场对接客户 → 回门店出图 → 邀约客户对方案 → 下单",
      "1. 接单 → 需求沟通 → 测量 → 出图 → 方案评审 → 对方案 → 下单 → 安装",
      "2. **报价差异：** 销售和设计师信息不对称、产品选择错误、尺寸不准"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0242",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "会审协同",
      "高客单成交"
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
    "sourceUpdatedAt": "2026-04-15T09:21:13.290Z",
    "charCount": 3157,
    "evidenceSnippets": [
      "3. **方案讲解能力不均：** 新人讲解逻辑混乱，成交率低",
      "*产品定位：** 通过AI赋能设计师销售协同场景，提升沟通效率、方案成交率和团队协作质量。",
      "1. **沟通记录耗时且易遗漏：** 人工记录需求耗时半小时，信息不同频导致成交失败"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：功能模块大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0243",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "报价推进",
      "需求挖掘",
      "设计方案讲解",
      "会审协同",
      "非标下单底线",
      "量尺出图"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T09:23:05.167Z",
    "charCount": 6990,
    "evidenceSnippets": [
      "- 工作流程培训（接单-需求-测量-出图-评审-讲解-下单-安装）",
      "- 内容项：不同户型预算范围、价格敏感度分级、常见套餐组合",
      "- 来源依据：\"报价差异原因：信息不对称、产品选择错误、尺寸不准\""
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0244",
    "title": "需求沟通与记录模块-PRD",
    "sourceFile": "04-需求沟通与记录模块-PRD.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/04-需求沟通与记录模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "设计方案讲解",
      "报价推进",
      "高客单成交",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户方案会审",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:24:36.302Z",
    "charCount": 4815,
    "evidenceSnippets": [
      "提升设计师与销售、客户的沟通效率，确保需求信息同步，减少信息遗漏和不同频问题，从而提高成交率。",
      "*I want** 客户的需求、变更、注意事项自动更新到用户画像看板",
      "*I want** 将客户家庭决策结构、预算敏感度等敏感信息隔离存储，不放在客户群"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：需求沟通与记录模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0245",
    "title": "案例库与素材管理模块-PRD",
    "sourceFile": "05-案例库与素材管理模块-PRD.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/05-案例库与素材管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "设计方案讲解",
      "资源开拓",
      "高客单成交",
      "报价推进"
    ],
    "sceneTags": [
      "客户方案会审",
      "社群运营推进",
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:26:29.199Z",
    "charCount": 6667,
    "evidenceSnippets": [
      "*目标：** 根据小区、户型、风格快速找到相似案例，提高客户兴趣",
      "*I want** 根据小区、户型、风格、价位等多维度搜索案例",
      "*So that** 我能快速找到匹配客户需求的案例,提高成交率"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：案例库与素材管理模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0246",
    "title": "方案协同与评审模块-PRD",
    "sourceFile": "06-方案协同与评审模块-PRD.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/06-方案协同与评审模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "会审协同",
      "报价推进",
      "指标异常判断",
      "设计方案讲解",
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
      "新人入门考核",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:28:18.053Z",
    "charCount": 7133,
    "evidenceSnippets": [
      "降低销售与设计师的协同成本，提升方案评审效率，减少方案分歧和报价差异，提高订单成交率。",
      "2. **销售**：参与评审、提供客户反馈、查看报价、提报预算",
      "*I want** 看到方案报价与客户预算的对比，超预算时自动预警"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：方案协同与评审模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0247",
    "title": "方案讲解赋能模块-PRD",
    "sourceFile": "07-方案讲解赋能模块-PRD.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/07-方案讲解赋能模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "高客单成交",
      "小红书获客"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T09:30:08.514Z",
    "charCount": 7388,
    "evidenceSnippets": [
      "提升设计师方案讲解能力，标准化讲解话术，提高客户认可度和成交率，同时通过PPT自动生成提升方案制作效率。",
      "*I want** 我的方案讲解录音能自动分析并给出评分和建议",
      "*I want** 根据需求大纲和效果图自动生成专业PPT"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解赋能模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0248",
    "title": "闯关考核与复盘模块-PRD",
    "sourceFile": "08-闯关考核与复盘模块-PRD.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/08-闯关考核与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "设计方案讲解",
      "高客单成交",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T09:32:02.537Z",
    "charCount": 7180,
    "evidenceSnippets": [
      "2. **设计总监**：设置考核题目、查看团队成绩、组织复盘、优化培训",
      "4. **培训师**：设计课程、分析考核数据、优化培训内容",
      "通过游戏化闯关机制评估设计师能力成长，提供持续的能力验证和复盘分析，优化培训效果，确保团队整体能力提升。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0249",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/设计总监团队管理与方案讲解/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "报价推进",
      "需求挖掘",
      "转化复盘",
      "会审协同"
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
    "sourceUpdatedAt": "2026-04-15T09:33:11.584Z",
    "charCount": 3801,
    "evidenceSnippets": [
      "本项目基于设计总监访谈内容，梳理设计师在销售设计协同场景的工作流程、痛点需求，输出AI培训销售智能体的设计师培训模块PRD文档。",
      "*访谈重点：** 设计师日常工作流程、销售设计协同、方案讲解能力、案例管理、能力培训",
      "*文件：** `08-闯关考核与复盘模块-PRD.md`"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0250",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "转化复盘",
      "小红书获客",
      "岗位边界",
      "需求挖掘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:34:09.893Z",
    "charCount": 4211,
    "evidenceSnippets": [
      "**数据指标**：链接率达到50%-60%时，说明客户活跃度高，可进行活动。",
      "*现状问题**：每日统计实际存在滞后性，因为客户添加微信后往往不会当天通过，需等第二天或第三天才会通过，因此部分数据改为延后统计。",
      "如果群人数100人，短期内链接了50人（50%），说明群活跃度较好；"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：清洗后的知识库文档",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
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
    "id": "lk-0252",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "转化复盘",
      "会审协同",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:35:37.344Z",
    "charCount": 3137,
    "evidenceSnippets": [
      "- 关联案例：每周更新各小区社群人数、签单数、QC数量、样板间数量",
      "- 内容项：运营专员与助理的职责分工、协同模式、一带一机制",
      "- 关联案例：群内公开矛盾时私聊客户+官方说明；数据异常时加大运营、增加福利、提供专属服务"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：知识库大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0253",
    "title": "社区运营认知与职责模块-PRD",
    "sourceFile": "04-社区运营认知与职责模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/04-社区运营认知与职责模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "岗位边界",
      "指标异常判断",
      "新人培养与考核",
      "客户接待闭环",
      "转化复盘",
      "会审协同"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "assessment",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:36:21.430Z",
    "charCount": 2444,
    "evidenceSnippets": [
      "**模块目标**：帮助新入职运营人员建立正确的岗位职责认知、理解运营专员与助理的分工、掌握核心指标体系，减少角色混淆与工作边界不清问题。",
      "测评信息：职责理解评分、指标理解评分、工作量预期、协同意愿",
      "作为一名新人运营，我希望快速了解我的职责边界和日常工作内容，避免入职后不知从何入手。"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：社区运营认知与职责模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0259",
    "title": "直播运营与素材管理模块-PRD",
    "sourceFile": "10-直播运营与素材管理模块-PRD.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/10-直播运营与素材管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "客户接待闭环",
      "小红书获客",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:40:27.464Z",
    "charCount": 3321,
    "evidenceSnippets": [
      "根据访谈，直播是社群运营的重要方式，但当前存在以下问题：",
      "| 小区勘探进度分享 | 激活户数多 | 建群初期、客户关注进度时 |",
      "| 直播前宣发 | 直播前3天 | 群内发布预告、收集问题 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：直播运营与素材管理模块-PRD",
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
    "id": "lk-0262",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/社区运营数据管理与团队协作流程/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "转化复盘",
      "新人培养与考核",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:42:25.184Z",
    "charCount": 1522,
    "evidenceSnippets": [
      "**核心职责**：小区社群运营、数据统计、KOC管理、销售协同、活动运营",
      "**每周统计**：更新小区管理表、社群人数、签单数、QC数量",
      "| 05 | 05-社群数据统计与看板模块-PRD.md | 模块PRD文档 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0263",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "需求挖掘",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:25:20.361Z",
    "charCount": 1358,
    "evidenceSnippets": [
      "派单沟通完全在线下进行(企业微信群聊),未在数字门店系统中记录,导致测量数、方案数等数据不准确。",
      "所有沟通在企业微信的【分时群】中进行,未在系统中操作记录。",
      "数字门店上的数据存在真实性问题。销售未派服务单时,相关数据无法呈现。目前派服务单的动作由人为把控,导致数据缺失。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：清洗后的知识库文档",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0264",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "非标下单底线",
      "量尺出图"
    ],
    "sceneTags": [
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:25:57.272Z",
    "charCount": 1997,
    "evidenceSnippets": [
      "每周统计各设计师的量尺数、接单数、改图数、画图数、下单数等指标",
      "| 设计师工作量统计 | 自动统计量尺、接单、改图、画图、下单等数据 | P0 |",
      "| 企业微信群聊监听 | 自动抓取派单沟通内容,无需人工记录 | P0 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：功能模块大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0265",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "量尺出图",
      "非标下单底线",
      "社群SOP",
      "资源开拓",
      "新人培养与考核"
    ],
    "sceneTags": [
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:26:23.202Z",
    "charCount": 1821,
    "evidenceSnippets": [
      "- 来源依据:访谈中提到设计师的工作内容(量尺、改图、画图、下单)",
      "- 案例描述:每周统计某设计师量尺5次、接单3个、改图2套、画图3套、下单2单",
      "5. **企业微信群聊规范**:分时群的使用规范和沟通话术"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：知识库大纲",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0266",
    "title": "智能派单管理模块-PRD",
    "sourceFile": "04-智能派单管理模块-PRD.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/04-智能派单管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "资源开拓",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:27:48.049Z",
    "charCount": 2797,
    "evidenceSnippets": [
      "实现派单流程线上化,通过AI自动采集企业微信群聊中的派单信息,并将数据自动录入数字门店系统,解决当前派单数据缺失、数据不真实的问题。",
      "销售获取客户需求→在企业微信群内询问店长分配哪位设计师→店长协调确认设计师→AI自动识别派单信息→系统自动记录派单数据→销售派服务单",
      "*I want** AI自动监听企业微信分时群的派单沟通"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：智能派单管理模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0267",
    "title": "设计师工作看板模块-PRD",
    "sourceFile": "05-设计师工作看板模块-PRD.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/05-设计师工作看板模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "非标下单底线",
      "量尺出图"
    ],
    "sceneTags": [
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:28:32.107Z",
    "charCount": 2947,
    "evidenceSnippets": [
      "自动统计设计师工作量指标(量尺、接单、改图、画图、下单等),替代人工填表统计,减少店长和销售的工作量,提供准确的设计师绩效数据。",
      "店长每周需要统计各设计师的量尺数、接单数、改图数、画图数、下单数,用于绩效考核",
      "处理:系统标记\"数据更新异常\",使用上次成功获取的数据,并发送告警给管理员"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：设计师工作看板模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0268",
    "title": "数据汇总报表模块-PRD",
    "sourceFile": "06-数据汇总报表模块-PRD.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/06-数据汇总报表模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "非标下单底线"
    ],
    "sceneTags": [
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:29:13.228Z",
    "charCount": 3102,
    "evidenceSnippets": [
      "处理:系统自动标注\"异常数据\",并提供详细数据对比,建议人工核实",
      "整合数字门店、风驰、稚优3.0等多个系统的数据,自动生成周报/月报等汇总报表,替代人工填表统计,减少店长的数据汇总工作量。",
      "每周一自动生成上周的门店运营周报,包含销售业绩、设计师工作量、派单效率等指标"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数据汇总报表模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0269",
    "title": "门店运营监控模块-PRD",
    "sourceFile": "07-门店运营监控模块-PRD.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/07-门店运营监控模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "非标下单底线",
      "量尺出图",
      "资源开拓"
    ],
    "sceneTags": [
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:29:59.012Z",
    "charCount": 3452,
    "evidenceSnippets": [
      "实时监控门店运营数据,提供关键指标看板和异常预警功能,帮助店长快速掌握门店运营状况,及时发现和解决问题。",
      "店长每天打开系统,查看关键指标看板,了解昨日和今日的派单数、下单数、设计师负载等核心数据",
      "**店长**:监控门店运营数据,接收异常预警,做出运营决策"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：门店运营监控模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0270",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/数字门店数据管理与派单流程痛点访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:30:31.404Z",
    "charCount": 1537,
    "evidenceSnippets": [
      "**派单流程确认**:是否完全线上化,还是保留企业微信群聊监听方式。",
      "**企业微信权限**:是否支持第三方应用监听群聊,权限申请流程如何。",
      "**稚优3.0系统**:原文提到的汇总表系统,需确认具体功能和数据结构。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0271",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "板材产品解释",
      "需求挖掘",
      "资源开拓",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:17:25.123Z",
    "charCount": 5134,
    "evidenceSnippets": [
      "**报价能力不足**:产品知识可以通过公司培训掌握,但报价技巧需要更多实战经验。",
      "**[博洛尼对比内容]**:关于板材(颗粒板 vs 奥松板)的对比是否准确,建议核实技术参数;",
      "**[报价检查功能需求]**:需求描述较概括,建议细化具体功能点;"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0272",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "资源开拓",
      "转化复盘",
      "需求挖掘",
      "高客单成交"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-16T01:18:14.577Z",
    "charCount": 3420,
    "evidenceSnippets": [
      "本大纲基于《李翠云销冠》访谈内容,将线下门店中由销冠、店长、设计师协同完成的销售培训与带教过程,转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下:",
      "- **对应线下流程**:通过真实带教、情景提问、门店演练和复盘让新人逐步形成经验,销冠强调\"学习能力最重要\"。",
      "**核心流程**:建议首批上线,直接影响新人上手与成交能力。"
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
    "id": "lk-0273",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "客诉处理",
      "转化复盘",
      "板材产品解释"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-16T01:19:10.019Z",
    "charCount": 3547,
    "evidenceSnippets": [
      "- 价格异议:询问需求→强调材质品质→指出独特优势→提供预算控制方案",
      "- 内容项:金属圆弧、金属套盒等特殊工艺介绍、只有纳米有的特色产品、板材分类(颗粒板vs奥松板)",
      "- 内容项:新人学习顺序(先学特有产品→再学常卖板材→深化其他)、定制产品分类明细、产品知识盲点应对方法"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0274",
    "title": "新人成长路径与职业认知模块-PRD",
    "sourceFile": "04-新人成长路径与职业认知模块-PRD.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/04-新人成长路径与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "会审协同",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:20:00.550Z",
    "charCount": 3110,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人先完成认知校准,再进入技能训练,减少重复解释成本。",
      "作为一名销冠,我希望系统提前告诉新人什么是正确心态、什么是错误心态,降低带教压力。",
      "**页面目标**:采集新人基础信息、初始能力画像、成长预期。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人成长路径与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0275",
    "title": "客户类型识别与需求诊断模块-PRD",
    "sourceFile": "05-客户类型识别与需求诊断模块-PRD.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/05-客户类型识别与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-16T01:20:41.381Z",
    "charCount": 3043,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售学会识别7种客户类型(刚需/改善/高端/理智/感性/犹豫/强势),掌握不同类型的沟通策略和推荐重点,提升客户接待和需求挖掘效率。",
      "店长/培训师:查看本门店学员的训练数据、考核成绩、薄弱项分布",
      "判断客户类型的关键信息:装修进度、家庭结构、职业特征、预算防线、需求痛点;"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户类型识别与需求诊断模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0276",
    "title": "促单话术与成交技巧模块-PRD",
    "sourceFile": "06-促单话术与成交技巧模块-PRD.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/06-促单话术与成交技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "新人培养与考核",
      "报价推进",
      "转化复盘",
      "指标异常判断",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-16T01:21:30.766Z",
    "charCount": 3231,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售掌握促单技巧和成交话术,学会活动逼单、进度逼单、价格拆解、替代方案设计等方法,提升成交转化率。",
      "作为一名培训负责人,我希望新人能通过模拟训练掌握活动逼单、进度逼单等方法。",
      "- 促单技巧卡片(活动逼单、进度逼单、价格拆解、替代方案、定金锁定、口碑展示)"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：促单话术与成交技巧模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0277",
    "title": "异议处理与竞品应对模块-PRD",
    "sourceFile": "07-异议处理与竞品应对模块-PRD.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/07-异议处理与竞品应对模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "指标异常判断",
      "板材产品解释",
      "客诉处理"
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
    "sourceUpdatedAt": "2026-04-16T01:22:20.055Z",
    "charCount": 3827,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望新人能通过模拟训练掌握价格异议、品牌异议、竞品对比的应对方法。",
      "- 异议类型卡片(价格异议、品牌异议、竞品对比、展厅细节、交付周期、售后质保)",
      "店长/培训师:查看本门店学员的练习数据、考核成绩、薄弱项分布"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：异议处理与竞品应对模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0278",
    "title": "闯关考核与能力认证模块-PRD",
    "sourceFile": "08-闯关考核与能力认证模块-PRD.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/08-闯关考核与能力认证模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:23:10.011Z",
    "charCount": 3853,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望系统自动评估新人能力,生成能力认证报告,降低人工考核成本。",
      "**模块目标**:通过闯关式考核确认新人是否掌握前序模块的核心能力,生成能力认证报告,决定是否解锁后续模块或进入实战阶段。",
      "销售能力很难标准化评级,建议以**业绩**(订单+收款)为主要考核指标;"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与能力认证模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0279",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销冠销售技巧与客户应对策略访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "资源开拓",
      "转化复盘",
      "高客单成交"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:23:49.820Z",
    "charCount": 2771,
    "evidenceSnippets": [
      "2. **功能模块大纲**:将线下销冠带教与培训流程转化为可线上化的培训模块。",
      "**价格异议**:询问需求→强调材质品质→指出独特优势→提供预算控制方案",
      "6. **犹豫型**:决策慢,需话术逼单、活动促销、先付定金"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0280",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销售访谈报价成交培训/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "高客单成交",
      "转化复盘",
      "非标下单底线",
      "岗位边界"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:23:12.415Z",
    "charCount": 3886,
    "evidenceSnippets": [
      "*发言人3**：门店销售人员/店长，负责新人带教工作，对销售培训流程有深入理解。",
      "**早期市场**：只要把产品折扣优惠讲清楚，客户就容易签单，甚至出现排队签单的情况",
      "*背景**：新人接待一对年轻夫妻，小区品质不高，预算10万出头"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0281",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销售访谈报价成交培训/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "高客单成交",
      "转化复盘",
      "审单防错",
      "需求挖掘"
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
    "sourceUpdatedAt": "2026-04-15T08:24:03.533Z",
    "charCount": 3311,
    "evidenceSnippets": [
      "本大纲基于《4.9店长后面的销售》访谈内容，将门店销售带教、报价培训、客户接待、协同推进等线下经验传授过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：店长通过口述、案例分享、带教演练向新人传递报价经验、成交技巧，但资料分散、依赖个人表达。",
      "原因：这 6 个模块直接覆盖新人从\"产品学习 → 报价训练 → 客户接待 → 成交推进 → 执行落地 → 实时支持\"的完整最小闭环，特别是针对访谈中反复强调的\"报价错误\"\"产品规格不熟\"等痛点。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：功能模块大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0282",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销售访谈报价成交培训/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "高客单成交",
      "岗位边界",
      "非标下单底线",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T08:24:56.684Z",
    "charCount": 3232,
    "evidenceSnippets": [
      "- 关联案例：方案中有颜色跳色，新人用便宜材质报价但方案是贵材质，导致价格差距",
      "- 关联案例：新人因不了解板材尺寸限制，报价时选错规格导致需要换材质，差点丢单",
      "- 关联案例：新人报价13万超预算2-3万，材质选错差点丢单"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0283",
    "title": "产品知识快速掌握模块-PRD",
    "sourceFile": "04-产品知识快速掌握模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/04-产品知识快速掌握模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "高客单成交",
      "客户接待闭环",
      "非标下单底线",
      "量尺出图"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T08:26:02.983Z",
    "charCount": 2456,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售快速掌握产品规格、材质差异、尺寸限制等核心知识，减少因产品不熟导致的报价错误和客户信任度下降。",
      "产品信息：产品ID、产品名称、分类、规格参数、尺寸限制、材质、价格区间",
      "不了解板材尺寸限制（如1.2m×2.75m），导致方案无法落地"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识快速掌握模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0284",
    "title": "报价流程与风险规避模块-PRD",
    "sourceFile": "05-报价流程与风险规避模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/05-报价流程与风险规避模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "高客单成交",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:26:39.595Z",
    "charCount": 2534,
    "evidenceSnippets": [
      "作为培训负责人，我希望提供模拟报价场景，让新人在真实报价前有练习机会。",
      "- 场景卡片：简单户型/复杂户型、低预算/高预算、标准方案/特殊需求",
      "场景信息：场景ID、户型类型、预算区间、产品清单、标准报价"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：报价流程与风险规避模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0285",
    "title": "客户接待与需求诊断模块-PRD",
    "sourceFile": "06-客户接待与需求诊断模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/06-客户接待与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "客户接待闭环",
      "新人培养与考核",
      "报价推进",
      "高客单成交"
    ],
    "sceneTags": [
      "客户首次进店",
      "客户追问价格",
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:27:18.266Z",
    "charCount": 2320,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握客户接待技巧和需求诊断方法，能够快速判断客户类型、预算心理和核心需求。",
      "作为店长，我希望新人在第一次接待时就能完成基本画像采集。",
      "店长强调：\"要让他自己先去对接客户，客户不知道你是新人\"。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户接待与需求诊断模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0286",
    "title": "异议处理与报价成交模块-PRD",
    "sourceFile": "07-异议处理与报价成交模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/07-异议处理与报价成交模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "高客单成交",
      "新人培养与考核",
      "客诉处理",
      "客户接待闭环",
      "审单防错"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:27:47.616Z",
    "charCount": 2150,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握异议处理技巧，学会在价格异议、材质错误、信任危机等场景中挽回客户并达成成交。",
      "作为新人销售，我希望系统教我如何处理报价错误、价格异议。",
      "店长强调：\"首先肯定要认识自己的错误，不可能把责任怪到客户身上\"。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：异议处理与报价成交模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0287",
    "title": "订单协同与跟单风控模块-PRD",
    "sourceFile": "08-订单协同与跟单风控模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/08-订单协同与跟单风控模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "高客单成交",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-15T08:28:28.538Z",
    "charCount": 2294,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握订单协同流程，学会与设计师配合推进方案、报价、下单，并建立跟单风控意识。",
      "作为新人销售，我希望知道每个订单节点该做什么、何时完成。",
      "`选择订单场景` → `查看订单信息` → `执行协同任务` → `完成节点确认` → `风险预警检测` → `生成跟单报告`"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：订单协同与跟单风控模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0288",
    "title": "实时辅助问答模块-PRD",
    "sourceFile": "09-实时辅助问答模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/09-实时辅助问答模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "高客单成交",
      "客户接待闭环",
      "非标下单底线",
      "量尺出图"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T08:28:58.444Z",
    "charCount": 2192,
    "evidenceSnippets": [
      "作为培训负责人，我希望系统能提供实时话术建议，减少新人恐慌。",
      "**模块目标**：为销售提供实时的产品查询、规格速查、报价建议、话术推荐，支持在对话过程中快速获取支持。",
      "店长表示：\"如果能有个工具帮忙审核报价，或者提前预警哪里不够细致，第二次报价成功率就高一些\"。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：实时辅助问答模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0289",
    "title": "闯关考核与复盘模块-PRD",
    "sourceFile": "10-闯关考核与复盘模块-PRD.md",
    "relativePath": "流程清单/销售访谈报价成交培训/10-闯关考核与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "报价推进",
      "高客单成交",
      "指标异常判断",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T08:29:29.083Z",
    "charCount": 2230,
    "evidenceSnippets": [
      "`选择闯关任务` → `完成综合场景` → `获取评分报告` → `填写复盘记录` → `查看改进建议` → `解锁下一关卡`",
      "- 关卡地图（客户接待→需求诊断→报价→异议处理→跟单）",
      "- 各维度得分雷达图（接待、诊断、报价、异议处理、协作）"
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
    "id": "lk-0290",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销售访谈报价成交培训/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "高客单成交",
      "需求挖掘",
      "客户接待闭环",
      "会审协同"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T08:29:52.337Z",
    "charCount": 1305,
    "evidenceSnippets": [
      "| 06 | 06-客户接待与需求诊断模块-PRD.md | 客户接待训练的功能设计文档 |",
      "| 07 | 07-异议处理与报价成交模块-PRD.md | 异议处理训练的功能设计文档 |",
      "**报价错误**是新人丢单的主要原因（材质选错、尺寸错误、漏项少收钱）"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0291",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环",
      "报价推进",
      "小红书获客"
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
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:17:26.084Z",
    "charCount": 4461,
    "evidenceSnippets": [
      "**接待流程**：前期以接待看展厅为主，沟通客户对房屋的使用情况、生活需求、装修占比；",
      "**转化数据**：客户来源标注（微信群添加）、来门店是否签订、最终成交情况。",
      "**客户筛选**：如果小区群人数多，筛选主力户型和大户型；"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：清洗后的知识库文档",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
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
    "id": "lk-0293",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "小红书获客",
      "报价推进",
      "需求挖掘",
      "转化复盘"
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
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:19:00.952Z",
    "charCount": 3571,
    "evidenceSnippets": [
      "- 关联案例：小红书客户在微信上先铺垫，自然进店客户先看展厅再沟通需求",
      "- 内容项：小红书账号运营方法、小区群建群策略、自然进店客户接待技巧",
      "- 关联案例：销售通过小红书吸引客户，前期在微信铺垫优势和方案，筛选后再邀约到店"
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
    "id": "lk-0294",
    "title": "客户渠道管理模块-PRD",
    "sourceFile": "04-客户渠道管理模块-PRD.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/04-客户渠道管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "资源开拓",
      "社群SOP",
      "指标异常判断",
      "转化复盘",
      "小红书获客",
      "需求挖掘"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:19:47.261Z",
    "charCount": 2573,
    "evidenceSnippets": [
      "**模块目标**：帮助销售统一管理小红书、小区群、自然进店等多渠道客户信息,实现客户来源可追溯、跟进记录可查询、转化过程可分析。",
      "`进入客户管理` → `选择渠道类型` → `录入客户信息` → `制定跟进计划` → `记录跟进内容` → `更新客户状态` → `查看转化漏斗`",
      "作为一名店长,我希望查看各渠道客户数量和转化率,评估获客效果。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：客户渠道管理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0295",
    "title": "小区群运营模块-PRD",
    "sourceFile": "05-小区群运营模块-PRD.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/05-小区群运营模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "客户接待闭环"
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
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:20:22.002Z",
    "charCount": 2708,
    "evidenceSnippets": [
      "**模块目标**:帮助销售系统化管理小区群运营内容、发布计划和责任分配,提升群运营效率和效果。",
      "`进入群运营` → `选择小区群` → `查看运营计划` → `选择运营内容` → `发布到群` → `记录运营效果` → `生成运营报告`",
      "因此,系统需要提供群运营内容管理、计划管理和效果统计功能,提升运营效率。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：小区群运营模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0296",
    "title": "群内客户挖掘模块-PRD",
    "sourceFile": "06-群内客户挖掘模块-PRD.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/06-群内客户挖掘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "转化复盘",
      "客户接待闭环",
      "高客单成交"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:21:03.666Z",
    "charCount": 2759,
    "evidenceSnippets": [
      "`进入客户挖掘` → `选择小区群` → `导出成员名单` → `分配添加任务` → `记录添加结果` → `跟进未通过客户` → `统计转化数据`",
      "**模块目标**:帮助销售系统化管理群内客户添加任务,提升添加成功率和转化效率。",
      "根据访谈,销售在直播或运营后需要添加群内客户微信,但存在以下问题:"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：群内客户挖掘模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
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
    "id": "lk-0298",
    "title": "数据看板模块-PRD",
    "sourceFile": "08-数据看板模块-PRD.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/08-数据看板模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "需求挖掘",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:22:21.157Z",
    "charCount": 3111,
    "evidenceSnippets": [
      "作为一名管理层,我希望查看各门店、各渠道的数据对比,优化资源配置。",
      "因此,系统需要提供统一的数据看板,整合多维度数据并提供可视化展示。",
      "`进入数据看板` → `选择数据维度` → `查看数据图表` → `筛选分析` → `下钻详情` → `导出报表`"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数据看板模块-PRD",
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
    "id": "lk-0299",
    "title": "移动端工具模块-PRD",
    "sourceFile": "09-移动端工具模块-PRD.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/09-移动端工具模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "报价推进",
      "资源开拓"
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
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:23:02.461Z",
    "charCount": 3191,
    "evidenceSnippets": [
      "**模块目标**:将云屏核心功能接入企业微信移动端,提升销售现场接待效率和客户体验。",
      "根据访谈,销售在展厅、样板间、预看房现场需要快速查找小区信息、户型方案和品牌介绍,但存在以下问题:",
      "因此,系统需要将云屏核心功能接入企业微信,实现移动端快速查找和展示。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：移动端工具模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0300",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销售客户跟进与社群运营实践访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "资源开拓",
      "客户接待闭环",
      "小红书获客"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:23:44.451Z",
    "charCount": 2937,
    "evidenceSnippets": [
      "本次访谈主要围绕**销售线上获客与客户转化**展开,涵盖客户获取渠道、小区群运营、客户挖掘方法、跟进转化策略、数据需求和移动端工具需求等主题。",
      "**客户来源**:李一强侧重线上渠道(小红书、小区群),店长侧重线下接待",
      "2. **补充缺失资料**:收集小红书运营规范、小区群SOP、竞品资料等文档。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：README",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0301",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销售培训体系与新人培养/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "资源开拓",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T08:50:01.390Z",
    "charCount": 3305,
    "evidenceSnippets": [
      "1. **新人留存率数据**：原文提到\"60%多\"的通过率，但未明确是培训期间通过率还是三个月试用期留存率，建议核实具体数据来源与统计口径。",
      "建立**新秀成长帮扶群**，群内包含：店长、培训讲师、带教师傅、培训班主任、运营专员",
      "2. **门店熟悉**：展厅动线、产品颜色与布局、价格体系"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0302",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销售培训体系与新人培养/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "客户接待闭环",
      "转化复盘",
      "社群SOP"
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
    "sourceUpdatedAt": "2026-04-15T08:51:14.971Z",
    "charCount": 4404,
    "evidenceSnippets": [
      "**对应线下流程**：第七天模拟接待考核、三维家导报价一对一检查、每日考试",
      "**对应线下流程**：运营专员每周二人工拉取数据，整理新人签单/回款/意向客户等数据",
      "**对应线下流程**：新人签单后，培训老师/店长人工关注订单进展，发现问题再介入"
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
    "id": "lk-0303",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销售培训体系与新人培养/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "非标下单底线",
      "小红书获客"
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
    "sourceUpdatedAt": "2026-04-15T08:52:45.720Z",
    "charCount": 5405,
    "evidenceSnippets": [
      "| 数据与报表类 | 新人数据指标 | 1 | P0 |",
      "- 内容项：报价计算规则、套餐组合定价、个性化需求加价规则",
      "- 来源依据：访谈中提到\"报价逻辑，我们的价格他都能够这个思路是清楚的\""
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0304",
    "title": "新人管理看板模块-PRD",
    "sourceFile": "04-新人管理看板模块-PRD.md",
    "relativePath": "流程清单/销售培训体系与新人培养/04-新人管理看板模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "转化复盘"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:54:05.611Z",
    "charCount": 5074,
    "evidenceSnippets": [
      "解决培训运营人员每周人工拉取、整理新人数据的低效问题，实现新人业绩数据的自动抓取、整理与可视化展示，帮助培训讲师、店长、运营专员实时掌握新人成长状态。",
      "用户登录 → 进入新人管理看板 → 选择分类标签 → 查看新人列表 → 点击查看详情 → 查看个人数据卡片",
      "按新人入职时间分类展示，便于培训讲师快速定位不同阶段的新人状态。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人管理看板模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0305",
    "title": "AI模拟演练模块-PRD",
    "sourceFile": "05-AI模拟演练模块-PRD.md",
    "relativePath": "流程清单/销售培训体系与新人培养/05-AI模拟演练模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "转化复盘",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T08:55:27.924Z",
    "charCount": 6980,
    "evidenceSnippets": [
      "解决人工模拟演练效率低、标准不统一的问题，通过AI机器人扮演客户角色，让新人进行沉浸式接待演练，系统自动评分并提供改进建议，加速新人成长。",
      "| S002 | 需求诊断 | 了解客户装修风格、预算、户型等信息 | ★★☆☆☆ |",
      "| S005 | 报价讲解 | 向客户讲解报价单，处理价格谈判 | ★★★★☆ |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：AI模拟演练模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0306",
    "title": "签单预警与跟进模块-PRD",
    "sourceFile": "06-签单预警与跟进模块-PRD.md",
    "relativePath": "流程清单/销售培训体系与新人培养/06-签单预警与跟进模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "资源开拓",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:56:37.035Z",
    "charCount": 5380,
    "evidenceSnippets": [
      "| 培训讲师 | 新人签单提醒 | 飞书/企业微信/APP推送 |",
      "| 带教师傅 | 新人签单提醒 | 飞书/企业微信/APP推送 |",
      "解决新人签单后缺乏关注、订单异常无法及时发现的问题，实现新人签单实时推送、订单进度自动跟踪、异常卡点自动预警，确保新人签单顺利推进直至回款。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：签单预警与跟进模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0307",
    "title": "课程内容管理模块-PRD",
    "sourceFile": "07-课程内容管理模块-PRD.md",
    "relativePath": "流程清单/销售培训体系与新人培养/07-课程内容管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "板材产品解释",
      "报价推进",
      "五金场景讲解"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T08:57:43.824Z",
    "charCount": 6337,
    "evidenceSnippets": [
      "│ │ 产品知识培训-板材篇 │ 🔴 高 │ 型号需更新 │ │",
      "│ │ 新人培训-产品基础 │ 🟡 中 │ 可选更新 │ │",
      "解决课件更新频繁、版本管理混乱、培训资料与产品库不同步的问题，实现课件版本管理、产品信息变更自动检测、一键更新替换，确保培训内容始终与最新产品信息保持一致。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：课程内容管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0308",
    "title": "作业管理模块-PRD",
    "sourceFile": "08-作业管理模块-PRD.md",
    "relativePath": "流程清单/销售培训体系与新人培养/08-作业管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "小红书获客",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T08:59:14.191Z",
    "charCount": 8494,
    "evidenceSnippets": [
      "| T003 | 接待演练视频 | 视频（MP4）| 接待流程演练考核 |",
      "| T005 | 报价单提交 | 文件（Excel/PDF）| 报价逻辑考核 |",
      "解决作业发布靠群消息、提交统计靠人工、完成情况不透明的问题，实现作业模板化管理、在线提交、自动统计、超期提醒，提升培训运营效率。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：作业管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0309",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销售培训体系与新人培养/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "转化复盘",
      "非标下单底线"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T09:00:04.332Z",
    "charCount": 2505,
    "evidenceSnippets": [
      "本访谈旨在了解销售培训讲师的工作内容、新人培训流程、培训痛点及AI赋能需求，为后续开发\"AI培训销售智能体\"系统提供需求依据。",
      "| 04 | [新人管理看板模块-PRD.md](./04-新人管理看板模块-PRD.md) | 新人数据管理与可视化模块PRD |",
      "| 新人管理看板 | 人工拉取数据效率低 | 数据自动抓取、可视化展示 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0310",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "报价推进",
      "高客单成交"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T09:59:38.907Z",
    "charCount": 4697,
    "evidenceSnippets": [
      "**社群打卡机制**：经销商体系建立微信群，学员在群内提交作业；直营体系使用较少",
      "将销售培训周期从三个月压缩至一个月内，使新人快速具备成交能力。",
      "**[新人三次试水]**：原文提到新人需经历\"三次试水\"，但具体定义、考核标准、失败处理方式未明确，建议与培训部门确认。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0311",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "转化复盘",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T10:00:47.267Z",
    "charCount": 4716,
    "evidenceSnippets": [
      "本大纲基于《20260410_164717_原文》会议访谈内容，将销售培训、设计师能力提升、知识问答、社群运营等线下流程转化为可线上化、可系统化的功能模块。标注说明如下：",
      "- **线上化功能描述**：对接企业微信API，自动采集群成员变化、消息活跃度、客服响应等数据。",
      "| 社群数据看板 | P1 | 提升运营效率 | 第90天 |"
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
    "id": "lk-0312",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "高客单成交",
      "会审协同",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-15T10:01:47.015Z",
    "charCount": 3737,
    "evidenceSnippets": [
      "- 内容项：价格异议、品牌异议、竞品对比异议、预算不足异议的标准话术",
      "- 来源依据：访谈中关于\"怎么去用三维家，怎么去报价，怎么去跟设计师一起培训\"的描述",
      "- 来源依据：访谈中关于\"销售能力画像\"\"能力评分标准\"的描述"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0313",
    "title": "销售代练系统-PRD",
    "sourceFile": "04-销售代练系统-PRD.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/04-销售代练系统-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
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
    "sourceUpdatedAt": "2026-04-15T10:03:20.077Z",
    "charCount": 4483,
    "evidenceSnippets": [
      "模拟真实客户接待场景，让新人在虚拟环境中完成从需求挖掘到报价成交的完整流程训练。",
      "解决销售培训周期过长（三个月）的核心痛点，通过场景化闯关训练，将新人培养周期压缩至一个月内，使新人快速具备独立成交能力。",
      "| 培训负责人 | 标准化培训流程、量化培训效果 | 内容管理、数据分析 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售代练系统-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0314",
    "title": "设计师方案评分系统-PRD",
    "sourceFile": "05-设计师方案评分系统-PRD.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/05-设计师方案评分系统-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "报价推进",
      "高客单成交",
      "会审协同"
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
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T10:04:28.870Z",
    "charCount": 4918,
    "evidenceSnippets": [
      "提升设计师方案讲解能力，通过标准化评分与智能讲稿生成，提高客单价与成交率，减少效果图修改次数。",
      "| 销售 | 同步设计方案、协同成交 | 查看讲解要点、协调报价 |",
      "| 讲解能力 | 优秀设计师能力发挥不稳定 | 标准化评分，稳定输出高水平讲解 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师方案评分系统-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0315",
    "title": "AI问答助手-PRD",
    "sourceFile": "06-AI问答助手-PRD.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/06-AI问答助手-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "板材产品解释",
      "报价推进",
      "需求挖掘",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户追问价格",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T10:05:39.275Z",
    "charCount": 5220,
    "evidenceSnippets": [
      "上传报价单，AI根据原始用户需求与设计方案自动核对合理性，标注风险点与建议调整项。",
      "提升销售现场查询效率，解决新人专业知识不足问题，加快报价环节事务性工作，减少销售三分之二的非成交时间占用。",
      "| 店长 | 辅助新人、知识管理 | 培训新人、更新知识 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：AI问答助手-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0316",
    "title": "社群数据看板-PRD",
    "sourceFile": "07-社群数据看板-PRD.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/07-社群数据看板-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "转化复盘",
      "新人培养与考核",
      "资源开拓",
      "需求挖掘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T10:06:51.271Z",
    "charCount": 5328,
    "evidenceSnippets": [
      "实时监控各小区群的活跃度、用户增长、客服响应等核心指标，异常情况自动预警。",
      "可视化展示小区团购运营数据，提升社群运营效率，帮助运营人员和店长及时跟进客户，激活长周期客户。",
      "| 数据可见性 | 社群数据分散，难以统计 | 一看板掌握全局 |"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：社群数据看板-PRD",
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
    "id": "lk-0317",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销售培训系统项目推进会议/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "社群SOP",
      "指标异常判断",
      "高客单成交",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T10:02:16.640Z",
    "charCount": 1771,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将销售培训、设计师评分、问答助手、社群运营等流程转化为线上化功能模块。",
      "| 社群数据看板 | 提升运营效率 | 运营人员、店长 | P1 |",
      "4. **提升效率**：通过AI问答和社群看板减少事务性工作时间"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0318",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "报价推进",
      "社群SOP",
      "指标异常判断",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "运营复盘看板",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:27:38.866Z",
    "charCount": 3191,
    "evidenceSnippets": [
      "**[户型数据]**：受访者提到的\"155户型\"等具体户型编号，需确认命名规范。",
      "**[KOC转化数据]**：受访者提到的KOC转化案例，建议补充更多细节和时间节点。",
      "**入职时间**：2025年10月13号入职培训，10月31号下店"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0319",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "小红书获客",
      "社群SOP",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-16T01:28:09.155Z",
    "charCount": 2377,
    "evidenceSnippets": [
      "- **线上化功能描述**：系统提供群活跃度分析、客户互动记录、意向客户自动标记、私信跟进提醒、运营效果数据看板，帮助销售精准识别并跟进高意向客户。",
      "- **探讨点**：是否需要与企业微信打通，自动同步群聊数据与客户互动记录？",
      "- **对应线下流程**：销售需要快速查询报价、户型图、软装价格等信息，但现有资料分散在云微盘、小程序等多个平台，查找困难。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0320",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "报价推进",
      "小红书获客",
      "社群SOP",
      "指标异常判断",
      "资源开拓"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:28:40.958Z",
    "charCount": 2405,
    "evidenceSnippets": [
      "- 关联案例：销售希望快速查询\"某小区某户型样板间做了多少钱\"",
      "- 来源依据：访谈中关于\"我想要某某某小区的户型图\"的需求描述",
      "- 来源依据：访谈中关于\"我想去找这个样板间的报价，我要找很久\"的描述"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0321",
    "title": "小区群运营与客户挖掘模块-PRD",
    "sourceFile": "04-小区群运营与客户挖掘模块-PRD.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/04-小区群运营与客户挖掘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "需求挖掘",
      "转化复盘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:29:24.103Z",
    "charCount": 2233,
    "evidenceSnippets": [
      "**模块目标**：帮助销售系统化管理小区业主群，通过数据化手段识别活跃客户与意向客户，提高客户挖掘效率与转化率。",
      "作为一名店长，我希望看到各小区群的运营效果数据，了解团队运营质量。",
      "`进入模块` → `选择小区群` → `查看群数据概览` → `查看客户互动记录` → `标记意向客户` → `添加跟进计划` → `执行跟进动作`"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：小区群运营与客户挖掘模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0322",
    "title": "客户跟进与转化模块-PRD",
    "sourceFile": "05-客户跟进与转化模块-PRD.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/05-客户跟进与转化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "转化复盘",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:29:52.948Z",
    "charCount": 2138,
    "evidenceSnippets": [
      "**模块目标**：帮助销售规范客户跟进流程，通过智能提醒与案例推荐提高跟进效率与客户转化率，避免因跟进不足导致客户流失。",
      "作为一名销售，我希望系统能根据客户户型和风格偏好，自动推荐相关案例。",
      "作为一名店长，我希望看到团队客户的跟进覆盖率与转化效果。"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：客户跟进与转化模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0323",
    "title": "下单流程优化模块-PRD",
    "sourceFile": "06-下单流程优化模块-PRD.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/06-下单流程优化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "非标下单底线",
      "需求挖掘",
      "指标异常判断",
      "报价推进",
      "客户接待闭环",
      "量尺出图"
    ],
    "sceneTags": [
      "订单下单前",
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
    "sourceUpdatedAt": "2026-04-16T01:30:21.095Z",
    "charCount": 2115,
    "evidenceSnippets": [
      "下单数据：下单时间、操作人、图纸文件、报价文件、下单清单文件",
      "`进入模块` → `选择订单` → `导入图纸与报价` → `系统自动解析` → `核对标准件信息` → `填写特殊件` → `生成下单清单` → `导出/提交`",
      "作为一名销售，我希望图纸上的信息能自动关联报价单，减少核对工作量。"
    ],
    "generatedTask": {
      "courseTitle": "非标下单底线：下单流程优化模块-PRD",
      "practicePrompt": "围绕“订单下单前”，让学员用自己的话完成一次非标下单底线表达。",
      "assessmentFocus": "检查学员是否能说清非标下单底线的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0324",
    "title": "日常工作协同模块-PRD",
    "sourceFile": "07-日常工作协同模块-PRD.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/07-日常工作协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "需求挖掘",
      "指标异常判断",
      "客户接待闭环",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:30:50.077Z",
    "charCount": 2146,
    "evidenceSnippets": [
      "`进入模块` → `今日任务看板` → `逐项完成任务` → `自动生成日报` → `提交确认` → `查看历史记录`",
      "任务数据：任务ID、任务名称、任务类型、截止时间、状态、完成时间",
      "跟进数据：客户ID、跟进时间、跟进方式、跟进内容、客户反馈"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：日常工作协同模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0325",
    "title": "AI知识库助手模块-PRD",
    "sourceFile": "08-AI知识库助手模块-PRD.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/08-AI知识库助手模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "报价推进",
      "客户接待闭环",
      "资源开拓",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:31:21.766Z",
    "charCount": 2433,
    "evidenceSnippets": [
      "作为一名销售，我希望直接问AI\"绿城留香园155户型的样板间报价\"，快速获取答案。",
      "**模块目标**：帮助销售在客户沟通中快速查询报价、户型、产品信息，提升服务效率与专业度，缩短客户等待时间。",
      "作为一名销售，我希望拍照识别产品后，AI告诉我价格和尺寸。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：AI知识库助手模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0326",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/销售人员工作流程与工具需求访谈/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘"
    ],
    "sceneTags": [],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:26:53.846Z",
    "charCount": 815,
    "evidenceSnippets": [
      "原文中的部分**户型名称**和**小区名称**需核实准确性。",
      "访谈主要聚焦**销售日常工作痛点与AI助手需求**，对产品参数、设计规范等信息覆盖有限，后续建议补充正式资料。"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：README",
      "practicePrompt": "围绕“真实业务场景”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0327",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "小红书获客",
      "转化复盘",
      "需求挖掘",
      "指标异常判断",
      "高客单成交"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户追问价格",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:24:29.348Z",
    "charCount": 4629,
    "evidenceSnippets": [
      "目前群内推广内容以**活动推广为主**。受访者认为这一方式需要调整,不能仅依赖活动。",
      "**交房时间节点**:越接近交房时间,群运营力度越大,此前沉默的客户也会逐渐活跃。",
      "这类客户到店后的成交率明显高于自然进店但未做准备的客户。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：清洗后的知识库文档",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
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
    "id": "lk-0330",
    "title": "客户挖掘与精准添加模块-PRD",
    "sourceFile": "04-客户挖掘与精准添加模块-PRD.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/04-客户挖掘与精准添加模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "新人培养与考核",
      "需求挖掘",
      "转化复盘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-16T01:27:25.436Z",
    "charCount": 4228,
    "evidenceSnippets": [
      "解决新销售在小区群运营中\"不知道如何挖掘客户、添加通过率低、添加策略单一\"的问题,帮助销售掌握科学的客户挖掘方法与添加策略,提升客户添加通过率与初期转化效率。",
      "2. 销售了解小区资料(楼盘信息、户型特点、客户关注点)",
      "1. 销售输入小区名称,系统自动推送小区资料(楼盘信息、户型特点、常见客户关注点)"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：客户挖掘与精准添加模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
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
    "id": "lk-0332",
    "title": "邀约话术与到店转化模块-PRD",
    "sourceFile": "06-邀约话术与到店转化模块-PRD.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/06-邀约话术与到店转化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "转化复盘",
      "小红书获客",
      "社群SOP",
      "指标异常判断",
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
      "社群运营推进",
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
    "sourceUpdatedAt": "2026-04-16T01:29:40.643Z",
    "charCount": 4634,
    "evidenceSnippets": [
      "解决销售在客户邀约时\"话术单一、邀约转化率低、缺乏到店价值塑造方法\"的问题,帮助销售掌握科学的邀约话术与策略,提升邀约到店转化率(目标从20-40%提升至40-60%),最终提高成交率。",
      "查看邀约记录列表 → 筛选时间段/客户类型 → 查看转化率统计 → 查看话术效果对比 → 查看优化建议",
      "**错误场景**:与企业微信同步邀约记录时API调用失败"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：邀约话术与到店转化模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0334",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "08-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/销售社群运营与客户挖掘策略访谈/08-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "高客单成交"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:31:58.591Z",
    "charCount": 4933,
    "evidenceSnippets": [
      "次要用户:店长(查看考核数据、制定带教计划)、培训管理员(配置闯关任务)",
      "解决销售培训\"缺乏系统训练机制、实战经验难以沉淀、能力短板无法精准定位\"的问题,通过游戏化闯关考核与实战复盘,帮助销售系统掌握核心能力、识别短板并针对性提升,最终形成可衡量的能力评估体系。",
      "- 案例场景选择(客户挖掘、需求诊断、邀约到店、异议处理、成交转化)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与实战复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops",
        "ops_manager"
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
    "id": "lk-0336",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "需求挖掘",
      "转化复盘",
      "岗位边界"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:57:10.068Z",
    "charCount": 3434,
    "evidenceSnippets": [
      "**小区开拓组**：负责前期资源开拓，建立新群，将建好的群资源分配到各门店；",
      "**门店渠道**：门店接待的意向客户，确认属于同小区后统一拉群。",
      "运营核心目标是将群内客户**转化为一对一私域**，通过企业微信进行持续跟踪。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：清洗后的知识库文档",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0337",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "新人培养与考核",
      "转化复盘",
      "客诉处理"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T09:58:01.244Z",
    "charCount": 2800,
    "evidenceSnippets": [
      "- **线上化功能描述**：系统提供群活跃度看板、新增客户数统计、微信添加通过率、销售跟进频次排行、小区订单转化率等数据维度。",
      "本大纲基于《小区运营专员》访谈内容，将线下小区运营中由运营助理、门店销售、店长协同完成的社群运营与客户转化流程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：小区开拓专员通过线上渠道、门店意向客户转群等方式拉群，并识别和激励KOC协助拉群。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：功能模块大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0338",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "岗位边界",
      "需求挖掘",
      "新人培养与考核"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:58:55.845Z",
    "charCount": 2908,
    "evidenceSnippets": [
      "- 内容项：小区开拓组职责、小区运营组职责、门店协同角色分工",
      "- 内容项：督导/店长/销售职责边界、协同流程、新人带教机制",
      "- 关联案例：交房两年后的客户仍可能在群内活跃，可挖掘后续需求"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：知识库大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0339",
    "title": "小区拉群与KOC管理模块-PRD",
    "sourceFile": "04-小区拉群与KOC管理模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/04-小区拉群与KOC管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "社群SOP",
      "指标异常判断",
      "新人培养与考核",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T09:59:46.479Z",
    "charCount": 2261,
    "evidenceSnippets": [
      "作为一名小区开拓专员，我希望快速掌握拉群渠道的选择依据，避免盲目尝试。",
      "**模块目标**：帮助小区运营人员掌握拉群渠道策略、建群标准与KOC识别激励方法，提升建群效率与质量。",
      "作为一名培训负责人，我希望新人先完成拉群基础训练，再进入实战环节。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区拉群与KOC管理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0340",
    "title": "社群内容规划与运营模块-PRD",
    "sourceFile": "05-社群内容规划与运营模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/05-社群内容规划与运营模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "新人培养与考核",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T10:00:14.610Z",
    "charCount": 2129,
    "evidenceSnippets": [
      "**模块目标**：帮助小区运营人员掌握周度运营规划方法、内容类型选择与发布策略，提升群运营效果。",
      "根据访谈，社群内容运营是激活客户的关键环节，当前存在以下问题：",
      "作为一名培训负责人，我希望新人掌握内容运营的节奏感，减少试错成本。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：社群内容规划与运营模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0341",
    "title": "直播策划与执行模块-PRD",
    "sourceFile": "06-直播策划与执行模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/06-直播策划与执行模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "客户接待闭环",
      "新人培养与考核"
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
    "sourceUpdatedAt": "2026-04-15T10:00:45.932Z",
    "charCount": 2384,
    "evidenceSnippets": [
      "**适用对象**：门店销售、小区运营助理、新入职销售人员",
      "**页面目标**：讲解直播在小区运营中的定位与核心目标。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：直播策划与执行模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0342",
    "title": "私域客户跟进与转化模块-PRD",
    "sourceFile": "07-私域客户跟进与转化模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/07-私域客户跟进与转化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "转化复盘",
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T10:01:17.660Z",
    "charCount": 2411,
    "evidenceSnippets": [
      "作为一名店长，我希望看到销售跟进数据，及时干预异常情况。",
      "**模块目标**：帮助销售人员掌握客户跟进节奏、分层策略与话术方法，提升私域转化率。",
      "**适用对象**：门店销售、小区运营助理、新入职销售人员"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：私域客户跟进与转化模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
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
    "id": "lk-0344",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T10:02:10.565Z",
    "charCount": 910,
    "evidenceSnippets": [
      "**小区订单占比计算口径**需确认是否仅统计小区渠道订单。",
      "2. **功能模块大纲**：将线下小区运营流程转化为可线上化的培训模块。",
      "访谈主要聚焦**小区运营流程与执行细节**，对产品参数、设计规范、制度原文等信息覆盖有限，后续建议补充正式资料。"
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
    "id": "lk-0346",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "转化复盘",
      "资源开拓",
      "小红书获客",
      "新人培养与考核"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:18:52.080Z",
    "charCount": 3169,
    "evidenceSnippets": [
      "本大纲基于《小区社群运营专员》访谈内容,将线下小区社群运营、客户跟进、数据统计、活动策划等流程,转化为可线上化、可量化、可管控的功能模块。标注说明如下:",
      "- **线上化功能描述**:系统提供实时数据看板,包括添加率、跟进频率、到店数、签单数、转化率等核心指标,支持按门店/小区/销售维度查看,自动生成周报/月报。",
      "- **对应线下流程**:运营专员在已签单客户中筛选样板间意向,通过社群宣传和邀约参观样板间,但依赖销售主观判断,信息不透明。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：功能模块大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0347",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/03-知识库大纲.md",
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
      "小红书获客",
      "新人培养与考核"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:19:48.813Z",
    "charCount": 3338,
    "evidenceSnippets": [
      "- 关联案例:在已签单客户中筛选样板间意向,通过社群宣传和邀约参观转化",
      "- 内容项:邀约到店话术、邀约参观样板间话术、落地活动邀约话术、难邀约客户攻坚策略",
      "- 内容项:活动策划模板、OA流程、物料采购清单、目标制定、邀约管理、签到礼登记、复盘方法"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：知识库大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0348",
    "title": "小区信息采集与进度管理模块-PRD",
    "sourceFile": "04-小区信息采集与进度管理模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/04-小区信息采集与进度管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "资源开拓",
      "社群SOP",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:20:41.271Z",
    "charCount": 2944,
    "evidenceSnippets": [
      "**模块目标**:帮助运营专员建立完整的小区信息库,实时掌握小区交房进度、户型信息、建造状态,避免信息分散与遗漏。",
      "小区交房时间需通过小红书、房产APP、业主反馈等多渠道手动收集;",
      "作为一名销售,我希望随时查看小区的建造进度、户型资料、已有案例,不用每次都问运营专员。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区信息采集与进度管理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0349",
    "title": "客户添加与跟进管理模块-PRD",
    "sourceFile": "05-客户添加与跟进管理模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/05-客户添加与跟进管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "转化复盘",
      "客户接待闭环",
      "报价推进"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:21:22.170Z",
    "charCount": 3075,
    "evidenceSnippets": [
      "客户基础信息:客户ID、姓名、手机、微信昵称、来源渠道、所属小区、所属群、负责销售、预算范围",
      "- 跟进内容类型选择(活动类/设计类/进度类/尺寸类/样板间类/其他)",
      "**数据同步失败**:企业微信添加行为同步失败时,提示用户手动添加。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：客户添加与跟进管理模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0350",
    "title": "数据统计与看板模块-PRD",
    "sourceFile": "06-数据统计与看板模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/06-数据统计与看板模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "转化复盘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:22:05.634Z",
    "charCount": 3201,
    "evidenceSnippets": [
      "`进入系统` → `查看数据看板` → `选择统计维度(门店/小区/销售)` → `选择时间范围` → `查看核心指标` → `下钻查看明细` → `导出报表`",
      "- 小区数据表(小区名称、客户数、添加率、转化率、签单数)",
      "- 核心指标卡片(群客户数、添加率、跟进频率、到店数、签单数、转化率)"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数据统计与看板模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
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
    "id": "lk-0352",
    "title": "过程管控与复盘模块-PRD",
    "sourceFile": "08-过程管控与复盘模块-PRD.md",
    "relativePath": "流程清单/小区社群运营流程与数据管理访谈/08-过程管控与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "转化复盘",
      "指标异常判断",
      "社群SOP",
      "资源开拓",
      "客户接待闭环",
      "客诉处理"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:23:21.623Z",
    "charCount": 2943,
    "evidenceSnippets": [
      "`进入系统` → `设置目标` → `查看过程看板` → `接收异常预警` → `调整策略` → `完成目标` → `复盘总结`",
      "运营专员:设置小区目标、监控所有销售行为、处理异常预警、创建复盘记录",
      "店长:设置门店目标、监控所有数据、处理异常预警、查看复盘报告"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：过程管控与复盘模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
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
    "id": "lk-0354",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/小区运营流程与社群管理/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "转化复盘",
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:31:44.879Z",
    "charCount": 4656,
    "evidenceSnippets": [
      "**小区开拓组**：负责资源开拓和新群建立，建立完成后由总部领导统一分配至各门店",
      "**小区运营组**：负责已建立小区群的持续运营，与门店店长、督导、运营专员共同制定运营规划",
      "小区群建立后，门店销售和店长入驻群内，承接运营工作。运营助理负责内容输出对接，门店销售负责："
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：清洗后的知识库文档",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0355",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/小区运营流程与社群管理/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "转化复盘",
      "客诉处理",
      "会审协同"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:32:40.458Z",
    "charCount": 3479,
    "evidenceSnippets": [
      "本大纲基于《殷殷-小区运营》访谈内容，将线下小区运营中由运营团队、销售、店长协同完成的社群运营流程，转化为可线上化、可监控、可优化的功能模块。标注说明如下：",
      "- **线上化功能描述**：系统自动统计群人数变化、新增客户数、微信添加数、群活跃度，生成周报月报，支持门店对比分析，为运营决策提供数据支持。",
      "- **对应线下流程**：小区开拓组负责拉群、填充内部人员、等待真实业主达到30人后分配给门店，店长督导评估后安排销售入驻。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：功能模块大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0356",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/小区运营流程与社群管理/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "新人培养与考核",
      "转化复盘",
      "会审协同"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:33:55.476Z",
    "charCount": 4614,
    "evidenceSnippets": [
      "- 内容项：企业微信群创建、管理、聊天记录采集、账号开通成本",
      "- 内容项：建群→规划→运营→直播→跟进→转化的标准流程",
      "- 内容项：订单占比达到15%冲刺目标的小区运营全流程复盘"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：知识库大纲",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0357",
    "title": "建群管理与资源分配模块-PRD",
    "sourceFile": "04-建群管理与资源分配模块-PRD.md",
    "relativePath": "流程清单/小区运营流程与社群管理/04-建群管理与资源分配模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "客户接待闭环",
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
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:35:05.997Z",
    "charCount": 3210,
    "evidenceSnippets": [
      "**群人数异常减少**：群人数突然下降超过20%时，发送预警通知运营人员。",
      "群人数数据同步延迟 **≤ 2小时**（如对接实时API则无延迟）。",
      "**模块目标**：实现小区群从创建、填充、达标、分配、销售入驻的全流程可视化管理，解决当前人工统计、信息不透明、分配效率低的问题。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：建群管理与资源分配模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0358",
    "title": "小区群数据统计与分析模块-PRD",
    "sourceFile": "05-小区群数据统计与分析模块-PRD.md",
    "relativePath": "流程清单/小区运营流程与社群管理/05-小区群数据统计与分析模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:35:50.623Z",
    "charCount": 3137,
    "evidenceSnippets": [
      "**模块目标**：实现小区群数据自动统计，包括群人数、新增客户数、微信添加数等核心指标，解决当前人工逐一核对、工作量大、易出错的问题。",
      "**数据波动异常**：群人数突然大幅波动（±50%）时，发送预警通知。",
      "`群数据采集` → `自动统计计算` → `生成数据报表` → `趋势分析` → `异常预警` → `数据导出`"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：小区群数据统计与分析模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0359",
    "title": "销售跟进与客户维护模块-PRD",
    "sourceFile": "06-销售跟进与客户维护模块-PRD.md",
    "relativePath": "流程清单/小区运营流程与社群管理/06-销售跟进与客户维护模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "转化复盘",
      "新人培养与考核",
      "客户接待闭环"
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
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:36:40.377Z",
    "charCount": 3355,
    "evidenceSnippets": [
      "作为一名运营负责人，我希望看到整体跟进数据，评估跟进对转化的影响。",
      "**模块目标**：实现销售跟进过程可视化，自动提醒跟进异常，帮助店长和督导有效监督销售跟进质量，解决长周期客户跟进懈怠问题。",
      "作为一名督导，我希望看到跟进异常的客户，重点辅导销售跟进技巧。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：销售跟进与客户维护模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0360",
    "title": "群风控与预警模块-PRD",
    "sourceFile": "07-群风控与预警模块-PRD.md",
    "relativePath": "流程清单/小区运营流程与社群管理/07-群风控与预警模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "客诉处理",
      "客户接待闭环"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:37:30.924Z",
    "charCount": 3445,
    "evidenceSnippets": [
      "作为一名销售，我希望系统提醒我群内有异常私加行为，保护我的客户资源。",
      "**模块目标**：实时监控群消息，自动识别风险事件（客户投诉、竞品混入、广告等），及时预警并辅助处理，降低群运营风险。",
      "作为一名运营人员，我希望系统自动识别群内投诉，及时提醒我处理，避免事态扩大。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：群风控与预警模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0361",
    "title": "小区运营目标与业绩跟踪模块-PRD",
    "sourceFile": "08-小区运营目标与业绩跟踪模块-PRD.md",
    "relativePath": "流程清单/小区运营流程与社群管理/08-小区运营目标与业绩跟踪模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "资源开拓",
      "社群SOP",
      "指标异常判断",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T09:38:22.783Z",
    "charCount": 3633,
    "evidenceSnippets": [
      "- 高低业绩对比：高业绩小区 vs 低业绩小区的关键指标对比",
      "店长：查看本门店所有小区的目标和业绩、调整本门店目标、导出数据",
      "**模块目标**：实现小区运营目标的可视化管理，分阶段跟踪订单完成进度，实时展示业绩达成情况，帮助门店冲刺目标。"
    ],
    "generatedTask": {
      "courseTitle": "资源开拓：小区运营目标与业绩跟踪模块-PRD",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次资源开拓表达。",
      "assessmentFocus": "检查学员是否能说清资源开拓的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0362",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/小区运营流程与社群管理/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "资源开拓",
      "指标异常判断",
      "转化复盘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:38:57.743Z",
    "charCount": 2177,
    "evidenceSnippets": [
      "**验证指标**：新增客户数、微信添加数为主要考核指标，群活跃度不作为核心指标。",
      "**组织架构**：小区开拓组负责建群，小区运营组负责持续运营，门店承接执行。",
      "**数据统计自动化**：自动统计群人数、新增客户数、添加数，生成报表。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：README",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0363",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "量尺出图",
      "需求挖掘",
      "非标下单底线",
      "小红书获客",
      "设计方案讲解"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:36:43.416Z",
    "charCount": 1822,
    "evidenceSnippets": [
      "2. **第154行**:提到客户因为小红书视频频繁改图,建议确认是否需要制作针对小红书热门案例的专业分析文档",
      "4. **第226行**:设计师提到\"不收费\"的出图,建议确认是练习性质的方案还是实际客户方案"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0364",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "岗位边界",
      "会审协同",
      "量尺出图",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-16T01:37:25.540Z",
    "charCount": 2959,
    "evidenceSnippets": [
      "**对应线下流程**:新人入职后通过老设计师带教、观察学习了解岗位职责",
      "- 常见户型尺寸数据库(精装房100平左右户型的卧室、客厅等标准尺寸)",
      "- 会审前准备清单(客户需求梳理、生活场景描述、设计逻辑整理)"
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
    "id": "lk-0365",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "需求挖掘",
      "设计方案讲解",
      "量尺出图",
      "会审协同"
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
    "sourceUpdatedAt": "2026-04-16T01:38:26.022Z",
    "charCount": 4373,
    "evidenceSnippets": [
      "**内容项**:频繁改图案例特征(需求边界不清晰、未明确尺寸限制)",
      "**关联案例**:袁老师会审案例(先梳理需求,再讲方案)",
      "**来源依据**:访谈第214-220行\"我们方案会审的要求是,首先也是杨老师给我们定的要求...先说这个客户的需求,他的生活场景,然后再到你在讲方案的逻辑\""
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
    "id": "lk-0366",
    "title": "方案讲解能力培养模块-PRD",
    "sourceFile": "04-方案讲解能力培养模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/04-方案讲解能力培养模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "需求挖掘",
      "客户接待闭环",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:39:19.891Z",
    "charCount": 2876,
    "evidenceSnippets": [
      "优秀的方案讲解需要设计师能够占主导,满足客户所有需求,并对任何问题对答如流。因此,需要通过系统化培训提升设计师的综合讲解能力。",
      "`进入模块` → `学习需求挖掘方法` → `模拟需求挖掘练习` → `学习方案讲解标准流程` → `观看优秀讲解视频案例` → `虚拟客户模拟讲解` → `学习专业知识拓展内容` → `完成阶段考核` → `解锁下一模块`",
      "**模块目标**:帮助设计师掌握专业的方案讲解技巧,包括需求挖掘、方案呈现、专业问答等核心能力,提高客户信任度和方案通过率。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：方案讲解能力培养模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0367",
    "title": "方案设计与质量控制模块-PRD",
    "sourceFile": "05-方案设计与质量控制模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/05-方案设计与质量控制模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "审单防错",
      "指标异常判断",
      "量尺出图",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-16T01:40:04.091Z",
    "charCount": 3130,
    "evidenceSnippets": [
      "**尺寸校验工具数据缺失**:提示\"该户型暂无数据,请联系管理员补充\";",
      "`进入模块` → `学习尺寸规划标准` → `使用尺寸校验工具` → `学习会审准备流程` → `使用会审准备清单` → `学习会审反馈跟进方法` → `使用会审回顾工具` → `完成阶段考核` → `解锁下一模块`",
      "- 常见户型尺寸数据库(100平米左右户型的卧室、客厅等标准尺寸)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：方案设计与质量控制模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0368",
    "title": "客户沟通与需求管理模块-PRD",
    "sourceFile": "06-客户沟通与需求管理模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/06-客户沟通与需求管理模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "岗位边界",
      "指标异常判断",
      "客户接待闭环",
      "非标下单底线"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-16T01:40:52.092Z",
    "charCount": 3453,
    "evidenceSnippets": [
      "客户最容易质疑的部分是尺寸问题,而反复改图的主要原因是在第一次沟通时给客户灌输的信息量不够,没有建立尺寸限制意识。因此,需要通过系统化培训提升设计师的客户沟通和需求管理能力。",
      "`进入模块` → `学习客户异议处理技巧` → `模拟异议场景练习` → `学习需求边界管理方法` → `使用第一次沟通清单` → `学习小红书案例分析技巧` → `完成阶段考核` → `解锁下一模块`",
      "作为一名设计师,我希望在第一次沟通时就建立明确的需求边界,减少后续反复改图。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户沟通与需求管理模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0369",
    "title": "团队协作与考核成长模块-PRD",
    "sourceFile": "07-团队协作与考核成长模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/07-团队协作与考核成长模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "指标异常判断",
      "客户接待闭环",
      "转化复盘",
      "会审协同"
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
    "sourceUpdatedAt": "2026-04-16T01:41:38.959Z",
    "charCount": 3641,
    "evidenceSnippets": [
      "协作数据:设计师参与第一次接待次数、协作客户转化率、协作满意度评分",
      "设计师前期介入接待的客户更容易实现大额预付,但并非所有设计师都能随时参与第一次接待。因此,需要通过系统化工具优化协作流程,并建立清晰的考核和成长机制。",
      "`进入模块` → `学习销售协作流程` → `使用协作工具` → `学习会审协作规范` → `了解考核标准` → `使用业绩追踪工具` → `建立个人成长档案` → `完成阶段考核` → `解锁下一模块`"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：团队协作与考核成长模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0370",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "需求挖掘",
      "量尺出图",
      "会审协同",
      "非标下单底线"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:42:11.069Z",
    "charCount": 2196,
    "evidenceSnippets": [
      "**核心功能**:异议处理训练、尺寸质疑应对、需求边界管理、小红书案例分析、需求变更管理",
      "- 培训类:方案讲解技巧、需求挖掘方法、异议处理、团队协作、FAQ",
      "**核心功能**:尺寸规划训练、尺寸可视化沟通、会审准备清单、会审回顾改进"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0371",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "非标下单底线",
      "需求挖掘",
      "会审协同",
      "量尺出图",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-16T01:40:44.830Z",
    "charCount": 3284,
    "evidenceSnippets": [
      "**卧室尺寸**：精装房100平左右的户型，卧室尺寸通常较小；",
      "**需求的深度挖掘**：对客户需求的掌握是方案讲解成功的基础。",
      "受访者指出，客户最容易对**尺寸问题**提出质疑，尤其是："
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0372",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "非标下单底线",
      "量尺出图",
      "需求挖掘",
      "转化复盘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:41:25.073Z",
    "charCount": 2794,
    "evidenceSnippets": [
      "本大纲基于《职业3年公司4个月设计师》访谈内容，将线下门店中由设计师、销售、店长协同完成的方案设计与客户沟通流程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **线上化功能描述**：系统提供协同接待话术、需求同步模板、会审意见记录工具、审美差异协调指南，提升协同效率。",
      "- **对应线下流程**：设计师在第一次沟通时建立约束意识，强调尺寸限制和户型约束，减少客户随意改图。"
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
    "id": "lk-0373",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "岗位边界",
      "会审协同",
      "量尺出图",
      "非标下单底线"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:42:18.994Z",
    "charCount": 3256,
    "evidenceSnippets": [
      "- 内容项：卧室尺寸标准、过道宽度要求、床与衣柜间距、柜门开启空间、精装房100平户型常见尺寸",
      "- 关联案例：客户受小红书影响频繁改图，设计师建议第一次就强调尺寸限制和户型约束",
      "- 内容项：100平精装房户型特点、卧室尺寸限制、过道宽度标准、柜体布局约束、常见设计难点"
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
    "id": "lk-0374",
    "title": "设计师职业认知与成长路径模块-PRD",
    "sourceFile": "04-设计师职业认知与成长路径模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/04-设计师职业认知与成长路径模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "岗位边界",
      "客户接待闭环",
      "指标异常判断",
      "量尺出图",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:43:09.117Z",
    "charCount": 2632,
    "evidenceSnippets": [
      "**模块目标**：帮助新人设计师在进入培训系统的第一阶段建立正确的职业认知、理解工作内容与时间分配、建立成长预期和学习心态。",
      "根据访谈，设计师的工作内容包含出图、谈单、改图、下单等多个环节，但新人设计师普遍存在以下问题：",
      "作为一名培训负责人，我希望新人先完成认知校准，再进入技能训练，以减少重复解释成本。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师职业认知与成长路径模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0375",
    "title": "方案讲解与客户沟通模块-PRD",
    "sourceFile": "05-方案讲解与客户沟通模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/05-方案讲解与客户沟通模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "需求挖掘",
      "客户接待闭环",
      "转化复盘",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:43:42.518Z",
    "charCount": 2530,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师掌握方案讲解的核心技巧，包括需求挖掘、客户理解、方案呈现、主导讲解、客户提问应对等能力。",
      "作为新人设计师，我希望系统告诉我如何进行需求挖掘和方案呈现，而不是只给我一堆理论。",
      "作为培训负责人，我希望设计师通过情景模拟训练方案讲解能力，而不是只看视频。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：方案讲解与客户沟通模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0376",
    "title": "尺寸表达与空间感传递模块-PRD",
    "sourceFile": "06-尺寸表达与空间感传递模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/06-尺寸表达与空间感传递模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "非标下单底线",
      "量尺出图",
      "指标异常判断",
      "客户接待闭环",
      "需求挖掘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:44:24.898Z",
    "charCount": 2500,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师掌握将抽象尺寸数据转化为客户可感知的空间概念的能力，有效应对客户对尺寸的质疑。",
      "作为培训负责人，我希望设计师能掌握多种尺寸表达技巧，而不仅仅是说数字。",
      "店长/培训师：查看设计师训练得分、薄弱尺寸类型、学习进度"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：尺寸表达与空间感传递模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0377",
    "title": "设计师与销售协同配合模块-PRD",
    "sourceFile": "07-设计师与销售协同配合模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/07-设计师与销售协同配合模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "指标异常判断",
      "转化复盘"
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
    "sourceUpdatedAt": "2026-04-16T01:44:56.702Z",
    "charCount": 2458,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师掌握与销售协同配合的方法，包括前期接待介入、需求传递、方案会审配合等，提升协同效率。",
      "`选择协同场景` → `角色扮演模拟` → `需求传递练习` → `方案会审配合` → `冲突处理训练` → `获取反馈与复盘`",
      "- 场景卡片：前期接待介入、需求传递、方案会审、审美差异协调"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：设计师与销售协同配合模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0378",
    "title": "客户预期管理与改图控制模块-PRD",
    "sourceFile": "08-客户预期管理与改图控制模块-PRD.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/08-客户预期管理与改图控制模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "小红书获客",
      "非标下单底线",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:45:28.934Z",
    "charCount": 2484,
    "evidenceSnippets": [
      "- 场景卡片：首次沟通建立预期、小红书热点辟谣、不合理需求识别、改图应对",
      "作为培训负责人，我希望设计师能掌握预期管理的标准话术和方法。",
      "`选择预期管理场景` → `首次沟通模拟` → `约束意识建立` → `小红书热点辟谣` → `改图应对策略` → `获取反馈与复盘`"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户预期管理与改图控制模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0379",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/新人设计师工作痛点与考核2/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "需求挖掘",
      "非标下单底线",
      "量尺出图",
      "设计方案讲解"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-16T01:45:59.962Z",
    "charCount": 1902,
    "evidenceSnippets": [
      "核心能力：需求挖掘、方案呈现、客户沟通、尺寸表达、销售协同",
      "| 核心能力 | 客户接待、需求诊断、异议处理 | 方案讲解、需求挖掘、尺寸表达 |",
      "2. **功能模块大纲**：将设计师培训与协同流程转化为可线上化的培训模块。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0380",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "资源开拓",
      "非标下单底线",
      "需求挖掘",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:44:42.361Z",
    "charCount": 6143,
    "evidenceSnippets": [
      "新人能理解培训中讲解的报价逻辑,但面对不同户型、不同客户需求时,无法快速举一反三;",
      "不同户型产生的价格差异大,客户常提出详细价格询问,新人容易卡顿。",
      "受访者为**从业九年的资深销售人员**,其中**八年从事培训工作**,近**三个月转为销售岗位**。其职业背景兼具培训体系设计与一线销售实战经验,对新人培养与销售能力成长有深刻理解。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0381",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "需求挖掘",
      "报价推进",
      "资源开拓",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T08:45:58.310Z",
    "charCount": 4080,
    "evidenceSnippets": [
      "本大纲基于《从业九年资深销售培训专家》访谈内容,将线下门店中由资深销售、培训师、店长协同完成的新人培养过程,转化为可线上前置培训、可反复强化、可精准考核的功能模块。标注说明如下:",
      "- **对应线下流程**:通过真实带教、情景提问、门店演练和复盘让新人逐步形成经验,但考核标准不统一,复盘依赖个人经验。",
      "- **对应线下流程**:培训师通过口述、案例分享、带教演练向新人传递经验,但资料分散、依赖个人记忆与表达。"
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
    "id": "lk-0382",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "非标下单底线",
      "资源开拓",
      "转化复盘"
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
    "sourceUpdatedAt": "2026-04-15T08:47:15.347Z",
    "charCount": 4112,
    "evidenceSnippets": [
      "- 关联案例:新人培训结束后的实际销售中,最容易在板材分类、报价能力、空间规划、需求挖掘四个板块卡壳",
      "- 内容项:板材每平方价格、五金每个价格、拉手每个价格、报价计算逻辑、不同户型价格差异原因",
      "- 内容项:销售成长周期(半年到一年)、新人四大核心难点(板材分类、报价能力、空间规划、需求挖掘)、常见挫败来源、正确心态建立"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0383",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "岗位边界",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:48:19.977Z",
    "charCount": 3194,
    "evidenceSnippets": [
      "根据访谈,从业九年的资深销售培训专家认为新人销售普遍存在以下问题:",
      "作为一名培训师,我希望新人先完成认知校准和销冠精神认同,再进入技能训练,减少重复解释成本。",
      "作为一名店长,我希望系统提前告诉新人什么是正确心态、什么是销冠精神,降低带教压力。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0384",
    "title": "产品知识与报价能力模块-PRD",
    "sourceFile": "05-产品知识与报价能力模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/05-产品知识与报价能力模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
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
    "sourceUpdatedAt": "2026-04-15T08:49:01.106Z",
    "charCount": 2968,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售在一个月内掌握板材分类、常卖颜色、报价体系等核心产品知识,能够快速报价并举一反三应对不同户型客户需求。",
      "作为一名新人销售,我希望快速记住板材分类和常卖颜色,避免在展厅被客户问住。",
      "作为一名新人销售,我希望掌握报价逻辑,能够根据不同户型快速给出准确报价。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：产品知识与报价能力模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0385",
    "title": "客户需求挖掘与类型识别模块-PRD",
    "sourceFile": "06-客户需求挖掘与类型识别模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/06-客户需求挖掘与类型识别模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "客户接待闭环",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-15T08:49:53.587Z",
    "charCount": 3162,
    "evidenceSnippets": [
      "作为一名培训师,我希望系统提供客户类型识别训练和需求挖掘话术,帮助新人提升能力。",
      "**模块目标**:帮助新人销售掌握客户类型识别方法(刚需/改善/高端),学会通过房价、家电品牌、硬装公司定位等判断真实购买力,提升需求挖掘精准度。",
      "受访者强调,高端客户说\"太贵了再看看\"可能只是不想继续聊下去,需要深度挖掘真实需求而非买不起。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户需求挖掘与类型识别模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0386",
    "title": "竞品对比与差异化应对模块-PRD",
    "sourceFile": "07-竞品对比与差异化应对模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/07-竞品对比与差异化应对模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T08:50:33.725Z",
    "charCount": 3059,
    "evidenceSnippets": [
      "客户会提出\"我乐的设计我也喜欢,为什么你们价格比他们贵30%\";",
      "作为一名培训师,我希望系统提供竞品知识库和应对话术训练,帮助新人提升竞争力。",
      "- \"我乐的设计我也喜欢,为什么你们价格比他们贵30%\""
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：竞品对比与差异化应对模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0387",
    "title": "促单话术与成交推进模块-PRD",
    "sourceFile": "08-促单话术与成交推进模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/08-促单话术与成交推进模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "高客单成交",
      "指标异常判断",
      "客户接待闭环",
      "转化复盘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:51:33.600Z",
    "charCount": 3736,
    "evidenceSnippets": [
      "**模块目标**:帮助新人销售掌握促单话术六步法(铺垫节奏→介绍服务→强调价值→虚实转化→引导对比→落地展示),能够自信地收取诚意金并推进成交。",
      "作为一名培训师,我希望系统提供促单话术训练和场景模拟,帮助新人提升成交能力。",
      "作为一名新人销售,我希望掌握促单话术逻辑,能够自信地推进成交。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：促单话术与成交推进模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0388",
    "title": "闯关考核与实战复盘模块-PRD",
    "sourceFile": "09-闯关考核与实战复盘模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/09-闯关考核与实战复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "需求挖掘",
      "指标异常判断",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T08:52:28.193Z",
    "charCount": 3941,
    "evidenceSnippets": [
      "作为一名培训师,我希望系统能持续追踪新人能力成长,及时发现问题并调整培训策略。",
      "**模块目标**:通过真实场景闯关任务验证新人销售的核心能力,生成个人成长报告,帮助新人明确薄弱项并持续改进。",
      "作为一名新人销售,我希望通过闯关测试了解自己的能力水平和薄弱项。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：闯关考核与实战复盘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0389",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/新人销售成长痛点与销冠培养/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "非标下单底线",
      "转化复盘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:53:28.258Z",
    "charCount": 3800,
    "evidenceSnippets": [
      "访谈对象兼具培训体系设计与一线销售实战经验,对新人培养与销售能力成长有深刻理解,为系统设计提供了宝贵的实战经验和理论支撑。",
      "- 关键指标:报价准确率达到85%以上,颜色识别正确率达到90%以上",
      "2. **报价能力与举一反三** - 报价体系细致,不同户型价格差异大"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0390",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "资源开拓",
      "板材产品解释",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:32:20.603Z",
    "charCount": 3122,
    "evidenceSnippets": [
      "价格异议:最终报价7万(已压缩到30-35个投影),客户仍觉得贵",
      "**期望**:想去跑小区拍原创素材(新楼盘进度、户型实景等)",
      "**专业基础薄弱**:培训初期错过了基础课程(铰链、板材等),导致后续学习吃力"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0391",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "报价推进",
      "客户接待闭环",
      "高客单成交",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:32:57.529Z",
    "charCount": 2045,
    "evidenceSnippets": [
      "本大纲基于《华拓店新人销售王佳宁》访谈内容,从新销售员的视角提炼培训需求,将线下门店中由店长、师傅、老销售协同完成的经验传授过程,转化为可线上前置培训、可复训、可考核的功能模块。",
      "- **对应线下流程**:新人面对客户时不知如何接待、判断客户类型、挖掘需求,靠观察老销售或师傅带教",
      "- **对应线下流程**:新人报价能力弱,面对价格异议不知如何拆解、提供替代方案,逼单时客户说\"考虑\"就卡壳"
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
    "id": "lk-0392",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "板材产品解释",
      "资源开拓",
      "小红书获客"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:33:43.370Z",
    "charCount": 2598,
    "evidenceSnippets": [
      "- 关联案例:新人培训时错过了板材基础课,导致后续学习吃力,需师傅从根部讲到制作流程",
      "- 内容项:自家vs兔宝宝、索菲亚等竞品的板材差异(颗粒板vs生态板)、价格带、工艺优势",
      "- 内容项:不同户型、不同预算的真实成交案例、投影面积、价格、方案亮点"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0393",
    "title": "新人入职与职业认知模块-PRD",
    "sourceFile": "04-新人入职与职业认知模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/04-新人入职与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:34:19.417Z",
    "charCount": 1256,
    "evidenceSnippets": [
      "帮助新人销售建立正确的职业认知和心态预期,理解销售成长周期、核心能力要求、常见挫败点,减少因误解导致的快速流失。",
      "As a 店长/师傅,I want 查看新人的职业认知学习进度和测评结果,So that 我能针对性辅导",
      "**内容更新**:模块内容每季度更新一次,更新后推送给所有未完成学习的新人"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0394",
    "title": "产品知识强化模块-PRD",
    "sourceFile": "05-产品知识强化模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/05-产品知识强化模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "板材产品解释",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:35:05.481Z",
    "charCount": 1584,
    "evidenceSnippets": [
      "弥补新人在培训期错过的基础课程(板材、工艺、专业参数),帮助新人快速掌握产品核心知识,能够专业回答客户刁钻提问。",
      "As a 新入职销售,I want 系统学习板材知识(生态澳松板、制作流程、环保优势),So that 我能专业回答客户关于环保和质量的提问",
      "As a 新入职销售,I want 了解自家与竞品的板材差异和价格对比,So that 客户拿竞品压价时我有应对依据"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识强化模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0395",
    "title": "客户接待与需求诊断模块-PRD",
    "sourceFile": "06-客户接待与需求诊断模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/06-客户接待与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "客户接待闭环",
      "新人培养与考核",
      "资源开拓",
      "审单防错",
      "报价推进"
    ],
    "sceneTags": [
      "客户首次进店",
      "新人入门考核",
      "社群运营推进",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:35:26.116Z",
    "charCount": 1569,
    "evidenceSnippets": [
      "帮助新人学会快速判断客户类型、挖掘真实需求、制定针对性沟通策略,避免接待时不知如何开场或判断错误。",
      "As a 新入职销售,I want 掌握首轮问诊清单,So that 我不会遗漏关键信息(家庭结构、预算、小区等)",
      "As a 店长/师傅,I want 查看新人的客户接待学习进度和模拟成绩,So that 我能判断是否可以独立接待客户"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户接待与需求诊断模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0396",
    "title": "异议处理与报价成交模块-PRD",
    "sourceFile": "07-异议处理与报价成交模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/07-异议处理与报价成交模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "高客单成交",
      "新人培养与考核",
      "需求挖掘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:35:56.469Z",
    "charCount": 1743,
    "evidenceSnippets": [
      "帮助新人掌握报价计算方法、价格拆解逻辑、替代方案设计、逼单话术,能够应对客户价格异议并推进成交。",
      "As a 店长/师傅,I want 查看新人的报价和成交学习进度,So that 我能判断是否可以独立报价和逼单",
      "As a 新入职销售,I want 掌握价格拆解方法,So that 客户嫌贵时我能逐项解释费用构成"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：异议处理与报价成交模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0397",
    "title": "AI模拟客户训练模块-PRD",
    "sourceFile": "08-AI模拟客户训练模块-PRD.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/08-AI模拟客户训练模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:36:21.167Z",
    "charCount": 1805,
    "evidenceSnippets": [
      "通过AI模拟真实客户对话,让新人在无压力环境下练习完整接待流程(接待、报价、逼单),积累经验,面对真客户时不紧张。",
      "As a 店长/师傅,I want 查看新人的AI训练次数和表现评分,So that 我能判断是否可以独立接待真客户",
      "**评分争议**:新人可申请人工复核,由店长或师傅重新评价"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：AI模拟客户训练模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0398",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/新人销售成长痛点与需求/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "报价推进",
      "客户接待闭环",
      "资源开拓"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:36:53.020Z",
    "charCount": 1958,
    "evidenceSnippets": [
      "2. **功能模块大纲**:从新人视角提炼培训需求,转化为可线上化的培训模块",
      "**更关注工具支持**:新人提到小红书运营、小区调研工具等具体工具需求",
      "**学习能力强**:能在短时间内掌握报价、客户接待等技能"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0399",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "新人培养与考核",
      "报价推进",
      "资源开拓",
      "量尺出图",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:17:02.458Z",
    "charCount": 3408,
    "evidenceSnippets": [
      "成功案例:58万软装订单,客户原预算30万,通过设计效果提升客户预算意愿,最终成交价接近60万",
      "1. 对接客户后,将所有需求、户型资料、客户性格特点等信息完整传递给设计师",
      "**事务性工作耗时**:报价、图纸核对等事务性工作占工作时间的2/3,导致没有足够时间签单和消化客户"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0400",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "高客单成交",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T09:18:05.487Z",
    "charCount": 3343,
    "evidenceSnippets": [
      "家装全屋定制行业销售培养周期长、知识体系复杂、事务性工作繁重。新人销售从入职到独立成单需要经历15天总部培训+3个月门店带教,期间面临知识记忆困难、实战经验不足等挑战。资深销售则被报价、图纸核对等事务性工作占用2/3时间,无法充分发挥获客签单能力。",
      "**解决的问题**:新人不知道如何接待客户、如何诊断需求、如何成交",
      "8. **师徒制考核**:师傅带教效果是否有考核指标,激励措施如何设计"
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
    "id": "lk-0401",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "高客单成交",
      "新人培养与考核",
      "量尺出图",
      "需求挖掘",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-15T09:19:39.072Z",
    "charCount": 6419,
    "evidenceSnippets": [
      "- 内容项:带教流程、师傅职责、前三单扶持机制、考核要求",
      "- 来源依据:发言人2\"从参加培训到后面拿到第一单成交,一直到自己业绩上来\"",
      "- 来源依据:发言人2\"跟客户对接以后,我会把所有的需求客户在户型资料户型中都对接给设计师\""
    ],
    "generatedTask": {
      "courseTitle": "报价推进：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0402",
    "title": "新人入职培训模块-PRD",
    "sourceFile": "04-新人入职培训模块-PRD.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/04-新人入职培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "高客单成交",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户首次进店",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T09:21:00.244Z",
    "charCount": 4495,
    "evidenceSnippets": [
      "2. 系统展示销售流程目录(客户接待、需求诊断、方案讲解、报价成交、客户跟进等)",
      "销售流程课程按环节分类:客户接待 → 需求诊断 → 设计师匹配 → 方案讲解 → 报价成交 → 客户跟进",
      "6. 培训数据看板展示学习进度、考核通过率、前三单成功率"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人入职培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0403",
    "title": "客户接待与需求诊断模块-PRD",
    "sourceFile": "05-客户接待与需求诊断模块-PRD.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/05-客户接待与需求诊断模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "客户接待闭环",
      "高客单成交",
      "指标异常判断",
      "板材产品解释",
      "报价推进"
    ],
    "sceneTags": [
      "客户首次进店",
      "客户追问价格",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T09:22:24.444Z",
    "charCount": 4806,
    "evidenceSnippets": [
      "引导销售完成客户识别、需求诊断、预算判断,精准匹配设计师和产品方案,提升客户转化率和客单价。",
      "As a 销售, I want 系统帮我判断客户预算范围, So that 我能推荐匹配的产品档次,不会因报价不当流失客户。",
      "- 方式3:选择分类浏览\"产品参数 → 板材 → 环保等级\""
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户接待与需求诊断模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0404",
    "title": "报价与方案协同模块-PRD",
    "sourceFile": "06-报价与方案协同模块-PRD.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/06-报价与方案协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "高客单成交",
      "会审协同",
      "指标异常判断",
      "量尺出图",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "订单下单前",
      "运营复盘看板",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:23:39.374Z",
    "charCount": 5117,
    "evidenceSnippets": [
      "报价单必须包含:客户信息、产品明细、材质规格、尺寸、单价、总价、有效期",
      "1. 报价工具支持快速生成报价单,包含客户信息、产品明细、材质规格、尺寸、单价、总价",
      "提升报价和图纸核对效率,减少事务性工作时间从2/3降至1/3,增强销售与设计师协作,提升客户方案满意度。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：报价与方案协同模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0405",
    "title": "实战赋能模块-PRD",
    "sourceFile": "07-实战赋能模块-PRD.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/07-实战赋能模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "转化复盘"
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
    "sourceUpdatedAt": "2026-04-15T09:24:56.879Z",
    "charCount": 4839,
    "evidenceSnippets": [
      "- 按场景分类:客户接待、需求诊断、方案讲解、报价成交、异议处理、老客户维护",
      "失败案例按失败环节分类(客户接待、需求诊断、方案讲解、报价成交、异议处理)",
      "新人销售通过学习优秀销售的真实成交案例,掌握实战技巧和话术。"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：实战赋能模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0406",
    "title": "成长追踪模块-PRD",
    "sourceFile": "08-成长追踪模块-PRD.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/08-成长追踪模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "社群SOP",
      "需求挖掘"
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
    "sourceUpdatedAt": "2026-04-15T09:26:21.324Z",
    "charCount": 5774,
    "evidenceSnippets": [
      "- 能力雷达图:客户接待、需求诊断、方案讲解、报价成交、客户跟进五项能力评分",
      "追踪销售成长轨迹,识别优秀销售特质,为培训优化提供数据支持,提升销售团队整体效能。",
      "店长/培训师查看新人从入职到独立的完整成长轨迹,识别成长瓶颈。"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：成长追踪模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0407",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/优秀销售成长经验与高客单价成交技巧/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "高客单成交",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "量尺出图"
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
    "sourceUpdatedAt": "2026-04-15T09:27:09.761Z",
    "charCount": 2996,
    "evidenceSnippets": [
      "主流程:6个(产品知识学习、销售流程学习、闯关考核、前三单特殊考核、师徒带教管理、培训效果追踪)",
      "*核心功能**:产品知识学习库、销售流程培训课程、闯关考核系统、师徒带教管理",
      "主流程:6个(新人成长轨迹追踪、个人成长数据查看、优秀销售特质识别、培训效果评估、团队整体效能分析、成长预警提醒)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0408",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "报价推进",
      "客诉处理",
      "新人培养与考核",
      "五金场景讲解",
      "会审协同"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:33:59.274Z",
    "charCount": 4849,
    "evidenceSnippets": [
      "**主题**：设计师方案讲解技巧、客户沟通策略、销售配合经验",
      "> \"我们家以前也配过这种五金，包括研发部都试验过。但是装到客户家里一两年内没问题，三五年之后五金就会磨损。因为老是出现售后，公司最终决定下架了这个产品。\"",
      "*风险意识**：外采五金存在安装风险，装不好会产生售后问题。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：清洗后的知识库文档",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0409",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "报价推进",
      "会审协同",
      "审单防错",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:34:58.374Z",
    "charCount": 4168,
    "evidenceSnippets": [
      "2. 预算控制与方案设计培训（新人必修，资深设计师选修）",
      "**对应线下流程**：培训教师手动收集优秀案例视频、访谈录音、方案会审录像等教学素材",
      "1. **培训内容深度**：是否需要针对不同户型（两房、三房、别墅）分别制作培训内容？"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：功能模块大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0410",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "报价推进",
      "新人培养与考核",
      "五金场景讲解",
      "客诉处理",
      "会审协同"
    ],
    "sceneTags": [
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-16T01:36:49.041Z",
    "charCount": 7970,
    "evidenceSnippets": [
      "- 内容项：能否根据客户预算精准设计方案、方案报价与客户预算的匹配度",
      "- 关联案例：访谈中提到外采五金件三五年后易磨损、售后风险大",
      "- 内容项：外采五金件的风险类型（安装风险、售后风险、使用风险）"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：知识库大纲",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0411",
    "title": "方案讲解技能培训模块-PRD",
    "sourceFile": "04-方案讲解技能培训模块-PRD.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/04-方案讲解技能培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "新人培养与考核",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "客诉处理"
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
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:37:52.614Z",
    "charCount": 3251,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师掌握方案讲解的核心要素、动线逻辑和讲解技巧,提升方案讲解的流畅度、逻辑性和客户满意度。",
      "优秀方案讲解需要包含空间布局、设计理念、风格颜色定向等核心要素；",
      "作为一名培训负责人,我希望系统能通过AI模拟客户场景,让设计师随时练习讲解。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：方案讲解技能培训模块-PRD",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0412",
    "title": "客户沟通技巧培训模块-PRD",
    "sourceFile": "05-客户沟通技巧培训模块-PRD.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/05-客户沟通技巧培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "客诉处理",
      "指标异常判断",
      "五金场景讲解",
      "客户接待闭环"
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
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:38:51.189Z",
    "charCount": 4018,
    "evidenceSnippets": [
      "作为一名培训负责人,我希望系统提供话术库和AI情景模拟,让设计师随时练习。",
      "- \"我们家以前也配过这种五金...最终研究决定下架了这个产品\"",
      "**页面目标**：教授设计师如何在讲解时带入情绪,提升客户互动。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户沟通技巧培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0413",
    "title": "应对客户质疑培训模块-PRD",
    "sourceFile": "06-应对客户质疑培训模块-PRD.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/06-应对客户质疑培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "指标异常判断",
      "五金场景讲解",
      "报价推进",
      "客户接待闭环"
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
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:39:46.136Z",
    "charCount": 3960,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师掌握应对客户质疑的策略和话术,特别是应对客户要求参考小红书/抖音修改方案、质疑价格、质疑工艺等场景。",
      "作为一名设计师,我希望掌握价格质疑的应对策略,知道如何与销售配合。",
      "作为一名培训负责人,我希望系统提供AI模拟演练,让设计师在真实场景中练习应对质疑。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：应对客户质疑培训模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0414",
    "title": "设计师与销售配合培训模块-PRD",
    "sourceFile": "07-设计师与销售配合培训模块-PRD.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/07-设计师与销售配合培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同",
      "设计方案讲解",
      "报价推进",
      "需求挖掘",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
      "运营复盘看板",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-16T01:40:59.850Z",
    "charCount": 5523,
    "evidenceSnippets": [
      "**模块目标**：帮助设计师掌握与销售配合的策略,提高一次性成交率、大额订单成交率,学会客户判断、预算控制、出单配合等关键技能。",
      "- 打配合：设计师给销售使眼色,销售配合价格谈判,设计师在旁边打辅助",
      "- 来源案例：访谈中提到\"在设计方案的时候,一定要把控一下预算\""
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师与销售配合培训模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0415",
    "title": "综合能力考核模块-PRD",
    "sourceFile": "08-综合能力考核模块-PRD.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/08-综合能力考核模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
      "客户追问价格",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:42:12.015Z",
    "charCount": 5069,
    "evidenceSnippets": [
      "**模块目标**：通过理论考核、情景模拟考核、实战案例提交等方式,全面评估设计师的方案讲解能力、客户沟通能力、应对质疑能力、预算控制能力、销售配合能力,生成能力雷达图,为后续培训提供数据支持。",
      "- AI评分（方案讲解、客户沟通、应对质疑、预算控制、销售配合）",
      "作为一名培训负责人,我希望系统提供多维度的能力评估,为后续培训提供数据支持。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：综合能力考核模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0416",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/资深设计师方案讲解与客户把控技巧/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "报价推进",
      "新人培养与考核",
      "会审协同",
      "指标异常判断",
      "审单防错"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "新人入门考核",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-16T01:43:00.929Z",
    "charCount": 2579,
    "evidenceSnippets": [
      "`07-设计师与销售配合培训模块-PRD.md` - 客户判断、预算控制、出单配合、大额订单策略培训",
      "- 建议优先开发：`04-方案讲解技能培训模块-PRD.md`、`05-客户沟通技巧培训模块-PRD.md`、`08-综合能力考核模块-PRD.md`（P0级模块）",
      "访谈中提到\"根据户型图预估报价\",建议与公司报价系统对接,获取真实数据支持培训"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：README",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0417",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "转化复盘",
      "需求挖掘",
      "高客单成交",
      "资源开拓"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:08:37.266Z",
    "charCount": 4460,
    "evidenceSnippets": [
      "**简单直接**:只需将产品折扣优惠讲清楚,客户即可签单",
      "**价值引导需求**:需要向客户灌输产品价值,而非单纯比价",
      "**新人困境**:对产品和客户把握不准,耗费大量时间纠结"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0418",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "非标下单底线",
      "转化复盘",
      "需求挖掘",
      "指标异常判断"
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
    "sourceUpdatedAt": "2026-04-15T09:09:33.404Z",
    "charCount": 4086,
    "evidenceSnippets": [
      "**对应线下流程**:新人易犯报价错误、系统操作错误,需带教老师救火",
      "基于资深销售访谈内容,梳理销售培训的完整流程,并转化为线上化功能模块。",
      "**对应线下流程**:新人入职后,带教老师发放资料,逐一讲解重点,学员自主看资料+看实物"
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
    "id": "lk-0419",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "转化复盘",
      "非标下单底线",
      "高客单成交"
    ],
    "sceneTags": [
      "客户追问价格",
      "运营复盘看板",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T09:10:53.799Z",
    "charCount": 6153,
    "evidenceSnippets": [
      "**关联案例**:早期\"产品折扣优惠讲清楚客户就签单\",现在\"客户要求更多对比\"",
      "**来源依据**:\"只要把产品折扣优惠跟他讲到,然后客户就很容易签单\"",
      "**关联案例**:报价偏高时,\"用平替的产品去把效果达到,然后价格能够降下来\""
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0420",
    "title": "产品知识与系统操作培训模块-PRD",
    "sourceFile": "04-产品知识与系统操作培训模块-PRD.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/04-产品知识与系统操作培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "审单防错",
      "报价推进",
      "非标下单底线"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T09:12:23.090Z",
    "charCount": 6804,
    "evidenceSnippets": [
      "解决新人销售产品知识不熟悉、系统操作混乱、易出错等问题,通过线上化培训系统,让新人在接待客户前完成必要的产品知识和系统操作学习,减少带教负担,降低实战失误率。",
      "**对公司**:标准化培训流程,降低带教成本,提升新人成才率",
      "*应对**:提供管理便利(一键查看新人进度),培训带教老师使用系统"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：产品知识与系统操作培训模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0421",
    "title": "客户接待与带教支持模块-PRD",
    "sourceFile": "05-客户接待与带教支持模块-PRD.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/05-客户接待与带教支持模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客户接待闭环",
      "指标异常判断",
      "需求挖掘",
      "资源开拓"
    ],
    "sceneTags": [
      "客户首次进店",
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
    "sourceUpdatedAt": "2026-04-15T09:13:58.528Z",
    "charCount": 7777,
    "evidenceSnippets": [
      "解决新人销售客户接待经验不足、带教老师救火频繁的问题,通过客户类型识别、需求记录工具、带教支持系统,让新人能够独立完成客户接待,同时让带教老师能够在关键时刻介入支持。",
      "*应对**:简化必填项,智能填充(如选择小区自动带出户型)",
      "| community | varchar(100) | 小区名称 |"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户接待与带教支持模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0422",
    "title": "跟单管理与复盘沉淀模块-PRD",
    "sourceFile": "06-跟单管理与复盘沉淀模块-PRD.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/06-跟单管理与复盘沉淀模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "转化复盘",
      "指标异常判断",
      "新人培养与考核",
      "报价推进",
      "高客单成交",
      "非标下单底线"
    ],
    "sceneTags": [
      "运营复盘看板",
      "新人入门考核",
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T09:16:06.731Z",
    "charCount": 11071,
    "evidenceSnippets": [
      "**次要用户**:店长、带教老师(监控跟进质量、审核复盘内容)",
      "- 订单状态筛选(待跟进/已报价/已签约/已下单/已完成)",
      "| negotiation_score | decimal | 谈判成交评分 |"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：跟单管理与复盘沉淀模块-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0423",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/资深销售带教经验与销售技巧/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "转化复盘",
      "需求挖掘",
      "高客单成交"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:16:59.942Z",
    "charCount": 3623,
    "evidenceSnippets": [
      "8. **[价格政策]**: 最低成交价红线、折扣权限分级",
      "**模块目标**: 解决新人客户接待经验不足、带教老师救火频繁问题",
      "*现在**: 客户需求多样化,要求多维度考量(产品颜值、价格、价值引导)"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0424",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "高客单成交",
      "需求挖掘",
      "量尺出图",
      "会审协同"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:51:56.145Z",
    "charCount": 3781,
    "evidenceSnippets": [
      "1. **被问到知识盲区**：客户提出的问题超出新人的知识范围，新人无法回答。",
      "2. **遇到刁难型客户**：客户态度强硬或问题尖锐，新人不知如何应对。",
      "> \"那您这边的话就在这里写一个单子，然后付个意向金，我们让设计师去给您做设计、做测量。\""
    ],
    "generatedTask": {
      "courseTitle": "报价推进：清洗后的知识库文档",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0425",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "高客单成交",
      "会审协同",
      "转化复盘"
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
    "sourceUpdatedAt": "2026-04-15T08:52:54.178Z",
    "charCount": 3041,
    "evidenceSnippets": [
      "本大纲基于《10年销售》访谈内容，将线下门店中由资深销售通过经验传授、案例分享、实战带教完成的能力培养过程，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：通过真实带教、情景提问、门店演练和复盘让新人逐步形成经验。",
      "原因：这 5 个模块直接覆盖新人从\"认知建立 → 破冰接触 → 需求挖掘 → 异议处理 → 成交推进\"的完整最小闭环。"
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
    "id": "lk-0426",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "会审协同",
      "高客单成交",
      "社群SOP",
      "量尺出图"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:54:07.068Z",
    "charCount": 2780,
    "evidenceSnippets": [
      "- 关联案例：销售要包装设计师，测量时介绍、拉群时强调资历",
      "> 说明：以下大纲严格按 **产品类、培训类、设计类、公司规范类** 进行归纳；具体案例已穿插到最相关的分类中，不单独设立案例章节。",
      "- 来源依据：访谈中关于\"贵意味着它也好\"\"差价对应品质差异\"的描述"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0427",
    "title": "销售职业心态与成长认知模块-PRD",
    "sourceFile": "04-销售职业心态与成长认知模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/04-销售职业心态与成长认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "高客单成交",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:55:05.476Z",
    "charCount": 2431,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人先理解销售的本质是信任建立，再进入话术训练。",
      "**模块目标**：帮助新人销售建立正确的职业认知，理解销售的三个核心能力（沟通、倾听、挖掘），认识不同销售类型的特点，树立\"信任为先\"的正确心态。",
      "作为一名新人销售，我希望快速知道这份工作的核心能力要求，避免走弯路。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售职业心态与成长认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0428",
    "title": "客户破冰与信任建立模块-PRD",
    "sourceFile": "05-客户破冰与信任建立模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/05-客户破冰与信任建立模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:55:34.857Z",
    "charCount": 2128,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人理解\"和气聊天、了解诉求\"的破冰方式。",
      "**模块目标**：帮助新人销售掌握破冰技巧，学会从进门第一句话开始建立信任，理解\"先破冰、再销售\"的核心原则。",
      "很多新人急于推销产品，忽视了破冰环节，导致客户快速流失。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：客户破冰与信任建立模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0429",
    "title": "客户同频与需求挖掘模块-PRD",
    "sourceFile": "06-客户同频与需求挖掘模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/06-客户同频与需求挖掘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:56:03.822Z",
    "charCount": 2141,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握与客户同频共振的技巧，学会观察客户眼神、表情、回应，根据客户磁场调整沟通方式，深入挖掘客户真实需求。",
      "作为一名培训负责人，我希望新人理解\"因客而变\"的沟通原则。",
      "`进入模块` → `学习同频原则` → `微表情识别训练` → `需求挖掘问诊` → `场景模拟练习` → `完成考核`"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：客户同频与需求挖掘模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0430",
    "title": "价格异议处理与价值传递模块-PRD",
    "sourceFile": "07-价格异议处理与价值传递模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/07-价格异议处理与价值传递模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "小红书获客"
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
    "sourceUpdatedAt": "2026-04-15T08:56:32.417Z",
    "charCount": 2160,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握价格异议处理技巧，学会通过价值传递、品质对比、差价解释来说服客户，理解\"贵意味着好\"的引导逻辑。",
      "作为一名培训负责人，我希望新人理解\"价值传递优先于价格谈判\"的原则。",
      "作为一名新人销售，我希望学会如何应对客户说\"太贵了\"，避免只会降价。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：价格异议处理与价值传递模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0431",
    "title": "出单节奏把控与逼单技巧模块-PRD",
    "sourceFile": "08-出单节奏把控与逼单技巧模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/08-出单节奏把控与逼单技巧模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "高客单成交"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:57:00.990Z",
    "charCount": 2133,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人理解\"先信任、后出单\"的逻辑。",
      "**模块目标**：帮助新人销售掌握出单时机判断、节奏把控原则，理解\"水到渠成\"的出单方式与\"信任前提下\"的逼单技巧，区分共情型与狼性型两种销售风格。",
      "**适用对象**：新入职销售、试用期销售、成交能力待提升的销售"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：出单节奏把控与逼单技巧模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0432",
    "title": "高端客户挖掘与服务模块-PRD",
    "sourceFile": "09-高端客户挖掘与服务模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/09-高端客户挖掘与服务模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "客户接待闭环",
      "资源开拓"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:57:25.215Z",
    "charCount": 1879,
    "evidenceSnippets": [
      "作为一名培训负责人，我希望新人理解高端客户服务的特殊性。",
      "`进入模块` → `学习高端客户识别` → `掌握挖掘技巧` → `了解资源调动流程` → `案例学习` → `完成考核`",
      "**模块目标**：帮助销售掌握高端客户挖掘技巧，学会从细节判断客户购买力、调动公司资源、提供超预期服务，理解明星客户等特殊客户的服务要点。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：高端客户挖掘与服务模块-PRD",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0433",
    "title": "销售与设计师协同模块-PRD",
    "sourceFile": "10-销售与设计师协同模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/10-销售与设计师协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "指标异常判断",
      "客户接待闭环",
      "转化复盘",
      "社群SOP"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:57:50.695Z",
    "charCount": 1941,
    "evidenceSnippets": [
      "**模块目标**：帮助销售掌握与设计师协同配合的技巧，学会包装设计师、维护设计师权威、配合设计师推进订单，提升协同转化率。",
      "作为一名新人销售，我希望学会如何与设计师配合，提升转化率。",
      "作为一名培训负责人，我希望新人理解\"包装设计师\"的重要性。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售与设计师协同模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0434",
    "title": "闯关考核与复盘模块-PRD",
    "sourceFile": "11-闯关考核与复盘模块-PRD.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/11-闯关考核与复盘模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "客户接待闭环",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:58:19.011Z",
    "charCount": 2053,
    "evidenceSnippets": [
      "`进入模块` → `查看闯关任务` → `依次完成关卡` → `查看考核结果` → `生成成长报告` → `错题复盘`",
      "**模块目标**：通过真实场景设置闯关任务，检验学员对破冰、同频、异议处理、出单、协同等核心能力的掌握程度，生成个人成长报告，支持持续复盘提升。",
      "作为一名培训负责人，我希望系统能自动生成学员的能力报告。"
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
    "id": "lk-0435",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/资深销售经验分享与客户关系处理/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "会审协同"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T08:58:53.911Z",
    "charCount": 1386,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将线下销售带教与训练流程转化为可线上化的培训模块。",
      "3. **知识库大纲**：按照产品类、培训类、设计类、公司规范类整理知识项。",
      "**协同模块**：可合并，本次访谈补充了\"包装设计师\"技巧"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0436",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "资源开拓",
      "报价推进",
      "非标下单底线",
      "社群SOP"
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
    "sourceUpdatedAt": "2026-04-15T09:07:42.500Z",
    "charCount": 3982,
    "evidenceSnippets": [
      "受访者为**资深销售培训师/门店销售导师**，主要负责新人销售的带教与培训工作。其门店特点包括：",
      "周边以新小区为主，**60%-70%订单来自小区社群**；",
      "**报价细节多，易漏收钱**：板材尺寸、五金配件、工艺要求等细节疏忽导致价格差异；"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0437",
    "title": "功能模块大纲",
    "sourceFile": "02-功能模块大纲.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/02-功能模块大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "审单防错",
      "报价推进",
      "高客单成交",
      "社群SOP"
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
    "sourceUpdatedAt": "2026-04-15T09:08:35.867Z",
    "charCount": 2445,
    "evidenceSnippets": [
      "本大纲基于《资深销售》访谈内容，将线下门店中由资深销售、店长、设计师协同完成的培训与带教经验，转化为可线上前置培训、可复训、可考核的功能模块。标注说明如下：",
      "- **对应线下流程**：新人通过实战订单学习报价，但出错率高，需要在师傅带教下反复修正，容易出现漏收钱问题。",
      "- **线上化功能描述**：系统提供报价模拟场景、常见错误案例库、报价审核预警工具、尺寸/材质限制规则提示，帮助新人养成核对细节的习惯。"
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
    "id": "lk-0438",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "转化复盘",
      "新人培养与考核",
      "报价推进",
      "非标下单底线",
      "板材产品解释",
      "量尺出图"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T09:09:34.123Z",
    "charCount": 3659,
    "evidenceSnippets": [
      "- 内容描述：不同板材规格对应的最大可用尺寸，如某板材M75规格不能做超过3米等",
      "- 内容描述：标准板材尺寸（如1.2m×2.75m）与实际可用尺寸对照",
      "- 关联案例：板材尺寸超规格导致客户不接受断开，需换材质"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0439",
    "title": "报价技能专项训练模块-PRD",
    "sourceFile": "04-报价技能专项训练模块-PRD.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/04-报价技能专项训练模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "转化复盘",
      "需求挖掘",
      "客户接待闭环",
      "指标异常判断"
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
    "sourceUpdatedAt": "2026-04-15T09:10:42.071Z",
    "charCount": 2839,
    "evidenceSnippets": [
      "**模块目标**：帮助新人销售掌握报价全流程，养成核对细节的习惯，规避常见的报价错误（漏收钱、尺寸问题、材质问题），降低从签单到买单的客户流失率。",
      "作为一名培训负责人，我希望系统能提供报价错误案例库，让新人从案例中学习避坑。",
      "作为一名店长，我希望新人在完成2-3次模拟训练后再独立报价，降低带教成本。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：报价技能专项训练模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0440",
    "title": "客户跟进与成交推进模块-PRD",
    "sourceFile": "05-客户跟进与成交推进模块-PRD.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/05-客户跟进与成交推进模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "转化复盘",
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "客户接待闭环"
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
    "sourceUpdatedAt": "2026-04-15T09:11:18.324Z",
    "charCount": 2619,
    "evidenceSnippets": [
      "**模块目标**：帮助销售掌握从签意向金到正式成交的完整跟进流程，提升跟进效率，降低客户流失率，提高成交转化率。",
      "作为一名培训负责人，我希望新人能学习成功挽回流失客户的案例和话术。",
      "- 跟进阶段图（意向金 → 初稿报价 → 方案调整 → 最终报价 → 成交）"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：客户跟进与成交推进模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0441",
    "title": "销售设计师协同模块-PRD",
    "sourceFile": "06-销售设计师协同模块-PRD.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/06-销售设计师协同模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "岗位边界",
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "需求挖掘"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T09:11:53.858Z",
    "charCount": 2626,
    "evidenceSnippets": [
      "**模块目标**：帮助销售理解与设计师的协作分工和配合要点，提升协同效率，降低因配合不当导致的客户流失。",
      "作为一名培训负责人，我希望系统提供协同成功和失败的案例，让新人学习。",
      "`进入模块` → `学习协同分工` → `了解设计师工作特点` → `学习配合技巧` → `查看协同案例` → `完成情景训练` → `解锁协同工具`"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售设计师协同模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0442",
    "title": "销售心态与职业认知模块-PRD",
    "sourceFile": "07-销售心态与职业认知模块-PRD.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/07-销售心态与职业认知模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T09:12:40.124Z",
    "charCount": 2708,
    "evidenceSnippets": [
      "测评数据：抗压评分、长期主义评分、学习意愿评分、加班接受度、失败承受力",
      "**模块目标**：帮助新人销售建立正确的行业认知、成长预期和积极心态，理解销售工作的长期属性，减少急于求成、心态崩盘、负能量传染等问题。",
      "作为一名新人销售，我希望知道这份工作的真实状态和成长周期，避免入职后预期落差过大。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售心态与职业认知模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0443",
    "title": "新人成长评估与淘汰预警模块-PRD",
    "sourceFile": "08-新人成长评估与淘汰预警模块-PRD.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/08-新人成长评估与淘汰预警模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "转化复盘",
      "指标异常判断",
      "客户接待闭环"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-15T09:13:19.206Z",
    "charCount": 2880,
    "evidenceSnippets": [
      "**模块目标**：为店长和管理者提供新人成长数据看板，建立科学的评估标准和淘汰预警机制，帮助做出培养决策。",
      "作为一名培训负责人，我希望有数据支撑来判断培训效果是否达标。",
      "`进入模块` → `查看新人列表` → `选择新人查看详情` → `查看成长数据` → `查看预警信息` → `做出决策` → `记录评估结果`"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人成长评估与淘汰预警模块-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0444",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/资深销售客户转化与方案深化技巧/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "转化复盘",
      "新人培养与考核",
      "会审协同",
      "审单防错",
      "报价推进"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T09:13:49.737Z",
    "charCount": 1564,
    "evidenceSnippets": [
      "2. **功能模块大纲**：将线下销售带教与培训流程转化为可线上化的培训模块。",
      "| 核心痛点 | 客户接待与需求诊断 | 报价环节错误频发 |",
      "| 培训建议 | 建立完整销售能力体系 | 重点突破报价难点 |"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0445",
    "title": "清洗后的知识库文档",
    "sourceFile": "01-清洗后的知识库文档.md",
    "relativePath": "流程清单/AI培训系统项目推进会/01-清洗后的知识库文档.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "转化复盘",
      "需求挖掘",
      "社群SOP",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-15T08:35:30.068Z",
    "charCount": 6867,
    "evidenceSnippets": [
      "**社群数据看板:**IT小伙伴负责(对接企业微信数据接口)。",
      "建立销冠话术库、客户场景库、方案案例库、销售能力画像、社群舆情库等核心数据资产;",
      "本次会议围绕**拉米公司AI培训销售智能体项目**展开,旨在通过90天陪跑,建立四套核心系统,优化培训周期、提高代练效果、提升销售与设计师协同能力,并实现知识资产沉淀。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：清洗后的知识库文档",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
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
    "id": "lk-0447",
    "title": "知识库大纲",
    "sourceFile": "03-知识库大纲.md",
    "relativePath": "流程清单/AI培训系统项目推进会/03-知识库大纲.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "社群SOP",
      "报价推进",
      "需求挖掘",
      "小红书获客",
      "指标异常判断"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T08:38:24.685Z",
    "charCount": 5967,
    "evidenceSnippets": [
      "- 关联案例:AI核心人员负责销售代练系统、设计师评分系统、AI问答助手;IT小伙伴负责社群数据看板",
      "- 关联案例:社群舆情库包含竞品洞察(小红书、社媒平台的文案、种草文章、风格偏好)",
      "- 内容项:每周任务必须完成、人工发文档+艾特到人、线上群保持活跃、培训部门老师推动"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：知识库大纲",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "designer"
      ]
    }
  },
  {
    "id": "lk-0448",
    "title": "销售代练系统-PRD",
    "sourceFile": "04-销售代练系统-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/04-销售代练系统-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "高客单成交"
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
    "sourceUpdatedAt": "2026-04-15T08:39:43.561Z",
    "charCount": 4180,
    "evidenceSnippets": [
      "因此,需要建立销售代练系统,通过场景化游戏关卡模拟真实用户需求,让新人在手机APP里快速闯关,完成从获客→接待→成交的全流程训练。",
      "作为一名培训负责人,我希望系统自动生成训练场景与评分,减少人工带教成本。",
      "作为一名店长,我希望实时看到新人的训练进度与能力画像,了解谁需要重点带教。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售代练系统-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0449",
    "title": "设计师方案评分系统-PRD",
    "sourceFile": "05-设计师方案评分系统-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/05-设计师方案评分系统-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "指标异常判断",
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
    "sourceUpdatedAt": "2026-04-15T08:40:52.083Z",
    "charCount": 4504,
    "evidenceSnippets": [
      "`进入系统` → `上传方案资料`(平面图、效果图、需求文档) → `录制讲解视频`(10分钟) → `AI智能评分` → `生成讲解稿` → `生成评分报告` → `沉淀案例库` → `分享给销售`",
      "- 页面模板选择器(封面、需求页、方案页、效果图页、报价页)",
      "**模块目标**:帮助设计师在讲解环节提高方案理解能力、客户需求把握能力、升单能力,提高方案确认率与客单价,减少修改次数。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师方案评分系统-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0450",
    "title": "AI问答助手-PRD",
    "sourceFile": "06-AI问答助手-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/06-AI问答助手-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "客户接待闭环",
      "社群SOP",
      "转化复盘"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T08:42:02.037Z",
    "charCount": 4413,
    "evidenceSnippets": [
      "**事务性工作占用时间**:销售人员2/3时间用于报价、验证等事务性工作,而非真正的签单收钱;",
      "作为一名老销售,我希望有工具帮我快速处理报价等事务性工作,节省时间签单。",
      "**适用对象**:销售人员、设计师、新人销售、老销售、加盟店销售"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：AI问答助手-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "designer"
      ]
    }
  },
  {
    "id": "lk-0451",
    "title": "社群数据看板-PRD",
    "sourceFile": "07-社群数据看板-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/07-社群数据看板-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "报价推进",
      "转化复盘",
      "新人培养与考核",
      "客户接待闭环"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进",
      "客户追问价格",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-15T08:43:12.990Z",
    "charCount": 4784,
    "evidenceSnippets": [
      "因此,需要建立社群数据看板,可视化推进小区运营,及时提醒跟进与激活客户,同时监控舆情与竞品洞察。",
      "**数据分散**:通过微信群获取群聊信息,人工统计用户新增数量、客服/员工加入人数,效率低;",
      "**模块目标**:可视化推进小区运营,提高社群管理效率,及时提醒跟进与激活客户。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：社群数据看板-PRD",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0452",
    "title": "销售设计师协同工作台-PRD",
    "sourceFile": "08-销售设计师协同工作台-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/08-销售设计师协同工作台-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "设计方案讲解"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-15T08:44:34.401Z",
    "charCount": 4934,
    "evidenceSnippets": [
      "因此,需要建立销售设计师协同工作台,建立协同任务、设计师讲方案录屏同步、要点自动提取抄送给销售、协同流程标准化、异常上报机制,确保销售在关键节点参与,减少报价错误。",
      "**协同错误频发**:销售人员未到场设计师讲方案会议,导致后续报价出错;",
      "**缺少标准化流程**:销售与设计师协同推进签意向单、系统操作、设计师讲方案、销售跟单报价,但缺少标准流程;"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：销售设计师协同工作台-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0453",
    "title": "销售能力画像系统-PRD",
    "sourceFile": "09-销售能力画像系统-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/09-销售能力画像系统-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "报价推进",
      "需求挖掘",
      "客户接待闭环",
      "高客单成交"
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
    "sourceUpdatedAt": "2026-04-15T08:45:52.910Z",
    "charCount": 5484,
    "evidenceSnippets": [
      "因此,需要建立销售能力画像系统,基于5大能力维度(基础销售能力、专业度、共情能力、系统使用能力、细节能力),在完成代练训练后生成能力画像,显示性格、适合的表达方式、销售特长、产品掌握能力,结合数字门店业绩数据,每月显示能力排行,帮助公司优胜劣汰。",
      "作为一名HR,我希望根据能力画像制定培训计划与晋升机制。",
      "`进入系统` → `查看个人能力画像` → `查看能力排行` → `查看能力趋势` → `查看培训建议` → `查看晋升建议` → `查看业绩关联`"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售能力画像系统-PRD",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0454",
    "title": "服务显性化培训模块-PRD",
    "sourceFile": "10-服务显性化培训模块-PRD.md",
    "relativePath": "流程清单/AI培训系统项目推进会/10-服务显性化培训模块-PRD.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "客户接待闭环",
      "客诉处理"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-15T08:47:24.136Z",
    "charCount": 5903,
    "evidenceSnippets": [
      "`进入系统` → `学习服务标准` → `学习价格门槛激活的福利` → `学习钩子使用方法` → `模拟场景训练` → `完成考核` → `生成服务能力评分`",
      "**模块目标**:培训非价格类增值服务,提高溢价能力,避免价格战,让销售掌握钩子(价格门槛激活的福利),提高客单价与客户满意度。",
      "**缺少非价格类增值服务**:非价格类的增值服务未在培训中体现,销售不知道如何通过服务而非价格打动客户;"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：服务显性化培训模块-PRD",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "designer"
      ]
    }
  },
  {
    "id": "lk-0455",
    "title": "README",
    "sourceFile": "README.md",
    "relativePath": "流程清单/AI培训系统项目推进会/README.md",
    "sourceKind": "process_document",
    "learnerRoles": [
      "sales",
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "社群SOP",
      "报价推进",
      "指标异常判断",
      "需求挖掘",
      "会审协同"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-15T08:48:20.840Z",
    "charCount": 3882,
    "evidenceSnippets": [
      "2. **功能模块大纲**:将线下培训、代练、设计师协同、社群运营等经验转化为可线上化的功能模块。",
      "4. **社群数据看板**:可视化推进小区运营,提高社群管理效率。",
      "原因:这7个模块直接覆盖\"培训代练→设计师协同→知识赋能→社群运营→能力评估→服务增值\"的完整最小闭环,能有效将培养周期从3个月压缩至1个月。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：README",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "designer"
      ]
    }
  },
  {
    "id": "lk-0456",
    "title": "门店管理与销售团队培养策略访谈",
    "sourceFile": "门店管理与销售团队培养策略访谈.txt",
    "relativePath": "门店管理与销售团队培养策略访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "报价推进",
      "需求挖掘",
      "客户接待闭环",
      "转化复盘",
      "高客单成交",
      "小红书获客"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.095Z",
    "charCount": 16051,
    "evidenceSnippets": [
      "问现场情况如何解决，然后他的一些痛点，现场印章如何改造，然后价格从来都不问我，我的客户很少问我，而且你自己做什么的，我的视频号这些人他都知道我干什么。然后就会问你一些专业性的问题，我能答得上来，所以他就会一直跟我聊。有些销售他无法约到客户来，是因为你不专业。别人跟你说的，你你比如说别人问你一些问题，你只能含糊其辞的回答，尤其是你不懂？然后你过一段时间自己又没话题去找他用各种各样的活动去邀约他，你都根本不知道人家想干嘛，你就上来就叫别人来",
      "对，那就是要么就是转，就是在选品牌的情况下的客户，或者说是价格问题的客户，就这两种。大部分就是个一个是选我们，或者说不需要我们，或者说想学我们价格贵。如果是价格问题的话，你看如果是真正低价位的小区，还对我们本身就是有一种心态，就是我们价格会高的情况下，你破冰的话，你就是先讲一些我们已经落地的跟它类似的户型，准确无误的一些价格，让他真正了解我们拉米每一项东西是多少钱。这样子的话，他的心态其实就会放平。",
      "然后你自己这块又特别专业，那他就比较认可你，然后也很容易找到了，他就觉得你还是蛮好沟通的一个人，就是你要让对方知道他好跟你沟通。本身高知高领域高净值的客户，他面对的人群就比我们这些做全屋定制的人群的认知要高，沟通的能力也要强。那你如果磕磕巴巴，你又半天还要让他教你，还要干嘛找你干嘛？你又不能替他说他出来找的意义在哪里呢？他也没有时间去教会你什么。所以这个时候一定要够专业，要够快速摸清楚他真正的需求。价格就不要去弄了，因为他不缺钱。对。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：门店管理与销售团队培养策略访谈",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0457",
    "title": "门店管理与销售团队培养实践",
    "sourceFile": "门店管理与销售团队培养实践.txt",
    "relativePath": "门店管理与销售团队培养实践.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "ops_manager"
    ],
    "competencyTags": [
      "小红书获客",
      "指标异常判断",
      "报价推进",
      "非标下单底线",
      "资源开拓",
      "审单防错"
    ],
    "sceneTags": [
      "客户首次进店",
      "客户追问价格",
      "新人入门考核",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.027Z",
    "charCount": 25364,
    "evidenceSnippets": [
      "这是一个今天接待的问题，还有一个在我们接待过程当中，可能成交完以后的话，那我们可能还有长这个时间的一个跟单跟单，过程也是很复杂的。第一你要出报价，你要出图纸，出来以后还要邀约客户。客户邀约进店的话，对完方案以后，客户可能会觉得你这个方案上面有偏差，那可能还会再去更改。更改完以后的话，我们还有个报价对吧？那客户可能第一时间觉得你的报价跟你的价格是匹配的那这个客户就很好用。如果是说你的价格跟你的设计不匹配的情况下，那客户就会质疑你的设计能力",
      "那这个群他可以分一层、二层、三层都没有关系，只要有人就有订单，所以我就不停的鼓励他们，让他们去拉群，然后开发QC，然后这些KOC第一从我们的老客户上去挖，还有一种就是从小红书上去挖，还有一些就是我们进店的意向客户身上去挖。挖完以后的话可以进一步的沟通，能否帮我们去挖掘拉群，我再去申请样板间，然后这一些有群有样板间，我都会相应的有奖励。建一个群我会给你多少钱？然后我们这边的话拉一个POC我会给你多少钱？就是以前获得奖励还有鼓励的方式，让他",
      "经过我们一系列的一个劝解邀约进店，然后让当时这个发小红书的这个销售当面跟他道了歉，送了礼品，这个事情平息了。没有任何问题。然后在安装的时候出现什么样的一个问题呢？我们工人到他家里去装的时候，客户觉得我们工人不太专业。然后当时这个小区它是有毛细的，然后打完毛细就给他毛细打坏掉，就是唯一的一家给他毛线打坏掉了。那我们所有的都没有打坏掉，就他一家打坏掉了。"
    ],
    "generatedTask": {
      "courseTitle": "小红书获客：门店管理与销售团队培养实践",
      "practicePrompt": "围绕“客户首次进店”，让学员用自己的话完成一次小红书获客表达。",
      "assessmentFocus": "检查学员是否能说清小红书获客的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0458",
    "title": "门店管理与新人培养运营实践访谈",
    "sourceFile": "门店管理与新人培养运营实践访谈.txt",
    "relativePath": "门店管理与新人培养运营实践访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "新人培养与考核",
      "资源开拓",
      "小红书获客",
      "指标异常判断",
      "社群SOP",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "订单下单前",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.066Z",
    "charCount": 13782,
    "evidenceSnippets": [
      "更多的可能就是如果说是新人进来的话，可能前面的话我会听他们谈谈单子，然后我再会给他们建议，然后我也会带着他们去谈一个客户。在这个过程当中，其实我是没有做过销售的那对于对于后面的报价各方面其实更多的是带教师傅在教。我前期我可能是教他们怎么样，第一个怎么样去接待客户，就包括怎么样给客户介绍去必定然后我们到什么节点，对，就是关于这些内容。然后再就是关于怎么样去比如说怎么样去开拓客户，这也会去教他们。然后再就是比如说在日常当中我们经常用到的一些",
      "你能不能约约到客户，或者说你能不能添加通过客户的微信。就比如说我们里面这个小区有100个人，对你通过这次运营，你加了你前面你一个微信都没加。那你这次通过运营加了50个微信，那你这次运营就是成功的对吧？那如果说你然后再比如说你通过1次方案的直播，你能够邀约到一个两个客户成功的进店，吸引到这个客户成功的进店，那你也是成功的对。因为你的群基数，因为我们的基数都不是特别大，不是说几十万几百万的粉丝量这种我们群里面就100个客户，100个客户里面",
      "会告诉他们怎么比如说这个客户，比如说你添加微信了，你应该怎么样去跟这个客户聊。比如说那就假设有一个我们拿我们店的一个群，比如说静安天悦这个群，那我怎么比如说他今天告诉我他通过了多少个微信，那我会告诉他，第一步我们先把我们今天运营的内容再私发一遍给业主。然后如果说我们留了钩子，比如说我们今天分享的勘探，那我们可能视频和VR我们是没有发到群里的。那么你就私发给业主，你问他是第一个，问他是哪一栋，问他是哪个户型，让他开口先跟你聊，然后再告诉他"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：门店管理与新人培养运营实践访谈",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0459",
    "title": "门店运营管理与数据可视化需求访谈",
    "sourceFile": "门店运营管理与数据可视化需求访谈.txt",
    "relativePath": "门店运营管理与数据可视化需求访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "需求挖掘",
      "资源开拓",
      "社群SOP",
      "小红书获客",
      "转化复盘"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.092Z",
    "charCount": 6317,
    "evidenceSnippets": [
      "现在是这样的，我们每天的接待数接待数、加微数、签单数、收款数，其实我每天我都要单独去汇总一遍的。如果说每天给我形成这样的一个看板的话，我就知道今天我们进店有多少，我的转化，我的成交率是多少。如果说我今天对了5波方案，一笔款都没有收上来，那这个就是预警状态了。就是我需要有一个这样的明确的数据。",
      "我觉得这个距离的话是这样子的。如果说我们有一个专门一个人负责门店所有的群的一个运维的话，会好很多。有一个对所有楼盘，就是我们在座的楼盘非常熟悉的这种，然后可以有对应的去进行一些获客的渠道，再到店里面来。为什么？因为现在你要全员所有人所有的小区都去做，其实是做不好的，是比较乱的。这个人如果他要是没有去过现场的话，他对现场的情况他。",
      "其实这个数据的话加微通过，这是看人员配合度的对，这个是有必要的。然后签单数的话其实也很重要，为什么？因为这个数据的话，我可以通过我签单的这些客户，我去发展KOC，去发展样板间。这个对于门店的业绩肯定是有影响的。如果没有数据，我是看不到我想要的种子客户和样板间客户的。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：门店运营管理与数据可视化需求访谈",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0460",
    "title": "全屋定制销售技巧与新人培训",
    "sourceFile": "全屋定制销售技巧与新人培训.txt",
    "relativePath": "全屋定制销售技巧与新人培训.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "板材产品解释",
      "非标下单底线",
      "客诉处理"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店",
      "客户方案会审"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:39.972Z",
    "charCount": 31978,
    "evidenceSnippets": [
      "然后这个点第二个我们就是我们工厂在上海，我们的安装团队都是自营的。然后我们能够在上海五十几家门店能够开起来，包括我们的落地安装有很多户。其实你买到的品价格像你一般倾向在上海基本上小泽差不多。买我们的产品的客户群体是基本上四五百万最低了，房价到差不多几千万的那价格贵的话，这种小户型基本上按照他们的装修比例来，基本上我们是按照20%的一个装修比例。精装修就是硬装、软装会跟他们分析这种价格你值不值得。因为你每每年的那个比如说我11百平，我最基",
      "通过这些跟客户的互动，就是可以以提问式的跟客户互动来看一下客户的具体的需求，然后判断客户的重点，同时也可以判断一下客户今天来是他一个人随便看看，还是他是主要的决策的人员，然后还是说是先生是比较忙的，但是先生也要参与的，他前期去打样的。因为在这个过程当中了解透了之后，才知道我们接下来怎么样的动作。以比第二个就是怎么样对方案是怎么样的一个形式邀约能够预付，成功率比较高。然后接待的刚刚说接待的场景那个黄金30秒，30秒的就是一定是要让他坐下来",
      "然后的话他们犹豫型的话其实一个是对价格敏感。第二个他对环保，第三个他对那个就是我们的售后安装。一般是你看一下大客户不会跟你说我留不留钱，基本上只有小客小众客户他会问你，你们留不留尾款，要全款清才下单，那万一你们跑了怎么办？都会问这种问题。对，所以就是这些客户的话，他前期的顾虑这些点就是我们这种的公司的模式。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：全屋定制销售技巧与新人培训",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0461",
    "title": "设计部门工作内容及培训讨论",
    "sourceFile": "设计部门工作内容及培训讨论.txt",
    "relativePath": "设计部门工作内容及培训讨论.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "非标下单底线",
      "量尺出图",
      "岗位边界",
      "审单防错",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "订单下单前",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.057Z",
    "charCount": 2916,
    "evidenceSnippets": [
      "音频围绕设计部门相关工作展开，包括设计经验、组织架构、与销售及产品部门的配合、效果图出图时长、设计师能力评判、培训体系、审单机制等内容，旨在提升设计工作效率和质量，更好地满足客户需求，内容如下：",
      "设计规范负责人：负责输出公司设计规范，目前在做基础类设计规范，如板件使用规范尺寸、面板上下标准流控等，计划本月 10 号开始培训，并纳入商学院新人培训。",
      "门店设计师优势：擅长把控细节尺寸下单、工艺及适配模块化生产链和三维加工工厂系统化，在标准化、系统化下单和设计方面表现出色。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计部门工作内容及培训讨论",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0462",
    "title": "设计师方案讲解与客户需求把控访谈",
    "sourceFile": "设计师方案讲解与客户需求把控访谈.txt",
    "relativePath": "设计师方案讲解与客户需求把控访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "需求挖掘",
      "报价推进",
      "非标下单底线",
      "量尺出图",
      "会审协同"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.037Z",
    "charCount": 8749,
    "evidenceSnippets": [
      "整体价格预算控下来之后期，他定制下来就比较好一点。就比如说这个客户整个设计做下来了之后，不管是颜色还是什么，都都是在他的一个喜欢的一个范围内。然后预算也在，哪怕他这个客户同时是在金牌不好多年。都行。然后后面他就说了，他说看了别家就是直接这种。总体说对需求，你你你一定是跟销售配合好一个需求，一个就是。",
      "我就拿我最近的一个要下单的一个单子，这个女业主是属于非常健忘的那一种。我们第一次对单，第二次对单，我们甚至已经对了四遍单子。然后第四遍他是过来买单，买单的时候我就问他需求跟上一次有没有什么变化，他很茫然的就跟我说一句没有变化。最后等到我把尺寸什么都给他的时候，他开始一个个又要调整。",
      "记录完了之后，他就晚上直接过来。整理出来他的一个需求，他的一个1.1块表的一个需求。他每个人包括图上写的东西都很明确，业主喜欢的板材颜色是吗？包括我们后期沟通方案的话，他也是全部都整理下来。他整理下来之后，业主的一些需求就是直接我自己对接了。我对接完需求之后，我会提前有时候太忙的话，给的报价不是很及时，就是发给他300家文件，让他报价不是很及时，但是也不是太影响。然后我们但是有一点，就是我弄完了之后，我一定会跟他进行一个，就是我跟他哪怕"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：设计师方案讲解与客户需求把控访谈",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0463",
    "title": "设计师方案讲解与销售配合经验",
    "sourceFile": "设计师方案讲解与销售配合经验.txt",
    "relativePath": "设计师方案讲解与销售配合经验.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "会审协同",
      "设计方案讲解",
      "板材产品解释",
      "需求挖掘",
      "五金场景讲解",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.631Z",
    "charCount": 5978,
    "evidenceSnippets": [
      "那如果是这样的，因为我们有一个方案会审，对不对？那如果有一个这样的一个形式，你把你的方案放进去，然后就是你的客户信息，画像都放在里面对吧？然后他会模拟1次方案讲解。比如说有刚才有讲到床的问题，对不对？然后这里出现就是我的柜子做好了，坐在主卧，但是客户自己买的床我应该注意什么？他提醒你应该通过什么样的话术去收集客户的一个床品尺寸之类的这样的一个功能。觉得怎么样？因为这需要给你画这个情况，首先需要你告诉他你遇到了什么情况。",
      "首先要跟客户跟销售了解一下客户的情况，我们肯定要把客户的需求对接明确。我们现在方案会审也是主要是抓住这一点。会上我们要了解客户的需求，然后我们综合一下就看看有没有出入。我们会审完之后，如果双方都比较觉得比较配合，比较符合客户的需求，然后我们再把那个方案继续深化，用效果图的形式来表现出来，就是沟通方案前的准备工作。然后再做做好那个PPT.",
      "就比如说我这个客户说要改我的方案，我的方案只是其中一个板材颜色没有做对，然后他现在要把全部方案改了。那么这个时候我应该怎么客户说就更符合逻辑一点或者更合理一点，然后他就会给你相应的一些意见。对。"
    ],
    "generatedTask": {
      "courseTitle": "会审协同：设计师方案讲解与销售配合经验",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次会审协同表达。",
      "assessmentFocus": "检查学员是否能说清会审协同的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0464",
    "title": "设计师方案讲解准备与临场发挥",
    "sourceFile": "设计师方案讲解准备与临场发挥.txt",
    "relativePath": "设计师方案讲解准备与临场发挥.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "需求挖掘",
      "客户接待闭环",
      "非标下单底线",
      "指标异常判断",
      "报价推进"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-14T09:17:40.052Z",
    "charCount": 16253,
    "evidenceSnippets": [
      "好的方案讲解包含哪些核心要素？首先你的图要你的效果图要足够有吸引力力，对不对？然后的话你做这个方案的时候，你就要可能要构思好一些设计的一些小巧思，这样子到时候讲方案的时候就可以给客户讲你的一些理念。你比如说你一些设计手法上面的，或者是一些材质上的，运用他们家的一个功能动线这方面的一些思路，提前要的构思，这样的话客户会更好的为你不舒服。对，可能客户原本的想法是这样的，但是你一旦是有一些比如说相对来说更合说法的话，其实客户是很会信服你的。",
      "你不能一味的拿套餐这个点去吸引客户，那这个客户上来就是已经是被客这个套餐给吸引的那你这个方案他会认为你所有的方案做出来的都是可以以套餐。可能他理解不透彻，他就觉得大概的单价都是在这。其实我们做到最后，你做的再好看，价格一拉，比如说拉出来18万，客户说我的预算只有十三四万，那你这三四万就卡住了。对，而且这18万还是套餐做完的一个这种情况。所以说我觉得套餐不应该是在第一时间去跟客户讲，只能说我们先把风格介绍差不多了，或者说我们家的所有的一些",
      "客户说一个点，他能反馈三个点，客户就觉得他想法挺多挺好。有些时候现场就能把方案搞定改好，就必须要再二次进店。第一次就能时间足够的情况下就可以直接确认预算，然后该预付把这个效率给提高形成发挥。然后就是对软件的熟悉度，讲的好不好，那你你也算是临场发挥还是怎样？就是软件熟不熟悉，柜子怎么画，怎么样的一个结构。客户如果说不理解我们刚说的一些点，因为客户他是外行的。那我们可以通过我们软件展示，这个后期是门这么开乱开，看一下模型客户肯定会很清楚。那"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：设计师方案讲解准备与临场发挥",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0465",
    "title": "设计师工作方法与客户沟通技巧访谈",
    "sourceFile": "设计师工作方法与客户沟通技巧访谈.txt",
    "relativePath": "设计师工作方法与客户沟通技巧访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "量尺出图",
      "客诉处理",
      "社群SOP",
      "审单防错"
    ],
    "sceneTags": [
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.039Z",
    "charCount": 8393,
    "evidenceSnippets": [
      "我们在这个呃精准把握需求的这个方式就是抛意向图，去让他反馈设计意见给我们我们去采集他的这个喜好偏好和需求，然后再给他再融入到我自己自己的这个方案里面，这是一个解决方案。是的，行。然后就是我们设计师日常有考核的一些标准，或者是绩效，或者是效果图的一个质量，还有出图周期，这些有考核标准吗？",
      "从刚开始，刚开始对接需求的时候，他能给我对接的比较明确了，相对来说比较明确了。因为有的客户他是直接跟销售对完之后，我们这边就是直接出出图。但有的是他对完一遍之后，我还要在线上对一遍。这种的在可能我就直接跟客户说了，但是有的就没办法出错题，销售对完就直接到我这儿了。直接到我这儿的话，那我就需要他们。我们现在有店里销售，他会标注很清楚，然后把效果图就是现场跟客户，他不是跟客户聊过，他把客户想意向效果图会发给我，然后会跟我讲的会比较细一点，这",
      "就在这一个客户的时候，对，会粘在一起。然后核心职责其实你这边更多的是依赖销售这边初步的一个人画像给你的一个反馈。如果他不能给你好的反馈，还需要自己二次的一个沟通和去深入了解。然后销售这边在后期也有一定的一个就是在前面我们都是按照常规的我们合理的这个工作内容去执行的时候，在后期现场售后或者是一些有些小问题的时候，销售是可以主动介入去陪伴你解决这个问题的。就不分听的，不分值得说并我可以这样问吗？就是是有需求还是觉得应该其实。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师工作方法与客户沟通技巧访谈",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0466",
    "title": "设计师工作日常与AI培训系统讨论",
    "sourceFile": "设计师工作日常与AI培训系统讨论.txt",
    "relativePath": "设计师工作日常与AI培训系统讨论.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "设计方案讲解",
      "量尺出图",
      "需求挖掘",
      "非标下单底线",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户方案会审",
      "新人入门考核",
      "订单下单前",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.075Z",
    "charCount": 9400,
    "evidenceSnippets": [
      "对，只要客户能够搞定这个问题，我觉得AI发展的最终趋势，设计师最终的抉择就是下单元，就是和测量员。如果测量员还不一定有存在的意义，下单元或许还有存在的可能性。当然如果说随着这个AI技术越来越发展成熟之后，那都不需要下单元了。他客户直接把尺寸宽高深填进去，AI生成一个效果图，客户觉得ok付钱，那AI直接按照这个比例自动生成软件参数都可以。对，那如果说全靠这个去发展，那实际是没有活路的。对，那那如果说我们通过AI去汇总这些东西，那我干脆直接",
      "好的方案讲解的话，首先第一就是说你要沟通，我觉得三分靠图，七分靠讲。怎么样让客户理解你的设计思路，然后包括像前期跟客户对需求。因为现在我们做基本上以团购小区为主。团购小区的话其实现在户型都都千篇一律，无非就是满足客户的痛点，来解决客户的痛点，满足客户的需求。",
      "的对第二点的话，既然有这个功能，为什么不让AI直接出图给客户看呢？这既然风格都已经统一了，那说明AI它是不是已经有一个形成自己的观点。他形成自己的观点，他直接把这土地给客户得了。那我们其实不需要设计师，我们我觉得这一行发展到最后，就是像那些大品牌，那些模块化的定制。像什么宜家那种有小程序上面让客户自己选，设计师只需要负责量尺下单就OK了，甚至后面量尺都可以让客户自己量尺。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师工作日常与AI培训系统讨论",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0467",
    "title": "设计师客户沟通与销售协作技巧访谈",
    "sourceFile": "设计师客户沟通与销售协作技巧访谈.txt",
    "relativePath": "设计师客户沟通与销售协作技巧访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "岗位边界",
      "报价推进",
      "新人培养与考核",
      "需求挖掘",
      "非标下单底线",
      "客诉处理"
    ],
    "sceneTags": [
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.082Z",
    "charCount": 12668,
    "evidenceSnippets": [
      "对他主要其实是售后。因为贵的有一部分原因是工艺，有一部分是售后安装。就这些问题就是你能给他保证他的落地，保证他的售后。其实有大部分客户就已经打通了，但是有些预算确实有限的。",
      "一个这个的话一般其实前期的话，你就先对你态度一定要诚恳，可能有些线上或者线下的那种客户过来了，如果线下客户过来了，你就稍微沉一点。您觉得哪一部分你是不满意，还是说你整个颜色搭配，就是你要问到点上，是他对你的效果是哪一部分不满意？因为他不可能说已经跟你沟通过一遍需求了。如果说他对你的框架是不满意的，就满意的框架是满意。但是他对你的颜色搭配上或者让他不满意，那你就知道你这个点了。你就跟他说，那我这边我再重新调整一下，就是你再跟他详细的再研究",
      "其实是有应对方法，对吧？有。那设计师和销售如何配合才能提高客户的转化率？就在客户对接、需求传递出单环节，各自的核心职责是什么？"
    ],
    "generatedTask": {
      "courseTitle": "岗位边界：设计师客户沟通与销售协作技巧访谈",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次岗位边界表达。",
      "assessmentFocus": "检查学员是否能说清岗位边界的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0468",
    "title": "设计师培训体系与AI辅助需求访谈",
    "sourceFile": "设计师培训体系与AI辅助需求访谈.txt",
    "relativePath": "设计师培训体系与AI辅助需求访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "需求挖掘",
      "转化复盘",
      "指标异常判断",
      "非标下单底线",
      "小红书获客"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-16T01:59:23.982Z",
    "charCount": 15520,
    "evidenceSnippets": [
      "好的，那么我们这个淘汰机制它分为两部分。一部分就是我们培训期间，我们会针对新人的表现，以及他们的整体的一个状态。就类似于首先就是对于他们的一个产品吸收的一个速度，他们的一个考试成绩，这是一方面。其次就是他们整体在我们这个学习过程中，我们会有一些针对于比较专业的一些问题。就比如说我们会去针对他以前下单的一些案例的分享等等，去判断他是否有足够的设计经验，能够担任我们这个职位。是这样的，其次就是我们下店之后的一个数据的考核，就是我们新人三个月",
      "在门店大部分他可能会有两种原因。一种原因就是首先他下定之后，因为我们在培训阶段，他可能只是比较浅显的一些能力的观察。就比如说刚刚我们所说的产品真正的吸收，以及我们这个软件它的一个操作能力对吧？以及简单的这种沟通，它是否能达到一个我们的设计师的标准。但是下线之后，他可能就是属于实战，然后他会去直接面对客户，以及他做方案的能力。然后我们的这个设计师就是设计总监，他们会整体的去把握，他们整体把握他可能在这个工作的过程中发现了他的谈判能力可能有",
      "培训之后，我们可能需要去做一些类似于新人的跟进。然后跟进他们下跌之后的一个状态，以及他们的一个数据。就是他们的业绩，然后他们接多少单，让他们有多少收款等等这些。然后在这个数据分析的过程中去判断他们哪里出现了问题，需要什么样的帮助。目前就是这个样子。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师培训体系与AI辅助需求访谈",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0469",
    "title": "设计师团队管理与销售协作流程",
    "sourceFile": "设计师团队管理与销售协作流程.txt",
    "relativePath": "设计师团队管理与销售协作流程.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "岗位边界",
      "需求挖掘",
      "量尺出图",
      "设计方案讲解",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "社群运营推进",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-14T09:17:39.981Z",
    "charCount": 30923,
    "evidenceSnippets": [
      "像这种直接拿到户前出方案的是先沟通去，那还有的就是测量，先去工地去测量，然后现场和客户对接需求，然后回到门店就图就是出图的过程中可能会做很多不同，就是AB的方案，然后就是要跟客户对比，然后就是下单买单后就会下单，主要就是重点的可能就是这几个。然后可能还会夹杂一些客户的一些群内的回复等出一些疑问，其实这个也是很耗费时间的，回复客户的这个信息。",
      "然后在销售会在旁边记录一下客户在过程中需要修改的点，就是我已经讲客户提出问题点他会记下来。我们有一个是需求记录的一个等，然后的话调完以后的话，就看有没有大方向没有改动的话，我们就直接给他一个报价，报价看看对预算怎么样，然后看你有没有需要调整的。然后的话就是嗯大应付，就是我跟他聊完之后，都整体比较满意的话，就会提到孕妇这件事儿。以后客户也OK的话，其实整个病房人数差不多是这样子。然后去群里的一些跟进促使下单什么的。",
      "在这样子的客户对话的过程当中，我一般都是我会提前说对吧？我说那好比说你的预算范围会在多少，然后他因为他是不清楚风格，他也没看到方案，所以价格提前说对他来说很容易不是很大。但是这话说以后是为了后面的铺垫，就是好比说我现在做了二十几万，这个是基于什么样的一个条件下可以做出来的。然后如果他喜欢，其实这个价格很好谈，我觉得就加，然后这样子就提高客单值就很有必要。如果说他这个地方就是框死死的，我就只做这么多的那你在对需求的过程当中，或者复合需求的"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：设计师团队管理与销售协作流程",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0470",
    "title": "设计师销售配合与方案讲解经验",
    "sourceFile": "设计师销售配合与方案讲解经验.txt",
    "relativePath": "设计师销售配合与方案讲解经验.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "设计方案讲解",
      "会审协同",
      "报价推进",
      "需求挖掘",
      "转化复盘",
      "非标下单底线"
    ],
    "sceneTags": [
      "客户追问价格",
      "客户方案会审",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "medium",
    "sourceUpdatedAt": "2026-04-14T09:15:45.654Z",
    "charCount": 11769,
    "evidenceSnippets": [
      "结果我发现设计师对用户的这种心态、需求捕捉，其实会比销售人员可能更细腻一些。销售员可能对他的一些基础的户型房型或者生活状态能了解到，但是他真正的去还是在设计师这一块。所以刚才听到何畅讲的那个案例，你自己的是跟业主沟通完之后，讲完方案再承担道路。然后想听一下你在给这类客户在讲方案的过程中，那个方案讲解环节有哪些好的经验或者。",
      "所以像您刚才提到一个很关键的研究方案讲解中关于他的生活习惯、动线，还有这些细节的讲解。我们在刚才看到那个樊总监樊老师那里给我们看了一个样样品。就刚才讲的他的样片里面也很细致，包括了整个初始的需求沟通，包含了基本的户型图，再包含了标注好的需求，然后后面还有一大堆的效果图。但是这个是纯展示的效果，并没有您刚才说的那些讲解过没有那些贡献。有哪些精细的设计，这些设计细节完全是靠你在讲话的时候点出来的，没有在PPT里呈现。",
      "然后在销售会在旁边记录一下客户在过程中需要修改的点，就是我一边讲客户提出的一些点，接下来我们有一个是需求记录的一个本子。然后的话就有没有大方向没有改动的话，我们就直接给他一个报价，报价看一下怎么样，然后看看有没有需要调整的。然后的话就是大于负，就是跟他聊，他如果都整体比较满意的话，就会停下来预付这件事儿。然后客户也OK的话，整个订单就差不多是这样子。然后去群里的一些跟下单什么的。"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：设计师销售配合与方案讲解经验",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0471",
    "title": "设计师转销售新人痛点访谈",
    "sourceFile": "设计师转销售新人痛点访谈.txt",
    "relativePath": "设计师转销售新人痛点访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer",
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "客户接待闭环"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户追问价格",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.053Z",
    "charCount": 3686,
    "evidenceSnippets": [
      "大差不差。因为像有一些别墅的客户，他们来的时候不会主动说自己是做别墅的。但是可能通过他们的服装以及他们在参观展厅，他们可能不说话。但是他们去去看什么东西的时候，他会在某一些比较特殊的地。比如说像那种像去逛万里展厅的时候，他们就会对这些比较有吸引力一点。然后看平板他们就没有什么太大感觉。像这种客户的话，我他就会稍微偏高端一点，他预算就会偏高一点。然后像有一些客户他来了，他就说这些我就没想看我就想看正常版式的，以及上来就一直在问价格的比较多",
      "就是我是对这些产品是有大概的一些概念的，就是价格虽然我不清楚具体的价格，但是我是知道大概一个区间的。这些还不太算问题，除非一些特别贵，就是一些金属系统的那些可能对也是对价格就是正常的这些就还好。",
      "就是我们品牌的这个定位的话，它就是偏这种中高端的。然后跟一些你觉得贵肯定是有对比，跟那些一些价格比较低一点的品牌去对比的话，本来他那个板材的材质就不一样，用的五金也不一样。然后再加上体系的问题，外面可能现在大部分都是一些加盟商什么之类的，可能外面市场本来价格就比较乱，然后我们又是直营的，价格就是很透明。然后直营的话就像我们我们的服务，包括安装，落地效果这些很多东西它都是跟一些价格低的，他样样的。因为像这种定制东西，它又不是成品类的东西，"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：设计师转销售新人痛点访谈",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer",
        "sales"
      ]
    }
  },
  {
    "id": "lk-0472",
    "title": "设计总监团队管理与方案讲解",
    "sourceFile": "设计总监团队管理与方案讲解.txt",
    "relativePath": "设计总监团队管理与方案讲解.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "报价推进",
      "需求挖掘",
      "非标下单底线",
      "量尺出图",
      "高客单成交"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "新人入门考核",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.650Z",
    "charCount": 15936,
    "evidenceSnippets": [
      "主要的话是第一个就是接店的订单，然后订单就是线上沟通需求和一直在线上再明确一下这个户型图来进行微改，然后具体的一些需求，收纳的需求，包括风格，然后沟通完了以后，可能就是像这种直接拿到户型出方案的是先。是测量先去工地去测量，然后现场和客户对接去，然后回到门店主要是图，就是出图的过程中可能会做很多不同，就是AB的方案，然后就是邀约客户对方案，然后就是下单。买单后就会下单，主要就是重点可能就是这，然后可能还会夹杂一些客户的一些群内的回复，有一",
      "都会有。对，就是可能销售在第一，他是第一接触这个客户的人，可能当时的客户他的反对于这个报价的反应，销售都是看在眼里的。他可能会觉得价格本来就是有点，比如说对比总量或者对比这种上品牌卖的销售，当时第一概念就是这个客户很卡预算，它的价格肯定要在国宝的这个预算范围内，他才能接受，才能去成交。那设计师不同的感觉，他觉得我这个方案这样子做是最好的。如果你要将这两个预算做出来的方案，用企业和别的小品牌对比方案是一样，只是我们的反馈更好而已。可能会。",
      "然后我们是会一边放PPT1边去打开我们三位家，去对一些细节的尺寸，客户也比较精细的。比如说床可以放到，那我可能就在打开三个家去跟他去对这些模块的一些细节。在讲解的过程中刚刚说到就是说我刚刚上上两位访谈教授说，因为我们在前期沟通需求的时候，我们肯定是要按照客户大致的这个需求去规划的。但是肯定有不够专就是可能不够专业，没有想到一些合理的地方的一些业主。那我们作为更专业的人，肯定是要去规避掉，能够去做两版方案或者是当场就做，就是以最合理的这个"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：设计总监团队管理与方案讲解",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0473",
    "title": "社区运营数据管理与团队协作流程",
    "sourceFile": "社区运营数据管理与团队协作流程.txt",
    "relativePath": "社区运营数据管理与团队协作流程.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP",
      "岗位边界",
      "资源开拓",
      "转化复盘",
      "小红书获客"
    ],
    "sceneTags": [
      "运营复盘看板",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.089Z",
    "charCount": 20949,
    "evidenceSnippets": [
      "对，然后每周需要统计的是什么呢？就要更新好，就是所在所负责的区域的那个这叫什么？就是它的一个小区的管理表，就2026年的小区管理表去做好什么更新呢？这个小区的社群人数的更新和签单数的一些更新，和QC的更新，和样板间的更新。这些数据是他们每周都要进行一个更新的，每周每个小区都要进行更新的。对，然后这是第二个每周需要去做的数据。",
      "对我们数据统计的话分每日都要统计和每每周统计和每月统计的不同的数据。每日统计是我们社区运营每日运营的内容，运营完了过后要统计他的一个群活跃数和社群的一个新增数，和销售的一个添加微信数。然后同时还要统计什么呢？这个小区的伙伴就是发了多少钱的红包和我们如果有直播的观看数，这是每日都要去统计的。",
      "销售去跟进数社群的数据更好的辅助销售其实是更好的让管理者清楚销售有哪些卡点在。他对，然后这是第一个。第二个的话是让销售也自己清楚。因为有时候销售他自己加了很多个微信，他自己都不知道，然后他就清楚，这个小区既然我家已经有三十多个客户了，对，让他清楚它的一个现在现有的数据和它现有的转化，它还有多少的可能性。然后让管理者清楚这个数据的目的是什么。它的转化率比较低，那我们就要进入去干预，看一下它的问题点在哪里，怎么去帮他去解决，提升它的一个转化"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：社区运营数据管理与团队协作流程",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0474",
    "title": "数字门店数据管理与派单流程痛点访谈",
    "sourceFile": "数字门店数据管理与派单流程痛点访谈.txt",
    "relativePath": "数字门店数据管理与派单流程痛点访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "ops_manager"
    ],
    "competencyTags": [
      "指标异常判断",
      "社群SOP"
    ],
    "sceneTags": [
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.090Z",
    "charCount": 1385,
    "evidenceSnippets": [
      "你比如说封池是我封的，对吧？我是在分水群里面去分的。分好了以后销售再派服务单给设计师，然后对应的设计师去做。但是现在数字门店上面呈现的测量数和对方案数，这些数据都不是很准，我也不知道这个怎么去实现。",
      "现在的数字门店上面有呈现，但是数据真实。为什么？因为销售没有派服务单，就派服务单的这个动作，只要销售不派设计师，这个就没有数据，这是目前的一个痛点，因为这是人为把控的。",
      "对，然后的话就是设计师我需要知道他一周量了几个尺，接了我几个词，就我风驰接了我几个词，然后改了多少套图画了多少套图，下了多少单。目前数字门店上设计师下单的这个数据我也对不上。"
    ],
    "generatedTask": {
      "courseTitle": "指标异常判断：数字门店数据管理与派单流程痛点访谈",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次指标异常判断表达。",
      "assessmentFocus": "检查学员是否能说清指标异常判断的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0475",
    "title": "销冠销售技巧与客户应对策略访谈",
    "sourceFile": "销冠销售技巧与客户应对策略访谈.txt",
    "relativePath": "销冠销售技巧与客户应对策略访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "转化复盘",
      "需求挖掘",
      "资源开拓",
      "客诉处理"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.071Z",
    "charCount": 10975,
    "evidenceSnippets": [
      "那那我们也有价格便宜的，就是看看你的一个整体需求。因为像你的话，你既然去看了博洛尼，那你肯定是对设计有一方面的要求的那如果说你对设计有要求的话，我们的东西材质也好，品质也好，都不会比博洛尼差。可能你看到我们的金属套盒，那也只有我们有，他们家是没有的那价格肯定会稍微贵一些的。如果说你想控制预算的话，到时候我们这边可以帮你价格往下面压一压，去给你做出来既有设计也有性价比的方案，让你去选择一下了解。",
      "现有的我们现有的体系里面是吗？对，现有的体系里面的话，基础的产品知识的话，基本上公司都已经培训好了。其实新人很多的话，报价也是一个重点。",
      "就是我们初期的话会就比方说设计师他会我们客户的话要求，一般我们是先接触客户的那我们会对客户的需求比较了解，然后设计师这样设计以后，我们可能觉得一是价格贵，二是这个设计的话并不是客户想要的。然后这个时候我们是想让他进行调整的那这个时候矛盾点就出来了。那我们设计师就会讲，现在客户又没有来，那你怎么知道我这个设计客户不就是说不喜欢呢？那可以按照我这个的设计先去。对，如果说客户不喜欢我再来改，是这样子。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：销冠销售技巧与客户应对策略访谈",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0476",
    "title": "销售访谈报价成交培训",
    "sourceFile": "销售访谈报价成交培训.txt",
    "relativePath": "销售访谈报价成交培训.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "新人培养与考核",
      "高客单成交",
      "非标下单底线",
      "转化复盘",
      "需求挖掘"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.034Z",
    "charCount": 25821,
    "evidenceSnippets": [
      "然后有一个单子是这样的，我记得当时那个小夫妻两个，其实他们小区的品质对我们来讲不是很高的。预算的话当时预算是十万多，但是后来在签单的时候，当时第一次来做下来是13万的，因为相对来讲已经超了两三万了。然后他就在想办法，我们本来做的那个方案里面是有一个颜色的跳色，小女孩黄颜色跳色。当时他在算报价的时候，他不知道，因为新人的设计宣传也有点对那个产品不是很熟，所以就画了一下。他做报价的时候就按那种比较便宜的做了，后来发现这个价格不对，他就非常的",
      "然后还有一个细节的问题，就是一个是销售的能力是两个维度。一个是订单量，订单数量就过更多的顾客。还有一个维度就是已经进来的这个客户是否能把这个客单价做高一点。这边就有一个小矛盾，这矛盾就是如果我们给他推荐了很符合他需求的东西，但是价格超出他预期了，可能就会丢单。如果我们一开始又报的这个预算，按照他预算做的一个方案，这个方案又不一定能匹配到他的生活的真正的需求。那在这个方出方案跟报价这个环节，还有在既保证成交的前提下，能尽量把客单量做大一点",
      "我当时成交第一单说实话真的不记得，因为当时承担很简单，就是说你只要我我们只要把产品折扣优惠跟他讲到，然后客户就很容易签单。有时候甚至客户都合同的时候都排队签单的。但是现在客户好像就不太太一样了，他们要求也比较多，然后对比也比较多。对，我们的首先是产品上面，颜值上面，还有很多也是价格上面。但是在客户来讲，他理解的性价比就是价格便宜。那我们要给客户灌输的可能就是要产品的价值之类的。所以说有的时候还是因为客户不同还是比较难的。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：销售访谈报价成交培训",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
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
    "id": "lk-0478",
    "title": "销售培训体系与新人培养",
    "sourceFile": "销售培训体系与新人培养.txt",
    "relativePath": "销售培训体系与新人培养.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "资源开拓",
      "报价推进",
      "指标异常判断",
      "小红书获客",
      "转化复盘"
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.012Z",
    "charCount": 12991,
    "evidenceSnippets": [
      "第三点就是新人销售可能下跌比较也不能说困难，那可能都是一个共性问题，那也是我们正在解决的问题，就是他们的一个拓客。拓客现在我们现在主要聚焦除了在进店外，还有小区团购，还有就是门店所有小区团购，还有他们自己去发小红书，加一页就主动拓客。因为有客资才会有签单这三块。但是真正说聚焦到关于课程的一个问题，可能就是说对于销售来讲，在下单板块型我们的型号太多了。因为现在销售不是说现在销售一下店，他可能第一周就签单了。现在如果是不是特别大的单子，两三",
      "因为我们讲的接待签单签单接待以及报价，都是基于你有客户的情情况下，你没有客源的资积累，你是没办法去做后面的东西的。就是你必须先有拓客的一个动作。拓客对于新来讲资源因为他们没有积累，不像我们老人有老客户，有一些商场的一些朋友。对于我们新人来讲，首先就说对于门店帮扶，他要把他拉进我们小区团购群里面，通过每次运营分客户给他。第二点就是那本商场的一页，我们有强烈硬性要求，会告诉他我们一页合作的福利。让他们刚下门店，就是从第一周开始，你就要去跟旁",
      "或者会对于新人的一个跟踪，他性能好不好肯定是数据去体现的。他有没有签单，也没有回款。那对于新人来讲，我们每一就自从他培训完了下店之后，每周二为我们这边专门的运营专员蒋文轩这边去拉取他们数据，每一周都会关注。因为我们第一个月限制下电，我们每周都会开复盘会，包括每周六每每周天销售培训老师他是要到门店的那到门店之后，就是周六周天上午不是特别忙的时候，那会去跟我们刚下店的新人去沟通。这两天就是问他下店的一个相关情况，以及周末有没有客户邀约的一个"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售培训体系与新人培养",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0479",
    "title": "销售培训系统项目推进会议",
    "sourceFile": "销售培训系统项目推进会议.txt",
    "relativePath": "销售培训系统项目推进会议.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "社群SOP",
      "转化复盘",
      "高客单成交",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-14T09:17:39.994Z",
    "charCount": 31179,
    "evidenceSnippets": [
      "然后第四个重点就是社区运营的整个数据化提效。因为现在随着门店越来越多，在推的活动小区也越来越多。我们通过微信群的方式来获取群聊的信息，来获取群里面的用户新增数量，来获取客服人员或者内部员工加入的人数的。通过的数量来形成一个社群运营的看板，帮助整个小这个活动更可视化的去推进。",
      "然后社群数据看板这个事情会交给IT的小伙伴。因为他是要对接大量的企业微信的一些数据接口，所以在业务上倒不是特别的难。对，这是目前的几个地图。我们还发现了一些比较好的价值点。比方说在四套系统，它解决的问题是多个维度的。所以我们发现促进拉米真正在营销转化这个环节并不是一个人的事。而是销售人员主管客情。销售人员会把设计师捧出来，把他的专业性给他捧出来，由设计人员在做专业性的讲解。",
      "拿这个语料库再加上我们现在沉淀下来的培训资料，形成这几个最关键的数据资产。一叫做销冠的话术库，第二个叫做客户的场景库，第三个叫做方案的案例库，第四个是销售的能力画像，一个评分规则。然后第五个是社群的舆情库。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：销售培训系统项目推进会议",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0480",
    "title": "销售人员工作流程与工具需求访谈",
    "sourceFile": "销售人员工作流程与工具需求访谈.txt",
    "relativePath": "销售人员工作流程与工具需求访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "需求挖掘",
      "指标异常判断",
      "社群SOP",
      "小红书获客",
      "转化复盘",
      "报价推进"
    ],
    "sceneTags": [
      "运营复盘看板",
      "客户追问价格",
      "社群运营推进",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.048Z",
    "charCount": 8610,
    "evidenceSnippets": [
      "那你觉得一个群的一个活跃度、转化率，还有一个客户的一个清单率的一个指标，你的你是怎么评判？",
      "因为我每天被，我不知道这个是不是你采访的范围。你可以说可以说我们的工作琐碎的东西太多了，就是导致我们的精力非常的分散，没有办法去把群运营好，没有办法去把自然进店的客户去服务好。我每天要做的工作，每周的户型研读，每天要填意向客户跟进表，每天要发小红书，这个小红书。对，然后以前的时候还要加一页，还有一颗仪表，还有就是小区收集每天的工作日报，还有什么来着？我都在我的那个电脑上面有贴，就是这些东西会占据我们销售大部分的时间。就是时间太分，精力太",
      "给你一个指标的话，你觉得大于百分之几或者是加了几个才算五个？五个3到5个。你这3到5个的话，这群人数大概在什么阶段到什么？如果3到5个人加你的话，那这个群大概人数在多少个才能算活月？"
    ],
    "generatedTask": {
      "courseTitle": "需求挖掘：销售人员工作流程与工具需求访谈",
      "practicePrompt": "围绕“运营复盘看板”，让学员用自己的话完成一次需求挖掘表达。",
      "assessmentFocus": "检查学员是否能说清需求挖掘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0481",
    "title": "销售社群运营与客户挖掘策略访谈",
    "sourceFile": "销售社群运营与客户挖掘策略访谈.txt",
    "relativePath": "销售社群运营与客户挖掘策略访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "community_ops"
    ],
    "competencyTags": [
      "社群SOP",
      "小红书获客",
      "转化复盘",
      "指标异常判断",
      "需求挖掘",
      "报价推进"
    ],
    "sceneTags": [
      "社群运营推进",
      "客户首次进店",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.063Z",
    "charCount": 9779,
    "evidenceSnippets": [
      "他们会找你比方说现在加微信的数据，订单的数据，邀约到店的数据，基本上就是这些数据了。",
      "其实他对他除了卡掉一个，可能他的预算真的是很你没办法的。基本上他这种的签单率就会很高。因为像他这种客户，他在网络上活跃度比较高，他也会搜各种的小红书，看各种的案例。然后他能到你这儿来，就说明他是对你有意向的，或者说对你这个。",
      "这些潜在的客户就是先去把这些先去把这个小区，就把我们这个群小区的一些资料了解清楚，然后客户比较关注的点，然后在群里面去再去跑一下他这个盘。所以现在我们引流或者说加微信的方式的话，基本上就是跑盘。就看一下客户现在的工地进度，然后我们再发一些话术，然后给客户，我们再去加他的微信，然后发一些他们小区的进度，资料，或者尺寸给到他，安利给到他，通过这种方式来去吸引流。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：销售社群运营与客户挖掘策略访谈",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "community_ops"
      ]
    }
  },
  {
    "id": "lk-0482",
    "title": "小区社群运营流程与数据管理",
    "sourceFile": "小区社群运营流程与数据管理.txt",
    "relativePath": "小区社群运营流程与数据管理.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "小红书获客",
      "转化复盘",
      "报价推进"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板",
      "客户追问价格"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "assessment"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:39.985Z",
    "charCount": 12018,
    "evidenceSnippets": [
      "我们活跃度的话？说实在的，社群的活跃度整体来说按照我们所想的肯定是活跃越活跃越好，但是都不会那么高。对我们验证这个群的一个优势更多的是一新增客户数，二是添加通过的客户的微信数，来去验证这个群的一个有效性和运营的这种结果。因为你想要通过，因为现在的客户都很忙，对他不可能天天守着这个板块跟你去互动。所以说互动数的话不是我们想象的那么高。但是我们大部分是通过添加客户，有新的客户加入一个群里面，这说明你的运营内容是吸引了部分客户的加入。第二个是",
      "这个会有点难，为什么呢？因为商品客户加了过后是要去跟踪的，另一个账号加了过后，他销售怎么去跟踪？对我们家的这个动作这个是可以做，但后续的推进就有点难了。对，因为我们是要邀约到店和转化的对，但是只不过是可能是打比方，我们运营的这种小区的社群会有一个主运营，就是我们俗称的小区的网红。这个网红的基本上他添加客户数的通过数量总和是比其他的人要高。对，但是没办法说是也是他一个人家。",
      "对我是希望有一个什么呢？就是这个小区这个门店的销售，他加了多少客户，对这个小区有多少客户，针对这个小区的客户，他的跟进的我们肯定会有对应的跟进的一个频率，想让他跟进几次，在时间上跟进几次。跟进了几次过后，像这种频率去表现出来的人都知道，因为门店的有店长和督导，他们会进行管控的对，那这个时候的话，希望这些数据能具象化去呈现出来，哪些人跟进的频次可能是异常的对，就能直接体现出来，这样子也好直接干预。因为他们现在的客户的话，手上的客户都还蛮多"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：小区社群运营流程与数据管理",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
      ]
    }
  },
  {
    "id": "lk-0483",
    "title": "小区社群运营流程与数据管理访谈",
    "sourceFile": "小区社群运营流程与数据管理访谈.txt",
    "relativePath": "小区社群运营流程与数据管理访谈.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "community_ops",
      "ops_manager"
    ],
    "competencyTags": [
      "社群SOP",
      "指标异常判断",
      "资源开拓",
      "转化复盘",
      "小红书获客",
      "需求挖掘"
    ],
    "sceneTags": [
      "社群运营推进",
      "运营复盘看板"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.068Z",
    "charCount": 11612,
    "evidenceSnippets": [
      "肯定有，有。第一个我们会对，就比如说你持续2到3周数据都低于平均值的。然后第二个我们制定比如说邀约活动，就是落地活动，还有邀约转化的这个阶段。我们制定目标的时候，肯定也是根据每个人现在手里现有的资源情况去做制定。你不可能是所有人都一个标准，明白。对，然后包括我们最后去，比如说最后有那个表格里最其实还应该有签的签单和邀约进店数。包括我们将来找样板间也好找，因为我们现在找样板间，第一个是在前期接待到客流的时候就介入，第二点就是在已签单的客户",
      "第一个是我们前期的小区群的社群开拓，然后要把基础群拉起来，基数要大于30人，然后包括中途的吸粉，就是它的基础盘的扩大，然后再加上它中期的运营，我们大概至少是保证在日看房前一年。对，大概是这个节点。然后我们把这个群要拉起来，拉起来人来以后要增加客户的粘性和我们的一些品牌内容的输出，以及我们日常的一些运营内容，要在社群里面去进行运营。然后再包括到日看房前，6到3到6个月之间是转化比较密集的一个时间节点。大家日看完前三个月是转化率最密集的。然",
      "然后接下来是样板间，对，就是到转化阶段。转化阶段就是他我们要做样板间的征集，以及我们那个样板间的方案，还有包括我们在社群里面要进行样板间的宣传。其实总的来说目前主要就是针对小区部分的一个开拓，然后吸粉以及转化。"
    ],
    "generatedTask": {
      "courseTitle": "社群SOP：小区社群运营流程与数据管理访谈",
      "practicePrompt": "围绕“社群运营推进”，让学员用自己的话完成一次社群SOP表达。",
      "assessmentFocus": "检查学员是否能说清社群SOP的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "community_ops",
        "ops_manager"
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
    "id": "lk-0485",
    "title": "新人设计师工作痛点与考核",
    "sourceFile": "新人设计师工作痛点与考核.txt",
    "relativePath": "新人设计师工作痛点与考核.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "非标下单底线",
      "设计方案讲解",
      "会审协同",
      "量尺出图",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.077Z",
    "charCount": 4723,
    "evidenceSnippets": [
      "是通的，不用销售在中间转，就转转达一下这种我觉得是配合好一点的。还有就是每个人的审美不一样，有时候方案会审的时候，销售也带着他的审美来审理的方案的时候，就会导致什么呢？还没见到客户，这个方案就已经要改。有的时候是改个饰品颜色，有时候是改了那个柜子，感觉这样设计感还不行，这个手法不行。所以这里这里的话可能是和销售配合不是太好的地方。配合好一点。",
      "对，我们每个方案会审录视频。录视频的话，我们方案会审的要求是，首先也是杨老师给我们定的要求，就是和台湾一样，先说这个客户的需求，他的生活场景，然后再到你在讲方案的逻辑，那个方案是为什么这样呈现这样子。",
      "方案提出质疑的吗？尺寸就是关于尺寸，比如说他的这个现在我们做的这些精装房，100平左右的，他们的这个卧室的尺寸其实都是比较小的。比较小的话他客户基本上会对于这些卧室的尺寸，我改完一张床之后，比如说我给他留的过道是300到400，并不是也就是我给他留这么多，而是他这个摆完床之后，他只有这么多了。可能会经常问他这个尺寸够不够啥的。对，就这一块。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人设计师工作痛点与考核",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0486",
    "title": "新人设计师工作痛点与考核2",
    "sourceFile": "新人设计师工作痛点与考核2.txt",
    "relativePath": "新人设计师工作痛点与考核2.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "非标下单底线",
      "设计方案讲解",
      "会审协同",
      "量尺出图",
      "需求挖掘"
    ],
    "sceneTags": [
      "新人入门考核",
      "客户方案会审",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.078Z",
    "charCount": 4723,
    "evidenceSnippets": [
      "是通的，不用销售在中间转，就转转达一下这种我觉得是配合好一点的。还有就是每个人的审美不一样，有时候方案会审的时候，销售也带着他的审美来审理的方案的时候，就会导致什么呢？还没见到客户，这个方案就已经要改。有的时候是改个饰品颜色，有时候是改了那个柜子，感觉这样设计感还不行，这个手法不行。所以这里这里的话可能是和销售配合不是太好的地方。配合好一点。",
      "对，我们每个方案会审录视频。录视频的话，我们方案会审的要求是，首先也是杨老师给我们定的要求，就是和台湾一样，先说这个客户的需求，他的生活场景，然后再到你在讲方案的逻辑，那个方案是为什么这样呈现这样子。",
      "方案提出质疑的吗？尺寸就是关于尺寸，比如说他的这个现在我们做的这些精装房，100平左右的，他们的这个卧室的尺寸其实都是比较小的。比较小的话他客户基本上会对于这些卧室的尺寸，我改完一张床之后，比如说我给他留的过道是300到400，并不是也就是我给他留这么多，而是他这个摆完床之后，他只有这么多了。可能会经常问他这个尺寸够不够啥的。对，就这一块。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人设计师工作痛点与考核2",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0487",
    "title": "新人销售成长痛点与销冠培养",
    "sourceFile": "新人销售成长痛点与销冠培养.txt",
    "relativePath": "新人销售成长痛点与销冠培养.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "资源开拓",
      "客户接待闭环",
      "非标下单底线",
      "需求挖掘"
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
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.009Z",
    "charCount": 9200,
    "evidenceSnippets": [
      "培训的时候我觉得第一个就是刚开始新人对于板材的材料，因为我们家很丰富，品类它是不能够学完之后完全记清楚的，就是分类就是板材的分类。第二个就是我们常卖的颜色。对，然后针对这个，因为在后期的过程当中，特别是在展厅介绍的环节，这个是至关重要的。那客户他会上来问你，这个是什么颜色？那个什么颜色对吧？那这个是就是他们会不知道。",
      "然后第二个的话，就是说在我们交完价格的时候，他们不能够快速的去，他们只能说是当下讲的能吸收，不能快速的去说举一反三。因为在户型不一样的同时，客户的需求是不一样的，所以出来的价格也是不一样的。所以在这个板块的话，价格还是需要在后期的过程中多去练习的。",
      "而且价格我们家的板块也很细，然后有各种各样的五金多少钱一个？板材多少一平方，对吧？拉手多少钱一个？像这个的话在前期培训的时候，他们不可能记得这么细。但是针对于客户来说，他会问的很细。所以这个板块我觉得对于新人来说，它也是需要不单单是在培训期间，他是要持续学习的一个部分。可能他一个月之内他才能够去完全对于我们常卖的产品的价格能够记得住。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人销售成长痛点与销冠培养",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0488",
    "title": "新人销售成长痛点与需求",
    "sourceFile": "新人销售成长痛点与需求.txt",
    "relativePath": "新人销售成长痛点与需求.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "需求挖掘",
      "板材产品解释",
      "转化复盘",
      "资源开拓"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:39.996Z",
    "charCount": 9270,
    "evidenceSnippets": [
      "从他讲话可以，你跟他聊天对吧？你比如说你给他介绍我们的纳米的品牌，你从一开始给他介绍的时候，就要把他的思想往高端上面去带。如果说他不缺钱，或者说他预算挺高的，他可能说没有什么反应，他可能说之前也了解过我们的价格什么的。那他如果说没有了解过，就单纯喜欢，觉得我们家板材做的不错，工艺也挺好的，看着比其他家好看。那你一跟他讲的时候，他说他就这样，那他肯定可能觉得有点贵，对吧？然后你再问一下他哪个小区的，你在小胖看房上面看一下它这个单价对吧，你",
      "有培训那时候刚开始，因为我是新人，然后他们是3月2号开始培训的，我是3月3号入职的，3月2号讲的都是很基础的。比如说铰链是什么，然后板材什么的，我们的生态澳松板是怎么制作的，这个流程包括这些我没听，所以导致于后面我听的时候可能会有点吃力，我甚至不知道铰链是什么。对，然后后面的话大概上了两三天，慢慢但是我那个培训机其实关于板材这方面学的不是很好。但后面的话我们店长包括孙老师他们都从我们板材是从根部一直跟我讲到我们的制作流程怎么样的。我现在",
      "那那如果说你就因为你刚刚不是刚出来，后面我们也会去招一些新人什么的。你觉得在这个前期的这个培训中，有没有什么宝贵的建议，就是你觉得我们可以去讨论。改进的，你们改进的就因为我们后面不是要去做一个培训系统，你有什么需求，你都可以去提。对，我们会根据自己一些去调整，然后尽量为大家提供一个更好的一个平台。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：新人销售成长痛点与需求",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0489",
    "title": "优秀销售成长经验与高客单价成交技巧",
    "sourceFile": "优秀销售成长经验与高客单价成交技巧.txt",
    "relativePath": "优秀销售成长经验与高客单价成交技巧.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "高客单成交",
      "报价推进",
      "新人培养与考核",
      "资源开拓",
      "需求挖掘",
      "小红书获客"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店",
      "社群运营推进"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.646Z",
    "charCount": 17045,
    "evidenceSnippets": [
      "然后我们这边几位是馄饨的断面，然后是建到企业来帮助大家梳理一下前期在销售培有那些可以加强问题，然后帮助大家作为销售人员快速成长。另一部分就是针对已经很有经验的销售，你在工作中感觉还有哪些繁琐的点，需要AI类的工具，可以帮助大家提高效率的。聊聊这些事情。然后正好也介绍到你是在新人里面成长速度是很快的。所以我们也很好奇，你是你觉得这个成长过程是怎样的？你是简单从你参加培训到后面拿到第一单成交，一直到自己业绩上来这样一个履历的过程可以分享一下",
      "所以根据刚才聊的这个案例，我们就会发现接下来我们这90天最重要的还是梳理销售的SOP，以及设计师配套销售的这一套讲解方案的SOP。把这里面所需要的知识跟流程细化了以后，先通过这个培训系统来验证这套知识库的稳定性。因为培训是对内的，是可以有一定的调试的周期的。把这个稳定性做好了以后，下一个阶段要做的其实就是基于这个知识库给到大家一些能减少一些报价环节，都很多琐碎工作环节的一些使用工具。按照这个步骤去。我们先简单介绍一下，我们是所有的战略。",
      "现在的话我公司的话近两年比较广，可能也还是这种新小区，近三年再加2027年，可能是新小区会比较多一点。然后还要加上一些渠道，就是设计师渠道这一块。老顾客可能进店会稍微比这两个稍微少一点。"
    ],
    "generatedTask": {
      "courseTitle": "高客单成交：优秀销售成长经验与高客单价成交技巧",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次高客单成交表达。",
      "assessmentFocus": "检查学员是否能说清高客单成交的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0490",
    "title": "资深设计师方案讲解与客户把控技巧",
    "sourceFile": "资深设计师方案讲解与客户把控技巧.txt",
    "relativePath": "资深设计师方案讲解与客户把控技巧.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "designer"
    ],
    "competencyTags": [
      "设计方案讲解",
      "报价推进",
      "非标下单底线",
      "量尺出图",
      "客诉处理",
      "五金场景讲解"
    ],
    "sceneTags": [
      "客户方案会审",
      "客户追问价格",
      "订单下单前"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:17:40.046Z",
    "charCount": 14385,
    "evidenceSnippets": [
      "我会保证他，我说这个你放心，我的测量尺寸和下单的问题几乎就是不可能会产生大的问题。而且我对于你家的这个尺寸的把控肯定是很贴合的。因为像我的话，我正常会习惯性量一遍尺，可能还会去再复一遍。但是在下单的就即使在下单的时候遇到一些问题的时候，可能那个尺寸比较模糊的时候，我还是会去再去量一遍。会有这些点我能做得到。但是这样的话给客户去给客户的话，基本上这怎么去说呢？我的说这个就不是很好说了，想什么好的。",
      "还有一个就是工艺，在工艺上的节点的时候，当客户给到你一个东西，想融入在你这个电视柜的时候，这个时候你要能很清晰的判断这个东西是否可以把它放进去。因为这个可能会产生后期的一个很大问题，一个是安装的一个售后问题，第二个就是一个下单的问题，是否可以组装，那个问题都是很大的，甚至可能导致最后的买单都不一定能成交。因为你前期告诉他可以，后期如果不行的情况下，他会可能就会产生很大的情绪，对吧？这个时候你就要有很清晰的去判断出来。",
      "一次性大额预付的话，首先你对这个客户前期把控很准，然后在一定要把控比较准一点。在对方案的时候，一定要就是所有的方案基本上迎合了客户的一个需求一个和一个需求之后，这个时候但对于报价还有一个在设计方案的时候，一定要把控一下预算，这一点很重要。如果你的预算是超于他的预算很多的，即使你设计的再好，这个点是有问题的。因为你已经超出他太多的预算，这个时候他肯定会犹豫的。因为他的预算有一些，你比如说现在的交付的一个小区，像家里这些便宜一点等等的。有些"
    ],
    "generatedTask": {
      "courseTitle": "设计方案讲解：资深设计师方案讲解与客户把控技巧",
      "practicePrompt": "围绕“客户方案会审”，让学员用自己的话完成一次设计方案讲解表达。",
      "assessmentFocus": "检查学员是否能说清设计方案讲解的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "designer"
      ]
    }
  },
  {
    "id": "lk-0491",
    "title": "资深销售带教经验与销售技巧",
    "sourceFile": "资深销售带教经验与销售技巧.txt",
    "relativePath": "资深销售带教经验与销售技巧.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "新人培养与考核",
      "报价推进",
      "转化复盘",
      "需求挖掘",
      "高客单成交",
      "客户接待闭环"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.634Z",
    "charCount": 8738,
    "evidenceSnippets": [
      "然后有一个单子是这样的，我记得当时那个小夫妻两个，其实他们小区的品质对我们来讲不是很高的。然后预算的话，当时预算是十万多。但是后来的签单的时候，当时第一次住宅做下来是13万，13万，因为相对来讲已经超了两三万了。然后他就在想办法，我们本来做的那个方案里面是有一个颜色的跳色，小女孩糖颜色跳色。当时他在算报价的时候不知道，因为新人的设计师可能也有点对那个产品不是很熟，所以就换了一下。他做报价的时候按那种比较便宜的做了，后来发现这个价格不对，",
      "然后还有一个细节的问题，一个是销售的能力是两个维度，一个是订单量，订单数量获更多的顾客。还有一个维度就是已经进来的这个客户是否能把这个客单价做到里面。这边就有一个小矛盾，这个矛盾就是如果我们给他推荐了很符合他需求的东西，但是价格又超出他预期了，可能就会丢3。如果我们一开始就抱着这个预算，按照他预算做的一个方案，这个方案又不一定能匹配到他的生活的真正的需求。那在这个方出方案跟报价这个环节，还有在既保证成交的前提下，能尽量把客单价做大一点。",
      "我当时成交第一单说实话真的不记得。因为当时成单很简单，就是说你只要我我们只要把产品折扣优惠跟他讲到，然后客户就很容易签单。有时候甚至客户都不能是客户排队签单的。但是现在客户好像就不太一样了，他们要求也比较多，然后对比也比较多。对我们的首先是产品上面，颜值上面，还有很多也是价格上面。但是对客户来讲，他理解的性价比就是价格便宜。那我们要给客户灌输的可能就是要产品的价值之类的。所以说有的时候还是因为客户不同。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：资深销售带教经验与销售技巧",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0492",
    "title": "资深销售经验分享与客户关系处理",
    "sourceFile": "资深销售经验分享与客户关系处理.txt",
    "relativePath": "资深销售经验分享与客户关系处理.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "报价推进",
      "客户接待闭环",
      "新人培养与考核",
      "需求挖掘",
      "高客单成交",
      "指标异常判断"
    ],
    "sceneTags": [
      "客户追问价格",
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
    "sourceUpdatedAt": "2026-04-14T09:15:45.627Z",
    "charCount": 7860,
    "evidenceSnippets": [
      "对吧？就你这边说的轮廓场景，其实公司有培训过产品知识，有话术也有一些，但是最重要的还是你这个场景，你对这个场景足够熟悉，足够亲切，你才能把一个陌生人快速的带到你这个环境里面，达到一个统一的一个效果。其实像今天的这个提问，更多的是想收集下像你从比较优秀的销售，就是资历很深的销售，有没有很经典或者是很通用的话术或者是思维方式能给到新人的。或者因为我们这个要做的是一个陪练的一个过程，老人的一个经验放在里面作为考核点，然后新人的困扰作为问题点进",
      "当客户觉得贵的说觉得太贵的时候，你会把差价的价格点给他说的更明白一点。",
      "我觉得新人小白第一步就是了解公司的企业文化，了解公司的产品核心体系是什么，然后价格体系什么。你对公司产品一无所知的时候来谈好去跟客户来介绍产品。"
    ],
    "generatedTask": {
      "courseTitle": "报价推进：资深销售经验分享与客户关系处理",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次报价推进表达。",
      "assessmentFocus": "检查学员是否能说清报价推进的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0493",
    "title": "资深销售客户转化与方案深化技巧",
    "sourceFile": "资深销售客户转化与方案深化技巧.txt",
    "relativePath": "资深销售客户转化与方案深化技巧.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales"
    ],
    "competencyTags": [
      "转化复盘",
      "报价推进",
      "新人培养与考核",
      "非标下单底线",
      "社群SOP",
      "资源开拓"
    ],
    "sceneTags": [
      "客户追问价格",
      "新人入门考核",
      "客户首次进店"
    ],
    "suggestedUses": [
      "qna",
      "course",
      "practice",
      "retrain"
    ],
    "priority": "high",
    "sourceUpdatedAt": "2026-04-14T09:15:45.640Z",
    "charCount": 12320,
    "evidenceSnippets": [
      "难点是什么呢？我们公司就是导报价，然后客户群体的需求买单是比较对新人来说是比较满难的。我们也担心，前期我们公司支付了很多，然后包括我们带教师傅花了心血就留不住这些人是。",
      "然后再向您这里进一步分享一下，具体的这个小区社群的时候，目前销售人员是怎么做的。咱们整个活动的整个门店或者设计师，还有总部的督导，这个配合的过程大概是怎样？",
      "有过什么意思？那就是一开始的话对这个其实对产品知识什么的，对这个新人比较满意的。就是到后面报价结算报价阶段，然后比如说他超预算，还有一种情况就是我们话题不规范的话，搞高价导致了少收钱。这个就比较对现在来说就像我们那个老销售的话，他可能就知道我确实画的这个少的。但是新人他不知道，那就是设计师画的时候会导致有过这么一个单子，然后我们去辅助他，然后给客户做解释，然后挽回的。"
    ],
    "generatedTask": {
      "courseTitle": "转化复盘：资深销售客户转化与方案深化技巧",
      "practicePrompt": "围绕“客户追问价格”，让学员用自己的话完成一次转化复盘表达。",
      "assessmentFocus": "检查学员是否能说清转化复盘的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales"
      ]
    }
  },
  {
    "id": "lk-0494",
    "title": "AI培训系统项目推进会",
    "sourceFile": "AI培训系统项目推进会.txt",
    "relativePath": "AI培训系统项目推进会.txt",
    "sourceKind": "raw_transcript",
    "learnerRoles": [
      "sales",
      "designer"
    ],
    "competencyTags": [
      "新人培养与考核",
      "指标异常判断",
      "社群SOP",
      "高客单成交",
      "转化复盘",
      "设计方案讲解"
    ],
    "sceneTags": [
      "新人入门考核",
      "运营复盘看板",
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
    "sourceUpdatedAt": "2026-04-14T09:17:40.004Z",
    "charCount": 31669,
    "evidenceSnippets": [
      "然后第四个痛点就是社区运营的整个数据化提效。因为现在随着门店越来越多，在推的活动小区也越来越多。我们通过微信群的方式来获取群聊的信息，来获取群里面的用户新增数量，来获取客服人员或者内部员工加入的人数的。通过的数量来形成一个社群运营的看板，帮助整个小这个活动更可视化的去推进。",
      "所以我们这90天之内，一方面是要交付这四套系统。另一方面真正重要的是通过交付这四套系统以及AI赋能部门还有IT部门的配合，重新对这些人员进行原始的语料搜集采访。拿这个语料库再加上我们现在沉淀下来的培训资料，形成这几个最关键的数据资产。一个叫做销冠的话术库，第二个叫做客户的场景库，第三个叫做方案的案例库，第四个是销售的能力画像，一个评分规则。然后第五个是社群的舆情库。",
      "然后还有一个第四个板块就是社群数据的看板了。所以这里的人员分配是咱们AI的核心人员，是做代理系统、评分系统，还有AI的问答助手。由于汇总这里本身是对公司全盘最了解的，所你需要做的是这个问答助手。因为这个后面需要更全面的知识库的做题。"
    ],
    "generatedTask": {
      "courseTitle": "新人培养与考核：AI培训系统项目推进会",
      "practicePrompt": "围绕“新人入门考核”，让学员用自己的话完成一次新人培养与考核表达。",
      "assessmentFocus": "检查学员是否能说清新人培养与考核的关键动作、风险边界和下一步处理。",
      "targetRoles": [
        "sales",
        "designer"
      ]
    }
  }
];
