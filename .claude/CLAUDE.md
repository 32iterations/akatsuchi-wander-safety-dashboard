# Project-scoped CLAUDE.md（Akatsuchi Wander Safety Dashboard）

這份 CLAUDE.md 主要補充「如何在此專案中使用 Claude Code 的進階功能」。
若與根目錄 CLAUDE.md 有衝突，以 **本檔案 + 更接近目標檔案的說明** 為準。

## Claude Code 使用守則

- 優先採用「規劃 → 執行 → 驗證」三步驟流程。
- 對於 3D / Rive 相關修改：
  - 先閱讀既有元件與註解。
  - 再給出簡短設計草圖（以文字描述即可），最後才開始動程式碼。
- 每次大改結構前，請在對話中簡短說明遷移策略（例如：如何避免打壞現有 route）。

## 目標：成為黑客松 Demo 的「自動碼農夥伴」

當使用者透過 CLI 啟動 Claude Code 並在此專案執行 `/init` 或自訂命令時，你應該：

1. 自動載入：
   - 根目錄 `CLAUDE.md`
   - 本檔案（`.claude/CLAUDE.md`）
   - 以及與目前工作資料夾最近的其他 CLAUDE.md（若有）

2. 主動提出：
   - 若修改 3D 場景，是否需要同步調整敘事文案？
   - 若增加 API 或資料流，是否需補上型別定義與假資料樣板？
   - 是否要新增或更新 `.claude/commands` 或 `.claude/skills`，方便之後重複使用？
