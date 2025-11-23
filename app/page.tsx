"use client";

import { useState } from "react";
import { Activity, AlertTriangle, TrendingUp, Users, MapPin, Play, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DigitalTwinCanvas } from "@/components/scene/DigitalTwinCanvas";
import { SimpleTest3D } from "@/components/scene/SimpleTest3D";
import { EscapeScenario } from "@/components/scene/EscapeScenario";
import { WanderingRiskRive } from "@/components/rive/WanderingRiskRive";
import { OccupancyMiniChart } from "@/components/charts/OccupancyMiniChart";
import { AIAssistant } from "@/components/ai/AIAssistant";
import Link from "next/link";

export default function Page() {
  const [showEscapeDemo, setShowEscapeDemo] = useState(false);

  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-8">
        {/* Header - Simplified */}
        <header className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black tracking-tight text-neutral-900">
                徘徊預警監控系統
              </h1>
              <Badge variant="success" className="gap-1.5 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-success-500 animate-pulse" />
                即時監控中
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-base text-neutral-700 font-medium">
              <MapPin className="h-5 w-5" />
              <span>新竹市赤土崎多功能館</span>
              <span className="text-neutral-400">|</span>
              <span className="text-neutral-600">上次更新：剛剛</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="md">
              <Link href="/admin">管理介面</Link>
            </Button>
            <Button
              size="md"
              onClick={() => setShowEscapeDemo(true)}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              播放逃脫場景
            </Button>
          </div>
        </header>

        {/* Risk Alert Banner */}
        <div className="rounded-xl border-l-4 border-danger-500 bg-danger-50 p-4 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger-500">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-danger-900">高風險徘徊警報</h3>
              <p className="mt-2 text-base font-medium text-danger-800">
                A 區日照空間偵測到異常徘徊行為：來回走動 8 次，嘗試走向出口 3 次
              </p>
            </div>
            <Badge variant="danger">高風險</Badge>
          </div>
        </div>

        {/* Main Grid - 3 Columns */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Left - 3D Visualization (2 columns width) */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100">
                    <Activity className="h-4 w-4 text-primary-600" />
                  </div>
                  3D 館內即時位置
                </CardTitle>
                <Badge variant="outline">Live</Badge>
              </CardHeader>
              <CardContent>
                <DigitalTwinCanvas />
              </CardContent>
            </Card>

            {/* Space Utilization */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-100">
                    <TrendingUp className="h-4 w-4 text-success-600" />
                  </div>
                  空間使用率
                </CardTitle>
                <div className="flex items-center gap-2 text-base font-semibold text-neutral-700">
                  <Users className="h-5 w-5" />
                  <span>22 / 33 人</span>
                </div>
              </CardHeader>
              <CardContent>
                <OccupancyMiniChart />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Risk & Stats */}
          <div className="space-y-6">
            {/* Risk Indicator */}
            <Card className="border-danger-200 bg-gradient-to-br from-white to-danger-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-danger-900">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-500">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  徘徊風險指數
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <WanderingRiskRive />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-neutral-800">風險評分</span>
                    <span className="font-black text-danger-700 text-2xl">87 <span className="text-base font-medium text-neutral-700">/ 100</span></span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-200">
                    <div className="h-2 w-[87%] rounded-full bg-danger-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>今日統計</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-neutral-700">總警報次數</span>
                    <span className="text-2xl font-bold text-neutral-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-neutral-700">平均停留時間</span>
                    <span className="text-2xl font-bold text-neutral-900">4.2 <span className="text-lg text-neutral-700">小時</span></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-neutral-700">異常行為偵測</span>
                    <span className="text-2xl font-bold text-warning-700">5 <span className="text-lg text-neutral-700">次</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle>最近事件</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="flex h-3 w-3 mt-1 rounded-full bg-danger-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-base font-semibold text-neutral-900">高風險徘徊</p>
                      <p className="text-sm font-medium text-neutral-600">A 區 · 2 分鐘前</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-3 w-3 mt-1 rounded-full bg-warning-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-base font-semibold text-neutral-900">離開監控區</p>
                      <p className="text-sm font-medium text-neutral-600">B 區 · 15 分鐘前</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-3 w-3 mt-1 rounded-full bg-success-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-base font-semibold text-neutral-900">正常活動</p>
                      <p className="text-sm font-medium text-neutral-600">中央走廊 · 32 分鐘前</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Escape Scenario Modal */}
      {showEscapeDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative h-[90vh] w-[95vw] max-w-7xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowEscapeDemo(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
            >
              <X className="h-5 w-5 text-neutral-700" />
            </button>

            {/* Title */}
            <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lg">
              <h2 className="text-lg font-bold text-neutral-900">逃脫場景動畫演示</h2>
              <p className="text-xs text-neutral-600">自動播放：老人走向出口 → 雷達偵測 → 警報 → 護理師趕來</p>
            </div>

            {/* Escape Scenario */}
            <EscapeScenario
              autoPlay={true}
              onScenarioEnd={() => {
                // 可以選擇自動關閉或重播
                // setShowEscapeDemo(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
