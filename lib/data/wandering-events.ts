import type { WanderingEvent, MovementPath, ResidentPosition } from "@/lib/types";

/**
 * Simulated wandering event for demo purposes
 *
 * This represents a high-risk wandering incident that occurred in the morning.
 * Shows the complete timeline: detection → alert → staff intervention → resolution
 *
 * In production, this would come from:
 * - Real-time location tracking system
 * - Behavioral pattern analysis ML model
 * - Historical event database
 */

// Helper function to create timestamps relative to demo time
const createDemoTime = (hoursAgo: number, minutesOffset: number = 0): Date => {
  const now = new Date();
  const demoDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0);
  demoDate.setHours(demoDate.getHours() - hoursAgo);
  demoDate.setMinutes(demoDate.getMinutes() + minutesOffset);
  return demoDate;
};

// Movement waypoints for the wandering path
const createWaypoints = (): ResidentPosition[] => {
  const baseTime = createDemoTime(0, 0);

  return [
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime()),
      location: { x: -3.5, y: -0.3, z: -2.0 },
      zoneId: "memory-lane"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 1 * 60 * 1000),
      location: { x: -2.0, y: -0.3, z: -1.0 },
      zoneId: "memory-lane"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 2 * 60 * 1000),
      location: { x: -1.0, y: -0.3, z: 0.0 },
      zoneId: "corridor"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 3 * 60 * 1000),
      location: { x: -2.0, y: -0.3, z: -1.0 },
      zoneId: "memory-lane"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 4 * 60 * 1000),
      location: { x: -1.0, y: -0.3, z: 0.0 },
      zoneId: "corridor"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 5 * 60 * 1000),
      location: { x: 0.0, y: -0.3, z: 0.5 },
      zoneId: "corridor"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 6 * 60 * 1000),
      location: { x: 2.0, y: -0.3, z: 1.0 },
      zoneId: "activity-hall"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 8 * 60 * 1000),
      location: { x: 3.0, y: -0.3, z: 2.0 },
      zoneId: "exit-zone"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 9 * 60 * 1000),
      location: { x: 4.0, y: -0.3, z: 2.5 },
      zoneId: "exit-zone"
    },
    {
      residentId: "resident-001",
      timestamp: new Date(baseTime.getTime() + 12 * 60 * 1000),
      location: { x: 2.0, y: -0.3, z: 1.0 },
      zoneId: "activity-hall"
    }
  ];
};

const movementPath: MovementPath = {
  residentId: "resident-001",
  residentName: "王奶奶",
  startTime: createDemoTime(0, 0),
  endTime: createDemoTime(0, 25),
  waypoints: createWaypoints(),
  totalDistance: 45.2,
  zoneTransitions: 6
};

export const demoWanderingEvent: WanderingEvent = {
  id: "event-20241123-001",
  residentId: "resident-001",
  residentName: "王奶奶",
  startTime: createDemoTime(0, 0),
  endTime: createDemoTime(0, 25),
  riskLevel: "high",
  triggers: [
    {
      type: "repeated_pacing",
      timestamp: createDemoTime(0, 3),
      details: {
        count: 8,
        zone: "memory-lane",
        duration: 5
      }
    },
    {
      type: "exit_attempt",
      timestamp: createDemoTime(0, 8),
      details: {
        count: 1,
        zone: "exit-zone"
      }
    },
    {
      type: "exit_attempt",
      timestamp: createDemoTime(0, 12),
      details: {
        count: 2,
        zone: "exit-zone"
      }
    },
    {
      type: "exit_attempt",
      timestamp: createDemoTime(0, 15),
      details: {
        count: 3,
        zone: "exit-zone"
      }
    }
  ],
  path: movementPath,
  resolution: {
    timestamp: createDemoTime(0, 25),
    method: "staff_intervention",
    staffName: "林護理師",
    outcome: "joined_activity",
    notes: "陪同長輩參加上午的音樂活動，情緒穩定後返回日照區。"
  }
};

/**
 * Additional events for history/timeline view
 */
export const demoEventHistory: WanderingEvent[] = [
  demoWanderingEvent,
  {
    id: "event-20241122-003",
    residentId: "resident-002",
    residentName: "張爺爺",
    startTime: createDemoTime(24, -180), // Yesterday, 7:00 PM
    endTime: createDemoTime(24, -150),
    riskLevel: "medium",
    triggers: [
      {
        type: "nighttime_activity",
        timestamp: createDemoTime(24, -180),
        details: {
          duration: 30
        }
      }
    ],
    path: {
      residentId: "resident-002",
      residentName: "張爺爺",
      startTime: createDemoTime(24, -180),
      endTime: createDemoTime(24, -150),
      waypoints: [],
      totalDistance: 12.3,
      zoneTransitions: 2
    },
    resolution: {
      timestamp: createDemoTime(24, -150),
      method: "staff_intervention",
      staffName: "陳照服員",
      outcome: "returned_to_room",
      notes: "夜間離床，陪同如廁後返回房間休息。"
    }
  },
  {
    id: "event-20241122-001",
    residentId: "resident-001",
    residentName: "王奶奶",
    startTime: createDemoTime(24, -240), // Yesterday, 6:00 PM
    endTime: createDemoTime(24, -225),
    riskLevel: "low",
    triggers: [
      {
        type: "repeated_pacing",
        timestamp: createDemoTime(24, -240),
        details: {
          count: 4,
          zone: "garden",
          duration: 10
        }
      }
    ],
    path: {
      residentId: "resident-001",
      residentName: "王奶奶",
      startTime: createDemoTime(24, -240),
      endTime: createDemoTime(24, -225),
      waypoints: [],
      totalDistance: 8.5,
      zoneTransitions: 1
    },
    resolution: {
      timestamp: createDemoTime(24, -225),
      method: "self_resolved",
      outcome: "joined_activity",
      notes: "自行參加感官花園的園藝活動。"
    }
  }
];
