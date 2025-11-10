# 🌳 Carrier Board - Logic Tree & System Architecture

This document outlines the logical flow, decision trees, and system architecture for the Carrier Board platform.

---

## 📐 Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [User Flow Logic Trees](#user-flow-logic-trees)
3. [Data Flow Architecture](#data-flow-architecture)
4. [Authentication & Authorization Logic](#authentication--authorization-logic)
5. [Review System Logic](#review-system-logic)
6. [Verification Logic (DOT/MC)](#verification-logic-dotmc)
7. [Rating Calculation Algorithm](#rating-calculation-algorithm)
8. [Moderation & Fraud Detection](#moderation--fraud-detection)
9. [Database Schema Logic](#database-schema-logic)
10. [API Request Flow](#api-request-flow)

---

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Web App   │  │  Mobile App │  │  Admin Panel│         │
│  │  (Next.js)  │  │   (Future)  │  │   (Future)  │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼─────────────────┼─────────────────┼───────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API Gateway   │
                    │  (Rate Limit)   │
                    └───────┬────────┘
                            │
          ┌─────────────────┴─────────────────┐
          │                                    │
    ┌─────▼─────┐                      ┌─────▼─────┐
    │  Backend   │                      │   Cache   │
    │   API      │◄────────────────────►│  (Redis)  │
    │ (FastAPI)  │                      │ (Optional) │
    └─────┬─────┘                      └───────────┘
          │
          ├──────────┬──────────┬──────────┬──────────┐
          │          │          │          │          │
    ┌─────▼─────┐ ┌─▼──────┐ ┌─▼──────┐ ┌─▼──────┐ ┌─▼──────┐
    │ Database  │ │ FMCSA  │ │ Email  │ │Storage │ │ Queue  │
    │(PostgreSQL│ │   API  │ │Service │ │  (S3)  │ │(Future)│
    └───────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

---

## 👤 User Flow Logic Trees

### 1. User Registration Flow

```
START: User visits landing page
    │
    ├─► Click "Sign Up"
    │
    ├─► Select User Type
    │   ├─► Carrier
    │   ├─► Broker
    │   └─► Shipper
    │
    ├─► Enter Personal Info
    │   ├─► Name
    │   ├─► Email
    │   ├─► Password
    │   └─► Company Name (optional)
    │
    ├─► Enter Company Verification
    │   ├─► DOT Number
    │   └─► MC Number
    │
    ├─► System Validates
    │   ├─► Email format valid? ──No──► Show error
    │   ├─► Password strong? ──No──► Show requirements
    │   ├─► DOT/MC exists? ──No──► Manual review flag
    │   └─► All valid? ──Yes──┐
    │                          │
    │◄─────────────────────────┘
    │
    ├─► Create Account
    │   ├─► Hash password
    │   ├─► Generate JWT token
    │   ├─► Send verification email
    │   └─► Store in database
    │
    ├─► User Status
    │   ├─► Email verified? ──No──► Redirect to verify email
    │   ├─► DOT/MC verified? ──No──► Pending verification
    │   └─► All verified? ──Yes──► Full access granted
    │
    └─► END: Redirect to dashboard
```

### 2. Review Submission Flow

```
START: User wants to leave review
    │
    ├─► Check Authentication
    │   └─── Not logged in? ──► Redirect to login
    │
    ├─► Check Eligibility
    │   ├─► Account verified?
    │   ├─► Not reviewing own company?
    │   ├─► Not duplicate review (same company, 30 days)?
    │   └─── Failed check? ──► Show error & exit
    │
    ├─► Search for Company
    │   ├─► Enter company name or MC number
    │   ├─► Display search results
    │   └─► Select company
    │
    ├─► Check Previous Interaction
    │   ├─► Has worked with company? ──Optional verification
    │   └─► First-time review? ──► Flag for closer moderation
    │
    ├─► Submit Review Form
    │   ├─► Star rating (1-5)
    │   ├─► Written review (50-2000 chars)
    │   ├─► Category ratings
    │   │   ├─► Payment promptness
    │   │   ├─► Communication
    │   │   ├─► Professionalism
    │   │   └─► Reliability
    │   └─► Optional: Add proof (documents)
    │
    ├─► Content Validation
    │   ├─► Check for profanity ──Yes──► Flag for moderation
    │   ├─► Check for personal info (phone, email) ──Yes──► Remove
    │   ├─► Check for spam patterns ──Yes──► Flag
    │   └─► AI sentiment analysis ──Suspicious──► Queue review
    │
    ├─► Save Review
    │   ├─► Store in database
    │   ├─► Update company rating
    │   ├─► Send notification to company
    │   └─► Status: Published or Pending
    │
    └─► END: Show confirmation
```

### 3. Company Search & Discovery Flow

```
START: User lands on search page
    │
    ├─► Enter Search Query
    │   ├─► Company name
    │   ├─► MC number
    │   ├─► DOT number
    │   └─► Location
    │
    ├─► Apply Filters (Optional)
    │   ├─► User type (Carrier/Broker)
    │   ├─► Rating range (1-5 stars)
    │   ├─► Verification status
    │   ├─► Location/State
    │   └─► Review count (minimum)
    │
    ├─► Sort Results
    │   ├─► Relevance (default)
    │   ├─► Highest rated
    │   ├─► Most reviewed
    │   └─► Recently reviewed
    │
    ├─► Display Results
    │   ├─► Company card with:
    │   │   ├─► Company name
    │   │   ├─► Overall rating
    │   │   ├─► Review count
    │   │   ├─► Verification badge
    │   │   └─► Location
    │   └─► Pagination (20 per page)
    │
    ├─► User Selects Company
    │
    ├─► View Company Profile
    │   ├─► Company details
    │   ├─► Ratings breakdown
    │   ├─► Review list
    │   └─► Action buttons
    │       ├─► Write Review
    │       └─► Report/Flag
    │
    └─► END: User action
```

---

## 📊 Data Flow Architecture

### Request → Response Flow

```
Client (Browser)
    │
    │ 1. HTTP Request (JWT in header)
    ▼
API Gateway / Load Balancer
    │
    │ 2. Rate limiting check
    ▼
Middleware Layer
    │
    ├─► Authentication Middleware
    │   ├─► Verify JWT token
    │   ├─── Invalid? ──► Return 401
    │   └─── Valid? ──► Extract user info
    │
    ├─► Authorization Middleware
    │   ├─► Check user role
    │   ├─► Check permissions
    │   └─── Unauthorized? ──► Return 403
    │
    └─► Validation Middleware
        ├─► Validate request body
        ├─► Sanitize inputs
        └─── Invalid? ──► Return 400
    │
    ▼
Controller Layer
    │
    ├─► Business Logic
    │   ├─► Process request
    │   ├─► Call service functions
    │   └─► Handle errors
    │
    ▼
Service Layer
    │
    ├─► Database Operations (ORM)
    │   ├─► Query data
    │   ├─► Update records
    │   └─► Transactions
    │
    ├─► External APIs (if needed)
    │   ├─► FMCSA verification
    │   └─► Email service
    │
    └─► Cache Operations
        ├─► Check cache
        ├─── Found? ──► Return cached
        └─── Not found? ──► Query DB → Cache result
    │
    ▼
Response Formation
    │
    ├─► Format data (JSON)
    ├─► Add metadata
    └─► Set status code
    │
    ▼
Client (Browser)
```

---

## 🔐 Authentication & Authorization Logic

### Authentication Decision Tree

```
User attempts to access protected resource
    │
    ├─► JWT Token Present?
    │   │
    │   NO──► Return 401 Unauthorized
    │   │
    │   YES
    │   │
    ├─► Token Valid?
    │   ├─► Signature valid?
    │   ├─► Not expired?
    │   └─► Token not blacklisted?
    │   │
    │   NO──► Return 401 (Invalid token)
    │   │
    │   YES
    │   │
    ├─► Extract User Info
    │   ├─► User ID
    │   ├─► Role
    │   └─► Permissions
    │
    ├─► User Account Active?
    │   │
    │   NO──► Return 403 (Account suspended)
    │   │
    │   YES
    │   │
    ├─► Email Verified?
    │   │
    │   NO──► Return 403 (Verify email required)
    │   │
    │   YES
    │   │
    ├─► Check Authorization
    │   ├─► Required role present?
    │   └─► Required permission present?
    │   │
    │   NO──► Return 403 Forbidden
    │   │
    │   YES
    │   │
    └─► GRANT ACCESS
```

### Role-Based Access Control (RBAC)

```
┌───────────────────────────────────────────────────┐
│                    Roles                          │
├───────────────────────────────────────────────────┤
│                                                   │
│  Admin                                            │
│  ├─► Full system access                          │
│  ├─► Moderate all content                        │
│  ├─► Manage users                                │
│  ├─► View analytics                              │
│  └─► System configuration                        │
│                                                   │
│  Verified Carrier                                 │
│  ├─► Write reviews (for brokers)                 │
│  ├─► View own profile                            │
│  ├─► Edit own info                               │
│  └─► Search companies                            │
│                                                   │
│  Verified Broker                                  │
│  ├─► Write reviews (for carriers)                │
│  ├─► View own profile                            │
│  ├─► Edit own info                               │
│  ├─► Respond to reviews                          │
│  └─► Search companies                            │
│                                                   │
│  Unverified User                                  │
│  ├─► View public profiles (read-only)            │
│  ├─► Search companies (limited)                  │
│  └─► Cannot write reviews                        │
│                                                   │
│  Guest (Not logged in)                            │
│  ├─► View landing page                           │
│  ├─► View featured companies (limited)           │
│  └─► Sign up / Log in                            │
│                                                   │
└───────────────────────────────────────────────────┘
```

---

## ⭐ Review System Logic

### Review Lifecycle

```
Review Created
    │
    ├─► Initial Status: PENDING
    │
    ├─► Auto-Moderation Checks
    │   ├─► Profanity filter
    │   ├─► Spam detection
    │   ├─► Personal info detection
    │   └─► Sentiment analysis
    │
    ├─► Risk Score Calculation
    │   ├─► First-time reviewer? (+risk)
    │   ├─► New account? (+risk)
    │   ├─► Extreme rating (1 or 5)? (+risk)
    │   ├─► Short review text? (+risk)
    │   ├─► Verified user? (-risk)
    │   └─── High risk (>70%)? ──► Queue for manual review
    │
    ├─── Low risk? ──► Auto-approve
    │   │
    │   └─► Status: PUBLISHED
    │       ├─► Update company rating
    │       ├─► Send notification to company
    │       └─► Visible to public
    │
    ├─── High risk? ──► Manual review
    │   │
    │   ├─► Moderator Reviews
    │   │   ├─► Approve ──► Status: PUBLISHED
    │   │   ├─► Reject ──► Status: REJECTED
    │   │   └─► Request edit ──► Status: PENDING_EDIT
    │   │
    │   └─► After Decision
    │       ├─► Notify reviewer
    │       └─► Update records
    │
    ├─► Company Response (Optional)
    │   ├─► Company can respond
    │   ├─► Response visible below review
    │   └─► Timestamped
    │
    ├─► User Actions
    │   ├─► Upvote (helpful)
    │   ├─► Downvote (not helpful)
    │   └─► Report/Flag
    │
    └─► Review Can Be
        ├─► Edited (by author, within 24h)
        ├─► Deleted (by author or admin)
        └─► Hidden (by admin)
```

---

## ✅ Verification Logic (DOT/MC)

### Company Verification Flow

```
User submits DOT/MC number
    │
    ├─► Format Validation
    │   ├─► DOT: 7-8 digits
    │   └─── MC: 6-7 digits
    │   │
    │   └─── Invalid format? ──► Reject
    │
    ├─► Check Database Cache
    │   ├─── Already verified? ──► Use cached data
    │   └─── Not in cache? ──► Continue
    │
    ├─► Call FMCSA API
    │   │
    │   ├─► API Request
    │   │   ├─► Endpoint: /carriers/{mc_number}
    │   │   └─► Timeout: 10 seconds
    │   │
    │   ├─── API Success?
    │   │   │
    │   │   YES──► Parse Response
    │   │   │     ├─► Company name
    │   │   │     ├─► Physical address
    │   │   │     ├─► Mailing address
    │   │   │     ├─► Operating status
    │   │   │     ├─► Safety rating
    │   │   │     └─► Insurance info
    │   │   │
    │   │   NO──► Handle Error
    │   │         ├─► API down? ──► Queue for retry
    │   │         ├─► Not found? ──► Mark invalid
    │   │         └─► Rate limit? ──► Delay retry
    │   │
    │   └─► Validate Response
    │       ├─── Operating status = Active?
    │       │    │
    │       │    YES──► Continue
    │       │    NO──► Mark inactive
    │       │
    │       └─── Insurance valid?
    │            │
    │            YES──► Mark verified
    │            NO──► Warning flag
    │
    ├─► Store Verification Result
    │   ├─► Cache in database
    │   ├─► Set expiry (90 days)
    │   └─► Update company profile
    │
    ├─► Verification Status
    │   ├─► VERIFIED ──► Green badge
    │   ├─► PENDING ──► Yellow badge
    │   ├─► FAILED ──► Red badge
    │   └─► EXPIRED ──► Re-verify needed
    │
    └─► END: Return result to user
```

### Re-verification Logic

```
Scheduled Job (Daily)
    │
    ├─► Query all verified companies
    │
    ├─► Filter companies
    │   └─► Verification older than 90 days
    │
    ├─► For each company:
    │   ├─► Call FMCSA API
    │   ├─► Compare data
    │   │   ├─── Changed? ──► Update profile
    │   │   └─── Inactive? ──► Flag account
    │   └─► Update verification timestamp
    │
    └─► Send notifications if issues found
```

---

## 🧮 Rating Calculation Algorithm

### Overall Rating Formula

```python
# Weighted average rating calculation

def calculate_overall_rating(reviews):
    """
    Calculate weighted overall rating for a company
    """
    if not reviews:
        return None
    
    # Step 1: Calculate base average
    total_stars = sum(review.rating for review in reviews)
    base_average = total_stars / len(reviews)
    
    # Step 2: Apply time decay (recent reviews weighted more)
    weighted_sum = 0
    weight_sum = 0
    
    for review in reviews:
        days_old = (today - review.created_at).days
        
        # Time decay weight (exponential)
        # Recent reviews (0-30 days) = 1.0 weight
        # 31-90 days = 0.8 weight
        # 91-180 days = 0.6 weight
        # 181+ days = 0.4 weight
        
        if days_old <= 30:
            weight = 1.0
        elif days_old <= 90:
            weight = 0.8
        elif days_old <= 180:
            weight = 0.6
        else:
            weight = 0.4
        
        # Apply helpfulness modifier
        helpfulness = review.upvotes - review.downvotes
        if helpfulness > 10:
            weight *= 1.1  # Boost highly helpful reviews
        elif helpfulness < -5:
            weight *= 0.9  # Reduce unhelpful reviews
        
        weighted_sum += review.rating * weight
        weight_sum += weight
    
    # Step 3: Calculate weighted average
    weighted_average = weighted_sum / weight_sum
    
    # Step 4: Apply confidence interval
    # Fewer reviews = pull toward neutral (3.0)
    confidence = min(len(reviews) / 10, 1.0)  # Max at 10 reviews
    final_rating = (weighted_average * confidence) + (3.0 * (1 - confidence))
    
    # Round to 1 decimal place
    return round(final_rating, 1)
```

### Category Ratings

```
Each review includes sub-ratings:
├─► Payment Promptness (1-5 stars)
├─► Communication (1-5 stars)
├─► Professionalism (1-5 stars)
└─► Reliability (1-5 stars)

Company Profile shows:
├─► Overall Rating (weighted average of all reviews)
├─► Category Breakdowns (average per category)
└─► Distribution chart (how many 1★, 2★, 3★, 4★, 5★)
```

---

## 🚨 Moderation & Fraud Detection

### Fraud Detection Signals

```
Review Submitted
    │
    ├─► Pattern Analysis
    │   ├─► Multiple reviews from same IP? (+suspicion)
    │   ├─► Multiple accounts, same device? (+suspicion)
    │   ├─► Burst of reviews in short time? (+suspicion)
    │   └─► Similar text patterns? (+suspicion)
    │
    ├─► User Analysis
    │   ├─► Brand new account? (+risk)
    │   ├─► No other activity? (+risk)
    │   ├─► Only extreme ratings (all 1★ or 5★)? (+risk)
    │   └─── Verified user with history? (-risk)
    │
    ├─► Content Analysis (AI)
    │   ├─► Generic/template text? (+suspicion)
    │   ├─► Excessive keywords? (+suspicion)
    │   ├─► Emotional manipulation? (+suspicion)
    │   └─► Specific, detailed experience? (-suspicion)
    │
    ├─► Calculate Fraud Score (0-100)
    │   │
    │   ├─── Score < 30 ──► Auto-approve
    │   ├─── Score 30-70 ──► Flag for review
    │   └─── Score > 70 ──► Hold for manual approval
    │
    └─► Action Based on Score
```

### Moderation Queue Priority

```
High Priority (Review within 1 hour)
├─► Fraud score > 70
├─► Multiple reports/flags
└─► Legal concerns flagged

Medium Priority (Review within 24 hours)
├─► Fraud score 30-70
├─► First-time reviewer
└─► Extreme ratings (1★ or 5★)

Low Priority (Review within 1 week)
├─► Random audit sample (5% of all reviews)
└─► Automated flag for minor issues
```

---

## 🗄️ Database Schema Logic

### Core Tables & Relationships

```
┌─────────────┐
│    users    │
├─────────────┤
│ id (PK)     │
│ email       │
│ password    │◄─────────┐
│ role        │          │
│ verified    │          │
│ created_at  │          │
└─────────────┘          │
       │                 │
       │ 1:1             │
       ▼                 │
┌─────────────┐          │
│ user_profile│          │
├─────────────┤          │
│ id (PK)     │          │
│ user_id (FK)│          │
│ full_name   │          │
│ phone       │          │
│ avatar_url  │          │
└─────────────┘          │
       │                 │
       │ 1:N             │
       ▼                 │
┌─────────────┐          │
│  companies  │          │
├─────────────┤          │
│ id (PK)     │          │
│ owner_id(FK)│──────────┘
│ name        │
│ dot_number  │
│ mc_number   │
│ verified    │
│ rating      │
│ review_count│
└─────────────┘
       │
       │ 1:N
       ▼
┌─────────────┐          ┌─────────────┐
│   reviews   │          │review_votes │
├─────────────┤          ├─────────────┤
│ id (PK)     │◄─────────┤ review_id   │
│ company_id  │      1:N │ user_id     │
│ reviewer_id │          │ vote_type   │
│ rating      │          └─────────────┘
│ content     │
│ status      │
│ created_at  │
└─────────────┘
       │
       │ 1:1 (optional)
       ▼
┌─────────────┐
│   responses │
├─────────────┤
│ id (PK)     │
│ review_id   │
│ company_id  │
│ content     │
│ created_at  │
└─────────────┘
```

---

## 🔄 API Request Flow

### Example: POST /api/reviews

```
1. Client Request
   POST /api/reviews
   Headers: {
     Authorization: Bearer <JWT_TOKEN>
     Content-Type: application/json
   }
   Body: {
     company_id: 123,
     rating: 4,
     content: "Great experience...",
     category_ratings: {...}
   }

2. API Gateway
   ├─► Check rate limit (60 req/min per user)
   └─► Forward to backend

3. Authentication Middleware
   ├─► Verify JWT token
   ├─► Extract user_id from token
   └─► Attach user to request context

4. Authorization Middleware
   ├─► Check user.verified === true
   ├─► Check user.role in ['carrier', 'broker']
   └─── Fail? ──► Return 403

5. Validation Middleware
   ├─► Validate company_id exists
   ├─► Validate rating (1-5)
   ├─► Validate content (50-2000 chars)
   └─── Fail? ──► Return 400

6. Controller (ReviewController.create)
   ├─► Check business rules:
   │   ├─► Not reviewing own company
   │   ├─► No duplicate review (30 days)
   │   └─► Company is active
   │
   ├─► Call ReviewService.createReview()

7. Service Layer (ReviewService)
   ├─► Run fraud detection
   ├─► Run content moderation
   ├─► Calculate fraud score
   ├─► Determine status (PENDING or PUBLISHED)
   ├─► Save to database
   ├─► Update company rating (if published)
   ├─► Queue notifications
   └─► Return review object

8. Response Formation
   {
     "success": true,
     "data": {
       "id": 456,
       "status": "published",
       "rating": 4,
       "created_at": "2025-11-10T12:00:00Z"
     },
     "message": "Review submitted successfully"
   }
   Status: 201 Created

9. Client Receives Response
   └─► Display success message
   └─► Redirect to company page
```

---

## 🔍 Search & Filter Logic

### Search Algorithm

```
User enters search query: "ABC Trucking"
    │
    ├─► Parse Query
    │   ├─► Extract keywords
    │   ├─► Detect if MC/DOT number
    │   └─► Normalize text (lowercase, trim)
    │
    ├─► Database Query Strategy
    │   │
    │   ├─► Exact MC/DOT match?
    │   │   └─── Yes ──► Return immediately (highest priority)
    │   │
    │   ├─► Full-text search on company name
    │   │   ├─► Use PostgreSQL full-text search
    │   │   └─► Rank by relevance
    │   │
    │   └─► Fuzzy match (typo tolerance)
    │       └─► Use Levenshtein distance
    │
    ├─► Apply Filters
    │   ├─► User type (carrier/broker)
    │   ├─► Rating threshold
    │   ├─► Location
    │   ├─► Verification status
    │   └─► Review count minimum
    │
    ├─► Sort Results
    │   ├─► Relevance score (default)
    │   ├─► Rating (high to low)
    │   ├─► Review count (high to low)
    │   └─► Recent activity
    │
    ├─► Pagination
    │   ├─► 20 results per page
    │   ├─► Cursor-based for performance
    │   └─► Include total count
    │
    └─► Return Results
```

---

## 📈 Analytics & Reporting Logic

### Company Dashboard Metrics

```
Company Profile View
    │
    ├─► Key Metrics Calculated
    │   │
    │   ├─► Overall Rating
    │   │   └─► Weighted average (see algorithm above)
    │   │
    │   ├─► Total Reviews
    │   │   └─► Count of published reviews
    │   │
    │   ├─► Rating Distribution
    │   │   ├─► 5 stars: X%
    │   │   ├─► 4 stars: X%
    │   │   ├─► 3 stars: X%
    │   │   ├─► 2 stars: X%
    │   │   └─► 1 star:  X%
    │   │
    │   ├─► Category Averages
    │   │   ├─► Payment: X.X/5
    │   │   ├─► Communication: X.X/5
    │   │   ├─► Professionalism: X.X/5
    │   │   └─► Reliability: X.X/5
    │   │
    │   ├─► Trend Analysis (Past 6 months)
    │   │   └─► Rating over time chart
    │   │
    │   └─► Response Rate
    │       └─► % of reviews company responded to
    │
    └─► Display on dashboard
```

---

## 🔒 Security Logic

### Input Sanitization Flow

```
User Input Received
    │
    ├─► XSS Prevention
    │   ├─► Strip HTML tags
    │   ├─► Encode special characters
    │   └─► Whitelist allowed characters
    │
    ├─► SQL Injection Prevention
    │   ├─► Use parameterized queries (ORM)
    │   ├─► Validate data types
    │   └─► Escape special SQL characters
    │
    ├─► Personal Info Detection
    │   ├─► Regex for email patterns
    │   ├─► Regex for phone numbers
    │   ├─► Regex for SSN/sensitive IDs
    │   └─── Found? ──► Remove or mask
    │
    └─► Rate Limiting
        ├─► Track requests per IP
        ├─► Track requests per user
        └─── Exceeded? ──► Return 429 (Too Many Requests)
```

---

## 🎯 Conclusion

This logic tree provides a comprehensive view of how Carrier Board processes data, makes decisions, and flows information through the system. Each component is designed with scalability, security, and user experience in mind.

### Key Principles
✅ **Validation at every layer**  
✅ **Security by default**  
✅ **Fraud prevention built-in**  
✅ **Clear error handling**  
✅ **Audit trails for accountability**  
✅ **Performance through caching**  
✅ **Scalability through queues**  

---

*For implementation details, see:*
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Security Guidelines](./docs/SECURITY.md)

