# Week 7: AI Code Review - Tổng hợp nội dung

## Thông tin khóa học
- **Khóa học**: CS146S - The Modern Software Developer
- **Trường**: Stanford University, Fall 2025
- **Giảng viên**: Mihail Eric
- **Guest Lecture**: Tomas Reimers (CPO của Graphite)
- **Website**: themodernsoftware.dev

---

## Phần 1: Tại sao Code Review quan trọng

### Giá trị của Code Review
Code review là một trong những hoạt động có **đòn bẩy cao nhất** để trở thành kỹ sư giỏi hơn và cải thiện chất lượng code của team.

### Thống kê đáng chú ý
| Metric | Kết quả |
|--------|---------|
| Tỷ lệ phát hiện lỗi của code review | 55-60% |
| Tỷ lệ phát hiện lỗi của testing | 25-45% |
| Lỗi trước code review | 4.5 lỗi/100 dòng |
| Lỗi sau code review | 0.82 lỗi/100 dòng |
| Tăng năng suất (nghiên cứu AT&T) | +14% |
| Giảm defects (nghiên cứu AT&T) | -90% |

---

## Phần 2: Code Review nên bắt gì?

### 1. Logic và Correctness Errors
```python
# Buggy: dùng `is` cho so sánh
if status is "ok":
    process()

# Correct: dùng `==`
if status == "ok":
    process()
```

### 2. Readability và Maintainability
```python
# Hard to read
x = [i for i in range(100) if i % 7 == 0 and i % 5 != 0 or i % 11 == 0]

# Clearer with helper functions
def is_valid(n):
    return (n % 7 == 0 and n % 5 != 0) or n % 11 == 0

x = [i for i in range(100) if is_valid(i)]
```

### 3. Performance
```python
# O(n^2) - unnecessary repeated lookups
for user in users:
    if user in big_list:
        process(user)

# Better - O(n) using a set
big_set = set(big_list)
for user in users:
    if user in big_set:
        process(user)
```

### 4. Security
```python
# Dangerous: executing user input
eval(user_input)

# Safe alternative
import ast
safe_expr = ast.literal_eval(user_input)
```

### 5. Best Practices
```python
# Non-standard pattern: accessing by username
user = users_by_username["alice123"]
send_email(user["email"])

# Standard pattern: accessing by user_id
user = users_by_id[user_id]
send_email(user["email"])
```

---

## Phần 3: Code Review Hierarchy of Needs

Từ quan trọng nhất đến ít quan trọng nhất:

```
         ▲ Least Important
         │
    ┌────┴────┐
    │  Style  │
    ├─────────┤
    │Find Bugs│
    ├─────────┤
    │ Design  │
    │Discussion│
    ├─────────┤
    │ Correct │
    │Solution │
    ├─────────┤
    │ Mental  │
    │Alignment│
    └─────────┘
         │
         ▼ Most Important
```

---

## Phần 4: Code Review tốt vs xấu

### Bad Review
> "This won't work"

### Good Review
> "I see your new method matches the existing style in this file, taking [X] parameters. Having that many parameters hurts readability and implies the function is doing too much. What do you think about refactoring this method and the existing ones in a later pull request to reduce how many parameters they take?"

---

## Phần 5: AI Code Review Tools

### Các công cụ hiện đại
- **Graphite** - AI-powered code review platform
- **Greptile** - Codebase-aware AI review
- **Coderabbit** - Automated code review
- **Claude Code / Codex** - AI coding assistants

### Lợi ích của AI Code Review
1. **Efficiency** - Review nhanh hơn
2. **Consistency** - Đánh giá nhất quán
3. **Knowledge sharing** - Chia sẻ kiến thức tự động
4. **Reduced cognitive load** - Giảm gánh nặng cho reviewer
5. **Continuous improvement** - Học liên tục
6. **Holistic understanding** - Hiểu toàn diện codebase

### AI có thể bắt được gì?

| LLMs có thể bắt | Humans muốn nhận |
|-----------------|------------------|
| BEST_PRACTICE | DOCUMENTATION |
| CODE_CLEANLINESS | ACCIDENTAL |
| STYLE | BUG |
| | EDGE_CASE |
| | PERFORMANCE |
| | SECURITY |

| LLMs chưa bắt được | Humans không muốn nhận từ LLM |
|--------------------|-------------------------------|
| SCOPE_CREEP | |
| PREFERENCE | TRIBAL_KNOWLEDGE |

---

## Phần 6: Hạn chế của AI Code Review

1. **More configuration/setup** - Cần thiết lập nhiều hơn
2. **False positives** - Cần train hệ thống liên tục
3. **Can't catch idioms** - Chưa hiểu best practices riêng của repo
4. **Can't handle complex business logic** - Đây là nơi con người vẫn cần thiết
5. **Extra cautious with security** - Cần cẩn thận với thay đổi bảo mật
6. **Often misses edge cases** - Thường bỏ sót edge cases

> **Quan trọng**: Code review quan trọng hơn bao giờ hết với AI coding systems. Bạn sở hữu code được merge và ship - không được đổ lỗi cho AI!

---

## Phần 7: Lịch sử Code Review

### 1976: Fagan Inspections (IBM)
- Michael Fagan giới thiệu phương pháp inspection đầu tiên
- Review code in ra giấy

### Email Patches
- Gửi patches qua email
- Linux kernel vẫn dùng phương pháp này

### 2000s: Mondrian (Google)
- Guido van Rossum (Python's BDFL) tạo web UI đầu tiên cho code review

### Online Tools
- Review Board
- Gerrit / Critique (Google)
- Phabricator (Facebook)
- GitHub

---

## Phần 8: Developer Collaboration Flow

```
CREATE → REVIEW → MERGE
   │        │        │
   ▼        ▼        ▼
Pull    Comments   Merge
Request  & Approve  to main
```

### Pull Request (còn gọi là)
- Diff
- Patch
- Changelist
- Merge Request

---

## Phần 9: Mục đích của Code Review (theo thứ tự)

1. **Alignment confirmation** - Xác nhận sự đồng thuận
2. **Knowledge diffusion** - Lan tỏa kiến thức
3. **Proofreading** - Kiểm tra lỗi

### AI sẽ hợp tác với con người như thế nào?

| Platform | Participant |
|----------|-------------|
| Tốt cho context gathering | Tốt cho việc thay thế hoàn toàn |
| Augment human reviewers | Replace human reviewers |

---

## Phần 10: Software Development in the Limit

### Inner Loop vs Outer Loop

```
    Inner Loop              Outer Loop
    (Development)           (Collaboration)

    Code → Build            Author → Test
      ↑      ↓               ↑        ↓
    Debug ← │            Deploy ← Review
              └──────────────┘
                   Merge
```

### AI đang làm Inner Loop nhanh hơn 10x
- Cursor
- GitHub Copilot
- v0
- Windsurf

### Ba hướng cho thế hệ developer tiếp theo

| CYBORG | EM | AGENCY |
|--------|-----|--------|
| Developers trực tiếp **review** changes, được AI hỗ trợ | Developers **manage** AI trực tiếp | Developers coi AI như **contractor** bên ngoài |
| Underwrite architecture | Underwrite architecture | Underwrite **product requirements** |
| | Không cần chi tiết kỹ thuật | Không underwrite code |

---

## Phần 11: Graphite Platform

### Tính năng chính
1. **AI Review Agent** - Bắt bugs, enforce conventions, phát hiện security vulnerabilities
2. **Stacking** - Git workflow tối ưu cho authors không bị block bởi reviewers
3. **Smarter CI** - Predictive CI chỉ chạy khi cần
4. **Team review experience** - Reviewer assignment, merge queues, automations
5. **Developer productivity metrics** - Đo lường hiệu quả

### Kết quả tại các công ty
| Công ty | Metric | Kết quả |
|---------|--------|---------|
| Shopify | PRs shipped per developer | +33% |
| Asana | LoC/eng | +21% |
| Ramp | Time between PRs merged | -74% |

---

## Takeaways chính

1. **Code review là hoạt động high-leverage** - 55-60% error detection rate
2. **Hierarchy of needs**: Mental Alignment > Correct Solution > Design > Find Bugs > Style
3. **AI tools đang transform code review** - Graphite, Greptile, Coderabbit
4. **AI tốt cho proofreading**, con người vẫn cần cho alignment và knowledge
5. **Code review quan trọng hơn bao giờ hết** với AI-generated code
6. **Tương lai**: Cyborg (human+AI review), EM (manage AI), hoặc Agency (AI as contractor)
7. **Inner loop đang được AI tăng tốc 10x**, outer loop cần theo kịp

---

## Tài liệu tham khảo

- Fagan, M. (1976). Design and Code Inspections. IBM Systems Journal.
- Coding Horror - Code Review Statistics
- Blake Smith - Code Review Hierarchy of Needs
- Greptile - AI vs Human skill comparison
- Graphite Documentation
