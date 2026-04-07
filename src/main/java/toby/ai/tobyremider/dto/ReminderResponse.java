package toby.ai.tobyremider.dto;

import toby.ai.tobyremider.domain.Reminder;

import java.time.LocalDateTime;

public record ReminderResponse(
        Long id,
        String title,
        String memo,
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
                entity.isCompleted(),
                entity.getCompletedAt(),
                entity.getList() != null ? entity.getList().getId() : null,
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
