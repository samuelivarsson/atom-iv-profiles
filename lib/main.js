'use babel';

import IvProfilesView from './iv-profiles-view';
import { CompositeDisposable } from 'atom';
import config from './config';

const NPROFILES = 10;

export default {

  config,

  ivProfilesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.ivProfilesView = new IvProfilesView();

    // Register command that toggles this view
    this.addCommands();

    // TODO: Maybe fix cleaner solution for this?
    atom.commands.onWillDispatch(e => {
      if (e.type === 'application:quit' && e.originalEvent) {
        e.stopPropagation();
        this.appQuit();
      }
    });
  },

  appQuit() {
    if (atom.config.get('iv-profiles.disableAtQuit')) {
      let lastPkg = this.lastActivePackage();
      console.log("lastPkg: "+lastPkg);
      if (lastPkg === "") {
        atom.commands.dispatch(atom.views.getView(atom.workspace), 'application:quit');
      } else {
        let pkgSub = atom.packages.onDidDeactivatePackage((pkg) => {
          if (pkg.name === lastPkg) {
            console.log("callback from: "+pkg.name);
            console.log("quitting....");
            setTimeout(function() {
              atom.commands.dispatch(atom.views.getView(atom.workspace), 'application:quit');
            }, 100);
            pkgSub.dispose();
          }
        });
        this.disableProfiles();
      }
    } else {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'application:quit');
    }
  },

  lastActivePackage() {
    for (var i = NPROFILES; i > 0; i--) {
      if (atom.config.get('iv-profiles.activeProfiles.profile'+i)) {
        arr = atom.config.get('iv-profiles.profile' + i + '.value');
        return arr[arr.length-1];
      }
    }

    return "";
  },

  disableProfiles() {
    for (i = 1; i <= NPROFILES; i++) {
      console.log(i);
      if (atom.config.get('iv-profiles.activeProfiles.profile'+i)) {
        console.log(i+"yes");
        this.disableProfile(i);
      }
    }
  },

  disableProfile(n) {
    arr = atom.config.get('iv-profiles.profile' + n + '.value');
    for (j in arr) {
      console.log("j: "+j);
      let pkg = atom.packages.disablePackage(arr[j]);
      console.log("done with "+arr[j]);
    }
    let activeProfile = 'iv-profiles.activeProfiles.profile'+n;
    atom.config.set(activeProfile, !atom.config.get(activeProfile));
    console.log("profile "+n+":");
    console.log(atom.config.get('iv-profiles.activeProfiles.profile'+n));
  },

  deactivate() {
    this.ivProfilesView.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ivProfilesView.destroy();
  },

  serialize() {
    return this.ivProfilesView.serialize()
  },

  toggleView() {
    this.ivProfilesView.update();
    if (this.ivProfilesView.modalPanel && this.ivProfilesView.modalPanel.isVisible()) {
      return this.ivProfilesView.hide();
    }
    else {
      return this.ivProfilesView.show();
    }
  },

  profileToggle(n) {
    var arr = atom.config.get('iv-profiles.profile' + n + '.value');
    let activeProfile = 'iv-profiles.activeProfiles.profile'+n;

    for (var i in arr) {
      if (atom.config.get(activeProfile)) {
        if (!this.isInActiveProfile(arr[i], n)) {
          atom.packages.disablePackage(arr[i]);
        }
      } else {
        atom.packages.enablePackage(arr[i]);
      }
    }

    message = (atom.config.get('iv-profiles.activeProfiles.profile'+n)) ?
              atom.config.get('iv-profiles.profile'+n+'.name') + " profile was disabled." :
              atom.config.get('iv-profiles.profile'+n+'.name') + " profile was enabled.";
    atom.notifications.addSuccess(message);

    atom.config.set(activeProfile, !atom.config.get(activeProfile));
    this.ivProfilesView.update();
  },

  isInActiveProfile(pkg, profileNumber) {
    for (var index1 = 1; index1 <= NPROFILES; index1++) {
      if (index1 == profileNumber) {
        continue;
      }
      if (atom.config.get('iv-profiles.activeProfiles.profile'+index1)) {
        var arr = atom.config.get('iv-profiles.profile' + index1 + '.value');

        for (var index2 in arr) {
          if (pkg === arr[index2]) {
            return true;
          }
        }
      }
    }
    return false;
  },

  addCommands() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'iv-profiles:disable-and-quit':  () => this.appQuit(),
      'iv-profiles:toggle-view':       () => this.toggleView(),
      'iv-profiles:profile-1-toggle':  () => this.profileToggle(1),
      'iv-profiles:profile-2-toggle':  () => this.profileToggle(2),
      'iv-profiles:profile-3-toggle':  () => this.profileToggle(3),
      'iv-profiles:profile-4-toggle':  () => this.profileToggle(4),
      'iv-profiles:profile-5-toggle':  () => this.profileToggle(5),
      'iv-profiles:profile-6-toggle':  () => this.profileToggle(6),
      'iv-profiles:profile-7-toggle':  () => this.profileToggle(7),
      'iv-profiles:profile-8-toggle':  () => this.profileToggle(8),
      'iv-profiles:profile-9-toggle':  () => this.profileToggle(9),
      'iv-profiles:profile-10-toggle': () => this.profileToggle(10)
    }));
  }

};
