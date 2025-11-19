# Project Policy: Inclusive and Non-Binary Language

This document outlines the policy for using inclusive and non-binary language across all aspects of the Gay Men's Field Guide project, including code, documentation, user interface text, and content.

## 1. General Principle

All communication, both internal (code comments, documentation, commit messages) and external (user-facing text, articles), must adhere to principles of inclusivity and respect, specifically by avoiding gendered language where a non-gendered alternative is available.

## 2. Guidelines for Code and Documentation

*   **Avoid Gendered Terms:** Replace terms like "master/slave," "whitelist/blacklist," and "he/she" with neutral alternatives.
    *   **Instead of:** master/slave
    *   **Use:** primary/replica, main/secondary
    *   **Instead of:** whitelist/blacklist
    *   **Use:** allowlist/denylist, approved/blocked
    *   **Instead of:** he/she, his/hers
    *   **Use:** they/them, their, the user, the person

## 3. Future Implementation

The project team will explore and implement tools to automate the enforcement of this policy, such as:
*   Integrating a linter plugin (e.g., `eslint-plugin-inclusive-language`) into the development workflow.
*   Adding a pre-commit hook to check for non-inclusive terms in commit messages.

This policy is effective immediately. All contributors are expected to review and adhere to these guidelines.
