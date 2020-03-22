import {
    AttackInfo,
    AttackParams,
    BattleProperties,
    Buff,
    EventData,
    Battle,
    EffectTypes,
    Reasons,
    Skill
} from '../../';
import NormalAttack from '../common/normal-attack';
import BuffSkill from '../common/buff-skill';

export const akajita_skill1 = new NormalAttack('海扁');
export const akajita_skill2 = new BuffSkill(2, '鼓舞', 2, (_, sourceId, targetId) => [
    Buff.build(sourceId,  targetId)
        .name('鼓舞[速]')
        .countDown(2)
        .buff(BattleProperties.SPD, EffectTypes.FIXED, 15)
        .end(),
    Buff.build(sourceId,  targetId)
        .name('鼓舞[暴]')
        .countDown(2)
        .buff(BattleProperties.CRI, EffectTypes.FIXED, 0.11)
        .end()
]);
export const akajita_skill3: Skill = {
    no: 3,
    cost: 3,
    name: '风鼓雷',
    use(battle: Battle, sourceId: number, selectedId: number): boolean {
        const selected = battle.getEntity(selectedId);
        const entities = battle.getTeamEntities(selected.teamId);

        for (let i = 0; i < 2; i++) {
            const attackInfos: AttackInfo[] = entities.map(e => {
                return new AttackInfo(e.entityId, {
                    rate: 0.72,
                    params: [AttackParams.SHOULD_COMPUTE_CRI, AttackParams.GROUP],
                    completedProcessor:  function (battle: Battle, data: EventData): void { // 造成伤害时
                        if (battle.testHit(0.3) && data.targetId) {
                            battle.actionUpdateRunwayPercent(sourceId, data.targetId, -1, Reasons.SKILL);
                        }
                    },
                });
            });
            if (!battle.actionAttack(attackInfos)) return false;

        }
        return true;
    },
};

