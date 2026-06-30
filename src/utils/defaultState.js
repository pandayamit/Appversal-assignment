// Default campaign configuration state and preset themes.

export const DEFAULT_CONTENT = {
  numPages: 1,
  questions: [
    {
      id: "q-1",
      title: "How satisfied are you with our product?",
      description: "Please rate your overall experience below. Your feedback helps us improve.",
      options: [
        "Extremely Satisfied",
        "Somewhat Satisfied",
        "Neutral",
        "Dissatisfied"
      ],
      allowComments: true,
      commentsPlaceholder: "Tell us more about your experience...",
      logic: {
        enabled: false,
        triggerOption: "",
        action: "next", // 'next' | 'thankyou' | 'redirect' | 'question'
        targetQuestionId: "",
        redirectUrl: ""
      },
      submitText: "Next Question"
    }
  ],
  thankYou: {
    enabled: true,
    mediaUrl: "", // Blank initially, can be user uploaded
    mediaType: "image", // 'image' | 'video'
    title: "Thank You for Your Feedback!",
    subtitle: "We appreciate your time. Your answers have been recorded successfully.",
    ctaText: "Return to Homepage",
    redirectUrl: "https://google.com"
  }
};

export const DEFAULT_STYLING = {
  // General Appearance
  appearance: {
    bgColor: "#0f172a", // Slate 900
    opacity: 80, // Slider (0 - 100)
    surveyBg: "#1e293b", // Slate 800
    borderRadiusTL: 16,
    borderRadiusTR: 16,
    borderRadiusBL: 16,
    borderRadiusBR: 16,
    delay: 0.5, // Entry delay in seconds
    entranceAnimation: "slide-up" // 'slide-up' | 'fade-in' | 'scale-in'
  },
  
  // Question Title
  questionTitle: {
    color: "#f8fafc",
    fontFamily: "Outfit",
    fontSize: 20,
    fontWeight: "600",
    fontStyleBold: true,
    fontStyleItalic: false,
    fontStyleUnderline: false,
    alignment: "left",
    marginTop: 0,
    marginBottom: 8,
    marginLeft: 0,
    marginRight: 0
  },

  // Subtitle
  subtitle: {
    color: "#94a3b8", // Slate 400
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    fontStyleBold: false,
    fontStyleItalic: false,
    fontStyleUnderline: false,
    alignment: "left",
    marginTop: 0,
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0
  },

  // Option List Style
  optionList: {
    layout: "radio", // 'radio' | 'checkbox' | 'filled' | 'alternative' (2-column layout)
    height: 44,
    bulletSpacing: 10,
    optionSpacing: 10,
    borderRadius: 8
  },

  // Selected Option Styling
  selectedOption: {
    borderColor: "#6366f1", // Indigo 500
    textColor: "#ffffff",
    bgColor: "#312e81", // Indigo 900
    borderWidth: 2,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    fontStyleBold: false,
    fontStyleItalic: false,
    fontStyleUnderline: false,
    alignment: "left"
  },

  // Unselected Option Styling
  unselectedOption: {
    borderColor: "#334155", // Slate 700
    textColor: "#cbd5e1", // Slate 300
    bgColor: "#1e293b", // Slate 800
    borderWidth: 1,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    fontStyleBold: false,
    fontStyleItalic: false,
    fontStyleUnderline: false,
    alignment: "left"
  },

  // Additional Comment Styling
  additionalComment: {
    borderColor: "#334155",
    textColor: "#f8fafc",
    bgColor: "#0f172a", // Slate 900
    borderWidth: 1,
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "400",
    fontStyleBold: false,
    fontStyleItalic: false,
    fontStyleUnderline: false,
    alignment: "left"
  },

  // CTA Button Styling
  ctaButton: {
    occupyFullWidth: true,
    borderColor: "#4f46e5",
    textColor: "#ffffff",
    bgColor: "#4f46e5", // Indigo 600
    fontFamily: "Outfit",
    fontSize: 15,
    fontStyleBold: true,
    fontStyleItalic: false,
    fontStyleUnderline: false,
    height: 44,
    width: 140,
    borderWidth: 0,
    borderRadiusTL: 8,
    borderRadiusTR: 8,
    borderRadiusBL: 8,
    borderRadiusBR: 8,
    alignment: "center",
    marginTop: 18,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0
  },

  // Cross Button Styling
  crossButton: {
    enabled: true,
    style: "circle", // 'circle' | 'transparent' | 'square' | 'pill'
    customIcon: "",
    crossColor: "#94a3b8",
    fillColor: "#334155",
    strokeColor: "#475569",
    size: 28,
    marginTop: 12,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 12
  },

  // Thank You Page Styling
  thankYouPage: {
    title: {
      color: "#f8fafc",
      fontFamily: "Outfit",
      fontSize: 22,
      fontStyleBold: true,
      fontStyleItalic: false,
      fontStyleUnderline: false,
      alignment: "center",
      marginTop: 16,
      marginBottom: 8,
      marginLeft: 0,
      marginRight: 0
    },
    subtitle: {
      color: "#94a3b8",
      fontFamily: "Inter",
      fontSize: 14,
      fontStyleBold: false,
      fontStyleItalic: false,
      fontStyleUnderline: false,
      alignment: "center",
      marginTop: 0,
      marginBottom: 16,
      marginLeft: 0,
      marginRight: 0
    },
    image: {
      width: 100, // percentage
      height: 140, // px
      marginTop: 10,
      marginBottom: 16,
      marginLeft: 0,
      marginRight: 0
    },
    button: {
      occupyFullWidth: true,
      borderColor: "#22c55e",
      textColor: "#ffffff",
      bgColor: "#22c55e", // Green 500
      fontFamily: "Outfit",
      fontSize: 15,
      fontStyleBold: true,
      fontStyleItalic: false,
      fontStyleUnderline: false,
      height: 44,
      width: 150,
      borderWidth: 0,
      borderRadius: 8,
      alignment: "center",
      marginTop: 16,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
    }
  }
};

export const PRESETS = [
  {
    name: "Neon Dream",
    description: "Sleek synthwave look with glowing neon pink & cyan",
    styling: {
      ...DEFAULT_STYLING,
      appearance: {
        bgColor: "#9f7ace", // Dark violet-blue
        opacity: 90,
        surveyBg: "#9178ba", // Very dark purple
        borderRadiusTL: 24,
        borderRadiusTR: 4,
        borderRadiusBL: 4,
        borderRadiusBR: 24,
        delay: 0.5,
        entranceAnimation: "scale-in"
      },
      questionTitle: {
        ...DEFAULT_STYLING.questionTitle,
        color: "#f43f5e", // Rose 500 (Neon pink)
        fontFamily: "Outfit",
        fontSize: 21,
        alignment: "center"
      },
      subtitle: {
        ...DEFAULT_STYLING.subtitle,
        color: "#c084fc", // Purple 400
        fontFamily: "Inter",
        alignment: "center"
      },
      optionList: {
        ...DEFAULT_STYLING.optionList,
        layout: "filled",
        borderRadius: 12
      },
      selectedOption: {
        ...DEFAULT_STYLING.selectedOption,
        borderColor: "#06b6d4", // Cyan 500
        textColor: "#ffffff",
        bgColor: "#083344", // Cyan 950
        borderWidth: 2
      },
      unselectedOption: {
        ...DEFAULT_STYLING.unselectedOption,
        borderColor: "#3b0764", // Purple 950
        textColor: "#a21caf", // Magenta
        bgColor: "#1e1135",
        borderWidth: 1
      },
      ctaButton: {
        ...DEFAULT_STYLING.ctaButton,
        bgColor: "#d946ef", // Fuchsia 500
        borderColor: "#d946ef",
        borderRadiusTL: 12,
        borderRadiusTR: 12,
        borderRadiusBL: 12,
        borderRadiusBR: 12
      },
      crossButton: {
        ...DEFAULT_STYLING.crossButton,
        crossColor: "#f43f5e",
        fillColor: "#1a0b2e",
        strokeColor: "#3b0764"
      },
      thankYouPage: {
        ...DEFAULT_STYLING.thankYouPage,
        title: {
          ...DEFAULT_STYLING.thankYouPage.title,
          color: "#f43f5e",
          alignment: "center"
        },
        subtitle: {
          ...DEFAULT_STYLING.thankYouPage.subtitle,
          color: "#c084fc",
          alignment: "center"
        },
        button: {
          ...DEFAULT_STYLING.thankYouPage.button,
          bgColor: "#06b6d4",
          borderColor: "#06b6d4"
        }
      }
    }
  },
  {
    name: "Minimal Glass",
    description: "Sleek translucent aesthetic with sharp borders",
    styling: {
      ...DEFAULT_STYLING,
      appearance: {
        bgColor: "#000000",
        opacity: 60,
        surveyBg: "#111111",
        borderRadiusTL: 0,
        borderRadiusTR: 0,
        borderRadiusBL: 0,
        borderRadiusBR: 0,
        delay: 0.3,
        entranceAnimation: "fade-in"
      },
      questionTitle: {
        ...DEFAULT_STYLING.questionTitle,
        color: "#ffffff",
        fontFamily: "Fira Code",
        fontSize: 18,
        fontWeight: "400",
        fontStyleBold: false
      },
      subtitle: {
        ...DEFAULT_STYLING.subtitle,
        color: "#888888",
        fontFamily: "Fira Code",
        fontSize: 13
      },
      optionList: {
        ...DEFAULT_STYLING.optionList,
        layout: "radio",
        borderRadius: 0
      },
      selectedOption: {
        ...DEFAULT_STYLING.selectedOption,
        borderColor: "#ffffff",
        textColor: "#ffffff",
        bgColor: "#222222",
        borderWidth: 1,
        fontFamily: "Fira Code"
      },
      unselectedOption: {
        ...DEFAULT_STYLING.unselectedOption,
        borderColor: "#333333",
        textColor: "#888888",
        bgColor: "#000000",
        borderWidth: 1,
        fontFamily: "Fira Code"
      },
      ctaButton: {
        ...DEFAULT_STYLING.ctaButton,
        bgColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadiusTL: 0,
        borderRadiusTR: 0,
        borderRadiusBL: 0,
        borderRadiusBR: 0,
        fontFamily: "Fira Code"
      },
      crossButton: {
        ...DEFAULT_STYLING.crossButton,
        style: "square",
        crossColor: "#ffffff",
        fillColor: "#000000",
        strokeColor: "#333333"
      },
      thankYouPage: {
        ...DEFAULT_STYLING.thankYouPage,
        title: {
          ...DEFAULT_STYLING.thankYouPage.title,
          color: "#ffffff",
          fontFamily: "Fira Code"
        },
        subtitle: {
          ...DEFAULT_STYLING.thankYouPage.subtitle,
          color: "#888888",
          fontFamily: "Fira Code"
        },
        button: {
          ...DEFAULT_STYLING.thankYouPage.button,
          bgColor: "#ffffff",
          textColor: "#000000",
          borderColor: "#ffffff",
          borderRadius: 0,
          fontFamily: "Fira Code"
        }
      }
    }
  },
  {
    name: "Golden Sunset",
    description: "Cozy warm ochres and serif header typography",
    styling: {
      ...DEFAULT_STYLING,
      appearance: {
        bgColor: "#451a03", // Deep warm brown
        opacity: 75,
        surveyBg: "#fffbeb", // Amber 50
        borderRadiusTL: 20,
        borderRadiusTR: 20,
        borderRadiusBL: 20,
        borderRadiusBR: 20,
        delay: 0.5,
        entranceAnimation: "slide-up"
      },
      questionTitle: {
        ...DEFAULT_STYLING.questionTitle,
        color: "#78350f", // Amber 900
        fontFamily: "Playfair Display",
        fontSize: 22,
        alignment: "center"
      },
      subtitle: {
        ...DEFAULT_STYLING.subtitle,
        color: "#b45309", // Amber 700
        fontFamily: "Inter",
        alignment: "center"
      },
      optionList: {
        ...DEFAULT_STYLING.optionList,
        layout: "alternative",
        borderRadius: 10
      },
      selectedOption: {
        ...DEFAULT_STYLING.selectedOption,
        borderColor: "#b45309",
        textColor: "#78350f",
        bgColor: "#fde68a", // Amber 200
        borderWidth: 2
      },
      unselectedOption: {
        ...DEFAULT_STYLING.unselectedOption,
        borderColor: "#f59e0b",
        textColor: "#d97706",
        bgColor: "#ffffff",
        borderWidth: 1
      },
      ctaButton: {
        ...DEFAULT_STYLING.ctaButton,
        bgColor: "#b45309",
        textColor: "#ffffff",
        borderColor: "#b45309",
        borderRadiusTL: 20,
        borderRadiusTR: 20,
        borderRadiusBL: 20,
        borderRadiusBR: 20
      },
      crossButton: {
        ...DEFAULT_STYLING.crossButton,
        crossColor: "#b45309",
        fillColor: "#fef3c7",
        strokeColor: "#f59e0b"
      },
      thankYouPage: {
        ...DEFAULT_STYLING.thankYouPage,
        title: {
          ...DEFAULT_STYLING.thankYouPage.title,
          color: "#78350f",
          fontFamily: "Playfair Display"
        },
        subtitle: {
          ...DEFAULT_STYLING.thankYouPage.subtitle,
          color: "#b45309"
        },
        button: {
          ...DEFAULT_STYLING.thankYouPage.button,
          bgColor: "#b45309",
          borderColor: "#b45309"
        }
      }
    }
  },
  {
    name: "Forest Fresh",
    description: "Clean organic green layout with Outfit typography",
    styling: {
      ...DEFAULT_STYLING,
      appearance: {
        bgColor: "#022c22", // Emerald 950
        opacity: 85,
        surveyBg: "#f0fdf4", // Emerald 50
        borderRadiusTL: 12,
        borderRadiusTR: 12,
        borderRadiusBL: 12,
        borderRadiusBR: 12,
        delay: 0.4,
        entranceAnimation: "slide-up"
      },
      questionTitle: {
        ...DEFAULT_STYLING.questionTitle,
        color: "#064e3b", // Emerald 900
        fontFamily: "Outfit",
        fontSize: 20,
        alignment: "left"
      },
      subtitle: {
        ...DEFAULT_STYLING.subtitle,
        color: "#047857", // Emerald 700
        fontFamily: "Inter",
        alignment: "left"
      },
      optionList: {
        ...DEFAULT_STYLING.optionList,
        layout: "radio",
        borderRadius: 8
      },
      selectedOption: {
        ...DEFAULT_STYLING.selectedOption,
        borderColor: "#059669",
        textColor: "#064e3b",
        bgColor: "#d1fae5", // Emerald 100
        borderWidth: 2
      },
      unselectedOption: {
        ...DEFAULT_STYLING.unselectedOption,
        borderColor: "#a7f3d0",
        textColor: "#065f46",
        bgColor: "#ffffff",
        borderWidth: 1
      },
      ctaButton: {
        ...DEFAULT_STYLING.ctaButton,
        bgColor: "#059669",
        borderColor: "#059669",
        borderRadiusTL: 6,
        borderRadiusTR: 6,
        borderRadiusBL: 6,
        borderRadiusBR: 6
      },
      crossButton: {
        ...DEFAULT_STYLING.crossButton,
        crossColor: "#059669",
        fillColor: "#d1fae5",
        strokeColor: "#34d399"
      },
      thankYouPage: {
        ...DEFAULT_STYLING.thankYouPage,
        title: {
          ...DEFAULT_STYLING.thankYouPage.title,
          color: "#064e3b"
        },
        subtitle: {
          ...DEFAULT_STYLING.thankYouPage.subtitle,
          color: "#047857"
        },
        button: {
          ...DEFAULT_STYLING.thankYouPage.button,
          bgColor: "#059669",
          borderColor: "#059669",
          borderRadius: 6
        }
      }
    }
  }
];
