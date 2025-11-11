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

## 🔑 How to Get an FMCSA API Key

### Step 1: Register for an API Key

1. Visit the FMCSA Web Services Portal:
   - **URL**: https://mobile.fmcsa.dot.gov/developer/home.page

2. Create an account or log in

3. Request an API key (called "webKey")
   - Fill out the registration form
   - Agree to terms of service
   - Wait for approval (usually 1-3 business days)

### Step 2: Receive Your API Key

You'll receive an email with your `webKey` that looks like:
```
YOUR_API_KEY_HERE_123456789
```

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

## 📝 API Endpoint Format

### Verify DOT Number

```
GET https://mobile.fmcsa.dot.gov/qc/services/carriers/{DOT_NUMBER}?webKey={YOUR_API_KEY}
```

**Example Request:**
```bash
curl "https://mobile.fmcsa.dot.gov/qc/services/carriers/1234567?webKey=YOUR_API_KEY"
```

**Example Response:**
```json
{
  "content": {
    "carrier": {
      "dotNumber": "1234567",
      "legalName": "ACME TRUCKING INC",
      "status": "Authorized for Property",
      "safetyRating": "Satisfactory",
      "physicalAddress": {
        "streetLine": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zipCode": "62701"
      }
    }
  }
}
```

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

1. **Verify Carriers Automatically**
   - Instant DOT/MC number verification
   - Real-time safety rating checks

2. **Display Safety Ratings**
   - Show carrier safety ratings before booking
   - Flag carriers with poor safety records

3. **Auto-fill Company Profiles**
   - Pull official company name, address
   - Display operating authority status

4. **Compliance Checking**
   - Verify active insurance coverage
   - Check operating authority status

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

The FMCSA API returns rich data about carriers:

| Field | Description | Example |
|-------|-------------|---------|
| `dotNumber` | DOT number | "1234567" |
| `legalName` | Official company name | "ACME TRUCKING INC" |
| `status` | Operating authority status | "Authorized for Property" |
| `safetyRating` | FMCSA safety rating | "Satisfactory" |
| `mcNumber` | MC number (if applicable) | "123456" |

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

## 📚 Additional Resources

- **FMCSA Developer Portal**: https://mobile.fmcsa.dot.gov/developer/
- **SAFER System**: https://safer.fmcsa.dot.gov/
- **API Documentation**: Available after registration
- **FMCSA Query Tool**: https://safer.fmcsa.dot.gov/query.asp

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

