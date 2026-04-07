package toby.ai.tobyremider.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
    }

    @Test
    @DisplayName("memo 없이 제목만으로 생성할 수 있다")
    void createWithTitleOnly() {
        Reminder reminder = Reminder.builder()
                .title("회의 참석")
                .build();

        assertThat(reminder.getTitle()).isEqualTo("회의 참석");
        assertThat(reminder.getMemo()).isNull();
    }

    @Test
    @DisplayName("update 메서드로 제목과 메모를 변경할 수 있다")
    void update() {
        Reminder reminder = Reminder.builder()
                .title("우유 사기")
                .memo("저지방 우유")
                .build();

        reminder.update("빵 사기", "식빵");

        assertThat(reminder.getTitle()).isEqualTo("빵 사기");
        assertThat(reminder.getMemo()).isEqualTo("식빵");
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
