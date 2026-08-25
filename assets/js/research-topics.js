(() => {
  'use strict';

  function init({ isEnglish, showPage }) {
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

    const resetDetail = () => {
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

    const showDetail = (card) => {
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
        resetDetail();
        researchTopicList?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const showDetailPage = (index) => {
      const card = researchCards[index];
      if (card) showDetail(card);
    };

    document.querySelectorAll('[data-home-research-index]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showPage('research');
        requestAnimationFrame(() => {
          showDetailPage(Number(link.dataset.homeResearchIndex));
        });
      });
    });

    researchCards.forEach((card) => {
      card.open = false;
      card.querySelector('summary')?.addEventListener('click', (event) => {
        event.preventDefault();
        showDetail(card);
      });
    });

    return {
      resetDetail,
      showDetailPage
    };
  }

  window.TeamHomepageResearchTopics = {
    init
  };
})();
