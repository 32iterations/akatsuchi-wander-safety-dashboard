export type ZoneOccupancy = {
  id: string;
  label: string;
  current: number;
  capacity: number;
  riskLevel: "low" | "medium" | "high";
};

export const demoOccupancy: ZoneOccupancy[] = [
  {
    id: "memory-lane",
    label: "記憶小徑（日照區）",
    current: 7,
    capacity: 10,
    riskLevel: "medium"
  },
  {
    id: "garden",
    label: "感官花園",
    current: 3,
    capacity: 8,
    riskLevel: "low"
  },
  {
    id: "activity-hall",
    label: "共融活動大廳",
    current: 12,
    capacity: 15,
    riskLevel: "high"
  }
];
