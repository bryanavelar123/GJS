#!/usr/bin/env bash
set -euo pipefail
mkdir -p diagnostics
APK=$(find downloaded-apk -type f -name '*.apk' -print -quit)
if [ -z "$APK" ]; then echo "APK ausente"; exit 2; fi
PACKAGE=com.gjs.moveisplanejados
echo "Instalando $APK"
adb install -r "$APK"
adb logcat -c
adb shell am force-stop "$PACKAGE" || true
echo "Iniciando $PACKAGE"
adb shell am start -W -n "$PACKAGE/.MainActivity" | tee diagnostics/launch.txt
echo "Aguardando 25 segundos para identificar falha de startup"
sleep 25
adb logcat -d -v threadtime > diagnostics/logcat.txt
adb shell dumpsys activity activities > diagnostics/activities.txt || true
adb shell screencap -p /sdcard/gjs-smoke.png || true
adb pull /sdcard/gjs-smoke.png diagnostics/screenshot.png || true
echo "Ocorrencias AndroidRuntime/ReactNative:"
grep -E -A 18 'FATAL EXCEPTION|AndroidRuntime:|ReactNativeJS:|Fatal signal|Error while updating property|Unable to load script' diagnostics/logcat.txt | tail -n 220 || true
PID=$(adb shell pidof "$PACKAGE" | tr -d '\r' || true)
echo "pidof: $PID" | tee diagnostics/result.txt
if [ -z "$PID" ]; then
  echo "ERRO: app fechou no emulador" | tee -a diagnostics/result.txt
  exit 1
fi
echo "OK: app permanece em execucao no emulador" | tee -a diagnostics/result.txt
