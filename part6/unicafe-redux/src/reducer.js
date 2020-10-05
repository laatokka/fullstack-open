const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedStateGOOD = {...state}
      changedStateGOOD.good += 1
      return changedStateGOOD
    case 'OK':
      const changedStateOK = {...state}
      changedStateOK.ok += 1
      return changedStateOK
    case 'BAD':
      const changedStateBAD = { ...state }
      changedStateBAD.bad += 1
      return changedStateBAD
    case 'ZERO':
      const zeroOutState = {...state}
      zeroOutState.bad = 0
      zeroOutState.good = 0
      zeroOutState.ok = 0
      return zeroOutState
      
    default: return state
  }
  
}

export default counterReducer