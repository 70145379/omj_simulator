export enum Control {
    NONE,
    EQUIPMENT_FORBID, // 封印御魂
    PASSIVE_FORBID, //  封印被动
    CONFUSION, // 混乱
    DIZZY, //  眩晕
    FROZEN, // 冰冻
    IMPRISONMENT, // 禁锢
    POLYMORPH, // 变形
    PROVOKE, // 挑衅
    SILENT, // 沉默
    SLEEP, // 睡眠
    SNEER, // 嘲讽
}

// 事件代码
export enum EventCodes {
    NONE,
    GAME_START, // 游戏开始
    SENKI, // 先机
    TURN_START, // 回合开始后
    ACTION_START, // 行动开始
    ACTION_END, // 行动结束后
    TURN_END, // 回合结束后
    DAMAGE, // 造成伤害后
    ATTACK, // 攻击后 eventId: 攻击的人
    TAKEN_SELECT, // 被选中后
    TAKEN_DAMAGE, // 受到伤害后
    TAKEN_ATTACK, // 受到攻击后 eventId: 被攻击的人
    BUFF_GET, // 获得buff后 eventId: 获得buff的人
    BUFF_REMOVE, // 移除buff后 eventId: 获得buff的人
    BEFORE_BUFF_GET, // 将要获得buff eventId: 失去buff的人
    BEFORE_BUFF_REMOVE, // 将要移除buff eventId: 失去buff的人
    KILL, // 击杀后
    NO_KILL, // 未击杀后
    DEAD, // 死亡后
    BUFF_RES, // 抵抗后 eventId: 谁抵抗了
    MANA_OVERFLOW, // 鬼火溢出后
    MANA_CHANGE, // 鬼火变化后
    SKILL, // 使用技能后
    UPDATE_HP, // 生命变化后
    BEFORE_ATTACK, // 攻击处理前 eventId: 发起攻击的人
    CRI, // 暴击后

}

// 式神可变属性
export const BattleProperties = {
    MAX_HP: 'max_hp', // 最大HP
    ATK: 'atk',  // 攻击
    DEF: 'def', // 防御
    SPD: 'spd', // 速度
    CRI: 'cri', // 暴击
    CRI_DMG: 'cri_dmg', // 暴击伤害
    EFT_HIT: 'eft_hit', // 效果命中.
    EFT_RES: 'eft_res', // 效果抵抗

    DMG_DEALT_B: 'dmg_dealt_buff', // 伤害加成
    DMG_DEALT_D: 'dmg_dealt_debuff', // 造成伤害降低

    DMG_TAKEN_B: 'dmg_taken_buff', // 承伤增加
    DMG_TAKEN_D: 'dmg_taken_debuff', // 免伤
    DEF_NEG: 'def_neg', // 忽略防御
    DEF_NEG_P: 'def_neg_p', // 忽略防御百分比
    HP_STEAL: 'hp_steal', // 生命偷取
};

// 原因
export enum Reasons {
    NOTHING,
    SKILL,
    TIME_OUT,
    COST,
    MANA_PROGRESS,
    RULE,
}
