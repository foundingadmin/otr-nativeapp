// cpc.jsx — case fixtures, signal-precedence helper, and the reference CPC
// (the §8.4 four-zone baseline) used across Board A. Board B ships distinct
// layouts; this is the canonical "holds across the whole spectrum" card.
/* __IIFE__ */ ;(function(){
const { StatusBadge, Thumb, Attorney, Stars, Confetti, OTR_STATUS } = window;
const { FeatureIcon: FI } = window.OffTheRecordDesignSystem_6eff96;

// ── fixtures: full status spectrum, CA/NY/TX cities, 2024–26 dates ─────────
const CASES = {
  smart:   { status:'smartmatchd', city:'Los Angeles', mon:'Mar', year:'2026', cls:'Infraction', caseId:'OTR-48213',
             violation:'Speeding · VC 22349(a)', more:1, firm:'Mendez & Cole', courtCity:'LA Metropolitan', courtDate:'Apr 24, 2026',
             attorney:{ name:'your matched attorney', rating:4.9, blurred:true }, quote:{ amount:149, expires:'24m 14s' } },
  almost:  { status:'almostgone', city:'Brooklyn', mon:'Feb', year:'2026', cls:'Infraction', caseId:'OTR-47980',
             violation:'Red light · VTL 1111(d)', more:0, firm:'Okonkwo Legal', courtCity:'Kings County', courtDate:'Mar 19, 2026',
             attorney:{ name:'your matched attorney', rating:4.8, blurred:true }, quote:{ amount:129, expires:'4m 48s' } },
  expired: { status:'expired', city:'Sacramento', mon:'Jan', year:'2026', cls:'Infraction', caseId:'OTR-47551',
             violation:'Speeding · VC 22350', more:0, firm:'—', courtCity:'Sacramento Superior', courtDate:'Feb 11, 2026' },
  loe:     { status:'active-action', city:'Austin', mon:'Mar', year:'2026', cls:'Misdemeanor', caseId:'OTR-48090',
             violation:'Reckless driving · TC 545.401', more:2, firm:'Whitfield & Reyes', courtCity:'Travis County',
             courtDate:'May 14, 2026', attorney:{ name:'Dana Whitfield', rating:4.9 }, action:'loe' },
  overdue: { status:'active', city:'Houston', mon:'Dec', year:'2025', cls:'Wobbler', caseId:'OTR-46622',
             violation:'No insurance · TC 601.191', more:1, firm:'Briggs Traffic', courtCity:'Harris County',
             courtDate:'Apr 02, 2026', attorney:{ name:'Marcus Brail', rating:4.7 }, balance:{ amount:109, overdue:true } },
  unread:  { status:'active', city:'San Diego', mon:'Feb', year:'2026', cls:'Infraction', caseId:'OTR-47802',
             violation:'Speeding · VC 22349(a)', more:0, firm:'Coastal Defense', courtCity:'San Diego Superior',
             courtDate:'Mar 30, 2026', attorney:{ name:'Lena Park', rating:4.8 }, unread:2 },
  active:  { status:'active', city:'Fresno', mon:'Jan', year:'2026', cls:'Infraction', caseId:'OTR-47210',
             violation:'Failure to stop · VC 22450', more:0, firm:'Nair Law Group', courtCity:'Fresno Superior',
             courtDate:'Apr 18, 2026', attorney:{ name:'Priya Nair', rating:4.9 } },
  deadline:{ status:'deadline', city:'Long Beach', mon:'Apr', year:'2026', cls:'Infraction', caseId:'OTR-48402',
             violation:'Speeding · VC 22349', more:0, firm:'—', courtCity:'Long Beach Courthouse',
             courtDate:'Apr 29, 2026', daysToCourt:9 },
  incomp:  { status:'incomplete', city:'San Jose', mon:'Mar', year:'2026', cls:'—', caseId:'OTR-48377',
             violation:'Not provided', more:0, firm:'—', complete:40, courtDate:'Unknown' },
  analyze: { status:'analyzing', city:'Oakland', mon:'Mar', year:'2026', cls:'Infraction', caseId:'OTR-48355',
             violation:'Speeding · VC 22349', more:0, firm:'—', courtCity:'Alameda Superior', courtDate:'Apr 21, 2026' },
  resolved:{ status:'resolved', city:'Pasadena', mon:'Nov', year:'2025', cls:'Infraction', caseId:'OTR-45980',
             violation:'Speeding · VC 22349(a)', more:0, firm:'Mendez & Cole', courtCity:'Pasadena Courthouse', courtDate:'Nov 12, 2025',
             attorney:{ name:'Sofia Mendez', rating:4.8 }, outcome:{ result:'Reduced to non-moving', saved:240, points:1 } },
  dismiss: { status:'dismissed', city:'Riverside', mon:'Oct', year:'2025', cls:'Infraction', caseId:'OTR-45533',
             violation:'Speeding · VC 22349', more:0, firm:'Okonkwo Legal', courtCity:'Riverside Superior', courtDate:'Oct 09, 2025',
             attorney:{ name:'David Okonkwo', rating:5.0 }, outcome:{ result:'Charge dismissed', saved:480, points:2 } },
  dismissPay:{ status:'dismissed', city:'El Paso', mon:'Sep', year:'2025', cls:'Infraction', caseId:'OTR-45102',
             violation:'Speeding · TC 545.351', more:0, firm:'Briggs Traffic', courtCity:'El Paso County',
             attorney:{ name:'Marcus Brail', rating:4.7 }, outcome:{ result:'Charge dismissed', saved:300, points:2 },
             balance:{ amount:89, overdue:true } },
  counter: { status:'counter', city:'Anaheim', mon:'Feb', year:'2026', cls:'Infraction', caseId:'OTR-48510',
             violation:'Speeding · VC 22349(a)', more:0, firm:'Reyes Traffic Law', courtCity:'Orange County',
             courtDate:'May 02, 2026', attorney:{ name:'Carla Reyes', rating:4.8 }, counter:{ from:149, to:189 } },
  remarket:{ status:'remarketing', city:'Modesto', mon:'Mar', year:'2026', cls:'Infraction', caseId:'OTR-48533',
             violation:'Speeding · VC 22349', more:0, firm:'—', courtCity:'Stanislaus Superior', courtDate:'Apr 27, 2026' },
  cancelled:{ status:'cancelled', city:'Bakersfield', mon:'Feb', year:'2026', cls:'Infraction', caseId:'OTR-48201',
             violation:'Speeding · VC 22349', more:0, firm:'—', courtCity:'Kern County', courtDate:'Apr 10, 2026' },
  missed:  { status:'missed', city:'Stockton', mon:'Mar', year:'2026', cls:'Infraction', caseId:'OTR-48088',
             violation:'Speeding · VC 22349', more:0, firm:'—', courtCity:'San Joaquin Superior',
             courtDate:'Mar 18, 2026', daysToCourt:0 },
  reassign:{ status:'reassigned', city:'Glendale', mon:'Mar', year:'2026', cls:'Misdemeanor', caseId:'OTR-48144',
             violation:'Reckless driving · VC 23103', more:1, firm:'Park & Vance', courtCity:'LA North',
             courtDate:'May 20, 2026', attorney:{ name:'Helen Vance', rating:4.9 }, action:'reassign-loe' },
};
const STATE = {
  'Los Angeles':'CA','Brooklyn':'NY','Sacramento':'CA','Austin':'TX','Houston':'TX',
  'San Diego':'CA','Fresno':'CA','Long Beach':'CA','San Jose':'CA','Oakland':'CA',
  'Pasadena':'CA','Riverside':'CA','El Paso':'TX',
  'Anaheim':'CA','Modesto':'CA','Bakersfield':'CA','Stockton':'CA','Glendale':'CA',
};
const title = (c) => `Ticket issued ${c.mon} ${c.year} in ${c.city}, ${STATE[c.city] || 'CA'}`;
// title-part helpers (for the title-treatment experiments)
const tState = (c) => STATE[c.city] || 'CA';
const tPlace = (c) => `${c.city}, ${STATE[c.city] || 'CA'}`;
const tDate = (c) => `${c.mon} ${c.year}`;
const tViol = (c) => (c.violation || '').split('·')[0].trim();      // "Speeding"
const tCode = (c) => { const p = (c.violation || '').split('·'); return p[1] ? p[1].trim() : ''; }; // "VC 22349(a)"

// ── signal precedence (§7.2): money > legal gate > outcome > info ─────────
function primaryAction(c) {
  if (c.balance && c.balance.overdue) return { label:`Make a payment · $${c.balance.amount}`, kind:'money', icon:'bill-dollar-2' };
  switch (c.status) {
    case 'smartmatchd': return { label:'Accept or deny quote', kind:'grad' };
    case 'almostgone':  return { label:'Accept or deny now', kind:'grad' };
    case 'expired':     return { label:`Get SmartMatch'd`, kind:'primary', icon:'triangle-arrow-synchronize-1' };
    case 'active-action': return { label:'Review & sign engagement', kind:'primary', icon:'file-edit' };
    case 'incomplete':  return { label:'Complete booking', kind:'primary' };
    case 'deadline':    return { label:'Finish before court date', kind:'primary' };
    case 'active':      return c.unread ? { label:'View update', kind:'ghost' } : null;
    case 'resolved':    return { label:'Review your attorney', kind:'ghost' };
    case 'dismissed':   return { label:'Review your attorney', kind:'ghost' };
    default: return null;
  }
}
const badgeNote = (c) => c.status === 'deadline' && c.daysToCourt ? `${c.daysToCourt} days` : null;
// Court date for the identity meta line. Unknown until the booking/match has
// established a court of record (incomplete, matching, etc.) — never a case id.
const courtLabel = (c) => (c.courtDate && c.courtDate !== 'Unknown') ? c.courtDate : 'Unknown';
// Ticket type / classification for the identity tag. Not known until booking
// details are supplied — reads "Unknown", mirroring the court-date signal so the
// preview card and the detail page speak the same missing-data language.
const clsLabel = (c) => { const v = c && c.cls; return (!v || v === '—' || v === '-') ? 'Unknown' : v; };

// ── tiny inline bits ──────────────────────────────────────────────────────
function MetaLine({ icon, children, strong }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:6, fontSize:12.5,
      color: strong ? 'var(--wf-strong)' : 'var(--wf-muted)' }}>
      {icon && <FI name={icon} size={13} color="var(--wf-faint)" style={{ flex:'none', marginTop:1 }} />}<span className="mline">{children}</span>
    </div>
  );
}
function ActBtn({ a }) {
  if (!a) return null;
  const cls = a.kind === 'money' ? 'money' : a.kind === 'grad' ? 'grad' : a.kind === 'ghost' ? 'ghost' : 'primary';
  return (
    <div className={`act ${cls} full`} style={{ marginTop:12 }}>
      {a.icon && <FI name={a.icon} size={15} color={cls==='ghost'?'var(--wf-ink)':'#fff'} />}{a.label}
    </div>
  );
}
function OverduePill({ c }) {
  return (
    <div className="overlay-pay" style={{ marginTop:11 }}>
      <FI name="bill-dollar-2" size={17} color="var(--money)" />
      <div style={{ flex:1 }}>
        <div className="lbl">Payment overdue — ${c.balance.amount}</div>
        <div style={{ fontSize:11, color:'var(--money)', opacity:.85 }}>Outranks all but a legal gate (§7.2)</div>
      </div>
    </div>
  );
}

// ── attorney module (revealed / blurred) ──────────────────────────────────
function AttorneyRow({ c, quote, tint, right }) {
  const a = c.attorney; if (!a) return null;
  const pri = tint ? tint.primary : 'var(--wf-ink)';
  const sec = tint ? tint.secondary : 'var(--wf-faint)';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <Attorney size={38} blurred={a.blurred} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:pri }}>
          {a.blurred ? "SmartMatch'd Attorney" : c.firm}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:1 }}>
          <Stars rating={a.rating} size={11} />
          <span style={{ fontSize:11.5, color:sec }}>{a.blurred ? 'Best-fit local pro' : 'Your local professional'}</span>
        </div>
      </div>
      {quote && c.quote && (
        <div style={{ textAlign:'right' }}>
          <div className="quote" style={{ fontSize:19, color:pri }}>${c.quote.amount}</div>
          <div className="timer" style={{ color: c.status==='almostgone' ? 'var(--money)' : 'var(--wf-muted)' }}><FI name="countdown-timer" size={12} color={c.status==='almostgone' ? 'var(--money)' : 'var(--wf-muted)'} />{c.quote.expires}</div>
        </div>
      )}
      {right}
    </div>
  );
}

// ── the reference CPC (four-zone baseline, §8.4) — drives Board A ──────────
function CPCRef({ c, tap = false }) {
  const cfg = OTR_STATUS[c.status];
  const a = primaryAction(c);
  const unfinished = cfg.series === 1;
  const showQuoteAttorney = c.status === 'smartmatchd' || c.status === 'almostgone';
  const showAttorney = !!c.attorney && !showQuoteAttorney;

  return (
    <div className={`cpc${unfinished ? ' unfinished' : ''}`}>
      {c.status === 'dismissed' && <Confetti />}
      {/* Zone A header: identity + badge */}
      <div style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:8, justifyContent:'space-between' }}>
            <p className="ttl" style={{ paddingRight:2 }}>{title(c)}</p>
            <StatusBadge status={c.status} unread={!!c.unread} note={badgeNote(c)} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4, flexWrap:'wrap' }}>
            <span className="classif"><FI name="tag" size={10} color="var(--wf-muted)" />{c.cls}</span>
            <span style={{ fontSize:11.5, color:'var(--wf-faint)' }}>Court date · {courtLabel(c)}</span>
          </div>
        </div>
      </div>

      {/* Zone B/C body: state-specific record */}
      <div style={{ marginTop:11, display:'flex', flexDirection:'column', gap:8 }}>
        {showQuoteAttorney && <AttorneyRow c={c} quote />}
        {showAttorney && <AttorneyRow c={c} />}
        {c.status === 'incomplete' && <>
          <MetaLine icon="image-photo-add">Ticket photo · <b style={{ color:'var(--wf-faint)' }}>Not provided</b></MetaLine>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div className="meter" style={{ flex:1 }}><i style={{ width:`${c.complete}%` }} /></div>
            <span className="micro">{c.complete}% complete</span>
          </div>
        </>}
        {c.status === 'deadline' && <>
          <MetaLine icon="location-pin" strong>{c.courtCity} · court {c.courtDate}</MetaLine>
          <div style={{ display:'flex', alignItems:'center', gap:7, color:'var(--money)', fontWeight:700, fontSize:12.5 }}>
            <FI name="countdown-timer" size={14} color="var(--money)" />{c.daysToCourt} days to court date
          </div>
        </>}
        {c.status === 'analyzing' && (
          <MetaLine icon="triangle-arrow-synchronize-1">Finding your best-fit attorney — this can take a moment.</MetaLine>
        )}
        {c.status === 'expired' && (
          <MetaLine icon="time-history-off">Quote lapsed. Reinitiate SmartMatch for a fresh quote.</MetaLine>
        )}
        {(c.status === 'active' || c.status === 'active-action') && c.courtDate && !c.balance &&
          <MetaLine icon="location-pin">{c.courtCity} · court {c.courtDate}</MetaLine>}
        {c.unread > 0 && <MetaLine icon="bell-notification" strong>{c.unread} new updates from {c.attorney.name}</MetaLine>}
        {c.action === 'loe' &&
          <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:12.5, color:'var(--wf-ink)', fontWeight:600 }}>
            <FI name="file-edit" size={14} color="var(--otr-blue)" />One-tap left: sign your letter of engagement</div>}
        {c.outcome && <MetaLine icon="chart-circle-up-growth" strong>{c.outcome.result} · {c.outcome.points} pts avoided</MetaLine>}
        {c.balance && c.balance.overdue && <OverduePill c={c} />}
      </div>

      {!tap && <ActBtn a={a} />}
      {tap && a && (
        <div style={{ marginTop:10, display:'flex', alignItems:'center', justifyContent:'space-between',
          fontSize:13, fontWeight:700, color: a.kind==='money'?'var(--money)':'var(--otr-blue)' }}>
          {a.label}<FI name="chevron-right" size={13} color={a.kind==='money'?'var(--money)':'var(--otr-blue)'} />
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CASES, title, tState, tPlace, tDate, tViol, tCode, primaryAction, badgeNote, courtLabel, clsLabel, CPCRef, AttorneyRow, MetaLine, ActBtn, OverduePill });

})();
