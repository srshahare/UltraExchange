import React from 'react';
import './GiftsGrid.css';

export default function TitlebarGridList(props) {

  const tileData = props.tiles;

  return (
    <div className="GiftsList">
        {tileData.map((tile) => (
            <div className="GiftCard">
                <img src={tile.url} alt={tile.name} />
                    <div>
                        <p style={{color: 'black'}}>{tile.name}</p>
                    </div>
            </div>
        ))}
    </div>
  );
}
