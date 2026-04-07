# Toby Reminder - Tasks

## Phase 1: Backend 기본 구조 + 리마인더 CRUD API

### Backend
- [x] `Reminder` Entity 생성 (id, title, memo, completed, createdAt, updatedAt)
- [x] `ReminderRepository` 생성 (JpaRepository 상속)
- [x] `ReminderDto` 생성 (요청/응답 DTO)
- [x] `ReminderService` 생성 (CRUD 비즈니스 로직)
- [x] `ReminderController` 생성
  - [x] `GET /api/reminders` — 전체 조회
  - [x] `POST /api/reminders` — 생성
  - [x] `PUT /api/reminders/{id}` — 수정
  - [x] `PATCH /api/reminders/{id}/complete` — 완료 토글
  - [x] `DELETE /api/reminders/{id}` — 삭제
- [x] `WebConfig` CORS 설정 (localhost:3000 허용)
- [x] 글로벌 예외 처리 (`@RestControllerAdvice`)

### 검증
- [x] `./gradlew build` 빌드 성공
- [x] H2 콘솔에서 REMINDER 테이블 확인
- [x] curl로 CRUD 5개 엔드포인트 동작 확인

---

## Phase 2: Frontend 세팅 + 리마인더 목록 UI

### 프로젝트 세팅
- [x] `frontend/` 디렉토리에 Next.js 프로젝트 생성 (TypeScript)
- [x] Tailwind CSS 설정
- [x] Apple 시스템 폰트 설정 (-apple-system, BlinkMacSystemFont)
- [x] API 클라이언트 유틸 생성 (`lib/api.ts` — fetch wrapper, base URL 설정)

### 레이아웃
- [x] 루트 레이아웃 구성 (배경색 #F2F2F7)
- [x] 2-column 레이아웃 (사이드바 280px + 메인 영역)
- [x] 사이드바 placeholder (추후 스마트 리스트/목록 추가)

### 리마인더 목록 컴포넌트
- [x] `ReminderList` 컴포넌트 — 리마인더 목록 표시 (흰색 라운드 카드)
- [x] `ReminderItem` 컴포넌트 — 개별 리마인더 행
  - [x] 원형 체크박스 (미완료: 빈 원, 완료: 채워진 원 + 체크마크)
  - [x] 완료 시 취소선 + 회색 텍스트 + 0.3s fade-out 애니메이션
- [x] "+ 새로운 미리 알림" 버튼 → 인라인 입력 필드 활성화
- [x] 리마인더 삭제 (우클릭 컨텍스트 메뉴 또는 삭제 버튼)

### 검증
- [x] `npm run dev` → localhost:3000 접속 확인
- [x] 리마인더 추가 → 목록에 표시
- [x] 체크박스 클릭 → 완료 처리 + 애니메이션
- [x] 삭제 동작 확인

---

## Phase 3: 리스트 관리

### Backend
- [ ] `ReminderList` Entity 생성 (id, name, color, icon, createdAt, updatedAt)
- [ ] `Reminder` Entity에 `list` 연관관계 추가 (`@ManyToOne`)
- [ ] `ReminderListRepository` 생성
- [ ] `ReminderListDto` 생성
- [ ] `ReminderListService` 생성
- [ ] `ReminderListController` 생성
  - [ ] `GET /api/lists` — 전체 리스트 조회 (각 리스트별 리마인더 개수 포함)
  - [ ] `POST /api/lists` — 리스트 생성
  - [ ] `PUT /api/lists/{id}` — 리스트 수정
  - [ ] `DELETE /api/lists/{id}` — 리스트 삭제 (소속 리마인더 함께 삭제)
- [ ] 리마인더 API 수정
  - [ ] `GET /api/lists/{listId}/reminders` — 리스트별 리마인더 조회
  - [ ] `POST /api/lists/{listId}/reminders` — 리스트에 리마인더 생성

### Frontend
- [ ] 사이드바 "나의 목록" 섹션
  - [ ] 리스트 항목 표시 (색상 원형 아이콘 + 이름 + 리마인더 개수)
  - [ ] 리스트 클릭 시 선택 상태 하이라이트
- [ ] "+ 목록 추가" 버튼
- [ ] 리스트 생성/편집 모달
  - [ ] 리스트 이름 입력
  - [ ] 색상 팔레트 (12색 원형 버튼)
  - [ ] 아이콘 선택 그리드
- [ ] 리스트 삭제 (컨텍스트 메뉴)
- [ ] 메인 영역 상단: 리스트 제목 (리스트 색상, 굵은 대형 텍스트)
- [ ] 리스트 선택 시 해당 리마인더만 필터링 표시

### 검증
- [ ] 리스트 생성 → 색상/아이콘 설정 확인
- [ ] 리스트에 리마인더 추가 → 리스트 전환 시 필터링 확인
- [ ] 리스트 삭제 → 소속 리마인더 함께 삭제 확인

---

## Phase 4: 리마인더 상세 속성

### Backend
- [ ] `Priority` Enum 생성 (NONE, LOW, MEDIUM, HIGH)
- [ ] `Reminder` Entity에 필드 추가
  - [ ] `dueDate` (LocalDateTime, nullable)
  - [ ] `priority` (Priority Enum)
  - [ ] `flagged` (Boolean)
  - [ ] `completedAt` (LocalDateTime, nullable)
- [ ] DTO 업데이트

### Frontend — 목록 표시 강화
- [ ] 마감일 표시 (제목 아래 작은 회색 텍스트)
- [ ] 우선순위 표시 (체크박스 옆 느낌표 개수: ! / !! / !!!)
- [ ] 플래그 표시 (행 우측 주황색 깃발 아이콘)

### Frontend — 상세 편집 패널
- [ ] 리마인더 클릭 시 우측 디테일 패널 열기
- [ ] 제목 편집 (인라인)
- [ ] 메모 편집 (textarea)
- [ ] 마감일 토글 스위치 + 날짜/시간 피커
- [ ] 우선순위 드롭다운 (없음/낮음/중간/높음)
- [ ] 플래그 토글 스위치
- [ ] Apple 스타일 폼: 그룹화된 라운드 카드 + 토글 스위치

### 검증
- [ ] 리마인더에 마감일 설정 → 목록에 날짜 표시 확인
- [ ] 우선순위 HIGH 설정 → !!! 표시 확인
- [ ] 플래그 ON → 깃발 아이콘 표시 확인
- [ ] 상세 패널에서 수정 → 저장 반영 확인

---

## Phase 5: 스마트 리스트

### Backend
- [ ] `ReminderController`에 스마트 리스트 API 추가
  - [ ] `GET /api/reminders/today` — dueDate가 오늘인 미완료 항목
  - [ ] `GET /api/reminders/scheduled` — dueDate가 있는 미래 항목 (날짜별 그룹)
  - [ ] `GET /api/reminders/all` — 전체 미완료 항목
  - [ ] `GET /api/reminders/flagged` — flagged = true인 미완료 항목
  - [ ] `GET /api/reminders/completed` — completed = true인 항목
- [ ] `ReminderRepository`에 쿼리 메서드 추가

### Frontend
- [ ] 사이드바 상단: 스마트 리스트 2열 그리드 카드
  - [ ] 오늘 (파랑 아이콘)
  - [ ] 예정 (빨강 아이콘)
  - [ ] 전체 (검정 아이콘)
  - [ ] 플래그 지정됨 (주황 아이콘)
  - [ ] 완료됨 (회색 아이콘)
  - [ ] 각 카드: 원형 아이콘 + 개수(bold) + 이름
- [ ] 스마트 리스트 카드 클릭 시 선택 상태 (테두리 강조)
- [ ] 선택된 스마트 리스트의 필터 결과를 메인 영역에 표시
- [ ] "예정" 리스트: 날짜별 섹션 헤더로 그룹핑

### 검증
- [ ] 오늘 마감인 리마인더 생성 → "오늘" 스마트 리스트에 표시 확인
- [ ] 플래그 설정 → "플래그 지정됨" 스마트 리스트에 표시 확인
- [ ] 완료 처리 → "완료됨" 스마트 리스트에 이동 확인
- [ ] 각 카드의 개수 실시간 반영 확인

---

## Phase 6: 서브태스크

### Backend
- [ ] `Reminder` Entity에 `parent` 자기참조 추가 (`@ManyToOne`, nullable)
- [ ] `Reminder` Entity에 `subtasks` 추가 (`@OneToMany`)
- [ ] 서브태스크 API
  - [ ] `POST /api/reminders/{id}/subtasks` — 서브태스크 생성
  - [ ] `GET /api/reminders/{id}/subtasks` — 서브태스크 목록 조회
  - [ ] `DELETE /api/reminders/{id}/subtasks/{subtaskId}` — 서브태스크 삭제

### Frontend
- [ ] 상세 편집 패널에 "하위 작업" 섹션 추가
  - [ ] 서브태스크 목록 (체크박스 + 제목)
  - [ ] "+ 하위 작업 추가" 입력 필드
  - [ ] 서브태스크 완료 토글
  - [ ] 서브태스크 삭제
- [ ] 리마인더 목록 행에 서브태스크 카운트 표시 (예: "1/3")

### 검증
- [ ] 리마인더에 서브태스크 3개 추가 → "0/3" 표시 확인
- [ ] 서브태스크 1개 완료 → "1/3" 반영 확인
- [ ] 서브태스크 삭제 → 카운트 감소 확인

---

## Phase 7: 검색 + 정렬

### Backend
- [ ] `GET /api/reminders/search?q={keyword}` — 제목+메모 LIKE 검색
- [ ] 리마인더 조회 API에 `sort` 파라미터 추가
  - [ ] `sort=dueDate` — 마감일 순
  - [ ] `sort=priority` — 우선순위 순
  - [ ] `sort=createdAt` — 생성일 순
  - [ ] `sort=title` — 제목 순

### Frontend
- [ ] 사이드바 상단 검색 바 구현
  - [ ] 돋보기 아이콘 + placeholder "검색"
  - [ ] 입력 시 실시간 검색 (debounce 300ms)
  - [ ] 검색 결과를 메인 영역에 표시
- [ ] 메인 영역 상단 정렬 드롭다운
  - [ ] 마감일 / 우선순위 / 생성일 / 제목 선택
  - [ ] 선택 시 목록 재정렬

### 검증
- [ ] "회의" 검색 → 제목/메모에 "회의" 포함된 항목만 표시 확인
- [ ] 우선순위 정렬 → HIGH → MEDIUM → LOW → NONE 순서 확인
- [ ] 마감일 정렬 → 가까운 날짜부터 표시 확인

---

## Phase 8: 섹션 + 반복 리마인더

### Backend — 섹션
- [ ] `Section` Entity 생성 (id, name, listId, position, createdAt, updatedAt)
- [ ] `Reminder` Entity에 `section` 연관관계 추가 (`@ManyToOne`, nullable)
- [ ] `SectionRepository`, `SectionService` 생성
- [ ] 섹션 API
  - [ ] `GET /api/lists/{listId}/sections` — 섹션 목록 조회
  - [ ] `POST /api/lists/{listId}/sections` — 섹션 생성
  - [ ] `PUT /api/sections/{id}` — 섹션 수정
  - [ ] `DELETE /api/sections/{id}` — 섹션 삭제
  - [ ] `PATCH /api/reminders/{id}/section` — 리마인더 섹션 이동

### Backend — 반복 리마인더
- [ ] `Recurrence` Enum 생성 (DAILY, WEEKLY, MONTHLY, YEARLY)
- [ ] `Reminder` Entity에 `recurrence` 필드 추가 (nullable)
- [ ] 반복 리마인더 완료 처리 로직: 완료 시 다음 일정의 새 리마인더 자동 생성

### Frontend — 섹션
- [ ] 리스트 뷰에서 섹션 헤더 표시 (접기/펼치기)
- [ ] "+ 섹션 추가" 버튼
- [ ] 섹션 이름 편집 (인라인)
- [ ] 섹션 삭제 (컨텍스트 메뉴)
- [ ] 리마인더를 섹션 간 드래그 앤 드롭 이동

### Frontend — 반복 리마인더
- [ ] 상세 편집 패널에 반복 설정 UI
  - [ ] 반복 토글 스위치
  - [ ] 주기 선택 (매일/매주/매월/매년)
- [ ] 리마인더 행에 반복 아이콘 표시

### 검증
- [ ] 섹션 생성 → 리마인더를 섹션에 배치 → 섹션 간 이동 확인
- [ ] 섹션 접기/펼치기 동작 확인
- [ ] 반복(매일) 리마인더 완료 → 내일 날짜로 새 리마인더 자동 생성 확인
- [ ] 반복(매주) 리마인더 완료 → 다음 주 날짜로 새 리마인더 자동 생성 확인
