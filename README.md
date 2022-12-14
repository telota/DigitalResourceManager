# Digitaler Ressourcen Manager  

Das Corpus Vitrearum Medii Aevi (CVMA) Deutschland ist ein interakademisches Forschungsvorhaben mit  Arbeitsstellen in Freiburg (AdWL) und Potsdam (BBAW) sowie als Teil des Internationalen Corpus Vitrearum Participant der NFDI4Culture. Seine Aufgaben sind die Erfassung und Erschließung mittelalterlicher Glasmalereien in Deutschland. Nach wissenschaftlichen Grundsätzen erstellte fotografische Aufnahmen bilden die Basis der Dokumentations- und Erschließungsarbeit. Sie werden neben der Veröffentlichung in  Corpusbänden als nachnutzbare Forschungsdaten auf der Website des CVMA Deutschland publiziert (http://corpusvitrearum.de) und mit Metadaten angereichert. 2015 wurde durch die Arbeitsstellen des CVMA, die Digitale Akademie Mainz und TELOTA - IT/DH der BBAW eine XMP-Spezifikation für die Annotation der Digitalisate verabschiedet (https://corpusvitrearum.de/cvma-digital/spezifikationen/cvma-xmp/11.html).   

Der CVMA Digitaler Ressourcen Manager (DRM) wird seit 2021 als Arbeitsinstrument für die Erfassung, Modellierung und Recherche von wissenschaftlichen Bildbeständen entwickelt. Als Ergebnis des Testens existierender DAM sowie im Zuge der Diskussionen der Community wurde deutlich, dass im Bereich der wissenschaftlichen Verarbeitung von Bilddaten Desiderate bestehen. Das gilt besonders für die Thematik der Verarbeitung von XMP, aber auch darüber hinaus.Dazu gehören Defizite in der Anzeige und Durchsuchbarkeit von XMP-Metadaten ebenso wie die Anpassbarkeit an eigene Spezifikationen und die Möglichkeit, kontrollierte Vokabulare einzufügen. Ein weiteres Themenfeld ist die Verarbeitung großer Bilddateien. Viele Tools müssen deshalb lokal ausgeführt werden, was kollaboratives Arbeiten erschwert und permanente Datentransfers und komplexe Backupstrategien erfordert.  

CVMA und TELOTA entwickeln eine webbasierte Lösung, die sämtliche Komponenten von der Serververknüpfung über die Verwaltung und Visualisierung der Daten bis hin zur für die Benutzer:innen sichtbaren Bearbeitungsoberfläche und Suchfunktion vereint. Schon in der jetzigen Entwicklungsphase zeigt sich, dass eine in sich konsistente Gesamtlösung für die Softwarekomponenten sehr effizient ist. Die Bilddaten sind zentral abgelegt. Die zugehörigen Metadaten sind sowohl im Bild als auch in JSON-Filialdateien als menschen- und maschinenlesbare Dateien synchronisiert gespeichert. Die JSON-Dateien ermöglichen einen effizienten und ressourcenschonenden Zugriff auf die Metadaten. Auf die Bedürfnisse des CVMA hin wurden zudem verschiedene Funktionalitäten der wissenschaftlichen Bildverwaltung implementiert (Details s. u.).  Der DRM ist jedoch anpassbar auf andere Dateiformate, z.B. auch 3D-Daten.  

Die Konfiguration des DRM wird niedrigschwellig über extern einzulesende Dateien gestaltet. Anpassungen der Anzeige entsprechend eigener Bedürfnisse, das Erstellen von Auswahllisten und eine Einbindung von kontrolliertem Vokabular lassen sich so realisieren. Durch Veränderung der Serververknüpfungen kann der DRM auf jedem Server laufen.   

Da sowohl der komplette Quellcode als auch die verwendeten Bibliotheken frei verfügbar sind, können diese an die Anforderungen Dritter angepasst werden. Der Quellcode wird auch in Git-Repositorien publiziert und ermöglicht so eine gemeinsame Weiterentwicklung. Bisher existiert eine Entwickleroberfläche. 

## Mitmachen

Bei Fragen und Anregungen gerne an Gordon Fischer (gfischer@bbaw.de) oder Anja Gerber (anja.gerber@bbaw.de) schreiben. 

## Lizenzen Programmcode und Dokumentation

© Berlin-Brandenburgische Akademie der Wissenschaften 2021

* Programmcode: LGPL 3.0
* Dokumentation: CC BY 4.0
