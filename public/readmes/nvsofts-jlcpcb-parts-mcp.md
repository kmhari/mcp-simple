# JLCPCB Parts MCP Server

## ����͉�

JLCPCB��PCBA�����́A���i�T����⏕����MCP�T�[�o�[�ł��B

## ��b��

Basic Parts�ɕ��ނ���Ă���A�t�F���C�g�r�[�Y������������ł��B
![��b��](images/sample_conversation.png)

�܂��A�ȉ��̃y�[�W�ł͍~���^DC-DC�R���o�[�^�̒�R�l�̑I����s���Ă��܂��B
https://claude.ai/share/9f02f1a4-7b38-48fb-b29a-f10cf1e608ba

## �ݒ�

�f�[�^�x�[�X�Ƃ��āA[JLC PCB SMD Assembly Component Catalogue](https://github.com/yaqwsx/jlcparts)���g�p���Ă��܂��B
�����ŕ���ZIP�ɂ��Ē񋟂���Ă��� `cache.sqlite3` ���K�v�ł��B2025�N4�����݁A�ԍ��� `cache.z19` �܂ő��݂��܂��B

Python��MCP�����p�\�Ȋ������A�T�[�o�[�Ƃ��� `server.py` ���w�肵�Ă��������B
�܂��A�f�[�^�x�[�X�ւ̃p�X�� `JLCPCB_DB_PATH` ���ϐ��֐ݒ肷��K�v������܂��B

Claude Desktop�ł̐ݒ����ȉ��Ɏ����܂��B

```json
{
  "mcpServers": {
    "JLCPCB parts": {
      "command": "python",
      "args": [
        "path/to/server.py"
      ],
      "env": {
        "JLCPCB_DB_PATH": "path/to/database.sqlite3"
      }
    }
  }
}
```
