/* ============================================================
   component-map.js — Component sync + Code Connect registry
   {{BRAND_NAME}} Design System

   Usage:
     const { COMPONENT_MAP, ICON_CATALOG } = require('./brand/component-map.js');

   figmaNodeId: null until a use_figma build session records it.
   Once set, update brand/BRAND.md Component Set Registry to match.

   SCAFFOLD: registries are empty until the first Claude Design
   package intake populates brand/components/html/.
   ============================================================ */

const ICON_CATALOG = [];

const COMPONENT_MAP = [
  // { figmaName: 'Button', componentSetNodeId: null, cssClass: '.btn',
  //   previewFile: 'brand/components/html/button.html' },
];

module.exports = { COMPONENT_MAP, ICON_CATALOG };
