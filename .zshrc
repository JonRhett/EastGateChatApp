# Function to activate EGCA environment when entering project directory
function cd() {
    builtin cd "$@"
    if [[ -f "activate_env.sh" ]]; then
        source activate_env.sh
    fi
}

# Function to deactivate environment when leaving project directory
function cd_prev() {
    if [[ -n "$EGCA_PROJECT_ROOT" ]]; then
        if [[ "$(pwd)" != "$EGCA_PROJECT_ROOT"* ]]; then
            conda deactivate
            unset EGCA_PROJECT_ROOT
        fi
    fi
    builtin cd "$@"
}

# Alias cd to our custom function
alias cd='cd_prev' 