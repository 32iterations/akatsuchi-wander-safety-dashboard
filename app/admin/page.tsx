"use client";

import { ArrowLeft, Settings, Shield, Clock, Map, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OccupancyMiniChart } from "@/components/charts/OccupancyMiniChart";
import { DigitalTwinCanvas } from "@/components/scene/DigitalTwinCanvas";
import { AIAssistant } from "@/components/ai/AIAssistant";

export default function AdminPage() {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              返回主控台
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black tracking-tight text-neutral-900">
                管理介面
              </h1>
              <Badge variant="outline">管理員</Badge>
            </div>
            <p className="text-base font-medium text-neutral-700">
              配置系統參數、管理警報規則、分析歷史數據
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="md">
              匯出報表
            </Button>
            <Button size="md">
              儲存設定
            </Button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-neutral-700">今日警報</p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900">3</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-100">
                  <AlertCircle className="h-6 w-6 text-danger-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-neutral-700">平均響應時間</p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900">2.3<span className="text-lg font-medium text-neutral-700">分</span></p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
                  <Clock className="h-6 w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-neutral-700">啟用規則</p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900">5</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-medium text-neutral-700">監控區域</p>
                  <p className="mt-2 text-3xl font-bold text-neutral-900">3</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-100">
                  <Map className="h-6 w-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Rules & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alert Rules */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100">
                    <Settings className="h-4 w-4 text-primary-600" />
                  </div>
                  警報觸發規則
                </CardTitle>
                <Button variant="outline" size="sm">
                  新增規則
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Rule 1 */}
                  <div className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning-100 text-base font-bold text-warning-700">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-neutral-900">重複徘徊偵測</h4>
                      <p className="mt-1.5 text-base font-medium text-neutral-700">
                        同一區域來回超過 <span className="font-bold text-warning-700">8 次 / 10 分鐘</span>
                      </p>
                    </div>
                    <Badge variant="warning">啟用</Badge>
                  </div>

                  {/* Rule 2 */}
                  <div className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-100 text-base font-bold text-danger-700">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-neutral-900">夜間離床警報</h4>
                      <p className="mt-1.5 text-base font-medium text-neutral-700">
                        22:00-05:00 走向出口超過 <span className="font-bold text-danger-700">3 次 / 30 分鐘</span>
                      </p>
                    </div>
                    <Badge variant="danger">啟用</Badge>
                  </div>

                  {/* Rule 3 */}
                  <div className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-100 text-base font-bold text-danger-700">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-neutral-900">高風險區域進入</h4>
                      <p className="mt-1.5 text-base font-medium text-neutral-700">
                        進入大門、停車場且偵測到<span className="font-bold text-danger-700">異常步態</span>
                      </p>
                    </div>
                    <Badge variant="danger">啟用</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Replay */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-100">
                    <Map className="h-4 w-4 text-success-600" />
                  </div>
                  事件回放 · 3D 路徑重建
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DigitalTwinCanvas />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analytics */}
          <div className="space-y-6">
            {/* Space Usage */}
            <Card>
              <CardHeader>
                <CardTitle>空間使用分析</CardTitle>
              </CardHeader>
              <CardContent>
                <OccupancyMiniChart />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>最近事件時間軸</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-100 text-sm font-bold text-danger-700">
                      10:22
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-neutral-900">高風險警報</p>
                        <Badge variant="danger">規則 #2</Badge>
                      </div>
                      <p className="text-sm font-medium text-neutral-700">王奶奶嘗試走向出口（第3次）</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning-100 text-sm font-bold text-warning-700">
                      10:13
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-neutral-900">異常徘徊</p>
                        <Badge variant="warning">規則 #1</Badge>
                      </div>
                      <p className="text-sm font-medium text-neutral-700">A區日照空間來回8次</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-100 text-sm font-bold text-success-700">
                      10:10
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <p className="text-base font-bold text-neutral-900">開始監控</p>
                      <p className="text-sm font-medium text-neutral-700">王奶奶進入A區日照空間</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-100 text-sm font-bold text-success-700">
                      10:25
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <p className="text-base font-bold text-neutral-900">成功介入</p>
                      <p className="text-sm font-medium text-neutral-700">林護理師陪同參加音樂活動</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>系統狀態</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-neutral-700">定位系統</span>
                  <Badge variant="success">正常</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-neutral-700">AI 分析引擎</span>
                  <Badge variant="success">正常</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-neutral-700">資料庫連線</span>
                  <Badge variant="success">正常</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-neutral-700">通知服務</span>
                  <Badge variant="success">正常</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant />
    </>
  );
}
