/**
 * Data abstraction layer for telemetry and sensor data
 *
 * Currently uses demo data, but structured to easily swap
 * with real API calls to:
 * - MQTT broker for real-time positioning
 * - REST API for historical data
 * - WebSocket for live updates
 *
 * Migration path to real backend:
 * 1. Replace fetchCurrentOccupancy with: fetch('/api/occupancy/current')
 * 2. Replace fetchWanderingEvents with: fetch('/api/events/wandering')
 * 3. Add WebSocket connection for real-time updates
 */

import type {
  OccupancyStats,
  WanderingEvent,
  ResidentPosition
} from "@/lib/types";
import { demoOccupancy } from "@/lib/data/occupancy-demo";
import { demoWanderingEvent, demoEventHistory } from "@/lib/data/wandering-events";

// ============================================================================
// Occupancy Data
// ============================================================================

/**
 * Get current space occupancy for all zones
 *
 * Production: GET /api/occupancy/current
 * Returns real-time headcount from indoor positioning system
 */
export async function fetchCurrentOccupancy(): Promise<OccupancyStats[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // TODO: Replace with real API call
  // const response = await fetch('/api/occupancy/current');
  // return response.json();

  return demoOccupancy;
}

/**
 * Get occupancy for a specific zone
 */
export async function fetchZoneOccupancy(zoneId: string): Promise<OccupancyStats | null> {
  const all = await fetchCurrentOccupancy();
  return all.find((zone) => zone.zoneId === zoneId) || null;
}

// ============================================================================
// Wandering Events
// ============================================================================

/**
 * Get recent wandering events
 *
 * Production: GET /api/events/wandering?limit=N&offset=M
 */
export async function fetchWanderingEvents(
  limit: number = 10,
  offset: number = 0
): Promise<WanderingEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  // TODO: Replace with real API call
  // const response = await fetch(`/api/events/wandering?limit=${limit}&offset=${offset}`);
  // return response.json();

  return demoEventHistory.slice(offset, offset + limit);
}

/**
 * Get a specific wandering event by ID
 */
export async function fetchWanderingEvent(eventId: string): Promise<WanderingEvent | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  // TODO: Replace with real API call
  // const response = await fetch(`/api/events/wandering/${eventId}`);
  // return response.json();

  return demoEventHistory.find((event) => event.id === eventId) || null;
}

/**
 * Get currently active (unresolved) wandering events
 */
export async function fetchActiveWanderingEvents(): Promise<WanderingEvent[]> {
  const allEvents = await fetchWanderingEvents(100);
  return allEvents.filter((event) => !event.endTime);
}

// ============================================================================
// Real-time Position Updates
// ============================================================================

/**
 * Get current position of a specific resident
 *
 * Production: WebSocket or Server-Sent Events
 */
export async function fetchResidentPosition(
  residentId: string
): Promise<ResidentPosition | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  // TODO: Replace with WebSocket subscription
  // const ws = new WebSocket('ws://api/positions/stream');
  // ws.send(JSON.stringify({ subscribe: residentId }));

  // For demo, return the latest position from wandering event
  const lastPosition = demoWanderingEvent.path.waypoints[
    demoWanderingEvent.path.waypoints.length - 1
  ];

  if (lastPosition.residentId === residentId) {
    return lastPosition;
  }

  return null;
}

// ============================================================================
// Future: Real-time subscription helpers
// ============================================================================

/**
 * Subscribe to occupancy updates (for future WebSocket implementation)
 *
 * Example usage:
 * ```ts
 * const unsubscribe = subscribeToOccupancy((stats) => {
 *   console.log('Occupancy updated:', stats);
 * });
 * ```
 */
export function subscribeToOccupancy(
  callback: (stats: OccupancyStats[]) => void
): () => void {
  // TODO: Implement WebSocket subscription
  // const ws = new WebSocket('ws://api/occupancy/stream');
  // ws.onmessage = (event) => callback(JSON.parse(event.data));
  // return () => ws.close();

  // For demo, poll every 5 seconds
  const interval = setInterval(async () => {
    const stats = await fetchCurrentOccupancy();
    callback(stats);
  }, 5000);

  return () => clearInterval(interval);
}

/**
 * Subscribe to wandering alerts (for future WebSocket implementation)
 */
export function subscribeToWanderingAlerts(
  callback: (event: WanderingEvent) => void
): () => void {
  // TODO: Implement WebSocket subscription for real-time alerts
  // const ws = new WebSocket('ws://api/events/wandering/stream');
  // ws.onmessage = (event) => callback(JSON.parse(event.data));
  // return () => ws.close();

  // For demo, this is a no-op
  return () => {};
}
