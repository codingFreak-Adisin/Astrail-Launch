import Image from 'next/image'

const integrations = [
  ['Slack', '/app-icons/slack.svg'],
  ['GitHub', '/app-icons/github.svg'],
  ['Drive', '/app-icons/googledrive.svg'],
  ['Notion', '/app-icons/notion.svg'],
]

const supportedProducts = [
  ['OpenAPI', '/app-icons/openapi.svg'],
  ['Slack', '/app-icons/slack.svg'],
  ['Google Drive', '/app-icons/googledrive.svg'],
  ['GitHub', '/app-icons/github.svg'],
  ['Vercel', '/app-icons/vercel.svg'],
  ['Notion', '/app-icons/notion.svg'],
]

export default function Hero() {
  return (
    <section className="hero" id="product" aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true" />
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-kicker"><span /> The deployment platform for MCP servers</p>
          <h1 id="hero-title"><span>Connect your tools once.</span><span className="hero-title-impact">Put them to work everywhere.</span></h1>
          <p className="hero-sub">Bring Slack, Drive, GitHub, and your own APIs into one workspace. Choose what AI can do, rotate credentials in one place, and stop maintaining separate integrations.</p>
          <div className="hero-ctas">
            <a className="hero-primary-cta" href="/signup">Start building <span aria-hidden="true">→</span></a>
            <a className="hero-text-link" href="#runtime">See the runtime <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-proof"><span>Encrypted credentials</span><span>Scoped CLI tokens</span><span>Approval controls</span></div>
        </div>

        <div className="playground" id="playground">
          <div className="demo-head"><div><span className="demo-eyebrow">Workspace</span><strong>Customer operations</strong></div><span className="demo-count">4 integrations</span></div>
          <div className="demo-flow">
            <div className="demo-apps">
              {integrations.map(([name, icon]) => <button key={name} type="button" title={name}><Image src={icon} alt="" width={24} height={24} /><span>{name}</span></button>)}
              <a href="/signup" aria-label="Add integration">+</a>
            </div>
          </div>
          <div className="demo-details" aria-label="Workspace details">
            <div><span>One endpoint</span><strong>All your tools</strong><small>No separate MCP setup for each app</small></div>
            <div><span>Tool controls</span><strong>Your rules</strong><small>Allow, block, or require approval</small></div>
            <div><span>Credential rotation</span><strong>No reconnecting</strong><small>Replace keys without rebuilding access</small></div>
          </div>
          <div className="demo-endpoint">
            <div><span>One endpoint for this workspace</span><code>api.astrail.dev/mcp/customer-operations</code></div>
            <a href="/signup">Create yours <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div className="hero-logo-strip container" aria-label="Supported integrations"><span>Works with</span>{supportedProducts.map(([name, icon]) => <div key={name}><Image src={icon} alt="" width={20} height={20} /><strong>{name}</strong></div>)}</div>
    </section>
  )
}
