# Lazy Bookmark Opener

Lazy Bookmark Opener is a Firefox extension that changes how bookmark folders are opened. Instead of immediately loading every page, it creates lightweight placeholder tabs that only load their content when activated.

This reduces startup load time when working with large bookmark folders.

---

## What it does

When you right-click a bookmark folder, the extension adds an option:

**“Open with Lazy Bookmark Opener”**

Selecting it will:
- Open each bookmark in the folder as a placeholder tab
- Prevent immediate page loading
- Delay navigation until the tab is focused or activated
- Discard tabs after creation to reduce memory usage

---

## Core behavior

### 1. Lazy tab creation
Each bookmark is opened as a lightweight internal page instead of the target website.

This prevents:
- Network requests at startup
- CPU spikes from multiple pages loading at once
- Slowdowns when opening large folders

---

### 2. Deferred loading
Tabs initially display a placeholder state and only navigate to the actual URL when:
- The tab becomes visible
- The user switches to it

---

### 3. Automatic suspension
After all tabs are created, they are immediately discarded by the browser where possible. This keeps resource usage minimal while preserving tab state.

---

### 4. Folder-based operation
The extension only processes bookmarks inside the selected folder. Individual bookmarks are not treated as batch operations.

---

## Permissions used

- `bookmarks` → read bookmark folders and URLs
- `tabs` → create and manage tabs
- `contextMenus` → add right-click menu entry on bookmark folders

---

## Limitations

- Firefox does not allow true “unloaded tab creation” directly; placeholder tabs are used instead.
- Favicon display is derived from the target domain and may load externally depending on configuration.
- Tab ordering is best-effort and may vary slightly under heavy load.

---

## Intended use

This extension is designed for workflows involving:
- Large bookmark collections
- Batch research sessions
- Sequential tab processing
- Reducing startup overhead when opening many pages

## Icon Attribustions

Icon is a combination of the following icons from [Flaticon](https://www.flaticon.com/):
- [New window icons created by Grand Iconic - Flaticon](https://www.flaticon.com/free-icons/new-window)
- [Zzz icons created by POD Gladiator - Flaticon](https://www.flaticon.com/free-icons/zzz)
