## **Testkonzept**

### **Testziele**

1. Sicherstellen, dass Benutzer Aufgaben Prioritäten zuweisen, ändern und danach sortieren können.
2. Überprüfen, dass Benutzer Aufgaben Kategorien zuweisen, neue Kategorien erstellen und diese ändern können.

---

### **Teststrategie**

- **Testmethodik**: Black-Box-Tests mit Fokus auf funktionale Tests.
- **Testarten**:
  - **Unit-Tests**: Validierung der Kernlogik (z. B. Prioritäts- und Kategorienmanagement).
  - **Integrationstests**: Überprüfung der Zusammenarbeit zwischen Benutzeroberfläche und Backend.
  - **Akzeptanztests**: Validierung gegen die Akzeptanzkriterien der User Stories.
- **Testumgebung**:
  - Node.js-Version: 21
  - Zielplattform: Browser (Desktop/Mobile)
  - Tools: Jest, Cypress für automatisierte Tests.

---

### **Testfälle**

#### **User Story 1 – Aufgaben priorisieren**

| **Testfall-ID** | **Beschreibung** | **Eingaben** | **Erwartetes Ergebnis** |
|------------------|------------------|--------------|--------------------------|
| TC1-1 | Beim Erstellen einer Aufgabe kann der Benutzer eine Priorität auswählen. | Aufgabe: "Einkaufen", Priorität: Hoch | Aufgabe wird mit Priorität "Hoch" angezeigt. |
| TC1-2 | Priorität wird in der Aufgabenliste angezeigt. | Aufgabe: "Einkaufen", Priorität: Mittel | Aufgabenliste zeigt die Priorität "Mittel" korrekt an. |
| TC1-3 | Benutzer kann die Priorität einer bestehenden Aufgabe ändern. | Änderung: Priorität von Mittel auf Niedrig | Aufgabe zeigt aktualisierte Priorität "Niedrig". |
| TC1-4 | Aufgaben können nach Priorität sortiert werden. | Liste mit gemischten Prioritäten | Aufgabenliste zeigt Aufgaben in der Reihenfolge: Hoch > Mittel > Niedrig. |

#### **User Story 2 – Aufgaben in Kategorien einteilen**

| **Testfall-ID** | **Beschreibung** | **Eingaben** | **Erwartetes Ergebnis** |
|------------------|------------------|--------------|--------------------------|
| TC2-1 | Beim Erstellen einer Aufgabe kann der Benutzer eine Kategorie auswählen. | Aufgabe: "Arzttermin", Kategorie: Privat | Aufgabe wird mit Kategorie "Privat" angezeigt. |
| TC2-2 | Benutzer kann eine neue Kategorie erstellen. | Neue Kategorie: "Fitness" | Kategorie "Fitness" wird der Liste hinzugefügt. |
| TC2-3 | Kategorie wird in der Aufgabenliste angezeigt. | Aufgabe: "Kleidung kaufen", Kategorie: Einkäufe | Aufgabenliste zeigt die Kategorie "Einkäufe". |
| TC2-4 | Benutzer kann die Kategorie einer bestehenden Aufgabe ändern. | Änderung: Kategorie von "Privat" auf "Arbeit" | Aufgabe zeigt aktualisierte Kategorie "Arbeit". |

---

### **Priorisierung der Tests**

1. **Kritisch**: TC1-1, TC2-1, TC1-4 – Diese stellen die Kernfunktionen sicher.
2. **Hoch**: TC1-2, TC2-3 – Diese validieren die Anzeige von Daten.
3. **Mittel**: TC1-3, TC2-4 – Diese testen die Bearbeitungsmöglichkeiten.
4. **Optional**: TC2-2 – Validierung der Flexibilität, neue Kategorien zu erstellen.

---

### **Testmetriken**

- **Erfolgsrate**: Prozentsatz der Tests, die beim ersten Durchlauf erfolgreich bestanden werden.
- **Fehlerhäufigkeit**: Anzahl der entdeckten kritischen Fehler pro Testlauf.
- **Testabdeckung**: Prozentsatz der Akzeptanzkriterien, die durch Tests abgedeckt sind.

---

Dieses Testkonzept deckt die Akzeptanzkriterien der User Stories vollständig ab und stellt sicher, dass die Funktionen wie gewünscht implementiert sind.
