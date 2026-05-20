document.addEventListener('DOMContentLoaded', () => {
    const promptsGrid = document.getElementById('prompts-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilters = document.getElementById('category-filters');
    const searchButton = document.getElementById('search-button');
    const themeToggle = document.getElementById('theme-toggle');
    const webSearchInput = document.getElementById('web-search-input');
    const webSearchBtn = document.getElementById('web-search-btn');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchStatus = document.getElementById('search-status');
    const searchContent = document.getElementById('search-content');
    const searchLinks = document.getElementById('search-links');
    const closeResults = document.getElementById('close-results');
    const shareSiteBtn = document.getElementById('share-site-btn');
    const languageSelect = document.getElementById('language-select');
    const siteTitle = document.getElementById('site-title');
    const webSearchTitle = document.getElementById('web-search-title');
    const browsePromptsTitle = document.querySelector('.controls .section-title');
    const body = document.body;

    // Translation Data
    const translations = {
        en: {
            siteTitle: "AI Coding Prompts",
            webSearchTitle: "AI Web Search",
            webSearchPlaceholder: "Ask anything... (e.g., 'What is React?')",
            webSearchBtn: "Ask AI",
            browsePromptsTitle: "Browse AI Prompts",
            searchPromptsPlaceholder: "Search prompts...",
            searchBtn: "Search",
            allCategory: "All",
            copyBtn: "Copy Prompt",
            copiedText: "Copied!",
            noResults: 'No prompts found for "<strong>{query}</strong>"',
            resetBtn: "Clear all filters",
            aiResponse: "AI Response",
            thinking: "Thinking...",
            searching: 'Searching for "{query}"...',
            readFull: "Read Full Article",
            searchGoogle: "Search on Google",
            noSummary: "I couldn't find a direct summary for \"<strong>{query}</strong>\". Try a more specific term or check Google below."
        },
        ur: {
            siteTitle: "اے آئی کوڈنگ پرامپٹس",
            webSearchTitle: "اے آئی ویب سرچ",
            webSearchPlaceholder: "کچھ بھی پوچھیں... (مثلاً 'React کیا ہے؟')",
            webSearchBtn: "اے آئی سے پوچھیں",
            browsePromptsTitle: "پرامپٹس تلاش کریں",
            searchPromptsPlaceholder: "پرامپٹ تلاش کریں...",
            searchBtn: "تلاش کریں",
            allCategory: "تمام",
            copyBtn: "پرامپٹ کاپی کریں",
            copiedText: "کاپی ہو گیا!",
            noResults: '"<strong>{query}</strong>" کے لیے کوئی پرامپٹ نہیں ملا',
            resetBtn: "تمام فلٹرز ختم کریں",
            aiResponse: "اے آئی جواب",
            thinking: "سوچ رہا ہے...",
            searching: '"{query}" تلاش کیا جا رہا ہے...',
            readFull: "پورا مضمون پڑھیں",
            searchGoogle: "گوگل پر تلاش کریں",
            noSummary: "مجھے \"<strong>{query}</strong>\" کے لیے براہ راست خلاصہ نہیں ملا۔ کوئی اور لفظ آزمائیں یا نیچے گوگل دیکھیں۔"
        },
        hi: {
            siteTitle: "AI कोडिंग प्रॉम्प्ट्स",
            webSearchTitle: "AI वेब खोज",
            webSearchPlaceholder: "कुछ भी पूछें... (जैसे 'React क्या है?')",
            webSearchBtn: "AI से पूछें",
            browsePromptsTitle: "प्रॉम्प्ट्स ब्राउज़ करें",
            searchPromptsPlaceholder: "प्रॉम्प्ट खोजें...",
            searchBtn: "खोजें",
            allCategory: "सब",
            copyBtn: "प्रॉम्प्ट कॉपी करें",
            copiedText: "कॉपी किया गया!",
            noResults: '"<strong>{query}</strong>" के लिए कोई प्रॉम्प्ट नहीं मिला',
            resetBtn: "सभी फ़िल्टर साफ़ करें",
            aiResponse: "AI प्रतिक्रिया",
            thinking: "सोच रहा है...",
            searching: '"{query}" खोजा जा रहा है...',
            readFull: "पूरा लेख पढ़ें",
            searchGoogle: "गूगल पर खोजें",
            noSummary: "मुझे \"<strong>{query}</strong>\" के लिए सीधा सारांश नहीं मिला। अधिक विशिष्ट शब्द आज़माएँ या नीचे Google देखें।"
        },
        pa: {
            siteTitle: "AI ਕੋਡਿੰਗ ਪ੍ਰੋਂਪਟ",
            webSearchTitle: "AI ਵੈੱਬ ਖੋਜ",
            webSearchPlaceholder: "ਕੁਝ ਵੀ ਪੁੱਛੋ... (ਜਿਵੇਂ 'React ਕੀ ਹੈ?')",
            webSearchBtn: "AI ਤੋਂ ਪੁੱਛੋ",
            browsePromptsTitle: "ਪ੍ਰੋਂਪਟ ਵੇਖੋ",
            searchPromptsPlaceholder: "ਪ੍ਰੋਂਪਟ ਖੋਜੋ...",
            searchBtn: "ਖੋਜੋ",
            allCategory: "ਸਾਰੇ",
            copyBtn: "ਪ੍ਰੋਂਪਟ ਕਾਪੀ ਕਰੋ",
            copiedText: "ਕਾਪੀ ਹੋ ਗਿਆ!",
            noResults: '"<strong>{query}</strong>" ਲਈ ਕੋਈ ਪ੍ਰੋਂਪਟ ਨਹੀਂ ਮਿਲਿਆ',
            resetBtn: "ਸਾਰੇ ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ",
            aiResponse: "AI ਜਵਾਬ",
            thinking: "ਸੋਚ ਰਿਹਾ ਹੈ...",
            searching: '"{query}" ਦੀ ਖੋਜ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
            readFull: "ਪੂਰਾ ਲੇਖ ਪੜ੍ਹੋ",
            searchGoogle: "ਗੂਗਲ 'ਤੇ ਖੋਜੋ",
            noSummary: "ਮੈਨੂੰ \"<strong>{query}</strong>\" ਲਈ ਸਿੱਧਾ ਸਾਰ ਨਹੀਂ ਮਿਲਿਆ। ਕੁਝ ਹੋਰ ਅਜ਼ਮਾਓ ਜਾਂ ਹੇਠਾਂ ਗੂਗਲ ਵੇਖੋ।"
        },
        sd: {
            siteTitle: "اي آئي ڪوڊنگ پرامپٽس",
            webSearchTitle: "اي آئي ويب سرچ",
            webSearchPlaceholder: "ڪجھ به پڇو... (مثال طور 'React ڇا آهي؟')",
            webSearchBtn: "اي آئي کان پڇو",
            browsePromptsTitle: "پرامپٽس ڳوليو",
            searchPromptsPlaceholder: "پرامپٽ ڳوليو...",
            searchBtn: "ڳوليو",
            allCategory: "سڀ",
            copyBtn: "پرامپٽ ڪاپي ڪريو",
            copiedText: "ڪاپي ٿي ويو!",
            noResults: '"<strong>{query}</strong>" لاءِ ڪو پرامپٽ نه مليو',
            resetBtn: "سڀ فلٽر ختم ڪريو",
            aiResponse: "اي آئي جواب",
            thinking: "سوچي رهيو آهي...",
            searching: '"{query}" ڳوليو پيو وڃي...',
            readFull: "پورو مضمون پڙهو",
            searchGoogle: "گوگل تي ڳوليو",
            noSummary: "مون کي \"<strong>{query}</strong>\" لاءِ سڌو خلاصو نه مليو. ڪو ٻيو لفظ آزمايو يا هيٺ گوگل ڏسو."
        }
    };

    let currentLang = 'en';

    function updateLanguage() {
        currentLang = languageSelect.value;
        const t = translations[currentLang];

        siteTitle.innerText = t.siteTitle;
        webSearchTitle.innerText = t.webSearchTitle;
        webSearchInput.placeholder = t.webSearchPlaceholder;
        webSearchBtn.innerText = t.webSearchBtn;
        browsePromptsTitle.innerText = t.browsePromptsTitle;
        searchInput.placeholder = t.searchPromptsPlaceholder;
        searchButton.innerText = t.searchBtn;
        document.querySelector('.results-label').innerText = t.aiResponse;

        if (currentLang === 'ur' || currentLang === 'sd') {
            body.classList.add('rtl');
        } else {
            body.classList.remove('rtl');
        }

        renderCategories();
        renderPrompts();
    }

    languageSelect.addEventListener('change', updateLanguage);

    shareSiteBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'AI Coding Prompts & Search',
                text: 'Check out this awesome collection of AI coding prompts and interactive AI search!',
                url: window.location.href
            }).catch(err => console.error('Error sharing:', err));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Website link copied to clipboard!');
            });
        }
    });

    const prompts = [
        {
            "id": 1,
            "title": "Agentic Feature Implementation",
            "category": "Web Development",
            "description": "A comprehensive prompt for planning and implementing new features using the RCTFE framework.",
            "content": "Act as a Senior Full-Stack Engineer. We are adding [Feature Name] to our [Framework] app. \n\nContext: [Paste relevant file paths or architecture summary]. \n\nTask: \n1. Create a step-by-step implementation plan.\n2. Generate the code changes as a unified diff.\n3. Write unit and integration tests covering happy paths and edge cases.\n4. Provide a verification checklist for the PR.\n\nConstraints: No new external dependencies; follow the existing [Style Guide] patterns."
        },
        {
            "id": 2,
            "title": "Deep-Logic Debugging (Chain-of-Thought)",
            "category": "Debugging",
            "description": "Solve complex race conditions or memory leaks with systematic reasoning.",
            "content": "Act as a Systems Debugging Expert. I am seeing [Error/Behavior] in [Language]. \n\nContext: [Paste Code + Stack Trace + Logs].\n\nTask: Before writing any code, walk me through a Chain-of-Thought analysis. List every possible state transition that could lead to this failure. Once the root cause is identified, provide a minimal fix and a regression test that would have caught this."
        },
        {
            "id": 3,
            "title": "Security & Compliance Auditor",
            "category": "Security",
            "description": "Review PRs for injection risks, data exposure, and access control issues.",
            "content": "Act as a Senior AppSec Engineer specializing in OWASP Top 10 (2025 edition). Review the following PR diff for:\n1. Injection risks (SQL, NoSQL, Command).\n2. Insecure data exposure of PII.\n3. Broken access control.\n\nFormat: Return a table with: Severity (Critical/High/Med/Low), Location, Risk Description, and Remediation Code."
        },
        {
            "id": 4,
            "title": "Incremental Refactoring",
            "category": "Refactoring",
            "description": "Migrate legacy code safely using the 'Safe-Move' pattern.",
            "content": "Act as a Refactoring Specialist. I want to migrate [Module A] from [Old Pattern] to [New Pattern]. \n\nTask: Create a 3-phase incremental plan that:\n1. Maintains backward compatibility at each step.\n2. Includes 'characterization tests' to ensure behavior parity.\n3. Provides a rollback strategy for each phase.\n\nOutput: A markdown roadmap with specific PR boundaries."
        },
        {
            "id": 5,
            "title": "Tree-of-Thoughts Architecture Planning",
            "category": "Architecture",
            "description": "Evaluate multiple architectural approaches before implementation.",
            "content": "Explore three different architectural approaches for [Problem] (e.g., [Approach A] vs. [Approach B] vs. [Approach C]). Evaluate the trade-offs for our specific [Requirement, e.g., latency/cost] requirements, and then implement the winner."
        },
        {
            "id": 6,
            "title": "Verification Loop (Skeptical Reviewer)",
            "category": "Testing",
            "description": "Challenge AI-generated code to find edge cases and concurrency bugs.",
            "content": "Now, act as a skeptical code reviewer and find three reasons why the code you just wrote might fail in a high-concurrency environment. Suggest fixes for each."
        }
    ];

    let currentCategory = 'all';

    async function performWebSearch() {
        const query = webSearchInput.value.trim();
        if (!query) return;

        const t = translations[currentLang];
        searchResultsContainer.classList.remove('hidden');
        searchStatus.innerText = t.searching.replace('{query}', query);
        searchContent.innerHTML = `<div class="typing-loader">${t.thinking}</div>`;
        searchLinks.innerHTML = '';

        try {
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.extract) {
                searchStatus.innerText = `Summary for: ${data.title}`;
                searchContent.innerText = data.extract;
                searchLinks.innerHTML = `
                    <a href="${data.content_urls.desktop.page}" target="_blank" class="external-link">${t.readFull}</a>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank" class="external-link">${t.searchGoogle}</a>
                `;
            } else {
                throw new Error('No summary found');
            }
        } catch (err) {
            searchStatus.innerText = 'AI Search';
            searchContent.innerHTML = t.noSummary.replace('{query}', query);
            searchLinks.innerHTML = `
                <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank" class="external-link">${t.searchGoogle}</a>
            `;
        }
    }

    webSearchBtn.addEventListener('click', performWebSearch);
    webSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performWebSearch();
    });

    closeResults.addEventListener('click', () => {
        searchResultsContainer.classList.add('hidden');
    });

    renderCategories();
    renderPrompts();

    function renderCategories() {
        const t = translations[currentLang];
        const categories = ['all', ...new Set(prompts.map(p => p.category))];
        categoryFilters.innerHTML = categories.map(cat => `
            <button class="filter-chip ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
                ${cat === 'all' ? t.allCategory : cat}
            </button>
        `).join('');

        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                currentCategory = chip.dataset.category;
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                renderPrompts();
            });
        });
    }

    function renderPrompts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const t = translations[currentLang];
        
        const filteredPrompts = prompts.filter(p => {
            const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
            const matchesSearch = p.title.toLowerCase().includes(searchTerm) || 
                                  p.description.toLowerCase().includes(searchTerm) ||
                                  p.category.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        promptsGrid.innerHTML = filteredPrompts.map(p => `
            <div class="prompt-card">
                <div class="prompt-category">${p.category}</div>
                <div class="prompt-title">${p.title}</div>
                <div class="prompt-description">${p.description}</div>
                <button class="copy-btn" onclick="copyPrompt('${encodeURIComponent(p.content)}', this)">
                    ${t.copyBtn}
                </button>
            </div>
        `).join('');

        if (filteredPrompts.length === 0) {
            promptsGrid.innerHTML = `
                <div class="no-results">
                    <p>${t.noResults.replace('{query}', searchTerm)}</p>
                    <button onclick="resetFilters()" class="reset-btn">${t.resetBtn}</button>
                </div>
            `;
        }
    }

    window.resetFilters = () => {
        searchInput.value = '';
        currentCategory = 'all';
        renderCategories();
        renderPrompts();
    };

    window.copyPrompt = (encodedContent, button) => {
        const content = decodeURIComponent(encodedContent);
        const t = translations[currentLang];
        navigator.clipboard.writeText(content).then(() => {
            const originalText = button.innerText;
            button.innerText = t.copiedText;
            button.classList.add('copied');
            setTimeout(() => {
                button.innerText = originalText;
                button.classList.remove('copied');
            }, 2000);
        });
    };

    searchInput.addEventListener('input', renderPrompts);
    searchButton.addEventListener('click', renderPrompts);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') renderPrompts();
    });

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            themeToggle.querySelector('.icon').innerText = '☀️';
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            themeToggle.querySelector('.icon').innerText = '🌙';
        }
    });
});
