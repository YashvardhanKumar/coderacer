# Repository Settings for Squash Merge

This file documents the recommended GitHub repository settings to enforce squash merge.

## Branch Protection Settings

To enforce squash merge only on the main branch:

1. Go to Settings > Branches in your GitHub repository
2. Add or edit branch protection rule for `main` (or `master`)
3. Enable the following settings:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
   - ✅ Restrict pushes that create files larger than 100MB

## Merge Settings

1. Go to Settings > General > Pull Requests
2. Configure merge options:
   - ✅ Allow squash merging (keep enabled)
   - ❌ Allow merge commits (disable)
   - ❌ Allow rebase merging (disable)

This will force all PRs to use squash merge only.

## Auto-delete head branches

- ✅ Automatically delete head branches (recommended)

This keeps the repository clean after PRs are merged.
