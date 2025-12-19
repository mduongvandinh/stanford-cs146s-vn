# 🛡️ OWASP TOP TEN
## 10 Rủi ro bảo mật ứng dụng web hàng đầu

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [A01: Broken Access Control](#2-a01-broken-access-control)
3. [A02: Cryptographic Failures](#3-a02-cryptographic-failures)
4. [A03: Injection](#4-a03-injection)
5. [A04: Insecure Design](#5-a04-insecure-design)
6. [A05: Security Misconfiguration](#6-a05-security-misconfiguration)
7. [A06: Vulnerable Components](#7-a06-vulnerable-components)
8. [A07: Authentication Failures](#8-a07-authentication-failures)
9. [A08: Software Integrity Failures](#9-a08-software-integrity-failures)
10. [A09: Logging Failures](#10-a09-logging-failures)
11. [A10: Server-Side Request Forgery](#11-a10-server-side-request-forgery)
12. [Từ điển Keywords](#12-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 OWASP Top 10 là gì?

```
OWASP TOP 10:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "A standard awareness document for developers     │
│   and web application security"                    │
│                                                     │
│  "Globally recognized by developers as the         │
│   FIRST STEP towards more secure coding"           │
│                                                     │
│  CURRENT VERSION: 2021                             │
│  IN DEVELOPMENT: 2025                              │
│                                                     │
│  PURPOSE:                                          │
│  • Awareness về critical security risks            │
│  • Consensus từ security community                 │
│  • Foundation cho secure development               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 2021 Rankings Overview

```
OWASP TOP 10 (2021):

┌─────────────────────────────────────────────────────┐
│                                                     │
│  #1  A01 - Broken Access Control        ████████   │
│  #2  A02 - Cryptographic Failures       ███████    │
│  #3  A03 - Injection                    ██████     │
│  #4  A04 - Insecure Design (NEW)        █████      │
│  #5  A05 - Security Misconfiguration    ████       │
│  #6  A06 - Vulnerable Components        ████       │
│  #7  A07 - Auth Failures                ███        │
│  #8  A08 - Integrity Failures (NEW)     ███        │
│  #9  A09 - Logging Failures             ██         │
│  #10 A10 - SSRF (NEW)                   ██         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. A01: BROKEN ACCESS CONTROL

## 📌 #1 - Most Critical Risk

```
A01:2021 - BROKEN ACCESS CONTROL

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #1 (moved up from #5 in 2017)              │
│  STATS: 3.81% of apps tested, 318k+ occurrences   │
│                                                     │
│  DESCRIPTION:                                      │
│  "Users can act OUTSIDE their intended permissions"│
│                                                     │
│  FAILURES LEAD TO:                                 │
│  • Unauthorized information disclosure             │
│  • Modification of data                            │
│  • Destruction of data                             │
│  • Business function abuse                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Common Vulnerabilities

```
ACCESS CONTROL FAILURES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Bypassing access checks by modifying URL        │
│    /admin/users → Accessible without auth          │
│                                                     │
│  • IDOR - Insecure Direct Object References        │
│    /api/users/123 → Change to /api/users/456       │
│                                                     │
│  • Missing function level access control           │
│    Admin APIs accessible to normal users           │
│                                                     │
│  • Metadata manipulation                           │
│    Tampering with JWT, cookies, hidden fields      │
│                                                     │
│  • CORS misconfiguration                           │
│    Allows unauthorized API access                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. A02: CRYPTOGRAPHIC FAILURES

## 📌 #2 - Previously "Sensitive Data Exposure"

```
A02:2021 - CRYPTOGRAPHIC FAILURES

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #2 (shifted up from #3)                    │
│                                                     │
│  NAME CHANGE:                                      │
│  "Sensitive Data Exposure" → "Cryptographic Failures"│
│  Focuses on ROOT CAUSE rather than symptom         │
│                                                     │
│  LEADS TO:                                         │
│  • Sensitive data exposure                         │
│  • System compromise                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Common Issues

```
CRYPTO FAILURES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Data transmitted in clear text                  │
│    HTTP instead of HTTPS                           │
│                                                     │
│  • Weak cryptographic algorithms                   │
│    MD5, SHA1, DES                                  │
│                                                     │
│  • Default or weak keys                            │
│    Hardcoded secrets                               │
│                                                     │
│  • Improper certificate validation                 │
│    Self-signed certs accepted                      │
│                                                     │
│  • Deprecated hash functions for passwords         │
│    Not using bcrypt, Argon2                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. A03: INJECTION

## 📌 #3 - Classic Vulnerability

```
A03:2021 - INJECTION

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #3 (down from #1 in 2017)                  │
│  STATS: 94% apps tested, 19% max incidence        │
│                                                     │
│  DESCRIPTION:                                      │
│  "Interpreter executes untrusted data as code"     │
│                                                     │
│  TYPES:                                            │
│  • SQL Injection                                   │
│  • OS Command Injection                            │
│  • LDAP Injection                                  │
│  • XSS (Cross-Site Scripting)                      │
│  • Expression Language Injection                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 SQL Injection Example

```
SQL INJECTION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  VULNERABLE CODE:                                  │
│  ────────────────                                  │
│  query = "SELECT * FROM users WHERE               │
│           id = '" + userInput + "'"               │
│                                                     │
│  ATTACK INPUT:                                     │
│  ─────────────                                     │
│  ' OR '1'='1                                       │
│                                                     │
│  RESULTING QUERY:                                  │
│  ────────────────                                  │
│  SELECT * FROM users WHERE id = '' OR '1'='1'     │
│  → Returns ALL users!                              │
│                                                     │
│  PREVENTION:                                       │
│  ───────────                                       │
│  • Parameterized queries                           │
│  • ORM frameworks                                  │
│  • Input validation                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. A04: INSECURE DESIGN

## 📌 #4 - NEW Category

```
A04:2021 - INSECURE DESIGN

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #4 (NEW in 2021)                           │
│  CWEs: 40 (most in any category)                  │
│                                                     │
│  DESCRIPTION:                                      │
│  "Risks related to DESIGN FLAWS"                  │
│                                                     │
│  DIFFERENT FROM IMPLEMENTATION:                    │
│  • Insecure design → Wrong architecture           │
│  • Insecure implementation → Wrong code           │
│                                                     │
│  "Perfect implementation cannot fix               │
│   insecure design"                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Prevention

```
SECURE DESIGN PRINCIPLES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Threat modeling during design phase             │
│  • Secure design patterns                          │
│  • Reference architectures                         │
│  • Security requirements in user stories           │
│  • Paved road methodology                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. A05: SECURITY MISCONFIGURATION

## 📌 #5 - Configuration Issues

```
A05:2021 - SECURITY MISCONFIGURATION

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #5 (moved up from #6)                      │
│                                                     │
│  COMMON ISSUES:                                    │
│  • Missing security hardening                      │
│  • Default configurations unchanged                │
│  • Unnecessary features enabled                    │
│  • Error messages expose sensitive info            │
│  • Missing security headers                        │
│  • Outdated software settings                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Examples

```
MISCONFIGURATION EXAMPLES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ❌ Default admin credentials                      │
│     admin/admin, root/password                     │
│                                                     │
│  ❌ Directory listing enabled                      │
│     Exposes file structure                         │
│                                                     │
│  ❌ Detailed error messages                        │
│     Stack traces shown to users                    │
│                                                     │
│  ❌ Cloud storage public access                    │
│     S3 buckets with public read                    │
│                                                     │
│  ❌ Unnecessary services running                   │
│     Debug endpoints in production                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. A06: VULNERABLE COMPONENTS

## 📌 #6 - Dependency Risks

```
A06:2021 - VULNERABLE AND OUTDATED COMPONENTS

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #6 (moved up from #9 in 2017)              │
│  Previously: "Using Components with Known          │
│              Vulnerabilities"                      │
│                                                     │
│  PROBLEMS:                                         │
│  • Unknown versions of dependencies                │
│  • Vulnerable, outdated, or unsupported software   │
│  • No regular scanning for vulnerabilities         │
│  • No timely patching process                      │
│  • Incompatible/untested updated libraries         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Prevention

```
COMPONENT SECURITY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ Inventory all components and versions          │
│  ✅ Monitor for vulnerabilities (CVEs)             │
│  ✅ Regular dependency updates                     │
│  ✅ Use SCA tools (Software Composition Analysis)  │
│  ✅ Remove unused dependencies                     │
│  ✅ Obtain from trusted sources only               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 8. A07: AUTHENTICATION FAILURES

## 📌 #7 - Identity Issues

```
A07:2021 - IDENTIFICATION AND AUTH FAILURES

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #7 (down from #2 in 2017)                  │
│  Previously: "Broken Authentication"               │
│                                                     │
│  IMPROVEMENTS DUE TO:                              │
│  "Increased availability of standardized           │
│   authentication frameworks"                       │
│                                                     │
│  STILL CRITICAL:                                   │
│  • Credential stuffing                             │
│  • Brute force attacks                             │
│  • Weak password policies                          │
│  • Missing MFA                                     │
│  • Session fixation                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 9. A08: SOFTWARE INTEGRITY FAILURES

## 📌 #8 - NEW Category

```
A08:2021 - SOFTWARE AND DATA INTEGRITY FAILURES

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #8 (NEW in 2021)                           │
│  Includes: A8:2017 Insecure Deserialization       │
│                                                     │
│  DESCRIPTION:                                      │
│  "Assumptions about software updates and           │
│   critical data without integrity verification"    │
│                                                     │
│  ISSUES:                                           │
│  • Unsigned updates                                │
│  • Insecure CI/CD pipelines                        │
│  • Auto-update without verification                │
│  • Insecure deserialization                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 10. A09: LOGGING FAILURES

## 📌 #9 - Visibility Issues

```
A09:2021 - SECURITY LOGGING AND MONITORING FAILURES

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #9 (up from #10)                           │
│  Previously: "Insufficient Logging & Monitoring"   │
│                                                     │
│  IMPACT:                                           │
│  • No visibility into attacks                      │
│  • Delayed incident detection                      │
│  • Impaired forensics                              │
│  • Breaches go unnoticed for months                │
│                                                     │
│  REQUIREMENTS:                                     │
│  • Log all authentication events                   │
│  • Log access control failures                     │
│  • Ensure logs are tamper-proof                    │
│  • Alerting for suspicious activities              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 11. A10: SERVER-SIDE REQUEST FORGERY

## 📌 #10 - NEW Category

```
A10:2021 - SERVER-SIDE REQUEST FORGERY (SSRF)

┌─────────────────────────────────────────────────────┐
│                                                     │
│  RANK: #10 (NEW in 2021, #1 in community survey)  │
│  STATS: Low incidence, but HIGH impact potential   │
│                                                     │
│  DESCRIPTION:                                      │
│  "Application fetches remote resources without     │
│   validating user-supplied URLs"                   │
│                                                     │
│  ATTACK:                                           │
│  ┌───────────────────────────────────────┐         │
│  │ User submits: http://internal-api/    │         │
│  │ Server fetches: internal resource     │         │
│  │ Returns: sensitive internal data      │         │
│  └───────────────────────────────────────┘         │
│                                                     │
│  → Leads to internal system access                 │
│  → Cloud metadata exposure (169.254.169.254)       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 12. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **OWASP** | Open Web Application Security Project | Tổ chức bảo mật phi lợi nhuận |
| **Access Control** | Kiểm soát truy cập | Quy định ai được làm gì |
| **IDOR** | Insecure Direct Object Reference | Truy cập object không an toàn |
| **Injection** | Tiêm | Chèn code độc hại |
| **XSS** | Cross-Site Scripting | Chèn script vào web |
| **SSRF** | Server-Side Request Forgery | Giả mạo request từ server |
| **CWE** | Common Weakness Enumeration | Danh mục điểm yếu phổ biến |
| **Cryptographic Failures** | Lỗi mã hóa | Sử dụng crypto không đúng |
| **Deserialization** | Giải tuần tự hóa | Chuyển bytes thành object |
| **MFA** | Multi-Factor Authentication | Xác thực đa yếu tố |

---

# 📚 TÀI NGUYÊN

## Links
- [OWASP Top 10 Official](https://owasp.org/www-project-top-ten/) - Nguồn gốc
- [OWASP Top 10 2021](https://owasp.org/Top10/2021/) - Current version
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/) - Prevention guides

---

*Tài liệu tổng hợp OWASP Top 10 - 10 rủi ro bảo mật ứng dụng web hàng đầu (2021).*
