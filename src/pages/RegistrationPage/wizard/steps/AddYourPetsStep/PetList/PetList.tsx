import React from 'react';

import { useIntl } from '@features';

import { PetItem } from './PetItem/PetItem';

import styles from './PetList.module.css';

interface PetListProps {
  pets: Pet[];
  selectedPetId: Pet['id'];
  errors: {
    [id: string]: { [K in keyof Pet]?: ValidationReturn };
  };
  isSubmited: boolean;
  onSelect: (id: Pet['id']) => void;
  onDelete: (id: Pet['id']) => void;
  onAdd: () => void;
}

export const PetList: React.FC<PetListProps> = ({
  pets,
  errors,
  selectedPetId,
  onSelect,
  isSubmited,
  onAdd,
  onDelete
}) => {
  const intl = useIntl();
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [pets.length]);

  return (
    <div className={styles.pets_container}>
      <div className={styles.title}>
        {intl.translateMessage('page.registration.step.addYourPetsStep.yourPets')}
      </div>
      <div className={styles.pets_list_container} ref={listRef}>
        {pets.map((pet) => {
          const showIcon =
            isSubmited || (pet.dogName && pet.dogWeight && pet.breed && pet.dogBirthday);
          const iconClassName = errors[pet.id]
            ? styles.pet_uncorrect_icon
            : styles.pet_correct_icon;

          return (
            <div className={styles.pet_container} key={pet.id}>
              {showIcon && (
                <div className={styles.pet_icon_container}>
                  <div className={iconClassName} />
                </div>
              )}
              <PetItem
                pet={pet}
                isSelected={selectedPetId === pet.id}
                onSelect={onSelect}
                {...(pets.length > 1 && { onDelete })}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.line} />
      <div aria-hidden onClick={onAdd} className={styles.add_pet}>
        {intl.translateMessage('page.registration.step.addYourPetsStep.addAnotherPet')}
      </div>
    </div>
  );
};
