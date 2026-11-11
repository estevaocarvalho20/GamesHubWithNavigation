import {useSettings} from '../context/SettingsContext.jsx';
import {GameView} from '../components/Game.jsx';

export function RpsPage() {
 const { settings } = useSettings();

  return (
    <GameView
    playerName={settings.name}
    playerAvatar={settings.avatar}
    difficulty={settings.difficulty}
     />
  );
}
