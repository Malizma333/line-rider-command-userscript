const {React} = window;
import {THEME, TEXT_SIZES} from '../styles';
import SettingsRadioButton from '../components/SettingsRadioButton';
import EmbeddedButton from '../components/EmbeddedButton';
import * as FICONS from '../components/Icons';
import {App} from '../App';
import {FONT_SIZE_SETTING, VIEWPORT_SETTING, SETTINGS_KEY} from '../lib/settings-storage.types';
import {getSetting, saveSetting} from '../lib/settings-storage';

const styles = {
  window: {
    backgroundColor: THEME.light,
    border: '2px solid black',
    display: 'flex',
    flexDirection: 'column',
    flex: 9,
    overflow: 'auto',
    position: 'relative',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '3em',
    margin: '10px',
    position: 'relative',
  },
  applyButton: {
    border: '2px solid black',
    borderRadius: '5px',
    left: '0px',
    position: 'absolute',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: '1.5em',
    minHeight: '3em',
    padding: '1em',
  },
  label: {
    position: 'absolute',
    left: '5px',
  },
  parameter: {
    position: 'absolute',
    right: '5px',
  },
} satisfies Record<string, React.CSSProperties>;

/**
 *
 * @param root0
 * @param root0.root
 * @param root0.settings
 */
function SettingsHeader({root, settings}: {root: App, settings: Settings}) {
  return <div style={styles.header}>
    <EmbeddedButton
      onClick={() => root.onToggleSettings()}
      icon={FICONS.X}
      customStyle={{position: 'absolute', right: '0px'}}
    />
    <text style={{fontSize: TEXT_SIZES.M[root.state.fontSize]}}>
      Settings
    </text>
    <button
      style={{
        ...styles.applyButton,
        fontSize: TEXT_SIZES.M[root.state.fontSize],
        background: settings.state.dirty ? THEME.midLight : THEME.midDark,
      }}
      disabled={!settings.state.dirty}
      onClick={() => settings.onApply()}
    >
      Apply
    </button>
  </div>;
}

const LABEL_MAP = {
  [SETTINGS_KEY.FONT_SIZE]: [
    [FONT_SIZE_SETTING.SMALL, 'Small'],
    [FONT_SIZE_SETTING.MEDIUM, 'Medium'],
    [FONT_SIZE_SETTING.LARGE, 'Large'],
  ],
  [SETTINGS_KEY.VIEWPORT]: [
    [VIEWPORT_SETTING.HD, '720p'],
    [VIEWPORT_SETTING.FHD, '1080p'],
    [VIEWPORT_SETTING.QHD, '1440p'],
    [VIEWPORT_SETTING.UHD, '4K'],
  ],
} as const;

/**
 *
 * @param root0
 * @param root0.root
 * @param root0.current
 * @param root0.onClick
 * @param root0.title
 * @param root0.lkey
 */
function SettingsSection(
    {root, current, onClick, title, lkey}:
  {root: App, current: FONT_SIZE_SETTING | VIEWPORT_SETTING, onClick: (e: number) => void, title: string,
    lkey: SETTINGS_KEY},
) {
  return <div style={styles.row}>
    <text style={{...styles.label, fontSize: TEXT_SIZES.S[root.state.fontSize]}}>
      {title}
    </text>
    <div style={{...styles.parameter, fontSize: TEXT_SIZES.S[root.state.fontSize]}}>
      {...LABEL_MAP[lkey].map(([target, label]) => {
        return <SettingsRadioButton
          current={current}
          target={target}
          label={label}
          onClick={(e: number) => onClick(e as number)}
        />;
      })}
    </div>
  </div>;
}

interface Props { root: App }
interface State {
  dirty: boolean,
  fontSize: FONT_SIZE_SETTING,
  resolution: VIEWPORT_SETTING
}

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fontSize: getSetting(SETTINGS_KEY.FONT_SIZE),
      resolution: getSetting(SETTINGS_KEY.VIEWPORT),
      dirty: false,
    };
  }

  onChangeFontSize(newFontSize: number): void {
    const {fontSize} = this.state;

    if (newFontSize !== fontSize) {
      this.setState({dirty: true});
    }

    this.setState({fontSize: newFontSize});
  }

  onChangeViewport(newResolution: number): void {
    const {resolution} = this.state;

    if (resolution !== newResolution) {
      this.setState({dirty: true});
    }

    this.setState({resolution: newResolution});
  }

  onApply(): void {
    const {resolution, fontSize} = this.state;
    const {root} = this.props;

    root.onApplyViewport(resolution);

    saveSetting(SETTINGS_KEY.FONT_SIZE, fontSize);
    saveSetting(SETTINGS_KEY.VIEWPORT, resolution);

    root.setState({fontSize, resolution});
    this.setState({dirty: false});
  }

  render() {
    const {
      root,
    } = this.props;

    return <div style={styles.window}>
      <SettingsHeader root={root} settings={this}/>
      <div style={{fontSize: TEXT_SIZES.M[root.state.fontSize]}}>
        <SettingsSection
          root={root}
          current={this.state.fontSize}
          onClick={(e: number) => this.onChangeFontSize(e)}
          title={'Font Sizes'}
          lkey={SETTINGS_KEY.FONT_SIZE}
        />
        <SettingsSection
          root={root}
          current={this.state.resolution}
          onClick={(e: number) => this.onChangeViewport(e)}
          title={'Viewport'}
          lkey={SETTINGS_KEY.VIEWPORT}
        />
      </div>
    </div>;
  }
}
