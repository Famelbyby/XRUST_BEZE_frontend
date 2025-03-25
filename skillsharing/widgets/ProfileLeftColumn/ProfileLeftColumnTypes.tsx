export interface StatisticItem {
    title: string,
    userKey: "rate" | "helps" | "rating",
}

type SkillLevel = "beginner" | "intermediate" | "advanced";
export type CommunicationFormat = "voice" | "text" | "video";

export interface Skill {
    name: string,
    level: SkillLevel,
    description: string,
}