"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RuntimeLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [clientTab, setClientTab] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll("main > section:not(.hero), footer");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="runtime-home">
      <header className="nav">
        <a className="brand" href="#top" aria-label="Astrail home"><span className="brand-mark">A</span>Astrail</a>
        <nav
          id="marketing-navigation"
          className={menuOpen ? "navlinks open" : "navlinks"}
          aria-label="Main navigation"
        >
          <a href="#product" onClick={() => setMenuOpen(false)}>Product</a>
          <a href="#runtime" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <Link href="/docs" onClick={() => setMenuOpen(false)}>Docs</Link>
          <Link className="mobile-only" href="/signup">Start building</Link>
        </nav>
        <div className="nav-actions"><Link href="/login">Sign in</Link><Link className="tiny-cta" href="/signup">Start building ↗</Link></div>
        <button
          className="menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="marketing-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <i/><i/><i/>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="rays" aria-hidden="true">{Array.from({length: 10}).map((_,i)=><i key={i}/>)}</div>
        <p className="eyebrow">THE DEPLOYMENT PLATFORM FOR MCP SERVERS</p>
        <h1>Connect your tools.<br/><span>Put them to work everywhere.</span></h1>
        <p className="lede">One hosted runtime for every agent, API, and workflow. Control what AI can do, rotate credentials once, and stop maintaining separate integrations.</p>
        <div className="hero-actions"><Link className="button light" href="/signup">START BUILDING</Link><a className="button dark" href="#runtime">SEE THE RUNTIME</a></div>
      </section>

      <section className="logo-rail" aria-label="Compatible platforms">
        <p>WORKS WITH EVERY<br/>MCP CLIENT</p>
        {[
          ["CLAUDE", "/logos/claude.svg"], ["CURSOR", "/logos/cursor.svg"],
          ["OPENAI", "/logos/openai.svg"], ["WINDSURF", "/logos/windsurf.svg"],
          ["VERCEL", "/logos/vercel.svg"],
        ].map(([name, src])=><span className="company-logo" key={name}><Image src={`/runtime-home${src}`} alt="" width={24} height={24}/><b>{name}</b></span>)}
      </section>

      <section className="manifesto" id="product">
        <p className="section-tag">WHY ASTRAIL</p>
        <h2>Your agents need more<br/>than access to docs.</h2>
        <p className="manifesto-copy">They need a secure way to take action. Astrail turns the systems your company already uses into reliable tools—available through one endpoint, with credentials, policy, and logs built in.</p>
      </section>

      <section className="problem-grid">
        {[
          ["01", "ONE ENDPOINT", "All your tools", "Connect Slack, Drive, GitHub, internal APIs, and more without separate MCP setup for every client."],
          ["02", "TOOL CONTROLS", "Your rules", "Allow, block, or require approval for sensitive actions. Every call respects the same boundary."],
          ["03", "CREDENTIALS", "No reconnecting", "Replace keys without rebuilding access. Astrail keeps credentials encrypted and out of prompts."],
        ].map(([n,k,h,p], index)=><article key={n}><div className="article-top"><span>{n}</span><span>{k}</span></div><div className="feature-photo"><Image src={`/runtime-home${["/feature-art/all-your-tools.png","/feature-art/your-rules.png","/feature-art/no-reconnecting.png"][index]}`} alt="" width={1672} height={941}/><span>{n}</span></div><h3>{h}</h3><p>{p}</p></article>)}
      </section>

      <section className="runtime" id="runtime">
        <div className="runtime-copy"><p className="section-tag">ONE RUNTIME. EVERYWHERE.</p><h2>Connect once.<br/>Run anywhere.</h2><p>Build a workspace around a team, product, or process. Astrail exposes the right tools to any MCP client while keeping execution deterministic.</p><Link className="text-link" href="/docs">EXPLORE THE ARCHITECTURE ↗</Link></div>
        <div className="runtime-principle" aria-label="How the Astrail runtime works">
          <div className="principle-intro"><span>THE ARCHITECTURE</span><strong>One controlled path<br/>from intent to action.</strong></div>
          {[
            ["01", "DEFINE", "Turn every system into a clear, typed tool."],
            ["02", "GOVERN", "Apply credentials, policy, and approvals once."],
            ["03", "SERVE", "Expose the same runtime to every MCP client."],
          ].map(([n, label, copy]) => <div className="principle-row" key={n}><b>{n}</b><span>{label}</span><p>{copy}</p></div>)}
          <div className="principle-foot"><span>TOOLS IN</span><i/><span>CONTROLLED ACTIONS OUT</span></div>
        </div>
      </section>

      <section className="client-proof">
        <div className="client-copy"><p className="section-tag">ANY MCP CLIENT</p><h2>One endpoint.<br/>Your stack.</h2><p>Connect Astrail to the agent framework you already use. The runtime, policies, and tools stay exactly the same.</p></div>
        <div className="code-proof">
          <div className="code-tabs" role="tablist" aria-label="MCP client examples">{["OPENAI", "CLAUDE", "CURSOR"].map((name,i)=><button key={name} role="tab" aria-selected={clientTab===i} onClick={()=>setClientTab(i)}>{name}</button>)}</div>
          <pre role="tabpanel"><code>{[
`const astrail = new MCPServerStreamableHttp({
  name: "astrail",
  url: process.env.ASTRAIL_MCP_URL,
  requestInit: {
    headers: { Authorization: \`Bearer \${API_KEY}\` }
  }
});

const agent = new Agent({
  name: "Ops Agent",
  mcpServers: [astrail]
});`,
`{
  "mcpServers": {
    "astrail": {
      "type": "streamable-http",
      "url": "https://api.astrail.dev/mcp",
      "headers": { "Authorization": "Bearer …" }
    }
  }
}`,
`{
  "mcpServers": {
    "astrail": {
      "url": "https://api.astrail.dev/mcp",
      "headers": { "Authorization": "Bearer …" }
    }
  }
}`][clientTab]}</code></pre>
          <div className="code-foot"><span>STREAMABLE HTTP</span><span>SCOPED AUTH</span><span>NO CLIENT-SPECIFIC TOOLS</span></div>
        </div>
      </section>

      <section className="comparison">
        <div className="comparison-title"><p className="section-tag">WHY TEAMS PICK ASTRAIL</p><h2>Production infrastructure,<br/>without rebuilding it.</h2></div>
        <div className="comparison-table" role="table" aria-label="Astrail comparison">
          <div className="comparison-row comparison-head" role="row"><span>CAPABILITY</span><strong>ASTRAIL</strong><span>DIY MCP</span><span>DOCS + PROMPTING</span></div>
          {[
            ["TIME TO ENDPOINT", "Minutes", "Weeks", "Not applicable"],
            ["EXECUTION", "Deterministic maps", "Depends on code", "Model guesses"],
            ["AUTH BOUNDARIES", "Scoped + managed", "Custom plumbing", "Keys in prompts"],
            ["LOGS + LIMITS", "Included", "You maintain", "None"],
            ["OWNERSHIP", "Exportable", "Owned", "No runtime"],
          ].map((row)=><div className="comparison-row" role="row" key={row[0]}>{row.map((cell,i)=>i===1?<strong key={cell}>{cell}</strong>:<span key={cell}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="deterministic-proof">
        <div className="deterministic-title"><p className="section-tag">DETERMINISTIC BY DESIGN</p><h2>No eval.<br/>No guessing.</h2><p>Every tool call follows a reviewable path from agent intent to a real API request.</p></div>
        <div className="execution-path">
          {[
            ["01", "TOOLS / CALL", "Agent invokes a typed tool"],
            ["02", "ENDPOINT MAP", "Astrail resolves the exact operation"],
            ["03", "NATIVE FETCH", "Scoped credentials are applied"],
            ["04", "TRACE", "Outcome and auth decision are logged"],
          ].map(([n,h,p])=><div className="execution-step" key={n}><b>{n}</b><div><strong>{h}</strong><p>{p}</p></div></div>)}
          <div className="execution-result"><span>POST</span><code>create_purchase_order</code><strong>201 CREATED</strong></div>
        </div>
      </section>

      <section className="features">
        <div className="features-title"><p className="section-tag">THE CONTROL PLANE</p><h2>Everything teams need<br/>to ship agents.</h2></div>
        {[
          ["AUTH BOUNDARIES", "Credentials that stay out of the model", "Encrypted secrets, scoped access, and approval steps follow every tool call."],
          ["DETERMINISTIC EXECUTION", "Mapped tools. Predictable outcomes.", "Endpoint maps and native fetch replace brittle, model-generated integration code."],
          ["OBSERVABILITY", "Every action leaves a trail", "Redacted arguments, trace data, auth decisions, and execution outcomes in one log."],
          ["EXPORTABLE BY DEFAULT", "Your runtime. Your code.", "Start hosted, export when you need to, and keep the same interface for every agent."],
        ].map(([k,h,p],i)=><article key={k}><span className="feature-no">0{i+1}</span><div className="feature-index" aria-hidden="true">0{i+1}</div><p className="section-tag">{k}</p><h3>{h}</h3><p>{p}</p></article>)}
      </section>

      <section className="pricing" id="pricing">
        <div><p className="section-tag">START FREE. SCALE LATER.</p><h2>From first tool<br/>to full control plane.</h2></div>
        <div className="price-card"><div className="price-top"><span>DEVELOPER</span><span>$0 / MONTH</span></div><h3>Build your first<br/>production-ready MCP.</h3><ul><li>Hosted execution</li><li>Unified endpoint</li><li>Logs and traces</li><li>Exportable code</li></ul><Link className="button lime" id="start" href="/signup">START BUILDING ↗</Link></div>
      </section>

      <section className="faq" id="faq">
        <div><p className="section-tag">FAQ</p><h2>Good questions.<br/>Straight answers.</h2></div>
        <div className="faq-list">{[
          ["What does Astrail actually do?", "Astrail generates agent tools from your systems and executes them deterministically behind one hosted MCP endpoint."],
          ["Why not build an MCP server ourselves?", "You can. Astrail removes the recurring work around hosting, authentication, credential rotation, approvals, and observability."],
          ["Is it only for developers?", "No. Technical teams set the boundaries; workflow owners use the same reliable integrations across their agent workflows."],
          ["Can we export our code?", "Yes. Astrail is designed so teams can begin hosted and retain a clear path to owning their runtime."],
        ].map(([q,a],i)=><article key={q}><button onClick={()=>setFaq(faq===i?null:i)} aria-expanded={faq===i}><span>{q}</span><b>{faq===i?"−":"+"}</b></button>{faq===i&&<p>{a}</p>}</article>)}</div>
      </section>

      <footer><div className="footer-main"><h2>Make every tool<br/>agent-ready.</h2><Link className="button lime" href="/signup">START BUILDING ↗</Link></div><div className="footer-bottom"><a className="brand" href="#top"><span className="brand-mark">A</span>Astrail</a><p>THE DEPLOYMENT PLATFORM<br/>FOR MCP SERVERS</p><div><a href="#product">Product</a><a href="#runtime">How it works</a><a href="#pricing">Pricing</a><Link href="/docs">Docs</Link></div><p>© 2026 ASTRAIL</p></div></footer>
    </main>
  );
}
