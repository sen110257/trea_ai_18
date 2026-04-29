export const bannerList = [
  {
    id: 1,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20wedding%20banner%20with%20golden%20champagne%20theme%20romantic%20wedding%20decor%20luxury%20wedding%20planner%20banner%20high%20end&image_size=landscape_16_9',
    title: '春季婚礼季，预约享8折优惠',
    subtitle: '高端婚礼定制，为您打造完美婚礼'
  },
  {
    id: 2,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=romantic%20outdoor%20garden%20wedding%20ceremony%20setup%20champagne%20gold%20theme%20elegant%20decoration%20wedding%20planner%20banner&image_size=landscape_16_9',
    title: '户外草坪婚礼套餐',
    subtitle: '森系婚礼，自然浪漫'
  },
  {
    id: 3,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20chinese%20traditional%20wedding%20ceremony%20red%20and%20gold%20theme%20elegant%20decoration%20wedding%20planner&image_size=landscape_16_9',
    title: '中式传统婚礼定制',
    subtitle: '传承经典，浪漫永恒'
  }
]

export const weddingTemplates = [
  {
    id: 1,
    name: '中式传统婚礼',
    nameEn: 'Chinese Traditional',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20chinese%20wedding%20ceremony%20red%20gold%20theme%20double%20happiness%20symbol%20elegant%20decoration%20luxury%20wedding%20setup&image_size=square_hd',
    description: '传承中华传统文化，红金配色彰显喜庆尊贵',
    price: 28888,
    originalPrice: 35888,
    style: 'chinese',
    tags: ['传统', '喜庆', '中式'],
    features: ['龙凤呈祥', '红金配色', '传统仪式', '中式礼服'],
    details: {
      venue: '中式宴会厅',
      guests: 200,
      duration: '8小时',
      style: '中式传统'
    },
    scenes: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20wedding%20ceremony%20stage%20red%20gold%20decoration%20double%20happiness&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20wedding%20table%20setting%20red%20gold%20theme%20elegant%20decoration&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20wedding%20photo%20area%20traditional%20decoration&image_size=square_hd'
    ],
    packages: [
      { name: '司仪主持', price: 3800, included: true },
      { name: '新娘跟妆', price: 2800, included: true },
      { name: '婚礼摄影', price: 5800, included: true },
      { name: '婚礼摄像', price: 6800, included: true },
      { name: '场地布置', price: 8800, included: true },
      { name: '花艺装饰', price: 3000, included: false },
      { name: '灯光音响', price: 4000, included: false }
    ]
  },
  {
    id: 2,
    name: '西式浪漫婚礼',
    nameEn: 'Western Romantic',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20western%20wedding%20ceremony%20white%20rose%20decor%20champagne%20gold%20theme%20romantic%20decoration&image_size=square_hd',
    description: '西式浪漫婚礼，纯白与香槟金打造梦幻氛围',
    price: 32888,
    originalPrice: 42888,
    style: 'western',
    tags: ['浪漫', '西式', '梦幻'],
    features: ['白色玫瑰', '香槟金配色', '西式仪式', '浪漫氛围'],
    details: {
      venue: '西式宴会厅',
      guests: 250,
      duration: '8小时',
      style: '西式浪漫'
    },
    scenes: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=western%20wedding%20ceremony%20white%20rose%20arch%20champagne%20gold%20decor&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=western%20wedding%20reception%20table%20white%20linen%20champagne%20gold%20centerpiece&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=western%20wedding%20dance%20floor%20chandelier%20elegant%20lighting&image_size=square_hd'
    ],
    packages: [
      { name: '司仪主持', price: 3800, included: true },
      { name: '新娘跟妆', price: 3200, included: true },
      { name: '婚礼摄影', price: 6800, included: true },
      { name: '婚礼摄像', price: 7800, included: true },
      { name: '场地布置', price: 10800, included: true },
      { name: '花艺装饰', price: 5000, included: true },
      { name: '灯光音响', price: 5000, included: false }
    ]
  },
  {
    id: 3,
    name: '森系清新婚礼',
    nameEn: 'Forest Fresh',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest%20garden%20wedding%20greenery%20white%20flowers%20natural%20theme%20elegant%20decoration%20outdoor%20ceremony&image_size=square_hd',
    description: '置身森林花园婚礼，自然清新，与大自然融为一体',
    price: 25888,
    originalPrice: 32888,
    style: 'forest',
    tags: ['清新', '自然', '森系'],
    features: ['绿植装饰', '自然光线', '户外场地', '清新氛围'],
    details: {
      venue: '户外草坪/花园',
      guests: 150,
      duration: '8小时',
      style: '森系清新'
    },
    scenes: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest%20wedding%20arch%20greenery%20white%20flowers%20outdoor&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest%20wedding%20table%20wooden%20table%20greenery%20decor&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest%20wedding%20aisle%20flower%20petals%20greenery&image_size=square_hd'
    ],
    packages: [
      { name: '司仪主持', price: 3500, included: true },
      { name: '新娘跟妆', price: 2500, included: true },
      { name: '婚礼摄影', price: 5500, included: true },
      { name: '婚礼摄像', price: 6500, included: true },
      { name: '场地布置', price: 7800, included: true },
      { name: '花艺装饰', price: 4000, included: true },
      { name: '灯光音响', price: 3500, included: false }
    ]
  },
  {
    id: 4,
    name: '复古古堡婚礼',
    nameEn: 'Vintage Castle',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20castle%20wedding%20dark%20red%20gold%20theme%20gothic%20elegant%20decoration%20romantic%20atmosphere&image_size=square_hd',
    description: '复古古堡风格，神秘浪漫，如童话般的婚礼体验',
    price: 38888,
    originalPrice: 48888,
    style: 'vintage',
    tags: ['复古', '神秘', '古堡'],
    features: ['古堡元素', '复古配色', '神秘氛围', '奢华体验'],
    details: {
      venue: '城堡/复古宴会厅',
      guests: 180,
      duration: '10小时',
      style: '复古古堡'
    },
    scenes: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20castle%20wedding%20stage%20dark%20red%20gold%20gothic%20arch&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20castle%20wedding%20table%20candelabra%20dark%20red%20roses&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20castle%20wedding%20entrance%20candles%20romantic&image_size=square_hd'
    ],
    packages: [
      { name: '司仪主持', price: 4500, included: true },
      { name: '新娘跟妆', price: 3800, included: true },
      { name: '婚礼摄影', price: 7800, included: true },
      { name: '婚礼摄像', price: 8800, included: true },
      { name: '场地布置', price: 12800, included: true },
      { name: '花艺装饰', price: 6000, included: true },
      { name: '灯光音响', price: 6000, included: true }
    ]
  },
  {
    id: 5,
    name: '极简轻奢婚礼',
    nameEn: 'Minimal Luxury',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20luxury%20wedding%20champagne%20gold%20white%20elegant%20simple%20decoration%20modern%20style&image_size=square_hd',
    description: '极简轻奢风格，简约而不简单，彰显品味与格调',
    price: 29888,
    originalPrice: 38888,
    style: 'minimal',
    tags: ['轻奢', '简约', '现代'],
    features: ['极简设计', '轻奢元素', '现代简约', '高端质感'],
    details: {
      venue: '现代宴会厅',
      guests: 200,
      duration: '8小时',
      style: '极简轻奢'
    },
    scenes: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wedding%20stage%20champagne%20gold%20simple%20elegant&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wedding%20table%20simple%20centerpiece%20champagne%20gold&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wedding%20backdrop%20geometric%20gold%20frames&image_size=square_hd'
    ],
    packages: [
      { name: '司仪主持', price: 4000, included: true },
      { name: '新娘跟妆', price: 3000, included: true },
      { name: '婚礼摄影', price: 6500, included: true },
      { name: '婚礼摄像', price: 7500, included: true },
      { name: '场地布置', price: 8800, included: true },
      { name: '花艺装饰', price: 4500, included: false },
      { name: '灯光音响', price: 4500, included: false }
    ]
  },
  {
    id: 6,
    name: '户外草坪婚礼',
    nameEn: 'Outdoor Lawn',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20lawn%20wedding%20white%20tent%20greenery%20flowers%20romantic%20garden%20ceremony&image_size=square_hd',
    description: '户外草坪婚礼，蓝天白云草地，浪漫自然的婚礼体验',
    price: 22888,
    originalPrice: 29888,
    style: 'outdoor',
    tags: ['户外', '草坪', '浪漫'],
    features: ['户外场地', '自然景观', '浪漫氛围', '温馨体验'],
    details: {
      venue: '户外草坪',
      guests: 120,
      duration: '8小时',
      style: '户外草坪'
    },
    scenes: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20lawn%20wedding%20arch%20white%20flowers%20greenery&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20lawn%20wedding%20white%20tent%20reception&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=outdoor%20lawn%20wedding%20aisle%20flower%20petals&image_size=square_hd'
    ],
    packages: [
      { name: '司仪主持', price: 3200, included: true },
      { name: '新娘跟妆', price: 2300, included: true },
      { name: '婚礼摄影', price: 5200, included: true },
      { name: '婚礼摄像', price: 6200, included: true },
      { name: '场地布置', price: 5800, included: true },
      { name: '花艺装饰', price: 3500, included: true },
      { name: '灯光音响', price: 3000, included: false }
    ]
  }
]

export const weddingVenues = [
  {
    id: 1,
    name: '金色宴会厅',
    nameEn: 'Golden Ballroom',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20golden%20ballroom%20wedding%20venue%20chandelier%20elegant%20decoration%20grand%20hall&image_size=square_hd',
    description: '豪华金色宴会厅，可容纳200人的大型婚宴场地',
    address: '上海市浦东新区世纪大道88号金茂大厦5楼',
    capacity: 200,
    minCapacity: 50,
    pricePerTable: 3888,
    area: '1200平米',
    height: '8米',
    features: ['LED大屏', '专业音响', '舞台灯光', '停车位', '化妆间', '休息室'],
    rating: 4.9,
    reviewCount: 128,
    availableDates: [
      { date: '2026-05-01', available: true, price: 3888 },
      { date: '2026-05-02', available: true, price: 3888 },
      { date: '2026-05-03', available: false, price: 3888 },
      { date: '2026-05-04', available: true, price: 3888 },
      { date: '2026-05-05', available: true, price: 3888 },
      { date: '2026-05-06', available: false, price: 3888 },
      { date: '2026-05-07', available: true, price: 3888 }
    ],
    panoramaImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20golden%20ballroom%20wedding%20venue%20interior%20view%201&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20golden%20ballroom%20wedding%20venue%20interior%20view%202&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20golden%20ballroom%20wedding%20venue%20interior%20view%203&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20golden%20ballroom%20wedding%20venue%20interior%20view%204&image_size=landscape_16_9'
    ],
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20ballroom%20wedding%20venue%20stage%20view&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20ballroom%20wedding%20venue%20entrance%20view&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=golden%20ballroom%20wedding%20venue%20dining%20area&image_size=square_hd'
    ],
    location: { lat: 31.2304, lng: 121.4737 }
  },
  {
    id: 2,
    name: '梦幻花园厅',
    nameEn: 'Dream Garden Hall',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20garden%20wedding%20hall%20glass%20roof%20natural%20light%20greenery%20decoration%20romantic%20venue&image_size=square_hd',
    description: '玻璃穹顶花园厅，自然光线下的完美婚礼场地',
    address: '上海市黄浦区南京东路123号花园酒店3楼',
    capacity: 150,
    minCapacity: 30,
    pricePerTable: 4288,
    area: '900平米',
    height: '6米',
    features: ['玻璃穹顶', '自然光线', '花园景观', '停车位', '化妆间', '音响设备'],
    rating: 4.8,
    reviewCount: 96,
    availableDates: [
      { date: '2026-05-01', available: true, price: 4288 },
      { date: '2026-05-02', available: false, price: 4288 },
      { date: '2026-05-03', available: true, price: 4288 },
      { date: '2026-05-04', available: true, price: 4288 },
      { date: '2026-05-05', available: false, price: 4288 },
      { date: '2026-05-06', available: true, price: 4288 },
      { date: '2026-05-07', available: true, price: 4288 }
    ],
    panoramaImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20garden%20hall%20wedding%20venue%20glass%20roof%20view%201&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20garden%20hall%20wedding%20venue%20glass%20roof%20view%202&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20garden%20hall%20wedding%20venue%20glass%20roof%20view%203&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20garden%20hall%20wedding%20venue%20glass%20roof%20view%204&image_size=landscape_16_9'
    ],
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=garden%20hall%20wedding%20venue%20stage%20view&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=garden%20hall%20wedding%20venue%20glass%20roof&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=garden%20hall%20wedding%20venue%20dining%20area&image_size=square_hd'
    ],
    location: { lat: 31.2359, lng: 121.4805 }
  },
  {
    id: 3,
    name: '滨江草坪婚礼场地',
    nameEn: 'Riverside Lawn Venue',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=riverside%20lawn%20wedding%20venue%20white%20tent%20river%20view%20romantic%20outdoor%20ceremony&image_size=square_hd',
    description: '滨江户外草坪，江景为伴，尽享浪漫户外婚礼',
    address: '上海市徐汇区龙腾大道2888号滨江公园内',
    capacity: 120,
    minCapacity: 20,
    pricePerTable: 2888,
    area: '2000平米',
    height: '露天',
    features: ['江景视野', '草坪场地', '户外帐篷', '停车位', '化妆间', '备用室内'],
    rating: 4.7,
    reviewCount: 82,
    availableDates: [
      { date: '2026-05-01', available: true, price: 2888 },
      { date: '2026-05-02', available: true, price: 2888 },
      { date: '2026-05-03', available: true, price: 2888 },
      { date: '2026-05-04', available: false, price: 2888 },
      { date: '2026-05-05', available: true, price: 2888 },
      { date: '2026-05-06', available: true, price: 2888 },
      { date: '2026-05-07', available: false, price: 2888 }
    ],
    panoramaImages: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20riverside%20lawn%20wedding%20venue%20river%20view%201&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20riverside%20lawn%20wedding%20venue%20river%20view%202&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20riverside%20lawn%20wedding%20venue%20river%20view%203&image_size=landscape_16_9',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=360%20panorama%20riverside%20lawn%20wedding%20venue%20river%20view%204&image_size=landscape_16_9'
    ],
    images: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=riverside%20lawn%20wedding%20venue%20stage%20view&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=riverside%20lawn%20wedding%20venue%20tent%20view&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=riverside%20lawn%20wedding%20venue%20river%20view&image_size=square_hd'
    ],
    location: { lat: 31.1804, lng: 121.4436 }
  }
]

export const weddingPackages = [
  {
    id: 1,
    name: '标准套餐',
    nameEn: 'Standard Package',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20standard%20package%20elegant%20decoration%20champagne%20gold%20theme&image_size=square_hd',
    description: '基础婚礼服务套餐，包含核心婚礼项目',
    price: 19999,
    originalPrice: 25999,
    discount: '7.7折',
    tag: '热门推荐',
    includes: [
      { id: 1, name: '司仪主持', price: 3500, quantity: 1, included: true, required: true },
      { id: 2, name: '新娘跟妆', price: 2500, quantity: 1, included: true, required: true },
      { id: 3, name: '婚礼摄影', price: 4500, quantity: 1, included: true, required: true },
      { id: 4, name: '婚礼摄像', price: 5500, quantity: 1, included: true, required: true },
      { id: 5, name: '场地基础布置', price: 3999, quantity: 1, included: true, required: true }
    ],
    optionals: [
      { id: 6, name: '花艺装饰', price: 2800, quantity: 0, included: false },
      { id: 7, name: '灯光音响', price: 2500, quantity: 0, included: false },
      { id: 8, name: '伴娘妆', price: 800, quantity: 0, included: false },
      { id: 9, name: '婚车装饰', price: 1200, quantity: 0, included: false },
      { id: 10, name: '甜品台', price: 2000, quantity: 0, included: false }
    ],
    services: [
      '婚礼流程策划',
      '婚礼场地推荐',
      '婚礼当天全程服务',
      '婚礼照片精修50张',
      '婚礼视频剪辑60分钟'
    ]
  },
  {
    id: 2,
    name: '豪华全包套餐',
    nameEn: 'Luxury All-inclusive',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20wedding%20package%20elegant%20decoration%20champagne%20gold%20premium%20theme&image_size=square_hd',
    description: '豪华全包套餐，一站式婚礼服务省心无忧',
    price: 39999,
    originalPrice: 49999,
    discount: '8.0折',
    tag: '省心之选',
    includes: [
      { id: 1, name: '金牌司仪主持', price: 5500, quantity: 1, included: true, required: true },
      { id: 2, name: '资深新娘跟妆', price: 3800, quantity: 1, included: true, required: true },
      { id: 3, name: '双机位婚礼摄影', price: 7500, quantity: 1, included: true, required: true },
      { id: 4, name: '双机位婚礼摄像', price: 8500, quantity: 1, included: true, required: true },
      { id: 5, name: '场地豪华布置', price: 7800, quantity: 1, included: true, required: true },
      { id: 6, name: '花艺全套装饰', price: 3800, quantity: 1, included: true, required: true },
      { id: 7, name: '专业灯光音响', price: 3000, quantity: 1, included: true, required: true }
    ],
    optionals: [
      { id: 8, name: '伴娘伴郎妆', price: 1500, quantity: 0, included: false },
      { id: 9, name: '豪华婚车装饰', price: 1800, quantity: 0, included: false },
      { id: 10, name: '高级甜品台', price: 3500, quantity: 0, included: false },
      { id: 11, name: '婚礼现场督导', price: 2000, quantity: 0, included: false },
      { id: 12, name: 'LED大屏租赁', price: 5000, quantity: 0, included: false }
    ],
    services: [
      '婚礼全程策划',
      '婚礼场地推荐预订',
      '婚礼流程彩排',
      '婚礼照片精修100张',
      '婚礼视频剪辑120分钟',
      '婚礼相册制作',
      '婚礼MV制作',
      '婚前咨询服务'
    ]
  },
  {
    id: 3,
    name: '私人定制套餐',
    nameEn: 'Customized Package',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=custom%20wedding%20package%20premium%20personalized%20decoration%20luxury%20champagne%20gold&image_size=square_hd',
    description: '私人定制专属婚礼，根据您的需求量身打造',
    price: 0,
    originalPrice: 0,
    discount: '',
    tag: '专属定制',
    includes: [],
    optionals: [
      { id: 1, name: '首席司仪主持', price: 8000, quantity: 0, included: false },
      { id: 2, name: '总监级新娘跟妆', price: 5800, quantity: 0, included: false },
      { id: 3, name: '多机位婚礼摄影', price: 12000, quantity: 0, included: false },
      { id: 4, name: '多机位婚礼摄像', price: 15000, quantity: 0, included: false },
      { id: 5, name: '定制场地布置', price: 15000, quantity: 0, included: false },
      { id: 6, name: '高级花艺装饰', price: 8000, quantity: 0, included: false },
      { id: 7, name: '顶级灯光音响', price: 6000, quantity: 0, included: false },
      { id: 8, name: '婚礼策划总监', price: 8000, quantity: 0, included: false },
      { id: 9, name: '婚礼现场执行', price: 5000, quantity: 0, included: false },
      { id: 10, name: '婚礼视频微电影', price: 10000, quantity: 0, included: false }
    ],
    services: [
      '专属婚礼策划师',
      '婚礼主题定制设计',
      '婚礼场地推荐预订',
      '婚礼流程全程策划',
      '婚礼仪式策划',
      '婚礼彩排服务',
      '婚前筹备指导'
    ],
    isCustom: true
  }
]

export const professionalStaff = [
  {
    id: 1,
    name: '张明宇',
    nameEn: 'Zhang Mingyu',
    role: '金牌司仪',
    roleType: 'mc',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20wedding%20mc%20elegant%20suit%20confident%20smile%20portrait&image_size=square_hd',
    experience: 12,
    rating: 4.9,
    reviewCount: 256,
    price: 5500,
    description: '12年婚礼主持经验，超过2000场婚礼主持经历，擅长营造温馨浪漫的婚礼氛围',
    style: ['温馨浪漫', '幽默风趣', '庄重大气'],
    languages: ['普通话', '英语', '粤语'],
    availableDates: [
      { date: '2026-05-01', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-02', available: false, morning: false, afternoon: false, evening: false },
      { date: '2026-05-03', available: true, morning: true, afternoon: false, evening: true },
      { date: '2026-05-04', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-05', available: true, morning: false, afternoon: true, evening: true },
      { date: '2026-05-06', available: false, morning: false, afternoon: false, evening: false },
      { date: '2026-05-07', available: true, morning: true, afternoon: true, evening: true }
    ],
    portfolio: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20mc%20hosting%20ceremony%20elegant%20stage%201&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20mc%20hosting%20ceremony%20elegant%20stage%202&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20mc%20hosting%20ceremony%20elegant%20stage%203&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20mc%20hosting%20ceremony%20elegant%20stage%204&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20mc%20hosting%20ceremony%20elegant%20stage%205&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20mc%20hosting%20ceremony%20elegant%20stage%206&image_size=square_hd'
    ],
    achievements: ['2025年度最佳婚礼司仪', '中国婚礼司仪协会会员', '婚礼主持人金奖得主']
  },
  {
    id: 2,
    name: '李雨晴',
    nameEn: 'Li Yuqing',
    role: '资深新娘跟妆师',
    roleType: 'makeup',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20wedding%20makeup%20artist%20elegant%20portrait%20confident%20smile&image_size=square_hd',
    experience: 8,
    rating: 4.8,
    reviewCount: 189,
    price: 3800,
    description: '8年新娘跟妆经验，擅长打造清新自然、精致优雅的新娘妆容，让您成为最美的新娘',
    style: ['清新自然', '精致优雅', '复古时尚'],
    brands: ['迪奥', '香奈儿', '纪梵希', 'MAC'],
    availableDates: [
      { date: '2026-05-01', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-02', available: true, morning: true, afternoon: false, evening: true },
      { date: '2026-05-03', available: false, morning: false, afternoon: false, evening: false },
      { date: '2026-05-04', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-05', available: true, morning: false, afternoon: true, evening: true },
      { date: '2026-05-06', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-07', available: false, morning: false, afternoon: false, evening: false }
    ],
    portfolio: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20makeup%20elegant%20wedding%20look%201&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20makeup%20elegant%20wedding%20look%202&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20makeup%20elegant%20wedding%20look%203&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20makeup%20elegant%20wedding%20look%204&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20makeup%20elegant%20wedding%20look%205&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bride%20makeup%20elegant%20wedding%20look%206&image_size=square_hd'
    ],
    achievements: ['国家级高级化妆师', '中国化妆造型师协会会员', '2025年度最佳新娘造型师']
  },
  {
    id: 3,
    name: '王浩然',
    nameEn: 'Wang Haoran',
    role: '婚礼摄影师',
    roleType: 'photography',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20wedding%20photographer%20holding%20camera%20portrait%20creative%20professional&image_size=square_hd',
    experience: 10,
    rating: 4.9,
    reviewCount: 234,
    price: 7500,
    description: '10年婚礼摄影经验，擅长捕捉婚礼中最动人的瞬间，用镜头记录您的幸福时刻',
    style: ['纪实风格', '艺术唯美', '时尚大气'],
    equipment: ['佳能 EOS R5', '索尼 A7S III', '专业镜头群'],
    availableDates: [
      { date: '2026-05-01', available: false, morning: false, afternoon: false, evening: false },
      { date: '2026-05-02', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-03', available: true, morning: true, afternoon: false, evening: true },
      { date: '2026-05-04', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-05', available: false, morning: false, afternoon: false, evening: false },
      { date: '2026-05-06', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-07', available: true, morning: true, afternoon: true, evening: true }
    ],
    portfolio: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20photography%20romantic%20moment%20bride%20groom%201&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20photography%20romantic%20moment%20bride%20groom%202&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20photography%20romantic%20moment%20bride%20groom%203&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20photography%20romantic%20moment%20bride%20groom%204&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20photography%20romantic%20moment%20bride%20groom%205&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20photography%20romantic%20moment%20bride%20groom%206&image_size=square_hd'
    ],
    achievements: ['WPPI国际婚礼摄影师', '中国婚礼摄影大赛金奖', '佳能签约摄影师']
  },
  {
    id: 4,
    name: '陈思琪',
    nameEn: 'Chen Siqi',
    role: '婚礼摄像师',
    roleType: 'videography',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20female%20wedding%20videographer%20holding%20camera%20portrait%20creative&image_size=square_hd',
    experience: 7,
    rating: 4.8,
    reviewCount: 156,
    price: 8500,
    description: '7年婚礼视频拍摄经验，擅长用电影叙事手法记录婚礼，为您制作精美的婚礼影片',
    style: ['电影风格', '温馨感动', '青春活力'],
    equipment: ['索尼 FX3', '大疆 Ronin 稳定器', '专业灯光设备'],
    availableDates: [
      { date: '2026-05-01', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-02', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-03', available: true, morning: true, afternoon: false, evening: true },
      { date: '2026-05-04', available: false, morning: false, afternoon: false, evening: false },
      { date: '2026-05-05', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-06', available: true, morning: true, afternoon: true, evening: true },
      { date: '2026-05-07', available: true, morning: true, afternoon: false, evening: true }
    ],
    portfolio: [
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20video%20cinematic%20bride%20groom%20romantic%201&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20video%20cinematic%20bride%20groom%20romantic%202&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20video%20cinematic%20bride%20groom%20romantic%203&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20video%20cinematic%20bride%20groom%20romantic%204&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20video%20cinematic%20bride%20groom%20romantic%205&image_size=square_hd',
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20video%20cinematic%20bride%20groom%20romantic%206&image_size=square_hd'
    ],
    achievements: ['婚礼影像大赛金奖', '中国婚礼视频联盟会员', '2025年度最佳婚礼视频']
  }
]

export const invitationTemplates = [
  {
    id: 1,
    name: '浪漫香槟金',
    nameEn: 'Romantic Champagne Gold',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20wedding%20invitation%20template%20champagne%20gold%20theme%20romantic%20floral%20decoration%20luxury&image_size=square_hd',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20invitation%20card%20champagne%20gold%20theme%20elegant%20design%20preview&image_size=square_hd',
    description: '经典香槟金配色，优雅浪漫的婚礼请柬',
    price: 0,
    isPremium: false,
    colors: ['#D4AF37', '#FDF8F0', '#FFFFFF'],
    style: 'classic'
  },
  {
    id: 2,
    name: '清新森系',
    nameEn: 'Fresh Forest',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest%20greenery%20wedding%20invitation%20template%20natural%20green%20white%20flowers%20elegant&image_size=square_hd',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=forest%20wedding%20invitation%20card%20greenery%20white%20flowers%20natural%20design%20preview&image_size=square_hd',
    description: '清新自然的森系风格，绿意盎然的婚礼请柬',
    price: 0,
    isPremium: false,
    colors: ['#4A7C59', '#FDF8F0', '#FFFFFF'],
    style: 'forest'
  },
  {
    id: 3,
    name: '复古红色喜庆',
    nameEn: 'Vintage Red Festive',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20chinese%20red%20wedding%20invitation%20template%20gold%20double%20happiness%20elegant&image_size=square_hd',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20red%20wedding%20invitation%20card%20gold%20decoration%20traditional%20design%20preview&image_size=square_hd',
    description: '传统中国红配色，喜庆吉祥的婚礼请柬',
    price: 0,
    isPremium: false,
    colors: ['#C41E3A', '#D4AF37', '#FFFFFF'],
    style: 'chinese'
  },
  {
    id: 4,
    name: '梦幻星空',
    nameEn: 'Dreamy Starry Sky',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20sky%20wedding%20invitation%20template%20dark%20blue%20gold%20stars%20romantic%20night&image_size=square_hd',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20sky%20wedding%20invitation%20card%20night%20sky%20gold%20stars%20design%20preview&image_size=square_hd',
    description: '梦幻星空主题，浪漫唯美的婚礼请柬',
    price: 19,
    isPremium: true,
    colors: ['#1A1A2E', '#D4AF37', '#E8E8E8'],
    style: 'dreamy'
  },
  {
    id: 5,
    name: '极简轻奢',
    nameEn: 'Minimal Luxury',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20luxury%20wedding%20invitation%20template%20champagne%20gold%20white%20elegant%20simple&image_size=square_hd',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20wedding%20invitation%20card%20simple%20elegant%20champagne%20gold%20design%20preview&image_size=square_hd',
    description: '简约轻奢风格，低调奢华的婚礼请柬',
    price: 0,
    isPremium: false,
    colors: ['#FFFFFF', '#D4AF37', '#333333'],
    style: 'minimal'
  },
  {
    id: 6,
    name: '粉色浪漫',
    nameEn: 'Pink Romance',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20romantic%20wedding%20invitation%20template%20rose%20flowers%20elegant%20sweet%20decoration&image_size=square_hd',
    preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pink%20wedding%20invitation%20card%20roses%20romantic%20sweet%20design%20preview&image_size=square_hd',
    description: '粉色浪漫主题，甜蜜温馨的婚礼请柬',
    price: 19,
    isPremium: true,
    colors: ['#D4A5A5', '#FFFFFF', '#FDF8F0'],
    style: 'romantic'
  }
]

export const guestRegistrations = [
  {
    id: 1,
    name: '张三',
    phone: '138****8888',
    guestCount: 2,
    isVegetarian: false,
    dietaryRequirements: '对海鲜过敏',
    status: 'confirmed',
    registeredAt: '2026-04-20 10:30:00'
  },
  {
    id: 2,
    name: '李四',
    phone: '139****9999',
    guestCount: 1,
    isVegetarian: true,
    dietaryRequirements: '素食',
    status: 'confirmed',
    registeredAt: '2026-04-20 11:15:00'
  },
  {
    id: 3,
    name: '王五',
    phone: '137****7777',
    guestCount: 3,
    isVegetarian: false,
    dietaryRequirements: '无',
    status: 'pending',
    registeredAt: '2026-04-21 09:20:00'
  },
  {
    id: 4,
    name: '赵六',
    phone: '136****6666',
    guestCount: 2,
    isVegetarian: false,
    dietaryRequirements: '需要儿童餐一份',
    status: 'confirmed',
    registeredAt: '2026-04-21 14:45:00'
  },
  {
    id: 5,
    name: '孙七',
    phone: '135****5555',
    guestCount: 4,
    isVegetarian: true,
    dietaryRequirements: '全素，四人',
    status: 'confirmed',
    registeredAt: '2026-04-22 16:30:00'
  }
]

export const quickEntranceItems = [
  {
    id: 1,
    name: '婚礼模板',
    nameEn: 'Wedding Templates',
    icon: 'template',
    color: '#D4AF37',
    path: '/template'
  },
  {
    id: 2,
    name: '场地预览',
    nameEn: 'Venue Preview',
    icon: 'venue',
    color: '#D4A5A5',
    path: '/venue'
  },
  {
    id: 3,
    name: '婚礼套餐',
    nameEn: 'Wedding Packages',
    icon: 'package',
    color: '#4A7C59',
    path: '/package'
  },
  {
    id: 4,
    name: '专业人员',
    nameEn: 'Professional Staff',
    icon: 'staff',
    color: '#8A8A8A',
    path: '/staff'
  },
  {
    id: 5,
    name: '请柬生成',
    nameEn: 'Invitation Maker',
    icon: 'invitation',
    color: '#D4AF37',
    path: '/invitation'
  },
  {
    id: 6,
    name: '宾客报名',
    nameEn: 'Guest Registration',
    icon: 'guest',
    color: '#D4A5A5',
    path: '/guest'
  },
  {
    id: 7,
    name: '在线客服',
    nameEn: 'Customer Service',
    icon: 'service',
    color: '#4A7C59',
    path: '/customer-service'
  },
  {
    id: 8,
    name: '我的预约',
    nameEn: 'My Bookings',
    icon: 'booking',
    color: '#8A8A8A',
    path: '/my-orders'
  }
]

export const myOrders = [
  {
    id: 1,
    orderNo: 'WD202604250001',
    type: '婚礼套餐',
    name: '豪华全包套餐',
    status: 'pending',
    statusText: '待确认',
    date: '2026-05-20',
    price: 39999,
    createTime: '2026-04-25 14:30:00',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20wedding%20package%20elegant%20decoration&image_size=square_hd'
  },
  {
    id: 2,
    orderNo: 'WD202604200002',
    type: '专业人员',
    name: '金牌司仪 - 张明宇',
    status: 'confirmed',
    statusText: '已确认',
    date: '2026-05-20',
    price: 5500,
    createTime: '2026-04-20 10:15:00',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20wedding%20mc%20elegant%20suit&image_size=square_hd'
  },
  {
    id: 3,
    orderNo: 'WD202604150003',
    type: '场地预约',
    name: '金色宴会厅',
    status: 'completed',
    statusText: '已完成',
    date: '2026-04-10',
    price: 77760,
    createTime: '2026-04-15 09:00:00',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20golden%20ballroom%20wedding%20venue&image_size=square_hd'
  }
]

export const myInvitations = [
  {
    id: 1,
    templateName: '浪漫香槟金',
    groomName: '新郎姓名',
    brideName: '新娘姓名',
    weddingDate: '2026-05-20',
    weddingAddress: '上海市浦东新区世纪大道88号金茂大厦5楼',
    createTime: '2026-04-25 15:00:00',
    previewImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wedding%20invitation%20preview%20champagne%20gold%20theme&image_size=square_hd',
    shareCount: 25
  }
]
