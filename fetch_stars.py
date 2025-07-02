#!/usr/bin/env python3
import json
import re
import time
from typing import List, Dict, Optional
import requests
from datetime import datetime

def parse_github_url(url: str) -> Optional[tuple[str, str]]:
    pattern = r"https://github\.com/([^/]+)/([^/\s.]+)"
    match = re.match(pattern, url)
    if match:
        owner, repo = match.groups()
        repo = repo.replace('.git', '')
        return owner, repo
    return None

def fetch_github_stars(owner: str, repo: str, token: Optional[str] = None) -> Optional[int]:
    headers = {
        'Accept': 'application/vnd.github.v3+json'
    }
    if token:
        headers['Authorization'] = f'token {token}'
    
    try:
        response = requests.get(
            f'https://api.github.com/repos/{owner}/{repo}', 
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            return response.json().get('stargazers_count', 0)
        elif response.status_code == 403:
            print(f"⚠️  Rate limit hit for {owner}/{repo}")
            return None
        elif response.status_code == 404:
            print(f"❌ Repository not found: {owner}/{repo}")
            return -1
        else:
            print(f"❌ Error {response.status_code} for {owner}/{repo}")
            return -1
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed for {owner}/{repo}: {e}")
        return -1

def main():
    print("📚 Loading repository list...")
    
    with open('gitlist.json', 'r') as f:
        urls = json.load(f)
    
    print(f"📊 Found {len(urls)} repositories to process")
    
    results = []
    processed = 0
    errors = 0
    rate_limited = 0
    
    github_token = None
    
    # Add environment variable check
    import os
    if 'GITHUB_TOKEN' in os.environ:
        github_token = os.environ['GITHUB_TOKEN']
        print("✅ Using GitHub token from environment variable")
    
    print("\n🚀 Fetching star counts...")
    print("-" * 50)
    
    for i, url in enumerate(urls, 1):
        parsed = parse_github_url(url)
        
        if not parsed:
            print(f"❌ [{i}/{len(urls)}] Invalid URL: {url}")
            errors += 1
            continue
        
        owner, repo = parsed
        print(f"⭐ [{i}/{len(urls)}] Fetching {owner}/{repo}...", end='', flush=True)
        
        stars = fetch_github_stars(owner, repo, github_token)
        
        if stars is None:
            rate_limited += 1
            print(f"\n⏸️  Waiting 60 seconds due to rate limit...")
            time.sleep(60)
            stars = fetch_github_stars(owner, repo, github_token)
        
        if stars == -1:
            errors += 1
            results.append({
                'url': url,
                'owner': owner,
                'repo': repo,
                'stars': 0,
                'error': True
            })
        elif stars is not None:
            processed += 1
            results.append({
                'url': url,
                'owner': owner,
                'repo': repo,
                'stars': stars,
                'error': False
            })
            print(f" ✓ {stars:,} stars")
        else:
            # Rate limit hit but couldn't recover
            errors += 1
            results.append({
                'url': url,
                'owner': owner,
                'repo': repo,
                'stars': 0,
                'error': True
            })
            print(" ❌ Rate limit persists")
        
        time.sleep(0.1)
    
    output_data = {
        'generated_at': datetime.now().isoformat(),
        'total_repos': len(urls),
        'successfully_processed': processed,
        'errors': errors,
        'repositories': sorted(results, key=lambda x: x['stars'], reverse=True)
    }
    
    print("\n" + "-" * 50)
    print(f"✅ Successfully processed: {processed}")
    print(f"❌ Errors encountered: {errors}")
    print(f"⏸️  Rate limit hits: {rate_limited}")
    
    with open('github_stars.json', 'w') as f:
        json.dump(output_data, f, indent=2)
    
    print(f"\n💾 Results saved to github_stars.json")
    print(f"🏆 Top 5 repositories by stars:")
    for i, repo in enumerate(output_data['repositories'][:5], 1):
        if not repo['error']:
            print(f"   {i}. {repo['owner']}/{repo['repo']}: {repo['stars']:,} stars")

if __name__ == '__main__':
    main()