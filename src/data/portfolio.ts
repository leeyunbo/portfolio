export const skillGroups = [
  {
    category: 'Backend',
    items: ['Java', 'Spring Boot', 'Spring Security', 'Spring AOP', 'REST API', 'Resilience4j', 'Langchain4j'],
  },
  {
    category: 'Messaging & Network',
    items: ['Netty', 'RabbitMQ', 'TCP/IP'],
  },
  {
    category: 'Data',
    items: ['MariaDB', 'PostgreSQL', 'Redis', 'ElasticSearch', 'InfluxDB'],
  },
  {
    category: 'Observability',
    items: ['Grafana'],
  },
];

export const careers = [
  {
    period: '2022.01 ~ 현재',
    company: '다우기술',
    role: 'Backend Developer',
    description: '카카오톡/문자 발송 도메인의 REST API 및 Netty 기반 Gateway 서버 설계·운영. 월 3억 건 이상의 메시지를 처리하는 고가용성 시스템을 담당.',
  },
  {
    period: '2020.09 ~ 2021.11',
    company: '동원엔터프라이즈',
    role: 'Developer',
    description: '동원그룹 그룹웨어 시스템 운영 및 유지보수.',
  },
];

export const workProjects = [
  {
    title: 'AI 에이전트 시스템 개발',
    summary: '반복적인 운영 업무와 타 팀 문의 대응을 자동화하는 AI 에이전트 시스템',
    impact: '운영 문의 월 120건 → 0건',
    tech: ['Spring Boot', 'Langchain4j', 'RAG', 'ElasticSearch', 'InfluxDB', 'MariaDB'],
    inProgress: false,
    sections: [
      {
        label: '배경',
        items: [
          'Slack 알람·Grafana 이상 감지 시마다 VDI 접속 후 로그 확인을 반복',
          '사업팀/운영팀의 TPS·메시지 성공/실패 여부·실패 원인 문의 대응에 공수 과다',
          '타 개발팀의 연동 규격 문의, 파라미터 실패 원인, 데이터 저장 확인 등 요청이 빈번 (월 약 120건)',
          'InfluxDB에 시계열 데이터만 관리하여 특정 메시지 추적 어려움, Exception 상세 정보 미관리',
        ],
      },
      {
        label: '목표',
        items: [
          'ElasticSearch 도입으로 메시지 추적 및 Exception 상세 원인 분석 기반 마련',
          'AI 에이전트가 Slack 알람·문의에 대해 ES/InfluxDB/DB를 조회하여 자동 원인 분석 및 응답',
          'RAG 적용으로 연동 규격서·운영 문서·운영 이력 문서 기반 질의응답 지원',
          '개발자가 아닌 사업·운영 담당자도 시스템 상태를 직접 조회할 수 있도록 운영 진입 장벽 낮추기',
        ],
      },
      {
        label: '구현',
        items: [
          'ES/InfluxDB/DB 조회 Tool을 에이전트가 상황에 맞게 선택·실행, 운영 문서는 임베딩 후 질의 시 유사 문서를 컨텍스트로 주입 (RAG)',
          '품질 관리를 위한 트레이싱 어드민 페이지 직접 구현 — 질문/응답, 참조 문서, 선택된 Tool을 기록',
          '누적 데이터를 통과/실패/애매로 분류하며 프롬프트 및 Tool 지속 개선',
        ],
      },
      {
        label: '성과',
        items: [
          '클로즈드 베타 운영 중, 월 약 120건이던 운영 문의가 거의 0건으로 감소',
          '개발자가 아닌 사업·운영 담당자도 시스템 상태를 직접 조회 가능 — 운영 진입 장벽 해소',
        ],
      },
    ],
  },
  {
    title: 'ALIO-API CPU 부하 개선',
    summary: 'BCrypt 인증 병목을 Thread Dump로 특정하고 HMAC+Redis 캐싱으로 전환',
    impact: 'CPU 사용률 76% 감소',
    tech: ['Redis', 'Spring Security', 'HMAC'],
    sections: [
      {
        label: '발견',
        items: [
          '운영 중 Linux top 명령어와 Zabbix로 Tomcat 워커 스레드 CPU 사용률 비정상 급등을 직접 발견',
          'Thread당 CPU 사용률 20~30%, 피크 시 100%까지 치솟는 현상 발생',
        ],
      },
      {
        label: '분석',
        items: [
          'Java Thread Dump 분석으로 BCrypt 암호화 작업이 Thread CPU를 장시간 점유하는 것을 특정',
          '개발 환경에서 동일 트래픽 패턴으로 재현 후 k6 성능 테스트로 BCrypt 우회 시 CPU 개선 확인',
          'BCrypt는 무작위 대입 공격 방지를 위해 의도적으로 대량 루프를 수행하는 구조',
          'SHA-256 전환 검토했으나 API Key 엔트로피가 낮아 무작위 공격에 취약 → HMAC 채택',
        ],
      },
      {
        label: '해결',
        items: [
          '최초 인증은 BCrypt 유지 (클라이언트 코드 수정 없음)',
          '인증 성공 시 서버 키로 HMAC 암호화하여 Redis에 저장, 이후 요청은 HMAC 기반 인증으로 전환',
          '서버 측 키를 활용하는 HMAC 방식으로 SHA-256의 무작위 공격 취약점을 방어',
        ],
      },
      {
        label: '성과',
        items: [
          'Thread당 CPU 사용률 30% → 7%로 감소 (약 76% 개선)',
          '피크 타임 CPU 100% 현상 해소',
        ],
      },
    ],
  },
  {
    title: 'TCP 통신 모듈 도메인 로직 분리',
    summary: '인터페이스 모듈과 핵심 도메인을 분리해 클라이언트 협업 없이 독립 배포 가능한 구조로 개선',
    impact: '3시간 배포 작업 → 독립 배포 가능',
    tech: ['Netty', 'TCP/IP'],
    sections: [
      {
        label: '발견',
        items: [
          '카카오 API 스펙에 필드가 추가되는 단순한 변경만으로도 TCP 전 프로세스 배포 필요, 클라이언트 측과 세션 재연결 조율에 최대 3시간 소요',
          '반복되는 장시간 배포 작업으로 피로가 누적되어, 언제든 장애로 이어질 수 있는 위험한 구조',
          '이대로면 언젠가 장애가 날 것이라는 확신으로 직접 개선 착수',
        ],
      },
      {
        label: '분석',
        items: [
          '무중단 배포를 검토했으나, TCP 연결 지향 특성상 한 인스턴스를 내리면 해당 클라이언트들이 살아있는 인스턴스로 집중 — 부하 불균형 발생 및 세션 재분배를 위한 전체 재기동 불가피',
          '코드 분석 결과, 인터페이스 모듈이 카카오 연동 규격 VO에 의존하고 있어 — 카카오 스펙 변경 시 인터페이스 모듈까지 함께 배포해야 하는 구조가 근본 원인',
          '카카오 도메인을 알 필요가 없는 프로세스가 카카오 스펙 변경에 결합되어 있는 구조',
        ],
      },
      {
        label: '해결',
        items: [
          '불편함을 지속적으로 공유하고, 3시간 배포 작업이 발생한 시점에 미리 구현해둔 프로토타입과 전수 테스트 자동화를 함께 제시하여 팀 설득',
          '응답 수신·결과 처리 프로세스는 내부 시스템 데이터만 검증하도록 정리, 불필요한 VO 변환 제거',
          '카카오 도메인 관련 VO 변환 및 도메인 로직은 클라이언트가 모르는 핵심 프로세스로 이동',
        ],
      },
      {
        label: '성과',
        items: [
          '카카오 스펙 변경 시 클라이언트 협업 없이 핵심 프로세스만 독립 배포 가능',
          '배포 난이도 대폭 감소 → 팀과 클라이언트 양쪽의 배포 기피 문화 해소',
          '전체 장애 확률 감소, 기능 개선 속도 향상',
        ],
      },
    ],
  },
  {
    title: 'ALIO-GW 애플리케이션 레벨 Failover 구현',
    summary: '수동 Failover 7~8분을 자동화하여 10~30초 내 전환, 실패율 50% → 5%로 감소',
    impact: '장애 대응 7~8분 → 10~30초',
    tech: ['Resilience4j', 'CircuitBreaker', 'RabbitMQ', 'Redis'],
    sections: [
      {
        label: '발견',
        items: [
          '카카오 한쪽 IDC에 실제 장애가 발생하여 해당 IDC를 바라보던 애플리케이션에서 발송량의 약 50% 실패',
          '전용선 환경이라 카카오 측에서 네트워크 레벨 Failover를 제공하지 않음',
          '장애 발생 시 개발자가 수동으로 트래픽 전환, 전환까지 7~8분 소요',
        ],
      },
      {
        label: '분석',
        items: [
          '전용선으로 IDC별 연결이 고정되어 있어 (안양 IDC선 / 가산 IDC선), L4/L7·DNS 기반 인프라 레벨 전환은 불가 — 앱이 자기 전용선 밖으로 나갈 수 없는 구조',
          '애플리케이션 레벨에서 직접 해결하는 방향으로 결정',
          '서비스 특성상 시간대별 트래픽 편차가 크므로 고정 임계값이 아닌 동적 임계값이 필요하다고 판단',
        ],
      },
      {
        label: '해결',
        items: [
          'Resilience4j Sliding Window로 실패율 실시간 집계, 시간대별 동적 임계값 적용',
          'Redis를 통해 각 IDC 상태(정상/장애) 공유·관리',
          '임계값 초과 시 CircuitBreaker 기반 트래픽 자동 전환',
          'RabbitMQ로 상태 변경 이벤트 브로드캐스트, 다수 모듈 Event-Driven 동시 전환',
        ],
      },
      {
        label: '성과',
        items: [
          '10~30초 이내 자동 Failover 전환 달성',
          '단일 IDC 장애 시 실패율 50% → 약 5%로 감소',
          '개발자 개입 불필요, 무중단에 가까운 서비스 연속성 확보',
        ],
      },
    ],
  },
  {
    title: '연동 규격서 자동화 및 커스텀 API 문서 시스템 구축',
    summary: '수동 작성 연동 규격서를 테스트 코드 기반으로 자동화하고, 클라이언트 피드백으로 커스텀 UI까지 직접 개발',
    impact: '규격서 작성·배포 공수 제거',
    tech: ['Spring REST Docs', 'OpenAPI'],
    sections: [
      {
        label: '발견',
        items: [
          '개발자가 수동으로 연동 규격서를 작성하다 보니 코드와 규격서가 달라지는 문제가 반복적으로 발생',
          '기능 개발 1주일 기준 규격서 작성·배포에 반나절 이상 소요',
        ],
      },
      {
        label: '해결',
        items: [
          'Spring REST Docs + OpenAPI 조합으로 테스트 코드에서 규격서를 자동 생성하는 파이프라인 구축',
          'ReDoc으로 규격서를 제공했으나 클라이언트 개발자들로부터 가독성 불만 및 API 직접 요청 불가 피드백 접수',
          '프론트 경험 없이 AI를 활용해 1주일 내에 커스텀 UI 직접 개발 — 개선된 디자인과 API 직접 요청 기능까지 구현',
        ],
      },
      {
        label: '성과',
        items: [
          '코드 변경 시 규격서가 자동으로 최신화 — 작성·배포 공수 완전 제거',
          '클라이언트 개발자 만족도 향상, 연동 과정의 커뮤니케이션 비용 감소',
        ],
      },
    ],
  },
  {
    title: 'ALIO-API 관심사 분리 구조 개선',
    summary: 'Spring AOP & Security 기반 관심사 분리로 정책 변경 공수 약 80% 절감',
    impact: '개발 공수 80% 절감',
    tech: ['Spring Security', 'Spring AOP', 'Bean Validation'],
    sections: [
      {
        label: '발견',
        items: [
          '검증/정책 관련 변경이 잦은 서비스에서, 변경 시 영향도 파악 자체가 매우 어려움',
          '검증 로직이 비즈니스 코드 곳곳에 흩어져 있어 "이걸 바꾸면 어디까지 영향이 가는지" 추적이 힘든 구조',
        ],
      },
      {
        label: '분석',
        items: [
          '인증/인가, 파라미터 검증, 비즈니스 검증이 모두 Service Layer에 혼재되어 있는 것이 근본 원인',
          '각 관심사를 적절한 레이어에 배치하면 변경 영향도가 해당 레이어로 한정된다고 판단',
        ],
      },
      {
        label: '해결',
        items: [
          '인증/인가: Spring Security를 도입하여 Filter 단계에서 API Key·권한 체크 관심사 분리',
          '파라미터 검증: Controller Layer에서 Bean Validation 기반 DTO 검증으로 분리',
          '비즈니스 검증: Service Layer에 적용되는 커스텀 어노테이션 + AOP로 공통 정책 로직 분리',
        ],
      },
      {
        label: '성과',
        items: [
          '정책/검증 변경 시 영향 범위가 해당 레이어로 한정, 영향도 파악이 명확해짐',
          '공통 정책 로직을 별도 테스트 대상으로 분리하여 유지 비용 감소',
          '동일 범위 변경 기준 개발 공수 약 80% 절감',
        ],
      },
    ],
  },
];

export const sideProjects = [
  {
    title: 'Houseping',
    description: [
      '청약 분양가와 주변 실거래가를 자동 비교해주는 실서비스 (house-ping.com)',
      '운영하며 4번의 아키텍처 진화 — Full Hexagonal에서 시작해 실용적인 5모듈 구조로 정착, 변경이 잦은 외부 연동에만 Port/Adapter를 적용하는 방식으로 복잡도와 유연성의 균형을 맞춤',
    ],
    tech: ['Java 21', 'Spring Boot', 'PostgreSQL', 'WebClient', 'Thymeleaf'],
    github: 'https://github.com/leeyunbo/house-ping',
    link: 'https://house-ping.com',
    live: true,
    diagram: '/diagrams/houseping.svg',
    diagramDark: '/diagrams/houseping.svg',
  },
  {
    title: 'Stock Briefing',
    description: [
      '총 10개 파이프라인(자동 9개·수동 1개)이 매일 데이터를 수집·분석·발행하는 AI 금융 미디어 자동화 시스템',
      '운영하며 문제를 발견하고 지속 개선 — ChromaDB 시맨틱 중복 제거로 콘텐츠 품질 향상, 트레이싱 대시보드로 LLM 품질 측정 기반 마련, 핫한 토픽을 우선순위 큐로 관리하는 토픽큐 도입',
    ],
    tech: ['Python', 'FastAPI', 'Claude API', 'Gemini API', 'ChromaDB', 'APScheduler'],
    github: 'https://github.com/leeyunbo/stock-briefing',
    link: 'https://dailymoneydive.com',
    live: true,
    diagram: '/diagrams/stock-briefing.svg',
    diagramDark: '/diagrams/stock-briefing.svg',
  },
];
