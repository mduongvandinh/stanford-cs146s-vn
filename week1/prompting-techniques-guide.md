# 🔧 HƯỚNG DẪN CÁC KỸ THUẬT PROMPTING NÂNG CAO
## Tổng hợp từ Prompting Guide (promptingguide.ai)

---

# 📖 MỤC LỤC

1. [Tổng quan các kỹ thuật](#1-tổng-quan-các-kỹ-thuật)
2. [Zero-shot Prompting](#2-zero-shot-prompting)
3. [Few-shot Prompting](#3-few-shot-prompting)
4. [Chain-of-Thought (CoT)](#4-chain-of-thought-cot)
5. [Self-Consistency](#5-self-consistency)
6. [Tree of Thoughts (ToT)](#6-tree-of-thoughts-tot)
7. [RAG - Retrieval Augmented Generation](#7-rag---retrieval-augmented-generation)
8. [ReAct - Reasoning + Acting](#8-react---reasoning--acting)
9. [Reflexion](#9-reflexion)
10. [So sánh và lựa chọn kỹ thuật](#10-so-sánh-và-lựa-chọn-kỹ-thuật)
11. [Từ điển Keywords](#11-từ-điển-keywords)

---

# 1. TỔNG QUAN CÁC KỸ THUẬT

## 📌 Bản đồ các kỹ thuật Prompting

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CÁC KỸ THUẬT PROMPTING                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐           │
│  │  Zero-shot  │────▶│  Few-shot   │────▶│    CoT      │           │
│  │ (Cơ bản)    │     │ (Có ví dụ) │     │ (Suy luận)  │           │
│  └─────────────┘     └─────────────┘     └──────┬──────┘           │
│                                                  │                  │
│                            ┌─────────────────────┴──────────────┐   │
│                            ▼                                    ▼   │
│                   ┌─────────────┐                     ┌───────────┐ │
│                   │    Self-    │                     │  Tree of  │ │
│                   │ Consistency │                     │  Thoughts │ │
│                   │ (Vote đáp án)│                    │ (Đa nhánh)│ │
│                   └─────────────┘                     └───────────┘ │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              KỸ THUẬT TÍCH HỢP CÔNG CỤ                       │   │
│  ├─────────────┬─────────────┬─────────────────────────────────┤   │
│  │    RAG      │   ReAct     │        Reflexion                │   │
│  │(+Database)  │(+Tools)     │    (+Self-improvement)          │   │
│  └─────────────┴─────────────┴─────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 📌 Bảng so sánh nhanh

| Kỹ thuật | Độ phức tạp | Use case chính | Yêu cầu |
|----------|-------------|----------------|---------|
| Zero-shot | ⭐ | Task đơn giản | Model mạnh |
| Few-shot | ⭐⭐ | Cần format cụ thể | Ví dụ tốt |
| CoT | ⭐⭐ | Bài toán logic | Prompt suy luận |
| Self-Consistency | ⭐⭐⭐ | Cần độ chính xác | Nhiều lần chạy |
| ToT | ⭐⭐⭐⭐ | Bài toán phức tạp | Search algorithm |
| RAG | ⭐⭐⭐ | Cần data mới | Vector database |
| ReAct | ⭐⭐⭐⭐ | Multi-step tasks | Tool access |
| Reflexion | ⭐⭐⭐⭐⭐ | Self-improvement | Feedback loop |

---

# 2. ZERO-SHOT PROMPTING

## 📌 Định nghĩa

**Zero-shot = Hỏi trực tiếp, không cung cấp ví dụ**

Model dựa hoàn toàn vào kiến thức đã được train để hiểu và thực hiện task.

---

## 📌 Cách hoạt động

```
┌────────────────────────────────────────────┐
│              ZERO-SHOT                      │
├────────────────────────────────────────────┤
│                                            │
│   USER: "Phân loại sentiment:              │
│          'Sản phẩm tuyệt vời!'             │
│          Sentiment: "                      │
│                    │                       │
│                    ▼                       │
│   ┌────────────────────────────┐           │
│   │   LLM (đã train sẵn về     │           │
│   │   sentiment analysis)      │           │
│   └────────────────────────────┘           │
│                    │                       │
│                    ▼                       │
│   OUTPUT: "Positive"                       │
│                                            │
└────────────────────────────────────────────┘
```

## 📌 Ví dụ thực tế

```
ZERO-SHOT CLASSIFICATION:

Prompt:
"Phân loại văn bản sau vào một trong các danh mục:
[Thể thao, Công nghệ, Giải trí, Kinh tế]

Văn bản: 'Apple vừa ra mắt iPhone 16 với chip A18 mới'
Danh mục: "

Output: "Công nghệ"
```

## 📌 Khi nào nên dùng?

| ✅ Nên dùng | ❌ Không nên dùng |
|-------------|-------------------|
| Task đơn giản, phổ biến | Task phức tạp, cần nhiều bước |
| Model mạnh (GPT-4, Claude) | Model yếu hơn |
| Không cần format đặc biệt | Cần output format cụ thể |
| Thử nghiệm nhanh | Production cần ổn định |

## 📌 Yếu tố giúp Zero-shot hiệu quả

```
1. INSTRUCTION TUNING
   → Model được fine-tune để follow instructions

2. RLHF (Reinforcement Learning from Human Feedback)
   → Model được align với mong muốn của người dùng

3. SCALE
   → Model càng lớn, zero-shot càng tốt
```

---

# 3. FEW-SHOT PROMPTING

## 📌 Định nghĩa

**Few-shot = Cung cấp K ví dụ (input → output) trước khi hỏi**

Model học pattern từ các ví dụ và áp dụng cho input mới.

---

## 📌 Cách hoạt động

```
┌────────────────────────────────────────────────────────┐
│                    FEW-SHOT                             │
├────────────────────────────────────────────────────────┤
│                                                        │
│   EXAMPLES (In-context learning):                      │
│   ┌──────────────────────────────────────┐             │
│   │ Input: "I love this!" → Positive     │             │
│   │ Input: "This is bad" → Negative      │             │
│   │ Input: "It's okay" → Neutral         │             │
│   └──────────────────────────────────────┘             │
│                      │                                 │
│                      ▼ LLM học pattern                 │
│                                                        │
│   NEW INPUT: "Amazing product!"                        │
│                      │                                 │
│                      ▼                                 │
│   OUTPUT: "Positive"                                   │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ thực tế

```
FEW-SHOT TRANSLATION (Tiếng lóng → Tiếng chuẩn):

Prompt:
"Dịch tiếng lóng sang tiếng Việt chuẩn:

'Chill đi bro' → 'Thư giãn đi bạn'
'Flex quá trời' → 'Khoe khoang quá mức'
'Vibe này đỉnh' → 'Không khí này tuyệt vời'

'Deadline gấp quá, stress vl' → "

Output: "'Hạn chót gấp quá, căng thẳng lắm'"
```

## 📌 Tips chọn ví dụ tốt

```
✅ ĐA DẠNG:
   - Cover nhiều trường hợp khác nhau
   - Bao gồm cả edge cases

✅ ĐẠI DIỆN:
   - Tương tự với task thực tế
   - Cùng domain/ngữ cảnh

✅ RÕ RÀNG:
   - Format nhất quán
   - Input → Output rõ ràng

⚠️ THỨ TỰ QUAN TRỌNG:
   - Ví dụ cuối có ảnh hưởng lớn hơn (Recency Bias)
   - Thử nghiệm nhiều thứ tự khác nhau
```

## 📌 3 Bias cần lưu ý

| Bias | Mô tả | Cách khắc phục |
|------|-------|----------------|
| **Majority Label** | Nếu có nhiều ví dụ positive, model thiên về positive | Cân bằng số lượng mỗi label |
| **Recency** | Model có xu hướng copy label của ví dụ cuối | Randomize thứ tự |
| **Common Token** | Ưu tiên từ xuất hiện thường xuyên | Dùng calibration |

---

# 4. CHAIN-OF-THOUGHT (CoT)

## 📌 Định nghĩa

**Chain-of-Thought = Yêu cầu model giải thích từng bước suy luận**

Thay vì đưa đáp án trực tiếp, model "nghĩ to" và show reasoning.

---

## 📌 So sánh với/không với CoT

```
❌ KHÔNG CÓ CoT:

Prompt: "Roger có 5 quả bóng. Mua thêm 2 hộp, mỗi hộp 3 quả.
         Hỏi có bao nhiêu quả?"
Output: "11" (có thể sai với bài khó hơn)

─────────────────────────────────────────────────

✅ CÓ CoT:

Prompt: "Roger có 5 quả bóng. Mua thêm 2 hộp, mỗi hộp 3 quả.
         Hỏi có bao nhiêu quả? Hãy suy luận từng bước."

Output:
"Bước 1: Roger ban đầu có 5 quả bóng.
 Bước 2: Mua thêm 2 hộp × 3 quả/hộp = 6 quả.
 Bước 3: Tổng = 5 + 6 = 11 quả.

 Đáp án: 11 quả bóng."
```

## 📌 Zero-shot CoT - Thủ thuật đơn giản nhưng mạnh

```
🪄 CHỈ CẦN THÊM MỘT CÂU:

"Let's think step by step"
hoặc
"Hãy suy nghĩ từng bước"

─────────────────────────────────────────────────

VÍ DỤ:

Prompt: "Trong phòng có 3 kẻ giết người và 5 người bình thường.
         Ai đó vào phòng và giết 1 kẻ giết người.
         Hỏi còn bao nhiêu người trong phòng?

         Let's think step by step."

Output:
"Bước 1: Ban đầu có 3 + 5 = 8 người.
 Bước 2: Ai đó vào → 9 người.
 Bước 3: Giết 1 người → 9 - 1 = 8 người.
 (Xác chết vẫn trong phòng, người mới vẫn ở lại)

 Đáp án: 8 người sống + 1 xác = 9"
```

## 📌 Khi nào CoT hiệu quả?

```
✅ RẤT HIỆU QUẢ:
   - Bài toán số học
   - Logic puzzles
   - Multi-step reasoning
   - Câu hỏi phân tích

❌ KHÔNG CẦN THIẾT:
   - Task đơn giản (phân loại cơ bản)
   - Translation
   - Text generation đơn thuần
```

---

# 5. SELF-CONSISTENCY

## 📌 Định nghĩa

**Self-Consistency = Chạy nhiều lần, chọn đáp án xuất hiện nhiều nhất**

Thay vì tin vào 1 lần chạy, ta tạo nhiều "đường suy luận" và vote.

---

## 📌 Cách hoạt động

```
┌─────────────────────────────────────────────────────────┐
│                 SELF-CONSISTENCY                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Prompt ──┬──▶ Lần 1: Suy luận A → Đáp án: 67         │
│            │                                            │
│            ├──▶ Lần 2: Suy luận B → Đáp án: 67         │
│            │                                            │
│            ├──▶ Lần 3: Suy luận C → Đáp án: 35         │
│            │                                            │
│            ├──▶ Lần 4: Suy luận D → Đáp án: 67         │
│            │                                            │
│            └──▶ Lần 5: Suy luận E → Đáp án: 67         │
│                                                         │
│   ═══════════════════════════════════════════════       │
│   MAJORITY VOTING:                                      │
│   • 67 xuất hiện: 4 lần (80%)                          │
│   • 35 xuất hiện: 1 lần (20%)                          │
│                                                         │
│   → Đáp án cuối cùng: 67 ✅                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ thực tế

```
BÀI TOÁN: "Khi tôi 6 tuổi, em gái tôi bằng nửa tuổi tôi.
           Bây giờ tôi 70 tuổi. Em gái tôi bao nhiêu tuổi?"

─────────────────────────────────────────────────

CHẠY 1 LẦN (có thể sai):
"Nửa của 70 = 35 tuổi" ❌

─────────────────────────────────────────────────

SELF-CONSISTENCY (5 lần):

Lần 1: "6/2 = 3 tuổi khi đó → 70 - 6 + 3 = 67" ✅
Lần 2: "Em kém 3 tuổi → 70 - 3 = 67" ✅
Lần 3: "Nửa của 70 = 35" ❌
Lần 4: "Hiệu số tuổi = 3 → 67 tuổi" ✅
Lần 5: "Khoảng cách 3 năm → 67" ✅

Vote: 67 (4/5) → Đáp án: 67 ✅
```

## 📌 Cài đặt

```python
# Pseudo-code cho Self-Consistency

def self_consistency(prompt, n_samples=5, temperature=0.7):
    answers = []

    for i in range(n_samples):
        # Chạy với temperature > 0 để có diversity
        response = llm.generate(prompt, temperature=temperature)
        answer = extract_answer(response)
        answers.append(answer)

    # Majority voting
    final_answer = most_common(answers)
    return final_answer
```

---

# 6. TREE OF THOUGHTS (ToT)

## 📌 Định nghĩa

**Tree of Thoughts = Khám phá nhiều đường suy luận song song**

Thay vì 1 chain (CoT), ta có nhiều branches như cây, với khả năng backtrack.

---

## 📌 So sánh CoT vs ToT

```
CHAIN-OF-THOUGHT (Linear):

    Start → Step 1 → Step 2 → Step 3 → Answer
    (Nếu sai ở Step 2, cả chain sai)

─────────────────────────────────────────────────

TREE OF THOUGHTS (Branching):

                        ┌→ Step 2a → Step 3a → Answer A ✅
    Start → Step 1 ─────┤
                        ├→ Step 2b → Step 3b → Answer B ❌
                        │                      (backtrack)
                        └→ Step 2c → Step 3c → Answer C ✅

    (Evaluate và chọn paths tốt nhất)
```

## 📌 Cách hoạt động

```
┌─────────────────────────────────────────────────────────────┐
│                    TREE OF THOUGHTS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. DECOMPOSE: Chia bài toán thành các "thought" nhỏ       │
│                                                             │
│  2. GENERATE: Tạo nhiều candidates cho mỗi step            │
│     ┌───────────────────────────────────────┐               │
│     │ Step 1: Candidate A, B, C, D, E        │               │
│     │ → Đánh giá: A=maybe, B=sure, C=impossible│             │
│     │ → Giữ lại top K (B, A)                 │               │
│     └───────────────────────────────────────┘               │
│                                                             │
│  3. EVALUATE: LLM tự đánh giá từng candidate               │
│     - "sure" (chắc chắn đúng)                               │
│     - "maybe" (có thể)                                      │
│     - "impossible" (sai rồi, bỏ)                            │
│                                                             │
│  4. SEARCH: BFS hoặc DFS để explore tree                   │
│     - Breadth-First: Explore rộng trước                     │
│     - Depth-First: Đi sâu trước, backtrack nếu cần          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ: Game of 24

```
BÀI TOÁN: Dùng 4 số [4, 5, 6, 10] và +, -, ×, ÷ để được 24

─────────────────────────────────────────────────

ToT APPROACH:

Step 1 - Thử các phép tính đầu:
├── 4 + 5 = 9       (maybe)
├── 5 × 6 = 30      (maybe)
├── 10 - 4 = 6      (sure - có thể về 24)
└── 4 × 6 = 24      (sure! - còn 5, 10 phải = 0 hoặc ×1)

Step 2 - Từ "4 × 6 = 24":
├── 24 + (10 - 5) = 29  (impossible)
├── 24 × (10 - 5)/5 = ... (maybe)
└── 24 + 5 - 10 = 19 (impossible)

... continue exploring ...

Final: (10 - 4) × (6 - 2) = 24 ✅
       Nhưng không có 2! Thử lại...

       5 × (10 - 6) + 4 = 5 × 4 + 4 = 24 ✅
```

## 📌 Simplified ToT Prompt

```
"Imagine three different experts are answering this question.
All experts will write down 1 step of their thinking,
then share it with the group.
Then all experts will go on to the next step, etc.
If any expert realizes they're wrong at any point, they leave.
The question is..."
```

---

# 7. RAG - RETRIEVAL AUGMENTED GENERATION

## 📌 Định nghĩa

**RAG = Kết hợp TÌM KIẾM + TẠO VĂN BẢN**

Thay vì chỉ dựa vào kiến thức đã train, model tìm kiếm thông tin từ database/documents trước khi trả lời.

---

## 📌 Tại sao cần RAG?

```
VẤN ĐỀ CỦA LLM THUẦN:

❌ Knowledge Cutoff: Không biết thông tin sau ngày train
❌ Hallucination: Có thể bịa thông tin
❌ No Source: Không thể cite nguồn
❌ Generic: Không có domain-specific knowledge

─────────────────────────────────────────────────

RAG GIẢI QUYẾT:

✅ Real-time: Truy cập data mới nhất
✅ Factual: Dựa trên documents thật
✅ Verifiable: Có thể check nguồn
✅ Specialized: Thêm knowledge của công ty/domain
```

## 📌 Kiến trúc RAG

```
┌─────────────────────────────────────────────────────────────────┐
│                         RAG PIPELINE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────┐     ┌───────────────┐     ┌─────────────────┐    │
│   │  User   │────▶│   Retriever   │────▶│    Generator    │    │
│   │ Query   │     │ (Tìm kiếm)    │     │   (Tạo văn bản) │    │
│   └─────────┘     └───────┬───────┘     └────────┬────────┘    │
│                           │                       │             │
│                           ▼                       │             │
│               ┌───────────────────┐               │             │
│               │  Vector Database  │               │             │
│               │  ┌─────┐ ┌─────┐  │               │             │
│               │  │Doc 1│ │Doc 2│  │───────────────┘             │
│               │  └─────┘ └─────┘  │  (Top K docs)               │
│               │  ┌─────┐ ┌─────┐  │                             │
│               │  │Doc 3│ │Doc 4│  │                             │
│               │  └─────┘ └─────┘  │                             │
│               └───────────────────┘                             │
│                                                                 │
│   OUTPUT: Answer + Citations                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ thực tế

```
KHÔNG CÓ RAG:

User: "Giá cổ phiếu Apple hôm nay?"
LLM: "Tôi không có thông tin real-time về giá cổ phiếu."

─────────────────────────────────────────────────

CÓ RAG:

User: "Giá cổ phiếu Apple hôm nay?"

Step 1 - Retrieve:
→ Query finance API/database
→ Lấy: "AAPL: $178.50, +2.3%, Dec 19 2024"

Step 2 - Generate:
Prompt to LLM:
"Dựa trên data sau, trả lời câu hỏi:
[Context: AAPL: $178.50, +2.3%, Dec 19 2024]
Question: Giá cổ phiếu Apple hôm nay?"

LLM: "Giá cổ phiếu Apple (AAPL) hôm nay là $178.50,
      tăng 2.3% so với hôm qua. (Nguồn: Dec 19 2024)"
```

## 📌 Các bước implement RAG

```
1. DOCUMENT PROCESSING
   - Chia documents thành chunks
   - Mỗi chunk ~500-1000 tokens

2. EMBEDDING
   - Chuyển chunks thành vectors
   - Dùng embedding model (OpenAI, Cohere, ...)

3. INDEXING
   - Lưu vectors vào Vector DB
   - (Pinecone, Weaviate, ChromaDB, ...)

4. RETRIEVAL
   - Embed user query
   - Tìm top-K similar chunks

5. GENERATION
   - Concat context + query
   - LLM generate answer
```

---

# 8. ReAct - REASONING + ACTING

## 📌 Định nghĩa

**ReAct = Kết hợp SUY LUẬN + HÀNH ĐỘNG trong vòng lặp**

Model vừa "nghĩ" (reasoning) vừa "làm" (acting), dùng tools bên ngoài.

---

## 📌 Cách hoạt động

```
┌─────────────────────────────────────────────────────────────┐
│                    ReAct LOOP                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────────────────────────────────────────────┐  │
│   │                                                      │  │
│   │  THOUGHT: "Tôi cần tìm thông tin về X"              │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  ACTION: Search("X")                                 │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  OBSERVATION: "Kết quả tìm kiếm: ..."               │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  THOUGHT: "Từ kết quả, tôi thấy Y, cần tìm thêm Z"  │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  ACTION: Lookup("Z")                                 │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  OBSERVATION: "Z là ..."                            │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  THOUGHT: "Bây giờ tôi có đủ info để trả lời"       │  │
│   │      │                                               │  │
│   │      ▼                                               │  │
│   │  ACTION: Finish("Câu trả lời cuối cùng")            │  │
│   │                                                      │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ: HotpotQA

```
QUESTION: "Thủ đô của quốc gia có diện tích lớn nhất
           châu Á nằm ở bờ sông nào?"

─────────────────────────────────────────────────

Thought 1: Tôi cần tìm quốc gia có diện tích lớn nhất châu Á
Action 1: Search["largest country in Asia by area"]
Observation 1: Russia is the largest country in Asia...

Thought 2: Nhưng phần lớn Russia ở châu Âu. Nếu chỉ tính
           châu Á, China có thể lớn nhất. Tôi cần verify.
Action 2: Search["largest country entirely in Asia"]
Observation 2: China is the largest country located
               entirely within Asia...

Thought 3: Vậy là China. Thủ đô China là Beijing.
           Tôi cần tìm Beijing nằm bờ sông nào.
Action 3: Search["Beijing river"]
Observation 3: Beijing is located on the Yongding River...

Thought 4: Tôi đã có đủ thông tin để trả lời.
Action 4: Finish["Sông Yongding (Vĩnh Định)"]
```

## 📌 So sánh ReAct vs CoT vs Action-only

| Approach | Reasoning | Actions | Kết quả |
|----------|-----------|---------|---------|
| CoT only | ✅ | ❌ | Có thể sai do thiếu info |
| Action only | ❌ | ✅ | Thiếu direction, không hiệu quả |
| **ReAct** | ✅ | ✅ | **Tốt nhất - có cả hai** |

---

# 9. REFLEXION

## 📌 Định nghĩa

**Reflexion = Agent tự PHẢN CHIẾU và CẢI THIỆN qua từng lần thử**

Thay vì training lại model, ta dùng "verbal reinforcement" - feedback bằng ngôn ngữ.

---

## 📌 3 Thành phần chính

```
┌─────────────────────────────────────────────────────────────┐
│                    REFLEXION FRAMEWORK                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                            │
│  │   ACTOR     │ ←── Tạo actions dựa trên observations     │
│  │  (Agent)    │      Dùng CoT + ReAct                      │
│  └──────┬──────┘                                            │
│         │                                                   │
│         ▼ trajectories                                      │
│                                                             │
│  ┌─────────────┐                                            │
│  │  EVALUATOR  │ ←── Cho điểm output của Actor              │
│  │  (Scorer)   │      Reward signal (0-1)                   │
│  └──────┬──────┘                                            │
│         │                                                   │
│         ▼ feedback                                          │
│                                                             │
│  ┌─────────────────────────────────────┐                    │
│  │        SELF-REFLECTION              │                    │
│  │  (Verbal Reinforcement)             │                    │
│  │                                     │                    │
│  │  "Lần trước tôi sai vì...          │                    │
│  │   Lần sau tôi sẽ..."               │                    │
│  │                                     │                    │
│  └──────────────┬──────────────────────┘                    │
│                 │                                           │
│                 ▼ memory update                             │
│                                                             │
│  ┌─────────────┐                                            │
│  │   MEMORY    │ ←── Lưu trữ reflections                   │
│  │ (Long-term) │      cho attempts sau                      │
│  └─────────────┘                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ: Code Generation

```
TASK: Viết function tìm số nguyên tố

─────────────────────────────────────────────────

ATTEMPT 1:
def is_prime(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

Evaluator: FAIL (is_prime(1) = True, wrong!)

Self-Reflection:
"Tôi quên xử lý edge case n <= 1.
 Những số này không phải số nguyên tố.
 Lần sau cần check điều kiện đầu tiên."

─────────────────────────────────────────────────

ATTEMPT 2 (with memory):
def is_prime(n):
    if n <= 1:  # Learned from reflection
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

Evaluator: FAIL (is_prime(4) takes too long for large n)

Self-Reflection:
"Function đúng nhưng chậm với số lớn.
 Chỉ cần check đến sqrt(n) là đủ."

─────────────────────────────────────────────────

ATTEMPT 3 (with accumulated memory):
def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

Evaluator: PASS ✅
```

## 📌 Khi nào dùng Reflexion?

```
✅ PHÙ HỢP:
   - Tasks có thể verify (coding, QA)
   - Cần nhiều attempts để hoàn thiện
   - Muốn agent tự học từ mistakes

❌ KHÔNG PHÙ HỢP:
   - Tasks không có clear feedback
   - One-shot tasks (không có cơ hội retry)
   - Khi cần response real-time
```

---

# 10. SO SÁNH VÀ LỰA CHỌN KỸ THUẬT

## 📌 Decision Tree

```
                          START
                            │
                            ▼
                    ┌───────────────┐
                    │ Task đơn giản? │
                    └───────┬───────┘
                       Yes  │   No
                       │    │    │
                       ▼    │    ▼
              ┌───────────┐ │  ┌───────────────┐
              │ Zero-shot │ │  │ Cần reasoning?│
              └───────────┘ │  └───────┬───────┘
                            │     Yes  │   No
                            │     │    │    │
                            │     ▼    │    ▼
                            │  ┌─────────┐ ┌───────────────┐
                            │  │  CoT    │ │ Cần format    │
                            │  └────┬────┘ │ cụ thể?       │
                            │       │      └───────┬───────┘
                            │       ▼         Yes  │   No
                            │  ┌─────────────┐     │    │
                            │  │ Cần độ chính│     ▼    ▼
                            │  │ xác cao?    │ ┌────────┐│
                            │  └──────┬──────┘ │Few-shot││
                            │    Yes  │   No   └────────┘│
                            │    │    │    │             │
                            │    ▼    ▼    │             │
                            │ ┌──────────┐ │             │
                            │ │   Self-  │ │             │
                            │ │Consistency│ │             │
                            │ └──────────┘ │             │
                            │              │             │
                            ▼              ▼             ▼
                    ┌───────────────────────────────────────┐
                    │        CẦN EXTERNAL DATA/TOOLS?       │
                    └────────────────┬──────────────────────┘
                                Yes  │   No
                                │    │    │
                    ┌───────────┴────┴────┴───────────┐
                    │                                 │
                    ▼                                 ▼
           ┌─────────────┐                    Done with
           │ Data mới?   │                    above technique
           └──────┬──────┘
             Yes  │   No
             │    │    │
             ▼    ▼    ▼
        ┌──────┐ ┌──────────┐
        │ RAG  │ │  ReAct   │
        └──────┘ │(+tools)  │
                 └──────────┘
```

## 📌 Bảng tổng hợp cuối cùng

| Kỹ thuật | Độ khó | Chi phí | Khi nào dùng |
|----------|--------|---------|--------------|
| **Zero-shot** | Dễ | Thấp | Thử đầu tiên, task đơn giản |
| **Few-shot** | Dễ | Thấp | Cần format output cụ thể |
| **CoT** | Trung bình | Thấp | Bài toán logic, math |
| **Self-Consistency** | Trung bình | Cao (nhiều calls) | Cần accuracy cao |
| **ToT** | Khó | Rất cao | Planning, puzzles phức tạp |
| **RAG** | Khó | Trung bình | Cần data cập nhật/domain |
| **ReAct** | Khó | Trung bình | Multi-step với tools |
| **Reflexion** | Rất khó | Cao | Agent tự cải thiện |

---

# 11. TỪ ĐIỂN KEYWORDS

## A-F

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Action** | Hành động | Bước thực thi trong ReAct (search, lookup, finish) |
| **Backtracking** | Quay lui | Khả năng thử đường khác trong ToT |
| **BFS/DFS** | Breadth/Depth First Search | Thuật toán duyệt tree trong ToT |
| **Chain-of-Thought** | Chuỗi suy nghĩ | Kỹ thuật yêu cầu model giải thích từng bước |
| **Chunk** | Mảnh | Phần nhỏ của document trong RAG |
| **Embedding** | Nhúng | Chuyển text thành vector số |
| **Few-shot** | Vài ví dụ | Cung cấp K ví dụ trong prompt |

## G-R

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Generator** | Bộ sinh | Phần tạo text trong RAG |
| **In-context Learning** | Học trong ngữ cảnh | Model học từ examples trong prompt |
| **Majority Voting** | Bầu chọn đa số | Chọn đáp án phổ biến nhất |
| **Observation** | Quan sát | Kết quả từ action trong ReAct |
| **RAG** | Retrieval Augmented Generation | Kết hợp tìm kiếm + sinh text |
| **ReAct** | Reasoning + Acting | Kết hợp suy luận và hành động |
| **Reflexion** | Phản chiếu | Agent tự đánh giá và cải thiện |
| **Retriever** | Bộ tìm kiếm | Phần tìm documents trong RAG |

## S-Z

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Self-Consistency** | Tự nhất quán | Chạy nhiều lần, vote đáp án |
| **Temperature** | Nhiệt độ | Tham số điều chỉnh randomness |
| **Thought** | Suy nghĩ | Bước reasoning trong ReAct/ToT |
| **ToT** | Tree of Thoughts | Khám phá nhiều đường suy luận |
| **Vector Database** | CSDL vector | Lưu trữ embeddings cho RAG |
| **Zero-shot** | Không ví dụ | Hỏi trực tiếp không cần demo |

---

# 📚 TÀI NGUYÊN THAM KHẢO

## Papers gốc

- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903) - Wei et al. 2022
- [Self-Consistency](https://arxiv.org/abs/2203.11171) - Wang et al. 2022
- [Tree of Thoughts](https://arxiv.org/abs/2305.10601) - Yao et al. 2023
- [RAG](https://arxiv.org/abs/2005.11401) - Lewis et al. 2020
- [ReAct](https://arxiv.org/abs/2210.03629) - Yao et al. 2022
- [Reflexion](https://arxiv.org/abs/2303.11366) - Shinn et al. 2023

## Website

- [Prompting Guide](https://www.promptingguide.ai/) - Tổng hợp đầy đủ nhất
- [Learn Prompting](https://learnprompting.org/) - Course miễn phí

---

*Tài liệu tổng hợp các kỹ thuật Prompting nâng cao từ promptingguide.ai*
