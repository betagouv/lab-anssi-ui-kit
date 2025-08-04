#!/bin/bash

extension() {
  local file_name="$1"
  local extension
  extension=$(echo "$file_name" | sed -e 's:.*\.\([^.]*\)$:\1:')
  echo "$extension"
}

mime_type() {
  local file="$1"
  local ext
  ext="$(extension "$file")"

  case $ext in
    js)    echo text/javascript
           ;;
    css)   echo text/css
           ;;
    html)  echo text/html
           ;;
    woff)  echo font/woff
           ;;
    woff2) echo font/woff
           ;;
    scg)   echo image/svg+xml
           ;;
    *)     file --mime-type $file | cut -d: -f2 | tr -d ' '
  esac
}

for file in $(find storybook-static -type f)
do
  mime="$(mime_type "$file")"
  target="$(echo "$file" | sed -e s:^storybook-static/::)"
  s3cmd put "$file" "s3://lab-anssi-ui-kit-dev/$target" --mime-type="$mime"
done
