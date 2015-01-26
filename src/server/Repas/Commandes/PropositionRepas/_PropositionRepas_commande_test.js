var EventDispatcher = require("../../../Infrastructure/__Implementations/EventDispatcher");
var InMemoryEventRepository = require("../../../Infrastructure/__Implementations/InMemoryEventRepository");
var CommandDispatcher = require("../../../Infrastructure/__Implementations/CommandDispatcher");

var PropositionRepasPubliee = require("../../Events/PropositionRepas/PropositionRepasPubliee");
var InformationsSecondairesPropositionRepasRenseignees = require("../../Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
var RenseignerInformationSecondairesPropositionRepas = require("./RenseignerInformationSecondairesPropositionRepas");
var Infrastructure = require("../../../Infrastructure/Infrastructure");

var PropositionRepasDebutee = require("../../Events/PropositionRepas/PropositionRepasDebutee");
var DebuterPropositionRepas = require("./DebuterPropositionRepas");
var Libelle = require("../../Immutables/PropositioRepas/Libelle");
var Immutables = require("../../../Immutables/Immutables");
var when = require("../../../when");
var RepasSagaRegistration = require("../../Sagas/RepasSagaRegistration");

describe("Commandes >", function () {
    describe("Proposition repas >", function () {
        before(function (done) {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            RepasSagaRegistration.registerSagas();

            done();
        });

        it("given un utilisateur existant when un utilisateur débute une proposition de repas, then une proposition de repas est débutée", function (done) {
            var utilisateurUuid = new Immutables.Guid();

            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = Helpers.debuterPropositionRepasPubliqueSansInvitation(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'));

            when.commande(debuterPropositionRepas).thenExpect(new PropositionRepasDebutee(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'), false, ''));

            done();
        });

        it("given une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then les informations secondaires de la proposition sont renseignés", function (done) {
            var utilisateurUuid = new Immutables.Guid();
            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = Helpers.debuterPropositionRepasPubliqueSansInvitation(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'));
            Helpers.executerCommande(debuterPropositionRepas);

            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);

            when.commande(renseignerInformationSecondairesPropositionRepas).thenExpect(new InformationsSecondairesPropositionRepasRenseignees(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true));
            done();
        });

        it("given une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then la proposition de repas est publiée", function (done) {
            var utilisateurUuid = new Immutables.Guid();
            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = Helpers.debuterPropositionRepasPubliqueSansInvitation(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'));
            Helpers.executerCommande(debuterPropositionRepas);

            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);

            when.commande(renseignerInformationSecondairesPropositionRepas).thenExpect(new PropositionRepasPubliee(propositionRepasUuid, new Libelle('Pizzicato'), new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true, false, ''));
            done();
        });

        after(function (done) {
            done();
        });
    });
});

var Helpers;
(function (Helpers) {
    function executerCommande(commande) {
        var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandeDispatcher.dispatchCommand(commande);
    }
    Helpers.executerCommande = executerCommande;
    function debuterPropositionRepasPubliqueSansInvitation(commandeUuid, utilisateurUuid, libelle) {
        return new DebuterPropositionRepas(commandeUuid, utilisateurUuid, libelle, false, "");
    }
    Helpers.debuterPropositionRepasPubliqueSansInvitation = debuterPropositionRepasPubliqueSansInvitation;
})(Helpers || (Helpers = {}));
