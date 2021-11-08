import React from "react"
import "./AnimatedBackground.scss"

const AnimatedBackground = () => {
    const blocksGrid = []
    for (let i = 0; i < 225; i++) {
        blocksGrid.push(<div className='cell' />)
    }

    const textLayers = []
    for (let i = 0; i < 10; i++) {
        textLayers.push(<div class='css'>Too LLink</div>)
    }

    return (
        <div className='animated-background'>
            {blocksGrid}
            <div className='content'>{textLayers}</div>
        </div>
    )
}

export { AnimatedBackground }
