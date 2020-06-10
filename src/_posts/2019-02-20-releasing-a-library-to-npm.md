---
layout: post
title:  "Releasing a Library to NPM"
date:   2019-02-20 18:30:00+02:00
category: "code"
body_id: blog
description: Automating releases to NPM
---

Releasing software packages to a registry makes me nervous. My ideal workflow for releasing a library to [npm](https://www.npmjs.com/) involves several steps:

1. Bump the version number, 
2. Create builds (if they are committed to the repository),
3. Commit the changes, 
4. Create a Git tag, and 
5. Publish the build to the registry. 

Chances are, I forget one of these steps or I would carry them out in the wrong order. Fortunately, there are tools available to reduce the workload involved. You can combine them to a build pipeline that suits your needs.

For shipping software to NPM, [`npm-version`](https://docs.npmjs.com/cli/version.html) gets you almost all the way to publish software using just one command. Used out-of-the-box, `npm-version` bumps the package’s version number and creates a commit and a git tag with the same version. `npm-version` also comes with additional scripts, which you can use to do additional things:

- `preversion` runs before the version is bumped. I use it to check if we’re trying to publish from `master`; otherwise, the script exits with an error. Other people use it to run tests or linting. 
- `version` runs right after the version is bumped but before the version is committed. Normally, it’s used to create the builds.
- `postversion` runs after the version commit. You clean up the file system here or push the commit and tags to the Git repository. 

The set up I’m using with `Leaflet.Deflate` looks like this:

```json
{
  "scripts": {
    "preversion": "if [[ \"$(git rev-parse --abbrev-ref HEAD)\" != \"master\" ]]; then echo \"Not on master\" && exit 1; fi",
    "version": "npm run dist && git add -A ./dist",
    "postversion": "git push && git push --tags"
  }
}
```

Before the publication to NPM, I like to double-check that the build is OK on a clean machine. I hand off the publication of the release to TravisCI, which runs the tests before publishing. Then TravisCI [releases](https://docs.travis-ci.com/user/deployment/npm/) the package to NPM. 

For cases when I don't stick to the process and create a tag manually on the GitHub website I added checks to verify that the version number matches the Git tag and that the build files are committed:

```sh
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
if [[ "$PACKAGE_VERSION" != "$TRAVIS_TAG" ]]; then
  echo "Git and NPM versions do not match. Have you updated package.json?"
  exit 1
fi;

npm run build
if [[ $(git diff) ]]; then
  echo "Looks like you haven't committed the new build yet."
  exit 1
fi;
```
