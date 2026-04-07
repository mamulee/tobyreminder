package toby.ai.tobyremider.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String memo;

    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private boolean flagged;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private ReminderList list;

    private boolean completed;

    private LocalDateTime completedAt;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Builder
    public Reminder(String title, String memo, LocalDateTime dueDate, Priority priority, boolean flagged, ReminderList list) {
        this.title = title;
        this.memo = memo;
        this.dueDate = dueDate;
        this.priority = priority != null ? priority : Priority.NONE;
        this.flagged = flagged;
        this.list = list;
        this.completed = false;
    }

    public void update(String title, String memo, LocalDateTime dueDate, Priority priority, boolean flagged) {
        this.title = title;
        this.memo = memo;
        this.dueDate = dueDate;
        this.priority = priority != null ? priority : Priority.NONE;
        this.flagged = flagged;
    }

    public void toggleComplete() {
        this.completed = !this.completed;
        this.completedAt = this.completed ? LocalDateTime.now() : null;
    }
}
