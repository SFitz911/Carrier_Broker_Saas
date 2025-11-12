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
    "company-1": {"id": "company-1", "legal_name": "Swift Transportation", "dba_name": "Swift Freight", "entity_type": "BROKER", "mc_number": "12345", "dot_number": "123456", "phone": "(555) 123-4567", "physical_city": "Phoenix", "physical_state": "AZ", "overall_rating": 3.5, "review_count": 2, "payment_rating": 2.0, "communication_rating": 3.5, "professionalism_rating": 2.5, "honesty_rating": 2.5},
    "company-2": {"id": "company-2", "legal_name": "J.B. Hunt Transport", "entity_type": "BROKER", "mc_number": "67890", "dot_number": "789012", "phone": "(555) 987-6543", "physical_city": "Lowell", "physical_state": "AR", "overall_rating": 4.5, "review_count": 0},
    
    # Top Rated Brokers
    "company-3": {"id": "company-3", "legal_name": "Reliable Transport Solutions", "dba_name": "RTS Logistics", "entity_type": "BROKER", "mc_number": "987654", "dot_number": "3456789", "phone": "555-0101", "physical_city": "Chicago", "physical_state": "IL", "overall_rating": 4.8, "review_count": 24, "payment_rating": 4.9, "communication_rating": 4.7, "professionalism_rating": 4.8, "honesty_rating": 4.9},
    "company-4": {"id": "company-4", "legal_name": "Premier Freight Services", "dba_name": "Premier Freight", "entity_type": "BROKER", "mc_number": "987655", "dot_number": "3456790", "phone": "555-0102", "physical_city": "Atlanta", "physical_state": "GA", "overall_rating": 4.7, "review_count": 18, "payment_rating": 4.8, "communication_rating": 4.6, "professionalism_rating": 4.7, "honesty_rating": 4.8},
    "company-5": {"id": "company-5", "legal_name": "Apex Logistics Group", "dba_name": "Apex Logistics", "entity_type": "BROKER", "mc_number": "987656", "dot_number": "3456791", "phone": "555-0103", "physical_city": "Dallas", "physical_state": "TX", "overall_rating": 4.6, "review_count": 31, "payment_rating": 4.7, "communication_rating": 4.5, "professionalism_rating": 4.6, "honesty_rating": 4.7},
    "company-6": {"id": "company-6", "legal_name": "Elite Transportation Partners", "dba_name": "Elite Partners", "entity_type": "BROKER", "mc_number": "987657", "dot_number": "3456792", "phone": "555-0104", "physical_city": "Phoenix", "physical_state": "AZ", "overall_rating": 4.9, "review_count": 15, "payment_rating": 5.0, "communication_rating": 4.8, "professionalism_rating": 4.9, "honesty_rating": 5.0},
    "company-7": {"id": "company-7", "legal_name": "Swift Load Brokers", "dba_name": "Swift Load", "entity_type": "BROKER", "mc_number": "987658", "dot_number": "3456793", "phone": "555-0105", "physical_city": "Nashville", "physical_state": "TN", "overall_rating": 4.5, "review_count": 27, "payment_rating": 4.6, "communication_rating": 4.4, "professionalism_rating": 4.5, "honesty_rating": 4.6},
    "company-8": {"id": "company-8", "legal_name": "Global Freight Network", "dba_name": "GFN Logistics", "entity_type": "FREIGHT_FORWARDER", "mc_number": "987659", "dot_number": "3456794", "phone": "555-0106", "physical_city": "Miami", "physical_state": "FL", "overall_rating": 4.7, "review_count": 22, "payment_rating": 4.8, "communication_rating": 4.6, "professionalism_rating": 4.8, "honesty_rating": 4.7},
    "company-9": {"id": "company-9", "legal_name": "Midwest Express Logistics", "dba_name": "Midwest Express", "entity_type": "BROKER", "mc_number": "987660", "dot_number": "3456795", "phone": "555-0107", "physical_city": "Kansas City", "physical_state": "MO", "overall_rating": 4.8, "review_count": 19, "payment_rating": 4.9, "communication_rating": 4.7, "professionalism_rating": 4.8, "honesty_rating": 4.9},
    "company-10": {"id": "company-10", "legal_name": "Pacific Coast Freight", "dba_name": "PC Freight", "entity_type": "BROKER", "mc_number": "987661", "dot_number": "3456796", "phone": "555-0108", "physical_city": "Seattle", "physical_state": "WA", "overall_rating": 4.6, "review_count": 25, "payment_rating": 4.7, "communication_rating": 4.5, "professionalism_rating": 4.6, "honesty_rating": 4.8},
    
    # Good Brokers
    "company-11": {"id": "company-11", "legal_name": "Nationwide Freight Solutions", "dba_name": "NFS Logistics", "entity_type": "BROKER", "mc_number": "987662", "dot_number": "3456797", "phone": "555-0109", "physical_city": "Denver", "physical_state": "CO", "overall_rating": 3.8, "review_count": 16, "payment_rating": 3.9, "communication_rating": 3.7, "professionalism_rating": 3.8, "honesty_rating": 3.9},
    "company-12": {"id": "company-12", "legal_name": "Mountain West Transportation", "dba_name": "Mountain West", "entity_type": "BROKER", "mc_number": "987663", "dot_number": "3456798", "phone": "555-0110", "physical_city": "Salt Lake City", "physical_state": "UT", "overall_rating": 3.7, "review_count": 14, "payment_rating": 3.8, "communication_rating": 3.6, "professionalism_rating": 3.7, "honesty_rating": 3.8},
    "company-13": {"id": "company-13", "legal_name": "Tri-State Logistics", "dba_name": "Tri-State", "entity_type": "BROKER", "mc_number": "987664", "dot_number": "3456799", "phone": "555-0111", "physical_city": "Portland", "physical_state": "OR", "overall_rating": 3.9, "review_count": 21, "payment_rating": 4.0, "communication_rating": 3.8, "professionalism_rating": 3.9, "honesty_rating": 4.0},
    "company-14": {"id": "company-14", "legal_name": "Central Freight Brokers", "dba_name": "Central Freight", "entity_type": "BROKER", "mc_number": "987665", "dot_number": "3456800", "phone": "555-0112", "physical_city": "Indianapolis", "physical_state": "IN", "overall_rating": 3.6, "review_count": 18, "payment_rating": 3.7, "communication_rating": 3.5, "professionalism_rating": 3.6, "honesty_rating": 3.7},
    "company-15": {"id": "company-15", "legal_name": "Keystone Transport Services", "dba_name": "Keystone Transport", "entity_type": "BROKER", "mc_number": "987666", "dot_number": "3456801", "phone": "555-0113", "physical_city": "Philadelphia", "physical_state": "PA", "overall_rating": 3.8, "review_count": 23, "payment_rating": 3.9, "communication_rating": 3.7, "professionalism_rating": 3.8, "honesty_rating": 3.9},
    
    # Average Brokers
    "company-16": {"id": "company-16", "legal_name": "Metro Freight Partners", "dba_name": "Metro Freight", "entity_type": "BROKER", "mc_number": "987669", "dot_number": "3456804", "phone": "555-0116", "physical_city": "Charlotte", "physical_state": "NC", "overall_rating": 3.2, "review_count": 28, "payment_rating": 3.3, "communication_rating": 3.1, "professionalism_rating": 3.2, "honesty_rating": 3.3},
    "company-17": {"id": "company-17", "legal_name": "Continental Transport Group", "dba_name": "Continental Transport", "entity_type": "BROKER", "mc_number": "987670", "dot_number": "3456805", "phone": "555-0117", "physical_city": "Columbus", "physical_state": "OH", "overall_rating": 3.0, "review_count": 25, "payment_rating": 3.1, "communication_rating": 2.9, "professionalism_rating": 3.0, "honesty_rating": 3.1},
    "company-18": {"id": "company-18", "legal_name": "Horizon Freight Services", "dba_name": "Horizon Freight", "entity_type": "BROKER", "mc_number": "987671", "dot_number": "3456806", "phone": "555-0118", "physical_city": "Memphis", "physical_state": "TN", "overall_rating": 3.4, "review_count": 22, "payment_rating": 3.5, "communication_rating": 3.3, "professionalism_rating": 3.4, "honesty_rating": 3.5},
    "company-19": {"id": "company-19", "legal_name": "Thunder Road Logistics", "dba_name": "Thunder Road", "entity_type": "BROKER", "mc_number": "987672", "dot_number": "3456807", "phone": "555-0119", "physical_city": "Oklahoma City", "physical_state": "OK", "overall_rating": 2.9, "review_count": 30, "payment_rating": 3.0, "communication_rating": 2.8, "professionalism_rating": 2.9, "honesty_rating": 3.0},
    "company-20": {"id": "company-20", "legal_name": "Liberty Freight Brokers", "dba_name": "Liberty Freight", "entity_type": "BROKER", "mc_number": "987673", "dot_number": "3456808", "phone": "555-0120", "physical_city": "Boston", "physical_state": "MA", "overall_rating": 3.3, "review_count": 19, "payment_rating": 3.4, "communication_rating": 3.2, "professionalism_rating": 3.3, "honesty_rating": 3.4},
    
    # Below Average Brokers
    "company-21": {"id": "company-21", "legal_name": "Budget Freight Solutions", "dba_name": "Budget Freight", "entity_type": "BROKER", "mc_number": "987678", "dot_number": "3456813", "phone": "555-0125", "physical_city": "Tampa", "physical_state": "FL", "overall_rating": 2.3, "review_count": 32, "payment_rating": 2.4, "communication_rating": 2.2, "professionalism_rating": 2.3, "honesty_rating": 2.4},
    "company-22": {"id": "company-22", "legal_name": "Quick Dispatch Logistics", "dba_name": "Quick Dispatch", "entity_type": "BROKER", "mc_number": "987679", "dot_number": "3456814", "phone": "555-0126", "physical_city": "San Antonio", "physical_state": "TX", "overall_rating": 2.1, "review_count": 35, "payment_rating": 2.2, "communication_rating": 2.0, "professionalism_rating": 2.1, "honesty_rating": 2.2},
    "company-23": {"id": "company-23", "legal_name": "Fast Track Freight", "dba_name": "Fast Track", "entity_type": "BROKER", "mc_number": "987680", "dot_number": "3456815", "phone": "555-0127", "physical_city": "Milwaukee", "physical_state": "WI", "overall_rating": 2.4, "review_count": 28, "payment_rating": 2.5, "communication_rating": 2.3, "professionalism_rating": 2.4, "honesty_rating": 2.5},
    
    # Poor Rated Brokers
    "company-24": {"id": "company-24", "legal_name": "Rock Bottom Freight", "dba_name": "Rock Bottom", "entity_type": "BROKER", "mc_number": "987684", "dot_number": "3456819", "phone": "555-0131", "physical_city": "Fresno", "physical_state": "CA", "overall_rating": 1.8, "review_count": 42, "payment_rating": 1.9, "communication_rating": 1.7, "professionalism_rating": 1.8, "honesty_rating": 1.9},
    "company-25": {"id": "company-25", "legal_name": "Cheap Haul Logistics", "dba_name": "Cheap Haul", "entity_type": "BROKER", "mc_number": "987685", "dot_number": "3456820", "phone": "555-0132", "physical_city": "Sacramento", "physical_state": "CA", "overall_rating": 1.5, "review_count": 45, "payment_rating": 1.6, "communication_rating": 1.4, "professionalism_rating": 1.5, "honesty_rating": 1.6},
    "company-26": {"id": "company-26", "legal_name": "Low Ball Transport", "dba_name": "Low Ball", "entity_type": "BROKER", "mc_number": "987686", "dot_number": "3456821", "phone": "555-0133", "physical_city": "Mesa", "physical_state": "AZ", "overall_rating": 1.7, "review_count": 40, "payment_rating": 1.8, "communication_rating": 1.6, "professionalism_rating": 1.7, "honesty_rating": 1.8},
    "company-27": {"id": "company-27", "legal_name": "Bargain Basement Freight", "dba_name": "Bargain Freight", "entity_type": "BROKER", "mc_number": "987687", "dot_number": "3456822", "phone": "555-0134", "physical_city": "Long Beach", "physical_state": "CA", "overall_rating": 1.4, "review_count": 48, "payment_rating": 1.5, "communication_rating": 1.3, "professionalism_rating": 1.4, "honesty_rating": 1.5},
    "company-28": {"id": "company-28", "legal_name": "Shady Deals Freight", "dba_name": "Shady Deals", "entity_type": "BROKER", "mc_number": "987690", "dot_number": "3456825", "phone": "555-0137", "physical_city": "Raleigh", "physical_state": "NC", "overall_rating": 1.2, "review_count": 52, "payment_rating": 1.3, "communication_rating": 1.1, "professionalism_rating": 1.2, "honesty_rating": 1.3},
    "company-29": {"id": "company-29", "legal_name": "Late Pay Express", "dba_name": "Late Pay", "entity_type": "BROKER", "mc_number": "987691", "dot_number": "3456826", "phone": "555-0138", "physical_city": "Omaha", "physical_state": "NE", "overall_rating": 1.5, "review_count": 46, "payment_rating": 1.6, "communication_rating": 1.4, "professionalism_rating": 1.5, "honesty_rating": 1.6},
    
    # Shippers
    "company-30": {"id": "company-30", "legal_name": "Walmart Distribution Centers", "dba_name": "Walmart DC", "entity_type": "SHIPPER", "mc_number": None, "dot_number": "3456827", "phone": "555-0139", "physical_city": "Bentonville", "physical_state": "AR", "overall_rating": 4.2, "review_count": 35, "payment_rating": 4.3, "communication_rating": 4.1, "professionalism_rating": 4.2, "honesty_rating": 4.3},
    "company-31": {"id": "company-31", "legal_name": "Target Supply Chain", "dba_name": "Target SC", "entity_type": "SHIPPER", "mc_number": None, "dot_number": "3456828", "phone": "555-0140", "physical_city": "Minneapolis", "physical_state": "MN", "overall_rating": 4.0, "review_count": 28, "payment_rating": 4.1, "communication_rating": 3.9, "professionalism_rating": 4.0, "honesty_rating": 4.1},
    "company-32": {"id": "company-32", "legal_name": "Amazon Logistics", "dba_name": "Amazon", "entity_type": "SHIPPER", "mc_number": None, "dot_number": "3456829", "phone": "555-0141", "physical_city": "Seattle", "physical_state": "WA", "overall_rating": 3.8, "review_count": 42, "payment_rating": 3.9, "communication_rating": 3.7, "professionalism_rating": 3.8, "honesty_rating": 3.9},
    "company-33": {"id": "company-33", "legal_name": "Home Depot Distribution", "dba_name": "Home Depot", "entity_type": "SHIPPER", "mc_number": None, "dot_number": "3456830", "phone": "555-0142", "physical_city": "Atlanta", "physical_state": "GA", "overall_rating": 4.1, "review_count": 31, "payment_rating": 4.2, "communication_rating": 4.0, "professionalism_rating": 4.1, "honesty_rating": 4.2},
    "company-34": {"id": "company-34", "legal_name": "Costco Wholesale", "dba_name": "Costco", "entity_type": "SHIPPER", "mc_number": None, "dot_number": "3456831", "phone": "555-0143", "physical_city": "Issaquah", "physical_state": "WA", "overall_rating": 4.3, "review_count": 26, "payment_rating": 4.4, "communication_rating": 4.2, "professionalism_rating": 4.3, "honesty_rating": 4.4},
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

