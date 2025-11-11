"""
Reviews API Routes
Trucker-only rating system - Truckers rate brokers/shippers
"""

from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import date, datetime
from uuid import UUID

router = APIRouter()

# ============================================
# REQUEST/RESPONSE MODELS
# ============================================

class ReviewCreate(BaseModel):
    company_id: str
    overall_rating: int = Field(ge=1, le=5)
    title: str = Field(max_length=255)
    content: str
    
    # Detailed ratings
    payment_rating: Optional[int] = Field(None, ge=1, le=5)
    payment_speed: Optional[str] = None  # 'on_time', 'late', 'never_paid'
    days_to_payment: Optional[int] = None
    
    communication_rating: Optional[int] = Field(None, ge=1, le=5)
    professionalism_rating: Optional[int] = Field(None, ge=1, le=5)
    honesty_rating: Optional[int] = Field(None, ge=1, le=5)
    
    # Load details
    load_date: Optional[date] = None
    origin_city: Optional[str] = None
    origin_state: Optional[str] = None
    destination_city: Optional[str] = None
    destination_state: Optional[str] = None
    freight_type: Optional[str] = None
    
    # Issues
    issues_reported: Optional[List[str]] = []
    would_work_again: Optional[bool] = None


class CompanyResponseCreate(BaseModel):
    content: str = Field(min_length=10, max_length=2000)
    responder_name: str
    responder_title: Optional[str] = None
    responder_email: Optional[str] = None


class ReviewResponse(BaseModel):
    id: str
    trucker_id: str
    trucker_name: str
    company_id: str
    overall_rating: int
    title: str
    content: str
    payment_rating: Optional[int]
    communication_rating: Optional[int]
    professionalism_rating: Optional[int]
    honesty_rating: Optional[int]
    status: str
    helpful_count: int
    created_at: datetime
    company_response: Optional[dict] = None


# ============================================
# MOCK DATABASE (Replace with real DB later)
# ============================================

# Mock data storage
mock_reviews = [
    {
        "id": "review-1",
        "trucker_id": "trucker-1",
        "trucker_name": "John Trucker",
        "company_id": "company-1",
        "overall_rating": 4,
        "title": "Good broker, slow payment",
        "content": "Overall positive experience. Payment took 45 days but they were communicative. Would work with again.",
        "payment_rating": 3,
        "communication_rating": 5,
        "professionalism_rating": 4,
        "honesty_rating": 4,
        "payment_speed": "late",
        "days_to_payment": 45,
        "load_date": "2024-01-15",
        "would_work_again": True,
        "status": "published",
        "helpful_count": 5,
        "created_at": datetime.now().isoformat(),
        "company_response": None
    },
    {
        "id": "review-2",
        "trucker_id": "trucker-2",
        "trucker_name": "Mike Driver",
        "company_id": "company-1",
        "overall_rating": 2,
        "title": "Rate changed after delivery",
        "content": "Agreed on $2000, they tried to pay $1600. Had to fight for the original rate. Very unprofessional.",
        "payment_rating": 1,
        "communication_rating": 2,
        "professionalism_rating": 1,
        "honesty_rating": 1,
        "payment_speed": "late",
        "days_to_payment": 60,
        "load_date": "2024-02-01",
        "would_work_again": False,
        "issues_reported": ["rate_changed", "late_payment"],
        "status": "published",
        "helpful_count": 12,
        "created_at": datetime.now().isoformat(),
        "company_response": {
            "content": "We apologize for the confusion. There was a miscommunication about detention charges. We have since corrected our process.",
            "responder_name": "Jane Smith",
            "responder_title": "Operations Manager"
        }
    }
]

mock_companies = {
    "company-1": {
        "id": "company-1",
        "legal_name": "Swift Transportation",
        "dba_name": "Swift Freight",
        "entity_type": "BROKER",
        "mc_number": "12345",
        "dot_number": "123456",
        "phone": "(555) 123-4567",
        "physical_city": "Phoenix",
        "physical_state": "AZ",
        "overall_rating": 3.5,
        "review_count": 2,
        "payment_rating": 2.0,
        "communication_rating": 3.5,
        "professionalism_rating": 2.5,
        "honesty_rating": 2.5
    },
    "company-2": {
        "id": "company-2",
        "legal_name": "J.B. Hunt Transport",
        "entity_type": "BROKER",
        "mc_number": "67890",
        "dot_number": "789012",
        "phone": "(555) 987-6543",
        "physical_city": "Lowell",
        "physical_state": "AR",
        "overall_rating": 4.5,
        "review_count": 0
    }
}

# ============================================
# ROUTES
# ============================================

@router.post("/reviews", status_code=201)
async def create_review(review: ReviewCreate):
    """
    Create a review - TRUCKER ONLY
    
    IMPORTANT: In production, this requires authentication.
    For now, anyone can create reviews (for testing).
    """
    
    # Validate company exists
    if review.company_id not in mock_companies:
        raise HTTPException(status_code=404, detail="Company not found")
    
    company = mock_companies[review.company_id]
    
    # CRITICAL: Check if company is a broker/shipper (not carrier)
    if company["entity_type"] not in ["BROKER", "SHIPPER"]:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot review {company['entity_type']}. Only brokers and shippers can be reviewed."
        )
    
    # Create mock review
    new_review = {
        "id": f"review-{len(mock_reviews) + 1}",
        "trucker_id": "current-user-id",  # Would come from auth
        "trucker_name": "Current User",    # Would come from auth
        "company_id": review.company_id,
        "overall_rating": review.overall_rating,
        "title": review.title,
        "content": review.content,
        "payment_rating": review.payment_rating,
        "communication_rating": review.communication_rating,
        "professionalism_rating": review.professionalism_rating,
        "honesty_rating": review.honesty_rating,
        "payment_speed": review.payment_speed,
        "days_to_payment": review.days_to_payment,
        "load_date": review.load_date.isoformat() if review.load_date else None,
        "origin_city": review.origin_city,
        "origin_state": review.origin_state,
        "destination_city": review.destination_city,
        "destination_state": review.destination_state,
        "would_work_again": review.would_work_again,
        "issues_reported": review.issues_reported or [],
        "status": "published",  # Would be 'pending' in production with moderation
        "helpful_count": 0,
        "created_at": datetime.now().isoformat(),
        "company_response": None
    }
    
    mock_reviews.append(new_review)
    
    # Update company ratings (simplified calculation)
    company_reviews = [r for r in mock_reviews if r["company_id"] == review.company_id]
    if company_reviews:
        company["overall_rating"] = sum(r["overall_rating"] for r in company_reviews) / len(company_reviews)
        company["review_count"] = len(company_reviews)
    
    return {
        "success": True,
        "review": new_review,
        "message": "Review published successfully"
    }


@router.get("/reviews")
async def list_reviews(
    company_id: Optional[str] = Query(None, description="Filter by company"),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    List reviews with optional company filter
    """
    
    # Filter reviews
    filtered_reviews = mock_reviews
    if company_id:
        filtered_reviews = [r for r in mock_reviews if r["company_id"] == company_id]
    
    # Sort by date (newest first)
    sorted_reviews = sorted(filtered_reviews, key=lambda x: x["created_at"], reverse=True)
    
    # Paginate
    paginated_reviews = sorted_reviews[offset:offset + limit]
    
    return {
        "reviews": paginated_reviews,
        "total": len(filtered_reviews),
        "limit": limit,
        "offset": offset
    }


@router.get("/reviews/{review_id}")
async def get_review(review_id: str):
    """
    Get a single review by ID
    """
    
    review = next((r for r in mock_reviews if r["id"] == review_id), None)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return review


@router.post("/reviews/{review_id}/respond", status_code=201)
async def respond_to_review(review_id: str, response: CompanyResponseCreate):
    """
    Company responds to a review - NOT A RATING!
    
    CRITICAL: This is text-only response, NO rating allowed.
    In production, requires company authentication.
    """
    
    # Find review
    review = next((r for r in mock_reviews if r["id"] == review_id), None)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    # Check if already has response
    if review.get("company_response"):
        raise HTTPException(
            status_code=409,
            detail="This review already has a company response. Only one response per review."
        )
    
    # Add response (text only, NO rating)
    review["company_response"] = {
        "content": response.content,
        "responder_name": response.responder_name,
        "responder_title": response.responder_title,
        "responder_email": response.responder_email,
        "created_at": datetime.now().isoformat()
    }
    
    return {
        "success": True,
        "response": review["company_response"],
        "message": "Response posted successfully"
    }


@router.post("/reviews/{review_id}/vote")
async def vote_on_review(
    review_id: str,
    vote_type: str = Query(..., regex="^(helpful|not_helpful)$")
):
    """
    Mark review as helpful or not helpful
    """
    
    review = next((r for r in mock_reviews if r["id"] == review_id), None)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if vote_type == "helpful":
        review["helpful_count"] += 1
    
    return {
        "success": True,
        "helpful_count": review["helpful_count"]
    }


# ============================================
# COMPANY ROUTES (For profile pages)
# ============================================

@router.get("/companies/{company_id}")
async def get_company(company_id: str):
    """
    Get company details with ratings
    """
    
    if company_id not in mock_companies:
        raise HTTPException(status_code=404, detail="Company not found")
    
    company = mock_companies[company_id]
    
    # Get company reviews
    company_reviews = [r for r in mock_reviews if r["company_id"] == company_id and r["status"] == "published"]
    
    # Calculate detailed stats
    stats = {
        "total_reviews": len(company_reviews),
        "average_rating": company.get("overall_rating", 0),
        "rating_distribution": {
            "5_star": len([r for r in company_reviews if r["overall_rating"] == 5]),
            "4_star": len([r for r in company_reviews if r["overall_rating"] == 4]),
            "3_star": len([r for r in company_reviews if r["overall_rating"] == 3]),
            "2_star": len([r for r in company_reviews if r["overall_rating"] == 2]),
            "1_star": len([r for r in company_reviews if r["overall_rating"] == 1]),
        },
        "would_work_again_percent": (
            len([r for r in company_reviews if r.get("would_work_again") == True]) / len(company_reviews) * 100
            if company_reviews else 0
        ),
        "common_issues": []
    }
    
    return {
        "company": company,
        "stats": stats
    }


@router.get("/companies")
async def search_companies(
    query: Optional[str] = Query(None, min_length=2),
    entity_type: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=100)
):
    """
    Search companies by name or filters
    """
    
    results = list(mock_companies.values())
    
    # Filter by search query
    if query:
        query_lower = query.lower()
        results = [
            c for c in results
            if query_lower in c["legal_name"].lower() 
            or (c.get("dba_name") and query_lower in c["dba_name"].lower())
            or (c.get("mc_number") and query_lower in c["mc_number"])
        ]
    
    # Filter by entity type
    if entity_type:
        results = [c for c in results if c["entity_type"] == entity_type.upper()]
    
    # Sort by rating
    results = sorted(results, key=lambda x: x.get("overall_rating", 0), reverse=True)
    
    return {
        "companies": results[:limit],
        "total": len(results)
    }

