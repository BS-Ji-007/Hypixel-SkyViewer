import { PlayerStats } from '../types/hypixel'
import './StatsDisplay.css'

interface StatsDisplayProps {
  stats: PlayerStats
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleString()
  }

  return (
    <div className="stats-display">
      <div className="stats-header">
        <h2>{stats.username}</h2>
        <p className="profile-name">Profile: {stats.profile}</p>
        <p className="last-save">Last Save: {formatDate(stats.lastSave)}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Purse</h3>
          <div className="stat-value">{formatNumber(stats.purse)} coins</div>
        </div>

        <div className="stat-card">
          <h3>Skills</h3>
          <div className="stat-list">
            <div className="stat-item">
              <span>Farming</span>
              <span className="level">{stats.skills.farming}</span>
            </div>
            <div className="stat-item">
              <span>Mining</span>
              <span className="level">{stats.skills.mining}</span>
            </div>
            <div className="stat-item">
              <span>Combat</span>
              <span className="level">{stats.skills.combat}</span>
            </div>
            <div className="stat-item">
              <span>Foraging</span>
              <span className="level">{stats.skills.foraging}</span>
            </div>
            <div className="stat-item">
              <span>Fishing</span>
              <span className="level">{stats.skills.fishing}</span>
            </div>
            <div className="stat-item">
              <span>Enchanting</span>
              <span className="level">{stats.skills.enchanting}</span>
            </div>
            <div className="stat-item">
              <span>Alchemy</span>
              <span className="level">{stats.skills.alchemy}</span>
            </div>
            <div className="stat-item">
              <span>Taming</span>
              <span className="level">{stats.skills.taming}</span>
            </div>
            <div className="stat-item">
              <span>Carpentry</span>
              <span className="level">{stats.skills.carpentry}</span>
            </div>
            <div className="stat-item">
              <span>Runecrafting</span>
              <span className="level">{stats.skills.runecrafting}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Slayers</h3>
          <div className="stat-list">
            <div className="stat-item">
              <span>Zombie</span>
              <span className="xp">{formatNumber(stats.slayers.zombie)} XP</span>
            </div>
            <div className="stat-item">
              <span>Spider</span>
              <span className="xp">{formatNumber(stats.slayers.spider)} XP</span>
            </div>
            <div className="stat-item">
              <span>Wolf</span>
              <span className="xp">{formatNumber(stats.slayers.wolf)} XP</span>
            </div>
            <div className="stat-item">
              <span>Enderman</span>
              <span className="xp">{formatNumber(stats.slayers.enderman)} XP</span>
            </div>
            <div className="stat-item">
              <span>Blaze</span>
              <span className="xp">{formatNumber(stats.slayers.blaze)} XP</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h3>Dungeons</h3>
          <div className="stat-list">
            <div className="stat-item">
              <span>Catacombs</span>
              <span className="level">{stats.dungeons.catacombs}</span>
            </div>
            <div className="stat-item">
              <span>Healer</span>
              <span className="level">{stats.dungeons.healer}</span>
            </div>
            <div className="stat-item">
              <span>Mage</span>
              <span className="level">{stats.dungeons.mage}</span>
            </div>
            <div className="stat-item">
              <span>Berserk</span>
              <span className="level">{stats.dungeons.berserk}</span>
            </div>
            <div className="stat-item">
              <span>Archer</span>
              <span className="level">{stats.dungeons.archer}</span>
            </div>
            <div className="stat-item">
              <span>Tank</span>
              <span className="level">{stats.dungeons.tank}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
