import { useDeferredValue, useMemo, useRef, useState } from 'react'
import './App.css'

const STOCKS = [
  { code: '600519', name: '贵州茅台', market: 'SH', price: '1,438.21', change: '+0.82%' },
  { code: '000001', name: '平安银行', market: 'SZ', price: '11.32', change: '-0.35%' },
  { code: '601318', name: '中国平安', market: 'SH', price: '48.76', change: '+1.14%' },
  { code: '300750', name: '宁德时代', market: 'SZ', price: '252.60', change: '+2.08%' },
  { code: '600036', name: '招商银行', market: 'SH', price: '46.25', change: '+0.41%' },
  { code: '000858', name: '五粮液', market: 'SZ', price: '126.90', change: '-0.62%' },
]

const SUGGESTIONS = [
  { icon: 'trend', title: '梳理核心投资逻辑', text: '基于已导入数据，总结公司核心投资逻辑' },
  { icon: 'nodes', title: '分析产业关联', text: '分析公司上下游关系与潜在风险传导' },
  { icon: 'report', title: '生成社区研报', text: '生成一份结构完整的社区研究报告' },
  { icon: 'compare', title: '对比关键指标', text: '对比已导入公司的盈利能力与估值水平' },
]

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  const paths = {
    logo: <><path d="M5 19 12 5l7 14" /><path d="M8.2 14h7.6" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="11" cy="11" r="6.8" /><path d="m16 16 4 4" /></>,
    upload: <><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" /><path d="M5 15v4h14v-4" /></>,
    database: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
    history: <><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6" /><path d="M4 4v4.6h4.6M12 8v4l3 2" /></>,
    report: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5M10 12h5M10 16h5" /></>,
    download: <><path d="M12 4v11m0 0 4-4m-4 4-4-4" /><path d="M5 19h14" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    send: <><path d="m4 4 17 8-17 8 3-8z" /><path d="M7 12h14" /></>,
    paperclip: <path d="m20 11-8.5 8.5a5 5 0 0 1-7-7L14 3a3.5 3.5 0 0 1 5 5l-9.5 9.5a2 2 0 0 1-3-3L15 6" />,
    spark: <><path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8z" /><path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" /></>,
    trend: <><path d="M4 17 9 12l4 3 7-8" /><path d="M15 7h5v5" /></>,
    nodes: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.3 10.9 7.4-3.8M8.3 13.1l7.4 3.8" /></>,
    compare: <path d="M7 4v16M17 4v16M4 8l3-3 3 3M14 16l3 3 3-3" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    check: <path d="m5 12 4 4L19 6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function StockSearch({ onAdd }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const results = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase()
    if (!term) return STOCKS.slice(0, 3)
    return STOCKS.filter((stock) => stock.code.includes(term) || stock.name.toLowerCase().includes(term)).slice(0, 4)
  }, [deferredQuery])

  return <div className="stock-search">
    <label htmlFor="stock-query">股票代码 / 名称</label>
    <div className="search-field">
      <Icon name="search" size={16} />
      <input id="stock-query" value={query} onChange={(event) => { setQuery(event.target.value); setOpen(true) }} onFocus={() => setOpen(true)} placeholder="例如 600519 或 贵州茅台" autoComplete="off" />
      {query ? <button className="icon-button tiny" type="button" aria-label="清空搜索" onClick={() => setQuery('')}><Icon name="close" size={14} /></button> : null}
    </div>
    {open ? <div className="search-results">
      <div className="result-label">A 股搜索结果</div>
      {results.length ? results.map((stock) => <button type="button" className="stock-result" key={stock.code} onClick={() => { onAdd(stock); setQuery(''); setOpen(false) }}>
        <span className="market-badge">{stock.market}</span>
        <span className="stock-identity"><strong>{stock.name}</strong><small>{stock.code}</small></span>
        <span className="stock-quote"><strong>{stock.price}</strong><small className={stock.change.startsWith('-') ? 'down' : 'up'}>{stock.change}</small></span>
      </button>) : <div className="empty-result">未找到匹配股票</div>}
    </div> : null}
  </div>
}

function Sidebar({ mobileOpen, onClose }) {
  const [stocks, setStocks] = useState([STOCKS[0]])
  const [processing, setProcessing] = useState(false)
  const [ready, setReady] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileRef = useRef(null)
  const addStock = (stock) => { setStocks((current) => current.some((item) => item.code === stock.code) ? current : [...current, stock]); setReady(false) }
  const runPipeline = () => {
    if (!stocks.length && !fileName) return
    setProcessing(true); setReady(false)
    window.setTimeout(() => { setProcessing(false); setReady(true) }, 1800)
  }
  const downloadReport = () => {
    const report = `FinGraphRAG 社区研究报告\n\n标的：${stocks.map((stock) => `${stock.name}(${stock.code})`).join('、') || fileName}\n数据源：AKShare / 用户数据\n状态：GraphRAG 知识图谱已构建\n\n本文件为前端展示页生成的示例报告。`
    const url = URL.createObjectURL(new Blob([report], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'FinGraphRAG-社区研究报告.txt'; anchor.click(); URL.revokeObjectURL(url)
  }

  return <>
    <div className={`sidebar-backdrop ${mobileOpen ? 'visible' : ''}`} onClick={onClose} />
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand-row">
        <div className="brand-mark"><Icon name="logo" size={19} strokeWidth={2.2} /></div>
        <div><strong>FinGraphRAG</strong><span>基于图增强的金融挖掘智能体</span></div>
        <button type="button" className="mobile-close icon-button" onClick={onClose} aria-label="关闭侧栏"><Icon name="close" /></button>
      </div>
      <button className="new-chat" type="button"><Icon name="plus" size={17} />新建对话<span>⌘ K</span></button>
      <nav className="side-nav" aria-label="主要导航">
        <button type="button" className="active"><Icon name="database" />数据工作台</button>
        <button type="button"><Icon name="history" />历史对话<span className="count">3</span></button>
      </nav>
      <div className="sidebar-scroll">
        <section className="panel-section">
          <div className="section-heading"><div><span className="eyebrow">DATA SOURCE</span><h2>导入财经数据</h2></div><span className="source-status"><i /> AKShare</span></div>
          <StockSearch onAdd={addStock} />
          <div className="divider"><span>或</span></div>
          <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" hidden onChange={(event) => { setFileName(event.target.files?.[0]?.name || ''); setReady(false) }} />
          <button className="upload-button" type="button" onClick={() => fileRef.current?.click()}><Icon name="upload" size={17} /><span>{fileName || '上传本地数据'}</span><small>CSV / XLSX</small></button>
        </section>
        {(stocks.length || fileName) ? <section className="selected-section">
          <div className="selected-title"><span>已选择 {stocks.length} 个标的</span><button type="button" onClick={() => { setStocks([]); setReady(false) }}>全部清除</button></div>
          <div className="selected-list">{stocks.map((stock) => <div className="selected-stock" key={stock.code}>
            <div className="stock-monogram">{stock.name.slice(0, 1)}</div><div><strong>{stock.name}</strong><small>{stock.code}.{stock.market}</small></div>
            <button type="button" className="icon-button tiny" aria-label={`移除${stock.name}`} onClick={() => { setStocks((items) => items.filter((item) => item.code !== stock.code)); setReady(false) }}><Icon name="close" size={13} /></button>
          </div>)}</div>
          <button className={`pipeline-button ${processing ? 'loading' : ''}`} type="button" onClick={runPipeline} disabled={processing}>
            {processing ? <span className="spinner" /> : ready ? <Icon name="check" size={17} /> : <Icon name="spark" size={17} />}
            {processing ? '正在构建金融知识图谱…' : ready ? '知识图谱已就绪' : '运行 GraphRAG 流程'}
          </button>
          {processing ? <div className="progress-track"><span /></div> : null}
        </section> : null}
        <section className="report-section">
          <div className="section-heading compact"><div><span className="eyebrow">COMMUNITY REPORT</span><h2>社区报告</h2></div></div>
          <button type="button" className="report-card" onClick={downloadReport}><span className="report-icon"><Icon name="report" /></span><span><strong>投资关系洞察报告</strong><small>{ready ? '刚刚生成 · 12 页' : '示例报告 · 12 页'}</small></span><Icon name="download" size={17} /></button>
        </section>
      </div>
      <div className="sidebar-footer">
        <div className="system-status"><span><i /> 系统运行正常</span><small>v1.0</small></div>
        <div className="user-row"><div className="avatar">研</div><div><strong>研究分析员</strong><small>个人工作区</small></div><Icon name="chevron" size={15} /></div>
      </div>
    </aside>
  </>
}

function App() {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sendMessage = (content = draft) => {
    const text = content.trim()
    if (!text || thinking) return
    setMessages((items) => [...items, { role: 'user', content: text }]); setDraft(''); setThinking(true)
    window.setTimeout(() => {
      setMessages((items) => [...items, { role: 'assistant', content: '我已基于已导入的市场数据与企业关系图谱完成检索。当前证据显示，公司基本面与产业链景气度形成了较强支撑；需要重点关注估值分位、上游成本波动和主要股东行为。你可以继续让我展开任一维度，或生成完整社区研报。' }]); setThinking(false)
    }, 1100)
  }
  const onSubmit = (event) => { event.preventDefault(); sendMessage() }

  return <div className="app-shell">
    <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    <main className="chat-area">
      <header className="topbar">
        <button className="menu-button icon-button" type="button" aria-label="打开侧栏" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button>
        <div className="model-selector"><span>FinGraph 智能分析</span><small>GraphRAG 增强</small></div>
        <div className="topbar-actions"><span className="secure-badge"><i /> 数据仅在本地会话中使用</span><button type="button" className="icon-button" aria-label="帮助"><Icon name="info" /></button></div>
      </header>
      <div className={`conversation ${messages.length ? 'has-messages' : ''}`}>
        {messages.length === 0 ? <section className="welcome">
          <div className="welcome-mark"><Icon name="logo" size={29} strokeWidth={2} /></div>
          <p className="welcome-kicker">FINANCIAL INTELLIGENCE, CONNECTED</p>
          <h1>小作文竟引发股市巨变，到底是什么原因？</h1>
          <p className="welcome-copy">从市场数据到企业关系，FinGraphRAG 帮你发现分散信息之间的关键联系。</p>
          <div className="suggestion-grid">{SUGGESTIONS.map((item) => <button type="button" className="suggestion-card" key={item.title} onClick={() => sendMessage(item.text)}>
            <span className="suggestion-icon"><Icon name={item.icon} /></span><span><strong>{item.title}</strong><small>{item.text}</small></span><Icon name="chevron" size={16} />
          </button>)}</div>
        </section> : <div className="message-list">
          {messages.map((message, index) => <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
            {message.role === 'assistant' ? <div className="assistant-avatar"><Icon name="logo" size={16} strokeWidth={2.2} /></div> : null}
            <div className="message-content">{message.role === 'assistant' ? <span className="message-author">FinGraph 智能分析</span> : null}<p>{message.content}</p></div>
          </article>)}
          {thinking ? <article className="message assistant"><div className="assistant-avatar"><Icon name="logo" size={16} /></div><div className="thinking"><i /><i /><i /></div></article> : null}
        </div>}
      </div>
      <div className="composer-zone">
        <form className="composer" onSubmit={onSubmit}>
          <label htmlFor="chat-input" className="sr-only">输入金融研究问题</label>
          <textarea id="chat-input" rows="1" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage() } }} placeholder="向 FinGraphRAG 提问…" />
          <div className="composer-actions"><button type="button" className="attach-button" aria-label="添加附件"><Icon name="paperclip" size={19} /></button><span className="scope-chip"><Icon name="nodes" size={15} />全局图谱</span><button type="submit" className="send-button" disabled={!draft.trim() || thinking} aria-label="发送"><Icon name="send" size={17} /></button></div>
        </form>
        <p className="disclaimer">FinGraphRAG 可能会生成不准确的信息，请核验重要数据。本产品不构成投资建议。</p>
      </div>
    </main>
  </div>
}

export default App
