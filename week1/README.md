# Tuần 1: Introduction to Coding LLMs and AI Development

## Mục tiêu học tập
- Hiểu cách hoạt động của Large Language Models (LLMs)
- Nắm vững các kỹ thuật Prompt Engineering
- Biết cách sử dụng LLMs hiệu quả trong phát triển AI

---

## Tài liệu tham khảo

### Bài giảng

| Ngày | Chủ đề | Tài liệu |
|------|--------|----------|
| Mon 9/22 | Introduction and how an LLM is made | [Lecture_9_22_25_public.pdf](Lecture_9_22_25_public.pdf) |
| Fri 9/26 | Power prompting for LLMs | [Lecture_9_26_25_public.pdf](Lecture_9_26_25_public.pdf) |

---

### Tài liệu đọc thêm

#### 1. Deep Dive into LLMs
- **File:** [deep-dive-llms-explained.md](deep-dive-llms-explained.md)
- **Nguồn:** Video của Andrej Karpathy (Cựu đồng sáng lập OpenAI)
- **Nội dung chính:**
  - LLM là gì và cách hoạt động
  - 3 giai đoạn tạo LLM: Pre-training, Fine-tuning, Reinforcement Learning
  - Tâm lý học của LLM (Hallucination, Context Window, Jagged Intelligence)
  - Cách sử dụng LLM hiệu quả

#### 2. AI Prompt Engineering: A Deep Dive
- **File:** [prompt-engineering-deep-dive.md](prompt-engineering-deep-dive.md)
- **Nguồn:** Buổi thảo luận bàn tròn từ Anthropic
- **Nội dung chính:**
  - Prompt Engineering là gì
  - Các kỹ thuật Prompting quan trọng (Chain of Thought, Few-shot, Structuring)
  - Những sai lầm phổ biến cần tránh
  - Tips thực hành từ chuyên gia

---

### Tài liệu web

#### 3. Prompt Engineering Overview (Google Cloud)
- **Link:** https://cloud.google.com/discover/what-is-prompt-engineering
- **Nội dung:** Giới thiệu tổng quan về Prompt Engineering từ Google Cloud

#### 4. Prompt Engineering Guide
- **Link:** https://www.promptingguide.ai/techniques
- **Nội dung:** Hướng dẫn chi tiết các kỹ thuật prompting
- **Các kỹ thuật chính:**

| Kỹ thuật | Mô tả |
|----------|-------|
| Zero-shot Prompting | Sử dụng mô hình LLM mà không cần ví dụ trước |
| Few-shot Prompting | Cung cấp một số ví dụ để hướng dẫn mô hình |
| Chain-of-Thought | Hướng dẫn mô hình suy luận từng bước |
| Meta Prompting | Sử dụng prompt để tối ưu hóa các prompt khác |
| Self-Consistency | Đảm bảo tính nhất quán trong câu trả lời |
| Generate Knowledge Prompting | Yêu cầu mô hình tạo kiến thức liên quan |
| Prompt Chaining | Kết hợp nhiều prompt theo chuỗi |
| Tree of Thoughts | Khám phá nhiều đường suy luận song song |
| RAG (Retrieval Augmented Generation) | Kết hợp tìm kiếm thông tin với sinh văn bản |
| ReAct | Suy luận và hành động |
| Reflexion | Tự phản ánh và cải thiện |

---

## Tóm tắt nội dung chính

### LLM là gì?
- **Large Language Model** = Mô hình ngôn ngữ lớn
- Được huấn luyện trên gần như toàn bộ text của Internet
- Nhiệm vụ cốt lõi: Dự đoán token tiếp theo

### 3 giai đoạn tạo LLM
1. **Pre-training:** Cho model "đọc" hàng tỷ trang web
2. **Supervised Fine-tuning:** Dạy model cách trả lời câu hỏi
3. **Reinforcement Learning:** Làm model trả lời tốt hơn, an toàn hơn

### Prompt Engineering là gì?
- Nghệ thuật viết instructions để LLM thực hiện task mong muốn
- Kết hợp: Giao tiếp rõ ràng + Thử nghiệm lặp lại

### Tips quan trọng
1. **Clear communication** - Diễn đạt rõ ràng
2. **Đọc kỹ model outputs** - Kiểm tra model có làm đúng không
3. **Test với edge cases** - Không chỉ test trường hợp điển hình
4. **Chain of Thought** - Cho model "không gian suy nghĩ"
5. **Few-shot examples** - Cung cấp ví dụ mẫu

---

## Checklist hoàn thành tuần 1

- [ ] Đọc tài liệu Deep Dive into LLMs
- [ ] Đọc tài liệu Prompt Engineering Deep Dive
- [ ] Xem slides bài giảng ngày 9/22
- [ ] Xem slides bài giảng ngày 9/26
- [ ] Tham khảo Prompt Engineering Guide
- [ ] Thực hành viết prompts trên Claude/ChatGPT

---

*Cập nhật lần cuối: Tuần 1 - Stanford AI Course*
