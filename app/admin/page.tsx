"use client";

import { ArrowLeft, Activity, Map } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OccupancyMiniChart } from "@/components/charts/OccupancyMiniChart";
import { DigitalTwinCanvas } from "@/components/scene/DigitalTwinCanvas";

export default function AdminPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300">
              <ArrowLeft className="h-3 w-3" />
              返回展示頁
            </Link>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
            管理端 Dashboard（照護團隊用）
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            本頁面示範：系統真正上線後，照護團隊可以如何設定「徘徊風險規則」、查看歷史事件，以及調整空間與人力配置。
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="h-3 w-3" />
          Prototype
        </Badge>
      </header>

      <section className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle>規則模擬：徘徊觸發條件</CardTitle>
              <CardDescription>
                僅為示意：實際規則需與職能治療師、醫師與家屬共同調整。
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-200">
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-amber-200">Rule #1：</span>
                同一走道來回超過 <span className="font-semibold">8 次 / 10 分鐘</span>，且沒有活動帶領。
              </li>
              <li>
                <span className="font-semibold text-amber-200">Rule #2：</span>
                夜間（22:00–05:00）離床後，連續走向出口或樓梯超過{" "}
                <span className="font-semibold">3 次 / 30 分鐘</span>。
              </li>
              <li>
                <span className="font-semibold text-amber-200">Rule #3：</span>
                進入「高風險區域」（如大門、停車場動線）時，若同時偵測到心率或步態明顯異常，提升為紅色警示。
              </li>
            </ul>
            <p className="text-[11px] text-slate-400">
              Hackathon Demo 中，我們會用假資料觸發上述規則，讓評審直接看到「從徘徊到警示」的完整動畫流程。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>空間熱度 &amp; 區域屬性</CardTitle>
              <CardDescription>
                可視化每個空間的「日常熱度」與「認知負荷」，協助調整動線與活動安排。
              </CardDescription>
            </div>
            <Map className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent className="space-y-3">
            <OccupancyMiniChart />
            <p className="text-[11px] text-slate-400">
              後續可以疊加：跌倒事件熱區、求助鈴位置、輪椅迴轉半徑等資訊，變成「護理站的戰情室地圖」。
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>事件回放 · 3D 動線可視化</CardTitle>
            <CardDescription>
              重現完整徘徊路徑，協助跨專業團隊分析行為模式與環境因素。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <DigitalTwinCanvas />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>事件時間軸 · 完整歷程記錄</CardTitle>
            <CardDescription>
              從徘徊偵測到工作人員介入，每個關鍵節點都有清楚紀錄。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for EventTimeline - will be integrated with real data */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <span>10:10 · 王奶奶開始在 A 區日照空間徘徊</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span>10:13 · 同一走道來回 8 次（觸發黃燈警示）</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span>10:18 · 嘗試走向出口（第 1 次）</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span>10:22 · 嘗試走向出口（第 3 次，升級紅燈）</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>10:25 · 林護理師介入 → 陪同參加音樂活動</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
