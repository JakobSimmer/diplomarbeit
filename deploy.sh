echo "START DEPLOY"
git pull
cd web
echo "BUILDING DOCKER"
docker compose up -d
if [$? -neq 0]; then
    echo "Error: docker compose failed"
fi 