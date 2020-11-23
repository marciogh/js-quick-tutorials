set -euxo pipefail
docker run --name users-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 mysql