#!/bin/zsh

# Activate conda environment
source /opt/miniconda3/etc/profile.d/conda.sh
conda activate EGCA

# Print confirmation
echo "Activated conda environment: EGCA"
python --version

# Set environment variable to track active project
export EGCA_PROJECT_ROOT="$(pwd)" 