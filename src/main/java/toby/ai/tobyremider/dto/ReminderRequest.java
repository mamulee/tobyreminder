package toby.ai.tobyremider.dto;

import toby.ai.tobyremider.domain.Priority;

import java.time.LocalDateTime;

public record ReminderRequest(
        String title,
        String memo,
        LocalDateTime dueDate,
        Priority priority,
        Boolean flagged
) {
}
