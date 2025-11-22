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

      <section>
        <Card>
          <CardHeader>
            <CardTitle>事件回放 · 縱覽長輩一整天的動線</CardTitle>
            <CardDescription>
              這裡示意未來可以把時間軸拉寬到一整天，從 2D 列表跳回 3D 場景，協助跨專業團隊共同檢視。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <DigitalTwinCanvas />
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="rounded-full bg-slate-800/80 px-2 py-1">
                10:10 · A 區走廊徘徊（黃燈）
              </span>
              <span className="rounded-full bg-slate-800/80 px-2 py-1">
                10:22 · 嘗試開啟大門（紅燈）
              </span>
              <span className="rounded-full bg-slate-800/80 px-2 py-1">
                10:25 · 照護人員陪同回房（綠燈）
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
