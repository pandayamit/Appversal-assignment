import React, { useState } from 'react';
import { DEFAULT_CONTENT, DEFAULT_STYLING } from './utils/defaultState';
import Sidebar from './components/Sidebar';
import MobilePreview from './components/MobilePreview';
import ThemePresets from './components/ThemePresets';
import { Flame, MonitorSmartphone, Eye, Check, RefreshCw } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [styling, setStyling] = useState(DEFAULT_STYLING);
  const [activePresetName, setActivePresetName] = useState("Default Campaign");
  const [activeTab, setActiveTab] = useState('content');
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false); 

  // Apply styling preset
  const handleSelectPreset = (preset) => {
    setStyling(preset.styling);
    setActivePresetName(preset.name);
  };

  // Reset all settings to factory default
  const handleResetToDefault = () => {
    setContent(DEFAULT_CONTENT);
    setStyling(DEFAULT_STYLING);
    setActivePresetName("Default Campaign");
  };

  // Mock survey publish flow
  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Top Header Navigation */}
      <header className="app-header">
        <div className="brand-section">
          <div className="logo-icon">
            <Flame size={18} fill="currentColor" />
          </div>
          <span className="brand-name">Appversal Campaign</span>
          <span className="badge">Builder</span>
        </div>
        
        <div className="header-links">
          <button 
            type="button"
            id="reset-builder-btn"
            className="tab-btn" 
            style={{ 
              height: '38px', 
              fontSize: '0.8rem', 
              padding: '0 12px',
              border: '1px solid var(--border-color)',
              background: 'rgba(255,255,255,0.02)'
            }}
            onClick={handleResetToDefault}
          >
            <RefreshCw size={14} />
            Reset All
          </button>
          
          <button
            type="button"
            id="publish-survey-btn"
            className="tab-btn active"
            style={{ height: '38px', fontSize: '0.8rem', padding: '0 16px' }}
            disabled={publishing}
            onClick={handlePublish}
          >
            {publishing ? (
              <span>Publishing...</span>
            ) : published ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> Published
              </span>
            ) : (
              <span>Publish Campaign</span>
            )}
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="builder-layout">
        
        {/* Left Side Configurator */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            overflowY: 'auto' 
          }}
        >
          {/* Theme Presets Quick Bar */}
          <ThemePresets 
            activePresetName={activePresetName} 
            onSelectPreset={handleSelectPreset} 
          />

          {/* Core Sidebar Forms */}
          <Sidebar
            content={content}
            styling={styling}
            onChangeContent={(newContent) => {
              setContent(newContent);
              if (activePresetName !== 'Customized') {
                setActivePresetName('Customized');
              }
            }}
            onChangeStyling={(newStyling) => {
              setStyling(newStyling);
              if (activePresetName !== 'Customized') {
                setActivePresetName('Customized');
              }
            }}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Right Side Live Mobile Preview */}
        <MobilePreview 
          content={content} 
          styling={styling} 
        />

      </main>
    </div>
  );
}
