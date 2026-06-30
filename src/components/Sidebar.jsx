import React, { useState } from 'react';
import { 
  Settings, 
  FileText, 
  Sliders, 
  Layers, 
  Type, 
  Layout, 
  CheckSquare, 
  MessageSquare, 
  Play, 
  XSquare, 
  Gift, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({
  content,
  styling,
  onChangeContent,
  onChangeStyling,
  activeTab,
  setActiveTab
}) {
  // Accordion state tracking which section is open
  const [openSection, setOpenSection] = useState('intro');

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  // Helper to update deeply nested styling state
  const updateStyle = (category, field, value) => {
    onChangeStyling({
      ...styling,
      [category]: {
        ...styling[category],
        [field]: value
      }
    });
  };

  // Helper to update Thank You sub-category style
  const updateThankYouStyle = (category, field, value) => {
    onChangeStyling({
      ...styling,
      thankYouPage: {
        ...styling.thankYouPage,
        [category]: {
          ...styling.thankYouPage[category],
          [field]: value
        }
      }
    });
  };

  // Content Handlers
  const handlePageCountChange = (count) => {
    const newCount = Math.max(1, count);
    let updatedQuestions = [...content.questions];
    
    if (newCount > updatedQuestions.length) {
      // Add new question templates
      for (let i = updatedQuestions.length; i < newCount; i++) {
        updatedQuestions.push({
          id: `q-${i + 1}`,
          title: `Question ${i + 1} Title`,
          description: `Description for question ${i + 1}.`,
          options: ["Option A", "Option B"],
          allowComments: false,
          commentsPlaceholder: "Write your feedback here...",
          logic: {
            enabled: false,
            triggerOption: "",
            action: "next",
            targetQuestionId: "",
            redirectUrl: ""
          },
          submitText: i === newCount - 1 ? "Submit Survey" : "Next Question"
        });
      }
    } else if (newCount < updatedQuestions.length) {
      // Shrink array
      updatedQuestions = updatedQuestions.slice(0, newCount);
    }
    
    onChangeContent({
      ...content,
      numPages: newCount,
      questions: updatedQuestions
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = content.questions.map((q, idx) => {
      if (idx === index) {
        return { ...q, [field]: value };
      }
      return q;
    });
    onChangeContent({ ...content, questions: updatedQuestions });
  };

  const updateQuestionLogic = (index, field, value) => {
    const updatedQuestions = content.questions.map((q, idx) => {
      if (idx === index) {
        return {
          ...q,
          logic: {
            ...q.logic,
            [field]: value
          }
        };
      }
      return q;
    });
    onChangeContent({ ...content, questions: updatedQuestions });
  };

  const updateOption = (qIdx, optIdx, value) => {
    const updatedQuestions = content.questions.map((q, idx) => {
      if (idx === qIdx) {
        const updatedOpts = q.options.map((opt, oIdx) => oIdx === optIdx ? value : opt);
        return { ...q, options: updatedOpts };
      }
      return q;
    });
    onChangeContent({ ...content, questions: updatedQuestions });
  };

  const addOption = (qIdx) => {
    const updatedQuestions = content.questions.map((q, idx) => {
      if (idx === qIdx) {
        return { ...q, options: [...q.options, `New Option ${q.options.length + 1}`] };
      }
      return q;
    });
    onChangeContent({ ...content, questions: updatedQuestions });
  };

  const deleteOption = (qIdx, optIdx) => {
    const updatedQuestions = content.questions.map((q, idx) => {
      if (idx === qIdx && q.options.length > 2) {
        const updatedOpts = q.options.filter((_, oIdx) => oIdx !== optIdx);
        return { ...q, options: updatedOpts };
      }
      return q;
    });
    onChangeContent({ ...content, questions: updatedQuestions });
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const url = URL.createObjectURL(file);
      onChangeContent({
        ...content,
        thankYou: {
          ...content.thankYou,
          mediaUrl: url,
          mediaType: type,
          mediaFileName: file.name
        }
      });
    }
  };

  const handleCustomCrossUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateStyle('crossButton', 'customIcon', url);
    }
  };

  // Typography Settings Form Generator Helper
  const renderTypographyFields = (category, data, isThankYou = false, thankYouSub = '') => {
    const getVal = (f) => isThankYou ? styling.thankYouPage[thankYouSub][f] : data[f];
    const updateVal = (f, v) => isThankYou ? updateThankYouStyle(thankYouSub, f, v) : updateStyle(category, f, v);

    return (
      <>
        {/* Colors */}
        <div className="form-group">
          <label className="form-label" htmlFor={`${category}-color-picker`}>Text Color</label>
          <div className="color-picker-wrapper">
            <input 
              id={`${category}-color-picker`}
              type="color" 
              className="input-color" 
              value={getVal('color')} 
              onChange={(e) => updateVal('color', e.target.value)} 
            />
            <input 
              id={`${category}-color-text`}
              type="text" 
              className="input-text color-text-input" 
              value={getVal('color')} 
              onChange={(e) => updateVal('color', e.target.value)} 
            />
          </div>
        </div>

        {/* Font Family & Size */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor={`${category}-font-family`}>Font Family</label>
            <select 
              id={`${category}-font-family`}
              className="select-input" 
              value={getVal('fontFamily')}
              onChange={(e) => updateVal('fontFamily', e.target.value)}
            >
              <option value="Inter">Inter (Sans)</option>
              <option value="Outfit">Outfit (Display)</option>
              <option value="Playfair Display">Playfair (Serif)</option>
              <option value="Caveat">Caveat (Handwritten)</option>
              <option value="Fira Code">Fira Code (Mono)</option>
              <option value="Roboto">Roboto</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={`${category}-font-size`}>
              Font Size 
              <span className="label-value">{getVal('fontSize')}px</span>
            </label>
            <input 
              id={`${category}-font-size`}
              type="range" 
              className="slider-input" 
              min="10" 
              max="36" 
              value={getVal('fontSize')} 
              onChange={(e) => updateVal('fontSize', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Font Styles & Alignment */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Styling</label>
            <div className="font-decor-group">
              <button 
                type="button"
                id={`${category}-decor-bold`}
                className={`decor-btn ${getVal('fontStyleBold') ? 'active' : ''}`}
                style={{ fontWeight: 'bold' }}
                onClick={() => updateVal('fontStyleBold', !getVal('fontStyleBold'))}
              >
                B
              </button>
              <button 
                type="button"
                id={`${category}-decor-italic`}
                className={`decor-btn ${getVal('fontStyleItalic') ? 'active' : ''}`}
                style={{ fontStyle: 'italic' }}
                onClick={() => updateVal('fontStyleItalic', !getVal('fontStyleItalic'))}
              >
                I
              </button>
              <button 
                type="button"
                id={`${category}-decor-underline`}
                className={`decor-btn ${getVal('fontStyleUnderline') ? 'active' : ''}`}
                style={{ textDecoration: 'underline' }}
                onClick={() => updateVal('fontStyleUnderline', !getVal('fontStyleUnderline'))}
              >
                U
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Alignment</label>
            <div className="align-group">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  type="button"
                  id={`${category}-align-${align}`}
                  className={`align-btn ${getVal('alignment') === align ? 'active' : ''}`}
                  onClick={() => updateVal('alignment', align)}
                >
                  <span style={{ textTransform: 'capitalize', fontSize: '0.75rem' }}>{align}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Margins */}
        <div className="form-group">
          <label className="form-label">Margins (px)</label>
          <div className="form-row" style={{ gap: '6px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor={`${category}-margin-top`}>Top ({getVal('marginTop')}px)</label>
              <input id={`${category}-margin-top`} type="range" className="slider-input" min="0" max="40" value={getVal('marginTop')} onChange={(e) => updateVal('marginTop', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor={`${category}-margin-bottom`}>Bottom ({getVal('marginBottom')}px)</label>
              <input id={`${category}-margin-bottom`} type="range" className="slider-input" min="0" max="40" value={getVal('marginBottom')} onChange={(e) => updateVal('marginBottom', parseInt(e.target.value))} />
            </div>
          </div>
          <div className="form-row" style={{ gap: '6px', marginTop: '6px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor={`${category}-margin-left`}>Left ({getVal('marginLeft')}px)</label>
              <input id={`${category}-margin-left`} type="range" className="slider-input" min="0" max="40" value={getVal('marginLeft')} onChange={(e) => updateVal('marginLeft', parseInt(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor={`${category}-margin-right`}>Right ({getVal('marginRight')}px)</label>
              <input id={`${category}-margin-right`} type="range" className="slider-input" min="0" max="40" value={getVal('marginRight')} onChange={(e) => updateVal('marginRight', parseInt(e.target.value))} />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="config-sidebar">
      {/* Navigation tabs */}
      <div className="tabs-container">
        <button
          id="tab-btn-content"
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          <FileText size={16} />
          Content
        </button>
        <button
          id="tab-btn-styling"
          className={`tab-btn ${activeTab === 'styling' ? 'active' : ''}`}
          onClick={() => setActiveTab('styling')}
        >
          <Sliders size={16} />
          Styling
        </button>
      </div>

      {/* Tabs panels */}
      <div className="accordion-list">
        
        {/* ================= CONTENT TAB ================= */}
        {activeTab === 'content' && (
          <>
            {/* Introduction Section */}
            <div className={`accordion-item ${openSection === 'intro' ? 'open' : ''}`}>
              <button 
                type="button"
                id="accordion-header-intro"
                className="accordion-header" 
                onClick={() => toggleSection('intro')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Settings size={18} /></span>
                  <span>A. Introduction Settings</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>
              
              {openSection === 'intro' && (
                <div className="accordion-content">
                  <div className="form-group">
                    <label className="form-label" htmlFor="num-survey-pages">Number of Survey Pages (Questions)</label>
                    <div className="page-control-container">
                      <button 
                        type="button"
                        id="page-decrease-btn"
                        className="page-btn" 
                        disabled={content.numPages <= 1}
                        onClick={() => handlePageCountChange(content.numPages - 1)}
                      >
                        -
                      </button>
                      <span id="page-count-val" className="page-value">{content.numPages}</span>
                      <button 
                        type="button"
                        id="page-increase-btn"
                        className="page-btn" 
                        onClick={() => handlePageCountChange(content.numPages + 1)}
                      >
                        +
                      </button>
                    </div>
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
                      Each survey page represents one question configured below.
                    </small>
                  </div>
                </div>
              )}
            </div>

            {/* Question Pages Section */}
            <div className={`accordion-item ${openSection === 'questions' ? 'open' : ''}`}>
              <button 
                type="button"
                id="accordion-header-questions"
                className="accordion-header" 
                onClick={() => toggleSection('questions')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Layers size={18} /></span>
                  <span>B. Question Pages ({content.questions.length})</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'questions' && (
                <div className="accordion-content" style={{ gap: '20px' }}>
                  {content.questions.map((q, qIdx) => (
                    <div key={q.id} style={{ borderBottom: qIdx !== content.questions.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none', paddingBottom: qIdx !== content.questions.length - 1 ? '20px' : '0' }}>
                      <h4 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Question {qIdx + 1}
                      </h4>
                      
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label className="form-label" htmlFor={`q-title-${qIdx}`}>Question Title</label>
                        <input
                          id={`q-title-${qIdx}`}
                          type="text"
                          className="input-text"
                          value={q.title}
                          onChange={(e) => updateQuestion(qIdx, 'title', e.target.value)}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label className="form-label" htmlFor={`q-desc-${qIdx}`}>Description / Subtitle</label>
                        <textarea
                          id={`q-desc-${qIdx}`}
                          className="input-text"
                          rows="2"
                          value={q.description}
                          onChange={(e) => updateQuestion(qIdx, 'description', e.target.value)}
                          style={{ resize: 'vertical' }}
                        />
                      </div>

                      {/* Options Builder */}
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <label className="form-label">Options (Min 2)</label>
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="option-editor-item">
                            <span className="option-drag-handle">{oIdx + 1}.</span>
                            <input
                              id={`q-${qIdx}-opt-${oIdx}`}
                              type="text"
                              className="input-text"
                              value={opt}
                              onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                            />
                            <button
                              type="button"
                              id={`q-${qIdx}-opt-delete-${oIdx}`}
                              className="option-delete-btn"
                              disabled={q.options.length <= 2}
                              onClick={() => deleteOption(qIdx, oIdx)}
                              title="Delete option"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          id={`q-${qIdx}-add-opt-btn`}
                          className="add-option-btn"
                          onClick={() => addOption(qIdx)}
                        >
                          <Plus size={14} /> Add Option
                        </button>
                      </div>

                      {/* Additional Comments Toggle */}
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <div className="switch-wrapper">
                          <span className="switch-label">Enable Comments Box</span>
                          <label className="switch" htmlFor={`q-comments-toggle-${qIdx}`}>
                            <input
                              id={`q-comments-toggle-${qIdx}`}
                              type="checkbox"
                              checked={q.allowComments}
                              onChange={(e) => updateQuestion(qIdx, 'allowComments', e.target.checked)}
                            />
                            <span className="slider-toggle"></span>
                          </label>
                        </div>
                      </div>

                      {/* Mock Conditional Logic */}
                      <div className="form-group" style={{ marginBottom: '12px' }}>
                        <div className="logic-box">
                          <div className="logic-header">
                            <Settings size={13} />
                            Conditional Logic
                          </div>
                          
                          <div className="switch-wrapper" style={{ padding: '6px 0', border: 'none', background: 'transparent' }}>
                            <span className="switch-label" style={{ fontSize: '0.75rem' }}>Enable Redirection</span>
                            <label className="switch" style={{ width: '36px', height: '20px' }} htmlFor={`q-logic-toggle-${qIdx}`}>
                              <input
                                id={`q-logic-toggle-${qIdx}`}
                                type="checkbox"
                                checked={q.logic.enabled}
                                onChange={(e) => updateQuestionLogic(qIdx, 'enabled', e.target.checked)}
                              />
                              <span className="slider-toggle" style={{ borderRadius: '20px' }}></span>
                            </label>
                          </div>

                          {q.logic.enabled && (
                            <>
                              <div className="form-group">
                                <label className="form-label" style={{ fontSize: '0.75rem' }} htmlFor={`q-${qIdx}-logic-trigger`}>If user selects option:</label>
                                <select
                                  id={`q-${qIdx}-logic-trigger`}
                                  className="select-input"
                                  style={{ padding: '6px 8px', fontSize: '0.8rem' }}
                                  value={q.logic.triggerOption}
                                  onChange={(e) => updateQuestionLogic(qIdx, 'triggerOption', e.target.value)}
                                >
                                  <option value="">-- Choose Option --</option>
                                  {q.options.map((opt, oIdx) => (
                                    <option key={oIdx} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="form-row" style={{ gap: '8px' }}>
                                <div className="form-group">
                                  <label className="form-label" style={{ fontSize: '0.75rem' }} htmlFor={`q-${qIdx}-logic-action`}>Then action:</label>
                                  <select
                                    id={`q-${qIdx}-logic-action`}
                                    className="select-input"
                                    style={{ padding: '6px 8px', fontSize: '0.8rem' }}
                                    value={q.logic.action}
                                    onChange={(e) => updateQuestionLogic(qIdx, 'action', e.target.value)}
                                  >
                                    <option value="next">Go to Next Page</option>
                                    <option value="thankyou">Skip to Thank You</option>
                                    <option value="redirect">Redirect to URL</option>
                                    {content.questions.length > 1 && <option value="question">Jump to Question</option>}
                                  </select>
                                </div>
                              </div>

                              {q.logic.action === 'redirect' && (
                                <div className="form-group">
                                  <label className="form-label" style={{ fontSize: '0.75rem' }} htmlFor={`q-${qIdx}-logic-url`}>Redirect URL</label>
                                  <input
                                    id={`q-${qIdx}-logic-url`}
                                    type="text"
                                    className="input-text"
                                    style={{ padding: '6px 8px', fontSize: '0.8rem' }}
                                    placeholder="https://example.com"
                                    value={q.logic.redirectUrl}
                                    onChange={(e) => updateQuestionLogic(qIdx, 'redirectUrl', e.target.value)}
                                  />
                                </div>
                              )}

                              {q.logic.action === 'question' && (
                                <div className="form-group">
                                  <label className="form-label" style={{ fontSize: '0.75rem' }} htmlFor={`q-${qIdx}-logic-target`}>Target Question</label>
                                  <select
                                    id={`q-${qIdx}-logic-target`}
                                    className="select-input"
                                    style={{ padding: '6px 8px', fontSize: '0.8rem' }}
                                    value={q.logic.targetQuestionId}
                                    onChange={(e) => updateQuestionLogic(qIdx, 'targetQuestionId', e.target.value)}
                                  >
                                    <option value="">-- Choose Target --</option>
                                    {content.questions
                                      .filter((_, qIdxTarget) => qIdxTarget !== qIdx)
                                      .map((qTarget, qIdxTarget) => (
                                        <option key={qTarget.id} value={qTarget.id}>
                                          Question {content.questions.indexOf(qTarget) + 1}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Submit / CTA Button Custom Text */}
                      <div className="form-group">
                        <label className="form-label" htmlFor={`q-submit-text-${qIdx}`}>Submit/Next Button Text</label>
                        <input
                          id={`q-submit-text-${qIdx}`}
                          type="text"
                          className="input-text"
                          value={q.submitText}
                          onChange={(e) => updateQuestion(qIdx, 'submitText', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Thank You Page Section */}
            <div className={`accordion-item ${openSection === 'thankyou' ? 'open' : ''}`}>
              <button 
                type="button"
                id="accordion-header-thankyou"
                className="accordion-header" 
                onClick={() => toggleSection('thankyou')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Gift size={18} /></span>
                  <span>C. Thank You Page Settings</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'thankyou' && (
                <div className="accordion-content">
                  <div className="form-group" style={{ marginBottom: '8px' }}>
                    <div className="switch-wrapper">
                      <span className="switch-label">Enable Thank You Page</span>
                      <label className="switch" htmlFor="thank-you-toggle">
                        <input
                          id="thank-you-toggle"
                          type="checkbox"
                          checked={content.thankYou.enabled}
                          onChange={(e) => onChangeContent({
                            ...content,
                            thankYou: { ...content.thankYou, enabled: e.target.checked }
                          })}
                        />
                        <span className="slider-toggle"></span>
                      </label>
                    </div>
                  </div>

                  {content.thankYou.enabled && (
                    <>
                      {/* Media Upload */}
                      <div className="form-group">
                        <label className="form-label">Upload Media (PNG, JPG, GIF, Video)</label>
                        <div className="upload-btn-wrapper">
                          <button type="button" className="upload-mock-btn">
                            <ImageIcon size={18} />
                            <span>Select media file...</span>
                          </button>
                          <input 
                            type="file" 
                            className="upload-file-input" 
                            accept="image/*,video/*"
                            onChange={handleMediaUpload} 
                          />
                        </div>
                        {content.thankYou.mediaFileName && (
                          <div className="file-preview-strip">
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                              {content.thankYou.mediaFileName}
                            </span>
                            <button
                              type="button"
                              className="clear-file-btn"
                              onClick={() => onChangeContent({
                                ...content,
                                thankYou: { ...content.thankYou, mediaUrl: "", mediaFileName: "" }
                              })}
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="thank-you-title">Thank You Title</label>
                        <input
                          id="thank-you-title"
                          type="text"
                          className="input-text"
                          value={content.thankYou.title}
                          onChange={(e) => onChangeContent({
                            ...content,
                            thankYou: { ...content.thankYou, title: e.target.value }
                          })}
                        />
                      </div>

                      {/* Subtitle */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="thank-you-subtitle">Thank You Description</label>
                        <textarea
                          id="thank-you-subtitle"
                          className="input-text"
                          rows="3"
                          value={content.thankYou.subtitle}
                          onChange={(e) => onChangeContent({
                            ...content,
                            thankYou: { ...content.thankYou, subtitle: e.target.value }
                          })}
                        />
                      </div>

                      {/* Button Text */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="thank-you-cta-text">CTA Button Text</label>
                        <input
                          id="thank-you-cta-text"
                          type="text"
                          className="input-text"
                          value={content.thankYou.ctaText}
                          onChange={(e) => onChangeContent({
                            ...content,
                            thankYou: { ...content.thankYou, ctaText: e.target.value }
                          })}
                        />
                      </div>

                      {/* Redirection link */}
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="thank-you-redirect-action">On Click Action</label>
                          <select
                            id="thank-you-redirect-action"
                            className="select-input"
                            value={content.thankYou.redirectUrl ? 'url' : 'close'}
                            onChange={(e) => {
                              const isUrl = e.target.value === 'url';
                              onChangeContent({
                                ...content,
                                thankYou: { 
                                  ...content.thankYou, 
                                  redirectUrl: isUrl ? 'https://' : '' 
                                }
                              });
                            }}
                          >
                            <option value="close">Close Survey</option>
                            <option value="url">Redirect to URL</option>
                          </select>
                        </div>
                      </div>

                      {content.thankYou.redirectUrl !== '' && (
                        <div className="form-group">
                          <label className="form-label" htmlFor="thank-you-redirect-url">Redirect URL</label>
                          <input
                            id="thank-you-redirect-url"
                            type="text"
                            className="input-text"
                            value={content.thankYou.redirectUrl}
                            onChange={(e) => onChangeContent({
                              ...content,
                              thankYou: { ...content.thankYou, redirectUrl: e.target.value }
                            })}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* ================= STYLING TAB ================= */}
        {activeTab === 'styling' && (
          <>
            {/* Appearance Accordion */}
            <div className={`accordion-item ${openSection === 'style-appearance' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-appearance"
                className="accordion-header" 
                onClick={() => toggleSection('style-appearance')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Layout size={18} /></span>
                  <span>1. General Appearance</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-appearance' && (
                <div className="accordion-content">
                  {/* Backdrop Color */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="style-bg-color">Backdrop Color</label>
                    <div className="color-picker-wrapper">
                      <input 
                        id="style-bg-color"
                        type="color" 
                        className="input-color" 
                        value={styling.appearance.bgColor} 
                        onChange={(e) => updateStyle('appearance', 'bgColor', e.target.value)} 
                      />
                      <input 
                        id="style-bg-color-text"
                        type="text" 
                        className="input-text color-text-input" 
                        value={styling.appearance.bgColor} 
                        onChange={(e) => updateStyle('appearance', 'bgColor', e.target.value)} 
                      />
                    </div>
                  </div>

                  {/* Backdrop Opacity */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="style-bg-opacity">
                      Backdrop Opacity 
                      <span className="label-value">{styling.appearance.opacity}%</span>
                    </label>
                    <input 
                      id="style-bg-opacity"
                      type="range" 
                      className="slider-input" 
                      min="0" 
                      max="100" 
                      value={styling.appearance.opacity} 
                      onChange={(e) => updateStyle('appearance', 'opacity', parseInt(e.target.value))} 
                    />
                  </div>

                  {/* Survey BG Color */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="style-survey-bg">Survey Container BG</label>
                    <div className="color-picker-wrapper">
                      <input 
                        id="style-survey-bg"
                        type="color" 
                        className="input-color" 
                        value={styling.appearance.surveyBg} 
                        onChange={(e) => updateStyle('appearance', 'surveyBg', e.target.value)} 
                      />
                      <input 
                        id="style-survey-bg-text"
                        type="text" 
                        className="input-text color-text-input" 
                        value={styling.appearance.surveyBg} 
                        onChange={(e) => updateStyle('appearance', 'surveyBg', e.target.value)} 
                      />
                    </div>
                  </div>

                  {/* Survey Corner Radii */}
                  <div className="form-group">
                    <label className="form-label">Card Corner Radius (px)</label>
                    <div className="form-row" style={{ gap: '6px' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-radius-tl">Top Left ({styling.appearance.borderRadiusTL}px)</label>
                        <input id="style-radius-tl" type="range" className="slider-input" min="0" max="40" value={styling.appearance.borderRadiusTL} onChange={(e) => updateStyle('appearance', 'borderRadiusTL', parseInt(e.target.value))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-radius-tr">Top Right ({styling.appearance.borderRadiusTR}px)</label>
                        <input id="style-radius-tr" type="range" className="slider-input" min="0" max="40" value={styling.appearance.borderRadiusTR} onChange={(e) => updateStyle('appearance', 'borderRadiusTR', parseInt(e.target.value))} />
                      </div>
                    </div>
                    <div className="form-row" style={{ gap: '6px', marginTop: '6px' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-radius-bl">Bottom Left ({styling.appearance.borderRadiusBL}px)</label>
                        <input id="style-radius-bl" type="range" className="slider-input" min="0" max="40" value={styling.appearance.borderRadiusBL} onChange={(e) => updateStyle('appearance', 'borderRadiusBL', parseInt(e.target.value))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-radius-br">Bottom Right ({styling.appearance.borderRadiusBR}px)</label>
                        <input id="style-radius-br" type="range" className="slider-input" min="0" max="40" value={styling.appearance.borderRadiusBR} onChange={(e) => updateStyle('appearance', 'borderRadiusBR', parseInt(e.target.value))} />
                      </div>
                    </div>
                  </div>

                  {/* Display Delay */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-display-delay">
                        Display Delay 
                        <span className="label-value">{styling.appearance.delay}s</span>
                      </label>
                      <input 
                        id="style-display-delay"
                        type="range" 
                        className="slider-input" 
                        min="0" 
                        max="5" 
                        step="0.1" 
                        value={styling.appearance.delay} 
                        onChange={(e) => updateStyle('appearance', 'delay', parseFloat(e.target.value))} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-entrance-anim">Entrance Animation</label>
                      <select 
                        id="style-entrance-anim"
                        className="select-input" 
                        value={styling.appearance.entranceAnimation}
                        onChange={(e) => updateStyle('appearance', 'entranceAnimation', e.target.value)}
                      >
                        <option value="slide-up">Slide Up</option>
                        <option value="fade-in">Fade In</option>
                        <option value="scale-in">Scale In</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question Title Styling */}
            <div className={`accordion-item ${openSection === 'style-title' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-title"
                className="accordion-header" 
                onClick={() => toggleSection('style-title')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Type size={18} /></span>
                  <span>2. Question Title Styling</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-title' && (
                <div className="accordion-content">
                  {renderTypographyFields('questionTitle', styling.questionTitle)}
                </div>
              )}
            </div>

            {/* Subtitle Styling */}
            <div className={`accordion-item ${openSection === 'style-subtitle' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-subtitle"
                className="accordion-header" 
                onClick={() => toggleSection('style-subtitle')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Type size={18} style={{ opacity: 0.6 }} /></span>
                  <span>3. Subtitle Styling</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-subtitle' && (
                <div className="accordion-content">
                  {renderTypographyFields('subtitle', styling.subtitle)}
                </div>
              )}
            </div>

            {/* Option List Style */}
            <div className={`accordion-item ${openSection === 'style-options' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-options"
                className="accordion-header" 
                onClick={() => toggleSection('style-options')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><CheckSquare size={18} /></span>
                  <span>4. Option List Layout</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-options' && (
                <div className="accordion-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-opt-layout">Option Layout</label>
                      <select 
                        id="style-opt-layout"
                        className="select-input" 
                        value={styling.optionList.layout}
                        onChange={(e) => updateStyle('optionList', 'layout', e.target.value)}
                      >
                        <option value="radio">Radio Style</option>
                        <option value="checkbox">Checkbox Style</option>
                        <option value="filled">Filled Option</option>
                        <option value="alternative">Alternative (2-Column Grid)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-opt-height">
                        Option Height 
                        <span className="label-value">{styling.optionList.height}px</span>
                      </label>
                      <input 
                        id="style-opt-height"
                        type="range" 
                        className="slider-input" 
                        min="32" 
                        max="64" 
                        value={styling.optionList.height} 
                        onChange={(e) => updateStyle('optionList', 'height', parseInt(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-opt-bullet-spacing">
                        Bullet Spacing 
                        <span className="label-value">{styling.optionList.bulletSpacing}px</span>
                      </label>
                      <input 
                        id="style-opt-bullet-spacing"
                        type="range" 
                        className="slider-input" 
                        min="4" 
                        max="24" 
                        value={styling.optionList.bulletSpacing} 
                        onChange={(e) => updateStyle('optionList', 'bulletSpacing', parseInt(e.target.value))} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-opt-spacing">
                        Option Spacing 
                        <span className="label-value">{styling.optionList.optionSpacing}px</span>
                      </label>
                      <input 
                        id="style-opt-spacing"
                        type="range" 
                        className="slider-input" 
                        min="4" 
                        max="24" 
                        value={styling.optionList.optionSpacing} 
                        onChange={(e) => updateStyle('optionList', 'optionSpacing', parseInt(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="style-opt-radius">
                      Corner Radius (All corners)
                      <span className="label-value">{styling.optionList.borderRadius}px</span>
                    </label>
                    <input 
                      id="style-opt-radius"
                      type="range" 
                      className="slider-input" 
                      min="0" 
                      max="24" 
                      value={styling.optionList.borderRadius} 
                      onChange={(e) => updateStyle('optionList', 'borderRadius', parseInt(e.target.value))} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Selected Option Styling */}
            <div className={`accordion-item ${openSection === 'style-selected' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-selected"
                className="accordion-header" 
                onClick={() => toggleSection('style-selected')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><CheckSquare size={18} style={{ color: 'var(--success)' }} /></span>
                  <span>5. Selected Option Style</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-selected' && (
                <div className="accordion-content">
                  {/* Colors */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-sel-bg">Bg Color</label>
                      <input type="color" id="style-sel-bg" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.selectedOption.bgColor} onChange={(e) => updateStyle('selectedOption', 'bgColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-sel-text-color">Text Color</label>
                      <input type="color" id="style-sel-text-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.selectedOption.textColor} onChange={(e) => updateStyle('selectedOption', 'textColor', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-sel-border-color">Border Color</label>
                      <input type="color" id="style-sel-border-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.selectedOption.borderColor} onChange={(e) => updateStyle('selectedOption', 'borderColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-sel-border-width">
                        Border Width 
                        <span className="label-value">{styling.selectedOption.borderWidth}px</span>
                      </label>
                      <input type="range" id="style-sel-border-width" className="slider-input" min="0" max="6" value={styling.selectedOption.borderWidth} onChange={(e) => updateStyle('selectedOption', 'borderWidth', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Unselected Option Styling */}
            <div className={`accordion-item ${openSection === 'style-unselected' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-unselected"
                className="accordion-header" 
                onClick={() => toggleSection('style-unselected')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><CheckSquare size={18} style={{ opacity: 0.5 }} /></span>
                  <span>6. Unselected Option Style</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-unselected' && (
                <div className="accordion-content">
                  {/* Colors */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-unsel-bg">Bg Color</label>
                      <input type="color" id="style-unsel-bg" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.unselectedOption.bgColor} onChange={(e) => updateStyle('unselectedOption', 'bgColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-unsel-text-color">Text Color</label>
                      <input type="color" id="style-unsel-text-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.unselectedOption.textColor} onChange={(e) => updateStyle('unselectedOption', 'textColor', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-unsel-border-color">Border Color</label>
                      <input type="color" id="style-unsel-border-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.unselectedOption.borderColor} onChange={(e) => updateStyle('unselectedOption', 'borderColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-unsel-border-width">
                        Border Width 
                        <span className="label-value">{styling.unselectedOption.borderWidth}px</span>
                      </label>
                      <input type="range" id="style-unsel-border-width" className="slider-input" min="0" max="6" value={styling.unselectedOption.borderWidth} onChange={(e) => updateStyle('unselectedOption', 'borderWidth', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Comment Styling */}
            <div className={`accordion-item ${openSection === 'style-comment' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-comment"
                className="accordion-header" 
                onClick={() => toggleSection('style-comment')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><MessageSquare size={18} /></span>
                  <span>7. Comments Field Styling</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-comment' && (
                <div className="accordion-content">
                  {/* Colors */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-comm-bg">Bg Color</label>
                      <input type="color" id="style-comm-bg" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.additionalComment.bgColor} onChange={(e) => updateStyle('additionalComment', 'bgColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-comm-text-color">Text Color</label>
                      <input type="color" id="style-comm-text-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.additionalComment.textColor} onChange={(e) => updateStyle('additionalComment', 'textColor', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-comm-border-color">Border Color</label>
                      <input type="color" id="style-comm-border-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.additionalComment.borderColor} onChange={(e) => updateStyle('additionalComment', 'borderColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-comm-border-width">
                        Border Width 
                        <span className="label-value">{styling.additionalComment.borderWidth}px</span>
                      </label>
                      <input type="range" id="style-comm-border-width" className="slider-input" min="0" max="6" value={styling.additionalComment.borderWidth} onChange={(e) => updateStyle('additionalComment', 'borderWidth', parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button Styling */}
            <div className={`accordion-item ${openSection === 'style-cta' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-cta"
                className="accordion-header" 
                onClick={() => toggleSection('style-cta')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Play size={18} /></span>
                  <span>8. CTA Button Styling</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-cta' && (
                <div className="accordion-content">
                  {/* Width Mode toggle */}
                  <div className="form-group">
                    <div className="switch-wrapper">
                      <span className="switch-label">Occupy Full Width</span>
                      <label className="switch" htmlFor="style-cta-full-width">
                        <input
                          id="style-cta-full-width"
                          type="checkbox"
                          checked={styling.ctaButton.occupyFullWidth}
                          onChange={(e) => updateStyle('ctaButton', 'occupyFullWidth', e.target.checked)}
                        />
                        <span className="slider-toggle"></span>
                      </label>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-cta-bg">Bg Color</label>
                      <input type="color" id="style-cta-bg" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.ctaButton.bgColor} onChange={(e) => updateStyle('ctaButton', 'bgColor', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-cta-text-color">Text Color</label>
                      <input type="color" id="style-cta-text-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.ctaButton.textColor} onChange={(e) => updateStyle('ctaButton', 'textColor', e.target.value)} />
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="style-cta-height">
                        Button Height 
                        <span className="label-value">{styling.ctaButton.height}px</span>
                      </label>
                      <input type="range" id="style-cta-height" className="slider-input" min="30" max="60" value={styling.ctaButton.height} onChange={(e) => updateStyle('ctaButton', 'height', parseInt(e.target.value))} />
                    </div>
                    {!styling.ctaButton.occupyFullWidth && (
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-cta-width">
                          Button Width 
                          <span className="label-value">{styling.ctaButton.width}px</span>
                        </label>
                        <input type="range" id="style-cta-width" className="slider-input" min="60" max="250" value={styling.ctaButton.width} onChange={(e) => updateStyle('ctaButton', 'width', parseInt(e.target.value))} />
                      </div>
                    )}
                  </div>

                  {/* Corner radii */}
                  <div className="form-group">
                    <label className="form-label">Button Corner Radius (px)</label>
                    <div className="form-row" style={{ gap: '6px' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-cta-radius-tl">Top Left ({styling.ctaButton.borderRadiusTL}px)</label>
                        <input id="style-cta-radius-tl" type="range" className="slider-input" min="0" max="30" value={styling.ctaButton.borderRadiusTL} onChange={(e) => updateStyle('ctaButton', 'borderRadiusTL', parseInt(e.target.value))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-cta-radius-tr">Top Right ({styling.ctaButton.borderRadiusTR}px)</label>
                        <input id="style-cta-radius-tr" type="range" className="slider-input" min="0" max="30" value={styling.ctaButton.borderRadiusTR} onChange={(e) => updateStyle('ctaButton', 'borderRadiusTR', parseInt(e.target.value))} />
                      </div>
                    </div>
                    <div className="form-row" style={{ gap: '6px', marginTop: '6px' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-cta-radius-bl">Bottom Left ({styling.ctaButton.borderRadiusBL}px)</label>
                        <input id="style-cta-radius-bl" type="range" className="slider-input" min="0" max="30" value={styling.ctaButton.borderRadiusBL} onChange={(e) => updateStyle('ctaButton', 'borderRadiusBL', parseInt(e.target.value))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.7rem' }} htmlFor="style-cta-radius-br">Bottom Right ({styling.ctaButton.borderRadiusBR}px)</label>
                        <input id="style-cta-radius-br" type="range" className="slider-input" min="0" max="30" value={styling.ctaButton.borderRadiusBR} onChange={(e) => updateStyle('ctaButton', 'borderRadiusBR', parseInt(e.target.value))} />
                      </div>
                    </div>
                  </div>

                  {/* Alignment (only applicable if not full width) */}
                  {!styling.ctaButton.occupyFullWidth && (
                    <div className="form-group">
                      <label className="form-label">Button Alignment</label>
                      <div className="align-group">
                        {['left', 'center', 'right'].map((align) => (
                          <button
                            key={align}
                            type="button"
                            id={`style-cta-align-${align}`}
                            className={`align-btn ${styling.ctaButton.alignment === align ? 'active' : ''}`}
                            onClick={() => updateStyle('ctaButton', 'alignment', align)}
                          >
                            <span style={{ textTransform: 'capitalize', fontSize: '0.75rem' }}>{align}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Margins */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="style-cta-margin-top">
                      Top Margin 
                      <span className="label-value">{styling.ctaButton.marginTop}px</span>
                    </label>
                    <input 
                      id="style-cta-margin-top"
                      type="range" 
                      className="slider-input" 
                      min="0" 
                      max="40" 
                      value={styling.ctaButton.marginTop} 
                      onChange={(e) => updateStyle('ctaButton', 'marginTop', parseInt(e.target.value))} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cross Button Styling */}
            <div className={`accordion-item ${openSection === 'style-cross' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-cross"
                className="accordion-header" 
                onClick={() => toggleSection('style-cross')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><XSquare size={18} /></span>
                  <span>9. Close Button Styling</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-cross' && (
                <div className="accordion-content">
                  {/* Enable / Disable toggle */}
                  <div className="form-group">
                    <div className="switch-wrapper">
                      <span className="switch-label">Enable Close Button</span>
                      <label className="switch" htmlFor="style-cross-enabled">
                        <input
                          id="style-cross-enabled"
                          type="checkbox"
                          checked={styling.crossButton.enabled}
                          onChange={(e) => updateStyle('crossButton', 'enabled', e.target.checked)}
                        />
                        <span className="slider-toggle"></span>
                      </label>
                    </div>
                  </div>

                  {styling.crossButton.enabled && (
                    <>
                      {/* Cross Button style preset */}
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="style-cross-style">Button Style</label>
                          <select 
                            id="style-cross-style"
                            className="select-input" 
                            value={styling.crossButton.style}
                            onChange={(e) => updateStyle('crossButton', 'style', e.target.value)}
                          >
                            <option value="circle">Sleek Circle</option>
                            <option value="transparent">Transparent Minimal</option>
                            <option value="square">Modern Square</option>
                            <option value="pill">Pill Box</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="style-cross-size">
                            Button Size 
                            <span className="label-value">{styling.crossButton.size}px</span>
                          </label>
                          <input 
                            id="style-cross-size"
                            type="range" 
                            className="slider-input" 
                            min="18" 
                            max="44" 
                            value={styling.crossButton.size} 
                            onChange={(e) => updateStyle('crossButton', 'size', parseInt(e.target.value))} 
                          />
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="style-cross-color">X Icon Color</label>
                          <input type="color" id="style-cross-color" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.crossButton.crossColor} onChange={(e) => updateStyle('crossButton', 'crossColor', e.target.value)} />
                        </div>
                        {styling.crossButton.style !== 'transparent' && (
                          <div className="form-group">
                            <label className="form-label" htmlFor="style-cross-fill">Fill Color</label>
                            <input type="color" id="style-cross-fill" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.crossButton.fillColor} onChange={(e) => updateStyle('crossButton', 'fillColor', e.target.value)} />
                          </div>
                        )}
                      </div>

                      {/* Custom Icon file upload */}
                      <div className="form-group">
                        <label className="form-label">Upload Custom Close Icon (SVG/PNG)</label>
                        <div className="upload-btn-wrapper">
                          <button type="button" className="upload-mock-btn" style={{ padding: '8px' }}>
                            <span>Upload custom SVG/image...</span>
                          </button>
                          <input 
                            type="file" 
                            className="upload-file-input" 
                            accept="image/*"
                            onChange={handleCustomCrossUpload} 
                          />
                        </div>
                        {styling.crossButton.customIcon && (
                          <div className="file-preview-strip">
                            <span>Custom icon uploaded</span>
                            <button
                              type="button"
                              className="clear-file-btn"
                              onClick={() => updateStyle('crossButton', 'customIcon', "")}
                            >
                              Reset
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Thank You Page Styling Accordion */}
            <div className={`accordion-item ${openSection === 'style-thankyou' ? 'open' : ''}`}>
              <button 
                type="button" 
                id="accordion-header-style-thankyou"
                className="accordion-header" 
                onClick={() => toggleSection('style-thankyou')}
              >
                <div className="accordion-header-left">
                  <span className="accordion-icon"><Gift size={18} /></span>
                  <span>10. Thank You Page Styling</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </button>

              {openSection === 'style-thankyou' && (
                <div className="accordion-content" style={{ gap: '20px' }}>
                  
                  {/* Title Typography */}
                  <div>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Title Styling</h4>
                    {renderTypographyFields('thankYouPageTitle', styling.thankYouPage.title, true, 'title')}
                  </div>

                  {/* Subtitle Typography */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Description Styling</h4>
                    {renderTypographyFields('thankYouPageSubtitle', styling.thankYouPage.subtitle, true, 'subtitle')}
                  </div>

                  {/* Media Dimensions */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Media Dimensions</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-thankyou-media-width">
                          Media Width 
                          <span className="label-value">{styling.thankYouPage.image.width}%</span>
                        </label>
                        <input 
                          id="style-thankyou-media-width"
                          type="range" 
                          className="slider-input" 
                          min="20" 
                          max="100" 
                          value={styling.thankYouPage.image.width} 
                          onChange={(e) => updateThankYouStyle('image', 'width', parseInt(e.target.value))} 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-thankyou-media-height">
                          Media Height 
                          <span className="label-value">{styling.thankYouPage.image.height}px</span>
                        </label>
                        <input 
                          id="style-thankyou-media-height"
                          type="range" 
                          className="slider-input" 
                          min="50" 
                          max="250" 
                          value={styling.thankYouPage.image.height} 
                          onChange={(e) => updateThankYouStyle('image', 'height', parseInt(e.target.value))} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button Styling */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Button Styling</h4>
                    <div className="form-group">
                      <div className="switch-wrapper">
                        <span className="switch-label">Full Width Button</span>
                        <label className="switch" htmlFor="style-thankyou-btn-fullwidth">
                          <input
                            id="style-thankyou-btn-fullwidth"
                            type="checkbox"
                            checked={styling.thankYouPage.button.occupyFullWidth}
                            onChange={(e) => updateThankYouStyle('button', 'occupyFullWidth', e.target.checked)}
                          />
                          <span className="slider-toggle"></span>
                        </label>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-thankyou-btn-bg">Bg Color</label>
                        <input type="color" id="style-thankyou-btn-bg" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.thankYouPage.button.bgColor} onChange={(e) => updateThankYouStyle('button', 'bgColor', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-thankyou-btn-text">Text Color</label>
                        <input type="color" id="style-thankyou-btn-text" className="input-text" style={{ padding: '2px', height: '36px' }} value={styling.thankYouPage.button.textColor} onChange={(e) => updateThankYouStyle('button', 'textColor', e.target.value)} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-thankyou-btn-height">
                          Height 
                          <span className="label-value">{styling.thankYouPage.button.height}px</span>
                        </label>
                        <input type="range" id="style-thankyou-btn-height" className="slider-input" min="30" max="60" value={styling.thankYouPage.button.height} onChange={(e) => updateThankYouStyle('button', 'height', parseInt(e.target.value))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="style-thankyou-btn-radius">
                          Corner Radius
                          <span className="label-value">{styling.thankYouPage.button.borderRadius}px</span>
                        </label>
                        <input type="range" id="style-thankyou-btn-radius" className="slider-input" min="0" max="30" value={styling.thankYouPage.button.borderRadius} onChange={(e) => updateThankYouStyle('button', 'borderRadius', parseInt(e.target.value))} />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
