export default function Stars({ id }) {

    const ratingName = `rating-${id}`;
    
    return (
        <div className="rating">
            <input type="radio" name={ratingName} className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name={ratingName} className="mask mask-star-2 bg-orange-400" defaultChecked />
            <input type="radio" name={ratingName} className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name={ratingName} className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name={ratingName} className="mask mask-star-2 bg-orange-400" />
        </div>
    );
}
