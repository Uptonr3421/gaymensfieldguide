#!/usr/bin/env python3
"""
Google Analytics & Search Console Setup Script
Uses OAuth to authenticate and set up GA4 + Search Console for gaymensfieldguide.com
"""

import json
import os
import webbrowser
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

# Paths
OAUTH_DIR = Path(__file__).parent
CLIENT_SECRETS = OAUTH_DIR / "google_oauth_client.json"
TOKEN_FILE = OAUTH_DIR / "google_token.json"

# Scopes needed for Analytics + Search Console
SCOPES = [
    'https://www.googleapis.com/auth/analytics.edit',           # GA4 Admin
    'https://www.googleapis.com/auth/analytics.readonly',       # GA4 Read
    'https://www.googleapis.com/auth/webmasters',               # Search Console
    'https://www.googleapis.com/auth/webmasters.readonly',      # Search Console Read
]

SITE_URL = 'https://gaymensfieldguide.com'

def get_credentials():
    """Get or refresh OAuth credentials."""
    creds = None
    
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("🔄 Refreshing expired token...")
            creds.refresh(Request())
        else:
            print("🔐 Starting OAuth flow...")
            print("   A browser will open. Sign in with contact@bespokeethos.com")
            
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CLIENT_SECRETS), 
                SCOPES,
                redirect_uri='http://localhost:8080'
            )
            creds = flow.run_local_server(port=8080, prompt='consent')
        
        # Save credentials
        with open(TOKEN_FILE, 'w') as f:
            f.write(creds.to_json())
        print("✅ Credentials saved!")
    
    return creds

def setup_search_console(creds):
    """Add site to Search Console and verify."""
    print("\n📊 Setting up Google Search Console...")
    
    service = build('searchconsole', 'v1', credentials=creds)
    
    # Check if site already exists
    try:
        sites = service.sites().list().execute()
        existing = [s['siteUrl'] for s in sites.get('siteEntry', [])]
        
        if SITE_URL in existing or f'sc-domain:gaymensfieldguide.com' in existing:
            print(f"   ✅ Site already in Search Console: {SITE_URL}")
        else:
            # Add the site
            print(f"   Adding {SITE_URL}...")
            service.sites().add(siteUrl=SITE_URL).execute()
            print(f"   ✅ Site added to Search Console!")
        
        # Verify using the HTML file method
        print("   Verification file already deployed at:")
        print(f"   {SITE_URL}/google1cd91746b71a2414.html")
        
    except Exception as e:
        print(f"   ⚠️ Search Console error: {e}")
        print("   You may need to verify manually at:")
        print("   https://search.google.com/search-console")

def setup_analytics(creds):
    """Create GA4 property and get Measurement ID."""
    print("\n📈 Setting up Google Analytics 4...")
    
    # Analytics Admin API
    admin_service = build('analyticsadmin', 'v1beta', credentials=creds)
    
    try:
        # List existing accounts
        accounts = admin_service.accounts().list().execute()
        
        if not accounts.get('accounts'):
            print("   ⚠️ No Google Analytics accounts found.")
            print("   Create one at: https://analytics.google.com")
            return None
        
        account = accounts['accounts'][0]
        account_name = account['name']
        print(f"   Found account: {account.get('displayName', account_name)}")
        
        # Check for existing properties
        properties = admin_service.properties().list(
            filter=f"parent:{account_name}"
        ).execute()
        
        ga4_property = None
        for prop in properties.get('properties', []):
            if 'gaymensfieldguide' in prop.get('displayName', '').lower() or \
               'gmfg' in prop.get('displayName', '').lower():
                ga4_property = prop
                break
        
        if ga4_property:
            print(f"   ✅ Found existing property: {ga4_property['displayName']}")
        else:
            # Create new property
            print("   Creating new GA4 property...")
            ga4_property = admin_service.properties().create(body={
                'parent': account_name,
                'displayName': 'Gay Mens Field Guide',
                'timeZone': 'America/New_York',
                'currencyCode': 'USD',
            }).execute()
            print(f"   ✅ Created property: {ga4_property['displayName']}")
        
        property_id = ga4_property['name'].split('/')[-1]
        
        # Get or create web data stream
        streams = admin_service.properties().dataStreams().list(
            parent=ga4_property['name']
        ).execute()
        
        web_stream = None
        for stream in streams.get('dataStreams', []):
            if stream.get('type') == 'WEB_DATA_STREAM':
                web_stream = stream
                break
        
        if not web_stream:
            print("   Creating web data stream...")
            web_stream = admin_service.properties().dataStreams().create(
                parent=ga4_property['name'],
                body={
                    'type': 'WEB_DATA_STREAM',
                    'webStreamData': {
                        'defaultUri': SITE_URL
                    },
                    'displayName': 'gaymensfieldguide.com'
                }
            ).execute()
        
        measurement_id = web_stream.get('webStreamData', {}).get('measurementId')
        
        if measurement_id:
            print(f"\n   🎯 MEASUREMENT ID: {measurement_id}")
            return measurement_id
        else:
            print("   ⚠️ Could not get Measurement ID")
            return None
            
    except Exception as e:
        print(f"   ⚠️ Analytics error: {e}")
        return None

def update_env_file(measurement_id):
    """Update .env with the GA4 Measurement ID."""
    if not measurement_id:
        return
    
    env_file = OAUTH_DIR.parent / '.env.local'
    
    # Read existing
    env_content = ""
    if env_file.exists():
        env_content = env_file.read_text()
    
    # Update or add GA ID
    if 'NEXT_PUBLIC_GOOGLE_ANALYTICS' in env_content:
        lines = env_content.split('\n')
        lines = [f'NEXT_PUBLIC_GOOGLE_ANALYTICS={measurement_id}' if l.startswith('NEXT_PUBLIC_GOOGLE_ANALYTICS') else l for l in lines]
        env_content = '\n'.join(lines)
    else:
        env_content += f'\nNEXT_PUBLIC_GOOGLE_ANALYTICS={measurement_id}\n'
    
    env_file.write_text(env_content)
    print(f"\n✅ Updated .env.local with GA4 ID: {measurement_id}")

def main():
    print("=" * 60)
    print("GMFG Google Services Setup")
    print("=" * 60)
    print(f"Site: {SITE_URL}")
    print(f"OAuth Client: {CLIENT_SECRETS}")
    print()
    
    # Authenticate
    creds = get_credentials()
    
    # Setup services
    setup_search_console(creds)
    measurement_id = setup_analytics(creds)
    
    # Update env
    if measurement_id:
        update_env_file(measurement_id)
        print("\n" + "=" * 60)
        print("✅ SETUP COMPLETE!")
        print("=" * 60)
        print(f"GA4 Measurement ID: {measurement_id}")
        print(f"Search Console: {SITE_URL}")
        print("\nNext: Run 'npx vercel --prod' to deploy with analytics")
    else:
        print("\n⚠️ Manual setup may be required.")
        print("Visit: https://analytics.google.com")

if __name__ == "__main__":
    main()
