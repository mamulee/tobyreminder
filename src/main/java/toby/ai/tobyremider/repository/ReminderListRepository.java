package toby.ai.tobyremider.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import toby.ai.tobyremider.domain.ReminderList;

public interface ReminderListRepository extends JpaRepository<ReminderList, Long> {
}
