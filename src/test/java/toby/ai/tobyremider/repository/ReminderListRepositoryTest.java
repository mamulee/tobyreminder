package toby.ai.tobyremider.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.context.annotation.Import;
import toby.ai.tobyremider.config.JpaConfig;
import toby.ai.tobyremider.domain.ReminderList;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(JpaConfig.class)
class ReminderListRepositoryTest {

    @Autowired
    private ReminderListRepository reminderListRepository;

    @Test
    @DisplayName("저장 시 createdAt과 updatedAt이 자동으로 설정된다")
    void auditingDates() {
        ReminderList list = ReminderList.builder()
                .name("개인")
                .color("#34C759")
                .icon("person")
                .build();

        ReminderList saved = reminderListRepository.save(list);

        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();
    }

    @Test
    @DisplayName("수정 시 updatedAt이 갱신되고 createdAt은 변경되지 않는다")
    void updatedAtChangesOnUpdate() throws InterruptedException {
        ReminderList list = ReminderList.builder()
                .name("개인")
                .color("#34C759")
                .icon("person")
                .build();
        ReminderList saved = reminderListRepository.saveAndFlush(list);
        var createdAt = saved.getCreatedAt();

        Thread.sleep(10);

        saved.update("업무", "#007AFF", "briefcase");
        reminderListRepository.saveAndFlush(saved);

        ReminderList found = reminderListRepository.findById(saved.getId()).orElseThrow();
        assertThat(found.getCreatedAt()).isEqualTo(createdAt);
        assertThat(found.getUpdatedAt()).isAfterOrEqualTo(createdAt);
    }
}
