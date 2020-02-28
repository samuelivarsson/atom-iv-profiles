'use babel';

import { CompositeDisposable } from 'atom';

const path = require('path')
const SelectListView = require('atom-select-list');
const NPROFILES = 10;

export default class IvProfilesView {

  constructor() {
    this.items = [];
    this.buildItemList();

    this.selectListView = new SelectListView({
      items: this.items,
      maxResults: NPROFILES,
      filterKeyForItem: (item) => item.name,
      didCancelSelection: () => { this.cancel() },
      didConfirmSelection: ({number}) => {
        this.confirm(number)
      },
      elementForItem: ({name, value, number}) => {
        matches = []
        enabled = atom.config.get('iv-profiles.activeProfiles.profile'+number);

        return new FuzzyFinderItem({
          name,
          value,
          enabled,
          matches
        }).element
      }
    });
    this.selectListView.element.classList.add('iv-profiles');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  cancel () {
    this.selectListView.reset();
    this.hide();
  }

  show () {
    this.previouslyFocusedElement = document.activeElement;
    if (!this.modalPanel) {
      this.modalPanel = atom.workspace.addModalPanel({item: this.selectListView.element});
    }
    this.modalPanel.show();
    this.selectListView.focus();
  }

  hide () {
    if (this.modalPanel) {
      this.modalPanel.hide();
    }

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  // Tear down any state and detach
  destroy() {
    this.selectListView.element.remove();
    this.selectListView.destroy();
  }

  getElement() {
    return this.selectListView.element;
  }

  update() {
    this.buildItemList();
    this.selectListView.update({
      items: this.items,
      infoMessage: null,
      loadingMessage: null,
      loadingBadge: null});
  }

  buildItemList() {
    this.items = [];
    for (i = 1; i <= NPROFILES; i++) {
      name = atom.config.get('iv-profiles.profile'+i+'.name');
      value = atom.config.get('iv-profiles.profile'+i+'.value');
      dots = (value.length > 4) ? "..." : "";
      if (name.length > 0) {
        this.items.push({name: name,
                         value: "packages: "+value.slice(0, 4).toString()+dots,
                         number: i});
      }
    }
  }

  confirm(number) {
    atom.commands.dispatch(atom.workspace.element, 'iv-profiles:profile-'+number+'-toggle')
  }

}

function highlight (path, matches, offsetIndex) {
  let lastIndex = 0
  let matchedChars = []
  const fragment = document.createDocumentFragment()
  for (let matchIndex of matches) {
    matchIndex -= offsetIndex
    // If marking up the basename, omit path matches
    if (matchIndex < 0) {
      continue
    }
    const unmatched = path.substring(lastIndex, matchIndex)
    if (unmatched) {
      if (matchedChars.length > 0) {
        const span = document.createElement('span')
        span.classList.add('character-match')
        span.textContent = matchedChars.join('')
        fragment.appendChild(span)
        matchedChars = []
      }

      fragment.appendChild(document.createTextNode(unmatched))
    }

    matchedChars.push(path[matchIndex])
    lastIndex = matchIndex + 1
  }

  if (matchedChars.length > 0) {
    const span = document.createElement('span')
    span.classList.add('character-match')
    span.textContent = matchedChars.join('')
    fragment.appendChild(span)
  }

  // Remaining characters are plain text
  fragment.appendChild(document.createTextNode(path.substring(lastIndex)))
  return fragment
}

class FuzzyFinderItem {
  constructor ({name, value, enabled, matches}) {
    this.name = name
    this.value = value
    this.element = document.createElement('li')
    this.element.className = 'FuzzyFinderResult'

    this.primaryLine = document.createElement('div')
    this.primaryLine.dataset.name = name
    this.primaryLine.dataset.path = name
    this.primaryLine.classList.add('primary-line', 'file', 'icon')
    this.primaryLine.appendChild(highlight(name, matches, 0))
    this.element.appendChild(this.primaryLine)

    this.secondaryLine = document.createElement('div')
    this.secondaryLine.classList.add('secondary-line', 'path', 'no-icon')
    this.secondaryLine.appendChild(highlight(value, matches, 0))
    this.element.appendChild(this.secondaryLine)

    if (enabled) {
      this.element.classList.add('has-avatar')
      const avatarElement = document.createElement('img')
      avatarElement.className = 'FuzzyFinderResult-avatar'
      avatarElement.src = `https://upload.wikimedia.org/wikipedia/commons/c/c2/Black_check.svg?size=56`
      this.element.appendChild(avatarElement)
    }
  }
}
