
import google.auth
from googleapiclient.discovery import build

SITE_URL = "https://gaymensfieldguide.com/"

def setup_search_console():
    try:
        # Use default credentials (works with GOOGLE_APPLICATION_CREDENTIALS or gcloud auth)
        creds, project = google.auth.default(scopes=['https://www.googleapis.com/auth/webmasters'])
        service = build('searchconsole', 'v1', credentials=creds) 
        
        # 1. Add site
        print(f"Adding/Getting site {SITE_URL}...")
        service.sites().add(siteUrl=SITE_URL).execute()
        
        # 2. Get Info
        site_info = service.sites().get(siteUrl=SITE_URL).execute()
        print(f"SITE_INFO: {site_info}") 
        

        # 2. Get Verification Token
        # We use the siteVerification API usually, but Search Console API also has logic.
        # Actually proper way is siteVerification API specifically for tokens.
        
    except Exception as e:
        print(f"Search Console Error: {e}")

def get_verification_token():
    try:
        creds, project = google.auth.default(scopes=['https://www.googleapis.com/auth/siteverification'])
        service = build('siteVerification', 'v1', credentials=creds)
        
        print(f"Requesting verification token for {SITE_URL}...")
        request_body = {
            "verificationMethod": "META",
            "site": {
                "identifier": SITE_URL,
                "type": "SITE"
            }
        }
        response = service.webResource().getToken(body=request_body).execute()
        print(f"TOKEN_RESULT: {response['token']}")
        return response['token']
        
    except Exception as e:
        print(f"Verification Token Error: {e}")

if __name__ == "__main__":
    setup_search_console()
    get_verification_token()
