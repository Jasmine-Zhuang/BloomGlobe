import { Destination } from "@/lib/types";

export type SupportedLocale = "en" | "zh";

interface DestinationLocaleEntry {
  name: string;
  shortDescription: string;
  whyVisit: string;
  variabilityNote: string;
}

const DESTINATION_LOCALE_ZH: Record<string, DestinationLocaleEntry> = {
  "tokyo-cherry-blossom": {
    name: "东京",
    shortDescription: "城市公园、河岸步道与天际线相映，是最经典的都会樱花时刻。",
    whyVisit: "如果你想要一场名气足、动线顺、随手就能成片的春日花旅，东京依旧是稳妥之选。",
    variabilityNote: "春季气温起伏会让花期略有提前或延后。"
  },
  "kyoto-cherry-blossom": {
    name: "京都",
    shortDescription: "寺院庭园、古巷与柔和樱色交叠，是京都最动人的春日章节。",
    whyVisit: "适合偏爱传统景致与慢节奏赏花的人，整段旅程会更静也更有余韵。",
    variabilityNote: "不同寺院庭园与高低海拔的花况会略有差异。"
  },
  "osaka-cherry-blossom": {
    name: "大阪",
    shortDescription: "城郭樱景与热闹街区并置，是一站兼顾花景与城市烟火气的春日停留。",
    whyVisit: "如果你想把赏樱与美食、小住和轻松城市行程放在一起，大阪会很顺手。",
    variabilityNote: "城市热岛效应有时会让花期略微提前。"
  },
  "hirosaki-cherry-blossom": {
    name: "弘前",
    shortDescription: "北国城址公园被密集樱云与花瓣护城河包围，是迟到的樱花补课地。",
    whyVisit: "错过东京与京都也不用可惜，弘前提供了更晚、更完整的樱花窗口。",
    variabilityNote: "受北方气候影响，花期通常晚于东京与京都。"
  },
  "seoul-cherry-blossom": {
    name: "首尔",
    shortDescription: "河岸公园与宫廷景致让首尔成为兼具城市节奏与樱花氛围的春季去处。",
    whyVisit: "适合想在现代都市里感受樱花季节的人，行程轻快、节奏也更鲜明。",
    variabilityNote: "花期会随每年春季回暖速度而变化。"
  },
  "jinhae-cherry-blossom": {
    name: "镇海",
    shortDescription: "铁道、溪流与成排樱树构成高密度花景，是韩国辨识度很高的赏樱目的地。",
    whyVisit: "如果你想要视觉冲击力更强、氛围更盛大的春日花旅，镇海很有代表性。",
    variabilityNote: "节庆安排往往比花期本身更直接地影响观赏体验。"
  },
  "washington-dc-cherry-blossom": {
    name: "华盛顿特区",
    shortDescription: "潮汐湖畔与纪念碑群勾勒出极具辨识度的樱花景观，步行体验也很完整。",
    whyVisit: "想把经典樱花画面与紧凑的城市春日短途放在一起，这里很有说服力。",
    variabilityNote: "冬末与初春天气会明显影响当年花期。"
  },
  "vancouver-cherry-blossom": {
    name: "温哥华",
    shortDescription: "住宅街道、海边步道与远山背景相衬，让这里的樱花季显得格外轻柔。",
    whyVisit: "如果你更偏爱安静、风景感强、不过分节庆化的赏樱氛围，温哥华很合适。",
    variabilityNote: "不同街区和品种的开花节奏并不完全一致。"
  },
  "taipei-cherry-blossom": {
    name: "台北",
    shortDescription: "花期更早，适合在东亚晚冬时就先一步追上樱花讯息。",
    whyVisit: "如果你不想等到日本或韩国进入主季，台北是更早出发的实用选择。",
    variabilityNote: "山地观赏点往往比市区周边开得更晚。"
  },
  "alishan-cherry-blossom": {
    name: "阿里山",
    shortDescription: "山林铁道、薄雾与高地樱景交织，是偏自然取向的春季花旅代表。",
    whyVisit: "适合想在更安静、更靠近山野的环境里看樱花的人。",
    variabilityNote: "海拔会影响花期节奏，也会影响清晨能见度。"
  },
  "keukenhof-tulip": {
    name: "利瑟",
    shortDescription: "层次分明的色带、经过策划的花园景观与便捷交通，让这里成为郁金香经典。",
    whyVisit: "如果你想要一场辨识度高、完成度也很高的郁金香之旅，这里最稳妥。",
    variabilityNote: "天气会影响整体花田状态，但主季通常相当稳定。"
  },
  "haarlem-tulip": {
    name: "哈勒姆",
    shortDescription: "既能接近荷兰花田，又保留更放松的小城质感，是看郁金香的好基地。",
    whyVisit: "适合想看花田、又不想一直停留在阿姆斯特丹核心区的人。",
    variabilityNote: "每年花色与种植轮作会带来些许差异。"
  },
  "ottawa-tulip": {
    name: "渥太华",
    shortDescription: "公共花坛、水岸与春季节庆交织出轻松紧凑的郁金香城市短途。",
    whyVisit: "想在北美完成一趟门槛不高、城市舒适度也不错的花旅，渥太华很合适。",
    variabilityNote: "春季回暖速度会让节庆中的最佳花况略有前后。"
  },
  "skagit-tulip": {
    name: "斯卡吉特谷地",
    shortDescription: "开阔花田与大片天空构成更偏乡野气质的郁金香画面，适合自驾慢看。",
    whyVisit: "如果你更想看大面积春日花田，而不是精致花园，这里更对味。",
    variabilityNote: "花田时机会明显受到当季天气与农场安排影响。"
  },
  "istanbul-tulip": {
    name: "伊斯坦布尔",
    shortDescription: "大公园与历史城区在春天铺满郁金香，让赏花与城市文化并行发生。",
    whyVisit: "适合想把花季与重量级文化观光安排在同一趟旅程里的人。",
    variabilityNote: "不同公园的布置强度与春季状态会略有差别。"
  },
  "provence-lavender": {
    name: "瓦朗索勒",
    shortDescription: "起伏原野、成片紫色与普罗旺斯夏光，是薰衣草旅行最具标志性的画面。",
    whyVisit: "如果你想追求那种一眼就认得出的夏日花田电影感，瓦朗索勒仍是首选。",
    variabilityNote: "采收时点会直接压缩最漂亮的观赏窗口。"
  },
  "sault-lavender": {
    name: "索村",
    shortDescription: "山地气候让这里的薰衣草之旅更安静，也更有缓慢夏日的呼吸感。",
    whyVisit: "喜欢薰衣草，但不想置身最热门人潮里，索村会显得更从容。",
    variabilityNote: "较高海拔通常会让花期比低地普罗旺斯略晚。"
  },
  "furano-lavender": {
    name: "富良野",
    shortDescription: "整齐花田、开阔乡野与北海道的清爽夏意，让这里格外讨喜。",
    whyVisit: "如果你想看夏花，却希望气候更凉爽、视野更开阔，富良野很值得。",
    variabilityNote: "不同品种进入最佳状态的时间会稍有错位，但核心花期稳定。"
  },
  "bridestowe-lavender": {
    name: "布莱德斯托",
    shortDescription: "南半球的薰衣草花田，刚好接住北半球冬季假期时对夏日色彩的想念。",
    whyVisit: "当欧洲不在季时，它能提供一场依旧成立的薰衣草主题旅行。",
    variabilityNote: "南半球花况仍会受天气影响，但整体季节性相对明确。"
  },
  "hokuryu-sunflower": {
    name: "北龙町",
    shortDescription: "大面积向日葵田铺开在北海道乡间，是轻快明亮的盛夏花景。",
    whyVisit: "如果你想找一处单纯、开朗、充满夏天感的花田目的地，这里很合适。",
    variabilityNote: "不同种植区与天气会影响整片花海的饱满程度。"
  },
  "val-dorcia-sunflower": {
    name: "奥尔恰谷",
    shortDescription: "向日葵与柏树公路、丘陵小镇并置，是风景完整度极高的夏日乡野。",
    whyVisit: "很适合做成一趟自驾式花旅，沿路景观本身就足够迷人。",
    variabilityNote: "农作轮种会让每年最漂亮的花田位置略有不同。"
  },
  "andalucia-sunflower": {
    name: "卡尔莫纳",
    shortDescription: "金黄花田在安达卢西亚强烈阳光下铺展开来，画面更宽阔也更炽热。",
    whyVisit: "如果你偏爱辽阔、热烈、带一点南方气息的向日葵旅行，这里很对味。",
    variabilityNote: "花田状态会受农业节奏与高温影响。"
  },
  "luoping-canola": {
    name: "罗平",
    shortDescription: "金黄油菜花与喀斯特峰林同框，是中国春季花景里极具戏剧性的存在。",
    whyVisit: "如果你想看的不是园艺花园，而是大地尺度的花海画面，罗平很有分量。",
    variabilityNote: "区域天气与田间状况会让花况略有波动。"
  },
  "wuyuan-canola": {
    name: "婺源",
    shortDescription: "白墙村落与柔黄花田相互映衬，是节奏更慢、气质更温柔的春天乡景。",
    whyVisit: "适合想把花海与村落风景、慢节奏旅行放在一起的人。",
    variabilityNote: "不同村落进入最佳状态的时间会稍有差别。"
  },
  "jeju-canola": {
    name: "济州",
    shortDescription: "明亮的早春黄花、海风与岛上公路感，组成很轻盈的花季出逃。",
    whyVisit: "如果你想同时拥有花海与海岛度假感，济州的完成度很高。",
    variabilityNote: "沿海与内陆地区的开花节奏会有些许前后。"
  },
  "abira-canola": {
    name: "安平町",
    shortDescription: "北海道原野里的晚春黄花，清爽、开阔，也带一点北国迟来的明亮。",
    whyVisit: "当前段油菜花季结束后，它提供了一个更晚、也更松弛的补位选择。",
    variabilityNote: "北海道春季推进速度会带来少量花期波动。"
  },
  "ashikaga-wisteria": {
    name: "足利",
    shortDescription: "沉浸式紫藤花棚与垂落花序极具辨识度，是日本春花里最梦幻的一章。",
    whyVisit: "适合想把视觉张力拉满、专程为某一种花出发的人。",
    variabilityNote: "不同颜色区域进入盛放期的时间并不完全一致。"
  },
  "kawachi-wisteria": {
    name: "北九州",
    shortDescription: "浓密紫藤隧道与层叠花瀑带来高冲击力的春季画面，很适合专程前往。",
    whyVisit: "如果你想要一处极具分享感、到场就能感受到视觉张力的目的地，它很成立。",
    variabilityNote: "开放参观的时段有时会比完整花期更短。"
  },
  "kamakura-hydrangea": {
    name: "镰仓",
    shortDescription: "寺院小径与山坡花园在雨季被绣球花染亮，是很有情绪感的初夏去处。",
    whyVisit: "适合偏爱阴雨季节、想避开春季大客流的人，氛围更安静也更细腻。",
    variabilityNote: "降雨与湿度会影响花朵的新鲜度与色泽。"
  },
  "blue-mountains-hydrangea": {
    name: "蓝山",
    shortDescription: "凉爽山城与雾气中的绣球花相映，让夏季赏花也带着一层清凉感。",
    whyVisit: "很适合做成一趟短小而浪漫的南半球花季小假期。",
    variabilityNote: "海拔与夏季降雨会影响不同花园的表现。"
  },
  "sao-miguel-hydrangea": {
    name: "圣米格尔岛",
    shortDescription: "夏季时，公路边、火山地貌与山坡都被绣球花悄悄点亮。",
    whyVisit: "适合想把花景融进一整趟岛屿风景之旅，而不是只看单一景点的人。",
    variabilityNote: "路边与高地的最佳状态往往不会完全同步。"
  },
  "madeira-hydrangea": {
    name: "马德拉",
    shortDescription: "山路、花园与茂密岛景层层叠加，绣球花为整座岛添了一层清新的颜色。",
    whyVisit: "如果你更看重一整趟风景完整的岛屿假期，而不是单点打卡，它会很合适。",
    variabilityNote: "不同微气候会决定最漂亮的路边与高地花况。"
  },
  "kazanlak-rose": {
    name: "卡赞勒克",
    shortDescription: "玫瑰花田、香气传统与季节庆典交织，让这里自带鲜明地方性。",
    whyVisit: "想找一趟与在地工艺和地域身份紧密相连的花旅，卡赞勒克很特别。",
    variabilityNote: "采收活动会影响整个季节的观赏感受。"
  },
  "chiang-mai-rose": {
    name: "清迈",
    shortDescription: "凉季花园与花卉节庆让清迈成为冬季里温暖而轻盈的花景停靠点。",
    whyVisit: "适合想在冬天去暖一点的地方，用更柔和的花景开启一段短途旅行。",
    variabilityNote: "相较野外分散花景，花园型观赏通常更稳定。"
  },
  "portland-rose": {
    name: "波特兰",
    shortDescription: "正式玫瑰园与城市自然空间并存，让这里拥有绵长而稳定的玫瑰季。",
    whyVisit: "如果你想要一趟成熟、轻松、花景可靠的城市花旅，波特兰很实用。",
    variabilityNote: "玫瑰会一路开到夏季，但最漂亮的第一波通常来得更早。"
  },
  "sydney-jacaranda": {
    name: "悉尼",
    shortDescription: "蓝花楹盛开时，城市里局部街区会短暂进入带着紫调的春天。",
    whyVisit: "适合喜欢短暂却难忘的花季时刻，把城市漫游也一起纳入行程的人。",
    variabilityNote: "不同街区进入花期的时间会略有差异。"
  },
  "pretoria-jacaranda": {
    name: "比勒陀利亚",
    shortDescription: "整座城市在春天被蓝花楹罩上一层紫雾，是极具主题感的花季目的地。",
    whyVisit: "若想专程为蓝花楹而去，这里是辨识度和密度都很强的一站。",
    variabilityNote: "风与偏早高温会缩短最震撼的观赏阶段。"
  },
  "buenos-aires-jacaranda": {
    name: "布宜诺斯艾利斯",
    shortDescription: "南半球春天的街道与公园被蓝花楹染成柔紫色，城市气质也更显优雅。",
    whyVisit: "适合想把蓝花楹与更完整的大城市体验、街区气质一起收进旅程的人。",
    variabilityNote: "不同树木的开花节奏会形成层次分明的城市花况。"
  },
  "nanjing-plum-blossom": {
    name: "南京",
    shortDescription: "在真正的春天到来之前，南京的梅花先把冬末点亮，气质清雅而克制。",
    whyVisit: "适合偏爱季节转换感、希望避开人潮高峰的人，整趟旅程会更安静。",
    variabilityNote: "暖冬有时会让花期整体提前。"
  },
  "atami-plum-blossom": {
    name: "热海",
    shortDescription: "温暖海边气候让这里早早迎来梅花季，是冬末很温柔的一段花讯。",
    whyVisit: "如果你想在主樱花季前先安排一场轻巧的花季短途，热海很合适。",
    variabilityNote: "冬季偏暖时，有些年份会更早进入花期。"
  },
  "seoul-cosmos": {
    name: "首尔",
    shortDescription: "夏热褪去后，波斯菊让城市公园重新柔和下来，是秋天里轻盈的一层色彩。",
    whyVisit: "如果你想避开春季高峰，又仍想要花景与城市生活并行，这是不错的替代方案。",
    variabilityNote: "城市公园的养护情况会影响整体观赏效果。"
  },
  "hitachi-cosmos": {
    name: "常陆那珂",
    shortDescription: "山坡种植与宽阔视野组成更具规模感的秋季花景，也很适合当天往返。",
    whyVisit: "如果你想让十月依旧有足够鲜明的花季目的地，这里很有存在感。",
    variabilityNote: "风势与天气暴露度会影响花况完整度。"
  },
  "nami-cosmos": {
    name: "南怡岛",
    shortDescription: "花田、林荫步道与缓慢的岛上节奏，让南怡岛的秋季显得格外温柔。",
    whyVisit: "适合喜欢首尔周边、偏浪漫气质季节风景的人。",
    variabilityNote: "花况表现取决于当年种植安排与天气条件。"
  },
  "holland-michigan-tulip": {
    name: "密歇根州霍兰",
    shortDescription: "小镇节庆、郁金香花带与鲜明季节气息，让这里很有春天到来的仪式感。",
    whyVisit: "想在美国本土完成一趟轻松、紧凑、成行难度不高的花旅，这里相当合适。",
    variabilityNote: "节庆安排与春季气温都会影响最佳观赏时机。"
  },
  "canberra-tulip": {
    name: "堪培拉",
    shortDescription: "湖畔花坛与宽阔城市绿地，让南半球春天在这里显得整洁、明朗、很好读。",
    whyVisit: "如果你想在九月找一场经典花展式的城市花旅，堪培拉会很顺。",
    variabilityNote: "节庆花坛通常在主要种植窗口里状态最佳。"
  },
  "namaqualand-wildflower": {
    name: "纳马夸兰",
    shortDescription: "短暂的沙漠花季会把原本荒阔的土地变成大片色毯，极具反差感。",
    whyVisit: "适合想看一点更罕见、更超出花园想象的花季风景的人。",
    variabilityNote: "降雨量会非常直接地决定这一年花海是否足够壮观。"
  },
  "cape-town-protea": {
    name: "开普敦",
    shortDescription: "山海光线、芬博斯植被与雕塑感很强的帝王花，让这趟花旅更显野性。",
    whyVisit: "如果你想看的不是规整花园，而是被海岸与山地包围的野趣花景，开普敦很出色。",
    variabilityNote: "野生帝王花会随坡向、热度与当地降雨呈现不同状态。"
  },
  "grafton-jacaranda": {
    name: "格拉夫顿",
    shortDescription: "这座河畔小城几乎把整个春天都交给蓝花楹，街道、公园与节庆一起进入主题。",
    whyVisit: "如果你希望蓝花楹旅行本身就足够完整、而不是城市里的局部插曲，这里更合适。",
    variabilityNote: "风雨天气会缩短最干净、最密集的观赏阶段。"
  },
  "taipei-plum-blossom": {
    name: "台北",
    shortDescription: "寺院山坡、茶乡与较凉的山地花园，让冬季赏梅在这里显得很轻盈。",
    whyVisit: "适合想在三月前先安排一趟短途冬季花旅的人，节奏轻、进入也容易。",
    variabilityNote: "冷空气持续时间越长，高海拔赏梅窗口往往越持久。"
  },
  "mendoza-lavender": {
    name: "门多萨",
    shortDescription: "葡萄园之间点缀着薰衣草，替原本松弛的夏日酒乡旅程添上一层香气与颜色。",
    whyVisit: "如果你想在北半球淡季里，仍然找到一趟与花景有关的十二月旅行，它很成立。",
    variabilityNote: "花田品质会受到农场排期与夏季高温影响。"
  },
  "santiago-rose-garden": {
    name: "圣地亚哥",
    shortDescription: "春天里的玫瑰花园、山景光线与较慢的城市节奏，让这里更像一段柔和的小假期。",
    whyVisit: "如果你希望南美在晚春仍有稳定可看的花季选项，它值得放进短名单。",
    variabilityNote: "城市花园表现会随着用水与气温条件发生变化。"
  },
  "brisbane-jacaranda": {
    name: "布里斯班",
    shortDescription: "温暖春光与盛开的校园街道，让布里斯班的蓝花楹之旅更轻快也更随性。",
    whyVisit: "如果你喜欢悉尼的蓝花楹氛围，却想要更轻松一点的亚热带节奏，它是好替代。",
    variabilityNote: "强风与阵雨会让花瓣在盛放后较快掉落。"
  }
};

export function getLocalizedDestinationName(destination: Destination, locale: SupportedLocale) {
  if (locale === "zh") {
    return DESTINATION_LOCALE_ZH[destination.id]?.name ?? destination.destination;
  }

  return destination.destination;
}

export function getLocalizedDestinationCopy(destination: Destination, locale: SupportedLocale) {
  if (locale === "zh") {
    const entry = DESTINATION_LOCALE_ZH[destination.id];

    if (entry) {
      return entry;
    }
  }

  return {
    name: destination.destination,
    shortDescription: destination.shortDescription,
    whyVisit: destination.whyVisit,
    variabilityNote: destination.variabilityNote ?? ""
  };
}

function replaceMonthNames(value: string) {
  const replacements: Array<[RegExp, string]> = [
    [/January/g, "一月"],
    [/February/g, "二月"],
    [/March/g, "三月"],
    [/April/g, "四月"],
    [/May/g, "五月"],
    [/June/g, "六月"],
    [/July/g, "七月"],
    [/August/g, "八月"],
    [/September/g, "九月"],
    [/October/g, "十月"],
    [/November/g, "十一月"],
    [/December/g, "十二月"]
  ];

  return replacements.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), value);
}

export function localizeSeasonText(text: string, locale: SupportedLocale) {
  if (locale === "en") {
    return text;
  }

  return replaceMonthNames(text)
    .replace(/Late ([一二三四五六七八九十]+月) to early ([一二三四五六七八九十]+月)/g, "$1下旬至$2上旬")
    .replace(/Mid to late ([一二三四五六七八九十]+月)/g, "$1中下旬")
    .replace(/Late ([一二三四五六七八九十]+月)/g, "$1下旬")
    .replace(/Early ([一二三四五六七八九十]+月)/g, "$1上旬")
    .replace(/Mid ([一二三四五六七八九十]+月)/g, "$1中旬")
    .replace(/First half of ([一二三四五六七八九十]+月)/g, "$1上半月")
    .replace(/Second half of ([一二三四五六七八九十]+月)/g, "$1下半月")
    .replace(/Final week of ([一二三四五六七八九十]+月)/g, "$1最后一周")
    .replace(/Last week of ([一二三四五六七八九十]+月)/g, "$1最后一周")
    .replace(/Late ([一二三四五六七八九十]+月) to ([一二三四五六七八九十]+月)/g, "$1下旬至$2")
    .replace(/([一二三四五六七八九十]+月) to early ([一二三四五六七八九十]+月)/g, "$1至$2上旬")
    .replace(/([一二三四五六七八九十]+月) to late ([一二三四五六七八九十]+月)/g, "$1至$2下旬");
}

export function localizeTripLength(length: string, locale: SupportedLocale) {
  if (locale === "en") {
    return length;
  }

  return length.replace(/days?/g, "天");
}
