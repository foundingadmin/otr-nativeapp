// ARCHIVED · titled-card timeline variant (superseded June 2026)
// ───────────────────────────────────────────────────────────────────────────
// The original "What's happened · what's next" timeline rendered inside a
// titled card (.tlzone + .tlzone-h header). Superseded by the bare, surface-
// attached timeline (.tlbare) — see TimelineZone in detail-record.jsx.
// Kept here only as a record of the decision; not loaded by any board.

function TimelineZoneCarded({ rec }){
  const ev = rec.timeline || [];
  if (!ev.length) return null;
  return (
    <div className="tlzone">
      <div className="tlzone-h">
        <span className="tlz-ic"><FI name="history-backup-folder" size={15} color="var(--wf-muted)" /></span>
        <span className="tlz-t">What’s happened · what’s next</span>
      </div>
      <Timeline rec={rec} />
    </div>
  );
}

/* Companion CSS (also archived):
  .tlzone{ margin:14px 14px 0; background:#fff; border:1px solid var(--wf-line); border-radius:16px; overflow:hidden; }
  .tlzone-h{ display:flex; align-items:center; gap:9px; padding:11px 14px; background:#fbfbfc; border-bottom:1px solid var(--wf-line2); }
  .tlzone-h .tlz-ic{ display:flex; }
  .tlzone-h .tlz-t{ font-size:13px; font-weight:800; color:var(--wf-ink); }
  .tlzone .tline{ padding:10px 14px 12px; }
*/
