# Race Control Studio 🏎️

An open-source stream overlay toolkit designed to configure and style premium Formula 1 telemetry-style alerts for live stream widgets. While optimized specifically for **Kick Streams** via **Botrix Custom Code**, this tool also fully supports Twitch, YouTube, and Trovo overlays.

Live stream overlays should look as dynamic and professional as television broadcast telemetry. Race Control Studio lets you customize renewals, follower notifications, tips, hosts, and sub gifts to resemble official Formula 1 Race Control telemetry feeds.

---

## 🌟 Key Features

* **High-Fidelity Stream Simulator (16:9):** Test your alerts against a realistic, wet-weather F1 racing gameplay background, a green chroma-key canvas, or solid check grids.
* **Unified Telemetry Formats:** Complete coverage for all alert categories:
  * **Subscription Renewal:** Style it as a `RENEWAL INCIDENT`.
  * **Sub Gifts:** Style it as a `GIFT INCIDENT`.
  * **Followers:** Style it as a `GRID ENTRY`.
  * **Hosts:** Style it as a `RESTART INCIDENT`.
  * **KICK Special Alerts:** Native custom styling for Kick platforms.
  * **Tips & Donations:** Style it as a `PIT STOP INCIDENT`.
* **Zero JS Dependency in OBS:** The studio packages all HTML content, inline SVGs (including the iconic Formula 1 logo), and embedded styles directly into a single copy-paste HTML block. This eliminates JS script-execution issues inside OBS and prevents widget memory leaks.
* **Dynamic Placeholders:** Perfect integration with Botrix's native templating engine, using `{name}`, `{amount}`, `{message}`, and `{text}` variables directly.
* **Rigorous Code Quality:** Configured with [Ultracite](https://github.com/erikzen/ultracite) and Biome for zero-config linting, formatting, and safety verification.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, Turbopack)
* **Styling:** Tailwind CSS (v4) & Vanilla CSS for the widget styles
* **Linter & Formatter:** Biome (wrapped by Ultracite)
* **Components:** Custom lightweight layout using radix-ui via shadcn/ui primitives

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [pnpm](https://pnpm.io/) package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erikzen/race-control-studio.git
   cd race-control-studio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the local development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to access the studio.

---

## 📋 Botrix Integration Guide

Integrating the custom widgets into your Botrix account is simple. Follow these steps:

1. **Copy code from Studio:** Select your alert type in the Race Control Studio sidebar (e.g. Subscriptions), customize the telemetry details, and click **📋 Copy HTML**.
2. **Go to Botrix Alerts:** Open the [Botrix Dashboard](https://botrix.live/), select **Alerts** from the sidebar, and choose the tab that matches your alert category.
3. **Enable Custom Code:** Scroll to the bottom of the Botrix settings page and enable the **Custom Code** toggle.
4. **Paste HTML:** Paste the copied code block directly into the **HTML** tab.
5. **Prune CSS & JS:** Ensure the **CSS** and **JS** tabs in the custom code section are **completely empty** to avoid style conflicts.
6. **Configure the message text:** Set the custom text fields inside the Botrix settings panel using Botrix parameters:
   * **Followers:** `{name} grid entry - new follower`
   * **Subscriptions:** `📻 RADIO: "{message}"` or `{name} just subscribed!`
   * **Tips:** `TIPPED {amount} - "{message}"`
7. **Save & Refresh:** Click **Save** in Botrix. In OBS, refresh the cache of your browser source to load the new telemetry alert styles.

> [!IMPORTANT]
> For optimal rendering and centering, configure your OBS Browser Source with a width of **1920** and a height of **1080**.

---

## 💻 Developer Scripts

Available commands in the workspace:

* `pnpm run dev`: Starts the Next.js development server with Turbopack.
* `pnpm run build`: Compiles an optimized static production build.
* `pnpm run start`: Starts the Next.js production server.
* `pnpm run lint`: Performs static analysis checking for linter and formatting rules.
* `pnpm run check`: Runs formatting, linting, and quality analysis checks using Ultracite.
* `pnpm run fix`: Automatically formats files and fixes auto-resolvable lint issues.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Contributions, bug reports, and telemetry presets are highly welcome!
