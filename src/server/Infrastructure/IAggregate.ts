import Guid = require("../Shared/Immutables/Guid");
import IEvent = require("../Events/Base/IEvent");
import ICommande = require("../Commandes/Base/ICommande");
export = IAggregate;
interface IAggregate {

    handleCommande(commande: ICommande);

    handleEvent(event: IEvent);
    
    popEventsToCommit(): Array<IEvent>;


}