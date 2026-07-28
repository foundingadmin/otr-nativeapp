// Navigator app: renders window.NAV_DATA as a searchable, filterable project map.
;(function () {
  const DS = window.OffTheRecordDesignSystem_6eff96;
  const { Badge, Input, Button } = DS;
  const { useState, useMemo } = React;

  // ---- data prep: assign ids, parent links ----
  function decorate(nodes, prefix) {
    return nodes.map((n, i) => {
      const id = (prefix ? prefix + '.' : '') + i;
      const children = n.children ? decorate(n.children, id) : null;
      return { ...n, id, children };
    });
  }
  const TREE = decorate(window.NAV_DATA, '');

  function countLeaves(n) {
    if (!n.children) return 1;
    return n.children.reduce((a, c) => a + countLeaves(c), 0);
  }

  const CHIPS = [
    { key: 'all', label: 'Everything' },
    { key: 'canonical', label: 'Canonical' },
    { key: 'exploration', label: 'Explorations' },
    { key: 'decision', label: 'Decisions' },
    { key: 'system', label: 'System & kits' },
    { key: 'doc', label: 'Docs' },
    { key: 'archive', label: 'Archive' },
    { key: 'reference', label: 'Reference' },
  ];

  function catCount(nodes, key) {
    let c = 0;
    for (const n of nodes) {
      if (n.cat === key) c++;
      if (n.children) c += catCount(n.children, key);
    }
    return c;
  }

  // does node (or a descendant) survive the filter + search?
  function matches(n, q, cat) {
    const selfCat = cat === 'all' || n.cat === cat;
    const selfQ = !q || (n.name + ' ' + (n.note || '')).toLowerCase().includes(q);
    if (n.children) {
      const kid = n.children.some((c) => matches(c, q, cat));
      // folder matches on its own text only when it also passes the cat filter via descendants
      return kid || (selfQ && q && kid) || (selfQ && selfCat && !n.children.length);
      }
    return selfCat && selfQ;
  }

  const badgeStyle = (b) => (b.dashed ? { border: '1.5px dashed var(--neutral-300)', background: 'var(--white)' } : {});

  function NodeBadges({ badges }) {
    if (!badges) return null;
    return React.createElement(
      'span',
      { style: { display: 'inline-flex', gap: 6, flexWrap: 'wrap' } },
      badges.map((b, i) =>
        React.createElement(Badge, { key: i, intent: b.i, emphasis: b.solid ? 'solid' : undefined, size: 'sm', style: badgeStyle(b) }, b.t)
      )
    );
  }

  function Row({ node, depth, idx = 0, open, forceOpen, toggle, q, cat }) {
    const isFolder = !!node.children;
    const visibleKids = isFolder ? node.children.filter((c) => matches(c, q, cat)) : [];
    const expanded = forceOpen || open.has(node.id);
    return (
      <div>
        <div
          className={'nav-row' + (isFolder ? ' folder' : '') + (depth > 0 && idx % 2 === 1 ? ' zeb' : '')}
          style={{ paddingLeft: 16 + depth * 26 }}
          onClick={isFolder ? () => toggle(node.id) : undefined}
          role={isFolder ? 'button' : undefined}
        >
          <span className="chev">
            {isFolder ? (
              <i className={'fa-solid fa-chevron-' + (expanded ? 'down' : 'right')} aria-hidden="true"></i>
            ) : (
              <span className="leaf-dot" />
            )}
          </span>
          <span className="row-main">
            <span className="row-title">
              {node.path ? (
                <a href={node.path} onClick={(e) => e.stopPropagation()}>{node.name}</a>
              ) : (
                <span className={isFolder ? 'fname' : 'lname'}>{node.name}</span>
              )}
              {!node.path && node.file && (
                <a className="jump" href={node.file} title="Open the source file" onClick={(e) => e.stopPropagation()} aria-label={'Open ' + node.name}>
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                </a>
              )}
              {node.age && <span className="age">{node.age}</span>}
              <NodeBadges badges={node.badges} />
            </span>
            {node.note && <span className="row-note">{node.note}</span>}
          </span>
          {isFolder && <span className="count">{countLeaves(node)}</span>}
        </div>
        {isFolder && expanded && (
          <div className="kids">
            {visibleKids.map((c, i) => (
              <Row key={c.id} node={c} depth={depth + 1} idx={i} open={open} forceOpen={forceOpen} toggle={toggle} q={q} cat={cat} />
            ))}
          </div>
        )}
      </div>
    );
  }

  function App() {
    const [q, setQ] = useState('');
    const [cat, setCat] = useState('all');
    const [open, setOpen] = useState(() => new Set(TREE.filter((n) => n.children).map((n) => n.id)));
    const [allOpen, setAllOpen] = useState(false);

    const query = q.trim().toLowerCase();
    const forceOpen = allOpen || !!query || cat !== 'all';
    const visible = useMemo(() => TREE.filter((n) => matches(n, query, cat)), [query, cat]);

    const toggle = (id) =>
      setOpen((prev) => {
        const s = new Set(prev);
        s.has(id) ? s.delete(id) : s.add(id);
        return s;
      });

    const expandAll = () => setAllOpen(true);
    const collapseAll = () => { setAllOpen(false); setOpen(new Set()); };

    const stats = {
      entries: TREE.reduce((a, n) => a + countLeaves(n), 0),
      canonical: catCount(TREE, 'canonical'),
      exploring: 3,
      decisions: catCount(TREE, 'decision'),
    };

    return (
      <div className="page" data-screen-label="File Navigator">
        <div className="eyebrow">Off The Record · Native App UI · Orientation</div>
        <h1>File Navigator</h1>
        <p className="intro">
          A 1:1 mirror of the project directory: every file and folder by its real name, each with a
          one-line note on what it is and why it's here. Search to jump, click a folder to open it,
          click a board name to view it.
        </p>
        <p className="stats">
          <strong>3</strong> workstreams · <strong>{stats.entries}</strong> listed entries ·{' '}
          <strong>{stats.canonical}</strong> canonical boards · <strong>{stats.exploring}</strong> open explorations ·{' '}
          <strong>{stats.decisions}</strong> decision entries
        </p>

        <div className="controls">
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Search files, folders, or descriptions…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              leading={<i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--neutral-400)' }}></i>}
            />
          </div>
          <Button variant="tertiary" size="sm" iconLeft={<i className="fa-solid fa-angles-down" aria-hidden="true"></i>} onClick={expandAll}>Expand all</Button>
          <Button variant="tertiary" size="sm" iconLeft={<i className="fa-solid fa-angles-up" aria-hidden="true"></i>} onClick={collapseAll}>Collapse all</Button>
        </div>

        <div className="chips">
          {CHIPS.map((c) => {
            const n = c.key === 'all' ? stats.entries : catCount(TREE, c.key);
            return (
              <button key={c.key} className={'chip' + (cat === c.key ? ' active' : '')} onClick={() => setCat(c.key)}>
                {c.label} <span className="chip-n">{n}</span>
              </button>
            );
          })}
        </div>

        <div className="tree">
          {visible.map((n, i) => (
            <div key={n.id} className={'band' + (i % 2 === 1 ? ' band-alt' : '')}>
              <Row node={n} depth={0} open={open} forceOpen={forceOpen} toggle={toggle} q={query} cat={cat} />
            </div>
          ))}
          {!visible.length && <div className="empty">Nothing matches. Try a different term or chip.</div>}
        </div>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
