if [ $# -ne 1 ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

wget --mirror --convert-links --adjust-extension --page-requisites --no-parent "$1"


