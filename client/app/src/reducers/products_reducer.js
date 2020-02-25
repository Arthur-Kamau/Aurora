
export default function productReducer(state=[],  {type, payload}) {
    console.log("  productReducer type ="+ type + " payload "+payload);
    return state;
}