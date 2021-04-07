build:
	@if [ "${CONTEXT}" = "production" ]; then\
		echo "url: ${URL}" > _config_netlify.yml;\
	else\
		echo "url: ${DEPLOY_PRIME_URL}" > _config_netlify.yml;\
	fi
	jekyll build --config _config.yml,_config_netlify.yml

link:
	./scripts/make-post.js link

post:
	./scripts/make-post.js post

reading:
	./scripts/make-post.js reading
