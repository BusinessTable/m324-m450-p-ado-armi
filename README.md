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

### Test Coverage Report

| **File**             | **% Stmts** | **% Branch** | **% Funcs** | **% Lines** | **Uncovered Line #s**                |
|-----------------------|-------------|--------------|-------------|-------------|---------------------------------------|
| **All files**         | 95.87       | 89.28        | 82.14       | 95.87       |                                       |
| `CategoryFilter.jsx`  | 100         | 100          | 100         | 100         |                                       |
| `Header.jsx`          | 100         | 100          | 100         | 100         |                                       |
| `InputTodo.jsx`       | 95.04       | 100          | 62.5        | 95.04       | 16-17, 20-21, 28-29                  |
| `TodoContainer.jsx`   | 90.9        | 73.91        | 77.77       | 90.9        | 35-36, 41-42, 62-63, 82-83, 121-124  |
| `TodoItem.jsx`        | 100         | 100          | 100         | 100         |                                       |
| `TodosList.jsx`       | 100         | 100          | 100         | 100         |                                       |

### Test Suite Summary

- **Test Suites**: 4 passed, 4 total
- **Tests**: 30 passed, 30 total
- **Snapshots**: 0 total
- **Time**: 3.453 seconds


## **Testübersicht**

### **1. Unit Tests**

| **Komponente/Funktion**     | **Testfall**                                   | **Beschreibung**                                         | **Erwartetes Ergebnis**                                    |
|------------------------------|-----------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| **sortTodosByPriority**      | Sortiert Todos nach Priorität                 | Validierung der korrekten Reihenfolge (hoch, mittel, niedrig). | Todos werden in der Reihenfolge: Hoch > Mittel > Niedrig angezeigt. |
|                              | Verändert das ursprüngliche Todos-Array nicht | Sicherstellung der Unveränderlichkeit des Original-Arrays. | Das ursprüngliche Array bleibt unverändert.               |
|                              | Handhabt leeres Array                        | Prüfung auf Robustheit bei fehlenden Einträgen.         | Rückgabe eines leeren Arrays.                             |
|                              | Behandelt Todos mit gleicher Priorität        | Prüfung der Stabilität bei gleichen Prioritäten.        | Todos mit gleicher Priorität behalten ihre ursprüngliche Reihenfolge. |
| **filterTodosByCategory**    | Gibt alle Todos zurück, wenn Kategorie "All" ist | Validierung der vollständigen Ausgabe ohne Filter.      | Alle Todos werden ohne Filter zurückgegeben.              |
|                              | Filtert Todos nach ausgewählter Kategorie    | Überprüfung der Filterlogik.                           | Nur Todos der gewählten Kategorie werden zurückgegeben.   |
|                              | Sortiert Todos innerhalb einer Kategorie nach Datum | Sicherstellung der Sortierung nach Deadlines.         | Todos werden nach Datum sortiert, früheste Deadlines zuerst. |
|                              | Platzierung von Todos ohne Deadlines am Ende | Validierung der Deadlines-Sortierung.                  | Todos ohne Deadlines erscheinen am Ende der Liste.        |
|                              | Sortiert Todos nach Priorität bei fehlenden Deadlines | Sicherstellung der Sortierung nach Priorität.        | Todos werden nach Priorität sortiert, wenn keine Deadlines vorhanden sind. |
|                              | Gibt leeres Array zurück, wenn keine Todos zur Kategorie passen | Prüfung der korrekten Ausgabe bei leeren Ergebnissen. | Rückgabe eines leeren Arrays.                             |
|                              | Handhabt leeres Todos-Array                  | Überprüfung der Funktionalität bei fehlenden Todos.    | Rückgabe eines leeren Arrays.                             |

---

### **2. Integration Tests**

| **Komponente**              | **Testfall**                                                                 | **Beschreibung**                                         | **Erwartetes Ergebnis**                                    |
|------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| **InputTodo Component**      | Rendern von Eingabefeldern und Buttons                                      | Überprüfung, ob alle Elemente korrekt angezeigt werden. | Alle Eingabefelder und Buttons werden korrekt gerendert.  |
|                              | Fügt keine Aufgabe hinzu, wenn Eingabe leer ist                            | Validierung der Eingabeüberprüfung.                     | Keine Aufgabe wird hinzugefügt, wenn das Eingabefeld leer ist. |
|                              | Hinzufügen einer neuen Kategorie                                           | Dynamisches Management von Kategorien.                 | Die neue Kategorie wird der Kategorienliste hinzugefügt.  |
|                              | Fügt keine Kategorie hinzu, wenn Eingabe leer ist                          | Validierung der Eingabeüberprüfung für Kategorien.      | Keine Kategorie wird hinzugefügt, wenn das Eingabefeld leer ist. |
|                              | Dynamisches Rendern von Kategorien                                         | Überprüfung, ob Kategorien korrekt aktualisiert werden. | Die neu hinzugefügte Kategorie erscheint in der Dropdown-Liste. |
| **TodoItem Component**       | Rendern eines Todo-Items mit Details                                       | Sicherstellung der korrekten Anzeige von Details.       | Das Todo-Item zeigt den Titel, die Priorität, die Kategorie und das Fälligkeitsdatum korrekt an. |
|                              | Markiert Aufgabe als erledigt                                              | Überprüfung der Checkbox-Funktionalität.               | Die Aufgabe wird als "erledigt" markiert, wenn die Checkbox aktiviert ist. |
|                              | Löscht Aufgabe                                                             | Validierung der Löschfunktion.                         | Die Aufgabe wird aus der Liste entfernt.                  |
|                              | Ermöglicht Bearbeiten des Titels                                           | Überprüfung der Editierbarkeit des Titels.             | Der Titel des Todos wird erfolgreich aktualisiert.        |
|                              | Ändert Kategorie der Aufgabe                                              | Sicherstellung der Kategoriewechselfunktion.           | Die neue Kategorie wird dem Todo zugewiesen.              |
|                              | Hebt bald fällige Aufgaben hervor                                          | Überprüfung der visuellen Markierung für Deadlines.    | Die Aufgabe wird rot markiert, wenn sie innerhalb von 24 Stunden fällig ist. |
|                              | Hebt nicht bald fällige Aufgaben nicht hervor                              | Validierung der korrekten visuellen Darstellung.       | Die Aufgabe bleibt unverändert, wenn sie nicht bald fällig ist. |

---

### **3. End-to-End Tests**

| **Komponente**              | **Testfall**                                                                 | **Beschreibung**                                         | **Erwartetes Ergebnis**                                    |
|------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| **TodoContainer Component**  | Initialzustand rendern                                                      | Sicherstellung der korrekten Startbedingungen.          | Die Standardkategorien ("All", "Work", "Personal", "Shopping") und leere Todos werden angezeigt. |
|                              | Hinzufügen eines neuen Todos                                               | Überprüfung der Hinzufüge-Funktionalität.              | Das neue Todo erscheint in der Liste mit den korrekten Details. |
|                              | Umschalten des Todo-Status                                                 | Validierung der Änderungsfunktion für "erledigt".       | Der Status des Todos wechselt zwischen "erledigt" und "nicht erledigt". |
|                              | Aktualisieren der Kategorie eines Todos                                    | Sicherstellung der Kategoriewechselfunktion.           | Die neue Kategorie wird dem Todo korrekt zugewiesen.      |
|                              | Filtern von Todos nach Kategorie                                           | Überprüfung der Filterlogik.                           | Nur Todos der ausgewählten Kategorie werden angezeigt.    |
|                              | Speichern von Todos in localStorage                                        | Validierung der Speicherfunktion.                      | Die Todos werden erfolgreich im localStorage gespeichert. |
|                              | Laden von Todos aus localStorage                                           | Sicherstellung der Ladefunktion.                       | Die Todos werden beim Laden der Seite aus dem localStorage geladen. |

| **Komponente**              | **Testfall**                                                                 | **Beschreibung**                                         | **Erwartetes Ergebnis**                                    |
|------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| **TodoContainer Component**  | Initialzustand rendern                                                      | Sicherstellung der korrekten Startbedingungen.          | Die Standardkategorien ("All", "Work", "Personal", "Shopping") und leere Todos werden angezeigt. |
|                              | Hinzufügen eines neuen Todos                                               | Überprüfung der Hinzufüge-Funktionalität.              | Das neue Todo erscheint in der Liste mit den korrekten Details. |
|                              | Umschalten des Todo-Status                                                 | Validierung der Änderungsfunktion für "erledigt".       | Der Status des Todos wechselt zwischen "erledigt" und "nicht erledigt". |
|                              | Aktualisieren der Kategorie eines Todos                                    | Sicherstellung der Kategoriewechselfunktion.           | Die neue Kategorie wird dem Todo korrekt zugewiesen.      |
|                              | Filtern von Todos nach Kategorie                                           | Überprüfung der Filterlogik.                           | Nur Todos der ausgewählten Kategorie werden angezeigt.    |
|                              | Speichern von Todos in localStorage                                        | Validierung der Speicherfunktion.                      | Die Todos werden erfolgreich im localStorage gespeichert. |
|                              | Laden von Todos aus localStorage                                           | Sicherstellung der Ladefunktion.                       | Die Todos werden beim Laden der Seite aus dem localStorage geladen. |


| **Komponente**              | **Testfall**                                                                 | **Beschreibung**                                         | **Erwartetes Ergebnis**                                    |
|------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------------------------|
| **TodoContainer Component**  | Initialzustand rendern                                                      | Sicherstellung der korrekten Startbedingungen.          | Die Standardkategorien ("All", "Work", "Personal", "Shopping") und leere Todos werden angezeigt. |
|                              | Hinzufügen eines neuen Todos                                               | Überprüfung der Hinzufüge-Funktionalität.              | Das neue Todo erscheint in der Liste mit den korrekten Details. |
|                              | Umschalten des Todo-Status                                                 | Validierung der Änderungsfunktion für "erledigt".       | Der Status des Todos wechselt zwischen "erledigt" und "nicht erledigt". |
|                              | Aktualisieren der Kategorie eines Todos                                    | Sicherstellung der Kategoriewechselfunktion.           | Die neue Kategorie wird dem Todo korrekt zugewiesen.      |
|                              | Filtern von Todos nach Kategorie                                           | Überprüfung der Filterlogik.                           | Nur Todos der ausgewählten Kategorie werden angezeigt.    |
|                              | Speichern von Todos in localStorage                                        | Validierung der Speicherfunktion.                      | Die Todos werden erfolgreich im localStorage gespeichert. |
|                              | Laden von Todos aus localStorage                                           | Sicherstellung der Ladefunktion.                       | Die Todos werden beim Laden der Seite aus dem localStorage geladen. |

---

## **Zusammenfassung**
- **Unit Tests:** 4 Tests auf Funktionsebene.
- **Integration Tests:** 12 Tests für Interaktionen zwischen Komponenten.
- **End-to-End Tests:** 7 Tests für vollständige Benutzerinteraktionen.

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
