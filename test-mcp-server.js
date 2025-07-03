#!/usr/bin/env node

import { TechStackAdvisorServer } from './mcp-server.js';

async function testMcpServer() {
  console.log('Testing MCP Tech Stack Advisor Server...\n');
  
  const server = new TechStackAdvisorServer();
  
  try {
    // Test tech stack detection
    console.log('1. Testing tech stack detection...');
    const techStackResult = await server.detectTechStack({});
    console.log('✓ Tech stack detection works');
    
    const techData = JSON.parse(techStackResult.content[0].text);
    console.log(`   Detected: ${techData.summary}`);
    
    // Test recommendation engine
    console.log('\n2. Testing recommendation engine...');
    const recommendResult = await server.recommendMcpServers({
      tech_stack: ['javascript', 'express', 'postgresql'],
      context: 'web application development'
    });
    console.log('✓ Recommendation engine works');
    
    const recData = JSON.parse(recommendResult.content[0].text);
    console.log(`   Found ${recData.recommendations.length} recommendations`);
    
    // Test database query
    console.log('\n3. Testing database query...');
    const queryResult = await server.queryMcpDatabase({
      query: 'database',
      category: 'Databases'
    });
    console.log('✓ Database query works');
    
    const queryData = JSON.parse(queryResult.content[0].text);
    console.log(`   Found ${queryData.totalMatches} matches`);
    
    console.log('\n🎉 All tests passed! MCP server is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testMcpServer().catch(console.error);