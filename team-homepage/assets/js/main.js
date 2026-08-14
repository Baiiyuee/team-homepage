(() => {
  document.documentElement.classList.add('js-ready');
  const isEnglish = new URLSearchParams(window.location.search).get('lang') === 'en';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function configureLanguage() {
    const currentUrl = new URL(window.location.href);
    const chineseUrl = new URL(currentUrl);
    const englishUrl = new URL(currentUrl);
    chineseUrl.searchParams.delete('lang');
    englishUrl.searchParams.set('lang', 'en');

    const languageLinks = document.querySelectorAll('.language-switch a');
    const chineseLink = document.querySelector('[data-language="zh"]');
    const englishLink = document.querySelector('[data-language="en"]');
    if (chineseLink && englishLink) {
      chineseLink.href = `${chineseUrl.pathname}${chineseUrl.search}${chineseUrl.hash}`;
      englishLink.href = `${englishUrl.pathname}${englishUrl.search}${englishUrl.hash}`;
      chineseLink.classList.toggle('is-active', !isEnglish);
      englishLink.classList.toggle('is-active', isEnglish);
      chineseLink.setAttribute('aria-current', isEnglish ? 'false' : 'page');
      englishLink.setAttribute('aria-current', isEnglish ? 'page' : 'false');
      languageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const targetUrl = new URL(window.location.href);
          if (link.dataset.language === 'en') targetUrl.searchParams.set('lang', 'en');
          else targetUrl.searchParams.delete('lang');
          window.location.assign(
            `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`
          );
        });
      });
    }

    if (!isEnglish) return;

    document.documentElement.lang = 'en';
    document.title = 'Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance - Beihang University';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance advances intelligent operations and maintenance, prognostics and health management, digital twins, resilience, and reliability for complex engineering systems.'
    );

    const setHTML = (selector, html) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = html;
    };
    const setText = (selector, text) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = text;
    };

    document.querySelector('.navbar')?.setAttribute('aria-label', 'Primary navigation');
    document.querySelector('.brand-identity')?.setAttribute('aria-label', 'Return to home');
    document.querySelector('.header-search')?.setAttribute('aria-label', 'Search (coming soon)');
    document.querySelector('.header-search')?.setAttribute('title', 'Search (coming soon)');
    document.querySelector('.language-switch')?.setAttribute('aria-label', 'Language selection');
    document.querySelector('.hero-keywords')?.setAttribute('aria-label', 'Core research keywords');
    setText('.nav-toggle', 'Menu');

    const navigation = {
      home: 'Home',
      'about-menu': 'About',
      team: 'Center Introduction',
      'center-philosophy': 'Center Philosophy',
      organization: 'Organization',
      'news-menu': 'News',
      news: 'News',
      'news-conferences': 'Academic Conferences',
      'news-papers': 'Research Publications',
      'news-activities': 'Academic Activities',
      'news-notices': 'Notices',
      'faculty-menu': 'Faculty',
      'faculty-teachers': 'Faculty',
      'faculty-postdocs': 'Postdoctoral Researchers',
      'research-menu': 'Research',
      research: 'Research Directions',
      'research-projects': 'Research Projects',
      achievements: 'Research Outputs',
      'research-cooperation': 'Research Collaboration',
      'students-menu': 'Students',
      'doctoral-students': 'Doctoral Students',
      'masters-students': 'Master’s Students',
      'alumni-menu': 'Alumni',
      'alumni-doctoral': 'Doctoral Alumni',
      'alumni-masters': 'Master’s Alumni',
      education: 'Students',
      teaching: 'Teaching',
      culture: 'Culture',
      'recruitment-menu': 'Recruitment',
      recruitment: 'Admissions',
      'recruitment-admissions': 'Admissions',
      'recruitment-talent': 'Talent Recruitment',
      'talent-recruitment': 'Talent Recruitment',
      contact: 'Contact'
    };
    document.querySelectorAll('.nav-links [data-page-link]').forEach((link) => {
      const navigationKey = link.dataset.route || link.dataset.pageLink;
      link.textContent = navigation[navigationKey] || link.textContent;
    });
    document.querySelectorAll('[data-nav-key]').forEach((label) => {
      label.textContent = navigation[label.dataset.navKey] || label.textContent;
    });

    setText('.hero h1', 'Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance');
    setHTML(
      '.hero-lead',
      'We advance prognostics and health management (PHM), digital twins, intelligent operations and maintenance, and resilience and reliability for complex systems.<span class="hero-lead-line">By integrating artificial intelligence, modeling and simulation, and engineering data, we translate frontier research into practical engineering solutions.</span>'
    );
    document.querySelectorAll('.hero-actions [data-page-link]').forEach((link) => {
      const arrow = link.querySelector('span')?.outerHTML || '';
      link.innerHTML = `${navigation[link.dataset.pageLink]} ${arrow}`;
    });
    setText('#home-news-title', 'News');
    setText('#home-notice-title', 'Notices');
    setText('#home-directions-title', 'Research Directions');
    setText('#home-about-title', 'Center Introduction');
    document.querySelectorAll('.home-information .home-more, .home-directions .home-more').forEach((link) => {
      link.textContent = 'More';
    });
    setText('.home-about-link', 'Learn More');
    const homeNewsText = [
      'Reliability Engineering × a Sustainable Future: ICRE 2026',
      '2026 International Summer School of Aviation Safety'
    ];
    document.querySelectorAll('.home-news-entry').forEach((entry, index) => {
      const text = homeNewsText[index];
      if (!text) return;
      const title = entry.querySelector('h3');
      if (title) title.textContent = text;
    });
    const homeNoticeText = [
      ['Admissions', 'The laboratory welcomes applications from master’s students, doctoral students, and postdoctoral researchers.'],
      ['Research Collaboration', 'Universities, research institutes, and enterprises worldwide are welcome to pursue academic exchange and joint research.']
    ];
    document.querySelectorAll('.home-notice-item').forEach((item, index) => {
      const text = homeNoticeText[index];
      if (!text) return;
      const time = item.querySelector('time');
      const title = item.querySelector('strong');
      if (time) time.textContent = text[0];
      if (title) title.textContent = text[1];
    });
    const homeDirectionText = [
      'Multimodal Foundation Models and Intelligent PHM Algorithms',
      'Digital Twin Modeling and Smart Maintenance Decision Optimization',
      'Complex-System Resilience and Belief Reliability Analysis'
    ];
    document.querySelectorAll('.home-direction-star[data-home-research-index]').forEach((card, index) => {
      const text = homeDirectionText[index];
      if (!text) return;
      const title = card.querySelector('.home-direction-star-label strong');
      if (title) title.textContent = text;
    });
    const homeAboutText = [
      'The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance was jointly established by research teams from Beihang University and Politecnico di Milano. It focuses on prognostics and health management, modeling and simulation, intelligent operations and maintenance, and multimodal foundation models for complex engineering systems.',
      'Following the principles of cyber-physical integration, intelligence-driven research, and systems empowerment, the laboratory connects models, algorithms, simulation, verification, and applications to provide an interdisciplinary research and experimental platform for aerospace, energy and transportation, and intelligent manufacturing.'
    ];
    document.querySelectorAll('.home-about-copy > p').forEach((paragraph, index) => {
      paragraph.textContent = homeAboutText[index] || paragraph.textContent;
    });
    document.querySelector('.home-about-figure img')?.setAttribute('alt', 'Inauguration of the Sino-Italian Joint Laboratory');
    setText('.news-page [data-placeholder-title]', 'News');
    document.querySelectorAll('.news-meta span').forEach((element) => {
      element.textContent = 'Beihang Hangzhou International Campus';
    });
    document.querySelectorAll('.news-copy h3').forEach((element) => {
      element.textContent = 'Reliability Engineering × a Sustainable Future: ICRE 2026';
    });
    document.querySelectorAll('.news-copy p').forEach((element) => {
      element.textContent = 'The 10th International Conference on Reliability Engineering will be held in Hangzhou under the theme “Reliability Engineering for a Sustainable Future: From Classical Reliability to Intelligent Resilient Systems.”';
    });
    document.querySelectorAll('[data-placeholder-page]').forEach((page) => {
      const heading = page.querySelector('h1');
      const paragraph = page.querySelector('p');
      if (heading) heading.textContent = page.dataset.titleEn || heading.textContent;
      if (paragraph) paragraph.textContent = 'Content coming soon.';
    });
    setText('#lab-gallery-title', 'Laboratory Highlights');
    const galleryCaptions = [
      'Inauguration of the Sino-Italian Joint Laboratory',
      'Laboratory exchange and facilities visit',
      'Sino-Italian Joint Laboratory academic seminar',
      'International Conference on Reliability Engineering',
      'Fault-simulation and experimental platform'
    ];
    document.querySelectorAll('.lab-slide').forEach((slide, index) => {
      const caption = galleryCaptions[index];
      const image = slide.querySelector('img');
      const figcaption = slide.querySelector('figcaption');
      if (image && caption) image.alt = caption;
      if (figcaption && caption) figcaption.textContent = caption;
    });
    document.querySelector('[data-lab-carousel]')?.setAttribute('aria-roledescription', 'carousel');
    document.querySelector('.lab-carousel-dots')?.setAttribute('aria-label', 'Select a laboratory photo');
    document.querySelector('[data-carousel-prev]')?.setAttribute('aria-label', 'View previous photo');
    document.querySelector('[data-carousel-next]')?.setAttribute('aria-label', 'View next photo');
    document.querySelectorAll('.lab-carousel-dot').forEach((dot, index) => {
      dot.setAttribute('aria-label', `View photo ${index + 1}`);
    });
    const labNavigation = {
      'lab-overview': 'Laboratory',
      'lab-faculty': 'Faculty',
      'lab-postdocs': 'Postdoctoral Researchers'
    };
    document.querySelectorAll('[data-lab-target]').forEach((button) => {
      button.textContent = labNavigation[button.dataset.labTarget] || button.textContent;
    });
    document.querySelector('.lab-subnav')?.setAttribute('aria-label', 'Laboratory page navigation');
    document.querySelector('.personnel-sidebar')?.setAttribute('aria-label', 'Faculty categories');
    setText('.personnel-side-overview span', 'Faculty Overview');
    const personnelSideLabels = ['Faculty', 'Postdoctoral Researchers'];
    document.querySelectorAll('.personnel-side-list .personnel-side-button > span:first-child').forEach((label, index) => {
      label.textContent = personnelSideLabels[index] || label.textContent;
    });
    setText('.personnel-page-heading h1', 'Faculty');
    setText('[data-personnel-home]', 'Home');
    setText('[data-personnel-overview]', 'Faculty');
    const personnelMemberNames = ['Yang Hu', 'Yang Li', 'Xiaoyu Jiang', 'Danyang Han', 'Di Su', 'Jiayu Wang', 'Zhenqin Yin'];
    document.querySelectorAll('[data-personnel-member]').forEach((button, index) => {
      button.textContent = personnelMemberNames[index] || button.textContent;
    });
    const overviewSectionTitles = ['Faculty', 'Postdoctoral Researchers'];
    document.querySelectorAll('.personnel-overview-section > h2').forEach((heading, index) => {
      heading.textContent = overviewSectionTitles[index] || heading.textContent;
    });
    const overviewPeople = [
      ['Yang Hu', 'Executive Director · Associate Research Fellow · Doctoral Supervisor'],
      ['Yang Li', 'Associate Professor'],
      ['Xiaoyu Jiang', 'Associate Research Fellow · Master’s Supervisor'],
      ['Danyang Han', 'Postdoctoral Researcher'],
      ['Di Su', 'Postdoctoral Researcher'],
      ['Jiayu Wang', 'Postdoctoral Researcher'],
      ['Zhenqin Yin', 'Postdoctoral Researcher']
    ];
    document.querySelectorAll('.personnel-overview-card').forEach((card, index) => {
      const person = overviewPeople[index];
      if (!person) return;
      const name = card.querySelector('h3');
      const role = card.querySelector('p');
      if (name) name.textContent = person[0];
      if (role) role.textContent = person[1];
    });

    setHTML('.lab-introduction', `
      <h2>Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance</h2>
      <p>The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance was jointly founded by Professor Rui Kang of Beihang University and Professor Enrico Zio of Politecnico di Milano, with Associate Research Fellow Yang Hu serving as Executive Director. Guided by the principles of cyber-physical integration, intelligence-driven innovation, and system-wide enablement, the laboratory focuses on prognostics and health management (PHM), modeling and simulation, intelligent operations and maintenance, and multimodal foundation models for complex engineering systems. Its end-to-end research chain spans models, algorithms, simulation, validation, and application, providing a multidisciplinary experimental platform for PHM and intelligent maintenance in aerospace, energy and transportation, and manufacturing. The team currently comprises two professors, two associate research fellows, one associate professor, four postdoctoral researchers, and thirteen graduate students.</p>
      <figure class="lab-figure">
        <img src="image/中意健康管理与智能维修联合实验室照片1.png" alt="Cyber-physical experimental platform of the Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance" loading="lazy">
      </figure>
      <p>The laboratory comprises <strong>four core modules</strong>, together forming an integrated cyber-physical environment for PHM and intelligent maintenance:</p>
      <ol class="lab-module-list">
        <li><strong>PHM simulation system:</strong> Simulates twelve critical subsystems and more than 300 key flight parameters for Airbus A320 and Boeing 737 aircraft. It supports fault injection at the LRU, equipment, and subsystem levels, flight-environment modeling, and data generation for validating PHM algorithms and maintenance strategies.</li>
        <li><strong>Physical fault experimental platform:</strong> Reproduces typical fault modes in airborne gearboxes, bearings, electromechanical units, pumps, and related equipment. A dynamic torque sensor with 0.01 Nm accuracy and a hydraulic loading unit with a maximum load of 50 kN enable experiments on degradation mechanisms and fault evolution.</li>
        <li><strong>Virtual fault experimental platform:</strong> Integrates a fault-logic database, virtual sensor-injection modules, and an airborne software-bus simulator. Operational data under normal and representative fault conditions can be transmitted in real time to the PHM simulation system, enabling multilevel simulation from signal anomalies to system-level failures.</li>
        <li><strong>High-performance computing platform:</strong> A GPU cluster with a 128-core CPU environment, 1 TB of memory, and multiple NVIDIA A100 GPUs supports the pre-training, fine-tuning, and inference of multimodal foundation models, as well as intelligent diagnosis, reinforcement-learning decisions, and digital-twin simulation.</li>
      </ol>
      <figure class="lab-figure">
        <img src="image/中意健康管理与智能维修联合实验室照片2.png" alt="Four core modules of the Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance" loading="lazy">
      </figure>
    `);
    setHTML('.lab-personnel', `
      <section class="personnel-section personnel-detail-view" id="lab-faculty" data-personnel-panel="faculty">
        <h2 class="personnel-section-title">Faculty</h2>
        <div class="personnel-list">
          <article class="personnel-card" id="person-yang-hu">
            <img class="personnel-photo" src="image/Yang Hu.png" alt="Yang Hu" loading="lazy">
            <div>
              <p class="personnel-role">Executive Director · Associate Research Fellow · Doctoral Supervisor</p>
              <h3 class="personnel-name">Yang Hu</h3>
              <p class="personnel-research"><strong>Research:</strong> Prognostics and health management (PHM) of complex systems, artificial intelligence and industrial big data, and equipment-system modeling and simulation.</p>
              <p class="personnel-email"><strong>Email:</strong> yang_hu@buaa.edu.cn</p>
              <div class="personnel-links">
                <a class="personnel-link-primary" href="../huyang-homepage/" target="_blank" rel="noopener">Personal Website</a>
                <a href="https://shi.buaa.edu.cn/huyang" target="_blank" rel="noopener">Beihang Profile</a>
                <a href="https://scholar.google.com/citations?user=t0t8_BkAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar</a>
              </div>
            </div>
            <div class="personnel-profile-sections">
              <section class="personnel-profile-section">
                <h4>Biography</h4>
                <p>Yang Hu is an Associate Research Fellow and Doctoral Supervisor at the Hangzhou International Innovation Institute of Beihang University and a member of the Smart Civil Aviation Science and Technology Innovation Center. He received his Ph.D. from Politecnico di Milano in 2015 under the supervision of Professor Enrico Zio. His recent work focuses on prognostics and health management of complex systems, artificial intelligence, and modeling and simulation of equipment and systems-of-systems.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Research Interests</h4>
                <p>His research interests include prognostics and health management (PHM) of complex systems, artificial intelligence and industrial big data, modeling and simulation of equipment and systems-of-systems, intelligent operations and maintenance, and predictive maintenance decision optimization.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Academic Achievements</h4>
                <p>As a principal investigator or co-principal investigator, he has led 18 national and ministerial-level research projects with total funding exceeding RMB 39 million. These projects cover next-generation aviation equipment support systems, PHM-based support models, intelligent support systems, support-effectiveness simulation, and support big-data applications. He has published more than 30 papers as first or corresponding author in leading international journals including Reliability Engineering &amp; System Safety and Mechanical Systems and Signal Processing. His publications have received more than 1,600 Google Scholar citations, with an h-index of 16. He has authored two monographs and holds five authorized national invention patents and two software copyrights. His honors include one Second Prize of the Natural Science Award of the Chinese Society of Aeronautics and Astronautics, two Second Prizes of the Military Science and Technology Progress Award, and selection for the Young Elite Scientists Sponsorship Program by CAST in 2020.</p>
              </section>
            </div>
          </article>
          <article class="personnel-card" id="person-yang-li">
            <img class="personnel-photo" src="image/Yang Li.png" alt="Yang Li" loading="lazy">
            <div>
              <p class="personnel-role">Associate Professor</p>
              <h3 class="personnel-name">Yang Li</h3>
              <p class="personnel-research"><strong>Research:</strong> Beyond-reliability and autonomous intelligence, including testability design and intelligent control, fault diagnosis and fault tolerance, accelerated testing and life prediction, and reliability, supportability, and maintainability design.</p>
              <p class="personnel-email"><strong>Email:</strong></p>
            </div>
            <div class="personnel-profile-sections">
              <section class="personnel-profile-section">
                <h4>Biography</h4>
                <p>Yang Li is an Associate Professor and Master's Supervisor at Beihang University. He was selected for Shanghai's “Super Postdoctoral” program, received joint doctoral training from Politecnico di Milano and Nanjing University of Aeronautics and Astronautics, and conducted postdoctoral research in Control Science and Engineering, a Shanghai Peak Discipline, at Shanghai University.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Research Interests</h4>
                <p>His research focuses on beyond-reliability and autonomous intelligence, including testability design and intelligent control, fault diagnosis and fault tolerance, accelerated testing and life prediction, reliability, supportability, and maintainability design, and their applications in complex engineering systems.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Academic Achievements</h4>
                <p>He has published more than 50 academic papers, co-authored one monograph, and filed or received authorization for more than 10 national invention patents. He serves as a young editorial board member of Artificial Intelligence and Autonomous Systems, Journal of Instrumentation (English Edition), and Intelligence &amp; Robotics, and as a guest editor for the SCI-indexed journals Machines and Processes. He has also served as a special-session chair, publication chair, or program committee chair for international conferences including IEEE ICPS, QR2MSE, RCAE, and ICRE, and regularly reviews for leading journals including IEEE TSMC, IEEE TNNLS, IEEE TIM, and IEEE TII. He has led or participated in more than 10 projects, including National Natural Science Foundation of China projects and National Key R&amp;D Program projects. His honors include best paper awards from the Shanghai Association of Automation, EECR, and RCAE, the CCDC Most Popular Paper Award, and the IEEE TIM Outstanding Reviewer Award.</p>
              </section>
            </div>
          </article>
          <article class="personnel-card" id="person-xiaoyu-jiang">
            <img class="personnel-photo" src="image/Xiaoyu Jiang.png" alt="Xiaoyu Jiang" loading="lazy">
            <div>
              <p class="personnel-role">Associate Research Fellow · Master's Supervisor</p>
              <h3 class="personnel-name">Xiaoyu Jiang</h3>
              <p class="personnel-research"><strong>Research:</strong> Applications of machine learning, foundation models, intelligent agents, and other artificial intelligence technologies in intelligent manufacturing, low-altitude operations and maintenance, smart energy, and other industrial fields.</p>
              <p class="personnel-email"><strong>Email:</strong> jiangxiaoyu@buaa.edu.cn</p>
              <div class="personnel-links">
                <a href="https://shi.buaa.edu.cn/jiangxiaoyu/zh_CN/index/219991/list/index.htm" target="_blank" rel="noopener">Homepage</a>
                <a href="https://scholar.google.com.hk/citations?user=SZzM_wUAAAAJ&amp;hl=en&amp;oi=ao" target="_blank" rel="noopener">Google Scholar</a>
              </div>
            </div>
            <div class="personnel-profile-sections">
              <section class="personnel-profile-section">
                <h4>Biography</h4>
                <p>Xiaoyu Jiang received his Ph.D. in Control Science and Engineering from Zhejiang University. He is currently a Master's Supervisor at Beihang University and head of the iData Group. He was selected for the Zhejiang Provincial Young Talent Support Program and Zhejiang Provincial Selective Postdoctoral Funding Program and received the Third Prize of the Zhejiang Natural Science Award. He conducted postdoctoral and visiting research at the State Key Laboratory of Industrial Control Technology at Zhejiang University, the Department of Systems Engineering at City University of Hong Kong, and the Department of Aerospace Engineering at the University of Kansas.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Research Interests</h4>
                <p>His research focuses on applications of machine learning, foundation models, intelligent agents, and other artificial intelligence technologies in intelligent manufacturing, low-altitude operations and maintenance, smart energy, and other industrial fields.</p>
              </section>
              <section class="personnel-profile-section">
                <h4>Academic Achievements</h4>
                <p>He has published more than 60 papers in leading journals, including IEEE Transactions journals such as IEEE TPAMI, TSMC, TIE, TII, TR, TASE, TIM, and TAI, IEEE JAS, and international conferences including NeurIPS. His work has received more than 1,300 Google Scholar citations, and five papers have been selected as ESI Highly Cited Papers. His research has been applied to complex industrial systems including chemical processes, rotating equipment, and discrete manufacturing, and he has filed or received authorization for more than 20 invention patents. In recent years, he has led projects funded by the National Natural Science Foundation of China, the Zhejiang Provincial Natural Science Foundation, and the Hangzhou Municipal Natural Science Foundation, and has contributed as a core member to major Ministry of Science and Technology projects and National Key R&amp;D Program projects.</p>
              </section>
            </div>
          </article>
        </div>
      </section>
      <section class="personnel-section personnel-detail-view" id="lab-postdocs" data-personnel-panel="postdocs">
        <h2 class="personnel-section-title">Postdoctoral Researchers</h2>
        <div class="personnel-list">
          <article class="personnel-card" id="person-danyang-han">
            <img class="personnel-photo" src="image/Danyang Han.png" alt="Danyang Han" loading="lazy">
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Danyang Han</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Biography</h4><p>Danyang Han received her Ph.D. in Engineering from Beihang University and is currently a postdoctoral researcher at Beihang University. During her doctoral studies, she received honors including Beihang University Outstanding Graduate Student and doctoral scholarships. She currently serves as a member of the Reliability System Science and Engineering Professional Committee of the Chinese Institute of Command and Control and as a guest editor for SCI-indexed journals.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>Her research focuses on remaining useful life prediction for complex equipment and health perception and diagnosis for life-cycle complex systems. Oriented toward industrial manufacturing and the aviation, aerospace, and civil aviation sectors, she develops methods for health-state information fusion, performance degradation modeling, remaining useful life prediction, and fault diagnosis by integrating digital-twin theory, physics-informed modeling, and deep learning.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>She has participated in projects funded by the National Natural Science Foundation of China, National Key R&amp;D Program projects, equipment pre-research projects, and multiple collaborative projects with peer institutions. She has published one academic monograph, more than 20 academic papers, and holds more than 10 authorized invention patents.</p></section>
              </div>
            </div>
          </article>
          <article class="personnel-card" id="person-di-su">
            <img class="personnel-photo" src="image/Di Su.png" alt="Di Su" loading="lazy">
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Di Su</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Personal Profile</h4></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4></section>
              </div>
            </div>
          </article>
          <article class="personnel-card" id="person-jiayu-wang">
            <img class="personnel-photo" src="image/Jiayu Wang.png" alt="Jiayu Wang" loading="lazy">
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Jiayu Wang</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Personal Profile</h4><p>Jiayu Wang received a bachelor’s degree in Automation and a Ph.D. in Control Science and Engineering from Jiangnan University. During his doctoral studies, he was supported by the China Scholarship Council for joint training with the research group of Royal Society of New Zealand Fellow Professor Brent Young at the University of Auckland. He is currently a postdoctoral researcher at Beihang University.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>His research focuses on frontier applications of deep learning, foundation models, and intelligent agents to soft sensing and quality monitoring in industrial processes, including intelligent manufacturing and low-altitude operations and maintenance.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>He has published more than ten first-author or corresponding-author papers in leading journals and conferences including IEEE TII, TIM, and IoTJ, and holds three authorized national invention patents. He led and completed a Jiangsu Provincial Graduate Research and Practice Innovation Program project and received honors including the 2025 Jiangnan University Outstanding Doctoral Dissertation Award, the National Scholarship, and recognition as one of the university’s Top Ten Graduate Students.</p></section>
              </div>
            </div>
          </article>
          <article class="personnel-card" id="person-zhenqin-yin">
            <span class="personnel-photo-placeholder" aria-label="No photo available for Zhenqin Yin">
              <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="22" r="13"></circle><path d="M9 58c1.8-14 10.2-22 23-22s21.2 8 23 22H9z"></path></svg>
            </span>
            <div>
              <p class="personnel-role">Postdoctoral Researcher</p><h3 class="personnel-name">Zhenqin Yin</h3><p class="personnel-email"><strong>Email:</strong></p>
              <div class="personnel-profile-sections">
                <section class="personnel-profile-section"><h4>Personal Profile</h4><p>Zhenqin Yin received a Ph.D. in Control Science and Engineering from Zhejiang University and is currently a postdoctoral researcher at Beihang University. During her doctoral studies, she received honors including Outstanding Graduate Student and a doctoral scholarship from Zhejiang University, as well as support from the National Program for Building High-Level Universities. She conducted research at the State Key Laboratory of Industrial Control Technology at Zhejiang University and visited the Graduate School of Informatics at Kyoto University.</p></section>
                <section class="personnel-profile-section"><h4>Research Interests</h4><p>Her research focuses on machine learning, artificial-intelligence security, data-driven modeling, and industrial intelligent systems.</p></section>
                <section class="personnel-profile-section"><h4>Academic Achievements</h4><p>Over the past five years, she has contributed to major projects including the Science and Technology Innovation 2030 “New Generation Artificial Intelligence” program and key projects of the National Natural Science Foundation of China. Her work covers intelligent modeling of industrial-process data, intelligent-model security and robust learning, process monitoring, and fault diagnosis. She has published papers in leading journals and A-ranked conferences including IEEE TII, TIFS, TITS, and RESS.</p></section>
              </div>
            </div>
          </article>
        </div>
      </section>
    `);

    setHTML('#research article.prose', `
      <div class="research-intro">
        <p><strong>The Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance</strong> centers its research on health prognostics, digital twins, and system resilience for advanced engineering systems in aerospace, energy and transportation, and intelligent manufacturing. It has established an integrated framework of <strong>“multimodal intelligent cognition—cyber-physical modeling—reliable system assurance.”</strong><span class="research-intro-lead">The laboratory pursues three principal directions:</span></p>
      </div>
      <div class="research-topic-list">
        <details class="research-topic-card">
          <summary>
            <span class="research-topic-number">01</span>
            <span class="research-topic-copy"><strong>Multimodal Foundation Models<br>and Intelligent PHM Algorithms</strong><small>Integrating AI with physics-based models to predict and diagnose the health of complex systems</small></span>
            <span class="research-topic-action"><span class="research-topic-action-open">View details</span><span class="research-topic-action-close">Collapse</span></span>
          </summary>
          <div class="research-topic-detail"><div class="research-topic-detail-inner">
            <p>This direction develops an end-to-end technical framework for PHM of complex engineering systems, from multi-source data processing to model training and performance validation, with multimodal foundation models at its core. By integrating sensor signals, operational parameters, maintenance records, environmental conditions, and other multidimensional information, we investigate cognitive modeling and intelligent optimization for PHM tasks and develop next-generation health-management solutions for highly reliable aerospace, energy, and transportation systems. Topics include:</p>
            <p><strong>(1) Multimodal data processing for PHM:</strong> Data cleaning, alignment, and representation learning for heterogeneous sources; standardized multi-source workflows and efficient representation frameworks; and unified, dynamic fusion of structural, time-series, image, and text data.</p>
            <p><strong>(2) Integrated multimodal foundation modeling for PHM:</strong> PHM-oriented cognitive foundation models that combine a digital-twin module for physical constraints, a knowledge-enhancement module for domain knowledge and expert experience, and a dynamic fusion mechanism to achieve deep coordination between mechanisms and data.</p>
            <p><strong>(3) Multi-agent collaborative training of PHM foundation models:</strong> Joint training strategies for multiple tasks, scenarios, and devices based on multi-agent reinforcement learning (MARL) and collaborative optimization, enabling distributed perception and coordinated decision-making in complex systems.</p>
            <p><strong>(4) Cyber-physical validation of multimodal PHM foundation models:</strong> Combined validation with simulation-generated and real operational data across task scenarios, fault profiles, and operating conditions to evaluate robustness, generalizability, and engineering readiness, creating a continuously improving validation system.</p>
            <p>The goal is a multimodal PHM framework integrating data-driven learning, physical constraints, knowledge enhancement, intelligent collaboration, and cyber-physical validation to enable lifecycle-wide predictive maintenance and autonomous intelligent assurance for complex engineering systems.</p>
            <figure class="research-figure"><img src="image/多模态大模型与PHM智能算法研究.png" alt="Framework for multimodal foundation models and intelligent PHM algorithms" loading="lazy"></figure>
          </div></div>
        </details>
        <details class="research-topic-card">
          <summary>
            <span class="research-topic-number">02</span>
            <span class="research-topic-copy"><strong>Digital-Twin Modeling<br>and Intelligent Maintenance Decision Optimization</strong><small>Enabling intelligent operational and support decisions through integrated cyber-physical simulation</small></span>
            <span class="research-topic-action"><span class="research-topic-action-open">View details</span><span class="research-topic-action-close">Collapse</span></span>
          </summary>
          <div class="research-topic-detail"><div class="research-topic-detail-inner">
            <p>Centered on digital-twin (DT) technology, this direction studies lifecycle modeling of complex engineering systems from requirements and functions to physical implementation, together with mechanisms for coordinated operation between virtual and physical systems. Model-based systems engineering (MBSE), multiphysics simulation, and data-driven optimization are combined to create real-time state mapping and predictive decision frameworks for highly reliable and efficient intelligent maintenance. Topics include:</p>
            <p><strong>(1) Digital-twin architectures and multilevel modeling:</strong> Mission-, system-, equipment-, and component-level digital twins, with a requirements—function—logic—physical—behavior mapping chain for cyber-physical coordination and multiscale associative modeling.</p>
            <p><strong>(2) Multiphysics modeling and operational-behavior simulation:</strong> Coupled structural, thermal, electrical, and fluid models for studying dynamic responses and degradation under real missions and extreme environments, providing a mechanistic basis for condition monitoring and lifetime prediction.</p>
            <p><strong>(3) Digital-twin-based system-state assessment and prediction:</strong> Fusion of digital-twin models with real-time sensor data for dynamic assessment and forward prediction of system health, mission performance, and potential fault risks.</p>
            <p><strong>(4) Intelligent maintenance and decision optimization:</strong> Digital-twin-informed decision models combining reinforcement learning, multi-objective optimization, and evolutionary computation to optimize maintenance planning, mission scheduling, resource allocation, and emergency recovery while balancing effectiveness and cost.</p>
            <p><strong>(5) Cyber-physical closed-loop validation and intelligent simulation platforms:</strong> Integrated experimental platforms for closed-loop validation of algorithms, models, and system strategies, alongside scalable AnyLogic-, Modelica-, and Python-based simulation systems supporting the full path from simulation validation to engineering deployment.</p>
            <p>This direction forms an integrated chain of model construction, simulation validation, intelligent decision-making, and closed-loop optimization, providing systematic solutions for improving the availability and lifecycle management of advanced engineering systems.</p>
            <figure class="research-figure"><img src="image/数字孪生建模与智慧运维决策优化.png" alt="Framework for digital-twin modeling and intelligent maintenance decision optimization" loading="lazy"></figure>
          </div></div>
        </details>
        <details class="research-topic-card">
          <summary>
            <span class="research-topic-number">03</span>
            <span class="research-topic-copy"><strong>Complex-System Resilience<br>and Belief Reliability Analysis</strong><small>Revealing structural evolution and quantifying resistance to disruption and recovery capacity</small></span>
            <span class="research-topic-action"><span class="research-topic-action-open">View details</span><span class="research-topic-action-close">Collapse</span></span>
          </summary>
          <div class="research-topic-detail"><div class="research-topic-detail-inner">
            <p>This direction develops theoretical frameworks and engineering methods for resilience and belief reliability in complex aerospace, energy and transportation, and intelligent-manufacturing systems. Complex-network modeling, AI analysis, and digital-twin simulation reveal structural vulnerability and dynamic evolution under multiple disturbances, couplings, and uncertainties, enabling quantitative safety and reliability assessment. Topics include:</p>
            <p><strong>(1) Complex-network modeling and system-coupling analysis:</strong> Multilayer, multidomain, and multiscale network models of structural characteristics, coupling relationships, and dynamic evolution. The OmniLink HyperNetwork (OHN) framework models high-dimensional interactions among multiple entities, relationships, and time scales. Structural Order Entropy measures structural complexity and changing order to mathematically characterize robustness and evolutionary trends.</p>
            <p><strong>(2) Belief reliability theory and uncertainty quantification:</strong> Reliability models based on belief theory that integrate Bayesian inference, evidence theory, and fuzzy logic for the comprehensive representation, updating, and dynamic assessment of uncertain multi-source information.</p>
            <p><strong>(3) System-resilience assessment and metric development:</strong> Recovery and robustness under disturbances, faults, and external shocks; quantitative resilience metrics, evolution models, and assessment systems supporting recoverability and mission-continuity analysis.</p>
            <p><strong>(4) Resilience enhancement and structural optimization:</strong> Adaptive control and structural reconfiguration for high-risk scenarios, including redundancy allocation and dynamic recovery decisions for system-level resilience improvement and proactive risk defense.</p>
            <p>The objective is a new reliability paradigm combining network science, information-entropy theory, and AI modeling to support intelligent safety management, disturbance-resistant design, and sustained mission capability in critical national engineering systems and infrastructure.</p>
            <figure class="research-figure"><img src="image/复杂系统韧性与确信可靠性分析.png" alt="Framework for complex-system resilience and belief reliability analysis" loading="lazy"></figure>
          </div></div>
        </details>
      </div>
      <p class="research-outro">The three directions reinforce one another to form an integrated <strong>“intelligence—simulation—assurance”</strong> innovation system, providing theoretical and technical foundations for future engineering systems with high reliability, intelligence, and resilience.</p>
    `);
    setHTML('#research-collapse-button', '<span aria-hidden="true">↑</span>Collapse details');

    setHTML('#achievements .section-shell', `
      <nav class="education-subnav achievement-subnav" aria-label="Research outputs page navigation">
        <button class="is-active" type="button" data-achievement-target="achievement-journals">Journal Articles</button>
        <button type="button" data-achievement-target="achievement-conferences">Conferences &amp; Other</button>
        <button type="button" data-achievement-target="achievement-books">Books</button>
        <button type="button" data-achievement-target="achievement-patents">Patents &amp; Software</button>
      </nav>
      <div class="achievement-publications" aria-live="polite">
        <section class="publication-block" id="achievement-journals"></section>
        <section class="publication-block" id="achievement-conferences"></section>
        <section class="publication-block" id="achievement-books"></section>
        <section class="publication-block" id="achievement-patents"></section>
      </div>
    `);

    setHTML('#education .page-shell', `
      <nav class="education-subnav" aria-label="Talent development page navigation">
        <button class="is-active" type="button" data-education-target="education-students">Student Supervision</button>
        <button type="button" data-education-target="education-recruitment">Admissions</button>
      </nav>
      <article class="prose recruitment-content">
        <section class="education-feature" id="education-students">
          <h2 class="education-section-title">Student Supervision</h2>
          <p class="student-summary">As primary supervisor, Yang Hu advises professional master’s students, dual-degree master’s students, and international master’s students. As co-supervisor, he jointly advises doctoral researchers and postdoctoral fellows in the group, including work on academic writing and algorithmic framework design.</p>
          <h3 class="student-subheading">Current / Supervised Graduate Students (Selected)</h3>
          <div class="student-group" id="current-doctoral">
            <h4 class="student-group-title">Doctoral Student</h4>
            <ul class="student-grid">
              <li><a class="student-card" href="students/profile.html?id=dongcan-liu&amp;lang=en"><img src="image/Dongcan Liu.png" alt="Dongcan Liu" loading="lazy"><span class="student-card-body"><span class="student-card-name">Dongcan Liu</span><span class="student-card-meta">Major: Control Science and Engineering</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
            </ul>
          </div>
          <div class="student-group" id="current-masters">
            <h4 class="student-group-title">Master’s Students</h4>
            <ul class="student-grid">
              <li><a class="student-card" href="students/profile.html?id=xinhang-chen&amp;lang=en"><img src="image/Xinhang Chen.png" alt="Xinhang Chen" loading="lazy"><span class="student-card-body"><span class="student-card-name">Xinhang Chen</span><span class="student-card-meta">Major: Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=jun-deng&amp;lang=en"><img src="image/Jun Deng.png" alt="Jun Deng" loading="lazy"><span class="student-card-body"><span class="student-card-name">Jun Deng</span><span class="student-card-meta">Major: Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=jing-li&amp;lang=en"><img src="image/Jing Li.png" alt="Jing Li" loading="lazy"><span class="student-card-body"><span class="student-card-name">Jing Li</span><span class="student-card-meta">Major: Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=kunlong-huang&amp;lang=en"><img src="image/Kunlong Huang.png" alt="Kunlong Huang" loading="lazy"><span class="student-card-body"><span class="student-card-name">Kunlong Huang</span><span class="student-card-meta">Major: Artificial Intelligence / Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=yanyan-wu&amp;lang=en"><img src="image/Yanyan Wu.png" alt="Yanyan Wu" loading="lazy"><span class="student-card-body"><span class="student-card-name">Yanyan Wu</span><span class="student-card-meta">Major: Artificial Intelligence / Electronic Information</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=yongpeng-qi&amp;lang=en"><img src="image/Yongpeng Qi.png" alt="Yongpeng Qi" loading="lazy"><span class="student-card-body"><span class="student-card-name">Yongpeng Qi</span><span class="student-card-meta">Major: Transportation</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=linhan-zhang&amp;lang=en"><img src="image/Linhan Zhang.png" alt="Linhan Zhang" loading="lazy"><span class="student-card-body"><span class="student-card-name">Linhan Zhang</span><span class="student-card-meta">Major: Mechanical Engineering</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=zhihuan-wei&amp;lang=en"><img src="image/Zhihuan Wei.png" alt="Zhihuan Wei" loading="lazy"><span class="student-card-body"><span class="student-card-name">Zhihuan Wei</span><span class="student-card-meta">Major: Mechanical Engineering</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=pedro-martin&amp;lang=en"><img src="image/Pedro Martin.png" alt="Pedro Martin" loading="lazy"><span class="student-card-body"><span class="student-card-name">Pedro Martin</span><span class="student-card-meta">International Master’s Student · Major pending</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
              <li><a class="student-card" href="students/profile.html?id=zuhaer-tousif&amp;lang=en"><img src="image/Zuhaer Tousif.png" alt="Zuhaer Tousif" loading="lazy"><span class="student-card-body"><span class="student-card-name">Zuhaer Tousif</span><span class="student-card-meta">International Master’s Student · Major pending</span><span class="student-card-email">Email:</span><span class="student-card-link">Personal Profile →</span></span></a></li>
            </ul>
          </div>
        </section>
        <section class="recruitment-section" id="education-recruitment">
          <h2 class="education-section-title">Admissions Guide</h2>
          <h2>I. About the Research Group</h2>
          <p>The Hu Yang Research Group is part of the Smart Civil Aviation Science and Technology Innovation Center at the Hangzhou International Innovation Institute, Beihang University. Led by Associate Research Fellow and Doctoral Supervisor Yang Hu, it is a young, energetic, and innovative research team. The permanent research staff include two associate research fellows, one associate professor, and four postdoctoral researchers, alongside more than ten master’s and doctoral students. This structure supports efficient collaboration through faculty leadership, core-researcher support, and a well-developed talent pipeline.</p>
          <p>Responding to major national strategic needs, the laboratory conducts fundamental and applied research on intelligent operations and maintenance, digital twins, resilience, and reliability for advanced aerospace, naval, and intelligent-manufacturing systems. Supported by high-performance computing, industrial IoT, PHM simulation and validation, and digital-twin modeling platforms, it collaborates with universities and industry partners including AVIC, COMAC, Huawei, and Loong Airlines to connect research with engineering applications.</p>
          <p>The group’s host platform, the Smart Civil Aviation Science and Technology Innovation Center, was established by the Hangzhou International Innovation Institute, Beihang University in partnership with the French National University of Civil Aviation (ENAC). It is a major education–research innovation platform serving China’s strategy for the digital and intelligent transformation of civil aviation. The center advances intelligent capabilities throughout the lifecycle of aircraft, engines, and airborne systems—including airworthiness, maintenance, air traffic management, and airport operations—and develops a closed-loop technology system spanning perception, modeling, decision-making, and optimization to support safe, efficient, and resilient civil aviation.</p>
          <p>The center houses several well-equipped specialist laboratories that provide a strong experimental foundation for our research in PHM, digital twins, and intelligent operations and maintenance:</p>
          <h3>1) Integrated Cyber-Physical Laboratory for Intelligent Health Management</h3>
          <p>This core platform for civil-aircraft PHM foundation-model research combines physical experimentation with virtual simulation, supporting the complete chain from component-degradation mechanisms to aircraft-level PHM validation. It includes Airbus A320 and Boeing 737 full-aircraft simulation systems covering twelve subsystems, more than 300 parameters, and millisecond-level fault injection; a high-precision mechanical-fault test rig with 50 kN hydraulic loading and 0.01 Nm torque sensing; and a dedicated algorithm-development environment with 128 CPU cores, 1 TB memory, and two NVIDIA A100 GPUs for multimodal foundation-model training, fine-tuning, and inference.</p>
          <h3>2) Sino-French Dassault Systèmes Center of Excellence in Education</h3>
          <p>Built on the Dassault Systèmes 3DEXPERIENCE platform (R2024x), the center provides an MBSE collaborative-development environment spanning the full aircraft lifecycle. It integrates industrial software including CATIA for parametric modeling, SIMULIA for multiphysics simulation, DELMIA for maintenance-process optimization, and ENOVIA for collaborative data management, together with Abaqus, Simpack, Isight, and Magic MBSE. The platform supports high-fidelity digital twins, multidisciplinary optimization, and system-architecture analysis to internationally recognized engineering standards.</p>
          <h3>3) Reliability Digital Twin Laboratory &amp; Fleet Operations and Maintenance Simulation Laboratory</h3>
          <p>The former includes high- and low-temperature aging chambers (-70°C to +200°C), a semiconductor thermal-resistance tester, and automated LabVIEW/MATLAB data acquisition for failure-mechanism modeling and reliability validation of critical components. The latter uses AnyLogic, an interactive AR sand-table system, and a dynamic scheduling-optimization engine to simulate PHM-supported maintenance-resource allocation and operational-effectiveness assessment for fleets at the thousand-flight scale, enabling closed-loop validation from individual-aircraft health management to intelligent fleet maintenance.</p>
          <p>The platform and Politecnico di Milano jointly established the Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance, co-led by internationally recognized PHM scholar Professor Enrico Zio and Professor Rui Kang of Beihang University. It regularly delivers international joint training, academic seminars, and co-developed courses. Partner organizations provide data from 150,000 flights, more than 2,000 real fault work orders, and over 1,000 technical manuals, ensuring authentic data, representative scenarios, and deployable results.</p>
          <p>With comprehensive facilities, rich data resources, and deep international collaboration, the platform independently supports high-level, engineering-oriented, and internationally connected master’s research, enabling efficient progress and high-quality outcomes.</p>
          <p>The group fosters a rigorous academic culture through a combined mechanism of periodic group meetings, individual weekly reports, focused seminars, and project-driven training. Students are encouraged to participate in national projects, international conferences, and joint industry challenges, developing systems thinking, engineering competence, academic communication, and teamwork. Each graduate student typically participates in one or two national or provincial/ministerial projects and publishes one or two SCI/EI-indexed papers. Some outstanding master’s students contribute to national major special projects, undertake key technology development, and present at major milestones.</p>
          <h2>II. Principal Research Directions</h2>
          <p>Our central themes are health prognostics, digital twins, and system resilience for advanced aerospace, energy and transportation, and intelligent-manufacturing systems. We organize this work within a framework of multimodal intelligent cognition, cyber-physical modeling, and reliable system operation and maintenance. The three principal directions, described in detail on the Research page, are:</p>
          <p>(1) <strong>Multimodal foundation models and intelligent PHM algorithms:</strong> integrating AI with physics-based models to predict and diagnose complex-system health. Applications include aircraft, high-speed trains, ships, CNC machine tools, wind power, and satellite electrical systems. Students learn mainstream PHM methods—including CNNs for image-based fault recognition, RNNs/LSTMs for time-series degradation modeling, and Transformers for long-range sequence dependencies—and may contribute to PHM design and validation for major national engineering systems.</p>
          <p>(2) <strong>Digital-twin modeling and intelligent maintenance decision optimization:</strong> enabling intelligent operational and support decisions through integrated cyber-physical simulation. This direction emphasizes systems engineering and simulation modeling and suits students interested in complex-system modeling, simulation optimization, and intelligent decision-making. The group has developed several digital-twin prototypes for aviation support and offshore-platform engineering systems, offering substantial involvement in real projects.</p>
          <p>(3) <strong>Complex-system resilience and belief reliability analysis:</strong> revealing structural evolution and quantifying resistance to disruption and recovery capacity. This theory-intensive direction suits students with strong mathematical foundations and interests in complex-system dynamics, network science, and risk-informed decision-making. Outcomes apply to aerospace systems, power networks, urban infrastructure, and other critical domains.</p>
          <p>These directions reinforce one another to form an integrated intelligence—simulation—assurance innovation system and provide theoretical and technical foundations for highly reliable, intelligent, and resilient engineering systems.</p>
          <p>Applications are welcome from students in computer science, automation, artificial intelligence, mechanical engineering, aerospace engineering, systems engineering, applied mathematics, and related disciplines. All directions emphasize problem orientation, model-driven research, algorithmic innovation, system implementation, and interdisciplinary integration.</p>
          <h2>III. Core Requirements and Preferred Qualifications</h2>
          <p>To ensure high-quality graduate education and effective research delivery, applicants should meet the following expectations:</p>
          <h3>Academic background:</h3>
          <ul>
            <li>Priority is given to bachelor’s or master’s graduates in computer science and technology, artificial intelligence, automation, control science and engineering, mechanical engineering, aerospace, systems engineering, applied mathematics, or related disciplines.</li>
            <li>A strong mathematical foundation is required, particularly in linear algebra, probability and statistics, optimization theory, and differential equations. As a general guideline, relevant course grades should be excellent (90 or above).</li>
            <li>Applicants should have systematically studied core courses such as Machine Learning, Deep Learning, Data Structures and Algorithms, Signals and Systems, and Control Systems, normally with grades of at least 90 in these courses.</li>
          </ul>
          <h3>Technical capabilities:</h3>
          <ul>
            <li>Proficiency in at least one of Python, MATLAB, or C++.</li>
            <li>Familiarity with mainstream deep-learning frameworks such as PyTorch or TensorFlow and the ability to independently implement CNN, RNN, LSTM, and Transformer models.</li>
            <li>Competence in mathematical modeling and data analysis, including data preprocessing and visualization with Pandas, NumPy, Scikit-learn, and Matplotlib.</li>
            <li>Prior understanding of PHM, digital twins, reinforcement learning, or complex networks is preferred.</li>
          </ul>
          <h3>Practical and competition experience (preferred):</h3>
          <ul>
            <li>Provincial-level or higher awards in competitions such as the China Undergraduate Mathematical Contest in Modeling, mathematics competitions, the Challenge Cup, RoboMaster, ACM programming contests, or Kaggle data-science competitions.</li>
            <li>Experience in research projects, patent applications, or academic-paper preparation, whether or not published.</li>
            <li>Honors such as the National Scholarship, a university first-class scholarship, or Outstanding Student recognition.</li>
            <li>Industry internships, including at internet companies, aerospace institutes, or intelligent-manufacturing enterprises.</li>
          </ul>
          <h3>Personal qualities:</h3>
          <ul>
            <li>Strong enthusiasm for research and independent learning, resilience under research pressure, and willingness to tackle frontier problems.</li>
            <li>Effective teamwork and communication, with active participation in group meetings, project discussions, and academic presentations.</li>
            <li>Good English proficiency for reading literature and writing academic papers; TOEFL, IELTS, or GRE results are advantageous.</li>
            <li>A career interest in nationally important sectors such as aerospace, advanced manufacturing, or artificial intelligence is preferred.</li>
          </ul>
          <h2>IV. Graduate Training and Expected Outcomes</h2>
          <p>We follow an individualized, project-driven, and outcome-oriented training model. After enrollment, the supervisor develops a tailored plan based on each student’s background, interests, career goals, and the group’s active projects, ensuring that individual strengths are fully developed and effectively applied.</p>
          <p><strong>Expected outcomes, adjusted where appropriate to each training pathway:</strong></p>
          <ol>
            <li>Publish a high-quality paper as first author, or as second author when the supervisor is first author.</li>
            <li>Apply for a national invention patent or software copyright.</li>
            <li>Independently develop or lead a prototype system or simulation platform that passes acceptance or demonstration.</li>
            <li>Give an oral or poster presentation at a relevant international conference such as ICML, the PHM Society Conference, IEEE reliability conferences, or ESREL.</li>
            <li>Complete an internship of at least three months at an enterprise or research institute and submit an internship report and host evaluation.</li>
            <li>Receive a university-level or higher research-competition award or scholarship.</li>
          </ol>
          <p>Every graduate student receives adequate research funding, high-performance computing resources, and opportunities for academic exchange in China and abroad. Outstanding students are actively recommended for overseas joint training or doctoral study and may receive priority referrals to partner organizations including AVIC, CASC, Huawei, and COMAC.</p>
          <h2>V. Career Development</h2>
          <p><strong>▶ Further academic study:</strong> Through collaborations with overseas laboratories, we support joint training and research visits. Outstanding master’s and doctoral graduates may receive recommendations for doctoral or postdoctoral opportunities at Beihang or leading universities in China and abroad, including Université Paris-Saclay, Politecnico di Milano, and City University of Hong Kong, subject to securing a CSC scholarship where required.</p>
          <p><strong>▶ Employment:</strong> Graduates pursue roles at aerospace institutes (including Institutes 601 and 603, and the First and Fifth Academies of CASC), intelligent-manufacturing companies such as Huawei and DJI, AI companies such as Alibaba Cloud, SenseTime, and Megvii, industrial-software companies such as Dassault Systèmes and Siemens, and power utilities such as State Grid and China Southern Power Grid. Typical positions include algorithm engineer, systems architect, PHM engineer, digital-twin specialist, and reliability analyst.</p>
          <p><strong>▶ Entrepreneurship and interdisciplinary development:</strong> The group encourages innovation and supports students interested in commercializing research. Alumni have founded startups in intelligent maintenance and industrial AI.</p>
          <h2>VI. How to Apply</h2>
          <p>Students motivated to pursue frontier research in intelligent systems, artificial intelligence, and systems engineering are warmly invited to apply. Send the materials below to <strong>yang_hu@buaa.edu.cn</strong>. <strong>Email subject:</strong> “Master’s/PhD Application – Name – Undergraduate University – Major.”</p>
          <p>Postdoctoral applicants should consult <a href="https://h3i.buaa.edu.cn/info/1141/1391.htm" target="_blank" rel="noopener">https://h3i.buaa.edu.cn/info/1141/1391.htm</a>. The institute provides first-class academic supervision, research conditions, and compensation. Annual salaries are RMB 320,000 for Category A and RMB 280,000 for Category B postdoctoral fellows, excluding government subsidies, plus RMB 150,000 in research start-up funding including government support. Fellows may also apply for supplementary subsidies from Hangzhou Municipality and Yuhang District, with cumulative benefits of up to RMB 2.19 million. See the Yuhang District “Future through Global Innovation · Outstanding Postdoctoral” Take-off Program, the Hangzhou West Science and Technology Innovation Corridor special-fund rules, and related policies; all benefits remain subject to the latest government regulations.</p>
          <p><strong>Required materials:</strong></p>
          <ol>
            <li>Curriculum vitae, including education, research/project experience, competition awards, and professional certifications.</li>
            <li>Undergraduate/master’s transcripts (scanned copies).</li>
            <li>Representative outputs such as papers, patents, competition certificates, or project reports.</li>
            <li>A personal statement of approximately 500 Chinese characters or comparable length in English, explaining motivation, research interests, and career plans.</li>
            <li>Optional: one or two recommendation letters.</li>
          </ol>
          <p>Applications will undergo an initial review, followed by online or in-person interviews for shortlisted candidates. Interviews cover foundational knowledge, research potential, English communication, and discussion of proposed projects.</p>
          <p class="recruitment-conclusion">The Hu Yang Research Group is an energetic, excellence-driven, and practice-oriented research community. Beyond papers and patents, we value each student’s comprehensive capabilities and long-term career development. You will engage with frontier research, contribute to major national engineering projects, work alongside outstanding peers, and gain rigorous research training and valuable professional experience.</p>
          <p class="recruitment-invitation">If you are passionate about research, ready for challenges, and eager to grow, we welcome you to join us in exploring new paradigms for system operations and maintenance in the age of intelligence and contributing to the intelligent transformation of advanced engineering systems.</p>
        </section>
      </article>
    `);

    setHTML('.contact-page', `
      <header class="contact-heading">
        <h2 class="contact-title">Contact Information</h2>
        <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
          <button type="button" data-contact-home>Home</button>
          <span>/</span>
          <strong>Contact</strong>
        </nav>
      </header>
      <figure class="contact-map">
        <img src="image/school_lc.png" alt="Location map of Beihang University Hangzhou International Innovation Institute" loading="lazy">
      </figure>
      <dl class="contact-list">
        <div class="contact-item"><dt>Address</dt><dd>No. 166 Shuanghongqiao Street, Pingyao Town, Yuhang District, Hangzhou, Zhejiang, Beihang University Hangzhou International Innovation Institute / International School of Innovation</dd></div>
        <div class="contact-item"><dt>Postal Code</dt><dd>311115</dd></div>
        <div class="contact-item"><dt>Email</dt><dd>yang_hu@buaa.edu.cn</dd></div>
      </dl>
      <section class="contact-recruitment"><p>We continually recruit master’s and doctoral students and postdoctoral fellows. We welcome candidates interested in prognostics and health management, intelligent operations and maintenance, industrial big data, and complex-system modeling and simulation—especially those eager to apply advanced AI algorithms to challenging open problems.</p></section>
    `);
    setText('.site-footer p', '© 2026 Sino-Italian Joint Laboratory for Health Management and Intelligent Maintenance · Hangzhou International Innovation Institute, Beihang University');
  }

  configureLanguage();
  let showNewsView = () => {};

  function setupNewsPage() {
    const newsPage = document.getElementById('news');
    const source = newsPage?.querySelector('.placeholder-page');
    if (!newsPage || !source) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'News',
          conferences: 'Academic Conferences',
          papers: 'Research Publications',
          activities: 'Academic Activities',
          notices: 'Notices',
          empty: 'Content coming soon.',
          conferenceTitle: 'Reliability Engineering × a Sustainable Future: ICRE 2026',
          conferenceText: 'The 10th International Conference on Reliability Engineering gathered scholars in Hangzhou to exchange frontier research on reliability engineering and intelligent resilient systems.',
          activityTitle: '2026 International Summer School of Aviation Safety',
          activityText: 'The summer school brought together international students and scholars for academic exchange on digitally empowered aviation safety.',
          detail: 'Learn more'
        }
      : {
          home: '首页',
          title: '新闻动态',
          conferences: '学术会议',
          papers: '论文成果',
          activities: '学术活动',
          notices: '通知公告',
          empty: '栏目内容待补充。',
          conferenceTitle: '可靠性工程 × 可持续未来 ICRE 2026重磅来袭',
          conferenceText: '第10届可靠性工程国际会议在杭州举行，来自相关领域的专家学者围绕可靠性工程与智能韧性系统前沿研究展开交流。',
          activityTitle: '2026 数字赋能的航空安全国际暑期学校',
          activityText: '暑期学校汇聚中外学生与专家学者，围绕数字赋能的航空安全开展课程学习、专题研讨与学术交流。',
          detail: '了解详情'
        };
    const conferenceItems = [
      {
        day: '07.19–21',
        year: '2026',
        title: labels.conferenceTitle,
        text: labels.conferenceText,
        image: 'image/icre-2026-cover.jpg',
        imageAlt: isEnglish ? 'Group photo of ICRE 2026 participants' : 'ICRE 2026会议参会人员合影',
        url: 'https://mp.weixin.qq.com/s/vTC1ejJQKDhgqZKh8jc96A'
      }
    ];
    const activityItems = [
      {
        day: '07.12–25',
        year: '2026',
        title: labels.activityTitle,
        text: labels.activityText,
        image: 'image/summer-school-2026.jpg',
        imageAlt: isEnglish ? 'Group photo from the 2026 International Summer School of Aviation Safety' : '2026 数字赋能的航空安全国际暑期学校合影',
        url: 'https://mp.weixin.qq.com/s/HlfpfIzE95P60b-ABVsFCw'
      }
    ];

    // 按时间轴格式生成新闻列表，传入新闻对象数组，返回新闻列表HTML字符串
    const buildNewsTimeline = (items) => {
      return `
        <div class="news-timeline">
          ${items.map((item) => `
            <a class="news-timeline-item" href="${item.url}" target="_blank" rel="noopener">
              <time class="news-timeline-date"><strong>${item.day}</strong>${item.year}</time>
              <span class="news-timeline-plane" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z"></path></svg>
              </span>
              <span class="news-timeline-image">
                <img src="${item.image}" alt="${item.imageAlt}" loading="lazy">
              </span>
              <span class="news-timeline-content">
                <h2>${item.title}</h2>
                <p>${item.text}</p>
                <span class="news-timeline-detail">${labels.detail}</span>
              </span>
            </a>
          `).join('')}
        </div>
      `;
    };
    const sections = [
      ['conferences', labels.conferences],
      ['activities', labels.activities],
      ['papers', labels.papers],
      ['notices', labels.notices]
    ];
    const app = document.createElement('div');
    app.className = 'center-page-shell news-page-shell';
    app.innerHTML = `
      <div class="center-page-layout news-page-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-news-view="${key}">${label}</button>
            `).join('')}
          </div>
        </aside>
        <div class="center-page-main">
          <header class="personnel-page-heading">
            <h1 data-news-heading>${labels.conferences}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-news-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-news-overview>${labels.title}</button>
              <i>/</i>
              <strong data-news-current>${labels.conferences}</strong>
            </nav>
          </header>
          <section class="center-page-panel news-page-panel" data-news-panel="conferences">${buildNewsTimeline(conferenceItems)}</section>
          <section class="center-page-panel news-page-panel" data-news-panel="activities" hidden>${buildNewsTimeline(activityItems)}</section>
          <section class="center-page-panel news-page-panel" data-news-panel="papers" hidden><p class="news-empty-view">${labels.empty}</p></section>
          <section class="center-page-panel news-page-panel" data-news-panel="notices" hidden><p class="news-empty-view">${labels.empty}</p></section>
        </div>
      </div>
    `;
    newsPage.replaceChildren(app);
    const routeNames = {
      conferences: 'news-conferences',
      activities: 'news-activities',
      papers: 'news-papers',
      notices: 'news-notices'
    };
    showNewsView = (viewName = 'conferences') => {
      const targetView = sections.some(([key]) => key === viewName) ? viewName : 'conferences';
      const currentLabel = sections.find(([key]) => key === targetView)?.[1] || labels.conferences;
      app.querySelectorAll('[data-news-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.newsView === targetView);
      });
      app.querySelectorAll('[data-news-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.newsPanel !== targetView;
      });
      const heading = app.querySelector('[data-news-heading]');
      const current = app.querySelector('[data-news-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
    };
    app.querySelectorAll('[data-news-view]').forEach((button) => {
      button.addEventListener('click', () => showPage(routeNames[button.dataset.newsView]));
    });
    app.querySelector('[data-news-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-news-overview]')?.addEventListener('click', () => showPage('news-conferences'));
    showNewsView('conferences');
  }

  setupNewsPage();
  let showCenterPageView = () => {};

  function setupCenterPage() {
    const centerPage = document.getElementById('team');
    const introSource = centerPage?.querySelector('.page-shell');
    if (!centerPage || !introSource) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'About',
          intro: 'Introduction',
          philosophy: 'Philosophy',
          organization: 'Organization',
          executiveDirector: 'Executive Director'
        }
      : {
          home: '首页',
          title: '中心简况',
          intro: '中心简介',
          philosophy: '中心理念',
          organization: '中心架构',
          executiveDirector: '执行主任'
        };
    const sections = [
      ['intro', labels.intro],
      ['philosophy', labels.philosophy],
      ['organization', labels.organization]
    ];
    const app = document.createElement('div');
    app.className = 'center-page-shell';
    app.innerHTML = `
      <div class="center-page-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-center-view="${key}">${label}</button>
            `).join('')}
          </div>
        </aside>
        <div class="center-page-main">
          <header class="personnel-page-heading">
            <h1 data-center-heading>${labels.intro}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-center-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-center-overview>${labels.title}</button>
              <i>/</i>
              <strong data-center-current>${labels.intro}</strong>
            </nav>
          </header>
          <section class="center-page-panel" data-center-panel="intro"></section>
          <section class="center-page-panel" data-center-panel="philosophy" hidden></section>
          <section class="center-page-panel" data-center-panel="organization" hidden></section>
        </div>
      </div>
    `;
    const introPanel = app.querySelector('[data-center-panel="intro"]');
    const organizationPanel = app.querySelector('[data-center-panel="organization"]');
    while (introSource.firstChild) introPanel.append(introSource.firstChild);
    introPanel.querySelector('.lab-introduction > h2:first-child')?.remove();
    organizationPanel.innerHTML = `
      <div class="center-organization-grid">
        <figure class="center-organization-person">
          <img src="image/Yang Hu.png" alt="${isEnglish ? 'Yang Hu' : '胡杨'}" loading="lazy">
          <figcaption><strong>${isEnglish ? 'Yang Hu' : '胡杨'}</strong><small>${labels.executiveDirector}</small></figcaption>
        </figure>
        <figure class="center-organization-person">
          <img src="image/Yang Li.png" alt="${isEnglish ? 'Yang Li' : '李洋'}" loading="lazy">
          <figcaption><strong>${isEnglish ? 'Yang Li' : '李洋'}</strong></figcaption>
        </figure>
        <figure class="center-organization-person">
          <img src="image/Xiaoyu Jiang.png" alt="${isEnglish ? 'Xiaoyu Jiang' : '江肖禹'}" loading="lazy">
          <figcaption><strong>${isEnglish ? 'Xiaoyu Jiang' : '江肖禹'}</strong></figcaption>
        </figure>
      </div>
    `;
    centerPage.replaceChildren(app);
    const routeNames = {
      intro: 'team',
      philosophy: 'center-philosophy',
      organization: 'organization'
    };
    showCenterPageView = (viewName = 'intro') => {
      const targetView = sections.some(([key]) => key === viewName) ? viewName : 'intro';
      const currentLabel = sections.find(([key]) => key === targetView)?.[1] || labels.intro;
      app.querySelectorAll('[data-center-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.centerView === targetView);
      });
      app.querySelectorAll('[data-center-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.centerPanel !== targetView;
      });
      const heading = app.querySelector('[data-center-heading]');
      const current = app.querySelector('[data-center-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
    };
    app.querySelectorAll('[data-center-view]').forEach((button) => {
      button.addEventListener('click', () => showPage(routeNames[button.dataset.centerView]));
    });
    app.querySelector('[data-center-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-center-overview]')?.addEventListener('click', () => showPage('team'));
    showCenterPageView('intro');
  }

  setupCenterPage();
  let showResearchPageView = () => {};
  let resetResearchTopicDetail = () => {};
  let showResearchTopicDetailPage = () => {};

  function setupResearchPage() {
    const researchPage = document.getElementById('research');
    const directionsSource = researchPage?.querySelector('.page-shell');
    const achievementsSource = document.querySelector('#achievements .section-shell');
    if (!researchPage || !directionsSource || !achievementsSource) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'Research',
          directions: 'Research Directions',
          projects: 'Research Projects',
          outputs: 'Research Outputs',
          cooperation: 'Research Collaboration',
          cooperationOverview: 'Collaboration Overview',
          directionItems: [
            'Multimodal Foundation Models and Intelligent PHM Algorithms',
            'Digital-Twin Modeling and Intelligent Maintenance Decision Optimization',
            'Complex-System Resilience and Belief Reliability Analysis'
          ],
          journals: 'Journal Articles',
          conferences: 'Conferences & Other',
          books: 'Books',
          patents: 'Patents & Software',
          domestic: 'Mainland Universities',
          international: 'Overseas Universities',
          enterprise: 'Industry Collaboration',
          cooperationIntro: 'The laboratory advances open collaboration in response to national innovation priorities and practical industry needs, with a focus on joint research, talent development, and shared research platforms. Through sustained engagement with universities, research institutions, and enterprises in China and abroad, it connects academic inquiry with engineering practice and supports research, team development, and service to industry.',
          cooperationStatus: 'In university collaboration, the laboratory maintains close academic ties with Zhejiang University, City University of Hong Kong, Politecnico di Milano, and Université Paris-Saclay, supporting academic exchange, joint research, and talent development. In industry and research-institute collaboration, it works with AVIC, Aero Engine Corporation of China, China Aerospace Science and Technology Corporation, COMAC, the China Electronic Product Reliability and Environmental Testing Research Institute, Huawei 2012 Laboratories, Zhejiang Loong Airlines Maintenance Engineering Co., Ltd., and Suparna Airlines on research projects and shared platforms. These partnerships support fundamental research and key technologies for intelligent operations and maintenance, digital-twin modeling, resilience, and reliability in advanced aerospace, naval, and intelligent-manufacturing systems. The laboratory is equipped with high-performance computing, industrial IoT data acquisition, PHM simulation and validation, digital-twin modeling, and complex-network analysis platforms. Its long-term partnership with Zhejiang Loong Airlines provides more than ten years of flight-parameter data covering over 150,000 A320 flights and more than 2,000 authentic maintenance work orders. It also shares resources with the Sino-French Dassault Systèmes Center of Excellence in Education, the Reliability Digital Twin Laboratory, and the Fleet Operations and Maintenance Simulation Laboratory, enabling coordinated design, modeling, simulation, and validation.',
          cooperationDetail: 'Further information on collaboration and related outcomes will be added.',
          cooperationBack: '← Back to partners',
          cooperationCategoryBack: '← Back to collaboration overview',
          categoryDescriptions: {
            domestic: 'Academic exchange and research collaboration with universities in mainland China.',
            international: 'International academic exchange, joint research, and talent development.',
            enterprise: 'Joint research projects, platform development, and engineering applications with industry partners.'
          }
        }
      : {
          home: '首页',
          title: '科学研究',
          directions: '科研方向',
          projects: '科研项目',
          outputs: '科研成果',
          cooperation: '科研合作',
          cooperationOverview: '合作概览',
          directionItems: [
            '多模态大模型与智能PHM算法研究',
            '数字孪生建模与智慧运维决策优化',
            '复杂系统韧性与确信可靠性分析'
          ],
          journals: '期刊论文',
          conferences: '会议及其他',
          books: '专著',
          patents: '专利与软著',
          domestic: '境内高校',
          international: '境外高校',
          enterprise: '企业合作',
          cooperationIntro: '实验室面向国家创新体系建设与行业实际需求，持续推进以科研协同、人才培养和平台共建为重点的开放合作。通过加强与国内外高校、科研机构及企业的交流，促进学术研究与工程应用相衔接，并以产学研协作为科研创新、团队建设和行业服务提供支撑。',
          cooperationStatus: '在高校合作方面，实验室与浙江大学、香港城市大学、意大利米兰理工大学、巴黎萨克雷大学等国内外高校保持密切学术联系，持续开展学术交流、联合研究与人才培养。在企业及科研机构合作方面，实验室与航空工业集团、中国航发、中国航天科技集团、中国商飞有限公司、工信部电子信息五所、华为2012实验室、浙江长龙航空维修工程有限公司、金鹏航空等单位共同开展科研项目和平台建设，围绕新一代航空、航天、舰船、智能制造等高端工程系统的智能化运维、数字孪生建模和韧性可靠性分析，推进基础理论研究与关键技术攻关。',
          cooperationDetail: '合作内容与相关成果待补充。',
          cooperationBack: '← 返回合作单位',
          cooperationCategoryBack: '← 返回科研合作首页',
          categoryDescriptions: {
            domestic: '与境内高校开展学术交流与科研协同。',
            international: '开展国际学术交流、联合研究与人才培养。',
            enterprise: '与企业开展科研项目、平台共建与工程应用合作。'
          }
        };
    const sections = [
      ['directions', labels.directions],
      ['projects', labels.projects],
      ['outputs', labels.outputs],
      ['cooperation', labels.cooperation]
    ];
    const outputCategories = [
      ['journals', labels.journals],
      ['conferences', labels.conferences],
      ['books', labels.books],
      ['patents', labels.patents]
    ];
    const yearRanges = ['2026', '2025', '2024', '2023-2018'];
    const projects = isEnglish
      ? [
          ['2025', '2025.09 – 2026.09', 'Integrated operations and maintenance control software development for asset systems based on multimodal data', 'Shanghai Yiliu Technology Co., Ltd. · RMB 1.05 million · Task Leader (ranked 1/8)'],
          ['2025', '2025.10 – 2026.06', 'Development of a reliability testing and validation system for representative products', 'China Electronic Product Reliability and Environmental Testing Research Institute · RMB 428,000 · Executive Project Leader (ranked 1/6)'],
          ['2023', '2023.02 – 2024.12', 'Research and validation of precision support for new aircraft', 'RMB 3 million · Task Leader (ranked 1/8)'],
          ['2023', '2023.01 – 2024.12', 'Research on the standards system for aircraft health management systems', 'RMB 500,000 · Task Leader (ranked 1/7)'],
          ['2022', '2022.05 – 2025.05', 'Research on key technologies for agile support of aviation equipment', 'RMB 3 million · Project Leader'],
          ['2022', '2022.09 – 2023.09', 'Algorithmic models for AI-based equipment maintenance decision-making', 'Pre-research Rapid Support Project · RMB 210,000'],
          ['2021', '2021.03 – 2023.11', 'Research on next-generation intelligent support systems for aviation equipment', 'RMB 8 million · Project Leader'],
          ['2020', '2020.03 – 2022.03', 'Research on situational awareness of support resources and equipment selection models', 'RMB 3.8 million · Project Leader'],
          ['2020', '2020.03 – 2022.03', 'Aircraft health management and intelligent support technology', 'Young Elite Scientists Sponsorship Program by CAST · RMB 450,000 · No. YESS20200302'],
          ['2019', '2019.08 – 2021.08', 'Concept study of military intelligent agents and swarm-intelligence algorithms', 'Science and Technology Commission Innovation Special Zone Project · RMB 750,000 · Project Leader'],
          ['2018', '2018.01 – 2020.12', 'Self-learning of equipment health indicators and generalized PHM modeling based on deep learning in industrial big-data environments', 'National Natural Science Foundation of China Young Scientists Fund · RMB 220,000 · No. 61703431']
        ]
      : [
          ['2025', '2025.09 – 2026.09', '基于多模态数据的资产系统一体化运维运控软件开发', '上海亿流科技有限公司 · 105万元 · 课题负责人（排名1/8）'],
          ['2025', '2025.10 – 2026.06', '典型产品可靠性测试验证系统开发', '工信部电子信息五所 · 42.8万元 · 项目执行负责人（排名1/6）'],
          ['2023', '2023.02 – 2024.12', '新机精确保障研究与验证', '300万元 · 课题负责人（排名1/8）'],
          ['2023', '2023.01 – 2024.12', '飞机健康管理系统标准体系研究', '50万元 · 课题负责人（排名1/7）'],
          ['2022', '2022.05 – 2025.05', '航空装备敏捷保障关键技术研究', '300万元 · 项目负责人'],
          ['2022', '2022.09 – 2023.09', '基于人工智能的装备维修决策算法模型', '预研快速扶持课题 · 21万元'],
          ['2021', '2021.03 – 2023.11', '新一代航空装备智能保障系统研究', '800万元 · 项目负责人'],
          ['2020', '2020.03 – 2022.03', '保障资源态势感知与装备优选模型研究', '380万元 · 项目负责人'],
          ['2020', '2020.03 – 2022.03', '飞机健康管理与智能保障技术研究', '中国科协青年人才托举计划（国家级人才计划）· 45万元 · 编号 YESS20200302'],
          ['2019', '2019.08 – 2021.08', '军事智能单体与群智能算法概念研究', '科技委创新特区项目 · 75万元 · 项目负责人'],
          ['2018', '2018.01 – 2020.12', '工业大数据环境下基于深度学习的设备健康指标自学习与PHM通用建模技术', '国家自然科学基金青年基金项目 · 22万元 · 编号 61703431']
        ];
    const availableYearRanges = yearRanges.filter((range) => {
      if (range === '2023-2018') {
        return projects.some(([year]) => Number(year) >= 2018 && Number(year) <= 2023);
      }
      return projects.some(([year]) => year === range);
    });
    const projectGroupHtml = (range) => {
      const years = range === '2023-2018'
        ? ['2023', '2022', '2021', '2020', '2019', '2018']
        : [range];
      const content = years.map((year) => {
        const yearProjects = projects.filter(([projectYear]) => projectYear === year);
        if (!yearProjects.length) return '';
        return `
          <section class="research-project-year">
            <h2>${year}</h2>
            <ol class="research-project-list">
              ${yearProjects.map(([, period, title, meta]) => `
                <li class="research-project-item">
                  <time class="research-project-period">${period}</time>
                  <div>
                    <h3>${title}</h3>
                    <p class="research-project-meta">${meta}</p>
                  </div>
                </li>
              `).join('')}
            </ol>
          </section>
        `;
      }).join('');
      return `
        <section class="research-project-year-group" id="research-project-${range}">
          ${content}
        </section>
      `;
    };
    const projectsHtml = `
      <nav class="education-subnav achievement-subnav" aria-label="${isEnglish ? 'Project year navigation' : '科研项目年份导航'}">
        ${availableYearRanges.map((range, index) => `
          <button class="${index === 0 ? 'is-active' : ''}" type="button" data-project-target="research-project-${range}">${range}</button>
        `).join('')}
      </nav>
      ${availableYearRanges.map(projectGroupHtml).join('')}
    `;
    const cooperationGroups = {
      domestic: isEnglish
        ? [
            ['Zhejiang University', 'Academic exchange and research collaboration; further information will be added.']
          ]
        : [
            ['浙江大学', '围绕学术交流与科研协同保持联系，具体合作内容待补充。']
          ],
      international: isEnglish
        ? [
            ['The Hong Kong Polytechnic University', 'Academic exchange and research collaboration; further information will be added.'],
            ['Politecnico di Milano', 'Collaboration in academic exchange, joint-laboratory development, and talent cultivation.'],
            ['Université Paris-Saclay', 'International academic exchange and research collaboration; further information will be added.']
          ]
        : [
            ['香港理工大学', '围绕学术交流与科研协同保持联系，具体合作内容待补充。'],
            ['意大利米兰理工大学', '围绕学术交流、联合实验室建设与人才培养开展合作。'],
            ['巴黎萨克雷大学', '围绕国际学术交流与科研协同保持联系，具体合作内容待补充。']
          ],
      enterprise: isEnglish
        ? [
            ['Commercial Aircraft Corporation of China (COMAC)', 'Joint research projects and engineering applications; further information will be added.'],
            ['China Electronic Product Reliability and Environmental Testing Research Institute', 'Research collaboration in reliability testing and validation; further information will be added.'],
            ['Huawei 2012 Laboratories', 'Research collaboration and technical exchange; further information will be added.'],
            ['Zhejiang Loong Airlines Maintenance Engineering Co., Ltd.', 'Collaboration on aviation maintenance data, PHM, and intelligent operations and maintenance.'],
            ['Suparna Airlines', 'Joint research projects and engineering collaboration; further information will be added.']
          ]
        : [
            ['中国商飞有限公司', '围绕科研项目与工程应用开展合作，具体内容待补充。'],
            ['工信部电子信息五所', '围绕可靠性测试验证开展科研合作，具体内容待补充。'],
            ['华为2012实验室', '围绕科研协同与技术交流开展合作，具体内容待补充。'],
            ['浙江长龙航空维修工程有限公司', '围绕航空维修数据、PHM与智慧运维开展合作。'],
            ['金鹏航空', '围绕科研项目与工程应用开展合作，具体内容待补充。']
          ]
    };
    const app = document.createElement('div');
    app.className = 'research-page-shell';
    app.innerHTML = `
      <div class="research-page-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              ${key === 'directions' ? `
                <div class="personnel-side-group" data-research-direction-group>
                  <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-research-page-view="directions">
                    <span>${label}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">
                    ${labels.directionItems.map((title, directionIndex) => `
                      <button type="button" data-research-direction-index="${directionIndex}">${title}</button>
                    `).join('')}
                  </div>
                </div>
              ` : key === 'outputs' ? `
                <div class="personnel-side-group" data-research-output-group>
                  <button class="personnel-side-button" type="button" data-research-page-view="outputs">
                    <span>${label}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">
                    ${outputCategories.map(([category, categoryLabel]) => `
                      <button type="button" data-research-output-category="${category}">${categoryLabel}</button>
                    `).join('')}
                  </div>
                </div>
              ` : key === 'cooperation' ? `
                <div class="personnel-side-group" data-research-cooperation-group>
                  <button class="personnel-side-button" type="button" data-research-page-view="cooperation">
                    <span>${label}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">
                    <button type="button" data-research-cooperation-category="domestic">${labels.domestic}</button>
                    <button type="button" data-research-cooperation-category="international">${labels.international}</button>
                    <button type="button" data-research-cooperation-category="enterprise">${labels.enterprise}</button>
                  </div>
                </div>
              ` : `
                <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-research-page-view="${key}">${label}</button>
              `}
            `).join('')}
          </div>
        </aside>
        <div class="research-page-main">
          <header class="personnel-page-heading">
            <h1 data-research-page-heading>${labels.directions}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-research-page-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-research-page-overview>${labels.title}</button>
              <i>/</i>
              <strong data-research-page-current>${labels.directions}</strong>
              <i data-research-page-detail-separator hidden>/</i>
              <strong data-research-page-detail hidden></strong>
            </nav>
          </header>
          <section class="research-page-panel" data-research-page-panel="directions"></section>
          <section class="research-page-panel" data-research-page-panel="projects" hidden></section>
          <section class="research-page-panel" data-research-page-panel="outputs" hidden></section>
          <section class="research-page-panel" data-research-page-panel="cooperation" hidden></section>
        </div>
      </div>
    `;
    const directionsPanel = app.querySelector('[data-research-page-panel="directions"]');
    const projectsPanel = app.querySelector('[data-research-page-panel="projects"]');
    const outputsPanel = app.querySelector('[data-research-page-panel="outputs"]');
    const cooperationPanel = app.querySelector('[data-research-page-panel="cooperation"]');
    while (directionsSource.firstChild) directionsPanel.append(directionsSource.firstChild);
    projectsPanel.innerHTML = projectsHtml;
    while (achievementsSource.firstChild) outputsPanel.append(achievementsSource.firstChild);
    outputsPanel.querySelector('.achievement-subnav')?.remove();
    outputsPanel.insertAdjacentHTML('afterbegin', `
      <nav class="education-subnav achievement-subnav" data-journal-year-nav aria-label="${isEnglish ? 'Journal year navigation' : '期刊论文年份导航'}">
        ${['2026', '2025', '2024', '2023-2018', '2017-2013'].map((range, index) => `
          <button class="${index === 0 ? 'is-active' : ''}" type="button" data-journal-year-target="achievement-journals-${range}">${range}</button>
        `).join('')}
      </nav>
    `);
    const journalYearNav = outputsPanel.querySelector('[data-journal-year-nav]');
    let currentJournalYearRange = '2026';
    const showJournalYearRange = (range = '2026') => {
      currentJournalYearRange = range;
      journalYearNav?.querySelectorAll('[data-journal-year-target]').forEach((button) => {
        const isActive = button.dataset.journalYearTarget === `achievement-journals-${range}`;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
      const groups = outputsPanel.querySelectorAll('.publication-year-group');
      if (!groups.length) return false;
      groups.forEach((group) => {
        group.hidden = group.id !== `achievement-journals-${range}`;
      });
      const target = document.getElementById(`achievement-journals-${range}`);
      if (target && !target.querySelector('.publication-list, .publication-status')) {
        const empty = document.createElement('p');
        empty.className = 'publication-status';
        empty.textContent = isEnglish ? 'No journal articles for this year.' : '该年份暂无期刊论文。';
        target.append(empty);
      }
      return true;
    };
    journalYearNav?.querySelectorAll('[data-journal-year-target]').forEach((button) => {
      button.addEventListener('click', () => {
        showJournalYearRange(button.dataset.journalYearTarget.replace('achievement-journals-', ''));
      });
    });
    if (!showJournalYearRange(currentJournalYearRange)) {
      document.addEventListener(
        'publications:rendered',
        () => showJournalYearRange(currentJournalYearRange),
        { once: true }
      );
    }
    cooperationPanel.innerHTML = `
      <div class="cooperation-list-view" data-cooperation-list>
        <p class="cooperation-intro">${labels.cooperationIntro}</p>
        <p class="cooperation-intro">${labels.cooperationStatus}</p>
        <div class="cooperation-category-grid">
          ${['domestic', 'international', 'enterprise'].map((category) => `
            <button class="cooperation-category-card" type="button" data-cooperation-category="${category}">
              <span class="cooperation-category-image">IMAGE</span>
              <span class="cooperation-category-copy">
                <strong>${labels[category]}</strong>
                <small>${labels.categoryDescriptions[category]}</small>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
      <section class="cooperation-partner-view" data-cooperation-partners hidden>
        <button class="cooperation-back" type="button" data-cooperation-category-back>${labels.cooperationCategoryBack}</button>
        <h2 data-cooperation-category-title></h2>
        <p class="cooperation-intro" data-cooperation-category-description></p>
        <div class="cooperation-grid" data-cooperation-grid></div>
      </section>
    `;
    researchPage.replaceChildren(app);

    const routeNames = {
      directions: 'research',
      projects: 'research-projects',
      outputs: 'achievements',
      cooperation: 'research-cooperation'
    };
    const detailSeparator = app.querySelector('[data-research-page-detail-separator]');
    const detailBreadcrumb = app.querySelector('[data-research-page-detail]');
    const setResearchDetailBreadcrumb = (text = '') => {
      if (detailSeparator) detailSeparator.hidden = !text;
      if (detailBreadcrumb) {
        detailBreadcrumb.hidden = !text;
        detailBreadcrumb.textContent = text;
      }
    };
    let currentOutputCategory = 'journals';
    const showOutputCategory = (categoryName = 'journals') => {
      currentOutputCategory = outputCategories.some(([category]) => category === categoryName)
        ? categoryName
        : 'journals';
      outputsPanel.querySelectorAll('.publication-block').forEach((section) => {
        section.hidden = section.id !== `achievement-${currentOutputCategory}`;
      });
      if (journalYearNav) journalYearNav.hidden = currentOutputCategory !== 'journals';
      app.querySelectorAll('[data-research-output-category]').forEach((button) => {
        button.classList.toggle(
          'is-active',
          button.dataset.researchOutputCategory === currentOutputCategory
        );
      });
      setResearchDetailBreadcrumb(
        outputCategories.find(([category]) => category === currentOutputCategory)?.[1] || labels.journals
      );
    };
    let currentCooperationCategory = 'domestic';
    const showCooperationOverview = () => {
      const list = cooperationPanel.querySelector('[data-cooperation-list]');
      const partners = cooperationPanel.querySelector('[data-cooperation-partners]');
      if (list) list.hidden = false;
      if (partners) partners.hidden = true;
      app.querySelectorAll('[data-research-cooperation-category]').forEach((button) => {
        button.classList.remove('is-active');
      });
      setResearchDetailBreadcrumb(labels.cooperationOverview);
    };
    const showCooperationCategory = (categoryName = 'domestic') => {
      currentCooperationCategory = cooperationGroups[categoryName] ? categoryName : 'domestic';
      const list = cooperationPanel.querySelector('[data-cooperation-list]');
      const partners = cooperationPanel.querySelector('[data-cooperation-partners]');
      const grid = cooperationPanel.querySelector('[data-cooperation-grid]');
      const title = cooperationPanel.querySelector('[data-cooperation-category-title]');
      const description = cooperationPanel.querySelector('[data-cooperation-category-description]');
      if (list) list.hidden = true;
      if (partners) partners.hidden = false;
      if (title) title.textContent = labels[currentCooperationCategory];
      if (description) description.textContent = labels.categoryDescriptions[currentCooperationCategory];
      app.querySelectorAll('[data-research-cooperation-category]').forEach((button) => {
        button.classList.toggle(
          'is-active',
          button.dataset.researchCooperationCategory === currentCooperationCategory
        );
      });
      setResearchDetailBreadcrumb(labels[currentCooperationCategory]);
      if (grid) {
        grid.innerHTML = cooperationGroups[currentCooperationCategory].map(([name, description]) => `
          <article class="cooperation-card">
            <span class="cooperation-logo-placeholder">LOGO</span>
            <span class="cooperation-card-copy">
              <strong>${name}</strong>
              <small>${description}</small>
            </span>
          </article>
        `).join('');
      }
    };
    cooperationPanel.querySelectorAll('[data-cooperation-category]').forEach((button) => {
      button.addEventListener('click', () => showCooperationCategory(button.dataset.cooperationCategory));
    });
    cooperationPanel.querySelector('[data-cooperation-category-back]')?.addEventListener('click', showCooperationOverview);
    showResearchPageView = (viewName = 'directions') => {
      const targetView = sections.some(([key]) => key === viewName) ? viewName : 'directions';
      const currentLabel = sections.find(([key]) => key === targetView)?.[1] || labels.directions;
      app.querySelectorAll('[data-research-page-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.researchPageView === targetView);
      });
      const cooperationGroup = app.querySelector('[data-research-cooperation-group]');
      cooperationGroup?.classList.toggle('is-expanded', targetView === 'cooperation');
      cooperationGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', String(targetView === 'cooperation'));
      const outputGroup = app.querySelector('[data-research-output-group]');
      outputGroup?.classList.toggle('is-expanded', targetView === 'outputs');
      outputGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', String(targetView === 'outputs'));
      const directionGroup = app.querySelector('[data-research-direction-group]');
      directionGroup?.classList.toggle('is-expanded', targetView === 'directions');
      directionGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', String(targetView === 'directions'));
      app.querySelectorAll('[data-research-page-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.researchPagePanel !== targetView;
      });
      const heading = app.querySelector('[data-research-page-heading]');
      const current = app.querySelector('[data-research-page-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
      setResearchDetailBreadcrumb('');
      if (targetView === 'directions') resetResearchTopicDetail();
      if (targetView === 'cooperation') showCooperationOverview();
      if (targetView === 'outputs') showOutputCategory(currentOutputCategory);
    };
    app.querySelectorAll('[data-research-page-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.closest('[data-research-direction-group], [data-research-cooperation-group], [data-research-output-group]');
        if (group?.classList.contains('is-expanded')) {
          group.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        showPage(routeNames[button.dataset.researchPageView]);
      });
    });
    app.querySelectorAll('[data-research-cooperation-category]').forEach((button) => {
      button.addEventListener('click', () => {
        showPage('research-cooperation');
        showCooperationCategory(button.dataset.researchCooperationCategory);
      });
    });
    app.querySelectorAll('[data-research-output-category]').forEach((button) => {
      button.addEventListener('click', () => {
        showPage('achievements');
        showOutputCategory(button.dataset.researchOutputCategory);
      });
    });
    app.querySelectorAll('[data-research-direction-index]').forEach((button) => {
      button.addEventListener('click', () => {
        showPage('research');
        requestAnimationFrame(() => {
          showResearchTopicDetailPage(Number(button.dataset.researchDirectionIndex));
        });
      });
    });
    app.querySelector('[data-research-page-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-research-page-overview]')?.addEventListener('click', () => showPage('research'));
    showCooperationOverview();
    showOutputCategory('journals');
    showResearchPageView('directions');
  }

  setupResearchPage();
  let showStudentView = () => {};

  function upgradeEducationPage() {
    const pageShell = document.querySelector('#education .page-shell');
    const feature = document.getElementById('education-students');
    const recruitmentSection = document.getElementById('education-recruitment');
    const recruitmentWrap = recruitmentSection?.closest('.recruitment-content');
    if (!pageShell || !feature || !recruitmentWrap) return;

    pageShell.querySelector('.education-subnav')?.remove();
    const doctoralGroup = document.getElementById('current-doctoral');
    const mastersGroup = document.getElementById('current-masters');
    if (!doctoralGroup || !mastersGroup) return;

    const academicYears = ['2024', '2025', '2026'];
    const placeholderIcon = `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="22" r="13"></circle>
        <path d="M9 58c1.8-14 10.2-22 23-22s21.2 8 23 22H9z"></path>
      </svg>
    `;
    const existingMemberIds = new Set(
      Array.from(feature.querySelectorAll('.student-card')).map((card) => {
        const profileUrl = new URL(card.getAttribute('href'), window.location.href);
        return profileUrl.searchParams.get('id');
      })
    );
    const studentProfiles = window.TEAM_HOMEPAGE_DATA?.studentProfiles || {};
    Object.entries(studentProfiles).forEach(([memberId, profile]) => {
      if (existingMemberIds.has(memberId)) return;
      const targetGroup = profile.category === 'doctoral' ? doctoralGroup : mastersGroup;
      const list = targetGroup.querySelector('.student-grid');
      if (!list) return;
      const item = document.createElement('li');
      item.innerHTML = `
        <a class="student-card" href="students/profile.html?id=${memberId}&amp;lang=${isEnglish ? 'en' : 'zh'}">
          <span class="student-card-avatar-placeholder" aria-label="${isEnglish ? `No photo available for ${profile.enName}` : `${profile.name}暂无照片`}">${placeholderIcon}</span>
          <span class="student-card-body">
            <span class="student-card-name">${isEnglish ? profile.enName : profile.name}</span>
            <span class="student-card-meta">${isEnglish ? profile.majorEn : profile.major}</span>
            <span class="student-card-link">${isEnglish ? 'Personal Profile →' : '个人主页 →'}</span>
          </span>
        </a>
      `;
      list.append(item);
    });
    const gradeByMember = {
      'dongcan-liu': '2026',
      'yu-guo': '2026',
      'xinhang-chen': '2024',
      'jun-deng': '2024',
      'jing-li': '2024',
      'zhihuan-wei': '2024',
      'kunlong-huang': '2025',
      'yanyan-wu': '2025',
      'yongpeng-qi': '2025',
      'linhan-zhang': '2025'
    };
    const studentsByYear = {};
    const advisorOrder = { '胡杨': 0, '李洋': 1, '江肖禹': 2 };
    const yearLabel = (year) => isEnglish ? `Class of ${year}` : `${year}级`;
    const yearBranches = (category) => {
      const categoryYears = category === 'doctoral'
        ? academicYears.filter((year) => year !== '2024')
        : academicYears;
      return categoryYears.map((year) => {
      const members = studentsByYear[`${category}-${year}`] || [];
      return `
        <div class="personnel-side-group" data-student-year-group="${category}-${year}">
          <button class="personnel-side-button" type="button" data-student-year-view="${category}" data-student-year="${year}">
            <span>${yearLabel(year)}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
          </button>
          <div class="personnel-side-members">
            ${members.map((member) => `<button type="button" data-student-member="${member.id}" data-student-member-view="${category}">${member.name}</button>`).join('')}
          </div>
        </div>
      `;
      }).join('');
    };

    const memberLinks = (group, category) => {
      Array.from(group.querySelectorAll('.student-card')).forEach((card) => {
      const name = card.querySelector('.student-card-name')?.textContent.trim() || '';
      const profileUrl = new URL(card.getAttribute('href'), window.location.href);
      const memberId = profileUrl.searchParams.get('id') || name;
      const profile = studentProfiles[memberId];
      const gradeValue = profile?.year || gradeByMember[memberId] || '';
      const advisorValue = profile?.advisor || '胡杨';
      const meta = card.querySelector('.student-card-meta');
      if (profile && meta) meta.textContent = isEnglish ? profile.majorEn : profile.major;
      if (gradeValue) {
        const yearKey = `${category}-${gradeValue}`;
        studentsByYear[yearKey] ||= [];
        studentsByYear[yearKey].push({ id: memberId, name, advisor: advisorValue });
      }
      card.dataset.studentMemberCard = memberId;
      card.dataset.studentMemberView = category;
      card.dataset.studentYear = gradeValue || 'unknown';
      card.removeAttribute('href');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      const cardBody = card.querySelector('.student-card-body');
      const detailLabel = card.querySelector('.student-card-link');
      card.querySelector('.student-card-email')?.remove();
      const grade = document.createElement('span');
      const advisor = document.createElement('span');
      grade.className = 'student-card-grade';
      advisor.className = 'student-card-advisor';
      grade.textContent = gradeValue
        ? (isEnglish ? `Year: ${gradeValue}` : `年级：${gradeValue}级`)
        : (isEnglish ? 'Year: To be confirmed' : '年级：待确认');
      const advisorName = isEnglish
        ? (profile?.advisorEn || 'Yang Hu')
        : (profile?.advisor || '胡杨');
      advisor.textContent = isEnglish ? `Supervisor: ${advisorName}` : `指导教师：${advisorName}`;
      if (cardBody && detailLabel) {
        cardBody.insertBefore(grade, detailLabel);
        cardBody.insertBefore(advisor, detailLabel);
      }
      if (detailLabel) detailLabel.textContent = isEnglish ? 'View details →' : '查看详情 →';
      });
      const list = group.querySelector('.student-grid');
      if (list) {
        Array.from(list.children)
          .sort((itemA, itemB) => {
            const cardA = itemA.querySelector('[data-student-member-card]');
            const cardB = itemB.querySelector('[data-student-member-card]');
            const yearA = Number(cardA?.dataset.studentYear) || Number.POSITIVE_INFINITY;
            const yearB = Number(cardB?.dataset.studentYear) || Number.POSITIVE_INFINITY;
            if (yearA !== yearB) return yearA - yearB;
            const advisorA = studentProfiles[cardA?.dataset.studentMemberCard]?.advisor || '胡杨';
            const advisorB = studentProfiles[cardB?.dataset.studentMemberCard]?.advisor || '胡杨';
            return (advisorOrder[advisorA] ?? 99) - (advisorOrder[advisorB] ?? 99);
          })
          .forEach((item) => list.append(item));
      }
      Object.keys(studentsByYear)
        .filter((key) => key.startsWith(`${category}-`))
        .forEach((key) => {
          studentsByYear[key].sort(
            (memberA, memberB) => (advisorOrder[memberA.advisor] ?? 99) - (advisorOrder[memberB.advisor] ?? 99)
          );
        });
      return yearBranches(category);
    };

    const labels = isEnglish
      ? {
          title: 'Students',
          overview: 'Student Overview',
          doctoral: 'Doctoral Students',
          masters: 'Master’s Students',
          alumni: 'Alumni',
          alumniDoctoral: 'Doctoral Alumni',
          alumniMasters: 'Master’s Alumni',
          home: 'Home'
        }
      : {
          title: '学生培养',
          overview: '学生培养',
          doctoral: '博士研究生',
          masters: '硕士研究生',
          alumni: '往届研究生',
          alumniDoctoral: '博士研究生',
          alumniMasters: '硕士研究生',
          home: '首页'
        };

    const layout = document.createElement('div');
    layout.className = 'personnel-page-shell student-page-shell';
    layout.innerHTML = `
      <div class="personnel-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <button class="personnel-side-button personnel-side-overview is-active" type="button" data-student-view="overview">
            <span>${labels.overview}</span>
          </button>
          <div class="personnel-side-list">
            <div class="personnel-side-group student-side-group" data-student-group="doctoral">
              <button class="personnel-side-button" type="button" data-student-view="doctoral">
                <span>${labels.doctoral}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members">${memberLinks(doctoralGroup, 'doctoral')}</div>
            </div>
            <div class="personnel-side-group student-side-group" data-student-group="masters">
              <button class="personnel-side-button" type="button" data-student-view="masters">
                <span>${labels.masters}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members">${memberLinks(mastersGroup, 'masters')}</div>
            </div>
            <div class="personnel-side-group student-side-group" data-student-group="alumni">
              <button class="personnel-side-button" type="button" data-student-alumni>
                <span>${labels.alumni}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
              </button>
              <div class="personnel-side-members student-alumni-branches">
                <div class="personnel-side-group" data-student-alumni-group="alumni-doctoral">
                  <button class="personnel-side-button" type="button" data-student-view="alumni-doctoral">
                    <span>${labels.alumniDoctoral}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">${yearBranches('alumni-doctoral')}</div>
                </div>
                <div class="personnel-side-group" data-student-alumni-group="alumni-masters">
                  <button class="personnel-side-button" type="button" data-student-view="alumni-masters">
                    <span>${labels.alumniMasters}</span><span class="personnel-side-symbol" aria-hidden="true"></span>
                  </button>
                  <div class="personnel-side-members">${yearBranches('alumni-masters')}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div class="personnel-main">
          <header class="personnel-page-heading">
            <h1 data-student-heading>${labels.title}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-student-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-student-overview>${labels.title}</button>
              <i data-student-separator hidden>/</i>
              <strong data-student-current hidden></strong>
            </nav>
          </header>
          <div data-student-content></div>
          <section class="student-profile-view" data-student-detail hidden></section>
          <div class="student-empty-view" data-student-empty hidden></div>
        </div>
      </div>
    `;

    feature.querySelector('.education-section-title')?.remove();
    feature.querySelector('.student-subheading')?.remove();
    feature.classList.add('personnel-view', 'is-active');
    layout.querySelector('[data-student-content]')?.append(feature);
    pageShell.insertBefore(layout, recruitmentWrap);
    recruitmentWrap.classList.add('student-recruitment-wrap');
    recruitmentWrap.hidden = true;

    const groups = { doctoral: doctoralGroup, masters: mastersGroup };
    showStudentView = (viewName = 'overview') => {
      const validViews = ['doctoral', 'masters', 'alumni-doctoral', 'alumni-masters'];
      const targetView = validViews.includes(viewName) ? viewName : 'overview';
      const isAlumniView = targetView.startsWith('alumni-');
      const summary = feature.querySelector('.student-summary');
      if (summary) summary.hidden = targetView !== 'overview';
      feature.hidden = isAlumniView;
      feature.classList.remove('is-student-member-mode');
      const detailView = layout.querySelector('[data-student-detail]');
      if (detailView) detailView.hidden = true;
      feature.querySelectorAll('.student-grid > li').forEach((item) => {
        item.hidden = false;
      });
      Object.entries(groups).forEach(([name, group]) => {
        group.hidden = isAlumniView || (targetView !== 'overview' && name !== targetView);
      });
      const emptyView = layout.querySelector('[data-student-empty]');
      if (emptyView) emptyView.hidden = !isAlumniView;
      layout.querySelectorAll('[data-student-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.studentView === targetView);
      });
      layout.querySelectorAll('[data-student-group]').forEach((group) => {
        const expanded = group.dataset.studentGroup === targetView
          || (group.dataset.studentGroup === 'alumni' && isAlumniView);
        group.classList.toggle('is-expanded', expanded);
        group.querySelector(':scope > .personnel-side-button')
          ?.setAttribute('aria-expanded', String(expanded));
      });
      layout.querySelectorAll('[data-student-alumni-group]').forEach((group) => {
        const expanded = group.dataset.studentAlumniGroup === targetView;
        group.classList.toggle('is-expanded', expanded);
        group.querySelector(':scope > .personnel-side-button')
          ?.setAttribute('aria-expanded', String(expanded));
      });
      layout.querySelectorAll('[data-student-year-group]').forEach((group) => {
        group.classList.remove('is-expanded');
        group.querySelector(':scope > .personnel-side-button')
          ?.setAttribute('aria-expanded', 'false');
      });
      layout.querySelectorAll('[data-student-member]').forEach((button) => {
        button.classList.remove('is-active');
      });
      const heading = layout.querySelector('[data-student-heading]');
      const current = layout.querySelector('[data-student-current]');
      const separator = layout.querySelector('[data-student-separator]');
      const viewLabel = {
        overview: labels.title,
        doctoral: labels.doctoral,
        masters: labels.masters,
        'alumni-doctoral': labels.alumniDoctoral,
        'alumni-masters': labels.alumniMasters
      }[targetView] || labels.title;
      if (heading) heading.textContent = viewLabel;
      if (current) {
        current.textContent = viewLabel;
        current.hidden = targetView === 'overview';
      }
      if (separator) separator.hidden = targetView === 'overview';
    };

    const showStudentYear = (category, year) => {
      showStudentView(category);
      if (category === 'doctoral' || category === 'masters') {
        const targetGroup = groups[category];
        targetGroup?.querySelectorAll('.student-grid > li').forEach((item) => {
          const card = item.querySelector('[data-student-member-card]');
          item.hidden = card?.dataset.studentYear !== year;
        });
      }
      const yearGroup = layout.querySelector(
        `[data-student-year-group="${category}-${year}"]`
      );
      yearGroup?.classList.add('is-expanded');
      yearGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', 'true');
      const categoryLabel = {
        doctoral: labels.doctoral,
        masters: labels.masters,
        'alumni-doctoral': labels.alumniDoctoral,
        'alumni-masters': labels.alumniMasters
      }[category] || labels.title;
      const heading = layout.querySelector('[data-student-heading]');
      const current = layout.querySelector('[data-student-current]');
      const separator = layout.querySelector('[data-student-separator]');
      if (heading) heading.textContent = yearLabel(year);
      if (current) {
        current.textContent = `${categoryLabel} / ${yearLabel(year)}`;
        current.hidden = false;
      }
      if (separator) separator.hidden = false;
    };

    const showStudentMember = (memberId, category) => {
      showStudentView(category);
      const selectedCard = feature.querySelector(`[data-student-member-card="${memberId}"]`);
      const profile = studentProfiles[memberId];
      const memberYear = selectedCard?.dataset.studentYear || profile?.year || '';
      const memberName = selectedCard?.querySelector('.student-card-name')?.textContent.trim() || '';
      const photo = selectedCard?.querySelector('img');
      const major = selectedCard?.querySelector('.student-card-meta')?.textContent.trim() || '';
      const grade = selectedCard?.querySelector('.student-card-grade')?.textContent.trim() || '';
      const advisor = selectedCard?.querySelector('.student-card-advisor')?.textContent.trim() || '';
      const detailView = layout.querySelector('[data-student-detail]');
      const sections = isEnglish
        ? [
            ['Personal Profile', profile?.bioEn],
            ['Research Interests', profile?.researchEn],
            ['Academic Achievements', profile?.achievementsEn]
          ]
        : [
            ['个人简介', profile?.bio],
            ['研究方向', profile?.research],
            ['学术成果', profile?.achievements]
          ];
      const emptyText = isEnglish ? 'Information to be added.' : '信息待补充。';
      const photoMarkup = photo
        ? `<img class="student-profile-photo" src="${photo.getAttribute('src') || ''}" alt="${photo.getAttribute('alt') || memberName}">`
        : `<div class="student-profile-photo-placeholder" aria-label="${isEnglish ? 'No photo available' : '暂无照片'}">${placeholderIcon}</div>`;
      feature.hidden = true;
      if (detailView) {
        detailView.innerHTML = `
          <div class="student-profile-intro">
            ${photoMarkup}
            <div>
              <h2 class="student-profile-name">${memberName}</h2>
              <p class="student-profile-meta">${major}</p>
              <p class="student-profile-meta">${grade}</p>
              <p class="student-profile-meta">${advisor}</p>
            </div>
          </div>
          <div class="student-profile-sections">
            ${sections.map(([title, content]) => `
              <section class="student-profile-section">
                <h3>${title}</h3>
                <p>${content || emptyText}</p>
              </section>
            `).join('')}
          </div>
        `;
        detailView.hidden = false;
      }
      const yearGroup = layout.querySelector(
        `[data-student-year-group="${category}-${memberYear}"]`
      );
      yearGroup?.classList.add('is-expanded');
      yearGroup?.querySelector(':scope > .personnel-side-button')
        ?.setAttribute('aria-expanded', 'true');
      layout.querySelectorAll('[data-student-member]').forEach((button) => {
        button.classList.toggle(
          'is-active',
          button.dataset.studentMember === memberId
            && button.dataset.studentMemberView === category
        );
      });
      const heading = layout.querySelector('[data-student-heading]');
      const current = layout.querySelector('[data-student-current]');
      const separator = layout.querySelector('[data-student-separator]');
      const categoryLabel = labels[category] || labels.title;
      if (heading) heading.textContent = memberName || categoryLabel;
      if (current) {
        current.textContent = `${categoryLabel} / ${memberName}`;
        current.hidden = false;
      }
      if (separator) separator.hidden = false;
    };

    layout.querySelectorAll('[data-student-view]').forEach((button) => {
      const routes = {
        doctoral: 'doctoral-students',
        masters: 'masters-students',
        'alumni-doctoral': 'alumni-doctoral',
        'alumni-masters': 'alumni-masters',
        overview: 'education'
      };
      button.addEventListener('click', () => {
        const group = button.closest('[data-student-group]');
        const alumniGroup = button.closest('[data-student-alumni-group]');
        if (alumniGroup?.classList.contains('is-expanded')) {
          alumniGroup.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        const isCategoryButton = group?.dataset.studentGroup === button.dataset.studentView;
        if (isCategoryButton && group.classList.contains('is-expanded')) {
          group.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        showPage(routes[button.dataset.studentView] || 'education');
      });
    });
    layout.querySelectorAll('[data-student-member]').forEach((button) => {
      button.addEventListener('click', () => {
        showStudentMember(button.dataset.studentMember, button.dataset.studentMemberView);
      });
    });
    layout.querySelectorAll('[data-student-year-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.closest('[data-student-year-group]');
        if (group?.classList.contains('is-expanded')) {
          group.classList.remove('is-expanded');
          button.setAttribute('aria-expanded', 'false');
          return;
        }
        showStudentYear(button.dataset.studentYearView, button.dataset.studentYear);
      });
    });
    feature.querySelectorAll('[data-student-member-card]').forEach((card) => {
      const openMember = () => showStudentMember(
        card.dataset.studentMemberCard,
        card.dataset.studentMemberView
      );
      card.addEventListener('click', openMember);
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        openMember();
      });
    });
    layout.querySelector('[data-student-alumni]')?.addEventListener('click', (event) => {
      const group = event.currentTarget.closest('[data-student-group]');
      const expanded = group?.classList.toggle('is-expanded');
      event.currentTarget.setAttribute('aria-expanded', String(Boolean(expanded)));
      if (!expanded) {
        group?.querySelectorAll('[data-student-alumni-group]').forEach((branch) => {
          branch.classList.remove('is-expanded');
          branch.querySelector(':scope > .personnel-side-button')
            ?.setAttribute('aria-expanded', 'false');
        });
      }
    });
    layout.querySelector('[data-student-home]')?.addEventListener('click', () => showPage('home'));
    layout.querySelector('[data-student-overview]')?.addEventListener('click', () => showPage('education'));
  }

  upgradeEducationPage();
  let resetCourseView = () => {};

  function setupCourses() {
    const app = document.querySelector('[data-course-app]');
    if (!app) return;
    const courses = [
      {
        id: 'ai-foundation-models',
        title: isEnglish ? 'Artificial Intelligence and Foundation Models' : '人工智能与大模型',
        type: isEnglish ? 'Graduate Course' : '研究生课程',
        category: 'graduate'
      },
      {
        id: 'military-theory',
        title: isEnglish ? 'Military Theory' : '军事理论',
        type: isEnglish ? 'Undergraduate Course' : '本科生课程',
        category: 'undergraduate'
      },
      {
        id: 'probability-statistics',
        title: 'Probability & Statistics',
        type: isEnglish ? 'International Graduate Course' : '国际留学研究生课程',
        category: 'graduate',
        description: isEnglish
          ? 'This course develops a practical foundation in probability, statistical reasoning, and data-based inference. It emphasizes connecting core concepts with scientific research and engineering decisions, preparing students for later work in modeling, intelligent systems, and quantitative analysis.'
          : '本课程围绕概率基础、统计推断与数据分析方法展开，强调将基本理论与科研及工程问题相结合，帮助学生建立从随机现象建模到数据驱动决策的完整思维框架，并为后续的智能系统、工程建模与定量研究打下基础。'
      },
      {
        id: 'aviation-phm',
        title: isEnglish ? 'Design and Simulation of Aviation System Health Management' : '航空系统健康管理设计与仿真',
        type: isEnglish ? 'Graduate Course' : '研究生课程',
        category: 'graduate'
      },
      {
        id: 'fleet-maintenance-simulation',
        title: isEnglish ? 'Fleet Maintenance and Simulation Experiments' : '机群维修与仿真实验',
        type: isEnglish ? 'Graduate Course' : '研究生课程',
        category: 'graduate'
      }
    ];
    const labels = isEnglish
      ? {
          pageTitle: 'Teaching',
          home: 'Home',
          undergraduate: 'Undergraduate Courses',
          graduate: 'Graduate Courses',
          tag: 'COURSE',
          instructor: 'Instructor',
          teacher: 'Yang Hu',
          type: 'Course Type',
          view: 'View details',
          back: '← Back to courses',
          pending: 'Detailed course information will be added later.',
          facts: [
            ['Instructor', 'Yang Hu'],
            ['Academic Year', '2025–2026'],
            ['Semester', 'Fall'],
            ['Course Number', 'D253011004'],
            ['Credits', '3.0'],
            ['Contact Hours', '48'],
            ['Course Type', 'International Graduate Course'],
            ['Enrollment', '92 students'],
            ['Language', 'English / International Graduate Students']
          ],
          reference: 'Textbook and Reference',
          book: 'Modern Mathematical Statistics with Applications, Jay L. Devore, Kenneth N. Berk, and Matthew A. Carlton, 3rd edition.',
          official: 'View the Beihang course page'
        }
      : {
          pageTitle: '课程教学',
          home: '首页',
          undergraduate: '本科生课程',
          graduate: '研究生课程',
          tag: '课程',
          instructor: '授课教师',
          teacher: '胡杨',
          type: '课程类型',
          view: '查看课程详情',
          back: '← 返回课程列表',
          pending: '课程详细信息待补充。',
          facts: [
            ['授课教师', '胡杨'],
            ['开课学年', '2025–2026'],
            ['开课学期', '秋学期'],
            ['课程号', 'D253011004'],
            ['学分', '3.0'],
            ['课时', '48'],
            ['课程类型', '国际留学研究生课程'],
            ['选课人数', '92人'],
            ['授课对象', '国际留学研究生']
          ],
          reference: '教材与参考书',
          book: 'Modern Mathematical Statistics with Applications，Jay L. Devore、Kenneth N. Berk、Matthew A. Carlton，第3版。',
          official: '查看北航课程主页'
        };

    app.innerHTML = `
      <div class="course-layout">
        <aside class="personnel-sidebar" aria-label="${labels.pageTitle}">
          <div class="course-side-list">
            <button class="personnel-side-button is-active" type="button" data-course-category="undergraduate">${labels.undergraduate}</button>
            <button class="personnel-side-button" type="button" data-course-category="graduate">${labels.graduate}</button>
          </div>
        </aside>
        <div class="course-main">
          <header class="personnel-page-heading course-page-heading">
            <h1 data-course-heading>${labels.undergraduate}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-course-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-course-overview>${labels.pageTitle}</button>
              <i>/</i>
              <strong data-course-current>${labels.undergraduate}</strong>
            </nav>
          </header>
          <div class="course-grid" data-course-grid>
            ${courses.map((course) => `
              <button class="course-card" type="button" data-course-id="${course.id}" data-course-group="${course.category}">
                <span class="course-card-tag">${labels.tag}</span>
                <h2>${course.title}</h2>
                <span class="course-card-meta">
                  <span>${labels.instructor}：${labels.teacher}</span>
                  <span>${labels.type}：${course.type}</span>
                </span>
              </button>
            `).join('')}
          </div>
          <article class="course-detail" data-course-detail hidden></article>
        </div>
      </div>
    `;

    const grid = app.querySelector('[data-course-grid]');
    const detail = app.querySelector('[data-course-detail]');
    let currentCategory = 'undergraduate';
    const showCourseCategory = (category) => {
      currentCategory = category === 'graduate' ? 'graduate' : 'undergraduate';
      app.querySelectorAll('[data-course-category]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.courseCategory === currentCategory);
      });
      app.querySelectorAll('[data-course-group]').forEach((card) => {
        card.hidden = card.dataset.courseGroup !== currentCategory;
      });
      const heading = app.querySelector('[data-course-heading]');
      if (heading) heading.textContent = labels[currentCategory];
      const current = app.querySelector('[data-course-current]');
      if (current) current.textContent = labels[currentCategory];
      if (grid) grid.hidden = false;
      if (detail) detail.hidden = true;
      app.querySelector('.course-page-heading')?.removeAttribute('hidden');
    };
    resetCourseView = () => {
      showCourseCategory(currentCategory);
    };
    const showCourse = (course) => {
      if (!grid || !detail) return;
      grid.hidden = true;
      app.querySelector('.course-page-heading')?.setAttribute('hidden', '');
      const isProbability = course.id === 'probability-statistics';
      detail.innerHTML = `
        <button class="course-back" type="button" data-course-back>${labels.back}</button>
        <section class="course-detail-hero">
          <h2>${course.title}</h2>
          <p>${course.description || labels.pending}</p>
        </section>
        ${isProbability ? `
          <dl class="course-facts">
            ${labels.facts.map(([term, value]) => `<div class="course-fact"><dt>${term}</dt><dd>${value}</dd></div>`).join('')}
          </dl>
          <section class="course-reference">
            <h3>${labels.reference}</h3>
            <p>${labels.book}</p>
            <p><a href="https://shi.buaa.edu.cn/huyang/zh_CN/skxx/214379/content/4323.htm#skxx" target="_blank" rel="noopener">${labels.official} →</a></p>
          </section>
        ` : ''}
      `;
      detail.hidden = false;
      detail.querySelector('[data-course-back]')?.addEventListener('click', resetCourseView);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    app.querySelectorAll('[data-course-id]').forEach((card) => {
      card.addEventListener('click', () => {
        const course = courses.find((item) => item.id === card.dataset.courseId);
        if (course) showCourse(course);
      });
    });
    app.querySelectorAll('[data-course-category]').forEach((button) => {
      button.addEventListener('click', () => showCourseCategory(button.dataset.courseCategory));
    });
    app.querySelector('[data-course-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-course-overview]')?.addEventListener('click', () => {
      showCourseCategory('undergraduate');
    });
    showCourseCategory('undergraduate');
  }

  setupCourses();
  let resetCultureView = () => {};

  function setupCulturePage() {
    const app = document.querySelector('[data-culture-app]');
    if (!app) return;
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'Culture',
          party: 'Party-Building Activities',
          academic: 'Academic Culture',
          team: 'Team Building'
        }
      : {
          home: '首页',
          title: '文化建设',
          party: '党建活动',
          academic: '学术文化',
          team: '团队建设'
        };
    const sections = [
      ['party', labels.party],
      ['academic', labels.academic],
      ['team', labels.team]
    ];
    app.innerHTML = `
      <div class="culture-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <div class="course-side-list">
            ${sections.map(([key, label], index) => `
              <button class="personnel-side-button${index === 0 ? ' is-active' : ''}" type="button" data-culture-section="${key}">${label}</button>
            `).join('')}
          </div>
        </aside>
        <div class="culture-main">
          <header class="personnel-page-heading">
            <h1 data-culture-heading>${labels.party}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-culture-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-culture-overview>${labels.title}</button>
              <i>/</i>
              <strong data-culture-current>${labels.party}</strong>
            </nav>
          </header>
          <section class="culture-empty-view" aria-live="polite"></section>
        </div>
      </div>
    `;

    let currentSection = 'party';
    const showCultureSection = (sectionName) => {
      currentSection = sections.some(([key]) => key === sectionName) ? sectionName : 'party';
      const currentLabel = sections.find(([key]) => key === currentSection)?.[1] || labels.party;
      app.querySelectorAll('[data-culture-section]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.cultureSection === currentSection);
      });
      const heading = app.querySelector('[data-culture-heading]');
      const current = app.querySelector('[data-culture-current]');
      if (heading) heading.textContent = currentLabel;
      if (current) current.textContent = currentLabel;
    };
    resetCultureView = () => showCultureSection(currentSection);
    app.querySelectorAll('[data-culture-section]').forEach((button) => {
      button.addEventListener('click', () => showCultureSection(button.dataset.cultureSection));
    });
    app.querySelector('[data-culture-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-culture-overview]')?.addEventListener('click', () => showCultureSection('party'));
  }

  setupCulturePage();
  let showRecruitmentView = () => {};

  function setupRecruitmentPage() {
    const app = document.querySelector('[data-recruitment-app]');
    const source = document.getElementById('education-recruitment');
    if (!app || !source) return;
    const headings = Array.from(source.querySelectorAll(':scope > h2:not(.education-section-title)'));
    const sectionNodes = (index, excludeClosing = false) => {
      const nodes = [];
      let node = headings[index];
      while (node) {
        if (
          node !== headings[index]
          && node.matches?.('h2:not(.education-section-title)')
        ) break;
        if (
          !excludeClosing
          || !node.matches?.('.recruitment-conclusion, .recruitment-invitation')
        ) nodes.push(node);
        node = node.nextElementSibling;
      }
      return nodes;
    };
    const sectionHtml = (index, excludeClosing = false) => (
      sectionNodes(index, excludeClosing).map((node) => node.outerHTML).join('')
    );
    const firstParagraph = (index) => (
      sectionNodes(index).find((node) => node.tagName === 'P')?.outerHTML || ''
    );
    const closingHtml = [
      source.querySelector('.recruitment-conclusion')?.outerHTML || '',
      source.querySelector('.recruitment-invitation')?.outerHTML || ''
    ].join('');
    const talentNodes = sectionNodes(5, true);
    const applicationIntroNode = talentNodes.find((node) => node.tagName === 'P');
    const applicationIntroHtml = applicationIntroNode?.outerHTML || '';
    const talentHtml = talentNodes
      .filter((node) => node !== applicationIntroNode && node !== headings[5])
      .map((node) => node.outerHTML)
      .join('');
    const labels = isEnglish
      ? {
          home: 'Home',
          title: 'Recruitment',
          overview: 'Recruitment Overview',
          admissions: 'Admissions',
          talent: 'Talent Recruitment',
          researchLink: 'See Research Directions for details',
          programs: 'Eligible Degree Programs',
          programItems: [
            ['Academic Doctoral Supervisor', 'Safety Science and Engineering (0837; Reliability Systems Engineering); Control Science and Engineering (0811; Industrial Internet and Knowledge-Driven Automation)'],
            ['Professional Doctoral Supervisor', 'Electronic Information (0854); Mechanical Engineering (0855)'],
            ['Academic Master’s Supervisor', 'Control Science and Engineering (0811); Low-Altitude Intelligent Transportation Engineering (9904; Low-Altitude Safety Assurance Technology)'],
            ['Professional Master’s Supervisor', 'Electronic Information (0854); Mechanical Engineering (0855); Transportation (0861)']
          ],
          requirements: [
            'Applicants from computer science, artificial intelligence, automation, control, mechanical engineering, aerospace, systems engineering, applied mathematics, and related fields are welcome.',
            'Applicants should have a solid mathematical foundation and good academic performance.',
            'Programming, deep-learning, research-project, or academic-competition experience is preferred.',
            'Applicants should be enthusiastic about research and demonstrate independent learning, teamwork, and communication skills.',
            'Applicants should be able to read academic literature and communicate research findings in English.'
          ],
          requirementIntro: 'To ensure the quality of postgraduate training and the smooth progress of research projects, the laboratory has the following basic requirements for applicants:',
          requirementLink: 'See the recruitment introduction for details'
        }
      : {
          home: '首页',
          title: '英才招聘',
          overview: '英才招聘',
          admissions: '招生信息',
          talent: '人才招聘',
          researchLink: '具体研究内容详见科研方向',
          programs: '招生专业',
          programItems: [
            ['博士生导师（学术型）', '安全科学与工程（0837，方向：可靠性系统工程）、控制科学与工程（0811，方向：工业互联网与知识驱动自动化）'],
            ['博士生导师（专业型）', '电子信息（0854）、机械（0855）'],
            ['硕士生导师（学术型）', '控制科学与工程（0811）、低空智能运载工程（9904，方向：低空安全保障技术）'],
            ['硕士生导师（专业型）', '电子信息（0854）、机械（0855）、交通运输（0861）']
          ],
          requirements: [
            '欢迎计算机、人工智能、自动化、控制、机械、航空航天、系统工程、应用数学等相关专业学生报考。',
            '具备较扎实的数学基础和良好的专业课成绩。',
            '具备编程、深度学习、科研项目或学科竞赛经历者优先。',
            '热爱科研，具有自主学习、团队协作和沟通表达能力。',
            '具备英文文献阅读与学术交流能力。'
          ],
          requirementIntro: '为确保研究生培养质量与科研项目顺利推进，实验室对学生提出以下基本要求：',
          requirementLink: '详见招生简介'
        };
    const programsHtml = `
      <section class="recruitment-admission-programs">
      <h2>${labels.programs}</h2>
      <dl class="recruitment-programs">
        ${labels.programItems.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('')}
      </dl>
      </section>
    `;
    const requirementsHtml = `
      <section class="recruitment-admission-section">
        <p class="recruitment-requirement-intro">${labels.requirementIntro}</p>
        <ul class="recruitment-requirements">
          ${labels.requirements.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <p class="recruitment-requirement-link">
          <a href="https://shi.buaa.edu.cn/huyang/zh_CN/zdylm/227783/list/index.htm" target="_blank" rel="noopener">${labels.requirementLink}</a>
        </p>
      </section>
    `;
    const views = {
      overview: `
        ${firstParagraph(0)}
        ${firstParagraph(1)}
        <nav class="recruitment-entry-links" aria-label="${labels.title}">
          <button class="recruitment-research-link" type="button" data-recruitment-research>${labels.researchLink} →</button>
          <button type="button" data-recruitment-entry="admissions">${labels.admissions} →</button>
          <button type="button" data-recruitment-entry="talent">${labels.talent} →</button>
        </nav>
        <div class="recruitment-closing">${applicationIntroHtml}${closingHtml}</div>
      `,
      admissions: `${programsHtml}${requirementsHtml}`,
      talent: talentHtml
    };

    app.innerHTML = `
      <div class="recruitment-layout">
        <aside class="personnel-sidebar" aria-label="${labels.title}">
          <button class="personnel-side-button personnel-side-overview is-active" type="button" data-recruitment-view="overview">
            <span>${labels.overview}</span>
          </button>
          <div class="personnel-side-list">
            <button class="personnel-side-button" type="button" data-recruitment-view="admissions">${labels.admissions}</button>
            <button class="personnel-side-button" type="button" data-recruitment-view="talent">${labels.talent}</button>
          </div>
        </aside>
        <div class="recruitment-main">
          <header class="personnel-page-heading">
            <h1 data-recruitment-heading>${labels.overview}</h1>
            <nav class="personnel-breadcrumb" aria-label="Breadcrumb">
              <button type="button" data-recruitment-home>${labels.home}</button>
              <span>/</span>
              <button type="button" data-recruitment-overview>${labels.title}</button>
              <i data-recruitment-separator hidden>/</i>
              <strong data-recruitment-current hidden></strong>
            </nav>
          </header>
          <article class="recruitment-page-content" data-recruitment-content></article>
        </div>
      </div>
    `;

    const routeNames = {
      overview: 'recruitment',
      admissions: 'recruitment-admissions',
      talent: 'recruitment-talent'
    };
    showRecruitmentView = (viewName = 'overview') => {
      const targetView = views[viewName] ? viewName : 'overview';
      const title = labels[targetView];
      const content = app.querySelector('[data-recruitment-content]');
      const heading = app.querySelector('[data-recruitment-heading]');
      const current = app.querySelector('[data-recruitment-current]');
      const separator = app.querySelector('[data-recruitment-separator]');
      if (content) content.innerHTML = views[targetView];
      if (heading) heading.textContent = title;
      if (current) {
        current.textContent = title;
        current.hidden = targetView === 'overview';
      }
      if (separator) separator.hidden = targetView === 'overview';
      app.querySelectorAll('[data-recruitment-view]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.recruitmentView === targetView);
      });
      content?.querySelector('[data-recruitment-research]')?.addEventListener('click', () => showPage('research'));
      content?.querySelectorAll('[data-recruitment-entry]').forEach((button) => {
        button.addEventListener('click', () => showPage(routeNames[button.dataset.recruitmentEntry]));
      });
    };
    app.querySelectorAll('[data-recruitment-view]').forEach((button) => {
      button.addEventListener('click', () => showPage(routeNames[button.dataset.recruitmentView]));
    });
    app.querySelector('[data-recruitment-home]')?.addEventListener('click', () => showPage('home'));
    app.querySelector('[data-recruitment-overview]')?.addEventListener('click', () => showPage('recruitment'));
    showRecruitmentView('overview');
  }

  setupRecruitmentPage();
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  const siteHeader = document.querySelector('.site-header');
  const brandBanner = document.querySelector('.brand-banner');
  let navDockPoint = 0;
  let navScrollFrame = 0;

  const measureNavDockPoint = () => {
    navDockPoint = (siteHeader?.offsetTop || 0) + (brandBanner?.offsetHeight || 0);
  };
  const updateCompactNavigation = () => {
    navScrollFrame = 0;
    siteHeader?.classList.toggle('is-nav-compact', window.scrollY >= navDockPoint);
  };
  const requestCompactNavigationUpdate = () => {
    if (navScrollFrame) return;
    navScrollFrame = window.requestAnimationFrame(updateCompactNavigation);
  };

  measureNavDockPoint();
  updateCompactNavigation();
  window.addEventListener('scroll', requestCompactNavigationUpdate, { passive: true });
  window.addEventListener('resize', () => {
    measureNavDockPoint();
    requestCompactNavigationUpdate();
  });

  const links = Array.from(document.querySelectorAll('[data-page-link]'));
  const panels = Array.from(document.querySelectorAll('[data-page]'));
  const submenuItems = Array.from(document.querySelectorAll('.nav-item'));
  const nestedSubmenuGroups = Array.from(document.querySelectorAll('.nav-submenu-group'));
  const revealItems = Array.from(
    document.querySelectorAll([
      '.hero-content > *',
      '.home-news-heading > *',
      '.news-item > *',
      '.lab-gallery-heading > *',
      '.team-intro .intro-copy > *',
      '.lab-introduction > *',
      '.personnel-section-title',
      '.personnel-card',
      '.research-intro',
      '.research-topic-list > .research-topic-card',
      '.research-outro',
      '.achievement-publications > .publication-block',
      '.education-feature > *',
      '.recruitment-section > *',
      '.contact-title',
      '.contact-list > .contact-item',
      '.contact-recruitment > *'
    ].join(', '))
  );

  revealItems.forEach((item, index) => {
    item.classList.add('reveal-on-scroll');
    item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.addEventListener('publications:rendered', () => {
    const items = Array.from(document.querySelectorAll('.achievement-publications .publication-list > li'));
    items.forEach((item, index) => {
      item.classList.add('reveal-on-scroll');
      item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach((item) => observer.observe(item));
  });

  function showPersonnelView(viewName) {
    const targetView = ['overview', 'faculty', 'postdocs'].includes(viewName)
      ? viewName
      : 'overview';
    const viewLabels = isEnglish
      ? {
          overview: 'Faculty',
          faculty: 'Faculty',
          postdocs: 'Postdoctoral Researchers'
        }
      : {
          overview: '师资队伍',
          faculty: '教师团队',
          postdocs: '博士后研究人员'
        };
    document.querySelectorAll('[data-personnel-panel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.personnelPanel === targetView);
    });
    document.querySelectorAll('[data-personnel-view]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.personnelView === targetView);
    });
    document.querySelector('.lab-personnel')?.classList.remove('is-member-mode');
    document.querySelectorAll('#faculty .personnel-card').forEach((card) => {
      card.classList.remove('is-member-active');
    });
    document.querySelectorAll('[data-personnel-overview-group]').forEach((section) => {
      section.hidden = false;
    });
    document.querySelectorAll('[data-personnel-group]').forEach((group) => {
      group.classList.toggle(
        'is-expanded',
        targetView !== 'overview' && group.dataset.personnelGroup === targetView
      );
    });
    const heading = document.querySelector('[data-personnel-heading]');
    const current = document.querySelector('[data-personnel-current]');
    const separator = document.querySelector('[data-personnel-detail-separator]');
    if (heading) heading.textContent = viewLabels[targetView];
    if (current) {
      current.textContent = viewLabels[targetView];
      current.hidden = targetView === 'overview';
    }
    if (separator) separator.hidden = targetView === 'overview';
  }

  function showPersonnelCategory(category) {
    const targetCategory = category === 'postdocs' ? 'postdocs' : 'faculty';
    const categoryLabel = isEnglish
      ? (targetCategory === 'faculty' ? 'Faculty' : 'Postdoctoral Researchers')
      : (targetCategory === 'faculty' ? '教师团队' : '博士后研究人员');
    showPersonnelView('overview');
    document.querySelectorAll('[data-personnel-overview-group]').forEach((section) => {
      section.hidden = section.dataset.personnelOverviewGroup !== targetCategory;
    });
    document.querySelectorAll('[data-personnel-view]').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.personnelView === targetCategory);
    });
    document.querySelectorAll('[data-personnel-group]').forEach((group) => {
      group.classList.toggle('is-expanded', group.dataset.personnelGroup === targetCategory);
    });
    const heading = document.querySelector('[data-personnel-heading]');
    const current = document.querySelector('[data-personnel-current]');
    const separator = document.querySelector('[data-personnel-detail-separator]');
    if (heading) heading.textContent = categoryLabel;
    if (current) {
      current.textContent = categoryLabel;
      current.hidden = false;
    }
    if (separator) separator.hidden = false;
  }

  function showPersonnelMember(memberId, viewName) {
    const targetView = viewName === 'postdocs' ? 'postdocs' : 'faculty';
    showPersonnelView(targetView);
    const labPersonnel = document.querySelector('.lab-personnel');
    const memberCard = document.getElementById(memberId);
    const memberButton = document.querySelector(`[data-personnel-member="${memberId}"]`);
    const memberName = memberButton?.textContent.trim() || '';
    const categoryLabel = isEnglish
      ? (targetView === 'faculty' ? 'Faculty' : 'Postdoctoral Researchers')
      : (targetView === 'faculty' ? '教师团队' : '博士后研究人员');
    labPersonnel?.classList.add('is-member-mode');
    memberCard?.classList.add('is-member-active');
    const heading = document.querySelector('[data-personnel-heading]');
    const current = document.querySelector('[data-personnel-current]');
    if (heading) heading.textContent = memberName || categoryLabel;
    if (current) {
      current.textContent = `${categoryLabel} / ${memberName}`;
      current.hidden = false;
    }
  }

  const pageRoutes = {
    news: {
      page: 'news',
      newsView: 'conferences'
    },
    'news-conferences': {
      page: 'news',
      newsView: 'conferences'
    },
    'news-papers': {
      page: 'news',
      newsView: 'papers'
    },
    'news-activities': {
      page: 'news',
      newsView: 'activities'
    },
    'news-notices': {
      page: 'news',
      newsView: 'notices'
    },
    team: {
      page: 'team',
      centerView: 'intro'
    },
    'center-philosophy': {
      page: 'team',
      centerView: 'philosophy'
    },
    organization: {
      page: 'team',
      centerView: 'organization'
    },
    research: {
      page: 'research',
      researchView: 'directions'
    },
    'research-projects': {
      page: 'research',
      researchView: 'projects'
    },
    achievements: {
      page: 'research',
      researchView: 'outputs'
    },
    'research-cooperation': {
      page: 'research',
      researchView: 'cooperation'
    },
    recruitment: {
      page: 'talent-recruitment',
      recruitmentView: 'overview'
    },
    'recruitment-admissions': {
      page: 'talent-recruitment',
      recruitmentView: 'admissions'
    },
    'recruitment-talent': {
      page: 'talent-recruitment',
      recruitmentView: 'talent'
    },
    'faculty-teachers': {
      page: 'faculty',
      category: 'faculty'
    },
    'faculty-postdocs': {
      page: 'faculty',
      category: 'postdocs'
    },
    'faculty-overview': {
      page: 'faculty',
      view: 'overview'
    },
    'doctoral-students': {
      page: 'education',
      studentView: 'doctoral'
    },
    'masters-students': {
      page: 'education',
      studentView: 'masters'
    },
    'alumni-doctoral': {
      page: 'education',
      studentView: 'alumni-doctoral'
    },
    'alumni-masters': {
      page: 'education',
      studentView: 'alumni-masters'
    },
    'person-yang-hu': {
      page: 'faculty',
      view: 'faculty',
      member: 'person-yang-hu'
    },
    'person-yang-li': {
      page: 'faculty',
      view: 'faculty',
      member: 'person-yang-li'
    },
    'person-xiaoyu-jiang': {
      page: 'faculty',
      view: 'faculty',
      member: 'person-xiaoyu-jiang'
    },
    'person-danyang-han': {
      page: 'faculty',
      view: 'postdocs',
      member: 'person-danyang-han'
    },
    'person-di-su': {
      page: 'faculty',
      view: 'postdocs',
      member: 'person-di-su'
    },
    'person-jiayu-wang': {
      page: 'faculty',
      view: 'postdocs',
      member: 'person-jiayu-wang'
    },
    'person-zhenqin-yin': {
      page: 'faculty',
      view: 'postdocs',
      member: 'person-zhenqin-yin'
    }
  };

  function showPage(routeName, options = {}) {
    const route = pageRoutes[routeName] || { page: routeName };
    const targetName = panels.some((panel) => panel.dataset.page === route.page)
      ? route.page
      : 'home';
    const activeRoute = targetName === 'home' && route.page !== 'home' ? 'home' : routeName;

    panels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.page === targetName);
    });
    updateResearchCollapseButton();

    links.forEach((link) => {
      const linkRoute = link.dataset.route || link.dataset.pageLink;
      link.classList.toggle('is-active', linkRoute === activeRoute);
    });
    submenuItems.forEach((item) => {
      const parentRoute = item.querySelector('.nav-parent')?.dataset.parentRoute;
      item.classList.toggle(
        'is-active',
        Boolean(item.querySelector('.is-active'))
          || parentRoute === activeRoute
          || (
            targetName === 'faculty'
            && Boolean(item.querySelector('[data-page-link="faculty"]'))
          )
      );
      item.classList.remove('is-open');
      item.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
    });
    nestedSubmenuGroups.forEach((group) => {
      group.classList.toggle('is-active', Boolean(group.querySelector('.is-active')));
      group.classList.remove('is-open');
      group.querySelector('.nav-submenu-parent')?.setAttribute('aria-expanded', 'false');
    });

    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');

    if (!options.skipHash && window.location.hash !== `#${activeRoute}`) {
      history.pushState(null, '', `#${activeRoute}`);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    if (targetName === 'education') {
      const isRecruitment = route.section === 'education-recruitment';
      const studentLayout = document.querySelector('.student-page-shell');
      const recruitmentWrap = document.querySelector('.student-recruitment-wrap');
      if (studentLayout) studentLayout.hidden = isRecruitment;
      if (recruitmentWrap) recruitmentWrap.hidden = !isRecruitment;
      if (!isRecruitment) showStudentView(route.studentView || 'overview');
    }
    if (targetName === 'teaching') resetCourseView();
    if (targetName === 'culture') resetCultureView();
    if (route.newsView) showNewsView(route.newsView);
    if (route.recruitmentView) showRecruitmentView(route.recruitmentView);
    if (route.researchView) showResearchPageView(route.researchView);
    if (route.centerView) showCenterPageView(route.centerView);
    if (route.view) showPersonnelView(route.view);
    if (route.category) showPersonnelCategory(route.category);
    if (route.member) showPersonnelMember(route.member, route.view);
    if (route.section) {
      requestAnimationFrame(() => {
        document.getElementById(route.section)?.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      });
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  submenuItems.forEach((item) => {
    const button = item.querySelector('.nav-parent');
    button?.addEventListener('click', (event) => {
      event.stopPropagation();
      const shouldOpen = !item.classList.contains('is-open');
      if (button.dataset.parentRoute) showPage(button.dataset.parentRoute);
      submenuItems.forEach((otherItem) => {
        const isCurrent = otherItem === item && shouldOpen;
        otherItem.classList.toggle('is-open', isCurrent);
        otherItem.querySelector('.nav-parent')?.setAttribute('aria-expanded', String(isCurrent));
      });
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('is-open', 'is-hover-suppressed');
      button?.setAttribute('aria-expanded', 'false');
      if (item.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });
  });

  const personnelRouteNames = {
    overview: 'faculty-overview',
    faculty: 'faculty-teachers',
    postdocs: 'faculty-postdocs'
  };
  document.querySelectorAll('[data-personnel-view]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('[data-personnel-group]');
      if (group?.classList.contains('is-expanded')) {
        group.classList.remove('is-expanded');
        button.setAttribute('aria-expanded', 'false');
        return;
      }
      showPage(personnelRouteNames[button.dataset.personnelView] || 'faculty-overview');
      if (group) button.setAttribute('aria-expanded', 'true');
    });
  });

  document.querySelectorAll('[data-personnel-member]').forEach((button) => {
    button.addEventListener('click', () => {
      showPage(button.dataset.personnelMember);
    });
  });

  document.querySelectorAll('[data-personnel-overview-member]').forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const openMember = () => showPage(card.dataset.personnelOverviewMember);
    card.addEventListener('click', openMember);
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openMember();
    });
  });

  document.querySelector('[data-personnel-home]')?.addEventListener('click', () => {
    showPage('home');
  });
  document.querySelector('[data-personnel-overview]')?.addEventListener('click', () => {
    showPage('faculty-overview');
  });
  document.querySelector('[data-contact-home]')?.addEventListener('click', () => {
    showPage('home');
  });

  nestedSubmenuGroups.forEach((group) => {
    const button = group.querySelector('.nav-submenu-parent');
    button?.addEventListener('click', (event) => {
      event.stopPropagation();
      const shouldOpen = !group.classList.contains('is-open');
      nestedSubmenuGroups.forEach((otherGroup) => {
        const isCurrent = otherGroup === group && shouldOpen;
        otherGroup.classList.toggle('is-open', isCurrent);
        otherGroup.querySelector('.nav-submenu-parent')?.setAttribute('aria-expanded', String(isCurrent));
      });
    });
  });

  document.addEventListener('click', () => {
    submenuItems.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
    });
    nestedSubmenuGroups.forEach((group) => {
      group.classList.remove('is-open');
      group.querySelector('.nav-submenu-parent')?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    submenuItems.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
    });
    nestedSubmenuGroups.forEach((group) => {
      group.classList.remove('is-open');
      group.querySelector('.nav-submenu-parent')?.setAttribute('aria-expanded', 'false');
    });
  });

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      link.closest('.nav-item')?.classList.add('is-hover-suppressed');
      showPage(link.dataset.route || link.dataset.pageLink);
    });
  });

  const homeNewsBoard = document.querySelector('[data-home-news-board]');
  if (homeNewsBoard) {
    const newsEntries = Array.from(homeNewsBoard.querySelectorAll('[data-home-news-entry]'));
    const newsCovers = Array.from(homeNewsBoard.querySelectorAll('[data-home-news-cover]'));
    const showHomeNewsCover = (index) => {
      newsEntries.forEach((entry, entryIndex) => {
        entry.classList.toggle('is-active', entryIndex === index);
      });
      newsCovers.forEach((cover, coverIndex) => {
        cover.classList.toggle('is-active', coverIndex === index);
      });
    };
    newsEntries.forEach((entry, index) => {
      entry.addEventListener('mouseenter', () => showHomeNewsCover(index));
      entry.addEventListener('focus', () => showHomeNewsCover(index));
    });
    showHomeNewsCover(0);
  }

  const labCarousel = document.querySelector('[data-lab-carousel]');
  if (labCarousel) {
    const slides = Array.from(labCarousel.querySelectorAll('.lab-slide'));
    const dots = Array.from(labCarousel.querySelectorAll('.lab-carousel-dot'));
    const dotsNav = labCarousel.querySelector('.lab-carousel-dots');
    const previousButton = labCarousel.querySelector('[data-carousel-prev]');
    const nextButton = labCarousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;
    let autoplayTimer = 0;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        slide.setAttribute('aria-hidden', String(slideIndex !== activeIndex));
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      const planePosition = slides.length > 1
        ? 10 + (activeIndex / (slides.length - 1)) * 80
        : 50;
      dotsNav?.style.setProperty('--plane-position', `${planePosition}%`);
    };

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (prefersReducedMotion || slides.length < 2) return;
      autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 5200);
    };

    dots.forEach((dot, index) => {
      const previewSlide = () => {
        stopAutoplay();
        showSlide(index);
      };
      dot.addEventListener('mouseenter', previewSlide);
      dot.addEventListener('focus', previewSlide);
      dot.addEventListener('mouseleave', startAutoplay);
      dot.addEventListener('blur', startAutoplay);
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });
    previousButton?.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });
    nextButton?.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });

    showSlide(0);
    startAutoplay();
  }

  const researchCards = Array.from(document.querySelectorAll('.research-topic-card'));
  const researchCollapseButton = document.getElementById('research-collapse-button');
  const researchTopicList = document.querySelector('.research-topic-list');
  const researchIntro = document.querySelector('.research-intro');
  const researchOutro = document.querySelector('.research-outro');
  const researchArticle = researchTopicList?.closest('article');
  const researchDetailSeparator = document.querySelector('[data-research-page-detail-separator]');
  const researchDetailBreadcrumb = document.querySelector('[data-research-page-detail]');
  const researchTopicPage = document.createElement('section');
  researchTopicPage.className = 'research-topic-page';
  researchTopicPage.hidden = true;
  researchArticle?.append(researchTopicPage);
  researchCollapseButton?.remove();

  function updateResearchCollapseButton() {}

  resetResearchTopicDetail = () => {
    document.querySelectorAll('[data-research-direction-index]').forEach((button) => {
      button.classList.remove('is-active');
    });
    if (researchDetailSeparator) researchDetailSeparator.hidden = true;
    if (researchDetailBreadcrumb) {
      researchDetailBreadcrumb.hidden = true;
      researchDetailBreadcrumb.textContent = '';
    }
    if (!researchTopicPage || researchTopicPage.hidden) return;
    researchTopicPage.hidden = true;
    researchTopicPage.replaceChildren();
    if (researchIntro) researchIntro.hidden = false;
    if (researchTopicList) researchTopicList.hidden = false;
    if (researchOutro) researchOutro.hidden = false;
  };

  const showResearchTopicDetail = (card) => {
    const title = card.querySelector('.research-topic-copy strong')?.textContent.trim() || '';
    const subtitle = card.querySelector('.research-topic-copy small')?.textContent.trim() || '';
    const detail = card.querySelector('.research-topic-detail-inner');
    if (!detail || !researchTopicPage) return;
    if (researchIntro) researchIntro.hidden = true;
    if (researchTopicList) researchTopicList.hidden = true;
    if (researchOutro) researchOutro.hidden = true;
    const cardIndex = researchCards.indexOf(card);
    document.querySelectorAll('[data-research-direction-index]').forEach((button) => {
      button.classList.toggle(
        'is-active',
        Number(button.dataset.researchDirectionIndex) === cardIndex
      );
    });
    if (researchDetailSeparator) researchDetailSeparator.hidden = false;
    if (researchDetailBreadcrumb) {
      researchDetailBreadcrumb.hidden = false;
      researchDetailBreadcrumb.textContent = title;
    }
    researchTopicPage.innerHTML = `
      <button class="research-topic-page-back" type="button">${isEnglish ? 'Back' : '返回前页'}</button>
      <header class="research-topic-page-header">
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </header>
      <div class="research-topic-page-content">${detail.innerHTML}</div>
    `;
    researchTopicPage.querySelectorAll('.research-topic-page-content p > strong:first-child').forEach((heading) => {
      heading.textContent = heading.textContent.replace(/[：:]\s*$/, '');
    });
    researchTopicPage.hidden = false;
    researchTopicPage.querySelector('.research-topic-page-back')?.addEventListener('click', () => {
      resetResearchTopicDetail();
      researchTopicList?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  showResearchTopicDetailPage = (index) => {
    const card = researchCards[index];
    if (card) showResearchTopicDetail(card);
  };

  document.querySelectorAll('[data-home-research-index]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showPage('research');
      requestAnimationFrame(() => {
        showResearchTopicDetailPage(Number(link.dataset.homeResearchIndex));
      });
    });
  });

  researchCards.forEach((card) => {
    card.open = false;
    card.querySelector('summary')?.addEventListener('click', (event) => {
      event.preventDefault();
      showResearchTopicDetail(card);
    });
  });

  function setupSectionSubnav(selector, datasetKey) {
    const buttons = Array.from(document.querySelectorAll(selector));
    const setActiveButton = (activeButton) => {
      buttons.forEach((button) => {
        button.classList.toggle('is-active', button === activeButton);
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        setActiveButton(button);
        document.getElementById(button.dataset[datasetKey])?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });

    if ('IntersectionObserver' in window && buttons.length) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeButton = buttons.find(
            (button) => button.dataset[datasetKey] === entry.target.id
          );
          if (activeButton) setActiveButton(activeButton);
        });
      }, {
        rootMargin: '-150px 0px -60% 0px',
        threshold: 0
      });

      buttons.forEach((button) => {
        const section = document.getElementById(button.dataset[datasetKey]);
        if (section) sectionObserver.observe(section);
      });
    }
  }

  setupSectionSubnav('[data-education-target]', 'educationTarget');
  setupSectionSubnav('[data-achievement-target]', 'achievementTarget');
  setupSectionSubnav('[data-project-target]', 'projectTarget');
  setupSectionSubnav('[data-lab-target]', 'labTarget');

  window.addEventListener('popstate', () => {
    showPage(window.location.hash.replace('#', ''), { skipHash: true, instant: true });
  });

  const initialTarget = window.location.hash.replace('#', '') || 'home';
  showPage(initialTarget, {
    skipHash: true,
    instant: true
  });

  if (initialTarget === 'research') {
    requestAnimationFrame(() => {
      document.querySelector('#research')?.scrollIntoView();
    });
  }
})();
