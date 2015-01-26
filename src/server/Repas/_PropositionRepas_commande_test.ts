import EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
import InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
import CommandDispatcher = require("../Infrastructure/__Implementations/CommandDispatcher");

import PropositionRepasPubliee = require("./Events/PropositionRepas/PropositionRepasPubliee");
import InformationsSecondairesPropositionRepasRenseignees = require("./Events/PropositionRepas/InformationsSecondairesPropositionRepasRenseignees");
import RenseignerInformationSecondairesPropositionRepas = require("./Commandes/PropositionRepas/RenseignerInformationSecondairesPropositionRepas");
import Infrastructure = require("../Infrastructure/Infrastructure");


import PropositionRepasDebutee = require("./Events/PropositionRepas/PropositionRepasDebutee");
import DebuterPropositionRepas = require("./Commandes/PropositionRepas/DebuterPropositionRepas");
import Libelle = require("./Immutables/PropositioRepas/Libelle");
import Immutables = require("../Immutables/Immutables");
import when = require("../when");
import RepasSagaRegistration = require("./Sagas/RepasSagaRegistration");

describe("Commandes >", () => {
    describe("Proposition repas >", () => {


        before((done) => {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            RepasSagaRegistration.registerSagas();

            done();
        });

        it("given un utilisateur existant when un utilisateur débute une proposition de repas, then une proposition de repas est débutée", (done) => {
            var utilisateurUuid = new Immutables.Guid();

            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = Helpers.debuterPropositionRepasPubliqueSansInvitation(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'));

            when.commande(debuterPropositionRepas).thenExpect(new PropositionRepasDebutee(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'), false, ''));

            done();
        });



        it("given une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then les informations secondaires de la proposition sont renseignés", (done) => {
            var utilisateurUuid = new Immutables.Guid();
            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = Helpers.debuterPropositionRepasPubliqueSansInvitation(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'));
            Helpers.executerCommande(debuterPropositionRepas);

            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);

            when.commande(renseignerInformationSecondairesPropositionRepas).thenExpect(new InformationsSecondairesPropositionRepasRenseignees(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true));
            done();
        });


        it("given une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then la proposition de repas est publiée", (done) => {
            var utilisateurUuid = new Immutables.Guid();
            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = Helpers.debuterPropositionRepasPubliqueSansInvitation(propositionRepasUuid, utilisateurUuid, new Libelle('Pizzicato'));
            Helpers.executerCommande(debuterPropositionRepas);

            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);

            when.commande(renseignerInformationSecondairesPropositionRepas).thenExpect(new PropositionRepasPubliee(propositionRepasUuid, new Libelle('Pizzicato'), new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true, false, ''));
            done();
        });

        after((done) => {
            done();
        });
    });
});

module Helpers {
    export function executerCommande(commande: Infrastructure.ICommande) {
        var commandeDispatcher = Infrastructure.ICommandDispatcher.getInstance();
        commandeDispatcher.dispatchCommand(commande);
    }
    export function debuterPropositionRepasPubliqueSansInvitation(commandeUuid: Immutables.Guid, utilisateurUuid, libelle: Libelle) {
        return new DebuterPropositionRepas(commandeUuid, utilisateurUuid, libelle, false, "");
    }
}