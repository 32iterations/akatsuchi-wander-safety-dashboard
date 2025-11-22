import type { OccupancyStats } from "@/lib/types";

/**
 * Demo data for space occupancy visualization
 *
 * In production, this would be replaced by real-time data from:
 * - Indoor positioning system (UWB/BLE beacons)
 * - Check-in/check-out logs
 * - Camera-based occupancy detection
 */
export const demoOccupancy: OccupancyStats[] = [
  {
    zoneId: "memory-lane",
    zoneLabel: "記憶小徑（日照區）",
    current: 7,
    capacity: 10,
    utilizationRate: 0.7,
    riskLevel: "medium",
    timestamp: new Date()
  },
  {
    zoneId: "garden",
    zoneLabel: "感官花園",
    current: 3,
    capacity: 8,
    utilizationRate: 0.375,
    riskLevel: "low",
    timestamp: new Date()
  },
  {
    zoneId: "activity-hall",
    zoneLabel: "共融活動大廳",
    current: 12,
    capacity: 15,
    utilizationRate: 0.8,
    riskLevel: "high",
    timestamp: new Date()
  }
];
