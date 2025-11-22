你現在要把 demo 從假資料升級為可接近實際部署的版本。

1. 閱讀 `lib/data/occupancy-demo.ts` 與所有使用該假資料的元件。
2. 設計一層乾淨的資料存取抽象，例如：`lib/api/telemetry.ts`，定義：
   - 取得即時空間使用率
   - 取得最近 N 分鐘的徘徊事件列表
3. 先只用 `fetch("/api/mock")` 或本地 JSON 檔模擬，保留日後接上真實 MQTT / WebSocket 的空間。
4. 產出 TypeScript 型別，確保前端所有元件都透過型別對齊。
5. 完成後，簡單說明未來要接真實後端時需要改哪些檔案。
