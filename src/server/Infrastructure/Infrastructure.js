(function (AggregateType) {
    AggregateType[AggregateType["CompteUtilisateur"] = 0] = "CompteUtilisateur";
    AggregateType[AggregateType["PropositionRepas"] = 1] = "PropositionRepas";
})(exports.AggregateType || (exports.AggregateType = {}));
var AggregateType = exports.AggregateType;

(function (CommandeType) {
    CommandeType[CommandeType["OuvrirCompteUtilisateur"] = 0] = "OuvrirCompteUtilisateur";
    CommandeType[CommandeType["DebuterPropositionRepas"] = 1] = "DebuterPropositionRepas";
    CommandeType[CommandeType["RenseignerInformationSecondairesPropositionRepas"] = 2] = "RenseignerInformationSecondairesPropositionRepas";
    CommandeType[CommandeType["PublierPropositionRepas"] = 3] = "PublierPropositionRepas";
})(exports.CommandeType || (exports.CommandeType = {}));
var CommandeType = exports.CommandeType;

(function (EventType) {
    EventType[EventType["CompteUtilisateurOuvert"] = 0] = "CompteUtilisateurOuvert";
    EventType[EventType["PropositionRepasDebutee"] = 1] = "PropositionRepasDebutee";
    EventType[EventType["InformationsSecondairesPropositionRepasRenseignees"] = 2] = "InformationsSecondairesPropositionRepasRenseignees";
    EventType[EventType["PropositionRepasPubliee"] = 3] = "PropositionRepasPubliee";
})(exports.EventType || (exports.EventType = {}));
var EventType = exports.EventType;
