import React from 'react';
import { classnames, getRandomAnimal } from '@utils/helpers';
import styles from './PetItem.module.css';

interface PetItemProps {
  pet: Pet;
  isSelected: boolean;
  onSelect: (id: Pet['id']) => void;
  onDelete?: (id: Pet['id']) => void;
}

export const PetItem: React.FC<PetItemProps> = ({ pet, isSelected, onSelect, onDelete }) => {
  const petYears = new Date().getFullYear() - new Date(pet.dogBirthday).getFullYear();
  const [randomAnimal] = React.useState(getRandomAnimal());

  return (
    <div
      aria-hidden
      onClick={() => onSelect(pet.id)}
      className={classnames(styles.pet_container, {
        [styles.selected_pet_container]: isSelected
      })}
    >
      <div className={styles.content}>
        {!pet.dogName ? (
          <>
            {randomAnimal.emoji} {randomAnimal.sound}
          </>
        ) : (
          <>
            {pet.dogName} {pet.breed && <>- {pet.breed.name}</>}
            {!!petYears && <> {petYears} y.o.</>}
            {pet.dogWeight && <>, {pet.dogWeight} kg</>}
          </>
        )}
      </div>

      {onDelete && (
        <div
          aria-hidden
          onClick={(event) => {
            event.stopPropagation();
            onDelete(pet.id);
          }}
          className={styles.cross}
        />
      )}
    </div>
  );
};
