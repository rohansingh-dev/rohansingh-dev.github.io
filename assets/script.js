// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.querySelector(".theme-toggle");
    const themeMenu = document.getElementById("theme-menu");
    const themeMenuItems = document.querySelectorAll(".theme-menu-item");
    const htmlElement = document.documentElement;
    const themes = ['light', 'dark', 'blue', 'green', 'purple', 'rose', 'orange'];

    // Function to apply theme
    function applyTheme(theme) {
        // Remove all theme classes before adding the new one
        themes.forEach(t => htmlElement.classList.remove(t));
        htmlElement.classList.add(theme);
        localStorage.setItem("theme", theme);

        // Update color-scheme style for browser UI consistency
        if (theme === 'dark') {
            htmlElement.style.colorScheme = 'dark';
        } else {
            // Default to light for light theme and custom themes
            htmlElement.style.colorScheme = 'light';
        }
        // Close the menu
        themeMenu?.classList.add("hidden");
        themeToggleButton?.setAttribute('aria-expanded', 'false');
        themeToggleButton?.setAttribute('data-state', 'closed');
    }

    // Toggle theme menu visibility
    themeToggleButton?.addEventListener("click", () => {
        const isExpanded = themeToggleButton.getAttribute('aria-expanded') === 'true';
        themeMenu?.classList.toggle("hidden");
        themeToggleButton.setAttribute('aria-expanded', String(!isExpanded));
        themeToggleButton.setAttribute('data-state', isExpanded ? 'closed' : 'open');
    });

    // Add event listeners to theme menu items
    themeMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            const theme = item.getAttribute("data-theme");
            if (theme) {
                applyTheme(theme);
            }
        });
    });

    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    primary: {
                        DEFAULT: 'hsl(var(--primary))',
                        foreground: 'hsl(var(--primary-foreground))',
                    },
                    background: 'hsl(var(--background))',
                    foreground: 'hsl(var(--foreground))',
                    muted: {
                        DEFAULT: 'hsl(var(--muted))',
                        foreground: 'hsl(var(--muted-foreground))',
                    },
                    accent: {
                        DEFAULT: 'hsl(var(--accent))',
                        foreground: 'hsl(var(--accent-foreground))',
                    },
                    card: {
                        DEFAULT: 'hsl(var(--card))',
                        foreground: 'hsl(var(--card-foreground))',
                    },
                },
                borderRadius: {
                    lg: 'var(--radius)',
                },
            },
        },
    };

    // Close menu if clicking outside
    document.addEventListener('click', (event) => {
        if (!themeToggleButton?.contains(event.target) && !themeMenu?.contains(event.target)) {
            themeMenu?.classList.add('hidden');
            themeToggleButton?.setAttribute('aria-expanded', 'false');
            themeToggleButton?.setAttribute('data-state', 'closed');
        }
    });

    // Initial theme load (simplified and corrected)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes.includes(savedTheme)) {
        applyTheme(savedTheme);
    } else {
        // Default to dark if no valid theme is saved
        applyTheme('dark');
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        // Add offset for fixed navbar height if necessary
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const targetPosition = targetElement?.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        if (targetPosition !== undefined) {
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }

        // Close mobile menu if open
        mobileMenu?.classList.add("hidden");
    });
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

mobileMenuButton?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
});

//github projects
const projectsContainer = document.getElementById("projects-container");

async function loadProjects() {
    try {
        const response = await fetch("assets/repos.json");
        if (!response.ok) {
            console.error("Failed to fetch local repo data:", response.status);
            return;
        }
        const repos = await response.json();
        for (const repoDetails of repos) {
            const topics = repoDetails.topics || [];
            const projectCard = document.createElement("div");
            projectCard.className =
                "rounded-lg border bg-card text-card-foreground h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] dark:bg-slate-800 dark:border-slate-700";
            projectCard.innerHTML = `
                <div class="flex flex-col space-y-1.5 p-6">
                    <h3 class="text-2xl font-semibold leading-none tracking-tight flex items-center justify-between">
                        ${repoDetails.name}
                        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ml-2 dark:border-slate-600 dark:text-slate-300">
                            ${repoDetails.language || "N/A"}
                        </div>
                    </h3>
                    <p class="text-sm text-muted-foreground dark:text-slate-400">
                        ${repoDetails.description || "No description available."}
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${topics
                            .map(
                                (topic) => `
                                    <span class="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
                                        ${topic}
                                    </span>`
                            )
                            .join("")}
                    </div>
                </div>
                <div class="items-center p-6 pt-0 flex justify-between">
                    <div class="flex items-center gap-4">
                        <span class="text-sm dark:text-slate-400">⭐ ${repoDetails.stargazers_count}</span>
                        <span class="text-sm dark:text-slate-400">🍴 ${repoDetails.forks_count}</span>
                        <span class="text-sm dark:text-slate-400">👀 ${repoDetails.watchers_count}</span>
                    </div>
                    <a
                        href="${repoDetails.html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-full flex items-center gap-1 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                    >
                        View
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-external-link h-3 w-3 ml-1"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1-2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" x2="21" y1="14" y2="3"></line>
                        </svg>
                    </a>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        }
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

loadProjects();
