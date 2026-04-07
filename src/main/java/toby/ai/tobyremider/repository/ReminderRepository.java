package toby.ai.tobyremider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import toby.ai.tobyremider.domain.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
}
