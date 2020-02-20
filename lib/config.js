/** @babel */

export default {

  disableAtQuit: {
    title: 'Disable At Quit',
    description: 'Disable all profiles before quitting Atom. **This only works by using the command "application:quit". The defualt keymap for this command is CMD-Q on Mac and CTRL-Q on Windows/Linux.**',
    order: 0,
    type: 'boolean',
    default: false
  },

  profile1: {
    title: 'Profile 1',
    type: 'object',
    collapsed: true,
    order: 1,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile2: {
    title: 'Profile 2',
    type: 'object',
    collapsed: true,
    order: 2,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile3: {
    title: 'Profile 3',
    type: 'object',
    collapsed: true,
    order: 3,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile4: {
    title: 'Profile 4',
    type: 'object',
    collapsed: true,
    order: 4,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile5: {
    title: 'Profile 5',
    type: 'object',
    collapsed: true,
    order: 5,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile6: {
    title: 'Profile 6',
    type: 'object',
    collapsed: true,
    order: 6,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile7: {
    title: 'Profile 7',
    type: 'object',
    collapsed: true,
    order: 7,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile8: {
    title: 'Profile 8',
    type: 'object',
    collapsed: true,
    order: 8,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile9: {
    title: 'Profile 9',
    type: 'object',
    collapsed: true,
    order: 9,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  profile10: {
    title: 'Profile 10',
    type: 'object',
    collapsed: true,
    order: 10,
    properties: {
      name: {
        title: 'Name',
        description: 'Desired name for profile.',
        type: 'string',
        default: ''
      },
      value: {
        title: 'Packages',
        description: 'All packages to be enabled, separated by a comma. For example "script, pdf-view".',
        type: 'array',
        default: []
      }
    }
  },

  activeProfiles: {
    title: 'Active Profiles',
    type: 'object',
    collapsed: true,
    order: 11,
    properties: {
      profile1: {
        title: 'Profile 1',
        type: 'boolean',
        order: 1,
        default: false
      },
      profile2: {
        title: 'Profile 2',
        type: 'boolean',
        order: 2,
        default: false
      },
      profile3: {
        title: 'Profile 3',
        type: 'boolean',
        order: 3,
        default: false
      },
      profile4: {
        title: 'Profile 4',
        type: 'boolean',
        order: 4,
        default: false
      },
      profile5: {
        title: 'Profile 5',
        type: 'boolean',
        order: 5,
        default: false
      },
      profile6: {
        title: 'Profile 6',
        type: 'boolean',
        order: 6,
        default: false
      },
      profile7: {
        title: 'Profile 7',
        type: 'boolean',
        order: 7,
        default: false
      },
      profile8: {
        title: 'Profile 8',
        type: 'boolean',
        order: 8,
        default: false
      },
      profile9: {
        title: 'Profile 9',
        type: 'boolean',
        order: 9,
        default: false
      },
      profile10: {
        title: 'Profile 10',
        type: 'boolean',
        order: 10,
        default: false
      },

    }
  }

};
