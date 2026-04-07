package toby.ai.tobyremider.service.ports.inp;

import toby.ai.tobyremider.dto.ReminderListRequest;
import toby.ai.tobyremider.dto.ReminderListResponse;

import java.util.List;

public interface ReminderListService {

    List<ReminderListResponse> findAll();

    ReminderListResponse findById(Long id);

    ReminderListResponse create(ReminderListRequest request);

    ReminderListResponse update(Long id, ReminderListRequest request);

    void delete(Long id);
}
