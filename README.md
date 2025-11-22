# Akatsuchi Wander Safety Dashboard
## 赤土崎多功能館 · 失智症徘徊預警 3D 系統

> **3D 數位分身 + 即時風險可視化** — 讓照護團隊在徘徊前就看見異常

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19_RC-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R169-yellow)](https://threejs.org/)

---

## 📋 專案簡介

本專案為新竹政策黑客松參賽作品，旨在為失智症照護機構（如赤土崎多功能館）提供：

1. **3D 館內數位分身** - 即時可視化長輩位置與移動路徑
2. **徘徊風險預警** - 根據行為模式提前偵測異常
3. **事件回放與分析** - 完整記錄徘徊歷程，協助改善照護流程
4. **空間使用率監控** - 優化動線設計與人力配置

### 核心價值

- **從被動應對到主動預防** - 不是等長輩走失才去找，而是在徘徊前就發現異常
- **視覺化決策支持** - 3D 場景讓照護團隊快速理解狀況
- **持續改善循環** - 透過事件回放找出環境或流程的改善空間

---

## 🎯 主要功能

### 1. 主展示頁 (`/`)
- **3D 館內場景** - React Three Fiber 打造的互動式 3D 環境
  - 可旋轉、縮放查看不同角度
  - 長輩移動路徑即時顯示（橘色光點）
  - 區域標籤與高風險區標記
- **即時風險指標** - Rive 動畫（含 fallback）呈現風險等級
- **空間使用率** - 各區域人數與容量即時監控

### 2. 管理端頁面 (`/admin`)
- **規則設定** - 可調整徘徊觸發條件
- **事件回放** - 3D 動線重現 + 時間軸
- **空間熱度分析** - 協助調整環境與活動安排

---

## 🛠 技術棧

### 前端
- **Next.js 16** (App Router) - 伺服器端渲染與靜態生成
- **React 19 RC** - 最新 React 特性
- **TypeScript 5.7** - 嚴格型別檢查
- **Tailwind CSS 4** - 原子化 CSS（透過 PostCSS plugin）

### 3D & 動畫
- **React Three Fiber** - React 化的 Three.js
- **@react-three/drei** - Three.js 輔助元件庫
- **Rive** - 高效能向量動畫（附 CSS fallback）

### 測試
- **Playwright** - 端對端測試
- **TypeScript** - 編譯時型別檢查

---

## 🚀 快速開始

### 前置需求
- Node.js 18.x 或更高版本
- npm 或 pnpm

### 安裝

```bash
# 安裝依賴（需要 --legacy-peer-deps 因為 React 19 RC）
npm install --legacy-peer-deps

# 啟動開發伺服器
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000`

### 其他指令

```bash
# 建置生產版本
npm run build

# 啟動生產伺服器
npm run start

# 執行 Lint 檢查
npm run lint

# 執行 E2E 測試
npm run test:e2e

# 執行 E2E 測試（UI 模式）
npm run test:e2e:ui
```

---

## 📁 專案結構

```
akatsuchi-wander-safety-dashboard/
├── app/                      # Next.js App Router 頁面
│   ├── page.tsx             # 主展示頁
│   ├── admin/page.tsx       # 管理端頁面
│   ├── layout.tsx           # 全域 layout
│   └── globals.css          # 全域樣式
│
├── components/              # React 元件
│   ├── scene/              # 3D 場景相關
│   │   ├── DigitalTwinCanvas.tsx    # 主 3D 畫布
│   │   ├── ZoneLabel.tsx            # 區域標籤
│   │   └── HighRiskMarker.tsx       # 高風險區標記
│   ├── rive/               # Rive 動畫相關
│   │   ├── WanderingRiskRive.tsx    # 風險指標
│   │   └── RiskIndicatorFallback.tsx # Fallback 動畫
│   ├── replay/             # 事件回放相關
│   │   ├── EventTimeline.tsx        # 時間軸
│   │   └── PlaybackControls.tsx     # 播放控制
│   ├── charts/             # 圖表元件
│   │   └── OccupancyMiniChart.tsx   # 空間使用率
│   └── ui/                 # 基礎 UI 元件
│       ├── card.tsx
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/                    # 共用邏輯
│   ├── types/             # TypeScript 型別定義
│   │   └── index.ts
│   ├── data/              # Demo 假資料
│   │   ├── occupancy-demo.ts
│   │   └── wandering-events.ts
│   ├── api/               # 資料抽象層
│   │   └── telemetry.ts
│   └── utils.ts           # 工具函式
│
├── tests/                 # 測試檔案
│   └── e2e/              # Playwright E2E 測試
│       ├── main-dashboard.spec.ts
│       └── admin-page.spec.ts
│
├── public/               # 靜態資源
│   └── rive/            # Rive 動畫檔案目錄
│
├── .claude/             # AI 輔助開發設定
├── DEMO_SCRIPT.md       # Demo 簡報腳本
└── README.md            # 本檔案
```

---

## 🎨 設計原則

### 1. **評審導向**
- 一眼就懂：視覺對比強烈，關鍵資訊突出
- 故事完整：從問題 → 解決方案 → 成效清晰可見
- 互動友善：3D 可旋轉、時間軸可回放

### 2. **照護價值優先**
- 不炫技：每個功能都對應實際照護需求
- 可解釋：所有判定規則都有清楚說明
- 可調整：規則與閾值可由專業團隊調整

### 3. **技術可行性**
- 模組化：資料層 / 元件層 / 頁面層分離
- 型別安全：全面使用 TypeScript strict mode
- 可擴充：預留接入真實感測器的接口

---

## 🔌 資料整合

### 目前狀態（Demo）
使用假資料模擬即時感測器輸入：
- `lib/data/occupancy-demo.ts` - 空間使用率
- `lib/data/wandering-events.ts` - 徘徊事件

### 未來整合路徑
資料抽象層 (`lib/api/telemetry.ts`) 已預留接口：

```typescript
// 替換為真實 API 呼叫
export async function fetchCurrentOccupancy() {
  // 目前：return demoOccupancy;
  // 未來：return fetch('/api/occupancy/current').then(r => r.json());
}
```

建議的後端架構：
- **MQTT Broker** - 接收 UWB / BLE 定位系統即時資料
- **WebSocket** - 推送即時警示到前端
- **PostgreSQL / TimescaleDB** - 儲存歷史事件與路徑
- **機器學習模型** - 預測徘徊風險分數

---

## 🧪 測試

### E2E 測試（Playwright）

```bash
# 執行所有測試
npm run test:e2e

# 互動式 UI 模式
npm run test:e2e:ui

# 顯示瀏覽器視窗
npm run test:e2e:headed
```

測試覆蓋：
- ✅ 主頁所有元件正常載入
- ✅ 3D 場景可互動
- ✅ 導航功能正常
- ✅ 響應式設計（手機 / 桌面）
- ✅ 管理端頁面功能

---

## 🎯 Demo 建議

1. **硬體準備**
   - 使用大螢幕或投影機
   - 確保網路連線穩定
   - 備用平板以防萬一

2. **瀏覽器建議**
   - Chrome 或 Edge（最佳 3D 效能）
   - 開啟硬體加速

3. **Demo 流程**
   - 參考 `DEMO_SCRIPT.md` 的 3 分鐘腳本
   - 先展示主頁（問題 + 解決方案）
   - 再展示管理端（深度功能）
   - 最後總結技術與價值

---

## 🚧 已知限制與未來改進

### 目前限制
- [ ] Rive 動畫檔案尚未整合（使用 CSS fallback）
- [ ] 3D 場景為示意模型，非真實平面圖
- [ ] 假資料模擬，無真實感測器連接

### 未來改進
- [ ] 整合真實 UWB / BLE 定位系統
- [ ] 加入機器學習行為預測模型
- [ ] 支援多樓層 3D 場景
- [ ] 增加更多視覺化圖表（熱力圖、趨勢圖）
- [ ] 建立手機 App（照護人員即時通知）

---

## 📄 授權

本專案為新竹政策黑客松參賽作品，程式碼採用 **MIT License**。

---

## 👥 團隊

- **開發者** - [團隊名稱]
- **指導單位** - 新竹市政府
- **技術協力** - [如有]

---

## 🙏 致謝

- **新竹市政府** - 提供黑客松平台
- **赤土崎多功能館** - 場域合作與需求訪談
- **照護專業團隊** - 徘徊行為模式指導

---

## 📞 聯絡方式

如有任何問題或建議，歡迎透過以下方式聯繫：
- GitHub Issues
- Email: [專案信箱]

---

**讓科技為長輩創造更安全、更有尊嚴的生活環境** 💙
