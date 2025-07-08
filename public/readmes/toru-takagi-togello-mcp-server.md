# Togello MCP Server

This server implements the Model Context Protocol (MCP) for managing context in applications.

https://togello.com/sign

## Using npm

```
{
  "mcpServers": {
    "togello": {
      "command": "npx",
      "args": ["-y", "togello-mcp-server"],
      "env": {
        "TOGELLO_API_TOKEN": "replace_with_your_token",
      }
    }
  }
}
```

## Features

### Resources

- category-list: タスクのカテゴリー一覧を提供します。URI: `togello://category-list`
- activity-item-list: アクティビティ項目の一覧を提供します。URI: `togello://activity-item-list`

### Tools

- get-tasks-list: TODO 機能で未完了のタスクを取得します。タスク UUID / タスク名 / 予定開始日時 / 予定終了日時 / 優先度 / カテゴリ を認識できます。
- create-task: TODO 機能で新しいタスクを作成します。タスク名（taskName）を指定する必要があります。カテゴリー UUID（categoryUUID）、予定開始日時（scheduledStartDate）、URL（url）もオプションで指定できます。
- update-task: TODO 機能でタスクを更新します。タスクの完了状態を更新できます。get-tasks-list で取得したタスク UUID を指定する必要があります。
- get-todo-category-list: TODO 機能からカテゴリーリストを取得します。カテゴリー名 / カテゴリー UUID を認識できます。
- get-today-calendar: 連携している Google カレンダーの昨日/今日/明日の予定を取得します。予定名 / 開始日時 / 終了日時 を認識できます。
- get-activity-item-list: 統合機能からアクティビティ項目のリストを取得します。アクティビティ項目 UUID / 項目名 を認識できます。
- get-activity-log-list: 統合機能からアクティビティログのリストを取得します。すべてのログの終了日時が入力されている場合、現在何も実行していないことを意味します。終了日時が null のものがある場合（最大で 1 つ）、現在その活動を実行中であることを意味します。アクティビティログ UUID / 開始日時 / 終了日時 / 項目名 を認識できます。
- start-activity-log: アクティビティログを開始します。`get-activity-item-list` で取得した項目名（`activityItemName`）を指定する必要があります。`get-activity-log-list` で取得したログリストの全ての `endDateTime` に値がある場合（現在実行中のアクティビティがない場合）に呼び出すことができます。
- complete-activity-log: アクティビティログを完了します。`get-activity-log-list` で取得した、現在実行中のアクティビティログの UUID（`activityLogUUID`）を指定する必要があります。
- get-japan-current-time: Returns the current time in Japan (JST). No parameters are required.

## MCP Review

Certified  
https://mcpreview.com/mcp-servers/toru-takagi/togello-mcp-server  


## publish

```
npm run build
npm version patch
npm publish --access public
```
