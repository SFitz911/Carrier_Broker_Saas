#!/usr/bin/env python3
"""
Carrier Board - Database Seeder
Runs all seed files in the seeds directory
"""

import os
import sys
import psycopg2
from pathlib import Path

# Database connection settings
# Adjust these based on your setup
DB_CONFIG = {
    'dbname': 'carrier_board',
    'user': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432'
}

def run_seed_file(cursor, seed_file):
    """Execute a SQL seed file"""
    print(f"Running seed file: {seed_file.name}")
    
    with open(seed_file, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    try:
        cursor.execute(sql)
        print(f"✓ Successfully executed {seed_file.name}")
        return True
    except Exception as e:
        print(f"✗ Error executing {seed_file.name}: {e}")
        return False

def main():
    """Main seeder function"""
    print("=" * 60)
    print("Carrier Board - Database Seeder")
    print("=" * 60)
    print()
    
    # Get seeds directory
    seeds_dir = Path(__file__).parent
    
    # Find all SQL seed files
    seed_files = sorted(seeds_dir.glob('*.sql'))
    
    if not seed_files:
        print("No seed files found in", seeds_dir)
        return
    
    print(f"Found {len(seed_files)} seed file(s):")
    for seed_file in seed_files:
        print(f"  - {seed_file.name}")
    print()
    
    # Connect to database
    try:
        print("Connecting to database...")
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = False
        cursor = conn.cursor()
        print("✓ Connected to database")
        print()
    except Exception as e:
        print(f"✗ Failed to connect to database: {e}")
        print()
        print("Make sure PostgreSQL is running and the database exists.")
        print("You can create it with: createdb carrier_board")
        return
    
    # Run each seed file
    success_count = 0
    for seed_file in seed_files:
        if run_seed_file(cursor, seed_file):
            success_count += 1
        print()
    
    # Commit or rollback
    if success_count == len(seed_files):
        print("All seed files executed successfully!")
        print("Committing changes...")
        conn.commit()
        print("✓ Changes committed")
    else:
        print(f"Some seed files failed ({len(seed_files) - success_count} errors)")
        print("Rolling back all changes...")
        conn.rollback()
        print("✗ Changes rolled back")
    
    # Close connection
    cursor.close()
    conn.close()
    print()
    print("=" * 60)
    print("Seeder finished")
    print("=" * 60)

if __name__ == '__main__':
    main()

