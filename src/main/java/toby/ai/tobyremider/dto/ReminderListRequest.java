package toby.ai.tobyremider.dto;

import jakarta.validation.constraints.NotBlank;

public record ReminderListRequest(
        @NotBlank(message = "이름은 필수입니다")
        String name,
        String color,
        String icon
) {
}
