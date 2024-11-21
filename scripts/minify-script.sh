TARGET=$1
if [ $# -eq 0 ]; then
  echo "File unspecified!"
  exit 125
fi

MIN_FILE="${TARGET:0:-3}.min.js"

touch $MIN_FILE
> $MIN_FILE

MINI=$(uglifyjs -c -m -- $TARGET)

# HACK: Replace double quotes with single quotes caused by uglification
echo "${MINI/"\"{0}\""/"\\'{0}\\'"}" > $MIN_FILE