# Toby Reminder - Specification

## Overview
Apple Reminders 앱의 웹 버전 클론. 심플하고 직관적인 할 일 관리 서비스를 웹에서 제공한다.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 4.0.4, Java 25, Spring Data JPA, H2 |
| Frontend | Next.js (latest), TypeScript, Tailwind CSS |
| API | RESTful JSON API |

---

## Phase 1: Core (MVP)

### 1.1 리마인더 CRUD
- 리마인더 생성 / 조회 / 수정 / 삭제
- 필드: 제목, 메모, 마감일시, 우선순위(없음/낮음/중간/높음), 플래그, 완료 여부
- 완료 처리 (토글)

### 1.2 리스트 관리
- 리스트 생성 / 조회 / 수정 / 삭제
- 리스트별 색상 및 아이콘 설정
- 리마인더는 반드시 하나의 리스트에 소속

### 1.3 스마트 리스트 (시스템 기본 제공, 수정 불가)
| 스마트 리스트 | 필터 조건 |
|-------------|----------|
| 오늘 | 마감일이 오늘인 항목 |
| 예정 | 마감일이 설정된 미래 항목 (날짜별 그룹) |
| 전체 | 모든 미완료 항목 |
| 플래그 지정됨 | 플래그가 켜진 항목 |
| 완료됨 | 완료된 항목 |

### 1.4 UI/UX (Apple Reminders 준수)

#### 전체 레이아웃
- **2-column 레이아웃**: 좌측 사이드바 (280px) + 우측 메인 콘텐츠
- 배경색: 연한 회색 (#F2F2F7, Apple systemGroupedBackground)
- 폰트: SF Pro 계열 (-apple-system, BlinkMacSystemFont) 사용

#### 사이드바
- 상단: 검색 바 (돋보기 아이콘 + placeholder "검색")
- **스마트 리스트 그리드**: 2열 그리드, 각 항목은 둥근 카드 형태
  - 좌측 상단: 원형 아이콘 (색상별 배경)
  - 우측 상단: 리마인더 개수 (bold)
  - 하단: 리스트 이름
  - 카드 순서: 오늘 / 예정 / 전체 / 플래그 지정됨 / 완료됨
- **나의 목록** 섹션: 구분선 아래 세로 리스트
  - 각 항목: 색상 원형 아이콘 + 리스트 이름 + 우측에 개수
  - 하단: "+ 목록 추가" 버튼

#### 메인 콘텐츠 영역
- 상단: 리스트 제목 (리스트 색상, 굵은 대형 텍스트)
- 리마인더 목록: 흰색 라운드 카드 내부에 리스트 표시
  - 각 행: 좌측 원형 체크박스 (미완료: 빈 원, 완료: 채워진 원 + 체크) + 제목
  - 완료된 항목: 취소선 + 회색 텍스트
  - 우선순위 표시: 체크박스 테두리에 느낌표 (!) 개수로 표현
  - 플래그: 우측에 주황색 깃발 아이콘
  - 마감일: 제목 아래 작은 회색 텍스트
- 하단: "+ 새로운 미리 알림" 텍스트 버튼 (리스트 색상)

#### 리마인더 상세 편집
- 리마인더 클릭 시 우측에 디테일 패널 표시 (또는 인라인 확장)
- 편집 필드: 제목, 메모, URL, 마감일 토글+날짜 피커, 우선순위 드롭다운, 플래그 토글
- Apple 스타일 폼 UI: 그룹화된 라운드 카드, 토글 스위치

#### 리스트 생성/편집 모달
- 모달 다이얼로그: 리스트 이름 입력 + 색상 팔레트 (12색 원형 버튼) + 아이콘 그리드
- 색상 팔레트: 빨강, 주황, 노랑, 초록, 청록, 파랑, 남색, 보라, 분홍, 갈색, 회색 등

#### 인터랙션
- 체크박스 클릭 시 완료 애니메이션 (원형 채워지며 체크 표시, 0.3s 후 목록에서 fade-out)
- 리스트 항목 hover 시 배경 하이라이트
- 스마트 리스트 카드 클릭 시 선택 상태 표시 (테두리 강조)
- 리마인더 추가 시 인라인 입력 필드 활성화 (빈 행이 나타남)
- 삭제: 좌측 스와이프 또는 우클릭 컨텍스트 메뉴

---

## Phase 2: Enhanced

### 2.1 서브태스크
- 리마인더 하위에 서브태스크 추가/삭제
- 서브태스크 완료 처리

### 2.2 섹션
- 리스트 내 섹션(그룹) 생성/수정/삭제
- 리마인더를 섹션별로 분류
- 섹션 간 드래그 앤 드롭 이동

### 2.3 반복 리마인더
- 반복 주기: 매일 / 매주 / 매월 / 매년 / 사용자 지정
- 완료 시 다음 일정 자동 생성

### 2.4 정렬 및 검색
- 정렬: 마감일 / 우선순위 / 생성일 / 제목
- 전체 리마인더 대상 텍스트 검색

---

## Data Model

### ReminderList
| 필드 | 타입 | 설명 |
|------|------|------|
| id | Long | PK |
| name | String | 리스트 이름 |
| color | String | 색상 코드 (#hex) |
| icon | String | 아이콘 식별자 |
| createdAt | LocalDateTime | 생성일시 |
| updatedAt | LocalDateTime | 수정일시 |

### Reminder
| 필드 | 타입 | 설명 |
|------|------|------|
| id | Long | PK |
| title | String | 제목 |
| memo | String | 메모 (nullable) |
| dueDate | LocalDateTime | 마감일시 (nullable) |
| priority | Enum | NONE, LOW, MEDIUM, HIGH |
| flagged | Boolean | 플래그 여부 |
| completed | Boolean | 완료 여부 |
| completedAt | LocalDateTime | 완료일시 (nullable) |
| listId | Long | FK → ReminderList |
| parentId | Long | FK → Reminder (서브태스크용, nullable) |
| position | Integer | 정렬 순서 |
| createdAt | LocalDateTime | 생성일시 |
| updatedAt | LocalDateTime | 수정일시 |

---

## API Endpoints (Phase 1)

### Lists
| Method | Path | 설명 |
|--------|------|------|
| GET | /api/lists | 전체 리스트 조회 |
| POST | /api/lists | 리스트 생성 |
| PUT | /api/lists/{id} | 리스트 수정 |
| DELETE | /api/lists/{id} | 리스트 삭제 |

### Reminders
| Method | Path | 설명 |
|--------|------|------|
| GET | /api/lists/{listId}/reminders | 리스트별 리마인더 조회 |
| POST | /api/lists/{listId}/reminders | 리마인더 생성 |
| PUT | /api/reminders/{id} | 리마인더 수정 |
| PATCH | /api/reminders/{id}/complete | 완료 토글 |
| DELETE | /api/reminders/{id} | 리마인더 삭제 |

### Smart Lists
| Method | Path | 설명 |
|--------|------|------|
| GET | /api/reminders/today | 오늘 리마인더 |
| GET | /api/reminders/scheduled | 예정된 리마인더 |
| GET | /api/reminders/all | 전체 리마인더 |
| GET | /api/reminders/flagged | 플래그 리마인더 |
| GET | /api/reminders/completed | 완료된 리마인더 |

---

## 비기능 요구사항
- H2 인메모리 DB 사용 (개발 단계)
- API 응답 형식: JSON
- CORS 설정: Next.js 개발 서버 (localhost:3000) 허용
- 에러 응답 표준화 (status, message, timestamp)

---

## 개발 순서
1. **Backend Phase 1**: Entity, Repository, Service, Controller (리스트 + 리마인더 CRUD + 스마트 리스트)
2. **Frontend Phase 1**: Next.js 프로젝트 세팅 → 사이드바 + 리스트 뷰 + 리마인더 CRUD UI
3. **Backend Phase 2**: 서브태스크, 섹션, 반복, 검색/정렬
4. **Frontend Phase 2**: 서브태스크 UI, 섹션 UI, 드래그 앤 드롭, 검색
