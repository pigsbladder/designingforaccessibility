/* vpat-tool.js — WCAG 2.2 criteria data + lookup tool */

var CRITERIA = [
  {id:"1.1.1",name:"Non-text Content",level:"A",principle:"Perceivable",desc:"All non-text content presented to the user has a text alternative that serves the equivalent purpose.",vpat:"Document whether all images, icons, charts, and non-text UI elements have appropriate text alternatives (alt text, aria-label, or aria-labelledby).",tip:"Check every img tag for meaningful alt text. Decorative images should have alt='' and role='presentation'.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"},
  {id:"1.2.1",name:"Audio-only and Video-only (Prerecorded)",level:"A",principle:"Perceivable",desc:"For prerecorded audio-only and video-only media, an alternative is provided.",vpat:"State whether transcripts are provided for audio-only content and whether text or audio descriptions are provided for video-only content.",tip:"Transcripts must convey all spoken content and meaningful sounds.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html"},
  {id:"1.2.2",name:"Captions (Prerecorded)",level:"A",principle:"Perceivable",desc:"Captions are provided for all prerecorded audio content in synchronized media.",vpat:"Document whether all prerecorded video content includes accurate, synchronized captions.",tip:"Auto-generated captions alone are typically insufficient.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html"},
  {id:"1.2.3",name:"Audio Description or Media Alternative (Prerecorded)",level:"A",principle:"Perceivable",desc:"An alternative for time-based media or audio description of the prerecorded video content is provided.",vpat:"State whether audio descriptions or full text alternatives are provided for prerecorded video.",tip:"Audio descriptions narrate visual information during natural pauses in dialogue.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html"},
  {id:"1.2.4",name:"Captions (Live)",level:"AA",principle:"Perceivable",desc:"Captions are provided for all live audio content in synchronized media.",vpat:"Document whether live video streams include real-time captions.",tip:"Live captions require CART or similar real-time captioning service.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html"},
  {id:"1.2.5",name:"Audio Description (Prerecorded)",level:"AA",principle:"Perceivable",desc:"Audio description is provided for all prerecorded video content in synchronized media.",vpat:"State whether audio descriptions are provided for all prerecorded video content.",tip:"A text alternative alone is not sufficient at AA. Full audio description is required.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html"},
  {id:"1.2.6",name:"Sign Language (Prerecorded)",level:"AAA",principle:"Perceivable",desc:"Sign language interpretation is provided for all prerecorded audio content in synchronized media.",vpat:"Document whether sign language interpretation is provided for prerecorded audio/video content.",tip:"Typically required only for AAA conformance.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html"},
  {id:"1.3.1",name:"Info and Relationships",level:"A",principle:"Perceivable",desc:"Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",vpat:"Document whether visual structure (headings, lists, tables, form labels) is conveyed through proper semantic HTML or ARIA.",tip:"Use proper heading hierarchy (h1-h6), semantic list elements, table headers with scope, and associated form labels.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"},
  {id:"1.3.2",name:"Meaningful Sequence",level:"A",principle:"Perceivable",desc:"If the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",vpat:"State whether the DOM order matches the visual reading order for all content.",tip:"Check that tabbing through the page follows a logical reading order.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html"},
  {id:"1.3.3",name:"Sensory Characteristics",level:"A",principle:"Perceivable",desc:"Instructions do not rely solely on sensory characteristics such as shape, color, size, visual location, orientation, or sound.",vpat:"Document whether instructions avoid relying solely on shape, color, size, visual location, orientation, or sound.",tip:"Avoid instructions like 'click the green button'. Include text labels alongside visual cues.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html"},
  {id:"1.3.4",name:"Orientation",level:"AA",principle:"Perceivable",desc:"Content does not restrict its view and operation to a single display orientation, unless a specific orientation is essential.",vpat:"State whether the product supports both portrait and landscape orientations.",tip:"Do not lock orientation via CSS or JavaScript unless a specific orientation is essential.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/orientation.html"},
  {id:"1.3.5",name:"Identify Input Purpose",level:"AA",principle:"Perceivable",desc:"The purpose of each input field collecting information about the user can be programmatically determined.",vpat:"Document whether form fields use autocomplete attributes to identify their purpose.",tip:"Use HTML autocomplete attributes (name, email, tel, street-address, etc.) on all personal data input fields.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html"},
  {id:"1.4.1",name:"Use of Color",level:"A",principle:"Perceivable",desc:"Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",vpat:"State whether all information conveyed by color is also conveyed through text, pattern, or other visual means.",tip:"Error states, required fields, and status indicators must not rely on color alone.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"},
  {id:"1.4.2",name:"Audio Control",level:"A",principle:"Perceivable",desc:"If any audio plays automatically for more than 3 seconds, a mechanism is available to pause, stop, or control the volume.",vpat:"Document whether any auto-playing audio can be paused, stopped, or muted independently of system volume.",tip:"Auto-playing audio is a significant barrier for screen reader users.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html"},
  {id:"1.4.3",name:"Contrast (Minimum)",level:"AA",principle:"Perceivable",desc:"Text and images of text have a contrast ratio of at least 4.5:1 (3:1 for large text).",vpat:"State the contrast ratios for normal text, large text, and UI components. Document any exceptions.",tip:"Large text is 18pt (24px) or 14pt (18.67px) bold. Use tools like WebAIM Contrast Checker to verify ratios.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"},
  {id:"1.4.4",name:"Resize Text",level:"AA",principle:"Perceivable",desc:"Text can be resized up to 200% without assistive technology and without loss of content or functionality.",vpat:"Document whether text can be resized to 200% without horizontal scrolling or loss of content.",tip:"Test by setting browser zoom to 200%. Content should reflow, not overflow.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html"},
  {id:"1.4.5",name:"Images of Text",level:"AA",principle:"Perceivable",desc:"If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text.",vpat:"State whether images of text are used and whether text alternatives are provided.",tip:"Use real text styled with CSS instead of images of text.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html"},
  {id:"1.4.10",name:"Reflow",level:"AA",principle:"Perceivable",desc:"Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions at 320px width.",vpat:"Document whether content reflows at 320px viewport width without horizontal scrolling.",tip:"Test at 320px wide (equivalent to 400% zoom on a 1280px screen).",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/reflow.html"},
  {id:"1.4.11",name:"Non-text Contrast",level:"AA",principle:"Perceivable",desc:"UI components and graphical objects have a contrast ratio of at least 3:1 against adjacent colors.",vpat:"State whether UI components (buttons, inputs, checkboxes, focus indicators) and meaningful graphics meet 3:1 contrast.",tip:"Check all states: default, hover, focus, disabled.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html"},
  {id:"1.4.12",name:"Text Spacing",level:"AA",principle:"Perceivable",desc:"No loss of content or functionality occurs when text spacing is adjusted.",vpat:"Document whether content remains functional when text spacing properties are increased.",tip:"Test with a bookmarklet that applies: line-height 1.5x, letter-spacing 0.12em, word-spacing 0.16em, paragraph spacing 2x.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html"},
  {id:"1.4.13",name:"Content on Hover or Focus",level:"AA",principle:"Perceivable",desc:"Where receiving and then removing pointer hover or keyboard focus triggers additional content, that content is dismissible, hoverable, and persistent.",vpat:"State whether tooltips and hover content can be dismissed, hovered over, and remain visible until dismissed.",tip:"Tooltips must: (1) be dismissible with Escape, (2) remain visible when the pointer moves over them, (3) not disappear until the user moves focus away.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html"},
  {id:"2.1.1",name:"Keyboard",level:"A",principle:"Operable",desc:"All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",vpat:"Document whether all interactive elements and functionality are accessible via keyboard alone.",tip:"Test every interactive element with Tab, Shift+Tab, Enter, Space, and arrow keys.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html"},
  {id:"2.1.2",name:"No Keyboard Trap",level:"A",principle:"Operable",desc:"If keyboard focus can be moved to a component, focus can be moved away from that component using only a keyboard interface.",vpat:"State whether keyboard focus can always be moved away from any component without requiring non-standard keystrokes.",tip:"Modal dialogs are a common trap. Ensure Escape closes modals and returns focus to the trigger element.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html"},
  {id:"2.1.4",name:"Character Key Shortcuts",level:"A",principle:"Operable",desc:"If a keyboard shortcut is implemented using only letter, punctuation, number, or symbol characters, a mechanism is available to turn off or remap the shortcut.",vpat:"Document whether single-character keyboard shortcuts can be turned off or remapped.",tip:"Single-key shortcuts conflict with screen reader commands.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html"},
  {id:"2.2.1",name:"Timing Adjustable",level:"A",principle:"Operable",desc:"For each time limit set by the content, the user can turn off, adjust, or extend the time limit.",vpat:"State whether session timeouts and time limits can be turned off, adjusted, or extended by the user.",tip:"Provide at least 20 seconds warning before a timeout.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html"},
  {id:"2.2.2",name:"Pause, Stop, Hide",level:"A",principle:"Operable",desc:"For moving, blinking, scrolling, or auto-updating information, a mechanism is available to pause, stop, or hide it.",vpat:"Document whether all moving, blinking, or auto-updating content can be paused, stopped, or hidden.",tip:"Carousels, animations, and live feeds must have pause controls.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html"},
  {id:"2.3.1",name:"Three Flashes or Below Threshold",level:"A",principle:"Operable",desc:"Web pages do not contain anything that flashes more than three times in any one second period.",vpat:"State whether any content flashes more than three times per second.",tip:"Use the Photosensitive Epilepsy Analysis Tool (PEAT) to test video content.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html"},
  {id:"2.4.1",name:"Bypass Blocks",level:"A",principle:"Operable",desc:"A mechanism is available to bypass blocks of content that are repeated on multiple web pages.",vpat:"Document whether skip navigation links or landmark regions are provided to bypass repeated content.",tip:"Implement a visible-on-focus 'Skip to main content' link as the first focusable element.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html"},
  {id:"2.4.2",name:"Page Titled",level:"A",principle:"Operable",desc:"Web pages have titles that describe topic or purpose.",vpat:"State whether all pages have descriptive, unique page titles.",tip:"Page titles should follow the pattern: 'Page Name | Site Name'.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html"},
  {id:"2.4.3",name:"Focus Order",level:"A",principle:"Operable",desc:"If a web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operation.",vpat:"Document whether the keyboard focus order is logical and matches the visual reading order.",tip:"Avoid using tabindex values greater than 0.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html"},
  {id:"2.4.4",name:"Link Purpose (In Context)",level:"A",principle:"Operable",desc:"The purpose of each link can be determined from the link text alone, or from the link text together with its programmatically determined link context.",vpat:"State whether all links have descriptive text that conveys their purpose.",tip:"Avoid 'click here', 'read more', or 'learn more' without context.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html"},
  {id:"2.4.5",name:"Multiple Ways",level:"AA",principle:"Operable",desc:"More than one way is available to locate a web page within a set of web pages.",vpat:"Document whether users can find pages through multiple means (navigation, search, sitemap).",tip:"Provide at least two of: navigation menu, search, sitemap, breadcrumbs, or table of contents.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html"},
  {id:"2.4.6",name:"Headings and Labels",level:"AA",principle:"Operable",desc:"Headings and labels describe topic or purpose.",vpat:"State whether all headings and form labels are descriptive and meaningful.",tip:"Headings should describe the content that follows.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html"},
  {id:"2.4.7",name:"Focus Visible",level:"AA",principle:"Operable",desc:"Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",vpat:"Document whether a visible focus indicator is present for all keyboard-focusable elements.",tip:"Never use outline:none without providing an alternative focus style.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"},
  {id:"2.4.11",name:"Focus Not Obscured (Minimum)",level:"AA",principle:"Operable",desc:"When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.",vpat:"State whether focused components are at least partially visible and not entirely covered by sticky headers or overlays.",tip:"Use scroll-margin-top to account for sticky header height.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html"},
  {id:"2.5.1",name:"Pointer Gestures",level:"A",principle:"Operable",desc:"All functionality that uses multipoint or path-based gestures can be operated with a single pointer.",vpat:"Document whether all gesture-based interactions have single-pointer alternatives.",tip:"Pinch-to-zoom, swipe gestures, and drag operations must have button or single-tap alternatives.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html"},
  {id:"2.5.2",name:"Pointer Cancellation",level:"A",principle:"Operable",desc:"For functionality that can be operated using a single pointer, actions are triggered on the up-event and can be aborted or undone.",vpat:"State whether actions are triggered on the up-event (mouseup/touchend) rather than the down-event.",tip:"Trigger actions on mouseup/pointerup, not mousedown.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html"},
  {id:"2.5.3",name:"Label in Name",level:"A",principle:"Operable",desc:"For user interface components with labels that include text or images of text, the name contains the text that is presented visually.",vpat:"Document whether the accessible name of interactive elements includes the visible label text.",tip:"The aria-label or accessible name must contain the visible text.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html"},
  {id:"2.5.4",name:"Motion Actuation",level:"A",principle:"Operable",desc:"Functionality that can be operated by device motion or user motion can also be operated by user interface components, and response to motion can be disabled.",vpat:"State whether any shake, tilt, or motion-activated features have UI control alternatives.",tip:"Provide button alternatives for any shake-to-undo or tilt-to-scroll features.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html"},
  {id:"2.5.7",name:"Dragging Movements",level:"AA",principle:"Operable",desc:"All functionality that uses a dragging movement can be achieved with a single pointer without dragging.",vpat:"Document whether drag-and-drop interactions have single-pointer alternatives.",tip:"Provide keyboard-accessible reordering for any drag-and-drop functionality.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html"},
  {id:"2.5.8",name:"Target Size (Minimum)",level:"AA",principle:"Operable",desc:"The size of the target for pointer inputs is at least 24 by 24 CSS pixels.",vpat:"State whether all interactive targets meet the minimum 24x24 CSS pixel size requirement.",tip:"Inline links in text are exempt. Aim for 44x44px for best usability.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"},
  {id:"3.1.1",name:"Language of Page",level:"A",principle:"Understandable",desc:"The default human language of each web page can be programmatically determined.",vpat:"Document whether the lang attribute is set correctly on the html element.",tip:"Every page must have a lang attribute on the html element (e.g. lang='en').",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html"},
  {id:"3.1.2",name:"Language of Parts",level:"AA",principle:"Understandable",desc:"The human language of each passage or phrase in the content can be programmatically determined.",vpat:"State whether content in languages other than the page default has appropriate lang attributes.",tip:"Wrap foreign language phrases in elements with the appropriate lang attribute.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html"},
  {id:"3.2.1",name:"On Focus",level:"A",principle:"Understandable",desc:"If any component receives focus, it does not initiate a change of context.",vpat:"Document whether receiving focus triggers any unexpected context changes.",tip:"Focus must not trigger form submission, page navigation, or significant UI changes.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html"},
  {id:"3.2.2",name:"On Input",level:"A",principle:"Understandable",desc:"Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior.",vpat:"State whether changing form inputs triggers unexpected context changes without user initiation.",tip:"Select menus and checkboxes must not auto-submit or navigate.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/on-input.html"},
  {id:"3.2.3",name:"Consistent Navigation",level:"AA",principle:"Understandable",desc:"Navigational mechanisms that are repeated on multiple web pages occur in the same relative order each time they are repeated.",vpat:"Document whether navigation menus appear in the same order across all pages.",tip:"Navigation order must be consistent across pages.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html"},
  {id:"3.2.4",name:"Consistent Identification",level:"AA",principle:"Understandable",desc:"Components that have the same functionality within a set of web pages are identified consistently.",vpat:"State whether components with the same function are labeled consistently across the product.",tip:"A search field must always be labeled 'Search'.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html"},
  {id:"3.3.1",name:"Error Identification",level:"A",principle:"Understandable",desc:"If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",vpat:"Document whether form errors are identified in text and associated with the specific field in error.",tip:"Error messages must be in text (not just color or icon). Associate errors with fields using aria-describedby.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html"},
  {id:"3.3.2",name:"Labels or Instructions",level:"A",principle:"Understandable",desc:"Labels or instructions are provided when content requires user input.",vpat:"State whether all form fields have visible labels and whether format requirements are communicated.",tip:"Placeholder text is not a substitute for a label.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html"},
  {id:"3.3.3",name:"Error Suggestion",level:"AA",principle:"Understandable",desc:"If an input error is automatically detected and suggestions for correction are known, then the suggestion is provided to the user.",vpat:"Document whether error messages include specific suggestions for correction.",tip:"Instead of 'Invalid date', say 'Please enter the date in MM/DD/YYYY format'.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html"},
  {id:"3.3.4",name:"Error Prevention (Legal, Financial, Data)",level:"AA",principle:"Understandable",desc:"For web pages that cause legal commitments or financial transactions, submissions are reversible, checked, or confirmed.",vpat:"State whether legal, financial, or data-deletion actions can be reviewed, confirmed, or reversed.",tip:"Provide a confirmation step before irreversible actions.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html"},
  {id:"3.3.7",name:"Redundant Entry",level:"A",principle:"Understandable",desc:"Information previously entered by or provided to the user that is required to be entered again is either auto-populated or available for the user to select.",vpat:"Document whether users are required to re-enter information they have already provided in the same session.",tip:"Auto-populate fields with previously entered data.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html"},
  {id:"3.3.8",name:"Accessible Authentication (Minimum)",level:"AA",principle:"Understandable",desc:"A cognitive function test is not required for any step in an authentication process unless an alternative is provided.",vpat:"State whether authentication requires solving puzzles or memorizing information without alternatives.",tip:"Support password managers and copy-paste in password fields.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html"},
  {id:"4.1.1",name:"Parsing",level:"A",principle:"Robust",desc:"In content implemented using markup languages, elements have complete start and end tags, are nested according to their specifications, and do not contain duplicate attributes.",vpat:"Document whether the HTML is valid and well-formed.",tip:"Run pages through the W3C HTML Validator. Fix duplicate IDs, unclosed tags, and invalid nesting.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/parsing.html"},
  {id:"4.1.2",name:"Name, Role, Value",level:"A",principle:"Robust",desc:"For all user interface components, the name and role can be programmatically determined; states, properties, and values can be set by the user; and notification of changes is available to user agents.",vpat:"State whether all UI components have accessible names, roles, and states that are programmatically exposed.",tip:"Custom components must use ARIA roles, states (aria-expanded, aria-checked, aria-selected), and properties.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html"},
  {id:"4.1.3",name:"Status Messages",level:"AA",principle:"Robust",desc:"In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.",vpat:"Document whether status messages (success, error, loading) are announced to screen readers without requiring focus.",tip:"Use aria-live='polite' for non-urgent status messages and aria-live='assertive' for urgent alerts.",w3c:"https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"}
];

var currentFilter = "all";
var currentSearch = "";

function renderTable() {
  var tbody = document.getElementById("vpat-tbody");
  var table = document.getElementById("vpat-table");
  var noResults = document.getElementById("vpat-no-results");
  var emptyState = document.getElementById("vpat-empty-state");
  var countEl = document.getElementById("vpat-count");
  var search = currentSearch.toLowerCase().trim();
  var hasInput = search.length > 0 || currentFilter !== "all";

  /* No input yet — show the empty/welcome state */
  if (!hasInput) {
    table.style.display = "none";
    noResults.style.display = "none";
    emptyState.style.display = "block";
    countEl.textContent = CRITERIA.length + " criteria available — search or filter to explore";
    return;
  }
  emptyState.style.display = "none";

  /* Filter by level and search term */
  var filtered = CRITERIA.filter(function (c) {
    var ml = currentFilter === "all" || c.level === currentFilter;
    var ms = !search ||
      c.id.toLowerCase().indexOf(search) !== -1 ||
      c.name.toLowerCase().indexOf(search) !== -1 ||
      c.desc.toLowerCase().indexOf(search) !== -1 ||
      c.principle.toLowerCase().indexOf(search) !== -1 ||
      c.tip.toLowerCase().indexOf(search) !== -1 ||
      c.vpat.toLowerCase().indexOf(search) !== -1;
    return ml && ms;
  });

  countEl.textContent = "Showing " + filtered.length + " of " + CRITERIA.length + " criteria";

  if (filtered.length === 0) {
    table.style.display = "none";
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  table.style.display = "table";

  /* Build table rows using backtick template literals to avoid
     single-quote collisions inside inline event handler strings */
  tbody.innerHTML = filtered.map(function (c, i) {
    var lc = c.level === "A" ? "level-a" : c.level === "AA" ? "level-aa" : "level-aaa";
    return `<tr class="vpat-row" data-index="${i}" onclick="toggleRow(this)" role="button" aria-expanded="false" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){toggleRow(this);event.preventDefault();}">
      <td><span class="vpat-criterion-id">${c.id}</span></td>
      <td><span class="vpat-criterion-name">${c.name}</span></td>
      <td><span class="vpat-level-badge ${lc}">Level ${c.level}</span></td>
      <td><span class="vpat-expand-icon" aria-hidden="true">&#9660;</span></td>
    </tr>
    <tr class="vpat-detail-row" id="detail-${i}">
      <td class="vpat-detail-cell" colspan="4">
        <div class="vpat-detail-inner">
          <div><div class="vpat-detail-label">What it means</div><div class="vpat-detail-text">${c.desc}</div></div>
          <div><div class="vpat-detail-label">VPAT documentation note</div><div class="vpat-detail-text highlight">${c.vpat}</div></div>
          <div><div class="vpat-detail-label">Practical tip</div><div class="vpat-detail-text">${c.tip}</div></div>
          <div><div class="vpat-detail-label">W3C Source</div><div class="vpat-detail-text"><a href="${c.w3c}" target="_blank" rel="noopener noreferrer" class="vpat-w3c-link">${c.id} ${c.name} ↗</a></div></div>
          <div><div class="vpat-detail-label">Principle &amp; Level</div><div class="vpat-detail-text">${c.principle} — Level ${c.level}</div></div>
        </div>
      </td>
    </tr>`;
  }).join("");
}

function toggleRow(row) {
  var index = row.getAttribute("data-index");
  var detail = document.getElementById("detail-" + index);
  var isOpen = row.classList.contains("expanded");

  /* Collapse any previously open rows */
  document.querySelectorAll(".vpat-row.expanded").forEach(function (r) {
    r.classList.remove("expanded");
    r.setAttribute("aria-expanded", "false");
  });
  document.querySelectorAll(".vpat-detail-row.open").forEach(function (d) {
    d.classList.remove("open");
  });

  /* Expand the clicked row if it wasn't already open */
  if (!isOpen) {
    row.classList.add("expanded");
    row.setAttribute("aria-expanded", "true");
    detail.classList.add("open");
  }
}

function setExample(term) {
  var input = document.getElementById("vpat-search");
  input.value = term;
  currentSearch = term;
  renderTable();
  input.focus();
}

document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("vpat-search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearch = this.value;
      renderTable();
    });
  }
  document.querySelectorAll(".vpat-filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".vpat-filter-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderTable();
    });
  });
  renderTable();
});
