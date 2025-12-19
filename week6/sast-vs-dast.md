# 🔒 SAST VS DAST
## So sánh hai phương pháp kiểm thử bảo mật ứng dụng

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [SAST - Static Application Security Testing](#2-sast---static-application-security-testing)
3. [DAST - Dynamic Application Security Testing](#3-dast---dynamic-application-security-testing)
4. [So sánh chi tiết](#4-so-sánh-chi-tiết)
5. [Khi nào dùng phương pháp nào?](#5-khi-nào-dùng-phương-pháp-nào)
6. [RASP - Giải pháp bổ sung](#6-rasp---giải-pháp-bổ-sung)
7. [Từ điển Keywords](#7-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Định nghĩa

```
SAST vs DAST = Hai phương pháp kiểm thử bảo mật bổ sung nhau

┌─────────────────────────────────────────────────────┐
│                                                     │
│  SAST (Static):                                    │
│  "Kiểm tra MÃ NGUỒN trước khi chạy"               │
│                                                     │
│  DAST (Dynamic):                                   │
│  "Kiểm tra ỨNG DỤNG ĐANG CHẠY từ bên ngoài"      │
│                                                     │
│  BEST PRACTICE: Sử dụng CẢ HAI                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Quick Comparison

| Aspect | SAST | DAST |
|--------|------|------|
| **Testing Type** | White-box (truy cập code) | Black-box (chỉ bên ngoài) |
| **Timing** | Sớm trong SDLC | Giai đoạn sau/pre-deployment |
| **Vulnerabilities** | Code-level flaws | Runtime & config issues |
| **Fix Cost** | Thấp (phát hiện sớm) | Cao (phát hiện muộn) |
| **False Positives** | Cao hơn | Thấp hơn |
| **Language Dependent** | Có | Không |

---

# 2. SAST - STATIC APPLICATION SECURITY TESTING

## 📌 Định nghĩa

```
SAST = WHITE-BOX TESTING

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Phân tích mã nguồn và binary KHÔNG CẦN           │
│   chạy ứng dụng"                                   │
│                                                     │
│  PHÁT HIỆN:                                        │
│  • XSS (Cross-Site Scripting)                      │
│  • SQL Injection                                   │
│  • Buffer Overflows                                │
│  • Hardcoded credentials                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Các kỹ thuật SAST

```
SAST TECHNIQUES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. PATTERN MATCHING                               │
│     ─────────────────                              │
│     Phát hiện coding practices không an toàn       │
│                                                     │
│  2. DATA FLOW ANALYSIS                             │
│     ────────────────────                           │
│     Theo dõi đường đi của untrusted input          │
│                                                     │
│  3. CONTROL FLOW ANALYSIS                          │
│     ─────────────────────                          │
│     Kiểm tra loops và conditionals                 │
│                                                     │
│  4. CUSTOM RULE CREATION                           │
│     ────────────────────                           │
│     Rules theo best practices của tổ chức          │
│                                                     │
│  5. DEPENDENCY SCANNING                            │
│     ────────────────────                           │
│     Identify vulnerable third-party libraries      │
│                                                     │
│  6. MACHINE LEARNING                               │
│     ─────────────────                              │
│     Nhận diện unknown vulnerabilities              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Ưu và nhược điểm SAST

| Ưu điểm | Nhược điểm |
|---------|------------|
| Phát hiện sớm, giảm chi phí sửa | Nhiều false positives |
| Phân tích thorough code branches | Không detect runtime vulnerabilities |
| Tích hợp CI/CD dễ dàng | Cần tools riêng cho từng ngôn ngữ |
| Chỉ ra vị trí chính xác lỗi | Khó với external libraries/APIs |

---

# 3. DAST - DYNAMIC APPLICATION SECURITY TESTING

## 📌 Định nghĩa

```
DAST = BLACK-BOX TESTING

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Đánh giá ứng dụng ĐANG CHẠY từ góc nhìn          │
│   bên ngoài, mô phỏng tấn công thực tế"            │
│                                                     │
│  PHÁT HIỆN:                                        │
│  • Runtime vulnerabilities                         │
│  • Configuration issues                            │
│  • Authentication flaws                            │
│  • Session management problems                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Quy trình DAST

```
DAST 4-STEP PROCESS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Step 1: SCANNING                                  │
│  ─────────────────                                 │
│  Discover entry points (URLs, forms, APIs)         │
│                                                     │
│  Step 2: ATTACK SIMULATION                         │
│  ─────────────────────────                         │
│  Gửi crafted requests mô phỏng attacker            │
│                                                     │
│  Step 3: RESPONSE ANALYSIS                         │
│  ────────────────────────                          │
│  Phân tích responses tìm weaknesses                │
│                                                     │
│  Step 4: REPORTING                                 │
│  ─────────────────                                 │
│  Generate reports với remediation recommendations  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Ưu và nhược điểm DAST

| Ưu điểm | Nhược điểm |
|---------|------------|
| Detect runtime vulnerabilities | Miss deeper code-level flaws |
| Không cần source code | Áp dụng muộn trong dev cycle |
| Language-independent | Resource-intensive cho large apps |
| Mô phỏng realistic attacks | Có thể miss flaws chỉ thấy qua code |

---

# 4. SO SÁNH CHI TIẾT

## 📌 Comparison Table

```
DETAILED COMPARISON:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ASPECT          │ SAST          │ DAST            │
│  ════════════════╪═══════════════╪═════════════════│
│  Approach        │ Inside-out    │ Outside-in      │
│  Code Access     │ Required      │ Not required    │
│  Testing Phase   │ Development   │ Pre-production  │
│  Vulnerabilities │ Code flaws    │ Runtime issues  │
│  Speed           │ Fast (no run) │ Slower (runtime)│
│  False Positives │ Higher        │ Lower           │
│  Coverage        │ All code paths│ Reachable paths │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Vulnerability Types

```
WHAT EACH DETECTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  SAST DETECTS:                                     │
│  • SQL Injection patterns                          │
│  • Hardcoded passwords                             │
│  • Buffer overflow potential                       │
│  • Insecure crypto usage                           │
│  • Code quality issues                             │
│                                                     │
│  DAST DETECTS:                                     │
│  • Authentication bypass                           │
│  • Session management flaws                        │
│  • Server misconfigurations                        │
│  • Input validation issues                         │
│  • Information leakage                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. KHI NÀO DÙNG PHƯƠNG PHÁP NÀO?

## 📌 Choose SAST When

```
SAST TỐT CHO:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ Early development phases                       │
│     Bắt hardcoded credentials, SQL injection sớm   │
│                                                     │
│  ✅ Code review integration                        │
│     Trước khi commit vào repository                │
│                                                     │
│  ✅ CI/CD pipelines                                │
│     Automated feedback liên tục                    │
│                                                     │
│  ✅ Large codebases                                │
│     Incremental scanning hiệu quả                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Choose DAST When

```
DAST TỐT CHO:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ Pre-production testing                         │
│     Trong staging environment                      │
│                                                     │
│  ✅ Post-deployment monitoring                     │
│     Phát hiện emerging threats                     │
│                                                     │
│  ✅ Third-party integration                        │
│     Validate security của external services        │
│                                                     │
│  ✅ Runtime vulnerability identification           │
│     Issues chỉ xuất hiện khi chạy                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Best Practice: Hybrid Approach

```
RECOMMENDED STRATEGY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Sử dụng CẢ HAI như complementary layers"        │
│                                                     │
│  DEVELOPMENT PHASE:                                │
│  ├── SAST catches code-level issues               │
│  └── Early, low-cost fixes                        │
│                                                     │
│  PRE-DEPLOYMENT:                                   │
│  ├── DAST identifies runtime vulnerabilities      │
│  └── Last line of defense                         │
│                                                     │
│  AUTOMATION:                                       │
│  └── Both trong CI/CD pipelines                   │
│      → Continuous security feedback               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. RASP - GIẢI PHÁP BỔ SUNG

## 📌 Runtime Application Self-Protection

```
RASP = REAL-TIME PROTECTION

┌─────────────────────────────────────────────────────┐
│                                                     │
│  KHÁC VỚI SAST/DAST:                               │
│  • Embed trực tiếp trong runtime environment       │
│  • ACTIVELY BLOCKS threats, không chỉ detect       │
│  • Real-time protection                            │
│                                                     │
│  LIMITATIONS:                                      │
│  • Không thay thế việc fix underlying vulnerabilities│
│  • Có thể impact performance                       │
│                                                     │
│  BEST APPROACH:                                    │
│  → Combine SAST + DAST + RASP                     │
│  → Full application lifecycle protection          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Complete Security Strategy

```
COMPREHENSIVE APPROACH:

         ┌─────────────────────────────────────┐
         │                                     │
    DEV  │  [SAST] ──→ Code Analysis          │
         │      ↓                              │
   TEST  │  [DAST] ──→ Runtime Testing        │
         │      ↓                              │
   PROD  │  [RASP] ──→ Active Protection      │
         │                                     │
         └─────────────────────────────────────┘

         = DEFENSE IN DEPTH
```

---

# 7. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **SAST** | Static Application Security Testing | Kiểm tra mã nguồn tĩnh |
| **DAST** | Dynamic Application Security Testing | Kiểm tra ứng dụng động |
| **RASP** | Runtime Application Self-Protection | Bảo vệ runtime tự động |
| **White-box** | Hộp trắng | Testing với truy cập code |
| **Black-box** | Hộp đen | Testing không cần code |
| **False Positive** | Dương tính giả | Báo lỗi không thực sự tồn tại |
| **SDLC** | Software Development Life Cycle | Vòng đời phát triển phần mềm |
| **CI/CD** | Continuous Integration/Delivery | Tích hợp và triển khai liên tục |
| **Remediation** | Khắc phục | Sửa chữa vulnerabilities |
| **Data Flow Analysis** | Phân tích luồng dữ liệu | Theo dõi đường đi của data |

---

# 📚 TÀI NGUYÊN

## Links
- [SAST vs DAST - Splunk](https://www.splunk.com/en_us/blog/learn/sast-vs-dast.html) - Nguồn gốc
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) - Hướng dẫn testing
- [NIST Application Security](https://csrc.nist.gov/Topics/software-and-application-security) - Standards

---

*Tài liệu so sánh SAST và DAST - hai phương pháp kiểm thử bảo mật ứng dụng quan trọng.*
