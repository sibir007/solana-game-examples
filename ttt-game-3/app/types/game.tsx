// import GameBoard from '../../../seven-seas/app/components/GameBoard';
// import { Game } from '../components/my-components/Game';


enum TrickColor {
  White = 'white',
  Black = 'black'
}



class GameSlot {
  slotBordPosition: number;
  gameTrickIds: number[] = [];
  blockOnColor: TrickColor | null = null;

  constructor(slotBordPosition: number) {
    this.slotBordPosition = slotBordPosition;
  }

  addTrick(trickId: number, color: TrickColor) {
    if (this.blockOnColor && this.blockOnColor !== color) {
      throw new Error(`Cannot add trick of color ${color} to slot ${this.slotBordPosition} blocked on color ${this.blockOnColor}`);
    }
    this.gameTrickIds.push(trickId);
  }

  removeTrickById(trickId: number): void {
    const index = this.gameTrickIds.findIndex(id => id === trickId);
    if (index === -1) {
      throw new Error(`Trick with id ${trickId} not found in slot ${this.slotBordPosition}`);
    }
    const removedTrickId = this.gameTrickIds.splice(index, 1)[0];
    if (this.gameTrickIds.length === 0) {
      this.blockOnColor = null;
    }
  }

}

enum PlayerType {
  Remote = 'remote',
  Local = 'local'
}

enum BoardLocation {
  localFirstLargerTop = 'largerTop',
  smallerTop = 'smallerTop'
}

class GameTrick {
  readonly id: number;
  readonly color: TrickColor;
  currentSlotId: number | null = null;
  playerId: string | null = null;

  constructor(id: number, color: TrickColor) {
    this.id = id;
    this.color = color;
  }

  // getCurrentSlotId(): number | null {
  //   return this.currentSlotId;
  // }

  // setCurrentSlotId(newSlot: GameSlot) {
  //   this.currentSlotId = newSlot.slotBordPosition;
  // }

  // getPlayerId(): string | null {
  //   return this.playerId;
  // }

  // setPlayerId(playerId: string) {
  //   this.playerId = playerId;
  // }

}

class TricksSet {


  private trickSet: {
    white: GameTrick[],
    black: GameTrick[]
  } = {
      white: [],
      black: []
    };

  constructor() {
    for (let i = 0; i < 15; i++) {
      const trick = new GameTrick(i, TrickColor.White);
      this.trickSet.white[i] = trick;
    }
    for (let i = 15; i < 30; i++) {
      const trick = new GameTrick(i, TrickColor.Black);
      this.trickSet.black[i] = trick;
    }
  }

  assignSlotIdToGgoupTricks(slotId: number, trickColorGroup: TrickColor) {
    if (trickColorGroup === TrickColor.White) {
      this.trickSet.white.forEach((t) => { t.currentSlotId = slotId })
    }
    if (trickColorGroup === TrickColor.Black) {
      this.trickSet.black.forEach((t) => { t.currentSlotId = slotId })
    }
  }

  private _getTryckById(truckId: number): GameTrick {
    const trick = Object.values(this.trickSet).flat().find((t) => { t.id === t.id });
    if (!trick) {
      throw Error(`Not found trick whit id ${truckId}`);
    }
    return trick;
  }

  chechTrickById(thickId: number): boolean {
    this._getTryckById(thickId);
    return true;
  }

  getPlayerIdByTrickId(trickId: number): string {
    const id = this._getTryckById(trickId).playerId
    if (!id) {
      throw Error(`Undefined pliyer whit trick whit id ${trickId}`);
    }
    return id;
  }
  getSlotIdByTrickId(trickId: number): number | null {
    return this._getTryckById(trickId).currentSlotId;
  }

  getTrickColorById(trickId: number): TrickColor {
    return this._getTryckById(trickId).color;
  }

}

type GameLine = [
  GameSlot, // 0
  GameSlot, // 1
  GameSlot, // 2
  GameSlot, // 3
  GameSlot, // 4
  GameSlot, // 5
  GameSlot, // 6
  GameSlot, // 7
  GameSlot, // 8
  GameSlot, // 9
  GameSlot, // 10
  GameSlot, // 11
  GameSlot, // 12
  GameSlot, // 13
  GameSlot, // 14
  GameSlot, // 15
  GameSlot, // 16
  GameSlot, // 17
  GameSlot, // 16
  GameSlot, // 19
  GameSlot, // 20
  GameSlot, // 21
  GameSlot, // 22
  GameSlot, // 23
  GameSlot, // 24
  GameSlot, // 25
]

class GameBoard {




  /* game bord
           l                               
           i                               
           n                               
           e                            lh so
       13 14 15 16 17 18 19 20 21 22 23 24 25 
  slot |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_| 
       |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|  
       12 11 10  9  8  7  6  5  4  3  2  1 0
       sh                                 lo
       
       12 - smaller head (sh), 24 - larger head (lh), remote or local                                          
       remot first - remote head 12, local head 24, bord 1-12 top                                          
       local first - local head 12, remote head 24, bord 13-24 top                                          
       so - smaller out                                           
 lo - larger out
  */

  gameBordLine: GameLine = [
    new GameSlot(0), // 0
    new GameSlot(1), // 1
    new GameSlot(2), // 2
    new GameSlot(3), // 3
    new GameSlot(4), // 4
    new GameSlot(5), // 5
    new GameSlot(6), // 6
    new GameSlot(7), // 7
    new GameSlot(8), // 8
    new GameSlot(9), // 9
    new GameSlot(10), // 10
    new GameSlot(11), // 11
    new GameSlot(12), // 12
    new GameSlot(13), // 13
    new GameSlot(14), // 14
    new GameSlot(15), // 15
    new GameSlot(16), // 16
    new GameSlot(17), // 17
    new GameSlot(16), // 16
    new GameSlot(19), // 19
    new GameSlot(20), // 20
    new GameSlot(21), // 21
    new GameSlot(22), // 22
    new GameSlot(23), // 23
    new GameSlot(24), // 24
    new GameSlot(25), // 25
  ]


  smallerOut: number = 25 // so
  largerOut: number = 0 // lo 
  smallerHead: number = 12 // sh
  largerHead: number = 24 // lh
  smallerCourtyard: number[] = [19, 20, 21, 22, 23, 24]
  smallerHous: number[] = [13, 14, 15, 16, 17, 18]
  largerCourtyard: number[] = [12, 11, 10, 9, 8, 7]
  largerHous: number[] = [1, 2, 3, 4, 5, 6]
  // readonly smallerColor: TrickColor = TrickColor.White
  // readonly largerColor: TrickColor = TrickColor.Black
  // // boardLocation: BoardLocation = BoardLocation.localFirstLargerTop


  players: GamePlayers = new GamePlayers();


  trickSet: TricksSet = new TricksSet();




  // slotLines: { left: Array<Array<GameSlot>>, right: Array<Array<GameSlot>> } = {
  //   left: [],
  //   right: []
  // }
  // smallerOutSlot: GameSlot = new GameSlot(25) // so
  // largerOutSlot: GameSlot = new GameSlot(0)// lo

  constructor() {

    this.trickSet.assignSlotIdToGgoupTricks(this.smallerOut, TrickColor.White);
    this.trickSet.assignSlotIdToGgoupTricks(this.largerOut, TrickColor.Black);
  }

  setPlayer(playerId: string) {

    this.players.setPlayer(playerId);
  }

  // setPlayerTrickColor(playerId: string, color: TrickColor) {
  //   this.players.setPlayerTrickColor(playerId, color);
  // }


  // getPlayerTrickColor(playerId: string): TrickColor | null {
  //   return this.players.getPlayerTrickColor(playerId);
  // }

  // getPlayerSequence(palyerId: string): PlayersAcceptSequence {
  //   return this._getPlayerById(palyerId).acceptSequence!
  // }

  checkCompletenessPlayers(): boolean {
    return this.players.checkCompletenessPlayers();
  }

  checkFirstPlayer(playerId: string): boolean {
    return this.players.checkFirstPlayer(playerId)
  }

  checkSecondPlayer(playerId: string): boolean {
    return this.players.checkSecondPlayer(playerId)
  }

  getFirstPlayerId(): string {
    return this.players.getFirstPlayerId();
  }

  getSecondPlayerId(): string {
    return this.players.getSecondPlayerId();
  }

  getSlotIdByTrickId(trickId: number): number | null {
    return this.trickSet.getSlotIdByTrickId(trickId)
  }

  getPlayerIdByTrickId(trickId: number): string {
    return this.trickSet.getPlayerIdByTrickId(trickId)
  }

  checkSlotId(toSlotPosition: number) {
    if (!this.gameBordLine[toSlotPosition]) {
      throw new Error(`Slot whit id ${toSlotPosition} undefined`);
    }
  }
  moveTrick(trickId: number, fromSlotPosition: number, toSlotPosition: number) {
    const trickColor: TrickColor = this.trickSet.getTrickColorById(trickId);
    const fromSlot: GameSlot = this.gameBordLine[fromSlotPosition];
    const toSlot: GameSlot = this.gameBordLine[toSlotPosition];
    fromSlot.removeTrickById(trickId);
    toSlot.addTrick(trickId, trickColor);
  }

}

// class GameBoard_ {

//   top = {
//     bottomCourtyard: {
//       24: new GameSlot(24),
//       23: new GameSlot(23),
//       22: new GameSlot(22),
//       21: new GameSlot(21),
//       20: new GameSlot(20),
//       19: new GameSlot(19),
//     },
//     bottomHouse: {
//       18: new GameSlot(18),
//       17: new GameSlot(17),
//       16: new GameSlot(16),
//       15: new GameSlot(15),
//       14: new GameSlot(14),
//       13: new GameSlot(13),
//     },
//     bottomExit: new GameSlot(25)
//   }
//   bottom = {
//     topCourtyard: {
//       12: new GameSlot(12),
//       11: new GameSlot(11),
//       10: new GameSlot(10),
//       9: new GameSlot(9),
//       8: new GameSlot(8),
//       7: new GameSlot(7),
//     },
//     topHouse: {
//       6: new GameSlot(6),
//       5: new GameSlot(5),
//       4: new GameSlot(4),
//       3: new GameSlot(3),
//       2: new GameSlot(2),
//       1: new GameSlot(1),
//     },
//     topExit: new GameSlot(26)
//   };
//   topHead: GameSlot = this.top.bottomCourtyard[24];
//   bottomHead: GameSlot = this.bottom.topCourtyard[12];

//   initBorad(toop: GameTrick[], bottom: GameTrick[]) {
//     toop.map(trick => {
//       this.topHead.addTrick(trick);
//     });
//     bottom.map(trick => {
//       this.bottomHead.addTrick(trick);
//     });
//   }
//   getSlotByBordPosition(posotionId: number): GameSlot | null {
//     let slot = Object.values(this.top.bottomCourtyard).find(s => s.slotBordPosition === posotionId);
//     if (slot) {
//       return slot;
//     }
//     slot = Object.values(this.top.bottomHouse).find(s => s.slotBordPosition === posotionId);
//     if (slot) {
//       return slot;
//     }
//     if (this.top.bottomExit.slotBordPosition === posotionId) {
//       return this.top.bottomExit;
//     }
//     slot = Object.values(this.bottom.topCourtyard).find(s => s.slotBordPosition === posotionId);
//     if (slot) {
//       return slot;
//     }
//     slot = Object.values(this.bottom.topHouse).find(s => s.slotBordPosition === posotionId);
//     if (slot) {
//       return slot;
//     }
//     if (this.bottom.topExit.slotBordPosition === posotionId) {
//       return this.bottom.topExit;
//     }
//     return null;
//   }

// };

enum GameState {
  // initial state when the game is created, waiting for first player to join
  AcceptPlayers,
  // first player has joined, waiting for second player
  WaitingForSecondPlayer,
  // both players have joined, waiting for first player's turn order roll
  WaitngForTurnOrderFirstPlayer,
  // first player has rolled, waiting for second player's turn order roll
  WaitngForTurnOrderSecondPlayer,
  // order has been decided, waiting for cube roll to start the game
  InProgressWitingCubesRoll,
  // waiting for player to make their move
  InProgressWitingPlayertMove,
  Completed

}

enum PlayerVictoryStatus {
  Init,
  Win,
  Lose,
  Draw,
  InProgress
}

enum PlayersAcceptSequence {
  first = 'first',
  second = 'second'
}

class Player {
  id: string;
  color: TrickColor | null = null;
  victoryStatus: PlayerVictoryStatus = PlayerVictoryStatus.Init;
  acceptSequence: PlayersAcceptSequence | null = null;

  constructor(id: string) {
    this.id = id;

  }
  assignColor(color: TrickColor) {
    this.color = color;
  }

  setAcceptSequence(sequence: PlayersAcceptSequence) {
    this.acceptSequence = sequence;
  }

  getAcceptSequence(): PlayersAcceptSequence | null {
    return this.acceptSequence;
  }
}

class GamePlayers {


  gamePlayers: {
    first: Player | null,
    second: Player | null,
  } = {
      first: null,
      second: null
    }

  setPlayer(playerId: string) {
    if (this.checkCompletenessPlayers()) {
      throw Error("Cannot set player, both players already registered");
    }
    if (!this._firstPlayerExists()) {
      const p = new Player(playerId)
      this.gamePlayers.first = p;
      p.setAcceptSequence(PlayersAcceptSequence.first)
      return;
    }
    if (!this._secondPlayerExists()) {
      const p = new Player(playerId)
      this.gamePlayers.second = p;
      p.setAcceptSequence(PlayersAcceptSequence.second)
      return;
    }
    throw Error("Cannot set player, wrong state");


  }

  checkSecondPlayer(playerId: string): boolean {
    return this._getPlayerById(playerId).acceptSequence === PlayersAcceptSequence.second;
  }
  checkFirstPlayer(playerId: string): boolean {
    return this._getPlayerById(playerId).acceptSequence === PlayersAcceptSequence.first;
  }

  checkCompletenessPlayers(): boolean {
    return this.gamePlayers.first && this.gamePlayers.second ? true : false;
  }

  private _firstPlayerExists(): boolean {
    return this.gamePlayers.first ? true : false;
  }

  private _secondPlayerExists(): boolean {
    return this.gamePlayers.second ? true : false;
  }

  private _getPlayerById(playerId: string): Player {
    const p = Object.values(this.gamePlayers).find((p) => p?.id === playerId);
    if (!p) {
      throw Error(`Player whit id ${playerId} undefined`);
    }
    return p;
  }

  setPlayerTrickColor(playerId: string, color: TrickColor) {
    this._getPlayerById(playerId).assignColor(color);
  }

  getPlayerTrickColor(playerId: string): TrickColor | null {
    return this._getPlayerById(playerId).color;
  }
  getSecondPlayerId(): string {
    const id = this.gamePlayers.second?.id;
    if (!id) {
      throw new Error("Second Player undefined.");
    }
    return id;
  }
  getFirstPlayerId(): string {
    const id = this.gamePlayers.first?.id;
    if (!id) {
      throw new Error("First Player undefined.");
    }
    return id;
  }

}

type StateOfCube = 1 | 2 | 3 | 4 | 5 | 6;

class GameCube {
  state: StateOfCube | null = null;
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  roll(): StateOfCube {
    this.state = (Math.floor(Math.random() * 6) + 1) as StateOfCube;
    return this.state as StateOfCube;
  }
  getState(): StateOfCube {
    return this.state as StateOfCube;
  }

  getId(): number {
    return this.id;
  }

}

class GameCubes {
  cube1: GameCube = new GameCube(1)
  cube2: GameCube = new GameCube(2)

  constructor() {
    this.cube1.roll();
    this.cube2.roll();
  }

  rollCube1(): StateOfCube {
    return this.cube1.roll();
  }

  rollCube2(): StateOfCube {
    return this.cube2.roll();
  }

  getStateCube1(): StateOfCube {
    return this.cube1.getState();
  }

  getStateCube2(): StateOfCube {
    return this.cube2.getState();
  }

  rollCubes(): [StateOfCube, StateOfCube] {
    return [this.cube1.roll(), this.cube2.roll()]
  }

  getStateCubes(): [StateOfCube, StateOfCube] {
    return [this.cube1.getState(), this.cube2.getState()];
  }

}

class Game {
  // ---------- Game State
  state: GameState = GameState.AcceptPlayers;
  GameBoard: GameBoard = new GameBoard();
  cubes: GameCubes = new GameCubes();

  // turn order rolls by both players
  cube1State: StateOfCube | null = null;
  cube2State: StateOfCube | null = null;
  // player who has the current turn to make a move
  currentPlayerIdToMakeMove: string | null = null;
  nextPlayerIdToMakeMove: string | null = null;


  // cube1: GameCube = new GameCube(1);
  // cube2: GameCube = new GameCube(2);
  // number of moves made by each player,
  moveCount: number = 2;

  // ---------- supportive state
  // trickSets: GameTrickSets = new GameTrickSets();
  // whiteTrickSet: TrickSet = this.trickSets.whiteTrickSet;
  // blackTrickSet: TrickSet = this.trickSets.blackTrickSet;

  // firstMoveInGameSecondPlayer: number = 2;

  // clone() {
  //   const clone = {
  //     state: this.state,
  //     GameBoard: this.GameBoard,
  //     localPlayer: this.localPlayer,
  //     remotePlayer: this.remotePlayer,
  //     firstPlayer: this.firstPlayer,
  //     secondPlayer: this.secondPlayer,
  //     tyrnOrderFirstPlayer: this.tyrnOrderFirstPlayer,
  //     tyrnOrderSecondPlayer: this.tyrnOrderSecondPlayer,
  //     currentPlayerToMakeMove: this.currentPlayerIdToMakeMove,
  //     nextPlayerToMakeMove: this.nextPlayerIdToMakeMove,
  //     cube1: this.cube1,
  //     cube2: this.cube2,
  //     moveCount: this.moveCount,
  //   }
  //   return clone;
  // }

  acceptGame(playetId: string) {
    if (this.state === GameState.AcceptPlayers) {
      this.GameBoard.setPlayer(playetId);
      if (this.GameBoard.checkCompletenessPlayers()) {
        this.state = GameState.WaitngForTurnOrderFirstPlayer
      }
      return;
    }
    throw new Error("Cannot set player in current game state");

  }



  prioritizationByFirstPlayer(playerId: string) {
    if (this.state === GameState.WaitngForTurnOrderFirstPlayer) {
      if (!this.GameBoard.checkFirstPlayer(playerId)) {
        throw new Error("It's not the first player's turn to roll for turn order");
      }
      this.cube1State = this.cubes.rollCube1();
      this.state = GameState.WaitngForTurnOrderSecondPlayer;
      return;
    }
    throw new Error("Cannot set turn order for first player in current game state");
  }

  prioritizationBySecondPlayer(playerId: string) {
    if (this.state === GameState.WaitngForTurnOrderSecondPlayer) {
      if (!this.GameBoard.checkSecondPlayer(playerId)) {
        throw new Error("It's not the second player's turn to roll for turn order");
      }
      this.cube2State = this.cubes.rollCube2();
      if (this.cube1State! > this.cube2State!) {
        this.currentPlayerIdToMakeMove = this.GameBoard.getFirstPlayerId();
        this.nextPlayerIdToMakeMove = this.GameBoard.getSecondPlayerId();
      } else if (this.cube1State! < this.cube2State!) {
        this.currentPlayerIdToMakeMove = this.GameBoard.getSecondPlayerId();
        this.nextPlayerIdToMakeMove = this.GameBoard.getFirstPlayerId();
      } else {
        // re-roll in case of a tie
        this.cube1State = null;
        this.cube2State = null;
        this.state = GameState.WaitngForTurnOrderFirstPlayer;
        return;
      }
      this.state = GameState.InProgressWitingCubesRoll;
      return;
    }
    throw new Error("Cannot set turn order for second player in current game state");
  }

  roollCubes(playerId: string) {
    if (this.state === GameState.InProgressWitingCubesRoll) {
      if (this.currentPlayerIdToMakeMove !== playerId) {
        throw new Error("It's not the current player's turn to roll the cubes");
      }
      const cube1Value = this.cubes.rollCube1();
      const cube2Value = this.cubes.rollCube2();
      if (cube1Value === cube2Value) {
        this.moveCount = 4;
      } else {
        this.moveCount = 2;
      }
      this.state = GameState.InProgressWitingPlayertMove;
    }
    throw new Error("Cannot roll cubes in current game state");
  }

  moveTrick(trickId: number, toSlotPosition: number) {
    if (this.state !== GameState.InProgressWitingPlayertMove) {
      throw new Error("Cannot move trick in current game state");
    }

    this.GameBoard.checkSlotId(toSlotPosition);
    const playerId: string = this.GameBoard.getPlayerIdByTrickId(trickId);
    this._checkCurentPlayer(playerId)
    // const fromSlot = this.GameBoard.getSlotByBordPosition(trick.currentSlot!);
    // if (!fromSlot) {
    //   throw new Error(`Trick with id ${trickId} is not in any slot`);
    // }
    // const toSlot: GameSlot | null = this.GameBoard.getSlotByBordPosition(toSlotPosition);
    // if (!toSlot) {
    //   throw new Error(`Slot with position ${toSlotPosition} not found`);
    // }

    // implement move validation logic here
    // if (toSlot.blockOnColor || toSlot.blockOnColor !== trick.color) {
    //   throw new Error(`Cannot move trick to slot ${toSlotPosition} blocked on color ${toSlot.blockOnColor}`);
    // }

    // TODO:
    // implement move validation logic here:
    // - blocking
    // - existing second move logic
    // - first move from head logic
    // - winning condition
    const fromSlotPosition: number = this.GameBoard.getSlotIdByTrickId(trickId)!;
    this.GameBoard.moveTrick(trickId, fromSlotPosition, toSlotPosition);
    this.moveCount -= 1;
    if (this.moveCount === 0) {
      // switch turns
      const temp = this.currentPlayerIdToMakeMove;
      this.currentPlayerIdToMakeMove = this.nextPlayerIdToMakeMove;
      this.nextPlayerIdToMakeMove = temp;
      this.moveCount = 2;
      this.state = GameState.InProgressWitingCubesRoll;
    }

  }
  private _checkCurentPlayer(playerId: string) {
    if (this.currentPlayerIdToMakeMove === playerId) {
      throw new Error("It's not the current player's trick to move");
    }
  }
}
export {
  TrickColor,
  GameTrick,
  GameSlot,
  GameBoard,
  GameState,
  Player,
  TricksSet,
  GameCube,
  Game,
  PlayerVictoryStatus
};
export type { StateOfCube, GameLine };

