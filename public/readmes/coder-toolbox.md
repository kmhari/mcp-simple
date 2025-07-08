# Coder Toolbox MCP Server

A utility toolkit designed to enhance the interaction between Claude and code, providing seamless integration tools for code analysis, manipulation, and testing workflows.

## Features

### Implemented
- Test Execution Logs: Retrieve and analyze test execution logs and results
- Class Operations:
  - Location: Find Java classes in project source code with package filtering
  - Creation: Create new Java classes with proper package structure 
  - Content Management: Add, replace or delete content in existing Java classes
  - Method Management: Add or delete methods in Java classes
  - Constructor Management: Add or delete constructors in Java classes

## Tools

### get_test_execution_logs
Retrieve test execution logs from the log directory

### locate_java_class
- Parameters:
  - `className` (string): Name of the java class to find (case sensitive)
  - `sourceType` (string, optional): Source type to restrict the search ('source' or 'test')
  - `packagePath` (string, optional): Package path to restrict search (e.g. 'com.myself.myproject'). If specified, sourceType must also be specified
- Returns: JSON object with search results including file path and content if found

### create_java_class  
- Parameters:
  - `className` (string): Name of the java class to create (case sensitive)
  - `sourceType` (string): The source type where to create the file ('source' or 'test')
  - `packagePath` (string): Package path where to create the class (e.g. 'com.myself.myproject')
- Returns: JSON object with creation results including file path or error message

### class_add_body
- Parameters:
  - Parameters from locate_java_class, plus:
  - `classBody` (string): The class body content to add (fields, methods, constructors, etc.)
- Returns: JSON object with modification results including file path

### class_replace_body
- Parameters:
  - Parameters from locate_java_class, plus:  
  - `edits`: Array of edit operations, each containing:
    - `oldText` (string): Text to replace
    - `newText` (string): New text
  - `dryRun` (boolean, optional): Preview changes without applying them
- Returns: Diff showing the changes made or preview

### class_delete_body
- Parameters:
  - Parameters from locate_java_class, plus:
  - `targetContent` (string): The content to delete from the class body
  - `dryRun` (boolean, optional): Preview changes without applying them
- Returns: Diff showing the changes made or preview

## Development Roadmap
- [x] Test execution log retrieval
- [x] Class location and navigation 
- [x] Class file creation
- [x] Add content to class
- [x] Replace content in class
- [x] Delete content from class
- [ ] Add class-level annotations
- [ ] Add interface implementations
- [ ] Add class inheritance
- [ ] Organize imports
- [ ] Format code

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.