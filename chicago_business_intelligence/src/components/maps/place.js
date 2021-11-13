import {GreatPlace} from './place-style';

const Place = ({placeName}) => {
    return (
       <div style={GreatPlace}>
          {placeName}
       </div>
    );
}

export default Place;