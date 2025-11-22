"use client";

import { Activity, AlertTriangle, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DigitalTwinCanvas } from "@/components/scene/DigitalTwinCanvas";
import { WanderingRiskRive } from "@/components/rive/WanderingRiskRive";
import { OccupancyMiniChart } from "@/components/charts/OccupancyMiniChart";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-[11px] font-medium text-amber-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>即時模擬 · Demo 用資料（可接入實際定位系統）</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
            赤土崎多功能館 · 失智症徘徊預警 3D Dashboard
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            透過 3D 館內數位分身，將長輩的移動軌跡、空間使用率與風險分級可視化。
            幫助照護團隊在「徘徊前」就看見異常，主動介入，而非事後補救。
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              新竹市 · 赤土崎多功能館（示意）
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span>Hackathon Demo · Route B：3D 可視化強化版</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">管理端 Dashboard</Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              // placeholder for future hook: trigger recording / story mode
            }}
          >
            一鍵播放「徘徊事件」動畫
          </Button>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.15fr)]">
        <div className="space-y-4">
          <Card className="border-slate-800 bg-slate-950/60">
            <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-slate-800/80">
              <div className="space-y-1">
                <CardTitle>館內 3D 數位分身</CardTitle>
                <CardDescription>
                  左側為平面 + 高度縮放的示意模型，橘色光點代表「失智長輩」目前位置與移動路徑。
                  緊急狀況下，照護人員可以直接指認「人在哪裡、在哪一個區域徘徊」。
                </CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                Live · Demo
              </Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <DigitalTwinCanvas />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle>即時徘徊風險</CardTitle>
                <CardDescription>
                  由感測器 / 定位系統輸入，透過行為特徵（來回走動、夜間離床時間、走向出口）綜合計算風險分數。
                </CardDescription>
              </div>
              <Badge variant="danger" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                高風險徘徊中
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <WanderingRiskRive />
              <p className="text-xs text-slate-300 leading-relaxed">
                目前系統偵測到：
                <span className="font-semibold text-amber-200"> A 區日照空間 </span>
                有一位長輩在同一走道來回超過 8 次，且過去 10 分鐘內嘗試走向出口 3 次。
                右上角動畫用顏色與律動強調風險等級，評審與照護人員可以一眼看出狀態。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>館內空間使用率（即時截圖）</CardTitle>
              <CardDescription>
                透過進出紀錄與定位點，估算各區域目前人數與容量比，協助排班與動線設計。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OccupancyMiniChart />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
