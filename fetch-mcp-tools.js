#!/usr/bin/env node

const https = require('https');

async function fetchTools(offset = 0, limit = 1000) {
  const data = JSON.stringify({
    p_category_slug: null,
    p_offset: offset,
    p_limit: limit,
    p_type: "server"
  });

  const options = {
    hostname: 'wulqksgnqhecytjqllyw.supabase.co',
    port: 443,
    path: '/rest/v1/rpc/filter_tools_production',
    method: 'POST',
    headers: {
      'accept': '*/*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bHFrc2ducWhlY3l0anFsbHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTQyMzQsImV4cCI6MjA1ODI5MDIzNH0.wNKfhgboViKNBWDr1AFsguh8y5hL0tXFH6oaUI5BMS0',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bHFrc2ducWhlY3l0anFsbHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTQyMzQsImV4cCI6MjA1ODI5MDIzNH0.wNKfhgboViKNBWDr1AFsguh8y5hL0tXFH6oaUI5BMS0',
      'content-profile': 'public',
      'content-type': 'application/json',
      'origin': 'https://mcpmarket.com',
      'priority': 'u=1, i',
      'referer': 'https://mcpmarket.com/',
      'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'x-client-info': 'software-tools-directory-browser',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function fetchAllTools() {
  const allTools = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  console.log('Fetching MCP tools from MCP Market...\n');

  while (hasMore) {
    try {
      console.log(`Fetching tools ${offset + 1} to ${offset + limit}...`);
      const response = await fetchTools(offset, limit);
      
      if (response && Array.isArray(response)) {
        // Extract tool_data from each item
        const tools = response.map(item => item.tool_data);
        allTools.push(...tools);
        console.log(`  → Retrieved ${response.length} tools`);
        
        // Check total count if available
        if (response.length > 0 && response[0].total_count) {
          console.log(`  → Total available: ${response[0].total_count}`);
        }
        
        // If we got fewer than the limit, we've reached the end
        if (response.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      } else {
        console.log('  → No more tools found');
        hasMore = false;
      }
    } catch (error) {
      console.error('Error fetching tools:', error.message);
      hasMore = false;
    }
  }

  console.log(`\nTotal tools fetched: ${allTools.length}`);
  
  // Save to file
  const fs = require('fs');
  const outputFile = 'mcp-tools.json';
  
  fs.writeFileSync(outputFile, JSON.stringify(allTools, null, 2));
  console.log(`\nTools saved to ${outputFile}`);
  
  // Display summary
  if (allTools.length > 0) {
    console.log('\nSummary:');
    console.log(`- Total servers: ${allTools.length}`);
    
    // Count by category
    const categories = {};
    allTools.forEach(tool => {
      const category = tool.category || 'Uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    console.log('\nBy category:');
    Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .forEach(([category, count]) => {
        console.log(`  - ${category}: ${count}`);
      });
  }
}

// Run the script
fetchAllTools().catch(console.error);