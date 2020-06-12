build:
	echo "url: ${DEPLOY_PRIME_URL}" >> _config_netlify.yml
	jekyll build --config _config.yml,_config_netlify.yml
