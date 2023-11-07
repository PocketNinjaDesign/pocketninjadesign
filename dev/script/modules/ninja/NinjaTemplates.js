
export default {
  baseStart(id, colors) {
    return `<svg id="Ninja${id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" enable-background="new 0 0 80 80" width="80" height="80">
      <style>
        .border{fill:#111}.st1{fill:#fff}
        .ninja-shadow { fill: #111 }
        .op40 { opacity: .4; }
        .eye-color { fill:#027abb }
        .ninja${id}-body { fill: ${colors.base} }
        .ninja${id}-dark { fill: ${colors.dark} }
        .ninja${id}-light { fill: ${colors.light} }
      </style>

      <path id="ninja-shadow-${this.id}" class="ninja-shadow" d="M23 24.8V80h47.5V24.8C70.5 11.7 59.9 1 46.8 1S23 11.7 23 24.8z"/>`;
  },

  baseEnd() {
    return '</svg>';
  },

  body(id) {
    return `
      <path id="ninja${id}-body" class="ninja${id}-body" d="M27.5 75.5V24.8c0-10.6 8.6-19.2 19.2-19.2C57.4 5.5 66 14.1 66 24.8v50.7H27.5z"/>
      <g id="belt">
        <path class="ninja${id}-light" d="M66 69.5H27.5V39S47.4 56.1 66 37.6v31.9z"/>
        <path class="ninja${id}-dark op40" d="M27.5 59.7s24.4 1 38.5-21.9v8S61 63 27.5 63v-3.3z"/>
        <path class="ninja${id}-dark" d="M27.5 56.7s24.4 1 38.5-21.9v8s-5 19.1-38.5 19.1v-5.2z"/>
      </g>
    `;
  },

  visor(id) {
    return `
      <g id="ninja${id}-visor" class="visor">
        <path id="metal_band_20_" class="ninja${id}-dark" d="M61.9 22.9c0 5.7-6.9 10.3-15.4 10.3s-15.4-4.6-15.4-10.3c0-5.7 6.9-10.3 15.4-10.3 8.5.1 15.4 4.7 15.4 10.3z"/>
        <path id="metal_band_19_" d="M61.9 24.9c0 5.7-6.9 10.3-15.4 10.3s-15.4-4.6-15.4-10.3c0-5.7 6.9-10.3 15.4-10.3 8.5.1 15.4 4.7 15.4 10.3z" fill="#eaeaea"/>
        <path id="eye_base_30_" class="ninja${id}-light" d="M62.5 29.9c0 6-7.3 10.9-16.3 10.9s-16.3-4.9-16.3-10.9S37.1 19 46.1 19c9.1 0 16.4 4.9 16.4 10.9z"/>
        <path id="eye_base_29_" class="ninja${id}-dark" d="M62.9 28.9c0 6-7.3 10.9-16.3 10.9s-16.3-4.9-16.3-10.9S37.5 18 46.5 18s16.4 4.9 16.4 10.9z"/>
        <path id="eye_base_28_" d="M61.9 28.9c0 5.7-6.9 10.3-15.4 10.3s-15.4-4.6-15.4-10.3c0-5.7 6.9-10.3 15.4-10.3s15.4 4.6 15.4 10.3z"/>
      </g>
    `;
  },

  sword1(id) {
    return `
    <g id="ninja${id}-sword1">
      <path id="shadow_1_" class="ninja-shadow" d="M2.4 11.7c-1.3 1.6-2 3.4-2 5.1 0 1.5.5 3 1.5 4.1l.4.4s5.4 4.5 8.2 6.9c.1 1.1.6 2.2 1.5 3l1.3 1.1c.9.8 2.1 1.1 3.3 1.1.1 0 .2-.1.3-.1 1.4 1.2 2.8 2.3 2.8 2.3C40.5 53 58.4 67.9 74.4 71.3c2.1.4 4.2-.7 5.1-2.6.2-.6.4-1.2.4-1.8 0-1.5-.7-2.9-2-3.7-17.8-12.1-34.5-26.3-49.3-38.9 0 0-1.2-1-2.3-2v-.2c-.1-1.2-.7-2.3-1.6-3.1l-1.4-1c-.9-.8-2.1-1.1-3.2-1-2.8-2.4-8.2-6.9-8.2-6.9-.1-.1-.3-.2-.5-.3-2.7-1.8-6.5-1-9 1.9z"/>
      <path id="sword1-sheath" class="st1" d="M17.2 27.7c22 18.2 41.9 35.8 58.1 39.2-20-13.6-38.2-29.5-54.6-43.3l-3.5 4.1z"/>
      <defs>
        <filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="16.9" y="19.7" width="57.3" height="45.1">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/>
        </filter>
      </defs>
      <mask maskUnits="userSpaceOnUse" x="16.9" y="19.7" width="57.3" height="45.1" id="sword1-sheath-shadow_1_">
        <path class="st1" d="M17.3 27.7c22 18.2 41.9 35.8 58.1 39.2-20-13.6-38.2-29.5-54.6-43.3l-3.5 4.1z" filter="url(#Adobe_OpacityMaskFilter)"/>
      </mask>
      <path id="sword1-sheath-shadow" d="M16.9 21.9c1.4 3.3 11.7 13 15.4 14.8 6.9 3.4 10.9 8.8 15.5 13.3 4.6 4.6 15.8 10.2 20.1 11.6 4.3 1.4.9-.1 3.4 2.4s3-2.4 3-2.4l-53-41.9-4.4 2.2z" mask="url(#sword1-sheath-shadow_1_)" fill="#898989"/>
      <path id="sword1-handle" transform="rotate(-49.758 12.606 20.326)" class="ninja${id}-body" d="M9.7 13.2h5.8v14.2H9.7z"/>
      <path transform="rotate(-49.758 18.358 25.195)" d="M14.1 24.3h8.4v1.8h-8.4z"/>
      <path d="M9.2 13.6c.8.7.6 2.2-.5 3.4-1 1.2-2.5 1.7-3.3 1-.8-.7-.6-2.2.5-3.4 1-1.2 2.5-1.7 3.3-1z"/>
    </g>`;
  },

  sword2(id) {
    return `
    <g id="ninja${id}-sword2">
      <path id="shadow" class="ninja-shadow" d="M15.4 2.8c-1.5 1.4-2.3 3.3-2.3 5.1 0 1.2.4 2.3 1.1 3.3.1.2.2.3.4.5 0 0 3.3 3.5 5.4 5.6.1 1 .5 1.9 1.2 2.7l.9 1c.8.9 1.9 1.3 3 1.3 11.3 11.4 34.3 33.1 47.5 34.8 2 .3 3.9-.9 4.7-2.7.2-.6.3-1.2.3-1.7 0-1.3-.6-2.7-1.7-3.5l-3.6-2.8C59.4 36.1 46.1 25.6 34.4 13.1c-.1-1.1-.5-2.1-1.2-2.9l-.9-1c-.7-.7-1.6-1.1-2.6-1.3-2-2.1-5.4-5.7-5.4-5.7-.2 0-.3-.1-.5-.2-2.3-1.9-5.9-1.6-8.4.8z"/>
      <path class="st1" d="M26.1 17c15.3 15.7 36.3 34.3 47 35.6C58.3 40.9 42.6 29 29.2 14.1L26.1 17z"/>
      <path transform="rotate(-43.736 23.186 10.954)" class="ninja${id}-body" d="M21 5.5h4.4v10.9H21z"/>
      <path transform="rotate(-43.72 27.174 15.125)" d="M23.9 14.5h6.5v1.3h-6.5z"/>
      <path d="M21.1 5.6c.5.6.3 1.7-.6 2.6-.9.8-2 1.1-2.6.5-.5-.6-.3-1.7.6-2.6.9-.9 2.1-1.1 2.6-.5z"/>
    </g>`;
  },

  leftEye(id) {
    return `
    <g id="ninja${id}-left-eye" class="left-eye">
      <path class="st1" d="M47.9 29.5c0 4.4-2.8 8-6.2 8-3.4 0-6.2-3.6-6.2-8s2.8-8 6.2-8c3.5-.1 6.2 3.5 6.2 8z"/>
      <path class="eye-color" d="M45 29.5c0 2.5-1.6 4.6-3.5 4.6-2 0-3.5-2.1-3.5-4.6 0-2.5 1.6-4.6 3.5-4.6 2 0 3.5 2 3.5 4.6z"/>
      <path d="M43.6 29.5c0 1.4-.7 2.5-1.5 2.5s-1.5-1.1-1.5-2.5.7-2.5 1.5-2.5 1.5 1.1 1.5 2.5z"/>
      <path class="st1" d="M41.9 31.6c0 1-.6 1.8-1.3 1.8-.7 0-1.3-.8-1.3-1.8s.6-1.8 1.3-1.8c.8 0 1.3.8 1.3 1.8zM43 28.3c0 .2-.1.4-.3.4-.1 0-.3-.2-.3-.4s.1-.4.3-.4c.2-.1.3.1.3.4z"/>
    </g>
    `;
  },

  rightEye(id) {
    return `
    <g id="ninja${id}-right-eye" class="right-eye">
      <path class="st1" d="M56.9 29.5c0 2.1-1.3 3.7-2.9 3.7s-2.9-1.7-2.9-3.7c0-2.1 1.3-3.7 2.9-3.7s2.9 1.6 2.9 3.7z"/>
      <path class="eye-color" d="M55.9 29.5c0 1.3-.8 2.3-1.8 2.3s-1.8-1-1.8-2.3c0-1.3.8-2.3 1.8-2.3 1-.1 1.8 1 1.8 2.3z"/>
      <path d="M55.2 29.5c0 .7-.3 1.3-.8 1.3s-.8-.6-.8-1.3c0-.7.3-1.3.8-1.3s.8.6.8 1.3z"/>
      <path class="st1" d="M54.4 30.5c0 .5-.3.9-.6.9-.4 0-.6-.4-.6-.9s.3-.9.6-.9.6.4.6.9zM54.9 28.9c0 .2-.1.4-.2.4s-.2-.2-.2-.4.1-.4.2-.4c.1.1.2.2.2.4z"/>
    </g>
    `;
  },
};
