package toby.ai.tobyremider.service.ports.inp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import toby.ai.tobyremider.dto.ReminderRequest;
import toby.ai.tobyremider.dto.ReminderResponse;

import java.util.List;

public interface ReminderService {

    List<ReminderResponse> findAll();

    Page<ReminderResponse> findAll(Pageable pageable);

    ReminderResponse findById(Long id);

    List<ReminderResponse> findByListId(Long listId);

    ReminderResponse create(ReminderRequest request);

    ReminderResponse createInList(Long listId, ReminderRequest request);

    ReminderResponse update(Long id, ReminderRequest request);

    ReminderResponse toggleComplete(Long id);

    void delete(Long id);
}
