import {
    Handler,
    Equipment,
    EventCodes,
    EventRange,
    EventData,
    AttackProcessing,
    BattleProperties,
    AttackParams
} from "../index";
import Battle from "../battle";

export default function builder(): Equipment {
    return {
        name: '心眼',
        handlers:  [{
            handle(battle: Battle, data: EventData, _step: number) {
                const attackProcessing = data.data as AttackProcessing;
                const attackInfo = attackProcessing.attackInfos[attackProcessing.index];
                const attack = attackProcessing.attacks[attackProcessing.index];
                if (!attackInfo || !attack) return;
                if ( !attack.hasParam(AttackParams.NORMAL) || attack.hasParam(AttackParams.NO_SOURCE_EQUIPMENT) ) return;

                const target = battle.getEntity(attack.targetId);
                const percent  = 1 - target.hp / battle.getComputedProperty(target.entityId, BattleProperties.MAX_HP);
                if (percent >= 0.15) {
                    attackInfo.finalDamage = attackInfo.finalDamage * Math.floor(percent / 0.15);
                }
            },
            code: EventCodes.WILL_DAMAGE, // 触发事件
            range: EventRange.SELF, // 事件范围
            priority:1000,
            passiveOrEquipment: true, // 是否是写在被动里的
            name: '心眼处理',
        }],
    }
}

builder.equipmentName = '心眼';