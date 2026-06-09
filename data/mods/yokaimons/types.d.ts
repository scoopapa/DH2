import '../../../sim/pokemon';
import '../../../sim/dex-species';
import '../../../sim/dex-moves';
import '../../../sim/dex-conditions';
import '../../../sim/side';

declare module '../../../sim/pokemon' {
    interface Pokemon {
        tribe?: string;
        element?: string;
        soultimateMove?: string;
        soultimateCharge?: number;
        loafedThisTurn?: boolean;
        dodgedThisTurn?: number;
    }
}

declare module '../../../sim/dex-species' {
    interface SpeciesData {
        tribe?: string;
        element?: string;
        soultimateMove?: string;
    }
}

declare module '../../../sim/dex-moves' {
    interface MoveData {
        soultimateMaxCharge?: number;
        soultimateCharged?: boolean;
    }

    interface MoveFlags {
        head?: 1;
        inspirit?: 1;
        soultimate?: 1;
    }
}

declare module '../../../sim/dex-conditions' {
    interface EventMethods {
        onAnyRedirectTargetPriority?: number;
    }

    interface PokemonConditionData {
        isInspirit?: boolean;
        isGood?: boolean;
    }
}

declare module '../../../sim/side' {
    interface Side {
        tribeAnnounced?: boolean;
    }
}