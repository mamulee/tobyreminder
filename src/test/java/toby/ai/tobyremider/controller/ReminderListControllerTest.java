package toby.ai.tobyremider.controller;

import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import toby.ai.tobyremider.dto.ReminderListRequest;
import toby.ai.tobyremider.dto.ReminderListResponse;
import toby.ai.tobyremider.service.ports.inp.ReminderListService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ReminderListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ReminderListService reminderListService;

    private ReminderListResponse savedList;

    @BeforeEach
    void setUp() {
        savedList = reminderListService.create(
                new ReminderListRequest("장보기", "#FF3B30", "cart"));
    }

    @Test
    @DisplayName("GET /api/lists — 전체 리스트를 조회한다")
    void findAll() throws Exception {
        mockMvc.perform(get("/api/lists"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("장보기"));
    }

    @Test
    @DisplayName("GET /api/lists/{id} — ID로 리스트를 조회한다")
    void findById() throws Exception {
        mockMvc.perform(get("/api/lists/{id}", savedList.id()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("장보기"))
                .andExpect(jsonPath("$.color").value("#FF3B30"))
                .andExpect(jsonPath("$.icon").value("cart"));
    }

    @Test
    @DisplayName("GET /api/lists/{id} — 존재하지 않는 ID 조회 시 404를 반환한다")
    void findByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/lists/{id}", 999L))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/lists — 새 리스트를 생성한다")
    void create() throws Exception {
        ReminderListRequest request = new ReminderListRequest("업무", "#007AFF", "briefcase");

        mockMvc.perform(post("/api/lists")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.name").value("업무"))
                .andExpect(jsonPath("$.color").value("#007AFF"));
    }

    @Test
    @DisplayName("PUT /api/lists/{id} — 리스트를 수정한다")
    void update() throws Exception {
        ReminderListRequest request = new ReminderListRequest("업무", "#007AFF", "briefcase");

        mockMvc.perform(put("/api/lists/{id}", savedList.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("업무"))
                .andExpect(jsonPath("$.color").value("#007AFF"))
                .andExpect(jsonPath("$.icon").value("briefcase"));
    }

    @Test
    @DisplayName("DELETE /api/lists/{id} — 리스트를 삭제한다")
    void deleteList() throws Exception {
        mockMvc.perform(delete("/api/lists/{id}", savedList.id()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/lists/{id}", savedList.id()))
                .andExpect(status().isNotFound());
    }
}
