import { HypixelPlayer, SkyBlockProfile, PlayerStats, SkyBlockMember } from '../types/hypixel'

const HYPIXEL_API_BASE = 'https://api.hypixel.net'

const SKILL_XP_TABLE = [
  0, 50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425, 32425, 47425,
  67425, 97425, 147425, 222425, 322425, 522425, 822425, 1222425, 1722425, 2322425,
  3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425,
  13822425, 15522425, 17322425, 19222425, 21222425, 23322425, 25522425, 27822425,
  30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472425, 51172425,
  55172425, 59472425, 64072425, 68972425, 74172425, 79672425, 85472425, 91572425,
  97972425, 104672425, 111672425
]

function getSkillLevel(xp: number): number {
  let level = 0
  for (let i = 0; i < SKILL_XP_TABLE.length; i++) {
    if (xp >= SKILL_XP_TABLE[i]) {
      level = i
    } else {
      break
    }
  }
  return level
}

function getDungeonLevel(xp: number): number {
  const dungeonXpTable = [
    0, 50, 125, 235, 395, 625, 955, 1425, 2095, 3045, 4385, 6275, 8940, 12700, 17960,
    25340, 35640, 50040, 70040, 97640, 135640, 188140, 259640, 356640, 488640, 668640,
    911640, 1239640, 1684640, 2284640, 3084640, 4149640, 5559640, 7459640, 9959640,
    13259640, 17559640, 23159640, 30359640, 39559640, 51559640, 66559640, 85559640,
    109559640, 139559640, 177559640, 225559640, 285559640, 360559640, 453559640,
    569559640
  ]
  let level = 0
  for (let i = 0; i < dungeonXpTable.length; i++) {
    if (xp >= dungeonXpTable[i]) {
      level = i
    } else {
      break
    }
  }
  return level
}

export async function getPlayerByUsername(username: string): Promise<HypixelPlayer> {
  const response = await fetch(`${HYPIXEL_API_BASE}/player?name=${username}`)

  if (!response.ok) {
    throw new Error('Failed to fetch player data')
  }

  const data = await response.json()

  if (!data.success || !data.player) {
    throw new Error('Player not found')
  }

  return data.player
}

export async function getSkyBlockProfiles(uuid: string): Promise<SkyBlockProfile[]> {
  const response = await fetch(`${HYPIXEL_API_BASE}/skyblock/profiles?uuid=${uuid}`)

  if (!response.ok) {
    throw new Error('Failed to fetch SkyBlock profiles')
  }

  const data = await response.json()

  if (!data.success || !data.profiles) {
    throw new Error('No SkyBlock profiles found')
  }

  return data.profiles.filter((p: SkyBlockProfile) => p.members)
}

export function processPlayerStats(
  username: string,
  uuid: string,
  profile: SkyBlockProfile,
  profileName: string
): PlayerStats {
  const member: SkyBlockMember = profile.members[uuid] || {}

  const skills = {
    farming: getSkillLevel(member.experience_skill_farming || 0),
    mining: getSkillLevel(member.experience_skill_mining || 0),
    combat: getSkillLevel(member.experience_skill_combat || 0),
    foraging: getSkillLevel(member.experience_skill_foraging || 0),
    fishing: getSkillLevel(member.experience_skill_fishing || 0),
    enchanting: getSkillLevel(member.experience_skill_enchanting || 0),
    alchemy: getSkillLevel(member.experience_skill_alchemy || 0),
    taming: getSkillLevel(member.experience_skill_taming || 0),
    carpentry: getSkillLevel(member.experience_skill_carpentry || 0),
    runecrafting: getSkillLevel(member.experience_skill_runecrafting || 0),
  }

  const slayers = {
    zombie: Math.floor((member.slayer_bosses?.zombie?.xp || 0)),
    spider: Math.floor((member.slayer_bosses?.spider?.xp || 0)),
    wolf: Math.floor((member.slayer_bosses?.wolf?.xp || 0)),
    enderman: Math.floor((member.slayer_bosses?.enderman?.xp || 0)),
    blaze: Math.floor((member.slayer_bosses?.blaze?.xp || 0)),
  }

  const dungeons = {
    catacombs: getDungeonLevel(member.dungeons?.dungeon_types?.catacombs?.experience || 0),
    healer: getDungeonLevel(member.dungeons?.player_classes?.healer?.experience || 0),
    mage: getDungeonLevel(member.dungeons?.player_classes?.mage?.experience || 0),
    berserk: getDungeonLevel(member.dungeons?.player_classes?.berserk?.experience || 0),
    archer: getDungeonLevel(member.dungeons?.player_classes?.archer?.experience || 0),
    tank: getDungeonLevel(member.dungeons?.player_classes?.tank?.experience || 0),
  }

  return {
    username,
    uuid,
    profile: profileName,
    skills,
    slayers,
    dungeons,
    purse: member.coin_purse || 0,
    lastSave: member.last_save ? new Date(member.last_save) : null,
  }
}
