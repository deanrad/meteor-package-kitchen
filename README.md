# deanius:package-kitchen

Scaffolds out a new package, giving it to you as

* source code on screen
* a Zip file
* (NEW) a local package installed into your app


Step into the Package Kitchen to whip up your next Meteor package!

[TOC]

## Online Usage

Go to http://package-kitchen.meteor.com, and input the specifics of the package you want to build. You can then download a ZIP of your package, and  follow the installation instructions on the site.

## 1. Using to extend an Application you are currently building

Add Package Kitchen to your application:

`meteor add deanius:package-kitchen`

Then navigate to `/kitchen` within your application. Next, scaffold out your package, then click "Save Package to App".

You will receive an error upon Save if:

  - There is already a local package by that name
  - The package name conflicts with one already listed in `.meteor/packages` (e.g. `iron:router`)

## 2. Running as an Application Locally

You can spin up the app (as it deployed on http://package-kitchen.meteor.com), by running `npm start`.
or, if you're old school, `cd example; meteor`.

The example folder contains copies of all the templates, rather than referencing
the atmosphere version.

## Further Reference
[The Full Meteor Docs on Packages](http://docs.meteor.com/#/full/packagedefinition)

The last [Packages Tutorial](http://themeteorchef.com/recipes/writing-a-package/) you'll ever need, by [@TheMeteorChef](http://twitter.com/themeteorchef)

## Specifying Dependencies


You must specify dependencies if:

  * Your package must use the services of another (`api.use`)
  * You want to load additional functionality into the app that includes your package (`api.imply`)

### Meteor Packages

Add the packages to the first `api.use([])` call, or add additional calls


### Npm

Use `Npm.depend({"package": "1.0.0"})`

## Publishing Your Package

TODO link to notes on how to do this.
