import CompteUtilisateurOuvert = require("../Administration/Events/Utilisateurs/CompteUtilisateurOuvert");
import Login = require("../Administration/Immutables/Utilisateur/Login");

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
import TestThat = require("../TestThat");

import RepasSagaRegistration = require("./Sagas/RepasSagaRegistration");

describe("Commandes >", () => {
    describe("Proposition repas >", () => {

        var UTILISATEUR_TEST = new Immutables.Guid();

      

        before((done) => {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());

            RepasSagaRegistration.registerSagas();

            done();
        });

        it("given un utilisateur existant when un utilisateur débute une proposition de repas, then une proposition de repas est débutée", (done) => {

            var propositionRepasUuid = new Immutables.Guid();
            var debuterPropositionRepas = new DebuterPropositionRepas(propositionRepasUuid, UTILISATEUR_TEST, new Libelle('Pizzicato'), false, '');
            TestThat.given(unUtilisateurExistant())
                .when(debuterPropositionRepas)
                .then(new PropositionRepasDebutee(propositionRepasUuid, UTILISATEUR_TEST, new Libelle('Pizzicato'), false, ''), done);
        });



        it("given un utilisateur créé et une une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then les informations secondaires de la proposition sont renseignés", (done) => {
            var propositionRepasUuid = new Immutables.Guid();
            
            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);

            TestThat.given(unUtilisateurExistant())
                .and(unePropositionDeRepasDebutee(propositionRepasUuid, new Libelle('Pizzicato')))
                .when(renseignerInformationSecondairesPropositionRepas)
                .then(new InformationsSecondairesPropositionRepasRenseignees(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true), done);
        });


        it("given un utilisateur créé  et une proposition de repas débutée when un utilisateur renseigne les informations secondaires de la proposition, then la proposition de repas est publiée", (done) => {
            var propositionRepasUuid = new Immutables.Guid();
            var renseignerInformationSecondairesPropositionRepas = new RenseignerInformationSecondairesPropositionRepas(propositionRepasUuid, new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true);

            TestThat.given(unUtilisateurExistant())
                .and(unePropositionDeRepasDebutee(propositionRepasUuid, new Libelle('Pizzicato')))
                .when(renseignerInformationSecondairesPropositionRepas)
                .then(new PropositionRepasPubliee(propositionRepasUuid, new Libelle('Pizzicato'), new Immutables.Description('Ma description plus complète'), new Immutables.Heure(11, 30), new Immutables.Euros(7.90), true, false, ''), done);
        });

        after((done) => {
            done();
        });

        function unUtilisateurExistant(): Infrastructure.IEvent[] {
            return [new CompteUtilisateurOuvert(UTILISATEUR_TEST, new Login("utilisateurTest"))];
        };

        function unePropositionDeRepasDebutee(propositionRepasUuid: Immutables.Guid, libelle: Libelle): Infrastructure.IEvent[] {
            return [new PropositionRepasDebutee(propositionRepasUuid, UTILISATEUR_TEST, libelle, false, '')];
        };

    });
});