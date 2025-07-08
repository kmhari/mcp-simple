<div align="center">
  <img src="assets/header.svg" alt="DocuMind MCP Server" width="800">

  <div align="center">
    <a href="README.md"><img src="https://img.shields.io/badge/english-document-blue.svg" alt="EN doc"></a>
    <a href="README.ja.md"><img src="https://img.shields.io/badge/ドキュメント-日本語-blue.svg" alt="JA doc"/></a>
  </div>
</div>

# 🌐 DocuMind MCP Server

> _"Where Documentation Meets Digital Intelligence"_

A next-generation Model Context Protocol (MCP) server that revolutionizes documentation quality analysis through advanced neural processing.

## ⚡ Core Systems

- 🧠 **Neural Documentation Analysis**: Advanced algorithms for comprehensive README evaluation
- 🔮 **Holographic Header Scanning**: Cutting-edge SVG analysis for visual elements
- 🌍 **Multi-dimensional Language Support**: Cross-linguistic documentation verification
- 💫 **Quantum Suggestion Engine**: AI-powered improvement recommendations

## 🚀 System Boot Sequence

### System Requirements

- Node.js 18+
- npm || yarn

### Initialize Core

```bash
npm install
```

### Compile Matrix

```bash
npm run build
```

### Neural Development Link

Establish real-time neural connection:
```bash
npm run watch
```

## 🛸 Operation Protocol

### System Configuration

Integrate with Claude Desktop mainframe:

**Windows Terminal**:
```json
// %APPDATA%/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "documind-mcp-server": {
      "command": "/path/to/documind-mcp-server/build/index.js"
    }
  }
}
```

### Neural Interface Commands

#### evaluate_readme
Initiates quantum analysis of documentation structure.

Parameters:
- `projectPath`: Neural pathway to target directory

Example Request:
```javascript
{
  name: "evaluate_readme",
  arguments: {
    projectPath: "/path/to/project"
  }
}
```

Example Response:
```javascript
{
  content: [
    {
      type: "text",
      text: JSON.stringify({
        filePath: "/path/to/project/README.md",
        hasHeaderImage: true,
        headerImageQuality: {
          hasGradient: true,
          hasAnimation: true,
          // ... other quality metrics
        },
        score: 95,
        suggestions: [
          "Consider adding language badges",
          // ... other suggestions
        ]
      })
    }
  ]
}
```

## 🔮 Development Matrix

### Debug Protocol

Access the neural network through MCP Inspector:

```bash
npm run inspector
```

### Troubleshooting Guide

#### Common Issues and Solutions

1. **Header Image Not Detected**
   - Ensure SVG file is placed in the `assets/` directory
   - Validate SVG file contains proper XML structure
   - Check file permissions

2. **Language Badges Not Recognized**
   - Verify badges use shields.io format
   - Check HTML structure follows recommended pattern
   - Ensure proper center alignment

3. **Build Errors**
   - Clear `node_modules` and reinstall dependencies
   - Ensure TypeScript version matches project requirements
   - Check for syntax errors in modified files

4. **MCP Connection Issues**
   - Verify stdio transport configuration
   - Check Claude Desktop configuration
   - Ensure proper file paths in config

#### Performance Optimization

1. **SVG Analysis**
   - Minimize SVG complexity for faster parsing
   - Use efficient gradients and animations
   - Optimize file size while maintaining quality

2. **README Scanning**
   - Structure content for optimal parsing
   - Use recommended markdown patterns
   - Follow badge placement guidelines

## 🔬 API Documentation

### Core Classes

#### ReadmeService

Primary service for README analysis and evaluation.

```typescript
class ReadmeService {
  // Analyzes all README files in a project
  async evaluateAllReadmes(projectPath: string): Promise<ReadmeEvaluation[]>
  
  // Evaluates a single README file
  private async evaluateReadme(dirPath: string, readmePath: string): Promise<ReadmeEvaluation>
  
  // Evaluates language badge configuration
  private evaluateLanguageBadges(content: string): BadgeEvaluation
}
```

#### SVGService

Specialized service for SVG header image analysis.

```typescript
class SVGService {
  // Evaluates SVG header image quality
  public evaluateHeaderImageQuality(imgSrc: string, content: string): HeaderImageQuality
  
  // Checks for project-specific elements in SVG
  private checkProjectSpecificImage(svgContent: string, readmeContent: string): boolean
}
```

### Core Interfaces

```typescript
interface ReadmeEvaluation {
  filePath: string;
  hasHeaderImage: boolean;
  headerImageQuality: HeaderImageQuality;
  isCentered: {
    headerImage: boolean;
    title: boolean;
    badges: boolean;
  };
  hasBadges: {
    english: boolean;
    japanese: boolean;
    isCentered: boolean;
    hasCorrectFormat: boolean;
  };
  score: number;
  suggestions: string[];
}

interface HeaderImageQuality {
  hasGradient: boolean;
  hasAnimation: boolean;
  hasRoundedCorners: boolean;
  hasEnglishText: boolean;
  isProjectSpecific: boolean;
}
```

### Error Handling

The server implements comprehensive error handling:

```typescript
try {
  const evaluations = await readmeService.evaluateAllReadmes(projectPath);
  // Process results
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return {
    content: [{
      type: 'text',
      text: `Evaluation error: ${errorMessage}`
    }],
    isError: true
  };
}
```

## ⚡ License

Operating under MIT Protocol.
