# Coding Conventions

### Package Structure
```
toby.ai.tobyremider
├── domain/         # JPA 엔티티
├── repository/     # Spring Data JPA Repository
├── service/ports/inp/ # Service 인터페이스
├── service/        # Service 구현 클래스
├── controller/     # REST API Controller
├── dto/            # 요청/응답 DTO
└── config/         # 설정 클래스
```

### Service
- 인터페이스는 `service/ports/inp/` 패키지에 정의
- 구현 클래스는 `service/` 패키지에 `Default` 접두사 (예: `DefaultReminderListService`)
- 클래스 레벨 `@Transactional(readOnly = true)`, 쓰기 메서드만 `@Transactional`

### Test
- 기능 추가/수정 시 반드시 테스트 함께 작성
- 도메인 테스트: 순수 단위 테스트 (JPA/Spring 컨텍스트 없음)
- Service 테스트: `@SpringBootTest` + `@Transactional` 통합 테스트 (Mock 사용 금지)

## 참고 문서
- spec.md: 기능 명세
- plan.md: 개발 계획
- tasks.md: 구현 테스트 체크리스트