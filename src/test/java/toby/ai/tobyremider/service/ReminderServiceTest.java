package toby.ai.tobyremider.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import toby.ai.tobyremider.dto.ReminderRequest;
import toby.ai.tobyremider.dto.ReminderResponse;
import toby.ai.tobyremider.service.ports.inp.ReminderService;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class ReminderServiceTest {

    @Autowired
    private ReminderService reminderService;

    private ReminderResponse savedReminder;

    @BeforeEach
    void setUp() {
        savedReminder = reminderService.create(new ReminderRequest("우유 사기", "저지방 우유"));
    }

    @Test
    @DisplayName("새 리마인더를 생성한다")
    void create() {
        ReminderResponse result = reminderService.create(new ReminderRequest("빵 사기", "식빵"));

        assertThat(result.id()).isNotNull();
        assertThat(result.title()).isEqualTo("빵 사기");
        assertThat(result.memo()).isEqualTo("식빵");
        assertThat(result.completed()).isFalse();
    }

    @Test
    @DisplayName("전체 리마인더를 조회한다")
    void findAll() {
        reminderService.create(new ReminderRequest("빵 사기", null));

        var result = reminderService.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    @DisplayName("ID로 리마인더를 조회한다")
    void findById() {
        ReminderResponse result = reminderService.findById(savedReminder.id());

        assertThat(result.title()).isEqualTo("우유 사기");
        assertThat(result.memo()).isEqualTo("저지방 우유");
    }

    @Test
    @DisplayName("존재하지 않는 ID 조회 시 예외가 발생한다")
    void findByIdNotFound() {
        assertThatThrownBy(() -> reminderService.findById(999L))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    @DisplayName("리마인더를 수정한다")
    void update() {
        ReminderResponse result = reminderService.update(
                savedReminder.id(), new ReminderRequest("빵 사기", "식빵"));

        assertThat(result.title()).isEqualTo("빵 사기");
        assertThat(result.memo()).isEqualTo("식빵");
    }

    @Test
    @DisplayName("완료 상태를 토글한다")
    void toggleComplete() {
        ReminderResponse completed = reminderService.toggleComplete(savedReminder.id());
        assertThat(completed.completed()).isTrue();
        assertThat(completed.completedAt()).isNotNull();

        ReminderResponse uncompleted = reminderService.toggleComplete(savedReminder.id());
        assertThat(uncompleted.completed()).isFalse();
        assertThat(uncompleted.completedAt()).isNull();
    }

    @Test
    @DisplayName("리마인더를 삭제한다")
    void delete() {
        reminderService.delete(savedReminder.id());

        assertThatThrownBy(() -> reminderService.findById(savedReminder.id()))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    @DisplayName("존재하지 않는 리마인더 삭제 시 예외가 발생한다")
    void deleteNotFound() {
        assertThatThrownBy(() -> reminderService.delete(999L))
                .isInstanceOf(NoSuchElementException.class);
    }
}
