var EventDispatcher = require("../Infrastructure/__Implementations/EventDispatcher");
var InMemoryEventRepository = require("../Infrastructure/__Implementations/InMemoryEventRepository");
var CommandDispatcher = require("./../Infrastructure/__Implementations/CommandDispatcher");
var Infrastructure = require("./../Infrastructure/Infrastructure");
var Login = require("./Immutables/Utilisateur/Login");
var Immutables = require("./../Immutables/Immutables");
var OuvrirCompteUtilisateur = require("./Commandes/Utilisateurs/OuvrirCompteUtilisateur");
var CompteUtilisateurOuvert = require("./Events/Utilisateurs/CompteUtilisateurOuvert");
var TestThat = require("../TestThat");
describe("Commandes >", function () {
    describe("Utilisateurs >", function () {
        var ID_UTILISATEUR = new Immutables.Guid();
        before(function (done) {
            Infrastructure.ServiceInjection.injectServices(new EventDispatcher(), new InMemoryEventRepository(), new CommandDispatcher());
            done();
        });
        it("when un administrateur souhaite ouvrir un nouveau compte, then un nouveau compte est créé", function (done) {
            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(ID_UTILISATEUR, new Login("chalteje"));
            TestThat.when(ouvrirCompteUtilisateur).then(new CompteUtilisateurOuvert(ID_UTILISATEUR, new Login("chalteje")), done);
        });
        it("given un compte utilisateur déjà existant, when un administrateur tente de réouvrir ce compte, then une erreur lui est renvoyée", function (done) {
            var ouvrirCompteUtilisateur = new OuvrirCompteUtilisateur(ID_UTILISATEUR, new Login("chalteje"));
            TestThat.given(unCompteUtilisateurOuvert(new Login("chalteje"))).when(ouvrirCompteUtilisateur).thenItFails(done);
        });
        function unCompteUtilisateurOuvert(login) {
            return [
                new CompteUtilisateurOuvert(ID_UTILISATEUR, login)
            ];
        }
        after(function (done) {
            done();
        });
    });
});
