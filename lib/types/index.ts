/**
 * Core type definitions for Akatsuchi Wander Safety Dashboard
 *
 * Following principles:
 * - Single source of truth for data models
 * - Easy to extend for real API integration
 * - Strict TypeScript typing (no any)
 */

// ============================================================================
// Risk & Alert Types
// ============================================================================

export type RiskLevel = "low" | "medium" | "high";

export interface WanderingAlert {
  id: string;
  residentId: string;
  residentName: string;
  timestamp: Date;
  riskLevel: RiskLevel;
  location: Location3D;
  zoneId: string;
  reason: string; // e.g., "repeated_pacing", "exit_attempt", "nighttime_wandering"
  actions: AlertAction[];
}

export interface AlertAction {
  timestamp: Date;
  actor: string; // staff name or "system"
  action: "acknowledged" | "dispatched" | "resolved" | "escalated";
  note?: string;
}

// ============================================================================
// Location & Zone Types
// ============================================================================

export interface Location3D {
  x: number;
  y: number;
  z: number;
  floor?: number;
}

export interface Zone {
  id: string;
  label: string;
  type: "daycare" | "garden" | "activity_hall" | "corridor" | "exit" | "nursing_station";
  riskLevel: RiskLevel;
  boundaries: Location3D[]; // polygon points
  capacity: number;
  currentOccupancy: number;
}

// ============================================================================
// Resident Movement Types
// ============================================================================

export interface ResidentPosition {
  residentId: string;
  timestamp: Date;
  location: Location3D;
  zoneId: string;
}

export interface MovementPath {
  residentId: string;
  residentName: string;
  startTime: Date;
  endTime: Date;
  waypoints: ResidentPosition[];
  totalDistance: number; // meters
  zoneTransitions: number;
}

// ============================================================================
// Wandering Event Types
// ============================================================================

export interface WanderingEvent {
  id: string;
  residentId: string;
  residentName: string;
  startTime: Date;
  endTime?: Date; // null if ongoing
  riskLevel: RiskLevel;
  triggers: WanderingTrigger[];
  path: MovementPath;
  resolution?: EventResolution;
}

export interface WanderingTrigger {
  type: "repeated_pacing" | "exit_attempt" | "nighttime_activity" | "zone_violation";
  timestamp: Date;
  details: {
    count?: number; // for repeated actions
    zone?: string;
    duration?: number; // minutes
  };
}

export interface EventResolution {
  timestamp: Date;
  method: "staff_intervention" | "self_resolved" | "family_contacted";
  staffName?: string;
  outcome: "returned_to_room" | "joined_activity" | "family_pickup";
  notes?: string;
}

// ============================================================================
// Analytics & Statistics Types
// ============================================================================

export interface OccupancyStats {
  zoneId: string;
  zoneLabel: string;
  current: number;
  capacity: number;
  utilizationRate: number; // 0-1
  riskLevel: RiskLevel;
  timestamp: Date;
}

export interface DailyWanderingStats {
  date: string; // ISO date
  totalEvents: number;
  byRiskLevel: {
    low: number;
    medium: number;
    high: number;
  };
  averageDuration: number; // minutes
  peakHours: number[]; // hours of day (0-23)
}

// ============================================================================
// UI State Types
// ============================================================================

export interface DashboardState {
  selectedResident?: string;
  selectedEvent?: string;
  timeRange: TimeRange;
  playbackSpeed: number; // for event replay
  is3DViewActive: boolean;
}

export interface TimeRange {
  start: Date;
  end: Date;
}
