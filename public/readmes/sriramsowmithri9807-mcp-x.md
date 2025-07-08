# MCP_X
# X(Formely Twitter) MCP Server

A Model Context Protocol (MCP) server implementation that provides seamless integration with Twitter/X API, allowing AI models to interact with Twitter functionalities through a standardized interface.

![MCP Server](https://your-image-url-here.png)

## 🌟 Features

- **Tweet Management**
  - Create and post tweets
  - Reply to existing tweets
  - Like and retweet functionality
  - Thread viewing capabilities

- **Data Retrieval**
  - Fetch tweet details
  - Search functionality
  - Thread reconstruction
  - Metrics tracking (likes, retweets)

- **Security**
  - Environment-based configuration
  - Secure credential management
  - Error handling and validation

## 📋 Prerequisites

- Python 3.10 or higher
- MCP CLI (`mcp[cli]`)
- Twitter Developer Account with API credentials
- Virtual environment management tool (venv)
- Tweepy library

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://your-repository-url.git
   cd twitter-mcp-server
   ```

2. **Create and activate virtual environment**
   ```bash
   python3.10 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install "mcp[cli]" tweepy python-dotenv
   ```

4. **Configure environment variables**
   Create a `.env` file in the project root:
   ```env
   TWITTER_API_KEY=your_api_key_here
   TWITTER_API_SECRET=your_api_secret_here
   TWITTER_ACCESS_TOKEN=your_access_token_here
   TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret_here
   ```

5. **Install the MCP server**
   ```bash
   mcp install main.py
   ```

## 🛠️ Configuration

### MCP Server Configuration
Create or update your MCP configuration file:

For Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "twitter": {
      "command": "python",
      "args": ["path/to/main.py"],
      "env": {
        "PYTHONPATH": "path/to/project"
      }
    }
  }
}
```

## 🔧 Available Tools

### 1. Post Tweet
```python
post_tweet(content: str) -> Dict
```
Posts a new tweet to your account.
- **Parameters:**
  - `content`: Tweet text (max 280 characters)
- **Returns:**
  - Success response with tweet ID and content
  - Error response if validation fails

### 2. Reply to Tweet
```python
reply_to_tweet(tweet_id: str, content: str) -> Dict
```
Creates a reply to an existing tweet.
- **Parameters:**
  - `tweet_id`: ID of the tweet to reply to
  - `content`: Reply text (max 280 characters)

### 3. Get Tweet
```python
get_tweet(tweet_id: str) -> Dict
```
Retrieves details of a specific tweet.
- **Parameters:**
  - `tweet_id`: ID of the tweet to fetch
- **Returns:**
  - Tweet details including metrics

### 4. Like Tweet
```python
like_tweet(tweet_id: str) -> Dict
```
Likes a specific tweet.
- **Parameters:**
  - `tweet_id`: ID of the tweet to like

### 5. Retweet
```python
retweet(tweet_id: str) -> Dict
```
Retweets a specific tweet.
- **Parameters:**
  - `tweet_id`: ID of the tweet to retweet

### 6. Get Tweet Thread
```python
get_tweet_thread(tweet_id: str) -> dict
```
Retrieves a complete thread starting from a tweet.
- **Parameters:**
  - `tweet_id`: ID of the thread's root tweet

### 7. Search Tweets
```python
search_tweets(query: str) -> List[dict]
```
Searches for tweets containing specific text.
- **Parameters:**
  - `query`: Search query string

## 📝 Usage Examples

### Basic Tweet
```python
response = post_tweet("Hello from Twitter MCP Server!")
print(response)
```

### Reply to Tweet
```python
response = reply_to_tweet("1234567890", "This is a reply!")
print(response)
```

### View Thread
```python
thread = get_tweet_thread("1234567890")
print(thread)
```

## 🔒 Security

- Never commit `.env` file to version control
- Regularly rotate API credentials
- Monitor API usage and rate limits
- Validate input data before making API calls

## 🐛 Debugging

1. **Check MCP Server Logs**
   ```bash
   tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
   ```

2. **Enable Developer Tools**
   ```bash
   echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
   ```

3. **Test Server Connection**
   ```bash
   mcp dev main.py
   ```

## 📊 Rate Limits

Twitter API has rate limits that vary by endpoint:
- Tweet creation: 200 per 15 minutes
- Likes: 1000 per 24 hours
- Retweets: 1000 per 24 hours

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Twitter API Documentation
- MCP Protocol Specification
- Tweepy Library Documentation
- Claude Desktop Development Team

## 📞 Support

For support, please:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

## 🔄 Version History

- 1.0.0
  - Initial release
  - Basic Twitter functionality
  - MCP integration

## 🚧 Roadmap

- [ ] Media attachment support
- [ ] Direct message functionality
- [ ] Advanced search options
- [ ] Analytics integration
- [ ] Batch operations
- [ ] Rate limit handling

## ⚠️ Important Notes

- Keep API credentials secure
- Monitor rate limits
- Test thoroughly before production use
- Keep dependencies updated
