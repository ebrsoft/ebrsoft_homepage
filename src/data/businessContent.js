/**
 * EBRSoft 홈페이지 핵심 콘텐츠 및 고객사/솔루션 데이터
 */

export const navItems = [
  { id: 'hero-vision', label: '비전' },
  { id: 'hero-story', label: '소개' },
  { id: 'core', label: '핵심연동' },
  { id: 'clients', label: '고객사' },
  { id: 'vision', label: '차세대비전' },
  { id: 'contact', label: '문의하기', isCta: true }
]

export const heroStats = [
  {
    id: 'transactions',
    value: '180만+',
    label: '일 평균 정보 연결',
    sub: '실시간 재고·요금·예약 트랜잭션',
    color: 'navy'
  },
  {
    id: 'otas',
    value: '10대 OTA',
    label: '실시간 채널 연동',
    sub: '야놀자·여기어때·쿠팡·JTB 등',
    color: 'magenta'
  },
  {
    id: 'partner',
    value: 'TL린칸',
    label: '국내 공식 파트너',
    sub: '글로벌·국내 호텔 CMS 연계',
    color: 'purple'
  }
]

export const coreFlowNodes = {
  left: {
    eyebrow: 'HOTEL PMS',
    title: 'Opera · 호텔 시스템',
    badge: '객실재고 · 요금플랜 통합',
    items: [
      '객실 유형 기준 통합 재고 관리',
      '요금 플랜(조식포함·룸온리) 분리 표준화',
      '실시간 예약·재고·요금 양방향 동기화'
    ]
  },
  center: {
    eyebrow: 'SMART BRIDGE',
    title: 'EBRSoft × TL린칸',
    badge: '실시간 정보 연결 · 웹 솔루션',
    items: [
      'TL린칸 국내 연계 공식 파트너 게이트웨이',
      '대용량 비동기 메시징 & 전문 변환·라우팅',
      '고객 맞춤형 모듈 조합 엔터프라이즈 웹'
    ]
  },
  right: {
    eyebrow: '10+ CHANNELS',
    title: '국내외 메이저 OTA',
    badge: '실시간 예약 · 판매 채널',
    channels: [
      '야놀자',
      '여기어때',
      '쿠팡',
      '인터파크',
      'NOL',
      '호텔패스',
      'JTB',
      'HIS',
      '트립비토즈'
    ]
  }
}

export const techStackPills = [
  { label: 'Java 17 LTS · Spring Boot 3.3', category: 'backend' },
  { label: 'Apache Camel 4.8 · CXF 4.2 (REST/SOAP)', category: 'integration' },
  { label: 'Apache ActiveMQ Artemis (MOM)', category: 'messaging' },
  { label: 'Vue 3.5 · Vuetify 3.7 · TypeScript 5.7', category: 'frontend' },
  { label: 'PostgreSQL 16 · Redis 7', category: 'data' },
  { label: 'Prometheus · Grafana 모니터링', category: 'infra' }
]

/**
 * 주요 고객사 및 파트너 목록
 * - visible: true 인 항목만 실제 배포 화면에 렌더링됩니다.
 * - 추후 켄싱턴호텔앤드리조트, 인스파이어인티그레이티드리조트 논의/계약 확정 시
 *   해당 항목의 visible 값을 true 로 변경하면 즉시 홈페이지에 노출됩니다.
 */
export const clients = [
  {
    id: 'tllincoln',
    name: 'TL린칸 (TL-Lincoln)',
    nameEn: 'TL-Lincoln',
    category: '글로벌 1등 CMS',
    summary: '국내 연계 서비스 공식 파트너사 선정',
    summaryLines: ['국내 연계 서비스', '공식 파트너사 선정'],
    detail: '호텔 PMS 및 국내외 10대 메이저 OTA 실시간 연동 게이트웨이 구축·운영',
    accent: 'navy',
    visible: true
  },
  {
    id: 'roominghub',
    name: '루밍허브 (RoomingHub)',
    nameEn: 'RoomingHub',
    category: 'TL린칸 운영 파트너사',
    summary: '호텔 PMS, 국내 OTA 실시간 연동',
    detail: '숙박 상품·재고·요금 데이터의 끊김 없는 실시간 채널 연동 및 운영 지원',
    accent: 'magenta',
    visible: true
  },
  {
    id: 'hanwha',
    name: '한화호텔앤드리조트',
    nameEn: 'Hanwha Hotels & Resorts',
    category: '대형 호텔·리조트',
    summary: '엔터프라이즈 예약·채널 연계',
    detail: '호텔·리조트 TL, Naver 예약, 재고요금 실시간 연동 및 그외 대외 인터페이스 연동 인터페이스 구축 및 운영',
    detailLines: [
      '호텔·리조트 TL, Naver 예약, 재고요금 실시간 연동 및',
      '그외 대외 인터페이스 연동 인터페이스 구축 및 운영'
    ],
    accent: 'purple',
    visible: true
  },
  {
    id: 'kensington',
    name: '켄싱턴호텔앤드리조트',
    nameEn: 'Kensington Hotels & Resorts',
    category: '대형 호텔·리조트',
    summary: '호텔·리조트 시스템 연동 및 유지보수',
    detail: '예약·채널 연계 인터페이스 운영 및 안정적인 기술 유지보수 지원',
    accent: 'navy',
    visible: false // 실제 초기 배포 시 숨김 (논의 완료 후 true로 전환)
  },
  {
    id: 'inspire',
    name: '인스파이어인티그레이티드리조트',
    nameEn: 'INSPIRE Entertainment Resort',
    category: '글로벌 복합리조트',
    summary: '복합리조트 대외 연계 및 유지보수',
    detail: '대규모 복합리조트 예약·인터페이스 연동 및 시스템 유지보수·기술 지원',
    accent: 'magenta',
    visible: false // 실제 초기 배포 시 숨김 (논의 완료 후 true로 전환)
  }
]

/**
 * 차세대 트래블테크 비전 카드뉴스 3선 (목표 시스템 간결 티징)
 */
export const nextVisionCards = [
  {
    id: 'local-ota',
    step: '01 · 2026~',
    status: 'Next Solution',
    title: '지역 관광 활성화 OTA',
    quote: '“A 지역 여행 하려면 여기에 모두 있어!”',
    quoteLines: ['“A 지역 여행 하려면', '여기에 모두 있어!”'],
    description:
      '지역 숙박·입장권·투어 상품을 하나로 이어주고, 복잡한 절차 없이 지역 관광 바우처를 즉시 사용할 수 있도록 돕는 지자체·지역 여행사 상생 플랫폼',
    descriptionLines: [
      '지역 숙박·입장권·투어 상품을',
      '하나로 이어주고, 복잡한 절차 없이',
      '지역 관광 바우처를',
      '즉시 사용할 수 있도록 돕는',
      '지자체·지역 여행사 상생 플랫폼'
    ],
    tags: ['#통합예매', '#바우처즉시사용', '#지역상생'],
    accent: 'navy'
  },
  {
    id: 'ticket-cms',
    step: '02 · Upcoming',
    status: 'Channel Manager',
    title: 'Ticket CMS 서비스',
    quote: '“번거로운 수작업 발권을 실시간 자동 연동으로”',
    description:
      '일자별·시간대별·시즌별 입장권 상품을 표준화하여, 온라인 판매처와의 실시간 재고 공유부터 현장 바코드 확인까지 자연스럽게 연결을 돕는 티켓 전용 CMS',
    tags: ['#티켓표준화', '#실시간재고공유', '#바코드연동'],
    accent: 'magenta'
  },
  {
    id: 'ai-forecast',
    step: '03 · AI R&D',
    status: 'Smart Revenue',
    title: 'AI 재고·요금 예측 관리',
    quote: '“데이터가 찾아주는 안전 재고와 적정 요금”',
    description:
      '과거 예약·취소 추세와 워크인 수요, 주변 요금·축제·날씨 데이터를 분석하여 오버부킹 걱정 없는 안전 재고와 최적 요금 결정을 돕는 지능형 솔루션',
    tags: ['#수요예측AI', '#다이내믹프라이싱', '#오버부킹제로'],
    accent: 'purple'
  }
]

export const roadmapMilestones = [
  { period: '현재 (Foundation)', title: 'TL린칸·PMS 실시간 연동 & 모듈형 웹 솔루션 공급' },
  { period: '2026 ~ 2027', title: '지역 관광 활성화 OTA 솔루션 출시 및 지자체 서비스 확대' },
  { period: '2028 ~', title: 'Ticket CMS 출시 및 AI 기반 호텔 수익 관리 서비스 확장' },
  { period: '2030 ~', title: '중소 여행사 여행상품 판매 통합 SaaS 플랫폼 완성' }
]

export const inquiryCategories = [
  'TL린칸 · 호텔 PMS · OTA 연동 및 유지보수',
  '맞춤형 웹 · 대외 인터페이스 구축 컨설팅',
  '차세대 솔루션 (지역 OTA · Ticket CMS · AI) 제휴',
  '투자 및 기타 파트너십 문의'
]

