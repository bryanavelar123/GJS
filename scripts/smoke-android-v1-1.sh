#!/usr/bin/env bash
set -euo pipefail
mkdir -p diagnostics
APK=$(find android/app/build/outputs/apk/release -name '*.apk' -type f -print -quit)
if [ -z "$APK" ]; then echo "APK não encontrado"; exit 2; fi
PKG=com.gjs.moveisplanejados
adb install -r "$APK"
adb logcat -c
adb shell am force-stop "$PKG" || true
adb shell am start -W -n "$PKG/.MainActivity" | tee diagnostics/launch.txt
sleep 35
adb logcat -d -v threadtime > diagnostics/logcat.txt
adb shell dumpsys activity activities > diagnostics/activities.txt || true
adb shell screencap -p /sdcard/gjs-smoke.png || true
adb pull /sdcard/gjs-smoke.png diagnostics/screenshot.png || true
echo "Erros críticos após iniciar:"
grep -E -A 15 'FATAL EXCEPTION|AndroidRuntime:|ReactNativeJS:|Fatal signal|Unable to load script' diagnostics/logcat.txt | tail -n 150 || true
PID=$(adb shell pidof "$PKG" | tr -d '\r' || true)
echo "pidof: $PID" | tee diagnostics/result.txt
if [ -z "$PID" ]; then
  echo "FALHA: GJS fecha sozinho ao iniciar." | tee -a diagnostics/result.txt
  exit 1
fi
echo "OK: GJS permanece em execução após 35 segundos." | tee -a diagnostics/result.txt
