# 🧠 HOW LONG CONTEXTS FAIL
## Tại sao Context Window lớn không phải lúc nào cũng tốt

---

# 📖 MỤC LỤC

1. [Vấn đề với Long Context](#1-vấn-đề-với-long-context)
2. [4 Failure Modes](#2-4-failure-modes-của-context)
3. [Context Poisoning](#3-context-poisoning)
4. [Context Distraction](#4-context-distraction)
5. [Context Confusion](#5-context-confusion)
6. [Context Clash](#6-context-clash)
7. [Giải pháp](#7-giải-pháp)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. VẤN ĐỀ VỚI LONG CONTEXT

## 📌 Sự ngộ nhận phổ biến

```
NGỘ NHẬN:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Context window càng lớn → Performance càng tốt"   │
│                                                     │
│  1M tokens context = AI nhớ được nhiều hơn         │
│                    = AI làm việc tốt hơn           │
│                                                     │
└─────────────────────────────────────────────────────┘

THỰC TẾ:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Filling large context windows creates            │
│   UNEXPECTED FAILURE MODES"                         │
│                                                     │
│  Nhiều context ≠ Tốt hơn                           │
│  Đặc biệt NGUY HIỂM cho AI Agents                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tại sao AI Agents bị ảnh hưởng nhiều nhất?

```
AI AGENTS INHERENTLY ASSEMBLE CONTEXT FROM DIVERSE SOURCES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│   Agent nhận input từ:                             │
│                                                     │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│   │ User     │ │ Tools    │ │ Previous │          │
│   │ Messages │ │ Outputs  │ │ Actions  │          │
│   └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│        │            │            │                 │
│        └────────────┼────────────┘                 │
│                     ▼                              │
│              ┌────────────┐                        │
│              │  CONTEXT   │                        │
│              │  WINDOW    │ ← Diverse, potentially │
│              └────────────┘   conflicting info     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. 4 FAILURE MODES CỦA CONTEXT

## 📌 Overview

| # | Failure Mode | Mô tả ngắn | Nguy hiểm |
|---|--------------|------------|-----------|
| 1 | **Context Poisoning** | Lỗi lan truyền | ⚠️⚠️⚠️ |
| 2 | **Context Distraction** | Mất focus | ⚠️⚠️ |
| 3 | **Context Confusion** | Quá nhiều options | ⚠️⚠️ |
| 4 | **Context Clash** | Thông tin xung đột | ⚠️⚠️⚠️ |

```
VISUAL OVERVIEW:

Context Poisoning     Context Distraction
     ▼                      ▼
┌─────────┐           ┌─────────┐
│ 🦠 Error│           │ 📚 Too  │
│ spreads │           │ much    │
│         │           │ history │
└─────────┘           └─────────┘

Context Confusion     Context Clash
     ▼                      ▼
┌─────────┐           ┌─────────┐
│ 🔧 Too  │           │ ⚔️ Info │
│ many    │           │ fights  │
│ tools   │           │ itself  │
└─────────┘           └─────────┘
```

---

# 3. CONTEXT POISONING

## 📌 Định nghĩa

**Context Poisoning = Khi hallucination hoặc error đi vào context và được tham chiếu lặp lại, tạo ra compound problems**

```
QUÁ TRÌNH POISONING:

Step 1: Agent tạo ra một lỗi nhỏ
┌─────────────────────────────────────────────────────┐
│  Agent: "User's goal is to catch all 150 Pokémon"   │
│         (Thực ra user muốn chơi theo cách khác)     │
└─────────────────────────────────────────────────────┘
            │
            ▼
Step 2: Lỗi được lưu vào context
┌─────────────────────────────────────────────────────┐
│  Context now contains: Wrong goal information       │
└─────────────────────────────────────────────────────┘
            │
            ▼
Step 3: Agent tham chiếu lỗi này nhiều lần
┌─────────────────────────────────────────────────────┐
│  Agent: "Based on our goal to catch 150 Pokémon..." │
│  Agent: "To achieve our 150 Pokémon target..."      │
│  Agent: "Progress: 5/150 Pokémon..."                │
└─────────────────────────────────────────────────────┘
            │
            ▼
Step 4: Compound problems
┌─────────────────────────────────────────────────────┐
│  Agent pursues "impossible or irrelevant goals"     │
│  Mọi decision đều dựa trên foundation sai          │
└─────────────────────────────────────────────────────┘
```

## 📌 Ví dụ thực tế: Gemini 2.5 Pokémon

```
CASE STUDY: GEMINI 2.5 PLAYING POKÉMON

Vấn đề:
- Poisoned "goals section" trong context
- Agent tiếp tục pursue impossible goals
- Không thể tự correct vì error đã embedded

Kết quả:
- Agent stuck in loops
- Pursuing irrelevant objectives
- Unable to make progress
```

---

# 4. CONTEXT DISTRACTION

## 📌 Định nghĩa

**Context Distraction = Khi context tích lũy quá ~100k tokens, model có xu hướng lặp lại actions từ history thay vì synthesize new plans**

```
VISUALIZATION:

Context < 100k tokens:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Past actions: A, B, C                             │
│  Current state: X                                  │
│                                                     │
│  Model thinks: "Given X, best action is D"         │
│  → NOVEL SYNTHESIS ✅                               │
│                                                     │
└─────────────────────────────────────────────────────┘

Context > 100k tokens:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Past actions: A, B, C, D, E, F, G, H, I, J, K...  │
│  Current state: X                                  │
│                                                     │
│  Model thinks: "I did B before in similar case,    │
│                 let me do B again"                 │
│  → REPETITION FROM HISTORY ❌                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Vấn đề cụ thể

| Triệu chứng | Nguyên nhân | Hậu quả |
|-------------|-------------|---------|
| Lặp lại actions | Favoring history over synthesis | Stuck in patterns |
| Không adapt | Không develop new strategies | Không giải quyết được problems mới |
| Predictable behavior | Over-reliance on past | Dễ bị exploit |

```
VÍ DỤ:

Agent với 200k context đang debug:

Turn 100: "Let me try adding console.log..."
Turn 150: "Let me try adding console.log..."  ← Same approach
Turn 200: "Let me try adding console.log..."  ← Still same

→ Agent không thể "nghĩ" ra approach mới
  vì quá "distracted" bởi past patterns
```

---

# 5. CONTEXT CONFUSION

## 📌 Định nghĩa

**Context Confusion = Irrelevant information forces model to process it, REGARDLESS of relevance, causing decision paralysis**

```
BERKELEY FUNCTION-CALLING LEADERBOARD FINDINGS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Every model performs WORSE when provided         │
│   with MORE than one tool"                          │
│                                                     │
│  Number of tools vs Performance:                   │
│                                                     │
│  1 tool   ████████████████████████████████  100%   │
│  5 tools  ██████████████████████████        75%    │
│  19 tools ████████████████████              60%    │
│  46 tools ████                              15%    │
│                                                     │
│  Small models: 46 tools → COMPLETE FAILURE         │
│                19 tools → Success                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tại sao xảy ra?

```
MODEL PHẢI XỬ LÝ TẤT CẢ INFORMATION:

User task: "Create a file called hello.txt"

Context với 3 tools:
┌─────────────────────────────────────────────────────┐
│ 1. create_file(name, content)                      │
│ 2. read_file(path)                                 │
│ 3. delete_file(path)                               │
│                                                     │
│ → Easy decision: use create_file                   │
└─────────────────────────────────────────────────────┘

Context với 50 tools:
┌─────────────────────────────────────────────────────┐
│ 1. create_file(name, content)                      │
│ 2. create_directory(path)                          │
│ 3. write_file(path, content)                       │
│ 4. append_file(path, content)                      │
│ 5. touch_file(path)                                │
│ ... 45 more tools ...                              │
│                                                     │
│ → Confusion: create_file? write_file? touch_file?  │
│   All seem relevant, model must evaluate ALL       │
└─────────────────────────────────────────────────────┘
```

---

# 6. CONTEXT CLASH

## 📌 Định nghĩa

**Context Clash = Conflicting information trong context gây ra performance degradation**

```
MICROSOFT/SALESFORCE STUDY FINDINGS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Multi-turn conversations với early incorrect       │
│  attempts caused AVERAGE 39% performance drop       │
│                                                     │
│  Worst case: 98.1 → 64.1 (34 point drop!)          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Ví dụ Context Clash

```
CONVERSATION WITH CLASH:

Turn 1 (Wrong attempt):
User: "How do I sort this array?"
Agent: "Use bubble sort: for(i=0; i<n; i++)..."
       [Incorrect implementation]

Turn 2 (Correction):
User: "That's wrong, the output is incorrect"
Agent: "Sorry, let me fix: for(i=0; i<n-1; i++)..."
       [Still referencing wrong approach]

Turn 3 (More correction):
User: "Still wrong!"

→ Context now contains:
  - Original wrong code
  - First "fix" (still wrong)
  - User saying "wrong" multiple times

→ Model confused: Which version is right?
  What exactly is wrong?

→ CLASH between multiple versions = DEGRADED OUTPUT
```

## 📌 So sánh Fresh vs Clashed Context

| Metric | Fresh Context | Clashed Context | Drop |
|--------|---------------|-----------------|------|
| Accuracy | 98.1 | 64.1 | -34.6% |
| Confidence | High | Low | Significant |
| Output quality | Clean | Confused | Mixed |

---

# 7. GIẢI PHÁP

## 📌 Key Takeaway

> "Effective agent design requires SELECTIVE CONTEXT CURATION, not maximal information loading."

```
NGUYÊN TẮC CHÍNH:

❌ SAI:
"Cho agent nhiều context nhất có thể"
"1M token context = tốt"
"More information = better decisions"

✅ ĐÚNG:
"Chỉ cho agent những gì CẦN THIẾT"
"Curate context carefully"
"Quality over quantity"
```

## 📌 Strategies để tránh failure modes

### 1. Chống Context Poisoning

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Validate agent outputs before adding to context │
│  • Periodic context "sanity checks"                │
│  • Allow context resets when errors detected       │
│  • Don't let agent reference its own past outputs  │
│    without verification                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2. Chống Context Distraction

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Keep context under 100k tokens when possible    │
│  • Summarize old interactions instead of keeping   │
│    full history                                    │
│  • Implement "context compaction" periodically     │
│  • Focus on recent + relevant, not complete        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3. Chống Context Confusion

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Limit number of tools (< 20 ideally)            │
│  • Group related tools logically                   │
│  • Dynamic tool loading based on task              │
│  • Clear, distinct tool descriptions               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 4. Chống Context Clash

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Start fresh for new attempts after failures     │
│  • Don't keep failed attempts in context           │
│  • Clear separation between "old" and "current"    │
│  • Explicit markers for "ignore previous"          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 8. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Context Window** | Cửa sổ ngữ cảnh | Số tokens model có thể "nhìn thấy" cùng lúc |
| **Context Poisoning** | Nhiễm độc context | Lỗi lan truyền trong context |
| **Context Distraction** | Phân tâm context | Quá nhiều history gây lặp lại |
| **Context Confusion** | Nhầm lẫn context | Quá nhiều options gây quyết định sai |
| **Context Clash** | Xung đột context | Thông tin mâu thuẫn trong context |
| **Hallucination** | Ảo giác | Model tạo ra thông tin không đúng |
| **Token** | Token | Đơn vị xử lý của LLM (~0.75 từ) |
| **Synthesis** | Tổng hợp | Tạo ra cái mới từ thông tin có |
| **Curation** | Tuyển chọn | Chọn lọc thông tin cẩn thận |
| **Compound** | Tích lũy | Lỗi nhỏ tích lũy thành lỗi lớn |

---

# 📚 TÀI NGUYÊN

## Links
- [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html) - Bài gốc
- [Berkeley Function-Calling Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html)

---

*Tài liệu giải thích các failure modes của long context và cách tránh chúng trong AI agent design.*
