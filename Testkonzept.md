# **Testkonzept**

## **Testziele**

1. Sicherstellen, dass Benutzer Aufgaben mit Prioritäten und Kategorien erstellen, bearbeiten und sortieren können.
2. Validieren, dass die Fälligkeitsdaten korrekt verarbeitet und angezeigt werden.
3. Sicherstellen, dass die Benutzeroberfläche responsiv ist und korrekt reagiert.

---

### **Teststrategie**

- **Testmethodik**: Black-Box-Tests für Funktionalität und White-Box-Tests für Logik.
- **Testarten**:
  - **Unit-Tests**: Validierung der Kernlogik (z. B. Prioritäts- und Kategorienmanagement).
  - **Integrationstests**: Überprüfung der Zusammenarbeit zwischen Komponenten.
  - **Akzeptanztests**: Validierung gegen die User Stories.
  - **Visuelle Tests**: Überprüfung des Layouts und der Responsivität.
- **Testumgebung**:
  - Node.js-Version: 21
  - Zielplattform: Browser (Desktop/Mobile)
  - Tools: Jest, Cypress, React Testing Library.

---

### **Testfälle**

#### **User Story 1 – Aufgaben priorisieren**

| **Testfall-ID** | **Beschreibung**                                                                 | **Eingaben**                        | **Erwartetes Ergebnis**                                                                 |
|------------------|----------------------------------------------------------------------------------|-------------------------------------|-----------------------------------------------------------------------------------------|
| TC1-1           | Beim Erstellen einer Aufgabe kann der Benutzer eine Priorität auswählen.         | Aufgabe: "Einkaufen", Priorität: Hoch | Aufgabe wird in der Liste mit Priorität "Hoch" angezeigt.                               |
| TC1-2           | Priorität wird in der Aufgabenliste angezeigt.                                   | Aufgabe: "Einkaufen", Priorität: Mittel | Aufgabenliste zeigt die Priorität "Mittel" korrekt an.                                  |
| TC1-3           | Benutzer kann die Priorität einer bestehenden Aufgabe ändern.                    | Änderung: Priorität von Mittel auf Niedrig | Aufgabe zeigt aktualisierte Priorität "Niedrig".                                        |
| TC1-4           | Aufgaben können nach Priorität sortiert werden.                                  | Liste mit gemischten Prioritäten     | Aufgabenliste zeigt Aufgaben in der Reihenfolge: Hoch > Mittel > Niedrig.              |

---

#### **User Story 2 – Aufgaben in Kategorien einteilen**

| **Testfall-ID** | **Beschreibung**                                                                | **Eingaben**                        | **Erwartetes Ergebnis**                                                                 |
|------------------|---------------------------------------------------------------------------------|-------------------------------------|-----------------------------------------------------------------------------------------|
| TC2-1           | Beim Erstellen einer Aufgabe kann der Benutzer eine Kategorie auswählen.        | Aufgabe: "Arzttermin", Kategorie: Privat | Aufgabe wird in der Liste mit Kategorie "Privat" angezeigt.                            |
| TC2-2           | Benutzer kann eine neue Kategorie erstellen.                                    | Neue Kategorie: "Fitness"           | Kategorie "Fitness" wird der Liste hinzugefügt.                                         |
| TC2-3           | Kategorie wird in der Aufgabenliste angezeigt.                                  | Aufgabe: "Kleidung kaufen", Kategorie: Einkäufe | Aufgabenliste zeigt die Kategorie "Einkäufe".                                          |
| TC2-4           | Benutzer kann die Kategorie einer bestehenden Aufgabe ändern.                   | Änderung: Kategorie von "Privat" auf "Arbeit" | Aufgabe zeigt aktualisierte Kategorie "Arbeit".                                        |

---

#### **User Story 3 – Fälligkeitsdatum für Aufgaben setzen**

| **Testfall-ID** | **Beschreibung**                                                                | **Eingaben**                         | **Erwartetes Ergebnis**                                                                 |
|------------------|---------------------------------------------------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------|
| TC3-1           | Benutzer kann beim Erstellen einer Aufgabe ein Fälligkeitsdatum auswählen.      | Aufgabe: "Steuererklärung", Datum: 2025-01-15 | Aufgabe zeigt das Fälligkeitsdatum "15. Januar 2025".                                   |
| TC3-2           | Aufgaben mit Fälligkeitsdatum innerhalb der nächsten 24 Stunden werden markiert.| Aufgabe: "Bericht abschicken", Datum: Heute | Aufgabe wird farblich hervorgehoben.                                                   |
| TC3-3           | Aufgaben werden nach Fälligkeitsdatum sortiert.                                 | Liste mit gemischten Fälligkeitsdaten| Aufgabenliste zeigt Aufgaben in der Reihenfolge der Deadlines.                         |

---

#### **Technische Tests**

| **Testfall-ID** | **Beschreibung**                                           | **Eingaben** | **Erwartetes Ergebnis**                         |
|------------------|----------------------------------------------------------|--------------|------------------------------------------------|
| TC4-1           | Caching von `node_modules` und `.next` zwischen Builds.    | Keine        | Workflow speichert Cache und nutzt ihn wieder. |
| TC4-2           | Rendering auf mobilen Geräten.                             | Bildschirm: 375px Breite | Layout passt sich responsiv an und bleibt funktional. |
| TC4-3           | Fehlermeldung bei ungültigen Eingaben.                      | Leeres Feld  | Benutzer sieht eine klare Fehlermeldung.       |

---

### **Priorisierung der Tests**

| **Priorität** | **Testfälle**                                                                 |
|---------------|------------------------------------------------------------------------------|
| Kritisch      | TC1-1, TC2-1, TC3-1, TC3-2, TC1-4                                           |
| Hoch          | TC1-2, TC2-3, TC3-3, TC2-4                                                 |
| Mittel        | TC1-3, TC2-2, TC4-1                                                        |
| Optional      | TC4-2, TC4-3                                                               |

---

### **Testmetriken**

1. **Erfolgsrate:** Prozentsatz der Tests, die beim ersten Durchlauf erfolgreich sind.
2. **Abdeckung:** Mindestens 80% der Funktionen müssen durch Tests abgedeckt sein.
3. **Fehleranalyse:** Identifizierung und Klassifizierung der Fehler (kritisch, hoch, mittel, niedrig).

---

### **Zusammenfassung**

Mit diesem Testkonzept wird sichergestellt, dass alle wichtigen Funktionen der Todo-App korrekt funktionieren. Der Fokus liegt auf:

- **Unit-Tests:** Validierung von Kernfunktionen.
- **Integrationstests:** Zusammenarbeit zwischen Komponenten.
- **Akzeptanztests:** Validierung gegen Benutzeranforderungen.

Dieses Konzept garantiert eine robuste und zuverlässige Anwendung, die alle Benutzeranforderungen erfüllt. 😊
