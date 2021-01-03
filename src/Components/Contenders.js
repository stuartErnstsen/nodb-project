import { Component } from 'react';
import Contender from './Contender'

const Contenders = (props) => {
    const { pokemon, contenders } = props
    //Creates list of next 9 pokemon in the contender list, it does not show whole list!
    const contenderDisplay = contenders.map((poke,i) => {
        const { name, id } = poke
        return <Contender 
            key={i} 
            name={name} 
            id={id} 
            sprite={poke.sprites.front_default} 
            editNameFn={props.editNameFn}
            deleteContenderFn={props.deleteContenderFn}
            />
    })
    //Creates a list of unused pokemon that are not currently in contender list
    //pokemon that have been removed from contenders get added to this list 
    const possibleContenders = pokemon.filter(e => !contenders.find(e2 => e.id === e2.id)).map((poke,index) => {
        return <div key={index} pokemon={poke} onClick={() => props.addContenderFn(poke)}><img alt={poke.name} src={poke.sprites.front_default}></img></div>
    })

    return (
        <section id="contender-container">
            <h2 id='contender-container-title'>CONTENDERS</h2>
            {contenderDisplay.length > 0 
            ? (
                <div id="contender-list">
                    {contenderDisplay}
                </div>
            ) : (
                <p>LOADING...</p>
            )}  
            {possibleContenders.length >0 &&
                (
                <aside id="past-contenders-container">
                        {possibleContenders}
                </aside>
                
                )} 
        </section>
        
    )
}

export default Contenders;