set -euxo pipefail
docker exec -i users-mysql mysql mysql -uroot -pmy-secret-pw <<< "select * from Users;"