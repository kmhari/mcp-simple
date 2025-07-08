# Metricool MCP Server

This is a Model Context Protocol (MCP) server for interacting with the Metricool API. It allows AI agents to access and analyze social media metrics, campaign data and schedule posts to your Metricool account.

## Setup

### Prerequisites
MCP is still very new and evolving, we recommend following the [MCP documentation](https://modelcontextprotocol.io/quickstart#prerequisites) to get the MCP basics up and running.

- Python 3.8 or higher
- [A Metricool account with API access (Advanced Tier)](https://metricool.com)
- [Claude Desktop](https://claude.ai/) (or Cursor, or any MCP Client)
- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- [git](https://git-scm.com/downloads/)

### Configuration
1. Configure Claude Desktop
Create the following file depending on your OS:

On MacOS: ~/Library/Application Support/Claude/claude_desktop_config.json

On Windows: %APPDATA%/Claude/claude_desktop_config.json

Paste this template in the file and replace <METRICOOL_USER_TOKEN> and <METRICOOL_USER_ID> with your Metricool API and ID information:

```json
{
    "mcpServers": {
        "mcp-metricool": {
            "command": "uvx",
            "args": [
                "--upgrade",
                "mcp-metricool"
            ],
            "env": {
                "METRICOOL_USER_TOKEN": "<METRICOOL_USER_TOKEN>",
                "METRICOOL_USER_ID": "<METRICOOL_USER_ID>"
            }
        }
    }
}
```

## Tools
The server implements several tools to interact with the Metricool API:

1. `get_brands()`
   - Get the list of brands from your Metricool account. Simplified tool for auxiliar usage in other tools.

2. `get_brands_complete()`
   - Get the list of brands from your Metricool account with all the available information for each brand.

3. `get_instagram_reels(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Instagram Reels from your Metricool account.

4. `get_instagram_posts(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Instagram Posts from your Metricool account.

5. `get_instagram_stories(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Instagram Stories from your Metricool account.

6. `get_tiktok_videos(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Tiktok Videos from your Metricool account.

7. `get_facebook_reels(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Facebook Reels from your Metricool account.

8. `get_facebook_posts(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Facebook Posts from your Metricool brand account.

9. `get_facebook_stories(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Facebook Stories from your Metricool brand account.

10. `get_thread_posts(init_date: str, end_date: str, blog_id: int)`
   - Get the list of Threads Posts from your Metricool brand account.

11. `get_x_posts(init_date: str, end_date: str, blog_id: int)`
    - Get the list of X (Twitter) Posts from your Metricool account.

12. `get_bluesky_posts(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Bluesky Posts from your Metricool brand account.

13. `get_linkedin_posts(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Linkedin Posts from your Metricool brand account.

14. `get_pinterest_pins(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Pinterest Pins from your Metricool brand account.

15. `get_youtube_videos(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Youtube Videos from your Metricool brand account.

16. `get_twitch_videos(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Twitch Videos from your Metricool account.

17. `get_facebookads_campaigns(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Facebook Ads Campaigns from your Metricool account.

18. `get_googleads_campaigns(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Google Ads Campaigns from your Metricool account.

19. `get_tiktokads_campaigns(init_date: str, end_date: str, blog_id: int)`
    - Get the list of Tiktok Ads Campaigns from your Metricool brand account.

20. `get_network_competitors`
    - Get the list of competitors from your Metricool brand account (Instagram, Facebook, X, Bluesky, Youtube and Twitch).

21. `get_network_competitors_posts`
    - Get and analyze the posts of competitors from your Metricool brand account (Instagram, Facebook, X, Bluesky, Youtube and Twitch).
    
22. `post_schedule_post`
    - Schedule a post (o multipost) to your brands in Metricool

23. `get_scheduled_posts`
    - Get the scheduled posts from your Metricool brand account.

24. `get_best_time_to_post`
    - Get the best time to post for a specific social network. Return days and hours with the value. Higher value better hour/day to post

25. `update_schedule_post`
    - Update the scheduled post in the same conversation or a previously scheduled post.

26. `get_metrics`
    - Get the available metrics to obtain analysis from a specific social network.

27. `get_analytics`
    - Get the analytics from a specific social network of your Metricool brand account.
