package toby.ai.tobyremider.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import toby.ai.tobyremider.domain.Reminder;
import toby.ai.tobyremider.dto.ReminderRequest;
import toby.ai.tobyremider.dto.ReminderResponse;
import toby.ai.tobyremider.repository.ReminderRepository;
import toby.ai.tobyremider.service.ports.inp.ReminderService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DefaultReminderService implements ReminderService {

    private final ReminderRepository reminderRepository;

    @Override
    public List<ReminderResponse> findAll() {
        return reminderRepository.findAll().stream()
                .map(ReminderResponse::from)
                .toList();
    }

    @Override
    public ReminderResponse findById(Long id) {
        return ReminderResponse.from(getById(id));
    }

    @Override
    @Transactional
    public ReminderResponse create(ReminderRequest request) {
        Reminder reminder = Reminder.builder()
                .title(request.title())
                .memo(request.memo())
                .build();
        return ReminderResponse.from(reminderRepository.save(reminder));
    }

    @Override
    @Transactional
    public ReminderResponse update(Long id, ReminderRequest request) {
        Reminder reminder = getById(id);
        reminder.update(request.title(), request.memo());
        return ReminderResponse.from(reminder);
    }

    @Override
    @Transactional
    public ReminderResponse toggleComplete(Long id) {
        Reminder reminder = getById(id);
        reminder.toggleComplete();
        return ReminderResponse.from(reminder);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Reminder reminder = getById(id);
        reminderRepository.delete(reminder);
    }

    private Reminder getById(Long id) {
        return reminderRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reminder not found: " + id));
    }
}
