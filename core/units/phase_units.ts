import Game from '../system/game';



export const phaseGameStart =  (game: Game, _: object):boolean => {
    game.enqueueTask(phaseGameStartRunWayCompute, {}, '开局行动条计算'); // 开局计算行动条
    return true;
};

export const phaseGameStartRunWayCompute = (game: Game, _: object) :boolean=> {
    game.runway.compute();
    game.enqueueTask(phaseSenki, {}, '先机'); // 进入先机阶段
    game.enqueueTask(() => {
        game.current_entity = game.runway.getNext() || 0;
        game.turn++;
        return true;
    }, {}, '先机后设置当前回合实体');
    return true;
};

export const phaseSenki = (game: Game, _: object):boolean => {
    game.enqueueTask(phaseTurnBeforeStart, {}, '回合开始'); // 进入先机阶段
    return true;
};

export const phaseRunWay = (game: Game, _: object):boolean => {
    game.current_entity = game.runway.computeNext() || 0;
    game.turn++;
    game.enqueueTask(phaseTurnBeforeStart,{}, '回合开始前');
    return true;
};

export const phaseTurnBeforeStart = (game: Game, _: object):boolean => {
    if (!game.current_entity) return false; // 当前无下一个玩家
    const entity = game.getEntity(game.current_entity);
    if (entity) {
        console.log(`【回合${game.turn}】轮到【${entity.name}】`);
    }
    game.enqueueTask(phaseTurnAction, {}, '回合动作');
    return true;
};

export const phaseTurnAction = (game: Game, _: object):boolean => {
    game.enqueueTask(phaseTurnEnd, {}, '回合结束');
    return true;
};
export const phaseTurnEnd = (game: Game, _: object):boolean => {
    game.enqueueTask(phaseRunWay, {}, '计算行动条');
    return true;

};
