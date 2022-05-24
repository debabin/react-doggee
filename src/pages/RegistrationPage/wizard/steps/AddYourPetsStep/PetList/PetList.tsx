import React from 'react';

import { PetItem } from './PetItem/PetItem';
import styles from './PetList.module.css';

interface PetListProps {
  pets: Pet[];
  selectedPetId: Pet['id'];
  onSelect: (id: Pet['id']) => void;
  onDelete: (id: Pet['id']) => void;
  onAdd: () => void;
}

export const PetList: React.FC<PetListProps> = ({
  pets,
  selectedPetId,
  onSelect,
  onAdd,
  onDelete
}) => {
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [pets.length]);

  return (
    <div className={styles.pets_container}>
      <div className={styles.title}>Your pets</div>
      <div className={styles.pets_list_container} ref={listRef}>
        {pets.map((pet) => (
          <div key={pet.id}>
            <PetItem
              pet={pet}
              isSelected={selectedPetId === pet.id}
              onSelect={onSelect}
              {...(pets.length > 1 && { onDelete })}
            />
          </div>
        ))}
      </div>
      <div className={styles.line} />
      <div aria-hidden onClick={onAdd} className={styles.add_pet}>
        Add another pet
      </div>
    </div>
  );
};
