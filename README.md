# 🎮 NIT Silchar Esports Club

Official website of the **NIT Silchar Esports Club**, built to showcase tournaments, team details, events, and esports activities at NIT Silchar.

This project is open-source and welcomes contributions from the developer community!

---

## ⚙️ Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Authentication | Google OAuth (via [Supabase](https://supabase.com)) |
| Backend | Node.js + Express  |
| Deployment | [Vercel](https://vercel.com/) |
| Database | [Supabase PostgreSQL](https://supabase.com/) |

---

## 🧑‍💻 Getting Started (Local Setup)

Follow these steps to run the project locally 👇

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nitsesports/nitsesports.git
cd nitsesports
2️⃣ Install Dependencies
Using npm:

bash
Copy code
npm install
Or if you’re using Bun:

bash
Copy code
bun install
3️⃣ Configure Environment Variables
Copy the example environment file:

bash
Copy code
cp .env.example .env
Now open .env and fill in your own credentials:

bash
Copy code
VITE_SUPABASE_URL = https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
VITE_ADMIN_EMAIL = your-email@example.com
VITE_GOOGLE_CLIENT_ID = your-google-client-id
⚠️ Note: .env is already listed in .gitignore.
Never commit real secrets or private keys to GitHub.

4️⃣ Start the Development Server
bash
Copy code
npm run dev
Then open your browser and visit:
👉 http://localhost:5173

You should see the NITS Esports homepage 🎉

🗂️ Project Structure
graphql
Copy code
nitsesports/
├── public/               # Static assets (favicon, images, videos)
├── src/                  # React app source code
├── types/                # TypeScript type definitions
├── .env.example          # Example environment variables
├── .gitignore            # Files ignored by Git
├── vite.config.js        # Vite build configuration
├── tailwind.config.cjs   # Tailwind setup
├── postcss.config.js     # PostCSS config for Tailwind
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Deployment configuration (Vercel)
└── README.md             # You are here 🚀
🤝 Contributing
Contributions are welcome and appreciated 💙

Steps to contribute:
Fork this repository

Create a new branch for your feature or fix

bash
Copy code
git checkout -b feature/your-feature-name
Make your changes and test locally

Commit and push your branch

bash
Copy code
git commit -m "Add: your feature name"
git push origin feature/your-feature-name
Open a Pull Request (PR)
Explain your changes and link related issues (if any)

🧹 Code Quality & Guidelines
Follow consistent naming conventions (camelCase for variables, PascalCase for components)

Run ESLint before pushing:

bash
Copy code
npm run lint
Avoid committing build artifacts or node_modules/

🚀 Deployment
The production build is automatically deployed via Vercel.

To create a local production build:

bash
Copy code
npm run build
npm run preview
📧 Contact
For queries, suggestions, or collaborations, reach out:

📩 Email: esports.nits@gmail.com

🌐 Website: nitsesports.in

🧑‍💻 GitHub Org: github.com/nitsesports

📜 License
This project is licensed under the MIT License.
You’re free to use, modify, and distribute it with attribution.

🏆 Credits
Built with ❤️ by
NIT Silchar Esports Dev Team
Contributors, organizers, and developers of NITS Esports.


