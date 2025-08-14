build-apk:
	@echo "starting local Android build..."
	npx expo prebuild
	cd android && ./gradlew assembleRelease
	@echo "Build complete. APK should be in android/app/build/outputs/apk/release/"

clean-android:
	@echo "Cleaning Android build files..."
	cd android && ./gradlew clean
	@echo "Android build files cleaned."