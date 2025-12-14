// import GameBoard from '../../../seven-seas/app/components/GameBoard';
// import { Game } from '../components/my-components/Game';
// import GameBoard from '@/components/GameBoard';


enum TrickColor {
  White = 'white',
  Black = 'black'
}



class GameSlot {

  private _slotBordPosition: number;
  private _gameTricks: GameTrick[] = [];
  private _blockOnColor: TrickColor | null = null;



  constructor(slotBordPosition: number) {
    this._slotBordPosition = slotBordPosition;
  }

  public get slotBordPosition(): number {
    return this._slotBordPosition;
  }


  public get blockOnColor(): TrickColor | null {
    return this._blockOnColor;
  }

  // remove first then add
  addTrick(trick: GameTrick) {
    if (this._blockOnColor && this._blockOnColor !== trick.color) {
      throw new Error(`Cannot add trick of color ${trick.color} to slot ${this._slotBordPosition} blocked on color ${this._blockOnColor}`);
    }
    this._gameTricks.push(trick);
    this._blockOnColor = trick.color;
    trick.currentSlot = this;
  }

  // remove first then add
  removeTrick(trick: GameTrick) {
    const index = this._gameTricks.findIndex(t => t === trick);
    if (index === -1) {
      throw new Error(`Trick with id ${trick.id} not found in slot ${this.slotBordPosition}`);
    }
    const removedTrick = this._gameTricks.splice(index, 1)[0];
    if (this._gameTricks.length === 0) {
      this._blockOnColor = null;
    }
  }

  // remove first then add
  addTricks(tricks: GameTrick[]) {
    tricks.forEach((t) => {
      this.addTrick(t);
    });

  }
  removeAllTricks(): GameTrick[] {
    const tricks = this._gameTricks;
    this._gameTricks = [];
    tricks.forEach((t) => t.currentSlot = null)
    this._blockOnColor = null;
    return tricks;
  }


  // remove first then add
  removeTrickById(trickId: number) {
    const index = this._gameTricks.findIndex(t => t.id === trickId);
    if (index === -1) {
      throw new Error(`Trick with id ${trickId} not found in slot ${this.slotBordPosition}`);
    }
    const removedTrick = this._gameTricks.splice(index, 1)[0];
    if (this._gameTricks.length === 0) {
      this._blockOnColor = null;
    }
    // return removedTrick;
  }

  getTrickById(trickId: number): GameTrick {
    const t = this._gameTricks.find((t) => t.id === trickId)
    if (!t) {
      throw new Error(`Trick with id ${trickId} not found in slot ${this.slotBordPosition}`);
    }
    return t;
  }

  cloneForUI(): any {
    return {
      slotBordPosition: this._slotBordPosition,
      gameTricks: this._gameTricks.map((t) => t.cloneForUI()),
      blockOnColor: this._blockOnColor,
    }
    throw new Error("Method not implemented.");
  }


}

class GameTrick {

  private _id: number;
  private _color: TrickColor;
  private _currentSlot: GameSlot | null = null;
  private _player: Player | null = null;



  constructor(id: number, color: TrickColor) {
    this._id = id;
    this._color = color;
  }

  public get id(): number {
    return this._id;
  }

  public get color(): TrickColor {
    return this._color;
  }


  public get currentSlot(): GameSlot {
    if (!this._currentSlot) {
      throw new Error(`Slot for trick id ${this._id} undefined`);
    }
    return this._currentSlot;
  }

  public set currentSlot(value: GameSlot | null) {
    this._currentSlot = value;
  }


  public get player(): Player {
    if (!this._player) {
      throw new Error(`Player for trick id ${this._id} undefined`);
    }
    return this._player;
  }
  public set player(value: Player | null) {
    this._player = value;
  }

  getCurrentSlotId(): number {
    return this.currentSlot.slotBordPosition;
  }

  getPlayerId(): string {
    return this.player.id;
  }
  cloneForUI(): any {
    return {
      id: this._id,
      color: this._color,
      currentSlot: this._currentSlot?.slotBordPosition,
      player: this._player?.id,
    }
  }


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
      this.trickSet.white[i] = new GameTrick(i, TrickColor.White);
    }
    for (let i = 15; i < 30; i++) {
      this.trickSet.black[i] = new GameTrick(i, TrickColor.Black);
    }
  }

  // assignSlotToGgoupTricks(slot: GameSlot, trickColorGroup: TrickColor) {
  //   if (trickColorGroup === TrickColor.White) {
  //     this.trickSet.white.forEach((t) => { t.currentSlot = slot })
  //   }
  //   if (trickColorGroup === TrickColor.Black) {
  //     this.trickSet.black.forEach((t) => { t.currentSlot = slot })
  //   }
  // }

  getTryckById(truckId: number): GameTrick {
    const trick = Object.values(this.trickSet).flat().find((t) => t.id === truckId);
    if (!trick) {
      throw Error(`Not found trick whit id ${truckId}`);
    }
    return trick;
  }

  chechTrickById(thickId: number): boolean {
    this.getTryckById(thickId);
    return true;
  }

  getPlayerIdByTrickId(trickId: number): string {
    const p = this.getTryckById(trickId).player
    if (!p) {
      throw Error(`Undefined pliyer whit trick whit id ${trickId}`);
    }
    return p.id;
  }
  getSlotIdByTrickId(trickId: number): number {
    return this.getTryckById(trickId).currentSlot.slotBordPosition;
  }

  getTrickColorById(trickId: number): TrickColor {
    return this.getTryckById(trickId).color;
  }

  getWhiteTrickIds(): number[] {
    return this.trickSet.white.map((t) => t.id)
  }
  getBlaskTrickIds(): number[] {
    return this.trickSet.black.map((t) => t.id)
  }

  getWhiteTricks(): GameTrick[] {
    return this.trickSet.white
  }
  getBlaskTricks(): GameTrick[] {
    return this.trickSet.black
  }
  assignPlayerForTricks(palayer: Player, color: TrickColor) {
    console.log(palayer)
    if (color === TrickColor.Black) {
      this.trickSet.black.forEach((t) => t.player = palayer);
    }
    if (color === TrickColor.White) {
      this.trickSet.white.forEach((t) => t.player = palayer);
    }
  }
  cloneForUI() {
    return {
      trickSet: {
        white: this.trickSet.white.map((t) => t.cloneForUI()),
        black: this.trickSet.black.map((t) => t.cloneForUI()),
      }
    }
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


class GameBoardLine {




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


  readonly gameBordLine: GameLine = [
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


  readonly smallerOutNum: number = 25 // so
  readonly largerOutNum: number = 0 // lo 
  readonly smallerHeadNum: number = 12 // sh
  readonly largerHeadNum: number = 24 // lh
  readonly smallerCourtyardNums: number[] = [19, 20, 21, 22, 23, 24]
  readonly smallerHousNums: number[] = [13, 14, 15, 16, 17, 18]
  readonly largerCourtyardNums: number[] = [12, 11, 10, 9, 8, 7]
  readonly largerHouss: number[] = [1, 2, 3, 4, 5, 6]

  cloneForUI(): GameBoardLineForUI {
    return {
      gameBordLine: this.gameBordLine.map((slot) => { return slot.cloneForUI() as GameSlotForUI }) as GameLineForUI,
      smallerOutNum: this.smallerOutNum,
      largerOutNum: this.largerOutNum,
      smallerHeadNum: this.smallerHeadNum,
      largerHeadNum: this.largerHeadNum,
      smallerCourtyardNums: this.smallerCourtyardNums.map((n) => n),
      smallerHousNums: this.smallerHousNums.map((n) => n),
      largerCourtyardNums: this.largerCourtyardNums.map((n) => n),
      largerHouss: this.largerHouss.map((n) => n),
    }
  }


  addTricksToSlotBySlotId(tricks: GameTrick[], slotId: number) {
    this.gameBordLine[slotId].addTricks(tricks);
  }

  moveAllTrick(fromSlotId: number, toSlotId: number) {
    const fromSlot = this.gameBordLine[fromSlotId];
    const tricks = fromSlot.removeAllTricks();
    const toSlot = this.gameBordLine[toSlotId];
    toSlot.addTricks(tricks);

  }
  moveTrick(trickId: number, fromSlotPosition: number, toSlotPosition: number) {
    const fromSlot = this._getSlotById(fromSlotPosition);
    const toSlot = this._getSlotById(toSlotPosition);;
    const trick = fromSlot.getTrickById(trickId);
    toSlot.addTrick(trick);
    fromSlot.removeTrickById(trickId);

  }
  private _getSlotById(slotId: number): GameSlot {
    const slot = this.gameBordLine[slotId];
    if (!slot) {
      throw new Error(`Slot whit id ${slotId} undefined`);
    }
    return slot;
  }
}

class GameBoard {


  gameBordLine: GameBoardLine = new GameBoardLine();
  players: GamePlayers = new GamePlayers();
  trickSet: TricksSet = new TricksSet();

  constructor() {

    this.gameBordLine.addTricksToSlotBySlotId(this.trickSet.getWhiteTricks(), this.gameBordLine.smallerOutNum);
    this.gameBordLine.addTricksToSlotBySlotId(this.trickSet.getBlaskTricks(), this.gameBordLine.largerOutNum);

  }

  cloneForUI(): GameBoardForUI {
    return {
      gameBordLine: this.gameBordLine.cloneForUI() as GameBoardLineForUI,
      players: this.players.cloneForUI(),
      trickSet: this.trickSet.cloneForUI(),
    }
  }
  setPlayer(playerId: string) {

    this.players.setPlayer(playerId);
  };

  setPlayerColor(playerId: string, color: TrickColor) {
    this.players.setPlayerColor(playerId, color);

    this.trickSet.assignPlayerForTricks(this.players.getPlayerById(playerId), color);

    if (this.players.isFirstPlayer(playerId) && this.players.isPlayerWhiteColor(playerId)) {
      this.gameBordLine.moveAllTrick(this.gameBordLine.smallerOutNum, this.gameBordLine.smallerHeadNum)
      // this.trickSet.assignSlotToGgoupTricks(this.smallerHeadNum, TrickColor.White)
    } else if (this.players.isFirstPlayer(playerId) && this.players.isPlayerBlackColor(playerId)) {
      this.gameBordLine.moveAllTrick(this.gameBordLine.largerOutNum, this.gameBordLine.smallerHeadNum)
      // this.trickSet.assignSlotToGgoupTricks(this.smallerHeadNum, TrickColor.Black)
    } else if (this.players.isSecondPlayer(playerId) && this.players.isPlayerWhiteColor(playerId)) {
      this.gameBordLine.moveAllTrick(this.gameBordLine.smallerOutNum, this.gameBordLine.largerHeadNum)
      // this.trickSet.assignSlotToGgoupTricks(this.largerHeadNum, TrickColor.White)
    } else if (this.players.isSecondPlayer(playerId) && this.players.isPlayerBlackColor(playerId)) {
      this.gameBordLine.moveAllTrick(this.gameBordLine.largerOutNum, this.gameBordLine.largerHeadNum)
      // this.trickSet.assignSlotToGgoupTricks(this.smallerHeadNum, TrickColor.White)
    }
  }



  getPlayerById(playerId: string) {
    return this.players.getPlayerById(playerId);
  }

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

  // checkSlotId(toSlotPosition: number) {
  //   this.gameBordLine._checkSlotId(toSlotPosition);
  // }
  moveTrick(playerId: string, trickId: number, fromSlotPosition: number, toSlotPosition: number) {
    this.gameBordLine.moveTrick(trickId, fromSlotPosition, toSlotPosition);
  }

}


enum GameStatePlayersTurn {
  Wating
}

enum GameState {
  // initial state when the game is created, waiting for first player to join
  WaitngForFirstPlayer = 'witing for first player',
  // first player has joined, waiting for second player
  WaitingForSecondPlayer = 'waiting for second player',
  // both players have joined, waiting for first player's turn order roll
  WaitingDeterminTurnOrderFirstPlayer = "Waiting for the first player's turn to be determined",
  WaitingDeterminTurnOrderSecondPlayer = "Waiting for the second player's turn to be determined",

  WaitngPrioritization = 'waitng for turn order first player',

  WhitePlayerFirstTurnWatingRollCubes = 'firs turn white player: whiting roll cubes',
  WhitePlayerFirstTurnWatingMoves = 'firs turn white player: whiting moves',
  BlackPlayerFirstTurnWatingRollCubes = 'firs turn black player: whiting roll cubes',
  BlackPlayerFirstTurnWatingMoves = 'firs turn black player: whiting moves',

  WhitePlayerTurnWatingRollCubes = 'turn white player: whiting roll cubes',
  WhitePlayerTurnWatingMoves = 'turn white player: whiting moves',
  BlackPlayerTurnWatingRollCubes = 'turn black player: whiting roll cubes',
  BlackPlayerTurnWatingMoves = 'turn black player: whiting moves',




  WaitngForTurnOrderSecondPlayer = 'waitng for turn order second player',
  // order has been decided, waiting for cube roll to start the game
  InProgressWitingCubesRoll = 'in progress witing cubes roll',
  // waiting for player to make their move
  InProgressWitingPlayerMove = 'in progress witing player move',
  Completed = 'completed',
  // WitingForSecondPlayer = "WitingForSecondPlayer"

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

  private _id: string;
  private _color: TrickColor | null = null;
  private _victoryStatus: PlayerVictoryStatus = PlayerVictoryStatus.Init;
  private _acceptSequence: PlayersAcceptSequence | null = null;

  public get acceptSequence(): PlayersAcceptSequence | null {
    return this._acceptSequence;
  }
  public set acceptSequence(value: PlayersAcceptSequence | null) {
    this._acceptSequence = value;
  }


  public get id(): string {
    return this._id;
  }

  public get color(): TrickColor {
    if (!this._color) {
      throw Error(`Not set color for player id ${this._id}`)
    }
    return this._color;
  }
  public set color(value: TrickColor | null) {
    this._color = value;
  }
  public get victoryStatus(): PlayerVictoryStatus {
    return this._victoryStatus;
  }
  public set victoryStatus(value: PlayerVictoryStatus) {
    this._victoryStatus = value;
  }

  constructor(id: string) {
    this._id = id;

  }

  cloneForUI() {
    return {
      id: this._id,
      color: this._color,
      victoryStatus: this._victoryStatus,
      acceptSequence: this._acceptSequence,
    }
  }

}

class GamePlayers {


  private gamePlayers: {
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
    if (!this.firstPlayerExists()) {
      const p = new Player(playerId)
      this.gamePlayers.first = p;
      p.acceptSequence = PlayersAcceptSequence.first;
      return;
    }
    if (!this.secondPlayerExists()) {
      const p = new Player(playerId)
      this.gamePlayers.second = p;
      p.acceptSequence = PlayersAcceptSequence.second;
      return;
    }
    throw Error("Cannot set player, wrong state");
  }

  setPlayerColor(playerId: string, color: TrickColor) {
    this.getPlayerById(playerId).color = color;
  }

  checkSecondPlayer(playerId: string): boolean {
    return this.getPlayerById(playerId).acceptSequence === PlayersAcceptSequence.second;
  }
  checkFirstPlayer(playerId: string): boolean {
    return this.getPlayerById(playerId).acceptSequence === PlayersAcceptSequence.first;
  }

  checkCompletenessPlayers(): boolean {
    return this.gamePlayers.first && this.gamePlayers.second ? true : false;
  }

  firstPlayerExists(): boolean {
    return this.gamePlayers.first ? true : false;
  }

  secondPlayerExists(): boolean {
    return this.gamePlayers.second ? true : false;
  }

  getPlayerById(playerId: string): Player {
    const p = Object.values(this.gamePlayers).find((p) => p?.id === playerId);
    if (!p) {
      throw Error(`Player whit id ${playerId} undefined`);
    }
    return p;
  }

  setPlayerTrickColor(playerId: string, color: TrickColor) {
    this.getPlayerById(playerId).color = color;
  }

  getPlayerTrickColor(playerId: string): TrickColor | null {
    return this.getPlayerById(playerId).color;
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
  isPlayerWhiteColor(playerId: string) {
    return this.getPlayerById(playerId).color === TrickColor.White;
  }

  isPlayerBlackColor(playerId: string) {
    return this.getPlayerById(playerId).color === TrickColor.Black;
  }

  isFirstPlayer(playerId: string) {
    return this.getFirstPlayer().id === playerId;
  }
  getFirstPlayer(): Player {
    const p = this.gamePlayers.first;
    if (!p) {
      throw new Error("First player undefined.");
    }
    return p;
  }
  isSecondPlayer(playerId: string) {
    return this.getSecondPlayer().id === playerId;
  }
  getSecondPlayer(): Player {
    const p = this.gamePlayers.second;
    if (!p) {
      throw new Error("Second player undefined.");
    }
    return p;
  }

  cloneForUI(): GamePlayersForUI {
    return {
      gamePlayers: {
        first: this.gamePlayers.first?.cloneForUI() as PlayerForUI,
        second: this.gamePlayers.second?.cloneForUI() as PlayerForUI
      }
    }
  }
}

type StateOfCube = 1 | 2 | 3 | 4 | 5 | 6;

class GameCube {
  state: StateOfCube;
  id: number;

  constructor(id: number) {
    this.id = id;
    this.state = this.roll();
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

  cloneForUI(): GameCubeForUI {
    return {
      state: this.state,
      id: this.id
    }
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

  cloneForUI(): GameCubesForUi {
    return {
      cube1: this.cube1.cloneForUI(),
      cube2: this.cube2.cloneForUI(),
    };
  }

}

type GameTrickForUI = {
  id: number,
  color: TrickColor,
  currentSlot: number
  player: string
}

type TricksSetForUi = {
  trickSet: {
    white: GameTrickForUI[],
    black: GameTrickForUI[],
  }
}

type GameSlotForUI = {
  slotBordPosition: number,
  gameTricks: GameTrickForUI[],
  blockOnColor: TrickColor
}

type GameLineForUI = [
  GameSlotForUI, // 0
  GameSlotForUI, // 1
  GameSlotForUI, // 2
  GameSlotForUI, // 3
  GameSlotForUI, // 4
  GameSlotForUI, // 5
  GameSlotForUI, // 6
  GameSlotForUI, // 7
  GameSlotForUI, // 8
  GameSlotForUI, // 9
  GameSlotForUI, // 10
  GameSlotForUI, // 11
  GameSlotForUI, // 12
  GameSlotForUI, // 13
  GameSlotForUI, // 14
  GameSlotForUI, // 15
  GameSlotForUI, // 16
  GameSlotForUI, // 17
  GameSlotForUI, // 16
  GameSlotForUI, // 19
  GameSlotForUI, // 20
  GameSlotForUI, // 21
  GameSlotForUI, // 22
  GameSlotForUI, // 23
  GameSlotForUI, // 24
  GameSlotForUI, // 25
]

type GameBoardLineForUI = {
  gameBordLine: GameLineForUI,
  smallerOutNum: number,
  largerOutNum: number,
  smallerHeadNum: number,
  largerHeadNum: number,
  smallerCourtyardNums: number[],
  smallerHousNums: number[],
  largerCourtyardNums: number[],
  largerHouss: number[],
}

type PlayerForUI = {
  id: string,
  color: TrickColor,
  victoryStatus: PlayerVictoryStatus,
  acceptSequence: PlayersAcceptSequence
} | null

type GamePlayersForUI = {
  gamePlayers: {
    first: PlayerForUI,
    second: PlayerForUI
  }
}

type GameBoardForUI = {
  gameBordLine: GameBoardLineForUI,
  players: GamePlayersForUI,
  trickSet: TricksSetForUi
}

type GameCubeForUI = {
  state: StateOfCube,
  id: number,
}

type GameCubesForUi = {
  cube1: GameCubeForUI,
  cube2: GameCubeForUI,
}

type MoveCount = 1 | 2 | 3 | 4


type GameStateForUI = {
  state: GameState,
  GameBoard: GameBoardForUI,
  cubes: GameCubesForUi,
  cube1State: StateOfCube,
  cube2State: StateOfCube,
  currentPlayerIdToMakeMove: string | null,
  nextPlayerIdToMakeMove: string | null,
  moveCount: MoveCount
}

class Game {
  // ---------- Game State
  state: GameState = GameState.WaitngForFirstPlayer;
  GameBoard: GameBoard = new GameBoard();
  cubes: GameCubes = new GameCubes();

  // turn order rolls by both players
  cube1State: StateOfCube | null = null;
  cube2State: StateOfCube | null = null;
  // player who has the current turn to make a move
  currentPlayerId: string | null = null; // player's turn
  nextPlayerId: string | null = null;
  whitePlayerId: string | null = null;
  blackPlayerId: string | null = null;

  moveCount: number = 0;

  cloneForUI(): GameStateForUI {
    const clone: GameStateForUI = {
      state: this.state,
      GameBoard: this.GameBoard.cloneForUI(),
      cubes: this.cubes.cloneForUI(),
      cube1State: this.cube1State as StateOfCube,
      cube2State: this.cube2State as StateOfCube,
      currentPlayerIdToMakeMove: this.currentPlayerId,
      nextPlayerIdToMakeMove: this.nextPlayerId,
      moveCount: this.moveCount as MoveCount,

    }
    return clone;
  }

  acceptGame(playetId: string) {
    // console.log(this.state)
    if (this.state === GameState.WaitngForFirstPlayer || this.state === GameState.WaitingForSecondPlayer) {
      // console.log(this.state)
      this.GameBoard.setPlayer(playetId);
      if (this.GameBoard.checkCompletenessPlayers()) {
        this.state = GameState.WaitingDeterminTurnOrderFirstPlayer
        this.currentPlayerId = this.GameBoard.getFirstPlayerId();
        this.nextPlayerId = this.GameBoard.getSecondPlayerId();
        return;
      }
      this.state = GameState.WaitingForSecondPlayer;
      return;
    }
    throw new Error("Cannot set player in current game state");

  }

  determinePlayersTurnOrder(playerId: string) {
    if (this.state === GameState.WaitingDeterminTurnOrderFirstPlayer || this.state === GameState.WaitingDeterminTurnOrderSecondPlayer) {
      if (this.currentPlayerId !== playerId) {
        throw new Error(`Priority order violation. Current player ID to roll cube ${this.currentPlayerId}`);
      }
      if (this.state === GameState.WaitingDeterminTurnOrderFirstPlayer) {
        this.cube1State = this.cubes.rollCube1();
        const player = this.currentPlayerId;
        this.currentPlayerId = this.nextPlayerId;
        this.nextPlayerId = player;
        this.state = GameState.WaitingDeterminTurnOrderSecondPlayer;
        return;
      }

      this.cube2State = this.cubes.rollCube2();
      if (this.cube1State === this.cube2State) {
        // re-roll in case of a tie
        const playerId = this.currentPlayerId;
        this.currentPlayerId = this.nextPlayerId;
        this.nextPlayerId = playerId
        this.cube1State = null;
        this.cube2State = null;
        this.state = GameState.WaitingDeterminTurnOrderFirstPlayer
        return;
      }
      if (this.cube1State! > this.cube2State!) {
        const playerId = this.currentPlayerId;
        this.currentPlayerId = this.nextPlayerId;
        this.nextPlayerId = playerId
        // this.GameBoard.setPlayerColor(this.currentPlayerIdToMakeMove!, TrickColor.White)
        // this.GameBoard.setPlayerColor(this.nextPlayerIdToMakeMove, TrickColor.Black)
      }
      this.GameBoard.setPlayerColor(this.currentPlayerId!, TrickColor.White)
      this.GameBoard.setPlayerColor(this.nextPlayerId!, TrickColor.Black)
      this.state = GameState.WhitePlayerTurnWatingRollCubes;
      // console.log(this.GameBoard.getPlayerById(this.currentPlayerId!))
      // console.log(this.GameBoard.getPlayerById(this.nextPlayerId!))
      return;
    }
    throw new Error("Cannot set turn order for first player in current game state");
  }


  roollCubes(playerId: string) {
    this._checkGemeStateIsWitingRollCubes();
    this._checkPlayerIsCurrentPlayer(playerId)
    this.cube1State = this.cubes.rollCube1();
    this.cube2State = this.cubes.rollCube2();
    if (this.cube1State === this.cube2State) {
      this.moveCount = 4;
    } else {
      this.moveCount = 2;
    }
    if (this.state === GameState.WhitePlayerTurnWatingRollCubes ||
      this.state === GameState.BlackPlayerTurnWatingRollCubes) {
      // _checkOneMove(); // is there at least one move
    }
    if (this.state === GameState.WhitePlayerFirstTurnWatingRollCubes) {
      this.state = GameState.WhitePlayerTurnWatingMoves
    }
    if (this.state === GameState.BlackPlayerFirstTurnWatingRollCubes) {
      this.state = GameState.BlackPlayerFirstTurnWatingMoves
    }
    if (this.state === GameState.WhitePlayerTurnWatingRollCubes) {
      this.state = GameState.WhitePlayerTurnWatingMoves
    }
    if (this.state === GameState.BlackPlayerTurnWatingRollCubes) {
      this.state = GameState.BlackPlayerTurnWatingMoves
    }
  }


  moveTrick(playerId: string, trickId: number, fromSlotPosition: number, toSlotPosition: number) {
    // console.log(this.GameBoard.trickSet.getTryckById(trickId))
    this._checkGameStateIsWitingPlayerMove(); // must be GameState.[WhitePlayerFirstTurnWatingMoves || BlackPlayerFirstTurnWatingMoves || WhitePlayerTurnWatingMoves || BlackPlayerTurnWatingMoves]
    this._checkPlayerIsCurrentPlayer(playerId); // playerId must be eaqule currentPlayerId
    // this._checkFromSlotPosition(fromSlotPosition); // must exist
    // this._checkToSlotPosition(toSlotPosition); // must exist
    // this._chckTrickTd(trickId); // must exist
    // this._checkTrickOwnedCurrentPlayer(trickId, playerId); // trick must be own current player
    // this._checkTrickOnFromSlot(trickId, fromSlotPosition); // trick must be on frome slot
    // _checkMoveDirrection(trickId, toSlotPosition); // the chip should not move in the opposite direction
    // if (this.state === GameState.WhitePlayerTurnWatingMoves || this.state === GameState.BlackPlayerTurnWatingMoves) {
    //   _checkMoveFromeHead(trickId); // A player can only make one move in his turn from the head except for the first turn in the game
    // }
    // _checkMoveEaqulStateOfCube(trickId, fromSlotPosition, toSlotPosition); // The move must be equal to the state of one of the cube
    // this._checkMoveOnSlotNotBlockingAnotherColor(trickId, toSlotPosition); // the target slot must not be blocked by another color

    // if (this.state !== GameState.InProgressWitingPlayerMove) {
    //   throw new Error("Cannot move trick in current game state");
    // }

    // this.GameBoard.checkSlotId(toSlotPosition);
    // const playerId: string = this.GameBoard.getPlayerIdByTrickId(trickId);
    // this._checkCurentPlayer(playerId)
    // const fromSlotPosition: number = this.GameBoard.getSlotIdByTrickId(trickId)!;
    // _checkMoveFromeHead(tickId); //che
    // _checkMoveDirection(trickId);
    this.GameBoard.moveTrick(playerId, trickId, fromSlotPosition, toSlotPosition);
    this.moveCount -= 1;
    if (this.moveCount === 0) {
      // switch turns
      const temp = this.currentPlayerId;
      this.currentPlayerId = this.nextPlayerId;
      this.nextPlayerId = temp;
      this.cube1State = null;
      this.cube2State = null;
      if (this.state === GameState.WhitePlayerFirstTurnWatingMoves) {
        this.state = GameState.BlackPlayerFirstTurnWatingRollCubes
        return;
      }
      if (this.state === GameState.BlackPlayerFirstTurnWatingMoves) {
        this.state = GameState.WhitePlayerTurnWatingRollCubes
        return;
      }
      if (this.state === GameState.WhitePlayerTurnWatingMoves) {
        this.state = GameState.BlackPlayerTurnWatingRollCubes
        return;
      }
      if (this.state === GameState.BlackPlayerTurnWatingMoves) {
        this.state = GameState.WhitePlayerTurnWatingRollCubes
        return;
      }
    }

  }

  private _checkGemeStateIsWitingRollCubes() {
    if (!(this.state === GameState.WhitePlayerFirstTurnWatingRollCubes ||
      this.state === GameState.BlackPlayerFirstTurnWatingRollCubes ||
      this.state === GameState.WhitePlayerTurnWatingRollCubes ||
      this.state === GameState.BlackPlayerTurnWatingRollCubes)) {
      throw new Error("Cannot roll cubes in current game state");
    }
  }

  private _checkGameStateIsWitingPlayerMove() { // must be GameState.[WhitePlayerFirstTurnWatingMoves || BlackPlayerFirstTurnWatingMoves || WhitePlayerTurnWatingMoves || BlackPlayerTurnWatingMoves]
    if (!(this.state === GameState.WhitePlayerFirstTurnWatingMoves ||
      this.state === GameState.BlackPlayerFirstTurnWatingMoves ||
      this.state === GameState.WhitePlayerTurnWatingMoves ||
      this.state === GameState.BlackPlayerTurnWatingMoves)) {
      throw new Error("Cannot roll cubes in current game state");
    }
  }

  private _checkPlayerIsCurrentPlayer(playerId: string) {
    if (this.currentPlayerId !== playerId) {
      throw new Error("It's not the current player's trick to move");
    }
  }

  // removeWhait() {
  //   this.GameBoard.gameBordLine.gameBordLine[25].removeAllTricks();
  // }







}
export {
  TrickColor,
  GameTrick,
  GameSlot,
  GameBoard as GameBoard,
  GameState,
  Player,
  TricksSet,
  GameCube,
  Game,
  PlayerVictoryStatus
};
export type { GameStateForUI, GameLineForUI, GameSlotForUI };



