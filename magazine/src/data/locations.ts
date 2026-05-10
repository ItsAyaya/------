import type { Location } from '@/types'

function photosFrom(folder: number, count: number, captions?: string[]): Location['photos'] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/photos/${folder}/${i + 1}.jpeg`,
    caption: captions?.[i],
  }))
}

/**
 * 全部 15 个地点 — 每个地点一位评论者
 */
export const locations: Location[] = [
  {
    id: 1, name: '烘焙甜点', category: '烘焙', stars: 2,
    photos: photosFrom(1, 1, ['金黄酥香的现烤面包']),
    reviewerName: '群友·面包猎人', reviewerAvatar: '/avatars/reviewer1.svg',
    reviewText: '看起来像是现烤的面包，色泽金黄，卖相不错。外层酥脆，很适合当早餐或下午茶。哈工大附近能找到这种品质的烘焙不容易，值得一试。',
    address: '哈工大威海校区附近', mapKeyword: '哈工大威海面包店',
  },
  {
    id: 2, name: '大服一楼面包店', category: '面包·烘焙', stars: 3,
    photos: photosFrom(2, 5, ['半熟芝士', '奶油面包', '抹茶菠萝包', '面包柜', '奶油面包细节']),
    reviewerName: '群友·面包猎人', reviewerAvatar: '/avatars/reviewer1.svg',
    reviewText: '半熟芝士五块钱，据店主说是面粉比较多的半熟芝士。外层有些芝士味，内部更接近于湿一些的戚风蛋糕。考虑到只卖五块钱，性价比还是比较高。奶油面包+抹茶菠萝包，17r。两种面包内馅均为动物奶油，吃起来香而不甜。抹茶菠萝包抹茶味较浓，内部的奶油馅里还有些许红豆，锦上添花。两种面包都好吃。',
    address: '哈工大威海校区大服一楼', mapKeyword: '哈工大威海大学生服务楼',
  },
  {
    id: 3, name: '学子一楼面包店', category: '面包·烘焙', stars: 3,
    photos: photosFrom(3, 7, ['海盐芝士软欧', '软欧细节', '菠萝包', '菠萝包外观', '抹茶红豆', '内部组织', '整体展示']),
    reviewerName: '群友·面包猎人', reviewerAvatar: '/avatars/reviewer1.svg',
    reviewText: '海盐芝士软欧8r，麦香浓郁，松软咸香，一层微焦的深色脆壳提供了脆感与焦香。大量的芝士酱味道厚重，甚至喧宾夺主，吃到最后会很腻。我觉得去掉芝士酱会更好吃。菠萝包和抹茶红豆一共16r。菠萝包的卖相惊艳，外壳酥松，甜度正好，黄油香浓郁。内部的巨大气孔使得它吃起来相当松软。单纯从技巧角度，它远超大服一楼的菠萝包。抹茶红豆一般，抹茶味太淡，全被红豆掩盖了。',
    address: '哈工大威海校区学子餐厅一楼', mapKeyword: '哈工大威海南门',
  },
  {
    id: 4, name: '牛大碗滋味牛杂面', category: '面馆', stars: 2,
    photos: photosFrom(4, 3, ['秘制牛杂面', '口水鸡素菜双拼', '店内环境']),
    reviewerName: '群友·面食猎人', reviewerAvatar: '/avatars/reviewer2.svg',
    reviewText: '秘制牛杂面15r，口水鸡素菜双拼15r。这家店的缺点是调味过于克制。口水鸡缺少复合香料带来的令人印象深刻的香气。牛肉面的汤底味道极淡，只能尝出一点点青花椒的香气，牛杂量少，且不入味。中规中矩。',
    address: '哈工大威海校区附近', mapKeyword: '哈工大威海牛大碗',
  },
  {
    id: 5, name: '外卖精选', category: '外卖', stars: 2,
    photos: [],
    reviewerName: '群友（截图整理）', reviewerAvatar: '/avatars/reviewer3.svg',
    reviewText: '从外卖订单来看，点了一份面食和一份小菜，总价在20元左右。配送速度快，包装完好。味道中规中矩，属于工作日简餐的不错选择。具体店名未标注，推测为校周边面馆外卖。',
    address: '哈工大威海校区周边', mapKeyword: '哈工大威海',
  },
  {
    id: 6, name: '香格里拉菌王府', category: '中餐·菌菇', stars: 2,
    photos: photosFrom(6, 14, ['松茸汽锅鸡', '汽锅鸡汤色', '松茸狮子头', '狮子头', '牛肝菌砂锅山药', '山药挂汁', '苦荞饼', '柠檬树蝶花', '米饭', '店内装潢', '一楼养生品区', '外观门面', '菜单', '环境']),
    reviewerName: '群友·菌菇猎人', reviewerAvatar: '/avatars/reviewer4.svg',
    reviewText: '一家奇妙的老店，一楼卖养生品、玉器，二楼是饭店，装潢颇为奢华。菜品整体偏清淡。松茸汽锅鸡98r，招牌菜品，汤的鸡味、菌味都很浓，鲜甜可口，鸡肉香气很足，毫无腥味。松茸狮子头28r，口感绵软，有淡淡菌香。牛肝菌砂锅山药48r，咸甜适中，菌香仍在。苦荞饼2r一块，荞麦香气十足，香甜可口，非常好吃。柠檬树蝶花38r，口感像比较硬的银耳，酸甜口偏重。另外米饭出奇好吃，粒粒分明。推荐：苦荞饼、黑虎掌爆炒花菜、松茸狮子头、菌菇时蔬汤、松针菜。',
    address: '威海市', mapKeyword: '威海香格里拉菌王府',
  },
  {
    id: 7, name: '哈工大南门板面·特色羊杂面', category: '面馆', stars: 3,
    photos: photosFrom(7, 6, ['招牌羊杂面', '羊杂分量', '免费小菜', '面藕特写', '店内环境', '门面']),
    reviewerName: '群友·面食猎人', reviewerAvatar: '/avatars/reviewer2.svg',
    reviewText: '南门外其貌不扬的一家小店，老板掌勺，老板娘打杂，夫妻二人感情和睦，服务热情周到。小菜0r！尤其推荐面藕、辣白菜和萝卜，酸甜开胃。招牌羊杂面13r，羊杂实属不少，加钱买"精品"档羊杂几乎能盖住面条。汤底浓郁，面条筋道爽滑，羊杂香气四溢，一点不腥。加上几勺辣椒油，香上加香。不够辣可以找老板要特辣辣椒油。如果我微信里只剩下13块钱，我一定会认为这是上天在指引我来这里大吃一顿。',
    address: '哈工大威海校区南门外', mapKeyword: '哈工大威海南门板面羊杂面',
  },
  {
    id: 8, name: '阿朱腊汁肉夹馍', category: '陕西小吃', stars: 3,
    photos: photosFrom(8, 3, ['米皮+肉夹馍', '米皮特写', '肉夹馍特写']),
    reviewerName: '群友·小吃猎人', reviewerAvatar: '/avatars/reviewer5.svg',
    reviewText: '饭点必排队，含金量不用多说。腊汁肉夹馍+小份米皮14r。米皮是正宗陕西做法，没有麻酱，筋道香气扑鼻。腊汁肉夹馍用的是白吉馍，有面香。肉量中规中矩，但肉香、卤香都很足，而且没有青椒。性价比极高。极好的店，和旁边的秦陕缘可谓卧龙凤雏。',
    address: '哈工大威海校区南门外', mapKeyword: '哈工大威海南门阿朱腊汁肉夹馍',
  },
  {
    id: 9, name: '衢州鸭头', category: '卤味', stars: 3,
    photos: photosFrom(9, 4, ['鸭腿', '菜卷', '素菜拼盒', '门面']),
    reviewerName: '群友·卤味猎人', reviewerAvatar: '/avatars/reviewer6.svg',
    reviewText: '第一次见这家店是在线下，当时刚在帝王宫看完电影，往学校走的时候看到了这家不大的小店。外卖品质和到店买一致。他家对于香料的运用十分精妙，卤香十足。鸭腿12r，相当入味，肉香卤香交织，一点也不柴，可以说是我吃过最好吃的鸭腿。菜卷4r，卤千张卷香葱和香菜，单独吃千张会有点咸，里面的菜正好中和了咸度。素菜拼盒10r，各种素菜拼一起，很脆很好吃。正常的外卖量会比图中大一些。',
    address: '帝王宫附近，哈工大威海校区周边', mapKeyword: '威海帝王宫衢州鸭头',
  },
  {
    id: 10, name: '张村冯家全羊（长江路店）', category: '羊肉·清真', stars: 3,
    photos: photosFrom(10, 11, ['小全羊', '干煸羊杂', '干煸羊杂细节', '大桌食材', '店内环境', '门面', '食材展示', '菜单', '全羊汤', '羊杂特写', '环境']),
    reviewerName: '群友·羊肉猎人', reviewerAvatar: '/avatars/reviewer7.svg',
    reviewText: '威海老店，名副其实，人均30~60。店里很宽敞，迎面一张大桌子摆着不少食材。小全羊25r，羊杂羊肉量中规中矩，汤和肉味道都不错。干煸羊杂38r——油烧热下干辣椒、蒜片、葱爆香，放烧烤料、孜然粒、盐、糖、味精，下风干羊杂和尖椒炒到干香，放香菜翻炒两下出锅。风干后羊杂水分减少，香味格外突出，干煸后更有一层酥脆外壳，一口下去干香扑鼻，这道菜实在让人眼前一亮！还有一道特色鱼羊鲜据说很好吃。',
    address: '威海市长江路张村镇', mapKeyword: '威海张村冯家全羊',
  },
  {
    id: 11, name: '哈尔滨特色烤冷面', category: '小吃', stars: 3,
    photos: photosFrom(11, 3, ['烤冷面', '制作过程', '门面']),
    reviewerName: '群友·小吃猎人', reviewerAvatar: '/avatars/reviewer5.svg',
    reviewText: '一家笑起来很慈祥的老奶奶开的店，物美价廉。烤冷面味道正宗，很好吃！点烤冷面的时候一定要告诉奶奶要酸甜口的！烤冷面不做酸甜口不好吃。',
    address: '哈工大威海校区西南门外', mapKeyword: '哈工大威海西南门烤冷面',
  },
  {
    id: 12, name: '陈记炸货凉拌菜', category: '凉拌菜·小吃', stars: 3,
    photos: photosFrom(12, 3, ['凉拌菜', '炸货', '摊位']),
    reviewerName: '群友·小吃猎人', reviewerAvatar: '/avatars/reviewer5.svg',
    reviewText: '凉拌菜是自选称重，价格不贵，我买这些14块钱。拌菜是酸甜口的，但是不太甜。味道不错。缺点是绿叶蔬菜种类少了一点，只有苦菊和生菜。',
    address: '威海金海滩市集', mapKeyword: '威海金海滩市集陈记炸货',
  },
  {
    id: 13, name: '校周边小馆', category: '简餐', stars: 2,
    photos: photosFrom(13, 2, ['特色菜品', '招牌美食']),
    reviewerName: '群友（截图整理）', reviewerAvatar: '/avatars/reviewer3.svg',
    reviewText: '这家店位于学校周边，环境简洁干净。点了一份招牌菜，分量适中，味道尚可。价格在15-20元区间，属于学生友好的消费水平。适合下课路过来一份简餐。',
    address: '哈工大威海校区周边', mapKeyword: '哈工大威海周边餐厅',
  },
  {
    id: 14, name: '西南门清真餐厅', category: '清真·面食·烧烤', stars: 2,
    photos: [],
    reviewerName: '群友·面食猎人', reviewerAvatar: '/avatars/reviewer2.svg',
    reviewText: '坐标西南门外南100m的店。环境还不错，有方桌也有靠墙的单人桌。点了两个羊肉串和一小份牛肉拉面。面条默认加红油，但红油的辣味微乎其微。羊肉串6元一串，分量还算可以，默认不辣，吃起来是真羊肉（比威高负一楼神秘的4元科技串好太多）。店里有免费茶和白水。总体评价：没什么减分项，适合路过吃一顿或者确实想吃羊肉串了就来吃点。',
    address: '哈工大威海校区西南门外南100m', mapKeyword: '哈工大威海西南门清真餐厅',
  },
  {
    id: 15, name: '田野冰屋', category: '甜品·冰品', stars: 2,
    photos: photosFrom(15, 6, ['芒果牛奶冰', '抹茶刨冰', '松饼', '店内环境', '海水浴场风景', '门面']),
    reviewerName: '群友·甜品猎人', reviewerAvatar: '/avatars/reviewer8.svg',
    reviewText: '值得绕路前往的程度。芒果牛奶冰和抹茶刨冰做的不错，松饼一般，有点太甜了。我点的是芒果，芒果味道感觉稍微差一点点，不过上面的炼乳又救回来了，整体不错。店面就在海水浴场边上，风景很开阔舒畅，海水浴场的沙子质感比金海滩这边好，在这里好像可以当咖啡馆一样点一盘坐好久，消费30-40起步。',
    address: '威海海水浴场旁', mapKeyword: '威海田野冰屋',
  },
]

export function getLocationById(id: number): Location | undefined {
  return locations.find(l => l.id === id)
}
