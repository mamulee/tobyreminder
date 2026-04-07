package toby.ai.tobyremider.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import toby.ai.tobyremider.dto.ReminderRequest;
import toby.ai.tobyremider.dto.ReminderResponse;
import toby.ai.tobyremider.service.ports.inp.ReminderService;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ReminderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ReminderService reminderService;

    private ReminderResponse savedReminder;

    @BeforeEach
    void setUp() {
        savedReminder = reminderService.create(new ReminderRequest("우유 사기", "저지방 우유"));
    }

    @Test
    @DisplayName("GET /api/reminders — 전체 리마인더를 조회한다")
    void findAll() throws Exception {
        mockMvc.perform(get("/api/reminders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("우유 사기"));
    }

    @Test
    @DisplayName("GET /api/reminders/{id} — ID로 리마인더를 조회한다")
    void findById() throws Exception {
        mockMvc.perform(get("/api/reminders/{id}", savedReminder.id()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("우유 사기"))
                .andExpect(jsonPath("$.memo").value("저지방 우유"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    @DisplayName("GET /api/reminders/{id} — 존재하지 않는 ID 조회 시 404를 반환한다")
    void findByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/reminders/{id}", 999L))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/reminders — 새 리마인더를 생성한다")
    void create() throws Exception {
        ReminderRequest request = new ReminderRequest("빵 사기", "식빵");

        mockMvc.perform(post("/api/reminders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.title").value("빵 사기"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    @DisplayName("PUT /api/reminders/{id} — 리마인더를 수정한다")
    void update() throws Exception {
        ReminderRequest request = new ReminderRequest("빵 사기", "식빵");

        mockMvc.perform(put("/api/reminders/{id}", savedReminder.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("빵 사기"))
                .andExpect(jsonPath("$.memo").value("식빵"));
    }

    @Test
    @DisplayName("PATCH /api/reminders/{id}/complete — 완료 상태를 토글한다")
    void toggleComplete() throws Exception {
        mockMvc.perform(patch("/api/reminders/{id}/complete", savedReminder.id()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true))
                .andExpect(jsonPath("$.completedAt").isNotEmpty());
    }

    @Test
    @DisplayName("DELETE /api/reminders/{id} — 리마인더를 삭제한다")
    void deleteReminder() throws Exception {
        mockMvc.perform(delete("/api/reminders/{id}", savedReminder.id()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/reminders/{id}", savedReminder.id()))
                .andExpect(status().isNotFound());
    }
}
