import Infrastructure = require("../../Infrastructure/Infrastructure");
import Immutables = require("../../Immutables/Immutables");
import ro = require("../../ReadOnly");

export = MealProposalPublished
class MealProposalPublished implements Infrastructure.IEvent {

    public mealProposalID: ro.Field<Immutables.Guid>;
    public libelle: ro.Field<Immutables.Title>;
    public description: ro.Field<Immutables.Description>;
    public lastReservationTime: ro.Field<Immutables.Time>;
    public foretoldPrice: ro.Field<Immutables.Euros>;
    public priceIncludeDelivery: ro.Field<boolean>;
    public isPrivate: ro.Field<boolean>;
    public invites: ro.Field<string>;


    constructor(idPropositionRepas: Immutables.Guid, libelle: Immutables.Title,description: Immutables.Description, heureMaxReservation: Immutables.Time, montantMax: Immutables.Euros, livraisonComprise: boolean, isPrive: boolean,invitations: string) {
        this.mealProposalID = ro.field(idPropositionRepas);
        this.libelle = ro.field(libelle);
        this.description = ro.field(description);
        this.lastReservationTime = ro.field(heureMaxReservation);
        this.foretoldPrice = ro.field(montantMax);
        this.priceIncludeDelivery = ro.field(livraisonComprise);
        this.isPrivate = ro.field(isPrive);
        this.invites = ro.field(invitations);
    }


    equals(left: MealProposalPublished): boolean {
        return this.mealProposalID.equals(left.mealProposalID)
            && this.libelle.equals(left.libelle)
            && this.description.equals(left.description)
            && this.lastReservationTime.equals(left.lastReservationTime)
            && this.foretoldPrice.equals(left.foretoldPrice)
            && this.priceIncludeDelivery.equals(left.priceIncludeDelivery)
            && this.isPrivate.equals(left.isPrivate)
            && this.invites.equals(left.invites);
    }

    getAggregateId(): Immutables.Guid { return this.mealProposalID(); }

    getAggregateType(): Infrastructure.Referentiel.AggregateType { return Infrastructure.Referentiel.AggregateType.MealProposal; }
}