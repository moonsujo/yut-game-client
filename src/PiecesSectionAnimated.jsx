import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { backdoLaunchAtom, catchPathAtom, clientAtom, gamePhaseAtom, hasTurnAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, selectionAtom, teamsAtom } from './GlobalState';
import layout from './layout';
import Piece from './components/Piece';
import { calculateCatchDelay, caughtCheck, hasValidMoveHome, pieceSelected, startCheck, tileType } from './helpers/helpers';
import MeshColors from './MeshColors';
import Star from './meshes/Star';
import { useSpring } from '@react-spring/three';
import useCatchPosition from './hooks/useCatchPosition';

export default function PiecesSection({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1,
  device
}) {
  const client = useAtomValue(clientAtom)
  const teams = useAtomValue(teamsAtom)
  const selection = useAtomValue(selectionAtom)
  const backdoLaunch = useAtomValue(backdoLaunchAtom)
  const hasTurn = useAtomValue(hasTurnAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const catchPath = useAtomValue(catchPathAtom)

  function UnassignedPieces() {
    const emptyPieces = [0, 0, 0, 0]
    return <group>
      {emptyPieces.map((_value, index) =>
        (<mesh
          position={layout[device].game.piecesSection.emptyPieces.positions[index]}
          key={index}
        >
          <sphereGeometry args={[0.3, 32, 16]} />
          <meshStandardMaterial color="#505050"/>
        </mesh>
      ))}
    </group>
  }

  function AssignedPieces() {  
    const team = client.team  

    // Need to accept "key" to use it in an map
    function EmptyPiece({ position }) {
      return <mesh
        position={position}
      >
        <Star color='grey' scale={0.3}/>
      </mesh>
    }

    function ScoredPiece({ position }) {
      return <mesh
        position={position}
      >
        <Star color={team == 0 ? "red" : "green"} scale={0.3}/>
      </mesh>
    }

    // list 8 springs
    // assign scale of piece depending on team and index
    const [pieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
    const [pieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
    const [pieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
    const [pieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
    const [pieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
    const [pieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
    const [pieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
    const [pieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)

    const [springs0_0, api0_0] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs0_1, api0_1] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs0_2, api0_2] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs0_3, api0_3] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs1_0, api1_0] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs1_1, api1_1] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs1_2, api1_2] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))
    const [springs1_3, api1_3] = useSpring(() => ({
        from: {
            scale: layout[device].game.piecesSection.pieces.scale,
        }
    }))

    useEffect(() => {
        const path = pieceTeam0Id0.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam0Id0.tile)) {
                api0_0.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam0Id0.tile, pieceTeam0Id0.lastPath)) {
              api0_0.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api0_0.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam0Id0])
    useEffect(() => {
        const path = pieceTeam0Id1.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam0Id1.tile)) {
                api0_1.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam0Id1.tile, pieceTeam0Id1.lastPath)) {
              api0_1.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api0_1.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam0Id1])
    useEffect(() => {
        const path = pieceTeam0Id2.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam0Id2.tile)) {
                api0_2.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam0Id2.tile, pieceTeam0Id2.lastPath)) {
              api0_2.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api0_2.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam0Id2])
    useEffect(() => {
        const path = pieceTeam0Id3.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam0Id3.tile)) {
                api0_3.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam0Id3.tile, pieceTeam0Id3.lastPath)) {
              api0_3.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api0_3.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam0Id3])
    useEffect(() => {
        const path = pieceTeam1Id0.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam1Id0.tile)) {
                api1_0.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam1Id0.tile, pieceTeam1Id0.lastPath)) {
              api1_0.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api1_0.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam1Id0])
    useEffect(() => {
        const path = pieceTeam1Id1.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam1Id1.tile)) {
                api1_1.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam1Id1.tile, pieceTeam1Id1.lastPath)) {
              api1_1.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api1_1.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam1Id1])
    useEffect(() => {
        const path = pieceTeam1Id2.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam1Id2.tile)) {
                api1_2.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam1Id2.tile, pieceTeam1Id2.lastPath)) {
              api1_2.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api1_2.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam1Id2])
    useEffect(() => {
        const path = pieceTeam1Id3.lastPath
        if (path.length > 0) {
            if (caughtCheck(gamePhase, pieceTeam1Id3.tile)) {
                api1_3.start({
                    from: {
                        scale: 0,
                    },
                    to: [
                        {
                            scale: layout[device].game.piecesSection.pieces.scale,
                            config: {
                                tension: 170,
                                friction: 26
                            },
                        }
                    ],
                    loop: false,
                    delay: catchPath ? calculateCatchDelay(catchPath) : 0,
                    onStart: () => {},
                    onRest: () => {}
                })
            } else if (startCheck(pieceTeam1Id3.tile, pieceTeam1Id3.lastPath)) {
              api1_3.start({
                  from: {
                      scale: layout[device].game.piecesSection.pieces.scale,
                  },
                  to: [
                      {
                          scale: 0,
                          config: {
                              tension: 170,
                              friction: 26
                          },
                      }
                  ],
                  loop: false,
                  onStart: () => {},
                  onRest: () => {}
              })
            }
        } else { // place holder
            api1_3.start({
                from: {
                    scale: 1,
                },
                to: [],
                loop: false,
                onStart: () => {},
                onRest: () => {}
            })
        }
    }, [pieceTeam1Id3])

    function getPieceScale(team, index) {
      if (team === 0) {
        if (index === 0) {
          return springs0_0.scale
        } else if (index === 1) {
          return springs0_1.scale
        }  else if (index === 2) {
          return springs0_2.scale
        }  else if (index === 3) {
          return springs0_3.scale
        } 
      } else if (team === 1) {
        if (index === 0) {
          return springs1_0.scale
        } else if (index === 1) {
          return springs1_1.scale
        }  else if (index === 2) {
          return springs1_2.scale
        }  else if (index === 3) {
          return springs1_3.scale
        } 
      }
    }

    return <group>
      { teams[team].pieces.map((value, index) =>
        tileType(value.tile) === "onBoard" ? <EmptyPiece 
          position={layout[device].game.piecesSection.pieces.positions[index]}
          key={index}
        /> : 
        tileType(value.tile) === "scored" ? <ScoredPiece
          position={layout[device].game.piecesSection.pieces.positions[index]}
          key={index}
        /> : <Piece
          position={layout[device].game.piecesSection.pieces.positions[index]}
          rotation={layout[device].game.piecesSection.pieces.rotation}
          scale={getPieceScale(team, index)}
          tile={-1}
          team={team}
          id={value.id}
          key={index}
          // on selection, no other piece should be in 'selectable' animation
          selectable={(selection === null && hasValidMoveHome(teams[team].pieces, teams[team].moves, backdoLaunch) && hasTurn)}
          onBoard={false}
          selected={pieceSelected(selection, value.id, team)}
        />
      )}
    </group>
  } 

  return <group
    position={position}
    rotation={rotation}
    scale={scale}
  >
    { client.team === -1 && <UnassignedPieces/> }
    { (client.team === 0 || client.team === 1) && <AssignedPieces/>}
  </group>
}