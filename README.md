# Projektbericht

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.


## Special thanks to codewanderlust - Roy Jumah
Roy Jumah is a writer focused on psychology, lifestyle & culture, sports, and sometimes delves into software development and technology trends.

from cypress-tutorial
https://github.com/codewanderlust/cypress-tutorial

## GitHub Workflow für Todo App

Dieser Workflow führt automatisch Tests, Linting und das Deployment für die Todo App aus, wenn ein Commit auf den `main`-Branch gepusht wird.

---

## Übersicht der Jobs

### 1. **Build**

- **Zweck:** Baut die Anwendung und speichert das Build-Resultat.
- **Schritte:**
  - **Code auschecken:** Lädt den aktuellen Code aus dem Repository.
  - **Node.js einrichten:** Installiert die benötigte Node.js-Version (21).
  - **Abhängigkeiten installieren:** Führt `npm ci` aus, um alle Abhängigkeiten sauber zu installieren.
  - **Bauen der Anwendung:** Führt `npm run build` aus, um die App zu bauen.
  - **Caching:**
    - Speichert die `node_modules`, `.next`, und den `out`-Ordner für Wiederverwendung in anderen Jobs.
  - **Export prüfen:** Überprüft, ob der `out`-Ordner korrekt erstellt wurde.

---

### 2. **Linting**

- **Zweck:** Überprüft den Code auf Syntax- und Stilfehler.
- **Abhängigkeit:** Startet erst, wenn der Build-Job erfolgreich abgeschlossen wurde.
- **Schritte:**
  - **Code auschecken:** Lädt den aktuellen Code aus dem Repository.
  - **Node.js einrichten:** Installiert die benötigte Node.js-Version (21).
  - **Abhängigkeiten installieren:** Führt `npm ci` aus.
  - **Linting ausführen:** Führt `npm run lint` aus, um den Code zu prüfen.

---

### 3. **Testing**

- **Zweck:** Führt automatische Tests aus und speichert die Testergebnisse.
- **Abhängigkeit:** Startet erst, wenn der Build-Job erfolgreich abgeschlossen wurde.
- **Schritte:**
  - **Code auschecken:** Lädt den aktuellen Code aus dem Repository.
  - **Node.js einrichten:** Installiert die benötigte Node.js-Version (21).
  - **Abhängigkeiten installieren:** Führt `npm ci` aus.
  - **Tests ausführen:** Führt `npm test` aus und generiert JUnit-kompatible Testberichte.
  - **Testberichte hochladen:** Speichert die Berichte als Artefakte, die über die GitHub Actions-Oberfläche abrufbar sind.

---

### 4. **Deploy**

- **Zweck:** Veröffentlicht die Anwendung auf GitHub Pages.
- **Abhängigkeit:** Startet erst, wenn Linting und Testing erfolgreich abgeschlossen wurden.
- **Schritte:**
  - **Code auschecken:** Lädt den aktuellen Code aus dem Repository.
  - **Build-Ergebnisse wiederherstellen:** Lädt den gecachten `out`-Ordner.
  - **Deployment prüfen:** Überprüft, ob der `out`-Ordner existiert.
  - **Veröffentlichung:** Deployt die Anwendung aus dem `out`-Ordner auf GitHub Pages.

---

## Wichtige Punkte

- **Caching:** Der Workflow speichert und verwendet gecachte Dateien (`node_modules`, `.next`, und `out`), um die Ausführung zu beschleunigen.
- **JUnit-Testberichte:** Testergebnisse werden als Artefakte hochgeladen und können in der GitHub Actions-Oberfläche eingesehen werden.
- **Deployment:** Die Anwendung wird auf GitHub Pages veröffentlicht, sodass sie öffentlich zugänglich ist.

---

## Beispiele

- **Wo finde ich Testberichte?**
  - Testberichte sind unter **Artifacts** in den GitHub Actions-Workflows verfügbar.
- **Wie überprüfe ich das Deployment?**
  - Die Anwendung ist unter `https://businesstable.github.io/m324-m450-p-ado-armi/` verfügbar.
