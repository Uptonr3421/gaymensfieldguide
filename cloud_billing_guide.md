# Google Cloud Billing Setup Guide

## Why This Matters
Without proper billing, you'll hit **free-tier rate limits** constantly. With billing enabled on Google Cloud credits, you get:
- **Higher QPM (queries per minute)** for Gemini API
- **No "free user" flags** in Antigravity or Gemini CLI
- Access to premium models (Gemini Pro, Flash, etc.)

---

## Quick Setup Steps

### Step 1: Verify Your Account
Run in PowerShell:
```powershell
gcloud auth list
```
Ensure your account (**onew100110@gmail.com** or **contact@bespokeethos.com**) is active.

### Step 2: Link Billing to Project
```powershell
# Check current billing status
gcloud billing projects describe bespokeethos-analytics-475007

# List available billing accounts
gcloud billing accounts list
```

If no billing is linked, go to: https://console.cloud.google.com/billing/linkedaccount?project=bespokeethos-analytics-475007

### Step 3: Enable Vertex AI API
```powershell
gcloud services enable aiplatform.googleapis.com --project=bespokeethos-analytics-475007
```

### Step 4: Set Up Application Default Credentials
This is what makes your local apps use your credentials:
```powershell
gcloud auth application-default login
```
Follow the browser prompt and authorize.

### Step 5: Verify Everything
```powershell
gcloud config list
# Should show: project = bespokeethos-analytics-475007

node verify_vertex_auth.js
# Should show: ✅ SUCCESS
```

---

## Authorized Users
| Email | Role |
|-------|------|
| onew100110@gmail.com | Admin |
| contact@bespokeethos.com | Admin |

---

## Troubleshooting Rate Limits

### "Free user" or "Quota exceeded" errors?
1. **Check billing is linked**: 
   ```powershell
   gcloud billing projects describe bespokeethos-analytics-475007
   ```
   If `billingAccountName` is empty, billing isn't linked.

2. **Set ADC (Application Default Credentials)**:
   ```powershell
   gcloud auth application-default login
   gcloud auth application-default set-quota-project bespokeethos-analytics-475007
   ```

3. **Verify API key is from billed project**: 
   Check your `.env.local` has `GOOGLE_GEMINI_API` from the bespokeethos project.

---

## API Key (Already Configured)

Your `.env` file now includes the new API key from `bespokeethos-analytics-475007`:

```
GOOGLE_GEMINI_API=AIzaSyBqviAMBV6GXcDBTfyrOIJ-cdNobcwBZLU
GOOGLE_CLOUD_PROJECT=bespokeethos-analytics-475007
```

This key is linked to your billed project, so you should no longer hit free-tier rate limits.

---

## Generating Vertex AI Service Account Keys (for System Integrations)

For Vertex AI, especially for programmatic access like Imagen generation, you often need a Service Account Key (a JSON file).

**Steps:**
1.  Go to [IAM & Admin -> Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts?project=bespokeethos-analytics-475007) in the Google Cloud Console.
2.  Select or create a Service Account (ensure it has the `Vertex AI User` role).
3.  Click the 'Actions' (three dots) menu for the Service Account, select 'Manage keys', then 'ADD KEY' -> 'Create new key' -> 'JSON'.
4.  Download the JSON key file and save it securely.
5.  Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the **path** of this JSON file in your `.env.local`:
    `GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json`

**Important Note on Organizational Policy:**
If you encounter an error like "Key creation is not allowed on this service account" (e.g., `constraints/iam.disableServiceAccountKeyCreation`), this is an Organizational Policy set by your Google Cloud Administrator. You will need to contact them to relax this policy or provide an existing key.

---

## Google Cloud Console Links
- [Billing Dashboard](https://console.cloud.google.com/billing?project=bespokeethos-analytics-475007)
- [Enable APIs](https://console.cloud.google.com/apis/library?project=bespokeethos-analytics-475007)
- [Vertex AI](https://console.cloud.google.com/vertex-ai?project=bespokeethos-analytics-475007)
- [IAM Permissions](https://console.cloud.google.com/iam-admin/iam?project=bespokeethos-analytics-475007)
