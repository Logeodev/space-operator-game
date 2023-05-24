
interface Elements {
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

