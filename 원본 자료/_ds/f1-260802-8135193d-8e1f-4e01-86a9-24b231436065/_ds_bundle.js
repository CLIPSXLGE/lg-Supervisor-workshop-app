/* @ds-bundle: {"format":4,"namespace":"APEXGPRaceDesignSystem_813519","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Toast","sourcePath":"components/core/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/core/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"LapTime","sourcePath":"components/race/LapTime.jsx"},{"name":"PositionPodium","sourcePath":"components/race/PositionPodium.jsx"},{"name":"SectorBar","sourcePath":"components/race/SectorBar.jsx"},{"name":"StandingRow","sourcePath":"components/race/StandingRow.jsx"},{"name":"StatTile","sourcePath":"components/race/StatTile.jsx"},{"name":"TyreCompound","sourcePath":"components/race/TyreCompound.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"436c4c451449","components/core/Button.jsx":"0192cc471bd4","components/core/Card.jsx":"f9169a60d408","components/core/Dialog.jsx":"1619b56bb21e","components/core/IconButton.jsx":"680a3b542701","components/core/Tabs.jsx":"f83f3ef9a3d8","components/core/Tag.jsx":"31b175ad759a","components/core/Toast.jsx":"56e3865cbc5e","components/core/Tooltip.jsx":"e347006c7833","components/forms/Checkbox.jsx":"aedf4a07392d","components/forms/Input.jsx":"f730fbba8a07","components/forms/Radio.jsx":"939a683219ed","components/forms/Select.jsx":"7fc209f24abf","components/forms/Switch.jsx":"db0783467b94","components/race/LapTime.jsx":"3a042c48adb9","components/race/PositionPodium.jsx":"18c3647ea9dc","components/race/SectorBar.jsx":"6b255f6b5dad","components/race/StandingRow.jsx":"3c138b32045c","components/race/StatTile.jsx":"f48ff26bcd45","components/race/TyreCompound.jsx":"362ade59251f","ui_kits/companion_app/Phone.jsx":"29ee8c0060b4","ui_kits/companion_app/TabBar.jsx":"3bf14a5ea3f3","ui_kits/companion_app/app.jsx":"12ca23ea71dd","ui_kits/companion_app/screens.jsx":"04eb2a0ae45a","ui_kits/race_center/AppShell.jsx":"f63a7e4fa3c2","ui_kits/race_center/CalendarScreen.jsx":"e506ccdf2d95","ui_kits/race_center/LiveTimingScreen.jsx":"42dcf582e064","ui_kits/race_center/StandingsScreen.jsx":"733e6e38eb51","ui_kits/race_center/TeamScreen.jsx":"a1f805b7690f","ui_kits/race_center/app.jsx":"2b680682ab7a","ui_kits/race_center/data.js":"10e5ccc442f4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.APEXGPRaceDesignSystem_813519 = window.APEXGPRaceDesignSystem_813519 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  live: {
    background: "var(--red-500)",
    color: "#fff"
  },
  neutral: {
    background: "var(--carbon-700)",
    color: "var(--text-body)"
  },
  yellow: {
    background: "var(--grid-yellow)",
    color: "var(--carbon-950)"
  },
  green: {
    background: "var(--grid-green)",
    color: "var(--carbon-950)"
  },
  blue: {
    background: "var(--grid-azure)",
    color: "#fff"
  },
  outline: {
    background: "transparent",
    color: "var(--text-primary)",
    boxShadow: "inset 0 0 0 1px var(--border-strong)"
  }
};
function Badge({
  tone = "neutral",
  skew = true,
  pulse = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 22,
      padding: "0 10px",
      whiteSpace: "nowrap",
      flex: "none",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-label-sm)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      borderRadius: "var(--radius-1)",
      transform: skew ? "skewX(var(--italic-skew))" : undefined,
      ...tones[tone],
      ...style
    }
  }), pulse && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "currentColor",
      animation: "apexPulse 1.2s var(--ease-inout) infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      transform: skew ? "skewX(9deg)" : undefined
    }
  }, children), /*#__PURE__*/React.createElement("style", null, "@keyframes apexPulse{0%,100%{opacity:1}50%{opacity:.25}}"));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    height: "var(--control-sm)",
    padding: "0 16px",
    fontSize: "12px"
  },
  md: {
    height: "var(--control-md)",
    padding: "0 22px",
    fontSize: "13px"
  },
  lg: {
    height: "var(--control-lg)",
    padding: "0 30px",
    fontSize: "15px"
  }
};
const variants = {
  primary: {
    background: "var(--red-500)",
    color: "#fff",
    border: "1px solid var(--red-500)"
  },
  secondary: {
    background: "var(--carbon-800)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-line)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-body)",
    border: "1px solid transparent"
  },
  outline: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-strong)"
  },
  inverse: {
    background: "var(--white)",
    color: "var(--carbon-950)",
    border: "1px solid var(--white)"
  }
};
const hovers = {
  primary: {
    background: "var(--red-400)",
    borderColor: "var(--red-400)"
  },
  secondary: {
    background: "var(--carbon-700)"
  },
  ghost: {
    background: "var(--carbon-850)",
    color: "var(--text-primary)"
  },
  outline: {
    background: "rgba(255,255,255,.06)"
  },
  inverse: {
    background: "var(--neutral-100)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  skew = false,
  iconLeft,
  iconRight,
  disabled,
  fullWidth,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    onMouseEnter: e => {
      setHover(true);
      rest.onMouseEnter && rest.onMouseEnter(e);
    },
    onMouseLeave: e => {
      setHover(false);
      setPress(false);
      rest.onMouseLeave && rest.onMouseLeave(e);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "var(--transition-control)",
      transform: `${skew ? "skewX(var(--italic-skew)) " : ""}translateY(${press && !disabled ? 1 : 0}px)`,
      boxShadow: variant === "primary" && hover && !disabled ? "var(--shadow-accent)" : "none",
      ...sizes[size],
      ...variants[variant],
      ...(hover && !disabled ? hovers[variant] : null),
      ...(press && !disabled && variant === "primary" ? {
        background: "var(--red-600)",
        borderColor: "var(--red-600)"
      } : null),
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "contents",
      transform: skew ? "skewX(9deg)" : undefined
    }
  }, iconLeft), /*#__PURE__*/React.createElement("span", {
    style: {
      transform: skew ? "skewX(9deg)" : undefined
    }
  }, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  accent,
  title,
  eyebrow,
  action,
  interactive = false,
  padding = "var(--space-5)",
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      background: hover && interactive ? "var(--surface-card-hover)" : "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-2)",
      padding,
      paddingLeft: accent ? `calc(${padding} + 4px)` : padding,
      overflow: "hidden",
      cursor: interactive ? "pointer" : undefined,
      transition: "background-color var(--dur-2) var(--ease-out)",
      ...style
    }
  }), accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: accent
    }
  }), (eyebrow || title || action) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: children ? "var(--space-4)" : 0
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginBottom: 4
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-h3)",
      textTransform: "uppercase",
      color: "var(--text-primary)",
      lineHeight: 1.1
    }
  }, title)), action), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  eyebrow,
  onClose,
  footer,
  width = 520,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "grid",
      placeItems: "center",
      padding: 24,
      background: "rgba(6,7,10,.72)",
      backdropFilter: "blur(6px)",
      animation: "apexFade var(--dur-3) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--bg-elevated)",
      border: "1px solid var(--border-line)",
      borderRadius: "var(--radius-4)",
      boxShadow: "var(--shadow-3)",
      overflow: "hidden",
      animation: "apexRise var(--dur-3) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-h2)",
      textTransform: "uppercase",
      color: "var(--text-primary)"
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      color: "var(--text-body)",
      fontSize: "var(--fs-body)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5) var(--space-6)",
      borderTop: "1px solid var(--border-hairline)",
      display: "flex",
      justifyContent: "flex-end",
      gap: 12,
      background: "var(--carbon-900)"
    }
  }, footer)), /*#__PURE__*/React.createElement("style", null, "@keyframes apexFade{from{opacity:0}to{opacity:1}}@keyframes apexRise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}"));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  size = "md",
  variant = "ghost",
  label,
  active,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? "var(--red-500)" : variant === "solid" ? "var(--carbon-800)" : "transparent";
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: sizes[size],
      height: sizes[size],
      display: "inline-grid",
      placeItems: "center",
      background: hover && !active && !disabled ? "var(--carbon-800)" : bg,
      color: active ? "#fff" : "var(--text-muted)",
      border: variant === "solid" ? "1px solid var(--border-hairline)" : "1px solid transparent",
      borderRadius: "var(--radius-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transition: "var(--transition-control)",
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  variant = "underline",
  style,
  ...rest
}) {
  const active = value ?? items[0]?.id;
  const pill = variant === "pill";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "tablist",
    style: {
      display: "inline-flex",
      gap: pill ? 4 : "var(--space-6)",
      background: pill ? "var(--carbon-850)" : "transparent",
      border: pill ? "1px solid var(--border-hairline)" : "none",
      borderBottom: pill ? "1px solid var(--border-hairline)" : "1px solid var(--border-hairline)",
      borderRadius: pill ? "var(--radius-pill)" : 0,
      padding: pill ? 4 : 0,
      ...style
    }
  }), items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(it.id),
      style: {
        border: "none",
        cursor: "pointer",
        background: pill && on ? "var(--red-500)" : "transparent",
        color: on ? pill ? "#fff" : "var(--text-primary)" : "var(--text-muted)",
        fontFamily: "var(--font-display)",
        fontWeight: "var(--fw-bold)",
        fontSize: "var(--fs-label)",
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase",
        padding: pill ? "6px 16px" : "0 0 12px",
        borderRadius: pill ? "var(--radius-pill)" : 0,
        boxShadow: !pill && on ? "inset 0 -2px 0 var(--red-500)" : "none",
        transition: "var(--transition-control)"
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  color = "var(--grid-silver)",
  filled = false,
  onRemove,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 26,
      padding: onRemove ? "0 8px 0 12px" : "0 12px",
      borderRadius: "var(--radius-pill)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-medium)",
      fontFamily: "var(--font-core)",
      background: filled ? color : "transparent",
      color: filled ? "var(--carbon-950)" : "var(--text-body)",
      boxShadow: filled ? "none" : "inset 0 0 0 1px var(--border-line)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: filled ? "rgba(6,7,10,.55)" : color
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: "none",
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
      fontSize: 14,
      lineHeight: 1,
      padding: 2
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  info: "var(--grid-azure)",
  success: "var(--grid-green)",
  warn: "var(--grid-yellow)",
  danger: "var(--red-500)"
};
function Toast({
  tone = "info",
  title,
  children,
  onDismiss,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "status",
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      minWidth: 300,
      maxWidth: 420,
      background: "var(--carbon-850)",
      border: "1px solid var(--border-line)",
      borderRadius: "var(--radius-2)",
      boxShadow: "var(--shadow-2)",
      padding: "14px 16px 14px 0",
      overflow: "hidden",
      position: "relative",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: tones[tone]
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 20,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-label)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: tones[tone]
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-body)",
      fontSize: "var(--fs-body-sm)",
      marginTop: 4
    }
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      background: "transparent",
      border: "none",
      color: "var(--text-faint)",
      cursor: "pointer",
      fontSize: 16,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

// components/core/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = "top",
  children
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === "top" ? {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      zIndex: 40,
      whiteSpace: "nowrap",
      background: "var(--white)",
      color: "var(--carbon-950)",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-label-sm)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      padding: "5px 9px",
      borderRadius: "var(--radius-1)",
      boxShadow: "var(--shadow-2)"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: !!checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked)
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-1)",
      background: checked ? "var(--red-500)" : "var(--surface-inset)",
      border: `1px solid ${checked ? "var(--red-500)" : "var(--border-line)"}`,
      transition: "var(--transition-control)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 5,
      borderLeft: "2px solid #fff",
      borderBottom: "2px solid #fff",
      transform: "rotate(-45deg) translate(1px,-1px)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  numeric = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      display: "block",
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: "var(--control-md)",
      padding: "0 12px",
      background: "var(--surface-inset)",
      borderRadius: "var(--radius-2)",
      border: `1px solid ${error ? "var(--red-500)" : focus ? "var(--red-500)" : "var(--border-line)"}`,
      boxShadow: focus ? "0 0 0 3px rgba(225,6,0,.18)" : "none",
      transition: "var(--transition-control)"
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      display: "flex"
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "var(--text-primary)",
      fontSize: "var(--fs-body)",
      fontFamily: numeric ? "var(--font-numeric)" : "var(--font-core)",
      fontWeight: numeric ? 700 : 400,
      fontVariantNumeric: numeric ? "tabular-nums" : undefined
    }
  })), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontSize: "var(--fs-caption)"
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 6,
      fontSize: "var(--fs-caption)",
      color: error ? "var(--red-400)" : "var(--text-faint)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  checked,
  onChange,
  name,
  value,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: !!checked,
    disabled: disabled,
    onChange: () => onChange && onChange(value)
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 999,
      display: "grid",
      placeItems: "center",
      background: "var(--surface-inset)",
      border: `1px solid ${checked ? "var(--red-500)" : "var(--border-line)"}`,
      transition: "var(--transition-control)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: "var(--red-500)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  hint,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      display: "block",
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      width: "100%",
      height: "var(--control-md)",
      padding: "0 36px 0 12px",
      background: "var(--surface-inset)",
      color: "var(--text-primary)",
      border: `1px solid ${focus ? "var(--red-500)" : "var(--border-line)"}`,
      borderRadius: "var(--radius-2)",
      fontFamily: "var(--font-core)",
      fontSize: "var(--fs-body)",
      outline: "none",
      cursor: "pointer",
      transition: "var(--transition-control)"
    }
  }), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    style: {
      background: "var(--carbon-850)"
    }
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      marginTop: -3,
      width: 8,
      height: 8,
      borderRight: "2px solid var(--text-muted)",
      borderBottom: "2px solid var(--text-muted)",
      transform: "rotate(45deg)",
      pointerEvents: "none"
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 6,
      fontSize: "var(--fs-caption)",
      color: "var(--text-faint)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": !!checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked)
  }, rest, {
    style: {
      width: 44,
      height: 24,
      borderRadius: "var(--radius-pill)",
      position: "relative",
      cursor: "inherit",
      background: checked ? "var(--red-500)" : "var(--carbon-700)",
      border: "1px solid " + (checked ? "var(--red-500)" : "var(--border-line)"),
      transition: "var(--transition-control)",
      padding: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 22 : 2,
      width: 18,
      height: 18,
      borderRadius: 999,
      background: "#fff",
      transition: "left var(--dur-2) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/race/LapTime.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  best: "var(--timing-purple)",
  personal: "var(--timing-green)",
  slower: "var(--timing-yellow)",
  set: "var(--timing-white)"
};
function LapTime({
  time,
  tone = "set",
  label,
  size = "md",
  flash = false,
  style,
  ...rest
}) {
  const fs = size === "lg" ? "var(--fs-num-lg)" : size === "sm" ? "var(--fs-num-sm)" : "var(--fs-num-md)";
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      gap: 2,
      ...style
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      fontSize: 10
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: fs,
      color: tones[tone],
      lineHeight: 1,
      animation: flash ? "apexFlash var(--dur-5) var(--ease-out)" : undefined
    }
  }, time), /*#__PURE__*/React.createElement("style", null, "@keyframes apexFlash{0%{filter:brightness(2.2)}100%{filter:none}}"));
}
Object.assign(__ds_scope, { LapTime });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/race/LapTime.jsx", error: String((e && e.message) || e) }); }

// components/race/PositionPodium.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Podium block: giant ghost numeral on a livery field with a bottom scrim. */
function PositionPodium({
  position,
  surname,
  given,
  color = "var(--grid-teal)",
  photo,
  height = 300,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: "relative",
      height,
      borderRadius: "var(--radius-2)",
      overflow: "hidden",
      background: `linear-gradient(180deg, ${color} 0%, color-mix(in srgb, ${color} 45%, var(--carbon-950)) 100%)`,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      position: "absolute",
      top: -8,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: Math.round(height * 0.62),
      lineHeight: 1,
      color: "rgba(255,255,255,.9)",
      opacity: .95
    }
  }, position), photo && /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top center"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: Math.round(height * 0.16),
      lineHeight: .9,
      textTransform: "uppercase",
      color: "#fff"
    }
  }, surname), given && /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      color: "rgba(255,255,255,.75)",
      marginTop: 6
    }
  }, given)));
}
Object.assign(__ds_scope, { PositionPodium });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/race/PositionPodium.jsx", error: String((e && e.message) || e) }); }

// components/race/SectorBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  best: "var(--timing-purple)",
  personal: "var(--timing-green)",
  slower: "var(--timing-yellow)",
  none: "var(--carbon-700)"
};
function SectorBar({
  sectors = [],
  width,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      gap: 3,
      width,
      ...style
    }
  }), sectors.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: `S${i + 1}`,
    style: {
      flex: 1,
      height: 8,
      minWidth: 22,
      background: tones[s] || tones.none,
      clipPath: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)"
    }
  })));
}
Object.assign(__ds_scope, { SectorBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/race/SectorBar.jsx", error: String((e && e.message) || e) }); }

// components/race/StandingRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One skewed livery bar in a standings list. Rows sit 2px apart, flush, no rounding. */
function StandingRow({
  position,
  name,
  surname,
  team,
  color = "var(--grid-silver)",
  value,
  unit,
  delta,
  mark,
  height = 46,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      height,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      width: 44,
      textAlign: "right",
      fontSize: "var(--fs-num-md)",
      color: "var(--text-primary)",
      flex: "none"
    }
  }, position), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      flex: "none",
      display: "grid",
      placeItems: "center",
      overflow: "hidden"
    }
  }, mark), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      position: "relative",
      background: `linear-gradient(90deg, ${color} 0%, ${color} 62%, color-mix(in srgb, ${color} 55%, var(--carbon-950)) 100%)`,
      clipPath: "polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
      filter: hover ? "brightness(1.12)" : "none",
      transition: "filter var(--dur-2) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 17,
      textTransform: "uppercase",
      color: "rgba(255,255,255,.82)"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 21,
      textTransform: "uppercase",
      color: "#fff",
      letterSpacing: ".01em"
    }
  }, surname), team && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.6)"
    }
  }, team)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      flex: "none"
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: 14,
      color: "rgba(255,255,255,.7)"
    }
  }, delta), /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: "var(--fs-num-md)",
      color: "#fff"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      color: "rgba(255,255,255,.7)",
      fontSize: 10
    }
  }, unit))));
}
Object.assign(__ds_scope, { StandingRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/race/StandingRow.jsx", error: String((e && e.message) || e) }); }

// components/race/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatTile({
  label,
  value,
  unit,
  sub,
  accent = "var(--text-primary)",
  size = "md",
  style,
  ...rest
}) {
  const fs = size === "lg" ? "var(--fs-num-lg)" : size === "sm" ? "var(--fs-num-sm)" : "var(--fs-num-md)";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      background: "var(--surface-inset)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-2)",
      padding: "12px 14px",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      fontSize: "var(--fs-label-sm)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: fs,
      color: accent,
      lineHeight: 1
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      fontSize: 10,
      color: "var(--text-muted)"
    }
  }, unit)), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-faint)",
      marginTop: 6
    }
  }, sub));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/race/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/race/TyreCompound.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const map = {
  soft: {
    color: "var(--tyre-soft)",
    short: "S",
    name: "SOFT"
  },
  medium: {
    color: "var(--tyre-medium)",
    short: "M",
    name: "MEDIUM"
  },
  hard: {
    color: "var(--tyre-hard)",
    short: "H",
    name: "HARD"
  },
  inter: {
    color: "var(--tyre-inter)",
    short: "I",
    name: "INTER"
  },
  wet: {
    color: "var(--tyre-wet)",
    short: "W",
    name: "WET"
  }
};
function TyreCompound({
  compound = "soft",
  code,
  size = 40,
  showName = false,
  style,
  ...rest
}) {
  const t = map[compound] || map.soft;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      flex: "none",
      border: `${Math.max(4, Math.round(size * 0.16))}px solid ${t.color}`,
      background: "var(--carbon-900)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: Math.round(size * 0.42),
      color: "var(--white)"
    }
  }, code || t.short)), showName && /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      color: t.color
    }
  }, t.name));
}
Object.assign(__ds_scope, { TyreCompound });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/race/TyreCompound.jsx", error: String((e && e.message) || e) }); }

// ui_kits/companion_app/Phone.jsx
try { (() => {
function Phone({
  children,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 780,
      borderRadius: 44,
      background: "var(--carbon-1000)",
      border: "1px solid var(--carbon-600)",
      boxShadow: "var(--shadow-3)",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 46,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flex: "none",
      position: "relative",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: 13,
      color: "#fff"
    }
  }, "14:08"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: 8,
      width: 104,
      height: 26,
      borderRadius: 999,
      background: "#000"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      fontSize: 10,
      color: "#fff"
    }
  }, "5G \u25AE")), children), /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      fontSize: 10
    }
  }, label));
}
window.Phone = Phone;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/companion_app/Phone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/companion_app/TabBar.jsx
try { (() => {
function TabBar({
  tab,
  onTab
}) {
  const items = [{
    id: "feed",
    label: "Feed"
  }, {
    id: "live",
    label: "Live"
  }, {
    id: "standings",
    label: "Table"
  }, {
    id: "me",
    label: "Me"
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: "none",
      height: 76,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      background: "var(--scrim-glass)",
      backdropFilter: "var(--blur-glass)",
      borderTop: "1px solid var(--border-hairline)",
      paddingBottom: 14
    }
  }, items.map(i => {
    const on = i.id === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: i.id,
      onClick: () => onTab(i.id),
      style: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        gap: 6,
        color: on ? "#fff" : "var(--text-faint)",
        minHeight: 48
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 3,
        background: on ? "var(--red-500)" : "var(--carbon-600)",
        transform: "skewX(-9deg)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: "var(--ls-label)",
        textTransform: "uppercase"
      }
    }, i.label));
  }));
}
window.TabBar = TabBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/companion_app/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/companion_app/app.jsx
try { (() => {
function PhoneApp({
  initial,
  label
}) {
  const [tab, setTab] = React.useState(initial);
  const S = {
    feed: window.FeedScreen,
    live: window.LiveScreen,
    standings: window.StandingsScreenM,
    me: window.MeScreen
  }[tab];
  return /*#__PURE__*/React.createElement(Phone, {
    label: label
  }, /*#__PURE__*/React.createElement(S, null), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    onTab: setTab
  }));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 40,
      padding: "48px",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(PhoneApp, {
    initial: "feed",
    label: "Feed"
  }), /*#__PURE__*/React.createElement(PhoneApp, {
    initial: "live",
    label: "Live timing"
  }), /*#__PURE__*/React.createElement(PhoneApp, {
    initial: "standings",
    label: "Standings"
  }), /*#__PURE__*/React.createElement(PhoneApp, {
    initial: "me",
    label: "Account"
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/companion_app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/companion_app/screens.jsx
try { (() => {
const {
  Badge,
  Card,
  StatTile,
  LapTime,
  SectorBar,
  TyreCompound,
  StandingRow,
  Button,
  Switch,
  Tag,
  Tabs
} = window.APEXGPRaceDesignSystem_813519;
function ScreenHead({
  eyebrow,
  title,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 16px",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginBottom: 6
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 34,
      lineHeight: .95,
      textTransform: "uppercase",
      color: "#fff"
    }
  }, title)), right);
}
const Body = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    overflowY: "auto",
    background: "var(--bg-page)"
  }
}, children);
function FeedScreen() {
  const d = window.APEX_DATA;
  return /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(ScreenHead, {
    eyebrow: "Round 20 \xB7 Mexico",
    title: "My feed",
    right: /*#__PURE__*/React.createElement(Badge, {
      tone: "live",
      pulse: true
    }, "Live")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px",
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 200,
      borderRadius: "var(--radius-2)",
      overflow: "hidden",
      background: "var(--grad-accent)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "var(--texture-speedlines)",
      opacity: .5
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 18,
      right: 18,
      bottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      color: "rgba(255,255,255,.8)"
    }
  }, "Lap 41 / 58"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 30,
      lineHeight: .95,
      color: "#fff",
      textTransform: "uppercase",
      marginTop: 6
    }
  }, "Russell holds", /*#__PURE__*/React.createElement("br", null), "a 1.2s lead"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Fastest lap",
    value: "1:20.305",
    accent: "var(--timing-purple)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Pit stops",
    value: "14",
    sub: "Median 2.41s"
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Next round",
    title: "S\xE3o Paulo",
    accent: "var(--grid-green)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow"
  }, "09 NOV \xB7 14:00"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "Remind me"))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Strategy",
    title: "Tyre state"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TyreCompound, {
    compound: "medium",
    code: "C4",
    size: 38,
    showName: true
  }), /*#__PURE__*/React.createElement(TyreCompound, {
    compound: "hard",
    code: "C3",
    size: 38,
    showName: true
  })))));
}
function LiveScreen() {
  const d = window.APEX_DATA;
  return /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(ScreenHead, {
    eyebrow: "Live timing",
    title: "Mexico GP",
    right: /*#__PURE__*/React.createElement(Badge, {
      tone: "yellow"
    }, "VSC")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, d.timing.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.code,
    style: {
      display: "grid",
      gridTemplateColumns: "32px 1fr auto",
      alignItems: "center",
      gap: 12,
      padding: "10px 20px",
      background: i % 2 ? "var(--carbon-900)" : "var(--carbon-850)",
      borderLeft: "4px solid " + r.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: 20,
      color: "#fff"
    }
  }, r.pos), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 15,
      textTransform: "uppercase",
      color: "#fff"
    }
  }, r.surname), /*#__PURE__*/React.createElement(SectorBar, {
    sectors: r.sectors,
    style: {
      display: "flex",
      marginTop: 6,
      width: 88
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(LapTime, {
    time: r.last,
    tone: r.tone,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "apex-num",
    style: {
      fontSize: 12,
      color: "var(--text-faint)",
      marginTop: 4
    }
  }, r.gap))))));
}
function StandingsScreenM() {
  const d = window.APEX_DATA;
  const [t, setT] = React.useState("drivers");
  return /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(ScreenHead, {
    eyebrow: "Championship",
    title: "Standings"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 14px"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: [{
      id: "drivers",
      label: "Drivers"
    }, {
      id: "teams",
      label: "Teams"
    }],
    value: t,
    onChange: setT
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2,
      paddingBottom: 20
    }
  }, t === "drivers" ? d.drivers.map(x => /*#__PURE__*/React.createElement(StandingRow, {
    key: x.code,
    position: x.pos,
    surname: x.surname,
    color: x.color,
    value: x.pts,
    unit: "pts",
    height: 40,
    style: {
      paddingRight: 12
    }
  })) : d.teams.map(x => /*#__PURE__*/React.createElement(StandingRow, {
    key: x.name,
    position: x.rank,
    surname: x.name,
    color: x.color,
    value: x.pts,
    unit: "pts",
    height: 44,
    style: {
      paddingRight: 12
    }
  }))));
}
function MeScreen() {
  const [live, setLive] = React.useState(true);
  const [push, setPush] = React.useState(false);
  return /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(ScreenHead, {
    eyebrow: "Account",
    title: "My races"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px",
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-4)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 999,
      background: "var(--carbon-700)",
      border: "1px solid var(--border-line)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 20,
      color: "#fff",
      textTransform: "uppercase"
    }
  }, "\uBC15\uC9C0\uD6C8"), /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginTop: 4
    }
  }, "Member since 2021")))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Following",
    title: "Teams"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "var(--grid-teal)",
    filled: true
  }, "Silverline"), /*#__PURE__*/React.createElement(Tag, {
    color: "var(--grid-orange)"
  }, "Papaya"), /*#__PURE__*/React.createElement(Tag, {
    color: "var(--red-500)"
  }, "Scarlet"))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Alerts",
    title: "Notifications"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "\uB77C\uC774\uBE0C \uD0C0\uC774\uBC0D \uC54C\uB9BC",
    checked: live,
    onChange: setLive
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Race start push",
    checked: push,
    onChange: setPush
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true
  }, "Sign out")));
}
Object.assign(window, {
  FeedScreen,
  LiveScreen,
  StandingsScreenM,
  MeScreen,
  ScreenHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/companion_app/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/AppShell.jsx
try { (() => {
const {
  Badge,
  IconButton,
  Tabs,
  Tag
} = window.APEXGPRaceDesignSystem_813519;
const NAV = [{
  id: "standings",
  label: "Standings"
}, {
  id: "live",
  label: "Race Centre"
}, {
  id: "team",
  label: "Teams"
}, {
  id: "calendar",
  label: "Calendar"
}];
function Wordmark() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 26,
      letterSpacing: "-.01em",
      color: "#fff",
      transform: "skewX(-9deg)",
      lineHeight: 1
    }
  }, "APEX"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 26,
      color: "var(--red-500)",
      transform: "skewX(-9deg)",
      lineHeight: 1
    }
  }, "GP"));
}
function AppShell({
  tab,
  onTab,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      background: "var(--bg-page)",
      backgroundImage: "var(--texture-grid)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 32,
      padding: "0 var(--gutter-screen-lg)",
      background: "var(--scrim-glass)",
      backdropFilter: "var(--blur-glass)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 4
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    onClick: () => onTab(n.id),
    style: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0 14px",
      height: 64,
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      color: tab === n.id ? "#fff" : "var(--text-muted)",
      boxShadow: tab === n.id ? "inset 0 -2px 0 var(--red-500)" : "none",
      transition: "var(--transition-control)"
    }
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "live",
    pulse: true
  }, "Lap 41/58"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Search"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 13
    }
  }, "Q")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 999,
      background: "var(--carbon-700)",
      border: "1px solid var(--border-line)"
    }
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "var(--space-8) var(--gutter-screen-lg) var(--space-11)",
      maxWidth: 1440,
      margin: "0 auto"
    }
  }, children), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-hairline)",
      padding: "var(--space-6) var(--gutter-screen-lg)",
      display: "flex",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontSize: "var(--fs-caption)"
    }
  }, "Fictional championship data \u2014 demo kit.")));
}
function PageHead({
  eyebrow,
  title,
  sub,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 24,
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--fs-display-2)",
      lineHeight: "var(--lh-display-2)",
      textTransform: "uppercase",
      letterSpacing: "-.01em"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-body)",
      maxWidth: "52ch",
      margin: "12px 0 0"
    }
  }, sub)), right);
}
Object.assign(window, {
  AppShell,
  PageHead,
  Wordmark,
  GRID_NAV: NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/CalendarScreen.jsx
try { (() => {
const {
  Card,
  Badge,
  Button
} = window.APEXGPRaceDesignSystem_813519;
function CalendarScreen() {
  const d = window.APEX_DATA;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "2026 Season",
    title: "Calendar",
    sub: "Twenty-four rounds. Four to run."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, d.calendar.map(r => {
    const live = r.status === "live";
    return /*#__PURE__*/React.createElement("div", {
      key: r.rd,
      style: {
        display: "grid",
        gridTemplateColumns: "80px 1fr 160px 200px 120px",
        alignItems: "center",
        gap: 20,
        height: 68,
        padding: "0 20px",
        background: live ? "color-mix(in srgb, var(--red-500) 12%, var(--carbon-850))" : "var(--carbon-850)",
        borderLeft: "4px solid " + (live ? "var(--red-500)" : "transparent")
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "apex-num",
      style: {
        fontSize: 26,
        color: live ? "var(--red-400)" : "var(--text-faint)"
      }
    }, r.rd), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: 22,
        textTransform: "uppercase",
        color: "var(--text-primary)"
      }
    }, r.city, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-faint)",
        fontSize: 13,
        letterSpacing: "var(--ls-label)"
      }
    }, r.country)), /*#__PURE__*/React.createElement("span", {
      className: "apex-eyebrow"
    }, r.date), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)",
        fontSize: "var(--fs-body-sm)"
      }
    }, r.winner ? "Winner · " + r.winner : "—"), /*#__PURE__*/React.createElement("span", {
      style: {
        justifySelf: "end"
      }
    }, live ? /*#__PURE__*/React.createElement(Badge, {
      tone: "live",
      pulse: true
    }, "Live") : r.status === "done" ? /*#__PURE__*/React.createElement(Badge, {
      tone: "outline",
      skew: false
    }, "Final") : /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost"
    }, "Remind me")));
  })));
}
window.CalendarScreen = CalendarScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/CalendarScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/LiveTimingScreen.jsx
try { (() => {
const {
  Card,
  Badge,
  LapTime,
  SectorBar,
  TyreCompound,
  StatTile,
  Button,
  Switch,
  Toast
} = window.APEXGPRaceDesignSystem_813519;
function TimingRow({
  r,
  i
}) {
  const {
    LapTime,
    SectorBar,
    TyreCompound
  } = window.APEXGPRaceDesignSystem_813519;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "44px 26px 1fr 96px 110px 120px 64px",
      alignItems: "center",
      gap: 14,
      height: 46,
      padding: "0 14px",
      background: i % 2 ? "var(--carbon-900)" : "var(--carbon-850)",
      borderLeft: "4px solid " + r.color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: 22,
      color: "var(--text-primary)"
    }
  }, r.pos), /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      color: r.color,
      fontSize: 11
    }
  }, r.code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16,
      textTransform: "uppercase",
      color: "var(--text-primary)"
    }
  }, r.surname, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: "var(--ls-label)"
    }
  }, r.team)), /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: 16,
      color: "var(--text-body)"
    }
  }, r.gap), /*#__PURE__*/React.createElement(LapTime, {
    time: r.last,
    tone: r.tone
  }), /*#__PURE__*/React.createElement(SectorBar, {
    sectors: r.sectors,
    width: 110
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(TyreCompound, {
    compound: r.tyre,
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    className: "apex-num",
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, r.lap)));
}
function LiveTimingScreen() {
  const d = window.APEX_DATA;
  const [auto, setAuto] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Round 20 \xB7 Mexico City",
    title: "Race centre",
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 16,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Switch, {
      label: "Auto scroll",
      checked: auto,
      onChange: setAuto
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Export"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: 16,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 18px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "live",
    pulse: true
  }, "Live"), /*#__PURE__*/React.createElement("span", {
    className: "apex-eyebrow",
    style: {
      whiteSpace: "nowrap",
      flex: "none"
    }
  }, "Lap 41 / 58"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "yellow"
  }, "VSC")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "44px 26px 1fr 96px 110px 120px 64px",
      gap: 14,
      padding: "10px 14px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, ["Pos", "", "Driver", "Gap", "Last lap", "Sectors", "Tyre"].map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "apex-eyebrow",
    style: {
      fontSize: 10
    }
  }, h))), d.timing.map((r, i) => /*#__PURE__*/React.createElement(TimingRow, {
    key: r.code,
    r: r,
    i: i
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Session",
    title: /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: "nowrap"
      }
    }, "Fastest lap")
  }, /*#__PURE__*/React.createElement(LapTime, {
    time: "1:20.305",
    tone: "best",
    size: "lg",
    label: "Russell \xB7 Lap 38",
    flash: true
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Conditions",
    title: "Track"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Air",
    value: "27",
    unit: "\xB0C"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Track",
    value: "41",
    unit: "\xB0C"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Humidity",
    value: "38",
    unit: "%"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Wind",
    value: "2.4",
    unit: "m/s"
  }))), /*#__PURE__*/React.createElement(Toast, {
    tone: "warn",
    title: "Virtual safety car"
  }, "Debris recovered at turn 7."))));
}
window.LiveTimingScreen = LiveTimingScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/LiveTimingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/StandingsScreen.jsx
try { (() => {
const {
  StandingRow,
  Tabs,
  Card,
  StatTile,
  PositionPodium,
  Tag
} = window.APEXGPRaceDesignSystem_813519;
function StandingsScreen() {
  const [view, setView] = React.useState("drivers");
  const d = window.APEX_DATA;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Championship \xB7 Round 20",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Know your", /*#__PURE__*/React.createElement("br", null), "drivers"),
    sub: "A tenth constructors' title was sealed under the lights. Twenty rounds down, four to run.",
    right: /*#__PURE__*/React.createElement(Tabs, {
      items: [{
        id: "drivers",
        label: "Drivers"
      }, {
        id: "teams",
        label: "Teams"
      }],
      value: view,
      onChange: setView
    })
  }), view === "drivers" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 14,
      alignItems: "end",
      marginBottom: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(PositionPodium, {
    position: 2,
    surname: "Norris",
    given: "Lando",
    color: "var(--grid-orange)",
    height: 230
  }), /*#__PURE__*/React.createElement(PositionPodium, {
    position: 1,
    surname: "Russell",
    given: "George",
    color: "var(--grid-teal)",
    height: 280
  }), /*#__PURE__*/React.createElement(PositionPodium, {
    position: 3,
    surname: "Moreau",
    given: "Charles",
    color: "var(--red-500)",
    height: 210
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, d.drivers.map(x => /*#__PURE__*/React.createElement(StandingRow, {
    key: x.code,
    position: x.pos,
    name: x.given,
    surname: x.surname,
    team: x.team,
    color: x.color,
    value: x.pts,
    unit: "pts"
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 14
    }
  }, d.teams.map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.name,
    accent: t.color,
    eyebrow: "P" + t.rank + " · Constructor",
    title: t.name,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Points",
    value: t.pts,
    accent: t.color
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Wins",
    value: t.wins
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Podiums",
    value: t.podiums
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Poles",
    value: t.poles
  }))))));
}
window.StandingsScreen = StandingsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/StandingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/TeamScreen.jsx
try { (() => {
const {
  Card,
  StatTile,
  Tag,
  Badge,
  Button,
  TyreCompound
} = window.APEXGPRaceDesignSystem_813519;
function TeamScreen() {
  const d = window.APEX_DATA;
  const [sel, setSel] = React.useState(0);
  const t = d.teams[sel];
  const drivers = d.drivers.filter(x => x.team === t.name);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Constructor",
    title: t.name,
    sub: "Base " + t.base + " · " + t.engine + " · Chassis " + t.chassis,
    right: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, d.teams.map((x, i) => /*#__PURE__*/React.createElement(Tag, {
      key: x.name,
      color: x.color,
      filled: i === sel,
      onClick: () => setSel(i),
      style: {
        cursor: "pointer"
      }
    }, x.name)))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "260px 1fr 300px",
      gap: 16,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14
    }
  }, drivers.map(dr => /*#__PURE__*/React.createElement(Card, {
    key: dr.code,
    accent: t.color,
    padding: "var(--space-4)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apex-num",
    style: {
      fontSize: 40,
      color: t.color,
      lineHeight: 1
    }
  }, dr.pos), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 900,
      fontSize: 20,
      textTransform: "uppercase",
      color: "var(--text-primary)",
      marginTop: 4
    }
  }, dr.surname), /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginTop: 4
    }
  }, dr.given, " \xB7 ", dr.pts, " pts"))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Compound plan",
    title: "Sunday"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(TyreCompound, {
    compound: "medium",
    code: "C4",
    size: 34
  }), /*#__PURE__*/React.createElement(TyreCompound, {
    compound: "hard",
    code: "C3",
    size: 34
  }), /*#__PURE__*/React.createElement(TyreCompound, {
    compound: "soft",
    code: "C5",
    size: 34
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    style: {
      overflow: "hidden",
      minHeight: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 460,
      background: "linear-gradient(180deg, color-mix(in srgb," + t.color + " 26%, var(--carbon-950)) 0%, var(--carbon-950) 70%)",
      display: "grid",
      placeItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "var(--texture-speedlines)",
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "apex-num",
    style: {
      fontSize: 180,
      color: "rgba(255,255,255,.08)",
      lineHeight: .8
    }
  }, t.chassis), /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginTop: -10
    }
  }, "Car render slot \u2014 supply an image asset")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 24,
      bottom: 24,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, t.engine), /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, "Rank P", t.rank)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Season",
    title: "Form"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Points",
    value: t.pts,
    accent: t.color,
    size: "lg"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Rank",
    value: "P" + t.rank,
    size: "lg"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Wins",
    value: t.wins
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Podiums",
    value: t.podiums
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Poles",
    value: t.poles
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Fastest laps",
    value: t.fl
  }))), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Starting grid",
    title: "Average"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 3,
      height: 84
    }
  }, [6, 3, 8, 2, 5, 9, 4, 1, 7, 3, 2, 6, 4, 8].map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: v / 10 * 84,
      background: i % 3 === 0 ? t.color : "var(--carbon-600)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "apex-eyebrow",
    style: {
      marginTop: 10
    }
  }, "6,25 avg start \xB7 4,68 avg finish")), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true
  }, "Follow team"))));
}
window.TeamScreen = TeamScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/TeamScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/app.jsx
try { (() => {
function App() {
  const [tab, setTab] = React.useState("standings");
  const Screen = {
    standings: window.StandingsScreen,
    live: window.LiveTimingScreen,
    team: window.TeamScreen,
    calendar: window.CalendarScreen
  }[tab];
  return /*#__PURE__*/React.createElement(AppShell, {
    tab: tab,
    onTab: setTab
  }, /*#__PURE__*/React.createElement(Screen, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/race_center/data.js
try { (() => {
window.APEX_DATA = {
  drivers: [{
    pos: 1,
    given: "George",
    surname: "Russell",
    code: "RUS",
    team: "Silverline",
    color: "var(--grid-teal)",
    pts: 322,
    wins: 6
  }, {
    pos: 2,
    given: "Lando",
    surname: "Norris",
    code: "NOR",
    team: "Papaya",
    color: "var(--grid-orange)",
    pts: 249,
    wins: 4
  }, {
    pos: 3,
    given: "Charles",
    surname: "Moreau",
    code: "MOR",
    team: "Scarlet",
    color: "var(--red-500)",
    pts: 215,
    wins: 3
  }, {
    pos: 4,
    given: "Max",
    surname: "Vanderberg",
    code: "VAN",
    team: "Bulls",
    color: "var(--grid-blue)",
    pts: 212,
    wins: 3
  }, {
    pos: 5,
    given: "Oscar",
    surname: "Piastri",
    code: "PIA",
    team: "Papaya",
    color: "var(--grid-orange)",
    pts: 194,
    wins: 2
  }, {
    pos: 6,
    given: "Kimi",
    surname: "Antonelli",
    code: "ANT",
    team: "Silverline",
    color: "var(--grid-teal)",
    pts: 132,
    wins: 1
  }, {
    pos: 7,
    given: "Pierre",
    surname: "Gasquet",
    code: "GAS",
    team: "Azur",
    color: "var(--grid-magenta)",
    pts: 69,
    wins: 0
  }, {
    pos: 8,
    given: "Alex",
    surname: "Albon",
    code: "ALB",
    team: "Vector",
    color: "var(--grid-azure)",
    pts: 52,
    wins: 0
  }, {
    pos: 9,
    given: "Nico",
    surname: "Hulkenberg",
    code: "HUL",
    team: "Kick",
    color: "var(--grid-green)",
    pts: 35,
    wins: 0
  }, {
    pos: 10,
    given: "Esteban",
    surname: "Ocon",
    code: "OCO",
    team: "Halo",
    color: "var(--grid-silver)",
    pts: 34,
    wins: 0
  }],
  teams: [{
    name: "Silverline",
    color: "var(--grid-teal)",
    pts: 454,
    base: "Brackley, UK",
    engine: "Silverline V6",
    chassis: "SL-25",
    rank: 1,
    wins: 7,
    podiums: 14,
    poles: 6,
    fl: 5
  }, {
    name: "Papaya",
    color: "var(--grid-orange)",
    pts: 443,
    base: "Woking, UK",
    engine: "Papaya V6",
    chassis: "PA-25",
    rank: 2,
    wins: 6,
    podiums: 12,
    poles: 5,
    fl: 4
  }, {
    name: "Scarlet",
    color: "var(--red-500)",
    pts: 398,
    base: "Maranello, IT",
    engine: "Scarlet V6",
    chassis: "SC-25",
    rank: 3,
    wins: 3,
    podiums: 9,
    poles: 4,
    fl: 3
  }, {
    name: "Bulls",
    color: "var(--grid-blue)",
    pts: 301,
    base: "Milton Keynes, UK",
    engine: "Bulls V6",
    chassis: "BU-25",
    rank: 4,
    wins: 3,
    podiums: 7,
    poles: 3,
    fl: 2
  }],
  timing: [{
    pos: 1,
    code: "RUS",
    surname: "Russell",
    team: "Silverline",
    color: "var(--grid-teal)",
    gap: "LEADER",
    last: "1:20.305",
    tone: "best",
    tyre: "medium",
    lap: 12,
    sectors: ["best", "personal", "personal"]
  }, {
    pos: 2,
    code: "NOR",
    surname: "Norris",
    team: "Papaya",
    color: "var(--grid-orange)",
    gap: "+1.284",
    last: "1:20.561",
    tone: "personal",
    tyre: "medium",
    lap: 11,
    sectors: ["personal", "personal", "slower"]
  }, {
    pos: 3,
    code: "MOR",
    surname: "Moreau",
    team: "Scarlet",
    color: "var(--red-500)",
    gap: "+4.902",
    last: "1:20.908",
    tone: "personal",
    tyre: "hard",
    lap: 24,
    sectors: ["slower", "personal", "personal"]
  }, {
    pos: 4,
    code: "VAN",
    surname: "Vanderberg",
    team: "Bulls",
    color: "var(--grid-blue)",
    gap: "+9.117",
    last: "1:21.044",
    tone: "slower",
    tyre: "soft",
    lap: 5,
    sectors: ["slower", "slower", "personal"]
  }, {
    pos: 5,
    code: "PIA",
    surname: "Piastri",
    team: "Papaya",
    color: "var(--grid-orange)",
    gap: "+12.660",
    last: "1:21.203",
    tone: "slower",
    tyre: "hard",
    lap: 26,
    sectors: ["personal", "slower", "slower"]
  }, {
    pos: 6,
    code: "ANT",
    surname: "Antonelli",
    team: "Silverline",
    color: "var(--grid-teal)",
    gap: "+18.402",
    last: "1:21.560",
    tone: "slower",
    tyre: "hard",
    lap: 27,
    sectors: ["slower", "slower", "slower"]
  }],
  calendar: [{
    rd: 18,
    city: "Singapore",
    country: "SGP",
    date: "21 SEP",
    status: "done",
    winner: "Russell"
  }, {
    rd: 19,
    city: "Austin",
    country: "USA",
    date: "05 OCT",
    status: "done",
    winner: "Norris"
  }, {
    rd: 20,
    city: "Mexico City",
    country: "MEX",
    date: "26 OCT",
    status: "live",
    winner: null
  }, {
    rd: 21,
    city: "São Paulo",
    country: "BRA",
    date: "09 NOV",
    status: "next",
    winner: null
  }, {
    rd: 22,
    city: "Las Vegas",
    country: "USA",
    date: "22 NOV",
    status: "next",
    winner: null
  }, {
    rd: 23,
    city: "Lusail",
    country: "QAT",
    date: "30 NOV",
    status: "next",
    winner: null
  }, {
    rd: 24,
    city: "Yas Marina",
    country: "UAE",
    date: "07 DEC",
    status: "next",
    winner: null
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/race_center/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.LapTime = __ds_scope.LapTime;

__ds_ns.PositionPodium = __ds_scope.PositionPodium;

__ds_ns.SectorBar = __ds_scope.SectorBar;

__ds_ns.StandingRow = __ds_scope.StandingRow;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.TyreCompound = __ds_scope.TyreCompound;

})();
