/* @ds-bundle: {"format":3,"namespace":"OffTheRecordDesignSystem_6eff96","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Link","sourcePath":"components/actions/Link.jsx"},{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"CalloutCard","sourcePath":"components/disclosure/CalloutCard.jsx"},{"name":"PromoCard","sourcePath":"components/disclosure/PromoCard.jsx"},{"name":"Skeleton","sourcePath":"components/disclosure/Skeleton.jsx"},{"name":"SkeletonCard","sourcePath":"components/disclosure/Skeleton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Rating","sourcePath":"components/display/Rating.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"StepProgress","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"FeatureIcon","sourcePath":"components/icons/FeatureIcon.jsx"},{"name":"ICON_DATA","sourcePath":"components/icons/icon-data.js"},{"name":"FA_FALLBACK","sourcePath":"components/icons/icon-data.js"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"DropdownMenu","sourcePath":"components/navigation/DropdownMenu.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"AttorneyCard","sourcePath":"components/product/AttorneyCard.jsx"},{"name":"CourtCard","sourcePath":"components/product/CourtCard.jsx"},{"name":"PaymentLineItems","sourcePath":"components/product/PaymentLineItems.jsx"},{"name":"PaymentMethodSelector","sourcePath":"components/product/PaymentMethodSelector.jsx"},{"name":"PaymentPlanPicker","sourcePath":"components/product/PaymentPlanPicker.jsx"},{"name":"QuoteCard","sourcePath":"components/product/QuoteCard.jsx"},{"name":"PhotoUpload","sourcePath":"components/selection/PhotoUpload.jsx"},{"name":"SegmentedControl","sourcePath":"components/selection/SegmentedControl.jsx"},{"name":"SelectionCard","sourcePath":"components/selection/SelectionCard.jsx"},{"name":"Stepper","sourcePath":"components/selection/Stepper.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"4a077dc7eef9","components/actions/Link.jsx":"c9abebd6b0a7","components/disclosure/Accordion.jsx":"00851892b984","components/disclosure/CalloutCard.jsx":"5bf3afc16663","components/disclosure/PromoCard.jsx":"057344d464b0","components/disclosure/Skeleton.jsx":"09f128d16f19","components/display/Avatar.jsx":"1720fc56db51","components/display/Badge.jsx":"7d6166ccd0a4","components/display/Card.jsx":"218e4dfe2e2c","components/display/Rating.jsx":"24cf41bd4361","components/display/Tag.jsx":"9c7ee316b914","components/feedback/Banner.jsx":"9370c0106f28","components/feedback/Modal.jsx":"2a339b8e646c","components/feedback/ProgressBar.jsx":"ff5be6f32682","components/feedback/Toast.jsx":"632437954cf6","components/feedback/Tooltip.jsx":"acb4ea87b38d","components/forms/Checkbox.jsx":"2dff709cbfc1","components/forms/Input.jsx":"373cfc378ea2","components/forms/Radio.jsx":"73a18b855e44","components/forms/Select.jsx":"90024e532c91","components/forms/Textarea.jsx":"6f09167aa516","components/forms/Toggle.jsx":"dbff6050aa3f","components/icons/FeatureIcon.jsx":"d26a643c2f52","components/icons/icon-data.js":"d48be01bb89e","components/navigation/BottomNav.jsx":"25759787c2d9","components/navigation/Breadcrumbs.jsx":"063bcc97e6bc","components/navigation/DropdownMenu.jsx":"5c0cacb97538","components/navigation/NavBar.jsx":"fb640d3b43d6","components/navigation/Pagination.jsx":"f2aaae1a942f","components/navigation/Tabs.jsx":"c80647cc998d","components/product/AttorneyCard.jsx":"01607a760dbd","components/product/CourtCard.jsx":"244c56d94dad","components/product/PaymentLineItems.jsx":"3fe0a9a2a558","components/product/PaymentMethodSelector.jsx":"b2b394096648","components/product/PaymentPlanPicker.jsx":"bc6a022ff170","components/product/QuoteCard.jsx":"3dc7ebb52069","components/selection/PhotoUpload.jsx":"a7bfc2dfc21a","components/selection/SegmentedControl.jsx":"b93eac776a45","components/selection/SelectionCard.jsx":"14a59891fe2a","components/selection/Stepper.jsx":"e7c8e92c7b18","ui_kits/client-app/screens.jsx":"f1e5f37ff6b2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OffTheRecordDesignSystem_6eff96 = window.OffTheRecordDesignSystem_6eff96 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Off The Record — Button
 * Pill-shaped action button. Primary = brand blue, white label.
 */
const SIZES = {
  xs: {
    height: 32,
    padFp: '0 12px',
    padIcon: '0 12px',
    font: 14,
    gap: 6,
    icon: 18
  },
  sm: {
    height: 36,
    padFp: '0 14px',
    padIcon: '0 14px',
    font: 14,
    gap: 6,
    icon: 18
  },
  md: {
    height: 40,
    padFp: '0 18px',
    padIcon: '0 16px',
    font: 16,
    gap: 8,
    icon: 20
  },
  lg: {
    height: 44,
    padFp: '0 20px',
    padIcon: '0 18px',
    font: 16,
    gap: 8,
    icon: 20
  },
  xl: {
    height: 48,
    padFp: '0 24px',
    padIcon: '0 22px',
    font: 18,
    gap: 8,
    icon: 22
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--brand-primary)',
    color: 'var(--text-on-brand)',
    border: '1px solid var(--brand-primary)',
    boxShadow: 'var(--shadow-xs)',
    hoverBg: 'var(--brand-primary-hover)',
    hoverBorder: 'var(--brand-primary-hover)'
  },
  secondary: {
    background: 'var(--white)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-primary)',
    boxShadow: 'var(--shadow-xs)',
    hoverBg: 'var(--neutral-50)',
    hoverBorder: 'var(--border-strong)'
  },
  tertiary: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent',
    boxShadow: 'none',
    hoverBg: 'var(--neutral-50)',
    hoverBorder: 'transparent'
  },
  accent: {
    background: 'var(--coral-600)',
    color: 'var(--white)',
    border: '1px solid var(--coral-600)',
    boxShadow: 'var(--shadow-xs)',
    hoverBg: 'var(--coral-700)',
    hoverBorder: 'var(--coral-700)'
  },
  destructive: {
    background: 'var(--red-600)',
    color: 'var(--white)',
    border: '1px solid var(--red-600)',
    boxShadow: 'var(--shadow-xs)',
    hoverBg: 'var(--red-700)',
    hoverBorder: 'var(--red-700)'
  },
  link: {
    background: 'transparent',
    color: 'var(--text-link)',
    border: '1px solid transparent',
    boxShadow: 'none',
    hoverBg: 'transparent',
    hoverBorder: 'transparent'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const isDisabled = disabled || loading;
  const showHover = hover && !isDisabled;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: iconOnly ? 0 : iconLeft || iconRight ? s.padIcon : s.padFp,
    minWidth: iconOnly ? s.height : undefined,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    borderRadius: 'var(--radius-full)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'background 120ms ease, border-color 120ms ease, transform 80ms ease, box-shadow 120ms ease',
    whiteSpace: 'nowrap',
    textDecoration: variant === 'link' ? 'underline' : 'none',
    background: showHover ? v.hoverBg : v.background,
    color: v.color,
    border: showHover ? `1px solid ${v.hoverBorder}` : v.border,
    boxShadow: v.boxShadow,
    opacity: isDisabled ? 0.5 : 1,
    transform: showHover && variant !== 'link' ? 'translateY(-0.5px)' : 'none',
    ...style
  };
  const iconStyle = {
    width: s.icon,
    height: s.icon,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: isDisabled,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), loading && /*#__PURE__*/React.createElement(Spinner, {
    size: s.icon
  }), !loading && iconLeft && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, iconLeft), !iconOnly && /*#__PURE__*/React.createElement("span", null, children), iconOnly && !iconLeft && !loading && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, iconRight || children), !loading && !iconOnly && iconRight && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, iconRight));
}
function Spinner({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      display: 'inline-block',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      animation: 'ds-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeOpacity: "0.25",
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 0-9-9",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("style", null, '@keyframes ds-spin{to{transform:rotate(360deg)}}'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/Link.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Off The Record — Link. Brand-blue, underlined, with optional icon. */
function Link({
  children,
  href = '#',
  color = 'brand',
  underline = true,
  iconRight,
  iconLeft,
  size = 'md',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const palette = {
    brand: ['var(--text-link)', 'var(--blue-800)'],
    gray: ['var(--text-secondary)', 'var(--text-primary)'],
    error: ['var(--text-error)', 'var(--red-800)']
  }[color] || ['var(--text-link)', 'var(--blue-800)'];
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: size === 'sm' ? 14 : 16,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
      color: hover ? palette[1] : palette[0],
      textDecoration: underline ? 'underline' : 'none',
      textUnderlineOffset: 2,
      cursor: 'pointer',
      transition: 'color 120ms ease',
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Link });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Link.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Accordion.jsx
try { (() => {
/** Off The Record — Accordion (FAQ disclosure). */
function Accordion({
  items = [],
  allowMultiple = false,
  style = {}
}) {
  const [open, setOpen] = React.useState(() => new Set());
  const toggle = i => setOpen(prev => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i);else next.add(i);
    return next;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map((it, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: i ? '1px solid var(--border-secondary)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      "aria-expanded": isOpen,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '18px 20px',
        border: 'none',
        background: isOpen ? 'var(--neutral-25)' : '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 16,
        color: 'var(--text-primary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.q), /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-chevron-down",
      style: {
        fontSize: 14,
        color: 'var(--icon-secondary)',
        transform: isOpen ? 'rotate(180deg)' : 'none',
        transition: 'transform 180ms ease'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 400 : 0,
        overflow: 'hidden',
        transition: 'max-height 220ms ease'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px 18px',
        fontSize: 15,
        lineHeight: '22px',
        color: 'var(--text-tertiary)'
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/CalloutCard.jsx
try { (() => {
/** Off The Record — CalloutCard. Tinted info/promo block with icon, copy, optional CTA. */
const TONES = {
  brand: ['var(--blue-50)', 'var(--blue-200)', 'var(--blue-600)', 'var(--blue-900)'],
  purple: ['var(--purple-50)', 'var(--purple-200)', 'var(--purple-600)', 'var(--purple-900)'],
  coral: ['var(--coral-50)', 'var(--coral-200)', 'var(--coral-700)', 'var(--coral-900)'],
  neutral: ['var(--neutral-25)', 'var(--border-secondary)', 'var(--neutral-700)', 'var(--text-primary)']
};
function CalloutCard({
  tone = 'brand',
  icon,
  title,
  children,
  action,
  style = {}
}) {
  const t = TONES[tone] || TONES.brand;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      padding: 18,
      background: t[0],
      border: `1px solid ${t[1]}`,
      borderRadius: 'var(--radius-2xl)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      flexShrink: 0,
      borderRadius: 'var(--radius-lg)',
      background: '#fff',
      color: t[2],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      boxShadow: 'var(--shadow-xs)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: t[3]
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-secondary)',
      marginTop: title ? 4 : 0
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, action)));
}
Object.assign(__ds_scope, { CalloutCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/CalloutCard.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/PromoCard.jsx
try { (() => {
/** Off The Record — PromoCard. Bold full-color marketing card (e.g. Fastlane upsell). */
function PromoCard({
  eyebrow,
  title,
  children,
  cta,
  background = 'var(--blue-600)',
  accent = 'var(--coral-500)',
  icon,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 24,
      borderRadius: 'var(--radius-3xl)',
      background,
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -40,
      right: -40,
      width: 160,
      height: 160,
      borderRadius: '50%',
      background: accent,
      opacity: 0.18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: 'rgba(255,255,255,0.18)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)'
    }
  }, icon, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      lineHeight: 1.2,
      marginTop: 12
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: '22px',
      opacity: 0.9,
      marginTop: 8,
      maxWidth: 420
    }
  }, children), cta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, cta)));
}
Object.assign(__ds_scope, { PromoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/PromoCard.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Skeleton.jsx
try { (() => {
/** Off The Record — Skeleton loading placeholder. */
function Skeleton({
  width = '100%',
  height = 16,
  radius = 'var(--radius-md)',
  circle = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: circle ? height : width,
      height,
      borderRadius: circle ? '50%' : radius,
      background: 'linear-gradient(90deg, var(--neutral-100) 25%, var(--neutral-50) 50%, var(--neutral-100) 75%)',
      backgroundSize: '200% 100%',
      animation: 'ds-shimmer 1.4s ease-in-out infinite',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes ds-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}'));
}

/** Pre-composed skeleton for an attorney/list card. */
function SkeletonCard({
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      padding: 16,
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-2xl)',
      background: '#fff',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    circle: true,
    height: 56
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    width: "55%",
    height: 16
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: "40%",
    height: 13
  }), /*#__PURE__*/React.createElement(Skeleton, {
    width: "70%",
    height: 13,
    style: {
      marginTop: 6
    }
  })));
}
Object.assign(__ds_scope, { Skeleton, SkeletonCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
/** Off The Record — Avatar. Photo, initials, or placeholder; optional status dot. */
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  '2xl': 64
};
const STATUS = {
  online: 'var(--green-500)',
  busy: 'var(--red-500)',
  away: 'var(--amber-400)',
  offline: 'var(--neutral-300)'
};
function Avatar({
  src,
  name = '',
  size = 'md',
  status,
  ring = false,
  style = {}
}) {
  const dim = SIZES[size] || 40;
  const initials = name.split(' ').map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const dot = Math.max(8, Math.round(dim * 0.28));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: dim,
      height: dim,
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'var(--neutral-100)' : 'var(--blue-50)',
      color: 'var(--blue-700)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: Math.round(dim * 0.4),
      border: ring ? '2px solid var(--white)' : '1px solid rgba(16,24,40,0.08)',
      boxShadow: ring ? 'var(--shadow-sm)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-user",
    style: {
      fontSize: Math.round(dim * 0.42),
      color: 'var(--blue-400)'
    }
  })), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: dot,
      height: dot,
      borderRadius: '50%',
      background: STATUS[status] || STATUS.offline,
      border: '2px solid var(--white)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
/**
 * Off The Record — Badge
 * Two-axis system:
 *   • intent   — what it MEANS (semantic colour)
 *   • emphasis — how LOUD it is (hierarchy)
 *
 * Intent → colour:
 *   neutral  gray    · non-semantic categories, defaults
 *   info     blue    · in-progress / informational status
 *   success  green   · positive outcome (dismissed, paid)
 *   warning  amber   · needs attention soon (court date set)
 *   error    red     · critical / action required
 *   premium  purple  · membership / account tier
 *   promo    coral   · marketing / savings / upsell
 *
 * Emphasis:
 *   subtle (default) — tinted, low-noise; for passive at-a-glance status
 *   solid            — filled, high-noise; reserve for urgent or promotional
 *
 * Legacy `color` (gray|brand|success|warning|error|purple|coral|pink) and
 * `variant` (soft|solid) still work as aliases.
 *
 * All colour pairings meet WCAG AA (≥4.5:1). Light/vibrant solids (amber, coral)
 * take dark ink text; darker solids take white.
 */
const COLORS = {
  gray: {
    soft: ['var(--neutral-50)', 'var(--neutral-700)', 'var(--neutral-200)'],
    solid: ['var(--neutral-700)', '#fff'],
    dot: 'var(--neutral-500)'
  },
  brand: {
    soft: ['var(--blue-50)', 'var(--blue-700)', 'var(--blue-200)'],
    solid: ['var(--blue-600)', '#fff'],
    dot: 'var(--blue-600)'
  },
  success: {
    soft: ['var(--green-50)', 'var(--green-700)', 'var(--green-200)'],
    solid: ['var(--green-700)', '#fff'],
    dot: 'var(--green-500)'
  },
  warning: {
    soft: ['var(--amber-50)', 'var(--amber-700)', 'var(--amber-200)'],
    solid: ['var(--amber-400)', 'var(--neutral-950)'],
    dot: 'var(--amber-500)'
  },
  error: {
    soft: ['var(--red-50)', 'var(--red-700)', 'var(--red-200)'],
    solid: ['var(--red-600)', '#fff'],
    dot: 'var(--red-500)'
  },
  purple: {
    soft: ['var(--purple-50)', 'var(--purple-700)', 'var(--purple-200)'],
    solid: ['var(--purple-600)', '#fff'],
    dot: 'var(--purple-500)'
  },
  coral: {
    soft: ['var(--coral-50)', 'var(--coral-700)', 'var(--coral-200)'],
    solid: ['var(--coral-500)', 'var(--neutral-950)'],
    dot: 'var(--coral-600)'
  },
  pink: {
    soft: ['var(--pink-50)', 'var(--pink-700)', 'var(--pink-200)'],
    solid: ['var(--pink-600)', '#fff'],
    dot: 'var(--pink-500)'
  }
};

// Semantic intent → base colour. This is the recommended API.
const INTENT_COLOR = {
  neutral: 'gray',
  info: 'brand',
  success: 'success',
  warning: 'warning',
  error: 'error',
  premium: 'purple',
  promo: 'coral'
};
const SIZES = {
  sm: {
    font: 12,
    pad: '2px 8px',
    dot: 6,
    h: 20
  },
  md: {
    font: 14,
    pad: '2px 10px',
    dot: 8,
    h: 24
  },
  lg: {
    font: 14,
    pad: '4px 12px',
    dot: 8,
    h: 28
  }
};
function Badge({
  children,
  intent,
  color,
  emphasis,
  variant,
  size = 'md',
  dot = false,
  icon = null,
  style = {}
}) {
  // intent is preferred; color is the legacy alias; default neutral/gray.
  const colorKey = color || INTENT_COLOR[intent] || 'gray';
  const c = COLORS[colorKey] || COLORS.gray;
  const s = SIZES[size] || SIZES.md;
  const solid = (emphasis || variant) === 'solid';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: s.h,
      padding: s.pad,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: s.font,
      lineHeight: 1,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      borderRadius: 'var(--radius-full)',
      background: solid ? c.solid[0] : c.soft[0],
      color: solid ? c.solid[1] : c.soft[1],
      border: solid ? '1px solid transparent' : `1px solid ${c.soft[2]}`,
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dot,
      height: s.dot,
      borderRadius: '50%',
      background: solid ? c.solid[1] : c.dot,
      flexShrink: 0
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: s.font,
      flexShrink: 0
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Off The Record — Card. White surface with soft border + lift. Optional hover/clickable. */
function Card({
  children,
  padding = 20,
  interactive = false,
  selected = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: `1px solid ${selected ? 'var(--brand-primary)' : 'var(--border-secondary)'}`,
      borderRadius: 'var(--radius-2xl)',
      boxShadow: selected ? 'var(--focus-ring)' : interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-card)',
      padding,
      transition: 'box-shadow 140ms ease, border-color 140ms ease, transform 140ms ease',
      transform: interactive && hover ? 'translateY(-2px)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Rating.jsx
try { (() => {
/** Off The Record — Star rating display (Google-style reviews). */
function Rating({
  value = 0,
  max = 5,
  size = 18,
  showValue = false,
  count,
  color = 'var(--amber-400)',
  style = {}
}) {
  const stars = [];
  for (let i = 0; i < max; i++) {
    const fill = Math.max(0, Math.min(1, value - i));
    stars.push(/*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size,
        lineHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--neutral-200)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: `${fill * 100}%`,
        height: '100%',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: color
    }))));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, stars), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-tertiary)'
    }
  }, "(", count.toLocaleString(), ")"));
}
function Star({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: color,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.6l-4.95 2.6.94-5.5-4-3.9 5.53-.8z"
  }));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Rating.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
/** Off The Record — Tag / removable pill (filter chips, selected violations). */
function Tag({
  children,
  color = 'gray',
  size = 'md',
  onRemove,
  icon,
  selected = false,
  onClick,
  style = {}
}) {
  const palettes = {
    gray: ['var(--neutral-50)', 'var(--text-secondary)', 'var(--border-primary)'],
    brand: ['var(--blue-50)', 'var(--blue-700)', 'var(--blue-200)'],
    coral: ['var(--coral-50)', 'var(--coral-700)', 'var(--coral-200)']
  };
  const p = palettes[color] || palettes.gray;
  const s = size === 'sm' ? {
    h: 24,
    font: 13,
    pad: '0 8px'
  } : {
    h: 30,
    font: 14,
    pad: '0 12px'
  };
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: s.h,
      padding: s.pad,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: s.font,
      letterSpacing: '0.01em',
      borderRadius: 'var(--radius-full)',
      background: selected ? 'var(--brand-primary)' : p[0],
      color: selected ? '#fff' : p[1],
      border: `1px solid ${selected ? 'var(--brand-primary)' : p[2]}`,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: s.font
    }
  }, icon), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    "aria-label": "Remove",
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      marginLeft: 2,
      cursor: 'pointer',
      color: 'inherit',
      opacity: 0.7,
      display: 'inline-flex',
      fontSize: s.font
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-xmark"
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
/**
 * Off The Record — Banner (inline alert)
 * Informational / success / warning / error message block with optional actions.
 */
const TONES = {
  info: {
    bg: 'var(--blue-50)',
    border: 'var(--blue-200)',
    icon: 'var(--blue-600)',
    title: 'var(--blue-900)',
    faIcon: 'fa-circle-info'
  },
  success: {
    bg: 'var(--green-50)',
    border: 'var(--green-200)',
    icon: 'var(--green-600)',
    title: 'var(--green-900)',
    faIcon: 'fa-circle-check'
  },
  warning: {
    bg: 'var(--amber-50)',
    border: 'var(--amber-200)',
    icon: 'var(--amber-500)',
    title: 'var(--amber-900)',
    faIcon: 'fa-triangle-exclamation'
  },
  error: {
    bg: 'var(--red-50)',
    border: 'var(--red-200)',
    icon: 'var(--red-600)',
    title: 'var(--red-900)',
    faIcon: 'fa-circle-exclamation'
  }
};
function Banner({
  tone = 'info',
  title,
  children,
  icon,
  onClose,
  actions,
  style = {}
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: 'flex',
      gap: 12,
      padding: 16,
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 'var(--radius-xl)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.icon,
      fontSize: 20,
      lineHeight: '24px',
      flexShrink: 0
    }
  }, icon || /*#__PURE__*/React.createElement("i", {
    className: `fa-solid ${t.faIcon}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '20px',
      color: t.title
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-secondary)',
      marginTop: title ? 2 : 0
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 12
    }
  }, actions)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--icon-secondary)',
      padding: 2,
      flexShrink: 0,
      fontSize: 16,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-xmark"
  })));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
/** Off The Record — Modal / dialog. Centered card over a dimmed overlay. */
function Modal({
  open = true,
  onClose,
  title,
  children,
  footer,
  icon,
  width = 440,
  showClose = true
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--surface-overlay)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      background: 'var(--white)',
      borderRadius: 'var(--radius-3xl)',
      boxShadow: 'var(--shadow-2xl)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      marginBottom: 8
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--blue-50)',
      color: 'var(--blue-600)',
      fontSize: 20
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-primary)',
      lineHeight: '24px'
    }
  }, title)), showClose && onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--icon-secondary)',
      fontSize: 18,
      padding: 2,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-xmark"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-tertiary)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'flex-end',
      marginTop: 24
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
/** Off The Record — ProgressBar. Linear progress with optional label/percent. */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showPercent = false,
  color = 'var(--brand-primary)',
  size = 'md',
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const h = size === 'sm' ? 6 : size === 'lg' ? 12 : 8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, (label || showPercent) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8,
      fontSize: 14
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, label), showPercent && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-tertiary)'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      borderRadius: 'var(--radius-full)',
      background: 'var(--neutral-100)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-full)',
      background: color,
      transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)'
    }
  })));
}

/** Stepped progress dots/bars for the booking wizard. */
function StepProgress({
  steps = 4,
  current = 1,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      ...style
    }
  }, Array.from({
    length: steps
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: i < current ? 'var(--brand-primary)' : 'var(--neutral-100)',
      transition: 'background 200ms ease'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar, StepProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/** Off The Record — Toast. Compact transient notification with icon + message. */
const TONES = {
  neutral: {
    icon: 'var(--icon-secondary)',
    faIcon: 'fa-bell'
  },
  success: {
    icon: 'var(--green-600)',
    faIcon: 'fa-circle-check'
  },
  error: {
    icon: 'var(--red-600)',
    faIcon: 'fa-circle-exclamation'
  },
  info: {
    icon: 'var(--blue-600)',
    faIcon: 'fa-circle-info'
  }
};
function Toast({
  tone = 'neutral',
  title,
  children,
  icon,
  onClose,
  action,
  style = {}
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      width: 360,
      maxWidth: '100%',
      padding: 16,
      background: 'var(--white)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.icon,
      fontSize: 20,
      lineHeight: '22px',
      flexShrink: 0
    }
  }, icon || /*#__PURE__*/React.createElement("i", {
    className: `fa-solid ${t.faIcon}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-primary)'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--text-tertiary)',
      marginTop: title ? 2 : 0
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, action)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--icon-secondary)',
      padding: 2,
      flexShrink: 0,
      fontSize: 16,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-xmark"
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Off The Record — Tooltip. Dark hover/focus bubble around its child. */
function Tooltip({
  label,
  placement = 'top',
  children,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      mb: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      mt: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      mr: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      ml: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      zIndex: 50,
      pointerEvents: 'none',
      bottom: pos.bottom,
      top: pos.top,
      left: pos.left,
      right: pos.right,
      transform: pos.transform,
      marginBottom: pos.mb,
      marginTop: pos.mt,
      marginLeft: pos.ml,
      marginRight: pos.mr,
      background: 'var(--neutral-900)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: '18px',
      padding: '6px 10px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      whiteSpace: 'nowrap',
      opacity: open ? 1 : 0,
      transition: 'opacity 120ms ease',
      maxWidth: 240
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Off The Record — Checkbox. Square, brand-blue when checked. Supports indeterminate. */
function Checkbox({
  checked = false,
  indeterminate = false,
  label,
  hint,
  disabled = false,
  size = 'md',
  onChange,
  id,
  style = {}
}) {
  const autoId = React.useId ? React.useId() : 'cb';
  const fieldId = id || autoId;
  const dim = size === 'sm' ? 16 : 20;
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: hint ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: dim,
      height: dim,
      flexShrink: 0,
      marginTop: hint ? 2 : 0,
      borderRadius: 'var(--radius-sm)',
      background: on ? 'var(--brand-primary)' : 'var(--white)',
      border: `1px solid ${on ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 120ms ease, border-color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: fieldId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), indeterminate ? /*#__PURE__*/React.createElement("svg", {
    width: dim * 0.6,
    height: dim * 0.6,
    viewBox: "0 0 12 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "5",
    width: "8",
    height: "2",
    rx: "1",
    fill: "#fff"
  })) : checked ? /*#__PURE__*/React.createElement("svg", {
    width: dim * 0.62,
    height: dim * 0.62,
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 3.5L4.75 8.75L2 6",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })) : null), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size === 'sm' ? 14 : 16,
      fontWeight: 500,
      color: 'var(--text-primary)',
      lineHeight: 1.4
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-tertiary)',
      lineHeight: '20px'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Off The Record — Input
 * Labeled text field with helper/error text and optional leading/trailing adornments.
 */
function Input({
  label,
  hint,
  error,
  required = false,
  leading = null,
  trailing = null,
  size = 'md',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'inp';
  const fieldId = id || autoId;
  const heights = {
    sm: 36,
    md: 44,
    lg: 48
  };
  const h = heights[size] || 44;
  const isError = Boolean(error);
  const borderColor = isError ? 'var(--border-error)' : focus ? 'var(--border-focus)' : 'var(--border-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      letterSpacing: '0.01em'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-error)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: h,
      padding: '0 14px',
      background: disabled ? 'var(--surface-disabled)' : 'var(--white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? isError ? '0 0 0 4px rgba(217,45,32,0.18)' : 'var(--focus-ring)' : 'var(--shadow-xs)',
      transition: 'border-color 120ms ease, box-shadow 120ms ease',
      cursor: disabled ? 'not-allowed' : 'text'
    }
  }, leading && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--icon-secondary)',
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--text-primary)',
      minWidth: 0,
      padding: 0
    }
  }, rest)), trailing && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--icon-secondary)',
      flexShrink: 0
    }
  }, trailing)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: isError ? 'var(--text-error)' : 'var(--text-tertiary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Off The Record — Radio button. Round, brand-blue when selected. */
function Radio({
  checked = false,
  label,
  hint,
  disabled = false,
  size = 'md',
  name,
  value,
  onChange,
  id,
  style = {}
}) {
  const autoId = React.useId ? React.useId() : 'rb';
  const fieldId = id || autoId;
  const dim = size === 'sm' ? 16 : 20;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: hint ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: dim,
      height: dim,
      flexShrink: 0,
      marginTop: hint ? 2 : 0,
      borderRadius: '50%',
      background: checked ? 'var(--brand-primary)' : 'var(--white)',
      border: `1px solid ${checked ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 120ms ease, border-color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: fieldId,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim * 0.4,
      height: dim * 0.4,
      borderRadius: '50%',
      background: '#fff'
    }
  })), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size === 'sm' ? 14 : 16,
      fontWeight: 500,
      color: 'var(--text-primary)',
      lineHeight: 1.4
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-tertiary)',
      lineHeight: '20px'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Off The Record — Select. Native dropdown styled to match Input. */
function Select({
  label,
  hint,
  error,
  required = false,
  options = [],
  placeholder,
  size = 'md',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'sel';
  const fieldId = id || autoId;
  const heights = {
    sm: 36,
    md: 44,
    lg: 48
  };
  const h = heights[size] || 44;
  const isError = Boolean(error);
  const borderColor = isError ? 'var(--border-error)' : focus ? 'var(--border-focus)' : 'var(--border-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      letterSpacing: '0.01em'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-error)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: h,
      background: disabled ? 'var(--surface-disabled)' : 'var(--white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--focus-ring)' : 'var(--shadow-xs)',
      transition: 'border-color 120ms ease, box-shadow 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 40px 0 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--icon-secondary)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 7.5L10 12.5L15 7.5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: isError ? 'var(--text-error)' : 'var(--text-tertiary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Off The Record — Textarea (multi-line input) */
function Textarea({
  label,
  hint,
  error,
  required = false,
  rows = 4,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'ta';
  const fieldId = id || autoId;
  const isError = Boolean(error);
  const borderColor = isError ? 'var(--border-error)' : focus ? 'var(--border-focus)' : 'var(--border-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-secondary)',
      letterSpacing: '0.01em'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-error)'
    }
  }, " *")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    disabled: disabled,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      resize: 'vertical',
      padding: '12px 14px',
      background: disabled ? 'var(--surface-disabled)' : 'var(--white)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? isError ? '0 0 0 4px rgba(217,45,32,0.18)' : 'var(--focus-ring)' : 'var(--shadow-xs)',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--text-primary)',
      outline: 'none',
      transition: 'border-color 120ms ease, box-shadow 120ms ease'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '20px',
      color: isError ? 'var(--text-error)' : 'var(--text-tertiary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
/** Off The Record — Toggle / switch. Brand-blue track when on. */
function Toggle({
  checked = false,
  onChange,
  label,
  hint,
  disabled = false,
  size = 'md',
  id,
  style = {}
}) {
  const autoId = React.useId ? React.useId() : 'tg';
  const fieldId = id || autoId;
  const w = size === 'sm' ? 36 : 44;
  const h = size === 'sm' ? 20 : 24;
  const knob = h - 6;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: hint ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      flexShrink: 0,
      marginTop: hint ? 2 : 0,
      borderRadius: 'var(--radius-full)',
      background: checked ? 'var(--brand-primary)' : 'var(--neutral-200)',
      transition: 'background 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: fieldId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? w - knob - 3 : 3,
      width: knob,
      height: knob,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left 160ms cubic-bezier(0.4,0,0.2,1)'
    }
  })), (label || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size === 'sm' ? 14 : 16,
      fontWeight: 500,
      color: 'var(--text-primary)',
      lineHeight: 1.4
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-tertiary)',
      lineHeight: '20px'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/icons/icon-data.js
try { (() => {
/* ============================================================
   Off The Record — Feature icon registry
   Streamline "Flex Solid" style · large feature/native icons.
   157 icons, provided by the OTR team (licensed Streamline set).
   Fills normalized to currentColor so <FeatureIcon> can theme them.
   To add more: drop SVGs in assets/icons/streamline-flex-solid/ and
   regenerate (see that folder's README).
   ============================================================ */
const ICON_DATA = {
  "account-circle-add": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.1161 1.28571C20.1161 0.575633 19.5405 0 18.8304 0C18.1203 0 17.5447 0.575633 17.5447 1.28571V3.88392H14.9464C14.2364 3.88392 13.6607 4.45956 13.6607 5.16963C13.6607 5.87973 14.2364 6.45535 14.9464 6.45535H17.5447V9.05357C17.5447 9.76365 18.1203 10.3393 18.8304 10.3393C19.5405 10.3393 20.1161 9.76365 20.1161 9.05357V6.45535H22.7143C23.4243 6.45535 24 5.87973 24 5.16963C24 4.45956 23.4243 3.88392 22.7143 3.88392H20.1161V1.28571ZM11.5179 5.16963C11.5179 4.50233 11.7085 3.87957 12.0383 3.3528C11.5034 3.29635 10.9458 3.26786 10.3661 3.26786C3.73178 3.26786 0 6.99965 0 13.6339C0 20.2682 3.73178 24 10.3661 24C17.0003 24 20.7322 20.2682 20.7322 13.6339C20.7322 13.0542 20.7036 12.4966 20.6472 11.9617C20.1204 12.2915 19.4976 12.4821 18.8304 12.4821C16.9368 12.4821 15.4018 10.9471 15.4018 9.05357V8.59821H14.9464C13.0529 8.59821 11.5179 7.06318 11.5179 5.16963ZM15.7522 20.3402C15.375 19.6373 14.8611 19.0101 14.2346 18.4978C13.1429 17.6055 11.7764 17.1182 10.3664 17.1182C8.95651 17.1182 7.58993 17.6055 6.49826 18.4978C5.87167 19.0101 5.35774 19.6375 4.98055 20.3405C6.21322 21.2266 7.96632 21.779 10.3662 21.779C12.7663 21.779 14.5195 21.2265 15.7522 20.3402ZM13.8536 11.9278C13.8536 14.1604 12.5977 15.4163 10.365 15.4163C8.13228 15.4163 6.87639 14.1604 6.87639 11.9278C6.87639 9.69506 8.13228 8.43917 10.365 8.43917C12.5977 8.43917 13.8536 9.69506 13.8536 11.9278Z\" fill=\"currentColor\"></path>"
  },
  "add-circle": {
    "viewBox": "0 0 24 24",
    "body": "<g clip-path=\"url(#clip0_10917_4230)\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.14925 3.14925C5.24971 1.04877 8.28082 0 12 0C15.7192 0 18.7503 1.04877 20.8507 3.14925C22.9512 5.24971 24 8.28082 24 12C24 15.7192 22.9512 18.7503 20.8507 20.8507C18.7503 22.9512 15.7192 24 12 24C8.28082 24 5.24971 22.9512 3.14925 20.8507C1.04877 18.7503 0 15.7192 0 12C0 8.28082 1.04877 5.24971 3.14925 3.14925ZM12 5.78571C12.5917 5.78571 13.0714 6.26541 13.0714 6.85714V10.9286H17.1429C17.7346 10.9286 18.2143 11.4083 18.2143 12C18.2143 12.5917 17.7346 13.0714 17.1429 13.0714H13.0714V17.1429C13.0714 17.7346 12.5917 18.2143 12 18.2143C11.4083 18.2143 10.9286 17.7346 10.9286 17.1429V13.0714H6.85714C6.26541 13.0714 5.78571 12.5917 5.78571 12C5.78571 11.4083 6.26541 10.9286 6.85714 10.9286H10.9286V6.85714C10.9286 6.26541 11.4083 5.78571 12 5.78571Z\" fill=\"currentColor\"></path> </g> <defs> <clipPath id=\"clip0_10917_4230\"> <rect width=\"24\" height=\"24\" fill=\"currentColor\"></rect> </clipPath> </defs>"
  },
  "ai-edit-spark": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.39402 0.38993C5.52626 0.239705 5.79917 0 6.21422 0C6.62926 0 6.90218 0.239705 7.03442 0.38993C7.16907 0.542906 7.26393 0.719923 7.32989 0.857775C7.43604 1.07955 7.54354 1.36895 7.64496 1.64199C7.66881 1.70619 7.69245 1.76979 7.71552 1.8311C7.98766 2.55389 8.29015 3.24903 8.74222 3.70111C9.18698 4.14586 9.86654 4.42426 10.592 4.68437L10.7289 4.73316C11.0179 4.83585 11.3362 4.94899 11.5817 5.0699C11.7263 5.14113 11.9113 5.24541 12.0694 5.3987C12.2374 5.56159 12.4284 5.83536 12.4284 6.21429C12.4284 6.59321 12.2374 6.86698 12.0694 7.02987C11.9113 7.18317 11.7263 7.28745 11.5817 7.35867C11.3362 7.47958 11.0179 7.59273 10.7289 7.69541L10.592 7.7442C9.86654 8.00431 9.18698 8.28271 8.74222 8.72746C8.29015 9.17954 7.98766 9.87468 7.71552 10.5975C7.69243 10.6588 7.66889 10.7222 7.64503 10.7864C7.54361 11.0595 7.43604 11.349 7.32989 11.5708C7.26393 11.7087 7.16907 11.8857 7.03442 12.0386C6.90218 12.1889 6.62926 12.4286 6.21422 12.4286C5.79917 12.4286 5.52626 12.1889 5.39402 12.0386C5.25936 11.8857 5.16451 11.7087 5.09853 11.5708C4.99238 11.349 4.88489 11.0596 4.78346 10.7866C4.75959 10.7223 4.73601 10.6588 4.71291 10.5975C4.44077 9.87468 4.13829 9.17954 3.68621 8.72746C3.24146 8.28271 2.56188 8.00431 1.83639 7.7442L1.69951 7.69541C1.41058 7.59274 1.09218 7.47958 0.846723 7.35867C0.702137 7.28745 0.51714 7.18317 0.359021 7.02987C0.190995 6.86698 0 6.59321 0 6.21429C0 5.83536 0.190995 5.56159 0.359019 5.3987C0.51714 5.24541 0.702137 5.14113 0.846723 5.0699C1.09218 4.94899 1.41058 4.83585 1.6995 4.73316L1.83639 4.68437C2.56188 4.42426 3.24146 4.14586 3.68621 3.70111C4.13829 3.24903 4.44077 2.55389 4.71291 1.8311C4.73602 1.76971 4.75958 1.7063 4.78346 1.64199C4.88489 1.36895 4.99238 1.07955 5.09853 0.857775C5.16451 0.719923 5.25936 0.542906 5.39402 0.38993ZM15.8215 5.67914C17.5677 3.89688 20.5284 4.07199 22.4297 5.94117C24.3761 7.8546 24.5638 10.9026 22.7074 12.6603L13.4551 21.4203C13.3546 21.2246 13.2373 21.0053 13.1037 20.7701C12.6008 19.8847 11.8483 18.7389 10.8719 17.7773C9.89589 16.816 8.73269 16.0749 7.83435 15.5797C7.3813 15.33 6.98669 15.138 6.70363 15.0077L6.68882 15.0009L15.8215 5.67914ZM11.613 21.6166C11.7731 21.8985 11.907 22.1546 12.0133 22.3677L5.81662 23.9628C4.8997 24.1987 3.98263 23.2737 4.22779 22.3601L5.80486 16.4829C5.85689 16.5058 5.9179 16.5332 5.98683 16.565C6.23931 16.6812 6.59616 16.8547 7.00683 17.0811C7.83591 17.538 8.84912 18.1911 9.66902 18.9987C10.4886 19.8058 11.1504 20.802 11.613 21.6166Z\" fill=\"currentColor\"></path>"
  },
  "ai-generate-text-spark": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.5369 0.818641C16.6691 0.668416 16.942 0.428711 17.357 0.428711C17.7721 0.428711 18.045 0.668416 18.1773 0.818641C18.3119 0.971617 18.4067 1.14863 18.4727 1.28649C18.579 1.50826 18.6865 1.79765 18.7878 2.07071C18.8116 2.13491 18.8353 2.19852 18.8584 2.25981C19.1305 2.9826 19.433 3.67775 19.8851 4.12982C20.3298 4.57457 21.0093 4.85297 21.7348 5.11308L21.8718 5.16187C22.1606 5.26456 22.4792 5.3777 22.7246 5.49861C22.8692 5.56984 23.0541 5.67412 23.2122 5.82741C23.3804 5.9903 23.5713 6.26407 23.5713 6.643C23.5713 7.02192 23.3804 7.29569 23.2122 7.45859C23.0541 7.61188 22.8692 7.71616 22.7246 7.78739C22.4792 7.90829 22.1606 8.02144 21.8718 8.12412L21.7348 8.17291C21.0093 8.43302 20.3298 8.71142 19.8851 9.15617C19.433 9.60825 19.1305 10.3034 18.8584 11.0262C18.8353 11.0874 18.8118 11.1507 18.788 11.2148C18.6866 11.4879 18.579 11.7777 18.4727 11.9995C18.4067 12.1374 18.3119 12.3144 18.1773 12.4674C18.045 12.6176 17.7721 12.8573 17.357 12.8573C16.942 12.8573 16.6691 12.6176 16.5369 12.4674C16.4022 12.3144 16.3074 12.1374 16.2414 11.9995C16.1352 11.7777 16.0277 11.4883 15.9263 11.2153C15.9024 11.151 15.8789 11.0875 15.8558 11.0262C15.5836 10.3034 15.2811 9.60825 14.8291 9.15617C14.3843 8.71142 13.7047 8.43302 12.9792 8.17291L12.8424 8.12412C12.5535 8.02144 12.235 7.90829 11.9896 7.78739C11.845 7.71616 11.66 7.61188 11.5019 7.45859C11.3338 7.29569 11.1429 7.02192 11.1429 6.643C11.1429 6.26407 11.3338 5.9903 11.5019 5.82741C11.66 5.67412 11.845 5.56984 11.9896 5.49861C12.235 5.3777 12.5534 5.26456 12.8424 5.16187L12.9792 5.11308C13.7047 4.85297 14.3843 4.57457 14.8291 4.12982C15.2811 3.67775 15.5836 2.9826 15.8558 2.25981C15.8789 2.19842 15.9024 2.13501 15.9263 2.07071C16.0277 1.79767 16.1352 1.50826 16.2414 1.28649C16.3074 1.14863 16.4022 0.971617 16.5369 0.818641ZM9.12043 5.58077C9.12043 4.8707 8.54479 4.29506 7.83471 4.29506H1.71418C1.0041 4.29506 0.428467 4.8707 0.428467 5.58077C0.428467 6.29085 1.0041 6.86649 1.71418 6.86649H7.83471C8.54479 6.86649 9.12043 6.29085 9.12043 5.58077ZM9.12043 11.1493C9.12043 10.4392 8.54479 9.86356 7.83471 9.86356H1.71418C1.0041 9.86356 0.428467 10.4392 0.428467 11.1493C0.428467 11.8594 1.0041 12.435 1.71418 12.435H7.83471C8.54479 12.435 9.12043 11.8594 9.12043 11.1493ZM22.2856 21.0001C22.9957 21.0001 23.5713 21.5758 23.5713 22.2859C23.5713 22.9959 22.9957 23.5716 22.2856 23.5716H1.79813C1.08806 23.5716 0.512422 22.9959 0.512422 22.2859C0.512422 21.5758 1.08806 21.0001 1.79813 21.0001H22.2856ZM23.5713 16.7178C23.5713 16.0077 22.9957 15.4321 22.2856 15.4321H1.79813C1.08806 15.4321 0.512422 16.0077 0.512422 16.7178C0.512422 17.4279 1.08806 18.0036 1.79813 18.0036H22.2856C22.9957 18.0036 23.5713 17.4279 23.5713 16.7178Z\" fill=\"currentColor\"></path>"
  },
  "ai-scanner-spark": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.75974 0.435247C7.46573 0.359148 8.09974 0.869776 8.17584 1.57577C8.25194 2.28176 7.74132 2.91577 7.03533 2.99187C6.45207 3.05473 5.87318 3.1219 5.29366 3.18913L5.20378 3.19956C4.15075 3.3217 3.30895 4.16592 3.19137 5.21395C3.12341 5.81964 3.05566 6.42533 2.99271 7.03539C2.91984 7.74171 2.28816 8.25523 1.58183 8.18235C0.875501 8.10946 0.361989 7.4778 0.43487 6.77146C0.499155 6.14842 0.568137 5.53193 0.635973 4.92725C0.887613 2.68423 2.67089 0.904689 4.9075 0.645254L5.00028 0.634492C5.57736 0.567539 6.16579 0.499271 6.75974 0.435247ZM15.8241 1.57577C15.9002 0.869776 16.5342 0.359148 17.2402 0.435247C17.8342 0.499269 18.4226 0.567534 18.9996 0.634483L19.0925 0.645254C21.3291 0.904689 23.1123 2.68423 23.364 4.92725C23.4319 5.53193 23.5008 6.14842 23.5651 6.77146C23.6379 7.4778 23.1245 8.10946 22.418 8.18235C21.7118 8.25523 21.08 7.74171 21.0072 7.03539C20.9443 6.42533 20.8766 5.81964 20.8085 5.21395C20.6911 4.16592 19.8492 3.3217 18.7961 3.19956L18.7063 3.18913C18.1268 3.1219 17.5479 3.05473 16.9646 2.99187C16.2586 2.91577 15.748 2.28176 15.8241 1.57577ZM15.8241 22.4233C15.9002 23.1294 16.5342 23.64 17.2402 23.5638C17.8342 23.4999 18.4226 23.4317 18.9996 23.3646L19.0925 23.3538C21.3291 23.0945 23.1123 21.3149 23.364 19.0719C23.4319 18.4673 23.5008 17.8508 23.5651 17.2277C23.6379 16.5214 23.1245 15.8897 22.418 15.8168C21.7118 15.7439 21.08 16.2575 21.0072 16.9638C20.9443 17.5738 20.8766 18.1796 20.8085 18.7853C20.6911 19.8332 19.8492 20.6775 18.7961 20.7996L18.7063 20.81C18.1268 20.8772 17.5479 20.9444 16.9646 21.0073C16.2586 21.0835 15.748 21.7174 15.8241 22.4233ZM8.17584 22.4233C8.09974 23.1294 7.46573 23.64 6.75974 23.5638C6.16582 23.4999 5.57745 23.4317 5.00038 23.3646L4.9075 23.3538C2.67089 23.0945 0.887613 21.3149 0.635973 19.0719C0.568137 18.4673 0.499155 17.8508 0.43487 17.2277C0.361989 16.5214 0.875501 15.8897 1.58183 15.8168C2.28816 15.7439 2.91984 16.2575 2.99271 16.9638C3.05566 17.5738 3.12341 18.1796 3.19137 18.7853C3.30895 19.8332 4.15075 20.6775 5.20378 20.7996L5.29366 20.81C5.87318 20.8772 6.45207 20.9444 7.03533 21.0073C7.74132 21.0835 8.25194 21.7174 8.17584 22.4233ZM11.1586 5.54592C11.2976 5.38803 11.5774 5.14411 12 5.14411C12.4225 5.14411 12.7024 5.38803 12.8413 5.54592C12.9827 5.70655 13.0841 5.89465 13.1567 6.04627C13.2733 6.28992 13.3914 6.60793 13.5049 6.91347C13.5319 6.98607 13.5586 7.05797 13.585 7.128C13.8892 7.93613 14.2343 8.73456 14.7581 9.25832C15.2745 9.77477 16.0569 10.0928 16.8673 10.3834L17.0219 10.4384C17.3462 10.5537 17.6959 10.678 17.9648 10.8105C18.1231 10.8885 18.319 10.9996 18.4848 11.1603C18.6605 11.3306 18.8556 11.6122 18.8556 11.9998C18.8556 12.3875 18.6605 12.6691 18.4848 12.8394C18.319 13.0001 18.1231 13.1112 17.9648 13.1892C17.6959 13.3217 17.3462 13.446 17.0219 13.5612L16.8673 13.6163C16.0569 13.9069 15.2745 14.2249 14.7581 14.7414C14.2343 15.2651 13.8892 16.0636 13.585 16.8717C13.5587 16.9416 13.532 17.0133 13.5051 17.0858C13.3916 17.3913 13.2733 17.7097 13.1567 17.9535C13.0841 18.105 12.9827 18.2931 12.8413 18.4537C12.7024 18.6116 12.4225 18.8556 12 18.8556C11.5774 18.8556 11.2976 18.6116 11.1586 18.4537C11.0172 18.2931 10.9158 18.105 10.8433 17.9535C10.7266 17.7097 10.6085 17.3917 10.495 17.0862C10.468 17.0136 10.4413 16.9417 10.4149 16.8717C10.1107 16.0636 9.76558 15.2651 9.24183 14.7414C8.72539 14.2249 7.94299 13.9069 7.13259 13.6163L6.97807 13.5612C6.65381 13.446 6.30408 13.3217 6.03513 13.1892C5.87686 13.1112 5.68085 13.0001 5.51511 12.8394C5.33949 12.6691 5.1443 12.3875 5.1443 11.9998C5.1443 11.6122 5.33949 11.3306 5.51511 11.1603C5.68085 10.9996 5.87686 10.8885 6.03513 10.8105C6.30408 10.678 6.65381 10.5537 6.97805 10.4384L7.13259 10.3834C7.94299 10.0928 8.72539 9.77477 9.24183 9.25832C9.76558 8.73456 10.1107 7.93613 10.4149 7.128C10.4412 7.05823 10.4678 6.98659 10.4947 6.91426C10.6082 6.60871 10.7266 6.28992 10.8433 6.04627C10.9158 5.89465 11.0172 5.70655 11.1586 5.54592Z\" fill=\"currentColor\"></path>"
  },
  "ai-sparkles": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.39211 0.810403C5.51967 0.665493 5.78777 0.428711 6.19762 0.428711C6.60747 0.428711 6.87557 0.665493 7.00313 0.810405C7.13311 0.95807 7.22343 1.12739 7.28486 1.25569C7.38372 1.46227 7.48382 1.73179 7.57683 1.98221C7.59859 2.04077 7.61998 2.09839 7.64085 2.15381C7.89069 2.81738 8.16363 3.44087 8.56596 3.84319C8.96097 4.23821 9.56919 4.4891 10.2358 4.72809L10.3604 4.77251C10.6248 4.86647 10.9215 4.97186 11.1507 5.08475C11.2858 5.15129 11.4631 5.25081 11.6159 5.39897C11.7787 5.55674 11.9668 5.82508 11.9668 6.19793C11.9668 6.57081 11.7787 6.83913 11.6159 6.99689C11.4631 7.14506 11.2858 7.24457 11.1507 7.31112C10.9215 7.42401 10.6249 7.5294 10.3605 7.62335L10.2358 7.66778C9.56919 7.90677 8.96097 8.15767 8.56596 8.55268C8.16363 8.955 7.89069 9.5785 7.64085 10.2421C7.61998 10.2975 7.59862 10.355 7.57687 10.4136C7.48385 10.664 7.38374 10.9336 7.28486 11.1402C7.22343 11.2685 7.13311 11.4378 7.00313 11.5855C6.87557 11.7304 6.60747 11.9672 6.19762 11.9672C5.78777 11.9672 5.51967 11.7304 5.39211 11.5855C5.26214 11.4378 5.17181 11.2685 5.11041 11.1402C5.01151 10.9336 4.91139 10.664 4.81838 10.4136C4.79664 10.3551 4.77525 10.2974 4.7544 10.2421C4.50456 9.5785 4.23161 8.955 3.82929 8.55268C3.43428 8.15767 2.82605 7.90677 2.15949 7.66778L2.03482 7.62336C1.77041 7.52942 1.47374 7.42401 1.24459 7.31112C1.10949 7.24457 0.932148 7.14506 0.779304 6.99689C0.616557 6.83913 0.428467 6.57081 0.428467 6.19793C0.428467 5.82508 0.616557 5.55674 0.779304 5.39897C0.932148 5.25081 1.10949 5.15129 1.24459 5.08475C1.47374 4.97186 1.77041 4.86647 2.03482 4.77251L2.15949 4.72809C2.82605 4.4891 3.43428 4.23821 3.82929 3.84319C4.23161 3.44087 4.50456 2.81736 4.7544 2.15381C4.77526 2.09837 4.79664 2.04086 4.81838 1.9823C4.91139 1.73184 5.01151 1.46229 5.11041 1.25569C5.17181 1.12739 5.26214 0.95807 5.39211 0.810403ZM14.7684 8.14063C14.9186 7.96999 15.2101 7.71904 15.6451 7.71904C16.0801 7.71904 16.3716 7.96999 16.5218 8.14063C16.6744 8.31405 16.7867 8.52067 16.8702 8.69527C17.0043 8.97544 17.1403 9.34123 17.2738 9.70096C17.3061 9.78737 17.3379 9.87345 17.3698 9.95789C17.7278 10.9085 18.1438 11.8793 18.7872 12.5227C19.4234 13.1588 20.3774 13.543 21.3295 13.8843L21.5134 13.9499C21.8966 14.0862 22.2986 14.2291 22.6068 14.3809C22.788 14.4702 23.0023 14.5928 23.1807 14.7657C23.3691 14.9483 23.5713 15.2431 23.5713 15.6453C23.5713 16.0475 23.3691 16.3423 23.1807 16.5249C23.0023 16.6978 22.788 16.8205 22.6068 16.9097C22.2986 17.0615 21.8966 17.2044 21.5134 17.3407L21.3295 17.4063C20.3774 17.7476 19.4234 18.1318 18.7872 18.768C18.1438 19.4113 17.7278 20.3821 17.3698 21.3327C17.3379 21.4172 17.3061 21.5033 17.2738 21.5897C17.1402 21.9493 17.0043 22.3152 16.8702 22.5953C16.7867 22.77 16.6744 22.9765 16.5218 23.15C16.3716 23.3206 16.0801 23.5716 15.6451 23.5716C15.2101 23.5716 14.9186 23.3206 14.7684 23.15C14.6157 22.9765 14.5035 22.77 14.4199 22.5953C14.2858 22.3152 14.1499 21.9493 14.0163 21.5897C13.9842 21.5035 13.9521 21.4169 13.9203 21.3327C13.5624 20.3821 13.1463 19.4113 12.5029 18.768C11.8668 18.1318 10.9128 17.7476 9.96069 17.4063L9.77676 17.3407C9.39358 17.2044 8.9915 17.0615 8.68332 16.9097C8.50224 16.8205 8.2878 16.6978 8.10938 16.5249C7.92106 16.3423 7.7189 16.0475 7.7189 15.6453C7.7189 15.2431 7.92106 14.9483 8.10938 14.7657C8.2878 14.5928 8.50224 14.4702 8.68332 14.3809C8.99151 14.2291 9.39357 14.0862 9.77676 13.9499L9.96069 13.8843C10.9128 13.543 11.8668 13.1588 12.5029 12.5227C13.1463 11.8793 13.5624 10.9085 13.9203 9.95789C13.9521 9.87367 13.984 9.78782 14.016 9.70161C14.1497 9.34188 14.2858 8.97544 14.4199 8.69527C14.5035 8.52067 14.6157 8.31405 14.7684 8.14063Z\" fill=\"currentColor\"></path>"
  },
  "ai-upscale-spark": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.9999 11.4058C2.9999 8.54122 3.80158 6.48482 5.14308 5.14332C6.48458 3.80183 8.54098 3.00014 11.4056 3.00014C14.2701 3.00014 16.3265 3.80183 17.668 5.14332C19.0096 6.48482 19.8112 8.54122 19.8112 11.4058C19.8112 14.2704 19.0096 16.3268 17.668 17.6683C16.3265 19.0099 14.2701 19.8115 11.4056 19.8115C8.54098 19.8115 6.48458 19.0099 5.14308 17.6683C3.80158 16.3268 2.9999 14.2704 2.9999 11.4058ZM11.4056 0.428711C8.06765 0.428711 5.27837 1.37147 3.3248 3.32505C1.37123 5.27861 0.428467 8.06789 0.428467 11.4058C0.428467 14.7437 1.37123 17.533 3.3248 19.4866C5.27837 21.4402 8.06765 22.3829 11.4056 22.3829C14.0459 22.3829 16.343 21.793 18.1547 20.5795L20.6449 23.0695C21.3143 23.7391 22.3998 23.7391 23.0692 23.0695C23.7386 22.4 23.7386 21.3145 23.0692 20.6451L20.579 18.1551C21.7928 16.3434 22.3826 14.0463 22.3826 11.4058C22.3826 8.06789 21.44 5.27861 19.4864 3.32505C17.5328 1.37147 14.7435 0.428711 11.4056 0.428711ZM10.5994 6.00028C10.7272 5.85515 10.9955 5.61823 11.4056 5.61823C11.8156 5.61823 12.0839 5.85515 12.2117 6.00028C12.3419 6.14815 12.4324 6.3178 12.494 6.44649C12.5932 6.65369 12.6936 6.92404 12.7869 7.1754C12.8087 7.23413 12.8303 7.29211 12.8512 7.34772C13.102 8.01374 13.3761 8.64019 13.7805 9.04457C14.1776 9.44165 14.7888 9.69369 15.4578 9.93355L15.583 9.97816C15.8484 10.0725 16.1459 10.1782 16.3758 10.2914C16.5112 10.3581 16.6889 10.4578 16.842 10.6062C17.0049 10.7642 17.1932 11.0328 17.1932 11.4059C17.1932 11.779 17.0049 12.0475 16.842 12.2055C16.6889 12.3539 16.5112 12.4536 16.3758 12.5204C16.1459 12.6336 15.8484 12.7393 15.583 12.8336L15.4578 12.8782C14.7888 13.1181 14.1776 13.3701 13.7805 13.7672C13.3761 14.1716 13.102 14.798 12.8512 15.464C12.8302 15.5197 12.8088 15.5775 12.7869 15.6363C12.6936 15.8877 12.5932 16.1581 12.494 16.3653C12.4324 16.494 12.3419 16.6636 12.2117 16.8115C12.0839 16.9566 11.8156 17.1936 11.4056 17.1936C10.9955 17.1936 10.7272 16.9566 10.5994 16.8115C10.4693 16.6636 10.3788 16.494 10.3172 16.3653C10.218 16.158 10.1176 15.8877 10.0242 15.6363C10.0024 15.5775 9.98091 15.5197 9.95995 15.464C9.70918 14.798 9.43501 14.1716 9.03063 13.7672C8.63355 13.3701 8.02238 13.1181 7.35336 12.8782L7.22822 12.8336C6.96279 12.7393 6.66521 12.6336 6.43538 12.5204C6.2999 12.4536 6.12223 12.3539 5.96916 12.2055C5.8062 12.0475 5.61799 11.779 5.61799 11.4059C5.61799 11.0328 5.8062 10.7642 5.96916 10.6062C6.12223 10.4578 6.2999 10.3581 6.43538 10.2914C6.66521 10.1782 6.96278 10.0725 7.2282 9.97816L7.35336 9.93355C8.02238 9.69369 8.63355 9.44165 9.03063 9.04457C9.43501 8.64019 9.70918 8.01374 9.95995 7.34772C9.9809 7.29206 10.0023 7.23432 10.0242 7.17554C10.1175 6.92416 10.218 6.65371 10.3172 6.44649C10.3788 6.3178 10.4693 6.14815 10.5994 6.00028Z\" fill=\"currentColor\"></path>"
  },
  "alarm-solo": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M12.0259 4.61575C14.7365 4.61584 16.9762 5.38075 18.5365 6.94109C20.0968 8.50152 20.8619 10.741 20.8619 13.4517L20.8535 13.9539C20.7637 16.4388 19.9991 18.4981 18.5365 19.9607C16.9761 21.5205 14.7363 22.286 12.0259 22.286L11.5237 22.2776C9.03876 22.1877 6.97964 21.4232 5.517 19.9607C4.05435 18.4979 3.28985 16.439 3.20002 13.9539L3.19165 13.4517C3.19165 10.7411 3.95696 8.50156 5.517 6.94109C6.97961 5.47852 9.03884 4.71398 11.5237 4.62412L12.0259 4.61575ZM11.9824 8.1749C11.3908 8.1749 10.9112 8.6548 10.911 9.24633V12.9913L8.71119 15.1928L8.57391 15.3619C8.29956 15.7777 8.34521 16.3418 8.71119 16.7078C9.07724 17.0736 9.64141 17.1194 10.0572 16.8451L10.2263 16.7078L12.7408 14.1933C12.9408 13.9925 13.0538 13.7201 13.0538 13.4366V9.24633C13.0536 8.65504 12.5736 8.17529 11.9824 8.1749ZM5.96566 1.80994C6.56876 1.56328 7.27318 1.80844 7.58619 2.39589C7.89874 2.98294 7.7096 3.70353 7.16933 4.06665L7.0555 4.13529L6.62023 4.37971C5.76149 4.88964 4.9776 5.51717 4.29154 6.24298L3.95672 6.61464L3.86633 6.71006C3.39356 7.15824 2.64814 7.18414 2.14366 6.75024C1.63921 6.31594 1.55471 5.57525 1.92771 5.04098L2.00806 4.93718L2.42324 4.47681C3.27298 3.57785 4.24412 2.80149 5.30773 2.16988L5.84679 1.8652L5.96566 1.80994ZM16.4171 2.39589C16.751 1.76962 17.53 1.53179 18.1566 1.8652C19.6151 2.64221 20.9169 3.68477 21.9952 4.93718C22.4582 5.47526 22.3976 6.28702 21.8596 6.75024C21.3215 7.2132 20.5098 7.15246 20.0466 6.61464C19.1762 5.60373 18.125 4.76253 16.9478 4.13529C16.3215 3.80133 16.0834 3.02242 16.4171 2.39589Z\" fill=\"currentColor\"></path>"
  },
  "atom": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.341 1.65904C24.0374 3.3556 23.8055 5.775 22.7181 8.1306C22.1663 9.32632 21.35 10.6218 20.2902 12C21.35 13.3783 22.1665 14.6738 22.7183 15.8696C23.8057 18.2252 24.0376 20.6446 22.3412 22.3412C20.6445 24.0377 18.2252 23.8057 15.8696 22.7184C14.6738 22.1665 13.3782 21.35 12 20.2903C10.6217 21.35 9.32614 22.1665 8.13036 22.7184C5.77476 23.8057 3.35535 24.0377 1.6588 22.3412C-0.0377691 20.6446 0.194314 18.2252 1.28156 15.8696C1.8335 14.6738 2.64996 13.3783 3.70975 12C2.65004 10.6218 1.83365 9.32632 1.28175 8.1306C0.194497 5.775 -0.0375859 3.3556 1.65898 1.65904C3.35554 -0.0375251 5.77493 0.194559 8.13053 1.28181C9.32626 1.83371 10.6218 2.65012 12 3.70984C13.3781 2.65012 14.6737 1.83371 15.8694 1.28181C18.225 0.194559 20.6444 -0.0375251 22.341 1.65904ZM5.39676 9.96564C4.60961 8.89627 4.01762 7.92204 3.61647 7.05299C2.67828 5.02031 2.94999 4.00457 3.47726 3.47731C4.00452 2.95005 5.02025 2.67833 7.05291 3.61655C7.92199 4.01767 8.89622 4.60967 9.96559 5.39681C9.20211 6.07332 8.41808 6.81415 7.61599 7.61625C6.81397 8.41826 6.0732 9.20222 5.39676 9.96564ZM5.39674 14.0344C4.60951 15.1038 4.01746 16.0781 3.6163 16.9473C2.67809 18.9799 2.9498 19.9956 3.47707 20.5229C4.00433 21.0502 5.02006 21.3219 7.05274 20.3837C7.92187 19.9825 8.89615 19.3904 9.9656 18.6032C9.20218 17.9268 8.41822 17.186 7.61618 16.384C6.81408 15.5819 6.07323 14.7979 5.39674 14.0344ZM12 16.967C11.1861 16.261 10.3298 15.4611 9.43445 14.5657C8.53903 13.6703 7.739 12.814 7.03301 12C7.73897 11.1861 8.53892 10.3299 9.43426 9.43452C10.3297 8.53908 11.186 7.73908 12 7.03308C12.8139 7.73908 13.6702 8.53908 14.5656 9.43452C15.461 10.3299 16.261 11.1861 16.9669 12C16.2609 12.814 15.4609 13.6703 14.5655 14.5657C13.6701 15.4611 12.8139 16.261 12 16.967ZM14.0343 18.6032C15.1038 19.3904 16.0781 19.9825 16.9472 20.3837C18.9798 21.3219 19.9957 21.0502 20.5228 20.5229C21.0501 19.9956 21.3218 18.9799 20.3836 16.9473C19.9825 16.0781 19.3904 15.1038 18.6032 14.0344C17.9267 14.7979 17.1858 15.5819 16.3838 16.384C15.5817 17.186 14.7977 17.9268 14.0343 18.6032ZM18.6032 9.96564C19.3904 8.89627 19.9823 7.92204 20.3834 7.05299C21.3217 5.02031 21.05 4.00457 20.5226 3.47731C19.9953 2.95005 18.9796 2.67833 16.947 3.61655C16.0779 4.01767 15.1037 4.60967 14.0343 5.39681C14.7978 6.07332 15.5818 6.81415 16.3839 7.61625C17.186 8.41826 17.9267 9.20224 18.6032 9.96564ZM12.1181 10.5427C12.8282 10.5427 13.4038 11.1183 13.4038 11.8284V12.172C13.4038 12.8821 12.8282 13.4577 12.1181 13.4577C11.4081 13.4577 10.8324 12.8821 10.8324 12.172V11.8284C10.8324 11.1183 11.4081 10.5427 12.1181 10.5427Z\" fill=\"currentColor\"></path>"
  },
  "bag-dollar": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.8342 0.231734C15.6736 0.38177 16.5147 0.626642 17.0744 1.04272C17.5548 1.39983 17.6818 1.91762 17.6765 2.32625C17.6715 2.71421 17.5529 3.08338 17.4411 3.35499L16.291 6.14945C18.0751 6.81523 19.5087 7.94364 20.5263 9.50191C21.7056 11.3073 22.2874 13.6287 22.2874 16.3528C22.2874 19.7114 21.3918 21.7978 19.3954 22.9101C18.4534 23.4348 17.3365 23.6988 16.1171 23.8385C14.8962 23.9784 13.5082 24 11.9998 24C10.4913 24 9.10332 23.9784 7.88241 23.8385C6.663 23.6988 5.54606 23.4348 4.60411 22.9101C2.60758 21.7978 1.71216 19.7114 1.71216 16.3528C1.71216 13.6454 2.28686 11.336 3.45144 9.53534C4.45637 7.98147 5.87263 6.85083 7.63642 6.17667L6.47513 3.35499C6.36336 3.08338 6.24465 2.71421 6.23969 2.32625C6.23446 1.91762 6.36151 1.39983 6.84185 1.04272C7.40151 0.62664 8.24261 0.38177 9.08203 0.231734C9.95642 0.0754472 10.9636 0 11.9581 0C12.9526 0 13.9598 0.0754476 14.8342 0.231734ZM13.2719 9.55517C13.2719 8.96343 12.7922 8.48374 12.2004 8.48374C11.6087 8.48374 11.129 8.96343 11.129 9.55517V10.2955C9.77157 10.6928 8.92711 11.7569 8.92711 13.0196C8.92711 13.4865 9.02949 13.9271 9.26198 14.3154C9.49354 14.7022 9.81213 14.9669 10.1344 15.1497C10.6896 15.4645 11.3736 15.5902 11.8474 15.6772L11.9293 15.6923C12.5115 15.8002 12.8394 15.8758 13.0441 15.9959C13.1189 16.0398 13.1363 16.0684 13.1416 16.0774C13.1463 16.0856 13.1745 16.1349 13.1787 16.2704C13.1672 16.2874 13.1423 16.3178 13.0922 16.3601C12.9598 16.472 12.7234 16.5966 12.4002 16.6677C11.7474 16.8113 11.0013 16.6871 10.4718 16.2038C10.0347 15.8049 9.357 15.8359 8.95814 16.273C8.55926 16.7101 8.59023 17.3878 9.02731 17.7866C9.6589 18.3631 10.3969 18.6782 11.129 18.8023V19.4295C11.129 20.0211 11.6087 20.501 12.2004 20.501C12.7922 20.501 13.2719 20.0211 13.2719 19.4295V18.6487C13.7143 18.5045 14.1313 18.2875 14.4752 17.9969C14.9217 17.6198 15.3221 17.0431 15.3221 16.3051C15.3221 15.8349 15.2218 15.3922 14.9943 15.0008C14.7671 14.6097 14.4523 14.3377 14.1285 14.1477C13.5601 13.8142 12.8607 13.6851 12.3803 13.5965L12.3199 13.5854C11.7311 13.4762 11.4006 13.4043 11.1914 13.2856C11.1171 13.2435 11.1022 13.2177 11.1006 13.2148C11.1002 13.2142 11.07 13.1683 11.07 13.0196C11.07 12.8823 11.1213 12.7361 11.2519 12.6077C11.382 12.4798 11.6425 12.3221 12.124 12.2808C12.537 12.2453 12.8735 12.3671 13.1206 12.5097C13.2442 12.5811 13.3388 12.6542 13.3988 12.7057C13.4284 12.7311 13.4483 12.7502 13.4578 12.7597L13.4627 12.7646C13.8592 13.195 14.5292 13.2281 14.9661 12.8361C15.4066 12.441 15.4434 11.7636 15.0482 11.3231L14.2507 12.0386C15.0482 11.3231 15.0485 11.3234 15.0482 11.3231L15.047 11.3217L15.0456 11.3202L15.0427 11.317L15.0358 11.3094L15.0178 11.2902C15.004 11.2757 14.9865 11.2577 14.9655 11.2369C14.9234 11.1952 14.8665 11.1415 14.7953 11.0804C14.6537 10.9587 14.451 10.8034 14.1916 10.6537C13.9414 10.5093 13.6324 10.367 13.2719 10.2675V9.55517Z\" fill=\"currentColor\"></path>"
  },
  "bag-suitcase-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.82496 5.17829C8.88245 4.01037 9.90165 2.99916 11.2567 2.99916H12.7447C14.0998 2.99916 15.119 4.01037 15.1765 5.17831C14.1264 5.15541 13.0712 5.15541 12.0471 5.15541H11.9535C10.9297 5.15541 9.87478 5.15541 8.82496 5.17829ZM6.25096 5.29499V5.28242C6.25096 2.55153 8.54287 0.427734 11.2567 0.427734H12.7447C15.4586 0.427734 17.7504 2.55153 17.7504 5.28242V5.29505C18.5841 5.35771 19.3943 5.44848 20.1612 5.57999C21.6402 5.83356 22.8331 6.92455 23.1604 8.37607C23.5713 10.1992 23.5713 11.8978 23.5711 14.2976V14.4303C23.5713 16.8301 23.5713 18.5287 23.1604 20.3519C22.8331 21.8034 21.6402 22.8943 20.1612 23.1479C17.6849 23.5725 14.7574 23.5725 12.0471 23.5725H11.9536C9.24319 23.5725 6.31574 23.5725 3.83937 23.1479C2.36044 22.8943 1.16746 21.8034 0.840303 20.3519C0.429387 18.5287 0.429411 16.8301 0.429444 14.4303V14.2976C0.429411 11.8978 0.429387 10.1992 0.840303 8.37607C1.16746 6.92455 2.36044 5.83356 3.83937 5.57999C4.60656 5.44845 5.41704 5.35764 6.25096 5.29499ZM7.50004 17.0232C7.50004 16.4314 7.97973 15.9517 8.57146 15.9517H15.4286C16.0203 15.9517 16.5 16.4314 16.5 17.0232C16.5 17.6148 16.0203 18.0947 15.4286 18.0947H8.57146C7.97973 18.0947 7.50004 17.6148 7.50004 17.0232ZM8.57146 10.8089C7.97973 10.8089 7.50004 11.2886 7.50004 11.8803C7.50004 12.472 7.97973 12.9517 8.57146 12.9517H15.4286C16.0203 12.9517 16.5 12.472 16.5 11.8803C16.5 11.2886 16.0203 10.8089 15.4286 10.8089H8.57146Z\" fill=\"currentColor\"></path>"
  },
  "bag-suitcase-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.82495 5.17829C8.88245 4.01037 9.90165 2.99916 11.2567 2.99916H12.7447C14.0998 2.99916 15.119 4.01037 15.1765 5.17831C14.1264 5.15541 13.0712 5.15541 12.0471 5.15541H11.9536C10.9297 5.15541 9.87478 5.15541 8.82495 5.17829ZM6.25095 5.29499V5.28242C6.25095 2.55153 8.54287 0.427734 11.2567 0.427734H12.7447C15.4586 0.427734 17.7504 2.55153 17.7504 5.28242V5.29505C18.5841 5.35771 19.3943 5.44848 20.1612 5.57999C21.6401 5.83356 22.8331 6.92455 23.1604 8.37607C23.5713 10.1992 23.5713 11.8978 23.5711 14.2976V14.4303C23.5713 16.8301 23.5713 18.5287 23.1604 20.3519C22.8331 21.8034 21.6401 22.8943 20.1612 23.1479C17.6849 23.5725 14.7574 23.5725 12.0471 23.5725H11.9536C9.24319 23.5725 6.31574 23.5725 3.83937 23.1479C2.36043 22.8943 1.16746 21.8034 0.840302 20.3519C0.429386 18.5287 0.42941 16.8301 0.429444 14.4303V14.2976C0.42941 11.8978 0.429386 10.1992 0.840302 8.37607C1.16746 6.92455 2.36043 5.83356 3.83937 5.57999C4.60656 5.44845 5.41704 5.35764 6.25095 5.29499Z\" fill=\"currentColor\"></path>"
  },
  "bag-suitcase-4": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.2567 2.99916C9.90165 2.99916 8.88245 4.01037 8.82495 5.17829C9.87478 5.15541 10.9297 5.15541 11.9535 5.15541H12.0471C13.0712 5.15541 14.1264 5.15541 15.1765 5.17831C15.119 4.01037 14.0998 2.99916 12.7447 2.99916H11.2567ZM6.25095 5.28242V5.29499C5.41704 5.35764 4.60656 5.44845 3.83937 5.57999C2.36043 5.83356 1.16746 6.92455 0.840302 8.37607C0.69229 9.03276 0.597595 9.67331 0.537012 10.3363L11.2597 13.9158C11.7442 14.0775 12.2681 14.0775 12.7525 13.9158L23.464 10.34C23.4035 9.67572 23.3087 9.034 23.1604 8.37607C22.8331 6.92455 21.6401 5.83356 20.1612 5.57999C19.3943 5.44848 18.5841 5.35771 17.7504 5.29505V5.28242C17.7504 2.55153 15.4586 0.427734 12.7447 0.427734H11.2567C8.54287 0.427734 6.25095 2.55153 6.25095 5.28242ZM23.5641 12.5657L13.4311 15.9484C12.5062 16.2571 11.5061 16.2571 10.5812 15.9484L0.436531 12.5618C0.429427 13.103 0.429435 13.6769 0.429444 14.2976V14.4303C0.42941 16.8301 0.429386 18.5287 0.840302 20.3519C1.16746 21.8034 2.36043 22.8943 3.83937 23.1479C6.31574 23.5725 9.24319 23.5725 11.9536 23.5725H12.0471C14.7574 23.5725 17.6849 23.5725 20.1612 23.1479C21.6401 22.8943 22.8331 21.8034 23.1604 20.3519C23.5713 18.5287 23.5713 16.8301 23.5711 14.4303V14.2976C23.5713 13.6783 23.5713 13.1058 23.5641 12.5657Z\" fill=\"currentColor\"></path>"
  },
  "bag-suitcase-add-plus": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.2263 2.57143C9.77719 2.57143 8.68444 3.66569 8.64415 4.92783C9.75377 4.90282 10.8698 4.90282 11.9531 4.90284H12.0469C13.1302 4.90282 14.2464 4.90282 15.3561 4.92783C15.3159 3.66569 14.2231 2.57143 12.7739 2.57143H11.2263ZM6.07157 5.00001V5.04437C5.18808 5.10962 4.3296 5.20493 3.51789 5.3442C1.99251 5.60592 0.763408 6.73152 0.426448 8.22751C-5.61476e-05 10.121 -3.26374e-05 11.8853 5.84134e-07 14.3849V14.518C-3.26374e-05 17.0176 -5.61476e-05 18.7819 0.426448 20.6753C0.763408 22.1714 1.99251 23.297 3.51789 23.5586C6.09058 24 9.13294 24 11.9531 24H12.0469C14.8671 24 17.9095 24 20.4821 23.5586C22.0075 23.297 23.2366 22.1714 23.5735 20.6753C24 18.7819 24 17.0176 24 14.518V14.3849C24 11.8853 24 10.121 23.5735 8.22751C23.2366 6.73152 22.0075 5.60592 20.4821 5.3442C19.6704 5.20495 18.8121 5.10963 17.9287 5.04439V5.00001C17.9287 2.18962 15.5709 0 12.7739 0H11.2263C8.4294 0 6.07157 2.18962 6.07157 5.00001ZM13.0715 10.1658C13.0715 9.57408 12.5918 9.09437 12 9.09437C11.4083 9.09437 10.9286 9.57408 10.9286 10.1658V13.3801H7.71429C7.12255 13.3801 6.64286 13.8598 6.64286 14.4515C6.64286 15.0433 7.12255 15.5229 7.71429 15.5229H10.9286V18.7373C10.9286 19.3289 11.4083 19.8087 12 19.8087C12.5918 19.8087 13.0715 19.3289 13.0715 18.7373V15.5229H16.2857C16.8775 15.5229 17.3571 15.0433 17.3571 14.4515C17.3571 13.8598 16.8775 13.3801 16.2857 13.3801H13.0715V10.1658Z\" fill=\"currentColor\"></path>"
  },
  "bag-suitcase-remove-subtract": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.2263 2.57143C9.77719 2.57143 8.68444 3.66569 8.64415 4.92783C9.75377 4.90282 10.8698 4.90282 11.9531 4.90284H12.0469C13.1302 4.90282 14.2464 4.90282 15.3561 4.92783C15.3159 3.66569 14.2231 2.57143 12.7739 2.57143H11.2263ZM6.07157 5.00001V5.04437C5.18808 5.10962 4.3296 5.20493 3.51789 5.3442C1.99251 5.60592 0.763408 6.73152 0.426448 8.22751C-5.61476e-05 10.121 -3.26374e-05 11.8853 5.84134e-07 14.3849V14.518C-3.26374e-05 17.0176 -5.61476e-05 18.7819 0.426448 20.6753C0.763408 22.1714 1.99251 23.297 3.51789 23.5586C6.09058 24 9.13294 24 11.9531 24H12.0469C14.8671 24 17.9095 24 20.4821 23.5586C22.0075 23.297 23.2366 22.1714 23.5735 20.6753C24 18.7819 24 17.0176 24 14.518V14.3849C24 11.8853 24 10.121 23.5735 8.22751C23.2366 6.73152 22.0075 5.60592 20.4821 5.3442C19.6704 5.20495 18.8121 5.10963 17.9287 5.04439V5.00001C17.9287 2.18962 15.5709 0 12.7739 0H11.2263C8.4294 0 6.07157 2.18962 6.07157 5.00001ZM7.71429 13.3801C7.12255 13.3801 6.64286 13.8598 6.64286 14.4515C6.64286 15.0433 7.12255 15.5229 7.71429 15.5229H16.2857C16.8775 15.5229 17.3571 15.0433 17.3571 14.4515C17.3571 13.8598 16.8775 13.3801 16.2857 13.3801H7.71429Z\" fill=\"currentColor\"></path>"
  },
  "bell-notification": {
    "viewBox": "0 0 24 24",
    "body": "<g clip-path=\"url(#clip0_10917_6672)\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.25032 2.10754C7.63325 0.69056 9.61536 0 12 0C14.3847 0 16.3668 0.69056 17.7498 2.10754C19.1296 3.52143 19.798 5.54098 19.798 7.96896C19.798 8.97609 19.9429 9.57209 20.1129 9.95515C20.2778 10.3264 20.4926 10.5598 20.7709 10.8204C20.8072 10.8545 20.847 10.8908 20.8892 10.9293C21.1496 11.1675 21.5054 11.4927 21.7729 11.9336C22.1058 12.4826 22.2858 13.1587 22.2858 14.0805C22.2858 15.2748 21.6386 16.1629 20.7908 16.7832C19.9621 17.3895 18.8819 17.7919 17.8043 18.0669C15.6392 18.6195 13.2004 18.7269 12 18.7269C10.7997 18.7269 8.36086 18.6195 6.19584 18.0669C5.11821 17.7919 4.03802 17.3895 3.20935 16.7832C2.3615 16.1629 1.71436 15.2748 1.71436 14.0805C1.71436 13.1587 1.89441 12.4826 2.22725 11.9337C2.49465 11.4927 2.85043 11.1675 3.11098 10.9294C3.15316 10.8908 3.19284 10.8545 3.22924 10.8204C3.50738 10.5598 3.72214 10.3264 3.88708 9.95515C4.05724 9.57209 4.20196 8.97607 4.20196 7.96896C4.20196 5.54098 4.87039 3.52143 6.25032 2.10754ZM8.01737 21.4901C7.85208 21.0557 8.34494 20.6782 8.80708 20.7285C10.117 20.8711 11.2777 20.9064 11.9997 20.9064C12.7214 20.9064 13.8816 20.8711 15.1909 20.7286C15.6529 20.6784 16.1456 21.0557 15.9804 21.4901C15.6782 22.2843 15.1563 22.9383 14.4296 23.3805C13.7158 23.8147 12.8792 24.0002 11.9989 24.0002C11.1185 24.0002 10.282 23.8147 9.5682 23.3805C8.84143 22.9383 8.31952 22.2843 8.01737 21.4901Z\" fill=\"currentColor\"></path> </g> <defs> <clipPath id=\"clip0_10917_6672\"> <rect width=\"24\" height=\"24\" fill=\"currentColor\"></rect> </clipPath> </defs>"
  },
  "bill-dollar-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.23518 2.97021C1.9164 2.97021 0.863767 3.95434 0.630574 5.17808C0.598668 5.34551 0.566139 5.50923 0.533515 5.67344C0.269933 7.00007 0 8.35868 0 11.9702C0 15.5817 0.269933 16.9403 0.533515 18.267C0.566141 18.4312 0.598668 18.595 0.630574 18.7623C0.863767 19.9861 1.9164 20.9703 3.23518 20.9703H20.7648C22.0851 20.9703 23.1326 19.9849 23.3731 18.769C23.4038 18.6136 23.4351 18.4619 23.4665 18.3099C23.7309 17.0273 24 15.7207 24 11.9702C24 8.21967 23.7309 6.91326 23.4665 5.63067C23.4353 5.47866 23.4038 5.32683 23.3731 5.17146C23.1326 3.9555 22.0851 2.97021 20.7648 2.97021H3.23518ZM13.2543 7.87492C13.2543 7.28319 12.7746 6.80349 12.1829 6.80349C11.5912 6.80349 11.1115 7.28319 11.1115 7.87492V8.10436C9.8789 8.49234 9.10431 9.47917 9.10431 10.6575C9.10431 11.0936 9.20506 11.5087 9.43296 11.8744C9.65806 12.2357 9.96339 12.4784 10.2621 12.6439C10.7663 12.9232 11.3865 13.0446 11.8112 13.1278L11.905 13.1462C12.4327 13.251 12.7175 13.3247 12.8888 13.429C12.9204 13.4482 12.9372 13.4626 12.9451 13.4704C12.9523 13.4773 12.9543 13.4808 12.9553 13.4825C12.9561 13.484 12.9614 13.4932 12.9669 13.516C12.9707 13.5317 12.9752 13.5558 12.9778 13.59C12.9586 13.6109 12.923 13.6434 12.8598 13.685C12.6733 13.8082 12.3632 13.9191 11.992 13.9361C11.511 13.9582 11.0328 13.8199 10.671 13.4897C10.2339 13.0908 9.55627 13.1218 9.15739 13.5589C8.75851 13.996 8.78948 14.6737 9.22658 15.0725C9.79462 15.5909 10.456 15.8825 11.1115 16.0074V16.1248C11.1115 16.7166 11.5912 17.1963 12.1829 17.1963C12.7746 17.1963 13.2543 16.7166 13.2543 16.1248V15.8564C13.5364 15.7589 13.8021 15.6306 14.0404 15.4733C14.5708 15.1232 15.1228 14.5087 15.1228 13.6521C15.1228 13.2095 15.0283 12.7901 14.8145 12.4171C14.6011 12.0448 14.306 11.7829 14.0028 11.5984C13.4639 11.2705 12.8038 11.1397 12.362 11.0523L12.3222 11.0444C11.7763 10.936 11.4845 10.8714 11.3005 10.7694C11.2768 10.7563 11.2621 10.7461 11.2537 10.7396C11.2507 10.7255 11.2472 10.6995 11.2472 10.6575C11.2472 10.5576 11.2839 10.4488 11.3846 10.3497C11.4849 10.2512 11.7003 10.1147 12.1211 10.0786C12.4734 10.0483 12.7608 10.1519 12.9739 10.2749C13.0807 10.3365 13.1621 10.3995 13.2131 10.4433C13.2382 10.4649 13.2547 10.4808 13.262 10.488L13.2645 10.4905C13.6611 10.9199 14.3303 10.9525 14.7669 10.5609C15.2073 10.1657 15.2441 9.48832 14.8489 9.04786L14.0684 9.74807C14.8489 9.04786 14.8493 9.0482 14.8489 9.04786L14.8477 9.04647L14.8464 9.04499L14.8435 9.04179L14.8367 9.03442L14.8194 9.01593C14.8062 9.00202 14.7896 8.98494 14.7697 8.96521C14.7298 8.9258 14.6763 8.87536 14.6096 8.81804C14.477 8.70406 14.2874 8.55884 14.045 8.41893C13.8275 8.2934 13.562 8.16935 13.2543 8.07767V7.87492ZM12.9975 13.5632C12.9978 13.5633 12.9966 13.5662 12.9928 13.5716C12.9952 13.5659 12.9971 13.5632 12.9975 13.5632ZM11.2441 10.7311L11.2456 10.7328L11.2448 10.732C11.2443 10.7314 11.2441 10.7311 11.2441 10.7311ZM3.95182 11.9974C3.94421 11.4057 4.41771 10.9199 5.0094 10.9123L6.05268 10.8989C6.64437 10.8913 7.13019 11.3648 7.13779 11.9564C7.1454 12.5481 6.6719 13.0339 6.08021 13.0416L5.03693 13.0549C4.44525 13.0626 3.95942 12.5891 3.95182 11.9974ZM16.8625 11.9974C16.8549 11.4057 17.3283 10.9199 17.9201 10.9123L18.9634 10.8989C19.555 10.8913 20.0409 11.3648 20.0486 11.9564C20.0561 12.5481 19.5826 13.0339 18.9909 13.0416L17.9477 13.0549C17.3559 13.0626 16.8701 12.5891 16.8625 11.9974Z\" fill=\"currentColor\"></path>"
  },
  "briefcase-dollar": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.64415 4.92783C8.68444 3.66569 9.77719 2.57143 11.2263 2.57143H12.7739C14.2231 2.57143 15.3159 3.66569 15.3561 4.92783C14.2464 4.90282 13.1302 4.90282 12.0469 4.90284H11.9531C10.8698 4.90282 9.75377 4.90282 8.64415 4.92783ZM6.07157 5.04437V5.00001C6.07157 2.18962 8.4294 0 11.2263 0H12.7739C15.5709 0 17.9287 2.18962 17.9287 5.00001V5.04439C18.8121 5.10963 19.6704 5.20495 20.4821 5.3442C22.0075 5.60592 23.2366 6.73152 23.5735 8.22751C24 10.121 24 11.8853 24 14.3849V14.518C24 17.0176 24 18.7819 23.5735 20.6753C23.2366 22.1714 22.0075 23.297 20.4821 23.5586C17.9095 24 14.8671 24 12.0469 24H11.9531C9.13294 24 6.09058 24 3.51789 23.5586C1.99251 23.297 0.763408 22.1714 0.426448 20.6753C-5.67436e-05 18.7819 -3.32214e-05 17.0176 5.99903e-07 14.518V14.3849C-3.32214e-05 11.8853 -5.67436e-05 10.121 0.426448 8.22751C0.763408 6.73152 1.99251 5.60592 3.51789 5.3442C4.3296 5.20493 5.18808 5.10962 6.07157 5.04437ZM13.1206 12.4689C12.8735 12.3264 12.537 12.2045 12.124 12.24C11.6425 12.2814 11.382 12.4391 11.2519 12.5669C11.1213 12.6953 11.07 12.8416 11.07 12.9789C11.07 13.1275 11.1001 13.1733 11.1005 13.1739C11.1022 13.1767 11.1171 13.2027 11.1915 13.2449C11.4007 13.3635 11.7311 13.4354 12.32 13.5446L12.3803 13.5557C12.8608 13.6444 13.5602 13.7734 14.1285 14.1069C14.4523 14.2969 14.7671 14.569 14.9944 14.96C15.2218 15.3514 15.3221 15.7942 15.3221 16.2644C15.3221 17.0024 14.9217 17.579 14.4752 17.9563C14.1314 18.2467 13.7143 18.4637 13.2719 18.6079V19.3886C13.2719 19.9803 12.7922 20.46 12.2005 20.46C11.6088 20.46 11.129 19.9803 11.129 19.3886V18.7615C10.397 18.6374 9.65894 18.3223 9.02734 17.7459C8.59027 17.347 8.55929 16.6693 8.95817 16.2322C9.35704 15.7952 10.0347 15.7642 10.4718 16.1631C11.0013 16.6463 11.7474 16.7705 12.4002 16.6269C12.7234 16.5559 12.9598 16.4312 13.0922 16.3194C13.1424 16.277 13.1673 16.2466 13.1788 16.2296C13.1745 16.0941 13.1463 16.0448 13.1416 16.0367C13.1363 16.0276 13.1189 15.999 13.0441 15.9551C12.8395 15.8351 12.5115 15.7595 11.9293 15.6515L11.8474 15.6365C11.3736 15.5494 10.6897 15.4237 10.1345 15.1089C9.81216 14.9261 9.49358 14.6614 9.26201 14.2747C9.02952 13.8863 8.92714 13.4457 8.92714 12.9789C8.92714 11.7161 9.7716 10.652 11.129 10.2547V9.51437C11.129 8.92264 11.6088 8.44294 12.2005 8.44294C12.7922 8.44294 13.2719 8.92264 13.2719 9.51437V10.2267C13.6324 10.3263 13.9415 10.4686 14.1917 10.613C14.4511 10.7627 14.6538 10.918 14.7953 11.0396C14.8665 11.1008 14.9234 11.1545 14.9655 11.1961C14.9866 11.217 15.004 11.235 15.0178 11.2495L15.0358 11.2687L15.0427 11.2762L15.0457 11.2795L15.047 11.2809C15.0473 11.2813 15.0483 11.2823 14.2507 11.9978L15.0483 11.2823C15.4434 11.7228 15.4066 12.4002 14.9662 12.7953C14.5296 13.187 13.8604 13.1544 13.4638 12.725L13.1206 12.4689ZM13.1206 12.4689C13.2443 12.5403 13.3388 12.6134 13.3988 12.6649C13.4284 12.6903 13.4483 12.7094 13.4578 12.7189L13.4628 12.7238L13.1206 12.4689ZM13.1875 16.2137C13.1876 16.2137 13.1877 16.213 13.1875 16.2137L13.185 16.2194C13.1863 16.2155 13.1873 16.2136 13.1875 16.2137Z\" fill=\"currentColor\"></path>"
  },
  "building-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.7182 0.516495C7.43043 0.255708 9.82402 0 12 0C14.176 0 16.5696 0.255708 18.2819 0.516495C19.9075 0.764098 21.1397 2.01739 21.4051 3.62167C22.2979 9.01843 22.5323 16.7537 22.0204 21.7714C21.8872 23.0775 20.7724 24 19.5125 24H14.5715V20.0337C14.5715 18.6135 13.4202 17.4622 12 17.4622C10.5799 17.4622 9.42861 18.6135 9.42861 20.0337V24H4.48745C3.22767 24 2.11277 23.0775 1.97957 21.7714C1.46783 16.7537 1.70207 9.01843 2.59493 3.62167C2.86035 2.01739 4.09253 0.764098 5.7182 0.516495ZM14.5715 11.7857C13.9797 11.7857 13.5 12.2654 13.5 12.8571C13.5 13.4489 13.9797 13.9286 14.5715 13.9286H16.2857C16.8775 13.9286 17.3572 13.4489 17.3572 12.8571C17.3572 12.2654 16.8775 11.7857 16.2857 11.7857H14.5715ZM7.71432 6.64286C7.12258 6.64286 6.64289 7.12255 6.64289 7.71429C6.64289 8.30602 7.12258 8.78571 7.71432 8.78571H9.42861C10.0203 8.78571 10.5 8.30602 10.5 7.71429C10.5 7.12255 10.0203 6.64286 9.42861 6.64286H7.71432ZM13.5 7.71429C13.5 7.12255 13.9797 6.64286 14.5715 6.64286H16.2857C16.8775 6.64286 17.3572 7.12255 17.3572 7.71429C17.3572 8.30602 16.8775 8.78571 16.2857 8.78571H14.5715C13.9797 8.78571 13.5 8.30602 13.5 7.71429ZM7.71432 11.7857C7.12258 11.7857 6.64289 12.2654 6.64289 12.8571C6.64289 13.4489 7.12258 13.9286 7.71432 13.9286H9.42861C10.0203 13.9286 10.5 13.4489 10.5 12.8571C10.5 12.2654 10.0203 11.7857 9.42861 11.7857H7.71432Z\" fill=\"currentColor\"></path>"
  },
  "button-power-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.7146 1.28864V8.9611C10.7146 9.67118 11.2902 10.2468 12.0003 10.2468C12.7104 10.2468 13.286 9.67118 13.286 8.9611V1.28864C13.286 0.578563 12.7104 0.00292972 12.0003 0.00292969C11.2902 0.00292967 10.7146 0.578563 10.7146 1.28864ZM6.55867 5.34206C7.15401 4.95504 7.3229 4.15869 6.9359 3.56333C6.54888 2.96799 5.75252 2.7991 5.15719 3.1861C2.17395 5.12537 0.701416 8.47255 0.701416 12.6985C0.701416 16.1393 1.67312 19.0089 3.68134 21.0171C5.68958 23.0254 8.55924 23.9971 12 23.9971C15.4408 23.9971 18.3104 23.0254 20.3187 21.0171C22.327 19.0089 23.2986 16.1393 23.2986 12.6985C23.2986 8.47255 21.8261 5.12537 18.8429 3.1861C18.2475 2.7991 17.4512 2.96799 17.0642 3.56333C16.6772 4.15869 16.8461 4.95504 17.4415 5.34206C19.4965 6.67805 20.7272 9.07642 20.7272 12.6985C20.7272 15.6659 19.8967 17.8027 18.5004 19.199C17.1043 20.5951 14.9675 21.4257 12 21.4257C9.03257 21.4257 6.89578 20.5951 5.49962 19.199C4.10347 17.8027 3.27284 15.6659 3.27284 12.6985C3.27284 9.07642 4.50344 6.67805 6.55867 5.34206Z\" fill=\"currentColor\"></path>"
  },
  "button-power-circle-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 0C8.27652 0 5.2465 1.04988 3.1482 3.1482C1.04988 5.2465 0 8.27652 0 12C0 15.7235 1.04988 18.7534 3.1482 20.8519C5.2465 22.9502 8.27652 24 12 24C15.7235 24 18.7534 22.9502 20.8519 20.8519C22.9502 18.7534 24 15.7235 24 12C24 8.27652 22.9502 5.2465 20.8519 3.1482C18.7534 1.04988 15.7235 0 12 0ZM14.8806 6.47823C14.5193 6.94689 14.6064 7.61967 15.0751 7.98093C16.2735 8.90472 17.0424 10.3511 17.0424 11.9775C17.0424 14.7624 14.7848 17.0199 12 17.0199C9.21516 17.0199 6.95758 14.7624 6.95758 11.9775C6.95758 10.3511 7.72646 8.90472 8.92495 7.98093C9.39362 7.61967 9.48069 6.94689 9.11943 6.47823C8.7582 6.00957 8.08541 5.92248 7.61674 6.28373C5.91459 7.59574 4.81473 9.65844 4.81473 11.9775C4.81473 15.9459 8.03169 19.1628 12 19.1628C15.9683 19.1628 19.1853 15.9459 19.1853 11.9775C19.1853 9.65844 18.0854 7.59574 16.3833 6.28373C15.9146 5.92248 15.2418 6.00957 14.8806 6.47823ZM13.0714 5.31739C13.0714 4.72565 12.5917 4.24596 12 4.24596C11.4083 4.24596 10.9286 4.72565 10.9286 5.31739V10.8596C10.9286 11.4513 11.4083 11.931 12 11.931C12.5917 11.931 13.0714 11.4513 13.0714 10.8596V5.31739Z\" fill=\"currentColor\"></path>"
  },
  "calendar-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.57467 1.71443C8.57467 1.00434 7.99904 0.428711 7.28895 0.428711C6.57888 0.428711 6.00324 1.00434 6.00324 1.71443V3.0899C3.24173 3.4169 1.04774 5.58856 0.730569 8.31254C0.327766 11.772 0.327766 14.7284 0.730569 18.1879C1.06432 21.0541 3.47621 23.3089 6.44074 23.4464C8.21763 23.5287 10.0321 23.5716 11.9997 23.5716C13.9674 23.5716 15.7818 23.5287 17.5586 23.4464C20.5233 23.3089 22.9352 21.0541 23.2689 18.1879C23.6716 14.7284 23.6716 11.772 23.2689 8.31254C22.9518 5.58868 20.7578 3.41707 17.9965 3.08995V1.71443C17.9965 1.00434 17.421 0.428711 16.7108 0.428711C16.0007 0.428711 15.4251 1.00434 15.4251 1.71443V2.97496C14.3223 2.94441 13.189 2.92877 11.9997 2.92877C10.8106 2.92877 9.67742 2.94441 8.57467 2.97496V1.71443ZM16.3337 11.3797C16.772 10.9821 16.805 10.3046 16.4074 9.86628C16.0099 9.42801 15.3323 9.39501 14.894 9.79259C13.6863 10.8881 12.7726 11.8786 12.0001 13.0843C11.4772 13.9005 11.0325 14.7943 10.6027 15.8541L9.153 14.3591C8.74107 13.9343 8.06276 13.9238 7.63795 14.3358C7.21315 14.7477 7.20271 15.426 7.61465 15.8508L10.2437 18.5621C10.5025 18.829 10.8812 18.9427 11.2442 18.8624C11.6071 18.7822 11.9026 18.5196 12.0248 18.1685C12.6304 16.4287 13.1648 15.2386 13.8045 14.2403C14.4398 13.2485 15.208 12.401 16.3337 11.3797Z\" fill=\"currentColor\"></path>"
  },
  "chart-circle-up-growth": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 20.8519C5.2465 22.9502 8.27652 24 12 24C15.7235 24 18.7534 22.9502 20.8519 20.8519C22.9502 18.7534 24 15.7235 24 12C24 8.27652 22.9502 5.2465 20.8519 3.1482C18.7534 1.04988 15.7235 0 12 0C8.27652 0 5.2465 1.04988 3.1482 3.1482C1.04988 5.2465 0 8.27652 0 12C0 13.7187 0.223697 15.2897 0.670949 16.6895C1.93502 15.0868 3.38769 13.7407 5.11841 12.5618C5.62893 12.2141 6.31457 12.2785 6.75135 12.7153L8.3905 14.3545C9.58023 13.354 10.8548 12.0416 12.0026 10.7193C11.6091 10.4329 11.1785 10.1726 10.7043 9.93189C10.1949 9.67341 9.91718 9.10989 10.0224 8.54847C10.1277 7.98706 10.5907 7.56238 11.1591 7.50593C12.9807 7.32501 14.0232 7.3243 15.7767 7.50651C16.3817 7.56938 16.8598 8.04753 16.9227 8.65246C17.1049 10.406 17.1042 11.4485 16.9233 13.2702C16.8668 13.8386 16.4422 14.3016 15.8807 14.4068C15.3193 14.512 14.7558 14.2343 14.4973 13.7249C14.2841 13.3048 14.0555 12.9189 13.8069 12.5627C12.3136 14.2679 10.6044 15.9719 9.04639 17.1091C8.53469 17.4826 7.82721 17.4278 7.37926 16.9798L5.7071 15.3076C4.2241 16.4448 2.99803 17.7502 1.91988 19.333C1.91902 19.3344 1.91817 19.3356 1.91729 19.3368C2.277 19.885 2.68731 20.3909 3.1482 20.8519Z\" fill=\"currentColor\"></path>"
  },
  "chat-bubble-info-help": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.81646 3.05076C5.8496 1.01618 8.78386 0 12.3849 0C15.9859 0 18.9202 1.01618 20.9533 3.05076C22.9863 5.08526 24.0017 8.0213 24.0017 11.6245C24.0017 15.2276 22.9863 18.1637 20.9533 20.1981C18.9202 22.2327 15.9859 23.249 12.3849 23.249C10.3985 23.249 8.61596 22.9406 7.07242 22.3203L2.31191 23.9083C0.918709 24.373 -0.391801 23.0225 0.108899 21.6446L1.76089 17.0983C1.09769 15.5179 0.768137 13.6802 0.768137 11.6245C0.768137 8.0213 1.78343 5.08526 3.81646 3.05076ZM12.6571 4.55691C13.2488 4.55691 13.7285 5.03662 13.7285 5.62834V6.1817C13.7285 6.77343 13.2488 7.25313 12.6571 7.25313C12.0654 7.25313 11.5857 6.77343 11.5857 6.1817V5.62834C11.5857 5.03662 12.0654 4.55691 12.6571 4.55691ZM10.0664 8.46429C9.47468 8.46429 8.99497 8.94398 8.99497 9.53571C8.99497 10.1275 9.47468 10.6071 10.0664 10.6071H10.9174C11.2725 10.6071 11.5603 10.895 11.5603 11.25V14.5613C10.9828 14.6251 10.4002 14.7398 9.80459 14.9054C9.23448 15.0639 8.90075 15.6545 9.05922 16.2246C9.21769 16.7947 9.80831 17.1285 10.3784 16.97C11.9424 16.5353 13.3463 16.5353 14.9102 16.97C15.4803 17.1285 16.0709 16.7947 16.2294 16.2246C16.3879 15.6545 16.0542 15.0639 15.484 14.9054C14.8797 14.7374 14.2889 14.6218 13.7032 14.5585V11.2501C13.7032 9.71153 12.456 8.46429 10.9174 8.46429H10.0664Z\" fill=\"currentColor\"></path>"
  },
  "chat-bubble-oval-smiley-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.81646 3.05076C5.8496 1.01618 8.78386 0 12.3849 0C15.9859 0 18.9202 1.01618 20.9533 3.05076C22.9863 5.08526 24.0017 8.0213 24.0017 11.6245C24.0017 15.2276 22.9863 18.1637 20.9533 20.1981C18.9202 22.2327 15.9859 23.249 12.3849 23.249C10.3985 23.249 8.61596 22.9406 7.07242 22.3203L2.31191 23.9083C0.918709 24.373 -0.391801 23.0225 0.108899 21.6446L1.76089 17.0983C1.09769 15.5179 0.768137 13.6802 0.768137 11.6245C0.768137 8.0213 1.78343 5.08526 3.81646 3.05076ZM9.96939 8.83761C9.96939 8.24589 9.4897 7.76618 8.89796 7.76618C8.30622 7.76618 7.82653 8.24589 7.82653 8.83761V9.73824C7.82653 10.33 8.30622 10.8097 8.89796 10.8097C9.4897 10.8097 9.96939 10.33 9.96939 9.73824V8.83761ZM16.8366 8.83761C16.8366 8.24589 16.3569 7.76618 15.7651 7.76618C15.1734 7.76618 14.6937 8.24589 14.6937 8.83761V9.73824C14.6937 10.33 15.1734 10.8097 15.7651 10.8097C16.3569 10.8097 16.8366 10.33 16.8366 9.73824V8.83761ZM16.5278 12.7772C17.0876 12.9691 17.3857 13.5784 17.1939 14.1382C16.8544 15.1288 16.2403 15.9329 15.3702 16.4772C14.5122 17.0137 13.4726 17.2565 12.3307 17.2565C11.1889 17.2565 10.1493 17.0137 9.29134 16.4772C8.42115 15.9329 7.80713 15.1288 7.46758 14.1382C7.2757 13.5784 7.57393 12.9691 8.13368 12.7772C8.69345 12.5854 9.30277 12.8836 9.49465 13.4433C9.68602 14.0017 10.0027 14.3947 10.4276 14.6604C10.8648 14.9338 11.4845 15.1137 12.3307 15.1137C13.177 15.1137 13.7968 14.9338 14.2339 14.6604C14.6587 14.3947 14.9755 14.0017 15.1669 13.4433C15.3587 12.8836 15.9681 12.5854 16.5278 12.7772Z\" fill=\"currentColor\"></path>"
  },
  "chat-bubble-square-add": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.38842 0.823989C6.83417 0.567104 9.38837 0.428711 11.9999 0.428711C14.6058 0.428711 17.1151 0.575606 19.5596 0.828359C21.3904 1.01766 22.8983 2.40268 23.1625 4.25465C23.4225 6.07721 23.5713 7.97652 23.5713 9.91394C23.5713 11.841 23.4081 13.7084 23.1534 15.5125C22.8885 17.3888 21.3647 18.8081 19.5004 18.9973C17.1465 19.2365 14.716 19.3909 12.2039 19.3988C10.4459 21.3665 8.98951 22.4149 6.58186 23.4963C6.31663 23.6155 6.0091 23.592 5.765 23.4341C5.52091 23.276 5.37353 23.0052 5.37353 22.7144V19.0059L4.98842 18.9701L4.6151 18.9353C2.72746 18.7596 1.08661 17.3696 0.814274 15.4133C0.56645 13.6331 0.428467 11.801 0.428467 9.91394C0.428467 7.96368 0.566213 6.04303 0.832078 4.20184C1.09603 2.37388 2.58464 1.01344 4.38842 0.823989ZM11.9999 4.3548C12.71 4.3548 13.2856 4.93044 13.2856 5.64052V8.64052H16.2856C16.9957 8.64052 17.5713 9.21616 17.5713 9.92623C17.5713 10.6363 16.9957 11.2119 16.2856 11.2119H13.2856V14.2119C13.2856 14.922 12.71 15.4977 11.9999 15.4977C11.2898 15.4977 10.7142 14.922 10.7142 14.2119V11.2119H7.71418C7.00411 11.2119 6.42847 10.6363 6.42847 9.92623C6.42847 9.21616 7.00411 8.64052 7.71418 8.64052H10.7142V5.64052C10.7142 4.93044 11.2898 4.3548 11.9999 4.3548Z\" fill=\"currentColor\"></path>"
  },
  "chat-bubble-square-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.38842 0.823989C6.83417 0.567104 9.38837 0.428711 11.9999 0.428711C14.6058 0.428711 17.1151 0.575606 19.5596 0.828359C21.3904 1.01766 22.8983 2.40268 23.1625 4.25465C23.4225 6.07721 23.5713 7.97652 23.5713 9.91394C23.5713 11.841 23.4081 13.7084 23.1534 15.5125C22.8885 17.3888 21.3647 18.8081 19.5004 18.9973C17.1465 19.2365 14.716 19.3909 12.2039 19.3988C10.4459 21.3665 8.98951 22.4149 6.58186 23.4963C6.31663 23.6155 6.0091 23.592 5.765 23.4341C5.52091 23.276 5.37353 23.0052 5.37353 22.7144V19.0059L4.98842 18.9701L4.6151 18.9353C2.72746 18.7596 1.08661 17.3696 0.814274 15.4133C0.56645 13.6331 0.428467 11.801 0.428467 9.91394C0.428467 7.96368 0.566213 6.04303 0.832078 4.20184C1.09603 2.37388 2.58464 1.01344 4.38842 0.823989ZM17.0055 6.43409C17.4438 6.03652 17.4767 5.35893 17.0792 4.92065C16.6816 4.48238 16.004 4.4494 15.5657 4.84696C14.1416 6.13884 13.0718 7.29988 12.1688 8.70936C11.5112 9.73584 10.9575 10.8698 10.4154 12.2443L8.48336 10.2518C8.07142 9.82699 7.39311 9.81655 6.96831 10.2285C6.54351 10.6404 6.53307 11.3187 6.945 11.7435L10.0619 14.9578C10.3207 15.2247 10.6993 15.3384 11.0623 15.2581C11.4252 15.1779 11.7207 14.9153 11.8429 14.5642C12.5633 12.4948 13.2029 11.0675 13.9731 9.86536C14.7391 8.66978 15.6632 7.65168 17.0055 6.43409Z\" fill=\"currentColor\"></path>"
  },
  "chat-bubble-typing-oval": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.81646 3.05076C5.8496 1.01618 8.78386 0 12.3849 0C15.9859 0 18.9202 1.01618 20.9533 3.05076C22.9863 5.08526 24.0017 8.0213 24.0017 11.6245C24.0017 15.2276 22.9863 18.1637 20.9533 20.1981C18.9202 22.2327 15.9859 23.249 12.3849 23.249C10.3985 23.249 8.61596 22.9406 7.07242 22.3203L2.31191 23.9083C0.918709 24.373 -0.391801 23.0225 0.108899 21.6446L1.76089 17.0983C1.09769 15.5179 0.768137 13.6802 0.768137 11.6245C0.768137 8.0213 1.78343 5.08526 3.81646 3.05076ZM8.80518 11.2573C8.80518 10.5472 8.22954 9.97161 7.51947 9.97161C6.80938 9.97161 6.23375 10.5472 6.23375 11.2573V12C6.23375 12.7101 6.80938 13.2857 7.51947 13.2857C8.22954 13.2857 8.80518 12.7101 8.80518 12V11.2573ZM13.8101 11.2573C13.8101 10.5472 13.2345 9.97161 12.5244 9.97161C11.8143 9.97161 11.2387 10.5472 11.2387 11.2573V12C11.2387 12.7101 11.8143 13.2857 12.5244 13.2857C13.2345 13.2857 13.8101 12.7101 13.8101 12V11.2573ZM17.5292 9.97161C18.2393 9.97161 18.8149 10.5472 18.8149 11.2573V12C18.8149 12.7101 18.2393 13.2857 17.5292 13.2857C16.8191 13.2857 16.2435 12.7101 16.2435 12V11.2573C16.2435 10.5472 16.8191 9.97161 17.5292 9.97161Z\" fill=\"currentColor\"></path>"
  },
  "check-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.2695 0.813887C8.11039 0.608694 10.0313 0.428711 11.9999 0.428711C13.9684 0.428711 15.8894 0.608694 17.7302 0.813887C20.5965 1.13337 22.8995 3.43437 23.2067 6.30576C23.4026 8.13713 23.5713 10.0452 23.5713 12.0001C23.5713 13.955 23.4026 15.8631 23.2067 17.6945C22.8995 20.5659 20.5965 22.867 17.7302 23.1864C15.8894 23.3916 13.9684 23.5716 11.9999 23.5716C10.0313 23.5716 8.11039 23.3916 6.2695 23.1864C3.4033 22.867 1.10031 20.5659 0.793102 17.6945C0.597166 15.8631 0.428467 13.955 0.428467 12.0001C0.428467 10.0452 0.597166 8.13713 0.793102 6.30576C1.10031 3.43437 3.4033 1.13337 6.2695 0.813887ZM17.0055 8.50799C17.4438 8.11041 17.4767 7.43282 17.0792 6.99456C16.6816 6.55629 16.004 6.52329 15.5657 6.92087C14.1416 8.21275 13.0718 9.37379 12.1688 10.7833C11.5112 11.8097 10.9575 12.9438 10.4154 14.3181L8.48336 12.3257C8.07142 11.9009 7.39311 11.8905 6.96831 12.3024C6.54351 12.7143 6.53307 13.3926 6.945 13.8174L10.0619 17.0317C10.3207 17.2987 10.6993 17.4123 11.0623 17.3321C11.4252 17.2519 11.7207 16.9892 11.8429 16.6381C12.5633 14.5687 13.2029 13.1414 13.9731 11.9392C14.7391 10.7437 15.6632 9.72559 17.0055 8.50799Z\" fill=\"currentColor\"></path>"
  },
  "check-thick": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.5551 1.71443C21.101 0.111609 18.623 -0.00905454 17.0202 1.44492C14.4005 3.82139 12.3539 6.02839 10.6132 8.74547C9.84617 9.94262 9.15965 11.2058 8.51431 12.5825L7.15982 11.1856C5.65332 9.63206 3.17264 9.5939 1.61908 11.1004C0.0655073 12.6069 0.0273434 15.0876 1.53384 16.6411L7.09968 22.3808C8.04608 23.3569 9.43076 23.7725 10.7582 23.4792C12.0857 23.1859 13.1662 22.2253 13.6132 20.9413C14.8755 17.3155 15.9567 14.932 17.2117 12.9731C18.4513 11.0383 19.9653 9.35405 22.2856 7.24927C23.8883 5.79528 24.009 3.31727 22.5551 1.71443Z\" fill=\"currentColor\"></path>"
  },
  "circle-clock": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.14925 3.14925C5.24971 1.04877 8.28082 0 12 0C15.7192 0 18.7503 1.04877 20.8507 3.14925C22.9512 5.24971 24 8.28082 24 12C24 15.7192 22.9512 18.7503 20.8507 20.8507C18.7503 22.9512 15.7192 24 12 24C8.28082 24 5.24971 22.9512 3.14925 20.8507C1.04877 18.7503 0 15.7192 0 12C0 8.28082 1.04877 5.24971 3.14925 3.14925ZM12.0557 5.40235C12.7657 5.40235 13.3414 5.97797 13.3414 6.68806V11.4073L16.0651 14.1792C16.5628 14.6857 16.5557 15.4997 16.0492 15.9974C15.5427 16.4951 14.7287 16.488 14.231 15.9815L11.1386 12.8344C10.9023 12.5939 10.7699 12.2703 10.7699 11.9332V6.68806C10.7699 5.97797 11.3456 5.40235 12.0557 5.40235Z\" fill=\"currentColor\"></path>"
  },
  "cog": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.2989 1.14441e-05C10.7817 0.000667589 10.2752 0.156312 9.84748 0.447216C9.42027 0.737789 9.09019 1.15004 8.90097 1.63085L8.90025 1.63269L8.25374 3.25954L6.26721 4.40314L4.52474 4.13892C4.01258 4.06207 3.48758 4.14038 3.02057 4.36428C2.5537 4.58813 2.16477 4.94714 1.90516 5.39517L1.20432 6.60123C0.944007 7.04919 0.825396 7.5653 0.864471 8.08197C0.903534 8.59846 1.0983 9.09072 1.42262 9.49452L2.52259 10.8651V13.135L1.42291 14.5052C1.09859 14.909 0.903534 15.4016 0.864471 15.9181C0.825396 16.4347 0.944 16.9508 1.20431 17.3988L1.90483 18.6043C2.16442 19.0524 2.55365 19.4119 3.02057 19.6358C3.48758 19.8597 4.01128 19.9382 4.52344 19.8614L6.27223 19.5969L8.25324 20.7341L8.89704 22.3673C9.0862 22.8487 9.41674 23.262 9.84429 23.5527C10.272 23.8437 10.7774 23.9993 11.2946 24H11.9963H12.698C13.2152 23.9993 13.7206 23.8437 14.1483 23.5527C14.5758 23.262 14.9064 22.8487 15.0955 22.3673L15.7393 20.7339L17.7203 19.5969L19.4692 19.8612C19.9812 19.9382 20.505 19.8597 20.9721 19.6358C21.4389 19.4119 21.8282 19.0524 22.0878 18.6043L22.7882 17.3988C23.0486 16.9508 23.1672 16.4347 23.1282 15.9181C23.0891 15.4015 22.894 14.9089 22.5696 14.5051L21.4699 13.1349V10.8651L22.57 9.4945C22.8943 9.0907 23.0891 8.59846 23.1282 8.08195C23.1672 7.56528 23.0486 7.04918 22.7882 6.60122L22.0874 5.39515C21.8279 4.94712 21.4389 4.58811 20.9721 4.36426C20.505 4.14036 19.98 4.06205 19.4678 4.1389L17.7254 4.40313L15.7388 3.25954L15.0923 1.63268L15.0916 1.63084C14.9024 1.15003 14.5723 0.737779 14.1451 0.447204C13.7174 0.1563 13.2109 0.000656145 12.6937 0L11.9963 1.18017e-05L11.2989 1.14441e-05ZM9.05976 9.06309C9.76677 8.35608 10.7786 8.01228 11.9963 8.01228C13.214 8.01228 14.2258 8.35608 14.9328 9.06309C15.6398 9.77007 15.9836 10.7819 15.9836 11.9996C15.9836 13.2173 15.6398 14.2291 14.9328 14.9361C14.2258 15.6431 13.214 15.9869 11.9963 15.9869C10.7786 15.9869 9.76677 15.6431 9.05976 14.9361C8.35277 14.2291 8.00897 13.2173 8.00897 11.9996C8.00897 10.7819 8.35277 9.77007 9.05976 9.06309Z\" fill=\"currentColor\"></path>"
  },
  "cog-automation-gear-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.2989 0C10.7817 0.000658699 10.2752 0.156303 9.84748 0.447207C9.42027 0.737781 9.09019 1.15003 8.90097 1.63085L8.90025 1.63268L8.25374 3.25954L6.26721 4.40313L4.52474 4.13892C4.01258 4.06207 3.48758 4.14036 3.02057 4.36428C2.5537 4.58811 2.16477 4.94712 1.90516 5.39515L1.20432 6.60122C0.944007 7.04918 0.825396 7.56528 0.864471 8.08195C0.903534 8.59846 1.0983 9.0907 1.42262 9.4945L2.52259 10.8651V13.135L1.42291 14.5051C1.09859 14.9089 0.903534 15.4016 0.864471 15.9181C0.825396 16.4347 0.944 16.9508 1.20431 17.3988L1.90483 18.6043C2.16442 19.0524 2.55365 19.4119 3.02057 19.6358C3.48758 19.8597 4.01128 19.9382 4.52344 19.8614L6.27223 19.5969L8.25324 20.7339L8.89704 22.3673C9.0862 22.8487 9.41674 23.262 9.84429 23.5527C10.272 23.8437 10.7774 23.9993 11.2946 24H12.007H12.7087C13.2259 23.9993 13.7313 23.8437 14.159 23.5527C14.5865 23.262 14.9171 22.8487 15.1062 22.3673L15.75 20.7339L17.7311 19.5969L19.4798 19.8612C19.992 19.9382 20.5157 19.8597 20.9827 19.6358C21.4497 19.4119 21.8388 19.0524 22.0984 18.6043L22.799 17.3988C23.0592 16.9508 23.1779 16.4347 23.1388 15.9181C23.0997 15.4015 22.9046 14.9089 22.5804 14.5051L21.4807 13.1349V10.8651L22.5806 9.4945C22.905 9.0907 23.0997 8.59846 23.1388 8.08195C23.1779 7.56528 23.0592 7.04918 22.799 6.60122L22.098 5.39515C21.8385 4.94712 21.4495 4.58811 20.9827 4.36426C20.5157 4.14036 19.9907 4.06205 19.4786 4.1389L17.736 4.40313L15.7495 3.25954L15.103 1.63268L15.1023 1.63084C14.9131 1.15003 14.583 0.737779 14.1558 0.447204C13.7281 0.1563 13.2216 0.000656145 12.7044 0H11.2989ZM16.1317 9.68443C16.6577 9.20732 16.6973 8.39422 16.2202 7.8683C15.7431 7.34237 14.93 7.30277 14.404 7.77986C13.3002 8.78117 12.4527 9.69773 11.7341 10.8193C11.3247 11.4583 10.9686 12.1461 10.6309 12.9281L9.6552 11.9219C9.16087 11.4122 8.34689 11.3996 7.83713 11.894C7.32737 12.3883 7.31484 13.2022 7.80916 13.712L10.1858 16.1629C10.4963 16.4831 10.9507 16.6195 11.3863 16.5233C11.8218 16.427 12.1764 16.1119 12.323 15.6906C12.8667 14.1289 13.3401 13.0792 13.8993 12.2065C14.4534 11.3416 15.1262 10.5966 16.1317 9.68443Z\" fill=\"currentColor\"></path>"
  },
  "countdown-timer": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.5557 0.0147812C13.8537 -0.0919363 13.198 0.390649 13.0913 1.09266C12.9846 1.79468 13.4672 2.45029 14.1692 2.55701C15.2271 2.71783 16.1579 2.99957 16.966 3.38547C17.6067 3.69147 18.3742 3.42008 18.6802 2.77933C18.9862 2.13857 18.7148 1.37106 18.0742 1.06506C17.0112 0.557454 15.833 0.208948 14.5557 0.0147812ZM20.1992 4.06606C20.7874 3.66812 21.5868 3.82227 21.9847 4.41036C22.554 5.25175 23.0014 6.19104 23.3285 7.21606C23.5443 7.89255 23.171 8.61591 22.4945 8.83174C21.818 9.04757 21.0946 8.67415 20.8788 7.99765C20.6203 7.18743 20.2759 6.47336 19.855 5.85144C19.4571 5.26333 19.6112 4.464 20.1992 4.06606ZM2.57143 11.9156C2.57143 11.2056 1.9958 10.6299 1.28571 10.6299C0.575634 10.6299 0 11.2056 0 11.9156C0 15.6055 1.03325 18.6706 3.15884 20.813C5.28591 22.957 8.33232 24.0012 12.0005 24.0012C12.7106 24.0012 13.2862 23.4255 13.2862 22.7155C13.2862 22.0052 12.7106 21.4298 12.0005 21.4298C8.8112 21.4298 6.50024 20.5299 4.98428 19.002C3.46685 17.4725 2.57143 15.1377 2.57143 11.9156ZM24.0014 11.9156C24.0014 11.2056 23.4257 10.6299 22.7156 10.6299C22.0056 10.6299 21.4299 11.2056 21.4299 11.9156C21.4299 13.7902 21.1253 15.3668 20.5748 16.6534L20.5649 16.6772C20.4806 16.6729 20.3952 16.6708 20.3093 16.6708C19.3294 16.6708 18.4428 16.949 17.802 17.5898C17.1612 18.2306 16.883 19.1172 16.883 20.0971C16.883 21.077 17.1612 21.9636 17.802 22.6044C18.4428 23.2452 19.3294 23.5234 20.3093 23.5234C21.2892 23.5234 22.1758 23.2452 22.8166 22.6044C23.4574 21.9636 23.7356 21.077 23.7356 20.0971C23.7356 19.1731 23.4881 18.3319 22.9226 17.7017C22.9282 17.6895 22.9337 17.6772 22.939 17.6647C23.653 15.9959 24.0014 14.0627 24.0014 11.9156ZM10.9105 1.09266C11.0172 1.79468 10.5346 2.45029 9.83264 2.55701C8.77471 2.71783 7.84392 2.99957 7.03582 3.38547C6.39507 3.69147 5.62755 3.42008 5.32157 2.77933C5.01557 2.13857 5.28694 1.37106 5.92771 1.06506C6.99063 0.557454 8.16889 0.208948 9.44617 0.0147812C10.1482 -0.0919363 10.8038 0.390649 10.9105 1.09266ZM4.146 5.85185C4.54393 5.26375 4.38979 4.46441 3.80168 4.06647C3.2136 3.66853 2.41424 3.82268 2.01631 4.41079C1.44699 5.25216 0.999508 6.19147 0.672477 7.21647C0.456645 7.89296 0.830076 8.61632 1.50656 8.83215C2.18304 9.048 2.90641 8.67456 3.12224 7.99808C3.38074 7.18784 3.72517 6.47377 4.146 5.85185ZM13.3422 6.6889C13.3422 5.97881 12.7666 5.40319 12.0565 5.40319C11.3464 5.40319 10.7708 5.97881 10.7708 6.6889V11.9341C10.7708 12.2712 10.9032 12.5948 11.1394 12.8352L14.2318 15.9823C14.7295 16.4888 15.5435 16.496 16.05 15.9983C16.5565 15.5006 16.5637 14.6866 16.066 14.1801L13.3422 11.4081V6.6889Z\" fill=\"currentColor\"></path>"
  },
  "cute-folder-emoji-happy": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M3.34664 0.56353C5.36562 0.414311 6.89327 0.380581 9.39686 0.499914C10.4399 0.549716 11.338 1.23302 11.682 2.20751L12.0537 3.26051C12.1718 3.59553 12.4851 3.82345 12.8388 3.83138C15.6752 3.89431 17.3192 3.90525 19.6775 4.11097C21.7239 4.28987 23.317 5.94997 23.4359 7.99322C23.6828 12.2448 23.5849 15.7107 23.1999 19.0959C22.9604 21.2007 21.3419 22.9133 19.2658 23.1505C14.4432 23.7017 9.68624 23.7156 4.86002 23.1639C2.79133 22.9275 1.05746 21.3123 0.80534 19.0959C0.190487 13.6893 0.387182 8.29154 0.97275 2.94076C1.1079 1.70822 2.06078 0.658762 3.34664 0.56353ZM9.34496 15.597C9.03083 15.0961 8.36968 14.9452 7.86839 15.2588C7.367 15.5729 7.21473 16.2339 7.52855 16.7354C8.06793 17.5957 9.69945 18.7695 12.0972 18.7695C14.5447 18.7692 16.0389 17.5597 16.6072 16.8174C16.9665 16.3478 16.8772 15.6755 16.408 15.3158C15.9383 14.9564 15.266 15.0456 14.9063 15.515C14.6928 15.7939 13.7985 16.6263 12.0972 16.6266C11.2398 16.6266 10.5722 16.4167 10.1017 16.1729C9.86516 16.0503 9.67976 15.9193 9.54753 15.8063C9.48205 15.7502 9.43225 15.6998 9.39686 15.6606C9.37959 15.6415 9.3656 15.6253 9.35668 15.6138C9.34986 15.6049 9.34593 15.5986 9.34496 15.597ZM8.14463 9.19355C7.55329 9.19384 7.07344 9.67362 7.0732 10.265V11.4285C7.07365 12.0197 7.55341 12.4996 8.14463 12.4999C8.73606 12.4999 9.2156 12.0198 9.21606 11.4285V10.265C9.21582 9.67346 8.73618 9.19358 8.14463 9.19355ZM15.8556 9.19355C15.264 9.19355 14.7844 9.67345 14.7841 10.265V11.4285C14.7846 12.0198 15.2641 12.4999 15.8556 12.4999C16.4467 12.4996 16.9265 12.0196 16.927 11.4285V10.265C16.9267 9.67363 16.4469 9.19386 15.8556 9.19355Z\" fill=\"currentColor\"></path>"
  },
  "cute-folder-emoji-sad": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M3.34663 0.563528C5.36558 0.414313 6.8933 0.380581 9.39686 0.499912C10.4399 0.549711 11.338 1.23303 11.682 2.20751L12.0537 3.26051C12.1718 3.59551 12.4851 3.82343 12.8388 3.83138C15.6752 3.89431 17.3192 3.90525 19.6775 4.11096C21.7239 4.28985 23.3169 5.94996 23.4359 7.99322C23.6828 12.2448 23.5849 15.7107 23.1999 19.0959C22.9604 21.2005 21.3419 22.9133 19.2657 23.1505C14.4432 23.7017 9.68624 23.7156 4.86002 23.1639C2.79133 22.9275 1.05746 21.3123 0.805338 19.0959C0.190489 13.6894 0.387181 8.29152 0.972748 2.94076C1.1079 1.70825 2.06083 0.658789 3.34663 0.563528ZM12.0972 15.0948C9.69937 15.0948 8.06788 16.2685 7.52855 17.1288C7.21453 17.6302 7.36703 18.2912 7.86839 18.6055C8.36977 18.919 9.03091 18.7683 9.34495 18.2672C9.34585 18.2657 9.34957 18.2597 9.35668 18.2504C9.36563 18.2389 9.37945 18.2228 9.39686 18.2036C9.43228 18.1644 9.48191 18.1141 9.54753 18.0579C9.67979 17.9449 9.86503 17.814 10.1017 17.6914C10.5722 17.4475 11.2397 17.2376 12.0972 17.2376C13.7981 17.238 14.6925 18.0701 14.9063 18.3492C15.2661 18.8187 15.9383 18.908 16.408 18.5485C16.8773 18.1887 16.9665 17.5165 16.6072 17.0468C16.0388 16.3044 14.5445 15.0951 12.0972 15.0948ZM8.14463 9.19188C7.55327 9.19216 7.07344 9.67362 7.0732 10.265V11.4285C7.07365 12.0197 7.55341 12.4996 8.14463 12.4999C8.73607 12.4999 9.21559 12.0198 9.21606 11.4285V10.265C9.21582 9.67346 8.73619 9.19188 8.14463 9.19188ZM15.8556 9.19188C15.264 9.19188 14.7844 9.67344 14.7841 10.265V11.4285C14.7846 12.0198 15.2641 12.4999 15.8556 12.4999C16.4468 12.4996 16.9265 12.0197 16.927 11.4285V10.265C16.9267 9.67363 16.4469 9.19218 15.8556 9.19188Z\" fill=\"currentColor\"></path>"
  },
  "dangerous": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.0203 1.33894C6.87761 0.481632 8.04038 0 9.25279 0H14.7472C15.9596 0 17.1224 0.481632 17.9798 1.33894L22.6611 6.0203C23.5183 6.87761 24 8.04038 24 9.25279V14.7472C24 15.9596 23.5183 17.1224 22.6611 17.9798L17.9798 22.6611C17.1224 23.5183 15.9596 24 14.7472 24H9.25279C8.04038 24 6.87761 23.5183 6.0203 22.6611L1.33894 17.9798C0.481632 17.1224 0 15.9596 0 14.7472V9.25279C0 8.04038 0.481632 6.87761 1.33894 6.0203L6.0203 1.33894ZM8.25761 6.74239C7.83919 6.32397 7.16081 6.32397 6.74239 6.74239C6.32397 7.16081 6.32397 7.83919 6.74239 8.25761L10.4848 12L6.74242 15.7424C6.324 16.1608 6.324 16.8392 6.74242 17.2575C7.16083 17.676 7.83922 17.676 8.25765 17.2575L12 13.5152L15.7421 17.2574C16.1605 17.6757 16.8389 17.6757 17.2574 17.2574C17.6757 16.8389 17.6757 16.1605 17.2574 15.7421L13.5152 12L17.2574 8.25792C17.6758 7.83951 17.6758 7.16112 17.2574 6.7427C16.8389 6.32427 16.1605 6.32427 15.7421 6.7427L12 10.4848L8.25761 6.74239Z\" fill=\"currentColor\"></path>"
  },
  "delete-circle": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 0C8.28082 0 5.24971 1.04877 3.14925 3.14925C1.04877 5.24971 0 8.28082 0 12C0 15.7192 1.04877 18.7503 3.14925 20.8507C5.24971 22.9512 8.28082 24 12 24C15.7192 24 18.7503 22.9512 20.8507 20.8507C22.9512 18.7503 24 15.7192 24 12C24 8.28082 22.9512 5.24971 20.8507 3.14925C18.7503 1.04877 15.7192 0 12 0ZM17.0977 6.9031C17.5162 7.32153 17.5162 7.99992 17.0977 8.41833L13.5161 12L17.0977 15.5817C17.5162 16.0001 17.5162 16.6785 17.0977 17.0969C16.6793 17.5154 16.0009 17.5154 15.5825 17.0969L12.0008 13.5152L8.41917 17.0969C8.00074 17.5154 7.32235 17.5154 6.90394 17.0969C6.48552 16.6785 6.48552 16.0001 6.90394 15.5817L10.4856 12L6.90394 8.41833C6.48552 7.9999 6.48552 7.32153 6.90394 6.9031C7.32235 6.48468 8.00074 6.48468 8.41917 6.9031L12.0008 10.4848L15.5825 6.9031C16.0009 6.48468 16.6793 6.48468 17.0977 6.9031Z\" fill=\"currentColor\"></path>"
  },
  "delete-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.44614 0.742338C10.1815 0.323518 13.8179 0.323518 17.5533 0.742338C20.5248 1.0755 22.9018 3.47049 23.2191 6.45305C23.4077 8.22597 23.5718 10.0877 23.5718 12.0001C23.5718 13.9125 23.4077 15.7743 23.2191 17.5472C22.9018 20.5298 20.5248 22.9247 17.5533 23.258C13.8179 23.6768 10.1815 23.6768 6.44614 23.258C3.47472 22.9247 1.09757 20.5298 0.780346 17.5472C0.591776 15.7743 0.427734 13.9125 0.427734 12.0001C0.427734 10.0877 0.591776 8.22597 0.780344 6.45305C1.09757 3.47049 3.47472 1.0755 6.44614 0.742338ZM17.0977 17.097C16.6793 17.5154 16.0009 17.5154 15.5825 17.097L12.0008 13.5153L8.41917 17.097C8.00074 17.5154 7.32235 17.5154 6.90394 17.097C6.48552 16.6786 6.48552 16.0002 6.90394 15.5817L10.4856 12.0001L6.90394 8.4184C6.48552 7.99997 6.48552 7.3216 6.90394 6.90317C7.32235 6.48475 8.00074 6.48475 8.41917 6.90317L12.0008 10.4848L15.5825 6.90317C16.0009 6.48475 16.6793 6.48475 17.0977 6.90317C17.5162 7.3216 17.5162 7.99999 17.0977 8.4184L13.5161 12.0001L17.0977 15.5817C17.5162 16.0002 17.5162 16.6786 17.0977 17.097Z\" fill=\"currentColor\"></path>"
  },
  "dice-shield": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.2695 0.813887C8.11039 0.608694 10.0313 0.428711 11.9999 0.428711C13.9684 0.428711 15.8894 0.608694 17.7302 0.813887C20.5965 1.13337 22.8995 3.43437 23.2067 6.30576C23.4026 8.13713 23.5713 10.0452 23.5713 12.0001C23.5713 13.955 23.4026 15.8631 23.2067 17.6945C22.8995 20.5659 20.5965 22.867 17.7302 23.1864C15.8894 23.3916 13.9684 23.5716 11.9999 23.5716C10.0313 23.5716 8.11039 23.3916 6.2695 23.1864C3.4033 22.867 1.10031 20.5659 0.793102 17.6945C0.597166 15.8631 0.428467 13.955 0.428467 12.0001C0.428467 10.0452 0.597166 8.13713 0.793102 6.30576C1.10031 3.43437 3.4033 1.13337 6.2695 0.813887ZM17.4232 11.0044C17.4232 14.9554 12.8821 17.8753 11.9999 17.8753C11.1178 17.8753 6.57663 14.9554 6.57663 11.0044C6.57663 9.97764 6.67083 9.16188 6.77756 8.52652C6.86954 7.97901 7.47547 7.70003 8.02196 7.79771C9.09641 7.98976 10.2093 7.68028 11.3502 6.73188C11.7238 6.42129 12.276 6.42129 12.6497 6.73188C13.7906 7.68028 14.9035 7.98976 15.9779 7.79771C16.5244 7.70003 17.1304 7.97901 17.2223 8.52652C17.3291 9.16188 17.4232 9.97764 17.4232 11.0044Z\" fill=\"currentColor\"></path>"
  },
  "dollar": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.7136 1.71429C13.7136 0.767511 12.9461 0 11.9993 0C11.0526 0 10.2851 0.767513 10.2851 1.71429V2.17114C8.89983 2.36525 7.70187 2.81074 6.75543 3.5292C5.38603 4.56878 4.70594 6.06189 4.70594 7.68112C4.70594 9.19999 5.51052 10.5143 6.75917 11.4568C7.6811 12.1527 8.87072 12.675 10.2851 13.0132V18.372C9.44201 18.2196 8.76079 17.9604 8.26346 17.6546C7.47291 17.1686 7.2816 16.6754 7.2816 16.3228C7.2816 15.376 6.51408 14.6085 5.56731 14.6085C4.62053 14.6085 3.85303 15.376 3.85303 16.3228C3.85303 18.2035 4.98725 19.6649 6.46759 20.5752C7.53101 21.2292 8.83987 21.6544 10.2851 21.8397V22.2899C10.2851 23.2365 11.0526 24.0042 11.9993 24.0042C12.9461 24.0042 13.7136 23.2365 13.7136 22.2899V21.8246C15.2007 21.6077 16.5357 21.107 17.6087 20.3649C19.0814 19.3466 20.1462 17.7917 20.1462 15.9195C20.1462 13.8907 19.0516 12.439 17.5254 11.5095C16.4538 10.8568 15.1322 10.4291 13.7136 10.1413V5.6608C14.3771 5.8133 14.8453 6.04761 15.1586 6.28992C15.658 6.67608 15.8648 7.15116 15.8648 7.68112C15.8648 8.62788 16.6323 9.3954 17.579 9.3954C18.5258 9.3954 19.2933 8.62788 19.2933 7.68112C19.2933 6.09732 18.6009 4.61774 17.2559 3.57766C16.3124 2.84805 15.1123 2.38065 13.7136 2.17637V1.71429ZM10.2851 5.65036C9.60979 5.79686 9.13935 6.02407 8.8285 6.26006C8.35351 6.62064 8.13451 7.0822 8.13451 7.68112C8.13451 7.89082 8.229 8.27059 8.82476 8.72028C9.16238 8.97513 9.64107 9.23179 10.2851 9.45045V5.65036ZM13.7136 13.6562V18.3431C14.5157 18.1697 15.1714 17.8819 15.6587 17.5449C16.4569 16.993 16.7177 16.3915 16.7177 15.9195C16.7177 15.3435 16.4867 14.8912 15.7421 14.4378C15.2429 14.1338 14.566 13.8715 13.7136 13.6562Z\" fill=\"currentColor\"></path>"
  },
  "download-file": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.97741 0.240679C7.20909 0.0829277 9.33883 0 12 0C12.8821 0 13.7063 0.00910959 14.4956 0.0270699C15.3539 0.0466003 16.1938 0.329817 16.8862 0.857544C18.8933 2.38752 20.2056 3.69751 21.6659 5.58183C22.6104 6.80047 23.0969 8.29395 23.1237 9.80954C23.1364 10.5344 23.1429 11.2647 23.1429 12C23.1429 14.7021 23.0556 17.3376 22.8897 19.878C22.7537 21.9602 21.0996 23.6126 19.0226 23.7593C16.791 23.917 14.6612 24 12 24C9.33883 24 7.20909 23.917 4.97741 23.7593C2.90043 23.6126 1.2463 21.9602 1.11033 19.878C0.944455 17.3376 0.857178 14.7021 0.857178 12C0.857178 9.29793 0.944455 6.66233 1.11033 4.12203C1.2463 2.03983 2.90043 0.387494 4.97741 0.240679ZM12 5.78571C12.5917 5.78571 13.0714 6.26541 13.0714 6.85714V15.1183C13.8574 14.4279 14.5476 13.5763 14.966 12.7395C15.2306 12.2103 15.8742 11.9957 16.4035 12.2604C16.9327 12.525 17.1472 13.1686 16.8826 13.6978C15.9961 15.4709 14.2641 17.2049 12.4913 18.0951C12.3778 18.1539 12.2524 18.1929 12.1197 18.2076C12.051 18.2153 11.9818 18.2163 11.913 18.2107C11.7644 18.1989 11.6243 18.1565 11.499 18.0902C9.72962 17.1984 8.00247 15.4675 7.11765 13.6978C6.85301 13.1686 7.06754 12.525 7.59679 12.2604C8.12606 11.9957 8.76964 12.2103 9.03427 12.7395C9.45262 13.5762 10.1427 14.4277 10.9286 15.118V6.85714C10.9286 6.26541 11.4083 5.78571 12 5.78571Z\" fill=\"currentColor\"></path>"
  },
  "download-tray": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.4073 2.143C10.4073 1.19622 11.1748 0.428711 12.1216 0.428711C13.0684 0.428711 13.8359 1.19622 13.8359 2.143V8.93841C14.8817 8.88602 15.9315 8.78572 16.9929 8.63753C17.4657 8.57152 17.9363 8.773 18.2149 9.16078C18.4934 9.54857 18.5342 10.0588 18.3206 10.4859C17.1866 12.754 14.9656 14.975 12.6976 16.109C12.3357 16.29 11.9096 16.29 11.5477 16.109C9.27951 14.975 7.0585 12.754 5.92447 10.4859C5.71094 10.0588 5.75165 9.54857 6.03024 9.16078C6.30881 8.773 6.77933 8.57152 7.25223 8.63753C8.31295 8.78563 9.36216 8.88588 10.4073 8.9383V2.143ZM3.82668 17.05C3.64834 16.1202 2.75 15.5109 1.82017 15.6893C0.89035 15.8676 0.281139 16.7659 0.459466 17.6957C0.716367 19.0352 1.37097 20.2709 2.34293 21.24C3.43801 22.332 4.87126 23.0213 6.40843 23.1979L6.41396 23.1985C8.18659 23.3962 10.0638 23.5716 12.0002 23.5716C13.9366 23.5716 15.8154 23.3962 17.5866 23.1985L17.5921 23.1979C19.1291 23.0213 20.5624 22.332 21.6575 21.24C22.6295 20.2709 23.284 19.0352 23.541 17.6957C23.7193 16.7659 23.11 15.8676 22.1802 15.6893C21.2504 15.5109 20.3521 16.1202 20.1738 17.05C20.0464 17.7142 19.7214 18.3288 19.2366 18.8122C18.6908 19.3565 17.9744 19.7023 17.2033 19.7914C15.4656 19.9853 13.7402 20.143 12.0002 20.143C10.2603 20.143 8.53664 19.9853 6.79711 19.7914C6.02612 19.7023 5.30967 19.3565 4.76379 18.8122C4.27898 18.3288 3.95405 17.7142 3.82668 17.05Z\" fill=\"currentColor\"></path>"
  },
  "earth-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.447 0.00511982C12.2991 0.00170664 12.1501 0 12 0C8.27652 0 5.2465 1.04988 3.1482 3.1482C1.04988 5.2465 0 8.27652 0 12C0 12.8656 0.0567444 13.6938 0.170215 14.4815L1.88263 15.2767L1.89717 15.2835C3.41289 16.0151 5.08865 15.6539 6.12278 14.6198C6.47955 14.263 6.68001 13.7792 6.68001 13.2746V10.7255C6.68001 9.65265 7.10619 8.6237 7.86485 7.86506C8.62349 7.1064 9.65244 6.68019 10.7253 6.68019C11.2299 6.68019 11.7138 6.47976 12.0706 6.12298C12.5374 5.65617 12.7895 4.96279 12.8593 4.04292C12.929 3.12399 12.8071 2.10473 12.6431 1.1193L12.447 0.00511982ZM0.828321 17.1497C1.35273 18.5865 2.12607 19.8297 3.1482 20.8519C5.2465 22.9502 8.27652 24 12 24C14.1567 24 16.0808 23.6477 17.7259 22.9437V19.2225C17.7259 18.9432 17.615 18.6754 17.4175 18.4779C17.2202 18.2805 16.9523 18.1695 16.6731 18.1695C15.6002 18.1695 14.5713 17.7434 13.8126 16.9847C13.054 16.2261 12.6278 15.1972 12.6278 14.1243C12.6278 13.0514 13.054 12.0224 13.8126 11.2638C14.4272 10.6493 15.2543 10.2936 16.0792 10.0907C16.9154 9.88503 17.8359 9.81485 18.732 9.83489C20.4802 9.87398 22.3318 10.2631 23.5065 10.8623L23.9775 11.0704C23.815 7.77074 22.7727 5.06907 20.8519 3.1482C19.2777 1.57397 17.1789 0.58985 14.6565 0.196459L14.7544 0.752649L14.7561 0.762465C14.9262 1.78354 15.0862 3.01545 14.996 4.20501C14.9057 5.39518 14.5551 6.66886 13.5858 7.63821C12.8271 8.39686 11.7982 8.82305 10.7253 8.82305C10.2208 8.82305 9.73685 9.0235 9.38007 9.38028C9.0233 9.73706 8.82286 10.221 8.82286 10.7255V13.2746C8.82286 14.3475 8.39666 15.3764 7.638 16.1351C5.97201 17.801 3.32143 18.3466 0.973203 17.2171L0.828321 17.1497ZM20.8519 20.8519C20.544 21.1596 20.2161 21.445 19.8687 21.7077V19.2225C19.8687 18.3749 19.5321 17.562 18.9327 16.9627C18.3334 16.3634 17.5207 16.0267 16.6731 16.0267C16.1685 16.0267 15.6847 15.8263 15.3279 15.4695C14.9711 15.1127 14.7706 14.6288 14.7706 14.1243C14.7706 13.6197 14.9711 13.1358 15.3279 12.779C15.5631 12.5437 15.9746 12.3232 16.591 12.1715C17.1962 12.0227 17.9196 11.9601 18.6842 11.9772C20.2414 12.012 21.7598 12.3701 22.5514 12.7807C22.5711 12.7909 22.5912 12.8006 22.6116 12.8095L23.9481 13.4002C23.7129 16.4866 22.6805 19.0231 20.8519 20.8519Z\" fill=\"currentColor\"></path>"
  },
  "face-scan-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.7595 0.435736C7.46549 0.359637 8.0995 0.870264 8.1756 1.57626C8.2517 2.28225 7.74106 2.91626 7.03509 2.99236C6.45183 3.05522 5.87294 3.12238 5.29341 3.18962L5.20354 3.20004C4.15051 3.32218 3.30871 4.1664 3.19112 5.21443C3.12317 5.82012 3.05542 6.42581 2.99247 7.03588C2.9196 7.7422 2.28792 8.25571 1.58159 8.18284C0.875255 8.10995 0.361744 7.47828 0.434626 6.77194C0.498911 6.14892 0.567891 5.53241 0.635727 4.92775C0.887368 2.68471 2.67065 0.905177 4.90726 0.645744L5.00004 0.63498C5.57712 0.568027 6.16553 0.499761 6.7595 0.435736ZM15.8239 1.57626C15.9 0.870264 16.534 0.359637 17.2399 0.435736C17.8339 0.499757 18.4222 0.568022 18.9994 0.634972L19.0922 0.645744C21.3288 0.905177 23.1122 2.68471 23.3637 4.92775C23.4315 5.53241 23.5006 6.14892 23.5649 6.77194C23.6378 7.47828 23.1242 8.10995 22.4179 8.18284C21.7116 8.25571 21.0799 7.7422 21.007 7.03588C20.9441 6.42581 20.8762 5.82012 20.8083 5.21443C20.6907 4.1664 19.849 3.32218 18.7959 3.20004L18.7061 3.18962C18.1265 3.12238 17.5476 3.05522 16.9644 2.99236C16.2584 2.91626 15.7478 2.28225 15.8239 1.57626ZM15.8239 22.424C15.9 23.1299 16.534 23.6406 17.2399 23.5645C17.8339 23.5004 18.4222 23.4321 18.9994 23.3651L19.0922 23.3545C21.3288 23.0949 23.1122 21.3155 23.3637 19.0724C23.4315 18.4677 23.5006 17.8513 23.5649 17.2281C23.6378 16.5219 23.1242 15.8902 22.4179 15.8173C21.7116 15.7444 21.0799 16.2579 21.007 16.9643C20.9441 17.5744 20.8762 18.1801 20.8083 18.7857C20.6907 19.8337 19.849 20.678 18.7959 20.8002L18.7061 20.8105C18.1265 20.8778 17.5476 20.9449 16.9644 21.0078C16.2584 21.0839 15.7478 21.7178 15.8239 22.424ZM8.1756 22.424C8.0995 23.1299 7.46549 23.6406 6.7595 23.5645C6.16558 23.5004 5.57721 23.4321 5.00014 23.3651L4.90726 23.3545C2.67065 23.0949 0.887368 21.3155 0.635727 19.0724C0.567891 18.4677 0.498911 17.8513 0.434626 17.2281C0.361744 16.5219 0.875255 15.8902 1.58159 15.8173C2.28792 15.7444 2.9196 16.2579 2.99247 16.9643C3.05542 17.5744 3.12317 18.1801 3.19112 18.7857C3.30871 19.8337 4.15051 20.678 5.20354 20.8002L5.29341 20.8105C5.87294 20.8778 6.45183 20.9449 7.03509 21.0078C7.74106 21.0839 8.2517 21.7178 8.1756 22.424ZM12.0002 4.28181C9.64685 4.28181 7.68729 4.94633 6.31689 6.31675C4.94647 7.68715 4.28194 9.64672 4.28194 12C4.28194 14.3534 4.94647 16.3129 6.31689 17.6833C7.68729 19.0537 9.64685 19.7183 12.0002 19.7183C14.3535 19.7183 16.3131 19.0537 17.6835 17.6833C19.0539 16.3129 19.7184 14.3534 19.7184 12C19.7184 9.64672 19.0539 7.68715 17.6835 6.31675C16.3131 4.94633 14.3535 4.28181 12.0002 4.28181ZM8.90331 8.76988C9.49505 8.76988 9.97474 9.24959 9.97474 9.8413V10.6039C9.97474 11.1957 9.49505 11.6754 8.90331 11.6754C8.31159 11.6754 7.83189 11.1957 7.83189 10.6039V9.8413C7.83189 9.24959 8.31159 8.76988 8.90331 8.76988ZM8.86112 13.2003C9.38863 12.9322 10.0336 13.1425 10.3017 13.6701C10.507 14.0739 11.1217 14.438 12.0002 14.438C12.8788 14.438 13.4935 14.0739 13.6988 13.6701C13.9669 13.1425 14.6119 12.9322 15.1394 13.2003C15.6669 13.4684 15.8772 14.1134 15.6091 14.6409C14.8969 16.0423 13.3166 16.5808 12.0002 16.5808C10.6839 16.5808 9.10356 16.0423 8.39138 14.6409C8.1233 14.1134 8.3336 13.4684 8.86112 13.2003ZM16.1673 9.8413C16.1673 9.24959 15.6876 8.76988 15.0958 8.76988C14.5041 8.76988 14.0244 9.24959 14.0244 9.8413V10.6039C14.0244 11.1957 14.5041 11.6754 15.0958 11.6754C15.6876 11.6754 16.1673 11.1957 16.1673 10.6039V9.8413Z\" fill=\"currentColor\"></path>"
  },
  "file-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.97741 0.240679C7.20909 0.0829277 9.33883 0 12 0C12.8821 0 13.7063 0.00910959 14.4956 0.0270699C15.3539 0.0466003 16.1938 0.329817 16.8862 0.857544C18.8933 2.38752 20.2056 3.69751 21.6659 5.58183C22.6104 6.80047 23.0969 8.29395 23.1237 9.80954C23.1364 10.5344 23.1429 11.2647 23.1429 12C23.1429 14.7021 23.0556 17.3376 22.8897 19.878C22.7537 21.9602 21.0996 23.6126 19.0226 23.7593C16.791 23.917 14.6612 24 12 24C9.33883 24 7.20909 23.917 4.97741 23.7593C2.90043 23.6126 1.2463 21.9602 1.11033 19.878C0.944455 17.3376 0.857178 14.7021 0.857178 12C0.857178 9.29793 0.944455 6.66233 1.11033 4.12203C1.2463 2.03983 2.90043 0.387494 4.97741 0.240679ZM16.2757 7.79799C16.6733 8.23627 16.6403 8.91386 16.202 9.31143C15.1192 10.2938 14.3819 11.1076 13.7724 12.0589C13.1587 13.0169 12.6451 14.16 12.0622 15.8344C11.94 16.1855 11.6446 16.4481 11.2816 16.5283C10.9186 16.6085 10.54 16.4949 10.2812 16.228L7.74871 13.6164C7.33678 13.1916 7.34722 12.5133 7.77202 12.1014C8.19682 11.6894 8.87513 11.6999 9.28708 12.1247L10.6415 13.5214C11.0491 12.5233 11.4721 11.6772 11.9681 10.9029C12.7147 9.73766 13.5975 8.78091 14.7623 7.7243C15.2006 7.32672 15.8782 7.35972 16.2757 7.79799Z\" fill=\"currentColor\"></path>"
  },
  "file-delete": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.97741 0.240679C7.20909 0.0829277 9.33883 0 12 0C12.8821 0 13.7063 0.00910959 14.4956 0.0270699C15.3539 0.0466003 16.1938 0.329817 16.8862 0.857544C18.8933 2.38752 20.2056 3.69751 21.6659 5.58183C22.6104 6.80047 23.0969 8.29395 23.1237 9.80954C23.1364 10.5344 23.1429 11.2647 23.1429 12C23.1429 14.7021 23.0556 17.3376 22.8897 19.878C22.7537 21.9602 21.0996 23.6126 19.0226 23.7593C16.791 23.917 14.6612 24 12 24C9.33883 24 7.20909 23.917 4.97741 23.7593C2.90043 23.6126 1.2463 21.9602 1.11033 19.878C0.944455 17.3376 0.857178 14.7021 0.857178 12C0.857178 9.29793 0.944455 6.66233 1.11033 4.12203C1.2463 2.03983 2.90043 0.387494 4.97741 0.240679ZM14.83 7.78653C15.2121 7.4045 15.8315 7.4045 16.2135 7.78653C16.5955 8.16855 16.5955 8.78796 16.2135 9.16999L13.3835 12L16.2135 14.83C16.5955 15.212 16.5955 15.8314 16.2135 16.2135C15.8314 16.5955 15.2121 16.5955 14.83 16.2135L12 13.3835L9.17028 16.2132C8.78824 16.5953 8.16885 16.5953 7.7868 16.2132C7.40477 15.8312 7.40477 15.2118 7.7868 14.8298L10.6166 12L7.78678 9.17025C7.40474 8.7882 7.40474 8.16881 7.78678 7.78677C8.16881 7.40474 8.78822 7.40474 9.17025 7.78677L12 10.6165L14.83 7.78653Z\" fill=\"currentColor\"></path>"
  },
  "file-document-info-quick-reference": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.38688 0.651808C7.48334 0.505521 9.49649 0.428711 11.9999 0.428711C12.8281 0.428711 13.603 0.437116 14.3456 0.453693C15.2063 0.472909 16.0491 0.757727 16.7423 1.28925C18.6253 2.73307 19.8709 3.97816 21.2442 5.74787C22.1881 6.96422 22.6715 8.45611 22.6971 9.96772C22.7084 10.6404 22.7142 11.3181 22.7142 12.0001C22.7142 14.5597 22.6331 17.0573 22.4787 19.4664C22.3453 21.5492 20.691 23.2035 18.613 23.3485C16.5165 23.4948 14.5034 23.5716 11.9999 23.5716C9.49649 23.5716 7.48334 23.4948 5.3869 23.3485C3.30881 23.2035 1.65463 21.5492 1.52117 19.4664C1.3668 17.0573 1.28564 14.5597 1.28564 12.0001C1.28564 9.44054 1.3668 6.94296 1.52117 4.53384C1.65463 2.45107 3.30881 0.796814 5.38688 0.651808ZM11.6668 6.44546C12.2586 6.44546 12.7383 6.92515 12.7383 7.51689V8.03039C12.7383 8.62212 12.2586 9.10181 11.6668 9.10181C11.0751 9.10181 10.5954 8.62212 10.5954 8.03039V7.51689C10.5954 6.92515 11.0751 6.44546 11.6668 6.44546ZM9.71945 9.8238C9.12771 9.8238 8.64802 10.3035 8.64802 10.8952C8.64802 11.487 9.12771 11.9667 9.71945 11.9667C10.3941 11.9667 10.6777 12.0301 10.7921 12.0818C10.793 12.0822 10.7939 12.0816 10.7949 12.081C10.8004 12.0776 10.81 12.0715 10.8399 12.1785C10.9006 12.3966 10.9283 12.7703 10.9222 13.4759C10.9201 13.7097 10.9142 13.9881 10.9077 14.3C10.9022 14.5605 10.8962 14.8446 10.8915 15.1456C10.4082 15.2079 9.92059 15.3108 9.42278 15.4543C8.85418 15.6181 8.52607 16.2118 8.6899 16.7805C8.85375 17.3491 9.44751 17.6772 10.0161 17.5133C11.3889 17.1178 12.6112 17.1178 13.9839 17.5133C14.5525 17.6772 15.1463 17.3491 15.3101 16.7805C15.474 16.2118 15.1459 15.6181 14.5773 15.4543C14.054 15.3035 13.542 15.1975 13.0345 15.1364C13.0387 14.8784 13.0439 14.6379 13.0489 14.4082C13.0559 14.0884 13.0624 13.7897 13.0649 13.4946C13.0708 12.8159 13.0571 12.1525 12.904 11.6032C12.7258 10.9636 12.3463 10.4323 11.6737 10.1287C11.1104 9.87441 10.4246 9.8238 9.71945 9.8238Z\" fill=\"currentColor\"></path>"
  },
  "file-edit": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M18.3917 12.971C19.5509 11.6562 21.552 11.733 22.8365 12.8689C24.1497 14.0307 24.4527 16.0709 23.2149 17.3739L18.1406 22.7126C18.0406 22.8178 17.9141 22.8967 17.7756 22.9402L14.6267 23.9314C14.037 24.1167 13.4693 23.9105 13.1049 23.5798C12.7409 23.249 12.4827 22.7047 12.6111 22.0999L13.284 18.9341L13.3142 18.8287C13.3505 18.7255 13.4056 18.6285 13.4782 18.5458L18.3917 12.971ZM10.7143 0C11.5427 0 12.3191 0.00854002 13.0614 0.0251115C13.9209 0.0446001 14.764 0.329328 15.457 0.860491C17.3393 2.30386 18.5842 3.54984 19.957 5.31864C20.9006 6.53462 21.3862 8.02733 21.4118 9.53906C21.414 9.66943 21.4118 9.80006 21.4135 9.93081C19.7942 9.67003 18.0521 10.115 16.7846 11.553L11.8711 17.1278C11.5301 17.5147 11.2953 17.9844 11.1881 18.4889L10.5151 21.6545C10.4032 22.1811 10.4138 22.6814 10.5084 23.1411C8.09974 23.137 6.13857 23.0625 4.09989 22.9202C2.02226 22.7746 0.36966 21.1198 0.236049 19.038C0.1203 17.2315 0.0453098 15.3748 0.015067 13.4799L0 11.5714C0 9.01176 0.0816953 6.51382 0.236049 4.10491C0.369658 2.02308 2.02226 0.368285 4.09989 0.222657C6.19635 0.0763675 8.21087 1.02857e-09 10.7143 0Z\" fill=\"currentColor\"></path>"
  },
  "file-report": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.97741 0.240679C7.20909 0.0829277 9.33883 0 12 0C12.8821 0 13.7063 0.00910959 14.4956 0.0270699C15.3539 0.0466003 16.1938 0.329817 16.8862 0.857544C18.8933 2.38752 20.2056 3.69751 21.6659 5.58183C22.6104 6.80047 23.0969 8.29395 23.1237 9.80954C23.1364 10.5344 23.1429 11.2647 23.1429 12C23.1429 14.7021 23.0556 17.3376 22.8897 19.878C22.7537 21.9602 21.0996 23.6126 19.0226 23.7593C16.791 23.917 14.6612 24 12 24C9.33883 24 7.20909 23.917 4.97741 23.7593C2.90043 23.6126 1.2463 21.9602 1.11033 19.878C0.944455 17.3376 0.857178 14.7021 0.857178 12C0.857178 9.29793 0.944455 6.66233 1.11033 4.12203C1.2463 2.03983 2.90043 0.387494 4.97741 0.240679ZM16.9605 6.18658C17.0127 5.59716 16.5771 5.07705 15.9877 5.02488C15.3983 4.97271 14.8781 5.40826 14.826 5.99769C14.8269 5.98737 14.8253 5.99517 14.8204 6.01978C14.808 6.08229 14.774 6.25306 14.7041 6.51038C14.6141 6.84171 14.4812 7.25366 14.3039 7.6519C14.1228 8.05882 13.9184 8.3989 13.7064 8.62747C13.4984 8.85166 13.3535 8.89709 13.2661 8.90229C13.2549 8.89248 13.236 8.87414 13.2104 8.84225C13.0801 8.68003 12.9606 8.42487 12.7686 7.98951L12.7478 7.94234C12.5903 7.58427 12.3621 7.06555 12.0253 6.66264C11.6144 6.17109 10.9833 5.78112 10.1242 5.88571C9.4439 5.96853 8.90803 6.32295 8.51716 6.69782C8.1263 7.07266 7.82163 7.5229 7.59228 7.92624C7.35965 8.33535 7.18224 8.73617 7.05898 9.03852C6.99694 9.19073 6.94738 9.32115 6.91207 9.41455L6.88214 9.4932C6.87437 9.51348 6.87132 9.52145 6.87158 9.52157L6.87448 9.51591C6.62781 10.0398 6.84267 10.6678 7.36315 10.9293C7.89192 11.1949 8.53589 10.9815 8.8015 10.4527C8.84131 10.3735 8.88718 10.2507 8.90906 10.1921L8.91645 10.1724C8.9502 10.0831 8.99194 9.97342 9.04332 9.84739C9.14691 9.59325 9.28483 9.28479 9.45504 8.98546C9.62854 8.68034 9.81425 8.42289 10.0004 8.24438C10.1696 8.08212 10.2905 8.03049 10.3629 8.01612C10.3682 8.02183 10.3743 8.0287 10.3811 8.0369C10.5001 8.17922 10.616 8.41891 10.8079 8.85403L10.8333 8.91183C10.9903 9.26902 11.2147 9.77952 11.5396 10.1841C11.9299 10.6699 12.5361 11.0924 13.3935 11.0414C14.2125 10.9926 14.8384 10.5581 15.2774 10.0848C15.7125 9.61579 16.0313 9.04071 16.2617 8.52322C16.4959 7.99706 16.6625 7.47533 16.772 7.07206C16.8741 6.69626 16.9459 6.35119 16.9605 6.18658ZM7.7411 12.9719C7.14938 12.9719 6.66967 13.4516 6.66967 14.0433C6.66967 14.635 7.14938 15.1147 7.7411 15.1147H16.259C16.8507 15.1147 17.3304 14.635 17.3304 14.0433C17.3304 13.4516 16.8507 12.9719 16.259 12.9719H7.7411ZM6.66967 18.0075C6.66967 17.4159 7.14938 16.9362 7.7411 16.9362H16.259C16.8507 16.9362 17.3304 17.4159 17.3304 18.0075C17.3304 18.5993 16.8507 19.079 16.259 19.079H7.7411C7.14938 19.079 6.66967 18.5993 6.66967 18.0075Z\" fill=\"currentColor\"></path>"
  },
  "files-and-folders": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M19.2457 11.1247C19.7632 11.1365 20.2724 11.3075 20.6937 11.6286C21.7293 12.418 22.4145 13.1016 23.1697 14.0761C23.7033 14.765 23.9752 15.6047 23.99 16.45C23.9965 16.8156 24.0001 17.1841 24.0001 17.5549C24.0001 18.9189 23.955 20.2511 23.8712 21.5342C23.7887 22.7925 22.7891 23.7894 21.5358 23.878C20.4069 23.9579 19.3292 24.0002 17.985 24.0002C16.6405 24.0002 15.5616 23.9579 14.4326 23.878C13.1795 23.7892 12.1795 22.7923 12.0972 21.5342C12.0134 20.2511 11.9699 18.9189 11.9699 17.5549C11.97 16.1912 12.0134 14.8602 12.0972 13.5772C12.1795 12.3192 13.1795 11.3224 14.4326 11.2335C15.5616 11.1537 16.6405 11.1113 17.985 11.1113C18.43 11.1113 18.8464 11.1156 19.2457 11.1247ZM2.91804 0.134163C4.93701 -0.0150535 6.46514 -0.0454007 8.96827 0.0738951H8.96994C10.0122 0.124332 10.9096 0.805772 11.2534 1.77982L11.6251 2.8345C11.7435 3.16885 12.057 3.3956 12.4102 3.40369C15.2454 3.46661 16.8894 3.47763 19.2472 3.68327C21.2941 3.8618 22.8882 5.52073 23.0073 7.56385C23.0745 8.71979 23.114 9.81779 23.1313 10.8719C22.9043 10.6651 22.6679 10.4575 22.4113 10.2508L22.3845 10.2307L22.0112 9.93941L21.9928 9.92434L21.7266 9.73685C21.0956 9.3231 20.3822 9.07662 19.654 9.00358L19.5686 8.99689L19.3746 8.98517L19.2942 8.98182L17.985 8.96843C17.463 8.96843 16.9775 8.97486 16.5118 8.98685L15.1591 9.04042L15.139 9.04208L14.2969 9.09565H14.2802C12.1096 9.24995 10.3462 10.88 10.0079 13.008L9.9945 13.1001L9.9677 13.3328L9.95934 13.4383C9.87247 14.7688 9.8271 16.1462 9.82708 17.5549C9.82708 18.964 9.87246 20.3425 9.95934 21.6733L9.9677 21.7787L9.9945 22.0113L10.0079 22.1035L10.0882 22.4968C10.1422 22.714 10.2128 22.9243 10.2958 23.128C8.34645 23.0889 6.39463 22.9607 4.43143 22.7363C2.36299 22.4997 0.629256 20.8857 0.376747 18.6698C-0.238292 13.2628 -0.0415375 7.86298 0.544158 2.51139C0.679466 1.27865 1.63263 0.229362 2.91804 0.134163ZM16.3461 18.7821C15.8727 18.7821 15.4889 19.1658 15.4889 19.6393C15.4892 20.1122 15.8729 20.4964 16.3461 20.4964H19.6122C20.0855 20.4964 20.469 20.1122 20.4693 19.6393C20.4693 19.1658 20.0857 18.7821 19.6122 18.7821H16.3461ZM16.3461 15.3401C15.8727 15.3401 15.4889 15.7238 15.4889 16.1972C15.4892 16.6704 15.8728 17.0544 16.3461 17.0544H18.4252C18.8985 17.0544 19.2822 16.6704 19.2824 16.1972C19.2824 15.7238 18.8987 15.3401 18.4252 15.3401H16.3461Z\" fill=\"currentColor\"></path>"
  },
  "fire-alarm-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.9999 15.8573C13.937 15.8573 16.7142 13.0801 16.7142 8.143C16.7142 3.20585 13.937 0.428711 8.9999 0.428711C4.06275 0.428711 1.28561 3.20585 1.28561 8.143C1.28561 13.0801 4.06275 15.8573 8.9999 15.8573ZM8.9999 10.7144C10.6456 10.7144 11.5713 9.78871 11.5713 8.143C11.5713 6.49728 10.6456 5.57157 8.9999 5.57157C7.35418 5.57157 6.42847 6.49728 6.42847 8.143C6.42847 9.78871 7.35418 10.7144 8.9999 10.7144ZM20.277 4.71443C19.5669 4.71443 18.9913 5.29007 18.9913 6.00014C18.9913 6.71021 19.5669 7.28585 20.277 7.28585H20.876C20.9577 7.84495 21.0002 8.41737 21.0002 9.00033C21.0002 10.9282 20.3944 13.1851 19.4054 15.0263C18.6908 16.3569 17.8701 17.3043 17.0782 17.8285C16.7745 17.3088 16.2192 16.9592 15.6011 16.9317C15.2524 16.9162 14.9012 16.9 14.5474 16.8836C12.7557 16.8005 10.9003 16.7144 8.9999 16.7144C7.09945 16.7144 5.24414 16.8005 3.45247 16.8836C3.09871 16.9 2.74738 16.9162 2.39873 16.9317C1.62218 16.9663 0.944863 17.509 0.740803 18.2592C0.574296 18.8712 0.428467 19.5007 0.428467 20.143C0.428467 20.7853 0.574296 21.4148 0.740803 22.0268C0.944863 22.777 1.62218 23.3197 2.39873 23.3542C2.74738 23.3698 3.09864 23.3861 3.4524 23.4024C5.24405 23.4855 7.09945 23.5716 8.9999 23.5716C10.9003 23.5716 12.7557 23.4855 14.5473 23.4024C14.9011 23.3861 15.2524 23.3698 15.6011 23.3542C16.3776 23.3197 17.0549 22.777 17.259 22.0268C17.396 21.5237 17.5189 21.0085 17.5581 20.4843C19.3103 19.7371 20.7073 18.037 21.6707 16.2431C22.838 14.0701 23.5717 11.3984 23.5717 9.00033C23.5717 7.86767 23.4397 6.76415 23.1899 5.70496C23.0529 5.12452 22.5349 4.71443 21.9385 4.71443H20.277Z\" fill=\"currentColor\"></path>"
  },
  "folder-add": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.34675 0.563529C5.3658 0.414302 6.89285 0.382132 9.39651 0.50147C10.4398 0.5512 11.3378 1.2333 11.6817 2.2081L12.0534 3.26188C12.1716 3.59697 12.485 3.82382 12.8388 3.83167C13.1973 3.83963 13.5368 3.84677 13.861 3.8536C16.1019 3.90074 17.6162 3.93259 19.6766 4.1123C21.7235 4.29084 23.3174 5.94946 23.4361 7.99324C23.6831 12.2457 23.585 15.7116 23.2 19.0975C22.9605 21.2023 21.3426 22.9135 19.2662 23.1507C14.4434 23.702 9.68624 23.7163 4.85969 23.1646C2.79094 22.9282 1.05702 21.3139 0.804897 19.0975C0.189845 13.6902 0.387442 8.29226 0.973121 2.94082C1.10805 1.70792 2.0605 0.658595 3.34675 0.563529ZM11.9999 8.35728C11.4081 8.35728 10.9285 8.83697 10.9285 9.42871V12.4287H7.92847C7.33673 12.4287 6.85704 12.9084 6.85704 13.5001C6.85704 14.0919 7.33673 14.5716 7.92847 14.5716H10.9285V17.5716C10.9285 18.1633 11.4081 18.643 11.9999 18.643C12.5916 18.643 13.0713 18.1633 13.0713 17.5716V14.5716H16.0713C16.6631 14.5716 17.1428 14.0919 17.1428 13.5001C17.1428 12.9084 16.6631 12.4287 16.0713 12.4287H13.0713V9.42871C13.0713 8.83697 12.5916 8.35728 11.9999 8.35728Z\" fill=\"currentColor\"></path>"
  },
  "folder-block": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96805 0.0727595C6.46438 -0.046579 4.93733 -0.0144094 2.91828 0.134818C1.63204 0.229884 0.679587 1.27921 0.544654 2.51211C-0.041024 7.86355 -0.238622 13.2615 0.37643 18.6687C0.628551 20.8851 2.36247 22.4995 4.43122 22.7359C6.99209 23.0287 9.53342 23.1621 12.0754 23.1405C11.1025 21.7538 10.7151 20.0897 10.7151 18.4289C10.7151 16.3938 11.2969 14.3534 12.8252 12.8252C14.3534 11.2969 16.3938 10.7151 18.4289 10.7151C20.0907 10.7151 21.7558 11.103 23.143 12.0772C23.1447 10.6595 23.1007 9.16795 23.0076 7.56453C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42489C13.1084 3.41806 12.7688 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83317L11.2532 1.77939C10.9094 0.804588 10.0114 0.12249 8.96805 0.0727595ZM14.3404 14.3404C15.3576 13.3231 16.7865 12.858 18.4289 12.858C20.0715 12.858 21.5004 13.3231 22.5177 14.3404C23.5349 15.3576 24 16.7865 24 18.4289C24 20.0715 23.5349 21.5004 22.5177 22.5177C21.5004 23.5349 20.0715 24 18.4289 24C16.7865 24 15.3576 23.5349 14.3404 22.5177C13.3231 21.5004 12.858 20.0715 12.858 18.4289C12.858 16.7865 13.3231 15.3576 14.3404 14.3404ZM14.9213 18.4289C14.9213 17.7201 15.0323 17.1441 15.2227 16.6821L20.1759 21.6353C19.7139 21.8258 19.1379 21.9367 18.4289 21.9367C17.1663 21.9367 16.3255 21.5847 15.7994 21.0586C15.2733 20.5325 14.9213 19.6917 14.9213 18.4289ZM21.9367 18.4289C21.9367 19.1383 21.8256 19.7145 21.635 20.1765L16.6816 15.2229C17.1435 15.0323 17.7197 14.9213 18.4289 14.9213C19.6917 14.9213 20.5325 15.2733 21.0586 15.7994C21.5847 16.3255 21.9367 17.1663 21.9367 18.4289Z\" fill=\"currentColor\"></path>"
  },
  "folder-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.34675 0.563529C5.3658 0.414302 6.89285 0.382132 9.39651 0.50147C10.4398 0.5512 11.3378 1.2333 11.6817 2.2081L12.0534 3.26188C12.1716 3.59697 12.485 3.82382 12.8388 3.83167C13.1973 3.83963 13.5368 3.84677 13.861 3.8536C16.1019 3.90074 17.6162 3.93259 19.6766 4.1123C21.7235 4.29084 23.3174 5.94946 23.4361 7.99324C23.6831 12.2457 23.585 15.7116 23.2 19.0975C22.9605 21.2023 21.3426 22.9135 19.2662 23.1507C14.4434 23.702 9.68624 23.7163 4.85969 23.1646C2.79094 22.9282 1.05702 21.3139 0.804897 19.0975C0.189845 13.6902 0.387442 8.29226 0.973121 2.94082C1.10805 1.70792 2.0605 0.658595 3.34675 0.563529ZM16.2019 10.8116C16.6402 10.414 16.6732 9.73639 16.2756 9.29813C15.878 8.85986 15.2005 8.82686 14.7622 9.22444C13.5974 10.2811 12.7145 11.2378 11.968 12.403C11.4719 13.1773 11.049 14.0235 10.6413 15.0215L9.28694 13.6248C8.87499 13.2 8.19668 13.1896 7.77188 13.6015C7.34708 14.0134 7.33664 14.6917 7.74857 15.1165L10.281 17.7281C10.5398 17.995 10.9185 18.1087 11.2814 18.0284C11.6444 17.9482 11.9399 17.6856 12.0621 17.3345C12.645 15.6601 13.1585 14.517 13.7723 13.559C14.3818 12.6077 15.119 11.7939 16.2019 10.8116Z\" fill=\"currentColor\"></path>"
  },
  "folder-delete": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.34675 0.563529C5.3658 0.414302 6.89285 0.382132 9.39651 0.50147C10.4398 0.5512 11.3378 1.2333 11.6817 2.2081L12.0534 3.26188C12.1716 3.59697 12.485 3.82382 12.8388 3.83167C13.1973 3.83963 13.5368 3.84677 13.861 3.8536C16.1019 3.90074 17.6162 3.93259 19.6766 4.1123C21.7235 4.29084 23.3174 5.94946 23.4361 7.99324C23.6831 12.2457 23.585 15.7116 23.2 19.0975C22.9605 21.2023 21.3426 22.9135 19.2662 23.1507C14.4434 23.702 9.68624 23.7163 4.85969 23.1646C2.79094 22.9282 1.05702 21.3139 0.804897 19.0975C0.189845 13.6902 0.387442 8.29226 0.973121 2.94082C1.10805 1.70792 2.0605 0.658595 3.34675 0.563529ZM17.1428 13.5001C17.1428 12.9084 16.6631 12.4287 16.0713 12.4287H7.92847C7.33673 12.4287 6.85704 12.9084 6.85704 13.5001C6.85704 14.0919 7.33673 14.5716 7.92847 14.5716H16.0713C16.6631 14.5716 17.1428 14.0919 17.1428 13.5001Z\" fill=\"currentColor\"></path>"
  },
  "folder-document-copy-duplicate": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.44283 0.109647C9.08499 -0.0117251 10.3285 -0.0378523 12.3629 0.0591202C13.2752 0.102603 14.0595 0.698921 14.3598 1.54999L14.6609 2.40357C14.7341 2.61123 14.9283 2.75162 15.1471 2.75647C15.4372 2.7629 15.712 2.76869 15.9746 2.77421C17.7895 2.81237 19.0217 2.83829 20.6962 2.98435C22.4355 3.13606 23.7891 4.54526 23.8899 6.28073C24.0905 9.73349 24.011 12.5503 23.6979 15.303C23.496 17.0783 22.1302 18.5283 20.3683 18.7296C16.4497 19.1775 12.584 19.1892 8.66182 18.7409C6.91339 18.541 5.44718 17.1763 5.23411 15.303C4.73412 10.9073 4.89507 6.52217 5.37029 2.17997C5.48719 1.11191 6.31426 0.193058 7.44283 0.109647ZM3.10497 15.5438C3.43478 18.4431 5.71423 20.5593 8.41848 20.8683C11.1034 21.1754 15.0178 21.2753 18.5433 21.1757C18.0492 22.499 16.8763 23.4927 15.4401 23.6568C11.5215 24.1047 7.65583 24.1164 3.73368 23.6679C1.98523 23.4682 0.519032 22.1035 0.305954 20.2301C-0.194038 15.8345 -0.033085 11.4493 0.44214 7.10709C0.55903 6.03903 1.38611 5.12018 2.51467 5.03676C2.66643 5.02555 2.81479 5.01514 2.96069 5.00558C2.71152 8.46939 2.70096 11.9918 3.10497 15.5438Z\" fill=\"currentColor\"></path>"
  },
  "folder-document-settings-gear": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96804 0.0727596C6.46438 -0.0465791 4.93733 -0.0144094 2.91828 0.134818C1.63204 0.229882 0.679587 1.27921 0.544653 2.51211C-0.0410241 7.86355 -0.238621 13.2615 0.376429 18.6687C0.628552 20.8851 2.36247 22.4995 4.43122 22.7359C7.02576 23.0325 9.60022 23.1655 12.1756 23.1394C11.9456 22.9082 11.7452 22.6469 11.5804 22.3611L11.5793 22.3591L11.2614 21.809C10.8802 21.1493 10.7069 20.3902 10.764 19.6306C10.8066 19.0644 10.9757 18.5177 11.256 18.0295C10.974 17.5401 10.8038 16.9914 10.7611 16.4233C10.704 15.6636 10.8773 14.9044 11.2585 14.2448L11.5786 13.6909C11.9587 13.0325 12.5283 12.5038 13.2131 12.1736C13.7262 11.9262 14.2861 11.7988 14.8509 11.7978C15.1328 11.3115 15.5208 10.8918 15.9888 10.5717C16.617 10.1421 17.3601 9.91169 18.1212 9.91071H18.7668H18.7706C19.5317 9.91169 20.2749 10.1421 20.903 10.5717C21.371 10.8918 21.7591 11.3115 22.0409 11.7978C22.4145 11.7983 22.7859 11.8541 23.143 11.9634C23.1423 10.5797 23.0983 9.12509 23.0076 7.56452C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42488C13.1084 3.41806 12.7689 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83316L11.2532 1.77939C10.9094 0.804588 10.0114 0.122489 8.96804 0.0727596ZM18.125 12.0536C17.7946 12.054 17.471 12.154 17.1984 12.3404C16.9262 12.5266 16.7163 12.7905 16.5961 13.0976L16.36 13.6977L15.7395 14.0559L15.1037 13.9592C14.7767 13.9099 14.4415 13.9602 14.1436 14.1038C13.846 14.2473 13.5985 14.4772 13.4335 14.7634L13.1136 15.317C12.9482 15.6033 12.873 15.9328 12.8978 16.2626C12.9226 16.5923 13.0462 16.9069 13.2526 17.1651L13.7054 17.7326C13.7146 17.809 13.7207 17.9127 13.7207 18.0269C13.7207 18.1414 13.7146 18.2455 13.7053 18.3221L13.2539 18.8907C13.0481 19.1487 12.9254 19.4621 12.9007 19.7913C12.8759 20.1209 12.9511 20.4506 13.1166 20.7369L13.4361 21.2897C13.6011 21.576 13.8489 21.8066 14.1465 21.9501C14.4444 22.0937 14.7786 22.1441 15.1056 22.0947L15.8642 21.9794C15.926 22.0018 16.0106 22.0407 16.1013 22.0923C16.1922 22.1441 16.2677 22.1966 16.3173 22.2375L16.5985 22.955C16.7187 23.2622 16.929 23.5272 17.2013 23.7134C17.4739 23.8999 17.7965 23.9998 18.1267 24.0002H18.7661C19.0965 23.9998 19.4189 23.8999 19.6917 23.7134C19.9639 23.5272 20.1742 23.2622 20.2944 22.955L20.5755 22.2375C20.6253 22.1966 20.7007 22.1441 20.7915 22.0923C20.8824 22.0407 20.9669 22.0018 21.0286 21.9794L21.7874 22.0947C22.1143 22.1441 22.4486 22.0937 22.7463 21.9501C23.0439 21.8066 23.2918 21.576 23.4569 21.2897L23.7763 20.7369C23.9417 20.4506 24.017 20.1209 23.9923 19.7913C23.9674 19.4621 23.8449 19.1487 23.639 18.8907L23.1876 18.3221C23.1783 18.2455 23.1722 18.1414 23.1722 18.0269C23.1722 17.9127 23.1783 17.809 23.1874 17.7326L23.6402 17.1651C23.8466 16.9069 23.9703 16.5923 23.9952 16.2626C24.0199 15.9328 23.9446 15.6033 23.7792 15.317L23.4593 14.7634C23.2944 14.4772 23.0469 14.2473 22.7493 14.1038C22.4515 13.9602 22.1162 13.9099 21.7893 13.9592L21.1534 14.0559L20.5329 13.6977L20.2968 13.0976C20.1766 12.7905 19.9668 12.5266 19.6946 12.3404C19.4218 12.154 19.0983 12.054 18.768 12.0536H18.125ZM18.4467 16.3259C17.9189 16.3259 17.4895 16.4747 17.1921 16.7721C16.8946 17.0695 16.7458 17.4991 16.7458 18.0267C16.7458 18.5546 16.8946 18.984 17.1921 19.2814C17.4895 19.5789 17.9189 19.7277 18.4467 19.7277C18.9746 19.7277 19.404 19.5789 19.7014 19.2814C19.9989 18.984 20.1477 18.5546 20.1477 18.0267C20.1477 17.4991 19.9989 17.0695 19.7014 16.7721C19.404 16.4747 18.9746 16.3259 18.4467 16.3259Z\" fill=\"currentColor\"></path>"
  },
  "folder-lock": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96804 0.0727596C6.46438 -0.0465791 4.93733 -0.0144094 2.91828 0.134818C1.63204 0.229882 0.679587 1.27921 0.544653 2.51211C-0.0410241 7.86355 -0.238621 13.2615 0.376429 18.6687C0.628552 20.8851 2.36247 22.4995 4.43122 22.7359C6.7236 22.998 9.00032 23.1322 11.2759 23.142C11.2321 22.9923 11.1971 22.8387 11.1713 22.6821L11.1403 22.4937C11.0351 21.8573 10.8852 20.9501 10.8852 19.9865C10.8852 19.0231 11.0351 18.1159 11.1403 17.4794L11.1711 17.2925C11.3331 16.3066 11.8628 15.443 12.6173 14.853C12.6829 14.3239 12.8196 13.805 13.0245 13.3104C13.3231 12.5894 13.7608 11.9343 14.3126 11.3825C14.8644 10.8307 15.5195 10.393 16.2405 10.0944C16.9615 9.79572 17.7343 9.64202 18.5146 9.64202C19.295 9.64202 20.0673 9.79656 20.7881 10.0952C21.5091 10.3938 22.1642 10.8316 22.716 11.3834C22.867 11.5343 23.0095 11.6931 23.1429 11.8588C23.1401 10.5064 23.0959 9.08582 23.0076 7.56452C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42488C13.1084 3.41806 12.7689 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83316L11.2532 1.77939C10.9094 0.804588 10.0114 0.122489 8.96804 0.0727596ZM18.5146 11.7857C19.0135 11.7857 19.5077 11.884 19.9687 12.0749C20.4297 12.2659 20.8485 12.5458 21.2013 12.8986C21.5541 13.2514 21.834 13.6703 22.025 14.1313C22.2159 14.5923 22.3142 15.0863 22.3142 15.5853V16.1104C22.3142 16.1398 22.313 16.169 22.3106 16.1978C23.0443 16.3217 23.6215 16.9034 23.7423 17.6403L23.7657 17.7809C23.8743 18.4402 24 19.2014 24 19.9875C24 20.7739 23.8743 21.535 23.7657 22.1943L23.7423 22.3349C23.6129 23.1243 22.9596 23.7357 22.1515 23.7969C21.9663 23.8107 21.7779 23.8257 21.5865 23.8409C20.6187 23.9175 19.5773 23.9998 18.5139 23.9998C17.4507 23.9998 16.4093 23.9175 15.4415 23.8409C15.2502 23.8257 15.0617 23.8107 14.8765 23.7969C14.0684 23.7357 13.4151 23.1243 13.2856 22.3349L13.2624 22.1943C13.1536 21.535 13.028 20.7739 13.028 19.9875C13.028 19.2014 13.1536 18.4402 13.2624 17.7809L13.2856 17.6403C13.4065 16.9031 13.9843 16.3211 14.7185 16.1976C14.7162 16.1688 14.715 16.1397 14.715 16.1104V15.5853C14.715 15.0863 14.8133 14.5923 15.0042 14.1313C15.1952 13.6703 15.475 13.2514 15.8279 12.8986C16.1807 12.5458 16.5995 12.2659 17.0605 12.0749C17.5215 11.884 18.0156 11.7857 18.5146 11.7857ZM18.5139 15.9754C17.9534 15.9754 17.3988 15.9983 16.8578 16.0312V15.5853C16.8578 15.3677 16.9007 15.1523 16.984 14.9513C17.0672 14.7503 17.1893 14.5677 17.3431 14.4138C17.4969 14.26 17.6796 14.1379 17.8805 14.0547C18.0816 13.9714 18.2971 13.9286 18.5146 13.9286C18.7322 13.9286 18.9477 13.9714 19.1486 14.0547C19.3497 14.1379 19.5322 14.26 19.686 14.4138C19.8399 14.5677 19.962 14.7503 20.0451 14.9513C20.1285 15.1523 20.1713 15.3677 20.1713 15.5853V16.0312C19.6301 15.9983 19.075 15.9754 18.5139 15.9754Z\" fill=\"currentColor\"></path>"
  },
  "folder-remove": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.34675 0.563529C5.3658 0.414302 6.89285 0.382132 9.39651 0.50147C10.4398 0.5512 11.3378 1.2333 11.6817 2.2081L12.0534 3.26188C12.1716 3.59697 12.485 3.82382 12.8388 3.83167C13.1973 3.83963 13.5368 3.84677 13.861 3.8536C16.1019 3.90074 17.6162 3.93259 19.6766 4.1123C21.7235 4.29084 23.3174 5.94946 23.4361 7.99324C23.6831 12.2457 23.585 15.7116 23.2 19.0975C22.9605 21.2023 21.3426 22.9135 19.2662 23.1507C14.4434 23.702 9.68624 23.7163 4.85969 23.1646C2.79094 22.9282 1.05702 21.3139 0.804897 19.0975C0.189845 13.6902 0.387442 8.29226 0.973121 2.94082C1.10805 1.70792 2.0605 0.658595 3.34675 0.563529ZM14.8299 9.28666C15.2119 8.90464 15.8313 8.90464 16.2134 9.28666C16.5954 9.66869 16.5954 10.2881 16.2134 10.6701L13.3834 13.5002L16.2134 16.3302C16.5954 16.7122 16.5954 17.3316 16.2134 17.7137C15.8313 18.0956 15.2119 18.0956 14.8299 17.7137L11.9999 14.8836L9.17014 17.7133C8.7881 18.0955 8.16871 18.0955 7.78666 17.7133C7.40463 17.3314 7.40463 16.7119 7.78666 16.3299L10.6164 13.5002L7.78664 10.6704C7.40462 10.2883 7.40462 9.66895 7.78664 9.28691C8.16867 8.90488 8.78808 8.90488 9.17011 9.28691L11.9999 12.1167L14.8299 9.28666Z\" fill=\"currentColor\"></path>"
  },
  "folder-search": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96804 0.0727596C6.46438 -0.0465791 4.93733 -0.0144094 2.91828 0.134818C1.63204 0.229882 0.679587 1.27921 0.544653 2.51211C-0.0410241 7.86355 -0.238621 13.2615 0.376429 18.6687C0.628552 20.8851 2.36247 22.4995 4.43122 22.7359C7.33493 23.0678 10.2135 23.1948 13.0964 23.1233C11.9906 21.7863 11.576 20.1262 11.576 18.5199C11.576 16.7367 12.087 14.8871 13.4874 13.4868C14.8878 12.0865 16.7374 11.5756 18.5206 11.5756C20.1305 11.5756 21.7947 11.992 23.1334 13.1035C23.1634 11.3817 23.1235 9.55968 23.0076 7.56452C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42488C13.1084 3.41806 12.7689 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83316L11.2532 1.77939C10.9094 0.804588 10.0114 0.122489 8.96804 0.0727596ZM16.5178 16.5173C16.1387 16.8964 15.8618 17.5236 15.8618 18.5199C15.8618 19.5163 16.1387 20.1434 16.5178 20.5226C16.8969 20.9016 17.5241 21.1786 18.5206 21.1786C19.5171 21.1786 20.1444 20.9016 20.5234 20.5226C20.9026 20.1434 21.1795 19.5163 21.1795 18.5199C21.1795 17.5236 20.9026 16.8964 20.5234 16.5173C20.1444 16.1383 19.5171 15.8613 18.5206 15.8613C17.5241 15.8613 16.8969 16.1383 16.5178 16.5173ZM15.0026 15.0021C15.8918 14.1129 17.1297 13.7185 18.5206 13.7185C19.9114 13.7185 21.1495 14.1129 22.0387 15.0021C22.9279 15.8912 23.3223 17.1291 23.3223 18.5199C23.3223 19.5057 23.1242 20.4147 22.6922 21.1771L23.6861 22.171C24.1046 22.5895 24.1046 23.2678 23.6861 23.6863C23.2678 24.1047 22.5893 24.1047 22.1709 23.6863L21.1766 22.692C20.4144 23.1235 19.5058 23.3215 18.5206 23.3215C17.1297 23.3215 15.8918 22.9269 15.0026 22.0378C14.1134 21.1486 13.7189 19.9107 13.7189 18.5199C13.7189 17.1291 14.1134 15.8912 15.0026 15.0021Z\" fill=\"currentColor\"></path>"
  },
  "folder-star-favorite": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M16.3394 13.08C16.9974 11.8373 18.7124 11.8371 19.3694 13.08C19.7318 13.766 20.0056 14.5044 20.2065 15.3166C21.0061 15.2882 21.7679 15.3309 22.5117 15.4556C23.9224 15.6926 24.4981 17.3407 23.4962 18.3618C22.9672 18.9009 22.3614 19.372 21.6613 19.7949C21.9237 20.511 22.1065 21.2183 22.2155 21.9326C22.4356 23.3814 21.0057 24.4648 19.6993 23.801C19.0547 23.4733 18.446 23.0637 17.8528 22.5621C17.26 23.0634 16.6512 23.4717 16.0079 23.7993C14.7017 24.4641 13.2715 23.3814 13.4917 21.9326C13.6007 21.2183 13.7835 20.511 14.0458 19.7949C13.3458 19.372 12.74 18.9007 12.211 18.3618C11.2091 17.3406 11.7845 15.6924 13.1954 15.4556C13.9393 15.3309 14.7012 15.2882 15.5006 15.3166C15.7016 14.5041 15.9761 13.7662 16.3394 13.08ZM2.91804 0.134163C4.93701 -0.0150535 6.46514 -0.0454007 8.96827 0.0738951H8.96994C10.0122 0.124332 10.9096 0.805772 11.2534 1.77982L11.6251 2.8345C11.7435 3.16885 12.057 3.3956 12.4102 3.40369C15.2454 3.46661 16.8894 3.47763 19.2472 3.68327C21.2941 3.8618 22.8882 5.52073 23.0073 7.56385C23.1296 9.66985 23.1661 11.5833 23.1261 13.3897C23.0404 13.3696 22.9535 13.351 22.865 13.3362C22.5052 13.2759 22.1444 13.2315 21.782 13.2022C21.6304 12.8171 21.4586 12.4413 21.2646 12.0739C19.803 9.30731 15.907 9.30819 14.4443 12.0706C14.2492 12.439 14.0759 12.8158 13.9236 13.2022C13.561 13.2315 13.2003 13.2758 12.8405 13.3362C9.81595 13.8433 8.39771 17.5302 10.6809 19.8568C10.9576 20.1388 11.2494 20.4026 11.5548 20.6521C11.482 20.9671 11.4209 21.2841 11.3723 21.603C11.2906 22.1385 11.3193 22.6573 11.4359 23.1414C9.10711 23.1373 6.77743 23.0044 4.43143 22.7363C2.36299 22.4997 0.629256 20.8857 0.376747 18.6698C-0.238292 13.2628 -0.0415375 7.86298 0.544158 2.51139C0.679466 1.27865 1.63263 0.229362 2.91804 0.134163Z\" fill=\"currentColor\"></path>"
  },
  "gift": {
    "viewBox": "0 0 24 24",
    "body": "<g clip-path=\"url(#clip0_10917_4227)\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.8649 3.83494C18.2656 2.77186 16.5743 2.70538 15.8879 3.74925L14.1766 6.35151C15.0329 6.36057 15.9822 6.37435 16.9389 6.39309C16.9636 6.3798 16.9889 6.36722 17.0148 6.35541L18.122 5.8492C18.9985 5.44851 19.256 4.52883 18.8649 3.83494ZM9.8232 6.35151L8.11193 3.74925C7.42546 2.70538 5.73411 2.77186 5.1349 3.83494C4.74379 4.52883 5.00139 5.44851 5.87779 5.8492L6.98501 6.35541C7.01088 6.36722 7.03616 6.3798 7.06085 6.39309C8.01758 6.37435 8.96686 6.36057 9.8232 6.35151ZM11.9999 4.98153L13.7394 2.33638C15.4723 -0.298842 19.5503 -0.185914 21.105 2.5723C21.8433 3.88233 21.7509 5.36438 21.053 6.53165C22.3492 6.72569 23.3934 7.71058 23.513 9.04106C23.5506 9.45893 23.5713 9.88281 23.5713 10.3134C23.5713 10.744 23.5506 11.1679 23.513 11.5858C23.3831 13.0315 22.1613 14.0691 20.711 14.1276C18.4017 14.2206 15.2071 14.2712 13.0713 14.2848V8.97765C13.0713 8.38593 12.5916 7.90622 11.9999 7.90622C11.4082 7.90622 10.9285 8.38593 10.9285 8.97765V14.2848C8.79271 14.2712 5.59812 14.2206 3.2887 14.1276C1.83838 14.0691 0.616764 13.0315 0.486722 11.5858C0.449129 11.1679 0.428467 10.744 0.428467 10.3134C0.428467 9.88281 0.449127 9.45893 0.486717 9.04106C0.606398 7.71058 1.65065 6.72569 2.94682 6.53163C2.24892 5.36438 2.15642 3.88233 2.89481 2.5723C4.44951 -0.185914 8.52747 -0.298842 10.2604 2.33638L11.9999 4.98153ZM3.4265 16.3447C5.75222 16.4333 8.84271 16.4815 10.9285 16.4947V23.5703C9.20928 23.5535 7.6664 23.4949 6.2597 23.3898C4.06001 23.2256 2.32352 21.4994 2.12875 19.3022C2.03611 18.2572 1.97986 17.1935 1.97143 16.108C2.43977 16.2449 2.92918 16.3257 3.4265 16.3447ZM17.7354 23.3898C16.3299 23.4949 14.7886 23.5533 13.0713 23.5703V16.4946C15.157 16.4815 18.2456 16.4333 20.57 16.3447C21.0668 16.3257 21.5557 16.2451 22.0237 16.1084C22.0151 17.1937 21.9589 18.2572 21.8663 19.3022C21.6716 21.4994 19.935 23.2256 17.7354 23.3898Z\" fill=\"currentColor\"></path> </g> <defs> <clipPath id=\"clip0_10917_4227\"> <rect width=\"24\" height=\"24\" fill=\"currentColor\"></rect> </clipPath> </defs>"
  },
  "globe-browser-vpn-lock": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.5133 0C18.0144 0 17.5203 0.098279 17.0593 0.289227C16.5983 0.480175 16.1794 0.760051 15.8266 1.11288C15.4738 1.4657 15.1939 1.88457 15.0029 2.34555C14.812 2.80654 14.7137 3.30063 14.7137 3.79959V4.32465C14.7137 4.35408 14.7149 4.38326 14.7172 4.41209C13.9836 4.53595 13.4063 5.11773 13.2855 5.85458L13.2623 5.99523C13.1535 6.65453 13.0279 7.41564 13.0279 8.2019C13.0279 8.98817 13.1535 9.74928 13.2623 10.4086L13.2855 10.5492C13.415 11.3386 14.0682 11.95 14.8764 12.0111C15.0616 12.0251 15.25 12.04 15.4414 12.0552C16.4091 12.1317 17.4506 12.2141 18.5139 12.2141C19.5773 12.2141 20.6187 12.1317 21.5865 12.0552C21.7778 12.04 21.9662 12.0251 22.1515 12.0111C22.9596 11.95 23.6129 11.3386 23.7423 10.5492L23.7655 10.4086C23.8743 9.74926 23.9998 8.98817 23.9998 8.2019C23.9998 7.41564 23.8743 6.65453 23.7655 5.99523L23.7423 5.85458C23.6213 5.11735 23.0436 4.53535 22.3094 4.4119C22.3118 4.38312 22.313 4.35401 22.313 4.32465V3.79959C22.313 3.30062 22.2146 2.80654 22.0238 2.34555C21.8328 1.88457 21.5529 1.4657 21.2001 1.11288C20.8473 0.760051 20.4283 0.480175 19.9673 0.289227C19.5063 0.098279 19.0123 0 18.5133 0ZM18.5139 4.18966C19.0745 4.18966 19.6291 4.21257 20.1701 4.24546V3.79959C20.1701 3.58203 20.1273 3.3666 20.0439 3.16558C19.9606 2.96458 19.8386 2.78194 19.6848 2.6281C19.531 2.47426 19.3483 2.35222 19.1474 2.26898C18.9463 2.18571 18.731 2.14286 18.5133 2.14286C18.2957 2.14286 18.0804 2.18571 17.8793 2.26898C17.6782 2.35222 17.4957 2.47426 17.3419 2.6281C17.1879 2.78194 17.066 2.96458 16.9827 3.16558C16.8994 3.3666 16.8566 3.58203 16.8566 3.79959V4.24553C17.3978 4.2126 17.9529 4.18966 18.5139 4.18966ZM10.885 8.2019C10.885 7.34745 11.0029 6.53727 11.1029 5.92097C10.7796 5.35221 10.4187 4.83406 10.0226 4.37407C9.9546 4.37319 9.8863 4.37277 9.81771 4.37277C9.74907 4.37277 9.68071 4.37319 9.61263 4.37407C7.92423 6.33511 6.87341 9.35277 6.65966 12.8457C8.46871 12.8153 10.2769 12.8111 12.0858 12.8329C11.6163 12.297 11.2917 11.6312 11.1711 10.8975L11.1401 10.709C11.0349 10.0726 10.885 9.16541 10.885 8.2019ZM6.7591 4.70395C5.07717 5.09877 3.65693 5.84671 2.55098 6.94839C1.04166 8.45187 0.19374 10.5383 0.00559303 13.0748C1.50882 12.9966 3.0103 12.9364 4.51085 12.8941C4.67427 9.86282 5.41817 6.98981 6.7591 4.70395ZM0 15.2209C0.176373 17.7927 1.02614 19.9068 2.55098 21.4257C3.6575 22.5279 5.07857 23.2761 6.76162 23.6707C5.35464 21.2745 4.60425 18.2321 4.49131 15.0383C2.99546 15.0812 1.49863 15.142 0 15.2209ZM10.0194 24C9.95244 24.0009 9.88521 24.0014 9.81771 24.0014C9.75015 24.0014 9.68287 24.0009 9.61586 24C7.83986 21.9398 6.76848 18.7109 6.63362 14.9893C8.75667 14.953 10.8786 14.953 13.0016 14.9893C12.8668 18.7109 11.7954 21.9398 10.0194 24ZM12.8736 23.6709C14.5567 23.2762 15.9779 22.5279 17.0845 21.4257C18.6093 19.9068 19.459 17.7927 19.6354 15.2209C18.1368 15.142 16.6399 15.0812 15.1439 15.0383C15.031 18.2321 14.2806 21.2745 12.8736 23.6709Z\" fill=\"currentColor\"></path>"
  },
  "graph-arrow-increase": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.801468 22.0236C1.60278 22.5279 2.66115 22.2871 3.16541 21.4858C3.19879 21.4327 3.22191 21.3893 3.22961 21.3747C3.24029 21.3547 3.24857 21.338 3.25347 21.3283C3.26325 21.3084 3.27099 21.2918 3.27501 21.2832C3.28354 21.2647 3.29148 21.247 3.29685 21.2348L3.33739 21.1423L3.35763 21.0956C3.38595 21.0305 3.4212 20.9494 3.46411 20.8515C3.57118 20.6072 3.72387 20.263 3.91339 19.8518C4.29379 19.026 4.81719 17.9417 5.41097 16.8623C6.01185 15.77 6.65206 14.7431 7.25859 13.9994C7.56237 13.6269 7.81848 13.3744 8.01627 13.2239L8.02798 13.215L8.05347 13.2424C8.30424 13.5166 8.54808 13.9037 8.89682 14.4574L8.9513 14.5439L8.9737 14.5794C9.27621 15.0597 9.74417 15.8027 10.34 16.2942C10.6782 16.5732 11.1774 16.8766 11.8276 16.9381C12.5106 17.0026 13.1154 16.7782 13.5964 16.4396C13.9702 16.1766 14.3571 15.7422 14.6606 15.3835C15.0086 14.9721 15.4118 14.4573 15.8408 13.8886C16.7009 12.7484 17.711 11.3293 18.6713 9.95049C19.2298 9.14873 19.775 8.35565 20.2685 7.63214L22.3913 10.2038C22.608 10.4662 22.9593 10.5757 23.2867 10.4826C23.6139 10.3896 23.8553 10.1118 23.9014 9.77465C24.2307 7.37534 23.7173 4.39799 22.6042 2.26689C22.4775 2.02437 22.2427 1.8569 21.972 1.81617C19.6553 1.46731 16.7899 2.01153 14.7421 3.18564C14.4545 3.35057 14.2877 3.66664 14.314 3.99719C14.3403 4.32772 14.5549 4.61345 14.865 4.73087L17.4338 5.70338C16.9467 6.41762 16.4088 7.20017 15.858 7.99087C14.9063 9.35716 13.925 10.7351 13.1037 11.8239C12.7187 12.3342 12.379 12.7675 12.1003 13.101C12.0282 12.9925 11.9459 12.8651 11.8519 12.7159L11.7611 12.5711C11.463 12.0953 11.0551 11.4441 10.5833 10.9283C10.0617 10.3581 9.14594 9.60124 7.84406 9.70307C7.06341 9.76411 6.41458 10.1344 5.94014 10.4954C5.44923 10.8689 5.00045 11.3434 4.60154 11.8325C3.8027 12.8121 3.04637 14.0473 2.40691 15.2098C1.76037 16.3852 1.19963 17.5484 0.79944 18.4169C0.598651 18.8528 0.436945 19.2173 0.323904 19.4753C0.278678 19.5785 0.2409 19.6654 0.21253 19.7306L0.1935 19.7744L0.168015 19.8326C-0.203923 20.6074 0.0566353 21.5549 0.801468 22.0236ZM7.87779 13.0804C7.87783 13.0807 7.88146 13.0832 7.88854 13.0869C7.88131 13.0819 7.87776 13.0801 7.87779 13.0804Z\" fill=\"currentColor\"></path>"
  },
  "happy-face": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 3.1482C5.2465 1.04988 8.27652 0 12 0C15.7235 0 18.7534 1.04988 20.8519 3.1482C22.9502 5.2465 24 8.27652 24 12C24 15.7235 22.9502 18.7534 20.8519 20.8519C18.7534 22.9502 15.7235 24 12 24C8.27652 24 5.2465 22.9502 3.1482 20.8519C1.04988 18.7534 0 15.7235 0 12C0 8.27652 1.04988 5.2465 3.1482 3.1482ZM8.70326 8.74407C8.70326 8.15234 8.22357 7.67265 7.63183 7.67265C7.04011 7.67265 6.5604 8.15234 6.5604 8.74407V9.94407C6.5604 10.5358 7.04011 11.0155 7.63183 11.0155C8.22357 11.0155 8.70326 10.5358 8.70326 9.94407V8.74407ZM16.3682 7.67265C16.9599 7.67265 17.4396 8.15234 17.4396 8.74407V9.94407C17.4396 10.5358 16.9599 11.0155 16.3682 11.0155C15.7764 11.0155 15.2967 10.5358 15.2967 9.94407V8.74407C15.2967 8.15234 15.7764 7.67265 16.3682 7.67265ZM7.64088 14.0868C7.42651 13.5353 6.80563 13.2619 6.25407 13.4763C5.70254 13.6907 5.42921 14.3116 5.64358 14.8631C6.12453 16.1005 6.93857 17.0849 8.05464 17.7483C9.15891 18.4049 10.4999 18.7131 12.0001 18.7131C13.5002 18.7131 14.8412 18.4049 15.9454 17.7483C17.0615 17.0849 17.8755 16.1005 18.3566 14.8631C18.5709 14.3116 18.2976 13.6907 17.7459 13.4763C17.1945 13.2619 16.5736 13.5353 16.3592 14.0868C16.0431 14.9002 15.5354 15.4992 14.8504 15.9064C14.1537 16.3206 13.2143 16.5703 12.0001 16.5703C10.7858 16.5703 9.84643 16.3206 9.14966 15.9064C8.46468 15.4992 7.95701 14.9002 7.64088 14.0868Z\" fill=\"currentColor\"></path>"
  },
  "help-question-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 3.1482C5.2465 1.04988 8.27652 0 12 0C15.7235 0 18.7534 1.04988 20.8519 3.1482C22.9502 5.2465 24 8.27652 24 12C24 15.7235 22.9502 18.7534 20.8519 20.8519C18.7534 22.9502 15.7235 24 12 24C8.27652 24 5.2465 22.9502 3.1482 20.8519C1.04988 18.7534 0 15.7235 0 12C0 8.27652 1.04988 5.2465 3.1482 3.1482ZM12.2603 8.02743C11.4642 7.86909 10.6741 8.51748 10.6741 9.32914C10.6741 10.0392 10.0985 10.6149 9.38839 10.6149C8.67831 10.6149 8.10267 10.0392 8.10267 9.32914C8.10267 6.89587 10.3754 5.03071 12.7619 5.50541C14.2857 5.80851 15.522 7.04482 15.8251 8.5686C15.9775 9.33465 15.8893 10.0708 15.5526 10.7332C15.2273 11.3733 14.7163 11.8545 14.1673 12.2213C13.9377 12.3748 13.7555 12.4995 13.6054 12.6118C13.4545 12.7246 13.3629 12.8053 13.3067 12.8637C13.2982 12.8726 13.2909 12.8804 13.2849 12.8872C13.2466 13.5628 12.6866 14.0989 12.0013 14.0989C11.2912 14.0989 10.7156 13.5232 10.7156 12.8132C10.7156 12.0702 11.0446 11.5065 11.4527 11.0818C11.8131 10.7068 12.297 10.3784 12.7387 10.0833C13.0491 9.87583 13.1945 9.69754 13.2603 9.5681C13.3147 9.46113 13.3523 9.31795 13.3031 9.07025C13.2029 8.56656 12.764 8.12763 12.2603 8.02743ZM12.0002 15.5504C12.7103 15.5504 13.2859 16.126 13.2859 16.8361V17.2833C13.2859 17.9933 12.7103 18.569 12.0002 18.569C11.2901 18.569 10.7145 17.9933 10.7145 17.2833V16.8361C10.7145 16.126 11.2901 15.5504 12.0002 15.5504Z\" fill=\"currentColor\"></path>"
  },
  "help-question-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.2695 0.813887C8.11039 0.608694 10.0313 0.428711 11.9999 0.428711C13.9684 0.428711 15.8894 0.608694 17.7302 0.813887C20.5965 1.13337 22.8995 3.43437 23.2067 6.30576C23.4026 8.13713 23.5713 10.0452 23.5713 12.0001C23.5713 13.955 23.4026 15.8631 23.2067 17.6945C22.8995 20.5659 20.5965 22.867 17.7302 23.1864C15.8894 23.3916 13.9684 23.5716 11.9999 23.5716C10.0313 23.5716 8.11039 23.3916 6.2695 23.1864C3.4033 22.867 1.10031 20.5659 0.793102 17.6945C0.597166 15.8631 0.428467 13.955 0.428467 12.0001C0.428467 10.0452 0.597166 8.13713 0.793102 6.30576C1.10031 3.43437 3.4033 1.13337 6.2695 0.813887ZM12.2602 8.02757C11.4641 7.86923 10.674 8.51762 10.674 9.32928C10.674 10.0394 10.0984 10.615 9.38828 10.615C8.67821 10.615 8.10257 10.0394 8.10257 9.32928C8.10257 6.89601 10.3753 5.03085 12.7618 5.50555C14.2856 5.80865 15.5219 7.04496 15.825 8.56874C15.9774 9.33478 15.8892 10.0709 15.5525 10.7334C15.2272 11.3734 14.7162 11.8547 14.1672 12.2215C13.9376 12.3749 13.7554 12.4996 13.6053 12.6119C13.4544 12.7247 13.3628 12.8054 13.3066 12.8638C13.2981 12.8727 13.2908 12.8806 13.2848 12.8874C13.2465 13.563 12.6864 14.099 12.0012 14.099C11.2911 14.099 10.7155 13.5234 10.7155 12.8133C10.7155 12.0703 11.0445 11.5066 11.4526 11.082C11.813 10.707 12.2969 10.3785 12.7386 10.0834C13.049 9.87597 13.1944 9.69768 13.2602 9.56824C13.3146 9.46126 13.3522 9.31809 13.303 9.07039C13.2028 8.5667 12.7639 8.12777 12.2602 8.02757ZM12.0001 15.5505C12.7102 15.5505 13.2858 16.1262 13.2858 16.8362V17.2834C13.2858 17.9935 12.7102 18.5691 12.0001 18.5691C11.29 18.5691 10.7144 17.9935 10.7144 17.2834V16.8362C10.7144 16.1262 11.29 15.5505 12.0001 15.5505Z\" fill=\"currentColor\"></path>"
  },
  "history-backup-folder": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96804 0.0727596C6.46438 -0.0465791 4.93733 -0.0144094 2.91828 0.134818C1.63204 0.229882 0.679587 1.27921 0.544653 2.51211C-0.0410241 7.86355 -0.238621 13.2615 0.376429 18.6687C0.628552 20.8851 2.36247 22.4995 4.43122 22.7359C6.98888 23.0282 9.52704 23.1617 12.0658 23.1405C11.1037 21.7635 10.7143 20.1043 10.7143 18.4286C10.7143 16.3692 11.3024 14.335 12.8187 12.8187C14.335 11.3024 16.3692 10.7143 18.4286 10.7143C20.1053 10.7143 21.7654 11.1042 23.143 12.0676C23.1446 10.6528 23.1005 9.16433 23.0076 7.56452C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42488C13.1084 3.41806 12.7689 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83316L11.2532 1.77939C10.9094 0.804588 10.0114 0.122489 8.96804 0.0727596ZM18.4286 12.8571C16.7622 12.8571 15.3394 13.3285 14.3339 14.3339C13.3284 15.3394 12.8571 16.7622 12.8571 18.4286C12.8571 20.0949 13.3284 21.5177 14.3339 22.5233C15.3394 23.5287 16.7622 24 18.4286 24C20.0949 24 21.5177 23.5287 22.5233 22.5233C23.5287 21.5177 24 20.0949 24 18.4286C24 16.7622 23.5287 15.3394 22.5233 14.3339C21.5177 13.3285 20.0949 12.8571 18.4286 12.8571ZM20.5363 16.3183C20.9547 16.7367 20.9547 17.4151 20.5363 17.8335L19.3771 18.9927C18.9586 19.4112 18.2803 19.4112 17.8618 18.9927C17.4434 18.5745 17.4434 17.8959 17.8618 17.4777L19.021 16.3183C19.4395 15.8999 20.1178 15.8999 20.5363 16.3183Z\" fill=\"currentColor\"></path>"
  },
  "home-2": {
    "viewBox": "0 0 24 24",
    "body": "<g clip-path=\"url(#clip0_10917_4232)\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.4374 2.21451C11.3643 1.54763 12.6361 1.54763 13.5629 2.21453L14.7219 3.04846C18.1247 5.49684 21.0424 8.5016 23.3365 11.9233L23.7083 12.4779C24.5089 13.6721 23.546 15.0898 22.2551 15.0898H21.0217C21.0898 16.6138 21.0008 18.1422 20.7551 19.6532C20.5035 21.2015 19.1164 22.2858 17.5547 22.2858H14.5715V16.7679C14.5715 15.3478 13.4202 14.1965 12.0001 14.1965C10.5799 14.1965 9.42862 15.3478 9.42862 16.7679V22.2858H6.44552C4.88383 22.2858 3.49688 21.2015 3.24518 19.6532C2.99954 18.1422 2.91065 16.6138 2.97869 15.0898H1.74492C0.454115 15.0898 -0.508896 13.6721 0.291834 12.4779L0.663714 11.9232C2.95784 8.50155 5.87544 5.49686 9.27823 3.04855L10.4374 2.21451Z\" fill=\"currentColor\"></path> </g> <defs> <clipPath id=\"clip0_10917_4232\"> <rect width=\"24\" height=\"24\" fill=\"currentColor\"></rect> </clipPath> </defs>"
  },
  "hourglass": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.00373 0C2.29364 0 1.71802 0.575633 1.71802 1.28571C1.71802 1.99579 2.29364 2.57143 3.00373 2.57143H4.98601C4.94377 2.70048 4.90211 2.82993 4.8615 2.95939C4.60918 3.76383 4.38329 4.6123 4.30117 5.46775C4.21835 6.33058 4.27947 7.22155 4.61763 8.10089C4.95714 8.9838 5.55533 9.80122 6.46594 10.5454C7.25679 11.1916 8.18831 11.6819 9.1945 12C8.18831 12.3181 7.25679 12.8084 6.46594 13.4546C5.55533 14.1988 4.95714 15.0162 4.61763 15.8991C4.27947 16.7785 4.21835 17.6695 4.30117 18.5323C4.38329 19.3877 4.60918 20.2361 4.8615 21.0406C4.90211 21.1701 4.94377 21.2995 4.98601 21.4286H3.00373C2.29364 21.4286 1.71802 22.0042 1.71802 22.7143C1.71802 23.4243 2.29364 24 3.00373 24H20.9965C21.7066 24 22.2822 23.4243 22.2822 22.7143C22.2822 22.0042 21.7066 21.4286 20.9965 21.4286H19.0146C19.0568 21.2995 19.0985 21.1701 19.1391 21.0406C19.3914 20.2361 19.6174 19.3877 19.6995 18.5323C19.7823 17.6695 19.7213 16.7785 19.383 15.8991C19.0434 15.0162 18.4453 14.1988 17.5347 13.4546C16.7439 12.8084 15.8124 12.3181 14.8062 12C15.8124 11.6819 16.7439 11.1916 17.5347 10.5454C18.4453 9.80122 19.0434 8.9838 19.383 8.10089C19.7213 7.22155 19.7823 6.33058 19.6995 5.46775C19.6174 4.6123 19.3914 3.76383 19.1391 2.95939C19.0985 2.82993 19.0568 2.70046 19.0146 2.57143H20.9965C21.7066 2.57143 22.2822 1.99579 22.2822 1.28571C22.2822 0.575633 21.7066 0 20.9965 0L3.00373 0Z\" fill=\"currentColor\"></path>"
  },
  "image-photo-add": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.85714 0C7.98235 0 6.15761 0.193601 4.43006 0.392275C2.30691 0.636442 0.608313 2.33242 0.372423 4.46038C0.18169 6.18098 0 7.99426 0 9.85714C0 11.72 0.18169 13.5333 0.372423 15.2539C0.608313 17.3818 2.30691 19.0778 4.43006 19.3221C6.15761 19.5207 7.98235 19.7143 9.85714 19.7143C10.4266 19.7143 10.9915 19.6965 11.5504 19.6659C11.4767 19.3863 11.4375 19.0929 11.4375 18.7903C11.4375 18.1625 11.6062 17.5743 11.9006 17.0683C11.2202 17.1147 10.5401 17.1429 9.85707 17.1429C8.14433 17.1429 6.44976 16.9659 4.72378 16.7674C3.78603 16.6596 3.03123 15.9007 2.92812 14.9706C2.74037 13.2768 2.57532 11.6061 2.57143 9.91803C3.52606 9.19461 4.61525 8.68135 5.79 8.68135C7.04995 8.68135 8.21148 9.27177 9.21415 10.0786C10.2229 10.8904 11.1462 11.9809 11.9491 13.1277C12.5201 13.9434 13.0422 14.8049 13.5008 15.6443C13.9191 15.4625 14.3808 15.3616 14.8661 15.3616H15.3617V14.8661C15.3617 12.9725 16.8967 11.4375 18.7903 11.4375C19.0937 11.4375 19.3881 11.4769 19.6682 11.551C19.6973 10.9918 19.7143 10.4268 19.7143 9.85714C19.7143 7.99426 19.5326 6.18098 19.3419 4.46038C19.1061 2.33242 17.4074 0.636442 15.2842 0.392275C13.5567 0.193601 11.7319 0 9.85714 0ZM13.6013 3.94449C12.8403 3.94449 12.1853 4.15983 11.7209 4.62422C11.2565 5.0886 11.0411 5.74365 11.0411 6.50463C11.0411 7.26562 11.2565 7.92065 11.7209 8.38503C12.1853 8.84942 12.8403 9.06477 13.6013 9.06477C14.3623 9.06477 15.0173 8.84942 15.4817 8.38503C15.9461 7.92065 16.1615 7.26562 16.1615 6.50463C16.1615 5.74365 15.9461 5.0886 15.4817 4.62422C15.0173 4.15983 14.3623 3.94449 13.6013 3.94449ZM18.7903 13.5804C19.5003 13.5804 20.076 14.156 20.076 14.8661V17.5046H22.7145C23.4245 17.5046 24.0002 18.0802 24.0002 18.7903C24.0002 19.5003 23.4245 20.076 22.7145 20.076H20.076V22.7145C20.076 23.4245 19.5003 24.0002 18.7903 24.0002C18.0802 24.0002 17.5046 23.4245 17.5046 22.7145V20.076H14.8661C14.156 20.076 13.5804 19.5003 13.5804 18.7903C13.5804 18.0802 14.156 17.5046 14.8661 17.5046H17.5046V14.8661C17.5046 14.156 18.0802 13.5804 18.7903 13.5804Z\" fill=\"currentColor\"></path>"
  },
  "image-photo-delete": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.85714 0C7.98235 0 6.15761 0.193601 4.43006 0.392275C2.30691 0.636442 0.608313 2.33242 0.372423 4.46038C0.18169 6.18098 0 7.99426 0 9.85714C0 11.72 0.18169 13.5333 0.372423 15.2539C0.608313 17.3818 2.30691 19.0778 4.43006 19.3221C6.15761 19.5207 7.98235 19.7143 9.85714 19.7143C11.4077 19.7143 12.9241 19.5818 14.3795 19.4237L14.4768 19.3263L13.5123 18.3619C13.1187 17.9683 12.8409 17.5029 12.6787 17.0078C11.7381 17.0892 10.8004 17.1429 9.85707 17.1429C8.14433 17.1429 6.44976 16.9659 4.72378 16.7674C3.78603 16.6596 3.03123 15.9007 2.92812 14.9706C2.74037 13.2768 2.57532 11.6061 2.57143 9.91803C3.52606 9.19461 4.61525 8.68135 5.79 8.68135C7.04995 8.68135 8.21148 9.27177 9.21415 10.0786C10.2229 10.8904 11.1462 11.9809 11.9491 13.1277C12.2583 13.5694 12.5531 14.0245 12.8313 14.4822C12.9956 14.1315 13.2226 13.8028 13.5123 13.5131C14.8512 12.1742 17.0221 12.1742 18.361 13.5131L19.3255 14.4776L19.4378 14.3653C19.5893 12.9131 19.7143 11.4022 19.7143 9.85714C19.7143 7.99426 19.5326 6.18098 19.3419 4.46038C19.1061 2.33242 17.4074 0.636442 15.2842 0.392275C13.5567 0.193601 11.7319 0 9.85714 0ZM13.6013 3.94449C12.8403 3.94449 12.1853 4.15983 11.7209 4.62422C11.2565 5.0886 11.0411 5.74365 11.0411 6.50463C11.0411 7.26562 11.2565 7.92065 11.7209 8.38503C12.1853 8.84942 12.8403 9.06477 13.6013 9.06477C14.3623 9.06477 15.0173 8.84942 15.4817 8.38503C15.9461 7.92065 16.1615 7.26562 16.1615 6.50463C16.1615 5.74365 15.9461 5.0886 15.4817 4.62422C15.0173 4.15983 14.3623 3.94449 13.6013 3.94449ZM15.0275 15.0284C15.5296 14.5263 16.3437 14.5263 16.8458 15.0284L19.3255 17.508L21.805 15.0286C22.3071 14.5265 23.1213 14.5265 23.6234 15.0286C24.1253 15.5307 24.1253 16.3448 23.6234 16.8469L21.1438 19.3263L23.6232 21.8059C24.1253 22.308 24.1253 23.1219 23.6232 23.6241C23.1211 24.1262 22.3071 24.1262 21.805 23.6241L19.3255 21.1447L16.8458 23.6244C16.3437 24.1265 15.5296 24.1265 15.0275 23.6244C14.5255 23.1223 14.5255 22.3082 15.0275 21.8061L17.5073 19.3263L15.0275 16.8466C14.5254 16.3445 14.5254 15.5305 15.0275 15.0284Z\" fill=\"currentColor\"></path>"
  },
  "information-circle": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.0009 0C14.9622 0 17.9911 0.859884 20.1499 2.66307C22.5821 4.69481 23.8109 7.96469 23.9811 11.2122C24.1515 14.4607 23.2736 17.8606 21.2731 20.2099C19.0819 22.7829 15.4874 24 12.0009 24C8.51443 24 4.91995 22.7829 2.7288 20.2099C0.728293 17.8606 -0.149638 14.4607 0.0207253 11.2122C0.191039 7.96469 1.4197 4.69481 3.85207 2.66307C6.01081 0.859884 9.0396 0 12.0009 0ZM12.4415 5.29834C13.0333 5.29834 13.513 5.77803 13.513 6.36977V6.92311C13.513 7.51485 13.0333 7.99454 12.4415 7.99454C11.8498 7.99454 11.3701 7.51485 11.3701 6.92311V6.36977C11.3701 5.77803 11.8498 5.29834 12.4415 5.29834ZM9.85128 9.21429C9.25956 9.21429 8.77985 9.69398 8.77985 10.2857C8.77985 10.8775 9.25956 11.3571 9.85128 11.3571H10.7024C11.0574 11.3571 11.3452 11.645 11.3452 12V15.3052C10.7677 15.369 10.1851 15.4837 9.58947 15.6493C9.01935 15.8078 8.68563 16.3984 8.8441 16.9685C9.00257 17.5387 9.59319 17.8723 10.1633 17.7139C11.7272 17.2791 13.1312 17.2791 14.6951 17.7139C15.2652 17.8723 15.8558 17.5387 16.0143 16.9685C16.1727 16.3984 15.839 15.8078 15.2689 15.6493C14.6646 15.4813 14.0738 15.3657 13.4881 15.3024V12C13.4881 10.4615 12.2409 9.21429 10.7024 9.21429H9.85128Z\" fill=\"currentColor\"></path>"
  },
  "information-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.26942 0.814633C8.11018 0.607999 10.0308 0.428711 11.9999 0.428711C13.9692 0.428711 15.8883 0.609777 17.7287 0.812733L17.733 0.813213C19.1312 0.974646 20.4333 1.60495 21.4271 2.60136C22.421 3.59777 23.0481 4.90152 23.2058 6.29999L23.2065 6.30482C23.4028 8.1372 23.5713 10.0455 23.5713 12.0001C23.5713 13.9548 23.4028 15.8631 23.2064 17.6938L23.2058 17.6986C23.0481 19.0971 22.421 20.4008 21.4271 21.3972C20.4333 22.3937 19.1312 23.0239 17.733 23.1853L17.7304 23.1857C15.8896 23.3923 13.969 23.5716 11.9999 23.5716C10.0307 23.5716 8.11184 23.3923 6.2695 23.1857L6.26672 23.1853C4.86866 23.0239 3.56652 22.3937 2.57263 21.3972C1.57874 20.4008 0.951746 19.0971 0.793877 17.6986L0.793341 17.6938C0.597007 15.8631 0.428467 13.9565 0.428467 12.0001C0.428467 10.0438 0.597015 8.13551 0.793363 6.30636L0.793863 6.3017C0.951732 4.90324 1.57874 3.59949 2.57263 2.60308C3.56652 1.60667 4.86866 0.97636 6.26672 0.81494L6.26942 0.814633ZM12.0025 5.02351C11.5114 5.02351 11.0672 5.16295 10.7462 5.48395C10.4252 5.80495 10.2857 6.24914 10.2857 6.74023C10.2857 7.23132 10.4252 7.67551 10.7462 7.99651C11.0672 8.31751 11.5114 8.45695 12.0025 8.45695C12.4936 8.45695 12.9377 8.31751 13.2587 7.99651C13.5797 7.67551 13.7192 7.23132 13.7192 6.74023C13.7192 6.24914 13.5797 5.80495 13.2587 5.48395C12.9377 5.16295 12.4936 5.02351 12.0025 5.02351ZM9.49805 10.0746C8.93594 9.88968 8.33038 10.1955 8.14548 10.7576C7.96058 11.3197 8.26635 11.9252 8.82847 12.1101C9.53995 12.3442 10.2326 12.4379 10.9289 12.3912V16.7467C10.2536 16.7796 9.57593 16.8437 8.89167 16.939C8.30557 17.0205 7.8966 17.5618 7.97816 18.1479C8.05975 18.734 8.60098 19.1429 9.18708 19.0613C11.0838 18.7973 12.9158 18.7973 14.8126 19.0613C15.3987 19.1429 15.9399 18.734 16.0215 18.1479C16.1031 17.5618 15.6941 17.0205 15.108 16.939C14.4241 16.8438 13.7468 16.7797 13.0718 16.7467V11.0924C13.0718 10.7487 12.907 10.4259 12.6286 10.2244C12.3502 10.0229 11.992 9.96719 11.6656 10.0746C10.9141 10.3218 10.2495 10.3218 9.49805 10.0746Z\" fill=\"currentColor\"></path>"
  },
  "invisible-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.272039 2.0766C-0.164722 1.51673 -0.0649234 0.708801 0.494946 0.272038C1.05482 -0.164722 1.86274 -0.0649234 2.29951 0.494947C3.49068 2.02188 4.59173 3.40397 5.64077 4.67998C7.45452 3.45598 9.63415 2.5548 12.0094 2.5548C15.3903 2.5548 18.3747 4.38063 20.472 6.36435C21.529 7.36411 22.3906 8.4313 22.9941 9.38705C23.2958 9.86469 23.5402 10.3262 23.712 10.7475C23.8774 11.1533 24.0015 11.5848 24.0015 11.9834C24.0015 12.382 23.8774 12.8134 23.712 13.2193C23.5402 13.6406 23.2958 14.1021 22.9941 14.5797C22.3906 15.5355 21.529 16.6026 20.472 17.6025C20.1607 17.897 19.8297 18.1881 19.4806 18.4702C20.7101 19.4841 22.0385 20.5521 23.497 21.7059C24.054 22.1465 24.1483 22.9551 23.7077 23.5121C23.2671 24.0689 22.4585 24.1632 21.9017 23.7226C11.9568 15.8552 7.8828 11.8326 0.272039 2.0766ZM15.0221 14.633C15.5882 13.9622 15.8634 13.0543 15.8634 11.9834C15.8634 10.8074 15.5316 9.82817 14.8472 9.1433C14.1628 8.45837 13.184 8.12623 12.0087 8.12623C10.9311 8.12623 10.0189 8.4054 9.34708 8.97963C11.1741 10.9838 12.9831 12.7843 15.0221 14.633ZM1.02461 9.38705C1.34034 8.88701 1.72675 8.35646 2.17483 7.82102C6.50558 13.1008 9.97838 16.6295 15.0641 20.9227C14.0952 21.2316 13.0718 21.4119 12.0094 21.4119C8.6285 21.4119 5.64393 19.5861 3.5467 17.6025C2.48974 16.6026 1.62808 15.5355 1.02461 14.5797C0.723019 14.1021 0.47854 13.6406 0.306805 13.2193C0.141393 12.8134 0.0171768 12.382 0.0171768 11.9834C0.0171768 11.5848 0.141393 11.1533 0.306805 10.7475C0.47854 10.3262 0.723019 9.86469 1.02461 9.38705Z\" fill=\"currentColor\"></path>"
  },
  "invisible-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.49734 6.70133C1.05824 6.26589 1.86593 6.3676 2.30138 6.92849C7.44754 13.5574 16.5535 13.5574 21.6996 6.92851C22.135 6.3676 22.9428 6.26591 23.5037 6.70133C24.0646 7.13678 24.1663 7.94447 23.7309 8.50536C23.1297 9.27977 22.4817 9.97879 21.7961 10.6024L23.2869 12.3461C23.7483 12.8858 23.687 13.6999 23.1499 14.1643C22.6128 14.6288 21.8033 14.5678 21.3418 14.0281L19.7546 12.1715C18.7467 12.8187 17.6863 13.3293 16.5955 13.7033L17.2197 15.9308C17.4111 16.6146 17.0126 17.3258 16.3294 17.5194C15.6463 17.7131 14.9372 17.3157 14.7456 16.6319L14.0964 14.3149C12.6954 14.5254 11.2731 14.5238 9.87242 14.31L9.26232 16.6139C9.08055 17.3004 8.37717 17.7079 7.69126 17.5242C7.00536 17.3404 6.59667 16.6351 6.77844 15.9487L7.37573 13.6931C6.24821 13.3037 5.15343 12.7682 4.11593 12.0867L2.71279 13.963C2.28753 14.5316 1.4837 14.6454 0.917378 14.217C0.351056 13.7887 0.2367 12.9804 0.661954 12.4118L2.09234 10.499C1.44831 9.9018 0.838363 9.23726 0.27018 8.50536C-0.165261 7.94447 -0.0635574 7.13678 0.49734 6.70133Z\" fill=\"currentColor\"></path>"
  },
  "iris-scan": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.7595 0.435736C7.46549 0.359637 8.0995 0.870264 8.1756 1.57626C8.2517 2.28225 7.74106 2.91626 7.03509 2.99236C6.45183 3.05522 5.87294 3.12238 5.29341 3.18962L5.20354 3.20004C4.15051 3.32218 3.30871 4.1664 3.19112 5.21443C3.12317 5.82012 3.05542 6.42581 2.99247 7.03588C2.9196 7.7422 2.28792 8.25571 1.58159 8.18284C0.875255 8.10995 0.361744 7.47828 0.434626 6.77194C0.498911 6.14892 0.567891 5.53241 0.635727 4.92775C0.887368 2.68471 2.67065 0.905177 4.90726 0.645744L5.00004 0.63498C5.57712 0.568027 6.16553 0.499761 6.7595 0.435736ZM15.8239 1.57626C15.9 0.870264 16.534 0.359637 17.2399 0.435736C17.8339 0.499757 18.4222 0.568022 18.9994 0.634972L19.0922 0.645744C21.3288 0.905177 23.1122 2.68471 23.3637 4.92775C23.4315 5.53241 23.5006 6.14892 23.5649 6.77194C23.6378 7.47828 23.1242 8.10995 22.4179 8.18284C21.7116 8.25571 21.0799 7.7422 21.007 7.03588C20.9441 6.42581 20.8762 5.82012 20.8083 5.21443C20.6907 4.1664 19.849 3.32218 18.7959 3.20004L18.7061 3.18962C18.1265 3.12238 17.5476 3.05522 16.9644 2.99236C16.2584 2.91626 15.7478 2.28225 15.8239 1.57626ZM15.8239 22.424C15.9 23.1299 16.534 23.6406 17.2399 23.5645C17.8339 23.5004 18.4222 23.4321 18.9994 23.3651L19.0922 23.3545C21.3288 23.0949 23.1122 21.3155 23.3637 19.0724C23.4315 18.4677 23.5006 17.8513 23.5649 17.2281C23.6378 16.5219 23.1242 15.8902 22.4179 15.8173C21.7116 15.7444 21.0799 16.2579 21.007 16.9643C20.9441 17.5744 20.8762 18.1801 20.8083 18.7857C20.6907 19.8337 19.849 20.678 18.7959 20.8002L18.7061 20.8105C18.1265 20.8778 17.5476 20.9449 16.9644 21.0078C16.2584 21.0839 15.7478 21.7178 15.8239 22.424ZM8.1756 22.424C8.0995 23.1299 7.46549 23.6406 6.7595 23.5645C6.16558 23.5004 5.57721 23.4321 5.00014 23.3651L4.90726 23.3545C2.67065 23.0949 0.887368 21.3155 0.635727 19.0724C0.567891 18.4677 0.498911 17.8513 0.434626 17.2281C0.361744 16.5219 0.875255 15.8902 1.58159 15.8173C2.28792 15.7444 2.9196 16.2579 2.99247 16.9643C3.05542 17.5744 3.12317 18.1801 3.19112 18.7857C3.30871 19.8337 4.15051 20.678 5.20354 20.8002L5.29341 20.8105C5.87294 20.8778 6.45183 20.9449 7.03509 21.0078C7.74106 21.0839 8.2517 21.7178 8.1756 22.424ZM11.9999 5.4066C9.60883 5.4066 7.48107 6.68356 5.97147 8.09333C5.21268 8.80195 4.5953 9.55738 4.16453 10.231C3.94922 10.5676 3.77676 10.8897 3.65678 11.1804C3.54003 11.4631 3.45955 11.7478 3.45955 12.0001C3.45955 12.2524 3.54003 12.5371 3.65678 12.8199C3.77676 13.1105 3.94922 13.4326 4.16453 13.7693C4.5953 14.4428 5.21268 15.1983 5.97147 15.9069C7.48107 17.3166 9.60883 18.5936 11.9999 18.5936C14.3909 18.5936 16.5187 17.3166 18.0283 15.9069C18.787 15.1983 19.4045 14.4428 19.8353 13.7693C20.0505 13.4326 20.2229 13.1105 20.3429 12.8199C20.4597 12.5371 20.5402 12.2524 20.5402 12.0001C20.5402 11.7478 20.4597 11.4631 20.3429 11.1804C20.2229 10.8897 20.0505 10.5676 19.8353 10.231C19.4045 9.55738 18.787 8.80195 18.0283 8.09333C16.5187 6.68356 14.3909 5.4066 11.9999 5.4066ZM11.9996 9.42823C11.235 9.42823 10.5771 9.64459 10.1108 10.1109C9.64452 10.5772 9.42816 11.2351 9.42816 11.9997C9.42816 12.7642 9.64452 13.4221 10.1108 13.8884C10.5771 14.3547 11.235 14.5711 11.9996 14.5711C12.7642 14.5711 13.422 14.3547 13.8883 13.8884C14.3546 13.4221 14.571 12.7642 14.571 11.9997C14.571 11.2351 14.3546 10.5772 13.8883 10.1109C13.422 9.64459 12.7642 9.42823 11.9996 9.42823Z\" fill=\"currentColor\"></path>"
  },
  "label-folder-tag": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96805 0.0727594C6.46438 -0.046579 4.93733 -0.0144093 2.91828 0.134818C1.63204 0.229884 0.679587 1.27921 0.544654 2.51211C-0.041024 7.86355 -0.238622 13.2615 0.37643 18.6687C0.628551 20.8851 2.36247 22.4995 4.43122 22.7359C6.89376 23.0174 9.33823 23.1516 11.7826 23.1422C11.3044 22.6289 10.8925 22.1145 10.5414 21.6627C9.10005 19.8084 9.1003 17.101 10.7616 15.2671C12.2146 13.6631 13.7297 12.1797 15.3744 10.7485C16.1137 10.1052 17.0578 9.67337 18.1017 9.57939C18.7167 9.52402 19.763 9.45298 20.7998 9.50467C21.3142 9.53031 21.9238 9.59026 22.5202 9.73574C22.6824 9.77527 22.8855 9.83064 23.1115 9.91155C23.089 9.15446 23.0546 8.37374 23.0076 7.56453C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42489C13.1084 3.41806 12.7689 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83317L11.2532 1.77939C10.9094 0.804588 10.0114 0.12249 8.96805 0.0727594ZM23.209 12.4203C22.8694 12.0806 22.4031 11.9126 22.0126 11.8174C21.5985 11.7163 21.137 11.6668 20.6931 11.6447C19.8029 11.6003 18.8712 11.6615 18.294 11.7134C17.7233 11.7648 17.1987 12.0014 16.7811 12.3649C15.1995 13.7411 13.7451 15.1652 12.3498 16.7056C11.4175 17.7348 11.4022 19.2782 12.2334 20.3475C12.6518 20.8858 13.1121 21.4536 13.6439 21.9855C14.1757 22.5173 14.7435 22.9776 15.2818 23.3959C16.3512 24.2271 17.8946 24.2119 18.9238 23.2795C20.4641 21.8842 21.8882 20.4298 23.2646 18.8482C23.628 18.4305 23.8646 17.9061 23.916 17.3354C23.9679 16.7582 24.0291 15.8264 23.9847 14.9362C23.9626 14.4923 23.9131 14.0309 23.8119 13.6167C23.7168 13.2262 23.5488 12.76 23.209 12.4203ZM20.6326 14.9985C20.8413 15.2071 21.0291 15.5161 21.0291 15.9076C21.0291 16.2992 20.8413 16.6083 20.6326 16.8168C20.4242 17.0253 20.1151 17.2133 19.7235 17.2133C19.3402 17.2133 19.0359 17.0331 18.8277 16.8299L18.8124 16.8149C18.6038 16.6064 18.4159 16.2973 18.4159 15.9058C18.4159 15.5142 18.6038 15.2051 18.8124 14.9966C19.0209 14.7881 19.3299 14.6001 19.7215 14.6001C20.1048 14.6001 20.4091 14.7803 20.6174 14.9836L20.6326 14.9985Z\" fill=\"currentColor\"></path>"
  },
  "landscape-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.9999 0.214355C10.0313 0.214355 8.11039 0.394338 6.2695 0.599531C3.4033 0.919011 1.10031 3.22001 0.793102 6.09141C0.597166 7.92278 0.428467 9.83088 0.428467 11.7858C0.428467 13.7407 0.597166 15.6488 0.793102 17.4801C1.10031 20.3516 3.4033 22.6526 6.2695 22.972C8.11039 23.1772 10.0313 23.3572 11.9999 23.3572C13.9684 23.3572 15.8894 23.1772 17.7302 22.972C20.5965 22.6526 22.8995 20.3516 23.2067 17.4801C23.4026 15.6488 23.5713 13.7407 23.5713 11.7858C23.5713 9.83088 23.4026 7.92278 23.2067 6.09141C22.8995 3.22001 20.5965 0.919011 17.7302 0.599531C15.8894 0.394338 13.9684 0.214355 11.9999 0.214355ZM15.7466 4.17864C14.8211 4.17864 13.977 4.44158 13.3652 5.05342C12.7533 5.66529 12.4904 6.50933 12.4904 7.43477C12.4904 8.36023 12.7533 9.20428 13.3652 9.81612C13.977 10.428 14.8211 10.6909 15.7466 10.6909C16.672 10.6909 17.5161 10.428 18.128 9.81612C18.7398 9.20428 19.0028 8.36023 19.0028 7.43477C19.0028 6.50933 18.7398 5.66529 18.128 5.05342C17.5161 4.44158 16.672 4.17864 15.7466 4.17864ZM6.56136 11.7858C10.0953 11.7858 13.055 16.9641 14.6854 20.68C13.7918 20.7453 12.8978 20.7858 12.0001 20.7858C10.179 20.7858 8.37322 20.6192 6.55452 20.4164C4.88129 20.2298 3.52836 18.8726 3.35011 17.2065C3.21615 15.9546 3.09975 14.7062 3.04092 13.4537C4.119 12.4415 5.30381 11.7858 6.56136 11.7858ZM16.3899 14.6251C17.9522 14.6251 19.4024 15.5867 20.675 16.9708L20.65 17.2065C20.4717 18.8726 19.1188 20.23 17.4457 20.4164C17.273 20.4357 17.1006 20.4546 16.9282 20.4731C16.2825 18.9302 15.3861 17.0494 14.2855 15.312L14.2312 15.2266C14.9203 14.8453 15.6423 14.6251 16.3899 14.6251Z\" fill=\"currentColor\"></path>"
  },
  "landscape-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.9999 0.428711C10.0864 0.428711 8.22454 0.60364 6.4571 0.800648C3.48535 1.13189 1.09921 3.51499 0.780494 6.49399C0.59232 8.25281 0.428467 10.1011 0.428467 12.0001C0.428467 13.8991 0.59232 15.7475 0.780495 17.5063C1.09921 20.4853 3.48535 22.8684 6.4571 23.1996C8.22454 23.3967 10.0864 23.5716 11.9999 23.5716C13.9134 23.5716 15.7753 23.3967 17.5427 23.1996C20.5144 22.8684 22.9005 20.4853 23.2194 17.5063C23.4074 15.7475 23.5713 13.8991 23.5713 12.0001C23.5713 10.1011 23.4074 8.25281 23.2194 6.49399C22.9005 3.51499 20.5144 1.13189 17.5427 0.800648C15.7753 0.60364 13.9134 0.428711 11.9999 0.428711ZM15.4901 11.5634C17.4448 11.5634 18.5442 10.4639 18.5442 8.50924C18.5442 6.55457 17.4448 5.45507 15.4901 5.45507C13.5354 5.45507 12.4359 6.55457 12.4359 8.50924C12.4359 10.4639 13.5354 11.5634 15.4901 11.5634ZM9.75607 12.6437C12.7489 14.681 15.3156 17.6161 17.1774 20.6062C15.4576 20.7968 13.7379 20.9537 12 20.9537C10.2366 20.9537 8.49211 20.7924 6.74717 20.5978C4.99013 20.402 3.5711 18.9799 3.38366 17.2279C3.28183 16.276 3.19018 15.3231 3.12823 14.3665C3.749 13.8396 4.42709 13.3662 5.35436 12.7209C6.6492 11.8199 8.39859 11.7197 9.75607 12.6437Z\" fill=\"currentColor\"></path>"
  },
  "landscape-image-solo": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M12 2.14307C13.8748 2.14307 15.6999 2.33613 17.4274 2.53482L17.8191 2.59842C19.7563 2.99349 21.2641 4.60794 21.4855 6.60288L21.6228 7.91037C21.7543 9.23364 21.8571 10.6029 21.8571 12.0002C21.8571 13.3975 21.7543 14.7668 21.6228 16.09L21.4855 17.3975C21.2641 19.3926 19.7563 21.0069 17.8191 21.402L17.4274 21.4656C15.6999 21.6643 13.8748 21.8574 12 21.8574C10.5941 21.8574 9.21639 21.7478 7.88669 21.6096L6.5725 21.4656C4.5823 21.2366 2.96525 19.7313 2.57642 17.7909L2.51448 17.3975C2.32375 15.6769 2.14282 13.8631 2.14282 12.0002C2.14282 10.1373 2.32375 8.3235 2.51448 6.60288L2.57642 6.20947C2.96525 4.26912 4.5823 2.76383 6.5725 2.53482L7.88669 2.39083C9.21639 2.25259 10.5941 2.14307 12 2.14307ZM7.93356 10.825C6.75895 10.825 5.66882 11.3372 4.71425 12.0605C4.71814 13.7483 4.88311 15.4194 5.07084 17.1129C5.17394 18.0431 5.92941 18.803 6.86715 18.9108C8.59293 19.1094 10.2874 19.2859 12 19.2859C13.4281 19.2859 14.844 19.1623 16.2756 19.0063C15.6895 17.8103 14.9455 16.4899 14.0926 15.2714C13.2897 14.1246 12.3659 13.033 11.3571 12.2212C10.3547 11.4145 9.19315 10.8252 7.93356 10.825ZM15.7433 6.08726C14.9827 6.08743 14.3275 6.30275 13.8632 6.76696C13.3991 7.23119 13.1837 7.88632 13.1836 8.64698C13.1836 9.40754 13.3994 10.0627 13.8632 10.527C14.3275 10.9912 14.9827 11.2082 15.7433 11.2084C16.5042 11.2084 17.1589 10.9913 17.6233 10.527C18.0877 10.0626 18.3046 9.40797 18.3046 8.64698C18.3046 7.88628 18.0876 7.23119 17.6233 6.76696C17.1589 6.30312 16.5038 6.08726 15.7433 6.08726Z\" fill=\"currentColor\"></path>"
  },
  "line-arrow-synchronize-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.0004 3.85707C8.85427 3.85707 6.12245 5.64188 4.76657 8.25674C5.12587 8.05992 5.44781 7.77896 5.74198 7.40935C6.18418 6.85378 6.99305 6.76186 7.54863 7.20406C8.10422 7.64628 8.19612 8.45513 7.75392 9.01071C6.5749 10.492 4.98106 11.2324 3.08861 11.178C2.81054 11.17 2.54254 11.0721 2.3249 10.8988C0.843587 9.71979 0.103152 8.12594 0.157583 6.23348C0.177998 5.5237 0.769943 4.96486 1.47973 4.98528C2.18952 5.0057 2.74836 5.59764 2.72794 6.30742C2.72484 6.41539 2.72583 6.52073 2.73098 6.6236C4.58568 3.4326 8.04111 1.28564 12.0004 1.28564C16.9065 1.28564 21.0395 4.58218 22.3112 9.07858C22.5044 9.76186 22.1072 10.4724 21.4239 10.6657C20.7407 10.8589 20.0302 10.4617 19.8368 9.77842C18.8699 6.35996 15.7258 3.85707 12.0004 3.85707ZM22.5256 18.9901C21.8158 18.9697 21.2571 18.3778 21.2775 17.6679C21.2804 17.5654 21.2795 17.4651 21.2751 17.367C19.4218 20.5631 15.9634 22.7142 12.0003 22.7142C7.09414 22.7142 2.96124 19.4176 1.68949 14.9213C1.49623 14.238 1.89348 13.5274 2.57674 13.3342C3.26002 13.1409 3.97059 13.5382 4.16384 14.2215C5.13072 17.6399 8.27489 20.1428 12.0003 20.1428C15.1587 20.1428 17.8995 18.344 19.25 15.7125C18.886 15.9096 18.5605 16.1926 18.2634 16.566C17.8211 17.1215 17.0123 17.2134 16.4567 16.7713C15.9011 16.3291 15.8092 15.5202 16.2514 14.9646C17.4304 13.4833 19.0242 12.7429 20.9168 12.7973C21.1948 12.8053 21.4628 12.9033 21.6805 13.0765C23.1618 14.2555 23.9022 15.8494 23.8477 17.7418C23.8273 18.4516 23.2354 19.0105 22.5256 18.9901Z\" fill=\"currentColor\"></path>"
  },
  "line-arrow-synchronize-disable": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.289886 2.09403C-0.147066 1.53431 -0.0475418 0.726348 0.512179 0.289398C1.0719 -0.147555 1.87987 -0.0480299 2.31681 0.511691C3.26275 1.7234 4.15179 2.84376 5.00307 3.89218C6.16956 2.88545 7.55541 2.126 9.07901 1.69508C9.76229 1.50182 10.4729 1.89907 10.6661 2.58235C10.8594 3.26561 10.4621 3.97618 9.77885 4.16943C8.60299 4.50202 7.53547 5.0922 6.64087 5.87504C10.3851 10.3234 13.591 13.5075 18.1476 17.3463C19.3908 15.9163 20.1432 14.0485 20.1432 12.0059C20.1432 8.86063 18.3593 6.12941 15.7456 4.77315C15.9418 5.12379 16.2188 5.43871 16.581 5.72698C17.1366 6.16918 17.2286 6.97805 16.7863 7.53363C16.3441 8.08922 15.5352 8.18112 14.9797 7.73892C13.4984 6.5599 12.7579 4.96604 12.8123 3.07361C12.8203 2.79554 12.9183 2.52754 13.0916 2.30988C14.2706 0.828585 15.8644 0.0881491 17.7569 0.14258C18.4666 0.162995 19.0255 0.754941 19.0051 1.46473C18.9847 2.17452 18.3927 2.73336 17.683 2.71294C17.5668 2.7096 17.4537 2.711 17.3434 2.71723C20.5527 4.56718 22.7146 8.03288 22.7146 12.0059C22.7146 14.6736 21.7401 17.1127 20.1278 18.9875C21.173 19.8411 22.2895 20.7354 23.495 21.6886C24.0521 22.129 24.1466 22.9374 23.7062 23.4946C23.2659 24.0515 22.4573 24.1462 21.9003 23.7058C11.9643 15.8508 7.89389 11.8345 0.289886 2.09403ZM14.0139 19.921C14.7349 20.5422 15.4874 21.1762 16.2794 21.8312C15.8413 22.0222 15.3879 22.1848 14.9217 22.3167C14.2384 22.51 13.5279 22.1127 13.3346 21.4295C13.1619 20.8189 13.4608 20.1865 14.0139 19.921ZM3.8575 12.0059C3.8575 11.3197 3.94241 10.6533 4.10232 10.0165C3.47465 9.28599 2.83581 8.52384 2.17709 7.72121C1.60401 9.03317 1.28607 10.4823 1.28607 12.0059C1.28607 15.9551 3.42213 19.4031 6.59971 21.2612C6.50923 21.2648 6.41685 21.2651 6.32246 21.2624C5.61267 21.242 5.02071 21.8008 5.00031 22.5106C4.9799 23.2204 5.53874 23.8124 6.24852 23.8328C8.14097 23.8871 9.73483 23.1467 10.9138 21.6654C11.0871 21.4479 11.1851 21.1798 11.1931 20.9017C11.2475 19.0093 10.507 17.4155 9.02575 16.2364C8.47017 15.7942 7.6613 15.8861 7.2191 16.4417C6.7769 16.9973 6.8688 17.8062 7.42438 18.2483C7.80509 18.5514 8.09177 18.8838 8.28929 19.2563C5.65695 17.9062 3.8575 15.1649 3.8575 12.0059Z\" fill=\"currentColor\"></path>"
  },
  "link-share-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.596 9.80333C20.9173 9.86464 20.2667 9.51815 19.9389 8.92073C19.6501 8.39452 19.3434 7.90788 19.0134 7.4556L14.2626 12.2065C13.5931 12.876 12.5077 12.876 11.8382 12.2065C11.1687 11.537 11.1687 10.4516 11.8382 9.78213L16.5959 5.02437C16.1291 4.68005 15.6255 4.36094 15.0793 4.06118C14.4819 3.73334 14.1354 3.0828 14.1967 2.40412C14.258 1.72543 14.7154 1.1475 15.3619 0.932005C17.375 0.260939 19.9706 0.260937 21.9839 0.932053C22.4958 1.10269 22.8974 1.50438 23.068 2.01628C23.7392 4.02941 23.7392 6.62493 23.068 8.63812C22.8525 9.28459 22.2746 9.74205 21.596 9.80333ZM13.241 5.34885C13.0572 5.17343 12.8921 4.9811 12.7475 4.77521C10.0494 4.66271 7.36142 4.6619 4.65987 4.84451C2.59289 4.98424 1.0166 6.64142 0.801677 8.64024C0.613341 10.3918 0.428467 12.2418 0.428467 14.143C0.428467 16.0202 0.608662 17.8471 0.794446 19.5785C1.01335 21.6187 2.64464 23.2789 4.7352 23.4094C8.1996 23.6257 11.5145 23.6257 14.9789 23.4094C17.0694 23.2789 18.7007 21.6187 18.9196 19.5785C19.1054 17.8471 19.2856 16.0202 19.2856 14.1431C19.2856 13.1476 19.2349 12.1662 19.1596 11.2057C18.995 11.0849 18.8396 10.9509 18.6952 10.8043L15.7778 13.7217C14.2715 15.228 11.8293 15.228 10.323 13.7217C8.81669 12.2154 8.81667 9.77323 10.323 8.26691L13.241 5.34885Z\" fill=\"currentColor\"></path>"
  },
  "loader-progress-bar-countdown-63": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 3.1482C5.2465 1.04988 8.27652 0 12 0C15.7235 0 18.7534 1.04988 20.8519 3.1482C22.9502 5.2465 24 8.27652 24 12C24 15.7235 22.9502 18.7534 20.8519 20.8519C18.7534 22.9502 15.7235 24 12 24C8.27652 24 5.2465 22.9502 3.1482 20.8519C1.04988 18.7534 0 15.7235 0 12C0 8.27652 1.04988 5.2465 3.1482 3.1482ZM5.90909 5.90909C7.34076 4.47744 9.41825 3.75 12 3.75C12.2367 3.75 12.4286 3.94188 12.4286 4.17857V11.8225L18.0909 17.4849C18.2583 17.6522 18.2583 17.9235 18.0909 18.0909C16.6592 19.5226 14.5817 20.25 12 20.25C9.41825 20.25 7.34076 19.5226 5.90909 18.0909C4.47744 16.6592 3.75 14.5817 3.75 12C3.75 9.41825 4.47744 7.34076 5.90909 5.90909Z\" fill=\"currentColor\"></path>"
  },
  "loading-circle": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.57143 12.0321C2.57143 8.83025 3.46875 6.51024 4.99102 4.98932C6.51348 3.46825 8.8362 2.57143 12.0418 2.57143C15.8405 2.57143 18.4094 3.82551 19.8864 5.93655C20.7034 7.10415 21.2453 8.61135 21.4361 10.4814C21.5083 11.1878 22.1393 11.7021 22.8458 11.63C23.5522 11.5579 24.0663 10.9268 23.9943 10.2203C23.7677 8.00026 23.107 6.05417 21.9934 4.46242C19.9034 1.47517 16.42 0 12.0418 0C8.36352 0 5.3082 1.03753 3.17357 3.17024C1.03878 5.30311 0 8.3563 0 12.0321C0 15.4344 0.888868 18.3043 2.72043 20.4086C4.5595 22.5214 7.21688 23.7104 10.449 23.9959C11.1564 24.0584 11.7804 23.5358 11.8429 22.8284C11.9054 22.1211 11.3827 21.497 10.6753 21.4346C7.95089 21.1939 5.97003 20.2253 4.66003 18.7203C3.34249 17.2066 2.57143 14.9982 2.57143 12.0321ZM23.6506 15.8572C23.8202 15.1677 23.3988 14.4712 22.7093 14.3015C22.0198 14.1318 21.3233 14.5532 21.1536 15.2427C20.951 16.0666 20.6662 16.8007 20.3091 17.4483C19.9661 18.0701 20.1922 18.8522 20.8142 19.195C21.4359 19.5379 22.218 19.3119 22.5608 18.69C23.0364 17.8275 23.399 16.8798 23.6506 15.8572ZM18.75 22.5178C19.3702 22.1722 19.5931 21.3893 19.2475 20.7689C18.902 20.1485 18.119 19.9258 17.4987 20.2712C16.8307 20.6434 16.07 20.9379 15.2131 21.1447C14.5228 21.3113 14.0982 22.0058 14.2648 22.6961C14.4313 23.3864 15.1259 23.8109 15.8161 23.6444C16.8779 23.3883 17.8598 23.0136 18.75 22.5178Z\" fill=\"currentColor\"></path>"
  },
  "loading-horizontal-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.17745 6.98584C4.35451 6.98584 3.55752 7.06014 2.81045 7.14334L2.80778 7.14363C2.13087 7.22116 1.49929 7.52399 1.01639 8.00425C0.533362 8.48463 0.227657 9.11425 0.150659 9.79086L0.150137 9.79556C0.0704007 10.5324 0 11.3178 0 12.1287C0 12.9396 0.0704066 13.7243 0.150128 14.4617L0.150659 14.4665C0.227657 15.1432 0.533362 15.7728 1.01639 16.2532C1.49929 16.7334 2.13087 17.0362 2.80778 17.1138L2.81054 17.1141C3.55817 17.1972 4.35449 17.2716 5.17745 17.2716C6.00038 17.2716 6.79737 17.1973 7.54443 17.1141L7.54711 17.1138C8.22401 17.0362 8.85561 16.7334 9.3385 16.2532C9.82152 15.7728 10.1272 15.1432 10.2042 14.4665L10.2048 14.4617C10.2845 13.7243 10.3549 12.9389 10.3549 12.1287C10.3549 11.3185 10.2845 10.5331 10.2048 9.79504L10.2042 9.79017C10.1272 9.11356 9.82152 8.48392 9.3385 8.00356C8.85561 7.52331 8.22401 7.22048 7.54711 7.14294L7.54279 7.14246C6.79713 7.0609 6.00051 6.98584 5.17745 6.98584ZM24 8.27992C24 7.56983 23.4243 6.99421 22.7143 6.99421C22.0042 6.99421 21.4286 7.56983 21.4286 8.27992V15.9862C21.4286 16.6963 22.0042 17.2719 22.7143 17.2719C23.4243 17.2719 24 16.6963 24 15.9862V8.27992ZM14.828 7.05102C15.5941 6.96382 16.1897 6.96471 16.9535 7.05013L16.9579 7.05063C17.6395 7.13043 18.2722 7.44191 18.7538 7.93151C19.2351 8.42089 19.537 9.05934 19.6131 9.74204L19.6137 9.7468C19.6932 10.501 19.7635 11.3024 19.7635 12.1286C19.7635 12.9549 19.6932 13.7562 19.6137 14.5098L19.6131 14.5145C19.537 15.1972 19.2351 15.8356 18.7538 16.325C18.2722 16.8146 17.6395 17.126 16.9579 17.2059L16.9552 17.2062C16.1892 17.2933 15.5939 17.2933 14.8281 17.2062L14.8253 17.2059C14.1437 17.126 13.5109 16.8146 13.0294 16.325C12.5481 15.8356 12.2461 15.1972 12.1701 14.5145L12.1696 14.5098C12.0899 13.7562 12.0197 12.9556 12.0197 12.1286C12.0197 11.3017 12.0899 10.5003 12.1696 9.74735L12.1701 9.74274C12.2461 9.06004 12.5481 8.42159 13.0294 7.93222C13.5109 7.44262 14.1437 7.13115 14.8253 7.05133L14.828 7.05102Z\" fill=\"currentColor\"></path>"
  },
  "loading-horizontal-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.85677 8.85684C9.64365 8.06995 10.7451 7.71436 12 7.71436C13.2549 7.71436 14.3564 8.06995 15.1432 8.85684C15.9301 9.64372 16.2857 10.7452 16.2857 12.0001C16.2857 13.255 15.9301 14.3564 15.1432 15.1433C14.3564 15.9302 13.2549 16.2858 12 16.2858C10.7451 16.2858 9.64365 15.9302 8.85677 15.1433C8.06988 14.3564 7.71429 13.255 7.71429 12.0001C7.71429 10.7452 8.06988 9.64372 8.85677 8.85684ZM3 9.00007C2.15652 9.00007 1.3765 9.23995 0.808195 9.80827C0.239883 10.3766 0 11.1566 0 12.0001C0 12.8435 0.239883 13.6236 0.808195 14.1919C1.3765 14.7602 2.15652 15.0001 3 15.0001C3.84348 15.0001 4.6235 14.7602 5.1918 14.1919C5.76012 13.6236 6 12.8435 6 12.0001C6 11.1566 5.76012 10.3766 5.1918 9.80827C4.6235 9.23995 3.84348 9.00007 3 9.00007ZM21 9.00007C21.8434 9.00007 22.6234 9.23995 23.1919 9.80827C23.7602 10.3766 24 11.1566 24 12.0001C24 12.8435 23.7602 13.6236 23.1919 14.1919C22.6234 14.7602 21.8434 15.0001 21 15.0001C20.1566 15.0001 19.3766 14.7602 18.8081 14.1919C18.2398 13.6236 18 12.8435 18 12.0001C18 11.1566 18.2398 10.3766 18.8081 9.80827C19.3766 9.23995 20.1566 9.00007 21 9.00007Z\" fill=\"currentColor\"></path>"
  },
  "location-compass-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.14925 3.14925C5.24971 1.04877 8.28082 0 12 0C15.7192 0 18.7503 1.04877 20.8507 3.14925C22.9512 5.24971 24 8.28082 24 12C24 15.7192 22.9512 18.7503 20.8507 20.8507C18.7503 22.9512 15.7192 24 12 24C8.28082 24 5.24971 22.9512 3.14925 20.8507C1.04877 18.7503 0 15.7192 0 12C0 8.28082 1.04877 5.24971 3.14925 3.14925ZM9.80894 13.209C10.149 13.2452 10.4607 13.2645 10.726 13.2743C10.7358 13.5396 10.7552 13.8513 10.7913 14.1914C10.8984 15.1988 11.1614 16.5454 11.8286 17.6623C12.1283 18.1641 12.6468 18.4068 13.1589 18.3857C13.656 18.3655 14.1259 18.1018 14.4136 17.6631C15.8327 15.4999 17.4473 12.1851 17.5293 8.72719C17.5591 7.46328 16.5366 6.44079 15.2727 6.47076C11.8148 6.55274 8.5003 8.16758 6.33713 9.58668C5.89853 9.87441 5.63484 10.3443 5.61453 10.8414C5.59359 11.3535 5.83622 11.872 6.33806 12.1718C7.45497 12.8389 8.80155 13.1019 9.80894 13.209Z\" fill=\"currentColor\"></path>"
  },
  "location-pin": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1.74374 9.81374C2.12078 4.31451 6.52413 0 11.8923 0H12.1071C17.4752 0 21.8787 4.31451 22.2557 9.81374C22.4319 12.3838 21.884 15.1063 20.2771 17.3049C18.4702 19.7765 16.6245 21.4733 13.7966 23.4351C12.7108 24.1882 11.2886 24.1882 10.2028 23.4351C7.3749 21.4733 5.52914 19.7765 3.72244 17.3049C2.11533 15.1063 1.56754 12.3838 1.74374 9.81374ZM9.57379 8.2429C10.1635 7.65321 11.0028 7.37151 11.9997 7.37151C12.9966 7.37151 13.8359 7.65321 14.4256 8.2429C15.0153 8.8326 15.297 9.67193 15.297 10.6688C15.297 11.6657 15.0153 12.505 14.4256 13.0947C13.8359 13.6844 12.9966 13.9661 11.9997 13.9661C11.0028 13.9661 10.1635 13.6844 9.57379 13.0947C8.9841 12.505 8.7024 11.6657 8.7024 10.6688C8.7024 9.67193 8.9841 8.8326 9.57379 8.2429Z\" fill=\"currentColor\"></path>"
  },
  "location-pin-option-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1.74374 9.81374C2.12078 4.31451 6.52413 0 11.8923 0H12.1071C17.4752 0 21.8787 4.31451 22.2557 9.81374C22.4319 12.3838 21.884 15.1063 20.2771 17.3049C18.4702 19.7765 16.6245 21.4733 13.7966 23.4351C12.7108 24.1882 11.2886 24.1882 10.2028 23.4351C7.3749 21.4733 5.52914 19.7765 3.72244 17.3049C2.11533 15.1063 1.56754 12.3838 1.74374 9.81374ZM16.6674 8.72014C17.1934 8.24304 17.2328 7.42994 16.7558 6.90401C16.2787 6.37809 15.4656 6.33849 14.9397 6.81557C13.7235 7.91883 12.7949 8.92392 12.0086 10.1513C11.5277 10.9019 11.1132 11.7151 10.7176 12.6543L9.49442 11.3929C9.00009 10.8831 8.18611 10.8706 7.67635 11.3649C7.16659 11.8593 7.15406 12.6732 7.64838 13.183L10.2783 15.895C10.5888 16.2153 11.0431 16.3517 11.4787 16.2554C11.9143 16.1591 12.2689 15.844 12.4155 15.4227C13.0188 13.6899 13.5468 12.5171 14.1738 11.5385C14.7956 10.5678 15.5494 9.73425 16.6674 8.72014Z\" fill=\"currentColor\"></path>"
  },
  "magnifying-glass-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.2695 0.813887C8.11039 0.608694 10.0313 0.428711 11.9999 0.428711C13.9684 0.428711 15.8894 0.608694 17.7302 0.813887C20.5965 1.13337 22.8995 3.43437 23.2067 6.30576C23.4026 8.13713 23.5713 10.0452 23.5713 12.0001C23.5713 13.955 23.4026 15.8631 23.2067 17.6945C22.8995 20.5659 20.5965 22.867 17.7302 23.1864C15.8894 23.3916 13.9684 23.5716 11.9999 23.5716C10.0313 23.5716 8.11039 23.3916 6.2695 23.1864C3.4033 22.867 1.10031 20.5659 0.793102 17.6945C0.597166 15.8631 0.428467 13.955 0.428467 12.0001C0.428467 10.0452 0.597166 8.13713 0.793102 6.30576C1.10031 3.43437 3.4033 1.13337 6.2695 0.813887ZM9.27161 9.27143C8.84892 9.69412 8.53366 10.3993 8.53366 11.5344C8.53366 12.6694 8.84892 13.3747 9.27161 13.7974C9.69428 14.22 10.3995 14.5353 11.5346 14.5353C12.6696 14.5353 13.3748 14.22 13.7975 13.7974C14.2202 13.3747 14.5355 12.6694 14.5355 11.5344C14.5355 10.3993 14.2202 9.69412 13.7975 9.27143C13.3748 8.84873 12.6696 8.53348 11.5346 8.53348C10.3995 8.53348 9.69428 8.84873 9.27161 9.27143ZM7.45334 7.45315C8.4881 6.41839 9.92619 5.96205 11.5346 5.96205C13.1429 5.96205 14.581 6.41839 15.6158 7.45315C16.6506 8.48791 17.1069 9.92601 17.1069 11.5344C17.1069 12.6589 16.8839 13.7001 16.396 14.5785L17.661 15.8434C18.1631 16.3455 18.1629 17.1596 17.6608 17.6617C17.1587 18.1639 16.3447 18.1637 15.8426 17.6616L14.5775 16.3965C13.6994 16.8839 12.6586 17.1067 11.5346 17.1067C9.92619 17.1067 8.4881 16.6504 7.45334 15.6156C6.41856 14.5809 5.96223 13.1428 5.96223 11.5344C5.96223 9.92601 6.41856 8.48791 7.45334 7.45315Z\" fill=\"currentColor\"></path>"
  },
  "new-file": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.292 0.00690295C12.8741 0.00231202 12.4444 0 12 0C9.33883 0 7.20909 0.0829277 4.97741 0.240679C2.90043 0.387494 1.2463 2.03983 1.11033 4.12203C0.944455 6.66233 0.857178 9.29793 0.857178 12C0.857178 14.7021 0.944455 17.3376 1.11033 19.878C1.2463 21.9602 2.90043 23.6126 4.97741 23.7593C7.20909 23.917 9.33883 24 12 24C14.6612 24 16.791 23.917 19.0226 23.7593C21.0996 23.6126 22.7537 21.9602 22.8897 19.878C23.025 17.8082 23.1079 15.6751 23.134 13.4943C23.016 12.9148 22.8053 12.4459 22.541 12.0603C22.1393 11.4744 21.5735 11.0228 20.8907 10.6769C19.4968 9.97078 17.7427 9.76805 16.3819 9.72874C14.7177 9.68067 13.292 8.37778 13.292 6.61875V0.00690295ZM23.1156 9.56913C23.0441 8.13663 22.5604 6.73598 21.6659 5.58183C20.2056 3.69751 18.8933 2.38752 16.8862 0.857544C16.4502 0.525213 15.9557 0.289846 15.4349 0.156237V6.61875C15.4349 7.12545 15.8433 7.56943 16.4438 7.58678C17.8949 7.62869 20.0352 7.84131 21.8591 8.76538C22.2955 8.98647 22.7203 9.25155 23.1156 9.56913Z\" fill=\"currentColor\"></path>"
  },
  "new-file-dash": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.1097 2.58768C10.7111 2.57691 11.3374 2.57143 11.9999 2.57143C12.2307 2.57143 12.457 2.57209 12.6795 2.57341V7.30841C12.6795 8.96233 14.0187 10.1957 15.5807 10.2282C16.7686 10.253 18.0538 10.4167 19.0117 10.9722C19.7996 11.4291 20.4779 12.209 20.5582 13.8155C20.557 13.8898 20.5558 13.9641 20.5544 14.0382C20.553 14.1236 20.5599 14.2071 20.5743 14.288C20.6471 14.9289 21.1912 15.4268 21.8518 15.4268C22.5618 15.4268 23.1375 14.8512 23.1375 14.1411C23.1375 14.0188 23.1351 13.8985 23.1303 13.7802C23.139 13.1905 23.1435 12.5972 23.1435 12.0005C23.1435 11.287 23.1371 10.5784 23.1248 9.87509C23.0975 8.33251 22.603 6.80561 21.6358 5.55288C20.212 3.70896 18.9268 2.42089 16.9742 0.926716C16.2245 0.353022 15.3155 0.0468721 14.3896 0.0258617L14.1455 0.0206403C13.4635 0.00693317 12.7535 0 11.9999 0C11.3232 0 10.6815 0.00559258 10.0636 0.0166631C9.35367 0.0293845 8.78844 0.615239 8.80116 1.32521C8.81388 2.03518 9.39974 2.6004 10.1097 2.58768ZM20.4092 8.81156C20.2561 8.19586 19.9837 7.62068 19.6004 7.12441C18.3143 5.45875 17.1884 4.32853 15.4116 2.96887C15.3601 2.92949 15.3065 2.89301 15.2509 2.85951V7.30841C15.2509 7.47528 15.3819 7.65211 15.6343 7.65737C16.9183 7.68416 18.7552 7.8511 20.3015 8.74765C20.3377 8.7686 20.3735 8.78991 20.4092 8.81156ZM5.95961 2.76067C6.66818 2.71428 7.20497 2.10228 7.1586 1.39371C7.11221 0.685146 6.50021 0.148341 5.79164 0.194723C5.61334 0.206395 5.4348 0.21857 5.25569 0.23124C3.02686 0.38891 1.24561 2.15856 1.10003 4.39553C1.08875 4.56883 1.07785 4.74257 1.06733 4.91677C1.02453 5.62556 1.56441 6.23485 2.27321 6.27766C2.982 6.32045 3.59127 5.78057 3.63408 5.07178C3.64436 4.90157 3.65501 4.73182 3.66603 4.56252C3.72727 3.62167 4.47787 2.86412 5.43713 2.79625C5.61194 2.78389 5.78597 2.77203 5.95961 2.76067ZM3.4433 10.0897C3.45478 9.37968 2.88854 8.79482 2.17855 8.78333C1.46856 8.77184 0.883687 9.33809 0.8722 10.0481C0.861741 10.6946 0.856445 11.3455 0.856445 12.0005C0.856445 12.6993 0.862473 13.3935 0.874368 14.0826C0.886624 14.7926 1.47211 15.3582 2.18208 15.346C2.89205 15.3337 3.45766 14.7482 3.44542 14.0382C3.43378 13.364 3.42787 12.6845 3.42787 12.0005C3.42787 11.3594 3.43306 10.7223 3.4433 10.0897ZM3.64771 19.1511C3.60346 18.4424 2.99309 17.9038 2.28439 17.948C1.57569 17.9923 1.03704 18.6027 1.08128 19.3114L1.10003 19.6054C1.24561 21.8424 3.02686 23.612 5.25569 23.7698C5.4348 23.7824 5.61334 23.7946 5.79164 23.8063C6.50021 23.8527 7.11221 23.3158 7.1586 22.6073C7.20497 21.8988 6.66818 21.2868 5.95961 21.2403C5.78597 21.229 5.61194 21.2172 5.43713 21.2048C4.47787 21.137 3.72727 20.3794 3.66603 19.4384L3.64771 19.1511ZM22.9186 19.3114C22.9628 18.6027 22.4242 17.9923 21.7155 17.948C21.0068 17.9038 20.3963 18.4424 20.3521 19.1511L20.3338 19.4384C20.2726 20.3794 19.522 21.137 18.5627 21.2048C18.439 21.2136 18.3155 21.222 18.1923 21.2302C17.4838 21.2777 16.948 21.8906 16.9955 22.5991C17.043 23.3076 17.6559 23.8435 18.3644 23.796C18.4907 23.7874 18.6172 23.7787 18.7441 23.7698C20.973 23.612 22.7543 21.8424 22.8999 19.6054L22.9186 19.3114ZM14.1455 23.9804C14.8555 23.966 15.4194 23.3791 15.4051 22.669C15.3909 21.9591 14.8038 21.3951 14.0938 21.4095C13.4304 21.4227 12.7376 21.4296 11.9999 21.4296C11.3374 21.4296 10.7111 21.4241 10.1097 21.4133C9.39974 21.4006 8.81388 21.9658 8.80116 22.6759C8.78844 23.3858 9.35367 23.9717 10.0636 23.9844C10.6815 23.9954 11.3232 24.001 11.9999 24.001C12.7535 24.001 13.4635 23.9942 14.1455 23.9804Z\" fill=\"currentColor\"></path>"
  },
  "new-folder": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.39651 0.50147C6.89285 0.382132 5.3658 0.414302 3.34675 0.563529C2.0605 0.658595 1.10805 1.70792 0.973121 2.94082C0.387442 8.29226 0.189845 13.6902 0.804897 19.0975C1.05702 21.3139 2.79094 22.9282 4.85969 23.1646C9.68624 23.7163 14.4434 23.702 19.2662 23.1507C21.3426 22.9135 22.9605 21.2023 23.2 19.0975C23.585 15.7116 23.6831 12.2457 23.4361 7.99324C23.3174 5.94946 21.7235 4.29084 19.6766 4.1123C17.6162 3.93259 16.102 3.90074 13.8611 3.8536C13.5368 3.84677 13.1973 3.83963 12.8388 3.83167C12.485 3.82382 12.1716 3.59697 12.0534 3.26188L11.6817 2.2081C11.3378 1.2333 10.4398 0.5512 9.39651 0.50147Z\" fill=\"currentColor\"></path>"
  },
  "open-folder": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.08393 1.20708C5.1358 1.05678 6.68743 1.02437 9.23201 1.14458C10.2825 1.19421 11.1925 1.87543 11.5421 2.85768L11.92 3.91954C12.0394 4.25491 12.3575 4.48887 12.7245 4.50013H19.1486C20.5715 4.50013 21.7513 5.63695 21.7513 7.07158V8.06306C19.3766 7.96596 16.1938 7.8782 14.6719 7.8782C12.7391 7.8782 10.4983 8.01847 8.92646 8.13893C7.27555 8.26546 5.84704 9.28932 5.18265 10.777L5.17996 10.783L3.16425 15.3728C2.92632 15.9146 3.17263 16.5467 3.71443 16.7846C4.25621 17.0226 4.8883 16.7763 5.12625 16.2345L7.14048 11.648C7.48793 10.8727 8.23216 10.3413 9.09022 10.2755C10.6468 10.1562 12.8225 10.0211 14.6719 10.0211C16.7274 10.0211 21.9259 10.1864 23.8159 10.3107C23.8813 10.6079 23.89 10.9262 23.8302 11.2556C23.278 14.2898 22.1503 17.8157 21.399 19.9927C20.835 21.6266 19.3166 22.7088 17.5962 22.7771C14.3046 22.9079 8.1155 23.0786 4.62298 22.6828C2.53114 22.4459 0.768885 20.8262 0.512355 18.5909C-0.113224 13.14 0.0882754 8.98536 0.683385 3.59599C0.820861 2.35099 1.78915 1.30193 3.08393 1.20708Z\" fill=\"currentColor\"></path>"
  },
  "orientation-landscape": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24 11.7856C24 10.0377 23.8119 8.33576 23.5968 6.71328L23.5963 6.71012C23.4202 5.41874 22.7359 4.24474 21.6963 3.36717C20.659 2.49146 19.3215 1.95386 17.9079 1.81879L17.904 1.81843C16.0032 1.64575 14.0255 1.49805 12 1.49805C9.97442 1.49805 7.99853 1.64575 6.09614 1.81841L6.09211 1.81879C4.67839 1.95386 3.34104 2.49146 2.30367 3.36717C1.26413 4.24473 0.579835 5.41874 0.403659 6.71012L0.403221 6.71338C0.18804 8.33722 0 10.0377 0 11.7856C0 13.5336 0.188031 15.2355 0.403234 16.858L0.403659 16.8612C0.579833 18.1525 1.26413 19.3266 2.30367 20.2042C3.34104 21.0798 4.67839 21.6174 6.09211 21.7525L6.09614 21.7528C7.99857 21.9255 9.97622 22.0732 12 22.0732C14.0238 22.0732 16.0014 21.9255 17.9055 21.7528L17.9097 21.7525C19.3234 21.6174 20.6607 21.0798 21.6981 20.2042C22.7376 19.3266 23.4219 18.1525 23.5982 16.8612L23.5989 16.8561C23.8101 15.2345 24 13.5338 24 11.7856ZM16.6038 5.6785C15.7572 5.6785 15.0353 5.91792 14.5255 6.42777C14.0157 6.93761 13.7762 7.6595 13.7762 8.50606C13.7762 9.35263 14.0157 10.0745 14.5255 10.5844C15.0353 11.0942 15.7572 11.3336 16.6038 11.3336C17.4504 11.3336 18.1723 11.0942 18.6821 10.5844C19.1919 10.0745 19.4314 9.35263 19.4314 8.50606C19.4314 7.6595 19.1919 6.93761 18.6821 6.42777C18.1723 5.91792 17.4504 5.6785 16.6038 5.6785ZM3.72129 11.2891C3.17103 11.739 2.65193 12.2669 2.16629 12.8408C2.22043 14.0862 2.36169 15.3261 2.52701 16.5739C2.62512 17.2885 3.01147 17.9975 3.68578 18.5667C4.36305 19.1384 5.27894 19.5217 6.29289 19.6191C8.17615 19.79 10.074 19.9304 11.9998 19.9304C13.6082 19.9304 15.1983 19.8325 16.7747 19.7007C16.1417 18.1938 15.2311 16.3192 14.1038 14.6151C13.2787 13.3677 12.3145 12.1764 11.2291 11.2891C10.1445 10.4024 8.87938 9.77232 7.47521 9.77232C6.07104 9.77232 4.80593 10.4024 3.72129 11.2891Z\" fill=\"currentColor\"></path>"
  },
  "osx-browser-window": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M23.5985 17.0704C24.0442 13.6497 24.0505 10.3514 23.5964 6.92762L23.5961 6.92446C23.4199 5.63309 22.7355 4.45908 21.696 3.5815C20.6587 2.70579 19.3213 2.16819 17.9076 2.03314L17.9036 2.03276C13.9452 1.67315 10.0541 1.6735 6.09586 2.03276L6.09182 2.03314C4.67811 2.16819 3.34075 2.70579 2.3034 3.5815C1.26384 4.45908 0.579547 5.63309 0.403371 6.92446L0.402931 6.92772C-0.0504348 10.349 -0.050873 13.6509 0.402946 17.0723L0.403371 17.0755C0.579547 18.367 1.26384 19.5409 2.3034 20.4184C3.34075 21.2941 4.6781 21.8317 6.09182 21.9668L6.09586 21.9671C10.0549 22.3266 13.9463 22.3263 17.9053 21.9673L17.9095 21.9668C19.3231 21.8317 20.6605 21.2941 21.6979 20.4184C22.7374 19.5409 23.4217 18.367 23.5978 17.0755L23.5985 17.0704ZM10.8859 6.26779C10.8859 6.85952 10.4062 7.33922 9.81442 7.33922H9.04299C8.45126 7.33922 7.97157 6.85952 7.97157 6.26779C7.97157 5.67605 8.45126 5.19636 9.04299 5.19636H9.81442C10.4062 5.19636 10.8859 5.67605 10.8859 6.26779ZM5.95728 7.33922C6.54902 7.33922 7.02871 6.85952 7.02871 6.26779C7.02871 5.67605 6.54902 5.19636 5.95728 5.19636H5.18585C4.59411 5.19636 4.11442 5.67605 4.11442 6.26779C4.11442 6.85952 4.59411 7.33922 5.18585 7.33922H5.95728Z\" fill=\"currentColor\"></path>"
  },
  "padlock-circle-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.41347 1.8997C8.62983 0.683342 10.2796 0 11.9998 0C13.7199 0 15.3697 0.68334 16.586 1.8997C17.8025 3.11606 18.4858 4.76578 18.4858 6.48597V10.0274C19.6949 11.4643 20.2859 13.4102 20.2859 15.7141C20.2859 18.2491 19.5702 20.3506 18.1033 21.8175C16.6365 23.2845 14.535 24 12 24C9.46504 24 7.36355 23.2845 5.89664 21.8175C4.42974 20.3506 3.71411 18.2491 3.71411 15.7141C3.71411 13.4105 4.30508 11.4648 5.51379 10.0281V6.48597C5.51379 4.76578 6.19712 3.11606 7.41347 1.8997ZM15.9143 6.48597V8.14891C14.7794 7.66617 13.4618 7.42822 12 7.42822C10.538 7.42822 9.22024 7.66623 8.08521 8.14911V6.48597C8.08521 5.44776 8.49764 4.45209 9.23175 3.71798C9.96587 2.98385 10.9615 2.57143 11.9998 2.57143C13.038 2.57143 14.0336 2.98385 14.7677 3.71798C15.5019 4.45209 15.9143 5.44776 15.9143 6.48597ZM13.2858 14.8234C13.2858 14.1133 12.7102 13.5377 12.0001 13.5377C11.29 13.5377 10.7144 14.1133 10.7144 14.8234V16.6062C10.7144 17.3163 11.29 17.892 12.0001 17.892C12.7102 17.892 13.2858 17.3163 13.2858 16.6062V14.8234Z\" fill=\"currentColor\"></path>"
  },
  "padlock-circle-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.41347 1.8997C8.62983 0.683342 10.2796 0 11.9998 0C13.7199 0 15.3697 0.683342 16.586 1.8997C17.0881 2.4018 17.0881 3.21586 16.586 3.71798C16.0839 4.22007 15.2699 4.22007 14.7677 3.71798C14.0336 2.98385 13.038 2.57143 11.9998 2.57143C10.9615 2.57143 9.96587 2.98385 9.23175 3.71798C8.49764 4.45209 8.08521 5.44776 8.08521 6.48597V8.14911C9.22024 7.66623 10.538 7.42822 12 7.42822C14.535 7.42822 16.6365 8.14383 18.1033 9.61075C19.5702 11.0777 20.2859 13.1791 20.2859 15.7141C20.2859 18.2491 19.5702 20.3506 18.1033 21.8175C16.6365 23.2845 14.535 24 12 24C9.46504 24 7.36355 23.2845 5.89664 21.8175C4.42974 20.3506 3.71411 18.2491 3.71411 15.7141C3.71411 13.4105 4.30508 11.4648 5.51379 10.0281V6.48597C5.51379 4.76578 6.19712 3.11606 7.41347 1.8997ZM13.2858 14.8234C13.2858 14.1133 12.7102 13.5377 12.0001 13.5377C11.29 13.5377 10.7144 14.1133 10.7144 14.8234V16.6062C10.7144 17.3163 11.29 17.892 12.0001 17.892C12.7102 17.892 13.2858 17.3163 13.2858 16.6062V14.8234Z\" fill=\"currentColor\"></path>"
  },
  "padlock-shield": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.85703 0.428711C4.62307 0.428711 4.39927 0.524356 4.23756 0.693457C3.7694 1.18302 2.80289 2.19441 1.96322 3.95057C1.12429 5.70513 0.428467 8.16636 0.428467 11.5563C0.428467 15.6175 2.41759 18.4049 4.83447 20.2656C7.22582 22.1064 10.0591 23.0648 11.8908 23.5436C12.033 23.5808 12.1823 23.5808 12.3244 23.5436C14.1602 23.0638 16.9421 22.1038 19.281 20.2594C21.6464 18.3939 23.5713 15.607 23.5713 11.5563C23.5713 8.16636 22.8755 5.70513 22.0365 3.95057C21.1969 2.19441 20.2304 1.18302 19.7622 0.693457C19.6005 0.524356 19.3768 0.428711 19.1428 0.428711H4.85703ZM10.5461 5.14595C11.007 4.95501 11.5011 4.85673 12.0001 4.85673C12.4991 4.85673 12.9932 4.95501 13.4541 5.14595C13.9151 5.3369 14.334 5.61677 14.6868 5.96961C15.0396 6.32243 15.3195 6.74129 15.5105 7.20228C15.7014 7.66327 15.7997 8.15735 15.7997 8.65632V9.26947C16.5318 9.39448 17.1076 9.97564 17.2283 10.7114L17.2514 10.8521C17.3603 11.5114 17.4858 12.2725 17.4858 13.0587C17.4858 13.845 17.3603 14.6061 17.2514 15.2654L17.2283 15.4061C17.0988 16.1954 16.4455 16.8068 15.6374 16.8679C15.4522 16.8819 15.2637 16.8969 15.0724 16.912C14.1046 16.9886 13.0631 17.071 11.9998 17.071C10.9365 17.071 9.89509 16.9886 8.92736 16.912C8.73601 16.8969 8.5475 16.8819 8.36232 16.8679C7.55417 16.8068 6.90089 16.1954 6.77144 15.4061L6.74827 15.2654C6.63946 14.6061 6.51384 13.845 6.51384 13.0587C6.51384 12.2725 6.63946 11.5114 6.74827 10.8521L6.77144 10.7114C6.89213 9.97545 7.46816 9.3942 8.20051 9.26937V8.65632C8.20051 8.15735 8.29879 7.66327 8.48974 7.20228C8.68068 6.74129 8.96055 6.32243 9.31339 5.96961C9.6662 5.61677 10.0851 5.3369 10.5461 5.14595ZM10.3434 9.10231C10.8844 9.06941 11.439 9.04649 11.9998 9.04649C12.5608 9.04649 13.1157 9.06943 13.6568 9.10234V8.65632C13.6568 8.43875 13.614 8.22331 13.5307 8.02231C13.4475 7.82131 13.3254 7.63867 13.1716 7.48483C13.0178 7.33099 12.8351 7.20895 12.6341 7.12569C12.4331 7.04244 12.2177 6.99959 12.0001 6.99959C11.7825 6.99959 11.5671 7.04244 11.3661 7.12569C11.1651 7.20895 10.9824 7.33099 10.8286 7.48483C10.6748 7.63867 10.5527 7.82131 10.4695 8.02231C10.3862 8.22331 10.3434 8.43875 10.3434 8.65632V9.10231Z\" fill=\"currentColor\"></path>"
  },
  "pencil": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.6531 1.5787C15.8138 -0.665329 19.5957 -0.493875 22.0473 1.95926C24.4971 4.41086 24.6675 8.18995 22.4254 10.3499L13.0745 19.3579C12.8648 19.56 12.5188 19.4985 12.3831 19.2408C10.6637 15.9758 7.99637 13.3137 4.7838 11.5994C4.52781 11.4628 4.46751 11.1183 4.66877 10.9093L13.6531 1.5787ZM2.92101 13.1227C2.75887 13.0504 2.56932 13.0896 2.44618 13.2175L2.36448 13.3023L2.35329 13.3142C2.27105 13.4026 2.21085 13.5115 2.17863 13.6336L0.0552602 21.684C-0.286414 22.9793 1.01626 24.2844 2.31223 23.945L10.3627 21.8369C10.4987 21.8013 10.6183 21.731 10.7116 21.6341L10.7826 21.5657C10.9102 21.4428 10.9495 21.2537 10.8776 21.0917C9.29774 17.5317 6.44162 14.6931 2.92101 13.1227Z\" fill=\"currentColor\"></path>"
  },
  "pencil-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.4914 1.12933C24.2577 2.6899 24.5122 5.25516 23.053 6.7889L16.2489 13.9406C16.1586 14.0355 16.0448 14.1059 15.9165 14.1462L11.6926 15.4726C10.3587 15.8915 8.93523 14.6 9.22557 13.236L10.128 8.99609C10.1563 8.86332 10.2167 8.74236 10.3044 8.643L16.8919 1.17654C18.2595 -0.373554 20.7665 -0.394688 22.4914 1.12933ZM8.62891 7.16714L12.3925 2.90145C11.7961 2.86923 11.1936 2.85038 10.5865 2.85038C8.47911 2.85038 6.42864 3.07757 4.4934 3.30118C2.36643 3.54696 0.667083 5.24157 0.428947 7.37107C0.213567 9.29707 0 11.3329 0 13.4252C0 15.5175 0.213567 17.5533 0.428947 19.4793C0.667083 21.6087 2.36643 23.3035 4.4934 23.5491C6.42862 23.7729 8.47911 24 10.5865 24C12.6938 24 14.7442 23.7729 16.6795 23.5491C18.8064 23.3035 20.5058 21.6087 20.7439 19.4793C20.9594 17.5533 21.1728 15.5175 21.1728 13.4252C21.1728 12.9596 21.1623 12.4968 21.1435 12.0373L17.8697 15.4784C17.5113 15.8551 17.0679 16.1248 16.5877 16.2756L12.3637 17.6021C10.8071 18.0909 9.31269 17.5495 8.34897 16.6756C7.38543 15.8018 6.70118 14.3674 7.04081 12.7718L7.94328 8.5319C8.04936 8.03356 8.28072 7.56178 8.62891 7.16714Z\" fill=\"currentColor\"></path>"
  },
  "portfolio": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M12.7449 0.428711C15.4586 0.42886 17.7505 2.55283 17.7505 5.28362V5.29869C18.5836 5.36143 19.3945 5.4502 20.1611 5.58161C21.6397 5.8355 22.834 6.92616 23.1611 8.37737C23.5756 10.2168 23.5714 11.9313 23.5714 14.3656C23.5714 16.7995 23.5756 18.5129 23.1611 20.3523C22.8339 21.8033 21.6397 22.896 20.1611 23.1497C17.6711 23.5765 14.7243 23.5733 12.0016 23.5733C9.27864 23.5733 6.33067 23.5765 3.84033 23.1497C2.36174 22.8961 1.1678 21.8033 0.840333 20.3523C0.425883 18.5131 0.430176 16.7994 0.430178 14.3656C0.430178 11.9312 0.425885 10.2169 0.840333 8.37737C1.16749 6.92585 2.36139 5.83519 3.84033 5.58161C4.60721 5.45016 5.41745 5.36141 6.25104 5.29869V5.28362C6.25104 2.5528 8.54285 0.428805 11.2566 0.428711H12.7449ZM12.0016 17.1279C10.5724 17.1281 9.18742 17.623 8.08085 18.5275C7.31604 19.1527 6.69874 20.0069 6.29458 20.9365C8.0641 21.0898 10.0241 21.0939 11.9999 21.0939C13.9761 21.0939 15.9369 21.09 17.707 20.9365C17.3027 20.0072 16.687 19.1525 15.9224 18.5275C14.8156 17.6228 13.431 17.1279 12.0016 17.1279ZM11.9798 9.05371C9.99137 9.05371 8.8727 10.1724 8.8727 12.1609C8.87277 14.1492 9.99142 15.268 11.9798 15.268C13.9678 15.2677 15.0853 14.149 15.0853 12.1609C15.0853 10.1726 13.9678 9.054 11.9798 9.05371ZM11.2566 3.00014C9.90189 3.00023 8.88533 4.01052 8.82749 5.17816C9.89266 5.15484 10.9638 5.15639 12.0016 5.15639C13.0387 5.15639 14.1081 5.15486 15.1724 5.17816C15.1145 4.01059 14.0996 3.00028 12.7449 3.00014H11.2566Z\" fill=\"currentColor\"></path>"
  },
  "rectangle-flag": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.15194 0.304882C9.63906 -0.00795093 14.0965 -0.163807 18.679 0.264186C19.9148 0.379618 20.9027 1.34268 21.0663 2.56786C21.5499 6.19351 21.5499 9.52822 21.0663 13.1538C20.9027 14.379 19.9148 15.3421 18.679 15.4575C14.2736 15.869 9.62134 15.6316 5.21914 15.3167C5.29501 17.7563 5.42449 20.1948 5.59354 22.6228C5.64287 23.3311 5.10862 23.9453 4.40024 23.9947C3.69188 24.0441 3.07765 23.5097 3.02833 22.8014C2.83611 20.0409 2.69391 17.2591 2.62271 14.4708C2.61591 14.4304 2.61195 14.389 2.61102 14.3469C2.58435 13.1322 2.57067 11.8977 2.57158 10.6566C2.57039 9.11196 2.59388 7.56742 2.6456 6.02549C2.68126 4.91237 2.73034 3.80717 2.794 2.71947C2.86897 1.43862 3.87563 0.42847 5.12872 0.306817L5.15194 0.304882Z\" fill=\"currentColor\"></path>"
  },
  "refresh-location": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.5853 2.9977C10.7266 2.9977 9.93409 3.06615 9.20761 3.19663C8.50871 3.32215 7.84038 2.85732 7.71486 2.15842C7.58934 1.45953 8.05417 0.791208 8.75307 0.665688C9.6451 0.505483 10.5908 0.42627 11.5853 0.42627C15.0874 0.42627 18.0051 1.41374 20.0463 3.45195C22.0877 5.49045 23.077 8.40495 23.077 11.9034C23.077 14.0191 22.716 15.9219 21.9759 17.5488C22.4926 17.1833 23.2126 17.2466 23.6568 17.7219C24.1414 18.2409 24.1136 19.0545 23.5947 19.5393C22.375 20.6782 20.8822 21.1202 19.2387 20.8299C18.9649 20.7816 18.7143 20.6458 18.5242 20.4432C17.3828 19.2255 16.939 17.7336 17.2302 16.0906C17.3542 15.3914 18.0214 14.9251 18.7206 15.049C19.2918 15.1502 19.7076 15.6141 19.773 16.1618C20.2453 14.9917 20.5056 13.5767 20.5056 11.9034C20.5056 8.87928 19.6578 6.69811 18.2293 5.27153C16.8004 3.84468 14.6151 2.9977 11.5853 2.9977ZM0.346086 6.28977C0.798573 6.77424 1.53774 6.83062 2.05619 6.4416C1.313 8.07077 0.95048 9.97695 0.95048 12.097C0.95048 15.5954 1.93986 18.51 3.98127 20.5485C6.02242 22.5867 8.94013 23.5742 12.4422 23.5742C13.4869 23.5742 14.4779 23.4867 15.4094 23.3098C16.107 23.1773 16.5651 22.5043 16.4326 21.8067C16.3001 21.1092 15.6271 20.651 14.9295 20.7835C14.1734 20.9271 13.3444 21.0027 12.4422 21.0027C9.41245 21.0027 7.22715 20.1557 5.79824 18.7289C4.36961 17.3023 3.52191 15.1211 3.52191 12.097C3.52191 10.4559 3.77225 9.06324 4.22737 7.90651C4.31597 8.42655 4.72153 8.85922 5.27079 8.95659C5.96998 9.08052 6.63723 8.6142 6.76117 7.91501C7.05183 6.2753 6.60882 4.78634 5.46978 3.5712C5.27972 3.36843 5.02906 3.2327 4.75535 3.18437C3.11518 2.89469 1.6252 3.33585 0.408136 4.47254C-0.110808 4.95722 -0.13859 5.77082 0.346086 6.28977ZM11.9506 6.06069C9.17816 6.06069 6.87709 8.20325 6.67957 10.9687C6.58933 12.2318 6.86811 13.5958 7.71533 14.7083C8.61203 15.8858 9.53022 16.6927 10.9049 17.6079C11.5689 18.0501 12.4343 18.0501 13.0983 17.6079C14.473 16.6927 15.3912 15.8858 16.2879 14.7083C17.1351 13.5958 17.4138 12.2318 17.3237 10.9687C17.1261 8.20325 14.8251 6.06069 12.0526 6.06069H11.9506ZM12.0017 9.73702C11.6306 9.73702 11.2275 9.84387 10.918 10.1534C10.6085 10.4629 10.5017 10.8659 10.5017 11.237C10.5017 11.6081 10.6085 12.0112 10.918 12.3207C11.2275 12.6302 11.6306 12.737 12.0017 12.737C12.3728 12.737 12.7758 12.6302 13.0853 12.3207C13.3948 12.0112 13.5017 11.6081 13.5017 11.237C13.5017 10.8659 13.3948 10.4629 13.0853 10.1534C12.7758 9.84387 12.3728 9.73702 12.0017 9.73702Z\" fill=\"currentColor\"></path>"
  },
  "remove-alert-clock": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.15023 0.151222C4.77694 -0.18263 5.55562 0.0547723 5.88948 0.681475C6.22334 1.30818 5.98593 2.08687 5.35922 2.42071C4.18155 3.04807 3.13068 3.88877 2.26011 4.90001C1.79683 5.43814 0.98503 5.49881 0.446897 5.03554C-0.0912366 4.57226 -0.151919 3.76046 0.31136 3.22233C1.38974 1.9697 2.69145 0.928334 4.15023 0.151222ZM14.7206 0.681639C14.3867 1.30834 14.6241 2.08702 15.2508 2.42088C16.4285 3.04824 17.4794 3.88893 18.3499 4.90017C18.8133 5.4383 19.625 5.49898 20.1631 5.0357C20.7014 4.57243 20.7621 3.76063 20.2987 3.2225C19.2204 1.96987 17.9186 0.928498 16.4598 0.151386C15.8331 -0.182465 15.0544 0.0549365 14.7206 0.681639ZM10.3297 2.90122C13.0405 2.90122 15.2792 3.66627 16.8395 5.22657C18.3998 6.78686 19.1649 9.02565 19.1649 11.7364C19.1649 12.6058 19.0862 13.4267 18.9278 14.1923L17.9301 13.1945C16.6225 11.887 14.5025 11.887 13.1949 13.1945C11.8873 14.5021 11.8873 16.6221 13.1949 17.9297L14.4435 19.1784L13.4485 20.1734C12.5002 20.4396 11.4557 20.5716 10.3297 20.5716C7.61897 20.5716 5.38018 19.8065 3.81989 18.2462C2.2596 16.6859 1.49456 14.4471 1.49456 11.7364C1.49456 9.02565 2.2596 6.78686 3.81989 5.22657C5.38018 3.66627 7.61897 2.90122 10.3297 2.90122ZM9.21355 7.53223C9.21355 6.94049 9.69326 6.4608 10.285 6.4608C10.8767 6.4608 11.3564 6.94049 11.3564 7.53223V11.7224C11.3564 12.0066 11.2435 12.2791 11.0426 12.48L8.52849 14.9941C8.11008 15.4125 7.43169 15.4125 7.01326 14.9941C6.59484 14.5757 6.59484 13.8973 7.01326 13.4789L9.21355 11.2786V7.53223ZM14.7098 14.7098C15.1805 14.239 15.9437 14.239 16.4145 14.7098L19.1784 17.4737L21.942 14.71C22.4127 14.2393 23.1759 14.2393 23.6467 14.71C24.1174 15.1808 24.1174 15.944 23.6467 16.4147L20.8831 19.1784L23.6467 21.942C24.1174 22.4127 24.1174 23.1759 23.6467 23.6467C23.1759 24.1174 22.4127 24.1174 21.942 23.6467L19.1784 20.8831L16.4145 23.647C15.9438 24.1178 15.1805 24.1178 14.7098 23.647C14.2391 23.1763 14.2391 22.4129 14.7098 21.9422L17.4737 19.1784L14.7098 16.4145C14.239 15.9437 14.239 15.1805 14.7098 14.7098Z\" fill=\"currentColor\"></path>"
  },
  "sad-face": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 3.1482C5.2465 1.04988 8.27652 0 12 0C15.7235 0 18.7534 1.04988 20.8519 3.1482C22.9502 5.2465 24 8.27652 24 12C24 15.7235 22.9502 18.7534 20.8519 20.8519C18.7534 22.9502 15.7235 24 12 24C8.27652 24 5.2465 22.9502 3.1482 20.8519C1.04988 18.7534 0 15.7235 0 12C0 8.27652 1.04988 5.2465 3.1482 3.1482ZM8.70326 8.74407C8.70326 8.15234 8.22357 7.67265 7.63183 7.67265C7.04011 7.67265 6.5604 8.15234 6.5604 8.74407V9.94407C6.5604 10.5358 7.04011 11.0155 7.63183 11.0155C8.22357 11.0155 8.70326 10.5358 8.70326 9.94407V8.74407ZM16.3682 7.67265C16.9599 7.67265 17.4396 8.15234 17.4396 8.74407V9.94407C17.4396 10.5358 16.9599 11.0155 16.3682 11.0155C15.7764 11.0155 15.2967 10.5358 15.2967 9.94407V8.74407C15.2967 8.15234 15.7764 7.67265 16.3682 7.67265ZM7.64088 17.4941C7.42651 18.0458 6.80563 18.319 6.25407 18.1047C5.70254 17.8903 5.42921 17.2694 5.64358 16.7179C6.12453 15.4805 6.93857 14.4961 8.05464 13.8326C9.15891 13.1762 10.4999 12.8678 12.0001 12.8678C13.5002 12.8678 14.8412 13.1762 15.9454 13.8326C17.0615 14.4961 17.8755 15.4805 18.3566 16.7179C18.5709 17.2694 18.2976 17.8903 17.7459 18.1047C17.1945 18.319 16.5736 18.0458 16.3592 17.4941C16.0431 16.6808 15.5354 16.0818 14.8504 15.6746C14.1537 15.2603 13.2143 15.0107 12.0001 15.0107C10.7858 15.0107 9.84643 15.2603 9.14966 15.6746C8.46468 16.0818 7.95701 16.6808 7.64088 17.4941Z\" fill=\"currentColor\"></path>"
  },
  "scan-document-focus": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.7595 0.435736C7.46549 0.359637 8.0995 0.870264 8.1756 1.57626C8.2517 2.28225 7.74106 2.91626 7.03509 2.99236C6.45183 3.05522 5.87294 3.12238 5.29341 3.18962L5.20354 3.20004C4.15051 3.32218 3.30871 4.1664 3.19112 5.21443C3.12317 5.82012 3.05542 6.42581 2.99247 7.03588C2.9196 7.7422 2.28792 8.25571 1.58159 8.18284C0.875255 8.10995 0.361744 7.47828 0.434626 6.77194C0.498911 6.14892 0.567891 5.53241 0.635727 4.92775C0.887368 2.68471 2.67065 0.905177 4.90726 0.645744L5.00004 0.63498C5.57712 0.568027 6.16553 0.499761 6.7595 0.435736ZM15.8239 1.57626C15.9 0.870264 16.534 0.359637 17.2399 0.435736C17.8339 0.499757 18.4222 0.568022 18.9994 0.634972L19.0922 0.645744C21.3288 0.905177 23.1122 2.68471 23.3637 4.92775C23.4315 5.53241 23.5006 6.14892 23.5649 6.77194C23.6378 7.47828 23.1242 8.10995 22.4179 8.18284C21.7116 8.25571 21.0799 7.7422 21.007 7.03588C20.9441 6.42581 20.8762 5.82012 20.8083 5.21443C20.6907 4.1664 19.849 3.32218 18.7959 3.20004L18.7061 3.18962C18.1265 3.12238 17.5476 3.05522 16.9644 2.99236C16.2584 2.91626 15.7478 2.28225 15.8239 1.57626ZM15.8239 22.424C15.9 23.1299 16.534 23.6406 17.2399 23.5645C17.8339 23.5004 18.4222 23.4321 18.9994 23.3651L19.0922 23.3545C21.3288 23.0949 23.1122 21.3155 23.3637 19.0724C23.4315 18.4677 23.5006 17.8513 23.5649 17.2281C23.6378 16.5219 23.1242 15.8902 22.4179 15.8173C21.7116 15.7444 21.0799 16.2579 21.007 16.9643C20.9441 17.5744 20.8762 18.1801 20.8083 18.7857C20.6907 19.8337 19.849 20.678 18.7959 20.8002L18.7061 20.8105C18.1265 20.8778 17.5476 20.9449 16.9644 21.0078C16.2584 21.0839 15.7478 21.7178 15.8239 22.424ZM8.1756 22.424C8.0995 23.1299 7.46549 23.6406 6.7595 23.5645C6.16558 23.5004 5.57721 23.4321 5.00014 23.3651L4.90726 23.3545C2.67065 23.0949 0.887368 21.3155 0.635727 19.0724C0.567891 18.4677 0.498911 17.8513 0.434626 17.2281C0.361744 16.5219 0.875255 15.8902 1.58159 15.8173C2.28792 15.7444 2.9196 16.2579 2.99247 16.9643C3.05542 17.5744 3.12317 18.1801 3.19112 18.7857C3.30871 19.8337 4.15051 20.678 5.20354 20.8002L5.29341 20.8105C5.87294 20.8778 6.45183 20.9449 7.03509 21.0078C7.74106 21.0839 8.2517 21.7178 8.1756 22.424ZM8.74647 4.29526C9.75866 4.24156 10.7921 4.2138 12.0003 4.2138C12.3958 4.2138 12.7727 4.21677 13.1365 4.22266C14.0001 4.23665 14.8558 4.52027 15.5507 5.07492C16.7057 5.99681 17.4939 6.83225 18.3895 8.02214C18.905 8.70689 19.175 9.53359 19.1923 10.3728C19.2036 10.9105 19.2093 11.4532 19.2093 12.0002C19.2093 13.3035 19.177 14.5821 19.1148 15.8278C19.0106 17.9188 17.3477 19.594 15.2541 19.7051C14.2419 19.7589 13.2084 19.7867 12.0003 19.7867C10.7921 19.7867 9.75866 19.7589 8.74647 19.7051C6.65275 19.594 4.98998 17.9188 4.8857 15.8278C4.82359 14.5821 4.79129 13.3035 4.79129 12.0002C4.79129 10.697 4.82359 9.41836 4.8857 8.17265C4.98998 6.08158 6.65275 4.40637 8.74647 4.29526ZM9.33525 8.13717C8.74351 8.13717 8.26382 8.61688 8.26382 9.2086C8.26382 9.80033 8.74351 10.28 9.33525 10.28H11.4673C12.0591 10.28 12.5387 9.80033 12.5387 9.2086C12.5387 8.61688 12.0591 8.13717 11.4673 8.13717H9.33525ZM8.26382 13.4475C8.26382 12.8558 8.74351 12.3761 9.33525 12.3761H14.6655C15.2572 12.3761 15.7369 12.8558 15.7369 13.4475C15.7369 14.0393 15.2572 14.519 14.6655 14.519H9.33525C8.74351 14.519 8.26382 14.0393 8.26382 13.4475Z\" fill=\"currentColor\"></path>"
  },
  "search-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.9999 11.4058C2.9999 8.54122 3.80158 6.48482 5.14308 5.14332C6.48458 3.80183 8.54098 3.00014 11.4056 3.00014C14.2701 3.00014 16.3265 3.80183 17.668 5.14332C19.0096 6.48482 19.8112 8.54122 19.8112 11.4058C19.8112 14.2704 19.0096 16.3268 17.668 17.6683C16.3265 19.0099 14.2701 19.8115 11.4056 19.8115C8.54098 19.8115 6.48458 19.0099 5.14308 17.6683C3.80158 16.3268 2.9999 14.2704 2.9999 11.4058ZM11.4056 0.428711C8.06765 0.428711 5.27837 1.37147 3.3248 3.32505C1.37123 5.27861 0.428467 8.06789 0.428467 11.4058C0.428467 14.7437 1.37123 17.533 3.3248 19.4866C5.27837 21.4402 8.06765 22.3829 11.4056 22.3829C14.0459 22.3829 16.343 21.793 18.1547 20.5795L20.6449 23.0695C21.3143 23.7391 22.3998 23.7391 23.0692 23.0695C23.7386 22.4 23.7386 21.3145 23.0692 20.6451L20.579 18.1551C21.7928 16.3434 22.3826 14.0463 22.3826 11.4058C22.3826 8.06789 21.44 5.27861 19.4864 3.32505C17.5328 1.37147 14.7435 0.428711 11.4056 0.428711ZM15.9486 8.62987C16.4746 8.15278 16.5142 7.33968 16.0371 6.81376C15.56 6.28781 14.7469 6.24823 14.221 6.72532C12.9767 7.85405 12.0279 8.88127 11.2246 10.1351C10.7259 10.9134 10.2969 11.7579 9.88687 12.7368L8.60161 11.4114C8.1073 10.9017 7.29332 10.8891 6.78356 11.3835C6.27379 11.8778 6.26127 12.6918 6.75559 13.2015L9.44875 15.9788C9.75929 16.2991 10.2136 16.4355 10.6492 16.3392C11.0848 16.2429 11.4394 15.9278 11.586 15.5065C12.2041 13.7309 12.7458 12.5273 13.3898 11.5222C14.0286 10.5252 14.8026 9.66947 15.9486 8.62987Z\" fill=\"currentColor\"></path>"
  },
  "search-off-disable": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.9999 11.4058C2.9999 8.54122 3.80158 6.48482 5.14308 5.14332C6.48458 3.80183 8.54098 3.00014 11.4056 3.00014C14.2701 3.00014 16.3265 3.80183 17.668 5.14332C19.0096 6.48482 19.8112 8.54122 19.8112 11.4058C19.8112 14.2704 19.0096 16.3268 17.668 17.6683C16.3265 19.0099 14.2701 19.8115 11.4056 19.8115C8.54098 19.8115 6.48458 19.0099 5.14308 17.6683C3.80158 16.3268 2.9999 14.2704 2.9999 11.4058ZM11.4056 0.428711C8.06765 0.428711 5.27837 1.37147 3.3248 3.32505C1.37123 5.27861 0.428467 8.06789 0.428467 11.4058C0.428467 14.7437 1.37123 17.533 3.3248 19.4866C5.27837 21.4402 8.06765 22.3829 11.4056 22.3829C14.0459 22.3829 16.343 21.793 18.1547 20.5795L20.6449 23.0695C21.3143 23.7391 22.3998 23.7391 23.0692 23.0695C23.7386 22.4 23.7386 21.3145 23.0692 20.6451L20.579 18.1551C21.7928 16.3434 22.3826 14.0463 22.3826 11.4058C22.3826 8.06789 21.44 5.27861 19.4864 3.32505C17.5328 1.37147 14.7435 0.428711 11.4056 0.428711ZM8.58785 6.76847C8.08575 6.26635 7.27167 6.26635 6.76958 6.76847C6.26748 7.27056 6.26748 8.08463 6.76958 8.58674L9.56355 11.3807L6.76959 14.1747C6.2675 14.6768 6.2675 15.4908 6.76959 15.9929C7.27171 16.495 8.08577 16.495 8.58787 15.9929L11.3818 13.199L14.1755 15.9927C14.6776 16.4948 15.4917 16.4948 15.9938 15.9927C16.4959 15.4906 16.4959 14.6765 15.9938 14.1744L13.2001 11.3807L15.9938 8.587C16.4959 8.08488 16.4959 7.27082 15.9938 6.76871C15.4917 6.26661 14.6776 6.26661 14.1755 6.76871L11.3818 9.56242L8.58785 6.76847Z\" fill=\"currentColor\"></path>"
  },
  "search-visual": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.012 1.59161C16.0793 0.884734 16.7069 0.36628 17.4138 0.433617C18.0591 0.49509 18.6951 0.564472 19.3186 0.6382C21.4494 0.890226 23.1239 2.57662 23.3713 4.70328C23.4404 5.29764 23.506 5.90468 23.5648 6.52093C23.6324 7.2278 23.1142 7.85552 22.4072 7.923C21.7004 7.99049 21.0726 7.47216 21.0051 6.76529C20.9483 6.17022 20.8846 5.58114 20.817 5.00036C20.7068 4.05197 19.9599 3.30342 19.0165 3.19182C18.4086 3.11994 17.7923 3.05274 17.1699 2.99346C16.4631 2.92613 15.9446 2.29849 16.012 1.59161ZM7.98907 1.59161C8.05639 2.29849 7.53794 2.92613 6.83107 2.99346C6.20863 3.05274 5.59238 3.11994 4.98456 3.19182C4.04107 3.30342 3.29429 4.05197 3.18399 5.00036C3.11643 5.58114 3.05268 6.17022 2.99587 6.76529C2.92839 7.47216 2.30067 7.99049 1.5938 7.923C0.886932 7.85552 0.368604 7.2278 0.436084 6.52093C0.494909 5.90468 0.560645 5.29764 0.629776 4.70328C0.877133 2.57662 2.55164 0.890226 4.68252 0.6382C5.3059 0.564472 5.94188 0.49509 6.58721 0.433617C7.2941 0.36628 7.92173 0.884734 7.98907 1.59161ZM6.83107 21.0063C7.53794 21.0737 8.05639 21.7013 7.98907 22.4081C7.92173 23.115 7.2941 23.6334 6.58721 23.5661C5.94188 23.5047 5.3059 23.4353 4.68252 23.3616C2.55164 23.1096 0.877133 21.423 0.629776 19.2965C0.560645 18.7021 0.494909 18.0951 0.436084 17.4788C0.368604 16.7719 0.886932 16.1442 1.5938 16.0767C2.30067 16.0092 2.92839 16.5276 2.99587 17.2344C3.05268 17.8296 3.11643 18.4186 3.18399 18.9994C3.29429 19.9477 4.04107 20.6964 4.98456 20.808C5.59238 20.8798 6.20863 20.947 6.83107 21.0063ZM16.012 22.4081C16.0793 23.115 16.7069 23.6334 17.4138 23.5661C18.0591 23.5047 18.6951 23.4353 19.3186 23.3616C21.4494 23.1096 23.1239 21.423 23.3713 19.2965C23.4404 18.7021 23.506 18.0951 23.5648 17.4788C23.6324 16.7719 23.1142 16.1442 22.4072 16.0767C21.7004 16.0092 21.0726 16.5276 21.0051 17.2344C20.9483 17.8296 20.8846 18.4186 20.817 18.9994C20.7068 19.9477 19.9599 20.6964 19.0165 20.808C18.4086 20.8798 17.7923 20.947 17.1699 21.0063C16.4631 21.0737 15.9446 21.7013 16.012 22.4081ZM9.34692 9.20616C8.92316 9.62991 8.60736 10.3367 8.60736 11.4738C8.60736 12.6108 8.92316 13.3176 9.34692 13.7414C9.77067 14.1651 10.4775 14.4809 11.6145 14.4809C12.7516 14.4809 13.4584 14.1651 13.8821 13.7414C14.3059 13.3176 14.6217 12.6108 14.6217 11.4738C14.6217 10.3367 14.3059 9.62991 13.8821 9.20616C13.4584 8.7824 12.7516 8.46658 11.6145 8.46658C10.4775 8.46658 9.77067 8.7824 9.34692 9.20616ZM7.52864 7.38788C8.56448 6.35206 10.0041 5.89515 11.6145 5.89515C13.2249 5.89515 14.6646 6.35206 15.7004 7.38788C16.7362 8.42372 17.1932 9.86338 17.1932 11.4738C17.1932 12.6002 16.9696 13.643 16.4808 14.5226L17.7484 15.7904C18.2506 16.2925 18.2506 17.1066 17.7484 17.6088C17.2463 18.1107 16.4323 18.1107 15.9302 17.6086L14.6623 16.3406C13.7829 16.829 12.7405 17.0524 11.6145 17.0524C10.0041 17.0524 8.56448 16.5955 7.52864 15.5596C6.49282 14.5238 6.03593 13.0841 6.03593 11.4738C6.03593 9.86338 6.49282 8.42372 7.52864 7.38788Z\" fill=\"currentColor\"></path>"
  },
  "select-square-area-2": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.3193 3.00692C11.5462 3.00183 11.7733 2.99916 12.0005 2.99916C12.2276 2.99916 12.4547 3.00183 12.6817 3.00692C13.3916 3.02281 13.9799 2.46022 13.9958 1.75032C14.0117 1.04041 13.4491 0.452036 12.7392 0.436136C12.4941 0.430647 12.2478 0.427734 12.0005 0.427734C11.7531 0.427734 11.5068 0.430647 11.2617 0.436136C10.5518 0.452036 9.98919 1.04041 10.0051 1.75032C10.021 2.46022 10.6094 3.02281 11.3193 3.00692ZM7.59831 3.26276C8.30465 3.18987 8.81816 2.55819 8.74527 1.85185C8.67238 1.14553 8.0407 0.632022 7.33438 0.704909C7.09476 0.729636 6.85642 0.755228 6.61956 0.781325C6.212 0.826229 5.81491 0.908744 5.43214 1.02521C4.7528 1.23189 4.36964 1.95015 4.57634 2.62949C4.78303 3.30882 5.50128 3.69198 6.18062 3.48529C6.41307 3.41456 6.65393 3.36452 6.90118 3.33728C7.13335 3.3117 7.36567 3.28676 7.59831 3.26276ZM16.6665 0.704909C15.9602 0.632022 15.3285 1.14553 15.2556 1.85185C15.1828 2.55819 15.6963 3.18987 16.4026 3.26276C16.6352 3.28676 16.8676 3.3117 17.0997 3.33728C17.3469 3.36452 17.5878 3.41456 17.8202 3.48529C18.4996 3.69198 19.2179 3.30882 19.4246 2.62949C19.6312 1.95015 19.2481 1.23189 18.5689 1.02521C18.1861 0.908744 17.7889 0.82623 17.3814 0.781325C17.1445 0.755228 16.9062 0.729636 16.6665 0.704909ZM3.46495 6.20604C3.66932 5.526 3.28375 4.80905 2.60371 4.60465C1.92368 4.40028 1.20672 4.78587 1.00234 5.46589C0.887067 5.84943 0.806011 6.24728 0.762869 6.65562C0.737979 6.89122 0.713621 7.12822 0.690127 7.36647C0.620439 8.07313 1.1368 8.70248 1.84346 8.77217C2.5501 8.84185 3.17945 8.32549 3.24914 7.61883C3.27195 7.38752 3.2957 7.15654 3.32007 6.9258C3.34616 6.67878 3.39516 6.43822 3.46495 6.20604ZM22.9986 5.46589C22.7942 4.78587 22.0772 4.40028 21.3973 4.60465C20.7172 4.80905 20.3317 5.526 20.536 6.20604C20.6058 6.43822 20.6548 6.67878 20.6809 6.9258C20.7052 7.15654 20.729 7.38752 20.7518 7.61883C20.8214 8.32549 21.4508 8.84185 22.1574 8.77217C22.8642 8.70248 23.3805 8.07313 23.3108 7.36647C23.2873 7.12822 23.2629 6.89122 23.2381 6.65562C23.1949 6.24728 23.1138 5.84943 22.9986 5.46589ZM3.0072 11.3213C3.02222 10.6114 2.45888 10.0237 1.74896 10.0087C1.03904 9.99366 0.451359 10.557 0.436337 11.2669C0.431193 11.5101 0.428467 11.7544 0.428467 11.9997C0.428467 12.245 0.431192 12.4893 0.436339 12.7325C0.451359 13.4424 1.03904 14.0058 1.74896 13.9908C2.45888 13.9757 3.02222 13.3881 3.0072 12.6781C3.00242 12.4521 2.9999 12.226 2.9999 11.9997C2.9999 11.7735 3.00242 11.5473 3.0072 11.3213ZM23.5646 11.2669C23.5496 10.557 22.9619 9.99366 22.252 10.0087C21.542 10.0237 20.9786 10.6114 20.9937 11.3213C20.9985 11.5473 21.0011 11.7735 21.0011 11.9997C21.0011 12.226 20.9985 12.4521 20.9937 12.6781C20.9786 13.3881 21.542 13.9757 22.252 13.9908C22.9619 14.0058 23.5496 13.4424 23.5646 12.7325C23.5698 12.4893 23.5725 12.245 23.5725 11.9997C23.5725 11.7544 23.5698 11.5101 23.5646 11.2669ZM3.24914 16.3806C3.17945 15.674 2.5501 15.1576 1.84346 15.2273C1.1368 15.297 0.620441 15.9263 0.690127 16.633C0.713623 16.8712 0.737979 17.1082 0.762871 17.3439C0.806011 17.7522 0.887067 18.15 1.00234 18.5336C1.20672 19.2135 1.92368 19.5992 2.60371 19.3949C3.28375 19.1904 3.66934 18.4734 3.46495 17.7934C3.39516 17.5613 3.34616 17.3206 3.32007 17.0737C3.2957 16.8429 3.27195 16.6119 3.24914 16.3806ZM23.3108 16.633C23.3805 15.9263 22.8642 15.297 22.1574 15.2273C21.4508 15.1576 20.8214 15.674 20.7518 16.3806C20.729 16.6119 20.7052 16.8429 20.6809 17.0737C20.6548 17.3206 20.6058 17.5613 20.536 17.7934C20.3317 18.4734 20.7172 19.1904 21.3973 19.3949C22.0772 19.5992 22.7942 19.2135 22.9986 18.5336C23.1138 18.15 23.1949 17.7522 23.2381 17.3439C23.2629 17.1082 23.2873 16.8712 23.3108 16.633ZM6.18062 20.5141C5.5013 20.3074 4.78303 20.6907 4.57634 21.3699C4.36964 22.0493 4.7528 22.7676 5.43214 22.9743C5.81491 23.0907 6.212 23.1732 6.61956 23.2181C6.85642 23.2443 7.09476 23.2698 7.33438 23.2945C8.0407 23.3674 8.67238 22.854 8.74527 22.1477C8.81816 21.4412 8.30465 20.8095 7.59831 20.7366C7.36567 20.7126 7.13335 20.6878 6.90118 20.6622C6.65393 20.635 6.41307 20.5849 6.18062 20.5141ZM18.5689 22.9743C19.2481 22.7676 19.6312 22.0493 19.4246 21.3699C19.2179 20.6907 18.4996 20.3074 17.8202 20.5141C17.5878 20.5849 17.3469 20.635 17.0997 20.6622C16.8676 20.6878 16.6352 20.7126 16.4026 20.7366C15.6963 20.8095 15.1828 21.4412 15.2556 22.1477C15.3285 22.854 15.9602 23.3674 16.6665 23.2945C16.9062 23.2698 17.1445 23.2443 17.3814 23.2181C17.7889 23.1732 18.1861 23.0907 18.5689 22.9743ZM11.3193 20.9926C10.6094 20.9766 10.021 21.5393 10.0051 22.2492C9.98919 22.959 10.5518 23.5474 11.2617 23.5633C11.5068 23.5688 11.7531 23.5717 12.0005 23.5717C12.2478 23.5717 12.4941 23.5688 12.7392 23.5633C13.4491 23.5474 14.0117 22.959 13.9958 22.2492C13.9799 21.5393 13.3916 20.9766 12.6817 20.9926C12.4547 20.9976 12.2276 21.0003 12.0005 21.0003C11.7733 21.0003 11.5462 20.9976 11.3193 20.9926Z\" fill=\"currentColor\"></path>"
  },
  "settings-alert-help": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.7012 0C13.2184 0.000656145 13.7249 0.1563 14.1526 0.447204C14.5798 0.737779 14.9099 1.15003 15.0991 1.63084L15.0999 1.63268L15.7463 3.25954L17.7329 4.40313L19.4753 4.1389C19.9875 4.06205 20.5125 4.14036 20.9796 4.36426C21.4464 4.58811 21.8354 4.94712 22.0949 5.39515L22.7957 6.60122C23.0561 7.04918 23.1747 7.56528 23.1357 8.08195C23.0966 8.59846 22.9018 9.0907 22.5775 9.4945L21.4774 10.8651V13.1349L22.5771 14.5051C22.9015 14.9089 23.0966 15.4015 23.1357 15.9181C23.1747 16.4347 23.0561 16.9508 22.7957 17.3988L22.0953 18.6043C21.8357 19.0524 21.4464 19.4119 20.9796 19.6358C20.5125 19.8597 19.9887 19.9382 19.4767 19.8612L17.7279 19.5969L15.7468 20.7339L15.103 22.3673C14.9139 22.8487 14.5834 23.262 14.1558 23.5527C13.7281 23.8437 13.2227 23.9993 12.7055 24H11.9931H11.2914C10.7742 23.9993 10.2688 23.8437 9.8411 23.5527C9.41357 23.262 9.08302 22.8487 8.89387 22.3673L8.25007 20.7339L6.26906 19.5969L4.52026 19.8612C4.0081 19.9382 3.48441 19.8597 3.0174 19.6358C2.55048 19.4119 2.16125 19.0524 1.90164 18.6043L1.20114 17.3988C0.940828 16.9508 0.822223 16.4347 0.861297 15.9181C0.90036 15.4015 1.09541 14.9089 1.41973 14.5051L2.51942 13.1349V10.8651L1.41944 9.4945C1.09512 9.0907 0.90036 8.59846 0.861297 8.08195C0.822223 7.56528 0.940834 7.04918 1.20115 6.60122L1.90198 5.39515C2.16159 4.94712 2.55053 4.58811 3.0174 4.36428C3.48441 4.14036 4.00941 4.06205 4.52157 4.13892L6.26403 4.40313L8.25057 3.25954L8.89707 1.63268L8.89779 1.63084C9.08702 1.15003 9.4171 0.737779 9.8443 0.447204C10.272 0.156301 10.7785 0.000656503 11.2957 0H12.7012ZM10.7877 9.1535C10.5405 9.49827 10.4352 9.94433 10.4241 10.2258C10.4007 10.8171 9.90242 11.2774 9.31114 11.254C8.71987 11.2306 8.25951 10.7324 8.28291 10.1411C8.30669 9.54036 8.5027 8.66311 9.04598 7.90514C9.62506 7.09723 10.5776 6.46539 11.9475 6.46539C13.5794 6.46539 14.5928 7.21786 15.1416 8.1361C15.6414 8.9723 15.703 9.85246 15.7165 10.1314C15.7174 10.1488 15.7178 10.1661 15.7178 10.1834C15.7178 11.6286 14.5993 12.4065 14.01 12.8163L13.9211 12.8783C13.563 13.1301 13.3567 13.2833 13.2248 13.4377C13.1322 13.5462 13.1231 13.5983 13.1292 13.6767C13.1313 13.7044 13.1324 13.7322 13.1324 13.7599V14.1656C13.1324 14.7573 12.6527 15.237 12.061 15.237C11.4693 15.237 10.9896 14.7573 10.9896 14.1656V13.7962C10.9455 13.0606 11.2231 12.482 11.5952 12.0463C11.9217 11.6639 12.3467 11.3654 12.6496 11.1528L12.6886 11.1254C13.4326 10.6023 13.5667 10.4262 13.5746 10.2055C13.5623 10.0051 13.5128 9.58769 13.3022 9.23547C13.1296 8.94665 12.8049 8.60825 11.9475 8.60825C11.3259 8.60825 10.999 8.85864 10.7877 9.1535ZM11.9459 18.4118C11.3541 18.4118 10.8744 17.9321 10.8744 17.3403V17.3266C10.8744 16.7348 11.3541 16.2551 11.9459 16.2551C12.5376 16.2551 13.0173 16.7348 13.0173 17.3266V17.3403C13.0173 17.9321 12.5376 18.4118 11.9459 18.4118Z\" fill=\"currentColor\"></path>"
  },
  "settings-alert-update": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.7012 0C13.2184 0.000656145 13.7249 0.1563 14.1526 0.447204C14.5798 0.737779 14.9099 1.15003 15.0991 1.63084L15.0999 1.63268L15.7463 3.25954L17.7329 4.40313L19.4753 4.1389C19.9875 4.06205 20.5125 4.14036 20.9796 4.36426C21.4464 4.58811 21.8354 4.94712 22.0949 5.39515L22.7957 6.60122C23.0561 7.04918 23.1747 7.56528 23.1357 8.08195C23.0966 8.59846 22.9018 9.0907 22.5775 9.4945L21.4774 10.8651V13.1349L22.5771 14.5051C22.9015 14.9089 23.0966 15.4015 23.1357 15.9181C23.1747 16.4347 23.0561 16.9508 22.7957 17.3988L22.0953 18.6043C21.8357 19.0524 21.4464 19.4119 20.9796 19.6358C20.5125 19.8597 19.9887 19.9382 19.4767 19.8612L17.7279 19.5969L15.7468 20.7339L15.103 22.3673C14.9139 22.8487 14.5834 23.262 14.1558 23.5527C13.7281 23.8437 13.2227 23.9993 12.7055 24H11.9931H11.2914C10.7742 23.9993 10.2688 23.8437 9.8411 23.5527C9.41357 23.262 9.08302 22.8487 8.89387 22.3673L8.25007 20.7339L6.26906 19.5969L4.52026 19.8612C4.0081 19.9382 3.48441 19.8597 3.0174 19.6358C2.55048 19.4119 2.16125 19.0524 1.90164 18.6043L1.20114 17.3988C0.940828 16.9508 0.822222 16.4347 0.861297 15.9181C0.900361 15.4015 1.09541 14.9089 1.41973 14.5051L2.51942 13.1349V10.8651L1.41944 9.4945C1.09512 9.0907 0.900361 8.59846 0.861297 8.08195C0.822222 7.56528 0.940835 7.04918 1.20115 6.60122L1.90198 5.39515C2.16159 4.94712 2.55053 4.58811 3.0174 4.36428C3.48441 4.14036 4.00941 4.06205 4.52157 4.13892L6.26403 4.40313L8.25057 3.25954L8.89708 1.63268L8.8978 1.63084C9.08702 1.15003 9.4171 0.737779 9.8443 0.447204C10.272 0.156301 10.7785 0.000656503 11.2957 0H12.7012ZM12.0019 6.24777C12.5937 6.24777 13.0734 6.72746 13.0734 7.31919V12.2381C13.0734 12.8299 12.5937 13.3096 12.0019 13.3096C11.4102 13.3096 10.9305 12.8299 10.9305 12.2381V7.31919C10.9305 6.72746 11.4102 6.24777 12.0019 6.24777ZM12.0019 14.8661C12.5937 14.8661 13.0734 15.3458 13.0734 15.9375V16.3388C13.0734 16.9305 12.5937 17.4103 12.0019 17.4103C11.4102 17.4103 10.9305 16.9305 10.9305 16.3388V15.9375C10.9305 15.3458 11.4102 14.8661 12.0019 14.8661Z\" fill=\"currentColor\"></path>"
  },
  "settings-bolt-nut": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.8602 7.63133C23.2372 10.7404 23.2372 13.2599 22.8602 16.369C22.7145 17.5695 22.0423 18.6281 21.0599 19.2974C18.6119 20.9645 15.9734 22.6677 13.2266 23.6475C12.4333 23.9304 11.5668 23.9304 10.7735 23.6475C8.02666 22.6677 5.38817 20.9645 2.94019 19.2974C1.95773 18.6281 1.28549 17.5695 1.13992 16.369C0.762928 13.2599 0.76293 10.7404 1.13993 7.63133C1.28549 6.4308 1.95773 5.37218 2.94021 4.70304C5.38817 3.03578 8.02666 1.33268 10.7735 0.352858C11.5668 0.0698805 12.4333 0.0698806 13.2266 0.352858C15.9734 1.33268 18.6119 3.03578 21.0599 4.70304C22.0423 5.37218 22.7147 6.4308 22.8602 7.63133ZM12.0003 7.71429C13.0486 7.71429 14.1296 8.01821 14.906 8.66669C15.7835 9.39972 16.2187 10.5708 16.279 11.7203C16.3393 12.8702 16.0296 14.0831 15.3104 14.9277C14.5203 15.8556 13.234 16.2857 12.0003 16.2857C10.7667 16.2857 9.48045 15.8556 8.69026 14.9277C7.97107 14.0831 7.66137 12.8702 7.72168 11.7203C7.78195 10.5708 8.21715 9.39972 9.09473 8.66669C9.87106 8.01821 10.9521 7.71429 12.0003 7.71429Z\" fill=\"currentColor\"></path>"
  },
  "shield-3": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.35113 2.85492C2.35212 2.85435 2.35311 2.85381 2.77512 3.59986C2.42769 2.8163 2.42777 2.81625 2.42789 2.81619L2.42938 2.81554L2.43331 2.81381L2.44781 2.80742L2.5026 2.78342C2.55029 2.76262 2.61996 2.7324 2.70934 2.69412C2.88806 2.61756 3.14575 2.50867 3.46407 2.37819C4.10018 2.1175 4.98134 1.7695 5.96045 1.42099C7.87318 0.740155 10.312 0 12 0C13.688 0 16.1268 0.740155 18.0396 1.42099C19.0186 1.7695 19.8998 2.1175 20.5359 2.37819C20.8543 2.50867 21.1119 2.61756 21.2906 2.69412C21.3801 2.7324 21.4497 2.76262 21.4975 2.78342L21.5522 2.80742L21.5667 2.81381L21.5707 2.81554L21.5717 2.81604C21.5719 2.81609 21.5722 2.8163 21.2249 3.59986C21.6468 2.85381 21.6478 2.85435 21.6489 2.85492L21.6509 2.85609L21.655 2.85849L21.6639 2.8637L21.6837 2.87566C21.6975 2.88437 21.7131 2.89452 21.7305 2.90628C21.7647 2.9298 21.8052 2.95961 21.8506 2.99685C21.9417 3.07145 22.0517 3.17493 22.1733 3.31572C22.4169 3.59781 22.7016 4.02389 22.9723 4.65809C23.5113 5.92114 24 8.02071 24 11.5028C24 15.7137 22.0058 18.6108 19.5521 20.5519C17.125 22.4719 14.2368 23.4718 12.3295 23.9719C12.1869 24.0094 12.0372 24.0094 11.8946 23.9719C9.99127 23.4729 7.04961 22.4745 4.56787 20.5581C2.06052 18.6218 0 15.7241 0 11.5028C0 8.02071 0.488724 5.92114 1.02778 4.65809C1.29846 4.02389 1.5831 3.59781 1.82667 3.31572C1.94825 3.17493 2.05836 3.07145 2.14939 2.99685C2.19482 2.95961 2.23522 2.9298 2.26959 2.90628C2.28677 2.89452 2.30242 2.88437 2.31639 2.87566L2.33607 2.8637L2.34492 2.85849L2.3491 2.85609L2.35113 2.85492ZM21.2249 3.59986L21.5717 2.81604C21.5973 2.82732 21.6226 2.84009 21.6468 2.85381L21.2249 3.59986ZM2.77512 3.59986L2.35311 2.85381C2.37735 2.84009 2.40243 2.82747 2.42789 2.81619L2.77512 3.59986Z\" fill=\"currentColor\"></path>"
  },
  "shield-check": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.95194 0.264746C4.11365 0.095646 4.33745 0 4.57143 0H19.4285C19.6625 0 19.8864 0.095646 20.0481 0.264746C20.5341 0.772983 21.5362 1.82172 22.4073 3.64323C23.2774 5.46315 24 8.01775 24 11.5384C24 15.7385 22.0046 18.6276 19.5511 20.5627C17.124 22.4767 14.236 23.4735 12.3289 23.9721C12.1867 24.0093 12.0374 24.0093 11.8953 23.9721C9.99209 23.4746 7.05058 22.4793 4.56886 20.5689C2.06163 18.6386 0 15.749 0 11.5384C0 8.01775 0.722604 5.46315 1.59278 3.64323C2.46372 1.82172 3.46593 0.772983 3.95194 0.264746ZM17.4189 7.74936C17.9448 7.27227 17.9844 6.45917 17.5073 5.93325C17.0302 5.4073 16.2171 5.36772 15.6911 5.84481C14.1719 7.22294 13.025 8.4667 12.0558 9.97939C11.3846 11.0271 10.8156 12.1774 10.2635 13.5503L8.36818 11.5957C7.87387 11.0859 7.05989 11.0734 6.55013 11.5677C6.04035 12.062 6.02784 12.876 6.52215 13.3858L9.83482 16.802C10.1454 17.1222 10.5997 17.2586 11.0353 17.1624C11.4709 17.0661 11.8254 16.7509 11.9721 16.3296C12.736 14.1353 13.4112 12.6305 14.221 11.3666C15.0257 10.1106 15.9979 9.03835 17.4189 7.74936Z\" fill=\"currentColor\"></path>"
  },
  "shield-star-police-badge": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.95194 0.264746C4.11365 0.095646 4.33745 0 4.57143 0H19.4285C19.6625 0 19.8864 0.095646 20.0481 0.264746C20.5341 0.772983 21.5362 1.82172 22.4073 3.64323C23.2774 5.46315 24 8.01775 24 11.5384C24 15.7385 22.0046 18.6276 19.5511 20.5627C17.124 22.4767 14.236 23.4735 12.3289 23.9721C12.1867 24.0093 12.0374 24.0093 11.8953 23.9721C9.99209 23.4746 7.05058 22.4793 4.56886 20.5689C2.06163 18.6386 0 15.749 0 11.5384C0 8.01775 0.722604 5.46315 1.59278 3.64323C2.46372 1.82172 3.46593 0.772983 3.95194 0.264746ZM11.0095 4.9057C11.5084 4.22194 12.4944 4.22175 12.9932 4.90606C13.6593 5.81991 14.117 6.80751 14.4212 7.93781C15.5153 7.93001 16.5442 8.08272 17.567 8.42746C18.3679 8.69746 18.6725 9.66048 18.2131 10.3589C17.5927 11.3018 16.8385 12.0611 15.8928 12.7038C16.2354 13.7774 16.4008 14.837 16.4117 15.9423C16.42 16.7908 15.6345 17.4643 14.7868 17.1891C13.767 16.8584 12.8591 16.3604 11.9987 15.6556C11.1389 16.3601 10.2324 16.8582 9.21333 17.189C8.36554 17.4643 7.58002 16.7908 7.58835 15.9423C7.59921 14.837 7.76462 13.7774 8.10723 12.7038C7.16157 12.0611 6.40735 11.3018 5.78698 10.3589C5.32747 9.66048 5.63222 8.69746 6.43313 8.42746C7.45582 8.08272 8.4847 7.93001 9.57891 7.93781C9.88342 6.8071 10.3427 5.81945 11.0095 4.9057Z\" fill=\"currentColor\"></path>"
  },
  "smiley-crying-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 3.1482C5.2465 1.04988 8.27652 0 12 0C15.7235 0 18.7534 1.04988 20.8519 3.1482C22.9502 5.2465 24 8.27652 24 12C24 15.7235 22.9502 18.7534 20.8519 20.8519C18.7534 22.9502 15.7235 24 12 24C8.27652 24 5.2465 22.9502 3.1482 20.8519C1.04988 18.7534 0 15.7235 0 12C0 8.27652 1.04988 5.2465 3.1482 3.1482ZM7.24848 9.62532C7.24927 9.6239 7.25463 9.61421 7.26657 9.59616C7.2803 9.57538 7.29965 9.54816 7.32525 9.51528C7.37679 9.44901 7.44578 9.36986 7.52952 9.28555C7.70059 9.11335 7.90334 8.94963 8.10154 8.83521C8.29973 8.72078 8.54289 8.62704 8.77755 8.565C8.89245 8.53462 8.99547 8.51446 9.07865 8.50294C9.11993 8.49723 9.15317 8.49408 9.17805 8.49257C9.19963 8.49127 9.2107 8.49146 9.21233 8.49149C9.80325 8.52034 10.3059 8.06477 10.3349 7.47382C10.3639 6.88281 9.90825 6.38018 9.31721 6.35119C8.98587 6.33494 8.59116 6.39778 8.22981 6.49334C7.85301 6.59295 7.42577 6.75101 7.03011 6.97944C6.63446 7.20787 6.28397 7.49885 6.00929 7.77535C5.74586 8.04053 5.49408 8.35094 5.34249 8.646C5.07207 9.17234 5.27955 9.81823 5.80589 10.0886C6.33223 10.359 6.97807 10.1517 7.24848 9.62532ZM7.6409 17.2694C7.42653 17.8209 6.80565 18.0941 6.25409 17.8798C5.70255 17.6654 5.42923 17.0446 5.6436 16.493C6.12454 15.2556 6.93859 14.2713 8.05466 13.6078C9.15893 12.9513 10.4999 12.6429 12.0001 12.6429C13.5002 12.6429 14.8412 12.9513 15.9455 13.6078C17.0615 14.2713 17.8755 15.2556 18.3566 16.493C18.5709 17.0446 18.2976 17.6654 17.7459 17.8798C17.1945 18.0941 16.5736 17.8209 16.3592 17.2694C16.0431 16.456 15.5354 15.8569 14.8504 15.4497C14.1537 15.0355 13.2143 14.7858 12.0001 14.7858C10.7858 14.7858 9.84645 15.0355 9.14967 15.4497C8.4647 15.8569 7.95703 16.456 7.6409 17.2694ZM14.8218 8.49257C14.8002 8.49127 14.7891 8.49146 14.7875 8.49149C14.1965 8.52048 13.6939 8.06484 13.6649 7.47382C13.636 6.88281 14.0916 6.38018 14.6826 6.35119C15.0139 6.33494 15.4087 6.39778 15.77 6.49334C16.1468 6.59295 16.5741 6.75101 16.9697 6.97944C17.3654 7.20787 17.7158 7.49885 17.9906 7.77535C18.2539 8.04053 18.5057 8.35094 18.6573 8.646C18.9278 9.17234 18.7203 9.81823 18.1939 10.0886C17.6676 10.359 17.0219 10.1516 16.7515 9.62551C16.7514 9.62551 16.7462 9.61579 16.7332 9.59616C16.7195 9.57538 16.7002 9.54816 16.6746 9.51528C16.623 9.44901 16.554 9.36986 16.4703 9.28555C16.2992 9.11335 16.0965 8.94963 15.8983 8.83521C15.7001 8.72078 15.4569 8.62704 15.2223 8.565C15.1074 8.53462 15.0043 8.51446 14.9212 8.50294C14.8799 8.49723 14.8466 8.49408 14.8218 8.49257Z\" fill=\"currentColor\"></path>"
  },
  "smiley-sparks": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.8519 3.1482C18.7534 1.04988 15.7235 0 12 0C8.27652 0 5.2465 1.04988 3.1482 3.1482C1.04988 5.2465 0 8.27652 0 12C0 15.7235 1.04988 18.7534 3.1482 20.8519C5.2465 22.9502 8.27652 24 12 24C15.7235 24 18.7534 22.9502 20.8519 20.8519C22.9502 18.7534 24 15.7235 24 12C24 8.27652 22.9502 5.2465 20.8519 3.1482ZM17.3571 6.66963C17.3571 6.07791 16.8775 5.59821 16.2857 5.59821C15.694 5.59821 15.2143 6.07791 15.2143 6.66963V7.31249H14.5714C13.9797 7.31249 13.5 7.7922 13.5 8.38392C13.5 8.97566 13.9797 9.45535 14.5714 9.45535H15.2143V10.0982C15.2143 10.6899 15.694 11.1696 16.2857 11.1696C16.8775 11.1696 17.3571 10.6899 17.3571 10.0982V9.45535H18C18.5918 9.45535 19.0714 8.97566 19.0714 8.38392C19.0714 7.7922 18.5918 7.31249 18 7.31249H17.3571V6.66963ZM5.93638 14.5714C5.93638 13.8614 6.51202 13.2857 7.2221 13.2857H16.7779C17.4879 13.2857 18.0636 13.8614 18.0636 14.5714V14.7575C18.0636 14.7996 18.0574 14.8414 18.0453 14.8817C17.6595 16.1554 16.9342 17.16 15.8942 17.8413C14.8592 18.5191 13.5426 18.8571 12 18.8571C10.4575 18.8571 9.1409 18.5191 8.10585 17.8413C7.06581 17.16 6.34049 16.1554 5.95478 14.8817C5.94259 14.8414 5.93638 14.7996 5.93638 14.7575V14.5714ZM7.71429 5.59821C8.30602 5.59821 8.78571 6.07791 8.78571 6.66963V7.31249H9.42857C10.0203 7.31249 10.5 7.7922 10.5 8.38392C10.5 8.97566 10.0203 9.45535 9.42857 9.45535H8.78571V10.0982C8.78571 10.6899 8.30602 11.1696 7.71429 11.1696C7.12255 11.1696 6.64286 10.6899 6.64286 10.0982V9.45535H6C5.40826 9.45535 4.92857 8.97566 4.92857 8.38392C4.92857 7.7922 5.40826 7.31249 6 7.31249H6.64286V6.66963C6.64286 6.07791 7.12255 5.59821 7.71429 5.59821Z\" fill=\"currentColor\"></path>"
  },
  "spinning-wheel-cursor": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M11.3002 14.0391C11.472 14.9037 11.6564 15.7646 11.8794 16.5837C12.259 17.9779 12.7584 19.3287 13.5016 20.4475C14.2573 21.5846 15.2802 22.5014 16.6807 22.9637C16.8716 23.0266 17.0678 23.0781 17.2683 23.1228C15.7273 23.705 13.9605 24 11.9999 24C10.6698 24 9.42893 23.8629 8.28675 23.5949C8.26904 23.5692 8.25512 23.5406 8.23486 23.5162C7.3289 22.4239 6.96242 21.4798 6.89558 20.6602C6.82904 19.8398 7.05334 19.019 7.54514 18.1557C8.33143 16.7761 9.70111 15.4423 11.3002 14.0391ZM4.35931 11.2249C5.96228 11.1927 7.83423 11.7201 9.8939 12.4185C8.24535 13.8635 6.63998 15.4162 5.68352 17.0943C5.03906 18.2254 4.64933 19.4745 4.75942 20.8325C4.80036 21.3363 4.90894 21.8383 5.08587 22.3392C4.37396 21.9211 3.72528 21.4274 3.14892 20.851C1.53741 19.2394 0.546642 17.0785 0.172363 14.476C0.65069 13.1966 1.25878 12.4228 1.90841 11.9548C2.57561 11.4742 3.38388 11.2447 4.35931 11.2249ZM23.9531 13.3125C23.7308 16.4384 22.6969 19.0049 20.851 20.851C20.8448 20.8572 20.8371 20.8617 20.8309 20.8678C19.2951 21.2462 18.1798 21.2026 17.3521 20.9297C16.4978 20.6477 15.8344 20.0871 15.2862 19.2622C14.726 18.4191 14.3004 17.3194 13.9469 16.0212C13.7416 15.2668 13.5704 14.4672 13.4062 13.6406C15.4867 14.3475 17.6396 14.9656 19.5769 14.9515C20.8708 14.9418 22.1398 14.6549 23.2549 13.8867C23.5012 13.717 23.7315 13.5229 23.9531 13.3125ZM18.9006 1.65234C19.6179 2.07221 20.2708 2.56898 20.851 3.14899C22.4708 4.76878 23.4627 6.94378 23.8324 9.56417C23.3403 10.8772 22.7122 11.6587 22.0395 12.1222C21.3658 12.5863 20.548 12.8012 19.5618 12.8086C17.9725 12.8202 16.1289 12.2986 14.1076 11.6133C15.8194 10.1132 17.4954 8.49579 18.4402 6.72823C19.0534 5.58082 19.3935 4.31772 19.222 2.95145C19.1674 2.51649 19.0566 2.08447 18.9006 1.65234ZM3.1188 3.17913C4.68456 2.7851 5.81816 2.82895 6.65618 3.10546C7.51035 3.38763 8.17383 3.94779 8.72203 4.77288C9.28203 5.61621 9.70791 6.7157 10.0613 8.01394C10.2665 8.76799 10.4379 9.56674 10.6021 10.3929C8.48417 9.67317 6.2868 9.04402 4.31578 9.08371C3.02273 9.10994 1.76028 9.42024 0.656179 10.2154C0.44145 10.3701 0.238885 10.5431 0.043457 10.7294C0.258237 7.60154 1.2834 5.03117 3.1188 3.17913ZM11.9999 0C13.3112 1.37143e-09 14.5358 0.132932 15.6646 0.393415C16.591 1.47243 16.9939 2.4078 17.0959 3.21931C17.1994 4.04525 17.0076 4.86278 16.5502 5.71875C15.7864 7.14729 14.3731 8.52612 12.7064 9.9894C12.5349 9.12696 12.3512 8.26853 12.1288 7.45145C11.7493 6.0569 11.25 4.70508 10.5066 3.58594C9.75101 2.44879 8.72804 1.53218 7.32749 1.06975C7.11572 0.999881 6.89666 0.944571 6.67292 0.897322C8.22756 0.300456 10.0147 0 11.9999 0Z\" fill=\"currentColor\"></path>"
  },
  "square-clock": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.2695 0.813887C8.11039 0.608694 10.0313 0.428711 11.9999 0.428711C13.9684 0.428711 15.8894 0.608694 17.7302 0.813887C20.5965 1.13337 22.8995 3.43437 23.2067 6.30576C23.4026 8.13713 23.5713 10.0452 23.5713 12.0001C23.5713 13.955 23.4026 15.8631 23.2067 17.6945C22.8995 20.5659 20.5965 22.867 17.7302 23.1864C15.8894 23.3916 13.9684 23.5716 11.9999 23.5716C10.0313 23.5716 8.11039 23.3916 6.2695 23.1864C3.4033 22.867 1.10031 20.5659 0.793102 17.6945C0.597166 15.8631 0.428467 13.955 0.428467 12.0001C0.428467 10.0452 0.597166 8.13713 0.793102 6.30576C1.10031 3.43437 3.4033 1.13337 6.2695 0.813887ZM11.9999 18.8573C16.3885 18.8573 18.857 16.3887 18.857 12.0001C18.857 7.61157 16.3885 5.143 11.9999 5.143C7.61132 5.143 5.14275 7.61157 5.14275 12.0001C5.14275 16.3887 7.61132 18.8573 11.9999 18.8573ZM11.2788 8.43765C11.8705 8.43765 12.3502 8.91734 12.3502 9.50908V11.7055H13.5265C14.1183 11.7055 14.5979 12.1852 14.5979 12.7769C14.5979 13.3687 14.1183 13.8483 13.5265 13.8483H11.2788C10.687 13.8483 10.2074 13.3687 10.2074 12.7769V9.50908C10.2074 8.91734 10.687 8.43765 11.2788 8.43765Z\" fill=\"currentColor\"></path>"
  },
  "star-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.8938 0.978264C12.943 -0.32615 11.062 -0.325797 10.1109 0.977575C8.87683 2.66887 8.02416 4.49577 7.45682 6.58318C5.43612 6.57336 3.53345 6.85839 1.64187 7.49606C0.114861 8.01082 -0.464213 9.84549 0.410306 11.1747C1.55874 12.9203 2.9534 14.3284 4.69831 15.5208C4.06952 17.5056 3.76567 19.4657 3.74561 21.5097C3.72979 23.1225 5.2249 24.4094 6.84355 23.8838C8.72839 23.2718 10.4067 22.3531 11.9976 21.0567C13.5894 22.3534 15.2704 23.2721 17.1565 23.8841C18.7749 24.4092 20.2701 23.1225 20.2542 21.5097C20.2341 19.4657 19.9304 17.5056 19.3016 15.5208C21.0465 14.3284 22.4411 12.9203 23.5895 11.1747C24.4641 9.84549 23.885 8.01082 22.358 7.49606C20.4664 6.85841 18.5637 6.57338 16.5431 6.58318C15.9765 4.49655 15.1267 2.66978 13.8938 0.978264Z\" fill=\"currentColor\"></path>"
  },
  "star-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.2695 0.813887C8.11039 0.608694 10.0313 0.428711 11.9999 0.428711C13.9684 0.428711 15.8894 0.608694 17.7302 0.813887C20.5965 1.13337 22.8995 3.43437 23.2067 6.30576C23.4026 8.13713 23.5713 10.0452 23.5713 12.0001C23.5713 13.955 23.4026 15.8631 23.2067 17.6945C22.8995 20.5659 20.5965 22.867 17.7302 23.1864C15.8894 23.3916 13.9684 23.5716 11.9999 23.5716C10.0313 23.5716 8.11039 23.3916 6.2695 23.1864C3.4033 22.867 1.10031 20.5659 0.793102 17.6945C0.597166 15.8631 0.428467 13.955 0.428467 12.0001C0.428467 10.0452 0.597166 8.13713 0.793102 6.30576C1.10031 3.43437 3.4033 1.13337 6.2695 0.813887ZM13.3211 5.3944C12.6602 4.48769 11.3428 4.48802 10.6818 5.39387C10.0397 6.27395 9.58205 7.21805 9.26581 8.27582C8.23889 8.29608 7.25863 8.45748 6.28238 8.78657C5.21899 9.14505 4.82717 10.4143 5.42686 11.3258C6.02573 12.2361 6.74407 12.9839 7.62326 13.6211C7.32538 14.6415 7.18001 15.6555 7.16969 16.708C7.15894 17.8027 8.1852 18.7152 9.32568 18.3449C10.2984 18.0289 11.1733 17.568 11.9988 16.9352C12.8252 17.5683 13.7013 18.0293 14.6746 18.3451C15.8149 18.715 16.8412 17.8028 16.8305 16.708C16.8201 15.6555 16.6748 14.6415 16.3769 13.6211C17.2561 12.9839 17.9744 12.2361 18.5733 11.3258C19.173 10.4143 18.7811 9.14505 17.7177 8.78657C16.7416 8.4575 15.7613 8.2961 14.7345 8.27582C14.4188 7.21869 13.9627 6.27465 13.3211 5.3944Z\" fill=\"currentColor\"></path>"
  },
  "stopwatch": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.2855 2.63266C13.8579 2.68695 14.4354 2.77733 15.0247 2.90379C15.719 3.05277 16.4026 2.61072 16.5515 1.91645C16.7005 1.22218 16.2585 0.538581 15.5642 0.389595C14.3539 0.129865 13.1768 0 11.9998 0C10.8228 0 9.64577 0.129865 8.43542 0.389595C7.74113 0.538581 7.29909 1.22218 7.44807 1.91645C7.59706 2.61072 8.28065 3.05277 8.97494 2.90379C9.56424 2.77733 10.1417 2.68695 10.7141 2.63266V5.19963C8.39069 5.41102 6.45979 6.21372 5.05102 7.62249C3.38985 9.28365 2.57139 11.6708 2.57139 14.5714C2.57139 17.472 3.38985 19.8591 5.05102 21.5205C6.71218 23.1816 9.09934 24 12 24C14.9006 24 17.2877 23.1816 18.949 21.5205C20.6101 19.8591 21.4285 17.472 21.4285 14.5714C21.4285 11.6708 20.6101 9.28365 18.949 7.62249C17.54 6.21365 15.6091 5.41095 13.2855 5.1996V2.63266ZM12 9.87389C12.71 9.87389 13.2857 10.4495 13.2857 11.1596V14.0556L14.9662 15.7362C15.4683 16.2383 15.4683 17.0523 14.9662 17.5545C14.4641 18.0566 13.6501 18.0566 13.148 17.5545L11.0908 15.4973C10.8497 15.2562 10.7143 14.9292 10.7143 14.5882V11.1596C10.7143 10.4495 11.2899 9.87389 12 9.87389ZM6.01575 5.34903C6.62417 4.98291 6.82058 4.1929 6.45446 3.58449C6.08834 2.97607 5.29833 2.77965 4.68991 3.14577C3.71021 3.73531 2.82 4.46419 2.04879 5.30808C1.56977 5.83224 1.60637 6.64548 2.13053 7.1245C2.65469 7.60353 3.46795 7.56694 3.94697 7.04277C4.551 6.38181 5.24846 5.81076 6.01575 5.34903ZM17.545 3.58449C17.179 4.1929 17.3753 4.98291 17.9837 5.34903C18.751 5.81076 19.4485 6.38181 20.0525 7.04277C20.5316 7.56694 21.3449 7.60353 21.8689 7.1245C22.3932 6.64548 22.4297 5.83224 21.9507 5.30808C21.1795 4.46419 20.2892 3.73531 19.3097 3.14577C18.7011 2.77965 17.9112 2.97607 17.545 3.58449Z\" fill=\"currentColor\"></path>"
  },
  "straight-face": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.1482 3.1482C5.2465 1.04988 8.27652 0 12 0C15.7235 0 18.7534 1.04988 20.8519 3.1482C22.9502 5.2465 24 8.27652 24 12C24 15.7235 22.9502 18.7534 20.8519 20.8519C18.7534 22.9502 15.7235 24 12 24C8.27652 24 5.2465 22.9502 3.1482 20.8519C1.04988 18.7534 0 15.7235 0 12C0 8.27652 1.04988 5.2465 3.1482 3.1482ZM8.70326 8.74407C8.70326 8.15234 8.22357 7.67265 7.63183 7.67265C7.04011 7.67265 6.5604 8.15234 6.5604 8.74407V9.94407C6.5604 10.5358 7.04011 11.0155 7.63183 11.0155C8.22357 11.0155 8.70326 10.5358 8.70326 9.94407V8.74407ZM16.3682 7.67265C16.9599 7.67265 17.4396 8.15234 17.4396 8.74407V9.94407C17.4396 10.5358 16.9599 11.0155 16.3682 11.0155C15.7764 11.0155 15.2967 10.5358 15.2967 9.94407V8.74407C15.2967 8.15234 15.7764 7.67265 16.3682 7.67265ZM5.36707 15.1603C5.4474 15.7465 5.98778 16.1566 6.57403 16.0763C10.2305 15.5752 13.7695 15.5752 17.4259 16.0763C18.0122 16.1566 18.5527 15.7465 18.6329 15.1603C18.7133 14.574 18.3031 14.0336 17.717 13.9533C13.8674 13.4258 10.1326 13.4258 6.28311 13.9533C5.69685 14.0336 5.28672 14.574 5.36707 15.1603Z\" fill=\"currentColor\"></path>"
  },
  "sun": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.91097 1.05713C10.947 -0.352377 13.053 -0.352377 14.089 1.05713C15.0469 2.36025 16.6552 3.02438 18.2559 2.77982C19.9889 2.51505 21.485 4.011 21.2201 5.74404C20.9757 7.34481 21.6398 8.95313 22.9428 9.91097C24.3525 10.947 24.3525 13.053 22.9428 14.089C21.6398 15.0469 20.9757 16.6552 21.2201 18.2559C21.485 19.9889 19.9889 21.485 18.2559 21.2201C16.6552 20.9757 15.0469 21.6398 14.089 22.9428C13.053 24.3525 10.947 24.3525 9.91097 22.9428C8.95313 21.6398 7.34481 20.9757 5.74404 21.2201C4.011 21.485 2.51505 19.9889 2.77982 18.2559C3.02438 16.6552 2.36025 15.0469 1.05713 14.089C-0.352377 13.053 -0.352377 10.947 1.05713 9.91097C2.36025 8.95313 3.02438 7.34481 2.77982 5.74404C2.51505 4.01102 4.01102 2.51505 5.74404 2.77982C7.34481 3.02438 8.95313 2.36025 9.91097 1.05713ZM8.32301 8.32281C9.20016 7.44566 10.4622 7.01179 12.0002 7.01179C13.5381 7.01179 14.8002 7.44566 15.6773 8.32281C16.5544 9.19995 16.9883 10.462 16.9883 11.9999C16.9883 13.5379 16.5544 14.8 15.6773 15.6771C14.8002 16.5542 13.5381 16.9881 12.0002 16.9881C10.4622 16.9881 9.20016 16.5542 8.32301 15.6771C7.44588 14.8 7.01199 13.5379 7.01199 11.9999C7.01199 10.462 7.44588 9.19995 8.32301 8.32281Z\" fill=\"currentColor\"></path>"
  },
  "tag": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.0317 0.000113492C16.1833 0.00588842 14.2555 0.231753 13.165 0.382987C12.4029 0.488688 11.7138 0.811209 11.1556 1.29957C7.54112 4.4615 4.22954 7.71775 1.03733 11.252C-0.404645 12.8485 -0.285288 15.2953 1.03627 17.0361C1.85158 18.1101 2.73319 19.2197 3.7568 20.2433C4.7804 21.2669 5.88999 22.1486 6.96399 22.9639C8.70487 24.2854 11.1516 24.4047 12.7481 22.9629C16.2824 19.7707 19.5387 16.459 22.7005 12.8446C23.1889 12.2863 23.5114 11.5972 23.6172 10.8351C23.7684 9.74469 23.9943 7.8168 24 5.96837C24.0029 5.04593 23.9513 4.1129 23.7972 3.30053C23.649 2.52027 23.3806 1.70401 22.8384 1.16174C22.2961 0.619471 21.4798 0.351089 20.6996 0.203003C19.8872 0.0488168 18.9541 -0.00276848 18.0317 0.000113492ZM18.6802 5.31994C18.2139 4.85364 17.556 4.63728 16.7914 4.63728C16.0268 4.63728 15.369 4.85364 14.9027 5.31994C14.4364 5.78625 14.22 6.4441 14.22 7.20871C14.22 7.97331 14.4364 8.63117 14.9027 9.09747C15.369 9.56376 16.0268 9.78014 16.7914 9.78014C17.556 9.78014 18.2139 9.56376 18.6802 9.09747C19.1465 8.63117 19.3628 7.97331 19.3628 7.20871C19.3628 6.4441 19.1465 5.78625 18.6802 5.31994Z\" fill=\"currentColor\"></path>"
  },
  "tag-chevron": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.6921 20.6957C12.2456 21.0951 6.21458 21.1082 1.56743 20.6943C0.189395 20.5718 -0.450945 18.9723 0.355611 17.9088L4.3724 12.6124C4.64225 12.2566 4.64225 11.7546 4.3724 11.3987L0.355629 6.10246C-0.450939 5.03897 0.189395 3.43965 1.56743 3.31695C6.21204 2.90342 12.243 2.89354 16.6919 3.29321C17.3969 3.35253 18.0533 3.65947 18.5948 4.16955C19.3956 4.92393 20.7139 6.46819 21.8242 7.96094C22.3824 8.7114 22.9042 9.47047 23.2908 10.1308C23.4836 10.4602 23.6518 10.7803 23.7742 11.0724C23.8873 11.3421 24.0001 11.6761 24.0001 12.0042C24.0001 12.3323 23.8873 12.6663 23.7742 12.9361C23.6518 13.2282 23.4836 13.5483 23.2908 13.8777C22.9042 14.538 22.3824 15.2971 21.8242 16.0475C20.7139 17.5402 19.3956 19.0846 18.5948 19.8389C18.0379 20.3637 17.3763 20.6381 16.6921 20.6957Z\" fill=\"currentColor\"></path>"
  },
  "tag-empty": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.10287 3.12105C8.26514 2.91552 13.081 2.97096 16.6762 3.29318C17.3818 3.35244 18.0391 3.65894 18.5817 4.16882C19.3843 4.92312 20.7057 6.46735 21.8186 7.9601C22.3781 8.71058 22.9011 9.46965 23.2887 10.13C23.4819 10.4594 23.6506 10.7795 23.7734 11.0717C23.8867 11.3414 24 11.6757 24 12.0042C24 12.3327 23.8867 12.667 23.7734 12.9367C23.6506 13.2289 23.4819 13.549 23.2887 13.8784C22.9011 14.5388 22.3781 15.2978 21.8186 16.0483C20.7057 17.5411 19.3843 19.0853 18.5817 19.8396C18.0235 20.364 17.3609 20.6381 16.676 20.6957C13.0826 21.0177 8.26762 21.0879 4.10419 20.8882C2.00282 20.7873 0.351238 19.1218 0.210783 17.0422C0.105153 15.4783 0 13.5398 0 12.0057C0 10.4716 0.105152 8.53311 0.210783 6.96919C0.351252 4.88945 2.00273 3.22476 4.10287 3.12105Z\" fill=\"currentColor\"></path>"
  },
  "threat-folder": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.96805 0.0727595C6.46438 -0.046579 4.93733 -0.0144094 2.91828 0.134818C1.63204 0.229882 0.679587 1.27921 0.544654 2.51211C-0.041024 7.86355 -0.238622 13.2615 0.37643 18.6687C0.628551 20.8851 2.36247 22.4995 4.43122 22.7359C6.27065 22.9462 8.10002 23.0743 9.92676 23.1216C9.67745 22.3865 9.63009 21.5683 9.84338 20.7417C10.7712 17.1454 12.1471 14.2598 14.9024 11.3077C16.5393 9.55401 19.3131 9.55401 20.9499 11.3077C21.7896 12.2073 22.501 13.1007 23.111 14.0099C23.1753 12.022 23.1441 9.91327 23.0076 7.56453C22.889 5.52075 21.295 3.86213 19.2482 3.68359C17.1878 3.50388 15.6736 3.47203 13.4326 3.42489C13.1084 3.41806 12.7688 3.41091 12.4103 3.40296C12.0565 3.39511 11.7432 3.16826 11.625 2.83317L11.2532 1.77939C10.9094 0.804588 10.0114 0.12249 8.96805 0.0727595ZM19.3836 12.7699C18.594 11.9238 17.2589 11.9238 16.4692 12.7699C13.9973 15.4183 12.7725 17.9671 11.9185 21.277C11.6005 22.5093 12.4717 23.713 13.7316 23.8203C16.5404 24.0598 19.3125 24.0598 22.1211 23.8203C23.3811 23.713 24.2523 22.5093 23.9343 21.277C23.0803 17.9671 21.8556 15.4183 19.3836 12.7699ZM18.7851 15.8678C18.7851 15.3944 18.4013 15.0107 17.928 15.0107C17.4547 15.0107 17.0709 15.3944 17.0709 15.8678V17.9249C17.0709 18.3984 17.4547 18.7821 17.928 18.7821C18.4013 18.7821 18.7851 18.3984 18.7851 17.9249V15.8678ZM17.1669 20.1201C17.347 19.9401 17.6069 19.8501 17.9265 19.8501C18.246 19.8501 18.5059 19.9401 18.6861 20.1201C18.8661 20.3002 18.9561 20.5601 18.9561 20.8797C18.9561 21.1992 18.8661 21.4591 18.6861 21.6393C18.5059 21.8193 18.246 21.9094 17.9265 21.9094C17.6069 21.9094 17.347 21.8193 17.1669 21.6393C16.9869 21.4591 16.8968 21.1992 16.8968 20.8797C16.8968 20.5601 16.9869 20.3002 17.1669 20.1201Z\" fill=\"currentColor\"></path>"
  },
  "ticket-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.28126 2.40578C10.2473 1.40649 13.694 1.56028 19.6963 2.40232C21.919 2.71416 24 4.2526 24 6.77292V8.82146C24 9.16474 23.7951 9.47493 23.4795 9.60974C22.5134 10.0223 21.8481 10.9667 21.8481 12.0556C21.8481 13.1444 22.5134 14.0889 23.4795 14.5014C23.7951 14.6362 24 14.9464 24 15.2897V17.3381C24 18.5343 23.5582 19.5708 22.763 20.3409C21.9792 21.0999 20.9018 21.5544 19.686 21.7102C13.697 22.4772 10.3143 22.4823 4.31343 21.7101C1.92926 21.4032 0 19.8377 0 17.3381V15.2897C0 14.9464 0.20485 14.6362 0.520593 14.5015C1.48677 14.089 2.15218 13.1444 2.15218 12.0556C2.15218 10.9667 1.48677 10.0222 0.520594 9.60967C0.20485 9.47488 0 9.16468 0 8.82136V6.77292C0 5.55979 0.472869 4.54157 1.274 3.78856C2.05927 3.05047 3.12159 2.60002 4.28126 2.40578ZM16.5 11.5713C16.5 10.9796 16.0203 10.4999 15.4286 10.4999C14.8368 10.4999 14.3571 10.9796 14.3571 11.5713V12.4285C14.3571 13.0202 14.8368 13.4999 15.4286 13.4999C16.0203 13.4999 16.5 13.0202 16.5 12.4285V11.5713ZM15.4286 5.35704C16.0203 5.35704 16.5 5.83673 16.5 6.42847V7.28561C16.5 7.87735 16.0203 8.35704 15.4286 8.35704C14.8368 8.35704 14.3571 7.87735 14.3571 7.28561V6.42847C14.3571 5.83673 14.8368 5.35704 15.4286 5.35704ZM16.5 16.7142C16.5 16.1224 16.0203 15.6428 15.4286 15.6428C14.8368 15.6428 14.3571 16.1224 14.3571 16.7142V17.5713C14.3571 18.163 14.8368 18.6427 15.4286 18.6427C16.0203 18.6427 16.5 18.163 16.5 17.5713V16.7142Z\" fill=\"currentColor\"></path>"
  },
  "ticket-star": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.6963 2.40232C13.694 1.56028 10.2473 1.40649 4.28126 2.40578C3.12159 2.60002 2.05927 3.05047 1.274 3.78856C0.472869 4.54157 0 5.55979 0 6.77292V8.82136C0 9.16468 0.20485 9.47488 0.520594 9.60967C1.48677 10.0222 2.15218 10.9667 2.15218 12.0556C2.15218 13.1444 1.48677 14.089 0.520593 14.5015C0.20485 14.6362 0 14.9464 0 15.2897V17.3381C0 19.8377 1.92926 21.4032 4.31343 21.7101C10.3143 22.4823 13.697 22.4772 19.686 21.7102C20.9018 21.5544 21.9792 21.0999 22.763 20.3409C23.5582 19.5708 24 18.5343 24 17.3381V15.2897C24 14.9464 23.7951 14.6362 23.4795 14.5014C22.5134 14.0889 21.8481 13.1444 21.8481 12.0556C21.8481 10.9667 22.5134 10.0223 23.4795 9.60974C23.7951 9.47493 24 9.16474 24 8.82146V6.77292C24 4.2526 21.919 2.71416 19.6963 2.40232ZM13.0316 7.3111C12.6532 6.38844 11.3465 6.38844 10.9682 7.31112L10.1024 9.4222L7.76714 9.62688C7.25326 9.63658 6.90914 10.0012 6.78902 10.3894C6.66758 10.7818 6.74621 11.2772 7.14024 11.6009L8.7349 12.9109C8.80959 12.9722 8.84373 13.0702 8.82331 13.1647L8.3009 15.5834C8.08925 16.5633 9.17746 17.303 10.0108 16.7457L11.9999 15.4155L13.989 16.7457C14.8223 17.303 15.9105 16.5633 15.6989 15.5833L15.1765 13.1647C15.1561 13.0702 15.1902 12.9722 15.2649 12.9109L16.8596 11.6009C17.6314 10.9667 17.2443 9.71556 16.2491 9.62832L13.8974 9.4222L13.0316 7.3111Z\" fill=\"currentColor\"></path>"
  },
  "time-history-off": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 0C11.3605 0 10.7406 0.0313467 10.1416 0.0943793C9.43539 0.168683 8.92315 0.801391 8.99745 1.50757C9.07176 2.21376 9.70447 2.72599 10.4107 2.65169C10.9145 2.59867 11.4443 2.57143 12 2.57143C12.5557 2.57143 13.0855 2.59867 13.5893 2.65169C14.2955 2.72599 14.9282 2.21376 15.0026 1.50757C15.0769 0.801393 14.5646 0.168683 13.8584 0.0943795C13.2594 0.0313467 12.6395 0 12 0ZM19.2945 1.91074C18.7001 1.52221 17.9033 1.68906 17.5149 2.28341C17.1262 2.87777 17.293 3.67455 17.8874 4.0631C18.7133 4.60301 19.397 5.28662 19.937 6.11256C20.3254 6.7069 21.1222 6.87375 21.7166 6.48523C22.3109 6.09669 22.4777 5.2999 22.0893 4.70554C21.355 3.58236 20.4177 2.64497 19.2945 1.91074ZM6.11256 4.0631C6.7069 3.67455 6.87375 2.87777 6.48523 2.28341C6.09669 1.68906 5.2999 1.52221 4.70554 1.91074C3.58236 2.64499 2.64497 3.58236 1.91074 4.70554C1.52221 5.2999 1.68906 6.09669 2.28341 6.48523C2.87777 6.87375 3.67455 6.7069 4.0631 6.11256C4.60301 5.28662 5.28662 4.60301 6.11256 4.0631ZM2.65169 10.4107C2.72599 9.70447 2.21376 9.07176 1.50757 8.99745C0.801393 8.92315 0.168683 9.43538 0.0943795 10.1416C0.0313467 10.7406 0 11.3605 0 12C0 12.6395 0.0313467 13.2594 0.0943793 13.8584C0.168683 14.5646 0.801391 15.0769 1.50757 15.0026C2.21376 14.9282 2.72599 14.2955 2.65169 13.5893C2.59867 13.0855 2.57143 12.5557 2.57143 12C2.57143 11.4443 2.59867 10.9145 2.65169 10.4107ZM23.9055 10.1416C23.8313 9.43539 23.1986 8.92315 22.4925 8.99745C21.7862 9.07176 21.2739 9.70447 21.3483 10.4107C21.4013 10.9145 21.4286 11.4443 21.4286 12C21.4286 12.5557 21.4013 13.0855 21.3483 13.5893C21.2739 14.2955 21.7862 14.9282 22.4925 15.0026C23.1986 15.0769 23.8313 14.5646 23.9055 13.8584C23.9686 13.2594 24 12.6395 24 12C24 11.3605 23.9686 10.7406 23.9055 10.1416ZM4.0631 17.8874C3.67455 17.293 2.87777 17.1262 2.28341 17.5149C1.68906 17.9033 1.52221 18.7001 1.91074 19.2945C2.64499 20.4177 3.58236 21.355 4.70554 22.0893C5.2999 22.4777 6.09669 22.3109 6.48523 21.7166C6.87375 21.1222 6.7069 20.3254 6.11256 19.937C5.28662 19.397 4.60301 18.7133 4.0631 17.8874ZM22.0893 19.2945C22.4777 18.7001 22.3109 17.9033 21.7166 17.5149C21.1222 17.1262 20.3254 17.293 19.937 17.8874C19.397 18.7133 18.7133 19.397 17.8874 19.937C17.293 20.3254 17.1262 21.1222 17.5149 21.7166C17.9033 22.3109 18.7001 22.4777 19.2945 22.0893C20.4177 21.355 21.355 20.4177 22.0893 19.2945ZM10.4107 21.3483C9.70447 21.2739 9.07176 21.7862 8.99745 22.4925C8.92315 23.1986 9.43538 23.8313 10.1416 23.9055C10.7406 23.9686 11.3605 24 12 24C12.6395 24 13.2594 23.9686 13.8584 23.9055C14.5646 23.8313 15.0769 23.1986 15.0026 22.4925C14.9282 21.7862 14.2955 21.2739 13.5893 21.3483C13.0855 21.4013 12.5557 21.4286 12 21.4286C11.4443 21.4286 10.9145 21.4013 10.4107 21.3483ZM13.3393 7.15179C13.3393 6.4417 12.7636 5.86608 12.0536 5.86608C11.3435 5.86608 10.7679 6.4417 10.7679 7.15179V12.0296C10.7679 12.3706 10.9033 12.6976 11.1444 12.9387L14.1029 15.8971C14.605 16.3992 15.419 16.3992 15.9211 15.8971C16.4232 15.395 16.4232 14.581 15.9211 14.0789L13.3393 11.497V7.15179Z\" fill=\"currentColor\"></path>"
  },
  "time-lapse": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.0005 0C8.33511 0 5.28997 1.03487 3.16243 3.16242C1.03487 5.28998 0 8.33512 0 12.0005C0 15.6659 1.03487 18.7111 3.16243 20.8387C5.28997 22.9661 8.33511 24.001 12.0005 24.001C16.6629 24.001 20.2976 22.3179 22.3095 18.944C22.6733 18.3341 22.4738 17.5448 21.8638 17.1812C21.254 16.8175 20.4648 17.0171 20.101 17.627C18.6775 20.0139 16.0302 21.4296 12.0005 21.4296C8.80843 21.4296 6.49618 20.5358 4.9807 19.0203C3.46522 17.5049 2.57143 15.1926 2.57143 12.0005C2.57143 8.80844 3.46522 6.49617 4.9807 4.98069C6.49618 3.46523 8.80843 2.57143 12.0005 2.57143C12.9006 2.57143 13.7324 2.64292 14.4959 2.77943C15.1949 2.90442 15.8628 2.43907 15.9878 1.74009C16.1128 1.04109 15.6475 0.373128 14.9485 0.248144C14.0202 0.0821685 13.0359 0 12.0005 0ZM19.0181 1.73606C18.4114 1.36717 17.6204 1.55998 17.2515 2.16673C16.8827 2.77346 17.0755 3.56437 17.6822 3.93326C18.8237 4.62727 19.7126 5.58373 20.3391 6.80389C20.6635 7.43553 21.4385 7.6846 22.0702 7.36021C22.7018 7.03581 22.9508 6.26078 22.6265 5.62914C21.7868 3.99407 20.5719 2.68074 19.0181 1.73606ZM23.885 9.94789C23.8022 9.24266 23.1632 8.73818 22.458 8.82112C21.7527 8.90404 21.2482 9.54295 21.3312 10.2482C21.3962 10.8004 21.4296 11.3845 21.4296 12.0005C21.4296 12.8742 21.3622 13.6835 21.2335 14.4284C21.1124 15.1281 21.5816 15.7934 22.2814 15.9144C22.981 16.0353 23.6463 15.5662 23.7674 14.8665C23.9235 13.9623 24.001 13.0055 24.001 12.0005C24.001 11.2916 23.9624 10.6069 23.885 9.94789ZM13.2865 8.14319C13.2865 7.4331 12.7109 6.85747 12.0008 6.85747C11.2907 6.85747 10.7151 7.4331 10.7151 8.14319V12.4291C10.7151 12.7363 10.825 13.0333 11.0251 13.2664L14.5595 17.3852C15.0219 17.924 15.8336 17.9861 16.3725 17.5236C16.9114 17.0613 16.9733 16.2495 16.5109 15.7107L13.2865 11.9531V8.14319Z\" fill=\"currentColor\"></path>"
  },
  "timer-zero": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.2862 1.28571C13.2862 0.575634 12.7105 0 12.0004 0C11.2904 0 10.7147 0.575634 10.7147 1.28571V3.75937C10.7147 4.46945 11.2904 5.04509 12.0004 5.04509C12.7105 5.04509 13.2862 4.46945 13.2862 3.75937V1.28571ZM5.32673 3.50801C4.82463 3.00589 4.01057 3.00589 3.50845 3.50799C3.00636 4.01009 3.00634 4.82415 3.50844 5.32627L5.25646 7.07431C5.75857 7.57642 6.57264 7.57642 7.07473 7.07432C7.57685 6.57223 7.57685 5.75816 7.07475 5.25605L5.32673 3.50801ZM1.28571 10.7151C0.575634 10.7151 0 11.2908 0 12.0008C0 12.7109 0.575634 13.2866 1.28571 13.2866H3.75934C4.46941 13.2866 5.04505 12.7109 5.04505 12.0008C5.04505 11.2908 4.46941 10.7151 3.75934 10.7151H1.28571ZM7.07473 16.9268C7.57685 17.429 7.57685 18.2429 7.07475 18.745L5.32673 20.4931C4.82463 20.9952 4.01057 20.9952 3.50845 20.4931C3.00636 19.991 3.00634 19.177 3.50844 18.6749L5.25646 16.9268C5.75857 16.4247 6.57264 16.4247 7.07473 16.9268ZM20.2426 10.7151C19.5326 10.7151 18.9569 11.2908 18.9569 12.0008C18.9569 12.7109 19.5326 13.2866 20.2426 13.2866H22.7163C23.4264 13.2866 24.002 12.7109 24.002 12.0008C24.002 11.2908 23.4264 10.7151 22.7163 10.7151H20.2426ZM16.9271 16.9268C17.4291 16.4247 18.2432 16.4247 18.7454 16.9268L20.4934 18.6749C20.9955 19.177 20.9955 19.991 20.4934 20.4931C19.9913 20.9952 19.1772 20.9952 18.6751 20.4931L16.9271 18.745C16.425 18.2429 16.425 17.429 16.9271 16.9268ZM13.2862 20.2424C13.2862 19.5324 12.7105 18.9567 12.0004 18.9567C11.2904 18.9567 10.7147 19.5324 10.7147 20.2424V22.7162C10.7147 23.4262 11.2904 24.0019 12.0004 24.0019C12.7105 24.0019 13.2862 23.4262 13.2862 22.7162V20.2424ZM20.4934 3.50799C20.9955 4.01009 20.9955 4.82415 20.4934 5.32627L18.7454 7.07431C18.2432 7.57642 17.4291 7.57642 16.9271 7.07432C16.425 6.57223 16.425 5.75816 16.9271 5.25605L18.6751 3.50801C19.1772 3.00589 19.9913 3.00589 20.4934 3.50799Z\" fill=\"currentColor\"></path>"
  },
  "tinder-logo": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.0139 0.0477923C12.7518 -0.0436027 12.4616 -0.00239339 12.2353 0.158372C12.009 0.319137 11.8745 0.579548 11.8745 0.857148C11.8745 1.10398 11.8752 1.34364 11.8758 1.57665C11.8791 2.84895 11.882 3.92342 11.7788 4.8841C11.659 5.99966 11.4024 6.87451 10.8886 7.61686C10.5121 8.16074 9.80152 8.18347 9.41397 7.73558C8.79561 7.02093 8.32469 6.14067 8.1282 5.68793C8.03198 5.46624 7.84663 5.29546 7.61781 5.21767C7.38898 5.13987 7.13796 5.1623 6.92656 5.27942C3.8239 6.99828 1.71436 10.2447 1.71436 13.9829C1.71436 19.542 6.36597 24 12.0431 24C15.8268 24 18.5348 22.7434 20.2226 20.6763C21.8929 18.6309 22.4596 15.9194 22.2409 13.194C21.8078 7.79993 18.2438 1.87133 13.0139 0.0477923Z\" fill=\"currentColor\"></path>"
  },
  "triangle-arrow-expand-window-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.486 0.805949C20.3976 0.657543 18.8783 0.612181 17.4403 0.900853C15.9045 1.20915 15.3303 2.89984 16.1597 4.12137C16.3409 4.38825 16.5492 4.67443 16.7854 4.972L10.9695 10.7879C10.3 11.4574 10.3 12.5428 10.9695 13.2123C11.639 13.8817 12.7244 13.8817 13.3939 13.2123L19.2129 7.39315C19.4995 7.61937 19.7752 7.81961 20.0328 7.99457C21.2544 8.82391 22.9451 8.24974 23.2533 6.71395C23.542 5.27592 23.4967 3.75653 23.3483 2.66824C23.2154 1.69397 22.4603 0.938802 21.486 0.805949ZM10.077 4.20007C11.0225 4.15075 11.749 3.34432 11.6997 2.39882C11.6504 1.45333 10.844 0.726836 9.89848 0.776147C8.79508 0.833693 7.7155 0.9359 6.67335 1.04908C3.40466 1.40405 0.775761 4.02964 0.434795 7.30735C0.269329 8.89797 0.130615 10.5739 0.130615 12.2985C0.130615 14.0231 0.269329 15.6991 0.434795 17.2897C0.775761 20.5674 3.40461 23.193 6.67332 23.548C8.27251 23.7217 9.96223 23.87 11.702 23.87C13.4419 23.87 15.1316 23.7217 16.7308 23.548C19.9996 23.193 22.6283 20.5674 22.9692 17.2897C23.0767 16.2567 23.1727 15.1888 23.2269 14.0978C23.2739 13.1522 22.5453 12.3476 21.5997 12.3006C20.6541 12.2537 19.8496 12.9822 19.8026 13.9278C19.7527 14.932 19.6634 15.932 19.5592 16.9349C19.386 18.5982 18.0304 19.9581 16.3606 20.1395C14.8018 20.3087 13.2563 20.4414 11.702 20.4414C10.1477 20.4414 8.60229 20.3087 7.04349 20.1395C5.37367 19.9581 4.01798 18.5982 3.84497 16.9349C3.68391 15.3868 3.55918 13.8475 3.55918 12.2985C3.55918 10.7495 3.68391 9.21026 3.84497 7.66209C4.01798 5.9989 5.3737 4.63894 7.04352 4.45761C8.05658 4.34758 9.0649 4.25285 10.077 4.20007Z\" fill=\"currentColor\"></path>"
  },
  "triangle-arrow-synchronize-1": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.45574 5.46274C7.95141 4.19258 9.88569 3.42857 12 3.42857C16.7338 3.42857 20.5714 7.26614 20.5714 12C20.5714 12.9468 21.3389 13.7143 22.2857 13.7143C23.2325 13.7143 24 12.9468 24 12C24 5.37259 18.6274 0 12 0C8.86507 0 6.00958 1.20379 3.87339 3.17057C3.47064 2.89083 3.08895 2.65589 2.74611 2.46326C2.19998 2.15638 1.55722 2.09933 1.00318 2.34993C0.430461 2.60897 0.0459634 3.15946 0.0114095 3.83667C-0.0521199 5.08179 0.192787 6.37869 0.4644 7.28849C0.706488 8.09942 1.43002 8.69006 2.27299 8.7649C3.21876 8.84889 4.53843 8.82919 5.74562 8.51769C6.40221 8.34826 6.86457 7.86134 7.00373 7.24836C7.13834 6.65537 6.95376 6.03705 6.54377 5.56339C6.51504 5.5302 6.48569 5.49663 6.45574 5.46274ZM1.71429 10.2857C2.66105 10.2857 3.42857 11.0532 3.42857 12C3.42857 16.7339 7.26614 20.5714 12 20.5714C14.1143 20.5714 16.0486 19.8074 17.5442 18.5373C17.5143 18.5033 17.485 18.4697 17.4562 18.4366C17.0462 17.963 16.8617 17.3446 16.9963 16.7516C17.1354 16.1387 17.5978 15.6517 18.2544 15.4823C19.4616 15.1708 20.7813 15.1511 21.727 15.2351C22.5699 15.3099 23.2935 15.9006 23.5356 16.7115C23.8071 17.6213 24.0521 18.9182 23.9885 20.1633C23.9541 20.8406 23.5695 21.391 22.9968 21.6501C22.4427 21.9007 21.8001 21.8436 21.2539 21.5367C20.911 21.3441 20.5294 21.1092 20.1266 20.8294C17.9904 22.7962 15.1349 24 12 24C5.37259 24 0 18.6274 0 12C0 11.0532 0.767511 10.2857 1.71429 10.2857Z\" fill=\"currentColor\"></path>"
  },
  "triangle-flag": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.73257 17.153C2.8087 19.0406 2.90977 20.9232 3.03061 22.7969C3.0763 23.5056 3.68778 24.043 4.3964 23.9973C5.105 23.9515 5.64239 23.34 5.59671 22.6315C5.49807 21.1022 5.41287 19.5687 5.34387 18.0333C8.36105 17.3532 11.9405 16.1891 14.9036 14.8824C16.5644 14.15 18.0864 13.3491 19.2193 12.532C19.7844 12.1246 20.2969 11.6818 20.683 11.2055C21.0589 10.7418 21.4078 10.1308 21.4278 9.4086C21.4482 8.67243 21.1169 8.03789 20.7557 7.55755C20.3838 7.06325 19.8807 6.5982 19.3227 6.16761C18.2031 5.30362 16.684 4.44231 15.02 3.65097C11.7213 2.08222 7.63131 0.68467 4.41063 0.0472509C4.32764 0.0253051 4.24121 0.0113887 4.15213 0.00642356C4.12571 0.00495045 4.09943 0.00428608 4.07331 0.00440889C3.78785 0.00305913 3.50744 0.0968798 3.27841 0.274821C2.98553 0.502375 2.80518 0.845326 2.78369 1.2156C2.68861 2.85312 2.63012 4.64376 2.60202 6.4985C2.54219 9.65643 2.57902 12.8214 2.68837 15.975C2.69958 16.3357 2.71157 16.6931 2.7243 17.0465C2.72559 17.0823 2.72835 17.1178 2.73257 17.153Z\" fill=\"currentColor\"></path>"
  },
  "upload-tray": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.25192 8.46413C6.77902 8.53016 6.30848 8.32868 6.02991 7.94088C5.75134 7.55309 5.71063 7.04285 5.92416 6.61578C7.05819 4.34772 9.27919 2.1267 11.5472 0.992679C11.9091 0.811691 12.3352 0.811685 12.6971 0.992662C14.9653 2.1267 17.1863 4.34772 18.3203 6.61578C18.5339 7.04285 18.4931 7.55309 18.2145 7.94088C17.936 8.32868 17.4656 8.53016 16.9926 8.46413C15.9319 8.31603 14.8827 8.21578 13.8375 8.16336V14.9587C13.8375 15.9054 13.07 16.673 12.1232 16.673C11.1765 16.673 10.409 15.9054 10.409 14.9587V8.16327C9.36317 8.21566 8.31331 8.31594 7.25192 8.46413ZM3.82668 17.0496C3.64834 16.1198 2.75 15.5106 1.82017 15.6889C0.89035 15.8672 0.281139 16.7656 0.459466 17.6953C0.716367 19.0349 1.37097 20.2705 2.34293 21.2396C3.43801 22.3316 4.87126 23.0209 6.40843 23.1975L6.41396 23.198C8.18659 23.3958 10.0638 23.5712 12.0002 23.5712C13.9366 23.5712 15.8154 23.3958 17.5866 23.198L17.5921 23.1975C19.1291 23.0209 20.5624 22.3316 21.6575 21.2396C22.6295 20.2705 23.284 19.0349 23.541 17.6953C23.7193 16.7656 23.11 15.8672 22.1802 15.6889C21.2504 15.5106 20.3521 16.1198 20.1738 17.0496C20.0464 17.7137 19.7214 18.3284 19.2366 18.8118C18.6908 19.3561 17.9744 19.7019 17.2033 19.791C15.4656 19.9849 13.7402 20.1426 12.0002 20.1426C10.2603 20.1426 8.53664 19.9849 6.79711 19.791C6.02612 19.7019 5.30967 19.3561 4.76379 18.8118C4.27898 18.3284 3.95405 17.7137 3.82668 17.0496Z\" fill=\"currentColor\"></path>"
  },
  "user-delete-cross": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.74697 0C7.1627 0 5.80394 0.448231 4.84209 1.41009C3.88022 2.37194 3.432 3.7307 3.432 5.31497C3.432 6.89926 3.88022 8.25801 4.84209 9.21986C5.80394 10.1817 7.1627 10.63 8.74697 10.63C10.3312 10.63 11.69 10.1817 12.6519 9.21986C13.6137 8.25801 14.0619 6.89926 14.0619 5.31497C14.0619 3.7307 13.6137 2.37194 12.6519 1.41009C11.69 0.448231 10.3312 0 8.74697 0ZM8.74401 12.259C6.04353 12.259 3.53013 13.0711 1.43789 14.4646C0.744885 14.9261 0.286109 15.5363 0.0966403 16.2291C-0.0915077 16.9171 0.00572103 17.615 0.295951 18.2199C0.872196 19.4211 2.2104 20.2884 3.82479 20.2884H13.3336L14.4436 19.1784L13.195 17.9297C11.8874 16.6221 11.8874 14.5021 13.195 13.1945C13.2362 13.1533 13.2783 13.1133 13.3211 13.0747C11.8948 12.5471 10.3526 12.259 8.74401 12.259ZM16.4149 14.7098C15.9442 14.239 15.1809 14.239 14.7102 14.7098C14.2395 15.1805 14.2395 15.9437 14.7102 16.4145L17.4741 19.1784L14.7102 21.9422C14.2395 22.4129 14.2395 23.1763 14.7102 23.647C15.181 24.1176 15.9442 24.1176 16.4149 23.647L19.1787 20.8831L21.9423 23.6467C22.4131 24.1174 23.1765 24.1174 23.647 23.6467C24.1178 23.1759 24.1178 22.4127 23.647 21.942L20.8834 19.1784L23.6472 16.4147C24.1179 15.944 24.1179 15.1808 23.6472 14.71C23.1765 14.2393 22.4133 14.2393 21.9425 14.71L19.1787 17.4737L16.4149 14.7098Z\" fill=\"currentColor\"></path>"
  },
  "user-folder": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.39651 0.50147C6.89285 0.382132 5.3658 0.414302 3.34675 0.563529C2.0605 0.658595 1.10805 1.70792 0.973121 2.94082C0.387442 8.29226 0.189845 13.6902 0.804897 19.0975C1.05702 21.3139 2.79094 22.9282 4.85969 23.1646C9.68624 23.7163 14.4434 23.702 19.2662 23.1507C21.3426 22.9135 22.9605 21.2023 23.2 19.0975C23.585 15.7116 23.6831 12.2457 23.4361 7.99324C23.3174 5.94946 21.7235 4.29084 19.6766 4.1123C17.6162 3.93259 16.102 3.90074 13.8611 3.8536C13.5368 3.84677 13.1973 3.83963 12.8388 3.83167C12.485 3.82382 12.1716 3.59697 12.0534 3.26188L11.6817 2.2081C11.3378 1.2333 10.4398 0.5512 9.39651 0.50147ZM11.9988 7.73786C10.847 7.73786 9.88659 8.06314 9.21456 8.73518C8.54254 9.4072 8.21726 10.3676 8.21726 11.5195C8.21726 12.6713 8.54254 13.6317 9.21456 14.3037C9.88659 14.9757 10.847 15.301 11.9988 15.301C13.1507 15.301 14.1111 14.9757 14.7831 14.3037C15.4551 13.6317 15.7804 12.6713 15.7804 11.5195C15.7804 10.3676 15.4551 9.4072 14.7831 8.73518C14.1111 8.06314 13.1507 7.73786 11.9988 7.73786ZM16.2601 18.4244C17.0408 19.0625 17.6462 19.8284 18.0356 20.6964C13.9941 21.098 10.0011 21.104 5.96369 20.6971C6.35299 19.8289 6.95854 19.0627 7.73948 18.4244C8.94182 17.4416 10.4469 16.9048 11.9998 16.9048C13.5526 16.9048 15.0578 17.4416 16.2601 18.4244Z\" fill=\"currentColor\"></path>"
  },
  "user-friendship-group": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.21436 7.28585C8.40864 7.28585 9.64293 6.05157 9.64293 3.85728C9.64293 1.663 8.40864 0.428711 6.21436 0.428711C4.02007 0.428711 2.78578 1.663 2.78578 3.85728C2.78578 6.05157 4.02007 7.28585 6.21436 7.28585ZM6.15837 8.143C3.22504 8.143 1.95763 10.391 1.68991 11.5214L1.68711 11.534C1.58494 12.0322 1.34688 14.0182 1.15765 15.5968L1.11989 15.9117C1.06415 16.3762 1.12136 16.775 1.28267 17.1058C1.44476 17.4382 1.69613 17.6691 1.97292 17.822C2.35138 18.0312 2.78452 18.0997 3.15406 18.1006C3.23625 18.5647 3.34858 19.1568 3.47301 19.7352C3.6323 20.4759 3.81988 21.2362 3.99782 21.6632C4.4514 22.7518 5.5102 23.5716 6.59962 23.5716C7.65729 23.5716 8.79766 23.0275 9.62611 21.4577C9.80664 21.1157 9.95189 20.6216 10.0724 20.0806C10.1951 19.53 10.2995 18.895 10.3868 18.2494C10.551 17.0351 10.6579 15.0798 10.7093 14.1374L10.7185 13.9703L10.7309 11.677H13.3009L13.2816 13.943C13.2815 13.9521 13.2817 13.9612 13.2822 13.9703L13.2919 14.1475C13.3436 15.0937 13.4498 17.0395 13.6134 18.2494C13.7007 18.895 13.8051 19.53 13.9278 20.0806C14.0483 20.6216 14.1936 21.1157 14.3741 21.4577C15.2025 23.0275 16.3429 23.5716 17.4006 23.5716C18.49 23.5716 19.5488 22.7518 20.0024 21.6632C20.1803 21.2362 20.3678 20.4759 20.5273 19.7352C20.6516 19.1568 20.764 18.5647 20.8461 18.1006C21.2157 18.0997 21.6488 18.0312 22.0273 17.822C22.3041 17.6691 22.5554 17.4382 22.7176 17.1058C22.8788 16.775 22.936 16.3762 22.8803 15.9117L22.8405 15.5806C22.6518 14.0046 22.415 12.0305 22.3132 11.534L22.3103 11.5214C22.0425 10.391 20.7752 8.143 17.8418 8.143H6.15837ZM21.2361 3.85728C21.2361 6.05157 20.0018 7.28585 17.8076 7.28585C15.6133 7.28585 14.379 6.05157 14.379 3.85728C14.379 1.663 15.6133 0.428711 17.8076 0.428711C20.0018 0.428711 21.2361 1.663 21.2361 3.85728Z\" fill=\"currentColor\"></path>"
  },
  "user-full-body-edit-pencil": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.04232 7.13145C9.32439 7.13145 10.608 5.84779 10.608 3.56573C10.608 1.28366 9.32439 0 7.04232 0C4.76026 0 3.4766 1.28366 3.4766 3.56573C3.4766 5.84779 4.76026 7.13145 7.04232 7.13145ZM7.01179 8.43415C5.24186 8.43415 3.50993 9.06934 2.26526 10.1583C1.01429 11.2528 0.246495 12.8181 0.465701 14.6408C0.497305 14.9036 0.534924 15.1785 0.578429 15.4696C0.738922 16.5437 1.67275 17.3141 2.74382 17.3141H3.36903L4.03349 21.4392C4.27117 22.915 5.54487 23.9998 7.03958 23.9998C8.53428 23.9998 9.80797 22.915 10.0457 21.4392L10.7101 17.3141H11.3481C12.4114 17.3141 13.3437 16.5544 13.5086 15.4863C13.5511 15.2109 13.5878 14.9498 13.6186 14.6984C13.8435 12.8625 13.0656 11.2829 11.8018 10.1777C10.5441 9.07791 8.79463 8.43415 7.01179 8.43415ZM18.392 12.9702C19.5512 11.6549 21.5526 11.7314 22.8373 12.8676C24.1509 14.0295 24.4535 16.0696 23.2151 17.3727L18.1405 22.7126C18.0402 22.8178 17.9149 22.8962 17.7762 22.9397L14.6259 23.9301C14.036 24.1155 13.4701 23.91 13.1057 23.5791C12.7412 23.2483 12.4817 22.7047 12.6105 22.0992L13.2836 18.9334C13.3142 18.7893 13.3815 18.6555 13.4789 18.545L18.392 12.9702Z\" fill=\"currentColor\"></path>"
  },
  "user-identifier-card": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.7143 4.12747V2.99811C10.7143 2.28804 11.2899 1.7124 12 1.7124C12.7101 1.7124 13.2857 2.28804 13.2857 2.99811V4.12747C15.4517 4.14706 17.6265 4.21615 19.8535 4.33474C21.918 4.44466 23.6121 6.045 23.7831 8.12494C24.0723 11.6418 24.0723 14.7675 23.7831 18.2844C23.6121 20.3643 21.918 21.9646 19.8535 22.0745C14.5176 22.3587 9.48237 22.3587 4.14653 22.0745C2.082 21.9646 0.3879 20.3643 0.216879 18.2844C-0.0722929 14.7675 -0.0722933 11.6418 0.216879 8.12494C0.3879 6.045 2.082 4.44466 4.14653 4.33474C6.37356 4.21615 8.54825 4.14706 10.7143 4.12747ZM14.625 9.25174C14.625 8.66001 15.1047 8.18031 15.6964 8.18031H19.2855C19.8773 8.18031 20.357 8.66001 20.357 9.25174C20.357 9.84348 19.8773 10.3232 19.2855 10.3232H15.6964C15.1047 10.3232 14.625 9.84348 14.625 9.25174ZM15.6964 12.1331C15.1047 12.1331 14.625 12.6128 14.625 13.2045C14.625 13.7962 15.1047 14.276 15.6964 14.276H19.2855C19.8773 14.276 20.357 13.7962 20.357 13.2045C20.357 12.6128 19.8773 12.1331 19.2855 12.1331H15.6964ZM8.52778 8.27553C7.59367 8.27553 6.80337 8.53958 6.24701 9.09593C5.69066 9.65229 5.42662 10.4426 5.42662 11.3767C5.42662 12.3108 5.69066 13.1011 6.24701 13.6575C6.80337 14.2138 7.59367 14.4779 8.52778 14.4779C9.46191 14.4779 10.2522 14.2138 10.8086 13.6575C11.3649 13.1011 11.629 12.3108 11.629 11.3767C11.629 10.4426 11.3649 9.65229 10.8086 9.09593C10.2522 8.53958 9.46191 8.27553 8.52778 8.27553ZM12.4842 17.4242C13.203 18.1721 13.6755 19.1258 13.8735 20.1881C10.7523 20.2306 7.65939 20.167 4.45359 19.9975C4.03154 19.9752 3.64152 19.8389 3.31431 19.6195C3.56448 18.7608 4.00569 17.9918 4.6206 17.3707C5.59142 16.3903 6.94728 15.8278 8.52631 15.8278C10.1345 15.8278 11.5107 16.4113 12.4842 17.4242Z\" fill=\"currentColor\"></path>"
  },
  "user-square-single": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.9999 0.428711C10.0313 0.428711 8.11039 0.608694 6.2695 0.813887C3.4033 1.13337 1.10031 3.43437 0.793102 6.30576C0.597166 8.13713 0.428467 10.0452 0.428467 12.0001C0.428467 13.955 0.597166 15.8631 0.793102 17.6945C1.10031 20.5659 3.4033 22.867 6.2695 23.1864C8.11039 23.3916 10.0313 23.5716 11.9999 23.5716C13.9684 23.5716 15.8894 23.3916 17.7302 23.1864C20.5965 22.867 22.8995 20.5659 23.2067 17.6945C23.4026 15.8631 23.5713 13.955 23.5713 12.0001C23.5713 10.0452 23.4026 8.13713 23.2067 6.30576C22.8995 3.43437 20.5965 1.13337 17.7302 0.813887C15.8894 0.608694 13.9684 0.428711 11.9999 0.428711ZM15.7487 9.48093C15.7487 11.8801 14.3992 13.2296 12 13.2296C9.60089 13.2296 8.25139 11.8801 8.25139 9.48093C8.25139 7.08178 9.60089 5.73228 12 5.73228C14.3992 5.73228 15.7487 7.08178 15.7487 9.48093ZM7.29936 17.6674C8.62592 16.5832 10.2866 15.9909 11.9998 15.9909C13.7132 15.9909 15.3738 16.5832 16.7003 17.6674C17.5598 18.3699 18.2449 19.2511 18.7134 20.2409C18.3253 20.4449 17.897 20.5805 17.4455 20.6307C15.6267 20.8335 13.8209 21.0001 11.9999 21.0001C10.1788 21.0001 8.37305 20.8335 6.55436 20.6307C6.10628 20.5808 5.68119 20.4469 5.29548 20.2457C5.77428 19.2557 6.46097 18.3528 7.29936 17.6674Z\" fill=\"currentColor\"></path>"
  },
  "user-target": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.2314 1.28572C13.2314 0.575634 12.6557 0 11.9457 0C11.2356 0 10.6599 0.575634 10.6599 1.28572V2.20309C8.26793 2.42426 6.24276 3.25655 4.7514 4.74791C3.24806 6.25125 2.41442 8.29703 2.20138 10.7142H1.28913C0.579053 10.7142 0.00341797 11.2898 0.00341797 11.9999C0.00341797 12.71 0.579053 13.2856 1.28913 13.2856H2.20138C2.41445 15.7027 3.24808 17.7484 4.7514 19.2519C6.24276 20.7431 8.26793 21.5754 10.6599 21.7966V22.7173C10.6599 23.4275 11.2356 24.003 11.9457 24.003C12.6557 24.003 13.2314 23.4275 13.2314 22.7173V21.8068C15.6737 21.602 17.74 20.7671 19.2553 19.2519C20.7587 17.7484 21.5922 15.7027 21.8053 13.2856H22.7104C23.4205 13.2856 23.9961 12.71 23.9961 11.9999C23.9961 11.2898 23.4205 10.7142 22.7104 10.7142H21.8053C21.5924 8.29703 20.7587 6.25125 19.2553 4.74791C17.74 3.23262 15.6737 2.39773 13.2314 2.19292V1.28572ZM6.56968 6.56618C5.41858 7.71728 4.7177 9.49369 4.7177 11.9999C4.7177 14.4093 5.36553 16.1442 6.43841 17.2974C6.68745 17.0225 6.95786 16.7651 7.24802 16.5279C8.58295 15.4368 10.254 14.8408 11.9781 14.8408C13.7022 14.8408 15.3733 15.4368 16.7083 16.5279C17.008 16.7729 17.2868 17.0396 17.5425 17.3248C18.6308 16.1718 19.289 14.4285 19.289 11.9999C19.289 9.49369 18.5881 7.71728 17.4371 6.56618C16.2859 5.41509 14.5095 4.71421 12.0033 4.71421C9.49718 4.71421 7.72078 5.41509 6.56968 6.56618ZM12.0001 6.54513C10.9612 6.54513 10.089 6.83864 9.47702 7.45065C8.86502 8.06267 8.5715 8.93481 8.5715 9.97371C8.5715 11.0126 8.86502 11.8847 9.47702 12.4968C10.089 13.1088 10.9612 13.4023 12.0001 13.4023C13.039 13.4023 13.9111 13.1088 14.5231 12.4968C15.1351 11.8847 15.4286 11.0126 15.4286 9.97371C15.4286 8.93481 15.1351 8.06267 14.5231 7.45065C13.9111 6.83864 13.039 6.54513 12.0001 6.54513Z\" fill=\"currentColor\"></path>"
  },
  "view-eye-solo": {
    "viewBox": "0 0 24 24",
    "body": "<path d=\"M12 3.21436C15.1468 3.21436 17.92 4.91601 19.8633 6.75677C20.8428 7.68473 21.6417 8.67576 22.2021 9.56424C22.482 10.0084 22.7097 10.4392 22.87 10.8332C23.0241 11.2117 23.1429 11.6195 23.1429 12.0001C23.1429 12.3807 23.0241 12.7884 22.87 13.1669C22.7097 13.5609 22.482 13.9917 22.2021 14.4359C21.6417 15.3244 20.8428 16.3154 19.8633 17.2434C17.92 19.0842 15.1468 20.7858 12 20.7858C8.85328 20.7858 6.08016 19.0842 4.13676 17.2434C3.15717 16.3154 2.35831 15.3244 1.79803 14.4359C1.51797 13.9917 1.29043 13.5609 1.13006 13.1669C0.97599 12.7884 0.857178 12.3807 0.857178 12.0001C0.857178 11.6195 0.97599 11.2117 1.13006 10.8332C1.29043 10.4392 1.51797 10.0084 1.79803 9.56424C2.35831 8.67576 3.15717 7.68473 4.13676 6.75677C6.08016 4.91601 8.85328 3.21436 12 3.21436ZM12 8.40744C10.9087 8.40758 9.9965 8.71677 9.35662 9.35666C8.71702 9.99652 8.40754 10.909 8.40741 12.0001C8.40756 13.0913 8.71675 14.0053 9.35662 14.6452C9.99648 15.2847 10.909 15.5942 12 15.5944C13.0914 15.5944 14.0051 15.2849 14.6451 14.6452C15.285 14.0053 15.5942 13.0913 15.5943 12.0001C15.5942 10.909 15.2847 9.99652 14.6451 9.35666C14.0051 8.71661 13.0917 8.40744 12 8.40744Z\" fill=\"currentColor\"></path>"
  },
  "warning-circle": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.0009 0C14.9622 0 17.9911 0.859884 20.1499 2.66307C22.5821 4.69481 23.8109 7.96469 23.9811 11.2122C24.1515 14.4607 23.2736 17.8606 21.2731 20.2099C19.0819 22.7829 15.4874 24 12.0009 24C8.51443 24 4.91995 22.7829 2.7288 20.2099C0.728293 17.8606 -0.149638 14.4607 0.0207253 11.2122C0.191039 7.96469 1.4197 4.69481 3.85207 2.66307C6.01081 0.859884 9.0396 0 12.0009 0ZM12.0008 5.4444C12.7109 5.4444 13.2866 6.02004 13.2866 6.73011V12.2839C13.2866 12.994 12.7109 13.5696 12.0008 13.5696C11.2908 13.5696 10.7151 12.994 10.7151 12.2839V6.73011C10.7151 6.02004 11.2908 5.4444 12.0008 5.4444ZM12.0008 14.9785C12.7109 14.9785 13.2866 15.5541 13.2866 16.2642V17.2697C13.2866 17.9798 12.7109 18.5554 12.0008 18.5554C11.2908 18.5554 10.7151 17.9798 10.7151 17.2697V16.2642C10.7151 15.5541 11.2908 14.9785 12.0008 14.9785Z\" fill=\"currentColor\"></path>"
  },
  "warning-diamond": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.9902 0.428714C13.1034 0.430065 14.1825 0.84316 15.1283 1.6057C17.8638 3.81125 20.2454 6.19968 22.4461 8.9436C23.9401 10.8064 23.9533 13.1988 22.4442 15.0663C20.2173 17.8217 17.8046 20.234 15.0486 22.4611C13.2083 23.948 10.8186 23.9348 8.98301 22.4629C6.19388 20.2267 3.7723 17.8037 1.53717 15.0131C0.0651308 13.1752 0.0520062 10.7841 1.53919 8.94153C3.74292 6.21118 6.12848 3.81753 8.84871 1.60768C9.7957 0.838368 10.8764 0.427362 11.9902 0.428714ZM11.9999 5.44454C12.71 5.44454 13.2856 6.02018 13.2856 6.73025V12.284C13.2856 12.9941 12.71 13.5698 11.9999 13.5698C11.2898 13.5698 10.7142 12.9941 10.7142 12.284V6.73025C10.7142 6.02018 11.2898 5.44454 11.9999 5.44454ZM11.9999 14.9786C12.71 14.9786 13.2856 15.5542 13.2856 16.2643V17.2699C13.2856 17.9799 12.71 18.5556 11.9999 18.5556C11.2898 18.5556 10.7142 17.9799 10.7142 17.2699V16.2643C10.7142 15.5542 11.2898 14.9786 11.9999 14.9786Z\" fill=\"currentColor\"></path>"
  },
  "warning-octagon": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.81838 0.428907C8.34902 0.293297 9.75646 0 12.0003 0C14.2438 0 15.6511 0.293213 16.1819 0.428849C16.4023 0.485155 16.5986 0.575474 16.7719 0.683091C17.3151 1.02036 19.1436 2.19446 20.4168 3.52815C21.5563 4.72176 22.7741 6.37428 23.267 7.06015C23.5049 7.39143 23.6559 7.77459 23.7081 8.17875C23.8042 8.92445 24.0002 10.6079 24 11.999C23.9998 13.3897 23.8041 15.0738 23.7079 15.8199C23.6559 16.2243 23.5049 16.6077 23.2668 16.9392C22.7739 17.6253 21.5563 19.2775 20.417 20.471C19.1505 21.7977 17.3349 22.9663 16.7813 23.3103C16.601 23.4223 16.3972 23.5157 16.1691 23.5737C15.6286 23.7106 14.2258 23.9991 12.0004 23.9991C9.77455 23.9991 8.37173 23.7106 7.83139 23.5735C7.60351 23.5157 7.39983 23.4225 7.21975 23.3105C6.66641 22.9668 4.85042 21.7985 3.5838 20.4717C2.4443 19.278 1.22631 17.6249 0.733505 16.9389C0.495521 16.6076 0.344666 16.2245 0.292538 15.8204C0.196325 15.0746 0.000235124 13.3907 2.09074e-07 11.9997C-0.000233878 10.6083 0.196161 8.92402 0.292507 8.17833C0.344685 7.77446 0.495503 7.39154 0.733337 7.06044C1.22603 6.37457 2.44409 4.72128 3.58371 3.52745C4.85703 2.19357 6.68583 1.01985 7.22894 0.68285C7.40213 0.575379 7.59823 0.485169 7.81838 0.428907ZM12 5.4444C12.7101 5.4444 13.2857 6.02004 13.2857 6.73011V12.2839C13.2857 12.994 12.7101 13.5696 12 13.5696C11.2899 13.5696 10.7143 12.994 10.7143 12.2839V6.73011C10.7143 6.02004 11.2899 5.4444 12 5.4444ZM12 14.9785C12.7101 14.9785 13.2857 15.5541 13.2857 16.2642V17.2697C13.2857 17.9798 12.7101 18.5554 12 18.5554C11.2899 18.5554 10.7143 17.9798 10.7143 17.2697V16.2642C10.7143 15.5541 11.2899 14.9785 12 14.9785Z\" fill=\"currentColor\"></path>"
  },
  "warning-shield": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.95194 0.264746C4.11365 0.095646 4.33745 0 4.57143 0H19.4285C19.6625 0 19.8864 0.095646 20.0481 0.264746C20.5341 0.772983 21.5362 1.82172 22.4073 3.64323C23.2774 5.46315 24 8.01775 24 11.5384C24 15.7385 22.0046 18.6276 19.5511 20.5627C17.124 22.4767 14.236 23.4735 12.3289 23.9721C12.1867 24.0093 12.0374 24.0093 11.8953 23.9721C9.99209 23.4746 7.05058 22.4793 4.56886 20.5689C2.06163 18.6386 0 15.749 0 11.5384C0 8.01775 0.722604 5.46315 1.59278 3.64323C2.46372 1.82172 3.46593 0.772983 3.95194 0.264746ZM12 5.4444C12.7101 5.4444 13.2857 6.02004 13.2857 6.73011V12.2839C13.2857 12.994 12.7101 13.5696 12 13.5696C11.2899 13.5696 10.7143 12.994 10.7143 12.2839V6.73011C10.7143 6.02004 11.2899 5.4444 12 5.4444ZM12 14.9785C12.7101 14.9785 13.2857 15.5541 13.2857 16.2642V17.2697C13.2857 17.9798 12.7101 18.5554 12 18.5554C11.2899 18.5554 10.7143 17.9798 10.7143 17.2697V16.2642C10.7143 15.5541 11.2899 14.9785 12 14.9785Z\" fill=\"currentColor\"></path>"
  },
  "warning-square": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.9999 0.428711C10.0313 0.428711 8.11039 0.608694 6.2695 0.813887C3.4033 1.13337 1.10031 3.43437 0.793102 6.30576C0.597166 8.13713 0.428467 10.0452 0.428467 12.0001C0.428467 13.955 0.597166 15.8631 0.793102 17.6945C1.10031 20.5659 3.4033 22.867 6.2695 23.1864C8.11039 23.3916 10.0313 23.5716 11.9999 23.5716C13.9684 23.5716 15.8894 23.3916 17.7302 23.1864C20.5965 22.867 22.8995 20.5659 23.2067 17.6945C23.4026 15.8631 23.5713 13.955 23.5713 12.0001C23.5713 10.0452 23.4026 8.13713 23.2067 6.30576C22.8995 3.43437 20.5965 1.13337 17.7302 0.813887C15.8894 0.608694 13.9684 0.428711 11.9999 0.428711ZM11.9999 5.44461C12.71 5.44461 13.2856 6.02023 13.2856 6.73032V12.2841C13.2856 12.9942 12.71 13.5698 11.9999 13.5698C11.2898 13.5698 10.7142 12.9942 10.7142 12.2841V6.73032C10.7142 6.02023 11.2898 5.44461 11.9999 5.44461ZM13.2856 16.2644C13.2856 15.5543 12.71 14.9786 11.9999 14.9786C11.2898 14.9786 10.7142 15.5543 10.7142 16.2644V17.27C10.7142 17.9801 11.2898 18.5557 11.9999 18.5557C12.71 18.5557 13.2856 17.9801 13.2856 17.27V16.2644Z\" fill=\"currentColor\"></path>"
  },
  "warning-triangle": {
    "viewBox": "0 0 24 24",
    "body": "<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.3582 1.52144C11.2829 0.635432 12.7174 0.635432 13.6421 1.52144C16.7359 4.48566 21.7204 10.9385 23.8946 18.1496C24.2336 19.2737 23.7378 20.5206 22.6096 21.0228C20.4884 21.967 16.6729 23.1426 12.0002 23.1426C7.32735 23.1426 3.51188 21.967 1.39067 21.0228C0.262426 20.5206 -0.233198 19.2737 0.105715 18.1496C2.27986 10.9385 7.26437 4.48566 10.3582 1.52144ZM11.9999 6.80002C12.71 6.80002 13.2856 7.37564 13.2856 8.08573V13.1784C13.2856 13.8884 12.71 14.4641 11.9999 14.4641C11.2898 14.4641 10.7142 13.8884 10.7142 13.1784V8.08573C10.7142 7.37564 11.2898 6.80002 11.9999 6.80002ZM11.9999 15.9105C12.71 15.9105 13.2856 16.4861 13.2856 17.1961V18.057C13.2856 18.7671 12.71 19.3428 11.9999 19.3428C11.2898 19.3428 10.7142 18.7671 10.7142 18.057V17.1961C10.7142 16.4861 11.2898 15.9105 11.9999 15.9105Z\" fill=\"currentColor\"></path>"
  }
};

/* Optional name → Font Awesome solid fallback for names not in ICON_DATA. */
const FA_FALLBACK = {
  shield: 'shield-halved',
  ticket: 'ticket',
  attorney: 'scale-balanced',
  court: 'gavel',
  calendar: 'calendar-check',
  payment: 'credit-card',
  guarantee: 'shield-halved',
  speeding: 'gauge-high',
  message: 'comments',
  document: 'file-lines',
  location: 'location-dot',
  fastlane: 'bolt'
};
Object.assign(__ds_scope, { ICON_DATA, FA_FALLBACK });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/icon-data.js", error: String((e && e.message) || e) }); }

// components/icons/FeatureIcon.jsx
try { (() => {
/**
 * Off The Record — FeatureIcon
 * Large, solid feature icon (Streamline "Flex Solid" style) for native /
 * marketing surfaces. Renders the licensed Streamline SVG when present in the
 * registry; otherwise falls back to the matching Font Awesome solid glyph.
 *
 * Use for big, standalone icons (empty states, value props, onboarding, feature
 * rows) — NOT for small inline UI affordances (use a plain Font Awesome <i> there).
 */
const TONES = {
  brand: ['var(--blue-50)', 'var(--blue-600)'],
  neutral: ['var(--neutral-100)', 'var(--neutral-700)'],
  success: ['var(--green-50)', 'var(--green-700)'],
  warning: ['var(--amber-50)', 'var(--amber-700)'],
  error: ['var(--red-50)', 'var(--red-700)'],
  purple: ['var(--purple-50)', 'var(--purple-700)'],
  coral: ['var(--coral-50)', 'var(--coral-700)']
};
function FeatureIcon({
  name,
  size = 40,
  color,
  tone = 'brand',
  featured = false,
  style = {}
}) {
  const entry = __ds_scope.ICON_DATA[name];
  const fg = color || (featured ? TONES[tone]?.[1] : 'var(--icon-primary)');
  const glyph = entry ? /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: entry.viewBox || '0 0 24 24',
    role: "img",
    "aria-label": name,
    style: {
      display: 'block',
      color: fg,
      fill: fg
    },
    dangerouslySetInnerHTML: {
      __html: entry.body
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${__ds_scope.FA_FALLBACK[name] || name}`,
    "aria-label": name,
    style: {
      fontSize: size,
      lineHeight: 1,
      color: fg,
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  if (!featured) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        ...style
      }
    }, glyph);
  }

  // "Featured" treatment: tinted rounded container sized around the glyph.
  const box = Math.round(size * 1.9);
  const [bg] = TONES[tone] || TONES.brand;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: box,
      height: box,
      background: bg,
      color: fg,
      borderRadius: 'var(--radius-2xl)',
      flexShrink: 0,
      ...style
    }
  }, glyph);
}
Object.assign(__ds_scope, { FeatureIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/FeatureIcon.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
/** Off The Record — BottomNav. Mobile tab bar with icon + label items. */
function BottomNav({
  items = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      background: '#fff',
      borderTop: '1px solid var(--border-secondary)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const on = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onChange && onChange(it.id),
      style: {
        flex: 1,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: '10px 0 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        position: 'relative',
        color: on ? 'var(--brand-primary)' : 'var(--text-quaternary)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        fontSize: 19
      }
    }, it.icon, it.badge ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -4,
        right: -8,
        minWidth: 16,
        height: 16,
        padding: '0 4px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--coral-600)',
        color: '#fff',
        fontSize: 10,
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, it.badge) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
/** Off The Record — Breadcrumbs. Path trail with chevron separators. */
function Breadcrumbs({
  items = [],
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, it.href && !last ? /*#__PURE__*/React.createElement("a", {
      href: it.href,
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-tertiary)',
        textDecoration: 'none'
      }
    }, it.label) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: last ? 700 : 600,
        color: last ? 'var(--text-primary)' : 'var(--text-tertiary)'
      },
      "aria-current": last ? 'page' : undefined
    }, it.label), !last && /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-chevron-right",
      style: {
        fontSize: 11,
        color: 'var(--neutral-300)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DropdownMenu.jsx
try { (() => {
/** Off The Record — DropdownMenu. Click-to-open menu with items, icons, dividers. */
function DropdownMenu({
  trigger,
  items = [],
  align = 'left',
  width = 220,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex',
      cursor: 'pointer'
    }
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      [align]: 0,
      zIndex: 60,
      width,
      background: '#fff',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      padding: 6
    }
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: `d${i}`,
    style: {
      height: 1,
      background: 'var(--border-secondary)',
      margin: '6px 0'
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => {
      setOpen(false);
      it.onClick && it.onClick();
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: '9px 10px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 14,
      textAlign: 'left',
      color: it.danger ? 'var(--text-error)' : 'var(--text-secondary)'
    },
    onMouseEnter: e => e.currentTarget.style.background = it.danger ? 'var(--red-50)' : 'var(--neutral-50)',
    onMouseLeave: e => e.currentTarget.style.background = 'none'
  }, it.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      display: 'inline-flex',
      justifyContent: 'center',
      color: it.danger ? 'var(--text-error)' : 'var(--icon-secondary)'
    }
  }, it.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.label), it.shortcut && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-quaternary)'
    }
  }, it.shortcut)))));
}
Object.assign(__ds_scope, { DropdownMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/** Off The Record — NavBar. Desktop top navigation with logo, links, and CTA. */
function NavBar({
  links = [],
  active,
  cta,
  account,
  onNavigate,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: 68,
      padding: '0 28px',
      background: '#fff',
      borderBottom: '1px solid var(--border-secondary)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/logo-navy.svg",
    height: "26",
    alt: "Off the Record",
    style: {
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      flex: 1
    }
  }, links.map(l => {
    const on = l.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: l.id,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        border: 'none',
        background: on ? 'var(--neutral-50)' : 'transparent',
        cursor: 'pointer',
        padding: '8px 14px',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 15,
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)'
      }
    }, l.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, cta, account));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
/** Off The Record — Pagination. Numbered page controls with prev/next. */
function Pagination({
  page = 1,
  total = 1,
  onChange,
  style = {}
}) {
  const go = p => {
    if (p >= 1 && p <= total && p !== page) onChange && onChange(p);
  };
  const pages = pageList(page, total);
  const arrow = (dir, disabled, to) => /*#__PURE__*/React.createElement("button", {
    onClick: () => go(to),
    disabled: disabled,
    "aria-label": dir === 'l' ? 'Previous' : 'Next',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-md)',
      background: '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
      opacity: disabled ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-chevron-${dir === 'l' ? 'left' : 'right'}`,
    style: {
      fontSize: 13
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, arrow('l', page <= 1, page - 1), pages.map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: `e${i}`,
    style: {
      width: 36,
      textAlign: 'center',
      color: 'var(--text-quaternary)'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => go(p),
    style: {
      minWidth: 36,
      height: 36,
      padding: '0 8px',
      border: `1px solid ${p === page ? 'var(--brand-primary)' : 'transparent'}`,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: p === page ? 'var(--blue-50)' : 'transparent',
      color: p === page ? 'var(--blue-700)' : 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 14
    }
  }, p)), arrow('r', page >= total, page + 1));
}
function pageList(page, total) {
  if (total <= 7) return Array.from({
    length: total
  }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (page >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', page - 1, page, page + 1, '…', total];
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Off The Record — Tabs. Underline or pill style segmented navigation. */
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  style = {}
}) {
  const [internal, setInternal] = React.useState(tabs[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  if (variant === 'pill') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: 'var(--neutral-50)',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, tabs.map(t => {
      const on = t.id === active;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        onClick: () => select(t.id),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 16px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 14,
          background: on ? 'var(--white)' : 'transparent',
          color: on ? 'var(--text-primary)' : 'var(--text-tertiary)',
          boxShadow: on ? 'var(--shadow-xs)' : 'none',
          transition: 'all 120ms ease'
        }
      }, t.icon && /*#__PURE__*/React.createElement("span", null, t.icon), t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          fontWeight: 700,
          color: on ? 'var(--brand-primary)' : 'var(--text-quaternary)'
        }
      }, t.count));
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      borderBottom: '1px solid var(--border-secondary)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => select(t.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 2px 12px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 14,
        marginBottom: -1,
        color: on ? 'var(--brand-primary)' : 'var(--text-tertiary)',
        borderBottom: `2px solid ${on ? 'var(--brand-primary)' : 'transparent'}`,
        transition: 'color 120ms ease'
      }
    }, t.icon && /*#__PURE__*/React.createElement("span", null, t.icon), t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        minWidth: 20,
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        padding: '1px 6px',
        borderRadius: 'var(--radius-full)',
        background: on ? 'var(--blue-50)' : 'var(--neutral-100)',
        color: on ? 'var(--blue-700)' : 'var(--text-tertiary)'
      }
    }, t.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/product/AttorneyCard.jsx
try { (() => {
/**
 * Off The Record — AttorneyCard (storefront / law-firm card)
 * Shows an attorney match: avatar, name, firm, rating, price, savings.
 */
function AttorneyCard({
  name,
  firm,
  rating,
  reviews,
  price,
  save,
  tag,
  tagTone = 'success',
  photo,
  onSelect,
  style = {}
}) {
  const DS = window.OffTheRecordDesignSystem_6eff96 || {};
  const {
    Avatar,
    Rating,
    Badge,
    Card
  } = DS;
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    onClick: onSelect,
    padding: 16,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: name,
    src: photo,
    size: "xl"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-primary)'
    }
  }, name), firm && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, firm)), tag && /*#__PURE__*/React.createElement(Badge, {
    color: tagTone,
    size: "sm"
  }, tag)), rating != null && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: rating,
    size: 15,
    showValue: true,
    count: reviews
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "$", price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, " total")), save != null && /*#__PURE__*/React.createElement(Badge, {
    color: "coral",
    variant: "soft",
    size: "sm"
  }, "Save $", save)))));
}
Object.assign(__ds_scope, { AttorneyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/AttorneyCard.jsx", error: String((e && e.message) || e) }); }

// components/product/CourtCard.jsx
try { (() => {
/**
 * Off The Record — CourtCard
 * Summarizes a case's court, date/time, and location with a status badge.
 */
function CourtCard({
  court,
  address,
  date,
  time,
  status,
  statusTone = 'brand',
  style = {}
}) {
  const DS = window.OffTheRecordDesignSystem_6eff96 || {};
  const {
    Badge
  } = DS;
  const row = (icon, label, value) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      flexShrink: 0,
      borderRadius: 'var(--radius-md)',
      background: 'var(--blue-50)',
      color: 'var(--blue-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid ${icon}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, value)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-card)',
      padding: 18,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 17,
      color: 'var(--text-primary)'
    }
  }, court), status && Badge && /*#__PURE__*/React.createElement(Badge, {
    color: statusTone,
    dot: true
  }, status)), date && row('fa-calendar-day', 'Court date', date), time && row('fa-clock', 'Time', time), address && row('fa-location-dot', 'Location', address));
}
Object.assign(__ds_scope, { CourtCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/CourtCard.jsx", error: String((e && e.message) || e) }); }

// components/product/PaymentLineItems.jsx
try { (() => {
/**
 * Off The Record — PaymentLineItems
 * Itemized fee list with a total row. Negative amounts render as green credits.
 */
function PaymentLineItems({
  items = [],
  total,
  totalLabel = 'Total due now',
  currency = '$',
  style = {}
}) {
  const computed = total != null ? total : items.reduce((s, it) => s + (it.amount || 0), 0);
  const fmt = n => n < 0 ? `-${currency}${Math.abs(n)}` : `${currency}${n}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 15,
      color: 'var(--text-secondary)'
    }
  }, it.info && /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-circle-info",
    style: {
      color: 'var(--icon-secondary)',
      fontSize: 14
    }
  }), it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: it.amount < 0 ? 'var(--text-success)' : 'var(--text-primary)'
    }
  }, fmt(it.amount)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-primary)',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      color: 'var(--text-primary)'
    }
  }, totalLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--brand-primary)'
    }
  }, currency, computed)));
}
Object.assign(__ds_scope, { PaymentLineItems });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PaymentLineItems.jsx", error: String((e && e.message) || e) }); }

// components/product/PaymentMethodSelector.jsx
try { (() => {
/**
 * Off The Record — PaymentMethodSelector
 * Radio list of saved payment methods + "add new" row.
 */
const BRAND_ICON = {
  visa: 'fa-cc-visa',
  mastercard: 'fa-cc-mastercard',
  amex: 'fa-cc-amex',
  discover: 'fa-cc-discover',
  applepay: 'fa-apple-pay',
  paypal: 'fa-paypal'
};
function PaymentMethodSelector({
  methods = [],
  value,
  onChange,
  onAdd,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, methods.map(m => {
    const on = m.id === value;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      onClick: () => onChange && onChange(m.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        cursor: 'pointer',
        background: '#fff',
        border: `1px solid ${on ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
        borderRadius: 'var(--radius-xl)',
        boxShadow: on ? 'var(--focus-ring)' : 'var(--shadow-xs)',
        transition: 'border-color 120ms ease, box-shadow 120ms ease'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: `fa-brands ${BRAND_ICON[m.brand] || 'fa-cc-stripe'}`,
      style: {
        fontSize: 26,
        color: 'var(--text-primary)',
        width: 30
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 15,
        color: 'var(--text-primary)'
      }
    }, m.label || `•••• ${m.last4}`), m.expiry && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-tertiary)'
      }
    }, "Expires ", m.expiry)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `1px solid ${on ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
        background: on ? 'var(--brand-primary)' : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#fff'
      }
    })));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 16px',
      cursor: 'pointer',
      background: 'transparent',
      border: '1.5px dashed var(--border-strong)',
      borderRadius: 'var(--radius-xl)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-link)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-plus"
  }), " Add a payment method"));
}
Object.assign(__ds_scope, { PaymentMethodSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PaymentMethodSelector.jsx", error: String((e && e.message) || e) }); }

// components/product/PaymentPlanPicker.jsx
try { (() => {
/**
 * Off The Record — PaymentPlanPicker
 * Choose pay-in-full vs. installment plan; shows per-plan price breakdown.
 */
function PaymentPlanPicker({
  plans = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, plans.map(p => {
    const on = p.id === value;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onClick: () => onChange && onChange(p.id),
      style: {
        position: 'relative',
        padding: 18,
        cursor: 'pointer',
        background: '#fff',
        border: `1px solid ${on ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
        borderRadius: 'var(--radius-2xl)',
        boxShadow: on ? 'var(--focus-ring)' : 'var(--shadow-xs)',
        transition: 'border-color 120ms ease, box-shadow 120ms ease'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        marginTop: 2,
        width: 20,
        height: 20,
        flexShrink: 0,
        borderRadius: '50%',
        border: `1px solid ${on ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
        background: on ? 'var(--brand-primary)' : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#fff'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 16,
        color: 'var(--text-primary)'
      }
    }, p.title), p.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--green-700)',
        background: 'var(--green-50)',
        border: '1px solid var(--green-200)',
        padding: '2px 8px',
        borderRadius: 'var(--radius-full)'
      }
    }, p.badge)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--text-tertiary)',
        marginTop: 2
      }
    }, p.subtitle), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 800,
        color: 'var(--text-primary)'
      }
    }, p.price, p.cadence && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-tertiary)'
      }
    }, " ", p.cadence)))));
  }));
}
Object.assign(__ds_scope, { PaymentPlanPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PaymentPlanPicker.jsx", error: String((e && e.message) || e) }); }

// components/product/QuoteCard.jsx
try { (() => {
/**
 * Off The Record — QuoteCard
 * The signature "Your instant quote" block: title, expiry, line items, total.
 */
function QuoteCard({
  title = 'Your instant quote',
  expiresIn,
  items = [],
  total,
  totalLabel = 'Total due now',
  style = {}
}) {
  const DS = window.OffTheRecordDesignSystem_6eff96 || {};
  const {
    PaymentLineItems
  } = DS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-subtle)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-3xl)',
      padding: 20,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, title), expiresIn && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--bluegray-500)',
      marginTop: 4,
      marginBottom: 16
    }
  }, "This quote will expire in ", /*#__PURE__*/React.createElement("b", null, expiresIn)), PaymentLineItems ? /*#__PURE__*/React.createElement(PaymentLineItems, {
    items: items,
    total: total,
    totalLabel: totalLabel,
    style: {
      marginTop: expiresIn ? 0 : 12
    }
  }) : null);
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/selection/PhotoUpload.jsx
try { (() => {
/** Off The Record — PhotoUpload. Dashed drop zone for citation/ID photos. */
function PhotoUpload({
  label = 'Upload a photo',
  hint = 'PNG or JPG, up to 10MB',
  value,
  onChange,
  icon,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const inputRef = React.useRef(null);
  const pick = file => {
    if (file && onChange) onChange(file);
  };
  if (value) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: 14,
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-xl)',
        background: '#fff',
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 'var(--radius-md)',
        background: 'var(--green-50)',
        color: 'var(--green-600)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-circle-check"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, typeof value === 'string' ? value : value.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-tertiary)'
      }
    }, "Uploaded")), /*#__PURE__*/React.createElement("button", {
      onClick: () => onChange && onChange(null),
      "aria-label": "Remove",
      style: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: 'var(--icon-secondary)',
        fontSize: 16
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa-solid fa-trash"
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => inputRef.current && inputRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setHover(true);
    },
    onDragLeave: () => setHover(false),
    onDrop: e => {
      e.preventDefault();
      setHover(false);
      pick(e.dataTransfer.files[0]);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '28px 20px',
      cursor: 'pointer',
      border: `1.5px dashed ${hover ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-xl)',
      background: hover ? 'var(--blue-50)' : 'var(--neutral-25)',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      transition: 'all 120ms ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: '#fff',
      border: '1px solid var(--border-secondary)',
      color: 'var(--brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18
    }
  }, icon || /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-cloud-arrow-up"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-link)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, hint), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: "image/*",
    hidden: true,
    onChange: e => pick(e.target.files[0])
  }));
}
Object.assign(__ds_scope, { PhotoUpload });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/PhotoUpload.jsx", error: String((e && e.message) || e) }); }

// components/selection/SegmentedControl.jsx
try { (() => {
/** Off The Record — SegmentedControl. 2–3 short options in a pill track. */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style = {}
}) {
  const [internal, setInternal] = React.useState(options[0]?.value ?? options[0]);
  const active = value !== undefined ? value : internal;
  const h = size === 'sm' ? 32 : 40;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 4,
      gap: 2,
      background: 'var(--neutral-50)',
      borderRadius: 'var(--radius-full)',
      height: h,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    const on = val === active;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => select(val),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '0 16px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 14,
        background: on ? '#fff' : 'transparent',
        color: on ? 'var(--text-primary)' : 'var(--text-tertiary)',
        boxShadow: on ? 'var(--shadow-xs)' : 'none',
        transition: 'all 120ms ease'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/selection/SelectionCard.jsx
try { (() => {
/**
 * Off The Record — SelectionCard
 * A selectable card wrapping a radio/checkbox — used for plan pickers, violation
 * selection, payment options. Brand-blue ring + control when selected.
 */
function SelectionCard({
  selected = false,
  onSelect,
  type = 'radio',
  title,
  description,
  icon,
  trailing,
  disabled = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => !disabled && onSelect && onSelect(),
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: 16,
      background: '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1px solid ${selected ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
      borderRadius: 'var(--radius-xl)',
      boxShadow: selected ? 'var(--focus-ring)' : 'var(--shadow-xs)',
      opacity: disabled ? 0.55 : 1,
      transition: 'border-color 120ms ease, box-shadow 120ms ease',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flexShrink: 0,
      borderRadius: 'var(--radius-md)',
      background: selected ? 'var(--blue-50)' : 'var(--neutral-50)',
      color: selected ? 'var(--blue-600)' : 'var(--icon-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-tertiary)',
      marginTop: 2,
      lineHeight: '20px'
    }
  }, description)), trailing && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      alignSelf: 'center'
    }
  }, trailing), /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 20,
      height: 20,
      marginTop: 2,
      borderRadius: type === 'checkbox' ? 'var(--radius-sm)' : '50%',
      border: `1px solid ${selected ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
      background: selected ? 'var(--brand-primary)' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, selected && (type === 'checkbox' ? /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 3.5L4.75 8.75L2 6",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#fff'
    }
  }))));
}
Object.assign(__ds_scope, { SelectionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/SelectionCard.jsx", error: String((e && e.message) || e) }); }

// components/selection/Stepper.jsx
try { (() => {
/** Off The Record — Stepper. Numeric +/- counter (violation count, quantity). */
function Stepper({
  value = 0,
  min = 0,
  max = 99,
  step = 1,
  onChange,
  size = 'md',
  style = {}
}) {
  const dim = size === 'sm' ? 32 : 40;
  const set = v => {
    const n = Math.max(min, Math.min(max, v));
    if (n !== value) onChange && onChange(n);
  };
  const btn = (label, dis, onClick) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: dis,
    "aria-label": label,
    style: {
      width: dim,
      height: dim,
      flexShrink: 0,
      border: '1px solid var(--border-primary)',
      background: '#fff',
      borderRadius: '50%',
      cursor: dis ? 'not-allowed' : 'pointer',
      color: dis ? 'var(--text-disabled)' : 'var(--text-secondary)',
      fontSize: 15,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: dis ? 0.6 : 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${label === 'Decrease' ? 'minus' : 'plus'}`
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, btn('Decrease', value <= min, () => set(value - step)), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), btn('Increase', value >= max, () => set(value + step)));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/Stepper.jsx", error: String((e && e.message) || e) }); }

// ui_kits/client-app/screens.jsx
try { (() => {
/* Off The Record — Client app UI kit screens.
   Composes the design-system components from the compiled bundle. */
const DS = window.OffTheRecordDesignSystem_6eff96;
const {
  Button,
  Link,
  Input,
  Select,
  Checkbox,
  Radio,
  Toggle,
  Badge,
  Tag,
  Avatar,
  Rating,
  Card,
  Banner,
  Toast,
  Tooltip,
  ProgressBar,
  StepProgress
} = DS;

/* ---------- shared ---------- */
function Fa({
  icon,
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    className: `fa-solid ${icon}`,
    style: style
  });
}
function AppBar({
  title,
  onBack,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 18px',
      borderBottom: '1px solid var(--border-secondary)',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 5
    }
  }, onBack ? /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Back",
    style: {
      border: 'none',
      background: 'var(--neutral-50)',
      width: 36,
      height: 36,
      borderRadius: '50%',
      cursor: 'pointer',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(Fa, {
    icon: "fa-arrow-left"
  })) : /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/brandmark-navy.svg",
    height: "26",
    alt: "OTR"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontWeight: 700,
      fontSize: 17,
      color: 'var(--text-primary)',
      letterSpacing: '0.01em'
    }
  }, title), right);
}
function TabBar({
  tab,
  setTab
}) {
  const tabs = [{
    id: 'home',
    icon: 'fa-magnifying-glass',
    label: 'Find'
  }, {
    id: 'cases',
    icon: 'fa-folder-open',
    label: 'Cases'
  }, {
    id: 'account',
    icon: 'fa-user',
    label: 'Account'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '1px solid var(--border-secondary)',
      background: '#fff'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      flex: 1,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '10px 0 14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      color: tab === t.id ? 'var(--brand-primary)' : 'var(--text-quaternary)'
    }
  }, /*#__PURE__*/React.createElement(Fa, {
    icon: t.icon,
    style: {
      fontSize: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600
    }
  }, t.label))));
}

/* ---------- Screen 1: Storefront / attorney match ---------- */
const ATTORNEYS = [{
  id: 1,
  name: 'Dana Whitfield',
  firm: 'Whitfield Traffic Defense',
  rating: 4.9,
  reviews: 1284,
  price: 109,
  save: 240,
  tag: 'Best match',
  initials: 'DW',
  tone: 'brand'
}, {
  id: 2,
  name: 'Marcus Reyes',
  firm: 'Reyes Legal Group',
  rating: 4.8,
  reviews: 932,
  price: 129,
  save: 180,
  tag: 'Top rated',
  initials: 'MR',
  tone: 'purple'
}, {
  id: 3,
  name: 'Priya Anand',
  firm: 'Anand & Associates',
  rating: 4.7,
  reviews: 651,
  price: 99,
  save: 150,
  tag: null,
  initials: 'PA',
  tone: 'coral'
}];
function Storefront({
  onPick
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-600)',
      padding: '20px 18px 24px',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(255,255,255,0.16)',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: 12,
      fontWeight: 600,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Fa, {
    icon: "fa-location-dot"
  }), " Los Angeles County, CA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      lineHeight: 1.2
    }
  }, "3 attorneys can fight your speeding ticket"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      opacity: 0.85,
      marginTop: 6
    }
  }, "No court, no points, money-back guarantee.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true
  }, "All"), /*#__PURE__*/React.createElement(Tag, null, "Highest rated"), /*#__PURE__*/React.createElement(Tag, null, "Lowest price"), /*#__PURE__*/React.createElement(Tag, null, "Fastest")), ATTORNEYS.map(a => /*#__PURE__*/React.createElement(Card, {
    key: a.id,
    interactive: true,
    onClick: () => onPick(a),
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: a.name,
    size: "xl"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-primary)'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, a.firm)), a.tag && /*#__PURE__*/React.createElement(Badge, {
    color: a.id === 1 ? 'success' : 'brand',
    size: "sm"
  }, a.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: a.rating,
    size: 15,
    showValue: true,
    count: a.reviews
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "$", a.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, " total")), /*#__PURE__*/React.createElement(Badge, {
    color: "coral",
    variant: "soft",
    size: "sm"
  }, "Save $", a.save))))))));
}

/* ---------- Screen 2: Quote / checkout ---------- */
function Quote({
  attorney,
  onBack,
  onConfirm
}) {
  const [plan, setPlan] = React.useState('full');
  const lines = [{
    label: 'Legal fee',
    amount: attorney.price,
    info: true
  }, {
    label: 'Service fee',
    amount: 10,
    info: true
  }, {
    label: 'New customer discount',
    amount: -10,
    info: false,
    credit: true
  }];
  const total = lines.reduce((s, l) => s + l.amount, 0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Your quote",
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: attorney.name,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16
    }
  }, attorney.name), /*#__PURE__*/React.createElement(Rating, {
    value: attorney.rating,
    size: 14,
    showValue: true,
    count: attorney.reviews
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-subtle)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-3xl)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: 'var(--text-primary)'
    }
  }, "Your instant quote"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--bluegray-500)',
      marginTop: 4,
      marginBottom: 16
    }
  }, "This quote will expire in ", /*#__PURE__*/React.createElement("b", null, "29 minutes")), lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 15,
      color: 'var(--text-secondary)'
    }
  }, l.info && /*#__PURE__*/React.createElement(Fa, {
    icon: "fa-circle-info",
    style: {
      color: 'var(--icon-secondary)',
      fontSize: 14
    }
  }), l.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: l.credit ? 'var(--green-700)' : 'var(--text-primary)'
    }
  }, l.amount < 0 ? `-$${Math.abs(l.amount)}` : `$${l.amount}`))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-primary)',
      margin: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 18
    }
  }, "Total due now"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--brand-primary)'
    }
  }, "$", total))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      marginBottom: 10
    }
  }, "How would you like to pay?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 14,
    selected: plan === 'full',
    interactive: true,
    onClick: () => setPlan('full')
  }, /*#__PURE__*/React.createElement(Radio, {
    checked: plan === 'full',
    onChange: () => setPlan('full'),
    label: "Pay in full today",
    hint: `$${total} · save 10%`
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 14,
    selected: plan === 'monthly',
    interactive: true,
    onClick: () => setPlan('monthly')
  }, /*#__PURE__*/React.createElement(Radio, {
    checked: plan === 'monthly',
    onChange: () => setPlan('monthly'),
    label: "Pay monthly",
    hint: `4 payments of $${Math.round(total / 4 + 3)}`
  })))), /*#__PURE__*/React.createElement(Banner, {
    tone: "success",
    title: "Money-back guarantee"
  }, "If your ticket isn't dismissed or reduced, you don't pay the legal fee."), /*#__PURE__*/React.createElement(Button, {
    size: "xl",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement(Fa, {
      icon: "fa-arrow-right"
    }),
    onClick: onConfirm
  }, "Hire ", attorney.name.split(' ')[0], " \xB7 $", total), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--text-quaternary)'
    }
  }, /*#__PURE__*/React.createElement(Fa, {
    icon: "fa-lock"
  }), " Secure checkout \xB7 cancel anytime")));
}

/* ---------- Screen 3: Cases (client portal) ---------- */
const CASES = [{
  id: 1,
  charge: 'Speeding 80/65',
  court: 'LA Superior Court',
  date: 'Apr 18, 2026',
  status: 'In progress',
  tone: 'brand',
  attorney: 'Dana Whitfield',
  progress: 60
}, {
  id: 2,
  charge: 'Red light camera',
  court: 'Orange County',
  date: 'Resolved Mar 2',
  status: 'Dismissed',
  tone: 'success',
  attorney: 'Marcus Reyes',
  progress: 100
}];
function Cases({
  onNew
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "My cases",
    right: /*#__PURE__*/React.createElement(Avatar, {
      name: "Jordan Rivera",
      size: "sm"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    title: "Verify your email",
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary"
    }, "Resend link"),
    onClose: () => {}
  }), CASES.map(c => /*#__PURE__*/React.createElement(Card, {
    key: c.id,
    padding: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 17,
      color: 'var(--text-primary)'
    }
  }, c.charge), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)',
      marginTop: 2
    }
  }, c.court)), /*#__PURE__*/React.createElement(Badge, {
    color: c.tone,
    dot: true
  }, c.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      margin: '14px 0'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.attorney,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, c.attorney), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Fa, {
    icon: "fa-calendar"
  }), " ", c.date)), /*#__PURE__*/React.createElement(ProgressBar, {
    value: c.progress,
    color: c.tone === 'success' ? 'var(--green-500)' : 'var(--brand-primary)',
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Fa, {
      icon: "fa-message"
    })
  }, "Message"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Fa, {
      icon: "fa-file-lines"
    })
  }, "Documents")))), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Fa, {
      icon: "fa-plus"
    }),
    onClick: onNew
  }, "Fight another ticket")));
}

/* ---------- Account ---------- */
function Account() {
  const [notify, setNotify] = React.useState(true);
  const [texts, setTexts] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Account"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jordan Rivera",
    size: "2xl",
    status: "online"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18
    }
  }, "Jordan Rivera"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-tertiary)'
    }
  }, "jordan@email.com"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    color: "purple",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Fa, {
      icon: "fa-bolt"
    })
  }, "Fastlane member")))), /*#__PURE__*/React.createElement(Card, {
    padding: 4
  }, [['fa-credit-card', 'Payment methods'], ['fa-bell', 'Notifications'], ['fa-shield-halved', 'Privacy & security'], ['fa-circle-question', 'Help center']].map(([ic, lbl], i, arr) => /*#__PURE__*/React.createElement("div", {
    key: lbl,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      borderBottom: i < arr.length - 1 ? '1px solid var(--border-secondary)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-md)',
      background: 'var(--blue-50)',
      color: 'var(--blue-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Fa, {
    icon: ic
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: 600,
      fontSize: 15
    }
  }, lbl), /*#__PURE__*/React.createElement(Fa, {
    icon: "fa-chevron-right",
    style: {
      color: 'var(--icon-secondary)',
      fontSize: 13
    }
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: 16
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: notify,
    onChange: () => setNotify(!notify),
    label: "Push notifications",
    hint: "Court reminders & case updates"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-secondary)',
      margin: '14px 0'
    }
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: texts,
    onChange: () => setTexts(!texts),
    label: "Text me updates"
  }))));
}
Object.assign(window, {
  OTR_Storefront: Storefront,
  OTR_Quote: Quote,
  OTR_Cases: Cases,
  OTR_Account: Account,
  OTR_TabBar: TabBar,
  OTR_AppBar: AppBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/client-app/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Link = __ds_scope.Link;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.CalloutCard = __ds_scope.CalloutCard;

__ds_ns.PromoCard = __ds_scope.PromoCard;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.SkeletonCard = __ds_scope.SkeletonCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StepProgress = __ds_scope.StepProgress;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.FeatureIcon = __ds_scope.FeatureIcon;

__ds_ns.ICON_DATA = __ds_scope.ICON_DATA;

__ds_ns.FA_FALLBACK = __ds_scope.FA_FALLBACK;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.AttorneyCard = __ds_scope.AttorneyCard;

__ds_ns.CourtCard = __ds_scope.CourtCard;

__ds_ns.PaymentLineItems = __ds_scope.PaymentLineItems;

__ds_ns.PaymentMethodSelector = __ds_scope.PaymentMethodSelector;

__ds_ns.PaymentPlanPicker = __ds_scope.PaymentPlanPicker;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.PhotoUpload = __ds_scope.PhotoUpload;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.SelectionCard = __ds_scope.SelectionCard;

__ds_ns.Stepper = __ds_scope.Stepper;

})();
