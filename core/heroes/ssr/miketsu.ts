import {
    AttackInfo,
    AttackParams,
    BattleProperties,
    Buff,
    Control,
    EffectTypes,
    EventCodes,
    EventData,
    EventRange,
    Game,
    Reasons,
    Skill
} from '../../';

export const skill1: Skill = {
    no: 1,
    name: '一矢',
    handlers: [
        {
            handle(game: Game, data: EventData) {
                if (!data.skillOwnerId || !data.targetId) return 0;
                const p = game.hasBuffByName(data.skillOwnerId, '狐狩界') ? 0.4 : 0.05; // 结界启动期间提升概率
                const isHit = game.testHit(p);
                if (isHit) {
                    // 需要起一个伪回合？
                    game.actionUseSkill(4, data.skillOwnerId, data.targetId); // TODO: 混乱时随机普攻
                }
            },
            code: EventCodes.ACTION_END, // 监听行动结束事件
            range: EventRange.ENEMY, // 地方结束
            priority: 0,
            passive: false,
        }
    ],
    cost: 0,
    use(game: Game, sourceId: number, selectedId: number): boolean {
        const at = new AttackInfo(selectedId, {
            sourceId,
            rate: 1,
            params: [AttackParams.SHOULD_COMPUTE_CRI, AttackParams.SINGLE, AttackParams.NORMAL_ATTACK],
        });
        game.actionAttack(at);
        return true;
    },
};
export const skill4: Skill = {
    no: 4,
    name: '一矢·封魔',
    cost: 0,
    use(game: Game, sourceId: number, selectedId: number): boolean {
        const owner = game.getEntity(sourceId);
        const at = new AttackInfo(selectedId, {
            sourceId,
            rate: 1,
            params: [
                AttackParams.SHOULD_COMPUTE_CRI, // 触发暴击
                AttackParams.SINGLE, // 单体
                AttackParams.NORMAL_ATTACK, // 普攻
                AttackParams.NO_TARGET_EQUIPMENT, // 不触发御魂
                AttackParams.NO_TARGET_PASSIVE // 不触发被动
            ],
        });
        game.actionAttack(at);

        // 处理附带的四个debuff
        const buff1 = Buff.build(sourceId, selectedId)
            .name('一矢·封魔·沉默', 1) // 同名最多1
            .countDown(1) // 倒计时1
            .control(Control.SILENT) // 沉默
            .probability(1) // 基础概率100%
            .end();
        const buff2 = Buff.build(sourceId, selectedId)
            .name('一矢·封魔·压制', 1)
            .countDown(1)
            .control(Control.EQUIPMENT_FORBID)
            .probability(1)
            .end();
        const buff3 = Buff.build(sourceId, selectedId)
            .name('一矢·封魔·封印', 1)
            .countDown(1)
            .control(Control.PASSIVE_FORBID)
            .probability(1)
            .end();
        const buff4 = Buff.build(sourceId, selectedId)
            .name('一矢·封魔·减疗', 1)
            .countDown(1)
            .probability(1)
            .debuff(BattleProperties.HEALING_DOWN, EffectTypes.MAX, 0.7)
            .end();
        game.actionAddBuff( buff1, Reasons.SKILL);
        game.actionAddBuff( buff2, Reasons.SKILL);
        game.actionAddBuff(buff3, Reasons.SKILL);
        game.actionAddBuff(buff4, Reasons.SKILL);

        // 如果结界开启，增加护符

        if (game.hasBuffByName(sourceId, '狐狩界')) {
            const buff5 = Buff.build(sourceId, -1)
                .name('狐狩界·防御', 3) // 最大持有12，实际上是最大持有3，每次增加4张对应处理就好了
                .dependOn(sourceId,'狐狩界') // 依赖于结界的存在
                .buff(BattleProperties.DEF, EffectTypes.ADD_RATE,  0.03 * 4)
                .end();

            const buff6 = Buff.build(sourceId, -1)
                .name('狐狩界·伤害', 3)
                .dependOn(sourceId,'狐狩界')
                .buff(BattleProperties.DMG_DEALT_B, EffectTypes.FIXED,  0.02 * 4)
                .end();
            const buff7 = Buff.build(sourceId, -1)
                .name('狐狩界·速度', 3)
                .dependOn(sourceId,'狐狩界')
                .buff(BattleProperties.SPD, EffectTypes.FIXED,  1 * 4)
                .end();

            game.actionAddBuff(buff5, Reasons.SKILL);
            game.actionAddBuff(buff6, Reasons.SKILL);
            game.actionAddBuff(buff7, Reasons.SKILL);
        }
        return true;
    },
};

export const skill2: Skill = {
    no: 2,
    name: '狐狩界',
    handlers: [{
        // 先机：释放狐狩界
        handle(game: Game, data: EventData) {
            if (!data.skillOwnerId) return 0;
            game.actionUseSkill(2, data.skillOwnerId, data.skillOwnerId);
            return -1;
        },
        code: EventCodes.SENKI,
        range: EventRange.NONE,
        priority: 0,
        passive: false,
    }],
    passive: false,
    cost: 3,
    use(game: Game, sourceId: number, selectedId: number): boolean {
        const buff = Buff.build(sourceId, sourceId)
            .name('狐狩界', 1) // 同名最多1
            .enchantment() // 是结界
            .countDownBySource(1) // 已来源计算回合
            .end();
        game.actionAddBuff(buff, Reasons.SKILL); // 开启狐狩界
        return true;
    },
};
export const skill3: Skill = {
    no: 3,
    handlers: [],
    passive: false,
    name: '燃爆·破魔箭',
    cost: 3,
    use(game: Game, sourceId: number, selectedId: number): boolean {
        const buffs = game.filterBuffBySource(sourceId, selectedId).filter(b => ['狐狩界·防御', '狐狩界·伤害', '狐狩界·速度'].includes(b.name)); // 来源是我的灵符
        const at = new AttackInfo(selectedId, {
            sourceId,
            rate: 1.95 * 0.25 * buffs.length,
            params: [AttackParams.SHOULD_COMPUTE_CRI, AttackParams.SINGLE],
        });
        game.actionAttack(at);

        // 先攻击后消耗
        buffs.forEach(b => {
           game.actionRemoveBuff(b, Reasons.COST);
        });

        return true;
    },
};
