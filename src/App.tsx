import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ProfileSelector from './components/ProfileSelector'
import StatsDisplay from './components/StatsDisplay'
import { getPlayerByUsername, getSkyBlockProfiles, processPlayerStats } from './services/hypixel'
import { SkyBlockProfile, PlayerStats } from './types/hypixel'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<SkyBlockProfile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [stats, setStats] = useState<PlayerStats | null>(null)
  const [playerData, setPlayerData] = useState<{ username: string; uuid: string } | null>(null)

  const handleSearch = async (username: string) => {
    setLoading(true)
    setError(null)
    setStats(null)
    setProfiles([])
    setSelectedProfile('')

    try {
      const player = await getPlayerByUsername(username)
      const playerProfiles = await getSkyBlockProfiles(player.uuid)

      if (playerProfiles.length === 0) {
        setError('No SkyBlock profiles found for this player')
        return
      }

      setPlayerData({ username: player.displayname, uuid: player.uuid })
      setProfiles(playerProfiles)

      const firstProfile = playerProfiles[0]
      setSelectedProfile(firstProfile.profile_id)

      const playerStats = processPlayerStats(
        player.displayname,
        player.uuid,
        firstProfile,
        firstProfile.cute_name
      )
      setStats(playerStats)

      await supabase.from('search_history').insert({
        username: player.displayname,
        uuid: player.uuid,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSelect = (profileId: string) => {
    if (!playerData) return

    const profile = profiles.find((p) => p.profile_id === profileId)
    if (!profile) return

    setSelectedProfile(profileId)
    const playerStats = processPlayerStats(
      playerData.username,
      playerData.uuid,
      profile,
      profile.cute_name
    )
    setStats(playerStats)
  }

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {profiles.length > 0 && (
        <ProfileSelector
          profiles={profiles}
          selectedProfile={selectedProfile}
          onSelectProfile={handleProfileSelect}
        />
      )}

      {stats && <StatsDisplay stats={stats} />}
    </div>
  )
}

export default App
