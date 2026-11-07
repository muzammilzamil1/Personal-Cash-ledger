# Cash Ledger

A simple phone-friendly app to track a small personal cash reserve and a ledger with another person (for example, a father-in-law).

## What it does
- Shows the cash in your hand now.
- Keeps a separate ledger for each person.
- **Money out**: you lent money, or paid someone on his behalf.
- **Money in**: he gave you cash, or paid you back.
- Shows who owes whom after every entry.
- Makes a shareable ledger image (PNG).
- Backup and restore as a file.

## How to use
Open `index.html` in a browser. No install. Data is saved only in that browser, so use **Settings > Save backup** now and then.

## Install on iPhone
1. Turn on GitHub Pages for this repo: Settings > Pages > Deploy from branch > main > Save.
2. Wait one minute. Open `https://<username>.github.io/<repo>/` in **Safari** (not Chrome).
3. Tap the Share button, then **Add to Home Screen**, then **Add**.
4. Open it from the home screen icon. It works offline.

When the app is updated, change the version in `sw.js` (`cash-ledger-v1` to `v2`), so phones pick up the new files.

## Files
- `index.html` the screens
- `ledger.js` the balance maths
- `test.js` quick checks. Run `node test.js`

## Ideas for next versions
- Search and filter entries
- Date range for the shared image
- PDF statement
- Password lock
