package toby.ai.tobyremider.dto;

import toby.ai.tobyremider.domain.ReminderList;

import java.time.LocalDateTime;

public record ReminderListResponse(
        Long id,
        String name,
        String color,
        String icon,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ReminderListResponse from(ReminderList entity) {
        return new ReminderListResponse(
                entity.getId(),
                entity.getName(),
                entity.getColor(),
                entity.getIcon(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
