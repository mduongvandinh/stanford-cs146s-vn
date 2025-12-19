# 🎯 HƯỚNG DẪN PROMPT ENGINEERING
## Tổng hợp từ Google Cloud & Các nguồn chuyên môn

---

# 📖 MỤC LỤC

1. [Prompt Engineering là gì?](#1-prompt-engineering-là-gì)
2. [Tại sao Prompt Engineering quan trọng?](#2-tại-sao-prompt-engineering-quan-trọng)
3. [Các thành phần của một Prompt](#3-các-thành-phần-của-một-prompt)
4. [Nguyên tắc viết Prompt hiệu quả](#4-nguyên-tắc-viết-prompt-hiệu-quả)
5. [Các kỹ thuật Prompt cơ bản](#5-các-kỹ-thuật-prompt-cơ-bản)
6. [Best Practices](#6-best-practices)
7. [Những sai lầm thường gặp](#7-những-sai-lầm-thường-gặp)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. PROMPT ENGINEERING LÀ GÌ?

## 📌 Định nghĩa đơn giản

**Prompt Engineering = Nghệ thuật viết câu lệnh cho AI**

Hãy tưởng tượng bạn đang hướng dẫn một người cực kỳ thông minh nhưng **không biết gì về context của bạn**. Bạn càng mô tả rõ ràng, kết quả càng tốt.

---

## 📌 Phân tích từng từ

| Từ | Nghĩa | Giải thích |
|-----|-------|------------|
| **Prompt** | Câu lệnh/Gợi ý | Input bạn đưa cho LLM để yêu cầu nó làm việc |
| **Engineering** | Kỹ thuật | Quá trình thiết kế, thử nghiệm và tối ưu có hệ thống |

**Vậy Prompt Engineering = Quy trình thiết kế và tối ưu câu lệnh để LLM tạo ra output mong muốn.**

---

## 📌 Ví von dễ hiểu

```
PROMPT ENGINEERING giống như:

📸 Chụp ảnh chuyên nghiệp:
- Amateur: Giơ máy lên, bấm
- Professional: Chọn góc, ánh sáng, lens, settings...

💬 Giao tiếp với LLM:
- Amateur: "Viết cho tôi một email"
- Professional: "Viết email chuyên nghiệp gửi sếp,
                 xin nghỉ phép 3 ngày vì lý do gia đình,
                 tone lịch sự, ngắn gọn, khoảng 100 từ"
```

---

# 2. TẠI SAO PROMPT ENGINEERING QUAN TRỌNG?

## 📌 Sự khác biệt về kết quả

```
CÂU HỎI CÙNG CHỦ ĐỀ, PROMPT KHÁC NHAU:

❌ Prompt kém:
"Giải thích machine learning"
→ Output: Bài viết dài, lan man, không focus

✅ Prompt tốt:
"Giải thích machine learning cho học sinh lớp 10,
dùng ví dụ về việc Netflix gợi ý phim,
tối đa 200 từ, không dùng thuật ngữ phức tạp"
→ Output: Giải thích rõ ràng, phù hợp đối tượng
```

## 📌 Tại sao LLM cần prompt tốt?

| Vấn đề | Giải thích | Giải pháp |
|--------|------------|-----------|
| LLM không đọc được suy nghĩ của bạn | Nó chỉ biết những gì bạn viết ra | Viết rõ ràng, đầy đủ context |
| LLM có thể hiểu sai | Ngôn ngữ tự nhiên có nhiều cách hiểu | Cung cấp ví dụ, format mong muốn |
| LLM muốn làm hài lòng | Có thể bịa nếu không chắc | Cho phép nói "không biết" |
| Output có thể không nhất quán | Mỗi lần chạy có thể khác | Dùng temperature thấp, ví dụ rõ ràng |

---

# 3. CÁC THÀNH PHẦN CỦA MỘT PROMPT

## 📌 4 thành phần chính

```
┌─────────────────────────────────────────────────────────────┐
│                    CẤU TRÚC PROMPT                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. INSTRUCTION (Hướng dẫn)                                 │
│     → Mô tả task cần làm                                    │
│     Ví dụ: "Dịch đoạn văn sau sang tiếng Anh"              │
│                                                             │
│  2. CONTEXT (Ngữ cảnh)                                      │
│     → Thông tin bổ sung, background                         │
│     Ví dụ: "Đây là email gửi đối tác kinh doanh"           │
│                                                             │
│  3. INPUT DATA (Dữ liệu đầu vào)                            │
│     → Nội dung cần xử lý                                    │
│     Ví dụ: "Đoạn văn: Xin chào, tôi là..."                 │
│                                                             │
│  4. OUTPUT INDICATOR (Chỉ định output)                      │
│     → Format, độ dài, style mong muốn                       │
│     Ví dụ: "Trả lời bằng JSON, tối đa 100 từ"              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ thực tế

```
PROMPT HOÀN CHỈNH:

[INSTRUCTION]
Bạn là một chuyên gia review code Python.
Hãy phân tích đoạn code dưới đây.

[CONTEXT]
Code này được viết bởi junior developer,
dùng cho hệ thống xử lý đơn hàng e-commerce.

[INPUT DATA]
```python
def process_order(order):
    total = 0
    for item in order:
        total = total + item.price * item.qty
    return total
```

[OUTPUT INDICATOR]
Đưa ra:
1. Điểm mạnh (1-2 điểm)
2. Điểm yếu cần cải thiện (2-3 điểm)
3. Code đã refactor
Format: Markdown với bullet points
```

---

# 4. NGUYÊN TẮC VIẾT PROMPT HIỆU QUẢ

## 📌 Nguyên tắc 1: Rõ ràng và Cụ thể

```
❌ Mơ hồ:
"Viết gì đó về AI"

✅ Cụ thể:
"Viết bài blog 500 từ về ứng dụng AI trong y tế,
tập trung vào chẩn đoán hình ảnh,
đối tượng: bác sĩ không chuyên IT,
tone: chuyên nghiệp nhưng dễ hiểu"
```

## 📌 Nguyên tắc 2: Cung cấp đủ Context

```
❌ Thiếu context:
"Sửa code này cho tôi"
[code]

✅ Đủ context:
"Code Python này đang bị lỗi khi xử lý file CSV có dòng trống.
Lỗi: IndexError at line 15
Mong muốn: Skip các dòng trống thay vì crash
[code]"
```

## 📌 Nguyên tắc 3: Chỉ định Format Output

```
❌ Không chỉ định:
"Phân tích ưu nhược điểm của React"

✅ Có chỉ định:
"Phân tích ưu nhược điểm của React.
Format output:
| Tiêu chí | Ưu điểm | Nhược điểm |
|----------|---------|------------|
(Điền 5 tiêu chí quan trọng nhất)"
```

## 📌 Nguyên tắc 4: Dùng Delimiters

```
Delimiters giúp tách biệt các phần:

---
""" """
``` ```
<tag></tag>
### Section ###

Ví dụ:
"Dịch đoạn văn sau sang tiếng Việt:

'''
The quick brown fox jumps over the lazy dog.
'''

Lưu ý: Giữ nguyên tên riêng nếu có."
```

## 📌 Nguyên tắc 5: Cho Model "Suy nghĩ"

```
❌ Yêu cầu đáp án ngay:
"15% của 847 là bao nhiêu?"

✅ Cho phép suy luận:
"15% của 847 là bao nhiêu?
Hãy tính từng bước."

Output:
"Bước 1: 15% = 15/100 = 0.15
Bước 2: 847 × 0.15 = 127.05
Đáp án: 127.05"
```

---

# 5. CÁC KỸ THUẬT PROMPT CƠ BẢN

## 📌 So sánh tổng quan

| Kỹ thuật | Mô tả | Khi nào dùng |
|----------|-------|--------------|
| Zero-shot | Không có ví dụ | Task đơn giản, model mạnh |
| Few-shot | Có vài ví dụ | Cần format cụ thể |
| Chain-of-Thought | Yêu cầu suy luận | Bài toán logic, phức tạp |
| Self-Consistency | Chạy nhiều lần, vote | Cần độ chính xác cao |
| Role Prompting | Gán vai trò | Cần expertise cụ thể |

## 📌 Zero-shot Prompting

```
Định nghĩa: Hỏi trực tiếp, không cung cấp ví dụ

Ví dụ:
"Phân loại sentiment của câu sau:
'Dịch vụ ở đây tệ quá!'
→ Sentiment: "

Output: "Negative"
```

## 📌 Few-shot Prompting

```
Định nghĩa: Cung cấp một vài ví dụ trước

Ví dụ:
"Dịch tiếng lóng sang tiếng Việt chuẩn:

'Chill đi bro' → 'Thư giãn đi bạn'
'Flex quá trời' → 'Khoe khoang quá'
'Vibe này chill phết' → 'Không khí này thư giãn thật'

'Deadline gấp quá, stress vl' → ?"

Output: "'Hạn nộp gấp quá, căng thẳng quá'"
```

## 📌 Chain-of-Thought (CoT)

```
Định nghĩa: Yêu cầu model giải thích từng bước

Ví dụ:
"Một cửa hàng giảm giá 20%, sau đó giảm thêm 10% trên giá mới.
Giá gốc là 500,000đ. Hỏi giá cuối cùng?
Hãy tính từng bước."

Output:
"Bước 1: Giảm 20% lần đầu
500,000 × (1 - 0.20) = 500,000 × 0.80 = 400,000đ

Bước 2: Giảm thêm 10% trên giá mới
400,000 × (1 - 0.10) = 400,000 × 0.90 = 360,000đ

Đáp án: 360,000đ"
```

## 📌 Role Prompting

```
Định nghĩa: Gán vai trò/persona cho model

Ví dụ:
"Bạn là một bác sĩ dinh dưỡng với 20 năm kinh nghiệm.
Bệnh nhân hỏi: 'Tôi bị tiểu đường type 2, nên ăn gì?'
Hãy tư vấn chuyên nghiệp nhưng dễ hiểu."

→ Output có chuyên môn y tế, tone tư vấn
```

---

# 6. BEST PRACTICES

## 📌 Checklist viết Prompt tốt

```
✅ TRƯỚC KHI VIẾT:
□ Xác định rõ mục tiêu
□ Biết đối tượng output (cho ai đọc?)
□ Xác định format mong muốn

✅ KHI VIẾT:
□ Dùng ngôn ngữ rõ ràng, tránh mơ hồ
□ Cung cấp đủ context
□ Dùng delimiters để tách phần
□ Chỉ định format output
□ Cho ví dụ nếu cần

✅ SAU KHI VIẾT:
□ Đọc lại - có hiểu được không?
□ Test với vài input khác nhau
□ Iterate và cải thiện
```

## 📌 Tips nâng cao

| Tip | Mô tả |
|-----|-------|
| **Iterate** | Prompt đầu tiên hiếm khi hoàn hảo, hãy thử và sửa |
| **Be specific** | "Viết 3 ý" tốt hơn "Viết vài ý" |
| **Use examples** | Một ví dụ tốt = 1000 từ giải thích |
| **Set constraints** | Giới hạn độ dài, format, scope |
| **Allow uncertainty** | Cho phép model nói "không biết" |

---

# 7. NHỮNG SAI LẦM THƯỜNG GẶP

## 📌 Top 5 sai lầm

| # | Sai lầm | Cách khắc phục |
|---|---------|----------------|
| 1 | Prompt quá ngắn, thiếu context | Thêm background, ví dụ, constraints |
| 2 | Prompt quá dài, lan man | Focus vào điểm chính, loại bỏ thừa |
| 3 | Không chỉ định format | Mô tả rõ output mong muốn |
| 4 | Hỏi nhiều thứ cùng lúc | Tách thành nhiều prompt |
| 5 | Không test với edge cases | Thử các input bất thường |

## 📌 Ví dụ sai lầm phổ biến

```
❌ SAI LẦM 1: Quá mơ hồ
"Viết code"

❌ SAI LẦM 2: Quá nhiều yêu cầu
"Viết code Python xử lý CSV, có logging, error handling,
unit tests, documentation, deploy lên AWS, và..."

❌ SAI LẦM 3: Giả định model biết context
"Sửa bug hôm qua cho tôi"
(Model không biết bug hôm qua là gì!)

❌ SAI LẦM 4: Không cho đường thoát
"Bạn PHẢI trả lời, không được nói không biết"
(Dẫn đến hallucination)
```

---

# 8. TỪ ĐIỂN KEYWORDS

## A-F

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Chain-of-Thought** | Chuỗi suy nghĩ | Kỹ thuật yêu cầu model giải thích từng bước |
| **Context** | Ngữ cảnh | Thông tin background giúp model hiểu task |
| **Delimiter** | Dấu phân cách | Ký tự/chuỗi để tách các phần trong prompt |
| **Few-shot** | Vài ví dụ | Cung cấp một số ví dụ trong prompt |

## G-P

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Hallucination** | Ảo giác | LLM bịa thông tin không có thật |
| **Instruction** | Hướng dẫn | Phần mô tả task cần làm |
| **Iteration** | Lặp lại | Quá trình thử và cải thiện prompt |
| **Output Format** | Định dạng đầu ra | Cách trình bày kết quả mong muốn |
| **Prompt** | Câu lệnh | Input đưa cho LLM |

## R-Z

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Role Prompting** | Gán vai trò | Yêu cầu model đóng vai persona cụ thể |
| **Self-Consistency** | Tự nhất quán | Chạy nhiều lần, chọn đáp án phổ biến |
| **Temperature** | Nhiệt độ | Tham số điều chỉnh độ random của output |
| **Zero-shot** | Không ví dụ | Hỏi trực tiếp không cần ví dụ |

---

# 📚 TÀI NGUYÊN THAM KHẢO

- [Google Cloud - What is Prompt Engineering](https://cloud.google.com/discover/what-is-prompt-engineering)
- [OpenAI - Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic - Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)

---

*Tài liệu tổng hợp về Prompt Engineering cơ bản cho người mới bắt đầu.*
