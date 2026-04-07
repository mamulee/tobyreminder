# Code Review Fix Tasks

## Priority: High

### Backend
- [x] DTO에 `@NotBlank` 검증 추가 (`ReminderRequest.title`, `ReminderListRequest.name`)
- [x] Controller에 `@Valid` 어노테이션 추가
- [x] GlobalExceptionHandler에 `MethodArgumentNotValidException` 핸들러 추가 (400 응답)
- [x] ReminderList 삭제 시 소속 Reminder cascade 삭제 처리
- [x] `createInList`, `findByListId` 통합 테스트 추가

### Frontend
- [x] ListModal `submitted` 상태 리셋 버그 수정 (모달 재오픈 시 생성 불가 문제)

---

## Priority: Medium

### Backend
- [x] GlobalExceptionHandler에 `DataIntegrityViolationException` 핸들러 추가 (409 응답)
- [x] GlobalExceptionHandler에 `HttpMessageNotReadableException` 핸들러 추가 (400 응답)
- [x] H2 콘솔을 dev 프로파일에서만 활성화 (`application-dev.yml` 분리)
- [x] CORS `allowedHeaders`를 명시적 헤더로 제한 (`Content-Type`, `Accept`)

### Frontend
- [x] API 에러 시 사용자 피드백 표시 (에러 상태 + UI 메시지)
- [x] page.tsx의 lists 로딩과 Sidebar의 lists 로딩 중복 제거
- [x] page.tsx `useEffect` 의존성에서 `selectedListId` 제거 (불필요한 재조회 방지)
- [x] ReminderItem 체크박스에 `aria-label`, `role="checkbox"`, `aria-checked` 추가
- [x] ListModal에 `role="dialog"`, `aria-modal="true"`, `aria-labelledby` 추가
- [x] `priorityMarker` 함수 파라미터 타입을 `string` → `Priority`로 변경
- [x] `api.ts` BASE_URL을 환경변수(`NEXT_PUBLIC_API_URL`)로 변경

---

## Priority: Low

### Backend
- [ ] 리마인더 목록 조회 API에 페이징 지원 추가 (`Pageable`)
- [ ] `Reminder.list` 조회 시 N+1 방지를 위한 `@EntityGraph` 적용 검토
- [ ] Entity 문자열 필드에 length 제약 추가 (`@Column(length = ...)`)
- [ ] `NoSuchElementException` 대신 커스텀 예외 클래스 도입 검토

### Frontend
- [ ] 리마인더 추가/삭제/완료 시 낙관적 업데이트 적용 (전체 재조회 제거)
- [ ] 날짜 포맷에 `Intl.DateTimeFormat` 사용 (로케일 대응)
- [ ] ReminderItem, Sidebar 리스트 항목에 키보드 내비게이션 지원 (`onKeyDown`)
- [ ] ReminderDetail 저장 성공/실패 시 시각적 피드백 추가
- [ ] `api.ts`의 `return undefined as T` 타입 안전성 개선
