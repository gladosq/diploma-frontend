import s from './Slider.module.scss';
import useSettingsStore from '../../AsciiCanvas/store/settings.ts';
import ReactSlider from 'react-slider';

export type SliderProps = {
  label?: string;
  min: number;
  max: number;
  percent?: boolean;
  defaultValue: number;
  id: string;
}

export default function Slider({label, id, min, max}: SliderProps) {
  const {settings, setSettings, setActiveSetting} = useSettingsStore();
  const currentSliderValue = settings?.[id as keyof typeof settings];

  return (
    <div className={s.wrapper}>
      <div className={s.infoWrapper}>
        <span className={s.label}>{label}</span>
        <span className={s.number}>{currentSliderValue}</span>
      </div>
      <div>
        <ReactSlider
          className={s.slider}
          thumbClassName={s.thumb}
          max={max}
          min={min}
          value={Number(currentSliderValue)}
          withTracks
          onAfterChange={(e) => {
            setActiveSetting(id);
            if (settings) setSettings({...settings, [id]: e});
          }}
        />
      </div>
    </div>
  );
}
