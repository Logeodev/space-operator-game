
//------------------------------------------------------------------------
//
// __| INTERFACE - ELEMENTS |__
//
//------------------------------------------------------------------------

interface element {
    type: elementType,
    id: Number,
    valueType: valueType, 
    value: value, 
}

type elementType = {
    type: "Switch" | "Button"
}

type valueType = {
    valueType: "string" | "number" | "color"
}

type value = {
    value: String | Number 
}


//------------------------------------------------------------------------
//
// __| INTERFACE - OPERATION |__
//
//------------------------------------------------------------------------

interface Operation {
    elements: element [],
    descritpion: String,
    result: OperationResult
}

interface OperationResult {
    resultButton: resultButton,
    resultSwitch: resultSwitch,

}

type resultButton = {
    order: "random" | "order",
    ids: [Number]
}

type resultSwitch = {
    result: [Number]
}

