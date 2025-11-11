# 🚛 FMCSA API Setup Guide

## What is the FMCSA API?

The **FMCSA API** (Federal Motor Carrier Safety Administration API) is a web-based data service provided by the U.S. Department of Transportation (DOT). It allows developers to programmatically access official FMCSA data on trucking companies, drivers, and safety compliance.

---

## 📊 What Data Does It Provide?

### SAFER (Safety and Fitness Electronic Records)
- Carrier name, DOT number, MC number
- Company type (Carrier, Broker, Freight Forwarder)
- Safety rating, inspection results
- Insurance and authority status

### Licensing & Insurance (L&I)
- Active operating authority
- Insurance and BOC-3 filing details
- Motor carrier registration information

### SMS (Safety Measurement System)
- Crash and inspection history
- BASIC safety scores
- Company Snapshot (address, cargo types, fleet size, etc.)

---

## 🔑 How to Get an FMCSA WebKey (API Key)

### Step 1: Create a Developer Account

1. Visit the **FMCSA Mobile Developer Portal**:
   - **URL**: https://mobile.fmcsa.dot.gov/developer/home.page

2. **Sign in** and create a developer account
   - Click "Register" if you don't have an account
   - Fill out your information

### Step 2: Request a WebKey

1. Once logged in, **request a WebKey** (this is your API key)
   - Navigate to the WebKey request page
   - Fill out the registration form
   - Agree to terms of service
   - Submit your request

2. **Wait for approval** (usually 1-3 business days)
   - You'll receive an email confirmation

### Step 3: Receive Your WebKey

You'll receive your `webKey` via email. It looks like:
```
YOUR_WEBKEY_HERE_123456789
```

**Every API request must include this WebKey as a query parameter.**

---

## ⚙️ Configure Carrier Board to Use FMCSA API

### Option 1: Using credentials.json (Recommended)

1. Create or edit `credentials.json` in the project root:

```json
{
  "fmcsa": {
    "api_key": "YOUR_FMCSA_WEB_KEY_HERE",
    "api_url": "https://mobile.fmcsa.dot.gov/qc/services/carriers",
    "timeout": 10
  }
}
```

2. Replace `YOUR_FMCSA_WEB_KEY_HERE` with your actual API key

### Option 2: Using Environment Variables

Set these environment variables:

```bash
export FMCSA_API_KEY="YOUR_FMCSA_WEB_KEY_HERE"
export FMCSA_API_URL="https://mobile.fmcsa.dot.gov/qc/services/carriers"
export FMCSA_TIMEOUT="10"
```

---

## 📝 FMCSA QCMobile API Endpoints

The **QCMobile API** returns the same core "Company Snapshot" data you see on the SAFER website, but in clean JSON format—perfect for applications.

### Endpoint 1: Lookup by DOT Number

```
GET https://mobile.fmcsa.dot.gov/qc/services/carriers/dot/{USDOT}?webKey=YOUR_WEBKEY
```

**Example Request:**
```bash
curl "https://mobile.fmcsa.dot.gov/qc/services/carriers/dot/1234567?webKey=YOUR_WEBKEY"
```

### Endpoint 2: Lookup by MC/Docket Number

```
GET https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/{MC}?webKey=YOUR_WEBKEY
```

**Example Request:**
```bash
curl "https://mobile.fmcsa.dot.gov/qc/services/carriers/docket-number/123456?webKey=YOUR_WEBKEY"
```

### Endpoint 3: Lookup by Company Name

```
GET https://mobile.fmcsa.dot.gov/qc/services/carriers/name/{encodedName}?webKey=YOUR_WEBKEY
```

**Example Request:**
```bash
curl "https://mobile.fmcsa.dot.gov/qc/services/carriers/name/ACME%20TRUCKING?webKey=YOUR_WEBKEY"
```

**Note:** URL-encode the company name (spaces become `%20`)

### Endpoint 4: Get Authority & Insurance Info

```
GET https://mobile.fmcsa.dot.gov/qc/services/carriers/{USDOT}/authority?webKey=YOUR_WEBKEY
```

**Example Request:**
```bash
curl "https://mobile.fmcsa.dot.gov/qc/services/carriers/1234567/authority?webKey=YOUR_WEBKEY"
```

**Returns:** Operating authority, insurance, and BOC-3 filing information

---

### Example Response (JSON)

```json
{
  "content": {
    "carrier": {
      "dotNumber": "1234567",
      "legalName": "ACME TRUCKING INC",
      "dbaName": "ACME FREIGHT",
      "status": "Authorized for Property",
      "safetyRating": "Satisfactory",
      "physicalAddress": {
        "streetLine": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zipCode": "62701"
      },
      "mailingAddress": {
        "streetLine": "PO Box 456",
        "city": "Springfield",
        "state": "IL",
        "zipCode": "62702"
      },
      "oosDate": null,
      "mcs150Date": "2023-11-15",
      "mcs150Mileage": 500000,
      "mcs150MileageYear": 2023,
      "totalDrivers": 12,
      "totalPowerUnits": 8
    }
  }
}
```

**Fields mirror what you see on the SAFER "Company Snapshot" page.**

---

## 🎯 CRITICAL: Verifying BROKERS (Not Carriers)

**For Carrier Board, it's essential to verify that an MC number belongs to a BROKER**, not a carrier. Truckers should only rate brokers, not other truckers.

### The entityType Field

The FMCSA API returns an `entityType` field that indicates what type of entity you're looking at:

- **`"BROKER"`** - Freight broker
- **`"CARRIER"`** - Trucking company/carrier  
- **`"FREIGHT_FORWARDER"`** - Freight forwarder
- **And others**

### Broker Verification Pattern

```python
import os, requests

WEBKEY = os.environ["FMCSA_WEBKEY"]
BASE = "https://mobile.fmcsa.dot.gov/qc/services"

def verify_broker(mc):
    # Look up by MC/Docket number
    r = requests.get(f"{BASE}/carriers/docket-number/{mc}", 
                     params={"webKey": WEBKEY}, 
                     timeout=20)
    r.raise_for_status()
    
    carrier = r.json().get("content", {}).get("carrier")
    
    if not carrier:
        return {"error": "MC not found"}
    
    # CHECK: Is this actually a broker?
    if carrier.get("entityType") != "BROKER":
        return {"error": f"MC#{mc} is not a broker (type: {carrier.get('entityType')})"}
    
    # It's a broker! Get additional authority data
    dot = carrier.get("dotNumber")
    auth = requests.get(f"{BASE}/carriers/{dot}/authority",
                       params={"webKey": WEBKEY},
                       timeout=20).json()
    
    return {
        "is_broker": True,
        "mc": mc,
        "dot": dot,
        "legalName": carrier.get("legalName"),
        "dbaName": carrier.get("dbaName"),
        "entityType": carrier.get("entityType"),  # "BROKER"
        "authority": auth.get("content"),          # Insurance, BOC-3, etc.
    }
```

### Why This Matters

1. **Prevent Rating Carriers** - Truckers should rate brokers, not other truckers
2. **Accurate Data** - Brokers have different authority types than carriers
3. **Trust** - Ensures platform integrity

### Carrier Board Implementation

The platform should:
1. ✅ Verify MC number exists
2. ✅ Check `entityType == "BROKER"`
3. ✅ Reject if it's a carrier or other entity
4. ✅ Get authority/insurance data for brokers
5. ✅ Display broker-specific information

---

## 🧪 Testing Without an API Key (Development Mode)

**Good news!** Carrier Board works **without an FMCSA API key** during development.

If no API key is configured, the system automatically runs in **Mock Mode**:
- Returns realistic test data
- No external API calls
- Perfect for development and testing
- Clearly marked as "mock data" in responses

**To enable Mock Mode:**
- Simply don't configure an API key
- The system will automatically detect and use mock data

---

## 🎯 Use Cases for Carrier Board

### 1. Verify Brokers Before Taking Loads
   - Instant DOT/MC number verification
   - Check if broker is Out of Service (OOS)
   - Verify operating authority status

### 2. Display Safety Information
   - Show broker/shipper safety ratings
   - Flag companies with poor safety records
   - Show crash and inspection history

### 3. Auto-fill Broker Profiles
   - Pull official company name, DBA name
   - Display physical address and phone
   - Show fleet size and driver count

### 4. Insurance & Authority Verification
   - Verify active insurance coverage
   - Check BOC-3 filing status
   - Confirm operating authority is current

### 5. Detect Red Flags
   - Identify recently Out of Service companies
   - Show companies with outdated MCS-150 forms
   - Alert on missing insurance

---

## 🚀 Integration in Carrier Board

Once configured, the FMCSA API is used in:

### Landing Page Demo
- `/` - Try the DOT/MC verification box
- Real-time verification with visual feedback

### User Registration
- Automatic verification during signup
- Validates DOT/MC numbers
- Pre-fills company information

### Carrier Profiles
- Displays official FMCSA data
- Shows safety ratings
- Updates automatically

---

## 📊 API Response Fields

The FMCSA QCMobile API returns comprehensive "Company Snapshot" data:

| Field | Description | Example |
|-------|-------------|---------|
| `dotNumber` | DOT number | "1234567" |
| `legalName` | Official company name | "ACME TRUCKING INC" |
| `dbaName` | Doing Business As name | "ACME FREIGHT" |
| `status` | Operating authority status | "Authorized for Property" |
| `safetyRating` | FMCSA safety rating | "Satisfactory", "Unsatisfactory", "None" |
| `oosDate` | Out of Service date | "2023-01-15" or `null` |
| `mcs150Date` | MCS-150 form update date | "2023-11-15" |
| `mcs150Mileage` | Annual mileage reported | 500000 |
| `totalDrivers` | Number of drivers | 12 |
| `totalPowerUnits` | Number of trucks | 8 |
| `physicalAddress` | Physical location | Address object |
| `mailingAddress` | Mailing address | Address object |

### Additional Data Available

The API also provides:
- **Crash/Inspection counts** (updated weekly)
- **Insurance information**
- **BOC-3 filing details** (via L&I resources)
- **Operating classifications**
- **Cargo types**

---

## 🔒 Security Best Practices

1. **Never commit your API key to version control**
   - Add `credentials.json` to `.gitignore`
   - Use environment variables in production

2. **Rotate your API keys periodically**
   - Request new keys every 6-12 months

3. **Monitor your API usage**
   - FMCSA may have rate limits
   - Implement caching to reduce calls

4. **Use HTTPS only**
   - Always use the secure endpoint

---

## 🆘 Troubleshooting

### "401 Unauthorized" Error
- Check that your API key is correct
- Verify the key hasn't expired
- Ensure you're using `webKey` parameter (not headers)

### "404 Not Found" Error
- DOT/MC number doesn't exist in database
- Check the number format (digits only)

### "429 Too Many Requests" Error
- You've hit the rate limit
- Implement caching
- Wait before retrying

### Mock Mode Still Active
- Verify your API key is set in `credentials.json`
- Check that the key isn't empty or a placeholder
- Restart the backend server after adding the key

---

## 🔄 Data Freshness & Caching

### Update Frequency
- **Company Snapshot data**: Updated daily
- **Crash/Inspection counts**: Updated weekly
- **Insurance/L&I data**: Updated as filed

### Recommended Caching Strategy
1. **Cache carrier data** for 24 hours
2. **Refresh on demand** when users request verification
3. **Flag stale data** if older than 7 days
4. **Store oosDate** to identify Out of Service carriers

**Design your cache/refresh logic accordingly** to balance API usage with data freshness.

---

## 📚 Official Resources

- **FMCSA Mobile Developer Portal**: https://mobile.fmcsa.dot.gov/developer/
  - Request WebKey here
  - Access API documentation
  
- **SAFER Web (Company Snapshot)**: https://safer.fmcsa.dot.gov/
  - View human-readable company data
  - **Note**: Don't scrape this—use the API instead
  
- **Data.gov - FMCSA Datasets**: https://catalog.data.gov/organization/dot-gov
  - Additional L&I resources
  - BOC-3 and insurance data
  
- **FMCSA Query Tool**: https://safer.fmcsa.dot.gov/query.asp
  - Manual lookup tool (for reference)

---

## ⚠️ Important Notes

### Don't Scrape SAFER Web
The public SAFER "Company Snapshot" pages are HTML meant for humans—**not stable for applications**. 

✅ **Use the QCMobile API** instead
❌ **Don't scrape HTML pages** (brittle and may violate terms)

### WebKey in Query Parameters
Always include your WebKey as a **query parameter**, not in headers:

```
?webKey=YOUR_WEBKEY
```

### Rate Limits
While not officially documented, be respectful:
- Implement caching (24-hour minimum)
- Don't make excessive requests
- Monitor your usage

---

## ✅ Quick Start Checklist

- [ ] Register for FMCSA API key
- [ ] Receive webKey via email
- [ ] Add key to `credentials.json` or environment variables
- [ ] Restart backend server
- [ ] Test verification on landing page
- [ ] Verify "mock" flag is false in responses

---

**Questions?** Check the main [README.md](../README.md) or [NO_API_KEYS_REQUIRED.md](NO_API_KEYS_REQUIRED.md) for more information.

