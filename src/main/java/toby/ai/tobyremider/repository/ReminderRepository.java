package toby.ai.tobyremider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import toby.ai.tobyremider.domain.Reminder;

import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByListId(Long listId);
}
