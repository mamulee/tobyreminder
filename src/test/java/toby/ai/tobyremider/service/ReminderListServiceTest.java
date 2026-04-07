package toby.ai.tobyremider.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import toby.ai.tobyremider.dto.ReminderListRequest;
import toby.ai.tobyremider.dto.ReminderListResponse;
import toby.ai.tobyremider.service.ports.inp.ReminderListService;

import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class ReminderListServiceTest {

    @Autowired
    private ReminderListService reminderListService;

    private ReminderListResponse savedList;

    @BeforeEach
    void setUp() {
        savedList = reminderListService.create(
                new ReminderListRequest("장보기", "#FF3B30", "cart"));
    }

    @Test
    @DisplayName("새 리스트를 생성한다")
    void create() {
        ReminderListRequest request = new ReminderListRequest("업무", "#007AFF", "briefcase");

        ReminderListResponse result = reminderListService.create(request);

        assertThat(result.id()).isNotNull();
        assertThat(result.name()).isEqualTo("업무");
        assertThat(result.color()).isEqualTo("#007AFF");
        assertThat(result.icon()).isEqualTo("briefcase");
    }

    @Test
    @DisplayName("전체 리스트를 조회한다")
    void findAll() {
        reminderListService.create(new ReminderListRequest("업무", "#007AFF", "briefcase"));

        var result = reminderListService.findAll();

        assertThat(result).hasSize(2);
    }

    @Test
    @DisplayName("ID로 리스트를 조회한다")
    void findById() {
        ReminderListResponse result = reminderListService.findById(savedList.id());

        assertThat(result.name()).isEqualTo("장보기");
        assertThat(result.color()).isEqualTo("#FF3B30");
    }

    @Test
    @DisplayName("존재하지 않는 ID 조회 시 예외가 발생한다")
    void findByIdNotFound() {
        assertThatThrownBy(() -> reminderListService.findById(999L))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    @DisplayName("리스트를 수정한다")
    void update() {
        ReminderListResponse result = reminderListService.update(
                savedList.id(), new ReminderListRequest("업무", "#007AFF", "briefcase"));

        assertThat(result.name()).isEqualTo("업무");
        assertThat(result.color()).isEqualTo("#007AFF");
        assertThat(result.icon()).isEqualTo("briefcase");
    }

    @Test
    @DisplayName("리스트를 삭제한다")
    void delete() {
        reminderListService.delete(savedList.id());

        assertThatThrownBy(() -> reminderListService.findById(savedList.id()))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    @DisplayName("존재하지 않는 리스트 삭제 시 예외가 발생한다")
    void deleteNotFound() {
        assertThatThrownBy(() -> reminderListService.delete(999L))
                .isInstanceOf(NoSuchElementException.class);
    }
}
