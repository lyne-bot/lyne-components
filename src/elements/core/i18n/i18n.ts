import type { SbbLanguage, SbbOccupancy } from '../interfaces.js';

export const i18nDirection: Record<string, string> = {
  de: 'Richtung',
  en: 'Direction',
  fr: 'Direction',
  it: 'Direzione',
};

export const i18nArrival: Record<string, string> = {
  de: 'Ankunft',
  en: 'Arrival',
  fr: 'Arrivée',
  it: 'Arrivo',
};

export const i18nSector: Record<string, string> = {
  de: 'Sektor',
  en: 'Sector',
  fr: 'Secteur',
  it: 'Settore',
};

export const i18nSectorShort: Record<string, string> = {
  de: 'Skt.',
  en: 'Sec.',
  fr: 'Sect.',
  it: 'Set.',
};

export const i18nClass: Record<string, Record<string, string>> = {
  first: {
    de: 'Erste Klasse',
    en: 'First Class',
    fr: 'Première classe',
    it: 'Prima classe',
  },
  second: {
    de: 'Zweite Klasse',
    en: 'Second Class',
    fr: 'Deuxième classe',
    it: 'Seconda classe',
  },
};

export const i18nTrain: Record<string, string> = {
  de: 'Zug',
  en: 'Train',
  fr: 'Train',
  it: 'Treno',
};

export const i18nTrains: Record<string, string> = {
  de: 'Züge',
  en: 'Trains',
  fr: 'Trains',
  it: 'Treni',
};

export const i18nWagonsLabel: Record<string, string> = {
  de: 'Wagen des Zuges',
  en: 'Coaches of the train',
  fr: 'Wagons de train',
  it: 'Carrozze del treno',
};

export const i18nWagonLabel: Record<string, string> = {
  de: 'Wagen',
  en: 'Train coach',
  fr: 'Wagon de train',
  it: 'Carrozza del treno',
};

export const i18nWagonLabelNumber: Record<string, string> = {
  de: `Nummer`,
  en: `Number`,
  fr: `Numéro`,
  it: `Numero`,
};

export const i18nClosedCompartmentLabel: Record<string, string> = {
  de: 'Geschlossener Zugwaggon',
  en: 'Closed train coach',
  fr: 'Wagon de train fermé',
  it: 'Carrozza del treno chiuso',
};

export const i18nLocomotiveLabel: Record<string, string> = {
  de: 'Lokomotive',
  en: 'Locomotive',
  fr: 'Locomotive',
  it: 'Locomotiva',
};

export const i18nSleepingWagonLabel: Record<string, string> = {
  de: 'Schlafwagen',
  en: 'Sleeping car',
  fr: 'Voiture-lits',
  it: 'Carrozza letti',
};

export const i18nCouchetteWagonLabel: Record<string, string> = {
  de: 'Liegewagen',
  en: 'Couchette car',
  fr: 'Voiture-couchettes',
  it: 'Carrozza cuccette',
};

export const i18nRestaurantWagonLabel: Record<string, string> = {
  de: 'Speisewagen',
  en: 'Dining car',
  fr: 'Voiture-restaurant',
  it: 'Carrozza ristorante',
};

export const i18nBlockedPassage: Record<string, Record<string, string>> = {
  previous: {
    de: 'Kein Durchgang zum vorherigen Wagen',
    en: 'No passage to the previous train coach',
    fr: 'Pas de passage au wagon du train précédent',
    it: 'Nessun passaggio alla carrozza del treno precedente',
  },
  next: {
    de: 'Kein Durchgang zum nächsten Wagen',
    en: 'No passage to the next train coach',
    fr: 'Pas de passage au wagon de train suivant',
    it: 'Nessun passaggio alla carrozza del treno successivo',
  },
  both: {
    de: 'Kein Durchgang zum nächsten und vorherigen Wagen',
    en: 'No passage to the next and previous train coach',
    fr: 'Pas de passage au wagon de train suivant et précédent',
    it: 'Nessun passaggio alla carrozza del treno successivo e precedente',
  },
};

export const i18nAdditionalWagonInformationHeading: Record<string, string> = {
  de: 'Zusätzliche Wageninformation',
  en: 'Additional wagon information',
  fr: 'Informations supplémentaires sur les wagons',
  it: 'Informazioni aggiuntive sulla carrozza del treno',
};

export const i18nDeparture: Record<string, string> = {
  de: 'Abfahrt',
  en: 'Departure',
  fr: 'Départ',
  it: 'Partenza',
};

export const i18nDurationMinute: Record<string, Record<string, Record<string, string>>> = {
  single: {
    long: {
      de: 'Minute',
      en: 'Minute',
      fr: 'Minute',
      it: 'Minuto',
    },
    short: {
      de: 'm',
      en: 'm',
      fr: 'm',
      it: 'm',
    },
  },
  multiple: {
    long: {
      de: 'Minuten',
      en: 'Minutes',
      fr: 'Minutes',
      it: 'Minuti',
    },
    short: {
      de: 'Min',
      en: 'min',
      fr: 'min.',
      it: 'mins',
    },
  },
};

export const i18nDurationHour: Record<string, Record<string, Record<string, string>>> = {
  single: {
    long: {
      de: 'Stunde',
      en: 'Hour',
      fr: 'Heure',
      it: 'Ora',
    },
    short: {
      de: 'Std.',
      en: 'h',
      fr: 'ore',
      it: 'hrs',
    },
  },
  multiple: {
    long: {
      de: 'Stunden',
      en: 'Hours',
      fr: 'Heures',
      it: 'Ore',
    },
    short: {
      de: 'Std.',
      en: 'h',
      fr: 'ore',
      it: 'hrs',
    },
  },
};

export const i18nDurationDay: Record<string, Record<string, Record<string, string>>> = {
  single: {
    long: {
      de: 'Tag',
      en: 'Day',
      fr: 'Jour',
      it: 'Giorno',
    },
  },
  multiple: {
    long: {
      de: 'Tage',
      en: 'Days',
      fr: 'Jours',
      it: 'Giorni',
    },
  },
};

export const i18nTripQuayChange: Record<string, string> = {
  de: 'Gleisänderung im Verlauf dieser Verbindung',
  en: 'Track change in the course of this connection',
  fr: 'Changement de voie sur le parcours de cette connexion',
  it: 'Cambiamento di binario nel corso di questa connessione',
};

export const i18nTripDuration: Record<string, string> = {
  de: 'Reisedauer',
  en: 'Travel time',
  fr: 'Durée du voyage',
  it: 'Durata del viaggio',
};

export const i18nTravelhints: Record<string, string> = {
  de: 'Reisehinweise',
  en: 'Travelhints',
  fr: 'Indications sur le voyage',
  it: 'Idiicazioni di viaggio',
};

export const i18nRealTimeInfo: Record<string, string> = {
  de: 'Echtzeitinformationen',
  en: 'Real time information',
  fr: 'Informations en temps réel',
  it: 'Informazioni in tempo reale',
};

export const i18nTransferProcedures: Record<string, string> = {
  de: 'mal umsteigen',
  en: 'changes',
  fr: 'changement(s) de train',
  it: 'cambi',
};

export const i18nNew: Record<string, string> = {
  de: 'neu',
  en: 'new',
  fr: 'nouveau',
  it: 'nuovo',
};

export const i18nFromPlatform: Record<string, string> = {
  de: 'Auf',
  en: 'on',
  fr: 'sur',
  it: 'su',
};

export const i18nSupersaver: Record<string, string> = {
  de: 'Sparbillette',
  en: 'Supersaver tickets',
  fr: 'Billets dégriffés',
  it: 'Biglietti risparmio',
};

export const i18nOccupancy: Record<SbbOccupancy, Record<SbbLanguage, string>> = {
  none: {
    de: 'Keine Belegungsprognose verfügbar',
    en: 'No occupancy forecast available',
    fr: "Aucune prévision d'occupation disponible",
    it: 'Nessuna previsione di occupazione disponibile',
  },
  low: {
    de: 'Tiefe bis mittlere Belegung erwartet',
    en: 'Low to medium occupancy expected',
    fr: "On s'attend à un taux d'occupation faible à moyen",
    it: "Si prevede un'occupazione medio-bassa",
  },
  medium: {
    de: 'Hohe Belegung erwartet',
    en: 'High occupancy expected',
    fr: "Un taux d'occupation élevé est attendu",
    it: "Ci si aspetta un'alta occupazione",
  },
  high: {
    de: 'Sehr hohe Belegung erwartet',
    en: 'Very high occupancy expected',
    fr: "Un taux d'occupation très élevé est attendu",
    it: "Ci si aspetta un'occupazione molto alta",
  },
};

export const i18nMeansOfTransport: Record<string, Record<string, string>> = {
  funicular: {
    de: 'Seilbahn/Zahnradbahn',
    en: 'Funicular/Cog railway',
    fr: 'Funiculaire/Chemin de fer à crémaillère',
    it: 'Funivia/Ferrovia a cremagliera',
  },
  ec_id: {
    de: 'EC/IC',
    en: 'EC/IC',
    fr: 'EC/IC',
    it: 'EC/IC',
  },
  bus: {
    de: 'Bus',
    en: 'Bus',
    fr: 'Bus',
    it: 'Bus',
  },
  re: {
    de: 'RE',
    en: 'RE',
    fr: 'RE',
    it: 'RE',
  },
  arz_ext: {
    de: 'ARZ/EXT',
    en: 'ARZ/EXT',
    fr: 'ARZ/EXT',
    it: 'ARZ/EXT',
  },
  ice_tgv_rjx: {
    de: 'ICE/TGV/RJX',
    en: 'ICE/TGV/RJX',
    fr: 'ICE/TGV/RJX',
    it: 'ICE/TGV/RJX',
  },
  ir_pe: {
    de: 'IR/PE',
    en: 'IR/PE',
    fr: 'IR/PE',
    it: 'IR/PE',
  },
  s_sn_r: {
    de: 'S/SN/R',
    en: 'S/SN/R',
    fr: 'S/SN/R',
    it: 'S/SN/R',
  },
  tramway: {
    de: 'Tram/Metro',
    en: 'Tramway/Underground',
    fr: 'Tram/Métro',
    it: 'Tram/Metro',
  },
  ship: {
    de: 'Schiff',
    en: 'Ship',
    fr: 'Bateau',
    it: 'Battello',
  },
  train: {
    de: 'Zug',
    en: 'Train',
    fr: 'Train',
    it: 'Treno',
  },
};

export const i18nOptional: Record<string, string> = {
  de: '(optional)',
  en: '(optional)',
  fr: '(facultatif)',
  it: '(facoltativo)',
};

export const i18nTargetOpensInNewWindow: Record<string, string> = {
  de: 'Linkziel öffnet in neuem Fenster.',
  en: 'Link target opens in a new window.',
  fr: "Le lien s'ouvre dans une nouvelle fenêtre.",
  it: "L'obiettivo del link si apre in una nuova finestra.",
};

export const i18nWalkingDistanceArrival: Record<string, string> = {
  de: 'Minuten Fussweg nach Ankunft:',
  en: 'minutes of walking time after arrival:',
  fr: 'minutes de trajet à pied après l’arrivée:',
  it: 'minuti a piedi all’arrivo:',
};

export const i18nWalkingDistanceDeparture: Record<string, string> = {
  de: 'Minuten Fussweg vor Abfahrt:',
  en: 'minutes of walking time before departure:',
  fr: 'minutes trajet à pied avant le départ:',
  it: 'minuti a piedi prima della partenza:',
};

export const i18nCloseAlert: Record<string, string> = {
  de: 'Meldung schliessen',
  en: 'Close message',
  fr: 'Fermer message',
  it: 'Chiudere il messaggio',
};

export const i18nCloseNotification: Record<string, string> = {
  de: 'Nachricht schliessen',
  en: 'Close message',
  fr: 'Fermer message',
  it: 'Chiudere il messaggio',
};

export const i18nDialog: Record<string, string> = {
  de: 'Dialog',
  en: 'Dialog',
  fr: 'Dialogue',
  it: 'Dialogo',
};

export const i18nCloseDialog: Record<string, string> = {
  de: 'Übergelagertes Fenster schliessen',
  en: 'Close secondary window',
  fr: 'Fermer la fenêtre superposée',
  it: 'Chiudere la finestra sovrapposta',
};

export const i18nCloseNavigation: Record<string, string> = {
  de: 'Navigation schliessen',
  en: 'Close navigation',
  fr: 'Fermer la navigation',
  it: 'Chiudere la navigazione',
};

export const i18nClosePopover: Record<string, string> = {
  de: 'Hinweis schliessen',
  en: 'Close note',
  fr: 'Fermer la note',
  it: 'Chiudere la nota',
};

export const i18nGoBack: Record<string, string> = {
  de: 'Zurück',
  en: 'Go back',
  fr: 'Retourner',
  it: 'Vai indietro',
};

export const i18nToday: Record<string, string> = {
  de: 'Heute',
  en: 'Today',
  fr: 'Aujourd’hui',
  it: 'Oggi',
};

export const i18nNextMonth: Record<string, string> = {
  de: 'Zum nächsten Monat wechseln',
  en: 'Change to the next month',
  fr: 'Passer au mois suivant',
  it: 'Passare al mese successivo',
};

export const i18nPreviousMonth: Record<string, string> = {
  de: 'Zum letzten Monat wechseln',
  en: 'Change to the previous month',
  fr: 'Passer au mois précédent',
  it: 'Passare al mese precedente',
};

export const i18nNextDay: Record<string, string> = {
  de: 'Nächster Tag',
  en: 'Next day',
  fr: 'Le prochain jour',
  it: 'Giorno successivo',
};

export const i18nPreviousDay: Record<string, string> = {
  de: 'Vorheriger Tag',
  en: 'Previous day',
  fr: 'Jour précédent',
  it: 'Giorno precedente',
};

export const i18nYearMonthSelection: Record<string, string> = {
  de: 'Jahr und Monat auswählen',
  en: 'Choose year and month',
  fr: "Choisissez l'année et le mois",
  it: 'Seleziona anno e mese',
};

export const i18nCalendarDateSelection: Record<string, string> = {
  de: 'Datum auswählen',
  en: 'Choose date',
  fr: 'Choisir une date',
  it: 'Seleziona una data',
};

export const i18nNextYearRange = (yearRange: number): Record<string, string> => ({
  de: `Wechsel zu den nächsten ${yearRange} Jahren`,
  en: `Change to the next ${yearRange} years`,
  fr: `Passer aux ${yearRange} prochaines années`,
  it: `Passare ai successivi ${yearRange} anni`,
});

export const i18nPreviousYearRange = (yearRange: number): Record<string, string> => ({
  de: `Wechsel zu den vorherigen ${yearRange} Jahren`,
  en: `Change to the previous ${yearRange} years`,
  fr: `Passage aux ${yearRange} précédentes années`,
  it: `Passare ai precedenti ${yearRange} anni`,
});

export const i18nNextYear: Record<string, string> = {
  de: 'Zum nächsten Jahr wechseln',
  en: 'Change to the next year',
  fr: "Passer à l'année suivante",
  it: "Passare all'anno successivo",
};

export const i18nPreviousYear: Record<string, string> = {
  de: 'Zum letzten Jahr wechseln',
  en: 'Change to the previous year',
  fr: "Passer à l'année précédent",
  it: "Passare all'anno precedente",
};

export const i18nSelectNextDay = (currentDate: string): Record<string, string> => ({
  de: `Zum nächsten Tag wechseln, derzeit ausgewählt ${currentDate}.`,
  en: `Change to the next day, currently selected ${currentDate}.`,
  fr: `Passer au jour suivant, actuellement sélectionné ${currentDate}.`,
  it: `Passare al giorno successivo, attualmente selezionato ${currentDate}.`,
});

export const i18nSelectPreviousDay = (currentDate: string): Record<string, string> => ({
  de: `Zum vorherigen Tag wechseln, derzeit ausgewählt ${currentDate}.`,
  en: `Change to the previous day, currently selected ${currentDate}.`,
  fr: `Passer au jour précédent, actuellement sélectionné ${currentDate}.`,
  it: `Passare al giorno precedente, attualmente selezionato ${currentDate}.`,
});

export const i18nShowCalendar: Record<string, string> = {
  de: 'Kalender anzeigen',
  en: 'Show calendar',
  fr: 'Afficher le calendrier',
  it: 'Visualizzare calendario',
};

export const i18nDatePickerPlaceholder: Record<string, string> = {
  de: 'TT.MM.JJJJ',
  en: 'DD.MM.YYYY',
  fr: 'JJ.MM.AAAA',
  it: 'GG.MM.AAAA',
};

export const i18nDateChangedTo: Record<string, string> = {
  de: 'Datum geändert auf',
  en: 'Date changed to',
  fr: 'Date modifiée au',
  it: 'Data modificata in',
};

export const i18nConnectionFrom: Record<string, string> = {
  de: 'Verbindung von',
  en: 'Connection from',
  fr: 'Liaison de',
  it: 'Collegamento da',
};

export const i18nConnectionTo: Record<string, string> = {
  de: 'nach',
  en: 'to',
  fr: 'à',
  it: 'a',
};

export const i18nConnectionRoundtrip = (returnCity: string): Record<string, string> => ({
  de: `und zurück nach ${returnCity}.`,
  en: `and back to ${returnCity}.`,
  fr: `et retour à ${returnCity}.`,
  it: `e ritorno a ${returnCity}.`,
});

export const i18nExpanded: Record<string, string> = {
  de: 'erweitert',
  en: 'expanded',
  fr: 'est tiré',
  it: 'esapnso',
};

export const i18nCollapsed: Record<string, string> = {
  de: 'reduziert',
  en: 'collapsed',
  fr: 'condensé',
  it: 'compresso',
};

export const i18nMapContainerButtonLabel: Record<string, string> = {
  de: 'Karte zeigen',
  en: 'Show map',
  fr: 'Afficher la carte',
  it: 'Mostra la mappa',
};

export const i18nBreadcrumbEllipsisButtonLabel: Record<string, string> = {
  de: 'Mehr Breadcrumbs anzeigen',
  en: 'Show more breadcrumbs',
  fr: 'Afficher plus breadcrumbs',
  it: 'Mostra più breadcrumbs',
};

export const i18nTimeInputChange: Record<string, string> = {
  de: 'Zeit geändert zu',
  en: 'Time changed to',
  fr: 'Heure modifiée:',
  it: 'Orario modificata alle',
};

export const i18nClearInput: Record<string, string> = {
  de: 'Feldinhalt löschen',
  en: 'Clear input value',
  fr: 'Effacer la valeur d’entrée',
  it: 'Cancella il valore dell’input',
};

export const i18nFlipCard: Record<string, string> = {
  de: 'Klicken Sie auf diese Karte für Details',
  en: 'Click on this card for details',
  fr: 'Cliquez sur cette carte pour plus de détails',
  it: 'Clicca su questa scheda per i dettagli',
};

export const i18nReverseCard: Record<string, string> = {
  de: 'Klicken Sie auf diese Karte, um zurück zur Zusammenfassung zu gelangen',
  en: 'Click on this card to go back to the summary',
  fr: 'Cliquez sur cette carte pour revenir au résumé',
  it: 'Clicca su questa scheda per tornare al sommario',
};

export const i18nFileSelectorButtonLabel: Record<string, string> = {
  de: 'Datei auswählen',
  en: 'Choose a file',
  fr: 'Choisissez un fichier',
  it: 'Scegli un file',
};

export const i18nFileSelectorSubtitleLabel: Record<string, string> = {
  de: 'Ziehe deine Dateien hier hin (Drag & Drop)',
  en: 'Drag & Drop your files here',
  fr: 'Faites glisser et déposez vos fichiers ici',
  it: 'Trascina e rilascia i tuoi file qui',
};

export const i18nFileSelectorDeleteFile: Record<string, string> = {
  de: 'Datei entfernen',
  en: 'Remove file',
  fr: 'Effacer le fichier',
  it: 'Rimuovi il file',
};

export const i18nFileSelectorCurrentlySelected = (filesName: string[]): Record<string, string> => {
  if (filesName && filesName.length > 0) {
    return {
      de: `Aktuell ausgewählte Datei: ${filesName.join(', ')}.`,
      en: `Currently selected files: ${filesName.join(', ')}.`,
      fr: `Fichier actuellement sélectionné: ${filesName.join(', ')}.`,
      it: `File attualmente selezionato: ${filesName.join(', ')}.`,
    };
  }
  return {
    de: 'Keine Datei ausgewählt.',
    en: 'No files selected.',
    fr: 'Nessun fichier sélectionné.',
    it: 'Nessun file selezionato.',
  };
};

export const i18nNextPage: Record<string, string> = {
  de: 'Nächste Seite',
  en: 'Next page',
  fr: 'Prochaine page',
  it: 'Pagina successiva',
};

export const i18nPreviousPage: Record<string, string> = {
  de: 'Vorherige Seite',
  en: 'Previous page',
  fr: 'Page précédente',
  it: 'Pagina precedente',
};

export const i18nPage: Record<string, string> = {
  de: 'Seite',
  en: 'Page',
  fr: 'Page',
  it: 'Pagina',
};

export const i18nItemsPerPage: Record<string, string> = {
  de: 'Einträge pro Seite',
  en: 'Items per page',
  fr: 'Entrées par page',
  it: 'Elementi per pagina',
};

export const i18nSelectedPage = (pageNumber: number): Record<string, string> => ({
  de: `Seite ${pageNumber} ausgewählt.`,
  en: `Page ${pageNumber} selected.`,
  fr: `Page ${pageNumber} sélectionnée.`,
  it: `Pagina ${pageNumber} selezionata.`,
});

export const i18nCheckboxRequired: Record<string, string> = {
  de: 'Muss gesetzt sein.',
  en: 'Must be checked.',
  fr: 'Doit être défini.',
  it: 'Deve essere impostato.',
};

export const i18nSelectionRequired: Record<string, string> = {
  de: 'Auswahl erforderlich.',
  en: 'Selection required.',
  fr: 'Sélection requise.',
  it: 'Selezione necessaria.',
};

// Usage example is "Remove ${chip label}“
export const i18nChipDelete: Record<string, string> = {
  de: 'Lösche',
  en: 'Remove',
  fr: 'Retire',
  it: 'Rimuovi',
};
