# Changelog

## 2.0.1
### Bug fixes
- Load config after args is parsed #27

## 2.0.0
- Support for checking the letter Ё (`--check-yo` or `checkYo: true`).
- Dictionary of `.yaspellerrc` and specified on the command line are used together.
- Setting `fileExtensions` is not used for checking one file (`yaspeller -l ru my_file.txt`).
- Added report `error_dictionary` for the collection of typos in files.

## 1.1.0
- Use settings `excludeFiles` and `fileExtensions` for checking one file.
- Support for regular expressions #18.
- Fixed detection format #19.

## 1.0.6
- Update deps in package.json.
- Added changelog.

## 1.0.5
### Bug fixes
- Fix file protocol in html report.

## 1.0.4
### Bug fixes
- npm: Fix LF.

## 1.0.3
### Bug fixes
- Crash of Yaspeller when try Habrahabr url #22.

## 1.0.2
Initial public release.
