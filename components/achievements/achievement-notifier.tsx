"use client";

import { useEffect, useRef } from "react";
import { useAchievementsStore } from "@/lib/stores/achievements-store";
import { useUiStore } from "@/lib/stores/ui-store";
import { useProgressStore } from "@/lib/stores/progress-store";

export function AchievementNotifier() {
  const achievements = useAchievementsStore((s) => s.achievements);
  const unlockAchievement = useAchievementsStore((s) => s.unlockAchievement);
  const streakDays = useAchievementsStore((s) => s.streakDays);
  const toast = useUiStore((s) => s.toast);
  
  // Keep track of what we've already toasted during this session
  const prevCount = useRef(achievements.length);
  const prevList = useRef(new Set(achievements.map((a) => a.id)));

  const completed = useProgressStore((s) => s.completed);

  // Listen to global progress to trigger achievements
  useEffect(() => {
    const count = completed.length;
    
    if (count >= 1) unlockAchievement("first_step", "First Step", "Complete your first roadmap topic");
    if (count >= 10) unlockAchievement("getting_serious", "Getting Serious", "Complete 10 roadmap topics");
    if (count >= 50) unlockAchievement("half_century", "Half Century", "Complete 50 roadmap topics");
    
    if (streakDays >= 3) unlockAchievement("streak_3", "On a Roll", "Maintain a 3-day learning streak");
    if (streakDays >= 7) unlockAchievement("streak_7", "Unstoppable", "Maintain a 7-day learning streak");
  }, [streakDays, completed.length, unlockAchievement]);

  useEffect(() => {
    if (achievements.length > prevCount.current) {
      // Find the new ones
      const newAchievements = achievements.filter((a) => !prevList.current.has(a.id));
      
      newAchievements.forEach((achievement) => {
        toast(`🏆 Achievement Unlocked: ${achievement.title}`, {
          description: achievement.description,
        });
        prevList.current.add(achievement.id);
      });
      
      prevCount.current = achievements.length;
    }
  }, [achievements, toast]);

  return null;
}
