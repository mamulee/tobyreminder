package toby.ai.tobyremider.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class ReminderTest {

    @Test
    @DisplayName("Builder로 Reminder를 생성할 수 있다")
    void createWithBuilder() {
        Reminder reminder = Reminder.builder()
                .title("우유 사기")
                .memo("저지방 우유")
                .build();

        assertThat(reminder.getTitle()).isEqualTo("우유 사기");
        assertThat(reminder.getMemo()).isEqualTo("저지방 우유");
        assertThat(reminder.isCompleted()).isFalse();
        assertThat(reminder.getCompletedAt()).isNull();
        assertThat(reminder.getPriority()).isEqualTo(Priority.NONE);
        assertThat(reminder.isFlagged()).isFalse();
        assertThat(reminder.getDueDate()).isNull();
    }

    @Test
    @DisplayName("모든 속성으로 Reminder를 생성할 수 있다")
    void createWithAllFields() {
        LocalDateTime dueDate = LocalDateTime.of(2026, 4, 10, 9, 0);
        Reminder reminder = Reminder.builder()
                .title("회의 참석")
                .memo("팀 회의")
                .dueDate(dueDate)
                .priority(Priority.HIGH)
                .flagged(true)
                .build();

        assertThat(reminder.getDueDate()).isEqualTo(dueDate);
        assertThat(reminder.getPriority()).isEqualTo(Priority.HIGH);
        assertThat(reminder.isFlagged()).isTrue();
    }

    @Test
    @DisplayName("update 메서드로 모든 속성을 변경할 수 있다")
    void update() {
        Reminder reminder = Reminder.builder()
                .title("우유 사기")
                .memo("저지방 우유")
                .build();

        LocalDateTime dueDate = LocalDateTime.of(2026, 4, 10, 9, 0);
        reminder.update("빵 사기", "식빵", dueDate, Priority.MEDIUM, true);

        assertThat(reminder.getTitle()).isEqualTo("빵 사기");
        assertThat(reminder.getMemo()).isEqualTo("식빵");
        assertThat(reminder.getDueDate()).isEqualTo(dueDate);
        assertThat(reminder.getPriority()).isEqualTo(Priority.MEDIUM);
        assertThat(reminder.isFlagged()).isTrue();
    }

    @Test
    @DisplayName("toggleComplete로 완료 상태를 토글할 수 있다")
    void toggleComplete() {
        Reminder reminder = Reminder.builder()
                .title("우유 사기")
                .build();

        reminder.toggleComplete();
        assertThat(reminder.isCompleted()).isTrue();
        assertThat(reminder.getCompletedAt()).isNotNull();

        reminder.toggleComplete();
        assertThat(reminder.isCompleted()).isFalse();
        assertThat(reminder.getCompletedAt()).isNull();
    }
}
