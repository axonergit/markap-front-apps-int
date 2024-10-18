const MeItem = (props) => {

    return(
        <div className="w-3/12 px-12 h-8 flex flex-col justify-center items-center">
            <h1 className="text-center text-2xl">{props.titulo}</h1>
            <p className="text-center flex-grow">{props.detalles}</p>
        </div>
    )
}


export default MeItem;