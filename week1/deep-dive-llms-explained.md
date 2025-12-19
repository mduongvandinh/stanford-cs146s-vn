# 🧠 HƯỚNG DẪN HIỂU VIDEO "DEEP DIVE INTO LLMs LIKE CHATGPT"
## Tác giả video: Andrej Karpathy (Cựu đồng sáng lập OpenAI)

---

# 📖 MỤC LỤC

1. [LLM là gì?](#1-llm-là-gì)
2. [Tổng quan 3 giai đoạn tạo LLM](#2-tổng-quan-3-giai-đoạn-tạo-llm)
3. [GIAI ĐOẠN 1: Pre-training](#3-giai-đoạn-1-pre-training-huấn-luyện-trước)
4. [GIAI ĐOẠN 2: Supervised Fine-tuning](#4-giai-đoạn-2-supervised-fine-tuning-sft)
5. [GIAI ĐOẠN 3: Reinforcement Learning](#5-giai-đoạn-3-reinforcement-learning-rl)
6. [Tâm lý học của LLM](#6-tâm-lý-học-của-llm)
7. [Cách sử dụng LLM hiệu quả](#7-cách-sử-dụng-llm-hiệu-quả)
8. [Từ điển Keywords](#8-từ-điển-keywords-quan-trọng)

---

# 1. LLM LÀ GÌ?

## 📌 Định nghĩa đơn giản

**LLM = Large Language Model = Mô hình Ngôn ngữ Lớn**

Hãy tưởng tượng một người đã đọc gần như **toàn bộ Internet**, nhớ hết mọi thứ, và có thể viết tiếp bất kỳ đoạn văn nào bạn đưa ra.

---

## 📌 Phân tích từng từ trong "Large Language Model"

| Từ | Nghĩa | Giải thích |
|-----|-------|------------|
| **Large** | Lớn | Có hàng tỷ "parameters" (tham số) - giống như có hàng tỷ tế bào não |
| **Language** | Ngôn ngữ | Chuyên xử lý text, chữ viết, ngôn ngữ con người |
| **Model** | Mô hình | Một chương trình máy tính được "huấn luyện" |

**Vậy LLM = Một chương trình máy tính RẤT LỚN được huấn luyện để hiểu và tạo ra ngôn ngữ.**

---

## 📌 "Người đã đọc gần như toàn bộ Internet" - Nghĩa là gì?

### So sánh lượng "đọc":

**Con người bình thường đọc được bao nhiêu?**
```
- Một người đọc nhiều: ~1,000 cuốn sách trong đời
- 1 cuốn sách ≈ 50,000 từ
- Tổng: ~50 triệu từ trong cả đời
```

**LLM "đọc" được bao nhiêu?**
```
- GPT-4 được train trên: ~13 nghìn tỷ tokens (ước tính)
- 1 token ≈ 0.75 từ
- Tổng: ~10 nghìn tỷ từ

→ LLM "đọc" gấp 200,000 lần một người đọc nhiều nhất
```

### Cụ thể LLM đã "đọc" những gì?

| Nguồn | Ví dụ |
|-------|-------|
| Wikipedia | Hầu hết các bài viết |
| Sách | Hàng triệu cuốn sách đã số hóa |
| Website | Hàng tỷ trang web |
| Forum | Reddit, StackOverflow, Quora... |
| Code | GitHub, GitLab... |
| Báo chí | NYT, BBC, VnExpress... |
| Paper khoa học | ArXiv, PubMed... |

---

## 📌 "Nhớ hết mọi thứ" - Đúng nhưng KHÁC với con người

### Con người nhớ như thế nào?
```
Bạn đọc: "Paris là thủ đô của Pháp"
Não bạn: Lưu fact này vào bộ nhớ
Khi hỏi: Truy xuất fact đó ra
```

### LLM "nhớ" như thế nào?
```
LLM đọc: Hàng triệu câu chứa "Paris" và "thủ đô" và "Pháp"
LLM học: Pattern - khi thấy "thủ đô của Pháp", 
         từ tiếp theo có xác suất cao là "Paris"
         
→ LLM KHÔNG lưu fact, mà lưu PATTERN (quy luật)
```

### Ví dụ minh họa sự khác biệt:

```
Hỏi: "Thủ đô của Pháp là gì?"

CON NGƯỜI suy nghĩ:
"À, tôi đã học điều này... thủ đô Pháp... Paris!"
(Truy xuất fact từ bộ nhớ)

LLM "suy nghĩ":
"Sau cụm 'Thủ đô của Pháp là', token nào có xác suất cao nhất?"
→ Tính toán: "Paris" = 95%, "thành phố" = 2%, "nơi" = 1%...
→ Chọn "Paris"
(Dự đoán dựa trên pattern đã học)
```

### ⚠️ Đây là lý do LLM có thể "hallucinate" (bịa):
- **Con người:** Không biết → Nói "tôi không biết"
- **LLM:** Không có pattern rõ ràng → Vẫn đoán token có xác suất cao nhất → Có thể sai

---

## 📌 "Viết tiếp bất kỳ đoạn văn nào" - BẢN CHẤT của LLM

### Nhiệm vụ DUY NHẤT của LLM: Dự đoán token tiếp theo

Hãy xem ví dụ từng bước:

```
Input: "Hôm nay trời"
                    ↓
            [LLM tính toán]
                    ↓
Xác suất token tiếp theo:
- "đẹp" : 35%
- "mưa" : 25%  
- "nắng" : 20%
- "xanh" : 10%
- "rất" : 5%
- ... (100,000 tokens khác)
                    ↓
LLM chọn "đẹp" (hoặc random theo xác suất)
                    ↓
Output: "Hôm nay trời đẹp"
```

### Sau đó lặp lại:
```
Input: "Hôm nay trời đẹp"
                    ↓
            [LLM tính toán]
                    ↓
Xác suất token tiếp theo:
- "quá" : 30%
- "," : 25%
- "lắm" : 15%
- ...
                    ↓
LLM chọn "quá"
                    ↓
Output: "Hôm nay trời đẹp quá"
```

**Cứ thế lặp lại cho đến khi gặp token kết thúc hoặc đạt giới hạn.**

---

## 📌 Ví dụ thực tế để hiểu sâu hơn

### Ví dụ 1: LLM như "autocomplete siêu cấp"

Bạn biết tính năng gợi ý khi gõ tin nhắn trên điện thoại không?

```
Bạn gõ: "Tôi đang ở"
Điện thoại gợi ý: "nhà" | "đây" | "công ty"
```

**LLM cũng như vậy, nhưng:**
- **Điện thoại:** Dựa trên vài từ trước + thói quen của bạn
- **LLM:** Dựa trên TOÀN BỘ ngữ cảnh + kiến thức từ Internet

```
Input: "Theo thuyết tương đối của Einstein, khi vận tốc 
        tiến gần tốc độ ánh sáng thì"

Điện thoại: ???
LLM: "thời gian sẽ chậm lại và khối lượng tăng lên"
```

### Ví dụ 2: Tại sao gọi là "viết tiếp" chứ không phải "trả lời"?

**Base Model (chưa fine-tune) thực sự chỉ biết viết tiếp:**

```
Input: "User: 2+2 bằng mấy?
        Assistant:"

Base Model output: "User: 3+3 bằng mấy?
                    Assistant:
                    User: 4+4 bằng mấy?
                    Assistant:..."
                    
→ Nó VIẾT TIẾP cái pattern hỏi-đáp, không thực sự TRẢ LỜI
```

**Sau khi Fine-tune mới biết trả lời:**
```
Input: "User: 2+2 bằng mấy?
        Assistant:"

Fine-tuned Model: "4"

→ Đã học được: Sau "Assistant:" phải là CÂU TRẢ LỜI
```

### Ví dụ 3: "Nhớ" theo pattern, không phải fact

```
LLM đã "đọc" hàng triệu câu như:
- "The capital of France is Paris"
- "Paris is the capital of France"  
- "France's capital city is Paris"
- "What is the capital of France? Paris"
- "Thủ đô của Pháp là Paris"
- ...

LLM KHÔNG lưu: fact(France, capital) = Paris
LLM LƯU: Khi thấy pattern "capital" + "France" → "Paris" có xác suất cao

Đây là lý do:
✅ Hỏi cách khác vẫn đúng (vì pattern tương tự)
❌ Nhưng hỏi về fact hiếm có thể sai (không đủ pattern)
```

---

## 📌 So sánh: LLM vs Con người vs Google Search

| Khía cạnh | Con người | Google Search | LLM |
|-----------|-----------|---------------|-----|
| Cách "biết" | Học và nhớ facts | Index và tìm kiếm | Học patterns |
| Khi không biết | Nói "không biết" | Nói "không tìm thấy" | Có thể bịa (hallucinate) |
| Sáng tạo | Có | Không | Có (theo pattern) |
| Cập nhật | Liên tục | Real-time | Cố định (cutoff date) |
| Giải thích | Hiểu sâu | Chỉ tìm kiếm | Bắt chước giải thích |

---

## 📌 Các LLM phổ biến hiện nay

| Tên | Công ty | Loại |
|-----|---------|------|
| ChatGPT (GPT-4, GPT-4o) | OpenAI | Đóng (Proprietary) |
| Claude | Anthropic | Đóng |
| Gemini | Google | Đóng |
| Llama | Meta | Mở (Open-weights) |
| DeepSeek | DeepSeek | Mở |

---

## 📌 TÓM TẮT

**LLM = Máy dự đoán token siêu cấp** được train trên gần như toàn bộ text của Internet.

Nó không thực sự "hiểu" hay "nhớ" như con người, mà học được **patterns** (quy luật) trong ngôn ngữ. Khi bạn đưa vào một đoạn text, nó dự đoán token tiếp theo có xác suất cao nhất, rồi lặp lại cho đến khi hoàn thành câu trả lời.

**Ví von cuối cùng:**
- **Con người:** Đọc sách → Hiểu → Nhớ kiến thức → Trả lời từ kiến thức
- **LLM:** "Đọc" Internet → Học pattern → Khi hỏi, đoán từ tiếp theo giống pattern đã học

---

# 2. TỔNG QUAN 3 GIAI ĐOẠN TẠO LLM

```
┌─────────────────────────────────────────────────────────────────┐
│                     QUY TRÌNH TẠO LLM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GIAI ĐOẠN 1          GIAI ĐOẠN 2          GIAI ĐOẠN 3         │
│  ───────────          ───────────          ───────────         │
│                                                                 │
│  PRE-TRAINING    →    FINE-TUNING     →    REINFORTIC          │
│  (Huấn luyện          (Tinh chỉnh          LEARNING            │
│   trước)               có giám sát)        (Học tăng cường)    │
│                                                                 │
│  ↓                    ↓                    ↓                   │
│                                                                 │
│  BASE MODEL      →    ASSISTANT       →    REFINED             │
│  (Biết nhiều          MODEL                MODEL               │
│   nhưng chưa          (Biết trả lời)       (Trả lời tốt,       │
│   biết trả lời)                            an toàn)            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### So sánh dễ hiểu:

| Giai đoạn | Ví dụ với con người |
|-----------|---------------------|
| Pre-training | Đứa trẻ đọc hết thư viện, biết mọi thứ |
| Fine-tuning | Dạy đứa trẻ cách trả lời câu hỏi lịch sự |
| Reinforcement Learning | Khen/chê để đứa trẻ trả lời ngày càng tốt hơn |

---

# 3. GIAI ĐOẠN 1: PRE-TRAINING (Huấn luyện trước)

## 🎯 Mục tiêu
Cho model "đọc" hàng tỷ trang web để học kiến thức và ngôn ngữ.

---

## BƯỚC 1.1: THU THẬP DỮ LIỆU (Data Collection)

### 📌 Keyword: Common Crawl, FineWeb

**Common Crawl là gì?**
- Tổ chức phi lợi nhuận thu thập dữ liệu từ Internet
- Chứa hàng tỷ trang web
- Ai cũng có thể tải về miễn phí

**FineWeb là gì?**
- Dataset đã được lọc sạch từ Common Crawl
- Khoảng 44 terabytes text
- Khoảng 15 nghìn tỷ (trillion) tokens

### 📌 Ví dụ trực quan

```
Internet (Petabytes)
    ↓ Thu thập
Common Crawl (Terabytes) 
    ↓ Lọc sạch
FineWeb (44 TB, 15T tokens)
    ↓ Dùng để train
LLM
```

---

## BƯỚC 1.2: LỌC VÀ LÀM SẠCH (Data Filtering)

### 📌 Keyword: URL Filtering, Deduplication, PII Removal

**Tại sao phải lọc?**
Internet có rất nhiều rác: spam, virus, nội dung trùng lặp, thông tin cá nhân...

### 📌 Các bước lọc:

| Bước | Tên tiếng Anh | Giải thích |
|------|---------------|------------|
| 1 | URL Filtering | Loại bỏ các website spam, malware, chất lượng thấp |
| 2 | Text Extraction | Lấy text từ HTML, bỏ code, quảng cáo |
| 3 | Language Filtering | Chỉ giữ ngôn ngữ cần thiết (ví dụ: tiếng Anh) |
| 4 | Deduplication | Loại bỏ nội dung trùng lặp |
| 5 | PII Removal | Xóa thông tin cá nhân (số điện thoại, email, địa chỉ) |
| 6 | Quality Filtering | Chỉ giữ nội dung chất lượng cao |

### 📌 Ví dụ PII Removal

```
TRƯỚC: "Liên hệ John Smith, email: john@gmail.com, SĐT: 0901234567"
SAU:   "Liên hệ [NAME], email: [EMAIL], SĐT: [PHONE]"
```

---

## BƯỚC 1.3: TOKENIZATION (Mã hóa thành Token)

### 📌 Keyword: Token, BPE (Byte Pair Encoding), Vocabulary

**Token là gì?**
- Token là "mảnh" nhỏ của text
- Không phải lúc nào cũng là 1 từ
- Có thể là: 1 từ, 1 phần từ, 1 ký tự, hoặc nhiều từ

### 📌 Ví dụ Tokenization

```
Câu: "ChatGPT is amazing"

Có thể được chia thành:
["Chat", "G", "PT", " is", " amazing"]
   ↓       ↓    ↓      ↓        ↓
Token 1   T2   T3     T4       T5

Mỗi token được gán 1 số ID:
[15496, 38, 2898, 318, 4998]
```

### 📌 Tại sao dùng Token thay vì từ?

| Cách | Ưu điểm | Nhược điểm |
|------|---------|------------|
| Dùng từ | Dễ hiểu | Từ điển quá lớn, không xử lý được từ mới |
| Dùng ký tự | Từ điển nhỏ | Câu quá dài, khó học pattern |
| Dùng token (BPE) | Cân bằng cả hai | Đôi khi khó debug |

### 📌 Vocabulary Size (Kích thước từ điển)

- GPT-2: ~50,000 tokens
- GPT-4: ~100,000 tokens
- Llama 3: ~128,000 tokens

---

## BƯỚC 1.4: HUẤN LUYỆN NEURAL NETWORK

### 📌 Keyword: Transformer, Parameters, Next Token Prediction

**Transformer là gì?**
- Kiến trúc neural network được Google giới thiệu năm 2017
- Bài báo nổi tiếng: "Attention Is All You Need"
- Tất cả LLM hiện đại đều dùng Transformer

**Parameters (Tham số) là gì?**
- Là các "nút vặn" trong model
- Model học = điều chỉnh các nút này
- GPT-2: 1.6 tỷ parameters
- GPT-4: ước tính 1.8 nghìn tỷ parameters
- Llama 3.1: 405 tỷ parameters

### 📌 Cách model học

```
Input:  "Hà Nội là thủ đô của"
         ↓
    [TRANSFORMER]
         ↓
Output: Xác suất cho từng token tiếp theo
        - "Việt Nam": 85%
        - "nước": 5%
        - "thành phố": 3%
        - ... (100,000 tokens khác)
```

Model chọn token có xác suất cao nhất (hoặc random theo xác suất).

### 📌 Quá trình training

```
Lặp lại hàng TỶ lần:

1. Lấy 1 đoạn text từ dataset
2. Đưa vào model, yêu cầu đoán từ tiếp theo
3. So sánh với đáp án đúng
4. Điều chỉnh parameters để lần sau đoán tốt hơn
   (Quá trình này gọi là Backpropagation)
```

### 📌 Chi phí training

| Model | Năm | Chi phí ước tính |
|-------|-----|------------------|
| GPT-2 | 2019 | ~$40,000 |
| GPT-2 (reproduce với llm.c) | 2024 | ~$672 |
| GPT-4 | 2023 | ~$100 triệu |
| Llama 3.1 405B | 2024 | ~$500 triệu |

---

## BƯỚC 1.5: KẾT QUẢ - BASE MODEL

### 📌 Keyword: Base Model, Completion Model

**Base Model là gì?**
- Model chỉ biết "viết tiếp" text
- KHÔNG biết trả lời câu hỏi
- KHÔNG biết đối thoại

### 📌 Ví dụ Base Model

```
Input:  "Thủ đô của Việt Nam là"
Output: "Hà Nội. Hà Nội nằm ở miền Bắc Việt Nam, 
         bên bờ sông Hồng. Thành phố có lịch sử 
         hơn 1000 năm..."
         (Viết tiếp như Wikipedia)

Input:  "User: Thủ đô Việt Nam là gì?
         Assistant:"
Output: "User: Thủ đô của Pháp là gì?
         Assistant: Paris
         User: Thủ đô của Nhật là gì?..."
         (Viết tiếp pattern, KHÔNG trả lời)
```

**Base Model giống như người biết mọi thứ nhưng chỉ biết "kể chuyện", không biết "trả lời".**

---

# 4. GIAI ĐOẠN 2: SUPERVISED FINE-TUNING (SFT)

## 🎯 Mục tiêu
Dạy Base Model cách trả lời câu hỏi và đối thoại như con người.

---

## BƯỚC 2.1: TẠO DỮ LIỆU HỘI THOẠI

### 📌 Keyword: Conversation Data, Human Labelers, Chat Template

**Human Labelers là ai?**
- Người được thuê để viết các cuộc hội thoại mẫu
- Thường là người có chuyên môn trong nhiều lĩnh vực
- Lương: $15-50/giờ tùy công ty và độ phức tạp

### 📌 Ví dụ dữ liệu hội thoại

```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Thủ đô Việt Nam là gì?"},
    {"role": "assistant", "content": "Thủ đô của Việt Nam là Hà Nội."}
  ]
}
```

### 📌 Chat Template / ChatML

```
<|im_start|>system
You are a helpful assistant.
<|im_end|>
<|im_start|>user
Thủ đô Việt Nam là gì?
<|im_end|>
<|im_start|>assistant
Thủ đô của Việt Nam là Hà Nội.
<|im_end|>
```

**Các special tokens:**
- `<|im_start|>`: Bắt đầu message
- `<|im_end|>`: Kết thúc message
- `system`, `user`, `assistant`: Vai trò

---

## BƯỚC 2.2: FINE-TUNING

### 📌 Keyword: Fine-tuning, Supervised Learning

**Quá trình:**

```
1. Lấy Base Model (đã train ở giai đoạn 1)
2. Tiếp tục train trên dữ liệu hội thoại
3. Model học cách:
   - Nhận diện khi nào user hỏi
   - Trả lời đúng format
   - Dừng đúng lúc (không viết tiếp vô tận)
```

### 📌 So sánh trước/sau Fine-tuning

| | Base Model | After Fine-tuning |
|--|-----------|-------------------|
| Input | "User: 2+2=?" | "User: 2+2=?" |
| Output | "User: 3+3=? User: 4+4=?..." | "4" |
| Hành vi | Viết tiếp pattern | Trả lời câu hỏi |

---

## BƯỚC 2.3: KẾT QUẢ - ASSISTANT MODEL

### 📌 Keyword: Assistant Model, Instruct Model

Sau fine-tuning, ta có:
- **Assistant Model**: Biết đối thoại
- **Instruct Model**: Biết làm theo hướng dẫn

**Đây chính là dạng model bạn dùng hàng ngày (ChatGPT, Claude).**

---

# 5. GIAI ĐOẠN 3: REINFORCEMENT LEARNING (RL)

## 🎯 Mục tiêu
Làm model trả lời TỐT HƠN, AN TOÀN HƠN, PHÙ HỢP HƠN với mong muốn con người.

---

## BƯỚC 3.1: RLHF (Reinforcement Learning from Human Feedback)

### 📌 Keyword: RLHF, Reward Model, Human Preference

**RLHF là gì?**
- Phương pháp dùng feedback của người để cải thiện model
- Được OpenAI phổ biến với ChatGPT

### 📌 Quy trình RLHF

```
BƯỚC 1: Thu thập Human Preferences
─────────────────────────────────
User question: "Giải thích AI cho trẻ 5 tuổi"

Response A: "AI là trí tuệ nhân tạo, một lĩnh vực 
            của khoa học máy tính..."
Response B: "AI giống như dạy máy tính suy nghĩ! 
            Như khi con dạy chú chó ngồi..."

Người đánh giá: B tốt hơn A ✓


BƯỚC 2: Train Reward Model
─────────────────────────────────
- Dùng data preferences để train 1 model riêng
- Model này cho điểm: Response nào tốt hơn?


BƯỚC 3: Optimize LLM với Reward Model
─────────────────────────────────
- LLM generate response
- Reward Model cho điểm
- LLM được điều chỉnh để tăng điểm
- Lặp lại nhiều lần
```

### 📌 Ví dụ trực quan

```
                    ┌─────────────┐
                    │    LLM      │
                    │  (Student)  │
                    └──────┬──────┘
                           │
                           ▼
                    Generate Response
                           │
                           ▼
                    ┌─────────────┐
                    │   Reward    │
                    │   Model     │
                    │  (Teacher)  │
                    └──────┬──────┘
                           │
                           ▼
                    Score: 0.85/1.0
                           │
                           ▼
                    Feedback to LLM
                    "Làm tốt lắm!" hoặc
                    "Cần cải thiện..."
```

---

## BƯỚC 3.2: REASONING MODELS (Mô hình suy luận)

### 📌 Keyword: Chain-of-Thought, O1, O3, DeepSeek-R1, Thinking Tokens

**Reasoning Model là gì?**
- Model được train để "suy nghĩ" trước khi trả lời
- Tạo ra chain-of-thought (chuỗi suy nghĩ)
- Ví dụ: OpenAI O1, O3, DeepSeek-R1

### 📌 So sánh Model thường vs Reasoning Model

**Model thường:**
```
User: 17 x 23 = ?
Assistant: 391
```

**Reasoning Model:**
```
User: 17 x 23 = ?
Assistant: 
<thinking>
Để tính 17 x 23, tôi sẽ chia nhỏ:
- 17 x 20 = 340
- 17 x 3 = 51
- 340 + 51 = 391
Kiểm tra lại: 391 / 17 = 23 ✓
</thinking>
Kết quả: 391
```

### 📌 Tại sao DeepSeek-R1 quan trọng?

1. **Công khai phương pháp**: Trước đó OpenAI giữ bí mật
2. **"Aha moment"**: Model tự khám phá cách giải quyết vấn đề
3. **Chi phí thấp**: Train với ngân sách nhỏ hơn nhiều

### 📌 Ví dụ "Aha Moment" từ DeepSeek paper

```
Trong quá trình RL, model tự phát hiện:
"Wait, maybe I need to rethink this..."
"Let me verify my calculation..."

→ Không ai dạy model làm điều này
→ Model tự học được từ RL
```

---

# 6. TÂM LÝ HỌC CỦA LLM

Phần này Karpathy giải thích cách "suy nghĩ" của LLM - rất quan trọng để sử dụng hiệu quả.

---

## 6.1 HALLUCINATION (Ảo giác)

### 📌 Keyword: Hallucination, Confabulation

**Hallucination là gì?**
- LLM "bịa" thông tin không có thật
- Nghe rất tự tin, thuyết phục
- Nhưng hoàn toàn sai sự thật

### 📌 Ví dụ Hallucination

```
User: Cho tôi biết về cuốn sách "The AI Revolution" 
      của tác giả John Smith xuất bản năm 2019?

LLM:  "The AI Revolution" của John Smith là cuốn sách 
      best-seller về trí tuệ nhân tạo. Sách gồm 12 
      chương, đề cập đến machine learning, deep 
      learning, và tương lai của AI...
      
→ Sách này KHÔNG TỒN TẠI
→ LLM bịa ra toàn bộ nội dung
```

### 📌 Tại sao LLM hallucinate?

```
LLM không "biết" theo nghĩa con người hiểu.
LLM chỉ dự đoán: "Token nào có xác suất cao nhất tiếp theo?"

Khi không có thông tin → vẫn phải đoán → bịa ra
```

### 📌 Cách giảm Hallucination

| Cách | Giải thích |
|------|------------|
| Yêu cầu trích dẫn nguồn | "Trả lời và cho tôi link nguồn" |
| Cho phép nói "không biết" | "Nếu không chắc, hãy nói không biết" |
| Dùng RAG | Cung cấp context chính xác cho LLM |
| Fact-check | Luôn kiểm tra thông tin quan trọng |

---

## 6.2 KNOWLEDGE vs WORKING MEMORY

### 📌 Keyword: Knowledge, Working Memory, Context Window

**Hai loại "bộ nhớ" của LLM:**

| Loại | Knowledge | Working Memory |
|------|-----------|----------------|
| Là gì? | Kiến thức học từ training | Nội dung trong cuộc trò chuyện hiện tại |
| Khi nào có? | Cố định sau khi train | Thay đổi mỗi lượt chat |
| Giới hạn? | Rất lớn nhưng có thể outdated | Giới hạn bởi context window |
| Ví dụ | "Paris là thủ đô Pháp" | "User vừa nói tên là Nam" |

### 📌 Context Window là gì?

```
Context Window = Số token tối đa LLM có thể "nhìn thấy" cùng lúc

GPT-3.5:    4,096 tokens   (~3,000 từ)
GPT-4:      128,000 tokens (~96,000 từ)
Claude 3:   200,000 tokens (~150,000 từ)
Gemini 1.5: 1,000,000 tokens (~750,000 từ)
```

### 📌 Ví dụ thực tế

```
Nếu bạn paste 1 cuốn sách 100,000 từ vào ChatGPT:
- GPT-3.5: Chỉ "thấy" 3% đầu tiên
- GPT-4: "Thấy" gần hết
- Claude 3: "Thấy" toàn bộ
```

---

## 6.3 KNOWLEDGE OF SELF (Tự nhận thức)

### 📌 Keyword: Self-Knowledge, System Prompt

**LLM có biết mình là ai không?**

KHÔNG thực sự. Khi hỏi "Bạn là ai?":
- LLM đoán dựa trên pattern trong training data
- Có thể trả lời sai (ví dụ: model của công ty A nói mình là của công ty B)

### 📌 Cách các công ty xử lý

```
System Prompt (được thêm vào đầu mỗi conversation):

"You are Claude, made by Anthropic. 
Your knowledge cutoff is April 2024.
You should be helpful, harmless, and honest..."

→ "Hardcode" thông tin về bản thân vào prompt
```

---

## 6.4 MODELS NEED TOKENS TO THINK

### 📌 Keyword: Thinking Tokens, Step-by-Step, Chain-of-Thought

**Phát hiện quan trọng:**
LLM cần "không gian" (tokens) để suy nghĩ. Không thể tính toán phức tạp trong 1 token.

### 📌 Ví dụ minh họa

```
CÁCH 1 - Không cho "không gian suy nghĩ":
─────────────────────────────────────────
User: 17 x 24 = ?
LLM:  408  ← SAI (đáp án đúng là 408... à đúng rồi, 
                   nhưng với số phức tạp hơn sẽ sai)

User: 127 x 389 = ?  
LLM:  49,303  ← SAI (đáp án đúng: 49,403)


CÁCH 2 - Cho "không gian suy nghĩ":
─────────────────────────────────────────
User: 127 x 389 = ? Hãy tính từng bước.

LLM:  Để tính 127 x 389:
      
      127 x 300 = 38,100
      127 x 80 = 10,160
      127 x 9 = 1,143
      
      38,100 + 10,160 + 1,143 = 49,403
      
      Đáp án: 49,403  ← ĐÚNG
```

### 📌 Bài học thực tiễn

```
❌ Prompt kém:
"Cho tôi kết luận cuối cùng về vấn đề X"

✅ Prompt tốt:
"Phân tích vấn đề X từng bước, sau đó đưa ra kết luận"
```

---

## 6.5 JAGGED INTELLIGENCE (Trí thông minh không đều)

### 📌 Keyword: Jagged Intelligence, Uneven Capabilities

**LLM giỏi một số thứ, dở một số thứ khác - không đều.**

### 📌 Ví dụ

```
LLM có thể:
✅ Viết code phức tạp
✅ Giải thích vật lý lượng tử
✅ Viết thơ, truyện ngắn
✅ Dịch 50 ngôn ngữ

Nhưng có thể fail:
❌ Đếm số chữ "r" trong "strawberry"
❌ Giải sudoku
❌ Sắp xếp 10 số theo thứ tự
❌ Nhớ chính xác số điện thoại vừa được cho
```

### 📌 Tại sao?

```
LLM xử lý ở mức TOKEN, không phải mức CHỮ CÁI.

"strawberry" có thể là 1-2 tokens
→ LLM không "thấy" từng chữ cái riêng biệt
→ Đếm chữ cái = task khó
```

---

## 6.6 TOOL USE (Sử dụng công cụ)

### 📌 Keyword: Tool Use, Function Calling, Plugins

**LLM có thể học cách gọi tools bên ngoài:**

```
Tools phổ biến:
- Web Search: Tìm kiếm thông tin mới
- Calculator: Tính toán chính xác
- Code Interpreter: Chạy code Python
- Image Generator: Tạo hình ảnh
- File Reader: Đọc file upload
```

### 📌 Ví dụ Tool Use

```
User: Giá Bitcoin hôm nay là bao nhiêu?

LLM (trong đầu): Đây là thông tin real-time, 
                  tôi cần dùng web search.

LLM → [Gọi web_search("bitcoin price today")]
Web → [Trả về: $67,234.56]

LLM: Giá Bitcoin hiện tại là $67,234.56.
```

---

# 7. CÁCH SỬ DỤNG LLM HIỆU QUẢ

## 7.1 PROMPTING TIPS

### 📌 Tip 1: Cho context đầy đủ

```
❌ Kém: "Sửa code này"

✅ Tốt: "Tôi đang viết Python script để xử lý file CSV.
        Code dưới đây bị lỗi khi file có dòng trống.
        Hãy tìm và sửa lỗi:
        [code]"
```

### 📌 Tip 2: Yêu cầu suy nghĩ từng bước

```
❌ Kém: "Cho tôi đáp án"

✅ Tốt: "Hãy phân tích từng bước, sau đó đưa ra đáp án"
```

### 📌 Tip 3: Cho ví dụ (Few-shot learning)

```
❌ Kém: "Phân loại sentiment của câu sau"

✅ Tốt: "Phân loại sentiment của câu. Ví dụ:
        - 'Sản phẩm tuyệt vời!' → Positive
        - 'Dịch vụ tệ quá' → Negative
        - 'Hàng bình thường' → Neutral
        
        Phân loại câu sau: 'Giao hàng nhanh, đóng gói cẩn thận'"
```

### 📌 Tip 4: Specify format output

```
❌ Kém: "Cho tôi thông tin về 5 công ty tech lớn nhất"

✅ Tốt: "Liệt kê 5 công ty tech lớn nhất theo market cap.
        Format:
        1. [Tên công ty] - [Market cap] - [Ngành chính]"
```

### 📌 Tip 5: Cho phép nói "không biết"

```
✅ Thêm vào prompt:
"Nếu bạn không chắc chắn về thông tin nào, 
 hãy nói rõ là không chắc chắn thay vì đoán."
```

---

## 7.2 KHI NÀO NÊN/KHÔNG NÊN TIN LLM

### 📌 Nên tin khi:

| Tình huống | Lý do |
|------------|-------|
| Giải thích concept | LLM giỏi tổng hợp và giải thích |
| Viết code cơ bản | Đã thấy nhiều code trong training |
| Brainstorming ý tưởng | Sáng tạo, không cần chính xác |
| Dịch thuật | Training trên nhiều ngôn ngữ |
| Viết/edit văn bản | Core strength của LLM |

### 📌 Cẩn thận khi:

| Tình huống | Lý do |
|------------|-------|
| Số liệu cụ thể | Có thể hallucinate |
| Thông tin mới (sau cutoff) | Knowledge bị outdated |
| Tính toán phức tạp | Nên dùng calculator tool |
| Trích dẫn nguồn | Có thể bịa link, tên sách |
| Quyết định quan trọng | Luôn double-check |

---

## 7.3 NƠI TÌM VÀ DÙNG LLM

### 📌 Model đóng (Proprietary)

| Model | Website | Đặc điểm |
|-------|---------|----------|
| ChatGPT | chat.openai.com | Phổ biến nhất |
| Claude | claude.ai | An toàn, context dài |
| Gemini | gemini.google.com | Tích hợp Google |

### 📌 Model mở (Open-weights)

| Model | Nơi dùng | Đặc điểm |
|-------|----------|----------|
| Llama 3 | together.ai, huggingface | Meta, free |
| DeepSeek | chat.deepseek.com | Trung Quốc, rẻ |
| Mistral | mistral.ai | Pháp, nhẹ |

### 📌 Chạy local

| Tool | Đặc điểm |
|------|----------|
| LM Studio | GUI đẹp, dễ dùng |
| Ollama | Command line, nhẹ |
| llama.cpp | Tối ưu cho CPU |

---

# 8. TỪ ĐIỂN KEYWORDS QUAN TRỌNG

## A-C

| Keyword | Nghĩa tiếng Việt | Giải thích ngắn |
|---------|-----------------|-----------------|
| **Attention** | Cơ chế chú ý | Cách Transformer "nhìn" các phần khác nhau của input |
| **Backpropagation** | Lan truyền ngược | Thuật toán điều chỉnh parameters dựa trên error |
| **Base Model** | Mô hình gốc | Model chỉ train pre-training, chưa fine-tune |
| **BPE** | Byte Pair Encoding | Thuật toán tokenization phổ biến |
| **Chain-of-Thought** | Chuỗi suy nghĩ | Kỹ thuật để LLM "suy nghĩ" từng bước |
| **ChatML** | Chat Markup Language | Format chuẩn cho conversation data |
| **Common Crawl** | - | Dataset thu thập từ web |
| **Context Window** | Cửa sổ ngữ cảnh | Số token tối đa LLM có thể xử lý |
| **Cutoff Date** | Ngày cắt | Thời điểm training data kết thúc |

## D-H

| Keyword | Nghĩa tiếng Việt | Giải thích ngắn |
|---------|-----------------|-----------------|
| **Deduplication** | Loại bỏ trùng lặp | Bước lọc data trùng |
| **Fine-tuning** | Tinh chỉnh | Train thêm model có sẵn trên data mới |
| **FineWeb** | - | Dataset đã lọc sạch 44TB |
| **Function Calling** | Gọi hàm | Khả năng LLM gọi tools bên ngoài |
| **Hallucination** | Ảo giác | LLM bịa thông tin |
| **Human Labelers** | Người gán nhãn | Người tạo training data chất lượng cao |

## I-P

| Keyword | Nghĩa tiếng Việt | Giải thích ngắn |
|---------|-----------------|-----------------|
| **Inference** | Suy luận | Quá trình model tạo output từ input |
| **Instruct Model** | Model hướng dẫn | Model đã fine-tune để làm theo lệnh |
| **Jagged Intelligence** | Trí thông minh không đều | LLM giỏi/dở không đều các task |
| **LLM** | Large Language Model | Mô hình ngôn ngữ lớn |
| **Next Token Prediction** | Dự đoán token tiếp | Nhiệm vụ cơ bản của LLM |
| **Parameters** | Tham số | Các "nút vặn" trong neural network |
| **PII** | Personal Identifiable Info | Thông tin cá nhân cần loại bỏ |
| **Pre-training** | Huấn luyện trước | Giai đoạn train đầu tiên trên web data |
| **Prompt** | Câu lệnh | Input bạn đưa cho LLM |

## R-Z

| Keyword | Nghĩa tiếng Việt | Giải thích ngắn |
|---------|-----------------|-----------------|
| **RAG** | Retrieval Augmented Generation | Kỹ thuật cung cấp context cho LLM |
| **Reasoning Model** | Model suy luận | LLM có khả năng "suy nghĩ" (O1, DeepSeek-R1) |
| **Reward Model** | Model phần thưởng | Model cho điểm output trong RLHF |
| **RLHF** | RL from Human Feedback | Phương pháp dùng feedback người để cải thiện |
| **SFT** | Supervised Fine-tuning | Fine-tuning có giám sát |
| **System Prompt** | Prompt hệ thống | Instructions ẩn đầu mỗi conversation |
| **Token** | - | Đơn vị nhỏ nhất LLM xử lý |
| **Tokenization** | Mã hóa token | Chuyển text thành tokens |
| **Transformer** | - | Kiến trúc neural network cho LLM |
| **Vocabulary** | Từ vựng | Tập hợp tất cả tokens có thể |
| **Working Memory** | Bộ nhớ làm việc | Context hiện tại trong conversation |

---

# 📚 TÀI NGUYÊN THAM KHẢO

## Video gốc
- [Deep Dive into LLMs like ChatGPT - Andrej Karpathy](https://youtube.com/watch?v=7xTGNNLPyMI)

## Theo dõi cập nhật AI
- [LMArena Leaderboard](https://lmarena.ai/) - Bảng xếp hạng LLM
- [AI News Newsletter](https://buttondown.email/ainews) - Newsletter AI
- Follow Andrej Karpathy trên X/Twitter

## Học thêm
- Andrej Karpathy YouTube Channel
- [llm.c](https://github.com/karpathy/llm.c) - Train GPT-2 với C
- [nanoGPT](https://github.com/karpathy/nanoGPT) - GPT implementation đơn giản

---

*Tài liệu được tạo để giải thích video "Deep Dive into LLMs like ChatGPT" của Andrej Karpathy cho người mới bắt đầu.*
