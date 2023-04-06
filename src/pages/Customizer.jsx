export function Customizer( {color, setter } ) {
    const colors = ["white", "red", "black", "green", "navy" ]

    return <>
        {colors.map( (color)=> (
            <button onClick={ ()=> setter(color) } style={{backgroundColor:color}}>
                {color}
            </button>) 
        ) }
    </>
}