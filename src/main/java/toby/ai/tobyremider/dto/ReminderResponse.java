package toby.ai.tobyremider.dto;

import toby.ai.tobyremider.domain.Priority;
import toby.ai.tobyremider.domain.Reminder;

import java.time.LocalDateTime;

public record ReminderResponse(
        Long id,
        String title,
        String memo,
        LocalDateTime dueDate,
        Priority priority,
        boolean flagged,
        boolean completed,
        LocalDateTime completedAt,
        Long listId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ReminderResponse from(Reminder entity) {
        return new ReminderResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getMemo(),
                entity.getDueDate(),
                entity.getPriority(),
                entity.isFlagged(),
                entity.isCompleted(),
                entity.getCompletedAt(),
                entity.getList() != null ? entity.getList().getId() : null,
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
