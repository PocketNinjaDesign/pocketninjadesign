import SocialIconTemplates from './socialIconTemplates';

export default {
  getFullTemplate(id) {
    return `
    <ul id="${id}" class="social-media-links">
      <li>
        <a href="https://codepen.io/PocketNinjaDesign/" title="Codepen for Pocketninja.design showcasing my sporadic code sketches" target="_blank" class="social-media-link">
          ${SocialIconTemplates.getCodepenTemplate()}
        </a>
      </li>
      <li>
        <a href="https://github.com/PocketNinjaDesign/pocketninjadesign" title="Github for Pocketninja.design with many repos including one for this site" target="_blank" class="social-media-link">
          ${SocialIconTemplates.getGithubTemplate()}
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/duncan-gossage-51324615/" title="Please feel free to peruse my LinkedIn Profile" target="_blank" class="social-media-link">
          ${SocialIconTemplates.getLinkedInTemplate()}
        </a>
      </li>
      <li>
        <a href="https://twitter.com/PocketNinjaDsgn" title="Pocketninja.design twitter account for positing anythign interesting, when I remember to." target="_blank" class="social-media-link">
          ${SocialIconTemplates.getTwitterTemplate()}
        </a>
      </li>
    </ul>
    `;
  },
};
