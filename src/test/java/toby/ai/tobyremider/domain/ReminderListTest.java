package toby.ai.tobyremider.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ReminderListTest {

    @Test
    @DisplayName("Builder로 ReminderList를 생성할 수 있다")
    void createWithBuilder() {
        ReminderList list = ReminderList.builder()
                .name("장보기")
                .color("#FF3B30")
                .icon("cart")
                .build();

        assertThat(list.getName()).isEqualTo("장보기");
        assertThat(list.getColor()).isEqualTo("#FF3B30");
        assertThat(list.getIcon()).isEqualTo("cart");
    }

    @Test
    @DisplayName("color와 icon 없이 이름만으로 생성할 수 있다")
    void createWithNameOnly() {
        ReminderList list = ReminderList.builder()
                .name("개인")
                .build();

        assertThat(list.getName()).isEqualTo("개인");
        assertThat(list.getColor()).isNull();
        assertThat(list.getIcon()).isNull();
    }

    @Test
    @DisplayName("update 메서드로 이름, 색상, 아이콘을 변경할 수 있다")
    void update() {
        ReminderList list = ReminderList.builder()
                .name("장보기")
                .color("#FF3B30")
                .icon("cart")
                .build();

        list.update("업무", "#007AFF", "briefcase");

        assertThat(list.getName()).isEqualTo("업무");
        assertThat(list.getColor()).isEqualTo("#007AFF");
        assertThat(list.getIcon()).isEqualTo("briefcase");
    }
}
