#!/bin/bash
# Android TWA build: generate project from twa.config.json → Gradle bundleRelease + assembleRelease → sign
#   → out/<slug>-<versionName>-upload.aab (Play upload) and out/<slug>-<versionName>-test.apk (sideload test)
# Usage: bash build.sh <versionCode> <versionName>
# Folder layout (keep it OUT of public repos — keys live here):
#   <work>/build.sh, gen.js, twa.config.json, package.json (@bubblewrap/core)
#   <work>/keys/upload.keystore + keys/upload_password.txt   (made once with keytool, sent to the owner as a zip)
#   ANDROID_HOME=<sdk with platforms;android-36, build-tools;36.0.0>, JDK 17–21, Gradle 8.x (see packaging-android.md)
set -e
VC=${1:?versionCode}; VN=${2:?versionName}
W="$(cd "$(dirname "$0")" && pwd)"; cd "$W"
: "${ANDROID_HOME:?set ANDROID_HOME to the Android SDK}"
SLUG=$(node -p "require('./twa.config.json').packageId.split('.').pop()")
node -e "const f='./twa.config.json',c=require(f);c.versionCode=$VC;c.versionName='$VN';require('fs').writeFileSync(f,JSON.stringify(c,null,1))"
[ -d node_modules/@bubblewrap/core ] || npm i --no-audit --no-fund @bubblewrap/core@1.27.0
node gen.js twa.config.json "$W/project"
cd "$W/project"
echo "sdk.dir=$ANDROID_HOME" > local.properties
GRADLE=${GRADLE:-$(command -v gradle || echo /opt/gradle/bin/gradle)}
nice -n 15 "$GRADLE" --no-daemon -q bundleRelease assembleRelease 2>&1 | grep -v "JAVA_TOOL\|warning: \[options\]\|^3 warnings" || true
K="$W/keys"; O="$W/out"; BT=$(ls -d "$ANDROID_HOME"/build-tools/* | sort -V | tail -1)
PW=$(cat "$K/upload_password.txt"); mkdir -p "$O"
cp app/build/outputs/bundle/release/app-release.aab "$O/$SLUG-$VN-upload.aab"
jarsigner -keystore "$K/upload.keystore" -storepass "$PW" -keypass "$PW" -sigalg SHA256withRSA -digestalg SHA-256 "$O/$SLUG-$VN-upload.aab" upload >/dev/null
jarsigner -verify "$O/$SLUG-$VN-upload.aab" | grep -q "jar verified" || { echo "FAIL: aab signature"; exit 1; }
"$BT/zipalign" -f -p 4 app/build/outputs/apk/release/app-release-unsigned.apk "$O/aligned.apk"
"$BT/apksigner" sign --ks "$K/upload.keystore" --ks-key-alias upload --ks-pass pass:"$PW" --key-pass pass:"$PW" --out "$O/$SLUG-$VN-test.apk" "$O/aligned.apk"
rm -f "$O/aligned.apk"
"$BT/apksigner" verify --print-certs "$O/$SLUG-$VN-test.apk" | grep "SHA-256"      # must match assetlinks.json
"$BT/aapt2" dump badging "$O/$SLUG-$VN-test.apk" | grep -E "^package|targetSdk|application-label:"
ls -la "$O"
