const fs = require('fs');
const path = require('path');

const offsetDir = 'data/mcps_data';
const files = fs.readdirSync(offsetDir).filter(f => f.endsWith('.json'));

let totalLogos = 0;
let totalServers = 0;
let serversWithLogos = [];
let uniqueLogos = new Set();

files.forEach(file => {
  console.log(`Processing ${file}...`);
  const data = JSON.parse(fs.readFileSync(path.join(offsetDir, file), 'utf8'));
  totalServers += data.length;
  
  data.forEach(server => {
    if (server.logo && server.logo.trim() !== '') {
      totalLogos++;
      uniqueLogos.add(server.logo);
      serversWithLogos.push({
        name: server.name,
        logo: server.logo,
        link: server.link
      });
    }
  });
});

console.log('\n=== LOGO ANALYSIS ===');
console.log('Total servers in offset files:', totalServers);
console.log('Total servers with logos:', totalLogos);
console.log('Unique logo URLs:', uniqueLogos.size);
console.log('Percentage with logos:', (totalLogos/totalServers*100).toFixed(1) + '%');

// Show some example servers with logos
console.log('\n=== SAMPLE SERVERS WITH LOGOS ===');
serversWithLogos.slice(0, 10).forEach(server => {
  console.log(`${server.name}: ${server.logo}`);
});

// Now check our database
console.log('\n=== DATABASE ANALYSIS ===');
const databasePath = 'mcp-servers-database.json';
if (fs.existsSync(databasePath)) {
  const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
  const dbServers = Object.keys(database).length;
  let dbLogos = 0;
  
  Object.values(database).forEach(server => {
    if (server.logo && server.logo.trim() !== '') {
      dbLogos++;
    }
  });
  
  console.log('Total servers in database:', dbServers);
  console.log('Total logos in database:', dbLogos);
  console.log('Missing logos:', totalLogos - dbLogos);
}