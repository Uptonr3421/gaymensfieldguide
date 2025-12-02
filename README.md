# Vibe Coding - Project Repository

This repository contains the source code for the new Vibe Coding brand website.

## Development Workflow

**Important:** To maintain code integrity and streamline our deployment process, all contributors must adhere to the following guidelines.

### Branching and Commits

*   **No Branching:** All work is to be committed directly to the `main` branch. We are adopting a trunk-based development model to simplify our workflow.
*   **Direct Commits to `main`:** Always pull the latest changes from `main` before starting your work. Once your changes are complete, commit them directly to `main`.

### Code Integrity and Deployment

*   **Multi-Process Linting:** Before any deployment, the code must pass a multi-process linting check. This ensures code quality and consistency.
*   **Verification:** The linting process will be automated. Any code that fails the linting checks will not be deployed.

### Production Deployment (Vercel)

Use the included Vercel CLI to deploy the site to the production project.

1. Copy `.env.example` to `.env.local` and ensure the Vercel variables are present. The production `VERCEL_PROJECT_ID` is already set to `prj_5t0qrMPZtrhSpsvfxBdZRohecAA3`; fill in `VERCEL_ORG_ID` and `VERCEL_TOKEN` for your account.
2. Run `pnpm install` if dependencies are missing.
3. Build and deploy to production with `pnpm deploy:prod`. The script uses prebuilt assets and the provided project settings to publish to the linked Vercel project.
