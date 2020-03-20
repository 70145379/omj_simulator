import Game from './game';
import Buff, {Effect, Operator} from './buff';

import {filter, find, forEach, isNil, values} from 'lodash';
import Skill from './skill';
import {Control, BattleProperties} from './constant';
import TurnData from './turn-data';

let entityCounter = 0;
export default class Entity {
    static no: number = 0;
    no: number;

    entityId: number;
    teamId: number; // 队伍id

    tags: string[]; // 实体标志，用于识别实体

    properties: Map<string, number>; // 基础属性，最大生命 攻击等
    buffs: Buff[]; // 附加效果，影响基础属性
    hp: number; // 生命值
    shield: number; // 护盾
    name: string;
    dead: boolean;
    lv: number; // 等级
    skills: Skill[];
    rank: string;
    keyValueTable: Map<string, string>;

    constructor() {
        this.entityId = ++entityCounter;
        this.properties = new Map();
        this.buffs = [];
        this.teamId = 0;
        this.tags = [];
        this.hp = 1;
        this.shield = 0;
        this.no = 0;
        this.name = '<Unknown>';
        this.dead = false;
        this.lv = 40;
        this.skills = [];
        this.rank = 'X';
        this.keyValueTable = new Map<string, string>();

        forEach(values(BattleProperties), key => {
            this.setProperty(key, 0);
        });
        this.setProperty(BattleProperties.MAX_HP, 1);
    }

    /**
     * 获得实体存储的附加数据，详见setData
     * @param {string} key
     * @return {string|null} 返回数据，对应key不存在返回null
     */
    getData(key: string): string | null {
        return this.keyValueTable.get(key) || null;
    }

    /**
     * 设置实体存储的附加数据，主要用于式神记录一些临时数据
     * 比如记录本回合内是否有人死亡，比如犬神记录本回合有没有人砍了队友
     * @param key
     * @param value
     */
    setData(key: string, value: string | null): boolean {
        if (value === null) {
            return this.keyValueTable.delete(key);
        }
        this.keyValueTable.set(key, value);
        return true;
    }

    addSkill(skill: Skill) {
        this.skills.push(skill);
    }

    addTags(tag: string) {
        if (!this.hasTag(tag)) {
            this.tags.push(tag);
        }
    }

    removeTags(tag: string) {
        const index = this.tags.indexOf(tag);

        if (index !== -1) {
            this.tags.splice(index, 1);
        }
    }

    hasTag(tag: string): boolean {
        return this.tags.includes(tag);
    }

    addBuff(buff: Buff) {
        this.buffs.push(buff);
    }

    removeBuff(buff: Buff) {
        const index = this.buffs.indexOf(buff);

        if (index !== -1) {
            this.buffs.splice(index, 1);
        }
    }

    getProperty(name: string): number {
        const origin = this.properties.get(name);

        if (isNil(origin)) return 0;
        return origin;
    }

    getComputedProperty(name: string): number {
        const origin = this.properties.get(name);
        if (isNil(origin)) return 0;
        const effects: Effect[] = this.buffs.reduce((list: Effect[], buff: Buff) => {
            return list.concat(buff.effects.filter(e => e.propertyName === name));
        }, []); // 过滤出影响该属性的effect

        return effects.reduce((current, e: Effect) => {
            switch (e.op) {
                case Operator.ADD:
                    return current + e.value;
                case Operator.SET:
                    return e.value;
                case Operator.RATE:
                    return current + origin * e.value;
                case Operator.NOTHING:
                default:
                    return current;
            }
        }, origin);
    }

    hasProperty(name: string): boolean {
        return this.properties.has(name);
    }

    setProperty(name: string, value = 0) {
        this.properties.set(name, value);
    }

    setTeam(teamId: number) {
        this.teamId = teamId;
    }

    setName(name: string) {
        this.name = name;
    }

    filterBuff(name: string): Buff[] {
        return filter(this.buffs, buff => buff.name === name);
    }

    hasBuff(buf: Buff): boolean {
        return !!find(this.buffs, buff => buff === buf);
    }

    hasBuffNamed(name: string): boolean {
        return !!find(this.buffs, buff => buff.name === name);
    }

    ai: (game: Game, turnData: TurnData) => boolean = () => true;

    /**
     * 是否处于无法动作状态
     */
    cannotAction(): boolean {
        return this.buffs.some(buff => {
            return buff.control === Control.FROZEN ||
                buff.control === Control.SLEEP ||
                buff.control === Control.DIZZY ||
                buff.control === Control.POLYMORPH;
        });
    }

    /**
     * 是否被控制
     */
    beControlled(): boolean {
        return this.buffs.some(buff => {
            return buff.control !== Control.NONE;
        });
    }

    /**
     * 是否被指定控制类型控制
     * @param controls
     */
    beControlledBy(...controls: Control[]): boolean {
        return this.buffs.some(buff => {
            return controls.includes(buff.control);
        });
    }

    filterControlByType(...controls: Control[]): Buff[] {
        return this.buffs.filter(buff => {
            return controls.includes(buff.control);
        });

    }

    isHpLowerThan(percent: number): boolean {
        return this.hp / this.getComputedProperty(BattleProperties.MAX_HP) <= percent;
    }

    getSkill(no: number): Skill|null {
        return this.skills.find(s => s.no === no) || null;
    }

}