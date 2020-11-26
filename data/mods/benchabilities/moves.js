'use strict';

exports.BattleMovedex = {
	"tailwind": {
		inherit: true,
		condition: {
			duration: 4,
			durationCallback( target, source, effect ) {
				if ( source && ( source.hasAbility( 'persistent' ) 
					|| ( source.hasAbility( 'persistent' ) 
						&& this.field.getWeather().id === 'deltastream' )))
				{
					this.add( '-activate', source, 'ability: Persistent', effect );
					return 6;
				}
				return 4;
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
};
