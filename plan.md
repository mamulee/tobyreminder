# Toby Reminder - Development Plan

## Tech Stack

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| Java | 25 | 언어 |
| Spring Boot | 4.0.4 | 프레임워크 |
| Spring Data JPA | - | ORM / Repository |
| H2 Database | - | 인메모리 DB (개발용) |
| Lombok | - | 보일러플레이트 제거 |
| Gradle (Kotlin DSL) | - | 빌드 도구 |

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | latest | React 프레임워크 |
| TypeScript | - | 타입 안전성 |
| Tailwind CSS | - | 스타일링 |

### 프로젝트 구조
```
tobyreminder/
├── src/                          # Spring Boot (Backend)
│   ├── main/java/toby/ai/tobyremider/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── entity/
│   │   ├── dto/
│   │   └── config/
│   └── main/resources/
│       └── application.yml
├── frontend/                     # Next.js (Frontend)
│   ├── app/
│   ├── components/
│   └── lib/
├── spec.md
└── plan.md
```

---

## Phase 1: Backend 기본 구조 + 리마인더 CRUD API

가장 단순한 형태의 API 서버. 리스트 없이 리마인더만 CRUD.

### Backend 작업
- [ ] `Reminder` Entity (id, title, memo, completed, createdAt, updatedAt)
- [ ] `ReminderRepository` (JpaRepository)
- [ ] `ReminderService` (CRUD 로직)
- [ ] `ReminderController` (REST API)
  - `GET /api/reminders` - 전체 조회
  - `POST /api/reminders` - 생성
  - `PUT /api/reminders/{id}` - 수정
  - `PATCH /api/reminders/{id}/complete` - 완료 토글
  - `DELETE /api/reminders/{id}` - 삭제
- [ ] CORS 설정 (`WebMvcConfigurer`)
- [ ] H2 콘솔로 데이터 확인

### 검증
- H2 콘솔에서 테이블 생성 확인
- curl 또는 Postman으로 CRUD 동작 확인

---

## Phase 2: Frontend 세팅 + 리마인더 목록 UI

Next.js 프로젝트 생성 후 리마인더 목록 표시와 추가/완료/삭제 기능.

### Frontend 작업
- [ ] Next.js 프로젝트 생성 (`frontend/`)
- [ ] Tailwind CSS 설정
- [ ] API 클라이언트 유틸 (`lib/api.ts`)
- [ ] 기본 레이아웃: 2-column (사이드바 placeholder + 메인 영역)
- [ ] 리마인더 목록 컴포넌트
  - 원형 체크박스 (Apple 스타일)
  - 완료 토글 (취소선 + fade-out 애니메이션)
  - "+ 새로운 미리 알림" 인라인 입력
- [ ] 리마인더 삭제 (컨텍스트 메뉴)

### 검증
- `npm run dev`로 localhost:3000 접속
- 리마인더 추가/완료/삭제 동작 확인

---

## Phase 3: 리스트 관리

리마인더를 리스트별로 분류.

### Backend 작업
- [ ] `ReminderList` Entity (id, name, color, icon, createdAt, updatedAt)
- [ ] `Reminder`에 `listId` FK 추가
- [ ] `ReminderListRepository`, `ReminderListService`, `ReminderListController`
  - `GET /api/lists`
  - `POST /api/lists`
  - `PUT /api/lists/{id}`
  - `DELETE /api/lists/{id}`
- [ ] 리마인더 API를 리스트 기반으로 변경
  - `GET /api/lists/{listId}/reminders`
  - `POST /api/lists/{listId}/reminders`

### Frontend 작업
- [ ] 사이드바: 나의 목록 리스트 (색상 원형 아이콘 + 이름 + 개수)
- [ ] "+ 목록 추가" 버튼
- [ ] 리스트 생성/편집 모달 (이름 + 색상 팔레트 12색 + 아이콘)
- [ ] 리스트 선택 시 해당 리마인더만 표시
- [ ] 메인 영역 상단: 리스트 제목 (리스트 색상)

### 검증
- 리스트 생성 → 리마인더 추가 → 리스트 전환 시 필터링 확인

---

## Phase 4: 리마인더 상세 속성

마감일, 우선순위, 플래그 등 리마인더 속성 확장.

### Backend 작업
- [ ] `Reminder` Entity에 필드 추가: dueDate, priority (Enum), flagged, completedAt
- [ ] `Priority` Enum: NONE, LOW, MEDIUM, HIGH

### Frontend 작업
- [ ] 리마인더 행에 마감일 표시 (제목 아래 회색 텍스트)
- [ ] 우선순위 표시 (체크박스 옆 느낌표 개수)
- [ ] 플래그 표시 (우측 주황색 깃발 아이콘)
- [ ] 리마인더 클릭 시 상세 편집 패널
  - 제목, 메모 편집
  - 마감일 토글 + 날짜 피커
  - 우선순위 드롭다운
  - 플래그 토글 스위치
  - Apple 스타일 그룹 카드 폼

### 검증
- 리마인더에 마감일/우선순위/플래그 설정 후 표시 확인

---

## Phase 5: 스마트 리스트

시스템 기본 필터 뷰 5종.

### Backend 작업
- [ ] 스마트 리스트 API 추가
  - `GET /api/reminders/today` - 마감일 = 오늘
  - `GET /api/reminders/scheduled` - 마감일 있는 미래 항목 (날짜별 그룹)
  - `GET /api/reminders/all` - 전체 미완료
  - `GET /api/reminders/flagged` - flagged = true
  - `GET /api/reminders/completed` - completed = true

### Frontend 작업
- [ ] 사이드바 상단: 스마트 리스트 2열 그리드 카드
  - 원형 아이콘 (색상별) + 개수 + 이름
  - 오늘(파랑) / 예정(빨강) / 전체(검정) / 플래그(주황) / 완료(회색)
- [ ] 스마트 리스트 선택 시 해당 필터 결과 표시
- [ ] "예정" 리스트: 날짜별 섹션 그룹핑

### 검증
- 다양한 속성의 리마인더 생성 후 각 스마트 리스트 필터 결과 확인

---

## Phase 6: 서브태스크

리마인더 하위에 체크리스트 형태의 서브태스크.

### Backend 작업
- [ ] `Reminder`에 `parentId` FK 추가 (self-referencing, nullable)
- [ ] 서브태스크 API
  - `POST /api/reminders/{id}/subtasks` - 서브태스크 생성
  - `GET /api/reminders/{id}/subtasks` - 서브태스크 조회

### Frontend 작업
- [ ] 상세 편집 패널에 서브태스크 섹션
- [ ] 서브태스크 추가/완료/삭제
- [ ] 리마인더 행에 서브태스크 개수 표시 (예: "0/3")

### 검증
- 리마인더에 서브태스크 추가 → 개별 완료 → 카운트 반영 확인

---

## Phase 7: 검색 + 정렬

### Backend 작업
- [ ] `GET /api/reminders/search?q={keyword}` - 제목/메모 검색
- [ ] 리마인더 조회 API에 정렬 파라미터 추가 (`sort=dueDate|priority|createdAt|title`)

### Frontend 작업
- [ ] 사이드바 상단 검색 바 활성화 (실시간 검색)
- [ ] 메인 영역 정렬 드롭다운 (마감일 / 우선순위 / 생성일 / 제목)

### 검증
- 검색어 입력 → 결과 필터링 확인
- 정렬 변경 → 목록 순서 반영 확인

---

## Phase 8: 섹션 + 반복 리마인더

### Backend 작업
- [ ] `Section` Entity (id, name, listId, position)
- [ ] `Reminder`에 `sectionId` FK 추가
- [ ] `Reminder`에 `recurrence` 필드 추가 (DAILY, WEEKLY, MONTHLY, YEARLY, CUSTOM)
- [ ] 반복 리마인더 완료 시 다음 일정 자동 생성 로직

### Frontend 작업
- [ ] 리스트 내 섹션 헤더 표시 + 섹션 추가/편집/삭제
- [ ] 섹션 간 드래그 앤 드롭 이동
- [ ] 상세 편집 패널에 반복 설정 UI

### 검증
- 섹션 생성 → 리마인더 섹션 간 이동 확인
- 반복 리마인더 완료 → 다음 일정 자동 생성 확인
