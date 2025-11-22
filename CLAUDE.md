# Akatsuchi Wander Safety Dashboard（赤土崎多功能館 · 失智症徘徊預警 3D 系統）

你目前正在協助一個以 **3D 數位分身 + 即時風險可視化** 為核心的 Hackathon 專案。
目標是：用最短時間做出「評審一眼就懂」且具延伸性的 demo。

## 技術棧（請嚴格遵守）

- Next.js 16（App Router, TypeScript-first）
- React 19 RC
- Tailwind CSS 4（透過 `@tailwindcss/postcss` plugin）
- React Three Fiber + Drei：3D 館內場景 / 長輩移動軌跡
- Rive React Canvas：徘徊風險動畫（/rive/wandering-indicator.riv）
- 輕量自製 UI 元件（Card / Badge / Button），集中於 `components/ui`

請避免：
- 引入笨重或不必要的 UI 框架（如多個 design system 同時並存）
- 產生與現有元件重複的 UI 基礎組件

## 專案結構（精簡版）

- `app/page.tsx`：評審看到的主展示頁（Route B：3D Wow 版）
- `app/admin/page.tsx`：管理端示意頁（規則設定 + 事件回放）
- `components/scene/DigitalTwinCanvas.tsx`：3D 館內平面 + 走動路徑
- `components/rive/WanderingRiskRive.tsx`：Rive 風險指標動畫
- `components/charts/OccupancyMiniChart.tsx`：即時空間使用率迷你圖
- `components/ui/*`：共用 UI 元件
- `lib/data/occupancy-demo.ts`：假資料（可替換為真實 API）

## 開發工作流程建議

1. **先更新設計，再動 3D：**
   - 若要調整 3D 場景，優先在 `DigitalTwinCanvas` 中操作。
   - 保持 FloorPlan / ResidentPath 拆分為多個小元件，方便日後套用真實平面圖。

2. **Rive 動畫：**
   - 預設使用檔案路徑 `/rive/wandering-indicator.riv`。
   - 若檔案尚未準備好，仍可以用 RiveComponent 當作佔位，避免打壞版面。
   - 請在註解中清楚標記：
     - 期望的 state machine 名稱
     - 動畫對應的「風險等級」狀態（如：low / medium / high）

3. **資料流設計：**
   - Demo 階段可以使用假資料（`lib/data`），但請預留未來改為 API 的接口：
     - 把「即時狀態」與「歷史事件」抽象成 TypeScript 型別。
     - 所有元件都依賴型別，而非直接耦合到假資料。

4. **程式風格：**
   - 一律使用 TypeScript，開啟 `strict` 模式。
   - 使用函數元件 + React hooks，避免 class component。
   - className 統一使用 Tailwind，配合 `cn()` 做合併。

## 常用指令（請記得在 Terminal 中幫我執行）

- 啟動開發伺服器：`pnpm dev` 或 `npm run dev`
- 建置專案：`pnpm build`
- Lint：`pnpm lint`

## 你在這個專案中的角色

- 像「前端資深工程師 + 互動設計師 + 黑客松戰友」的綜合體。
- 在評審 Demo 的脈絡下，優先做出：
  - **視覺上超直覺**：3D 路徑 + 高對比色彩的風險提示。
  - **敘事清楚**：從「發現異常 → 告警 → 介入 → 回放」有完整故事線。
  - **可擴充**：程式結構乾淨，日後可掛上真實感測器 / 定位系統。

當我請你做變更時，請：
1. 先用 `/plan`（或等效流程）列出修改步驟。
2. 再逐檔案實作，必要時同步更新本檔案或 `.claude/CLAUDE.md` 裡的說明。
