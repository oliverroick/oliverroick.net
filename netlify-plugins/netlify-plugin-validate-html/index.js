module.exports = {
  onPostBuild: async ({ utils, inputs }) => {
    try {
      await utils.run(
        './netlify-plugins/netlify-plugin-validate-html/node_modules/.bin/html-validate',
        [
          ...inputs.config
            ? ['--config', inputs.config]
            : [],
          ...[
            '--ext', inputs.ext,
            '_site'
          ]
        ]
      );
    } catch (error) {
      if (error.exitCode === 1) {
        return utils.build.failPlugin('Invalid HTML');
      }
      return utils.build.failPlugin('Unknown error', { error });
    }
  }
};
