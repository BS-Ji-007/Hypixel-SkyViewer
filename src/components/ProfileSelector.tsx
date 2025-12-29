import { SkyBlockProfile } from '../types/hypixel'
import './ProfileSelector.css'

interface ProfileSelectorProps {
  profiles: SkyBlockProfile[]
  selectedProfile: string
  onSelectProfile: (profileId: string) => void
}

export default function ProfileSelector({
  profiles,
  selectedProfile,
  onSelectProfile,
}: ProfileSelectorProps) {
  if (profiles.length === 0) return null

  return (
    <div className="profile-selector">
      <h2>Select Profile</h2>
      <div className="profile-buttons">
        {profiles.map((profile) => (
          <button
            key={profile.profile_id}
            onClick={() => onSelectProfile(profile.profile_id)}
            className={`profile-button ${
              selectedProfile === profile.profile_id ? 'active' : ''
            }`}
          >
            {profile.cute_name}
          </button>
        ))}
      </div>
    </div>
  )
}
