# mcp-excel-controller-pro

# ExcelController

ExcelController는 **Model Context Protocol (MCP) 서버**로, Excel 파일을 읽고, 쓰고, 수정할 수 있게 해주는 도구입니다.  
Node.js 환경에서 실행되며 강력한 Excel 파일 조작 기능을 제공합니다.

---

## ✨ Features (English)

- 📄 **Excel file reading**: Read Excel file contents using the `read_excel` tool
- ✍️ **Excel bulk data update**: Update large datasets in open or closed Excel files with the `bulk_update_excel` tool
- 📂 **Excel file opening**: Open files with the Excel application
- 📑 **Sheet management**: Add (`add_sheet`), rename (`rename_sheet`), or delete (`delete_sheet`) sheets
- 🔍 **Open file management**: List currently open Excel files (`list_open_excel_files`) and close them (`close_excel_file`)
- 🔧 **Open file handling**: Modify Excel files even while open via COM interface
- 📋 **Backup functionality**: Optional automatic backup creation before file modifications

---

## ✨ 주요 기능 (한국어)

- 📄 **엑셀 파일 읽기**: `read_excel` 도구로 특정 경로의 엑셀 파일 내용 읽기
- ✍️ **엑셀 파일 대량 데이터 업데이트**: `bulk_update_excel` 도구로 열려있거나 닫혀있는 Excel 파일에 데이터 일괄 업데이트
- 📂 **엑셀 파일 열기**: 프로그램에서 Excel 애플리케이션으로 파일 실행
- 📑 **시트 관리**: 시트 추가(`add_sheet`), 이름 변경(`rename_sheet`), 삭제(`delete_sheet`) 기능
- 🔍 **열린 파일 관리**: 현재 PC에서 열려있는 Excel 파일 목록 조회(`list_open_excel_files`)와 닫기(`close_excel_file`)
- 🔧 **열린 파일 처리**: Excel에서 열려있는 파일도 COM 인터페이스를 통해 수정 가능
- 📋 **백업 기능**: 파일 수정 전 자동 백업 생성 옵션 제공

---

## 📦 설치

### 요구사항

- 시스템에 Microsoft Excel이 설치되어 있어야 합니다

### MCP 설정에 추가

MCP 설정 파일에 다음을 추가하세요:

```json
{
  "mcpServers": {
    "excel-controller": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-excel-controller-pro",
        "C:\\Users\\user\\Desktop"
      ]
    }
  }
}