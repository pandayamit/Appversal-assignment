import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Wifi, 
  Battery, 
  ChevronLeft, 
  Play, 
  AlertTriangle,
  UploadCloud,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function MobilePreview({ content, styling }) {
  // Navigation & interaction states
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState("");
  const [commentsText, setCommentsText] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [redirectAlert, setRedirectAlert] = useState("");

  // Delay simulation timer
  useEffect(() => {
    setShowSurvey(false);
    const delayTimer = setTimeout(() => {
      setShowSurvey(true);
    }, styling.appearance.delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [styling.appearance.delay, styling.appearance.entranceAnimation, currentQIdx, showThankYou, isClosed]);

  // Track mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync index if question length shrinks
  useEffect(() => {
    if (currentQIdx >= content.questions.length && content.questions.length > 0) {
      setCurrentQIdx(content.questions.length - 1);
      setSelectedOpt("");
    }
  }, [content.questions.length, currentQIdx]);

  // Restart/Reset Survey campaign
  const handleReset = () => {
    setCurrentQIdx(0);
    setSelectedOpt("");
    setCommentsText("");
    setIsClosed(false);
    setShowThankYou(false);
    setRedirectAlert("");
  };

  // Close Survey campaign
  const handleClose = () => {
    setIsClosed(true);
  };

  // Submit/Next Question action
  const handleNext = () => {
    const activeQuestion = content.questions[currentQIdx];
    
    // Check if logic redirection is enabled
    if (activeQuestion.logic && activeQuestion.logic.enabled && selectedOpt === activeQuestion.logic.triggerOption) {
      const action = activeQuestion.logic.action;
      
      if (action === 'thankyou') {
        if (content.thankYou.enabled) {
          setShowThankYou(true);
        } else {
          handleClose();
        }
        return;
      } else if (action === 'redirect') {
        const redirectUrl = activeQuestion.logic.redirectUrl || 'https://google.com';
        setRedirectAlert(`Redirecting to ${redirectUrl}...`);
        setTimeout(() => setRedirectAlert(""), 4000);
        return;
      } else if (action === 'question') {
        const targetId = activeQuestion.logic.targetQuestionId;
        const targetIndex = content.questions.findIndex(q => q.id === targetId);
        if (targetIndex !== -1) {
          setCurrentQIdx(targetIndex);
          setSelectedOpt("");
          return;
        }
      }
    }

    // Standard progression
    if (currentQIdx < content.questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
      setSelectedOpt("");
    } else {
      // Last page
      if (content.thankYou.enabled) {
        setShowThankYou(true);
      } else {
        handleClose();
      }
    }
  };

  const handleBack = () => {
    if (currentQIdx > 0) {
      setCurrentQIdx(prev => prev - 1);
      setSelectedOpt("");
    }
  };

  // Final Thank You Action - Confetti and Redirect mock
  const handleThankYouCTA = () => {
    // Fire beautiful confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (content.thankYou.redirectUrl) {
      setRedirectAlert(`Redirecting to ${content.thankYou.redirectUrl}...`);
      setTimeout(() => setRedirectAlert(""), 4000);
    }
  };

  // Helper to compile font styles
  const getTypographyStyles = (cfg) => {
    if (!cfg) return {};
    return {
      color: cfg.color,
      fontFamily: cfg.fontFamily,
      fontSize: `${cfg.fontSize}px`,
      fontWeight: cfg.fontWeight,
      fontStyle: cfg.fontStyleItalic ? 'italic' : 'normal',
      textDecoration: cfg.fontStyleUnderline ? 'underline' : 'none',
      textAlign: cfg.alignment,
      marginTop: `${cfg.marginTop}px`,
      marginBottom: `${cfg.marginBottom}px`,
      marginLeft: `${cfg.marginLeft}px`,
      marginRight: `${cfg.marginRight}px`,
    };
  };

  // Current Question Object
  const currentQ = content.questions[currentQIdx] || content.questions[0];

  // Compile option list items
  const renderOptions = () => {
    if (!currentQ || !currentQ.options) return null;
    const isAlt = styling.optionList.layout === 'alternative';
    const containerClass = isAlt ? 'preview-options-grid-alternative' : 'preview-options-container';

    return (
      <div 
        className={containerClass} 
        style={{ 
          gap: `${styling.optionList.optionSpacing}px`,
          marginTop: '12px'
        }}
      >
        {currentQ.options.map((opt, oIdx) => {
          const isSelected = selectedOpt === opt;
          const optStyle = isSelected ? styling.selectedOption : styling.unselectedOption;

          // Inline styling compile
          const inlineStyle = {
            height: `${styling.optionList.height}px`,
            borderRadius: `${styling.optionList.borderRadius}px`,
            backgroundColor: optStyle.bgColor,
            borderColor: optStyle.borderColor,
            borderWidth: `${optStyle.borderWidth}px`,
            borderStyle: 'solid',
            color: optStyle.textColor,
            fontFamily: optStyle.fontFamily,
            fontSize: `${optStyle.fontSize}px`,
            fontWeight: optStyle.fontWeight,
            fontStyle: optStyle.fontStyleItalic ? 'italic' : 'normal',
            textDecoration: optStyle.fontStyleUnderline ? 'underline' : 'none',
            justifyContent: optStyle.alignment === 'center' ? 'center' : optStyle.alignment === 'right' ? 'flex-end' : 'flex-start'
          };

          return (
            <div
              key={oIdx}
              id={`preview-opt-${oIdx}`}
              className="preview-option-item"
              style={inlineStyle}
              onClick={() => setSelectedOpt(opt)}
            >
              {/* Bullet style representation */}
              {(styling.optionList.layout === 'radio' || styling.optionList.layout === 'alternative') && (
                <span 
                  className="option-bullet-radio"
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    marginRight: `${styling.optionList.bulletSpacing}px`,
                    color: isSelected ? styling.selectedOption.borderColor : styling.unselectedOption.borderColor
                  }}
                >
                  {isSelected && <span className="option-bullet-radio-inner"></span>}
                </span>
              )}

              {styling.optionList.layout === 'checkbox' && (
                <span 
                  className="option-bullet-checkbox"
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    marginRight: `${styling.optionList.bulletSpacing}px`,
                    color: isSelected ? styling.selectedOption.borderColor : styling.unselectedOption.borderColor
                  }}
                >
                  {isSelected && <span className="option-bullet-checkbox-inner"></span>}
                </span>
              )}

              <span className="option-label-text">{opt}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Compile Close Button style
  const getCloseBtnStyle = () => {
    const isTransparent = styling.crossButton.style === 'transparent';
    const borderRadius = styling.crossButton.style === 'circle' ? '50%' : 
                         styling.crossButton.style === 'square' ? '6px' : '9999px';
    
    return {
      width: `${styling.crossButton.size}px`,
      height: `${styling.crossButton.size}px`,
      backgroundColor: isTransparent ? 'transparent' : styling.crossButton.fillColor,
      borderColor: isTransparent ? 'transparent' : styling.crossButton.strokeColor,
      borderWidth: isTransparent ? '0px' : '1px',
      borderStyle: 'solid',
      color: styling.crossButton.crossColor,
      borderRadius: borderRadius,
      marginTop: `${styling.crossButton.marginTop}px`,
      marginBottom: `${styling.crossButton.marginBottom}px`,
      marginLeft: `${styling.crossButton.marginLeft}px`,
      marginRight: `${styling.crossButton.marginRight}px`,
    };
  };

  return (
    <div className="preview-container">
      {/* Phone chassis */}
      <div className="phone-frame">
        {/* Dynamic Island Notch */}
        <div className="phone-dynamic-island">
          <div className="phone-camera"></div>
        </div>

        {/* Status Bar */}
        <div className="phone-status-bar">
          <span>9:41</span>
          <div className="status-right">
            <Wifi size={12} />
            <span style={{ fontSize: '0.65rem' }}>LTE</span>
            <Battery size={13} />
          </div>
        </div>

        {/* Screen */}
        <div className="phone-screen">
          
          {/* Main Backdrop */}
          <div 
            className="phone-backdrop"
            style={{
              backgroundColor: styling.appearance.bgColor,
              backgroundBlendMode: 'normal',
              opacity: styling.appearance.opacity / 100
            }}
          >
            {/* Survey Cards */}
            {!isClosed ? (
              <>
                {showSurvey ? (
                  <div 
                    id="preview-survey-card"
                    className={`survey-card anim-${styling.appearance.entranceAnimation}`}
                    style={{
                      backgroundColor: styling.appearance.surveyBg,
                      borderTopLeftRadius: `${styling.appearance.borderRadiusTL}px`,
                      borderTopRightRadius: `${styling.appearance.borderRadiusTR}px`,
                      borderBottomLeftRadius: `${styling.appearance.borderRadiusBL}px`,
                      borderBottomRightRadius: `${styling.appearance.borderRadiusBR}px`,
                    }}
                  >
                    {/* Close Cross Button */}
                    {styling.crossButton.enabled && (
                      <div 
                        className="survey-close-wrapper"
                        style={{
                          justifyContent: 'flex-end'
                        }}
                      >
                        <button
                          type="button"
                          id="preview-close-btn"
                          className="survey-close-btn"
                          style={getCloseBtnStyle()}
                          onClick={handleClose}
                        >
                          {styling.crossButton.customIcon ? (
                            <img 
                              src={styling.crossButton.customIcon} 
                              alt="Close" 
                              style={{ width: '60%', height: '60%', objectFit: 'contain' }} 
                            />
                          ) : (
                            <span style={{ fontSize: '1rem', lineHeight: 1 }}>×</span>
                          )}
                        </button>
                      </div>
                    )}

                    <div className="survey-body">
                      
                      {!showThankYou ? (
                        /* Question Page View */
                        <>
                          {/* Top Pagination details */}
                          <div className="survey-progress-container">
                            <span>Question {currentQIdx + 1} of {content.questions.length}</span>
                            <div className="progress-dots">
                              {content.questions.map((_, idx) => (
                                <span 
                                  key={idx} 
                                  className={`progress-dot ${idx === currentQIdx ? 'active' : ''}`}
                                  style={{
                                    backgroundColor: idx === currentQIdx ? styling.selectedOption.borderColor : 'rgba(255, 255, 255, 0.15)'
                                  }}
                                ></span>
                              ))}
                            </div>
                          </div>

                          {/* Title & Description */}
                          <h2 
                            className="survey-question-title"
                            style={getTypographyStyles(styling.questionTitle)}
                          >
                            {currentQ.title}
                          </h2>
                          
                          <p 
                            className="survey-question-subtitle"
                            style={getTypographyStyles(styling.subtitle)}
                          >
                            {currentQ.description}
                          </p>

                          {/* Options Grid */}
                          {renderOptions()}

                          {/* Optional Additional Comments */}
                          {currentQ.allowComments && (
                            <textarea
                              id="preview-comments-input"
                              className="preview-textarea"
                              placeholder={currentQ.commentsPlaceholder}
                              value={commentsText}
                              onChange={(e) => setCommentsText(e.target.value)}
                              style={{
                                backgroundColor: styling.additionalComment.bgColor,
                                borderColor: styling.additionalComment.borderColor,
                                borderWidth: `${styling.additionalComment.borderWidth}px`,
                                borderStyle: 'solid',
                                color: styling.additionalComment.textColor,
                                fontSize: `${styling.additionalComment.fontSize}px`,
                                textAlign: styling.additionalComment.alignment,
                                fontFamily: styling.additionalComment.fontFamily
                              }}
                            />
                          )}

                          {/* Actions / Submit CTA */}
                          <div 
                            className="preview-actions-bar"
                            style={{
                              justifyContent: styling.ctaButton.occupyFullWidth ? 'stretch' : 
                                               styling.ctaButton.alignment === 'center' ? 'center' : 
                                               styling.ctaButton.alignment === 'right' ? 'flex-end' : 'flex-start'
                            }}
                          >
                            <button
                              type="button"
                              id="preview-submit-btn"
                              className="preview-submit-btn"
                              disabled={!selectedOpt}
                              onClick={handleNext}
                              style={{
                                width: styling.ctaButton.occupyFullWidth ? '100%' : `${styling.ctaButton.width}px`,
                                height: `${styling.ctaButton.height}px`,
                                backgroundColor: styling.ctaButton.bgColor,
                                borderColor: styling.ctaButton.borderColor,
                                color: styling.ctaButton.textColor,
                                borderWidth: `${styling.ctaButton.borderWidth}px`,
                                borderTopLeftRadius: `${styling.ctaButton.borderRadiusTL}px`,
                                borderTopRightRadius: `${styling.ctaButton.borderRadiusTR}px`,
                                borderBottomLeftRadius: `${styling.ctaButton.borderRadiusBL}px`,
                                borderBottomRightRadius: `${styling.ctaButton.borderRadiusBR}px`,
                                fontSize: `${styling.ctaButton.fontSize}px`,
                                fontFamily: styling.ctaButton.fontFamily,
                                fontWeight: styling.ctaButton.fontStyleBold ? 'bold' : 'normal',
                                fontStyle: styling.ctaButton.fontStyleItalic ? 'italic' : 'normal',
                                textDecoration: styling.ctaButton.fontStyleUnderline ? 'underline' : 'none',
                                marginTop: `${styling.ctaButton.marginTop}px`,
                                marginBottom: `${styling.ctaButton.marginBottom}px`,
                                marginLeft: `${styling.ctaButton.marginLeft}px`,
                                marginRight: `${styling.ctaButton.marginRight}px`,
                                opacity: selectedOpt ? 1 : 0.5,
                                cursor: selectedOpt ? 'pointer' : 'not-allowed'
                              }}
                            >
                              {currentQ.submitText}
                            </button>
                          </div>

                          {/* Back Navigation auxiliary */}
                          {currentQIdx > 0 && (
                            <div className="preview-nav-aux">
                              <button 
                                type="button"
                                id="preview-back-btn"
                                className="preview-nav-aux-btn"
                                onClick={handleBack}
                              >
                                <ChevronLeft size={14} /> Back
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        /* Thank You Page View */
                        <div className="thankyou-preview-container">
                          
                          {/* Media Box */}
                          {content.thankYou.mediaUrl ? (
                            <div 
                              className="thankyou-media-container"
                              style={{
                                width: `${styling.thankYouPage.image.width}%`,
                                height: `${styling.thankYouPage.image.height}px`,
                                marginTop: `${styling.thankYouPage.image.marginTop}px`,
                                marginBottom: `${styling.thankYouPage.image.marginBottom}px`,
                                marginLeft: `${styling.thankYouPage.image.marginLeft}px`,
                                marginRight: `${styling.thankYouPage.image.marginRight}px`,
                              }}
                            >
                              {content.thankYou.mediaType === 'video' ? (
                                <video 
                                  src={content.thankYou.mediaUrl} 
                                  className="thankyou-media" 
                                  autoPlay 
                                  loop 
                                  muted 
                                />
                              ) : (
                                <img 
                                  src={content.thankYou.mediaUrl} 
                                  alt="Campaign Media" 
                                  className="thankyou-media" 
                                />
                              )}
                            </div>
                          ) : (
                            /* Visual Placeholder for Media if enabled but empty */
                            <div 
                              className="thankyou-media-container"
                              style={{
                                width: `${styling.thankYouPage.image.width}%`,
                                height: `${styling.thankYouPage.image.height}px`,
                                marginTop: `${styling.thankYouPage.image.marginTop}px`,
                                marginBottom: `${styling.thankYouPage.image.marginBottom}px`,
                                marginLeft: `${styling.thankYouPage.image.marginLeft}px`,
                                marginRight: `${styling.thankYouPage.image.marginRight}px`,
                              }}
                            >
                              <div className="thankyou-media-placeholder">
                                <UploadCloud size={24} style={{ color: styling.thankYouPage.title.color }} />
                                <span>Media Display Area</span>
                              </div>
                            </div>
                          )}

                          {/* Title */}
                          <h2 
                            className="survey-question-title"
                            style={getTypographyStyles(styling.thankYouPage.title)}
                          >
                            {content.thankYou.title}
                          </h2>

                          {/* Subtitle */}
                          <p 
                            className="survey-question-subtitle"
                            style={getTypographyStyles(styling.thankYouPage.subtitle)}
                          >
                            {content.thankYou.subtitle}
                          </p>

                          {/* CTA Button */}
                          <div 
                            className="preview-actions-bar"
                            style={{
                              justifyContent: styling.thankYouPage.button.occupyFullWidth ? 'stretch' : 
                                               styling.thankYouPage.button.alignment === 'center' ? 'center' : 
                                               styling.thankYouPage.button.alignment === 'right' ? 'flex-end' : 'flex-start'
                            }}
                          >
                            <button
                              type="button"
                              id="preview-thankyou-cta-btn"
                              className="thankyou-cta-btn"
                              onClick={handleThankYouCTA}
                              style={{
                                width: styling.thankYouPage.button.occupyFullWidth ? '100%' : `${styling.thankYouPage.button.width}px`,
                                height: `${styling.thankYouPage.button.height}px`,
                                backgroundColor: styling.thankYouPage.button.bgColor,
                                borderColor: styling.thankYouPage.button.borderColor,
                                color: styling.thankYouPage.button.textColor,
                                borderWidth: `${styling.thankYouPage.button.borderWidth}px`,
                                borderStyle: 'solid',
                                borderRadius: `${styling.thankYouPage.button.borderRadius}px`,
                                fontSize: `${styling.thankYouPage.button.fontSize}px`,
                                fontFamily: styling.thankYouPage.button.fontFamily,
                                fontWeight: styling.thankYouPage.button.fontStyleBold ? 'bold' : 'normal',
                                fontStyle: styling.thankYouPage.button.fontStyleItalic ? 'italic' : 'normal',
                                textDecoration: styling.thankYouPage.button.fontStyleUnderline ? 'underline' : 'none',
                                marginTop: `${styling.thankYouPage.button.marginTop}px`,
                                marginBottom: `${styling.thankYouPage.button.marginBottom}px`,
                                marginLeft: `${styling.thankYouPage.button.marginLeft}px`,
                                marginRight: `${styling.thankYouPage.button.marginRight}px`,
                              }}
                            >
                              {content.thankYou.ctaText}
                            </button>
                          </div>

                          {/* Back link */}
                          <div className="preview-nav-aux">
                            <button 
                              type="button"
                              id="preview-thankyou-back-btn"
                              className="preview-nav-aux-btn"
                              onClick={() => {
                                setShowThankYou(false);
                                setCurrentQIdx(content.questions.length - 1);
                                setSelectedOpt("");
                              }}
                            >
                              <ChevronLeft size={14} /> Back to Survey
                            </button>
                          </div>

                        </div>
                      )}
                      
                    </div>
                  </div>
                ) : (
                  /* Loading indicator waiting for Delay */
                  <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#fff' }}>
                    <div className="logo-icon" style={{ animation: 'spin 1.5s linear infinite' }}>
                      <HelpCircle size={18} />
                    </div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Delaying entrance...</span>
                  </div>
                )}
              </>
            ) : (
              /* Closed Survey Overlay View */
              <div className="closed-survey-overlay">
                <div style={{ color: styling.selectedOption.borderColor, marginBottom: '8px' }}>
                  <CheckCircle size={40} />
                </div>
                <h3 className="closed-survey-title">Survey Finished / Closed</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                  The survey popup has closed successfully. You can replay to test your user flow.
                </p>
                <button
                  type="button"
                  id="preview-replay-btn"
                  className="replay-survey-btn"
                  style={{
                    backgroundColor: styling.ctaButton.bgColor
                  }}
                  onClick={handleReset}
                >
                  <Play size={12} /> Replay Survey
                </button>
              </div>
            )}
            
          </div>
          
          {/* Redirect Notice Overlay inside phone */}
          {redirectAlert && (
            <div className="redirect-notice-alert">
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              <span>{redirectAlert}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
