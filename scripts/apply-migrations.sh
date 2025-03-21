#!/bin/bash

# This script applies the migrations to the Supabase project
# Make sure you have installed the Supabase CLI and logged in

echo "Applying migrations to Supabase project..."

# Make sure we're in the project root
cd "$(dirname "$0")/.." || exit

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Error: Supabase CLI is not installed."
    echo "Please install it by following the instructions at:"
    echo "https://supabase.com/docs/guides/cli/getting-started"
    exit 1
fi

# Apply migrations
echo "Applying migrations using Supabase CLI..."
supabase db push

echo "Migrations applied successfully!"