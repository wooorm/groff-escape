#
# Script to generate a unicode > groff mapping.
#

GLYPH_PATH="data.cpp"
OUT_PATH="data.txt"

if [[ ! -e "$GLYPH_PATH" ]]; then
  git clone git://git.savannah.gnu.org/groff.git
  cp "groff/src/libs/libgroff/uniglyph.cpp" "$GLYPH_PATH"
  rm -rf groff
fi

> "$OUT_PATH"

echo "unicode	glyph" >> "$OUT_PATH"

grep -Eow "  \{[^\}]+\},?" < "$GLYPH_PATH" |
  sed 's/  { "//' |
  sed 's/" },//' |
  sed 's/", "/	/' >> "$OUT_PATH"

# Continue on in Node.
node build.js
