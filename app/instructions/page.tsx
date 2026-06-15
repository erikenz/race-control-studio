import Link from "next/link";
import { sharedStyles } from "@/components/alerts/shared";

export default function InstructionsPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-grid-pattern bg-slate-950 font-sans text-slate-100">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static trusted styles */}
      <style dangerouslySetInnerHTML={{ __html: sharedStyles }} />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-20 border-slate-800/80 border-b bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#e10600] shadow-[0_0_8px_#e10600]" />
            <span className="font-black font-mono text-red-500 text-sm uppercase tracking-widest">
              F1 Alert Studio
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              className="font-bold text-slate-400 text-xs uppercase tracking-wider transition hover:text-slate-100"
              href="/"
            >
              Studio
            </Link>
            <Link
              className="font-bold text-red-500 text-xs uppercase tracking-wider transition hover:text-red-400"
              href="/instructions"
            >
              Instructions
            </Link>
          </nav>
        </div>
      </header>

      {/* Background design elements */}
      <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#e10600]/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />

      {/* Content Container */}
      <div className="z-10 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-2 border-slate-800/80 border-b pb-6">
            <span className="font-bold font-mono text-red-500 text-xs uppercase tracking-wider">
              System Documentation
            </span>
            <h1 className="font-black text-3xl uppercase tracking-tight md:text-4xl">
              Botrix Configuration Guide
            </h1>
            <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
              Step-by-step instructions for importing, customizing, and styling
              your custom Formula 1 incident alert widgets directly inside the
              Botrix streaming dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Steps Column */}
            <div className="flex flex-col gap-6 md:col-span-2">
              <section className="flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 shadow-lg backdrop-blur-sm md:p-6">
                <h2 className="font-extrabold text-base text-slate-200 uppercase tracking-wide">
                  📋 Step-by-Step Integration
                </h2>
                <ol className="list-decimal space-y-4 pl-5 text-slate-355 text-sm">
                  <li>
                    <strong className="text-slate-100">Copy the Code:</strong>{" "}
                    On the main Alert Studio page, select your alert type (e.g.
                    Subscription), customize the layout, and click the{" "}
                    <code className="rounded bg-slate-900 px-1.5 py-0.5 text-red-400 text-xs">
                      Copy HTML
                    </code>{" "}
                    button.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Open Botrix Dashboard:
                    </strong>{" "}
                    Log in to your Botrix profile and navigate to{" "}
                    <strong className="text-slate-200">Alerts</strong> from the
                    sidebar menu.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Select Alert Category:
                    </strong>{" "}
                    Click on the category corresponding to the widget type you
                    copied (e.g. Followers, Subscriptions, Tips).
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Enable Custom HTML:
                    </strong>{" "}
                    Scroll down to the bottom of the widget settings panel, and
                    turn on the{" "}
                    <strong className="text-red-400">Custom Code</strong> toggle
                    switch.
                  </li>
                  <li>
                    <strong className="text-slate-100">Paste Code:</strong> Open
                    the <strong className="text-slate-200">HTML</strong> tab
                    inside the custom code block, delete any existing content,
                    and paste the copied studio snippet.
                  </li>
                  <li>
                    <strong className="text-slate-100">
                      Prune CSS/JS Tabs:
                    </strong>{" "}
                    Make sure the{" "}
                    <strong className="text-slate-200">CSS</strong> and{" "}
                    <strong className="text-slate-200">JS</strong> tabs in
                    Botrix are <strong className="text-red-400">empty</strong>{" "}
                    to prevent conflicts, as the F1 Alert Studio bundle embeds
                    styles natively.
                  </li>
                  <li>
                    <strong className="text-slate-100">Save Settings:</strong>{" "}
                    Click <strong className="text-emerald-500">Save</strong> at
                    the bottom of the page to apply the settings.
                  </li>
                </ol>
              </section>

              <section className="flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 shadow-lg backdrop-blur-sm md:p-6">
                <h2 className="font-extrabold text-base text-slate-200 uppercase tracking-wide">
                  🔧 Dashboard Variables Setup
                </h2>
                <p className="text-slate-355 text-sm leading-relaxed">
                  The alert detail text is fully dynamic and depends on the
                  message you configure in the Botrix panel under the{" "}
                  <strong className="text-slate-200">"Text"</strong> input box.
                </p>
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="flex flex-col gap-1 rounded border border-slate-900 bg-slate-950 p-2.5">
                    <span className="font-bold text-red-500">
                      1. Standard Alerts (Follows/Hosts)
                    </span>
                    <span className="text-slate-400">
                      Text setting:{" "}
                      <code className="text-slate-200">
                        {"{name} grid entry - new follower"}
                      </code>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded border border-slate-900 bg-slate-955 p-2.5">
                    <span className="font-bold text-red-500">
                      2. Subscriptions with Messages (Team Radio style)
                    </span>
                    <span className="text-slate-400">
                      Text setting:{" "}
                      <code className="text-slate-200">
                        {'📻 RADIO: "{message}"'}
                      </code>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded border border-slate-900 bg-slate-955 p-2.5">
                    <span className="font-bold text-red-500">
                      3. Tips/Donations
                    </span>
                    <span className="text-slate-400">
                      Text setting:{" "}
                      <code className="text-slate-200">
                        {'TIPPED {amount} - "{message}"'}
                      </code>
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 shadow-lg backdrop-blur-sm">
                <h3 className="mb-3 font-bold font-mono text-slate-200 text-xs uppercase tracking-wider">
                  ⚠️ Crucial Advice
                </h3>
                <ul className="space-y-3.5 text-slate-400 text-xs">
                  <li className="leading-relaxed">
                    <span className="font-bold text-red-500">
                      1. Clean Tabs:
                    </span>{" "}
                    Leaving default styles inside Botrix's CSS tab will distort
                    the F1 layout. Always clear it completely!
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-bold text-red-500">
                      2. Refresh Browser:
                    </span>{" "}
                    When making updates to code in Botrix, you must click
                    "Refresh Cache" or restart the browser source inside OBS
                    Studio.
                  </li>
                  <li className="leading-relaxed">
                    <span className="font-bold text-red-500">
                      3. Aspect Ratio:
                    </span>{" "}
                    The alert viewport should be added to OBS as a Browser
                    Source with a width of{" "}
                    <strong className="text-slate-200">1920</strong> and height
                    of <strong className="text-slate-200">1080</strong> for
                    optimal centering.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 shadow-lg backdrop-blur-sm">
                <h3 className="font-bold font-mono text-slate-200 text-xs uppercase tracking-wider">
                  🧪 Supported Placeholders
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Botrix injects real-time overlay details using these
                  curly-brace placeholders inside the "Text" field:
                </p>
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                  <span className="rounded bg-slate-950 p-1.5 text-slate-300">
                    {"{name}"}
                  </span>
                  <span className="rounded bg-slate-950 p-1.5 text-slate-300">
                    {"{amount}"}
                  </span>
                  <span className="rounded bg-slate-950 p-1.5 text-slate-300">
                    {"{message}"}
                  </span>
                  <span className="rounded bg-slate-950 p-1.5 text-slate-300">
                    {"{text}"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
