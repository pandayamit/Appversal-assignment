import React from 'react';
import { PRESETS } from '../utils/defaultState';
import { Sparkles } from 'lucide-react';

export default function ThemePresets({ activePresetName, onSelectPreset }) {
  return (
    <div className="presets-section">
      <div className="section-label">
        <Sparkles size={14} />
        Theme Presets
      </div>
      <div className="preset-grid">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            id={`preset-btn-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`preset-card ${activePresetName === preset.name ? 'active' : ''}`}
            title={`${preset.name}: ${preset.description}`}
            onClick={() => onSelectPreset(preset)}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}
