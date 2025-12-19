# 🎯 HƯỚNG DẪN HIỂU VIDEO "AI PROMPT ENGINEERING: A DEEP DIVE"
## Buổi thảo luận bàn tròn từ Anthropic (công ty tạo ra Claude)

**Link video:** https://www.youtube.com/watch?v=T9aRN5JkmL8

---

# 📖 MỤC LỤC

1. [Giới thiệu về video và diễn giả](#1-giới-thiệu-về-video-và-diễn-giả)
2. [Prompt Engineering là gì?](#2-prompt-engineering-là-gì)
3. [Điều gì làm nên một Prompt Engineer giỏi?](#3-điều-gì-làm-nên-một-prompt-engineer-giỏi)
4. [Các kỹ thuật Prompting quan trọng](#4-các-kỹ-thuật-prompting-quan-trọng)
5. [Những sai lầm phổ biến cần tránh](#5-những-sai-lầm-phổ-biến-cần-tránh)
6. [Prompting cho Enterprise vs Cá nhân](#6-prompting-cho-enterprise-vs-cá-nhân)
7. [Tương lai của Prompt Engineering](#7-tương-lai-của-prompt-engineering)
8. [Tips thực hành từ chuyên gia](#8-tips-thực-hành-từ-chuyên-gia)
9. [Từ điển thuật ngữ](#9-từ-điển-thuật-ngữ)

---

# 1. GIỚI THIỆU VỀ VIDEO VÀ DIỄN GIẢ

## 📌 Về video

Đây là buổi thảo luận bàn tròn (roundtable) của **Anthropic** - công ty tạo ra Claude. Video dài khoảng 1 tiếng 16 phút, tập trung hoàn toàn vào chủ đề **Prompt Engineering**.

## 📌 Các diễn giả

| Tên | Vai trò | Chuyên môn |
|-----|---------|------------|
| **Alex Albert** | Lead Developer Relations | Cựu Prompt Engineer, Solutions Architect |
| **David Hershey** | Customer Technical Support | Làm việc với khách hàng enterprise, finetuning |
| **Amanda Askell** | Lead Finetuning Team | Triết học, làm Claude "trung thực và tử tế" |
| **Zack Witten** | Prompt Engineer | Tạo prompt generator, tài liệu giáo dục |

**Điểm đặc biệt:** Đây là những người thực sự làm việc với Claude hàng ngày, không phải lý thuyết suông. Họ chia sẻ kinh nghiệm thực tế từ hàng nghìn giờ tương tác với model.

---

# 2. PROMPT ENGINEERING LÀ GÌ?

## 📌 Định nghĩa từ Zack Witten

> "Prompt engineering là cố gắng khiến model làm được những việc, khai thác tối đa khả năng của model. Làm việc với model để hoàn thành những thứ mà bạn không thể làm được nếu không có nó."

## 📌 Bản chất cốt lõi

```
PROMPT ENGINEERING = GIAO TIẾP RÕ RÀNG + THỬ NGHIỆM LẶP LẠI
```

### Giao tiếp rõ ràng (Clear Communication)

- Nói chuyện với model **giống như nói chuyện với người**
- Hiểu "tâm lý" của model
- Diễn đạt chính xác điều bạn muốn

### Tại sao gọi là "Engineering"?

**Zack giải thích:**
> "Phần engineering đến từ quá trình thử và sai. Một điều tuyệt vời khi nói chuyện với model khác với nói chuyện với người, là bạn có nút restart. Bạn có thể quay lại từ đầu, thử nhiều cách khác nhau một cách độc lập."

```
Quy trình Engineering:
┌─────────────────────────────────────────┐
│  1. Viết prompt ban đầu                 │
│           ↓                             │
│  2. Chạy thử với model                  │
│           ↓                             │
│  3. Đọc kỹ output                       │
│           ↓                             │
│  4. Phân tích: Sai ở đâu? Tại sao?      │
│           ↓                             │
│  5. Sửa prompt                          │
│           ↓                             │
│  6. Lặp lại từ bước 2                   │
└─────────────────────────────────────────┘
```

## 📌 Prompt như là "code bằng ngôn ngữ tự nhiên"

**David Hershey:**
> "Tôi nghĩ về prompts như cách bạn lập trình models. Bạn phải nghĩ về dữ liệu đến từ đâu, trade-offs về latency, version control... Tất cả những thứ bạn nghĩ về khi lập trình đều áp dụng cho prompting."

**Điểm quan trọng:**
- Prompt KHÔNG chỉ là viết một lần rồi xong
- Cần version control như code
- Cần tracking experiments
- Cần testing systematic

---

# 3. ĐIỀU GÌ LÀM NÊN MỘT PROMPT ENGINEER GIỎI?

## 📌 Kỹ năng #1: Giao tiếp rõ ràng

**Amanda Askell:**
> "Khả năng diễn đạt rõ ràng, hiểu tasks một cách rõ ràng, mô tả concepts thật tốt."

**Lưu ý quan trọng từ Amanda:**
> "Tôi thực sự nghĩ rằng việc là một writer giỏi KHÔNG tương quan với việc là prompt engineer giỏi như mọi người nghĩ."

**Tại sao?**
- Người ta nghĩ bạn viết một thứ và xong
- Thực tế: Trong 15 phút, Amanda có thể gửi **hàng trăm prompts** cho model
- Đó là back and forth, back and forth liên tục

## 📌 Kỹ năng #2: Khả năng lặp lại (Iteration)

```
Prompt Engineer GIỎi:
- Viết prompt → Đọc output → Phân tích lỗi → Sửa → Lặp lại
- Sẵn sàng thử hàng trăm lần

Prompt Engineer KÉM:
- Viết prompt → Xem output → "Nó không hoạt động" → Bỏ cuộc
```

## 📌 Kỹ năng #3: Tư duy về Edge Cases

**Amanda Askell:**
> "Nếu bạn có prompt sẽ áp dụng cho 400 cases, rất dễ nghĩ về case điển hình, thấy nó hoạt động, rồi bỏ qua. Đây là sai lầm cổ điển."

**Cách làm đúng:**
```
Thay vì:
  "Prompt hoạt động với case thông thường" → Done ✗

Nên:
  "Tìm các cases BẤT THƯỜNG" → Test với những cases đó
  
Ví dụ edge cases:
- Input rỗng
- Input sai format hoàn toàn
- Input cực dài
- Input có ký tự đặc biệt
- Input mâu thuẫn với instructions
```

## 📌 Kỹ năng #4: Đọc kỹ Model Outputs

**Zack Witten:**
> "Trong machine learning context, bạn được dạy 'look at your data'. Tôi nghĩ tương đương trong prompting là 'look at the model outputs'."

**Ví dụ thực tế:**
```
Sai lầm phổ biến:
- Người dùng viết "think step-by-step" trong prompt
- NHƯNG không kiểm tra xem model có THỰC SỰ thinking step-by-step không
- Model có thể hiểu theo nghĩa trừu tượng hơn

Cách đúng:
- Đọc output kỹ càng
- Kiểm tra: Model có thực sự làm theo không?
- Nếu không → Sửa prompt cho rõ ràng hơn
```

## 📌 Kỹ năng #5: Theory of Mind (Đặt mình vào vị trí model)

**David Hershey:**
> "Rất khó để viết instructions cho một task. Rất khó để tách ra trong đầu bạn tất cả những thứ BẠN BIẾT mà Claude KHÔNG BIẾT và viết nó xuống."

**Bài kiểm tra đơn giản:**
```
Bước 1: Viết prompt của bạn
Bước 2: Đưa cho người KHÔNG BIẾT GÌ về task đó
Bước 3: Hỏi họ: "Bạn có thể làm task này dựa trên instructions này không?"
Bước 4: Nếu họ confused → Prompt của bạn chưa đủ rõ ràng
```

---

# 4. CÁC KỸ THUẬT PROMPTING QUAN TRỌNG

## 📌 Kỹ thuật #1: Chain of Thought (Chuỗi suy nghĩ)

### Định nghĩa
Yêu cầu model giải thích reasoning trước khi đưa ra câu trả lời.

### Cách sử dụng

```
❌ Prompt kém:
"17 x 23 = ?"

✅ Prompt tốt:
"Tính 17 x 23. Hãy giải thích từng bước suy nghĩ của bạn 
trước khi đưa ra đáp án cuối cùng."
```

### Điểm quan trọng từ các chuyên gia

**David Hershey:**
> "Nó chỉ hoạt động. Model của bạn làm tốt hơn nếu bạn cho nó reasoning. Tôi thấy rằng nếu bạn cấu trúc reasoning và giúp model iterate về cách nó nên reasoning, nó hoạt động tốt hơn nữa."

**Amanda Askell về cấu trúc reasoning:**
> "Bạn có thể nói: 'Đây là những bước tôi muốn bạn đi qua' và liệt kê 1, 2, 3. Và bạn cũng có thể nói 'Trong mỗi bước, đây là những điều bạn nên cân nhắc.'"

### Chain of Thought có phải "reasoning thật" không?

**David:**
> "Đây là nơi tôi gặp khó khăn... Có phải là reasoning hay chỉ là không gian để model tính toán? Tôi nghĩ nó gần như không quan trọng - nó đơn giản là HOẠT ĐỘNG."

---

## 📌 Kỹ thuật #2: Few-shot Examples (Ví dụ mẫu)

### Định nghĩa
Cung cấp một vài ví dụ về input → output mong muốn trước khi đưa task thật.

### Cách sử dụng

```
Prompt với few-shot:

"Phân loại sentiment của câu sau.

Ví dụ:
Input: 'Sản phẩm tuyệt vời!'
Output: Positive

Input: 'Dịch vụ quá tệ'
Output: Negative

Input: 'Hàng bình thường thôi'
Output: Neutral

Bây giờ phân loại câu sau:
Input: 'Giao hàng nhanh, đóng gói cẩn thận'
Output: "
```

### Khi nào NÊN dùng few-shot?

| Nên dùng | Không nên dùng |
|----------|---------------|
| Format output cụ thể | Tasks đơn giản model đã biết |
| Tasks phức tạp, không phổ biến | Khi bạn muốn diversity trong output |
| Cần consistency | Với images (ít hiệu quả hơn) |

### Lưu ý quan trọng từ Amanda

> "Tôi không dùng few-shot examples có model response trong đó. Trực giác đó có vẻ đến từ pretrained models mà không phù hợp với RLHF models."

**Giải thích:**
- Với RLHF models (như Claude), không cần "đặt lời vào miệng" model
- Thay vào đó, dùng ví dụ minh họa về task, không phải về "model đã nói gì"

---

## 📌 Kỹ thuật #3: Structuring (Cấu trúc hóa)

### Sử dụng XML tags

```
Prompt có cấu trúc tốt:

<task>
Bạn là một assistant giúp phân tích document.
</task>

<instructions>
1. Đọc document được cung cấp
2. Tóm tắt các điểm chính
3. Liệt kê action items (nếu có)
</instructions>

<document>
[Nội dung document ở đây]
</document>

<output_format>
- Summary: [tóm tắt ngắn gọn]
- Key points: [danh sách bullet points]
- Action items: [danh sách nếu có, "None" nếu không]
</output_format>
```

### Tại sao cấu trúc quan trọng?

**Zack Witten:**
> "Một cách để hướng dẫn model format output là dùng XML tags trong prompt. Nếu bạn dùng tags nhất quán trong prompt, model có xu hướng trả về output với cùng tags đó."

---

## 📌 Kỹ thuật #4: Hỏi model để debug prompt

### Cách làm

**Amanda Askell chia sẻ:**
> "Một trong những điều đầu tiên tôi làm với prompt ban đầu là đưa cho model và nói: 'Tôi không muốn bạn follow instructions này. Tôi chỉ muốn bạn cho tôi biết những chỗ nào unclear hoặc ambiguous, hoặc những gì bạn không hiểu.'"

```
Prompt để debug:

"Tôi sẽ đưa cho bạn một set instructions. 
ĐỪNG làm theo instructions đó.
Thay vào đó, hãy cho tôi biết:
1. Những chỗ nào không rõ ràng?
2. Có ambiguity nào không?
3. Bạn không hiểu điều gì?

Instructions:
[Paste prompt của bạn ở đây]"
```

### Khi model mắc lỗi

```
"Bạn đã làm sai task này. 
Bạn có thể suy nghĩ về lý do tại sao không?
Và có thể viết một phiên bản edited của instructions 
mà sẽ giúp bạn không mắc lỗi đó?"
```

**Amanda:**
> "Rất nhiều lần, model gets it right. Model nói 'Đây là điều không rõ, đây là cách sửa', và khi bạn dùng cách sửa đó, nó hoạt động."

---

## 📌 Kỹ thuật #5: Honest Context (Ngữ cảnh trung thực)

### Role prompting: Nên hay không?

**Câu hỏi:** Có nên nói "Bạn là một giáo viên" hoặc "Bạn là một chuyên gia" không?

**Amanda Askell (cực kỳ quan trọng):**
> "Tôi không thấy cần thiết phải nói dối với models. Models hiện đại hiểu nhiều về thế giới. Nếu bạn muốn tạo eval dataset cho language model, đó khác với tạo quiz cho trẻ em. Model BIẾT thế nào là LLM evals. Sao tôi phải giả vờ muốn làm task khác?"

### Ví dụ so sánh

```
❌ Role prompting truyền thống (có thể không tốt):
"Bạn là một giáo viên đang tạo quiz cho học sinh."
→ Nhưng thực tế bạn muốn tạo eval cho LLM

✅ Honest context (khuyến khích):
"Tôi là một AI researcher đang tạo evaluation dataset 
cho language models. Tôi cần bạn tạo các câu hỏi 
trông giống như evaluation của language model."
```

### Khi nào role prompting có thể hữu ích?

**Zack Witten:**
> "Có những trường hợp không phải nói dối mà là cho metaphor để model suy nghĩ. Ví dụ, tôi muốn Claude đánh giá chart có tốt không. Prompt tốt nhất là hỏi: 'Bạn sẽ cho grade nào nếu chart này được nộp như bài tập high school?'"

**Sự khác biệt:**
- Đây không phải nói dối ("Bạn là giáo viên")
- Đây là metaphor để calibrate scale đánh giá

---

# 5. NHỮNG SAI LẦM PHỔ BIẾN CẦN TRÁNH

## 📌 Sai lầm #1: Không đọc kỹ output

```
SAI:
1. Viết prompt
2. Nhìn qua output: "Có vẻ okay"
3. Deploy

ĐÚNG:
1. Viết prompt
2. ĐỌC KỸ từng dòng output
3. Hỏi: "Model có thực sự làm theo không?"
4. Hỏi: "Reasoning của nó có hợp lý không?"
5. Iterate nếu cần
```

## 📌 Sai lầm #2: Chỉ test với typical cases

**Amanda:**
> "Dễ nghĩ về case điển hình, thấy nó đúng, rồi move on. Đây là classic mistake."

```
PHẢI test với:
- Input rỗng
- Input sai format
- Input edge cases
- Input mâu thuẫn
- Input cực dài/cực ngắn
```

## 📌 Sai lầm #3: Giả định model biết context của bạn

**David Hershey:**
> "Rất nhiều lần tôi thấy prompts mà người viết dựa quá nhiều vào prior understanding của họ về task. Khi họ show tôi, tôi nói: 'Điều này không có nghĩa gì cả. Không có từ nào bạn viết có nghĩa, vì tôi không biết gì về use case của bạn.'"

```
Bài test đơn giản:
Đưa prompt cho người KHÔNG BIẾT GÌ về context
→ Nếu họ không hiểu → Prompt chưa đủ rõ
→ Model cũng sẽ không hiểu
```

## 📌 Sai lầm #4: Underestimate model

**David Hershey:**
> "Tôi luôn ngạc nhiên... Nhiều người cảm thấy như họ đang babying system. Như 'đây là thứ cute nhỏ, không thông minh lắm, tôi cần dumb things down cho Claude level.' Nếu bạn nghĩ Claude thông minh và đối xử với nó như vậy, nó có xu hướng làm khá tốt."

**Amanda's tip:**
> "Khi tôi muốn model học một prompting technique, thay vì mô tả technique đó, tôi just give it the paper. Model có thể đọc paper."

```
❌ Underestimate:
"Để tôi giải thích đơn giản technique này cho bạn..."
(Mất thời gian viết lại điều đã có sẵn)

✅ Trust the model:
"Đây là paper về prompting technique X. 
Hãy đọc và tạo 17 examples theo technique này."
```

## 📌 Sai lầm #5: Không cho model "đường thoát"

**David Hershey:**
> "Khi test prompts với edge cases, model sẽ bắt đầu làm những điều kỳ lạ. Bạn đưa cho nó thứ gì đó hoàn toàn unexpected và nó vẫn cố produce output bình thường."

```
✅ Luôn cho model đường thoát:

"Nếu input không phải là [format mong đợi], 
hãy trả về 'INVALID_INPUT' và giải thích tại sao."

"Nếu bạn không chắc chắn, hãy nói 'Tôi không chắc' 
thay vì đoán."

"Nếu không có đủ thông tin để trả lời, 
hãy hỏi clarifying question."
```

---

# 6. PROMPTING CHO ENTERPRISE VS CÁ NHÂN

## 📌 Sự khác biệt quan trọng

| Khía cạnh | Personal (Claude.ai) | Enterprise |
|-----------|---------------------|------------|
| Mục tiêu | Đúng 1 lần | Đúng triệu lần |
| Testing | Minimal | Extensive với nhiều edge cases |
| Human-in-loop | Có thể sửa realtime | Không có |
| Stakes | Thấp | Cao |
| Iteration | Có thể edit và retry | Prompt phải cover mọi scenario |

## 📌 Enterprise prompting

**David Hershey:**
> "Hầu hết enterprise prompts, bạn sẽ dùng nó 1 triệu lần, 10 triệu lần, 100 triệu lần. Sự care và thought bạn đặt vào phải test against toàn bộ range of things."

**Yêu cầu cho enterprise:**
```
1. Test với toàn bộ spectrum of inputs
2. Handle mọi edge cases
3. Graceful failure (không crash kỳ lạ)
4. Consistent output format
5. Clear error messages
6. Security considerations
```

## 📌 Personal prompting

**Zack Witten:**
> "Nếu tôi viết prompts để dùng trên Claude.ai, tôi iterate cho đến khi đúng một lần. Xong rồi, tôi đã làm xong."

**Đặc điểm:**
- Có thể nói "bạn hiểu sai, thử lại"
- Có thể edit message và retry
- Human feedback realtime
- Lower stakes

---

# 7. TƯƠNG LAI CỦA PROMPT ENGINEERING

## 📌 Prompting "hacks" sẽ biến mất

**Amanda Askell:**
> "Khi chúng tôi tìm ra prompting technique tốt, câu hỏi tiếp theo là: làm sao train điều này vào model? Vì lý do đó, những thứ tốt nhất luôn short-lived."

**Ví dụ cụ thể:**
```
TRƯỚC: Phải nói "think step-by-step" cho math
       → Boost performance lớn

SAU: Model tự động think step-by-step với math problems
     → Không cần prompt nữa

"Hacks biến mất, hoặc nếu chưa biến mất, 
 chúng tôi đang bận training chúng đi."
```

## 📌 Điều gì KHÔNG biến mất?

**David:**
> "Examples và chain of thought... đó không phải tricks. Đó ở level của communication."

**Những thứ sẽ luôn quan trọng:**
1. Clear communication
2. Providing context
3. Giving examples
4. Structured reasoning
5. Understanding the task deeply

## 📌 Models ngày càng thông minh hơn

**David Hershey:**
> "Tôi đã có nhiều respect hơn cho models về việc tôi có thể nói với chúng bao nhiêu, bao nhiêu context tôi có thể cho chúng. Trước đây, tôi sẽ intentionally hide complexity vì sợ nó confused. Bây giờ, tôi biased trust nó với more information."

**Amanda:**
> "Khi models capable hơn và understand nhiều hơn về world, tôi không thấy cần nói dối chúng."

## 📌 Tương lai: Model hỏi ngược lại

**Amanda Askell:**
> "Ngay bây giờ models không really hỏi good, probing questions như người. Nếu tôi đưa Zack directions, anh ấy sẽ hỏi 'Cái này không có nghĩa, tôi làm gì ở bước này?' Model không làm vậy."

**Prediction:**
```
HIỆN TẠI: Bạn phải anticipate mọi question
TƯƠNG LAI: Model tự hỏi clarifying questions
           Model tự extract điều bạn thực sự muốn
```

---

# 8. TIPS THỰC HÀNH TỪ CHUYÊN GIA

## 📌 Từ Zack Witten

### Tip #1: Đọc prompts tốt và model outputs

> "Bất cứ khi nào tôi thấy prompt tốt ai đó viết ở Anthropic, tôi đọc kỹ. Cố phân tích nó đang làm gì và tại sao."

### Tip #2: Experimentation

> "Nói chuyện với model nhiều. Thử nghiệm."

---

## 📌 Từ Amanda Askell

### Tip #1: Đưa prompt cho người khác

> "Đưa prompt của bạn cho người khác có thể helpful, đặc biệt người không có context về việc bạn đang làm."

### Tip #2: Làm nhiều, enjoy it

> "Boring advice: làm đi làm lại nhiều lần. Nhiều người giỏi prompting là vì họ actually enjoy nó."

### Tip #3: Triết học writing style

> "Có một style viết triết học mà papers của bạn phải legible cho educated layperson. Ai đó nhặt paper lên và đọc, họ hiểu được mọi thứ. Tôi quen nghĩ về educated layperson - họ rất smart, nhưng không biết gì về topic này. Prompting felt very similar."

**Tóm tắt:**
> "Lấy những thứ trong brain bạn, phân tích chúng đủ để feel like bạn fully understand, rồi có thể take bất kỳ người nào trên đường, người reasonable, và externalize brain bạn vào họ. That's the core of prompting."

---

## 📌 Từ David Hershey

### Tip #1: Respect the model

> "Nhiều người feel như họ đang babying system. Nếu bạn nghĩ Claude smart và treat nó như vậy, nó tends to do pretty good."

### Tip #2: Be prescriptive about context

> "Nếu bạn viết assistant trong product, tell me I'm in the product. Tell me I'm writing on behalf of this company. I'm embedded in this product. I'm the support chat window."

### Tip #3: Cho model paper thay vì giải thích

> "Khi tôi muốn model học prompting technique, tôi không mô tả nó - tôi just give it the paper. Nó đọc paper rồi."

---

# 9. TỪ ĐIỂN THUẬT NGỮ

## A-C

| Thuật ngữ | Nghĩa | Giải thích |
|-----------|-------|------------|
| **Chain of Thought (CoT)** | Chuỗi suy nghĩ | Kỹ thuật yêu cầu model giải thích reasoning trước khi trả lời |
| **Context Window** | Cửa sổ ngữ cảnh | Lượng text model có thể "nhìn thấy" cùng lúc |
| **Clear Communication** | Giao tiếp rõ ràng | Kỹ năng quan trọng nhất trong prompting |

## E-I

| Thuật ngữ | Nghĩa | Giải thích |
|-----------|-------|------------|
| **Edge Cases** | Trường hợp biên | Inputs bất thường cần test |
| **Enterprise Prompting** | Prompting doanh nghiệp | Prompts dùng cho production, cần robust |
| **Few-shot Examples** | Ví dụ mẫu | Cung cấp vài ví dụ trước task thật |
| **Iteration** | Lặp lại | Quá trình thử, sửa, thử lại nhiều lần |

## L-R

| Thuật ngữ | Nghĩa | Giải thích |
|-----------|-------|------------|
| **Latent Space** | Không gian ẩn | Representation nội bộ của model |
| **Model Outputs** | Kết quả từ model | Những gì model trả về - cần đọc kỹ |
| **Pretrained Model** | Model đã pretrain | Model trước khi finetuning với RLHF |
| **RLHF** | Reinforcement Learning from Human Feedback | Kỹ thuật training model theo feedback người |
| **Role Prompting** | Prompting vai trò | Gán vai trò cho model (ví dụ: "Bạn là giáo viên") |

## S-Z

| Thuật ngữ | Nghĩa | Giải thích |
|-----------|-------|------------|
| **System Prompt** | Prompt hệ thống | Instructions ẩn, được thêm trước mọi conversation |
| **Theory of Mind** | Thuyết tâm trí | Khả năng hiểu model sẽ interpret instructions như thế nào |
| **XML Tags** | Thẻ XML | Cách cấu trúc prompt với các tags như `<task>`, `<instructions>` |

---

# 📚 TÓM TẮT CÁC ĐIỂM QUAN TRỌNG NHẤT

## Top 10 Takeaways

1. **Clear communication là quan trọng nhất** - Không có trick nào thay thế được việc diễn đạt rõ ràng

2. **Đọc kỹ model outputs** - Đây là tương đương của "look at your data" trong ML

3. **Test với edge cases** - Đừng chỉ test với typical cases

4. **Iterate nhiều lần** - Prompt engineer giỏi thử hàng trăm versions

5. **Trust the model** - Đừng underestimate, đưa paper thay vì giải thích

6. **Be honest** - Không cần role play, nói thẳng context thật

7. **Dùng model để debug prompt** - Hỏi model về ambiguities

8. **Cho model đường thoát** - Handle unexpected inputs gracefully

9. **Chain of thought works** - Luôn cho model "không gian suy nghĩ"

10. **Externalize your brain** - Viết như đang giải thích cho educated layperson

---

**Quote để nhớ từ Amanda Askell:**
> "That's the core of prompting - lấy những thứ trong brain bạn, phân tích chúng đủ để bạn fully understand, rồi externalize brain bạn vào người khác."

---

*Tài liệu được tạo để giải thích video "AI Prompt Engineering: A Deep Dive" từ Anthropic cho người mới bắt đầu.*
