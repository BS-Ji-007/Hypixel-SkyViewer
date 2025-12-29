export interface HypixelPlayer {
  uuid: string;
  displayname: string;
  stats?: {
    SkyBlock?: {
      profiles: Record<string, {
        profile_id: string;
        cute_name: string;
      }>;
    };
  };
}

export interface SkyBlockProfile {
  profile_id: string;
  cute_name: string;
  members: Record<string, SkyBlockMember>;
}

export interface SkyBlockMember {
  last_save?: number;
  first_join?: number;
  coin_purse?: number;

  experience_skill_farming?: number;
  experience_skill_mining?: number;
  experience_skill_combat?: number;
  experience_skill_foraging?: number;
  experience_skill_fishing?: number;
  experience_skill_enchanting?: number;
  experience_skill_alchemy?: number;
  experience_skill_carpentry?: number;
  experience_skill_runecrafting?: number;
  experience_skill_taming?: number;

  slayer_bosses?: {
    zombie?: SlayerData;
    spider?: SlayerData;
    wolf?: SlayerData;
    enderman?: SlayerData;
    blaze?: SlayerData;
  };

  dungeons?: {
    dungeon_types?: {
      catacombs?: {
        experience?: number;
        tier_completions?: Record<number, number>;
      };
    };
    player_classes?: {
      healer?: ClassData;
      mage?: ClassData;
      berserk?: ClassData;
      archer?: ClassData;
      tank?: ClassData;
    };
  };

  collection?: Record<string, number>;

  sacks_counts?: Record<string, number>;
}

export interface SlayerData {
  xp?: number;
  boss_kills_tier_0?: number;
  boss_kills_tier_1?: number;
  boss_kills_tier_2?: number;
  boss_kills_tier_3?: number;
  boss_kills_tier_4?: number;
}

export interface ClassData {
  experience?: number;
}

export interface PlayerStats {
  username: string;
  uuid: string;
  profile: string;
  skills: SkillStats;
  slayers: SlayerStats;
  dungeons: DungeonStats;
  purse: number;
  lastSave: Date | null;
}

export interface SkillStats {
  farming: number;
  mining: number;
  combat: number;
  foraging: number;
  fishing: number;
  enchanting: number;
  alchemy: number;
  taming: number;
  carpentry: number;
  runecrafting: number;
}

export interface SlayerStats {
  zombie: number;
  spider: number;
  wolf: number;
  enderman: number;
  blaze: number;
}

export interface DungeonStats {
  catacombs: number;
  healer: number;
  mage: number;
  berserk: number;
  archer: number;
  tank: number;
}
