var CompteUtilisateurOuvert = require("../Administration/Events/Utilisateurs/CompteUtilisateurOuvert");
var Login = require("../Administration/Immutables/Utilisateur/Login");
var EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
var InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
var CommandDispatcher = require("../Infrastructure/__Implementations/CommandDispatcher");
var PropositionRepasPubliee = require("./Events/PropositionRepas/PropositionRepasPubliee");
var InformationsSecondairesPropositionRepasRenseignees = require("./Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
var RenseignerInformationSecondairesPropositionRepas = require("./Commandes/PropositionRepas/RenseignerInformationSecondairesPropositionRepas");
var Infrastructure = require("../Infrastructure/Infrastructure");
var PropositionRepasDebutee = require("./Events/PropositionRepas/PropositionRepasDebutee");
var DebuterPropositionRepas = require("./Commandes/PropositionRepas/DebuterPropositionRepas");
var Libelle = require("./Immutables/PropositioRepas/Libelle");
var Immutables = require("../Immutables/Immutables");
var TestThat = require("../TestThat");
var RepasSagaRegistration = require("./Sagas/RepasSagaRegistration");
describe("Commandes >", function () {
    describe("Proposition repas >", function () {
        var UTILISATEUR_TEST = new Immutables.Guid();
        before(function (done) {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());
            RepasSagaRegistration.registerSagas();
            done();
        });
        it("given un utilisateur existant when un utilisateur débute une proposition de repas, then une proposition de repas est débutée", function (done) {
            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = new DebuterPropositionRepas(propositionRepasUuid, UTILISATEUR_TEST, new Libelle('Pizzicato'), false, '');
            TestThat.given(unUtilisateurExistant()).when(debuterPropositionRepas).then(new PropositionRepasDebutee(propositionRepasUuid, UTILISATEUR_TEST, new Libelle('Pizzicato'), false, ''), done);
        });
        it("given un utilisateur créé et une une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then les informations secondaires de la proposition sont renseignés", function (done) {
            var propositionRepasUuid = new Immutables.Guid();
            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);
            TestThat.given(unUtilisateurExistant()).and(unePropositionDeRepasDebutee(propositionRepasUuid, new Libelle('Pizzicato'))).when(renseignerInformationSecondairesPropositionRepas).then(new InformationsSecondairesPropositionRepasRenseignees(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true), done);
        });
        it("given un utilisateur créé  et une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then la proposition de repas est publiée", function (done) {
            var propositionRepasUuid = new Immutables.Guid();
            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);
            TestThat.given(unUtilisateurExistant()).and(unePropositionDeRepasDebutee(propositionRepasUuid, new Libelle('Pizzicato'))).when(renseignerInformationSecondairesPropositionRepas).then(new PropositionRepasPubliee(propositionRepasUuid, new Libelle('Pizzicato'), new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true, false, ''), done);
        });
        after(function (done) {
            done();
        });
        function unUtilisateurExistant() {
            return [new CompteUtilisateurOuvert(UTILISATEUR_TEST, new Login("utilisateurTest"))];
        }
        ;
        function unePropositionDeRepasDebutee(propositionRepasUuid, libelle) {
            return [new PropositionRepasDebutee(propositionRepasUuid, UTILISATEUR_TEST, libelle, false, '')];
        }
        ;
    });
});
