# Projektbericht

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo App

Wie haben die Aufgabe erhalten, für die Module 450 und 324 eine Todo-App zu erstellen. Die App soll es Benutzern ermöglichen, Aufgaben zu erstellen, zu priorisieren, in Kategorien einzuteilen und Fälligkeitsdaten festzulegen. Die App soll auch Filter- und Sortierfunktionen für die Aufgabenliste bieten.

Kernpunkte waren Das TEsting und die CI/CD Pipeline.
Diese Punkte haben wir hier im Projektbericht zusammengefasst.

So sieht die Todo-App aus:

![alt text](image.png)

## **Inhaltsverzeichnis**

1. [Einleitung](#projektbericht)
2. [Inhaltsverzeichnis](#inhaltsverzeichnis)
3. [Testing](#testing)
4. [Übersicht aller erstellten Tests](#übersicht-aller-erstellten-tests)
    - [Unit Tests](#unit-tests)
    - [Integration Tests](#integration-tests)
    - [End-to-End Tests](#end-to-end-tests)
5. [Manuelle Tests](#manuelle-tests)
    - [Akzeptanztests](#akzeptanztests)
    - [Visuelle Tests](#visuelle-tests)
6. [Zusammenfassung des Testings](#zusammenfassung-des-testings)
7. [GitHub Workflow für Todo App](#github-workflow-für-todo-app)
    - [Übersicht der Jobs](#übersicht-der-jobs)
      - [Build](#build)
      - [Linting](#linting)
      - [Testing](#testing-1)
      - [Deploy](#deploy)
    - [Wichtige Punkte](#wichtige-punkte)
    - [Beispiele](#beispiele)

## Testing

| **File**              | **% Stmts** | **% Branch** | **% Funcs** | **% Lines** | **Uncovered Line #s**                   |
|-----------------------|-------------|--------------|-------------|-------------|-----------------------------------------|
| **All files**         | 88          | 86.2         | 76.66       | 88          |                                         |
| **app**               | 0           | 0            | 0           | 0           |                                         |
| layout.jsx            | 0           | 0            | 0           | 0           | 1-28                                    |
| page.jsx              | 0           | 0            | 0           | 0           | 1-11                                    |
| **app/components**    | 95.87       | 89.28        | 82.14       | 95.87       |                                         |
| CategoryFilter.jsx    | 100         | 100          | 100         | 100         |                                         |
| Header.jsx            | 100         | 100          | 100         | 100         |                                         |
| InputTodo.jsx         | 95.04       | 100          | 62.5        | 95.04       | 16-17,20-21,28-29                       |
| TodoContainer.jsx     | 90.9        | 73.91        | 77.77       | 90.9        | 35-36,41-42,62-63,82-83,121-124         |
| TodoItem.jsx          | 100         | 100          | 100         | 100         |                                         |
| TodosList.jsx         | 100         | 100          | 100         | 100         |                                         |

## **Übersicht aller erstellten Tests**

### **Unit Tests**

Diese Tests überprüfen die korrekte Funktionalität einzelner Funktionen oder Komponenten in Isolation.

| **Test ID** | **Komponente/Modul**       | **Testname**                                               | **Beschreibung**                                                                                       |
|-------------|----------------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| UT1         | `TodoContainer`           | `Initializes todos from localStorage`                     | Überprüft, ob die Todos korrekt aus `localStorage` geladen werden.                                   |
| UT2         | `TodoContainer`           | `Toggles todo completion`                                 | Verifiziert, dass der Status einer Aufgabe erfolgreich geändert wird (erledigt/offen).               |
| UT3         | `TodoContainer`           | `Deletes a todo`                                          | Prüft, ob eine Aufgabe korrekt aus der Liste entfernt wird.                                          |
| UT4         | `TodoContainer`           | `Adds a new todo`                                         | Validiert das Hinzufügen einer neuen Aufgabe mit Titel, Priorität, Kategorie und Fälligkeitsdatum.   |
| UT5         | `TodoContainer`           | `Updates a todo's category`                               | Überprüft, ob die Kategorie einer Aufgabe korrekt aktualisiert wird.                                |
| UT6         | `TodoContainer`           | `Filters todos by category`                               | Testet die Filterfunktion basierend auf der ausgewählten Kategorie.                                  |
| UT7         | `TodoContainer`           | `Sorts todos by due date and priority`                    | Prüft, ob Aufgaben korrekt nach Fälligkeitsdatum und Priorität sortiert werden.                     |
| UT8         | `TodoContainer`           | `Adds a new category`                                     | Überprüft, ob eine neue Kategorie korrekt zur Liste hinzugefügt wird.                               |
| UT9         | `InputTodo`               | `Adds a task with a new category`                         | Validiert, ob eine Aufgabe mit einer neuen Kategorie hinzugefügt wird.                              |
| UT10        | `CategoryFilter`          | `Changes selected category`                               | Prüft, ob das Wechseln der Filterkategorie korrekt funktioniert.                                    |

---

### **Integration Tests**

Diese Tests überprüfen die Interaktion zwischen verschiedenen Komponenten und Modulen.

| **Test ID** | **Komponente/Modul**       | **Testname**                                               | **Beschreibung**                                                                                       |
|-------------|----------------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| IT1         | `TodoContainer`           | `Renders TodoContainer with initial state`                | Überprüft, ob alle Kindkomponenten korrekt mit Standardwerten gerendert werden.                       |
| IT2         | `InputTodo` + `TodosList` | `Adds a new todo and displays it`                         | Testet die Interaktion zwischen `InputTodo` und `TodosList` beim Hinzufügen und Anzeigen neuer Aufgaben. |
| IT3         | `CategoryFilter` + `TodosList` | `Filters todos by category`                              | Validiert, ob Aufgaben basierend auf der ausgewählten Kategorie korrekt gefiltert werden.             |
| IT4         | `TodosList` + `TodoContainer` | `Toggles todo completion state`                          | Überprüft die Interaktion zwischen der Aufgabenliste und der Statusänderungsfunktion.                |
| IT5         | `TodosList` + `TodoContainer` | `Deletes a todo from the list`                           | Verifiziert, dass das Löschen einer Aufgabe aus der Liste korrekt funktioniert.                      |
| IT6         | `InputTodo` + `TodoContainer` | `Adds a new category and assigns to todo`                | Überprüft, ob eine neue Kategorie hinzugefügt und korrekt zu einer Aufgabe zugewiesen wird.          |
| IT7         | `TodoContainer`           | `Sorts todos by priority and due date`                    | Validiert die Sortierung und Anzeige der Aufgaben nach Priorität und Fälligkeitsdatum.               |

---

### **End-to-End Tests**

Diese Tests simulieren vollständige Benutzerinteraktionen und überprüfen das Verhalten der gesamten Anwendung.

| **Test ID** | **Komponente/Modul**       | **Testname**                                               | **Beschreibung**                                                                                       |
|-------------|----------------------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| E2E1        | Gesamtanwendung           | `Complete workflow of adding, filtering, and deleting todos` | Simuliert den gesamten Workflow: Aufgaben hinzufügen, nach Kategorien filtern und Aufgaben löschen. |

---

### **Zusammenfassung**

Die Tests wurden nach den folgenden Prinzipien entwickelt:

1. **Unit Tests** validieren die isolierte Logik einzelner Funktionen oder Komponenten.
2. **Integration Tests** stellen sicher, dass Komponenten zusammen korrekt arbeiten.
3. **End-to-End Tests** überprüfen das Benutzerverhalten über die gesamte Anwendung.

## Manuelle Tests

### Akzeptanztests

Die Akzeptanzkriterien der User Stories wurden manuell getestet:

#### User Story 1 – Aufgaben priorisieren

- Aufgaben können mit Prioritäten erstellt und sortiert werden.
- Prioritäten werden korrekt angezeigt und können geändert werden.

#### User Story 2 – Aufgaben in Kategorien einteilen

- Kategorien können zugewiesen, geändert und neu erstellt werden.
- Aufgaben werden korrekt nach Kategorien gefiltert.

#### User Story 3 – Fälligkeitsdatum setzen

- Aufgaben zeigen Fälligkeitsdaten an.
- Aufgaben werden korrekt nach Fälligkeitsdatum und Priorität sortiert.

### Visuelle Tests

- Layout: Alle Elemente wurden auf korrekte Platzierung und Konsistenz überprüft.
- Responsive Design: Die Anwendung wurde auf unterschiedlichen Bildschirmgrößen getestet.
- Farbliche Markierung: Aufgaben mit baldigen Deadlines wurden farblich hervorgehoben.

## Zusammenfassung des Testings

- Automatisierte Tests: 80%+ Testabdeckung mit Unit, Integration und End-to-End-Tests.
- Manuelle Tests: Alle Akzeptanzkriterien erfüllt; visuelles Layout geprüft.
- Ergebnis: Die Anwendung erfüllt funktionale und visuelle Anforderungen vollständig.

# GitHub Workflow für Todo App

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
