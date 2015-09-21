var localeval = Npm.require('localeval');

PackageModel = function PackageModel (packageJsCodeHopefully) {
  var packageModel = {
    description: {},
    versionsFrom: null,
    coreDeps: {
      uses: {},
      implies: {}
    },
    externalDeps: {
      uses: {},
      implies: {}
    },
    files: {},
    exports: {}
  };

  var mockApi = {
    depType: function (nameAndVersion) {
      return nameAndVersion.indexOf(":") > -1 ? "external" : "core";
    },
    parseNameAndVersion: function (nameAndVersion) {
      return {
        name: nameAndVersion.indexOf("@") > -1 ? nameAndVersion.substring(0, nameAndVersion.indexOf("@")) : nameAndVersion,
        versionSpec: nameAndVersion.indexOf("@") > -1 ? nameAndVersion.substring(nameAndVersion.indexOf("@")) : null,
        versionNum: nameAndVersion.indexOf("@") > -1 ? nameAndVersion.replace(/^[a-zA-Z0-9:-]+@(=)?/ig, '') : null,
        versionIsExact: (nameAndVersion.indexOf("@=") > -1)
      };
    },
    use: function (nameAndVersion, arch, options) {
      if( _.isObject(arch) && ! _.isArray(arch)){ // passing options as the 2nd param, omitting arch
        options=arch; arch = undefined;
      }
      var packageNamesAndVersions = _.isArray(nameAndVersion) ? nameAndVersion : Array(nameAndVersion);

      packageNamesAndVersions.forEach(function (nameAndVersion) {
        var section = packageModel[mockApi.depType(nameAndVersion) + "Deps"];
        var versionInfo = mockApi.parseNameAndVersion(nameAndVersion);
        section.uses[versionInfo.name] = _.extend(versionInfo, {
          arch: _.isArray(arch) ? arch : (arch && Array(arch)),
          options: options
        });
      });
    },
    imply: function (nameAndVersion, arch, options) {
      var section = packageModel[this.depType(nameAndVersion) + "Deps"];
      var versionInfo = this.parseNameAndVersion(nameAndVersion);
      section.implies[versionInfo.name] = versionInfo;
    },
    addFiles: function (filename, arch) {
      packageModel.files[filename] = _.extend({}, {
        arch: arch && Array(arch)
      })
    },
    versionsFrom: function(versionsFrom) {
      packageModel.versionsFrom = versionsFrom;
    },
    export: function(exportedName, arch) {
      packageModel.exports[exportedName] = _.extend({}, {
        arch: arch && Array(arch)
      })
    }
  };

  var env = {
    Package: {
      describe: function (x) {
        packageModel.description = x;
      },
      onUse: function (definitionFn) {
        definitionFn.call({}, mockApi);
      },
      onTest: function (testFn) {
        ; //noop for now
      },
      getModel: function () {
        return packageModel;
      }
  }};

  var result = localeval(packageJsCodeHopefully + '; Package.getModel()', env);
  try{
    localeval.clear();
  } catch(err) {
    if (err.toString()!="TypeError: Cannot call method 'kill' of undefined")
      console.log(err);
  }
  _.extend(this, result || {});
}
