// Review Hub shared core: items + persisted review state.
// Loaded by every Review Hub variant so state stays consistent across A/B/C.
window.REVIEW_ITEMS = [
  {
    id: 'header-divergences',
    title: 'Case preview card: header / identity-zone divergences',
    kind: 'decision',
    ask: 'Pick the CPC header direction, or call out a hybrid. Your verdict closes this exploration.',
    href: '../../cases/component-case_preview_cards/explorations/01-header-divergences/01-header-divergences.html',
    ws: 'cases/component-case_preview_cards',
    requested: 'Jul 6',
  },
  {
    id: 'feed-studies',
    title: 'Case feed: layout, filter, and action exploration',
    kind: 'input',
    ask: 'React to density, layout, and action treatments while this is still diverging. Comments only; no verdict needed yet.',
    href: '../../cases/screen-all_cases_feed/explorations/01-feed-exploration/01-feed-exploration.html',
    ws: 'cases/screen-all_cases_feed',
    requested: 'Jul 6',
  },
  {
    id: 'detail-studies',
    title: 'Case detail: tab and zone exploration',
    kind: 'input',
    ask: 'React to the tab structures and zone order options for the full case record.',
    href: '../../cases/screen-single_case_details/explorations/01-details-exploration/01-details-exploration.html',
    ws: 'cases/screen-single_case_details',
    requested: 'Jul 6',
  },
];

window.ReviewState = (function () {
  const KEY = 'otr-review-hub-v1';
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* noop */ }
  }
  function mark(id) {
    const s = load();
    s[id] = { reviewed: true, ts: Date.now() };
    save(s);
    return s;
  }
  function unmark(id) {
    const s = load();
    delete s[id];
    save(s);
    return s;
  }
  function fmtWhen(ts) {
    if (!ts) return '';
    const d = Date.now() - ts;
    if (d < 60e3) return 'just now';
    if (d < 3600e3) return Math.round(d / 60e3) + 'm ago';
    if (d < 86400e3) return Math.round(d / 3600e3) + 'h ago';
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return { load, save, mark, unmark, fmtWhen };
})();
