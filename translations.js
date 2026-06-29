const translations = {
    "nav_home": { en: "Home", ne: "गृहपृष्ठ" },
    "nav_about": { en: "About", ne: "बारेमा" },
    "nav_skills": { en: "Skills", ne: "सीपहरू" },
    "nav_projects": { en: "Projects", ne: "परियोजनाहरू" },
    "nav_certifications": { en: "Certifications", ne: "प्रमाणपत्रहरू" },
    "nav_contact": { en: "Contact", ne: "सम्पर्क" },
    "greeting": { en: "Hi, I am", ne: "नमस्ते, म हुँ" },
    "name": { en: "Rajeeb Kumar Singh", ne: "राजीव कुमार सिंह" },
    "view_work": { en: "View My Work", ne: "मेरो काम हेर्नुहोस्" },
    "about_title": { en: "About Me & Education", ne: "मेरो र शिक्षाको बारेमा" },
    "about_desc": { en: "I am a passionate <strong>Software Engineering Student</strong> at Pokhara University, with a keen interest in Software Quality Assurance, Full-Stack Web Development, and Machine Learning. I thrive on solving complex problems and continuously expanding my technical toolkit.", ne: "म पोखरा विश्वविद्यालयको एक भावुक <strong>सफ्टवेयर इन्जिनियरिङ विद्यार्थी</strong> हुँ, जसलाई सफ्टवेयर गुणस्तर आश्वासन, फुल-स्ट्याक वेब विकास, र मेसिन लर्निङमा गहिरो रुचि छ। म जटिल समस्याहरू समाधान गर्न र मेरो प्राविधिक कौशल निरन्तर विस्तार गर्न रुचाउँछु।" },
    "edu_be": { en: "BE in Software Engineering", ne: "सफ्टवेयर इन्जिनियरिङमा स्नातक (BE)" },
    "edu_pu": { en: "Pokhara University", ne: "पोखरा विश्वविद्यालय" },
    "edu_be_date": { en: "2022 – Present", ne: "२०२२ – वर्तमान" },
    "edu_neb": { en: "NEB 10+2", ne: "एन.ई.बी. १०+२" },
    "edu_kh": { en: "Kumudini Homes Secondary School", ne: "कुमुदिनी होम्स माध्यमिक विद्यालय" },
    "edu_neb_date": { en: "2019 – 2021", ne: "२०१९ – २०२१" },
    "skills_title": { en: "Technical Skills", ne: "प्राविधिक सीपहरू" },
    "skill_prog": { en: "Programming", ne: "प्रोग्रामिङ" },
    "skill_ml": { en: "Machine Learning", ne: "मेसिन लर्निङ" },
    "skill_web": { en: "Web Development", ne: "वेब विकास" },
    "skill_ds": { en: "Data Science", ne: "डाटा विज्ञान" },
    "skill_tools": { en: "Tools & Platforms", ne: "उपकरण र प्लेटफर्महरू" },
    "skill_concepts": { en: "Concepts", ne: "अवधारणाहरू" },
    "projects_title": { en: "Projects", ne: "परियोजनाहरू" },
    "proj1_sub": { en: "Brain Tumor Detection System (ongoing)", ne: "मस्तिष्क ट्युमर पत्ता लगाउने प्रणाली (जारी)" },
    "proj2_sub": { en: "Disease Prediction System", ne: "रोग भविष्यवाणी प्रणाली" },
    "cert_title": { en: "Certifications", ne: "प्रमाणपत्रहरू" },
    "contact_title": { en: "Let's Connect", ne: "आउनुहोस् जोडियौं" },
    "contact_desc": { en: "Open to software engineering and QA opportunities.", ne: "सफ्टवेयर इन्जिनियरिङ र QA अवसरहरूको लागि खुला छ।" },
    "footer_rights": { en: "&copy; 2026 Rajeeb Kumar Singh. All Rights Reserved.", ne: "&copy; २०२६ राजीव कुमार सिंह। सबै अधिकार सुरक्षित।" },
    "bot_title": { en: "Rajeeb's Virtual Assistant", ne: "राजीवको भर्चुअल सहायक" },
    "bot_welcome": { en: "Hello! Ask me anything about Rajeeb's CV (skills, projects, education, etc.).", ne: "नमस्ते! मलाई राजीवको CV को बारेमा केही पनि सोध्नुहोस् (सीप, परियोजना, शिक्षा, आदि)।" },
    "bot_placeholder": { en: "Ask a question...", ne: "प्रश्न सोध्नुहोस्..." }
};

// Language state
let currentLanguage = localStorage.getItem('language') || 'en';

function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.documentElement.lang = lang;
    
    // Update active button
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-ne').classList.toggle('active', lang === 'ne');

    // Translate DOM elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang]) {
            el.innerHTML = translations[key][lang];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key] && translations[key][lang]) {
            el.setAttribute('placeholder', translations[key][lang]);
        }
    });

    // Update typewriter language (dispatch event so script.js can handle)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
}

document.addEventListener('DOMContentLoaded', () => {
    // Setup language buttons listener
    document.getElementById('lang-en').addEventListener('click', () => applyLanguage('en'));
    document.getElementById('lang-ne').addEventListener('click', () => applyLanguage('ne'));

    // Apply initially
    applyLanguage(currentLanguage);
});
