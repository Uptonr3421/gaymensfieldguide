import os
import google.auth
from googleapiclient.discovery import build

def list_ga_properties():
    try:
        creds, project = google.auth.default(
            scopes=['https://www.googleapis.com/auth/analytics.readonly']
        )
        
        # Build the Analytics Admin API service
        service = build('analyticsadmin', 'v1beta', credentials=creds)
        
        # List accounts first
        accounts = service.accounts().list().execute()
        
        if 'accounts' not in accounts:
            print("No GA4 accounts found for this service account.")
            return
            
        for account in accounts.get('accounts', []):
            account_name = account['name']
            print(f"Account: {account['displayName']} ({account_name})")
            
            # List properties for each account
            properties = service.properties().list(filter=f"parent:{account_name}").execute()
            
            for prop in properties.get('properties', []):
                print(f"  Property: {prop['displayName']}")
                print(f"  Property ID: {prop['name']}")
                
                # Get data streams to find the Measurement ID
                streams = service.properties().dataStreams().list(parent=prop['name']).execute()
                
                for stream in streams.get('dataStreams', []):
                    if stream.get('webStreamData'):
                        measurement_id = stream['webStreamData'].get('measurementId')
                        print(f"  >>> MEASUREMENT ID: {measurement_id}")
                        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    list_ga_properties()
