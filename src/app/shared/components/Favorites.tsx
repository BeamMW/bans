import React from 'react';
import { Button } from '@app/shared/components/index';
import { IconFavorite } from '@app/shared/icons';

function Favorites() {
  return (
    <Button variant='icon' width='32px' height='32px'>
      <IconFavorite />
    </Button>
  );
}

export default Favorites;
