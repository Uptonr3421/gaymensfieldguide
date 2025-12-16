import asyncio
import json
import os
import sys
import time
from asyncio import Semaphore

# Configuration
TOPICS_FILE = "pipe/topics_missing.json"
MAX_CONCURRENT = 5 # Avoid hitting rate limits too hard, even with billing
VIBE_SCANNER_SCRIPT = "pipe/vibe_scanner.py"

async def run_scanner(topic, semaphore):
    async with semaphore:
        print(f"🚀 IGNITION: '{topic}'")
        cmd = [sys.executable, VIBE_SCANNER_SCRIPT, topic]
        
        start_time = time.time()
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        
        stdout, stderr = await process.communicate()
        duration = time.time() - start_time
        
        if process.returncode == 0:
            print(f"✅ COMPLETED: '{topic}' in {duration:.2f}s")
            return {"topic": topic, "status": "success", "duration": duration}
        else:
            print(f"❌ FAILED: '{topic}'")
            print(stderr.decode())
            return {"topic": topic, "status": "failed", "error": stderr.decode()}

async def main():
    print("🏭 THE FACTORY: SPINNING UP MASS PRODUCTION LINES...")
    
    # Load Topics
    if not os.path.exists(TOPICS_FILE):
        print(f"❌ ERROR: {TOPICS_FILE} not found.")
        return
        
    with open(TOPICS_FILE, "r") as f:
        topics = json.load(f)
        
    print(f"📦 LOADED: {len(topics)} Topics")
    print(f"⚙️  CONCURRENCY: {MAX_CONCURRENT} Threads")
    
    semaphore = Semaphore(MAX_CONCURRENT)
    tasks = [run_scanner(topic, semaphore) for topic in topics]
    
    # Execute batch
    start_total = time.time()
    results = await asyncio.gather(*tasks)
    total_duration = time.time() - start_total
    
    # Stats
    success_count = sum(1 for r in results if r["status"] == "success")
    failed_count = len(results) - success_count
    
    print("\n" + "="*60)
    print("FACTORY REPORT")
    print("="*60)
    print(f"⏱️  Total Time: {total_duration:.2f}s")
    print(f"✅ Produced: {success_count}")
    print(f"❌ Failed: {failed_count}")
    print("="*60)

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    asyncio.run(main())
