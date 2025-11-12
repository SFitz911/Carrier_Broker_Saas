# 🌱 Database Seeds

This directory contains seed data for the Carrier Board database to help with testing and development.

## 📋 Available Seeds

### `01_companies_seed.sql`
Adds **50 example companies** to the database with varied ratings and characteristics:

- **8 Top Rated Brokers** (4.5-5.0 stars) - Excellent service, fast payment
- **7 Good Brokers** (3.5-3.9 stars) - Reliable, minor issues
- **9 Average Brokers** (2.5-3.4 stars) - Mixed reviews
- **6 Below Average Brokers** (2.0-2.4 stars) - Payment delays, communication issues
- **8 Poor Brokers** (1.0-1.9 stars) - Serious problems, avoid
- **10 Shippers** (3.6-4.3 stars) - Major retailers and brands

Each company includes:
- ✅ Realistic company names and contact info
- ✅ DOT/MC numbers
- ✅ City, state, zip code
- ✅ Overall rating + detailed ratings (payment, communication, etc.)
- ✅ Review counts
- ✅ Payment issue flags for low-rated companies
- ✅ Timestamps

## 🚀 How to Run Seeds

### Option 1: Python Script (Recommended)

**Windows:**
```bash
cd database/seeds
run_seeds.bat
```

**Mac/Linux:**
```bash
cd database/seeds
python3 run_seeds.py
```

### Option 2: Direct SQL (If PostgreSQL is running)

```bash
psql -U postgres -d carrier_board -f 01_companies_seed.sql
```

### Option 3: Using Docker

If you're running PostgreSQL in Docker:

```bash
docker exec -i carrier_board_db psql -U postgres -d carrier_board < database/seeds/01_companies_seed.sql
```

## ⚙️ Configuration

The Python seeder (`run_seeds.py`) uses these default settings:

```python
DB_CONFIG = {
    'dbname': 'carrier_board',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432'
}
```

**Edit `run_seeds.py`** if your database settings are different.

## 📊 What Gets Added

After running the seeds, you'll have:

- **50 companies** with varied ratings
- Companies distributed across **30+ US cities**
- Mix of **brokers** (38), **shippers** (10), and **freight forwarders** (2)
- **Realistic review counts** (15-52 reviews per company)
- **Payment issues** flagged for low-rated companies
- All companies marked as **verified**

## 🧪 Testing

These seeds are perfect for testing:

- ✅ Search functionality
- ✅ Rating filters
- ✅ Best/Worst broker lists
- ✅ Company profiles
- ✅ Review displays
- ✅ Payment issue warnings

## 🧹 Clearing Data

To remove all seeded companies (optional):

```sql
DELETE FROM reviews WHERE company_id IN (
    SELECT id FROM companies 
    WHERE dot_number BETWEEN '3456789' AND '3456836'
);

DELETE FROM companies 
WHERE dot_number BETWEEN '3456789' AND '3456836';
```

## 📝 Notes

- The seed data uses DOT numbers **3456789-3456836** and MC numbers **987654-987691**
- All phone numbers use the **555-01XX** format (fake numbers)
- Email addresses and websites are fictional
- Review counts and ratings are pre-calculated for testing

## 🔄 Re-running Seeds

If you need to re-run the seeds:

1. Clear existing data first (see "Clearing Data" above)
2. Run the seeder again

The seed file is **idempotent** - you can run it multiple times, but you may want to clear old data first to avoid duplicates.

## 🐛 Troubleshooting

**"Connection refused":**
- Make sure PostgreSQL is running
- Check that the database `carrier_board` exists
- Verify connection settings in `run_seeds.py`

**"psycopg2 not found":**
- Install it: `pip install psycopg2-binary`

**"Permission denied":**
- Check PostgreSQL user permissions
- Make sure the user can INSERT into tables

---

**Need help?** Check the main project README or contact the development team.

