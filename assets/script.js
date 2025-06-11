// Theme toggle functionality with enhanced animations
document.addEventListener("DOMContentLoaded", () => {
    // Show page loader
    const pageLoader = document.getElementById("page-loader")
  
    // Track if animations have already run
    let animationsInitialized = false
  
    const themeToggleButton = document.querySelector(".theme-toggle")
    const themeMenu = document.getElementById("theme-menu")
    const themeMenuItems = document.querySelectorAll(".theme-menu-item")
    const htmlElement = document.documentElement
    const themes = ["light", "dark", "blue", "green", "purple", "rose", "orange", "teal", "amber"]
  
    // Particles.js configurations for different themes
    const particlesConfigs = {
      light: {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#fff" },
          shape: { type: "circle" },
          opacity: { value: 0.2, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#fff", opacity: 0.1, width: 1 },
          move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" },
        },
      },
      dark: {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: "#3b82f6" },
          shape: { type: "circle" },
          opacity: { value: 0.2, random: true },
          size: { value: 4, random: true },
          line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.15, width: 1 },
          move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out" },
        },
      },
      blue: {
        particles: {
          number: { value: 120, density: { enable: true, value_area: 800 } },
          color: { value: "#38bdf8" },
          shape: { type: "triangle" },
          opacity: { value: 0.2, random: true },
          size: { value: 5, random: true },
          line_linked: { enable: true, distance: 150, color: "#38bdf8", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" },
        },
      },
      green: {
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: "#10b981" },
          shape: { type: "polygon", polygon: { nb_sides: 6 } },
          opacity: { value: 0.2, random: true },
          size: { value: 4, random: true },
          line_linked: { enable: true, distance: 150, color: "#10b981", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 2, direction: "top", random: false, straight: false, out_mode: "out" },
        },
      },
      purple: {
        particles: {
          number: { value: 160, density: { enable: true, value_area: 800 } },
          color: { value: "#8b5cf6" },
          shape: { type: "star" },
          opacity: { value: 0.2, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: false },
          move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" },
        },
      },
      rose: {
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: "#f43f5e" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: 6, random: true },
          line_linked: { enable: true, distance: 150, color: "#f43f5e", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out" },
        },
      },
      orange: {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#f97316" },
          shape: { type: "circle" },
          opacity: { value: 0.2, random: true },
          size: { value: 5, random: true },
          line_linked: { enable: true, distance: 150, color: "#f97316", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 2, direction: "bottom", random: true, straight: false, out_mode: "out" },
        },
      },
      teal: {
        particles: {
          number: { value: 90, density: { enable: true, value_area: 800 } },
          color: { value: "#14b8a6" },
          shape: { type: "circle" },
          opacity: { value: 0.2, random: true },
          size: { value: 4, random: true },
          line_linked: { enable: true, distance: 150, color: "#14b8a6", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 1.5, direction: "left", random: true, straight: false, out_mode: "out" },
        },
      },
      amber: {
        particles: {
          number: { value: 70, density: { enable: true, value_area: 800 } },
          color: { value: "#f59e0b" },
          shape: { type: "polygon", polygon: { nb_sides: 5 } },
          opacity: { value: 0.2, random: true },
          size: { value: 5, random: true },
          line_linked: { enable: true, distance: 150, color: "#f59e0b", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 2, direction: "right", random: true, straight: false, out_mode: "out" },
        },
      },
    }
  
    // Function to apply theme with enhanced animations
    function applyTheme(theme) {
      // Add transition class for smooth animations
      htmlElement.classList.add("theme-transition")
  
      // Remove all theme classes before adding the new one
      themes.forEach((t) => htmlElement.classList.remove(t))
  
      // Add the new theme class
      htmlElement.classList.add(theme)
  
      // Save theme preference
      localStorage.setItem("theme", theme)
  
      // Update color-scheme style for browser UI consistency
      if (theme === "light") {
        htmlElement.style.colorScheme = "light"
      } else {
        htmlElement.style.colorScheme = "dark"
      }
  
      // Close the menu
      themeMenu?.classList.add("hidden")
      themeToggleButton?.setAttribute("aria-expanded", "false")
      themeToggleButton?.setAttribute("data-state", "closed")
  
      // Update particles.js configuration
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
      }
  
      // Initialize particles with theme-specific config
      if (particlesConfigs[theme]) {
        window.particlesJS("particles-js", particlesConfigs[theme])
      }
  
      // Remove transition class after animation completes
      setTimeout(() => {
        htmlElement.classList.remove("theme-transition")
      }, 500)
    }
  
    // Toggle theme menu visibility
    themeToggleButton?.addEventListener("click", () => {
      const isExpanded = themeToggleButton.getAttribute("aria-expanded") === "true"
      themeMenu?.classList.toggle("hidden")
      themeToggleButton.setAttribute("aria-expanded", String(!isExpanded))
      themeToggleButton.setAttribute("data-state", isExpanded ? "closed" : "open")
    })
  
    // Add event listeners to theme menu items
    themeMenuItems.forEach((item) => {
      item.addEventListener("click", () => {
        const theme = item.getAttribute("data-theme")
        if (theme) {
          applyTheme(theme)
        }
      })
    })
  
    // Close menu if clicking outside
    document.addEventListener("click", (event) => {
      if (!themeToggleButton?.contains(event.target) && !themeMenu?.contains(event.target)) {
        themeMenu?.classList.add("hidden")
        themeToggleButton?.setAttribute("aria-expanded", "false")
        themeToggleButton?.setAttribute("data-state", "closed")
      }
    })
  
    // Initial theme load
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme && themes.includes(savedTheme)) {
      applyTheme(savedTheme)
    } else {
      // Default to dark if no valid theme is saved
      applyTheme("dark")
    }
  
    // Initialize particles.js
    if (document.getElementById("particles-js")) {
      const currentTheme = localStorage.getItem("theme") || "dark"
      window.particlesJS("particles-js", particlesConfigs[currentTheme])
    }
  
    // Initialize animations only once
    function initializeAnimations() {
      if (animationsInitialized) return
  
      // Initialize AOS animations
      const AOS = window.AOS // Declare AOS as a global variable
      AOS.init({
        once: true, // Only animate elements once
        mirror: false,
        duration: 800,
        disable: "mobile", // Disable on mobile devices for better performance
      })
  
      // Add typing animation to hero title
      const heroTitle = document.querySelector(".hero-title")
      if (heroTitle) {
        const originalText = heroTitle.textContent
        heroTitle.innerHTML = ""
  
        let i = 0
        const typeWriter = () => {
          if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i)
            i++
            setTimeout(typeWriter, 50)
          } else {
            // Add the highlight span after typing is complete
            heroTitle.innerHTML = heroTitle.innerHTML.replace(
              "Rohan Singh",
              '<span class="text-primary hero-highlight">Rohan Singh</span>',
            )
          }
        }
  
        setTimeout(typeWriter, 500)
      }
  
      // Add staggered entrance for social icons
      const socialIcons = document.querySelectorAll(".social-icon")
      socialIcons.forEach((icon, index) => {
        icon.style.opacity = "0"
        icon.style.transform = "translateY(20px)"
  
        setTimeout(
          () => {
            icon.style.transition = "all 0.5s ease"
            icon.style.opacity = "1"
            icon.style.transform = "translateY(0)"
          },
          1500 + index * 150,
        )
      })
  
      // Add entrance animation for resume button
      const resumeButton = document.querySelector(".resume-button")
      if (resumeButton) {
        resumeButton.style.opacity = "0"
        resumeButton.style.transform = "translateY(20px)"
  
        setTimeout(() => {
          resumeButton.style.transition = "all 0.5s ease"
          resumeButton.style.opacity = "1"
          resumeButton.style.transform = "translateY(0)"
        }, 2200)
      }
  
      // Add scroll indicator animation
      const scrollIndicator = document.querySelector(".scroll-indicator")
      if (scrollIndicator) {
        scrollIndicator.style.opacity = "0"
  
        setTimeout(() => {
          scrollIndicator.style.transition = "all 0.5s ease"
          scrollIndicator.style.opacity = "1"
        }, 2500)
      }
  
      animationsInitialized = true
    }
  
    // Hide loader and show content when page is fully loaded
    window.addEventListener("load", () => {
      if (pageLoader) {
        setTimeout(() => {
          pageLoader.classList.add("fade-out")
  
          setTimeout(() => {
            pageLoader.style.display = "none"
            document.body.classList.remove("loading")
  
            // Initialize animations after loader is hidden
            initializeAnimations()
          }, 500)
        }, 500) // Minimum display time for loader
      } else {
        document.body.classList.remove("loading")
        initializeAnimations()
      }
    })
  })
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = anchor.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)
  
      // Add offset for fixed navbar height
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0
      const targetPosition = targetElement?.getBoundingClientRect().top + window.pageYOffset - navbarHeight
  
      if (targetPosition !== undefined) {
        // Smooth scroll with easing
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
  
        // Add subtle highlight to the section being scrolled to
        targetElement.classList.add("section-highlight")
  
        // Remove highlight after animation
        setTimeout(() => {
          targetElement.classList.remove("section-highlight")
        }, 1000)
      }
  
      // Close mobile menu if open
      const mobileMenu = document.querySelector(".mobile-menu")
      mobileMenu?.classList.add("hidden")
  
      // Update mobile menu button icon
      const menuIcon = document.querySelector(".mobile-menu-button i")
      if (menuIcon) {
        menuIcon.setAttribute("data-lucide", "menu")
        lucide.createIcons()
      }
    })
  })
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")
  
  mobileMenuButton?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden")
  
    // Animate icon
    const menuIcon = mobileMenuButton.querySelector("i")
    if (menuIcon) {
      if (mobileMenu?.classList.contains("hidden")) {
        menuIcon.setAttribute("data-lucide", "menu")
      } else {
        menuIcon.setAttribute("data-lucide", "x")
      }
      lucide.createIcons()
    }
  
    // Animate mobile menu items if menu is visible
    if (!mobileMenu?.classList.contains("hidden")) {
      const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
      mobileNavLinks.forEach((link, index) => {
        link.style.opacity = "0"
        link.style.transform = "translateX(-20px)"
  
        setTimeout(() => {
          link.style.transition = "all 0.3s ease"
          link.style.opacity = "1"
          link.style.transform = "translateX(0)"
        }, 50 * index)
      })
    }
  })
  
  // GitHub projects loading with intersection observer for lazy loading
  async function loadProjects() {
    const projectsContainer = document.getElementById("projects-container")
    if (!projectsContainer) return
  
    // Show loading indicator
    projectsContainer.innerHTML = `
          <div class="col-span-full flex justify-center items-center py-12">
              <div class="loading-spinner"></div>
          </div>
      `
  
    try {
      const response = await fetch("assets/repos.json")
      if (!response.ok) {
        throw new Error(`Failed to fetch repo data: ${response.status}`)
      }
  
      const repos = await response.json()
  
      // Clear loading indicator
      projectsContainer.innerHTML = ""
  
      // Add projects
      repos.forEach((repoDetails, index) => {
        const topics = repoDetails.topics || []
        const projectCard = document.createElement("div")
  
        projectCard.className = "project-card"
        projectCard.setAttribute("data-aos", "fade-up")
        projectCard.setAttribute("data-aos-delay", (index * 100).toString())
  
        projectCard.innerHTML = `
                  <div class="project-card-inner">
                      <div class="project-card-header">
                          <h3 class="project-title">
                              ${repoDetails.name}
                              <div class="project-language">
                                  ${repoDetails.language || "N/A"}
                              </div>
                          </h3>
                          <p class="project-description">
                              ${repoDetails.description || "No description available."}
                          </p>
                          <div class="project-topics">
                              ${topics.map((topic) => `<span class="project-topic">${topic}</span>`).join("")}
                          </div>
                      </div>
                      <div class="project-card-footer">
                          <div class="project-stats">
                              <span class="project-stat">⭐ </span>
                              <span class="project-stat">🍴 </span>
                              <span class="project-stat">👀 </span>
                          </div>
                          <a href="${repoDetails.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                              View Project
                              <i data-lucide="external-link" class="h-3 w-3 ml-1"></i>
                          </a>
                      </div>
                  </div>
              `
  
        projectsContainer.appendChild(projectCard)
      })
  
      // Reinitialize Lucide icons
      lucide.createIcons()
    } catch (error) {
      console.error("Error loading projects:", error)
  
      // Display error message
      projectsContainer.innerHTML = `
              <div class="col-span-full p-6 text-center">
                  <p class="text-lg text-muted-foreground">Failed to load projects. Please try again later.</p>
                  <button class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md" onclick="loadProjects()">
                      Retry
                  </button>
              </div>
          `
    }
  }
  
  // Use Intersection Observer to lazy load projects when section is visible
  document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.getElementById("projects")
  
    if (projectsSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadProjects()
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
  
      observer.observe(projectsSection)
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      loadProjects()
    }
  })
  
  // Add scroll animations
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const nav = document.querySelector("nav")
  
    // Make navbar more transparent as user scrolls down
    if (nav) {
      if (scrollPosition > 50) {
        nav.classList.add("scrolled")
        nav.style.borderBottomWidth = "1px"
      } else {
        nav.classList.remove("scrolled")
        nav.style.borderBottomWidth = "0px"
      }
    }
  })
  
  // Add active state to navigation links based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  
    let currentSection = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const navHeight = document.querySelector("nav")?.offsetHeight || 0
  
      if (window.scrollY >= sectionTop - navHeight - 100) {
        currentSection = section.getAttribute("id")
      }
    })
  
    // Update desktop nav links
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  
    // Update mobile nav links
    mobileNavLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  })
  
  // Reveal animations for sections as they come into view
  document.addEventListener("DOMContentLoaded", () => {
    if ("IntersectionObserver" in window) {
      const sections = document.querySelectorAll("section")
  
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("section-visible")
            }
          })
        },
        { threshold: 0.1 },
      )
  
      sections.forEach((section) => {
        section.classList.add("section-hidden")
        sectionObserver.observe(section)
      })
    }
  })
  
  // Lucide icons initialization
  const lucide = window.lucide || {
    createIcons: () => {
      console.warn("Lucide library is not loaded. Using fallback implementation.")
    },
  }
  
