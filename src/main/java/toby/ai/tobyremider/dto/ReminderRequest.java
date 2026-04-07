package toby.ai.tobyremider.dto;

import jakarta.validation.constraints.NotBlank;
import toby.ai.tobyremider.domain.Priority;

import java.time.LocalDateTime;

public record ReminderRequest(
        @NotBlank(message = "제목은 필수입니다")
        String title,
        String memo,
        LocalDateTime dueDate,
        Priority priority,
        Boolean flagged
) {
}
